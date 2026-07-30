import './DottedPath.scss';

/** Fondo sobre el que se coloca, para que ningún punto quede invisible */
type Fondo = 'claro' | 'naranja' | 'oscuro';

/** Recorrido que dibuja la línea */
type Forma = 'ascendente' | 'suave' | 'serpenteante' | 'traza' | 'arco';

interface Props {
  /** Recorrido. Por defecto sube de izquierda a derecha. */
  shape?: Forma;
  background?: Fondo;
  /** Puntos llenos en los extremos. Se quitan cuando la línea es solo textura. */
  dots?: boolean;
  className?: string;
}

/**
 * Cada forma guarda su lienzo y dónde empieza y acaba, para que los puntos de
 * los extremos se coloquen solos y no haya que ajustarlos a mano al cambiarla.
 */
const FORMAS: Record<
  Forma,
  { viewBox: string; d: string; inicio: { x: number; y: number }; fin: { x: number; y: number } }
> = {
  ascendente: {
    viewBox: '0 0 320 56',
    d: 'M16 46 C 70 20 108 54 168 34 C 224 16 262 28 304 8',
    inicio: { x: 16, y: 46 },
    fin: { x: 304, y: 8 },
  },
  suave: {
    viewBox: '0 0 320 56',
    d: 'M16 38 C 68 24 106 46 168 32 C 226 19 262 30 304 20',
    inicio: { x: 16, y: 38 },
    fin: { x: 304, y: 20 },
  },
  // Recorre las cuatro tarjetas en orden de lectura: cruza la fila de arriba,
  // baja hacia la izquierda y vuelve a cruzar la de abajo
  serpenteante: {
    viewBox: '0 0 320 220',
    d: 'M28 48 C 110 8 210 8 292 48 C 320 96 8 124 28 172 C 110 212 210 212 292 172',
    inicio: { x: 28, y: 48 },
    fin: { x: 292, y: 172 },
  },
  // Puente: arranca y termina abajo, y se eleva en el centro
  arco: {
    viewBox: '0 0 320 80',
    d: 'M12 68 C 80 6 240 6 308 68',
    inicio: { x: 12, y: 68 },
    fin: { x: 308, y: 68 },
  },
  // Trazo corto, para textura de fondo
  traza: {
    viewBox: '0 0 120 40',
    d: 'M8 28 C 34 8 62 36 112 14',
    inicio: { x: 8, y: 28 },
    fin: { x: 112, y: 14 },
  },
};

/**
 * Camino de puntos: una línea ondulada punteada, con un punto lleno en cada
 * extremo cuando marca un recorrido.
 *
 * Es decorativo, así que va oculto para los lectores de pantalla.
 */
const DottedPath = ({ shape = 'ascendente', background, dots = true, className }: Props) => {
  const forma = FORMAS[shape];

  return (
    <svg
      className={[
        'dotted-path',
        background ? `dotted-path--sobre-${background}` : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      viewBox={forma.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/*
        Un único trazo discontinuo: los guiones y sus huecos los reparte el
        navegador a lo largo de la curva, así que la separación se mantiene
        regular sea cual sea el recorrido.
      */}
      <path
        className="dotted-path__linea"
        d={forma.d}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="13 10"
      />

      {dots && (
        <>
          <circle className="dotted-path__inicio" cx={forma.inicio.x} cy={forma.inicio.y} r="7" />
          <circle className="dotted-path__fin" cx={forma.fin.x} cy={forma.fin.y} r="7" />
        </>
      )}
    </svg>
  );
};

export default DottedPath;
