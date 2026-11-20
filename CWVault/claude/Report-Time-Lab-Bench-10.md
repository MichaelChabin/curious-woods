---
status: Report, 20 Nov 2026. Step 10 of the Time lab bench, built on `82ebccd4` (step 9, committed and pushed). Checked in the pane at 1,024 × 768 and 768 × 1,024, by pointer and by finger events, and once in Safari on the iPad simulator. Reported first, as the prompt asks. Committed on Michael's word, "Commit the working tree changes with a sensible message", 20 Nov; not pushed.
role: What step 10 did to `experiments/time-lab.html`, what the check found, the worklist of twenty-five periods for the Mores batch, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-10.md (Michael's prompt, saved as it arrived), Report-Time-Lab-Bench-09.md (the page as it stood), Worknote-Focus-View-02.md, Ruling-Dates-01.md
---

# Report: the Time lab bench, step 10 — Michael's answers to step 9 (20 Nov 2026)

Everything in the prompt is built, and everything on its check list was checked. Four things could not be judged
by me and are yours: how the two resting places feel under a finger, how the fade feels, whether six seconds of
building is long, and how the changes of size and ground look in motion. The pane runs no frames, so I saw where
each ended and not how it travelled.

The stamp is `2026-11-20 82ebccd · time-lab step 10`. `check-deploys` reports no error on the page. The console
is clean in a fresh tab. Twenty-seven pictures are in `Time-Lab-Bench-10-Nov20/`, named below by number.

**What was changed.** `cw-deploys/experiments/time-lab.html`, and nothing else. No shared script was touched,
including for the ice.

## The ice: why, and what changed

**Why.** The lab was never showing the satellite picture. The Earth's script has two grounds: the photograph, and
the older height-tinted map. It starts on the tinted map unless a page asks for the photograph. The Earth bench has
asked since its step 6c. The Time lab never did, though its credit has named the photograph since step 1.

- The tinted map paints high ground pale. That is the "ice" on the Himalaya and Tibet.
- The tinted map knows no ice. Greenland showed as grey high ground, and Antarctica bare.
- The ice layer was not at fault. Its file holds only ice that was there once and is not there today, so at today
  it is rightly empty.

**What I changed.** One line: the page asks the Earth for the photograph. `?ground=old` shows the tinted map again,
for a check.

**What that changes besides the ice.** The whole look of the Earth from today back to about 2.6 million years: it is
now the photograph, as on the Earth bench. Older than that it is paint, as before.

**Seen:**

- Today from above Greenland: the ice sheet is white, and so are the Canadian Arctic islands (`11`).
- Today from above Antarctica: white, whole (`12`).
- Today over the Himalaya: a thin white line along the high range and the Karakoram, and Tibet brown (`13`). That
  white is real. It is the photograph's own snow, from July 2004.
- 20,700 years, from the north: the great sheets over North America and Scandinavia, Greenland white under them,
  the shelves bared (`14`). The Earth's own readout: the 20,500 and 21,000 outlines at 0.6 and 0.4, the sea 119.5 m
  down.

## Open on Complex life

The lab opens on Complex life at every size (`01`, `30`, `40`). The 4.6 billion is still first under *Select
years*. `?w=0` opens on it for a check.

**The Earth's size.** One size on the seven one-row spans; smaller on the 4.6 billion only.

| Window | On the seven spans | On the 4.6 billion |
|---|---|---|
| 1,024 × 768 | **507 px** (step 9: 228). The line, both flags, the handle and all four rows of names are in sight; the names end 25 px above the foot | **228 px**, as in step 9. The line, flags, handle and names are in sight (`02`) |
| 768 × 1,024 in the pane | **521 px**. Everything in sight, with 270 px to spare under the names | **160 px**, the least. The mosaic's foot is 76 px under the fold, the line 122 px, the names' foot 193 px (`31`) |
| iPad simulator, Safari (820 pt wide) | about **588 pt** (`40`) | 160 pt; the same falls under the fold (`45`) |

- At 1,024 the size is set by the height: the Earth takes all the room the line leaves.
- At iPad size it is set by the width of its box, less 8 px each side for the haze round the ball. The pane's
  scrollbar takes 15 px more, so a real iPad should show about 536 px where the pane shows 521.
- The Earth's box is the whole column again. The 96 px inset on each side was there for *Reset* and *Align North*.
- **On the 4.6 billion at iPad size the Earth now goes to its least, 160 px.** Step 9 kept it large there, on the
  ground that no size brought the line into sight. I read "shrinks as far as it must" as overruling that. It brings
  361 px more of the mosaic into sight than the large Earth would.
- The change of size between the 4.6 billion and the others is eased over 400 ms, and is a cut under reduced
  motion. I could not watch it.

## Two resting places, in place of Reset and Align North

*Reset* and *Align North* are gone, with their words, their code and the inset they stood in.

**North up.** When she lets go of the globe within 10° of upright, it eases the rest of the way. While she drags
inside 10°, it pulls a little toward upright: a move away is cut by up to a third, a move toward is helped by as
much, most at upright and nothing at 10°. Nothing is said.

**The opening size.** Pinched or scrolled out past the size the Earth opened at, it eases back once her fingers
are off and the wheel has been still for a fifth of a second. Zooming in is free.

**The opening views** are upright, each at its own longitude.

**The bench switches** are in *How this works*, under the others: *north up, within* off / 5° / 10° / 15° / 20°,
and *its pull in a drag* none / light / firm. `?detent=` and `?pull=` set either from the address. *How this
works* opens only in Time; what you set there holds in The World.

**Checked.** The pane runs no frames, so the ease was run by hand, 16 ms a step:

| Let go at | What happened |
|---|---|
| 5° | upright in 0.53 s |
| 10° | upright in 0.58 s |
| 20° | stayed at 20° |
| a real 25 px drag by pointer (6.2°) | upright |
| a real 120 px drag by pointer (36°) | stayed |
| zoomed out to 1.6 times the opening distance | back to the opening size in 0.62 s |
| zoomed in | stayed |

By finger events at iPad size, in The World: let go at 3.4° and at 7.6°, upright; at 18.5°, stayed. The same
40 px drag ended at 7.6° with the pull and 9.4° without. A tap armed nothing. A two-finger pinch out came back to
the opening size in 0.66 s; a pinch in stayed.

In Safari on the simulator, by real touch paths: a 40 pt drag was upright again in the next picture; a 100 pt drag
(about 22°) stayed (`42`); after a two-finger pinch out the Earth was at its opening size two seconds later.

**What it does not do:**

- It leaves the globe's spin alone, so a sideways flick still coasts. A hard flick up or down inside the 10° holds
  the globe a degree or two off upright until the coasting dies, then it settles.
- Only her own drag sets it off. A globe turned for her stays as turned: *Pick a time* facing a place, and a tap on
  the map, which lands on the globe centred where she tapped. It rests upright the next time she drags and lets go
  near upright.

## The World, dark

The World's ground is near-black, `#0c0a08`, the house's black (`03`, `04`, `32`, `41`).

- The Earth sits in the dark, lit as before. Its blue haze reads as a thin rim.
- The ground under the timeline is the same dark at 0.72, fading in over 26 px, so the foot of the Earth dims
  under the line.
- The line, the flags' years, the span, the handle's year and the events' names are in parchment. The flags, the
  handle, the span's line and the word of knowing are in a pale copper.
- The panel and the More keep their parchment (`06`, `43`).
- Time keeps its parchment. The move fades the ground from one to the other, and the Earth's own surround with it.
  Words change from ink to parchment at the move's middle, when the ground is mid-grey. I could not watch it.
- In Safari the browser's own bars take a grey tint over the dark page (`41`).

**The words.** Upper left: *Time*, and *back* after *Pick a time*. Upper right, smaller and at half strength:
*Map* / *Globe*, then *Full screen*. Each keeps a little dark under it, for when she zooms in and the Earth is
behind it.

- *Map* and *Globe* by real clicks from The World: the flat world on the dark ground, ice at both ends, and back
  (`05`).
- ***Full screen* from The World could not be tried.** The pane refuses full screen. On a touch device the word is
  **not there**: full screen on an iPad is the full page (step 7), and The World is the full page already, so the
  word would change nothing she could see. On the Mac it is there.

**The fade** is on by default for these words: four quiet seconds and they go; a touch, a move of the pointer, the
wheel or a key brings them back. The handle's year, the line, the flags' years and the events' names stay.
`?fade=1` fades the line's words too, as step 9's switch did. `?fade=0` fades nothing.

**How it feels, as far as I can say.** With a pointer it is easy: moving the pointer wakes the words before the
click arrives. With a finger there is a cost. Step 9's rule is that a faded word takes no tap, so the first tap
only wakes the words and the second acts. In Safari it took two taps on *Time* to leave The World. If that is
wrong, the other way is for a faded word to act at the first tap.

## Cities as points

With *Show cities* on, each place is one vermilion point, 2.5 px in radius, ringed in parchment, with no name
(`07`, `33`). There are 55: the stories' 46 places and the Earth's own cities not within 25 km of one. This is the
list the Earth drew with names before.

- A tap within 14 px of a point shows its name beside it, in the ink on a parchment halo. A tap on it again hides
  it. A tap on another point moves the name there. A tap on empty ground hides it.
- Checked by real clicks in The World: Nairobi, then Riyadh, then empty sea; and Riyadh twice.
- Checked by real clicks on the map: Nairobi named (`08`), then empty sea, which hid the name and left the map up.
- The points ride their plates as the coastlines and markers do, and fade by the cities' own rule.

**Two things changed with it:**

- A tap on a city on the globe used to glide to it and zoom in a step. That was the Earth's own tap on a named
  place, and the Earth's named places are now off. A tap on a point only shows its name.
- On the map, a tap on empty ground still goes back to the globe centred there, as before. While a name is
  showing, that tap only hides the name.

## Dinosaurs' More, and the worklist

*Dinosaurs* (252 to 66 Ma) has the Time Machine's More, on the 4.6 billion and on Complex life (`09`, `10`). It is
built as the Time Machine builds it: the official name, the span, eight paragraphs with their two pictures, *Known
from*, four references. The panel's own words are still the lab's.

The page now reads `stories/deep-time-periods.json` and lends a More to any period of its own with the same name
and the same span. Only Dinosaurs matches. A More written later for a matching name and span would appear with no
change to the page.

**The other twenty-five, for the pool batch.** Dates as the page writes them. The span is the mosaic whose table
holds the period; the mosaics cut from it show the same periods (Complex life the 4.6 billion's last six, and
Writing, Paper, Machines and Computing those of Civilization that reach them).

| Span | Period | Dates | Present words | Words |
|---|---|---|---|---|
| 4.6 billion | Before the Sun | 4.6 to 4.567 Ga | A cloud of gas and dust, slowly gathering. The Sun has not yet lit up. | 15 |
| 4.6 billion | Formation | 4.567 to 4.4 Ga | The solar system comes together. Something the size of Mars hits the young Earth, and the Moon forms from the splash. | 21 |
| 4.6 billion | First seas | 4.4 to 3.9 Ga | Small, dark, volcanic continents under constant rain that fills the seas. | 11 |
| 4.6 billion | Early life | 3.9 to 2.45 Ga | Microscopic life, perhaps under a hazy orange sky. The air has no oxygen. | 13 |
| 4.6 billion | Early oxygen | 2.45 to 2.2 Ga | Bacteria begin to release oxygen. It probably destroyed the methane that kept the Earth warm, and ice spread almost to the equator. | 22 |
| 4.6 billion | Rust | 2.2 to 1.8 Ga | Oxygen builds up and turns an ocean full of iron to rust. | 12 |
| 4.6 billion | Two parents | 1.8 Ga to 720 Ma | Some cells need two parents, others form colonies, while continents grow larger. | 12 |
| 4.6 billion | Ice to the equator | 720 to 635 Ma | Ice reaches the equator, twice. The first animals may date from these frozen years. | 14 |
| 4.6 billion | Visible life | 635 to 539 Ma | The first living things big enough to see. | 8 |
| 4.6 billion | Eyes and shells | 539 to 470 Ma | Animals with eyes and shells fill the seas. | 8 |
| 4.6 billion | Life on land | 470 to 252 Ma | Plants and animals come to land. | 6 |
| 4.6 billion | Mammals | 66 to 3 Ma | After the asteroid, mammals spread everywhere, and grass covers the plains. | 11 |
| 4.6 billion | Ice ages | 3 Ma to now | Ice sheets come and go. Everyone who has ever lived is in the last tile. | 15 |
| Humans | Hand axes | 1 Ma to 600 ka | Stone tools shaped on both faces, made the same way, by the same kind of hands, for hundreds of thousands of years. *(placeholder)* | 22 |
| Humans | Fire | 600 to 300 ka | Hearths, charred bone and burnt flint: fire kept and used, not only found after a lightning strike. *(placeholder)* | 17 |
| Humans | Neanderthals | 300 to 50 ka | Neanderthals across Europe and western Asia, and in Africa the first people of our own kind. *(placeholder)* | 16 |
| Humans | Painted caves | 50 to 12 ka | Paintings on cave walls, carved figures, needles, boats. People reach Australia and the Americas; the last ice age ends. *(placeholder)* | 19 |
| Civilization | Farms | 10,000 to 4000 BCE | The ice is gone and the world is warming. People who followed the herds begin to keep plants and animals, and villages grow up around the fields. | 27 |
| Civilization | Cities | 4000 to 3200 BCE | In the river valleys, villages grow into cities: walls, temples, streets, and thousands of people who have never met one another. | 21 |
| Civilization | Writing | 3200 to 1200 BCE | Marks pressed into clay keep count of grain and sheep. Then they keep names, then laws, then stories. Bronze is the metal of the age, and the pyramids go up. | 30 |
| Civilization | Iron | 1200 BCE to 1 CE | Iron ore is common everywhere, so tools and weapons are cheap for the first time. Empires grow large, and in Greece, India and China people begin writing down how to think. | 31 |
| Civilization | Paper | 1 CE to 1400 | Paper, first made in China, slowly carries words across the whole world. Empires rise and fall; cathedrals and mosques go up; the plague crosses continents. | 25 |
| Civilization | Printing | 1400 to 1780 | A press makes the same page a thousand times, so books become cheap and ideas travel fast. Ships cross the oceans, and telescopes are pointed at the sky. | 28 |
| Civilization | Machines | 1780 to 1880 | Steam engines do the work of horses. Railways, factories, photographs, and more people living in cities than ever before. | 19 |
| Civilization | Electricity | 1880 to now | Light, voices and pictures travel along wires, then without them. Cars, aeroplanes, rockets, computers, and you. | 16 |

For the batch to know: the Time Machine's file has thirty periods of its own, and three share a name or a span
with one of these without matching both. *Mammals* there is 66 Ma to now, here 66 to 3 Ma. *Hand axes* there is
2.6 to 1 Ma, here 1 Ma to 600 ka. *Trilobites* there, 539 to 252 Ma, covers this page's *Eyes and shells* and
*Life on land* together.

## How this works

Two sentences are cut: "Tap a period on the mosaic and its story appears above." and "The Earth above shows the
world at the year under the handle." Nothing else in it is changed. Two things that follow are under *Needs
Michael's eye*.

## The year on the handle

The handle now writes the calendar year the date falls in.

| Event | The store's year | Step 9 | Now |
|---|---|---|---|
| Guest star, 4 July 1054 | 1054.5 | 1055 | **1054** |
| Krakatoa, 27 August 1883 | 1883.65 | 1884 | **1883** |
| Suez Canal, 17 November 1869 | 1869.88 | 1870 | **1869** |
| Moon landing, 20 July 1969 | 1969.55 | 1970 | **1969** |
| Last smallpox, 26 October 1977 | 1977.82 | 1978 | **1977** |
| Andromeda, 6 October 1923 | 1923.76 | 1924 | **1923** |

The other six events dated inside a year were already right, and still are: Tunguska 1908, Huaynaputina 1600,
Ramanujan's letter 1913, Chile earthquake 1960, Assyrian eclipse 763 BCE, Eclipse battle 585 BCE. The step 9
report's table gave the Suez Canal as 1870; that was this fault.

**Where the page rounded a year this way:**

1. **`agoWord`**, the one function that writes a year counting back from now. Fixed there. It serves the handle,
   the flags' exact ends, the small label a pointer raises over an event's mark, the date of an event whose summary
   opens on no date, and the bench readout.
2. **`agoParen`**, the years ago in parentheses for a record with no More date line. It took the store's year as it
   came, so a date inside a year would have written "971.5 years ago". No record today reaches it with such a year.
   Fixed all the same.
3. **`calendarWord`** still rounds. It is only ever handed whole years, so I left it.

Years the page rounds on purpose are untouched: the handle under her finger, to the pixel's step; a period's round
edge (4000 BCE, 1400, 1780).

**Outside the page, and not touched:** `js/deep-time.js` rounds the same way in one place (`storeYear`). I did not
look at what the Time Machine shows for these six.

## Building the 4.6 billion (`?build=1`)

Off unless the address asks. The first time in a visit she goes from a smaller span to the 4.6 billion:

1. **0.4 s.** Room opens above the mosaic she was on, and that mosaic keeps its place over the timeline.
2. **4.7 s.** The older tiles land above it in their own places, from the tile just older than her mosaic back to
   the first. The newest landed are lit for a frame. A year count runs back beside the row being laid, where that
   row's own year will stand: *847 Ma*, *1.118 Ga*, *4.126 Ga*, *4.6 Ga* (`15`, `16`).
3. **0.9 s.** Her mosaic's own tiles fold into the places that hold their years, the came comes, and the count
   gives way to the rows' years (`17`). From Complex life that is 720 tiles, tile for tile. From Humans or any
   shorter span, every tile folds into the one last tile.

Six seconds in all. A tap or a key finishes it at once: a real click ended it in 31 ms and marked nothing. The
second time it is step 7's move. From a gathered line it is step 7's move. Under reduced motion it is a cut. It
asks the move's sound for the laying; I did not hear it.

**What it looks like, from pictures held at moments.** The tiles arrive in reading order backwards, so the mosaic
grows from its lower right toward its upper left, a row at a time, with bare parchment where the rest will be. The
laid tiles have their black lines but no silver came until the end.

**Whether six seconds is long: I could not watch it run, so I can only give the pace.** Tiles laid after each
second of the laying, from Complex life: 37, 299, 1,009, 2,392, and all 3,880 at 4.7 s. So the first two seconds
show under a tenth of the mosaic, and half of it lands in the last second. My guess is that the opening is slow
and the end is the reward. It is yours to judge.

**One thing to know.** At 1,024 × 768 the mosaic she was on slides down about 78 px as the room opens, and the
timeline with it, so the events' names are under the fold while it builds. The Earth shrinks by 279 px and the
room needed is 357. Everything is back in sight when it ends.

## Reduced motion

With `?motion=reduce`: no eased change of size; the 4.6 billion with `?build=1` is a cut; the views change by a
cut, dark at once; the globe let go at 6° is upright in one step; zoomed out, it is back in one step.

## Safari, on the iPad simulator

One pass, by real taps and touch paths.

- The first screen, on Complex life, with the photograph (`40`).
- *The World*, dark, with *Time* at the upper left and *Map* alone at the upper right (`41`).
- The two resting places, above (`42`).
- A tap on an event: the handle to 233 Ma, the Earth with it, the parchment panel on the dark (`43`).
- *Time*, by two taps, and the panel found its place in Time (`44`).
- The 4.6 billion: the Earth at 160 pt (`45`).

The simulator showed the same booted device as 19 Nov; the tool named it iOS 18.2, where my note had 26.5. I did
not look into which is right.

## Found in the check and mended

1. **The shrinking Earth spilled over the left column** for the 400 ms of its change of size. It is kept inside
   its column now.
2. **The year count sat on top of the first row's own year** as that year faded in. The count fades as the rows'
   years come.
3. **The Earth's ball touched the edges of its box** at iPad size, and the haze round it was cut. It has 8 px each
   side now.

## Not tried

- An iPad, and Safari on the Mac.
- *Full screen* from The World (the pane refuses it; on the simulator the word is not there).
- The sound of the build.
- Anything in motion: the eased change of size, the ground's fade in the move between the views, the ease to
  upright and to the opening size, the build. I saw where each ended. The times above for the two resting places
  are the ease run by hand at 16 ms a step, not watched.
- A real iPad's feel of the pull in a drag. That is what the bench switches are for.

## Needs Michael's eye

1. **The two resting places, on the iPad.** The angle (10°) and the pull (light) are my first guesses. Is the ease
   quick and soft enough? Is the pull too little to notice, or enough to annoy?
2. **A globe turned for her stays tilted** until she drags it: after *Pick a time*, and after a tap on the map.
   Should those arrive upright too?
3. **Two taps on a faded word, by finger.** Step 9's rule, now on by default. The other way: a faded word acts at
   the first tap.
4. ***Full screen* is not in The World on a touch device.** It would do nothing she could see there.
5. **The fade is for the World's own words only.** The flags' years and the events' names stay unless the address
   says `?fade=1`. I read "these words" as the four words just listed.
6. **507 px at 1,024 × 768.** The Earth is two thirds of the window's height and the mosaic is a strip under it.
   That is "as large as it can be"; say if it is more than comfortable.
7. **The credit is under the fold at 1,024 × 768.** *Select years* is centred on the mosaic, which now sits low,
   so the credit under it ends 70 px below the window and the page scrolls by that much. Lifting *Select years*
   to stand directly under the menu would bring the credit to within 39 px, not into sight.
8. **160 px on the 4.6 billion at iPad size**, where step 9 kept the Earth large.
9. **The dark.** The near-black, the pale copper, the 0.72 ground under the line dimming the Earth's foot, and the
   grey tint Safari gives its own bars.
10. **The photograph in the lab.** The whole Earth changed, not only the ice. The Himalaya's white is still there,
    thinner, and true.
11. **A tap on a city no longer travels to it.** It only names it.
12. ***How this works* after the two cuts.** "Tap *select* to open it on the line below" now has no "it". And the
    panel still speaks of "this mosaic" with "4,600 tiles", while the lab opens on Complex life's 720.
13. **The build:** whether six seconds is long, the slow first two seconds, the timeline sliding 78 px under the
    fold while it runs, the count's place and size (12 px, in the gutter by the row).
14. **The Time Machine and the same six years.** `js/deep-time.js` has the same rounding in one place. Not looked
    at.
15. **The board's head line.** Other sessions have the board open, uncommitted. I added this step's entry in the
    Time lab thread and left the head line alone.

## Not in this step

*select* and *unselect*, the flags that widen, the end of *back* on the line; *play* and the Green Sahara; the
first-visit hint; the period Mores beyond Dinosaurs; pictures for events; Scotese's plates; the seas; the 13.8
billion years; the stories' Worlds; the front door; the swap.

## The files in `Time-Lab-Bench-10-Nov20/`

**At 1,024 × 768.**

- `01`: Time, the first screen, Complex life. `02`: the 4.6 billion chosen.
- `03`: The World, dark, 262 Ma on Complex life. `04`: The World, 1889 on Machines.
- `05`: The World, the map, the words faded. `06`: The World, an event's panel (Krakatoa, 1883).
- `07`: cities as points on the globe, Nairobi named. `08`: cities on the map, Nairobi named (a close view, taken
  at iPad size).
- `09`: Dinosaurs' panel with *More*, caught as it faded in. `10`: Dinosaurs' More.
- `11`: today, from above Greenland. `12`: from above Antarctica. `13`: over the Himalaya.
- `14`: 20,700 years, from the north.
- `15`: the build held at 2.6 s. `16`: at 4.9 s. `17`: at 5.5 s, her mosaic's tiles folding in.

**At iPad size.**

- `30`: Time, the first screen. `31`: the 4.6 billion. `32`: The World, dark. `33`: the map with the cities'
  points.

**The iPad simulator, Safari.**

- `40`: Time, the first screen. `41`: The World, dark. `42`: let go at about 22°, and stayed.
- `43`: an event's panel at 233 Ma. `44`: back in Time. `45`: the 4.6 billion.
