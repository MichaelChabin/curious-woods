/* globe.js — Curious Woods: the earth from space, with the continents where they were; or the same
   world flat.
   Plan: CWVault/claude/Plan-Deep-Time.md, Stage 3 and its late additions of 7 Oct 2026. Rulings:
   Rulings-Sept-2026.md, "Deep time" 3 (the standard view: north up at rest, the poles are the limits
   of the tilt, a drag to the right moves the surface east whatever the tilt; drawing only with a
   drawing tool, none here yet). The data: stories/plates/continents.json (tools/plates-from-gplates.py):
   pieces of continent as they are today with their real birth ages, each with a plate, and every
   plate's rotation sampled through the model's reach (a billion years). The amount curve:
   stories/curves/crust-and-land.json.

   The five words of knowing (Ideas-Ledger, *Invented land, honest about it*, 7 Oct), by age:
     measured   to 200 million years: the seafloor's stripes; drawn solid
     inferred   to 540: rock magnetism gives how far north, not how far east; drawn smeared east–west
     fitted     to the model's reach: the pieces are real, the fits argued; drawn as a ghost
     guessed    past the model's reach, while cratons exist (to 4 billion): the real pieces of crust,
                which still exist, placed by the model's last position plus a random slow drift from a
                seed, so that going back the accuracy falls to chance; drawn pale with a dashed edge
     invented   before the oldest rock (4.0 to 4.4 billion): random land from the amount curve, the
                shapes and places made up, only the amount from the rocks; drawn pale with a dotted edge
     none       above 4.4 billion: a ball of melted rock
   and, this side of the deep seam, `ground`: today's coast and the shelf's edge as lines, the ground
   picture itself being the map's (the picture on a sphere is later). The seed holds while the marker
   moves; `reguess()` draws a new seed (the word *another guess*), and every visit begins with its own.

   cwGlobe(host, opts) → { setTime(ma), time(), view(), turn(lon, lat), grade(), reguess(),
                           setProjection(p), projection(), destroy() }
   opts:
     plates, coast, crust   the three files, or their URLs (defaults under ../stories and ../art/maps)
     ma, lon, lat           the opening age (millions of years ago) and view
     projection             'globe' (default) or 'flat' — the same rings, equirectangular on a 2:1 canvas,
                            a drag panning east–west
     size                   the disc's diameter, or the flat map's width, in CSS px (default: the host's width)
     seam                   millions of years; younger than it the grade is `ground` (default 2.6)
     seed                   the first seed (default: this visit's)
     onDraw(ms), onGrade(grade, sentence)
   Classic script, no dependencies. */
(function () {
  'use strict';

  var CSS = [
    '.cw-globe{position:relative;line-height:0;user-select:none;-webkit-user-select:none;}',
    '.cw-globe canvas{display:block;touch-action:none;cursor:grab;}',
    '.cw-globe.dragging canvas{cursor:grabbing;}'
  ].join('\n');
  var SEA = '#93bed7', SEA_DEEP = '#7fa9c4', LAND = '#8c8366', LAND_PALE = '#c3bba5', COAST = '#4a4336', SHELF = '#2f5c78', GRAT = 'rgba(42,36,28,0.10)', MAGMA = '#6e2410', MAGMA_GLOW = '#b8471c';
  var OLDEST_ROCK = 4000, NO_MAP = 4400, DRIFT_DEG_PER_MA = 0.45;   // a plate's few centimetres a year, as degrees of arc
  var GRADE_WORDS = {
    ground:   'This side of the ice ages the ground is the map’s. The globe shows today’s coast and the edge of the shelf; the picture of the ground on a sphere is still to come.',
    measured: 'The seafloor still carries its magnetic stripes, so the plates can be run backwards and measured.',
    inferred: 'Rock magnetism and fossils say how far north each piece was, not how far east. North and south are firm; east and west are one best estimate.',
    fitted:   'These pieces of crust are real and still exist. How they fitted together is argued from scattered evidence, and the models disagree. This is one fit.',
    guessed:  'These pieces of crust are real; you can stand on them today. Where they were, nobody knows. This is a guess; tap another guess, and next time it will be different.',
    invented: 'No rock survives from this time. There was probably some continent, and this much is the rocks’ guess at the amount. The shapes and the places are made up.',
    none:     'No map. A ball of melted rock with a skin that keeps sinking; nothing to draw, and nothing survived.'
  };

  function cwGlobe(host, opts) {
    opts = opts || {};
    if (!document.getElementById('cw-globe-css')) { var st = document.createElement('style'); st.id = 'cw-globe-css'; st.textContent = CSS; document.head.appendChild(st); }
    host.classList.add('cw-globe');
    var canvas = document.createElement('canvas'); host.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var ma = opts.ma || 0, lon0 = opts.lon != null ? opts.lon : 20, lat0 = opts.lat != null ? opts.lat : 15;
    var proj = opts.projection === 'flat' ? 'flat' : 'globe', seam = opts.seam != null ? opts.seam : 2.6;
    var data = null, coast = null, shelf = null, crust = null, pieces = [], plates = {}, ages = [], grades = [], reach = 1000, lastGrade = null, destroyed = false, raf = 0, ro = null;
    var W = 0, H = 0, dpr = 1;
    var seed = opts.seed != null ? opts.seed : ((Date.now() % 1000003) + Math.floor(Math.random() * 1000)), guesses = {}, blobs = null, blobsKey = null;

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
    function qmat(q) {
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
    var IDENT = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    function rotZ(deg) { var r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r); return [c, -s, 0, s, c, 0, 0, 0, 1]; }
    // the view: turn the world so (lon0, lat0) faces us; screen x east, y north, z toward the eye
    function viewMatrix() {
      var lo = -lon0 * Math.PI / 180, la = lat0 * Math.PI / 180;
      var cz = Math.cos(lo), sz = Math.sin(lo), cy = Math.cos(la), sy = Math.sin(la);
      var Rz = [cz, -sz, 0, sz, cz, 0, 0, 0, 1], Ry = [cy, 0, sy, 0, 1, 0, -sy, 0, cy];
      var M = mmul(Ry, Rz);
      return [M[3], M[4], M[5], M[6], M[7], M[8], M[0], M[1], M[2]];
    }
    function plateMatrixAt(pid, age) {
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

    // ---- the seed, and the guesses it makes ----
    function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
    function hashStr(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
    // a plate's guess: a random axis and rate of drift, and a random full rotation for a plate the
    // model never placed; the model's last position is the anchor, so the join at its reach is seamless
    function guessFor(pid) {
      var g = guesses[pid]; if (g) return g;
      var r = mulberry((seed ^ hashStr(String(pid))) >>> 0);
      var lat = Math.asin(2 * r() - 1) * 180 / Math.PI, lon = 360 * r() - 180, rate = DRIFT_DEG_PER_MA * (0.5 + r()) * (r() < 0.5 ? -1 : 1);
      var fLat = Math.asin(2 * r() - 1) * 180 / Math.PI, fLon = 360 * r() - 180, fAng = 360 * r();
      g = { axis: [lat, lon], rate: rate, free: qmat(quat(fLat, fLon, fAng)) };
      guesses[pid] = g; return g;
    }
    function guessedMatrix(pid, age) {
      var base = plateMatrixAt(pid, reach), g = guessFor(pid);
      if (!base) base = g.free;
      var drift = qmat(quat(g.axis[0], g.axis[1], g.rate * Math.max(0, age - reach)));
      return mmul(drift, base);
    }
    // invented land: blobs whose total area is the crust curve's amount at this age, shapes and places from the seed
    function crustFraction(age) {
      if (!crust) return 0.02;
      var pts = crust.points, y = (new Date().getFullYear()) - age * 1e6;
      if (y <= pts[0][0]) return pts[0][1];
      for (var i = 1; i < pts.length; i++) if (y <= pts[i][0]) { var a = pts[i - 1], b = pts[i]; return a[1] + (b[1] - a[1]) * (y - a[0]) / ((b[0] - a[0]) || 1); }
      return pts[pts.length - 1][1];
    }
    function makeBlobs(age) {
      var key = seed + ':' + Math.round(age / 20);   // the shapes hold for twenty million years at a time
      if (blobsKey === key) return blobs;
      var r = mulberry((seed ^ 0x9E3779B9 ^ Math.round(age / 20)) >>> 0), total = crustFraction(age) * 4 * Math.PI, n = 5 + Math.floor(r() * 5), out = [];
      var shares = []; for (var i = 0; i < n; i++) shares.push(0.4 + r()); var sum = shares.reduce(function (a, b) { return a + b; }, 0);
      for (var k = 0; k < n; k++) {
        var area = total * shares[k] / sum, rho = Math.acos(Math.max(-1, 1 - area / (2 * Math.PI)));   // a cap of this area has this angular radius
        if (!(rho > 0.01)) continue;
        var cLat = Math.asin(2 * r() - 1), cLon = (2 * r() - 1) * Math.PI, m = 28, ring = new Float64Array(m * 3), w1 = 2 + Math.floor(r() * 3), w2 = 5 + Math.floor(r() * 4), p1 = r() * 6.28, p2 = r() * 6.28;
        var c = [Math.cos(cLat) * Math.cos(cLon), Math.cos(cLat) * Math.sin(cLon), Math.sin(cLat)];
        var u = [-Math.sin(cLon), Math.cos(cLon), 0], v = [-Math.sin(cLat) * Math.cos(cLon), -Math.sin(cLat) * Math.sin(cLon), Math.cos(cLat)];
        for (var j = 0; j < m; j++) {
          var t = j / m * 2 * Math.PI, rr = rho * (1 + 0.28 * Math.sin(w1 * t + p1) + 0.16 * Math.sin(w2 * t + p2)), cr = Math.cos(rr), sr = Math.sin(rr);
          var x = c[0] * cr + (u[0] * Math.cos(t) + v[0] * Math.sin(t)) * sr, y = c[1] * cr + (u[1] * Math.cos(t) + v[1] * Math.sin(t)) * sr, z = c[2] * cr + (u[2] * Math.cos(t) + v[2] * Math.sin(t)) * sr;
          ring[3 * j] = x; ring[3 * j + 1] = y; ring[3 * j + 2] = z;
        }
        out.push(ring);
      }
      blobs = out; blobsKey = key; return out;
    }

    // ---- the data ----
    function prepare(d) {
      data = d; ages = d.ages; grades = d.grades || []; reach = d.reach || ages[ages.length - 1];
      for (var pid in d.plates) { var P = d.plates[pid]; plates[pid] = { first: P.first, q: P.rot.map(function (r) { return quat(r[0], r[1], r[2]); }) }; }
      pieces = d.pieces.map(function (p) {
        return { plate: String(p.plate), from: p.from, to: p.to, rings: p.rings.map(function (ring) {
          var n = ring.length / 2, arr = new Float64Array(n * 3);
          for (var i = 0; i < n; i++) { var v = xyz(ring[2 * i], ring[2 * i + 1]); arr[3 * i] = v[0]; arr[3 * i + 1] = v[1]; arr[3 * i + 2] = v[2]; }
          return arr;
        }) };
      });
      schedule();
    }
    function ringsOf(list) {
      return (list || []).map(function (ring) {
        var arr = new Float64Array(ring.length * 3);
        for (var i = 0; i < ring.length; i++) { var v = xyz(ring[i][0], ring[i][1]); arr[3 * i] = v[0]; arr[3 * i + 1] = v[1]; arr[3 * i + 2] = v[2]; }
        return arr;
      });
    }
    function prepareCoast(c) { coast = ringsOf(c['0']); shelf = ringsOf(c['-200']); schedule(); }
    function load(src, then) {
      if (!src) return;
      if (typeof src !== 'string') { then(src); return; }
      // revalidated, never trusted from the cache: the plate file changes when the pipeline runs
      fetch(src, { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(then).catch(function (e) { console.error('globe.js: did not load', src, e); });
    }

    // ---- the grade for an age ----
    function gradeFor(age) {
      var g;
      if (age > NO_MAP) g = 'none';
      else if (age > OLDEST_ROCK) g = 'invented';
      else if (data && age > reach) g = 'guessed';
      else if (age < seam) g = 'ground';
      else {
        g = 'fitted';
        for (var i = 0; i < grades.length; i++) if (age <= grades[i].to) { g = grades[i].grade; break; }
      }
      return { grade: g, why: GRADE_WORDS[g] || '' };
    }

    // ---- drawing ----
    function size() {
      var w = host.clientWidth || host.getBoundingClientRect().width || 400;
      var D = Math.round(opts.size || Math.min(w, 560));
      W = D; H = proj === 'flat' ? Math.round(D / 2) : D;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr; canvas.height = H * dpr; canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    }
    var ARC_STEP = 0.12;
    // a ring of unit vectors through M, on the unit disc: hidden points go to the limb, and between two
    // hidden points the path walks the limb's arc; the ring joins only if a point of it faces us
    function traceGlobe(arr, M, into) {
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
            for (var k = 1; k <= steps; k++) { var a = prevAng + d * k / (steps + 1); into.lineTo(Math.cos(a), -Math.sin(a)); }
          }
          X = Math.cos(ang); Y = Math.sin(ang); prevAng = ang;
        } else anyFront = true;
        if (first) { into.moveTo(X, -Y); first = false; } else into.lineTo(X, -Y);
        prevHidden = hidden;
      }
      into.closePath();
      return anyFront;
    }
    // the same ring flat: longitude unwrapped so the ring is continuous, drawn three times a world apart
    // so a ring across the seam shows whole on both sides; x in [0, 1) of the width, y in [0, 1) of the height
    function traceFlat(arr, M, into) {
      var n = arr.length / 3, prevLon = 0, pts = [];
      for (var i = 0; i < n; i++) {
        var x = arr[3 * i], y = arr[3 * i + 1], z = arr[3 * i + 2];
        var X = M[0] * x + M[1] * y + M[2] * z, Y = M[3] * x + M[4] * y + M[5] * z, Z = M[6] * x + M[7] * y + M[8] * z;
        var lon = Math.atan2(Y, X), lat = Math.asin(Math.max(-1, Math.min(1, Z)));
        if (i) { while (lon - prevLon > Math.PI) lon -= 2 * Math.PI; while (lon - prevLon < -Math.PI) lon += 2 * Math.PI; }
        prevLon = lon; pts.push(lon, lat);
      }
      for (var off = -1; off <= 1; off++) {
        for (var j = 0; j < pts.length; j += 2) {
          var px = (pts[j] + Math.PI) / (2 * Math.PI) + off, py = (Math.PI / 2 - pts[j + 1]) / Math.PI;
          if (j === 0) into.moveTo(px, py); else into.lineTo(px, py);
        }
        into.closePath();
      }
      return true;
    }
    var trace = function (arr, M, into) { return proj === 'flat' ? traceFlat(arr, M, into) : traceGlobe(arr, M, into); };
    function landPath(V, age, shift, how) {
      var Vs = shift ? mmul(V, rotZ(shift)) : V, mats = {}, land = new Path2D(), any = false;
      if (how === 'invented') {
        makeBlobs(age).forEach(function (ring) { var p = new Path2D(); if (trace(ring, Vs, p)) { land.addPath(p); any = true; } });
        return any ? land : null;
      }
      for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];
        if (age > p.from || age < p.to) continue;
        var M = mats[p.plate];
        if (M === undefined) { var R = how === 'guessed' ? guessedMatrix(p.plate, age) : plateMatrixAt(p.plate, age); M = R ? mmul(Vs, R) : null; mats[p.plate] = M; }
        if (!M) continue;
        for (var k = 0; k < p.rings.length; k++) { var ring = new Path2D(); if (trace(p.rings[k], M, ring)) { land.addPath(ring); any = true; } }
      }
      return any ? land : null;
    }
    function fillLand(path, colour, alpha, edge) {
      if (!path) return;
      // a guessed or invented edge is dashed or dotted — but the edge of the union, never of each piece:
      // the dashes are stroked wide under an opaque fill, so only their outer half shows, round the land
      if (edge) { ctx.globalAlpha = 0.85; ctx.strokeStyle = COAST; ctx.lineWidth = 3 * unit(); ctx.setLineDash(edge === 'dashed' ? [5 * unit(), 4 * unit()] : [1.5 * unit(), 3.5 * unit()]); ctx.stroke(path); ctx.setLineDash([]); alpha = 1; }
      ctx.globalAlpha = alpha; ctx.fillStyle = colour; ctx.fill(path, 'nonzero');
      ctx.strokeStyle = colour; ctx.lineWidth = 1.6 * unit(); ctx.stroke(path);   // closes the hairline gaps between pieces, and covers the dashes' inner half
      ctx.globalAlpha = 1;
    }
    var unitPx = 1;
    function unit() { return unitPx; }   // one screen pixel in the current unit transform
    function enterUnit(r, cx, cy) {
      ctx.save();
      if (proj === 'flat') { ctx.translate(0, 0); ctx.scale(W, H); unitPx = 1 / W; }
      else { ctx.translate(cx, cy); ctx.scale(r, r); unitPx = 1 / r; }
    }
    function draw() {
      if (destroyed) return;
      var t0 = performance.now();
      if (!W) size();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var g = gradeFor(ma).grade, V = viewMatrix();
      if (proj === 'flat') V = mmul([1, 0, 0, 0, 1, 0, 0, 0, 1], rotZ(-lon0));   // flat: only the turn about the pole; north up
      var r = W / 2 - 4, cx = W / 2, cy = H / 2;
      // the sea, or the magma
      var sea = proj === 'flat' ? ctx.createLinearGradient(0, 0, 0, H) : ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
      if (g === 'none') { sea.addColorStop(0, MAGMA_GLOW); sea.addColorStop(1, MAGMA); } else { sea.addColorStop(0, SEA); sea.addColorStop(1, SEA_DEEP); }
      ctx.fillStyle = sea;
      if (proj === 'flat') ctx.fillRect(0, 0, W, H); else { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); }
      ctx.save();
      if (proj === 'flat') { ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip(); } else { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip(); }
      enterUnit(r, cx, cy);
      if (data && g !== 'none') {
        if (g === 'measured' || g === 'ground') fillLand(landPath(V, Math.max(ma, 0), 0, 'model'), LAND, g === 'ground' ? 0.45 : 1, null);
        else if (g === 'inferred') [-12, -8, -4, 0, 4, 8, 12].forEach(function (s) { fillLand(landPath(V, ma, s, 'model'), LAND, 0.2, null); });
        else if (g === 'fitted') [-27, -18, -9, 0, 9, 18, 27].forEach(function (s) { fillLand(landPath(V, ma, s, 'model'), LAND, 0.14, null); });
        else if (g === 'guessed') fillLand(landPath(V, ma, 0, 'guessed'), LAND_PALE, 0.7, 'dashed');
        else if (g === 'invented') fillLand(landPath(V, ma, 0, 'invented'), LAND_PALE, 0.5, 'dotted');
      }
      // today's coast and the shelf's edge, this side of the seam and fading out by five million years
      if (coast && ma < 5) {
        var fade = 1 - ma / 5;
        [[coast, COAST, 0.6], [shelf, SHELF, 0.3]].forEach(function (L) {
          if (!L[0]) return;
          var cp = new Path2D(); L[0].forEach(function (ring) { var cr = new Path2D(); if (trace(ring, V, cr)) cp.addPath(cr); });
          ctx.lineWidth = 1.1 * unit(); ctx.strokeStyle = L[1]; ctx.globalAlpha = L[2] * fade; ctx.stroke(cp); ctx.globalAlpha = 1;
        });
      }
      // the graticule, every thirty degrees
      ctx.lineWidth = unit(); ctx.strokeStyle = GRAT; var gp = new Path2D();
      for (var la = -60; la <= 60; la += 30) { var ring = []; for (var lo = -180; lo <= 180; lo += 5) { var v = xyz(lo, la); ring.push(v[0], v[1], v[2]); } var q1 = new Path2D(); trace(new Float64Array(ring), V, q1); gp.addPath(q1); }
      for (var lo2 = -180; lo2 < 180; lo2 += 30) { var ring2 = []; for (var la2 = -90; la2 <= 90; la2 += 5) { var v2 = xyz(lo2, la2); ring2.push(v2[0], v2[1], v2[2]); } var q2 = new Path2D(); trace(new Float64Array(ring2), V, q2); gp.addPath(q2); }
      ctx.stroke(gp);
      ctx.restore(); ctx.restore();
      // the limb, or the frame
      ctx.strokeStyle = 'rgba(42,36,28,0.35)'; ctx.lineWidth = 1;
      if (proj === 'flat') ctx.strokeRect(0.5, 0.5, W - 1, H - 1); else { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); }
      var ms = performance.now() - t0;
      if (opts.onDraw) opts.onDraw(ms);
      if (opts.onGrade && g !== lastGrade) { lastGrade = g; opts.onGrade(g, GRADE_WORDS[g]); }
    }
    function schedule() { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }

    // ---- the gesture: drag turns (east–west about the pole) and tilts (north–south, the poles the limits) ----
    var drag = null;
    canvas.addEventListener('pointerdown', function (ev) {
      drag = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, lon: lon0, lat: lat0 };
      ev.preventDefault(); try { canvas.setPointerCapture(ev.pointerId); } catch (e) {}
      host.classList.add('dragging');
    });
    canvas.addEventListener('pointermove', function (ev) {
      if (!drag || ev.pointerId !== drag.id) return;
      if (proj === 'flat') { lon0 = drag.lon - (ev.clientX - drag.x) * 360 / (W || 400); }
      else {
        var k = 180 / (W || 400);
        lon0 = drag.lon - (ev.clientX - drag.x) * k;
        lat0 = Math.max(-90, Math.min(90, drag.lat + (ev.clientY - drag.y) * k));
      }
      schedule();
    });
    function release(ev) { if (drag && ev.pointerId === drag.id) { drag = null; host.classList.remove('dragging'); } }
    canvas.addEventListener('pointerup', release); canvas.addEventListener('pointercancel', release);

    load(opts.plates || '../stories/plates/continents.json', prepare);
    load(opts.coast === undefined ? '../art/maps/world-tiles/contours-0.json' : opts.coast, prepareCoast);
    load(opts.crust === undefined ? '../stories/curves/crust-and-land.json' : opts.crust, function (c) { crust = c; blobsKey = null; schedule(); });
    if (window.ResizeObserver) { ro = new ResizeObserver(function () { size(); schedule(); }); ro.observe(host); }
    size(); draw();

    return {
      setTime: function (m) { ma = Math.max(0, m); schedule(); },
      time: function () { return ma; },
      view: function () { return { lon: lon0, lat: lat0 }; },
      turn: function (lon, lat) { if (lon != null) lon0 = lon; if (lat != null) lat0 = Math.max(-90, Math.min(90, lat)); schedule(); },
      grade: function () { return gradeFor(ma); },
      reguess: function () { seed = (seed * 1103515245 + 12345 + Date.now()) % 2147483647; guesses = {}; blobsKey = null; schedule(); return seed; },
      seed: function () { return seed; },
      setSeed: function (s) { seed = s; guesses = {}; blobsKey = null; schedule(); },   // two views of one world share a seed
      setProjection: function (p) { proj = p === 'flat' ? 'flat' : 'globe'; size(); schedule(); },
      projection: function () { return proj; },
      destroy: function () { destroyed = true; cancelAnimationFrame(raf); if (ro) ro.disconnect(); host.innerHTML = ''; host.classList.remove('cw-globe'); }
    };
  }
  cwGlobe.GRADE_WORDS = GRADE_WORDS;
  window.cwGlobe = cwGlobe;
})();
