import Image from '@/components/ui/Image/Image';
import { IMAGENES, type NombreImagen } from '@/assets/images/manifest';
import './PhotoFeatureBlock.scss';

interface Props {
  title: string;
  /** Cada cadena se pinta como un párrafo independiente */
  paragraphs: string[];
  image: NombreImagen;
  imageAlt: string;
  /** Coloca la foto a la derecha en lugar de a la izquierda */
  reversed?: boolean;
  /** Ruta de un vídeo dentro de `public/`. Si se indica, sustituye a la foto. */
  videoSrc?: string;
  /**
   * Imagen de espera del vídeo. Debería ser un fotograma del propio vídeo: si
   * se deja vacío cae en `image`, y entonces se anuncia como vídeo algo que en
   * realidad no se corresponde con lo que se va a reproducir.
   */
  videoPoster?: string;
  /** Clase extra para afinar el bloque desde la página que lo usa */
  className?: string;
}

/**
 * Bloque de foto y texto con la foto como pieza dominante.
 *
 * La foto se apoya sobre un rectángulo naranja girado en sentido contrario,
 * y un blob morado asoma por la esquina inferior derecha del contenedor.
 * Se repite en varias secciones cambiando solo el contenido.
 */
const PhotoFeatureBlock = ({
  title,
  paragraphs,
  image,
  imageAlt,
  reversed = false,
  videoSrc,
  videoPoster,
  className,
}: Props) => {
  const clases = [
    'photo-feature',
    reversed ? 'photo-feature--invertido' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={clases}>
      {/* Capa de fondo, por detrás de la foto y del texto */}
      <span className="photo-feature__blob" aria-hidden="true" />

      <div className="contenedor photo-feature__contenido">
        <div className="photo-feature__media">
          {/* Rectángulo de color sobre el que se apoya la foto */}
          <span className="photo-feature__respaldo" aria-hidden="true" />

          <div className="photo-feature__imagen">
            {videoSrc ? (
              // Con controles a propósito: un vídeo que arranca solo y no se
              // puede parar molesta, y aquí además puede llevar testimonios.
              <video
                className="photo-feature__video"
                src={videoSrc}
                poster={videoPoster ?? IMAGENES[image].variantes.at(-1)?.url}
                controls
                preload="metadata"
                playsInline
              />
            ) : (
              <Image name={image} alt={imageAlt} sizes="(min-width: 1024px) 58vw, 92vw" />
            )}
          </div>
        </div>

        <div className="photo-feature__texto">
          <h2 className="photo-feature__titulo">{title}</h2>
          {paragraphs.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoFeatureBlock;
