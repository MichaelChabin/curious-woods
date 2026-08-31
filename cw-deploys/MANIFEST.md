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
in Phase 4 so the labs cannot drift apart. `cw-panel.js` — the canvas panels
as components: the info window (draggable, closable, fading — Geometry's
tip-window pattern; used by Multiplication's number description) and, since
the controls build (13 Aug), the **choice panel** — an occasional act's
outcomes as words with recipe lines, taking one choice and fading; used by
both labs for Save, and by Geometry for the WIP guard and replay Cancel.

**`art/` `models/` `stories/` `text/`** — assets, at the root of this folder.
Pages in `active/` and `experiments/` reach them with `../` —
`../art/palettes.json`, `../models/logs/geo_hexagon_triangle.json`.
A page that moves between folders must have those paths checked.
`models/constructions.json` — the construction library's manifest (controls
build, 13 Aug): Geometry's picker reads it at load, so library growth is a
log file plus a line here, no code. An entry may carry `speed` (seconds) to
open at a chosen playback duration.

## Version stamps (standing method, 13 Aug 2026)

Every page here carries a `CW_VERSION` constant (date + short commit hash) logged to
the console on load — updated in the same commit as the change, like this file.
Shared scripts are referenced with a version query (`plane.js?v=...`), bumped when
the script changes. `_headers` makes HTML revalidate on every load. It does not help
to test yesterday's work.

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
  y-down view. **Controls build (13 Aug):** occasional acts open choice
  panels (Save construction / Postcard / Full sheet — Postcard shares at
  1200×800, Full sheet keeps the 3000×2400 print render; the WIP guard also
  fronts the `.json` drop); **replaying opens the replay panel** (13 Aug
  afternoon, ledger §15): step arrows, Play with a 0–15s duration saved per
  construction (0 instant; last-used is the local default), Start over,
  tap-skips-ahead, close-as-fork — and the built-ins come from
  `models/constructions.json`; the action row is conditional
  (empty canvas shows only Open); the color panel is summoned by Color and
  closable; Numbers became Show map ↔ Hide map (old logs migrate at replay);
  the lattice tie is gone (grid keeps its step); Just the glass ↔ Show the
  making wires the `show_glass` viewing op. Ledgers:
  `CWVault/01-ACTIVE/Decisions-Phase{1,2,3}-Aug07.md`, `…Phase4-Aug08.md`,
  `…ControlsBuild-Aug13.md`.
- **`glass-multiplication.html`** — the times table as a window onto the number
  plane: every product a rectangle, prime factors in colour and sound.
  **Rewritten on the plane** (Phase 4, 8 Aug 2026): the map is a canvas
  viewing of the shared coordinate space (`../js/plane.js`) — panes are
  regions keyed by number, revealed everywhere they live including panes
  panned into later; pieces stack smallest prime first, identically
  everywhere (no mirror); colours are the `aslab` workshop's resting and lit
  palettes; primes reach 19 in sound and render as clear glass beyond the
  workshop's six; keyboard access via a pane cursor on the one tabbable
  canvas. Defaults to the map shown. Live since 8 Aug (that push's copy was
  approved via the printed-strings scan; the full read-aloud pass with Eileen
  comes later). **Controls build (13 Aug):** a conditional Save word (present
  when anything beyond 1 is on the glass) opens the choice panel — Postcard
  shares the window at 1200×800, Full sheet downloads the 3000×2400 print
  render (no construction save: this lab keeps no operation log, reported to
  the board); Numbers became Show map ↔ Hide map. Ledgers:
  `CWVault/01-ACTIVE/Decisions-Phase4-Aug08.md`,
  `…ControlsBuild-Aug13.md`; Michael's sorted post-Phase-4 review:
  `CWVault/01-ACTIVE/Review-GlassMult-Aug09.md`.

### experiments/
- **`scale-from-a-rhythm.html`** — bench: a whole major scale as one rhythm. Eight click
  voices at **24 : 27 : 30 : 32 : 36 : 40 : 45 : 48** — the just major scale over a common
  denominator — with a speed knob, per-voice toggles, the brightness and click-pitch controls
  shared with `six-against-five.html`, and a walk mode stepping one voice at a time so the
  scale sounds as a scale. Presets isolate the three 4:5:6 triads (24·30·36, 32·40·48,
  27·36·45), which between them use all eight numbers and nothing else: **the scale is one
  chord planted three times.** A sieve strip of 24–48 marks which numbers are built from only
  2s, 3s and 5s; nine survive, and dropping 25 (under a semitone from 24, crowding it) leaves
  the scale exactly — **a sieve, not a list.** Two findings that were not designed in: the
  **floor readout** (gcd of the active voices × the unit) is a real note under any one triad
  and falls to ~8 per second under all eight, which is *a chord has a floor and a scale does
  not*; and with the bottom voice tapped onto a real key, the three scale notes containing a 5
  (5/4, 5/3, 15/8) are exactly the three that miss the keyboard by more than 10 cents while
  the 3-limit ones land within 2 — at the 15-cent lighting tolerance five keys light and three
  do not, so the argument draws itself. Lane colours are the odd primes of each ratio; the
  piano strip is shared with the sound bench and is **designer-facing**, the letter names
  deliberate and not the child-facing scheme. Standalone; does not stand on the plane. Design:
  `CWVault/01-ACTIVE/Sound-Counting-Bench-Aug25.md`.
- **`six-against-five.html`** — bench: does the ratio material survive being delivered as
  *counting* rather than as waves? Two click tracks at a fixed whole-number ratio, one speed
  knob from 1.5 to 330 per second. Below ~8 it is a countable rhythm, above ~20 a pitch, and
  the two numbers are the same the whole way; the track is ticked at both boundaries because
  the flutter between them is the finding. **Both voices lay down one identical click** and
  differ only in rate, so the tone at the top was never introduced — it assembles itself out
  of repetition. Seven ratios, 2:1 through 45:32. Three knobs: speed, **brightness** (a
  lowpass — now understood as the *roughness* control rather than a comfort control), and
  **click pitch** 400–4200 Hz, which was a buried constant at 1850 and is now choosable.
  A **piano strip** under the dot rows carries a continuous marker at each voice's exact
  pitch, lights the nearest key only within 15 cents, and reads both notes with cents
  deviation; tapping a key sets the slower voice and the faster follows by ratio. It is
  **designer-facing** — the letter names are deliberate and are not the child-facing scheme.
  Audio is a looping buffer rebuilt one full pattern long on every change, so nothing is
  resampled and no scheduler runs. **Carries its own reading below the bench** — the first
  extended sample of the child voice for this material, which is why this is one page and
  not two. Two short pieces sit directly under the instrument (*what note is that*, *what
  the picture is showing*); the long reading follows. Standalone; does not stand on the
  plane.
  **Revised the same day after a listening pass** (25 Aug) which disproved three claims the
  page had made with confidence: 7:5 and 45:32 are one sound about 8 cents apart, so simple
  fractions are *where* the sweet intervals are and not *why*; consonance is not the pair
  fusing into one note; and roughness lives in the partials, which is what brightness moves.
  A ringing at high brightness was a real defect — the click was truncated at the loop seam —
  and clicks now wrap around the buffer end. The reading was rewritten to match. Design:
  `CWVault/01-ACTIVE/Sound-Counting-Bench-Aug25.md`, `…/Sound-Rhythm-Roll-Aug21.md`,
  `…/Sound-Series-Aug08.md`.
  Open: no tapping, and whether 3:2 stays clean at full brightness on the fixed build.
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
- **`map-reveal.html`** — bench: the map reveal. The grid of the visible window
  constructed by compass and straightedge — full circles only, the lab's own
  vocabulary — with knobs for duration, legible opening and acceleration, tap-skip,
  and a deep-zoom mode where the tenths construct themselves. Settles the reveal's
  tempo by looking (`CWVault/01-ACTIVE/Decisions-Controls-Aug12.md` §8, §11, §15:
  content is never compressed, only time). Standalone; does not stand on the plane.
- **`fog-map.html`** — sketch: every pane shaded by the rank of its largest prime
  factor, white at 2, saturating at the 256th, panning to a million. A *magnitude*
  viewing rather than a factor-reading one — it asks how big, not which. Standalone: it
  does not stand on the plane and is not the port. Listed in `experiments/index.html`.
  Seed: `CWVault/03-SEEDS/smoothness-fog.md`; ruling it provoked:
  `CWVault/01-ACTIVE/Decisions-Fog-Aug12.md`.
- **`pi-beads.html`** — how many beads fit around a circle; circumference ÷
  diameter, with past measurements kept.
- **`prime-tones.html`** — listening bench for the primes 11 and 13: four candidate
  schemes played against the four the lab already has. Settled the octave question
  (`CWVault/01-ACTIVE/Decisions-GlassMult-Aug03.md`). Whether it belongs to the Sound
  Series or stays interface work is open.
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

Staged there now (9 Aug 2026): the Sound Series' two Jankó instruments,
`janko-lattice.html` (touch — twelve notes on two tiers, all one colour, home
chosen and marked) and `janko-midi.html` (the same lattice lit by Web MIDI,
Chrome only). Built 8 Aug, deliberately **not publicly reachable** until the
Series decides its opening; both are self-contained. Design and reasoning:
`CWVault/01-ACTIVE/Sound-Series-Aug08.md`.
