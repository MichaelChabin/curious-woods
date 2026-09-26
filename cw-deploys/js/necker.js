/* necker.js — Curious Woods: solids drawn in bare lines, the kind that turn inside out.
   Written 25 Sep 2026 for Professor Necker's Drawing (CWVault/claude/Story-Professor-Neckers-Drawing.md);
   on a shelf so the next story that needs a drawing that turns can use it.

   cwNecker(host, o)        draws one figure into `host` (an element) → { svg, state, set(state) }
   cwNecker.url(shape)      the same figure as an image URL, 412 × 256, for a slot that wants a picture (js/stack.js)
   cwNecker.SHAPES          the figures, as data

   o = {
     shape:   'box' | 'cube' | 'octahedron' | 'sugar' | 'staircase' | 'corner',
     size:    CSS pixels, square                       (the figure's box is 240 units a side)
     letters: true      Necker's A and X, in copper, body-text size, behind the lines: A a little above the
                        front middle corner, X a little below the back one
     dots:    true      a copper dot on each of the two middle corners
     fill:    'front' | 'back' | null                  a face filled, which settles the drawing
     cycle:   true      a tap moves the fill front → back → bare → front, at once, not animated
     label:   the figure's description for someone who cannot see it; with `cycle`, one per state
              as { front, back, bare }
   }

   The rules, from the story's notes (Michael, 25 Sep 2026):
   - Nothing moves. The picture does not change; the seeing does. An animated cube would
     destroy the story. So there is no animation here, nothing is recorded, nothing counted.
   - Bare ink lines of one even weight, no dotted "hidden" edges: a dotted edge tells her
     which corner is in front, and then the drawing cannot turn.
   - A parallelepiped is a front face (four points) and an offset for the back face; all
     twelve edges are drawn. The offset must point clearly away from the slant of the front
     face, or the two faces lie on top of each other and the figure goes flat, with no
     middle corners to look at (the first mock-up did this).
   - The ink is story.css's --cw-ink, read when the figure is drawn.

   Classic script, no dependencies. */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var COPPER = '#b5652b';            // the story's own dot, as on the timeline
  var WASH = '#c8cfd6';              // a quiet grey-blue over paper, for a filled face
  var WASH_OPACITY = 0.7;
  var LINE_PX = 2;                   // one weight, whatever the size
  var UNITS = 240;

  var css = [
    '.cw-necker{display:block;overflow:visible;}',
    '.cw-necker-host + img{margin-top:10px;}',          /* a drawing above its photograph (the crystals) */
    '.cw-necker.cw-necker-tap{cursor:pointer;-webkit-tap-highlight-color:transparent;}',
    '.cw-necker.cw-necker-tap:focus-visible{outline:1px dotted #546A80;outline-offset:4px;}'
  ].join('\n');
  var style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  function prism(F, d) { return { F: F, B: F.map(function (p) { return [p[0] + d[0], p[1] + d[1]]; }) }; }

  // Every figure is lines between points in a 240-unit box, plus, for the solids made of two
  // faces, the faces themselves (so a face can be filled) and the two middle corners.
  var BOX = prism([[14, 220], [114, 220], [142, 112], [42, 112]], [82, -48]);    // Necker's rhomboid
  var CUBE = prism([[18, 222], [158, 222], [158, 82], [18, 82]], [60, -60]);
  var SUGAR = prism([[30, 210], [110, 210], [110, 90], [30, 90]], [90, -34]);    // an upright block, slanted depth

  function prismLines(S) {
    var L = [];
    for (var i = 0; i < 4; i++) {
      L.push([S.F[i], S.F[(i + 1) % 4]]); L.push([S.B[i], S.B[(i + 1) % 4]]); L.push([S.F[i], S.B[i]]);
    }
    return L;
  }
  function solid(S) {
    // the middle corners: the front face's upper-right and the back face's lower-left
    return { lines: prismLines(S), front: S.F, back: S.B, near: S.F[2], far: S.B[0] };
  }

  // The octahedron in the cube's oblique view: the middle square drawn as a parallelogram,
  // one point straight above its centre and one straight below.
  function octahedron() {
    var cx = 120, cy = 120;
    var M = [[cx - 72, cy + 26], [cx + 18, cy + 26], [cx + 72, cy - 26], [cx - 18, cy - 26]];
    var T = [cx, cy - 96], Bo = [cx, cy + 96], L = [];
    for (var i = 0; i < 4; i++) { L.push([M[i], M[(i + 1) % 4]]); L.push([T, M[i]]); L.push([Bo, M[i]]); }
    return { lines: L };
  }

  // Schröder's staircase, 1858: a flight of steps seen from above, or the same flight hanging
  // from the ceiling seen from below. A stepped profile, its copy pushed back, the corners
  // joined, and the long line underneath closing each profile.
  function staircase() {
    var P = [[22, 196]], w = 34, h = 30, i;
    for (i = 0; i < 4; i++) { var q = P[P.length - 1]; P.push([q[0], q[1] - h]); P.push([q[0] + w, q[1] - h]); }
    var d = [62, 34], L = [];
    var Q = P.map(function (p) { return [p[0] + d[0], p[1] + d[1]]; });
    for (i = 0; i < P.length - 1; i++) { L.push([P[i], P[i + 1]]); L.push([Q[i], Q[i + 1]]); }
    for (i = 0; i < P.length; i++) L.push([P[i], Q[i]]);
    L.push([P[0], P[P.length - 1]]); L.push([Q[0], Q[Q.length - 1]]);
    return { lines: L };
  }

  // Three lines meeting at a point: a corner coming toward you, or going away.
  function corner() {
    var c = [120, 128];
    return { lines: [[c, [120, 30]], [c, [36, 176]], [c, [204, 176]]] };
  }

  var SHAPES = {
    box: solid(BOX), cube: solid(CUBE), sugar: solid(SUGAR),
    octahedron: octahedron(), staircase: staircase(), corner: corner()
  };

  function ink() {
    var v = '';
    try { v = getComputedStyle(document.documentElement).getPropertyValue('--cw-ink').trim(); } catch (e) {}
    return v || '#2a2620';
  }
  function paper() {
    var v = '';
    try { v = getComputedStyle(document.documentElement).getPropertyValue('--cw-parchment').trim(); } catch (e) {}
    return v || '#f4f1e8';
  }

  function el(tag, a, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in a) if (a.hasOwnProperty(k)) n.setAttribute(k, a[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function pts(P) { return P.map(function (p) { return p.join(','); }).join(' '); }

  function lines(g, L, colour) {
    L.forEach(function (s) {
      el('line', { x1: s[0][0], y1: s[0][1], x2: s[1][0], y2: s[1][1], stroke: colour,
                   'stroke-width': LINE_PX, 'stroke-linecap': 'round', 'vector-effect': 'non-scaling-stroke' }, g);
    });
  }
  function face(g, P, colour) {
    el('polygon', { points: pts(P), fill: paper() }, g);
    el('polygon', { points: pts(P), fill: WASH, 'fill-opacity': WASH_OPACITY }, g);
    var L = [];
    for (var i = 0; i < 4; i++) L.push([P[i], P[(i + 1) % 4]]);
    lines(g, L, colour);
  }

  // A letter at body-text size, whatever the figure's size: 20 CSS px, in units. Regular
  // weight, no halo, and drawn BEHIND the lines, so where a letter and a line meet the line
  // wins (Michael, 26 Sep: the bold letters hid the two corners that matter).
  var LETTER_PX = 20, CAP = 0.7;                // Georgia's capitals stand about 0.7 em
  function letter(g, text, x, baseline, size) {
    var fs = LETTER_PX * UNITS / size;
    var t = el('text', { x: x, y: baseline, 'text-anchor': 'middle', 'font-family': 'Georgia, "Times New Roman", serif',
                         'font-size': fs.toFixed(1), fill: COPPER }, g);
    t.textContent = text;
    return fs;
  }

  function paint(svg, o, state) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var S = SHAPES[o.shape], colour = ink();
    if (o.letters && S.near) {
      // A above the front middle corner and X below the back one, each a little away from its
      // corner (GAP units clear), so the corner itself stays bare.
      var fs = LETTER_PX * UNITS / o.size, GAP = 12;
      letter(svg, 'A', S.near[0], S.near[1] - GAP, o.size);
      letter(svg, 'X', S.far[0], S.far[1] + GAP + CAP * fs, o.size);
    }
    lines(svg, S.lines, colour);
    if (state === 'front' && S.front) face(svg, S.front, colour);
    if (state === 'back' && S.back) face(svg, S.back, colour);
    if (o.dots && S.near) {
      el('circle', { cx: S.near[0], cy: S.near[1], r: 7, fill: COPPER }, svg);
      el('circle', { cx: S.far[0], cy: S.far[1], r: 7, fill: COPPER }, svg);
    }
  }

  function describe(o, state) {
    if (!o.label) return '';
    if (typeof o.label === 'string') return o.label;
    return o.label[state || 'bare'] || '';
  }

  function cwNecker(host, o) {
    o = o || {};
    var size = o.size || 135;
    o.size = size;
    var svg = el('svg', { viewBox: '0 0 ' + UNITS + ' ' + UNITS, width: size, height: size,
                          'class': 'cw-necker', role: 'img' });
    host.classList.add('cw-necker-host');
    host.appendChild(svg);
    var state = o.fill || null;
    function set(s) {
      state = s || null;
      paint(svg, o, state);
      svg.setAttribute('aria-label', describe(o, state));
    }
    set(state);
    if (o.cycle) {
      svg.classList.add('cw-necker-tap');
      svg.setAttribute('tabindex', '0');
      var order = ['front', 'back', null];
      var next = function () { set(order[(order.indexOf(state) + 1) % order.length]); };
      svg.addEventListener('click', next);
      svg.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); }
      });
    }
    return { svg: svg, get state() { return state; }, set: set };
  }

  // The same drawing as a picture, so a stack can hold it. Ink as a colour, since a picture
  // loaded as an image cannot see the page's stylesheet.
  function url(shape) {
    var S = SHAPES[shape], colour = ink(), s = '';
    S.lines.forEach(function (l) {
      s += '<line x1="' + l[0][0] + '" y1="' + l[0][1] + '" x2="' + l[1][0] + '" y2="' + l[1][1] + '"/>';
    });
    // Wide rather than square, so in a stack it sits the same shape as the pictures beside it.
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-86 -8 412 256" width="412" height="256">' +
              '<g stroke="' + colour + '" stroke-width="3" stroke-linecap="round" fill="none">' + s + '</g></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  cwNecker.url = url;
  cwNecker.SHAPES = SHAPES;
  window.cwNecker = cwNecker;
})();
