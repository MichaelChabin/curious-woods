# Curious Woods — Planned Interactives

## BRIEF

Status: First complete map. All entries confirmed direction, none fully specced yet except Coordinate Plane.
Last updated: February 25, 2026 by Project Manager

What this is:
- The full planned set of interactive construction tools
- Each one gives children a reason to use compass-and-straightedge construction
- All share the same underlying construction engine (geometry-layer1.html)
- Single app vs. multiple apps architecture decision deferred — decide just before building second interactive

Current development:
- Glass: Working Tool phase in progress (the construction engine + fill + palette + menu)
- All others: not yet in development

Read the full document for: descriptions, connections between interactives, open architecture question

---

## The Interactives

### Glass
History of stained glass — rose windows, Gaudí, cathedral geometry. Children reproduce
classic windows and create their own. Possibly complemented by a color chemistry interactive
(metals + oxygen → color — why cobalt makes blue glass, why gold makes red).

The construction engine IS this interactive. Working Tool phase builds the tools a child
needs to create a finished piece of stained glass.

**Status:** In active development.
**Story library:** `10-PROJECTS/Geometry/Geometry-Story-Library.md`

---

### Tiles
Duplicating and rotating shapes, tiling the plane. Persian and Alhambra patterns.
The quasi-crystal story (Darb-i Imam shrine, Peter Lu's 2007 discovery) lives here.

Children construct the five girih tile shapes, explore tenfold symmetry, and encounter
a pattern that stumped mathematicians until the 1970s.

**Status:** Not yet in development.

---

### Cities and Buildings
Reconstructing ancient sites using compass and straightedge — the same tools the
original planners used. The Parthenon, ancient city grids, recovering farmland after
Nile floods (the origin of geometry as a discipline).

**Status:** Not yet in development.

---

### Sets
Overlapping regions, intersections, unions. Emerged naturally from the observation
that overlapping fills blend at 40% opacity, producing a visible third color at intersections.

A child who fills two overlapping circles and notices the middle is a different color
has encountered set theory without being told anything.

**Status:** Not yet in development. Conceptual foundation already present in Working Tool fill system.

---

### Euclid
Classic Euclidean constructions. Color aids readability of complex figures.
Proofs treated as a careful, separate topic — not rushed.

**Status:** Not yet in development.

---

### Coordinate Plane
Already specced. The long arc toward calculus — constructing perpendicular axes,
placing points, eventually graphing functions.

**Status:** Specced. Not yet in development.
**Spec:** `20-SPECS/` (coordinate plane spec)

---

## Open Architecture Question

**Single app vs. multiple apps:** Not yet decided. Decision deferred until just before
building the second interactive — having one concrete example in hand will make the
choice clearer than deciding in the abstract.
