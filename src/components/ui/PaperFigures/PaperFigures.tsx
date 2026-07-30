import { memo } from 'react';
import './PaperFigures.scss';

/**
 * Fondo sobre el que se coloca la cadena. Cada valor sustituye el color de la
 * figura que quedaría invisible contra ese fondo.
 */
type Fondo = 'claro' | 'naranja' | 'oscuro';

interface Props {
  /** Ajusta los colores al fondo. Sin indicar nada usa la combinación base. */
  background?: Fondo;
  className?: string;
}

/**
 * Cadena de figuras recortadas tipo muñecos de papel, cogidas de la mano.
 *
 * Es un recurso decorativo: geometría plana, sin degradados ni sombras y sin
 * rasgos de cara ni ropa. Los colores salen de la paleta a través de custom
 * properties definidas en el SCSS, para no repetir hexadecimales aquí.
 *
 * Va marcado como decorativo, así que los lectores de pantalla lo ignoran.
 */
const PaperFigures = ({ background, className }: Props) => {
  // Centros de cada figura. La separación coincide con el alcance de los
  // brazos (50), de modo que las manos de figuras contiguas se tocan.
  const centros = [50, 150, 250, 350];

  return (
    <svg
      className={[
        'paper-figures',
        background ? `paper-figures--sobre-${background}` : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      viewBox="0 0 400 180"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {centros.map((cx, indice) => (
        <g key={cx} className={`paper-figures__figura paper-figures__figura--${indice + 1}`}>
          {/* Brazo izquierdo: se une con la mano de la figura anterior */}
          <polygon
            points={`${cx - 14},62 ${cx - 50},88 ${cx - 50},98 ${cx - 12},72`}
          />
          {/* Brazo derecho: se une con la mano de la figura siguiente */}
          <polygon
            points={`${cx + 14},62 ${cx + 50},88 ${cx + 50},98 ${cx + 12},72`}
          />
          {/* Cuerpo trapezoidal */}
          <polygon
            points={`${cx - 16},60 ${cx + 16},60 ${cx + 30},164 ${cx - 30},164`}
          />
          {/* Cabeza */}
          <circle cx={cx} cy={36} r={18} />
        </g>
      ))}
    </svg>
  );
};

/**
 * Memoizado porque en Contacto convive con el formulario: sin esto, cada tecla
 * pulsada volvería a construir las cuatro figuras enteras. Sus props son
 * cadenas, así que la comparación por defecto basta.
 */
export default memo(PaperFigures);
