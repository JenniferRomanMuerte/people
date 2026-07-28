import Seo from '@/components/ui/Seo/Seo';
import Button from '@/components/ui/Button/Button';
import Image from '@/components/ui/Image/Image';
import StickyNote from '@/components/ui/StickyNote/StickyNote';
import PaperFigures from '@/components/ui/PaperFigures/PaperFigures';
import TornEdge from '@/components/ui/TornEdge/TornEdge';
import PhotoFeatureBlock from '@/components/ui/PhotoFeatureBlock/PhotoFeatureBlock';
import './HomePage.scss';

const HomePage = () => {
  return (
    <>
      <Seo
        title="People, acompañando a la mujer maltratada"
        description="Organización sin ánimo de lucro dedicada al acompañamiento afectivo, personalizado y coordinado a mujeres que sufren o han sufrido violencia de género. Trabajamos por su recuperación, sanación y superación."
        path="/"
      />

      {/* --- Portada --- */}
      <section className="home-hero">
        <div className="contenedor home-hero__contenido">
          <div className="home-hero__texto">
            <h1 className="home-hero__titulo">No caminas sola</h1>
            <p className="home-hero__lema">— acompañamos, sin dirigir</p>
            <Button to="/contacto" variant="claro">
              Contactar{' '}
              <span className="home-hero__flecha" aria-hidden="true">
                →
              </span>
            </Button>
          </div>

          <div className="home-hero__media">
            <div className="home-hero__nota">
              <StickyNote tone="crema" rotation={-2}>
                estamos aquí
              </StickyNote>
            </div>

            <div className="home-hero__imagen">
              <Image
                name="inicio-dia-a-dia"
                alt="Dos mujeres abrazadas de espaldas contemplando los tejados de Madrid"
                sizes="(min-width: 1024px) 46vw, 90vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- Presentación --- */}
      <section className="home-presentacion">
        {/* Círculo decorativo, ahora al otro lado y sin nada dentro */}
        <div className="home-presentacion__circulo" aria-hidden="true" />

        <div className="contenedor home-presentacion__contenido">
          <div className="home-presentacion__encabezado">
            {/* Columna izquierda: figuras con la nota debajo */}
            <div className="home-presentacion__marca">
              <PaperFigures className="home-presentacion__figuras" />
              <StickyNote tone="naranja" rotation={-2}>
                no camináis solas
              </StickyNote>
            </div>

            <h2 className="home-presentacion__titulo">Acompañamos procesos</h2>
          </div>

          <div className="home-presentacion__texto">
            <p>
              En People Asociación creemos que, muchas veces, lo único que se necesita para empezar
              a cambiar una vida es apoyo.
            </p>
            <p>
              Somos una organización sin ánimo de lucro dedicada al acompañamiento afectivo,
              personalizado y coordinado a mujeres que sufren o han sufrido violencia de género.
            </p>
            <p>
              Nuestro compromiso es estar presentes en ese camino, ayudando a que cada mujer pueda
              avanzar hacia la recuperación, la sanación y la superación.
            </p>
          </div>
        </div>
      </section>

      {/* --- Cita --- */}
      <section className="home-cita">
        <div className="contenedor">
          <blockquote className="home-cita__bloque">
            {/* Una frase por línea. Las comillas las pone el CSS. */}
            <p className="home-cita__texto">
              <span className="home-cita__linea">
                No quiero que otra persona decida quién soy.
              </span>
              <span className="home-cita__linea">Yo quiero decidir por mí misma.</span>
            </p>

            <footer className="home-cita__autora">
              <cite>Emma Watson</cite>
            </footer>
          </blockquote>
        </div>

        {/* Corte rasgado hacia la sección siguiente */}
        <TornEdge className="home-cita__rasgado" layers={3} />
      </section>

      {/* --- Nuestro día a día --- */}
      {/* El vídeo está sin comprimir (114 MB) y por eso queda fuera del
          repositorio. Hasta que se comprima, esta sección solo funciona en
          local: en el sitio publicado se verá la imagen de espera. */}
      <PhotoFeatureBlock
        className="home-dia-a-dia"
        videoSrc="/videos/NuestroDia.mp4"
        videoPoster="/videos/NuestroDia-poster.webp"
        title="Nuestro día a día"
        image="inicio-dia-a-dia"
        imageAlt="Dos mujeres abrazadas de espaldas contemplando los tejados de Madrid"
        paragraphs={[
          'Acompañamos a mujeres en su proceso, creando espacios seguros de escucha, apoyo y confianza.',
        ]}
      />

      {/* --- Juntas contra la violencia machista --- */}
      <PhotoFeatureBlock
        className="home-juntas"
        title="Juntas contra la violencia machista"
        image="inicio-juntas"
        imageAlt="Varias manos unidas en círculo sosteniendo un pequeño brote verde"
        paragraphs={[
          'Creemos en el apoyo mutuo, la conciencia colectiva y el trabajo conjunto para erradicar la violencia machista.',
        ]}
        reversed
      />
    </>
  );
};

export default HomePage;
