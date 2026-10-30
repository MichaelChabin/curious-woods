---
status: Report — the Earth bench, step 6c (Prompt-Revise-Earth-Bench-06c.md, Michael's seven items after trying 6b on the Mac and the iPad); built 30 Oct 2026 on 2e8f3b3; checked in the pane on the Mac; committed and pushed on Michael's word, 30 Oct (de85b504)
role: What was built for each of the seven items, the wording of the new lines for Michael to adjust, the window's size rule and what it gives, what was checked, and what needs Michael's eye
related: Spec-Earth-3D.md, Worknote-Time-Slider.md, Report-Earth-3D-Bench-06b.md, Prompt-Revise-Earth-Bench-06c.md, cw-deploys/js/3d/scene.js, cw-deploys/js/cw-fullscreen.js, cw-deploys/experiments/earth-3d.html, Earth-3D-Bench-06c-Oct30/ (the pictures)
updated: 2026-10-30
---

# Report: the Earth bench, step 6c (30 Oct 2026)

Step 6b was committed and pushed (`04645d1a`, the board after it `2e8f3b3`), so this is built on `2e8f3b3`. Nothing under
`CWVault/` was stashed, restored or checked out; the spec is unchanged. Nothing a child sees changes: `earth.js`, `still.js`,
`globe.js`, `map.js`, the Time Machine and every story are untouched. `scene.js` and `cw-fullscreen.js` are shared; the Sun
bench, the shelf bench, the Time Machine and the Van Gogh story open clean (no console errors, the words and the map's tiles
there).

The pictures are in `Earth-3D-Bench-06c-Oct30/`: 24 of them, about a megabyte. The page-layout ones are the pane's own
screenshots (DOM and all); the Earth-alone ones are the canvas read back through `cwShot`.

## 1. The stretch belongs to the top line

The age slider is now one even line, today at its left end and the Earth's birth at its right, and it is the stretching
line. The second line, its *tap twice* / *drag in* switch, and the main slider's stretched scale near today (the cube law
to ten million years and the knots, one segment an era) are gone.

- **Two small copper flags** sit at the line's two ends (a pole with a pennant turned inward; `.flag` in the page). She drags
  them in to bracket the years she wants; a flag stays inside the line and on its own side of the other (two pixels at
  least between them).
- **A tap on the line sets the age**, as on any slider; a press on the line that moves drags the age. The thumb is the age and
  the Earth follows it throughout.
- **Once a flag has moved, the word *stretch* appears** beside the line (to its right, in the row with the slider; the words'
  slot is 118 px wide so the line never changes length when a word comes or goes). A tap, and the line glides in 380 ms to
  run between the flags' years, the flags easing back to the ends as it goes, ready to go again. To a year a screen pixel
  at the least.
- ***back*** steps out one stretch, and is absent when there is nothing to step out of. Both words fade in and out
  (`.word.absent`); neither is shown while a glide runs.
- **Under the line:** its two ends, and *one pixel:* what one of the screen's own pixels is worth now (`devicePixelRatio`,
  2 on this Mac; the line is 668 CSS pixels at the usual window, 1,336 of the screen's).

**Three deep and back, by script** (the flags at a tenth and a fifth of the line each time; `stretch-flags-in-word-stretch.png`
shows the flags in and the word present, `stretch-1-457-to-913.png` the first stretch):

| step | the line | one pixel |
|---|---|---|
| the whole | today – 4,567 million years ago | 3.4 million years |
| stretch 1 | 457 – 913 million years ago | 340,000 years |
| stretch 2 | 502.4 – 548 million years ago | 34,000 years |
| stretch 3 | 506.9 – 511.5 million years ago | 3,400 years |
| back | 502.4 – 548 | 34,000 years |
| back | 457 – 913 | 340,000 years |
| back | the whole; *back* absent | 3.4 million years |

The same by real taps on the words *stretch* and *back* in the pane: 457–913, then the whole. An age set at the middle of
the third stretch gave 509.2 million years and the title line *The Earth at 4,058 million years old: 509 million years ago*.

## 2. The turn is the stand

`scene.js`: the map's slide (`gRoll`, `MAP_SPAN`, `STAND_SPAN`, `mapWeight`, `decompose`, `bleedRoll`, the blend in `turnBy`,
`feel()`, `?turn=`) is removed. East spins the globe about its own axis at every zoom and north stays up; `turnOf()` is a
longitude and a latitude again, `turnTo(lon, lat)`. The Sun keeps the trackball.

**Checked over the Alps,** 1,155 km across the window, three drags east of a third of the window each (`alps-east-0..3.jpg`):
the centre's longitude 10.4° → 16.8° → 23.3° → 29.7° E, the latitude 46.2° N throughout; the top-left and bottom-left corners
of the window kept their latitudes exactly (49.67° and 42.32° N) and moved the same 6.43° of longitude — the stand's turn
about the pole, north up. The third picture has the Carpathians and the Black Sea.

## 3. How the page opens

- **Blue Marble** (`?ground=old` for a check).
- **The whole globe**, the camera at `HOME_DISTANCE` (4.9, where the ball fills the window's height, as the 2D disc fills its
  square), centred on one of the seven places at random; `?view=` picks one; *Reset* returns to that view (`view.setHome`).
  The 6b extents and the reframe on a late layout are gone — the ball's size does not depend on the window's.
- **Today**, on the even line.
- **Nothing remembered.** The page never stored anything but `scene.js`'s tier for the session (`sessionStorage`), which
  stays; there is no saved view, age, ground or word, and none is read.

Four reloads without `?view=` opened on Mexico City, the Nile, Mexico City and Australia (`open-1-mexico.jpg`,
`open-2-nile.jpg`, `open-3-mexico.jpg`, `open-4-australia.jpg`): each the whole ball, Blue Marble, today, the camera at 4.9.
`opening-page-1280x800-alps.jpg` is the whole page as it opens in the pane at 1,280 × 800.

## 4. Zooming out keeps the centre

`scene.js` `zoomAt`: the ground is held under the pointer, or between two fingers, only when the zoom comes in (`f < 1`); a
zoom out keeps whatever is at the centre at the centre and the turn as it is.

**Checked from Norway,** 600 km across the window, centred on 8° E, 61° N, the pointer a fifth of the way in from the left
edge: fourteen wheel steps out took the window to about 7,700 km across and the centre stayed 8° E, 61° N exactly
(`norway-0.jpg`, `norway-out.jpg`). Fourteen steps back in at the same pointer held the ground under it to a few hundredths
of a degree (−25.40°, 56.42° → −25.44°, 56.40°), the centre moving to −21.7°, 56.5° as it must; that point is open Atlantic,
so `norway-in-at-pointer.jpg` is sea; `norway-out-then-in-at-london.jpg` repeats the zoom in with the pointer on London, held to a twentieth of a degree.

**Does it feel inconsistent?** On a wheel, no: zooming in toward the pointer and zooming out about the centre is what a
desktop map does, and the ball never slides away under a zoom out. On the iPad a pinch out is the one case to try by hand:
the ground between the two fingers no longer stays between them as they close (it did in 6b), though a two-finger drag still
turns the ball under them. If that feels wrong, the pinch could keep holding the midpoint while the wheel keeps the centre;
it is one condition in `zoomAt`.

## 5. The layout

**The left column**, top to bottom: the title; *How this works*; then *Map* / *Globe*, *Current year*, *Coastlines* /
*Hide coastlines* (today's coasts, renamed; one word whose text says what a tap will do), *Reset* (`scene.js`'s Reset view,
renamed on the page), *Save or share* (Keep this picture, renamed; the same panel with the note, *Share* and *Save*), *Full
screen*. The bench's own words are no longer in the column.

**The two panels** are `cw-panel.js`'s window, as Glass Geometry's: draggable by its whole surface, a *close* word at the top
right, fading in and out; inside the Earth's window so they show over a full screen; each opens over the window's top left
corner (the second to the right of the first, so both can be open) and where she left it after that; the column word is
underlined while its panel is open (`panel-how-this-works.jpg`, `panels-both-open.jpg`).

- ***How this works*** (344 px wide): a first draft in two short paragraphs, *The picture* and *Using it*, for you to rewrite;
  below a rule, *for the bench*: *Blue Marble* / *old ground*, *old globe*, *another guess*, *places*, and the readout in
  three short lines (backend, tier, frame rate, the deepest level and the level at the centre; the view's centre, the
  kilometres across, the view it opened on, the window's size; the tiles held and the seed). The long figures (triangles,
  build times, Blue Marble's size, the simulation's costs, the floor, the tiles' traffic) are behind `cwStats()` in the
  console. The panel is 666 px tall at 1,280 × 800; it was 821 with the old one-line readout, taller than the screen.
- ***Current year*** (300 px wide): a first draft on the line, the flags, *stretch* and *back*.

**Under the globe**, in a column exactly as wide as the window (`#underCol`; its width is set with the window's, so it
follows the bars): the age slider with its flags, *stretch*, *back* and the line under it; then **the title line**; then
**the text box**.

**The title line's wording:**

- at today: *The Earth today, 4,567 million years old*
- otherwise: *The Earth at 4,317 million years old: 250 million years ago* — the age in whole millions (4,567 less the years
  ago, rounded), the years ago as the slider has always said them (years under a million, thousandths of a million under ten,
  whole millions above). So at 4,509: *The Earth at 58 million years old: 4,509 million years ago*; at 21,000 years ago it
  would read *The Earth at 4,567 million years old: 21,000 years ago*.

**The text box** holds the introduction at first — three sentences on the ball and the line, ending with *The land:
satellite pictures from July 2004, a month of them stitched together without clouds. NASA Earth Observatory.* (the
credit line in the small grey of the honest block's; it follows the ground, so `?ground=old` names ETOPO and Copernicus) —
and from her first change of the year, the honest block for that age: what the picture is, the grade's word and sentence
(the molten phase's, the glide's note), and the credit. It does not go back to the introduction. `text-box-today-the-introduction.png`,
`text-box-250-million-years.png` (*inferred*), `text-box-4509-million-years.png` (*moon*). The introduction above the
globe is gone; the page's long credit line (ETOPO, Copernicus, Merdith) stays at the foot of the page.

## 6. The window's opening size

One rule (`usualSize` in the page):

- **width:** as wide as the column allows, up to **800**;
- **height:** as tall as leaves the age slider and the title line on screen without scrolling — the browser's inner height,
  less the window's top on the page (28 px), less **150** for the bars, the slider, its ends and the title line — capped at
  **7/8 of the width** and never under **320**.

What it gives (the inner height is the browser's, so a Safari window on the Mac is shorter than the pane; the column is
the page's 1,040 less the left column, so the width is 800 wherever the page is at least about 1,000 wide):

| where | inner size | the window | the title line's foot |
|---|---|---|---|
| the pane at 1,280 × 800 | 1,280 × 800 | 800 × 622 | 785, on screen |
| a Mac Safari window of 680 inside (Michael's ~500) | 1,440 × 680 | 800 × 502 | 664, on screen |
| the iPad across, Safari (820 less its bar) | 1,180 × 740 | 800 × 562 | 724, on screen |
| a large monitor | 2,560 × 1,440 | 800 × 700 (the 7/8 cap) | 862 |
| the iPad upright | 820 × 1,100 | 604 × 529 (the width is what the column leaves) | 691 |
| a tablet of 768 | 768 × 1,024 | 552 × 483 | 645 |
| a phone | 375 × 812 | 343 × 320 (the floor; one column) | 652 |

So the Mac's 500 and the iPad's 700 both come out of the one rule, but by different limbs: the Mac's by the inner height, the
iPad's across by the inner height too (562, not 700 — Safari's bar takes 80 of the 820), and 700 only where the screen is
tall enough to reach the 7/8 cap, which the iPad does upright (but there the column narrows the width to 604). If 800 × 700
on the iPad across is what you measured, the rule's 150 or the 7/8 can give (the slider and the title would then sit just
below the fold on that screen). The bars and the size readout stay; *Reset* puts the window back to the usual size.
`opening-page-2560x1440-amazon.jpg`, `tablet-portrait-820x1100.jpg`, `phone-375x812.jpg`.

## 7. Full screen

`cw-fullscreen.js` and the page's CSS:

- **A margin above and below the ball:** in full screen the stage is inset 44 px from the top (plus the top safe area) and
  132 px from the bottom (plus the bottom safe area); the ball fills what is left, so at 1,280 × 800 it is 600 px tall with
  about 56 px of parchment above it and the slider's box below (`full-screen-1280x800-pane.jpg`).
- **The words lower and clear of the safe areas:** the words' box sits 64 px below the top safe area and 16 px in from the
  left one, clear of the iPad's close button; the bottom box clears the bottom safe area.
- **The title and every command:** the box holds *The Earth, in 3D* (an `h1`, styled small there), *How this works*, *Map*,
  *Current year*, *Coastlines*, *Reset*, *Save or share*, *Full screen*; the bottom box the age slider with its words and the
  title line. On the way out everything goes back where it was (checked: the column's order and the under-column's).
- **A window taller than wide** (a tablet held upright in full screen): `scene.js` widens the field of view so the ball fits
  the width as it fits the height elsewhere; the shorter side governs, as the turn's `radPerPx` already had it. Not tried on
  a device.
- **The pane and the API:** a real tap on *Full screen* in the app's pane gets no answer at all from the Fullscreen API (6b's
  check went through a script call, which the pane refuses at once). The script now falls back to filling the viewport if
  nothing has answered in 1.5 s, so the tap works here too; on the iPad the API answers at once and the fallback never
  runs. **The real full screen is still for the iPad.**

## Also checked

- `tools/check-deploys.sh`: no errors (every page; the stamp `2026-10-30 2e8f3b3 · earth-3d step 6c`).
- The kept picture's panel still opens and composes (the word is *Save or share*; the panel is 6b's).
- The experiments index's item and MANIFEST say what changed; the board has the delta.

## Needs Michael's eye

1. **The flags by finger on the iPad:** their size (a 13 × 9 pennant on a 30 px pole, with a hidden 24 px grab zone), how
   they feel to drag in, and whether *stretch* and *back* are where the eye looks for them (to the right of the line).
2. **The pinch out** on the iPad under item 4, and whether zoom in toward the finger beside zoom out about the centre feels
   right.
3. **The words:** the two panels' drafts, the title line (*at … old: … ago*), the introduction's three sentences.
4. **The window's size:** the two numbers, 150 and 7/8, against your 800 × 500 and 800 × 700 — see the table.
5. **Full screen on the iPad:** the words' box clear of the X, the margin under the ball, the portrait fit.
6. **The How this works panel's height** on the iPad (666 px at the Mac's size; the panel does not scroll by touch).
7. **The place names at the whole-globe view:** every name shows at the opening distance now that the ball is whole; the
   crowd over Europe is as 6b's far view had it.

## Changed

- **`cw-deploys/js/3d/scene.js`:** the slide and `?turn=` out (`gRoll`, `MAP_SPAN`, `STAND_SPAN`, `mapWeight`, `decompose`,
  `bleedRoll`, `feel`); `applyGlobe` two turns again; `zoomAt` holds the pointer only on a zoom in; the field of view widened
  in a window taller than wide; the header says so.
- **`cw-deploys/js/cw-fullscreen.js`:** the words' box at 64 px below the top safe area, the bottom box above the bottom
  one, an `h1` styled in the box; the 1.5 s fallback when the request is never answered.
- **`cw-deploys/experiments/earth-3d.html`:** the layout, the age line with the flags, the panels, the title line and the text
  box, the opening, `usualSize`, the full-screen insets, the readout in three lines and `cwStats()`; the stamp
  `2026-10-30 2e8f3b3 · earth-3d step 6c`; `scene.js?v=2026-10-30b`, `cw-fullscreen.js?v=2026-10-30b`.
- **`cw-deploys/experiments/index.html`:** the bench's item.
- **`cw-deploys/MANIFEST.md`** and **`CWVault/00-BOARD.md`:** the entry and the delta.

Committed and pushed on your word, 30 Oct ("Commit and push"; `de85b504`), this session's hunks only — MANIFEST and the
experiments index staged from HEAD plus these edits, other sessions' uncommitted hunks left in the working tree — with the prompt,
the report and the pictures. Live on curiouswoods.org.
