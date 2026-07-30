import Seo from "@/components/ui/Seo/Seo";
import Button from "@/components/ui/Button/Button";
import Image from "@/components/ui/Image/Image";
import TornEdge from "@/components/ui/TornEdge/TornEdge";
import { SITE_INFO } from "@/data/siteInfo";
import "./ColaboraPage.scss";

const ColaboraPage = () => {
  return (
    <>
      <Seo
        title="Colabora | People, acompañando a la mujer maltratada"
        description="Descubre cómo puedes colaborar con People Asociación y contribuir activamente en la lucha contra la violencia de género."
        path="/colabora"
      />

      {/* --- Portada --- */}
      <header className="colabora-hero">
        <div className="contenedor colabora-hero__contenido">
          <div className="colabora-hero__texto">
            <p className="colabora-hero__pegatina">Súmate al cambio</p>

            <h1 className="colabora-hero__titulo">
              Apoya la red contra
              <br />
              la violencia de género
            </h1>

            <p className="colabora-hero__subtitulo">
              La violencia machista no es un problema individual, es una
              responsabilidad colectiva.
            </p>
          </div>

          <div className="colabora-hero__imagen">
            <Image
              name="colabora-hero"
              alt="Ilustración de una mano abierta sosteniendo unas monedas de euro"
              sizes="(min-width: 1024px) 40vw, 80vw"
              priority
            />
          </div>
        </div>
      </header>

      {/* --- Formas de colaborar --- */}
      <section className="colabora-formas">
        <div className="contenedor colabora-formas__rejilla">
          <article className="colabora-forma colabora-forma--socia">
            {/* Bloque de color girado sobre el que se apoya la tarjeta */}
            <span className="colabora-forma__respaldo" aria-hidden="true" />

            <div className="colabora-forma__tarjeta">
              <h2 className="colabora-forma__titulo">Quiero hacerme soci@</h2>

              <div className="colabora-forma__cuerpo">
                <div className="colabora-forma__ilustracion">
                  <Image
                    name="colabora-socia"
                    alt="Ilustración de dos manos que se sostienen formando un corazón"
                    sizes="(min-width: 1024px) 20vw, 40vw"
                  />
                </div>

                <p className="colabora-forma__texto">
                  Con una aportación mensual, sostienes una red de
                  acompañamiento real para mujeres que atraviesan procesos de
                  violencia.
                </p>
              </div>

              <Button href={SITE_INFO.teaming} fullWidth>
                Colabora con 1€
              </Button>
            </div>
          </article>

          <article className="colabora-forma colabora-forma--puntual">
            <span className="colabora-forma__respaldo" aria-hidden="true" />

            <div className="colabora-forma__tarjeta">
              <h2 className="colabora-forma__titulo">Apoya de forma puntual</h2>

              <div className="colabora-forma__cuerpo">
                <div className="colabora-forma__ilustracion">
                  <Image
                    name="colabora-donacion"
                    alt="Ilustración de una mano sosteniendo una rama con hojas"
                    sizes="(min-width: 1024px) 20vw, 40vw"
                  />
                </div>

                <p className="colabora-forma__texto">
                  Una aportación puntual puede convertirse en el impulso que
                  haga crecer nuevas oportunidades de acompañamiento.
                </p>
              </div>

              <Button href={SITE_INFO.gofundme} fullWidth>
                Hacer una donación
              </Button>
            </div>
          </article>
        </div>
      </section>

      {/* --- Impacto --- */}
      <section className="colabora-impacto">
        <div className="contenedor">
          <h2 className="colabora-impacto__titulo">
            Tu apoyo se convierte en acompañamiento real
          </h2>

          <div className="colabora-impacto__blobs">
            <p className="colabora-impacto__blob colabora-impacto__blob--1">
              Cada aportación, por pequeña que sea, sostiene una red de
              voluntarias que acompaña a mujeres en procesos complejos.
            </p>
            <p className="colabora-impacto__blob colabora-impacto__blob--2">
              Tu implicación no es simbólica. Tiene un impacto concreto.
            </p>
          </div>
        </div>
      </section>

      {/* --- Cierre --- */}
      <section className="colabora-cierre">
        <div className="contenedor colabora-cierre__contenido">
          <h2 className="colabora-cierre__titulo">
            Salir de la violencia es un proceso complejo
          </h2>
          <span className="colabora-cierre__separador" aria-hidden="true" />

          <p className="colabora-cierre__frase">
            Salir y recuperarse de una relación de violencia de género es un
            proceso largo, difícil y solitario.
          </p>

          {/* El badge remata la frase, así que va dentro del mismo párrafo */}
          <p className="colabora-cierre__frase colabora-cierre__frase--continua">
            Requiere mucha valentía, determinación y fuerza…
            <span className="colabora-cierre__badge">pero se puede salir</span>
          </p>

          {/* El brote va dentro de la caja del blob, no de la sección: así se
              posiciona respecto a él y lo acompaña si el blob se mueve */}
          <div className="colabora-cierre__mancha">
            <Image
              name="colabora-brote"
              alt=""
              className="colabora-cierre__fondo"
              sizes="50vw"
            />

            <p className="colabora-cierre__blob">
              Es importante que la sociedad se implique. Que exista una red que sostenga,
              acompañe y no mire hacia otro lado
            </p>
          </div>
          <p className="colabora-cierre__remate">
            Y tú puedes formar parte de esa red
          </p>
        </div>
      </section>

      {/* Respiro de color entre el morado del cierre y el banner oscuro del 016 */}
      <div className="colabora-remate">
        <TornEdge className="colabora-remate__rasgado" />
      </div>
    </>
  );
};

export default ColaboraPage;
