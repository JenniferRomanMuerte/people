import Seo from '@/components/ui/Seo/Seo';
import Image from '@/components/ui/Image/Image';
import PaperFigures from '@/components/ui/PaperFigures/PaperFigures';
import FeatureCard from '@/components/ui/FeatureCard/FeatureCard';
import Button from '@/components/ui/Button/Button';
import DottedPath from '@/components/ui/DottedPath/DottedPath';
import { SITE_INFO } from '@/data/siteInfo';
import './VoluntariadoPage.scss';

const VoluntariadoPage = () => {
  return (
    <>
      <Seo
        title="Voluntariado | People, acompañando a la mujer maltratada"
        description="Descubre cómo formar parte de People como persona voluntaria y participa activamente en el acompañamiento y apoyo a mujeres que han sufrido violencia de género."
        path="/voluntariado"
      />


      {/* --- Portada  --- */}
      <header className="voluntariado-hero">
        <div className="voluntariado-hero__texto">
          <h1 className="voluntariado-hero__titulo">Voluntariado</h1>
          <p className="voluntariado-hero__lema">
           El motor que hace posible el acompañamiento
          </p>
        </div>

        <div className="voluntariado-hero__adornos">
          {/* El arco va encima de las cabezas, no debajo de las figuras */}
          <DottedPath shape="arco" className="voluntariado-hero__camino" />
          <PaperFigures background="naranja" className="voluntariado-hero__figuras" />
        </div>
      </header>

      {/* --- Introducción --- */}
      <section className="voluntariado-intro">
        <div className="contenedor">
          <div className="voluntariado-intro__destacado">
            <div className="voluntariado-intro__imagen">
              <Image
                name="voluntariado-hero"
                alt="Dos mujeres caminando juntas por la calle, vistas de espaldas"
                sizes="(min-width: 768px) 320px, 220px"
              />
            </div>

            <div className="voluntariado-intro__contenido">
              <blockquote className="voluntariado-intro__cita">
                son quienes llevan a cabo nuestros fines y objetivos
              </blockquote>

              <div className="voluntariado-intro__texto">
                <p>
                  En People consideramos a las personas voluntarias parte básica y fundamental de la
                  organización.
                </p>
                <p>
                  Todas nuestras actividades se desarrollan a través de su acompañamiento diario a
                  mujeres que sufren o han sufrido violencia de género.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Llamada a participar --- */}
      <section className="voluntariado-llamada">
        <div className="contenedor voluntariado-llamada__contenido">
          <div className="voluntariado-llamada__texto-bloque">
            <h2 className="voluntariado-llamada__titulo">Ser voluntaria es caminar al lado</h2>

            <div className="voluntariado-llamada__texto">
              <p>Acompañar no es dirigir. Es estar, sostener, escuchar y construir juntas.</p>
              <p>
                Si quieres formar parte de una red que transforma vidas desde el respeto y el
                compromiso, te estamos esperando.
              </p>
            </div>

            <Button
              href={`mailto:${SITE_INFO.volunteerEmail}?subject=Quiero%20ser%20voluntaria`}
              variant="acento"
            >
              Quiero ser voluntaria
            </Button>
          </div>

          <div className="voluntariado-llamada__ilustracion">
            <Image
              name="voluntariado-ilustracion"
              alt="Ilustración de una mujer de espaldas junto a un sol, con la frase «me gusta saber que puedo sin ti pero que cuento contigo»"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
        </div>
      </section>

      {/* --- Organización del voluntariado --- */}
      <section className="voluntariado-organizacion">
        {/* Trazos sueltos, solo textura de fondo */}
        <DottedPath shape="traza" dots={false} className="voluntariado-organizacion__traza voluntariado-organizacion__traza--1" />
        <DottedPath shape="traza" className="voluntariado-organizacion__traza voluntariado-organizacion__traza--2" />
        <DottedPath shape="traza" dots={false} className="voluntariado-organizacion__traza voluntariado-organizacion__traza--3" />
        <DottedPath shape="traza" className="voluntariado-organizacion__traza voluntariado-organizacion__traza--4" />

        <div className="contenedor">
          <h2 className="voluntariado-organizacion__titulo">¿Cómo nos organizamos?</h2>

          <div className="voluntariado-organizacion__lienzo">
            {/* Recorre las cuatro tarjetas en orden de lectura */}
            <DottedPath
              shape="serpenteante"
              dots={false}
              className="voluntariado-organizacion__camino"
            />

            <div className="voluntariado-organizacion__rejilla">
            <FeatureCard
              number={1}
              title="Grupos de apoyo"
              subtitle="Trabajo en grupos inteligentes"
              paragraphs={[
                'Dentro de la organización, las personas voluntarias se integran en grupos de apoyo.',
                'Cada mujer acompañada cuenta con su propio grupo, que se corresponsabiliza y trabaja en equipo durante todo el proceso.',
              ]}
            />

            <FeatureCard
              number={2}
              title="Plan personalizado"
              subtitle="Un plan adaptado a cada proceso"
              paragraphs={[
                'Cada acompañamiento parte de las necesidades concretas que van surgiendo en cada momento.',
                'Desde ahí, construimos un plan personalizado que se revisa y ajusta de manera continua.',
              ]}
            />

            <FeatureCard
              number={3}
              title="Coordinación profesional"
              subtitle="Coordinación con entidades especializadas"
              paragraphs={[
                'El voluntariado no actúa de manera aislada.',
                'Trabajamos en coordinación con diferentes entidades profesionales que comparten el objetivo de erradicar la violencia de género.',
              ]}
            />

            <FeatureCard
              number={4}
              title="Trabajo en red"
              subtitle="Coordinación con entidades especializadas"
              paragraphs={[
                'La colaboración con otros recursos permite guiar y coordinar mejor cada acompañamiento, aprovechando servicios y herramientas ya existentes para facilitar el camino.',
              ]}
            />
            </div>
          </div>
        </div>
      </section>

      {/* --- Lo que hacemos juntas --- */}
      <section className="voluntariado-actividades">
        {/* Manchas de fondo, por detrás de todo el contenido */}
        <span className="voluntariado-actividades__fondo voluntariado-actividades__fondo--1" aria-hidden="true" />
        <span className="voluntariado-actividades__fondo voluntariado-actividades__fondo--2" aria-hidden="true" />

        <div className="contenedor voluntariado-actividades__contenido">
          {/*
            El orden del marcado es el de móvil: título, vídeo y formas. En
            escritorio la rejilla recoloca el vídeo a la izquierda.
          */}
          <div className="voluntariado-actividades__destacado">
            <div className="voluntariado-actividades__elipse">
              <h2 className="voluntariado-actividades__titulo">Lo que hacemos juntas</h2>
            </div>

            <div className="voluntariado-actividades__media">
              {/* Rectángulo de color girado, sobre el que se apoya el vídeo */}
              <span className="voluntariado-actividades__respaldo" aria-hidden="true" />

              <div className="voluntariado-actividades__video">
                <video
                  src="/videos/Actividades.mp4"
                  poster="/videos/Actividades-poster.webp"
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>
            </div>

            <ul className="voluntariado-actividades__blobs">
              <li className="voluntariado-actividades__blob voluntariado-actividades__blob--1">
                Espacios compartidos
              </li>
              <li className="voluntariado-actividades__blob voluntariado-actividades__blob--2">
                Formación
              </li>
              <li className="voluntariado-actividades__blob voluntariado-actividades__blob--3">
                Coordinación
              </li>
              <li className="voluntariado-actividades__blob voluntariado-actividades__blob--4">
                Acompañamiento diario
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default VoluntariadoPage;
