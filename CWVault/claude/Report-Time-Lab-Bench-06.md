---
status: Report, 12 Nov 2026. Step 6 of the Time lab bench, built on `0f55db97` (the step-5 page as committed in `2575c7f7`). Checked in the pane at 1,024 × 768 by pointer and 768 × 1,024 by finger events, and on the iPadOS 26.5 iPad Air simulator by real taps. Reported first, as the prompt asks; then committed and pushed on Michael's word, "please commit and push", `30bc7d5c`, this session's hunks only. Michael's prompt `Prompt-Revise-Time-Lab-Bench-06.md`.
role: What step 6 did to `experiments/time-lab.html`, what it found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-06.md, Report-Time-Lab-Bench-05.md (the page as it stood), Worknote-Mosaic-Focus-01.md, Ruling-Sound-01.md, Lab-Time-01.md
---

# Report: the Time lab bench, step 6 — Select years, and the mosaic gathers (12 Nov 2026)

Only `cw-deploys/experiments/time-lab.html` was changed. No shared script was touched and the store was read, not
written. The stamp is `2026-11-12 0f55db9 · time-lab step 6`. `check-deploys` reports no errors on the page, and the
console is clean. Pictures, two short recordings and the three sounds are in `Time-Lab-Bench-06-Nov12/`, named below by
number.

## Select years: eight spans

*4.6 billion*, *Complex life*, *Humans*, *Civilization*, *Writing*, *Paper*, *Machines*, *Computing*. Every span runs
to now. *Last million* and *Last 12,000* are gone into *Humans* and *Civilization*, which are the mosaics they were.

**How each new mosaic is laid.** It reads as the 4.6 billion does: time runs down each column, then right; columns sit
in blocks of ten, and the blocks run left to right. What changes per mosaic is how many tiles tall a column is
(`LOOK.colH`, one line each). I chose that number so each mosaic spans the line at a tile size near the others'. Every
new mosaic is one row of blocks, which wraps into two lines at iPad width, as the old ones do.

| Span | Tiles | Tile | Column | A block is | Tile size at 1,024 | Tile size at iPad |
|---|---|---|---|---|---|---|
| 4.6 billion | 4,600 | a million years | 10 | 100 million | 6.4 px (5 rows) | 8.0 px |
| Complex life | 720 | a million years | 10 | 100 million | 9.0 px (7.2 blocks) | 10.2 px |
| Humans | 1,000 | a thousand years | 10 | 100,000 | 6.4 px | 8.0 px |
| Civilization | 1,203 | ten years | 10 | 1,000 years | 4.7 px (12 blocks + 3 tiles) | 4.9 px |
| Writing | 533 | ten years | 10 | 1,000 years | 11.2 px (5.3 blocks) | 12.1 px |
| Paper | 223 | ten years | 5 | 500 years | 13.6 px (4.5 blocks) | 12.1 px |
| Machines | 307 | a year | 5 | 50 years | 9.7 px (6.1 blocks) | 9.0 px |
| Computing | 77 | a year | 1 | ten years | 7.8 px (7.7 blocks) | 9.0 px |

With a column ten tall, Paper's tiles would be 29 px, Machines' 22 px and Computing's 85 px. So those three have shorter
columns, and their blocks are not square. Their reminder lines say *Each block is 500*, *50*, *ten*, not *large square*.

- **Cut from a larger mosaic.** Complex life is the 4.6 billion's last 720 tiles, and Writing and Paper are
  Civilization's last 533 and 223. Each takes those tiles exactly as they are: colour, shade and events. That is why the
  move between them carries the same glass (`from` in `WINDOWS`).
- **Machines and Computing have no periods of their own yet,** so their tiles take the 12,000's periods by each year's
  middle. That gives Machines three colours: the end of *Printing* (1720 to 1780), *Machines* (1780 to 1880) and
  *Electricity* (1880 to now). Computing is all *Electricity*. Each year tile is graded along its period, with a
  handmade shade of its own, so it is not a copy of its decade's tile. Names under the row work as on Civilization;
  *Electricity* stands beside the year (`07`, `08`).
- **Civilization's last three decades** (2000s, 2010s, 2020s) now stand by themselves at the right end. They are a
  column of three tiles in a frame of their own, with 8 px of parchment between them and the block (`LOOK.apartGap`;
  `04`). The thirteenth square of clear glass is gone.
- **The reminder line** says each mosaic's unit (*Each tile is ten years. Each large square is 1,000.*). It still stands
  above the mosaic, where step 3 put it; see Michael's eye, item 9.
- **Line one at rest** names the span in use: *Writing · 3300 BCE to now · 5,326 years*.
- **Unchanged on every span:** the line, the flags, the handle, line one and the store's events, with years written as
  step 5 rules them. The line spans exactly the mosaic's tiles on all eight, measured at both widths.

## The mosaic gathers

**What she does.** She taps a period on the mosaic in front of her.

**What happens.**

- The tiles not in the period vanish.
- The tiles in it travel to one line directly above the timeline, oldest at the left, keeping their colours.
- The line glides to the period at the same time, so each tile lands above its own years.
- The line of tiles is as wide as the timeline. Each tile is as wide as its share of the period and as tall as it is
  wide, up to 18 px (`LOOK.lineTileMax`).
- The line stands there for as long as the selection does (`14`, `15`).

**Picture sequence** (Dinosaurs on the 4.6 billion): `10` at the start, `11` at 130 ms, `12` at 420 ms, `13` at 720 ms,
`14` landed.

**How the move runs, in order** (`LOOK.move`):

1. **Merging, where needed** (0 to 220 ms). Groups of ten glide together, in place, onto their middle tile.
2. **Vanishing** (from 0 ms). The unwanted tiles go over about 450 ms, each with its own delay.
3. **Leaving.** The chosen tiles leave oldest first, spread over 300 ms.
4. **Flying.** Each flies for 420 ms.
5. **Closing.** The mosaic's box closes once every tile has left, and the timeline rises with the landing line.
6. **The came and words.** The mosaic's came and labels fade as its tiles go. The line's frame comes in as the last
   tiles land.

**Total time:** 940 ms with a merge, 840 ms without.

**A gathered line is itself a mosaic.**

- Pointing names a tile, and a merged tile names its period and its span.
- A tap on a period inside the line gathers again.
- A drag on the line selects across it.

**The page takes its new state at once; the move only shows the way there.** It runs on its own canvas over the glass,
and the glass comes back when the last tile lands. The new state includes the reminder line saying the new unit.

### Merging

**The rule.** If one line cannot hold the period's tiles at 4 px or more each (`LOOK.lineReadable`, about the mosaics'
own smallest tile at iPad width), they merge by tens, and by tens again if needed.

**Merged tiles.**

- A merged tile spans exactly the ten tiles it holds. The last one in a period holds what is left and is narrower.
- It wears its middle tile's colour, and that tile's glow if it marks an event.
- The reminder line says the new unit: *Each tile is ten million years.*

**Examples.**

- Dinosaurs, 186 tiles, became 19 at 1,024 (`14`).
- Writing on Writing, 201 tiles, became 21.
- Early life, 1,450 tiles, became 145 at 1,024, and 15 at iPad width, where it merged by a hundred.
- A merge by a hundred is one glide of a hundred into one, not two glides of ten. A second glide would not have fitted
  in the second.
- Mammals, 63 tiles, needs no merge (`15`).

### back

*back* undoes the last selection, and the move plays exactly reversed:

1. The tiles leave the line, newest first.
2. They fly home.
3. The merged ones split back into ten.
4. The vanished tiles come back.

`16` and `17` show it. The line glides back at the same time.

A *focus* on the gathered line steps out with *back* as in step 5, and the tiles stay where they are. *focus* is not part
of the move.

A pull past the end of a gathered line, which outgrows its tiles, returns to the whole mosaic by a cut. *back* then
returns to the line by a cut.

### A drag across tiles

It gathers too. A drag is a selection like a tap, so it does what a tap does (`27`: a drag from Iron into Paper on
Civilization, merged into hundred-year tiles).

The bench switch *a drag gathers yes / no* shows the other way: with *no*, a drag only lights the tiles and moves the
line, as in step 5 (`28`).

### Select years words

A word plays the same move when its span lies inside the mosaic showing; otherwise it is a cut. With a gathered line
showing, the move needs the line to reach now and to hold the span.

For the move:

- The tiles of the new span stay and the rest vanish.
- Where the new mosaic is finer, each tile comes out of the coarser tile that holds it. Humans, for instance, streams out
  of the 4.6 billion's last tile (`24`).
- They then re-form as the new mosaic.

`23`: Civilization to Writing. `25`: 4.6 billion to Complex life. `26`: Civilization to Machines (decades split into
years).

Checked word by word, each from a mosaic that holds it and from one that does not:

| Word | From one that holds it | From one that does not |
|---|---|---|
| 4.6 billion | (none holds it) | from Complex life: a cut |
| Complex life | from 4.6 billion: the move | from Humans: a cut |
| Humans | from 4.6 billion: the move | from Civilization: a cut |
| Civilization | from 4.6 billion: the move | from Writing: a cut |
| Writing | from Civilization: the move | from Paper: a cut |
| Paper | from Writing: the move | from Machines: a cut |
| Machines | from Civilization: the move | from Computing: a cut |
| Computing | from Machines, and from a gathered Electricity line: the move | from a gathered Dinosaurs line: a cut |

A link's `?w=` is always a cut, so a page opened on a span does not ask about sound.

### Quick enough

Every move runs to the same plan, 840 or 940 ms, so the only question was frame cost.

- **Frame cost, measured in the pane by holding the move at twenty moments:**
  - 4.6 billion to Civilization, the largest move (1,203 tiles travelling and 4,599 going): 4.0 to 4.7 ms a frame.
  - Any gather: under 4.5 ms a frame.
  - Most moves: under 2 ms a frame.
- **Nothing had to be cut.** The cut-off (`LOOK.moveMax`) is set at 12,000 tiles, and no move comes near it.
- **Wall-clock time:**
  - In the pane, a real click on Rust took **950 ms** against 940 designed, in 22 frames (the pane runs few frames).
  - On the iPad simulator, Dinosaurs on Complex life took **956 ms** against 940 designed (`47`, the page's own
    readout). That was 12 frames at about 14 frames a second, which is the simulator's Safari, with a frame cost of
    1 ms.
  - The recordings show the motion lasting about 0.7 to 0.9 s.
  - A real iPad will have more frames, and the timing is the same.

### Ways to vanish (the bench switch *the tiles go*)

- ***fade***: each tile fades, at its own random moment (`20`).
- ***fall***: each tile drops a little as it fades (`21`).
- ***ripple*** (the default): the tiles shrink away in a wave that spreads out from the tiles that stay (`22`).

`?vanish=` picks one in a link.

### Reduced motion

A device set to reduce motion, or `?motion=reduce` for a check, gets a cut both ways and no sound. Nobody is asked about
sound either. The line's glide jumps too. Checked: gather, back and a word were all cuts; with the stored answer *on*,
nothing played.

## The sound

The rule is Ruling-Sound-01. The page is silent until she has answered *Sound OK?*.

**Sound OK?**

- **Where it appears:** at the mosaic's top right, on the reminder line's row, the first time a move would make a sound
  (`30`, and `44` on the simulator). That move is silent.
- **The answer** is kept for the whole site in `localStorage`, under `cw-sound` (`on` or `off`).
- **Her *yes*** is the tap that unlocks the browser's audio.

**The menu word.** *Sound on* / *Sound off* sits under **Information**. It says what a tap will do, as the column's
other words do.

**What plays.**

- One sound for the move. It starts with the first departure and ends as the last tile lands.
- A merge adds a low note (E3) inside it, as the worknote has it.
- Nothing plays under reduced motion.

**Three candidates,** made in the page with no files (bench switch *the sound*; choosing one plays it once if sound is
on):

1. ***shuffle*** (the default): many soft grains of filtered noise, thickest mid-flight, like tiles sliding over one
   another, then one quiet knock as the last lands.
2. ***glass***: the worknote's shimmer. Six soft high notes swell while the tiles fly, thin as they land, and settle on
   one soft chord.
3. ***brush***: noise through a filter that opens and closes over the flight, like a brush drawn across glass, then a
   small tap.

**Files to hear them,** rendered by the page off-line, each for a 720 ms flight:

- `sound-1-shuffle.wav`, `sound-2-glass.wav` and `sound-3-brush.wav`.
- `sound-1-shuffle-with-merge.wav`, with the low note.
- All are quiet, peaking at 0.07 to 0.18 of full scale.

**Checked by real clicks in the pane:**

1. Asked once, on the first gather, which was silent.
2. *yes*: the audio started and the word turned to *Sound off*.
3. A real tap on Rust played the sound once.
4. *Sound off*: stored as *off*, and *back* played nothing.

On the simulator the answer and the sound's playing were the same (*audio running · played 3*). I could not listen to
any of them.

## Found in the check and mended

- **The period names under Civilization had vanished.** They were placed before the row's height was known, so they
  landed at no position. Fixed in `computeLayout`.
- **Select years ran into Information.** It has eight words now and stays centred on the mosaic, so on a short mosaic it
  rode up over the menu. It still centres, but never closer than 18 px under the menu (`LOOK.selectBelowMenu`).
- **A `?w=` link played a move on load** and asked about sound. It is a cut now.
- **Tiles under the timeline.** At iPad width the mosaics wrap into two lines, and the timeline rose past the newest
  tiles before they had left (`41` shows it mended). Three changes:
  - The box now closes only after every tile has left.
  - A tile still low is lifted by the timeline.
  - The move's canvas is clipped to the box as it stands.

  A sweep of twenty moments through every gather and back, at both sizes, and through eleven word moves, found nothing
  drawn below the line.
- **Merged tiles glowed** wherever any of their ten held an event, and the line went patchy (`44`, on the simulator,
  before the fix). A merged tile now wears its middle tile, glow and all.

## Checked

- **At 1,024 × 768 by pointer and 768 × 1,024 by finger events:**
  - The eight mosaics, the line spanning exactly their tiles (`01` to `08`, `40`).
  - A period gathered and backed on every mosaic, the line flush on the timeline (0 px gap).
  - *back* returning the mosaic layout exactly.
  - Twelve boxes measured before and after each of these, within each layout, at both sizes: pointing, an event, the
    handle, flags in with *focus* and *back*, and the sound word. Nothing moved except by the move itself. The move moves
    five: the glass box, the timeline, its track, its events and Select years.
- **On the iPadOS 26.5 iPad Air simulator, by real taps:** a gather (Writing), *Sound OK?*, *yes*, *back*, the *Writing*
  word's move, a cut to Complex life, and a gather on Complex life (`44` to `47`).
- **Recordings** (on the simulator, real frames):
  - `50-recording-ipad-gather-dinosaurs.mov` (3.5 s): one gather from start to landing.
  - `51-recording-ipad-back-then-writing-then-a-cut.mov` (15 s): *back*, the Writing word's move, and a cut.

**Not tried:**

- A real iPad.
- The system's own reduced-motion setting (the `?motion=reduce` switch stands in).
- Listening to the sounds.
- *Full screen*.
- In the pane the Earth drew as a blank ball late in the session (`41`). That is the pane's WebGPU, worn out by
  reloads, not the page.

## Needs Michael's eye

1. **The three ways to vanish:** *fade*, *fall* or *ripple*. Ripple is the default.
2. **The three sounds:** *shuffle*, *glass* or *brush*. Shuffle is the default.
3. **Whether a drag gathers.** I made it gather; the bench switch shows the other way.
4. **Column heights:** Paper and Machines at five tiles and Computing at one. Computing is a single ribbon of years, 8 px
   tall, in blocks of a decade. With columns of ten, the tiles would be 29, 22 and 85 px.
5. **Readable is 4 px.** At 5 or 6 px, Paper's own period (141 tiles at 4.4 px) would merge into centuries.
6. **The gathered line is at most 18 px tall.** With few tiles they are wide rectangles, not squares: Electricity's 15
   on Civilization, or Dinosaurs' 19 at 36 px wide.
7. **When the page is scrolled** (the 4.6 billion at 768 tall), the page gets shorter as the box closes. The browser then
   brings the whole page down with it, so the Earth slides down during the move (`13`, `14`).
8. **A move into a taller mosaic** (Civilization to Writing) opens the box while the tiles fly, and the timeline goes
   down.
9. **The reminder line is above the mosaic,** where step 3 put it. The prompt says "under each mosaic". Moving it is one
   grid row.
10. ***Sound on* / *Sound off* says what a tap will do,** like the column's other words. The ruling's own wording leaves
    open whether it should show the state instead.
11. **`cw-sound` is the key `js/glass.js` already reads.** Glass treats a missing answer as *on* (its ruling 6 of 24 Oct:
    "a setting, not a question"). Ruling-Sound-01 says silence until asked. Once she answers here, glass follows her
    answer, but glass alone never asks.
12. **Where *Sound OK?* appears:** the mosaic's top right, over the reminder line's row.
13. **How this works** has one sentence rewritten for the eight spans, and a new placeholder sentence in grey about the
    gathering. Both wait for his words.
14. **Line one after a cut** keeps a period's words when the period still lies on the new line. For example, *Writing ·
    3200 to 1200 BCE* stays after a cut to Complex life. That is step 5's rule, unchanged.
15. **A merge by a hundred is one glide,** not two glides of ten.
16. **A tapped period that starts before the mosaic** (Cities on Writing) selects only the part on the mosaic, but line
    one names the whole period (*Cities · 4000 to 3200 BCE*).

## Not in this step

These were left for later: the 13.8 rung, trips, the probe, *Cut open*, the front door, the swap, and the retiring of
the Time Machine and After the Ice.

## The files in `Time-Lab-Bench-06-Nov12/`

**At 1,024 × 768.**

- `01` to `08`: the eight mosaics.
- `10` to `14`: Dinosaurs gathering (0, 130, 420, 720 ms and landed), merged by tens.
- `15`: Mammals gathered, with no merge.
- `16` and `17`: *back* at 470 and 700 ms.
- `20` to `22`: fade, fall and ripple at 230 ms.
- `23` to `26`: the word moves (Civilization to Writing, 4.6 billion to Humans, 4.6 billion to Complex life,
  Civilization to Machines).
- `27`: a drag that gathers. `28`: a drag with the bench at *no*.
- `30`: *Sound OK?* asked.

**At iPad size.**

- `40`: Writing at rest.
- `41`: a gather by finger at 640 ms.
- `42`: Iron gathered.

**On the simulator.**

- `44`: Writing gathered with *Sound OK?*, before the glow fix.
- `45`: after the Writing word.
- `46`: Dinosaurs gathered on Complex life.
- `47`: the readout, 956 ms taken.

**Recordings and sounds.**

- `50` and `51`: the recordings.
- `sound-*.wav`: the three candidates, and shuffle with a merge.
