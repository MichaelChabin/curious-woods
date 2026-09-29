---
status: 20 Sept 2026. Third pass landed the same day — contours, labels, the placer. This revision settles three things the Hokusai build raised: what a tap opens, how big a target has to be, and the map and the timeline as one list. Hit areas not yet built. Amended 26 Sept (Michael): the ground has layers — ice, vegetation and later sea level are files beside the picture a story can leave off or swap. Built the same day, committed 9bac4e1. Amended 27 Sept (Michael): the world that moves — the world map under a timeline pans, zooms, resizes, centres on a timeline tap and resets; one pyramid, weights on events and places, zoom as a tool. Bench built, revised twice on Michael's looks, and it works on his iPad; ruled the standard for every story's world section the same day; the prompt that converts the stories is below. Amended 27 Sept, later (Michael): *After the Ice, on the moving world* — the twelve-thousand-year pair as a gallery piece on the same engine; its store fields, introductions and prompt. Revised the same evening: a bench first, separate from the stories; three lines; the zoom is a window dragged on the fixed top line, not pinch; the middle road stays. Revised again the same night: the bench reads the shared list and writes nothing to it; the time standard is the astronomer's year with each timeline adding its own zero.
role: How a story shows where something happened. One shared map, many crops, a four-line block in the story.
related: Rulings-Sept-2026.md (colour; pictures in a story; margin maps; how wide a timeline is; gestures), Spec-Map-Lab.md (the same engine, everything on), Publishing-a-Story.md
note: The other Map-* documents in this vault (Fog-Map, Map-Tools, Map-Tool-Catalog, Voice-Samples-Map) are about number maps. Nothing here touches them.
---

# Maps

A map in Curious Woods is a still picture of the ground, with the story's own marks on it. It is not a Lab and not a new pillar. It is a picture a story calls, exactly the way the brain painting is. The brain rule was *one painting, two views*. The map rule is *one earth, many crops*.

## Why we make our own

Every map service on the web hands you roads, borders, city names, and a green sea-level tint. That is the textbook look, and we would spend our time deleting it. Most of them also want an account, a key and a monthly bill, and the good free ones disappear. A story published in 2026 should still have its map in 2036.

So the earth is a file in our repo. No key, no server, nothing at runtime that can go dark.

## The three parts

**1. Base pictures.** Made ahead of time by a script from public-domain elevation data. Each is one image file in `art/maps/`, four numbers for its corners, its contours, and its vertical exaggeration. A base picture is a *place*, not a zoom level: `world`, `western-europe`, `japan`, `britain`, `indonesia`, `nile`, `andes`, `italy-central`. Making a new one means running the script with four numbers.

**2. The overlay.** `map.js`. It takes a base picture, its corners, its contours and a list of marks, and draws them on top.

- **place** — a dot and a name, at one of two weights: **lit**, a place the story is actually talking about, or **minor**, a place there for bearing
- **water** — a name with no dot, in italic: an ocean, a sea, a strait
- **path** — a line from place to place
- **region** — a soft wash: an area, or a country by name

Latitude and longitude come in; pixels come out. The `lit`/`minor`/`water` weights came out of the Hokusai build rather than out of this document, and they are right: they are the label hierarchy below, given names a story can use.

**3. The map block.** What a story writes, beside the text that calls it — or, for a margin map, on its own.

## The look

Legibility first. That is the rule the other rules bend to.

**The map may draw what the earth does. It may not draw what people claim.** Coastlines, shelf edges, rivers, contours — facts about the ground, all allowed. Borders, country names, city dots and anything else people argue about appear only because a story put them there.

No green as a height. Green is free to mean a forest, because then it is telling the truth.

No red on the earth, ever. The story's marks are vermilion; if the high ground is also warm red, the marks vanish into the mountains.

No graticule, no north arrow, no scale bar, no legend, no compass rose, no inset box, no frame.

**The map never moves unless she moves it.** Nothing animates on load, nothing pulses, nothing responds to hover. Hover does not exist on an iPad, and a hover handler on a touch screen makes the first tap do nothing. Since 27 September the world map under a timeline *can* move — she pans and zooms it, and her tap on the timeline centres it — and *The world that moves* below says how; a map in the flow, in the margin or in a window is still a picture and still does not.

## The ground colours

**The earth** — buff, ochre, grey, violet-grey, white, blue. Height and depth, and nothing else means height. **The story's hand** — vermilion `#c84830`. **A named thing** — a wash at 18%: green `#33663f` for what grows, violet `#5a4a8c` for what people made.

```
land     0 #e6dfcb    250 #d8cdaa    800 #c3ab80   1600 #a89a80
      2400 #8f8d90   3200 #aeb0b8   4200 #e8ecee   5400 #f2f5f6
ice      0 #dfe7ec   1200 #eaf1f4   3000 #f6fafb
sea  -9000 #22415f  -4000 #33699a   -800 #5793b4   -150 #7fb0cc   0 #93bed7
```

The sea stops short of paper, because the first ramp ran to near-white at the shoreline and low land is paper-coloured, so the two cancelled at the coast. Japan showed it. The shore buff is one step darker than the page's paper so the map sits on the page as an object; the ice and peaks are lighter and cooler than the paper so white reads as snow.

Not from `palettes.json`, deliberately. Per the colour ruling of 18 September, the glass palettes are a source and not a constraint.

## The lines

A coastline is the zero contour of the elevation grid, so it costs no new data. **Standard on every map:** the coast at 0 m, `#4a4336` at 55%; the shelf edge at −200 m, `#2f5c78` at 30%. Both one pixel, drawn as vectors with a non-scaling stroke, so they stay one pixel in a window map at a quarter the width.

The same machinery draws a shoreline at any height, which is how sea level and the ice ages arrive later.

Contours in general are free once the extractor exists, and do not belong on a story map. A contour map is something you read. They belong in the lab.

## The labels

**No single ink colour can be legible over both pale land and dark water.** So the ink stops carrying legibility and the halo carries it.

Ink `#2a241c`. Halo `#f4f1ea` at about 70%, three pixels, round join. **The dot carries the meaning; the type carries the name** — a `lit` place gets a 4px vermilion dot, a `minor` place a 3px `#8a8378` one, and the type stays neutral in both. Sizes: 15px `lit`, 13px `minor`, 15px italic for water. Fixed in screen pixels, so a window map gets the same type as a full-width one.

Placement is worth more than any of it: eight positions round each dot, sample the picture under each candidate, take the calmest and least crowded. Built 20 September, and better at it than a story chat guessing — `side` remains for when a story has a reason.

## The relief

0.35 over land, half that over water, where the sea floor's ridges turn into noise. Exaggeration set per region and recorded in its JSON — 3 for `world`, 1 for `western-europe` — because Earth is smoother than a billiard ball and a world map shows nothing without it.

Every bit of relief is texture under the type. That is the cost, and it is why 0.35 and not more.

## What a tap opens

This was held open until a story made the case. The Hokusai build made it: tapping a place opens a panel with the event and the geography and what it has to do with the story. It works, so it is settled.

**One sentence or a short panel, and it is the story's own words.** *Nobody in Europe knew this mountain existed until the sky changed* is the story. *Tambora, a stratovolcano in Indonesia, 2,850 metres* is a schoolbook. The panel may hold more than a line — Hokusai's Nagasaki opens onto Dejima — but everything in it is written by the story about that place at that moment, and it says what the place has to do with the rest.

Tapping the same mark again closes it. Tapping empty ground closes it. Nothing is highlighted before she touches it.

**Any other action closes an open panel** (Michael, 21 Sept). One panel is open at a time. A tap anywhere else on the page — another dot, the text, a word, empty ground — or a key closes it; tapping another dot closes the first and opens the second. Scrolling does not, so she can read on with it open. `map.js` does this for every map, from one place: a press listener on the document, in the capture phase, so nothing on the page can swallow it.

**A possible route is dashed.** When nobody recorded the way something travelled but the story wants to show a likely one, the path carries `possible` and draws dashed, and the caption says it is a guess. A solid line claims a road; a dashed one claims only a direction. First used for the lapis on the Vermeer page.

Per the Rulings, a map in the flow resets when its text leaves the screen; a map in a window is gone when the window shuts.

## Hitting a mark

A `lit` dot is four pixels, so eight across. Apple asks for forty-four. A dot is not a target and was never meant to be one.

**Do not hit-test the dot.** On `pointerdown`, measure from the point to every mark and take the nearest inside a threshold. Fifteen lines, and it has no dead zones between targets, no z-order problems, and nothing to keep in sync with the drawing.

**The label is part of the target.** The name is several times the size of the dot and it is what she will aim at. A mark's distance is the smaller of: distance to the dot, and distance to the label's box.

**The threshold follows the pointer, not the device.** About 20 px for a mouse, about 32 px for touch, taken from `event.pointerType` — so a Mac with a touchscreen and an iPad with a trackpad both behave correctly, and neither is sniffed for.

Two consequences worth stating. A CW map holds very few marks, so a generous threshold costs nothing; crowding is rare and the placer has already spread the labels. And since there is no hover, she gets no preview to aim with, which makes the generous target more necessary rather than less.

The same picking function serves the timeline, so a tap means the same thing in both. That is the gesture ruling in practice.

## The timeline and the map are one list

Michael's observation, 20 September, and it is the good kind: an event has a time and a place. **The timeline uses the time and ignores the place. The map uses the place and ignores the time. It is one list, read two ways.**

So a story keeps one set of events. An event with a date appears on the timeline. An event with a place appears on the map. An event with both appears on both — and can be linked.

**The pairing.** A timeline above a map, with the same events in both. Tap a place and its marker lights on the timeline; tap a marker and its place lights on the map. Either opens the same panel, which says what the thing has to do with the story.

This is intuition **#3, multiple representations of the same thing**, as directly as CW is ever likely to get it: one object, two pictures, and the act of moving between them.

**The paired timeline is not the story's opening timeline.** This matters or she will think there are two of the same thing. They have different jobs and should have visibly different spans:

The opening timeline is the *story's* — in Hokusai, 1815 to 1855, nine events, the print in copper at 1830.

The paired timeline at the end holds **only events that have both a date and a place**, so that everything on it highlights something and nothing is a dead entry. In Hokusai that is the colour's own line, and it runs from Diesbach in Berlin around 1706 to the American warships in 1853 — a different span, plainly a different instrument, doing the thing the world map at the end already does: the route the colour took, now in time as well as in space.

**Quietly.** The highlight is a dot growing a little and its partner doing the same. Nothing sweeps, nothing flies. Her tap is her moving the map, which the rule allows; anything beyond a small change of weight is the map moving on its own.

**Where the panel goes.** Below the pair, full width, in reserved space, so that opening it does not shove the page. A page that jumps when she taps is worse than no panel.

Not yet built, and it wants Michael's yes on the paired-timeline scope above before it is.

## Countries are washes, not lines

Natural Earth has every country's outline, public domain. `region: France` finds it, simplifies it, washes it violet. Only the countries a story names appear.

A wash rather than a line, for honesty. A line says *exactly here*; a wash says *roughly this part of the world*, which is as much as anyone can say about France in 1816. **A border appears as a line only when the story is about the border**, and then it is that year's border, researched and cited.

A city needs nothing new. A city is a `place`.

## Two ways a map arrives

**In the flow.** The story stops for it. It runs `across`, full width, and the text names it: *the map below*.

**In the margin.** It carries its own caption and the prose never mentions it. Per the 20 September ruling, that is the difference between a picture the story stops for and a picture that answers a question she may not have asked.

**Under a timeline.** The moving world (*The world that moves*, below), and since 27 September the standard for every story's world section: it opens on the story's crop and she wanders from there. The only map that moves.

**In a window.** She taps a name and a small map opens over the page, answers *where is that*, and shuts. It holds less: one dot, sometimes a second for bearing, no path and no caption. The window is Glass Geometry's picker window, not a new invention.

Same component in all three. `cwMap` does not know what box it is in.

## Where the ground comes from

**ETOPO 2022** (NOAA), land and sea floor in one grid, ice-surface and bedrock versions both. Public domain. **Natural Earth** for country outlines and rivers. Public domain. Downloaded once, rendered once, never touched at runtime. Source grids live in `_CW/_data/`, outside the deploy tree.

**Ice is not a height.** Ice surface minus bedrock is thickness; where there is ice the colour comes from the ice ramp. Greenland is white because it is white. Today the ice is painted into the base picture; under the ruling below it becomes a layer.

**Sea level** is designed for and not built: a low-resolution height grid ships beside each picture, and with the contour extractor in place a different sea level is a contour at a different number plus a recolour.

## The ground has layers

*Ruled 26 September, after Switzerland came out the colour of Venus.* The base picture means height and nothing else, and that stands. But height is not the only fact about the ground, and the earlier text never said where the other facts live. Now it does.

**Height is the base and is always present. Everything else the ground can show is a layer, and a story can leave any layer off.** Ice, what grows, and later the sea level. A layer is a small file beside the picture, rendered once from public data like the picture itself, and drawn over the base by `map.js`. The map block names its layers or takes the region's defaults.

Because a layer is a file, a different outline is just a different file, and the same mechanism carries the past: the ice as it is, the ice at the last glacial maximum, the Sahara green. Nothing in the base changes; a story picks the layers that were true in its year. This is the ice-age work and the green Sahara arriving for nothing, and it is why the base must stay clean.

**What a layer is.** An image at the height grid's resolution or half the picture's, blank where the layer is absent and the layer's colour where present, multiplied over the base at the layer's own strength. Vegetation comes from a public land-cover grid (ESA WorldCover or Copernicus), and its green is kept quiet so the ochre and the vermilion survive it; the green wash for a named thing is a different mark and keeps its own colour. Ice comes from the thickness subtraction `render.py` already makes, and moves out of the base when this is built.

Built 26 September from the prompt below. The layers are WebP rather than PNG — the ice lossless with alpha, the vegetation lossy RGB with white for nothing, since a multiply layer needs no alpha — which took the world's two layers to 19 and 21 KB. The green settled at `#66905a`, 55 % at full cover. Two limits of the sources, not of the design: ETOPO's bedrock differs from its surface only under the two ice sheets, so Alpine glaciers are not in the ice layer; and the tree-cover grid ends at 80°N and 60°S.

## The world that moves

*Ruled 27 September 2026 (Michael), for the world map under a story's timeline.* A large map does not fit an iPad, and the answer is not a smaller map. It is one world she can move in.

**One world, seven scales.** The whole earth is rendered once as a pyramid: one tile at the top, and at each level down twice the width, to about a kilometre a pixel, which is as fine as the data goes. Roughly a hundred megabytes in the repo, paid once, and nothing at runtime that can go dark. The tiles are equirectangular, as every story map already is. *Amended 27 September, after Michael's first look:* the view is **Mercator at regional spans, fading to equirectangular as it widens** — full Mercator at a 20° span, plain equirectangular by 120°. The first build followed the cosine of the centre's latitude horizontally and left the vertical alone, and a drag north changed the map's proportions as it went; Mercator is the stretch under every web map precisely because a shape then holds while she pans. The fade keeps the spec's objection: a Mercator *world* lies about Greenland, and that lie is a lesson the Map Lab teaches by contrast, not something to bake into every story. Regionally the map stops at 85°, Mercator's edge. The regional crops stay for margin maps and windows, which want a still picture, and they are not swapped in as she zooms: one picture, no seams.

**What she can do.** Pan by dragging, zoom by pinching or the wheel — the plane's gestures, per the gesture ruling. **Resize** by a strip along the map's bottom edge, the same strip Glass Geometry's windows drag by; the strip is the handle, never the picture's edge, because on an iPad a drag from the edge is either a pan or a page scroll and cannot be both. It changes the height, and a taller box shows more world at her scale. *Added 27 September (Michael):* a bar down the map's left edge, just outside it, widens the map into both margins at once — not far, and never past the window — and back again. Her size and her view are hers for the visit and are not stored. **Reset** is a word, not a button, and returns both the view and the size to what the story set.

**What the timeline does to it.** Her tap on an event centres the map on its place, at her zoom, in a short slide that is over before she has finished looking — never a flight, and never a change of scale she did not ask for. A route is the one exception: it fits itself into view. Her own wandering is never undone by the page. The far-away cards are retired for the world map; nothing is far away on a map that pans.

**Zoom is a tool, not a magnifier.** Every event and every place carries a **weight**, a new field in `stories/world-events.json` and `stories/places.json`. At any scale the map shows the marks whose weight earns the room, by the rule the placer already has: a label that would collide is dropped rather than drawn, and the heavier one wins. At the whole world she sees the hundred things that matter most; in the Aegean she sees the Aegean's own hundred. The timeline is the identical rule in one dimension, standing on the plane's 1–5–10 ladder, which already relabels itself across decades. Both are viewings of the plane. Weights are editorial — Michael's and the stories' — not the code's; the code only honours them.

**The order.** The moving world is built first under a story's timeline, where it has a job today and one story's events to test with. The timeline gains zoom on the same engine second. *After the Ice* — the twelve-thousand-year map of history with hundreds of entries, already on the board as her map of history that zooms — inherits both third, without a new program. This is the Map Lab's engine arriving in the stories (Spec-Map-Lab, *One engine, two views*), and it is why the lab is not built first: building the big thing first would mean building the engine inside it and extracting it later, which is how Glass Geometry got its plane.

**Two things decided here and worth stating.** A story's world map opens on what the story set — its own crop and scale, as now — not on the whole world; the whole world is one reset away. And a tap centres but does not zoom. Both can be revisited once the thing exists.

Not built. It wants its own prompt, after this section has been read.

## After the Ice, on the moving world

*Written 27 September 2026 with Michael, revised the same evening. A bench first, separate from the stories: they may merge later, and it is worth doing on its own. It stands on the same engine as every story's world section — the moving world, the timeline, the shared store — and adds one instrument, the window.*

**What it is.** Twelve thousand years and the whole earth, on one page, with nothing to read. Three lines stacked, and the map under them. Michael's reason for wanting it, and Eileen's: it is what each of them would have wanted for a tenth birthday. A child who can be at the whole world and all of time, or in the Aegean in one particular century, and walk between them with her hand, has a place to put everything else she reads here. It is also, as near as makes no difference, the graphics project Michael began at Santa Cruz and could not finish alone, because the map and the store had to be made by hand. The map now renders itself from public data and the store fills faster than it can be culled. What is left is deciding what a ten-year-old should trip over.

**The three lines.** Each answers one question, at its own scale, and none has to lie because the top one never changes.

- *The top line is the whole span and the control.* Year 0 at the left, now at the right, ticks every thousand years, never rescaled. On it sits a **window**: a pale band she can drag along the line, and whose two ends she can drag apart or together. Whatever she is looking at below, the window shows how much of the twelve thousand years that is, and it is usually a sliver. Nothing on this line is tappable except the window. It opens on the whole span.
- *The middle line is the road*, the September bench's perspective passes, redrawn for the window's span: far passes small near the horizon, the near pass full width, so the felt sense of how much happened in here survives the rescale. It is a picture, not a control; nothing on it is tappable. Michael's ruling: not strictly necessary, but it gives more room, and style counts. If the bench shows it says nothing the bottom line does not, it goes.
- *The bottom line is the World line* exactly as she meets it in the stories, same code, same look, with the map under it, and it is the only place anything is selectable. Its span is the window's. Tap an event and the map centres on its place; tap the map and the event lights on the line; the panel between them says what happened. Because the window above sets the span, this line never needs pinch, and the map keeps pinch for itself, which is where it belongs.

**Why the window and not pinch.** Pinching a line that is also where you tap is two gestures in one place; the window is one gesture in its own place, and it is visible, which pinch is not. It also buys back the felt scale that any zoom gives away: however far in she is, the top line says where. And it is the run again under her hand: drag the window slowly from the left end and the dots arrive on the map, first in the river valleys, then everywhere. (If she later wants to pinch the bottom line, it can move the window; that is a second door, built after the first has been used.)

**The odometer** sits above the top line and reads the window's left edge as she drags: five rolling digits in after-the-ice years. It is what makes twelve thousand a size rather than a number. A plain year sits beside it in grey once the window is narrow enough for a plain year to mean anything.

**The introduction.** Brief, and it gets her to the lines fast. The first bench opens with the September run: the copper dot leaves year 0 and rolls up the years in about ten seconds, leaving events behind it on the top line; when it reaches now, the window appears over the whole span and the lines are hers. Tap to stop it. Two other openings are held as words in the page's data for later: Michael's paragraph (when it comes to counting years you can put 0 anywhere you like), and nothing at all but *tap anything*.

**The map.** The world pyramid, opening on the whole earth, per *The world that moves*. A tap on the bottom line centres; nothing zooms that she did not zoom. Layers follow the year where a layer exists: when the window sits entirely before year 1 000, the ice at its last-glacial-maximum outline; in the seventh millennium the Sahara green. This is the layers ruling paying for itself, and the only place on the site the past outline of the ground is the point rather than a setting. Where a past layer is not rendered yet, the map shows today's ground and says nothing.

**The store, and the time standard.** *Ruled 27 September, evening (Michael): the bench changes nothing that exists. It reads the shared list, `stories/world-events.json` and `stories/places.json`, without writing to it, and merges in a file of its own, `stories/after-the-ice-events.json`, holding the September bench's events. That file is a holding place: once the thing is understood, the survivors join the shared list, by copying, and it goes.* Michael's reason: other timelines are coming — fire, the mammals — and the time standard is to change once or not at all. So:

- *One standard for every timeline.* The store writes the astronomer's year: the ordinary year for AD, negative for BC, with a year 0 between them (1 BC is 0, 2 BC is −1, so the arithmetic works). Leeuwenhoek stays 1632.84; Socrates is born at −469; Göbekli Tepe is about −9 500; fire is about −410 000; the mammals about −65 400 000. A number, decimals allowed, nothing special at zero. **A timeline is then a zero and a name**: After the Ice adds 10 000 and says *after the ice*; the fire line adds 412 000 and says its own name. The negative numbers never reach the child. Today the shared list writes AD years as plain decimals, which is already the standard for everything after the year 1; nothing in it needs converting.

Two fields the list still needs, added in the bench's own file first and to the shared list when the two merge:

- *Precision.* A record says how well its date is known: `exact`, `year`, `decade`, `century`, `millennium`. The line draws an uncertain date as a soft stretch rather than a tick, and the panel says "about". Nothing before about year 7 000 is better than a century.
- *Kind.* Alongside `weight`, one of a short closed list: a sky event, an earth event, a crop or animal, a craft or invention, an object, a place, a person, a text. Region falls out of the place. Kind is what keeps a wide window from being all Rome and Han: when two events compete for the same room, the one whose kind is scarce on screen wins the tie.

The sixty-five events of `stories/events.json`, written for the September bench in after-the-ice years, are rewritten into the bench's own file in the standard above (year − 10 000), with `precision` and `kind`, and `stories/events.json` goes; `timeline-bench.html` is repointed at the new file. People count as events. Wars mostly do not, and where one must appear it appears as what it left behind: Alexandria and its library, not the marching. Barringer is 50 000 years old and waits for the next tier down; Campo del Cielo, Henbury and Kaali are inside the span, and so are Tunguska and Chelyabinsk.

**More than two lines per event.** The three depths already ruled: a short label on the line, sixty to eighty words when tapped, and *more* to about two hundred. Past that the event is a story, and the record carries the link. So the store and the story pool are one file, and a story is what happens when an event's third layer grows long enough to hang on the wall. For an event with no story yet the panel says so plainly; to a ten-year-old that is an invitation.

**Her line.** Everything the run has ever shown her, and everything she has tapped, is hers and accumulates on her device, with the practice list. In the bench it is one word, *what I've seen*, that filters the bottom line to those and back. Ruled 7 September and unchanged.

**What is new, and what is not.** New: the window on the top line; the road redrawn to a span; the time standard and the two fields above, in the bench's own file; layers chosen by year. Not new: the pyramid, the pan and pinch, the strip, the word, the weights, the placer, the panel, the picking, the World line, the shared files, the run and the odometer. If the build finds itself writing a second timeline or a second map, it has left the path. And the window is worth watching as it is built: a story's World section may want it one day, in place of the timeline zoom the board has as its next action.

**Pillar and intuitions.** Stories, as furniture the whole wall leans on. #13 above all: *long ago, before that, elsewhere at the same time*, as one gesture. #5: the odometer and the empty left half of the top line make twelve thousand years a size. #3: one list, two pictures, and her hand moving between them.

**Not yet decided.** Whether the run stays the opening or rotates with the other two. Whether the middle road earns its keep at narrow spans. Whether the window's ends snap to the plane's 1–5–10 ladder or slide freely. Whether the seven deep-time tiers are seven of these with a different span and store, which is the working assumption. Where it hangs once it is more than a bench (`What-CW-Is.md` says the gallery, on its own). When the bench's events join the shared list, and who culls them.

## The prompt for After the Ice

> Read `CWVault/claude/Spec-Maps.md`: *The world that moves*, then *After the Ice, on the moving world*. Then `CWVault/20-SPECS/Spec-Timeline-Intro.md`, and open `cw-deploys/experiments/timeline-bench.html` in a browser once, for the run, the odometer and the road; the rest of that page is retired. Read `cw-deploys/experiments/maps/moving-bench.html` for how a timeline sits on the moving world today.
>
> First the data, and touch nothing the story pages read. Do not edit `stories/world-events.json` or `stories/places.json`. Write `stories/after-the-ice-events.json` from `stories/events.json`: the same records with `year` rewritten to the astronomer's year (the September file's after-the-ice year minus 10 000, so 0 becomes −10 000 and 11 816 becomes 1 816), and `precision` and `kind` added per the spec with values you can defend, marking any you guessed; the lead-up events go in too, tagged with the story they came from. Its places go in a `places` block inside the same file, not in `places.json`. Remove `stories/events.json` and repoint `timeline-bench.html` at the new file (it adds 10 000 back). The bench reads both lists and merges them at load; a shared record whose `year` is missing `precision` counts as `year`.
>
> The line draws in after-the-ice years — the store's year plus 10 000 — and that offset is one constant at the top of the page, named, because the next timeline will have a different one.
>
> Then the bench: `cw-deploys/experiments/after-the-ice.html`, standalone, on the house page standard, no story text. Three lines and the map, per the spec: the top line fixed with the window on it (drag the band; drag either end; nothing else on that line is tappable), the odometer above reading the window's left edge; the road from the September bench redrawn to the window's span, untouchable; the World line from `js/timeline.js` with the map from `js/map.js` under it, span bound to the window, the pyramid opening on the whole world, every event in the store, weights and kinds honoured as the spec says. The window opens on the whole span. The run opens the page: ten seconds, tap to stop, then the window appears and the lines are hers. Put the other two openings in the page's data as words, unused.
>
> The window's drag is a `pointer` gesture on the top line only; the map's pan and pinch are the map's; the bottom line takes taps only. If two of these ever fight on an iPad, report it rather than adding a rule.
>
> Layers by year: when the window lies entirely before year 1 000, show an ice layer at its last-glacial-maximum outline if one exists in `art/maps/`; otherwise show today's ground and report that the past outlines are not rendered yet.
>
> Her line: read the ids `timeline-bench.html` keeps in `localStorage` under `cw-after-the-ice`, add every event she taps, and offer one word, *what I've seen*, that filters the bottom line to those and back.
>
> Register the page and the new data file in `MANIFEST.md`, list the page in `experiments/index.html`, and add its line to `00-BOARD.md`. Run `tools/check-deploys.sh`. Do not hang it. Confirm that every story page still opens unchanged. Stop and report before committing, and say plainly which data values you guessed and whether the window's drag and the map's pan stayed apart under a finger.

## Time on the map

*Ruled 29 September 2026 (Michael): a new capability the maps can call on when a story wants it.* The ground's layers can change with a year. A story, or the timeline's rolling dot, says *when*, and the map shows the world as it was: the sea lower, the ice further south, the Sahara green. It is the layers ruling carried through time — a past outline is a different file, or a different number — and nothing in the base picture changes.

**The sea first,** because it needs no outside data and it is the most dramatic. Global sea level was about 130 m lower at the height of the last ice age and about 60 m lower twelve thousand years ago, and reached roughly today's level around seven thousand years ago. The pyramid carries a shallow-sea layer: for every tile with continental shelf in it, a greyscale image of depth to 130 m. Only sea joined to the world ocean counts, so the Caspian and the Dead Sea, which lie below sea level on land, do not drain. `map.setSeaLevel(metres)` paints what that sea level exposes in the land colour, by its height above the new shore, with the new shoreline drawn as a line; today's coast stays drawn over it, so Britain's outline sits on Doggerland. The curve — metres by years ago — is shared data, `stories/sea-level.json`, read from a published reconstruction (Lambeck et al., 2014) and approximate. It is a single global figure: the land also rose where the ice left, most of all in Scandinavia and around Hudson Bay, and the map does not show that.

**Then, when the timeline drives it:** `map.setTime(year)` sets the sea level from the curve, blends between the two nearest ice outlines (ICE-6G or GLAC-1D, after a licence check), and sets the strength of a green-Sahara wash (the African Humid Period, roughly 14,500 to 5,500 years ago, drawn as a wash because the evidence is coarse). Others the same machinery gives: Lake Agassiz and its drainage, Britain becoming an island, the Persian Gulf flooding, forests following the ice north; and nearer our time, measured rather than reconstructed, the Aral Sea and Lake Chad shrinking.

**The first bench** (built 29 September in the session that wrote this): `experiments/maps/sea-level-bench.html`, the moving map on the North Sea with a slider from 20,000 years ago to today and one line saying how far down the sea was.

## Pillar and intuitions

Maps belong to no pillar; they are picture furniture, like the brain. **#13, historical sweep** — *elsewhere at the same time*, the half a timeline alone cannot give. **#5, order-of-magnitude sense** — Tambora is about 12,300 km from Lake Geneva, and the sky over Geneva changed anyway. And with the pairing above, **#3**.

**A place too far away for the map** gets a card at the map's edge, on the side it actually lies, with its name, its date and its distance. Tapping the card opens the world map in a window with that place and one familiar place for bearing. First built in the Frankenstein prototype, 21 September, for Tambora.

## The prompt for the hit areas

Small and worth doing before anything else, because every map already on the site has this problem.

> Read `CWVault/claude/Spec-Maps.md`, the section *Hitting a mark*. This changes how `map.js` decides what was tapped. It changes nothing that is drawn.
>
> Replace element hit-testing on the dots with nearest-mark picking. On `pointerdown`, compute the distance from the point to every mark — taking, for each mark, the smaller of the distance to its dot and the distance to its label's bounding box — and act on the nearest mark inside a threshold. The threshold comes from `event.pointerType`: about 20 px for `mouse`, about 32 px for `touch` and `pen`. Do not detect the device; a Mac may have a touchscreen and an iPad may have a trackpad, and both must work.
>
> A tap inside the map but outside every threshold closes any open panel. A tap on an already-open mark closes it.
>
> Export the picking function so the timeline can use the same one later.
>
> Then check it on the three maps in the Hokusai page, with a mouse and with a finger, at full width and in a window. Report what threshold felt right rather than what the spec said, if they differ. Stop before committing.

## The prompt for the layers

Follows from *The ground has layers*. It changes what the base picture holds, what sits beside it, and how `map.js` stacks them. Nothing about the marks, the labels, the lines, the taps or the window changes.

> Read `CWVault/claude/Spec-Maps.md`, the sections *The ground colours*, *Where the ground comes from* and *The ground has layers*. This moves the ice out of the base picture and adds a vegetation layer; `map.js` learns to stack layers. Marks, labels, lines, taps and the window are untouched.
>
> **1. `render.py`.** The base picture is height alone: the land ramp everywhere above sea level, the sea ramp below, the ice ignored. Beside it, at half the picture's width, two RGBA PNGs, transparent where the layer is absent: `<region>-ice.png`, the ice ramp by surface height with the same relief shading the base has, alpha 1 where ice thickness is above zero, the edge anti-aliased from the full-resolution mask; and `<region>-vegetation.png`, one quiet green with alpha proportional to tree cover, meant to be multiplied over the base. Tree cover comes from the Copernicus Global Land Cover 100 m tree-cover fraction (2019, Zenodo, public), downloaded once into `_data/` and read in windows, never committed. Colour and strength are named constants at the top; the green must not be the wash green, and the ochre and the vermilion must survive it. The region's JSON lists its layers: name, file, blend (`normal` for ice, `multiply` for vegetation) and whether it is on by default. Add `--all`, which re-renders every region in `art/maps/` from its own JSON, and run it.
>
> **2. `map.js`.** `cwMap(container, region, marks, opts)` and `cwMapWindow(region, marks, opts)` take an optional fourth argument; `opts.layers` names layers to turn on or off, and everything else takes the region's defaults. Each layer that is on is an image over the base and under the SVG, with its blend, never a pointer target. Label placement reads the ground with the layers composited in. No existing caller changes.
>
> **3. Look before reporting.** Greenland and Antarctica, with the ice on and with it off. Switzerland and the world with vegetation on: the ochre still there under the green, the vermilion still the loudest thing, at full width and in the window. Report the green and strength you settled on, the file sizes per region, and anything that fought you. Stop before committing.

## The prompt for the world that moves

Follows from *The world that moves*. One session: the pyramid, the viewing, weights on marks, and a bench — no story changes (Michael, 27 Sept: test it before touching the stories). Wiring the first story and the timeline's own zoom are the next prompts, not this one. Paste it whole.

> Read `CWVault/00-WHAT-CW-IS.md`, `cw-deploys/MANIFEST.md` (Page standard, `js/`, `art/maps/`), `CWVault/claude/Rulings-Sept-2026.md` (gestures across tools), `CWVault/claude/Spec-Maps.md` in full with *The world that moves* as the brief, `CWVault/claude/Spec-Timeline-and-Map.md`, and `CWVault/claude/Spec-Map-Lab.md` (*One engine, two views*). Read `cw-deploys/js/plane.js` before writing any view code: it owns view state, the zoom clamp and the pinch and wheel gestures for both labs, and the map is a viewing of the plane. Reuse what fits; do not fork it. Where this prompt and the spec disagree, the spec wins.
>
> This builds the moving world on a bench. No story page changes in this session: the pyramid is a new region beside the existing crops, and a map moves only when a page hands it the pyramid, so every story keeps its still maps until one is told otherwise. The timeline's own zoom and After the Ice come later and are not in scope. Four things.
>
> **1. The pyramid.** `render.py --pyramid` renders the whole earth from the 30 arc-second grids as 512-pixel tiles, levels 0 to 6 (one tile at level 0; 64 by 32 at level 6, about 1.2 km a pixel at the equator), equirectangular, into `art/maps/world-tiles/<z>/<x>/<y>.webp`, with `art/maps/world-pyramid.json` naming the levels, the tile size and the files. The base is height alone, with the ground colours and the shading the regions use; vertical exaggeration steps down from 3 at level 0 to 1 at level 6 by a table at the top of the script — report it. The ice and vegetation layers are tiled too, as `<z>/<x>/<y>-ice.webp` and `-vegetation.webp`, transparent tiles omitted; the spec leaves open whether they go to every level, so render them to every level, report the cost, and if the layers exceed the base's size stop them at a middle level and say which. Contours for the coast and the shelf edge per level, simplified to half a pixel at that level, one JSON file per level; report the sizes, and if level 6's passes a megabyte say so rather than shipping it. Report the tile count and total size per level, and the repo size before and after.
>
> **2. The viewing.** `cwMap(container, region, marks, opts)` with the pyramid as its region becomes a map that moves. Everything the still map does — marks, labels, halos, placement, contours, layers, taps, `opts.layers` — works unchanged; the projection pair is what gains a view: centre, scale, and the horizontal scale following the cosine of the centre's latitude. Tiles load for the view as it moves and are dropped when they leave it. Drag pans; pinch and the wheel zoom, clamped to the pyramid's levels. Labels stay fixed in screen pixels, are placed with **weight** (heavier first, and the heavier survives a collision), and are re-placed when a gesture ends, not during it, so nothing jitters under her finger. A strip along the map's bottom edge, styled as Glass Geometry's window drag handle, resizes the map's height between a minimum and a maximum you choose; the picture's own edge is never the handle. A word, `reset` by default and settable by the story, returns view and size to what the story set. `opts.fit` gives the opening box (a story passes its crop's corners); `map.centre(lat, lon)` slides to a place at the current scale in about 250 ms and never changes it; `map.fit(box)` is for a route. The existing `reset()` keeps its meaning (hide open text) — name the view's return `home()` and tie the word to it. Nothing animates except those two slides, and nothing moves that she did not ask to move.
>
> **3. Weights.** A mark may carry `weight`, 1 to 3, where 3 means it matters at the whole-world scale and a mark that says nothing counts as 1. The placer honours it on every map, still or moving, since it is one placer. Do not touch `stories/world-events.json` or `stories/places.json` in this session; the bench's marks carry their weights in the page, and the shared files gain the field when the first story asks for the moving map.
>
> **4. The bench.** `experiments/maps/moving-bench.html`, page standard, Georgia, one column: the moving world opening on the corners of `japan-and-china`, under a two-sided timeline made with `timeline.js` from six hand-written events with places and weights — Hokusai's, from `Spec-Timeline-and-Map.md`, which include one route — so that a tap centres and the route fits. The resize strip, the reset word, and nothing else on the page: no controls, no explanations. A line of prose above it naming what it is, as a story would. Register it in `experiments/index.html`. The far-away cards are not built for the moving map. Do not change `active/hokusai-the-great-wave.html` or any other story; when Michael has wandered on the bench and said yes, wiring one story is a short follow-up.
>
> **Test before reporting**, on the Mac and in the iPad simulator: pan, pinch, resize, reset, a tap centring, a route fitting; tiles arriving without the map going blank; label placement holding still during a pan; frame rate during a drag; and that every existing story page still draws its still maps exactly as before, with no console errors. The risk to report on first is **page scroll against map pan on the iPad**: a full-width map that takes every one-finger drag can trap the page. Say what happened. If it traps, propose the rule — two fingers move the map, or something better — and bring it to Michael before deciding, because by the gesture ruling a new gesture is named, not slipped in.
>
> Register everything in `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Anything the spec leaves open, leave open and name it. Stop and report before committing.

## The prompt for the stories on the moving world

Follows the bench and Michael's iPad (27 September: it works, and he wants it everywhere). Five stories have a world section, and the template. One session. Paste it whole. *Run the same evening in the session that wrote it; the stories are converted and uncommitted.*

> Read `CWVault/claude/Spec-Maps.md`, the sections *The world that moves*, *Two ways a map arrives* and *The prompt for the world that moves*; `CWVault/claude/Spec-Timeline-and-Map.md`, the section *The map* and its amendment; then `cw-deploys/MANIFEST.md` under `js/` for what `map.js` and `timeline.js` do when a story says `moving: true`; then open `cw-deploys/experiments/maps/moving-bench.html` and use it. Where this prompt and the spec disagree, the spec wins.
>
> **1. Every world section moves.** In each of `active/hokusai-the-great-wave.html`, `active/vermeer-girl-with-a-pearl-earring.html`, `active/van-gogh-starry-night.html`, `active/professor-neckers-drawing.html` and `active/have-you-thought-of-a-story.html`, the `WORLD` block's `region` becomes `../art/maps/world-pyramid.json`, with `moving: true`, `reset: 'reset'`, and `fit` set to the corners of the regional crop that block uses today, read from that region's JSON, so every story opens exactly as it does now. Every far-away card goes: its place becomes an ordinary place on the map with its own `side`; a `spread` place becomes the towns it stood for, each `minor`. The story's still maps — margin, flow, windows — are untouched, and no story's words change. Give every place a `weight` (1 to 3; 3 matters at the whole-world scale) and list them in the report. Do the same in `template-story.html`, so a new story is born with the moving world.
>
> **2. Weights in the shared files.** Add `weight` to the schemas in `stories/world-events.json` and `stories/places.json`, document it in each file's `_about`, and give every existing event and place a provisional weight from 1 to 3. List every weight in the report so Michael can change them.
>
> **3. The coastline at the finest scales.** `render.py --pyramid` writes contour files per level, and levels 3 to 5 were over the megabyte cap, so a map zoomed past level 2 draws level 2's lines, a pixel or two off the tiles' own coast. Cut the finer levels' lines per tile column instead — `world-tiles/contours-<z>-<x>.json`, each holding the lines that touch that column — and have `map.js` fetch only the columns in view. Report the sizes.
>
> **4. Country washes on the moving map.** The `region` mark draws a polygon through the projection pair, so it already follows the view; check it with one wash on the bench and report if it does not.
>
> Check every converted page: the world section opens on its old crop, a tap on the line slides the map, routes fit, every former card's place can be reached by dragging, the reset word restores the opening, and the page's still maps and text are unchanged. Check the bench and the template page. Check on the Mac and, if the simulator takes touches this time, on the iPad; if it does not, say so and leave the finger to Michael. Bump each page's stamp and script versions. Register everything in `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Anything the spec leaves open, leave open and name it. Stop and report before committing.

## Not yet decided

For *After the Ice*, see its own section above.

Whether the paired timeline holds only events with both a date and a place, or repeats the story's whole timeline — recommended above, needs Michael's yes.

Which layers a region shows by default — vegetation on everywhere, or only where a story asks. The vegetation source and its exact green. Whether past outlines (the glaciers, a green Sahara) come from published reconstructions or are drawn by the story as washes. How weights are given — a number, or a few named ranks — and who gives them to the events already in the shared files. What the pyramid's layers cost: ice and vegetation at every level, or only to a middle one. Whether the shelf line belongs on the world map or only on regional ones. Whether a region's ramp should stretch to its own range, so every map uses the full scale at the cost of a colour meaning different heights on different maps. Whether a country wash needs a thin edge to read as a country. Whether a map ever hangs in the gallery on its own. Whether a path should draw itself when the text reaches it.
