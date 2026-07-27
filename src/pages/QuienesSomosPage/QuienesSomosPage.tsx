import Seo from '@/components/ui/Seo/Seo';
import PageHero from '@/components/ui/PageHero/PageHero';
import FeatureCard from '@/components/ui/FeatureCard/FeatureCard';
import './QuienesSomosPage.scss';

const QuienesSomosPage = () => {
  return (
    <>
      <Seo
        title="Quiénes somos | People, acompañando a la mujer maltratada"
        description="Descubre nuestra misión, valores y compromiso con el acompañamiento afectivo y coordinado a mujeres que han sufrido violencia de género."
        path="/quienes-somos"
      />

      <PageHero
        title="¿Quiénes somos?"
        subtitle="Acompañamos procesos, respetando tiempos y decisiones."
        image="quienes-somos-hero"
        imageAlt="Dos mujeres conversando con una taza de café sentadas a una mesa"
      >
        <p>
          En People desarrollamos un modelo de acompañamiento voluntario centrado en las necesidades
          reales de cada mujer.
        </p>
        <p>Partimos de su situación concreta y construimos, junto a ella, un camino posible.</p>
      </PageHero>

      {/* --- Punto de partida --- */}
      <section className="quienes-somos-partida">
        <div className="contenedor contenedor--estrecho">
          <h2 className="quienes-somos-partida__titulo">Nuestro punto de partida</h2>
          <div className="quienes-somos-partida__texto">
            <p>Creemos en el acompañamiento como un proceso compartido.</p>
            <p>No dirigimos caminos: caminamos al lado.</p>
            <p>Cada historia es única, cada ritmo es distinto.</p>
          </div>
        </div>
      </section>

      {/* --- Los tres pilares del acompañamiento --- */}
      <section className="quienes-somos-pilares">
        <div className="contenedor">
          <div className="quienes-somos-pilares__rejilla">
            <FeatureCard
              title="Dimensión afectiva"
              image="dimension-afectiva"
              imageAlt="Ilustración de dos manos entrelazadas en tonos morados"
              paragraphs={[
                'Ante las dificultades y necesidades de todo tipo que se presentan para romper una situación de violencia de género y ante la soledad que representa el tener que afrontarlas, nuestra organización brinda la posibilidad de tener a personas que acompañen, escuchen y tiendan una mano conocida en el día a día de ese largo y duro camino, para romper la soledad y la angustia caminando a su lado con un alto contenido emocional y afectivo.',
              ]}
            />

            <FeatureCard
              title="Acompañamiento Personalizado"
              image="plan-personalizado"
              imageAlt="Ilustración de unas manos escribiendo «tu plan» en una libreta decorada con flores"
              paragraphs={[
                'Cada acompañamiento es diferente puesto que es la persona acompañada la que nos dice el cómo, el cuándo, y el dónde estar.',
                "Por eso, elaboramos un plan de acompañamiento personalizado con cada acompañada creando redes de apoyo junto con otras ONG's, empresa, entidades públicas y privadas.",
              ]}
            />

            <FeatureCard
              title="Acompañamiento coordinado"
              image="acompanamiento-coordinado"
              imageAlt="Ilustración de una mano señalando un punto en un mapa desplegado con el logotipo de People"
              paragraphs={[
                'People siempre informará a las personas acompañadas sobre toda la red de recursos existente, hará de puente entre los diferentes servicios que reclamen las personas acompañadas para informarlas y apoyarlas en cada paso que quieran dar, respetando así sus tiempos y decisiones.',
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default QuienesSomosPage;
