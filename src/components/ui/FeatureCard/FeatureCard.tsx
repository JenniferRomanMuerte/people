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
}

const FeatureCard = ({ title, subtitle, paragraphs, image, imageAlt = '' }: Props) => {
  return (
    <article className="feature-card">
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
