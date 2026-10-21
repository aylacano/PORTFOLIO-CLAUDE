# Ayleeeeta — portfolio

Portfolio de **Ayla Cano López**: diseño gráfico, ilustración y motion graphics.
Web estática (HTML + CSS + JavaScript) sin proceso de build: se publica tal cual en GitHub Pages.

## Estructura

```
index.html        → portada: presentación, carrusel de proyectos y contacto
sobre-mi.html     → sobre mí: texto, ayleeeeta, currículum y contacto
lab.html          → lab: todos los proyectos en una cuadrícula con filtros
css/style.css     → estilos (colores y medidas en las variables del principio)
js/data.js        → contenido: textos, CV, proyectos y pegatinas  ← lo que más vas a editar
js/lab-data.js    → piezas del Lab (incluye proyectos sin página propia)
js/main.js        → animaciones e interacciones (sirve para las 3 páginas)
assets/img        → imágenes optimizadas · assets/thumbs → miniaturas de 700 px
assets/video      → vídeos optimizados
```

## Cómo verla en tu ordenador

```bash
npx http-server -p 5173 -c-1
```

Y abre http://localhost:5173. (También funciona abriendo `index.html` con doble clic, pero algunas cosas, como copiar el email, solo van con servidor.)

## Cómo añadir un proyecto

Abre `js/data.js`, copia un bloque `{ slug: ..., title: ..., ... }` dentro de `PROJECTS` y cambia:

- `slug`: el nombre en la URL (sin espacios ni tildes), p. ej. `mi-proyecto`
- `title`, `kicker` (subtítulo), `year`, `tags` (`ilustracion`, `motion`, `branding`, `editorial`, `packaging`, `foto`)
- `cover`: la imagen o vídeo principal
- `blocks`: uno o varios bloques con `title`, `subtitle`, `text` (párrafos) y `media` (imágenes/vídeos)

El orden del array es el orden en la web (y en el carrusel).

## Pegatinas arrastrables

Al final de `js/data.js` está `STICKERS`. Cada pegatina es una ilustración redonda (`src`) o un texto (`text`, en forma `circle` o `pill`). Lo ideal: exporta desde Procreate tus dibujos recortados en PNG con fondo transparente, guárdalos en `assets/pegatinas/` y pon esa ruta en `src`.

## Imágenes y vídeos

Están en `assets/img/<proyecto>/` y `assets/video/`, ya optimizados a partir de la carpeta del escritorio *PORTFOLIO AYLETA*. Flores todavía se carga desde Cargo: no canceles Cargo sin pasar antes esos archivos a `assets/`.

Para añadir archivos nuevos sin que la web pese demasiado, usa las herramientas que ya trae el Mac (Terminal):

```bash
sips -Z 1800 -s format jpeg -s formatOptions 74 "original.png" --out assets/img/proyecto/nombre.jpg
```

```bash
avconvert -s "original.mov" -p Preset1280x720 -o assets/video/nombre.mp4
```

(Para vídeos verticales o muy largos usa `Preset960x540`.) Usa PNG solo si la imagen tiene fondo transparente, como las pegatinas.

## Currículum en PDF

El botón "Descargar CV" de Sobre mí descarga `assets/cv/CV_AylaCano.pdf`. Se genera desde `cv/cv.html` (mismo diseño que tu CV original; el contenido se edita ahí directamente). Después de cambiarlo, con la web abierta en local (`npx http-server -p 5173`) ejecuta:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="$PWD/assets/cv/CV_AylaCano.pdf" http://localhost:5173/cv/cv.html
```

## Si no ves los cambios online

El navegador guarda copias de la web. Los archivos y los enlaces entre páginas llevan `?v=2026111315`: cada vez que subas cambios, busca y reemplaza ese número por uno nuevo en las 3 páginas (`index.html`, `lab.html`, `sobre-mi.html`) y todo el mundo verá la versión nueva. Para comprobarlo tú, recarga con **Cmd + Shift + R**.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `ayleeeeta.github.io` para que la URL sea `https://ayleeeeta.github.io` — cambia `ayleeeeta` por tu usuario de GitHub).
2. Sube esta carpeta (con GitHub Desktop o con `git`, ver abajo).
3. En el repositorio: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
4. En 1–2 minutos la web estará online. Cada vez que subas cambios se actualiza sola.

Con la terminal (necesita las Command Line Tools de Xcode: `xcode-select --install`):

```bash
git init
git add .
git commit -m "Primer portfolio"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

## Librerías

| Librería | Para qué |
| --- | --- |
| [GSAP 3.13](https://gsap.com) + ScrollTrigger + SplitText | animaciones, revelado de textos, efectos con scroll (gratis desde 2025, también los plugins) |
| [Lenis](https://lenis.darkroom.engineering) | scroll suave |
| [Matter.js](https://brm.io/matter-js/) | física de las pegatinas arrastrables |

Se cargan desde CDN, así que no hay que instalar nada.
