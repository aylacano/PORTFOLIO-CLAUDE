/* ==========================================================================
   SONIDOS DE LA WEB
   --------------------------------------------------------------------------
   Todos los sonidos se generan aquí con Web Audio: no hay archivos de audio.
   Estilo limpio, como los kits de sonidos de interfaz (p. ej. SND "sine"):
   tonos suaves y cortos, todas las notas de una misma escala pentatónica
   (así siempre suenan bien juntas) y un poco de reverb para darles aire.
   Los que suenan más a menudo (scroll, pasar el ratón) son los más flojos.
   Están apagados al entrar; se encienden con el botón del altavoz y la web
   recuerda la elección.
   · VOLUMEN: cambia MASTER (0 = nada, 1 = máximo)
   · AIRE: REVERB es cuánta reverb llevan (0 = nada)
   · Para retocar un sonido, cambia sus números (notas de SCALE, tiempos en
     segundos, "peak" = volumen de ese sonido)
   ========================================================================== */

const SFX = (() => {
  const MASTER = 0.5;
  const REVERB = 0.18;
  // Pentatónica de Do (C4 D4 E4 G4 A4 C5 D5 E5 G5 A5)
  const SCALE = [261.6, 293.7, 329.6, 392, 440, 523.3, 587.3, 659.3, 784, 880];
  let ctx = null, out = null, verb = null;
  let on = false;
  try { on = localStorage.getItem('sound') === 'on'; } catch (e) {}

  const setup = () => {
    if (ctx) return ctx.state === 'suspended' ? ctx.resume() : null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.connect(ctx.destination);
    out = ctx.createGain();
    out.gain.value = MASTER;
    out.connect(comp);
    // Reverb corta y suave: una "sala" pequeña generada con ruido que se apaga
    const len = Math.round(ctx.sampleRate * 1.2);
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    }
    const conv = ctx.createConvolver();
    conv.buffer = ir;
    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = 3500;
    verb = ctx.createGain();
    verb.gain.value = REVERB;
    verb.connect(conv).connect(tone).connect(out);
  };

  // El navegador solo deja sonar audio después de un clic o una tecla
  const unlock = () => { if (on) setup(); };
  ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => window.addEventListener(ev, unlock, { passive: true }));

  const ready = () => on && ctx && ctx.state === 'running' && !document.hidden;

  // Una nota limpia: seno con un armónico suave que se apaga antes (suena a cristal / marimba)
  // f2 = nota final si se desliza · wet = si lleva reverb · bright = cuánto armónico
  const note = ({ f, f2 = f, dur = 0.12, peak = 0.08, delay = 0, wet = true, bright = 0.25, attack = 0.004 }) => {
    const t = ctx.currentTime + delay;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(out);
    if (wet) g.connect(verb);
    [[1, 1], [2, bright], [3.99, bright * 0.25]].forEach(([mult, amp], k) => {
      if (!amp) return;
      const o = ctx.createOscillator();
      const og = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(f * mult, t);
      if (f2 !== f) o.frequency.exponentialRampToValueAtTime(f2 * mult, t + dur * 0.7);
      og.gain.setValueAtTime(amp, t);
      if (k) og.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.4); // los armónicos se apagan antes
      o.connect(og).connect(g);
      o.start(t);
      o.stop(t + dur + 0.05);
    });
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

    // Scroll: un "tic" muy flojo y corto, sin reverb
    tick(speed = 1) {
      if (!ready() || !every('tick', 60)) return;
      note({ f: SCALE[5], dur: 0.03, peak: Math.min(0.02, 0.008 + speed * 0.002), wet: false, bright: 0.1 });
    },

    // Cambio de proyecto: cada proyecto tiene su nota; al avanzar, la melodía sube
    card(i = 0) {
      if (!ready() || !every('card', 100)) return;
      note({ f: SCALE[2 + (i % 7)], dur: 0.35, peak: 0.07 });
    },

    // Pasar el ratón por encima: casi imperceptible
    hover() {
      if (!ready() || !every('hover', 90)) return;
      note({ f: SCALE[7], dur: 0.04, peak: 0.009, wet: false, bright: 0 });
    },

    // Clic: un toque corto
    pop() {
      if (!ready() || !every('pop', 40)) return;
      note({ f: SCALE[6], f2: SCALE[4], dur: 0.07, peak: 0.07, bright: 0.15 });
    },

    // Coger una pegatina: la nota sube
    peel() {
      if (!ready() || !every('peel', 100)) return;
      note({ f: SCALE[3], f2: SCALE[6], dur: 0.14, peak: 0.06, bright: 0.1 });
    },

    // Soltar una pegatina: la nota baja
    release() {
      if (!ready() || !every('release', 100)) return;
      note({ f: SCALE[6], f2: SCALE[3], dur: 0.12, peak: 0.05, bright: 0.1 });
    },

    // Una pegatina cae o choca: un golpe grave y suave (más fuerte cuanto más rápido)
    thud(strength = 1) {
      if (!ready() || !every('thud', 50)) return;
      const peak = Math.min(0.08, 0.01 + strength * 0.007);
      note({ f: vary(130), f2: 98, dur: 0.09, peak, wet: false, bright: 0.05 });
    },

    // Abrir un proyecto: dos notas que suben · cerrarlo: dos que bajan
    whoosh(up = true) {
      if (!ready() || !every('whoosh', 150)) return;
      const [a, b] = up ? [SCALE[4], SCALE[7]] : [SCALE[7], SCALE[4]];
      note({ f: a, dur: 0.18, peak: 0.05 });
      note({ f: b, dur: 0.3, peak: 0.05, delay: 0.07 });
    },

    // Cambiar de tema: interruptor (claro sube, oscuro baja)
    theme(dark) {
      if (!ready()) return;
      const [a, b] = dark ? [SCALE[5], SCALE[3]] : [SCALE[3], SCALE[5]];
      note({ f: a, dur: 0.09, peak: 0.06 });
      note({ f: b, dur: 0.16, peak: 0.06, delay: 0.06 });
    },

    // Algo salió bien (email copiado, sonido activado): tres notas que suben
    chime() {
      if (!ready()) return;
      [SCALE[5], SCALE[7], SCALE[8]].forEach((f, i) => note({ f, dur: 0.45, peak: 0.05, delay: i * 0.08 }));
    },
  };

  function vary(x, amount = 0.06) { return x * (1 + (Math.random() - 0.5) * amount * 2); }
})();
