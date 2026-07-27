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
      {image && (
        <div className="feature-card__ilustracion">
          <Image name={image} alt={imageAlt} sizes="(min-width: 1024px) 30vw, 90vw" />
        </div>
      )}

      <h3 className="feature-card__titulo">{title}</h3>
      {subtitle && <p className="feature-card__subtitulo">{subtitle}</p>}

      <div className="feature-card__texto">
        {paragraphs.map((parrafo) => (
          <p key={parrafo}>{parrafo}</p>
        ))}
      </div>
    </article>
  );
};

export default FeatureCard;
