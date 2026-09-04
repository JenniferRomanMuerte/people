/**
 * Datos de la asociación en un único sitio.
 * Todos están tomados literalmente de la web original.
 */
export const SITE_INFO = {
  name: 'People',
  tagline: 'Acompañando a la mujer maltratada',

  // Denominación y datos registrales (aviso legal)
  legalName: 'PEOPLE, ACOMPAÑANDO A LA MUJER MALTRATADA',
  cif: 'G-87716015',
  nationalRegistry: '612316',
  madridRegistry: '4314',

  // Contacto
  email: 'info@peopleasociacion.com',
  volunteerEmail: 'voluntarias@peopleasociacion.com',

  // Dirección del espacio donde se acompaña (la que aparece en el pie)
  address: 'C/ Nicolás Usera, 27 · Espacio Oculto (Madrid)',
  // Domicilio social que consta en el aviso legal y la política de privacidad
  registeredAddress: 'Calle Menorca 7, 2º, 28009 Madrid',

  // Redes y plataformas de colaboración
  instagram: 'https://www.instagram.com/peopleasociacion/',
  instagramHandle: '@peopleasociacion',
  teaming: 'https://www.teaming.net/people-acompanandoalamujermaltratada',
  gofundme: 'https://www.gofundme.com/f/a-mujeres-victimas-de-violencia-de-genero',

  // Teléfono de atención a víctimas de violencia de género.
  // Es gratuito, atiende 24 horas y no deja rastro en la factura.
  emergencyPhone: '016',
  emergencyPhoneWhatsApp: '600 000 016',
  emergencyPhoneGeneral: '112',
} as const;

/** URL pública del sitio, usada en las etiquetas canónicas y og: */
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://www.peopleasociacion.com').replace(
  /\/$/,
  ''
);
