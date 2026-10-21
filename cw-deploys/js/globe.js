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
     inferred   to 540: rock magnetism gives how far north, not how far east; drawn once at the model's position (10 Oct: no smear)
                (the look of the land, since 19 Oct 2026, follows the age of life and not the grade: bare rock until plants at
                450, then today's picture blending in by 300 — paintSkin)
     fitted     to the model's reach: the pieces are real, the fits argued; drawn once, like inferred (the ghost went 13 Oct)
     guessed    past the model's reach, while cratons exist (to 4 billion): the real pieces of crust,
                which still exist, placed by the model's last position plus a random slow drift from a
                seed, so that going back the accuracy falls to chance
     invented   before the oldest rock (4.0 to 4.4 billion): random land from the amount curve, the
                shapes and places made up, only the amount from the rocks
                (both drawn, since 21 Oct 2026, by the skin like the model's ages — the pale dashed and dotted fills are
                gone: bare rock, going near-black before oxygen at about 2,400, the island lighter, the drowned part under a
                wash with the texture showing through, and a translucent shelf round each piece; the brief
                CWVault/claude/Prompt-Build-Earliest-Continents.md, the audit's §8, Michael's ruling 4 of 19 Oct)
     none       above 4.4 billion: a ball of melted rock
   and, this side of the deep seam, `ground`: today's coast and the shelf's edge as lines, the ground
   picture itself being the map's (the picture on a sphere is later). The seed holds while the marker
   moves; `reguess()` draws a new seed (the word *another guess*), and every visit begins with its own.

   The island (7 Oct, Michael): inside each guessed or invented piece, the part that probably stood
   above the sea — the land series of the crust-and-land curve over the crust series — drawn in the
   land colour inside the pale drowned crust. The climate wash of 7 Oct (a model: dry belts, a dry
   interior, green elsewhere) was withdrawn from the column on 13 Oct and deleted on 19 Oct (Michael's
   ruling 2 on the audit); its polar caps became, the same day, the soft overlay of the cold ages, paintIce
   (ruling 3): per pixel, feathered, over land and sea, fading in and out with each glaciation.

   The skin (12 Oct 2026, Prompt-Build-Globe-Cities-Ice.md parts 1 and 7, on Michael's rulings 14; the 9 Oct
   "out for now" lifted): the globe is drawn per pixel. For every pixel of the disc (or of the flat map) the
   projection is inverted to a point on the sphere at the chosen age; an id raster, the plates filled by index
   into an offscreen equirectangular canvas for that age, says which plate is there; that plate's rotation is
   inverted to find the point's place today, and the skin is read there — today's ground picture
   (art/maps/world.webp with its vegetation) for the *measured* ages and this side of the seam, a neutral rock
   grain (art/globe/rock-grain.png, one tone, no climate in it) for *inferred* and *fitted*; *guessed* and
   *invented* keep their pale dashed and dotted fills with no skin, so the grade shows at a glance. A limb
   shading and a haze at the rim make it a ball. While the globe itself is dragged the skin is painted coarser
   (14 Oct 2026; until then the flat fills stood in), and sharp again when the finger lifts. On 19 Oct 2026 (step 5) the drag took the same resolution as rest: the skin is read between texels rather
   than snapped to the nearest, and sea in today's picture under a piece (the shelf, an inland sea) is painted as a
   translucent shelf wash over the globe's sea rather than copied as blue onto the land — the audit's problem 4, the blue
   squares and their jiggle. The fast flag of 13 Oct, which drew flat fills in place of the skin
   while the year ran, went on 19 Oct 2026 (step 4 of the audit's order, Michael's go-ahead): the skin paints in play
   too, made cheap by keeping the view's part of the pass (every pixel's unit vector and texel) while the view holds and
   the id raster at half-million-year steps, so a frame of play does only the plates' turns and one texel lookup per
   pixel; skinMs() reads the cost. Molten, twice (part 7): above 4,400 million years the pixels follow
   Michael's maps (art/globe/cooling-order.png, dark cools first; cracks.png, the seams): crust wherever the
   cooling value is below a threshold that rises with the age, the cracks glowing and dimming; the Earth
   assembles molten at 4,567, a black crust within a few million years, a faint uncertain sea, the white flash
   of the Moon-forming impact at 4,510 (the store's age for Moon forms), molten again with the maps turned so
   the second crust is a different crust, black again, and the sea's blue by 4,400, which the Jack Hills zircons
   vouch for. onMolten(phase, ma) tells the page the phase; moltenPhase() reads it (a hook for the stories).

   cwGlobe(host, opts) → { setTime(ma), time(), view(), turn(lon, lat), project(lon, lat), placeAt(lon, lat), grade(), reguess(), moltenPhase(),
                           setProjection(p), projection(), destroy() }
   opts:
     plates, coast, crust   the three files, or their URLs (defaults under ../stories and ../art/maps)
     ma, lon, lat           the opening age (millions of years ago) and view
     projection             'globe' (default) or 'flat' — the same rings, equirectangular on a 2:1 canvas,
                            a drag panning east–west; with fill: true the flat canvas is its host's own size, and
                            setView({ lon, lat, ppd }) makes it a painting of a page's view (the ground map's), a
                            drag then handed to onDrag(dx, dy) for the page to pan (19 Oct 2026, step 6)
     size                   the disc's diameter, or the flat map's width, in CSS px (default: the host's width)
     seam                   millions of years; younger than it the grade is `ground` (default 2.6)
     seed                   the first seed (default: this visit's)
     onTurn()               the disc was turned (a drag, or turn()); a page re-places what it draws over it (step 10, 20 Oct 2026)
     textures, ground, vegetation   the skin's files (defaults ../art/globe/, ../art/maps/world.webp and
                            ../art/maps/world-vegetation.webp); textures: false draws the flat fills only
     onDraw(ms), onGrade(grade, sentence), onMolten(phase, ma)
   The colours come from js/cw-style.js and the curve reader from js/cw-time.js (19 Oct 2026); both load
   before this file. Classic script. */
(function () {
  'use strict';

  var CSS = [
    '.cw-globe{position:relative;line-height:0;user-select:none;-webkit-user-select:none;}',
    '.cw-globe canvas{display:block;touch-action:none;cursor:grab;}',
    '.cw-globe.dragging canvas{cursor:grabbing;}'
  ].join('\n');
  // the colours are js/cw-style.js's, the one style file (19 Oct 2026); the names below are this file's
  var S = window.CW && window.CW.STYLE;
  if (!S) throw new Error('globe.js needs js/cw-style.js loaded before it');
  if (!(window.CW.curveAt && window.CW.maToYear)) throw new Error('globe.js needs js/cw-time.js loaded before it');
  var SEA = S.globeSea, SEA_DEEP = S.globeSeaDeep, LAND = S.globeLand, LAND_PALE = S.globeLandPale, COAST = S.coast, SHELF = S.shelf, MAGMA = S.magma, MAGMA_GLOW = S.magmaGlow;
  var OLDEST_ROCK = 4000, NO_MAP = 4400, MOLTEN_START = 4600, DRIFT_DEG_PER_MA = 0.45;   // a plate's few centimetres a year, as degrees of arc
  var BLACK = S.black, HOT = S.hot, CRUST = S.crust, CRUST_LIGHT = S.crustLight, FLASH = S.flash;
  // the molten sequence, in millions of years ago (part 7; the ages as the events store has them)
  var ASSEMBLED = 4567, FIRST_CRUST = 4558, MOON = 4510, SECOND_CRUST = 4480, FIRST_SEA_FROM = 4548, FIRST_SEA_TO = 4520;
  var MOLTEN_WORDS = {
    molten:    'A ball of melted rock. Nothing to stand on, and nothing from it survived.',
    crust:     'A skin of black rock freezes over the melt in rafts, and the seams between them glow.',
    'first sea': 'Whether there was a sea before the Moon, nobody knows. The faint blue is a guess, and it says so.',
    moon:      'Something the size of Mars strikes the Earth. The whole surface melts again, and the Moon is made from what was thrown off.',
    'molten again': 'Melted again, from the top down.',
    'crust again': 'Freezing again, into a different crust.',
    sea:       'Blue by 4.4 billion years: a tiny crystal from Western Australia says there was liquid water.'
  };
  /* two hex colours mixed, t of the second (0 to 1) */
  function mix(a, b, t) {
    var A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16), out = 0;
    [16, 8, 0].forEach(function (s) { var va = (A >> s) & 255, vb = (B >> s) & 255; out |= Math.round(va + (vb - va) * t) << s; });
    return '#' + ('000000' + out.toString(16)).slice(-6);
  }
  var WASH_ICE = S.washIce;
  // the cold ages, in millions of years ago, and how far from the poles the ice reached (degrees of latitude from the equator)
  // the cold ages of deep time, in millions of years ago, and how far from the poles the ice reached (degrees of latitude
  // from the equator): the Huronian, the two snowballs, the Andean-Saharan, the late Palaeozoic, the Antarctic, the Quaternary
  var ICEHOUSES = [[2400, 2100, 55], [717, 635, 0], [460, 430, 60], [360, 260, 50], [34, 2.6, 66], [2.6, 0, 58]];
  var GRADE_WORDS = {
    ground:   'This side of the ice ages the globe shows what the map shows: today’s ground, the sea as low as it was, and the ice sheets where they were.',
    measured: 'The seafloor still carries its magnetic stripes, so the plates can be run backwards and measured.',
    inferred: 'Rock magnetism and fossils say how far north each piece was, not how far east. North and south are firm; east and west are one best estimate.',
    fitted:   'These pieces of crust are real and still exist. How they fitted together is argued from scattered evidence, and the models disagree. This is one fit.',
    guessed:  'These pieces of crust are real; you can stand on them today. Where they were, nobody knows. This is a guess; tap another guess, and next time it will be different. The lighter part of each is about how much stood above the sea; the rest lies under shallow water.',
    invented: 'No rock survives from this time. There was probably some continent, and this much is the rocks’ guess at the amount. The shapes and the places are made up; the lighter part is about how much stood above the sea.',
    none:     'No map. A ball of melted rock with a skin that keeps sinking; nothing to draw, and nothing survived.'
  };

  function cwGlobe(host, opts) {
    opts = opts || {};
    if (!document.getElementById('cw-globe-css')) { var st = document.createElement('style'); st.id = 'cw-globe-css'; st.textContent = CSS; document.head.appendChild(st); }
    host.classList.add('cw-globe');
    var canvas = document.createElement('canvas'); host.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var ma = opts.ma || 0, lon0 = opts.lon != null ? opts.lon : 20, lat0 = opts.lat != null ? opts.lat : 15;
    // the flat map's view (13 Oct 2026; 19 Oct, step 6 of the audit's order): k times the whole world across the width and
    // ky times its half across the height (equal pixels per degree when the canvas is 2:1), about the centre; lat the
    // centre's latitude (lon0 its longitude). flatView, when a page sets it, is the ground map's own view — centre and
    // pixels per degree — so the flat deep map is the same frame as the ground map and the seam is a fade between two
    // paintings of one view; the canvas then fills its host (opts.fill) and a drag is handed to the page (opts.onDrag)
    // the flat view (20 Oct 2026, step 9 of the audit's order): the ground map's own projection — a centre, pixels per
    // degree, and the map's blend k from plate carrée (0, the whole world) toward Mercator (1, zoomed in; the map's yw
    // and its 85° cap, copied) — so that a zoomed-in ground map and the flat deep map over it are one frame. fv is the
    // view in force; a page sets it (setView) and otherwise it is the whole world across the width; the id raster
    // swaps in texture space for its own drawing
    var fv = { lon: lon0, lat: 0, ppd: 1, k: 0, w: 360, h: 180 }, flatView = null;
    function mercF(lat) { var f = Math.max(-85, Math.min(85, lat)) * Math.PI / 180; return 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + f / 2)); }
    function fwY(lat) { var k = fv.k; return (1 - k) * lat + k * mercF(lat); }   // world y in degree-like units, growing north
    function fwYInv(y) { var lo = -90, hi = 90; for (var i = 0; i < 40; i++) { var mid = (lo + hi) / 2; if (fwY(mid) < y) lo = mid; else hi = mid; } return (lo + hi) / 2; }
    function flatX(lonDeg) { return 0.5 + (lonDeg - fv.lon) * fv.ppd / fv.w; }                 // in units of the width
    function flatY(latDeg) { return 0.5 - (fwY(latDeg) - fwY(fv.lat)) * fv.ppd / fv.h; }      // in units of the height
    function applyFlatView() { if (flatView) { lon0 = flatView.lon; fv = { lon: flatView.lon, lat: flatView.lat, ppd: flatView.ppd, k: flatView.k || 0, w: W || 1, h: H || 1 }; } else fv = { lon: lon0, lat: 0, ppd: (W || 360) / 360, k: 0, w: W || 360, h: H || 180 }; }
    var FADE = 8;   // million years: a piece dissolves into the sea over this long before its birth age, and the skin blends across a grade's edge (13 Oct 2026)
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

    // ---- the skin: the textures, the id raster, the per-pixel passes (12 Oct 2026) ----
    var TW = 1024, TH = 512, tex = {}, texOn = opts.textures !== false, lastSkinMs = 0, moltenPhase = null;
    // the per-pixel passes run at half the CSS resolution and are scaled up: the skin's own resolution (a 1024-wide
    // picture, 3 px per degree on a 560 px disc) is the limit, not the canvas, and the cost falls by four
    var SKIN_SCALE = opts.skinScale || 0.5, SW = 0, SH = 0;
    // while the globe itself is dragged the skin is painted at half this again, coarser for a moment and sharp on
    // release, instead of the flat fills standing in (Michael, 14 Oct 2026: the textures went brown under the hand)
    var skinScale = SKIN_SCALE;   // one resolution, dragging or not (19 Oct 2026, step 5; the quarter-resolution drag of 14 Oct is gone)
    var idCanvas = null, idCtx = null, skinCanvas = null, skinCtx = null, plateIndex = {}, plateByIndex = [null];
    function texCanvas() { var c = document.createElement('canvas'); c.width = TW; c.height = TH; return c; }
    function loadImage(src, then) {
      if (!src) return;
      var im = new Image(); im.onload = function () { then(im); }; im.onerror = function () { console.warn('globe.js: no texture', src); }; im.src = src;
    }
    function loadTextures() {
      if (!texOn) return;
      var base = opts.textures || '../art/globe/';
      ['cooling-order', 'cracks', 'rock-grain'].forEach(function (name) {
        loadImage(base + name + '.png', function (im) { var c = texCanvas(), x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(im, 0, 0, TW, TH); tex[name] = x.getImageData(0, 0, TW, TH).data; schedule(); });
      });
      // today's ground: the base picture with its vegetation multiplied over it, as the map shows it (no ice: Greenland's is three million years old)
      loadImage(opts.ground || '../art/maps/world.webp', function (im) {
        var c = texCanvas(), x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(im, 0, 0, TW, TH);
        var finish = function () { tex.ground = x.getImageData(0, 0, TW, TH).data; buildSeaMask(); schedule(); };
        if (opts.vegetation === false) { finish(); return; }
        loadImage(opts.vegetation || '../art/maps/world-vegetation.webp', function (veg) { x.globalCompositeOperation = 'multiply'; x.drawImage(veg, 0, 0, TW, TH); x.globalCompositeOperation = 'source-over'; finish(); });
      });
    }
    // the sea of today's picture, as a mask (19 Oct 2026, step 5 of the audit's order — the blue squares): a piece of
    // continent carries its shelf and its inland seas, which in the picture are sea blue, and the skin used to copy that
    // blue onto the land as pale patches along every old join. A texel is sea where blue leads red by a fifth and leads
    // green: the sea ramp of Spec-Maps and never its land ramp (the violet-grey peaks come closest, at 1.06). Under a
    // piece, sea in the picture is painted as shelf: the shelf wash, translucent, over the globe's own sea
    var seaMask = null;
    function buildSeaMask() {
      var p = tex.ground, m = new Uint8Array(TW * TH);
      for (var i = 0, j = 0; i < m.length; i++, j += 4) m[i] = (p[j + 2] > p[j] * 1.2 && p[j + 2] > p[j + 1]) ? 1 : 0;
      seaMask = m;
    }
    var SHELF3 = hex3(S.shelfWash || '#7fb0cc'), SHELF_A = S.shelfWashAlpha != null ? S.shelfWashAlpha : 0.55;
    // this side of the seam the globe shows what the map shows (20 Oct 2026, step 8 of the audit's order): the page's map
    // hands it the sea level and the ice sheets' outlines with their strengths (setGround), and the ocean floor's depth at
    // the texture's own size (setFloor, the pyramid's level-1 floor tiles). At the ground grade the skin then paints the
    // shelf a lowered sea has bared as land by its height above the new shore, as the map does, and the ICE-6G sheets
    // at their strength, never below the sea
    var ground = null, floorTex = null, iceMasks = {}, SHORE = S.shoreLand || [[0, [230, 223, 203]], [250, [216, 205, 170]]], ICEF3 = hex3(S.iceFill || '#eaf1f4');
    function floorDepthAt(j) { if (!floorTex) return -1; var dv = floorTex.data[j]; return dv > 0 ? floorTex.max * Math.pow((dv - 1) / 253, 2) : -1; }   // metres, or -1 for land
    function iceMask(age, outlines) {   // an outline's rings filled in texture space, once per age
      var key = String(age); if (iceMasks[key] !== undefined) return iceMasks[key];
      var rings = outlines[key]; if (!rings || !rings.length) { iceMasks[key] = null; return null; }
      var c = texCanvas(), x = c.getContext('2d', { willReadFrequently: true });
      x.setTransform(TW / 360, 0, 0, -TH / 180, TW / 2, TH / 2); x.fillStyle = '#fff';
      var path = new Path2D();
      for (var r = 0; r < rings.length; r++) { var ring = rings[r]; for (var q = 0; q < ring.length; q++) { if (q) path.lineTo(ring[q][0], ring[q][1]); else path.moveTo(ring[q][0], ring[q][1]); } path.closePath(); }
      x.fill(path, 'evenodd');
      x.setTransform(1, 0, 0, 1, 0, 0);
      var d = x.getImageData(0, 0, TW, TH).data, m = new Uint8Array(TW * TH);
      for (var i = 0, j = 3; i < m.length; i++, j += 4) m[i] = d[j];
      iceMasks[key] = m; return m;
    }
    function skinReady() { return texOn && tex.ground && tex['rock-grain']; }
    function moltenReady() { return texOn && tex['cooling-order'] && tex.cracks && tex['rock-grain']; }
    function indexOf(pid) { var i = plateIndex[pid]; if (!i) { i = plateByIndex.length; plateByIndex.push(pid); plateIndex[pid] = i; } return i; }
    // the id raster: every living piece filled with its plate's index (low byte red, high byte green) at its position at this age
    // the raster depends only on the age (and the pieces), so a drag, which only turns the view, reuses it (14 Oct 2026)
    // the raster is built at half-million-year steps (19 Oct 2026, step 4 of the audit's order): a plate moves at most
    // a quarter of a degree in that time, under a pixel at any size the map takes, and play no longer rebuilds it every frame
    // since 21 Oct 2026 the raster is by body — a plate at the model's or the guessed position, or an invented blob
    var idKey = null, idData = null;
    function idRaster(age, how) {
      age = Math.round(age * 2) / 2; how = how || 'model';
      var key = age + '|' + how + '|' + pieces.length + '|' + seed;
      if (key === idKey && idData) return idData;
      if (!idCanvas) { idCanvas = texCanvas(); idCtx = idCanvas.getContext('2d', { willReadFrequently: true }); }
      var oc = idCtx;
      oc.setTransform(1, 0, 0, 1, 0, 0); oc.fillStyle = '#000'; oc.fillRect(0, 0, TW, TH);
      oc.setTransform(TW, 0, 0, TH, 0, 0);
      var saveProj = proj, saveFv = fv; proj = 'flat'; fv = { lon: 0, lat: 0, ppd: TW / 360, k: 0, w: TW, h: TH };   // texture space: the whole world, unzoomed (13 Oct)
      var byBody = {}, k;
      eachBody(age, how, function (id, rings, M) {
        var path = byBody[id] || (byBody[id] = new Path2D());
        for (k = 0; k < rings.length; k++) { var q = new Path2D(); if (trace(rings[k], M, q)) path.addPath(q); }
      });
      proj = saveProj; fv = saveFv;
      var id;
      for (id in byBody) {
        var idx = indexOf(id), col = 'rgb(' + (idx & 255) + ',' + (idx >> 8 & 255) + ',0)';
        oc.fillStyle = col; oc.fill(byBody[id], 'nonzero');
        oc.strokeStyle = col; oc.lineWidth = 1.5 / TW; oc.stroke(byBody[id]);   // closes the hairline gaps between pieces
      }
      oc.setTransform(1, 0, 0, 1, 0, 0);
      idKey = key; idData = oc.getImageData(0, 0, TW, TH).data;
      return idData;
    }
    function hex3(h) { var n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
    var ROCK_G = hex3(S.rockGrey || '#8c8880'), ROCK_T = hex3(S.rockTan || '#a89a80'), ROCK_R = hex3(S.rockRust || '#96603e'), ICE3 = hex3(WASH_ICE), DEEP_ICE_A = S.deepIceAlpha != null ? S.deepIceAlpha : 0.75;
    // the earliest continents (21 Oct 2026, the brief Prompt-Build-Earliest-Continents.md; ruling 4 of 19 Oct): before oxygen the
    // crust is near-black to dark grey by the grain, the part above the sea a touch lighter, the drowned part under the shelf wash
    // with the texture showing through, and a translucent shelf round each piece. The blend from bare rock to the dark crust runs
    // from OXYGEN back to DARK_BY, so the look follows the age and never switches at a grade's edge
    var OLD3 = hex3(S.oldCrust || '#1c1a17'), OLDG3 = hex3(S.oldCrustGrey || '#3e3a35');
    var DROWN_W = S.drownedWash != null ? S.drownedWash : 0.3, LIFT = S.islandLift || '#a39b8e', LIFT_A = S.islandLiftAlpha != null ? S.islandLiftAlpha : 0.16, RIM_A = S.shelfRimAlpha != null ? S.shelfRimAlpha : 0.38;
    var OXYGEN = 2300, DARK_BY = 2500, SHELF_DEG = 2.2;   // the shelf's width round an old piece, in degrees of arc
    var MAGMA3 = hex3(MAGMA), GLOW3 = hex3(MAGMA_GLOW), HOT3 = hex3(HOT), CRUST3 = hex3(CRUST), CRUSTL3 = hex3(CRUST_LIGHT), SEA3 = hex3(SEA), SEAD3 = hex3(SEA_DEEP), FLASH3 = hex3(FLASH);
    // the inverse of the view: screen (x east, y north, z toward the eye) back to the world at this age
    function pixelToWorld(V) {
      var flat = proj === 'flat', sw = SW, sh = SH, r = (W / 2 - 4) * skinScale, cx = sw / 2, cy = sh / 2;
      var rowLat = null;   // flat: the latitude of each row of the skin canvas, by the view's blend (one inverse per row, not per pixel)
      if (flat) { rowLat = new Float64Array(sh); var y0 = fwY(fv.lat), top = fwY(90), bottom = fwY(-90); for (var ry = 0; ry < sh; ry++) { var yy = y0 - ((ry + 0.5) / sh - 0.5) * fv.h / fv.ppd; rowLat[ry] = (yy > top || yy < bottom) ? NaN : fwYInv(yy); } }
      var T0 = V[0], T1 = V[3], T2 = V[6], T3 = V[1], T4 = V[4], T5 = V[7], T6 = V[2], T7 = V[5], T8 = V[8];
      return function (px, py, out) {
        var X, Y, Z;
        if (flat) { var la = rowLat[py]; if (la !== la) return false; var lo = (fv.lon + ((px + 0.5) / sw - 0.5) * fv.w / fv.ppd) * Math.PI / 180; la = la * Math.PI / 180; var cl = Math.cos(la); X = cl * Math.cos(lo); Y = cl * Math.sin(lo); Z = Math.sin(la); }
        else { X = (px + 0.5 - cx) / r; Y = -(py + 0.5 - cy) / r; var q = 1 - X * X - Y * Y; if (q < 0) return false; Z = Math.sqrt(q); }
        out[0] = T0 * X + T1 * Y + T2 * Z; out[1] = T3 * X + T4 * Y + T5 * Z; out[2] = T6 * X + T7 * Y + T8 * Z;
        return true;
      };
    }
    // the view's own part of the skin, kept while the view holds (19 Oct 2026, step 4): for every pixel of the skin
    // canvas, whether it is on the world, the unit vector under it and that vector's texel. Play changes the age and
    // not the view, so during play the per-pixel pass has only the plate's turn and one texel lookup left to do
    var viewCache = { key: null };
    function viewPixels(V) {
      var key = [proj, lon0, lat0, fv.lon, fv.lat, fv.ppd, fv.k, SW, SH, W, H].join('|');
      if (viewCache.key === key) return viewCache;
      var toWorld = pixelToWorld(V), n = SW * SH, same = viewCache.inside && viewCache.inside.length === n, p = [0, 0, 0], i = 0;
      // the arrays are kept and refilled while the size holds (a drag changes the view every frame)
      var w3 = same ? viewCache.w3 : new Float32Array(n * 3), ks = same ? viewCache.k : new Int32Array(n), inside = same ? viewCache.inside : new Uint8Array(n);
      if (same) inside.fill(0);
      for (var py = 0; py < SH; py++) for (var px = 0; px < SW; px++, i++) {
        if (!toWorld(px, py, p)) continue;
        inside[i] = 1; w3[3 * i] = p[0]; w3[3 * i + 1] = p[1]; w3[3 * i + 2] = p[2]; ks[i] = texIndex(p[0], p[1], p[2]);
      }
      viewCache = { key: key, w3: w3, k: ks, inside: inside };
      return viewCache;
    }
    function texIndex(x, y, z) {   // the texel of a unit vector, times four
      var lon = Math.atan2(y, x), lat = Math.asin(z > 1 ? 1 : (z < -1 ? -1 : z));
      var u = ((lon + Math.PI) / (2 * Math.PI) * TW) | 0, v = ((Math.PI / 2 - lat) / Math.PI * TH) | 0;
      if (u < 0) u = 0; else if (u >= TW) u = TW - 1; if (v < 0) v = 0; else if (v >= TH) v = TH - 1;
      return (v * TW + u) << 2;
    }
    function skinTarget() {
      SW = Math.max(2, Math.round(W * skinScale)); SH = Math.max(2, Math.round(H * skinScale));
      if (!skinCanvas) { skinCanvas = document.createElement('canvas'); skinCtx = skinCanvas.getContext('2d'); }
      if (skinCanvas.width !== SW || skinCanvas.height !== SH) { skinCanvas.width = SW; skinCanvas.height = SH; }
      return skinCtx.createImageData(SW, SH);
    }
    // the land's skin for the model's ages, by the age of life (Michael's ruling 4, 19 Oct 2026): bare rock — grey to tan by
    // the grain, rusty where the cooling map runs high, lit by the grain, no green anywhere — until plants, about 450 million
    // years ago; then green spreads as today's picture blends in, whole by 300; the picture alone after. The one-tone brown
    // grain for the inferred and fitted ages, and the hard switch to the picture at the measured edge, went with this. (The
    // near-black crust before 2,400 million years is the guessed and invented pieces', which keep their pale fills until the
    // invented-continents pass.)
    var PLANTS = 450, GREEN_BY = 300;
    // how: 'model' (the pieces at the model's positions), 'guessed' (at the guessed positions) or 'invented' (the blobs) — the
    // guessed and invented pieces take the skin too since 21 Oct 2026, dark before oxygen (their islands and drowned parts are
    // drawn over the skin by drownedBand, as paths)
    function paintSkin(V, age, g, alpha, how, oldT) {
      how = how || 'model'; oldT = how === 'model' ? (oldT || 0) : 1;   // how far the old look is in: today's inland seas fade out of the old pieces over the FADE before the reach
      var tp = Math.max(0, Math.min(1, (PLANTS - age) / (PLANTS - GREEN_BY)));   // how far the picture has come in: 0 bare rock, 1 the picture
      var td = Math.max(0, Math.min(1, (age - OXYGEN) / (DARK_BY - OXYGEN)));     // how far the dark crust has come in: 0 bare rock, 1 near-black
      var t0 = performance.now(), ids = idRaster(Math.max(age, 0), how), picture = tp > 0 ? tex.ground : null, grain = tex['rock-grain'], cool = tex['cooling-order'];
      var out = skinTarget(), o = out.data, inv = new Array(plateByIndex.length), vc = viewPixels(V), w3 = vc.w3, ks = vc.k, inside = vc.inside, n = SW * SH;
      for (var i = 0; i < n; i++) {
        if (!inside[i]) continue;
        var k = ks[i], idx = ids[k] | (ids[k + 1] << 8);
        if (!idx) continue;
        var M = inv[idx];
        if (M === undefined) { var R = bodyMatrixAt(plateByIndex[idx], Math.max(age, 0), how); M = R ? [R[0], R[3], R[6], R[1], R[4], R[7], R[2], R[5], R[8]] : null; inv[idx] = M; }
        if (!M) continue;
        var x = w3[3 * i], y = w3[3 * i + 1], z = w3[3 * i + 2];
        var tx = M[0] * x + M[1] * y + M[2] * z, ty = M[3] * x + M[4] * y + M[5] * z, tz = M[6] * x + M[7] * y + M[8] * z;
        // the point's place in the picture, read between its four nearest texels (smooth, not snapped: the snapping was
        // the squares, and their jiggle under a drag); u wraps round the world, v stops at the poles
        var lon = Math.atan2(ty, tx), lat = Math.asin(tz > 1 ? 1 : (tz < -1 ? -1 : tz));
        var u = (lon + Math.PI) / (2 * Math.PI) * TW - 0.5, v = (Math.PI / 2 - lat) / Math.PI * TH - 0.5;
        var u0 = Math.floor(u), v0 = Math.floor(v), fu = u - u0, fv = v - v0;
        u0 = ((u0 % TW) + TW) % TW; var u1 = u0 + 1 < TW ? u0 + 1 : 0;
        if (v0 < 0) { v0 = 0; fv = 0; } else if (v0 >= TH - 1) { v0 = TH - 1; fv = 0; }
        var v1 = v0 + 1 < TH ? v0 + 1 : v0;
        var i00 = v0 * TW + u0, i10 = v0 * TW + u1, i01 = v1 * TW + u0, i11 = v1 * TW + u1;
        var w00 = (1 - fu) * (1 - fv), w10 = fu * (1 - fv), w01 = (1 - fu) * fv, w11 = fu * fv;
        var j00 = i00 << 2, j10 = i10 << 2, j01 = i01 << 2, j11 = i11 << 2;
        var sea = seaMask ? seaMask[i00] * w00 + seaMask[i10] * w10 + seaMask[i01] * w01 + seaMask[i11] * w11 : 0;
        var r0, g0, b0, oi = i << 2;
        if (tp < 1) {   // bare rock
          var gr = (grain[j00] * w00 + grain[j10] * w10 + grain[j01] * w01 + grain[j11] * w11) / 255;
          var rust = cool ? Math.max(0, Math.min(1, (cool[j00] / 255 - 0.55) / 0.25)) : 0, lit = 0.8 + 0.4 * (gr - 0.5);
          r0 = ((ROCK_G[0] + (ROCK_T[0] - ROCK_G[0]) * gr) * (1 - rust) + ROCK_R[0] * rust) * lit;
          g0 = ((ROCK_G[1] + (ROCK_T[1] - ROCK_G[1]) * gr) * (1 - rust) + ROCK_R[1] * rust) * lit;
          b0 = ((ROCK_G[2] + (ROCK_T[2] - ROCK_G[2]) * gr) * (1 - rust) + ROCK_R[2] * rust) * lit;
          if (td > 0) {   // before oxygen: the dark crust by the grain
            var g2 = gr * gr * (3 - 2 * gr);
            r0 = r0 * (1 - td) + (OLD3[0] + (OLDG3[0] - OLD3[0]) * g2) * td; g0 = g0 * (1 - td) + (OLD3[1] + (OLDG3[1] - OLD3[1]) * g2) * td; b0 = b0 * (1 - td) + (OLD3[2] + (OLDG3[2] - OLD3[2]) * g2) * td;
          }
        }
        if (tp > 0) {   // the picture, green and all
          var pr = picture[j00] * w00 + picture[j10] * w10 + picture[j01] * w01 + picture[j11] * w11;
          var pg = picture[j00 + 1] * w00 + picture[j10 + 1] * w10 + picture[j01 + 1] * w01 + picture[j11 + 1] * w11;
          var pb = picture[j00 + 2] * w00 + picture[j10 + 2] * w10 + picture[j01 + 2] * w01 + picture[j11 + 2] * w11;
          if (tp < 1) { r0 = r0 * (1 - tp) + pr * tp; g0 = g0 * (1 - tp) + pg * tp; b0 = b0 * (1 - tp) + pb * tp; }
          else { r0 = pr; g0 = pg; b0 = pb; }
        }
        if (ground && g === 'ground') {
          var depth = floorTex ? floorDepthAt(j00) : -1;
          if (sea > 0 && ground.sea < 0 && depth > 0 && depth <= -ground.sea) {   // bared by the lowered sea: land, by its height above the new shore
            var ab = Math.min(1, (-ground.sea - depth) / 250), c0 = SHORE[0][1], c1 = SHORE[1][1];
            r0 = c0[0] + (c1[0] - c0[0]) * ab; g0 = c0[1] + (c1[1] - c0[1]) * ab; b0 = c0[2] + (c1[2] - c0[2]) * ab; sea = 0;
          }
          if (ground.ice && !(depth > 0 && depth > -ground.sea)) {   // the ice sheets, never below the sea
            var ia = 0, prs = ground.ice.pairs;
            for (var pi = 0; pi < prs.length; pi++) { var im = iceMask(prs[pi][0], ground.ice.outlines); if (im) ia += (im[i00] * w00 + im[i10] * w10 + im[i01] * w01 + im[i11] * w11) / 255 * prs[pi][1]; }
            if (ia > 0) { ia = Math.min(1, ia) * 0.94; r0 = r0 * (1 - ia) + ICEF3[0] * ia; g0 = g0 * (1 - ia) + ICEF3[1] * ia; b0 = b0 * (1 - ia) + ICEF3[2] * ia; if (sea > 0) sea = sea * (1 - ia); }
          }
        }
        if (oldT > 0) sea = sea * (1 - oldT);   // today's inland seas and shelves fade out of the old pieces as the old look comes in
        if (sea > 0) {   // the shelf, and an inland sea: the wash, translucent over the globe's sea, blended at the shore
          r0 = r0 * (1 - sea) + SHELF3[0] * sea; g0 = g0 * (1 - sea) + SHELF3[1] * sea; b0 = b0 * (1 - sea) + SHELF3[2] * sea;
          o[oi + 3] = 255 * (1 - sea) + 255 * SHELF_A * sea;
        } else o[oi + 3] = 255;
        o[oi] = r0; o[oi + 1] = g0; o[oi + 2] = b0;
      }
      skinCtx.putImageData(out, 0, 0);
      if (alpha != null && alpha < 1) ctx.globalAlpha = alpha;
      ctx.drawImage(skinCanvas, 0, 0, W, H); ctx.globalAlpha = 1;
      lastSkinMs = performance.now() - t0;
    }
    // the molten sequence's state for an age: t the crust's progress (0 melt, 1 crusted), glow of the cracks, sea the
    // sea's strength, flash the impact's white, second whether this is the second crust, and the phase's name
    function moltenState(age) {
      var st = { t: 0, glow: 1, sea: 0, flash: 0, second: false, phase: 'molten' }, c = function (v) { return v < 0 ? 0 : (v > 1 ? 1 : v); };
      if (age >= ASSEMBLED) return st;
      if (age > MOON) {
        st.t = c((ASSEMBLED - age) / (ASSEMBLED - FIRST_CRUST));
        st.glow = Math.pow(1 - st.t, 1.3) * 0.9 + 0.05 * c((age - MOON) / (FIRST_CRUST - MOON));
        st.sea = 0.35 * c((FIRST_SEA_FROM - age) / (FIRST_SEA_FROM - FIRST_SEA_TO));
        st.phase = st.t < 1 ? 'crust' : (st.sea > 0 ? 'first sea' : 'crust');
      } else {
        st.second = true;
        st.t = c((MOON - age) / (MOON - SECOND_CRUST));
        st.glow = Math.pow(1 - st.t, 1.3) * 0.9 + 0.05;
        st.sea = c((SECOND_CRUST - age) / (SECOND_CRUST - NO_MAP));
        st.phase = st.t < 0.15 ? 'molten again' : (st.sea > 0.5 ? 'sea' : 'crust again');
      }
      var d = Math.abs(age - MOON);
      if (d <= 1.5) { st.flash = 1 - d / 1.5; st.phase = 'moon'; }
      return st;
    }
    function paintMolten(V, age) {
      var t0 = performance.now(), st = moltenState(age), cool = tex['cooling-order'], cracks = tex.cracks, grain = tex['rock-grain'];
      var out = skinTarget(), o = out.data, vc = viewPixels(V), w3 = vc.w3, inside = vc.inside, n = SW * SH;
      var thresh = st.t * 1.15 - 0.05, turn = st.second ? (137 * Math.PI / 180) : 0, ct = Math.cos(turn), sn = Math.sin(turn);
      for (var i = 0; i < n; i++) {
        if (!inside[i]) continue;
        var x = w3[3 * i], y = w3[3 * i + 1], z = w3[3 * i + 2];
        if (st.second) { var x2 = x * ct - y * sn; y = x * sn + y * ct; x = x2; z = -z; }   // a different crust: the maps turned and flipped
        var k = texIndex(x, y, z), cv = cool[k] / 255, cr = cracks[k] / 255, sw1 = grain[k] / 255;
        var solid = (thresh - cv) / 0.08; solid = solid < 0 ? 0 : (solid > 1 ? 1 : solid);
        var hot = sw1 - 0.62; hot = hot < 0 ? 0 : hot * 1.6;
        var R = 0, G = 0, B = 0, c;   // c, the channel: the pixel's own index i must not be touched here (found 19 Oct, step 5)
        for (c = 0; c < 3; c++) {
          var melt = MAGMA3[c] * (1 - sw1) + GLOW3[c] * sw1 + HOT3[c] * hot;
          var crust = CRUST3[c] * (1 - sw1) + CRUSTL3[c] * sw1 + GLOW3[c] * cr * st.glow;
          var v = melt * (1 - solid) + crust * solid;
          if (st.sea > 0) { var sea = st.sea * solid * (cv < 0.55 ? 1 : 0.35), s3 = (cv < 0.3 ? SEAD3 : SEA3)[c]; v = v * (1 - sea) + s3 * sea; }
          if (st.flash > 0) v = v * (1 - st.flash) + FLASH3[c] * st.flash;
          if (c === 0) R = v; else if (c === 1) G = v; else B = v;
        }
        var oi = i << 2;
        o[oi] = R > 255 ? 255 : R; o[oi + 1] = G > 255 ? 255 : G; o[oi + 2] = B > 255 ? 255 : B; o[oi + 3] = 255;
      }
      skinCtx.putImageData(out, 0, 0);
      ctx.drawImage(skinCanvas, 0, 0, W, H);
      lastSkinMs = performance.now() - t0;
      if (st.phase !== moltenPhase) { moltenPhase = st.phase; if (opts.onMolten) opts.onMolten(st.phase, age); }
      return st;
    }

    // a world point to the screen, through the view: the flat map's zoom, or the disc (13 Oct 2026; cities and the marker)
    function screenPoint(sx, sy, sz, r, cx, cy) {
      if (proj === 'flat') { var lonD = Math.atan2(sy, sx) * 180 / Math.PI, latD = Math.asin(Math.max(-1, Math.min(1, sz))) * 180 / Math.PI; lonD -= 360 * Math.round((lonD - fv.lon) / 360); return [flatX(lonD) * W, flatY(latD) * H]; }
      if (sz < 0.03) return null; return [cx + sx * r, cy - sy * r];
    }
    // a piece appears and goes without a pop (13 Oct 2026, Michael: the flashes at the plate boundaries): over the FADE
    // million years before its birth age (and after its end, where it has one) it dissolves into the sea
    var SEA_MID = mix(SEA, SEA_DEEP, 0.5), seaFill = SEA_MID;   // seaFill: the sea's own gradient of the draw in hand, so the cover leaves no ghost (21 Oct 2026)
    function dissolvePieces(V, age, g) {
      if (!pieces.length) return;
      var mats = {}, byAlpha = {};
      for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i], a = 0;
        if (age <= p.from && age > p.from - FADE) a = 1 - (p.from - age) / FADE;
        else if (p.to > 0 && age >= p.to && age < p.to + FADE) a = 1 - (age - p.to) / FADE;
        if (a <= 0) continue;
        var M = mats[p.plate];
        if (M === undefined) { var R = g === 'guessed' ? guessedMatrix(p.plate, age) : plateMatrixAt(p.plate, Math.max(age, 0)); M = R ? mmul(V, R) : null; mats[p.plate] = M; }
        if (!M) continue;
        var key = a.toFixed(2), path = byAlpha[key] || (byAlpha[key] = new Path2D()), rs = pieceRings(p, age, g === 'guessed' ? 'guessed' : 'model');
        for (var k = 0; k < rs.length; k++) { var q = new Path2D(); if (trace(rs[k], M, q)) path.addPath(q); }
      }
      ctx.save(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);   // the gradient is in CSS pixels: the paths go to pixel space to meet it
      for (var ak in byAlpha) { ctx.globalAlpha = +ak; ctx.fillStyle = seaFill; var pp = pixelPath(byAlpha[ak]); ctx.fill(pp, 'nonzero'); ctx.strokeStyle = seaFill; ctx.lineWidth = 2 * BLOAT_DEG * degPx() + 6; ctx.lineJoin = 'round'; ctx.stroke(pp); }   // wide enough to cover the skin's bloat and the edge beyond the outline
      ctx.restore();
      ctx.globalAlpha = 1;
    }
    // the plate under a place today, by the piece whose outline holds it (13 Oct 2026, for the marker)
    function plateAt(lon, lat) {
      for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i]; if (p.to > 0) continue;
        for (var k = 0; k < p.ll.length; k++) {
          var ring = p.ll[k], n = ring.length / 2, c = false, j = n - 1;
          for (var m = 0; m < n; m++) { var xi = ring[2 * m], yi = ring[2 * m + 1], xj = ring[2 * j], yj = ring[2 * j + 1]; if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / ((yj - yi) || 1e-9) + xi) c = !c; j = m; }
          if (c) return p.plate;
        }
      }
      return null;
    }
    // (the marker of 13 Oct and the cities of 12 Oct, which this engine drew on its own canvas, went on 20 Oct 2026, step 10
    // of the audit's order: the map's one placer draws them over both views now, carried to their place at the age by
    // placeAt and, on the disc, projected by project() below)
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
    function curveValue(pts, age) { return window.CW.curveAt(pts, window.CW.maToYear(age)); }   // the one curve reader (js/cw-time.js)
    // the part of the crust that stood above the sea, as a share of the crust: the island's share
    function exposedShare(age) {
      if (!crust || !crust.second) return 0.3;
      var c = curveValue(crust.points, age), l = curveValue(crust.second.points, age);
      return c > 0 ? Math.max(0.02, Math.min(0.9, l / c)) : 0;
    }
    function crustFraction(age) { return crust ? curveValue(crust.points, age) : 0.02; }
    function makeBlobs(age) {
      var key = seed + ':' + Math.round(age / 20);   // the shapes hold for twenty million years at a time
      if (blobsKey === key) return blobs;
      var r = mulberry((seed ^ 0x9E3779B9 ^ Math.round(age / 20)) >>> 0), total = crustFraction(age) * 4 * Math.PI, n = 5 + Math.floor(r() * 5), out = [];
      var shares = []; for (var i = 0; i < n; i++) shares.push(0.4 + r()); var sum = shares.reduce(function (a, b) { return a + b; }, 0);
      for (var k = 0; k < n; k++) {
        var area = total * shares[k] / sum, rho = Math.acos(Math.max(-1, 1 - area / (2 * Math.PI)));   // a cap of this area has this angular radius
        if (!(rho > 0.01)) continue;
        // the outline (phase 2, 21 Oct 2026): ninety-six points and three gentle harmonics, where twenty-eight points and two strong ones made corners
        var cLat = Math.asin(2 * r() - 1), cLon = (2 * r() - 1) * Math.PI, m = 96, ring = new Float64Array(m * 3), w1 = 2 + Math.floor(r() * 3), w2 = 5 + Math.floor(r() * 4), w3 = 9 + Math.floor(r() * 6), p1 = r() * 6.28, p2 = r() * 6.28, p3 = r() * 6.28;
        var c = [Math.cos(cLat) * Math.cos(cLon), Math.cos(cLat) * Math.sin(cLon), Math.sin(cLat)];
        var u = [-Math.sin(cLon), Math.cos(cLon), 0], v = [-Math.sin(cLat) * Math.cos(cLon), -Math.sin(cLat) * Math.sin(cLon), Math.cos(cLat)];
        for (var j = 0; j < m; j++) {
          var t = j / m * 2 * Math.PI, rr = rho * (1 + 0.2 * Math.sin(w1 * t + p1) + 0.1 * Math.sin(w2 * t + p2) + 0.045 * Math.sin(w3 * t + p3)), cr = Math.cos(rr), sr = Math.sin(rr);
          var x = c[0] * cr + (u[0] * Math.cos(t) + v[0] * Math.sin(t)) * sr, y = c[1] * cr + (u[1] * Math.cos(t) + v[1] * Math.sin(t)) * sr, z = c[2] * cr + (u[2] * Math.cos(t) + v[2] * Math.sin(t)) * sr;
          ring[3 * j] = x; ring[3 * j + 1] = y; ring[3 * j + 2] = z;
        }
        out.push(ring);
      }
      blobs = out; blobsKey = key; return out;
    }

    // a ring's corners cut (Chaikin), by t — 0 leaves it, 1 cuts every corner to its quarter points — a pass at a time, the
    // points put back on the sphere: the cratons are softened a little when drawn as guesses (phase 2, 21 Oct 2026), the
    // softening coming in with the old look over the FADE before the reach so that no shape jumps there
    function soften(arr, t, passes) {
      var cur = arr;
      for (var pass = 0; pass < passes; pass++) {
        var n = cur.length / 3, out = new Float64Array(n * 6), q = t / 4;
        for (var i = 0; i < n; i++) {
          var j = (i + 1) % n, ax = cur[3 * i], ay = cur[3 * i + 1], az = cur[3 * i + 2], bx = cur[3 * j], by = cur[3 * j + 1], bz = cur[3 * j + 2];
          var dx = bx - ax, dy = by - ay, dz = bz - az;
          var x1 = ax + dx * q, y1 = ay + dy * q, z1 = az + dz * q, m1 = Math.hypot(x1, y1, z1) || 1;
          var x2 = bx - dx * q, y2 = by - dy * q, z2 = bz - dz * q, m2 = Math.hypot(x2, y2, z2) || 1;
          out[6 * i] = x1 / m1; out[6 * i + 1] = y1 / m1; out[6 * i + 2] = z1 / m1;
          out[6 * i + 3] = x2 / m2; out[6 * i + 4] = y2 / m2; out[6 * i + 5] = z2 / m2;
        }
        cur = out;
      }
      return cur;
    }
    var SOFT_PASSES = 2;
    // a piece's rings as drawn at an age: today's outline at the model's ages, softened as a guess, the softening blending in
    // over the FADE before the reach
    function pieceRings(p, age, how) {
      if (how === 'guessed') { if (!p.soft) p.soft = p.rings.map(function (r) { return soften(r, 1, SOFT_PASSES); }); return p.soft; }
      var t = age > reach - FADE ? Math.min(1, (age - (reach - FADE)) / FADE) : 0;
      if (t <= 0) return p.rings;
      return p.rings.map(function (r) { return soften(r, t, SOFT_PASSES); });
    }
    // a ring shrunk toward its own centre on the sphere by a share k of area (the square root in length): the island
    function shrunk(arr, k) {
      var n = arr.length / 3, cx = 0, cy = 0, cz = 0, i;
      for (i = 0; i < n; i++) { cx += arr[3 * i]; cy += arr[3 * i + 1]; cz += arr[3 * i + 2]; }
      var L = Math.hypot(cx, cy, cz) || 1; cx /= L; cy /= L; cz /= L;
      var f = Math.sqrt(k), out = new Float64Array(n * 3);
      for (i = 0; i < n; i++) {
        var x = cx + f * (arr[3 * i] - cx), y = cy + f * (arr[3 * i + 1] - cy), z = cz + f * (arr[3 * i + 2] - cz), m = Math.hypot(x, y, z) || 1;
        out[3 * i] = x / m; out[3 * i + 1] = y / m; out[3 * i + 2] = z / m;
      }
      return out;
    }

    // ---- the bodies: what is drawn at an age, and where (21 Oct 2026, the earliest continents) ----
    // at the model's ages and the guessed ages a body is a plate with its living pieces; at the invented ages a blob. fn(id, rings, M)
    // is called once per body with its rings in its own frame and its matrix at the age, by how: 'model', 'guessed' or 'invented'
    function eachBody(age, how, fn) {
      if (how === 'invented') { makeBlobs(age).forEach(function (ring, i) { fn('b' + i, [ring], blobMatrix(i, age)); }); return; }
      var byPlate = {}, order = [];
      for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];
        if (age > p.from || age < p.to) continue;
        var list = byPlate[p.plate]; if (!list) { list = byPlate[p.plate] = []; order.push(p.plate); }
        var rs = pieceRings(p, age, how);
        for (var k = 0; k < rs.length; k++) list.push(rs[k]);
      }
      for (var j = 0; j < order.length; j++) { var M = bodyMatrixAt(order[j], age, how); if (M) fn(order[j], byPlate[order[j]], M); }
    }
    function bodyMatrixAt(id, age, how) {
      if (how === 'invented') return typeof id === 'string' && id.charAt(0) === 'b' ? blobMatrix(+id.slice(1), age) : null;
      return how === 'guessed' ? guessedMatrix(id, age) : plateMatrixAt(id, Math.max(age, 0));
    }
    function blobMatrix(i, age) { return IDENT; }   // a blob stands where it was made, until the motion model

    // ---- the data ----
    function prepare(d) {
      data = d; ages = d.ages; grades = d.grades || []; reach = d.reach || ages[ages.length - 1];
      for (var pid in d.plates) { var P = d.plates[pid]; plates[pid] = { first: P.first, q: P.rot.map(function (r) { return quat(r[0], r[1], r[2]); }) }; }
      pieces = d.pieces.map(function (p) {
        return { plate: String(p.plate), from: p.from, to: p.to, ll: p.rings, rings: p.rings.map(function (ring) {
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
      var why = GRADE_WORDS[g] || '';
      if (g === 'none' && moltenReady()) why = MOLTEN_WORDS[moltenState(age).phase] || why;
      return { grade: g, why: why };
    }

    // ---- drawing ----
    function size() {
      var w = host.clientWidth || host.getBoundingClientRect().width || 400;
      var D = Math.round(opts.size || (proj === 'flat' ? w : Math.min(w, 560)));   // the flat map takes its host's whole width (9 Oct); the disc is capped
      W = D; H = proj === 'flat' ? Math.round(D / 2) : D;
      if (proj === 'flat' && opts.fill) { W = Math.max(2, Math.round(w)); H = Math.max(2, Math.round(host.clientHeight || host.getBoundingClientRect().height || W / 2)); }   // the box itself (19 Oct 2026)
      applyFlatView();
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
          var px = flatX(pts[j] * 180 / Math.PI + off * 360), py = flatY(pts[j + 1] * 180 / Math.PI);
          if (j === 0) into.moveTo(px, py); else into.lineTo(px, py);
        }
        into.closePath();
      }
      return true;
    }
    var trace = function (arr, M, into) { return proj === 'flat' ? traceFlat(arr, M, into) : traceGlobe(arr, M, into); };
    var lastLand = null, lastIslands = null;   // the last unshifted land and islands drawn, for the wash and the islands
    function landPath(V, age, how) {
      var Vs = V, mats = {}, land = new Path2D(), islands = new Path2D(), any = false;
      var share = (how === 'guessed' || how === 'invented') ? exposedShare(age) : 0;
      function add(ring, M) {
        var p = new Path2D();
        if (!trace(ring, M, p)) return;
        land.addPath(p); any = true;
        if (share > 0) { var q = new Path2D(); if (trace(shrunk(ring, share), M, q)) islands.addPath(q); }
      }
      if (how === 'invented') makeBlobs(age).forEach(function (ring) { add(ring, Vs); });
      else for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];
        if (age > p.from || age < p.to) continue;
        var M = mats[p.plate];
        if (M === undefined) { var R = how === 'guessed' ? guessedMatrix(p.plate, age) : plateMatrixAt(p.plate, age); M = R ? mmul(Vs, R) : null; mats[p.plate] = M; }
        if (!M) continue;
        var rs = pieceRings(p, age, how);
        for (var k = 0; k < rs.length; k++) add(rs[k], M);
      }
      lastLand = any ? land : null; lastIslands = share > 0 && any ? islands : null;
      return any ? land : null;
    }
    function fillLand(path, colour, alpha, edge, edgeAlpha) {
      if (!path) return;
      // a guessed or invented edge is dashed or dotted — but the edge of the union, never of each piece:
      // the dashes are stroked wide under an opaque fill, so only their outer half shows, round the land
      if (edge) { ctx.globalAlpha = edgeAlpha != null ? edgeAlpha : 0.85; ctx.strokeStyle = COAST; ctx.lineWidth = 3 * unit(); ctx.setLineDash(edge === 'dashed' ? [5 * unit(), 4 * unit()] : [1.5 * unit(), 3.5 * unit()]); ctx.stroke(path); ctx.setLineDash([]); alpha = 1; }
      ctx.globalAlpha = alpha; ctx.fillStyle = colour; ctx.fill(path, 'nonzero');
      ctx.strokeStyle = colour; ctx.lineWidth = 1.6 * unit(); ctx.stroke(path);   // closes the hairline gaps between pieces, and covers the dashes' inner half
      if (edge && lastIslands) { ctx.fillStyle = LAND; ctx.fill(lastIslands, 'nonzero'); ctx.strokeStyle = LAND; ctx.lineWidth = 1.2 * unit(); ctx.stroke(lastIslands); }   // the part above the sea
      ctx.globalAlpha = 1;
    }
    // the same path in screen pixels (Path2D.addPath with a matrix), for strokes that must be the same width in every direction
    function pixelPath(unitPath) {
      var pp = new Path2D(), m = proj === 'flat' ? new DOMMatrix([W, 0, 0, H, 0, 0]) : new DOMMatrix([W / 2 - 4, 0, 0, W / 2 - 4, W / 2, H / 2]);
      pp.addPath(unitPath, m); return pp;
    }
    function degPx() { return proj === 'flat' ? fv.ppd : (W / 2 - 4) * Math.PI / 180; }   // one degree of arc in pixels (at the disc's centre)
    var BLOAT_DEG = 0.75 * 360 / TW;   // how far the raster's gap-closing stroke carries a piece's skin past its outline, in degrees
    // the shelf round each old piece (21 Oct 2026): the land's outline enlarged by SHELF_DEG, in the shelf wash, translucent,
    // under the crust — a wide round stroke of the union, whose inner half the crust covers. A piece being born (dissolving in)
    // brings its shelf in with it: the strokes are grouped by the pieces' birth fade
    function shelfRim(V, age, how, strength) {
      var groups = {};
      eachBodyRings(age, how, function (ring, M, a) {
        var key = a.toFixed(2), path = groups[key] || (groups[key] = new Path2D()), q = new Path2D();
        if (trace(ring, M, q)) path.addPath(q);
      });
      ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = S.shelfWash || '#7fb0cc'; ctx.lineWidth = 2 * SHELF_DEG * degPx();
      for (var k in groups) { ctx.globalAlpha = RIM_A * (+k) * strength; ctx.stroke(pixelPath(groups[k])); }
      ctx.restore();
    }
    // a hairline in the drowned crust's tone along the land's edge, under the skin, so that only its outer half shows: it
    // cleans the raster's stair-steps at the coast, and the joins between the pieces of one plate stay covered
    function crustEdge(V, age, how, strength) {
      var td = Math.max(0, Math.min(1, (age - OXYGEN) / (DARK_BY - OXYGEN))), path = new Path2D();
      eachBodyRings(age, how, function (ring, M, a) { if (a < 1) return; var q = new Path2D(); if (trace(ring, M, q)) path.addPath(q); });
      ctx.save(); ctx.lineJoin = 'round'; ctx.strokeStyle = mix(mix(S.rockGrey, S.rockTan, 0.5), S.oldCrust, td); ctx.lineWidth = 2 * BLOAT_DEG * degPx() + 2.4; ctx.globalAlpha = strength; ctx.stroke(pixelPath(path));   // as wide as the skin's bloat, so its smooth outer edge is the land's edge
      ctx.restore();
    }
    // the islands and the drowned parts (21 Oct 2026, phase 2; as paths, smooth at any zoom, where the raster's stairs showed): over
    // the skin, the band between each piece's outline and its island — the part under shallow water — takes the shelf wash
    // (the outlines and the islands filled together, even-odd), and the island is lifted a touch lighter
    function drownedBand(V, age, how, strength) {
      var share = exposedShare(age); if (!(share > 0) || !(strength > 0)) return;
      var bands = {}, isles = {};
      eachBodyRings(age, how, function (ring, M, a) {
        var key = a.toFixed(2), band = bands[key] || (bands[key] = new Path2D()), isle = isles[key] || (isles[key] = new Path2D());
        var q = new Path2D(); if (!trace(ring, M, q)) return; band.addPath(q);
        var q2 = new Path2D(); if (trace(shrunk(ring, share), M, q2)) { band.addPath(q2); isle.addPath(q2); }
      });
      ctx.save();
      for (var k in bands) {
        ctx.globalAlpha = DROWN_W * strength * (+k); ctx.fillStyle = S.shelfWash || '#7fb0cc'; ctx.fill(pixelPath(bands[k]), 'evenodd');
        ctx.globalAlpha = LIFT_A * strength * (+k); ctx.fillStyle = LIFT; ctx.fill(pixelPath(isles[k]), 'nonzero');
      }
      ctx.restore();
    }
    // every ring of every body at the age, through the view, with the piece's birth fade (1 whole; less while it dissolves in)
    function eachBodyRings(age, how, fn) {
      if (how === 'invented') { makeBlobs(age).forEach(function (ring, i) { fn(ring, mmul(V_now, blobMatrix(i, age)), 1); }); return; }
      var mats = {};
      for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];
        if (age > p.from || age < p.to) continue;
        var a = 1;
        if (age > p.from - FADE) a = (p.from - age) / FADE;
        else if (p.to > 0 && age < p.to + FADE) a = (age - p.to) / FADE;
        if (a <= 0) continue;
        var M = mats[p.plate];
        if (M === undefined) { var R = bodyMatrixAt(p.plate, age, how); M = R ? mmul(V_now, R) : null; mats[p.plate] = M; }
        if (!M) continue;
        var rs = pieceRings(p, age, how);
        for (var k = 0; k < rs.length; k++) fn(rs[k], M, a);
      }
    }
    var V_now = IDENT;   // the view matrix of the draw in hand, for the helpers above
    // ---- the climate wash: a model by latitude, by distance from the sea, and by the cold ages ----
    function iceReach(age) {   // the latitude the ice reaches down to, or null when the world was warm
      for (var i = 0; i < ICEHOUSES.length; i++) if (age <= ICEHOUSES[i][0] && age >= ICEHOUSES[i][1]) return ICEHOUSES[i][2];
      return null;
    }
    // the glaciations of deep time (Michael's ruling 3, 19 Oct 2026): a soft, translucent overlay with feathered edges, over
    // land and sea alike, fading in and out with each cold age — never a sharp line, and bare land never shows on top of
    // it. Per pixel: the latitude under the pixel at this age against the ice's reach, feathered over sixteen degrees and
    // roughened by the grain; a cold age's strength ramps up over its first tenth and down over its last. (This side of
    // the seam the map's own ice sheets are the ice; the globe at the ground grade shows none yet.)
    function iceStrength(age) {   // the cold age this age falls in: [its reach, how strong], or null when the world was warm
      for (var i = 0; i < ICEHOUSES.length; i++) {
        var h = ICEHOUSES[i]; if (age > h[0] || age < h[1]) continue;
        var ramp = Math.max(2, (h[0] - h[1]) * 0.1), st = Math.min(1, (h[0] - age) / ramp, (age - h[1]) / ramp);
        return [h[2], Math.max(0, st)];
      }
      return null;
    }
    function paintIce(V, age) {
      var st = iceStrength(age); if (!st || st[1] <= 0) return;
      var reach = st[0], strength = st[1], grain = tex['rock-grain'], vc = viewPixels(V), w3 = vc.w3, ks = vc.k, inside = vc.inside, n = SW * SH;
      var out = skinTarget(), o = out.data, north = !(age <= 34 && age > 2.6);   // the Antarctic ice came first; the north's from 2.6
      var snowball = reach <= 0, heart = snowball ? 0.9 : DEEP_ICE_A;   // a snowball has no edge to feather: white all over, a little stronger
      for (var i = 0; i < n; i++) {
        if (!inside[i]) continue;
        var z = w3[3 * i + 2], lat = Math.asin(z > 1 ? 1 : (z < -1 ? -1 : z)) * 180 / Math.PI;
        if (lat > 0 && !north) continue;
        var a = snowball ? 1 : (Math.abs(lat) - (reach - 10)) / 16; if (a <= 0) continue; if (a > 1) a = 1;
        a = a * a * (3 - 2 * a);
        if (grain) { a *= 0.8 + 0.4 * grain[ks[i]] / 255; if (a > 1) a = 1; }
        var oi = i << 2; o[oi] = ICE3[0]; o[oi + 1] = ICE3[1]; o[oi + 2] = ICE3[2]; o[oi + 3] = 255 * heart * strength * a;
      }
      skinCtx.putImageData(out, 0, 0);
      ctx.drawImage(skinCanvas, 0, 0, W, H);
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
      // the sea, or the magma: without the textures (or before they load) through Molten the ball fades with the
      // age — magma at 4.6 billion, black by 4.4, the sea's blue from there (12 Oct); with them, part 7's sequence below
      var sea = proj === 'flat' ? ctx.createLinearGradient(0, 0, 0, H) : ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
      var top = SEA, bottom = SEA_DEEP;
      if (ma >= NO_MAP) { var tm = Math.min(1, Math.max(0, (ma - NO_MAP) / (MOLTEN_START - NO_MAP))); top = mix(BLACK, MAGMA_GLOW, tm); bottom = mix(BLACK, MAGMA, tm); }
      sea.addColorStop(0, top); sea.addColorStop(1, bottom);
      seaFill = sea;
      ctx.fillStyle = sea;
      if (proj === 'flat') ctx.fillRect(0, 0, W, H); else { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); }
      ctx.save();
      if (proj === 'flat') { ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip(); } else { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip(); }
      // the per-pixel passes, in CSS pixels before the unit transform: the molten sequence, or the land's skin for the
      // model's ages (while the globe itself is dragged, coarser; in play too, since 19 Oct 2026 — the fast flag that
      // put flat fills in its place is gone)
      var skinned = false, moltenSt = null, old = g === 'guessed' || g === 'invented', how = old ? g : 'model';
      V_now = V;
      // the old look — the shelves, the islands, the drowned wash — comes in over the FADE million years before the model's reach
      // (the crossfade of the skin into the pale guessed fill of 13 Oct 2026 went 21 Oct: the guessed positions begin where the
      // model's end, and the guessed pieces take the skin, so nothing switches at the reach but the knowing)
      var tg = old ? 1 : ((data && g === 'fitted') ? Math.max(0, Math.min(1, (ma - (reach - FADE)) / FADE)) : 0);
      lastSkinMs = 0;
      if (g === 'none' && moltenReady()) moltenSt = paintMolten(V, ma);
      else if (data && skinReady() && g !== 'none') { if (tg > 0) { shelfRim(V, ma, how, tg); crustEdge(V, ma, how, tg); } paintSkin(V, ma, g, 1, how, tg); skinned = true; if (tg > 0) drownedBand(V, ma, how, tg); }
      enterUnit(r, cx, cy);
      if (data && g !== 'none') {
        if (!skinned) {   // without the textures (or before they load): the flat fills, as before 21 Oct 2026
          var tg = g === 'fitted' ? Math.max(0, Math.min(1, (ma - (reach - FADE)) / FADE)) : 0;
          if (g === 'measured' || g === 'ground') fillLand(landPath(V, Math.max(ma, 0), 'model'), LAND, g === 'ground' ? 0.45 : 1, null);
          else if (g === 'inferred') fillLand(landPath(V, ma, 'model'), LAND, 1, null);   // the model's own position, once: a guess called a guess, not a smear (Michael, 10 Oct; the seven shifted copies are gone)
          else if (g === 'fitted') { fillLand(landPath(V, ma, 'model'), LAND, 1 - tg, null); if (tg > 0) fillLand(landPath(V, ma, 'guessed'), LAND_PALE, 0.7 * tg, 'dashed', 0.85 * tg); }
          else if (g === 'guessed') fillLand(landPath(V, ma, 'guessed'), LAND_PALE, 0.7, 'dashed');
          else if (g === 'invented') fillLand(landPath(V, ma, 'invented'), LAND_PALE, 0.5, 'dotted');
        }
        if (g !== 'invented') dissolvePieces(V, ma, g);
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
      // (the graticule, every thirty degrees, went 19 Oct 2026: Spec-Maps rules out a graticule, Michael's ruling 6)
      ctx.restore(); ctx.restore();
      if (data && g !== 'none' && g !== 'ground') paintIce(V, ma);   // over the land and the sea, under the cities and the marker
      // the limb shading and the haze at the rim (12 Oct): a ball, with an atmosphere — blue once there is a sea, grey steam before
      if (proj !== 'flat') {
        var shade = ctx.createRadialGradient(cx, cy, r * 0.78, cx, cy, r);
        shade.addColorStop(0, 'rgba(20,16,12,0)'); shade.addColorStop(1, 'rgba(20,16,12,0.30)');
        ctx.fillStyle = shade; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
        var hazeCol = g === 'none' && !(moltenSt && moltenSt.sea > 0.5) ? '200,190,180' : '160,200,228';
        var haze = ctx.createRadialGradient(cx, cy, r - 1, cx, cy, r + 4);
        haze.addColorStop(0, 'rgba(' + hazeCol + ',0.55)'); haze.addColorStop(1, 'rgba(' + hazeCol + ',0)');
        ctx.fillStyle = haze; ctx.beginPath(); ctx.arc(cx, cy, r + 4, 0, Math.PI * 2); ctx.arc(cx, cy, r - 1, 0, Math.PI * 2, true); ctx.fill();
      }
      // the limb (the flat map's frame went 19 Oct 2026: Spec-Maps rules out a frame, Michael's ruling 6)
      if (proj !== 'flat') { ctx.strokeStyle = S.limb; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); }
      var ms = performance.now() - t0;
      if (opts.onDraw) opts.onDraw(ms);
      var gw = gradeFor(ma), gkey = g + ':' + gw.why;
      if (opts.onGrade && gkey !== lastGrade) { lastGrade = gkey; opts.onGrade(g, gw.why); }
    }
    function schedule() { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }

    // ---- the gesture: drag turns (east–west about the pole) and tilts (north–south, the poles the limits) ----
    var drag = null;
    canvas.addEventListener('pointerdown', function (ev) {
      drag = { id: ev.pointerId, x: ev.clientX, y: ev.clientY, lon: lon0, lat: lat0, flat: fv.lat, flatY: fwY(fv.lat) };
      ev.preventDefault(); try { canvas.setPointerCapture(ev.pointerId); } catch (e) {}
      host.classList.add('dragging');
    });
    canvas.addEventListener('pointermove', function (ev) {
      if (!drag || ev.pointerId !== drag.id) return;
      if (proj === 'flat') {
        if (opts.onDrag) { opts.onDrag(ev.clientX - drag.x, ev.clientY - drag.y); drag.x = ev.clientX; drag.y = ev.clientY; return; }   // the page's view: it pans (19 Oct 2026)
        lon0 = drag.lon - (ev.clientX - drag.x) / fv.ppd; fv.lon = lon0;   // the view of its own, with no page to pan
        fv.lat = Math.max(-85, Math.min(85, fwYInv(drag.flatY + (ev.clientY - drag.y) / fv.ppd)));
      }
      else {
        var k = 180 / (W || 400);
        lon0 = drag.lon - (ev.clientX - drag.x) * k;
        lat0 = Math.max(-90, Math.min(90, drag.lat + (ev.clientY - drag.y) * k));
        if (opts.onTurn) opts.onTurn();   // the page's marks follow the turn (step 10)
      }
      schedule();
    });
    function release(ev) { if (drag && ev.pointerId === drag.id) { drag = null; host.classList.remove('dragging'); schedule(); } }
    canvas.addEventListener('pointerup', release); canvas.addEventListener('pointercancel', release);

    load(opts.plates || '../stories/plates/continents.json', prepare);
    loadTextures();
    load(opts.coast === undefined ? '../art/maps/world-tiles/contours-0.json' : opts.coast, prepareCoast);
    load(opts.crust === undefined ? '../stories/curves/crust-and-land.json' : opts.crust, function (c) { crust = c; blobsKey = null; schedule(); });
    if (window.ResizeObserver) { ro = new ResizeObserver(function () { size(); schedule(); }); ro.observe(host); }
    size(); draw();

    return {
      setTime: function (m) { ma = Math.max(0, m); schedule(); },
      time: function () { return ma; },
      view: function () { return { lon: lon0, lat: lat0 }; },
      turn: function (lon, lat) { if (lon != null) lon0 = lon; if (lat != null) lat0 = Math.max(-90, Math.min(90, lat)); schedule(); if (opts.onTurn) opts.onTurn(); },
      // a place (already carried to its position at the age) as a pixel of this canvas, or null on the far side of the disc (step 10)
      project: function (lon, lat) {
        var V = viewMatrix(), v = xyz(lon, lat);
        if (proj === 'flat') { V = mmul([1, 0, 0, 0, 1, 0, 0, 0, 1], rotZ(-lon0)); }
        var sx = V[0] * v[0] + V[1] * v[1] + V[2] * v[2], sy = V[3] * v[0] + V[4] * v[1] + V[5] * v[2], sz = V[6] * v[0] + V[7] * v[1] + V[8] * v[2];
        var q = screenPoint(sx, sy, sz, W / 2 - 4, W / 2, H / 2);
        return q ? { x: q[0], y: q[1] } : null;
      },
      // the flat map's view, the page's (19 Oct 2026, step 6): centre and pixels per degree, the ground map's own
      setView: function (v) { if (proj !== 'flat' || !v) return; flatView = { lon: v.lon, lat: v.lat, ppd: v.ppd, k: v.k || 0 }; applyFlatView(); schedule(); },
      // a place today, carried to where it was at the current age on its plate (for a page's zoom to an event's place)
      placeAt: function (lon, lat) {
        if (!data) return { lon: lon, lat: lat };
        var g = gradeFor(ma).grade, pid = plateAt(lon, lat), M = null;
        if (pid) M = g === 'guessed' || g === 'invented' ? guessedMatrix(pid, ma) : plateMatrixAt(pid, Math.max(ma, 0));
        if (!M) return { lon: lon, lat: lat };
        var v = xyz(lon, lat), wx = M[0] * v[0] + M[1] * v[1] + M[2] * v[2], wy = M[3] * v[0] + M[4] * v[1] + M[5] * v[2], wz = M[6] * v[0] + M[7] * v[1] + M[8] * v[2];
        return { lon: Math.atan2(wy, wx) * 180 / Math.PI, lat: Math.asin(Math.max(-1, Math.min(1, wz))) * 180 / Math.PI };
      },
      setGround: function (gs) { ground = gs || null; schedule(); },   // { sea, ice: { outlines, pairs } } from the page's map (step 8)
      setFloor: function (t) { floorTex = t || null; schedule(); },      // the floor's depth at the texture's size, from the map
      grade: function () { return gradeFor(ma); },
      moltenPhase: function () { return ma > NO_MAP ? moltenState(ma).phase : null; },
      skinMs: function () { return lastSkinMs; },
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
