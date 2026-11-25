---
status: DRAFT of Michael's survey prompt, 18 Nov 2026, from the "time lab review" chat; widened the same afternoon. For Michael to read and change before it goes to Claude Code. A survey: nothing is wired into the Time lab. Best run after the Fable reset on Thursday 20 Nov.
role: Find out which free scientific sources can give the Time lab what it lacks: shallow seas, fossils where they lay, the rock under her feet, the rise and fall of life, and the Earth's quakes and eruptions, live and over a century. Test each on one bench page; try one creature, T. rex, end to end.
related: Lab-Time.md, Spec-Earth-3D.md, Report-Time-Lab-Bench-08.md (the page as it stands), Timeline-Stories.md (the store's rules), Plan-Life-in-Deep-Time.md, Life-Drawing-Style.md, Worknote-Probe-01.md, Spec-Maps.md
updated: 2026-11-18
---

# Survey: ancient seas, fossils, rocks, and the Earth today

## Why

The Time lab's Earth cannot show the shallow seas that once lay on the continents. Two matter to Michael at once:

- **The Permian sea** in the Delaware Basin of New Mexico and Texas, about 260 million years ago. Its reef is the rock of Carlsbad Caverns.
- **The Western Interior Seaway**, which split North America in two in the late Cretaceous. T. rex lived on its western shore, about 68 to 66 million years ago.

The lab's continents come from Merdith and others (2021), a plate model. It says where the plates were, not where the water was, so no resolution would show these seas.

While looking, try four more sources that would give the lab what it lacks: where fossils were found, the rock under a spot, how many kinds of animal there were through time, and the quakes and eruptions happening now.

## Licences first

For every source below, find the exact licence and the credit line it asks for. If one is not free for a public, non-commercial site for children, say so and do not use it on the bench. Michael believes the Paleobiology Database is CC BY 4.0, and that USGS data is in the public domain; confirm both. The ISC-GEM catalogue and the Smithsonian's volcano data need checking with care.

## 1. Shallow seas

**Sources.**
- **PALEOMAP paleoDEMs** (Scotese and Wright, 2018): ancient elevation and sea depth, 540 million years ago to now, every five million years. 1° on EarthByte; 0.1° on Zenodo (record 5460860, netCDF only). https://www.earthbyte.org/paleodem-resource-scotese-and-wright-2018/
- **PaleoMAP paleocoastlines** (Kocsis and Scotese, 2021): coastlines traced from those maps and adjusted to the highest sea of each age using marine fossils. Shapefiles, Zenodo record 7994000, version 7.3 or later.

**Find out.**
- Fetch the 0.1° set if it can be had; otherwise the 1°.
- What plate model the maps were made on, and whether they can sit beside Merdith's continents. If not, what it would take to use the paleoDEMs for the whole Earth from 540 million years ago to now.
- What a set for the globe would weigh at the resolution you'd choose, and how little the child would need to download at once if the page fetched only the two maps either side of her year.
- What it would take to blend between five-million-year steps so the sea does not jump. Say only; don't build it.

## 2. Fossils where they lay: T. rex, end to end

A creature is an event with two ends: when it lived, and where it was found. Try it with T. rex. Write nothing for children; this is plumbing and facts, for Claude to write from later.

- **From the Paleobiology Database** (https://paleobiodb.org/data1.2/), every occurrence of *Tyrannosaurus rex*: the place now, the place then (68 Ma, using the database's own conversion), the formation, the age range, the reference. Say how many there are and how many look doubtful.
- **Three to five famous specimens** (Sue is one). For each, from published sources: who found it, the year, where, where it can be seen now, and **how its age is known**: what was dated (an ash bed above or below, say), by what method, and what age that gave. Say plainly when the age rests on rocks dated elsewhere, or on the animals and pollen found with it, rather than on a date of its own. Mark each age *measured* (dated directly), *worked out* (reasoned from other rocks or fossils), or *a guess*.
- Put the specimens in `CWVault/claude/Creature-Trex-Finds-01.md`, one entry each, with sources.

## 3. How many kinds of animal, through time

From the Paleobiology Database, the number of marine animal genera alive in each stage, from 540 million years ago to now. This is the curve that rises and falls off a cliff five times.

- Use a standard method and say which, in a sentence a non-specialist could follow, and what its known weaknesses are.
- Draw it on the bench as a plot under the Earth, on the same time scale as the lab's timeline.
- Name the stages where it drops most, so they can be matched to events in the store.

## 4. The rock under her feet

**Macrostrat** (https://macrostrat.org), from the same group as the Paleobiology Database: geological maps of the whole Earth, with the age of the rock at the surface.

- Can it answer, for any spot she taps, "the rock here is about so many million years old, and it is sandstone (or lava, or limestone)"? How good is it outside North America?
- Does it say how each age is known? If so, how.
- On the bench, a tap on today's Earth shows the answer, plain. Try Santa Fe, Carlsbad Caverns, Dublin, and the middle of Australia.

## 5. Quakes and eruptions: now, and for a century

Michael's geologist friend opens every talk with the earthquakes and volcanoes active that week. The lab could do the same.

**Sources.**
- **USGS earthquake feeds**: the last hour, day, week or month, updated every few minutes. https://earthquake.usgs.gov/earthquakes/feed/
- **ISC-GEM catalogue**: the large earthquakes (magnitude 5.5 and up) recorded by instruments since 1904.
- **Smithsonian Global Volcanism Program**: the weekly volcanic activity report, and *Volcanoes of the World*, eruptions of the last 12,000 years.

**Find out.**
- Can the page read the USGS feed directly in the browser? This would be the lab's first live data; Spec-Maps ruled out map services at runtime. Offer a fallback: a copy fetched once a day.
- Is there a feed or file for current eruptions that a page can read?
- On the bench, on today's Earth: **this week's** quakes and eruptions; then **a century** of large quakes, played from 1904 to now in about thirty seconds. Michael expects the quakes to draw the plate boundaries by themselves; say whether they do.
- How many eruptions in *Volcanoes of the World* fall inside the Time lab's last 12,000 years, and how many have a year rather than a range? That decides whether they could ride on the *Civilization* timeline.

## The bench

One new page, `cw-deploys/experiments/ancient-seas.html`, built from the Time lab's Earth. Nothing in `time-lab.html` or the shared scripts changes. A plain menu of words chooses what it shows:

- *260 Ma* and *68 Ma*: the Earth from the paleoDEM, shallow seas visible, turned so New Mexico faces her; *Show coastlines* draws the coastline over it; beside each, the same moment as the Time lab shows it now.
- *T. rex*: the finds at their places on the 68 Ma Earth; *now* moves the Earth to today and each mark travels with its rock.
- *Life*: the genus curve.
- *Rock*: tap today's Earth for Macrostrat's answer.
- *This week* and *A century*: quakes and eruptions.

Colours follow the Time lab's: deeper sea darker, white only for ice.

## Not in this survey

Wiring any of it into `time-lab.html`; other creatures; pictures of creatures; text for children; Ron Blakey's maps, which are licensed separately.

## Report, then stop

`CWVault/claude/Report-Survey-Ancient-Seas-01.md`, a section for each of the five, each ending with what it would take to bring it into the Time lab and what it would cost the child to download. Licences and credit lines in a table at the top. Pictures in `CWVault/claude/Ancient-Seas-Nov18/`, and a short recording of the century of quakes.

Say plainly what you could not fetch or could not check. Stop and report. Don't commit.
