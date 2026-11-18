---
status: Report, 17 Nov 2026. Step 8 of the Time lab bench, built on the working tree at `f511ad71` (step 7 as live, `94319125`, with the dates session's uncommitted lines in the same files). Checked in the pane at 1,024 × 768 and 768 × 1,024. Reported first, as the prompt asks. Amended 18 Nov on Michael's word, "Yes, use the gutter": the text block runs through the right gutter (see *The text block*). Committed on his word, "Yes", 18 Nov (`8d3cfe1f`), this session's hunks only; pushed on his word, "Push it", 18 Nov.
role: What step 8 did to `experiments/time-lab.html`, to the store and to two documents, what it found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-08.md (Michael's prompt, saved as it arrived), Report-Time-Lab-Bench-07.md (the page as it stood), Ruling-Dates-01.md, Rulings-Sept-2026.md
---

# Report: the Time lab bench, step 8 — Ga, a shorter text block, and small repairs (17 Nov 2026)

**18 Nov: the gutter, on Michael's word.** The text block now runs past the mosaic's last tile, through the right
gutter where the years hang, to the column's edge (`LOOK.areasGutter: true`; `?areas=tiles` shows the old width).

| Width | 17 Nov, to the last tile | 18 Nov, through the gutter | How they stand |
|---|---|---|---|
| 1,024 | 152 px | **131 px** | side by side, period 290 px, event 401 px |
| iPad, 768 | 267 px | **202 px** | one over the other, 459 px each |

- **At 1,024 the timeline hides 29 px**, down from 40: only the lowest row of events' names and the *one pixel* line.
  The Earth stays at 120 px.
- **At iPad size 202 px is still well over the 120 px the prompt hoped for.** Side by side is 218 px there, so the
  areas stay one over the other.
- **Checked again at both sizes:** the longest period and summary together on Civilization, then a short pair; the
  mosaic did not move and no text ran past its area. The console is clean in a fresh tab.
- **Where the text now reaches:** under the rows' year labels and over the *select* word's row. The two do not
  touch: *select* sits on the reminder line's row, below the block.
- Pictures `10` and `11` at 1,024, `35` at iPad size. The Earth in `35` is the pane's worn WebGPU, as before.

The rest of this report is as written on 17 Nov.

The stamp is `2026-11-17 f511ad7 · time-lab step 8`. `check-deploys` reports no error on the page. The console is clean
in a fresh tab, at load and after a run through four spans. Fifteen pictures are in `Time-Lab-Bench-08-Nov17/`, named
below by number.

**What was changed.**

- `cw-deploys/experiments/time-lab.html`: everything below.
- `cw-deploys/stories/deep-time-events.json`: two summaries, by a rebuild from their sources.
- `CWVault/claude/Periods-Deep-02.md` and `outdated-files/after-the-ice-events-retired-2026-11-16.json`: those sources.
- `CWVault/claude/Rulings-Sept-2026.md` and `CWVault/00-DECISIONS.md`: one dated line each.

No shared script was touched.

## Ga, not Ba

One table writes every short year on the page (`AGO_UNITS`), so one word changed there and every label followed.

| Where the page writes it | Now reads |
|---|---|
| The left flag on the 4.6 billion | *4.6 Ga* |
| The handle | *4.567 Ga*, *4.54 Ga* |
| The period area's first line | *4.567 to 4.4 Ga · 167 million years*; *3.9 to 2.45 Ga · 1,450 million years* |
| The event line | *About 4.57 Ga · Oldest grains*; *About 4.5 Ga · Moon forms* |
| The ends of the mosaic's rows | *3.6 Ga*, *2.6 Ga*, *1.6 Ga*, *600 Ma*, *Now* |

- Also changed: the pattern that joins two years into a span (*1.8 Ga to 720 Ma*), and nine comments that describe
  what the page does.
- Checked: no *Ba* anywhere in the page's text on the 4.6 billion (`01`, `31`).
- **The dated line** is at the foot of Rulings-Sept-2026.md and of 00-DECISIONS.md. Nothing was replaced.

**A *Ba* left where it is, and why.** None is in a statement that is still current.

- Rulings-Sept-2026.md, *The one timeline*, point 13 (12 Oct): "Ages are written short, Ba, Ma, ka". It is the record
  of that day, replaced by the ruling of 18 Oct. The new line at the foot says so.
- 00-DECISIONS.md, lines 132 and 134: the ruling of 18 Oct itself, which names *Ba* as the invented form.
- Periods-Deep.md, line 20: "was *4.6 Ba* until Michael's ruling of 18 Oct".
- The page's own header comment, at step 5: the history of that step.
- The records of earlier steps: Prompt-Revise-Time-Lab-Bench-05.md, Report-Time-Lab-Bench-05.md and -07.md,
  Prompt-Revise-Drain-the-Sea-Bench-02.md, the older entries of MANIFEST.md and the board.

## The text block

**It already ran from the mosaic's first tile to its last.** So the width could not grow inside those edges. The gain
comes from the shares, and from the three shorter texts.

- The period area has 42 parts in 100 of the width and the event area 58 (`LOOK.areasShare`, one line).
- The page now measures the block both ways, side by side and one over the other, and takes the shorter.
- From the start is counted only where it can show: the two deep mosaics and the deep events.

| Width | Step 7 | Step 8 | How they stand | The columns |
|---|---|---|---|---|
| 1,024 | 174 px | **152 px** | side by side | period 246 px, event 341 px |
| iPad, 768 | 246 px | **267 px** | one over the other | 355 px each: period 109, event 152 |

- **At 1,024 the block is 22 px shorter.** Seven lines, not eight. Shares from 40 to 44 all give 152.
- **At iPad size it is 21 px taller than step 7's.** The cause is the dates ruling. An event's first line now carries
  its years ago, and at 355 px it takes two lines: *About 775 BCE (about 2,800 years ago) · Greek alphabet* (`32`).
- **Which I chose at iPad size: one over the other.** Side by side is 261 px, 6 px shorter, but the period column is
  139 px wide, about nineteen letters to a line (`39`). The prompt says stack only if that is shorter, and it is not,
  by 6 px. I set a least width for a column, 200 px (`LOOK.areasColMin`), and say so here. `?areas=side` shows the other.
- **Neither width comes near 120 px at iPad size.**
- **What sets the height at 1,024.** Eleven events are seven lines tall. In each the first line has wrapped. *Farms*
  sets the period area: *10,000 to 4000 BCE · six thousand years* wraps in 246 px.
- **Nothing below the block moves.** Checked on Civilization at both sizes: the longest period and the longest summary
  together, then a short pair, then nothing marked. The mosaic's top stayed where it was, and no text ran past its
  area (`02`, `32`).

**One more width, built as a switch and not turned on.** If the block ran on through the right gutter, where the
years hang, it would be 88 px wider. `?areas=gutter` shows it; `LOOK.areasGutter` is the line.

| Width | To the last tile (as built) | Through the gutter |
|---|---|---|
| 1,024 | 152 px | 131 px, side by side |
| iPad, 768 | 267 px | 202 px, one over the other |

**The three texts** are in, word for word.

- `jomon` and `big-footprints`: changed in their sources, then the store rebuilt with `tools/deep-events-from-vault.py`.
  Compared with the store as it stood: 185 records, two summaries differ, nothing else.
- `big-footprints` is in Periods-Deep-02.md, as its `source` says.
- **`jomon`'s source is not in CWVault.** It is the retired September store,
  `outdated-files/after-the-ice-events-retired-2026-11-16.json`, which the build still reads. I changed its `blurb`
  there. The build puts *About 10000 BCE.* in front.
- *Farms* is in `PERIODS_12`, 27 words.

**Over the limit, and not changed.** *Iron* is 31 words: "Iron ore is common everywhere, so tools and weapons are
cheap for the first time. Empires grow large, and in Greece, India and China people begin writing down how to think."
*Writing* is exactly 30. No event summary is over 40.

## Dates, under the ruling of 17 Nov

The dates session had already rebuilt the store. I used what it left and converted nothing twice. The years ago are
worked out by `js/deep-time.js`, from this year, each time the line is drawn.

| Span | The event area's first line |
|---|---|
| Civilization | *About 3300 BCE (about 5,300 years ago) · Writing at Uruk* |
| Civilization | *About 8000 BCE (about 10,000 years ago) · Squash* |
| Machines | *29 August 1831 (195 years ago) · Faraday's ring* |
| Machines | *1 January 1804 (222 years ago) · Haitian Revolution* |
| Complex life | *About 375 Ma · Tiktaalik*; *About 201 Ma · Big footprints* (deep events are untouched) |

- **The left flag on Civilization reads *10,000 BCE*.** The right reads *now* (`02`, `32`).
- Inside the row the flags and the handle write calendar years to its start. A flag pulled in a little reads
  *9960 BCE*.
- ***ka* is for 12,000 years to a million.** *12.1 ka*, *50 ka*. Exactly 12,000 years, the edge of *Painted caves* on
  Humans, stays *12 ka*.
- *Farms* reads *10,000 to 4000 BCE · six thousand years*. It read *12 ka to 4000 BCE*.
- Pictures `03`, `04`, `33`, `34`.

## The timeline in sight on arrival

At 1,024 × 768 the Small Earth on the 4.6 billion is **120 px**, down from 256. That is the floor the prompt gave
(`LOOK.earthMin`).

- **In sight without scrolling:** the line, both flags and their years, the handle and its year, and the first two
  rows of the events' names (`01`).
- **Still hidden: 40 px.** The lower two rows of names, and the grey *one pixel* line under them.
- On the other seven spans the Small Earth is a third of the screen, as before. So the Earth changes size as she
  moves between the 4.6 billion and any other span.
- The size is kept while she selects on the 4.6 billion. A gathered line does not make the Earth grow.
- **At iPad size the Earth is not made smaller.** The 4.6 billion is ten lines of blocks there. The smallest Earth
  would still leave the line more than 300 px under the fold, so giving up the Earth buys nothing and it keeps its
  third (`30`, `31`).

## Four small repairs

1. ***Sound OK? yes · no*** stands at the foot of the left column, under *Select years* and above the credit (`02`).
   Answered by a real click on *yes*, it went, and the menu word read *Sound off* (`05`). Its line is kept empty
   afterward, so the credit never moves.
2. ***from the start*** shows on *4.6 billion* and *Complex life* only. Turned on, then *Humans*: the word is gone and
   the labels read *1 Ma* (`07`). Back to *4.6 billion*: the word is there, reading *years ago*, and the labels read
   *the start* and *1 billion* to *4 billion* (`06`, `08`).
3. The menu word is *from the start*, one line, turning to *years ago*.
4. ***How this works*** has the draft: *Tap a period on the mosaic and its story appears above. Tap* select *to open
   it on the line below.* (`09`)

## Checked

- **At 1,024 × 768 and at 768 × 1,024, in the pane:** every item of the prompt's list.
- **By a real click:** *yes* on the sound question. The rest was driven through the page's own bench hooks.

**Not tried:** an iPad, the simulator, the sound itself, the Mac's full screen.

**The Earth went blank in the pane** after about ten reloads, with WebGPU errors in the console. It did the same on a
copy of the step 7 page, so it is not this step's. One message in a worn tab said a material used 17 textures where 16
are allowed. I could not make it happen in a fresh tab.

## Needs Michael's eye

1. **Settled 18 Nov: the block runs through the gutter**, 131 px at 1,024.
2. **At iPad size the block grew**, 246 to 267 px, because of the years ago on the first line.
3. **I stacked the areas at iPad size against the letter of the prompt**, for 6 px. `?areas=side` to compare.
4. **A 120 px Earth is small**, and 40 px of the events' names still hide.
5. **The Earth is 120 px on the 4.6 billion and 256 px on every other span.**
6. ***Iron* is 31 words.**
7. **Faraday's line reads *29 August 1831 (195 years ago)***, not *1831 (195 years ago)* as the prompt's example has
   it. The store's summary opens with the full date and I kept it.
8. **Jōmon reads *About 10000 BCE (about 12,000 years ago)*.** The store writes that year without a comma; the flag
   beside it says *10,000 BCE*; the handle says *9899 BCE*, the record's own year. The record has no More, so its
   years ago are worked out on this page by the same sum.
9. **Three events whose summaries open on a sentence** (*Teotihuacan*, *Ibn al-Haytham*, *Hawaiʻi*) take the More's
   date line: *About 400 CE (about 1,600 years ago)*.
10. **"About" years ago use the dates session's rounding rule**, which still waits on his word.
11. **I replaced two sentences in *How this works*, not one.** "Tap to select the period and learn still more" came
    out with the pointing sentence. The grey sentence after the draft now says some of it again.
12. **The sound question keeps an empty line** in the column after she answers.
13. **The project's copy of Rulings-Sept-2026** needs the same *Ga* line. I changed the vault's.
14. **The ruling of 18 Oct asks two more things** this page does not do: the first abbreviation written once in full,
    and press and hold for the full words. Not in this step.
15. **The dates session's work is uncommitted in the same files.** The page's three lines of it, and the rebuilt
    store, will go in whichever commit comes first.

## Not in this step

The 13.8 billion years before the Sun; place marks on the Earth; *play* and trips; the graphs; the probe; *Cut open*;
the front door; the stories' Worlds; the swap.

## The files in `Time-Lab-Bench-08-Nov17/`

**At 1,024 × 768.**

- `01`: the first screen, the 4.6 billion, the timeline in sight, *Ga* on the labels.
- `02`: Civilization, *Farms* and *Squash* together, both flags, the sound question asked.
- `03`: Machines, Faraday's date line. `04`: Complex life, Tiktaalik's.
- `05`: the sound question answered and gone.
- `06`: *from the start* on. `07`: Humans, the word absent. `08`: the 4.6 billion again, on again.
- `09`: *How this works*.

**At iPad size.**

- `30`: the first screen. `31`: the foot of the 4.6 billion, *Ga* on every label.
- `32`: Civilization, *Writing* and *Greek alphabet* together, both flags.
- `33`: Machines. `34`: Complex life.
- `39`: the two columns I did not choose.

**Through the gutter, 18 Nov.**

- `10`: the first screen at 1,024. `11`: Civilization, *Farms* and *Squash*. `35`: iPad size, *Writing* and *Greek alphabet*.
