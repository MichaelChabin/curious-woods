---
status: Draft — 3 Oct 2026, written by Claude Code from Michael's ask of 3 Oct, after reading `js/glass.js` (the region finder, the fill record, the circle drag, the levels table). Two decisions are left to Michael before pasting; they are listed under *Before pasting*.
role: The prompt that builds a separate circles-only page of Glass Geometry with two changes — tap-to-fill (no edge selection) and the radius and area shown while a circle is being drawn. The page is Glass 1: Circles standing on its own, not a change to the shipping lab.
how to use: Settle the two decisions, then paste the prompt below whole into a Claude Code session in `_CW/`. It works on top of the uncommitted 2 Oct changes to `js/glass.js` and does not commit.
---

# Glass 1: Circles — tap to fill, and the circle measured as it is drawn

**Before pasting, Michael decides two things.** The prompt is written with the first answer in each pair; strike and replace if you want the other.

1. **A tap inside a closed shape when no colour is chosen.** As written: it does what it does today, which is undo. The trap is that a child who taps in a petal expecting colour loses her last circle. The alternative is what the lab does now at the first fill: colour the shape in clear glass and open Color, so the first tap in a shape is never punished. I would take the alternative; the prompt follows your rule as you gave it.
2. **How the numbers are written.** The number rule (`js/cw-number.js`, from Decisions-Controls-Aug12) says a decimal is exact or it is not written as a decimal. An area is never exact and a radius rarely is, so the prompt writes them with ≈ and two places: *radius ≈ 0.87*, *area ≈ 2.36*, and *radius: 1* when the radius is a whole number of units. The alternative is area in units of π (*area: π*, *area: ¼π*). I would keep ≈; it is honest and it is the number she will recognise.

## The prompt

> Read, in this order: `CWVault/00-WHAT-CW-IS.md`; `CWVault/claude/Rulings-Sept-2026.md`, in particular *A lab is a place, and she adjusts to one new thing*, *Capability levels*, and *Gestures across tools*; `CWVault/00-LABS-LEDGER.md`, the Geometry: Glass section; `CWVault/claude/Geometry-Spine.md`; `cw-deploys/MANIFEST.md` (Page standard, the `js/glass.js` entry, the `experiments/` entries); and the header comment of `cw-deploys/js/glass.js`.
>
> Then read the module itself where this work lands: `js/glass.js` — the levels table (`LEVELS`, near the top of the factory); the section headed `REGION DETECTION + FILL` (`findClosedRegionEdges`, `checkAndFill`); `FILL POLYGON + HIT TEST` (`expandFillToPolygon`, `hitFilledRegion`); the `ACTION LAYER` (`fillRegion`, the shape of the `fill` op); the `INTERACTION STATE MACHINE` (`onDown` sections 0 to 5, `onMove` where `ghostCircle` and `snapTarget` are set, `onUp` where `DRAGGING_CIRCLE` commits); the `RENDER` loop where `ghostCircle` is drawn; and the How-this-works stages `circles` and `color`. Also `js/cw-number.js` (how a number is written) and `tools/glass-log.js` (the Node harness that lifts the region code out of the module).
>
> **The working tree is not clean.** `js/glass.js`, `active/glass-geometry.html`, the bench and the Glass Rose page carry uncommitted work of 2 Oct awaiting Michael's look. Work on top of it. Do not commit; Michael looks first, as with that work, and your report says what you touched.
>
> **What this is for.** Glass 1: Circles is the first step of the geometry spine, the place a child meets circles with nothing else in the room. Two things about it should be simpler than the full lab: how a shape takes colour, and what a circle tells her while she draws it. Both are built as powers the module serves, off by default, so that `active/glass-geometry.html`, the bench and the Glass Rose page are unchanged in behaviour. Nothing is copied; there is one `js/glass.js`.
>
> **1. The page.** `experiments/glass-circles.html`, a thin page over the module like `active/glass-geometry.html`, mounted at level `circles` with the two new options:
>
> ```js
> var glass = cwGlass(el, { level: 'circles', fill: 'tap', measure: true });
> ```
>
> Title *Glass 1: Circles* (Michael's name). Page standard in full: doctype, charset, viewport, the tab icon a file in `art/` (the geometry icon will do), `CW_VERSION`. It is public the moment it exists, so it is listed on `experiments/index.html` beside the bench. Both options default off; carry them as fields in the levels table as well as per-mount options, so a level can own them later, but set them on no existing level.
>
> **2. Tap to fill (`fill: 'tap'`).** Today a shape takes colour when the child leads its edges one by one and the leaded edges close. At this page there is no edge selection: she taps inside the shape.
>
> - With Color open and a colour chosen, a tap on bare ground inside a closed shape colours that shape, in that colour, with lead around it. One `fill` op, with `vertices` and `edges` exactly as `checkAndFill` writes them today (arcs with `circIdx`, `angleA`, `angleB`, `sweep`; segments with `a`, `b`). Nothing downstream changes: the renderer, the lead border that is always drawn on a fill, `hitFilledRegion`, replay, save, the library, the picker previews and the harness all read that record and must not be touched. No `emphasize` or `deemphasize` ops are written.
> - A tap inside a pane that already has colour recolours it, as section 4 of `onDown` does today.
> - A tap in open ground, inside no closed shape, does what it does today: undo. So a wrong pane is one tap away from gone. There is no other way to remove a pane at this page; say in your report whether that felt sufficient.
> - A tap with no colour chosen, anywhere, does what it does today. (Michael's rule; see the note above the prompt if he has changed it.) Find out whether opening Color selects a colour by itself; if it does not, the tip has to say *choose*.
> - A tap that lands on a point starts a circle, as always. A tap that lands on an arc lays no lead at this page and starts nothing; it is not a fill tap, because an arc belongs to two shapes.
> - On a pointer device, while Color is open with a colour chosen, the canvas cursor is a small ring: a PNG in `art/` with its hotspot at the centre (Safari does not take SVG cursors), falling back to `crosshair`. On touch there is no cursor and the open Color window is the signal; add nothing else.
>
> **The shape under the tap.** The module has no notion of a face; `findClosedRegionEdges` only checks that the edges already leaded form one cycle. Write the face walk that finds the enclosed shape around a point from the arrangement: the arcs between crossings already exist in `logicalArcs` (and the segments in `logicalSegments`, which this page never has but the walk should not break on). Cast a ray from the tap to the nearest edge, then follow the boundary, turning the same way at every vertex, until it returns, or fails because the point is in open ground. Order the edges at a vertex by their tangent direction there. Put the walk beside `findClosedRegionEdges` so `tools/glass-log.js` can lift it the same way. Cases that must work, and be checked, before the report:
>
> - The six petals of the rose, and the six curved triangles between them.
> - **Tangent circles.** Two circles touching at a point share a direction there; the choice at that vertex needs curvature as the tie-break. Circle 0→1 and circle 2→1 is the test.
> - **A lone circle.** A circle nothing crosses has no points on it and no arcs in the graph. A tap inside it fills a shape whose boundary is the whole circle, one arc of sweep 2π; make sure `expandFillToPolygon` and the preview take it.
> - **Rings.** Two circles that do not cross leave a shape with a hole. The walk finds the outer boundary and the fill covers the inner disc; the smallest-on-top compositing order hides this exactly as it does for overlapping fills today. Do not build region subtraction; say that it is the same temporary fix.
> - **Many arcs at one point.** The rose's centre has twelve arc ends. Vertices are ids, not coordinates; use them.
> - A tap in open ground finds nothing and undoes, and six taps undo six panes one at a time.
>
> **3. The circle measured as it is drawn (`measure: true`).** While a circle is being drawn (`DRAGGING_CIRCLE`), two things are shown and nothing else changes:
>
> - **The radius**, a thin line from the centre to the point on the ghost circle in the direction of the hand — to the cursor while free, to the snap point once snapped, which is where the ghost's radius already jumps. Beside the line, a label: *radius ≈ 0.87*, or *radius: 1* when the radius is a whole number of units. The label sits off the line, on the side away from the hand, so a finger does not cover it.
> - **The area**, inside the circle near its bottom, centred: *area ≈ 2.36*. When the circle is too small on screen to hold the label, or its bottom is off the screen, the area is not shown; do not squeeze or relocate it.
> - Units are the plane's own, where the distance from 0 to 1 is one; area is in square units, so the first circle reads *radius: 1* and *area ≈ 3.14*. Write the numbers through `CW.num` (`decimal` with two places over an integer), in the lab's label face and colour, and nothing rounds anywhere except at that one point, under the ≈.
> - On release both disappear. They are render hints like `ghostCircle` itself: not in the log, not in replay, nothing to undo. Check that a replay of a construction drawn at this page shows no numbers.
>
> **4. Words.** The two tips at this page change, and the strings print in full in your report for Michael's voice pass (the standing rule). Candidates, not decisions: in *Circles*, after *Use those to make more circles.*, the line *To colour a shape, tap Color, choose a colour, then tap inside the shape.*; and *Color*'s first line becomes *To colour a shape, tap a colour, then tap inside it.* Keep the lab's spelling of *Color* for the column word. The `color` tip's trigger today is four fills; at this page the child cannot fill before she opens Color, so look at whether the trigger still makes sense and say what you did. No new words in the column.
>
> **5. What must not change.** `active/glass-geometry.html`, `experiments/glass-module-bench.html` and `experiments/the-glass-rose.html` behave as they did: edge selection still lays lead and closes to glass at `both`; the rose replays; a construction saved before this change opens after it; the standard set's previews are as they were. Run the harness (`tools/glass-constructions.js`) and confirm the nine logs are byte-identical. Do not redesign anything else while you are in there. Report what looked wrong and leave it.
>
> **Finishing.** Bump `CW_VERSION` on every page touched and the version query on every page that loads `js/glass.js` (there are four with the new one). Run `tools/check-deploys.sh`. Register the page, the cursor file and the module change in `MANIFEST.md`, list the page on `experiments/index.html`, and add the line to `00-BOARD.md` and to the Geometry: Glass section of `CWVault/00-LABS-LEDGER.md`. Do not commit.
>
> Test headless at 1440 × 1100 and 390 × 844: no console errors, no failed requests, no horizontal scroll. On the new page: draw, undo, the six cases above, recolour, Just the glass, save, open, New, replay, and the numbers present during a drag and absent after. On the three existing pages: the acceptance list from the extraction prompt, unchanged. Say plainly what you reached and what you did not.

## Notes for Michael

**What is safe here and why.** A fill is already a record that carries its own boundary; everything after the fill reads that record. Tap-to-fill changes only how the boundary is found, so the log, the library, replay and the previews are untouched, and the powers are off everywhere but the new page.

**What is given up at this page.** A tap gives the smallest closed shape around the point. A pane larger than a face — the whole disc of the central circle under the six petals — cannot be made here, and there is no eraser at this level to fade a line out of the way. Edge selection is the full lab's method and the spine's *regions* step is where choosing a boundary against the construction can arrive. Discussed 3 Oct.

**Size.** One session. The face walk is the work, a few hundred lines; the measure is small; the page is forty lines.
