/**
 * Dynamical Measure Transport — decorative homepage visualization.
 *
 * Left panel: continuous OT-style particle flow rendered on <canvas>.
 * Right panel: discrete transport rendered as a grid of swapping cells.
 *
 * Everything here runs on randomly generated "dummy" data. To drive it with
 * real data later, replace `sampleGaussian`/`buildParticles` (continuous)
 * or `initGrid` (discrete) with your own source/target samples.
 */
(function () {
  'use strict';

  var PALETTE = {
    source: [72, 84, 96], // dark slate — "source" mass
    target: [206, 122, 86], // warm orange — "target" mass
    neutral: [124, 147, 168], // steel blue — bulk/background mass
    muted: [147, 153, 158], // gray — rare cells
  };

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpColor(c1, c2, t) {
    return [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];
  }

  function rgb(c, a) {
    return 'rgba(' + c[0].toFixed(0) + ',' + c[1].toFixed(0) + ',' + c[2].toFixed(0) + ',' + a + ')';
  }

  // Smootherstep easing for organic, non-linear motion.
  function ease(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  // Box-Muller sample from a 2D Gaussian centered at (cx, cy).
  function sampleGaussian(cx, cy, sx, sy) {
    var u1 = Math.random() || 1e-6;
    var u2 = Math.random();
    var mag = Math.sqrt(-2 * Math.log(u1));
    var z0 = mag * Math.cos(2 * Math.PI * u2);
    var z1 = mag * Math.sin(2 * Math.PI * u2);
    return [cx + z0 * sx, cy + z1 * sy];
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------------
  // Continuous panel
  // ---------------------------------------------------------------------
  function initContinuous(canvas) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var count = reduceMotion ? 0 : 260;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width = 0;
    var height = 0;

    function buildParticles() {
      particles = [];
      for (var i = 0; i < count; i++) {
        // Source cloud: broad, lower/central mass. Target cloud: tighter,
        // offset cluster — mimicking mass moving from a diffuse source
        // into a concentrated target region.
        var src = sampleGaussian(width * 0.42, height * 0.6, width * 0.24, height * 0.22);
        var isTarget = Math.random() < 0.18;
        var dst = isTarget
          ? sampleGaussian(width * 0.55, height * 0.28, width * 0.13, height * 0.1)
          : sampleGaussian(width * 0.5, height * 0.55, width * 0.22, height * 0.2);

        particles.push({
          sx: src[0],
          sy: src[1],
          tx: dst[0],
          ty: dst[1],
          curve: (Math.random() - 0.5) * 60,
          phase: Math.random(),
          speed: 0.12 + Math.random() * 0.08,
          radius: 1.1 + Math.random() * 1.6,
          toTarget: isTarget,
        });
      }
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    }

    function drawBackground() {
      var g1 = ctx.createRadialGradient(
        width * 0.42,
        height * 0.6,
        0,
        width * 0.42,
        height * 0.6,
        width * 0.32
      );
      g1.addColorStop(0, 'rgba(124,147,168,0.10)');
      g1.addColorStop(1, 'rgba(124,147,168,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      var g2 = ctx.createRadialGradient(
        width * 0.55,
        height * 0.28,
        0,
        width * 0.55,
        height * 0.28,
        width * 0.2
      );
      g2.addColorStop(0, 'rgba(206,122,86,0.12)');
      g2.addColorStop(1, 'rgba(206,122,86,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);
    }

    var last = 0;
    function frame(now) {
      if (!last) last = now;
      var dt = (now - last) / 1000;
      last = now;

      ctx.clearRect(0, 0, width, height);
      drawBackground();

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var t = (p.phase + now * 0.001 * p.speed) % 1;
        var e = ease(t);

        // Quadratic-bezier-ish bulge perpendicular to the source->target
        // line, so particles sweep along a curved streamline rather than
        // a straight segment.
        var dx = p.tx - p.sx;
        var dy = p.ty - p.sy;
        var len = Math.sqrt(dx * dx + dy * dy) || 1;
        var nx = -dy / len;
        var ny = dx / len;
        var bulge = Math.sin(Math.PI * e) * p.curve;

        var x = lerp(p.sx, p.tx, e) + nx * bulge;
        var y = lerp(p.sy, p.ty, e) + ny * bulge;

        var alpha = 1;
        if (t < 0.06) alpha = t / 0.06;
        else if (t > 0.94) alpha = (1 - t) / 0.06;

        var baseTarget = p.toTarget ? PALETTE.target : PALETTE.neutral;
        var color = lerpColor(PALETTE.source, baseTarget, e);

        ctx.beginPath();
        ctx.fillStyle = rgb(color, (0.15 + 0.7 * alpha).toFixed(2));
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    var raf = null;
    var ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    return {
      start: function () {
        if (!raf) raf = requestAnimationFrame(frame);
      },
      stop: function () {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
        last = 0;
      },
    };
  }

  // ---------------------------------------------------------------------
  // Discrete panel
  // ---------------------------------------------------------------------
  function initDiscrete(container) {
    var cols = 8;
    var rows = 8;
    var cells = [];

    function weightedColor() {
      var r = Math.random();
      if (r < 0.55) return PALETTE.neutral;
      if (r < 0.78) return PALETTE.source;
      if (r < 0.94) return PALETTE.target;
      return PALETTE.muted;
    }

    container.innerHTML = '';
    for (var i = 0; i < cols * rows; i++) {
      var cell = document.createElement('div');
      cell.className = 'transport-viz-cell';
      var c = weightedColor();
      cell.style.backgroundColor = rgb(c, 1);
      container.appendChild(cell);
      cells.push({ el: cell, color: c, row: Math.floor(i / cols), col: i % cols });
    }

    function neighborsOf(idx) {
      var cell = cells[idx];
      var candidates = [];
      [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ].forEach(function (d) {
        var r = cell.row + d[0];
        var c = cell.col + d[1];
        if (r >= 0 && r < rows && c >= 0 && c < cols) candidates.push(r * cols + c);
      });
      return candidates;
    }

    var timer = null;
    function tick() {
      var swaps = 2 + Math.floor(Math.random() * 3);
      for (var s = 0; s < swaps; s++) {
        var a = Math.floor(Math.random() * cells.length);
        var neighbors = neighborsOf(a);
        var b = neighbors[Math.floor(Math.random() * neighbors.length)];

        var tmp = cells[a].color;
        cells[a].color = cells[b].color;
        cells[b].color = tmp;

        cells[a].el.style.backgroundColor = rgb(cells[a].color, 1);
        cells[b].el.style.backgroundColor = rgb(cells[b].color, 1);
      }
      timer = window.setTimeout(tick, 550 + Math.random() * 500);
    }

    return {
      start: function () {
        if (!timer && !reduceMotion) timer = window.setTimeout(tick, 400);
      },
      stop: function () {
        window.clearTimeout(timer);
        timer = null;
      },
    };
  }

  // ---------------------------------------------------------------------
  // Wire-up: pause when off-screen or tab hidden to save CPU/battery.
  // ---------------------------------------------------------------------
  function boot() {
    var section = document.getElementById('transport-viz');
    if (!section) return;

    var canvas = document.getElementById('transport-viz-continuous');
    var grid = document.getElementById('transport-viz-discrete');
    if (!canvas || !grid) return;

    var continuous = initContinuous(canvas);
    var discrete = initDiscrete(grid);

    function play() {
      continuous.start();
      discrete.start();
    }
    function pause() {
      continuous.stop();
      discrete.stop();
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && document.visibilityState === 'visible') play();
          else pause();
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') pause();
      else if (section.getBoundingClientRect().top < window.innerHeight) play();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
