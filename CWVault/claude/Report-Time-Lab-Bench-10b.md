---
status: Report, 21 Nov 2026. Step 10b of the Time lab bench, built on `e61f5abe` (step 10 with the shallow seas, committed and pushed). Checked in the pane at 1,024 × 768 and 768 × 1,024, by pointer and by finger events, and once in Safari on the iPad simulator by real taps. Reported first, as the prompt asks. Committed on Michael's word, "Now you can commit this", 21 Nov (`94929fd3`); pushed on his word, "Push it", 21 Nov; the live page shows the step 10b version line.
role: What step 10b did to `experiments/time-lab.html`, what the check found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-10b-01.md (Michael's prompt, as it arrived), Report-Time-Lab-Bench-10.md and Report-Time-Lab-Seas-Nov20.md (the page as it stood), Worknote-Focus-View-02.md, Ruling-Dates-01.md, js/cw-panel.js
---

# Report: the Time lab bench, step 10b — arriving in The World (21 Nov 2026)

![[Time-Lab-Bench-10b-Nov21/01-first-screen.jpg]]

*The first screen at 1,024 × 768: The World, Complex life, Chengjiang at 518 Ma, the seas showing. The iPad's is
`40`.*

Everything in the prompt is built and everything on its check list was checked. One fault of the page's own was
found in the simulator and mended (the fade ate a finger's tap; below). Three things I could not judge and are
yours: how the panel's travel to the corner looks in motion, how the first screen reads with so much of the land
under blue, and whether two panels on the left are too many.

The stamp is `2026-11-21 e61f5ab · time-lab step 10b`. `check-deploys` reports no error on the page. The console
is clean. Nineteen pictures are in `Time-Lab-Bench-10b-Nov21/`.

**What was changed.** `cw-deploys/experiments/time-lab.html`, and nothing else. `js/3d/earth.js`,
`js/cw-panel.js` and every other shared script are as they were.

**One thing to know first.** The prompt names `Worknote-Focus-View-03.md` as the plan. It is not in the vault;
`-01` and `-02` are. I worked from the prompt and from `-02`.

## Arriving

The lab opens in The World, on Complex life, with the handle at **Chengjiang, 518 Ma**, and that event's panel
open.

- **The store has no event for the first trilobites.** Chengjiang is the nearest that shows them, as the prompt
  guessed. The other candidate is *Animals, fossils* (539 Ma), whose More names trilobites "by about 520 million
  years ago"; it is further from them in time. One line in the page's table chooses (`LOOK.arrive`).
- **The globe is upright**, turned to longitude 99° E. That is where Maotianshan's ground lay at 518 Ma on the
  lab's plates (99.3° E, 21.4° S). The record carries the place as where the evidence is today (`placeNow`); the
  page carries it back on its plate.
- **The seas show**, and at that age most of the land in sight is under the pale blue. That is the look you have
  not ruled on.
- `?w=0` opens on the 4.6 billion, in Time (`12`). Any `?w=` opens in Time on the span it names, so `?w=1` is
  Time on Complex life, the old first screen.

**What I could not avoid.** The Earth stands up about 1.3 s after the page, at today and at a longitude chosen at
random, and turns to its place about 0.15 s later, when the plates' file has loaded. On the Mac it is one flick.

## How This Works, a panel in The World

It is `js/cw-panel.js`'s window, as the event's panel is. Open on the left at every arrival.

- **The title** *How This Works* stands at the head of its bar, with the panel's own *close* at the right.
- **The words** are the prompt's draft, unchanged. *Time* in the last sentence is in the copper italic the Time
  view's panel gives to a word on the page.
- **The tools**, as words: *Map* / *Globe*, *Full screen*, *Show cities*, *Show coastlines*, *Place markers*,
  *Sound on*, *Pick a time*. Each is the left column's own word again: a tap on one is a tap on the column's
  word, and it says what that word says. So there is one act and one state, and what she sets in one view holds
  in the other.
- ***Full screen* is left out on a touch device**, as before (`40`).
- **The upper right is empty.** *Map* / *Globe* and *Full screen* are gone from it, with their code.

**Closing and opening.**

- *close* sends the panel, shrinking, to the upper left corner in 0.38 s, where the word *How this works* fades
  in. A tap on the word brings it back out to where it stood, including where she dragged it.
- Under reduced motion both are a cut.
- The word's line is kept while the panel is open, so *Time* never moves. *Time* stands on the second line, with
  *back* beside it after *Pick a time* (`06`).
- In Time the panel is not there. Back in The World it is as she left it, open or a word.

**The event's panel** keeps clear of How This Works and of any tool panel. At 1,024 × 768 it opens under How
This Works, at the lower left (`01`). At iPad size it opens at the upper right (`30`, `40`). When How This Works
is reopened over it, it steps clear, unless she placed it herself.

**The fade.** The words at the upper left fade after four quiet seconds. A faded word acts at the first tap. The
panels do not fade.

**"Every time" I read as every time the page opens.** Inside a visit, coming back from Time shows the panel as
she left it. If you meant every entry to The World, it is one line.

## The tool panel (`?toolpanel=1`)

A word *Test tools*, under a small *bench only*, stands at the foot of How This Works (`02`). It opens a small
panel holding *Show cities* and *Show coastlines*, beside How This Works. The panel stays when How This Works
closes (`03`), and its words work. It is hers to drag and close. In Time it is not there; back in The World it
returns.

The plumbing is one function (`toolPanel`: a title and the column's words it holds). Measure would be one call.

## The handle's label

The label reads **518 Ma**, **1889**, **40.8 ka**: the year alone. The word of knowing is on the date line of the
event's panel, in the same copper italic: *About 518 Ma · inferred*.

**Where else the page shows the word:**

1. **The Time view's *How this works***, near its foot: the word and the grade's sentence at the handle's year
   (*Measured · This side of the ice ages the globe shows…*). Unchanged.
2. **Nowhere else.** A period's panel has no word. The credit names sources and has no word.

**One thing about its new place, for your eye.** The word is the Earth's: it says how well the *picture of the
Earth* at that year is known. On the handle that was clear. On a date line it reads as a word about the date:
*1889 (137 years ago) · measured*, *At least 40.8 ka · measured*, *About 7500 BCE (about 9,500 years ago) ·
measured*. The date of the Eiffel Tower is not measured. I built it as asked.

## Found in the check and mended

**The fade ate a finger's tap.** In Safari on the simulator, with the words faded, a tap on a panel's *close*
only brought the words back; the panel stayed. It took a second tap. The cause is Safari's: a tap during which
something on the page becomes visible is taken for a hover, where the thing tapped answers a hover, and the
click is not sent. *close* answers a hover; the waking words were the something.

- Step 10's page has the fault too, for the event's panel. It was not met because no check closed a panel with
  the words faded.
- **The mend:** by finger, faded words come back when the finger lifts (0.14 s after), not when it lands. By
  pointer, wheel and key they come back at once, as before.
- Checked in the simulator: with the words faded, one tap on *close* closes How This Works (`42`); one tap on
  the faded *How this works* opens it (`43`, `44`); one tap on the faded *Time* goes to Time (`41`).
- What it changes: while she drags the globe with the words faded, they stay faded until she lets go.

## What was checked

**At 1,024 × 768, by real clicks.**

- The first screen (`01`).
- How This Works closed and reopened; *Time* reached with it closed and with it open, and The World again (`11`).
- Each tool once: *Show cities*, *Show coastlines* and *Map* (`04`); *Globe*, *Place markers* with a marker set,
  *Sound on* (`05`); *Pick a time* (`06`). *Full screen* was tapped and the pane refused it, as always.
- `?toolpanel=1` (`02`, `03`).
- The label with no word, and the word in the panel.

**The things the seas' report did not walk.**

- The World with the seas on at 69 Ma, on the globe and on the map (`07`, `08`), and at 480 Ma (`09`, `10`).
- *Pick a time* until it landed twice between 5 and 535 Ma: six picks, the first at 201 Ma (*Big footprints*)
  and the sixth at 252 Ma (*The Great Dying*). Both showed the seas for their age. The four between were inside
  the last 41,000 years and showed none.
- Cities, coastlines and a marker with the seas on, on the globe and on the map (`04`, `05`, `06`). The points
  and lines draw over the seas and ride the plates as before.

**At 768 × 1,024.** The first screen (`30`); 69 Ma with the panel a word (`31`). No sideways scroll.

**By finger events in the pane.** A faded *Time*: one tap, and Time. A faded *How this works*: one tap, and the
panel. A finger landing on the faded page wakes nothing until it lifts.

**Reduced motion** (`?motion=reduce`). The page opens in The World; *close* and the word are cuts, with no
travel; the views change by a cut.

**The Time view** (`11`, `12`). Its left column, its *How this works* and the five bench switches are as they
were, the two for the resting places and the seas' among them. The Earth is 507 px on Complex life and 228 px on
the 4.6 billion, as in step 10.

**Safari on the iPad simulator** (iPadOS 18.2, real taps): `40` to `44`, above.

## The frame rate with the seas on

On this Mac only, the Earth's frame drawn off-screen at 1,024 × 768 (WebGPU, the page's lowest tier), forty
frames each:

| The year | Seas on | Seas off |
|---|---|---|
| 69 Ma | 14.4 ms | 9.7 ms |
| 480 Ma | 7.3 ms | 5.2 ms |
| today | 10.9 ms | 10.5 ms |
| a sweep, 100 to 140 Ma, a million years a frame | 20.5 ms | not timed |

- Where the seas show they add about half again to the frame: 40 to 50 per cent.
- The sweep is the dear case, because the year changes every frame. It is still about 49 frames a second on the
  Mac.
- **This says nothing certain about an iPad.** The simulator draws at about 14 frames a second whatever the page
  does. If the Mac's ratio holds on an iPad, a drag across deep time will be the first place it shows.

## Not tried

- An iPad, and Safari on the Mac.
- The panel's travel in motion. The pane runs no frames, and in the simulator I took pictures before and after.
  I saw where it started and ended.
- *Full screen* from the panel.
- The sound.
- The tool panel in the simulator.

## Needs Michael's eye

1. **The first screen** (`01`, `40`). It is the first thing she sees, and most of the land is under the pale
   blue. Your ruling on the seas before 400 Ma decides it.
2. **Chengjiang for the first trilobites.** Its text does not say *trilobite*. An event of the first trilobites
   (about 521 Ma) would be a pool job.
3. **Two panels on the left at 1,024 × 768** (`01`, `04`). Together they cover the left third of the screen: the
   limb of the globe, and on the map most of what lies west of the middle. Either is hers to close or drag.
4. **The word of knowing on the date line** reads as a word about the date. See above.
5. **A faded word acts at the first tap** (the chat's default). The cost: a tap on the dark corner where a faded
   word stands does what the word does, though she cannot see it.
6. **The mend to the fade**: by finger the words return when she lifts, not when she touches.
7. **"Every time"**: every opening of the page, not every entry to The World.
8. **The panel's place and size.** 315 px wide, under *Time*. The tools are 14 px italic words with 26 px of
   height each for a finger.
9. **The travel**: 0.38 s, shrinking to the word's width and fading as it goes. Yours to watch.
10. **The flick at arrival**, about a seventh of a second of today's Earth before the Cambrian.
11. **The draft words**, yours to rewrite. One line in the table (`WORDS.htwWorld`).
12. ***Pick a time* leaves How This Works open.** After a pick the event's panel goes to the upper right, clear
    of it (`06`).

Step 10's fifteen points are untouched.

## Not in this step

The seas themselves; your answers to step 10's fifteen; the flags as arrows, the end of *focus*, Measure,
*select* and *unselect*; *play* and the Green Sahara; a panel for the Time view; period Mores; pictures for
events; the 13.8 billion years; the stories' Worlds; the front door; the swap.

## The files in `Time-Lab-Bench-10b-Nov21/`

**At 1,024 × 768.**

- `01`: the first screen. `02`: `?toolpanel=1`, *Test tools* open. `03`: How This Works closed to a word, the
  test panel still up, cities on from it.
- `04`: the map at 518 Ma, cities and coastlines. `05`: the globe after each tool, a marker set.
- `06`: *Pick a time* at 252 Ma, *back* beside *Time*, cities, coastlines and the marker with the seas.
- `07`: the globe at 69 Ma. `08`: the map at 69 Ma. `09`: the map at 480 Ma. `10`: the globe at 480 Ma.
- `11`: Time, reached from The World. `12`: `?w=0`, the 4.6 billion in Time, its *How this works* fading in.

**At iPad size.**

- `30`: the first screen. `31`: 69 Ma, How This Works a word.

**The iPad simulator, Safari.**

- `40`: the first screen, the words at the upper left faded. `41`: Time, by one tap on the faded word.
- `42`: How This Works closed by one tap while the words were faded. `43`: the words faded again.
- `44`: reopened by one tap on the faded word.
