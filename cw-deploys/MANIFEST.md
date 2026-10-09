# cw-deploys — what is here

Netlify publishes this folder and nothing above it. Anything outside
`cw-deploys/` is never served.

## Folders

**`active/`** — current, shipping. Hung in the gallery (`index.html`, by a line in
`stories/gallery.json`) or listed on `labs.html`.
No version numbers or dates in filenames here: the file at
`active/glass-geometry.html` is *the* Glass Geometry, always.

**`experiments/`** — live and reachable, but unpolished. Linked only from
`experiments/index.html`, never from the main index. Version numbers are
allowed here.

**`_redirects`** — root of this folder, alongside `_headers`. Netlify reads it. Holds the
301s left behind when a live page moves; a page that has been published keeps its old URL
working, for the same reason retired files are never deleted.

**`../outdated-files/`** — outside this folder, so Netlify never serves it.
Superseded versions, kept as the archive record.

**`js/`** — shared code, at the root of this folder. Classic scripts, no
build step. **`map.js` (moved here 20 Sep 2026 from `experiments/maps/`, Michael's call, when
the Hokusai story called it; a second base, the globe past the deep-time seam, 6 Oct 2026 — see
`experiments/join-bench.html`)** — the map overlay: `cwMap`, `cwMapWindow`, `cwMap.load`, and
the projection pair `cwMap.toPixel` / `cwMap.toLonLat`. Described in full under
`experiments/maps/`, beside `render.py`, which makes the pictures it draws on. **`timeline.js`** gained the
dot and tail on 7 Oct 2026 (Plan-Deep-Time Stage 6): an event with `tail`, a year older than its own,
draws a one-sided fade from the tail to the dot instead of the symmetric stretch; no event on the
twelve-thousand-year line carries one yet. Loaded with a
version query by `active/hokusai-the-great-wave.html`, `active/vermeer-girl-with-a-pearl-earring.html` and `experiments/maps/map-bench.html`. 21 Sep 2026: one text block open at a time, and any other action — a press anywhere else, a key — closes it (Spec-Maps, *What a tap opens*); a path with `possible` draws dashed. 26 Sep 2026 (`?v=2026-09-26c` on all seven pages that load it): (27 Sep, `?v=2026-09-27`: the window's *close* is 13 px bold, was 11 px) the window's drag strip sticks on the window's top edge, not 18 px below it, so a tall scrolling window (the Darkness poem) no longer shows its words through a slit above the strip; the words fade under it. **`stories/world-events.json` and `stories/places.json` (22 Sep 2026; 2 Oct 2026: ten events and twelve places from The Glass Rose, 1079 to 1351 — Khayyam's calendar, Domesday, Shen Kuo, Cahokia, Abelard, Zhu Yu, Angkor Wat, Adelard, Xàtiva paper, blue-and-white; Isfahan to Cahokia, and five towns on Adelard's route)** — what the world owns,
shared by every story: one record per event (year, when, place, label, title, text, and since
27 Sep `weight`, 1 to 3) and one per place (name, lat, lon, `weight`). **`stories/sea-level.json`
(29 Sep 2026)** — global sea level in metres by years ago, 20,000 to today, read from Lambeck et
al. 2014 (PNAS 111:15296) and rounded, approximate, for maps that show time; its notes say to
check the paper's table before a story leans on a number. A story gives `timeline.js` a `pool` and a `placebook`, then picks events
by `ref`, sets each one's side, and may add `why` — its own last sentence. It never rewrites the
shared words. Seeded with 32 events and 17 places from the two painting stories. Separate from
`stories/after-the-ice-events.json` (27 Sep; it replaced `stories/events.json`), After the Ice's own
events, which `experiments/after-the-ice.html` merges with these two at load without writing to
them; its survivors join this list by copying, later. **`stories/timeline-events.json` (30 Sep 2026)** — GENERATED, never
edited by hand: `tools/events-from-vault.py` (outside this folder, in `_CW/tools/`) reads
`CWVault/claude/Events-Batch-01.md`, `Events-Batch-02.md` (arrived 30 Sep, 13:42: 21 events, 1500 to
now, outside Europe), `Events-Batch-03.md` (1 Oct: 15 events from the ice to the Great Pyramid, each
upgraded from a September record and naming it in a `Replaces` field — `replaces` in the JSON — which
the page retires, keeping the old id as an alias so her line still finds it), `Events-Batch-04.md`
(1 Oct: 15 events, Stonehenge to Aeschylus, retiring sixteen September ids — Nineveh's library
retires two; `iron` moves to Tell Hammeh, about 900 BC, the new record's year and place),
`Events-Batch-05.md`, `-06.md` and `-07.md` (8 Oct, loaded 9 Oct: 36 events, Anaxagoras to the first web
page, retiring 38 September ids — Tambora, Frankenstein and the Montparnasse train retire two each;
Issun-bōshi replaces none; nine moved in year or place to the new record's — Socrates to his trial,
399 BCE; Teotihuacan to about 400; Ibn al-Haytham to about 1030; the compass to about 1088 at
Zhenjiang; Galileo's telescope to 1610; decimal fractions to Stevin, Leiden, 1585; Galvani's frogs
to 1791; the first photograph to 1827; Impression, Sunrise to Paris) and
`Timeline-Samples.md` and writes the 109 events written to `Timeline-Stories.md`. Since 9 Oct
batches 1 and 2 and the samples carry Replaces lines too (the fifteen pairs the Time Machine page
held as `SAME`, and the worklist's two merges, `uruk` into Writing at Uruk and `lead-nineveh-2` into
Homer written down), so every retirement is in the markdown. A precision word's bracketed note
("exact (19 August 1839)", "decade (the Kanbun era, 1661–1673)") is `exactDate` for an exact
precision and `precisionNote` otherwise; a year's note ("−398 (399 BCE)") is `yearNote`; nothing on
a page reads them. Labels in batches
1 to 3 shortened 1 Oct (Michael: a word or two). A paragraph of a More that is a set-apart
quotation (a line beginning `> `) is `{"quote": text}` and the page draws it as
`css/story.css`'s blockquote: id, label, `year` (astronomers'), `precision`, `kind` (the closed list;
Eratosthenes's and Leavitt's `idea` is outside it and marked), `place` (name, `short` for the map
label — where the source names a stand-in after a colon, as the Moon landing names Kennedy Space
Center, the stand-in is the label — lat, lon; the eclipse has no coordinates in its source and says
so), the summary without its
trailing More, the More as paragraphs with its date line as parts (count, ordinary date, years
ago, each with `about`), references, the Pictures wanted line as data, and a `weight` (1 to 3)
proposed by the tool and marked `proposed`. Notes for us and the Checked paragraph never enter it. Read by
`active/time-machine.html`; folded whole into `stories/deep-time-events.json` by `tools/deep-events-from-vault.py`
(9 Oct). **`stories/curves/` (30 Sep 2026)** — curves a timeline draws
along its span, points in astronomers' years with the source, the licence and how sure the
numbers are: `people.json` (world population, Our World in Data's long-run series — HYDE 3.3,
Gapminder, UN WPP — thinned to 73 points, CC BY 4.0) and `sea-level.json` (the readings of
`stories/sea-level.json`, Lambeck et al. 2014, converted from years ago to the store's year).
**Curves with a band (6 Oct 2026, Plan-Deep-Time Stage 5)** — GENERATED by `tools/curves-deep-time.py`
(outside this folder, in `_CW/tools/`), each point `[year, value, low, high]` by ascending year, with
`scale` ('linear' or 'log'), `unit`, `say` (the words at the marker, `{v}` the number), `howSure` and the
sources; a reader that wants only `[year, value]` takes the first two: **`sea-level-ice-ages.json`** (0 to
3 million years: Spratt & Lisiecki 2016's stack to 798 ka with its 95 % bounds, every 2 ka; Bintanja &
van de Wal 2008's modelled sea level from there, every 5 ka, its sign flipped from the file's
drop-in-level and a ±20 m band that is a judgment; both from NOAA's paleoclimate archive — the join
bench's map reads it, so the sea no longer clamps to the Lambeck curve's first reading past 20,000
years), **`oxygen.json`** (a fraction of today's, 4 billion years, log: the envelope of Lyons, Reinhard
& Planavsky 2014 figure 1, read off the figure, the band being the point; the last million years from
ice cores), **`day-length.json`** (hours: Williams 2000, Meyers & Malinverno 2018, Bartlett & Stevenson
2016, the first point from the moon-forming models), **`minerals.json`** (kinds of mineral by Hazen et
al. 2008's stages, kept on the 2008 scale), **`sun-and-inside.json`** (two series on one log axis in
W/m² of surface — the sun absorbed, from Gough 1981's brightening, and the heat from inside, a sketch
from Davies & Davies 2010, Korenaga 2008 and Zahnle et al. 2007 — so the crossing in the first stretch
can be seen; `second: { name, say, points }`), **`crust-and-land.json`** (7 Oct: the amount of continent, two
series as fractions of the earth's surface — the crust that existed, today 0.40, and the land above the
sea, today 0.29 — a sketch from the reviews with the disagreement as the band; the globe's invented land
takes its area from the first). Drawn by `js/deep-time.js`'s `setCurve`.
**`stories/deep-time.json` (6 Oct 2026; rewritten 9 Oct)** — the period tree of the one timeline, edited by hand.
**Since 9 Oct 2026 (lane B of `CWVault/claude/Prompt-Build-One-Timeline.md`, on Michael's rulings of that day,
Rulings-Sept-2026.md *The one timeline* 2):** Michael's five periods, plainly named — the young Earth (4,568–4,000
million years), First life (4,000–2,400), Oxygen arrives (2,400–1,800), Ancestors (1,800–635), Animals (635–now),
Animals dropping to In the sea (635–470), On land (470–252), The dinosaurs (252–66) and After the dinosaurs
(66–now), which drops to Humans (6–now), The ice ages (2.6–now), Our kind (0.3–now) and After the ice (0.0117–now,
`line: 'after-the-ice'`). Each period: `name`, `short` for a narrow segment, `knownFrom` (one line saying what the
stretch is known from, the fog in words, rewritten for the new cuts), `colour` (after Hazen's sequence, drawn as a
quiet tint), `chunks`. The root reaches 4,568 so the oldest grains draw. The 5 % rule (a segment narrower than
about five percent of its line is not a period) holds everywhere but the last rung: After the ice is 3.9 % of
Our kind and stays, as the door to the Time Machine; the ice ages, which would have been 3.9 % of After the
dinosaurs, ride inside Humans. The six chunks of 6 Oct cut where the evidence changed kind; these cut where the
story changes and keep the evidence in the knownFrom lines. The old `marks` (the sketches) are gone: the store
holds every event. Read by `js/deep-time.js`.
**`stories/deep-time-events.json` (7 Oct 2026; the one store since 9 Oct)** — GENERATED, never edited by hand.
**Since 9 Oct 2026 it is the one store of Deep Time, every event deep and after the ice** (Plan-Deep-Time
Stage 7's first step; Michael, 9 Oct: deep time supersedes the timeline, and the two sets of batches
merge into the events it uses, the new names and labels winning over old ones): 180 records, oldest
first, each with `ma` and `chunk` and a `line` saying which it is — 69 `deep` records as below; 109
`after-the-ice` records, the timeline batches 1 to 7 and the samples parsed by `tools/events-from-vault.py`'s
own parser (the same records as `timeline-events.json`, with `ma` added; their date line stays as its
parts and `js/deep-time.js` steps it as the Time Machine does); and the 2 September survivors of
`after-the-ice-events.json` that no record replaces (`jomon`, which Michael saved for deep time and
now sits on the ice-ages bar at 11,925 years ago, and `starry`, which links to its story), marked
`legacy`, their blurb after its plain year as the summary, no More. `aliases` maps all 86 retired
September ids to the record that stands for them; `cut` names the two dropped with no replacement
(`lead-socrates-2` Heraclitus, `lead-frank-3` Aldini). The tree's last two sketches (*The ice lets go*,
*Writing*) are replaced by the timeline's own records, so every sketch in `deep-time.json` is now
retired. One deep record, the oldest grains at 4567.3 Ma, lies 0.3 million years past the tree's root
(4567) and has no chunk, so no bar draws it — as before this change; open. **The deep records (7 Oct):**
written by a Cowork chat on Opus to `CWVault/claude/Prompt-Deep-Time-Events.md` in seven batches
(`CWVault/claude/Events-Deep-01.md` to `-07.md`, 6–7 Oct; researched by agents, checked by four
independent checkers each) and read by `tools/deep-events-from-vault.py` (outside this folder, in
`_CW/tools/`): 69 events from the oldest grains in a meteorite to the last glacial maximum, and the
beads, paint and flutes of the ice ages. The same record shape as `timeline-events.json` plus the deep
fields — `ma`, `uncertaintyMa` and `precisionYears` (null where the Age line gave none), `ageHow`,
`tail` with its reason and `evidence` (earliest or dated), `knownFrom`, `placeNow` (where the evidence is
today), `replacesSketch`, `chunk`, the date line as `{ ago, tail, sure? }` (deep lines count ago only) —
with a weight proposed by rule. A later batch
revising an earlier event (batch 7's *Archaeopteryx*) wins. Read by `js/deep-time.js` on
`active/deep-time.html` and the two benches; the More opens in the map's window on the page and inline on
the bar bench. The Time Machine page still reads `timeline-events.json` and the September file, its own
two, until it opens on the earth line (the rest of Stage 7).
**`stories/plates/continents.json` (6 Oct 2026)** — GENERATED, never edited by hand: the continents
in motion, for the deep-time Time Machine (`CWVault/claude/Plan-Deep-Time.md`, Stage 1).
`tools/plates-from-gplates.py` (outside this folder, in `_CW/tools/`; needs `pip install pygplates
plate-model-manager`, and fetches the model once into `~/Library/Caches/cw-plate-models/`) reads
EarthByte's Merdith et al. 2021 model (a billion years, paleomagnetic frame, CC BY 4.0; citation and
licence in the file) and writes `pieces` — 795 outlines of continent as they are today, simplified to
three-quarters of a degree, each with its plate and the span of years it exists, its real birth age even
past the model's reach (7 Oct; a craton born at 2.6 billion years is drawn, placed at random, when the
year is older than the model) — `reach` (1000) — and `plates` — each
of 416 plates' finite rotation (pole lat, lon, angle) from today to every sampled age, every 5 million
years to 540 and every 10 to 1000, kept only while the plate has a living piece — with `ages` and
`grades` (how sure the positions are, in the words of knowing: measured to 200 million years, inferred
to 540, fitted to the reach, with the reason; the page adds guessed, invented and none). A page turns each living piece by its plate's rotation at the year,
interpolated as a rotation, and draws it: true motion, not stills (Michael, 6 Oct). 0.96 MB, 0.25 MB
gzipped. The tool checks its own file against pyGPlates (0.0065° worst) and draws proof pictures
with `--png`. Not yet read by any page; Stage 3 (the globe) will.
**`stack.js` (22 Sep 2026)** — one picture slot, several pictures, in a loop: `cwStack(figure, steps)`,
each step `{ src, w, h, alt, caption, name }`. A bold word under the caption names the next picture
("Next: the powder", "Back to the stone" on the last); the word moves the stack, never a tap on the
picture, since a picture may already have taps of its own. A step whose file will not load is dropped.
First used by the Vermeer story for the blue: stone, powder, turban.
**`necker.js` (25 Sep 2026)** — solids drawn in bare lines, the kind that turn inside out:
`cwNecker(host, { shape, size, letters, dots, fill, cycle, label })` and `cwNecker.url(shape)`,
the same drawing as a 412 × 256 image for a stack. Shapes: Necker's `box` (his rhomboid), the
`cube`, the `octahedron` in the cube's oblique view, `sugar` (an upright block, slanted depth),
Schröder's `staircase`, the three-line `corner`. One even line weight in story.css's `--cw-ink`,
no dotted hidden edges; `letters` sets Necker's A and X in copper at body-text size, regular weight,
drawn behind the lines and a little away from their corners (26 Sep; bold ones hid the corners); `cycle` makes a tap fill the front face, then the back, then neither, at once. Nothing
animates, nothing is recorded, nothing counted: the drawing does not change, the seeing does.
Each figure carries a description saying what its two readings are. First used by
`active/professor-neckers-drawing.html`. **`map.js`, 30 Sep 2026 — one year in** (`?v=2026-09-30` on
`experiments/time-machine.html`; the other pages keep their query): `map.setTime(year)` takes the
store's astronomer's year and turns on the layers that are true for it from what the page hands
it in `opts.time` — `{ seaLevel: [[year, metres], ...] }` sets the sea from the curve, `{ ice }`
blends the outlines as `setIce` does; a layer not given, or not rendered, stays as today's.
`map.time()` is the year last given. **`map.js`, 29 Sep 2026 — the ice:** `map.setIce(outlines, yearsAgo)` draws the ice that
existed then and not now, as soft filled outlines in the ice colour, cross-faded between the
two nearest time steps, over the ground and the lowered sea and under today's coast and the
marks; on any map. The outlines themselves — from ICE-6G_C, made by `render.py --ice` — are
**not** in this folder: they live in `../prototypes/ice/`, ignored by git, until Peltier's
group says yes to publishing them (Michael's email, 29 Sep). The prototype page that uses
them is `../prototypes/ice-bench.html`, run from the whole-folder server at
`http://localhost:8766/prototypes/ice-bench.html`. **`map.js`, 29 Sep 2026 — time on the map, the sea first** (Spec-Maps, *Time on the map*):
`map.setSeaLevel(metres)` and `opts.seaLevel` paint what a lower sea exposes, from the
pyramid's shallow-sea layer, on a canvas over the tiles and under the marks — the land
colour by height above the new shore, a hint of the old sea floor through it, the new
shoreline in the coast's own ink, today's coast still drawn over it. Full resolution, the
depth smoothed so the shore is a curve; about 9 ms a frame, so it follows a pan or a zoom
live. Zero is today and paints nothing. **`map.js`, 27 Sep 2026 — the world that moves** (Spec-Maps, *The world that moves*): given
`world-pyramid.json` as its region, `cwMap` is a view rather than a box — a centre and a
scale (since Michael's second look the same day: **Mercator at regional spans, fading to
equirectangular by a 120° span**, one pair of functions that tiles, marks and lines all go
through, a tile row stretched linearly between its own two latitudes and the marks using
the same knots, so they always agree; the first build scaled only the horizontal by the
cosine of the centre's latitude and a drag north changed the map's proportions), tiles arriving
for what is in view and dropped when it leaves (an older level's tiles stay under the new
ones until those have loaded, so the map never goes blank). Drag pans; pinch and the wheel
zoom by tenths, as Glass Geometry's do, but about the point under the fingers or the cursor
rather than the view's centre, because a map that zooms about its centre runs away from
what she is pinching. Labels keep the side they were given while a gesture lasts and are
placed afresh 120 ms after it ends. A strip along the bottom edge, the window's drag
handle turned to this use, resizes the height between 220 px and 85 % of the window; the
word at its right (`reset`, or `opts.reset`) returns view and size to what the story set.
`opts.fit` is that opening box; `map.centre(lat, lon)` slides there at her scale in 250 ms;
`map.fit(box)` fits a route with a twelfth of margin; `map.home()` is the word's own act;
`reset()` keeps its old meaning. A press that moves less than 6 px is a tap and reaches the
marks; a drag never ends in a click. **Weight** (1 to 3, 1 if unsaid) orders placement on
every map, still or moving: heavier first, so the heavier survives a collision. Wired to
`timeline.js` with `moving: true`: no far-away cards, a tap centres the map on the place,
a route fits itself, clearing moves nothing. The label placer reads the ground from the
visible tiles. **Michael's first look, 27 Sep, same day:** the horizontal correction fades
out as the view widens (full at a 20° span, gone by 120°), or the whole world came out
squashed; the view is clamped so the map always covers the frame and no edge of the world
comes inside it, which is also what stops a drag toward the pole from squashing the map;
a layer tile is hidden until its base tile has arrived, because the vegetation multiplied
over bare stage background was a grey-blue wash, seen on the live site where tiles come
slowly; a fresh press forgets any release that went astray and releases are heard on the
window, for a drag that died after a few zooms; the strip carries the picker handle's tint
so it reads as a handle, and its word is bold at 13 px. **Michael's second look, same
day:** the projection above; a bar down the left edge, outside the map, that widens it into
both margins at once (up to 240 px a side, never past the window) and back; and no text
selection anywhere on the page while a gesture lasts, since Safari selected the prose when
a drag ran off the map's bottom. **The stories, 27 Sep, same day, on Michael's word after his iPad:** every world
section moves — Hokusai, Vermeer, Van Gogh, Necker, Have You Thought of a Story — each
opening on the corners its regional crop had, its far-away cards turned into places on the
map; `template-story.html` is born with it. Hokusai's *Europe* card, a spread of six towns
standing for six events at a place called `europe` that never existed in `places.json`,
is gone: the six events sit in their towns in the shared file (Köping, Bath, Vienna,
Paris, London, Paris), which gains Vienna, Bath and Köping. **`weight`** is in both shared
files' schemas, every event and place given a provisional 1 to 3 for Michael to change.
The coast at the finest levels comes per tile column (see `art/maps/`). Region and
coastline fetches revalidate (`cache: 'no-cache'`) so a stale region JSON cannot hide a
new column file. First used by `experiments/maps/moving-bench.html`. The
six pages that load `map.js` had their version query bumped again (27b) after a bug in
this pass briefly made every still map recurse until its stack overflowed, caught by the
test that every story page still draws its maps. **`map.js`, 26 Sep 2026 — layers** (Spec-Maps, *The ground has layers*): `cwMap(container,
region, marks, opts)` and `cwMapWindow(region, marks, opts)` take an optional fourth
argument; `opts.layers` (`{ vegetation: false }`) turns a region's layers on or off by name
and everything unnamed takes the region's default; each layer that is on is an
`img.cw-layer` over the base and under the SVG with its blend, never a pointer target, and
label placement reads the ground with the layers composited in. No caller changed; the six
pages that load `map.js` had their version query bumped to 2026-09-26 (and their stamps),
so a cached copy does not show Greenland as bare high ground. **`map.js`, 25 Sep 2026:** the picker window is
now `cwWindow(content, opts)`, which `cwMapWindow` stands on unchanged; with `anything: true`
any other action (a tap on the content, a key, a scroll of the page) closes it. 26 Sep:
`opts.zoom` names a picture in the window that she can zoom and pan with the sampler's
gestures (pinch or ctrl-wheel to 6×, drag or wheel to pan, double tap, a *Reset* word);
touching that picture never closes the window. The Necker page asks for `map.js?v=2026-09-26b`. Built for the letter in the
Necker story (a picture in a window, per the Rulings). The Necker page loads `map.js?v=2026-09-25`;
the painting pages still ask for `?v=2026-09-22`, and nothing they call changed.
**`remember.js` (25 Sep 2026, on Michael's yes)** — "I want to Remember this" and the practice
list it fills: `cwRemember(word, item, { ref, list })`, `cwRemember.all()`, `cwRemember.remove(id)`.
An item is `{ id, title, from, href }` (href from the site's root). Stored on her device only, in
`localStorage` under `cw.practice.queue`, the key the star story and *Three at a Glance* already
write; their bare ids (`mirror-star`, `three-at-a-glance`) are read and given titles, so nothing
kept is lost. With Maya absent the word is invisible until `ref`, the paragraph naming it, comes
near, fades in over its last 300 px of climb, and then stays (the star story's behaviour); with
Maya present it is always there. A note under it, "In your practice list", links to the list.
It asks `navigator.storage.persist()`; Safari mostly ignores that and may clear the list after
about seven days without a visit unless the site is on the home screen. No dates, no counts.
First used by `active/professor-neckers-drawing.html`; the two older stories still carry
their own inline copies.
**`stories/world-events.json` and `places.json`, 25 Sep 2026:** four events added for *Necker's
World* — `kaleidoscope-1817`, `great-wave-1830`, `beagle-1831`, `stereoscope-1838` (40 in all) —
and four places, `geneva`, `edinburgh`, `plymouth`, `portree` (28). Three older events are filed
under `europe`, a card for stories set far away; the Necker page pins them to their towns on its
own map (`place: 'geneva'`, `'london'`, `'paris'` in its picks) and leaves the shared record alone.
**The same files, 26 Sep 2026:** nine events added for *Mary's World* — `galvani-frogs-1791`,
`volta-pile-1800`, `aldini-newgate-1803`, `waterloo-1815`, `ada-born-1815`, `darkness-1816`,
`running-machine-1817`, `vampyre-1819`, `frankenstein-stage-1823` (49 in all; `waterloo-1815` and its place taken out again 27 Sep, when Waterloo came off Mary's World and no page used it: 48 and 31) — and four places,
`bologna`, `como`, `waterloo`, `mannheim` (32). Where the story's panel text ended on a line of
its own ("Mary was five and lived in the city"), that line stayed on the page as `why` and the
shared record kept what happened. `frankenstein-1816` now sits at `geneva`, not `europe`; Hokusai,
whose map has Europe as a card, pins it back with `place: 'europe'` in its pick.
`art/stories/vermeer/lapis-stone.jpg`, `art/stories/vermeer/ultramarine-powder.jpg`, `art/stories/vermeer/vermeer-turban-detail.jpg` — that stack's
three pictures (the stone from Sar-e-Sang, James St. John, CC BY 2.0; the powder, Commons, public
domain; the turban cropped from our own scan).
**`css/htw.css` (29 Sep 2026)** — the left column's words as Glass Geometry draws them: the *How
this works* heading, the bulleted items, the italic action words and their `.absent` fade. Lifted
verbatim out of `active/glass-geometry.html`'s inline style so Wordplay's column is Geometry's and
the two cannot drift; both pages load it. Where the column sits stays each page's own rule.
**`css/story.css` (22 Sep 2026)** — how every story page looks: the shell, the reading
column, the left column (margin pictures and the tools' words), full-width pictures, the colour
readout, the phone and tablet rules. A page sets only `--aspect` (its main picture's shape) and
`--pic` on any full-width picture's frame. Pulled out of the Vermeer page when Hokusai was brought
into line, so a change to the look is made once. Loaded with a version query by both paintings.
**27 Sep 2026: a tall picture** (`?v=2026-09-27`, on *Have You Thought of a Story?*; the other pages keep
their older query, since nothing they use changed): `figure.tall` with `<figcaption class="tools"
id="toolwords">` puts the left-column block (note, caption, word) at the middle of the picture's
height instead of its foot, and under the picture where the column folds. `.word.say` is a word that
is an instruction until there is something to do: bold, no pointer. Whether the middle-of-the-height
rule becomes the Pattern's for every portrait picture: **yes, Michael, 27 Sep** — it is now the standard
for a portrait picture (Story-Pattern, the template's comment). Also 27 Sep: `figure.poem` (a poem in a
window at the More text's 17 px, the window as narrow as its longest line, a wrapped line indented) and
.tools.hang (between 990 and 1067 px, where the column has folded but the page has a margin, a short word
stays to the left of its paragraph instead of moving above it).
Also 27 Sep (`?v=2026-09-27b`, all story pages restamped): where the left column folds, a margin
picture keeps its 300 px width, centred, instead of growing to the text's width (Michael: they "go to
the middle column and get bigger"); Vermeer's opening painting is `figure.tall`, its caption at the
middle of the painting's height, and under it when *Sample colours* moves the painting down.
**`cw-panel.js`, 1 Oct 2026 (`?v=2026-10-01b` on the five pages that load it: Geometry, Multiplication, Wordplay, Time Machine, the glass bench)** — both panels took pointer capture on pointerdown over their whole surface, so a click on a word inside the info panel (Play, the arrows, Start over) was delivered to the panel and never to the word; Michael found it on his first look at the module and it was there on the committed Geometry too. Now a press is not yet a drag: capture waits for the pointer to move four pixels, a slider keeps its own pointer, and nothing is prevented (the panel's user-select and touch-action already stop selection and scrolling). The choice panel got the same rule, one rule in one file. **`glass.js` (1 Oct 2026)** — **Glass Geometry as a shelf module**, served to stories as the map and the sampler are (Rulings-Sept-2026, *A lab is a place*, *Capability levels*; the prompt, `CWVault/claude/Prompt-Extract-Glass-Module.md`): `cwGlass(host, { level, open, palette, base })` → `{ el, level, replay(), focus(), resize(), destroy() }`. Extracted whole from `active/glass-geometry.html`, which is now a thin page over it; the lab's 4,600 lines of script moved into the factory unchanged in behaviour, which makes every one of its 264 top-level declarations per-instance. What was scoped: the CSS (every rule under `.cw-glass`, every `#id` a `.g-id` class looked up from the host, the column's words from `css/htw.css` carried as a scoped copy so the module needs no stylesheet — Wordplay still loads the file); the 18 fixed positions, now absolute inside the host, which fills the viewport on the standalone page so nothing visible changed there and in a story page nothing floats over the column (the one design decision, taken as the prompt said); the shared info and choice panels, which build themselves fixed on the body and are adopted into the host (the choice panel re-centred on the host each time it opens; `cw-panel.js` untouched); the eight window-size reads, now the host's size, with a ResizeObserver on the host beside the window's resize; the drags bound on the document, recorded so `destroy()` removes them; the keys (Cmd-S, Cmd-O), bound on the focusable host so they fire only in the lab last touched; the fetches, resolved from the script's own address (`base` overrides). **Levels:** `circles` (the straightedge gesture is absent, not greyed, and nothing says so) and `both` (the lab as it always was); `lines`, `grid`, `rectangles`, `regions`, `plots` are named, not built, and are served as `both` with a console warning, as is an unknown name. A level is a floor, not a ceiling, but nothing in the browser records what she has earned (only her library, the replay speed and the How-this-works flags), so the level asked for is the level served. `open` names a library construction to have ready behind the story's own word; `replay()` plays it through the same guard as Open. Her library keeps its keys (`cw-cx-index`, `cw-cx-<time>`, `cw-cx-builtin-png-v2-*`, `cw-replay-duration`, `cw-htw-geometry-v1*`), so a construction saved before the extraction opens after it (checked: one saved by the committed page, opened by the module). Two instances on a page share the library and nothing else (checked on the bench). Loaded with a version query by `active/glass-geometry.html` and `experiments/glass-module-bench.html`. **The window profile, 7 Oct 2026 (`?v=2026-10-07` on the four pages; Michael's prompt of 7 Oct, built as a profile of the one module rather than the new file it asked for, so the main lab is untouched):** `cwGlass(host, { app: 'window' })` is the lab seen entirely as a tool for stained-glass designs made of circles. Level `circles`, tap to fill, no measure; a tap inside a shape with no colour chosen fills it pale green (Michael's new rule, to try); the palette's first chip takes a pane's colour away, lead and all (a dissolve); the column is *How this works* (Circles, Color), *Glass only · Undo*, *New Open Save*, *Share*, a small right-set *Reset view* present only while the view is away from home with its space always kept, and *Demo*, the standard set this level can make in two columns up to eight (the Rose for now). A demo plays as it loads; its name again plays it from the start; her first mark during one ends it there and what has played is hers. *Save* keeps her own file: the first save asks a name, after that it quietly overwrites; a demo or anything started from one always asks a new name. *Open* lists only her designs and is present only when she has some. *Glass only* ↔ *Show circles* (Michael, 7 Oct: *Glass only* in place of *Just the glass* for this profile; the lab's *Color* spelling kept). New strings for the voice pass: *Glass only*, *Show circles*, *Undo*, *Reset view*, *Demo*. **Michael's rulings on the window profile, 8 Oct 2026 (`?v=2026-10-08` on the four pages and the experiments index):** the nine items of 7 Oct answered — the remove chip kept, both demo taps kept, no Bird until he saves one, the counts his, the slips corrected, the new strings fine, the phone width left (geometry on a phone is probably not practical), the stamps bumped, sound not raised. Five rules of the board, all behind `APP`: **colour goes to the smallest shape enclosing the tap, whatever was coloured before** (`windowTap`, by `findFaceAround`: a circle drawn across a coloured pane changes the pane's shape; a shape with glass of its own is repainted; a shape inside older glass gets glass of its own on top, the record's compositing doing the rest). **Remove takes glass away the same way, to the edges of the shape:** a shape with its own glass is dissolved; a shape inside older glass gets a pane of the board's own parchment with lead round it, so the glass under it is gone to the shape's edges and the fill op, the renderer, the postcard and the harness are unchanged; a remove tap with nothing under it does nothing, and never undoes. **A gesture starts only inside the drawing area**, a box inside the workspace drawn with the column's own line (`drawingBox`, 12 px in from the column and the edges, 32 px from the right); the column takes its own pointer events now, so a drag that starts over it draws nothing, and the strip at the right (`g-scroll-margin`) and the column are `touch-action: pan-y`, so a finger there scrolls the page. **The palette window's header is a strip tall enough to take hold of** (42 px, tinted; the lab's header is a line of text). **Arcs do not respond to a tap:** at tap-to-fill `onDown` already started nothing on an edge (2 Oct), but the release still emphasized it and laid lead; the release now does nothing at tap-to-fill, which touches `glass-circles.html` too and not the main lab. **Michael's first try, 8 Oct, later (`?v=2026-10-08b`):** he saved, pressed New, and 0 and 1 were gone, the Rose playing unseen — `replayLog` never reset *Glass only*, so a viewing from the last log carried into New and into a demo. In the window profile a replay now starts with the glass view off and the log says the rest; the main lab has the same habit and keeps it until Michael rules. (New absent on an empty board is the rule, not a loss: an empty board shows only Open.) **Michael's third look, 2 Oct (`?v=2026-10-02d`):** **Share is a word of its own** in the column, two lines under *Just the glass*, present only when there is something to send; it opens the postcard's preview and note box and OK sends it (the share sheet, or a download where there is none). *Postcard* left the Save panel, which is now *Save construction* and *Full sheet*. **Save construction** keeps the construction in the library and says so, then offers — only where a share sheet exists — *Share the file* (someone can drop it on their own window to open it) or *Not now*; the sheet no longer opens by itself unexplained. **Just the glass takes colour and nothing else:** a tap on glass with a colour chosen colours it; any other tap pans; no line starts, no lead is laid, no note, no undo. **Previews** are drawn from the construction's lines and circles when it has no glass (the Rose; anything she saves before leading it), and the built-ins' preview cache is keyed by the log's length as well as its name, after four previews stayed blank in Michael's browser from a stale log. **The data files are fetched with `cache: 'no-cache'`** — the site's `_headers` already revalidates everything, but Safari kept a local server's old `geo_squares_nested.json` and showed Michael the March vesica under the name Square. Four new child-facing strings for the voice pass: *Share* (the column word), *Share the file — someone can drop it on their own window to open it*, *Not now — it is in your library*. **The standard set, 2 Oct 2026 (`?v=2026-10-02b`):** Michael's list, nine constructions in the geometry spine's order, each ending in glass so a replay has somewhere to arrive, written as gestures by `tools/glass-constructions.js` through `tools/glass-log.js` — a harness that lifts the lab's own geometry code out of this file (the operation log, the helpers, fills and region detection; no DOM) and runs it in Node with stubs, so every id in a log is the lab's own and a log written there replays exactly as one the child drew. The nine, in `models/logs/`: Rose (`geo_rose.json`, the compass alone, no glass: the lead and glass are hers in The Glass Rose) · Equilateral Triangle (`geo_nested_triangle.json`, I.1) · Hexagon (`geo_hexagon_triangle.json`, IV.15 by the rose) · Perpendicular Bisector (`geo_bisector.json`, I.10, the vesica in four) · Square (`geo_squares_nested.json`, I.46 with I.11 for the right angles; file name kept) · Hexagram (`geo_hexagram.json`) · Pentagon (`geo_pentagon.json`, IV.11 by Richmond's half-radius construction) · Pentagram, nested (`geo_pentagram.json`, the pentagon's diagonals, then the inner pentagon's — eleven pieces of glass, the pattern going on as she zooms) · Pythagoras (`geo_pythagoras.json`, I.47 on a 30-60-90 triangle, squares on the three sides, no letters and no inner grids). `models/constructions.json` lists them in that order; the picker shows two sets, *My constructions* above *Standard constructions* (Michael's words, 2 Oct), a heading present only when its set has something in it. **Michael's own designs join the set at the end (9 Oct 2026):** Top (`geo_top.json`), saved from the window profile and shared as a file, his log as Save wrote it with the lab's own ids, listed under `_builtin_top` so the Demo list of Stained Glass Circles and the picker find it; it plays through to the finished glass (checked). Penguin to follow when the file reaches the disk. **Michael's second look, 2 Oct (`?v=2026-10-02`, both pages restamped):** the Equilateral Triangle's log stopped at the lead and never recorded the glass, so its replay ended with lead and no fill — the fill and the lead's lifting are appended, as the lab records them when a loop closes; the Hexagon's log drew a vesica with two triangles in it (March), and is rewritten as Euclid IV.15 by the rose's seven circles, the six sides, lead and glass (`models/logs/geo_hexagon_triangle.json`, file name kept so the manifest and the preview key stay put); the picker's preview cache key is `v3`, so previews drawn before the logs had glass regenerate. Nested Squares is the same March vesica with the two triangles and is not squares either — left for the canonical set Michael asked for (board). **Michael's first look, 1 Oct night, folded in:** the column is 160 wide (it was 220, sized for the palette that no longer lives in it); the palette window is 160 wide, its chips a third narrower; the palettes picker shows its fifteen at half size, 100 px thumbs in a 3 × 100 grid, and the window is measured rather than assumed 660 wide; *Save construction* keeps the construction in the browser and offers the share sheet where there is one (Mail among its doors on an iPad) and **never writes a file to the disk** — the download fallback is gone; Remember and its hint are not on screen while `CW.flags.maya` is false (Rulings, the Maya flag). **The circles level is Glass 1: Circles**, Michael's name: its column is *How this works* → *Circles*, *Color*; *New Open Save*; *Just the glass* ↔ *Show lines*; no *Cutting Shapes*, *Hiding Lines* or *Show map*. The *Circles* stage's words are the construction stage's with the lines taken out, nothing added (voice gate: *All your beautiful patterns begin with circles and two points. · To make a circle, tap a point, then drag to another. · Where circles intersect, new points appear. · Use those to make more circles. · Tap any empty space to undo.*); it has its own id and seen-flag so `text/geometry-v1.json`'s copy does not overwrite it. The level's `htw`, `map` and `madeWord` fields in `LEVELS` say which items a level serves; the column's items are rebuilt from them at mount. One consequence of ids becoming classes, found here: an id used to outrank any class rule, so the palette window's width beat `.workspace-tool`'s 188 px minimum; as class rules of equal weight the later one won, and the palette rule now carries one more class to stay in front — a thing to check whenever a rule in this file stops winning. **Found in the extraction:** Play, the arrows and Start over in the replay panel did not take a click, on the committed page as on the module — fixed the same night in `cw-panel.js` (below); the built-ins' picker thumbnails are blank parchment, because the preview is drawn from fills alone and the built-in logs have none, and the SVG thumbnail is only used when no preview exists; `#sound-permission` is markup with no script; the model tool's choice of picker is reachable only from a panel nothing summons. **`sampler.js` (21 Sep 2026)** — the magnifier and the colour sampler for any picture, `cwSampler(frame, anchors, opts)` → `{ arm, fit, drop, repaint }`; the Colour and Pixels shelf's first tool (Ruling-Labs-and-the-Plane, proposed). Pulled out of the Hokusai page, which still carries its own inline copy until it is converted to *Hokusai's World*. The page gives it the picture's own colour anchors (`{rgb, m, name, chem}`, measured off that scan) and wires its own words and readout; the script owns the gestures — tap puts the magnifier there wherever the tap lands (on the magnifier or off it), a drag that starts on the magnifier slides it (the circle alone is `touch-action: none`, so a finger elsewhere still scrolls the page), pinch or ctrl-wheel zooms to 6×, one finger pans once zoomed. Two anchors of one material are never offered as a choice; two of different materials within ΔE 4.5 are named together. Loaded with a version query by `experiments/vermeer-girl-with-a-pearl-earring.html`. **`timeline.js` (21 Sep 2026)** — a timeline over a map, *‹Name›'s World*, per `CWVault/claude/Spec-Timeline-and-Map.md`: `cwTimeline(svg, o)` for the two-sided line alone and `cwWorld(host, data)` for the whole pair — the line, the map (through `map.js`, not a second map engine), far-away cards and the panel. The person's events above the line in ink, the world's below in slate, the focus in copper, the selection in vermilion on both; labels pack into the nearest free row; nearest-mark picking at 20 px for a mouse and 32 for a finger, a label scoring ten worse than a dot; tapping a place lists all its events, oldest first; tapping what is selected or empty ground clears; a route draws only while its own event alone is selected; a far place is a card on the side where it lies (under the map on a phone, where over it the card hid the places that matter), and tapping it opens the world map in `cwMapWindow`. 22 Sep 2026: a `spread` place is one card standing for several towns (Europe in *Hokusai's World*) — its window shows the towns rather than a dot of its own, and tapping the card lists all its events; year labels thin to every twenty when ten would crowd; two dots that would sit on top of each other part, the person's above the line and the world's below. Widths come from `getBoundingClientRect`, per the spec's warning. The spec named `experiments/maps/timeline.js`; it is in `js/` beside `map.js` so a story can be hung without its path breaking. First used by `experiments/vermeer-girl-with-a-pearl-earring.html`; the Frankenstein bench and the Hokusai conversion are still to come. **27 Sep 2026, After the Ice** (`?v=2026-09-27-ati` on `experiments/after-the-ice.html` only; the story pages keep their query and draw byte-identical timelines, checked): all opt-in, so a story that says none of it is unchanged — `line: { rows, ladder, yearText, stretch }` caps the label rows a side (a label with no room is dropped and its dot stays tappable; heavier `weight` first, then the `kind` scarcest among labels already placed, the selection always labelled), puts ticks and year labels on the plane's 1–5–10 ladder so they relabel as the span changes, and draws an uncertain date (`precision` decade, century, millennium) as a soft stretch under its dot; `windowed: true` keeps only events inside `from..to` on the line and the map, a place standing on the map while one of its events is on the line and weighing what its heaviest there weighs; `onPick(id)` hears every selection; `cwWorld` returns `span(from, to)` and `only(ids | null)`, the second a filter held until cleared, and an event that leaves the line is let go. `cw-flags.js` (15 Sep 2026) — feature flags, `CW.flags = { maya: false }`, loaded first on every `active/` page with a version query; the Maya flag is all it holds, because nothing else about Maya exists yet, and Remember on story pages reads it (visible always with Maya; fades in as the text's reference nears without her). **`cw-number.js` — how a number is written, everywhere** (extracted
2 Sep 2026 on Michael's instruction that the benches and labs all write numbers
the same way; the third shared file, and the first added since Phase 4). Until
it existed there were four dialects: plane.js grouped thousands for tick labels,
the Multiply bench had its own decimal trimmer derived from that, the Ruling
bench had its own stacked fractions, and Glass Multiplication wrote `String(n)`
on a pane with no grouping at all. It gathers the rules already settled
elsewhere and cites them — stacked fractions never slashes (walk step 3), never
more precision than the act showed (Controls-Aug12 §6), trimmed and grouped
(plane.js's own labels), and **the math axis**: every term on a line sits on the
line where a fraction bar and the middles of × = − live, which is not the
baseline. It serves both the DOM (`CW.num.html`, and a stylesheet it injects
itself so markup cannot be adopted without the alignment) and canvas
(`CW.num.draw` / `drawText` / `measure`, where the y passed is always the axis).
**Load it before `plane.js`**, which uses it. Adopting it re-rendered nothing
except one fix, verified across 480 000 label values: sub-unit lattice steps
used to skip thousands grouping, so at a step of 0.5 the label at 1000 read
`1000` while at a step of 1 it read `1 000`; both group now.
`plane.js` — the coordinate space both labs stand on (view state,
transforms, one zoom clamp, the ambient lattice, the pixel floor); extracted
in Phase 4 so the labs cannot drift apart. Its tick labels were the seed of
`cw-number.js` and now come back from it. `cw-panel.js` — the canvas panels
as components: the info window (draggable, closable, fading — Geometry's
tip-window pattern; used by Multiplication's number description) and, since
the controls build (13 Aug), the **choice panel** — an occasional act's
outcomes as words with recipe lines, taking one choice and fading; used by
both labs for Save, and by Geometry for the WIP guard and replay Cancel. Since 29 Sep 2026 it also holds
`CW.setWordPresent` — a column word present only when it can act, fading in and out and giving
its space back — lifted verbatim from Geometry so Wordplay's commands behave as Geometry's do;
Geometry's own `setWordPresent` now calls it. Both labs load it at `?v=2026-09-29`; Wordplay too, for
the info window (its Compose and Save and Share panels) and the fading words.

**`art/` `models/` `stories/` `text/`** — assets, at the root of this folder.
Pages in `active/` and `experiments/` reach them with `../` —
`../art/palette/palettes.json`, `../models/logs/geo_hexagon_triangle.json`.
A page that moves between folders must have those paths checked.

**The shape of `art/` (26 Sep 2026).** It was one flat folder of about seventy files until
the Frankenstein pictures arrived; `tools/reorganise-art.py` moved it into folders by kind
and by story and rewrote every reference (the script prints its plan without `--apply`).

```
art/
  icons/            every *-icon-256.png and *-icon-256.svg (the browser-tab icons)
  gallery/          every *-gallery.jpg and *-gallery.png (the pictures hung on the wall)
  maps/             the base pictures for maps, as before
  palette/          the sixteen paintings from March that palettes.json was made from, and palettes.json
  stories/<slug>/   everything else, by the story page that names it
  shared/           a picture named by more than one story (none yet)
```

Story folders: `vermeer`, `hokusai`, `van-gogh`, `necker`, `three-at-a-glance`, `frankenstein`
(its pictures arrived before its page). Which story a picture belongs to is decided by
which page names it, not by its name: `brain-cutaway.jpg` and `brain-outside.jpg` are in
`stories/necker/` because Professor Necker's Drawing is the page that shows them. The
palette paintings took plain names as they moved (`Vermeer Girl with Perl Earring.jpeg` is
`palette/vermeer-girl-with-a-pearl-earring.jpg`); Glass Geometry's palette picker builds
their path from `palettes.json`'s `source` as `../art/palette/<source>`. One file is still
loose at the top: `crystal-fluorite.jpg`, which the Necker story names in its frontmatter
but its page does not show. `art/_incoming/` is an empty drop folder.
`stories/gallery.json` — **what hangs in the gallery** (20 Sep 2026; `CWVault/20-SPECS/Spec-Gallery.md`):
a plain array, one entry per work, `{slug, title, href, picture, frame, frameWidth, size}`
(`icon` was the field's name until 21 Sep and the page still reads it), hrefs and pictures
relative to the site root. **A picture hangs whole, at its own proportions** (21 Sep): the two
paintings point at their `-gallery.jpg` files, large; the three drawn marks are square and hang
as they are. `index.html` and `saved.html` read it; nothing else does.
Adding a story to the gallery is adding its line here (Publishing-a-Story, stage 4), no other
edit. Three works today: The Man Who Learned Without Knowing (the star SVG, copper, medium),
Three at a Glance (the three dots SVG, near-black, small), About Your Brain (the watercolour
PNG, warm grey, medium), and since later the same day Glass Geometry, **titled *Stained Glass* on the wall since 22 Sep**
(deep blue frame 14 px, large — the labs hang large; `art/gallery/glass-geometry-gallery.jpg`, since
22 Sep one of its own constructions, whole), then Hokusai: The Great Wave (20 Sep; since 21 Sep the whole print
`art/gallery/hokusai-the-great-wave-gallery.jpg`, large, in the print's deepest blue `#2e4a63`). Frame colours are the salon mock's; no story
frontmatter declared one. **Left out for want of an icon:** Glass Multiplication (no icon yet;
the check has warned since 15 Sep) and The Necker Cube. The lab is reachable from `labs.html`;
the Necker Cube from the experiments index.
`stories/after-the-ice-events.json` — After the Ice's own events and places (27 Sep 2026),
written from the September `stories/events.json`, which it replaced (removed the same day; its
only reader, `experiments/timeline-bench.html`, was repointed). The same 65 world events and
25 lead-up events (each tagged `leadup` with the destination it came from), `year` now the
astronomer's year — the September after-the-ice year minus 10 000, exactly, so every BC year is
one earlier than the true astronomer's year (the file's `_about` says so; Michael to rule) —
plus `precision` (exact, year, decade, century, millennium), `kind` (closed: sky, earth, crop,
craft, object, place, person, text), a provisional `weight`, `place` as an id, `same` on the 11
records that are one happening with another (8 with the shared list: Tambora, Frankenstein,
Faraday, Galvani, Volta, Aldini, photography, the Eiffel Tower; 3 within the file), and
`guessed` naming the fields that are judgements. Its own 60 places in a `places` block, not in
`places.json`. **28 Sep (Michael): the true astronomer's year** — 500 BC is −499 — so the 47 BC
records moved one year later (Socrates −469, Thales −584); the ice stays at −10 000, After the
Ice's year 0 by definition. A holding place: the survivors join the shared list by copying, and it goes.
Blurbs are still unsourced first drafts; images unfilled.
`art/icons/after-the-ice-icon-a-256.png` and `-b-256.png` (28 Sep 2026) — two candidates for After the
Ice, SVG beside each PNG, drawn in the house line on parchment: (a) the line in Payne's grey with a
copper dot on it, (b) the line with the pale blue window on it. (a) is the page's tab icon and, since 28 Sep, its gallery picture (Michael: pick one, hang it). PNGs drawn with PIL at four times the size and reduced, since no SVG renderer is installed.
`art/icons/brain-icon-256.png` — the watercolour brain at 256 px (13 Sep 2026), the main
index's icon for About Your Brain; the first icon-as-link on the site. The page's own tab
icon reads the same file (Safari on iPad ignores data-URI favicons, tested 13 Sep, so
the page points here rather than carrying the icon inline).
`art/icons/star-icon-256.svg` — the star with a copper dot (14 Sep 2026), the main index's
icon for The Man Who Learned Without Knowing; the second icon-as-link.
`art/icons/star-icon-256.png` — the same star rasterized (15 Sep), the story's tab and
home-screen icon, because Safari wants a PNG there.
`art/icons/three-dots-icon-256.png` — three ink dots in a loose scatter on cream, one copper
(16 Sep 2026), from *Three at a Glance*'s frontmatter; the story's tab and home-screen icon.
`art/icons/three-dots-icon-256.svg` is the same mark as vector, the main index's tile for the story
since it was hung on 16 Sep (the star's pattern).
`art/icons/geometry-icon-256.png` — **Glass Geometry's tab icon** (20 Sep 2026; recut 22 Sep): the
central 1158 px square of the same construction that hangs as `glass-geometry-gallery.jpg`,
resized to 256, so the tab and the wall show one work. The 20 Sep cut was from the
Abstraction 1 postcard.
`art/stories/van-gogh/van-gogh-starry-night.jpg` — Vincent van Gogh, *The Starry Night*, 1889 (23 Sep 2026).
MoMA, New York, 472.1941; the Google Art Project scan as published on Wikimedia Commons, public
domain; 1800 × 1425. The painting on `active/van-gogh-starry-night.html`; the sampler reads its
pixels, so it must be served same-origin.
`art/gallery/van-gogh-starry-night-gallery.jpg` — the same painting whole for the gallery, 600 × 475.
`art/icons/van-gogh-icon-256.png` — the story's tab icon, a square detail of the painting.
`art/stories/van-gogh/hiroshige-sudden-shower.jpg` — Utagawa Hiroshige, *Sudden Shower over Shin-Ōhashi Bridge
and Atake*, 1857, public domain; recut 23 Sep at 1000 × 1515 (was 900 × 1364). First picture of
the Van Gogh story's stack of the prints he copied (`js/stack.js`), with these three:
`art/stories/van-gogh/van-gogh-bridge-in-the-rain.jpg` — Van Gogh, *Bridge in the Rain (after Hiroshige)*, 1887,
1000 × 1376; `art/stories/van-gogh/hiroshige-plum-park.jpg` — Hiroshige, *Plum Park in Kameido*, 1857, 1000 × 1470;
`art/stories/van-gogh/van-gogh-flowering-plum.jpg` — Van Gogh, *Flowering Plum Orchard (after Hiroshige)*, 1887,
1000 × 1192. All four public domain; the page's References credit the Van Gogh Museum's and the
Rijksmuseum's photographs. Added 23 Sep with the stack; a step whose file will not load is
dropped, so the site would have shown a shorter stack, not a broken page, had they been left out.
**Professor Necker's Drawing (25 Sep 2026)** — `art/icons/necker-cube-icon-256.png`, the tab icon, and
`art/gallery/necker-cube-gallery.png`, 600 × 600, the gallery picture: the Necker cube drawn as a mark,
twelve ink lines on parchment (the copper dot on one corner taken off 26 Sep, Michael: simply the cube). `art/stories/necker/necker-letter-1832-pp336-337.png`
— Michael's scan of the letter, pp. 336–337 of the *Philosophical Magazine*, November 1832,
opened in a window. `art/stories/necker/crystal-calcite.jpg` and `art/crystal-fluorite.jpg` — Michael's
photographs (fluorite is not on the page). From Wikimedia Commons, 1200 px on the long side,
JPEG 85: `art/stories/necker/crystal-salt.jpg` (Hans-Joachim Engelhardt, CC BY-SA 4.0),
`art/stories/necker/crystal-alum.jpg` (Maxim Bilovitskiy, CC BY-SA 3.0 EE), `art/stories/necker/crystal-diamond.jpg`
(James St. John, CC BY 2.0; 1168 px, its original size), `art/stories/necker/crystal-sugar.jpg`
(Nachovfranco, CC BY-SA 4.0). `art/stories/necker/duck-rabbit-1899.png` — Jastrow's duck and rabbit from
*Popular Science Monthly*, 1899, public domain, recoloured to ink on transparent.
`art/stories/necker/rubin-vase.svg` — a vase-or-faces after Ian Remsen's CC0 drawing, filled in the story ink.
`art/stories/necker/brain-cutaway.jpg` — About Your Brain's cutaway painting, saved as a file (1254 px) so a
story can show it without carrying the base64; `art/stories/necker/brain-outside.jpg` (26 Sep), its outside
painting the same way (886 px), for the whole brain a story shows first. Maps: `art/maps/switzerland.*`
(5.6°E–10.8°E, 45.6°N–48°N) and `art/maps/britain-and-geneva.*` (19°W–20°E, 45.2°N–58.4°N since 26 Sep, wide and shallow; it was
8°W–12°E, 44°N–59°N, portrait, and about twice too tall on an iPad),
rendered with `experiments/maps/render.py`. Full sources in the story's `images:` frontmatter.
`art/maps/france-and-the-low-countries.*`, `art/maps/france-to-the-north-sea.*` — two regions
rendered 23 Sep 2026 for the Van Gogh story, the usual three files each (picture, JSON with
contours, height grid), from `experiments/maps/render.py`.
`art/maps/london-to-bologna.*` — 14°W–27°E, 43.7°N–52.4°N, 2000 × 635 (26 Sep 2026, *Mary's World*):
cropped wide and shallow on purpose, about 3.15 to 1, so that on an iPad the timeline, the panel
under it and most of the map fit on one screen (67% of the map on a 1024 × 768 iPad in landscape,
79% at 1180 × 820, all of it in portrait). The picture, the vegetation layer, the JSON with
contours and the height grid; no ice at this scale.
**Wordplay (27–28 Sep 2026)** — `art/stories/limericks/`: eighteen of Edward Lear's own drawings, public
domain, each the drawing only (verse left off), greyscale, levels set so the paper is white, at most 1200 px
wide; the page and the postcard multiply them onto the parchment. `lear-old-man-with-a-beard.png` is the
Opening's; the other seventeen are named in `stories/limericks.json` under `picture`. Ten are from the NYPL
copy of a Warne printing of *A Book of Nonsense* (Internet Archive `bookofnonsense00lear`), eight from the
first edition of *More Nonsense*, 1872 (University of California copy, `morenonsensepict00learrich`).
Originals and sources, page by page, in `_CW/art-originals/limericks/` (`SOURCES.md`), outside git.
`art/gallery/wordplay-gallery.svg` — the gallery picture, a drawn mark, 400 × 400: five lines of Lear's
beard limerick (the Opening's, not one of the puzzles) in Georgia on parchment in the limerick's shape (long,
long, short and indented, short and indented, long), the last half typed with the cursor; chosen over plain
strokes, which read as Morse at wall size. `art/icons/wordplay-icon-256.png` — the same mark at 256 px,
drawn with PIL from the system Georgia. (Made 27 Sep as `limericks-*`; renamed with the page, never committed.)
`stories/limericks.json` — **Wordplay's pool** (28 Sep 2026): forty limericks, one record each (`id`, `lines`,
`credit`, `ease`, and where given `intro`, `swap` as two line numbers counting from 1, `picture`
from the site root). The only home of the texts: a limerick is added by adding a record, and the page
needs no change. `CWVault/claude/Limericks-Puzzle.md` keeps the decisions, sources and checks, not the words.
`art/gallery/hokusai-the-great-wave-gallery.jpg` — **the Great Wave, whole, for the gallery** (21 Sep
2026; Spec-Gallery's *A work on the wall* as changed that day: a painting or print hangs whole,
never cropped): the Met's scan `art/stories/hokusai/hokusai-great-wave.jpg` resized to 600 × 414, quality 88,
76 KB. The gallery's picture for the story; the tab icon stays the square crest crop.
`art/gallery/deep-time-gallery.png` — **Deep Time's picture on the wall (7 Oct 2026):** the earth from
space at 150 million years, Pangaea splitting, rendered from `stories/plates/continents.json` by the
file's own arithmetic (a scratch script in the session, the plate pipeline's rotation code) at 1400 px,
the globe's own colours and graticule. Not a photograph of anything; the page says what it is.
`art/gallery/glass-geometry-gallery.jpg` — **Glass Geometry's picture on the wall, hung as *Stained
Glass*** (22 Sep 2026): a construction Michael made in the lab — five circles, the vesica
in rust, the petals in blue, green and olive on the paper — whole, 600 × 515, quality 88,
19 KB, from the 1350 × 1158 render he handed over that day (not in `art/`). It replaced the
Abstraction 1 postcard of 21 Sep, which had hung with its own mount and printed title.
`art/icons/enso-icon-256.png` — **Practice's picture, for now** (20 Sep 2026): a square from
Michael's photograph of a brushed ensō on a sunlit wall, the circle centred and the stone
left out, resized to 256. Temporary on his word; the copper ensō drawn in the salon mock is
the mark the spec describes and is what this stands in for.
`art/stories/three-at-a-glance/jevons-1877.jpg` — the engraved portrait of William Stanley Jevons from *Popular Science
Monthly* volume 11, 1877 (Wikimedia Commons, `PSM V11 D660 William Stanley Jevons.jpg`, public
domain, author unknown), greyscale, resized to 760 px wide, 184 KB. Read by
`active/three-at-a-glance.html` beside the paragraph that introduces him; nothing else uses it.
`art/stories/hokusai/hokusai-great-wave.jpg` — Katsushika Hokusai, *Under the Wave off Kanagawa*, about
1830 (19 Sep 2026). The Metropolitan Museum of Art, accession JP1847, image DP141063, open
access / CC0; the museum's 3 863 px scan resized to 1 800 px wide at quality 85, 452 KB. A
strong impression with its paper margins, so the unprinted paper is part of what can be
sampled. Read by `active/hokusai-the-great-wave.html` and by nothing else; the colour
sampler reads its pixels off a canvas, which is why it must be served same-origin.
`art/icons/hokusai-icon-256.png` — the story's tab and home-screen icon (19 Sep 2026): the crest
and its claws, cut from the print at 330,150–930,750 and resized to 256 px, per the Rulings'
"a story's icon is a detail of the story itself".
`art/maps/japan.webp` — Japan, 123°E–147°E, 29°N–46°N, standard parallel 37.5, 2000 × 1786, 150 KB
(20 Sep 2026, for the Hokusai story), with `japan.json` and the unused `japan-height.png` beside
it as the other regions have. Cropped west as far as the Chinese coast for two reasons: so
Nagasaki's name is not against the picture's edge at 300 px, and so the mainland the Chinese
ships came from is on the map.
`art/stories/vermeer/vermeer-girl-pearl-earring.jpg` — Johannes Vermeer, *Girl with a Pearl Earring*, about 1665
(21 Sep 2026). Mauritshuis, The Hague, inventory 670: the museum's own scan as published on
Wikimedia Commons (public domain), taken from Commons' 1920 px rendition — Commons now serves
only its standard thumbnail widths, and 2400 px returned an error page — and resized to
1400 × 1658 at quality 86, 640 KB. The post-2018 cleaned state. Read by
`active/vermeer-girl-with-a-pearl-earring.html`; the sampler reads its pixels, so the page
must be served same-origin. The Mauritshuis's own download terms ask for non-commercial use and
the credit *Mauritshuis, The Hague*; the caption carries it.
`art/icons/vermeer-icon-256.png` — the story's icon (21 Sep 2026): eyes, lips, the blue and the pearl,
cut at 440,500–1000,1060. A crop of the pearl alone was tried first and read as a white blob
at 256 px.
`art/maps/netherlands.*` — 2.5°E–7.5°E, 50.7°N–53.7°N (21 Sep 2026, the Vermeer story's margin map).
`art/maps/lapis-road.*` — 2°W–76°E, 24°N–56°N, exaggeration 2 (21 Sep 2026): the Channel to the
Hindu Kush, so Delft, Venice and the Afghan lapis mines fit one picture. Full width in the story;
it was tried in the margin first and was a sliver.
`art/maps/north-sea.*` — 4°W–10°E, 50°N–55°N (21 Sep 2026): the first map under *Johannes Vermeer's World*;
replaced the same day by `north-sea-and-paris` and no longer used by any page.
`art/maps/japan-and-china.*` — 110°E–146°E, 20°N–42°N (22 Sep 2026): the map under *Hokusai's World* —
Edo, Nagoya, Kyoto, Nagasaki and Zhapu; the far places are cards.
`art/stories/hokusai/egyptian-blue.jpg` — a heap of Egyptian blue powder, Wikimedia Commons ("Egyptian blue.jpg"),
public domain, 456 px. Margin picture in *Hokusai: The Great Wave*, beside the Egyptian paragraph.
`art/maps/north-sea-and-paris.*` — 3°W–12°E, 48.3°N–54.6°N (21 Sep 2026): the map under
*Johannes Vermeer's World* — London, Woolsthorpe, Delft, Amsterdam, Utrecht and Paris.
`art/stories/vermeer/rembrandt-night-watch.jpg` — Rembrandt, *The Night Watch*, 1642, Rijksmuseum SK-C-5; public
domain, via Wikimedia Commons, 1200 px wide. Margin picture in the Vermeer story's *More*.
`art/stories/vermeer/leeuwenhoek-flea.jpg` — Leeuwenhoek's flea, figure 7 of the plate Wellcome Collection
M0016633 (CC BY 4.0, credit in the page's References), cropped, 900 px. Margin picture in the
Vermeer story's *More*; replaced the bacteria figures of 21 Sep, which read as too bare.
`art/stories/vermeer/vermeer-view-of-delft.jpg` — Vermeer, *View of Delft*, Mauritshuis inv. 92, public domain,
1920 px. Opens full width in the Vermeer story when the Delft map is tapped.
`art/stories/vermeer/delft-plan-blaeu-1649.jpg` — Blaeu's plan of Delft from the *Toonneel der steden*, 1649,
Atlas Van Loon copy via Commons, public domain, 2400 px (for the magnifier). With the above.
`art/icons/map-icon-256.png` — the map bench's tab icon (18 Sep 2026): a square of the world
picture, 30°W to 30°E and 25°N to 85°N, cut from `art/maps/world.webp` and quantised to 96
colours, 30 KB. Nothing drawn; the earth is the icon.
`art/maps/` — **the base pictures for maps** (18 Sep 2026; `CWVault/claude/Spec-Maps.md`):
one earth, many crops, rendered once by `experiments/maps/render.py` from ETOPO 2022 (NOAA
NCEI, ice surface, public domain) and never touched at runtime. Per region three files:
`<region>.webp` (2000 px wide, quality 85, colour is height and nothing else — the map's
own ground ramps (Spec-Maps, *The ground colours*; the colour ruling of 18 Sep), a faint
north-west shade on the land, nothing drawn on it); **the layers** (26 Sep 2026, Spec-Maps
*The ground has layers*): `<region>-ice.webp`, half the picture's width, RGBA lossless, the
ice ramp by surface height with the base's relief, opaque where ice thickness (ETOPO
surface minus bedrock) is above zero and transparent elsewhere, written only where there
is ice (today: `world`, 19 KB); `<region>-vegetation.webp`, half width, RGB lossy, one quiet
green `#66905a` mixed toward white by tree cover so that multiplied over the base white is
nothing and full cover is the green at 55 % — from the Copernicus Global Land Cover 100 m
tree-cover fraction for 2019 (Zenodo 3939050, public, 5.65 GB in `_data/`, read in a window
through rasterio), 21 KB for the world and 32 to 158 KB for a region (Switzerland is the
heaviest: woods and fields at 1 km are fine texture). The JSON's `layers` list names each
with its file, blend (`normal` for ice, `multiply` for vegetation) and whether it is on by
default (both are); `map.js` stacks them and a story can leave either off. `<region>.json`
(name, the four corners, the standard parallel, pixel width and height, the vertical
exaggeration, the picture's filename, and **the contours** — what `map.js` reads); and `<region>-height.png` (the same crop 512 px wide,
height in metres plus 11 000 as a 16-bit value, high byte red, low byte green; **nothing
reads it** — it is the sea-level slider's food, written and left). Regions so far: `world`
(180°W–180°E, 90°S–90°N, standard parallel 0, 2000 × 1000, 153 KB, from the 60 arc-second
grids, exaggeration 3), `western-europe` (11°W–20°E, 42°N–58°N — the prompt's 40°–60° trimmed by two
degrees each side so the picture runs landscape in a column instead of square; standard
parallel 50°, 2000 × 1606, 193 KB, from the 30 arc-second grids, exaggeration 1) and `japan`
(above; 176 KB, exaggeration 1). A new region is one line:
`python3 experiments/maps/render.py <name> <west> <south> <east> <north> [--exaggeration 1] [--levels 0,-200]`,
about fifteen seconds. **`world-pyramid.json` and `world-tiles/`** (27 Sep 2026, Spec-Maps *The
world that moves*): the whole earth as 512-pixel tiles at six scales, `world-tiles/<z>/<x>/<y>.webp`,
level 0 two tiles and level 5 sixty-four by thirty-two, about 1.2 km a pixel at the equator —
equirectangular, height alone, the exaggeration stepping down from 3 at level 0 to 1 at level 5
(3, 2.5, 2, 1.6, 1.3, 1). Beside each tile that has any, `<y>-ice.webp` and `<y>-vegetation.webp` at
256 px; the JSON lists which tiles have each layer. 2 730 base tiles, 19.9 MB; 472 ice tiles,
4.7 MB; 1 146 vegetation tiles, 5.3 MB; 29.7 MB in all, 4 348 files. Per level the base is 0.1,
0.2, 0.5, 1.4, 4.5 and 13.2 MB. The coast and the shelf edge as vectors, `world-tiles/contours-<z>.json`,
exist for levels 0, 1 and 2 as one file each (76, 188 and 532 KB) and for levels 3, 4 and 5
**per tile column** (since the stories' conversion, 27 Sep): `contours-<z>-<x>.json`, each
holding every line that touches its column — 16, 32 and 64 files, 2.7, 7.3 and 18.4 MB in
all, the biggest 305, 524 and 667 KB — and the map fetches only the columns in view, so a
level-5 coast is the tiles' own coast. `render.py --contours` makes them (16 minutes). The
JSON names a level's contours either as a file or as `{ perColumn, cols }`. The folder is
65 MB on disk with the coastlines. **The shallow-sea layer** (29 Sep 2026, Spec-Maps *Time
on the map*): `<z>/<x>/<y>-shelf.png` beside every tile at levels 0 to 5 that has continental
shelf in it, 256 px greyscale — 0 for land and for water not joined to the world ocean, the
depth in metres (1 to 130) for ocean up to 130 m deep, 255 for deeper — 1 306 tiles, 5.0 MB,
listed in the pyramid JSON's `shelf`. Made by `render.py --shelf` (9 minutes); the ocean is
the largest connected body below sea level on the 60 arc-second grid, so the Caspian and the
Dead Sea never drain, and the Black Sea, whose strait is narrower than a cell, counts as a
lake — as it roughly was at the ice-age low. Rendered by `render.py --pyramid`
in 41 minutes, one tile row at a time so no level sits whole in memory, the tree cover read
once at the finest level and averaged down. Made for the map that moves; no still map uses it.
**Contours, as vectors** (third pass, 20 Sep): the coast (0 m) and the
shelf edge (−200 m) are traced from the sampled height grid with contourpy (marching squares,
the engine matplotlib uses), simplified with Douglas–Peucker to half a pixel, rings shorter
than six pixels dropped, converted to longitude and latitude rounded to a tenth of a pixel's
worth of degrees, and written into the region's JSON as `"contours": {"0": [...], "-200": [...]}`,
one line per polyline. They made the JSONs the largest files of the set: `world` 189 KB
(252 coast lines, 6 975 points from 36 795; 232 shelf lines, 5 749 points), `western-europe`
231 KB (473 coast lines, 11 856 points from 53 240; 24 shelf lines, 1 363 points), `japan`
210 KB (333 coast lines, 8 087 points; 118 shelf lines, 3 418 points). Netlify serves JSON
compressed, so the wire cost is roughly a third of that; if the size matters later, a
coarser rounding or a higher ring floor are the two knobs. Other heights are `--levels`;
nothing renders them yet. The sea is `#22415f` at −9 000, `#33699a` at −4 000, `#5793b4` at
−800, `#7fb0cc` at −150, `#93bed7` at the shore (the spec's *the sea stops short of paper*:
the second pass ran almost to white at the shoreline and met the paper-coloured beach; Japan
showed it). Shading is 0.35 over land and ice and half that over water, the heights
multiplied by the region's exaggeration before the slope is taken. **Ice is its own layer** (second pass, 18 Sep, painted into the base; a file beside it
since 26 Sep): each resolution needs two source grids, ice surface and bedrock; the script
checks they share one registration and refuses otherwise. `python3 render.py --all`
re-renders every region from its own JSON. The five source grids (10 GB with the tree
cover) live in `cw-deploys/_data/`, which `.gitignore` excludes; they are downloaded once
and must never be committed. ETOPO's bedrock differs from its surface only under the two
ice sheets, so Alpine glaciers do not appear as ice; and the tree-cover grid stops at 80°N
and 60°S, which costs nothing because nothing grows past either.
`stories/necker-cube/` — **The Necker Cube**, the first story (28 Apr 2026, commit
`bec6b4f`), a single-file page at `index.html`: the cube on a canvas that flips as you
look, narrative paragraphs from `narrative.json` beside it, Web Audio, the watercolour
brain `brain-watercolor.jpeg` (also read by `experiments/necker-brain-map.html`). Public
since April but linked from nowhere until 15 Sep, when the page standard's check found
it as the one page without a stamp; stamped that day and listed at the foot of
`experiments/index.html` as the record of the first story. Folder also holds the
plan and narrative drafts it was built from, and a stray `.DS_Store`.
`models/constructions.json` — the construction library's manifest (controls
build, 13 Aug): Geometry's picker reads it at load, so library growth is a
log file plus a line here, no code. An entry may carry `speed` (seconds) to
open at a chosen playback duration.

## Page standard (standing method, 15 Sep 2026; the version stamp since 13 Aug)

Every `.html` file under this folder opens with the same five lines, whatever else it
is, because a page that arrives without them ships broken in ways nobody notices until
an iPad shows it — the story page of 14 Sep arrived with none of them:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" type="image/png" href="../art/icons/<its-icon>.png">
```

- **Doctype and charset**, or the em-dashes depend on the server's header and a local
  server shows mojibake.
- **Viewport**, or Safari lays the page out 980 px wide and shrinks it — and the page's
  own `@media` rules can never fire on an iPad.
- **A tab icon that is a file in `art/icons/`, never a `data:` URI** — Safari ignores inline
  icons (proved 13 Sep), and wants a PNG. The same file serves `apple-touch-icon`. The
  home page tile may use an SVG; the tab may not.
- **Centred, at every width.** A page's content centres in the window — the reading
  column at 700 px, and anything wider than it (a map, a bench) centred under it, the
  notes centred below. Nothing hangs from the left edge of a wide window. Not a line
  the check can read; it is a thing to look at once in a window wider than the content
  (About Your Brain shipped for six days with its map pulled left by an unclosed div,
  found by Michael on 19 Sep).
- **A `CW_VERSION` constant** (date + short commit hash) logged to the console on load,
  as the first line of the page's main script — updated in the same commit as the
  change, like this file. Shared scripts are referenced with a version query
  (`plane.js?v=...`), bumped when the script changes. `_headers` makes HTML revalidate
  on every load. It does not help to test yesterday's work.

**The check:** `tools/check-deploys.sh` reads every page here (or the ones named on its
command line) for the five lines, errors on a data-URI icon, warns on an `active/` page
with no icon, and lists untracked files under `cw-deploys/` — public if ever added.
`.githooks/pre-commit` runs it over the staged pages; enabled once per clone with
`git config core.hooksPath .githooks`. A page that fails does not commit. A chat session
that builds a page cannot run the hook, so the five lines are its brief; the hook is the
backstop for the Claude Code session that lands the file.

## Pages

### the root
- **`index.html`** — **the gallery**, the child's home page (20 Sep 2026; since 26 Sep with a
  subtitle under the title, *for tomorrow's best minds*, centred, lowercase, italic, on Michael's word; `Spec-Gallery.md`,
  the Rulings' *The gallery*; built from `experiments/gallery/home-mock-salon.html`, not
  redesigned). Reads `stories/gallery.json`, shuffles it (Fisher–Yates, a new hang every
  visit), and hangs every work in the pool (the spec's *about nine* was the cap until 29 Sep 2026,
  lifted on Michael's word for testing and demos; `WALL_SIZE` in the script, set back to 9 to restore it): each a link holding a coloured frame (`frame`,
  `frameWidth`; 10 px default), an 8 px mat (off-white, or the wall colour when the picture is
  an SVG, i.e. a drawn mark), the picture **whole, at its own proportions** (21 Sep: no
  height, ratio or crop is set on it; a print hangs wide, a portrait tall, and the frame
  follows), and the title centred below, 15 px Georgia, one
  type for all. `size` sets the width in its column: large 100 %, medium 80 %, small 56 %.
  The wall is four columns wide, two below 900 px; **the script deals the works into the
  columns in hang order** rather than letting CSS multi-column balance them, because with
  three works balancing left a column empty and the wall left-heavy, against the page
  standard's *centred at every width*; the columns are re-dealt only when their count
  changes on resize. Below a hairline: **Practice** centred, an ensō in a copper
  frame at 140 px with no visible title (the mark is the name; "Practice" is there for a
  screen reader) — since later on 20 Sep the photograph `art/icons/enso-icon-256.png`, temporarily,
  in place of the mock's drawn copper mark, linking to `experiments/trace.html` until the practice queue exists; at
  the right three plaques of one size, Saved Stories (`saved.html`), Labs (`labs.html`),
  Experiments (`experiments/index.html`), no pictures. **What comes and goes:** a slug in
  `localStorage` `cw.gallery.finished` comes down unless it is also in `cw.gallery.kept`;
  the gallery reads both and writes neither. Today no page writes either key, so nothing
  comes down; the story page's end-of-text record and the *keep this* control are later
  steps. Tab icon: the star PNG, because the site has no mark of its own yet.
- **`saved.html`** — **Saved Stories**: the works whose slugs are in `cw.gallery.kept`, as a
  plain centred list of titles from `gallery.json`; "Nothing here yet." when there are none
  (no promise of how to keep one, since the control does not exist). Back link to the gallery.
- **`practice.html`** — **Practice**: what she has asked to remember, as a plain list in the
  shape of Saved Stories (25 Sep 2026), read through `js/remember.js`. Each line leads back to
  the story it came from, with "take it off the list" under it. The practice itself (the tapping)
  comes later. The gallery's ensō opens it (25 Sep, Michael; it went to Trace before), and so does
  the note under a story's Remember word. Tab icon `art/icons/enso-icon-256.png`.
- **`labs.html`** — **Labs**: Stained Glass (the word for Glass Geometry since 22 Sep, on
  Michael's word; the file, its URL and its page title are unchanged) and Glass Multiplication as words with their
  one-line labels from the old home page; no pictures. About Your Brain is an official app
  beside the labs but hangs on the wall as a work, so it is not listed here (open for
  Michael). Back link to the gallery.

### active/
- **`deep-time.html` (hung 7 Oct 2026)** — **Deep Time**, the Time Machine's deep page: see the entry
  under `experiments/` for `join-bench.html → active/deep-time.html`, where it was built and is described.
  `CW_VERSION 2026-10-07 0042379`.
- **`wordplay.html`** — **puzzle: Wordplay** (28 Sep 2026; Claude Code, from
  `CWVault/claude/Prompt-Build-Limerick-Puzzle.md`). Read at its experiments address and **hung 28 Sep 2026**
  on Michael's word (stage 4): moved to `active/`, the old address redirected in `_redirects`, in
  `gallery.json` as **Wordplay**. A gallery puzzle, not a story page: no `template-story.html`, no
  `check-story.sh`. Built from the composing mockup Michael used and said yes to
  (`CWVault/claude/mockups/limerick-compose-mockup.html`). Reads `../stories/limericks.json`, the one
  home of the limericks' texts (add a record to add one); the spec keeps decisions, sources and checks, not the words.
  **The Opening**, a page of its own the first time on a device: the Lear text as the spec gives it,
  his beard drawing, the beard limerick, the line about *Ideas*, and *Next*, which brings Niger.
  **Each limerick:** its `intro` at the top in the faded type, a line kept for the title, the poem,
  the credit; the five lines under IDEAS at the bottom right, smaller and italic, dealt so that no
  line starts at its own place and neither line of a swap pair at either of the pair's places (44
  of the 120 orders; 24 with a swap pair), with "(tap the line you think comes next)" beside the
  label for her first three. She taps the next line; it fades and is typed in with the cursor and
  synthesized keys, one line at a time, lines 3 and 4 indented. A wrong tap does nothing
  (`wrongTap()` is the empty place for a possible shake); a `swap` pair goes in either order, and a
  reversed pair gets the mockup's note. Whole: the bell after the last line is typed, the credit,
  the title (the poem's, or *Give it a title*, a plain field saved as she types, whose words vanish
  when she taps it and come back if she leaves it empty). *Next* at the bottom right.
  **The column (29 Sep 2026, *The column and her poems*):** a pale strip down the left edge
  (`#f7f4ec`, hairline `#d6c9ad`), a band across the top on a phone: **The Curious Woods** (bold, to
  the gallery), *How this works*, the items **Compose** and **Save and Share** (each opens Geometry's
  tip window, `CW.createInfoPanel`, with Michael's text; drag and close), and the commands *Share*,
  *Add to my list*, *Show my poems*, *Go to previous*, each present only when it can act
  (`CW.setWordPresent`), in Geometry's look (`../css/htw.css`). *Add to my list* keeps the poem as
  she composed it and then reads *On my list*, greyed (the one grey word; Michael's choice).
  **Her poems:** *Show my poems* becomes *Show new poems* and the page shows only her poems, whole,
  as composed, with her title (editable), no ideas, **Notes:** and a box kept with the poem, and
  *Remove from my list*; the last removed returns to new poems. *Next* there is her next poem.
  **Go to previous** walks back through this visit's trail (the Opening, and each limerick with her
  arrangement if she finished it): a finished one comes back whole with her title, an unfinished one
  freshly scrambled. The trail is never stored. Gone on 29 Sep: the ← arrow, *My list* and its window,
  *Keep on my list*, *Share Postcard*, *Write it again*, *Another one*, *Next line, please*.
  **Order:** after the Opening and Niger, a fresh shuffle each visit with the six she saw last at the
  back, never the same twice in a row; while she has finished fewer than five, the next is an easy one
  three times in four. **Share** is the postcard: Geometry's model (share sheet, download where there
  is none or it is refused, quiet on cancel), kept in the page; the card from the top: her note, the
  limerick's picture if she added it (only a record with a `picture` offers *Add the picture*), the
  title, the poem as she composed it, its credit. **Her device:** five `localStorage` keys,
  `cw.wordplay.openingSeen`, `.done`, `.recent`, `.kept` (her poems: id, order, notes; the bare ids of
  28 Sep are read as the poem's own order), `.titles`, every call wrapped; with storage blocked it
  works and remembers for the visit only (tested). No Remember (`maya: none`), no on-page keyboard,
  no *Say it*. Tab icon `art/icons/wordplay-icon-256.png`; gallery picture
  `art/gallery/wordplay-gallery.svg`, frame `#5a4632`, 8, small, on the wall.
- **`have-you-thought-of-a-story.html`** — **story: Have You Thought of a Story?** (26 Sep
  2026). Built and read at `experiments/`, **hung 26 Sep 2026** on Michael's word (stage 4): moved
  to `active/`, the old address redirected in `_redirects`, in `gallery.json` as **The Birth of
  Frankenstein** with the notebook page, frame `#453d34`, 10, medium. Mary Shelley
  and the night she saw Frankenstein, from `CWVault/claude/Story-Have-You-Thought-of-a-Story.md`,
  copied from `template-story.html` onto the Vermeer arrangement (across, with a left
  margin) with no new machinery. The object first: `art/stories/frankenstein/frankenstein-draft-21r.jpg`
  (Bodleian, MS. Abinger c. 56, fol. 21r, CC BY-NC 4.0, credit in the caption), with the
  magnifier and pinch from `../js/sampler.js` and no colour reading (the Delft pictures'
  mode), control words *Magnifier off* and *The whole picture* under it. Four margin
  pictures from the same folder: Finden's Diodati, Galvani's Tav. 3 and Aldini's Pl. 4 as a
  stack in one slot (`../js/stack.js`, because one paragraph names both), the 1818 title page (sources in `_CW/art-originals/frankenstein/SOURCES.md`). *Mary's World*
  on `../art/maps/london-to-bologna` (made for it, wide and shallow for the iPad), 1790–1832,
  Tambora a card at the east edge; nine new shared
  events went into `stories/world-events.json` and four places into `stories/places.json`
  the same day. Tab icon `art/icons/frankenstein-icon-256.png`: a 700 px square of the full
  scan at line 22, Mary's *Handsome* struck and Percy's *Beautiful* above it. Gallery
  picture ready at `art/gallery/frankenstein-draft-21r-gallery.jpg`, frame `#453d34`
  (the ink, measured), 10 px, medium; titled on the wall **The Birth of Frankenstein**, not the page's (Michael, 26 Sep: the story takes a while to
  reach the night, and the name says it is worth it). No Remember (`maya: none`).
  **Later, 26 Sep, on Michael's read:** *Darkness* is its own More entry, and *Read the poem*
  opens Byron's poem in the window Necker's letter uses (`cwWindow`), the text of the first
  printing (*The Prisoner of Chillon, and Other Poems*, 1816), checked line by line against
  the Duke University copy's page images on the Internet Archive and kept in a `<template>` in
  the page. The line lost six events (Leaves for France, Waterloo, "Darkness", Marries Shelley,
  The book is finished, The Vampyre) and is 181 px tall on an iPad instead of 307, so the
  whole map shows under the line and the panel even at 1024 × 768.
  **27 Sep, revisions (Draft 2.3):** the opening picture is `figure.tall`: its caption and one word,
  *Tap the page to see a magnifier* / *Put the magnifier away*, sit in the left column at the middle
  of the page's height (under it on a phone); *Magnifier off*, the tap sentence and the heading
  *The page* are gone. More reordered and reworded from the story; *Darkness* after *Ada*, its word
  *Read Darkness* (renamed on Michael's word so it fits in the margin of an iPad on its side),
  level with its paragraph; the poem at the More text's size, in a window as narrow as its lines.
  The 1818 title page is an ordinary margin picture again, 300 px at every width, once margin pictures stopped growing where the column folds (`figure.margin.half` stays in `css/story.css`, unused). Michael's opening (Draft 2.1: "The book Mary wrote began with a student…", three paragraphs) now sits between the date line and the notebook page; the body takes Draft 2.1's wording (twelve paragraphs, the readers' edits), so page and story match word for word, on Michael's word.
- **`professor-neckers-drawing.html`** — story: **Professor Necker's Drawing** (25 Sep 2026;
  text: `CWVault/claude/Story-Professor-Neckers-Drawing.md`, Draft 2.3). Built and read at
  `experiments/`, **hung 25 Sep 2026** on Michael's word (stage 4): moved to `active/`, the old
  address redirected in `_redirects`, in `gallery.json` with the cube mark
  (`art/gallery/necker-cube-gallery.png`), a slate frame `#4a5866` (the story asked for "a grey-blue,
  close to the ink"; Claude's hex, Michael's yes), width 10, medium. From
  `template-story.html`, on `css/story.css`, `placement: beside`: every picture in the left
  column level with the paragraph that names it. The drawings are `js/necker.js` (new): the cube
  at 225 px beside the opening (his box until 26 Sep), his lettered box, the filled cube (tap
  cycles; it was the box, and the plain cube beside *The Necker cube* went with that change),
  the cube with two copper dots. The crystals are a stack (`js/stack.js`), drawing above photograph,
  salt, alum, diamond, calcite, sugar. *See the letter* opens Michael's scan in `cwWindow`, which she can zoom and pan (26 Sep). A
  margin map of Switzerland, Geneva in copper. In *More*: the brain (26 Sep: the whole brain first; a tap takes the near half away and
  lights the VTA and hippocampus, with Lisman and Grace's loop between them, *again* only; both
  placed by eye on the painting — the atlas has no VTA, and its hippocampus sat too far forward
  and tilted the wrong way), a stack of four other drawings, the alum photograph. *Necker's
  World*, 1812–1852, through `js/timeline.js` on the shared lists, on `britain-and-geneva`, Edo
  and Tambora as cards. Remember (`js/remember.js`) fades in beside the last paragraph and puts
  the cube in the practice list (`practice.html`). Its opening
  is a drawing, not a painting, so it marks `#plate` with `data-opening="drawn"`, which
  `tools/check-story.sh` now reads as "no magnifier block to check".
- **`van-gogh-starry-night.html`** — story: **Van Gogh: Starry Night** (23 Sep 2026;
  `CWVault/claude/Story-Van-Gogh-Starry-Night.md`), the third of the paintings series, built
  on the Vermeer page and Story-Pattern. Michael's ruling on the page: plainly, in his own
  terms, no drama — no diagnosis, no myth, no ear; three letters set apart carry it. Written
  straight into `active/` on his reading, so it had no experiments address and needs no
  redirect; **hung 23 Sep** with its line in `stories/gallery.json` (the whole painting
  `art/gallery/van-gogh-starry-night-gallery.jpg`, 600 × 475, frame `#2a4192`, 12 px, large).
  `placement: across` with the left margin, on `../css/story.css`. The painting
  `art/stories/van-gogh/van-gogh-starry-night.jpg` with the magnifier and colour sampler from `../js/sampler.js`,
  anchors measured off this scan where the MoMA / RIT pigment maps name the paint. Maps through
  `../js/map.js`: `france-and-the-low-countries`, `france-to-the-north-sea` and `world`.
  Its timeline through `../js/timeline.js` on the shared `stories/world-events.json` and
  `stories/places.json`. One margin picture, Hiroshige's *Sudden Shower*, for the Japanese
  prints he copied. Stamped `2026-09-23 e7778e4` when hung; the stylesheet's version query
  bumped to `2026-09-23` on all three painting pages because `story.css` changed the same day.
- **`vermeer-girl-with-a-pearl-earring.html`** — story: **Vermeer: Girl with a Pearl Earring**
  (21 Sep 2026; `CWVault/claude/Story-Vermeer-Girl-with-a-Pearl-Earring.md`), the second of the
  paintings series. **Hung 22 Sep 2026** (Publishing-a-Story stage 4): moved here from
  `experiments/`, `_redirects` keeping that address, and given its line in `stories/gallery.json`
  from the story's `gallery:` block — the whole painting `art/gallery/vermeer-girl-with-a-pearl-earring-gallery.jpg`
  (600 × 711, tall), frame `#3d6e92` (the ultramarine off the turban), 12 px, medium. The first
  built to `Spec-Timeline-and-Map`: a date line at the head (the
  subtitle, as Hokusai's), no timeline in the story, and *Vermeer's World* written as data in the
  story file for when the timeline component exists. `placement: across` with the left margin.
  The painting at its own shape, never taller than 78 % of the window at rest and 88 % in the
  tool. The magnifier and sampler are `../js/sampler.js`, with fifteen anchors measured off this
  scan at places where the 2020 Mauritshuis study named the paint — so the names are the study's,
  and only *which part she tapped* is inferred from colour. The pearl has its own anchor (lead
  white laid thin over the dark); without it the story's first tap came back wrong. Maps through
  `../js/map.js`: `netherlands` in the margin (Delft `lit`), `lapis-road` full width in the flow,
  named by the text. **Johannes Vermeer's World** after *More*, through `../js/timeline.js` on
  the `north-sea-and-paris` map, sixteen events, 1630–1680, China as a card. Revised 21 Sep: a
  dashed possible route for the lapis (`map.js` path `possible`), Rembrandt, Newton born and
  Molière added to the World and to *More*, two margin pictures in *More*. Checked at 1440, 1100, 834 and
  390 px — no horizontal scroll, no clipped labels, no console errors. Seen by Michael 21 Sep; **not
  yet read on an iPad.**
- **`hokusai-the-great-wave.html`** — story: **Hokusai: The Great Wave** (19–20 Sep 2026;
  `CWVault/claude/Story-Hokusai-The-Great-Wave.md`), the first of the paintings series.
  **Hung 20 Sep 2026** (Publishing-a-Story stage 4): moved here from `experiments/`, where
  Michael read it, with `_redirects` keeping that address, and given its line in
  `stories/gallery.json` — the crest-and-claws icon, frame `#2e4a63` (the deepest blue in the
  print), 12 px, medium, on the off-white mat a photographic crop takes.
  `placement: across` **with a left margin** (the 20 Sep ruling): reading column 700 px, a
  300 px margin to its left with a 28 px gap, 1028 px shell, and everything wider than the
  column centred on that shell rather than on the column — which is the one sum to get right,
  because a breakout centred on the reading column hangs off the right of the screen.
  Below 1068 px the margin collapses and its pictures drop into the flow. Three things in it.
  **One timeline**, static, at the head of the page: 1815 to 1855, nine events and the print's
  own marker in copper at 1830 (the long 12 000-year line was built on 19 Sep and cut on 20 Sep
  on Michael's word — it distracted from the story). Labels hang below the rail on thin leaders
  and pack into as many rows as they need, lowest row that does not touch a neighbour, each row
  as tall as its tallest label, so the arrangement survives any event list. **Three maps**
  through `../js/map.js`: `japan` and `western-europe` in the margin, `world` full-shell after
  *More*. The marks name the places the story names, with the one the story is about `lit` —
  Nagasaki on Japan, Berlin on the other two — and a `side` hint on each. **A note on the
  record (20 Sep, hanging session):** an earlier version of this entry said the marks had been
  reworked to the third pass's `minor` and `water` labels with every `side` hint dropped; the
  file on disk when it was hung carried fourteen `side` hints and none of the new words, so
  that rework was described and not done. The page still gets the third pass's lines, halos
  and placement, because those are `map.js`'s; the lesser places and water names are a later
  edit to the story's map blocks. **The print**, with a
  magnifier and a zoom. Tap it anywhere and a 148 px circle sits there showing the print at
  four times the size, with a crosshair; drag the circle, or tap elsewhere to move it; *Put the
  magnifier away* removes it. Pinch (two pointers, or ctrl-wheel and `gesturechange` on a Mac
  trackpad) zooms the print in place to 6×; once zoomed, one finger pans and `touch-action`
  goes to `none`, with *The whole print* to get out. **The magnifier is the colour sampler**:
  before *Sample a colour* it only magnifies, and after it the print moves down the page, widens
  to the shell, and the same circle also reports the colour under its crosshair — a 5 × 5 pixel
  average, its hex and `rgb()`, and the nearest of nine pigment anchors with a sentence of
  chemistry. The anchors are measured off this scan, not taken from a swatch book, because the
  sheet has faded; match is nearest neighbour in CIE Lab, and where two anchors of **different
  materials** fall within ΔE 4.5 the tool names both and says the colour alone cannot separate
  them — which is what happens across most of the sky. Two things worth keeping: the print must
  carry `draggable="false"` and `-webkit-user-drag: none`, because a native image drag fires
  `pointercancel` and kills a pan one move in (found on the bench, 20 Sep); and the ctrl-wheel
  delta is clamped to ±40 so one flick of a trackpad does not jump straight to 6×. Reads
  `../art/stories/hokusai/hokusai-great-wave.jpg`, `../art/icons/hokusai-icon-256.png` and `../art/maps/`. The sampler
  needs the image same-origin, so the page must be served, not opened from disk. No Remember:
  Maya is absent and the practice queue does not exist. Checked at 1440, 1100, 834 and 390 px —
  no horizontal scroll, no console errors. **`maps/map.js` must move to `js/` before this page
  is hung in `active/`**, which is the call Spec-Maps reserved for Michael; the relative path
  breaks on the move. **Not yet read on an iPad.**
- **`glass-geometry.html`** — compass-and-straightedge construction environment;
  constructions become stained glass. **Hangs in the gallery since 20 Sep 2026** by
  `art/icons/geometry-icon-256.png`, a cut from one of its own postcards, which is also its tab
  icon (the first it has had; stamp bumped the same day, nothing else in the file changed). Reads `../text/geometry-v1.json` for its
  copy, `../art/palette/palettes.json` for palettes, and `../models/` for the built-in
  constructions. **Stands on the shared plane** (`../js/plane.js`, Phases 1–4):
  view state behind the plane's API, world y up, one zoom clamp, the emergent
  numbering's unit declared to the plane, the ambient lattice behind a Numbers
  control cycling map · points · off — and, since Phase 4, lattice-click
  minting: with the map showing, tapping a lattice intersection records a
  point (`lattice_point` op, unit-coordinate address). Saved logs replay
  unchanged but render mirrored across the seed axis relative to the retired
  y-down view. **Controls build (13 Aug):** occasional acts open choice
  panels (Save construction / Postcard / Full sheet — Postcard shares at
  1200×800, Full sheet keeps the 3000×2400 print render; the WIP guard also
  fronts the `.json` drop); **replaying opens the replay panel** (13 Aug
  afternoon, ledger §15): step arrows, Play with a 0–15s duration saved per
  construction (0 instant; last-used is the local default), Start over,
  tap-skips-ahead, close-as-fork — and the built-ins come from
  `models/constructions.json`; the action row is conditional
  (empty canvas shows only Open); the color panel is summoned by Color and
  closable; Numbers became Show map ↔ Hide map (old logs migrate at replay);
  the lattice tie is gone (grid keeps its step); Just the glass ↔ Show the
  making wires the `show_glass` viewing op. **The colour palette is a workspace
  window (1 Oct 2026):** Color opens it over the workspace at the top right, outside
  the column, dragged by its header (pointer events, so a finger on an iPad moves it)
  and closed by its close word, reopening where the child last left it; its contents,
  recipe line and swatch choice are unchanged, and the dragged-off clone it used to
  grow is gone. The model tool still stacks in the column. **A thin page over `js/glass.js` since
  1 Oct 2026** (the extraction, see `js/` above): the file is forty lines — the head standard, a host
  that fills the viewport, the five scripts, and `cwGlass(host, { level: 'both' }).focus()`. Everything
  the lab is lives in the module; nothing a child could do here changed, and what she saved before
  opens after (checked). It no longer loads `css/htw.css`; the module carries those rules scoped.
  Stamp `2026-10-01 3d3b607`. Ledgers:
  `CWVault/01-ACTIVE/Decisions-Phase{1,2,3}-Aug07.md`, `…Phase4-Aug08.md`,
  `…ControlsBuild-Aug13.md`.
- **`glass-multiplication.html`** — the times table as a window onto the number
  plane: every product a rectangle, prime factors in colour and sound.
  **Rewritten on the plane** (Phase 4, 8 Aug 2026): the map is a canvas
  viewing of the shared coordinate space (`../js/plane.js`) — panes are
  regions keyed by number, revealed everywhere they live including panes
  panned into later; pieces stack smallest prime first, identically
  everywhere (no mirror); colours are the `aslab` workshop's resting and lit
  palettes; primes reach 19 in sound and render as clear glass beyond the
  workshop's six; keyboard access via a pane cursor on the one tabbable
  canvas. Defaults to the map shown. Live since 8 Aug (that push's copy was
  approved via the printed-strings scan; the full read-aloud pass with Eileen
  comes later). **Controls build (13 Aug):** a conditional Save word (present
  when anything beyond 1 is on the glass) opens the choice panel — Postcard
  shares the window at 1200×800, Full sheet downloads the 3000×2400 print
  render (no construction save: this lab keeps no operation log, reported to
  the board); Numbers became Show map ↔ Hide map. Ledgers:
  `CWVault/01-ACTIVE/Decisions-Phase4-Aug08.md`,
  `…ControlsBuild-Aug13.md`; Michael's sorted post-Phase-4 review:
  `CWVault/01-ACTIVE/Review-GlassMult-Aug09.md`.
  **What `active/` carries is the 13 Aug build** (`CW_VERSION 2026-08-13 b32d541`),
  restored 1 Sep after the 24 Aug panel build was frozen unshipped to
  `../prototypes/glass-panel-build-aug24.html` — see the prototypes note at the foot
  of this file. Nothing deployed changed. The rebuild runs bench-first on the plane
  (`CWVault/01-ACTIVE/Walk-Glass-Aug26.md`), and this lab stays live throughout.
- **`about-your-brain.html`** — **About Your Brain.** An official app beside the two labs
  (Michael's ruling, 13 Sep 2026), and **the first card on the main index to link by icon**:
  the watercolour brain at `../art/icons/brain-icon-256.png`, icon and title one link. A short
  reading (neurons, eighty-six billion of them, a hundred trillion connections, a brain
  the weight of a large cantaloupe) and then a map: Michael's two brain watercolours —
  the outside view and the inside view, reached by the words *inside* / *outside* — with
  twelve named places (*conscious thought*, *where seeing starts*, *how many*, …, each
  with a sentence when tapped; *all of them* lights the lot), and beside them **Ten
  Things It Does** — seeing three triangles, reading a word, hearing a beat, tracing a
  star in a mirror, remembering, touching something hot, playing ping-pong, seeing a
  chess position, hearing an old song, drawing a friend's face — each a signal
  travelling the brain as a comet along a road, with *step*, *real speed*, a slow-to-real
  slider and a counter of brain-time in ms; starting one stops the one before. Region ids
  and coordinates match `Spec-Brain-Bench.md`; this is the atlas, not the bench (no
  *earn*, no deposits, nothing stored). **Self-contained but for its icon**: both
  paintings are base64 in the file (4.1 MB), no shared scripts; the one `../` path is
  the tab icon, `<link rel="icon">` and `apple-touch-icon` both pointing at
  `../art/icons/brain-icon-256.png`. **19 Sep:** one `</div>` added to close the map row —
  it had been open since the 13 Sep revision, so the footnote sat in the row as a fourth
  column and the brain and its word columns hung left in a wide window; now the row and
  the note centre under the reading column at every width. Later the same day, on Michael's second report: below
  1048 px, where the three pieces no longer fit in one row, the brain now comes first and
  the two word lists sit side by side beneath it (one media rule; before, the lists
  stacked above and below the brain). Nothing else changed. The
  revision arrived with the icon inline as a `data:`
  URI, and **Safari on iPad ignores data-URI favicons** — tested 13 Sep on the iPad
  (10th generation) simulator, iOS 18.2: a placeholder letter in the tab, while a
  two-page control on the same Safari showed the identical PNG as a file at once
  (Chrome honours both). Repointed to the file on Michael's word the same day, and the
  brain shows in the tab. Stamped the same day, per the standing method. A page that
  moves must have that one path checked. History: built as `experiments/brain-atlas.html` (never listed in
  `experiments/index.html`), moved to `active/brain-atlas.html` as *A Small Brain Atlas*
  and pushed as a demo on 12 Sep (`CW_VERSION 2026-09-12 82033fa`, now
  `../outdated-files/brain-atlas-20260912.html`); renamed here with the ten-pathway
  revision on 13 Sep, `_redirects` keeping the day-old URL alive. Its workbench —
  the paintings, the overlay, the checks, `make_overlay.py` — is `../prototypes/brain/`,
  moved out of the publish directory the same day; see the prototypes note at the foot. **1 Oct 2026 — the palette is a workspace window** (a chat session's change, checked and committed by Claude Code the same day): the colour palette no longer sits in the column's tool stack; *Color* opens it over the workspace at the top right, it drags by its header with pointer events (a finger on an iPad as well as a mouse), closes by its word, and reopens where the child last left it; the swatch grid keeps its width. Checked in the built-in browser at 1024 × 768: open, drag, close, reopen in place, no console errors. `?v=2026-10-01`.

- **`the-man-who-learned-without-knowing.html`** — story: **The Man Who Learned Without
  Knowing** (text: `CWVault/claude/Story-The-Man-Who-Learned-Without-Knowing.md`), on the
  home page beside About Your Brain since 14 Sep 2026, linked by its icon
  (`../art/icons/star-icon-256.svg`, the star with a copper dot). The finished story page,
  self-contained: the two-panel layout of UI-Language §1 — the narrative on the right,
  the **context membrane** on the left carrying the star, then the brain, then the
  inscription. The star (380 px stage, mirrored left-right, the road 6% of the star's
  width, one bump per excursion, a trip counts when 80% of the road is travelled and the
  dot is back at the start; lifting the finger abandons the trip) runs ten trips, then
  *again* / *without the mirror* / *show the star* / *the graphs*. Scrolling to *Henry*
  brings the outside brain in, with *tap the brain to see what the surgeon removed* —
  the word or the picture turns it to the inside view and marks the hippocampus,
  *removed, 1953*. Scrolling to *Two memories* brings the brain back with *your brain,
  tracing the star* and *Henry's brain, tracing the star*, each a signal along the
  atlas's roads with step, again, clear and a slow-to-real slider. The inscription puts
  `mirror-star` in `cw.practice.queue`; trips live in `cw.mirror-star.v2`. **Nothing
  else on the site reads either key yet.** Both paintings are inline base64 (4.1 MB of
  the file). **Tested 14 Sep on the iPad (10th generation) simulator, iOS 18.2**: a finger
  drives the dot round the whole road; Henry brings the brain and both tap targets
  reveal the surgery; Two memories brings the second brain with both words. Copied from
  `experiments/trace-prototype-star-story.html` byte for byte on 14 Sep; **the page
  standard added on Michael's word, 15 Sep** — the file had arrived opening with
  `<title>`: no doctype, no charset (its em-dashes are raw UTF-8 and showed as mojibake
  on a local server), no viewport, no icon, no stamp. Now: the five lines, the icon as
  `../art/icons/star-icon-256.png` (rasterized from the SVG, because Safari wants a PNG), and
  `</body></html>` at the foot; the narrative and script are untouched. **One
  consequence of the viewport line, reported:** the page's own rule stacks the panels
  below 800 css px, which could never fire while Safari laid it out at 980 — now an
  iPad narrower than 800 points in portrait (mini; the 2017-era 768-point iPads) shows
  the star *above* the story, where the text says *on the left*. The 10th-generation
  iPad (820) keeps two columns. The source copy in `experiments/` and a stray re-export
  of the atlas were removed 15 Sep on Michael's word; the story's original bytes are
  commit `fa56905`. Not the story-door route: `experiments/story-learned-without-knowing.html`
  (11 Sep, calling `trace.html`) stays as the record of that route; this page carries
  its own star engine and its own brain.

- **`three-at-a-glance.html`** — story: **Three at a Glance** (text:
  `CWVault/claude/Story-Three-at-a-Glance.md`, Draft 5, which matches the page), built 16 Sep
  2026 on the model of `active/the-man-who-learned-without-knowing.html` — stage 2 of
  `00-PUBLISHING-A-STORY.md` — then changed the same day on Michael's reads, read by him on
  the Mac and the iPad, and **hung on the home page 16 Sep** (stage 4): moved from
  `experiments/Three_at_Glance.html`, which `_redirects` sends here, and given the third icon
  tile beside the star, `../art/icons/three-dots-icon-256.svg` with its title and no subtitle, as the
  story's frontmatter says. The story's text through
  *More*; the notes are not rendered.
  **Layout (Michael, 16 Sep; amends the Pictures-in-a-story ruling for this page):** the left
  column scrolls with the story, and each block is placed level with the paragraph that names
  it, pushed down only if the block above would overlap: **Experiment 1** (*tap on 3*,
  *preview*) beside "There's an experiment on the left"; **Experiment 2** (two columns: *the
  graphs* · *stop*, *tap on 2* to *tap on 7*, the flash knob under its graph) beside "This is
  a different version"; **Experiment 3** (*two colours*) beside "Tap two colours"; **Experiment
  4** (*a red one*, *a triangle*) beside "Tap a red one"; the brain beside "Tap the brain on
  the left". (The repeat of Experiment 2's graph beside the last Jevons paragraph was removed
  16 Sep with that paragraph's new ending.) Every experiment is available from the start; one runs at a time, and starting
  one stops another. Blocks are built by the script; placement reruns on resize, font load
  and any block's change of size (ResizeObserver). At 800 css px or less each block moves into
  the story just before its paragraph. Experiment 1 keeps its own record: its *tap on 3* runs
  never appear on Experiment 2's chart. The text names Experiments 2 to 4 where it sends her to
  them (16 Sep, Michael's yes).
  **Each round** (the Flash bench, inline; the story's notes are its spec): *Ready* at the
  field's left edge, halfway down, the moment she presses the word → 1 s → the dots, about
  200 ms, *Ready* going with them → 2 s blank → **the reveal**, the same dots on a canvas over
  the field for 600 ms → a 400 ms fade, the end of the round (17 Sep: the lead-in went and the
  reveal came down to a second, because a run felt too long). A press anywhere but on a word counts (Space or Enter too), one a round,
  from the dots until the reveal. Dots Payne's grey (#536878), all one size (r 14 counting, 8.5
  in Experiment 4, squares and triangles of equal area), never over *Ready*, never
  overlapping. *Preview*: three rounds, nothing recorded. *Stop* shows only on the running
  experiment and, since 17 Sep, **counts as finishing**: the rounds already seen are recorded,
  so a run stopped in its first round still has graphs. Rounds: 12 (4 targets) in Experiments 1–3, 12 in Experiment 4, whose set sizes are 4, 10 and
  20 since 17 Sep, drawn at radius 11;
  every *tap on n* uses groups of 2 to 7. Graphs only when asked: taps by n (or set size)
  against the chances there were, and seconds after the dots with each tap a dot and the
  median a line, with the story's captions; for Experiment 2 one chart above the number she
  looked for — copper for a tap when it was that number, a circle beneath for a tap when it
  wasn't, height the time, misses not shown (latest run per number). **The brain** (rebuilt 17 Sep): the
  outside painting (inline, 354 KB of the file) and five words — *The regions* (IPS, the colour
  patch and V1 lit together, as before), *Recognising 3*, *Counting*, *Noticing red*,
  *Recognising shapes* — each a signal travelling roads drawn as splines, a comet along each leg
  at a twelfth of life's speed, a line of words as each leg lands, and *Again*. The engine, the
  region coordinates and the *Recognising 3* pathway are About Your Brain's; the other three
  pathways are written for this story and their times are set out in the story's notes for
  Michael to check. Beside the Jevons paragraph, the engraving `../art/stories/three-at-a-glance/jevons-1877.jpg`.
  **Words** are bold and capitalised, and headings in the story are bold and half a line closer
  to their text (17 Sep); each experiment carries a 0.5 px border. **Graph labels** follow one
  convention: the vertical label rotated beside its axis and centred (*taps*, *time in
  seconds*), the horizontal label centred under it (*number of dots*, *number of shapes*,
  *number you looked for*), and the legend only on the upper graph of a pair. **Nothing is stored.** Remember
  obeys the Maya flag and, since the text never refers to it, stays invisible while `maya` is
  false. **No References section**: the story has none yet. Reads `../js/cw-flags.js` and
  `../art/icons/three-dots-icon-256.png`. `CW_VERSION 2026-09-17 bf0397a`.
  Tested in Chrome (desktop app pane): round timing measured (Ready → dots 1.009 s, dots
  0.20 s, reveal 2.01 s later, fade 2.01 s after that, 0.61 s fade); preview and stop; full
  runs of *tap on 3* and *tap on 4*; every block level with its paragraph at 1280 wide, none
  overlapping; Experiment 2 run before Experiment 1; the by-number chart, the knob, the
  closing graph; all six blocks inside the story at 700 wide with no sideways scroll. **Not
  tested on an iPad, or in Safari by this session.**

### experiments/

- **`join-bench.html` → `active/deep-time.html`** — *The join*, built 6 Oct 2026 and **hung 7 Oct on
  Michael's word as Deep Time**, beside the Time Machine in the gallery (`stories/gallery.json`, slug
  `deep-time`, picture `art/gallery/deep-time-gallery.png`, a slate frame), the bench retired to
  `../../outdated-files/join-bench-2026-10-07.html` and its addresses redirected in `_redirects`
  (`/experiments/join-bench.html`, `/experiments/join-bench`, `/experiments/deep-time-join` → the page).
  The page's own words replace the bench's; everything below still describes it. The nested bar driving the Time Machine's map,
  Stage 4 of `CWVault/claude/Plan-Deep-Time.md`, and the one engine change the thread needs. **In
  `../js/map.js` (that day): a second base.** `opts.time.deep = { seam, plates, coast, onChange }`;
  past the seam in years ago (2.6 million unless said) `map.setTime(year)` shows the globe
  (`../js/globe.js`, which the page loads; absent, the map says so on the console and shows today)
  in the stage over the tiles, the sea and the marks — a `.cw-deep-base` host, parchment, the globe
  centred and sized to the stage's shorter side — and this side of it the pyramid with the sea and
  the ice as before. The globe opens centred where the map was looking; it arrives pulling away
  from the ground (opacity and a scale from 2.4 to 1 over half a second; reduced motion, a fade)
  and leaves coming down to it. Over it nothing of the map responds: its host stops pointer, wheel
  and click; its own drag turns it. `map.deep()` says whether it is on and how sure the positions
  are; `onChange(on, grade, why)` tells the page. **Globe, map or both (7 Oct):** `opts.time.deep.view` and `map.deepView(v)`,
  held across the whole span — past the seam the host shows the chosen view(s) of the pieces, two
  instances side by side for *both* sharing one seed; this side of it *map* is the pyramid alone,
  *globe* the globe with today's coast over the pyramid, *both* the globe in the right half beside the
  pyramid (`.half`). `map.deepReguess()` is the word *another guess*; `map.deepClimate(on)` the word *Climate*, on both
  views. The bench's words *See it as: Globe · Map · Both · Climate*. The bench: the bar, the words (the year, the
  grade, its sentence), the map with the Time Machine's opening box and, since Stage 5, the ice-age sea-level curve
  (`stories/curves/sea-level-ice-ages.json`) and the curve words under the bar.
  Lesson: the globe must measure its host's layout width, not its drawn width, or it sizes itself
  to the scaled-up arrival. Reads `../art/icons/time-machine-icon-256.png`. **9 Oct 2026 — the one
  store:** the page's events file now holds every event, deep and after the ice (see
  `stories/deep-time-events.json`); the After the ice bar draws the 109 timeline records as its marks,
  labels heavier first, and a tap on one opens its More with the stepped three-line date (the
  Time Machine's), a September survivor's summary without the word More. `js/deep-time.js?v=2026-10-09`
  on this page and both benches (`globe-bench.html`, `deep-time-bench.html`, restamped). `CW_VERSION 2026-10-09 20ce31e`.
  **9 Oct 2026, later — Michael's five points, four built (`CW_VERSION 2026-10-09b 924933f`; `map.js`, `globe.js`
  and `deep-time.js` at `?v=2026-10-09b` here and on the two benches):** (1) the flat map alone fills its area —
  in `../js/map.js` the deep base, past the seam with *Map* chosen, grows the box to the map's 2:1 at its full
  width within the window's cap (`STAGE_MAX_FRACTION`) and brings it back when the globe returns or the ground
  does, and `.cw-deep-base` clips so past the cap the poles crop evenly, as the pyramid crops them; in
  `../js/globe.js` the flat projection takes its host's whole width, only the disc capped at 560 px. (2) The
  map's words — the grade, its sentence, *See it as*, Climate, another guess — sit below the map in `#mapwords`;
  above it only the year and the event's summary. (3) **The passing line**, an experiment, his to keep or cut:
  as the marker passes an event on the deepest open bar the page posts its name and summary marked *just
  passed*, with More, the one nearest where the marker now is when a jump crosses several; `js/deep-time.js`
  gives `events()` and `span()` for it. (4) A mark is a short vertical bar under the body, not a dot, the tail
  running older from it. The fifth point, the graph tool, is lane D of `CWVault/claude/Prompt-Build-One-Timeline.md`,
  the Stage 7 brief. Checked on the Mac: *Map* at 300 million years grows the box from 397 to 505 px and the
  map is 961 wide; *Both* and *Globe* bring it back; the ground at 10,000 years brings it back and the tiles
  redraw; a walk across the dinosaurs' bar posts the Great Dying, Dinosaurs, Triassic ends, Archaeopteryx,
  Flowers in turn; 179 bars drawn (the oldest grains still past the root); no console errors.
  **9 Oct 2026, evening — lane B, the line in the Time Machine's form (`CW_VERSION 2026-10-09c 966da51`;
  `js/deep-time.js?v=2026-10-09c` here and on the two benches):** `../js/deep-time.js` rewritten — every level is
  a line, the periods on it quiet tinted segments with their edges ticked and their names on them (the short
  name, or none, where it does not fit), the blue envelope over the chosen period with the funnel down to the
  next line (the Time Machine's Focus window at every level), the marker on the deepest line and a copper tick
  on every line above, the marks as short bars under the line with their tails, the curve band under the
  deepest line as before. Tap a period: the envelope settles on it and it opens beneath; tap it again and it
  closes. Drag an end of the envelope (or its body): the line below follows, any deeper line closes, and near a
  period's edge the end clicks into place (a detent, 9 px); snapped, the envelope and the funnel's edges are blue
  and the funnel's space says the period's name; free, the envelope is white and the funnel says the span
  ("about 133 million years"), and the line below is "part of" its period, its segments clipped. A line's left
  end reads **0** over the years ago, its right end the duration over the years ago (or *now*). A crowded line
  thins its marks, heavier first, so no two sit within 3 px (the rest show on the line that has room; the
  landmarks of lane E are the real answer). The filled bars, the piecewise stretch of a thin chunk and the
  twitch are gone: a hairline is a hairline, a thin segment keeps its finger-sized hit area, and any segment
  opens (a leaf opens as a line of its events alone). New in the api: `focus(a, b)` sets the deepest envelope to
  a span; `path()` names a free span as its length. The page's words rewritten for the window. Checked on the
  Mac and at 375 px: Animals then The dinosaurs open as three lines (396 px high); the whole chain to After the
  ice is seven lines (868 px) with 51 of its 111 marks drawn and 17 labelled; a drag of the dinosaurs' younger
  end turns the envelope white at "about 133 million years" and snaps blue again at 66; the phone shows
  First life, Oxygen, Ancestors and the short names, the young Earth and Animals too narrow for a name; no
  console errors. Screenshots `Claude outputs/deep-time-lane-b-lines.jpg`, `-phone.jpg`.

- **`globe-bench.html` (6 Oct 2026)** — *The earth from space*: the nested bar of deep time over a
  globe, Stage 3 of `CWVault/claude/Plan-Deep-Time.md`. **`../js/globe.js`** (new that day) —
  `cwGlobe(host, opts)`: a canvas disc, orthographic; reads `../stories/plates/continents.json`
  and, for a year, turns every living piece of continent by its plate's rotation (slerped between
  the file's samples, precomputed to a 3×3 per plate per draw) and draws them as one fill, never
  the pieces outlined one by one (the model's terranes would show as lines), with a thin stroke
  in the land colour closing the hairline gaps between neighbours. **The five words of knowing (7 Oct 2026; Ideas-Ledger *Invented land,
  honest about it*)**, by age: *measured* below 200 million years, drawn solid; *inferred* to 540,
  the land drawn seven times shifted in longitude at low alpha, firm north–south and smeared
  east–west; *fitted* to the model's reach (a billion years), a wider smear; *guessed* past the reach
  while cratons exist, to 4 billion — the pieces' real birth ages are in the file now, and each is
  placed by the model's last position plus a random slow drift from a seed (about half a degree per
  million years), so that going back the accuracy falls to chance; drawn pale with a dashed edge
  round the union; *invented* before the oldest rock, to 4.4 billion — random blobs whose total area
  is the crust series of `stories/curves/crust-and-land.json`, shapes and places from the seed, drawn
  paler with a dotted edge; *none* above 4.4 billion, a dark red ball; and this side of the seam
  *ground*, today's coast and the shelf's edge as lines over pale land. The seed holds while the
  marker moves; `reguess()` draws a new one (the word *another guess*, present in the guessed and
  invented grades) and every visit begins with its own. `setProjection('flat')` draws the same rings
  equirectangular on a 2:1 canvas, each ring unwrapped and drawn three times a world apart so one
  across the seam shows whole, a drag panning east–west; the bench's words *Globe* and *Map*. Each
  grade has its sentence (`cwGlobe.GRADE_WORDS`). **The island and the climate (7 Oct, later):** inside
  each guessed or invented piece, the part that probably stood above the sea — the land series of
  `crust-and-land.json` over its crust series, the ring shrunk toward its centre by that share — in
  the land colour inside the pale drowned crust. `setClimate(on)` (the word *Climate*) washes the land
  by a MODEL, said so in `cwGlobe.CLIMATE_WORDS`: green everywhere, dry in the belts 15° to 35° either
  side of the equator and in the middle of a big continent (the land drawn flat into a 180 × 90
  raster and eroded five times, two degrees each, the survivors washed dry), white at the poles down
  to a latitude in the cold ages (the Huronian, the Ordovician, the late Palaeozoic, the Cenozoic from
  34 million years in the south and 2.6 in the north) and white all over in the snowballs. Not yet the
  rocks: the climate atlases can replace the rules later. Today's coast (the world pyramid's `contours-0.json`) is
  drawn as a line for the last five million years, fading. A point behind the globe goes to the
  limb, and between two hidden points the path walks the limb's arc, not a chord (a chord filled
  wedges across the disc); a ring with no point facing us is left out altogether (traced, it looped
  the limb and wound the whole disc inside out — the sea-and-land swap of Michael's iPad test).
  **Drag turns the globe** in Michael's standard view (the ruling of 6 Oct, amended that evening):
  north up at rest, east–west about the pole without limit, north–south by tilting until a pole faces
  us, a right drag moving the surface east whatever the tilt; drawing on it waits for a drawing tool. `setTime(ma)`, `turn(lon,
  lat)`, `grade()`, `destroy()`. Driven here by `../js/deep-time.js` (`onYear`). Measured on the Mac
  in the desktop app's pane at 520 px: a draw averages 6 ms, worst 25, and a sweep of the year
  runs at the display's frame rate; **not yet seen on an iPad**. Reads `../art/icons/time-machine-icon-256.png`.
  `CW_VERSION 2026-10-07 2bfb1fc`. Short addresses while Michael tests on the iPad, in `_redirects`
  (302, not a move): `/experiments/deep-time` and `/experiments/deepTime` open this bench,
  `/experiments/deep-time-bar` the bar alone, `/experiments/deep-time-join` the join.
- **`deep-time-bench.html` (6 Oct 2026)** — *Deep time, in sections*: the nested bar alone, Stage 2
  of `CWVault/claude/Plan-Deep-Time.md`. **`../js/deep-time.js`** (new that day) — `cwDeepTime(host,
  opts)`, a shelf module mounted into an element as `glass.js` and `map.js` are: one SVG; the top
  bar is the whole of Earth from `../stories/deep-time.json`; tap a chunk and it comes down as a
  bar of its own at three-quarters width, attached by two lines and a pale trapezoid to the gap it
  left (the Time Machine's Focus window, repeated); tap it again and it goes back up; a chunk with
  nothing underneath comes down as a leaf bar and its body twitches when tapped. Widths are honest
  (6 Oct, evening, after Michael found the ice ages and After the Ice drawn alike): a chunk is as wide
  as its years down to a three-pixel floor, so After the Ice is a hairline and the lines fan out from
  it; a chunk thinner than a finger gets an invisible 28 px hit area over its neighbours, the thinnest
  on top; the bar's time scale runs piecewise through the boxes so marks stay inside their chunks. Chunk names fit
  or fall back to `short` or to nothing (the colour carries it; on a phone most do). Every bar has
  its name and span above it; the deepest bar's `knownFrom` line sits under the readout, cut to
  fit by words. Marks: a dot at the oldest evidence, a faint gradient tail older for `tail`, labels
  in two rows dropped where they collide; tap one and the marker goes there (`onMark`). The copper
  marker lives on the deepest bar, a knob to drag and a strip under the bar to tap, and shows as a
  tick on every bar above; the readout counts *ago* only — billions, millions, thousands of years
  (the ruling of 6 Oct). `onYear(ma, storeYear)`, `onBar(bar, path)`, `setYear`, `open(names)`,
  `destroy()`. **A curve under the bar (Stage 5, 6 Oct):** `setCurve(curve)` draws a curve file along the
  deepest bar's span as a band (low to high, soft) with the value as a line, a second series if the
  file has one, the unit and the scale at the left, the first sentence of `howSure` at the right, and
  the value at the marker in words (`say`; a tiny fraction becomes 'a millionth'); the axis never zooms
  into a sliver, so a tight band stays thin rather than filling the box. The words under the bar on
  this bench and the join's — *Sea level, Oxygen, Day length, Minerals, Sun and inside* — turn one on
  at a time. Checked at desktop width and at 375 px. **The marks from the store (Stage 6, 7 Oct):** given `events`, a bar's marks are the
  store's events whose age falls in its span, labels placed heavier first; `onMark` hands over the
  record; `cwDeepTime.moreHTML(rec)` renders the More as the Time Machine page does, with a
  known-from line and the place of the evidence. The hand-over to the Time Machine's own line
  at the bottom rung is an event here, the mounting into `active/time-machine.html` is Stage 7.
  Reads `../art/icons/time-machine-icon-256.png`. `CW_VERSION 2026-10-07 2bfb1fc`.
- **`time-passing-bench.html`** — bench: **Time-passing, in operation** (30 Sep 2026; Michael asked to
  see Naomi Devil's *Idő-töltés* work and is wondering about a page). A simulation of the
  sculpture's mechanism from the artist's own description (no film was found): two radial
  gratings over a blue-violet light, drawn once each to an offscreen canvas and composited
  with `screen`, one turning at a motor's pace, with a few more spokes than the other — the
  difference in spoke count is the number of lobes in the moiré, so *two more* gives the figure
  of eight the artist calls the infinity sign; the moiré turns N/d times faster than the disc.
  Schöffer's hourglass sits on a square mount that turns once every fifty seconds, its sand
  running into whichever bulb is lower and turning over with it. Words, not buttons: Turning /
  Turn, the spoke count (48, 60, 90), the other disc's surplus (the same, one, two, three more),
  the motor (slow, medium, fast), *Just one disc*; a drag on the picture turns the disc by hand.
  Credit and licence in the page's note. **Pictures:** `art/icons/time-passing-icon-256.png`
  (the tab icon, Michael's crop of the photograph, squared on the disc) and
  `art/stories/time-passing/devil-time-passing-2016.jpg` (the crop as he sent it, in a folder by story like the others), both from Darabos György's
  photograph on Wikimedia Commons, CC BY-SA 4.0, uploaded by the artist; the crops carry the same
  licence and credit. The sculpture is the artist's copyright; the simulation draws the
  mechanism, not the work. Seed: `CWVault/03-SEEDS/time-passing-moire.md`. Tested on the Mac in
  the built-in browser. Not hung.
- **`time-machine.html` → `active/time-machine.html`** — **Time Machine**, the new After the Ice (30 Sep 2026; built here as a bench and **hung the same day on Michael's word, beside After the Ice**, which stays on the wall for now: `stories/gallery.json` slug `time-machine`, picture `art/gallery/time-machine-gallery.jpg` (800 px), frame `#4a4e9e` (the stripes' blue-violet, Claude's choice), width 8, medium; `_redirects` from the experiments address. The picture and the tab icon `art/icons/time-machine-icon-256.png` (shared with `experiments/time-passing-bench.html`) are Michael's crop of Darabos György's photograph of Naomi Devil's *Idő-töltés*, Wikimedia Commons, CC BY-SA 4.0, uploaded by the artist; the crops carry the licence, and the introduction page carries the credit. The original crop is `art/stories/time-passing/devil-time-passing-2016.jpg`. Built from the Time
  Machine mockup in `CWVault/claude/mockups/` and the prompt of 30 Sep; the worknote the prompt
  names, `Worknote-Time-Machine.md`, was not on disk when this was built, and the mockup and the
  prompt were the brief). An introduction page (kicker, title, the first paragraph of
  `Story-After-the-Ice.md`, *Next*), then two lines and the map. **Main** is the whole span and
  never rescales; the **Focus window** on it (drag the band, drag either end, tap the line to
  jump) sets the span of **Detail**, two-thirds of Main's width and centred, lines running from
  the window's ends to Detail's ends, the years after 0 and the years ago in bold at each end.
  Detail is `js/timeline.js` (its packing, at most `DETAIL_ROWS` = 4 label rows and the lightest
  lose their label, not their mark; the soft stretch of an uncertain date; the shared picking;
  the plane's 1–5–10 ladder for its ticks, unlabelled — the ends say the years). The copper
  **Year handle** lives on Detail: tap empty Detail to move it, drag it, tap a mark to select
  and move it there; the Focus window carries it along. Under Main at the left, the handle's
  year in after-the-ice years, and a copper tick on Main. The **summary block** under Detail,
  Detail's width, reserved space: the label in bold, the summary, *More*; More opens the
  stepped date line (CSS, `Timeline-Stories.md`), the paragraphs and the references in
  `cwWindow`, Glass Geometry's window as `map.js` carries it. The **map** is the world pyramid
  on the whole earth, the timeline's width to start, one line under the summary block, nothing
  below it; bars at its left and right edges (the page's, in place of `map.js`'s left bar) and
  `map.js`'s own strip at the bottom stretch it, the left bar over the column to the page's
  edge; *reset* puts it back. A tap on an event centres the map at her zoom; a tap on a place
  selects its event (several at one place: the one in the window nearest the handle). The map
  takes the handle's year through `map.setTime(year)` (new in `js/map.js`, 30 Sep): the sea
  follows `stories/curves/sea-level.json`; **no past ice or vegetation layer is rendered in
  `art/maps/`** (the pyramid has today's `ice` and `vegetation`, and the shallow-sea layer), so
  those show today's ground and say nothing; the console says so once. The **column** is
  `#htw-panel` in `../css/htw.css` (Glass Geometry's, shared with Wordplay since 29 Sep — no new
  shelf file was needed): *How this works*, Timeline and Map (each a `CW.createInfoPanel`
  with the mockup's words, over the stage or the map, one at a time), *What I've seen* (filters
  to the events she has tapped, stored under `cw-after-the-ice` as After the Ice does; the word
  is present once she has seen something and turns copper while on), the curve words *People*
  and *Sea level* (one at a time; tap again to hide), and *When were there a billion people?*
  **Curves:** a soft filled silhouette above Detail along its span, no axes, one number at the
  handle said with "about"; People scales to the largest value in the Focus window, Sea level
  keeps one scale for the whole span. **The recorded question** replays three steps from data
  in the page (`QUESTIONS`: a list of actions with durations and a line each — the bench's own
  shape; Glass Geometry records an operation log with one speed, not steps): open the window
  to the whole span, show People, drag the handle to a billion; then it says what was found
  (about 1805). A tap anywhere stops it, and the arrival run (the Focus window sweeps from the
  ice to now, then settles on 4 000–7 500). **Data:** `../stories/after-the-ice-events.json`
  and `../stories/timeline-events.json`, merged at load — where a new event covers the same
  thing as a September one the September one is dropped: the record's own `replaces` field names
  it (30 Sep to 9 Oct the page held 15 pairs as `SAME`, in neither file; since 9 Oct those are
  Replaces lines in batches 1 and 2 and the samples, and `SAME` is gone — every retirement is in
  the data, 86 ids by batch 7), and `CUT` in the page drops the two September records Michael cut
  with no replacement (`lead-socrates-2` Heraclitus, 1 Oct; `lead-frank-3` Aldini, 8 Oct), no alias.
  **9 Oct 2026, batches 5 to 7 loaded:** 111 events on the line (109 from the batches, plus `jomon` and
  `starry`, the last September records standing); `CW_VERSION 2026-10-09 20ce31e`. A September record that stands aside for the shared list (`same`) is kept,
  since this page does not read the shared list; `../stories/places.json` is read for the
  coordinates the September file names by id; `../stories/curves/`. An old event shows its
  September blurb, with its plain year in front, and has no More. Tested on the Mac in the
  built-in browser at 1024 × 768: the run and its stop, the Focus drag and both ends, the jump,
  the handle by knob, by empty Detail and by a mark, the More window, both curves over the
  whole span and a narrow window, the replay, What I've seen, the bars, the panels; every story
  page and After the Ice open unchanged with no console errors. iPad: see the board. Tab icon
  `art/icons/time-machine-icon-256.png`. Hung 30 Sep. **1 Oct 2026 — the first page, and viewings
  (Michael):** the introduction page now says what the thing does, briefly and for now, and
  carries the words that choose a **viewing** — a zero, a name, a span and a focus
  (`CWVault/claude/Time-Machine-Shape.md`), held as data in the page (`VIEWINGS`): *After the
  Ice* (zero −10 000, to now, the window on 4 000–7 500), *China, with the Song in the window*
  (zero 2070 BC, the traditional Xia, to now; the window on 960–1279), *Egypt, from the Sahara to
  Cleopatra* (zero 5500 BC, to 30 BC; the window on the pyramid centuries, 2700–2100 BC). A story
  names one with `?view=<id>` in the address. Main runs the viewing's span, its right end carries
  the viewing's end name, the count under Main says the viewing's name, and *years ago* counts
  from today whatever the end. The zeros and names are Claude's choices, to be ruled on.
- **`index-old.html`** — the home page as it stood from 13 to 20 Sep 2026 (two labs as
  words, three round icons, Experiments as a line), retired when the gallery took
  `index.html`. Recovered from git with its links rebased one folder up, given a tab icon
  and a fresh stamp, its footer saying what it is and linking to the gallery. Listed on the
  experiments index. No redirect: its old URL is the gallery's.
- **`gallery/`** — the three home-page mocks from the 15–20 Sep chat sessions:
  `home-mock-salon.html` (19–20 Sep, the salon hang Michael approved and the gallery was
  built from; sixteen paintings from `art/palette/` with placeholder titles), `home-mock-gallery.html`
  and `home-mock-scatter.html` (15 Sep, the two hangs it was chosen over; given viewport,
  icon and a `2026-09-15 mock` stamp on 20 Sep so the check passes). Linked from the
  experiments index's Old Home Page entry.
- **`bead-string.html`** — bench: **Pull a Bead** (18 Sep 2026), the first bench of the
  Bead Lab (`CWVault/claude/Bead-Lab-Ideas.md`). One file, no dependencies. A string of
  beads pinned at both ends; each bead is joined to its two neighbours by a spring and
  follows one rule. Drag, release, pin by tapping. Controls: tension (×¼ to ×4, an octave
  each way), friction, bead count (3 to 40 — length and total weight stay fixed, so more
  beads means a truer string, not a lower note), slow motion, the pulls as arrows, a trace
  of the released bead, gravity (a hanging chain). **Listen** runs the same model in the
  audio thread, 158 to 1 261 times faster, and sends one bead's motion to the speaker;
  Pitch snaps to 110/220/440/880 Hz; friction is the only thing that fades the sound.
  Step count in the audio loop is chosen from the stiffness so the worst case (40 beads,
  ×4, 880 Hz) stays stable. Pitch checked against the beaded-string formula in a script
  (110 Hz at 12 beads; 220 at 40 beads ×4). Origin: a projected piece in the Denver Art
  Museum children's area; footage and a timestamped catalogue in `_CW/Beads Analysis/`
  (outside the deploy). Tab icon `art/icons/beads-icon-256.png`. Not yet heard on an iPad.
- **`maps/sea-level-bench.html`** — bench: **The sea, lower** (29 Sep 2026; Spec-Maps *Time on
  the map*, the first bench of it). The moving map on the North Sea and a slider from 20,000
  years ago to today; one line says how far down the sea was, from `stories/sea-level.json`.
  At 12,000 years ago Doggerland joins Britain to the continent; at 20,000 the North Sea is
  dry but for the Norwegian Trench. The ice is not on it yet, so ground that lay under the
  ice sheets at the low shows as bare land. Tested on the Mac and in the iPad simulator's
  Safari. Since Michael saw no map the same day: the map draws as soon as the world has
  loaded and the curve wakes the slider after, and a failure of either says so in words
  instead of leaving an empty space.
- **`maps/moving-bench.html`** — bench: **The world that moves** (27 Sep 2026; Spec-Maps
  *The world that moves*, the bench its prompt asked for). Six of Hokusai's events, hand-
  written with places and weights, on a `timeline.js` timeline over the world pyramid,
  opening on the corners of `japan-and-china`; a tap on the line slides the map to the
  place, the road to Kyoto fits itself, the strip resizes, the word resets. Nothing else on
  the page. Tested on the Mac in the built-in browser: pan, wheel zoom, resize, reset, the
  slide and the fit, tiles arriving without a blank, labels holding still during a pan,
  a zoom to level 5, and every story page still drawing its still maps. **Not tested on an
  iPad:** the simulator would not take injected touches this session, before or after a
  reboot — a tap on Safari's own new-tab button did nothing either — so the one-finger drag
  against the page scroll, the risk the prompt named first, is untested and waits on
  Michael's own iPad. The bench's marks carry their weights; the shared events and places
  files are untouched.
- **`maps/`** — bench: **Maps** (18 Sep 2026; `CWVault/claude/Spec-Maps.md`, the bench of
  its build prompt). A map is a still picture of the ground with the story's marks on it,
  and nothing else. Two files here since 20 Sep, when `map.js` moved to `js/` (below, under
  *Folders*) because the Hokusai story called it — Michael's call, made that day. **`render.py`** makes one base picture into `art/maps/`
  (see the entry there): equirectangular with the standard parallel at the region's
  mid-latitude, three colour families as named constants at the top, none red and none
  green, warm at the bottom and cool at the top (the second pass of 18 Sep; the first was
  Hokusai's ramp, which painted Greenland the colour of desert and hid the vermilion in the
  mountains) — **land** `#e6dfcb` at the shore (one step under the page's `#f4f1e8`),
  `#d8cdaa` at 250 m, `#c3ab80` at 800, `#a89a80` at 1 600, `#8f8d90` at 2 400, `#aeb0b8`
  at 3 200, `#e8ecee` at 4 800, `#f2f5f6` at 6 000 (the spec's 4 200 and 5 400 lifted by
  600 m, because at 4 200 the whole Tibetan plateau came out white and read as an ice
  sheet); **ice**, by surface height, `#dfe7ec` at 0, `#eaf1f4` at 1 200, `#f6fafb` at
  3 000; **sea**, Hokusai with the floor lifted and, since the third pass (20 Sep), stopping short
  of paper: `#22415f` at −9 000, `#33699a` at −4 000, `#5793b4` at −800, `#7fb0cc` at −150,
  `#93bed7` at the shore; hillshade from 315° at 45°, multiplied at
  `HILLSHADE_STRENGTH = 0.35` over land and ice and half that over water, flat ground left
  exactly its colour, heights times the region's `--exaggeration` before the slope (3 for
  `world`, 1 otherwise; recorded in the JSON). Contours at `--levels` (0 and −200 by default)
  traced with contourpy, simplified, and written into the JSON — see `art/maps/`. The
  longitude/latitude-to-pixel conversion is one named pair, `to_pixel` and `to_lonlat`, the
  seam a map lab with a globe would replace; `map.js` carries the same pair as
  `cwMap.toPixel` and `cwMap.toLonLat`. Needs numpy, scipy, h5py, Pillow and contourpy;
  reads the netCDF through h5py so the whole grid never sits in memory. **`../../js/map.js`** (was beside the bench until 20 Sep) — `cwMap(container, region, marks)` puts
  the WebP in the box and an SVG over it; the SVG's viewBox is kept equal to the box's
  rendered size (a ResizeObserver redraws), so everything drawn is in screen pixels
  whatever the picture's width. **The lines** (third pass, 20 Sep): the region's contours
  are drawn on every map, under the marks and over the picture, the coast `#4a4336` at
  55 % and the shelf edge `#2f5c78` at 30 %, one pixel with `vector-effect:
  non-scaling-stroke`, so a window map at 380 px has the same crisp coast as the flow map
  at 700. Not an option; the earth's, not the story's. **The labels** (same pass): ink
  `#2a241c` everywhere; under every label a translucent halo, `#f4f1ea` at 70 %, three
  pixels, round join — built as a separate layer of stroked text under all the glyphs, not
  an opaque stroke, so one label's halo never fogs its neighbour and it reads as air, not a
  slab. 15 px for a place the story names (4 px vermilion dot), 13 px for a lesser one
  (`minor: true`; 3 px `#8a8378` dot), 15 px italic for water (a `note` with `water: true`);
  `lit` keeps the copper dot. **Placement:** each label tries eight positions round its dot
  (a note nine, centre first), throws out any that overlap a placed label or the map's edge,
  and of the rest takes the calmest ground — the standard deviation of the picture's
  luminance under the box, read once from a 400 px canvas copy — with crowding by other dots
  and the preferred order as tie-breaks; a mark's own `side` wins whenever it fits (the
  story chose it), and a label that fits nowhere is dropped rather than overlapped (Lake
  Biwa beside Kyoto, in the session's test). Places the story names are placed before
  lesser ones. Four marks and no others:
  `place`, `path`, `region` (a wash at 18 %, `wash: 'grows'` green `#33663f` or `wash:
  'made'` violet `#5a4a8c`, no third; green if the mark does not say), `note`; a path is
  `#c84830`. A place
  with text toggles a paper-ground block on tap; with a story, navigates; with neither,
  nothing — no cursor change, no hover, no animation. `reset()` hides the blocks.
  `cwMapWindow(region, marks)` opens the same map at 380 px (the story stage width) in
  Glass Geometry's picker window copied line for line — invisible backdrop that closes it,
  the drag handle with *close* at its right, the 200 ms fade — except that the handle
  listens to pointer events so a finger can drag it too. `cwMap.load(url)` fetches a
  region's JSON and resolves the picture beside it. **`map-bench.html`** — the three cases:
  the world in the flow with Tambora, western Europe in the flow with London, Lake Geneva
  and the road between (by Dover and Strasbourg), and the name Tambora in a sentence
  opening the window. Tested in the built-in browser at 700 and 375 wide: text blocks
  toggle, the window drags and closes, no console errors. **Not tested on an iPad.**
  The third pass was looked at on all three regions at 700 px, in the window at 380, and on
  the Hokusai story's own Japan map: the coast is visible at both sizes; the shelf line on
  the world map reads as the drowned edge of each continent rather than a mess, though it
  is busiest round the Arctic shelves and the Sunda shelf, where it is also true; every
  label read over land and water; Japan's coast reads against its shelf.
  Decisions the spec left to the session, taken and named: a tap target of 14 px round
  each dot that has something to give (a 4 px dot is not a finger's target); a path's
  waypoint that is not a marked place is written as a `[lat, lon]` pair (the gazetteer
  belongs to the story build); the caption line under a flow map is the page's prose,
  not `map.js`'s; `map.js` stayed beside the bench until a story called it, and moved to
  `js/` on 20 Sep on Michael's call. Consequences of the source, not fixed: lakes are land
  (the grid carries their surface height, so Lake Geneva is a dot on paper, not water —
  Natural Earth would draw it, per the spec's *if we ever want them*); the Ross and Ronne
  shelves are white over water, which is what they are; Greenland's coast is speckled
  where 20 km pixels average ice-free fjord mountains with the sheet; the Tibetan plateau
  is pale grey-white at 4 500 m even with the white stops lifted, because it is as high as
  an Alpine summit and the ramp says so.
- **`trace.html`** — bench: **Trace.** A road on parchment, a copper dot that follows her
  hand through a transform, a rule for what counts as a mistake, and a counter that says
  nothing until asked (`CWVault/20-SPECS/Spec-Trace-Bench.md`; v0 of it, 11 Sep 2026).
  One file, two doors. **Lab door** (`trace.html`): words in the left panel by the
  Marauder's Map rule — road (square · Z · O · H · star), rule (channel · path), mirror
  (off · left-right · up-down · both), trails on/off, clear (only while there are trails),
  graph (only once there is an attempt), again (only from the graph). **Story door**
  (`trace.html?door=story`, or a page holding the file in a frame and calling
  `frame.contentWindow.CW.trace.open({road, rule, mirror, attempts, words, line,
  onattempt, onreveal})`): no panel, the set counted as "trip 3 of 10", graphs hidden
  until the set is done, then only the words the story exposes; the page posts its height
  to the parent so the frame fits. An HTML file can be included by another page no other
  way; the alternative — the engine as `js/cw-trace.js` — is Michael's call and is not
  taken. Roads are data in a unit square mapped onto the prototype's 316 px star, on a
  380 css px stage kept exactly so the prototype's finger evidence carries. An outline
  road's channel is the band between two inward-offset outlines (Milner's star; the
  square); a path road's is a band about its strokes (Z, O, H). Closed roads finish when
  80% of the length is travelled and the dot is back at the start (the prototype's rule);
  open roads (Z, H) when every sample of the road has been passed within a track width —
  a rule the spec does not give and this build chose. One collision per excursion. Trails
  in Chartres glass colours, one per attempt. Three graphs — bumps, seconds, length in
  roads — blue line, copper points, a copper series for attempts under a different
  transform, a hollow point at 0 for the last attempt of another day. Record
  `cw.trace.v1.<road>` in localStorage, `{date, attempts:[{collisions, ms, length,
  mirror, rule}]}`; the prototype's `cw.mirror-star.v1` is translated once if found.
  Calibration numbers, and what has and has not been tested, are in the header comment:
  **not yet run with a finger on an iPad** (the building session had no device); every
  road, mirror and rule verified by synthetic pointer drives in Chrome, including the
  reveal, the copper series and the hollow point. Track width unchanged at 6%.
  Standalone; does not stand on the plane. `CW_VERSION 2026-09-11 51d9bb0` (first
  commit 11 Sep; stamped per the standing method).
- **`story-learned-without-knowing.html`** — story: **The Man Who Learned Without
  Knowing**, the story-door route (text: `CWVault/claude/Story-The-Man-Who-Learned-Without-Knowing.md`).
  **Superseded on the home page 14 Sep** by `active/the-man-who-learned-without-knowing.html`,
  which carries its own star and brain; kept here, noted on the experiments index. Was
  the first story page in the deploy and the first caller of Trace's story door: the star in
  a frame in the left panel, ten trips, then *again* / *without the mirror* / *show the
  star*, and the word *Brain* arriving only after the reveal. Ported 11 Sep from the star
  prototype, which is retired to `../outdated-files/trace-prototype-star-story-20260911.html`
  (built 11 Sep by a chat session; never committed, never served). The Brain block is the
  prototype's inline drawing — the outside painting as base64, most of the file's 369 KB —
  until the Brain bench (`Spec-Brain-Bench.md`) replaces it with `CW.brain` calls.
  Narrative unchanged. `CW_VERSION 2026-09-11 51d9bb0`.
- **`timeline-bench.html`** — bench: **the Timeline Intro.** Every dated story's title
  card: a copper dot leaves year 0 ("after the ice", 10 000 BCE) and rolls up to the
  story's year in about ten seconds, leaving events behind it. Three tiers — a fixed
  full-span line that never rescales, with an odometer above it; a road drawn in
  perspective in four passes whose year-scales are computed from the destination
  (8:4:2:1) and which take as many events as they have room for; and the story's own
  lead-up strip, drawn after the landing. Tap the road to pause, tap any event for its
  paragraph (beside the far passes on a wide screen), *run it again* for a fresh draw,
  *your line so far* for everything it has ever shown her (localStorage). Five
  destinations. **Reads `../stories/after-the-ice-events.json` (since 27 Sep; it was
  `stories/events.json`) and adds 10 000 back to its astronomer's years — the page holds no
  events**; since 28 Sep a BC year is 10 001 less the year after the ice. `CW_VERSION
  2026-09-28 ffd1c54` (the 27 Sep commit carried a placeholder stamp, `ati-data`). Retired except for the run, the odometer and
  the road, which `after-the-ice.html` took over; the pool
  and the story graph are to be one database. Dates written `11 752 after the ice (1752)`
  with commas for now — the March date convention and `Spec-Timeline-Graph.md` §2 disagree
  and the spec reports it; adopt `js/cw-number.js` before this leaves experiments.
  First commit 8 Sep (`433c148`). Spec:
  `CWVault/20-SPECS/Spec-Timeline-Intro.md`. Stands on nothing shared; standalone.
- **`after-the-ice.html`** (27 Sep 2026) — bench: **After the Ice on the moving world.** **Hung 28 Sep 2026 on Michael's word: now `active/after-the-ice.html`**, with a `_redirects` pair from this address and a line in `stories/gallery.json` (the drawn mark `art/icons/after-the-ice-icon-a-256.svg`, frame Payne's grey `#3C5C83`, width 8, medium; the frame colour is Claude's choice, the Story's frontmatter left it TBD); `CW_VERSION 2026-09-28 8cf4513`. The entry stays here with the other benches' record.
  Twelve thousand years and the whole earth, no story text. Three lines and the map, per
  `CWVault/claude/Spec-Maps.md` *After the Ice, on the moving world*: the top line is the
  whole span, never rescaled, with a **window** on it — a pale band she drags, or drags by
  either end (a pointer gesture on that line only; nothing else there answers) — and the
  September odometer above it reading the window's left edge, a plain year beside it in grey
  once the window is 1 000 years or narrower; the September road redrawn to the window's
  span, a picture and not a control, each pass taking as many events as it has room for,
  heavier first and then the scarcest kind; the World line from `js/timeline.js` with the
  world pyramid from `js/map.js` under it, span bound to the window, opening on the whole
  world, every event in the store (127 after merging), at most three label rows. Opens with
  the September run (ten seconds, tap to stop), then the window appears over the whole span.
  The other two openings are words in the page's data, unused. `ICE = 10000` is the line's
  zero, one named constant. Reads `stories/after-the-ice-events.json`,
  `stories/world-events.json` and `stories/places.json`, merged at load, writes none; a
  shared record with no `precision` counts as `year`, and a record marked `same` stands aside
  for the one it names. Her line: the September bench's `cw-after-the-ice` ids plus every
  event she taps here; *what I've seen* filters the World line and map to them and back.
  Layers by year: no last-glacial-maximum layer exists in `art/maps/` yet (the pyramid has
  today's ice and vegetation), so the map keeps today's ground; the page looks for a layer
  named `ice-lgm` and notes its absence in the console.
  **28 Sep, Michael's first use:** called *After the Ice* (title and index); the introduction
  from `CWVault/claude/Story-After-the-Ice.md` above the lines as story text, in the 700 px
  column ("mark" is written *dot*, what the bottom line draws; "between the line and the map"
  kept, since the panel sits there); the count 22 px bold on one line with *years after the
  ice*, and the gaps above and below the road closed up (road 232 px); each end of the window
  has its own hold reaching 16 px past the window's edge and past the line's end, so the right
  end can be taken with the window at full span, and at least 12 px of middle moves it however
  narrow; *What I've seen* is a word at the right-hand end of the panel's date line (or of the
  hint while nothing is selected), put back each time `timeline.js` rewrites the panel; the
  panel has no heading, the label is its first sentence; dates known to a decade, century or
  millennium are written round on both sides (*about 3,000 (7000 BC)*). Tab icon
  `art/icons/after-the-ice-icon-a-256.png`. `CW_VERSION 2026-09-28 ffd1c54`. Listed in
  `experiments/index.html`, pointing at its `active/` address since it was hung.
- **`ruling-bench.html`** — bench: **does multiplication care how the grid is
  ruled?** The second of the review's step-3 benches, companion to
  `multiply-bench.html`, which stays the authority for everything the two share.
  A rectangle on the shared plane and, under it, a ruling she **steps**: each
  axis shows one word with a step to either side — ‹ Thirds › — walking Units,
  Halves, Thirds, Fourths, Fifths and on without end, the words becoming 11ths,
  12ths past Tenths. **Nothing is special about ten**, which was the last place
  base ten was privileged here. **Split** unlinks the axes; the finer step
  stands down at the pixel floor, which moves with the zoom, so the answer is
  always *zoom in and there is more*.
  **The rectangle is a true size, not a count of pieces** — two exact rationals
  that do not change when the ruling does. That separation is the whole design:
  the ruling is a lens laid over a thing rather than the terms the thing is made
  of, which is what lets a ruling fail to measure it. **Any ruling is settable
  and the fit is something she sees**: when the ruling does not measure a side,
  the pieces at the far edge are **cut short — real glass cut at the boundary,
  filled and leaded, never a thin line** — and the count along that side does not
  come out whole. Nothing is disabled, nothing announced.
  **The readout is one line, on release:** `10/3 × 6/4 = 60/12` — **x before y**,
  matching the pane address (column, row); the sides as their rulings counted
  them, unreduced. It is absent while a finger is down and
  absent while the ruling cannot count both sides — there is no whole-number
  multiplication to state and a rounded one would break *never more precision
  than the act showed*.
  **The restack is division as regrouping, and it happens IN PLACE.** The wholes
  are already standing in the rectangle, so it finds them rather than rebuilding
  them: the ⌊w⌋ × ⌊h⌋ unit squares grid-aligned from the origin outline where
  they are, one seam a beat, **nothing moving**. Only then do the leftovers
  travel — the top strip, the right strip and the corner gather and pack into
  new squares laid along the top edge for ↑ and the right edge for →, each
  closing as its pieces complete it, plus a partial whose seam stays so its
  missing pieces are plainly absent. `10/3 × 6/4`: three wholes stand in the
  bottom row, 18 + 4 + 2 leftover pieces close two more along the top, and the
  line reads `60/12 = 5`. Only when the regrouping finishes does the second line
  appear, and it performs no arithmetic — the count is exact by construction,
  since ⌊w⌋⌊h⌋ + ⌊leftover/Q⌋ is ⌊area⌋ for every rectangle. **Both directions
  land on the same answer**, which is the point of there being two.
  **The camera** follows only when the composition outgrows the view — a picture
  already in front of her is left where she put it — marks the answer above the
  composition, holds it long enough to read, and then goes Home. The mark is
  **sized against the unit square, not the composition** — a mixed answer comes
  out almost exactly one unit wide at any zoom, in the plain face rather than
  bold; a short answer caps instead, since stretching a lone digit to a full unit
  would want a 180px face. No restack
  finishes off screen. Her hand outranks it: a touch stops the follow. The arrows stand down when the ruling does not fit
  (a cut piece cannot become part of a whole square) and past 600 pieces
  (the animation is the counting, and nobody counts six hundred of anything).
  Dragging from the 1 at any time starts over.
  Numbers throughout are `CW.num`'s. Its six bench questions are at the top of
  the source, along with the three readings the prompt left to the build.
  Stands on `js/plane.js` and `js/cw-number.js`; shares no other code with the
  Multiply bench, and the header names what to extract when a third bench wants
  it.
- **`multiply-bench.html`** — bench: Multiply, alone, on the plane. Step 3 of
  `CWVault/01-ACTIVE/Review-Glass-Aug26.md`'s order of work — one file per tool,
  standing on `js/plane.js` and nothing else, with **no table code**: no panes
  keyed by number, no modes, no Build, no Properties, no Fill, no prime colour,
  no sound, no log. The opening state is the plane as Geometry draws it plus one
  white unit tile at the origin, the 1, with its numeral. The grammar is the
  walk's (`01-ACTIVE/Walk-Glass-Aug26.md`, steps 1, 2 and 6): touch the 1 and
  drag to multiply, touch anywhere else to pan, pinch or wheel to zoom, and
  **tap a placed tile to see the rectangle that minted it** — the still half of
  *the mark is the memory*; the animated replay waits for the operation log.
  During the drag the 1's glass stretches — outline and transparent fill — with
  the twin riding across the diagonal at `TWIN_FAINT`, the live width and height
  centred on their own sides inside both rectangles so the twin reads the same
  two numbers exchanged, and no product anywhere. On release only the far-corner
  tile of each rectangle remains, with the product written on it at the moment
  of placing: one tile on the diagonal, two off it. Tiles persist; a place gets
  a tile once; **Undo steps and Clear sweeps**, and **Home** returns the view to
  the greeting; each word fades when it has nothing to do. **Hide duplicates
  keeps the lower tile** — width ≥ height, whichever rectangle her stroke drew —
  so what is left is one tile per unordered pair of sides, 55 of them in a
  10×10, and a stroke above the diagonal leaves its mark mirrored below it.
  Colour says one thing and it is **which side of the crease**: squares keep the
  unity white, everything else is grey on the declared base `#DCDCDC`.
  Resolution is zoom and there is **no grain control** —
  the finger snaps to whatever rung of plane.js's 1–5–10 ladder is on screen,
  and products are carried as exact integer-over-power-of-ten, so 1.3 × 2 reads
  2.6 and never 2.6000000000000005.
  **The four questions it was built to be looked at for are at the top of the
  source**, with the constant that moves each one named beside it. A fifth
  arrived unbidden on the first drive and is recorded, not patched: plane.js
  draws a lattice rung only above 40px spacing, so **tenths exist only above
  ~400px per unit**, and at that zoom a stroke from the origin reaches x ≈ 2 on
  an iPad. The walk's own illustration, 6.3 × 2, needs ~2 500px of run and is
  unreachable on any targeted screen — reach and refinement pull opposite ways,
  and the walk's step 3 already says it is *division*, not multiplication, that
  puts tiles between the lines.
  **Second pass, 1 Sep, from Michael's own bench pass** — six changes, three of
  them reversals, all recorded in the file's header and in that commit: hiding
  duplicates now keeps the lower tile rather than the one she drew; the tiles
  split into white on the crease and grey off it; the reserved tap gained its
  still body; and Home, Clear and newest-numeral-under-oldest arrived. Two
  things the pass did not foresee are left standing rather than patched: with
  duplicates hidden, tapping a mirrored mark shows a rectangle she never drew
  (changes 1 and 6 meeting), and Clear takes the undo ledger with it, so it is
  the one act here with no way back.
  **Third pass, 1 Sep** — Michael found a coarse-grain tile swallowing the taps
  of the fine tiles inside it, and only their numerals showing through, not
  their outlines. Both were the same cause: paint order and hit test were keyed
  to *when* a tile was made, when what she can see and aim at is decided by
  *how big it is*. **One comparator now drives both — largest first, and among
  equals newest first, so the smallest and the oldest finish on top** — which
  keeps his newest-under-oldest rule where it applies (equal-size numerals
  crowding at zoom-out) and extends it to nesting. Glass and came travel
  together, so a buried tile keeps its cell and not only its name. Two more from
  the same pass: **a tap inside the 1 now reaches the tiles she has built there**
  at a finer grain — the multiply gesture claims that whole square, so a
  zero-length drag on it falls through to the tap, while the 1 itself still
  answers nothing — and **the two side numerals moved to the top and right
  sides, bold, at the size the product will be written at on the corner cell**,
  because on the bottom and left they sat against the plane's own axis labels
  and were read as those. Standalone otherwise; deliberately not deployed into
  `active/` and not linked from the main index.

- **`number-theory-v1.html`** — multiplication and division as rectangles on a
  pannable number plane. **The behavioural reference for the extracted plane** — y-up,
  `viewW/viewH` caching, and a single `labelStep()` driving both labels and grid lines,
  which is why its texture stays coherent under zoom.
- **`canvas-panes.html`** — bench: can canvas carry leaded panes of layered glass while
  panning and zooming? Pane counts 10/16/24/32, glass detail full / flat / came-only,
  auto-stress. **Passed** — 32×32 is 1024 panes and 3840 pieces at 2.4 ms p95, 14% of
  the frame budget. It reports *draw time against the budget*, not frame rate: frame
  rate is vsync-clamped and reads 60fps until it reads 30, so it cannot fail and is
  useless as a gate. Any future performance bench should measure the same way.
- **`fills-and-light.html`** — bench: two declared palettes, a resting one and a lit one,
  rather than one degraded. Both derived from the workshop's declared colour in OKLCH so
  hue never moves, with out-of-gamut results flagged rather than silently clipped. All
  fifteen palettes from `../art/palette/palettes.json` are imported, plus the colours the lab
  ships today. Showing a set — or selecting a pane — moves those panes to the lit palette;
  nothing is dimmed. Glass is flat with directional striations and seeds; inner cames and
  the pane frame carry separate colour and weight; highlights are elliptical, brighter
  when smaller, and only some pieces catch them. Results in
  `CWVault/01-ACTIVE/Decisions-Fills-Aug06.md`.
- **`prime-glass.html`** — bench: prime colours across four workshops with ordered
  stripes and a monochrome toggle. With colour off and order the only channel, 6, 10 and
  14 render identical — so colour currently carries information rather than delight, and
  a second channel is required. Two candidates are in the bench. In progress.
- **`geo-1-glass-circles.html`** — **story: Stained Glass Circles**, Geo-1-Glass-Circles, the first of the
  geometry series (Michael's names, 8 Oct 2026: the series name is the file's, the gallery name is the
  page's title; `the-glass-rose.html` until then, the old address redirected in `_redirects`; the pictures
  moved with it to `art/stories/geo-1-glass-circles/` on 8 Oct, later; the icon and the gallery mark keep
  their `glass-rose` file names). Built 2 Oct 2026 from `template-story.html`, per
  `CWVault/claude/Prompt-Build-The-Glass-Rose.md`; Publishing-a-Story stage 2, at its own address and hung
  nowhere. **8 Oct 2026, Michael's rulings on the 7 Oct build (`glass.js?v=2026-10-08`, stamp `2026-10-08
  5ffb77e`):** the text is his draft of 8 Oct (`_mscVault/0. Current/Designing Glass with Circles.md`),
  which puts the board after "Give it a try." and the counts after the board, adds the pale-green clear
  glass and why (sand, wood ash, iron), and names the leaded-glass picture on the left; the same slips of
  the pen corrected as on 7 Oct (he thanked the correction), plus "so thin, that" → "so thin that", "it had
  a built-in eraser" → "has", "laid it out" → "laid out", "click" → "tap"; the numbers left as he wrote
  them, on his word (they give a sense of how fast the options grow). *Theophilus's World* is back below
  the counts, the 2 Oct build's data unchanged, because he says a timeline and map come below; a *More*
  on each event is not built (`timeline.js` has no More; the Time Machine's is its own page's). The
  board's new rules are the module's (the `js/glass.js` entry, 8 Oct). Theophilus's World's event texts
  are the 2 Oct build's, not his. **8 Oct, later — the left column (Michael's asks of 8 Oct; built, uncommitted):**
  two picture stacks (`figure.margin.stack`: pages piled with their edges showing, a tap sending the top one to
  the bottom, the caption following the top; the pile's shape per stack in `--pile`; one script serves every
  stack). *The book itself*, beside the first paragraph: five pages from the three oldest copies, read off
  their red headings against the Latin (Bibliotheca Augustana's text) — Wien ÖNB Cod. 2527 f. 1r (the
  "Theophilus, who is also Roger" line; the Augsburg scan, 480 wide, the codex not digitised), Wolfenbüttel HAB
  Cod. Guelf. 69 Gud. lat. 2° ff. 86r and 89v (the library's own scans, Public Domain Mark, 1024 wide, cropped
  to the page: images 00179 and 00186), London BL Harley 3915 ff. 9v and 19r (the Augsburg scans; the BL's
  images offline since 2023). *Examples*, beside "For your design, all you need are circles": Michael's three
  windows made on the board (`made-rose-ii.png`, `made-bird.png`, `made-candle.png`, his postcards cropped to
  600 px). *The lead*, a stack of two: real came on top (`canterbury-came-1200s.jpg`, a Canterbury Cathedral panel of
  the 1200s lit from inside with flash so the cames, the soldered joints and the iron rods show; Wikimedia
  Commons "Canterbury Cathedral 012 window showing leading and support", TTaylor 2005, public domain; 1200 ×
  1600 served at 900), and under it his photograph of a stained-glass bird (`bird-copper-foil-and-solder.jpg`,
  copper foil and solder, said so in the caption). The Five Sisters was too far away to show a join; its file
  stays. The captions are drafts for Michael's voice pass. The World's eighteen events are listed with their
  full texts for the story-writing chat in `CWVault/claude/Events-Theophilus-World-To-Write.md`. **Rewritten 7 Oct 2026 to Michael's new draft**, a story about making windows and not about
  geometry: the board is the module's window profile (`app: 'window'`) where the story says "Your board is
  below", three-quarters of the window's height; one margin picture, leaded glass (the Five Sisters); no
  More and no World in this draft, so the Notre-Dame rose and Villard's page are not on the page (the files
  stay in `art/stories/geo-1-glass-circles/`, the folder `glass-rose/` until 8 Oct) and *Theophilus's World* is out, its data still in the story file and
  the shared lists. Slips of the pen in the draft corrected and listed in the session report; the story's
  count of 6,548 locations is the draft's — the lab's own crossing rules give 3,954, reported, not changed.
  Stamp `2026-10-07 cf25ae5`. *The 2 Oct build, for the record:* The first story of the geometry series and the door to the circles level of Glass Geometry
  (`Geometry-Spine.md`, step 1). `placement: across`: the table is `js/glass.js` mounted at level `circles`
  with the rose ready (`open: 'Rose'`, Chartres palette), in a host at the shell's width and three-quarters of the
  window's height (full height was asked, but the lab takes the wheel and the finger, and with the table
  filling the window the page could not be scrolled at all), directly under the date line; the lab's own column and words are the lab's and the page adds
  none; no left column on the page. The words are Draft 10's, word for word (the Save paragraph still
  names *Postcard*, which left the Save panel the same day — reported, not changed). Pictures, each with its
  source beside it in the page: the north rose of Notre-Dame at full width as a `still` (Wikimedia Commons,
  Ibex73, CC BY 4.0, 1920 wide, 742 KB; the caption says it is not sixfold), Villard de Honnecourt's geometry
  page as a margin picture (BnF, public domain, 1280 wide), the Five Sisters window as a margin picture
  (Wikimedia Commons, Stch2022, CC0, 900 wide). The York floor stack is left out for want of a licensed
  file and named in a comment where it would go; the story's sentence about it stands. *Theophilus's World*
  on the moving world, 1079 to 1365, the craft above the line and the world below, no far-away cards;
  Adelard's route draws solid, because `timeline.js` has no dashed route. Pictures in
  `art/stories/geo-1-glass-circles/` (`glass-rose/` until 8 Oct); the gallery mark `art/gallery/the-glass-rose-gallery.png` and the tab icon
  `art/icons/the-glass-rose-icon-256.png` are the rose drawn as a mark (seven circles, copper dots), not
  in `gallery.json`. Stamp `2026-10-02 cf25ae5`.
- **`glass-circles.html`** — experiment: **Glass 1: Circles** (2 Oct 2026, from the prompt Michael's chat wrote;
  awaiting his look). The one `js/glass.js`, mounted at level `circles` with two powers no level owns yet:
  `fill: 'tap'` and `measure: true`. **Tap to fill:** with Color open and a colour chosen, a tap inside a
  closed shape colours it, lead round it, as one `fill` op in exactly the record `checkAndFill` writes, so
  the renderer, replay, save, the picker and the harness read it unchanged; no lead is laid and nothing
  lifted. A tap inside a pane recolours it; a tap in open ground undoes, as it always did, so a wrong pane is
  one tap away from gone; a tap on an arc at this page lays no lead and starts nothing (an arc belongs to two
  shapes); a tap on a point starts a circle. The shape under the tap is found by `findFaceAround`, beside
  `findClosedRegionEdges`: a walk of the arrangement's arcs and segments keeping the shape on the left, the
  edges at a vertex in tangent order with curvature breaking a tie, the nearest edges tried in turn; a
  circle nothing crosses is its own candidate (one arc, sweep 2π); the smallest shape holding the point wins.
  Checked in Node through the harness (`tools/glass-face-tests.js`): the rose's six petals and six curved
  triangles, a tap just off the centre with its twelve arc ends, a lone circle, open ground, the vesica, two
  touching circles, a ring and a square of segments. A ring's fill covers the inner disc and the smallest-on-
  top order hides it, the same temporary fix as overlapping fills; no region subtraction. On a pointer
  device with a colour chosen the cursor is `art/icons/ring-cursor.png` (17 px, hotspot 8 8), falling back to
  the crosshair. **The circle measured as it is drawn:** a thin radius from the centre towards the hand, the
  snap point once snapped, with *radius ≈ 0.87* beside it (*radius: 1* for a whole number of units) and
  *area ≈ 2.36* inside near the bottom when there is room; units are the plane's; numbers through `CW.num`,
  rounded only at the ≈; render hints like the ghost, gone on release, never in the log. The two tips say
  so (candidate words, voice pass): Circles gains *To colour a shape, tap Color, choose a colour, then tap
  inside the shape.*; Color's first line is *To colour a shape, tap a colour, then tap inside it.*
  Opening Color chooses no colour, so the tip says choose. `?v=2026-10-03` on the four pages that load the
  module; `?v=2026-10-03b` the same day: a trackpad pinch in Safari arrives as a gesture event and zoomed the
  page whole, plane and window together (Michael's look; the committed lab did the same) — the canvas now
  claims it and zooms the plane by its scale, ignoring the wheel while the gesture lasts. Stamp `2026-10-03 cf25ae5`.
- **`glass-module-bench.html`** — bench: **Glass Geometry as a module, mounted twice** (1 Oct 2026; the
  extraction prompt's proof). Two boxes of ordinary size on one page, `js/glass.js` in each: the left at
  level `circles` with the rose ready behind a word of the bench's own (*Play the rose*), the right at
  `both` with the Gaudí palette asked for. What it shows, checked headless at 1440 × 1100 and 390 × 844: the
  two do not interfere — separate canvases, logs, undo, panels; the tip window, the picker, the colour
  window, the replay panel and Remember stay inside their box; Cmd-O raises the picker only in the box
  last touched; the page's own type and colour below the boxes are untouched; both read one library. The
  construction sits small in a 640 × 480 box because the plane keys its default zoom to the host's
  size, as it does to the screen's. Listed in the experiments index. Stamp `2026-10-01 3d3b607`.
- **`map-reveal.html`** — bench: the map reveal. The grid of the visible window
  constructed by compass and straightedge — full circles only, the lab's own
  vocabulary — with knobs for duration, legible opening and acceleration, tap-skip,
  and a deep-zoom mode where the tenths construct themselves. Settles the reveal's
  tempo by looking (`CWVault/01-ACTIVE/Decisions-Controls-Aug12.md` §8, §11, §15:
  content is never compressed, only time). Standalone; does not stand on the plane.
- **`fog-map.html`** — sketch: every pane shaded by the rank of its largest prime
  factor, white at 2, saturating at the 256th, panning to a million. A *magnitude*
  viewing rather than a factor-reading one — it asks how big, not which. Standalone: it
  does not stand on the plane and is not the port. Listed in `experiments/index.html`.
  Seed: `CWVault/03-SEEDS/smoothness-fog.md`; ruling it provoked:
  `CWVault/01-ACTIVE/Decisions-Fog-Aug12.md`.
- **`pi-beads.html`** — how many beads fit around a circle; circumference ÷
  diameter, with past measurements kept.
- **`prime-tones.html`** — listening bench for the primes 11 and 13: four candidate
  schemes played against the four the lab already has. Settled the octave question
  (`CWVault/01-ACTIVE/Decisions-GlassMult-Aug03.md`). Whether it belongs to the Sound
  Series or stays interface work is open.
- **`clinks-triangular.html`** — triangular numbers as people arriving, leaving,
  and clinking glasses.
- **`necker-brain-map.html`** — the path a Necker cube flip takes through the
  brain, drawn as a station map. Uses
  `../stories/necker-cube/brain-watercolor.jpeg`.
- **`sound-workbench.html`** — bench for auditioning gesture sounds, feedback
  sounds, pitch and ratios.
- **`cursor-modes.html`** — what the pointer becomes for each gesture.

#### experiments/sound-benches/

The Sound Series, kept together since 31 Aug: three benches on one idea — that a note
is a fast rhythm — sharing a vocabulary, each correcting the one before it. Listed from
`experiments/sound-benches/index.html`, which the main experiments index links as a
single entry. **A bench belongs here** if it stands on that idea and shares the
vocabulary; anything else stays a level up. The three moved with `git mv` from
`experiments/`, where they had been live, so `_redirects` keeps the old URLs working.

- **`strobe-and-stars.html`** — bench: a loudspeaker edge-on under a strobe. The cone is one
  bar between `{` and `}`; the strobe runs at the bottom note, so that note freezes and is the
  reference. A voice at `n/d` visits exactly **d** phases and the flashes joined in order draw
  a polygon or star polygon `{d/(n mod d)}` — 7:5 is a pentagram, 45:32 is a mess.
  **Above each window is the circle the bar is the shadow of**, with drop lines: circular motion
  projected, which is a sine wave's content with no sine wave drawn. The shadow loses phases
  that `sin` maps together, so captions read "4 places · 3 shadows" — the even-denominator
  collapse is labelled rather than hidden. A tuning switch (true fraction ↔ equal temperament)
  **fills the gap that has been open since 25 Aug**: on a true ratio every figure closes and
  freezes; on the keyboard's version nothing closes and the figure creeps at `|q·f − p·S|`
  per second, which is the beat rate — 0.68/s for a tempered fifth at 200 Hz, matching the
  audible throb to two decimals. Additive tones (5 harmonics per voice) so the beat is audible
  while the drift is visible. Two or three voices; the triad shows the collapse plainly.
  **Carries its own warning in the reading**: this is a picture of the arithmetic, not of the
  sound — 7:5 and 45:32 look nothing alike and are indistinguishable by ear. Standalone.
  Design: `CWVault/01-ACTIVE/Sound-Counting-Bench-Aug25.md`.
- **`scale-from-a-rhythm.html`** — bench: a whole major scale as one rhythm. Eight click
  voices at **24 : 27 : 30 : 32 : 36 : 40 : 45 : 48** — the just major scale over a common
  denominator — with a speed knob, per-voice toggles, the brightness and click-pitch controls
  shared with `six-against-five.html`, and a walk mode stepping one voice at a time so the
  scale sounds as a scale. Presets isolate the three 4:5:6 triads (24·30·36, 32·40·48,
  27·36·45), which between them use all eight numbers and nothing else: **the scale is one
  chord planted three times.** A sieve strip of 24–48 marks which numbers are built from only
  2s, 3s and 5s; nine survive, and dropping 25 (under a semitone from 24, crowding it) leaves
  the scale exactly — **a sieve, not a list.** Two findings that were not designed in: the
  **floor readout** (gcd of the active voices × the unit) is a real note under any one triad
  and falls to ~8 per second under all eight, which is *a chord has a floor and a scale does
  not*; and with the bottom voice tapped onto a real key, the three scale notes containing a 5
  (5/4, 5/3, 15/8) are exactly the three that miss the keyboard by more than 10 cents while
  the 3-limit ones land within 2 — at the 15-cent lighting tolerance five keys light and three
  do not, so the argument draws itself. Lane colours are the odd primes of each ratio; the
  piano strip is shared with the sound bench and is **designer-facing**, the letter names
  deliberate and not the child-facing scheme. Standalone; does not stand on the plane. Design:
  `CWVault/01-ACTIVE/Sound-Counting-Bench-Aug25.md`.
- **`six-against-five.html`** — bench: does the ratio material survive being delivered as
  *counting* rather than as waves? Two click tracks at a fixed whole-number ratio, one speed
  knob from 1.5 to 330 per second. Below ~8 it is a countable rhythm, above ~20 a pitch, and
  the two numbers are the same the whole way; the track is ticked at both boundaries because
  the flutter between them is the finding. **Both voices lay down one identical click** and
  differ only in rate, so the tone at the top was never introduced — it assembles itself out
  of repetition. Seven ratios, 2:1 through 45:32. Three knobs: speed, **brightness** (a
  lowpass — now understood as the *roughness* control rather than a comfort control), and
  **click pitch** 400–4200 Hz, which was a buried constant at 1850 and is now choosable.
  A **piano strip** under the dot rows carries a continuous marker at each voice's exact
  pitch, lights the nearest key only within 15 cents, and reads both notes with cents
  deviation; tapping a key sets the slower voice and the faster follows by ratio. It is
  **designer-facing** — the letter names are deliberate and are not the child-facing scheme.
  Audio is a looping buffer rebuilt one full pattern long on every change, so nothing is
  resampled and no scheduler runs. **Carries its own reading below the bench** — the first
  extended sample of the child voice for this material, which is why this is one page and
  not two. Two short pieces sit directly under the instrument (*what note is that*, *what
  the picture is showing*); the long reading follows. Standalone; does not stand on the
  plane.
  **Revised the same day after a listening pass** (25 Aug) which disproved three claims the
  page had made with confidence: 7:5 and 45:32 are one sound about 8 cents apart, so simple
  fractions are *where* the sweet intervals are and not *why*; consonance is not the pair
  fusing into one note; and roughness lives in the partials, which is what brightness moves.
  A ringing at high brightness was a real defect — the click was truncated at the loop seam —
  and clicks now wrap around the buffer end. The reading was rewritten to match. Design:
  `CWVault/01-ACTIVE/Sound-Counting-Bench-Aug25.md`, `…/Sound-Rhythm-Roll-Aug21.md`,
  `…/Sound-Series-Aug08.md`.
  Open: no tapping, and whether 3:2 stays clean at full brightness on the fixed build.

## When a page is superseded

Move the old file to `../outdated-files/` and **keep its dated or versioned
filename** — that name is the archive record of when it was current. The
replacement takes the plain name in `active/`.

So `geometry-v1-20260325.html` stays `geometry-v1-20260325.html` in the archive,
while the version that replaced it lives as `active/glass-geometry.html`.

`../prototypes/` is staging — work that has not yet earned a URL. A prototype
becomes an experiment by moving into `experiments/` with a descriptive name.

Staged there now (9 Aug 2026): the Sound Series' two Jankó instruments,
`janko-lattice.html` (touch — twelve notes on two tiers, all one colour, home
chosen and marked) and `janko-midi.html` (the same lattice lit by Web MIDI,
Chrome only). Built 8 Aug, deliberately **not publicly reachable** until the
Series decides its opening; both are self-contained. Design and reasoning:
`CWVault/01-ACTIVE/Sound-Series-Aug08.md`.

`star-in-a-mirror.html` (moved here 15 Sep 2026, from `experiments/`, where it sat
untracked) — **Star in a Mirror**, the practice version of the story's puzzle: the star at
480 px, mirror left-right or up-down as words, a *turn* slider, trips and the two graphs.
Waiting for a practice area; the story's inscription already queues `mirror-star` for
one. Not served. Carries doctype, charset and viewport; no stamp and no icon yet — the
check will say so when it moves into `cw-deploys/`.

`brain/` (moved here 13 Sep 2026, from `experiments/brain/`) — About Your Brain's
workbench: `brain-outside.jpg` and `brain-inside.png` (Michael's two watercolours),
`brain-views.svg` (the overlay the atlas embeds), `check-outside.png` /
`check-inside.png` (the render checks), and `make_overlay.py` (edit the REGIONS tables
and re-run to move a region). Source material for a shipping app, so it lives outside
the publish directory; the icon it produced is `cw-deploys/art/icons/brain-icon-256.png`.
`build-sept12/` holds the 12 Sep cloud build scratch (`build.py`, the two page
templates) found 5 Oct still sitting public and untracked in `experiments/brain/src/`
— the 13 Sep move missed it; moved here, superseded by the shipped pages.

`glass-panel-build-aug24.html` (frozen 1 Sep 2026) — the 24 Aug panel build of
Glass Multiplication, `CW_VERSION 2026-08-24 e4cd030`, which sat uncommitted in
`active/` for a week and was never deployed. Frozen here rather than shipped:
`CWVault/01-ACTIVE/Review-Glass-Aug26.md` found it standing on two substrates at
once — the plane's tools (Multiply, Divide, Make a square, tiles from the origin)
on top of Phase 4's table rendering — and the 26 Aug ruling is **plane, table as a
viewing**, so the file as a whole does not port. What does port, and is the reason
to keep it: the **Building Numbers** rail on Geometry's *How this works* pattern,
the movable/resizable/closeable window component, the story windows with the
verbatim text of `01-ACTIVE/Stories-First-Set-Aug24.md`, the choice panel, and the
leftover grammar of Divide and Make a square. **It is not served** — `prototypes/`
sits outside `cw-deploys/`. Read it with `01-ACTIVE/Walk-Glass-Aug26.md` beside it,
which is what replaces it.

## The story template and its check (23 Sept 2026)

`template-story.html` is a CW story page with the words taken out: the shape, with comments
saying what to type and `DELETE` markers on everything to replace. Copy it to
`active/<slug>.html` and fill it in. Do not edit it in place, and do not build a story page
from scratch — formatting is meant to be inherited, not described. `Story-Pattern.md` says
why each part is the way it is; the template says what to type.

`tools/check-story.sh` checks the story standard, as `tools/check-deploys.sh` checks the
head standard. With no arguments it checks every page in `active/` that links
`css/story.css`; name a file to check one. It fails on: no `story.css` or no `--aspect`,
more than one `<style>` block, a missing title block, date line, opening picture, left-column
block or References, References before More, the left-column block not level with the
caption (a `tall` figure's block holds its caption, 27 Sep 2026), a tool's word not immediately before the paragraph that names it, a shelf copied
into the page, a World that does not use the shared event list, a picture or map file that
does not exist, and anything left over from the template.

25 Sep 2026: an opening that is a drawing rather than a painting (`data-opening="drawn"` on
`#plate`, first on Professor Necker's Drawing) has no magnifier, so the left-column block,
the note and the *Reset* / *Magnifier off* words are not asked for. A page without a sampler
still gets the `no-sampler` warning, which is true and harmless.
