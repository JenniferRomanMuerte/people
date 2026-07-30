import Image from '@/components/ui/Image/Image';
import type { NombreImagen } from '@/assets/images/manifest';
import './FeatureCard.scss';

interface Props {
  title: string;
  /** Frase corta bajo el título, como aparece en la web original */
  subtitle?: string;
  /** Cada cadena se pinta como un párrafo independiente */
  paragraphs: string[];
  image?: NombreImagen;
  imageAlt?: string;
  /** Número de orden. Se pinta como distintivo y no como texto de lectura. */
  number?: number;
}

const FeatureCard = ({
  title,
  subtitle,
  paragraphs,
  image,
  imageAlt = '',
  number,
}: Props) => {
  return (
    // Sin ilustración el reparto en rejilla no aporta nada, así que la tarjeta
    // se marca para que su contenido fluya en bloque
    <article className={`feature-card${image ? '' : ' feature-card--sin-ilustracion'}`}>
      {/* Decorativo: el orden ya lo transmite la posición en la lista */}
      {number !== undefined && (
        <span className="feature-card__numero" aria-hidden="true">
          {number}
        </span>
      )}

      {/* Ilustración a la izquierda; título y texto a la derecha.
          En pantallas estrechas se apilan. */}
      <div className="feature-card__cuerpo">
        {image && (
          <div className="feature-card__ilustracion">
            <Image name={image} alt={imageAlt} sizes="160px" />
          </div>
        )}

        <div className="feature-card__contenido">
          <h3 className="feature-card__titulo">{title}</h3>
          {subtitle && <p className="feature-card__subtitulo">{subtitle}</p>}

          <div className="feature-card__texto">
            {paragraphs.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeatureCard;
