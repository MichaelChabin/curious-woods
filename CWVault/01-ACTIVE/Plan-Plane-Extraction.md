# Plan — extracting the plane

For Claude Code. Written against `Inventory-GlassGeometry.md`, which is the reference
for everything asserted here about the current code. The reasoning behind these
decisions is in `_msc/_mscVault/5. Claude Design/1. Redesign.md`; this document is
instructions.

**Do not implement this in one pass.** It is four phases plus a set of benches. Stop at
the end of each phase for review. Phase 1 in particular should be reviewed before Phase 2
begins.

---

## What is being built, and why

Not a bigger multiplication lab. A **plane** that both labs stand on. Glass Geometry and
Glass Multiplication become two viewings of one coordinate space rather than two
applications that each own their own.

The plane owns: where you are looking, how world coordinates become pixels, the ambient
lattice and its adaptive step, zoom limits, and the pixel floor. The plane does **not**
know about primes, panes, products, constructions or glass. If it ever needs to, the
boundary is in the wrong place.

---

## Decisions already settled — do not reopen

1. **Canvas everywhere.** Multiplication's DOM grid of `<button>` panes and its SVG came
   overlay are a prototype convenience, not an architecture. It moves to canvas. This is
   a rewrite of its rendering, not a migration.
2. **World y is up.** Glass Geometry currently has no flip, so world y is down. It gets
   one. Note this is not "find the flip and reverse it" — it is adding a flip and then
   auditing everything that assumed there wasn't one. Number-theory-v1 is already y-up
   and is the reference.
3. **The plane owns view state.** `viewX/viewY/viewScale` stop being bare globals written
   from nine sites and become the plane's, behind an API. This is what lets zoom limits,
   the adaptive step, the pixel floor and scripted `zoom to 3` mean one thing everywhere.
4. **Three owners for what "unit" means, and no shared ownership.** The *unit interval*
   is geometry — two points, a measured distance — and stays in the model and the log.
   The *unit's name* ("this interval is one metre") is a label belonging to the lab. The
   *pixels per unit* is the view and belongs to the plane. The lab tells the plane its
   unit length; the plane never reaches into the geometry model to find seed points.
   `getAxisLabels()` currently does exactly that reach, and it is the boundary violation
   to remove.
5. **Rule and record meet at the click.** The ambient lattice is generated and never
   stored. Clicking a lattice intersection creates a recorded point — that is the moment
   possibility becomes history. Selecting an implied segment does not mint points. The
   rule: *an act enters the log when it makes something that was not already determined.*
   A saved construction therefore records its lattice settings (unit, step, viewing), not
   its lattice.
6. **Panes are regions.** A pane is not a cell with a pattern drawn in it. 12 is three
   filled regions — two blue, one gold — sharing a lead frame, cut and leaded exactly as
   geometry cuts and leads. Same came, same thickness, same fill machinery.
7. **The naming layer is formal.** A viewing supplies a function from lattice position to
   meaning. Multiplication says (3,5) is 15 because area. A sieve at width 10 says (3,5)
   is 35 because counting order — and in that viewing the grid width *is* the modulus, so
   dragging the width makes residue classes form and dissolve. Axes are a property of a
   viewing, not of the plane, and must be hideable.
8. **Stripe pieces are ordered smallest prime to largest.** This makes a pane's shape its
   factorisation, readable left to right, and gives a second non-colour channel.
9. **Palettes declare their own prime colours.** The child picks a workshop; the workshop
   knows what 2 looks like. She never assigns colours to numbers. One palette in the set
   is colourblind-safe (Okabe–Ito or IBM as a starting point) — presented as a workshop
   with a name and character like any other, **not** labelled as an accessibility option.
10. **Selection is in the lead; discovery is in the light.** Selecting a region thickens
    or brightens its came. Showing a set — all the powers of 5 — dims everything else
    rather than brightening the members. Neither is the current glow, which goes.

---

## Benches first

Per the method established by `experiments/prime-tones.html`: a perceptual question gets
the smallest thing that can be looked at, kept out of the lab, left in `experiments/` as
the record. Build these before Phase 1; two of them can change Phase 4's design.

**`experiments/canvas-panes.html`** — can canvas carry ~256 leaded panes of layered glass
at 60fps during a pan and a zoom? Geometry redraws its whole scene per frame but its
scenes are tens of objects, not hundreds of small gradient fills. If this fails, say so
before Phase 4 is designed.

**`experiments/fills-and-light.html`** — selection-in-the-lead and discovery-by-dimming,
on a filled table. The specific risk: at what opacity does a dimmed pane read as *quiet*
rather than *broken or off*? Find the value.

**`experiments/prime-glass.html`** — prime colours across three or four palettes,
ordered stripes, with a **monochrome toggle**. The question that matters: with colour
off, is the table still readable? If arrangement alone distinguishes 6, 10 and 14 — it
may need piece width or position as well as order — then colour carries delight rather
than information, which is a much stronger position than a special palette.

---

## Phase 1 — extract the plane from Glass Geometry

Produce a plane module. It may live in the same file initially; the boundary matters more
than the file layout.

**It owns:** `pan` (world point under screen centre), `zoom` (pixels per world unit),
`worldToScreen` / `screenToWorld`, zoom clamping, viewport dimensions, the ambient
lattice step, and the pixel floor.

**Specific things the inventory flags, to fix here rather than later:**
- `w2s` closes over the `canvas` element for `clientWidth/clientHeight`. The transform
  must be a pure function of world point and view state, with viewport dimensions held as
  state rather than read from the DOM. Number-theory-v1's `viewW/viewH` caching is the
  model.
- **Three zoom clamps with two ranges** — wheel and pinch are identical code written
  twice (0.1–10), `fitViewToConstruction` disagrees (0.05–2.0). One clamp, owned by the
  plane.
- `regX()`'s duplicate-point test uses a bare world constant (`< 5`) that does not divide
  by scale, unlike every other hit test. It does not track zoom. Fix.
- `note_open` stores `x,y` in world coordinates and `width` in screen pixels in the same
  record, with a `>= 100` heuristic to guess which. Pick one space.
- **Two live save paths** writing the same localStorage keys with different entry shapes;
  Cmd-S reaches the older one, the Save action word the newer. Consolidate.
- Saved entries carry a `viewport` block that `load` explicitly ignores. Either honour it
  or remove it.
- `collapseMenu()` is an explicit no-op. Remove.
- **Half-pixel snapping is applied to everything except the grid.** `snap()` is used at
  five sites — rectangle corners, diagonals, width highlight, both axes — and the grid
  loop strokes at raw fractional coordinates. This is what makes correctly-aligned things
  look misaligned, which on a plane where alignment is the argument is a serious defect.
  Snapping belongs to the plane and applies to everything it draws. Note `GRID_WIDTH=0.5`
  means grid lines are anti-aliased at any position; snapping reduces but does not remove
  the softness, so consider a 1px grid line at lower opacity.
- `user-select:none` and `-webkit-user-select:none` on the plane's container, plus
  `preventDefault()` on the pointerdown that begins a drag. Currently a circle-drag paints
  the whole document blue in Safari. This belongs to the plane, not to one lab's
  stylesheet.

**Also in this phase:** the y-up flip and its audit.

**Stop here for review.**

---

## Phase 2 — stand Glass Geometry back on the plane

No new features. The goal is proving nothing was lost: every tool, gesture, save, replay
and tip behaves as before, on the extracted plane, with y up.

The emergent-numbering model (`getAxisLabels()`) stays as it is, minus the reach into the
geometry model. *Numbers appear only where the child has constructed a point* is a real
idea and should survive as something the ambient grid can be turned down to reveal — not
as a limitation to be replaced.

---

## Phase 3 — the ambient lattice

Give the plane the numbered grid that Glass Geometry does not have, taking
`number-theory-v1` as the behavioural reference — its `labelStep()` drives labels and grid
lines from one function, which is why its texture stays coherent.

Extend beyond the sketch:
- Renumber **by decades in both directions**. The sketch caps at 10s and does not renumber
  on zoom in. Powers of ten, early.
- **All labels positive in all four directions.** Both existing files already do this
  independently; it is settled.
- **The pixel floor**, always present, reported in the lab's declared units — around a
  millimetre if the unit is a metre, around a nanometre if the unit is a micron. It is the
  screen's limit, not the plane's, and it is the only unconditional floor. Material floors
  (glass cutting, atomic) are the lab's business and depend on what it declared it was
  making.
- **Resolution tied to zoom, as a toggle.** Untied, finer resolution crowds more answers
  into the same space. Tied, the picture stops changing as she descends — self-similarity
  felt rather than asserted. Both are wanted.

---

## Phase 4 — port Glass Multiplication

Rewrite its rendering to canvas on the plane. Panes become regions; stripes become cut
and leaded pieces, ordered smallest prime to largest. The naming layer becomes a supplied
function. Axes become hideable.

Three things in the current file are the specific debt:
- `factorize` hardcodes `[2,3,5,7]` in two places.
- `primeInfo` is a literal keyed 2/3/5/7 carrying midi, note name and pan. Generalise to
  reach 19 — **not** to an open-ended scheme. Sound stops earning its keep past 13, or 19
  at the most, because its application is factoring.
- **27 lines carry a hardcoded 10** — grid template, loop bounds, the `/10` in the drag
  math, the came SVG's `viewBox="0 0 10 10"`. These do not get replaced with a variable.
  They get deleted, because the plane already pans and zooms.

Accessibility is a real cost of the canvas move and is called out here so it is not
discovered at the end: the 100 panes are currently `<button>` elements carrying
`aria-label="3 times 5 equals 15"`. On canvas that disappears. It needs an offscreen DOM
mirror or a keyboard-navigable focus model with live-region announcements. Plan it into
this phase.

Larger maps arrive here for nothing. There is no Map Size feature to build.

---

## Not in this plan

Remember / inscription (`#remember` currently captures nothing — a draggable label with
no handler, no storage, no relationship to the log; it is unbuilt, not broken). Story
panels. Scripting and "show me". The rhythmic practice queue. Negatives. Timbre.

Scripting deserves one forward note, because it constrains Phase 1: a script is an
operation log written by an author rather than a child, replayed with timing. `zoom to 3`
must mean the same thing in every lab for a script to be portable. That is only true if
the plane owns view state, which is decision 3.
