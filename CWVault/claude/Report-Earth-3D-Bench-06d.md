---
status: Report — the Earth bench, step 6d (Prompt-Revise-Earth-Bench-06d.md, the flags show their years); built 30 Oct 2026 on d624fb7; checked in the pane on the Mac; not committed — waits for Michael's word
role: What was built, the rounding rule, where each label goes, what was checked at the Bronze Age and the dinosaurs, and what needs Michael's eye
related: Spec-Earth-3D.md, Worknote-Time-Slider.md, Report-Earth-3D-Bench-06c.md, Prompt-Revise-Earth-Bench-06d.md, cw-deploys/experiments/earth-3d.html, Earth-3D-Bench-06d-Oct30/ (the pictures)
updated: 2026-10-30
---

# Report: the Earth bench, step 6d (30 Oct 2026)

Built on `d624fb7` (step 6c and its board). Only `experiments/earth-3d.html` changes; no shared script is touched, so the
Time Machine, the Sun bench and the stories are as they were. Nothing under `CWVault/` was stashed, restored or checked out.
The pictures are in `Earth-3D-Bench-06d-Oct30/`: eight of them, 236 KB, the pane's own screenshots of the slider.

## What was built

**The flags show their years.** While a flag is away from its end of the line, and while she holds or drags it, its year
stands beside it: the left flag's to its left, the right flag's to its right. Between the two flags, centred in the gap,
how long the gap is: *2,100 years*, *164 million years*. Each flag's label is its own: when only the right flag has moved,
only the right flag's year shows, with the gap's length. The labels are the same type as the line's other labels (12 px,
the grey word colour, tabular figures) and sit in the pennants' row, so the poles, the line and the thumb below are as they
were. The labels take no taps: a finger on one reaches the line beneath.

**The rounding.** One pixel's worth is the stretch's span over the line's device pixels (`devicePixelRatio`, as the
*one pixel* line under the slider counts it). The step is the smallest of 1, 2 or 5 × a power of ten that is at least a
pixel's worth, and every number is rounded to that step, so a label never claims more than the line can show:

| the line | one pixel (this Mac, 668 px at 1,280 wide) | the step |
|---|---|---|
| the whole, 4,567 million years | 3.4 million years | 5 million years |
| 457 million years | 340,000 years | 500,000 years |
| 45.7 million years | 34,000 years | 50,000 years |
| 457,000 years | 340 years | 500 years |
| 10,000 years | 7.5 years | 10 years |

A number at or over a million is written in millions with as many decimals as the step allows (*66 million years ago*,
*45.5 million years ago*, *4.55 million years ago*); under a million, or when the step is under 10,000 years, in years
with commas (*455,000 years ago*, *5,330 years ago*). A flag at the left end reads *today*; a gap under a year, *a year*.

**Where a label goes.**
- A flag's label on its outer side, 5 px from the pole. Where that would run off the line's end, it goes inside the flag:
  past the pennant, 5 px on. If the other flag's label would then run into it (both flags near one end), the other's label
  is pushed along to clear it.
- The gap's label centred between the flags where it fits with 8 px to spare on each side, clear of the pennants and of any
  label that is inside; else just above the flags, centred on the gap and kept on the line.
- Nothing shows while a glide runs (the labels go the moment *stretch* or *back* is tapped, with the words), and nothing
  once a flag is back at its end and let go.

**The room above.** A label above the flags needs a line of room above the pennants. The track is 14 px taller (62) and the
pennants, the line and the thumb sit 14 px lower in it; 10 of those 14 px came out of the row's top margin (14 → 4), so
under the globe the slider row is 4 px taller than in 6c and the title line's bottom at 1,280 × 800 is at 788 (784 in 6c;
the window's size rule and its two numbers are unchanged). In full screen the stage's lower inset is 146 instead of 132,
so the ball keeps its margin above the taller bottom box (the box 119 px tall, 18 px below the ball's window).

## Checked in the pane on the Mac

The flags were placed by synthetic touches on the track (pointerdown, move, up), and the glides finished by the bench's
`finish()`; the pictures of the slider are the pane's screenshots at the pane's own 1:1 size (800 wide, the line 437 px),
so the type is sharp — the numbers at that width are rounded a little coarser than at 1,280 (the line's 668 px), and both
are given.

**The Bronze Age, 3300 to 1200 BCE** (`bronze-age.png`; at 1,280 wide, `bronze-age-1280-wide-pane-scale.png`). Six
stretches in, each by dragging the right flag to a tenth of the line and tapping *stretch* (457 million, 45.7 million,
4.6 million, 457,000, 45,700, 10,000 years), then the right flag to 5,326 years ago and the left to 3,226:

| the line | one pixel | left flag | right flag | the gap |
|---|---|---|---|---|
| 10,000 years, 1,280 wide | 7.5 years (step 10) | 3,230 years ago | 5,330 years ago | 2,100 years, between the flags |
| 10,000 years, 800 wide | 11 years (step 20) | 3,220 years ago | 5,320 years ago | 2,100 years, just above |

At 1,280 the gap is 140 px and the label fits between; at 800 it is 92 px and goes above.

**The dinosaurs, 230 to 66 million years** (`dinosaurs-whole-line.png`, `dinosaurs-one-stretch-in.png`,
`page-1280x800-dinosaurs-one-stretch-in.jpg`):

| the line | one pixel | left flag | right flag | the gap |
|---|---|---|---|---|
| the whole, 1,280 wide | 3.4 million (step 5) | 65 million years ago | 230 million years ago | 165 million years, above |
| the whole, 800 wide | 5.2 million (step 10) | 70 million years ago | 230 million years ago | 160 million years, above |
| 457 million, 1,280 wide | 340,000 (step 500,000) | 66 million years ago | 230 million years ago | 164 million years, above |
| 457 million, 800 wide | 520,000 (step 1 million) | 66 million years ago | 230 million years ago | 164 million years, above |

On the whole line the left flag is a few pixels from today's end, so its label goes inside the flag and the right flag's
label is pushed along after it; the gap's label is above. One stretch in, the labels read 66 and 230 and the gap 164; the
left label is still inside (66 million years is 63 px from the end at 800 wide, the label 107 wide) and the gap's label
still above, the two labels filling the gap.

**The ends** (`right-flag-near-the-end.png`): on the 10,000-year line, the right flag at 9,700 years ago and the left at
6,200 — *9,700 years ago* inside the right flag, *6,200 years ago* outside the left, *3,500 years* above.

**Held at the end** (`left-flag-held-at-today.png`): the left flag taken hold of and not yet moved shows *today* (inside,
since there is no room to its left) and the gap *10,000 years*; let go, both labels leave. With both flags at rest at the
ends there are no labels.

**The glide:** a tap on *stretch* hides the labels and the words at once (the line then glides to 2,000–5,000 years, its
ends under it *2,000 years ago* and *5,000 years ago*); after it nothing shows until a flag moves again.

**Close flags** (`gap-label-above-under-the-bar.png`): the flags 1,830 and 2,740 million years on the whole line, the gap's
*910 million years* just above them, 5 px under the window's bottom bar.

**Full screen** (the viewport fallback in the pane): the line is 1,244 px wide, and the dinosaurs' gap label fits between
the flags; the bottom box is 18 px below the ball's window.

`tools/check-deploys.sh`: no errors (two warnings, neither this page's: the multiplication lab's icon, and three untracked
palette pictures under `art/`).

## Needs Michael's eye

- **The step.** 1, 2 or 5 × a power of ten, taken up from a pixel's worth, so on the whole line 66 million years reads *65*
  (a pixel is 3.4 million years there; one stretch in it reads *66*). The alternative is rounding to the pixel's own worth
  (*66.5*, *229.9*), which claims more than the line can show.
- **The gap's label when only one flag has moved** is the same number as that flag's (the right flag at 457 million years:
  *455 million years ago* beside it, *455 million years* above). The prompt asks for the gap between the two flags; if the
  repeat is noise, the gap's label could wait until both flags have moved.
- **The labels' row** is the pennants' row, 5 px from the pole; a label inside the flag starts past the pennant. In the
  pictures the row reads as one line of small type above the line.
- **Both flags near one end:** the second label is pushed along to clear the first (the dinosaurs on the whole line read
  *65 million years ago  230 million years ago* side by side). Fine for a check; a child dragging both flags into a corner
  will see the same.
- **The 4 px** the slider row grew; the window's size rule (150 and 7/8) is unchanged.
- Not tried by finger: the iPad's touch on a flag and the label under a fingertip (the label sits above the pole, where the
  finger is not).

## Changed

`cw-deploys/experiments/earth-3d.html` only — the header note, the CSS for `.flag-label` and the track's room, three
`<span>`s in the track, `pixelStep`, `roundedWord`, `flagWord`, `gapWord`, `placeLabels` (called from `renderStretch`), a
render on a flag's pointerdown and on pointerup/cancel, a render as a glide starts, `cwStretch.step/flagWord/gapWord/labels`
for checks; the stamp `2026-10-30 d624fb7 · earth-3d step 6d`. `MANIFEST.md` and `00-BOARD.md` in the same commit, when
Michael says so.
