import Seo from '@/components/ui/Seo/Seo';
import LegalPage from '@/components/ui/LegalPage/LegalPage';
import { SITE_INFO } from '@/data/siteInfo';

const AvisoLegalPage = () => {
  return (
    <>
      <Seo
        title="Aviso Legal | People, acompañando a la mujer maltratada"
        description="Consulta el aviso legal de People Asociación. Información sobre titularidad del sitio web, condiciones de uso y responsabilidades conforme a la normativa vigente."
        path="/aviso-legal"
      />

      <LegalPage title="Aviso Legal">
        <h2>1. Datos identificativos</h2>
        <p>
          En cumplimiento con el deber de información recogido en la normativa vigente, se informa
          que el presente sitio web es titularidad de:
        </p>

        <dl className="legal-page__datos">
          <div className="legal-page__dato">
            <dt>Denominación social:</dt>
            <dd>{SITE_INFO.legalName}</dd>
          </div>
          <div className="legal-page__dato">
            <dt>CIF:</dt>
            <dd>{SITE_INFO.cif}</dd>
          </div>
          <div className="legal-page__dato">
            <dt>Domicilio social:</dt>
            <dd>{SITE_INFO.registeredAddress}</dd>
          </div>
          <div className="legal-page__dato">
            <dt>Correo electrónico de contacto:</dt>
            <dd>
              <a href={`mailto:${SITE_INFO.email}`}>{SITE_INFO.email}</a>
            </dd>
          </div>
        </dl>

        <h2>2. Inscripción registral</h2>
        <p>La asociación se encuentra inscrita en:</p>
        <ul>
          <li>
            Registro Nacional de Asociaciones, con número de inscripción {SITE_INFO.nationalRegistry}
            .
          </li>
          <li>
            Registro de Asociaciones del Ayuntamiento de Madrid, con número de inscripción{' '}
            {SITE_INFO.madridRegistry}.
          </li>
        </ul>

        <h2>3. Objeto</h2>
        <p>
          {SITE_INFO.legalName} es una organización sin ánimo de lucro cuyo fin es el acompañamiento
          afectivo, personalizado y coordinado a mujeres que sufren o han sufrido violencia de
          género.
        </p>

        <h2>4. Propiedad intelectual</h2>
        <p>
          Todos los contenidos del presente sitio web, incluyendo textos, imágenes, diseño,
          logotipos y cualquier otro material, son propiedad de la asociación o cuentan con la
          correspondiente autorización para su uso, quedando protegidos por la normativa vigente en
          materia de propiedad intelectual.
        </p>
        <p>Queda prohibida su reproducción, distribución o modificación sin autorización expresa.</p>

        <h2>5. Responsabilidad</h2>
        <p>
          La asociación no se hace responsable del uso indebido de los contenidos del sitio web ni
          de los daños que pudieran derivarse del acceso o uso de la información contenida en el
          mismo.
        </p>

        <h2>6. Enlaces externos</h2>
        <p>
          En caso de que este sitio web incluya enlaces a páginas externas, la asociación no asume
          responsabilidad sobre los contenidos o políticas de privacidad de dichos sitios.
        </p>
      </LegalPage>
    </>
  );
};

export default AvisoLegalPage;
