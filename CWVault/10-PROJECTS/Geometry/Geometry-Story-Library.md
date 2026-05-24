# Geometry Story Library

## BRIEF (read this, skip the rest if you're building)

Status: Confirmed content direction. Not speculative.
Last updated: February 23, 2026 by Project Manager

What this is:
- Stories that map directly to the Euclidean construction tool
- Each gives a child a reason to build something specific
- Organized roughly simple → complex constructions
- Some are Event Stories (built around a single image); others are full narrative arcs

Current development:
- Stained Glass: story developer chat already working on this (February 2026)
- All others: not yet in development

Palette note:
- Four opening palettes exist: Gaudí (default), Medieval/Chartres, Persian/Isfahan, Alhambra/Nasrid
- Stories can specify a palette on load — palette design should be part of story development
- Hex values: `20-SPECS/Spec-Working-Tool.md` (proposed, not yet verified against reference images)

How to use this:
- Design chats: draw on these when designing construction sessions or Maya walkthroughs
- Story developer chats: pick a story, read CW-System-Foundation for story types, build
- Coding chats: constructions listed under each story define what the tool needs to support

Read the full document for: story details, construction notes, design observations

---

## Stories Linked to Geometric Constructions

These stories connect directly to the Euclidean construction tool. Each one gives a child
a reason to build something. Organized roughly from simpler to more complex constructions.

---

### Stained Glass

- The great rose windows of medieval cathedrals — pure Euclidean geometry made luminous
- Gaudí's windows at the Sagrada Família — saturated, strange, visibly geometric
- Children construct their own windows; images can be shared with grandparents
- **Status: Story developer chat already working on this — February 2026**

---

### Persian Tilework / Quasi-crystals

- The Alhambra and the Darb-i Imam shrine in Isfahan (1453)
- Peter Lu's 2007 discovery: Islamic craftsmen used girih tiles to produce quasi-crystalline
  aperiodic patterns — the same mathematics Roger Penrose formalized in 1974, five centuries later
- Did they know what they'd found? Nobody knows. That's the story.
- Potentially an Event Story built around a single image of the shrine
- Constructions: the five girih tile shapes, tenfold symmetry patterns

---

### Ancient City Planning

- Alexandria — laid out with compass and straightedge
- Chang'an — planned city, grid and proportion
- Children can lay out a city plan using the same tools the planners used
- Connects geometry to power, trade, civilization

---

### Roman Engineering

- Aqueducts — arches constructed geometrically, water flowing across impossible distances
- The Arena at Nîmes — still in use, pétanque tournaments where gladiators fought
- Children construct an arch or lay out an elliptical arena
- The Nîmes story: built for brutality, became a neighborhood in the Middle Ages, now hosts
  concerts. The geometry outlasted every other intention.

---

### Greek Amphitheaters

- Sited and proportioned geometrically for acoustics
- A child can whisper on the stage at Epidaurus and be heard in the last row
- Constructions: circular and elliptical layouts, proportion

---

### Mazes and Labyrinths

- The Cretan labyrinth — constructible from a simple cross and circles
- Medieval cathedral floor labyrinths (Chartres) — walked as meditation
- Children construct their own maze
- Connects to topology and the difference between a maze and a labyrinth

---

### Celtic Knotwork

- Geometric underpinnings of interlaced patterns
- Constructed on a grid with circles
- Pure geometry as art, cross-cultural

---

### Nature's Geometry

- Sunflower seed arrangements, nautilus shells, honeycomb
- Nature repeatedly discovers optimal geometric relationships
- A child who constructs a hexagonal grid and learns bees found it independently has
  encountered something genuinely profound
- Connects to why geometry is not arbitrary — it describes something real

---

### The Vitruvian Man

- Leonardo's figure is a construction — circle and square in precise relationship
- Connects geometry to the human body, to Renaissance thinking about proportion
- Event Story built around the image

---

## Open Design Questions

**Emphasis and fill boundary coexistence:** A child cannot currently have a line be both
emphasized (2px, prominent) and a fill boundary simultaneously — emphasis clears when fill
commits. Probably fine since filled regions are visually distinct, but watch for cases where
she wants to emphasize a boundary segment for aesthetic reasons.

**Overlapping fills and sets:** Overlapping filled regions blend at 40% opacity, producing a
third color at intersections. This may be a natural entry point for set theory — a child who
fills two overlapping circles and notices the middle is a different color has encountered union
and intersection without being told anything. She can also re-emphasize a boundary inside an
existing fill and overlay a new region on top, creating layered color. Whether this becomes
confusing or interesting depends on the child and the construction. Worth watching in user
testing. Do not resolve prematurely.

---

## Design Observations

- This list reframes the tool: not "learn geometry" but "here's a reason to build something"
- The stories span cultures, centuries, and scales — from a child's maze to a Roman arena
- Several are natural Event Stories (Persian tilework shrine, Vitruvian Man)
- The Nîmes observation — geometry outlasting every intention of its builders — is a recurring
  theme worth developing: the constructions are more permanent than the purposes
- Nature's Geometry and Persian Tilework both touch the same idea from different directions:
  humans discovering structure that was already there
