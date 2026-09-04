import Seo from '@/components/ui/Seo/Seo';
import LegalPage from '@/components/ui/LegalPage/LegalPage';
import { SITE_INFO } from '@/data/siteInfo';

/**
 * Texto reproducido literalmente del sitio original, con una única adición:
 * el apartado 5 incorpora a Resend como encargado del tratamiento, ya que es
 * quien envía materialmente los correos del formulario. Párrafo facilitado y
 * aprobado por la persona responsable de la asociación.
 */
const PoliticaPrivacidadPage = () => {
  return (
    <>
      <Seo
        title="Política de Privacidad | People, acompañando a la mujer maltratada"
        description="Conoce cómo People Asociación protege tus datos personales y cumple con el Reglamento General de Protección de Datos (RGPD)."
        path="/politica-de-privacidad"
      />

      <LegalPage title="Política de Privacidad">
        <h2>1. Responsable del tratamiento</h2>
        <p>
          En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD) y
          de la normativa española vigente en materia de protección de datos, se informa que el
          responsable del tratamiento de los datos personales recogidos a través del presente sitio
          web es:
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

        <h2>2. Finalidad del tratamiento</h2>
        <p>
          Los datos personales recogidos a través del formulario de contacto serán utilizados
          exclusivamente para:
        </p>
        <ul>
          <li>Gestionar y responder a las consultas realizadas.</li>
          <li>Facilitar información solicitada por la persona interesada.</li>
          <li>Ofrecer acompañamiento en situaciones de violencia de género cuando así se requiera.</li>
        </ul>
        <p>
          No se utilizarán los datos para el envío de comunicaciones comerciales ni se elaborarán
          perfiles automatizados.
        </p>

        <h2>3. Legitimación</h2>
        <p>
          La base legal para el tratamiento de los datos es el consentimiento de la persona usuaria
          al enviar el formulario de contacto.
        </p>

        <h2>4. Conservación de los datos</h2>
        <p>
          Los datos personales se conservarán únicamente durante el tiempo necesario para resolver la
          consulta planteada.
        </p>
        <p>
          Una vez finalizada la gestión, los datos serán eliminados salvo que exista obligación legal
          de conservación.
        </p>

        <h2>5. Destinatarios</h2>
        <p>
          Los datos no serán cedidos ni comunicados a terceros, salvo obligación legal. Esto no
          incluye a los proveedores que actúan como encargados del tratamiento por cuenta de la
          asociación, que se detallan a continuación y que únicamente tratan los datos siguiendo sus
          instrucciones.
        </p>
        <p>
          El tratamiento se realiza a través del servicio de correo electrónico contratado con
          Dinahosting, S.L., proveedor establecido en España, que actúa como encargado del
          tratamiento.
        </p>
        <p>
          Además, para la gestión del formulario de contacto, esta web utiliza los servicios de
          Resend (Resend, Inc.) como encargado del tratamiento para el envío de los correos
          electrónicos generados a través del formulario. Resend únicamente procesa el contenido del
          mensaje y los datos de contacto facilitados voluntariamente por la usuaria (nombre,
          apellido, email, teléfono y mensaje), con la única finalidad de hacer llegar la
          comunicación a{' '}
          <a href={`mailto:${SITE_INFO.email}`}>{SITE_INFO.email}</a>. Puedes consultar la política
          de privacidad de Resend en{' '}
          <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            https://resend.com/legal/privacy-policy
          </a>
          . Resend, Inc. está establecida fuera del Espacio Económico Europeo, por lo que este envío
          puede implicar una transferencia internacional de datos, realizada conforme a las
          garantías adecuadas previstas en la normativa vigente.
        </p>

        <h2>6. Derechos de las personas usuarias</h2>
        <p>Las personas interesadas pueden ejercer en cualquier momento los siguientes derechos:</p>
        <ul>
          <li>Derecho de acceso</li>
          <li>Derecho de rectificación</li>
          <li>Derecho de supresión</li>
          <li>Derecho de oposición</li>
          <li>Derecho a la limitación del tratamiento</li>
          <li>Derecho a la portabilidad de los datos</li>
          <li>Derecho a retirar el consentimiento en cualquier momento</li>
        </ul>
        <p>
          La retirada del consentimiento no afecta a la licitud del tratamiento realizado con
          anterioridad.
        </p>
        <p>
          Para ejercer estos derechos, se podrá enviar una solicitud acreditando la identidad de la
          persona solicitante al correo electrónico:{' '}
          <a href={`mailto:${SITE_INFO.email}`}>{SITE_INFO.email}</a>
        </p>
        <p>
          Asimismo, si se considera que el tratamiento de datos no se ajusta a la normativa, se puede
          presentar una reclamación ante la Agencia Española de Protección de Datos (
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
            www.aepd.es
          </a>
          ).
        </p>
      </LegalPage>
    </>
  );
};

export default PoliticaPrivacidadPage;
