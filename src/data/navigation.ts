import type { NavLink } from '@/types/NavLink';

/** Menú principal — las etiquetas y el orden son los de la web original */
export const MAIN_NAV: NavLink[] = [
  { label: 'Inicio', path: '/' },
  { label: 'Sobre nosotras', path: '/quienes-somos' },
  { label: 'Voluntarias', path: '/voluntariado' },
  { label: 'Si nos necesitas', path: '/necesitas-ayuda' },
  { label: 'Involúcrate', path: '/colabora' },
  { label: 'Contacto', path: '/contacto' },
];

/** Enlaces legales del pie de página */
export const LEGAL_NAV: NavLink[] = [
  { label: 'Política de privacidad', path: '/politica-de-privacidad' },
  { label: 'Aviso Legal', path: '/aviso-legal' },
  { label: 'Política de cookies', path: '/politica-de-cookies' },
];
