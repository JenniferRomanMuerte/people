import Seo from '@/components/ui/Seo/Seo';
import Image from '@/components/ui/Image/Image';
import StickyNote from '@/components/ui/StickyNote/StickyNote';
import Button from '@/components/ui/Button/Button';
import TornEdge from '@/components/ui/TornEdge/TornEdge';
import './NecesitasAyudaPage.scss';

const NecesitasAyudaPage = () => {
  return (
    <>
      <Seo
        title="¿Necesitas ayuda? | People, acompañando a la mujer maltratada"
        description="Si estás viviendo una situación de violencia de género o la has vivido, no estás sola. Te ofrecemos acompañamiento afectivo, personalizado y coordinado."
        path="/necesitas-ayuda"
      />

      {/* Portada deliberadamente sobria: sin adornos, solo el titular y una
          frase. Es la página a la que llega quien está pidiendo ayuda. */}
      <header className="ayuda-hero">
        <div className="contenedor ayuda-hero__contenido">
          <div className="ayuda-hero__blob">
            <h1 className="ayuda-hero__titulo">
              ¿Necesitas ayuda?
              <br />
              Estamos para ti
            </h1>
            <p className="ayuda-hero__lema">no tienes que atravesar este proceso sola</p>
          </div>
        </div>
      </header>

      {/* --- Carta de bienvenida --- */}
      <section className="ayuda-carta">
        <div className="contenedor">
          <div className="ayuda-carta__hoja">
            <h2 className="ayuda-carta__encabezado">Para ti, que nos necesitas:</h2>

            <div className="ayuda-carta__cuerpo">
              <p>
                Nacimos para acompañarte, tanto si estás atravesando una situación de violencia de
                género como si la has vivido en el pasado. Respetamos tus tiempos y caminamos a tu
                lado cuando lo necesites.
              </p>
              <p>
                Trabajamos para que mujeres que se encuentren en tu situación, o en una similar,
                puedan desarrollar una vida libre de cualquier tipo de violencia y plena de derechos.
                Por eso cubrimos contigo las necesidades que vayan surgiendo, en los tiempos y
                momentos que necesites: saliendo a dar paseos, buscando otros recursos,
                acompañándote al médico o en gestiones que tengas que realizar.
              </p>
              <p>
                Junto a ti, y junto a profesionales — psicólogas, trabajadoras sociales… —, nos
                coordinamos para que todas esas necesidades se vayan cubriendo durante el tiempo que
                lo necesites.
              </p>
            </div>

            <p className="ayuda-carta__firma">Las voluntarias de People</p>
          </div>
        </div>
      </section>

      <article className="carta">
        {/* --- Sabemos que no es fácil --- */}
        <section className="carta__seccion carta__seccion--destacada">
          <div className="contenedor carta__contenido ayuda-dificil">
            {/* Fuera de las columnas: encabeza el bloque entero, no solo el texto */}
            <h2 className="ayuda-dificil__titulo">Sabemos que no es fácil</h2>

            <div className="ayuda-dificil__texto">
              <div className="ayuda-dificil__cuerpo">
                <p>Como voluntarias, sabemos que estás pasando por momentos complicados.</p>
                <p>
                  Salir del círculo de la violencia es un proceso largo, difícil, solitario y lleno
                  de obstáculos y miedos. Sabemos que requiere valentía, determinación y fuerza.
                </p>
              </div>

              <StickyNote tone="naranja" rotation={-2}>
                Pero también sabemos que se puede salir.
              </StickyNote>

              <div className="ayuda-dificil__cuerpo">
                <p>
                  Desde nuestra organización queremos darte la seguridad de que haremos todo lo
                  posible para que no estés sola durante este proceso.
                </p>
              </div>
            </div>

            <div className="ayuda-dificil__imagen">
              <Image
                name="necesitas-ayuda-hero"
                alt="Dos mujeres cogidas de la mano sobre una mesa de madera"
                sizes="(min-width: 1024px) 40vw, 90vw"
              />
            </div>
          </div>
        </section>

        {/* --- Bloque de cierre --- */}
        <section className="ayuda-cierre">
          <div className="contenedor ayuda-cierre__contenido">
            <h2 className="ayuda-cierre__titulo">No estás sola</h2>
            <span className="ayuda-cierre__separador" aria-hidden="true" />

            <ul className="ayuda-cierre__badges">
              <li className="ayuda-cierre__badge ayuda-cierre__badge--1">
                Si sientes que este puede ser tu espacio, estamos aquí para escucharte
              </li>
              <li className="ayuda-cierre__badge ayuda-cierre__badge--2">
                Nos gustaría formar parte de tu futuro
              </li>
              <li className="ayuda-cierre__badge ayuda-cierre__badge--3">
                Tus datos estarán siempre protegidos y el primer paso lo marcas tú
              </li>
            </ul>

            <div className="ayuda-cierre__accion">
              <Button to="/contacto" variant="acento">
                Escríbenos
              </Button>
            </div>
          </div>
        </section>
      </article>

      {/*
        Respiro de color entre el morado del cierre y el banner oscuro del 016.
        El rasgado se monta aquí y no en la sección de arriba porque aquella
        recorta su desbordamiento para contener el círculo de acento.
      */}
      <div className="ayuda-remate">
        <TornEdge className="ayuda-remate__rasgado" />
      </div>
    </>
  );
};

export default NecesitasAyudaPage;
