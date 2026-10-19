/* cw-style.js — Curious Woods: the one style file for the timeline, the maps and the globe.
   Michael's ruling of 19 Oct 2026 (Rulings-Sept-2026, *Timeline graphics* 1; the audit
   CWVault/claude/Audit-Timeline-Graphics-Oct19.md, §5): one shared style, defined in one place, so that
   anything new matches by reading from here instead of copying numbers by hand, which is how the two
   coppers happened. The values are the ones the five scripts carried on 19 Oct, named by their roles, with
   two changes: copper is the current-year marker's #b5652b everywhere (map.js and probe.js had #b87333),
   and the globe's marker takes the map's vermilion #c84830 (it had #c8451f), pending Michael's yes.
   Where two scripts carried near-twins of one colour (the map's halo #f4f1ea beside the page's parchment
   #f4f1e8) both are kept under their own names, unchanged, so nothing a child sees moves; merging them is
   a later, visible decision.
   Loaded before js/map.js, js/timeline.js, js/globe.js, js/deep-time.js and js/probe.js, which read
   CW.STYLE and stop with a plain message if it is missing. It also writes every colour to the page as a
   CSS variable, --cw-<name> (--cw-ink, --cw-ink-soft, --cw-copper …), so a page's own CSS reads the same
   values; the Time Machine's :root aliases its old names to them.
   Classic script, no dependencies. */
(function () {
  'use strict';
  var CW = window.CW = window.CW || {};
  var S = CW.STYLE = {
    font: 'Georgia, "Times New Roman", Times, serif',   // the one face

    // ---- the inks and the paper ----
    ink: '#2a241c',            // every label, every line of text
    inkSoft: '#6b655a',        // a quieter line: known from, a credit, a caption's credit
    grey: '#9a958b',           // an age beside a title, a year on a rail, a faint tick
    greyDot: '#8a8378',        // a lesser place's dot; a timeline's rail
    greyWord: '#7d7a72',       // a card's date and distance
    greyClose: '#b0a090',      // a window's close word, a strip's word, at rest
    parchment: '#f4f1e8',      // the page; the halo under a timeline's words
    parchmentDeep: '#ece6d6',  // the column
    halo: '#f4f1ea',           // under a label on a map (map.js's near-twin of the parchment, kept as it was)
    paper: '#f0ece0',          // the ground of a text block on a map
    window: '#f0ede4',         // the picker window
    rule: '#c8b89a',           // a hairline: a window's border, a panel's top, a separator
    cardEdge: '#d9d4c8',       // a far-away card's border
    strip: 'rgba(200,184,154,0.28)',   // the drag strips and bars
    shadow: 'rgba(42,38,32,0.18)',     // under a window

    // ---- the colours that mean something ----
    copper: '#b5652b',         // the current year; the one the story is about (one copper, 19 Oct 2026)
    vermilion: '#c84830',      // the tapped thing; the story's hand on a map
    slate: '#3f5a78',          // the world's events, and a place that belongs to them
    payne: '#546A80',          // a word that acts
    payneHover: '#3D3D3A',     // the same word under a mouse
    line: '#46597a',           // a timeline's line; a curve's line
    focus: '#bcd3ea',          // the window on a line, and its funnel
    focusEdge: '#8fb0d2',
    curveFill: '#8fb0d2', curveLine: '#46597a',       // a curve's band and line
    curveFill2: '#d9a066', curveLine2: '#b5652b',     // a second series
    band: '#cdbfa3',           // a period with no colour of its own
    leadPerson: '#c9b8b0',     // the soft stretch under an uncertain date, the person's side
    leadWorld: '#c3ccd6',      // and the world's
    washGrows: '#33663f',      // a named region: what grows
    washMade: '#5a4a8c',       // what people made
    washAlpha: 0.18,

    // ---- the earth ----
    coast: '#4a4336', coastAlpha: 0.55,   // the 0 m line
    shelf: '#2f5c78', shelfAlpha: 0.30,   // the −200 m line
    seaShore: '#93bed7',       // the sea at the shore (Spec-Maps' ramp at 0 m); the moving map's ground
    shoreLand: [[0, [230, 223, 203]], [250, [216, 205, 170]]],   // the land ramp's first stops, for the shelf a lower sea exposes
    shoreEdge: [74, 67, 54],   // the coast's ink, as numbers, for the new shore
    iceFill: '#eaf1f4', iceEdge: '#c9d6de',   // the ice sheets this side of the seam

    // ---- the globe ----
    globeSea: '#5793b4', globeSeaDeep: '#33699a',
    globeLand: '#8c8366', globeLandPale: '#c3bba5',
    graticule: 'rgba(42,36,28,0.10)',
    limb: 'rgba(42,36,28,0.35)',
    washIce: '#f4f6f8',        // the polar caps of the cold ages
    magma: '#6e2410', magmaGlow: '#b8471c', hot: '#f0a040',
    black: '#0c0a08', crust: '#141010', crustLight: '#2a2320', flash: '#fbf4e6',

    // ---- type: screen pixels, whatever the picture's size ----
    size: { label: 15, minor: 13, text: 13, mark: 14, readout: 16, word: 12, tiny: 11 },

    // ---- the halo under a map's labels ----
    haloAlpha: 0.7, haloPx: 3,

    // ---- dots, in screen pixels ----
    dot: { place: 4, minor: 3, tap: 14 }
  };
  /* a hex colour at an alpha, as 'rgba(r,g,b,a)' */
  S.alpha = function (hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
  };
  /* every colour as a CSS variable on the page: --cw-ink, --cw-ink-soft, --cw-copper … */
  var root = document.documentElement;
  Object.keys(S).forEach(function (k) {
    if (typeof S[k] !== 'string' || k === 'font') return;
    root.style.setProperty('--cw-' + k.replace(/[A-Z]/g, function (c) { return '-' + c.toLowerCase(); }), S[k]);
  });
  root.style.setProperty('--cw-font', S.font);
})();
