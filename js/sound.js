/* ==========================================================================
   SONIDOS DE LA WEB
   --------------------------------------------------------------------------
   Todos los sonidos se generan aquí con Web Audio: no hay archivos de audio.
   Están apagados al entrar; se encienden con el botón del altavoz y la web
   recuerda la elección.
   · VOLUMEN: cambia MASTER (0 = nada, 1 = máximo)
   · Para retocar un sonido, cambia sus números (frecuencias en Hz, tiempos
     en segundos, "peak" = volumen de ese sonido)
   ========================================================================== */

const SFX = (() => {
  const MASTER = 0.55;
  let ctx = null, out = null, noise = null;
  let on = false;
  try { on = localStorage.getItem('sound') === 'on'; } catch (e) {}

  const setup = () => {
    if (ctx) return ctx.state === 'suspended' ? ctx.resume() : null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    out = ctx.createGain();
    out.gain.value = MASTER;
    out.connect(comp).connect(ctx.destination);
    // 1 segundo de ruido blanco para los sonidos de papel y aire
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  };

  // El navegador solo deja sonar audio después de un clic o una tecla
  const unlock = () => { if (on) setup(); };
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => window.addEventListener(ev, unlock, { passive: true }));

  const ready = () => on && ctx && ctx.state === 'running' && !document.hidden;

  // Envolvente: sube rápido a "peak" y cae hasta casi 0 en "dur" segundos
  const env = (g, t, peak, dur, attack = 0.004) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  };

  const tone = ({ type = 'sine', f1, f2 = f1, dur, peak, delay = 0 }) => {
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f1, t);
    if (f2 !== f1) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    env(g, t, peak, dur);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + dur + 0.02);
  };

  const hiss = ({ filter = 'bandpass', f1, f2 = f1, q = 1, dur, peak, delay = 0 }) => {
    const t = ctx.currentTime + delay;
    const s = ctx.createBufferSource();
    s.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = filter;
    f.Q.value = q;
    f.frequency.setValueAtTime(f1, t);
    if (f2 !== f1) f.frequency.exponentialRampToValueAtTime(f2, t + dur);
    const g = ctx.createGain();
    env(g, t, peak, dur, 0.01);
    s.connect(f).connect(g).connect(out);
    s.start(t, Math.random() * 0.5);
    s.stop(t + dur + 0.02);
  };

  // Evita que un mismo sonido se dispare demasiadas veces seguidas
  const last = {};
  const every = (name, ms) => {
    const now = performance.now();
    if (now - (last[name] || 0) < ms) return false;
    last[name] = now;
    return true;
  };

  const vary = (x, amount = 0.06) => x * (1 + (Math.random() - 0.5) * amount * 2);

  return {
    get on() { return on; },

    toggle() {
      on = !on;
      try { localStorage.setItem('sound', on ? 'on' : 'off'); } catch (e) {}
      if (on) { setup(); setTimeout(() => this.chime(), 60); }
      return on;
    },

    // Scroll: un "tic" suave, como una rueda dentada
    tick(speed = 1) {
      if (!ready() || !every('tick', 45)) return;
      tone({ type: 'triangle', f1: vary(2200, 0.1), f2: 1500, dur: 0.03, peak: Math.min(0.05, 0.015 + speed * 0.004) });
    },

    // Cambio de proyecto en el carrusel: "clac" de tarjeta, más agudo cuanto más avanzas
    card(i = 0) {
      if (!ready() || !every('card', 90)) return;
      const f = 330 * Math.pow(2, (i % 8) / 12 * 2);
      tone({ type: 'triangle', f1: f * 2, f2: f, dur: 0.12, peak: 0.12 });
      hiss({ filter: 'highpass', f1: 3000, dur: 0.05, peak: 0.05 });
    },

    // Pasar el ratón por encima de algo clicable
    hover() {
      if (!ready() || !every('hover', 70)) return;
      tone({ f1: vary(1300), f2: vary(1700), dur: 0.05, peak: 0.025 });
    },

    // Clic: una burbuja que hace "pop"
    pop() {
      if (!ready() || !every('pop', 40)) return;
      tone({ f1: vary(720), f2: 180, dur: 0.09, peak: 0.16 });
    },

    // Coger una pegatina: sonido de despegarla del papel
    peel() {
      if (!ready() || !every('peel', 80)) return;
      hiss({ f1: 900, f2: 4200, q: 1.4, dur: 0.22, peak: 0.13 });
      tone({ f1: 500, f2: 900, dur: 0.08, peak: 0.04 });
    },

    // Soltar una pegatina
    release() {
      if (!ready() || !every('release', 80)) return;
      tone({ f1: 900, f2: 420, dur: 0.1, peak: 0.07 });
    },

    // Golpe de una pegatina contra el suelo, la pared u otra pegatina
    thud(strength = 1) {
      if (!ready() || !every('thud', 35)) return;
      const peak = Math.min(0.22, 0.02 + strength * 0.018);
      hiss({ filter: 'lowpass', f1: vary(700, 0.2), dur: 0.09, peak });
      tone({ f1: vary(160, 0.15), f2: 70, dur: 0.1, peak: peak * 0.8 });
    },

    // Abrir y cerrar un proyecto: una ráfaga de aire que sube o baja
    whoosh(up = true) {
      if (!ready() || !every('whoosh', 150)) return;
      hiss({ f1: up ? 300 : 2600, f2: up ? 2600 : 300, q: 0.8, dur: 0.38, peak: 0.1 });
    },

    // Cambiar a modo claro (sube) u oscuro (baja)
    theme(dark) {
      if (!ready()) return;
      const [a, b] = dark ? [784, 523] : [523, 784];
      tone({ type: 'triangle', f1: a, dur: 0.12, peak: 0.09 });
      tone({ type: 'triangle', f1: b, dur: 0.18, peak: 0.09, delay: 0.08 });
    },

    // Algo salió bien (email copiado, sonido activado): tres notas que suben
    chime() {
      if (!ready()) return;
      [659, 880, 1319].forEach((f, i) => tone({ f1: f, dur: 0.22, peak: 0.08, delay: i * 0.07 }));
    },
  };
})();
