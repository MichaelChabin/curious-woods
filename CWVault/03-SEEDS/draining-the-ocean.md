---
kind: question
status: seed
intuitions: [i05, i03, i13]
domain: [geography]
scale: [distance, size]
lab: none
hook: Pull the plug on the Atlantic and a mountain range longer than any on land comes up out of the water.
---

# Draining the ocean

Raised in the maps chat, late September 2026, with plate tectonics. Nothing decided
(Michael, 30 Sept).

**The idea.** A tool on the map that lowers the sea past any real sea level, down to
the floor, so the ocean's shape shows: the mid-Atlantic ridge, the trenches off Japan
and Chile, the shelf edges as cliffs, Hawaii as a mountain taller than Everest measured
from its base. Not a past world — no sea was ever this low — but the same gesture as the
sea-level slider, carried past its data.

**What exists.** The ETOPO 2022 grid in `_data/` holds the whole floor, not only the
shelf, so this is a rendering pass on data already on disk. The shallow-sea layer
(Spec-Maps, *Time on the map*) stops at 130 m, the ice-age low, and is built as a
depth image per tile; a floor layer would be the same shape of thing with a deeper
ramp, or the base picture rendered with the sea colours removed.

**Undecided.** Whether it is a slider on the sea-level bench, past 130 m, or its own
tool in the Map Lab. Whether the drained floor keeps the sea's colours or takes the
land ramp. Whether any story wants it — the engine rule (Spec-Maps, *The order*) builds
a capability under a story first. Whether `lab: maps` should exist as a facet value;
proposed here, not added.

Related: `claude/Spec-Maps.md` (*Time on the map*), `claude/Spec-Map-Lab.md`,
`03-SEEDS/plate-tectonics.md`.
