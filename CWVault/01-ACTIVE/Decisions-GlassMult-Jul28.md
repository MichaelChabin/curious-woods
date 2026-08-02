# Decisions — Glass Multiplication, 28 July 2026

Session ledger. Decisions are settled unless marked Open. Supersedes nothing;
extends `20-SPECS/Spec-Glass-Multiplication-v2.md`.

## Settled

**Empty panes.** The green glass goes. An empty aperture is a number not yet made,
not uncolored material. Parchment and the background construction show through it.
Implementation: there is currently no lead object — the came is the `.grid`
background showing through 2px gaps. Transparent panes would flood every aperture
with it. Came must become drawn lines (or per-cell borders) with the grid background
transparent. Nothing needs to sit behind the apertures to catch pointer events; the
cells still do that. The unity pane stays, and must still read as *built* once its
neighbours are empty — it is the one pane that says "something is here and it happens
to be colourless." Michael is writing the story that makes 1 the thing which defines
the others: the difference between something and nothing, not quite in the Greek sense.

**Map around zero.** Four identical quadrants. A complete address needs a direction —
"3 east, 5 north." Compass letters small and discreet, at the axis ends only, never
per pane. The number alone does not locate anything; same lesson as choosing a unit
or a base. Holds the seat for signed multiplication later without spending it.
Sequenced *after* 10×10 — as four 6×6 grids, it makes an independent point and should
arrive as its own move.

**Size and primes.** Start 10×10. 16×16 later, introducing 11 and 13. Generalize
`factorize`, move prime colour/sound/label into a data table, drop the `>100` ceiling.
11 rich purple, 13 rich orange. Sound: try the same instrument and the same first-four
notes raised one octave. Stripes stay literal, wrapping **by count, never by prime** —
above four pieces go to two columns, so 256 reads as 2 columns of 4. Worst case at
16×16 is eight pieces, so the fudge is bounded. A **Map Size** control sits to the
right; the background construction scales with it, so it stays visibly the same
constructed plane. **The board keeps its footprint and the panes shrink** — it reads as
zooming out, which is a gesture the child should own; by 16×16 the colours are
recognition rather than instruction; and nothing collides with the rest of the
interface or scrolls a control out of sight. Larger maps ship as **v2.2**.

**Prime chips.** Add a **1 / unity** chip to the left of 2. Every build starts at 1 —
1 × 2 × 5 × … — with a running total shown near the chips. With six primes the chips
go to rows, and they should be raised: there is little vertical room left below for
modes.

**Build with primes.** Not a quirk, a bug: the code auto-commits and resets, so 2 then
3 can never reach 6. Let the number keep growing instead — 2, then 6, then 30. "="
disappears without a gesture. Intermediates stay on the glass and every one is a
divisor of where she ended. Reset is tapping the unity pane (and/or the unity chip).
**No timing as syntax** — a timeout is invisible state, undiscoverable, and punishes
slow hands.

**Rhythm.** Keep it as a property of the reveal, not as syntax and not as judgment.
Multiples lighting in succession is a beat she observes rather than obeys. A metronome
that scores flips the Lab from Curiosity into Focus and ends exploration. The bridge to
rhythmic practice is a **shared tone table**: 7 sounds the same in both places.

**Substrate.** Share the *coordinate space*, not the engine: one module owning
unit-units ↔ pixels, pan, zoom, snap. Glassgeometry and Glass Multiplication both
consume it, so they agree on where 7 is while keeping their own data models. Sharing
the construction engine would make each pane a region bounded by four constructed lines
— expensive, and false, since the child did not construct them. Two further modules at
the same level: **resolution floors** (pixel → glass-cut → atomic) and **number
formatting** (thin-space grouping). Payoff: a construction can be drawn *on* the map —
circle of radius 5 at the origin passes through the corner of the 3×4 pane.

**Stories.** Overlay, not navigation: the panel dims the glass, the lab never unloads,
return is closing it. This sidesteps the save-state question entirely. Story → lab is
the reverse direction and independent — it hands the lab a **preset** ("open with
pronics lit"), a parameter rather than restored state. Author once; the ending is
contextual. Story content loads on demand rather than living in the file — a
deliberate, one-time break from no-external-assets, shaped so every Lab reuses it.
Also wanted: a story that constructs the plane one step at a time, so a child knows
this is a map of space and not a table. The existing on-demand `rebuild` animation is
the seed of it.

**Pronic story is the test case.** The Properties panel already writes copy when a set
is revealed; the door goes at its foot. Trigger is unambiguous because she asked.

**Authoring.** Diagrams and animations Claude can build outright in house style, so
mathematical stories are close to fully buildable. Photographs and paintings it cannot
— the glass fish, the Vermeer, Montparnasse. Michael sources and curates those. The
split is by *kind of story*, not draft-versus-curate.

**Deferred.** "I want to remember this" — deferred until layout settles and until we
can reliably tell *what* she wants to remember. Design when it returns: same
inscription gesture as stories; each interactive can name what is on the table as a
**typed** thing (number, property set, relation, rectangle, construction, passage);
the type decides which practice modes Maya offers; propose two or three candidates
rather than asking; the queue is a garden, never a debt.

## Open

- **Octave equivalence** — 11 and 13 an octave above 2 and 3 may be heard as *the same
  note*. Might read as a second family, or might be confusing. Test before committing.
- **Queue items** — state or idea only. Parked with the practice work.
- **Maya's unasked-for door** — the rule for offering a story nobody requested. Needs
  writing before it needs code.
