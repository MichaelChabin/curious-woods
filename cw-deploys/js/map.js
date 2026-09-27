/* map.js — Curious Woods maps. One earth, many crops.
   Spec: CWVault/claude/Spec-Maps.md.

   cwMap(container, region, marks, opts)   the base picture in the box, its layers, the story's marks over it
   cwMapWindow(region, marks, opts)        the same map in the picker window from Glass Geometry
   cwWindow(content, opts)           that window, holding anything (a picture, zoomable); see below
   cwMap.load(url)                   fetch a region's JSON and resolve its picture beside it
   cwMap.toPixel / cwMap.toLonLat    the projection pair (below)

   `region` is the JSON render.py writes: corners, standard parallel, pixel size, image,
   and the contours. `marks` is an array of four kinds and no others:
     { type:'place',  lat, lon, name, text?, story?, side?, lit?, minor?, world?, on?, onTap? }  a dot and a name
     { type:'path',   places:[ name | [lat, lon], ... ], possible? }  straight segments; `possible` dashes them
     { type:'region', points:[ [lat, lon], ... ], wash }        a wash, no outline: 'grows' (green) or 'made' (violet)
     { type:'note',   lat, lon, text, side?, water? }           words at a point, no dot
   Latitude and longitude come in; pixels come out.

   The world that moves (27 Sep 2026, Spec-Maps "The world that moves"). Given the pyramid
   (`world-pyramid.json`: tiles at six scales) as its region, the map is a view rather than
   a box: a centre and a scale, the horizontal scale following the cosine of the centre's
   latitude, tiles arriving for what is in view and dropped when it leaves. Drag pans;
   pinch and the wheel zoom (by tenths, as Glass Geometry's do), clamped to the pyramid;
   labels keep the side they were given while a gesture lasts and are placed afresh when it
   ends, so nothing jitters under her finger. A strip along the bottom edge — the window's
   drag handle, turned to this use — resizes the height; the word at its right (`reset`,
   or opts.reset) returns view and size to what the story set. `opts.fit` is that opening
   box; `map.centre(lat, lon)` slides there at her scale in 250 ms; `map.fit(box)` fits a
   route; `map.home()` is the word's own act. Weight: a mark's `weight` (1 to 3, 1 if
   unsaid) places it before lighter marks, so the heavier survives a collision — on every
   map, since it is one placer.

   The ground has layers (26 Sep 2026). The base picture is height alone. The region's
   JSON lists its layers — ice, vegetation, later sea level — each a half-width RGBA
   picture beside the base with a blend (`normal` for ice, `multiply` for vegetation)
   and whether it is on by default. A layer that is on is an image over the base and
   under the SVG, never a pointer target. `opts.layers` turns layers on or off by name,
   `{ vegetation: false }`; everything unnamed takes the region's default. Label
   placement reads the ground with the layers composited in.

   A place's text opens in a small block beside its dot. One block is open at a time, and
   any other action — a tap anywhere else on the page, a key — closes it (21 Sep 2026).
   Tapping the same dot again closes it too.

   The lines (third pass, 20 Sep 2026). The coast (the contour at 0 m) and the shelf edge
   (−200 m) come with the region and are drawn on every map, under the marks and over the
   picture, one pixel at every size (a non-scaling stroke). They are the earth's, not the
   story's, and they are not an option.

   The labels. The dot carries the meaning, the type carries the name: a place the story
   names gets a 4 px vermilion dot and 15 px type; a lesser one (`minor`) a 3 px grey dot
   and 13 px; water (a note with `water`) 15 px italic. `lit` keeps the copper dot that
   means "the one the story is about". The ink is one warm near-black everywhere and a
   translucent halo under the glyphs supplies the contrast locally, because no single ink
   is legible over both pale land and dark water. Sizes are screen pixels, whatever the
   picture's size. Each label tries eight positions round its dot and takes the one least
   crowded by other labels and on the most even ground; a label that would overlap another
   is dropped rather than drawn. A mark's own `side` is honoured when it fits.

   For a timeline over a map (Spec-Timeline-and-Map, 21 Sep 2026): `world` draws the dot in
   slate, the colour of the world's events, where a place the person belongs to stays
   vermilion; `on` marks the place of the selected event, a larger vermilion dot with a
   glow and a bold name; `onTap(mark)` is called when the place is tapped, and the tap goes
   no further, so a page can clear its selection on a tap that lands on empty ground.

   Nothing responds to hover. Classic script, no dependencies. */
(function () {
  'use strict';

  var VERMILION = '#c84830';
  var COPPER = '#b87333';                 // the one the story is about; nothing else
  var INK = '#2a241c';                    // every label
  var HALO = '#f4f1ea';                   // under every label, translucent
  var HALO_ALPHA = 0.7;
  var HALO_PX = 3;
  var GREY = '#8a8378';                   // a lesser place's dot
  var SLATE = '#3f5a78';                  // a place that belongs to the world's events, not the person's
  var PAPER = '#f0ece0';                  // the ground of a text block
  var DOT = 4;                            // screen pixels, whatever the picture's size
  var DOT_MINOR = 3;
  var TAP = 14;                           // the invisible circle a finger actually hits
  var WASH = 0.18;
  var WASHES = { grows: '#33663f', made: '#5a4a8c' };   // what grows; what people made. Two only.
  var FONT = 'Georgia, "Times New Roman", Times, serif';
  var SIZE = 15, SIZE_MINOR = 13, SIZE_TEXT = 13;
  var LINES = { '0': { stroke: '#4a4336', opacity: 0.55 },      // the coast
                '-200': { stroke: '#2f5c78', opacity: 0.30 } };  // the shelf edge
  var WINDOW_MAP_WIDTH = 380;             // the story page's stage width; a map in a window is this wide
  var SAMPLE_WIDTH = 400;                 // the picture is read at this width for label placement
  var STAGE_MIN = 220, STAGE_MAX_FRACTION = 0.85;   // a moving map's height: at least this, at most this much of the window
  var SLIDE_MS = 250;                     // centre() and fit(): one short slide, never a flight
  var TAP_PX = 6;                         // a press that moves less than this is a tap, not a drag
  var SVG = 'http://www.w3.org/2000/svg';

  var css = [
    '.cw-map img.cw-layer{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;}',
    /* the map that moves */
    '.cw-map .cw-stage{position:relative;overflow:hidden;width:100%;touch-action:none;cursor:grab;background:#93bed7;}',
    '.cw-map .cw-stage.dragging{cursor:grabbing;}',
    '.cw-map .cw-tiles{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;}',
    '.cw-map .cw-tiles img{position:absolute;display:block;width:auto;height:auto;max-width:none;pointer-events:none;}',
    /* the strip is the picker's drag handle turned to this use, with the handle's own tint
       (rgba(200,184,154,.25)) so it reads as a thing to take hold of, not as the page */
    '.cw-map .cw-strip{height:16px;border-radius:0 0 8px 8px;cursor:ns-resize;display:flex;align-items:center;justify-content:flex-end;padding:0 10px;background:rgba(200,184,154,0.28);touch-action:none;user-select:none;-webkit-user-select:none;line-height:16px;}',
    '.cw-map .cw-strip span{font-family:Georgia,serif;font-size:13px;font-weight:bold;color:#b0a090;cursor:default;transition:color 80ms;}',
    '.cw-map .cw-strip-left{position:absolute;left:-18px;top:0;width:16px;border-radius:8px 0 0 8px;cursor:ew-resize;background:rgba(200,184,154,0.28);touch-action:none;user-select:none;-webkit-user-select:none;}',
    'html.cw-map-gesture, html.cw-map-gesture *{user-select:none !important;-webkit-user-select:none !important;}',
    '.cw-map .cw-strip span:hover{color:#546A80;}',
    '.cw-map{position:relative;line-height:0;}',
    '.cw-map img{display:block;width:100%;height:auto;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;}',
    '.cw-map svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;cursor:default;}',
    '.cw-map svg path.cw-line{fill:none;stroke-width:1px;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke;pointer-events:none;}',
    '.cw-map svg text{font-family:' + FONT + ';font-size:' + SIZE + 'px;fill:' + INK + ';pointer-events:none;user-select:none;-webkit-user-select:none;}',
    '.cw-map svg text.cw-minor{font-size:' + SIZE_MINOR + 'px;}',
    '.cw-map svg text.cw-water{font-style:italic;}',
    '.cw-map svg text.cw-on{font-weight:bold;}',
    '.cw-map svg g.cw-halos text{fill:none;stroke:' + HALO + ';stroke-width:' + (2 * HALO_PX) + 'px;stroke-linejoin:round;stroke-linecap:round;}',
    '.cw-map svg g.cw-halos{opacity:' + HALO_ALPHA + ';}',
    '.cw-map .cw-map-text{position:absolute;font-family:' + FONT + ';font-size:' + SIZE_TEXT + 'px;line-height:1.35;color:' + INK + ';background:' + PAPER + ';padding:5px 8px;max-width:220px;pointer-events:none;user-select:none;-webkit-user-select:none;}',
    /* the window: Glass Geometry's picker, copied */
    '.cw-map-backdrop{position:fixed;inset:0;z-index:600;}',
    '.cw-map-window{position:fixed;z-index:601;background:#f0ede4;border:0.5px solid #c8b89a;border-radius:8px;padding:18px;box-shadow:0 4px 24px rgba(42,38,32,0.18);opacity:0;transition:opacity 200ms ease-in;pointer-events:none;max-height:85vh;overflow-y:auto;box-sizing:border-box;max-width:calc(100vw - 16px);}',
    '.cw-map-window.visible{opacity:1;pointer-events:all;}',
    '.cw-map-drag{height:14px;margin:-18px -18px 0 -18px;border-radius:8px 8px 0 0;cursor:grab;display:flex;align-items:center;justify-content:flex-end;padding:0 10px;position:sticky;top:-18px;z-index:1;background:#f0ede4;touch-action:none;}',
    '.cw-map-drag:active{cursor:grabbing;}',
    /* the strip stays put while a tall window scrolls (a poem, a letter). It sticks at -18px, the
       window's padding, so it sits on the window's top edge: at top:0 it stuck 18px down and the
       words showed through the slit above it before vanishing under it, which read as a glitch.
       The words fade under it rather than meeting a hard edge (26 Sep 2026, Michael) */
    '.cw-map-drag::after{content:"";position:absolute;left:0;right:0;top:100%;height:12px;pointer-events:none;background:linear-gradient(#f0ede4,rgba(240,237,228,0));}',
    '.cw-map-close{font-family:Georgia,serif;font-size:13px;font-weight:bold;color:#b0a090;cursor:default;transition:color 80ms;pointer-events:all;line-height:14px;}',
    '.cw-map-close:hover{color:#546A80;}',
    '.cw-map-window .cw-map{margin-top:14px;width:' + WINDOW_MAP_WIDTH + 'px;max-width:100%;}',
    /* a picture in the window (cwWindow): at the reading column's width, its caption under it */
    '.cw-map-window figure{margin:14px 0 0;}',
    '.cw-map-window figure img{display:block;width:700px;max-width:100%;height:auto;}',
    '.cw-map-window figcaption{font-family:Georgia,serif;font-size:13px;line-height:1.35;color:#6b625a;margin-top:8px;max-width:700px;}',
    /* a picture she can zoom and pan (cwWindow with opts.zoom): the sampler's gestures */
    '.cw-zoom{position:relative;overflow:hidden;touch-action:none;cursor:zoom-in;user-select:none;-webkit-user-select:none;}',
    '.cw-zoom.zoomed{cursor:grab;}',
    '.cw-zoom img{transform-origin:0 0;-webkit-user-drag:none;user-select:none;}',
    '.cw-zoom-reset{display:block;margin:8px 0 0;font-family:Georgia,serif;font-size:15px;font-weight:bold;color:#546A80;background:none;border:0;padding:0;cursor:pointer;}',
    '.cw-zoom-reset:hover{color:#3d5266;}'
  ].join('\n');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function el(name, attrs) {
    var e = document.createElementNS(SVG, name);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    return e;
  }

  // The projection, as one named pair, and nowhere else. Inside the box longitude is
  // linear in x and latitude is linear in y; (0, 0) is the picture's top-left corner and
  // (w, h) its bottom-right, in whatever pixels the caller is drawing in. render.py
  // carries the same pair. A globe would replace these two functions and nothing else.
  function toPixel(region, lon, lat, w, h) {
    return {
      x: (lon - region.west) / (region.east - region.west) * w,
      y: (region.north - lat) / (region.north - region.south) * h
    };
  }
  function toLonLat(region, x, y, w, h) {
    return {
      lon: region.west + x / w * (region.east - region.west),
      lat: region.north - y / h * (region.north - region.south)
    };
  }

  // Where a name may sit relative to its dot: the eight positions tried, in the order
  // preferred when nothing else decides. dx, dy are for a dot of radius DOT; a note has
  // no dot and adds 'centre'.
  var SIDES = {
    'upper-right': { dx: 6, dy: -6, anchor: 'start' },
    'right':       { dx: 8, dy: 0.35, anchor: 'start' },
    'upper-left':  { dx: -6, dy: -6, anchor: 'end' },
    'left':        { dx: -8, dy: 0.35, anchor: 'end' },
    'above':       { dx: 0, dy: -9, anchor: 'middle' },
    'below':       { dx: 0, dy: 1.0, anchor: 'middle' },
    'lower-right': { dx: 6, dy: 1.0, anchor: 'start' },
    'lower-left':  { dx: -6, dy: 1.0, anchor: 'end' },
    'centre':      { dx: 0, dy: 0.35, anchor: 'middle' }
  };
  var ORDER = ['upper-right', 'right', 'upper-left', 'left', 'above', 'below', 'lower-right', 'lower-left'];

  // Text width without touching the DOM: one canvas for every map on the page.
  var measurer = null;
  function textWidth(text, size, italic) {
    if (!measurer) { var c = document.createElement('canvas'); measurer = c.getContext('2d'); }
    if (!measurer) return text.length * size * 0.5;
    measurer.font = (italic ? 'italic ' : '') + size + 'px ' + FONT;
    return measurer.measureText(text).width;
  }

  function cwMap(container, region, marks, opts) {
    marks = marks || [];
    opts = opts || {};
    container.classList.add('cw-map');
    container.innerHTML = '';

    function resolve(file) { return region.url ? new URL(file, region.url).href : file; }

    var pyr = !!region.tiles;              // the pyramid: a map that moves
    var box = container;                   // where the picture, the SVG and the text blocks live
    var wanted = opts.layers || {};
    function layerOn(L) { return wanted.hasOwnProperty(L.name) ? !!wanted[L.name] : !!L['default']; }

    var img = null, layerImgs = [];
    var stage = null, strip = null, leftBar = null, tileLayers = [], view = null, home = null, frozen = false;

    if (!pyr) {
      img = document.createElement('img');
      img.alt = '';
      img.draggable = false;
      img.style.aspectRatio = region.width + ' / ' + region.height;   // holds the space before the picture arrives
      img.src = resolve(region.image);
      container.appendChild(img);

      // The layers that are on: the region's defaults, overridden by name in opts.layers.
      (region.layers || []).forEach(function (L) {
        if (!layerOn(L)) return;
        var li = document.createElement('img');
        li.className = 'cw-layer';
        li.alt = '';
        li.draggable = false;
        li.src = resolve(L.image);
        if (L.blend && L.blend !== 'normal') li.style.mixBlendMode = L.blend;
        li.__cwBlend = L.blend || 'normal';
        container.appendChild(li);
        layerImgs.push(li);
      });
    } else {
      stage = document.createElement('div');
      stage.className = 'cw-stage';
      container.appendChild(stage);
      box = stage;
      // one tile holder for the base and one per layer that is on, in that order
      tileLayers.push({ name: 'base', suffix: '.webp', blend: 'normal', div: document.createElement('div'), have: null });
      (region.layers || []).forEach(function (L) {
        if (!layerOn(L)) return;
        var have = {};
        Object.keys(L.tiles || {}).forEach(function (z) { have[z] = {}; L.tiles[z].forEach(function (k) { have[z][k] = true; }); });
        tileLayers.push({ name: L.name, suffix: L.suffix, blend: L.blend || 'normal', div: document.createElement('div'), have: have });
      });
      tileLayers.forEach(function (T) {
        T.div.className = 'cw-tiles';
        if (T.blend !== 'normal') T.div.style.mixBlendMode = T.blend;
        stage.appendChild(T.div);
      });
      strip = document.createElement('div');
      strip.className = 'cw-strip';
      var word = document.createElement('span');
      word.textContent = opts.reset || 'reset';
      strip.appendChild(word);
      container.appendChild(strip);
      word.addEventListener('click', function (e) { e.stopPropagation(); if (api.home) api.home(); });
      // the strip is a handle, not ground: its clicks never reach the page (a drag on it ends in one)
      strip.addEventListener('click', function (e) { e.stopPropagation(); });
    }

    var svg = el('svg', { viewBox: '0 0 1 1', preserveAspectRatio: 'none' });
    box.appendChild(svg);

    // ---- the view (the pyramid only) ----
    // A centre and a scale. The scale S is pixels per degree of longitude, uniform across
    // the view. Vertically the map is Mercator — the same stretch web maps use, so that a
    // shape holds while she pans north or south — blended toward plain equirectangular as
    // the view widens (Mercator at a 20° span, gone by 120°), because a Mercator world lies
    // about Greenland and the spec will not have that. Every drawn thing — tiles, marks,
    // lines — goes through one pair of functions, so they always agree; a tile row is
    // stretched linearly between its own two latitudes, and marks use the same knots.
    var PPD0 = pyr ? region.tile * region.levels[0].rows / 180.0 : 0;      // level 0's own scale
    var LEVELS = pyr ? region.levels.length : 0;
    var S_MIN = PPD0 * 0.5, S_MAX = PPD0 * Math.pow(2, LEVELS - 1) * 2;      // half of level 0; twice the finest
    var LAT_CAP = 85;                                                       // Mercator's edge
    var D2R = Math.PI / 180, R2D = 180 / Math.PI;
    function merc(lat) { var f = Math.max(-LAT_CAP, Math.min(LAT_CAP, lat)) * D2R; return R2D * Math.log(Math.tan(Math.PI / 4 + f / 2)); }
    function kOf() {                                                        // how Mercator the view is, 0..1
      var h = box.clientHeight || 1;
      var span = h / (view.S * Math.max(0.2, (1 - (view.k || 0)) + (view.k || 0) / Math.cos(Math.max(-LAT_CAP, Math.min(LAT_CAP, view.lat)) * D2R)));
      return Math.max(0, Math.min(1, (120 - span) / 100));
    }
    function yw(lat) { var k = view.k; return (1 - k) * lat + k * merc(lat); }          // world y, in degree-like units, growing north
    function ywInv(y) {                                                                  // its inverse, by bisection
      var lo = -90, hi = 90, i;
      for (i = 0; i < 40; i++) { var mid = (lo + hi) / 2; if (yw(mid) < y) lo = mid; else hi = mid; }
      return (lo + hi) / 2;
    }
    // The knots: the current tile level's row boundaries. Between two knots y is linear
    // in latitude, which is exactly how a tile row is drawn, so marks sit on the tiles.
    var knots = null;
    function setKnots() {
      var L = region.levels[levelFor()], rows = L.rows, i;
      knots = { lat: new Array(rows + 1), y: new Array(rows + 1) };
      for (i = 0; i <= rows; i++) { knots.lat[i] = 90 - i * 180 / rows; knots.y[i] = yw(knots.lat[i]); }
    }
    function ywPL(lat) {
      if (!knots) return yw(lat);
      var rows = knots.lat.length - 1, r = Math.floor((90 - lat) / (180 / rows));
      r = Math.max(0, Math.min(rows - 1, r));
      var t = (knots.lat[r] - lat) / (knots.lat[r] - knots.lat[r + 1]);
      return knots.y[r] + (knots.y[r + 1] - knots.y[r]) * t;
    }
    function ywPLInv(y) {
      if (!knots) return ywInv(y);
      var rows = knots.lat.length - 1, r;
      for (r = 0; r < rows; r++) if (y >= knots.y[r + 1]) break;      // knots.y falls with r (north to south)
      r = Math.max(0, Math.min(rows - 1, r));
      var t = (y - knots.y[r]) / (knots.y[r + 1] - knots.y[r]);
      return knots.lat[r] + (knots.lat[r + 1] - knots.lat[r]) * t;
    }
    function viewToPixel(lon, lat, w, h) {
      return { x: w / 2 + (lon - view.lon) * view.S, y: h / 2 - (ywPL(lat) - ywPL(view.lat)) * view.S };
    }
    function viewToLonLat(x, y, w, h) {
      return { lon: view.lon + (x - w / 2) / view.S, lat: ywPLInv(ywPL(view.lat) - (y - h / 2) / view.S) };
    }
    function P(lon, lat, w, h) { return pyr ? viewToPixel(lon, lat, w, h) : toPixel(region, lon, lat, w, h); }
    // pixels per degree of latitude at the centre — what the tile level is chosen by
    function ppdCentre() { var k = view.k; return view.S * ((1 - k) + k / Math.cos(Math.max(-LAT_CAP, Math.min(LAT_CAP, view.lat)) * D2R)); }
    function levelFor() {
      var z = Math.ceil(Math.log(ppdCentre() / PPD0) / Math.LN2 - 0.25);
      return Math.max(0, Math.min(LEVELS - 1, z));
    }
    // The map never leaves the frame: it may not zoom out past covering the frame, and no
    // edge of the world may come inside it. Order: the blend, then scale, then latitude,
    // then longitude, then the knots that everything is drawn with.
    function clampView(v) {
      var w = box.clientWidth || 1, h = box.clientHeight || 1;
      var saved = view; view = v;
      if (v.k === undefined) v.k = 0;
      v.S = Math.max(S_MIN, Math.min(S_MAX, v.S));
      v.k = kOf();
      var top = yw(90), bottom = yw(-90);                                  // at k = 1 these are the ±85° edges
      var cover = Math.max(w / 360, h / (top - bottom));
      if (v.S < cover) v.S = cover;
      var halfY = h / (2 * v.S);
      var yc = Math.max(bottom + halfY, Math.min(top - halfY, yw(v.lat)));
      v.lat = ywInv(yc);
      var halfLon = w / (2 * v.S);
      v.lon = halfLon >= 180 ? 0 : Math.max(-180 + halfLon, Math.min(180 - halfLon, v.lon));
      setKnots();
      view = saved;
      return v;
    }
    function viewForBox(b, w, h) {
      var lat = (b.south + b.north) / 2, lon = (b.west + b.east) / 2;
      var v = { lat: lat, lon: lon, S: 1, k: Math.max(0, Math.min(1, (120 - (b.north - b.south)) / 100)) };
      var saved = view; view = v;
      v.S = Math.min(w / (b.east - b.west), h / (yw(b.north) - yw(b.south)));
      view = saved;
      return clampView(v);
    }
    function stageMax() { return Math.round(window.innerHeight * STAGE_MAX_FRACTION); }
    if (pyr) {
      var fitBox = opts.fit || { west: region.west, south: region.south, east: region.east, north: region.north };
      var w0 = container.clientWidth || 700;
      var c0 = Math.max(0.1, Math.cos((fitBox.south + fitBox.north) / 2 * Math.PI / 180));
      var h0 = opts.height || Math.round(w0 * (fitBox.north - fitBox.south) / ((fitBox.east - fitBox.west) * c0));
      h0 = Math.max(STAGE_MIN, Math.min(stageMax(), h0));
      stage.style.height = h0 + 'px';
      view = { lat: 0, lon: 0, S: PPD0, k: 0 };
      view = viewForBox(fitBox, w0, h0);
      home = { view: { lat: view.lat, lon: view.lon, S: view.S, k: view.k }, height: h0, widen: 0 };
      // the left bar: drag it left and the map widens into the margins on both sides, not far
      leftBar = document.createElement('div');
      leftBar.className = 'cw-strip-left';
      leftBar.style.height = h0 + 'px';
      container.appendChild(leftBar);          // on the container, not the stage: the stage clips its overflow
    }

    // ---- tiles (the pyramid only) ----
    function tileRect(z, tx, ty, w, h) {
      var L = region.levels[z];
      var dlon = 360 / L.cols, dlat = 180 / L.rows;
      var n = 90 - ty * dlat, sth = n - dlat;
      var top = h / 2 - (yw(n) - ywPL(view.lat)) * view.S, bottom = h / 2 - (yw(sth) - ywPL(view.lat)) * view.S;
      return { x: w / 2 + (-180 + tx * dlon - view.lon) * view.S, y: top, w: dlon * view.S, h: Math.max(0.5, bottom - top) };
    }
    function placeTiles() {
      var w = box.clientWidth, h = box.clientHeight;
      if (!w || !h) return;
      var z = levelFor(), L = region.levels[z];
      var dlon = 360 / L.cols, dlat = 180 / L.rows;
      var nw = viewToLonLat(0, 0, w, h), se = viewToLonLat(w, h, w, h);
      var tx0 = Math.max(0, Math.floor((nw.lon + 180) / dlon) - 1), tx1 = Math.min(L.cols - 1, Math.floor((se.lon + 180) / dlon) + 1);
      var ty0 = Math.max(0, Math.floor((90 - nw.lat) / dlat) - 1), ty1 = Math.min(L.rows - 1, Math.floor((90 - se.lat) / dlat) + 1);
      if (nw.lat >= LAT_CAP - 0.01) ty0 = 0; if (se.lat <= -LAT_CAP + 0.01) ty1 = L.rows - 1;
      var baseDiv = tileLayers[0].div;
      function baseLoaded(key) { var b = baseDiv.querySelector('img[data-key="' + key + '"]'); return !!(b && b.complete && b.naturalWidth); }
      tileLayers.forEach(function (T) {
        var keep = {}, allLoaded = true, tx, ty, key, im;
        for (ty = ty0; ty <= ty1; ty++) for (tx = tx0; tx <= tx1; tx++) {
          if (T.have && !(T.have[z] && T.have[z][tx + '/' + ty])) continue;
          key = z + '/' + tx + '/' + ty;
          keep[key] = true;
          im = T.div.querySelector('img[data-key="' + key + '"]');
          if (!im) {
            im = document.createElement('img');
            im.alt = ''; im.draggable = false;
            im.setAttribute('data-key', key); im.setAttribute('data-z', z); im.setAttribute('data-x', tx); im.setAttribute('data-y', ty);
            im.src = resolve(region.tiles + '/' + z + '/' + tx + '/' + ty + T.suffix);
            im.addEventListener('load', tileArrived);
            T.div.appendChild(im);
          }
          if (!(im.complete && im.naturalWidth)) allLoaded = false;
        }
        // position every tile still held, and drop what is no longer wanted: this level's
        // tiles outside the view, and older levels' tiles once this level has arrived
        Array.prototype.slice.call(T.div.querySelectorAll('img')).forEach(function (t) {
          var tz = +t.getAttribute('data-z');
          if (tz === z) {
            if (!keep[t.getAttribute('data-key')]) { T.div.removeChild(t); return; }
          } else if (allLoaded) { T.div.removeChild(t); return; }
          var r = tileRect(tz, +t.getAttribute('data-x'), +t.getAttribute('data-y'), w, h);
          t.style.left = r.x + 'px'; t.style.top = r.y + 'px';
          t.style.width = (r.w + 0.7) + 'px'; t.style.height = (r.h + 0.7) + 'px';
          // a layer tile shows only once its base tile is there, or the layer washes bare ground
          if (T !== tileLayers[0]) t.style.visibility = baseLoaded(t.getAttribute('data-key')) ? '' : 'hidden';
        });
      });
    }
    var arriveTimer = null;
    function tileArrived() {
      if (frozen) return;
      clearTimeout(arriveTimer);
      arriveTimer = setTimeout(function () { placeTiles(); readGround(); draw(); }, 60);
    }

    var shown = [];        // the text blocks currently open: { mark, div }
    var ground = null;     // the picture's luminance at SAMPLE_WIDTH, for label placement

    function placeByName(name) {
      for (var i = 0; i < marks.length; i++) {
        if (marks[i].type === 'place' && marks[i].name === name) return marks[i];
      }
      return null;
    }

    // Read the picture once, small, as luminance. Fails quietly (a cross-origin picture
    // taints the canvas); then placement judges crowding only.
    function readGround() {
      try {
        var gw = SAMPLE_WIDTH, gh, c, ctx;
        if (pyr) {
          var bw = box.clientWidth, bh = box.clientHeight;
          if (!bw || !bh) { ground = null; return; }
          gh = Math.max(1, Math.round(gw * bh / bw));
          c = document.createElement('canvas'); c.width = gw; c.height = gh;
          ctx = c.getContext('2d');
          var k = gw / bw;
          tileLayers.forEach(function (T) {
            ctx.globalCompositeOperation = T.blend === 'normal' ? 'source-over' : T.blend;
            Array.prototype.slice.call(T.div.querySelectorAll('img')).forEach(function (t) {
              if (!(t.complete && t.naturalWidth)) return;
              ctx.drawImage(t, parseFloat(t.style.left) * k, parseFloat(t.style.top) * k, parseFloat(t.style.width) * k, parseFloat(t.style.height) * k);
            });
          });
          ctx.globalCompositeOperation = 'source-over';
        } else {
          gh = Math.max(1, Math.round(gw * region.height / region.width));
          c = document.createElement('canvas'); c.width = gw; c.height = gh;
          ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0, gw, gh);
          layerImgs.forEach(function (li) {
            if (!(li.complete && li.naturalWidth)) return;
            ctx.globalCompositeOperation = li.__cwBlend === 'normal' ? 'source-over' : li.__cwBlend;
            ctx.drawImage(li, 0, 0, gw, gh);
          });
          ctx.globalCompositeOperation = 'source-over';
        }
        var d = ctx.getImageData(0, 0, gw, gh).data;
        var lum = new Float32Array(gw * gh);
        for (var i = 0, j = 0; i < lum.length; i++, j += 4) lum[i] = (0.299 * d[j] + 0.587 * d[j + 1] + 0.114 * d[j + 2]) / 255;
        ground = { w: gw, h: gh, lum: lum };
      } catch (e) { ground = null; }
    }

    // How uneven the picture is under a box (in map pixels at w × h): the standard
    // deviation of luminance, 0 for flat colour. Unknown ground counts as flat.
    function unevenness(box, w, h) {
      if (!ground) return 0;
      var sx = ground.w / w, sy = ground.h / h;
      var x0 = Math.max(0, Math.floor(box.x * sx)), x1 = Math.min(ground.w - 1, Math.ceil((box.x + box.w) * sx));
      var y0 = Math.max(0, Math.floor(box.y * sy)), y1 = Math.min(ground.h - 1, Math.ceil((box.y + box.h) * sy));
      var n = 0, sum = 0, sq = 0;
      for (var y = y0; y <= y1; y++) for (var x = x0; x <= x1; x++) { var v = ground.lum[y * ground.w + x]; n++; sum += v; sq += v * v; }
      if (n < 2) return 0;
      var mean = sum / n;
      return Math.sqrt(Math.max(0, sq / n - mean * mean));
    }

    function overlap(a, b) {
      var w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      var h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      return (w > 0 && h > 0) ? w * h : 0;
    }

    // The box a label would occupy at a side of its point, with the halo counted in.
    function labelBox(p, side, width, size, r) {
      var s = SIDES[side];
      var dx = s.dx, dy = s.dy;
      if (side === 'right' || side === 'left' || side === 'centre') dy = size * dy;          // baseline for a vertically centred line
      else if (side === 'below' || side === 'lower-right' || side === 'lower-left') dy = r + size * dy + 2;
      if (r === 0 && side !== 'centre') { dx = dx * 0.5; dy = (dy < 0) ? dy * 0.5 : dy - r; }
      var x = p.x + dx, y = p.y + dy;
      var left = s.anchor === 'start' ? x : s.anchor === 'end' ? x - width : x - width / 2;
      var pad = HALO_PX;
      return { x: left - pad, y: y - size * 0.8 - pad, w: width + 2 * pad, h: size * 1.05 + 2 * pad, tx: x, ty: y, anchor: s.anchor, side: side };
    }

    // Placement: try every side, throw out the ones that overlap a placed label, a dot,
    // or the edge; of the rest take the calmest ground, with the mark's own side and the
    // preferred order breaking ties. Returns the box, or null to drop the label.
    var sideCache = (typeof Map !== 'undefined') ? new Map() : null;   // mark -> the side it was given
    function place(p, text, size, italic, r, side, placed, dots, w, h, mark) {
      var width = textWidth(text, size, italic);
      // While a gesture lasts, a label keeps the side it had, or nothing moves but the map.
      if (frozen && sideCache && mark) {
        var kept = sideCache.get(mark);
        if (kept === null) return null;
        if (kept) { var kb = labelBox(p, kept, width, size, r); return (kb.x + kb.w < 0 || kb.y + kb.h < 0 || kb.x > w || kb.y > h) ? null : kb; }
      }
      var sides = ORDER.slice();
      if (r === 0) sides.unshift('centre');
      var best = null, bestScore = Infinity;
      for (var i = 0; i < sides.length; i++) {
        var box = labelBox(p, sides[i], width, size, r);
        if (box.x < 0 || box.y < 0 || box.x + box.w > w || box.y + box.h > h) continue;
        var bad = false, j;
        for (j = 0; j < placed.length && !bad; j++) if (overlap(box, placed[j])) bad = true;
        if (bad) continue;
        var crowd = 0;
        for (j = 0; j < dots.length; j++) {
          var d = dots[j];
          if (d.x === p.x && d.y === p.y) continue;
          crowd += overlap(box, { x: d.x - d.r - 2, y: d.y - d.r - 2, w: 2 * d.r + 4, h: 2 * d.r + 4 });
        }
        // The mark's own side wins whenever it fits; the picture decides only when it did not say.
        var score = unevenness(box, w, h) * 10 + crowd * 0.05 + i * 0.02 + (side && sides[i] === side ? -100 : 0);
        if (score < bestScore) { bestScore = score; best = box; }
      }
      if (sideCache && mark) sideCache.set(mark, best ? best.side : null);
      return best;
    }

    function weightOf(m) { return m.weight ? +m.weight : 1; }
    function draw() {
      var w = box.clientWidth, h = box.clientHeight;
      if (!w || !h) return;
      if (pyr) placeTiles();
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      // Layers, bottom to top: the earth's lines; the story's regions, paths and dots;
      // every halo; every label. Halos in one layer under all the glyphs, so one label's
      // halo never fogs its neighbour.
      var lines = el('g', { 'class': 'cw-lines' }), marksLayer = el('g', {}), halos = el('g', { 'class': 'cw-halos' }), glyphs = el('g', {});
      svg.appendChild(lines); svg.appendChild(marksLayer); svg.appendChild(halos); svg.appendChild(glyphs);
      drawLines(lines, w, h);

      var placed = [], dots = [];
      marks.forEach(function (m) {
        if (m.type === 'place') { var q = P(m.lon, m.lat, w, h); dots.push({ x: q.x, y: q.y, r: m.on ? DOT + 2.5 : (m.minor ? DOT_MINOR : (m.lit ? DOT + 1.5 : DOT)) }); }
      });
      var order = ['region', 'path', 'place', 'note'];
      order.forEach(function (kind) {
        // Heavier marks are placed first, so the heavier survives a collision; among equals,
        // places the story names go before lesser ones, so the lesser give way. A stable order.
        var these = marks.filter(function (m) { return m.type === kind; }).map(function (m, i) { return { m: m, i: i }; });
        if (kind === 'place' || kind === 'note') {
          these.sort(function (a, b) { return (weightOf(b.m) - weightOf(a.m)) || ((a.m.minor ? 1 : 0) - (b.m.minor ? 1 : 0)) || (a.i - b.i); });
        }
        these.forEach(function (x) { drawMark(x.m, w, h, marksLayer, halos, glyphs, placed, dots); });
      });
      shown.forEach(function (s) { positionText(s, w, h); });
    }

    // The earth's lines on the moving map come per level, and at the finer levels per
    // tile column (`{ perColumn, cols }` in the region's JSON), fetched as the view needs them.
    var contourCache = {};      // z -> { lines } for a whole level; z + '/' + x -> { lines } for a column
    function contourLevel() {
      var z = levelFor(), keys = Object.keys(region.contours || {}).map(Number).sort(function (a, b) { return a - b; });
      var best = -1;
      keys.forEach(function (k) { if (k <= z) best = k; });
      if (best < 0 && keys.length) best = keys[0];
      return best;
    }
    function indexLines(j) {
      var out = {};
      Object.keys(j).forEach(function (level) {
        out[level] = j[level].map(function (line) {
          var bb = [Infinity, Infinity, -Infinity, -Infinity];
          for (var i = 0; i < line.length; i++) { var q = line[i]; if (q[0] < bb[0]) bb[0] = q[0]; if (q[1] < bb[1]) bb[1] = q[1]; if (q[0] > bb[2]) bb[2] = q[0]; if (q[1] > bb[3]) bb[3] = q[1]; }
          return { pts: line, bbox: bb };
        });
      });
      return out;
    }
    function loadContourFile(key, url) {
      if (contourCache[key]) return contourCache[key];
      var entry = { ready: false, lines: {} };
      contourCache[key] = entry;
      fetch(resolve(url), { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (j) {
        entry.lines = indexLines(j); entry.ready = true;
        if (!frozen) draw();
      }).catch(function () {});
      return entry;
    }
    // The line sets that cover the view at the chosen level: one entry, or one per column in view.
    function contourSets(w, h) {
      var zc = contourLevel();
      if (zc < 0) return [];
      var spec = region.contours[zc];
      if (typeof spec === 'string') return [loadContourFile(String(zc), spec)];
      var nw = viewToLonLat(0, 0, w, h), se = viewToLonLat(w, h, w, h);
      var dlon = 360 / spec.cols;
      var x0 = Math.max(0, Math.floor((nw.lon + 180) / dlon)), x1 = Math.min(spec.cols - 1, Math.floor((se.lon + 180) / dlon));
      var sets = [];
      for (var x = x0; x <= x1; x++) sets.push(loadContourFile(zc + '/' + x, spec.perColumn.replace('{x}', x)));
      return sets;
    }
    function drawLines(layer, w, h) {
      var c = region.contours;
      if (!c) return;
      if (pyr) {
        var sets = contourSets(w, h);
        var nw = viewToLonLat(0, 0, w, h), se = viewToLonLat(w, h, w, h);
        for (var lv in LINES) {
          var dd = [], seen = {};
          sets.forEach(function (cc) {
            if (!cc.ready || !cc.lines.hasOwnProperty(lv)) return;
            cc.lines[lv].forEach(function (L) {
              var b = L.bbox;
              if (b[2] < nw.lon || b[0] > se.lon || b[3] < se.lat || b[1] > nw.lat) return;
              var id = b.join(',') + ':' + L.pts.length;        // a line in two columns is drawn once
              if (seen[id]) return; seen[id] = true;
              for (var j = 0; j < L.pts.length; j++) { var q = viewToPixel(L.pts[j][0], L.pts[j][1], w, h); dd.push((j ? 'L' : 'M') + q.x.toFixed(1) + ' ' + q.y.toFixed(1)); }
            });
          });
          if (dd.length) layer.appendChild(el('path', { 'class': 'cw-line', d: dd.join(''), stroke: LINES[lv].stroke, 'stroke-opacity': LINES[lv].opacity }));
        }
        return;
      }
      for (var level in LINES) {
        if (!c.hasOwnProperty(level)) continue;
        var d = [];
        for (var i = 0; i < c[level].length; i++) {
          var line = c[level][i];
          for (var j = 0; j < line.length; j++) {
            var q = P(line[j][0], line[j][1], w, h);
            d.push((j ? 'L' : 'M') + q.x.toFixed(1) + ' ' + q.y.toFixed(1));
          }
        }
        if (d.length) layer.appendChild(el('path', { 'class': 'cw-line', d: d.join(''), stroke: LINES[level].stroke, 'stroke-opacity': LINES[level].opacity }));
      }
    }

    function label(text, box, cls, halosLayer, glyphLayer) {
      var attrs = { x: box.tx, y: box.ty, 'text-anchor': box.anchor };
      if (cls) attrs['class'] = cls;
      var a = el('text', attrs); a.textContent = text; halosLayer.appendChild(a);
      var b = el('text', attrs); b.textContent = text; glyphLayer.appendChild(b);
    }

    function drawMark(m, w, h, layer, halosLayer, glyphLayer, placed, dots) {
      var p, box;
      if (m.type === 'region') {
        var pts = (m.points || []).map(function (q) { var r = P(q[1], q[0], w, h); return r.x + ',' + r.y; });
        layer.appendChild(el('polygon', { points: pts.join(' '), fill: WASHES[m.wash] || WASHES.grows, 'fill-opacity': WASH, stroke: 'none' }));
      } else if (m.type === 'path') {
        var seg = [];
        (m.places || []).forEach(function (q) {
          var lat, lon;
          if (typeof q === 'string') { var pl = placeByName(q); if (!pl) return; lat = pl.lat; lon = pl.lon; }
          else { lat = q[0]; lon = q[1]; }
          var r = P(lon, lat, w, h);
          seg.push(r.x + ',' + r.y);
        });
        var line = { points: seg.join(' '), fill: 'none', stroke: VERMILION, 'stroke-width': 1.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', 'vector-effect': 'non-scaling-stroke' };
        if (m.possible) line['stroke-dasharray'] = '5 4';
        layer.appendChild(el('polyline', line));
      } else if (m.type === 'note') {
        p = P(m.lon, m.lat, w, h);
        box = place(p, m.text || '', SIZE, !!m.water, 0, m.side, placed, dots, w, h, m);
        if (box) { placed.push(box); label(m.text || '', box, m.water ? 'cw-water' : null, halosLayer, glyphLayer); }
      } else if (m.type === 'place') {
        p = P(m.lon, m.lat, w, h);
        var r = m.on ? DOT + 2.5 : (m.minor ? DOT_MINOR : (m.lit ? DOT + 1.5 : DOT));
        var g = el('g', {});
        if (m.text || m.story || m.onTap) {
          g.appendChild(el('circle', { cx: p.x, cy: p.y, r: TAP, fill: 'transparent', stroke: 'none' }));
        }
        if (m.on) g.appendChild(el('circle', { cx: p.x, cy: p.y, r: 12, fill: VERMILION, 'fill-opacity': 0.18, stroke: 'none' }));
        g.appendChild(el('circle', { cx: p.x, cy: p.y, r: r, fill: m.on ? VERMILION : m.minor ? GREY : (m.lit ? COPPER : (m.world ? SLATE : VERMILION)), stroke: 'none' }));
        if (m.onTap) {
          g.style.cursor = 'pointer';
          g.addEventListener('click', function (ev) { ev.stopPropagation(); m.onTap(m); });
        } else if (m.story) {
          g.addEventListener('click', function () { window.location.href = m.story; });
        } else if (m.text) {
          g.__cwMark = m;
          g.addEventListener('click', function () { toggleText(m, p); });
        }
        layer.appendChild(g);
        var size = m.minor ? SIZE_MINOR : SIZE;
        box = place(p, m.name || '', size, false, r, m.side, placed, dots, w, h, m);
        var cls = [m.minor ? 'cw-minor' : '', m.on ? 'cw-on' : ''].join(' ').trim() || null;
        if (box) { placed.push(box); label(m.name || '', box, cls, halosLayer, glyphLayer); }
      }
    }

    function toggleText(m, p) {
      for (var i = 0; i < shown.length; i++) {
        if (shown[i].mark === m) { box.removeChild(shown[i].div); shown.splice(i, 1); return; }
      }
      reset();                                   // one block open at a time
      var div = document.createElement('div');
      div.className = 'cw-map-text';
      div.textContent = m.text;
      box.appendChild(div);
      var s = { mark: m, div: div };
      shown.push(s);
      positionText(s, box.clientWidth, box.clientHeight);
    }

    // Below and to the right of the dot; flipped left or up when the box would run out.
    function positionText(s, w, h) {
      var p = P(s.mark.lon, s.mark.lat, w, h);
      var d = s.div;
      d.style.left = (p.x + 10) + 'px';
      d.style.top = (p.y + 8) + 'px';
      var bw = d.offsetWidth, bh = d.offsetHeight;
      if (p.x + 10 + bw > w) d.style.left = Math.max(0, p.x - 10 - bw) + 'px';
      if (p.y + 8 + bh > h) d.style.top = Math.max(0, p.y - 8 - bh) + 'px';
    }

    function reset() {
      shown.forEach(function (s) { if (s.div.parentNode) s.div.parentNode.removeChild(s.div); });
      shown = [];
    }

    // Any other action closes an open block: a press anywhere but on the dot that opened
    // it (that dot's own click closes it), or a key. Capture phase, so nothing can swallow it.
    document.addEventListener('pointerdown', function (ev) {
      if (!shown.length) return;
      var t = ev.target;
      for (var n = t; n; n = n.parentNode) {
        if (n.__cwMark) { for (var i = 0; i < shown.length; i++) if (shown[i].mark === n.__cwMark) return; break; }
      }
      reset();
    }, true);
    document.addEventListener('keydown', function () { if (shown.length) reset(); }, true);

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(function () { if (pyr && frozen) { placeTiles(); draw(); } else { draw(); } }).observe(box);
    } else {
      window.addEventListener('resize', draw);
    }
    if (!pyr) {
      // The ground is read once every picture — the base and its layers — has arrived.
      var pending = 1 + layerImgs.length;
      var arrived = function () { pending--; if (pending <= 0) { readGround(); draw(); } };
      var watch = function (im) {
        if (im.complete && im.naturalWidth) arrived();
        else { im.addEventListener('load', arrived); im.addEventListener('error', arrived); }
      };
      watch(img);
      layerImgs.forEach(watch);
    }
    draw();

    // ---- moving: gestures, the strip, the slides ----
    var api = { reset: reset, redraw: draw };
    if (pyr) {
      var pointers = {}, nPointers = 0, dragging = false, down = null, pinch = null, suppressClick = false, settleTimer = null;
      function beginGesture() {
        if (!frozen) { frozen = true; stage.classList.add('dragging'); document.documentElement.classList.add('cw-map-gesture'); }
        clearTimeout(settleTimer);
      }
      function endGesture() {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(function () {
          frozen = false; stage.classList.remove('dragging'); document.documentElement.classList.remove('cw-map-gesture');
          try { var sel = window.getSelection(); if (sel && sel.rangeCount) sel.removeAllRanges(); } catch (err) {}
          clampView(view); placeTiles(); readGround(); draw();
        }, 120);
      }
      function fast() { clampView(view); placeTiles(); draw(); }
      function anchor(at, px, py, w, h) {
        view.lon = at.lon - (px - w / 2) / view.S;
        view.lat = ywPLInv(ywPL(at.lat) + (py - h / 2) / view.S);
      }
      stage.addEventListener('pointerdown', function (e) {
        if (e.button && e.button !== 0) return;
        e.preventDefault();          // no text selection may start on a press on the map (a click still follows)
        if (e.isPrimary) { pointers = {}; nPointers = 0; pinch = null; dragging = false; }   // a fresh press forgets any release that went astray
        pointers[e.pointerId] = { x: e.clientX, y: e.clientY }; nPointers++;
        if (nPointers === 1) { down = { x: e.clientX, y: e.clientY, y0: ywPL(view.lat), lon: view.lon }; dragging = false; }
        if (nPointers === 2) {
          var ids = Object.keys(pointers), a = pointers[ids[0]], b = pointers[ids[1]];
          var r = stage.getBoundingClientRect();
          var mid = { x: (a.x + b.x) / 2 - r.left, y: (a.y + b.y) / 2 - r.top };
          pinch = { d0: Math.hypot(a.x - b.x, a.y - b.y), S0: view.S, at: viewToLonLat(mid.x, mid.y, box.clientWidth, box.clientHeight), mid: mid };
          dragging = true; beginGesture();
          try { stage.setPointerCapture(e.pointerId); } catch (err) {}
        }
      });
      stage.addEventListener('pointermove', function (e) {
        if (!pointers[e.pointerId]) return;
        pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
        var w = box.clientWidth, h = box.clientHeight;
        if (nPointers >= 2 && pinch) {
          var ids = Object.keys(pointers), a = pointers[ids[0]], b = pointers[ids[1]];
          var d = Math.hypot(a.x - b.x, a.y - b.y);
          view.S = Math.max(S_MIN, Math.min(S_MAX, pinch.S0 * d / pinch.d0));
          // keep the ground under the fingers' midpoint where it was
          var r = stage.getBoundingClientRect();
          var mid = { x: (a.x + b.x) / 2 - r.left, y: (a.y + b.y) / 2 - r.top };
          anchor(pinch.at, mid.x, mid.y, w, h);
          fast();
          return;
        }
        if (nPointers === 1 && down) {
          var dx = e.clientX - down.x, dy = e.clientY - down.y;
          if (!dragging) {
            if (Math.hypot(dx, dy) < TAP_PX) return;
            dragging = true; beginGesture();
            try { stage.setPointerCapture(e.pointerId); } catch (err) {}
          }
          view.lon = down.lon - dx / view.S;
          view.lat = ywPLInv(down.y0 + dy / view.S);
          fast();
        }
      });
      function up(e) {
        if (!pointers[e.pointerId]) return;
        delete pointers[e.pointerId]; nPointers--;
        if (nPointers < 2) pinch = null;
        if (nPointers === 1) { var id = Object.keys(pointers)[0]; down = { x: pointers[id].x, y: pointers[id].y, y0: ywPL(view.lat), lon: view.lon }; }
        if (nPointers === 0) {
          if (dragging) { suppressClick = true; setTimeout(function () { suppressClick = false; }, 0); endGesture(); }
          dragging = false; down = null;
        }
      }
      window.addEventListener('pointerup', up, true);
      window.addEventListener('pointercancel', up, true);
      stage.addEventListener('click', function (e) { if (suppressClick) { e.stopPropagation(); e.preventDefault(); } }, true);
      // The wheel zooms by tenths, as Glass Geometry's does, about the point under the cursor.
      stage.addEventListener('wheel', function (e) {
        e.preventDefault();
        var w = box.clientWidth, h = box.clientHeight, r = stage.getBoundingClientRect();
        var at = viewToLonLat(e.clientX - r.left, e.clientY - r.top, w, h);
        beginGesture();
        view.S = Math.max(S_MIN, Math.min(S_MAX, view.S * (e.deltaY > 0 ? 0.9 : 1.1)));
        anchor(at, e.clientX - r.left, e.clientY - r.top, w, h);
        fast(); endGesture();
      }, { passive: false });

      // the strip: drag to resize the height
      var rs = null;
      strip.addEventListener('pointerdown', function (e) {
        if (e.target.tagName === 'SPAN') return;
        e.preventDefault(); e.stopPropagation();
        rs = { y: e.clientY, h: stage.clientHeight };
        try { strip.setPointerCapture(e.pointerId); } catch (err) {}
        beginGesture();
      });
      strip.addEventListener('pointermove', function (e) {
        if (!rs) return;
        var nh = Math.max(STAGE_MIN, Math.min(stageMax(), rs.h + (e.clientY - rs.y)));
        stage.style.height = nh + 'px'; leftBar.style.height = nh + 'px';
        fast();
      });
      function rsUp() { if (rs) { rs = null; endGesture(); } }
      strip.addEventListener('pointerup', rsUp);
      strip.addEventListener('pointercancel', rsUp);
      // the left bar: drag left to widen into both margins, drag right to come back
      var widen = 0, lb = null;
      function widenMax() { var col = container.parentNode ? container.parentNode.clientWidth : container.clientWidth; return Math.max(0, Math.min(240, Math.floor((window.innerWidth - col) / 2) - 24)); }
      function setWiden(x) {
        widen = Math.max(0, Math.min(widenMax(), Math.round(x)));
        container.style.marginLeft = (-widen) + 'px'; container.style.marginRight = (-widen) + 'px';
      }
      leftBar.addEventListener('pointerdown', function (e) {
        e.preventDefault(); e.stopPropagation();
        lb = { x: e.clientX, w: widen };
        try { leftBar.setPointerCapture(e.pointerId); } catch (err) {}
        beginGesture();
      });
      leftBar.addEventListener('pointermove', function (e) { if (!lb) return; setWiden(lb.w + (lb.x - e.clientX)); fast(); });
      function lbUp() { if (lb) { lb = null; endGesture(); } }
      leftBar.addEventListener('pointerup', lbUp);
      leftBar.addEventListener('pointercancel', lbUp);
      leftBar.addEventListener('click', function (e) { e.stopPropagation(); });

      // the slides: centre() at her scale, fit() for a route; home() for the word
      var sliding = null;
      function slideTo(target, ms) {
        if (sliding) cancelAnimationFrame(sliding);
        var from = { lat: view.lat, lon: view.lon, S: view.S }, t0 = null;
        if (target.k === undefined) target.k = view.k;
        clampView(target);
        beginGesture();
        function step(ts) {
          if (t0 === null) t0 = ts;
          var u = Math.min(1, (ts - t0) / ms); u = 1 - (1 - u) * (1 - u);     // ease out
          view.lat = from.lat + (target.lat - from.lat) * u;
          view.lon = from.lon + (target.lon - from.lon) * u;
          view.S = from.S * Math.pow(target.S / from.S, u);
          fast();
          if (u < 1) sliding = requestAnimationFrame(step); else { sliding = null; endGesture(); }
        }
        sliding = requestAnimationFrame(step);
      }
      function goHome() {
        stage.style.height = home.height + 'px'; leftBar.style.height = home.height + 'px';
        setWiden(home.widen);
        view.lat = home.view.lat; view.lon = home.view.lon; view.S = home.view.S; view.k = home.view.k;
        frozen = false; clampView(view); placeTiles(); readGround(); draw();
      }
      api.centre = function (lat, lon) { slideTo({ lat: lat, lon: lon, S: view.S }, SLIDE_MS); };
      api.fit = function (b) {
        var w = box.clientWidth, h = box.clientHeight, pad = 0.12;
        var span = { west: b.west - (b.east - b.west) * pad, east: b.east + (b.east - b.west) * pad, south: b.south - (b.north - b.south) * pad, north: b.north + (b.north - b.south) * pad };
        slideTo(viewForBox(span, w, h), SLIDE_MS);
      };
      api.home = goHome;
      api.view = function () { return { lat: view.lat, lon: view.lon, S: view.S, k: view.k }; };
    }
    return api;
  }

  cwMap.toPixel = toPixel;
  cwMap.toLonLat = toLonLat;

  cwMap.load = function (url) {
    var abs = new URL(url, window.location.href).href;
    // revalidated, never trusted from the cache: a region's JSON changes when its pictures do
    return fetch(abs, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('map region ' + url + ': ' + r.status);
      return r.json();
    }).then(function (region) { region.url = abs; return region; });
  };

  // The window is Glass Geometry's picker window: an invisible backdrop that closes it,
  // a drag handle along the top with the word close at its right, a 200 ms fade.
  // The picker drags with mouse events; this handle listens to pointer events so the
  // same drag works under a finger. Nothing else differs.
  //
  // cwWindow(content, opts) puts any element in it (25 Sep 2026, for the letter in
  // Professor Necker's Drawing: a picture in a window, per the Rulings, is this window).
  // opts.anything: any other action closes it too — a tap on the content, a key, a scroll
  // of the page. The drag handle is the one thing that does not.
  // opts.zoom: an <img> inside the content that she can zoom and pan (26 Sep 2026, Michael,
  // for the letter), with the sampler's gestures: pinch or ctrl-wheel (a trackpad pinch)
  // zooms to 6x, one finger or a drag pans once zoomed, the wheel pans, a double tap zooms
  // in or back out, and the word Reset appears while zoomed. Touching the picture never
  // closes the window.
  function cwWindow(content, opts) {
    opts = opts || {};
    var zoomBox = opts.zoom ? zoomable(opts.zoom) : null;
    var backdrop = document.createElement('div');
    backdrop.className = 'cw-map-backdrop';
    var win = document.createElement('div');
    win.className = 'cw-map-window';
    var handle = document.createElement('div');
    handle.className = 'cw-map-drag';
    var close = document.createElement('span');
    close.className = 'cw-map-close';
    close.textContent = 'close';
    handle.appendChild(close);
    win.appendChild(handle);
    win.appendChild(content);
    document.body.appendChild(backdrop);
    document.body.appendChild(win);

    function position() {
      var r = win.getBoundingClientRect();
      win.style.left = Math.max(8, (window.innerWidth - r.width) / 2) + 'px';
      win.style.top = Math.max(8, (window.innerHeight - r.height) / 2) + 'px';
    }
    position();
    requestAnimationFrame(function () { requestAnimationFrame(function () { win.classList.add('visible'); }); });

    var closed = false;
    function closeWindow() {
      if (closed) return;
      closed = true;
      win.classList.remove('visible');
      if (opts.anything) {
        document.removeEventListener('keydown', closeWindow, true);
        window.removeEventListener('scroll', onPageScroll, true);
      }
      setTimeout(function () {
        if (win.parentNode) win.parentNode.removeChild(win);
        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      }, 200);
      if (opts.onClose) opts.onClose();
    }
    backdrop.addEventListener('click', closeWindow);
    close.addEventListener('click', function (e) { e.stopPropagation(); closeWindow(); });
    // the page scrolling closes it; the window's own contents scrolling does not
    function onPageScroll(e) { if (e.target === document || e.target === document.documentElement) closeWindow(); }
    if (opts.anything) {
      content.addEventListener('click', function (e) {
        if (zoomBox && (zoomBox.box.contains(e.target) || e.target === zoomBox.reset)) return;
        closeWindow();
      });
      document.addEventListener('keydown', closeWindow, true);
      window.addEventListener('scroll', onPageScroll, true);
    }

    var dragging = false, sx, sy, ox, oy;
    handle.addEventListener('pointerdown', function (e) {
      if (e.target === close) return;
      e.preventDefault(); e.stopPropagation();
      dragging = true; sx = e.clientX; sy = e.clientY;
      ox = parseInt(win.style.left) || win.getBoundingClientRect().left;
      oy = parseInt(win.style.top) || win.getBoundingClientRect().top;
      try { handle.setPointerCapture(e.pointerId); } catch (err) {}
    });
    handle.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      win.style.left = (ox + e.clientX - sx) + 'px';
      win.style.top = (oy + e.clientY - sy) + 'px';
    });
    handle.addEventListener('pointerup', function () { dragging = false; });
    handle.addEventListener('pointercancel', function () { dragging = false; });

    return { close: closeWindow, window: win, position: position };
  }

  // Zoom and pan for one picture: the picture is wrapped in a box that clips it and moved
  // with a transform, so the window keeps its size. Nothing is remembered once it closes.
  function zoomable(img) {
    var box = document.createElement('div'); box.className = 'cw-zoom';
    img.parentNode.insertBefore(box, img); box.appendChild(img);
    var reset = document.createElement('button'); reset.type = 'button'; reset.className = 'cw-zoom-reset';
    reset.textContent = 'Reset'; reset.hidden = true;
    box.parentNode.insertBefore(reset, box.nextSibling);
    var s = 1, tx = 0, ty = 0, MAX = 6;
    function apply() {
      var w = box.clientWidth, h = box.clientHeight;
      s = Math.min(MAX, Math.max(1, s));
      if (s <= 1.001) { s = 1; tx = 0; ty = 0; }
      tx = Math.min(0, Math.max(w - w * s, tx)); ty = Math.min(0, Math.max(h - h * s, ty));
      img.style.transform = s > 1 ? 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')' : '';
      reset.hidden = s === 1; box.classList.toggle('zoomed', s > 1);
    }
    function at(e) { var r = box.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    function zoomAt(f, p) {
      var ns = Math.min(MAX, Math.max(1, s * f)); f = ns / s;
      tx = p[0] - (p[0] - tx) * f; ty = p[1] - (p[1] - ty) * f; s = ns; apply();
    }
    var pts = {}, pinch = null, last = null, lastTap = 0;
    function two() { var k = Object.keys(pts); return k.length === 2 ? [pts[k[0]], pts[k[1]]] : null; }
    box.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      try { box.setPointerCapture(e.pointerId); } catch (x) {}
      pts[e.pointerId] = at(e);
      var t = two();
      if (t) { pinch = { d: Math.hypot(t[0][0] - t[1][0], t[0][1] - t[1][1]), m: [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2] }; last = null; lastTap = 0; }
      else {
        last = pts[e.pointerId];
        var now = Date.now();
        if (now - lastTap < 300) { if (s > 1) { s = 1; apply(); } else zoomAt(2.5, last); lastTap = 0; }
        else lastTap = now;
      }
    });
    box.addEventListener('pointermove', function (e) {
      if (!pts[e.pointerId]) return;
      pts[e.pointerId] = at(e);
      var t = two();
      if (t && pinch) {
        var d = Math.hypot(t[0][0] - t[1][0], t[0][1] - t[1][1]);
        var m = [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2];
        tx += m[0] - pinch.m[0]; ty += m[1] - pinch.m[1];
        zoomAt(d / pinch.d, m); pinch = { d: d, m: m };
      } else if (last && s > 1) {
        var p = pts[e.pointerId]; tx += p[0] - last[0]; ty += p[1] - last[1]; last = p; apply(); lastTap = 0;
      }
    });
    function up(e) { delete pts[e.pointerId]; pinch = null; var k = Object.keys(pts); last = k.length ? pts[k[0]] : null; }
    box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
    box.addEventListener('wheel', function (e) {
      e.preventDefault();
      if (e.ctrlKey) zoomAt(Math.exp(-e.deltaY * 0.01), at(e));
      else if (s > 1) { tx -= e.deltaX; ty -= e.deltaY; apply(); }
    }, { passive: false });
    reset.addEventListener('click', function (e) { e.stopPropagation(); s = 1; apply(); });
    return { box: box, reset: reset };
  }

  function cwMapWindow(region, marks, opts) {
    var box = document.createElement('div');
    var w = cwWindow(box);
    var map = cwMap(box, region, marks, opts);
    w.position();
    return { close: w.close, map: map };
  }

  window.cwMap = cwMap;
  window.cwMapWindow = cwMapWindow;
  window.cwWindow = cwWindow;
})();
