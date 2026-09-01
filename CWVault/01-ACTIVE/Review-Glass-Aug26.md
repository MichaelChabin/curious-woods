---
status: Review — 26 Aug 2026, from a Cowork design session. Not a spec.
  Diagnoses the uncommitted 24 Aug build of glass-multiplication.html and
  proposes the order of work that replaces it. Awaits Michael's ruling on
  the one question at the top.
role: Why the 24 Aug Glass build reads as a step backward, and what to do instead
related: 00-DECISIONS.md, 01-ACTIVE/Multiply-Spec-Aug24.md,
  01-ACTIVE/Divide-Spec-Aug23.md, 01-ACTIVE/Make-This-Square-Spec-Aug23.md,
  01-ACTIVE/Glass-Panel-Prompt-Aug24.md, claude/Map-Tool-Catalog.md
---

# Review — Glass, 26 Aug

Method: read the board, the decisions ledger, the three tool specs, the panel
prompt and the catalog; then drove both builds of the lab in a headless
browser — the deployed 13 Aug file (`b32d541`) and the uncommitted 24 Aug file
(`2026-08-24 e4cd030`) — through Multiply, Divide, Make a square and Explore,
and looked at the screenshots. Zero console errors in either. The code does
what the prompt asked. The problem is upstream of the code.

## The one question

**Is Glass a table she looks at, or a plane she builds on?**

The lab currently has both substrates, and nobody ruled between them.

**Substrate A — the table.** Phase 4 (8 Aug): the map is a grid of panes, one
per cell, each a piece of stained glass keyed by the number in it. Colour is
prime identity. A number is "revealed everywhere it lives". Fill paints the
whole table; Explore lights every 24 and sounds it. A discrete object: a
lookup table rendered as glass.

**Substrate B — the plane.** The 23–24 Aug specs, the catalog, and Michael's
own description on 26 Aug: a 2D slice of spacetime, so thin it holds only
locations; 0 and 1 named, the rest constructed. A number is *made* by drawing
a rectangle from the origin and its area is discovered. Division restacks
tiles; a root is built ring by ring; T3 drags a corner along a hyperbola; T6
stands at the origin and counts trees. Continuous, anchored at the origin,
every tool something you *do* to a shape.

The 24 Aug build put B's tools on top of A's rendering. Everything Michael
felt — inconsistent graphics, weak interaction, a step backward — follows from
that one unmade decision.

## What the screenshots show

1. **Two kinds of glass on one map.** Coloured panes (A) and white unit-tile
   slabs (B) overlap in the same cells. Tap 20 for Divide: every 20 on the
   table lights in colour (A), then a white 4×5 slab covers the pane she
   tapped (B). Build 6×4 with the new stroke: a white slab fills at the
   origin, and then every 24 on the table lights — the *interrogation answer
   to a construction gesture* that `Multiply-Spec-Aug24.md` names as the
   disease. It is still there because `built.add(n)` still reveals a number
   everywhere it lives.
2. **Three numberings.** The lattice labels on the grid lines (plane.js), the
   large numerals in the axis panes (table row and column 1, offset from the
   lattice labels by half a cell), and Show numbers for every cell — which
   Divide, Make a square and Explore now switch on by force. A lattice "4" is
   a location; a pane "4" is a product. Both are on screen and they do not
   agree.
3. **Three readouts for one fact.** The instrument column (24 / 2³ × 3 /
   6 × 4 = 24), the map corner (6 × 4 = 24), and the floating label; plus the
   just-in-time prompt printed twice, once in the panel and once in the
   column. The ledger's rule was *one floating, one fixed*.
4. **Panels land on the work.** Building Numbers opens over the origin
   quadrant — exactly where B builds everything. The story window covers the
   top right. Choice panels open mid-map. Automated taps hit the panel
   instead of the pane; a finger will too.
5. **B's own rendering is unfinished.** Make a square's rings are thin outline
   lines with floating numerals, not visibly L-shaped tiles. Divide's thirds
   are thin white bands. The 36 leftover hundredths of √18 are drawn as a
   3.6-unit sliver along the x axis. Nothing about these looks like the glass
   next to it.
6. **Modes are abolished in the ledger and alive in the file.** Build's five
   sub-tools and Properties' six are intact with no word; Fill, Clear and
   Show numbers are still global; Explore is the old Build-by-selecting. What
   is on screen is the 13 Aug lab with a panel bolted on, not the lab the
   specs describe. The 106 KB file carries both identities at once.

## Why it happened

The standing method on the board is *a perceptual question gets a bench, not
an argument*, and it was not followed. The gesture grammar and the prime
buttons were "settled in about four exchanges" — the ledger itself says to
read them cold before they harden. Three specs were written 23–24 Aug with
gate 3 explicitly unmet on all three. The whole set went to Claude Code the
same afternoon in one prompt, into a 2,000-line file carrying the previous
identity, with "converge on Glass Geometry" as the brief. None of the specs is
wrong. The order was: decide → spec → build, with *bench* missing and
*substrate* never asked.

## Proposal — for Michael to react to, not adopt

**Plane. The table is a viewing.** Glass Geometry already establishes the
plane; Sound will put time on x and pitch on y of the same plane; every
catalog tool needs the origin and continuity. The table is unique to one lab.
Under this reading:

- A number is a rectangle from the origin, made of unit tiles — the white
  "1" glass, because area is counted in ones. The cell its far corner lands in
  is *where the number lives*; that corner pane takes its prime colours when
  the fill completes. The white tile and the coloured pane become one object
  seen two ways: the construction, and its address.
- "Every 24 lights" stops being automatic and becomes T1 (*light every cell
  equal to N*) — a tool she reaches for. Fill becomes *Show the table*, a
  viewing like Just the glass.
- Numerals are earned: a cell shows its number once something has been built
  there (Geometry walk §10 already says this). The lattice labels stay as
  what they are — locations.
- One readout: the fixed corner, per the ledger. The instrument column's
  product box goes.

Under the table reading, the 13 Aug lab is close to right as it stands, and
Divide and Make a square do not belong in it at all. That is the honest
alternative, and it should be said out loud rather than drifted past.

## The order of work

1. **Rule on the substrate.** One line in `00-DECISIONS.md`.
2. **Freeze the 24 Aug file as a prototype.** Move it to
   `prototypes/glass-panel-build-aug24.html` and restore `active/` to the
   deployed file. The rail, the window component, the story text, the choice
   panel and the leftover grammar are good and port forward; the file as a
   whole does not.
3. **Bench before lab.** One file per tool in `experiments/`, standing on
   `plane.js` alone, with *no* table code: Multiply (the stroke, the row fill,
   the corner pane), Divide, Make a square. Nothing else on screen. Each bench
   answers its own open questions by being looked at — the flip repeat, the
   same-axis rectangle, where the product sits. This is what `canvas-panes`,
   `prime-glass` and `fills-and-light` did in August, and it worked.
4. **Settle one visual grammar in the bench, once.** Pieces are unit glass of
   1; the lattice is the came; leftovers are the same glass, never a sliver;
   rings are tiles, not lines; the corner pane is the only coloured thing
   until she asks for more.
5. **Then the lab.** A new file on `plane.js` + `cw-panel.js` that starts
   empty — no Build, no Properties, no Fill — and takes the benched tools in.
   Build's and Properties' functions return only as catalog tools (T1, T5),
   each through the three gates.
6. **Gate 3 for real.** Michael reads the three stories (written 24 Aug, not
   yet read) before any bench goes to Claude Code. The board already names
   this as the next action.

## Open

- Bench order. Multiply first (it "teaches the map is made of rectangles at
  all"), or Make a square first (the only tool with child-observed evidence
  behind it)?
- Whether the 13 Aug lab stays live during the rebuild. Recommendation: yes;
  nothing a child can do today is lost by leaving it.
- The name. *Glass* was declared in the 24 Aug prompt and *Glass Geometry*
  left unresolved. Michael's 26 Aug description names three tools on one
  plane — Glass Geometry, Glass Multiplication, Sound — which suggests the
  pairing is fine and the family name is the open item.
