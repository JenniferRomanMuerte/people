import { Link } from 'react-router-dom';
import { LEGAL_NAV } from '@/data/navigation';
import { SITE_INFO } from '@/data/siteInfo';
import Image from '@/components/ui/Image/Image';
import InstagramIcon from '@/components/ui/InstagramIcon/InstagramIcon';
import './Footer.scss';

const Footer = () => {
  // Se calcula al construir el sitio, así no hay que tocarlo cada enero
  const anio = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Aviso de emergencia: es lo primero del pie y está en todas las páginas */}
      <div className="footer__emergencia">
        <div className="contenedor footer__emergencia-contenido">
          <p className="footer__emergencia-titulo">Si estás en peligro, llama al 016</p>
          <p className="footer__emergencia-texto">
            Atención 24 horas, gratuita y confidencial. La llamada no queda registrada en la
            factura del teléfono. En caso de emergencia, marca el{' '}
            <a className="footer__emergencia-enlace" href={`tel:${SITE_INFO.emergencyPhoneGeneral}`}>
              {SITE_INFO.emergencyPhoneGeneral}
            </a>
            .
          </p>
          <a className="footer__emergencia-boton" href={`tel:${SITE_INFO.emergencyPhone}`}>
            Llamar al {SITE_INFO.emergencyPhone}
          </a>
        </div>
      </div>

      <div className="contenedor footer__principal">
        <div className="footer__marca">
          <Image name="logo-simbolo" alt="" sizes="72px" className="footer__logo" />
          <p className="footer__nombre">{SITE_INFO.name}</p>
          <p className="footer__lema">{SITE_INFO.tagline}</p>
        </div>

        <div className="footer__contacto">
          <h2 className="footer__titulo">Contacto</h2>
          <ul className="footer__datos">
            <li>
              <a className="footer__enlace" href={`mailto:${SITE_INFO.email}`}>
                {SITE_INFO.email}
              </a>
            </li>
            <li>
              <a className="footer__enlace" href={`mailto:${SITE_INFO.volunteerEmail}`}>
                {SITE_INFO.volunteerEmail}
              </a>
            </li>
            <li>{SITE_INFO.address}</li>
          </ul>

          <a
            className="footer__instagram"
            href={SITE_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="footer__instagram-icono" />
            <span>{SITE_INFO.instagramHandle}</span>
          </a>
        </div>

        <nav className="footer__legal" aria-label="Enlaces legales">
          <h2 className="footer__titulo">Legal</h2>
          <ul className="footer__lista-legal">
            {LEGAL_NAV.map(({ label, path }) => (
              <li key={path}>
                <Link className="footer__enlace-legal" to={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer__creditos">
        <div className="contenedor">
          <p>
            © {anio} {SITE_INFO.name} · {SITE_INFO.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
