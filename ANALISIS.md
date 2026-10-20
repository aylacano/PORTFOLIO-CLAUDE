# Análisis: qué hace que un portfolio de Awwwards se sienta cuidado

Referencia: la categoría *Portfolio* de awwwards.com (henne.studio, mildsugar, Huy Phan, Studio Naam, Maria Vasilyeva, KOTA…). La mayoría de las webs premiadas no son complicadas: son **sencillas en estructura y muy cuidadas en el detalle**.

## 1. Patrones que se repiten (y cuáles he usado)

| Patrón | Por qué funciona | En tu web |
| --- | --- | --- |
| **Preloader con identidad** | Primer contacto con la marca; esconde la carga de fuentes e imágenes | Contador 0→100 con las "EEEE" de *AYLEEEETA* rebotando en rosa |
| **Texto que aparece línea a línea** (máscara + desplazamiento) | Lo más reconocible del estilo Awwwards; da ritmo editorial | Titular del hero, "Proyectos", contacto (GSAP SplitText) |
| **Scroll suave** | Todo el movimiento se siente más fluido y "caro" | Lenis |
| **Lista tipográfica + imagen flotante al hover** | Muy típico en portfolios de diseño: limpio, pero sorprende al interactuar | Lista de proyectos (como tu Cargo actual: 01/, 02/…) + imagen del frame 2 de tu Figma que sigue al cursor, se inclina con la velocidad y va cambiando de imagen |
| **Cursor personalizado con etiqueta** | Dice qué va a pasar ("Ver", "Copiar") y da personalidad | Punto que crece en rosa con texto |
| **Botones magnéticos** | Microinteracción que invita a hacer clic | Botones redondos y email |
| **Marquee que reacciona al scroll** | Movimiento continuo y juguetón | Cinta de disciplinas que acelera y cambia de sentido según el scroll |
| **Texto que se "enciende" al hacer scroll** | Obliga a leer al ritmo del scroll | Párrafo de "sobre mí" |
| **Transiciones entre páginas** | Evita el corte brusco; sensación de app | Cortinilla rosa al abrir / cerrar / pasar de proyecto |
| **Detalles humanos** | Hora local, disponibilidad, alter ego… | Reloj de Barcelona, punto "disponible", foto que se convierte en tu ilustración animada al pasar el ratón |
| **Modo oscuro** | Se nota pensado; muchas premiadas lo tienen | Botón redondo (se guarda la elección) |
| **Accesibilidad y rendimiento** | Awwwards puntúa también *usabilidad* y *desarrollo* | Respeta "reducir movimiento", se navega con teclado, imágenes en carga diferida |

## 2. Librerías JavaScript que más se ven

**Imprescindibles (las he usado):**
- **GSAP** (+ ScrollTrigger, SplitText, Flip): el estándar de la animación web. Desde 2025 es 100 % gratis, plugins incluidos.
- **Lenis**: scroll suave ligero, el más usado hoy en webs premiadas.

**Para cuando quieras subir de nivel:**
- **Lottie** (lottie-web / dotLottie): exportas animaciones de **After Effects** con el plugin Bodymovin y las pones en la web como vector. Perfecto para ti: personajes, iconos animados, el logo.
- **Rive**: animaciones interactivas (que reaccionan al ratón/clics). Ideal para un personaje de ayleeeeta que te mire o siga el cursor.
- **Barba.js** o la **View Transitions API** del navegador: transiciones entre páginas reales si un día cada proyecto tiene su propia URL/HTML.
- **Three.js / OGL / Curtains.js**: WebGL para efectos de distorsión en imágenes (ondas, líquido al hover). Muy vistoso pero más complejo y pesado.
- **Matter.js**: física 2D (pegatinas o letras que caen y se pueden arrastrar). Encaja con un estilo ilustrado y divertido.

## 3. Ideas siguientes, de menos a más esfuerzo

1. Sustituir la "a" del favicon por un mini icono de ayleeeeta.
2. Añadir una pequeña animación Lottie de tu personaje en el preloader o en contacto.
3. Que algunos proyectos de motion (Sex & The City, Flores, Rocko +) muestren el vídeo en la previsualización del hover.
4. Pegatinas ilustradas arrastrables (Matter.js) en la sección de contacto.
5. Efecto WebGL de distorsión en las imágenes del hover (OGL).
6. Versión en catalán/inglés.

## 4. Decisiones de diseño a partir de tu Figma

- **Frame 1** → cabecera con *AYLEEEETA* centrado, dos botones redondos arriba a la derecha (tema y contacto), texto grande abajo a la izquierda, tarjeta vertical a la derecha y la **barra rosa** inferior convertida en navegación (Hola · Proyectos · Contacto) con una línea de progreso del scroll.
- **Frame 2** → la imagen centrada se usa como la previsualización flotante de los proyectos.
- Paleta: papel cálido `#f5f2ec`, tinta `#161514` y el rosa del Figma `#ff8ab6` como único acento.
- Tipografías (referencia: khasiyev.com): *General Sans* en peso normal con espaciado ajustado (-0.03em) + serif cursiva fina para destacar palabras. El original usa *PP Editorial New Ultralight Italic* (de pago para uso comercial); aquí va *Instrument Serif Italic* (gratis y muy parecida); se cambia en la variable `--accent` de `css/style.css`. El logo y la pantalla de carga usan *Permanent Marker* (rotulador naif) con un *line boil* como el de forticheprod.com: tres filtros SVG que deforman el borde y se alternan 8 veces por segundo, más letras ligeramente torcidas. Se cambia en `--logo-font`.
- Logo: *ayleeeeta* arriba a la izquierda; al bajar, las cuatro "e" se pliegan en una (*ayleta*) y al subir o pasar el ratón se despliegan.

## 5. Rediseño inspirado en juanmoraromero.com

- **Retícula suiza** con líneas finas: columna lateral (datos) + columna principal (contenido).
- **Etiquetas pequeñas** (11 px, gris + valor) frente a **una frase grande en negrita** con sangría, como contraste tipográfico. Tipografía: *Inter* (versión Display automática en tamaños grandes) en lugar de *Neue Haas Grotesk Display*, que es de Adobe Fonts. Si la activas desde Adobe Fonts con tu cuenta de Creative Cloud, se cambia en `--sans`.
- **Grano de película** animado por encima de todo.
- **Carrusel horizontal**: la portada se queda fija y el scroll pasa los proyectos. La tarjeta activa es grande y las siguientes, pequeñas. Los datos de la izquierda (proyecto, disciplina, año) y el contador 01/12 se actualizan solos. Los vídeos se reproducen en la tarjeta activa.
- **Pegatinas con física** (Matter.js): tus dibujos caen y se pueden lanzar con el ratón o el dedo. Es la versión personal de las formas geométricas de Juan.
- Se mantienen el **logo rotulado que vibra**, el plegado de las E, el **rosa** como único acento y la pastilla inferior del Figma.

## 6. Ajustes posteriores

- Una sola tipografía (*Inter*) en toda la web, sin cursivas ni rosa: el contraste lo dan el peso y el tamaño.
- Logo en Inter muy negrita, con el trazo que vibra. Las E se pliegan recortándose, sin fundidos.
- Fotos de perfil cuadradas, a color, que se alternan como un stop-motion (más rápido al pasar el ratón).
- Pantalla de carga con la diablilla de ayleeeeta (también vibra) y el porcentaje debajo, sobre gris claro.
- Menú arriba (Proyectos · Sobre mí · Contacto) con una línea de progreso, en lugar de la pastilla.
- Proyectos: Estrat, Sex & The City, CasiCasi, Rocko +, El clan, Flores, Pecado y RRSS.
- Ayleeeeta pasa a "Sobre mí" y sus pegatinas son las que se arrastran.
