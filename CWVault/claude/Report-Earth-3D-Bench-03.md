---
status: Report — the third Earth bench, step 3 of Spec-Earth-3D's Getting there (the guessed and invented ages, and the molten Earth), built 28 Oct 2026 to Michael's prompt Prompt-Build-Earth-Bench-03.md with his rulings on step 2; checked in the pane on the Mac; NOT committed — Michael reads, looks, says commit
role: What was built to take the 3D Earth back to its birth — the motion model and the shared seed, the blobs, the dark crust and the Huronian ice, the molten sequence with the Moon's impact two ways, the grade line — what was measured, where the 3D and the 2D still differ and why, and what needs Michael's eye
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-02.md, Report-Earth-3D-Bench-01.md, Audit-Earth-3D.md (§1, §4), Prompt-Build-Earth-Bench-03.md, cw-deploys/js/3d/earth.js, cw-deploys/experiments/earth-3d.html, cw-deploys/js/globe.js (gradeFor, runSim, cratonSim, simQuat, guessedMatrix, blobSet, makeBlobs, blobMatrix, shrunk, reguess, paintSkin, ICEHOUSES, moltenState, paintMolten, MOLTEN_WORDS), Earth-3D-Deep-Oct28/ (the pictures)
updated: 2026-10-28
---

# Report: the Earth bench, step 3 — back to the beginning (28 Oct 2026)

Michael's prompt: first his two rulings on step 2 (the paint is green and rock; the light is even), then step 3 of the spec
on the same bench with the 2D globe still beside it — the slider to 4,567 million years, the guessed ages by the motion
model with one seed for both globes, the invented ages' blobs as meshes, the near-black crust before oxygen and the
Huronian ice, the molten Earth as a shader on the whole ball with the Moon's impact two ways, and the grade's word and
sentence under the stage. Built in Claude Code on the Mac on `da958b6` (step 2 committed). `globe.js`, `map.js`, the Time
Machine and every story are untouched; the Time Machine and the Sun bench open as before, no console error (checked).
**Not committed.** The pictures are in `Earth-3D-Deep-Oct28/`, twenty-five JPEGs, 2.0 MB, named below.

## Michael's rulings on step 2, applied

- **The paint is green and rock.** The photograph painted and its word are gone from `earth.js` and the bench; the paint
  the photograph fades to by 2.6 million years is the one quiet green (`paintGreen`, #9aa882, untouched) lit by the rock
  grain with a fifth of the rock under it. The 1,024 px painted picture is no longer built at load (the masks alone now
  take 27 ms warm where the masks and paints took 130–220).
- **Even light.** *Lit* and its word are gone, with the light's uniform and the shading; the rim's darkening and the haze
  stay. The spec carries both rulings.

## What was built

**1. The slider to the beginning.** 1,500 positions from today to 4,567 million years, both globes. The first hundred keep
step 2's square law (the first fifty the 2.6 million years of the fade, the first hundred the first ten million); after
that it runs straight between knots, one segment per era:

| positions | era | million years | a position is |
|---|---|---|---|
| 0 → 100 | ground, by the square law | 0 → 10 | 0.001 to 0.2 |
| 100 → 300 | measured | 10 → 200 | 0.95 |
| 300 → 500 | inferred | 200 → 540 | 1.7 |
| 500 → 700 | fitted | 540 → 1,000 | 2.3 |
| 700 → 1,100 | guessed | 1,000 → 4,000 | 7.5 |
| 1,100 → 1,250 | invented | 4,000 → 4,400 | 2.7 |
| 1,250 → 1,500 | molten | 4,400 → 4,567 | 0.67 |

So on a 600 px slider every era is at least 60 px wide under a finger; the guessed three billion years take 160 px, the
molten 167 million years 100 px, and the Moon's three million years (the 2D's `moon` phase, 1.5 either side of 4,510)
four or five positions. The age reads to a tenth under ten million years and whole above, with a comma past a thousand.
`?ma=` and `cwSetAge` go through the same knots.

**2. The guessed ages: the motion model, and one seed.** Nothing was rewritten: `runSim`, `cratonSim`, `simQuat`,
`guessedMatrix` (as the quaternion, `guessedQuat`), `modelVelocity`, `discsOf`, `soften`, `matToQuat`, `plateMatrixAt`,
`mulberry`, `gauss` and the quaternion helpers are `globe.js`'s, copied line for line into `earth.js`, and the pieces are
prepared as `globe.js`'s `prepare` prepares them (the same rings as unit vectors, the same two-pass softening for the
discs), so the run from a seed is the same arithmetic in both engines. It hands the card one quaternion per plate per
frame past the reach, as the spec says. **The seed is the page's:** the bench makes one as `globe.js` does (`?seed=`
fixes it for a check) and gives it to both globes; `earth.js` has `seed()`, `setSeed(s)` and `reguess()` with `globe.js`'s
names and formula. The word ***another guess*** asks the 2D for a new seed and hands the same one to the 3D, so both show
one world. Checked: at 3,000 million years, for four seeds (12345 and three from *another guess*), Moscow and Delhi
carried by each engine's own `placeAt` agree to the sixth decimal of a degree in both longitude and latitude (the 2D
finds the plate by point-in-polygon, the 3D by the city file; the same plate, the same run). The pair pictures at 3,000
show it by eye. The edges past the reach stay as the softening leaves them at 992–1,000 (globe.js's `tg` held at 1): the
shelf rims, the drowned wash, the islands.

**The soft outline, done properly.** Step 2 moved each corner of a piece to where two Chaikin passes leave it and drew
straight chords between the moved corners; at the reach, where the softened look lasts eight million years under the
hard outline's memory, that passed. At 1,500 and 3,000, where the cratons are small and the soft look is all there is,
the chords read angular beside the 2D's curve (the first pictures of this session, before the fix). So the land's
triangles now carry the whole curve, four points to a corner, as `globe.js` draws it: the hard triangulation morphs to
the chords as before, and along each chord a fan of four thin triangles fills out to the curve — their vertices sit on
the corner they came from at the hard end, so the fan has no area until the softening comes in, and opens with it. The
shelf rim follows the curve too (a quad along each of its segments, a disc of ten at each of its points). The island
shrinks toward the mean of the curve's points, which is what `shrunk` shrinks the 2D's softened ring toward. The
triangles: 51,827 for the land (13,909 before) and 242,256 for the rims (90,846), the rims still drawn only from 992.

**The facing, by the point and not the winding.** The fringe fans, collapsed at the hard end, had no winding to speak of,
and some opened the wrong way round; a triangle wound the wrong way on the far side of the ball passed the facing test
and showed through the sea as a hairline (the second set of pictures). The land, island and rim meshes are two-sided
now and a fragment is discarded by the surface point's own facing — on a ball, a point faces the camera when its outward
normal points toward it — which is exact whatever the winding, and also took out the few hairline slivers step 2's
pictures had at 1,500 (two short strokes in the first `pair-1500` of this session, from degenerate hard triangles). The
cost is rasterising the far side's land and discarding it, which the GPU numbers below absorb.

**3. The invented ages: the blobs as meshes.** `blobSet` copied (the shapes, the places clear of each other, the run from
4,400 forward with `runSim`); each blob's 96-point ring is triangulated like a piece's (already smooth, so no softening
and no fringe) with the same bloat, once per seed (6–7 blobs, 200–340 triangles each, 10–23 ms with their rims), and
drawn by the same land, island and rim shaders with one more step in the vertex shader: the point shrunk toward the
ring's centre by the square root of the crust curve's share at the age, exactly `makeBlobs`'s `shrunk`, the picture read
at the shrunk point as the 2D reads it through the body's inverse. The island inside a blob composes the two shrinks
(the curve's and the land share's) in one step, where the 2D recentres between them: a hair off on an uneven ring,
named. The blobs never dissolve, as the 2D's do not, so at 4,400 they appear whole out of the molten ball as the 2D's do.
Checked: `pair-4300.jpg` (seed 12345, seven blobs) and `pair-4300-guess-2069082522.jpg` (six) — the same shapes in the
same places on both globes.

**4. Before oxygen.** In the skin shader, after the bare rock: the near-black crust (`oldCrust` to `oldCrustGrey` by the
grain's smoothstep) blending in from 2,300 back to 2,500, `paintSkin`'s `td` as it stands; `pair-2400.jpg` is the
halfway look on both globes, `pair-3000` the dark crust whole. The Huronian ice (2,400 to 2,100, to 55°) needed nothing
new: `ICEHOUSES` and `iceStrength` were copied in step 2 and the overlay runs on the latitude at the age;
`pair-2300-huronian.jpg` shows the north cap on both globes with the same feather.

**5. The molten Earth.** `paintMolten` as a fragment shader on the whole ball: the sea's mesh takes it while the grade is
none, with `moltenState` copied for its numbers (the crust's threshold `t·1.15 − 0.05`, the cracks' glow, the sea's
strength, which crust) and its phase. The melt by the grain (`magma` to `magmaGlow`, `hot` above 0.62), the crust where
the cooling-order map is under the threshold (`crust` to `crustLight` by the grain, the cracks in `magmaGlow` at the
glow), the faint first sea (0.35 at most, `globeSeaDeep` where the map runs under 0.3, a third of it where it runs over
0.55), the maps turned 137° and flipped for the second crust, the sea's blue by 4,400; the haze grey steam until the sea
passes half. Ages as `globe.js` has them. Checked against the 2D at 4,540 (first sea: the same crust, the same cracks),
4,506 (molten again: the same melt), 4,450 (crust again: the same turned pattern) and 4,567 (molten).

**The Moon's impact, two ways** (`quiet brightening / no flash`, bench only; `?impact=melt` opens on the second), neither
a flare, a shake or a burst, and the 2D's white flash not drawn at all:

- ***quiet brightening*** — the whole ball mixes toward the melt's own colour (the melt as painted, by the grain) over
  `MOON_WARM` = 5 million years either side of 4,510, smoothed, whole at the impact; at the impact the second crust's
  clock starts at zero, so the melt is already there and nothing jumps. No white, nothing beyond the rim, the haze its
  grey self. `warm-4513.jpg` (three million years before: the crust warming, 0.35 of the way), `pair-4510-warm.jpg`
  (the impact: all melt), `warm-4507.jpg` (after: the melt, the second crust not yet begun).
- ***no flash*** — nothing brightens. At the impact the first crust is whole; over the `MOON_MELT` = 3 million years after
  it the crust sinks into the melt — its threshold runs down from whole, so the last-cooled rafts go first and the oldest
  last, exactly the cooling-order map read backwards — with the cracks brightening as it goes, while the second crust
  begins on the turned maps on `globe.js`'s own clock (it is a tenth in by then and barely shows). `melt-4510.jpg` (the
  whole crust), `melt-4509.jpg` (the rafts sinking, the seams bright), `melt-4508.jpg` (a few old rafts left),
  `melt-4506.jpg` (melt). Under the finger that is five positions.

The two spans are constants at the top of `earth.js`, for Michael to move. The phase word is the 2D's: `moon` for the
1.5 million years either side, `molten again` after.

**6. The grade and its sentence.** Under the 3D stage, the grade's word in copper and its sentence from `GRADE_WORDS`
(copied into `earth.js` with `MOLTEN_WORDS`; the Earth carries its own words because the swap retires `globe.js`), and
the molten phase's word and sentence while the grade is none, from `earth.grade()` after every change of age or seed —
so the edges can be watched changing with the words. `earth.grade()` and `earth.moltenPhase()` answer as `globe.js`'s do.

**The bench.** The words: *Blue Marble / old ground*, *quiet brightening / no flash*, *another guess*, *Reset view*, *Keep
this picture*; the line under the stage says the impact is a choice of two and *another guess* gives both globes the
same guess. The readout adds the seed, the cratons' run in both engines, the blobs' run and meshes, and what the last
*another guess* took. `cwPair` takes a type and a quality, names the seed and the grade or phase on the picture, and
leaves the cities off the molten and invented ages. The page's stamp is `2026-10-28 da958b6`; `earth.js` at
`?v=2026-10-28d` on this bench only.

## Measured on the Mac (M1 Pro, the browser pane, Chromium)

| | |
|---|---|
| The cratons' run, when the slider first passes 1,000 | **114 ms** in the 3D on a cold page (the 2D's own, in the same page, 98); 52–65 ms once warm. In the 2D alone the audit measured 60–100 |
| *Another guess*, tapped at 3,000 | **52–65 ms** for the 3D's run and the frame (three taps); the 2D's run 48–60 ms on its next frame. The two runs are in series on one thread, so the word costs 100–125 ms of pause on the Mac |
| The blobs' set and run | 1–4 ms; their meshes 10–23 ms, once per seed |
| The build at load | 321 ms on a warm load in the pane, 1.0–1.7 s cold (step 2: 90–115 warm, about 1 s cold); the fringe and the longer rims are the growth |
| The GPU, a moving frame at full, 780 × 780, WebGPU (`cwBench`) | **8.9 ms at 1,000** (every old piece with its rim, island and fringe, two-sided); 2.25 at 3,000; 1.7 at 4,300 (the blobs); 1.25 at 4,500 (the molten ball alone). Step 2 measured 2.9 at 1,000 with the shorter rims and one-sided land |
| Both backends | WebGL 2 draws the same picture at 3,000, 4,300 and 4,450 (`gl-*.jpg` against their WebGPU twins); the gradient sampler and the two-sided discard behave on both |
| The phone at 375 px | the stages stack, the seven words wrap into two rows, the grade line reads under the stage |

**What that pause will feel like on the iPad.** The run is plain JavaScript, one thread, about a hundred thousand
disc-pair tests over 1,500 steps; an M-series iPad is the Mac's own silicon a notch down, so the first crossing of 1,000
should cost about 150 ms cold and *another guess* about 150–200 ms for both engines together: a short catch of breath
under the finger, as it is in the Time Machine now (the audit's §4 said the same). On a 2017 iPad, three to five times
that — half a second to a second — which is a visible pause, and the 2D already costs it; when the swap comes and one
engine runs, the pause halves. Not measured on the iPad.

The page-standard check: no errors. The pane's screenshots are a step behind the live canvas, so every picture here is
the card's own readback through `cwPair`, and the 2D is given a frame between the setting and the picture (a cheap
screenshot action between the two; without it the 2D's picture was the previous age's three times in nine).

## The pictures (`Earth-3D-Deep-Oct28/`)

All at the home view (lon 20, lat 15), the old ground, 768 px a stage; the 3D left, `globe.js` right.

- `pair-{1000,1500,2400,3000-seed12345,4000,4300,4450,4510-warm,4540,4567}.jpg` — the nine asked for, with 1,000 for
  the reach; `pair-2300-huronian.jpg` the Huronian cap.
- `pair-3000-guess-{1459407169,1745710025,60617603}.jpg` — three *another guess* pairs at 3,000, the two globes agreeing;
  `pair-4300-guess-2069082522.jpg` the blobs of a new seed.
- `warm-4513.jpg`, `warm-4507.jpg` — the quiet brightening before and after; `melt-{4510,4509,4508,4506}.jpg` — the no-flash
  melt, step by step.
- `gl-{3000,4300,4450}.jpg` — WebGL 2.

## Where the 3D and the 2D still differ, and why

- **The sea's gradient and the perspective**, as before (the 3D's sea is flat `globeSea`; the ball from 4.9 radii sees
  less of the surface than the disc from infinity, so a piece at the 2D's limb is round the back of the 3D). Named open
  since the first bench.
- **The molten ball's resolution.** The 2D paints the maps at half the disc's resolution from its 1,024 texel arrays; the 3D
  reads the same maps through the card's filtering, so the crust's edges and the cracks are smoother and a touch finer
  (`pair-4450.jpg`). The pattern is the same pattern.
- **The soft outline's curve** is the 2D's; the fan triangles are straight between the curve's points where the 2D's path
  is too, so the two agree to the bloat. **The blob's island** composes the two shrinks (above).
- **The 2D's white flash at 4,510** is not drawn in the 3D: Michael's "without the fireworks", and the two ways above.

## What needs Michael's eye

1. **The soft edges** past the reach (1,500, 3,000): whether the curve, the rim and the drowned wash now read as the 2D's,
   and as "guessed" — and whether 8.9 ms a frame at the reach (every old piece with its rim) is affordable on the iPad.
2. **The blobs** (4,300): the shapes, the shrink as the slider moves between 4,000 and 4,400, the island inside each.
3. **The near-black crust** (2,400 halfway, 3,000 whole): the two tones by the grain, and the Huronian ice over it at 2,300.
4. **The molten sequence as the slider moves**, 1,250 to 1,500: the crust forming at 4,558, the faint first sea, the second
   crust, the blue by 4,400; the steam haze; whether 0.67 million years a position is the right pace.
5. **The two impacts**: *quiet brightening* (five million years of warming either side) against *no flash* (three million
   years of the crust sinking). Both spans are constants if he wants them shorter or longer.
6. **The slider's scale** under a finger: the table above.
7. Still from the first two benches: the turn's feel, the frame rate at full, the heat, the photograph against the old
   ground, the green, the cold load's build time on the iPad.

## Open, named and left open

- The spec's own open items stay open: the photograph against the two map rules, the wedge, the water ball, the insides,
  the small still maps, the flat world's projection and its marks. **The Moon's impact** is the spec's open item this bench
  answers two ways; Michael chooses.
- **The sea's gradient**; **the gaps between pieces** (step 2).
- **The blobs' latitude**: `blobSet` keeps them within about 55° of the equator for the flat map's sake; the audit's §4 says
  to leave it until the flat end is settled. Kept.
- **The blobs at 4,400** appear whole out of the molten ball, as the 2D's do; whether they should dissolve in as the pieces
  do is a look for Michael, not built.
- **The rim's cost**: a disc at every curve point (ten segments) is most of the 242,256 rim triangles; discs only where the
  curve bends, or a shorter fringe, would bring the 8.9 ms down if the iPad needs it. Not done.
- **The cold load**: 1.0–1.7 s in the pane against 0.3 s warm; the iPad will say.
- **`MOON_WARM`, `MOON_MELT`** and the slider's knots: constants for Michael to move by looking.

## Files

- `cw-deploys/js/3d/earth.js` — the header says what it does; gains the motion model, the blobs, the seed, the molten
  shader, the grade; loses the photograph paint and the light. `cwEarth` gains `seed`, `setSeed`, `reguess`, `simMs`,
  `grade`, `moltenPhase`, `setImpact`, `impact`, `bodyQuat`, `crustFraction`, `moltenState`, `gradeFor`, `blobs`; loses
  `setLight`, `light`, `setPaint`, `paint`. `MOLTEN_WORDS`, `GRADE_WORDS` and `moltenState` exported.
- `cw-deploys/experiments/earth-3d.html` — the words, the shared seed, the slider's knots, the grade line, the readout,
  the stamp.
- `cw-deploys/MANIFEST.md`, `cw-deploys/experiments/index.html`, `CWVault/00-BOARD.md` — the entries;
  `CWVault/claude/Earth-3D-Deep-Oct28/` — the twenty-five pictures; `Prompt-Build-Earth-Bench-03.md` — a status line.
- Not changed: `globe.js`, `map.js`, `cw-style.js`, `scene.js`, the still, every story.
