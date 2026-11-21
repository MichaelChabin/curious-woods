---
status: Report, 21 Nov 2026. Step 11 of the Time lab bench, built on `e2b53a6a` (step 10d, committed 21 Nov on Michael's word, "Commit 10d, start 11"; not pushed). Checked in the pane at 1,024 × 768 and 768 × 1,024, by pointer and by finger events, and in Safari on the iPad simulator by real taps and drags. Reported first, as the prompt asks; COMMITTED on Michael's word, "Commit 11", 21 Nov, this session's lines only (`616ad562`); PUSHED on his word, "Push it", 21 Nov; the live page shows the step 11 stamp.
role: What step 11 did to `experiments/time-lab.html` and the one option it added to `js/3d/earth.js`, what I chose where the prompt left a choice, what the check found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-11-01.md (Michael's prompt, as it arrived), Worknote-Focus-View-03.md (the plan), Worknote-Focus-View-02.md (the reasoning on select), Report-Time-Lab-Bench-10d.md (the page as it stood), Report-Time-Lab-Seas-Nov20.md, Ruling-Dates-01.md, js/cw-panel.js
updated: 2026-11-21
---

# Report: the Time lab bench, step 11 (21 Nov 2026)

![[Time-Lab-Bench-11-Nov21/01-time-at-rest.jpg]]

*Complex life at rest: an arrow beyond each end of the line.*

## Before I started

Step 10d was not committed when the prompt arrived. I stopped and said so. You answered "Commit 10d, start 11".
Step 10d is committed as `e2b53a6a`, this session's lines only, and not pushed.

## What was changed

- `cw-deploys/experiments/time-lab.html`. The stamp is `2026-11-21 e2b53a6 · time-lab step 11`.
- `cw-deploys/js/3d/earth.js`, one option. The seas could only be made fainter inside it. The option is
  `seasStrength`, with `setSeasStrength`. It is 1 unless a page asks, so every other page is as it was.

`check-deploys` reports no error on the page. The console is clean. Thirty-nine pictures are in
`Time-Lab-Bench-11-Nov21/`.

Gone, with their code: the flags, *focus*, *back* beside the mosaic, the pull, the bench's test panel and
`?toolpanel=1`. *back* beside *Time*, after *Pick a time*, is still there.

## The arrows

At each end of the line, 12 px beyond it and lying in line with it, a copper double-headed arrow 30 px long
(`01`). The years at the ends stand centred over the ends, 7 px above the line. The span's length is centred
between them. The handle's year rides the row above.

**While she drags** (`02`, `04`, `16`): the end of the line goes with her finger. The year at that end reads out
above it. Inward, the part of the line she is giving up goes faint. The tiles inside the span she is making are
lit. **When she lets go** the line restretches with an ease, 380 ms, or as long as the tiles take to move.
Under reduced motion it is a cut.

**The line is not shortened in Time.** Your prompt says the line shortens to make room. There was room already:
the gutter beside the tiles is 64 px or more, and the years no longer hang in it. I left the line under the first
and last tiles, so a gathered tile still stands over its own years. In The World the gutters are 88 px. Say if
you want the line shorter all the same.

### What I chose where you left a choice

**The year reads out on the tiles' grid.** The end snaps to the edge of a tile of the mosaic that will show the
span: a million years on the two deep mosaics, a thousand on Humans, ten on Civilization, Writing and Paper, one
on Machines and Computing. So what the readout says is what she gets, and the gathered tiles and the line end at
the same year.

**The least span is ten tiles of the mosaic she is on** (`10`): 10 million years on the 4.6 billion and Complex
life, 10,000 years on Humans, 100 years on Civilization, Writing and Paper, 10 years on Machines and Computing. A
line that *select* made shorter than that stays as short and cannot be made shorter.

**Dragging outward** is the chat's suggestion, built as it was put:

- Outward travel adds years at the line's present scale. The line runs on under the arrow.
- The arrow goes with her finger as far as the window's edge. In Time that carries it over the left column
  (`07`).
- A finger held within 28 px of the window's edge keeps adding years. The span doubles every second, so the
  years come faster the longer she holds. Brought back inside the end, the held years are given back.
- The right end stops at now. At now, an outward drag moves nothing, not even the arrow.
- The left end stops at 4.6 Ga.

| From | Held at the edge | The span became |
|---|---|---|
| Machines, 1720 to now | 4 seconds | 4410 BCE to now, on Civilization |
| Machines, 1720 to now | 9 seconds | 4 Ma to now, on Complex life |
| Complex life | 6 seconds | 4.6 Ga to now |
| 453 Ma to now, in the simulator, a real finger | about 2 seconds | 2.226 Ga to now (`42`) |

The first three rows are worked out by the page's own sum with the time given to it. The last was a real drag.

### The tiles always match the line

In Time, a release gathers the new span's tiles (`03`). The word beside them reads *unselect*.

**A span that reaches beyond the mosaic she is on** moves to the smallest mosaic under *Select years* that holds
it, and gathers there. The move is *select*'s own move run backwards: the tiles on the screen travel to their
places in the larger gathering and the rest come in round them.

| | Mid-move | After |
|---|---|---|
| Machines out past 1720, to 1640 | `08` | `09`: Paper, 39 tiles of ten years |
| Complex life out past 720 Ma, to 906 Ma | `05` | `06`: the 4.6 billion, 91 tiles of ten million years |

**Between mosaics whose tiles are different lengths.** From Machines to Paper, the 307 year tiles fly ten into
each decade tile, and the eight older decades appear round them in a ripple. A year tile shrinks to a tenth of
its width as it lands. From Complex life to the 4.6 billion the tiles are the same length; the gathered line
merges them by tens because a line cannot hold 906 tiles. I saw both moves held at one moment each, not running.

Three things follow from the grid:

- When the mosaic changes, the other end is taken to the new grid too. A right end at 1968 became 1970 on Paper.
- A span never moves back down to a smaller mosaic by itself. That takes a word under *Select years*.
- Where a line holds more tiles than fit, the tiles are merged by tens, as before. The line may then say 564 Ma
  where the last tile stands for ten million years.

**In The World** the arrows change the line. The tiles are set to match at once, unseen, by a cut. In Time
afterwards they agree (`45`).

**The handle.** It stays at its year. Left outside a new span, it goes to the nearer end and the Earth with it:
at 600 Ma, with the left end brought in to 283 Ma, the handle went to 283 Ma (and `41`, by a real finger).

## select and unselect

- *select* stands to the left of the tiles, level with the marked tiles (`11`). On the 4.6 billion, where a
  period may run over several rows, it stands level with their middle.
- Tapped, the tiles gather and the word reads *unselect*, level with the gathered line (`12`).
- *unselect* puts the tiles back as they were, the selection still marked, and the word reads *select* (`13`).
- A word under *Select years* shows that span's tiles whole, and the word goes.
- *back* beside the mosaic is gone.

**Which word shows.** While something is marked, *select*. With nothing marked and a gathered line standing,
*unselect*. Otherwise no word.

**A select inside a select.** She can mark a span on a gathered line and *select* again. *unselect* then goes
back one step, to the first gathering, with the smaller span marked. To go back again she clears the mark, by a
tap on empty ground, and the word reads *unselect* once more.

**After an arrow**, *unselect* puts back the whole mosaic with the span marked.

**The line follows.** After *unselect* the line is the span of the tiles put back. The handle stays where it is.

**A period's panel steps aside.** A panel that would stand over the word moves clear of it, unless she put the
panel there herself.

## Measure

- The word *Measure* is under *Information* in Time, after *Place markers*, and in *How This Works* in The World.
- It opens a tool panel by step 10b's `toolPanel`, which now can stand in both views. It stays open when
  *How This Works* closes (`44`). It is hers to drag and close. It keeps a place of its own in each view.
- **The markers** are slate blue I-beams across the line, with the stretch of line between them in the same blue
  (`14`, `15`). The handle is a copper dot and the arrows are copper, so nothing else on the line is blue. In The
  World they are pale blue.
- They start a third and two thirds of the way along. She drags either.
- **The panel** shows the older year, *to*, the newer year, and the time between in words.
- **The years, by Ruling-Dates-01.** Inside the last 12,000 years: the ordinary year, then the years ago in
  parentheses (`18`). A marker's year comes from a pixel. Where a pixel is more than a year it says *About*:
  "About 5990 BCE (about 8,020 years ago)". Where a pixel is a year or less it is plain: "1822 (204 years ago)".
  Older years count ago only, written as the line writes them: "376 Ma".
- The markers move nothing. With the handle at 300 Ma, both markers dragged, the Earth did not change.
- When the panel closes, the markers go. Opened again, they return where she left them.
- It works in both views.

**When the line changes under them.** If both years are still on the line, the markers keep them (`17`). If
either is not, both go back to a third and two thirds. I added one condition: they must also stand 8 px apart on
the new line. Two years of the 1800s are both "on" a line of 720 million years, on one pixel.

**A press near the handle.** A marker within 14 px takes the press only if it is nearer than the handle.

## The shallow seas

- **Fainter.** `earth.js` now multiplies the sea's blue by a strength, so the land's own picture shows through.
  The bench switch is *the shallow seas, how strong*: as before (1) / fainter (0.55) / faintest (0.3). The page
  opens on *fainter*. `?seastrength=1`, `2` or `3` sets it from the address.
- **A word she can use.** *Hide shallow seas* stands after *Show coastlines*, in the column and in *How This
  Works*. Tapped, it reads *Show shallow seas*. The seas are on when the page opens. `?seas=0` opens with them
  off. The bench's on / off is gone.
- The tears stay. There is no word of knowing for the seas.

| | As before | Fainter | Faintest | Off |
|---|---|---|---|---|
| 480 Ma | `20` | `21` | `22` | `23` |
| 69 Ma | `24` | `25` | `26` | |

## The words

The two paragraphs of *How this works* in Time are yours, as written (`27`). The sentence in The World is in,
before the last (`15`).

## What was checked

**At 1,024 × 768, by pointer.** A real drag of the left arrow in the pane, and the rest through the page's own
door.

- Each arrow inward and outward, in Time and in The World, on Complex life and on Machines.
- The right arrow at now, pushed outward: nothing moves.
- The left arrow taken to 4.6 Ga, and pushed again: nothing moves.
- The least span, on Complex life and on Machines.
- From Machines out past 1720, and from Complex life out past 720 Ma.
- The tiles and the line after each release in Time, and after changes made in The World.
- The handle left outside a new span.
- *select* and *unselect* on a period and on a dragged span; a word under *Select years* after each.
- *Measure* in both views: opened, both markers dragged, *How This Works* closed with it open, closed and opened
  again, an arrow dragged while it was open.
- The seas at 480 Ma and 69 Ma at each strength; the word off and on in both views; `?seas=0`.
- The periods switch each way, with *select* and an arrow on each, on both deep mosaics.
- *Pick a time* and its *back*, an event's panel, cities, markers.

**At 768 × 1,024, by finger events** (`30` to `33`). Each arrow inward and outward in both views; the left arrow
held at the window's edge for a second and a half; *unselect* and *select*; *Measure* with an arrow held.

**Reduced motion** (`?motion=reduce`). The line cuts to the new span. The tiles cut. The views cut.

**Safari on the iPad simulator** (iPadOS 18.2, real taps and drags; `40` to `47`).

- The left arrow dragged inward: 453 Ma to now, the handle taken to 453 Ma (`41`).
- The left arrow dragged to the window's edge and held: 2.226 Ga to now (`42`).
- *Measure* tapped in *How This Works*; a marker dragged; the Earth and the handle did not move (`43`).
- *How This Works* closed; *Measure* stayed (`44`).
- *Time* tapped: the tiles gathered to the line's span (`45`). *unselect* (`46`), then *select* (`47`).

## Found and fixed on the way

- *Measure*'s panel opened before its words were in it. The event's panel stepped clear of an empty box and
  then stood partly under the full one. The words go in first now.
- A period's panel could stand over *select*. It steps aside now.
- A round span of millions read "4,000,000 years". It reads "4 million years".
- *Measure*'s panel was too narrow for a calendar year with its years ago. It is 252 px now.

## Seen once, and not explained

In the simulator, my first drag of a marker did nothing. It came less than a second after the tap that opened
*Measure*. The same drag made again moved the marker. I could not tell whether the page missed it or the
simulator's tool sent the drag before the tap had landed.

## Not tried

- An iPad, and Safari on the Mac.
- **How the ease looks.** The pane runs no frames under a script. I saw where things ended, and two moves held
  at one moment each.
- **How the doubling feels under a finger.** One real hold, in the simulator.
- A finger starting at the very edge of an iPad's screen, where the system has gestures of its own.
- The sound, and *Full screen*.

## Needs Michael's eye

1. **The arrows** (`01`, `40`): their size, their copper, 12 px beyond the end.
2. **The line not shortened in Time.** See above.
3. **Dragging outward.** Is travel, then a hold at the window's edge, right for a finger? Is doubling every
   second too quick or too slow? In Time the arrow rides over *Select years* on its way to the edge (`07`).
4. **The readout in steps.** On Civilization the year under her finger goes by tens. On Complex life by a
   million.
5. **The least span**, ten tiles.
6. **The move between mosaics** (`05`, `08`), running, on the iPad.
7. **A span never steps back down to a smaller mosaic.** From Machines she can reach 4410 BCE on Civilization.
   Brought back in to 1800, she is still on Civilization, in decades.
8. **unselect after a select inside a select.** One step back, then a tap on empty ground to reach *unselect*
   again. Would you sooner have *unselect* always go to the whole mosaic?
9. **Measure's markers** (`14`, `15`): are I-beams in slate blue different enough from the handle and the arrows?
10. ***About* in Measure's panel** (`18`), wherever a pixel is more than a year.
11. **The markers going back to thirds** when one of their years leaves the line. I could have kept the one
    still on the line.
12. **Three panels on an upright iPad in The World** (`43`): *How This Works*, *Measure* and an event's panel
    do not fit side by side. The event's panel now moves down clear of *Measure*.
13. **The seas' three strengths.** At *fainter* the flooded land reads as pale grey-blue land (`21`). At
    *faintest* it is nearly the land's own colour (`22`). Which opens the page?
14. **The handle on an end.** Its year is said once, on the handle's row, and the end's own year is not drawn.
    So after *select* the left end has no year close above the line (`12`).

## The chat's three defaults

- **Dragging outward** as the chat suggested: built so. Item 3.
- **The move between mosaics**: built; how it looks is above, and item 6.
- ***Measure* in Time as well**: built so (`14`).

## Not in this step

A coarse period opening into its finer ones; *play* and the Green Sahara; a panel for the Time view; Mores for
Humans and Civilization; pictures; Scotese's plates; the 13.8 billion years; the stories' Worlds; the front
door; the swap.

## The files in `Time-Lab-Bench-11-Nov21/`

**At 1,024 × 768.**

- `01`: Time at rest. `02`: the left arrow held inward. `03`: let go, the tiles gathered.
- `04`: the left arrow held outward past 720 Ma. `05`: the move to the 4.6 billion, held. `06`: after.
- `07`: Machines, the arrow held at the window's edge. `08`: the move to Paper, held. `09`: after.
- `10`: the least span, ten years.
- `11`: a period marked, *select*. `12`: selected, *unselect*. `13`: unselected, still marked.
- `14`: *Measure* in Time. `15`: *Measure* in The World. `16`: The World, the right arrow held inward.
  `17`: let go, *Measure* still open. `18`: *Measure* on Civilization, calendar years.
- `20` to `23`: the seas at 480 Ma, as before, fainter, faintest, off. `24` to `26`: at 69 Ma.
- `27`: *How this works* in Time. `28`: the bench switches.

**At iPad size.** `30`: The World. `31`: Time, gathered. `32`: an arrow held, *Measure* open. `33`: the 4.6
billion, *select*.

**The iPad simulator, Safari.** `40`: The World. `41`: the left arrow dragged in. `42`: held at the edge.
`43`: *Measure*, a marker dragged. `44`: *How This Works* closed. `45`: Time, the tiles agree. `46`: *unselect*.
`47`: *select* again.
