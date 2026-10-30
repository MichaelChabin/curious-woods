---
status: Report — the Earth bench, step 6b (Prompt-Revise-Earth-Bench-06.md, Michael's eight items on step 6); built 30 Oct 2026 on d0dea3d; checked in the pane on the Mac; committed and pushed on Michael's word, 30 Oct (04645d1a)
role: What was built for each of the eight items, how the turn close in was done and what it cannot do, what was found, what was checked, and what needs Michael's eye
related: Spec-Earth-3D.md, Worknote-Time-Slider.md, Report-Earth-3D-Bench-06.md, Prompt-Revise-Earth-Bench-06.md, cw-deploys/js/3d/scene.js, cw-deploys/js/3d/earth.js, cw-deploys/js/3d/still.js, cw-deploys/js/cw-fullscreen.js, cw-deploys/experiments/earth-3d.html, Earth-3D-Bench-06b-Oct30/ (the pictures)
updated: 2026-10-30
---

# Report: the Earth bench, step 6b (30 Oct 2026)

**The two checks first.** `Spec-Earth-3D.md`, under *Open*: "The flat world's projection. *Ruled 29 Oct (Michael): Equal
Earth*". There; nothing written in the spec. `git status` had the spec modified and `claude/Archive/` untracked, so exactly
those two were committed and pushed as `d0dea3d` with the message you gave. (The archive holds copies of the finished
prompts and reports; their deletions from `claude/` are still uncommitted in the working tree, with the rest of what was
there before this session.)

Nothing a child sees changes. `globe.js`, `map.js`, the Time Machine and every story are untouched. `scene.js` and
`still.js` are shared with the Sun bench and the shelf bench; what I added does nothing unless a page asks for it, and
both benches open clean, as do the Time Machine and the Van Gogh story.

The pictures are in `Earth-3D-Bench-06b-Oct30/`: 39 of them, 2.5 MB.

## 1. The turn close in, like a map

### How I did it

**What the swing was.** On a ball with north kept up at the centre, every move east is a turn about the pole. Far out that
is the globe on its stand. With a country filling the window the pole sits just past the top edge, and the picture pivots
about it: the top of the window moves slower than the bottom (at the Alps the top moves 85 % as far), and everything moves
on arcs. That is the swing, and it is the sphere's own: Google Earth does the same.

**What a map does.** A map slides: every point in the window moves the same way, nothing pivots. On a ball the only motion
that does that is a rigid turn about an axis lying in the screen (the trackball's turn about the camera's own up and right).
It has a cost, and the cost is exact: a slide east by one window-width leaves north leaning by the drag's longitude times
the sine of the latitude. Over the Alps that is nine degrees a window; over Nantucket a degree and a half; at the equator
nothing; a slide north leaves north as it was. **North up and no swing cannot both hold on a sphere.** They differ by one
roll of the picture, and that roll either happens during the drag (the swing) or is left in the view (the lean).

**What is built (`scene.js`).** The view is now a longitude and a latitude at the centre and a lean of north there
(`gRoll`), drawn as a third turn in `applyGlobe`. A one-finger drag computes both turns — the stand's (as before) and the
slide's (the trackball turn, read back as a view by `decompose`) — and blends them by how much ground the window shows:

| the window's height spans | the turn |
|---|---|
| 0.12 radians of ground or less, about 760 km | wholly the map's slide |
| 0.6 radians or more, about 3,800 km | wholly the globe on its stand |
| between | blended, smooth on the logarithm of the span, so the feel never jumps |

The lean a slide leaves **comes out as she zooms out**, in proportion as the slide gives way to the stand (a zoom already
changes the whole picture); it stays on a zoom in; Reset view and a glide to a place (a tap) ease it to nothing. **At rest
close in it stays:** taking it out would be the picture rolling on its own, which you ruled out. Two fingers keep north up
at every zoom, as before (the ground between them follows them exactly). `?turn=stand` forces the old turn at every zoom
and `?turn=map` the slide, for comparing by hand. The readout says how much of the slide is in force and north's lean.

**The seven views on this scale:** Mexico City and Lake Victoria wholly the slide; the Alps 84 % the slide; the Tibetan
Plateau 7 %; the Nile, Australia and the Amazon the stand.

### Checked

Over the Alps (1,155 km across the window), three drags east of a third of the window each, on the slide
(`alps-east-map-0..3.jpg`) and on the stand (`alps-east-stand-1..3.jpg`), from the same start:

| after | the slide: centre, lean | the stand: centre, lean |
|---|---|---|
| one drag | 15.4° E, 46.1° N; north leans 3.0° | 15.4° E, 46.2° N; 0 |
| two | 20.4° E, 45.9° N; 6.0° | 20.4° E; 0 |
| three | 25.3° E, 45.5° N; 9.0° | 25.4° E; 0 |

In the slide's pictures the ground moves straight (the Carpathians arrive as the Alps leave, nothing turning); in the
stand's the whole picture has turned nine degrees by the third. The slide also runs very slightly south (0.7° over the
three drags): a straight line on the ball is a great circle, and a great circle heading east at 46° dips south, as a
parallel does not.

Three drags north (`alps-north-map-1..3.jpg`): 46.2° → 49.7° → 53.1° → 56.6° N, the longitude unchanged, no lean.

Far out, the whole ball at the old home distance (`far-east-0..2.jpg`): the stand, 60° of longitude a third of the window,
north up, as before.

The lean: after a third-window drag east over the Alps, 3.03°; zoom in, 3.03° (it stays); zoom out to where the slide is
3 % in force, 0.09°; out to the whole ball, 0.

**The maths** (compose, decompose, the slide's lean) was checked in Node with three's own quaternions before the pane: the
round trip is exact to 1e-13 of a degree, and the slide's lean is the drag's longitude times the sine of the latitude
to four figures.

### For you to judge

- **The lean.** Close in, after a drag east, north is no longer up until she zooms out or taps Reset view. Over
  Nantucket it is invisible; over the Alps it is nine degrees a window-width, and shows. The alternative is the swing. If
  you would rather have north always up, `?turn=stand` is the old turn, and `MAP_SPAN` can be set to 0 to keep it.
- **The two spans**, 760 and 3,800 km. They decide where the Alps sit (84 % the slide).

## 2. The Taiwan wedge

The pale triangle from Taiwan to Luzon, lightening Taiwan's southern half, was **Luzon's piece**, born 5 million years ago
in the plate model. A piece fades in over the eight million years after its birth (the 2D's rule), by mixing toward the
sea's colour over its whole outline — so a piece born within that span was, at today, still painting a wash of sea over
the sea (darker, since the mix is of the photograph's near-black sea and ours) and over the land under it (lighter,
bluish). `taiwan-before.jpg` and `taiwan-after.jpg`.

**Six pieces on four plates were born within the span,** so they did the same:

- **Luzon's piece** (plate 737, born 5 million years): the wedge from Taiwan to Luzon.
- **Flores–Alor** (plate 652, born 5.3): a pale band along the Lesser Sunda Islands.
- **The Banda Arc** (plate 676, born 5.9, two pieces): two pale wedges over the Banda Sea east of Timor
  (`banda-before.jpg`, `banda-after.jpg`).
- **The Vitiaz Trench round Fiji** (plate 824, born 1 million years, two pieces either side of the 180° meridian): a large
  V of shade across the sea round Fiji (`fiji-before.jpg`, `fiji-after.jpg`).

**The fix** (`earth.js`): the dissolve comes in only as the ground's look goes past the seam (by `1 − uGroundT`, over 2.6 to
5.7 million years), so this side of the seam a living piece is whole and draws nothing over the sea: the sea ball and
today's ground under the pieces show what is there. The wash, the rim, the island and the drowned band were already off
this side of the seam. Past it, every piece's birth fade is as it was. No piece ends within eight million years of today.

## 3. The window's size, shown

While a bar is dragged, and for two seconds after, the window shows its size inside its bottom right corner, in small grey
type, in the page's own pixels: `818 × 758` in `window-size-readout.png`. The opening size is unchanged.

## 4. Full screen

**`js/cw-fullscreen.js`**, a classic script beside `cw-panel.js`, for any interactive:

```
var fs = CW.fullscreen(host, { wordsHost, words: () => [...], bottom: () => [...], onChange });
```

It asks the browser for full screen on the window (the standard API or WebKit's prefix: the iPad has it, the iPhone does
not). While the screen is full the host wears the class `cw-fullscreen`, so the page's own CSS lets the canvas fill it; the
named elements are **moved** (not copied, so their listeners stay) into two floating boxes — the essential words small at
the top left, the bottom row along the bottom — and put back before their old neighbours on the way out. Escape and the
device's own way out are heard through `fullscreenchange`. Where the device has no full screen, no word is made. Where a
browser has the API but refuses the request, the window fills the viewport instead, fixed over the page, and Escape leaves.

On the Earth: *Full screen* in the left column; floating, *Map* / *Globe*, *Reset view*, *Keep this picture* and *Full
screen* itself, and the age slider along the bottom. The window's crop is undone first (the window is the screen). The
kept picture's panel opens over the full screen too.

**Checked:** the pane refuses the API ("Permissions check failed"), so what was seen is the fallback: `full-screen-pane.jpg`,
the Earth filling the viewport, the words at the top left, the age slider along the bottom; leaving put every word back in
its place and the age row back above the stretching slider. **The real full screen is for the iPad.**

## 5. Seven opening views

The bench opens on one of seven at random, `?view=` picking one. Each is its centre and its extent, fitted to the window's
usual size with a tenth of margin; the opening view is the home Reset view returns to.

| `?view=` | framed on | across the window | the place line |
|---|---|---|---|
| `alps` | the Alps, whole (1,050 × 600 km) | 1,155 km | near Como |
| `nile` | the Nile from its delta to Lake Victoria (1,300 × 3,800) | 4,180 km | 15.3° N, 32.8° E |
| `tibet` | the Tibetan Plateau (2,700 × 1,500) | 2,970 km | 33.5° N, 89.0° E |
| `australia` | Australia, whole (4,200 × 3,900) | 4,620 km | 27.5° S, 134.0° E |
| `mexico` | Mexico City, close (70 km asked for) | 214 km, the deepest level | at Mexico City |
| `amazon` | the Amazon basin (3,300 × 2,300) | 3,630 km | 5.0° S, 63.0° W |
| `victoria` | Lake Victoria (480 × 480) | 528 km | 1.3° S, 33.2° E |

`view-*.jpg`, one each; the Alps is `alps-east-map-0.jpg`. The square window makes the larger extent govern. Mexico City
asks for 70 km and gets the deepest the zoom goes (level 6's texel two CSS pixels wide: 214 km across a 700-pixel window).
Reset view from a view dragged and zoomed away returned to Lake Victoria exactly.

**Two things found on the way, fixed:** the window's size can settle after the page opens (the pane laid the page out late;
an iPad turned over would do it too), so until she touches the Earth a change of the window's size frames the opening view
again; and the opening zoom was clamped at the old ground's limit because Blue Marble's deeper limit was set a frame later
(Mexico City opened at 428 km, not 214) — the limit is now set before the opening zoom.

## 6. The deepest zoom on big screens

**What I found.** The deepest level was by tier: Blue Marble 6 at full, 4 at middle, 3 at the floor. Level 4's texel is
four times level 6's, so a dropped tier stopped the zoom at a quarter of the depth — Nantucket a quarter the size, your
4 mm against 2 cm. The 6K drops the tier when the window is wide: the page's column caps the usual window at about 780 CSS
pixels, but the bars let it be dragged to the page's edge, and at two device pixels per CSS pixel that is a canvas the
timing test will not hold at 60. (The dropped tier is also remembered for the session, so it stays dropped until the tab
is closed.)

**The fix** (`earth.js`): the deepest level is the ground's alone — Blue Marble 6, the old ground 5 — at every tier. A tier
keeps its pixel ratio (the sharpness) and its tile budget (64, 48 or 32 held), and zooms as deep as full does.

**Checked** with the tier forced: at the middle tier (pixel ratio 1.5) the nearest zoom is level 6's (`mexico-tier-middle.jpg`,
14 tiles held of 48); at the floor (ratio 1), Nantucket at 214 km across, level 6 at the centre, 25 of 32 held
(`nantucket-tier-floor.jpg`). The readout now opens with the two things side by side: *tier floor (the sharpness) · deepest
level 6 (the reach, at every tier) · level 6 at the centre*. In the pane the tier drops to the floor on its own (its frames
are slow), which shows the same thing unforced.

## 7. The stretching slider

In the fine slider's place, bench only. One even line, today to 4,567 million years, the thumb the age; the Earth follows
the thumb and the main slider with it (a tap at the middle of a stretch set 619 million years, the main slider at position
534; the thumb dragged a fifth of the line, 620, position 535). Two marks, then a tap between them stretches that stretch
over the whole line in a 380 ms glide (the ends easing, the marks easing to the ends; `stretch-glide-midway.png` caught one
halfway); again and again, to a year a device pixel at the least; *back* steps out one stretch, and is absent when there is
nothing to step out of. Under the line, the stretch's two ends and **one pixel's worth**, counting the screen's own pixels
(`devicePixelRatio`, 2 on this Mac: 866 CSS pixels of line are 1,732 pixels). The main slider is unchanged.

**Both ways, switched by *tap twice* / *drag in*** (`?stretch=drag` opens on the second):

- **Tap twice:** two taps on the line put the marks down; a tap between them stretches; a tap outside the pair starts again,
  that tap the first new mark.
- **Drag in:** the marks start at the line's ends with small flags above the line to take hold of; she drags them in; a tap
  between them stretches. Until they have moved, a tap on the line sets the age, as on any slider.

**Three deep and back, tap twice** (the marks at a tenth and a fifth of the line each time; `stretch-tap-twice-two-marks.png`,
`-1.png`, `-2.png`, `-3.png`):

| step | the line | one pixel |
|---|---|---|
| the whole | today – 4,567 million years ago | 2.6 million years |
| stretch 1 | 457 – 913 million years ago | 260,000 years |
| stretch 2 | 593.7 – 639.4 million years ago | 26,000 years |
| stretch 3 | 616.5 – 621.1 million years ago | 2,600 years |
| back | 593.7 – 639.4 | 26,000 years |
| back | 457 – 913 | 260,000 years |
| back | the whole | 2.6 million years |

**Drag in** gave the same three stretches and the same three pixel values from the same marks (`stretch-drag-in-at-the-ends.png`,
`stretch-drag-in-marks-in.png`), and backed out the same way. Four more stretches of a tenth would reach a year a pixel.

Nothing about the Earth's glide between 2.6 and 5 million years changed; the age reaches `setTime` as before.

## 8. Share the kept picture, with a note

*Keep this picture* draws the picture once (`still.js`, 4,096 px at full, 1.9 s here at the floor tier) and opens a small
panel — `cw-panel.js`'s window, draggable and closeable, inside the Earth's window so it shows over a full screen — with
the picture, a line for a note, and the words *Share* and *Save*. The words under the picture are composed again as she
writes (`still.js` is now in two halves, `cwStillPicture` and `cwStillCompose`, `cwStill` the two in one, so the Sun bench
and the shelf bench are as they were).

**The picture carries**, in the page's type (`kept-with-note.jpg`, small; `kept-with-note-band.jpg`, the band at half size):

1. her note, in italics — *The Alps from above, with Como where we stayed.*;
2. the Earth's age and the place at the centre: *The Earth, today, near Como: today's ground.* — the honest block's first
   line with the place after the age; *at* a named place within 3 % of the window's span, *near* one within an eighth,
   else the latitude and longitude; *the whole world* on the flat world;
3. the grade's word and sentence, as before;
4. today's date and the credit: *30 October 2026 · The land: satellite pictures from July 2004 … NASA Earth Observatory*.

**Share** hands the file to the device's share sheet by the Web Share API, the note and the age as the message (*The Alps
from above, with Como where we stayed. — The Earth, today, near Como.*); it shows only where `navigator.canShare` takes
files. **Save** saves the file. Nothing is sent anywhere by the page. **In the pane Share does not show** (this embedded
browser cannot share files), so the panel was checked with Save alone (`kept-panel.png`): **Share is for the iPad.** The
file is a PNG of 13.4 MB at 4,096 px; Messages and Mail will take it, but a JPEG would be a tenth the size. Your call.

## Found, not changed

- **The 2D globe beside the Earth** cannot lean: while north leans on the Earth, *old globe* shows the same centre with
  north up. The comparison is meant for far out, where the lean is always nothing.
- **A phone's full screen:** the iPhone has no element full screen, so the word does not show there; the iPad does.

## Needs Michael's eye

1. **The turn over the Alps by finger,** on the iPad and the Mac, and `?turn=stand` beside it: the slide against the swing,
   and north's lean after a drag east.
2. **The two spans** of the blend (760 and 3,800 km).
3. **The seven frames**, each on its subject, and the opening size: measure the window on the Mac and the iPad and name it.
4. **Full screen on the iPad**, the real thing: the words' box at the top left, the slider's box along the bottom.
5. **The stretching slider by hand, both ways:** the flags to take hold of, the glide, the floor at a year a pixel.
6. **The kept picture's panel and Share on the iPad;** the place line's *at* and *near*; PNG against JPEG for sharing.
7. **The size readout's place** (the bottom right corner, inside) and its two seconds.
8. **The Taiwan pictures** before and after, and Fiji's.

## Changed

- **`cw-deploys/js/3d/scene.js`:** the lean (`gRoll`) and the map's slide (`MAP_SPAN`, `STAND_SPAN`, `mapWeight`,
  `decompose`, `bleedRoll`, the blend in `turnBy`); `applyGlobe` with the roll; Reset view and `glideTo` easing it out;
  `turnTo(lon, lat, roll)`, `turnOf().roll`, `feel()`, `setHome()`, `resetWord`; `?turn=`.
- **`cw-deploys/js/3d/earth.js`:** the dissolve only past the seam; `DEEPEST` by ground alone; `placeNear`.
- **`cw-deploys/js/3d/still.js`:** `cwStillPicture` and `cwStillCompose`; `note` and `date`.
- **`cw-deploys/js/cw-fullscreen.js`:** new.
- **`cw-deploys/experiments/earth-3d.html`:** the size readout; *Full screen*; the seven views, `?view=`, the reframe until
  the first touch; the readout's tier and reach; the stretching slider in the fine slider's place (`?stretch=drag`); the
  kept panel with the note, *Share* and *Save*; the stamp `2026-10-30 d0dea3d · earth-3d step 6b`; `scene.js?v=2026-10-30a`,
  `earth.js?v=2026-10-30a`, `still.js?v=2026-10-30a`, `cw-panel.js?v=2026-10-01b`, `cw-fullscreen.js?v=2026-10-30a`.
- **`cw-deploys/experiments/index.html`:** the bench's item.
- **`cw-deploys/MANIFEST.md`** and **`CWVault/00-BOARD.md`:** the entry and the delta.

`tools/check-deploys.sh`: no errors. Committed and pushed on your word, 30 Oct, this session's hunks only (`04645d1a`).
