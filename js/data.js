/* ==========================================================================
   DATOS DEL PORTFOLIO
   --------------------------------------------------------------------------
   Aquí está todo el contenido de la web. Para añadir o cambiar un proyecto
   solo tienes que editar este archivo: no hace falta tocar el HTML.

   · img('HASH/nombre.jpg', ancho, alto)  → imagen
   · vid('HASH/nombre.mp4', ancho, alto)  → vídeo (se reproduce en bucle)

   Ahora mismo las imágenes se cargan desde Cargo (freight.cargo.site).
   Si un día cierras Cargo, guarda tus archivos en /assets y cambia la ruta,
   por ejemplo:  img('assets/estrat/portada.jpg', 6000, 4000)
   ========================================================================== */

const CARGO = 'https://freight.cargo.site';

const img = (path, w, h) => ({
  type: 'image',
  src: path.startsWith('assets/') ? path : `${CARGO}/w/1600/i/${path}`,
  w, h,
});

const vid = (path, w, h) => ({
  type: 'video',
  src: path.startsWith('assets/') ? path : `${CARGO}/m/${path}`,
  w, h,
});

/* Miniatura más ligera para las previsualizaciones (solo imágenes de Cargo) */
const thumb = (media, width = 800) =>
  media.src.replace('/w/1600/', `/w/${width}/`);

/* --------------------------------------------------------------------------
   SOBRE MÍ
   -------------------------------------------------------------------------- */
const PROFILE = {
  name: 'Ayla Cano López',
  alias: 'ayleeeeta',
  email: 'aylacanolopez@gmail.com',
  instagram: 'https://www.instagram.com/ayleeeeta/',
  city: 'Barcelona',
  photo: img('C3067745658372108605697890376076/20835502-00A6-4E86-BA84-76DFCD5470E0.jpeg', 1086, 1448),
  alterEgo: vid('X2466854513073550132968937675148/Ilustracion_sin_titulo-2.mp4', 2048, 2048),
  cv: {
    Estudios: [
      ['2022—2026', 'Grado en Diseño Gráfico y Multimedia', 'UDIT, Madrid'],
      ['2020—2022', 'CFGS de Gráfica Interactiva', 'Escola d’Art Pau Gargallo, Badalona'],
      ['2018—2020', 'Bachillerato Artístico', 'Escola d’Art Pau Gargallo, Badalona'],
    ],
    Experiencia: [
      ['2025', 'Séducation', 'Gestión y comunicación de RRSS'],
      ['2024', 'Padawan Branding & Carolina Kairos', 'Prácticas en diseño gráfico, multimedia y RRSS'],
      ['2022', 'Festival Cruïlla, Barcelona', 'Voluntariado'],
      ['2021', 'AVV Bufalà, Badalona', 'Edición de vídeo y diseño interactivo'],
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

/* --------------------------------------------------------------------------
   FILTROS (las claves se usan en "tags" de cada proyecto)
   -------------------------------------------------------------------------- */
const FILTERS = {
  todo: 'Todo',
  ilustracion: 'Ilustración',
  motion: 'Motion',
  branding: 'Branding',
  editorial: 'Editorial',
  packaging: 'Packaging',
  foto: 'Foto',
};

/* --------------------------------------------------------------------------
   PROYECTOS
   -------------------------------------------------------------------------- */
const PROJECTS = [
  {
    slug: 'estrat',
    title: 'Estrat',
    kicker: 'Rebranding del Museu Paleontològic de Sant Mateu',
    tags: ['branding', 'editorial'],
    year: '2026',
    role: 'Trabajo de fin de grado',
    cover: img('W3067715059355760994062698994060/N53A1512.jpg', 6000, 4000),
    blocks: [
      {
        text: [
          'La idea de este proyecto nació de un sentimiento concreto: ver cómo el museo paleontológico de mi abuelo iba perdiendo vida con el tiempo. Crecí viendo lo importante que había sido para él y cómo la búsqueda de fósiles lo mantenía ilusionado, activo y conectado con su entorno.',
          'Aquellas excursiones en familia eran mucho más que una actividad: eran una forma de aprender, de explorar la naturaleza y de descubrir historias que existían mucho antes que nosotros. Me quedé con lo que me transmitieron: preservar la cultura, entender nuestras raíces y mirar el pasado como una pieza esencial del presente.',
          'Sentí que el museo tenía un valor que no podía quedarse apagado y que, desde el diseño, podía devolverle una identidad más fuerte, actual y emocional. Mi intención es que ese legado no se pierda, sino que siga emocionando, educando y conectando a nuevas generaciones con el pasado.',
        ],
        media: [
          img('W3067723656202582129367295908236/N53A1507.jpg', 4000, 6000),
          img('N3067723655778307015671976221068/N53A1528.jpg', 4000, 6000),
          img('R3067723655888987480114233530764/N53A1550.jpg', 5624, 3749),
          img('I3067723655224904693460689672588/N53A1728.jpg', 4000, 6000),
          img('Z3067723656036561432703909943692/N53A1581.jpg', 3753, 5630),
          img('K3067723655686073295303428462988/N53A1701.jpg', 6000, 4000),
          img('Q3067723655833647247893104875916/N53A1540.jpg', 3124, 5293),
          img('U3067723655981221200482781288844/N53A1571.jpg', 3677, 5515),
          img('Q3067723655852093991966814427532/N53A1543.jpg', 5133, 3422),
          img('H3067723655649179807156009359756/N53A1689.jpg', 4000, 6000),
          img('L3067723655630733063082299808140/N53A1647.jpg', 3440, 5160),
          img('I3067723655538499342713752050060/N53A1630.jpg', 4000, 6000),
          img('C3067723655390925390124075637132/N53A1604.jpg', 6000, 4000),
        ],
      },
    ],
  },
  {
    slug: 'logofolio',
    title: 'Logofolio',
    kicker: 'Identidades y logotipos',
    tags: ['branding'],
    year: '2022—2025',
    cover: img('G2468003232741898382235851479436/logo1-1-1.png', 2557, 1181),
    blocks: [
      {
        title: 'MU',
        subtitle: 'Escola Miguel de Unamuno, Santa Coloma de Gramenet',
        text: [
          'Logotipo creado para la escuela Miguel de Unamuno. La idea era crear un personaje amable y divertido con las iniciales del nombre de la escuela.',
          'Se hicieron variaciones de color para representar los diferentes ámbitos de la escuela, y con ellas también se creó el merchandising.',
        ],
        media: [
          img('G2468003232741898382235851479436/logo1-1-1.png', 2557, 1181),
          img('W2468003698946461357097349470604/Mask-group-2.png', 1729, 1213),
          img('X2468004871772002819476931664268/Mask-group-1.png', 843, 843),
          img('C2468004936022012428207299942796/Mask-group.png', 1259, 1358),
        ],
      },
      {
        title: 'Rocko +',
        subtitle: 'Canal de televisión',
        media: [
          img('B2466531877287644919992318089612/Logo_Mesa-de-trabajo-1-copia-11.png', 843, 596),
          img('T2466531975332089671758584928652/Logo_Mesa-de-trabajo-1-copia-20.png', 843, 596),
        ],
      },
      {
        title: 'La Roja',
        subtitle: 'Marca de copas menstruales',
        credit: 'En colaboración con Eva Sahuquillo Fernández',
        text: [
          'La menstruación no debería ser un tema incómodo ni envuelto en tabúes. Rompemos con los colores tradicionales como el rosa o el azul y abrazamos el rojo, porque la regla es natural y no hay razón para ocultarla.',
          'Una marca que apuesta por la sostenibilidad y que quiere ser más que un producto: una comunidad segura e inclusiva donde informarse, compartir experiencias y hablar de menstruación sin miedo ni vergüenza.',
        ],
        media: [
          img('U2466589208975016014109229898124/la-roja_Mesa-de-trabajo-1-copia-4.png', 843, 597),
          img('M2466589208901229037814391691660/la-roja_Mesa-de-trabajo-1-copia-3-14.png', 843, 596),
          img('I2466584666593415071648111319436/4bdcab42-a045-4c17-9ffc-df061b53afe6.jpg', 2048, 2048),
          img('B2466585487123038214322676750732/Sahuquillo.Eva_3.1_PMYMP_PRODUCTO--PUNTO-DE-VENTA-Y-PROMOCION.jpg', 1920, 1080),
        ],
      },
      {
        title: 'Xiu-Xiu',
        subtitle: 'App de prevención de riesgos para niños',
        credit: 'Premio Talent Creatiu i Empresa, 2022',
        text: [
          'Aplicación creada para prevenir a los niños de los peligros que pueden encontrar en sus sitios seguros, a través de una serie de juegos educativos.',
        ],
        media: [
          img('H2467996620838526554373846653324/Capa_1-1.png', 3868, 3868),
          img('V2467995943123596030358629833100/xiuxiu-1.png', 813, 781),
          img('S2468009210796697093363953228172/TCE-2.jpg', 1090, 1090),
          img('Y2466592988048793930542812158348/xiuxiu-1.png', 895, 942),
        ],
      },
    ],
  },
  {
    slug: 'ilustraciones',
    title: 'Ilustraciones',
    kicker: 'Cuentos, campañas, cómic y storyboard',
    tags: ['ilustracion'],
    year: '',
    cover: img('E2466826624880031129247194470796/Ilustracion_sin_titulo-1-2.jpg', 2598, 3189),
    blocks: [
      {
        title: 'Cuentos infantiles a dos tintas',
        subtitle: 'Pinocho · Caperucita Roja · El sastrecillo valiente',
        media: [
          img('E2466826624880031129247194470796/Ilustracion_sin_titulo-1-2.jpg', 2598, 3189),
          img('D2466826675258089194547979934092/Ilustracion_sin_titulo-2-2.jpg', 2598, 3189),
          img('O2466826710583604095701771278732/Ilustracion_sin_titulo-4.jpg', 2598, 3189),
        ],
      },
      {
        title: 'Campaña para Starbucks',
        subtitle: 'San Valentín · Halloween · Navidad',
        media: [
          img('Z2466829536532562467636531091852/IMG_1050.jpg', 2480, 3508),
          img('N2466829592186389338018248317324/IMG_1051.jpg', 2480, 3508),
          img('Y2466829637731400456007131257228/IMG_1052.jpg', 2480, 3508),
        ],
      },
      {
        title: 'Cómic La Llamada',
        media: [
          img('T2466841469657516774050633275788/lll-1.png', 441, 546),
          img('W2466841410332787833000715278732/BrochureMockup-1.png', 748, 535),
        ],
      },
      {
        title: 'Personajes y storyboard',
        subtitle: 'Batido de gusanos y confesiones de amor',
        credit: 'Guion de Irene del Río, Gema Garrido y Ayla Cano',
        text: [
          'A partir de la historia creada para un corto, imaginé cómo lo enfocaría: diseñé mis propios personajes y creé las expresiones y los planos que encajaban con la historia que queríamos contar.',
        ],
        media: [
          img('R2466837107297691246921028917644/Untitled-design---1.PNG', 1080, 1080),
          img('Z2466837107795753336911186811276/Untitled-design---2.PNG', 1080, 1080),
          img('C2466837107814200080984896362892/Untitled-design---3.PNG', 1080, 1080),
          img('H2466841963107920745781139003788/IMG_1640.PNG', 871, 1236),
          img('Q2466841962868113072822914832780/IMG_1639.PNG', 871, 1236),
          img('W2466841963126367489854848555404/IMG_1649.PNG', 871, 1236),
          img('J2466850163663338945583438551436/IMG_1642.PNG', 871, 1236),
          img('X2466850163829359642246824515980/IMG_1647.PNG', 871, 1236),
          img('V2466850163847806386320534067596/IMG_1648.PNG', 871, 1236),
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
    cover: vid('F2466598444300543028648827345292/Cano_Ayla_Creditos-Sex---the-city.mov', 1280, 720),
    preview: [
      img('R2466603551705914948833511922060/205F152C-B852-481E-B04F-934E6DE07F4C-1.png', 1536, 1024),
      img('H2466603519073624682441315113356/205F152C-B852-481E-B04F-934E6DE07F4C-3.png', 1536, 1024),
    ],
    blocks: [
      {
        text: [
          'Un giro moderno y algo más punk para los créditos de ‘Sex and the City’: elementos gráficos dinámicos y una paleta rosa vibrante, fiel a la estética original de la serie.',
          'La secuencia se desarrolla en un escenario en forma de L que representa Nueva York. El recorrido fluye por distintas áreas mostrando a cada protagonista, con ilustraciones originales para darle un toque personal y rebelde.',
          'Los textos están en constante movimiento para mantener el ritmo punk; las transiciones rápidas y el espacio tridimensional subrayan la vida cambiante de la ciudad.',
        ],
        media: [
          vid('F2466598444300543028648827345292/Cano_Ayla_Creditos-Sex---the-city.mov', 1280, 720),
          img('R2466603551705914948833511922060/205F152C-B852-481E-B04F-934E6DE07F4C-1.png', 1536, 1024),
          img('H2466603519073624682441315113356/205F152C-B852-481E-B04F-934E6DE07F4C-3.png', 1536, 1024),
        ],
      },
    ],
  },
  {
    slug: 'ayleeeeta',
    title: 'Ayleeeeta',
    kicker: 'Autorretrato artístico',
    tags: ['ilustracion', 'motion'],
    year: '',
    cover: vid('X2466854513073550132968937675148/Ilustracion_sin_titulo-2.mp4', 2048, 2048),
    preview: [
      img('I2466861497748726202353561557388/Ilustracion_sin_titulo-3-2.jpg', 2048, 2048),
      img('C2466861602913614166571715320204/Ilustracion_sin_titulo-5-2.jpg', 2048, 2048),
    ],
    blocks: [
      {
        text: [
          'Este proyecto nace de querer crear un icono que mostrara mi actitud, mi estilo y mi manera de ver la vida. Cogí mi forma de dibujar personajes y mis rasgos más característicos para crear a ayleeeeta, mi alter ego artístico.',
          'Todo partió de unas ilustraciones que hice para un diario semanal.',
        ],
        media: [
          vid('X2466854513073550132968937675148/Ilustracion_sin_titulo-2.mp4', 2048, 2048),
          img('I2466861497748726202353561557388/Ilustracion_sin_titulo-3-2.jpg', 2048, 2048),
          img('D2466861574007566203068847937932/Ilustracion_sin_titulo-1-3.jpg', 2048, 2048),
          img('C2466861602913614166571715320204/Ilustracion_sin_titulo-5-2.jpg', 2048, 2048),
          img('Q2466861550635541461678846040460/Ilustracion_sin_titulo-2-3.jpg', 2048, 2048),
          img('D2466861526027584867350304184716/Ilustracion_sin_titulo-4-2.jpg', 2048, 2048),
          img('B2466861467053344063700867668364/Ilustracion_sin_titulo-5.jpg', 2048, 2048),
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
    cover: img('P2469892884424944969721521297804/327695a7-cdf5-442a-acdb-eed9f3ae58f9.JPG', 1066, 1600),
    blocks: [
      {
        credit: 'En colaboración con Eva Sahuquillo, Laura Lozano y Sara Sánchez',
        text: [
          'Nuestro concepto nace de esas obras inacabadas que nunca salieron a la luz. Queremos que la revista sea un lugar donde disfrutar de la belleza del proceso creativo.',
          'A veces hay mucha presión para que un proyecto salga perfecto, pero hay procesos que, aunque no lleguen a terminarse, son completos en sí mismos y hasta más inspiradores.',
          'El objetivo es crear una comunidad de diseñadores y artistas donde compartir y descubrir proyectos inacabados: ver procesos, inspirarse, sentirse identificado y conocer a otros creadores.',
        ],
        media: [
          img('P2469892884424944969721521297804/327695a7-cdf5-442a-acdb-eed9f3ae58f9.JPG', 1066, 1600),
          img('P2469894082965247670852218444172/b6b150cb-e8a9-45fa-afef-017d1c3e8688.JPG', 1066, 1600),
          vid('B2469917761261280916653801396620/364244a7-3330-4c3f-b1cf-c1f050cbf115.MP4', 720, 1280),
          img('B2469896847228293860302237653388/a7878a26-8070-4dce-b7bf-983f77750207.JPG', 1366, 2048),
          img('N2469917967274518731842073844108/838e2522-e452-448f-a349-2c1f96fb6b51.JPG', 1600, 1399),
          img('R2469918167919754021580866771340/561030f1-1ce1-4f61-8c81-4aae59b97e0a.JPG', 1600, 1399),
          img('M2469918277142925682015121889676/4c9840a2-e15c-4a33-89a4-f2209b386e17.JPG', 1600, 1399),
          img('O2469896688955229707874284788108/_MG_9893.JPG', 4160, 6240),
        ],
      },
    ],
  },
  {
    slug: 'editorial',
    title: 'Editorial',
    kicker: 'Ediciones especiales y fanzine',
    tags: ['editorial', 'ilustracion'],
    year: '2024',
    cover: img('D2469408605151830877246151121292/El-clan-del-oso-cavernario_Mesa-de-trabajo-1-01.jpg', 3508, 2339),
    blocks: [
      {
        title: 'Los Hijos de la Tierra',
        subtitle: 'Edición especial de la saga',
        text: [
          'Un toque prehistórico y mágico: una camisa con un estilo limpio y geométrico que contrasta con la portada, donde ilustré elementos inspirados en las pinturas rupestres rodeando al animal protagonista.',
          'Además, una pequeña línea de merch con tote bags, marcapáginas, pegatinas y hasta un mini mapa para seguir la historia.',
        ],
        media: [
          img('D2469408605151830877246151121292/El-clan-del-oso-cavernario_Mesa-de-trabajo-1-01.jpg', 3508, 2339),
          img('C2469408653998809184429043800460/El-clan-del-oso-cavernario_Mesa-de-trabajo-1-copia.jpg', 3508, 2339),
          img('A2469408560344689522205650246028/El-clan-del-oso-cavernario_Mesa-de-trabajo-1-copia-3.jpg', 3509, 2339),
          img('U2469407958113835747809918638476/El-clan-del-oso-cavernario_Mesa-de-trabajo-1-02.jpg', 3509, 2339),
          img('L2469408121183053359402354923916/El-clan-del-oso-cavernario_Mesa-de-trabajo-1-copia-2.jpg', 3509, 2339),
          img('Y2469408069550616697089319950732/El-clan-del-oso-cavernario_Mesa-de-trabajo-1-copia-4.jpg', 3509, 2339),
          img('Y2469414897096426746615983167884/El-clan-del-oso-cavernario_Mesa-de-trabajo-1-copia-5.jpg', 3509, 2339),
        ],
      },
      {
        title: 'Fanzine HIMYM',
        subtitle: 'How I Met Your Mother',
        text: [
          'Fanzine con curiosidades de la serie y las frases míticas de cada personaje, contadas de manera visual y divertida para los más fans.',
        ],
        media: [
          img('M2469393234642139131720491260300/Captura-de-pantalla-2024-12-19-a-las-12.49.23.jpg', 1143, 1143),
          img('I2469392801918416650641829452172/Captura-de-pantalla-2024-12-19-a-las-12.49.38.jpg', 1049, 1049),
          img('I2469392802010650371010377210252/Captura-de-pantalla-2024-12-19-a-las-12.49.49.jpg', 1146, 1146),
          img('G2469392801936863394715539003788/Captura-de-pantalla-2024-12-19-a-las-12.49.40.jpg', 1112, 1112),
          img('E2469392801881523162494410348940/Captura-de-pantalla-2024-12-19-a-las-12.49.29.jpg', 1109, 1109),
          img('R2469392801899969906568119900556/Captura-de-pantalla-2024-12-19-a-las-12.49.36.jpg', 1137, 1137),
          img('O2469397650386842008165537995148/FANZINE-07.PNG', 698, 358),
          img('B2469405358635554368807324014988/FANZINE-14.PNG', 699, 358),
          img('V2469405676214700341790964636044/FANZINE-03.PNG', 699, 358),
        ],
      },
      {
        title: 'Alicia',
        subtitle: 'Edición especial',
        text: [
          'Maquetación de una edición especial de ‘Alicia en el país de las maravillas’ con los espejos y los reflejos como tema. Jugué con las dualidades de la obra —mundo real y mundo de Alicia, imaginación y realidad— en las ilustraciones.',
        ],
        media: [
          img('O2469401412784763281965685594508/Mask-group-11.png', 477, 505),
          img('J2469401285022613827453331102092/Libro-Edicion-especial11.png', 886, 1045),
          img('E2469401316197611312022473333132/Libro-Edicion-especial12.png', 885, 1045),
          img('L2469401347298821820296777357708/Libro-Edicion-especial21.png', 894, 1045),
          img('Z2469401380466067664826551163276/Libro-Edicion-especial22.png', 894, 1045),
        ],
      },
    ],
  },
  {
    slug: 'cata-la-lata',
    title: 'Cata La Lata',
    kicker: 'Packaging y campaña',
    tags: ['packaging', 'branding'],
    year: '',
    cover: img('V2468131835361906380944934623628/mock1.PNG', 2200, 1540),
    blocks: [
      {
        text: [
          'El objetivo era representar cada producto dentro de una misma línea visual, siguiendo las tendencias actuales para lograr un impacto diferenciador y elevar el valor percibido con una imagen más exclusiva.',
          'Pensado para quienes disfrutan compartir momentos y acompañar sus reuniones con tapas, y para atraer a un público más joven modernizando la imagen de la marca.',
        ],
        media: [
          img('V2468131835361906380944934623628/mock1.PNG', 2200, 1540),
          img('J2468131835380353125018644175244/mock2.PNG', 2200, 1540),
          img('Y2468131835398799869092353726860/mock3.PNG', 2200, 1540),
          img('Z2468131834716270338365100317068/carteles.PNG', 4000, 3000),
          img('W2469410782863755754953557596556/catalalata-selek-02.png', 1905, 1429),
          img('Q2468135152805913852796987693452/rrss.PNG', 1142, 2352),
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
    cover: vid('T2466566479099882574010533730700/Logo.mp4', 842, 596),
    preview: [
      img('B2466531877287644919992318089612/Logo_Mesa-de-trabajo-1-copia-11.png', 843, 596),
      img('T2466531975332089671758584928652/Logo_Mesa-de-trabajo-1-copia-20.png', 843, 596),
    ],
    blocks: [
      {
        text: [
          'Un canal de televisión dedicado al rock: conciertos, entrevistas, nuevos artistas, documentales y películas sobre la vida de los rockeros. Desde Extremoduro, Platero y Tú o Marea hasta Guns N’ Roses o Patti Smith.',
          '¡24 horas de ruido del bueno! Rocko +, el canal que no se calla… ni se callará.',
        ],
        media: [
          vid('T2466566479099882574010533730700/Logo.mp4', 842, 596),
          img('B2466531877287644919992318089612/Logo_Mesa-de-trabajo-1-copia-11.png', 843, 596),
          img('T2466531975332089671758584928652/Logo_Mesa-de-trabajo-1-copia-20.png', 843, 596),
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
    cover: vid('H2468110961745735590090998471052/Compo-efectos.MP4', 1280, 720),
    preview: [
      img('B2468116223052293317234472180108/Fotogramas_Mesa_de_trabajo_1_copia-06.png', 2482, 3508),
      img('V2468116223033846573160762628492/Fotogramas_Mesa_de_trabajo_1_copia-04.png', 2481, 3508),
    ],
    blocks: [
      {
        text: [
          'Vídeo experimental con la técnica MixMedia: fotografías frame a frame editadas a mano con herramientas manuales.',
          'Las flores pueden significar amor, declaración, desamor, perdón, e incluso muerte, pérdida y tristeza. Quería representar cómo un mismo elemento puede variar tanto su significado.',
        ],
        media: [
          vid('H2468110961745735590090998471052/Compo-efectos.MP4', 1280, 720),
          img('B2468116223052293317234472180108/Fotogramas_Mesa_de_trabajo_1_copia-06.png', 2482, 3508),
          img('V2468116223033846573160762628492/Fotogramas_Mesa_de_trabajo_1_copia-04.png', 2481, 3508),
          img('L2468116222738698667981409802636/Fotogramas_Mesa_de_trabajo_1_copia-03.png', 2481, 3508),
          img('R2468116223070740061308181731724/Fotogramas_Mesa_de_trabajo_1_copia-12.png', 2482, 3508),
        ],
      },
    ],
  },
  {
    slug: 'inspirathon',
    title: 'Inspirathon',
    kicker: 'Merchandising premiado',
    tags: ['branding', 'ilustracion', 'packaging'],
    year: '2023—2024',
    cover: img('B2468014281695962491677435156876/Mask-group-4.png', 2785, 2952),
    blocks: [
      {
        title: 'Merchandising para UDIT',
        subtitle: 'Premio Inspirathon 2024',
        credit: 'En colaboración con Eva Sahuquillo Fernández',
        text: [
          'Merchandising para la universidad UDIT, Madrid. Quisimos reflejar la vida universitaria y los valores que la universidad quiere transmitir, con ilustraciones y composiciones para distintos productos.',
        ],
        media: [
          img('U2468011927448696828569619716492/pack-1-textil_Mesa-de-trabajo-1-copia-5-1.png', 1732, 1765),
          img('B2468014281695962491677435156876/Mask-group-4.png', 2785, 2952),
          img('D2468013893502680204533630949772/Mask-group-5.png', 856, 1278),
        ],
      },
      {
        title: 'Amenities para el Hotel Thompson',
        subtitle: 'Premio Inspirathon 2023',
        credit: 'En colaboración con Eva Sahuquillo Fernández',
        text: [
          'Jugamos con la filosofía de la empresa y con los elementos que ya formaban parte de la marca para crear productos novedosos enfocados en la cultura madrileña.',
        ],
        media: [
          img('V2468017975693356740162565364108/Mask-group-8.png', 1323, 1322),
          img('N2468017897589842332076323821964/Mask-group-7.png', 1392, 1322),
          img('H2468017864533276951988807326092/Mask-group-6.png', 1322, 1322),
          img('N2468105532573806792190605056396/Mask-group-10.png', 2673, 2687),
        ],
      },
    ],
  },
  {
    slug: 'personitas',
    title: 'Personitas',
    kicker: 'Fotografía de viaje',
    tags: ['foto'],
    year: '',
    cover: img('Y2468121380060960051624141052300/44fde101-46ee-4ee7-9a52-3f69e9472e3b.jpg', 2602, 3469),
    blocks: [
      {
        media: [
          img('R2468121380448341677172041636236/a925f1de-a1d8-4c09-ba21-ac9bf6a96841.jpg', 1330, 1773),
          img('I2468120243649291390747213748620/88ec4a1c-0121-4cd9-b0e5-7e4fe3cc2977.jpg', 1290, 1720),
          img('O2468120243723078367042051955084/b0ab274a-2ad1-4479-930e-51e72334785c.jpg', 1198, 1597),
          img('Y2468121380060960051624141052300/44fde101-46ee-4ee7-9a52-3f69e9472e3b.jpg', 2602, 3469),
          img('H2468120243778418599263180609932/f145bb14-e506-4e19-820d-c608f1a3a74e.jpg', 1144, 1526),
          img('V2468120243686184878894632851852/497a6482-f718-4b50-bb2d-c58f1d40772c.jpg', 1366, 1821),
          img('L2468120243741525111115761506700/c27cc4af-73a9-48b8-ab3f-f643b74f4308.jpg', 1042, 1390),
          img('H2468121380466788421245751187852/ee4323c2-8958-4682-8880-e73190c4e53d.jpg', 1225, 1634),
          img('E2468120243612397902599794645388/6b22d32d-609c-45fe-a528-e57e26be946b.jpg', 1366, 1821),
          img('I2468120243630844646673504197004/07e818b2-9d8b-4865-9c32-1e3cddb69f44.jpg', 1198, 1597),
          img('T2468120243667738134820923300236/463e9ee0-ff03-42db-8b7d-f47cea6419c3.jpg', 1160, 1546),
        ],
      },
    ],
  },
];
