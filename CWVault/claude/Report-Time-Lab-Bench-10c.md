---
status: Report, 21 Nov 2026. Step 10c of the Time lab bench, built on `6dd344a5` (step 10b, committed and pushed). The prompt's first part rested on a roll the globe does not have; Michael was asked and chose "Build my two ideas". Checked in the pane at 1,024 × 768 and 768 × 1,024, by pointer and by finger events, and once in Safari on the iPad simulator by real taps. NOT committed, as the prompt asks.
role: What step 10c did to `experiments/time-lab.html`, what was found about the 27 Oct ruling, what the check found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-10c-02.md (Michael's prompt, as it arrived), Report-Time-Lab-Bench-10b.md (the page as it stood), Worknote-Time-Lab-Answers-01.md, Report-Time-Lab-Bench-09.md (its point 2, on what "not north up" means), Ideas-Ledger.md (*A globe on a stand turns like a globe on a stand*), js/3d/scene.js
updated: 2026-11-21
---

# Report: the Time lab bench, step 10c (21 Nov 2026)

![[Time-Lab-Bench-10c-Nov21/02-axis-in-a-drag.jpg]]

*A drag in The World at 69 Ma, the globe tipped 40°: the axis through the poles, and a point at the north pole.*

## What I found about the ruling of 27 Oct

**The ruling was not lost. The lab's globe does not roll, and never has.**

- The stand's turning is in `js/3d/scene.js`, as `gesture: 'globe'`: a drag left or right spins the Earth about its
  own axis, a drag up or down tips it, the tip stops at each pole, north stays up the screen.
- The Time lab has asked for it since step 1 (`ed18d0bb`, 4 Nov). The line is still there: `gesture: 'globe'`.
- I measured it on step 10b's page before changing anything. After two circles, a slant, a drag 600 px past the
  pole, a sideways drag at the pole, and two fingers twisted a quarter turn, the axis leaned 0.000° from the upright
  of the screen each time.
- Step 9's report said the same in its point 2 (*This globe is on a stand and never rolls… I took "not standing
  north up" to be the tilt. If you meant something else, say*). That question was not answered, and the chat took
  the globe for a trackball.

**So what loses north is the tilt.** Once the globe is tipped, a sideways drag carries the land round the pole on a
curve, and looking down on a pole it turns the whole picture like a wheel. That reads as a roll. A desk globe does
the same.

The prompt's first part could not be built as written: its desk globe is the globe you have. I stopped and asked.
You chose **Build my two ideas**: keep the stand and its resting place, and add the axis and the favouring drag as
bench switches.

**Not done, because of that:**

- The north-up resting place stays, with its two switches, `?detent=` and `?pull=`.
- There is no *desk / free* switch and no `?turn=free`. There is only one turning.
- No shared script is touched. `scene.js` and `earth.js` are as they were.

## What was changed

`cw-deploys/experiments/time-lab.html`, and nothing else. The stamp is `2026-11-21 6dd344a · time-lab step 10c`.
`check-deploys` reports no error on the page. The console is clean. Sixteen pictures are in
`Time-Lab-Bench-10c-Nov21/`.

## Your two ideas for keeping north

Both are on when the page opens, so you meet them without looking for a switch. Each has a bench switch in the
Time view's *How this works*.

**The axis** (*the axis, in a drag*: on / off; `?axis=0`).

- While she drags the globe, a thin copper line runs through the poles and stands a little out of each (`02`).
- It is faint where it passes through the Earth. The end behind the Earth is hidden.
- A copper point marks the pole she can see. Looking straight down on a pole, the point is all there is (`03`).
- It comes once her finger has travelled 8 px, so a tap shows none. It fades in 0.4 s when she lets go.
- Not on the map.

**A drag favours one way** (*a drag favours one way*: off / light / firm; `?bias=off|light|firm`).

- The page reads her heading from the last 40 px of her finger's travel.
- *Light*: within 12° of level the globe turns east-west only. Within 12° of upright it tips only. Past 24° from
  both she is plainly steering both ways and the globe is free. Between 12° and 24° the lesser part comes in by
  degrees.
- *Firm*: 20° and 40°. A true diagonal is still free.
- The coasting after a flick keeps the favour it was let go with.
- One finger only. Two fingers carry the ground between them, as before.

**Measured at 1,024 × 768, the resting place switched off so the favour shows alone.** Each drag starts at
longitude 60°, on the equator unless said.

| The drag | Light | Off |
|---|---|---|
| Level, 200 px | 47° east-west, no tip | the same |
| 8° off level, 200 px across and 28 down | 47° east-west, **no tip** | 47° and a tip of 6.6° |
| 18° off level | 47° and a tip of 7.6° (the whole would be 15°) | |
| 30° off level | 47° and the whole tip, 27° | |
| 45° | both, whole | both, whole |
| 8° off upright | the tip only, no turn | |
| Level, at 70° N and at 70° S | 47° east-west, no tip | |

*Firm* holds the 18° drag level too. By finger events at iPad size the numbers are the same.

A flick 7° off level, let go at speed: the globe coasted from 14° W to 80° W and its tip stayed at 30.00°.

## How a drag feels near a pole

This is where a desk globe is at its worst, and it still is.

- **Tipped to 70°**, a sideways drag turns the Earth as far as it does at the equator, but the land in the middle
  of the picture moves a third as far across the screen and swings round the pole as it goes.
- **Looking straight down on a pole**, a sideways drag turns the whole picture like a wheel, 47° for 200 px. A drag
  up or down from there tips the pole away toward the top of the screen, whichever longitude is up.
- **Pushed past a pole**, the globe stops at the pole. It does not go over.
- **Two fingers near a pole** are worse. The scene holds the ground under her fingers, and near a pole a few
  pixels of ground is many degrees of longitude. A quarter twist with a 6 px wobble at 80° N spun the globe 77°.
  The axis never left the upright. This is `scene.js`'s, and I left it alone.

**What I did about it:** nothing to the turning. The axis shows her the pole as a point, so she can see what she is
turning about. The favouring drag makes a level drag a pure spin and an upright drag a pure tip, so she no longer
tips by accident on the way to a pole. A limit on the tilt short of the pole would cure most of it, and your prompt
says she may look straight down on either pole, so I did not add one.

**Two fingers twisted** turn nothing about the line of sight. At the equator an exact twist moved the view 0.15°.
A real twist wobbles, and the wobble drags the ground a little (10° in my test, where the fingers were off-centre),
as it did before this step.

## A tap on a city

With *Show cities* on, a tap on a city's point shows its name and turns the globe, in 0.6 s with an ease, to bring
that city to the middle. No zoom.

- Nairobi, tapped from 20° E: the globe went to 36.82° E, 1.29° S, and the point stood at the centre of the window
  (`05`). Riyadh the same, at 24.7° N (`06`).
- A second tap on it hides the name. A tap elsewhere hides the name. The globe stays.
- On the map a tap on a city shows its name and moves nothing (`08`). A tap elsewhere on the map hides the name,
  and the next tap goes to the globe.
- Under reduced motion the turn is a cut.

**One thing to know.** Bringing a city to the middle tips the globe to its latitude. A tap on Oslo leaves her
looking from 60° N. The resting place only stands the globe up from within 10°.

## Every arrival untilted

By your answer 2 of 21 Nov. "Upright" here is what it has meant since step 10: the equator across the middle.

- **The opening**: 99° E, no tilt, as in step 10b.
- ***Pick a time***: three picks from a globe tipped 40°, 50° and 60° each arrived with no tilt, the whole Earth in
  sight, at the place's longitude.
- **A tap on the map**: the globe comes back whole and untilted, turned to the longitude tapped (`09`). Before, it
  came back centred on the place and closed in to 3,000 km.

**Two things I added to make that true.**

- *Pick a time* now reads a deep event's place where its evidence lies today (`placeNow`), as the arrival does, and
  turns to that longitude as it was then. Before, it turned only for the records with a `place`, and left the
  globe as it was for the rest.
- An event with no place at all stands the globe up at the longitude she was looking at.

## The flat map in The World

Centred between the top of the window and the top of the line's ground (`07`, `31`, `42`).

| The window | Room above | Room below, to the ground | The map |
|---|---|---|---|
| 1,024 × 768 | 62 px | 62 px | 996 × 485 px |
| 768 × 1,024 | 252 px | 252 px | 740 × 360 px |

- The ground's top is where its fade begins, 32 px above the line itself.
- Before, at 1,024 × 768, the map had 141 px above it and its foot lay 17 px under the ground (worked out from
  the same sizes, not measured on the old page).
- In a window short and wide enough that the map would not fit above the line, the map is made smaller to fit.
- In Time the map is as it was.

The page does this by setting the flat map's camera after the Earth has fitted it. Taps, cities, coastlines and
markers all go through that camera and follow.

## The word of knowing

It has left the date line. It is a line of its own at the foot of an event's panel, 12 px, in the copper italic
(`01`):

| The event | The date line | The foot |
|---|---|---|
| First web page | 1990 (36 years ago) | *The Earth shown here: measured* |
| Eiffel Tower | 1889 (137 years ago) | *The Earth shown here: measured* |
| Lebombo bone | About 43 ka | *The Earth shown here: measured* |
| Chengjiang | About 518 Ma | *The Earth shown here: inferred* |

A period's panel has none. The store has no event at 40 ka; Lebombo, at 43 ka, is the nearest.

***More* is not under it.** *More* is the last word of the summary's own paragraph, as the house form has it, so
the line stands under the summary and under *More*. Giving *More* a line of its own below would change every
panel.

## Arriving

The lab looks first for an event labelled *First trilobites*, then for Chengjiang. The store has no *First
trilobites* today, so it arrived on Chengjiang. I could not check the first branch against a real record.

## How this works, in the Time view

Your words of 21 Nov, as written (`11`). The grey paragraphs are gone. The line that changes with the handle's year
is under them, and the bench switches under that: the five there were, and the two new ones.

**The second sentence, for each of the eight mosaics.** Read off the page on each:

1. **4.6 billion**: This mosaic shows all of it: 4.6 billion years, one tile for each million.
2. **Complex life**: This mosaic shows part of that time: 720 million years, one tile for each million.
3. **Humans**: This mosaic shows part of that time: a million years, one tile for each thousand.
4. **Civilization**: This mosaic shows part of that time: 12,026 years, one tile for each ten.
5. **Writing**: This mosaic shows part of that time: 5,326 years, one tile for each ten.
6. **Paper**: This mosaic shows part of that time: 2,226 years, one tile for each ten.
7. **Machines**: This mosaic shows part of that time: 306 years, one tile for each year.
8. **Computing**: This mosaic shows part of that time: 76 years, one tile for each year.

The years count themselves from this year. The words are two tables in the page (`WORDS.htwSpans`,
`WORDS.htwTiles`).

## What was checked

**At 1,024 × 768, by pointer.**

- The globe dragged left and right, up and down and on a slant, at the equator and at 70° N and S; tipped to each
  pole and pushed past it; two fingers twisted. The table above. The axis's lean was 0° after every one.
- The opening size came back after a scroll out to its limit.
- The opening, *Pick a time* three times, and a tap on the map: each untilted.
- A city tapped on the globe, then again, then empty ground; a city tapped on the map. Real clicks.
- A marker placed by a real click at 69 Ma with the seas showing, then the globe dragged: the marker rode with its
  ground (`04`).
- The map centred (`07`).
- The panel at 1990, 1889, 43 ka and 518 Ma.
- *How this works* on each of the eight mosaics.

**At 768 × 1,024, by finger events.** The same drags and the twist; a drag let go at 4.8° stood up (the resting
place); the city on the globe and on the map, the map centred, the tap on the map (`30`, `31`).

**Reduced motion** (`?motion=reduce`). The city comes to the middle by a cut. The axis comes and goes by a cut. The
resting place is a cut.

**The other two benches.** `earth-3d.html` and `ancient-seas.html` open and turn, consoles clean. No file they
load was changed.

**Safari on the iPad simulator** (iPadOS 18.2, real touches).

- The first screen, with the word on its own line (`40`).
- A finger dragged 200 pt across and 20 pt down: the globe turned east-west.
- *Show cities*, then a tap on a point: Beijing named and at the middle (`41`).
- *Map*: centred, 489 above and 492 below in the picture's own pixels. A tap on a point: Zhapu named, nothing moved (`42`).
- Two taps on the sea: the name gone, then the globe, whole and untilted (`43`).

## Not tried

- An iPad, and Safari on the Mac.
- **How either idea feels.** The pane runs no frames under a script and the simulator draws about 14 a second. I
  measured where the globe ended. I did not feel it.
- The axis in the simulator. A picture cannot be taken while a finger is down.
- An arrival on a real *First trilobites* record.
- The sound, and *Full screen*.

## Needs Michael's eye

1. **The two ideas, on the iPad.** Does the favouring drag feel like help or like the globe refusing her? *Light*
   and *firm* are my first guesses at the angles.
2. **The axis's look** (`02`, `03`). Copper, 1.5 px, faint through the Earth. It does not say which end is north.
   On a stand north is always the upper end, but looking down on a pole there is only a point. A small *N* would
   say it.
3. **Both are on by default.** If you would rather the page opened as step 10b did, it is one line each
   (`LOOK.turn.axis`, `LOOK.turn.bias`).
4. **The pole itself.** It is as bad as it was. If you want it cured, the plain cure is to stop the tilt short of
   the pole, at 70° or so. That costs her the view straight down.
5. **A tap on a city tips the globe.** It has to, to bring a northern city to the middle. Is that what "select"
   should do?
6. **A tap on the map now gives the whole Earth at that longitude** (`09`), not the place close in. Tapping
   Australia shows Australia half under the line. Your answer 2 asked for upright; say if you meant upright and
   still close in on the place.
7. ***Pick a time* and the deep events.** It now turns to where a deep event's evidence lay. That is new.
8. ***More* and the word of knowing.** The word is under *More*, not above it. See above.
9. **The eight sentences.** *One tile for each ten* is the form's own; *one tile for every ten years* is plainer.
10. **The Time view's *How this works* is taller than the window**: 873 px at 1,024 × 768, and it opens low, by the
    mosaic, so she must drag it up to read it. It was tall before; I did not measure the old one. Two bench
    switches were added.
11. **Two fingers near a pole** spin the globe hard. A change to `scene.js` would mend it, for the Earth bench too.
12. **The chat's two defaults** are built as written: on the map a city's tap moves nothing; the word of knowing
    is at the foot of the panel's first view.

## Not in this step

The seas; the flags as arrows, the end of *focus*, Measure, *select* and *unselect*; *play* and the Green Sahara;
a panel for the Time view; the words of How This Works in The World; period Mores; pictures; the 13.8 billion
years; the front door; the swap.

## The files in `Time-Lab-Bench-10c-Nov21/`

**At 1,024 × 768.**

- `01`: the first screen, the word of knowing at the foot of the panel.
- `02`: the axis in a drag, 69 Ma, tipped 40°. `03`: looking down on the north pole, the point alone.
- `04`: a marker and the seas at 69 Ma, after a drag (the axis still fading: the pane runs few frames).
- `05`: Nairobi tapped. `06`: Riyadh tapped.
- `07`: the map centred. `08`: Delhi tapped on the map. `09`: after a tap on Australia on the map.
- `11`: *How this works* in Time, on Complex life, with the bench switches (the panel moved up for the picture).

**At iPad size.** `30`: the first screen. `31`: the map centred, Delhi named.

**The iPad simulator, Safari.** `40`: the first screen. `41`: Beijing tapped. `42`: the map, Zhapu named. `43`:
after a tap on the map.
