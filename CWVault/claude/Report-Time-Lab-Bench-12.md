---
status: Report, 22 Nov 2026. Step 12 of the Time lab bench, built on `616ad562` (step 11, committed and pushed). Checked in the pane at 1,024 × 768 and 768 × 1,024, by pointer and by finger events, and in Safari on the iPad simulator by real taps, a real drag and a real pinch. Reported first, as the prompt asks. NOT COMMITTED.
role: What step 12 did to `experiments/time-lab.html` and the two options it added to `js/3d/earth.js`, what I chose where the prompt left a choice, what the two faults are, what the check found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-12-01.md (Michael's prompt, as it arrived), Report-Time-Lab-Bench-11.md (the page as it stood), Report-Time-Lab-Bench-10d.md (the tree), Report-Time-Lab-Bench-10b.md (the arrival), Report-Time-Lab-Bench-10c.md (the axis), js/cw-panel.js, js/map.js, js/3d/earth.js
updated: 2026-11-22
---

# Report: the Time lab bench, step 12 (22 Nov 2026)

![[Time-Lab-Bench-12-Nov22/05-arrival-landed-selected-ringed.jpg]]

*Arrived: First trilobites selected, no panel, its place ringed on the globe.*

## The one thing you asked first

**Nothing on the page has changed since Report 11 that is in no report.** The file in the working tree was
byte for byte the file step 11 committed (`616ad562`). No commit since then touches it, `cw-panel.js`, `map.js`
or `earth.js`.

**There is no "right arrow goes quickly to now", and there never was.** I searched the page and every Time lab
prompt and report. The nearest thing is step 11's outward drag: an arrow held at the window's edge doubles the
span every second. On the right arrow that does nothing, because the right end already stops at now. If you
asked for it in a chat, it did not reach a prompt.

## What was changed

- `cw-deploys/experiments/time-lab.html`. The stamp is `2026-11-22 616ad56 · time-lab step 12`.
- `cw-deploys/js/3d/earth.js`, two options, as you allowed: `seasCrust` and `seasSoft`. Each is built into the
  seas' paint only when a page names it. A page that names neither has the paint it had. The Earth bench and
  Ancient Seas, which name neither, load with a clean console.

`check-deploys` reports no error. The console is clean. Forty-six pictures are in `Time-Lab-Bench-12-Nov22/`.

## The periods: the tree

- The page opens with the tree on both deep-time mosaics (`13`, `15`). The switch and `?periods=` are gone.
- The lab's fourteen periods are gone, with their colours and their code.
- The other six mosaics are unchanged. I compared every tile's colour and period with the committed page: the
  same.
- Your points 2, 4, 6 and 7 of the 10d report are left as built.

**One thing follows.** The tree comes from a file. For the instant before the file loads, the two deep mosaics
are plain glass with no periods. In The World nobody sees it. With `?w=0` or `?w=1` it may show for a moment.

Every period of the tree now has a More, because the Time Machine's records carry one.

## Arriving in The World

| | |
|---|---|
| The dark waits (Safari, the simulator) | `70` |
| The Earth comes, the handle at 561 Ma | `02` |
| The flash | `03` |
| Midway, 541 Ma | `04`, `71` |
| Arrived | `05`, `72` |

1. **Dark from the first paint.** A small script in the head sets the ground before anything is drawn. Nothing
   of the page shows until it is in place. Then How This Works, the line, and the dark.
2. **The Earth is not shown until it is ready**, and it is never shown at today. While the dark waits, the Earth
   is set to the event's own year so that year's pictures of the seas are fetched. Then it is set to where the
   arrival starts, and shown, with a fade of a third of a second.
3. **No cities.** Show cities is off, as it was. What you saw was the Earth standing at today before the lab
   moved it. That is hidden now.
4. **The handle starts 40 million years older than the event**, at 561 Ma. That is 47 px to the left at 1,024 and
   33 px on an upright iPad. I chose older so that time runs forward as she arrives.
5. **The flash**: once, 0.9 seconds. The handle goes light and a little larger, then dark, then its own copper.
   `?flash=0` opens without it.
6. **The ease**: 1.7 seconds, starting a quarter of a second after the flash begins. The handle moves to 521 Ma.
   The Earth moves through the same years and turns 35° to face the place. They land together. The globe stays
   upright, as every arrival has since step 10c.
7. **Selected, and no panel.** The event's name on the line is in copper and bold, and its stem is copper and
   heavier. A tap on it opens the panel.
8. **The place** is a small open ring, parchment with a dark edge, and nothing inside. A city is a small
   vermilion dot. One of her markers is a copper dot (`62` shows a ring and a marker side by side). It rides its
   plate.

**Under reduced motion**: dark, then a cut to the event. No flash and no ease (`78`).

**If she touches the line or the globe on the way in**, everything stops where it is and is hers. The event is
not selected.

**The dark never waits for ever.** After 2.5 seconds without the sea pictures it shows the Earth anyway. After 9
seconds in all it shows whatever there is.

### The chat's default: the mark for any selected event

Built so. Any event she taps is selected and, if its record has a place, ringed. 191 of the 196 events have
one. **It costs nothing to speak of**: one look-up for each tap.

Three things you should know about it:

- **A selected event stays selected while she moves the handle.** So the ring rides its plate through time.
  That is what "rides its plate" asked for, and it is good to watch. It also means the name stays copper when
  the handle is somewhere else.
- **There is no way to unselect**, except to tap another event or change the line so the event leaves it.
- **The globe does not turn to the place on a tap.** It never did. So the ring is often on the far side.
  Only the arrival and Pick a time turn the globe.

## One panel, in both views

| | The World | Time |
|---|---|---|
| An event's panel | `10` | `14` |
| A period's panel | | `13` |
| More | `11` | |
| A second event over a More | `12` | |
| At iPad size | `60`, `61` | |

- **Where.** 8 px from the window's right edge. Its top is level with the top of How This Works: the panel's own
  place in The World, the word in Time.
- **More replaces the panel.** Its right edge is where the panel's was. It is wider, so it reaches further left.
- **Another event or period replaces whatever is there.** With a More open, one tap on another event closes the
  More and opens that event's panel. This took a change: the More's window used to lay a cover over the whole
  page that took the first tap. This page now lifts that cover.
- **Closing a More closes everything.**
- **If she has moved the panel or a More**, the next one opens where she left it, in that view.
- **A More is always wholly in sight.** It is never taller than the window. In The World it stops above the line,
  so the events stay in reach. On an upright iPad it is narrowed to stand beside How This Works, not over it
  (`61`). Its text scrolls inside it.

**What is left of the stepping aside: nothing but the edges.** The search for the place that hid least is gone
with its code, and so is the stepping clear of How This Works, of Measure and of *select*. Every window is kept
inside the browser window, and that is all.

**Where Measure opens now.**

- In The World: under How This Works, at its left edge (`60`). Beside it was where the panel now reaches on an
  upright iPad. If How This Works is closed, Measure opens where How This Works would stand.
- In Time: at the lower left of the Earth's box (`14`). The upper right, where it used to open, is the panel's.

## The zoom

**Out.** The easing back to the opening size is gone, in both views. The furthest out is the camera's own
limit, as it always was: the Earth is 39% of the window's height (`25`). I waited ten seconds in each view. It
stayed.

**In.** The nearest zoom is set by the grade of knowing at the handle's year. I propose these. Each is the
height of ground the window takes in at the nearest she may come.

| What the Earth shows | Years | Nearest | Picture |
|---|---|---|---|
| The photograph | today to 2.6 Ma | about 240 km: the Earth's own limit, unchanged | `20` |
| Measured | 2.6 to 200 Ma | 2,500 km | `21` |
| Inferred | 200 to 540 Ma | 4,000 km | `22` |
| Fitted | 540 Ma to 1 Ga | 5,500 km | `23` |
| Guessed | 1 to 4 Ga | 8,000 km | `24` |
| Invented, and molten | older | the whole ball | |

At 2,500 km the land's picture is already soft (`21`). I would not go nearer. You may want it further out.

**If she is nearer than a year allows** and the handle takes her there, the Earth eases out in about a second.
A pinch on the way cannot go back in. Under reduced motion it is a cut. Coming back to today gives her the
photograph's limit again and does not move her.

## N and S on the axis

A small N beyond the north end of the line and a small S beyond the south (`26`, `27`, `28`). They are copper,
bold, 12 px, with a parchment edge. They come and go with the axis. They are drawn upright on the screen
whatever the tilt. An end that is behind the Earth has no letter. Not on the map.

## The shallow seas and the crust

| | Grey, soft (opens) | Grey, sharp | As now, soft | As now, sharp |
|---|---|---|---|---|
| 480 Ma | `30` | `31` | `32` | `33` |
| 201 Ma | `34` | `35` | `36` | `37` |
| 69 Ma | `38` | `39` | `40` | `41` |

- **The crust in grey.** The flooded crust is one light grey, `#a3a29c`, with the water's blue over it at half
  the seas' strength. Nothing of the land's picture shows through. The deep sea floor can take a grey well
  darker than this.
- **The shorelines soft.** The sea's pictures are read a second time, coarser, and the edge is cut wide from
  that. A shore is a band about a degree across.
- **Two bench switches**: *the flooded crust*, as now / light grey; *the shorelines*, sharp / soft. The page
  opens on light grey and soft. `?crust=0` and `?shores=0` open the other way. `?crustgrey=` takes another grey.
- Hide shallow seas and `?seas=0` work as before (`62`).

**What is soft and what is not.**

- Soft: where shallow sea meets dry land. Also where the sea ends at Scotese's margin inside a piece.
- **Not soft: where the flooded crust meets the deep ocean.** That edge is the outline of the piece itself. It
  is not in the sea's pictures. Softening it means working out, for every piece, how far each point is from
  the piece's edge. That is not cheap, and I did not do it.
- The tears are those same outlines, so they stay sharp without my doing anything.

Close in, a soft shore is slightly scalloped (`22`). That is the coarse reading showing.

## The two faults

### The coastlines break off. Nothing changed.

`50` is 201 Ma over North America. `51` is 639 Ma.

**What the lines are.** Today's coastlines, at today's sea level: 101 rings, 2,844 points. Each point is carried
back on the plate whose piece holds it today. They are not the old shores, and they were never meant to be.
The chat's guess is right.

**Why they break.** A stretch between two points is drawn only if all of these hold:

| Reason a stretch is not drawn | at 69 Ma | at 201 Ma | at 639 Ma |
|---|---|---|---|
| One end lies on no piece (islands; coast just outside a piece's simplified outline) | 385 | 385 | 385 |
| The piece did not exist yet | 229 | 433 | 1,625 |
| The two ends ride different plates | 219 | 180 | 25 |
| **Drawn** | **2,011** | **1,846** | **809** |

So at 639 Ma under a third of today's coast is drawn. Of the 791 pieces alive today, 273 existed then. An
outline stops partway round a piece of land because the rest of that coast lies on crust that came later, or
on another plate.

**Is anything drawn over them?** No. The lines are on their own layer above the Earth. Only the back of the
ball hides them.

**The Great Lakes at 201 Ma: you are right that there are two sets of data. There are three.**

1. The land's own picture. It carries today's water in it, so Hudson Bay and the Great Lakes are pale blue
   inside the land at every age.
2. Show coastlines: today's coast. It agrees with (1), because both are today.
3. The shallow seas: Kocsis and Scotese's flooded ground at that age. It is about then, not now, so it does not
   agree with (1) or (2), and should not.

In `50` the line runs round today's Hudson Bay, and the grey crust of 201 Ma lies somewhere else.

### A panel dragged to the top. Mended; I could not make it happen.

**What I tried.** The pane is Chromium, and it takes my pointer events, not a real trackpad. I dragged every
window to every edge there. In Safari on the iPad simulator I dragged a panel to the top with a real finger and
pinched on a panel with two. I could not try Safari on the Mac, or a real trackpad. I did not try the old page
in the simulator.

**What the old code allowed.** This much is from reading it, and is certain:

- A panel followed the pointer anywhere while it was dragged. The event's panel, How This Works in The World and
  Measure were brought back when she let go. How this works in Time and the More never were.
- A press on a panel did nothing to stop the browser starting a text selection.
- A pinch or a ctrl-wheel over a panel went to the browser, which zooms the page. Over the Earth the same
  gesture zooms the Earth.

**What I think happened.** This is my reading, not something I saw. On a trackpad, a drag is one finger holding
and one finger moving. Dragged all the way up, the two fingers spread, and the Mac reads a spread as a pinch.
The pointer is over a panel, so the pinch zooms the page, far in. That fits what you had to do to get out: the
pointer had to be over a panel, not the Earth, before a pinch would zoom the page back.

**What is mended.**

- **A panel cannot be dragged out of the window.** Every window is held inside at each move of a drag: the
  panel, both How This Works, Measure and a More.
- **A drag never selects the page's text.** A press on a panel starts no selection. While a panel is dragged
  nothing selects. The page's own text never selects at all. The More's words still do, and so does the bench's
  readout.
- **A pinch or a wheel never zooms the page** over a panel, while a panel is being dragged, or anywhere in The
  World. That covers the trackpad's pinch in Safari, Chrome and Firefox, and fingers on an iPad.

In the simulator the panel stopped at the top of the page (`76`). Nothing was selected. The pinch did not zoom
the page (`77`).

**If it happens again**, tell me the browser and whether you were on the trackpad. One cause I cannot stop from
the page: Safari's two-finger double tap, which zooms to a block of text.

## What was checked

**At 1,024 × 768, by pointer.**

- The arrival from a cold load and a reload: dark, no cities, no Earth at today, the flash, the ease, the Earth
  with it, the event selected, no panel, the place ringed. The same under reduced motion.
- An event's panel, a period's panel, More from each, a second event and a second period over a panel and over
  a More, a More closed. In both views. By real clicks in The World; through the page's own door in Time.
- The panel and a More dragged to each edge, the top most of all; the next one opened where it was left.
- Measure open with an event's panel open.
- Zoomed out and let go, ten seconds, in both views.
- Zoomed in as far as it goes at today, 69 Ma, 480 Ma, 800 Ma and 2 Ga. Zoomed in at today and taken to 480 Ma.
- The axis level and tipped to 70° north and south.
- The seas at 480, 201 and 69 Ma, each switch each way; Hide shallow seas; `?seas=0`.
- Both deep mosaics with the tree; the other six against the committed page.
- Pick a time and its back, the arrows, select and unselect, cities, markers.

**At 768 × 1,024, by finger events.** The arrival; the panel, the More and Measure together; every window to
every edge; the page-zoom guards.

**Safari on the iPad simulator** (iPadOS 18.2, cold from boot; `70` to `78`). The arrival ran with real frames.
A real tap on the event's name opened the panel. A real tap on More opened it in place. A real tap on another
event replaced it. A real drag took the panel to the top. A reload under reduced motion.

## Found on the way

- **A panel opened and closed inside one frame came back.** Only a script can do it. Mended.
- **A More she had moved could cover the line.** It stops above the line now, wherever it stands.

## Seen once, and not explained

In the simulator, the two-finger pinch on the panel opened the event's More (`77`). The page did not zoom. I
think the simulator's tool ended the gesture as a tap. I could not tell.

## Not tried

- An iPad. Safari on the Mac. A real trackpad.
- **How the ease and the flash look, running.** The pane runs no frames under a script. I saw the ease held at
  three moments in the pane and caught once midway in the simulator.
- Full screen, and the sound.

## Needs Michael's eye

1. **The arrival, running, on the iPad.** Is 40 million years near enough? Is 35° of turn too much or too
   little? Is 1.7 seconds right?
2. **The flash** (`03`). Is it wanted at all, now that the handle and the Earth both move?
3. **How the selected event shows** (`05`): copper and bold, and a heavier stem. Is that enough to see?
4. **The ring** (`05`, `62`): its size, and whether it is plainly not a city or a marker.
5. **A selected event stays selected** while the handle moves, and cannot be unselected. See above.
6. **On an upright iPad, How This Works covers the left of the globe**, and the ring landed just under its
   corner (`60`). The arrival does not know the panel is there.
7. **The panel over the Earth.** At the upper right it covers the globe's upper right limb in The World (`10`)
   and in Time (`14`).
8. **The More in Time** runs to the foot of the window and covers the mosaic and the line while it is open. In
   The World it stops above the line.
9. **The zoom's limits**: the table above, and pictures `20` to `24`.
10. **The furthest out**, 39% of the window's height (`25`). Is the floor alone enough?
11. **The grey** (`34`, `38`). Light enough to leave room for the deep sea floor? At 480 Ma most of a continent
    is grey (`30`).
12. **The edge where grey crust meets deep ocean is still sharp.** Do you want the work done to soften it?
13. **Show coastlines.** What is it for, now that you know what the lines are?
14. **The two deep mosaics plain for an instant** when the page opens in Time.

## The chat's four defaults

- **The mark for any selected event**: built so. It costs nothing. Items 4 and 5.
- **The floor alone is enough for zooming out**: built so. Item 10.
- **The Earth eases out to a year's limit**: built so.
- **The tears stay sharp**: they do, and would have whatever I did. Your words were "soften the edges for
  both". The second edge, crust against deep ocean, is not softened. Item 12.

## Not in this step

The Time view taking The World's interface; a coarse period opening into its finer ones; play and the Green
Sahara; an arrival that knows her; how labelled places work on the globe; draining the oceans; plots; Mores for
Humans and Civilization; pictures; the 13.8 billion years; the stories' Worlds; the front door; the swap.

## The files in `Time-Lab-Bench-12-Nov22/`

**The arrival, at 1,024 × 768.** `02`: the Earth comes, 561 Ma. `03`: the flash. `04`: midway. `05`: arrived.
(`01` is the same moment as `02` at iPad size, the Earth still faint.)

**One panel.** `10`: an event's panel in The World. `11`: its More. `12`: a second event tapped over a More.
`13`: a period's panel in Time, the tree's tiles. `14`: an event's panel and Measure in Time. `15`: the 4.6
billion with the tree.

**The zoom.** `20` to `24`: the nearest at today, 69 Ma, 480 Ma, 800 Ma and 2 Ga. `25`: the furthest, after ten
seconds.

**The axis.** `26`: level. `27`: tipped 70° north. `28`: tipped 70° south.

**The seas.** `30` to `33`: 480 Ma. `34` to `37`: 201 Ma. `38` to `41`: 69 Ma. In each four: grey and soft, grey
and sharp, as now and soft, as now and sharp.

**The coastlines.** `50`: 201 Ma, North America. `51`: 639 Ma.

**At iPad size.** `60`: an event's panel and Measure. `61`: a More beside How This Works. `62`: `?seas=0`, the
ring and one of her markers.

**The iPad simulator, Safari.** `70`: the dark waits. `71`: midway. `72`: arrived. `73`: a tap opens the panel.
`74`: More. `75`: a second event over a More. `76`: the panel dragged to the top. `77`: after a pinch on the
panel. `78`: reduced motion.
