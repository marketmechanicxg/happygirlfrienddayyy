/**
 * particles.js
 * Single canvas-based system for the "Living Romantic Background": ambient
 * floating flower petals, soft glowing motes, floating heart emoji (with a
 * near/far depth split for parallax), and twinkling sparkles/glitter — all
 * in one rAF loop / one canvas, scaled by perf tier. This is the main
 * reason the page stays smooth on low-end mobile devices even with the
 * extra romantic layers added on top of the original petal system.
 */
(function (window, document) {
  'use strict';

  const OCEAN = window.OCEAN;

  // Soft blush / rose / champagne petal tones.
  const PETAL_COLORS = [
    'rgba(255, 175, 205,',   // blush pink
    'rgba(255, 207, 228,',   // soft pink
    'rgba(243, 207, 158,',   // champagne
    'rgba(255, 235, 224,'    // cream
  ];

  // Floating love emoji — kept to a soft, coordinated palette so nothing
  // reads as a random emoji sticker dropped on top of the design.
  const HEART_EMOJI = ['❤️', '💕', '💗', '💖', '💘', '💝'];

  const supportsCanvasFilter = (function () {
    try {
      const c = document.createElement('canvas').getContext('2d');
      return 'filter' in c;
    } catch (e) { return false; }
  })();

  function initParticles() {
    const canvas = document.getElementById('oceanCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const tier = OCEAN.config.perfTier;
    if (tier === 'off') {
      canvas.style.display = 'none';
      return;
    }

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    // Total ambient particle counts, split across kinds below. Kept close
    // to the original budget per tier so mobile/low-power devices don't
    // pay for the new romantic layers — we just spend the same budget on
    // a richer mix instead of adding more DOM/canvas work overall.
    const COUNTS = { low: 24, mid: 42, high: 64 };
    const particleCount = COUNTS[tier] || 32;

    // Weighted kind mix: petal, heart, mote (soft glow), sparkle (twinkle).
    // Low tier trims hearts/sparkles slightly since emoji glyphs + glow
    // shadows are marginally pricier per-draw than a plain ellipse.
    const KIND_WEIGHTS = {
      low:  { petal: 0.40, heart: 0.24, mote: 0.20, sparkle: 0.16 },
      mid:  { petal: 0.34, heart: 0.30, mote: 0.18, sparkle: 0.18 },
      high: { petal: 0.30, heart: 0.32, mote: 0.18, sparkle: 0.20 }
    };
    const kindWeights = KIND_WEIGHTS[tier] || KIND_WEIGHTS.mid;

    let width, height, dpr;
    let particles = [];
    let rafId = null;
    let running = true;

    // ---- Mouse tracking (desktop / fine-pointer only) — used for the
    // gentle "particles react to the cursor" interaction. ------------------
    let mouseX = -9999, mouseY = -9999;
    let mouseActive = false;
    const enableMouseFx = !isCoarsePointer && tier !== 'low';

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pickKind() {
      const r = Math.random();
      if (r < kindWeights.petal) return 'petal';
      if (r < kindWeights.petal + kindWeights.heart) return 'heart';
      if (r < kindWeights.petal + kindWeights.heart + kindWeights.mote) return 'mote';
      return 'sparkle';
    }

    function makeParticle(overrides) {
      const kind = (overrides && overrides.kind) || pickKind();
      // depth: 0 = far background (small, blurred, slow, dim),
      //        1 = near foreground (bigger, crisp, a touch faster, reacts more)
      const depth = Math.random();

      const base = {
        kind,
        x: Math.random() * width,
        y: -Math.random() * height,
        drift: OCEAN.utils.rand(-10, 10),
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: OCEAN.utils.rand(-0.4, 0.4),
        depth,
        isBurst: false,
        life: null,
        maxLife: null
      };

      if (kind === 'petal') {
        Object.assign(base, {
          r: OCEAN.utils.rand(4, 9),
          speed: OCEAN.utils.rand(6, 16),
          sway: OCEAN.utils.rand(0.3, 0.9),
          swayAmp: OCEAN.utils.rand(18, 42),
          alpha: OCEAN.utils.rand(0.28, 0.6),
          color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0]
        });
      } else if (kind === 'heart') {
        Object.assign(base, {
          emoji: HEART_EMOJI[(Math.random() * HEART_EMOJI.length) | 0],
          r: OCEAN.utils.lerp(10, 22, depth) * OCEAN.utils.rand(0.85, 1.15),
          speed: OCEAN.utils.lerp(3.5, 11, depth),
          sway: OCEAN.utils.rand(0.2, 0.6),
          swayAmp: OCEAN.utils.rand(14, 38),
          alpha: OCEAN.utils.lerp(0.22, 0.6, depth),
          blur: supportsCanvasFilter ? OCEAN.utils.lerp(2.4, 0, depth) : 0,
          mouseInfluence: OCEAN.utils.lerp(0.015, 0.09, depth)
        });
      } else if (kind === 'mote') {
        Object.assign(base, {
          r: OCEAN.utils.rand(0.8, 2.4),
          speed: OCEAN.utils.rand(2, 6),
          sway: OCEAN.utils.rand(0.3, 0.9),
          swayAmp: OCEAN.utils.rand(18, 42),
          alpha: OCEAN.utils.rand(0.35, 0.75),
          mouseInfluence: OCEAN.utils.lerp(0.01, 0.05, depth)
        });
      } else { // sparkle — appears, twinkles, disappears; barely drifts
        Object.assign(base, {
          r: OCEAN.utils.rand(1.1, 2.6),
          speed: 0,
          sway: 0,
          swayAmp: OCEAN.utils.rand(2, 6),
          maxAlpha: OCEAN.utils.rand(0.45, 0.85),
          cycleDur: OCEAN.utils.rand(2.2, 5.5),
          age: Math.random() * OCEAN.utils.rand(2.2, 5.5),
          color: Math.random() > 0.5 ? '255,255,255' : '255,207,228'
        });
      }

      return Object.assign(base, overrides || {});
    }

    function seed() {
      particles = Array.from({ length: particleCount }, makeParticle);
      // Spread initial y (and sparkle age) across the full viewport instead
      // of everything starting above it / in sync.
      particles.forEach((p) => {
        if (p.kind !== 'sparkle') p.y = Math.random() * height;
      });
    }

    let lastT = performance.now();

    function drawPetal(p, x) {
      ctx.save();
      ctx.translate(x, p.y);
      ctx.rotate(p.rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 0.62, 0, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.fill();
      ctx.restore();
    }

    function drawMote(p, x) {
      const grad = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.r * 3.2);
      grad.addColorStop(0, `rgba(255, 235, 224, ${p.alpha})`);
      grad.addColorStop(0.6, `rgba(255, 207, 228, ${p.alpha * 0.3})`);
      grad.addColorStop(1, 'rgba(255, 207, 228, 0)');
      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.arc(x, p.y, p.r * 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawHeart(p, x, alphaMul) {
      const alpha = OCEAN.utils.clamp(p.alpha * (alphaMul == null ? 1 : alphaMul), 0, 1);
      if (alpha <= 0.01) return;
      ctx.save();
      if (p.blur) ctx.filter = `blur(${p.blur}px)`;
      ctx.globalAlpha = alpha;
      ctx.font = `${p.r}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.translate(x, p.y);
      ctx.rotate(p.rot * 0.12); // faint tilt only, keeps hearts readable
      ctx.fillText(p.emoji, 0, 0);
      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.filter = 'none';
    }

    function drawSparkle(p, x, alpha) {
      if (alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = `rgba(${p.color}, ${Math.min(alpha + 0.15, 1)})`;
      ctx.shadowBlur = p.r * 4;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
      ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    }

    function applyMouseReaction(p, x, dt) {
      if (!mouseActive || !p.mouseInfluence) return x;
      const dx = x - mouseX;
      const dy = p.y - mouseY;
      const distSq = dx * dx + dy * dy;
      const radius = 150;
      if (distSq > radius * radius || distSq < 1) return x;
      const dist = Math.sqrt(distSq);
      const force = (1 - dist / radius) * p.mouseInfluence * 60 * dt;
      p.x += (dx / dist) * force;
      p.y += (dy / dist) * force * 0.6;
      return x + (dx / dist) * force;
    }

    function tick(t) {
      if (!running) return;
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.isBurst && p.life != null) {
          p.life -= dt;
          if (p.life <= 0) { particles.splice(i, 1); continue; }
        }

        if (p.kind === 'sparkle') {
          p.age += dt;
          if (p.age >= p.cycleDur) {
            // Respawn a fresh sparkle elsewhere for "appear/disappear
            // randomly" rather than a rigid repeating loop.
            particles[i] = makeParticle({ kind: 'sparkle', x: Math.random() * width, y: Math.random() * height });
            continue;
          }
          p.x += Math.sin(p.phase + p.age) * p.swayAmp * dt * 0.2;
          const cycleT = p.age / p.cycleDur;
          const alpha = Math.sin(cycleT * Math.PI) * p.maxAlpha;
          drawSparkle(p, p.x, alpha);
          continue;
        }

        p.phase += dt * p.sway;
        p.rot += p.rotSpeed * dt;
        p.y += p.speed * dt;
        p.x += p.drift * dt * 0.4;
        if (p.isBurst) {
          // bursts float outward/upward and fade rather than settle
          p.speed -= dt * 22;
        }
        let x = p.x + Math.sin(p.phase) * p.swayAmp;

        if (enableMouseFx) x = applyMouseReaction(p, x, dt);

        if (!p.isBurst && p.y > height + 20) {
          particles[i] = makeParticle({ y: -10 });
          continue;
        }
        if (p.isBurst && (p.y < -40 || p.y > height + 40)) {
          particles.splice(i, 1);
          continue;
        }

        const fadeMul = p.isBurst && p.maxLife ? OCEAN.utils.clamp(p.life / p.maxLife, 0, 1) : 1;

        if (p.kind === 'petal') drawPetal(p, x);
        else if (p.kind === 'heart') drawHeart(p, x, fadeMul);
        else drawMote(p, x);
      }

      rafId = requestAnimationFrame(tick);
    }

    function start() {
      if (rafId) return;
      running = true;
      lastT = performance.now();
      rafId = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    // Generalised burst used both by the existing Girlfriend-Day button
    // reveal and by the new tap/click sparkle-hearts interaction.
    function burstAt(originX, originY, count, opts) {
      opts = opts || {};
      const n = Math.min(count || 14, 26);
      for (let i = 0; i < n; i++) {
        const wantsHeart = opts.hearts !== false && Math.random() > 0.45;
        const wantsSparkle = !wantsHeart && Math.random() > 0.5;
        let kind = 'petal';
        if (wantsHeart) kind = 'heart';
        else if (wantsSparkle) kind = 'sparkle';

        const life = OCEAN.utils.rand(0.7, 1.4);
        particles.push(makeParticle({
          kind,
          x: originX + OCEAN.utils.rand(-6, 6),
          y: originY + OCEAN.utils.rand(-6, 6),
          r: kind === 'heart' ? OCEAN.utils.rand(10, 17) : kind === 'sparkle' ? OCEAN.utils.rand(1.4, 3) : OCEAN.utils.rand(5, 10),
          speed: kind === 'sparkle' ? 0 : OCEAN.utils.rand(-46, -14),
          drift: OCEAN.utils.rand(-60, 60),
          swayAmp: OCEAN.utils.rand(18, 46),
          alpha: kind === 'heart' ? OCEAN.utils.rand(0.5, 0.85) : OCEAN.utils.rand(0.55, 0.9),
          blur: 0,
          isBurst: true,
          life,
          maxLife: life,
          age: 0,
          cycleDur: life,
          maxAlpha: OCEAN.utils.rand(0.6, 0.9),
          color: Math.random() > 0.5 ? '255,255,255' : '255,207,228'
        }));
      }
    }

    resize();
    seed();
    start();

    OCEAN.effects = OCEAN.effects || {};
    OCEAN.effects.burstPetals = burstAt; // kept for existing callers (main.js)
    OCEAN.effects.burstAt = burstAt;

    window.addEventListener('resize', OCEAN.utils.debounce(() => {
      resize();
      seed();
    }, 250));

    // Pause when tab hidden — saves battery, no visible gap on return.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop(); else start();
    });

    // ---- Subtle mouse-follow reaction (desktop / fine pointer only) ------
    if (enableMouseFx) {
      window.addEventListener('pointermove', OCEAN.utils.throttleRaf((e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseActive = true;
      }), { passive: true });
      window.addEventListener('pointerleave', () => { mouseActive = false; });
    }

    // ---- Tap / click: a small handful of hearts & sparkles bloom from the
    // touch point. Passive, non-blocking — never interferes with normal
    // button/link clicks since nothing here calls preventDefault/stopPropagation. ---
    if (!OCEAN.config.prefersReducedMotion) {
      let lastBurst = 0;
      window.addEventListener('pointerdown', (e) => {
        const now = performance.now();
        if (now - lastBurst < 220) return; // avoid overlapping bursts on rapid taps
        lastBurst = now;
        burstAt(e.clientX, e.clientY, tier === 'low' ? 5 : 8);
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
  } else {
    initParticles();
  }
})(window, document);
