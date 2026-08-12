---
status: For review — Michael's quick look gates implementation
role: Design note — Phase 4, porting Glass Multiplication onto the plane
date: 2026-08-08
---

# Phase 4 — the design, before the code

Per the plan: rewrite Glass Multiplication's rendering to canvas on the plane;
panes become regions; stripes become cut and leaded pieces, smallest prime
first; the naming layer becomes a supplied function; axes become hideable;
primes generalise to 19 and no further; the 27 hardcoded 10s are deleted, not
parameterised. This note settles what the benches changed, the four open
questions, and the shape of the port. **Nothing below is code yet.**

---

## 1. What each bench finding changes

**canvas-panes — passed decisively (2.4 ms p95 at 32×32, 14% of budget).**
Canvas rendering is unblocked with a margin of seven. Consequences: there is no
Map Size feature — the plane's pan and zoom *are* map size, and larger maps
arrive for nothing; the bench's detail ladder (full / flat / came-only) is the
answer wherever panes get small, including subdivision cames (§2); and any
future performance check measures draw time against the frame budget, never
frame rate.

**fills-and-light — dimming is dead; the appearance is settled.** The port
implements the bench's decisions as recorded in `Decisions-Fills-Aug06.md`:

- **Two declared palettes, resting and lit**, derived in OKLCH from the
  workshop's declared colour (resting 93% chroma / +6 lightness; lit 125% / +7),
  out-of-gamut detected and reported, never silently clipped. The bench's
  `hex2oklch` / `derive` machinery is lifted verbatim — those functions produced
  what was actually seen and approved.
- **One visual language for "this one":** selection and set-membership both move
  panes to the lit palette. The current glow filters, saturate/brightness
  boosts, and outline highlights are deleted, not restyled.
- **Every piece is leaded**: inner cames (luminance 145, 1px) drawn under the
  pane frame (98, 1.5px), inner-first, as real leaded glass is.
- **Flat glass**: striations (70% across the stack, 30% along) and seeds; 10%
  per-piece lightness variation (required, not decorative — flat fills with
  zero variance read as dead); no doming, no inset edge-shadow.
- **Highlights are reflections**: elliptical (203% elongation), 20% of pieces
  catch them, 89% strength, intensity scaling on area so smaller burns
  brighter; none on unlit panes. The glass is fixed; nothing shimmers. (Light
  drift is optional future motion, not in this port.)
- **The 125% gamut clip on 3 and 13** resolves the way the schema spec
  recommends: the workshop's `primes` block is signed-off output, not cache —
  so the two lit values that leave sRGB are *declared directly*, in gamut, by
  eye, and the rule remains the derivation for everything that fits. The
  `aslab` workshop in `Spec-Workshop-Palette-Schema.md` is the first workshop
  and ships with the port.
- **The came stays platform-level and stays open**: Multiplication uses the
  bench's 145/98 values, chosen against these panes. Unifying with Geometry's
  `#777777` remains the open platform item; this port does not decide it.

**prime-glass — colour carries information, which is the weak position.** With
colour off, 6, 10 and 14 render pixel-identical. A second, non-colour channel
is required, and this note decides it (§2).

## 2. The second channel: subdivision

> **OVERRULED at the design review, 8 Aug (Michael).** No second channel in
> this port. **Colour is the sole prime indicator** — a standing principle the
> monochrome framing didn't inherit. The colourblind-safe workshop is the
> accessibility answer, which makes its quality load-bearing. Workshops must
> declare six distinguishable prime colours, and the schema now requires it
> (`20-SPECS/Spec-Workshop-Palette-Schema.md`). Subdivision is parked as a
> seed — a possible future *viewing*, not a port feature
> (`03-SEEDS/subdivision-viewing.md`). The section below stands as the record
> of what was proposed and why.

**Decision: subdivision, not width.** A piece for prime *p* is cut into *p*
parts by inner cames — 2 is a piece cut in two, 7 a piece cut in seven — read
by counting, no key. This is the standing recommendation from
`Decisions-Benches-Aug05.md`, adopted on its own argument: width is an encoding
(a bar chart wearing a window, unreadable without a legend — the same failure
as colour); subdivision is a count, the only candidate decision 6 already
endorses (*panes are regions, cut and leaded exactly as geometry cuts and
leads*), the same-prime-merge finding used deliberately rather than suffered,
and direct service to i11 (measure by counting).

The bench holds both candidates. **If a look at `prime-glass` says otherwise —
can you tell 6, 10 and 14 apart at a glance, colour off, small panes? — this is
the moment to overrule.**

Consequences: with the count carrying identity, colour returns to delight; the
low-hue workshops (Chinese Blue and White, Hokusai) become viable; the 16th
colourblind-safe workshop has far less to carry. Small panes: subdivision cames
drop out on the detail ladder before the piece boundaries do (came-only rung),
so the channel degrades gracefully rather than turning to ink.

## 3. Mirroring: a pane reads the same way everywhere

The Aug 5 ledger requires this decided before Phase 4. **Decision: the
`rotate(-90deg) scaleY(-1)` mirror transform dies.** Pieces stack vertically —
boundaries horizontal, smallest prime at the top — identically at (3,5) and
(5,3). Three reasons: it keeps "a pane's shape is its factorisation" true (one
shape per number, everywhere); it keeps the glass one material (the mirror
turns every "across" striation into an "along", so the two halves of the table
would be cut from different sheets); and commutativity never depended on it —
it is carried by the same number lighting in both places and by the
origin-anchored rectangles. Overrule here if the mirrored table's symmetry was
doing quiet work I haven't credited.

## 4. Lattice-click minting

Decision 5's second half, deferred out of Phase 3, answered now:

- **Minting is a Geometry affordance, not a Multiplication one.** In
  Multiplication the lattice intersections are pane corners; taps mean panes.
  In Geometry with the map showing, tapping a lattice intersection (within
  snap radius) creates a recorded point — the moment possibility becomes
  history. It takes precedence over tap-empty-undo only inside the snap radius,
  and only in map mode.
- **The op records the address, not the coordinates**: `{ op:'lattice_point',
  u, v }` in unit coordinates, id `lp:u:v`. Replay resolves world position from
  the declared frame — so the record is exactly the new information the click
  contributed, and a log that redeclares its frame replays coherently. The
  minted point is an ordinary point thereafter: lines, circles, hit tests,
  fades.
- **Scope**: small, Geometry-side, and it is what makes "one plane under both
  labs" concrete — a circle of radius 5 through the corner of the 3×4 pane, the
  payoff line from the July 28 ledger. Proposed to land inside Phase 4. Strike
  it here if it should wait.

## 5. Accessibility: a virtual cursor, not a button mirror

The current 100 `<button>` panes with `aria-label="3 times 5 equals 15"` are
real accessibility and the port must not ship worse. The plan offered two
routes; **the port takes the keyboard-navigable focus model with live-region
announcements**, because the static mirror no longer matches reality: under
pan and zoom the pane grid is unbounded, and a fixed 10×10 button mirror would
describe a window that no longer exists.

Concretely: the canvas is the one tabbable element; arrow keys move a pane
cursor (drawn on canvas as the focus ring the buttons used to have); Enter
reveals, exactly as click does; the existing `aria-live` readout — already the
narration channel — announces "3 times 5 equals 15" plus the reveal messages;
the cursor pans the view when it walks off the visible window. Mode buttons,
chips, and tool words remain real DOM and keep their semantics untouched. This
lands in the same commit as the canvas rendering, not later.

## 6. The viewing layer, and the Numbers control's home

Decision 7 made formal. A **viewing** is a small object the lab supplies to
its page:

    { id, numbersDefault,          // 'map' here; 'points' in Geometry
      name(u, v),                  // (3,5) → 15, because area
      axesVisible,                 // axes are the viewing's, and hideable
      controls }                   // the viewing's words, housed together

- **The naming layer is `name(u, v)`** — everything that says *what a lattice
  cell means* funnels through it (pane products, numerals, announcements,
  properties lookups). A future sieve viewing supplies a different function
  and the grid width becomes the modulus; nothing else changes.
- **Axes belong to the viewing and are hideable**: one word, `axes · shown` /
  `axes · hidden`, covering the drawn axes, edge numerals, and compass letters
  together.
- **The Numbers control's permanent home is the viewing's control group** — a
  short strip of words in the instrument column: `Numbers · map`, `grid
  follows zoom` (map mode only), `axes · shown`. This is the permanent home the
  Phase 3 review left provisional; Geometry's copy of the control migrates to
  the same pattern in a later pass, not in this port.
- **Multiplication defaults to `map`**, per the Phase 3 ledger. `points` mode
  has no meaning here yet (no construction points) and is absent from this
  viewing's cycle: `map · off`.

## 7. Primes to 19, and what lies beyond

- `factorize` becomes general trial division — no hardcoded list anywhere.
- `primeInfo` becomes a table reaching **19 and no further**: 11, 13, 17, 19
  take C, E, G, B an octave above 2, 3, 5, 7 — the settled octave answer
  continued once — same instrument, same pan as their octave partners. Primes
  beyond 19 are **silent**: sound stops earning its keep, so it stops.
- The workshop declares six prime colours (2–13). A prime beyond the declared
  set renders as **clear glass, cut and leaded like any piece** — honest
  material for "this window has no stain for that". Unreachable at 10×10 or
  16×16; only panning far brings it in.

## 8. What is deleted, what is kept

**Deleted, not parameterised:** the 27 hardcoded 10s (grid template, loop
bounds, `/10` drag math, came `viewBox`) — the plane already pans and zooms;
the DOM grid, its came SVG overlay, and the CSS-gradient glass; the mirror
transform; both hardcoded `[2,3,5,7]` lists; the glow/outline highlight
system; the `>100`-era assumptions all the way down.

**Kept, on canvas:** the four modes and six build tools with their exact
semantics; reveal-all-instances with one sound per distinct number and **no
finale chord**; the unity pane and chip (clear glass, the something that is
colourless); composition building with no timing-as-syntax and the softMiss
shrug (untouched, per the v2.1b note); origin-anchored rectangles during drag
and reveal; the properties copy panel; the construction backdrop and its
rebuild animation, redrawn from the plane's frame instead of
`getBoundingClientRect` arithmetic; N/E/S/W compass letters (now part of the
viewing's axes group).

**Gestures on the canvas:** a drag starting on an edge pane is the rectangle
gesture, exactly as today; a drag starting anywhere else pans; wheel and pinch
zoom through the plane's one clamp. Tap semantics per mode, unchanged.

## 9. One plane, two files — the extraction becomes real

Both labs must stand on the *same* plane, not two copies that drift. The
THE PLANE section leaves `glass-geometry.html` for **`cw-deploys/js/plane.js`**
— a classic script (no build step, no bundler) defining a single factory the
page instantiates; `snap()` travels with it. Geometry swaps its inline section
for the shared file in the same commit; behaviour is identical by
construction. This is the architectural justification CLAUDE.md asks for
before splitting anything out: two consumers, one coordinate space, and drift
between copies would falsify the project's central claim. ES-module form can
come with the real modularization later; a global factory keeps today's
no-build rule intact.

Multiplication keeps **no persistence** in this phase (`load`/`save` stay
absent — the operation-log question for panes is not in the plan and is not
smuggled in here).

## 10. Order of work and the stop

1. Extract `js/plane.js`; stand Geometry on it; verify Geometry unchanged.
2. Port Multiplication: canvas map on the plane, viewing object, panes as
   regions with subdivision, resting/lit palettes from the `aslab` workshop,
   virtual cursor, axes word, Numbers word (map default), primes to 19,
   deletions per §8.
3. Geometry-side minting (§4), unless struck at this pause.
4. Verify: every mode and tool exercised in the browser; the acceptance
   checklist from the v2.1/v2.1b handoffs re-run where it still applies;
   colourblind-workshop check — the 16th workshop's six primes hold apart
   under the common colour-vision deficiencies (the workshop is not yet
   authored; until it is, this check is the standing vacancy, not a pass);
   performance sanity against the canvas-panes method (draw time, not fps).
   *(This item originally read "monochrome check — 6, 10, 14 distinguishable
   with colour off via subdivision"; that test belonged to the overruled §2
   and was swapped per the 8 Aug ruling — executed 12 Aug, having been
   ordered on the 8th but found undone.)*

Then **stop for review. Michael's voice pass covers all new and surviving copy
before anything ships** — every string in the port plus the Phase 3 words is
in scope for that pass; none of it is settled by this note.

---

*Overrule points, gathered: the second channel (§2, at the bench), the mirror
(§3), minting-in-Phase-4 (§4), the viewing shape and control strip (§6),
clear-glass-beyond-the-workshop (§7), and the plane.js extraction (§9).*
