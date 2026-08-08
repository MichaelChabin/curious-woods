---
status: Current — awaiting Michael's review; nothing ships before his voice pass
role: Session ledger — Phase 4 as implemented
date: 2026-08-08
---

# Decisions — Phase 4, Glass Multiplication on the plane

Reported by Claude Code, 8 August. Implemented per `Design-Phase4-Aug08.md` as
amended at the design review — **no second channel; colour is the sole prime
indicator** — and per the plan's Phase 4 list. Committed, not pushed.

## The ruling, recorded where it will be found

Colour alone carries the primes. That makes **the colourblind-safe workshop
the accessibility answer, and its quality load-bearing**: it must be authored
to the same standard as the artwork palettes — a workshop with a name and
character, never labelled as an accessibility option — and its six must hold
apart under the common colour-vision deficiencies, not merely to the median
eye. The schema now requires every workshop to declare six distinguishable
prime colours (`20-SPECS/Spec-Workshop-Palette-Schema.md`). The 16th workshop
does not exist yet; authoring it is the single largest open item this ruling
creates. Subdivision is parked as `03-SEEDS/subdivision-viewing.md`.

## What was built

**`js/plane.js`** — the plane extracted to one shared file, a classic-script
factory (`CW.createPlane(opts)`, `CW.snap`) with a per-lab default-view policy;
that policy was the one piece of Geometry baked into the plane. Geometry swaps
its inline section for the shared file; behaviour verified identical.

**`active/glass-multiplication.html`** — rewritten. The instrument column
stays DOM; the map is a canvas standing on the plane, unit frame declared as
origin (0,0), unit 200 world units — literally Geometry's scale, so the labs
agree on where 7 is.

- **Panes are regions keyed by number, not cells in a grid.** `built` is a set
  of numbers; a revealed number renders at every visible instance, including
  panes panned into later — and shows honest gaps where a number was never
  made. All the old 10×10 furniture (27 hardcoded tens, both `[2,3,5,7]`
  lists, the `>100`-era logic, the DOM grid, its came SVG, the CSS-gradient
  glass) is deleted, not parameterised. Larger maps arrive by panning, for
  nothing.
- **Pieces smallest prime first, top down, identically everywhere.** The
  mirror transform is gone per the design ruling; `factorize` is general
  trial division.
- **The fills-bench appearance**: resting and lit palettes derived in OKLCH
  by the bench's own lifted functions; the `aslab` workshop embedded with its
  signed-off `primes` block and a load-time drift check that reports rather
  than fixes; per-piece lightness variation (10%, seeded per pane position so
  the material is alive while the shape stays one-per-number); inner cames
  145 at 1px under a 98 frame at 1.5px; striations 70% across / 30% along;
  seeds; elliptical highlights on ~20% of lit pieces with intensity scaled on
  area; nothing shimmers. **One visual language for "this one"**: chosen
  edges, sounding panes, and prime-chip membership all move to the lit
  palette; the glow/outline system did not survive.
- **A detail ladder** (full / flat-with-cames / flat) keeps small panes from
  turning to ink, per canvas-panes.
- **The viewing object** supplies `name(u,v)`, the numbers default (`map`,
  cycling map · off), and hideable axes; the viewing strip in the instrument
  column is the Numbers control's permanent home, alongside `grid follows
  zoom` and `axes · shown`. Compass letters and the origin dot are the
  viewing's furniture and clamp to the window edge.
- **Primes to 19 and no further**: 11, 13, 17, 19 sound C, E, G, B an octave
  above 2, 3, 5, 7, same pans. Primes beyond 19 are silent; primes beyond the
  workshop's declared six render as clear glass, cut and leaded.
- **Accessibility**: the canvas is the one tabbable element; arrows move a
  pane cursor that pans the view at the window edge; Enter activates exactly
  as a tap; the existing aria-live readout announces ("7 times 6 equals 42 —
  not yet on the glass"). Landed in the same commit as the canvas, as the
  design note required. `user-select` and `preventDefault` guard the canvas
  (the Phase 4 half of the Safari fix).
- **Kept exactly**: the four modes and six build tools; reveal-all-instances
  with one sound per number and no finale chord; the unity pane and chip;
  composition building with the softMiss shrug and no timing-as-syntax;
  origin-anchored rectangles; the properties copy; the rebuild animation,
  redrawn from the plane's frame. Rectangle-drag starts from edge panes;
  drags elsewhere pan; wheel and pinch zoom through the plane's one clamp.

**Geometry-side minting** (design §4, accepted): with the map showing, a tap
on a lattice intersection inside the snap radius mints a recorded point — a
`lattice_point` op carrying the address in unit coordinates, id `lp:u:v`,
world position resolved from the declared frame at replay. The minted point
integrates like any point (a shared `_integrateNewPoint` now serves it and
intersection registration both). Verified: mint, then a line from the minted
point through seed 1. Outside the snap radius, and in points/off modes, taps
behave exactly as before.

## Choices made in implementation, flagged

- **The style sheet is written clean**, not appended as a fifth versioned
  block — the append-only convention documented the DOM grid's evolution and
  the DOM grid is gone. The batches remain in git history.
- **Highlight intensity scaling** implements the bench's rule (smaller burns
  brighter, on area) as a square-root law clamped to sane bounds; the bench
  recorded settings, not a formula. By eye it reads right; a bench look
  decides if it doesn't.
- **Near a lattice intersection in map mode, minting outranks the
  double-click note** in Geometry. Notes still open anywhere else.
- **The chip row stays five** (1, 2, 3, 5, 7): at the default window primes
  above 7 aren't buildable, and the chips-go-to-rows moment belongs to
  whoever designs the wider window's instrument.
- **No persistence**, per the design note: load/save do not exist here yet.
- **The `visible window` semantics** (reveal counts, rectangle lists,
  composition overflow) are computed against the current viewport, which is
  what "this window" now means on an unbounded plane.

## Verified

Both labs served locally, zero console errors end to end. Multiplication:
multiply by taps (12 revealed at six instances including beyond the old
grid), rectangle drag (24 staged through both factors), build-with-primes
(2 → 6 → 30 with intermediates standing, tally right, 7-tap refused with the
beyond-this-window shrug and the composition intact), Explore fill (the full
window in cut glass, 11 arriving purple), Properties copy, pan showing built
numbers following the window with honest gaps, zoom-out renumbering the
lattice and stepping the detail ladder, Numbers · off and axes · shown/hidden,
the viewing strip, keyboard cursor with announcements, the rebuild sweep
(pixel-verified mid-animation). Geometry: unchanged on the shared plane
(lattice, labels, readout), minting end to end. Two input-pipeline artifacts
of the embedded test pane were chased and confirmed environmental, as in the
Phase 3 session.

Not verifiable from here, joining the standing hands-on list: pinch on real
touch, real screen-reader behaviour of the virtual cursor (the live-region
mechanism is exercised; a VoiceOver pass is not), iPad Safari, and sound.

## Stop

Phase 4 stops here for review. **Michael's voice pass covers every string in
the port plus the surviving Phase 3 copy before anything ships.** The plan's
four phases are, with this, all executed.
