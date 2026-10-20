/* ==========================================================================
   DATOS DEL PORTFOLIO
   --------------------------------------------------------------------------
   Aquí está todo el contenido de la web. Para añadir o cambiar un proyecto
   solo tienes que editar este archivo: no hace falta tocar el HTML.

   · img('assets/img/carpeta/archivo.jpg', ancho, alto)  → imagen
   · vid('assets/video/archivo.mp4', ancho, alto)        → vídeo en bucle

   El ancho y el alto solo sirven para saber la proporción (horizontal,
   vertical o cuadrada). Las imágenes optimizadas están en assets/img y los
   vídeos en assets/video (ver README para optimizar archivos nuevos).
   ========================================================================== */

const CARGO = 'https://freight.cargo.site';

const img = (src, w, h) => ({ type: 'image', src, w, h });
const vid = (src, w, h) => ({ type: 'video', src, w, h });

/* Imágenes que aún están en Cargo (proyecto Flores) */
const cargoImg = (path, w, h) => img(`${CARGO}/w/1600/i/${path}`, w, h);
const cargoVid = (path, w, h) => vid(`${CARGO}/m/${path}`, w, h);

/* Miniatura ligera: en Cargo pide un tamaño menor; las locales están en assets/thumbs (700 px) */
const thumb = (media, width = 800) => (media.src.startsWith('assets/img/')
  ? media.src.replace('assets/img/', 'assets/thumbs/')
  : media.src.replace('/w/1600/', `/w/${width}/`));

/* --------------------------------------------------------------------------
   SOBRE MÍ
   -------------------------------------------------------------------------- */
const PROFILE = {
  name: 'Ayla Cano López',
  alias: 'ayleeeeta',
  email: 'aylacanolopez@gmail.com',
  instagram: 'https://www.instagram.com/ayleeeeta/',
  city: 'Madrid',
  // Fotos de perfil: se van alternando como un stop-motion
  photos: [
    'assets/img/perfil/foto-1.jpg',
    'assets/img/perfil/foto-2.jpg',
    'assets/img/perfil/foto-3.jpg',
  ],
  cv: {
    Estudios: [
      ['2022—2026', 'Grado en Diseño Gráfico y Multimedia', 'UDIT, Madrid'],
      ['2020—2022', 'CFGS de Gráfica Interactiva', 'Escola d’Art Pau Gargallo, Badalona'],
      ['2018—2020', 'Bachillerato Artístico', 'Escola d’Art Pau Gargallo, Badalona'],
    ],
    Experiencia: [
      ['2025', 'Escola Miguel de Unamuno', 'Diseño del logotipo'],
      ['2025', 'Séducation', 'Gestión y comunicación de RRSS'],
      ['2024', 'Padawan Branding & Carolina Kairos', 'Prácticas en diseño gráfico, multimedia y RRSS'],
      ['2022', 'Festival Cruïlla, Barcelona', 'Voluntariado'],
      ['2021', 'AVV Bufalà, Badalona', 'Edición de vídeo y diseño interactivo'],
      ['2015', 'Libro ‘Rocker’ de Marco Antonio López Vilaplana', 'Fotografía · 66 RPM Edicions'],
    ],
    Premios: [
      ['2024', 'Inspirathon UDIT', 'Diseño de merchandising'],
      ['2023', 'Inspirathon Hotel Thompson', 'Diseño de amenities'],
      ['2022', 'Talent Creatiu i Empresa', 'App y vídeo educativo'],
    ],
  },
  tools: ['Illustrator', 'Photoshop', 'After Effects', 'Premiere', 'InDesign', 'Figma',
          'Cinema 4D', 'Procreate', 'Lightroom', 'Firefly', 'Adobe XD'],
  languages: ['Catalán (nativo)', 'Castellano (nativo)', 'Inglés (básico)'],
};

/* Fotos de pequeña (en "Sobre mí") */
const BETA = [
  { src: 'assets/img/sobre-mi/peque-1.jpg', w: 699, h: 1000, caption: 'Ayla 1.0 — trenzas y tatuaje falso' },
  { src: 'assets/img/sobre-mi/peque-2.jpg', w: 748, h: 1000, caption: 'Ayla 1.1 — vestuario de época' },
  { src: 'assets/img/sobre-mi/peque-3.jpg', w: 748, h: 1000, caption: 'Ayla 1.2 — ya venía con fósiles de serie' },
];

/* Ayleeeeta, mi alter ego (va en "Sobre mí")
   · flip(...) = varias imágenes del mismo diseño que se alternan como un stop-motion */
const flip = (frames, w, h) => ({ type: 'flipbook', frames: frames.map((src) => img(src, w, h)), src: frames[0], w, h });

const ALTER_EGO = {
  title: 'Ayleeeeta',
  text: 'Mi alter ego: la versión de mí que dice lo que yo me callo. Empezó en un diario semanal y ya tiene pegatinas, calendario y animaciones propias.',
  media: [
    vid('assets/video/ayleeeeta.mp4', 540, 540),
    img('assets/img/ayleeeeta/pegatina-rosa.jpg', 1400, 1400),
    flip([
      'assets/img/ayleeeeta/calendario-1.jpg',
      'assets/img/ayleeeeta/calendario-2.jpg',
      'assets/img/ayleeeeta/calendario-3.jpg',
      'assets/img/ayleeeeta/calendario-4.jpg',
    ], 1011, 1600),
    img('assets/img/ayleeeeta/pegatinas.jpg', 1800, 1014),
    vid('assets/video/ayleeeeta-2.mp4', 720, 720),
    img('assets/img/ayleeeeta/pegatina-gris.jpg', 1400, 1400),
  ],
};

/* --------------------------------------------------------------------------
   DISCIPLINAS (las claves se usan en "tags" de cada proyecto)
   -------------------------------------------------------------------------- */
const FILTERS = {
  ilustracion: 'Ilustración',
  motion: 'Motion',
  branding: 'Branding',
  editorial: 'Editorial',
  packaging: 'Packaging',
  rrss: 'Redes sociales',
  foto: 'Fotografía',
};

/* --------------------------------------------------------------------------
   PROYECTOS (en el orden en que salen en el carrusel)
   -------------------------------------------------------------------------- */
const PROJECTS = [
  {
    slug: 'estrat',
    title: 'Estrat',
    kicker: 'Rebranding del Museu Paleontològic de Sant Mateu',
    tags: ['branding', 'editorial'],
    year: '2026',
    role: 'Trabajo de fin de grado',
    cover: img('assets/img/estrat/foto-01.jpg', 1800, 1200),
    blocks: [
      {
        text: [
          'La idea de este proyecto nació de un sentimiento concreto: ver cómo el museo paleontológico de mi abuelo iba perdiendo vida con el tiempo. Crecí viendo lo importante que había sido para él y cómo la búsqueda de fósiles lo mantenía ilusionado, activo y conectado con su entorno.',
          'Aquellas excursiones en familia eran mucho más que una actividad: eran una forma de aprender, de explorar la naturaleza y de descubrir historias que existían mucho antes que nosotros. Me quedé con lo que me transmitieron: preservar la cultura, entender nuestras raíces y mirar el pasado como una pieza esencial del presente.',
          'Sentí que el museo tenía un valor que no podía quedarse apagado y que, desde el diseño, podía devolverle una identidad más fuerte, actual y emocional.',
        ],
        // flip([...]) = fotos del mismo objeto que se alternan como un stop-motion
        media: [
          vid('assets/video/estrat-spot.mp4', 720, 1280),
          img('assets/img/estrat/logo.png', 1600, 805),
          flip(['assets/img/estrat/foto-02.jpg', 'assets/img/estrat/foto-05.jpg', 'assets/img/estrat/foto-03.jpg'], 1200, 1800), // la caja abriéndose
          flip(['assets/img/estrat/foto-19.jpg', 'assets/img/estrat/foto-20.jpg'], 1800, 1311), // el kit completo
          flip(['assets/img/estrat/foto-06.jpg', 'assets/img/estrat/foto-07.jpg', 'assets/img/estrat/foto-08.jpg', 'assets/img/estrat/foto-04.jpg'], 1800, 1200), // papelería
          flip(['assets/img/estrat/foto-12.jpg', 'assets/img/estrat/foto-13.jpg'], 1200, 1800), // caja de cartón
          flip(['assets/img/estrat/foto-10.jpg', 'assets/img/estrat/foto-11.jpg', 'assets/img/estrat/foto-14.jpg'], 1800, 1200), // cajitas y fósiles
          flip(['assets/img/estrat/foto-09.jpg', 'assets/img/estrat/foto-15.jpg', 'assets/img/estrat/foto-18.jpg'], 1200, 1800), // cuaderno y kit
          flip(['assets/img/estrat/foto-16.jpg', 'assets/img/estrat/foto-17.jpg'], 1800, 1200), // el libro
          img('assets/img/estrat/carteles.jpg', 1800, 1194),
        ],
      },
      {
        title: 'Web',
        subtitle: 'Archivo del tiempo y museo portátil',
        media: [
          img('assets/img/estrat/web-inicio.png', 727, 1440),
          img('assets/img/estrat/web-archivo.png', 946, 1440),
          img('assets/img/estrat/web-museo.png', 1440, 1399),
          img('assets/img/estrat/web-contacto.png', 1440, 1399),
        ],
      },
    ],
  },
  {
    slug: 'sex-and-the-city',
    title: 'Sex & The City',
    kicker: 'Secuencia de créditos',
    tags: ['motion', 'ilustracion'],
    year: '2025',
    cover: vid('assets/video/sex-and-the-city.mp4', 1280, 720),
    // En la portada se ve esta foto (205F152C…-3) y no el vídeo
    cardVideo: false,
    poster: img('assets/img/sex-and-the-city/frame-2.png', 1536, 1024),
    blocks: [
      {
        text: [
          'Mi versión de los créditos de ‘Sex and the City’: más punk, rosa a tope y con ilustraciones mías.',
          'Un escenario en forma de L recorre Nueva York y va presentando a cada protagonista, con textos que no paran de moverse.',
        ],
        // layout: 'strip' = las imágenes en fila, como una tira de película
        layout: 'strip',
        media: [
          img('assets/img/sex-and-the-city/frame-1.png', 1536, 1024),
          img('assets/img/sex-and-the-city/frame-2.png', 1536, 1024),
          img('assets/img/sex-and-the-city/frame-3.png', 1536, 1024),
          img('assets/img/sex-and-the-city/frame-4.png', 1536, 1024),
        ],
      },
    ],
  },
  {
    slug: 'casicasi',
    title: 'CasiCasi',
    kicker: 'Creación de una revista',
    tags: ['editorial'],
    year: '2025',
    // Primera foto del proyecto, recortada en horizontal para que se vea grande
    cover: img('assets/img/casicasi/portada-h.jpg', 1066, 710),
    // Imagen de la portada de la web (_MG_9893), apoyada abajo y cortada por arriba
    card: img('assets/img/casicasi/foto-7.jpg', 1200, 1800),
    cardPosition: '50% 100%',
    blocks: [
      {
        credit: 'En colaboración con Eva Sahuquillo, Laura Lozano y Sara Sánchez',
        text: [
          'Una revista para lo que se queda a medias: bocetos, procesos y proyectos que nunca salieron a la luz, porque a veces inspiran más que el resultado final.',
          'La idea es crear una comunidad donde artistas y diseñadores compartan lo que tienen sin terminar.',
        ],
        media: [
          img('assets/img/casicasi/foto-2.jpg', 1199, 1800),
          vid('assets/video/casicasi.mp4', 720, 1280),
          img('assets/img/casicasi/foto-3.jpg', 1200, 1800),
          img('assets/img/casicasi/foto-4.jpg', 1800, 1574),
          img('assets/img/casicasi/foto-5.jpg', 1800, 1574),
          img('assets/img/casicasi/foto-6.jpg', 1800, 1574),
          // crop: recorta la foto (aquí, quita un trozo de arriba)
          { ...img('assets/img/casicasi/foto-7.jpg', 1200, 1800), crop: { ratio: '4 / 5', pos: '50% 100%' } },
        ],
      },
    ],
  },
  {
    slug: 'rocko',
    title: 'Rocko +',
    kicker: 'Autopromoción de un canal de televisión',
    tags: ['motion', 'branding'],
    year: '2025',
    // Lo primero que se ve al entrar: el spot del canal
    cover: vid('assets/video/rocko-spot.mp4', 960, 540),
    // En la portada de la web, el logo quieto (no la animación)
    cardVideo: false,
    poster: img('assets/img/rocko/logo-1.png', 843, 596),
    blocks: [
      {
        text: [
          'Un canal de televisión 24 horas dedicado al rock: conciertos, entrevistas, documentales y nuevos grupos.',
          'Rocko +, el canal que no se calla… ni se callará.',
        ],
        media: [
          // silent: el vídeo no tiene audio, así que no lleva el botón de sonido
          { ...vid('assets/video/rocko-logo.mp4', 842, 596), silent: true },
          img('assets/img/rocko/logo-1.png', 843, 596),
          img('assets/img/rocko/logo-2.png', 843, 596),
        ],
      },
    ],
  },
  {
    slug: 'el-clan',
    title: 'Los Hijos de la Tierra',
    kicker: 'Edición especial de la saga',
    tags: ['editorial', 'ilustracion'],
    year: '2024',
    // Foto principal: el merch, que enseña los tres libros a la vez
    cover: img('assets/img/el-clan/pagina-7.jpg', 1600, 1066),
    // Los stop-motion de este proyecto se mueven solos (sin pasar el ratón)
    flipAuto: true,
    // En la portada de la web: el primer libro (El clan del oso cavernario)
    card: img('assets/img/el-clan/pagina-1.jpg', 1600, 1066),
    blocks: [
      {
        text: [
          'Una edición especial con un toque prehistórico: sobrecubiertas limpias y geométricas que esconden tapas ilustradas con motivos de pinturas rupestres.',
          'Y para acompañar, merch: tote bags, marcapáginas, pegatinas y un mini mapa para no perderse.',
        ],
        // layout: 'stack' = una debajo de otra, a todo el ancho (más grandes)
        layout: 'stack',
        // Cada libro: de la sobrecubierta a la tapa (stop-motion al pasar el ratón)
        media: [
          flip(['assets/img/el-clan/pagina-1.jpg', 'assets/img/el-clan/pagina-5.jpg'], 1600, 1066), // El clan del oso cavernario
          flip(['assets/img/el-clan/pagina-2.jpg', 'assets/img/el-clan/pagina-3.jpg'], 1600, 1066), // El valle de los caballos
          flip(['assets/img/el-clan/pagina-4.jpg', 'assets/img/el-clan/pagina-6.jpg'], 1600, 1066), // Los cazadores de mamuts
        ],
      },
    ],
  },
  {
    slug: 'flores',
    title: 'Flores',
    kicker: 'Vídeo experimental MixMedia',
    tags: ['motion'],
    year: '2024',
    cover: vid('assets/video/flores.mp4', 1280, 720),
    // En la portada de la web: el fotograma del paso de cebra (con el semáforo)
    cardVideo: false,
    card: img('assets/img/flores/portada.jpg', 576, 720),
    blocks: [
      {
        text: [
          'Fotografías frame a frame retocadas a mano: un vídeo sobre todo lo que puede significar una flor, del amor a la pérdida.',
          'El mismo elemento, mil lecturas distintas.',
        ],
        media: [
          img('assets/img/flores/fotograma-1.jpg', 1273, 1800),
          img('assets/img/flores/fotograma-2.jpg', 1273, 1800),
          img('assets/img/flores/fotograma-3.jpg', 1273, 1800),
          img('assets/img/flores/fotograma-4.jpg', 1273, 1800),
        ],
      },
    ],
  },
  {
    slug: 'pecado',
    title: 'Pecado',
    kicker: 'Packaging para una línea de cervezas',
    tags: ['packaging', 'ilustracion'],
    year: '',
    cover: img('assets/img/pecado/lujuria.jpg', 1050, 1400),
    blocks: [
      {
        // ✏️ Escribe aquí la explicación del proyecto
        text: [
          'Una línea de cervezas inspirada en los pecados capitales: cada etiqueta tiene su propio diablillo ilustrado. Lujuria, avaricia y soberbia.',
        ],
        media: [
          img('assets/img/pecado/lujuria-2.jpg', 1050, 1400),
          img('assets/img/pecado/avaricia.jpg', 1050, 1400),
          img('assets/img/pecado/avaricia-2.jpg', 1050, 1400),
          img('assets/img/pecado/soberbia.jpg', 1050, 1400),
          img('assets/img/pecado/soberbia-2.jpg', 1050, 1400),
        ],
      },
    ],
  },
  {
    slug: 'rrss',
    title: 'RRSS',
    kicker: 'Vídeos para redes sociales',
    tags: ['motion', 'rrss'],
    year: '2025',
    cover: vid('assets/video/rrss-impostor.mp4', 608, 1080),
    blocks: [
      {
        // ✏️ Escribe aquí para quién eran los vídeos y qué hiciste
        text: [
          'Guion, edición y animación de vídeos verticales para redes sociales.',
        ],
        media: [
          vid('assets/video/rrss-vender.mp4', 608, 1080),
          vid('assets/video/rrss-error.mp4', 608, 1080),
          vid('assets/video/rrss-branding.mp4', 608, 1080),
          vid('assets/video/rrss-trucos.mp4', 608, 1080),
        ],
      },
    ],
  },
];

/* --------------------------------------------------------------------------
   PEGATINAS ARRASTRABLES (caja de abajo a la izquierda en la portada)
   La pegatina de ayleeeeta (sin el borde blanco) repetida varias veces.
   · size: ancho relativo a la caja (0.3 = 30 %)
   -------------------------------------------------------------------------- */
const STICKER = { src: 'assets/img/ayleeeeta/pegatina-recortada.jpg', w: 469, h: 588 };
// Todas del mismo tamaño (0.26 = 26 % del ancho de la caja); cambia el 6 para poner más o menos
const STICKERS = Array.from({ length: 6 }, () => ({ ...STICKER, size: 0.26, shape: 'rect' }));
