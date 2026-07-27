import type { RouteRecord } from 'vite-react-ssg';
import Layout from '@/components/layout/Layout/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import QuienesSomosPage from '@/pages/QuienesSomosPage/QuienesSomosPage';
import VoluntariadoPage from '@/pages/VoluntariadoPage/VoluntariadoPage';
import NecesitasAyudaPage from '@/pages/NecesitasAyudaPage/NecesitasAyudaPage';
import ColaboraPage from '@/pages/ColaboraPage/ColaboraPage';
import ContactoPage from '@/pages/ContactoPage/ContactoPage';
import AvisoLegalPage from '@/pages/AvisoLegalPage/AvisoLegalPage';
import PoliticaPrivacidadPage from '@/pages/PoliticaPrivacidadPage/PoliticaPrivacidadPage';
import PoliticaCookiesPage from '@/pages/PoliticaCookiesPage/PoliticaCookiesPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

/**
 * Rutas del sitio.
 *
 * Son exactamente las mismas direcciones que tenía la web en Wix, para que
 * ningún enlace ya indexado o compartido deje de funcionar.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'quienes-somos', element: <QuienesSomosPage /> },
      { path: 'voluntariado', element: <VoluntariadoPage /> },
      { path: 'necesitas-ayuda', element: <NecesitasAyudaPage /> },
      { path: 'colabora', element: <ColaboraPage /> },
      { path: 'contacto', element: <ContactoPage /> },
      { path: 'aviso-legal', element: <AvisoLegalPage /> },
      { path: 'politica-de-privacidad', element: <PoliticaPrivacidadPage /> },
      { path: 'politica-de-cookies', element: <PoliticaCookiesPage /> },
      { path: '404', element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
