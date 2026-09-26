---
status: 20 Sept 2026. Third pass landed the same day — contours, labels, the placer. This revision settles three things the Hokusai build raised: what a tap opens, how big a target has to be, and the map and the timeline as one list. Hit areas not yet built. Amended 26 Sept (Michael): the ground has layers — ice, vegetation and later sea level are files beside the picture a story can leave off or swap. Built the same day, uncommitted: the ice out of the base, a vegetation layer from Copernicus tree cover for every region, `map.js` stacking them.
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

**The map never moves unless she moves it.** Nothing animates on load, nothing pulses, nothing responds to hover. Hover does not exist on an iPad, and a hover handler on a touch screen makes the first tap do nothing.

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

## Not yet decided

Whether the paired timeline holds only events with both a date and a place, or repeats the story's whole timeline — recommended above, needs Michael's yes.

Which layers a region shows by default — vegetation on everywhere, or only where a story asks. The vegetation source and its exact green. Whether past outlines (the glaciers, a green Sahara) come from published reconstructions or are drawn by the story as washes. Whether the shelf line belongs on the world map or only on regional ones. Whether a region's ramp should stretch to its own range, so every map uses the full scale at the cost of a colour meaning different heights on different maps. Whether a country wash needs a thin edge to read as a country. Whether a map ever hangs in the gallery on its own. Whether a path should draw itself when the text reaches it.
