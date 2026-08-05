---
status: Live — the single place threads are parked
role: The board. One line per thread. Read first, written last.
updated: 2026-08-05 (evening — corrected against Plan-Plane-Extraction.md)
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

> **UNCOMMITTED WORK — check before anything else.** As of 5 Aug evening the entire vault
> restructure is untracked: this board, `Facet-Vocabulary.md`, all of `03-SEEDS/`, both
> handoffs, and `artifacts/`. `Current-Status.md` and `Next-3.md` show deleted but
> unstaged; `MANIFEST.md` is modified. Six commits are unpushed, last push 3 Aug, so the
> three benches 404 on the live site. On 2 Aug five vault documents were lost this way.
> **`git ls-files` is the check** — `git log` on the directory returns commits and looks
> reassuring while the specific files are absent from all of them.

- **Authority:** `01-ACTIVE/Plan-Plane-Extraction.md` (instructions) ·
  `01-ACTIVE/Inventory-GlassGeometry.md` (what the code actually contains) ·
  `01-ACTIVE/Decisions-Benches-Aug05.md` (bench results and the decisions they amend) ·
  `_msc/_mscVault/5. Claude Design/1. Redesign.md` (the reasoning).
- **Benches:** `canvas-panes` **passed decisively** — 32×32 is 1024 panes and 3840 pieces
  at 2.4 ms p95, zero dropped frames. `prime-glass` **reports a problem**: with colour off,
  6, 10 and 14 are pixel-identical. `fills-and-light` **replaced a settled decision**:
  dimming is out, two declared palettes are in.
- **The open question that now gates Phase 4:** what is the second, non-colour channel?
  It is required, not desirable — several real palettes have fewer than six usable hues
  and cannot carry six primes however tuned.
- **The explicit instruction: stop at the end of Phase 1 for review.**
- **Next action:** commit and push. Then settle the second channel. Phase 1 does not start
  until `fills-and-light` reports.

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
- Register `canvas-panes.html`, `fills-and-light.html`, `prime-glass.html` in `MANIFEST.md`.
- `CLAUDE.md`'s file-layout and "current design" sections still describe March.
- `Session-Protocol.md` needs an honest rewrite once the new rhythm has run a few sessions.
- Obsidian views over `03-SEEDS/` — the facets are inert until something queries them.
- **`_msc/_mscVault/` is a second vault this board cannot see.** At minimum the Claude
  Design folder is load-bearing for CW. Decide whether it moves, is linked, or is indexed.
- **Next action:** register the benches. It is two minutes and it is the rule being broken.

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

**Not now is a complete sentence.** Claude says it; the board catches what it was said to.
