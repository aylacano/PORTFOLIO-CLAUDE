/* ==========================================================================
   LAB — todos mis proyectos, también los que no tienen página propia
   --------------------------------------------------------------------------
   Cada grupo es un proyecto. Si tiene "link", al hacer clic se abre su página;
   si no, la imagen se abre en grande.
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

  // Otros proyectos (imágenes que siguen en Cargo)
  {
    title: 'MU',
    kicker: 'Logotipo para la Escola Miguel de Unamuno',
    year: '2025',
    tags: ['branding'],
    media: [
      cargoImg('G2468003232741898382235851479436/logo1-1-1.png', 2557, 1181),
      cargoImg('W2468003698946461357097349470604/Mask-group-2.png', 1729, 1213),
      cargoImg('X2468004871772002819476931664268/Mask-group-1.png', 843, 843),
      cargoImg('C2468004936022012428207299942796/Mask-group.png', 1259, 1358),
    ],
  },
  {
    title: 'La Roja',
    kicker: 'Marca de copas menstruales',
    year: '',
    tags: ['branding', 'packaging'],
    media: [
      cargoImg('U2466589208975016014109229898124/la-roja_Mesa-de-trabajo-1-copia-4.png', 843, 597),
      cargoImg('M2466589208901229037814391691660/la-roja_Mesa-de-trabajo-1-copia-3-14.png', 843, 596),
      cargoImg('I2466584666593415071648111319436/4bdcab42-a045-4c17-9ffc-df061b53afe6.jpg', 2048, 2048),
      cargoImg('B2466585487123038214322676750732/Sahuquillo.Eva_3.1_PMYMP_PRODUCTO--PUNTO-DE-VENTA-Y-PROMOCION.jpg', 1920, 1080),
    ],
  },
  {
    title: 'Xiu-Xiu',
    kicker: 'App de prevención de riesgos para niños',
    year: '2022',
    tags: ['branding', 'ilustracion'],
    media: [
      cargoImg('H2467996620838526554373846653324/Capa_1-1.png', 3868, 3868),
      cargoImg('V2467995943123596030358629833100/xiuxiu-1.png', 813, 781),
      cargoImg('S2468009210796697093363953228172/TCE-2.jpg', 1090, 1090),
      cargoImg('Y2466592988048793930542812158348/xiuxiu-1.png', 895, 942),
    ],
  },
  {
    title: 'Cuentos infantiles a dos tintas',
    kicker: 'Pinocho, Caperucita Roja y El sastrecillo valiente',
    year: '',
    tags: ['ilustracion'],
    media: [
      cargoImg('E2466826624880031129247194470796/Ilustracion_sin_titulo-1-2.jpg', 2598, 3189),
      cargoImg('D2466826675258089194547979934092/Ilustracion_sin_titulo-2-2.jpg', 2598, 3189),
      cargoImg('O2466826710583604095701771278732/Ilustracion_sin_titulo-4.jpg', 2598, 3189),
    ],
  },
  {
    title: 'Campaña para Starbucks',
    kicker: 'San Valentín, Halloween y Navidad',
    year: '',
    tags: ['ilustracion'],
    media: [
      cargoImg('Z2466829536532562467636531091852/IMG_1050.jpg', 2480, 3508),
      cargoImg('N2466829592186389338018248317324/IMG_1051.jpg', 2480, 3508),
      cargoImg('Y2466829637731400456007131257228/IMG_1052.jpg', 2480, 3508),
    ],
  },
  {
    title: 'Cómic La Llamada',
    kicker: 'Cómic',
    year: '',
    tags: ['ilustracion', 'editorial'],
    media: [
      cargoImg('T2466841469657516774050633275788/lll-1.png', 441, 546),
      cargoImg('W2466841410332787833000715278732/BrochureMockup-1.png', 748, 535),
    ],
  },
  {
    title: 'Personajes y storyboard',
    kicker: 'Batido de gusanos y confesiones de amor',
    year: '',
    tags: ['ilustracion'],
    media: [
      cargoImg('R2466837107297691246921028917644/Untitled-design---1.PNG', 1080, 1080),
      cargoImg('Z2466837107795753336911186811276/Untitled-design---2.PNG', 1080, 1080),
      cargoImg('C2466837107814200080984896362892/Untitled-design---3.PNG', 1080, 1080),
      cargoImg('H2466841963107920745781139003788/IMG_1640.PNG', 871, 1236),
    ],
  },
  {
    title: 'Fanzine HIMYM',
    kicker: 'How I Met Your Mother',
    year: '2024',
    tags: ['editorial', 'ilustracion'],
    media: [
      cargoImg('M2469393234642139131720491260300/Captura-de-pantalla-2024-12-19-a-las-12.49.23.jpg', 1143, 1143),
      cargoImg('I2469392801918416650641829452172/Captura-de-pantalla-2024-12-19-a-las-12.49.38.jpg', 1049, 1049),
      cargoImg('I2469392802010650371010377210252/Captura-de-pantalla-2024-12-19-a-las-12.49.49.jpg', 1146, 1146),
      cargoImg('G2469392801936863394715539003788/Captura-de-pantalla-2024-12-19-a-las-12.49.40.jpg', 1112, 1112),
    ],
  },
  {
    title: 'Alicia',
    kicker: 'Edición especial',
    year: '2024',
    tags: ['editorial', 'ilustracion'],
    media: [
      cargoImg('O2469401412784763281965685594508/Mask-group-11.png', 477, 505),
      cargoImg('J2469401285022613827453331102092/Libro-Edicion-especial11.png', 886, 1045),
      cargoImg('E2469401316197611312022473333132/Libro-Edicion-especial12.png', 885, 1045),
      cargoImg('L2469401347298821820296777357708/Libro-Edicion-especial21.png', 894, 1045),
    ],
  },
  {
    title: 'Cata La Lata',
    kicker: 'Packaging y campaña',
    year: '',
    tags: ['packaging', 'branding'],
    media: [
      cargoImg('V2468131835361906380944934623628/mock1.PNG', 2200, 1540),
      cargoImg('J2468131835380353125018644175244/mock2.PNG', 2200, 1540),
      cargoImg('Y2468131835398799869092353726860/mock3.PNG', 2200, 1540),
      cargoImg('Z2468131834716270338365100317068/carteles.PNG', 4000, 3000),
    ],
  },
  {
    title: 'Merchandising para UDIT',
    kicker: 'Premio Inspirathon',
    year: '2024',
    tags: ['branding', 'packaging'],
    media: [
      cargoImg('U2468011927448696828569619716492/pack-1-textil_Mesa-de-trabajo-1-copia-5-1.png', 1732, 1765),
      cargoImg('B2468014281695962491677435156876/Mask-group-4.png', 2785, 2952),
      cargoImg('D2468013893502680204533630949772/Mask-group-5.png', 856, 1278),
    ],
  },
  {
    title: 'Amenities para el Hotel Thompson',
    kicker: 'Premio Inspirathon',
    year: '2023',
    tags: ['branding', 'packaging'],
    media: [
      cargoImg('V2468017975693356740162565364108/Mask-group-8.png', 1323, 1322),
      cargoImg('N2468017897589842332076323821964/Mask-group-7.png', 1392, 1322),
      cargoImg('H2468017864533276951988807326092/Mask-group-6.png', 1322, 1322),
      cargoImg('N2468105532573806792190605056396/Mask-group-10.png', 2673, 2687),
    ],
  },
  {
    title: 'Personitas',
    kicker: 'Fotografía de viaje',
    year: '',
    tags: ['foto'],
    media: [
      cargoImg('R2468121380448341677172041636236/a925f1de-a1d8-4c09-ba21-ac9bf6a96841.jpg', 1330, 1773),
      cargoImg('I2468120243649291390747213748620/88ec4a1c-0121-4cd9-b0e5-7e4fe3cc2977.jpg', 1290, 1720),
      cargoImg('O2468120243723078367042051955084/b0ab274a-2ad1-4479-930e-51e72334785c.jpg', 1198, 1597),
      cargoImg('Y2468121380060960051624141052300/44fde101-46ee-4ee7-9a52-3f69e9472e3b.jpg', 2602, 3469),
      cargoImg('H2468120243778418599263180609932/f145bb14-e506-4e19-820d-c608f1a3a74e.jpg', 1144, 1526),
      cargoImg('V2468120243686184878894632851852/497a6482-f718-4b50-bb2d-c58f1d40772c.jpg', 1366, 1821),
    ],
  },

  // Ayleeeeta
  {
    title: 'Ayleeeeta',
    kicker: 'Mi alter ego: pegatinas, calendario y animación',
    year: '2026',
    tags: ['ilustracion', 'motion'],
    media: ALTER_EGO.media,
  },
];
