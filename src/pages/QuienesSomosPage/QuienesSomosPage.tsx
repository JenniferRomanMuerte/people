import Seo from '@/components/ui/Seo/Seo';
import Image from '@/components/ui/Image/Image';
import FeatureCard from '@/components/ui/FeatureCard/FeatureCard';
import DottedPath from '@/components/ui/DottedPath/DottedPath';
import TornEdge from '@/components/ui/TornEdge/TornEdge';
import './QuienesSomosPage.scss';

const QuienesSomosPage = () => {
  return (
    <>
      <Seo
        title="Quiénes somos | People, acompañando a la mujer maltratada"
        description="Descubre nuestra misión, valores y compromiso con el acompañamiento afectivo y coordinado a mujeres que han sufrido violencia de género."
        path="/quienes-somos"
      />

      {/* --- Portada partida en dos --- */}
      <header className="quienes-hero">
        <div className="quienes-hero__texto">
          <h1 className="quienes-hero__titulo">¿Quiénes somos?</h1>
          <p className="quienes-hero__lema">
            Acompañamos procesos, respetando tiempos y decisiones.
          </p>
        </div>

        <div className="quienes-hero__media">
          <div className="quienes-hero__imagen">
            <Image
              name="quienes-somos-hero"
              alt="Dos mujeres tomando café sentadas a una mesa de madera, vistas desde arriba"
              sizes="(min-width: 1024px) 55vw, 92vw"
              priority
            />
          </div>
        </div>
      </header>

      {/* --- Introducción --- */}
      <section className="quienes-intro">
        <span className="quienes-intro__blob" aria-hidden="true" />

        <div className="contenedor quienes-intro__contenido">
          <p>
            En People desarrollamos un modelo de acompañamiento voluntario centrado en las
            necesidades reales de cada mujer.
          </p>
          <p>
            Partimos de su situación concreta y construimos, junto a ella, un{' '}
            <strong>camino posible</strong>.
          </p>

          <DottedPath className="quienes-intro__camino" />
        </div>
      </section>

      {/* --- Punto de partida --- */}
      <section className="quienes-somos-partida">
        {/*
          El rasgado cierra la sección de arriba, pero se monta aquí: la de
          arriba recorta su desbordamiento para contener la mancha lila y se
          comería el corte.
        */}
        <TornEdge className="quienes-somos-partida__rasgado" layers={3} />

        <div className="contenedor">
          <h2 className="quienes-somos-partida__titulo">Nuestro punto de partida</h2>
          <span className="quienes-somos-partida__separador" aria-hidden="true" />

          <ul className="quienes-somos-partida__badges">
            <li className="quienes-somos-partida__badge quienes-somos-partida__badge--1">
              Creemos en el acompañamiento como un proceso compartido
            </li>
            <li className="quienes-somos-partida__badge quienes-somos-partida__badge--2">
              No dirigimos caminos: caminamos al lado
            </li>
            <li className="quienes-somos-partida__badge quienes-somos-partida__badge--3">
              Cada historia es única, cada ritmo es distinto
            </li>
          </ul>
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
                'Sabemos de la importancia de recibir el apoyo profesional necesario en cada momento del proceso de superación.',
                "People colabora activamente con las/os profesionales de las instituciones, entidades gubernamentales, ONG, servicios de salud, centros educativos, policía, entre otros, para promover una respuesta integral y efectiva contra la violencia de género. ",
                'No pretendemos duplicar servicios o entidades existentes, sino ser un puente entre ellas para que las víctimas tengan a su disposición el máximo de recursos e información profesional.'
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default QuienesSomosPage;
