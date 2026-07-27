import Seo from '@/components/ui/Seo/Seo';
import Button from '@/components/ui/Button/Button';
import Image from '@/components/ui/Image/Image';
import { SITE_INFO } from '@/data/siteInfo';
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
        <div className="home-hero__fondo">
          <Image
            name="inicio-hero"
            alt="Dos mujeres sentadas juntas mirando el cielo al atardecer"
            sizes="100vw"
            priority
            className="home-hero__imagen"
          />
        </div>

        <div className="home-hero__contenido contenedor">
          <h1 className="home-hero__titulo">{SITE_INFO.name.toUpperCase()}</h1>
          <p className="home-hero__lema">{SITE_INFO.tagline}</p>
          <Button to="/contacto" variant="claro">
            Contactar
          </Button>
        </div>
      </section>

      {/* --- Presentación --- */}
      <section className="home-presentacion">
        <div className="contenedor contenedor--estrecho">
          <h2 className="home-presentacion__titulo">
            Acompañamos procesos,
            <br />
            no camináis solas
          </h2>

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
              No quiero que otra persona decida quién soy.
              <br />
              Yo quiero decidir por mí misma.
            </p>
            <footer className="home-cita__autora">
              <cite>Emma Watson</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* --- Bloques de contenido --- */}
      <section className="home-bloques">
        <div className="contenedor">
          <article className="home-bloque">
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
          </article>

          <article className="home-bloque home-bloque--invertido">
            <div className="home-bloque__imagen">
              <Image
                name="inicio-juntas"
                alt="Varias manos unidas en círculo sosteniendo un pequeño brote verde"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div className="home-bloque__texto">
              <h2 className="home-bloque__titulo">Juntas contra la violencia machista</h2>
              <p>
                Creemos en el apoyo mutuo, la conciencia colectiva y el trabajo conjunto para
                erradicar la violencia machista.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default HomePage;
