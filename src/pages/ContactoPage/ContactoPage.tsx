import { Link } from 'react-router-dom';
import Seo from '@/components/ui/Seo/Seo';
import Image from '@/components/ui/Image/Image';
import PaperFigures from '@/components/ui/PaperFigures/PaperFigures';
import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';
import SuccessMessage from '@/components/ui/SuccessMessage/SuccessMessage';
import { useContactForm } from '@/hooks/useContactForm';
import {
  MAX_EMAIL_LENGTH,
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MAX_PHONE_LENGTH,
} from '@/utils/validateContactForm';
import { SITE_INFO } from '@/data/siteInfo';
import './ContactoPage.scss';

const ContactoPage = () => {
  const { formData, errors, loading, serverError, success, handleChange, handleSubmit } =
    useContactForm();

  return (
    <>
      <Seo
        title="Contacto | People, acompañando a la mujer maltratada"
        description="Contacta con People Asociación en Madrid. Si necesitas acompañamiento o quieres colaborar en la red contra la violencia de género, escríbenos y te responderemos lo antes posible."
        path="/contacto"
      />

      <section className="contacto">
        {/* --- Conversación --- */}
        <div className="contacto__conversacion">
          <div className="contacto__conversacion-interior">
            <h1 className="contacto__titulo">Hablemos</h1>

            {/*
              Cada pregunta es la etiqueta de su campo: además de leerse como
              una conversación, es lo que anuncia el lector de pantalla al
              entrar en el input.
            */}
            <form className="contacto__chat" onSubmit={handleSubmit} noValidate>
              <p className="contacto__burbuja contacto__burbuja--pregunta">
                Si necesitas información, apoyo o quieres colaborar con People Asociación,
                cuéntanoslo.
              </p>

              <label className="contacto__burbuja contacto__burbuja--pregunta" htmlFor="nombre">
                ¿Cómo te llamas?
                <span className="contacto__obligatorio" aria-hidden="true">
                  *
                </span>
              </label>
              <div className="contacto__respuesta">
                <input
                  className="contacto__burbuja contacto__burbuja--respuesta"
                  id="nombre"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre..."
                  autoComplete="given-name"
                  maxLength={MAX_NAME_LENGTH}
                  required
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'error-nombre' : undefined}
                />
                {errors.name && (
                  <p className="contacto__error" id="error-nombre">
                    {errors.name}
                  </p>
                )}
              </div>

              <label className="contacto__burbuja contacto__burbuja--pregunta" htmlFor="apellido">
                ¿Y tu apellido?
              </label>
              <div className="contacto__respuesta">
                <input
                  className="contacto__burbuja contacto__burbuja--respuesta"
                  id="apellido"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Tu apellido..."
                  autoComplete="family-name"
                  maxLength={MAX_NAME_LENGTH}
                  aria-invalid={errors.lastName ? true : undefined}
                  aria-describedby={errors.lastName ? 'error-apellido' : undefined}
                />
                {errors.lastName && (
                  <p className="contacto__error" id="error-apellido">
                    {errors.lastName}
                  </p>
                )}
              </div>

              <label className="contacto__burbuja contacto__burbuja--pregunta" htmlFor="email">
                ¿Dónde podemos escribirte?
                <span className="contacto__obligatorio" aria-hidden="true">
                  *
                </span>
              </label>
              <div className="contacto__respuesta">
                <input
                  className="contacto__burbuja contacto__burbuja--respuesta"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Tu email..."
                  autoComplete="email"
                  maxLength={MAX_EMAIL_LENGTH}
                  required
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                />
                {errors.email && (
                  <p className="contacto__error" id="error-email">
                    {errors.email}
                  </p>
                )}
              </div>

              <label className="contacto__burbuja contacto__burbuja--pregunta" htmlFor="telefono">
                ¿Nos dejas un teléfono?
              </label>
              <div className="contacto__respuesta">
                <input
                  className="contacto__burbuja contacto__burbuja--respuesta"
                  id="telefono"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Tu teléfono..."
                  autoComplete="tel"
                  maxLength={MAX_PHONE_LENGTH}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? 'error-telefono' : undefined}
                />
                {errors.phone && (
                  <p className="contacto__error" id="error-telefono">
                    {errors.phone}
                  </p>
                )}
              </div>

              <label className="contacto__burbuja contacto__burbuja--pregunta" htmlFor="mensaje">
                Cuéntanos qué necesitas
                <span className="contacto__obligatorio" aria-hidden="true">
                  *
                </span>
              </label>
              <div className="contacto__respuesta">
                <textarea
                  className="contacto__burbuja contacto__burbuja--respuesta contacto__burbuja--larga"
                  id="mensaje"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escribe tu mensaje..."
                  rows={5}
                  maxLength={MAX_MESSAGE_LENGTH}
                  required
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? 'error-mensaje' : undefined}
                />
                {errors.message && (
                  <p className="contacto__error" id="error-mensaje">
                    {errors.message}
                  </p>
                )}
              </div>

              {/*
                Campo trampa para bots: está oculto y ninguna persona lo ve,
                así que si llega relleno el servidor descarta el envío.
              */}
              <div className="contacto__trampa" aria-hidden="true">
                <label htmlFor="website">No rellenar este campo</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <p className="contacto__leyenda">
                <span aria-hidden="true">*</span> Campos obligatorios
              </p>

              <div className="contacto__envio">
                <label className="contacto__privacidad">
                  <input
                    className="contacto__casilla"
                    type="checkbox"
                    name="privacyAccepted"
                    checked={formData.privacyAccepted}
                    onChange={handleChange}
                    required
                    aria-invalid={errors.privacyAccepted ? true : undefined}
                    aria-describedby={errors.privacyAccepted ? 'error-privacidad' : undefined}
                  />
                  <span>
                    He leído y acepto la{' '}
                    <Link to="/politica-de-privacidad">política de privacidad</Link>
                  </span>
                </label>

                <button className="contacto__enviar" type="submit" disabled={loading}>
                  {loading ? 'Enviando…' : 'Enviar →'}
                </button>
              </div>

              {errors.privacyAccepted && (
                <p className="contacto__error contacto__error--suelto" id="error-privacidad">
                  {errors.privacyAccepted}
                </p>
              )}

              {serverError && <ErrorMessage mensaje={serverError} />}
              {success && (
                <SuccessMessage mensaje="Hemos recibido tu mensaje. Te responderemos lo antes posible." />
              )}
            </form>
          </div>
        </div>

        {/* --- Datos de contacto --- */}
        <aside className="contacto__lateral">
          <PaperFigures background="claro" className="contacto__figuras" />

          <h2 className="contacto__lateral-titulo">También puedes escribirnos</h2>

          <ul className="contacto__lista">
            <li>
              <a className="contacto__enlace" href={`mailto:${SITE_INFO.email}`}>
                {SITE_INFO.email}
              </a>
            </li>
            <li>
              Voluntariado:{' '}
              <a className="contacto__enlace" href={`mailto:${SITE_INFO.volunteerEmail}`}>
                {SITE_INFO.volunteerEmail}
              </a>
            </li>
            <li>{SITE_INFO.address}</li>
            <li>
              <a
                className="contacto__enlace"
                href={SITE_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                {SITE_INFO.instagramHandle}
              </a>
            </li>
          </ul>

          {/* Firma de cierre, empujada al fondo de la columna */}
          <div className="contacto__firma">
            <Image name="logo-simbolo" alt="" sizes="96px" className="contacto__logo" />
            <p className="contacto__firma-nombre">{SITE_INFO.name}</p>
            <p className="contacto__firma-nota">Te contestaremos lo antes posible</p>
          </div>
        </aside>
      </section>
    </>
  );
};

export default ContactoPage;
