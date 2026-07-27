import Seo from '@/components/ui/Seo/Seo';
import Button from '@/components/ui/Button/Button';
import { MAIN_NAV } from '@/data/navigation';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  // La portada ya está en el botón principal, no hace falta repetirla en la lista
  const enlaces = MAIN_NAV.filter(({ path }) => path !== '/');

  return (
    <>
      <Seo
        title="Página no encontrada | People, acompañando a la mujer maltratada"
        description="La página que buscas no existe o ha cambiado de dirección."
        path="/404"
        noIndex
      />

      <section className="not-found">
        <div className="contenedor contenedor--estrecho">
          <p className="not-found__codigo">404</p>
          <h1 className="not-found__titulo">Esta página no existe</h1>
          <p className="not-found__texto">
            Puede que el enlace esté equivocado o que la página haya cambiado de dirección. Desde
            aquí puedes volver al inicio o ir directamente a lo que buscabas.
          </p>

          <Button to="/">Volver al inicio</Button>

          <nav className="not-found__navegacion" aria-label="Otras páginas del sitio">
            <ul className="not-found__lista">
              {enlaces.map(({ label, path }) => (
                <li key={path}>
                  <Link className="not-found__enlace" to={path}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
