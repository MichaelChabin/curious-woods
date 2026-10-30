---
status: Report — the fifth Earth bench revised (Prompt-Revise-Earth-Bench-05.md, Michael's rulings on step 5); built 29 Oct 2026 on 53ca022; checked in the pane on the Mac and, for the lakes, in the iPadOS 26.5 simulator; committed and pushed on Michael's word, 29 Oct
role: What changed (the lakes, today's coast, the continents held still this side of the seam, the pale wash, one list of places, land lighter settled), what was found, what was checked, and what needs Michael's eye
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-05.md, Prompt-Revise-Earth-Bench-05.md, cw-deploys/js/3d/earth.js, cw-deploys/experiments/earth-3d.html, Earth-3D-Revise-Oct29/ (the pictures)
updated: 2026-10-29
---

# Report: the Earth bench, step 5 revised (29 Oct 2026)

**The spec first.** `Spec-Earth-3D.md` says, under *The plates*, "**This side of the seam the continents stay where they
are today**". Checked; nothing written in it.

Nothing a child sees changes. Only `js/3d/earth.js` and `experiments/earth-3d.html` changed, and only the bench loads
`earth.js`. The Time Machine, the Sun bench and the Van Gogh story open with no console messages.

The pictures are in `Earth-3D-Revise-Oct29/`, 26 small JPEGs, 1.1 MB.

## 1. Lakes keep their water

**What I found.** The buff speckles were not the lowered sea being applied to lakes. They came from Safari.

- **The data was already right.** The floor and shelf data hold 0 at every level in the Caspian, the Black Sea, Urmia,
  Van, the Great Lakes and Lake Victoria (I sampled every level that has tiles there). The shader only bares floor whose
  depth is above zero, so the floor data's own rule — 0 for land and for water not joined to the ocean — was already the
  rule.
- **On the Mac's Chrome engine there were no speckles at any tier.**
- **In the iPad simulator's Safari the speckles appeared at once.** The Caspian at 13,000 years was full of them:
  `ipad-sim-caspian-13000y-before.jpg`.
- **The cause.** Safari's `createImageBitmap` hands back some of a greyscale PNG's 0s as 1s. A small test page measured it:
  253 of the Caspian's 1,840 zeros came back as 1. It happens with `colorSpaceConversion: 'none'` too. The same PNG drawn
  through an `Image` reads back exact.
- **Why that shows as buff.** Filtered between 0s and 1s, a lake's floor reads as a metre or so of ocean, and a sea 63 m
  lower bares it.

**The fix.** The data tiles now go through an `Image` (`fetchExact` in `earth.js`). The pictures still use
`createImageBitmap`; a step of one in a colour does no harm. After the fix the Caspian at 13,000 years is clean in the
simulator: `ipad-sim-caspian-13000y-after.jpg`.

Nothing else on the site used `createImageBitmap`. The Time Machine's map and 2D globe read their floor through `Image`,
so they never had this problem.

**The six lakes at today, 13,000 and 21,000 years, close in** (`lakes-today-13000y-21000y.jpg`; rows are the ages,
columns the Caspian, the Black Sea, Urmia, Van, the Great Lakes and Lake Victoria): every lake is the same at all three
ages. None is bared, and none has buff in it.

- **The Great Lakes** are under ICE-6G's ice at 13,000 and 21,000 years, as the ice was.
- **Urmia** shows the photograph's own green-blue water. The photograph's colour there isn't read as sea, so it shows as
  the picture has it.
- **Van and Victoria** read as water.

**The Black Sea** is a lake in the data: "the Black Sea, whose strait is narrower than a cell, counts as a lake — as it
roughly was at the ice-age low" (MANIFEST, the shelf layer). So it never drains, and it isn't painted buff. The Sea of
Marmara, joined to the ocean through the Dardanelles, does bare at 21,000 years. If you want the Black Sea to drop with
the ocean, that's a change to the data, and your call.

**One thing left, seen on the Mac too and at every age.** The photograph's own dark water at the Caspian's edges and in
the Sea of Azov shows as a few dark specks. Those pixels are dark olive, for example (18, 33, 0), and the sea test doesn't
read them as water. No colour rule can take them as water without taking the forests too: the dark pixels the test misses
are mostly the Amazon and the boreal forests. They are the picture as it is, not something the lowered sea does. Cleaning
them would need a lake outline from elsewhere.

## 2. Today's coast only on its word

Today's coastline is off at every age, today included. *today's coasts* turns it on. The old fade-out past the seam is
gone, since the line is now off unless the word is on.

Checked at today, 21,000 years and 250 million years, off and on: `coasts-off-*.jpg` and `coasts-on-*.jpg`.

## 3. The continents hold still this side of the seam

**This side of the seam.** From today to the seam at 2.6 million years every piece stands at today's position, as the old
globe and the map have it.

**At the seam.** The plates start there, from the model's own turn at 2.6 million years, as globe.js's pieces do.

**The ball of today's ground under the pieces.** It is honest again this side of the seam, and it fades out with the
photograph: whole today, gone at the seam.

**San Francisco at 110,000 years, close in:** one coast, with the lowered sea's buff shelf off the Golden Gate
(`sf-110000y.jpg`, and `sf-110000y-wide.jpg` at 600 km).

**At the seam itself, close in:** the pieces jump.

| where | 2.59 → 2.61 million years | pictures |
|---|---|---|
| San Francisco | 164 km | `sf-2.59ma.jpg`, `sf-2.61ma.jpg` (400 km across; at 2.61 the coast is a third of the view away) |
| New Guinea (the Owen Stanley range, 7° S 147° E) | **416 km, the largest** | `newguinea-2.59ma.jpg`, `newguinea-2.61ma.jpg` (1,800 km across) |
| New Caledonia's piece | 365 km | |
| Baja California | 243 km | |
| Paris | 137 km | |
| Tokyo | 118 km | |
| Melbourne | 84 km | |
| the median plate | 130 km | |

I measured this over every living piece's outline, from today's turn to the model's turn at 2.6 million years. Even
Europe moves, because the plate model's frame turns the whole crust over 2.6 million years. Out at the whole ball, 130 km
is just over a degree. Close in it is a visible snap. Showing the plates move close in is the later step, plate
boundaries, and I haven't started it.

**Iceland** (`iceland-2.59ma.jpg`, `iceland-2.61ma.jpg`) is gone on both sides of the seam. No piece holds Iceland, or
Hawaii; only the ball of today's ground does. So, fading with the photograph, they fade out from today and are gone by
the seam: half there at 1.3 million years. That is what the ruling gives, but it looks like islands sinking. **Needs
your eye.**

## 4. The pale wash goes this side of the seam

The pieces painted the picture's sea in the pale shelf wash at 55%, and where pieces overlap the wash doubled. That's
where the straight-sided polygons came from. This side of the seam the wash is not drawn: the sea there is the sea ball
alone.

Past the seam it comes in over 3.14 million years, the ramp the Antarctic ice comes in on, so it's whole by about 5.7
million years and never snaps. I didn't tie it to the ground grade's own fade: that comes back up near 34 million years
as the Antarctic ice ramps out.

- **Japan at today:** plain sea, no polygons (`japan-today.jpg`, `japan-today-close.jpg`).
- **Japan at 3 million years:** an eighth of the wash (`japan-3ma.jpg`, `japan-3ma-close.jpg`).
- **The lakes:** the polygons that ran across the Caspian and the Black Sea in step 5 are gone too, in every picture
  above.

## 5. One list of places, and a word

**Where the list comes from, in one sentence:** the places the stories share (`stories/places.json`), and then each of
the Time Machine's dozen modern cities (`stories/plates/cities.json`) that has no story place within 25 km of it.

- **The overlap.** Three cities were already there: Paris, Beijing, and Tokyo, which the stories call Edo (7 km apart).
  The other nine cities join the list at weight 2, in the middle of places.json's 1 to 3.
- **One style.** Every place is drawn the way the stories' places are: a vermilion dot and the name with its halo.
- **The halo.** I gave every name a halo because the photograph needs one: names are hard to read over Blue Marble
  without it. The cities had none, by your ruling of 13 Oct for the 2D globe. **Overrule it if you'd rather.**
- **Beijing shows once** (`beijing-once.jpg`).
- **The word.** *places*, in the left column under *today's coasts*, turns them all off and on: `places-on-china.jpg`,
  `places-off-china.jpg`. The bench-only test places over Australia and the Sahara go behind the same word
  (`australia-places-on.jpg`, `australia-places-off.jpg`). Checked by a real click.
- **Tokyo shows as Edo**, the stories' name. **Say if you want the modern name instead.**

## 6. Land lighter is settled

The bench's land lighter is now fixed at 100, as a constant in the code. The slider and its settings are gone.

## Measured

The prompt asked for the frame time in a close view of the Alps, against step 5's 13.3 ms. **That comparison couldn't be
made today.**

- **Why.** Safari was running on the Mac and holding the graphics card (two WebKit processes at 25 to 36% CPU), so the
  same timing ran slower all afternoon.
- **What I did instead.** I served the committed step 5 from a worktree and timed both versions in turns, in one tab, under
  the same load, with the same bench timer (the Alps at 500 km, 1402² device pixels, WebGPU, 40 frames, waiting for the
  card).

| | ms a frame |
|---|---|
| step 5b | 35.1, 37.4, 37.4, 39.7 |
| step 5 | 38.0, 38.5, 38.6, 39.9 |
| step 5b again | 35.1, 35.3, 36.1, 36.8 |

So 5b costs no more than 5; if anything it is a hair cheaper, with today's coast line no longer drawn. Earlier in the
session, before the slowdown, 5b measured 13.8 to 14.9 ms in one tab while 5 measured 11.4 to 12.3 in another, with the
iPad simulator running beside them. The in-turn comparison above is the one I trust.

## Needs Michael's eye

1. **Iceland and Hawaii fade out before the seam**, because no piece holds them and today's ground fades with the
   photograph.
2. **The jump at the seam close in:** 130 km at the median plate, 416 km at New Guinea. That's the honest model, and it
   waits for plate boundaries.
3. **The halo on every name**, the former cities' included.
4. **Tokyo shown as Edo.**
5. **The Black Sea stays full at 21,000 years**, as the data has it.
6. **The photograph's own dark specks** in the Sea of Azov and at the Caspian's edges.
7. **The frame time**, to be checked on the iPad, or on the Mac when Safari isn't running.

## Not done, as the prompt says

- I haven't started watching the plates move close in (plate boundaries).
- Committed and pushed on your word, 29 Oct, this session's hunks only.

## Changed

- `cw-deploys/js/3d/earth.js`.
- `cw-deploys/experiments/earth-3d.html`:
  - the *places* word;
  - the slider gone;
  - bench only, `?at=lon,lat,km`, which opens straight down on a place (for the simulator, which has no console);
  - the stamp `2026-10-29 53ca022 · earth-3d step 5b`, and `earth.js?v=2026-10-29a`.
- `cw-deploys/experiments/index.html`: the bench's item.
- `cw-deploys/MANIFEST.md`: a new entry.
- `CWVault/00-BOARD.md`: the delta.

`tools/check-deploys.sh`: no errors. Its one warning is Glass Multiplication's missing tab icon, from before this step.
