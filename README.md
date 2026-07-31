# People · Acompañando a la mujer maltratada

Web de la asociación, migrada de Wix a código.

Sitio estático de 9 páginas más una función serverless para el formulario de
contacto. Las URLs son idénticas a las de la web anterior, así que ningún enlace
ya compartido o indexado deja de funcionar.

---

## Puesta en marcha

```bash
npm install
cp .env.example .env    # rellenar los valores
npm run dev             # http://localhost:5173
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run dev:api` | Igual, más el formulario de contacto funcionando |
| `npm run build` | Genera `dist/` con las 9 páginas en HTML estático + sitemap |
| `npm run preview` | Sirve el resultado del build |
| `npm test` | Ejecuta los tests |
| `npm run images` | Regenera las imágenes optimizadas y los iconos |

### Probar el formulario en local

`npm run dev` levanta solo Vite, que no sabe nada de `api/`: ahí el formulario
responde 404. Para probarlo de verdad hace falta el CLI de Vercel, que ejecuta
la función además de servir la web:

```bash
npm run dev:api         # http://localhost:3000
```

Tres detalles que cuestan de adivinar:

- **Se entra por el 3000**, no por el 5173. El 5173 sigue existiendo porque es
  el Vite que Vercel arranca por dentro, pero no sirve la función.
- **Las variables se leen de `.env`**, no de `.env.local`. Con las claves solo
  en el segundo, la función arranca sin ellas y devuelve un 500.
- **Resend, hasta que el dominio esté verificado**, solo permite enviar desde
  `onboarding@resend.dev` y hacia la dirección de la cuenta. Cualquier otra
  combinación devuelve 403.

---

## Stack

- **Vite + React + TypeScript**
- **vite-react-ssg** — prerenderiza cada ruta a HTML estático. Es lo que hace
  que funcione el SEO de verdad: WhatsApp, Instagram y Facebook no ejecutan
  JavaScript, así que sin prerender no verían ni el título ni la descripción al
  compartir un enlace.
- **SCSS** con BEM, mobile first
- **Vitest + Testing Library**
- **Resend** para el envío del formulario

---

## Estructura

```
api/
  contacto.ts              función serverless que envía el correo
  _types.ts                tipos mínimos del runtime de Vercel
assets-source/             imágenes originales sin optimizar
scripts/
  optimize-images.js       genera WebP responsive + iconos + manifiesto
  generate-sitemap.js      genera dist/sitemap.xml tras el build
src/
  assets/images/           imágenes optimizadas y manifest.ts (generados)
  components/
    ui/                    Button, Image, Seo, ErrorMessage, SuccessMessage,
                           FeatureCard, LegalPage, InstagramIcon, PaperFigures,
                           DottedPath, TornEdge, StickyNote, PhotoFeatureBlock
    layout/                Header, Footer, Layout, QuickExit
  data/                    navigation.ts, siteInfo.ts
  hooks/                   useContactForm, useMobileMenu, useQuickExit,
                           useScrollToTop
  pages/                   una carpeta por ruta
  services/                api.ts, contactService.ts
  types/                   ContactMessage.ts, NavLink.ts
  utils/                   validateContactForm.ts
  styles/
    abstracts/             _variables.scss, _mixins.scss
    base/                  _reset, _typography, _utilidades
    main.scss
```

Cada componente vive en su carpeta con su `.tsx` y su `.scss`. En `styles/` solo
quedan los abstracts, la base y la hoja principal.

### Sobre los SCSS

Vite inyecta automáticamente `@use "@/styles/abstracts" as *` en todos los SCSS,
así que las variables y mixins están disponibles sin importarlos.

**Excepción:** los parciales que carga `main.scss` (los de `base/`) se resuelven
dentro de Sass, no pasan por Vite, y sí tienen que importar los abstracts a mano.

---

## Formulario de contacto

```
Navegador  →  POST /api/contacto  →  Resend  →  peopleasociacion@gmail.com
```

La clave de la API vive únicamente en el servidor. El bundle que descarga el
navegador no contiene ningún secreto; se puede comprobar tras un build con:

```bash
grep -rE "re_[A-Za-z0-9]{20,}|RESEND_API_KEY" dist/
```

Medidas aplicadas:

- Validación en el cliente **y** repetida en el servidor. Lo que llega del
  navegador se puede manipular, así que nunca se da por bueno.
- Campo trampa (*honeypot*) invisible: si llega relleno, el envío se descarta y
  se responde 200 para no darle pistas al bot.
- Límite de 5 envíos por IP cada 10 minutos. Es un control a nivel de instancia:
  en serverless cada instancia tiene su propia memoria, así que frena el abuso
  burdo pero no sustituye a un limitador real.
- El contenido del mensaje se escapa antes de meterlo en el HTML del correo.
- El `reply-to` es el email de quien escribe: se puede responder directamente.

### Variables de entorno

En Vercel: *Settings → Environment Variables*.

| Variable | Ámbito | Para qué |
|---|---|---|
| `VITE_SITE_URL` | Cliente | URL canónica y etiquetas `og:` |
| `VITE_API_URL` | Cliente | Ruta del endpoint (`/api`) |
| `RESEND_API_KEY` | **Servidor** | Clave de Resend |
| `CONTACT_FROM_EMAIL` | **Servidor** | Remitente verificado en Resend |
| `CONTACT_TO_EMAIL` | **Servidor** | Buzón que recibe los mensajes |

Las que empiezan por `VITE_` acaban en el bundle del navegador. **Nunca poner un
secreto en una variable `VITE_`.**

### Antes de que el formulario funcione

1. Crear una cuenta en [resend.com](https://resend.com).
2. Verificar el dominio `peopleasociacion.com` (registros DNS que da Resend).
3. Generar la API key y configurar las tres variables de servidor en Vercel.

Sin esto, el endpoint responde con un aviso claro en lugar de fallar en silencio.

---

## Imágenes

Los originales están en `assets-source/`. `npm run images` genera las variantes
WebP responsive, los iconos y `src/assets/images/manifest.ts`, que el componente
`Image` usa para pintar `srcset` y `width`/`height`.

La foto más pesada del original ocupaba 3,5 MB; ahora la variante mayor son
128 KB. El sitio completo pesa unos 4,7 MB con todas las variantes, y una visita
descarga solo las que necesita.

Para cambiar o añadir una imagen: dejarla en `assets-source/`, añadir su entrada
al array `IMAGENES` de `scripts/optimize-images.js` y ejecutar `npm run images`.

---

## Accesibilidad

- Enlace de salto al contenido, primero en el orden de tabulación
- Foco visible en todos los elementos interactivos
- Todas las imágenes con `alt` descriptivo; las decorativas con `alt=""`
- Los errores del formulario se anuncian con `role="alert"` y se enlazan al
  campo con `aria-describedby`
- Se respeta `prefers-reduced-motion`
- El menú móvil se cierra con Escape y bloquea el scroll del fondo

---

## Botón de salida rápida

Botón fijo en todas las páginas que lleva a Google al instante.

**Sus límites, dichos claramente:** desde una web no se puede borrar el historial
del navegador. Lo que se consigue es que la página actual no quede registrada,
usando `location.replace` en lugar de una navegación normal, de modo que el botón
"atrás" no devuelve aquí. **La navegación anterior a esta visita sigue existiendo
en el navegador.** Conviene no describirlo ante las usuarias como algo que borra
el rastro, porque no lo hace.

---

## Despliegue en Vercel

El proyecto ya trae `vercel.json`. Al conectar el repositorio:

- Build: `npm run build`
- Directorio de salida: `dist`
- Las funciones de `api/` se despliegan solas
- `404.html` se sirve automáticamente en las rutas que no existen

---

## Nota sobre `npm audit`

`npm audit` marca dos avisos moderados en `react-router` 6.x:

- **Open redirect vía barra invertida en `<Link>` / `useNavigate`** — requiere que
  un destino de navegación venga de datos que controle quien visita la web. Aquí
  todos los enlaces son constantes escritas en el código.
- **Inyección de constructor en `deserializeErrors()` durante la hidratación SSR**
  — requiere un servidor que serialice errores en el HTML. Este sitio es estático
  y no usa *data loaders* ni serializa errores de servidor.

La rama 7.x corrige esos dos, pero introduce otro aviso *high* (bypass de CSRF en
modo RSC) que tampoco aplica aquí, y además incumple el peer de `vite-react-ssg`.
Se ha elegido 6.30.4 por tener el árbol de dependencias limpio. Conviene revisarlo
cuando `vite-react-ssg` declare soporte de la 7.

