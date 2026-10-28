---
status: Report — the fifth Earth bench, close in (Prompt-Build-Earth-Bench-05.md, step 5 of Spec-Earth-3D's Getting there), with Prompt-Revise-Earth-Bench-04d.md's two items and 04e folded in; built 28 Oct 2026 on b1a514c; checked in the pane on the Mac; committed and pushed in the same session, as the prompt asked
role: What was built (the bigger Earth and the old globe on a word, the zoom all the way in, the tiles on the ball, the marks, the 4d slider and lift), what was measured, what needs Michael's eye, and what is left open
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-04c.md, Prompt-Build-Earth-Bench-05.md, Prompt-Revise-Earth-Bench-04d.md, Archive/Prompt-Revise-Earth-Bench-04e.md, Audit-Earth-3D.md, Spec-Maps.md, cw-deploys/js/3d/earth.js, cw-deploys/js/3d/scene.js, cw-deploys/experiments/earth-3d.html, cw-deploys/art/globe/tiles/, tools/blue-marble-tiles.py, Earth-3D-Close-Oct28/ (the pictures)
updated: 2026-10-28
---

# Report: the Earth bench, step 5 — close in (28 Oct 2026)

**The three checks first.** The spec says, under *The ground*, "the land-only Blue Marble, over CW's own sea, at every
age": checked, nothing written in it. `Report-Earth-3D-Bench-04d.md` did not exist, so 04d's two items are done here and
reported below. 04e is folded into part 1, as the prompt says; it was not run on its own.

Nothing a child sees changes: `globe.js`, `map.js`, `cw-style.js`, `honest.js`, `still.js`, the Time Machine and every
story are untouched. `scene.js` changed only in its globe gesture (the Earth's); the Sun keeps the trackball. Checked: the
Time Machine opens with no console messages beyond its own; the Sun bench opens clean and its wheel still scales the
distance by 1.162 a notch with its near and far planes at 0.05 and 100, as before; the Van Gogh story's two maps load
their tiles and labels with no console messages.

## 0. Step 4d: the fine slider and land lighter

**The fine slider is a window of three million years round the main slider's age.** The main slider recentres it; the
fine slider moves the age inside it and the main slider follows, but the window stays where it was. At either end it
stops. Starting at today it keeps its old scale (the last 30,000 years two fifths of it); anywhere else it is even, 3,000
years a position, the age to a thousand years. Its two ends are written under it in small grey type. Checked:

| main slider at | the window |
|---|---|
| today | today to 3 million years ago |
| 250 (the slider's 249.3) | 247.8 to 250.8 million years ago |
| 4,560 | 4,558.8 to 4,561.8 |
| 4,567 (the end) | 4,564 to 4,567 |

A drag of the fine slider at 250, through five positions, left the window at 247.8–250.8 while the main slider followed
(329 → 330). Position 356 at today is still 21,000 years.

**Land lighter opens at 100 and goes to 200.** `?lift=` now runs 0 to 2. At 200 the curve's k is 4, the limit at which
it still never reverses a light and a dark tone. What 200 does, from the home view (mean colours in the same three
boxes, `today-home-lift100/150/200.jpg`):

| | 100 | 150 | 200 |
|---|---|---|---|
| the Congo's forest | 77, 116, 73 | 92, 137, 80 | 106, 158, 87 |
| the Sahara | 203, 168, 128 | 214, 177, 135 | 224, 186, 141 |
| Europe's plains | 96, 117, 92 | 105, 130, 96 | 114, 143, 100 |

At 200 the forests are 38% brighter and turn a yellower, lime green; Europe is 22% brighter; the Sahara only 10%, but
it goes pale, toward peach. The greens move most, as the curve intends. To my eye 200 starts to look painted; 150 is
still a photograph.

## 1. A bigger Earth; the old globe on a word

The bench opens with the 2D globe hidden. A word in the left column, ***old globe***, shows it beside the Earth as before;
the same word hides it (`?old=1` opens with it showing). Hidden, it is not removed: it sits out of sight at its
side-by-side size and keeps drawing, following the age, the seed and the turn, so it is right the moment it appears, and
`cwPair` still pairs the two (`pair-old-globe-hidden-home.jpg`).

| window | old globe hidden | old globe showing |
|---|---|---|
| 1440 × 900 (a laptop) | the Earth 758 px | 421 + 421 px |
| 1920 × 1200 (large) | the Earth 758 px | 421 + 421 px |
| 375 × 812 (a phone) | the Earth 343 px | 343 px, the old globe under it |

758 is 1.8 × 421. On the large window the bench's column caps the width, so the Earth is the same size; the 1.8 is the
smaller of the two limits on both. The stage is also capped by the window's height, less 48 px, but at 1440 × 900 the
heading above it still pushes its bottom 27 px below the window. On a phone nothing changes: the stage was already the
full width.

## 2. Pinch all the way in

**From the whole ball to the finest level.** The nearest zoom is set so that a texel of the deepest level is two CSS
pixels wide at the centre of the stage. That is map.js's own limit (its S_MAX, twice the finest). On this bench's 715 px
stage at the full tier that is 1.081 radii from the centre: 218 km of ground across the stage, at Blue Marble's
level 6. It is recomputed when the stage or the tier changes.

**She always looks straight down.** The camera stays on the line through the ball's centre. Two fingers no longer slide
the camera sideways: they turn the ball under them.

**Zoom works on the height above the ground**, not on the distance from the centre, so a pinch close in is as gentle as
far out. The wheel and the pinch hold the ground under the pointer, or under the point between the fingers, where it
was. The view is turned to put that ground back under it, by its longitude and latitude, read off the ball. Measured
with synthetic wheel events: no change in the longitude and latitude under the pointer, to the fifth decimal, over four
notches.

**The turn slows with the zoom; this is how.** At the centre of the picture one pixel covers height × 2 tan(fov / 2) / H
radians of ground, where H is the stage's shorter side. Close in, a one-finger turn uses exactly that, and divides the
change in longitude by the cosine of the latitude, so the ground stays under the finger. Far out the rate rises
smoothly to the 180° across the stage it always had (the 2D's rate, reached at the home height and never exceeded), and
the cosine fades out on the way.

How far the ground under the finger moved off it, after a 117 px drag from the centre:

| distance from the centre | ground off the finger |
|---|---|
| 1.1 radii | 0.1 km |
| 1.5 radii | 3.5 km |
| 2.5 radii | 31 km |
| 4.9 radii (home) | 583 km, the 2D's rate on purpose |

The inertia is the same as before.

**Near and far planes, and the depth.** Each frame the near plane is half the height above the ground and the far plane
is the distance to the centre plus 1.2 radii. Nothing is cut away at any zoom; the land and the coast take no depth
test (as since step 1), so nothing can flicker between them. Tilting toward the horizon is not built (open, below).

The gesture code is in `scene.js` under `gesture: 'globe'`. New calls: `lonLatAt`, `setZoomLimits`, and `onGesture`,
which hears 'start' and 'end' for the labels.

## 3. The detail, laid on the ball

**How, and why not as separate patches.** The prompt pictures each tile on its own small patch of the ball. I drew them
through the pieces' own shader instead, because only that way do the tiles ride the plates exactly as the ball's picture
does, at every age, past the seam too.

- Every fragment of a piece finds the true ground under it: the camera's ray meets the unit sphere, and that point is
  carried back into the piece's own frame, to where the ground lies today.
- Every picture, mask and datum is read at that place, through a page table.
- The page table is RGBA bytes on level 6's grid, 128 × 64 cells. For each cell it holds the texture-array layer with
  the finest tile wanted there, the layer under it, and each one's fade.

A patch of the ball fixed in place could not follow a plate, and the pieces' own flat 4° triangles read the picture up to
4 km off the true place. The prompt's model is still what you see: the tiles laid on the ball, piece by piece.

- **Which tiles:** a quadtree from level 0. A tile is split while it would cover more than 610 device pixels (a texel
  under 0.84 of a pixel: map.js's rule), down to the deepest level of the ground and the tier. The tiles wanted are the
  leaves and their parents. They load coarse first, nearest the centre first, six at a time.
- **No holes:** until a tile arrives, the one under it shows, or the ball's own picture.
- **No pops:** a tile that arrives fades in over 0.3 s over the one under it.
- **No shimmer:** where a tile is squeezed (more than 1.5 of its texels to a pixel, toward the limb), it gives way to the
  tile under it, as a mip level would.
- **The limit:** at most 64 picture tiles at the full tier, 48 at middle, 32 at floor, each a megabyte on the card. The
  data tiles have the same limit at a quarter the size: 80 MB of arrays at full. A tile no longer wanted stays held until
  its layer is needed; the least recently wanted goes first.
- **The sea test:** where a tile shows, the sea test reads the tile's own texel. The 2,048-texel mask would lay a band
  of sea twenty kilometres wide over every coast.

**The photograph: a Blue Marble pyramid.**
- **The source:** NASA's Blue Marble: Next Generation, July 2004, land surface (`world.200407`), at 500 m. Eight pieces
  of 21,600 × 21,600 px, 90° by 90° each (A1 to D2), 350.9 MB of JPEG. Downloaded once into
  `cw-deploys/_data/blue-marble/500m/` (ignored, never committed) from
  `assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/july/`.
- **The tool:** `tools/blue-marble-tiles.py` cuts it into the map's tiling: level z is 2^(z+1) × 2^z tiles of 512 px,
  from 180° W and the north. Each piece is resized with Lanczos to its level-6 size, then halved for each level up.
- **One level deeper than the map, and why no deeper.** Level 6 is 65,536 px around, 611 m a pixel; the source holds it
  (0.76 of a source pixel to a tile pixel). A level 7 would be 1.5 times the source and invent detail, so there is none.
- **The sea:** pixels that the Earth's sea test reads as sea are never shown as their own colour, so they are written as
  one flat dark blue, which the test still reads as sea. A tile that is all sea is not written at all. The index
  `blue-marble.json` lists the tiles that exist, as the map's layers do.
- **WebP at quality 86**, as the whole-ball pictures. The build took 1 min 41 s on four processes.

| level | tiles (of) | MB | m a pixel |
|---|---|---|---|
| 0 | 2 (2) | 0.02 | 39,136 |
| 1 | 8 (8) | 0.2 | 19,568 |
| 2 | 32 (32) | 0.5 | 9,784 |
| 3 | 118 (128) | 1.9 | 4,892 |
| 4 | 389 (512) | 6.8 | 2,446 |
| 5 | 1,235 (2,048) | 23.1 | 1,223 |
| 6 | 4,089 (8,192) | 71.9 | 611 |
| all | 5,873 | 104.4 | |

**What a phone and an iPad would load for a typical close view.**
- **iPad at the full tier.** The Alps, 500 km across: 23 tiles, 1.0 MB. Provence at the deepest, 218 km: 12 tiles,
  0.52 MB.
- **Middle tier** (deepest level 4): the Alps at its deepest, 873 km: 10 tiles.
- **Phone at the floor tier** (deepest level 3, the ball's own picture 2,048 px): Europe at its deepest, 1,747 km:
  14 tiles, 0.34 MB.

Each tile is fetched once and kept by the browser.

**NASA's terms, read again at the source today** (`science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/`):
"Anyone using or republishing Blue Marble: Next Generation please credit “NASA Earth Observatory.”" and "Blue Marble:
Next Generation was produced by Reto Stöckli, NASA Earth Observatory (NASA Goddard Space Flight Center)." NASA's media
guidelines, as quoted in step 1's report: material may be used "for educational or informational purposes", and "NASA
should be acknowledged as the source of the material." The bench credits *NASA Earth Observatory* (Reto Stöckli, NASA
Goddard) as before.

**Land lighter** applies to the tiles exactly as to the ball: it is the same line of the shader, applied after the tile
is read.

**The old ground** uses the map's own pyramid tiles as they are: its base times its vegetation layer (multiplied, as the
ball multiplies `world.webp` by `world-vegetation.webp`). It goes to level 5 at the full tier. Its whole-ball picture is
only 2,000 px, so a few level-1 and level-2 tiles load even at the home view (11).

**What depends on height reads the detail too.**
- **What a lowered sea uncovers:** the shelf (to level 5, metres to 130) and the floor (to level 4) as data tiles,
  bilinear and then thresholded, as the map does. Where the shelf has a depth it decides; past it, the floor.
- **The ICE-6G ice:** when the view settles (and 80 ms after the age moves), its two steps are filled again over the box
  in view, 1,024 px square, as the map fills its outlines at the screen's size. "Never below the sea" reads the fine
  depths.
- **Today's coast:** drawn from the map's own contour files at the view's level. Whole files to level 2, one file a
  column from level 3, when the view settles. It replaces the coarse rings only once every column is in, so the coast
  never goes. A view wider than twelve columns (round a pole) takes a coarser level.
- **At 21,000 years over the North Sea** (`21000y-north-sea.jpg`): the bared shelf's edge against the Norwegian Trench
  is drawn from the shelf's level 5, the map's own finest. It is as sharp as the map's and stair-steps at the data's
  2.4 km a texel, as the map's does.

**The paint.** Past the seam the photograph is gone, and so are the tiles (and the data, with the ground's look). Close
in shows the paint at the ball's own resolution, with the rock grain; nothing is invented (`250ma-europe.jpg`). This
side of the seam the photograph fades into the paint as before, at every zoom: the fade is the same line of the shader.

**The pieces.** The tiles ride the pieces: they are read where each point of a piece lies today, as the ball's picture
is. Past the seam no tile is read, so there is nothing to disagree.

### Something I added, which needs your ruling: today's ground under the pieces

Close in, two things from step 4's open items stopped being faint and became plain to see:
- **The gaps between pieces.** Long wedges of open sea cut across Alaska and the Alps. At (152° W, 66° N) no piece holds
  the ground at all. Step 4c's bench shows the same wedges at the same view; I checked this on the committed tree.
- **Land in no piece.** Hawaii and Iceland are in no piece of the plate model, so close in they were open sea.

I first suspected the triangulation of the grown outline, tried a fix, and found the outlines simple and the wedges
unchanged, so I took that back. What I kept instead:
- **The under-ball.** A ball of today's ground is drawn under the pieces, read exactly as the pieces read it: tiles,
  data, shelf, ice. Its land is opaque and its sea clear (no wash), so it shows only where no piece covers the ground.
- **It doesn't ride the plates.** So it is whole to 100,000 years and gone by 300,000. By then the fastest plate has
  moved less than the pieces' bloat (0.26°), so no coast is drawn twice.

Result: no wedges, and Hawaii and Iceland show (`today-hawaii.jpg`, `21000y-bering.jpg`). It costs about 2 ms a frame
close in. Before 300,000 years it is a departure from "the pieces are cut-outs": in that span you see today's ground
wherever it is. Michael to rule; it is one mesh (`under`, `makeUnder`) and easy to take out.

## 4. Marks and labels on the ball

**What is placed.** The dozen cities and the 46 places of `stories/places.json` with their weights.
- **Places** are carried by the plate whose piece holds them today. That is `globe.js`'s `plateAt`, copied; this is
  what the map's deep views do. They are shown while that piece lives, fading over the twenty million years before its
  birth, as the cities do.
- **Cities** are drawn as the Time Machine hands them to the map: minor, a grey dot, 14 px, and **no halo**, by your
  ruling of 13 Oct, which is the map's rule. The prompt says "with the halo"; I followed the map's rule. The places
  have the halo.

**How.** map.js's placer is copied line for line: the eight sides and their order, the scoring on the ground's
evenness and the dots' crowding, heavier marks first, the lesser giving way, a label that would collide dropped. Labels
are fixed in screen pixels. The halos are drawn in one layer under every glyph, at the halo's alpha, on a canvas over
the stage.
- **During a gesture** every label keeps the side it had, or stays dropped, and only moves with its point, so nothing
  jitters under her finger.
- **When the view settles** the ground is read once, small: a 400 px drawing of the view, as map.js reads its tiles.
  Then every label is placed afresh.
- **The far side** is hidden.
- **More places appear as she zooms:** 17 named of 35 in view at the home view; the Low Countries' cluster opens up
  close in.

Paris appears twice, the place and the city, as it would on the map if the Time Machine gave it both.

**Vermilion over the photograph's reds.** None of the map's places lies over the Sahara or Australia, so the bench has
`cwTestMarks()`. It adds a dozen bench-only places there, drawn exactly as the map's places are: Timbuktu, Agadez,
Tamanrasset, Faya, Kufra and Siwa; Alice Springs, Uluru, Coober Pedy, Broome, Kalgoorlie and Tennant Creek. What I see:
- **Over Australia's red centre** (`today-australia.jpg`) the vermilion dots nearly vanish: Alice Springs, Uluru and
  Coober Pedy sit on ground within a few shades of the dot. The names hold, because of the halo.
- **Over the Sahara** (`today-sahara.jpg`) the dots read, but weakly where the sand is orange (Kufra, Faya). They read
  well on the paler sand (Tamanrasset, Agadez).

This is where *no red on the earth* breaks against the photograph, as the spec said it might. Spec-Maps changes when you
settle it: a darker ring round the dot, a different dot over a photograph, or leave it.

## 5. Seams and poles, close in

- **Where pieces meet.** Inside the land, the gaps were the seams that showed (§3, the under-ball). With it, the Alps at
  full zoom show nothing at the join (`today-seam-como-deepest.jpg`, 210 km across).
- **The sea.** The pieces' wash still shows their outlines as lighter polygons over the open sea, and close in it is
  plain: round Japan it is the first thing you see (`today-japan.jpg`). That is step 4's open item; I didn't change it.
- **Tile edges.** Between Blue Marble tiles I can't see an edge at any zoom. Each tile is filtered only within itself,
  so at most half a texel at the join goes unblended. On the old ground the map's own tiles show a faint line at some
  tile edges (`today-alps-old-ground.jpg`, low left); the map shows the same.
- **Thin lakes.** Narrow lakes come out in pieces: Lake Como's arms, a few texels wide, mostly read as land. The sea test
  sees blended texels at their edges.
- **The South Pole** (`today-south-pole.jpg`, `-deepest.jpg`) is white, with Blue Marble's own smear along the
  meridians; that is the equirectangular picture's, and no finer level would show more. Every column of the tiling meets
  at a pole, so a polar view wanted the whole ring of a level: 96 tiles at level 5, over the limit, and the view went
  partly coarse. Tiles that touch a pole now stop at level 4, a ring of 32. There is no hole or pinch at the pole.
- **The far side** is hidden at every zoom; the near plane never cuts the ground.

## 6. Tiers and memory

| tier | deepest level (Blue Marble / old ground) | nearest view on the bench's stage | tiles held at most |
|---|---|---|---|
| full | 6 / 5 | 218 km (1.081 radii) | 64 |
| middle | 4 / 4 | 873 km (1.32) | 48 |
| floor | 3 / 3 | 1,747 km (1.65) | 32 |

The kept picture is made at full, as before (it uses the live tiles).

**Memory at the deepest view (full tier, Chromium on the M1 Pro):**
- **Tiles:** 12 to 23 picture tiles held at a typical close view, up to the limit of 64 after wandering. The arrays are
  80 MB on the card, and the same again in the page as their copy for three's per-layer upload.
- **The page's JS heap:** 193 MB at opening, 276 MB after the close views.
- **On the card, my estimate:** Blue Marble's 8,192 px picture with mips ~171 MB, the arrays 80 MB, the floor 8 MB, the
  meshes and masks a few tens: about 300 MB.
- **Together:** about 0.6 GB, inside the iPad's 1 GB, but not measured on the iPad. The arrays' page copy is the one
  thing I'd cut if the iPad is tight.

## Measured, on the Mac in the pane (M1 Pro, Chromium, WebGPU unless said)

**The cost of a frame**, drawn off-screen at 1402² device px and waiting for the card:

| view | this step | step 4c |
|---|---|---|
| the Alps at 500 km | 13.3 ms | 10.2 ms (the same view, on the committed tree, with no tiles) |
| home | 13 ms | 9.8 ms |

The under-ball is about 2 ms of the difference; the land's reads at the true ground, the page table and the tiles are
the rest. A first try that worked the ground's place out again for every texture cost 22.5 ms; computed once a pixel, it
is as above.

**The frame rate while zooming**, at the full tier (1430² device px). From the whole ball (4.9 radii) to the deepest
(1.081) and back, 91 frames each way, each frame doing the close-in work (tiles wanted, page table, marks) and the
drawing, timed to the card's finish, with the tiles arriving meanwhile:

| | mean | median | p95 | worst |
|---|---|---|---|---|
| in | 15.6 ms | 16.2 ms | 18.7 ms | 23.9 ms |
| out | 14.4 ms | 14.6 ms | 17.8 ms | 19.5 ms |

The worst on a page's first zoom was 81 ms (shaders and first uploads). That is about 64 frames a second if nothing else
ran: holding 60 on the Mac, with little room. The tier timer will drop the iPad a tier if it can't hold the rate.

**How long the first close view takes to fill, cold** (`?cold=1`, every tile past the browser's cache, from the local
server):

| view | time | tiles | size |
|---|---|---|---|
| the Alps at 500 km | 124 ms | 23 | 1.0 MB |
| Provence at the deepest | 129 ms | 12 | 0.52 MB |

Over the network add the transfer: about half a second for 1 MB at 20 Mbit/s.

**WebGL 2** (`?gl=1`): the tiles, the data, the local ice and the coast load and draw the same
(`gl-21000y-bering.jpg`), with no console errors.

**Two faults found and fixed on the way:**
- The empty placeholder arrays and the empty floor were nearest-filtered. three then declared their bindings without a
  sampler, and the first shader build failed for a moment. They are linear now.
- A whole tile's corners can be just two points (the poles). The tile's size on the screen then measured zero, and the
  old ground never split its tree. The size is now the sum of four quarters.

**The bench's checks** use calls that are bench only, listed in MANIFEST: `cwGo`, `cwWait`, `cwShot`, `cwMapAt`,
`cwZoomBench`, `cwTestMarks`, `cwSave` (to a picture server on port 8771 for this session). The pane runs no frames
while a script waits, so the checks call `earth.step()` themselves. The WebGL readback hangs while the pane is hidden, so
the WebGL picture was taken with the pane showing.

## The pictures (Earth-3D-Close-Oct28/, small JPEGs, 768 px)

Blue Marble, land lighter 100, seed 1234, the full tier, the old globe hidden, today unless said:
- `today-alps.jpg` and `today-alps-map.jpg`: the Alps at 500 km, the Earth and the map (map.js, drawn from its own
  tiles, canvases and marks) at the same place and scale. The map's S is 109.86 px a degree of longitude, as wanted.
- `today-provence-arles.jpg` and `today-provence-arles-map.jpg`: Provence round Arles at 310 km. That is the map's own
  deepest (its S_MAX, 182.0 against the 185.4 wanted, 1.8% apart); Arles and Saint-Rémy fall on the same pixels on both.
  The Earth goes twice as far in: `today-provence-arles-deepest.jpg`, 218 km.
- `today-nile-delta.jpg` (400 km), `today-hawaii.jpg` (450 km), `today-japan.jpg` (1,100 km),
  `today-south-pole.jpg` (600 km) and `today-south-pole-deepest.jpg` (210 km).
- `21000y-north-sea.jpg` (900 km) and `21000y-bering.jpg` (1,500 km); `gl-21000y-bering.jpg` the same on WebGL 2.
- `250ma-europe.jpg`: 1,500 km over Paris's plate, the paint close in.
- `today-sahara.jpg` and `today-australia.jpg`: 3,000 km, with the test marks.
- `today-alps-old-ground.jpg`: the old ground on the map's tiles.
- `today-seam-como-deepest.jpg`: where pieces met in a gap, at full zoom.
- `today-home-lift100/150/200.jpg`: step 4d. The Sahara's test marks are on these too.
- `tier-middle-alps-deepest.jpg` and `tier-floor-alps-deepest.jpg`: each tier's nearest view.
- `pair-old-globe-hidden-home.jpg`: `cwPair` with the old globe hidden.

## What needs Michael's eye

1. **Close in at real detail** (the Alps, Provence, Japan, the Nile) on the iPad: is level 6 the detail you wanted?
2. **The under-ball** (§3): today's ground under the pieces to 300,000 years, filling the gaps and showing Hawaii and
   Iceland. Keep it, or not.
3. **The wash's polygons over the open sea**, close in (Japan). Step 4's open item, now prominent.
4. **Vermilion over Australia's red centre** (§4).
5. **The cities' labels without a halo** (your 13 Oct rule, the map's) beside the places' with one; and Paris twice.
6. **Land lighter:** 100 is the default now; 150 or 200?
7. **The turn's feel by finger:** the ground under the finger close in, the 2D's speed far out.
8. **The stage's size:** 1.8×, its bottom a little below a laptop's window.

## Open, named and left open

- **Tilting toward the horizon:** she always looks straight down.
- **What close in should show in the past, and whether today's cities belong there.** Built here: the paint at the
  ball's resolution, the places and cities riding their plates.
- **The probe:** waits for Drain the Sea (step 9).
- **Contours on the ball:** only the 0 m coast is drawn, as before; the −200 m line and other contours are not.
- **The story pages' maps moving onto the Earth** (step 9).
- **Not checked:** the iPad (memory, frame rate, finger).

## Files

- `cw-deploys/js/3d/earth.js`: the true ground in the land's shader. The tiles: holders, arrays, page table, quadtree,
  loads, fades. The data tiles, the coast's detail, the ice filled over the view, the under-ball, the marks by map.js's
  placer, the zoom limit by tier, and the new calls (`settle`, `step`, `tiles`, `marks`, `addMarks`, `resetFill`).
  `setLandLift` to 2. The header's *Close in* section.
- `cw-deploys/js/3d/scene.js`: the globe gesture close in (zoom by height, held at the pointer, two fingers turning,
  the turn slowing, the near and far planes), with `lonLatAt`, `setZoomLimits`, `zoomLimits`, `zoomTo` and `onGesture`.
  The trackball is unchanged.
- `cw-deploys/experiments/earth-3d.html`: *old globe* and the larger stage, the fine slider's window, land lighter
  100 / 200, `marksHost`, the readout's close-in line, the bench's checks. Stamp `2026-10-28 b1a514c · earth-3d step 5`;
  `earth.js?v=2026-10-28n`, `scene.js?v=2026-10-28e`.
- `cw-deploys/art/globe/tiles/`: 5,873 WebP tiles and `blue-marble.json`, 104 MB.
- `tools/blue-marble-tiles.py`: the tool that made them.
- `cw-deploys/MANIFEST.md`, `cw-deploys/experiments/index.html`, `CWVault/00-BOARD.md`: the entries.
- `CWVault/claude/Earth-3D-Close-Oct28/`: the 24 pictures. `Prompt-Build-Earth-Bench-05.md` and
  `Prompt-Revise-Earth-Bench-04d.md`: status lines.
