---
status: Report, 19 Nov 2026. Step 9 of the Time lab bench, built on `5484dc82` (step 8 as live, with the earth.js fix). Checked in the pane at 1,024 × 768 and 768 × 1,024, and once in Safari on the iPad simulator. Reported first, as the prompt asks. NOT committed.
role: What step 9 did to `experiments/time-lab.html`, what the check found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-09.md (Michael's prompt, saved as it arrived), Worknote-Focus-View-02.md (why), Report-Time-Lab-Bench-08.md (the page as it stood), js/cw-panel.js
---

# Report: the Time lab bench, step 9 — The World and Time (19 Nov 2026)

The page has two views, one panel in place of the text block, a regrouped menu, an Earth of one size in Time, and a
temporary *Pick a time*. Everything on the prompt's check list passes. Five faults turned up during the check and are
fixed; they are listed under *Found and fixed*.

The stamp is `2026-11-19 5484dc8 · time-lab step 9`. `check-deploys` reports no error on the page. The console is clean
in a fresh tab. Twenty-six pictures are in `Time-Lab-Bench-09-Nov19/`, named below by number.

**What was changed.** `cw-deploys/experiments/time-lab.html`, and nothing else. No shared script was touched.
`js/cw-panel.js` fits as it is.

## The two views

**Time** is the page as it stood, without the text block (`01`).

**The World** (`02`, `31`, `40`):

- The Earth's stage is the whole window. The ball is as wide as the window's shorter side.
- The timeline lies across the foot: 848 px wide at 1,024, with 88 px each side for the flags' years. It is 117 px tall
  and stands 10 px above the foot, and above the home bar on an iPad.
- Under it is a ground of parchment at 0.72 strength, fading in over its first 26 px, so no hard line crosses the Earth.
- On that ground the line's words are in the ink, not the grey they wear on parchment. The events' names keep their halo.
- *Time* is at the upper left. *Align North* and *Reset* are at the upper right when they have work.
- Each word on the Earth stands on a little parchment, so it reads over land and sea.
- The mosaic, *Select years* and the column are not there. They keep their state for her return.

**The move** is designed at 480 ms (`LOOK.viewMs`). `03` is the move held at its middle.

- The Earth grows from its box to the window. It is drawn once, at the World's size, and shown smaller on the way, so the
  picture stays sharp.
- The column and the mosaic go in the first half. The World's words and ground come in the second.
- The line travels to the foot and widens, drawn afresh each frame as a *focus* draws it.
- To Time it is the same move run backwards.
- Under reduced motion it is a cut, both ways. Checked with `?motion=reduce`.

**Checked both ways**, by the menu word and by the word at the upper left:

- by real clicks on the 4.6 billion (a deep span) and on Writing (a recent one);
- by the page's own bench hooks on Complex life, Humans, Civilization and Machines;
- on the globe, and on the map after a real click on *Map* (`08`, `09`).

**The timeline in The World** does what it does in Time. By real pointer: a tap on an event, the handle dragged, the left
flag dragged in, *focus* tapped (`15`). By touch-type pointer events at iPad size: the same four (`32`).

## The menu

*How this works*, its text as it is. Then:

- **Focus:** *The World*, *Map* / *Globe*, *Full screen*, in that order.
- **Information:** unchanged.
- ***Pick a time***, last.

*Small Earth* and *Large Earth* are gone with their code (`lab.size`, `earthStep`, `?size=`, the step 8 fit).

## Reset and Align North

Each is there only while it has work, and goes when tapped.

- **Reset** has work when the Earth's turn or its scale is not the one it opened on (0.3° or 1 part in 100). Tapped, it
  eases the Earth back there.
- **Align North** has work when the globe is tilted by more than one degree. Tapped, it stands the globe upright at the
  longitude she is looking at. That keeps the place she was looking at on the middle line, as near the middle as an
  upright globe can hold it.
- **In Time** they stand to the right of the Earth's box: *Align North* level with its top, *Reset* with its foot (`14`).
- **In The World** they stand at the upper right, *Align North* above *Reset* (`15`).
- **On the map** neither shows. North is up there, and the map is whole and still, so neither has anything to do.

Checked by real clicks in The World and by a real drag on the Earth in both views. *Align North* took the tilt from 28.9°
to 0° and kept the longitude. *Reset* went at once and the Earth eased home.

## The panel

The text block is gone in both views. One panel takes its place.

- **A tap on a period** opens it: the span and length, the name in bold, the words (`10`).
- **A tap on an event** opens it: the period's name small at the top, the date line by Ruling-Dates-01, the name in bold,
  the summary, *More* (`11`).
- **A tap on the period's name** in an event's panel shows that period (`13`).
- **A new tap replaces** what it shows. *close* closes it.
- **She drags it**, and it opens there afterwards, in that view, for the visit. Each view keeps its own place. Checked:
  her place in Time and her place in The World, each found again as the view changed back and forth (`12`, `33`).
- **Where it opens before she has moved it:** the place on the screen that hides least. It keeps clear of the thing she
  tapped and of the handle first, then of the line, the words, the Earth's ball, the reminder line and the mosaic.
  At 1,024 in Time that is the empty ground to the left of the Earth (`10`, `11`).
- **It stays put** from tap to tap unless another place is clearly better.
- It is 282 px wide. A period's is about 110 to 130 px tall, an event's about 190 to 210.

**How many periods have a More: none of the twenty-six** (fourteen on the 4.6 billion, four on Humans, eight on
Civilization). The events' store holds no period. The panel shows a *More* where a period has one, and none has.

- The Time Machine's periods file, `stories/deep-time-periods.json`, has a More for each of its thirty periods.
- Only one matches a Time lab period in both name and span: *Dinosaurs*, 252 to 66 Ma.
- *Mammals* and *Hand axes* share a name with different spans. I wired none of them.

The step 8 word limits stand. *Iron*, at 31 words, fits.

## A constant Earth in Time

The Earth is one size on all eight spans. The size is set by the 4.6 billion, the tallest mosaic.

| Window | The Earth | On the 4.6 billion |
|---|---|---|
| 1,024 × 768 | **228 px** on all eight (step 8: 120 and 256) | the line, both flags, the handle and all four rows of names are in sight; only the grey *one pixel* line, 8 px, is under the fold |
| 768 × 1,024 | **345 px** on all eight in the pane; 360 px on an iPad, where no scrollbar takes room | the line is still under the fold: its foot is 293 px below the screen, the names 348 px |
| iPad simulator, Safari | **412 px** | as the row above |

- At iPad size the 4.6 billion is ten lines of blocks. No Earth is small enough to bring its line into sight, so the
  Earth is not made small for nothing. It takes two fifths of the screen's height, or its box's width if that is less.
- The Earth's box in Time is inset 96 px on each side, so the two words have somewhere to stand. It is 601 px wide at
  1,024 (the column is 793).

## Pick a time

- It picks one event at random from the store.
- It goes to The World on the smallest span that holds the event, by a cut, with the handle at the event's year and the
  event's panel open (`16`, `34`).
- If the record carries a place, the globe turns to face it, where that ground was at the time.
- *back* appears beside *Time*. It returns the view, the span, the line, the year, the Earth's turn and the panel she had,
  and goes.
- *Time* goes to the lab at the new moment, and lets the old one go.

**How many events carry a place: 112 of 185.** All 111 after the ice do. Of the 74 deep events one does, the asteroid at
Chicxulub. Seventy deep events carry something else, where the evidence is today; *Pick a time* does not face those.

**Five times, and back from each:**

| Event | Year | Span it chose | Faced |
|---|---|---|---|
| Ishango bone | 20 ka | Humans | no place |
| Starry Night | 1889 | Machines | Saint-Rémy |
| Antarctica freezes | 33.9 Ma | Complex life | no place |
| Franklin's kite | 1752 | Machines | Philadelphia |
| Suez Canal | 1870 | Machines | Ismailia |

Each *back* put everything back exactly: compared before and after, the same. Then by real clicks: *Guest star* (1054,
Paper, Kaifeng) at 1,024, and *Eratosthenes* (240 BCE, Writing, Alexandria) at iPad size.

## Small things

- **The rounding rule** is approved. Nothing to build.
- **`?fade=1`** is built and off. In The World the words fade after four quiet seconds and return at a touch, a move of
  the pointer or a key. The year on the handle stays, and so do the line, the flags and the events' stems (`17`).

## The Earth draws land

After the earth.js fix, in a fresh tab on WebGPU: land at 262 Ma in Time and in The World (`04`, `05`), and at 20,700
years in both, with the ice over Scandinavia (`06`, `07`).

## Safari, on the iPad simulator

One pass in the simulator's Safari (iPadOS 26.5), by real taps.

- *The World*, a tap on an event, *Time*: all three work (`40`, `41`).
- The first load after the simulator started showed an empty Earth's box for the minute I watched. Every load after
  it drew the Earth, and so did a cold load from an address the simulator had never used, within 25 seconds. I take
  the first for the simulator's own start and not the page, and I could not make it happen again.
- The page's own readout there: *world to time, 480 ms designed, 496 ms taken, 3 frames* (`42`). The simulator draws this
  page at 8 frames a second, so the three frames say nothing about an iPad.

## Found and fixed

1. **The event's panel did not open after *Pick a time*.** It was asked for while the views were changing and lost.
2. **The Earth changed size with the window's scrollbar** at iPad size in the pane: 345 px on the two tall mosaics, 360 on
   the rest. It is worked out for both widths now.
3. **A panel could be dragged off the screen** and stay lost. Let go past an edge, it comes back inside.
4. **The iPad's home bar lay over the lowest row of events' names** in The World. The line stands above it now.
5. **A tall panel lay over the reminder line.** The panel keeps clear of it too.

## Found, and not this step's

**The handle writes *1055* for an event dated 4 July 1054.** The store's year is 1054.5 and the label rounds it. Any
event with a day in the second half of its year reads one year late on the handle. It is in step 5's code. I left it.

## Not tried

- An iPad, and Safari on the Mac.
- The Mac's full screen. The pane refuses it.
- Two fingers: a pinch, and the two-finger drag that leaves full screen.
- The sound.
- A long drag of the panel by a real pointer. The pane's drag jumps in one step, which a panel that waits for the first
  small movement never sees. A short real drag moved it, and long ones were made by script. In the simulator a real
  finger dragged the *How this works* panel, which is the same piece.
- How the move looks. The pane ran one frame of it, and the simulator three.

## Needs Michael's eye

1. ***Align North* is there on arrival, every time.** All seven opening views are tilted by more than a degree (Lake
   Victoria least, 1.3°; the Alps most, 46°). That is the prompt's rule, kept to the letter. Two other ways: open the
   Earth upright, or let the word wait until she has tilted the Earth herself.
   **Ruled, 19 Nov, Michael's word, "Keep it as built": it stays as built.**
2. **What "not north up" means here.** This globe is on a stand and never rolls. Its axis always runs up the screen; it
   only leans toward her or away. So I took "not standing north up" to be the tilt. If you meant something else, say.
3. ***Reset* and *Align North* undo each other.** *Align North* leaves the Earth off its opening view, so *Reset*
   appears. *Reset* tilts it back, so *Align North* appears.
4. **The Earth's box in Time is narrower**, 601 px at 1,024, to give the two words their place. Zoomed in, she sees less
   of the Earth in Time than before.
5. **228 px is what the 4.6 billion allows.** On the other seven spans the lower half of the screen is empty and the
   Earth could be twice the size. One size was the prompt's rule.
6. **The ground under the line** at 0.72, the words in ink on it, and the little parchment under each word on the Earth.
7. **The move.** If she has zoomed in, the Earth's box in Time is wider than the picture the move starts from, and the
   flanks cut at the first frame.
8. **The panel drags by its whole surface**, not only its top. That is how `cw-panel.js` is.
9. **A dragged span opens no panel.** If the panel is open it shows the span and its length. If it is closed it stays
   closed.
10. **The eight whole-span descriptions show nowhere now** (*The Earth. The history of the Earth…*). They are kept in
    the table.
11. ***How this works* is as it was**, and two of its sentences are no longer true: "its story appears above" and "The
    Earth above".
12. **In The World there is no menu.** *Map* / *Globe* and *Full screen* can be changed only in Time. A *focus* there
    has no *back* until step 10.
13. ***Pick a time* turns the globe at once**, not by a glide, and returns it to its opening distance.
14. ***back* and *Time* after *Pick a time*:** both are built, as the chat's default.
15. **No period has a More.** One line would give *Dinosaurs* the Time Machine's.
16. **At iPad size the 4.6 billion's line is still under the fold.**
17. **The panel in Time at iPad size** has no empty ground wide enough, and overlaps the mosaic's left edge (`41`).
18. ***Let it move***, the scene's own word under reduced motion, still stands under Focus, after *Full screen*.
19. **1055 for 1054**, above.
20. **The board's head line.** Another session has it open, uncommitted. I added this step's entry in the Time lab
    thread and left the head line alone.

## Not in this step

*select* and *unselect*, the flags that widen, the end of *back* on the line; *play* and the Green Sahara; the first-visit
hint; Scotese's plates; the seas; the 13.8 billion years; the stories' Worlds; the front door; the swap.

## The files in `Time-Lab-Bench-09-Nov19/`

**At 1,024 × 768.**

- `01`: Time, the first screen, the 4.6 billion. `02`: The World on it. `03`: the move held at its middle.
- `04`, `05`: 262 Ma on Complex life, in Time and in The World.
- `06`, `07`: 20,700 years on Humans, in Time and in The World.
- `08`: Time, the map, on Machines. `09`: The World, the map.
- `10`: a period's panel. `11`: an event's panel, the period's name at its top.
- `12`: The World, an event's panel where she left it. `13`: the period shown from the event's panel.
- `14`: Time, *Align North* and *Reset* by the Earth's box. `15`: The World, both words, and *focus* on the line.
- `16`: *Pick a time*: Guest star, with *back* beside *Time*. `17`: `?fade=1`, the words faded.

**At iPad size.**

- `30`: Time, the first screen. `31`: The World. `32`: The World, the Earth turned by touch, *Reset* there.
- `33`: Time on Civilization, an event's panel where she left it.
- `34`: *Pick a time*: Eratosthenes. `35`: Time after *Time*, at the new moment.

**The iPad simulator, Safari.**

- `40`: The World. `41`: Time after *Time*, the event's panel. `42`: the readout, the move's time.
