import { IMAGENES, type NombreImagen } from '@/assets/images/manifest';
import './Image.scss';

interface Props {
  /** Clave de la imagen en el manifiesto generado por `npm run images` */
  name: NombreImagen;
  /**
   * Texto alternativo. Obligatorio siempre: si la imagen es puramente
   * decorativa se pasa una cadena vacía para que los lectores la ignoren.
   */
  alt: string;
  /** Ancho que ocupará la imagen, para que el navegador elija la variante justa */
  sizes?: string;
  /** Marcar solo la imagen principal de la página, la que se ve sin hacer scroll */
  priority?: boolean;
  className?: string;
}

const Image = ({ name, alt, sizes = '100vw', priority = false, className }: Props) => {
  const datos = IMAGENES[name];
  const variantes = datos.variantes;
  const mayor = variantes[variantes.length - 1];

  const srcSet = variantes.map((variante) => `${variante.url} ${variante.ancho}w`).join(', ');

  return (
    <img
      className={['image', className].filter(Boolean).join(' ')}
      src={mayor.url}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      // Las dimensiones reservan el espacio y evitan que la página dé saltos al cargar
      width={datos.ancho}
      height={datos.alto}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      // Una imagen decorativa no debe anunciarse a los lectores de pantalla
      aria-hidden={alt === '' ? true : undefined}
    />
  );
};

export default Image;
