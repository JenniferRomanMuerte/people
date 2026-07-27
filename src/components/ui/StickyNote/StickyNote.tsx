import type { CSSProperties, ReactNode } from 'react';
import './StickyNote.scss';

type Tono = 'naranja' | 'crema' | 'morado';

interface Props {
  children: ReactNode;
  tone?: Tono;
  /**
   * Inclinación en grados. Se mantiene entre -2 y 7 para que se lea como algo
   * pegado a mano y no como un error de maquetación.
   */
  rotation?: -2 | -1 | 2 | 3 | 5 | 7;
}

/**
 * Nota tipo pegatina.
 * Es un recurso de énfasis: como mucho un par por página, nunca más, o deja
 * de destacar nada.
 */
const StickyNote = ({ children, tone = 'naranja', rotation = 3 }: Props) => {
  return (
    <p
      className={`sticky-note sticky-note--${tone}`}
      style={{ '--rotacion': `${rotation}deg` } as CSSProperties}
    >
      {children}
    </p>
  );
};

export default StickyNote;
