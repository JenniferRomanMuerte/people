import Seo from '@/components/ui/Seo/Seo';
import PageHero from '@/components/ui/PageHero/PageHero';
import './NecesitasAyudaPage.scss';

const NecesitasAyudaPage = () => {
  return (
    <>
      <Seo
        title="¿Necesitas ayuda? | People, acompañando a la mujer maltratada"
        description="Si estás viviendo una situación de violencia de género o la has vivido, no estás sola. Te ofrecemos acompañamiento afectivo, personalizado y coordinado."
        path="/necesitas-ayuda"
      />

      <PageHero
        title="¿Necesitas ayuda? Estamos para ti"
        image="necesitas-ayuda-hero"
        imageAlt="Dos mujeres cogidas de la mano sobre una mesa de madera"
      >
        <p>No tienes que atravesar este proceso sola.</p>
        <p>Esta es una carta de bienvenida de parte de las mujeres voluntarias de People.</p>
        <p>
          Nacimos para acompañarte en tu día a día, tanto si estás atravesando una situación de
          violencia de género como si la has vivido en el pasado, respetamos tus tiempos y caminamos
          a tu lado cuando lo necesites.
        </p>
      </PageHero>

      <article className="carta">
        {/* --- Queremos acompañarte --- */}
        <section className="carta__seccion">
          <div className="contenedor contenedor--estrecho">
            <h2 className="carta__titulo">Queremos acompañarte</h2>
            <div className="carta__texto">
              <p>
                Queremos decirte que desde People trabajamos para que mujeres que se encuentren en tu
                situación, o en una similar, puedan desarrollar una vida libre de cualquier tipo de
                violencia y plena de derechos.
              </p>
              <p>
                Para ello, las voluntarias nos encargamos de cubrir contigo las necesidades que vayan
                surgiendo, acompañándote en tu día a día, en los tiempos y momentos que necesites, de
                manera afectiva: saliendo a dar paseos, buscando otros recursos, acompañándote al
                médico o en gestiones que tengas que realizar.
              </p>
              <p>
                Junto contigo y con las profesionales (psicólogas, trabajadoras sociales…), nos
                coordinamos para que todas las necesidades que puedan aparecer se vayan cubriendo
                durante el tiempo que lo necesites.
              </p>
            </div>
          </div>
        </section>

        {/* --- Sabemos que no es fácil --- */}
        <section className="carta__seccion carta__seccion--destacada">
          <div className="contenedor contenedor--estrecho">
            <h2 className="carta__titulo">Sabemos que no es fácil</h2>
            <div className="carta__texto">
              <p>Como voluntarias, sabemos que estás pasando por momentos complicados.</p>
              <p>
                Salir del círculo de la violencia es un proceso largo, difícil, solitario y lleno de
                obstáculos y miedos.
              </p>
              <p>Sabemos que requiere valentía, determinación y fuerza.</p>
              <p>Pero también sabemos que se puede salir.</p>
              <p>
                Desde nuestra organización queremos darte la seguridad de que haremos todo lo posible
                para que no estés sola durante este proceso.
              </p>
            </div>
          </div>
        </section>

        {/* --- No estás sola --- */}
        <section className="carta__seccion">
          <div className="contenedor contenedor--estrecho">
            <h2 className="carta__titulo">No estás sola</h2>
            <div className="carta__texto">
              <p>Nos gustaría formar parte de tu futuro.</p>
              <p>Si sientes que este puede ser tu espacio, estamos aquí para escucharte.</p>
              <p>Tus datos estarán siempre protegidos y el primer paso lo marcas tú.</p>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default NecesitasAyudaPage;
