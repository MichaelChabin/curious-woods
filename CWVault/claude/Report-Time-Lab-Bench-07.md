---
status: Report, 16 Nov 2026. Step 7 of the Time lab bench, built on `cad0ed3c` (the step-6 page as committed in `30bc7d5c`). Checked in the pane at 1,024 × 768 by pointer and 768 × 1,024 by finger events, and on the iPadOS 26.5 iPad Air simulator by real taps and swipes. Reported first, as the prompt asks; then committed on Michael's word, "Commit the working tree changes", this session's hunks only; not pushed.
role: What step 7 did to `experiments/time-lab.html`, what it found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-07.md (Michael's prompt, saved as it arrived), Report-Time-Lab-Bench-06.md (the page as it stood), Ruling-Sound-01.md, Rulings-Sept-2026.md
---

# Report: the Time lab bench, step 7 — Michael's adjustments (16 Nov 2026)

Only `cw-deploys/experiments/time-lab.html` was changed. No shared script was touched and the store was read, not
written. The stamp is `2026-11-16 cad0ed3 · time-lab step 7`. `check-deploys` reports no errors on the page, and the
console is clean in a fresh tab. Thirty pictures and one recording are in `Time-Lab-Bench-07-Nov16/`, named below by
number.

**One contradiction between two documents, found while reading in.** Rulings-Sept-2026 says of abbreviations "Never
invent one (no 'Ba')". The page has written *Ba* since step 5, on that step's prompt (*4.6 Ba*, *3.476 Ba*). Step 7
leaves the page's rule alone and now puts *3.6 Ba*, *2.6 Ba* and *1.6 Ba* at the ends of the 4.6 billion's rows. One of
the two needs his word.

## The Earth: one word

One word under **Earth**, between *Full screen* and *Reset*. It names the view she gets next:

| Showing | The word reads |
|---|---|
| Small Earth | *Large Earth* |
| Large Earth | *Map* |
| Map | *Small Earth* |

The page opens on Small Earth. Checked by six real clicks, twice round: small, large (the stage 256 px, then 384 px),
map (at the large size), small again. A tap on the flat world still goes back to the globe, and the word then reads
*Map*. Where there is no 3D view there is no Map, and the word goes between the two sizes.

## The mosaic: shorter

The 4.6 billion keeps its five rows. Every other mosaic is one line of blocks, as wide as the timeline, at both widths.
The limit is ten tiles of the 4.6 billion at the same width: 63.8 px at 1,024 and 80.4 px at iPad size.

To get there I changed how many tiles stand in a column and how many columns make a block (`LOOK.lay`, one line). No
mosaic was merged; every tile is the unit it was.

| Span | Tiles | A tile is | Column | A block is | Tile at 1,024 | Glass at 1,024 | Tile at iPad | Glass at iPad |
|---|---|---|---|---|---|---|---|---|
| 4.6 billion | 4,600 | a million years | 10 | 100 million | 6.4 px | five rows of 63.8 | 8.0 px | five rows, as before |
| Complex life | 720 | a million years | 8 | 200 million | 7.4 px | 58.9 | 4.5 px | 36.1 |
| Humans | 1,000 | a thousand years | 10 | 100,000 | 6.4 px | 63.8 | 3.8 px | 38.2 |
| Civilization | 1,203 | ten years | 10 | 1,000 years | 4.7 px | 46.9 | 2.6 px | 25.8 |
| Writing | 533 | ten years | 5 | 1,000 years | 5.7 px | 28.3 | 3.3 px | 16.4 |
| Paper | 223 | ten years | 4 | 1,000 years | 11.0 px | 44.2 | 6.5 px | 25.8 |
| Machines | 307 | a year | 5 | 50 years | 9.7 px | 48.6 | 5.6 px | 27.9 |
| Computing | 77 | a year | 1 | ten years | 7.8 px | 7.8 | 4.4 px | 4.4 |

- **What changed from step 6.** Complex life was ten tall (90 px of glass), Writing ten tall (112 px) and Paper five tall
  (68 px). At iPad width every mosaic but the 4.6 billion used to wrap into two lines; now none does.
- **The reminder line** says each unit: *Each block is 200 million* on Complex life, *Each block is 1,000* on Writing and
  Paper. The rest are as they were.
- **The names under a row** add 16 px a row of names below the glass. They are not counted in the table.
- **A gathered selection** is one line 18 px tall at most, as in step 6, with a 16 px row of names above it now. The
  whole line is 44 px.
- Pictures `01` to `08` at 1,024; `32` and `33` at iPad size.

## Select and back

**What she does, and what happens.**

1. She taps a period, or drags across tiles. The tiles are lit, the period area tells the choice, and *select* appears.
   Nothing else moves: the line, the flags, the handle and the Earth stay (`10`; `42` on the simulator).
2. She taps *select*. The tiles gather as in step 6. The names of the periods inside stand above the line (`13`, and
   three names in `16`). *back* stands where *select* stood.
3. She taps *back*. The tiles travel home and the view is as it was: the line, the flags where she had them, the handle's
   year, the Earth, the event showing, and the choice she had marked, with *select* beside it again.

**Checked for "restored exactly".** With the handle at 1 Ba and the right flag pulled in to 500 Ma: mark, select, back.
The line, both flags, the year and the mosaic's box came back equal, value for value.

- **Where the two words are.** At the mosaic's top right, on the reminder line's row. The gutter beside the tiles holds
  the rows' years and, on the calendar rows, *2026* and *Electricity*, so a word there would collide.
- **One *back* on the page.** It undoes the last step: a *select*, a *focus*, or a flag pulled past the end. Checked: a
  *focus* undone by it, the flags back where she had set them. *focus* stays at the right of the timeline. This did not
  fight with anything.
- **A different period tapped** moves the mark. **A press on empty ground** clears it and hides *select*. Empty ground is
  the came and the gutters of the mosaic.
- **A Select years word** acts at once and clears any mark.
- **A drag** marks; *select* gathers it. Step 6's bench switch *a drag gathers* is gone.

## The move: slower, and both ways

- **Times.** Every time in `LOOK.move` is doubled. A move is 1,680 ms without a merge and 1,880 ms with one. Step 6 was
  840 and 940.
- **Taken.** On the simulator, *back* on Dinosaurs took **1,904 ms** against 1,880 designed, in 18 frames (`44`, the
  page's own readout). I did not time a move in the pane, which runs frames only while looked at.
- **Both ways.** A Select years word going to a smaller span plays the going-in move. Going to a larger one plays the
  same plan reversed: the tiles on screen travel to their places and the rest appear round them (`18`, Civilization out
  to the 4.6 billion at 800 ms).
- **Which pairs cut.** None of the eight. All eight spans run to now, so any two nest. All 56 ordered pairs were run:
  28 going in, 28 going out, no error, 5,802 tiles at most.
- **A gathered line and a word.** A span that holds the line plays the move out (a Dinosaurs line to *Complex life* or
  *4.6 billion*). A span inside a line that reaches now plays the move in. Otherwise a cut: a Dinosaurs line to *Humans*.
- **The line's glide** now lasts as long as the move, so the line arrives as the last tile lands.
- **The sound** takes its length from the move, so it stretched without a change. On the simulator it played (*audio
  running · played 3*). I could not listen to it.
- **Reduced motion** (`?motion=reduce`): select, back, a word in and a word out were all cuts, and nothing played with
  the answer *on*.

## Full screen on the iPad

**What I found.** The swipe cannot be stopped by the page.

- In the browser's full screen, Safari itself says *"localhost" is in full screen. Swipe down to exit* (`39`).
- On the simulator, one finger swiped downward on the Earth turned the Earth and left full screen in the same gesture
  (`40`, caught as it leaves). The Earth's stage already takes that gesture for itself (`touch-action: none`), and
  Safari exits all the same. There is nothing further a page can refuse.
- The tool's two-finger drag did not leave full screen on the simulator, in two tries. So I did not reproduce the fall
  Michael sees with two fingers, only the same fall with one.

**Which way I went.** A full page on touch devices, as the prompt says.

- *Full screen* there does not call the browser. The page's title and margins go, and the word reads *Leave full
  screen*. On the Mac the browser's own full screen is unchanged (*Exit full screen*).
- On the simulator, in the full page, a downward swipe and a two-finger drag on the Earth both turned the Earth and the
  page stayed as it was (`41`).
- **What it does not do.** Safari's address bar and tabs stay. A page cannot remove them without the browser's full
  screen. The one way to have no bars and no swipe is the site opened from her home screen.
- `?full=page` and `?full=browser` choose either for a check.

**Not tested on the iPad itself.** I have only the simulator.

## The text between the Earth and the mosaic

Two areas now. The line that gave the age of the whole is gone.

**The period area**, on the left, its left edge on the mosaic's first tile.

- First line: the span and its length. Then the name in bold and the description.
- With nothing selected it describes the mosaic: *4.6 billion years ago to now* / **The Earth.** *The history of the
  Earth…* (`01`). The eight descriptions are the prompt's drafts, unchanged, in `WORDS.spanTexts`.
- With a period marked or gathered it describes that period: *470 to 252 Ma · 218 million years* / **Life on land.**
- A dragged span is no period: it has its first line and nothing under it (`15`).

**The event area**, on the right: *About 66 Ma · The asteroid*, then the summary ending in *More* (`17`). It is empty
until an event is tapped, and empties when the line leaves the event. Nothing else writes there.

**Pointing writes in neither.** The label beside the cursor still names the period.

**Fixed heights.** The page measures every period's text and every event's text, counted both ways, and sets each area
to the tallest.

| Width | Period area | Event area | How they stand | The block |
|---|---|---|---|---|
| 1,024 | 131 px (the longest: *Farms*) | 174 px (*The thaw*) | side by side | 174 px |
| iPad, 768 | 109 px | 131 px | one over the other | 246 px |

- Checked on all eight spans: about forty taps across each mosaic, every event on its line, and both ways of counting.
  The areas' heights and the place of everything below them did not change, and no text ran past its area.
- They stand side by side where the narrowest mosaic's tiles are at least 560 px wide (`LOOK.areasSide`), else one over
  the other. On the simulator, 820 wide, they are one over the other.

## Years ago, or years from the start

The word is under **Information**: *years from the start*, which turns into *years ago*.

| Where | Years ago | Years from the start |
|---|---|---|
| Period area, Life on land | *470 to 252 Ma · 218 million years* | *4.13 to 4.35 billion years from the start · 218 million years* |
| Period area, the whole | *4.6 billion years ago to now* | *The start to now · 4.6 billion years* |
| A flag | *300 Ma* | *4.3 billion* |
| The handle | *375 Ma · inferred* | *4.23 billion · inferred* |
| The 4.6 billion's rows | *3.6 Ba*, *2.6 Ba*, *1.6 Ba*, *600 Ma*, *Now* | *1 billion*, *2 billion*, *3 billion*, *4 billion*, *Now* |
| An event | *About 375 Ma · Tiktaalik* | *About 4.23 billion years from the start · Tiktaalik* |

- Three figures at most. The length between the flags is the same in both and stays in words.
- **Civilization and the spans inside it** read the same in both modes, calendar years throughout (`20`).
- **Humans** counted from the start: every label reads *4.6 billion*, since three figures cannot tell a million years
  apart at that distance. A period there reads *4.6 billion years from the start · about 250,000 years*.
- **To strike it:** it is one block in the script (`COUNT`), one word, and two entries in `WORDS`. The block's comment
  says what to delete. Every caller goes through three functions that fall back to years ago.
- `19` shows it on the deep span.

## Found in the check and mended

- **A sliver of the next period was named.** Iron gathered on Civilization showed *Writing* over its first tile, the
  decade the edge falls in. A name wider than its own tiles is now left out.
- **Two columns of text 199 px wide** on the simulator, which is 820 wide. The areas now stack by the mosaic's width, not
  the window's.
- **Civilization's own start read *4.6 billion*** from the start, because 10,000 BCE is 26 years outside the last
  12,000. It is written as years ago writes it in both modes.

## Checked

- **At 1,024 × 768 by pointer:** the Earth word twice round by real clicks; the eight spans; mark, moved, cleared,
  *select*, *back*; a *focus* undone by *back*; all 56 pairs of words; both ways of counting on the 4.6 billion and on
  Civilization; reduced motion; the areas on every span.
- **At 768 × 1,024 by finger events:** a tap marks, a second tap moves the mark, a press on the came clears it, a drag
  marks a span, *select* and *back* by their own taps, nothing changing place except by the move (`30`, `31`). The full
  page by a real click (`34`).
- **On the iPadOS 26.5 iPad Air simulator, by real taps:** the browser's full screen and how it is left; the full page;
  a period marked, selected and put back (`42`, `43`); the readout (`44`).
- **Recording:** `50-recording-ipad-mark-select-back.mov` (22 s, real frames): a tap marks Dinosaurs on Complex life,
  *select*, then *back*.

**Not tried:** a real iPad; listening to the sound; the system's own reduced-motion setting; the Mac's full screen (the
pane refuses the call; that code is as it was); a move timed in the pane.

## Needs Michael's eye

1. **The text block is tall.** 174 px at 1,024 and 246 px at iPad size, because it must hold *The thaw* and *Farms*.
   Most texts are two to four lines, so there is empty parchment above the mosaic most of the time. Shorter texts for
   the few long ones would shrink it; so would a smaller height with the longest cut short.
2. **Complex life's blocks are 200 million years.** Eight tiles tall gives 7.4 px tiles. Five tall with blocks of 100
   million, matching the 4.6 billion's large squares, gives 4.5 px tiles (2.7 px at iPad size). One line to change.
3. **Small tiles at iPad size:** Civilization 2.6 px, Writing 3.3 px, Humans 3.8 px.
4. ***select* and *back* are above the mosaic's right corner,** not beside the tiles.
5. ***back* brings the mark back,** so *select* is there again. Tap *select* and *back* and they swap in place.
6. **Both words show at once** when she marks a period inside a gathered line: *select* to the left of *back*.
7. **A dragged span has only its first line** in the period area.
8. **How this works still says** "Point to one of these coloured periods and you'll see what was going on". Pointing now
   only names the period. The sentence is his; I left it. The grey sentence about gathering is rewritten for *select*.
9. **The first line for a whole span** is a table of words (`WORDS.whole`). The 4.6 billion's is his example and has no
   length; the others carry one (*720 Ma to now · 720 million years*).
10. **The 4.6 billion's row labels changed in the default mode** too: they were *1 billion* to *4 billion*, which counted
    forward. They now read as years ago.
11. **Counted from the start, a flag says only *4.35 billion*.** No "years from the start" on it; the left end of the
    4.6 billion reads *the start*.
12. **A flag taken hold of clears the mark,** so the tiles light by the flags again.
13. **A tap on the only period showing** (Electricity on Computing, or the one period of a gathered line) shows its words
    and offers no *select*.
14. **The full page changes little to look at:** no title, less margin. Safari's bars stay.
15. **The line's labels are hidden for the whole move,** 1.7 to 1.9 s, since the line glides for as long.
16. ***years from the start* wraps to two lines** in the column.
17. **Step 6's items still open:** the three ways to vanish, the three sounds, the reminder line above or under.

## Not in this step

The 13.8 billion years before the Sun; place marks on the Earth; *play* and trips; the graphs; the probe; *Cut open*;
the front door; the stories' World events; the swap and the retiring of the Time Machine and After the Ice.

## The files in `Time-Lab-Bench-07-Nov16/`

**At 1,024 × 768.**

- `01` to `08`: the eight spans at rest.
- `10`: Dinosaurs marked, with *select*. `11`, `12`: the move at 500 and 1,250 ms. `13`: gathered, with *back*.
  `14`: *back* at 900 ms.
- `15`: a drag marked. `16`: it gathered, three names above the line.
- `17`: the period area and the event area together.
- `18`: Civilization going out to the 4.6 billion at 800 ms.
- `19`: years from the start, Life on land and Tiktaalik. `20`: Iron gathered, calendar years in both modes (the Earth
  is blank there: the pane's WebGPU, worn out by reloads).

**At iPad size.**

- `30`: Dinosaurs marked by finger. `31`: gathered, both areas. `32`: Civilization. `33`: Complex life.
  `34`: the full page.

**On the simulator.**

- `39`: the browser's full screen. `40`: left by a swipe on the Earth. `41`: the full page after a swipe and a
  two-finger drag.
- `42`: Dinosaurs marked by a real tap. `43`: gathered. `44`: the readout.
- `50`: the recording.
