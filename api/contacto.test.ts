import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VercelRequest, VercelResponse } from './_types';

// Doble del cliente de Resend: ningún test debe enviar un correo real
const enviarMock = vi.fn();
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: enviarMock };
  },
}));

/** Respuesta simulada que guarda el código y el cuerpo devueltos */
const crearRespuesta = () => {
  const resultado = { status: 0, body: null as unknown, headers: {} as Record<string, string> };

  const res = {
    status(code: number) {
      resultado.status = code;
      return this;
    },
    json(body: unknown) {
      resultado.body = body;
    },
    setHeader(name: string, value: string) {
      resultado.headers[name] = value;
    },
  } as VercelResponse;

  return { res, resultado };
};

/** Cada test usa una IP distinta para no chocar con el limitador de peticiones */
let contadorIp = 0;
const crearPeticion = (overrides: Partial<VercelRequest> = {}): VercelRequest => {
  contadorIp += 1;

  return {
    method: 'POST',
    headers: { 'x-forwarded-for': `10.0.0.${contadorIp}` },
    query: {},
    body: {
      name: 'Jennifer',
      lastName: 'Román',
      email: 'jennifer@correo.com',
      phone: '600 123 456',
      message: 'Quiero información sobre el voluntariado.',
      privacyAccepted: true,
    },
    ...overrides,
  };
};

/** El handler se importa dentro de cada test para releer las variables de entorno */
const cargarHandler = async () => {
  vi.resetModules();
  const modulo = await import('./contacto');
  return modulo.default;
};

describe('POST /api/contacto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('RESEND_API_KEY', 're_clave_de_prueba');
    vi.stubEnv('CONTACT_FROM_EMAIL', 'web@peopleasociacion.com');
    vi.stubEnv('CONTACT_TO_EMAIL', 'peopleasociacion@gmail.com');
    enviarMock.mockResolvedValue({ data: { id: 'msg_1' }, error: null });
  });

  describe('happy path', () => {
    it('debe devolver 200 y enviar el correo cuando los datos son válidos', async () => {
      const handler = await cargarHandler();
      const { res, resultado } = crearRespuesta();

      await handler(crearPeticion(), res);

      expect(resultado.status).toBe(200);
      expect(resultado.body).toMatchObject({ ok: true });
      expect(enviarMock).toHaveBeenCalledTimes(1);
    });

    it('debe enviar el correo al buzón configurado y responder a quien escribe', async () => {
      const handler = await cargarHandler();
      const { res } = crearRespuesta();

      await handler(crearPeticion(), res);

      expect(enviarMock).toHaveBeenCalledWith(
        expect.objectContaining({
          to: ['peopleasociacion@gmail.com'],
          replyTo: 'jennifer@correo.com',
        })
      );
    });

    it('debe aceptar el cuerpo cuando llega como texto en lugar de objeto', async () => {
      const handler = await cargarHandler();
      const { res, resultado } = crearRespuesta();
      const peticion = crearPeticion();

      await handler({ ...peticion, body: JSON.stringify(peticion.body) }, res);

      expect(resultado.status).toBe(200);
    });
  });

  describe('validación', () => {
    it('debe devolver 400 si falta el email', async () => {
      const handler = await cargarHandler();
      const { res, resultado } = crearRespuesta();
      const peticion = crearPeticion();

      await handler({ ...peticion, body: { ...(peticion.body as object), email: '' } }, res);

      expect(resultado.status).toBe(400);
      expect(enviarMock).not.toHaveBeenCalled();
    });

    it('debe devolver 400 si no se ha aceptado la política de privacidad', async () => {
      const handler = await cargarHandler();
      const { res, resultado } = crearRespuesta();
      const peticion = crearPeticion();

      await handler(
        { ...peticion, body: { ...(peticion.body as object), privacyAccepted: false } },
        res
      );

      expect(resultado.status).toBe(400);
      expect(enviarMock).not.toHaveBeenCalled();
    });

    it('debe devolver 400 si no llega ningún cuerpo', async () => {
      const handler = await cargarHandler();
      const { res, resultado } = crearRespuesta();

      await handler(crearPeticion({ body: undefined }), res);

      expect(resultado.status).toBe(400);
      expect(enviarMock).not.toHaveBeenCalled();
    });
  });

  describe('método', () => {
    it('debe devolver 405 con un método distinto de POST', async () => {
      const handler = await cargarHandler();
      const { res, resultado } = crearRespuesta();

      await handler(crearPeticion({ method: 'GET' }), res);

      expect(resultado.status).toBe(405);
      expect(resultado.headers.Allow).toBe('POST');
      expect(enviarMock).not.toHaveBeenCalled();
    });
  });

  describe('antispam', () => {
    it('debe descartar el envío si el campo trampa viene relleno', async () => {
      const handler = await cargarHandler();
      const { res, resultado } = crearRespuesta();
      const peticion = crearPeticion();

      await handler(
        { ...peticion, body: { ...(peticion.body as object), website: 'https://spam.example' } },
        res
      );

      // Responde 200 a propósito, para no darle pistas al bot
      expect(resultado.status).toBe(200);
      expect(enviarMock).not.toHaveBeenCalled();
    });

    it('debe devolver 429 al superar el límite de envíos desde la misma IP', async () => {
      const handler = await cargarHandler();
      const ip = '10.9.9.9';
      let ultimo = crearRespuesta();

      // El límite es de 5 envíos por ventana; el sexto debe rechazarse
      for (let intento = 0; intento < 6; intento += 1) {
        ultimo = crearRespuesta();
        await handler(crearPeticion({ headers: { 'x-forwarded-for': ip } }), ultimo.res);
      }

      expect(ultimo.resultado.status).toBe(429);
      expect(enviarMock).toHaveBeenCalledTimes(5);
    });
  });

  describe('errores del servidor', () => {
    it('debe devolver 500 si faltan las variables de entorno', async () => {
      vi.stubEnv('RESEND_API_KEY', '');
      const handler = await cargarHandler();
      const { res, resultado } = crearRespuesta();

      await handler(crearPeticion(), res);

      expect(resultado.status).toBe(500);
      expect(enviarMock).not.toHaveBeenCalled();
    });

    it('debe devolver 502 si el proveedor de correo falla', async () => {
      enviarMock.mockResolvedValue({ data: null, error: { message: 'fallo del proveedor' } });
      const handler = await cargarHandler();
      const { res, resultado } = crearRespuesta();

      await handler(crearPeticion(), res);

      expect(resultado.status).toBe(502);
      expect(resultado.body).toMatchObject({ ok: false });
    });

    it('debe devolver 500 si el envío lanza una excepción', async () => {
      enviarMock.mockRejectedValue(new Error('la red se ha caído'));
      const handler = await cargarHandler();
      const { res, resultado } = crearRespuesta();

      await handler(crearPeticion(), res);

      expect(resultado.status).toBe(500);
    });
  });

  describe('seguridad del contenido', () => {
    it('debe escapar el HTML del mensaje para que no se inyecte en el correo', async () => {
      const handler = await cargarHandler();
      const { res } = crearRespuesta();
      const peticion = crearPeticion();

      await handler(
        {
          ...peticion,
          body: {
            ...(peticion.body as object),
            message: '<script>alert("xss")</script> hola',
          },
        },
        res
      );

      const argumentos = enviarMock.mock.calls[0][0] as { html: string };
      expect(argumentos.html).not.toContain('<script>');
      expect(argumentos.html).toContain('&lt;script&gt;');
    });
  });
});
