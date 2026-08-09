# cw-deploys — what is here

Netlify publishes this folder and nothing above it. Anything outside
`cw-deploys/` is never served.

## Folders

**`active/`** — current, shipping. Linked from the main index.
No version numbers or dates in filenames here: the file at
`active/glass-geometry.html` is *the* Glass Geometry, always.

**`experiments/`** — live and reachable, but unpolished. Linked only from
`experiments/index.html`, never from the main index. Version numbers are
allowed here.

**`../outdated-files/`** — outside this folder, so Netlify never serves it.
Superseded versions, kept as the archive record.

**`js/`** — shared code, at the root of this folder. Classic scripts, no
build step. `plane.js` — the coordinate space both labs stand on (view state,
transforms, one zoom clamp, the ambient lattice, the pixel floor); extracted
in Phase 4 so the labs cannot drift apart. `cw-panel.js` — the canvas info
window as a component (draggable, closable, fading — Geometry's tip-window
pattern); used by Multiplication's number description.

**`art/` `models/` `stories/` `text/`** — assets, at the root of this folder.
Pages in `active/` and `experiments/` reach them with `../` —
`../art/palettes.json`, `../models/logs/geo_hexagon_triangle.json`.
A page that moves between folders must have those paths checked.

## Pages

### active/
- **`glass-geometry.html`** — compass-and-straightedge construction environment;
  constructions become stained glass. Reads `../text/geometry-v1.json` for its
  copy, `../art/palettes.json` for palettes, and `../models/` for the built-in
  constructions. **Stands on the shared plane** (`../js/plane.js`, Phases 1–4):
  view state behind the plane's API, world y up, one zoom clamp, the emergent
  numbering's unit declared to the plane, the ambient lattice behind a Numbers
  control cycling map · points · off — and, since Phase 4, lattice-click
  minting: with the map showing, tapping a lattice intersection records a
  point (`lattice_point` op, unit-coordinate address). Saved logs replay
  unchanged but render mirrored across the seed axis relative to the retired
  y-down view. Ledgers: `CWVault/01-ACTIVE/Decisions-Phase{1,2,3}-Aug07.md`
  and `…Phase4-Aug08.md`.
- **`glass-multiplication.html`** — the times table as a window onto the number
  plane: every product a rectangle, prime factors in colour and sound.
  **Rewritten on the plane** (Phase 4, 8 Aug 2026): the map is a canvas
  viewing of the shared coordinate space (`../js/plane.js`) — panes are
  regions keyed by number, revealed everywhere they live including panes
  panned into later; pieces stack smallest prime first, identically
  everywhere (no mirror); colours are the `aslab` workshop's resting and lit
  palettes; primes reach 19 in sound and render as clear glass beyond the
  workshop's six; keyboard access via a pane cursor on the one tabbable
  canvas. Defaults to Numbers · map. Live since 8 Aug (that push's copy was
  approved via the printed-strings scan; the full read-aloud pass with Eileen
  comes later). Ledger: `CWVault/01-ACTIVE/Decisions-Phase4-Aug08.md`;
  Michael's sorted post-Phase-4 review, eight lanes from fix-now to design
  conversations: `CWVault/01-ACTIVE/Review-GlassMult-Aug09.md`.

### experiments/
- **`number-theory-v1.html`** — multiplication and division as rectangles on a
  pannable number plane. **The behavioural reference for the extracted plane** — y-up,
  `viewW/viewH` caching, and a single `labelStep()` driving both labels and grid lines,
  which is why its texture stays coherent under zoom.
- **`canvas-panes.html`** — bench: can canvas carry leaded panes of layered glass while
  panning and zooming? Pane counts 10/16/24/32, glass detail full / flat / came-only,
  auto-stress. **Passed** — 32×32 is 1024 panes and 3840 pieces at 2.4 ms p95, 14% of
  the frame budget. It reports *draw time against the budget*, not frame rate: frame
  rate is vsync-clamped and reads 60fps until it reads 30, so it cannot fail and is
  useless as a gate. Any future performance bench should measure the same way.
- **`fills-and-light.html`** — bench: two declared palettes, a resting one and a lit one,
  rather than one degraded. Both derived from the workshop's declared colour in OKLCH so
  hue never moves, with out-of-gamut results flagged rather than silently clipped. All
  fifteen palettes from `../art/palettes.json` are imported, plus the colours the lab
  ships today. Showing a set — or selecting a pane — moves those panes to the lit palette;
  nothing is dimmed. Glass is flat with directional striations and seeds; inner cames and
  the pane frame carry separate colour and weight; highlights are elliptical, brighter
  when smaller, and only some pieces catch them. Results in
  `CWVault/01-ACTIVE/Decisions-Fills-Aug06.md`.
- **`prime-glass.html`** — bench: prime colours across four workshops with ordered
  stripes and a monochrome toggle. With colour off and order the only channel, 6, 10 and
  14 render identical — so colour currently carries information rather than delight, and
  a second channel is required. Two candidates are in the bench. In progress.
- **`janko-lattice.html`** — first instrument of the Sound Series. A Jankó
  lattice: twelve notes on two tiers, front tier the even steps and back tier
  the odd, offset by half a key, so an octave spans six columns and fits a
  child's hand. All keys one colour — the black-and-white of a standard
  keyboard encodes C major and is a historical accident, so home is chosen and
  marked instead. Major-scale shape slides intact; moving home by one step
  flips tiers, which is honest, not a bug. Touch, multi-touch and drag.
  Self-contained, Web Audio oscillators, no shared code. Design and the
  reasoning: `CWVault/01-ACTIVE/Sound-Series-Aug08.md`.
- **`janko-midi.html`** — the same lattice for the Mac, lit by a MIDI keyboard
  over Web MIDI: four octaves (notes 36–84), octave shift, sustain pedal,
  velocity, and a `hertz` label so the doubling every six columns can be read
  while it is heard. **Chrome only** — Safari has no Web MIDI, and a `file://`
  URL may need serving from localhost. Deliberately carries no letter names,
  sharps or flats; steps from home, ratios and frequencies are the vocabulary.
- **`pi-beads.html`** — how many beads fit around a circle; circumference ÷
  diameter, with past measurements kept.
- **`clinks-triangular.html`** — triangular numbers as people arriving, leaving,
  and clinking glasses.
- **`necker-brain-map.html`** — the path a Necker cube flip takes through the
  brain, drawn as a station map. Uses
  `../stories/necker-cube/brain-watercolor.jpeg`.
- **`sound-workbench.html`** — bench for auditioning gesture sounds, feedback
  sounds, pitch and ratios.
- **`cursor-modes.html`** — what the pointer becomes for each gesture.

## When a page is superseded

Move the old file to `../outdated-files/` and **keep its dated or versioned
filename** — that name is the archive record of when it was current. The
replacement takes the plain name in `active/`.

So `geometry-v1-20260325.html` stays `geometry-v1-20260325.html` in the archive,
while the version that replaced it lives as `active/glass-geometry.html`.

`../prototypes/` is staging — work that has not yet earned a URL. A prototype
becomes an experiment by moving into `experiments/` with a descriptive name.
