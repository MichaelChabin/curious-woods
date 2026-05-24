---
status: First draft — May 21, 2026
role: Developer-ready specification for the FIRST BUILD of the Number Theory Lab
scopes-down: `_msc/_mscVault/1 CW/Interactives/Labs/Number Theory Lab.md` (the full vision)
folds-in: `20-SPECS/Spec Multiplication Explorer.md` — multiplication is now part of this lab, not a separate tool
build-target: Web (vanilla HTML/CSS/JS, no build step, no framework dependencies)
primary-screen: Desktop with mouse (iPad gesture support deferred — see §2)
---

# Number Theory Lab — First Version

## 0. What this document is

The full `Number Theory Lab.md` spec is rich and correct, but too large to build at once — an attempt to build directly from it overcomplicated the project. This document defines a **focused first version**: a buildable, deployable, useful lab that introduces multiplication, division, fractions, and percentages through direct geometric construction on a coordinate plane.

A developer (or Claude Code) should be able to build the whole first version from this document alone. It references the foundational documents but does not require reading the larger lab spec.

The organizing principle that makes the whole lab one coherent thing — and that a developer should keep in mind throughout — is in §7. Read it early.

**What is deferred** (do not build; see the full spec for the eventual vision): Magnitude View; the resolution slider for non-integer modes beyond what §3 specifies; trajectory plots (Collatz, Fibonacci, logistic map, etc.); slope mode and rationals-as-slopes; named units; the full lens system; Maya integration; sharing, saving, and cross-session persistence. The first version is single-session, static, no backend.

---

## 1. The plane

The lab opens on a coordinate plane that **looks like something the child could have constructed with the geometry tool (Glass)** — same visual character, same grid, same axes. The first version does not have to animate the Euclidean construction of the plane; it only has to look like the same plane Euclid worked on, with integers labeled on both axes. (The visible-construction question is parked; it is not necessary for this build.)

**The plane is a map, not a Cartesian grid.** `0` is at the centre. Numbers are **positive in all four directions** — there are no negative numbers anywhere in the first version. A child can build a rectangle going up, down, left, or right from an axis number, and every direction is positive territory. This is a deliberate, load-bearing difference from a Cartesian plane: it means every operation in the lab is symmetric, with no privileged direction. (Negatives arrive only when algebra needs them — deferred.)

**The plane has a resolution.** It runs on a computer and displays on a screen; the lab does not pretend to a continuum. The default unit (the distance from `0` to `1`) is the primitive length, and the child is aware that the screen is also made of pixels. Resolution is integer by default; see §3.

**Pan and zoom** are primitive — free zoom (mouse wheel, centred on cursor) and free pan (click-drag on empty canvas). The plane extends as the child pans: grid lines and integer labels continue to appear in whatever direction she travels, with no edge and no load state. (The first version may render lazily by visible region; it does not need to animate the extension.)

**Visual inheritance** (from `Interface-Foundation.md` and the existing CP Foundation): background `#FFFFE7` (cream); grid lines `#1F3848` at 0.5px, opacity 0.3; axes `#1F3848` at 1.5px; axis labels Helvetica 11pt `#1F3848`, font size fixed (does not scale with zoom). Adaptive label frequency: label every gridline when grid spacing > 40px; every 5th when 10–40px; every 10th when ≤ 10px.

---

## 2. Input model — a note before the gestures

The first version is **desktop-with-mouse**. The geometry tool (Glass) currently only works well with a mouse, and the iPad hover-and-drag problem is genuinely unsolved. The first version does not need to solve it. Build desktop-first; note iPad as a known gap.

Throughout this spec, "hover" means mouse-over highlight, and "drag" means click-hold-move-release. Where a touch equivalent is obvious it is noted, but touch is not a build requirement for v1.

---

## 3. Resolution

The first version is **integer-resolution by default**. Rectangles, slots, and tiles snap to integers.

The lab also supports a **half-integer** resolution and a **tenths** resolution, because they are needed for fractions and for the decimal expansion in division (§5). When resolution is set finer than integers, gestures snap to the finer grain instead.

**Displayed precision tracks the screen.** When the lab shows a number that is not exact at the current grain — a quotient with a decimal part, eventually a root — it displays **as many digits as are meaningful at the current pixel resolution**, and no more. Zooming in yields more precision; zooming out yields less. The screen is honest about what it knows. (This is the v1 seed of the larger spec's resolution philosophy; the full multi-step resolution slider is deferred.)

**Number formatting.** Follow the ISO convention to the right of the decimal point: digits are grouped in threes separated by **thin spaces** — `3.141 592 653`. To the left of the decimal point, the first version uses **commas** every three digits — `1,234,567`. The child will eventually be able to choose the left-of-point convention; the right-of-point grouping is fixed. Reading and understanding decimals fluently is a goal — the formatting should make groups of digits legible, not decorative.

---

## 4. Multiplication — rectangle as area

This is the entry-level interaction and the historical "Multiplication Explorer," now part of this lab.

**The gesture.**

1. The child **hovers over a number on the x-axis or the y-axis**. The number highlights.
2. She **drags** — up or right from an x-axis number, or right (or up) from a y-axis number — to draw a rectangle.
3. The rectangle is **anchored at the origin `(0,0)`**. Its far corner is set by the drag. Hovering `5` on the x-axis and dragging up to `4` produces a rectangle 5 wide and 4 tall.
4. At integer resolution the rectangle **snaps to integers** as it grows; at half or tenths resolution it snaps to that grain.
5. The labels update **live** as she drags — the child watches the height tick `1, 2, 3, 4` and the area tick with it. The live feedback loop is the point.

**Two paths, one object.** Dragging up from an x-axis number sets height; dragging right from a y-axis number sets width. The same two numbers produce the same rectangle either way. This is `xy = yx` — commutativity — felt through the hand, not stated. Both paths must produce an identical object.

**Labels on the rectangle** (no symbols, no equation — the geometry *is* the equation; deliberately de-emphasise anything that looks like school):

- **Height** — the value of the vertical side — displayed centred horizontally, just *below the top edge* of the rectangle.
- **Width** — the value of the horizontal side — displayed centred vertically, just *inside the right edge* of the rectangle.
- **Area** (the product) — displayed *just inside the upper-right corner*, aligned top-right.

Three numbers. No `×`, no `=`.

**Tiny rectangles.** A 1×1 rectangle is too small to hold three centred labels without collision. Resolve this with **zoom**: the child zooms in and the labels fit. Do *not* solve it by moving labels outside the rectangle (that creates new collisions with axes and neighbouring rectangles). A minimum render behaviour can be decided in build, but the intended answer is zoom.

**Multiple rectangles.** The child can have several rectangles on the plane at once — this is how she sees the factor pairs of a number (3×4, 2×6, 1×12 all present together). They persist until cleared. Selecting a rectangle (single click) exposes a close affordance; the exact affordance is a build call.

**Rotation — commutativity made visible.** A placed rectangle can be **rotated 90°**. A 3×4 rectangle rotated becomes a 4×3 rectangle: same area, swapped sides. With fractional sides it shows subtler things (a 1 × ½ rectangle rotated shows what halving means). The rotation **gesture** is a build call — a rotate handle on the selected rectangle is the obvious candidate — but the behaviour is required: rotation preserves area and swaps the side labels.

**Triangles — half of a rectangle.** A right triangle is formed by a **diagonal across a rectangle**. Its area is half the rectangle's. This is the first felt encounter with division-as-halving-an-area and with the half-base-times-height formula. Whether the triangle emerges from a gesture or from selecting a placed rectangle and choosing "diagonal" is a build call; the relationship (triangle = half its rectangle, labelled) is what matters.

---

## 5. Division — slots and tiles

Division is shown with two components: a **dividend** made of square tiles, and a **divisor** that is a length along the x-axis defining a number of slots to fill.

### 5.1 Where the dividend comes from

For the **first version, the dividend is given** (preset, or typed). Building the dividend by gesture is designed below as the intended path, but it is a known shortcut to take a given number for now — large dividends are awkward to build by dragging, and the gesture needs more thought before it ships. Spec both; build "given" first.

**The intended build-it gesture** (design-complete, build-priority lower than "given"):

The dividend is built with the *same drag gesture as multiplication*. The child drags up from an x-axis number — say `x = 5` — building a rectangle of width 5. As she drags past a clean rectangle (area 25 at height 5) and continues *into the gap* before the next integer height, **individual tiles appear one at a time along the top edge** — tile 26, 27, 28, 29 — counting up as she drags. If she reaches a full row (area 30) the rectangle **snaps** to 5×6 and the loose tiles vanish into the clean rectangle. So a dividend of "27" is a clean 5×5 block with 2 loose tiles resting on top — and the child can already see "27 is 25 and 2 extra" before any division happens. Number sense falls out of the construction for free.

The width she builds at is **construction scaffolding only** — 27 is 27 however she built it. Once the dividend exists, only the count survives; the tiles regroup freely for the division.

If resolution is set to tenths, dragging past 25 makes **slices** appear along the top instead of whole tiles — 25.1, 25.2, 25.3 — so the same gesture builds 25 or 25.7 depending only on resolution. This is decimals arriving as "a finer grain of the same gesture," not as a new topic.

Once a dividend exists, it can **detach and float aside** to make room for the child to set the divisor.

> Parking-lot (v2): let the child draw a rectangle of *any* shape; the tool tracks its true area live (a 4.7 × 3.2 reads 15.04); on release one side snaps to an integer and the other snaps to an integer-plus-leftover-tiles (or plus slices, in decimal mode). The snap should be animated so area is visibly conserved.

### 5.2 Setting the divisor

The divisor is a number of **slots** — a range along the x-axis from `0`. For `17 ÷ 5`, the divisor is the stretch from `x = 0` to `x = 5`: five slots to fill.

**The gesture: tap the number `5` on the x-axis.** That is enough — the only thing that matters is the count. (Dragging right from `0` to `5` may also be supported and is equivalent, but a tap is the primary gesture.) In decimal mode, **tap-and-hold** gives a finer-resolution value readout. This deliberately parallels the multiplication gesture — tap an axis number to set a quantity — so the gesture grammar stays small and consistent.

### 5.3 The distribution

The dividend's tiles are distributed into the slots, **5 at a time** (one tile into each of the 5 slots per round). For `17 ÷ 5`:

- Round 1: 5 tiles placed, fraction remaining `12/5`.
- Round 2: 5 more, remaining `7/5`.
- Round 3: 5 more, remaining `2/5`.
- 2 tiles left over — fewer than 5, so the integer rounds stop.

**Animation.** Tiles move in **groups of 5**, each tile travelling at a slightly different speed along a slightly different path, all arriving where they belong. (This flocking motion reads well to children and quietly seeds intuition #10 — the tiles behave like objects, not symbols.) The **first round is slow enough to count along**; subsequent rounds speed up. The leftover tiles linger visibly. The child can replay the distribution.

### 5.4 The decimal step

The child may stop at the remainder (`3` in each slot, `2` left over) or continue. To continue, she **chooses to slice** the leftover tiles. Each leftover tile is sliced into **10 thin slices**. For `17 ÷ 5`: 2 leftover tiles → 20 slices → distributed 5 at a time → 4 slices into each slot. Each slot now holds 3 whole tiles and 4 tenths: the slot's filled length is `3.2`.

The choice to slice into **tenths** is the child's, and it is where decimal place value comes from — it should be felt, not imposed. The slicing-into-ten is the meaningful act.

**Result.** The geometry stands on its own — no `17 ÷ 5 = 3.2` equation appears. But the **filled length of one slot is labelled** (`3.2`), which ties division straight back to the rectangle gesture: a filled slot is itself a `3.2 × 1` rectangle, and its area is what it holds.

### 5.5 Non-terminating division

For a division like `10 ÷ 3`, the slicing recurses: slice the leftover, distribute, slice the new leftover, distribute, forever. **Support the recursion** — let the child keep slicing. The discovery that `1/3` cannot be written exactly in base 10, and *why*, is one of the deepest things in the lab.

**Important sequencing:** do **not** announce "you can do this forever" the moment the child hits `10 ÷ 3`. Let her slice and distribute herself, at least once or twice, and *notice on her own* that nothing changes. Only **after** she has recursed herself does a popup appear — an animation acknowledging what she just figured out: *you can do this forever, and all you ever get is 3s.* The discovery is hers; the popup confirms it. Display the value accurate to the pixel-resolution floor: when the slices fall below one pixel, the tool honestly stops.

---

## 6. Fractions and percentages

### 6.1 Two modes of fraction

Fractions live in **two genuine modes**, and the first version builds one of them:

- **Operational fractions (BUILD IN V1).** A fraction is a **side length** — what division hands back when the answer is not whole. It lives *in the rectangle*. `3/4` is what one side looks like when an area was divided by the other side. Drawn as a **part within a whole**: 3 columns highlighted inside a 4-column total — the part visible inside the whole. This mode falls straight out of the multiplication and division work already specified; the part-within-whole columns are simply "what the quotient looks like, drawn."
- **Relational fractions (DEFER TO V2).** A fraction as a **ratio** — `3/4` as a slope, the diagonal of a 4-by-3 right triangle, a comparison between two lengths. The diagonal crosses `x = 1` at exactly `y = 3/4` *by construction*, so the fraction is a height the geometry *produces*, not a label to be trusted. Extended down the diagonal it gives the whole equivalence class (`3/4, 6/8, 9/12 …`) for free. This is the thread that becomes rationals-as-slopes — already deferred in the parent spec. Build it in v2.

A "fraction mode" toggle is fine; if the build needs a distinct gesture for fraction construction, that is acceptable (it need not reuse the multiplication gesture).

> Parking-lot (the scale staircase, a v2 idea worth a story of its own): a fraction with height 1 is a slope, and walking out the x-axis to where it has climbed one unit *is* the meaning of a power-of-ten unit. At meter scale, a centimeter lives at `x = 100`; a millimeter at `x = 1,000`; a human hair is a real journey; an atom is off the edge of anything the screen can hold — which is the honest answer. Powers of ten become distances the child has walked. Note: at those ratios the triangle degenerates to a flat line and cannot be drawn as a triangle — the scale staircase needs its own representation (a distance gauge or a logarithmic readout), not a literally-drawn triangle.

> Parking-lot (do NOT build): reading every cell of the multiplication table as a fraction and counting the coprime ("unique") ones is a true and pretty fact, but it sets up no problem a child wants to solve. If a child someday colours "fractions in lowest terms" with a lens and finds it beautiful, that is fine and free — but do not engineer toward it.

### 6.2 Percentages — comparison, not abstraction

A percentage in this lab is **not an abstraction**. It is the **comparison of two real things**, with one chosen as the reference. Percentages are most useful comparing real quantities with real units — and the comparison kit (§6.4) makes that concrete.

**The model.** Two quantities stand side by side as bars (or rectangles). The child **designates one as 100%** — the reference. The other is read against it.

- 3-bar against 5-bar, 5 as reference → `3/5`, **60%**.
- 5-bar against 3-bar, 3 as reference → `5/3`, **166.67%**.

The "ruler" is not a separate instrument — it is **the reference bar itself, graduated**. `100%` sits at its top, `0` at the x-axis, dashes at the fraction increments along its edge: percentages up one side, fractions up the other. Percentage is a **relationship the child chooses**, not a property a shape *has* — the same "no privileged frame" move as the map-plane (no privileged origin) and division (no privileged dividend).

**Graduation rule.** Graduate the reference bar by the **denominator of the comparison**. Comparing 3 to 5 with 5 as reference → graduate the 5-bar into **fifths**; each fifth is also 20%; the 3-bar reaches the 3rd dash → `3/5`, 60%. When the comparison does not divide evenly (3 as reference, comparing 5 → `5/3`) → graduate into **thirds**; the 5-bar overshoots to the 5th third → 166.67%. The fraction and the percentage are the same dash wearing two labels — that is what makes the equivalence obvious.

**Over 100%.** The graduations continue past the top of the reference bar. A quantity taller than the reference reads `140%` / `7/5`, and the fraction family keeps counting (`6/5, 7/5, 8/5 …`) with no special boundary at `1`. This kills the misconception that percentages stop at 100.

### 6.3 The swap — an iconic transition (build this carefully)

When the child **re-designates** which bar is 100%, the graduations **flow** from one bar to the other: the dashes lift off the reference bar, travel across, and re-space themselves onto the other bar, **relabelling as they move**; the numbers recompute *during* the motion. She sees `60% ↔ 166.67%` and `3/5 ↔ 5/3` as **the same comparison viewed from two ends**.

This animation is doing real conceptual work — run it two or three times and the child owns reciprocals, without the word "reciprocal" ever appearing. It is worth building with care, not as an afterthought.

### 6.4 The comparison kit

Percentage compares real things, so the lab ships with a small kit of **reference objects** with honest dimensions and a simple image each — e.g. a person, a door, a grand piano, a T-rex, a school bus, a blue whale. Each object is just **a bar with a known size and a picture** — the same graduated-bar comparison, one bar wearing a costume. No new machinery.

- Ship v1 with roughly **5–6 objects**. The system for adding more is trivial (a name, a size, an image), so the kit grows later for free.
- **Get the dimensions right.** The lab's credibility lives here. If the kit says "T-rex: 4 m," be clear whether that is hip height or body length (an adult *Tyrannosaurus* is roughly 12 m long and about 3.5–4 m at the hip). Honest-about-size is a cousin of honest-about-the-past.
- Grounding real sizes also quietly seeds intuition #5: a child who has compared enough real things builds a felt library of how big things are, and then a wrong answer *looks* wrong.

**Dimension-agnostic.** A quantity is a quantity. When the child compares a piano's *width* to a T-rex's *height*, the tool does not say "width" or "height" — everything is just **size**. (Labelling one dimension invites "can you compare a width to a height?", and that digression is not needed in v1.)

### 6.5 Decimal / fraction / percentage interchange

The reference bar already co-locates fraction and percentage on the same dash. A decimal reading is the same height expressed a third way. The first version does not need an elaborate three-way switcher — the **shared dash is the interchange**: one height, three labels. If a decimal label is shown, it follows the §3 formatting rules. (A designed three-way "view swap" can be a v2 refinement.)

---

## 7. The spine — read this

There is **one object: the rectangle.** There are three things you can know about it, and three operations — one for each thing you don't know:

- Know **both sides** → multiplication gives the **area**.
- Know **the area and one side** → division gives the **other side** — and that side, when it is not whole, *is* a fraction.
- Know **the area, and that the rectangle is a square** → square root gives the **side**. *(Square root is not built in v1 — but the lab is designed so it slots into this same frame later.)*

Multiplication, division, and fractions are not three topics. They are **one situation — a rectangle with three knowable quantities — answered from whichever corner the child is standing in.** Multiplication and division are not opposites to be memorised as a pair; they are the same rectangle answered from different knowns. The part-within-whole fraction is just what the divided side *looks like*.

A developer should hold this while building: the lab is not three features bolted together. It is one object, viewed three ways. Keeping the rectangle as a single shared internal representation — with area, sides, and tiles as views of it — will keep the build coherent.

---

## 8. Scope summary

**Build in v1:**

- The map-plane: positive in all four directions, `0` at centre, integer labels, free pan/zoom, edgeless extension, Glass-like visual character.
- Integer resolution, plus half and tenths where §4–§6 need them; ISO decimal formatting; pixel-honest displayed precision.
- Multiplication: hover-axis-number → drag → origin-anchored rectangle; live labels (height below top edge, width inside right edge, area inside upper-right corner); two-paths-one-object commutativity; multiple persistent rectangles; rotation; triangle-as-half-rectangle.
- Division: given dividend (build-it-by-dragging specced but lower priority); tap-an-axis-number divisor; flocking distribution in groups of 5; choose-to-slice decimal step into tenths; recursion for non-terminating cases with the after-the-fact "forever" popup.
- Operational fractions: part-within-whole columns.
- Percentages: two-bar comparison with a designated reference; graduate-by-denominator; over-100%; the iconic swap transition; a 5–6 object comparison kit; dimension-agnostic "size."

**Deferred (do not build):** Magnitude View; trajectory plots; slope mode and relational/triangle fractions (rationals-as-slopes); the scale staircase; named units; the full lens system (one or two starter property lenses — squares, primes — are acceptable but not required); Maya integration; square root; saving / sharing / cross-session persistence; the drag-any-shape dividend with animated snap; iPad touch gestures.

---

## 9. Things still likely to be gotten wrong — flags for the developer and for Michael

1. **The build-it-by-dragging dividend is pedagogically right but practically awkward for large numbers.** v1 resolves this by shipping "given" dividends first and treating the drag-to-build gesture as the lower-priority addition. The honest long-term answer is that both coexist — drag-to-build teaches what a numerator *is*; "given" respects the child who already knows. Do not let the gesture's elegance push it ahead of a working "given" path.

2. **Rotation and triangle gestures are specified by *behaviour*, not by *gesture*.** A rotate handle and a "diagonal" affordance are the obvious candidates, but the gestures themselves are deliberately left to the build. Do not invent elaborate gestures; keep the vocabulary small.

3. **Tiny-rectangle label collision is solved by zoom, not by relocating labels.** Resist the instinct to move labels outside the rectangle.

4. **The "forever" popup must come *after* the child recurses herself.** If the tool announces it on first contact with `10 ÷ 3`, it steals the discovery. This is a sequencing requirement, not a nicety.

5. **The swap transition is conceptual, not decorative.** It is where reciprocals are learned. Budget real build time for it.

6. **Comparison-kit dimensions must be accurate and unambiguous.** Wrong or vague object sizes quietly undermine intuition #5 and the lab's credibility.

7. **Do not "unify" the two fraction homes.** Operational fractions (in the rectangle) and relational fractions (the deferred triangle/slope work) are deliberately two venues — multiple representations, intuition #3. A developer tidying the codebase might collapse them; that loses the point. v1 only builds the operational one, which removes the temptation, but the v2 note should stay explicit.

8. **No equations, no `×`, no `=` anywhere the child sees.** The geometry is the statement. Anything that looks like a worksheet is a bug.

---

## 10. Provenance

Designed in a focused chat on May 21, 2026, scoping down `Number Theory Lab.md` to a first build. Folds in `20-SPECS/Spec Multiplication Explorer.md` — multiplication is now part of the Number Theory Lab, not a separate tool; that older spec can be archived once cross-references migrate. References, but does not require, the full `Number Theory Lab.md` and `Labs in general.md`.

Open design threads explicitly carried forward as parking-lot notes: the drag-any-shape dividend with animated snap (§5.1); the scale staircase as its own probe story (§6.1); relational/triangle fractions as the v2 spine (§6.1). The visible Euclidean construction of the plane is parked entirely — not needed for this build.
