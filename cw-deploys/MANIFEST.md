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
  **What `active/` carries is the 13 Aug build** (`CW_VERSION 2026-08-13 b32d541`),
  restored 1 Sep after the 24 Aug panel build was frozen unshipped to
  `../prototypes/glass-panel-build-aug24.html` — see the prototypes note at the foot
  of this file. Nothing deployed changed. The rebuild runs bench-first on the plane
  (`CWVault/01-ACTIVE/Walk-Glass-Aug26.md`), and this lab stays live throughout.

### experiments/
- **`multiply-bench.html`** — bench: Multiply, alone, on the plane. Step 3 of
  `CWVault/01-ACTIVE/Review-Glass-Aug26.md`'s order of work — one file per tool,
  standing on `js/plane.js` and nothing else, with **no table code**: no panes
  keyed by number, no modes, no Build, no Properties, no Fill, no prime colour,
  no sound, no log. The opening state is the plane as Geometry draws it plus one
  white unit tile at the origin, the 1, with its numeral. The grammar is the
  walk's (`01-ACTIVE/Walk-Glass-Aug26.md`, steps 1, 2 and 6): touch the 1 and
  drag to multiply, touch anywhere else to pan, pinch or wheel to zoom, and
  **tap a placed tile to see the rectangle that minted it** — the still half of
  *the mark is the memory*; the animated replay waits for the operation log.
  During the drag the 1's glass stretches — outline and transparent fill — with
  the twin riding across the diagonal at `TWIN_FAINT`, the live width and height
  centred on their own sides inside both rectangles so the twin reads the same
  two numbers exchanged, and no product anywhere. On release only the far-corner
  tile of each rectangle remains, with the product written on it at the moment
  of placing: one tile on the diagonal, two off it. Tiles persist; a place gets
  a tile once; **Undo steps and Clear sweeps**, and **Home** returns the view to
  the greeting; each word fades when it has nothing to do. **Hide duplicates
  keeps the lower tile** — width ≥ height, whichever rectangle her stroke drew —
  so what is left is one tile per unordered pair of sides, 55 of them in a
  10×10, and a stroke above the diagonal leaves its mark mirrored below it.
  Colour says one thing and it is **which side of the crease**: squares keep the
  unity white, everything else is grey on the declared base `#DCDCDC`.
  Resolution is zoom and there is **no grain control** —
  the finger snaps to whatever rung of plane.js's 1–5–10 ladder is on screen,
  and products are carried as exact integer-over-power-of-ten, so 1.3 × 2 reads
  2.6 and never 2.6000000000000005.
  **The four questions it was built to be looked at for are at the top of the
  source**, with the constant that moves each one named beside it. A fifth
  arrived unbidden on the first drive and is recorded, not patched: plane.js
  draws a lattice rung only above 40px spacing, so **tenths exist only above
  ~400px per unit**, and at that zoom a stroke from the origin reaches x ≈ 2 on
  an iPad. The walk's own illustration, 6.3 × 2, needs ~2 500px of run and is
  unreachable on any targeted screen — reach and refinement pull opposite ways,
  and the walk's step 3 already says it is *division*, not multiplication, that
  puts tiles between the lines.
  **Second pass, 1 Sep, from Michael's own bench pass** — six changes, three of
  them reversals, all recorded in the file's header and in that commit: hiding
  duplicates now keeps the lower tile rather than the one she drew; the tiles
  split into white on the crease and grey off it; the reserved tap gained its
  still body; and Home, Clear and newest-numeral-under-oldest arrived. Two
  things the pass did not foresee are left standing rather than patched: with
  duplicates hidden, tapping a mirrored mark shows a rectangle she never drew
  (changes 1 and 6 meeting), and Clear takes the undo ledger with it, so it is
  the one act here with no way back.
  **Third pass, 1 Sep** — Michael found a coarse-grain tile swallowing the taps
  of the fine tiles inside it, and only their numerals showing through, not
  their outlines. Both were the same cause: paint order and hit test were keyed
  to *when* a tile was made, when what she can see and aim at is decided by
  *how big it is*. **One comparator now drives both — largest first, and among
  equals newest first, so the smallest and the oldest finish on top** — which
  keeps his newest-under-oldest rule where it applies (equal-size numerals
  crowding at zoom-out) and extends it to nesting. Glass and came travel
  together, so a buried tile keeps its cell and not only its name. Two more from
  the same pass: **a tap inside the 1 now reaches the tiles she has built there**
  at a finer grain — the multiply gesture claims that whole square, so a
  zero-length drag on it falls through to the tap, while the 1 itself still
  answers nothing — and **the two side numerals moved to the top and right
  sides, bold, at the size the product will be written at on the corner cell**,
  because on the bottom and left they sat against the plane's own axis labels
  and were read as those. Standalone otherwise; deliberately not deployed into
  `active/` and not linked from the main index.
- **`strobe-and-stars.html`** — bench: a loudspeaker edge-on under a strobe. The cone is one
  bar between `{` and `}`; the strobe runs at the bottom note, so that note freezes and is the
  reference. A voice at `n/d` visits exactly **d** phases and the flashes joined in order draw
  a polygon or star polygon `{d/(n mod d)}` — 7:5 is a pentagram, 45:32 is a mess.
  **Above each window is the circle the bar is the shadow of**, with drop lines: circular motion
  projected, which is a sine wave's content with no sine wave drawn. The shadow loses phases
  that `sin` maps together, so captions read "4 places · 3 shadows" — the even-denominator
  collapse is labelled rather than hidden. A tuning switch (true fraction ↔ equal temperament)
  **fills the gap that has been open since 25 Aug**: on a true ratio every figure closes and
  freezes; on the keyboard's version nothing closes and the figure creeps at `|q·f − p·S|`
  per second, which is the beat rate — 0.68/s for a tempered fifth at 200 Hz, matching the
  audible throb to two decimals. Additive tones (5 harmonics per voice) so the beat is audible
  while the drift is visible. Two or three voices; the triad shows the collapse plainly.
  **Carries its own warning in the reading**: this is a picture of the arithmetic, not of the
  sound — 7:5 and 45:32 look nothing alike and are indistinguishable by ear. Standalone.
  Design: `CWVault/01-ACTIVE/Sound-Counting-Bench-Aug25.md`.
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

`glass-panel-build-aug24.html` (frozen 1 Sep 2026) — the 24 Aug panel build of
Glass Multiplication, `CW_VERSION 2026-08-24 e4cd030`, which sat uncommitted in
`active/` for a week and was never deployed. Frozen here rather than shipped:
`CWVault/01-ACTIVE/Review-Glass-Aug26.md` found it standing on two substrates at
once — the plane's tools (Multiply, Divide, Make a square, tiles from the origin)
on top of Phase 4's table rendering — and the 26 Aug ruling is **plane, table as a
viewing**, so the file as a whole does not port. What does port, and is the reason
to keep it: the **Building Numbers** rail on Geometry's *How this works* pattern,
the movable/resizable/closeable window component, the story windows with the
verbatim text of `01-ACTIVE/Stories-First-Set-Aug24.md`, the choice panel, and the
leftover grammar of Divide and Make a square. **It is not served** — `prototypes/`
sits outside `cw-deploys/`. Read it with `01-ACTIVE/Walk-Glass-Aug26.md` beside it,
which is what replaces it.
