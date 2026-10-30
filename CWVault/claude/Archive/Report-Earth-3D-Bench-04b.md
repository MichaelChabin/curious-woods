---
status: Report — the fourth Earth bench revised, on Michael's rulings of 28 Oct (Prompt-Revise-Earth-Bench-04.md); built 28 Oct 2026, late, on step 4's uncommitted tree over 6675915; checked in the pane on the Mac; committed and pushed on Michael's word, 28 Oct, with step 4
role: What was built for NASA's sea at today, the deeper blue, the fine slider, the coastline and the uncovered shelf's two colours; what was measured; what needs Michael's eye
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-04.md, Prompt-Revise-Earth-Bench-04.md, cw-deploys/js/3d/earth.js, cw-deploys/experiments/earth-3d.html, Earth-3D-Sea-Oct28/ (the pictures)
updated: 2026-10-28
---

# Report: the Earth bench, step 4 revised (28 Oct 2026)

Michael's rulings on step 4: the sea is the 2D's deeper blue with even light, and its switch goes; the Moon's impact stays at
6.5 million years; at today the photograph shows its own sea, and our sea takes over as soon as she moves back. Then four
things on the same bench, `experiments/earth-3d.html` on `js/3d/earth.js`, with the 2D globe beside it. Nothing a child sees
changes: `globe.js`, `map.js`, `cw-style.js`, `scene.js`, `honest.js`, `still.js`, the Time Machine and every story are
untouched. The Time Machine and the Sun bench open with no error (checked). Committed and pushed with step 4 on
Michael's word, the two together.

**The spec.** When I started (11:27), `Spec-Earth-3D.md` did not yet carry the rulings. It was rewritten at 11:56, by
another session and not this one, and now does: at today the photograph shows its own sea (*The ground*); the sea in the
2D's deeper blue with even light, and the uncovered floor grey (*The sea*); no coast line at today (*Today's lines on the
past*); and the open item on the slider near today and the timeline. What is built here agrees with it. The bench also
offers the 2D's buff beside the spec's grey, as the prompt asked, for Michael to look at both.

## Michael's rulings, applied

- **The deeper blue only.** The sea is `globeSea` at the ball's centre to `globeSeaDeep` at the limb, by the ray's
  distance, centred, with no sun side. The flat sea, `uSeaStyle`, `setSeaStyle` / `seaStyle`, the words *sea as now / the
  2D's blue* and `?sea=deep` are gone. The rims and the dissolves follow it as before.
- **The impact's pace** stays as built: `MOON_MELT` 6.5.

## 1. Blue Marble's own sea, at today

**What I chose, and why.** NASA's Blue Marble: Next Generation comes as four July 2004 products on NASA's pages (Visible
Earth now redirects to science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/): the *Base Map*, the base
map *with Topography*, the base map *with Topography and Bathymetry*, and separate *Topography and Bathymetry Maps*. The
land-only picture the bench has used since step 1 is the base map, `world.200407.3x21600x10800.jpg`. Its sea is near-black
(3, 5, 20 in the open Pacific), because, as NASA's limitations note says, deep oceans are not included in the source data
and the creator "uses a uniform blue color for deep ocean regions". *With Topography* shades the land only, over the same
sea. **Only *with Topography and Bathymetry* shows the sea floor's shape in its blues**, so it is the one:
`world.topo.bathy.200407.3x21600x10800.jpg` (27,201,049 bytes, from
`assets.science.nasa.gov/…/bmng-topography-bathymetry/july/`), in the ignored `cw-deploys/_data/blue-marble-bathy/`.

**NASA's terms**, from the product page: *"Anyone using or republishing Blue Marble: Next Generation please credit 'NASA
Earth Observatory.'"* and *"Blue Marble: Next Generation was produced by Reto Stöckli, NASA Earth Observatory (NASA Goddard
Space Flight Center)."* The page sets no other terms. The bench's credit names the version when it is up: *Blue Marble: Next
Generation with Topography and Bathymetry, July 2004, NASA Earth Observatory (Reto Stöckli, NASA Goddard Space Flight
Center)*; the honest block's short credit stays *NASA Earth Observatory*.

**The files**, made as the land-only ones were (Lanczos, WebP quality 86):

| | NASA's sea (new) | land-only (step 1) | ratio |
|---|---|---|---|
| 8,192 × 4,096 | 2,664,112 bytes | 1,936,084 | 1.38 |
| 4,096 × 2,048 | 826,344 | 555,966 | 1.49 |
| 2,048 × 1,024 | 242,680 | 166,734 | 1.46 |

`art/globe/blue-marble-sea-july-{8192,4096,2048}.webp`. Only one photograph is on the graphics card at a time; the word
swaps them.

**How it works.** With *NASA's sea* (the bench's default) the bathymetry picture is the photograph, land and sea. Its land
is the land-only picture's with NASA's relief shading on it (the Sahara 193, 152, 109 against 191, 153, 111; the
Himalaya's ridges shaded), and that is the only difference on land. The fade from photograph to paint by 2.6 million years
is unchanged. Its sea mask is built from its own 2,048 px file by the same test. Its blues pass the blue test, and it marks
the coast's mixed pixels as sea a little more readily than the land-only mask (1.3 % of the world, all along coasts). In
July neither picture shows Arctic sea ice. At today:

- the sea's ball shows the picture, read at each point's longitude and latitude;
- under a piece, where the picture is sea, the picture's own sea is drawn opaque in place of the shelf wash, for every
  body of water whose mean colour is NASA's blue. NASA's picture leaves the lakes unshaded and near-black, as the base
  map does (Victoria 0, 7, 2; Baikal 2, 8, 11; Superior 0, 4, 9; Tanganyika 0, 2, 2). The first picture showed Lake
  Victoria as a black hole, so each connected body of the 2,048 px mask is judged by its mean colour: 235 bodies, 3 shown
  (the ocean, the Caspian, the Black Sea); the rest, lakes, keep our wash. The shown mask is carried two texels into the
  land, because at 2,048 px its edge left blocky steps of wash along every coast close in. It only ever multiplies the sea
  the shader finds at full size, so land stays land.

**From the first step back.** NASA's sea gives way to ours by the cube root of the age: whole at today, a half at ten years
(the main slider's first position), gone by eighty (its second). The sea's ball goes from NASA's blues to the deeper blue,
and under the pieces the photograph's sea gives way to the wash. On the fine slider the same span is its first seven
positions (11, 23, 35 … 82 years).

*NASA's sea / our sea always* (bench only, `?sea=ours`): the second is the bench as it was, the land-only picture over our
sea at every age.

**Are the land-only pictures still needed?** Only for *our sea always*. Nothing else reads them: `earth.js` is their one
reader, and the 2D globe and the Time Machine use the old ground. If Michael rules for NASA's sea, the land-only files and
the second mask can go with the switch. The one cost is that NASA's relief shading then rides on the land through the
fade. Not deleted.

## 2. The fine slider (bench only)

Under the main slider, labelled *the last 3 million*: 1,000 positions from today to three million years, by
**years = A (e^(B·p) − 1)**, with B = ln 20.9 / 400 and A = 3,000,000 / (e^(1000·B) − 1) = 1,503 years. Near today
it is nearly linear (the first steps are 11 and 23 years); further back it is exponential, so the last 30,000 years take
the first 400 positions, two fifths of the width. About 170 years a position at 21,000, against the main slider's 5,000 there (its positions 12, 13 and 14 are 17,000,
22,000 and 27,000 years, so 21,000 itself cannot be set on it). In the pane, at a window 1,024 px wide, the fine slider is
803 px wide: a position and a quarter to a pixel.

| years ago | fine slider (of 1,000) | main slider (of 1,500) |
|---|---|---|
| 6,000 | 212 | 8 |
| 21,000 | 356 | 13 (22,000) |
| 30,000 | 400 | 14 |
| 125,000 | 583 | 23 |
| 450,000 | 751 | 36 |
| 2.6 million (the seam) | 981 | 64 |
| 3 million | 1,000 | 67 |

The two move together. Moving either sets the age, and the other goes to its nearest position (`?ma=` sets both). Past
three million the fine slider rests at its end. The age it gives is rounded to a year under 1,000 years, ten under 10,000,
a hundred under 100,000 and a thousand above.

## 3. The coastline

**What was wrong.** Today's coast was a line one device pixel wide, the only width the graphics card draws a line, at
0.6. The bench draws at device pixels, two to a CSS pixel on the Mac and the iPad, so on screen the line was **half a CSS
pixel** wide; the 2D strokes its coast 1.1 CSS pixels. At the home view it all but vanished: on Africa it ran along the
join of the land and the light wash, and over the ancient ground at 250 million it was a hair
(`coast-before-10000y.jpg`, `-1my`, `-250-on`).

**What I changed.** The coast is now a strip on the ball, 1.5 CSS pixels wide at the ball's near face (`COAST_PX`), in
the same colour (`coast` #4a4336) at the same 0.6. Each segment of the 0 m rings (2,844 points) is a quad pushed out along
the surface in the vertex shader; its half-width is set each frame from the camera's distance, so it holds 1.5 px at any
zoom. It thins toward the limb, as a line painted on a globe would. The far side goes by the point's facing, as before.
It now reads at 10,000 years along the Gulf of Guinea and the Sahara's coast, and as a clear thin line over the ancient
ground with *today's coasts* on (`coast-10000y.jpg`, `-1my`, `-250-on`, made at the stage's own 780 px so the width is as
on screen). Whether 1.5 is "just visible" or a touch more is Michael's: one constant.

**At today it isn't drawn.** It comes in with our sea, over the same eighty years, so the photograph shows its own coast.
This holds under both sea words.

## 4. The uncovered shelf: buff or grey (bench only)

*buff shelf / grey shelf* (`?shelf=grey`). Buff is the 2D's (`shoreLand`'s first stops), as step 4 built it. Grey is the
spec's floor that comes out (Drain the Sea's held note: "middle gray on the shelves … no hue"). It is neutral, darker at
the new shore (142, 141, 138) and lighter 250 m above it (166, 165, 161), the same ramp the buff takes, so the deepest
bared floor is the darkest. It is a candidate, kept in `earth.js` and not added to `cw-style.js`.

How they read at 21,000 years, 121 m down (`shelf-{buff,grey}-21000y-{bering,northsea}.jpg`):

- **Buff** reads as land: Beringia a pale plain joining Siberia to Alaska, Doggerland a plain from Britain to the
  continent. It is a plain to walk on, which is what people did, but it is paler than any land in the photograph and has
  no relief, so it reads as painted.
- **Grey** reads as sea floor laid bare: the same shapes, plainly not today's ground, sitting quietly between the
  photograph's greens and the ice. It says "this was under the sea" more than "this was land".

## Checked, on the Mac in the pane (M1 Pro, Chromium)

All on Blue Marble at the home view (lon 20, lat 15) unless said, seed 1234, the 3D left, `globe.js` right, 512 px a stage
unless said, small JPEGs in `Earth-3D-Sea-Oct28/` (twenty-one, 1.9 MB in all):

- `nasa-today`, `nasa-pos1` (10 years, NASA's sea at 0.5), `nasa-pos2` (80 years, gone), `nasa-pos5` (1,250 years): the
  change. Close over the North Sea at 1.7 radii: `nasa-today-northsea`, `nasa-pos1-northsea`, `nasa-pos2-northsea`.
- `ours-today`, `ours-21000y`: *our sea always* (21,000 set on the fine slider, position 356).
- `shelf-buff-21000y-bering`, `shelf-grey-21000y-bering`, `shelf-buff-21000y-northsea`, `shelf-grey-21000y-northsea`: 1.7 radii.
- `coast-before-{10000y,1my,250-on}` (the one-pixel line, 512 px) and `coast-{10000y,1my,250-on}` (the strip, 768 px).
- `gl-nasa-today`, `gl-21000y-grey-northsea`: WebGL 2 draws the same (the strip, the shown mask, the grey).

No console errors on either backend. The page-standard check passes (`tools/check-deploys.sh`: no errors; it warns that the
three new WebPs are untracked, as every new file is until the commit). The water bodies' mask costs 260 to 830 ms cold in the pane at
load, once (the pane's cold builds run about ten times slower than warm). **Not checked:** the
iPad; a frame's cost with the strip and the second photograph (the pane's measure floor moved under step 4 and could not
separate the Earth's own cost; the strip is 5,688 triangles, against the land's 51,827 and the rims' 242,256).

## What needs Michael's eye

1. **The change at the first step back** (`nasa-today` → `nasa-pos1` → `nasa-pos2`, and close over the North Sea). Does
   it read as the sea changing? It is over in eighty years, two positions of the main slider. A longer change is one
   constant.
2. **NASA's sea or our sea always**, and with it whether NASA's relief shading on the land, which rides through the fade,
   is welcome.
3. **The lakes at today**: our wash, not NASA's black. The Caspian and the Black Sea show NASA's blues.
4. **Buff or grey** at 21,000 over the Bering Strait and the North Sea.
5. **The coast's weight**: 1.5 CSS pixels at 0.6; and the strip thinning toward the limb.
6. **The fine slider's scale**: the last 30,000 years in two fifths of the width; whether 21,000 now comes easily under a
   finger (on the iPad, not the Mac's mouse).

## Open, named and left open

- The gaps between pieces (slivers of sea through the land close in: the plate data's, step 5's) show plainly beside the
  grey and the buff in the Bering pictures, as in step 4's.
- The translucent wash over each piece's sea shows the pieces' outlines in the open sea as faint lighter polygons once our
  sea is up. This was so in step 4, and with the deeper blue it is a little easier to see.
- The −200 m line is still not drawn (step 4, by the brief).
- The grey is a candidate in `earth.js`; if it wins it belongs in `cw-style.js` beside `shoreLand`.

## Files

- `cw-deploys/js/3d/earth.js` (header updated): the deeper blue only; `blueSea`, `blueSeaSmall`, `sea`, `shelf` options;
  `buildShowMask`; one photograph on the card by the sea word; NASA's sea on the sea's ball and under the pieces by
  `uNasa`; the grey shelf; the coast as a strip (`COAST_PX`, `uCoastHalfW`), not at today; `setSea`, `seaMode`, `nasaSea`,
  `setShelf`, `shelf`, `stats.waters`, `looks.maskSea`, `looks.maskShow`; `setSeaStyle` and `seaStyle` gone.
- `cw-deploys/experiments/earth-3d.html`: the words *NASA's sea / our sea always* and *buff shelf / grey shelf*; the fine
  slider; the credit by version; `?sea=ours`, `?shelf=grey`; `cwSetShelf`, `cwFineAgeOf`, `cwFinePosOf`; stamp
  `2026-10-28 6675915 · earth-3d step 4b`, `earth.js` at `?v=2026-10-28k`.
- `cw-deploys/art/globe/blue-marble-sea-july-{8192,4096,2048}.webp`: new; the source in `_data/blue-marble-bathy/`
  (ignored).
- `cw-deploys/MANIFEST.md`, `cw-deploys/experiments/index.html`, `CWVault/00-BOARD.md`: the entries.
- `CWVault/claude/Earth-3D-Sea-Oct28/`: the pictures. `Prompt-Revise-Earth-Bench-04.md`: a status line.
