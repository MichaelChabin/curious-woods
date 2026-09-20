---
status: 20 Sept 2026. Bench built and recoloured 18 Sept. This revision settles legibility: the coastline and shelf edge become standard, shore water is capped, labels stop being vermilion, and the no-outline rule is narrowed. Third pass not yet built.
role: How a story shows where something happened. One shared map, many crops, a four-line block in the story.
related: Rulings-Sept-2026.md (colour; pictures in a story; gestures across tools), Publishing-a-Story.md, What-CW-Is.md
note: The other Map-* documents in this vault (Fog-Map, Map-Tools, Map-Tool-Catalog, Voice-Samples-Map) are about number maps. Nothing here touches them.
---

# Maps

A map in Curious Woods is a still picture of the ground, with the story's own marks on it. Tapping a mark shows a line of text; tapping one that carries a story opens it. Nothing else.

It is not a Lab and not a new pillar. It is a picture a story calls, exactly the way the brain painting is. The brain rule was *one painting, two views*. The map rule is *one earth, many crops*.

## Why we make our own

Every map service on the web hands you roads, borders, city names, and a green sea-level tint. That is the textbook look, and we would spend our time deleting it. Most of them also want an account, a key, and a monthly bill, and the good free ones disappear. A story published in 2026 should still have its map in 2036.

So the earth is a file in our repo. No key, no server, nothing at runtime that can go dark.

## The three parts

**1. Base pictures.** Made ahead of time by a script, from public-domain elevation data. Each is one image file in `art/maps/` plus four numbers — the corners of the piece of world it shows — plus its contours (below). A base picture is a *place*, not a zoom level: `world`, `western-europe`, `britain`, `indonesia`, `nile`, `andes`. Making a new one means running the script with four numbers, which takes about a minute.

**2. The overlay.** One small file, `map.js` — shared, at `cw-deploys/js/map.js`, since 20 September 2026, when the Hokusai story called it (Michael's call). It takes a base picture, its corners, its contours and a list of marks, and draws them on top. It knows four kinds of mark and no more:

- **place** — a dot and a name
- **path** — a line from place to place
- **region** — a soft wash: an area, or a country by name
- **note** — words at a point, no dot

Latitude and longitude come in; pixels come out.

**3. The map block.** What a story actually writes, beside the text that calls it:

```
map: western-europe
  place: London          51.51  -0.13
  place: Lake Geneva     46.45   6.55   "She wrote it here, in a wet summer."
  path:  London – Dover – Strasbourg – Lake Geneva
  caption: The summer of 1816.
```

Four lines for the Frankenstein map. Claude writes this block; Michael reads the page at stage 3 and says whether it looks right. There is no new tool to learn and no map program to open.

## The look

Legibility first. That is the rule the other rules bend to, and two of the original prohibitions bent to it on 20 September. What survives of them survives because it is about honesty rather than taste.

**The map may draw what the earth does. It may not draw what people claim.** Coastlines, shelf edges, rivers, contours — all facts about the ground, all allowed, and drawn when they help her read the picture. Borders, country names, city dots and anything else people argue about appear only because a story put them there. This replaces the old blanket ban on outlines, which was aimed at borders and was catching the coastline by accident.

No green as a height. Textbook maps are green at sea level because of a printing convention from the 1800s, and a child has seen ten thousand of them. Green is free to mean a forest, because then it is telling the truth.

No red on the earth, ever. The story's marks are vermilion; if the high ground is also a warm red, the marks vanish into the mountains exactly where a story needs them seen.

No graticule, no north arrow, no scale bar, no legend, no compass rose, no inset box, no frame.

**The map never moves unless she moves it.** Nothing animates on load, nothing pulses or bounces to ask for attention, nothing responds to hover. Hover was considered on 20 September and dropped: it does not exist on an iPad, and a hover handler on a touch screen makes the first tap do nothing, which is a bug we would have introduced ourselves.

## The ground colours

Three families. They never borrow from each other, and that is the whole of the scheme.

**The earth** — buff, ochre, grey, violet-grey, white, blue. Height and depth, and nothing else is allowed to mean height.

**The story's hand** — vermilion, `#c84830`. Dots, paths, washes of the story's own choosing.

**A named thing** — a wash at about 18%. Green `#33663f` for what grows; violet `#5a4a8c` for what people made, countries included. Two, deliberately. A third region on one map is a stipple or a hatch of one of these, not a new colour.

The ramp runs warm at the bottom and cool at the top, which is the old Swiss-atlas move: low ground comes forward, high ground recedes.

```
land     0 #e6dfcb    250 #d8cdaa    800 #c3ab80   1600 #a89a80
      2400 #8f8d90   3200 #aeb0b8   4200 #e8ecee   5400 #f2f5f6
ice      0 #dfe7ec   1200 #eaf1f4   3000 #f6fafb
sea  -9000 #22415f  -4000 #33699a   -800 #5793b4   -150 #7fb0cc   0 #93bed7
```

**The sea stops short of paper.** The first sea ramp ran almost to white at the shoreline, and low land is paper-coloured, so the two met at the coast and cancelled each other. Japan was the case that showed it. The shelf still lightens shoreward; it just no longer arrives at the same value as the beach.

**Against the page.** The shore buff is one step darker than the page's paper, so the map reads as an object lying on the page rather than a hole in it. The ice and the peaks are *lighter* than the paper and slightly cool, so white reads as snow rather than as an image that failed to load.

These are not from `palettes.json`, and that is deliberate. Per the colour ruling of 18 September, the glass palettes are a source and not a constraint.

## The lines

A coastline is the zero contour of the elevation grid. It costs no new data — it is the same file that makes the colours — and it is the single largest gain in legibility the map has had.

**Standard on every map, both of these:**

- **the coast**, the contour at 0 m, `#4a4336` at 55%, one pixel
- **the shelf edge**, the contour at −200 m, `#2f5c78` at 30%, one pixel

The shelf edge earns its place because a continental shelf rendered as a gradient is a smear, and rendered as a line it is a shape — the drowned edge of the continent, which she can see without being told. The world map is the one to look at before this is called settled, because that line goes round every continent at once.

**They must be vectors, not painted into the picture.** A one-pixel line baked into a 2000-pixel base image becomes a quarter of a pixel in a window map at 500 across, which is to say it goes grey and disappears where the map is smallest. Extracted once as a contour, simplified, and drawn in SVG with a non-scaling stroke, it is one crisp pixel at every size — the same trick the type uses.

The same machinery draws a shoreline at any other height, which is how the sea-level and ice-age work arrives later: a contour at a different number, not a new picture.

**Contours in general are possible and do not belong on a story map.** Once the extractor exists it takes a list of heights, so contours at 500, 1000, 2000 are free. But a contour map is something you read, and a story map is something you glance at to see where a thing was. Unlabelled contours are a beautiful texture and labelled ones are a schoolbook. They belong in a map lab, if that is ever built. See *Later*.

## The labels

The first pass made every label vermilion, which fails, and the reason is worth keeping written down: **no single ink colour can be legible over both pale land and dark water.** Vermilion reads well on the buff and is nearly gone over the sea. So the ink stops carrying legibility and the halo carries it instead.

- **Ink** `#2a241c`, a warm near-black. Not vermilion, not pure black.
- **Halo** `#f4f1ea` at about 70%, three pixels, round join. Wherever a label lands, the halo supplies the contrast locally.
- **The dot carries the meaning; the type carries the name.** Colour, size and shape belong to the symbol. A place the story names gets a 4px vermilion dot; a lesser place gets a 3px `#8a8378` one. The type stays neutral in both cases.
- **Sizes.** 15px for a place the story names, 13px for a lesser one, 15px italic for water. Deliberately one size below the story's own text, so a label is readable without competing with the prose beside it.
- **Fixed in screen pixels**, never scaling with the picture, so a window map gets the same type as a full-width one.

**Placement is worth more than any of the above.** Try eight positions around each dot, sample the picture under each candidate box, and take the calmest and least crowded. Forty lines or so, and it beats every colour decision combined.

## The relief

Shading is what makes the map read as painted rather than printed, and it has three costs worth knowing.

It fights the labels: every bit of relief is texture under the type. **0.35 is the working strength**, and the loud version is handsomer and harder to read.

It is invisible at world scale without help. Earth is smoother than a billiard ball, proportionally, so a world map needs the heights exaggerated two or three times before anything shows. That is a conventional cheat rather than a lie, and the exaggeration is **set per region** — a world map needs three, western Europe needs one — and recorded in the region's JSON.

It fights the colour rule. Shading darkens one side of every hill, so a 400-metre slope in shadow can read darker than 1500 metres in sun. Keep it gentle, and gentler still over water, where the sea floor's ridges and fracture zones turn into noise: **the sea gets about half the shading the land does.**

## Countries are washes, not lines

Natural Earth has every country's outline, public domain like the rest of the ground. `region: France` finds it, simplifies it, and washes it violet. Only the countries a story names appear.

A wash rather than a line, and the reason is honesty. A line says *exactly here*. A wash says *roughly this part of the world*, which is as much as anyone can say about France in 1816 without doing the research that year deserves.

So: **a border appears as a line only when the story is about the border**, and then it is that year's border, researched and cited. Period boundary data exists — the Historical Basemaps project covers some forty dates — but it is GPL-3 rather than public domain and its author says plainly it is work in progress. A per-story source with a citation, never a layer we switch on.

A city needs nothing new. A city is a `place`, one line, and only the ones the story names.

## Two ways a map arrives

**In the flow.** The story stops for it. It runs `across`, full width. The text names it: *the map below*, never *on the left*.

**In a window.** She taps a name and a small map opens over the page, answers one question — where is that? — and closes. Nothing in the text instructs her to open it; the name she tapped was the instruction.

Same component either way. A window map holds less: one dot, sometimes a second for bearing, no path and no caption. And the window is not ours to invent — by the gesture ruling, it is Glass Geometry's picker window, so the map opens in a thing she already knows how to shut.

## What she can tap

A dot with a line of text under it shows that line when tapped, and hides it when tapped again. A dot carrying a story opens the story. Nothing is highlighted before she touches it.

If a story ever wants more than a line on a tap, the text should be the story's own sentence about that place at that moment — not a gazetteer entry. *Nobody in Europe knew this mountain existed until the sky changed* is the story. *Tambora, a stratovolcano in Indonesia, 2,850 metres* is a schoolbook. Held open until a story makes the case; the mark already accepts the text.

Per the Rulings, the map is a picture she looks at rather than one she works in, so a map in the flow resets when its text leaves the screen. A map in a window is gone when the window shuts.

## Where the ground comes from

**ETOPO 2022** (NOAA), which holds the land and the sea floor in one grid, at fifteen, thirty and sixty arc-seconds, and publishes both an ice-surface and a bedrock version. Public domain. **Natural Earth** for country outlines and for rivers if a story wants them. Also public domain.

Both are downloaded once and rendered once. Neither is touched at runtime. The source grids live in `_CW/_data/`, outside the deploy tree.

## Ice is not a height

ETOPO publishes the ice surface and the bedrock beneath it. Subtract one from the other and you have ice thickness; where there is ice, the colour comes from the ice ramp instead of the land ramp. One subtraction, and Greenland is white because it is white.

## Sea level, designed for and not built

Alongside each region's picture the script writes a low-resolution grid with the height of the ground in it. Unused today, a couple of hundred kilobytes. With the contour extractor now in place, a different sea level is a contour at a different number plus a recolour — an afternoon rather than a rebuild.

## Regions to make first

`world` and `western-europe` for Frankenstein and Tambora. Then `japan` for the Hokusai story, `italy-central` and `near-east` for the Terminus story, `indonesia`, `nile`, `andes`, `britain`.

## Later, if it earns it

**A map lab.** Michael's idea, 20 September: a Lab about maps themselves, where the flat map sits beside a globe and a line drawn on either appears on the other. It is a genuinely good idea and it is a Lab, which is a far larger thing than this resource. Not to be started until the story maps are built and in use.

The one piece of foresight it needs now costs nothing, so it goes in the next build: **keep the lon/lat-to-pixel step a named, swappable function.** A projection is a pair of functions, forward and inverse; a mark is already stored in lat/lon. Keep that seam clean and the lab is an addition rather than a rewrite. Ignore it and the lab means starting over.

Pillar: Labs. Intuitions: **#3, multiple representations of the same thing** — almost the definition of it, since the point is moving between two pictures of one object — with **#1** and **#5** behind it.

**A globe** on its own is an orthographic projection of the base picture onto a sphere: for each screen pixel, compute the latitude and longitude, sample the picture. Thirty lines, and it rotates by dragging.

**Continental drift** needs reconstructed coastlines, which exist and are free, but it is a different picture rather than a variation on this one.

**Ice ages** are the ice layer with a different outline, plus the contour at the sea level that went with them.

None of these is promised.

## Pillar and intuitions

Maps belong to no pillar; they are picture furniture, like the brain. They serve **#13, historical sweep** — *elsewhere at the same time* is the hard half of that intuition and the one a timeline alone cannot give. Secondarily **#5, order-of-magnitude sense**.

## The prompt for the third pass

> Read `CWVault/claude/Spec-Maps.md`, then the colour ruling in `CWVault/claude/Rulings-Sept-2026.md`. The map bench in `cw-deploys/experiments/maps/` is built and recoloured. This pass is about legibility. It changes the lines, the labels and the shading. It does not change the mark vocabulary, the window, or the page.
>
> **1. Contours, as vectors.** In `render.py`, after the height grid is loaded, extract contours at 0 m and −200 m (marching squares — `skimage.measure.find_contours` or equivalent), simplify each polyline with Douglas–Peucker to a tolerance of about half a pixel at the base picture's resolution, convert to longitude and latitude, and write them into the region's JSON. Keep the files small and say in your report how large they came out. Take the same list of levels as an argument, so contours at other heights cost nothing later — but render only 0 and −200 now.
>
> In `map.js`, draw them under the marks and over the picture: the coast at `#4a4336` 55%, the shelf edge at `#2f5c78` 30%, both one pixel with `vector-effect: non-scaling-stroke` so they stay one pixel in a window map. They are standard on every map, not an option.
>
> **2. The sea stops short of paper.** Replace the sea stops with `-9000 #22415f`, `-4000 #33699a`, `-800 #5793b4`, `-150 #7fb0cc`, `0 #93bed7`. Land and ice stops are unchanged.
>
> **3. Labels.** Ink `#2a241c`. Halo `#f4f1ea` at about 70%, three pixels, round join — not an opaque box; build it as a translucent layer under the glyphs rather than an opaque stroke, or it reads as a white slab. Sizes: 15px for a named place, 13px for a lesser one, 15px italic for water. All fixed in screen pixels. Dots: 4px `#c84830` for a place the story names, 3px `#8a8378` for a lesser one. Nothing responds to hover.
>
> Then add placement: for each label try eight positions around its dot, sample the base picture under each candidate box, and choose the one that is least crowded by other labels and sits on the most even ground. Drop a label rather than let it overlap another.
>
> **4. Shading.** Keep 0.35 over land; halve it over water. Add a vertical exaggeration factor, set per region and recorded in the region's JSON — 3 for `world`, 1 for `western-europe`.
>
> **5. One piece of foresight.** Keep the longitude/latitude-to-pixel conversion in a single named function with its inverse beside it, rather than inline arithmetic. A map lab with a globe in it is a possibility later and this is the seam it would need. Do not build anything else for it.
>
> **6. Re-render** `world` and `western-europe`, and add `japan` (roughly 127°E to 147°E, 30°N to 46°N) — it is the hardest case for this ramp and the one that showed the shoreline problem.
>
> Then look at all three yourself before reporting. Check: the coast is visible at full width and in a window; the shelf line on the world map is informative rather than a mess; every label is readable over both land and water; and Japan's coast reads clearly against its shelf. Report the contour file sizes, the exaggeration factors you used, and anything that fought you. Stop before committing.

## Not yet decided

Whether a map ever hangs in the gallery on its own. Whether a path should draw itself when the text reaches it, or simply be there. Whether the shelf line belongs on the world map or only on regional ones. Whether a region's colour ramp should stretch to its own range, so every map uses the full scale at the cost of a colour meaning different heights on different maps. Whether two region washes are enough. Whether a country wash needs a thin edge to read as a country.
