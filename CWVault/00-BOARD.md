---
status: Live — the single place threads are parked
role: The board. One line per thread. Read first, written last.
updated: 2026-08-08 (iPad-review fixes in; everything pushed; the voice pass now runs against live pages)
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

### 1. Plane extraction — Phase 1
Not a bigger multiplication lab. A **plane** that both labs stand on; the labs become
viewings of one coordinate space. Ten settled decisions, four phases, three benches.

> **Cleared 6 Aug.** The vault restructure, `artifacts/` and the three benches are
> committed and pushed; the benches are live. `Current-Status.md` and `Next-3.md` went to
> `99-ARCHIVE/` as renames, so their history followed them. **`git ls-files` remains the
> check** — `git log` on a directory returns commits and looks reassuring while the
> specific files are absent from all of them.

> **Phase 1 executed, reviewed and pushed, 7 Aug** (`8b5f25e`, live on Netlify). The
> plane is extracted: view state behind a `plane` API, pure transforms, one zoom
> clamp, world y up with the audit. Deviations and the legacy-mirror consequence:
> `01-ACTIVE/Decisions-Phase1-Aug07.md`.
>
> **Phase 2 reviewed and pushed, 7 Aug** (`1a5b089`). The dormant constructions
> panel is removed per Michael's ruling (`7e245a3`); the hands-on list (pinch,
> Share, iPad Safari) still stands in `01-ACTIVE/Decisions-Phase2-Aug07.md`.
>
> **Phase 3 reviewed and pushed, 7 Aug.** The plane has its ambient lattice: one
> step function, 1–5–10 ladder across decades, labels positive in all four
> directions, the unit frame declared by the lab, every stroke half-pixel-snapped
> at 1px from birth, tied/untied zoom, the pixel floor on screen. The Numbers
> control cycles map · points · off. Rulings recorded in
> `01-ACTIVE/Decisions-Phase3-Aug07.md`: the numbers default is **per-viewing**
> (Geometry rests at `points`; Multiplication is expected to default to `map`);
> the pixel floor speaks at the declared unit's natural scale ("about 4
> thousandths of a unit", or "about 4 mm" once a viewing names its unit —
> implemented); the control's home is provisional pending the Phase 4 viewing
> layer. **Owed before Phase 4 ships: Michael's voice pass on the remaining
> Phase 3 copy.** Deferred into the Phase 4 design: lattice-click minting
> (decision 5's second half).

- **Authority:** `01-ACTIVE/Plan-Plane-Extraction.md` (instructions) ·
  `01-ACTIVE/Inventory-GlassGeometry.md` (what the code actually contains) ·
  `01-ACTIVE/Decisions-Benches-Aug05.md` (bench results and the decisions they amend) ·
  `01-ACTIVE/Decisions-Fills-Aug06.md` (glass, light and lead — settled at the bench) ·
  `01-ACTIVE/Decisions-Phase1-Aug07.md` (Phase 1 as executed, with deviations) ·
  `01-ACTIVE/Decisions-Phase2-Aug07.md` (Phase 2 — the verification sweep) ·
  `01-ACTIVE/Decisions-Phase3-Aug07.md` (Phase 3 — the lattice, and its flagged defaults) ·
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
- **The open question that now gates Phase 4:** what is the second, non-colour channel?
  It is required, not desirable — several real palettes have fewer than six usable hues
  and cannot carry six primes however tuned.
- **The explicit instruction: stop at the end of Phase 1 for review.**
- **Phase 1 is not gated by the appearance work.** The benches gate **Phase 4**. Phase 1 is
  view state, transforms, one zoom clamp, the y-up flip and the save-path consolidation —
  none of which touches panes, primes, colour or stripes. Two corrections to its item list
  and one addition are recorded at the end of `Decisions-Benches-Aug05.md`; read them
  first, because one Phase 1 item (half-pixel snapping) describes a defect that is not in
  Glass Geometry at all.
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
- **Phase 4 implemented, 8 Aug — committed, not pushed.** The plane lives in
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
- **Next action:** Michael's voice pass over every child-facing string (the full list
  was printed at this session's review; the practice below makes that standing),
  against the live pages. Then: **author the 16th workshop** — with colour the sole
  prime indicator it is the accessibility answer, and it does not exist yet. Two smaller appearance items
  remain open in `Decisions-Fills-Aug06.md`: the 125% chroma gamut clip on 3 and 13, and
  an inner came value that clears all six resting colours.
- **Known gap, decided worth a line here:** drop-loading a `.json` construction onto
  the canvas skips the work-in-progress check and silently replaces unsaved work. The
  New and Open words both guard; the drop does not. Pre-existing, found in the Phase 2
  sweep, not yet fixed anywhere.
- **Also unresolved, and now bigger than it looked:** the mirrored-pane transform
  (`rotate(-90deg) scaleY(-1)`) contradicts decision 8's stripe order *and* the fills
  bench's texture rule, since a 90° rotation turns every "across" striation into an
  "along". The two halves of the table would be made of different glass. Decide before
  Phase 4.

### 2. Perception Lab — the child's own instrument
Colour, pitch, and rhythm discrimination. One measurement harness, three axes.

- **Four prototypes already exist** in `_CW/artifacts/`: colour JND, colour memory,
  flash recognition (subitising), and the Albers grey squares. This is far more built
  than anyone thought this morning. Ideas are salvageable; interfaces are not.
- **The real blocker is not a tool, it is `S3` — the reading store.** Append-only,
  timestamped, per instrument, exportable, never rendered as a score or streak. Small,
  and it is what turns five orphan prototypes into a constellation.
- **Next action:** spec S3. One page. It is the cheapest high-leverage item in the whole
  inventory and nothing in §2 of the inventory works without it.

### 3. Vault truth repair — mostly done 2026-08-05

**Done:** `Current-Status.md` and `Next-3.md` archived with their dates. `CLAUDE.md`
opens with a Read This First block pointing here. `00-START-HERE.md` rerouted.
`Session-Protocol.md` flagged stale rather than silently rewritten. `03-SEEDS/`
established with a closed facet vocabulary. `99-IDEAS/` closed to new writing but
deliberately **not** archived — it still holds unmigrated live threads.

**Still owed:**
- ~~Register the three benches in `MANIFEST.md`.~~ **Already done** — commit `93417d0`,
  before this board entry was written. The owed item was stale, not undone; struck 7 Aug.
- `CLAUDE.md`'s file-layout and "current design" sections still describe March.
- `Session-Protocol.md` needs an honest rewrite once the new rhythm has run a few sessions.
- Obsidian views over `03-SEEDS/` — the facets are inert until something queries them.
- **`_msc/_mscVault/` is a second vault this board cannot see.** At minimum the Claude
  Design folder is load-bearing for CW. Decide whether it moves, is linked, or is indexed.
- **Next action:** rewrite `CLAUDE.md`'s file-layout and current-design sections — they
  still describe March, and every new session reads them before anything else.

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

**Music for Physicists — the Jankó lattice.** Twelve tones, no sharps or flats, two rows
of six offset. A key becomes a position rather than a different object; transposition is
felt in the fingers. On-screen SVG, no hardware needed. Later beat with its own trigger:
slide up by seven twelve times and land almost home — 531441 against 524288, a near-miss
you can hear. Joins the drumbeat with 5-5-7 and 12-12-17.
*Next: nothing until Phase 1 clears. It has no dependencies, which is exactly why it can
wait without rotting.*

**MIDI keyboard input.** Web MIDI, no driver, roughly twenty lines; note to frequency is
440·2^((n−69)/12). *Next: a one-page device-listing probe to settle whether iOS Safari
supports it. Ten seconds, and it decides whether the iPad is a music device.*

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

**Not now is a complete sentence.** Claude says it; the board catches what it was said to.
