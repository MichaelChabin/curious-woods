---
status: Report, 5 Nov 2026. Step 3 of the Time lab bench built on `c7383286` (the step-2 page as committed in `ed18d0bb`), checked in the pane at 1,024 × 768 by pointer and 768 × 1,024 by finger events, committed with MANIFEST and the board; not pushed. Michael's prompt `Prompt-Revise-Time-Lab-Bench-03b.md` (revision b, with the flat world; 03 was never run).
role: What step 3 did to `experiments/time-lab.html`, what it found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-03b.md, Report-Time-Lab-Bench-01.md (step 1, and step 2 as its last section — there is no Report-Time-Lab-Bench-02.md: the 12,000 row went into the step-1 commit the same day), Periods-12000-01.md, Lab-Time-01.md, Report-Earth-3D-Bench-06.md (the flat world)
---

# Report: the Time lab bench, step 3 — after first use (5 Nov 2026)

`cw-deploys/experiments/time-lab.html` only. `earth-3d.html`, `earth-3d-window.html` and every shared script untouched;
the store read, not written. Stamp `2026-11-05 c738328 · time-lab step 3`. Eighteen pictures in
`Time-Lab-Bench-03-Nov05/`, numbered as they are named below.

A note on the prompt's first line: it says to read `Report-Time-Lab-Bench-02.md` first. That file does not exist.
Step 2 (the 12,000 row's periods) was built on 4 Nov and went into the step-1 commit (`ed18d0bb`) with its report as
the last section of `Report-Time-Lab-Bench-01.md`; that section was read instead. The step-2 prompt's "don't commit"
and the one commit are the earlier session's doing, recorded on the board.

## The left column

*How this works*, then under it, indented and italic, the page's three commands in this order: ***Full screen***,
***Reset view***, ***Map***. Then *Select years* and *Information* as they were. At the foot, the credit, small
(12 px, the ink-soft of a story's references), with room kept for its longer line so the column's foot keeps its height
as the credit changes between the photograph's (NASA Earth Observatory) and the plate model's (Merdith et al. 2021).
Nothing sits under the globe but text.

- **Full screen** is the Time Machine's: the page is the full-screen element (the How this works panel and the More
  window build on the body, so they still show), the word says what tapping it will do (*Full screen*, then *Exit full
  screen*), absent where the browser has none. The pane refuses the Fullscreen API, so it is confirmed present and
  wired, not seen; the iPad is where it is tried. On a change of full screen the page re-lays the mosaic and the line.
- **Reset view** is scene.js's own word, moved: the Earth is stood up with its `words` host set to the commands
  block, and the word is put between Full screen and Map and given the italic class.
- **Map / Globe**: the Earth bench's flat world since its step 6 (Equal Earth, whole and still, at the lab's year, the
  places on it when *Cities* is on, a tap on a place going back to the globe centred there, 3,000 km across the
  window's height), taken as it stands through `earth.setFlat` and `onFlat`, in the Earth's stage at the Earth's size.
  One word, *Map* while the ball is up, *Globe* while the flat world is. The text block under it is the same block and
  follows the year as before. The word is hidden until the Earth attaches (a device with the still picture never shows
  it).

**What the flat world costs at the small size.** The stage at 1,024 wide is 793 × 256 CSS px, so the flat world is
fitted by height: about 468 × 228 px with the 14 px margin (`05`, `06`, `07`). At iPad width the stage is 552 × 341,
and the world about 520 × 255. The frame cost, by the bench's own off-screen measure (`cwBench`, full tier, WebGPU,
1,616 × 512 device px, twenty frames a million years apart):

| picture | ms a frame |
|---|---|
| the globe | 16.7 |
| the flat world | 15.9 |

The same cost, and both at the pane's floor; the flat world is no dearer than the ball at this size. **Its labels still
read** at 12,026 years: sixteen names in the placer's 12 px type, legible at 1,024 (`07`) and at iPad width (`15`),
London and Delft and Paris crowding but readable. At 252 million no places are drawn (the places are the Earth's own
and there are none that old), so the flat world is the painted continents alone (`06`).

## One block of text under the Earth

The title line, the honest line, the grade word with its sentence and the credit are gone from under the globe. In
their place one block of fixed height (93 px: a 17 px line and three lines of 15 px), centred, 680 px at most, directly
under the Earth and above the reminder line:

- **Line one, always:** the year and the word of knowing: *Today · measured*, *12,026 years ago · measured*, *252
  million years ago · inferred*, *4,400 million years ago · guessed*; at 4,600 million, where the grade is *none*, the
  year alone. The word in copper italic as the grade word was. The three words from the seven grades, as ruled
  (`KNOW_WORD` in the script): ground and measured show as measured; inferred and fitted as inferred; guessed and
  invented as guessed; none shows no word. The seven stay in `earth.js` and in the Earth's look.
- **Lines two to four:** whatever she touched last. A period's box words — the name in bold, then its length as a
  sentence, then its text: *Dinosaurs. 186 million years. Dinosaurs rule the land, and one great continent slowly
  breaks apart.* — while she points at the mosaic, and kept once she lifts and the period is selected. Or an event's
  summary ending in *More*: *The asteroid. About 66 million years ago. An asteroid about ten kilometres across hit the
  earth …* *More*. Three lines of the house text at most (`-webkit-line-clamp`), longer text cut with an ellipsis, the
  block never growing. At rest (nothing touched yet) line two carries the grade's sentence, `gradeFor`'s `why`, and
  nothing else (`01`).
- **More** opens the window as before. A summary longer than three lines loses its *More* to the ellipsis
  (Archaeopteryx's, 219 characters, just fits at 1,024, `04`), so the whole summary is a tap: anywhere on lines two to
  four opens the More while an event is shown.
- **The summary block** under the timeline is gone, with its styles; `lab.rec` and `showRec` now write the block.

The lengths in the box words, as the prompt's "Farms. Six thousand years." asks: round counts in words (*Six thousand
years*, *Two thousand years*, *Eight hundred years*, *A hundred years*), the rest in figures (*350 years*, *1,400 years*,
*186 million years*, *1,450 million years*); a rough edge says *about* (*About 400,000 years*); a period that reaches
now says *so far* (*Electricity. 150 years, so far.*; *Ice ages. 3 million years, so far.*). Farms counts its own span,
six thousand, though its tiles start at the row's start, 12,026 years ago. The plaque on the mosaic carries the same
length after the name in its grey head (*Dinosaurs · 186 million years*), so the two say one thing.

## The mosaics' labels

- **The reminder line** above each mosaic ("Each tile is …") is set at 11 px, the size of the number labels, and sits
  3 px above the mosaic: the gap is under the labels' own line height (14 px).
- **The 4.6 row's years** count forward on the right, *1 billion* to *4 billion*, set at 11 px, and the last label, where
  *4.6 billion* sat, reads ***Now*** (`02`). No abbreviations anywhere.
- **The mosaic is centred on the column**, the same axis as the Earth: the tiles are inset by the gutter on both sides
  (64 px on the 4.6 and the million, 88 on the 12,000, which needs room for the year and *Electricity*), and the years
  hang in the right gutter, outside the centring. The main column is one column now (the 118 px words' column of 7c is
  gone); *focus* and *back* stand to the right of the line in that same gutter, stacked, on every mosaic. The check
  reads the Earth's centre and the tiles' centre as the same pixel (596.5 at 1,024; 468.5 at 768). The cost is tile
  size:

| | step 2, 1,024 wide | step 3, 1,024 wide | step 3, 768 wide (two lines) |
|---|---|---|---|
| the 4.6 billion and the last million | 6.88 px | 6.23 px | 7.74 px |
| the last 12,000 | 5.54 px | 4.45 px | 4.94 px |

- **The 12,000 row** has no thousand-year numbers: the blocks are the ruler, the names under the row the labels, no
  durations (a period's length is said in its box words). At its right end the current year, **2026**, in the house
  text (17 px) to the right of the row, with a one-pixel hairline from it to the gold tile at now, the row's only
  number; ***Electricity*** beside the year in the names' small capitals, under *2026*, to the right of the row, not
  under it; *Machines* stays under the row (`10`, `11`). With Electricity beside the year the names under the row take
  two rows (Printing on the first, Machines dropped to the second), not three. The clear tiles of the unfinished block
  stay, and the count of lit tiles is from today's date (`CW.THIS_YEAR`, from the clock), so the row fills itself a
  tile a decade. *2026* is `THIS_YEAR`, not a literal.
- **The last million** gets periods as names under the row the way the 12,000 has them, while the tiles keep the ice
  and warm spells as their colour, graded (`09`, `16`). Placeholder names and spans, yours to change: Hand axes
  (1,000,000 to 600,000), Fire (600,000 to 300,000), Neanderthals (300,000 to 50,000), Painted caves (50,000 to
  12,000); in `PERIODS_M`, a line each. A placeholder sentence each, shown in grey in the block and in the plaque,
  marked `ph` in the table; the box words say *about* on every length, every edge being rough. No brackets: a name
  centred under its span. The periods are now what pointing names and tapping selects on that row (as on the 12,000);
  the ice-age and warm-spell plaques of 7c are gone, and the tile's kind follows the period's name in the label
  (*Fire · ice age*), as the decade follows on the 12,000. The last 12,000 years of the row (twelve tiles) belong to
  no period, since the 12,000 row has them: pointing there names only *ice age* or *warm spell*, and a tap selects the
  thousand-year block, as a tap on an unnamed tile did before. The million row keeps its numbers under the blocks
  (900,000 … 100,000, *now*); the prompt took the numbers off the 12,000 only. Its names sit under the numbers.

## Spacing

The timeline's box has no top margin now: the flags' pennants are 18 px under the mosaic's last pixel (the names' or the
years'), which is what the span word needs when it goes above the flags (14 px) and nothing more. The Earth block's
margin is 10 px, the text block 6 under the stage, the reminder line 3 above the mosaic. The main column, top to
bottom: the Earth; the text block; the reminder line; the mosaic; the timeline. Nothing else.

## The three switches gone

Removed with their code paths: *live / on release* (the Earth follows the handle live: `dragYear` is `setYear`;
`lab.live`, `?handle=` gone), *A two colours / B graded* (the last million is graded: `glassMode`, `?glass=`, the A
colour gone; `build` runs once per window), *year inside / a margin* (a flag at the end of the line puts its year
inside: `ENDS`, `?ends=`, `endMargin`, `margin()` gone, the line runs the track's full width). *How this works* keeps
*bench only* with *small / large* for the Earth and the readout. Confirmed in the pane: the Earth read 100 mid-drag
with the handle at 100 (`05` of the Mac list below), the million row's ice is graded palest at the lowest sea, and a
flag at an end carries its year inside the pennant (`11`).

## Checked in the pane on the Mac, 1,024 × 768, by pointer

Every item of the prompt's list, by pointer events dispatched from the page and the bench hooks; twelve boxes' positions
read before and after each step (the stage, the text block and its two lines, the reminder line, the glass, the track,
focus/back, the left column, the credit, the commands, the one-pixel line); the Earth's state from `cwEarth.time()`
and `grade()`.

- **At rest** (`01`, `02`): the column with Full screen, Reset view, Map under How this works, the credit at its foot;
  *Today · measured* and the ground grade's sentence; the mosaic centred with the years outside, *Now* on the last row;
  no timeline. Console clean.
- **The text block**: pointing at Dinosaurs put its words in the block (and the plaque on the mosaic); the tap kept
  them and lit the span, the timeline up with ten events, the handle at 252, the Earth at 252, *252 million years ago ·
  inferred* (`03`); Archaeopteryx tapped on the line: *149 million years ago · measured*, its summary with *More*
  (`04`); the handle dragged 200 → 100 → 120: the Earth at 100 mid-drag and 120 at the end, line one following, the
  summary kept. Through all of it no box moved.
- **The three words of knowing**: *12,026 years ago · measured*, *252 million years ago · inferred*, *4,400 million
  years ago · guessed*; and *4,600 million years ago* with no word, the grade being none.
- **The flat world** (`05`, `06`, `07`, `08`): *Map* at 120 million, at 252 and at 12,026 years, the word reading
  *Globe*; with Cities on, a tap on Paris on the flat world went back to the globe centred on Paris (2.35° E, 48.86° N
  read back from the view); *Globe* tapped as a word brought the ball back and the word read *Map*. The credit and line
  one followed the year on the flat world as on the ball.
- **The last million** (`09`): the four names under the numbers; Fire pointed at (*Fire · ice age*; the grey
  placeholder words in the block and the plaque); Fire tapped: the line 600,000 to 300,000, the handle at 600,000.
- **The last 12,000** (`10`, `11`): the row with its names and no numbers, *2026* and its hairline to the gold tile,
  *Electricity* beside the year, *Machines* below; Printing tapped: the line 600 to 250 years ago, fifteen events, the
  block *Printing. 350 years. …*; *back* to the right of the line.
- **The gaps**: the mosaic's bottom to the pennants 18 px; the reminder line 3 px above the glass.
- **The switches**: the bench words hold one pair, *small / large*; `cwLab` no longer has `setGlassMode`, `setEnds`,
  `setLive`.
- **What moved**: nothing, through any gesture. Two things that are not gestures still move the page, as in step 1: a
  change of **scale** (the one-row mosaics are shorter than the five-row one, so the timeline comes up), and
  **large**. And one thing the pane adds: the pane draws a classic scrollbar, so when the page gets shorter than the
  window on a one-row mosaic the scrollbar goes and the column widens by 15 px; the Mac's and the iPad's overlay
  scrollbars do not do this.
- **Full screen**: the word present and wired; the pane refuses the request. Not seen.

## At iPad size, 768 × 1,024 in the pane, by finger events

The two-column layout holds; the stage 537 × 341; the 4.6 billion in two lines of five blocks, tiles 7.74 px.

- **At rest** (`12`): as on the Mac; the credit's room keeps the column's foot still.
- **Dinosaurs by finger** with a 5 px wobble (`13`): while down, its words in the block and the plaque up; the lift
  selected it, the plaque gone, the words kept; the handle and the Earth at 252. *Now* under the last block.
- **The handle by finger**: 200 → 100 live, the Earth at 100 mid-drag.
- **The asteroid by finger** (`14`): *66 million years ago · measured*, the summary with *More*.
- **The flat world at iPad width** (`15`): 552 × 341, the places readable.
- **The last million in two lines** (`16`): Hand axes under the first line (its span is wholly there); Fire,
  Neanderthals, Painted caves under the second, each centred under its span, the numbers above them.
- **The last 12,000 in two lines** (`17`): Farms and Cities under the first line; Writing, Iron, Paper, Printing under
  the second with Machines dropped a row; *2026*, its hairline and *Electricity* at the second line's end, where the
  gold tile is. A period that crosses the line break is named once, under the line that holds the larger part of it.
- **Farms by finger** (`18`): the line 12,026 to 6,000 years ago, fourteen events, the Earth at 12,026 years ago,
  *Farms. Six thousand years. …*
- Nothing moved through any of it; console clean.

Not tried on the real iPad or the simulator; the prompt asked for the pane at iPad size.

## Not in this step

The Earth's size as the child's control; the story strip; the 13.8 rung; trips; the probe; *Cut open*; the front door;
the swap.

## Needs Michael's eye

- **A period's words show twice** while she points: in the plaque on the mosaic (7c's white box) and in the block
  under the Earth. The prompt moved the words into the block and did not say the plaque goes; it was kept, with *Hide
  periods* still hiding it (the block takes the words either way). Whether the plaque goes is one line.
- **The lengths** in the box words: words for round counts, figures for the rest, *so far* for the two periods that
  reach now. Whether figures should be words throughout, or the other way.
- **The 12,000 tiles are smaller** (4.45 px at 1,024 where they were 5.54): the centring insets the row by 88 px on
  each side, for the year and *Electricity* on the right. A narrower inset means the name under the year.
- **The million row keeps its numbers** under the blocks, with the names under them. The prompt took the numbers off
  the 12,000 only; if the blocks are the ruler there too, one line.
- **The placeholder periods**: the names, the spans, the four sentences, and that the last 12,000 years of the row have
  no period of their own.
- **The grade's sentence for *guessed*** (earth.js's words) says "tap another guess, and next time it will be
  different"; this page has no such word. The sentence is the Earth's, not this page's.
- **A long summary** loses its *More* to the ellipsis; the whole block is then the tap. Whether that is enough, or the
  block should scroll instead.
- **Line one at today** reads *Today · measured*.
- **Reset view while the flat world is up** turns the hidden ball home and the flat world shows nothing of it, as on
  the Earth bench.
- **Cities is off at rest**, so the flat world opens with no places until *Cities* is tapped; the Earth bench opens
  with them on.
- **The plaque on the last row** of the 4.6 still lies over the timeline (a 7c item), and now over the pennants, since
  the gap is tighter.
- **The scale change** still moves the timeline (step 1's item); the fixed-height answer is one line in `layout()`.
- **Full screen** on the iPad: the page as the full-screen element, with the panel and the More window on the body.
