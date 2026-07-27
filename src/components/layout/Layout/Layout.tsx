import { Outlet } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import QuickExit from '@/components/layout/QuickExit/QuickExit';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { SITE_INFO, SITE_URL } from '@/data/siteInfo';
import './Layout.scss';

/** Datos estructurados de la asociación, para que Google entienda quién es */
const datosEstructurados = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: SITE_INFO.legalName,
  alternateName: SITE_INFO.name,
  description: SITE_INFO.tagline,
  url: SITE_URL,
  email: SITE_INFO.email,
  logo: `${SITE_URL}/icono-512.png`,
  taxID: SITE_INFO.cif,
  areaServed: 'Madrid, España',
  sameAs: [SITE_INFO.instagram],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Menorca 7, 2º',
    postalCode: '28009',
    addressLocality: 'Madrid',
    addressCountry: 'ES',
  },
};

const Layout = () => {
  useScrollToTop();

  return (
    <div className="layout">
      <Head>
        <html lang="es" />
        <script type="application/ld+json">{JSON.stringify(datosEstructurados)}</script>
      </Head>

      {/* Primer elemento tabulable: permite saltarse el menú con el teclado */}
      <a className="salto-contenido" href="#contenido-principal">
        Saltar al contenido principal
      </a>

      <Header />

      <main className="layout__contenido" id="contenido-principal">
        <Outlet />
      </main>

      <Footer />
      <QuickExit />
    </div>
  );
};

export default Layout;
