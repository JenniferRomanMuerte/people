import { Link } from 'react-router-dom';
import Seo from '@/components/ui/Seo/Seo';
import Input from '@/components/ui/Input/Input';
import Textarea from '@/components/ui/Textarea/Textarea';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Button from '@/components/ui/Button/Button';
import Image from '@/components/ui/Image/Image';
import ErrorMessage from '@/components/ui/ErrorMessage/ErrorMessage';
import SuccessMessage from '@/components/ui/SuccessMessage/SuccessMessage';
import InstagramIcon from '@/components/ui/InstagramIcon/InstagramIcon';
import { useContactForm } from '@/hooks/useContactForm';
import { MAX_MESSAGE_LENGTH } from '@/utils/validateContactForm';
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
        <div className="contenedor contacto__contenedor">
          {/* --- Formulario --- */}
          <div className="contacto__formulario">
            <h1 className="contacto__titulo">Contáctanos</h1>
            <p className="contacto__intro">
              Si necesitas información, apoyo o quieres colaborar con People Asociación, puedes
              escribirnos a través de este formulario. Te responderemos lo antes posible.
            </p>

            <form className="contacto__campos" onSubmit={handleSubmit} noValidate>
              <div className="contacto__fila">
                <Input
                  id="nombre"
                  name="name"
                  label="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  autoComplete="given-name"
                  required
                />
                <Input
                  id="apellido"
                  name="lastName"
                  label="Apellido"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  autoComplete="family-name"
                />
              </div>

              <div className="contacto__fila">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  autoComplete="email"
                  required
                />
                <Input
                  id="telefono"
                  name="phone"
                  type="tel"
                  label="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  autoComplete="tel"
                />
              </div>

              <Textarea
                id="mensaje"
                name="message"
                label="Mensaje"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                maxLength={MAX_MESSAGE_LENGTH}
                required
              />

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

              <Checkbox
                id="privacidad"
                name="privacyAccepted"
                checked={formData.privacyAccepted}
                onChange={handleChange}
                error={errors.privacyAccepted}
                required
                label={
                  <>
                    He leído y acepto la{' '}
                    <Link to="/politica-de-privacidad">política de privacidad</Link>.
                  </>
                }
              />

              {serverError && <ErrorMessage mensaje={serverError} />}
              {success && (
                <SuccessMessage mensaje="Hemos recibido tu mensaje. Te responderemos lo antes posible." />
              )}

              <Button type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar'}
              </Button>
            </form>
          </div>

          {/* --- Datos de contacto --- */}
          <aside className="contacto__datos">
            <div className="contacto__imagen">
              <Image
                name="contacto-atardecer"
                alt="Atardecer sobre el mar"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>

            <h2 className="contacto__datos-titulo">También puedes escribirnos</h2>

            <ul className="contacto__lista">
              <li className="contacto__dato">
                <span className="contacto__icono" aria-hidden="true">
                  📧
                </span>
                <a className="contacto__enlace" href={`mailto:${SITE_INFO.email}`}>
                  {SITE_INFO.email}
                </a>
              </li>
              <li className="contacto__dato">
                <span className="contacto__icono" aria-hidden="true">
                  🤝
                </span>
                <span>
                  Voluntariado:{' '}
                  <a className="contacto__enlace" href={`mailto:${SITE_INFO.volunteerEmail}`}>
                    {SITE_INFO.volunteerEmail}
                  </a>
                </span>
              </li>
              <li className="contacto__dato">
                <span className="contacto__icono" aria-hidden="true">
                  📍
                </span>
                <span>{SITE_INFO.address}</span>
              </li>
            </ul>

            <a
              className="contacto__instagram"
              href={SITE_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon className="contacto__instagram-icono" />
              <span>{SITE_INFO.instagramHandle}</span>
            </a>
          </aside>
        </div>
      </section>
    </>
  );
};

export default ContactoPage;
