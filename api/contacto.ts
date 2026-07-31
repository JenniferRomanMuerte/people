import type { VercelRequest, VercelResponse } from './_types';
import { Resend } from 'resend';
// La extensión es obligatoria: el paquete declara `"type": "module"` y Vercel
// compila esta función a ESM sin empaquetarla, de modo que Node resuelve el
// import tal cual y sin ella lanza ERR_MODULE_NOT_FOUND al cargar el módulo.
// TypeScript la mapea al archivo .ts, y Vite y Vitest también.
import { hasErrors, validateContactForm } from '../src/utils/validateContactForm.js';
import type { ContactMessage } from '../src/types/ContactMessage';

/**
 * Recibe el formulario de contacto y lo reenvía por correo.
 *
 * La clave de la API vive solo aquí, en el servidor: nunca se incluye en el
 * bundle que descarga el navegador.
 */

const MAX_PETICIONES = 5;
const VENTANA_MS = 10 * 60 * 1000; // 10 minutos

/**
 * Control básico de peticiones por IP.
 * Es un apaño a nivel de instancia: en serverless cada instancia tiene su
 * propia memoria y se reinicia sola, así que no sustituye a un limitador real.
 * Sirve para frenar el abuso más burdo sin añadir infraestructura.
 */
const peticionesPorIp = new Map<string, { contador: number; reinicioEn: number }>();

const superaLimite = (ip: string): boolean => {
  const ahora = Date.now();
  const registro = peticionesPorIp.get(ip);

  if (!registro || ahora > registro.reinicioEn) {
    peticionesPorIp.set(ip, { contador: 1, reinicioEn: ahora + VENTANA_MS });
    return false;
  }

  registro.contador += 1;
  return registro.contador > MAX_PETICIONES;
};

const obtenerIp = (req: VercelRequest): string => {
  const cabecera = req.headers['x-forwarded-for'];
  if (typeof cabecera === 'string') return cabecera.split(',')[0].trim();
  if (Array.isArray(cabecera)) return cabecera[0];
  return 'desconocida';
};

/** Escapa el contenido para que no pueda inyectar HTML en el correo */
const escaparHtml = (texto: string): string =>
  texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const construirHtml = (datos: ContactMessage): string => {
  const fila = (etiqueta: string, valor: string) =>
    valor
      ? `<tr>
           <td style="padding:8px 16px 8px 0;color:#755d7a;vertical-align:top;white-space:nowrap;">${etiqueta}</td>
           <td style="padding:8px 0;color:#47274d;">${escaparHtml(valor)}</td>
         </tr>`
      : '';

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:24px;background:#fcf4fb;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px;">
      <h1 style="margin:0 0 24px;font-size:20px;color:#47274d;">Nuevo mensaje desde la web</h1>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        ${fila('Nombre', `${datos.name} ${datos.lastName}`.trim())}
        ${fila('Email', datos.email)}
        ${fila('Teléfono', datos.phone)}
      </table>
      <h2 style="margin:32px 0 8px;font-size:15px;color:#755d7a;">Mensaje</h2>
      <p style="margin:0;font-size:15px;line-height:1.7;color:#47274d;white-space:pre-wrap;">${escaparHtml(
        datos.message
      )}</p>
      <p style="margin:32px 0 0;padding-top:16px;border-top:1px solid #e7d7eb;font-size:13px;color:#8f8f8f;">
        Esta persona ha aceptado la política de privacidad al enviar el formulario.
        Puedes responder directamente a este correo.
      </p>
    </div>
  </body>
</html>`;
};

const construirTexto = (datos: ContactMessage): string =>
  [
    'Nuevo mensaje desde la web',
    '',
    `Nombre: ${`${datos.name} ${datos.lastName}`.trim()}`,
    `Email: ${datos.email}`,
    datos.phone ? `Teléfono: ${datos.phone}` : '',
    '',
    'Mensaje:',
    datos.message,
  ]
    .filter(Boolean)
    .join('\n');

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Método no permitido.' });
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;

  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    // El detalle va al log del servidor; a la persona usuaria solo un aviso claro
    console.error('Faltan variables de entorno para el envío del formulario.');
    return res.status(500).json({
      ok: false,
      message: 'El formulario no está disponible ahora mismo. Escríbenos por correo, por favor.',
    });
  }

  if (superaLimite(obtenerIp(req))) {
    return res.status(429).json({
      ok: false,
      message: 'Has enviado varios mensajes seguidos. Espera unos minutos e inténtalo de nuevo.',
    });
  }

  const cuerpo = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as
    | Partial<ContactMessage>
    | undefined;

  if (!cuerpo || typeof cuerpo !== 'object') {
    return res.status(400).json({ ok: false, message: 'No hemos recibido ningún dato.' });
  }

  // El campo trampa solo lo rellenan los bots: se responde con éxito para no
  // darles pistas, pero no se envía nada.
  if (typeof cuerpo.website === 'string' && cuerpo.website.trim() !== '') {
    return res.status(200).json({ ok: true, message: 'Mensaje recibido.' });
  }

  const datos: ContactMessage = {
    name: String(cuerpo.name ?? '').trim(),
    lastName: String(cuerpo.lastName ?? '').trim(),
    email: String(cuerpo.email ?? '').trim(),
    phone: String(cuerpo.phone ?? '').trim(),
    message: String(cuerpo.message ?? '').trim(),
    privacyAccepted: cuerpo.privacyAccepted === true,
  };

  // Se vuelve a validar en el servidor: lo que llega del navegador
  // se puede manipular, así que nunca se da por bueno.
  const errores = validateContactForm(datos);
  if (hasErrors(errores)) {
    return res.status(400).json({
      ok: false,
      message: 'Revisa los datos del formulario, hay algún campo incorrecto.',
      errors: errores,
    });
  }

  try {
    const resend = new Resend(RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `People Web <${CONTACT_FROM_EMAIL}>`,
      to: [CONTACT_TO_EMAIL],
      // Al responder al correo se escribe directamente a quien lo envió
      replyTo: datos.email,
      subject: `Nuevo mensaje de ${datos.name} ${datos.lastName}`.trim(),
      html: construirHtml(datos),
      text: construirTexto(datos),
    });

    if (error) {
      console.error('Error de Resend al enviar el formulario:', error);
      return res.status(502).json({
        ok: false,
        message: 'No hemos podido enviar tu mensaje. Inténtalo de nuevo en unos minutos.',
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Hemos recibido tu mensaje. Te responderemos lo antes posible.',
    });
  } catch (error) {
    console.error('Fallo inesperado enviando el formulario:', error);
    return res.status(500).json({
      ok: false,
      message: 'No hemos podido enviar tu mensaje. Inténtalo de nuevo en unos minutos.',
    });
  }
};

export default handler;
