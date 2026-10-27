---
status: Report — the first Earth bench, built 27 Oct 2026 (late morning) to Michael's prompt Prompt-Build-Earth-Bench-01.md; checked in the pane on the Mac; not committed until Michael says so
role: What was built for step 1 of Spec-Earth-3D's Getting there, what was measured, what the two engines agree on, what still shows, and what needs Michael's finger on the iPad
related: Spec-Earth-3D.md, Audit-Earth-3D.md (§3, §9, §11), Standard-Interactives.md, Report-3D-Shelf-Oct26.md, Report-Revise-3D-Shelf-01.md, cw-deploys/js/3d/earth.js, cw-deploys/js/3d/scene.js, cw-deploys/experiments/earth-3d.html, Earth-3D-Bench-Oct27/ (the fifteen pair pictures)
updated: 2026-10-27
---

# Report: the first Earth bench (27 Oct 2026)

Michael's prompt: step 1 of the spec's *Getting there* — one new page beside the Time Machine, nothing a child can see
changed. Built in Claude Code on the Mac after the shelf's alignment commit (`c87809e`, 27 Oct morning), on the shelf as
that commit left it. `globe.js`, `map.js`, the Time Machine and every story are untouched; the Time Machine and the Sun
bench open as before (checked). **Not committed.** The pair pictures are in `Earth-3D-Bench-Oct27/`, fifteen JPEGs,
`pair-A-0.jpg` to `pair-C-1000.jpg`: A is the home view (lon 20, lat 15), B the Americas (−95, 35), C Australia and
Antarctica (130, −60), each at 0, 100, 250, 540 and 1,000 million years, the 3D on the left and `globe.js` on the right,
with each engine's own city positions marked in vermilion from its own projection.

## What was built

**1. The desk-globe turn, in `scene.js`.** An option, `gesture: 'globe'`; the Sun keeps the trackball. The ball's
quaternion is a tilt about the camera's right (the latitude at the centre, clamped to ±90°) times a spin about the camera's
up (the longitude), so north is up at rest, the tilt stops when a pole faces her, and a drag to the right moves the surface
east whatever the tilt because the spin is about the ball's own axis. The view is a longitude and latitude at the centre of
the picture, as `globe.js`'s: `view.turnOf()` reads it, `view.turnTo(lon, lat)` sets it without the callback (so the bench can
follow the other view with no loop), `onTurn(view)` fires for a finger, the inertia and *Reset view*, which eases home the
short way round. The inertia is the trackball's, unchanged in both. No idle turn: `turn` already defaults to 0 since the
alignment. Also in `scene.js`: `phone: 'run'` (section 8) and the texture limit, `view.maxTexture` from the device (WebGPU's
`maxTextureDimension2D`, WebGL 2's `MAX_TEXTURE_SIZE`) with `view.fitTexture(px)`, which halves a wanted size until the device
allows it (the audit's §9). Checked by synthetic pointers: a 120 px drag right lowered the longitude at the centre; a 400 px
drag up took the latitude to −15.8°, a 900 px drag down to +90 and no further; a drag left at the pole still spun; after a
tilt to 54.7° the north pole projected 0.3 px off the vertical through the centre; pinch took the camera from 4.9 radii to
1.5 and two fingers moved the view, both with the turn unchanged; a drag on the 2D disc turned the 3D to the same numbers.

**2. The pieces as meshes, in `js/3d/earth.js`.** From `continents.json` as it is. Each ring of each piece is projected
onto the plane touching the sphere at the ring's centre (azimuthal equidistant: Antarctica's ring round the pole and a ring
across the dateline become plain polygons; the slit a ring makes running down the dateline to the pole and back up the same
meridian is collapsed first — East Antarctica is the one ring that does it), carried outward by the same 0.26° as the 2D
raster's gap-closing stroke (`BLOAT_DEG`), ear-clipped by three's `ShapeUtils`, and every triangle edge longer than 4° is
split at its midpoint on the sphere — the longest edge first, so a shared edge splits the same way on both sides and no
crack opens; a 4° triangle sags 0.06% of the radius. Texture coordinates are today's longitude and latitude, unwrapped within
each triangle; a vertex on a pole takes the others' mean longitude. The pieces of one plate are one mesh, in file order,
with each piece's birth and end as vertex attributes (`born`, `ended` — `from` and `to` are WGSL's reserved words, which the
first load found). Each frame the mesh takes its plate's turn at the age, read exactly as `plateMatrixAt` reads it:
`quat`, `slerp` and the sample search are copied from `globe.js` and return the quaternion instead of its matrix. The whole
Earth sits in a group that maps `globe.js`'s frame (x toward longitude 0, y toward 90° E, z north) onto the ball's (x east,
y north, z toward the viewer), so the engines share one convention.

| | |
|---|---|
| Pieces, rings, points | 795, 797, 5,058 |
| Plates with pieces (meshes) | 416 |
| Triangles after subdivision | 13,909 |
| Triangulation at load | about 30 ms on the M1 Pro when the page opens at full tier (29, 32, 33, 34 ms over four loads); 215, 226 and 311 ms on the three loads that opened at the floor tier, which I cannot explain from the code (the triangulation does not read the tier) and did not chase |
| The plate file arriving | 15–30 ms, cached |

**A tool to write the triangles once would not be worth it**: 30 ms is under two frames, and the triangles depend on
three numbers (the bloat, the edge limit, the pole rule) that step 2 may still move. If the count ever grows past a few
hundred thousand (the ice outlines as polygons, the shelf bands) that changes.

**Overlaps and the far side.** The land is drawn after the sea with no depth test and no depth write, each plate's mesh at
a `renderOrder` that keeps the raster's order (plates in the order of their first living piece in the file, pieces within a
plate in file order, recomputed at each age), so where pieces overlap the later paints over the earlier as the raster's last
fill wins, and nothing fights for a depth. The far side goes by its facing (every triangle is wound outward), and a triangle
is a chord inside the sphere, so nothing stands past the limb. A piece not yet born, or ended, is discarded in the fragment
shader by its attributes. Under the pieces the sea is a ball of its own at the same radius, in `globeSea`.

**3. The ground, two ways.** Both carry today's picture at every age; the line under the stage says *bench only: today's
ground carried back in time*. The old ground is `art/maps/world.webp` multiplied by `world-vegetation.webp` as `globe.js`
does, both read as display values and the product converted once (`sRGBTransferEOTF`), so the multiply matches the 2D
canvas's. Blue Marble: NASA's *Blue Marble: Next Generation*, the land-only base map over a plain sea, **July 2004**
(`world.200407`), a northern summer month: the seasonal snow is least; Greenland and Antarctica stay white, which is true.
Downloaded once from `assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/july/world.200407.3x21600x10800.jpg`
into `cw-deploys/_data/blue-marble/` (ignored by git, never committed): 21,600 × 10,800, **21,125,326 bytes**. (Visible
Earth's old addresses now redirect to science.nasa.gov; the 21,600 PNG the audit priced at 179 MB is no longer offered
there — the choices are JPEG and GeoTIFF.) Resized with Lanczos, WebP quality 86, into `art/globe/`:

| file | pixels | bytes |
|---|---|---|
| `blue-marble-july-8192.webp` | 8,192 × 4,096 | 1,936,084 |
| `blue-marble-july-4096.webp` | 4,096 × 2,048 | 555,966 |
| `blue-marble-july-2048.webp` | 2,048 × 1,024 | 166,734 |

Chosen by the tier (full, middle, floor) through `fitTexture`, so a device that refuses 8,192 gets 4,096. In the pane
the WebGPU backend reports 8,192 as its limit (Chromium's default without asking for more) and WebGL 2 reports 16,384. The
bench reads the Blue Marble textures at 8,192 at full: the 134 MB on the card plus mipmaps, well inside the 1 GB budget.
The old ground is the default when the page opens, so the two stages look alike; *Blue Marble* is a word away (`?ground=blue`
opens on it). Credit *NASA Earth Observatory* under the page and on the kept picture.

**NASA's terms, read at the source.** The Earth Observatory's Blue Marble: Next Generation page
(`science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/`): "Anyone using or republishing Blue Marble: Next
Generation please credit “NASA Earth Observatory.”" and "Blue Marble: Next Generation was produced by Reto Stöckli, NASA
Earth Observatory (NASA Goddard Space Flight Center)." NASA's media usage guidelines
(`nasa.gov/nasa-brand-center/images-and-media/`): "You may use this material for educational or informational purposes";
NASA content "generally are not subject to copyright in the United States"; "NASA should be acknowledged as the source of the
material." No key, no server, no condition beyond the credit. The old Visible Earth image-use page redirects to the Earth
Observatory's front page now, so the sentences above are the ones on the pages that serve the files.

**4. Light.** `Lit` is one soft light from the upper left in the camera's frame (so it stays put as the ball turns), the
shade 0.38 on the night side rising to 1 across a soft terminator; `even` is no light. Both are one uniform in the land's and
the sea's shaders. Michael chooses by looking; the bench opens even (`?light=lit` opens lit).

**5. Seams, overlaps and poles.** What I did: the bloat (the raster's), the shared-edge subdivision, the painter's order,
no depth test. What shows and what does not, read in the pair pictures at 768 px and close in on Europe at 1.4 radii:
no hairline between neighbouring pieces at any view or age; nothing flickers between overlapping pieces during a turn,
by construction (there is no depth comparison to flicker); the north and south poles draw whole, East Antarctica with no hole
and no pinch (view C at every age); the limb is clean with the land ending where the sea ends — measured, not eyeballed: the sea alone, the land alone and both together drawn into a 768 px picture and read along eight rows, the rightmost non-parchment pixel is the same column for the sea and for the land in every row (one row differs by one pixel), so neither stands past the other. What still shows, and is not
a seam: today's inland seas and shelves inside the pieces show as the picture's own blue (a lighter blue than the sea ball
under the old ground; NASA's plain sea under Blue Marble), including thin blue slivers along every coast where the bloat
carries the outline 0.26° past the land — the 2D paints those as the translucent shelf wash through its sea mask, which is
step 2's. Two faults were found and fixed on the way: `from` as an attribute name broke the WebGPU shader (renamed); and with
a depth test and the sea a hair inside the land, the sea at 0.9995 of the radius left a hairline of land past the sea's
edge at the limb, and at 0.9999 WebGL 2 in the pane broke the land into blotches of sea (24-bit depth, but the gap is under
its resolution at 4.9 radii) — so the land takes no depth test and the sea sits at the same radius.

**6. The cities.** The dozen of `cities.json`, each carried by the plate the file names, placed by projecting from the
ball through its mesh, hidden when the surface faces away, fading over the twenty million years before its ground's birth,
absent before. HTML over the stage: a 3 px dot in `greyDot` (the Time Machine's minor place dot) and the name at 14 px in
Georgia with the map's halo (`halo` at 0.7, 3 px). One thing to know: the Time Machine's cities have had **no halo** since
Michael's ruling of 13 Oct (`map.js`: "a city's name: 14 px, no halo"); the prompt asked for the halo and the bench has it.
Another: the Time Machine carries a city through `placeAt`, which finds the piece under the point today; San Francisco lies
in no piece, so there it stays at home at every age, while the bench pins it to North America (plate 101) as `cities.json`
says it should. The other eleven agree exactly (below).

**7. The bench.** `experiments/earth-3d.html`, page standard, Georgia, parchment. Two square stages side by side at the same
size: the 3D Earth on the left (the camera at 4.9 radii with a 24° field, so the ball fills the square as the 2D disc of
radius W/2 − 4 does), `cwGlobe` on the right as the Time Machine mounts it (textures on, the default files), both at the same
age and turned to the same longitude and latitude; a turn on either turns the other. One slider for the age, 0 to 1,000,
driving both. The left column: *Blue Marble / old ground*, *Lit / even*, *Reset view* (the shelf's), and *Keep this
picture* (the still at 4,096 px, the age as its caption, the ground's credit) — added because the prompt asks for the credit
on the kept picture. The readout in small grey type: backend, tier, frame rate, the triangles and their build time, the
Blue Marble size and the device's limit. No timeline, no story words. Bench only: `?ma=`, `?ground=blue`, `?light=lit`,
`?log=1`, `?no3d=1`, `cwBench(tier)` and `cwPair(px)`.

**8. Phones.** `phone: 'run'`: a phone runs the page at the floor tier with every gesture and no message, and only a device
whose 3D view cannot start (`cwScene` throws: no WebGPU and no WebGL 2) gets the still, `art/globe/earth-3d-still.webp`
(1,600 px, made by the bench itself: today, the home view, the old ground, even), with the line *This one needs a newer
device.* — my wording, since the standard's line is about the screen's size. Checked at 375 × 812 in the pane: the tier
reads floor with Blue Marble at 2,048, *Reset view* is there, no "bigger screen" message, the stages stack under the words
and the slider; `?no3d=1` shows the still and its line.

## Measured on the Mac (M1 Pro, the browser pane, Chromium)

The pane's on-screen frame rate is not a measure here: it presents a WebGPU canvas at 1–4 fps, and it draws no frames at
all while a script drives the page (so a frame rate during a scripted turn or slider drag reads 0 on both backends, and the
inertia cannot run under a script). As the Sun bench does, the Earth carries `cwBench(tier)`: thirty frames off-screen at
the canvas's size, **the age moving a million years every frame** (so every plate's turn is read and every mesh's order
recomputed each frame, as a drag of the slider does), waiting for the card to finish each:

| tier | pixels | WebGPU, ms a frame | the rate that would give |
|---|---|---|---|
| full | 780 × 780 | 5.94 | 168 |
| middle | 585 × 585 | 6.37 | 157 |
| floor | 390 × 390 | 5.31 | 188 |

The cost does not fall with the pixels: it is the 416 turns and the 416 draw calls, not the shading. That is a JavaScript
cost a turn without the age moving does not pay. On WebGL 2 the readback waits on `requestAnimationFrame` and the measure
cannot see under a display refresh (the shelf report's finding), so there is no WebGL number from the pane.

**The two engines agree.** At every age and view the position each engine carries a city to was compared in degrees
(`earth.placeAt` against `globe.js`'s `placeAt`): **0.000° for eleven cities at 0, 100, 250, 540 and 1,000 million years**
(San Francisco apart, above). In the pair pictures the marks differ by up to 39 px of 768 (5%), which is the projection: the
3D ball is seen in perspective from 4.9 radii, the 2D disc orthographically from infinity, so a point 60° from the centre
sits at 0.94 of the radius on the ball and 0.87 on the disc. By eye the pictures match in every pair; the 3D is the sharper
(the ground read at 2,000 px and 8,192 px against the 2D's 1,024 px skin at half resolution).

**Also checked:** both backends draw the same picture (`?gl=1`); the gestures (section 1); the phone (section 8); the
still; the page-standard check (no errors); the Time Machine and the Sun bench open unchanged, no console error.

**Not checked:** the iPad, at all; WebGPU in Safari; the heat; a machine slower than the M1 Pro; any on-screen frame rate
during a turn. One thing seen: with no `?tier=` the pane's slow presentation of a WebGPU canvas made the tier test drop
the page to the floor on its first load, and sessionStorage then opened every later load there — the shelf report's
finding again, the pane's and not the Earth's, and the first thing the iPad answers.

## What needs Michael's finger on the iPad

1. **The feel of the turn** — the gain (1.8 radians across the stage's shorter side, the shelf's; the 2D disc moves 180°
   across its width, so the 2D is a little quicker under the finger), the inertia, the stop at the poles.
2. **The frame rate at full tier** on the iPad, with the slider dragged and with a turn: the Mac's card does a moving frame
   in 6 ms; the iPad's is the number that matters, and the 60 fps the standard asks for.
3. **The heat** over ten minutes, with Blue Marble at 8,192 on the card.
4. **The light**: lit from the upper left or even. The spec leaves it open; the bench opens even.
5. **The photograph against the old ground**: the spec's open question, now lookable. The bench opens on the old ground.

## Open, named and left open (the spec's, and the bench's)

- **The sea mask and the shelf wash** (step 2): the picture's inland seas and the bloat's slivers show as blue inside the
  pieces; the 2D paints them as the translucent shelf wash. The look by age, the dissolves, the island and the drowned band,
  the deep ice and the molten sequence are step 2.
- **The limb shading and the haze**: the 2D darkens the rim and puts a halo at it; the 3D ball has neither yet.
- **The 2D's sea** is a radial gradient; the 3D's is flat `globeSea`.
- **San Francisco**: the Time Machine does not carry it (above); whether `map.js` should read a pinned plate from
  `cities.json` is a Time Machine question, not the bench's.
- **The halo on the cities' names**: the prompt's halo against the 13 Oct ruling of none.
- **Which month of Blue Marble**: July is a choice, named; the blend and the seasons are still open.
- **The drag's gain** on the 3D against the 2D's.
- **A bench on phones**: the Earth runs on phones by the spec; the standard still says no 3D on phones. The bench follows the
  spec, and the standard's §1 would need a line.
- **`earth.js` as a shelf file.** The prompt names a page; the engine is in `js/3d/earth.js` so step 8's swap (`map.js`
  making the Earth instead of the globe) has a thing to call, and the page stays a page. The spec's list of shelf pieces does
  not name it.
- **The version stamp**: the page's `CW_VERSION` carries `c87809e`, the commit it was built on; the shelf imports are at
  `?v=2026-10-27c` (`scene.js` changed; `earth.js` new); the Sun and shelf benches still import `scene.js` at `?v=2026-10-27b`
  and are unchanged.

## Files

- `cw-deploys/js/3d/scene.js` — changed (the options above; everything else as `c87809e` left it).
- `cw-deploys/js/3d/earth.js` — new.
- `cw-deploys/experiments/earth-3d.html` — new; listed in `experiments/index.html`.
- `cw-deploys/art/globe/blue-marble-july-8192.webp`, `-4096.webp`, `-2048.webp`, `earth-3d-still.webp` — new.
- `cw-deploys/MANIFEST.md`, `CWVault/00-BOARD.md` — the entries; `CWVault/claude/Earth-3D-Bench-Oct27/` — the fifteen pairs.
- `cw-deploys/_data/blue-marble/world.200407.3x21600x10800.jpg` — the source, ignored, not committed.
