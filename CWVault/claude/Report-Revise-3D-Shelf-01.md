---
status: Report — the 3D shelf brought to the standard, 27 Oct 2026, morning; built and checked, not committed. Michael to read and say commit.
role: What was changed to Michael's prompt of 27 Oct (and the standard, which wins where they differ), what was checked and how, and what stays open.
related: Standard-Interactives.md, Report-3D-Shelf-Oct26.md (its last section is the list this answers), Prompt-Build-Earth-Bench-01.md (runs after this)
---

# Report: the 3D shelf, brought to the standard (27 Oct 2026)

Michael's prompt: *the shelf was built before the standard reached the disk; this session makes them agree.* Eight
items, taken in his order. Changed: `cw-deploys/js/3d/` (scene, honest, still, glow), `js/cw-style.js` (colours
only), `experiments/sun-3d.html`, and one new bench, `experiments/shelf-3d.html`; plus `tools/check-3d-tiers.mjs`,
a Node check of the tier timer. `globe.js`, `map.js`, the Time Machine and every story are untouched; the Time
Machine opens unchanged (stamp `2026-10-24-pinch 56b88f0`, no errors). Nothing of the Earth bench prompt was
started.

## What changed, item by item

**1. No idle turn.** `scene.js` keeps the `turn` option but its default is 0; the Sun passes none. The page opens
still, apart from the boiling, which is motion that shows something. *Reset view* no longer brings a turn back,
since there is none to bring.

**2. The scale notes, on the picture.** `honest.js` is rebuilt. `cwHonest(view, { notes, credit, keep })` draws each
note on a 2D canvas laid over the stage: a short italic label (Georgia, `parchmentDeep` on the dark ground), a thin
drawn bracket the width of the stretched thing (`span` in world units, with a short tick at each end turned toward
the words, in `grey`), and a leader from the bracket's middle out past the limb to the words. The anchor is a point
in the ball's frame (or the scene's), so the note is re-placed every frame the ball or the camera moves, and it
hides while the surface there faces away from the camera. A note may carry a `show()` so it appears only when it is
true. The words wrap onto two or three balanced lines where the margin is narrow; where it is narrower than
150 px — a tablet held upright, where the ball fills the stage sideways — the leader slants out away from the ball's
middle and the words may sit over the dark limb, with a soft halo of the ground under them; and they keep out of
bands the page names (`keep`, for the Sun's hint line along the bottom). The same `draw(ctx, w, h, scale)` draws the
notes onto the kept picture at its size.

The Sun's notes are two. *granules: drawn about fifty times too big* (a real granule is about 1,000 km across; here
each is about a fiftieth of the Sun's width), beside a patch of granules on the surface the camera sees at the
home view, away from the cut, its bracket about seven drawn granules wide. And *time: running a few hundred times
fast* (a granule lives about ten minutes; here a second or two), shown only while the boiling runs — with *Boiling*
off, or the page still under reduced motion, time does not run fast and the note goes. The zones, the limb and the
colours are to scale or true, and say nothing. No square brackets anywhere. The old block under the stage is gone;
its credit line now sits as plain page text under the legend.

**3. The marks of knowing.** Not built. A comment at the head of `honest.js` says they belong there (§5: the more we
know, the more solid the picture — a photograph, then solid with crisp edges, then painted and washed) and that the
Earth will need them first. The Sun shows nothing by grade.

**4. How a page picks its tier.** Rewritten to §2 and §7, in `scene.js`:

- The display's refresh is measured once, before the first frame, from empty animation frames (which run at the
  display's own rate) and snapped to a common rate (59-and-a-bit is a 60 Hz screen). The page must hold 60 a
  second, or the refresh if that is lower. If the refresh cannot be told (a hidden tab gets no frames) it is 60.
- The first two seconds of drawing are timed; the first drawn frame starts the clock. If the average frame runs more
  than 8% over the frame's time (60 under vsync measures 59-and-a-bit), the view drops a tier and times two seconds
  again. Four seconds of frames nearly all stalls is a machine that cannot hold the rate at all, and drops too.
- Then the sag check: each second is a sagging one if ten or more frames were drawn and either the clean ones ran
  15% slow or nearly all were stalls; five sagging seconds running drop once more. If the sag goes on, another five
  drop again, to the floor and no further.
- Never up within a visit. The settled tier is remembered in sessionStorage, so a reload starts there.
- Frames drawn while the page is hidden are not timed (the first test's lesson). A stall — one frame of 60 ms or
  more: a shader compiling, a tab coming back — is left out of an average rather than counted. The threshold moved
  from 50 to 60 ms because three refreshes of a 60 Hz screen is exactly 50 ms, and the slowed page in the iPad
  simulator sat there, every frame a "stall" and nothing counted; 50 ms is a slow frame and now counts. A stretch of
  fewer than ten frames says nothing, so a page throttled to a frame or two a second while still "visible" is not
  read as a slow machine.
- `?tier=` forces a tier and skips the timing; `?gl=1` and `?reduce=1` as before.

The timer is its own small object, `cwTierTimer`, exported from `scene.js`, so `tools/check-3d-tiers.mjs` can feed
it made-up frames: steady 60, steady 30, stalls every half second, every frame a stall, three refreshes a frame,
throttled while visible, a hidden tab, 55 and 52 a second, a 50 Hz and a 120 Hz display, a sag that holds and one
that recovers, a sag that goes on, a sag of stalls, a page already at the floor. Nineteen cases, all pass
(`node tools/check-3d-tiers.mjs`). This was needed because the browser pane runs a page's frames steadily only
while it is being looked at (see *Checked*).

The GPU-cost readback (the 26 Oct report's item 2) is not added. Timing frames still cannot tell *60 with room to
spare* from *60 barely*; the readback could pick a tier in one frame. Open.

**5. The ground.** The Sun's stage is `black` (`#0c0a08`) from `CW.STYLE`, read by the page's CSS as `--cw-black` and
passed to the scene; the scene's own default is the same. The bench's `#140f0b` is gone; so are its two other
literal greys (the hint and the readout take `grey`).

**6. Colours.** The tapped zone is marked in vermilion, in the legend's bar and the word in the sentence. The Sun's
colours are one named group in `cw-style.js`, `sun`: the surface's three (`surfaceCool`, `surfaceMid`,
`surfaceHot`), the limb's tint, each zone's two stops (`coreIn`/`coreOut`, `radiativeIn`/`radiativeOut`,
`convectionDeep`/`convectionBright`), each zone's one name colour for the legend's swatches (`core`, `radiative`,
`convection`, `surface`), and the glow. The numbers are the sketch's as the bench carried them, so the picture is
unchanged — with one exception, found on the way. The group is read as `CW.STYLE.sun.<name>`; nested groups are
not written as CSS variables, and the legend's swatches are set from the group by script. The bench reads a colour
into a shader through `cwRGB(hex)` (exported from `scene.js`): the hex as display values into `sRGBTransferEOTF`,
never through `THREE.Color`, which would take the hex for sRGB and convert it to linear before the shader converted
it again.

*The exception:* `glow.js` did exactly that. Its `#ffbe6e` went through `THREE.Color` (to linear) and then through the
shader's `sRGBTransferEOTF` (to linear again), so the glow drawn was a redder, darker thing than the colour named —
the 25 Oct sketch's halo was a canvas sprite and showed the named colour. `glow.js` now reads its colour as a display
value like everything else, and the Sun's glow is the `sun.glow` the style file names: a little more yellow-orange,
a little less red than yesterday's. Michael may prefer yesterday's; if so, it is one hex in `cw-style.js`.

**7. A bench for each shelf piece.** `experiments/shelf-3d.html`, one page. A word in the left column picks the piece,
and the stage shows it alone on a plain ball — a quiet grey-brown (`rockTan`) lit from the upper left, with a
hairline grid every thirty degrees so a turn can be seen: *Scene and gestures* (the turn, pinch, two fingers, the
tap — the readout says what was hit — *Reset view*); *Cut-away* (the quarter out, the cut faces drawn by radius with
a ring every quarter of the way in, *Cut open* to close and open it); *Noise* (three further words: `noise3`, `fbm3`,
`cells3`, each on the ball in grey, drifting with time); *Glow* (the one glow behind the cut ball, stronger than the
Sun's so the piece shows plainly, and the faces clean, which is the point); *Scale notes* (two sample notes with
their brackets, turning with the ball and hiding on the far side); *Kept picture* (*Keep this picture*: 4,096 px on
the long side with the notes, a caption and the credit). A line under the stage says what each piece is. Plain, a
workbench. The readout (backend · tier · fps · the rate it must hold · the tap) is the bench's only. Listed in
`experiments/index.html`; MANIFEST entry. The bench wears the star's icon, as the Sun does.

*Found on the way:* the Sun's own item in `experiments/index.html` had been written inside the file's template
comment on 26 Oct (at `HEAD` too), so the Sun bench was never listed on the live experiments page. It is out of the
comment now, above the new bench's item, and its meta line says so.

**8. The kept picture.** `cwStill(view, { long, honest, caption, credit })`: full tier, 4,096 px on the long side,
the notes drawn on the picture where they sit on screen (the same code, at the picture's scale; a note hidden on
screen is hidden on the still), then a band under it in the ground colour with the one-line caption and the small
credit. The Sun's caption is *The Sun, cut open.* until Michael writes a better one. The Sun's still is
4,096 × 2,482 (about 4 MB); the shelf bench's 4,096 × 3,001.

## Checked

**On the Mac, in the browser pane (Chromium), WebGPU and `?gl=1`:**

- The Sun opens still apart from the boiling; the readout reads *WebGPU · full · 60 fps · holds 60 of 60 Hz*, no
  console error; on `?gl=1` the same picture on WebGL 2, the test done at full.
- The two notes sit beside the granules on the left of the ball with their brackets and leaders, and follow a drag;
  with *Boiling* off the time note goes and comes back.
- A tap on the core writes *You touched the core…* with *core* in vermilion (`rgb(200, 72, 48)`) and marks the
  legend's bar in the same; the legend's swatches are the `sun` group's.
- `?tier=floor` and `?tier=middle` force the tier (pixel ratio 1 and 1.5, timing skipped); the drop by timing could
  not be seen here, for the reason below.
- The kept picture, on both backends: 4,096 × 2,482, the right way up, both notes where they sat, the caption and
  the credit under it.
- `?reduce=1`: opens still, *Let it move* then *Hold still*, the time note hidden while still.
- 375 px: the one frame at full tier and *This one needs a bigger screen*, no sideways scroll; the hint is hidden on
  a phone (it overlapped the line before). At 820 px (a tablet upright) the notes slant out over the limb, three
  and two lines, readable.
- The shelf bench: each piece alone — the turn and the tap on the plain ball, the cut-away with its rings, the three
  noises, the glow with the faces clean, the two sample notes turning with the ball, the still 4,096 × 3,001 with its
  note, caption and credit; stacked above the stage at 375 px.
- The Time Machine opens unchanged. `tools/check-deploys.sh`: no errors.

**The pane cannot time frames.** It runs a page's animation frames steadily only while it is being looked at
(a screenshot, a click); between tool calls the readout shows 0–3 fps on either backend, and WebGPU presents at
about 1 fps even then (the 26 Oct report's 2–7). So the tier drop and the sag check were checked two other ways:

- `tools/check-3d-tiers.mjs`, above: the timer with made-up frames, nineteen cases.
- **The iPad Air 11-inch (M4) simulator, Safari, iPadOS 26.5, portrait, WebGL 2** (the simulator has no WebGPU),
  where frames are real. `?slow=25` (a 25 ms busy-wait in every frame, bench-only): the readout went to *floor ·
  32 fps · holds 60 of 60 Hz* — full → middle → floor through the two-second test, taken twice. `?slow=25&slowAfter=9000`:
  the test passed at full, then *full (sag 3)* was seen counting, and the page ended at *floor (sag 4)* — two drops
  through the sag check, then sagging at the floor with nowhere to go. The notes on the iPad upright: the granule
  note slanted up-left over the limb in three lines with its halo, the time note down-left in two. The simulator
  was shut down after.

**Not checked:** WebGPU in Safari (the real iPad and a Mac Safari have it; the simulator does not); the iPad itself;
the heat; a tier drop on a machine that is actually slow rather than slowed. The look of the notes and the glow's
colour are Michael's to judge on the iPad.

## Open, named

- **The GPU-cost readback** for picking a tier in one frame (the 26 Oct report's item 2). Not added; the timing
  stands on frames, which cannot tell *60 with room to spare* from *60 barely*.
- **Versioning the shelf's module imports** (`?v=`). The shelf's files import only `three`, never each other, so the
  page bumps `?v=` on each shelf file it imports (now `2026-10-27b`) and the vendor folder is versioned by its name.
  Safari in the simulator did serve a stale `honest.js` under an unchanged `?v=` during this session's checks, which
  is the case for a rule.
- **WebGL 2's readback waits on `requestAnimationFrame`** (three r186), so a still cannot be made while the page is
  hidden on that backend. Harmless for a child.
- **The marks of knowing** (item 3): the Earth first.
- **Two judgments for the iPad:** the glow's colour, now the named one (item 6); and whether a sagging page throttled
  by the browser while still reported "visible" (an occluded window, say) should drop — it does, after five seconds
  with ten or more frames a second drawn, because it cannot be told from a failing machine; at one or two frames a
  second it says nothing.
- **The Sun's own icon** and a better caption than *The Sun, cut open.*

## Next

Michael opens `localhost:8765/experiments/sun-3d.html` and `experiments/shelf-3d.html` on the Mac (and, after a
commit and push, `curiouswoods.org/experiments/…` on the iPad), reads this, and says commit or not. Then
`Prompt-Build-Earth-Bench-01.md`, which adds the desk-globe turn to `scene.js`.
