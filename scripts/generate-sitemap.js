/**
 * Genera dist/sitemap.xml a partir de las rutas reales del sitio.
 * Se ejecuta después del build, para que el sitemap no se desincronice
 * de las páginas al añadir o quitar alguna.
 */

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://www.peopleasociacion.com').replace(/\/$/, '');

// prioridad: importancia relativa dentro del sitio, no una nota de calidad
const PAGINAS = [
  { ruta: '/', prioridad: '1.0', frecuencia: 'monthly' },
  { ruta: '/quienes-somos', prioridad: '0.8', frecuencia: 'monthly' },
  { ruta: '/voluntariado', prioridad: '0.8', frecuencia: 'monthly' },
  { ruta: '/necesitas-ayuda', prioridad: '0.9', frecuencia: 'monthly' },
  { ruta: '/colabora', prioridad: '0.8', frecuencia: 'monthly' },
  { ruta: '/contacto', prioridad: '0.7', frecuencia: 'yearly' },
  { ruta: '/aviso-legal', prioridad: '0.2', frecuencia: 'yearly' },
  { ruta: '/politica-de-privacidad', prioridad: '0.2', frecuencia: 'yearly' },
  { ruta: '/politica-de-cookies', prioridad: '0.2', frecuencia: 'yearly' },
];

const hoy = new Date().toISOString().split('T')[0];

const urls = PAGINAS.map(
  ({ ruta, prioridad, frecuencia }) => `  <url>
    <loc>${SITE_URL}${ruta === '/' ? '/' : ruta}</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>${frecuencia}</changefreq>
    <priority>${prioridad}</priority>
  </url>`
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile(path.join(RAIZ, 'dist', 'sitemap.xml'), sitemap, 'utf8');
console.log(`sitemap.xml generado con ${PAGINAS.length} páginas`);
