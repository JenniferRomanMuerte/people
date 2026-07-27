import { Head } from 'vite-react-ssg';
import { SITE_INFO, SITE_URL } from '@/data/siteInfo';

interface Props {
  /** Título de la pestaña y del resultado en Google */
  title: string;
  description: string;
  /** Ruta de la página, para la etiqueta canónica. Ej: '/contacto' */
  path: string;
  /** Ruta absoluta de la imagen que se ve al compartir el enlace */
  image?: string;
  /** Páginas que no deben indexarse, como la 404 */
  noIndex?: boolean;
}

const Seo = ({ title, description, path, image, noIndex = false }: Props) => {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const imagenAbsoluta = image ? `${SITE_URL}${image}` : `${SITE_URL}/icono-512.png`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph — es lo que leen WhatsApp, Facebook o Instagram al compartir */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`${SITE_INFO.name} · ${SITE_INFO.tagline}`} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imagenAbsoluta} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imagenAbsoluta} />
    </Head>
  );
};

export default Seo;
