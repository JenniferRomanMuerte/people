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

**Política de privacidad — resuelto.** El apartado 5 ("Destinatarios") ya
incorpora a Resend como encargado del tratamiento, junto a Gmail. El párrafo lo
facilitó y aprobó la persona responsable de la asociación.

Queda una observación menor, por si interesa afinarla más adelante: el párrafo
enumera como datos facilitados «nombre, email y mensaje», mientras que el
formulario ofrece además dos campos opcionales, apellido y teléfono. No se toca
sin indicación expresa.

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

## 4. Sustituciones técnicas

**Tipografía de los títulos.** El original usa American Typewriter, propiedad de
ITC, que no puede servirse en web sin licencia. Se ha sustituido por **Zilla
Slab**. El cuerpo de texto sigue en **Open Sans**, que sí es la original, y los
textos pequeños en **Poppins**, también la original.

Para cambiar la sustituta basta con tocar una línea en
`src/styles/abstracts/_variables.scss`:

```scss
$fuente-titulos: 'Zilla Slab', 'Bitter', Georgia, serif;
```

**Paleta y tamaños.** No están aproximados a ojo: se extrajeron de las variables
CSS que Wix genera en el HTML.

| Color | Uso |
|---|---|
| `#47274D` | Texto y títulos |
| `#7F468A` | Acciones y acentos |
| `#755D7A` | Texto secundario |
| `#B887C2` | Morado claro |
| `#E7D7EB` | Bordes y separadores |
| `#FCF4FB` | Fondo alterno |
| `#FFF6EA` | Crema |
| `#FFD3A1` | Acento cálido |

**Icono de Instagram.** Era una imagen PNG; ahora es un SVG en línea. Pesa menos,
se ve nítido en cualquier pantalla y hereda el color del texto.

---

## 5. Sin confirmar

- **Dos direcciones distintas.** El pie dice *C/ Nicolás Usera, 27 · Espacio
  Oculto (Madrid)* y los textos legales dan como domicilio social *Calle Menorca
  7, 2º, 28009 Madrid*. Se han dejado las dos tal cual, a la espera de
  confirmación.
- **Foto de `/contacto`.** Es una imagen de stock de Wix (atardecer sobre el mar).
  Se mantiene de momento.
- **Ilustración de `/voluntariado`.** La de la sección "Actividades de las
  personas voluntarias" lleva la firma **@renkarem**. Conviene comprobar que hay
  permiso de uso, ya que el aviso legal afirma que todo el material es propio o
  está autorizado.

---

## 6. Recomendaciones no aplicadas

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

## 7. Verificado

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
