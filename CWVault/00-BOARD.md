---
status: Live — the single place threads are parked
role: The board. One line per thread. Read first, written last.
updated: 2026-08-13 afternoon (the replay panel built per the amended brief §4 and verified; the library is content-only via models/constructions.json; committed, not pushed — four new strings ride the voice gate)
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
  replay and can eat a replayed step. **Committed, not pushed** — Play, duration,
  instant, and *tap skips ahead* are new strings; the print is in the session
  review and the voice gate applies.
- **Next action:** Michael reads the replay section of the build ledger and the
  string print, then says push. Behind it: the iPad pass (share sheet, pinch,
  VoiceOver), the model tool's summoning word, the reveal itself once its bench
  settles the tempo, **the 16th workshop** (the accessibility answer; Lane 8
  calls it the first post-extraction build) and the inner-came value that clears
  all six resting colours (`Decisions-Fills-Aug06.md`).
- **Known gap, decided worth a line here:** drop-loading a `.json` construction onto
  the canvas skips the work-in-progress check and silently replaces unsaved work. The
  New and Open words both guard; the drop does not. Pre-existing, found in the Phase 2
  sweep, not yet fixed anywhere.
- **Rotational tiling — a deliberate amendment on the bench.** The Phase 4 port ships
  panes identical everywhere (the old mirror transform is dead), and Michael's review
  proposes spending that: below the diagonal pieces stack bottom-up, above it rotated
  90°, squares rotated 45° along the diagonal — rotation, not mirroring; every pane
  keeps its pieces and order, turned like real panels in a frame. Recorded as an
  amendment to the design note's §3, **bench first** (`prime-glass` holds both
  schemes; the 45° squares are the untested part). `Review-GlassMult-Aug09.md`, Lane 4.

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
- Obsidian views over `03-SEEDS/` — the facets are inert until something queries them.
- **`_msc/_mscVault/` is a second vault this board cannot see.** At minimum the Claude
  Design folder is load-bearing for CW. Decide whether it moves, is linked, or is indexed.
- **Next action:** decide what `_msc/_mscVault/` is to this vault — moved, linked, or
  indexed. The Claude Design folder there is load-bearing for CW and this board cannot
  see it.

---

## Parked — warm

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

- **Authority:** `01-ACTIVE/Sound-Series-Aug08.md` (the full session, decisions and
  inventory) · `03-SEEDS/story-with-instruments.md` (the new story form).
- **Next action:** decide what opens the Series. The beat-tuner is argued for — the
  only instrument where she measures with her ears and gets a number back. Then
  Michael's voice pass on the two live pages' copy, which has not had one.
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

**Not now is a complete sentence.** Claude says it; the board catches what it was said to.
