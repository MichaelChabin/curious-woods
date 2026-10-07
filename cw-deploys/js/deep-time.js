/* deep-time.js — Curious Woods: the nested bar of deep time, as a shelf module.
   Plan: CWVault/claude/Plan-Deep-Time.md, Stage 2. Rulings: Rulings-Sept-2026.md, "Deep time" (6 Oct
   2026): six chunks cut where the evidence changes kind, every bar saying what it is known from;
   deep lines count "ago" only. The ideas: Ideas-Ledger.md, Other labs, 5–6 Oct (the nested bar, uneven
   nesting, the dot and tail, Hazen's colours, the descent). The chunk tree: stories/deep-time.json.

   cwDeepTime(host, opts)  → { year(), setYear(ma), open(names), path(), destroy() }

   `host` is an element the page has given a width; the bars draw inside it, one SVG, and the
   host grows in height as bars are pulled down. The top bar is the whole of Earth; tap a chunk and
   it comes down as a bar of its own, attached by two lines to the gap it left — the Time Machine's
   Focus window, repeated. A bar whose chunk has nothing underneath pulls down but not apart: tap
   its body and it twitches. The copper marker is the year; it lives on the deepest open bar, shows
   as a tick on every bar above, and is dragged or tapped into place. A mark is the oldest evidence
   of a thing; a faint tail stretches older for "probably began by here" (the dot and tail). Every
   bar carries one line saying what it is known from — the fog, in words.

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

   opts:
     events   the deep-time events, or the URL of their JSON; absent, the tree's sketches are drawn
     data     the tree, or the URL of its JSON (default '../stories/deep-time.json')
     year     the marker's opening age, in millions of years ago (default: the root's start)
     onYear   function (ma, storeYear) — every time the marker moves; storeYear is the store's
              astronomer's year (this year minus ma million), what map.setTime takes
     onBar    function (bar, path) — a bar was pulled down (or closed back to this one)
     onMark   function (mark, bar) — a mark was tapped
   Times are millions of years ago throughout ('from' the older end); the readout writes them as
   billions, millions or thousands of years ago, never BCE, never "after zero" (the ruling).

   Classic script, no dependencies. */
(function () {
  'use strict';

  var CSS = [
    '.cw-deep{position:relative;font-family:Georgia,"Times New Roman",serif;color:#2a241c;user-select:none;-webkit-user-select:none;}',
    '.cw-deep svg{display:block;width:100%;overflow:visible;touch-action:none;}',
    '.cw-deep text{font-family:Georgia,serif;}',
    '.cw-deep .chunk{cursor:pointer;}',
    '.cw-deep .chunk rect{transition:filter .15s;}',
    '.cw-deep .chunk:hover rect.face{filter:brightness(1.08);}',
    '.cw-deep .leaf-body{cursor:default;}',
    '.cw-deep .knob{cursor:grab;}',
    '.cw-deep.dragging,.cw-deep.dragging .knob{cursor:grabbing;}',
    '.cw-deep .mark{cursor:pointer;}',
    '.cw-deep .halo{paint-order:stroke;stroke:#f4f1e8;stroke-width:4px;stroke-linejoin:round;}',
    '.cw-deep .bar.twitch{animation:cw-deep-twitch .32s ease;}',
    '@keyframes cw-deep-twitch{0%{transform:translateY(0)}45%{transform:translateY(9px)}100%{transform:translateY(0)}}',
    '@media (prefers-reduced-motion:reduce){.cw-deep .bar.twitch{animation:none;}}'
  ].join('\n');

  var SVG = 'http://www.w3.org/2000/svg';
  var INK = '#2a241c', INK_SOFT = '#6b655a', GREY = '#9a958b', COPPER = '#b5652b', LINE = '#46597a', PARCH = '#f4f1e8', FOCUS_EDGE = '#8fb0d2', FOCUS = '#bcd3ea';
  var BAR_H = 26, TIER_H = 96, TOP = 70, PAD = 12, MIN_PX = 3, HIT_PX = 28, LABEL_ROWS = 2;
  var CURVE_H = 84, CURVE_GAP = 70;   // the band's height under the deepest bar, and the room above it for the bar's two label rows
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

  function cwDeepTime(host, opts) {
    opts = opts || {};
    if (!document.getElementById('cw-deep-css')) { var st = document.createElement('style'); st.id = 'cw-deep-css'; st.textContent = CSS; document.head.appendChild(st); }
    host.classList.add('cw-deep');
    var svg = el('svg', {}, host);
    var defs = el('defs', {}, svg);
    var grad = el('linearGradient', { id: 'cw-deep-tail', x1: 0, x2: 1, y1: 0, y2: 0 }, defs);
    el('stop', { offset: 0, 'stop-color': INK, 'stop-opacity': 0 }, grad);
    el('stop', { offset: 1, 'stop-color': INK, 'stop-opacity': 0.32 }, grad);

    var root = null, tiers = [], ma = 0, W = 0, drag = null, destroyed = false, ro = null;
    var tierGeom = [];   // per tier: { node, xL, xR, y, x(ma), chunks:[{node, x0, x1}] }

    function deepest() { return tiers.length ? tiers[tiers.length - 1] : root; }
    function path() { return tiers.map(function (t) { return t.name; }); }
    function storeYear(m) { return Math.round(THIS_YEAR - m * 1e6); }

    /* a bar's time scale: linear, or piecewise through its chunks' boxes so a stretched chunk
       keeps its marks inside it */
    function layout(node, depth) {
      var full = W - 2 * PAD, xL, xR;
      if (depth === 0) { xL = PAD; xR = W - PAD; } else { xL = PAD + full / 8; xR = W - PAD - full / 8; }
      var width = xR - xL, y = TOP + depth * TIER_H;
      var g = { node: node, xL: xL, xR: xR, y: y, chunks: [] };
      if (node.chunks && node.chunks.length) {
        var span = node.from - node.to, w = node.chunks.map(function (c) { return width * (c.from - c.to) / span; });
        var min = MIN_PX;   // so a chunk is at least visible; what it takes from the widest is nothing
        for (var i = 0; i < w.length; i++) if (w[i] < min) {
          var d = min - w[i]; w[i] = min;
          var j = 0; for (var k = 1; k < w.length; k++) if (w[k] > w[j]) j = k;
          if (j !== i) w[j] -= d;
        }
        var x = xL;
        node.chunks.forEach(function (c, i2) { g.chunks.push({ node: c, x0: x, x1: x + w[i2] }); x += w[i2]; });
        g.x = function (m) {
          for (var q = 0; q < g.chunks.length; q++) {
            var c = g.chunks[q], n = c.node;
            if (m <= n.from && m >= n.to) return c.x0 + (c.x1 - c.x0) * (n.from - m) / ((n.from - n.to) || 1);
          }
          return m > node.from ? xL : xR;
        };
        g.m = function (px) {
          for (var q = 0; q < g.chunks.length; q++) {
            var c = g.chunks[q], n = c.node;
            if (px >= c.x0 && px <= c.x1) return n.from - (n.from - n.to) * (px - c.x0) / ((c.x1 - c.x0) || 1);
          }
          return px < xL ? node.from : node.to;
        };
      } else {
        g.x = function (m) { return xL + width * (node.from - m) / ((node.from - node.to) || 1); };
        g.m = function (px) { return node.from - (node.from - node.to) * (px - xL) / (width || 1); };
      }
      return g;
    }

    function draw() {
      if (destroyed || !root) return;
      W = host.getBoundingClientRect().width || 600;
      while (svg.lastChild && svg.lastChild !== defs) svg.removeChild(svg.lastChild);
      tierGeom = [];
      var nodes = [root].concat(tiers);
      nodes.forEach(function (n, d) { tierGeom.push(layout(n, d)); });
      var deep = tierGeom[tierGeom.length - 1];

      // the readout, top left: the marker's year, bold, ago
      var rt = el('text', { x: PAD, y: 18, 'font-size': 13, fill: INK_SOFT, 'class': 'halo' }, svg);
      el('tspan', { 'font-weight': 'bold', 'font-size': 16, fill: INK }, rt, fmt(ma));
      if (deep.node.knownFrom) {   // under the readout, on its own line, cut to fit by words
        var kf = el('text', { x: PAD, y: 36, 'font-size': 12, 'font-style': 'italic', fill: INK_SOFT, 'class': 'halo' }, svg);
        var words = ('known from ' + deep.node.knownFrom).split(' ');
        kf.textContent = words.join(' ');
        while (words.length > 2 && !fitText(kf, W - 2 * PAD)) { words.pop(); kf.textContent = words.join(' ') + '\u2026'; }
      }

      tierGeom.forEach(function (g, d) {
        var n = g.node, grp = el('g', { 'class': 'bar', 'data-depth': d }, svg);
        // the connector from the opened chunk above to this bar: the Focus window's trapezoid
        if (d > 0) {
          var pg = tierGeom[d - 1], pc = null;
          pg.chunks.forEach(function (c) { if (c.node === n) pc = c; });
          if (pc) {
            var yTop = pg.y + BAR_H + 2;
            el('path', { d: 'M' + pc.x0 + ',' + yTop + ' L' + pc.x1 + ',' + yTop + ' L' + g.xR + ',' + g.y + ' L' + g.xL + ',' + g.y + ' Z', fill: FOCUS, opacity: 0.16 }, grp);
            el('line', { x1: pc.x0, y1: yTop, x2: g.xL, y2: g.y, stroke: FOCUS_EDGE }, grp);
            el('line', { x1: pc.x1, y1: yTop, x2: g.xR, y2: g.y, stroke: FOCUS_EDGE }, grp);
          }
        }
        // the bar's name and span, above it at the left
        var nt = el('text', { x: g.xL, y: g.y - 7, 'font-size': 12, fill: INK_SOFT, 'class': 'halo' }, grp);
        el('tspan', { fill: INK }, nt, n.name);
        el('tspan', {}, nt, ' · ' + spanText(n.from, n.to));
        // the bar itself
        if (g.chunks.length) {
          g.chunks.forEach(function (c, i) {
            var cn = c.node, open = (tiers[d] === cn), fill = cn.colour || '#cdbfa3', dark = luminance(fill) < 0.5;
            var cg = el('g', { 'class': 'chunk' }, grp);
            el('rect', { 'class': 'face', x: c.x0, y: g.y, width: Math.max(1, c.x1 - c.x0), height: BAR_H, fill: fill, stroke: open ? COPPER : (luminance(fill) > 0.8 ? '#c8b89a' : PARCH), 'stroke-width': open ? 2 : 1.5,
                         rx: i === 0 || i === g.chunks.length - 1 ? 3 : 0 }, cg);
            var t = el('text', { x: c.x0 + 5, y: g.y + BAR_H / 2 + 4, 'font-size': W < 520 ? 11 : 12, fill: dark ? '#f4f1e8' : INK }, cg);
            t.textContent = cn.name;
            if (!fitText(t, c.x1 - c.x0 - 10)) { t.textContent = cn.short || ''; if (!fitText(t, c.x1 - c.x0 - 10)) t.textContent = ''; }
            el('title', {}, cg, cn.name + ' · ' + spanText(cn.from, cn.to));
            cg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
            cg.addEventListener('click', function (ev) { ev.stopPropagation(); toggle(d, cn); });
          });
          // a chunk thinner than a finger gets a wider invisible hit area over its neighbours, the thinnest on top
          g.chunks.slice().sort(function (a, b) { return (b.x1 - b.x0) - (a.x1 - a.x0); }).forEach(function (c) {
            var wv = c.x1 - c.x0; if (wv >= HIT_PX) return;
            var cn = c.node, hx = (c.x0 + c.x1) / 2 - HIT_PX / 2;
            var hg = el('g', { 'class': 'chunk' }, grp);
            el('rect', { x: Math.max(g.xL, hx), y: g.y - 4, width: HIT_PX, height: BAR_H + 8, fill: 'transparent' }, hg);
            el('title', {}, hg, cn.name + ' · ' + spanText(cn.from, cn.to));
            hg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
            hg.addEventListener('click', function (ev) { ev.stopPropagation(); toggle(d, cn); });
          });
        } else {
          var body = el('rect', { 'class': 'leaf-body', x: g.xL, y: g.y, width: g.xR - g.xL, height: BAR_H, rx: 3, fill: n.colour || '#e6dcc8', stroke: luminance(n.colour) > 0.8 ? '#c8b89a' : PARCH, 'stroke-width': 1.5 }, grp);
          body.addEventListener('click', function () { twitch(grp); });
        }
        // the deepest bar's tap strip (jump the marker), under its marks so a dot is still a dot
        if (g === deep) {
          var strip = el('rect', { x: g.xL, y: g.y + BAR_H, width: g.xR - g.xL, height: 20, fill: 'transparent', 'class': 'knob' }, grp);
          strip.addEventListener('pointerdown', startDrag);
        }
        // the marks: tail, dot, label (two rows, dropped where they would collide)
        var rows = [[], []];
        marksFor(n).forEach(function (mk) {
          var mx = g.x(mk.ma);
          if (mk.tail && mk.tail > mk.ma) {
            var tx = g.x(Math.min(mk.tail, n.from));
            el('rect', { x: tx, y: g.y + BAR_H + 7, width: Math.max(2, mx - tx), height: 3, fill: 'url(#cw-deep-tail)' }, grp);
          }
          var mg = el('g', { 'class': 'mark' }, grp);
          el('circle', { cx: mx, cy: g.y + BAR_H + 8.5, r: 9, fill: 'transparent' }, mg);
          el('circle', { cx: mx, cy: g.y + BAR_H + 8.5, r: 3.6, fill: INK }, mg);
          var placed = false;
          for (var r = 0; r < LABEL_ROWS && !placed; r++) {
            var lw = mk.label.length * 5.6 + 6, lx0 = mx - lw / 2, lx1 = mx + lw / 2;
            var clash = rows[r].some(function (s) { return !(lx1 < s[0] || lx0 > s[1]); });
            if (!clash) { rows[r].push([lx0, lx1]); el('text', { x: mx, y: g.y + BAR_H + 24 + r * 13, 'font-size': 11, fill: INK_SOFT, 'text-anchor': 'middle', 'class': 'halo' }, mg, mk.label); placed = true; }
          }
          el('title', {}, mg, mk.label + ' · ' + fmt(mk.ma) + (mk.tail ? ' (probably began by ' + fmt(mk.tail).replace(' ago', '') + ')' : ''));
          mg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
          mg.addEventListener('click', function (ev) { ev.stopPropagation(); setYear(mk.ma); if (opts.onMark) opts.onMark(mk, n); });
        });
        // the marker: a copper tick on every bar above, the knob on the deepest
        if (ma <= n.from && ma >= n.to) {
          var hx = g.x(ma);
          if (g !== deep) el('line', { x1: hx, y1: g.y - 3, x2: hx, y2: g.y + BAR_H + 3, stroke: COPPER, 'stroke-width': 2, opacity: 0.85 }, grp);
        }
      });
      // the curve under the deepest bar: the band, the line, the second series, the words at the marker
      var curveH = 0;
      if (curve) curveH = drawCurve(deep);
      // the deepest bar's marker and hit area, last so they sit on top
      var hx2 = Math.max(deep.xL, Math.min(deep.xR, deep.x(ma)));
      var kg = el('g', { 'class': 'knob' }, svg);
      el('line', { x1: hx2, y1: deep.y - 6, x2: hx2, y2: deep.y + BAR_H + 6, stroke: COPPER, 'stroke-width': 2 }, kg);
      el('circle', { cx: hx2, cy: deep.y + BAR_H + 8.5, r: 14, fill: 'transparent' }, kg);
      el('circle', { cx: hx2, cy: deep.y + BAR_H + 8.5, r: 7, fill: COPPER, stroke: PARCH, 'stroke-width': 2 }, kg);
      kg.addEventListener('pointerdown', startDrag);
      var H = TOP + tierGeom.length * TIER_H - 20 + curveH;
      svg.setAttribute('height', H); svg.style.height = H + 'px';
    }
    var store = null;   // the deep-time events, once loaded
    function marksFor(n) {
      var list;
      if (store) {
        list = store.filter(function (e) { return e.ma <= n.from && e.ma >= n.to; }).map(function (e) {
          return { ma: e.ma, label: e.label, tail: e.tail ? e.tail.ma : null, text: e.summary, weight: e.weight || 1, rec: e };
        });
      } else list = (n.marks || []).slice();
      // heavier first, so a heavy event's label is placed before a light one's; then oldest first
      return list.sort(function (a, b) { return (b.weight || 1) - (a.weight || 1) || b.ma - a.ma; });
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
      var c = curve, n = deep.node, y0 = deep.y + BAR_H + CURVE_GAP, y1 = y0 + CURVE_H, xL = deep.xL, xR = deep.xR;
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
    function twitch(grp) { grp.classList.remove('twitch'); void grp.getBoundingClientRect(); grp.classList.add('twitch'); }

    function toggle(depth, chunk) {
      if (tiers[depth] === chunk) tiers = tiers.slice(0, depth);   // tapped again: close it
      else tiers = tiers.slice(0, depth).concat([chunk]);
      var d = deepest();
      if (ma > d.from || ma < d.to) ma = Math.max(d.to, Math.min(d.from, ma)), tellYear();
      draw();
      if (opts.onBar) opts.onBar(d, path());
    }

    // the marker: drag it, or tap the deepest bar to jump there
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
    svg.addEventListener('pointermove', function (ev) { if (drag && ev.pointerId === drag.id) moveTo(pos(ev), tierGeom[tierGeom.length - 1]); });
    function release(ev) { if (drag && ev.pointerId === drag.id) { drag = null; host.classList.remove('dragging'); } }
    svg.addEventListener('pointerup', release); svg.addEventListener('pointercancel', release);

    var raf = 0;
    function tellYear() { if (opts.onYear) opts.onYear(ma, storeYear(ma)); }
    function setYear(m) {
      var d = deepest();
      ma = Math.max(d.to, Math.min(d.from, m));
      tellYear();
      cancelAnimationFrame(raf); raf = requestAnimationFrame(draw);
    }
    function open(names) {
      tiers = []; var n = root;
      (names || []).forEach(function (nm) {
        var c = (n.chunks || []).filter(function (x) { return x.name === nm; })[0];
        if (c) { tiers.push(c); n = c; }
      });
      var d = deepest(); ma = Math.max(d.to, Math.min(d.from, ma)); draw();
      if (opts.onBar) opts.onBar(d, path());
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
      path: path,
      fmt: fmt,
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
  cwDeepTime.moreHTML = function (rec) {
    var dl = rec.more.dateLine, lines = [dl.ago];
    if (dl.tail) lines.push(dl.tail);
    if (dl.sure) lines.push(dl.sure);
    var h = '<h3>' + escapeHTML(rec.label) + '</h3><div class="stepped">' + lines.map(function (l) { return '<div>' + escapeHTML(l) + '</div>'; }).join('') + '</div>';
    h += rec.more.paragraphs.map(function (p) { return p && p.quote ? '<blockquote><p>' + prose(p.quote) + '</p></blockquote>' : '<p>' + prose(p) + '</p>'; }).join('');
    if (rec.knownFrom) h += '<p class="known"><i>Known from</i> ' + escapeHTML(rec.knownFrom) + '.' + (rec.placeNow ? ' <i>The evidence is at</i> ' + escapeHTML(rec.placeNow.name) + '.' : '') + '</p>';
    if (rec.references && rec.references.length) h += '<div class="refs">' + rec.references.map(function (r) { return '<div>' + prose(r) + '</div>'; }).join('') + '</div>';
    return h;
  };
  window.cwDeepTime = cwDeepTime;
})();
