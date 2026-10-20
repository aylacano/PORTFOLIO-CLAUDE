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

/* Ayleeeeta, mi alter ego (va en "Sobre mí") */
const ALTER_EGO = {
  title: 'Ayleeeeta',
  text: 'Mi alter ego artístico: un icono que muestra mi actitud, mi estilo y mi manera de ver la vida. Nació de unas ilustraciones para un diario semanal y ahora vive en pegatinas, calendarios y animaciones.',
  media: [
    vid('assets/video/ayleeeeta.mp4', 540, 540),
    img('assets/img/ayleeeeta/pegatina-rosa.jpg', 1400, 1400),
    img('assets/img/ayleeeeta/calendario-2.jpg', 1011, 1600),
    img('assets/img/ayleeeeta/pegatinas.jpg', 1800, 1014),
    img('assets/img/ayleeeeta/pegatina-gris.jpg', 1400, 1400),
    img('assets/img/ayleeeeta/calendario-1.jpg', 1010, 1600),
    img('assets/img/ayleeeeta/calendario-3.jpg', 1011, 1600),
    img('assets/img/ayleeeeta/calendario-4.jpg', 1010, 1600),
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
        media: [
          vid('assets/video/estrat-spot.mp4', 720, 1280),
          img('assets/img/estrat/logo.png', 1600, 805),
          img('assets/img/estrat/foto-02.jpg', 1200, 1800),
          img('assets/img/estrat/foto-03.jpg', 1200, 1800),
          img('assets/img/estrat/foto-04.jpg', 1800, 1200),
          img('assets/img/estrat/foto-05.jpg', 1200, 1800),
          img('assets/img/estrat/foto-09.jpg', 1200, 1800),
          img('assets/img/estrat/foto-06.jpg', 1800, 1200),
          img('assets/img/estrat/foto-12.jpg', 1200, 1800),
          img('assets/img/estrat/foto-13.jpg', 1200, 1800),
          img('assets/img/estrat/foto-07.jpg', 1800, 1200),
          img('assets/img/estrat/foto-15.jpg', 1200, 1800),
          img('assets/img/estrat/foto-18.jpg', 1200, 1800),
          img('assets/img/estrat/foto-08.jpg', 1800, 1200),
          img('assets/img/estrat/foto-10.jpg', 1800, 1200),
          img('assets/img/estrat/foto-11.jpg', 1800, 1200),
          img('assets/img/estrat/foto-14.jpg', 1800, 1200),
          img('assets/img/estrat/foto-16.jpg', 1800, 1200),
          img('assets/img/estrat/foto-17.jpg', 1800, 1200),
          img('assets/img/estrat/foto-19.jpg', 1800, 1200),
          img('assets/img/estrat/foto-20.jpg', 1800, 1311),
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
    year: '',
    cover: vid('assets/video/sex-and-the-city.mp4', 1280, 720),
    poster: img('assets/img/sex-and-the-city/frame-1.png', 1536, 1024),
    blocks: [
      {
        text: [
          'Un giro moderno y algo más punk para los créditos de ‘Sex and the City’: elementos gráficos dinámicos y una paleta rosa vibrante, fiel a la estética original de la serie.',
          'La secuencia se desarrolla en un escenario en forma de L que representa Nueva York. El recorrido fluye por distintas áreas mostrando a cada protagonista, con ilustraciones originales para darle un toque personal y rebelde.',
          'Los textos están en constante movimiento para mantener el ritmo punk; las transiciones rápidas y el espacio tridimensional subrayan la vida cambiante de la ciudad.',
        ],
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
    year: '',
    cover: img('assets/img/casicasi/foto-1.jpg', 1199, 1800),
    blocks: [
      {
        credit: 'En colaboración con Eva Sahuquillo, Laura Lozano y Sara Sánchez',
        text: [
          'Nuestro concepto nace de esas obras inacabadas que nunca salieron a la luz. Queremos que la revista sea un lugar donde disfrutar de la belleza del proceso creativo.',
          'A veces hay mucha presión para que un proyecto salga perfecto, pero hay procesos que, aunque no lleguen a terminarse, son completos en sí mismos y hasta más inspiradores.',
          'El objetivo es crear una comunidad de diseñadores y artistas donde compartir y descubrir proyectos inacabados: ver procesos, inspirarse, sentirse identificado y conocer a otros creadores.',
        ],
        media: [
          img('assets/img/casicasi/foto-2.jpg', 1199, 1800),
          vid('assets/video/casicasi.mp4', 720, 1280),
          img('assets/img/casicasi/foto-3.jpg', 1200, 1800),
          img('assets/img/casicasi/foto-4.jpg', 1800, 1574),
          img('assets/img/casicasi/foto-5.jpg', 1800, 1574),
          img('assets/img/casicasi/foto-6.jpg', 1800, 1574),
          img('assets/img/casicasi/foto-7.jpg', 1800, 1200),
        ],
      },
    ],
  },
  {
    slug: 'rocko',
    title: 'Rocko +',
    kicker: 'Autopromoción de un canal de televisión',
    tags: ['motion', 'branding'],
    year: '',
    cover: vid('assets/video/rocko-logo.mp4', 842, 596),
    poster: img('assets/img/rocko/logo-1.png', 843, 596),
    blocks: [
      {
        text: [
          'Un canal de televisión dedicado al rock: conciertos, entrevistas, nuevos artistas, documentales y películas sobre la vida de los rockeros. Desde Extremoduro, Platero y Tú o Marea hasta Guns N’ Roses o Patti Smith.',
          '¡24 horas de ruido del bueno! Rocko +, el canal que no se calla… ni se callará.',
        ],
        media: [
          vid('assets/video/rocko-spot.mp4', 1280, 720),
          img('assets/img/rocko/logo-1.png', 843, 596),
          img('assets/img/rocko/logo-2.png', 843, 596),
        ],
      },
    ],
  },
  {
    slug: 'el-clan',
    title: 'El clan del oso cavernario',
    kicker: 'Edición especial de la saga Los Hijos de la Tierra',
    tags: ['editorial', 'ilustracion'],
    year: '2024',
    cover: img('assets/img/el-clan/pagina-1.jpg', 1600, 1066),
    blocks: [
      {
        text: [
          'Un toque prehistórico y mágico: una camisa con un estilo limpio y geométrico que contrasta con la portada, donde ilustré elementos inspirados en las pinturas rupestres rodeando al animal protagonista.',
          'Además, una pequeña línea de merch con tote bags, marcapáginas, pegatinas y hasta un mini mapa para seguir la historia.',
        ],
        media: [
          img('assets/img/el-clan/pagina-2.jpg', 1600, 1066),
          img('assets/img/el-clan/pagina-3.jpg', 1600, 1066),
          img('assets/img/el-clan/pagina-4.jpg', 1600, 1066),
          img('assets/img/el-clan/pagina-5.jpg', 1600, 1066),
          img('assets/img/el-clan/pagina-6.jpg', 1600, 1066),
          img('assets/img/el-clan/pagina-7.jpg', 1600, 1066),
        ],
      },
    ],
  },
  {
    slug: 'flores',
    title: 'Flores',
    kicker: 'Vídeo experimental MixMedia',
    tags: ['motion'],
    year: '',
    cover: cargoVid('H2468110961745735590090998471052/Compo-efectos.MP4', 1280, 720),
    poster: cargoImg('B2468116223052293317234472180108/Fotogramas_Mesa_de_trabajo_1_copia-06.png', 2482, 3508),
    blocks: [
      {
        text: [
          'Vídeo experimental con la técnica MixMedia: fotografías frame a frame editadas a mano con herramientas manuales.',
          'Las flores pueden significar amor, declaración, desamor, perdón, e incluso muerte, pérdida y tristeza. Quería representar cómo un mismo elemento puede variar tanto su significado.',
        ],
        media: [
          cargoImg('B2468116223052293317234472180108/Fotogramas_Mesa_de_trabajo_1_copia-06.png', 2482, 3508),
          cargoImg('V2468116223033846573160762628492/Fotogramas_Mesa_de_trabajo_1_copia-04.png', 2481, 3508),
          cargoImg('L2468116222738698667981409802636/Fotogramas_Mesa_de_trabajo_1_copia-03.png', 2481, 3508),
          cargoImg('R2468116223070740061308181731724/Fotogramas_Mesa_de_trabajo_1_copia-12.png', 2482, 3508),
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
