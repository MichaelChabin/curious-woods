---
status: Report, 6 Nov 2026. Step 4 of the Time lab bench built on `9d5023c2` (the step-3 page as committed in `aaec50e8`), checked in the pane at 1,024 × 768 by pointer and 768 × 1,024 by finger events. Committed and pushed on Michael's word, "Commit and push", `9eed2d35`, this session's hunks only. Michael's prompt `Prompt-Revise-Time-Lab-Bench-04.md`.
role: What step 4 did to `experiments/time-lab.html`, what it found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-04.md, Report-Time-Lab-Bench-03.md (the page as it stood), Lab-Time-01.md, Periods-12000-01.md, Worknote-Mosaic-Focus-01.md (step 5)
---

# Report: the Time lab bench, step 4 — after a day with step 3 (6 Nov 2026)

`cw-deploys/experiments/time-lab.html` only. Every shared script untouched; the store read, not written. Stamp
`2026-11-06 9d5023c · time-lab step 4`. Nineteen pictures in `Time-Lab-Bench-04-Nov06/`, numbered as they are named
below. `check-deploys` no errors. Committed as `9eed2d35`.

## The timeline is always there

The line is on the page from the start: the whole of the mosaic in use (4,600 million years at rest), its flags at the
two ends with their years inside the pennants, the handle at today, the whole span's events on it as the Time Machine's
deepest line draws them (`02`). *focus* is absent until the flags are narrower than the line; *back* until there is
something to step back to. Step 1's hidden-until-touched state is gone with its code (`lab.shown`, `showTimeline`, the
`live` class, the hidden visibility of the track and its words).

A scale word (*4.6 billion*, *Last million*, *Last 12,000*) resets the line to that mosaic's whole span, the flags at its
ends and nothing on the back stack (`resetSpan`), so *focus* and *back* are absent again; the handle stays at its year if
the new line still holds it, else goes to the nearer end (step 1's rule for *back*, applied here too). So from
Archaeopteryx at 149 million, *Last 12,000* puts the handle at 12,026 years ago, the Earth with it (`10`). The mosaic
stepping up of its own accord (a pull or a focus past the mosaic's reach) leaves the line as it is, as before.

## No box on the mosaic

The plaque and its pointer line are gone, with their styles, their table rows (`boxWidth`, `boxPointer`) and
`showBox`/`hideBox`. Pointing lifts the period's tiles as before and tells it in the block under the Earth; the rollover
label at the cursor stays (the period's short name, the span while dragging; `03`, `12`). *Hide periods* now does one
thing: it stops the rest of the mosaic dimming while she points (the lift and the words stay). Whether the word has
earned its place is for Michael's eye.

## The year on the handle

The handle carries its year with the word of knowing after it in copper italic — *252 million years ago · inferred*,
*today · measured* — set as the flags' labels are (12 px, the grey word, the same row), on parchment so it reads where it
crosses a pennant, following the handle live under a drag. The year reads as the flags' years do: a year the handle got
from a pixel on the line (a tap on the line, a drag) is rounded to the line's pixel step like a dragged flag's
(*96.2 million years ago* on the Dinosaurs line, *474,000 years ago* on the last million); a year that came from a thing
(a period's edge, a tapped event) is exact (*149 million years ago*, *486 years ago*). The grade's sentence is no longer
anywhere in the block; it is the last paragraph of *How this works*, live at the handle's year (*Measured · The seafloor
still carries its magnetic stripes …*).

**Collisions.** Where the handle's label would cover a flag's, the handle's wins and the flag's steps aside, outward if
there is room, else inward past the handle's label; then the two flags' labels are resolved against each other once
more, since the push can bring them together on a short line. A place counts as room only when it is on the track and
clear of the handle's label and of both pennants (a pushed label running under a pennant was the first try's fault). A
flag's label with no room anywhere steps up to the row above, where the span word already goes when the line has no
room for it. Seen: at rest the right flag's *today* steps left of *today · measured* (`02`); Dinosaurs tapped, the left
flag's *252 million years ago* steps right of *252 million years ago · inferred* (`04`, `05`); the handle dragged near
the right flag, *66 million years ago* steps inward (`08`, `09`); on the short 12,000 line at iPad width (355 px) with
the handle mid-span, both flags' years go up a row (`18`, `19`). A programmatic check of every label against every
other, the pennants and the track's ends, over fourteen states at each size, found no overlap.

## Line one and the two columns

**Line one** is the thing she touched last, centred over the columns, one line, an ellipsis if it is too long:

- a period: name, span counting ago as the flags do, length as the box words gave it — *Dinosaurs · 252 to 66 million
  years ago · 186 million years*, *Farms · 12,026 to 6,000 years ago · six thousand years*, *Electricity · 150 years ago
  to now · 150 years, so far*, *Fire · 600,000 to 300,000 years ago · about 300,000 years*; the one under the pointer
  while she points, the one selected once she lifts;
- an event: its label, then its date as the summary's first words have it — *Archaeopteryx · about 149 million years
  ago*, *Chillies · 1500s*. The summary's first sentence is its date in 181 of the 185 records (*About 66 million years
  ago.*, *1990.*, *1500s.*); line one takes it and the column takes the rest. Four summaries open with a sentence that
  is not a plain date (Animals ashore, Teotihuacan, Ibn al-Haytham, Hawaii): line one takes the store's own date word
  (*428 million years ago*) and the column keeps the whole summary;
- at rest: the scale in use — *The Solar System · 4,600 million years*, *The last million years*, *The last 12,000
  years* (`WORDS.scaleLines`).

**The two columns** under it, the house text at 15 px, six lines each (8.7 em, 130.5 px) of fixed height, 24 px apart,
left-aligned, stacked under 800 px:

- left, the period's box words: the name in bold, then the text (the length sentence of step 3 is not repeated: line one
  has it). The period pointed at while she points, else the one selected by a tap; a drag across tiles selects a span
  and no period, so the column empties and line one goes back to the scale line;
- right, the event tapped last: the summary without its date sentence, ending in *More*, the whole column a tap for the
  More (`.col.tap`).

Both stay; neither replaces the other (`06`, `12`, `15`). Each clears when the selection moves to a span it is not in:
the event when its year leaves the line, the period when the line no longer overlaps it (`spanSettled`, at the end of
every glide and on a reset). Checked: Dinosaurs with Archaeopteryx, the flags narrowed to 66–120 million and *focus*
tapped — the event column empties, Dinosaurs stays; *back* restores the span but not the event. *Last 12,000* from
there empties both (`10`); an event tapped there fills the right column alone (`11`); Printing tapped fills the left
beside it (`12`). Forty words a column at 1,024: Archaeopteryx's summary takes four lines, Printing's four.

**The block's height.** 158 px at 1,024 (a 25.5 px line one, 2 px, two 130.5 px columns side by side) against step 3's
93 px; 288.5 px at iPad width, where the columns stack. The Earth lost nothing of its stage, which is still a third of
the window's height (256 px at 768 tall, 341 at 1,024); what the page lost is 65 px of height at 1,024 and 196 px at
iPad width, pushed down into the scroll, and at iPad width an empty block that tall sits between the Earth and the
mosaic until something is touched (`14`). If the height is to come back, the Earth's third is the place to take it from,
one line in `stageHeight`.

## The last million without numbers

The million row's year numbers under the blocks are gone with the `blockLabel` code (no mosaic had another use for it);
the names under the row are its labels, in the same style, directly under the tiles (`13`, `17`). *now* at the right end
stays: the prompt keeps it if the 12,000 row has an equivalent, and the 12,000 row's right end carries its year, *2026*,
with its hairline — that is the equivalent, read that way. One line removes it.

## Three things found in the check, outside the prompt

- **A mark's stem did not take a tap.** The timeline's track is positioned and painted over the top 15 px of the
  events' box, which is where every stem is; by pointer only a label's text could be tapped, and a tick (a mark with
  no room for a label) not at all. Since step 1. The events' box is now positioned above the track with pointer events
  off except on the marks, so a stem takes the tap and the empty glass still lets a tap through to the line. The
  Archaeopteryx and Chillies taps in the pictures are on stems.
- ***focus* and *back* sat 67 px too far right** since step 3: their left was set from the tiles' right edge plus the
  timeline box's own offset, which put them past the column into the margin and made the page scroll sideways at both
  sizes (829 px wide at 768). The left is now from the timeline's own box, and the words' box no longer has a fixed
  80 px width. The page is as wide as its window at both sizes now; *back* stands in the gutter beside the line (`04`).
- The console is clean on a fresh tab. A tab the pane had reloaded ten times showed WebGPU device errors and a blank
  blue ball: the pane's exhausted tab, not the page; the pictures `16` and `18` were retaken on a fresh tab.

## Checked in the pane on the Mac, 1,024 × 768, by pointer

Every item of the prompt's list, with thirteen boxes' positions read before and after each gesture (the stage, the block
and its three parts, the reminder line, the glass, the track, focus/back, the left column, the credit, the commands, the
events' box).

- **At rest** (`01`, `02`): the scale line, both columns empty, the whole line with its flags, the handle at today
  with *today · measured*, no focus, no back, 185 events on the line.
- **Each scale word** resets the line: *Last million* 0 to 1,000,000 years, 125 events, *Last 12,000* 0 to 12,026
  years, 111 events, *4.6 billion* the whole again; the handle at today, the stack empty, no focus, no back.
- **Pointing at Dinosaurs** (`03`): line one and the left column fill, no plaque on the mosaic, the cursor label
  *Dinosaurs*, the tiles lifted. **Tapped** (`04`, `05`): the line 252 to 66 million, the handle at 252 with
  *252 million years ago · inferred*, the left flag's label stepped aside, *back* present, *focus* absent.
- **Archaeopteryx tapped on its stem** (`06`, `07`): line one *Archaeopteryx · about 149 million years ago*, both
  columns, *More* at the end, the handle at 149 with *measured*.
- **The handle dragged** 149 → 96.2 → 72.2 → 66.2 million: the label following with its word, the Earth at the
  handle's year mid-drag, the right flag's label stepping inward (`08`, `09`).
- **The 12,000** (`10`, `11`, `12`): both columns empty on the reset; Chillies tapped, the event column alone and
  line one *Chillies · 1500s*; Printing tapped, both columns, *Printing · 600 to 250 years ago · 350 years*;
  Electricity by the hook, *Electricity · 150 years ago to now · 150 years, so far*.
- **The last million** (`13`): no numbers, *now* at the end; Fire tapped, the grey placeholder words, *Fire · 600,000
  to 300,000 years ago · about 300,000 years*; the handle dragged, *474,000 years ago · measured*.
- **What moved:** nothing, through any gesture. The two things that are not gestures still move the page, as since
  step 1: a change of scale (the one-row mosaics are shorter) and *large*; and the pane's classic scrollbar still
  widens the column by 15 px when the page gets shorter than the window.

## At iPad size, 768 × 1,024 in the pane, by finger events

- **At rest** (`14`): the columns stacked and empty, the line whole, the handle at today.
- **Dinosaurs by finger** with a 5 px wobble: while down, line one and the left column tell Dinosaurs; the lift
  selects it and the words stay. **Archaeopteryx by finger**, **the handle dragged** 149 → 103 million live with the
  Earth following (`15`, `16`): both columns filled, stacked; the left flag's year up a row where the labels' row has
  no room for three.
- **The last million in two lines** (`17`): the names under the lines, no numbers, Fire by finger.
- **The last 12,000 in two lines** (`18`, `19`): Farms by finger, *Farms · 12,026 to 6,000 years ago · six thousand
  years*; the handle dragged to mid-span, both flags' years up a row on the 355 px line.
- Nothing moved through any of it; the page as wide as its window.

Not tried on the real iPad or the simulator; the prompt asked for the pane at iPad size. *Full screen* not tried (the
pane refuses it), as in step 3.

## Not in this step

The mosaic's closing (step 5); the shimmer and *Sound OK?*; the 13.8 rung; trips; the probe; *Cut open*; the front door;
the swap.

## Needs Michael's eye

- **The same year twice at an end.** With the handle at a flag, both labels say the year: *today   today · measured*
  at rest (`02`), *252 million years ago · inferred   252 million years ago* after a tap (`05`), on every mosaic. The
  rule as written (the flag's steps aside) gives this; one line drops a flag's label whose year the handle's label
  already says.
- **The handle's label covers a pennant** when the handle stands at a flag (`09`): the label is on parchment, so the
  pennant's top is hidden and the stem shows under it.
- **A flag's year up a row** on a short line (`19`): the alternative is to drop it, since the span word gives the span.
- **The lower-case *today*** on the handle's label, as the flags have it; line one at today is now the scale line.
- **A scale word moves the Earth** when the handle's year is off the new line (149 million → 12,026 years ago on
  *Last 12,000*); the alternative is today on every reset.
- **A period kept across a scale change** when the new line overlaps it: Electricity stays in the left column on the
  million row until something else is touched; a drag across tiles empties the column and line one.
- **The empty block at iPad width** (`14`): 288 px between the Earth and the mosaic until something is touched. The
  prompt's fixed heights ask for it; the Earth's third is the lever if it is too much.
- ***Hide periods*** now only stops the dimming of the rest while she points.
- **The length sentence** is not in the left column (line one carries it); one line puts it back.
- **The four summaries** whose first sentence is not a plain date take the store's date word on line one.
- The three fixes outside the prompt above (the stems, the words' place, the width), to be sure they are wanted.
- Step 3's open items that this step settled: the plaque (gone), the million's numbers (gone), *Today · measured* on
  line one (the handle says it now). Still open from step 3: the figures-or-words lengths, the 12,000's smaller tiles,
  the placeholder periods and their sentences, the guessed grade's sentence (now in *How this works*), the long
  summary's *More* lost to the ellipsis (now six lines; Archaeopteryx keeps its *More*), *Reset view* on the flat
  world, *Cities* off at rest, the scale change moving the timeline, *Full screen* on the iPad.
