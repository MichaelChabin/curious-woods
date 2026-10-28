---
status: Report — the fourth Earth bench, step 4 of Spec-Earth-3D's Getting there (this side of the seam, and the honesty), built 28 Oct 2026 to Michael's prompt Prompt-Build-Earth-Bench-04.md with his rulings on step 3; checked in the pane on the Mac; committed and pushed on Michael's word, 28 Oct, with the revision (Report-Earth-3D-Bench-04b.md)
role: What was built for the ice-age sea, the ICE-6G ice, the sea's colour, today's coasts and their word, the honest block and the kept picture — what was measured, how the bared shelf looks on the photograph, where the 3D and the 2D still differ and why, and what needs Michael's eye
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-03.md, Audit-Earth-3D.md (§1, §5, §9), Standard-Interactives.md (§5, §8), Prompt-Build-Earth-Bench-04.md, cw-deploys/js/3d/earth.js, cw-deploys/js/3d/honest.js, cw-deploys/js/3d/still.js, cw-deploys/experiments/earth-3d.html, cw-deploys/js/globe.js (setGround, buildSeaMask, iceMask, iceStrength, paintIce, prepareCoast), cw-deploys/js/map.js (setSeaLevel, drawSea, icePairs, floorTexture, groundToGlobe), Earth-3D-Ground-Oct28/ (the pictures)
updated: 2026-10-28
---

# Report: the Earth bench, step 4 — this side of the seam, and the honesty (28 Oct 2026)

Michael's prompt: first his rulings on step 3 (the Moon's impact is no flash, lasting about twice as long; the soft edges
and the near-black crust stay), then step 4 of the spec on the same bench with the 2D globe still beside it — the ice-age
sea from the curve the Time Machine uses and what it uncovers, the ICE-6G ice with no snap at the seam, the sea's colour
two ways, today's coasts and their word, honest.js's block in place of the bench's grade line, and the kept picture
through still.js. Built in Claude Code on the Mac on `139ec6c` (step 3 committed on his word). `globe.js`, `map.js`,
`cw-style.js`, `scene.js`, the Time Machine and every story are untouched; the Time Machine and the Sun bench open as
before with no console error, and the Sun's kept picture still makes (checked). **Not committed.** The pictures are in
`Earth-3D-Ground-Oct28/`: twenty-four JPEGs and the three kept pictures as PNGs, 33 MB in all, 31 of them the PNGs — Michael
may drop those before the commit if he would rather not carry them; their small copies (`kept-*-small.jpg`) stay.

## Michael's rulings on step 3, applied

- **No flash.** *Quiet brightening*, its word, `MOON_WARM`, `?impact=` and the warm uniform are gone from `earth.js` and the
  bench; the crust sinking into the melt is the only way. **`MOON_MELT` is 6.5 million years**: at 0.67 million years a
  position that is 9.7 positions of the slider, which the spec's "about ten" asked for (3 was 4.5). `impact-4515.jpg`
  (the first crust whole), `-4509` (one position after: the cracks brightening, the first rafts gone), `-4505` (most of it
  melt, a few of the oldest rafts left), `-4500` (melt, the second crust beginning on the turned maps).
- **The soft edges and the near-black crust** stay as built; the spec says so now.

## What was built

**1. The ice-age sea.** This side of the seam the sea follows `stories/curves/sea-level-ice-ages.json`, which is the curve
the Time Machine hands its map (`buildMap(raw.pyramid, raw.seaIce.points, …)`: Spratt and Lisiecki to 800,000 years,
Bintanja and van de Wal to three million; the Lambeck curve is the timeline's), read by the one curve reader at the
slider's age and rounded to half a metre as `map.setTime` rounds it. Lowering the sea is lowering the sea's ball: its
radius scales by the metres over the Earth's 6,371 km, which is done and invisible at this scale, so what is seen comes
from the floor. **The floor** is ETOPO's depths from the pyramid's own floor tiles (`world-pyramid.json`'s `data.floor`,
which `map.js` reads for `setFloor`): the tiles of one level drawn into a canvas and kept as one R8 texture — level 3 at
the full tier (4,096 × 2,048 from 124 tiles, 2.2 MB, built in 420–590 ms cold in the pane), level 2 below (2,048 × 1,024,
32 tiles, 652 KB); the 2D reads level 1 (1,024 × 512). The skin shader decodes the depth as the pyramid says
(`max × ((v − 1) / 253)²`, 0 land) and paints what a lowered sea uncovers **exactly as `paintSkin` paints it**: where
the picture's sea is shallower than the lowered sea, the land ramp's first stops (`shoreLand`) by the height above the new
shore over 250 m, and the shelf wash gone there. Nothing is painted where the picture is land; a piece's own sea
(the shelf, an inland sea) is all the lowered sea can bare, as in the 2D.

**How it looks beside Blue Marble.** The bared shelf is the 2D's buff — paler than any land in the photograph, flat, with
no relief — so it reads as a painted band hugging every coast rather than as more photograph: Doggerland a buff plain
joining Britain to the continent with the Rhine's bed not in it (`close-21000y-northsea.jpg`), Beringia a wide buff bridge
between the dark forests of Siberia and Alaska (`close-21000y-bering.jpg`), the Persian Gulf a buff lake-bed inside its
coast (`close-21000y-gulf.jpg`), Sundaland buff between the islands (`close-21000y-sunda.jpg`). Honest in its way: the
photograph is today, the buff is the model. The spec's rule is that floor which comes out is grey (Drain the Sea's held
note); grey would read as sea floor laid bare rather than as a plain to walk on, which at 21,000 years, with people
walking on it, may be the wrong thing to say. Michael's to rule by looking; the shader takes the colour from
`cw-style.js`'s `shoreLand`, so a grey is a one-line change.

**The sea's edge at full size.** Close in, the first pictures showed a dark stair-step along every coast inside the bloat:
the mask that says where the picture's sea is was built at 2,048 texels in step 2, and Blue Marble is 8,192, so along the
coast four texels of near-black sea showed through for every texel of mask, and the pale shelf beside them made it
plain. The skin shader now also tests the picture's own texel with `buildSeaMask`'s test (blue leads red by a fifth and
leads green; on Blue Marble also the channels under 70 with blue at least red) and takes the larger of the two, so the
sea's edge is the picture's at any zoom. Step 5 would have met this; it is met now.

**2. The ICE-6G ice.** The same `stories/ice-outlines.json` the Time Machine hands the globe: 48 steps, every 500 years to
21,000 and every thousand to 26,000. Each step's rings are filled even-odd into a 1,024 × 512 mask exactly as `iceMask`
fills them (the same transform, the same canvas size), once, and kept as a texture (half a megabyte each on the card);
two texture nodes carry the steps either side of the age and swap textures by reference, with map.js's `icePairs`
weights copied — the cross-fade between steps, and beyond 26,000 years the oldest outline at `−m/120` of the sea-level
curve. Painted as `paintSkin` paints them: `iceFill` at 0.94 of the summed masks, never where the floor lies below the
sea at its level. **No snap at the seam:** the 2D switches from the ground grade to the deep ice at 2.6 million years,
where the oldest outline still stands at 0.39 (the curve says 47 m down) and the Antarctic age's deep ice is at zero;
here the ground's sea and ice are multiplied by one minus the deep ice's strength past the seam, so they fade out over
the 3.1 million years the deep ice fades in on (`iceStrength`'s ramp, a tenth of the age's span), and the two overlays
cross without a step. Checked: `pair-2.6my.jpg` (the 2D's ICE-6G at 0.39, the 3D's at 0.39 and starting to fade),
`pair-450000y.jpg` (a cold moment: 98 m down, the oldest outline at 0.82), `pair-125000y.jpg` (an interglacial: 11 m,
0.09), `pair-1my.jpg` (52 m, 0.44), `pair-6000y.jpg` (the last of the sheets), `pair-21000y.jpg` (the whole sheet,
121 m).

**3. The sea's colour, two ways** (`sea as now / the 2D's blue`, bench only; `?sea=deep`). The 2D's sea is a radial gradient
from `globeSea` near the top left to `globeSeaDeep` at the edge; the second way is those two colours by depth — `globeSea`
at the centre of the ball to `globeSeaDeep` at the limb, by the fragment's ray's distance, centred, so there is no sun
side. The rims' and the dissolves' sea follow it, since they paint the sea's own colour under the wash. Nothing else about
the sea changes. `sea-deep-today.jpg`, `sea-deep-250.jpg`, and `coasts-off-250.jpg` for the flat sea at 250.

**4. Today's coasts, and their word.** `prepareCoast` reads `contours-0.json`'s 0 m rings (101 rings) and its −200 m rings,
and the 2D draws them through the view matrix alone: they do not ride the plates. So here the 0 m rings are line segments
on the ball in the globe's own frame (fixed), in `coast` at 0.6 as the 2D draws them, one pixel wide, drawn after the land
and under the haze, the far side discarded by the point's facing as the land is. This side of the seam always; past it
off — fading out over the 2D's own span, from the seam to 5 million years, so that the two engines agree at 5 and the line
does not snap off at 2.6 (the 2D fades it from today to 5) — unless the word ***today's coasts*** turns it on over the
ancient ground, where it stays at 0.6 until the word turns it off (`coasts-on-250.jpg`, `coasts-on-3000.jpg`, and their
`-off-` pairs). **The 2D draws one other modern line:** the shelf's edge, the −200 m rings, in `shelf` at 0.3 under the
same fade. Not added here, per the brief.

**5. The honest block.** `honest.js` gains a `block` option (an element under the stage) and `say({ what, says: { word,
sentence }, credit })`, which writes three lines — what the picture is, what it says with the word of knowing in italics
(copper on the bench), and the credit — and keeps them as `honest.block` for the still. No scale note and no bracket: on a
true ball nothing is stretched (the audit's §5); the crust's note waits for *Cut open*. The bench's own grade line is gone;
the bench composes the lines: *The Earth, 21,000 years ago: today's ground, the sea 121 m lower, the ice where it was.*
this side of the seam (*the sea where it is* when the curve says 0; *the ice where it was* while a step is in), *The Earth,
250 million years ago: the continents where they were, painted.* past it, *a ball of melted rock* while there is no grade;
the grade's word and sentence from `earth.grade()`, the molten phase's while the grade is none; the credit *NASA Earth
Observatory* while the photograph shows at all (the old ground's *ETOPO 2022 (NOAA), Copernicus Global Land Cover 2019*
when it is up), and past the seam the plates' *The continents: Merdith et al. 2021 (EarthByte)* — my choice, named, so
the kept picture never leaves without a source. The page's long credit under the page stays.

**6. The kept picture.** *Keep this picture* calls `still.js` with `honest`: always at full tier and 4,096 px on the long
side whatever the live tier (the view goes to full for the frame, which reloads Blue Marble at 8,192 and the floor at
level 3 if the live tier was lower, and comes back), the block's lines under the picture wrapped to its width — what it is
at the caption size, what it says at the minor size with the word in italics, the credit small — in ink on parchment (the
still's words were parchment-coloured for the Sun's dark ground; they now pick by the ground's lightness). `still.js` keeps
its `caption` for a page with one line (the Sun's); the Sun's kept picture still makes, checked.

| kept picture | size | pixels | took |
|---|---|---|---|
| today | 12.84 MB | 4,096 × 5,481 | 1,459 ms |
| 21,000 years ago | 13.49 MB | 4,096 × 5,723 | 1,484 ms |
| 3,000 million years ago | 3.61 MB | 4,096 × 6,093 | 1,071 ms |

The band under the picture is tall (1,400 to 2,000 px) because the words are drawn at the picture's scale, as the
standard asks, and the guessed sentence is five lines wide; whether the band should be smaller is Michael's.

**Does it do what `prototypes/globe-250.html` was for?** That page made one PNG of the 2D disc at 250 million years for the
Dinosaurs period picture: `?ma=&lon=&lat=&size=&climate=` and `cwSave()` giving the bare canvas at 1,400 px. The kept
picture makes a 4,096 px PNG of the Earth at any age, view and ground with the words of knowing and the credit on it, at
full tier — so yes for a period picture, with four differences to know: it is the 3D's look (perspective from 4.9 radii,
even light, the haze, either sea) and not the 2D's; it carries the block's band under the picture, where the bench gave
the disc alone; its size is fixed at 4,096 on the long side; and the view comes from the finger (and `?ma=`), not from
`?lon=&lat=&size=`. The page is not removed.

**The slider's first segment.** Step 3's square law gave 100,000 years as the first step past today, so 21,000 years was
not under the finger at all. The first hundred positions now run by a cube law to ten million years: position 5 is 1,250
years, 10 is 10,000, 13 is 22,000, 30 is 270,000, 64 the seam (step 2's fifty), 100 ten million; the knots after are step
3's. The age reads in years under a million. The frame rate under a drag through those sixty-four positions is below.

## Measured on the Mac (M1 Pro, the browser pane, Chromium)

| | |
|---|---|
| The floor texture | level 3 (4,096 × 2,048) from 124 tiles in 420–590 ms cold in the pane; level 2 in about a third of that |
| The sea at the ages | 21,000 years −121 m; 125,000 −11; 450,000 −98; 1 million −52.5; 2.6 million −47; past 3 million the curve ends and the sea is today's |
| The ice steps | at 21,000 the one step whole; beyond 26,000 the oldest at 0.09, 0.82, 0.44, 0.39 for the four ages above |
| The kept pictures | the table above; the Sun's 4.16 MB as before |
| A frame at full, 780 × 780, WebGPU (`cwBench`), the age still | 9.3 ms at today, 9.5 at 500,000 years — **but an empty scene costs 8.9 ms in the pane today**, so the measure's floor has moved since step 3 (which read 2.9 at 1,000 for the whole Earth) and the Earth's own cost under it cannot be read; the readback that waits for the card is the floor |
| A drag through the ice ages (0 → 26,000 years, 1,000 a frame, both ice steps changing every frame) | **21.5 ms a frame on the first pass**, 13.4 on the second: the first pass is each step's mask reaching the card once (the masks are kept as textures and swapped by reference; re-uploading them each frame had cost seven more) |
| A drag through the Quaternary (100,000 → 1.6 million, 50,000 a frame; one step, its weight and the sea changing) | 13.8 ms; a drag from 10 to 11.5 million years, with no ground at all, 12.0 — so the drag's cost over a still frame is the plates' turns (1,200 objects' matrices a frame), not the sea and the ice |
| `setTime` alone | 0.16–0.23 ms a call at every age tried |
| Both backends | WebGL 2 draws the same picture at 21,000 years with the deep sea (`gl-21000y-deepsea.jpg`): the R8 textures, the floor's decode and the line's discard behave |

**What a drag through the last 2.6 million years will feel like on the iPad:** a first pass pays the masks' uploads
(three-quarters of a megabyte each, forty-eight in all), which on an M-series iPad should be a few frames' hesitation the
first time through and nothing after; the 13–14 ms a frame of a drag on the Mac is the moving plates' cost that the first
bench measured (5.8 then, under a measure with a lower floor) and would hold 60 on an M-series iPad, less certainly on an
older one, where the tier should drop. Not measured on the iPad; the pane's measure is muddier than it was, and the iPad
is the judge.

The page-standard check: no errors. Every picture is the card's own readback through `cwPair`, the 2D given a frame
between the setting and the picture; the bench hands the 2D globe the floor (level 1, as `map.js`'s `floorTexture`), the
sea level and the ice pairs at every age, as the Time Machine's map does, so the comparison is honest — until this step
the bench's 2D globe had none of them.

## The pictures (`Earth-3D-Ground-Oct28/`)

All on Blue Marble; the home view (lon 20, lat 15) unless said; the 3D left, `globe.js` right.

- `pair-{today,6000y,21000y,125000y,450000y,1my,2.6my}.jpg` — the seven asked for.
- `close-21000y-{bering,northsea,gulf,sunda}.jpg` — the 3D at 1.7 radii over the Bering Strait, the North Sea, the Persian
  Gulf and Sundaland (the 2D cannot zoom: it shows the same centre at its own size).
- `coasts-{off,on}-{250,3000}.jpg` — today's coasts off and on over the ancient ground.
- `sea-deep-{today,250}.jpg` — the 2D's blue; `coasts-off-250.jpg` doubles as the flat sea at 250.
- `impact-{4515,4509,4505,4500}.jpg` — the Moon's impact with no flash, over 6.5 million years.
- `kept-{today,21000y,3000my}.png` — the three kept pictures as made; `kept-{21000y,3000my}-small.jpg` their small copies.
- `gl-21000y-deepsea.jpg` — WebGL 2.

## Where the 3D and the 2D still differ, and why

- **The bared shelf's edge** is the picture's own here (the per-texel test) and the 1,024-texel mask's in the 2D, so the 3D's
  shelf follows the coast closely where the 2D's is blockier (`close-21000y-gulf.jpg` against the 2D's Gulf).
- **The floor's resolution:** level 3 here, level 1 in the 2D, so the new shore at the full tier is eight times finer.
- **Gaps between pieces** show close in as slivers of sea through the land — Alaska's terranes, a crack across France, the
  Transantarctic — the plate data's, named since step 2; at 21,000 years beside the pale shelf they are easy to see
  (`close-21000y-bering.jpg`). The 2D's raster stroke closes more of them. Step 5's answer (a wider bloat, or the data
  mended) is still owed.
- **The deep ice and the ICE-6G ice cross** over 2.6 to 5.7 million years here; the 2D switches at the seam.
- **Today's coasts** hold full strength to the seam here and fade from 2.6 to 5; the 2D fades them from today to 5.
- **The 2D's shelf edge (−200 m)** is not drawn here.
- **The sea's gradient** is now a word on the bench; the 2D's highlight sits top left, the 3D's is centred.

## What needs Michael's eye

1. **The bared shelf on the photograph** at 21,000 years: buff as the 2D, or grey as the spec says; and its width and
   edge in the four close views.
2. **The ICE-6G ice on the photograph**: `iceFill` at 0.94 over Blue Marble's greens and greys, its soft edge, and the
   fade past 26,000 years (450,000 years is the cold moment to look at).
3. **The sea's two colours**, at today and at 250: which one, if either.
4. **Today's coasts**: the one-pixel line's weight and colour on the photograph; the word over the ancient ground.
5. **The honest block**: the three lines' wording, the credit's wording past the seam, and the block on the kept picture
   — the band's height.
6. **The impact's pace** at 6.5 million years; **the slider's first segment** (the ice age at a dozen positions, the seam at
   64 instead of 50).
7. Still from the first three benches: the turn, the frame rate at full, the heat, the cold load, the green; and now the
   first drag through the ice ages.

## Open, named and left open

- The spec's own open items stay open: the photograph against the two map rules, the wedge, the water ball, the insides,
  the small still maps, the flat world's projection and its marks.
- **The bared shelf's colour** (buff here, grey in the spec): Michael's, above.
- **The coast's fade past the seam** (2.6 to 5 million years): mine; the spec says off, and a fade is how it goes off.
- **The credit past the seam** (the plates'): mine.
- **The gaps between pieces**, step 5's; **the −200 m line**; **the masks at 1,024** (the 2D's size; a step at 2,048 is
  a constant) and **the floor at level 3 only at full**.
- **Ice over the sea's ball**: none, as the 2D paints ice only in the skin; the shelves the sheets sat on are inside the
  pieces, so nothing is lost at this scale.
- **The pane's measure**: an empty scene at 8.9 ms a frame today; the GPU's own cost of the Earth wants a cleaner
  instrument, or the iPad.

## Files

- `cw-deploys/js/3d/earth.js` — the header says what it does; gains the floor, the sea curve, the ice masks, the coast
  line, the sea's style, the ground's fade past the seam, the per-texel sea test; loses the quiet brightening. `cwEarth`
  gains `seaLevel`, `icePairs`, `setSeaStyle`, `seaStyle`, `setCoasts`, `coasts`, `floor`, `seam`; loses `setImpact`, `impact`.
- `cw-deploys/js/3d/honest.js` — the `block` option and `say()`; `honest.block`.
- `cw-deploys/js/3d/still.js` — the block's lines under the picture, wrapped; the words' colour by the ground.
- `cw-deploys/experiments/earth-3d.html` — the words, the block, the 2D's hand-off, the cube-law first segment, the kept
  picture's size and time in its caption (bench only), the stamp `2026-10-28 139ec6c`; `earth.js` at `?v=2026-10-28h`,
  `honest.js` and `still.js` at `?v=2026-10-28a` on this bench (the Sun bench keeps its `?v`; the files are compatible).
- `cw-deploys/MANIFEST.md`, `cw-deploys/experiments/index.html`, `CWVault/00-BOARD.md` — the entries;
  `CWVault/claude/Earth-3D-Ground-Oct28/` — the pictures; `Prompt-Build-Earth-Bench-04.md` — a status line.
- Not changed: `globe.js`, `map.js`, `cw-style.js`, `scene.js`, `prototypes/globe-250.html`, the still for a device
  without 3D, every story.
