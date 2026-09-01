---
status: Live — the single place threads are parked
role: The board. One line per thread. Read first, written last.
updated: 2026-09-01 (evening) (Michael ran the Multiply bench himself and sent six changes; all six are in. Three are reversals — hiding duplicates now keeps the **lower** tile, tiles split **white on the crease / grey off it**, and the reserved tap has a body: it shows the rectangle a tile was made from. Added: Home, Clear, and numerals drawn newest-under-oldest. Two things the pass did not foresee are left standing rather than patched, and one gloss is flagged against the 19 Aug correction. See thread 1. Earlier today: Multiply has a bench — `cw-deploys/experiments/multiply-bench.html`, step 3 of the review's order of work: one tool on `plane.js` alone, no table code, four questions left standing in the source. It found a fifth nobody asked for — tenths only exist above ~400px per unit, so the walk's own 6.3 × 2 cannot be drawn on an iPad; recorded, not patched. See thread 1. Earlier same day: Housekeeping — the blocked commit is cleared. The 24 Aug panel build of Glass Multiplication is frozen unshipped at `prototypes/glass-panel-build-aug24.html` and `active/` is restored to the deployed 13 Aug lab; nothing new deployed. Nine days of vault docs land with it — the three tool specs, the panel prompt, the first story set, the 26 Aug review and walk, the reader-prototype brief, the Frankenstein-11816 constellation and the chladni bench seed. No code changed. Earlier: Frankenstein-11816 constellation seeded into 02-CONSTELLATIONS — sixteen nodes, twenty-four claim edges, parked warm with a `threads` facet decision owed; see Parked — warm. Earlier: 26 Aug evening — Glass ruled onto the plane and the walk run through Make a square — see thread 1 and 01-ACTIVE/Walk-Glass-Aug26.md. Earlier same day: reviewed — see thread 1, 26 Aug entry; the 24 Aug build is diagnosed, not fixed. Earlier: 25 Aug — Six Against Five revised and redeployed after a listening pass: three asserted claims disproved, a ringing traced to a click truncated at the loop seam and fixed, piano strip and click-pitch knob added, the long reading rewritten. One listen owed — 3:2 at full brightness. Glass Multiplication's panel architecture from 24 Aug was **uncommitted and undeployed** on Michael's instruction — as of 1 Sep it is frozen as a prototype, see the lead: the mode bar dissolved, the **Building Numbers** rail and panel in, the first set — Multiply, Divide, Make a square, Explore — wired to the specs; three Multiply questions left as hooks; Build and Properties are code without a word)
---

# The Board

Every thread in Curious Woods lives here, whether or not anyone is working on it.
A thread with a **next action** written down is parked. A thread without one is
still taking up room in Michael's head, which is the scarce resource this file exists
to protect.

**Rules**
1. Three threads in Moving at a time. A fourth means one drops to Parked.
2. Every thread has a next action, or it is not really parked.
3. Claude reads this file at the start of a session and writes the delta at the end.
4. Anything that produces a file updates `cw-deploys/MANIFEST.md` **and** this board in
   the same commit. Three benches sat unregistered for a day because this rule did not
   exist.
5. Parked is not lost. That is the whole point.

**The vault root holds two files, and they do different jobs.** This board says what is
**moving**; it goes stale by design and is rewritten every session. `00-DECISIONS.md`
(new, 22 Aug 2026) says what was **settled, and why** — append-only, never edited, never
reordered, one line per question. It cannot conflict with anything, because it does not
describe how the world is. It carries two things this board deliberately does not: a
standing table of **which document to believe** when two disagree, and a **Corrections**
section that keeps a wrong claim visible beside what replaced it, on the ground that the
wrong version is often the memorable one. When you have forgotten *why* something is the
way it is, look there before here.

> **Correction, 5 Aug evening.** The morning version of this board had "write the
> Glass Multiplication v2.2 handoff" as its top action. That was wrong and is struck.
> There is no v2.2. The active work is plane extraction, and `Plan-Plane-Extraction.md`
> says plainly: *larger maps arrive for nothing; there is no Map Size feature to build.*
> The board was built from a folder listing rather than from the plan sitting in it.

---

## Moving

### 1. The plane, and the labs standing on it
Not a bigger multiplication lab. A **plane** that both labs stand on; the labs become
viewings of one coordinate space. Ten settled decisions, four phases, three benches.

> **All four phases are built, reviewed and live** (7–8 Aug). The plane is extracted to
> `cw-deploys/js/plane.js` and both labs stand on it: view state behind one API, pure
> transforms, one zoom clamp, world y up, an ambient lattice with a 1–5–10 ladder across
> decades and labels positive in all four directions, the pixel floor spoken at the
> declared unit's scale. Multiplication is a canvas viewing of it — panes as regions keyed
> by number, pieces smallest-prime-first identically everywhere, primes to 19, keyboard
> access by pane cursor. Geometry gained lattice-click minting. Per-phase detail and every
> deviation: the four `Decisions-Phase*` ledgers below. **Saved Geometry logs replay
> unchanged but render mirrored** across the seed axis, a known consequence of the y-up
> flip.

- **Authority:** `01-ACTIVE/Plan-Plane-Extraction.md` (instructions) ·
  `01-ACTIVE/Inventory-GlassGeometry.md` (what the code actually contains) ·
  `01-ACTIVE/Decisions-Benches-Aug05.md` (bench results and the decisions they amend) ·
  `01-ACTIVE/Decisions-Fills-Aug06.md` (glass, light and lead — settled at the bench) ·
  `01-ACTIVE/Decisions-Phase1-Aug07.md` (Phase 1 as executed, with deviations) ·
  `01-ACTIVE/Decisions-Phase2-Aug07.md` (Phase 2 — the verification sweep) ·
  `01-ACTIVE/Decisions-Phase3-Aug07.md` (Phase 3 — the lattice, and its flagged defaults) ·
  `01-ACTIVE/Decisions-Phase4-Aug08.md` (Phase 4 as built — and the load-bearing note that
  the colourblind-safe workshop does not exist yet) ·
  `01-ACTIVE/Spec-Interface-Standard-v2-Aug09.md` (**the interface standard — sits above
  Interface-Foundation and UI-Language; read before any controls work**) ·
  `01-ACTIVE/Review-GlassMult-Aug09.md` (the post-Phase-4 review, eight lanes) ·
  `01-ACTIVE/Decisions-Fog-Aug12.md` (colour scoped per-viewing; the session-end git check) ·
  `01-ACTIVE/Decisions-Lane1-Aug12.md` (Lane 1 as executed — the fix-now list, both labs) ·
  `20-SPECS/Spec-Workshop-Palette-Schema.md` (decision 9's data path, exported from
  the bench — now tracked in git) ·
  `_msc/_mscVault/5. Claude Design/1. Redesign.md` (the reasoning).
- **Benches:** `canvas-panes` **passed decisively** — 32×32 is 1024 panes and 3840 pieces
  at 2.4 ms p95, zero dropped frames. `prime-glass` **reports a problem**: with colour off,
  6, 10 and 14 are pixel-identical. `fills-and-light` **replaced a settled decision**:
  dimming is out, two declared palettes are in.
- **Decision 10 is now overturned in both halves.** Showing a set lights its members
  rather than dimming the rest (5 Aug); and selecting a pane moves it to the lit palette
  rather than thickening its came (6 Aug). One visual language for "this one".
- **Platform-level, from the fills bench:** geometry's `#777777` came was chosen against
  its own light glass and becomes a *lighter* line at a third of the contrast against dark
  panes. If both labs share leading, the came must work against both.
- **Phase 4 design note written, 8 Aug:** `01-ACTIVE/Design-Phase4-Aug08.md`. It
  adopts subdivision as the second channel (the bench can still overrule — look at
  `prime-glass` with colour off), kills the mirror transform, designs lattice-click
  minting as a Geometry-side `lattice_point` op recording unit addresses, takes the
  virtual-cursor route for canvas accessibility, defines the viewing object and puts
  the Numbers control's permanent home in the viewing's control strip
  (Multiplication defaults to `map`), resolves the 125% clip by declaring 3 and 13's
  lit colours directly per the schema spec, extends primes to 19 with clear glass
  beyond, and extracts the plane to `js/plane.js` so both labs stand on one file.
  Overrule points are gathered at the note's foot.
- **Design note reviewed, 8 Aug.** One overrule: **no second channel — colour is the
  sole prime indicator**, a standing principle; the colourblind-safe workshop is the
  accessibility answer and its quality is therefore load-bearing; the schema now
  requires six distinguishable prime colours per workshop. Subdivision parked as
  `03-SEEDS/subdivision-viewing.md` (a possible future viewing). Everything else
  accepted as written.
- **That ruling is scoped, not repealed — 12 Aug** (`01-ACTIVE/Decisions-Fog-Aug12.md`).
  **Within any one viewing colour means one declared thing**; nothing may compete with
  it. **Across viewings the child assigns colour to the question she is asking, and
  choosing is the point.** This supersedes the global colour-monopoly reading, which
  would have made every future viewing that wants to say something else with colour
  illegal before it was designed. **The default Multiplication view is unchanged** —
  colour is prime identity, no second channel, and the 16th workshop is still the
  accessibility answer and still unbuilt.
- **Phase 4 implemented, 8 Aug — pushed same day with the iPad fixes.** The plane lives in
  `js/plane.js`, one file under both labs. Multiplication is a canvas viewing of it:
  panes as regions keyed by number (revealed everywhere they live, honest gaps where
  a number was never made), pieces smallest-prime-first identically everywhere, the
  `aslab` workshop's resting/lit palettes with drift check, primes to 19 in sound and
  clear glass beyond the declared six, keyboard access via a pane cursor, defaults to
  Numbers · map. Geometry gains lattice-click minting (`lattice_point` ops recording
  unit addresses). Everything verified in the browser, zero console errors; ledger:
  `01-ACTIVE/Decisions-Phase4-Aug08.md`, including the load-bearing note — with
  colour the sole prime indicator, **the colourblind-safe workshop is the
  accessibility answer and must be authored to full standard; it does not exist yet**.
- **iPad review done, 8 Aug; fixes in and pushed.** Safari audio unlock adopted from
  Geometry (Safari joins the acceptance checklist for both labs, permanently); the
  lit-visibility bug was seeding, not taste — bench values untouched; interim layout
  with the number description in a floating info panel (`js/cw-panel.js`, Geometry's
  window pattern as a shared component), tools up under the chips, viewing strip at
  the column's foot. Provisional ahead of the controls pass.
- **Known gaps, Multiplication:** save-as-image / share is not implemented and needs
  a menu word when the controls pass designs one.
- **Bench-first design items, not yet sessions:** the tiling-rotation idea and the
  quadrant toggle (the map around zero, per the Jul 28 ledger). Per the standing
  method, each gets a bench before an argument.
- **Committed 9 Aug, from Michael's design session:**
  `01-ACTIVE/Spec-Interface-Standard-v2-Aug09.md` — the interface standard, sitting
  above Interface-Foundation and UI-Language (both now carry status lines pointing up
  to it); five-surface test, panels as lens or record, choice panels replacing
  hover-expand, undo never touching viewing state, the tap contract, sound permission,
  and the gesture registry opened. `01-ACTIVE/Review-GlassMult-Aug09.md` — the
  post-Phase-4 review sorted into eight lanes so deferred work is never picked up
  piecemeal: Lane 1 is the fix-now list (Safari audio and tap highlights were fixed
  8 Aug — confirm, don't redo; new: selection outline, startup grid, axis shading,
  the white 1, fill-pause at powers of two, no letterbox, plus four Geometry items
  including constructions painting over the membrane and undo eating viewing changes).
  `03-SEEDS/smoothness-fog.md` — the grayscale magnitude viewing and its poster,
  facets corrected to the closed vocabulary.
- **Voice-pass status (Lane 2):** the 8 Aug push was approved via the printed-strings
  scan; the full read-aloud pass with Eileen returns when there is text to see.
- **Committed 12 Aug:** `experiments/fog-map.html`, a standalone grayscale sketch of the
  smoothness viewing — listed in the experiments index, and not on the plane.
  It provoked the colour-ruling scoping above. Seed grew a session section
  (`03-SEEDS/smoothness-fog.md`): *constructable infinity — a rule plus a window*,
  landmark overlays as viewings (the squares diagonal as a spine, pronics beside it,
  doubling as an exponential lattice), and five parameter candidates. Status still cold.
- **Lane 1 executed, 12 Aug** (`01-ACTIVE/Decisions-Lane1-Aug12.md`). The two 8-Aug
  fixes confirmed in code, not redone. **The acceptance-test swap, also sent 8 Aug,
  was found undone** — the overrule commit rewrote §2 but left §10's monochrome
  check standing; swapped today. All ten new items fixed and browser-verified, zero
  console errors: no letterbox (the canvas spans the stage, the instrument column
  floats over it as membrane), fill pauses at power-of-two squares with **Continue?**
  (one new child-facing string, printed with the full list at review), the white
  crystalline 1, axis numbers unshaded on the drawn lattice, the tap outline now
  keyboard-only; Geometry's membrane wins over constructions, the colors panel
  follows the viewing strip's height, the postcard name field sits inside the
  parchment, and undo skips viewing ops. Found in passing and fixed: the greeting
  view latched from a transient first layout in embedded contexts. **Safari could
  not be driven** — `safaridriver` needs *Allow Remote Automation* enabled in
  Safari's Developer settings, Michael's call; with it on, future sessions can run
  the checklist in real Safari. Hands-on Safari/iPad stays owed. Small items flagged
  to the controls pass: the W compass letter now sits behind the membrane; the
  bottom-row numerals and lattice labels both number the x axis in Multiply.
  **Pushed and live 12 Aug** — Michael read the printed string list and said push;
  Netlify verified serving the Lane 1 build. Screen-recording permission was granted
  for driving Safari checks, but captures still fail ("could not create image from
  display") — the app holding the permission likely needs a quit-and-reopen before
  it takes effect; until then hands-on Safari stays owed.
- **Walk brief written 12 Aug (evening):** `01-ACTIVE/Walk-Controls-Geometry-Aug12.md`
  — every Geometry control as built, with the standard's question for each; found in
  passing that **Share is unreachable** (a full share path exists in code, no word
  invokes it). Walk order proposed at the brief's foot.
- **Walk begun, first decisions taken 12 Aug (evening):**
  `01-ACTIVE/Decisions-Controls-Aug12.md` — two panel species named (**choice panels**
  decide and fade; **tool panels** stay until closed); Save/Share flattens to one
  choice panel with Share rejoining the surface; the color panel becomes summonable
  and closable, no longer auto-opening on return visits. Recipe-line strings are
  drafts pending the voice pass.
- **Walk continued, same evening:** the WIP guard settled in Michael's words and now
  covers the `.json` drop (Phase 2 gap closed by decision); auto-keep of unsaved work
  considered and rejected on record; replay Cancel settled, Start over kept. Ledger
  sections 5–6.
- **Walk continued into the map itself:** minting's reach answered (any tool starts
  from a lattice crossing, minting in passing — Multiplication's fractions depend on
  it); **the map constructs itself once per session** when the child asks — ~5s,
  accelerating, world live beneath; timing and skip are a **bench** (`experiments/`,
  not yet built). Ledger §§7–8. Story seeded:
  `03-SEEDS/the-map-euclid-never-drew.md` (era 11637 — Descartes; note: era value used,
  facet vocabulary unchanged). Numbers-as-choice-panel and the destination-named
  lattice-tie toggle are proposed in ledger §9, **awaiting Michael's confirmation**.
- **Walk continued:** "Just the glass" viewing decided (ledger §9 — `showGlass` found
  built and unreachable, the walk's second such path after Share; export already
  clean). The Numbers three-state cycle **dissolved by Michael into Show map ↔ Hide
  map** (§10) — earned numbers belong to the points, "no numbers" belongs to Just the
  glass; propagates to Multiplication as the same word pair.
- **Walk continued:** the tie settled per-viewing (§11) — Multiplication's grid
  follows zoom, **Geometry's keeps its step with no toggle at all**; the last
  state-word problem dissolves. Re-stepping-as-construction named as a question for
  the map-reveal bench. Share examined (§12): the record/artifact split applies to
  sending too — *Send a picture / Send the construction* — **proposal awaiting
  Michael**, along with whether both ship in the controls build.
- **Share resolved, 13 Aug morning (ledger §12):** the Share word is deleted —
  **tapping Postcard shares it** (1200×800, retina-crisp at postcard display size,
  share sheet with download fallback); Full sheet keeps the 300dpi print render; the
  construction's own file rides the same sheet through Save construction. The Save
  panel stays three words. Voice-pass flag: the summoning word "Save" now contains a
  send.
- **The walk is closed — 13 Aug morning.** Final decisions: titles are facts, acts
  get words (§13 — the palette and model titles stop being controls); conditional
  presence for the action row (§14 — empty canvas shows only Open; the
  nothing-to-save toast dies). Ledger complete at fourteen sections.
- **Build brief assembled:** `01-ACTIVE/Brief-Controls-Build-Aug13.md` — every walk
  decision ordered for execution, both labs, with acceptance checks. Ready for a
  Claude Code build session.
- **Controls build executed, 13 Aug** (`01-ACTIVE/Decisions-ControlsBuild-Aug13.md`).
  Everything in the brief is built and browser-verified, zero console errors, both
  labs: the choice panel as a `cw-panel.js` component; the WIP guard fronting New,
  Open and the `.json` drop; the Save panel with Postcard-as-share (1200×800) and
  the `.json` riding the share sheet; replay Cancel; the color panel summoned and
  closable, never auto-opening on return; titles-are-facts (palette and model);
  Show map ↔ Hide map in both labs with old-log migration verified both directions
  through the real drop path; Geometry's tie gone (grid keeps its step, frozen at
  the default step); Just the glass wired to the dormant `showGlass` as a logged
  viewing op; conditional presence (empty canvas shows only Open; both
  nothing-to-save toasts dead; Cmd+O's alert now the guarded picker). Multiplication
  gains the conditional Save word and the two-word panel. **Three contradictions
  reported, not accommodated:** the full sheet was never 1800×1200 (it is 3000×2400
  in code and keeps that); Multiplication has no construction to save (Phase 4's
  no-persistence choice stands — *what is the record of a multiplication session?*
  is an open design question this board now owns); and **the model tool is
  unreachable** — the walk's third dormant path after Share and showGlass; its
  title-as-control is removed and Choose new model sits inside the panel, but the
  panel itself needs a summoning word only Michael can place. Found and fixed in
  passing: viewing ops alone counted as "work" for the guard and the action row.
  **Committed, not pushed** — many new child-facing strings; the full string print
  is in the session review and the voice gate applies. The iPad pass owns the real
  share sheet, VoiceOver and pinch.
- **Map-reveal bench built, 13 Aug morning:** `experiments/map-reveal.html`, listed
  in the experiments index and MANIFEST — the grid constructed by compass and
  straightedge with knobs for duration, legible opening, acceleration, tap-skip, and
  a deep-zoom mode where the tenths construct themselves. Michael's review produced
  **ledger §15 — the reveal is replay, one machinery**: full circles never arcs; the
  reveal constructs at her zoom; the map is a construction and enters the library;
  therefore full replay controls for every loaded construction — play with a 0–15s
  duration (0 instant), saved per construction, last-used as local default; the
  controls live in a panel that appears with the act; **closing the panel is the
  deliberate fork**; content is never compressed, only time. Supersedes most of §6
  (Start over survives as a word inside the panel). **Brief §4 amended
  accordingly**, and the built-ins list moves to a JSON manifest under `models/` —
  library growth becomes a log file plus a manifest line.
- **Replay panel built, 13 Aug afternoon** (build ledger, replay section). One
  panel on the shared component, appearing with the act: step arrows, **Play**
  with a 0–15s duration (0 instant) that **saves with the construction** — the
  child's own slider touch is the local default — **Start over**, the quiet *tap
  skips ahead* (a tap during play jumps to the end and closes the panel), and
  **close as the deliberate fork**. The morning's choice-panel Cancel is
  superseded and gone. The library is content-only: the picker reads
  `models/constructions.json`; pentagon and kin are a log file plus a manifest
  line. All replay acceptance checks verified (backward stepping to the floor,
  instant play, the 3.5s↔8s speed round-trip, mid-play tap-skip), zero console
  errors. Observed pre-existing, for the next walk: undo is live inside a paused
  replay and can eat a replayed step. **Pushed and live 13 Aug** — Michael
  approved the four new strings (Play, duration, instant, *tap skips ahead*);
  the whole controls pass is now live.
- **Multiplication walk brief written, 13 Aug evening:**
  `01-ACTIVE/Walk-Controls-Multiplication-Aug13.md` — the shipped surface read
  control by control; biggest items: Clear has no guard, and the lab has **no
  operation log**, so the record half of Save is missing (a log would bring the
  replay panel for free). The Geometry ledger's species and rules are its brief.
- **Multiplication walk opened, 13 Aug evening**
  (`01-ACTIVE/Decisions-Walk-Multiplication-Aug13.md`). Clear gains the guard —
  **Start fresh? / Keep working**, Save's Postcard as the escape; the phrasing
  needs no noun, so "what is a build called" is never asked. The record question
  stays open **deliberately** — no log, no escape clause either; the lab is
  mid-metamorphosis (workshop → pattern-space) and the question returns when its
  identity settles. **The mode bar is dissolved** — the four words were
  arbitrary (Michael, on record); modes move to the left column as summonable,
  closable panels, Geometry's species unchanged. Multiply demotes to a tool
  inside a rescoped **Explore**: five tools sketched (Multiply, Choose,
  Rectangles only, Restack, Make Square) — division and square roots as physical
  acts, fractions sliced by the divisor, decimals by ten, the two notations side
  by side, and the readout never speaking more precision than the act showed.
  Startup correction: axis panes are panes — honest gaps, no pre-instantiation.
  New child-facing strings (the guard pair); voice gate applies.
- **Panel architecture built, 24 Aug** — `cw-deploys/active/glass-multiplication.html`
  only; Geometry untouched, `js/cw-panel.js` untouched. The mode bar is gone.
  A **left rail** on Geometry's *How this works* pattern (data-driven; a second
  entry is one line) carries one word, **Building Numbers**, summoning a
  movable / resizable / closeable panel: a lede, a just-in-time prompt line on
  Geometry's competence fade, and four tools — **Multiply, Divide, Make a
  square, Explore** — each with *the story* beneath it, opening that tool's
  story in its own scrolling window. Explore has no story line. Story text is
  **verbatim** from `01-ACTIVE/Stories-First-Set-Aug24.md`.
  Multiply is now the continuous stroke of `Multiply-Spec-Aug24.md` (bar on the
  axis reading the width alone, outline into the field, row-by-row fill on
  release with the product counting up, per-shape acceleration, same-axis pairs
  allowed, first-is-x). Divide and Make a square are built to their specs and
  verified against their computed tables: 20÷8 closes at 2.5, 20÷3 stops at
  ~6.66…, 20÷0 leaves the rectangle intact, 3÷5 is the remainder step;
  18 → 4 × 4 + 2 → 4.2 → 4.24 (last ring 847), 2 → 1.4 → 1.41, 16 finishes
  clean with no choice offered. Divide's leftover panel has three words and
  Make a square's has two, with nothing in the gap. Zero console errors.
  **Never deployed; frozen 1 Sep** as `prototypes/glass-panel-build-aug24.html` —
  the child-facing string print is in the session review and the voice gate still
  applies to anything that ports out of it.
- **Left unwired, reported not invented:** Multiply's **tap-a-number branch**
  (a tap in the field still says *start from a pane along the bottom or up the
  left side*); **where the product appears** (the instrument column's product
  box and the map's corner readout both carry it — placeholder); **what a
  rectangle does after it exists** (it stands until the next act — the file's
  existing "lit until the next act" idiom, not an answer); **the flip**, which
  the spec calls a gesture she chooses but never names, and which the Multiply
  story promises in words; Divide's **fractional divisor** (the bar snaps to
  whole units, the zoom unlock is a hook). **Build's five sub-tools and
  Properties' six are intact in code and have no word on the surface** — the
  fourth dormant path this thread has produced, and deliberate: the rail holds
  the one entry the prompt named.
- **Reviewed 26 Aug (Cowork design session):** `01-ACTIVE/Review-Glass-Aug26.md`.
  Both builds driven headless and screenshotted. Finding: the 24 Aug build put the
  plane tools (Multiply/Divide/Make a square, tiles from the origin) on top of the
  Phase 4 table rendering (panes keyed by number, revealed everywhere) with no ruling
  on which one the lab stands on — two kinds of glass, three numberings, three
  readouts, panels over the origin, modes abolished on paper and alive in code. The
  specs are not wrong; the bench step was skipped. Proposal: rule *plane, table as a
  viewing*; freeze the 24 Aug file as a prototype; one bench per tool on `plane.js`
  alone; then a new lab file that starts empty. Awaits Michael's ruling.
- **Ruled and walked, 26 Aug (evening):** plane, not table — Michael: the founding
  question is what a thin slice of spacetime can show; the table is a viewing. The
  walk restarted and settled Multiply, Divide and Make a square in one session:
  `01-ACTIVE/Walk-Glass-Aug26.md` is the ledger. Its spine: she drags the 1 and the
  unit stretches into the rectangle (the bar is gone); the twin rides fainter with
  its numbers exchanged; release leaves only the corner tile, product written on it
  — numerals earned at the moment of making; tiles always read the place, answers
  are heights and live on the axis named by their route; division puts tiles between
  the lines; squares mark the diagonal with a line at height √N labelled N; **the
  mark is the memory — tapping any mark replays its making** (the reserved tap);
  resolution is zoom, no control; undo goes all the way back, which brings the
  operation log and answers the parked record question; the Make-a-square pause and
  the Leave it / Decimals gap stand. Clean slate: Fill/Clear/Show numbers/Hide
  map/tie/axes words all gone; one membrane list (Multiply · Divide · Make a square
  · Primes · Properties · Fill/Clear), panels open below it, never over the map.
- **Frozen and cleared, 1 Sep.** The week-old uncommitted state is gone. The 24 Aug
  build is saved whole at `prototypes/glass-panel-build-aug24.html` (not served —
  `prototypes/` sits outside `cw-deploys/`), and `active/glass-multiplication.html` is
  restored to the deployed 13 Aug lab, `CW_VERSION 2026-08-13 b32d541`. **Nothing new
  deployed and no code changed**; the 13 Aug lab stays live through the rebuild, per the
  review's recommendation. What ports forward out of the frozen file — the **Building
  Numbers** rail, the window component, the story windows with the verbatim
  `Stories-First-Set-Aug24.md` text, the choice panel, Divide's and Make a square's
  leftover grammar — is listed in `cw-deploys/MANIFEST.md`; the file as a whole does not,
  because it stands on both substrates and the ruling is plane. Landed in the same commit:
  the three tool specs, the panel prompt, the story set, the review, the walk, the reader
  brief, the Frankenstein-11816 constellation and the chladni seed — nine days of vault
  work that had never been in git. This completes step 2 of `Review-Glass-Aug26.md`'s
  order of work; step 3 (one bench per tool, on `plane.js` alone) is next, gated on the
  walk below.
- **Multiply benched, 1 Sep** — `cw-deploys/experiments/multiply-bench.html`, the
  first of the review's step 3. One tool, `plane.js` and nothing else, **no table
  code**: the plane, one white unit tile at the origin with its numeral, and a
  panel holding Show/Hide duplicates and Undo. Touch the 1 and drag to multiply;
  touch elsewhere to pan; pinch or wheel to zoom; tap a tile is reserved and does
  nothing. The twin rides across the diagonal fainter with its numbers exchanged;
  the live width and height sit on their own sides inside both rectangles; no
  product during the drag. Release leaves only the far-corner tile, unity glass,
  product written at the moment of placing. Undo goes to empty, then the word
  fades. No grain control — the finger takes whatever rung of the 1–5–10 ladder
  is on screen, and products are exact integers over a power of ten. Registered
  in `MANIFEST.md` and `experiments/index.html`. Zero console errors; driven
  through builds, twins, squares, hide/show, undo-to-empty and a tenths build at
  desktop, tablet and phone sizes.
- **What the first drive showed.** Two of the four questions half-answer
  themselves on screen: build 1×2, 2×3, 3×4, 4×5 and 2×2, 3×3, 4×4 and the
  squares run up the crease with the pronics paired either side of it — a map,
  not scatter — and the product numeral is comfortable at the greeting zoom.
  **And one question nobody asked arrived:** plane.js draws a lattice rung only
  while its lines clear 40px, so **tenths exist only above ~400px per unit**, and
  at that zoom a stroke from the origin reaches about x = 2 on an iPad. The
  walk's own illustration — 6.3 × 2 = 12.6 — needs roughly 2 500px of run and
  **cannot be drawn on any screen this project targets**. 1.3 × 2 builds and
  reads 2.6, exactly; 6.3 × 2 is unreachable rather than wrong. Nothing was
  invented to cover it (no edge auto-pan, no second anchor, no grain knob) —
  each is a decision the walk has not made. Note the walk's step 3 already says
  it is *division* that puts tiles between the lines. **Also visible:** a tile
  keeps the cell size of the lattice that minted it, so decimal tiles are
  unreadable specks once she zooms back out to whole numbers — which is the
  walk's own step 4 bench question (*unit tile scaled to grain, or small pane?*)
  arriving with a picture attached.
- **Left open in the bench, on purpose:** redrawing a rectangle that already has
  a tile places nothing (the walk's two candidates — toggle off, or replace —
  are both still live); tap-to-replay is wired to a hit test and a named no-op,
  because replay wants the operation log and the bench has none.
- **Second pass, 1 Sep evening — Michael's own bench pass, six changes, all in**
  (`c29439c`). **Three reverse earlier writing and the vault has not caught up:**
  (i) **Hide duplicates keeps the lower tile** — width ≥ height, whichever
  rectangle her stroke drew — so what remains is one tile per unordered pair of
  sides, and a stroke above the diagonal leaves its mark mirrored below it
  (his accepted consequence). Built as a *viewing*: both tiles are always
  minted, hiding only chooses which shows, so Show duplicates can never reveal
  pairs for some builds and singletons for others. (ii) **Squares keep the
  white; everything else is grey**, base `#DCDCDC` as he declared it. This
  narrows the walk's *colour says built by her* to a finer single declaration —
  **on the crease, or off it** — and it is the strongest thing on screen: the
  diagonal reads as a bright line through the map without a word.
  (iii) **The reserved tap has a body** — tapping a tile shows the rectangle
  that minted it, outlined in the drag's style with its two side numerals. That
  is the still half of walk step 6; the animated replay still waits for the log.
  **Added:** Home (returns to the greeting, fades when she is there), Clear
  (sweeps her composition — the Primes sense of the word, not the global Clear
  step 2 abolished), and numerals drawn in their own pass newest-first so the
  oldest end on top.
- **Two things the second pass did not foresee, left standing:**
  **(a) Changes 1 and 6 collide.** With duplicates hidden, the surviving mark
  is the mirror, and tapping it shows *its own* rectangle — stroke 2 × 6 and
  the mark at (6,2) replays as 6 × 2, a rectangle she never drew. Coherent with
  tiles-read-the-place; but *the mark is the memory* reads differently when the
  memory is of the reflection. The alternative — a mirrored tile remembering
  the stroke that caused it — makes two tiles at one place disagree about their
  own sides. Owed a ruling. **(b) Clear takes the undo ledger with it**, so it
  is the one act in the bench with no way back. Making it undoable is one line
  and deliberately not written, because the prompt drew Clear and Undo as a
  contrast. Owed a ruling.
- **One gloss flagged, not repeated.** The pass called the hidden-duplicates set
  *the unique products of the table: 55 in a 10×10*. The count and its
  triangularity are right; they are 55 **rectangles**, not products — 12 lives
  at (12,1), (6,2) and (4,3), and a 10×10 holds **42** distinct products. That
  exact slip is already in `00-DECISIONS`' Corrections, dated 19 Aug, caught the
  same way. Nothing in the behaviour depends on it. Recorded here because the
  ledger exists so it is not asserted a third time.
- **Next action:** four rulings owed on the bench, in this order — the
  reach-versus-refinement finding (it gates whether Multiply owns decimals at
  all), the mirrored making, whether Clear is recoverable, and the two still-open
  items from the first pass (redraw, and the decimal speck). Then the next two
  benches, Divide and Squares, on the same terms. In parallel the walk resumes at **Primes** (colour's arrival; the 24 Aug
  prime-button entries are decided but unbenched — read them cold first), then
  Properties, the table viewing, fractions-as-triangles, and Divide's open modes
  question. Benches before any lab build. Still standing from the 24 Aug report:
  the string print and four judgement calls (the *Make a square* prompt string against its own spec;
  Explore not clearing the glass; the story window's title; the rail entry
  toggling). Then the three Multiply Opens, which gate most of the catalog.
  Then a word for Build and Properties, or a decision that they go.
  Also still owed: the walk's unwalked sections (§3 chips, §5 viewing strip,
  §6 readout, §7 odds and ends); Michael's iPad pass; the map-reveal bench when
  Michael has knob-time. Standing owed: 16th workshop, inner-came value.

### 2. Perception Lab — the child's own instrument
Colour, pitch, and rhythm discrimination. One measurement harness, three axes.

- **Four prototypes already exist** in `_CW/artifacts/`: colour JND, colour memory,
  flash recognition (subitising), and the Albers grey squares. This is far more built
  than anyone thought this morning. Ideas are salvageable; interfaces are not.
- **The real blocker is not a tool, it is `S3` — the reading store.** Append-only,
  timestamped, per instrument, exportable, never rendered as a score or streak. Small,
  and it is what turns five orphan prototypes into a constellation.
- **Spec drafted 12 Aug (evening):** `20-SPECS/Spec-S3-Reading-Store.md` — append-only,
  one store per instrument, reading unit `(value, t, u?)` with uncertainty optional
  (Michael's decision, same session). Awaiting his read.
- **Next action:** Michael reads the spec; then put S3 under one instrument — the colour
  JND prototype is the candidate — and a reading becomes a series.

### 3. Vault truth repair — mostly done 2026-08-05

**Done:** `Current-Status.md` and `Next-3.md` archived with their dates. `CLAUDE.md`
opens with a Read This First block pointing here. `00-START-HERE.md` rerouted.
`Session-Protocol.md` flagged stale rather than silently rewritten. `03-SEEDS/`
established with a closed facet vocabulary. `99-IDEAS/` closed to new writing but
deliberately **not** archived — it still holds unmigrated live threads.

**Still owed:**
- ~~Register the three benches in `MANIFEST.md`.~~ **Already done** — commit `93417d0`,
  before this board entry was written. The owed item was stale, not undone; struck 7 Aug.
- ~~`CLAUDE.md`'s file-layout and "current design" sections still describe March.~~ **Done 12 Aug (evening):** Architecture, Current Design and File Layout rewritten; design description replaced with pointers to this board and the ledgers, dated and expected to stale honestly. Key Specs now leads with the Interface Standard.
- `Session-Protocol.md` needs an honest rewrite once the new rhythm has run a few sessions.
- **A third batch of untracked documents surfaced and was migrated, 23 Aug** — nine
  map-tool documents, into `CWVault/claude/`; the thread now has a board entry under
  Parked — warm. The pattern is not the vault's structure: it is that work done inside a
  Claude Project has no path onto disk unless someone carries it. **`MANIFEST.md` was
  deliberately not widened to cover it** — its scope is the publish directory, and a
  second file describing what exists is the failure this session was fixing
  (`00-DECISIONS.md`, 23 Aug). The board carries the registration alone.
- Obsidian views over `03-SEEDS/` — the facets are inert until something queries them.
- **`_msc/_mscVault/` is a second vault this board cannot see.** At minimum the Claude
  Design folder is load-bearing for CW. Decide whether it moves, is linked, or is indexed.
- **Next action:** decide what `_msc/_mscVault/` is to this vault — moved, linked, or
  indexed. The Claude Design folder there is load-bearing for CW and this board cannot
  see it.

---

## Parked — warm

**Frankenstein-11816 constellation — the Timeline's first patch (30 Aug, from an iPad
chat; nothing built).** Twenty-one nodes and thirty-two claim edges (second pass 30 Aug added Sophie Germain, Ada Lovelace, Chladni's plates, Darwin's "I think" diagram, Jane Marcet, and a proposed `hidden-names` thread — Mary anonymous, Germain as LeBlanc, Ada as A.A.L.; plus `03-SEEDS/chladni-bench.md`, Eileen's simulation idea, buildable) in
`02-CONSTELLATIONS/Frankenstein-11816/`, written to the node schema in
`20-SPECS/Spec-Timeline-Graph.md` §4–5 and carrying the seed facets, so each file is a
seed and a node at once. Tambora → year without a summer → Diodati → the wager →
*Frankenstein*, with Galvani, Volta and Aldini arriving from the electrical side;
Erasmus Darwin is the door to the biomorph sims, the ice-core node the door to Numbers.
Same-year kinships are deliberately unwritten — they are facet edges and fall out of
`era`. Design decisions from the same chat, not yet in `00-DECISIONS.md`: the dashboard
opens on ~six story icons chosen to cast a wide net, and **a child must find something
she likes within three clicks**; stories declare what they *touch*, never what they
teach; the child's trail is disposable and her made things are what is kept — no server
ledger, no recovery scheme; the story format is markdown files in the repo, and the graph
is whatever falls out of their headers. Added 31 Aug: a **visited-nodes list the child
can always reach** (candidate: permanent in the left column, near Remember) — knowing
she can get back to Frankenstein makes her likelier to risk the click on Gauss, and it
softens the wiped-disk/new-machine case with no server state at all: the graph is the
same for everyone, so remembering one name puts her back at the center of a network she
has seen. Implies **search**, which is also how a story travels between friends.

- **Authority:** `02-CONSTELLATIONS/Frankenstein-11816/Frankenstein-11816.md` (hub) ·
  `edges.yaml` · `nodes/*.md`.
- **Wants Michael's decision:** `threads` as a new facet (proposed in every node; **not**
  in `Facet-Vocabulary.md`, and not to be added silently). Whether Beethoven enters at all
  (left out — the Tambora link is thin).
- **Next action:** Michael reads the hub, `sophie-germain`, `aldini-london`,
  `how-we-know-tambora`, and `01-ACTIVE/Brief-Reader-Prototype-Aug31.md` (the reader
  prototype brief — visited trail, my list, search, asides) and says whether the grain
  is right. Then either the Timeline gets its first data or the
  dashboard's six icons do.

**Map tools — the number map and what can be done to it (19–22 Aug).** A thread this
board has never carried a line for, because it happened entirely inside a Claude Project
and produced nine documents that were in **neither git nor the vault**. Migrated
23 Aug into `CWVault/claude/`. Third instance of the same failure — five vault documents
on 2 Aug, the whole vault restructure on 5 Aug, these nine now.

The content: a **catalogue of tools that can be applied to the number map**, each with
the uses it unlocks. Nine entries, **T1–T9**, none of them built — light up every cell
that…, wrap the numbers into n columns, hold a rectangle and drag its corner, peel
squares off a rectangle, colour the plane by a property, the orchard, add two trees
(mediant/Farey), change what a cell is worth, hold the perimeter. The organizing spine is
the roadmap's **Twelve Acts**: a tool belongs on the list only if it is something you
*do* to the plane, which is what keeps it twelve acts rather than forty topics.

- **Authority:** `claude/Map-Tool-Catalog.md` — **single source for map tools**, and the
  only one of the nine that is. `claude/Voice-Samples-Map.md` — the register.
  `claude/Modular-Arithmetic-for-Kids.md` — modular arithmetic sorted by how soon a child
  can have it; not superseded, and it arrives at T2 from the other side, arguing *wrap the
  numbers into n columns* pays for three of the best patterns on its page and should be
  built first. The two long-form documents the catalog links to and which are believed on
  detail,
  `claude/Fog-Map.md` (why the plaid is separable, and where π falls out of counting) and
  `claude/Irrationality-on-the-Map.md` (incommensurability as the heights no ray reaches).
  Four more carry a `superseded:` line pointing at the catalog and are kept for history
  only: `claude/Rectangle-Tool-worknote.md`, `claude/Map-Tools.md`,
  `claude/Map-Tool-Roadmap.md`, `claude/Map-Regroup-Aug19.md`. That ordering is the
  standing table in `00-DECISIONS.md`, not a local convention.
- **Three gates, and the third is the real one.** A tool is Draft until: the gesture is
  one sentence (if it takes a paragraph, it is two tools); every claim is **computed, not
  remembered**; and the kid-voice paragraph exists. **Nothing goes to Claude Code until
  Michael has read that paragraph and it landed** — gate 3 is also the comprehension
  gate. A paragraph that will not come out clean costs an hour; a built tool that cannot
  be explained costs a month.
- **Gate 2 has already caught two things**, both now standing in `00-DECISIONS.md`'s
  Corrections section rather than being quietly fixed: a 10×10 map holds **55 rectangles
  but only 42 distinct products** (the gap is the collisions, and is itself worth
  showing); and the idea that a constant-area drag would *settle* into √N by perimeter
  friction is **true but useless** — at N = 53 the perimeter 0.28 away from the root sits
  0.077% above its minimum, far too shallow to feel. **Drive the detent from the
  difference between the sides, |x − N/x|**, which is 0.571 at x = 7 and falls cleanly to
  zero. That is an interface instruction, not a footnote.
- **T8 and T9 appended 23 Aug** from `01-ACTIVE/Map-Tool-Catalog-Additions-Aug22.md`
  (now `status: merged`), verbatim with their computed tables and voice paragraphs. T8 —
  *change what a cell is worth* — carries the thread's strongest single observation:
  a 10-wide map at tenths and a 100-wide map at integers are **the same grid, same pixels,
  same picture**, and one holds 100% of its numbers while the other holds 29%. Nothing
  changed but what a cell was declared to be worth. T9 — *hold the perimeter* — is T3's
  dual: fix the fence and area peaks at the square, fix the area and perimeter bottoms out
  there. **Both are still Draft; neither voice paragraph has had Michael's read.**
- **Held back on Michael's instruction:** *sum the rectangle's contents* (origin-anchored
  blocks total the sum of cubes, always a perfect square). May be a use under T1 rather
  than a tool of its own. It stays in the 01-ACTIVE additions file, unmerged.
- **Michael's decisions, 22 Aug** (all on record in `00-DECISIONS.md`): the walk restarts
  and **its first step is handles-versus-menu**, because everything else in the interface
  inherits from that choice; **the walk designs the container, not the membership** —
  stress-test the architecture against roughly thirty tools while seven are catalogued,
  since what is expensive to change is how many collections exist and where explanation
  lives, and which tools sit where is cheap; the seventeen-tool list is available as the
  stress test; deploy when a child could do something she could not do the day before,
  **not once per session**; and **sound is a separate project and does not belong on this
  thread**.
- **Where this lands:** Glass Multiplication's rescoped **Explore** (Moving #1, the walk
  opened 13 Aug) is the surface these tools arrive on — Restack and Make Square are
  already division and square roots as physical acts, which is T3 and T9 under other
  names. The two threads should be read together before either is built.
- **Open, and deliberately so** (from `00-DECISIONS.md`): a **base-six map** — the
  arithmetic is easy, the symbols are the problem, since 101 does not look like five; and
  whether the real-number plane, polar and spherical maps arrive at all, held until each
  can be shown to delight rather than merely generalise.
- **The documents arrived with their markdown stripped, and the repair is a second
  commit.** `pbpaste` captured the *rendered* preview, so the syntax was gone before the
  files existed: frontmatter flattened onto one line, headings and lists reduced to plain
  paragraphs. The frontmatter was rebuilt on migration by splitting at the known keys —
  **every value is original, the structure is inferred**, and that is on record in
  `00-DECISIONS.md`'s Corrections. Restoring headings and lists is the same inference at
  larger scale: **it is reconstruction, not repair**, done conservatively, with anything
  ambiguous flagged rather than guessed. The migration commit stays mechanical; the
  restoration follows it.
- **Next action:** Michael reads T8's and T9's voice paragraphs — gate 3, and the gate
  that governs whether anything reaches Claude Code. Then handles-versus-menu, as the
  walk's declared first step. *Candidate for Moving; it reads like a moving thread and is
  parked only because Moving already holds three, and which one drops is Michael's call.*

**Artifact salvage.** ~23 downloaded artifacts, 8–10 months old, inventoried 5 Aug.
Ideas worth keeping, interfaces uniformly not. See `03-SEEDS/artifact-salvage.md`.
*Next: nothing wholesale. Each entry becomes a seed when a session touches it.*

**S3 — the reading store.** Promoted into Moving #2 above; listed here because it is a
substrate in its own right and other things will want it.

**Anchor years and the implicit timeline (T1).** A small set of dates the system quietly
returns to, never announced; precision as a choice about zoom level. 11895 already
seeded; ~11800 is the strong second (the metre in the Archives, Volta's pile, Herschel
past the red, Young's slits, Thénard's cobalt). *Next: decide the T1/T3 merge below.*

**T1 + T3 are probably one project.** The timeline and the wonders dashboard are the same
tiles with one axis added — sortable by year, by domain, by hook. Flagged in the
inventory as cheap to decide now and expensive in six months. *Next: decide.*

**Deep time / continental drift (M12).** Structurally the same object as T1 at a
different zoom. Build once, not twice.

**Sound Series** (was *Music for Physicists*, and absorbs *MIDI keyboard input*).
Promoted from two parked lines to a Series in its own right, 8 Aug. Not music
appreciation and not notation instruction: what sound is made of, with instruments a
child plays. **Two working instruments, committed but not deployed** — staged as
`prototypes/janko-lattice.html` (touch) and `prototypes/janko-midi.html` (Mac, Web
MIDI, Chrome only), deliberately outside the Netlify publish directory until the
Series decides its opening; they are not publicly reachable. Twelve tones, two tiers
of six, all one colour; home is chosen and marked rather than baked in; the scale
shape is rigid and slides.

*Settled this session:* **no traditional notation anywhere in this Series** — no
letters, sharps, flats or staff. The replacements are steps from a chosen home (0–11),
ratios, and Hz. Three scales are enough (major, natural minor only, pentatonic), plus
shapes she builds herself. Culture arrives attached to a tool, never as context ahead
of it.

*The argument the Series is built on:* ratios and equal steps are two valid,
incompatible understandings of the twelve, and **the gap between them is audible** as
beats. That makes the 531441-against-524288 near-miss a measurement rather than a
fact to be told. Same shape as the walking stick.

*Why it is worth building soon:* sound puts time on one axis and frequency on the
other — different kinds, one wanting a log scale. It is the hardest test the shared
plane has been given.

*Counting, not waves (25 Aug).* Michael's objection, and it was the right one: before a
child can meet ratios through waves she has to understand frequency as a wave and read a
sine curve as a picture of pressure — a long prerequisite chain for an idea that does not
need it. **Waves are deferred to timbre**, where they are genuinely required and where she
will want them by the time she arrives. Two clicks at 6 against 5 is a polyrhythm,
countable, no waves involved; one speed knob then carries the same two numbers across the
boundary where rhythm becomes pitch. This collapses the tapping bench and the pitch axis
into **one instrument at two speeds**, and makes the band between roughly 8 and 20 per
second — neither rhythm nor pitch — a place to sit rather than pass through.

- **Authority:** `01-ACTIVE/Sound-Series-Aug08.md` (the full session, decisions and
  inventory) · `01-ACTIVE/Sound-Rhythm-Roll-Aug21.md` (the roll, the tapping
  bench and colour) · `01-ACTIVE/Sound-Counting-Bench-Aug25.md` (ratios by
  counting; the bench as built) · `03-SEEDS/story-with-instruments.md` (the new
  story form).
- **Bench built and deployed, 25 Aug:** `experiments/six-against-five.html`, listed in
  `experiments/index.html` and registered in `MANIFEST.md`. Speed 1.5–330 per second,
  log, with the track ticked at both boundaries. **Both voices lay down one identical
  click** and differ only in rate, so the tone at the top was never introduced — it
  assembles itself out of repetition. Seven ratios, 2:1 through 45:32. Audio is a looping
  buffer rebuilt one full pattern long on every change: nothing resampled, no scheduler.
  Standalone — it does not stand on the plane. **Carries its own reading below the
  instrument**, the first extended sample of the child voice for this material, which is
  why it is one page and not two.
- **Second pass the same day, and the corrections are the session's best material.**
  Michael tested it by ear and disproved three things the page asserted with confidence.
  **(1) The fraction is not the sound** — 7:5 and 45:32 land about 8 cents apart and are
  one interval wearing two labels, so simple ratios cannot be the *cause* of consonance;
  every interval has a tidy-looking fraction sitting closer to it than anyone can hear.
  The famous fractions are where the sweet intervals *are*, not why. **(2) Consonance is
  not fusion** — a fifth stays two notes, and Michael's line about the octave, *"I think
  I can still distinguish the two notes, but there is no question they are the same
  pitch"*, is height and chroma arrived at by ear and should be used verbatim.
  **(3) Roughness lives in the partials and identity does not** — interval identity
  survives brightness at minimum, so one knob separates two things that had been treated
  as one, and **brightness is promoted from a comfort control to the roughness control**.
  A ringing he heard above ~1200 Hz was a **real defect, found by ear from its character
  and its dependence on a control**: the click was being truncated at the loop seam, and
  clicks now wrap around the buffer end. Any claim gathered from this bench before the
  fix is suspect if brightness was involved.
- **What the second pass added to the instrument:** a **click-pitch** knob, 400–4200 Hz —
  1850 was a constant chosen by feel that shapes what you hear, which is exactly the case
  Aug 8's rule covers — and a **piano strip** under the dot rows, with a continuous marker
  at each voice's exact pitch, the nearest key lit only within 15 cents, and a cents
  readout. It is **designer-facing**: the letter names are deliberate and are *not* the
  child-facing scheme, which stays open until the all-white axis exists. Side effect worth
  keeping: tap a key with 3:2 selected and the faster voice reads **+2¢**, so equal
  temperament announces itself in the corner of the screen with no words at all.
- **The colour ruling gains a limit.** The prime colouring says how a note is *built* out
  of home; it does not predict how a pair will *sound*. Those are different questions, the
  bench separates them cleanly, and any copy that lets colour stand in for consonance is
  wrong.
- **Open at the bench:** **does 3:2 stay clean at full brightness on the fixed build?** —
  the one control not yet run, and if it does not the click is too bright and wants fixing
  before anything further is concluded. Whether brightness still earns its slot now that
  click pitch exists; whether 15 cents is the right lighting tolerance and the strip the
  right size; no tapping — and since calibration is the front door (21 Aug), the tapping
  version probably matters more than the ratio picker does; no door yet onto hearing a
  true ratio against equal temperament, though the +2¢ readout is half of one; whether the
  strength-by-simplicity gradient on the prime colours earns its keep; whether home should
  be uncoloured rather than sharing blue with the octave.
- **Next action:** run 3:2 at full brightness on the fixed build — it is one listen, it
  is the only knob not yet turned, and a bad answer invalidates the roughness material.
  Then the **tapping** version, which the 25 Aug session argues matters more than the
  ratio picker does. Also owed: the band between roughly 8 and 20 per second still wants
  sitting in. What opens the Series is still undecided; the beat-tuner remains argued for
  — the only instrument where she measures with her ears and gets a number back.
  Michael's voice pass on the two live pages' copy still has not happened; the bench's
  reading has had one and is the reference sample.
- **Open, cheap, unresolved:** does iOS Safari support Web MIDI? A one-page
  device-listing probe settles whether the iPad is a music device.
- **Open:** `sound` is not a value in the `lab` facet. Only Michael approves one;
  seeds use `lab: none` meanwhile.
- **Open:** whether `experiments/sound-workbench.html` and `experiments/prime-tones.html`
  belong to this Series or stay interface work. `prime-tones.html` is in
  `experiments/index.html` but **missing from `MANIFEST.md`**.

**The story that hands you the instrument.** A story form, not a lab item: the
narrative does not advance until the child has made a judgment about a physical
quantity — the mallet in Issun-bōshi has to sound right for what is happening, and as
he grows the pitch must fall. Distinct from choose-your-path, which is consumption
with a button. Never told whether she got it right. Two or three such moments in a
whole story, no more. *Next: name it. `03-SEEDS/story-with-instruments.md`.*

**Continued fractions (M5).** Two React prototypes exist. This is the Euclidean algorithm
as a geometric act — the incommensurability thread from Shortest Paths, already half
built without either of us noticing. *Next: needs the plane, then port off React.*

**Random walks on a lattice (M4).** Reconceived: not coins falling into a bell curve, but
walks coloured by property — return to origin, first crossing, quadrant time,
self-intersection — producing images worth keeping. The distribution is a by-product she
may or may not notice. *Next: needs the plane; cheap after.*

**Shortest Paths constellation.** Ten chapters developed in full in conversation, still
only in chat history. *Next: write it into `02-CONSTELLATIONS/` before it evaporates.*

**Story panels (S2).** Overlays preserving lab state, loading on demand. Explicitly out
of scope for the plane plan. *Next: waits.*

**What claims timbre.** Reserved, unspent; out of scope in the plane plan. The Perception
Lab is the obvious claimant and should not take it by accident.

**Maya's unasked-for door.** The rule for offering a story nobody requested. Needs
writing before it needs code.

---

## Parked — cold

Real, wanted, not soon.

- Van Gogh pigment cluster (M6) — chemistry written, needs art rights
- Biomorphs (M7) — keep as a **tone reference** as much as a project; the one old
  artifact that does not talk like a teacher
- Hieroglyph builder (M8), stroke-order tracing (M9) — making tools in lesson clothes
- Planetary scale (M11) — nearly free once the plane exists
- Figure and proportion (M10) — only the Daumier caricature control is live
- Large Number Plane — not a separate item; it is the plane, further out
- Tiles / girih / quasicrystals; Cities and Buildings; Sets; Euclidean Proof
- Codes, Bases, Modulus — third Lab, confirmed direction, unspecced
- Scale Beam tool — spec predates the Redesign thesis; reread before touching
- Reference Atlas siblings — timeline-deep, temperature, size
- Maya integration (Layer 2) — spec complete, deliberately blocked
- Demo gallery (T4); tappable doors (T5)
- Remember / inscription — unbuilt, not broken; `#remember` captures nothing
- Netlify redirects for old bookmarked paths

---

## Standing method

**Read `MANIFEST.md` before reading any deploy file.** A stale copy at an old path once
cost a full day specifying something already shipped.

**A perceptual question gets a bench, not an argument.** Build the smallest thing that
can be looked at or listened to, keep it outside the lab, decide from it, leave it in
`experiments/` as the record of how the decision was made.

**Four things are often one thing.** The manager's first question about any new thread is
whether it shares a substrate with something already moving. Colour, pitch and rhythm are
one lab. T1 and T3 are probably one project. M12 is T1 at another zoom.

**An instrument is a different species from an interactive.** It keeps its readings, so a
child can say *I know this now and did not before.* The comparison must be hers to make,
never a verdict delivered to her.

**Diagnostic tells of school material** — every old artifact has at least three: it
announces what you are about to learn; it asks questions it already knows the answer to;
it congratulates; and it does one thing correctly and then stops, leaving nothing to mess
with. The mathematics is a property of the material, not a lesson wrapped around it.

**Every deployed page carries a version stamp.** A `CW_VERSION` constant (date +
the short hash of the commit it was built on top of) logged to the console on load;
shared scripts referenced with a `?v=` query; `_headers` makes pages revalidate.
Bumping `CW_VERSION` rides every commit that touches a page — the same rule as
MANIFEST. It exists because it does not help to test yesterday's work.
Established 13 Aug 2026.

**Child-facing copy prints in full at review.** Any commit that adds or changes a
child-facing string prints the complete current list — every string, both labs — in
the review summary, so Michael reads the whole voice at once, never a diff of it.
Established 8 Aug 2026 at the Phase 4 iPad review.

**Every session ends with a `git status` check, and reports anything untracked** —
whether or not that session created it. On 2 Aug five vault documents turned out to have
no recovery path; on 5 Aug the whole vault restructure, this board included, sat untracked
for a day. Both were found by accident. For any named file the verification is
**`git ls-files`, not `git log`** — `git log` on a directory returns commits and reads as
reassurance while the named files are absent from every one of them. Noticing without
reporting does not count. Established 12 Aug 2026.

**Every deployed page carries a version stamp — benches included.** A `CW_VERSION`
constant (date + short commit hash) near the top of the file, logged to the console,
updated in the same commit as the change, like MANIFEST. Shared scripts are referenced
with a version query (`plane.js?v=...`) so caches cannot serve a stale one. It does not
help to test yesterday's work. Established 13 Aug 2026, after a Safari cache muddied a
deploy check.

**Not now is a complete sentence.** Claude says it; the board catches what it was said to.
