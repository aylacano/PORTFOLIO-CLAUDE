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

  // Imagen de la tarjeta del carrusel: la portada, o su "poster" si la portada es un vídeo
  const cardImage = (p) => (p.cover.type === 'image' ? p.cover : (p.poster || p.blocks[0].media.find((m) => m.type === 'image')));

  // Rellena un elemento solo si existe en esta página
  const fill = (sel, fn) => { const el = $(sel); if (el) fn(el); };

  function renderProfile() {
    fill('#photos', (el) => { el.innerHTML = PROFILE.photos.map((src, i) => `<img src="${src}" alt="${i ? '' : 'Ayla Cano'}" width="512" height="640"${i ? '' : ' class="is-on"'}>`).join(''); });
    fill('.contact__email-text', (el) => { el.textContent = PROFILE.email; });
    $$('#mail-link, #mail-link-2').forEach((a) => { a.href = `mailto:${PROFILE.email}`; });
    fill('#mail-link-2 span', (el) => { el.textContent = PROFILE.email; el.dataset.text = PROFILE.email; });
    $$('#instagram-link, #instagram-link-2').forEach((a) => { a.href = PROFILE.instagram; });
    fill('#year', (el) => { el.textContent = new Date().getFullYear(); });

    // "Disponible para proyectos — octubre ’26" (se actualiza solo cada mes)
    fill('#available', (el) => {
      const now = new Date();
      const month = now.toLocaleDateString('es-ES', { month: 'long' });
      el.textContent = `${month[0].toUpperCase()}${month.slice(1)} ’${String(now.getFullYear()).slice(2)}`;
    });

    fill('#cv', (el) => {
      el.innerHTML = Object.entries(PROFILE.cv).map(([title, items]) => `
        <div class="cv__col">
          <h3 class="tiny muted">${title}</h3>
          ${items.map(([year, what, where]) => `
            <div class="cv__item">
              <span class="cv__year">${year}</span>
              <span class="cv__what">${what}</span>
              <span class="cv__where">${where}</span>
            </div>`).join('')}
        </div>`).join('');
    });

    fill('#tools', (el) => { el.innerHTML = PROFILE.tools.map((t) => `<li>${t}</li>`).join(''); });
    fill('#languages', (el) => { el.innerHTML = PROFILE.languages.join('<br>'); });

    // Ayleeeeta en "Sobre mí"
    fill('#alter', (el) => {
      $('#alter-title').textContent = ALTER_EGO.title;
      $('#alter-text').textContent = ALTER_EGO.text;
      el.innerHTML = ALTER_EGO.media.map((m) => (m.type === 'video'
        ? `<figure><video src="${m.src}" muted loop playsinline preload="metadata" width="${m.w}" height="${m.h}"></video></figure>`
        : `<figure><img src="${thumb(m)}" alt="" loading="lazy" decoding="async" width="${m.w}" height="${m.h}"></figure>`)).join('');
    });
  }

  function renderCards() {
    if (!$('#track')) return;
    $('#track').innerHTML = PROJECTS.map((p, i) => {
      const still = cardImage(p);
      const isVideo = p.cover.type === 'video';
      // Si no hay imagen (p. ej. RRSS), la tarjeta muestra un fotograma del propio vídeo
      return `
      <a class="card" href="#/proyecto/${p.slug}" data-index="${i}" data-cursor="Ver">
        ${still ? `<img src="${thumb(still, 900)}" alt="${esc(p.title)}" ${i > 3 ? 'loading="lazy"' : ''} decoding="async">` : ''}
        ${isVideo ? `<video muted loop playsinline ${still ? `preload="none" data-src="${p.cover.src}"` : `preload="metadata" src="${p.cover.src}#t=0.5" class="is-still"`}></video>` : ''}
        <span class="card__label"><span>${pad(i + 1)}</span>${esc(p.title)}</span>
      </a>`;
    }).join('');
  }

  renderProfile();
  renderCards();

  /* ------------------------------------------------------------------------
     2. SCROLL SUAVE (Lenis) sincronizado con GSAP
     ------------------------------------------------------------------------ */
  let lenis = null;
  if (!REDUCED) {
    lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1.1 });
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
    if ($('.project') && !$('.project').hidden) closeProject();
    scrollToTarget(href === '#proyectos' || href === '#hola' ? 0 : target);
  });

  $('#back-top')?.addEventListener('click', () => scrollToTarget(0));

  /* ------------------------------------------------------------------------
     3. LOGO: trazo que vibra + las "E" que se pliegan
     ------------------------------------------------------------------------ */

  // La ilustración de carga cambia de "dibujo" ~6 veces por segundo (solo mientras se ve)
  let boilTimer = null;
  function lineBoil() {
    if (REDUCED || !$('[data-boil]')) return;
    let frame = 0;
    boilTimer = setInterval(() => {
      frame = (frame + 1) % 3;
      $$('[data-boil]').forEach((el) => { el.style.filter = `url(#boil-${el.dataset.boil}-${frame})`; });
    }, 170);
  }

  // Las "E" se pliegan recortándose (sin fundidos ni deformaciones): AYLEEEETA → AYLETA
  function collapseEs() {
    return gsap.to($$('.logo .e-extra'), {
      width: 0, duration: 0.45, ease: 'power2.inOut', stagger: { each: 0.06, from: 'end' }, overwrite: true,
    });
  }

  function expandEs() {
    return gsap.to($$('.logo .e-extra'), {
      width: (i, el) => el.scrollWidth, duration: 0.45, ease: 'power2.inOut', stagger: 0.06, overwrite: true,
      onComplete: () => gsap.set($$('.logo .e-extra'), { clearProps: 'width' }),
    });
  }

  function logoAnimation() {
    const logo = $('.logo');
    let collapsed = false;
    let hovering = false;
    const set = (c) => {
      if (c === collapsed) return;
      collapsed = c;
      c ? collapseEs() : expandEs();
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
    let seen = false;
    try { seen = sessionStorage.getItem('ayleeeeta-intro') === '1'; sessionStorage.setItem('ayleeeeta-intro', '1'); } catch (e) {}
    const loader = $('.loader');
    const showLoader = loader && !seen && !REDUCED;

    if (showLoader) {
      const counter = { v: 0 };
      const count = gsap.to(counter, {
        v: 100, duration: 1.4, ease: 'power2.inOut',
        onUpdate: () => { $('.loader__num').textContent = Math.round(counter.v); },
      });
      await Promise.all([
        count.then(),
        Promise.race([Promise.all([document.fonts.ready, imageReady($('.loader__img'))]), timeout(3500)]),
      ]);
    } else {
      if (loader) loader.style.display = 'none';
      await Promise.race([document.fonts.ready, timeout(1200)]);
    }

    if (!location.hash.startsWith('#') || location.hash.startsWith('#/')) window.scrollTo(0, 0);
    scrollAnimations(); // después de cargar las fuentes, para medir bien las líneas
    const statement = $('.statement');
    const lines = statement ? splitLines(statement) : null;

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out', duration: 1 },
      onComplete: () => {
        lines?.revert();
        clearInterval(boilTimer);
        document.body.classList.remove('is-loading');
        lenis?.start();
        ScrollTrigger.refresh();
        stickers();
        openFromHash();
      },
    });

    if (showLoader) {
      tl.to('.loader__img, .loader__count', { yPercent: -40, opacity: 0, stagger: 0.05, duration: 0.45, ease: 'power3.in' }, '+=0.15')
        .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'expo.inOut' }, '-=0.1')
        .set('.loader', { display: 'none' });
    }
    const has = (sel) => $$(sel).length > 0;
    tl.from('.topbar', { yPercent: -100, duration: 0.7 }, showLoader ? '-=0.35' : 0)
      .from('.logo span', { yPercent: 110, opacity: 0, stagger: 0.03 }, '<0.1');
    if (lines) tl.from(lines.lines, { yPercent: 110, stagger: 0.06 }, '<');
    if (has('.hero__card')) tl.from('.hero__card', { clipPath: 'inset(100% 0 0 0)', duration: 1.1 }, '<0.1');
    if (has('.card')) tl.from('.card', { y: 50, opacity: 0, stagger: 0.04 }, '<0.1');
    if (has('.page .side__sticky')) tl.from('.page .side__sticky > *', { y: 16, opacity: 0, stagger: 0.04, duration: 0.8 }, '<0.1');
    if (has('.lab__item')) tl.from('.lab__item', { y: 40, opacity: 0, stagger: 0.025, duration: 0.9 }, '<');
    tl.from('.side .meta, .main__row, .work__info, .stickers__hint, .dot', { opacity: 0, y: 10, stagger: 0.02, duration: 0.7 }, '<0.15');

    if (REDUCED) tl.progress(1);
  }

  /* ------------------------------------------------------------------------
     5. CARRUSEL HORIZONTAL (la portada se queda fija y el scroll pasa proyectos)
     ------------------------------------------------------------------------ */
  function carousel() {
    const track = $('#track');
    if (!track) return;
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
          trigger: '.home', start: 'top top', end: () => `+=${(n - 1) * innerHeight * 0.32}`,
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

    // Móvil: los proyectos van en vertical; el vídeo se reproduce cuando la tarjeta se ve
    mm.add(`not all and ${DESKTOP}`, () => {
      const io = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) setActive(+target.dataset.index);
      }), { threshold: 0.6 });
      cards.forEach((c) => io.observe(c));
      return () => io.disconnect();
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

    box.insertAdjacentHTML('beforeend', STICKERS.map((s) => `
      <div class="sticker${s.outline ? ' sticker--outline' : ''}" data-cursor="¡Arrástrame!"${s.src.endsWith('.png') ? ' data-boil="s"' : ''}>
        <img src="${s.src}" alt="" draggable="false">
      </div>`).join(''));
    const els = $$('.sticker', box);

    const engine = Engine.create({ enableSleeping: true });
    engine.gravity.y = 1;
    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);

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
        const ph = Math.round(size * (s.h / s.w));
        el.style.width = `${size}px`;
        el.style.height = `${ph}px`;
        sizes.push([size, ph]);
        if (s.shape === 'circle') return Bodies.circle(x, y, Math.min(size, ph) / 2, opts);
        return Bodies.rectangle(x, y, size, ph, { ...opts, chamfer: { radius: Math.min(size, ph) * 0.12 } });
      });

      Composite.add(engine.world, [...walls, ...bodies, grab]);
      els.forEach((el) => { el.style.visibility = 'visible'; });
    };

    // La física avanza con el reloj de GSAP y mueve los elementos HTML
    gsap.ticker.add(() => {
      if (document.hidden || !visible) return;
      Engine.update(engine, 1000 / 60);
      bodies.forEach((b, i) => {
        if (b.isSleeping) return; // quieta: no hace falta moverla
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
    if (statement) {
      const words = SplitText.create(statement, { type: 'words', wordsClass: 'word' });
      gsap.fromTo(words.words, { opacity: 0.15 }, {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: statement, start: 'top 85%', end: 'bottom 55%', scrub: true },
      });
    }

    if ($('.cv')) {
      gsap.from('.cv__item, .cv__col h3', {
        y: 24, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.03,
        scrollTrigger: { trigger: '.cv', start: 'top 85%', once: true },
      });
    }

    if ($('.contact')) {
      gsap.from('.contact__email, .contact .side .meta', {
        y: 24, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.06,
        scrollTrigger: { trigger: '.contact', start: 'top 70%', once: true },
      });
    }
  }

  /* ------------------------------------------------------------------------
     8. MENÚ SUPERIOR (sección activa + progreso)
     ------------------------------------------------------------------------ */
  function topNav() {
    const links = $$('.topnav a');
    const page = { home: 0, lab: 1, about: 2 }[document.body.dataset.page] ?? 0;
    const setActive = (i) => links.forEach((l, j) => l.classList.toggle('is-active', j === i));
    if ($('#contacto')) {
      ScrollTrigger.create({
        trigger: '#contacto', start: 'top 60%', end: () => ScrollTrigger.maxScroll(window) + 100,
        onToggle: (s) => setActive(s.isActive ? 3 : page),
      });
    }
    // Línea de progreso bajo la barra superior
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => gsap.set('.topbar__progress', { scaleX: s.progress }) });
  }

  /* ------------------------------------------------------------------------
     9. MICROINTERACCIONES
     ------------------------------------------------------------------------ */

  // Fotos de perfil alternándose como un stop-motion (más rápido al pasar el ratón)
  function photos() {
    const imgs = $$('#photos img');
    if (imgs.length < 2 || REDUCED) return;
    let i = 0;
    let speed = 450;
    const step = () => {
      imgs[i].classList.remove('is-on');
      i = (i + 1) % imgs.length;
      imgs[i].classList.add('is-on');
      timer = setTimeout(step, speed);
    };
    let timer = setTimeout(step, speed);
    $('#photos').addEventListener('mouseenter', () => { speed = 160; });
    $('#photos').addEventListener('mouseleave', () => { speed = 450; });
  }

  // Vídeos de "Sobre mí": solo se reproducen cuando se ven
  function alterVideos() {
    const io = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
      isIntersecting ? target.play().catch(() => {}) : target.pause();
    }), { threshold: 0.2 });
    $$('#alter video').forEach((v) => io.observe(v));
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

  // Modo claro / oscuro (interruptor)
  function themeToggle() {
    const btn = $('#theme-toggle');
    const root = document.documentElement;
    const sync = () => btn.setAttribute('aria-checked', root.dataset.theme === 'dark');
    sync();
    btn.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
      sync();
    });
  }

  // Sonido: de momento solo cambia el icono (lo activaremos más adelante)
  function soundToggle() {
    const btn = $('#sound-toggle');
    btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', on);
      toast(on ? 'Sonido: muy pronto 🔊' : 'Sonido desactivado');
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
    $('#copy-email')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(PROFILE.email);
        toast('Email copiado ✓');
      } catch (e) {
        location.href = `mailto:${PROFILE.email}`;
      }
    });
  }

  // Hora de Madrid
  function clock() {
    const fmt = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit' });
    if (!$('#clock')) return;
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

      <div class="p-cover${p.cover.h > p.cover.w ? ' p-cover--tall' : ''}">${mediaHTML(p.cover).replace('loading="lazy"', 'loading="eager"')}</div>

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
    if (!overlay) {
      if (location.hash.length > 1 && !location.hash.startsWith('#/') && $(location.hash)) scrollToTarget(location.hash);
      return;
    }
    const m = location.hash.match(/^#\/proyecto\/([\w-]+)/);
    if (m) openProject(m[1]);
    else {
      closeProject();
      // Llegada desde otra página con #contacto, #sobre-mi…
      if (location.hash.length > 1 && !location.hash.startsWith('#/') && $(location.hash)) scrollToTarget(location.hash);
    }
  }

  if (overlay) {
    window.addEventListener('hashchange', openFromHash);
    $('.project__close').addEventListener('click', closeProject);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProject(); });
  }

  /* ------------------------------------------------------------------------
     11. LAB: todos los proyectos en una cuadrícula + visor
     ------------------------------------------------------------------------ */
  function lab() {
    const grid = $('#lab');
    if (!grid || typeof LAB === 'undefined') return;

    // Convierte los grupos de lab-data.js en una lista de piezas
    const groups = LAB.map((g) => {
      if (g.project) {
        const p = PROJECTS.find((x) => x.slug === g.project);
        if (!p) return [];
        const pool = [p.poster, p.cover, ...p.blocks.flatMap((b) => b.media)].filter(Boolean);
        const images = pool.filter((m) => m.type === 'image');
        const media = (images.length ? images : pool).filter((m, i, arr) => arr.findIndex((x) => x.src === m.src) === i).slice(0, g.count);
        return media.map((m) => ({ m, title: p.title, kicker: p.kicker, year: p.year, tags: p.tags, link: `index.html#/proyecto/${p.slug}` }));
      }
      return g.media.map((m) => ({ m, title: g.title, kicker: g.kicker, year: g.year, tags: g.tags }));
    });
    // Intercala los proyectos (1.ª pieza de cada uno, luego la 2.ª…) para que la cuadrícula quede variada
    const items = [];
    for (let r = 0; groups.some((g) => g[r]); r++) groups.forEach((g) => { if (g[r]) items.push(g[r]); });

    grid.innerHTML = items.map((it, i) => `
      <figure class="lab__item" data-index="${i}" data-tags="${it.tags.join(' ')}" data-cursor="${it.link ? 'Ver proyecto' : 'Ampliar'}" tabindex="0" role="button" aria-label="${esc(it.title)}">
        <div class="lab__media" style="aspect-ratio: ${it.m.w} / ${it.m.h}">
          ${it.m.type === 'video'
            ? `<video src="${it.m.src}#t=0.5" muted loop playsinline preload="metadata"></video>`
            : `<img src="${thumb(it.m, 700)}" alt="" loading="lazy" decoding="async">`}
        </div>
        <figcaption class="tiny"><span>${esc(it.title)}</span><span class="muted">${it.year || ''}</span></figcaption>
      </figure>`).join('');

    // Filtros por disciplina
    const used = Object.keys(FILTERS).filter((k) => items.some((it) => it.tags.includes(k)));
    $('#lab-filters').innerHTML = ['todo', ...used].map((k) => `<button type="button" data-filter="${k}" aria-pressed="${k === 'todo'}">${k === 'todo' ? 'Todo' : FILTERS[k]}</button>`).join('');
    const els = $$('.lab__item', grid);
    const count = () => { $('#lab-count').textContent = els.filter((el) => !el.hidden).length; };
    count();
    $('#lab-filters').addEventListener('click', (e) => {
      const b = e.target.closest('[data-filter]');
      if (!b) return;
      $$('[data-filter]').forEach((x) => x.setAttribute('aria-pressed', x === b));
      const k = b.dataset.filter;
      els.forEach((el) => { el.hidden = k !== 'todo' && !el.dataset.tags.split(' ').includes(k); });
      count();
      if (!REDUCED) gsap.fromTo(els.filter((el) => !el.hidden), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.02 });
      ScrollTrigger.refresh();
    });

    // Los vídeos de la cuadrícula se mueven solo cuando se ven
    const io = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
      isIntersecting ? target.play().catch(() => {}) : target.pause();
    }), { threshold: 0.3 });
    $$('video', grid).forEach((v) => io.observe(v));

    // Visor
    const box = $('.lightbox');
    const fig = $('.lightbox__figure');
    const cap = $('.lightbox__caption');
    let current = 0;
    const visible = () => els.filter((el) => !el.hidden).map((el) => +el.dataset.index);
    const show = (i) => {
      current = i;
      const it = items[i];
      fig.innerHTML = it.m.type === 'video'
        ? `<video src="${it.m.src}" muted loop playsinline autoplay controls></video>`
        : `<img src="${it.m.src}" alt="${esc(it.title)}">`;
      cap.textContent = [it.title, it.kicker, it.year].filter(Boolean).join(' · ');
    };
    const open = (i) => {
      show(i);
      box.hidden = false;
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
      if (!REDUCED) gsap.fromTo(box, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      $('.lightbox__close').focus({ preventScroll: true });
    };
    const close = () => {
      box.hidden = true;
      fig.innerHTML = '';
      document.documentElement.style.overflow = '';
      lenis?.start();
      els[current]?.focus({ preventScroll: true });
    };
    const step = (d) => {
      const v = visible();
      show(v[(v.indexOf(current) + d + v.length) % v.length]);
    };

    grid.addEventListener('click', (e) => {
      const el = e.target.closest('.lab__item');
      if (!el) return;
      const it = items[+el.dataset.index];
      if (it.link) location.href = it.link;
      else open(+el.dataset.index);
    });
    grid.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.closest('.lab__item')) e.target.click(); });
    $('.lightbox__close').addEventListener('click', close);
    $('.lightbox__nav--prev').addEventListener('click', () => step(-1));
    $('.lightbox__nav--next').addEventListener('click', () => step(1));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
  }

  /* ------------------------------------------------------------------------
     ARRANQUE
     ------------------------------------------------------------------------ */
  lineBoil();
  logoAnimation();
  carousel();
  lab();
  topNav();
  photos();
  alterVideos();
  cursor();
  magnetic();
  themeToggle();
  soundToggle();
  copyEmail();
  clock();
  intro();
})();
