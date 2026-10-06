/* globe.js — Curious Woods: the earth from space, with the continents where they were.
   Plan: CWVault/claude/Plan-Deep-Time.md, Stage 3. Rulings: Rulings-Sept-2026.md, "Deep time" (6 Oct
   2026): drag turns the globe — tilting for north and south, turning about the pole for east and
   west — and drawing happens only with a drawing tool chosen (none here yet); the continents move
   for real. The data: stories/plates/continents.json (tools/plates-from-gplates.py): pieces of
   continent as they are today, each with a plate, and every plate's rotation sampled through time.
   For a year, every living piece is turned by its plate's rotation (slerped between samples) and
   drawn through an orthographic projection. The fog line (Ideas-Ledger.md, Other labs): the data
   says how sure the positions are by age, and the globe draws accordingly — crisp; latitude firm
   and longitude smeared; ghosts; nothing to draw.

   cwGlobe(host, opts)  → { setTime(ma), time(), view(), turn(lon, lat), grade(), destroy() }

   opts:
     plates   the continents file, or its URL (default '../stories/plates/continents.json')
     coast    today's coastline, the world pyramid's contours file (default
              '../art/maps/world-tiles/contours-0.json'); drawn as a line for the last few million years
     ma       the opening age in millions of years ago (default 0)
     lon, lat the opening view's centre (default 20, 15)
     size     the disc's diameter in CSS px (default: the host's width, at most 560)
     onDraw   function (ms) — how long the last draw took, for the bench
     onGrade  function (grade, sentence) — when the fog grade changes with the age

   Classic script, no dependencies. */
(function () {
  'use strict';

  var CSS = [
    '.cw-globe{position:relative;line-height:0;user-select:none;-webkit-user-select:none;}',
    '.cw-globe canvas{display:block;touch-action:none;cursor:grab;}',
    '.cw-globe.dragging canvas{cursor:grabbing;}'
  ].join('\n');
  var SEA = '#93bed7', SEA_DEEP = '#7fa9c4', LAND = '#8c8366', COAST = '#4a4336', GRAT = 'rgba(42,36,28,0.10)', MAGMA = '#6e2410', MAGMA_GLOW = '#b8471c';

  function cwGlobe(host, opts) {
    opts = opts || {};
    if (!document.getElementById('cw-globe-css')) { var st = document.createElement('style'); st.id = 'cw-globe-css'; st.textContent = CSS; document.head.appendChild(st); }
    host.classList.add('cw-globe');
    var canvas = document.createElement('canvas'); host.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var ma = opts.ma || 0, lon0 = opts.lon != null ? opts.lon : 20, lat0 = opts.lat != null ? opts.lat : 15;
    var data = null, coast = null, pieces = [], plates = {}, ages = [], grades = [], lastGrade = null, destroyed = false, raf = 0, ro = null;
    var D = 0, dpr = 1;

    // ---- geometry ----
    function xyz(lon, lat) { var la = lat * Math.PI / 180, lo = lon * Math.PI / 180; return [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)]; }
    function quat(lat, lon, ang) { var ax = xyz(lon, lat), h = ang * Math.PI / 360, s = Math.sin(h); return [Math.cos(h), ax[0] * s, ax[1] * s, ax[2] * s]; }
    function slerp(a, b, t) {
      var d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
      if (d < 0) { b = [-b[0], -b[1], -b[2], -b[3]]; d = -d; }
      if (d > 0.9995) { var q = [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1]), a[2] + t * (b[2] - a[2]), a[3] + t * (b[3] - a[3])], n = Math.hypot(q[0], q[1], q[2], q[3]); return [q[0] / n, q[1] / n, q[2] / n, q[3] / n]; }
      var th = Math.acos(d), s = Math.sin(th), p = Math.sin((1 - t) * th) / s, r = Math.sin(t * th) / s;
      return [p * a[0] + r * b[0], p * a[1] + r * b[1], p * a[2] + r * b[2], p * a[3] + r * b[3]];
    }
    function qmat(q) {   // a unit quaternion as a 3x3 rotation, row-major
      var w = q[0], x = q[1], y = q[2], z = q[3];
      return [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w),
              2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w),
              2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)];
    }
    function mmul(a, b) {
      var m = new Array(9);
      for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) m[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
      return m;
    }
    function rotZ(deg) { var r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r); return [c, -s, 0, s, c, 0, 0, 0, 1]; }
    // the view: turn the world so (lon0, lat0) faces us; screen x east, y north, z toward the eye
    function viewMatrix() {
      var lo = -lon0 * Math.PI / 180, la = -lat0 * Math.PI / 180;
      var cz = Math.cos(lo), sz = Math.sin(lo), cy = Math.cos(la), sy = Math.sin(la);
      var Rz = [cz, -sz, 0, sz, cz, 0, 0, 0, 1];                 // bring lon0 to the x axis
      var Ry = [cy, 0, sy, 0, 1, 0, -sy, 0, cy];                 // tilt lat0 down to the equator (rotation about y)
      var M = mmul(Ry, Rz);
      // now the facing point is +x; we want it toward the eye (+z): swap axes so screen = (y, z, x)
      return [M[3], M[4], M[5], M[6], M[7], M[8], M[0], M[1], M[2]];
    }
    function plateMatrix(pid, age) {
      var P = plates[pid]; if (!P) return null;
      var f = P.first, qs = P.q, n = qs.length;
      if (age <= ages[f]) return qmat(qs[0]);
      if (age >= ages[f + n - 1]) return qmat(qs[n - 1]);
      for (var k = 0; k < n - 1; k++) {
        var a0 = ages[f + k], a1 = ages[f + k + 1];
        if (age >= a0 && age <= a1) return qmat(slerp(qs[k], qs[k + 1], a1 === a0 ? 0 : (age - a0) / (a1 - a0)));
      }
      return null;
    }

    // ---- the data ----
    function prepare(d) {
      data = d; ages = d.ages; grades = d.grades || [];
      for (var pid in d.plates) { var P = d.plates[pid]; plates[pid] = { first: P.first, q: P.rot.map(function (r) { return quat(r[0], r[1], r[2]); }) }; }
      pieces = d.pieces.map(function (p) {
        return { plate: String(p.plate), from: p.from, to: p.to, rings: p.rings.map(function (ring) {
          var n = ring.length / 2, arr = new Float64Array(n * 3);
          for (var i = 0; i < n; i++) { var v = xyz(ring[2 * i], ring[2 * i + 1]); arr[3 * i] = v[0]; arr[3 * i + 1] = v[1]; arr[3 * i + 2] = v[2]; }
          return arr;
        }) };
      });
      draw();
    }
    function prepareCoast(c) {
      coast = (c['0'] || []).map(function (ring) {
        var arr = new Float64Array(ring.length * 3);
        for (var i = 0; i < ring.length; i++) { var v = xyz(ring[i][0], ring[i][1]); arr[3 * i] = v[0]; arr[3 * i + 1] = v[1]; arr[3 * i + 2] = v[2]; }
        return arr;
      });
      draw();
    }
    function load(src, then) {
      if (!src) return;
      if (typeof src !== 'string') { then(src); return; }
      fetch(src).then(function (r) { return r.json(); }).then(then).catch(function (e) { console.error('globe.js: did not load', src, e); });
    }

    // ---- the fog grade for an age ----
    function gradeFor(age) {
      if (age > 4400) return { grade: 'none', why: 'No map. A ball of melted rock with a skin that keeps sinking; nothing to draw, and nothing survived.' };
      if (data && age > ages[ages.length - 1]) return { grade: 'beyond', why: 'There were continents, but no model reaches back this far. The globe shows nothing rather than a guess.' };
      for (var i = 0; i < grades.length; i++) if (age <= grades[i].to) return grades[i];
      return { grade: 'beyond', why: '' };
    }

    // ---- drawing ----
    function size() {
      var w = host.getBoundingClientRect().width || 400;
      D = Math.round(opts.size || Math.min(w, 560));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = D * dpr; canvas.height = D * dpr; canvas.style.width = D + 'px'; canvas.style.height = D + 'px';
    }
    // a polygon of unit vectors through M, clipped to the disc: a hidden point goes to the limb,
    // and between two hidden points the path walks the limb's shorter arc rather than cutting a
    // chord across the disc (the chord filled a wedge across the globe at 539 Ma, 6 Oct)
    var ARC_STEP = 0.12;   // radians between limb points
    function tracePath(arr, M, cx, cy, r) {
      var n = arr.length / 3, anyFront = false, first = true, prevHidden = false, prevAng = 0;
      for (var i = 0; i < n; i++) {
        var x = arr[3 * i], y = arr[3 * i + 1], z = arr[3 * i + 2];
        var X = M[0] * x + M[1] * y + M[2] * z, Y = M[3] * x + M[4] * y + M[5] * z, Z = M[6] * x + M[7] * y + M[8] * z;
        var hidden = Z < 0;
        if (hidden) {
          var ang = Math.atan2(Y, X);
          if (prevHidden && !first) {
            var d = ang - prevAng; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
            var steps = Math.floor(Math.abs(d) / ARC_STEP);
            for (var k = 1; k <= steps; k++) { var a = prevAng + d * k / (steps + 1); ctx.lineTo(cx + r * Math.cos(a), cy - r * Math.sin(a)); }
          }
          X = Math.cos(ang); Y = Math.sin(ang); prevAng = ang;
        } else anyFront = true;
        var sx = cx + r * X, sy = cy - r * Y;
        if (first) { ctx.moveTo(sx, sy); first = false; } else ctx.lineTo(sx, sy);
        prevHidden = hidden;
      }
      ctx.closePath();
      return anyFront;
    }
    function drawLand(V, age, shift, alpha) {
      var Vs = shift ? mmul(V, rotZ(shift)) : V, mats = {};
      ctx.beginPath();
      var any = false;
      for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];
        if (age > p.from || age < p.to) continue;
        var M = mats[p.plate];
        if (M === undefined) { var R = plateMatrix(p.plate, age); M = R ? mmul(Vs, R) : null; mats[p.plate] = M; }
        if (!M) continue;
        for (var k = 0; k < p.rings.length; k++) if (tracePath(p.rings[k], M, 0, 0, 1)) any = true;
      }
      if (!any) return;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = LAND; ctx.fill('nonzero');
      // one fill, never the pieces outlined one by one (the model's terranes would show as lines):
      // a thin stroke in the land colour closes the hairline gaps between neighbouring pieces
      ctx.strokeStyle = LAND; ctx.lineWidth = 1.6 / (D / 2 - 4); ctx.stroke();
      ctx.globalAlpha = 1;
    }
    function draw() {
      if (destroyed) return;
      var t0 = performance.now();
      if (!D) size();
      var r = D / 2 - 4, cx = D / 2, cy = D / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, D, D);
      var g = gradeFor(ma);
      // the disc
      var sea = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
      if (g.grade === 'none') { sea.addColorStop(0, MAGMA_GLOW); sea.addColorStop(1, MAGMA); }
      else { sea.addColorStop(0, SEA); sea.addColorStop(1, SEA_DEEP); }
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = sea; ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
      var V = viewMatrix();
      // the land, drawn on the unit disc (translate, scale r); tracePath puts north up
      if (data && g.grade !== 'none' && g.grade !== 'beyond') {
        ctx.save(); ctx.translate(cx, cy); ctx.scale(r, r);
        ctx.lineWidth = 1 / r;
        if (g.grade === 'crisp') drawLand(V, ma, 0, 1);
        else if (g.grade === 'latitude') { [-12, -8, -4, 0, 4, 8, 12].forEach(function (s) { drawLand(V, ma, s, 0.2); }); }   // firm north–south, smeared east–west
        else { [-27, -18, -9, 0, 9, 18, 27].forEach(function (s) { drawLand(V, ma, s, 0.14); }); }                          // a ghost
        ctx.restore();
      }
      // today's coast, for the last few million years, fading out by five
      if (coast && ma < 5) {
        ctx.save(); ctx.translate(cx, cy); ctx.scale(r, r); ctx.lineWidth = 1.1 / r; ctx.strokeStyle = COAST; ctx.globalAlpha = 0.6 * (1 - ma / 5);
        ctx.beginPath(); for (var i = 0; i < coast.length; i++) tracePath(coast[i], V, 0, 0, 1); ctx.stroke(); ctx.restore();
      }
      // the graticule, faint, every 30 degrees
      ctx.save(); ctx.translate(cx, cy); ctx.scale(r, r); ctx.lineWidth = 1 / r; ctx.strokeStyle = GRAT; ctx.beginPath();
      for (var la = -60; la <= 60; la += 30) { var ring = []; for (var lo = -180; lo <= 180; lo += 5) { var v = xyz(lo, la); ring.push(v[0], v[1], v[2]); } tracePath(new Float64Array(ring), V, 0, 0, 1); }
      for (var lo2 = -180; lo2 < 180; lo2 += 30) { var ring2 = []; for (var la2 = -90; la2 <= 90; la2 += 5) { var v2 = xyz(lo2, la2); ring2.push(v2[0], v2[1], v2[2]); } tracePath(new Float64Array(ring2), V, 0, 0, 1); }
      ctx.stroke(); ctx.restore();
      ctx.restore();
      // the limb
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(42,36,28,0.35)'; ctx.lineWidth = 1; ctx.stroke();
      var ms = performance.now() - t0;
      if (opts.onDraw) opts.onDraw(ms);
      if (opts.onGrade && g.grade !== lastGrade) { lastGrade = g.grade; opts.onGrade(g.grade, g.why); }
    }
    function schedule() { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }

    // ---- the gesture: drag turns (east–west about the pole) and tilts (north–south) ----
    var drag = null;
    canvas.addEventListener('pointerdown', function (ev) {
      drag = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, lon: lon0, lat: lat0 };
      ev.preventDefault(); try { canvas.setPointerCapture(ev.pointerId); } catch (e) {}
      host.classList.add('dragging');
    });
    canvas.addEventListener('pointermove', function (ev) {
      if (!drag || ev.pointerId !== drag.id) return;
      var k = 180 / (D || 400);   // a drag across the disc turns it half way round
      lon0 = drag.lon - (ev.clientX - drag.x) * k;
      lat0 = Math.max(-89, Math.min(89, drag.lat + (ev.clientY - drag.y) * k));
      schedule();
    });
    function release(ev) { if (drag && ev.pointerId === drag.id) { drag = null; host.classList.remove('dragging'); } }
    canvas.addEventListener('pointerup', release); canvas.addEventListener('pointercancel', release);

    load(opts.plates || '../stories/plates/continents.json', prepare);
    load(opts.coast === undefined ? '../art/maps/world-tiles/contours-0.json' : opts.coast, prepareCoast);
    if (window.ResizeObserver) { ro = new ResizeObserver(function () { size(); schedule(); }); ro.observe(host); }
    size(); draw();

    return {
      setTime: function (m) { ma = Math.max(0, m); schedule(); },
      time: function () { return ma; },
      view: function () { return { lon: lon0, lat: lat0 }; },
      turn: function (lon, lat) { if (lon != null) lon0 = lon; if (lat != null) lat0 = Math.max(-89, Math.min(89, lat)); schedule(); },
      grade: function () { return gradeFor(ma); },
      destroy: function () { destroyed = true; cancelAnimationFrame(raf); if (ro) ro.disconnect(); host.innerHTML = ''; host.classList.remove('cw-globe'); }
    };
  }
  window.cwGlobe = cwGlobe;
})();
