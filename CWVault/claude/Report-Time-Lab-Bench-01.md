---
status: Report — the Time lab bench, step 1, one page, built 4 Nov 2026 to Prompt-Build-Time-Lab-Bench-01.md on 007a8ca1; checked in the pane on the Mac at 1,024 × 768 and at iPad size (768 × 1,024), by pointer and by finger events. Built to the prompt's "stop and report"; NOT committed. Later the same day: the 12,000-year row's eight periods, to Michael's rule of 4 Nov (the section at the end).
role: What the page is, what was taken from each bench and what is new, where the brief was read one way when it could be read two, what the pane showed at each size, what the Earth bench could and could not do at each age as this page found it, and what needs Michael's eye
related: Prompt-Build-Time-Lab-Bench-01.md, Lab-Time-01.md, Report-Earth-3D-Bench-07c.md, Spec-Earth-3D.md, cw-deploys/experiments/time-lab.html, cw-deploys/experiments/index.html, Time-Lab-Bench-01-Nov04/ (the pictures)
updated: 2026-11-04
---

# Report: the Time lab bench, step 1 — one page (4 Nov 2026)

One new page, `cw-deploys/experiments/time-lab.html`, and one line on `experiments/index.html` (its entry, newest at the
top). Nothing else under `cw-deploys/` changed: `earth-3d-window.html`, `earth-3d.html`, every file in `js/` and
`js/3d/`, the Time Machine and the stories are byte for byte as they were. The store, `stories/deep-time-events.json`,
is read and not written. Stamp `2026-11-04 007a8ca · time-lab step 1`. `check-deploys`: no errors (the one warning is the
untracked files, this page among them until it is committed). Twenty-five pictures in `Time-Lab-Bench-01-Nov04/`, the
pane's own screenshots (a 1,024 × 768 page drawn at about four fifths; the iPad pictures at 0.8). **Not committed**, as
the prompt says. The working tree still carries another session's uncommitted hunks (the clear-out of the vault's
prompt files, `MANIFEST.md`, `experiments/index.html`); this session's edit to `index.html` sits on top of that
session's version of the file, so a commit of this page will need the two kept apart as before.

## What was built

**The page.** Title *Time Lab*. The house convention on the left: *How this works*, then *Select years* with *4.6
billion*, *Last million*, *Last 12,000*, and *Information* with *Periods* / *Hide periods* and *Cities* / *Hide cities*.
Nothing else: no Map, no Coastlines, no Save or share, no Full screen, no Current year. The main column, top to bottom:
the Earth, the mosaic, the timeline, and under the timeline the summary block for a tapped event. Each has its room
from the start.

**The Earth** is `earth-3d.html`'s 3D view and nothing else of that page: `js/3d/earth.js` on `scene.js` with
`honest.js`'s block, the same camera (the ball fills the stage's height at the home distance), the same desk-globe
turn, pinch and wheel, the same tap gliding a place to the centre, the same seven opening views at random (`?view=`
picks one), the same honest words (*what the picture is*, the grade's word and sentence, the credit) and the bench's
title line (*The Earth at 4,315 million years old: 252 million years ago*). The stage is as wide as the column and a
third of the screen's height tall (`LOOK.earthSmall`; 256 px at 768 high, 341 at 1,024), the ball centred in it;
*Reset view* is the word under it, as scene.js makes it. No 2D globe, no sliders, no bars to crop the window, no kept
picture, no full screen, no flat world. Its age is set from one place only (below).

**The mosaic** is `earth-3d-window.html`'s after 7c, the code taken: `LOOK`, `WORDS`, `PERIODS`, the three mosaics,
`build`, `layout`, `draw`, the rollover names, the box, the tap that selects a period, the drag that selects a span,
the step up, the 12,000 taking the words' column. Two lines differ: at rest nothing is lit (the flags' span lights
tiles only once the timeline exists), and a change of scale while the timeline is absent moves the hidden line quietly
instead of showing it.

**The timeline** is the mosaic page's stretching line, taken as 7c has it (the flags with their years, the copper
span line, *focus*, *back*, pulling a flag past an end, the step up), with the two things the prompt names:

- **Events.** The span's events from the store, drawn as the Time Machine's deep timeline draws them on its deepest
  line (`js/deep-time.js`'s rules, copied into the page, not the module itself): a line 0.8 px from the rail down to
  the label, the labels packed into rows heavier first then older first (at most `LOOK.evRows`, four), a mark within
  3 px of one already drawn thinned, a short line where no row has room, a fade older than the mark for a record with
  a `tail`, a soft stretch under a mark whose `precision` is a decade, a century or a millennium. The labels are a
  fixed box 70 px tall under the rail, so the page never grows or shrinks with the count. A tap on a mark or its
  label is the event's: its summary shows in the block below, bold label first, ending in *More* when the record has
  one (every one of the 185 has); *More* opens the More in map.js's `cwWindow`, built by `cwDeepTime.moreHTML` as the
  Time Machine builds it, the stepped date line, the paragraphs, the pictures where the manifest has them, *Known
  from*, the references. The `.cw-pic` rules are deep-time.js's own, which it writes to a page only when a deep bar
  is built; this page builds none, so the five lines are in the page's CSS.
- **The year handle.** One copper dot on the line (the Time Machine's marker, 6.5 px in radius, ringed in parchment),
  the lab's year. A tap on the line and it jumps there; a drag and it follows; a flag within reach in the upper half
  of the track is still the flag's, as the Earth bench's line has it.

**The one gesture.** At rest: the Earth at today, the 4.6 billion mosaic at full colour, nothing selected, and no
timeline at all (the track and the words are `visibility: hidden`, their room kept, so nothing below moves when they
come). *focus* and *back* are absent as before. Nothing is greyed: the check counted zero words at less than full
opacity. A tap on a period, or a drag across tiles, calls `chooseSpan`: the span goes to the line with the usual
glide (the lit tiles follow), the timeline appears, and the year is set to the span's older end, the Earth going
there. From then on: `setYear` is the one door to the Earth's age; the handle, a tap on the line, a tapped event and
a chosen span go through it; nothing else sets it. *back* and *focus* run as before and, when the line has changed,
`settleHandle` keeps the handle where it is if its year is still on the line, else sends it to the nearer end. A
pulled flag grows the line and the handle stays. The Earth follows the handle live while she drags; the bench switch
*on release* holds it until she lets go (the words under the Earth move live either way).

**Before the Sun.** A tap on the first period sets the line to 4,600–4,567 and the handle to 4,600; the Earth can go
no further back than its birth, so it stands at 4,567 (*a ball of melted rock*, the molten word) while the title line
says *Before the Earth: 4,600 million years ago*. Lab-Time leaves what the view shows there open; this is the least the
page could do without inventing.

**How this works** carries Michael's five paragraphs from 7c and, at the end, the one paragraph the prompt gives, in
the placeholder grey, his to rewrite. Under a rule marked *bench only*: *small* / *large* for the Earth (large is half
the screen's height), *live* / *on release* for the handle, and the mosaic page's own two switches (*A two colours* /
*B graded*, *year inside* / *a margin*) as they were; then the readout (the store's count, the events on the line, the
year, the backend, the tier, the on-screen rate, the stage's size).

**Cities.** On the mosaic page the word renamed and did nothing. Here the Earth exists and has the bench's places (the
dozen cities and the stories' places, riding their plates), so *Cities* turns them on and *Hide cities* off; they start
off, as the mosaic page had the word. If that is not what the word should mean, it is one line.

**Bench only.** `?size=large`, `?handle=release`, `?view=`, `?seed=`, `?tier=`, `?w=`, `?glass=B`, `?ends=margin`,
`?thr=`, `?log=1`; `window.cwLab` for checks (everything `cwWin` had, plus `year()`, `setYear(ma)`, `dragYear`,
`handleX`, `onLine()`, `placed()`, `tapEvent(id)`, `openMore()`, `shown()`, `setSize`, `setLive`, `attachEarth`),
`window.cwView`, `window.cwEarth`, `window.cwBench(tier, frames, step)` as the Earth bench's.

## Read two ways

- **"About a third of the column's height."** Read as a third of the screen's height (`innerHeight / 3`), the ball
  filling that, the stage as wide as the column. The column's own height is the page's and grows with the mosaic, so
  it could not be the measure. At 1,024 × 768 the ball is 256 px tall and the whole page 1,217 px, so the timeline is
  below the fold: she scrolls to it after a tap. At iPad size (768 × 1,024) the ball is 341 px and the page 1,589 px,
  the timeline again below the fold. Pictures 01 and 02, 14 and 16. Yours to say whether the Earth should be smaller
  still, or the mosaic's rows tighter, so the three stand on one screen.
- **"The timeline, under the mosaic, where the mosaic page has it … with their labels."** The labels take a fixed
  four rows under the rail. On the whole 4,600-million-year line 185 events fall in the last few pixels, so twenty get
  a label and sixteen a short line; the rest are thinned at 3 px, as the deep module thins them.
- **"Tap an event: its summary."** A tap on an event also puts the handle at the event's year and the Earth with it,
  as the Time Machine's `tapMark` brings its marker to the event. The prompt's rule "no other control sets the year"
  was read as satisfied, since the event is on the line and the handle moves to it; if a tap should show the words
  and leave the year alone, it is one line (`tapEvent`).
- **"back steps the line out as it does now."** The first chosen span pushes the whole line (0–4,600) on the stack, as
  7c did, so *back* from the first span returns the whole 4,600-million-year line with all 185 events on it; the
  timeline stays once it has appeared. Nothing in the prompt says it should vanish again, so it does not.
- **The summary block** sits under the timeline (the Time Machine has it under the bar), a fixed 5.8 em tall and
  empty until an event is tapped: no hint in it, since an instruction to the child is not the page's to give.
- **The Earth bench's title line** (*The Earth at 4,315 million years old: 252 million years ago*) is kept under
  *Reset view*, above the honest block, because the handle carries no label of its own and the title says the year
  plainly. It is one line to drop.

## Not done: the extraction into `js/cw-stretch.js`

Open since 7b, and the prompt allowed it as its own commit first. Not done, for two reasons. This page's line is the
third copy (the bench's with a thumb, the mosaic's past-left with the pull, now this one with events and a handle),
and the third diverges from the second as much as the second did from the first: a module written before this page
would have had its API changed by it. And the prompt says stop and don't commit, which leaves no room for the separate
commit it asks for. The three copies now show what the module would have to hold: the line's geometry and glide, the
flags with their labels, the pull, *focus* and *back* with the stack, a handle (optional), a layer of marks (optional).
That is a better brief than 7b had. Yours to say whether it goes before step 2.

## Checked in the pane on the Mac, 1,024 × 768

Every item of the prompt's list, by pointer events dispatched from the page and by the hooks; the Earth's state read
from `cwEarth.time()`, `grade()`, `seaLevel()`; every block's position read before and after each step (`__t.moved()`
in the check helper, comparing ten boxes: the stage, the words under it, the explanation, the glass, the track, the
focus/back words, the summary, the left column).

- **At rest** (`01`, `02`): the Earth at today on Blue Marble, centred over one of the seven views; *ground* and its
  sentence under it; the 4.6 billion mosaic at full colour, nothing lit; the track hidden, no line, no flags, no
  focus, no back; zero words greyed; the console clean.
- **A tap on Dinosaurs** (`03`, `04`): the span 252–66 lit on the mosaic; the timeline appears with the line 252–66,
  ten events on it, six labelled (*The Great Dying*, *The asteroid*, *Dinosaurs*, *Pangaea cracks*, *Archaeopteryx*,
  *Oldest flowers*), the flags at its ends, *back* present; the handle at 252 (the left end, over the left flag); the
  Earth at 252, *inferred*, Pangaea. Nothing moved.
- **The handle dragged to 66, live** (`05`): mid-drag at 160 the Earth read 160; at 66 before the release it read 66;
  after, 66, *measured*. **On release:** mid-drag at 200 the Earth still read 66 (the previous year), the title line
  200; on the release the Earth went to 252 (the drag's end). Nothing moved.
- **An event and its More** (`06`, `07`): a tap on *Archaeopteryx* put the handle and the Earth at 149; the block
  under the timeline: *Archaeopteryx. About 149 million years ago. … More*; *More* opened the window: the label, the
  stepped date line (*About 149 million years ago* / *and probably begun by 160 million years ago*), eight
  paragraphs, no pictures (the manifest has none for it, and the console said so once, as deep-time.js does). Nothing
  moved.
- **focus and back with the handle** (`08`): the flags to 200 and 100 (the handle at 149 inside) → *focus* → the line
  100–200, two events, the handle still at 149 and the Earth at 149; *back* → 252–66, the handle at 149. The flags to
  120 and 70 (the handle outside) → *focus* → the line 70–120, the handle to the nearer end, 120, the Earth with it;
  *back* → 252–66, the handle at 120; *back* again → the whole line, 185 events (20 labels, 16 short lines), the handle
  at 120, *back* absent.
- **Last 12,000 and a tap on a block** (`09`): pressing the scale set the line to the mosaic's whole (12,026 years ago
  to today), the handle at 12,026 years ago and the Earth there: today's continents, the sea 50 m lower, *ground*. The
  tap on tile 650 → the block 6,026–5,026 years ago, the handle at 6,026 years ago, the Earth: *today's ground, the sea
  2 m lower, the ice where it was*; four events on the line, two labelled (*Silk*, *Writing at Uruk*).
- **The Earth turning and zooming while small** (`10`): a finger drag across the canvas turned the view from 10.4° E
  to 77.9° E at the same latitude; six wheel steps took the camera from 4.90 to 2.59 radii, the Tibetan Plateau filling
  the stage, eight close-in tiles held; *Reset view* returned it (10.4° E, 4.90). Nothing moved.
- **Before the Sun** (`11`): the line 4,600–4,567, one event (*Oldest grains*), the handle at 4,600, the Earth at 4,567,
  molten.
- **A drag across tiles** (500 to 299 million years ago): the line 500–299, the handle at 500, nine events; the left
  flag pulled 40 px and let go: 514–299, the handle still at 500.
- **The Earth large** (`12`): the stage from 256 to 384 px; the Earth and everything under it moved down by 128 px,
  which is what the switch is; *small* put every box back to the pixel.
- **Cities**: the word renamed and the Earth's places came on and off (`cwEarth.places()`).
- **Frame rate**, the bench's own measure (`cwBench`, off-screen frames with a readback, the pane's on-screen number
  meaning little): at full on WebGPU, the stage 1,586 × 512 device pixels, **15.8 ms a frame** with the age moving a
  million years a frame (63 a second if alone), **22.8 ms** moving a thousand years a frame through the ice ages (44 a
  second). The on-screen counter read 58–60. The Earth bench's figures are not comparable (a different stage size and
  the pane's floor moves between sessions); the iPad is the real test.
- **What moved, and when.** Through every gesture the ten boxes held still. Two things that are not gestures move
  them: a change of **scale**, because the one-row mosaics are 78 px tall where the five-row one is 317 (the glass
  box's own height, as 7c has it), so the timeline and the summary come up by 238 px on *Last million* or *Last
  12,000* and go back on *4.6 billion*; and the **large** switch, above. Reserving the five-row height for every scale
  is one line in `layout()`, at the cost of a 240 px gap under the one-row mosaics; yours to say.

## At iPad size, 768 × 1,024 in the pane, by finger events

The two-column layout holds (the media rule is at 760); the stage 537 × 341; the glass 405 px, the 4.6 billion in two
lines of five blocks, tiles 6.1 px. Pointer events of type touch:

- **At rest** (`14`): as on the Mac.
- **A press on Dinosaurs with a 5 px wobble** (`15`, `16`): while the finger was down the name and the box showed; the
  lift selected the period, the box gone; the Earth at 252, the handle at 252, the timeline with its six labels.
- **The handle by finger**: live, mid-drag at 150 the Earth read 150, at 66 after the lift 66; on release, mid-drag at
  200 the Earth stayed at 66 and went to 200 on the lift.
- **An event by finger** (`17`, `18`): *The asteroid* tapped, the handle and the Earth at 66.04, the summary below,
  *More* opening the window.
- **focus and back by finger**: flags dragged to 200 and 100 → *focus* → 100–200, the handle (at 66) to the nearer end,
  100; *back* → 252–66, the handle at 100.
- **Last 12,000 by finger**: the scale pressed, the block at tile 650 tapped: 6,026–5,026 years ago, the Earth at
  6,026 years ago, the sea 2 m lower; the 12,000 mosaic two lines of seven and six blocks, tiles 6.76 px.
- **The Earth turned by finger** (32.8° E, 15.3° N → 9.4° W, 1.6° S) while small; **large** (`19`): the stage 537 × 512,
  the ball round. (The first large picture at this size came out oval: the renderer took the stage's new height a
  frame late in the pane; the size switch now calls the view's own resize at once, and the picture is round.)

Not tried on the real iPad or the simulator; the prompt asked for the pane at iPad size.

## What the Earth bench could and could not do at each age, as this page found it

- **Today** (the rest state): Blue Marble, the sea at 0, *ground*. Turns, zooms to the ground, a tap glides a place in.
- **The last 12,000 years**: today's continents, the sea at the curve's level (50 m lower at 12,026 years ago, 2 m at
  6,026), the ice where it was, *ground*. Nothing on the ball distinguishes 6,026 years ago from today but the sea's
  2 m, which the words say and the eye cannot see at this size.
- **The last million**: the same ground with the ice ages' sea and ice; not walked on this page beyond the scale's
  whole (the handle at a million years ago reads *the sea where it is*, the glide note absent since it is this side
  of the seam).
- **66 to 252 million years**: the painted continents where they were, *measured* at 66 and *inferred* at 252; the
  Earth follows a drag at the frame rates above.
- **500 million years**: *inferred*, bare rock before plants, as the bench paints it.
- **4,567 million years**: molten, the word *molten* and its sentence.
- **4,600 million years** (Before the Sun): the Earth cannot go there; it stands at its birth while the title says
  *Before the Earth*. The spec's open question (what the view shows above 4.6 billion) is untouched.
- Not reached from this page by design: *Map*, *Cut open*, today's coasts, the kept picture, full screen, the crop.

## Not in this step, as the prompt lists them

The 13.8 billion rung; trips and play; the probe; *Cut open*; *Globe* / *Map*; the front-door page; the swap into the
Time Machine; any change to the stories. None of them is on the page, and no word stands for them.

## Needs Michael's eye

- **The fold**: the Earth at a third plus the five-row mosaic puts the timeline below the screen at both sizes.
- **The scale change moving the timeline** (the one-row mosaics are shorter), against "nothing ever changing place".
- **The handle over the left flag** right after a tap (the span's older end is the left end): the dot sits on the
  pennant's pole; whether it should land a few pixels in.
- **A tapped event moving the handle and the Earth**, or only showing its words.
- **The title line under the Earth** kept beside the honest block; and *Before the Earth* as its words at 4,600.
- **Cities** driving the Earth's places.
- **Live or on release**: live is the default; on release is the switch.
- **The placeholder paragraph** of *How this works*, in grey.
- **The extraction into `cw-stretch.js`**, now with a clearer brief, before step 2 or not.
- Still open from 7c: the title of the mosaic page, the pull's pace, Before the Sun's grey, the width read as the main
  column, the label's events capped, the 12,000's decade label, the 7b items.

## Later, 4 Nov: the 12,000-year row (Michael's rule of 4 Nov, pasted in chat)

Applied to `time-lab.html` only; the mosaic page keeps its plain 12,000 row (the prompt of the morning left it as it
was, and this rule names the lab's row). Stamp `2026-11-04b 007a8ca · time-lab step 1 + the 12,000 row`.

**The row.** 1,303 tiles drawn, 1,203 of them time (1,200 to the year 2000 and the three decades begun since), the
thirteenth block drawn whole, its unfinished 97 tiles clear glass, no period and no time: pointing at them names
nothing, a drag cannot reach them, the track and the explanation line end under the last real column, and *now* stands
under that column as the thousands stand under theirs. The gold tile is the last real one.

**The periods**, in `PERIODS_12`, a line each: Farms, Cities, Writing, Iron, Paper, Printing, Machines, Electricity, the
spans in years ago as the table gives them, the sketch's colours, the plaques' words his. The first takes the row's
start (the 2.6 tiles older than 12,000 are Farms too: the row starts at the ice), the last reaches now. A tile belongs
to the period its middle year falls in, so the edges are round at the tile, as the rule says: Farms is tiles 0 to 602,
Cities 603 to 682, Writing 683 to 882, Iron 883 to 1,002, Paper 1,003 to 1,142, Printing 1,143 to 1,177, Machines
1,178 to 1,187, Electricity 1,188 to 1,202. Pointing names the period and lifts it as the 4.6 row does, the label
saying the name and then the tile's decade (*Writing · about 2,000 BCE*; *Printing · the 1500s*), then its events;
the plaque appears under the lit span, inside the row, the same box; tapping selects the period, and the Earth goes to
its older end (Printing: the line 600 to 250 years ago, fifteen events; Farms by finger: 12,026 to 6,000, the Earth at
12,026 years ago with the sea 50 m lower).

**The names under the row**, at all times, in small capitals (the canvas's `small-caps` at 11 px, ink-soft, a little
letter-spaced), each centred under its span and kept inside it where the span is narrower than the name, under the
row of thousands. The sketch is not on disk, so "as the sketch places them" was read as centred under the span. The
last three spans are 35, 10 and 15 tiles (19, 5 and 8 px at 1,024 wide), so their names cannot stand side by side: a
name that would run into one already placed drops to the next row, as the events' labels do; at both widths Printing,
Machines and Electricity take three rows, a stair under the right end of the row (pictures `20`, `22`), and the row is
taller by those rows (126 px at 1,024, where it was 94; 281 at 768 in two lines). On a wrapped row a period that
crosses the line break (Writing, 683 to 882, breaks at 700 at 768 wide) is named once, under the line that holds the
larger part of it. Yours to say whether the stair is right or the three should be abbreviated, or two of them dropped
to a rollover.

**The colour-blind check**, the 7 report's (Machado 2009 at full severity, then CIEDE2000; under 10 fails, 10 to 15
weak; the script beside the pictures as `cvd-check-12000-row.py`). Every pair not listed is 18 or more under every
simulation; every colour is at least 21 from the near-black line under every simulation.

| pair | normal | protan | deutan | tritan |
|---|---|---|---|---|
| Writing `#1f6b73` / Iron `#3b4f7a` | 21.4 | 12.4 | **9.4** | **9.8** |
| Printing `#6b3a66` / Machines `#4a5a66` | 22.3 | 10.1 | **4.4** | 32.7 |
| Electricity `#e2bd55` / the gold tile at now `#e2b33a` | **3.7** | **3.5** | **2.8** | **3.2** |
| Farms / its own backlit event tile | 14.5 | 15.1 | 14.0 | 14.3 |
| Paper / its own backlit event tile | 13.3 | 13.1 | 13.1 | 12.8 |
| Electricity / its own backlit event tile | 12.7 | 13.5 | 12.1 | 12.0 |

So: Writing against Iron fails by a hair for a deuteranope and a tritanope; Printing against Machines fails for a
deuteranope outright; and the gold tile at now vanishes into Electricity's gold for everyone, the sketch's last colour
being the tile's own, which was not a problem while the 12,000 row was plain stone. The dark lines between the tiles
hold in every case. Three pale colours (Farms, Paper, Electricity) are only weakly apart from their own backlit event
tiles, as the 4.6 row's pale ones are. Not changed; the colours are the sketch's, for his eye.

**Checked** at 1,024 × 768 by pointer (the row at rest with its names, `20`; the rollover and the plaque on Writing; the
tap on Printing, `21`; the clear glass inert) and at 768 × 1,024 by finger (the two lines with their names, `22`; a
press on Farms with a wobble, the plaque while down, the lift selecting it, `23`). No console errors; `check-deploys`
no errors.

**Needs Michael's eye:** the stair of the last three names; the decade kept after the name in the label; the gold tile
lost in Electricity; the two failing pairs; whether the mosaic page should take the same row.
