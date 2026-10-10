/* deep-time.js — Curious Woods: the nested bar of deep time, as a shelf module.
   Plan: CWVault/claude/Plan-Deep-Time.md, Stage 2. Rulings: Rulings-Sept-2026.md, "Deep time" (6 Oct
   2026): six chunks cut where the evidence changes kind, every bar saying what it is known from;
   deep lines count "ago" only. The ideas: Ideas-Ledger.md, Other labs, 5–6 Oct (the nested bar, uneven
   nesting, the dot and tail, Hazen's colours, the descent). The chunk tree: stories/deep-time.json.

   cwDeepTime(host, opts)  → { year(), setYear(ma), open(names), focus(a, b), path(), span(), events(), destroy() }

   Lane B of the one timeline (9 Oct 2026; CWVault/claude/Prompt-Build-One-Timeline.md, on Michael's
   rulings of the same day): every level is a line in the Time Machine's own form. The top line is
   the whole of Earth; its periods are quiet tinted segments on it. Tap a period and the blue
   envelope settles on it and the period opens as a line of its own beneath, joined by the funnel —
   the Time Machine's Focus window, repeated at every level. Drag the envelope's ends (or its body)
   and the line below follows; near a period's edge an end clicks into place (a detent). Snapped to
   a period the envelope is blue and the funnel says the period's name; free, it is white and the
   funnel says the span. Tap the open period again and it closes. The copper marker is the year; it
   lives on the deepest line, shows as a tick on every line above, and is dragged or tapped into
   place. A mark is a short bar under the line at the oldest evidence of a thing; a faint tail runs
   older for "probably began by here". Every line carries one line saying what it is known
   from — the fog, in words. The filled bars of 6 Oct are gone (Michael, 8–9 Oct).

   Lane D (9 Oct, night, Michael's second chat): every line has one label, centred above it on a
   line drawn out to both ends as on a drafting drawing — the period's name and its length when the
   envelope above is snapped ("The dinosaurs, 186 million years"), its length alone with "about" when
   free; the top line "The Earth, 4.6 billion years" with no dates; every other line its two dates,
   in years ago, at its ends. No 0 at the left edge, no name at the left, no label in the funnel. A
   free envelope is the measurer: its two ends and the length written on the line below. Collapsing:
   once more than two lines show, the word Collapse at the top right folds every line but the top and
   the bottom into strips a finger can hit (their periods, their envelope's outline, their label, a
   Show word each); the top line keeps everything but its events; Show all unfolds. autoCollapse
   folds by itself as she goes deeper, keeping the parent of her line whole.

   A curve under the bar (Stage 5, 6 Oct 2026): setCurve(curve | null) draws a curve file from
   stories/curves/ — { points: [[year, value, low, high], ...], scale: 'linear' | 'log', unit, say,
   second?: { name, say, points } } — along the deepest bar's span, as a band (low to high, soft) with
   the value as a line, a second series if there is one, and the value at the marker written out
   from `say` ('{v}' the number, '{dir}' above/below for a signed metre). The band is the point: a
   wide band says little is known, and the words at the marker say 'about'.

   The marks from the store (Stage 6, 7 Oct 2026): given `events`, the records of
   stories/deep-time-events.json (tools/deep-events-from-vault.py), a bar's marks are the events
   whose age falls in its span — a dot at the oldest evidence, the tail from the record's `tail`,
   labels placed heavier first — and the tree's own `marks` are ignored (they were the sketches).
   onMark then hands over the mark with its record at `mark.rec`; cwDeepTime.moreHTML(rec) renders
   the More as the Time Machine page does (the date line stepped, the paragraphs, the references).
   Since 9 Oct 2026 the store is the one store, every event deep and after the ice (Stage 7's first
   step); a mark is a short vertical bar, not a dot, and events() and span() let the page say which
   event the marker has just passed: an after-the-ice record's date line is its parts { count, ordinary, ago } and is stepped
   as the Time Machine steps it; a September survivor has no More (rec.more is null), so the page
   offers the word only when there is one.

   opts:
     events   the deep-time events, or the URL of their JSON; absent, the tree's sketches are drawn
     data     the tree, or the URL of its JSON (default '../stories/deep-time.json')
     year     the marker's opening age, in millions of years ago (default: the root's start)
     onYear   function (ma, storeYear) — every time the marker moves; storeYear is the store's
              astronomer's year (this year minus ma million), what map.setTime takes
     onBar    function (bar, path) — a bar was pulled down (or closed back to this one)
     onMark   function (mark, bar) — a mark was tapped
     handoff   { line, gap } — the deepest line whose node carries `line` is the page's own (the Time
               Machine's Main, lane C): laid out, not drawn, the funnel ending `gap` px below this svg;
               onHandoff({ on, xL, xR, from, to, node }) tells the page, every draw
     autoCollapse  true to fold the lines above the parent by themselves as she goes deeper (lane D)
   Times are millions of years ago throughout ('from' the older end); the readout writes them as
   billions, millions or thousands of years ago, never BCE, never "after zero" (the ruling).

   Classic script, no dependencies. */
(function () {
  'use strict';

  var CSS = [
    '.cw-deep{position:relative;font-family:Georgia,"Times New Roman",serif;color:#2a241c;user-select:none;-webkit-user-select:none;}',
    '.cw-deep svg{display:block;width:100%;overflow:visible;touch-action:none;}',
    '.cw-deep text{font-family:Georgia,serif;}',
    '.cw-deep .knob{cursor:grab;}',
    '.cw-deep.dragging,.cw-deep.dragging .knob{cursor:grabbing;}',
    '.cw-deep .mark{cursor:pointer;}',
    '.cw-deep .halo{paint-order:stroke;stroke:#f4f1e8;stroke-width:4px;stroke-linejoin:round;}',
    '.cw-deep .env{cursor:grab;}',
    '.cw-deep .seg{cursor:pointer;}',
    '.cw-deep .seg:hover rect.tint{opacity:.42;}',
    '.cw-deep .word{cursor:pointer;}',
    '.cw-deep .word:hover text{fill:#3D3D3A;}'
  ].join('\n');

  var SVG = 'http://www.w3.org/2000/svg';
  var INK = '#2a241c', INK_SOFT = '#6b655a', GREY = '#9a958b', COPPER = '#b5652b', LINE = '#46597a', PARCH = '#f4f1e8', FOCUS_EDGE = '#8fb0d2', FOCUS = '#bcd3ea';
  var TOP = 48, PAD = 12, HIT_PX = 28, DETENT_PX = 9, MIN_SPAN_PX = 6;
  // a line's box (part 2 of the stack prompt): the dates row, the row of period names, the strip 6 px high, the event lines, the label rows, a gap
  var DATES_H = 14, NAMES_H = 16, STRIP = 6, EV_LINE = 12, ROW_H = 13, TICK_H = 7, BOX_GAP = 14, TITLE_ABOVE = 18, MARGIN = 118, LABEL_ROWS_MAX = 4;
  var CONE = '#bcd3ea', CONE_EDGE = '#8fb0d2';
  var CURVE_H = 84;   // the band's height under the deepest line
  var CURVE_FILL = '#8fb0d2', CURVE_LINE = '#46597a', CURVE_FILL_2 = '#d9a066', CURVE_LINE_2 = '#b5652b';   // widths are honest (6 Oct, Michael): a hairline is the lesson; a thin chunk gets a finger-sized hit area
  var THIS_YEAR = new Date().getFullYear();

  function el(tag, attrs, parent, text) {
    var e = document.createElementNS(SVG, tag);
    for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  function luminance(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || ''); if (!m) return 0.5;
    var n = parseInt(m[1], 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  }
  function withCommas(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  /* the readout: ago only, in the unit the number wants (the ruling of 6 Oct 2026) */
  function fmt(ma) {
    if (ma <= 0) return 'now';
    if (ma >= 1000) { var b = ma / 1000; return (b >= 10 ? Math.round(b) : (Math.round(b * 10) / 10)).toString() + ' billion years ago'; }
    if (ma >= 1) return (ma >= 10 ? Math.round(ma) : (Math.round(ma * 10) / 10)).toString() + ' million years ago';
    var y = ma * 1e6;
    if (y >= 10000) return withCommas(Math.round(y / 1000) * 1000) + ' years ago';
    if (y >= 1000) return withCommas(Math.round(y / 100) * 100) + ' years ago';
    return withCommas(Math.round(y)) + ' years ago';
  }
  function spanText(from, to) { return fmt(from).replace(' ago', '') + ' to ' + (to <= 0 ? 'now' : fmt(to).replace(' ago', '')); }
  function durText(span) { return fmt(span).replace(' ago', ''); }   // a length of time: '570 million years'

  function cwDeepTime(host, opts) {
    opts = opts || {};
    if (!document.getElementById('cw-deep-css')) { var st = document.createElement('style'); st.id = 'cw-deep-css'; st.textContent = CSS; document.head.appendChild(st); }
    host.classList.add('cw-deep');
    var svg = el('svg', {}, host);
    var defs = el('defs', {}, svg);
    var grad = el('linearGradient', { id: 'cw-deep-tail', x1: 0, x2: 1, y1: 0, y2: 0 }, defs);
    el('stop', { offset: 0, 'stop-color': INK, 'stop-opacity': 0 }, grad);
    el('stop', { offset: 1, 'stop-color': INK, 'stop-opacity': 0.32 }, grad);

    var root = null, ma = 0, W = 0, drag = null, destroyed = false, ro = null, store = null;
    // the stack (Prompt-Build-Timeline-Stack.md, part 3): line 0 is the Earth; env[i] = { a, b, child } is the
    // window on line i (a the older end, b the younger, in ma; child the period it is snapped to, or null
    // when free), and line i + 1 is that window's span. A line is OPEN (its strip with event labels) or
    // CLOSED (its strip with short faint event lines and no labels): `closed[i]`. Lines beneath a tap are
    // REMOVED: env is cut. A cone shows at junction i once she has acted there: `touched[i]`.
    var env = [], closed = {}, touched = {};
    var tierGeom = [];   // per line: { node, ids, from, to, snapped, open, xL, xR, top, h, stripY, x(ma), m(px), segs, labels, ticks }

    function lineOf(i) {
      if (i === 0) return { node: root, from: root.from, to: root.to, snapped: root, parent: null, ids: [root.id || 'earth'] };
      var e = env[i - 1], up = lineOf(i - 1), ids = up.ids.slice();
      if (e.child && e.child.id) ids.push(e.child.id);
      return { node: e.child || up.node, from: e.a, to: e.b, snapped: e.child, parent: up.node, ids: ids };
    }
    function deepest() { return lineOf(env.length); }
    function path() { return env.map(function (e) { return e.child ? e.child.name : 'about ' + durText(e.a - e.b); }); }
    function storeYear(m) { return Math.round(THIS_YEAR - m * 1e6); }
    function segsOf(L) {
      return (L.node.chunks || []).filter(function (c) { return c.from > L.to && c.to < L.from; }).map(function (c) {
        var f = Math.min(c.from, L.from), t = Math.max(c.to, L.to);
        return { node: c, from: f, to: t, whole: f === c.from && t === c.to };
      });
    }
    function marksFor(g) {
      if (!store) return [];
      return store.filter(function (ev) { return ev.ma <= g.from && ev.ma >= g.to; }).map(function (ev) {
        return { ma: ev.ma, label: ev.label, tail: ev.tail ? ev.tail.ma : null, text: ev.summary, weight: ev.weight || 1, line: ev.line || null, rec: ev };
      });
    }
    /* which events get a label on this line (Event-Lines.md): an event labelled on this line or a wider one
       is a candidate, the wider line's first; an event with no line yet is a candidate by weight (today's
       behaviour); the rest are event lines with no label. Labels pack into rows, at most LABEL_ROWS_MAX,
       room permitting; a mark within 3 px of one already drawn is thinned out */
    function placeLabels(g, L, open) {
      var ids = L.ids, rank = function (mk) { var i = mk.line ? ids.indexOf(mk.line) : -1; return i < 0 ? (mk.line ? 99 : 50) : i; };
      var list = marksFor(g).sort(function (p, q) { return rank(p) - rank(q) || (q.weight || 1) - (p.weight || 1) || q.ma - p.ma; });
      var rows = [], drawn = [], labels = [], ticks = [];
      list.forEach(function (mk) {
        var mx = g.x(mk.ma);
        if (drawn.some(function (dx) { return Math.abs(dx - mx) < 3; })) return;
        drawn.push(mx);
        var ok = open && rank(mk) < 99;
        if (ok) {
          var lw = mk.label.length * 5.6 + 8, lx0 = mx - lw / 2, lx1 = mx + lw / 2, placed = false;
          for (var r = 0; r < LABEL_ROWS_MAX && !placed; r++) {
            if (!rows[r]) rows[r] = [];
            var clash = rows[r].some(function (sp) { return !(lx1 < sp[0] || lx0 > sp[1]); });
            if (!clash) { rows[r].push([lx0, lx1]); labels.push({ mk: mk, mx: mx, row: r }); placed = true; }
          }
          if (!placed) ticks.push({ mk: mk, mx: mx });
        } else ticks.push({ mk: mk, mx: mx });
      });
      var nrows = 0; labels.forEach(function (l) { nrows = Math.max(nrows, l.row + 1); });
      return { labels: labels, ticks: ticks, rows: nrows };
    }
    /* a line's box: top to bottom the dates row (open lines), the row of period names, the strip, the event
       lines, the labels in as many rows as they need (to the cap), then a gap; its height is measured after
       the labels are placed, so the next box starts below the lowest label. The Earth line is full width;
       the others share one width, inset to leave the title margin (above the line at phone width) */
    function layout(L, depth, top) {
      var full = W - 2 * PAD, small = W < 560, xL, xR;
      if (depth === 0) { xL = PAD; xR = W - PAD; } else if (small) { xL = PAD + full / 8; xR = W - PAD - full / 8; } else { xL = PAD + MARGIN; xR = W - PAD; }
      var width = xR - xL, span = (L.from - L.to) || 1, open = !closed[depth];
      var g = { line: L, node: L.node, ids: L.ids, from: L.from, to: L.to, snapped: L.snapped, open: open, depth: depth, xL: xL, xR: xR, top: top, small: small, segs: [] };
      g.x = function (m) { return xL + width * (L.from - m) / span; };
      g.m = function (px) { return L.from - span * (px - xL) / width; };
      segsOf(L).forEach(function (sg) { sg.x0 = g.x(sg.from); sg.x1 = g.x(sg.to); g.segs.push(sg); });
      var y = top + (small || depth === 0 ? TITLE_ABOVE : 0) + (open ? DATES_H : 0) + NAMES_H;
      g.stripY = y;                       // the strip's top; the line's middle is stripY + STRIP / 2
      g.y = y + STRIP / 2;
      var pl = placeLabels(g, L, open);
      g.labels = pl.labels; g.ticks = pl.ticks; g.rows = pl.rows;
      g.h = (g.stripY - top) + STRIP + (open ? EV_LINE + Math.max(1, pl.rows) * ROW_H + 6 : TICK_H + 8) + BOX_GAP;
      return g;
    }
    function titleOf(L, depth) {
      if (depth === 0) return { name: root.name + ', ' + durText(root.from - root.to), span: null };
      if (L.snapped) return { name: L.node.name, span: durText(L.from - L.to) };
      return { name: null, span: 'about ' + durText(L.from - L.to) };
    }
    function word(x, y, text, anchor, parent, onTap, cls) {
      var g = el('g', { 'class': 'word' + (cls ? ' ' + cls : '') }, parent);
      var t = el('text', { x: x, y: y, 'font-size': 12, 'font-style': 'italic', fill: '#546A80', 'text-anchor': anchor, 'class': 'halo' }, g, text);
      var w = 0; try { w = t.getComputedTextLength(); } catch (e) { w = text.length * 6; }
      el('rect', { x: anchor === 'end' ? x - w - 8 : (anchor === 'middle' ? x - w / 2 - 8 : x - 8), y: y - 14, width: w + 16, height: 22, fill: 'transparent' }, g);
      g.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
      g.addEventListener('click', function (ev) { ev.stopPropagation(); onTap(); });
      return g;
    }
    function dimension(grp, xL, xR, y, text) {
      var cx = (xL + xR) / 2, t = el('text', { x: cx, y: y + 4, 'font-size': 12, fill: INK, 'text-anchor': 'middle', 'class': 'halo' }, grp, text);
      var w; try { w = t.getComputedTextLength(); } catch (e) { w = text.length * 6; }
      var half = w / 2 + 7;
      if (cx - half > xL + 4) {
        el('line', { x1: xL, y1: y, x2: cx - half, y2: y, stroke: '#9a958b', 'stroke-width': 1 }, grp);
        el('line', { x1: cx + half, y1: y, x2: xR, y2: y, stroke: '#9a958b', 'stroke-width': 1 }, grp);
        [xL, xR].forEach(function (x) { el('line', { x1: x, y1: y - 5, x2: x, y2: y + 5, stroke: '#9a958b', 'stroke-width': 1 }, grp); });
      } else { var nx = Math.max(PAD + w / 2, Math.min(W - PAD - w / 2, cx)); t.setAttribute('x', nx); }
    }

    function draw() {
      if (destroyed || !root) return;
      W = host.getBoundingClientRect().width || 600;
      while (svg.lastChild && svg.lastChild !== defs) svg.removeChild(svg.lastChild);
      tierGeom = [];
      var n = env.length + 1, top = TOP;
      for (var i = 0; i < n; i++) { var g0 = layout(lineOf(i), i, top); tierGeom.push(g0); top += g0.h; }
      var deep = tierGeom[tierGeom.length - 1];
      var handed = !!(opts.handoff && env.length && deep.node.line === opts.handoff.line);

      // the readout, top left: the marker's year, bold, ago; under it what this line is known from
      var rt = el('text', { x: PAD, y: 18, 'font-size': 13, fill: INK_SOFT, 'class': 'halo' }, svg);
      el('tspan', { 'font-weight': 'bold', 'font-size': 16, fill: INK }, rt, fmt(ma));
      var kfn = periodWords && periodWords[deep.node.name] ? periodWords[deep.node.name].knownFrom : deep.node.knownFrom;
      if (kfn) {
        var kf = el('text', { x: PAD, y: 36, 'font-size': 12, 'font-style': 'italic', fill: INK_SOFT, 'class': 'halo' }, svg);
        var words = ('known from ' + kfn).split(' ');
        kf.textContent = words.join(' ');
        while (words.length > 2 && !fitText(kf, W - 2 * PAD)) { words.pop(); kf.textContent = words.join(' ') + '…'; }
      }
      // the cones first, behind everything: from a line's window down to the next line's strip, once she has acted there
      var cones = el('g', { 'class': 'cones' }, svg);
      tierGeom.forEach(function (g, d) {
        var e = env[d]; if (!e || !touched[d]) return;
        var ng = tierGeom[d + 1], fa = g.x(e.a), fb = g.x(e.b), y0 = g.stripY + STRIP, ty = ng.stripY;
        el('path', { d: 'M' + fa + ',' + y0 + ' L' + fb + ',' + y0 + ' L' + ng.xR + ',' + ty + ' L' + ng.xL + ',' + ty + ' Z', fill: CONE, opacity: 0.18 }, cones);
        el('line', { x1: fa, y1: y0, x2: ng.xL, y2: ty, stroke: CONE_EDGE }, cones);
        el('line', { x1: fb, y1: y0, x2: ng.xR, y2: ty, stroke: CONE_EDGE }, cones);
      });

      tierGeom.forEach(function (g, d) {
        var L = g.line, grp = el('g', { 'class': 'bar', 'data-depth': d, 'data-open': g.open ? '1' : '0' }, svg), e = env[d], tt = titleOf(L, d);
        // the title: the Earth's centred above its line; the others in the margin, right-aligned (above at phone width)
        if (d === 0) { var dg = el('g', {}, grp); dimension(dg, g.xL, g.xR, g.top + 10, tt.name); el('rect', { x: g.xL, y: g.top - 2, width: g.xR - g.xL, height: 22, fill: 'transparent' }, dg); wireTitle(dg, d); }
        else if (g.small) {
          var ta = el('text', { x: g.xL, y: g.top + 12, 'font-size': 13, fill: INK, 'class': 'halo title' }, grp, tt.name || '');
          el('tspan', { 'font-size': 11, fill: '#9a958b' }, ta, (tt.name ? ' · ' : '') + (tt.span || ''));
          wireTitle(ta, d);
        } else {
          var tg = el('g', { 'class': 'title' }, grp), tx = g.xL - 12;
          if (tt.name) el('text', { x: tx, y: g.y + 4, 'font-size': 13, fill: INK, 'text-anchor': 'end', 'class': 'halo' }, tg, tt.name);
          if (tt.span) el('text', { x: tx, y: g.y + (tt.name ? 18 : 4), 'font-size': 11, fill: '#9a958b', 'text-anchor': 'end', 'class': 'halo' }, tg, tt.span);
          el('rect', { x: PAD, y: g.y - 12, width: MARGIN - 16, height: 34, fill: 'transparent' }, tg);
          wireTitle(tg, d);
        }
        // the dates at the ends, in years ago, on open lines below the Earth
        if (g.open && d > 0) {
          el('text', { x: g.xL, y: g.stripY - NAMES_H - 3, 'font-size': 11, fill: INK_SOFT, 'class': 'halo' }, grp, fmt(L.from));
          el('text', { x: g.xR, y: g.stripY - NAMES_H - 3, 'font-size': 11, fill: INK_SOFT, 'text-anchor': 'end', 'class': 'halo' }, grp, L.to <= 0 ? 'now' : fmt(L.to));
        }
        // the strip: a band 6 px high per period in its own colour, its name above in italic; the plain stretch
        // of a line whose periods do not fill it (Mammoths) in the line's stretch colour
        if (L.node.stretchColour && L.snapped) el('rect', { x: g.xL, y: g.stripY, width: g.xR - g.xL, height: STRIP, fill: L.node.stretchColour, opacity: 0.55 }, grp);
        else el('line', { x1: g.xL, y1: g.y, x2: g.xR, y2: g.y, stroke: '#c8c0b0', 'stroke-width': 1 }, grp);
        g.segs.forEach(function (sg) {
          var cn = sg.node, sgp = el('g', { 'class': 'seg' }, grp);
          el('rect', { 'class': 'band', x: sg.x0, y: g.stripY, width: Math.max(1, sg.x1 - sg.x0), height: STRIP, fill: cn.colour || '#cdbfa3' }, sgp);
          var t = el('text', { x: (sg.x0 + sg.x1) / 2, y: g.stripY - 4, 'font-size': 11, 'font-style': 'italic', fill: INK_SOFT, 'text-anchor': 'middle', 'class': 'halo' }, sgp);
          t.textContent = cn.name;
          if (!fitText(t, sg.x1 - sg.x0 - 4)) t.textContent = '';
          el('title', {}, sgp, cn.name + ' · ' + spanText(cn.from, cn.to));
          el('rect', { x: sg.x0, y: g.stripY - NAMES_H, width: Math.max(1, sg.x1 - sg.x0), height: NAMES_H + STRIP + 8, fill: 'transparent' }, sgp);
          sgp.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
          sgp.addEventListener('click', function (ev) { ev.stopPropagation(); tapSeg(d, sg); });
        });
        g.segs.slice().sort(function (p, q) { return (q.x1 - q.x0) - (p.x1 - p.x0); }).forEach(function (sg) {
          var wv = sg.x1 - sg.x0; if (wv >= HIT_PX) return;
          var hx = (sg.x0 + sg.x1) / 2 - HIT_PX / 2, hg = el('g', { 'class': 'seg' }, grp);
          el('rect', { x: Math.max(g.xL, hx), y: g.stripY - NAMES_H, width: HIT_PX, height: NAMES_H + STRIP + 8, fill: 'transparent' }, hg);
          el('title', {}, hg, sg.node.name + ' · ' + spanText(sg.node.from, sg.node.to));
          hg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
          hg.addEventListener('click', function (ev) { ev.stopPropagation(); tapSeg(d, sg); });
        });
        if (handed && g === deep) return;   // the page's own line: its title, dates and strip only
        // the events: a line 0.8 px from the strip's middle down to its label; an unlabelled one a short line;
        // on a closed line short, faint lines and no labels
        var tailY = g.stripY + STRIP + 3;
        if (g.open) {
          g.labels.forEach(function (l) {
            var ly = g.stripY + STRIP + EV_LINE + l.row * ROW_H + 9;
            if (l.mk.tail && l.mk.tail > l.mk.ma) el('rect', { x: g.x(Math.min(l.mk.tail, L.from)), y: tailY, width: Math.max(2, l.mx - g.x(Math.min(l.mk.tail, L.from))), height: 2, fill: 'url(#cw-deep-tail)' }, grp);
            var mg = el('g', { 'class': 'mark' }, grp);
            el('line', { x1: l.mx, y1: g.y, x2: l.mx, y2: ly - 10, stroke: INK, 'stroke-width': 0.8 }, mg);
            el('text', { x: l.mx, y: ly, 'font-size': 11, fill: INK_SOFT, 'text-anchor': 'middle', 'class': 'halo' }, mg, l.mk.label);
            el('rect', { x: l.mx - 9, y: g.y, width: 18, height: ly - g.y + 4, fill: 'transparent' }, mg);
            el('title', {}, mg, l.mk.label + ' · ' + fmt(l.mk.ma) + (l.mk.tail ? ' (probably began by ' + fmt(l.mk.tail).replace(' ago', '') + ')' : ''));
            mg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
            mg.addEventListener('click', function (ev) { ev.stopPropagation(); tapMark(d, l.mk, L); });
          });
        }
        g.ticks.forEach(function (tk) {
          var mg = el('g', { 'class': 'mark' }, grp), len = g.open ? TICK_H + 2 : TICK_H;
          el('line', { x1: tk.mx, y1: g.y, x2: tk.mx, y2: g.stripY + STRIP + len, stroke: g.open ? INK : '#9a958b', 'stroke-width': 0.8, opacity: g.open ? 0.9 : 0.6 }, mg);
          el('rect', { x: tk.mx - 6, y: g.y, width: 12, height: STRIP + len + 4, fill: 'transparent' }, mg);
          el('title', {}, mg, tk.mk.label + ' · ' + fmt(tk.mk.ma));
          mg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
          mg.addEventListener('click', function (ev) { ev.stopPropagation(); tapMark(d, tk.mk, L); });
        });
        // the window: a clear lens — a thin ink edge, a faint white wash, a small ink grip at each end
        if (e) {
          var ea = g.x(e.a), eb = g.x(e.b), eg = el('g', { 'class': 'env' }, grp), ly0 = g.stripY - 4, lh = STRIP + 8;
          el('rect', { x: ea, y: ly0, width: Math.max(3, eb - ea), height: lh, rx: 2, fill: '#ffffff', 'fill-opacity': 0.28, stroke: INK, 'stroke-width': 1 }, eg);
          [ea, eb].forEach(function (x) { el('rect', { x: x - 1.5, y: ly0 - 3, width: 3, height: lh + 6, rx: 1, fill: INK }, eg); });
          el('rect', { x: ea - 10, y: ly0 - 8, width: Math.max(20, eb - ea + 20), height: lh + 16, rx: 4, fill: 'transparent' }, eg);
          eg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); startEnvDrag(ev, d, g); });
        }
        // the marker's tap strip on the deepest line (jump the marker), beneath its marks
        if (g === deep) {
          var stripR = el('rect', { x: g.xL, y: g.stripY + STRIP, width: g.xR - g.xL, height: 14, fill: 'transparent', 'class': 'knob' }, grp);
          stripR.addEventListener('pointerdown', startDrag);
        }
        // the marker: a copper tick on every line above the deepest
        if (g !== deep && ma <= L.from && ma >= L.to) {
          var hx = g.x(ma);
          el('line', { x1: hx, y1: g.stripY - 5, x2: hx, y2: g.stripY + STRIP + 5, stroke: COPPER, 'stroke-width': 2, opacity: 0.85 }, grp);
        }
      });
      var curveH = 0, H;
      if (handed) {
        H = deep.stripY - (opts.handoff.gap || 18);
        if (opts.onHandoff) opts.onHandoff({ on: true, xL: deep.xL, xR: deep.xR, from: deep.from, to: deep.to, node: deep.node });
      } else {
        if (curve) curveH = drawCurve(deep);
        var hx2 = Math.max(deep.xL, Math.min(deep.xR, deep.x(ma)));
        var kg = el('g', { 'class': 'knob' }, svg);
        el('line', { x1: hx2, y1: deep.stripY - 10, x2: hx2, y2: deep.stripY + STRIP + 12 + curveH, stroke: COPPER, 'stroke-width': 1.5, opacity: 0.9 }, kg);
        el('circle', { cx: hx2, cy: deep.stripY + STRIP + 11, r: 14, fill: 'transparent' }, kg);
        el('circle', { cx: hx2, cy: deep.stripY + STRIP + 11, r: 6.5, fill: COPPER, stroke: PARCH, 'stroke-width': 2 }, kg);
        kg.addEventListener('pointerdown', startDrag);
        H = deep.top + deep.h + curveH;
        if (opts.onHandoff) opts.onHandoff({ on: false });
      }
      svg.setAttribute('height', H); svg.style.height = H + 'px';
    }
    function wireTitle(elm, d) {
      elm.classList.add('title'); elm.style.cursor = 'pointer';
      elm.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
      elm.addEventListener('click', function (ev) { ev.stopPropagation(); closed[d] = !closed[d]; draw(); });
    }
    var curve = null;
    function curveAt(pts, y, k) {   // the value (k = 1), low (2) or high (3) at a store year, by straight lines between points
      if (!pts || !pts.length) return null;
      if (y <= pts[0][0]) return pts[0][k] != null ? pts[0][k] : pts[0][1];
      var K = function (p) { return p[k] != null ? p[k] : p[1]; };
      for (var i = 1; i < pts.length; i++) if (y <= pts[i][0]) { var a = pts[i - 1], b = pts[i], t = (y - a[0]) / ((b[0] - a[0]) || 1); return K(a) + (K(b) - K(a)) * t; }
      return K(pts[pts.length - 1]);
    }
    function sayValue(tmpl, v, unit) {
      var n = Math.abs(v), txt;
      if (n === 0) txt = '0';
      else if (n >= 100) txt = withCommas(Math.round(n));
      else if (n >= 10) txt = (Math.round(n * 10) / 10).toString();
      else if (n >= 0.01) txt = (Math.round(n * 100) / 100).toString();
      else { var e = Math.floor(Math.log10(n)), lead = Math.round(n / Math.pow(10, e)); txt = (lead === 1 ? 'a ' : lead + ' ') + ({ '-3': 'thousandth', '-4': 'ten-thousandth', '-5': 'hundred-thousandth', '-6': 'millionth', '-7': 'ten-millionth', '-8': 'hundred-millionth' }[String(e)] || ('10^' + e)) + (lead === 1 ? '' : 's'); }
      return (tmpl || '{v} ' + (unit || '')).replace('{v}', txt).replace('{dir}', v < 0 ? 'below' : 'above');
    }
    function drawCurve(deep) {
      var c = curve, n = deep, y0 = deep.top + deep.h - BOX_GAP + 6, y1 = y0 + CURVE_H, xL = deep.xL, xR = deep.xR;
      var series = [{ pts: c.points, fill: CURVE_FILL, line: CURVE_LINE, say: c.say, name: c.name || '' }];
      if (c.second && c.second.points) series.push({ pts: c.second.points, fill: CURVE_FILL_2, line: CURVE_LINE_2, say: c.second.say, name: c.second.name || '' });
      var log = c.scale === 'log', N = 160, lo = Infinity, hi = -Infinity, samples = [];
      for (var i = 0; i <= N; i++) { var m = n.from + (n.to - n.from) * i / N; samples.push({ ma: m, year: storeYear(m) }); }
      series.forEach(function (S) { samples.forEach(function (sm) { var a = curveAt(S.pts, sm.year, 2), b = curveAt(S.pts, sm.year, 3); if (a != null) { lo = Math.min(lo, a); hi = Math.max(hi, b); } }); });
      if (!(hi > lo)) { lo = lo - 1; hi = hi + 1; }
      var tf = log ? function (v) { return Math.log10(Math.max(v, 1e-12)); } : function (v) { return v; };
      var tlo = tf(lo), thi = tf(hi);
      // the axis never zooms into a sliver: a band that is tight on this span stays a thin band, not a wedge
      // filling the box — at least 8 % of the larger value on a linear axis, a third of a decade on a log one
      var minRange = log ? 0.33 : Math.max(Math.abs(hi), Math.abs(lo)) * 0.08;
      if (thi - tlo < minRange) { var mid = (thi + tlo) / 2; tlo = mid - minRange / 2; thi = mid + minRange / 2; }
      var pad = (thi - tlo) * 0.06; tlo -= pad; thi += pad;
      var vy = function (v) { return y1 - (y1 - y0) * (tf(v) - tlo) / ((thi - tlo) || 1); };
      var grp = el('g', { 'class': 'curve' }, svg);
      el('rect', { x: xL, y: y0, width: xR - xL, height: CURVE_H, fill: 'rgba(42,36,28,0.035)' }, grp);
      el('line', { x1: xL, y1: y1, x2: xR, y2: y1, stroke: GREY, 'stroke-width': 0.75 }, grp);
      series.forEach(function (S) {
        var up = '', down = '', mid = '';
        samples.forEach(function (sm, i) {
          var x = deep.x(sm.ma).toFixed(1), h = curveAt(S.pts, sm.year, 3), l = curveAt(S.pts, sm.year, 2), v = curveAt(S.pts, sm.year, 1);
          if (v == null) return;
          up += (i ? 'L' : 'M') + x + ',' + vy(h).toFixed(1) + ' ';
          down = 'L' + x + ',' + vy(l).toFixed(1) + ' ' + down;
          mid += (mid ? 'L' : 'M') + x + ',' + vy(v).toFixed(1) + ' ';
        });
        if (!up) return;
        el('path', { d: up + down + 'Z', fill: S.fill, opacity: 0.32 }, grp);
        el('path', { d: mid, fill: 'none', stroke: S.line, 'stroke-width': 1.5 }, grp);
      });
      // the axis words: the unit at the left, how sure at the right, both small
      if (deep.small || deep.depth === 0) el('text', { x: xL, y: y0 - 6, 'font-size': 11, fill: INK_SOFT, 'class': 'halo' }, grp, (c.name || '') + (c.unit ? ' \u00b7 ' + c.unit : '') + (log ? ' \u00b7 log scale' : ''));
      else { el('text', { x: xL - 12, y: y0 + CURVE_H / 2, 'font-size': 13, fill: INK, 'text-anchor': 'end', 'class': 'halo' }, grp, c.name || ''); el('text', { x: xL - 12, y: y0 + CURVE_H / 2 + 14, 'font-size': 11, fill: '#9a958b', 'text-anchor': 'end', 'class': 'halo' }, grp, (c.unit || '') + (log ? ' \u00b7 log scale' : '')); }
      var hs = el('text', { x: xR, y: y0 - 6, 'font-size': 11, 'font-style': 'italic', fill: INK_SOFT, 'text-anchor': 'end', 'class': 'halo' }, grp);
      var words = (c.howSureShort || (c.howSure || '').split('.')[0]).split(' '); hs.textContent = words.join(' ');
      while (words.length > 2 && !fitText(hs, (xR - xL) * 0.55)) { words.pop(); hs.textContent = words.join(' ') + '\u2026'; }
      // the marker's value, each series: a dot on its line and the words above the band
      var mx = Math.max(xL, Math.min(xR, deep.x(ma))), yr = storeYear(ma), row = 0;
      series.forEach(function (S) {
        var v = curveAt(S.pts, yr, 1); if (v == null) return;
        el('circle', { cx: mx, cy: vy(v), r: 3.5, fill: S.line, stroke: PARCH, 'stroke-width': 1.5 }, grp);
        var tx = Math.max(xL + 90, Math.min(xR - 90, mx));
        el('text', { x: tx, y: y1 + 16 + row * 14, 'font-size': 12, 'font-style': 'italic', fill: S.line, 'text-anchor': 'middle', 'class': 'halo' }, grp, 'about ' + sayValue(S.say, v, c.unit).replace(/^about /, ''));
        row++;
      });
      return CURVE_H + 30 + row * 14;
    }
    function fitText(t, maxW) {
      try { if (t.getComputedTextLength() <= maxW) return true; } catch (e) { return true; }
      return false;
    }
    function settled() {
      var d = deepest();
      if (ma > d.from || ma < d.to) { ma = Math.max(d.to, Math.min(d.from, ma)); tellYear(); }
      draw();
      if (opts.onBar) opts.onBar(d.node, path());
    }
    /* the lines above the parent close by themselves when a line opens beneath (the amendment of 10 Oct) */
    function closeAbove(d) { for (var i = 0; i < d - 1; i++) closed[i] = true; }
    /* a tap on a period: if it is the one open beneath, its line and everything beneath are removed (undo;
       the marker stays); else the lines beneath are removed, the window settles on it, the line opens
       beneath (named after it, or a free span for a clipped segment), the marker goes to its beginning,
       and the page is told the period */
    function tapSeg(depth, sg) {
      var e = env[depth];
      if (e && e.child === sg.node && env.length > depth) { env = env.slice(0, depth); closed[depth] = false; settled(); return; }
      env = env.slice(0, depth).concat([{ a: sg.from, b: sg.to, child: sg.whole ? sg.node : null }]);
      closed[depth] = false; closed[depth + 1] = false; touched[depth] = true; closeAbove(depth);
      ma = sg.from; tellYear();
      draw();
      if (opts.onPeriod) opts.onPeriod(sg.whole ? sg.node : null, { from: sg.from, to: sg.to });
      if (opts.onBar) opts.onBar(deepest().node, path());
    }
    function tapMark(depth, mk, L) {
      if (closed[depth]) { closed[depth] = false; }
      setYear(mk.ma);
      if (opts.onMark) opts.onMark(mk, L.node);
    }
    var envDrag = null;
    function startEnvDrag(ev, depth, g) {
      var e = env[depth]; if (!e) return;
      ev.preventDefault();
      var px = pos(ev), fa = g.x(e.a), fb = g.x(e.b), kind;
      if (Math.abs(px - fa) < 10 && Math.abs(px - fa) <= Math.abs(px - fb)) kind = 'a';
      else if (Math.abs(px - fb) < 10) kind = 'b';
      else kind = 'm';
      envDrag = { id: ev.pointerId, depth: depth, kind: kind, x0: px, off: g.m(px) - e.a, moved: false, span: e.a - e.b };
      try { svg.setPointerCapture(ev.pointerId); } catch (err) {}
      host.classList.add('dragging');
    }
    function detent(g, m, px) {
      var best = null, stops = [g.from, g.to];
      g.segs.forEach(function (sg) { stops.push(sg.node.from, sg.node.to); });
      stops.forEach(function (v) { if (v <= g.from && v >= g.to) { var dpx = Math.abs(g.x(v) - px); if (dpx < DETENT_PX && (best === null || dpx < best.d)) best = { v: v, d: dpx }; } });
      return best ? best.v : m;
    }
    function moveEnv(ev) {
      var dd = envDrag, g = tierGeom[dd.depth], e = env[dd.depth]; if (!g || !e) return;
      var px = pos(ev);
      if (!dd.moved && Math.abs(px - dd.x0) < 3) return;
      if (!dd.moved) { dd.moved = true; env = env.slice(0, dd.depth + 1); closed[dd.depth] = false; closed[dd.depth + 1] = false; touched[dd.depth] = true; closeAbove(dd.depth); }
      var minSpan = (g.from - g.to) * MIN_SPAN_PX / ((g.xR - g.xL) || 1);
      var m = Math.max(g.to, Math.min(g.from, g.m(px)));
      if (dd.kind === 'a') e.a = Math.max(e.b + minSpan, detent(g, m, px));
      else if (dd.kind === 'b') e.b = Math.min(e.a - minSpan, detent(g, m, px));
      else {
        var a = Math.max(g.to + dd.span, Math.min(g.from, m - dd.off));
        var a2 = detent(g, a, g.x(a)), b2 = detent(g, a - dd.span, g.x(a - dd.span));
        if (a2 !== a) a = a2; else if (b2 !== a - dd.span) a = b2 + dd.span;
        e.a = a; e.b = a - dd.span;
      }
      e.child = null;
      g.segs.forEach(function (sg) { if (sg.whole && sg.node.from === e.a && sg.node.to === e.b) e.child = sg.node; });
      var d = deepest(); ma = Math.max(d.to, Math.min(d.from, ma));
      cancelAnimationFrame(raf); raf = requestAnimationFrame(draw);
    }
    function endEnv(ev) {
      var dd = envDrag; if (!dd || ev.pointerId !== dd.id) return;
      envDrag = null; host.classList.remove('dragging');
      var g = tierGeom[dd.depth];
      if (!dd.moved) {
        var px = pos(ev), hit = null;
        if (g) g.segs.forEach(function (sg) { if (px >= sg.x0 && px <= sg.x1) hit = sg; });
        if (hit) tapSeg(dd.depth, hit);
        return;
      }
      tellYear(); draw();
      var e = env[dd.depth];
      if (opts.onPeriod) opts.onPeriod(e.child || null, { from: e.a, to: e.b });
      if (opts.onBar) opts.onBar(deepest().node, path());
    }

    function pos(ev) { var r = svg.getBoundingClientRect(); return ev.clientX - r.left; }
    function startDrag(ev) {
      var deep = tierGeom[tierGeom.length - 1];
      drag = { id: ev.pointerId };
      ev.preventDefault();
      try { svg.setPointerCapture(ev.pointerId); } catch (e) {}
      host.classList.add('dragging');
      moveTo(pos(ev), deep);
    }
    function moveTo(px, deep) { setYear(deep.m(Math.max(deep.xL, Math.min(deep.xR, px)))); }
    svg.addEventListener('pointermove', function (ev) {
      if (drag && ev.pointerId === drag.id) moveTo(pos(ev), tierGeom[tierGeom.length - 1]);
      else if (envDrag && ev.pointerId === envDrag.id) moveEnv(ev);
    });
    function release(ev) { if (drag && ev.pointerId === drag.id) { drag = null; host.classList.remove('dragging'); } else endEnv(ev); }
    svg.addEventListener('pointerup', release); svg.addEventListener('pointercancel', release);

    var raf = 0;
    function tellYear() { if (opts.onYear) opts.onYear(ma, storeYear(ma)); }
    function setYear(m) {
      var d = deepest();
      ma = Math.max(d.to, Math.min(d.from, m));
      tellYear();
      cancelAnimationFrame(raf); raf = requestAnimationFrame(draw);
    }
    /* open(names): snap the window to each named period in turn, from the root down, every line open */
    function open(names) {
      env = []; closed = {}; touched = {}; var n = root;
      (names || []).forEach(function (nm, i) {
        var c = (n.chunks || []).filter(function (x) { return x.name === nm; })[0];
        if (c) { env.push({ a: c.from, b: c.to, child: c }); n = c; touched[i] = true; }
      });
      settled();
    }
    /* scene(names): the opening scene — the same path, every line closed, no cones */
    function scene(names) {
      open(names); touched = {};
      for (var i = 0; i < env.length; i++) closed[i] = true;
      draw();
    }
    function focus(a, b) {
      var d = env.length ? env.length - 1 : 0, g = lineOf(d);
      if (!env.length) env.push({ a: a, b: b, child: null }); else env[d] = { a: a, b: b, child: null };
      var e = env[d]; e.a = Math.min(g.from, Math.max(g.to, e.a)); e.b = Math.max(g.to, Math.min(g.from, e.b));
      (g.node.chunks || []).forEach(function (c) { if (c.from === e.a && c.to === e.b) e.child = c; });
      touched[d] = true; closed[d] = false; closed[d + 1] = false;
      settled();
    }

    var periodWords = null;
    function start(tree) {
      root = tree;
      ma = (opts.year != null) ? opts.year : root.from;
      draw(); tellYear();
      if (opts.onBar) opts.onBar(root, []);
      if (opts.scene) scene(opts.scene);
    }
    if (opts.events) {
      if (typeof opts.events === 'string') fetch(opts.events, { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) { store = d.events || d; if (root) draw(); }).catch(function (e) { console.error('deep-time.js: the events did not load', e); });
      else store = opts.events.events || opts.events;
    }
    if (opts.periods) {
      if (typeof opts.periods === 'string') fetch(opts.periods, { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) { periodWords = d.periods || d; if (root) draw(); }).catch(function (e) { console.error('deep-time.js: the period words did not load', e); });
      else periodWords = opts.periods.periods || opts.periods;
    }
    var src = opts.data || '../stories/deep-time.json';
    if (typeof src === 'string') {
      fetch(src, { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(start).catch(function (e) { console.error('deep-time.js: the tree did not load', e); });
    } else start(src);

    if (window.ResizeObserver) { ro = new ResizeObserver(function () { if (root) draw(); }); ro.observe(host); }

    return {
      year: function () { return ma; },
      setYear: setYear,
      setCurve: function (c) { curve = c || null; draw(); },
      curve: function () { return curve; },
      open: open,
      scene: scene,
      focus: focus,
      path: path,
      fmt: fmt,
      events: function () { return store; },
      periodWords: function () { return periodWords; },
      span: function () { var d = deepest(); return { from: d.from, to: d.to, name: d.node.name, node: d.node, snapped: !!d.snapped }; },
      destroy: function () { destroyed = true; if (ro) ro.disconnect(); cancelAnimationFrame(raf); host.innerHTML = ''; host.classList.remove('cw-deep'); }
    };
  }
  cwDeepTime.fmt = fmt;
  function escapeHTML(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* the batches write a species name in asterisks (*Archaeopteryx*); on the page that is italic, never a star */
  function prose(t) { return escapeHTML(t).replace(/\*([^*\n]+)\*/g, '<i>$1</i>'); }
  cwDeepTime.prose = prose;
  /* the More, as the Time Machine page draws it: the label, the date line stepped, the paragraphs
     (a {quote} as a blockquote), the references; the page gives the element the class tm-more */
  function withCommasStr(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  /* the date line of an after-the-ice record, as active/time-machine.html steps it: the count after
     the ice, the ordinary date, the years ago, each with its "about" */
  function timelineDateLines(dl) {
    var c = dl.count, o = dl.ordinary, g = dl.ago, L = [];
    L.push((c.about ? 'About ' : '') + withCommasStr(c.value) + ' years after the ice' + (g ? '' : ','));
    L.push('or ' + (o.about ? 'about ' : '') + o.text + (g ? '' : '.'));
    if (g) L.push('or ' + (g.about ? 'about ' : '') + withCommasStr(g.value) + ' years ago.');
    return L;
  }
  cwDeepTime.moreHTML = function (rec) {
    var dl = rec.more.dateLine, lines;
    if (dl.count && dl.ordinary) lines = timelineDateLines(dl);
    else { lines = [dl.ago]; if (dl.tail) lines.push(dl.tail); if (dl.sure) lines.push(dl.sure); }
    var h = '<h3>' + escapeHTML(rec.label) + '</h3><div class="stepped">' + lines.map(function (l) { return '<div>' + escapeHTML(l) + '</div>'; }).join('') + '</div>';
    h += rec.more.paragraphs.map(function (p) { return p && p.quote ? '<blockquote><p>' + prose(p.quote) + '</p></blockquote>' : '<p>' + prose(p) + '</p>'; }).join('');
    if (rec.knownFrom) h += '<p class="known"><i>Known from</i> ' + escapeHTML(rec.knownFrom) + '.' + (rec.placeNow ? ' <i>The evidence is at</i> ' + escapeHTML(rec.placeNow.name) + '.' : '') + '</p>';
    if (rec.references && rec.references.length) h += '<div class="refs">' + rec.references.map(function (r) { return '<div>' + prose(r) + '</div>'; }).join('') + '</div>';
    return h;
  };
  window.cwDeepTime = cwDeepTime;
})();
