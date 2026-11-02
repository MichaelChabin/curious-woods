---
status: Report — the Earth bench, step 7, the window, rebuilt 2 Nov 2026 to Prompt-Build-Earth-Bench-07b.md and Worknote-Deep-Time-Window-03.md on f184e34d; checked in the pane on the Mac at 1,024 × 768 and at iPad size (768 × 1,024); NOT committed (the prompt says stop and report). The first build (1 Nov, to 07 and revision 2, pushed as 9e2cea4f with two fixes after Michael's look) is summarised at the end.
role: What was built, where the prompt, the worknotes and Michael's rulings of 1 Nov disagree and which was followed, the threshold and the warm spells, the events taken, the colour-blindness check, what the pane showed, what a finger cannot do, and what needs Michael's eye
related: Worknote-Deep-Time-Window-03.md, Worknote-Deep-Time-Window-02.md, Prompt-Build-Earth-Bench-07b.md, Sketch-Earth-in-Squares-01.html, Window-Mockups-Nov01/mock-window-dark-03.png, Worknote-Time-Slider.md, cw-deploys/experiments/earth-3d-window.html, Earth-3D-Bench-07-Nov02/ (the pictures), Earth-3D-Bench-07-Nov01/ (the first build's)
updated: 2026-11-02
---

# Report: the Earth bench, step 7 — the window, revision 3 (2 Nov 2026)

Built on `f184e34d`. One page rewritten, `cw-deploys/experiments/earth-3d-window.html`; nothing else under `cw-deploys/`
changes (`experiments/index.html` already opens the page, and the Earth item's link already goes through it, since 1 Nov).
`earth-3d.html`, `js/`, the Time Machine and every story are untouched. Nothing under `CWVault/` was stashed, restored or
checked out. The pictures are in `Earth-3D-Bench-07-Nov02/`, 27 of them, 1.8 MB, the pane's own screenshots and zooms (a
1,024 × 768 page drawn at about four fifths). `check-deploys`: no errors. **Not committed.**

## Read first, and where the sources disagree

- **The prompt says 07 "was never run". It was.** The first build went up on 1 Nov (`9e2cea4f`, on Michael's "Can you put
  this on curiouswoods.org/experiments?") and Michael looked at it live, which gave two rulings the same evening: a drag must
  never select the page as text (`00a98f8b`), and nothing on the glass is ever greyed — the chosen span is lit as an event
  is lit, its events back in their own colour (`f184e34d`). Both are kept in this rebuild. The chat that wrote 07b and
  revision 3 had not seen the board's 1 Nov entry.
- **"The rest of the window dims gently" (07b, revision 3's period boxes) against "nothing is ever greyed … the era under
  the cursor is lifted a little instead of the rest being dimmed" (Michael, 1 Nov, on the live page).** Built as the prompt
  says, gently: with *Periods* on, the period under the cursor is lifted and the rest mixes 12 % toward the parchment
  (`LOOK.dimRest: 0.12`); at rest nothing dims and the span is lit as on 1 Nov. If the dim is not wanted, `dimRest: 0` is the
  one line.
- **Revision 2 against revision 3:** four windows against three, the scales beside the glass against in the column, the
  years on the left against the right, clear future glass against none, plaques against boxes. Revision 3 was followed on
  every count, as the prompt says.
- **Revision 1 is still not on disk** (not in `CWVault/`, the git history, iCloud, Documents or Downloads), so "revision 1's
  twelve colours" cannot be read from it. The first build took the sketch's colours. This build takes the colours of the
  mockup the prompt points at, `mock-window-dark-03.png`, sampled from the picture block by block (the mockup was made in
  the same chats as revisions 1 and 2, so its colours are the likeliest to be revision 1's); they are brighter than the
  sketch's. Thirteen lines in `PERIODS` to change if revision 1 turns up.
- **The last million's boxes:** 07 gave the window the periods *Hippos in London*, *Ice sheets* and *After the ice* from
  130,000 years; 07b gives it two boxes, *Ice age* and *Warm spell*, so the periods are gone from it.
- **"The text the bench shows goes below the timeline."** Read as the bench's words under its line (what one pixel is worth;
  the ends), not the bench's paragraph about the globe, which has no place here. The ends are now said by the flags
  themselves, so under the line only *one pixel: …* remains, centred.

## What was built

**The page.** The page standard; `CW_VERSION 2026-11-02 f184e34 · earth-3d-window step 7b`. It loads `cw-style.js`,
`cw-time.js` and `cw-panel.js`, no 3D. **Every size, colour, line and word is in three tables at the top of the script**
— `LOOK` (the came, the lines, the gaps, the gold, the gutter, the shading, the lift and the dim, the box, the glass
colours, the threshold, the end margin, the glide), `WORDS` (the three commands, the three explanations, *Periods* / *Hide
periods*, *Cities* / *Hide cities*, *now*) and `PERIODS` (thirteen lines: span forward in million years, colour, texts) — so
a change is one line. `ICE` and `WARM` sit under them.

**The left column**, the house convention: *How this works* at the top (cw-panel.js's box, placeholder words marked as
such in grey, then under a rule *for the bench*: A / B for the last million, *year inside* / *a margin* for a flag at the
end of the line, and a readout of what loaded); then two bulleted words in normal type, **Select years** with *4.6 billion*,
*Last million*, *Last 12,000* under it and **Information** with *Periods* / *Hide periods* and *Cities* / *Hide cities*.
The two bulleted words are headings and do nothing when pressed: the convention says bulleted words open tools, and
these two open nothing, which is the nearest the brief's list comes to the convention; if they should fold their commands
away, say so. *Cities* renames and does nothing else, as the prompt says. **The scale in use is in copper:** Glass Geometry
marks no command in use (its commands rename; its items open boxes), so the mockup's copper stands, no underline.

**The three windows**, one at a time, centred over the timeline (the glass and the track share one column, 676 px at
1,024 wide, the words *stretch*, *shrink*, *back* in the column to the right of both), one line of explanation above, in
the prompt's words:

| command | a square | a block | squares | glass | boxes |
|---|---|---|---|---|---|
| *4.6 billion* | 1 million years | 100 million | 4,600: four rows of 1,000 and a fifth of 600 | the thirteen periods | the thirteen |
| *Last million* | 1,000 years | 100,000 | 1,000 | ice age / warm spell, A or B | Ice age, Warm spell |
| *Last 12,000* | 10 years | 1,000 | 1,203: twelve blocks to the year 2000, a thirteenth of three (the 2000s, 2010s, 2020s), from the date | plain glass | none |

Past at the top left, time down each column of ten and then right. No squares for time that hasn't happened: the fifth
row stops at six blocks, the thirteenth block is three squares in a sliver of came that will gain a square each decade
(`DECADES_BEGUN`, worked out from `CW.THIS_YEAR`). The square that holds now (the last million years; the last 1,000
years; the 2020s) is filled gold, `#e2b33a`.

**The look.** Near-black lines (`#141416`) between and round the small squares, 1 px (0.6 under squares of fewer than 6
px); the silver came `#949ca0` (the mockup's, darker than the first build's `#b9c0c4`) between blocks, 4 px, and as a
3 px frame round each row; between rows 10 px of parchment (the sketch's gap was 15; `rowGapCame: true` would make it
came); handmade shading by a hash (lightness ± 3.5 %, saturation ± 3 %) over a gentle run of lightness along each period,
darker at its old end. The mockup's look, close.

**The years on the right**, 12 px grey, as revision 3 says. The 4.6 billion window: *1 billion* … *4 billion* at the
bottom right of each row, in the gutter, and *4.6 billion* just after the last square of the short fifth row. The other
two mark their block edges the same way, under each block's right edge, and put *now* after the last square: the 12,000
window counts years after the ice, *1,000* … *12,000*; the last million counts years ago, *900,000* … *100,000* — read
against *now* at its right. Counting forward there (*100,000* … *1 million* at now) was tried in the head and dropped as
the odder reading; one line to change (`blockLabel`). The label under the cursor says how long ago, and names the
square's events: *3,292 million years ago*; *410,000 years ago*; on the 12,000 window the ordinary decade too — *the 1760s ·
260 years ago · Tupaia's map*, *the 1810s · 210 years ago · Tambora · Frankenstein*, *about 10,000 BCE · 12,020 years ago ·
Ice lets go*, *the 2020s · now*.

**The glass of the 4.6 billion window:** revision 3's thirteen periods, by span, with the mockup's colours — 1 `#b75027`,
2 `#1e3b47`, 3 `#c39444`, 4 `#8daec1`, 5 `#8f3321`, 6 `#2a5c8c`, 7 `#c2dae5`, 8 `#21848c`, 9 `#163d87`, 10 `#2b763f`, 11
`#a6c24a`, 12 `#cb7d22`, and 13, the last three squares, a pale ice `#dbe6ec` (mine; the mockup has none). The
boundaries are revision 3's, which it says still want checking against Periods-Deep.

**The last million, two ways** (bench only; *How this works*, or `?glass=B`). A: two colours, ice age `#93adb9` and warm
spell `#7fa86a`. B: graded, the ice from `#7a9cad` at the threshold to `#e6eef1` at −130 m, the paler the lower the sea.
Each square's sea is the mean of five readings of `stories/curves/sea-level-ice-ages.json` across it (`CW.curveAt`). **The
threshold is −20 m** (`LOOK.threshold`; `?thr=` tries another), as on 1 Nov: in the repo's curve (Spratt and Lisiecki's
stack to 798,000 years, Bintanja and van de Wal beyond) the older interglacials peak ten to twenty metres below today, so
"within a few metres of today" picks six of the eleven; −20 m shows all eleven (MIS 1, 5e, 7, 9, 11, 13, 15, 17, 19, 21, 25),
some as two or three peaks. The warm spells it gives, in thousand-year squares, years ago: 956–940, 859–845, 782–770,
700–684, 616–606, 579–566, 499–485, 414–392, 388–385, 331–312, 239–235, 217–204, 203–196, 126–117, 101–98 (MIS 5c), 10–0.
Sixteen runs; "one warm spell per block" holds loosely, as revision 2 said it would.

**The last 12,000: plain glass**, each square its own shade of a pale stone, `#c4bfae`. The first build's tan (`#c8b48c`)
was changed because the gold square at now was weak against it (14 on the colour-difference scale below, 9.8 for a
tritanope); against the stone it is 21. What colours the window when no story paints it is still open.

**Events.** From `stories/deep-time-events.json` alone, the one store since 9 Oct (its 111 after-the-ice records are the
same records as `timeline-events.json`, by id; the September `after-the-ice-events.json` is the holding file they replaced):
185 events, 74 deep (by `ma`) and 111 after the ice (by `year`, through `CW.yearToMa`), each in the square its date lies in.
57 squares carry events on the 4.6 billion window (all the after-the-ice ones in the last square), 26 on the last million,
88 on the last 12,000 (some carry two or more: *Tambora · Frankenstein* in the 1810s). An event square is backlit in a
brighter version of its own colour (lightness +22 %, saturation +18 %); a pale square (the ice, the palest B squares) has
no brighter, so it goes three quarters of the way to gold.

**Periods.** With *Periods* on (the first state), rolling over a period lifts it and dims the rest gently, and a white box
appears below it: a small grey first line (the box's name — *Ice age*, *Warm spell* — or the period's span, *2,450 to
2,200 million years ago*, *3 million years ago to now*), then its words in ink; a 1 px pointer line, 14 px long, runs up
from the box to the bottom edge of the period. One box at a time, never wider than the window's panes (420 px at most),
centred on the period's squares in the row and line under the cursor, slid inward when it would stick out (period 1 at the
left edge, the warm spell at 125,000 at the right edge: `box-period-1-at-the-left-edge.jpg`,
`last-million-A-box-warm-spell-inside-the-panes.png`). The box floats: for a period in a lower row it lies over the rows
beneath; for one in the last row, over the timeline (`box-period-13-ice-sheets.jpg`), which it hides until the cursor
leaves. On the iPad, by finger, while it is down (`ipad-finger-down-box-while-down.jpg`). With *Periods* off the lifting
and the dim stay and no box appears (`periods-off-lighting-stays.jpg`). **The words** are revision 3's table for the
thirteen, with its (C) marks removed, and the two placeholders for the last million. Each period's `t` is a list; when it
holds several, they come shuffled without repeats until all have been seen, and the first of a new shuffle is never the
last one shown (`nextText`). Today every list has one.

**The timeline** is the bench's age row (6c–6e), copied as on 1 Nov, drawn past-left, no thumb (not moved into `js/`:
below). New since 1 Nov, from revision 3:

- **The flags always show their years**, the right flag's to its right, the left flag's to its left, the line's own ends
  exact (*4,567 million years ago*, *12,026 years ago*, *today*; a moved flag's year to the pixel as on the bench). At an
  end of the line with no room outside, **two ways, a bench switch** (`?ends=margin`, or the words in *How this works*):
  *year inside* (the first state; the bench's own rule — the year tucked inside the flag: `page-1024x768-opening.jpg`) and
  *a margin* (136 px of bare track at each end of the line, the years always outside: `ends-margin-at-rest.jpg`,
  `ends-margin-flags-in.png`). The margin costs the line 272 px of its 676 — one pixel 5.7 million years instead of 3.4.
- **A narrow copper line between the flags**, 3 px, with the span written on it in black on a parchment pad (*4,567
  million years*; *73 years*): `flag-dragged-years-outside-span-on-copper.jpg`. When the span is too narrow for the words
  they go above the flags, as the bench's gap label did.
- *stretch*, *shrink* and *back* to the right, one under the other. **shrink** (the exact inverse of the stretch: with the
  flags at `fa`, `fb` on `[a, b]`, the new line is `a − (fa − a)·k` to `b + (b − fb)·k`, `k = (b − a)/(fb − fa)`); now is a
  wall and so is the Earth's birth; when the span outgrows the window in use, the window steps up to the smallest scale
  that holds it (on a stretch or a back too). **One change to the stretch:** the bench's floor of a year a pixel used to
  *lengthen* a line already finer than that (a 100-year span from the window, flags 73 years apart: *stretch* made a
  1,352-year line); now a line already under the floor stretches on, and *one pixel: under a year* says so.
- Dragging across squares sets the line to those squares (a tap, the one square); the lit squares are always the flags'
  span, live. Pressing a scale keeps the line's span if the window reaches it, else sets the line to the window's whole.

**Moving code into `js/`.** Two pages now carry about 130 lines of the same stretching line (`STR`, `xOf`/`maOf`,
`pixelStep`, `roundedWord`, `flagWord`, `gapWord`, `placeLabels`, `yearsWord`, `spanEndWord`, `renderStretch`,
`glideStretch`, `finishStretch`, `doStretch`, `stretchBack`, `setFlag`, the pointer handlers) and 16 lines of CSS. What
would move: those, as `js/cw-stretch.js` — `CW.stretchLine(trackEl, { from, to, direction, thumb, shrink, ends, words,
onChange })` returning `{ state, stretch, shrink, back, goTo, finish, render }` — so the bench keeps today-left, its thumb
and its labels-only-when-moved, and this page takes past-left, always-on years, the copper span and shrink. Why: one rule
for the pixel step and the words, one glide, and shrink, the span line and the step-up reaching the globe when the window
joins it. Stopped there, as the prompt says.

## The colour-blindness check

Every neighbouring pair on every window, the gold square against what it sits in, and each colour against its own
backlit event square, through Machado, Oliveira and Fernandes's 2009 matrices at full severity, the difference as
CIEDE2000 after simulation; with the near-black lines in place every colour is at least 13 from the line under every
simulation, so the lines separate the squares whatever the pair does. Under 10 fails, 10 to 15 is weak. The script is in
the session's scratchpad. Every pair not listed is 16 or more under every simulation.

| pair | normal | protan | deutan | tritan |
|---|---|---|---|---|
| 11 dinosaurs `#a6c24a` / 12 mammals `#cb7d22` | 33.9 | 16.0 | **9.8** | 36.3 |
| 9 eyes and shells / 10 to land | 46.3 | 45.9 | 43.8 | 16.4 |
| A: ice age / warm spell | 27.1 | 27.1 | 26.7 | **6.4** |
| B: ice at the threshold / warm spell | 29.4 | 29.5 | 29.3 | **6.1** |
| gold now / plain glass (the stone) | 21.2 | 21.7 | 20.6 | 17.7 |
| gold now / warm spell | 26.6 | 12.4 (weak) | 16.1 | 40.1 |
| a colour against its own event square: 3, 4, 11, 12, ice age, warm spell, plain | 11–15 (weak) | | | |

**Fails:** *Dinosaurs / Mammals* for a deuteranope, by a hair (9.8; the first build's pair failed at 2.6 and 6.2), and ice
against warm for a tritanope (rare, about one in 10,000), as on 1 Nov. The mockup's colours stand for Michael's ruling; a
mammals' orange one step redder (`#c8661a`) would clear the first (14). The thirteen periods otherwise pass well: the
mockup's palette is a better one than the sketch's for this.

## Checked in the pane on the Mac, 1,024 × 768

The glass 676 px wide with a 78 px gutter for the years; squares 5.56 px on the 4.6 billion window, 6.2 on the million,
4.46 on the 12,000. Every item of the prompt's list:

- **Each window, its explanation, its years on the right:** `page-1024x768-opening.jpg`, `big-window-close.png` (the
  thirteen periods, *1 billion* … *4.6 billion*), `last-million-A-box-ice-age-500000.png` (*900,000* … *100,000*, *now*),
  `last-12000-the-1760s.png` (*1,000* … *12,000*, *now* after the thirteenth block's three squares; the label *the 1760s ·
  260 years ago · Tupaia's map*).
- **The thirteenth block:** three squares, the last gold, in a sliver of came; *now* after it. The readout in *How this
  works* says *the thirteenth block of the 12,000 window holds 3 decades*.
- **Periods on and off, the box inside the window:** `box-period-1-at-the-left-edge.jpg` (the box slid inward to the
  glass's left edge, the pointer line up to the period, the period lifted and the rest dimmed), `box-period-4-oxygen.jpg`,
  `box-period-13-ice-sheets.jpg` (the last row: the box over the timeline), `periods-off-lighting-stays.jpg`; on the
  million, `last-million-A-box-ice-age-500000.png`, `last-million-A-box-warm-spell-inside-the-panes.png` (the right edge).
- **A and B:** `last-million-B-graded.png` (the ice graded, the warm spells the same squares); the words in *How this
  works* (`how-this-works-box.jpg`) and `?glass=B`.
- **A drag on each window:** `drag-big-window-row-2-lit.jpg` (row 2 lit as an event is lit, its events dark inside, the
  line glided to 3,575–2,734 million years ago, *841 million years* on the copper, one pixel 620,000 years);
  `drag-last-million-697000-to-436000.png`; `drag-last-12000-1760s-to-1840s.png` (266 to 176 years ago, *90 years*, *one
  pixel: under a year*).
- **The flags' years at the ends of the line:** inside (`page-1024x768-opening.jpg`) and in a margin
  (`ends-margin-at-rest.jpg`); both ways with the flags dragged in (`flag-dragged-years-outside-span-on-copper.jpg`,
  `ends-margin-flags-in.png`).
- **stretch:** `after-stretch-last-12000-73-years.png` (flags at 239 and 166 years ago on a 100-year line: the line is now
  73 years, no longer lengthened by the floor), `after-stretch-big-window-2505-million.jpg` (flags at 3,425 and 920 million
  years: the line between them, 2,505 million years lit on the glass).
- **shrink, the wall and the step up:** `flags-before-shrink-7220-3010.png`, `after-shrink-the-wall-and-the-step-up.jpg`
  (the 12,026-year line, flags at 7,220 and 3,010: the whole fitted between them makes 34,353 years, which would have run
  8,600 years past today; today stayed at the right end, the line became today to 34,353 years ago, one pixel 25 years,
  and the window stepped up to the last million with the last 34 squares lit).
- **back:** `after-back.jpg` (the line back to 12,026 years with the glide, the lit squares with it; the window stays at
  the million — it never steps down by itself).
- **The lit squares following the flags:** in every picture with the flags moved; a flag dragged by the pointer lit and
  unlit squares as it went.
- No console errors; `check-deploys` no errors (two warnings, neither this page's: an older lab's icon, another session's
  untracked palette pictures).

## At iPad size, 768 × 1,024 in the pane

The two-column layout holds (the media rule is at 760); the glass gets 420 px, so the blocks wrap: five a line, two lines
a row, squares of 6.4 px on the 4.6 billion window, 706 px tall (`ipad-768x1024-the-4-6-billion-window.jpg`; the years at
the right of each row's second line, *4.6 billion* after the fifth row's one wrapped block); seven blocks a line on the
12,000, 4.5 px squares, the years under each line (`ipad-last-12000-wrapped-labels-under-each-line.png` — the first take
had the first line's years running into the second line's came; the gap between labelled lines is now 26 px);
`ipad-last-million-wrapped.png`. By finger (pointer events of type touch on the million window, 410,000 to 359,000):
the box up while the finger is down and the label 40 px above it (`ipad-finger-down-box-while-down.jpg`); on release
both gone and the line at 410,000 to 359,000 years ago (`ipad-finger-up-span-set.jpg`). At 1,024 × 768 (iPad landscape)
the page is the Mac's.

**What a finger cannot do.** Pick one square: at 4.5 to 6.4 px a square is a tenth of a fingertip, so a tap lands on
some square near the meant one and a drag's ends are approximate; the design's answer, that the glass picks spans and
the line picks years, stands, and the box-while-down lets her feel for a period. The box, being below the period, is
clear of her hand on every row but the last of the 4.6 billion window and on the single-row windows, where it falls
below the glass and under the heel of the hand; the label is above the finger. The near-black lines are invisible by
finger. Not tried on the real iPad or the simulator: the prompt asked for the pane at iPad size.

## Needs Michael's eye

- **The dim on rollover** (12 % toward the parchment, the prompt's "gently") against his rule of 1 Nov; `dimRest: 0` ends it.
- **The thirteen colours**, the mockup's, standing for revision 1's; the pale ice of the last three squares and the
  stone of the 12,000 window are mine.
- **A or B**, and the −20 m threshold, as on 1 Nov.
- **The years on the million window** counting ago (*900,000* … *100,000*, *now*), where the big window counts forward.
- **Year inside or a margin** for a flag at the end of the line.
- **The box over the timeline** when the period is in the last row.
- **Select years and Information as headings** that do nothing when pressed.
- **The colour-blind pairs:** Dinosaurs / Mammals by a hair, ice against warm for tritanopia.
- **The squares' size** at 1,024 wide (4.5 to 6.2 px) — the gutter for the years takes 78 px of the glass's 676.
- **The words of *How this works***, placeholders.

## The first build, 1 Nov 2026, for the record

Built on `46f58e82` to `Prompt-Build-Earth-Bench-07.md` and revision 2; committed and pushed on Michael's word the same
day (`9e2cea4f`), the hash recorded in `6138514e`; then two fixes after his first look at the live page — the selection
fix (`2026-11-01b`, `00a98f8b`: `user-select: none` on the window row and the plaque slot, every press on the glass
preventing the default, so a drag never selects the page as text) and the light (`2026-11-01c`, `f184e34d`: every square
its true colour at rest, nothing ever greyed, the chosen span lit as an event is lit with its events back in their own
colour, a span that is the whole window lighting nothing, the era under the cursor lifted a little). Its windows were
four (the last 100,000 years too), its scales stood to the left of the glass, its years on the left, its fifth row ran on
into clear future glass, its eras were twelve merged from the sketch's fifteen scenes with plaques in a slot below the
glass, and its 12,000 window counted from year 0 after the ice into a thirteenth block that was mostly future. Its
report is in the git history at `f184e34d`; its 27 pictures stay in `Earth-3D-Bench-07-Nov01/`.
