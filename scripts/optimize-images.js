/**
 * Optimiza las imágenes originales y genera las variantes responsive.
 *
 *   assets-source/  →  src/assets/images/
 *
 * Por cada imagen se generan varios anchos en WebP y se escribe un manifiesto
 * (manifest.ts) con la ruta, el srcSet y las dimensiones reales de cada una.
 * El componente Imagen usa ese manifiesto para pintar srcset y width/height,
 * de modo que el navegador descarga solo el tamaño que necesita y la página
 * no sufre saltos de maquetación mientras carga.
 *
 * Uso:  npm run images
 */

import sharp from 'sharp';
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEN = path.join(RAIZ, 'assets-source');
const DESTINO = path.join(RAIZ, 'src', 'assets', 'images');
const PUBLICO = path.join(RAIZ, 'public');

// Anchos generados según el papel de cada imagen en la página
const ANCHOS = {
  hero: [640, 1024, 1600, 2000],
  contenido: [480, 800, 1200],
  ilustracion: [400, 800],
  logo: [160, 320, 640],
};

/**
 * Cada entrada relaciona el archivo original de Wix con su nombre definitivo.
 * El campo `tipo` decide qué anchos se generan.
 */
const IMAGENES = [
  // --- Marca ---
  { origen: '8e56e1_c70090066cb744e6aba2230920039770~mv2.png', nombre: 'logo-simbolo', tipo: 'logo' },
  { origen: '8e56e1_7a9493d72ef746b1ae62aa515543496b~mv2.png', nombre: 'logo-people', tipo: 'logo' },

  // --- Inicio ---
  { origen: '8e56e1_7dffb95325c94a358491eb951caa1549~mv2.webp', nombre: 'inicio-hero', tipo: 'hero' },
  { origen: '8e56e1_e58f0c47c6ae417db3842e17f23311c4~mv2.webp', nombre: 'inicio-dia-a-dia', tipo: 'contenido' },
  { origen: '8e56e1_0f6ff1d7540643f5bc7882f109f54b01~mv2.webp', nombre: 'inicio-juntas', tipo: 'contenido' },

  // --- Quiénes somos ---
  { origen: '8e56e1_46c2b5258e0444b089bd5de1ad080c1c~mv2.webp', nombre: 'quienes-somos-hero', tipo: 'hero' },
  { origen: '8e56e1_e43c0ae193304d21932118dc2e0d9b51~mv2.webp', nombre: 'fondo-papel', tipo: 'hero' },
  { origen: '8e56e1_1776adcd9eeb4e5f932a6d424af05a46~mv2.webp', nombre: 'dimension-afectiva', tipo: 'ilustracion' },
  { origen: '8e56e1_98002548103a488bb74c6ffcd8198be6~mv2.webp', nombre: 'plan-personalizado', tipo: 'ilustracion' },
  { origen: '8e56e1_13fa67b03176450aa81b9569d86f78e0~mv2.webp', nombre: 'acompanamiento-coordinado', tipo: 'ilustracion' },

  // --- Voluntariado ---
  { origen: '8e56e1_071ddd1fdeef4d819c5351d744b635ba~mv2.webp', nombre: 'voluntariado-hero', tipo: 'hero' },
  { origen: '8e56e1_272864480d25445c9c20efea17f5df8f~mv2.webp', nombre: 'voluntariado-actividades', tipo: 'ilustracion' },

  // --- Necesitas ayuda ---
  { origen: '8e56e1_9507d179ebc24e6bb9139588b907e6ac~mv2.jpg', nombre: 'necesitas-ayuda-hero', tipo: 'hero' },

  // --- Colabora ---
  { origen: '8e56e1_ff48051940f947e2abb5999b12da0a2f~mv2.webp', nombre: 'colabora-hero', tipo: 'ilustracion' },
  { origen: '8e56e1_3dda4b9c27bd44cd9b94348311962667~mv2.webp', nombre: 'colabora-socia', tipo: 'ilustracion' },
  { origen: '8e56e1_d0a8cfefb12e4137b71e87056a5061fe~mv2.webp', nombre: 'colabora-donacion', tipo: 'ilustracion' },
  { origen: '8e56e1_32555c8abbbd445f9a6fdaeb6513cbd2~mv2.webp', nombre: 'colabora-brote', tipo: 'ilustracion' },

  // --- Contacto ---
  { origen: '11062b_c44b7ad392bc48139ff5a2801ce4f312~mv2.jpeg', nombre: 'contacto-atardecer', tipo: 'hero' },
];

// Iconos generados a partir del símbolo del logo
const FAVICONS = [
  { nombre: 'favicon.png', tamano: 96 },
  { nombre: 'apple-touch-icon.png', tamano: 180 },
  { nombre: 'icono-192.png', tamano: 192 },
  { nombre: 'icono-512.png', tamano: 512 },
];

const formatearPeso = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const generarImagen = async ({ origen, nombre, tipo }) => {
  const rutaOrigen = path.join(ORIGEN, origen);
  const original = sharp(rutaOrigen);
  const meta = await original.metadata();

  const anchosPosibles = ANCHOS[tipo];
  // Nunca ampliar: solo se generan anchos por debajo del original
  const anchos = anchosPosibles.filter((ancho) => ancho <= meta.width);
  if (anchos.length === 0) anchos.push(meta.width);

  const variantes = [];

  for (const ancho of anchos) {
    const archivo = `${nombre}-${ancho}.webp`;
    const info = await sharp(rutaOrigen)
      .resize({ width: ancho, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(path.join(DESTINO, archivo));

    variantes.push({ archivo, ancho: info.width, alto: info.height, peso: info.size });
  }

  const mayor = variantes[variantes.length - 1];
  console.log(
    `  ${nombre.padEnd(28)} ${String(meta.width).padStart(5)}px → ` +
      `${variantes.length} variantes, mayor ${formatearPeso(mayor.peso)}`
  );

  return {
    nombre,
    // La variante más grande hace de src por defecto
    principal: mayor,
    variantes,
    // Proporción real, para reservar el hueco antes de que cargue
    ratio: Number((meta.width / meta.height).toFixed(4)),
  };
};

const generarFavicons = async () => {
  const rutaLogo = path.join(ORIGEN, '8e56e1_c70090066cb744e6aba2230920039770~mv2.png');

  for (const { nombre, tamano } of FAVICONS) {
    await sharp(rutaLogo)
      .resize({ width: tamano, height: tamano, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(PUBLICO, nombre));
  }

  console.log(`  ${FAVICONS.length} iconos generados en public/`);
};

// Convierte "inicio-dia-a-dia-640.webp" en un identificador válido de JS
const aIdentificador = (archivo) =>
  archivo
    .replace(/\.webp$/, '')
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, caracter) => caracter.toUpperCase())
    .replace(/^(\d)/, '_$1');

const escribirManifiesto = async (resultados) => {
  // Las imágenes se importan de verdad para que Vite las procese, les ponga
  // hash y las incluya en el bundle. Un string con la ruta no funcionaría.
  const imports = [];
  const entradas = [];

  for (const r of resultados) {
    const variantes = r.variantes.map((v) => {
      const identificador = aIdentificador(v.archivo);
      imports.push(`import ${identificador} from './${v.archivo}';`);
      return `    { url: ${identificador}, ancho: ${v.ancho} }`;
    });

    entradas.push(`  '${r.nombre}': {
    ancho: ${r.principal.ancho},
    alto: ${r.principal.alto},
    ratio: ${r.ratio},
    variantes: [
${variantes.join(',\n')}
    ],
  }`);
  }

  const contenido = `// ARCHIVO GENERADO — no editar a mano.
// Se regenera con: npm run images

${imports.join('\n')}

export interface VarianteImagen {
  url: string;
  ancho: number;
}

export interface DatosImagen {
  ancho: number;
  alto: number;
  ratio: number;
  variantes: VarianteImagen[];
}

export const IMAGENES = {
${entradas.join(',\n')},
} satisfies Record<string, DatosImagen>;

export type NombreImagen = keyof typeof IMAGENES;
`;

  await writeFile(path.join(DESTINO, 'manifest.ts'), contenido, 'utf8');
  console.log(`  manifest.ts escrito con ${resultados.length} imágenes`);
};

const main = async () => {
  console.log('\nOptimizando imágenes...\n');

  // Se limpia el destino para que no queden variantes de ejecuciones anteriores
  await rm(DESTINO, { recursive: true, force: true });
  await mkdir(DESTINO, { recursive: true });
  await mkdir(PUBLICO, { recursive: true });

  const disponibles = await readdir(ORIGEN);
  const faltantes = IMAGENES.filter((i) => !disponibles.includes(i.origen));

  if (faltantes.length > 0) {
    console.error('\nFaltan imágenes en assets-source/:');
    faltantes.forEach((f) => console.error(`  - ${f.origen}`));
    process.exit(1);
  }

  const resultados = [];
  for (const imagen of IMAGENES) {
    resultados.push(await generarImagen(imagen));
  }

  await generarFavicons();
  await escribirManifiesto(resultados);

  console.log('\nListo.\n');
};

main().catch((error) => {
  console.error('\nError optimizando las imágenes:', error);
  process.exit(1);
});
