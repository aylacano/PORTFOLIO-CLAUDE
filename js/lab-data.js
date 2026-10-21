/* ==========================================================================
   LAB — todos mis proyectos, también los que no tienen página propia
   --------------------------------------------------------------------------
   Cada grupo es un proyecto. Las piezas se reparten por un lienzo infinito
   que se explora arrastrando o con el scroll.
   Para añadir algo nuevo, copia un grupo y cambia los datos.
   ========================================================================== */

const LAB = [
  // Proyectos con página propia
  { project: 'estrat', count: 4 },
  { project: 'sex-and-the-city', count: 3 },
  { project: 'casicasi', count: 3 },
  { project: 'rocko', count: 3 },
  { project: 'el-clan', count: 3 },
  { project: 'flores', count: 3 },
  { project: 'pecado', count: 3 },
  { project: 'rrss', count: 2 },

  // Otros proyectos (sus imágenes están en assets/img/archivo)
  {
    title: 'MU',
    kicker: 'Logotipo para la Escola Miguel de Unamuno',
    year: '2025',
    tags: ['branding'],
    media: [
      img('assets/img/archivo/mu-1.png', 1000, 461),
      img('assets/img/archivo/mu-2.png', 1000, 701),
      img('assets/img/archivo/mu-3.png', 1000, 1000),
      img('assets/img/archivo/mu-4.png', 927, 1000),
    ],
  },
  {
    title: 'La Roja',
    kicker: 'Marca de copas menstruales',
    year: '',
    tags: ['branding', 'packaging'],
    media: [
      img('assets/img/archivo/la-roja-1.png', 1000, 708),
      img('assets/img/archivo/la-roja-2.png', 1000, 706),
      img('assets/img/archivo/la-roja-3.jpg', 1400, 1400),
      img('assets/img/archivo/la-roja-4.jpg', 1400, 787),
    ],
  },
  {
    title: 'Xiu-Xiu',
    kicker: 'App de prevención de riesgos para niños',
    year: '2022',
    tags: ['branding', 'ilustracion'],
    media: [
      img('assets/img/archivo/xiu-xiu-1.png', 1000, 1000),
      img('assets/img/archivo/xiu-xiu-2.png', 1000, 960),
      img('assets/img/archivo/xiu-xiu-3.jpg', 1400, 1400),
      img('assets/img/archivo/xiu-xiu-4.png', 950, 1000),
    ],
  },
  {
    title: 'Cuentos infantiles a dos tintas',
    kicker: 'Pinocho, Caperucita Roja y El sastrecillo valiente',
    year: '',
    tags: ['ilustracion'],
    media: [
      img('assets/img/archivo/cuentos-infantiles-a-1.jpg', 1140, 1400),
      img('assets/img/archivo/cuentos-infantiles-a-2.jpg', 1140, 1400),
      img('assets/img/archivo/cuentos-infantiles-a-3.jpg', 1140, 1400),
    ],
  },
  {
    title: 'Campaña para Starbucks',
    kicker: 'San Valentín, Halloween y Navidad',
    year: '',
    tags: ['ilustracion'],
    media: [
      img('assets/img/archivo/campana-para-starbucks-1.jpg', 990, 1400),
      img('assets/img/archivo/campana-para-starbucks-2.jpg', 990, 1400),
      img('assets/img/archivo/campana-para-starbucks-3.jpg', 990, 1400),
    ],
  },
  {
    title: 'Cómic La Llamada',
    kicker: 'Cómic',
    year: '',
    tags: ['ilustracion', 'editorial'],
    media: [
      img('assets/img/archivo/comic-la-llamada-1.png', 807, 1000),
      img('assets/img/archivo/comic-la-llamada-2.png', 1000, 715),
    ],
  },
  {
    title: 'Personajes y storyboard',
    kicker: 'Batido de gusanos y confesiones de amor',
    year: '',
    tags: ['ilustracion'],
    media: [
      img('assets/img/archivo/personajes-y-storyboard-1.jpg', 1400, 1400),
      img('assets/img/archivo/personajes-y-storyboard-2.jpg', 1400, 1400),
      img('assets/img/archivo/personajes-y-storyboard-3.jpg', 1400, 1400),
      img('assets/img/archivo/personajes-y-storyboard-4.jpg', 986, 1400),
    ],
  },
  {
    title: 'Fanzine HIMYM',
    kicker: 'How I Met Your Mother',
    year: '2024',
    tags: ['editorial', 'ilustracion'],
    media: [
      img('assets/img/archivo/fanzine-himym-1.jpg', 1400, 1400),
      img('assets/img/archivo/fanzine-himym-2.jpg', 1400, 1400),
      img('assets/img/archivo/fanzine-himym-3.jpg', 1400, 1400),
      img('assets/img/archivo/fanzine-himym-4.jpg', 1400, 1400),
    ],
  },
  {
    title: 'Alicia',
    kicker: 'Edición especial',
    year: '2024',
    tags: ['editorial', 'ilustracion'],
    media: [
      img('assets/img/archivo/alicia-1.png', 944, 1000),
      img('assets/img/archivo/alicia-2.jpg', 1187, 1400),
      img('assets/img/archivo/alicia-3.jpg', 1185, 1400),
      img('assets/img/archivo/alicia-4.png', 855, 1000),
    ],
  },
  {
    title: 'Cata La Lata',
    kicker: 'Packaging y campaña',
    year: '',
    tags: ['packaging', 'branding'],
    media: [
      img('assets/img/archivo/cata-la-lata-1.jpg', 1400, 980),
      img('assets/img/archivo/cata-la-lata-2.jpg', 1400, 980),
      img('assets/img/archivo/cata-la-lata-3.jpg', 1400, 980),
      img('assets/img/archivo/cata-la-lata-4.jpg', 1400, 1050),
    ],
  },
  {
    title: 'Merchandising para UDIT',
    kicker: 'Premio Inspirathon',
    year: '2024',
    tags: ['branding', 'packaging'],
    media: [
      img('assets/img/archivo/merchandising-para-udit-1.png', 980, 1000),
      img('assets/img/archivo/merchandising-para-udit-2.png', 943, 1000),
      img('assets/img/archivo/merchandising-para-udit-3.png', 669, 1000),
    ],
  },
  {
    title: 'Amenities para el Hotel Thompson',
    kicker: 'Premio Inspirathon',
    year: '2023',
    tags: ['branding', 'packaging'],
    media: [
      img('assets/img/archivo/amenities-para-el-1.png', 1000, 999),
      img('assets/img/archivo/amenities-para-el-2.jpg', 1400, 1329),
      img('assets/img/archivo/amenities-para-el-3.png', 1000, 1000),
      img('assets/img/archivo/amenities-para-el-4.png', 995, 1000),
    ],
  },
  {
    title: 'Personitas',
    kicker: 'Fotografía de viaje',
    year: '',
    tags: ['foto'],
    media: [
      img('assets/img/archivo/personitas-1.jpg', 1050, 1400),
      img('assets/img/archivo/personitas-2.jpg', 1050, 1400),
      img('assets/img/archivo/personitas-3.jpg', 1050, 1400),
      img('assets/img/archivo/personitas-4.jpg', 1050, 1400),
      img('assets/img/archivo/personitas-5.jpg', 1049, 1400),
      img('assets/img/archivo/personitas-6.jpg', 1050, 1400),
    ],
  },

  // Ayleeeeta
  {
    title: 'Ayleeeeta',
    kicker: 'Mi alter ego: pegatinas, calendario y animación',
    year: '2026',
    tags: ['ilustracion', 'motion'],
    // Los calendarios (stop-motion) se reparten como piezas sueltas
    media: ALTER_EGO.media.flatMap((m) => (m.type === 'flipbook' ? m.frames : [m])),
  },
];
