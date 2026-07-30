import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ContactoPage from './ContactoPage';
import { contactService } from '@/services/contactService';

// El servicio se sustituye por un doble: los tests no deben enviar correos
vi.mock('@/services/contactService', () => ({
  contactService: { send: vi.fn() },
}));

// `Head` necesita el proveedor que monta ViteReactSSG en la app real.
// Aquí se anula porque lo que se prueba es el formulario, no las etiquetas SEO.
vi.mock('vite-react-ssg', () => ({
  Head: () => null,
}));

const enviarMock = vi.mocked(contactService.send);

// Cada campo se identifica por la pregunta de su burbuja, que es su etiqueta
const NOMBRE = /¿Cómo te llamas\?/;
const APELLIDO = /¿Y tu apellido\?/;
const EMAIL = /¿Dónde podemos escribirte\?/;
const TELEFONO = /¿Nos dejas un teléfono\?/;
const MENSAJE = /Cuéntanos qué necesitas/;
const ENVIAR = /^Enviar/;

const renderizarPagina = () =>
  render(
    <MemoryRouter>
      <ContactoPage />
    </MemoryRouter>
  );

/** Rellena el formulario con datos válidos, salvo lo que se indique omitir */
const rellenarFormulario = async (
  user: ReturnType<typeof userEvent.setup>,
  opciones: { aceptarPrivacidad?: boolean } = {}
) => {
  const { aceptarPrivacidad = true } = opciones;

  await user.type(screen.getByLabelText(NOMBRE), 'Jennifer');
  await user.type(screen.getByLabelText(APELLIDO), 'Román');
  await user.type(screen.getByLabelText(EMAIL), 'jennifer@correo.com');
  await user.type(screen.getByLabelText(TELEFONO), '600 123 456');
  await user.type(screen.getByLabelText(MENSAJE), 'Quiero información sobre el voluntariado.');

  if (aceptarPrivacidad) {
    await user.click(screen.getByRole('checkbox'));
  }
};

describe('ContactoPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe mostrar el formulario con todos sus campos', () => {
    renderizarPagina();

    expect(screen.getByLabelText(NOMBRE)).toBeInTheDocument();
    expect(screen.getByLabelText(APELLIDO)).toBeInTheDocument();
    expect(screen.getByLabelText(EMAIL)).toBeInTheDocument();
    expect(screen.getByLabelText(TELEFONO)).toBeInTheDocument();
    expect(screen.getByLabelText(MENSAJE)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: ENVIAR })).toBeInTheDocument();
  });

  it('no debe enviar nada si los campos obligatorios están vacíos', async () => {
    const user = userEvent.setup();
    renderizarPagina();

    await user.click(screen.getByRole('button', { name: ENVIAR }));

    expect(await screen.findByText('El nombre es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('El email es obligatorio.')).toBeInTheDocument();
    expect(enviarMock).not.toHaveBeenCalled();
  });

  it('no debe enviar si no se acepta la política de privacidad', async () => {
    const user = userEvent.setup();
    renderizarPagina();

    await rellenarFormulario(user, { aceptarPrivacidad: false });
    await user.click(screen.getByRole('button', { name: ENVIAR }));

    expect(
      await screen.findByText('Debes aceptar la política de privacidad para enviar el formulario.')
    ).toBeInTheDocument();
    expect(enviarMock).not.toHaveBeenCalled();
  });

  it('debe mostrar un error si el email no tiene un formato válido', async () => {
    const user = userEvent.setup();
    renderizarPagina();

    await user.type(screen.getByLabelText(NOMBRE), 'Jennifer');
    await user.type(screen.getByLabelText(EMAIL), 'esto-no-es-un-email');
    await user.type(screen.getByLabelText(MENSAJE), 'Hola');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: ENVIAR }));

    expect(
      await screen.findByText('Escribe un email válido, por ejemplo nombre@correo.com')
    ).toBeInTheDocument();
    expect(enviarMock).not.toHaveBeenCalled();
  });

  it('debe llamar al servicio con los datos correctos cuando el formulario es válido', async () => {
    const user = userEvent.setup();
    enviarMock.mockResolvedValue({ ok: true, message: 'Mensaje recibido.' });
    renderizarPagina();

    await rellenarFormulario(user);
    await user.click(screen.getByRole('button', { name: ENVIAR }));

    await waitFor(() => {
      expect(enviarMock).toHaveBeenCalledTimes(1);
    });

    expect(enviarMock).toHaveBeenCalledWith({
      name: 'Jennifer',
      lastName: 'Román',
      email: 'jennifer@correo.com',
      phone: '600 123 456',
      message: 'Quiero información sobre el voluntariado.',
      privacyAccepted: true,
      website: '',
    });
  });

  it('debe mostrar el mensaje de confirmación tras un envío correcto', async () => {
    const user = userEvent.setup();
    enviarMock.mockResolvedValue({ ok: true, message: 'Mensaje recibido.' });
    renderizarPagina();

    await rellenarFormulario(user);
    await user.click(screen.getByRole('button', { name: ENVIAR }));

    expect(
      await screen.findByText('Hemos recibido tu mensaje. Te responderemos lo antes posible.')
    ).toBeInTheDocument();
  });

  it('debe vaciar el formulario tras un envío correcto', async () => {
    const user = userEvent.setup();
    enviarMock.mockResolvedValue({ ok: true, message: 'Mensaje recibido.' });
    renderizarPagina();

    await rellenarFormulario(user);
    await user.click(screen.getByRole('button', { name: ENVIAR }));

    await waitFor(() => {
      expect(screen.getByLabelText(NOMBRE)).toHaveValue('');
    });
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('debe mostrar un error si el envío falla', async () => {
    const user = userEvent.setup();
    enviarMock.mockRejectedValue(new Error('No hemos podido enviar tu mensaje.'));
    renderizarPagina();

    await rellenarFormulario(user);
    await user.click(screen.getByRole('button', { name: ENVIAR }));

    expect(await screen.findByText('No hemos podido enviar tu mensaje.')).toBeInTheDocument();
  });

  it('debe deshabilitar el botón mientras se está enviando', async () => {
    const user = userEvent.setup();
    // La promesa se deja pendiente para poder observar el estado intermedio
    enviarMock.mockImplementation(() => new Promise(() => {}));
    renderizarPagina();

    await rellenarFormulario(user);
    await user.click(screen.getByRole('button', { name: ENVIAR }));

    expect(await screen.findByRole('button', { name: /^Enviando/ })).toBeDisabled();
  });

  it('debe borrar el error de un campo en cuanto se corrige', async () => {
    const user = userEvent.setup();
    renderizarPagina();

    await user.click(screen.getByRole('button', { name: ENVIAR }));
    expect(await screen.findByText('El nombre es obligatorio.')).toBeInTheDocument();

    await user.type(screen.getByLabelText(NOMBRE), 'J');

    await waitFor(() => {
      expect(screen.queryByText('El nombre es obligatorio.')).not.toBeInTheDocument();
    });
  });
});
