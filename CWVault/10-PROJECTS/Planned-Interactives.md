# Curious Woods — Planned Labs and Story Modes

## BRIEF

Status: Restructured May 24, 2026 to reflect the four-pillar foundation (Labs / Stories / Practice / Maya).
Last updated: May 24, 2026

What this is:
- The current roster of Labs (substantial visual environments)
- The story modes planned for each Lab — collections of stories that route into the same Lab and share a working style
- Replaces the Feb 25 framing that treated Glass, Tiles, Cities, Sets, Euclid, and Coordinate Plane as six separate interactives

Architectural decision (now resolved): **Euclid is one app.** A single construction engine supports all its story modes. The earlier "single app vs. multiple apps" question is closed for Euclid; NTL and CBM are separate Labs with their own engines.

---

## The Three Labs

### Euclid

The geometry Lab. Compass-and-straightedge construction on an infinite canvas. Two gestures — tap-tap for an infinite line, tap-hold-drag for a circle — generate every classical Euclidean construction. Color and lead turn constructions into stained glass; the same engine supports tilings, set diagrams, ancient-city reconstructions, and pure Euclidean proof work.

**Status:** In active development. See `CLAUDE.md` and `01-ACTIVE/Current-Status.md` for state. Spec at `20-SPECS/Layer 1 — Consolidated Specification.md`.

**Story modes** (constellations of stories that route into Euclid):

- **Glass** — history of stained glass: rose windows, Gaudí, cathedral geometry. Children reproduce classic windows and create their own. Possibly complemented by a color-chemistry thread (metals + oxygen → color; why cobalt makes blue glass, why gold makes red). **First story mode. In active development.** Story library at `10-PROJECTS/Geometry/Geometry-Story-Library.md`.

- **Tiles** — duplicating and rotating shapes, tiling the plane. Persian and Alhambra patterns. The quasi-crystal story (Darb-i Imam shrine, Peter Lu's 2007 discovery) lives here. Children construct the five girih tile shapes, explore tenfold symmetry, and encounter a pattern that stumped mathematicians until the 1970s. *Not yet in development.*

- **Cities and Buildings** — reconstructing ancient sites using compass and straightedge — the same tools the original planners used. The Parthenon, ancient city grids, recovering farmland after Nile floods (the origin of geometry as a discipline). *Not yet in development.*

- **Sets** — overlapping regions, intersections, unions. Emerged naturally from the observation that overlapping fills blend at 40% opacity, producing a visible third color at intersections. A child who fills two overlapping circles and notices the middle is a different color has encountered set theory without being told anything. *Not yet in development. Conceptual foundation already present in the Euclid fill system.*

- **Coordinate Plane** — already specced (`20-SPECS/Spec. Coordinate Plane.md`). The long arc toward calculus: constructing perpendicular axes, placing points, eventually graphing functions. *Specced, not yet built.* Uses the same rendering standards as the Number Theory Lab — see that spec for grid/axis values.

- **Euclidean Proof** (working name) — classical Euclidean constructions and the careful, unrushed treatment of proof. Color aids readability of complex figures. *Not yet in development; may emerge as a later mode rather than a separate one.*

---

### Number Theory Lab

Discover properties of numbers on a coordinate plane. Includes Beads-Around-the-Circle, a fixed-diameter-bead arrangement that gives π and the length of any curve to arbitrary accuracy as the beads shrink. A small Number Theory Language — a readable record of the child's operations — may emerge alongside the Lab (decision pending, expected within a week of this writing).

**Status:** Under construction. Spec at `20-SPECS/Spec Number Theory Lab — First Version.md`.

**Story constellations planned:**
- **Beads constellation** — orbital distance of the Moon, the length of any natural curve, the value of π itself. All use the same fixed-bead technique.
- Additional constellations to be defined as the Lab matures.

---

### Codes, Bases, and Modulus

A grid of numbers introducing modular arithmetic, number bases, the Sieve of Eratosthenes, and how codes work. Children discover prime structure and the geometry of remainders without symbolic notation getting in the way.

**Status:** Confirmed direction. Not yet specced.

---

## Notes for Builders

- A new story should name which Lab (if any) it routes into and which constellation it belongs to.
- A new Lab needs to meet the Lab criteria in `00-FOUNDATION/CW-System-Foundation.md` (substantial, visual, direct, reusable, open-ended) — not every interactive is a Lab.
- The graphic and interaction standard for all three Labs is shared. See `00-FOUNDATION/UI-Language.md`, `00-FOUNDATION/Interface-Foundation.md`, and `20-SPECS/Spec. Coordinate Plane.md`.
