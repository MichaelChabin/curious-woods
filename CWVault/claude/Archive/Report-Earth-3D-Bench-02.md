---
status: Report — the second Earth bench, step 2 of Spec-Earth-3D's Getting there (the look by age), built 27 Oct 2026 (afternoon) to Michael's prompt Prompt-Build-Earth-Bench-02.md; checked in the pane on the Mac; NOT committed — Michael reads, looks on the iPad, says commit
role: What was built for the look by age — the photograph's sea, the fade to paint and the two paints, the islands, shelves and dissolves, the deep ice, the rim — what was measured, where the 3D and the 2D still differ and why, and what needs Michael's eye on the iPad
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-01.md, Audit-Earth-3D.md (§1, §5), Standard-Interactives.md, cw-deploys/js/3d/earth.js, cw-deploys/experiments/earth-3d.html, cw-deploys/js/globe.js (paintSkin, buildSeaMask, shrunk, shelfRim, drownedBand, dissolvePieces, paintIce), Earth-3D-Look-Oct27/ (the pictures)
updated: 2026-10-27
---

# Report: the Earth bench, step 2 — the look by age (27 Oct 2026)

Michael's prompt: on the same bench, with the 2D globe still beside it, give the pieces the look by age the 2D globe has,
with two changes the spec rules — the photograph's sea as the shelf wash, and the photograph fading to paint by 2.6 million
years — and the rim that makes it a ball. Ages stay 0 to 1,000 million years. Built in Claude Code on the Mac on
`15fe8e5` (the first bench with his rulings). `globe.js`, `map.js`, the Time Machine and every story are untouched; the
Time Machine and the Sun bench open as before, no console error (checked). **Not committed.** The pictures are in
`Earth-3D-Look-Oct27/`, fifty JPEGs, 5.3 MB, named below. Everything the look does is in one new shader on the pieces,
one on the sea, one on the shelf rims and one on a thin shell for the haze, every number `globe.js`'s; the file's header
says how.

## What was built

**1. The photograph's sea.** A sea mask is built once at load from each picture's own pixels, at 2,048 × 1,024, as
`buildSeaMask` builds the 2D's at 1,024 × 512: for the old ground, the product of `world.webp` and its vegetation as the
2D multiplies them, a texel sea where blue leads red by a fifth and leads green. For Blue Marble the same test, **or** the
channels summing under 70 with blue at least red — because the land-only Blue Marble paints the open sea one flat
near-black (3, 5, 20), but round the Arctic its JPEG leaves blocks of other dark blues (the Chukchi (9, 21, 31), the
Laptev (8, 14, 28)) and the East Siberian Sea is grey sea ice (76, 92, 103), which the first test alone caught and a
near-black test alone did not: the first try, near-black only, left black blocks across the Arctic shelf pieces, found
close in at the dateline. The old ground's test on its own catches the sea ice too. Checked in Python over the whole
picture: the Arctic seas, the Baltic, the Kara, Hudson Bay, the lakes all sea; Greenland's and Antarctica's ice, the
Himalaya, the Andes, the Congo's dark forest all land; 113 isolated sea speckles in two million texels. The mask's sea
share: 0.6487 for Blue Marble, 0.6544 for the old ground (ETOPO's coast against the photograph's; the Ross and Filchner
ice shelves are white land in the photograph).

Under a piece, sea in the picture — an inland sea, a lake, and the bloat's 0.26° sliver past every coast — is painted as
the 2D paints it: the shelf wash (`shelfWash`) blended in by the mask, the fragment's alpha falling to `shelfWashAlpha`
(0.55) over the globe's own sea, never the picture's colour. **The black band is gone** on Blue Marble at every coast
(`close-0-atlantic.jpg`, Brazil's coast at 2.6 radii; `pair-A-0.jpg`), and the Mediterranean, the Red Sea, the Gulf,
the Black and Caspian seas, Hudson Bay and the African lakes read as the pale wash the 2D gives them. As the old look
comes in over the eight million years before the reach the mask fades out of the pieces (the 2D's `oldT`), so by 1,000
the drowned band is the only wash.

**2. Photograph to paint, by 2.6 million years.** At today the picture; going back it fades linearly to paint, gone at
the seam — never a snap (the slider's first fifty positions cover it, below). Two paints, a pair of words on the bench
(*photograph painted / green and rock*, `?paint=green` opens on the second):

- **The photograph painted:** today's picture taken down to 1,024 px wide, each texel the mean of the *land* under it
  (the sea left out, so no dark bleeds into the coast), the sea filled in six texels out from the land beside it (about
  2°, past the bloat and most inland seas), blurred twice with a five-tap box across and down (about 0.7°), desaturated
  by 0.15 and lifted 0.12 of the way toward a pale (236, 230, 214); its colours kept. Built once per picture at load from
  the 2,048 px file whatever the tier shows, with the mask, in 130–220 ms warm (1.2–1.8 s on a cold load in the pane,
  below). The four numbers (width, fill, blur, wash) are constants at the top of `earth.js`, for Michael's eye.
- **Green and rock:** one quiet green, `paintGreen` (#9aa882, new in `cw-style.js`, a candidate), lit by the rock grain
  as the bare rock is (0.8 to 1.2 by the grain), with a fifth of the rock's own colour under it; no pattern of today's
  deserts and forests. The green is my choice: a sage between the old ground's forest (176, 190, 149) and its darker
  tree cover; nothing in `cw-style.js` named a vegetation green before.

Then the old rule unchanged: bare rock — the grain grey to tan, rusty where the cooling map runs above 0.55, lit by the
grain — blending in from 300 to 450 as the plants go, exactly `paintSkin`'s `tp`; no green before 450. The near-black
crust before oxygen (2,300–2,500) is not built: it lies past the slider and waits for step 3.

**3. The islands, the shelves, the dissolves**, all on the 2D's one ramp (its `tg`: the eight million years before the
model's reach, 992 to 1,000), same ages and strengths:

- *The softened outline.* `pieceRings` softens a piece's outline over the same ramp with two Chaikin passes. Each
  vertex of a mesh carries a second position, where those two passes leave its corner — the mean of the corner six
  times and its two neighbours once — and the vertex shader mixes between the two by the ramp. The corners move exactly
  as the 2D's; the edges between them are straight where the 2D has two more bends, a sag under a twentieth of a degree.
- *The shelf rim.* The 2D strokes every outline 4.4° wide in the wash at `shelfRimAlpha` (0.38) under the crust. Here a
  second geometry per plate: a quad along each edge of the softened outline and a disc of sixteen segments at each
  corner (90,846 triangles for the 5,058 corners, in the same build), each vertex a base point on the outline and a unit
  direction along the surface, carried 2.2° out in the vertex shader. Drawn **opaque**, in the sea's own colour mixed
  with the wash at the rim's strength (then the ice and the limb shading as everything), after the sea and before every
  piece, so where quads and discs overlap the pixel is painted once and the inner half lies under the crust as the
  stroke's does. The rim meshes are visible only while the ramp is above zero (and so cost nothing at other ages).
- *The drowned band and the island.* `drownedBand` washes the band between outline and island at `drownedWash` (0.3)
  and lifts the island with `islandLift` at 0.16. Here the piece's own shader lays the drowned wash over the whole piece,
  and a second mesh on the same triangles — the island — draws the piece shrunk toward its ring's centre by the square
  root of the land's share of the crust (`exposedShare`, from `crust-and-land.json`, as `shrunk` does), in its vertex
  shader, with the lift in place of the wash and the picture read at the shrunk point (as the 2D's lift lies over the
  skin under it). The island is drawn right after its plate's piece, so the band is the piece minus the island.
- *The dissolve.* A piece being born mixes toward the sea's colour over the eight million years before its birth (and
  after its end), the fragment going opaque as it does, which hides the inner half of its rim exactly as the 2D's sea
  cover does; its rim fades in with it. 132 pieces are born at 410, so `close-406-dissolve.jpg` shows the halfway look.

**4. The deep ice.** `ICEHOUSES` copied, `iceStrength` copied (each age's strength ramping over its first and last
tenth, two million years at least). In every surface shader: the fragment's position carried back into the ball's frame
(a uniform the frame sets), its latitude against the reach, feathered over sixteen degrees from ten inside the reach,
smoothed, roughened by the grain read at the position *at that age* (as `paintIce` reads it), south only through the
Antarctic age (34 to 2.6), white all over at 0.9 for a snowball, `deepIceAlpha` (0.75) at the heart otherwise; over land
and sea alike, laid after everything but the limb shading, so bare land is never on top. **None this side of the seam**:
the 2D draws the deep overlay only past the ground grade, and the spec gives the last 2.6 million years to ICE-6G (step
4), so the `[2.6, 0, 58]` entry waits. Checked at 20 (south only, `close-20-antarctic-ice.jpg`), 300 (both poles to 50°,
`close-300-ice.jpg`), 445 (the north to 60°, `close-445-ordovician-ice.jpg`) and 700 (the snowball,
`pair-A-700-snowball.jpg`): the same cap, the same feather, the same roughening as the 2D beside it.

**5. The rim.** The 2D darkens from 0.78 of the radius to the edge with near-black at 0.30, and draws a 5 px haze (the
sea's blue (160, 200, 228) at 0.55 from a pixel inside the edge to four outside) and the 1 px limb line (`S.limb`). Here:
every surface shader computes the fragment's *ray's* distance from the ball's centre (1 at the edge; right in
perspective, where a screen radius is not) and darkens by the same ramp; a shell 4% larger than the ball, drawn last
with its own shader, gives the haze and the limb line in screen pixels (one pixel's worth of that distance is a uniform
the frame sets from the camera's distance and the stage's height, so the haze is four pixels at any zoom), and discards
every fragment inside — nothing beyond the four pixels, no `glow.js`. `crop-limb-12x.jpg` is the edge at today, twelve
times: the dark line, the pale haze outside it over the parchment.

**6 and 7.** *Lit / even* and *Blue Marble / old ground* stay words; the rim, the paint, the ice and the wash are checked
in both lights and on both grounds (`pair-A-0-lit.jpg`, `pair-A-1000-lit.jpg`; the `look-` pictures). The normal for
the light is taken from the surface point itself, so a displaced vertex (an island, a rim) shades right.

**The bench.** The slider runs by a square law now: its thousand positions still reach 1,000 million years, but the
first fifty cover the 2.6 million years of the fade (the first hundred the first ten million), so the fade takes a hand's
width instead of three positions; the age reads to a tenth under ten. The readout adds the rim triangles and the masks'
build time. The line under the stage says the paint is a choice of two. The still for a device that cannot draw 3D is
remade with the new look (94 KB). `?paint=green`; `cwShow(px)` (the pair picture put on the page, for a pane that
presents the live canvas late); `earth.frame()` for a page drawing off-screen between the loop's frames. The page's stamp
is `2026-10-27 15fe8e5`; `earth.js` at `?v=2026-10-27g`, `cw-style.js` at `?v=2026-10-27b` on this bench only.

## Measured on the Mac (M1 Pro, the browser pane, Chromium)

| | |
|---|---|
| Triangles | 13,909 for the pieces (as before) + 90,846 for the rims; 415 plates get meshes — plate 8016's one piece has no area (its ring collapses), and giving it no mesh also stops WebGPU's warning of an empty draw, which the first bench had |
| The build at load, warm (three runs after the first) | 89, 110, 115 ms for the pieces, rims, islands and the soft positions (30 ms before step 2); the masks and paints 129, 161, 224 ms |
| The build at load, cold, as the page opens in the pane | 996–1,140 ms and 1,192–1,847 ms — ten times the warm numbers; the first bench saw the same on three of its loads and could not explain it. The JIT and the page's other work at the same moment (the 2D globe's textures, the renderer's start) are my guess; the iPad will say what it costs there |
| The GPU, a moving frame at full, 780 × 780, WebGPU (`cwBench`) | 5.79 ms at 100 (more plates alive, more draw calls), 3.17 at 500, **2.89 at 1,000 with the rims and islands on** — the nine texture reads cost less than the draw calls |
| The still at 1,600 px | 105 ms |
| The phone at 375 × 812 | floor tier, Blue Marble 2,048, the three pairs of words and *Reset view* there, no message |
| Both backends | WebGL 2 draws the same picture (`gl-1000-close.jpg`, `gl-300-ice.jpg` against their WebGPU twins) |

The page-standard check: no errors. The pane's own screenshots were a step behind the live canvas throughout (it
presents a WebGPU canvas late), so every picture here is the card's own readback through `cwPair`, and the 2D, which
draws on an animation frame, is given its own turn between the setting and the picture.

**What a tool to pre-write the rims would buy:** the rim build is two thirds of the warm 100 ms. Building the rims
lazily at the first age past 992 would move it off the load; not done, named.

## The pictures (`Earth-3D-Look-Oct27/`)

- `pair-{A,B,C}-{0,100,250,540,1000}.jpg` — the fifteen pairs as before, **on Blue Marble, photograph painted, even**;
  A the home view (20, 15), B the Americas (−95, 35), C Australia and Antarctica (130, −60); the 3D left, `globe.js` right,
  each engine's own city marks.
- `look-A-{1,2.6,100,250}-{old,blue}-{photo,green}.jpg` — the fade and the two paints on both grounds (sixteen);
  `look-A-0-old.jpg`, `look-A-450-{old,blue}.jpg` (rock, where the paint no longer matters).
- `close-1000-blue.jpg`, `close-996-halfway.jpg` (at 2 radii: the rims, the band, the islands; the ramp halfway),
  `close-406-dissolve.jpg`, the three ice close-ups and the snowball, `pair-A-0-lit.jpg`, `pair-A-1000-lit.jpg`,
  `close-0-atlantic.jpg`, `close-0-dateline.jpg`, `close-0-southpole.jpg`, `pair-alaska-0.jpg`, `crop-limb-12x.jpg`,
  `gl-1000-close.jpg`, `gl-300-ice.jpg`.

## Where the 3D and the 2D still differ, and why

- **This side of 300 million years the 2D shows the photograph and the 3D shows paint** (`look-A-2.6-*`, `-100-`,
  `-250-`): the spec's rule replaces the globe's, which carries today's picture back to 300. Intended; the 2D is the old
  rule beside the new.
- **The pale wash lines between pieces** at 540 and 1,000 (`pair-C-540.jpg`): the 2D has far more of them — its mask and
  skin are 1,024 texels wide and read at half the disc's resolution, so every join's sea sliver bloats to a line; the 3D
  reads the mask at 2,048 and the picture at 8,192, so the slivers are the width the data gives them.
- **The sea**: the 2D's is a radial gradient (lighter top-left, `globeSeaDeep` at the edge); the 3D's is flat `globeSea`
  with the limb shading. Named open in the first report; still open. In `lit` the ball gets its own shading instead.
- **Gaps between neighbouring pieces** show close in (`close-0-atlantic.jpg`: two slivers in Brazil; the Transantarctic
  crack in `close-0-southpole.jpg`; thin lines across Canada in `pair-alaska-0.jpg`). They are in the plate data — the
  polygons of neighbouring pieces do not meet — and in the first bench's pictures too (`pair-A-0.jpg` of 27 Oct, the
  Sahara); the bloat closes gaps under 0.5° and the 2D's raster stroke a texel and a half, and the rest shows in both
  engines at the disc's size as faint lines. Close in (step 5) they will want an answer: a wider bloat, or the data mended.
- **The perspective**, as before: the ball from 4.9 radii, the disc from infinity; city marks differ up to 5% of the
  width.
- **The island's share by age** follows the crust curve in both, but the 3D shrinks the corner polygon about the mean of
  its corners where the 2D shrinks the four-times-denser softened ring about *its* mean: the centres differ by a fraction
  of a degree on an uneven ring.
- **The band's wash over other pieces**: the 2D lays every island's lift after every skin; the 3D draws each island right
  after its own piece, so where two plates' pieces overlap, the later plate's land covers the earlier plate's island.
  Rare, and only at 992–1,000 here.

## What needs Michael's eye on the iPad

1. **The fade from photograph to paint** as the slider moves through its first fifty positions: gradual, never a snap;
   whether 2.6 million years is the right length under the finger.
2. **The two paints**, on both grounds: *photograph painted* — does the blur, the desaturation and the lift read as the
   same ground painted, or as a blurred photograph? *green and rock* — the green itself (#9aa882, mine), and how much
   rock shows under it (a fifth).
3. **The shelf wash on Blue Marble**: the pale rim along every coast and the inland seas — the right pale, the right
   width, against the old ground beside it.
4. **The ice's edge**: the sixteen-degree feather and the grain's roughening at 20, 300, 445 and 700; whether the
   snowball's 0.9 is white enough.
5. **The rim**: the darkening from 0.78 and the four-pixel haze, in both lights; whether the limb line reads on the
   iPad's density.
6. Still from the first bench: the turn's feel, the frame rate at full (the Mac's card does a moving frame in 3–6 ms),
   the heat, lit or even, the photograph against the old ground; and now the cold load's build time on the iPad.

## Open, named and left open

- The spec's own open items stay open: the month of Blue Marble, the photograph against the two map rules, light,
  the wedge, the water ball, the insides, the small still maps, the flat world's projection and its marks.
- **Lit or even**; **the sea's gradient**; **the gaps between pieces** (above).
- **The near-black crust before oxygen**, the guessed and invented ages, the molten sequence: step 3 (Michael's note on
  the prompt: the molten sequence moves there, beside the guessed ages, because the slider has to reach past 1,000).
- **The deep ice this side of the seam**: none, as the 2D; ICE-6G and the lowered sea are step 4.
- **The paint's four numbers** and **the green**: constants for Michael to move by looking.
- **The cold load**: 1–2 s in the pane against 0.2–0.3 s warm; what it is on the iPad, and whether the rims should be
  built lazily.
- **The still** carries the new look at today (the wash on the inland seas, the limb shading, the haze), remade from the
  bench at 1,600 px.

## Files

- `cw-deploys/js/3d/earth.js` — rewritten for the look by age (the header says what it does); `cwEarth` gains
  `setPaint`, `paint`, `frame`, `exposedShare`, `iceStrength`, `looks`, `islands`, `rims`, `haze`; `plateQuatAt` and
  `iceStrength` exported.
- `cw-deploys/js/cw-style.js` — one new name, `paintGreen`, a candidate.
- `cw-deploys/experiments/earth-3d.html` — the paint words, the square-law slider, the readout, the stamp.
- `cw-deploys/art/globe/earth-3d-still.webp` — remade.
- `cw-deploys/MANIFEST.md`, `cw-deploys/experiments/index.html`, `CWVault/00-BOARD.md` — the entries;
  `CWVault/claude/Earth-3D-Look-Oct27/` — the fifty pictures; `Prompt-Build-Earth-Bench-02.md` — a status line.
