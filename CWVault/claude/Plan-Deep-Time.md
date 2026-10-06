---
status: Proposed — 6 Oct 2026, written by Claude Code from the chats of 5 Oct (Desktop) and 6 Oct (Claude Code); amended the same day on Michael's word to carry true plate motion rather than a crossfade. A way to build, for Michael to rule on. Nothing in it is built.
role: How the deep-time Time Machine gets built — what exists to stand on, the one engine change, three rulings it needs first, seven stages each proved by a bench, the order, and the risks by name. Time-Machine-Shape.md says what the parts are; this says how they arrive.
related: Time-Machine-Shape.md, Spec-Maps.md (the engine), Spec-Map-Lab.md (the globe), Ideas-Ledger.md (Other labs, 5–6 Oct), 03-SEEDS/plate-tectonics.md, CW-Date-Convention.md
---

# Building the deep-time Time Machine

## What it is, in the shape's words

The shape page's test is "event, period, curve, layer or viewing". Everything here passes it
except one thing.

- **A viewing.** The earth line, 4.567 billion years to now, with the chunk tree as its
  structure and After the Ice as its bottom rung. The nested bar is the Focus window made
  recursive: a tier is a viewing of the tier above.
- **A layer.** The continents in motion: the pieces of continent as rings in today's
  coordinates, each belonging to a plate, and each plate's rotation through time, so that
  for any year the page turns every piece to where it was and draws it there. **Michael,
  6 Oct: true motion, not a crossfade of stills.** This is a new file shape, not the ice
  outlines' shape; a layer still, but the one layer whose rings move.
- **Curves.** Oxygen, the length of the day, the mineral count, the sun's brightness, the
  heat from inside; each a curve file with a band for how sure.
- **Events.** A deep-time batch in the store, with *earliest evidence* and a tail, and the
  place being where the evidence is today.
- **The one thing that is new: a second base picture.** The map's base is the pyramid of
  today's ground, and before a few million years there is no ground to lay a layer on. The
  globe is a second base. It is the one engine change the thread needs, it is for the lab,
  and the plan keeps it to one.

## What exists to stand on

| Piece | Where | What it gives |
|---|---|---|
| The Time Machine page | `experiments/time-machine.html` | viewings (zero, name, span, focus), Main and Detail, the Focus window, the handle driving `map.setTime`, the arrival run, curves drawn along the span |
| The line | `js/timeline.js` | events on a span; the symmetric stretch under an uncertain date, which the one-sided tail amends |
| The map | `js/map.js` | `setTime(year)`, `setIce` blending rings between ages, `setSeaLevel`, the layers over the pyramid |
| The store | `stories/timeline-events.json`, `tools/events-from-vault.py` | the astronomer's year with decimals, so −4 567 000 000 is already a valid year; events written from vault batches |
| Curves | `stories/curves/*.json` | a quantity by year with its source, licence and how sure |
| The globe plan | `claude/Spec-Map-Lab.md` | orthographic projection; coastlines in latitude and longitude drawn through it; drag-turns proposed, not ruled; Natural Earth outlines already downloaded |
| The mockup | the artifact *Deep time, nested* (5 Oct) | the chunk tree as data, the pull-down at three-quarter width with its two lines, the twitch for a bar that cannot open, dot-and-tail marks, a fog-graded globe stand-in — a sketch to read, not code to keep |
| The bench habit | `experiments/timeline-bench.html`, `time-passing-bench.html` | a page per thing to prove |

## Stage 0 — three rulings, before any code

*Ruled 6 Oct 2026, Michael: "the rulings as the plan has them." Recorded in Rulings-Sept-2026.md, *Deep time*.*

1. **The tree, and six chunks.** The chunk tree becomes a file, `stories/deep-time.json`:
   each chunk a name, a start and an end in the store's year, one *known from* line, a
   colour, its children, and its events by id into the store. Michael rules the cuts against
   the principle that a cut falls where the evidence changes kind (ledger, *Cuts where the
   evidence changes kind*), and whether the fifth chunk splits at 539 (ledger, *Six chunks,
   not five*).
2. **How a deep line counts.** Deep lines say *ago* only, in billions, millions and
   thousands of years; the ordinary (BCE) reading is absent; *years after zero* appears only
   on After the Ice and the lines below it. This resolves the line the Date Convention
   deferred ("deep time — a separate convention may be needed").
3. **The globe gesture.** Drag turns the globe, tilting for north and south and turning
   about the pole for east and west; drawing happens only with a drawing tool chosen.
   Spec-Map-Lab asked for this ruling by name.

And one number, provisional until the join is seen: **the seam is the ice ages, about 2.6
million years.** Below it the pyramid with the sea and the ice; above it the globe. The
pyramid's coastlines are honest through the whole ice-age cycle and roughly to a few
million years; by fifty million India is in the wrong place.

## The stages

Each stage is a bench under `experiments/` that proves one thing, checked at 1440 × 1100
and 390 × 844 as the Glass benches are. The data is the long pole and starts first.

**Stage 1 — The plate data, with the motion in it. Start now; licence-gated.**
*Done 6 Oct 2026, the same day, built and checked, not committed:* `tools/plates-from-gplates.py` and
`stories/plates/continents.json` (0.96 MB, 0.25 MB on the wire). 795 pieces at three-quarters of a degree,
416 plates, rotations every 5 million years to 540 and every 10 to 1000, kept only while a plate has a
living piece. The file's own arithmetic reproduces pyGPlates to 0.0065 degrees over 2,000 piece-ages;
India at 70 million years lands at 28° south; the drawn set at 200 million years is Pangaea with the
Atlantic closed. The licence needed no wait: the model is CC BY 4.0 and the citation is in the file.
Two things learned: the model's pieces overlap heavily (terranes inside continents), so on the globe
they are drawn as one fill, not outlined one by one; and the proof pictures' slivers at the poles and
the date line are the flat drawing's, not the data's — the globe has no seam.
`tools/plates-from-gplates.py`: with pyGPlates and the EarthByte model of Merdith et al.
2021 (open, CC-BY, to a billion years), write `stories/plates/continents.json` with two
parts and no stills:

- **Pieces.** The model's continental polygons as they are today, simplified to about a
  degree, each with its plate identity and the years it exists (a piece appears when the
  model first has it and is gone when it is consumed or merged). A continent that will rift
  is already two pieces that travel together until they part, so splitting needs nothing
  special.
- **Rotations.** For every plate the model names, its finite rotation sampled every five
  million years from now back to a billion — a pole and an angle relative to the model's
  absolute frame, the frame that gives latitude its meaning — resolved through the model's
  plate hierarchy by pyGPlates, so the page never has to walk the hierarchy itself.

The page then turns each living piece by its plate's rotation at the year, interpolated
between samples as a rotation (a slerp, not a straight line through the numbers), and draws
it. Target under a megabyte: the pieces are tens of kilobytes; the rotations are the bulk,
and five-million-year steps keep them to a few hundred. The fog grade per age, the source
and the licence ride along as a curve file carries them. A second model (PALEOMAP, licence
to be asked for as the ice outlines' was) when it can be had, because two models'
disagreement is one of the two honest measures of the fog.
*Proves:* one piece — India — turned by its plate's rotation at 70 million years lands in
the Indian Ocean south of the equator, drawn through today's flat map; and the whole set
at 200 million years closes the Atlantic. *Fallback:* if pyGPlates will not install, the
GPlates desktop application exports the same polygons and resolved rotations.

**Stage 2 — The nested bar, as a shelf module.**
*Done 6 Oct 2026, built and checked, not committed:* `js/deep-time.js` and `stories/deep-time.json`,
`experiments/deep-time-bench.html`. The six chunks with the ruling's cuts and a known-from line each;
the pull-down as the Focus window repeated; the twitch; the dot and tail; the marker with its ticks on
the bars above; the readout in *ago* across seven orders. Checked in the desktop pane and at 375 px:
on a phone the chunk names mostly vanish and the colours carry the bar, which is what the Hazen-colours
idea predicted. The hand-over at the bottom rung is an event (`onBar` with `line`); mounting into the
Time Machine page is Stage 7, so the page that ships was not touched.
`js/deep-time.js`, mounted into an element as `glass.js` and `map.js` are, fed by
`stories/deep-time.json`. Bars; the pull-down at three-quarter width with the two lines to
the gap it left; uneven nesting with the twitch; the marker that is the handle; dot-and-tail
marks; the *known from* line on every bar; the colours; one readout function tested at every
order of magnitude. At the bottom, the After the Ice rung is the Time Machine's existing
Main line, so the bench mounts the bar above the page's lines and the marker hands over to
the same handle.
*Proves:* the gesture on a phone; the first chunk's minimum width (four percent of the bar);
the readout across seven orders without muddle; the hand-over to the existing line.

**Stage 3 — The globe, outlines only.**
*Done 6 Oct 2026, built and checked, not committed:* `js/globe.js`, `experiments/globe-bench.html`,
the bar driving the globe. The pieces turned by their rotations and drawn as one fill; the fog grades
from the data — crisp, latitude (seven copies shifted in longitude), ghost, beyond the model, no map;
today's coast as a line for the last five million years; drag turns and tilts. Measured on the Mac at
520 px: 6 ms a draw on average, 25 worst, and the year sweeps at the display's frame rate. **Not yet
seen on an iPad**, which the plan says decides it. One lesson: a point behind the globe pushed to the
limb and joined by a chord fills a wedge across the disc; the path must walk the limb's arc.
*Michael's iPad test, the same evening:* it ran, and two things were wrong, both now fixed and pushed.
The tilt had a sign error (the latitude negated in the tilt matrix), so dragging went backwards and
twice as far, past the pole, where the fill turned inside out and showed the sea and land swapped with
the pieces' outlines. The deeper cause of the swap: a ring wholly behind the globe was still traced as
a loop around the limb and wound the whole disc; now each ring is its own path and joins the land
only if a point of it faces us. Michael's standard view is the rule (Rulings, *Deep time* 3, amended):
north up at rest, the poles are the tilt's limits, a right drag moves the surface east whatever the
tilt, no limit east–west. And the bars drew the ice ages and After the Ice the same width because of
the mockup's six-percent floor; widths are honest now, down to three pixels, with a finger-sized hit
area for a thin chunk — a hairline is the lesson (ledger). Wants logged: Black Earth textures (the
per-pixel globe's first job), the atmosphere as a rim she can turn on.
The orthographic projection of rings on a canvas or an SVG: today's coastline from Natural
Earth first, then the pieces of Stage 1 turned by their rotations; turn and tilt by drag; the fog grades by year — nothing to draw above 4.4
billion (a dark red ball), ghosts between 540 million and 4.4 billion, latitude firm and
longitude smeared between 200 and 540 million, crisp below 200 — each grade with its
sentence. Bench `experiments/globe-bench.html`. Whether this lives in `map.js` as a second
base or in a `js/globe.js` of its own is decided with the code in front of us; the
justification the architecture rule asks for is that a base is not a layer and the tile
machinery cannot be one.
*Proves:* the frame rate on an iPad while turning and while the year runs — a few hundred
pieces, each rotated and projected point by point every frame, is the cost true motion
adds, and it must hold on a 2017 iPad (paths through a projection are cheap; this is not
the per-pixel globe Spec-Map-Lab worried about, which is a later and different job); that
the fog grades read; that the words per grade are enough.

**Stage 4 — The join.**
*Done 6 Oct 2026, night, built and checked, not yet committed at the time of writing:* the engine change,
in `js/map.js` — `opts.time.deep = { seam, plates, coast, onChange }`; past the seam `map.setTime` shows
the globe in the map's box over the tiles, the sea and the marks, centred where the map was looking,
arriving as a scale and a fade (pulling away from the ground) and leaving the same way (coming down to
it); this side of it the pyramid with the sea and the ice as before; over the globe nothing of the map
responds. `experiments/join-bench.html` proves it: the bar drives the map across the seam and back.
Checked in the desktop pane; not yet on the iPad. Three lessons: the globe must measure its host's
layout width, not its drawn width, or the scaled-up arrival makes it too big for the box; the bar's
host and the map's base both wanted the class name `cw-deep`, and the map's is now `cw-deep-base`;
and the sea-level curve stops at 20,000 years, so this side of the seam but before the curve the map
clamps to the ice-age low (130 m down) — honest-ish for the ice ages, but Stage 5 should give the sea
a curve across them, or the map should say nothing. *Michael, on the iPad, 6 Oct: "It works beautifully."* The seam is not felt; the globe does not need to
show the pyramid's region as a window first, and the risk named above is closed. Stage 4 is done.
`map.setTime(year)` reaches past the ice curve: a year older than the seam shows the globe
with every piece of continent turned to where it was in that year, so dragging the marker
moves them; a year younger shows the pyramid with the sea and the ice. Zoom in time is zoom in space: the
change at the seam is the globe coming down toward the ground, not a cut. Bench: the Time
Machine page with the bar mounted and the globe in the map's box.
*Proves:* the seam is not felt; the continents move under the marker at a rate the eye
accepts (a drag across the dinosaurs' chunk is 186 million years, and the Atlantic should
open in it); the fog works inside the last chunk, where the data reaches 540 inside
*snowball and after*.

**Stage 5 — Curves with a band.**
The curve file gains a low and a high beside the value. Oxygen (Lyons and others, 2014,
whose envelope is orders of magnitude wide across the Boring Billion), the length of the
day, the mineral count (Hazen), the sun's brightness, the heat from inside. The Time
Machine's curve drawing gains the band.
*Proves:* a band can be read at a glance by a ten-year-old; the sun and the inside heat
crossing where the notes say they do.

**Stage 6 — Events.**
A vault batch, *Events-Batch-04 — Deep time*, from the 5 Oct notes, in Timeline-Stories
form. `tools/events-from-vault.py` and the store gain `evidence: earliest`, a `tail` year,
`knownFrom`, and `placeNow` (where the evidence is today); precision becomes a number of
years. `js/timeline.js`'s stretch gains the one-sided form.
*Proves:* the dot and tail on the deep bars and on After the Ice alike — the Uruk tablets
with their tail, as the first fossils have theirs.

**Stage 7 — The lab, and the descent.**
The Time Machine lab opens on the earth line, and the arrival run descends rung by rung to
the viewing's focus and stops, the bar hers. A story's viewing starts a rung or two above
its year, fixed, as the 1 Oct ruling says. Then *The edge of knowing* (ledger, Stories) as
the first story that wants it.

## Order, and what runs beside what

Stages 1 and 2 do not depend on each other and can run in two sessions the same week.
Stage 3 needs only Natural Earth. Stage 4 needs 1, 2 and 3. Stages 5 and 6 are content
and can be written in chat sessions as batches while the code stages run; only their
engine edges (the band, the tail) are Claude Code work. Rough size: Stage 1 three sessions
plus the licence wait (the rotations are the extra one); 2 two; 3 three (the moving pieces
on the globe are the extra one); 4 two; 5 one; 6 two plus Michael's writing; 7 one.
About fourteen Claude Code sessions, the first five decisive.

## Risks, by name

- **Licence.** Merdith is open; start there. PALEOMAP is asked for, not assumed.
- **The iPad.** Outlines through a projection are cheap. The per-pixel globe is not, and is
  not in this plan.
- **The seam.** A globe coming down to a flat pyramid may need the globe to show the
  pyramid's region as a window before the change. Seen at Stage 4, not guessed before.
- **True motion is real arithmetic.** Each piece is turned by a rotation interpolated
  between samples, every frame, before projection. Done naively it is slow; done with the
  rotations precomputed to matrices and the pieces as flat arrays it is cheap. The iPad
  test at Stage 3 decides, and the fallback is a lower frame rate while the marker moves and
  the full draw on release.
- **The reference frame.** A plate model's absolute frame is a choice (a paleomagnetic
  frame holds latitude true; a mantle frame holds hotspots still). The paleomagnetic frame
  is the one the fog line's sentences are about, so Stage 1 uses it, and says so in the
  file.
- **Pieces are not coastlines.** The model's polygons are continental blocks, the edges
  of the plates' continental parts, not the shoreline of any year. Sea level and the
  flooded shelf are a layer over them, later and separately; at Stage 4 the pieces are
  drawn as land and the page says what they are.
- **The first chunk** is four percent of the bar; the mockup steals width from the widest
  chunk to keep it legible, and a phone will test that.
- **The readout.** One function, tested at every order of magnitude, or the muddle the
  ledger warned of arrives.
- **The rule.** Time-Machine-Shape: never an engine change for one story. This plan makes
  one, the second base, for the lab. Anything else that looks like an engine change is a
  file in a shape that exists, or it waits.

## What not to do

- Not the inverse-projection globe of Spec-Map-Lab yet; that is the world picture on a
  sphere, a different job.
- Not a crossfade of stills as a stop-gap: Michael's word, 6 Oct, is the motion itself,
  and building the stop-gap first would build the page around it.
- Not a new timeline engine; the bar is the Focus window repeated.
- Not the universe. The bar starts at 4.567 billion; the universe is one more rung above,
  added later if a story wants it.
