---
status: Live ledger — started 29 Sept 2026, from Michael's geometry tree; the Glass shelf corrected 1 Oct (one story, not two), given its **door** column from `claude/Geometry-Spine.md`, and rewritten the same day as **levels of one lab** rather than separate tools (Michael's ruling). The manager chat keeps it; Michael reads it. Companion to 00-STORIES-LEDGER.md.
role: The labs: what equipment each stands on, what levels and interactives it holds and their state, which story opens each, and which stories call it. If an interactive isn't here, it doesn't exist yet.
related: claude/Geometry-Spine.md (the capability order and the one-door rule), claude/Rulings-Sept-2026.md (*a lab is a place*; *capability levels*), claude/Ruling-Labs-and-the-Plane.md, claude/Spec-Gallery.md, 00-STORIES-LEDGER.md
---

# The Labs Ledger

A **lab** is a family of interactives on one subject that share the same equipment. Capabilities are built here; stories call subsets of them. A child reaches a lab through a story, or through the Labs plaque, where each lab is a shelf she can browse, and every tool on the shelf says "there's a story about this" when there is.

States: **idea** (named, nothing built) · **bench** (exists in `experiments/`) · **tool** (in `active/`, callable by stories) · **shelf** (listed on the lab's page for browsing).

**Door** (1 Oct): the one story that opens a capability. A capability is opened by exactly one story, and no story uses a capability that has not been opened. A line with no door is a line nothing can be built on yet.

**Level** (1 Oct): a named set of powers the lab withholds or serves. A level is *not* a separate tool and *not* a property of a story — it is the one lab, configured. A story asks for the level it needs by name. Levels are a floor, not a ceiling: she gets what the story needs plus whatever she has already earned, and the lab never takes a power away. A withheld control is simply absent, never greyed out.

## Geometry: Glass

**Equipment.** The plane (`js/plane.js`): one origin, 0 and 1 put down first, the metre as default unit, zoom and pan, the 1–5–10 lattice, the unit square as the number map's cell. Euclid's two gestures: tap-tap for a line, tap-hold-drag for a circle; intersections usable at once. The operation log (save, undo, replay), with `checkWipThen()` guarding every route that could replace unsaved work and `forkStepThrough()` turning a replay into her own drawing the moment she draws. Fill by tapping the surrounding segments. The picker window, *How this works*, *New*, *Save* and its choices, the palette, Remember — all the lab's, because the lab hangs in the gallery and must be complete standing alone. Postcard. It stands on `js/cw-panel.js`, `js/cw-flags.js` and `js/cw-number.js`. Gestures decided here first (Rulings, *Gestures across tools*).

**A shelf module since 1 Oct 2026** (built and checked by Claude Code from `claude/Prompt-Extract-Glass-Module.md`; awaiting Michael's look before it commits). The lab is `js/glass.js`, mounted into an element a page sizes: `cwGlass(host, { level: 'circles', open: 'rose', palette: 'chartres' })` → `{ el, level, replay(), focus(), resize(), destroy() }`, in the shelves' own form beside `cwMap` and `cwSampler`. `active/glass-geometry.html` is a thin page over it at the fullest level, unchanged in behaviour at the same URL; what she saved before opens after. **Two powers served per mount, owned by no level yet (2 Oct):** `fill: 'tap'` (a shape takes colour by a tap inside it) and `measure: true` (a circle measured as it is drawn); `experiments/glass-circles.html` mounts `circles` with both. **Levels that exist:** `circles` — **Glass 1: Circles**, Michael's name for it (1 Oct): the column holds *Circles*, *Color*, *New Open Save*, *Just the glass* ↔ *Show lines*, and nothing else — and `both`. **Named, not built:** `lines`, `grid`, `rectangles`, `regions`, `plots` — asked for, they are served as `both` with a warning on the console. A level is a floor, not a ceiling, but there is no store of what she has earned, so the level asked for is the level served until there is. The bench that proves two instances do not interfere is `experiments/glass-module-bench.html`. **The standard set (2 Oct 2026, Michael's list):** Rose · Equilateral Triangle · Hexagon · Perpendicular Bisector · Square · Hexagram · Pentagon · Pentagram, nested · Pythagoras, in `models/logs/`, written by `tools/glass-constructions.js` through `tools/glass-log.js` (the lab's geometry run in Node, so every id is real); the picker holds *My constructions* and *Standard constructions*.

The levels below are the spine's steps, in order, so the shelf reads top to bottom as the lab gaining powers.

*Stained Glass* — the Euclid app itself. **tool**, hung in the gallery. *Corrected 1 Oct: this line used to name two stories, "The Compass Counts to Six" and "The Glass Rose." They are one story; the first is its old name.*

**Level `circles` — circles alone.** Two locations, one gesture; every Euclidean construction is reachable (Mohr 1672, Mascheroni 1797), awkwardly, which is the point. **Door: *The Glass Rose*** (Draft 9, awaiting Michael's yes). The rose log is in the library (1 Oct 2026): `models/logs/geo_rose.json`, key `_builtin_rose`, seven circles in walking order — one more than the prompt's count, because the story's six petals need six circles round the middle one. A story mounts the lab with `open: 'rose'` and its own word calls `replay()`. *The old line "Making a Rose — idea" is retired: it was never a tool, it is this level.* Wanted on this level: the hexagram.

**Level `lines` — lines, given one circle.** Strictly weaker alone: a bare straightedge cannot bisect or drop a perpendicular. Poncelet 1822, Steiner 1833 — everything, provided one circle and its centre are given. **Door: *Wright's Light Screens*** (story two, settled 25 Sept; `claude/Candidates-Grid-Lab-Stories.md` should drop him or keep him as a cross-reference only). He works inside a frame he is given, which is exactly that gift.

**Level `both` — circles and lines.** All of Euclid, comfortably; what the lab does today, and what the standalone page mounts. **Door: *Your Own Window*** (story three, wanted). Opens: Pythagoras, the pentagram.

**Level `grid` — the plane ruled.** Euclid without the boring part. **bench** (Glass grid bench, per `claude/Prompt-Glass-Grid-Bench.md` and `claude/Worknote-Glass-Grid-24Sept.md`). **Door: *Euclid in Alexandria*** (wanted). Opens: coordinates, *What You Can See From Zero*, and everything at the next level. **Nothing at `rectangles` can be built until this door exists.**

**Level `rectangles` — rectangles and right triangles, with dimensions.** Drag between intersections; registration point, dimensions, area shown. **idea**. Michael has a separate *rectangles* chat expanding this; the two will be merged. **Door: one of four candidates** — Gee's Bend, Mondrian, Albers, or Wright if he is not spent at `lines`. Also here: *Numbers on the grid* — squares, pronics, nearly-squares; the rationals built with triangles; rulings in halves, thirds, tenths. **bench**: Multiply bench, Ruling bench, and the older Glass Multiplication lab in `active/`. Wanted: Ahmes, primes, pronics.

**Level `regions` — union, intersection, subtraction.** Not against Euclid: Book I already cuts figures up and reassembles them. **idea**. **Door: wanted** — Cézanne is the candidate. The scissors-and-solids story (equal-area polygons always cut to fit; Hilbert's third problem says solids do not) may be its own, later.

**Level `plots` — graphs and functions.** The hinge: after this the subject is Descartes, not Euclid. **idea**. **Door: wanted**.

**Random walks** — see Probability below; sits past `grid`. **Door: *The Drunk Man and the Drunk Bird*** (wanted).

*Graphs of linked notes* — **idea**; may belong to Maps and Timelines instead, and is outside the spine.

## Maps and Timelines

**Equipment.** `js/map.js` (the map, `cwWindow` for a picture in a window, `setTime`, `setSeaLevel`, `setIce`), `js/timeline.js`, `stories/world-events.json`, `places.json`, `timeline-events.json`, `stories/curves/`; `tools/events-from-vault.py`. Spec-Maps, Spec-Map-Lab, Spec-Timeline-and-Map, Time-Machine-Shape.

*Time Machine* — five nouns, three verbs; story timelines fixed, only the lab adjustable. **tool**, hung. Still developing; awaiting Michael's rulings on the weights, the matches and the open points.
*After the Ice* — the older timeline. **tool**, hung; stays or comes off the wall depending on the Time Machine verdict.
*The map* — where is that. **tool** (used by the painting stories and Necker's Drawing).
*Deep-time timelines* — the seven tiers. **idea**.

## Sound and Music

**Equipment.** Web Audio; the Jankó lattice; MIDI. *Why You Hear What You Hear* as grounding.

*Sound benches* (translator, Six Against Five, rhythm roll, prime tones) — **bench**. Door: none yet.
*The tapping bench* — the practice's instrument. **bench**. Practice: rhythmic practice (not built).
*Beads* — beads on a string linked by springs; pluck, friction, stiffness. **bench** (Pull a Bead). Door: wanted (sound first; measuring curves; pi by beads).

## Colour and Pixels

**Equipment.** `art/palette/palettes.json` (the glass palettes and their chemistry, a source not a law); the three lamps; `js/sampler.js`.

*Colour filtering*, *the three lamps*, *ink, light and spectra*, *pixels* — **idea**, with `claude/Worknote-Three-Lamps.md`. The painting stories touch this lab but none opens it properly yet.

## The Brain

**Equipment.** The brain painting, two views, one set of names (Spec-Brain-Bench); Flash, Creep, Trace (Spec-Trace-Bench); `js/necker.js`.

*About Your Brain* — **tool**, hung. *Star in a Mirror* — **tool** (door: the star story). *Three at a Glance's flash* — **tool** (door: Three at a Glance). *Necker's drawings* — **tool** (door: Professor Necker's Drawing, hung). Stories: the brain series (24, per Brain-Series-Map).

## Probability and Statistics

*Random walks* — **idea**. Geometry is the setting. **Door: *The Drunk Man and the Drunk Bird*** (Pólya; two dimensions returns, three may not). Waits on `grid`.

## Physics (maybe)

Beads already is one. Nothing else named.

## How this is kept

A new interactive or level gets a line here the day it is named, at **idea**, and moves as it is built. A story that calls a level is written on that level's line; a level with no **door** cannot be used by anything yet. The Labs plaque's page (`labs.html`) should eventually be this ledger's shelf view, one shelf per lab, made from the same list.
