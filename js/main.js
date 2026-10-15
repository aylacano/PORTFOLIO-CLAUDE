/* ==========================================================================
   AYLEEEETA — interacciones
   Librerías: GSAP (+ ScrollTrigger, SplitText) y Lenis (scroll suave).
   ========================================================================== */
(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CAN_HOVER = matchMedia('(hover: hover) and (pointer: fine)').matches;

  gsap.registerPlugin(ScrollTrigger, SplitText);
  history.scrollRestoration = 'manual';

  /* ------------------------------------------------------------------------
     1. PINTAR CONTENIDO desde data.js
     ------------------------------------------------------------------------ */
  const pad = (n) => String(n).padStart(2, '0');
  const tagNames = (p) => p.tags.map((t) => FILTERS[t]).join(', ');
  const esc = (s = '') => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // Imágenes de previsualización de cada proyecto (solo imágenes, máx. 3)
  const previewImages = (p) => {
    if (p.preview) return p.preview.slice(0, 3);
    const all = [p.cover, ...p.blocks.flatMap((b) => b.media)].filter((m) => m.type === 'image');
    return [...new Map(all.map((m) => [m.src, m])).values()].slice(0, 3);
  };

  function renderProfile() {
    const photo = $('.hero__photo');
    photo.src = thumb(PROFILE.photo, 1000);

    $('.contact__email-text').textContent = PROFILE.email;
    $('#mail-link').href = `mailto:${PROFILE.email}`;
    $('#instagram-link').href = PROFILE.instagram;
    $('#year').textContent = new Date().getFullYear();

    $('#cv').innerHTML = Object.entries(PROFILE.cv).map(([title, items]) => `
      <div class="cv__col">
        <h3 class="label">${title}</h3>
        ${items.map(([year, what, where]) => `
          <div class="cv__item">
            <span class="cv__year">${year}</span>
            <span class="cv__what">${what}</span>
            <span class="cv__where">${where}</span>
          </div>`).join('')}
      </div>`).join('');

    $('#tools').innerHTML = PROFILE.tools.map((t) => `<li>${t}</li>`).join('');
    $('#languages').innerHTML = PROFILE.languages.map((t) => `<li>${t}</li>`).join('');
  }

  function renderProjects() {
    $('#project-count').textContent = `(${pad(PROJECTS.length)})`;

    $('#filters').innerHTML = Object.entries(FILTERS)
      .filter(([key]) => key === 'todo' || PROJECTS.some((p) => p.tags.includes(key)))
      .map(([key, name]) => `<button class="filter" type="button" data-filter="${key}" aria-pressed="${key === 'todo'}">${name}</button>`)
      .join('');

    $('#project-list').innerHTML = PROJECTS.map((p, i) => `
      <li class="row" data-tags="${p.tags.join(' ')}">
        <a class="row__link" href="#/proyecto/${p.slug}" data-index="${i}" data-cursor="Ver">
          <span class="row__num">${pad(i + 1)}</span>
          <span class="row__title">${esc(p.title)}</span>
          <span class="row__meta"><strong>${esc(p.kicker)}</strong>${tagNames(p)}${p.year ? ` · ${p.year}` : ''}</span>
          <span class="row__thumb"><img src="${thumb(previewImages(p)[0], 300)}" alt="" loading="lazy" width="84" height="84"></span>
        </a>
      </li>`).join('');

    // Capas de la previsualización flotante (las imágenes se cargan al primer hover)
    $('.preview__inner').innerHTML = PROJECTS.map((p, i) =>
      previewImages(p).map((m, j) => `<img data-src="${thumb(m, 700)}" data-project="${i}" data-step="${j}" alt="">`).join('')
    ).join('');
  }

  renderProfile();
  renderProjects();

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
    else (typeof target === 'number' ? window.scrollTo({ top: target, behavior: 'smooth' }) : $(target).scrollIntoView({ behavior: 'smooth' }));
  };

  // Enlaces internos (#proyectos, #contacto…) con scroll suave
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href.startsWith('#/')) return; // rutas de proyecto
    const target = $(href);
    if (!target) return;
    e.preventDefault();
    if (!$('.project').hidden) closeProject();
    scrollToTarget(href === '#hola' ? 0 : target);
  });

  $('#back-top').addEventListener('click', () => scrollToTarget(0));

  /* ------------------------------------------------------------------------
     3. PRELOADER + ENTRADA
     ------------------------------------------------------------------------ */
  const imageReady = (img) => new Promise((res) => {
    if (img.complete) return res();
    img.addEventListener('load', res, { once: true });
    img.addEventListener('error', res, { once: true });
  });
  const timeout = (ms) => new Promise((res) => setTimeout(res, ms));

  function splitLines(el) {
    return SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
  }

  async function intro() {
    const loader = $('.loader');
    const counter = { v: 0 };

    const eBounce = gsap.to('.loader__word .e', {
      scaleY: 1.35, transformOrigin: '50% 100%', duration: 0.35, ease: 'sine.inOut',
      stagger: { each: 0.08, repeat: -1, yoyo: true },
    });

    const count = gsap.to(counter, {
      v: 100, duration: REDUCED ? 0.2 : 1.8, ease: 'power2.inOut',
      onUpdate: () => { $('.loader__num').textContent = Math.round(counter.v); },
    });

    await Promise.all([
      count.then(),
      Promise.race([Promise.all([document.fonts.ready, imageReady($('.hero__photo'))]), timeout(4000)]),
    ]);

    window.scrollTo(0, 0);
    scrollAnimations(); // después de cargar las fuentes, para medir bien las líneas
    const heroLines = splitLines($('.hero__title'));

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out', duration: 1.2 },
      onComplete: () => {
        heroLines.revert();
        eBounce.kill();
        document.body.classList.remove('is-loading');
        lenis?.start();
        ScrollTrigger.refresh();
        openFromHash();
      },
    });

    tl.to('.loader__word span', { yPercent: -120, opacity: 0, stagger: 0.03, duration: 0.6, ease: 'power3.in' })
      .to('.loader__count', { opacity: 0, duration: 0.3 }, '<')
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '-=0.15')
      .set(loader, { display: 'none' })
      .from('.logo span', { yPercent: 110, opacity: 0, stagger: 0.04 }, '-=0.45')
      .from(heroLines.lines, { yPercent: 110, stagger: 0.08 }, '<')
      .from('.hero__card-inner', { clipPath: 'inset(100% 0 0 0 round 18px)', scale: 1.15, duration: 1.4 }, '<0.1')
      .from('.hero__photo', { scale: 1.4, duration: 1.6 }, '<')
      .from(['.hero__eyebrow', '.hero__card figcaption', '.header__actions'], { opacity: 0, y: 20, stagger: 0.08 }, '<0.3')
      .from('.pill', { yPercent: 160, duration: 1 }, '<');

    if (REDUCED) tl.progress(1);
  }

  /* ------------------------------------------------------------------------
     4. ANIMACIONES CON SCROLL
     ------------------------------------------------------------------------ */
  function scrollAnimations() {
    if (REDUCED) return;

    // Títulos que aparecen línea a línea
    $$('[data-split]').forEach((el) => {
      if (el.classList.contains('hero__title')) return;
      const split = splitLines(el);
      gsap.from(split.lines, {
        yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onComplete: () => split.revert(),
      });
    });

    // Texto de "sobre mí": las palabras se van "encendiendo" con el scroll
    const statement = $('[data-words]');
    const words = SplitText.create(statement, { type: 'words', wordsClass: 'word' });
    gsap.fromTo(words.words, { opacity: 0.15 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: statement, start: 'top 80%', end: 'bottom 45%', scrub: true },
    });

    // Columnas del CV
    gsap.from('.cv__item, .about__tools > *', {
      y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.04,
      scrollTrigger: { trigger: '.about__grid', start: 'top 80%', once: true },
    });

    // Parallax suave de la tarjeta del hero
    gsap.to('.hero__card', {
      yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    // Filas de proyectos
    gsap.from('.row', {
      y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.05,
      scrollTrigger: { trigger: '.work__list', start: 'top 85%', once: true },
    });

    // Botón de email y enlaces de contacto
    gsap.from('.contact__email, .contact__links li', {
      y: 30, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: '.contact__email', start: 'top 90%', once: true },
    });
  }

  /* Cinta infinita que acelera y cambia de sentido con el scroll */
  function marquee() {
    const track = $('.marquee__track');
    track.innerHTML += track.innerHTML; // duplicado para que el bucle no tenga cortes
    if (REDUCED) return;

    const loop = gsap.to(track, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 });
    loop.totalTime(loop.duration() * 100); // margen para poder ir hacia atrás

    ScrollTrigger.create({
      trigger: '.marquee', start: 'top bottom', end: 'bottom top',
      onUpdate(self) {
        const dir = self.direction;
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 6);
        gsap.to(loop, {
          timeScale: dir * boost, duration: 0.2, overwrite: true,
          onComplete: () => gsap.to(loop, { timeScale: dir, duration: 1.2, overwrite: true }),
        });
      },
    });
  }

  /* ------------------------------------------------------------------------
     5. NAVEGACIÓN INFERIOR (pastilla con indicador rosa)
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

    ScrollTrigger.create({ trigger: '#hola', start: 'top top', endTrigger: '#sobre-mi', end: 'bottom 55%', onToggle: (s) => s.isActive && setActive(0) });
    ScrollTrigger.create({ trigger: '#proyectos', start: 'top 55%', end: 'bottom 55%', onToggle: (s) => s.isActive && setActive(1) });
    ScrollTrigger.create({ trigger: '#contacto', start: 'top 55%', end: 'bottom bottom', onToggle: (s) => s.isActive && setActive(2) });

    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => gsap.set('.pill__progress', { scaleX: s.progress }),
    });
  }

  /* ------------------------------------------------------------------------
     6. MICROINTERACCIONES
     ------------------------------------------------------------------------ */

  // El logo y los botones se esconden al bajar y vuelven al subir
  function autoHideHeader() {
    const els = ['.logo', '.header__actions'];
    let hidden = false;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate(self) {
        const hide = self.direction === 1 && self.scroll() > 240;
        if (hide === hidden) return;
        hidden = hide;
        gsap.to(els, { yPercent: hide ? -180 : 0, duration: 0.7, ease: 'expo.out', overwrite: 'auto' });
      },
    });
  }

  // Las "E" del logo se estiran al pasar el ratón
  function logoHover() {
    const es = $$('.logo .e');
    $('.logo').addEventListener('mouseenter', () => {
      gsap.fromTo(es, { scaleY: 1 }, {
        scaleY: 1.45, duration: 0.22, ease: 'power2.out', stagger: 0.05, yoyo: true, repeat: 1, overwrite: true,
      });
    });
  }

  // Tarjeta del hero: inclinación 3D + alter ego animado
  function heroCard() {
    const card = $('.hero__card');
    const inner = $('.hero__card-inner');
    const video = $('.hero__alter');
    const loadVideo = () => {
      if (!video.src) video.src = PROFILE.alterEgo.src;
      video.play().catch(() => {});
    };

    if (CAN_HOVER && !REDUCED) {
      const rx = gsap.quickTo(inner, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const ry = gsap.quickTo(inner, 'rotationY', { duration: 0.6, ease: 'power3.out' });
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ry(x * 14);
        rx(-y * 14);
      });
      card.addEventListener('mouseleave', () => { rx(0); ry(0); video.pause(); });
      card.addEventListener('mouseenter', loadVideo);
    } else {
      // En móvil: tocar para ver el alter ego
      card.addEventListener('click', () => {
        card.classList.toggle('is-alter');
        if (card.classList.contains('is-alter')) loadVideo(); else video.pause();
      });
    }
  }

  // Cursor personalizado con etiqueta ("Ver", "Copiar"…)
  function cursor() {
    if (!CAN_HOVER) return;
    const el = $('.cursor');
    const label = $('.cursor__label');
    const xTo = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3.out' });

    window.addEventListener('mousemove', (e) => { xTo(e.clientX); yTo(e.clientY); el.classList.remove('is-hidden'); });
    document.addEventListener('mouseleave', () => el.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => el.classList.remove('is-hidden'));

    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) { label.textContent = t.dataset.cursor; el.classList.add('is-big'); }
    });
    document.addEventListener('mouseout', (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t && !t.contains(e.relatedTarget)) el.classList.remove('is-big');
    });
  }

  // Botones "magnéticos" que se acercan al cursor
  function magnetic() {
    if (!CAN_HOVER || REDUCED) return;
    $$('.magnetic, .round-btn').forEach((btn) => {
      const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  // Modo claro / oscuro
  function themeToggle() {
    $('#theme-toggle').addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      gsap.fromTo('#theme-toggle svg', { rotate: 0 }, { rotate: 180, duration: 0.6, ease: 'expo.out' });
    });
  }

  // Copiar email + aviso
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

  // Reloj con la hora de Barcelona
  function clock() {
    const fmt = new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit' });
    const tick = () => { $('#clock').textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 15000);
  }

  /* ------------------------------------------------------------------------
     7. LISTA DE PROYECTOS: filtros + previsualización que sigue al cursor
     ------------------------------------------------------------------------ */
  function filters() {
    $('#filters').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      const key = btn.dataset.filter;
      $$('.filter').forEach((b) => b.setAttribute('aria-pressed', b === btn));

      const rows = $$('.row');
      const visible = rows.filter((r) => key === 'todo' || r.dataset.tags.split(' ').includes(key));

      gsap.to(rows, {
        opacity: 0, y: -10, duration: 0.25, ease: 'power2.in', overwrite: true,
        onComplete: () => {
          rows.forEach((r) => { r.hidden = !visible.includes(r); });
          gsap.fromTo(visible, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.04 });
          ScrollTrigger.refresh();
        },
      });
    });
  }

  function projectPreview() {
    if (!CAN_HOVER) return;
    const list = $('#project-list');
    const preview = $('.preview');
    const imgs = $$('.preview__inner img');
    let active = -1;
    let step = 0;
    let cycle = null;
    let loaded = false;

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const cur = { ...pos };
    gsap.set(preview, { x: pos.x, y: pos.y });

    // La imagen persigue al ratón con retraso y se inclina según la velocidad
    gsap.ticker.add(() => {
      const dx = pos.x - cur.x;
      cur.x += dx * 0.12;
      cur.y += (pos.y - cur.y) * 0.12;
      gsap.set(preview, { x: cur.x, y: cur.y, rotation: gsap.utils.clamp(-12, 12, dx * 0.06) });
    });
    window.addEventListener('mousemove', (e) => { pos.x = e.clientX; pos.y = e.clientY; });

    const show = (i) => {
      const own = imgs.filter((im) => +im.dataset.project === i);
      imgs.forEach((im) => im.classList.remove('is-on'));
      own[step % own.length]?.classList.add('is-on');
    };

    list.addEventListener('mouseover', (e) => {
      const link = e.target.closest('.row__link');
      if (!link) return;
      if (!loaded) { imgs.forEach((im) => { im.src = im.dataset.src; }); loaded = true; }
      const i = +link.dataset.index;
      if (i === active) return;
      active = i;
      step = 0;
      show(i);
      clearInterval(cycle);
      cycle = setInterval(() => { step++; show(active); }, 900);
      gsap.to(preview, { scale: 1, duration: 0.6, ease: 'expo.out', overwrite: 'auto' });
    });

    list.addEventListener('mouseleave', () => {
      active = -1;
      clearInterval(cycle);
      gsap.to(preview, { scale: 0, duration: 0.45, ease: 'expo.in', overwrite: 'auto' });
    });
  }

  /* ------------------------------------------------------------------------
     8. VISTA DE PROYECTO (#/proyecto/slug)
     ------------------------------------------------------------------------ */
  const overlay = $('.project');
  const scroller = $('.project__scroller');
  const content = $('.project__content');
  const wipe = $('.project__wipe');
  let lastFocus = null;
  let mediaObserver = null;

  const mediaHTML = (m, extraClass = '') => {
    const wide = m.w / m.h > 1.3 ? ' is-wide' : '';
    const inner = m.type === 'video'
      ? `<video src="${m.src}" muted loop playsinline preload="metadata" width="${m.w}" height="${m.h}"></video>`
      : `<img class="fade-img" src="${m.src}" alt="" loading="lazy" decoding="async" width="${m.w}" height="${m.h}">`;
    return `<figure class="p-media${wide}${extraClass}">${inner}</figure>`;
  };

  function renderProject(p, i) {
    const next = PROJECTS[(i + 1) % PROJECTS.length];
    content.innerHTML = `
      <header class="p-head">
        <p class="p-head__num">${pad(i + 1)} / ${pad(PROJECTS.length)}</p>
        <h2 class="p-head__title" id="project-title">${esc(p.title)}</h2>
        <p class="p-head__kicker">${esc(p.kicker)}</p>
        <dl class="p-head__meta">
          <div><dt>Disciplina</dt><dd>${tagNames(p)}</dd></div>
          ${p.year ? `<div><dt>Año</dt><dd>${p.year}</dd></div>` : ''}
          ${p.role ? `<div><dt>Contexto</dt><dd>${esc(p.role)}</dd></div>` : ''}
        </dl>
      </header>

      <div class="p-cover">${mediaHTML(p.cover).replace('loading="lazy"', 'loading="eager"')}</div>

      ${p.blocks.map((b) => {
        const hasInfo = b.title || b.text || b.credit;
        // Evita repetir la portada como primera imagen del bloque
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
          <div class="p-block__media">${media.map((m) => mediaHTML(m)).join('')}</div>
        </section>`;
      }).join('')}

      <a class="p-next" href="#/proyecto/${next.slug}" data-cursor="Siguiente">
        <span class="p-next__label">Siguiente proyecto</span>
        <span class="p-next__title">${esc(next.title)} <em>→</em></span>
      </a>`;

    // Fundido de imágenes al cargar
    $$('.fade-img', content).forEach((im) => {
      if (im.complete) im.classList.add('is-loaded');
      else im.addEventListener('load', () => im.classList.add('is-loaded'), { once: true });
    });

    // Vídeos: solo se reproducen cuando se ven. Medios: aparecen al entrar en pantalla
    mediaObserver?.disconnect();
    mediaObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const v = target.querySelector('video');
        if (v) isIntersecting ? v.play().catch(() => {}) : v.pause();
        if (isIntersecting && !target.dataset.shown && !REDUCED) {
          target.dataset.shown = '1';
          gsap.fromTo(target, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out' });
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
      .from('.p-head > *', { yPercent: 60, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.06 }, '-=0.45')
      .from('.p-cover', { clipPath: 'inset(20% 6% 0 6% round 18px)', duration: 1.3, ease: 'expo.out' }, '<0.1');
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
  marquee();
  pillNav();
  autoHideHeader();
  logoHover();
  heroCard();
  cursor();
  magnetic();
  themeToggle();
  copyEmail();
  clock();
  filters();
  projectPreview();
  intro();
})();
