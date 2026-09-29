---
status: Live ledger — started 29 Sept 2026, from Michael's geometry tree. The manager chat keeps it; Michael reads it. Companion to the Stories Ledger.
role: The labs: what equipment each stands on, what interactives it holds and their state, and which stories call each. If an interactive isn't here, it doesn't exist yet.
related: Ruling-Labs-and-the-Plane.md (what a lab is), Spec-Gallery.md (Labs plaque), 00-STORIES-LEDGER.md
---

# The Labs Ledger

A **lab** is a family of interactives on one subject that share the same equipment. Capabilities are built here; stories call subsets of them. A child reaches a lab through a story, or through the Labs plaque, where each lab is a shelf she can browse, and every tool on the shelf says "there's a story about this" when there is.

States: **idea** (named, nothing built) · **bench** (exists in `experiments/`) · **tool** (in `active/`, callable by stories) · **shelf** (listed on the lab's page for browsing).

## Geometry: Glass

**Equipment.** The plane (`js/plane.js`): one origin, 0 and 1 put down first, the metre as default unit, zoom and pan, the 1–5–10 lattice, the unit square as the number map's cell. Euclid's two gestures: tap-tap for a line, tap-hold-drag for a circle; intersections usable at once. The operation log (save, undo, replay). Fill by tapping the surrounding segments. Postcard. Gestures decided here first (Rulings, *Gestures across tools*).

*Stained Glass* — the Euclid app itself. **tool**, hung in the gallery. Stories: *The Compass Counts to Six* (draft), *The Glass Rose* (draft).
*Making a Rose* — circles only; the rosette from 0 and 1. **idea** (the compass story is its door; may be the app with lines hidden rather than a separate tool).
*Lines only* — given three non-collinear points, what straight lines can make. **idea**. Story: Frank Lloyd Wright's windows (wanted).
*The Grid* — the plane ruled. **bench** (Glass grid bench, per Prompt-Glass-Grid-Bench and Worknote-Glass-Grid-24Sept).
*Rectangles* — click-drag between intersections; right triangles; registration point, dimensions, area shown. **idea**. Stories: Wright's windows (wanted).
*Reshapable rectangles* — union, intersection, subtraction. **idea**. Stories: Cézanne (find the big rectangles in a picture and colour them; wanted); cubism (maybe).
*Numbers on the grid* — squares, pronics, nearly-squares; the rationals built with triangles; resolution (rulings in halves, thirds, tenths). **bench**: Multiply bench, Ruling bench, and the older Glass Multiplication lab in `active/`. Stories: Ahmes, primes, pronics (wanted).
*Plots* — **idea**.
*Graphs of linked notes* — **idea**; may belong to Maps and Timelines instead.

## Maps and Timelines

**Equipment.** `js/map.js` (the map, `cwWindow` for a picture in a window), `stories/events.json`, `world-events.json`, `places.json`; After the Ice (timeline-bench). Spec-Maps, Spec-Map-Lab, Spec-Timeline-and-Map.

*After the Ice* — the timeline. **bench**; hangs nowhere yet (where it hangs is unruled). Story: *After the Ice* (draft).
*The map* — where is that. **tool** (used by the painting stories and Necker's Drawing).
*Deep-time timelines* — the seven tiers. **idea**.

## Sound and Music

**Equipment.** Web Audio; the Jankó lattice; MIDI. *Why You Hear What You Hear* as grounding.

*Sound benches* (translator, Six Against Five, rhythm roll, prime tones) — **bench**. Stories: none yet call them.
*The tapping bench* — the practice's instrument. **bench**. Practice: rhythmic practice (not built).
*Beads* — beads on a string linked by springs; pluck, friction, stiffness. **bench** (Pull a Bead). Stories: wanted (sound first; measuring curves; pi by beads).

## Colour and Pixels

**Equipment.** `palettes.json` (the glass palettes and their chemistry, a source not a law); the three lamps.

*Colour filtering* (circles that change on a white page), *the three lamps*, *ink, light and spectra*, *pixels* (blow a picture up to its pixels; sample the screen?) — **idea**, with Worknote-Three-Lamps. Stories: the painting stories touch it (Vermeer's blue; Hokusai's Prussian blue).

## The Brain

**Equipment.** The brain painting, two views, one set of names (Spec-Brain-Bench); the Trace bench skeletons Flash, Creep, Trace (Spec-Trace-Bench).

*About Your Brain* — **tool**, hung. *Star in a Mirror* — **tool** (in the star story). *Three at a Glance's flash* — **tool**. *Necker's drawings* (`necker.js`) — **tool**. Stories: the brain series (24, per Brain-Series-Map).

## Probability and Statistics

*Random walks* and the rest — **idea**. Geometry as the setting.

## Physics (maybe)

Beads already is one. Nothing else named.

## How this is kept

A new interactive gets a line here the day it is named, at **idea**, and moves as it is built. A story that calls a tool is written on the tool's line; a tool with no story is a story wanted. The Labs plaque's page (`labs.html`) should eventually be this ledger's shelf view, one shelf per lab, made from the same list.
