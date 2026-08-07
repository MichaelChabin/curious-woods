---
status: Current — awaiting Michael's review before Phase 4
role: Session ledger — Phase 3, the ambient lattice
date: 2026-08-07
---

# Decisions — Phase 3, the plane gets its numbered grid

Reported by Claude Code, 7 August. Executed against `Plan-Plane-Extraction.md`
Phase 3, with number-theory-v1 as the behavioural reference and the corrections
ledger's instruction that the half-pixel snapping fix lands here, with the
lattice, rather than being hunted for in Phase 1. Committed, not pushed.

## What the plane now has

**`plane.drawLattice(ctx)`** — grid lines and tick numbers driven by one step
function, the way the sketch's `labelStep()` keeps its texture coherent. The
lattice is generated and never stored (decision 5); no operation records it.

- **The step is the 1–5–10 ladder across all decades**: the smallest rung whose
  line spacing exceeds 40px — …0.05, 0.1, 0.5, 1, 5, 10, 50… It reproduces the
  sketch's exact choices in its home decade and renumbers by decades in both
  directions, as far as the zoom clamp lets it walk (with today's clamp and
  unit, roughly 0.05 to 5). Powers of ten, early.
- **All labels positive in all four directions** — settled, done. Integers
  group thousands with a thin space; sub-unit steps show as trimmed decimals.
  Label rows clamp to the viewport edge when their axis is out of view: the
  window is small, the map is not.
- **The unit frame is declared, not discovered.** `setUnitLength` grew into
  `setUnitFrame(originX, originY, unitLength)`: the lab tells the plane where 0
  sits (seed:0) and how long a unit is, at init replay. The lattice therefore
  lands exactly on the child's 0 and 1.
- **Snapping is right from birth.** Every lattice stroke — grid line and axis —
  is a 1px line snapped to half-pixels. The sketch's defect (everything snapped
  except the grid) cannot arrive here, and its secondary defect is fixed by
  construction: a 1px line at low opacity (0.13 grid / 0.30 axes) replaces the
  0.5px stroke that could never resolve crisply at any position.
- **Resolution tied to zoom, as a toggle.** Tied (default), the step adapts and
  the picture stays self-similar as she descends. Untied, the step freezes and
  zooming out crowds the same lines together — verified doing exactly that —
  until spacing falls under 3px, where the lattice stops painting ink. The tie
  is a transient view preference, not recorded in the log.
- **The pixel floor is on screen**: bottom-right, only in map mode — e.g. "one
  pixel = 0.004 units", live against the zoom. The lab has not yet named its
  unit, so the copy says "units".

## The Numbers control, re-homed

Per Michael's ruling with the panel removal: one word in the left panel, under
the action row, cycling three states —

- **map** — the plane's ambient lattice: grid, tick numbers, pixel floor. The
  emergent point-numbers yield to it (no duplicate labels where a constructed
  point sits on a tick).
- **points** — the lattice turned down to reveal the emergent numbering:
  numbers only where the child has constructed a point. Exactly the old
  `showNumbers = true` behaviour, and the survival the plan asked for — a
  reveal, not a limitation.
- **off** — neither.

Mode changes are recorded as `numbers` ops (undoable, replayable); legacy logs'
boolean values map forward (`true` → points, `false` → off). In map mode a
second word appears: "grid follows zoom" ↔ "grid keeps its step".

## Three defaults and wordings chosen by me, for review

1. **Fresh constructions default to `points`, not `map`.** The March framing —
   numbers are a property of space that geometry summons, the y-axis is earned —
   argues the ambient grid should be asked for, not presumed. One constant flips
   it if the plane should greet the child as a map.
2. **Copy written provisionally**: "Numbers · map / points / off", "grid follows
   zoom" / "grid keeps its step", "one pixel = 0.004 units". All of it sits in
   code awaiting the voice pass; none of it is in `text/geometry-v1.json` yet.
3. **The control lives inside the How-this-works block** so the existing layout
   engine accounts for its height. It is a control among help topics — tolerable,
   not obviously right.

## Deferred, deliberately

- **Clicking a lattice intersection to mint a recorded point** (decision 5's
  second half). Not in the plan's Phase 3 bullet list; it needs an op type and
  a snap policy, and it touches Phase 4's naming layer. Flagged as the first
  question for the Phase 4 design.
- **Label thinning in untied mode** — when the frozen step crowds, tick numbers
  overlap before the 3px cut-off silences them. Crowding is the lesson, but the
  soup between 3px and ~20px spacing could be quieter. Awaiting a look.

## Verified

Cleared profile, zero console errors: map mode shows the lattice with the axes
through seed:0 and the seeds landing exactly on lattice lines; zooming in
renumbers 0.5 → 0.05 with the readout tracking (0.004 → 0.0011 units); zooming
to the clamp renumbers up to step 5, labels positive in all four directions;
untied freezes the step and crowds; retying recomputes; the full mode cycle
records three `numbers` ops and the control label follows replay; `points`
restores the emergent labels; `off` clears everything; default look of a fresh
construction is unchanged from Phase 2.

One anomaly chased to ground and worth recording: during testing, two circle
ops appeared that exactly matched drag gestures from the *previous* page
session — the embedded test pane had already shown input-queue trouble, and a
clean reproduction of the full sequence produces no ops. Harness artifact, not
app behaviour; noted so nobody re-chases it.

## Stop

Phase 4 — porting Glass Multiplication onto the plane — does not start until
this is reviewed. Its gate remains the second channel, unchanged.
