import Seo from '@/components/ui/Seo/Seo';
import Button from '@/components/ui/Button/Button';
import Image from '@/components/ui/Image/Image';
import { SITE_INFO } from '@/data/siteInfo';
import './ColaboraPage.scss';

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
            <h1 className="colabora-hero__titulo">
              Apoya la red ciudadana contra la violencia de género
            </h1>
            <p className="colabora-hero__subtitulo">
              La violencia machista no es un problema individual, es una responsabilidad colectiva.
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

      {/* --- Impacto --- */}
      <section className="colabora-impacto">
        <div className="contenedor contenedor--estrecho">
          <h2 className="colabora-impacto__titulo">Tu apoyo se convierte en acompañamiento real</h2>
          <div className="colabora-impacto__texto">
            <p>
              Cada aportación, por pequeña que sea, sostiene una red de voluntarias que acompaña a
              mujeres en procesos complejos.
            </p>
            <p>Tu implicación no es simbólica. Tiene un impacto concreto.</p>
          </div>
        </div>
      </section>

      {/* --- Formas de colaborar --- */}
      <section className="colabora-formas">
        <div className="contenedor">
          <div className="colabora-formas__rejilla">
            <article className="colabora-tarjeta">
              <div className="colabora-tarjeta__ilustracion">
                <Image
                  name="colabora-socia"
                  alt="Ilustración de dos manos que se sostienen formando un corazón"
                  sizes="(min-width: 768px) 40vw, 80vw"
                />
              </div>
              <h2 className="colabora-tarjeta__titulo">Quiero hacerme soci@</h2>
              <p className="colabora-tarjeta__texto">
                Con una aportación mensual, sostienes una red de acompañamiento real para mujeres
                que atraviesan procesos de violencia.
              </p>
              <Button href={SITE_INFO.teaming}>Colabora con 1€</Button>
            </article>

            <article className="colabora-tarjeta">
              <div className="colabora-tarjeta__ilustracion">
                <Image
                  name="colabora-donacion"
                  alt="Ilustración de una mano sosteniendo una rama con hojas"
                  sizes="(min-width: 768px) 40vw, 80vw"
                />
              </div>
              <h2 className="colabora-tarjeta__titulo">Apoya de forma puntual</h2>
              <p className="colabora-tarjeta__texto">
                Una aportación puntual puede convertirse en el impulso que haga crecer nuevas
                oportunidades de acompañamiento.
              </p>
              <Button href={SITE_INFO.gofundme}>Hacer una donación</Button>
            </article>
          </div>
        </div>
      </section>

      {/* --- Cierre --- */}
      <section className="colabora-cierre">
        <div className="contenedor contenedor--estrecho">
          <h2 className="colabora-cierre__titulo">Salir de la violencia es un proceso complejo</h2>
          <div className="colabora-cierre__texto">
            <p>
              Salir y recuperarse de una relación de violencia de género es un proceso largo,
              difícil, solitario y lleno de obstáculos y miedos
            </p>
            <p>Sabemos que requiere mucha valentía, determinación y fuerza…</p>
            <p>pero se puede salir.</p>
            <p>Por eso es importante que la sociedad se implique.</p>
            <p>Que exista una red que sostenga, acompañe y no mire hacia otro lado.</p>
            <p className="colabora-cierre__remate">Y tú puedes formar parte de esa red</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ColaboraPage;
