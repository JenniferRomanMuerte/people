import { Link, NavLink } from 'react-router-dom';
import { MAIN_NAV } from '@/data/navigation';
import { SITE_INFO } from '@/data/siteInfo';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import Image from '@/components/ui/Image/Image';
import './Header.scss';

const Header = () => {
  const { isOpen, close, toggle } = useMobileMenu();

  return (
    <header className="header">
      <div className="header__contenedor contenedor">
        <Link className="header__marca" to="/" onClick={close}>
          <Image
            name="logo-simbolo"
            alt=""
            sizes="72px"
            priority
            className="header__logo"
          />
          <span className="header__marca-texto">
            <span className="header__nombre">{SITE_INFO.name}</span>
            <span className="header__lema">{SITE_INFO.tagline}</span>
          </span>
        </Link>

        <button
          className="header__boton-menu"
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls="menu-principal"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={`header__hamburguesa${isOpen ? ' header__hamburguesa--abierta' : ''}`} aria-hidden="true" />
        </button>

        <nav
          className={`header__nav${isOpen ? ' header__nav--abierto' : ''}`}
          id="menu-principal"
          aria-label="Navegación principal"
        >
          <ul className="header__lista">
            {MAIN_NAV.map(({ label, path }) => (
              <li key={path} className="header__item">
                <NavLink
                  className={({ isActive }) =>
                    `header__enlace${isActive ? ' header__enlace--activo' : ''}`
                  }
                  to={path}
                  onClick={close}
                  end={path === '/'}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Capa que cubre la página cuando el menú móvil está desplegado */}
      {isOpen && <div className="header__velo" onClick={close} aria-hidden="true" />}
    </header>
  );
};

export default Header;
