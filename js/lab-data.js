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
    title: 'Fanzine HIMYM',
    kicker: 'How I Met Your Mother',
    year: '2024',
    tags: ['editorial', 'ilustracion'],
    media: [
      img('assets/img/archivo/himym-1.jpg', 1400, 1400),
      img('assets/img/archivo/himym-2.jpg', 1400, 1400),
      img('assets/img/archivo/himym-3.jpg', 1400, 1400),
      img('assets/img/archivo/himym-4.jpg', 1400, 1400),
      img('assets/img/archivo/himym-5.jpg', 1400, 1400),
      img('assets/img/archivo/himym-6.jpg', 1400, 1400),
      img('assets/img/archivo/himym-7.jpg', 1400, 1400),
      img('assets/img/archivo/himym-8.jpg', 1400, 1400),
      img('assets/img/archivo/himym-9.jpg', 1400, 1400),
      img('assets/img/archivo/himym-10.jpg', 1400, 1400),
      img('assets/img/archivo/himym-11.jpg', 1400, 1400),
      img('assets/img/archivo/himym-12.jpg', 1400, 1400),
    ],
  },
  {
    title: 'Campaña para Starbucks',
    kicker: 'San Valentín, Halloween y Navidad',
    year: '',
    tags: ['ilustracion'],
    media: [
      img('assets/img/archivo/starbucks-1.jpg', 1400, 1400),
      img('assets/img/archivo/starbucks-2.jpg', 1400, 1400),
      img('assets/img/archivo/starbucks-3.jpg', 1400, 1400),
    ],
  },
  {
    title: 'Chupa Chups',
    kicker: 'Dirección de arte para una campaña',
    year: '2026',
    tags: ['ilustracion'],
    media: [
      img('assets/img/archivo/chupachups-1.jpg', 989, 1400),
      img('assets/img/archivo/chupachups-2.jpg', 989, 1400),
      img('assets/img/archivo/chupachups-3.jpg', 989, 1400),
      img('assets/img/archivo/chupachups-4.jpg', 989, 1400),
      img('assets/img/archivo/chupachups-5.jpg', 989, 1400),
      img('assets/img/archivo/chupachups-6.jpg', 989, 1400),
    ],
  },
  {
    title: 'La Roja',
    kicker: 'Marca y campaña de copas menstruales',
    year: '2025',
    tags: ['branding', 'rrss'],
    media: [
      img('assets/img/archivo/la-roja-1.jpg', 990, 1400),
      img('assets/img/archivo/la-roja-2.jpg', 990, 1400),
      img('assets/img/archivo/la-roja-3.jpg', 1000, 1000),
      img('assets/img/archivo/la-roja-4.png', 1000, 1000),
      img('assets/img/archivo/la-roja-5.jpg', 1000, 1000),
      img('assets/img/archivo/la-roja-6.png', 1000, 708),
      img('assets/img/archivo/la-roja-7.png', 1000, 707),
      img('assets/img/archivo/la-roja-8.png', 1000, 708),
      img('assets/img/archivo/la-roja-9.png', 1000, 707),
    ],
  },
  {
    title: 'Vi Novell Masroig',
    kicker: 'Concurso de etiqueta y cartel',
    year: '2025',
    tags: ['packaging', 'ilustracion'],
    media: [
      img('assets/img/archivo/vi-novell-1.png', 749, 1000),
      img('assets/img/archivo/vi-novell-2.png', 750, 1000),
      img('assets/img/archivo/vi-novell-3.png', 750, 1000),
      img('assets/img/archivo/vi-novell-4.png', 750, 1000),
      img('assets/img/archivo/vi-novell-5.jpg', 1120, 1400),
      img('assets/img/archivo/vi-novell-6.jpg', 1120, 1400),
      img('assets/img/archivo/vi-novell-7.jpg', 1400, 934),
    ],
  },
  {
    title: '36 Days of Type',
    kicker: 'Letras en 3D',
    year: '2024',
    tags: ['motion'],
    media: [
      img('assets/img/archivo/36-days-1.jpg', 1205, 1400),
      img('assets/img/archivo/36-days-2.jpg', 1400, 795),
      img('assets/img/archivo/36-days-3.jpg', 1351, 1400),
    ],
  },
  {
    title: 'Merchandising para UDIT',
    kicker: 'Premio Inspirathon',
    year: '2024',
    tags: ['branding', 'packaging'],
    media: [
      img('assets/img/archivo/inspirathon-udit-1.jpg', 1400, 1400),
      img('assets/img/archivo/inspirathon-udit-2.jpg', 1400, 1400),
      img('assets/img/archivo/inspirathon-udit-3.jpg', 1400, 1400),
      img('assets/img/archivo/inspirathon-udit-4.jpg', 1400, 1400),
    ],
  },
  {
    title: 'Alicia',
    kicker: 'Edición especial',
    year: '2024',
    tags: ['editorial', 'ilustracion'],
    media: [
      img('assets/img/archivo/alicia-1.jpg', 1400, 1050),
      img('assets/img/archivo/alicia-2.jpg', 1400, 1050),
    ],
  },
  {
    title: 'Portadas de libro',
    kicker: 'Ilustración editorial',
    year: '',
    tags: ['editorial', 'ilustracion'],
    media: [
      img('assets/img/archivo/portadas-1.jpg', 1000, 750),
      img('assets/img/archivo/portadas-2.jpg', 1000, 750),
      img('assets/img/archivo/portadas-3.jpg', 1000, 750),
    ],
  },
  {
    title: 'Editorial',
    kicker: 'Revistas y catálogos',
    year: '',
    tags: ['editorial'],
    media: [
      img('assets/img/archivo/editorial-1.jpg', 1000, 669),
      img('assets/img/archivo/editorial-2.jpg', 1000, 669),
      img('assets/img/archivo/editorial-3.jpg', 1400, 933),
      img('assets/img/archivo/editorial-4.jpg', 1400, 933),
    ],
  },
  {
    title: 'Carteles',
    kicker: 'Cartelería en la calle',
    year: '',
    tags: ['ilustracion'],
    media: [
      img('assets/img/archivo/carteles-1.jpg', 1400, 921),
      img('assets/img/archivo/carteles-2.jpg', 1000, 750),
    ],
  },
  {
    title: 'Ilustraciones',
    kicker: 'Personajes y cosas mías',
    year: '',
    tags: ['ilustracion'],
    media: [
      img('assets/img/archivo/ilustraciones-1.jpg', 1000, 1000),
      img('assets/img/archivo/ilustraciones-2.jpg', 1000, 1000),
      img('assets/img/archivo/ilustraciones-3.jpg', 1000, 750),
    ],
  },
  {
    title: 'Packaging',
    kicker: 'Cajas, expositor y mailing',
    year: '',
    tags: ['packaging'],
    media: [
      img('assets/img/archivo/packaging-1.jpg', 1000, 700),
      img('assets/img/archivo/packaging-2.jpg', 1000, 700),
      img('assets/img/archivo/packaging-3.jpg', 1000, 700),
      img('assets/img/archivo/packaging-4.jpg', 1400, 1050),
      img('assets/img/archivo/packaging-5.jpg', 1400, 1093),
    ],
  },
  {
    title: 'Tote bags',
    kicker: 'Merchandising',
    year: '',
    tags: ['branding'],
    media: [
      img('assets/img/archivo/tote-1.png', 1000, 666),
      img('assets/img/archivo/tote-2.png', 1000, 666),
      img('assets/img/archivo/tote-3.png', 1000, 666),
      img('assets/img/archivo/tote-4.png', 1000, 750),
    ],
  },
  {
    title: 'CasiCasi',
    kicker: 'Fotografía y anuncio',
    year: '2025',
    tags: ['foto'],
    media: [
      img('assets/img/archivo/casicasi-1.jpg', 1400, 933),
      img('assets/img/archivo/casicasi-2.jpg', 910, 1400),
    ],
  },
  {
    title: 'Séducation',
    kicker: 'Identidad para Instagram',
    year: '2025',
    tags: ['branding', 'rrss'],
    media: [
      img('assets/img/archivo/seducation-1.jpg', 1400, 1400),
      img('assets/img/archivo/seducation-2.jpg', 787, 1400),
      img('assets/img/archivo/seducation-3.jpg', 1000, 1000),
    ],
  },
  {
    title: 'Redes sociales',
    kicker: 'Feed de Instagram',
    year: '',
    tags: ['rrss'],
    media: [
      img('assets/img/archivo/rrss-1.png', 1000, 727),
    ],
  },
  {
    title: 'Luxury fonts',
    kicker: 'Reels para Carolina Kairos',
    year: '2024',
    tags: ['motion', 'rrss'],
    media: [
      vid('assets/video/archivo-luxury-fonts-1.mp4', 540, 960),
      vid('assets/video/archivo-luxury-fonts-2.mp4', 540, 960),
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
];
