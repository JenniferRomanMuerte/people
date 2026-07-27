import Seo from '@/components/ui/Seo/Seo';
import Button from '@/components/ui/Button/Button';
import Image from '@/components/ui/Image/Image';
import StickyNote from '@/components/ui/StickyNote/StickyNote';
import PaperFigures from '@/components/ui/PaperFigures/PaperFigures';
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
        <div className="contenedor contenedor--estrecho">
          <blockquote className="home-cita__bloque">
            <p className="home-cita__texto">
              No quiero que otra persona decida quién soy. Yo quiero decidir por mí misma.
            </p>
            <footer className="home-cita__autora">
              <cite>Emma Watson</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* --- Nuestro día a día --- */}
      <section className="home-bloque">
        <div className="contenedor home-bloque__contenido">
          <div className="home-bloque__imagen">
            <Image
              name="inicio-dia-a-dia"
              alt="Dos mujeres abrazadas de espaldas contemplando los tejados de Madrid"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="home-bloque__texto">
            <h2 className="home-bloque__titulo">Nuestro día a día</h2>
            <p>
              Acompañamos a mujeres en su proceso, creando espacios seguros de escucha, apoyo y
              confianza.
            </p>
          </div>
        </div>
      </section>

      {/* --- Bloque de cierre --- */}
      <section className="home-cierre">
        <div className="contenedor home-cierre__contenido">
          <div className="home-cierre__texto">
            <h2 className="home-cierre__titulo">Juntas contra la violencia machista</h2>
            <p>
              Creemos en el apoyo mutuo, la conciencia colectiva y el trabajo conjunto para
              erradicar la violencia machista.
            </p>
          </div>

          <div className="home-cierre__imagen">
            <Image
              name="inicio-juntas"
              alt="Varias manos unidas en círculo sosteniendo un pequeño brote verde"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
