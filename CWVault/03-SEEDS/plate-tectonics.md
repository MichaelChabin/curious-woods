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

## 6 Oct 2026 — the thinking of 5–6 Oct, and what it settled

The deep-time Time Machine was thought through in two chats (5 Oct on the Desktop, 6 Oct in
Claude Code). The ideas are in `claude/Ideas-Ledger.md` under *Other labs* (from *Nested
deep-time bar* to *Thousand-year blocks*) and *Stories* (*The edge of knowing*). The way to
build it is `claude/Plan-Deep-Time.md`. What this seed held as undecided now reads:

- **Lab capability or story?** Both, in the ruled order: the lab first (Time-Machine-Shape:
  every capability on), stories as fixed viewings of it. *The edge of knowing* is the story
  that wants it first.
- **A place that is not where it was.** For most deep-time events the place is where the
  evidence is, today (Jack Hills, Acasta, Hamersley, Mistaken Point), and the mark means
  *where we found out*. Only an event about a position needs a plate, and the plate
  data carries that.
- **The data.** EarthByte's open models (Merdith et al. 2021, to a billion years; CC-BY)
  are the first source, exported through GPlates as coastline rings per age in the shape the
  ice outlines already use. PALEOMAP's licence is still to be checked; a second model is
  wanted anyway, because the disagreement between two is one of the two honest measures of
  the fog (ledger, *Measuring the fog*).
- **The map is the change, not the timeline.** The pyramid is today's ground, so before a
  few million years there is nothing to lay a layer on. The globe is a second base picture,
  outlines only, and the one engine change the thread needs (ledger, *Zoom in time is zoom
  in space*).
- **A working mockup exists:** the artifact *Deep time, nested* (5 Oct), with the chunk
  tree as data, the pull-down, the twitch for a bar that cannot open, dot-and-tail marks and
  a fog-graded globe stand-in. It is a sketch to read, not code to keep.
- **The motion is real (Michael, 6 Oct, later).** Not a crossfade of stills: the data is
  pieces with plate identities and sampled rotations, and the page turns each piece to its
  year. Plan-Deep-Time.md Stage 1 says how.
