import Seo from '@/components/ui/Seo/Seo';
import PageHero from '@/components/ui/PageHero/PageHero';
import FeatureCard from '@/components/ui/FeatureCard/FeatureCard';
import Button from '@/components/ui/Button/Button';
import Image from '@/components/ui/Image/Image';
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

      <PageHero
        title="Voluntariado"
        subtitle="El motor que hace posible el acompañamiento"
        image="voluntariado-hero"
        imageAlt="Dos mujeres caminando juntas por la calle, vistas de espaldas"
      >
        <p>
          En People consideramos a las personas voluntarias parte básica y fundamental de la
          organización, ya que son quienes llevan a cabo nuestros fines y objetivos.
        </p>
        <p>
          Todas nuestras actividades se desarrollan a través de su acompañamiento diario a mujeres
          que sufren o han sufrido violencia de género.
        </p>
      </PageHero>

      {/* --- Llamada a participar --- */}
      <section className="voluntariado-llamada">
        <div className="contenedor contenedor--estrecho">
          <h2 className="voluntariado-llamada__titulo">Ser voluntaria es caminar al lado</h2>
          <div className="voluntariado-llamada__texto">
            <p>Acompañar no es dirigir. Es estar, sostener, escuchar y construir juntas.</p>
            <p>
              Si quieres formar parte de una red que transforma vidas desde el respeto y el
              compromiso, te estamos esperando.
            </p>
          </div>
          <Button href={`mailto:${SITE_INFO.volunteerEmail}?subject=Quiero%20ser%20voluntaria`}>
            Quiero ser voluntaria
          </Button>
        </div>
      </section>

      {/* --- Organización del voluntariado --- */}
      <section className="voluntariado-organizacion">
        <div className="contenedor">
          <h2 className="voluntariado-organizacion__titulo">¿Cómo se organiza el voluntariado?</h2>

          <div className="voluntariado-organizacion__rejilla">
            <FeatureCard
              title="Grupos de apoyo"
              subtitle="Trabajo en grupos inteligentes"
              paragraphs={[
                'Dentro de la organización, las personas voluntarias se integran en grupos de apoyo.',
                'Cada mujer acompañada cuenta con su propio grupo, que se corresponsabiliza y trabaja en equipo durante todo el proceso.',
              ]}
            />

            <FeatureCard
              title="Plan personalizado"
              subtitle="Un plan adaptado a cada proceso"
              paragraphs={[
                'Cada acompañamiento parte de las necesidades concretas que van surgiendo en cada momento.',
                'Desde ahí, construimos un plan personalizado que se revisa y ajusta de manera continua.',
              ]}
            />

            <FeatureCard
              title="Coordinación profesional"
              subtitle="Coordinación con entidades especializadas"
              paragraphs={[
                'El voluntariado no actúa de manera aislada.',
                'Trabajamos en coordinación con diferentes entidades profesionales que comparten el objetivo de erradicar la violencia de género.',
              ]}
            />

            <FeatureCard
              title="Trabajo en red"
              subtitle="Coordinación con entidades especializadas"
              paragraphs={[
                'La colaboración con otros recursos permite guiar y coordinar mejor cada acompañamiento, aprovechando servicios y herramientas ya existentes para facilitar el camino.',
              ]}
            />
          </div>
        </div>
      </section>

      {/* --- Actividades --- */}
      <section className="voluntariado-actividades">
        <div className="contenedor voluntariado-actividades__contenido">
          <div className="voluntariado-actividades__texto">
            <h2 className="voluntariado-actividades__titulo">
              Actividades de las personas voluntarias
            </h2>
            <p>
              Espacios compartidos, formación, coordinación y acompañamiento en el día a día.
            </p>
          </div>

          <div className="voluntariado-actividades__imagen">
            <Image
              name="voluntariado-actividades"
              alt="Ilustración de una mujer de espaldas junto a un sol, con la frase «me gusta saber que puedo sin ti pero que cuento contigo»"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default VoluntariadoPage;
