import './DottedPath.scss';

interface Props {
  className?: string;
}

/**
 * Camino de puntos: una línea ondulada punteada con un punto lleno en cada
 * extremo, uno de salida y otro de llegada.
 *
 * Es decorativo, así que va oculto para los lectores de pantalla.
 */
const DottedPath = ({ className }: Props) => {
  return (
    <svg
      className={['dotted-path', className].filter(Boolean).join(' ')}
      viewBox="0 0 320 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/*
        Los puntos no se dibujan uno a uno: es un trazo con guiones de longitud
        cero y extremos redondeados, que el navegador convierte en círculos
        repartidos a lo largo de la curva.
      */}
      {/* Arranca abajo a la izquierda y termina arriba a la derecha: el camino
          asciende, que es lo que se quiere sugerir. */}
      <path
        className="dotted-path__linea"
        d="M16 46 C 70 20 108 54 168 34 C 224 16 262 28 304 8"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="0 11"
      />

      <circle className="dotted-path__inicio" cx="16" cy="46" r="7" />
      <circle className="dotted-path__fin" cx="304" cy="8" r="7" />
    </svg>
  );
};

export default DottedPath;
