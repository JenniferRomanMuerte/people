import type { ReactNode } from 'react';
import Image from '@/components/ui/Image/Image';
import type { NombreImagen } from '@/assets/images/manifest';
import './PageHero.scss';

interface Props {
  title: string;
  subtitle?: string;
  /** Texto de apoyo bajo el subtítulo */
  children?: ReactNode;
  image: NombreImagen;
  /** Descripción de la fotografía para quien no puede verla */
  imageAlt: string;
  /** Oscurece la imagen para que el texto encima se lea con contraste suficiente */
  darkOverlay?: boolean;
  /**
   * Estilo del hero. 'nuevo' aplica la dirección visual actual (titular
   * compacto en mayúsculas y círculo de acento). Se va migrando página a
   * página; cuando estén todas, esta propiedad desaparece.
   */
  variant?: 'clasico' | 'nuevo';
}

const PageHero = ({
  title,
  subtitle,
  children,
  image,
  imageAlt,
  darkOverlay = true,
  variant = 'clasico',
}: Props) => {
  const clases = [
    'page-hero',
    darkOverlay ? 'page-hero--oscuro' : '',
    variant === 'nuevo' ? 'page-hero--nuevo' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={clases}>
      <div className="page-hero__fondo">
        <Image name={image} alt={imageAlt} sizes="100vw" priority className="page-hero__imagen" />
      </div>

      <div className="page-hero__contenido">
        <div className="contenedor">
          <h1 className="page-hero__titulo">{title}</h1>
          {subtitle && <p className="page-hero__subtitulo">{subtitle}</p>}
          {children && <div className="page-hero__texto">{children}</div>}
        </div>
      </div>
    </header>
  );
};

export default PageHero;
