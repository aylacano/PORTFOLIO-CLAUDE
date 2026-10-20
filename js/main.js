/* ==========================================================================
   AYLEEEETA — interacciones
   Librerías: GSAP (+ ScrollTrigger, SplitText), Lenis (scroll suave)
   y Matter.js (física de las pegatinas).
   ========================================================================== */
(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CAN_HOVER = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const DESKTOP = '(min-width: 900px)';

  gsap.registerPlugin(ScrollTrigger, SplitText);
  history.scrollRestoration = 'manual';

  /* ------------------------------------------------------------------------
     1. CONTENIDO desde data.js
     ------------------------------------------------------------------------ */
  const pad = (n) => String(n).padStart(2, '0');
  const tagNames = (p) => p.tags.map((t) => FILTERS[t]).join(', ');
  const esc = (s = '') => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Imagen de la tarjeta del carrusel: la portada, o la primera imagen si la portada es un vídeo
  const cardImage = (p) => (p.cover.type === 'image' ? p.cover : (p.preview?.[0] || p.blocks[0].media.find((m) => m.type === 'image')));

  function renderProfile() {
    $('.hero__photo').src = thumb(PROFILE.photo, 600);
    $('.contact__email-text').textContent = PROFILE.email;
    $('#mail-link').href = $('#mail-link-2').href = `mailto:${PROFILE.email}`;
    $('#mail-link-2 span').textContent = PROFILE.email;
    $('#mail-link-2 span').dataset.text = PROFILE.email;
    $('#instagram-link').href = $('#instagram-link-2').href = PROFILE.instagram;
    $('#year').textContent = new Date().getFullYear();

    // "Disponible para proyectos — octubre ’26" (se actualiza solo cada mes)
    const now = new Date();
    const month = now.toLocaleDateString('es-ES', { month: 'long' });
    $('#available').textContent = `${month[0].toUpperCase()}${month.slice(1)} ’${String(now.getFullYear()).slice(2)}`;

    $('#cv').innerHTML = Object.entries(PROFILE.cv).map(([title, items]) => `
      <div class="cv__col">
        <h3 class="tiny muted">${title}</h3>
        ${items.map(([year, what, where]) => `
          <div class="cv__item">
            <span class="cv__year">${year}</span>
            <span class="cv__what">${what}</span>
            <span class="cv__where">${where}</span>
          </div>`).join('')}
      </div>`).join('');

    $('#tools').innerHTML = PROFILE.tools.join(', ');
    $('#languages').innerHTML = PROFILE.languages.join('<br>');
  }

  function renderCards() {
    $('#track').innerHTML = PROJECTS.map((p, i) => `
      <a class="card" href="#/proyecto/${p.slug}" data-index="${i}" data-cursor="Ver">
        <img src="${thumb(cardImage(p), 900)}" alt="${esc(p.title)}" ${i > 3 ? 'loading="lazy"' : ''} decoding="async">
        ${p.cover.type === 'video' ? `<video muted loop playsinline preload="none" data-src="${p.cover.src}"></video>` : ''}
        <span class="card__label"><span>${pad(i + 1)}</span>${esc(p.title)}</span>
      </a>`).join('');
  }

  renderProfile();
  renderCards();

  /* ------------------------------------------------------------------------
     2. SCROLL SUAVE (Lenis) sincronizado con GSAP
     ------------------------------------------------------------------------ */
  let lenis = null;
  if (!REDUCED) {
    lenis = new Lenis({ lerp: 0.09 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    window.lenis = lenis; // útil para depurar desde la consola
  }

  const scrollToTarget = (target) => {
    if (lenis) lenis.scrollTo(target, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
    else $(target).scrollIntoView({ behavior: 'smooth' });
  };

  // Enlaces internos con scroll suave (#proyectos es la portada → arriba del todo)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href.startsWith('#/')) return; // rutas de proyecto
    const target = $(href);
    if (!target) return;
    e.preventDefault();
    if (!$('.project').hidden) closeProject();
    scrollToTarget(href === '#proyectos' || href === '#hola' ? 0 : target);
  });

  $('#back-top').addEventListener('click', () => scrollToTarget(0));

  /* ------------------------------------------------------------------------
     3. LOGO: trazo que vibra + las "E" que se pliegan
     ------------------------------------------------------------------------ */

  // Cambia de "dibujo" 8 veces por segundo (como un GIF de 3 fotogramas)
  function lineBoil() {
    if (REDUCED) return;
    let frame = 0;
    setInterval(() => {
      frame = (frame + 1) % 3;
      $$('[data-boil]').forEach((el) => { el.style.filter = `url(#boil-${el.dataset.boil}-${frame})`; });
    }, 125);
  }

  // Letras un poco torcidas, como rotuladas a mano
  function naiveLetters() {
    const tilt = [-4, 3, -2, 2, -3, 4, -2, 3, -3];
    ['.logo', '.loader__word'].forEach((s) => {
      $$('span', $(s)).forEach((l, i) => gsap.set(l, { rotation: tilt[i % tilt.length], y: `${(i % 2 ? -1 : 1) * 0.03}em` }));
    });
  }

  function collapseEs(scope, duration = 0.7) {
    const extras = $$('.e-extra', $(scope));
    const first = $('.e:not(.e-extra)', $(scope));
    return gsap.timeline()
      .to(extras, {
        maxWidth: 0, opacity: 0, xPercent: -60, scaleX: 0.4,
        duration, ease: 'power3.inOut', stagger: { each: 0.07, from: 'end' }, overwrite: true,
      })
      // la "E" que queda se "traga" a las demás con un pequeño rebote
      .fromTo(first, { scaleX: 1.35, scaleY: 0.85 }, { scaleX: 1, scaleY: 1, duration: 0.8, ease: 'elastic.out(1, 0.4)' }, '-=0.2');
  }

  function expandEs(scope, duration = 0.7) {
    return gsap.to($$('.e-extra', $(scope)), {
      maxWidth: '1em', opacity: 1, xPercent: 0, scaleX: 1,
      duration, ease: 'back.out(2)', stagger: 0.07, overwrite: true,
    });
  }

  function logoAnimation() {
    const logo = $('.logo');
    let collapsed = false;
    let hovering = false;
    const set = (c) => {
      if (c === collapsed) return;
      collapsed = c;
      c ? collapseEs('.logo') : expandEs('.logo');
    };
    // Al empezar a hacer scroll → "AYLETA"; arriba del todo → "AYLEEEETA"
    ScrollTrigger.create({ start: 80, end: () => ScrollTrigger.maxScroll(window) + 100, onToggle: (self) => { if (!hovering) set(self.isActive); } });
    logo.addEventListener('mouseenter', () => { hovering = true; set(false); });
    logo.addEventListener('mouseleave', () => { hovering = false; set(window.scrollY > 80); });
  }

  /* ------------------------------------------------------------------------
     4. PRELOADER + ENTRADA
     ------------------------------------------------------------------------ */
  const imageReady = (img) => new Promise((res) => {
    if (img.complete) return res();
    img.addEventListener('load', res, { once: true });
    img.addEventListener('error', res, { once: true });
  });
  const timeout = (ms) => new Promise((res) => setTimeout(res, ms));
  const splitLines = (el) => SplitText.create(el, { type: 'lines', mask: 'lines' });

  async function intro() {
    const counter = { v: 0 };
    const count = gsap.to(counter, {
      v: 100, duration: REDUCED ? 0.2 : 1.6, ease: 'power2.inOut',
      onUpdate: () => { $('.loader__num').textContent = Math.round(counter.v); },
    });

    await Promise.all([
      count.then(),
      Promise.race([Promise.all([document.fonts.ready, imageReady($('.hero__photo'))]), timeout(4000)]),
    ]);

    window.scrollTo(0, 0);
    scrollAnimations(); // después de cargar las fuentes, para medir bien las líneas
    const lines = splitLines($('.statement'));

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out', duration: 1.1 },
      onComplete: () => {
        lines.revert();
        document.body.classList.remove('is-loading');
        lenis?.start();
        ScrollTrigger.refresh();
        stickers();
        openFromHash();
      },
    });

    // Las cuatro "E" se pliegan en una sola: AYLEEEETA → AYLETA
    tl.add(collapseEs('.loader__word', 0.6))
      .to('.loader__word span', { yPercent: -120, opacity: 0, stagger: 0.03, duration: 0.5, ease: 'power3.in' }, '+=0.25')
      .to('.loader__count', { opacity: 0, duration: 0.3 }, '<')
      .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' }, '-=0.1')
      .set('.loader', { display: 'none' })
      .from('.topbar', { yPercent: -100, duration: 0.8 }, '-=0.4')
      .from('.logo span', { yPercent: 110, opacity: 0, stagger: 0.04 }, '<0.1')
      .from(lines.lines, { yPercent: 110, stagger: 0.07 }, '<')
      .from('.hero__card', { clipPath: 'inset(100% 0 0 0)', duration: 1.2 }, '<0.1')
      .from('.card', { y: 60, opacity: 0, stagger: 0.05 }, '<0.1')
      .from('.side .meta, .main__row, .work__info, .stickers__hint, .dot', { opacity: 0, y: 10, stagger: 0.03, duration: 0.8 }, '<0.2')
      .from('.pill', { yPercent: 160, duration: 0.9 }, '<');

    if (REDUCED) tl.progress(1);
  }

  /* ------------------------------------------------------------------------
     5. CARRUSEL HORIZONTAL (la portada se queda fija y el scroll pasa proyectos)
     ------------------------------------------------------------------------ */
  function carousel() {
    const track = $('#track');
    const cards = $$('.card', track);
    const n = cards.length;
    let active = -1;

    const setActive = (i) => {
      i = gsap.utils.clamp(0, n - 1, i);
      if (i === active) return;
      active = i;
      const p = PROJECTS[i];

      $('#counter').textContent = `${pad(i + 1)}/${pad(n)}`;
      $('#work-open').href = `#/proyecto/${p.slug}`;
      const info = { title: p.title, tags: tagNames(p), year: p.year || '—' };
      $$('[data-info]').forEach((el) => { el.textContent = info[el.dataset.info]; });
      if (!REDUCED) gsap.fromTo('[data-info]', { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.04, overwrite: true });

      // Los vídeos solo se reproducen en la tarjeta activa
      cards.forEach((c, j) => {
        c.classList.toggle('is-active', j === i);
        const v = $('video', c);
        if (!v) return;
        if (j === i) {
          if (!v.src) v.src = v.dataset.src;
          v.play().then(() => v.classList.add('is-playing')).catch(() => {});
        } else {
          v.pause();
          v.classList.remove('is-playing');
        }
      });
    };
    setActive(0);

    const mm = gsap.matchMedia();

    // Escritorio: tarjetas cuadradas; la activa es grande y las demás pequeñas, alineadas abajo
    mm.add(DESKTOP, () => {
      const state = { p: 0 };

      const layout = () => {
        const W = track.clientWidth;
        const H = track.clientHeight;
        const big = Math.min(H, W * 0.5);
        const small = big * 0.42;
        const gap = 10;
        const sizes = cards.map((_, i) => small + (big - small) * Math.max(0, 1 - Math.abs(i - state.p)));
        let acc = 0;
        const xs = sizes.map((s) => { const x = acc; acc += s + gap; return x; });
        const f = Math.min(Math.floor(state.p), n - 1);
        const shift = xs[f] + (f + 1 < n ? (xs[f + 1] - xs[f]) * (state.p - f) : 0);
        cards.forEach((c, i) => gsap.set(c, { width: sizes[i], height: sizes[i], x: xs[i] - shift }));
      };

      const tween = gsap.to(state, {
        p: n - 1, ease: 'none',
        onUpdate: () => { layout(); setActive(Math.round(state.p)); },
        scrollTrigger: {
          trigger: '.home', start: 'top top', end: () => `+=${(n - 1) * innerHeight * 0.45}`,
          pin: true, scrub: 0.6, invalidateOnRefresh: true,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: 'power2.inOut' },
        },
      });

      ScrollTrigger.addEventListener('refresh', layout);
      layout();

      // Clic en una tarjeta que no es la activa → la trae al frente en vez de abrirla
      const onClick = (e) => {
        const card = e.target.closest('.card');
        if (!card) return;
        const i = +card.dataset.index;
        if (i === active) return;
        e.preventDefault();
        const st = tween.scrollTrigger;
        scrollToTarget(st.start + (st.end - st.start) * (i / (n - 1)));
      };
      track.addEventListener('click', onClick);

      return () => {
        ScrollTrigger.removeEventListener('refresh', layout);
        track.removeEventListener('click', onClick);
        gsap.set(cards, { clearProps: 'width,height,x' });
      };
    });

    // Móvil: carrusel con scroll horizontal nativo
    mm.add(`not all and ${DESKTOP}`, () => {
      const onScroll = () => {
        const w = cards[0].offsetWidth + 10;
        setActive(Math.round(track.scrollLeft / w));
      };
      track.addEventListener('scroll', onScroll, { passive: true });
      return () => track.removeEventListener('scroll', onScroll);
    });
  }

  /* ------------------------------------------------------------------------
     6. PEGATINAS ARRASTRABLES (Matter.js)
     ------------------------------------------------------------------------ */
  function stickers() {
    const box = $('#stickers');
    if (!window.Matter || !box || stickers.done) return;
    stickers.done = true;
    const { Engine, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    box.insertAdjacentHTML('beforeend', STICKERS.map((s) => {
      if (s.src) return `<div class="sticker sticker--img" data-cursor="¡Arrástrame!"><img src="${s.src}" alt="" draggable="false"></div>`;
      return `<div class="sticker sticker--text${s.shape === 'pill' ? ' sticker--pill' : ''}" data-cursor="¡Arrástrame!" data-boil="s">${esc(s.text)}</div>`;
    }).join(''));
    const els = $$('.sticker', box);

    const engine = Engine.create();
    engine.gravity.y = 1;

    const mouse = Mouse.create(box);
    // Matter bloquea la rueda del ratón: se lo quitamos para que la página siga haciendo scroll
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    mouse.element.removeEventListener('wheel', mouse.mousewheel);
    const grab = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.18, damping: 0.1 } });

    let bodies = [];
    let sizes = [];

    const build = () => {
      Composite.clear(engine.world, false);
      const w = box.clientWidth;
      const h = box.clientHeight;
      const t = 400;
      const walls = [
        Bodies.rectangle(w / 2, h + t / 2, w * 3, t, { isStatic: true }),
        Bodies.rectangle(-t / 2, h / 2 - h * 2, t, h * 6, { isStatic: true }),
        Bodies.rectangle(w + t / 2, h / 2 - h * 2, t, h * 6, { isStatic: true }),
      ];

      sizes = [];
      bodies = els.map((el, i) => {
        const s = STICKERS[i];
        const size = Math.round(Math.min(w, 420) * s.size);
        const x = w * 0.15 + Math.random() * w * 0.7;
        const y = -size - i * size * 0.7;
        const opts = { restitution: 0.4, friction: 0.25, frictionAir: 0.012, angle: (Math.random() - 0.5) * 0.9 };
        if (s.shape === 'pill') {
          const ph = Math.round(size * 0.34);
          el.style.width = `${size}px`; el.style.height = `${ph}px`; el.style.fontSize = `${ph * 0.42}px`;
          sizes.push([size, ph]);
          return Bodies.rectangle(x, y, size, ph, { ...opts, chamfer: { radius: ph / 2 } });
        }
        el.style.width = el.style.height = `${size}px`;
        if (s.text) el.style.fontSize = `${size * 0.24}px`;
        sizes.push([size, size]);
        return Bodies.circle(x, y, size / 2, opts);
      });

      Composite.add(engine.world, [...walls, ...bodies, grab]);
      els.forEach((el) => { el.style.visibility = 'visible'; });
    };

    // La física avanza con el reloj de GSAP y mueve los elementos HTML
    gsap.ticker.add(() => {
      if (document.hidden) return;
      Engine.update(engine, 1000 / 60);
      bodies.forEach((b, i) => {
        const [w, h] = sizes[i];
        els[i].style.transform = `translate(${b.position.x - w / 2}px, ${b.position.y - h / 2}px) rotate(${b.angle}rad)`;
      });
    });

    build();
    let resizeTimer;
    new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 250); }).observe(box);
  }

  /* ------------------------------------------------------------------------
     7. ANIMACIONES CON SCROLL
     ------------------------------------------------------------------------ */
  function scrollAnimations() {
    if (REDUCED) return;

    $$('[data-split]').forEach((el) => {
      if (el.classList.contains('statement')) return;
      const split = splitLines(el);
      gsap.from(split.lines, {
        yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onComplete: () => split.revert(),
      });
    });

    // Texto de "sobre mí": las palabras se van "encendiendo" con el scroll
    const statement = $('[data-words]');
    const words = SplitText.create(statement, { type: 'words', wordsClass: 'word' });
    gsap.fromTo(words.words, { opacity: 0.15 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: statement, start: 'top 80%', end: 'bottom 50%', scrub: true },
    });

    gsap.from('.cv__item, .cv__col h3', {
      y: 24, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.03,
      scrollTrigger: { trigger: '.cv', start: 'top 85%', once: true },
    });

    gsap.from('.contact__email, .contact .side .meta', {
      y: 24, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.06,
      scrollTrigger: { trigger: '.contact', start: 'top 70%', once: true },
    });
  }

  /* ------------------------------------------------------------------------
     8. NAVEGACIÓN INFERIOR (pastilla con indicador rosa)
     ------------------------------------------------------------------------ */
  function pillNav() {
    const links = $$('.pill__link');
    const indicator = $('.pill__indicator');
    let current = 0;

    const setActive = (i) => {
      if (i === current) return;
      current = i;
      links.forEach((l, j) => l.classList.toggle('is-active', j === i));
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .to(indicator, { xPercent: i * 100, duration: 0.8 })
        .to(indicator, { scaleX: 1.12, duration: 0.25, ease: 'power2.out' }, 0)
        .to(indicator, { scaleX: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }, 0.25);
    };

    ScrollTrigger.create({ trigger: '#sobre-mi', start: 'top 60%', end: 'bottom 60%', onToggle: (s) => s.isActive && setActive(1), onLeaveBack: () => setActive(0) });
    ScrollTrigger.create({ trigger: '#contacto', start: 'top 60%', end: () => ScrollTrigger.maxScroll(window) + 100, onToggle: (s) => s.isActive && setActive(2) });
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => gsap.set('.pill__progress', { scaleX: s.progress }) });
  }

  /* ------------------------------------------------------------------------
     9. MICROINTERACCIONES
     ------------------------------------------------------------------------ */

  // Foto → alter ego animado (hover en ordenador, toque en móvil)
  function heroCard() {
    const card = $('.hero__card');
    const video = $('.hero__alter');
    const play = () => {
      if (!video.src) video.src = PROFILE.alterEgo.src;
      video.play().catch(() => {});
    };
    if (CAN_HOVER) {
      card.addEventListener('mouseenter', play);
      card.addEventListener('mouseleave', () => video.pause());
    } else {
      card.addEventListener('click', () => {
        card.classList.toggle('is-alter');
        card.classList.contains('is-alter') ? play() : video.pause();
      });
    }
  }

  // Cursor con etiqueta ("Ver", "¡Arrástrame!"…)
  function cursor() {
    if (!CAN_HOVER) return;
    const el = $('.cursor');
    const label = $('.cursor__label');
    const xTo = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3.out' });
    window.addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); el.classList.remove('is-hidden'); });
    document.addEventListener('mouseleave', () => el.classList.add('is-hidden'));
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) { label.textContent = t.dataset.cursor; el.classList.add('is-big'); }
    });
    document.addEventListener('mouseout', (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t && !t.contains(e.relatedTarget)) el.classList.remove('is-big');
    });
  }

  // Botón de email "magnético"
  function magnetic() {
    if (!CAN_HOVER || REDUCED) return;
    $$('.magnetic').forEach((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.25);
      });
      btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' }));
    });
  }

  // Modo claro / oscuro
  function themeToggle() {
    const btn = $('#theme-toggle');
    const root = document.documentElement;
    const label = () => { btn.textContent = root.dataset.theme === 'dark' ? 'Modo claro' : 'Modo oscuro'; };
    label();
    btn.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
      label();
    });
  }

  function toast(msg) {
    const t = $('.toast');
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove('is-on'), 2200);
  }

  function copyEmail() {
    $('#copy-email').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(PROFILE.email);
        toast('Email copiado ✓');
      } catch (e) {
        location.href = `mailto:${PROFILE.email}`;
      }
    });
  }

  // Hora de Barcelona
  function clock() {
    const fmt = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit' });
    const tick = () => { $('#clock').textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 15000);
  }

  /* ------------------------------------------------------------------------
     10. VISTA DE PROYECTO (#/proyecto/slug)
     ------------------------------------------------------------------------ */
  const overlay = $('.project');
  const scroller = $('.project__scroller');
  const content = $('.project__content');
  const wipe = $('.project__wipe');
  let lastFocus = null;
  let mediaObserver = null;

  const mediaHTML = (m) => {
    const wide = m.w / m.h > 1.3 ? ' is-wide' : '';
    const inner = m.type === 'video'
      ? `<video src="${m.src}" muted loop playsinline preload="metadata" width="${m.w}" height="${m.h}"></video>`
      : `<img class="fade-img" src="${m.src}" alt="" loading="lazy" decoding="async" width="${m.w}" height="${m.h}">`;
    return `<figure class="p-media${wide}">${inner}</figure>`;
  };

  function renderProject(p, i) {
    const next = PROJECTS[(i + 1) % PROJECTS.length];
    content.innerHTML = `
      <header class="p-head">
        <dl class="p-head__meta meta">
          <div><dt>Proyecto:</dt><dd>${pad(i + 1)}/${pad(PROJECTS.length)}</dd></div>
          <div><dt>Disciplina:</dt><dd>${tagNames(p)}</dd></div>
          ${p.year ? `<div><dt>Año:</dt><dd>${p.year}</dd></div>` : ''}
          ${p.role ? `<div><dt>Contexto:</dt><dd>${esc(p.role)}</dd></div>` : ''}
        </dl>
        <div class="p-head__body">
          <h2 class="p-head__title" id="project-title">${esc(p.title)}</h2>
          <p class="p-head__kicker">${esc(p.kicker)}</p>
        </div>
      </header>

      <div class="p-cover">${mediaHTML(p.cover).replace('loading="lazy"', 'loading="eager"')}</div>

      ${p.blocks.map((b) => {
        const hasInfo = b.title || b.text || b.credit;
        const media = p.blocks.length === 1 ? b.media.filter((m) => m.src !== p.cover.src) : b.media;
        return `
        <section class="p-block${hasInfo ? '' : ' p-block--no-info'}">
          ${hasInfo ? `
          <div class="p-block__info">
            ${b.title ? `<h3 class="p-block__title">${esc(b.title)}</h3>` : ''}
            ${b.subtitle ? `<p class="p-block__subtitle">${esc(b.subtitle)}</p>` : ''}
            ${b.credit ? `<p class="p-block__credit">${esc(b.credit)}</p>` : ''}
            ${b.text ? `<div class="p-block__text">${b.text.map((t) => `<p>${esc(t)}</p>`).join('')}</div>` : ''}
          </div>` : ''}
          <div class="p-block__media">${media.map(mediaHTML).join('')}</div>
        </section>`;
      }).join('')}

      <a class="p-next" href="#/proyecto/${next.slug}" data-cursor="Siguiente">
        <span class="p-next__label">Siguiente proyecto</span>
        <span class="p-next__title">${esc(next.title)} <em>→</em></span>
      </a>`;

    $$('.fade-img', content).forEach((im) => {
      if (im.complete) im.classList.add('is-loaded');
      else im.addEventListener('load', () => im.classList.add('is-loaded'), { once: true });
    });

    mediaObserver?.disconnect();
    mediaObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const v = $('video', target);
        if (v) isIntersecting ? v.play().catch(() => {}) : v.pause();
        if (isIntersecting && !target.dataset.shown && !REDUCED) {
          target.dataset.shown = '1';
          gsap.fromTo(target, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out' });
        }
      });
    }, { root: scroller, threshold: 0.12 });
    $$('.p-media', content).forEach((m) => mediaObserver.observe(m));
  }

  function openProject(slug) {
    const i = PROJECTS.findIndex((p) => p.slug === slug);
    if (i < 0) return;
    const p = PROJECTS[i];
    const alreadyOpen = !overlay.hidden;
    if (!alreadyOpen) lastFocus = document.activeElement;

    overlay.hidden = false;
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    document.title = `${p.title} — Ayleeeeta`;

    const swap = () => {
      renderProject(p, i);
      scroller.scrollTop = 0;
      gsap.set(scroller, { autoAlpha: 1 });
      $('.project__close').focus({ preventScroll: true });
    };

    if (REDUCED) { swap(); gsap.set(wipe, { autoAlpha: 0 }); return; }

    gsap.timeline()
      .set(wipe, { autoAlpha: 1, clipPath: 'inset(100% 0 0 0)' })
      .set(scroller, { autoAlpha: alreadyOpen ? 1 : 0 })
      .to(wipe, { clipPath: 'inset(0% 0 0 0)', duration: 0.7, ease: 'expo.inOut' })
      .add(swap)
      .to(wipe, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' })
      .from('.p-head__title, .p-head__kicker, .p-head__meta > div', { yPercent: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.05 }, '-=0.45')
      .from('.p-cover', { clipPath: 'inset(12% 0 0 0)', duration: 1.2, ease: 'expo.out' }, '<0.1');
  }

  function closeProject() {
    if (overlay.hidden) return;
    if (location.hash.startsWith('#/')) history.pushState('', '', location.pathname + location.search);
    document.title = 'Ayleeeeta — Ayla Cano · Diseño gráfico, ilustración y motion';

    const done = () => {
      overlay.hidden = true;
      content.innerHTML = '';
      mediaObserver?.disconnect();
      document.documentElement.style.overflow = '';
      lenis?.start();
      lastFocus?.focus?.({ preventScroll: true });
    };

    if (REDUCED) return done();

    gsap.timeline({ onComplete: done })
      .set(wipe, { autoAlpha: 1, clipPath: 'inset(100% 0 0 0)' })
      .to(wipe, { clipPath: 'inset(0% 0 0 0)', duration: 0.6, ease: 'expo.inOut' })
      .set(scroller, { autoAlpha: 0 })
      .to(wipe, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'expo.inOut' });
  }

  function openFromHash() {
    const m = location.hash.match(/^#\/proyecto\/([\w-]+)/);
    if (m) openProject(m[1]);
    else closeProject();
  }

  window.addEventListener('hashchange', openFromHash);
  $('.project__close').addEventListener('click', closeProject);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProject(); });

  /* ------------------------------------------------------------------------
     ARRANQUE
     ------------------------------------------------------------------------ */
  naiveLetters();
  lineBoil();
  logoAnimation();
  carousel();
  pillNav();
  heroCard();
  cursor();
  magnetic();
  themeToggle();
  copyEmail();
  clock();
  intro();
})();
