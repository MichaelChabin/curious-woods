/* map.js — Curious Woods maps. One earth, many crops.
   Spec: CWVault/claude/Spec-Maps.md.

   cwMap(container, region, marks)   the base picture in the box, the story's marks over it
   cwMapWindow(region, marks)        the same map in the picker window from Glass Geometry
   cwMap.load(url)                   fetch a region's JSON and resolve its picture beside it
   cwMap.toPixel / cwMap.toLonLat    the projection pair (below)

   `region` is the JSON render.py writes: corners, standard parallel, pixel size, image,
   and the contours. `marks` is an array of four kinds and no others:
     { type:'place',  lat, lon, name, text?, story?, side?, lit?, minor? }  a dot and a name
     { type:'path',   places:[ name | [lat, lon], ... ] }       straight segments
     { type:'region', points:[ [lat, lon], ... ], wash }        a wash, no outline: 'grows' (green) or 'made' (violet)
     { type:'note',   lat, lon, text, side?, water? }           words at a point, no dot
   Latitude and longitude come in; pixels come out.

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
  var SVG = 'http://www.w3.org/2000/svg';

  var css = [
    '.cw-map{position:relative;line-height:0;}',
    '.cw-map img{display:block;width:100%;height:auto;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;}',
    '.cw-map svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;cursor:default;}',
    '.cw-map svg path.cw-line{fill:none;stroke-width:1px;stroke-linejoin:round;stroke-linecap:round;vector-effect:non-scaling-stroke;pointer-events:none;}',
    '.cw-map svg text{font-family:' + FONT + ';font-size:' + SIZE + 'px;fill:' + INK + ';pointer-events:none;user-select:none;-webkit-user-select:none;}',
    '.cw-map svg text.cw-minor{font-size:' + SIZE_MINOR + 'px;}',
    '.cw-map svg text.cw-water{font-style:italic;}',
    '.cw-map svg g.cw-halos text{fill:none;stroke:' + HALO + ';stroke-width:' + (2 * HALO_PX) + 'px;stroke-linejoin:round;stroke-linecap:round;}',
    '.cw-map svg g.cw-halos{opacity:' + HALO_ALPHA + ';}',
    '.cw-map .cw-map-text{position:absolute;font-family:' + FONT + ';font-size:' + SIZE_TEXT + 'px;line-height:1.35;color:' + INK + ';background:' + PAPER + ';padding:5px 8px;max-width:220px;pointer-events:none;user-select:none;-webkit-user-select:none;}',
    /* the window: Glass Geometry's picker, copied */
    '.cw-map-backdrop{position:fixed;inset:0;z-index:600;}',
    '.cw-map-window{position:fixed;z-index:601;background:#f0ede4;border:0.5px solid #c8b89a;border-radius:8px;padding:18px;box-shadow:0 4px 24px rgba(42,38,32,0.18);opacity:0;transition:opacity 200ms ease-in;pointer-events:none;max-height:85vh;overflow-y:auto;box-sizing:border-box;max-width:calc(100vw - 16px);}',
    '.cw-map-window.visible{opacity:1;pointer-events:all;}',
    '.cw-map-drag{height:14px;margin:-18px -18px 0 -18px;border-radius:8px 8px 0 0;cursor:grab;display:flex;align-items:center;justify-content:flex-end;padding:0 10px;position:sticky;top:0;z-index:1;background:#f0ede4;touch-action:none;}',
    '.cw-map-drag:active{cursor:grabbing;}',
    '.cw-map-close{font-family:Georgia,serif;font-size:11px;color:#b0a090;cursor:default;transition:color 80ms;pointer-events:all;line-height:14px;}',
    '.cw-map-close:hover{color:#546A80;}',
    '.cw-map-window .cw-map{margin-top:14px;width:' + WINDOW_MAP_WIDTH + 'px;max-width:100%;}'
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

  function cwMap(container, region, marks) {
    marks = marks || [];
    container.classList.add('cw-map');
    container.innerHTML = '';

    var img = document.createElement('img');
    img.alt = '';
    img.draggable = false;
    img.style.aspectRatio = region.width + ' / ' + region.height;   // holds the space before the picture arrives
    img.src = region.url ? new URL(region.image, region.url).href : region.image;
    container.appendChild(img);

    var svg = el('svg', { viewBox: '0 0 1 1', preserveAspectRatio: 'none' });
    container.appendChild(svg);

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
        var gw = SAMPLE_WIDTH, gh = Math.max(1, Math.round(gw * region.height / region.width));
        var c = document.createElement('canvas'); c.width = gw; c.height = gh;
        var ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0, gw, gh);
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
      return { x: left - pad, y: y - size * 0.8 - pad, w: width + 2 * pad, h: size * 1.05 + 2 * pad, tx: x, ty: y, anchor: s.anchor };
    }

    // Placement: try every side, throw out the ones that overlap a placed label, a dot,
    // or the edge; of the rest take the calmest ground, with the mark's own side and the
    // preferred order breaking ties. Returns the box, or null to drop the label.
    function place(p, text, size, italic, r, side, placed, dots, w, h) {
      var width = textWidth(text, size, italic);
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
      return best;
    }

    function draw() {
      var w = container.clientWidth, h = container.clientHeight;
      if (!w || !h) return;
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
        if (m.type === 'place') { var q = toPixel(region, m.lon, m.lat, w, h); dots.push({ x: q.x, y: q.y, r: m.minor ? DOT_MINOR : (m.lit ? DOT + 1.5 : DOT) }); }
      });
      var order = ['region', 'path', 'place', 'note'];
      order.forEach(function (kind) {
        // Places the story names are placed before lesser ones, so the lesser give way.
        var these = marks.filter(function (m) { return m.type === kind; });
        if (kind === 'place') these.sort(function (a, b) { return (a.minor ? 1 : 0) - (b.minor ? 1 : 0); });
        these.forEach(function (m) { drawMark(m, w, h, marksLayer, halos, glyphs, placed, dots); });
      });
      shown.forEach(function (s) { positionText(s, w, h); });
    }

    function drawLines(layer, w, h) {
      var c = region.contours;
      if (!c) return;
      for (var level in LINES) {
        if (!c.hasOwnProperty(level)) continue;
        var d = [];
        for (var i = 0; i < c[level].length; i++) {
          var line = c[level][i];
          for (var j = 0; j < line.length; j++) {
            var q = toPixel(region, line[j][0], line[j][1], w, h);
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
        var pts = (m.points || []).map(function (q) { var r = toPixel(region, q[1], q[0], w, h); return r.x + ',' + r.y; });
        layer.appendChild(el('polygon', { points: pts.join(' '), fill: WASHES[m.wash] || WASHES.grows, 'fill-opacity': WASH, stroke: 'none' }));
      } else if (m.type === 'path') {
        var seg = [];
        (m.places || []).forEach(function (q) {
          var lat, lon;
          if (typeof q === 'string') { var pl = placeByName(q); if (!pl) return; lat = pl.lat; lon = pl.lon; }
          else { lat = q[0]; lon = q[1]; }
          var r = toPixel(region, lon, lat, w, h);
          seg.push(r.x + ',' + r.y);
        });
        layer.appendChild(el('polyline', { points: seg.join(' '), fill: 'none', stroke: VERMILION, 'stroke-width': 1.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', 'vector-effect': 'non-scaling-stroke' }));
      } else if (m.type === 'note') {
        p = toPixel(region, m.lon, m.lat, w, h);
        box = place(p, m.text || '', SIZE, !!m.water, 0, m.side, placed, dots, w, h);
        if (box) { placed.push(box); label(m.text || '', box, m.water ? 'cw-water' : null, halosLayer, glyphLayer); }
      } else if (m.type === 'place') {
        p = toPixel(region, m.lon, m.lat, w, h);
        var r = m.minor ? DOT_MINOR : (m.lit ? DOT + 1.5 : DOT);
        var g = el('g', {});
        if (m.text || m.story) {
          g.appendChild(el('circle', { cx: p.x, cy: p.y, r: TAP, fill: 'transparent', stroke: 'none' }));
        }
        g.appendChild(el('circle', { cx: p.x, cy: p.y, r: r, fill: m.minor ? GREY : (m.lit ? COPPER : VERMILION), stroke: 'none' }));
        if (m.story) {
          g.addEventListener('click', function () { window.location.href = m.story; });
        } else if (m.text) {
          g.addEventListener('click', function () { toggleText(m, p); });
        }
        layer.appendChild(g);
        var size = m.minor ? SIZE_MINOR : SIZE;
        box = place(p, m.name || '', size, false, r, m.side, placed, dots, w, h);
        if (box) { placed.push(box); label(m.name || '', box, m.minor ? 'cw-minor' : null, halosLayer, glyphLayer); }
      }
    }

    function toggleText(m, p) {
      for (var i = 0; i < shown.length; i++) {
        if (shown[i].mark === m) { container.removeChild(shown[i].div); shown.splice(i, 1); return; }
      }
      var div = document.createElement('div');
      div.className = 'cw-map-text';
      div.textContent = m.text;
      container.appendChild(div);
      var s = { mark: m, div: div };
      shown.push(s);
      positionText(s, container.clientWidth, container.clientHeight);
    }

    // Below and to the right of the dot; flipped left or up when the box would run out.
    function positionText(s, w, h) {
      var p = toPixel(region, s.mark.lon, s.mark.lat, w, h);
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

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(function () { draw(); }).observe(container);
    } else {
      window.addEventListener('resize', draw);
    }
    function onLoad() { readGround(); draw(); }
    if (img.complete && img.naturalWidth) onLoad(); else img.addEventListener('load', onLoad);
    draw();

    return { reset: reset, redraw: draw };
  }

  cwMap.toPixel = toPixel;
  cwMap.toLonLat = toLonLat;

  cwMap.load = function (url) {
    var abs = new URL(url, window.location.href).href;
    return fetch(abs).then(function (r) {
      if (!r.ok) throw new Error('map region ' + url + ': ' + r.status);
      return r.json();
    }).then(function (region) { region.url = abs; return region; });
  };

  // The window is Glass Geometry's picker window: an invisible backdrop that closes it,
  // a drag handle along the top with the word close at its right, a 200 ms fade.
  // The picker drags with mouse events; this handle listens to pointer events so the
  // same drag works under a finger. Nothing else differs.
  function cwMapWindow(region, marks) {
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
    var box = document.createElement('div');
    win.appendChild(box);
    document.body.appendChild(backdrop);
    document.body.appendChild(win);

    var map = cwMap(box, region, marks);

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
      setTimeout(function () {
        if (win.parentNode) win.parentNode.removeChild(win);
        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      }, 200);
    }
    backdrop.addEventListener('click', closeWindow);
    close.addEventListener('click', function (e) { e.stopPropagation(); closeWindow(); });

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

    return { close: closeWindow, map: map };
  }

  window.cwMap = cwMap;
  window.cwMapWindow = cwMapWindow;
})();
