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
   older for "probably began by here". Each line's left end reads 0 and the years ago, its right
   end the duration and the years ago (or now). Every line carries one line saying what it is known
   from — the fog, in words. The filled bars of 6 Oct are gone (Michael, 8–9 Oct).

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
    '.cw-deep .seg:hover rect.tint{opacity:.42;}'
  ].join('\n');

  var SVG = 'http://www.w3.org/2000/svg';
  var INK = '#2a241c', INK_SOFT = '#6b655a', GREY = '#9a958b', COPPER = '#b5652b', LINE = '#46597a', PARCH = '#f4f1e8', FOCUS_EDGE = '#8fb0d2', FOCUS = '#bcd3ea';
  var TIER_H = 118, TOP = 92, PAD = 12, HIT_PX = 28, LABEL_ROWS = 2, ENV_H = 14, DETENT_PX = 9, MIN_SPAN_PX = 6;
  var CURVE_H = 84, CURVE_GAP = 74;   // the band's height under the deepest line, and the room above it for the line's two label rows
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
    // the open envelopes: line 0 is the root; env[i] = { a, b, child } is the envelope on line i (a the
    // older end, b the younger, in ma; child the period it is snapped to, or null when free), and line
    // i + 1 is that envelope's span. The deepest line has no envelope.
    var env = [];
    var tierGeom = [];   // per line: { node, from, to, snapped, xL, xR, y, x(ma), m(px), segs: [{ node, from, to, x0, x1, whole }] }

    function lineOf(i) {
      if (i === 0) return { node: root, from: root.from, to: root.to, snapped: root, parent: null };
      var e = env[i - 1], up = lineOf(i - 1);
      return { node: e.child || up.node, from: e.a, to: e.b, snapped: e.child, parent: up.node };
    }
    function deepest() { return lineOf(env.length); }
    function path() { return env.map(function (e) { return e.child ? e.child.name : 'about ' + durText(e.a - e.b); }); }
    function storeYear(m) { return Math.round(THIS_YEAR - m * 1e6); }
    /* the segments of a line: the periods inside its node, clipped to the line's span (a free envelope
       shows parts of periods); a segment is whole when the line holds all of it */
    function segsOf(L) {
      return (L.node.chunks || []).filter(function (c) { return c.from > L.to && c.to < L.from; }).map(function (c) {
        var f = Math.min(c.from, L.from), t = Math.max(c.to, L.to);
        return { node: c, from: f, to: t, whole: f === c.from && t === c.to };
      });
    }
    /* a line's geometry: the top line full width, every line below three-quarters and centred; the
       scale is linear — widths are honest, a hairline is a hairline (6 Oct), and a thin segment gets a
       finger-sized hit area */
    function layout(L, depth) {
      var full = W - 2 * PAD, xL, xR;
      if (depth === 0) { xL = PAD; xR = W - PAD; } else { xL = PAD + full / 8; xR = W - PAD - full / 8; }
      var width = xR - xL, y = TOP + depth * TIER_H, span = (L.from - L.to) || 1;
      var g = { line: L, node: L.node, from: L.from, to: L.to, snapped: L.snapped, xL: xL, xR: xR, y: y, segs: [] };
      g.x = function (m) { return xL + width * (L.from - m) / span; };
      g.m = function (px) { return L.from - span * (px - xL) / width; };
      segsOf(L).forEach(function (sg) { sg.x0 = g.x(sg.from); sg.x1 = g.x(sg.to); g.segs.push(sg); });
      return g;
    }

    function draw() {
      if (destroyed || !root) return;
      W = host.getBoundingClientRect().width || 600;
      while (svg.lastChild && svg.lastChild !== defs) svg.removeChild(svg.lastChild);
      tierGeom = [];
      for (var i = 0; i <= env.length; i++) tierGeom.push(layout(lineOf(i), i));
      var deep = tierGeom[tierGeom.length - 1], small = W < 520;
      // the hand-over (lane C): when the deepest line is the one the page draws itself (After the ice,
      // the Time Machine's Main), it is laid out but not drawn — the funnel above ends where the page's
      // line will be, `gap` below this svg's bottom — and the page is told its ends, so Main can sit on them
      var handed = !!(opts.handoff && env.length && deep.node.line === opts.handoff.line);

      // the readout, top left: the marker's year, bold, ago; under it what this line is known from
      var rt = el('text', { x: PAD, y: 18, 'font-size': 13, fill: INK_SOFT, 'class': 'halo' }, svg);
      el('tspan', { 'font-weight': 'bold', 'font-size': 16, fill: INK }, rt, fmt(ma));
      if (deep.node.knownFrom) {
        var kf = el('text', { x: PAD, y: 36, 'font-size': 12, 'font-style': 'italic', fill: INK_SOFT, 'class': 'halo' }, svg);
        var words = ('known from ' + deep.node.knownFrom).split(' ');
        kf.textContent = words.join(' ');
        while (words.length > 2 && !fitText(kf, W - 2 * PAD)) { words.pop(); kf.textContent = words.join(' ') + '…'; }
      }

      tierGeom.forEach(function (g, d) {
        if (handed && g === deep) return;
        var L = g.line, grp = el('g', { 'class': 'bar', 'data-depth': d }, svg), e = env[d];
        // the funnel from this line's envelope down to the next line, and its label
        if (e) {
          var ng = tierGeom[d + 1], fa = g.x(e.a), fb = g.x(e.b), snapped = !!e.child, edge = snapped ? FOCUS_EDGE : '#c9c3b6';
          el('path', { d: 'M' + fa + ',' + (g.y + ENV_H / 2) + ' L' + fb + ',' + (g.y + ENV_H / 2) + ' L' + ng.xR + ',' + ng.y + ' L' + ng.xL + ',' + ng.y + ' Z', fill: snapped ? FOCUS : '#ffffff', opacity: snapped ? 0.16 : 0.4 }, grp);
          el('line', { x1: fa, y1: g.y + ENV_H / 2, x2: ng.xL, y2: ng.y, stroke: edge }, grp);
          el('line', { x1: fb, y1: g.y + ENV_H / 2, x2: ng.xR, y2: ng.y, stroke: edge }, grp);
          var k = 0.6, cx0 = (fa + fb) / 2, cx1 = (ng.xL + ng.xR) / 2;
          el('text', { x: cx0 + (cx1 - cx0) * k, y: g.y + TIER_H * k + 4, 'font-size': 12, 'font-style': snapped ? 'normal' : 'italic', fill: snapped ? LINE : INK_SOFT, 'text-anchor': 'middle', 'class': 'halo' }, grp,
             snapped ? e.child.name : 'about ' + durText(e.a - e.b));
        }
        // the line's name above at the left; its ends: 0 and the duration in bold, the years ago under them
        var nm = L.snapped ? L.node.name : 'part of ' + L.node.name;
        el('text', { x: g.xL, y: g.y - 36, 'font-size': 12, fill: INK, 'class': 'halo' }, grp, nm);
        [[g.xL, '0', fmt(L.from), 'start'], [g.xR, durText(L.from - L.to), L.to <= 0 ? 'now' : fmt(L.to), 'end']].forEach(function (end) {
          var a = el('text', { x: end[0], y: g.y - 21, 'font-size': 11, fill: INK_SOFT, 'text-anchor': end[3], 'class': 'halo' }, grp);
          el('tspan', { 'font-weight': 'bold', 'font-size': 13, fill: INK }, a, end[1]);
          el('text', { x: end[0], y: g.y - 9, 'font-size': 11, fill: INK_SOFT, 'text-anchor': end[3], 'class': 'halo' }, grp, end[2]);
        });
        // the line, and its periods as quiet tinted segments with their edges ticked and their names on them
        el('line', { x1: g.xL, y1: g.y, x2: g.xR, y2: g.y, stroke: LINE, 'stroke-width': 1.5 }, grp);
        g.segs.forEach(function (sg) {
          var cn = sg.node, open = !!(e && e.child === cn), sgp = el('g', { 'class': 'seg' }, grp);
          el('rect', { 'class': 'tint', x: sg.x0, y: g.y - ENV_H / 2, width: Math.max(1, sg.x1 - sg.x0), height: ENV_H, fill: cn.colour || '#cdbfa3', opacity: 0.26 }, sgp);
          [sg.x0, sg.x1].forEach(function (tx) { el('line', { x1: tx, y1: g.y - ENV_H / 2, x2: tx, y2: g.y + ENV_H / 2, stroke: '#9a958b', 'stroke-width': 1 }, sgp); });
          var t = el('text', { x: (sg.x0 + sg.x1) / 2, y: g.y + 4, 'font-size': small ? 10 : 11, fill: open ? LINE : INK_SOFT, 'text-anchor': 'middle', 'class': 'halo' }, sgp);
          t.textContent = cn.name;
          if (!fitText(t, sg.x1 - sg.x0 - 8)) { t.textContent = cn.short || ''; if (!fitText(t, sg.x1 - sg.x0 - 8)) t.textContent = ''; }
          el('title', {}, sgp, cn.name + ' · ' + spanText(cn.from, cn.to));
          el('rect', { x: sg.x0, y: g.y - ENV_H / 2 - 6, width: Math.max(1, sg.x1 - sg.x0), height: ENV_H + 6, fill: 'transparent' }, sgp);
          sgp.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
          sgp.addEventListener('click', function (ev) { ev.stopPropagation(); tapSeg(d, sg); });
        });
        // a segment thinner than a finger gets a wider invisible hit area over its neighbours, the thinnest on top
        g.segs.slice().sort(function (p, q) { return (q.x1 - q.x0) - (p.x1 - p.x0); }).forEach(function (sg) {
          var wv = sg.x1 - sg.x0; if (wv >= HIT_PX) return;
          var hx = (sg.x0 + sg.x1) / 2 - HIT_PX / 2, hg = el('g', { 'class': 'seg' }, grp);
          el('rect', { x: Math.max(g.xL, hx), y: g.y - ENV_H / 2 - 6, width: HIT_PX, height: ENV_H + 6, fill: 'transparent' }, hg);
          el('title', {}, hg, sg.node.name + ' · ' + spanText(sg.node.from, sg.node.to));
          hg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
          hg.addEventListener('click', function (ev) { ev.stopPropagation(); tapSeg(d, sg); });
        });
        // the envelope: blue when snapped to a period, white when free; its ends and body drag
        if (e) {
          var ea = g.x(e.a), eb = g.x(e.b), sn = !!e.child, eg = el('g', { 'class': 'env' }, grp);
          el('rect', { x: ea, y: g.y - ENV_H / 2, width: Math.max(3, eb - ea), height: ENV_H, rx: 3, fill: sn ? FOCUS : '#ffffff', 'fill-opacity': sn ? 0.55 : 0.62, stroke: sn ? FOCUS_EDGE : '#9a958b', 'stroke-width': sn ? 1 : 1.25 }, eg);
          el('rect', { x: ea - 10, y: g.y - ENV_H / 2 - 6, width: Math.max(20, eb - ea + 20), height: ENV_H + 12, rx: 4, fill: 'transparent' }, eg);
          eg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); startEnvDrag(ev, d, g); });
        }
        // the marker's tap strip under the deepest line (jump the marker), beneath its marks
        if (g === deep) {
          var strip = el('rect', { x: g.xL, y: g.y + ENV_H / 2, width: g.xR - g.xL, height: 20, fill: 'transparent', 'class': 'knob' }, grp);
          strip.addEventListener('pointerdown', startDrag);
        }
        // the marks: a short vertical bar under the line at the oldest evidence, the tail running older
        // from it; the label in two rows, dropped where it would collide
        // a crowded line thins: heavier first, a mark is drawn only where no mark already sits within a
        // few pixels; the rest are still there, and show on the line that has room for them (until the
        // landmarks of lane E say which events show at every level)
        var rows = [[], []], drawn = [];
        marksFor(g).forEach(function (mk) {
          var mx = g.x(mk.ma);
          if (drawn.some(function (dx) { return Math.abs(dx - mx) < 3; })) return;
          drawn.push(mx);
          if (mk.tail && mk.tail > mk.ma) {
            var tx = g.x(Math.min(mk.tail, L.from));
            el('rect', { x: tx, y: g.y + 12.5, width: Math.max(2, mx - tx), height: 2, fill: 'url(#cw-deep-tail)' }, grp);
          }
          var mg = el('g', { 'class': 'mark' }, grp);
          el('rect', { x: mx - 9, y: g.y + 5, width: 18, height: 17, fill: 'transparent' }, mg);
          el('rect', { x: mx - 1.25, y: g.y + 7, width: 2.5, height: 13, rx: 1, fill: INK }, mg);
          var placed = false;
          for (var r = 0; r < LABEL_ROWS && !placed; r++) {
            var lw = mk.label.length * 5.6 + 6, lx0 = mx - lw / 2, lx1 = mx + lw / 2;
            var clash = rows[r].some(function (sp) { return !(lx1 < sp[0] || lx0 > sp[1]); });
            if (!clash) { rows[r].push([lx0, lx1]); el('text', { x: mx, y: g.y + 32 + r * 13, 'font-size': 11, fill: INK_SOFT, 'text-anchor': 'middle', 'class': 'halo' }, mg, mk.label); placed = true; }
          }
          el('title', {}, mg, mk.label + ' · ' + fmt(mk.ma) + (mk.tail ? ' (probably began by ' + fmt(mk.tail).replace(' ago', '') + ')' : ''));
          mg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
          mg.addEventListener('click', function (ev) { ev.stopPropagation(); setYear(mk.ma); if (opts.onMark) opts.onMark(mk, L.node); });
        });
        // the marker: a copper tick on every line above the deepest
        if (g !== deep && ma <= L.from && ma >= L.to) {
          var hx = g.x(ma);
          el('line', { x1: hx, y1: g.y - 9, x2: hx, y2: g.y + 9, stroke: COPPER, 'stroke-width': 2, opacity: 0.85 }, grp);
        }
      });
      var curveH = 0, H;
      if (handed) {
        H = deep.y - (opts.handoff.gap || 18);
        if (opts.onHandoff) opts.onHandoff({ on: true, xL: deep.xL, xR: deep.xR, from: deep.from, to: deep.to, node: deep.node });
      } else {
        // the curve under the deepest line: the band, the line, the second series, the words at the marker
        if (curve) curveH = drawCurve(deep);
        // the deepest line's marker and hit area, last so they sit on top
        var hx2 = Math.max(deep.xL, Math.min(deep.xR, deep.x(ma)));
        var kg = el('g', { 'class': 'knob' }, svg);
        el('line', { x1: hx2, y1: deep.y - 11, x2: hx2, y2: deep.y + 14, stroke: COPPER, 'stroke-width': 2 }, kg);
        el('circle', { cx: hx2, cy: deep.y + 13.5, r: 14, fill: 'transparent' }, kg);
        el('circle', { cx: hx2, cy: deep.y + 13.5, r: 7, fill: COPPER, stroke: PARCH, 'stroke-width': 2 }, kg);
        kg.addEventListener('pointerdown', startDrag);
        H = TOP + tierGeom.length * TIER_H - 50 + curveH;
        if (opts.onHandoff) opts.onHandoff({ on: false });
      }
      svg.setAttribute('height', H); svg.style.height = H + 'px';
    }
    function marksFor(g) {
      var list;
      if (store) {
        list = store.filter(function (ev) { return ev.ma <= g.from && ev.ma >= g.to; }).map(function (ev) {
          return { ma: ev.ma, label: ev.label, tail: ev.tail ? ev.tail.ma : null, text: ev.summary, weight: ev.weight || 1, rec: ev };
        });
      } else list = [];
      // heavier first, so a heavy event's label is placed before a light one's; then oldest first
      return list.sort(function (p, q) { return (q.weight || 1) - (p.weight || 1) || q.ma - p.ma; });
    }
    var curve = null;
    function curveAt(pts, y, k) {   // the value (k = 1), low (2) or high (3) at a store year, by straight lines between points
      if (!pts || !pts.length) return null;
      if (y <= pts[0][0]) return pts[0][k];
      for (var i = 1; i < pts.length; i++) if (y <= pts[i][0]) { var a = pts[i - 1], b = pts[i], t = (y - a[0]) / ((b[0] - a[0]) || 1); return a[k] + (b[k] - a[k]) * t; }
      return pts[pts.length - 1][k];
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
      var c = curve, n = deep, y0 = deep.y + CURVE_GAP, y1 = y0 + CURVE_H, xL = deep.xL, xR = deep.xR;
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
      el('text', { x: xL, y: y0 - 6, 'font-size': 11, fill: INK_SOFT, 'class': 'halo' }, grp, (c.name || '') + (c.unit ? ' \u00b7 ' + c.unit : '') + (log ? ' \u00b7 log scale' : ''));
      var hs = el('text', { x: xR, y: y0 - 6, 'font-size': 11, 'font-style': 'italic', fill: INK_SOFT, 'text-anchor': 'end', 'class': 'halo' }, grp);
      var words = (c.howSureShort || (c.howSure || '').split('.')[0]).split(' '); hs.textContent = words.join(' ');
      while (words.length > 2 && !fitText(hs, (xR - xL) * 0.55)) { words.pop(); hs.textContent = words.join(' ') + '\u2026'; }
      // the marker's value, each series: a dot on its line and the words above the band
      var mx = Math.max(xL, Math.min(xR, deep.x(ma))), yr = storeYear(ma), row = 0;
      series.forEach(function (S) {
        var v = curveAt(S.pts, yr, 1); if (v == null) return;
        el('circle', { cx: mx, cy: vy(v), r: 3.5, fill: S.line, stroke: PARCH, 'stroke-width': 1.5 }, grp);
        var tx = Math.max(xL + 90, Math.min(xR - 90, mx));
        el('text', { x: tx, y: y1 + 16 + row * 14, 'font-size': 12, 'font-style': 'italic', fill: S.line, 'text-anchor': 'middle', 'class': 'halo' }, grp, sayValue(S.say, v, c.unit));
        row++;
      });
      return CURVE_GAP + CURVE_H + 8 + row * 14;
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
    /* a tap on a segment: the envelope settles on it and it opens as the line below; tapped again
       while open, it closes. A clipped segment (a free envelope above shows only part of it) opens as
       a free span, since the line cannot hold all of it. */
    function tapSeg(depth, sg) {
      var e = env[depth];
      if (e && e.child === sg.node) env = env.slice(0, depth);
      else env = env.slice(0, depth).concat([{ a: sg.from, b: sg.to, child: sg.whole ? sg.node : null }]);
      settled();
    }
    /* the envelope: drag an end to take in more or less, the body to move it; near a period's edge
       an end clicks into place (a detent), and the envelope is snapped when both ends sit on one
       period's edges. Dragging closes any line deeper than the one below. A press that never moves
       is a tap on the segment under it. */
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
      if (!dd.moved) { dd.moved = true; env = env.slice(0, dd.depth + 1); }
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
      if (!dd.moved) {   // a tap: the segment under the pointer
        var px = pos(ev), hit = null;
        if (g) g.segs.forEach(function (sg) { if (px >= sg.x0 && px <= sg.x1) hit = sg; });
        if (hit) tapSeg(dd.depth, hit);
        return;
      }
      tellYear(); draw();
      if (opts.onBar) opts.onBar(deepest().node, path());
    }

    // the marker: drag it, or tap the deepest line's strip to jump there
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
    /* open(names): snap the envelope to each named period in turn, from the root down */
    function open(names) {
      env = []; var n = root;
      (names || []).forEach(function (nm) {
        var c = (n.chunks || []).filter(function (x) { return x.name === nm; })[0];
        if (c) { env.push({ a: c.from, b: c.to, child: c }); n = c; }
      });
      settled();
    }
    /* focus(a, b): set the deepest envelope to a span (older end first, in ma); a line opens below if none is open */
    function focus(a, b) {
      var d = env.length ? env.length - 1 : 0, g = lineOf(d);
      if (!env.length) env.push({ a: a, b: b, child: null }); else env[d] = { a: a, b: b, child: null };
      var e = env[d]; e.a = Math.min(g.from, Math.max(g.to, e.a)); e.b = Math.max(g.to, Math.min(g.from, e.b));
      (g.node.chunks || []).forEach(function (c) { if (c.from === e.a && c.to === e.b) e.child = c; });
      settled();
    }

    function start(tree) {
      root = tree;
      ma = (opts.year != null) ? opts.year : root.from;
      draw(); tellYear();
      if (opts.onBar) opts.onBar(root, []);
    }
    if (opts.events) {
      if (typeof opts.events === 'string') fetch(opts.events, { cache: 'no-cache' }).then(function (r) { return r.json(); }).then(function (d) { store = d.events || d; if (root) draw(); }).catch(function (e) { console.error('deep-time.js: the events did not load', e); });
      else store = opts.events.events || opts.events;
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
      focus: focus,
      path: path,
      fmt: fmt,
      events: function () { return store; },     // the store's records, once loaded (null before); the page's passing line reads it
      span: function () { var d = deepest(); return { from: d.from, to: d.to, name: d.node.name }; },   // the deepest open line's span
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
