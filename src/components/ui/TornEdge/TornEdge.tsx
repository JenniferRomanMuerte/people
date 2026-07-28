import type { CSSProperties } from 'react';
import './TornEdge.scss';

interface Props {
  /**
   * Número de capas superpuestas. Cada una queda un poco más alta, desplazada
   * y más transparente que la anterior, lo que da sensación de papeles
   * apilados. Con 1 se obtiene un corte limpio.
   */
  layers?: number;
  /**
   * Color del papel. Si no se indica, lo toma de la custom property
   * `--torn-color`, que se puede fijar desde el SCSS con la paleta.
   */
  color?: string;
  className?: string;
}

/**
 * Borde de papel rasgado.
 *
 * El dentado se pinta con una máscara que se repite en horizontal, no con un
 * SVG estirado: así los picos conservan su proporción en cualquier ancho de
 * pantalla en lugar de estilizarse en monitores grandes.
 *
 * El color va en `background-color`, no dentro del SVG. Un SVG incrustado como
 * data URI es un documento aislado y no hereda `currentColor`, así que meter
 * el color ahí obligaría a duplicar los hexadecimales de la paleta en el TSX.
 */
const TornEdge = ({ layers = 1, color, className }: Props) => {
  const total = Math.max(1, layers);

  // De la capa más profunda a la más superficial: la última del DOM se pinta
  // encima, y la que debe quedar arriba es la base (índice 0).
  const indices = Array.from({ length: total }, (_, i) => total - 1 - i);

  return (
    <div
      className={['torn-edge', className].filter(Boolean).join(' ')}
      style={color ? ({ '--torn-color': color } as CSSProperties) : undefined}
      aria-hidden="true"
    >
      {indices.map((i) => (
        <div
          key={i}
          className="torn-edge__capa"
          style={
            {
              '--torn-i': i,
              // Cada capa que se aleja pierde presencia: 1, 1/2, 1/3...
              opacity: 1 / (i + 1),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default TornEdge;
