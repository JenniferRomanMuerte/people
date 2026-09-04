# Pendiente y decisiones tomadas

Recoge lo que se ha cambiado respecto a la web original de Wix, lo que hace
falta para poder publicar y lo que queda por confirmar.

---

## 1. Bloqueante para publicar

### Configurar Resend

El formulario no envía nada hasta que estén las tres variables de servidor. Ver
el apartado correspondiente del README. Mientras tanto el endpoint devuelve un
aviso claro en lugar de fallar en silencio.

### Revisión legal de dos textos

**Política de cookies — modificada.** El texto de Wix decía que la web usaba
cookies técnicas y un gestor de consentimiento. Esta versión no instala ninguna
cookie: no hay analítica, ni publicidad, ni recursos de terceros (las tipografías
van autoalojadas). Mantener el texto anterior sería declarar algo que no ocurre,
así que se ha reescrito para que se corresponda con la realidad. **Debe validarlo
la persona responsable antes de publicar.**

**Política de privacidad — apartado 5 modificado, pendiente de validar.** El
párrafo original lo facilitó y aprobó la persona responsable, y sigue enumerando
los cinco campos del formulario: nombre, apellido, email, teléfono y mensaje.
Pero declaraba que el correo se gestionaba con **Gmail (Google LLC)**, y la
cuenta principal ha pasado a `info@peopleasociacion.com`, alojada en
**Dinahosting, S.L.**, proveedor establecido en España. El texto se ha
actualizado para nombrar al proveedor real.

Con ese cambio desaparecía la mención a transferencias internacionales de datos,
que colgaba de Google. Como **Resend, Inc. sí está fuera del Espacio Económico
Europeo**, esa advertencia se ha trasladado al párrafo de Resend en lugar de
perderla. **Debe validarlo la persona responsable antes de publicar.**

Se han corregido además tres puntos del mismo documento:

- El apartado 5 abría con "Los datos no serán cedidos a terceros" y a continuación
  describía dos proveedores. No es contradictorio en términos legales —un
  encargado del tratamiento no es una cesión— pero se leía como tal. Ahora lo
  distingue de forma expresa.
- Faltaba el **derecho a retirar el consentimiento**, que el RGPD exige informar
  cuando el consentimiento es la base legal del tratamiento, como es el caso.
- Para ejercer los derechos se exigía "copia de documento identificativo". La
  AEPD desaconseja pedirla de forma sistemática, así que ahora se pide acreditar
  la identidad sin imponer un medio concreto.

**Acción pendiente en Resend:** aceptar su Acuerdo de Encargado del Tratamiento
(DPA), en el panel de Resend dentro de los ajustes legales. Es lo que sostiene la
frase sobre "garantías adecuadas" del apartado 5. Sin él, esa afirmación se
queda sin respaldo documental.

Queda una incoherencia menor mientras dure la transición: el correo de
voluntariado sigue siendo `peoplevoluntariado@gmail.com`, así que Gmail sigue
interviniendo en esa vía aunque el texto ya no lo nombre. Se resuelve solo
cuando esa cuenta pase también al dominio.

---

## 2. Añadido a petición

| Qué | Dónde |
|---|---|
| Aviso del 016 | Pie de página, en las 10 páginas |
| Botón de salida rápida | Fijo, abajo a la derecha, en todas las páginas |
| Página 404 | `/404`, con el mismo layout |
| Campo "Mensaje" en el formulario | `/contacto` |

**Texto del aviso del 016.** No existía en la web original; está redactado a
partir de la información oficial del servicio:

> **Si estás en peligro, llama al 016**
> Atención 24 horas, gratuita y confidencial. La llamada no queda registrada en
> la factura del teléfono. En caso de emergencia, marca el 112.

Queda a confirmar con la persona responsable, tal y como se acordó.

**Sobre el botón de salida rápida.** Lleva a Google al instante y evita que la
página actual quede en el historial, pero **no puede borrar la navegación
anterior**: eso no es posible desde una web. Conviene no presentarlo ante las
usuarias como algo que elimina el rastro.

---

## 3. Correcciones sobre el original

| Página | Antes | Ahora |
|---|---|---|
| `/contacto` | El `<title>` era `Contacto \| People, acompañando  a la mujer maltratada, dame una metadescripcion para esta pagina` — un prompt de IA pegado por error, visible en Google | `Contacto \| People, acompañando a la mujer maltratada` |
| `/necesitas-ayuda` | `Tus datos estar án siempre protegidos` | `Tus datos estarán siempre protegidos` |
| `/necesitas-ayuda` | `formar parte de tú futuro` | `formar parte de tu futuro` |
| Todas | Muchos `alt` eran el nombre del archivo (`background_papper.webp`, `SymbolLogo.png`, `plan-ccordinado.webp`) o estaban vacíos | `alt` descriptivos en español; las decorativas con `alt=""` |
| Pie | `© 2025` fijo | Año calculado en cada build |

---

## 4. Vídeos

Los originales llegaron en 1080p y pesando mucho —el de «Nuestro día a día»,
114 MB—. Se comprimieron a 720p con el índice al principio del archivo, para
que empiecen a reproducirse sin esperar a la descarga completa.

- Servido: `public/videos/Actividades.mp4` — este sí va al repositorio
- Originales: `assets-source/videos/` — fuera del repositorio, GitHub rechaza
  archivos de más de 100 MB

**«Nuestro día a día» ya no lleva vídeo.** Al rediseñar la sección se sustituyó
por dos manchas de texto, así que el archivo servido se ha borrado. El original
sigue en `assets-source/videos/NuestroDia-original.mp4` por si se recupera.

Para comprimir otro vídeo, con `ffmpeg-static` ya instalado:

```bash
FF=$(node -e "process.stdout.write(require('ffmpeg-static'))")
"$FF" -i entrada.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 30 -preset slow \
  -c:a aac -b:a 96k -movflags +faststart salida.mp4
```

`crf` controla la calidad: subirlo comprime más, bajarlo mejora la imagen.

El reproductor lleva controles y no arranca solo. Un vídeo que se reproduce
sin permiso molesta, y más si contiene testimonios: cada persona decide cuándo
verlo. Se puede cambiar a ambiental (mudo, en bucle, automático) si interesa.

## 5. Sustituciones técnicas

**Tipografías.** El original usaba American Typewriter, propiedad de ITC, que no
puede servirse en web sin licencia. Se sustituye por **Zilla Slab**. El cuerpo de
texto va en **Open Sans**, la original. El rediseño añade **Space Grotesk** para
interfaz y **Caveat** para citas y notas manuscritas.

Todas van **autoalojadas** con `@fontsource`, no desde el CDN de Google. Cargarlas
desde Google enviaría la IP de cada visitante a un tercero y contradiría la
política de cookies, que declara que la web no hace peticiones externas.

Para cambiar cualquiera basta con tocar `src/styles/abstracts/_variables.scss`.

**Paleta.** La del rediseño, sobre los morados de marca extraídos del original:

| Color | Uso |
|---|---|
| `#47274D` | Morado oscuro — texto, títulos y bloques fuertes |
| `#7F468A` | Morado — acciones secundarias |
| `#755D7A` | Morado medio — texto suave |
| `#B887C2` | Morado claro — acentos puntuales |
| `#FF9E45` | Naranja — acento principal |
| `#FDF7ED` | Crema — fondo alterno |
| `#241226` | Morado noche — franjas oscuras |
| `#D1C9D3` | Gris — bordes y separadores |

**Icono de Instagram.** Era una imagen PNG; ahora es un SVG en línea. Pesa menos,
se ve nítido en cualquier pantalla y hereda el color del texto.

---

## 6. Sin confirmar

- **Ilustración de `/voluntariado`.** La de la sección "Actividades de las
  personas voluntarias" lleva la firma **@renkarem**. Conviene comprobar que hay
  permiso de uso, ya que el aviso legal afirma que todo el material es propio o
  está autorizado.

---

## 7. Recomendaciones no aplicadas

Se anotan sin implementar, para no añadir contenido que no estaba en el original.

- **La página `/necesitas-ayuda` no ofrece ninguna forma de contactar.** Termina
  con "estamos aquí para escucharte" pero no hay ni botón ni enlace: hay que
  volver al menú. Siendo la página dirigida a quien está pidiendo ayuda, un
  botón hacia `/contacto` tendría sentido.
- **La portada tampoco enlaza a las secciones internas** desde sus dos bloques
  ("Nuestro día a día" y "Juntas contra la violencia machista").
- **El texto del 016 podría ir también en la cabecera** de `/necesitas-ayuda`, no
  solo en el pie.

---

## 8. Verificado

- **Las dos direcciones son correctas y distintas a propósito.** *C/ Nicolás
  Usera, 27 · Espacio Oculto (Madrid)* es la sede donde se acompaña, y va en el
  pie y en Contacto. *Calle Menorca 7, 2º, 28009 Madrid* es el domicilio social
  a efectos legales, y va en el aviso legal y en la política de privacidad. No
  hay que unificarlas.
- 42 tests en verde (validación, formulario y endpoint)
- Las 9 rutas responden con su propio HTML prerenderizado
- Título, descripción, canónica y `og:` únicos por página
- Ningún secreto en `dist/`
- Todas las imágenes con `alt` y con `width`/`height`
- El aviso del 016 aparece en las 10 páginas
- El servidor de desarrollo y el build de producción funcionan

**No verificado:** el aspecto visual en un navegador real. La maquetación está
construida sobre la paleta, tipografías y estructura extraídas del original, pero
no se ha podido abrir en pantalla para compararla lado a lado. Es lo primero que
conviene revisar con `npm run dev`.
