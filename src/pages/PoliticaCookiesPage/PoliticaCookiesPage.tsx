import Seo from '@/components/ui/Seo/Seo';
import LegalPage from '@/components/ui/LegalPage/LegalPage';

/**
 * Adaptada respecto al original.
 *
 * El texto de Wix decía que la web usaba cookies técnicas y un gestor de
 * consentimiento. Esta versión en código no instala ninguna cookie: no hay
 * analítica, ni publicidad, ni recursos de terceros (las tipografías van
 * autoalojadas). Mantener el texto anterior sería declarar algo que no ocurre.
 *
 * PENDIENTE: revisión por la persona responsable antes de publicar.
 */
const PoliticaCookiesPage = () => {
  return (
    <>
      <Seo
        title="Política de Cookies | People, acompañando a la mujer maltratada"
        description="Información sobre el uso de cookies en la web de People Asociación, tipos de cookies utilizadas y cómo configurarlas o desactivarlas."
        path="/politica-de-cookies"
      />

      <LegalPage title="Política de Cookies">
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Una cookie es un pequeño archivo de texto que se almacena en el dispositivo del usuario al
          visitar una página web. Su finalidad es reconocer al usuario y mejorar su experiencia de
          navegación.
        </p>

        <h2>2. ¿Qué cookies utiliza este sitio web?</h2>
        <p>Este sitio web no instala cookies en el dispositivo de la persona usuaria.</p>
        <p>
          No se utilizan cookies de análisis, de publicidad, de seguimiento ni de personalización.
          Tampoco se emplean cookies técnicas, ya que la navegación y el envío del formulario de
          contacto funcionan sin necesidad de almacenar información en el navegador.
        </p>
        <p>
          Por este motivo no se muestra ningún aviso de consentimiento de cookies: no hay nada que
          consentir.
        </p>

        <h2>3. Cookies de terceros</h2>
        <p>
          El sitio web no incorpora servicios de terceros que instalen cookies. Las tipografías y el
          resto de recursos se sirven desde el propio dominio, de modo que la navegación no genera
          peticiones a servidores externos.
        </p>
        <p>
          Los enlaces a plataformas externas —como Instagram, Teaming o GoFundMe— se abren fuera de
          este sitio web y se rigen por sus propias políticas de cookies y privacidad.
        </p>

        <h2>4. Datos técnicos del servidor</h2>
        <p>
          El proveedor de alojamiento registra datos técnicos de las visitas, como la dirección IP o
          el tipo de navegador, con la única finalidad de mantener el servicio en funcionamiento y
          protegerlo frente a usos abusivos. Estos registros no utilizan cookies y no se emplean
          para identificar a las personas usuarias.
        </p>

        <h2>5. Gestión de cookies</h2>
        <p>
          Con independencia de lo anterior, cualquier persona puede configurar su navegador para
          bloquear o eliminar las cookies instaladas en su dispositivo por cualquier sitio web.
        </p>

        <h2>6. Modificaciones</h2>
        <p>
          La presente Política de Cookies puede actualizarse en función de cambios técnicos o
          legislativos. Se recomienda revisarla periódicamente.
        </p>
      </LegalPage>
    </>
  );
};

export default PoliticaCookiesPage;
