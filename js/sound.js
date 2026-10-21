/* ==========================================================================
   SONIDOS DE LA WEB
   --------------------------------------------------------------------------
   Todos los sonidos se generan aquí con Web Audio: no hay archivos de audio.
   Suenan "analógicos": clics de madera y papel, una tecla de máquina de
   escribir, un interruptor, una kalimba… pasados por un filtro cálido que
   les quita el brillo digital.
   Están apagados al entrar; se encienden con el botón del altavoz y la web
   recuerda la elección.
   · VOLUMEN: cambia MASTER (0 = nada, 1 = máximo)
   · CALIDEZ: WARMTH es el filtro final (más bajo = más apagado y suave)
   · Para retocar un sonido, cambia sus números (frecuencias en Hz, tiempos
     en segundos, "peak" = volumen de ese sonido)
   ========================================================================== */

const SFX = (() => {
  const MASTER = 0.45;
  const WARMTH = 4200;
  let ctx = null, out = null, noise = null;
  let on = false;
  try { on = localStorage.getItem('sound') === 'on'; } catch (e) {}

  const setup = () => {
    if (ctx) return ctx.state === 'suspended' ? ctx.resume() : null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    // Cadena final: saturación suave (como una cinta) → filtro cálido → compresor
    out = ctx.createGain();
    out.gain.value = MASTER;
    const tape = ctx.createWaveShaper();
    const curve = new Float32Array(1024);
    for (let i = 0; i < curve.length; i++) { const x = (i / 1023) * 2 - 1; curve[i] = Math.tanh(x * 1.6) / Math.tanh(1.6); }
    tape.curve = curve;
    const warm = ctx.createBiquadFilter();
    warm.type = 'lowpass';
    warm.frequency.value = WARMTH;
    warm.Q.value = 0.5;
    const comp = ctx.createDynamicsCompressor();
    out.connect(tape).connect(warm).connect(comp).connect(ctx.destination);
    // 1 segundo de ruido para papel, madera y aire
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  };

  // El navegador solo deja sonar audio después de un clic o una tecla
  const unlock = () => { if (on) setup(); };
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => window.addEventListener(ev, unlock, { passive: true }));

  const ready = () => on && ctx && ctx.state === 'running' && !document.hidden;

  // Envolvente: sube rápido a "peak" y cae hasta casi 0 en "dur" segundos
  const env = (g, t, peak, dur, attack = 0.002) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  };

  const vary = (x, amount = 0.06) => x * (1 + (Math.random() - 0.5) * amount * 2);

  // Tono con un poco de deriva (como un aparato que no está perfectamente afinado)
  const tone = ({ type = 'sine', f1, f2 = f1, dur, peak, delay = 0 }) => {
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.detune.value = (Math.random() - 0.5) * 18;
    o.frequency.setValueAtTime(f1, t);
    if (f2 !== f1) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    env(g, t, peak, dur);
    o.connect(g).connect(out);
    o.start(t);
    o.stop(t + dur + 0.03);
  };

  // Ruido filtrado: papel, madera, aire
  const hiss = ({ filter = 'bandpass', f1, f2 = f1, q = 1, dur, peak, delay = 0, attack = 0.002 }) => {
    const t = ctx.currentTime + delay;
    const s = ctx.createBufferSource();
    s.buffer = noise;
    const f = ctx.createBiquadFilter();
    f.type = filter;
    f.Q.value = q;
    f.frequency.setValueAtTime(f1, t);
    if (f2 !== f1) f.frequency.exponentialRampToValueAtTime(f2, t + dur);
    const g = ctx.createGain();
    env(g, t, peak, dur, attack);
    s.connect(f).connect(g).connect(out);
    s.start(t, Math.random() * 0.8);
    s.stop(t + dur + 0.03);
  };

  // Clic físico: un golpecito de ruido (el "tac") + un cuerpo grave (la caja que resuena)
  const knock = ({ f = 1800, q = 4, body = 220, dur = 0.03, peak = 0.08, delay = 0 }) => {
    hiss({ f1: vary(f, 0.1), q, dur, peak, delay });
    tone({ f1: vary(body, 0.08), f2: body * 0.8, dur: dur * 2.2, peak: peak * 0.5, delay });
  };

  // Evita que un mismo sonido se dispare demasiadas veces seguidas
  const last = {};
  const every = (name, ms) => {
    const now = performance.now();
    if (now - (last[name] || 0) < ms) return false;
    last[name] = now;
    return true;
  };

  return {
    get on() { return on; },

    toggle() {
      on = !on;
      try { localStorage.setItem('sound', on ? 'on' : 'off'); } catch (e) {}
      if (on) { setup(); setTimeout(() => this.chime(), 60); }
      return on;
    },

    // Scroll: la carraca de una rueda de madera
    tick(speed = 1) {
      if (!ready() || !every('tick', 50)) return;
      knock({ f: 1500, q: 6, body: 260, dur: 0.018, peak: Math.min(0.045, 0.015 + speed * 0.004) });
    },

    // Cambio de proyecto: el "clac-clac" de un proyector de diapositivas
    card(i = 0) {
      if (!ready() || !every('card', 110)) return;
      const body = 110 * Math.pow(2, (i % 8) / 24);
      knock({ f: 1100, q: 2, body, dur: 0.04, peak: 0.1 });
      knock({ f: 1600, q: 3, body: body * 1.5, dur: 0.03, peak: 0.06, delay: 0.055 });
      hiss({ filter: 'lowpass', f1: 900, dur: 0.12, peak: 0.02, attack: 0.02 });
    },

    // Pasar por encima de algo: un roce de papel muy suave
    hover() {
      if (!ready() || !every('hover', 80)) return;
      hiss({ f1: vary(1400, 0.2), q: 0.9, dur: 0.05, peak: 0.018, attack: 0.012 });
    },

    // Clic: una tecla de máquina de escribir
    pop() {
      if (!ready() || !every('pop', 40)) return;
      knock({ f: 2400, q: 3, body: 180, dur: 0.022, peak: 0.1 });
    },

    // Coger una pegatina: se despega del papel con pequeños chasquidos
    peel() {
      if (!ready() || !every('peel', 120)) return;
      const n = 9;
      for (let i = 0; i < n; i++) {
        const k = i / (n - 1);
        hiss({ f1: vary(500 + k * 1700, 0.15), q: 2.5, dur: 0.02, peak: 0.02 + Math.random() * 0.035, delay: k * 0.2 + Math.random() * 0.012 });
      }
      hiss({ f1: 600, f2: 1600, q: 0.8, dur: 0.24, peak: 0.025, attack: 0.03 });
    },

    // Soltar una pegatina: un toque de papel
    release() {
      if (!ready() || !every('release', 100)) return;
      knock({ f: 900, q: 1.5, body: 150, dur: 0.035, peak: 0.05 });
    },

    // Una pegatina cae o choca: papel grueso contra la mesa
    thud(strength = 1) {
      if (!ready() || !every('thud', 40)) return;
      const peak = Math.min(0.12, 0.012 + strength * 0.01);
      hiss({ filter: 'lowpass', f1: vary(380, 0.2), dur: 0.08, peak });
      tone({ f1: vary(95, 0.15), f2: 60, dur: 0.1, peak: peak * 0.7 });
    },

    // Abrir y cerrar un proyecto: una hoja grande que se desliza
    whoosh(up = true) {
      if (!ready() || !every('whoosh', 150)) return;
      hiss({ f1: up ? 250 : 900, f2: up ? 900 : 250, q: 0.6, dur: 0.45, peak: 0.05, attack: 0.12 });
      hiss({ filter: 'lowpass', f1: 400, dur: 0.3, peak: 0.02, attack: 0.08, delay: 0.05 });
    },

    // Cambiar de tema: un interruptor de la luz (clic al bajar, clac al subir)
    theme(dark) {
      if (!ready()) return;
      knock({ f: dark ? 1300 : 1900, q: 3, body: dark ? 140 : 200, dur: 0.03, peak: 0.1 });
      knock({ f: dark ? 900 : 1400, q: 2, body: dark ? 110 : 160, dur: 0.025, peak: 0.04, delay: 0.035 });
    },

    // Algo salió bien (email copiado, sonido activado): tres notas de kalimba
    chime() {
      if (!ready()) return;
      [392, 494, 587].forEach((f, i) => {
        tone({ type: 'triangle', f1: f, dur: 0.5, peak: 0.05, delay: i * 0.09 });
        tone({ f1: f * 3.01, dur: 0.12, peak: 0.012, delay: i * 0.09 });
        hiss({ f1: 2200, q: 3, dur: 0.012, peak: 0.02, delay: i * 0.09 });
      });
    },
  };
})();
