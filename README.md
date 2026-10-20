# Ayleeeeta — portfolio

Portfolio de **Ayla Cano López**: diseño gráfico, ilustración y motion graphics.
Web estática (HTML + CSS + JavaScript) sin proceso de build: se publica tal cual en GitHub Pages.

## Estructura

```
index.html        → estructura: presentación, proyectos y contacto
css/style.css     → estilos (colores y tipografías en las variables del principio)
js/data.js        → TODO el contenido: textos, CV, proyectos y pegatinas  ← lo que más vas a editar
js/main.js        → animaciones e interacciones
assets/           → favicon y, en el futuro, tus imágenes y vídeos
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

## Imágenes

Ahora mismo se cargan desde Cargo (`freight.cargo.site`). **Antes de cancelar Cargo**, descarga tus archivos a `assets/` y cambia las rutas en `data.js`:

```js
img('assets/estrat/portada.jpg', 6000, 4000)   // ancho y alto reales
vid('assets/flores/video.mp4', 1280, 720)
```

Consejos: exporta las imágenes a 1600–2000 px de ancho en `.jpg` o `.webp` (calidad 75–80) y los vídeos en `.mp4` H.264, sin audio, de menos de 8–10 MB.

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
