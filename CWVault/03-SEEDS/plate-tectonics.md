---
kind: question
status: seed
intuitions: [i13, i10, i05]
domain: [geography, physics]
scale: [time, distance]
lab: none
hook: Run the clock back and India is an island racing north at about the speed your hair grows.
---

# Plate tectonics on the map

Raised in the maps chat, late September 2026, with draining the ocean. Nothing decided
(Michael, 30 Sept). The board has carried it since August as the cold line *Deep time /
continental drift (M12)*: structurally the same object as the timeline at a different
zoom, build once, not twice.

**The idea.** The moving world's layers change with a year (Spec-Maps, *Time on the
map*): the sea, the ice, the Sahara. Tectonics is the same rule at a deeper tier of
time. Set the year to fifty million years ago and the continents are elsewhere;
`map.setTime(year)` would reach past the ice-age curve into a different data set.

**The source named in the chat.** Christopher Scotese's PALEOMAP reconstructions,
which give continental positions and coastlines at intervals back through the
Phanerozoic. Their licence is the first question, as it was for the ice outlines
(ICE-6G, where Michael wrote to the author). The EarthByte group's GPlates models are
the open alternative and worth checking at the same time.

**What this does to the store.** The time standard (Spec-Maps, *After the Ice, on the
moving world*) already writes the astronomer's year with decimals allowed and nothing
special at zero, so −65 400 000 is a valid year. A timeline is a zero and a name; the
mammals' line and the fire line were foreseen there. What was not: at these years the
places move too, so `places.json` would need a plate, not only a longitude and
latitude.

**Undecided.** Everything above the data: whether tectonics is a lab capability or a
story, which story wants it first, and how the moving world handles a place that is
not where it was.

Related: `claude/Spec-Maps.md`, `claude/Spec-Map-Lab.md`,
`03-SEEDS/draining-the-ocean.md`, Board *Time and the map* and *M12*.
