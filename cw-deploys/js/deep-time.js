/* deep-time.js — Curious Woods: the nested bar of deep time, as a shelf module.
   Plan: CWVault/claude/Plan-Deep-Time.md, Stage 2. Rulings: Rulings-Sept-2026.md, "Deep time" (6 Oct
   2026): six chunks cut where the evidence changes kind, every bar saying what it is known from;
   deep lines count "ago" only. The ideas: Ideas-Ledger.md, Other labs, 5–6 Oct (the nested bar, uneven
   nesting, the dot and tail, Hazen's colours, the descent). The chunk tree: stories/deep-time.json.

   cwDeepTime(host, opts)  → { year(), setYear(ma), open(names), focus(a, b), path(), span(), events(), bracket(),
                               setCurrent('a' | 'b'), openBelow(), scale(depth), addTool(tool), destroy() }

   The bracket (21 Oct 2026; Michael's ruling of 19 Oct, *Timeline graphics* 5, and the snapshot rule of that evening):
   on every line two copper markers at the ends of a stretch, joined by a bar, the dates outside the markers (inside
   near the line's ends), the span on the bar in a gap (above it when the markers are close). The marker she last
   touched is the current year — solid; the other hollow, a tap making it the year. Tapping the bar opens the stretch
   as a line beneath, a snapshot: dragging a marker afterwards moves the map and the span and not the line beneath,
   until she taps the bar again; a second tap while that line is the deepest closes it; a stretch with nothing in it
   (no event, period or curve point) opens nothing. Dragging the bar slides the bracket, span unchanged. A tap on a
   period snaps the line's bracket to it. Play (the page's) makes the left marker walk to the right one. The envelope
   and the knob are gone. The hand-over went the same day (step 14): After the ice is drawn here like every other
   line, with the bracket; a record's `precision` (decade, century, millennium) draws a soft stretch under its mark,
   the deepest open line carries the ladder's ticks, a curve's `say` may be a function, and opts.filter / setFilter
   let a page keep her line's "What I've seen".
   The tool layer (the audit's step 12): addTool({ draw(t) }) is called on every draw with t = { svg, layer, el, lines,
   deepest, handed, scale(depth) → { xL, xR, from, to, x(ma), m(px), y, stripY, top, h, node, open, segs }, year,
   setYear, fmt, fmtShort, fmtLong, fullWords, detent, drag(ev, { start, move, end }), holdToExpand, fitText, small };
   the bracket is the first tool and draws through the same door.

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

   12 Oct 2026 (Michael): events show only on the deepest line, so opening a period beneath hides the events of
   the lines above; every band is STRIP (12 px) high in its line's colour, its periods' bands over it; the title
   is one line in the margin, "Animals 720 Ma" (the age the line begins at, in Ga, Ma or ka; a free span its two
   ages), the Earth's the same, and the dates row above a line is gone; an event's line starts at the band's
   bottom; the knob sits above the band with its line down to the band's top and its age beside it; the readout
   at the top left is the deepest line's range, "Earth 4.6 Ga to today". The bug this fixed: with After the ice
   open from the opening scene, the page's onMark dropped every deep tap (`!handed`); now no line above the
   deepest draws events, and the deepest line that draws them is never the page's own.

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
     filter   function (record) → whether it shows (21 Oct 2026); setFilter(f) changes it
     time     the year's owner, CW.cwYear (js/cw-time.js; 19 Oct 2026): the marker sets it when she moves it (the
              source is this bar) and follows it when anything else does, clamped to the deepest line; a page
              with an owner reads the year from it rather than from onYear
     onBar    function (bar, path) — a bar was pulled down (or closed back to this one)
     onMark   function (mark, bar) — a mark was tapped
     handoff   { line, gap } — the deepest line whose node carries `line` is the page's own (the Time
               Machine's Main, lane C): laid out, not drawn, the funnel ending `gap` px below this svg;
               onHandoff({ on, xL, xR, from, to, node }) tells the page, every draw
     autoCollapse  true to fold the lines above the parent by themselves as she goes deeper (lane D)
   Times are millions of years ago throughout ('from' the older end); the readout writes them as
   billions, millions or thousands of years ago, never BCE, never "after zero" (the ruling).

   The colours and sizes come from js/cw-style.js and the year's helpers from js/cw-time.js (19 Oct 2026);
   both load before this file. Classic script. */
(function () {
  'use strict';

  // the colours and sizes are js/cw-style.js's, the one style file (19 Oct 2026); the names below are this file's
  var S = window.CW && window.CW.STYLE;
  if (!S) throw new Error('deep-time.js needs js/cw-style.js loaded before it');
  if (!(window.CW.curveAt && window.CW.THIS_YEAR)) throw new Error('deep-time.js needs js/cw-time.js loaded before it');
  var CSS = [
    '.cw-deep{position:relative;font-family:Georgia,"Times New Roman",serif;color:' + S.ink + ';user-select:none;-webkit-user-select:none;}',
    '.cw-deep svg{display:block;width:100%;overflow:visible;touch-action:none;}',
    '.cw-deep text{font-family:Georgia,serif;}',
    '.cw-deep .knob{cursor:grab;}',
    '.cw-deep.dragging,.cw-deep.dragging .knob{cursor:grabbing;}',
    '.cw-deep .mark{cursor:pointer;}',
    '.cw-deep .mark line,.cw-deep .mark text{pointer-events:none;}',   /* the drawn line and label never catch a tap; the tap areas (the line's and the label's) do */
    '.cw-deep .halo{paint-order:stroke;stroke:' + S.parchment + ';stroke-width:4px;stroke-linejoin:round;}',
    '.cw-deep .bracket .knob{cursor:grab;}',
    '.cw-deep .seg{cursor:pointer;}',
    '.cw-deep .seg:hover rect.tint{opacity:.42;}',
    '.cw-deep .word{cursor:pointer;}',
    '.cw-deep .word:hover text{fill:' + S.payneHover + ';}',
    /* a picture in a More (13 Oct 2026, Prompt-Build-Pictures-in-the-Mores): the window's width, a tall one capped and centred,
       never cropped; the caption in the More's ink at 14 px, the credit in the references' size and colour; a tap opens it larger */
    '.cw-pic{margin:0 0 1em;}',
    '.cw-pic img{display:block;width:100%;height:auto;cursor:zoom-in;}',
    '.cw-pic.tall img{height:340px;width:auto;max-width:100%;object-fit:contain;margin:0 auto;}',   /* every tall file is over 340 px high, so the box is known before the file arrives */
    '.cw-pic .cap{font-size:14px;line-height:1.4;color:' + S.ink + ';margin:6px 0 0;}',
    '.cw-pic .cred{font-size:12px;line-height:1.45;color:' + S.inkSoft + ';margin:2px 0 0;}',
    '.cw-pic-large figure img{width:auto;height:auto;max-width:min(700px,calc(100vw - 56px));max-height:calc(100vh - 230px);}'
  ].join('\n');

  var SVG = 'http://www.w3.org/2000/svg';
  var INK = S.ink, INK_SOFT = S.inkSoft, GREY = S.grey, COPPER = S.copper, LINE = S.line, PARCH = S.parchment, FOCUS_EDGE = S.focusEdge, FOCUS = S.focus, WORD = S.payne, BAND = S.band;
  var TOP = 48, PAD = 12, HIT_PX = 28, DETENT_PX = 9, MIN_SPAN_PX = 6;
  // a line's box (part 2 of the stack prompt): the dates row, the row of period names, the strip 6 px high, the event lines, the label rows, a gap
  // 12 Oct 2026 (Michael): the band twice as thick and every line coloured; no dates row; the title one line,
  // "Animals 720 Ma", in a wider margin; the knob above the band, with its age beside it (KNOB_H its room)
  var NAMES_H = 16, STRIP = 12, EV_LINE = 12, ROW_H = 13, TICK_H = 7, BOX_GAP = 14, TITLE_ABOVE = 18, MARGIN = 160, LABEL_ROWS_MAX = 4, KNOB_H = 22;
  var CONE = S.focus, CONE_EDGE = S.focusEdge;
  var CURVE_H = 84;   // the band's height under the deepest line
  var CURVE_FILL = S.curveFill, CURVE_LINE = S.curveLine, CURVE_FILL_2 = S.curveFill2, CURVE_LINE_2 = S.curveLine2;   // widths are honest (6 Oct, Michael): a hairline is the lesson; a thin chunk gets a finger-sized hit area
  var THIS_YEAR = window.CW.THIS_YEAR;

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
  /* the short age (Michael, 12 Oct 2026): 4.6 Ga, 720 Ma, 5.3 Ma, 130 ka, today — the titles, the knob and the readout.
     Ga for billions (Michael's ruling of 18 Oct 2026: the real forms people in the field use, never an invented one). */
  function fmtShort(ma) {
    if (ma <= 0) return 'today';
    var r = function (v) { return (v >= 10 ? Math.round(v) : Math.round(v * 10) / 10).toString(); };
    if (ma >= 1000) return r(ma / 1000) + ' Ga';
    if (ma >= 1) return r(ma) + ' Ma';
    return r(ma * 1000) + ' ka';
  }
  /* the same age in full words, for press-and-hold and Full words (18 Oct 2026): 4.6 billion years ago */
  function fmtLong(ma) {
    if (ma <= 0) return 'today';
    var r = function (v) { return (v >= 10 ? Math.round(v) : Math.round(v * 10) / 10).toString(); };
    if (ma >= 1000) return r(ma / 1000) + ' billion years ago';
    if (ma >= 1) return r(ma) + ' million years ago';
    return r(ma * 1000) + ' thousand years ago';
  }
  var fullWords = false;      // Full words, the column's word: every label with room shows its full words
  var introduced = false;     // the first abbreviation on a page appears once in full with the short form after it
  var heldJustNow = false;    // a press-and-hold that showed full words is not also a tap
  function age(ma) { return fullWords ? fmtLong(ma) : fmtShort(ma); }
  function rangeText(name, from, to) { return (name ? name + ' ' : '') + age(from) + ' to ' + age(to); }
  /* press and hold on a label shows its full words in place; release puts the short form back. `t` is the text
     node to swap (a tspan or a text), `elm` the element that takes the press. */
  function holdToExpand(elm, t, longText, shortText) {
    var timer = null, shown = false;
    function restore() { clearTimeout(timer); timer = null; if (shown) { t.textContent = shortText; shown = false; } }
    elm.addEventListener('pointerdown', function () {
      if (longText === shortText) return;
      clearTimeout(timer);
      timer = setTimeout(function () { t.textContent = longText; shown = true; heldJustNow = true; setTimeout(function () { heldJustNow = false; }, 400); }, 450);
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (k) { elm.addEventListener(k, restore); });
  }

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
    var time = opts.time || null, api = null, playTimer = null;   // the year's owner, when the page has one (js/cw-time.js, 19 Oct 2026)
    // the stack (Prompt-Build-Timeline-Stack.md, part 3): line 0 is the Earth; env[i] = { a, b, child } is the
    // window on line i (a the older end, b the younger, in ma; child the period it is snapped to, or null
    // when free), and line i + 1 is that window's span. A line is OPEN (its strip with event labels) or
    // CLOSED (its strip with short faint event lines and no labels): `closed[i]`. Lines beneath a tap are
    // REMOVED: env is cut. A cone shows at junction i once she has acted there: `touched[i]`.
    var env = [], closed = {}, touched = {};
    // the brackets (Michael's ruling of 19 Oct 2026, *Timeline graphics* 5; built 21 Oct, the audit's steps 12 and 13): on every
    // line two markers at the ends of a stretch, joined by a bar — brk[i] = { a, b }, a the older end. The marker she last
    // touched is the current year: curLine and cur ('a' or 'b'), and ma is its value. env[i], what line i + 1 shows, is a
    // snapshot taken when she taps the bar (ruled 19 Oct, evening): dragging a marker afterwards moves the map and the span,
    // not the line beneath. The envelope of 10 Oct and the knob of 12 Oct are gone; the bracket is the first tool of the tool
    // layer (addTool, scale), drawn through the same door any tool would use
    var brk = {}, curLine = 0, cur = 'b', tools = [];
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
    var filter = opts.filter || null;   // a page's say on which records show (her line's "What I've seen", 21 Oct 2026)
    function marksFor(g) {
      if (!store) return [];
      return store.filter(function (ev) { return ev.ma <= g.from && ev.ma >= g.to && (!filter || filter(ev)); }).map(function (ev) {
        return { ma: ev.ma, label: ev.label, tail: ev.tail ? ev.tail.ma : null, text: ev.summary, weight: ev.weight || 1, line: ev.line || null, precision: ev.precision || null, rec: ev };
      });
    }
    // an uncertain date — a decade, a century, a millennium — draws a soft stretch under its mark, as the page's own line did
    // (21 Oct 2026, with the hand-over gone); a tail is the older kind of uncertainty and draws as before
    var PREC = { decade: 10, century: 100, millennium: 1000 };
    function drawStretch(g, mk, grp, y) {
      var yrs = PREC[mk.precision]; if (!yrs) return;
      var half = yrs / 2 / 1e6, x0 = g.x(Math.min(g.from, mk.ma + half)), x1 = g.x(Math.max(g.to, mk.ma - half));
      if (x1 - x0 < 2) return;
      el('rect', { x: x0, y: y, width: x1 - x0, height: 3, rx: 1.5, fill: INK, opacity: 0.12 }, grp);
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
    /* 12 Oct 2026 (Michael): events show only on the deepest line — a period opened beneath hides the events of
       the lines above; every line, the Earth's too, is inset to one width with its title in the margin; the
       knob's room is above the deepest line's names; no dates row */
    function layout(L, depth, top, withEvents) {
      var full = W - 2 * PAD, small = W < 560, xL, xR;
      if (small) { xL = PAD + full / 8; xR = W - PAD - full / 8; } else { xL = PAD + MARGIN; xR = W - PAD; }
      var width = xR - xL, span = (L.from - L.to) || 1, open = !closed[depth];
      var g = { line: L, node: L.node, ids: L.ids, from: L.from, to: L.to, snapped: L.snapped, open: open, depth: depth, xL: xL, xR: xR, top: top, small: small, segs: [], withEvents: withEvents };
      g.x = function (m) { return xL + width * (L.from - m) / span; };
      g.m = function (px) { return L.from - span * (px - xL) / width; };
      segsOf(L).forEach(function (sg) { sg.x0 = g.x(sg.from); sg.x1 = g.x(sg.to); g.segs.push(sg); });
      var y = top + (small ? TITLE_ABOVE : 0) + KNOB_H + NAMES_H;   // the bracket's room on every line (21 Oct 2026)
      g.stripY = y;                       // the strip's top; the line's middle is stripY + STRIP / 2
      g.y = y + STRIP / 2;
      var pl = withEvents ? placeLabels(g, L, open) : { labels: [], ticks: [], rows: 0 };
      g.labels = pl.labels; g.ticks = pl.ticks; g.rows = pl.rows;
      g.h = (g.stripY - top) + STRIP + (withEvents ? (open ? EV_LINE + Math.max(1, pl.rows) * ROW_H + 6 : TICK_H + 8) : 6) + BOX_GAP;
      return g;
    }
    /* the title: the name and, beside it, the age the line begins at — "Animals 720 Ma"; a free span its two ages;
       the Earth's the same */
    function titleNum(L, depth, long) {
      var f = long ? fmtLong : fmtShort;
      if (depth === 0 || L.snapped) return f(L.from);
      return f(L.from) + ' to ' + f(L.to);
    }
    function titleOf(L, depth) {
      if (depth === 0) return { name: root.name, num: titleNum(L, depth, fullWords) };   // the tree says Earth since 12 Oct (Michael)
      if (L.snapped) return { name: L.node.name, num: titleNum(L, depth, fullWords) };
      return { name: null, num: titleNum(L, depth, fullWords) };
    }
    function word(x, y, text, anchor, parent, onTap, cls) {
      var g = el('g', { 'class': 'word' + (cls ? ' ' + cls : '') }, parent);
      var t = el('text', { x: x, y: y, 'font-size': 12, 'font-style': 'italic', fill: WORD, 'text-anchor': anchor, 'class': 'halo' }, g, text);
      var w = 0; try { w = t.getComputedTextLength(); } catch (e) { w = text.length * 6; }
      el('rect', { x: anchor === 'end' ? x - w - 8 : (anchor === 'middle' ? x - w / 2 - 8 : x - 8), y: y - 14, width: w + 16, height: 22, fill: 'transparent' }, g);
      g.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
      g.addEventListener('click', function (ev) { ev.stopPropagation(); onTap(); });
      return g;
    }
    function draw() {
      if (destroyed || !root) return;
      W = host.getBoundingClientRect().width || 600;
      while (svg.lastChild && svg.lastChild !== defs) svg.removeChild(svg.lastChild);
      tierGeom = [];
      var n = env.length + 1, top = TOP, deepL = lineOf(n - 1);
      var handed = !!(opts.handoff && env.length && deepL.node.line === opts.handoff.line);
      for (var i = 0; i < n; i++) { var g0 = layout(lineOf(i), i, top, i === n - 1 && !handed); tierGeom.push(g0); top += g0.h; }
      var deep = tierGeom[tierGeom.length - 1];

      // the readout, top left: the deepest line's name and range, "Earth 4.6 Ga to today" (Michael, 12 Oct); under it
      // what this line is known from
      var tt0 = titleOf(deepL, n - 1), readout;
      if (!introduced && !fullWords) {   // the page's first abbreviation, once in full with the short form after it (18 Oct 2026)
        readout = (tt0.name ? tt0.name + ' ' : '') + fmtLong(deepL.from) + ' (' + fmtShort(deepL.from) + ') to ' + fmtShort(deepL.to);
      } else readout = rangeText(tt0.name, deepL.from, deepL.to);
      var rd = el('text', { x: PAD, y: 18, 'font-size': 16, 'font-weight': 'bold', fill: INK, 'class': 'halo' }, svg, readout);
      if (!fitText(rd, W - 2 * PAD)) rd.textContent = rangeText(tt0.name, deepL.from, deepL.to);
      holdToExpand(rd, rd, (tt0.name ? tt0.name + ' ' : '') + fmtLong(deepL.from) + ' to ' + fmtLong(deepL.to), rd.textContent);
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
        // the title, one line in the margin, right-aligned (above the line at phone width): the name in ink, the age it
        // begins at in grey beside it — "Animals 720 Ma" (Michael, 12 Oct); the Earth's the same, "Earth 4.6 Ga"
        var ttShort = titleNum(L, d, false), ttLong = titleNum(L, d, true);
        if (g.small) {
          var ta = el('text', { x: g.xL, y: g.top + 12, 'font-size': 13, fill: INK, 'class': 'halo title' }, grp, tt.name ? tt.name + ' ' : '');
          var tas = el('tspan', { 'font-size': 11, fill: GREY }, ta, tt.num);
          if (fullWords && !fitText(ta, W - 2 * PAD)) tas.textContent = ttShort;   // no room for the full words: the short form stays
          holdToExpand(ta, tas, ttLong, tas.textContent);
          wireTitle(ta, d);
        } else {
          var tg = el('g', { 'class': 'title' }, grp), tx = g.xL - 12;
          var tn = el('text', { x: tx, y: g.y + 4, 'font-size': 13, fill: INK, 'text-anchor': 'end', 'class': 'halo' }, tg, tt.name ? tt.name + ' ' : '');
          var tns = el('tspan', { 'font-size': 11, fill: GREY }, tn, tt.num);
          if (fullWords && !fitText(tn, MARGIN - 16)) tns.textContent = ttShort;
          el('rect', { x: PAD, y: g.y - 12, width: MARGIN - 16, height: 24, fill: 'transparent' }, tg);
          holdToExpand(tg, tns, ttLong, tns.textContent);
          wireTitle(tg, d);
        }
        // the band: every line a band STRIP high in its own colour (Michael, 12 Oct: thick and coloured, Oceans too),
        // its periods' bands over it, each with its name above in italic; the plain stretch of a line whose periods
        // do not fill it (Mammoths) shows the line's stretch colour
        el('rect', { x: g.xL, y: g.stripY, width: g.xR - g.xL, height: STRIP, fill: L.node.stretchColour || L.node.colour || BAND, opacity: L.node.stretchColour ? 0.55 : 1 }, grp);
        g.segs.forEach(function (sg) {
          var cn = sg.node, sgp = el('g', { 'class': 'seg' }, grp);
          el('rect', { 'class': 'band', x: sg.x0, y: g.stripY, width: Math.max(1, sg.x1 - sg.x0), height: STRIP, fill: cn.colour || BAND }, sgp);
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
        // the tap strip under the band (every line, 21 Oct 2026), beneath the marks: a press below the band with no event
        // under it brings this line's nearer marker to it and drags it; a tap on an event is the event's
        if (!(g === deep && handed)) {
          var stripR = el('rect', { x: g.xL, y: g.stripY + STRIP, width: g.xR - g.xL, height: 14, fill: 'transparent', 'class': 'knob' }, grp);
          stripR.addEventListener('pointerdown', (function (dd) { return function (ev) { startStripDrag(ev, dd); }; })(d));
        }
        // the events, on the deepest line only (Michael, 12 Oct; the page's own line draws its own): a line 0.8 px
        // from the band's bottom down to its label; an unlabelled one a short line; on a closed line short, faint
        // lines and no labels
        var tailY = g.stripY + STRIP + 3;
        if (g.open) {
          g.labels.forEach(function (l) {
            var ly = g.stripY + STRIP + EV_LINE + l.row * ROW_H + 9;
            if (l.mk.tail && l.mk.tail > l.mk.ma) el('rect', { x: g.x(Math.min(l.mk.tail, L.from)), y: tailY, width: Math.max(2, l.mx - g.x(Math.min(l.mk.tail, L.from))), height: 2, fill: 'url(#cw-deep-tail)' }, grp);
            drawStretch(g, l.mk, grp, tailY);
            var mg = el('g', { 'class': 'mark' }, grp);
            el('line', { x1: l.mx, y1: g.stripY + STRIP, x2: l.mx, y2: ly - 10, stroke: INK, 'stroke-width': 0.8 }, mg);
            el('text', { x: l.mx, y: ly, 'font-size': 11, fill: INK_SOFT, 'text-anchor': 'middle', 'class': 'halo' }, mg, l.mk.label);
            el('rect', { x: l.mx - 11, y: g.stripY + STRIP + 1, width: 22, height: ly - g.stripY - STRIP + 3, fill: 'transparent' }, mg);   // the band and its name are the period's to tap; below the band is the event's
            var lw2 = l.mk.label.length * 5.6 + 8;   // the label itself is a tap too (13 Oct 2026, Michael: events were hard to hit with a mouse)
            el('rect', { x: l.mx - lw2 / 2, y: ly - 11, width: lw2, height: 15, fill: 'transparent' }, mg);
            el('title', {}, mg, l.mk.label + ' · ' + fmt(l.mk.ma) + (l.mk.tail ? ' (probably began by ' + fmt(l.mk.tail).replace(' ago', '') + ')' : ''));
            mg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
            mg.addEventListener('click', function (ev) { ev.stopPropagation(); tapMark(d, l.mk, L); });
          });
        }
        // the ladder's ticks on the deepest open line (the page's Detail had them, unlabelled: the ends say the years): a step
        // from the 1–5–10 ladder with at least forty-eight pixels between ticks
        if (g === deep && g.open && !handed) {
          var spanMa = g.from - g.to, width = g.xR - g.xL, step = null;
          for (var ex = -6; ex <= 4 && step === null; ex++) for (var mi = 0; mi < 3 && step === null; mi++) { var cand = [1, 2, 5][mi] * Math.pow(10, ex); if (width * cand / spanMa >= 48) step = cand; }
          if (step) for (var tv = Math.ceil(g.to / step) * step; tv <= g.from + 1e-9; tv += step) el('line', { x1: g.x(tv), y1: g.stripY + STRIP, x2: g.x(tv), y2: g.stripY + STRIP + 3, stroke: GREY, 'stroke-width': 1, opacity: 0.7 }, grp);
        }
        g.ticks.forEach(function (tk) {
          var mg = el('g', { 'class': 'mark' }, grp), len = g.open ? TICK_H + 2 : TICK_H;
          if (g.open) drawStretch(g, tk.mk, grp, tailY);
          el('line', { x1: tk.mx, y1: g.stripY + STRIP, x2: tk.mx, y2: g.stripY + STRIP + len, stroke: g.open ? INK : GREY, 'stroke-width': 0.8, opacity: g.open ? 0.9 : 0.6 }, mg);
          el('rect', { x: tk.mx - 9, y: g.stripY + STRIP + 1, width: 18, height: len + 8, fill: 'transparent' }, mg);
          el('title', {}, mg, tk.mk.label + ' · ' + fmt(tk.mk.ma));
          mg.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
          mg.addEventListener('click', function (ev) { ev.stopPropagation(); tapMark(d, tk.mk, L); });
        });
        // the current year as a copper tick on every line but the one whose marker it is
        if (d !== curLine && ma <= L.from && ma >= L.to) {
          var hx = g.x(ma);
          el('line', { x1: hx, y1: g.stripY - 5, x2: hx, y2: g.stripY + STRIP + 5, stroke: COPPER, 'stroke-width': 2, opacity: 0.85 }, grp);
        }
      });
      // the tools, the bracket first among them (21 Oct 2026): each draws into a layer of its own through the tool API
      var toolsG = el('g', { 'class': 'tools' }, svg);
      tools.forEach(function (t) { try { t.draw(toolApi(toolsG)); } catch (err) { console.error('deep-time.js: a tool failed to draw', err); } });
      var curveH = 0, H;
      if (handed) {
        H = deep.y - (opts.handoff.gap || 18);   // the page's own line lands on the band's middle
        if (opts.onHandoff) opts.onHandoff({ on: true, xL: deep.xL, xR: deep.xR, from: deep.from, to: deep.to, node: deep.node });
      } else {
        if (curve) curveH = drawCurve(deep);
        H = deep.top + deep.h + curveH;
        if (opts.onHandoff) opts.onHandoff({ on: false });
      }
      svg.setAttribute('height', H); svg.style.height = H + 'px';
    }
    function wireTitle(elm, d) {
      elm.classList.add('title'); elm.style.cursor = 'pointer';
      elm.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
      elm.addEventListener('click', function (ev) { ev.stopPropagation(); if (heldJustNow) return; closed[d] = !closed[d]; draw(); });
    }
    var curve = null;
    var curveAt = window.CW.curveAt;   // the value (k = 1), low (2) or high (3) at a store year: the one curve reader (js/cw-time.js)
    function sayValue(tmpl, v, unit) {
      if (typeof tmpl === 'function') return tmpl(v);   // a page's own wording (People, Sea level, 21 Oct 2026)
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
      else { el('text', { x: xL - 12, y: y0 + CURVE_H / 2, 'font-size': 13, fill: INK, 'text-anchor': 'end', 'class': 'halo' }, grp, c.name || ''); el('text', { x: xL - 12, y: y0 + CURVE_H / 2 + 14, 'font-size': 11, fill: GREY, 'text-anchor': 'end', 'class': 'halo' }, grp, (c.unit || '') + (log ? ' \u00b7 log scale' : '')); }
      var hs = el('text', { x: xR, y: y0 - 6, 'font-size': 11, 'font-style': 'italic', fill: INK_SOFT, 'text-anchor': 'end', 'class': 'halo' }, grp);
      var words = (c.howSureShort || (c.howSure || '').split('.')[0]).split(' '); hs.textContent = words.join(' ');
      while (words.length > 2 && !fitText(hs, (xR - xL) * 0.55)) { words.pop(); hs.textContent = words.join(' ') + '\u2026'; }
      // the marker's value, each series: the marker's line down through the plot, a dot on its line and the words below
      var mx = Math.max(xL, Math.min(xR, deep.x(ma))), yr = storeYear(ma), row = 0;
      el('line', { x1: mx, y1: y0, x2: mx, y2: y1, stroke: COPPER, 'stroke-width': 1.5, opacity: 0.9 }, grp);
      series.forEach(function (S) {
        var v = curveAt(S.pts, yr, 1); if (v == null) return;
        el('circle', { cx: mx, cy: vy(v), r: 3.5, fill: S.line, stroke: PARCH, 'stroke-width': 1.5 }, grp);
        var tx = Math.max(xL + 90, Math.min(xR - 90, mx));
        var said = typeof S.say === 'function' ? S.say(v) : 'about ' + sayValue(S.say, v, c.unit).replace(/^about /, '');   // a page's own function owns its words
        el('text', { x: tx, y: y1 + 16 + row * 14, 'font-size': 12, 'font-style': 'italic', fill: S.line, 'text-anchor': 'middle', 'class': 'halo' }, grp, said);
        row++;
      });
      return CURVE_H + 30 + row * 14;
    }
    function fitText(t, maxW) {
      try { if (t.getComputedTextLength() <= maxW) return true; } catch (e) { return true; }
      return false;
    }
    function isHanded() { return !!(opts.handoff && env.length && deepest().node.line === opts.handoff.line); }
    function bracketOf(d) {   // this line's bracket, made at the line's ends when there is none, and kept inside the line
      var L = lineOf(d); if (!brk[d]) brk[d] = { a: L.from, b: L.to };
      var k = brk[d]; k.a = Math.min(L.from, Math.max(L.to, k.a)); k.b = Math.max(L.to, Math.min(L.from, k.b)); if (k.a < k.b) k.a = k.b;
      return k;
    }
    // a marker set: it becomes the current year; the markers never cross, the other giving way
    function setMarker(d, which, m, quiet) {
      var L = lineOf(d), k = bracketOf(d);
      k[which] = Math.max(L.to, Math.min(L.from, m));
      if (k.a < k.b) { if (which === 'a') k.b = k.a; else k.a = k.b; }
      curLine = d; cur = which; ma = k[which];
      if (!quiet) tellYear();
    }
    function cutBelow(d) { Object.keys(brk).forEach(function (i) { if (+i > d) delete brk[i]; }); }
    function settled() {
      var d = deepest();
      if (ma > d.from || ma < d.to) { ma = Math.max(d.to, Math.min(d.from, ma)); tellYear(); }
      if (curLine > env.length) curLine = env.length;
      var k = bracketOf(curLine), L = lineOf(curLine);   // the current marker stands where the year is
      if (k[cur] !== ma) { cur = Math.abs(ma - k.a) <= Math.abs(ma - k.b) ? 'a' : 'b'; k[cur] = Math.max(L.to, Math.min(L.from, ma)); if (k.a < k.b) { if (cur === 'a') k.b = k.a; else k.a = k.b; } }
      draw();
      if (opts.onBar) opts.onBar(d.node, path());
    }
    /* the lines above the parent close by themselves when a line opens beneath (the amendment of 10 Oct) */
    function closeAbove(d) { for (var i = 0; i < d - 1; i++) closed[i] = true; }
    /* a tap on a period: if it is the one open beneath and its line is the deepest, its line and everything beneath are
       removed (undo; the marker stays); else the lines beneath are removed, this line's bracket snaps to the period, the
       line opens beneath (a snapshot of it), the current marker is the bracket's left one at the period's beginning, and
       the page is told the period */
    function tapSeg(depth, sg) {
      introduced = true;
      var e = env[depth];
      if (e && e.child === sg.node && env.length === depth + 1) { env = env.slice(0, depth); cutBelow(depth); closed[depth] = false; settled(); return; }
      env = env.slice(0, depth).concat([{ a: sg.from, b: sg.to, child: sg.whole ? sg.node : null }]); cutBelow(depth);
      brk[depth] = { a: sg.from, b: sg.to }; curLine = depth; cur = 'a'; ma = sg.from; tellYear();
      closed[depth] = false; closed[depth + 1] = false; touched[depth] = true; closeAbove(depth);
      draw();
      if (opts.onPeriod) opts.onPeriod(sg.whole ? sg.node : null, { from: sg.from, to: sg.to });
      if (opts.onBar) opts.onBar(deepest().node, path());
    }
    /* a tap on an event: this line's nearer marker comes to it and is the current year */
    function tapMark(depth, mk, L) {
      if (closed[depth]) { closed[depth] = false; }
      var k = bracketOf(depth), which = Math.abs(mk.ma - k.a) <= Math.abs(mk.ma - k.b) ? 'a' : 'b';
      setMarker(depth, which, mk.ma);
      cancelAnimationFrame(raf); raf = requestAnimationFrame(draw);
      if (opts.onMark) opts.onMark(mk, L.node);
    }
    /* is there anything in a stretch — an event, a period, a curve's point — for a line beneath to show? */
    function hasContent(a, b, g) {
      if (store && store.some(function (ev) { return ev.ma <= a && ev.ma >= b; })) return true;
      if (g && g.node.chunks && g.node.chunks.some(function (c) { return c.from > b && c.to < a; })) return true;
      if (curve && curve.points) { var ya = storeYear(a), yb = storeYear(b); if (curve.points.some(function (pt) { return pt[0] >= ya && pt[0] <= yb; })) return true; }
      return false;
    }
    /* a tap on the bar: the stretch opens beneath as a new line, a snapshot of the bracket now; tapped again while that line
       is the deepest, it closes; a stretch with nothing in it opens nothing (the nesting ends where the content ends) */
    function openBelow(d) {
      introduced = true;
      var g = tierGeom[d], k = bracketOf(d); if (!g) return;
      var e = env[d];
      if (e && e.a === k.a && e.b === k.b && env.length === d + 1) { env = env.slice(0, d); cutBelow(d); closed[d] = false; settled(); return; }
      if (!hasContent(k.a, k.b, g)) return;
      var child = null; g.segs.forEach(function (sg) { if (sg.whole && sg.node.from === k.a && sg.node.to === k.b) child = sg.node; });
      env = env.slice(0, d).concat([{ a: k.a, b: k.b, child: child }]); cutBelow(d);
      closed[d] = false; closed[d + 1] = false; touched[d] = true; closeAbove(d);
      draw();
      if (opts.onPeriod) opts.onPeriod(child, { from: k.a, to: k.b });
      if (opts.onBar) opts.onBar(deepest().node, path());
    }
    function detent(g, m, px) {
      var best = null, stops = [g.from, g.to];
      g.segs.forEach(function (sg) { stops.push(sg.node.from, sg.node.to); });
      stops.forEach(function (v) { if (v <= g.from && v >= g.to) { var dpx = Math.abs(g.x(v) - px); if (dpx < DETENT_PX && (best === null || dpx < best.d)) best = { v: v, d: dpx }; } });
      return best ? best.v : m;
    }

    // ---- the drags: one plumbing for every tool (21 Oct 2026) ----
    function pos(ev) { var r = svg.getBoundingClientRect(); return ev.clientX - r.left; }
    var drag = null;   // { id, x0, moved, move(px, ev), end(px, moved, ev) }
    function beginDrag(ev, h) {
      ev.preventDefault(); ev.stopPropagation();
      drag = { id: ev.pointerId, x0: pos(ev), moved: false, move: h.move, end: h.end };
      try { svg.setPointerCapture(ev.pointerId); } catch (e) {}
      host.classList.add('dragging');
      if (h.start) h.start(pos(ev));
    }
    svg.addEventListener('pointermove', function (ev) {
      if (!drag || ev.pointerId !== drag.id) return;
      var px = pos(ev);
      if (!drag.moved && Math.abs(px - drag.x0) < 3) return;
      drag.moved = true;
      if (drag.move) drag.move(px, ev);
    });
    function release(ev) {
      if (!drag || ev.pointerId !== drag.id) return;
      var dd = drag; drag = null; host.classList.remove('dragging');
      if (dd.end) dd.end(pos(ev), dd.moved, ev);
    }
    svg.addEventListener('pointerup', release); svg.addEventListener('pointercancel', release);
    function redrawSoon() { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }

    // ---- the bracket, the first tool ----
    function startMarkerDrag(ev, d, which) {
      introduced = true;
      var g = tierGeom[d]; if (!g) return;
      beginDrag(ev, {
        move: function (px) { var m = g.m(Math.max(g.xL, Math.min(g.xR, px))); setMarker(d, which, detent(g, m, px)); redrawSoon(); },
        end: function (px, moved) { if (!moved) setMarker(d, which, bracketOf(d)[which]); draw(); }   // a tap on the hollow marker makes it the year
      });
    }
    function startBarDrag(ev, d) {
      introduced = true;
      var g = tierGeom[d], k = bracketOf(d); if (!g) return;
      var span = k.a - k.b, off = 0;
      beginDrag(ev, {
        start: function (px) { off = g.m(px) - k.a; },
        move: function (px) {
          var a = Math.max(g.to + span, Math.min(g.from, g.m(px) - off));
          var a2 = detent(g, a, g.x(a)), b2 = detent(g, a - span, g.x(a - span));
          if (a2 !== a) a = a2; else if (b2 !== a - span) a = b2 + span;
          k.a = a; k.b = a - span;
          if (curLine === d) { ma = k[cur]; tellYear(); }
          redrawSoon();
        },
        end: function (px, moved) { if (!moved) openBelow(d); else draw(); }
      });
    }
    function startStripDrag(ev, d) {
      introduced = true;
      var g = tierGeom[d], k = bracketOf(d); if (!g) return;
      var m0 = g.m(Math.max(g.xL, Math.min(g.xR, pos(ev)))), which = Math.abs(m0 - k.a) <= Math.abs(m0 - k.b) ? 'a' : 'b';
      setMarker(d, which, m0);
      beginDrag(ev, {
        move: function (px) { setMarker(d, which, detent(g, g.m(Math.max(g.xL, Math.min(g.xR, px))), px)); redrawSoon(); },
        end: function () { draw(); }
      });
      draw();
    }
    function drawBracket(t, d) {
      var g = t.scale(d), k = bracketOf(d), grp = el('g', { 'class': 'bracket', 'data-depth': d }, t.layer);
      var xa = g.x(k.a), xb = g.x(k.b), ky = g.stripY - NAMES_H - 11, mid = (xa + xb) / 2, wbar = Math.abs(xb - xa);
      // the span, centred on the bar in a gap; above the bar when the markers come too close
      var spanTxt = durText(k.a - k.b), st = el('text', { x: mid, y: ky + 4, 'font-size': 11, 'font-style': 'italic', fill: INK_SOFT, 'text-anchor': 'middle', 'class': 'halo' }, grp, spanTxt);
      var tw = 0; try { tw = st.getComputedTextLength(); } catch (e) { tw = spanTxt.length * 5.5; }
      var bar = { stroke: COPPER, 'stroke-width': 1.5, opacity: 0.9 };
      if (wbar > tw + 40) {
        el('line', Object.assign({ x1: xa, y1: ky, x2: mid - tw / 2 - 6, y2: ky }, bar), grp);
        el('line', Object.assign({ x1: mid + tw / 2 + 6, y1: ky, x2: xb, y2: ky }, bar), grp);
      } else {
        if (wbar > 0) el('line', Object.assign({ x1: xa, y1: ky, x2: xb, y2: ky }, bar), grp);
        st.setAttribute('y', ky - 10);
      }
      // the bar's handle: a tap opens the stretch beneath, a drag slides the bracket
      var hit = el('rect', { x: Math.min(xa, xb) + 8, y: ky - 9, width: Math.max(0, wbar - 16), height: 18, fill: 'transparent', 'class': 'knob' }, grp);
      hit.addEventListener('pointerdown', function (ev) { startBarDrag(ev, d); });
      // the dates, outside the markers; a date that would fall off the line's end flips inside
      [['a', xa, -1], ['b', xb, 1]].forEach(function (m) {
        var which = m[0], x = m[1], side = m[2], txt = age(k[which]);
        var dt = el('text', { x: x + side * 11, y: ky + 4, 'font-size': 12, fill: COPPER, 'text-anchor': side < 0 ? 'end' : 'start', 'class': 'halo' }, grp, txt);
        var dw = 0; try { dw = dt.getComputedTextLength(); } catch (e) { dw = txt.length * 6; }
        if (side < 0 ? x - 11 - dw < g.xL : x + 11 + dw > g.xR) { dt.setAttribute('x', x - side * 11); dt.setAttribute('text-anchor', side < 0 ? 'start' : 'end'); dt.setAttribute('y', ky - 10); }
        if (fullWords && !fitText(dt, (g.xR - g.xL) * 0.45)) dt.textContent = fmtShort(k[which]);
        holdToExpand(dt, dt, fmtLong(k[which]), dt.textContent);
      });
      // the markers: the current year solid, the other hollow; each a line down to the band's top
      [['a', xa], ['b', xb]].forEach(function (m) {
        var which = m[0], x = m[1], isCur = d === curLine && cur === which, mg = el('g', { 'class': 'knob marker' + (isCur ? ' current' : '') }, grp);
        el('line', { x1: x, y1: ky, x2: x, y2: g.stripY, stroke: COPPER, 'stroke-width': 1.5, opacity: 0.9 }, mg);
        el('circle', { cx: x, cy: ky, r: 14, fill: 'transparent' }, mg);
        el('circle', { cx: x, cy: ky, r: 6.5, fill: isCur ? COPPER : PARCH, stroke: isCur ? PARCH : COPPER, 'stroke-width': 2 }, mg);
        mg.addEventListener('pointerdown', function (ev) { startMarkerDrag(ev, d, which); });
      });
    }
    var bracketTool = { name: 'bracket', draw: function (t) { for (var d = 0; d < t.lines; d++) { if (t.handed && d === t.deepest) continue; drawBracket(t, d); } } };
    tools.push(bracketTool);
    // the tool API (the audit's step 12): what a tool is given to draw with
    function scaleOf(d) { var g = tierGeom[d]; if (!g) return null; return { depth: d, xL: g.xL, xR: g.xR, from: g.from, to: g.to, x: g.x, m: g.m, y: g.y, stripY: g.stripY, top: g.top, h: g.h, node: g.node, open: g.open, segs: g.segs }; }
    function toolApi(layer) {
      return { svg: svg, layer: layer, el: el, lines: tierGeom.length, deepest: tierGeom.length - 1, handed: isHanded(), scale: scaleOf, year: ma,
               setYear: setYear, fmt: age, fmtShort: fmtShort, fmtLong: fmtLong, fullWords: fullWords, detent: detent, drag: beginDrag, holdToExpand: holdToExpand, fitText: fitText, small: W < 560 };
    }

    var raf = 0;
    function tellYear() { if (time) time.setMa(ma, api); if (opts.onYear) opts.onYear(ma, storeYear(ma)); }
    function setYear(m) {   // the year from outside (a mark on the map, a page): on the deepest line, its nearer marker comes to it
      if (isHanded()) { var d = deepest(); ma = Math.max(d.to, Math.min(d.from, m)); tellYear(); }
      else { var dd = env.length, k = bracketOf(dd); setMarker(dd, Math.abs(m - k.a) <= Math.abs(m - k.b) ? 'a' : 'b', m); }
      cancelAnimationFrame(raf); raf = requestAnimationFrame(draw);
    }
    /* open(names): snap the window to each named period in turn, from the root down, every line open */
    function open(names) {
      env = []; closed = {}; touched = {}; var n = root;
      (names || []).forEach(function (nm, i) {
        var c = (n.chunks || []).filter(function (x) { return x.name === nm; })[0];
        if (c) { env.push({ a: c.from, b: c.to, child: c }); n = c; touched[i] = true; }
      });
      brk = {}; env.forEach(function (e, i) { brk[i] = { a: e.a, b: e.b }; }); curLine = env.length;
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
      brk[d] = { a: e.a, b: e.b }; cutBelow(d); curLine = d + 1;
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

    // the year set elsewhere (the page's own line, play): the marker follows, clamped to the deepest line. While play
    // runs on the page's own line (the hand-over) the copper ticks follow a few times a second, not every frame
    // (Safari stepped when every frame rebuilt the lines, 13 Oct 2026)
    if (time) time.listen(function (y, src) {
      if (src === api || !root) return;
      var d = deepest(), m = Math.max(d.to, Math.min(d.from, window.CW.yearToMa(y)));
      if (m === ma) return;
      var handedNow = isHanded();
      if (handedNow) ma = m; else setMarker(curLine, cur, m, true);   // the current marker walks (play) or follows
      if (src === 'play' && handedNow) {
        if (playTimer) return;
        playTimer = setTimeout(function () { playTimer = null; if (!destroyed) draw(); }, 120);
      }
      cancelAnimationFrame(raf); raf = requestAnimationFrame(draw);
    });

    api = {
      year: function () { return ma; },
      setYear: setYear,
      // the bracket (21 Oct 2026): the current marker's line and ends, which is current; setCurrent makes the other the year;
      // openBelow is the bar's tap; scale and addTool are the tool layer (the audit's step 12)
      bracket: function () { var k = bracketOf(curLine); return { line: curLine, a: k.a, b: k.b, cur: cur }; },
      setCurrent: function (which) { if (which !== 'a' && which !== 'b') return; var k = bracketOf(curLine); cur = which; ma = k[cur]; tellYear(); draw(); },
      openBelow: function () { openBelow(curLine); },
      scale: scaleOf,
      addTool: function (t) { tools.push(t); if (root) draw(); return function () { var i = tools.indexOf(t); if (i >= 0) tools.splice(i, 1); if (root) draw(); }; },
      setCurve: function (c) { curve = c || null; draw(); },
      fullWords: function (on) { if (on !== undefined) { fullWords = !!on; introduced = true; draw(); } return fullWords; },   // the column's word (18 Oct 2026)
      setFilter: function (f) { filter = f || null; if (root) draw(); },   // which records show (21 Oct 2026)
      curve: function () { return curve; },
      open: open,
      scene: scene,
      focus: focus,
      path: path,
      fmt: fmt,
      events: function () { return store; },
      periodWords: function () { return periodWords; },
      span: function () { var d = deepest(); return { from: d.from, to: d.to, name: d.node.name, node: d.node, snapped: !!d.snapped }; },
      destroy: function () { destroyed = true; if (ro) ro.disconnect(); cancelAnimationFrame(raf); clearTimeout(playTimer); host.innerHTML = ''; host.classList.remove('cw-deep'); }
    };
    return api;
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
  /* Pictures in the Mores (13 Oct 2026, CWVault/claude/Prompt-Build-Pictures-in-the-Mores.md). The manifest,
     art/stories/deep/manifest.json (written by tools/pictures-manifest.py), is keyed period-<id> and event-<id>; each
     key a list in the order the More shows them. cwDeepTime.pictures(url) fetches it once; moreBody(key, paragraphs)
     returns the paragraphs with the pictures placed — the first directly below the span line, before the first
     paragraph; a later one directly after the first paragraph containing its `near` word (after the last paragraph,
     and the console says so, if the word is not found); a held picture is not shown. If the manifest has not loaded
     or the key is missing, the paragraphs are drawn as they were, and the console says why once. wirePictures(box)
     makes a tap on a picture open it larger in its own cwWindow, with the sampler's zoom (map.js, opts.zoom). */
  var pictures = null, picturesBase = '', picturesWhy = null, picturesSaid = {};
  cwDeepTime.pictures = function (url) {
    picturesBase = url.replace(/[^\/]*$/, '');
    return fetch(url, { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status + ' ' + r.statusText); return r.json(); })
      .then(function (m) { pictures = m.pictures || {}; return pictures; })
      .catch(function (e) { picturesWhy = 'the pictures manifest did not load (' + (e && e.message || e) + ')'; console.warn('deep-time.js: ' + picturesWhy); });
  };
  function stripTags(t) { return String(t == null ? '' : t).replace(/<[^>]*>/g, ''); }
  cwDeepTime.pictureHTML = function (p) {
    var tall = p.width && p.height && p.height > p.width;
    var h = '<figure class="cw-pic' + (tall ? ' tall' : '') + '">';
    h += '<img src="' + escapeHTML(picturesBase + p.file) + '"' + (p.width ? ' width="' + p.width + '" height="' + p.height + '"' : '') + ' alt="' + escapeHTML(stripTags(p.caption)) + '" data-caption="' + escapeHTML(p.caption || '') + '" data-credit="' + escapeHTML(p.credit || '') + '">';
    h += '<figcaption><div class="cap">' + (p.caption || '') + '</div><div class="cred">' + (p.credit || '') + '</div></figcaption></figure>';
    return h;
  };
  function paragraphHTML(p) { return p && p.quote ? '<blockquote><p>' + prose(p.quote) + '</p></blockquote>' : '<p>' + prose(p) + '</p>'; }
  function sayOnce(key, why) { if (!picturesSaid[key]) { picturesSaid[key] = true; console.info('deep-time.js: no pictures for ' + key + ': ' + why); } }
  cwDeepTime.moreBody = function (key, paragraphs) {
    var list = pictures && key ? pictures[key] : null;
    if (!pictures) { if (key) sayOnce(key, picturesWhy || 'the manifest has not loaded yet'); list = null; }
    else if (key && !list) sayOnce(key, 'no such key in the manifest');
    list = (list || []).filter(function (p) { return !p.held; });
    var out = [], after = [];
    paragraphs.forEach(function () { after.push(''); });
    list.forEach(function (p, i) {
      if (i === 0) { out.push(cwDeepTime.pictureHTML(p)); return; }
      var at = -1;
      if (p.near) paragraphs.some(function (pg, j) { var t = pg && pg.quote ? pg.quote : String(pg || ''); if (t.indexOf(p.near) >= 0) { at = j; return true; } return false; });
      if (at < 0) { console.warn('deep-time.js: ' + key + ': the word "' + (p.near || '') + '" for ' + p.file + ' is not in its More; the picture goes after the last paragraph'); at = paragraphs.length - 1; }
      after[at] += cwDeepTime.pictureHTML(p);
    });
    paragraphs.forEach(function (pg, j) { out.push(paragraphHTML(pg) + after[j]); });
    return out.join('');
  };
  cwDeepTime.wirePictures = function (box) {
    Array.prototype.forEach.call(box.querySelectorAll('.cw-pic img'), function (img) {
      img.addEventListener('error', function () { var f = img.parentNode; if (f) f.removeChild(img); });   // a file that fails leaves no frame, only its words
      img.addEventListener('click', function (ev) {
        ev.stopPropagation();
        if (!window.cwWindow) return;
        var big = document.createElement('div'); big.className = 'cw-pic-large';
        var fig = document.createElement('figure'), im = document.createElement('img'), cap = document.createElement('figcaption');
        im.src = img.src; im.alt = img.alt; if (img.width) { im.width = img.getAttribute('width'); im.height = img.getAttribute('height'); }
        cap.innerHTML = img.getAttribute('data-caption') + (img.getAttribute('data-credit') ? '<br>' + img.getAttribute('data-credit') : '');
        fig.appendChild(im); fig.appendChild(cap); big.appendChild(fig);
        window.cwWindow(big, { zoom: im });
      });
    });
  };
  cwDeepTime.moreHTML = function (rec) {
    var dl = rec.more.dateLine, lines;
    if (dl.count && dl.ordinary) lines = timelineDateLines(dl);
    else { lines = [dl.ago]; if (dl.tail) lines.push(dl.tail); if (dl.sure) lines.push(dl.sure); }
    var h = '<h3>' + escapeHTML(rec.label) + '</h3><div class="stepped">' + lines.map(function (l) { return '<div>' + escapeHTML(l) + '</div>'; }).join('') + '</div>';
    h += cwDeepTime.moreBody(rec.id ? 'event-' + rec.id : null, rec.more.paragraphs);
    if (rec.knownFrom) h += '<p class="known"><i>Known from</i> ' + escapeHTML(rec.knownFrom) + '.' + (rec.placeNow ? ' <i>The evidence is at</i> ' + escapeHTML(rec.placeNow.name) + '.' : '') + '</p>';
    if (rec.references && rec.references.length) h += '<div class="refs">' + rec.references.map(function (r) { return '<div>' + prose(r) + '</div>'; }).join('') + '</div>';
    return h;
  };
  window.cwDeepTime = cwDeepTime;
})();
