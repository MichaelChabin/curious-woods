---
status: Report, 21 Nov 2026. Step 10d of the Time lab bench, built on `47481163` (step 10c, committed 21 Nov on Michael's word, "Commit 10c, start 10d"; not pushed). Checked in the pane at 1,024 × 768 and 768 × 1,024, by pointer and by finger events, and once in Safari on the iPad simulator by real taps and swipes. Reported first, as the prompt asks; COMMITTED on Michael's word, "Commit 10d, start 11", 21 Nov, this session's lines only; not pushed.
role: What step 10d did to `experiments/time-lab.html`, the periods of the tree as built with their spans and colours, what the check found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-10d-02.md (Michael's prompt, as it arrived), Report-Time-Lab-Bench-10c.md (the page as it stood), Periods-Deep.md and Periods-Deep-01.md to -03.md, stories/deep-time-periods.json (names, spans, summaries, Mores), stories/deep-time.json (the tree's shape and the Time Machine's colours)
updated: 2026-11-21
---

# Report: the Time lab bench, step 10d (21 Nov 2026)

![[Time-Lab-Bench-10d-Nov21/13-complex-life-the-tree.jpg]]

*Complex life with the tree on: fifteen periods.*

## Before I started

Step 10c was not committed when the prompt arrived. I stopped and said so. You answered "Commit 10c, start 10d".
Step 10c is committed as `47481163`, this session's lines only, and not pushed.

## What was changed

`cw-deploys/experiments/time-lab.html`, and nothing else. No shared script is touched. The stamp is
`2026-11-21 4748116 · time-lab step 10d`. `check-deploys` reports no error on the page. The console is clean.
Twenty-four pictures are in `Time-Lab-Bench-10d-Nov21/`.

The page now also reads `stories/deep-time.json`, the Time Machine's own file, for the tree's shape and colours.

## The tilt stops at 70°

The limit could be set from the page. The scene turns the globe as it always has, and the page takes back whatever
went past the limit, in every move of a finger and in every frame. `scene.js` needs nothing.

- Pushed past 70° north or south, the globe stops there (`01`). Pushed again, it stays.
- The bench switch is in the Time view's *How this works*: *the tilt stops at* 60° / 70° / 80° / the pole (`20`).
  `?tilt=60`, `?tilt=80`, `?tilt=pole` set it from the address.
- Lowering the limit while the globe is tipped past it brings the globe back to the limit at once.
- The axis, the favouring drag and the resting place are as step 10c left them.

**A tap on a city beyond 70°.** No city on the globe lies beyond 70° today. At 120 Ma Melbourne's ground lay at
74° S. I tapped it there, from 45° S: the globe went to its longitude and stopped at 70° S, and Melbourne stood
32 px below the centre of the window (`03`).

### A sideways drag at 70°, against the same drag at the pole

In The World at 1,024 × 768 the ball is 377 px in radius. A 200 px sideways drag turned the Earth 46.9° at every
tilt I tried: the equator, 60°, 70°, 80° and the pole. What differs is what she sees. These distances are worked
out from the turn and the ball's size, not measured on the screen.

| Tipped to | The land at the middle of the picture moves | The pole stands |
|---|---|---|
| the equator | 275 px straight across | on the rim |
| 60° | 138 px across, 52 px off the level | 189 px above the middle |
| 70° | 94 px across, 38 px off the level | 129 px above the middle |
| 80° | 48 px across, 20 px off the level | 65 px above the middle |
| the pole (step 10c) | nothing; the whole picture turns 46.9° like a wheel | at the middle |

At 70° the land under her finger still goes the way her finger goes, a third as far, on a shallow curve. The
picture swings about a point a third of the way up from the middle. At the pole nothing under her finger moves
her way at all.

## A tap on the map

A tap on the flat map brings back the globe with the place she tapped at the middle: turned to its longitude,
tipped to its latitude within the limit, the whole Earth in sight, no zoom. *Pick a time* and the opening are
untilted, as in step 10c.

| Tapped | The place | The globe after |
|---|---|---|
| Australia (`04`) | 130.1° E, 23.4° S | 130.2° E, 23.3° S |
| Greenland (`05`) | 41.6° W, 71.6° N | 41.8° W, 70° N: 1.6° short, at the limit |
| The equator, in Africa (`06`) | 27.8° E, 0.3° N | 27.8° E, 0.4° N |

The size after each was the opening size. The tap turns the globe by a cut, as step 10c's did.

## The tree of periods, behind a switch

The switch is *the periods*: the lab's / the tree, under the tilt's switch (`20`). `?periods=tree` opens the page
with the tree on. The page opens on the lab's, as before. Nothing of the lab's own periods is removed.

Four pictures, at 1,024 × 768:

| | The lab's | The tree |
|---|---|---|
| The 4.6 billion | `10` | `11` |
| Complex life | `12` | `13` |

### The periods as built

Names, spans, lengths, summaries and Mores are from `stories/deep-time-periods.json`. **The store agrees with
both of your tables**, name for name and year for year. The colours are the Time Machine's, from
`stories/deep-time.json`, except the three marked.

**The 4.6 billion: eight.**

| Period | Span | Tiles | Colour | |
|---|---|---|---|---|
| Molten | 4,600 to 4,000 Ma | 600 | `#a83018` | red |
| Oceans | 4,000 to 2,500 Ma | 1,500 | `#1a4a9a` | deep blue |
| Oxygen | 2,500 to 1,800 Ma | 700 | `#c8780a` | amber |
| Big cells | 1,800 to 720 Ma | 1,080 | `#8a8a7a` | grey |
| Soft bodies | 720 to 539 Ma | 181 | `#2a8a8a` | teal |
| Trilobites | 539 to 252 Ma | 287 | `#4a8ab0` | light blue |
| Dinosaurs | 252 to 66 Ma | 186 | `#1a6a2a` | dark green |
| Mammals | 66 Ma to now | 66 | `#c8b878` | sand |

*Animals* is not shown.

**Complex life: fifteen.**

| Period | Span | Tiles | Colour | |
|---|---|---|---|---|
| Soft bodies | 720 to 539 Ma | 181 | `#2a8a8a` | teal |
| Shells | 539 to 487 Ma | 52 | `#d4a878` | tan |
| Crowded seas | 487 to 444 Ma | 43 | `#1a4a9a` | deep blue |
| Green land | 444 to 419 Ma | 25 | `#4a8a30` | green |
| Fish | 419 to 359 Ma | 60 | `#4a8ab0` | light blue |
| Coal forests | 359 to 299 Ma | 60 | `#8a6018` | brown |
| One continent | 299 to 252 Ma | 47 | `#c86820` | orange |
| First dinosaurs | 252 to 201 Ma | 51 | `#6e4a7e` | plum: **changed** |
| Giants | 201 to 143 Ma | 58 | `#1a6a2a` | dark green |
| Flowers | 143 to 66 Ma | 77 | `#c84878` | pink |
| Recovery | 66 to 56 Ma | 10 | `#8a8a7a` | grey |
| Heat | 56 to 34 Ma | 22 | `#a83018` | red: **changed** |
| Cooling | 34 to 23 Ma | 11 | `#3b4f7a` | slate blue: **changed** |
| Grass | 23 to 5.3 Ma | 18 | `#c8a800` | yellow |
| Ice | 5.3 Ma to now | 5 | `#c2d4bc` | pale green-grey |

### The colours, and where they came from

The Time Machine gives every period a colour, so I started from those. On the 4.6 billion all eight are the Time
Machine's, unchanged.

On Complex life three had to change. The Time Machine never sets these fifteen in one row: each group of leaves
has a line of its own, so it could use a colour twice.

- **First dinosaurs** was amber (`#c8780a`), beside One continent's orange (`#c86820`). Two neighbours alike. Now
  plum (`#6e4a7e`), near the lab's own Printing colour.
- **Heat** was the same orange as One continent. Now the Time Machine's Molten red.
- **Cooling** was the same light blue as Fish. Now the lab's Iron slate.

All fifteen are now different, and no two neighbours are alike. The tiles are shaded as the lab shades every
period: a gentle run of lightness along the period and a small wander from tile to tile.

### The edge at 5.3 Ma

A tile is a million years, and a tile takes the period its middle year falls in. The tile for 6 to 5 Ma has its
middle at 5.5, so it is Grass. Grass has 18 tiles and Ice has 5.

The period keeps its true span everywhere else. Grass's panel says *23 to 5.3 Ma*, and *select* on Grass gives a
line from 23 to 5.3 Ma (`18`).

### What a period carries

- **Its panel** (`14`, `15`): the Time Machine's name, its span, its length, and its summary whole. *More* is the
  last word, as on an event.
- **Its length** is the store's own words. So Soft bodies says *180 million years* where the lab's sum would say
  181, Trilobites *290* for 287, and Big cells *1.1 billion years* for 1,080 million.
- **Every summary fits.** They run 29 to 40 words. The panel was 170 to 210 px tall for the twenty-three. None
  was clipped. There is nothing to list.
- **Its More** (`16`), built as Dinosaurs' has been since step 10: the name, the official name, the span, the
  paragraphs with their pictures, *Known from*, the references. All twenty-three opened.
- **The summaries' italics.** Two summaries carry a name in asterisks (*Archaeopteryx* in Giants,
  *Tyrannosaurus* in Flowers). The panel sets them in italics, as an event's summary is set (`30`).
- **The small name above an event's panel** follows the switch (`19`):

| The event | On Complex life | On the 4.6 billion |
|---|---|---|
| Tiktaalik, 375 Ma | Fish | Trilobites |
| First trilobites, 521 Ma | Shells | Trilobites |
| The asteroid, 66.04 Ma | Flowers | Dinosaurs |
| Grasslands, 22 Ma | Grass | Mammals |
| Snowball one, 717 Ma | Soft bodies | Soft bodies |
| Homo sapiens, 315 ka | Fire | Fire |

  A tap on the small name shows that period's panel.
- ***select***, the lift of a period's tiles, and a drag across the tiles work as before. *select* on Dinosaurs on
  the 4.6 billion gathered 252 to 66 Ma (`17`). *select* on Grass on Complex life gathered 23 to 5.3 Ma (`18`).
  A drag across tiles marked 420 to 299 Ma and chose no period.

### Humans, Civilization and the rest

Unchanged. I compared every tile's colour and period on the six other mosaics with the switch on and off. They
are the same.

### The switch thrown back

The lab's own periods, whole: fourteen on the 4.6 billion, Complex life cut from it again, Dinosaurs' More as
before, and *Life on land* above Tiktaalik's panel.

Throwing the switch closes a period's panel, clears a mark, and puts back a gathered line. It has to: they belong
to the periods that have just gone.

## What was checked

**At 1,024 × 768, by pointer.**

- The globe tipped to 70° north and south and pushed past; a sideways drag there; each of the four settings.
- Melbourne tapped at 120 Ma, by a real click.
- The map tapped on Australia, Greenland and the equator, by real clicks.
- The 4.6 billion and Complex life, each with the lab's periods and with the tree.
- The switch thrown by a real click in *How this works*.
- A tap on each of the eight and each of the fifteen: its panel, its fit, its More.
- A real click on a Dinosaurs tile, on its *More*, on a Grass tile, and on *select*.
- An event's panel on each mosaic, six events.
- The other six mosaics, the same either way. The switch thrown back.

**At 768 × 1,024, by finger events.** The globe pushed past 70° both ways and at each setting; the sideways drag
(46.9°, the same); the map tapped on Australia, Greenland and the equator (`32`); a period tapped on each mosaic
(`30`, `31`); a drag across tiles; *select* on Flowers and on Oxygen.

**Reduced motion** (`?motion=reduce`). The city beyond 70° comes to the limit by a cut. *select* is a cut. The
map tap and the switch work the same.

**Safari on the iPad simulator** (iPadOS 18.2, real taps and swipes), with `?periods=tree`.

- Complex life with the tree (`40`).
- A tap on a Fish tile: its panel (`41`). A tap on *More*: Fish's More (`42`). A tap on *close*.
- A finger dragged down the globe three times: it stopped at 70° north and stayed (`43`, the axis still fading).
- *Map*, then a tap on Australia: the globe, Australia at the middle (`44`).

## Seen once, and not explained

In the simulator's first load, after I closed Fish's More and swiped twice down the globe, the Earth was gone
and so were *Map*, *Show coastlines* and *Place markers*. The page looked as it does when the 3D view has not
started. I loaded the page again and made the same swipes, and one longer: the Earth stayed and stopped at 70°.
I could not make it happen again. It may be Safari's pull to reload and a simulator that will not start a second
3D view, but I did not find the cause.

## Not tried

- An iPad, and Safari on the Mac.
- **How the limit feels.** The pane runs no frames under a script. I measured where the globe ended.
- **The move between the 4.6 billion and Complex life with the tree on.** With the lab's periods a tile keeps
  its colour as it travels. With the tree on, a Trilobites tile is light blue on one mosaic and one of six
  colours on the other, so it must change colour on the way. I did not see how that looks.
- Two fingers at the limit, by real fingers.
- The sound, and *Full screen*.

## Needs Michael's eye

1. **The fifteen colours** (`13`, `30`, `40`). This is the part you asked to see. Coal forests' brown and One
   continent's orange are the nearest pair of neighbours; both are the Time Machine's own. Recovery is ten tiles
   of grey and reads as a thin stripe.
2. **The three colours I changed.** If the lab keeps the tree, should the Time Machine take the same three, so a
   period has one colour everywhere?
3. **The eight on the 4.6 billion** (`11`). Soft bodies' teal and Trilobites' light blue are neighbours and
   close. Both are the Time Machine's.
4. **The same period, two colours.** Trilobites is light blue on the 4.6 billion; on Complex life that span is
   six other colours, and light blue is Fish. Dinosaurs is dark green, and so is Giants. The Time Machine does
   the same.
5. **The move between the two mosaics**, on the iPad, with the tree on. See *Not tried*.
6. **The first 33 tiles.** The lab's own periods begin with *Before the Sun*, a dark grey. The tree begins at
   4,600 Ma with Molten, so those tiles are red.
7. **Two lengths for Grass.** Its panel says *18 million years*, the store's word. Gathered, the line says
   *17.7 million years*, the lab's sum. The store has "18 million years (17.7)"; I left the parenthesis out.
8. **Events of the last million years** keep the lab's Humans periods above their panels (*Fire* for Homo
   sapiens), on both mosaics, tree or not. Your prompt left Humans unchanged, so I left this.
9. **The tilt at 70°**, on the iPad, and the other three settings.
10. **The map tap near a pole.** A tap on northern Greenland lands 1.6° short. A tap on Antarctica would land up
    to 20° short.
11. ***How this works* in the Time view is now 962 px tall** at 1,024 × 768, with two more switches. It was 873.
    The two new switches are near its foot, so on a wide window the panel must be dragged up to reach them. On
    an upright iPad it fits. `?tilt=` and `?periods=tree` reach both without it.

## Not in this step

A coarse period opening into its finer ones on *select* (step 11); your answers to step 10c's other points; the
seas; the flags as arrows, the end of *focus*, *Measure*, *select* and *unselect*; *play* and the Green Sahara;
Mores for Humans and Civilization; a panel for the Time view; pictures; the 13.8 billion years; the front door;
the swap.

## The files in `Time-Lab-Bench-10d-Nov21/`

**At 1,024 × 768.**

- `01`: tipped to 70° north and pushed past.
- `03`: Melbourne tapped at 120 Ma, 74° S: the globe at 70° S.
- `04`, `05`, `06`: after a tap on the map on Australia, on Greenland, on the equator.
- `10`, `11`: the 4.6 billion, the lab's periods and the tree. `12`, `13`: Complex life, the same.
- `14`: Dinosaurs' panel on the 4.6 billion. `15`: Grass's panel on Complex life. `16`: Dinosaurs' More.
- `17`: *select* on Dinosaurs. `18`: *select* on Grass.
- `19`: Tiktaalik's panel on Complex life, *Fish* above it.
- `20`: *How this works* with the two new switches (the panel moved up for the picture).

**At iPad size.** `30`: Complex life with the tree, Flowers' panel. `31`: the 4.6 billion with the tree. `32`:
after a tap on the map on the equator.

**The iPad simulator, Safari.** `40`: Complex life with the tree. `41`: Fish's panel. `42`: Fish's More. `43`:
pushed past 70° north. `44`: after a tap on Australia on the map.
