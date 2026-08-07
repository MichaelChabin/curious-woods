---
status: Current — awaiting Michael's review before Phase 2
role: Session ledger — Phase 1 of the plane extraction, as executed
date: 2026-08-07
---

# Decisions — Phase 1, the plane extracted from Glass Geometry

Reported by Claude Code, 7 August. Executed against `Plan-Plane-Extraction.md` as
amended by the corrections at the end of `Decisions-Benches-Aug05.md`. The plan's
instruction — **stop at the end of Phase 1 for review** — is honoured: the work is
committed, not pushed. Nothing has reached Netlify.

## What Phase 1 now is, in the code

`cw-deploys/active/glass-geometry.html` has a **THE PLANE** section — a closure
module named `plane` that owns view state (`pan` = world point under the screen
centre, `zoom` = pixels per world unit), the `worldToScreen`/`screenToWorld`
transforms, the single zoom clamp, cached viewport dimensions, the declared unit
length, the ambient lattice step, and the pixel floor. `w2s`/`s2w` survive as
one-line aliases into it, so the forty-seven call sites read as before. The nine
direct writes to the old `viewX/viewY/viewScale` globals are now API calls; the
globals are gone.

- **World y is up.** The transforms negate y; the pan drag flips sign to match;
  every canvas arc drawn from world angles flips (`arc(−aA, −aB, anticlockwise)`),
  in the live render and in all four export renderers, which previously would have
  mirrored every saved image vertically against the screen.
- **The transform is pure.** Viewport dimensions are plane state, set from
  `resizeCanvas()`; `w2s` no longer closes over the canvas element.
- **One zoom clamp: 0.05–10**, the union of the two old ranges, applied inside
  `plane.setZoom()`. Wheel, pinch, and fit-to-construction all pass through it.
  Fit previously capped at 2.0; a construction smaller than the screen now fits
  larger than it used to. If that cap was taste rather than accident, it should
  come back as fit policy, not as a second clamp — flagged for review.
- **The lab declares its unit** (decision 4's sanctioned direction): the `init`
  replay measures the seed distance and calls `plane.setUnitLength()`. The
  `getAxisLabels()` reach into the model is untouched — its removal is Phase 2,
  per the plan.
- **`latticeStep()` and `pixelFloor()`** exist on the plane, small and unused —
  Phase 3 is their consumer. The step is modelled on number-theory-v1's
  `labelStep()`.

## The list items, and two deviations worth reading

- **`regX()`'s bare `< 5` is fixed, but not by dividing by zoom.** The plan reads
  the constant as an unscaled hit test; it is actually the duplicate-intersection
  merge radius used **during replay**. Dividing it by `viewScale` would make
  replay zoom-dependent: the same saved log would mint different point sets — and
  therefore different segment keys, breaking recorded fills — depending on the
  zoom at load time, which differs per device by design. The fix keeps it
  view-independent and removes the magic number: it is now `_dupEpsilon`,
  2.5% of the seed unit, recomputed on every `init` replay (5 world units at the
  standard 200-unit seed — identical behaviour today, and sane if a log ever
  declares different seeds).
- **`note_open` records one space: world.** `x`, `y`, and the new `widthW` are
  all world units. The note box now scales with the view like everything else,
  and the exported wrap width is `widthW × export scale` — removing a real bug
  where the export's text layout depended on whatever zoom the child happened to
  be at when saving. Legacy logs: `width ≥ 100` (screen px) is adopted as world
  units directly — at the default zoom of ~1 px per unit that is what it meant;
  older world-unit values fall back to 200. Note boxes also now follow pan and
  zoom live (they previously updated only on the next operation).
- **Two save paths → one.** The older chain (`saveConstruction` → `showNoteUI` →
  `commitSaveConstruction`) and its `#cx-note-box` DOM/CSS are deleted. Cmd-S and
  the save-before-discard dialog route into `showSaveDialog`/`showSaveNoteBox`.
  The one thing the old path did right — snapshotting the log so a pending
  continuation (New/Open) can't wipe it while the child is still typing a name —
  is kept: `_pendingSaveLog`, consumed by `doSaveConstruction`, cleared by Cancel.
- **The `viewport` block is removed from saved entries**, resolving the
  written-then-ignored flag in favour of what `load` already decided: a
  construction always opens at the default view.
- **`collapseMenu()`** is gone.
- **`user-select: none` / `-webkit-user-select: none`** are on `#canvas` — the
  plane's container — closing the Safari select-and-paint hole for this lab. (The
  Glass Multiplication half of that fix lands in Phase 4, per the corrections.)
- **Half-pixel snapping was not touched**, per the correction: the defect lives in
  `number-theory-v1`, not here, and its fix belongs to Phase 3.
- **The came is marked platform-level.** `LEAD_BORDER_COLOR` and friends now sit
  under a LEADING header carrying the fills-bench rule — the came must hold
  contrast against light and dark glass both. The value is unchanged; choosing
  the shared value is open appearance work, not Phase 1's.

## One addition the bench environment forced

`resizeCanvas()` now tolerates a window that reports **0×0 at load** (embedded
webviews do this, delivering real dimensions later without a resize event): it
retries on animation frames until dimensions exist, then gives the view its first
real default. Both the old and new code rendered a collapsed construction in such
contexts; verified against the pre-change build, which failed identically. Inert
in normal browsers.

## Consequence to know before opening old work

The operation logs are untouched and replay to identical world coordinates, but
the y-flip means **anything saved before today renders mirrored across the seed
axis** relative to how it looked when drawn. The three canonical constructions
read correctly (the triangle now stands apex-up). Cached builtin thumbnails
regenerate under a new localStorage key so they match the new orientation.

## Verified

Syntax-checked, then exercised in a served browser: line and circle construction,
intersection detection, arc leading and region fill (the vesica lens cuts and
fills correctly, cames tracing the arcs), pan (sign correct under y-up), wheel
zoom, canvas note placement and scaling under zoom, Cmd-S → save-type dialog,
work-in-progress dialog, picker, builtin load and step-through replay. Zero
console errors across the session. Not yet exercised: pinch (same code path as
wheel through `plane.setZoom`), share, and the image export end-to-end — the
export renderers are flipped consistently but deserve one human look at a real
postcard before Phase 2.

## Stop

Phase 2 — standing Glass Geometry back on the plane and proving nothing was lost
— does not start until this is reviewed.
