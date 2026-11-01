---
status: Report — the Earth bench, step 7 (Prompt-Build-Earth-Bench-07.md, the window); built 1 Nov 2026 on 46f58e82; checked in the pane on the Mac at 1,024 × 768 and at iPad size (768 × 1,024); committed and pushed on Michael's word the same day ("Can you put this on curiouswoods.org/experiments?"), `9e2cea4f`
role: What was built, where the worknotes and the prompt were read differently and why, the threshold and the warm spells, the events taken, the colour-blindness check, what the pane showed, what a finger cannot do, and what needs Michael's eye
related: Worknote-Deep-Time-Window-02.md, Prompt-Build-Earth-Bench-07.md, Sketch-Earth-in-Squares-01.html, Window-Mockups-Nov01/, Worknote-Time-Slider.md, Report-Earth-3D-Bench-06e.md, cw-deploys/experiments/earth-3d-window.html, Earth-3D-Bench-07-Nov01/ (the pictures)
updated: 2026-11-01
---

# Report: the Earth bench, step 7 — the window (1 Nov 2026)

Built on `46f58e82`. One new page, `cw-deploys/experiments/earth-3d-window.html`; `experiments/index.html` gains its
entry and the Earth item's link now points at it (the bench is reached through the window page; *Next* at its foot opens
`earth-3d.html`). `earth-3d.html` itself, `js/`, the Time Machine and every story are untouched. Nothing under `CWVault/`
was stashed, restored or checked out. The pictures are in `Earth-3D-Bench-07-Nov01/`, 27 of them, 1.2 MB, the pane's own
screenshots and zooms (a 1,024 × 768 page drawn at about four fifths).

## Read first, and where the sources disagree

**Revision 1 of the worknote is not on disk.** The prompt says to read `Worknote-Deep-Time-Window-02.md` "and revision 1
beside it", and revision 2's frontmatter names it `Worknote-Deep-Time-Window.md`. There is no such file in `CWVault/`, in
the git history, in `~/Library/Mobile Documents`, `~/Documents` or `~/Downloads`. So "revision 1's colours and gradient"
and "revision 1's words" for the twelve plaques could not be taken from it. They are taken from what revision 1 left
behind: the sketch `Sketch-Earth-in-Squares-01.html` (its fifteen scenes, "what she would have seen", each with a colour
and a plaque text) and the Ideas Ledger's entry of 1 Nov. Fifteen became twelve by merging the three thinnest joins:
*Dust around a new Sun* (60 squares) into *Molten*; *The first big freeze* into *Rust* (one plaque, both sentences);
*Ice ages* (2.6 squares) into *Mammals and grass*, now *Mammals, grass and ice*, keeping its last sentence ("Everyone who
has ever lived is in the last square"). The "gradient" is read as a gentle run of lightness along each era, darker at its
old end, with handmade shading over it. When revision 1 turns up, the table `ERAS` in the page is twelve lines to replace.

**Where the worknotes and the prompt differ, the prompt was followed**, as it asked, except on one count where the prompt
is at odds with itself: the 12,000 window (below).

**The timeline's direction.** The bench's line runs today-left, the Earth's birth at the right. The window runs past-left.
The prompt says "now is a wall: what would run past today comes in on the left", which only makes sense with now on the
right, and the mockup draws the line past-left. So the bench's code is copied and drawn past-left: one function (`xOf`)
reversed, the flags' roles swapped (the left flag is the older end), the labels' rule mirrored. `earth-3d.html` is not
touched.

## What was built

**The page.** The page standard (doctype, charset, viewport, the Time Machine's icon as the bench's, `CW_VERSION
2026-11-01 46f58e8 · earth-3d-window step 7`); `check-deploys` no errors. It loads `cw-style.js`, `cw-time.js` and
`cw-panel.js`, no 3D. The left column is Glass Geometry's convention: *How this works* opens cw-panel.js's box with
placeholder words, marked as such in grey at the top; under a rule, *for the bench*, the A/B choice for the last million
and a readout of what loaded. The bulleted words *Window* and *Timeline*, in normal type, each bring their tool up or
take it down (both are up at the start; the word reads dark while its tool is up). No italic commands in the column:
the four scales stand to the left of the glass, *stretch*, *shrink* and *back* to the right of the line, *Next* at the
bottom right in italics.

**The scale in use.** Glass Geometry marks no command in use (its commands rename, *Show Glass Only* / *Show
Construction*; its items open boxes). The Earth bench marks a pressed word in ink with a copper underline. The mockup's
copper word stands: the scale in use is in copper, no underline.

**The four windows**, one shown at a time, each 100 squares a block in ten columns of ten, time down each column and
then right, past at the top left:

| command | a square | a block | squares | glass | plaques |
|---|---|---|---|---|---|
| *4.6 billion years* | 1 million years | 100 million | 5,000 in five rows of 1,000; 4,600 past, the rest of the fifth row clear | the twelve eras | the twelve |
| *The last million years* | 1,000 years | 100,000 | 1,000 | ice age / warm spell, A or B | Ice age, Warm spell; from 130,000 years Hippos in London, Ice sheets, After the ice |
| *The last 100,000 years* | 100 years | 10,000 | 1,000 | graded like B | Ice sheets, After the ice |
| *The last 12,000 years* | 10 years | 1,000 | 1,300 in thirteen blocks (see below) | plain glass, each square its own shade | none |

**The 12,000 window's thirteenth block.** The prompt says 1,200 squares, twelve blocks, *and* year 0 after the ice at the
left edge *and* now at 12,026 *and* a square ten years. Twelve blocks of ten-year squares from year 0 reach the year
12,000 after the ice, which is 2000 CE; now is 26 years, 2.6 squares, further on. Three ways out were weighed: squares
of 10.02 years (the decades drift by 2.6 squares across the window, so *the 1760s* would not be the 1760s); a left edge
at 12,000 years ago (then the label *year 0 after the ice* is 26 years off the Time Machine's own count); or the first
window's own device, a last block that runs on into clear future glass. The last was built: a thirteenth block whose
first 2.6 squares are past (the gold rim on the square that holds now, 2020–2030), the rest clear. Every square is a true
decade, the labels are true, and the window is twelve blocks and a stub. Easy to change if Michael prefers another.

**The glass.** The silver came (`#b9c0c4`) behind every block, 2 pt between blocks, 5 between rows, 4 between the lines
of a row when a narrow layout wraps the blocks, a frame round the whole; a hairline between squares (1 px, 0.6 under 6
px squares); handmade shading by a hash (lightness ± 3–4 %, saturation ± 3 %), a one-pixel sheen along each square's
top edge when squares are 7 px or more. Clear future glass `#e6e8e4`. The square that holds now wears a thin gold rim
(`#c9a227`, gold as the design says, not the site's copper). On rollover the era (or the ice run, or the period) stays
lit and the rest is dimmed by mixing 35 % toward the parchment; squares outside the line's span are dimmed 50 %.

**The last million, two ways** (bench only; *How this works*, or `?glass=B`). A: two colours, ice age `#93adb9` and
warm spell `#7fa86a` (the sketch's). B: graded, the ice from `#7a9cad` at the threshold to `#e6eef1` at −130 m, the
paler the lower the sea, warm spells in the warm colour. The last 100,000 is graded like B. Each square's sea is the mean
of five readings of the curve across it (`CW.curveAt`).

**The threshold.** The prompt asks for the line between the two "so the warm spells fall where the interglacials do (the
sea within a few metres of today's, or higher)". In the repo's curve (Spratt and Lisiecki's stack to 798,000 years,
Bintanja and van de Wal beyond) the older interglacials peak ten to twenty metres below today, so the literal rule picks
too few. Warm spells per threshold, over 1,000-year squares:

| threshold | warm spells | which |
|---|---|---|
| −5 m | 6 | 410–394k, 329–321k, 213–211k, 124–119k, 7–0k |
| −10 m | 8 | adds 953–946k, 776–773k, 575–570k |
| −15 m | 13 | adds 698–685k, 616–613k, 494–490k, 201–197k; still no 845–860k |
| **−20 m** | **16** | every one of the eleven interglacials (MIS 1, 5e, 7, 9, 11, 13, 15, 17, 19, 21, 25), some as two or three peaks, plus MIS 5c at 101–98k |
| −30 m | 18 | adds MIS 5a and more substages |

**−20 m is the threshold built** (`WARM_THRESHOLD_M`; `?thr=` tries another). The warm spells it gives, in the window:
956–940k, 859–845k, 782–770k, 700–684k, 616–606k, 579–566k, 499–485k, 414–392k, 388–385k, 331–312k, 239–235k,
217–204k, 203–196k, then the periods: Hippos in London 130–115k (warm), Ice sheets 115–11.7k (ice, with the sea's own
colour in B — MIS 5c at 101–98k shows warm inside it, honestly), After the ice 12–0k (warm). Michael and Eileen's "one
warm spell per block" holds loosely, as revision 2 said it would: MIS 7 and 15 come as two or three short peaks.

**Plaques.** Ice age: "Sheets of ice cover much of the north, and the sea is low enough to walk to some islands." Warm
spell: "Warm, like now. Forests grow where the ice was." (placeholders, as the prompt gave them). The periods' plaques are
the period's label and the first sentence of its summary from `stories/deep-time-periods.json`: *Hippos in London — A
warm spell, about as warm as now.* *Ice sheets — The cold came back.* *After the ice — The great ice sheets melted and did
not come back.* A plaque is ivory (`#fbf7ea`), a fine border, a 5 px stripe of the era's colour down its left, below the
glass in a slot that keeps its height so the page does not jump; on rollover by mouse, by finger while it is down.

**Events.** Taken from `stories/deep-time-events.json` alone: it is the one store since 9 Oct (its 111 after-the-ice
records are the same records as `stories/timeline-events.json`, by id, so that file adds nothing; the September
`after-the-ice-events.json` is the holding file those records replaced, and its ids live on as the store's `aliases`).
The bench itself loads no event file. 185 events, 74 deep (by `ma`) and 111 after the ice (by `year`, through
`CW.yearToMa`); each falls in the square its date lies in, inside each window's span: 57 squares carry events on the 4.6
billion window (all the after-the-ice ones in the last square), 26 on the last million, 60 on the last 100,000, 88 on the
last 12,000 (some squares carry two or more: *Tambora · Frankenstein* in the 1810s). An event square is backlit in a
brighter version of its own colour (lightness +22 %, saturation +18 %); a pale square (the palest ice, the clear-ish
tans) has no brighter, so it goes three quarters of the way to gold. The label under the cursor names the square's events.

**Labels.** The 4.6 billion window: *0*, *1 billion* … *4 billion* on the left of each row only, counting forward from the
window's start (4,600 million years ago). The others: under the block edges — *1 million, 900,000 … 100,000, now*;
*100,000 … 10,000, now*; *year 0 after the ice, 1,000 … 11,000, now* (12,000 is dropped where it would collide with
*now*). The label under the cursor says *ago* — *3,292 million years ago*; *410,000 years ago*; *5,000 years ago · Caral ·
Great Pyramid · …* — and on the 12,000 window the ordinary decade as well: *the 1760s · 260 years ago · Tupaia's map*;
*about 5,000 BCE · 7,020 years ago · Green Sahara · Copper*; *the 2020s · now*. A square of the future says *not yet*.

**The timeline.** The bench's age row (6c, 6d), copied: the track, the two copper flags with their years and the gap's
length (the mirrored rule), the ends under the line and what one pixel is worth, the 380 ms glide, `finish()` for the
pane. Not copied: the thumb (the age) and a tap on the line — this page has no Earth to set an age on; the words
*stretch*, *shrink*, *back* stand one under the other to the right. **shrink:** with the flags at `fa`, `fb` on a line
`[a, b]`, the new line is `a − (fa − a)·k` to `b + (b − fb)·k` with `k = (b − a)/(fb − fa)`, the exact inverse of the
stretch; if it would run past today the near end stays at today and the whole length comes in on the older side; the
Earth's birth is the other wall. **The step up:** after a shrink, a stretch or a back, if the line's older end is beyond
the window in use, the window steps up to the smallest scale that holds it. (The prompt names the shrink only; a stretch
by the flags on the whole line while the 12,000 window is up gave a span the window could not show, so it steps up
too.) The window never steps down by itself.

**Together.** Dragging across squares sets the line to those squares with the glide, as a stretch, so *back* returns; a
tap is the one square. A span from the window keeps its size exactly — a decade on a 676 px line is finer than a year a
pixel, and the *one pixel* line then says *under a year*; the flags' stretch keeps the bench's floor of a year a pixel.
The lit squares are always the flags' span, so a flag dragged lights and unlights squares as it goes, and a glide shows
the squares sliding to the new span. Pressing a scale keeps the line's span if the window reaches it (the big window
then shows one lit square for the last million), else sets the line to the window's whole.

**Moving code into `js/`.** Using the bench's timeline on a second page means two copies of about 120 lines (`STR`,
`xOf`/`maOf`, `pixelStep`, `roundedWord`, `flagWord`, `gapWord`, `placeLabels`, `yearsWord`, `spanEndWord`,
`renderStretch`, `glideStretch`, `finishStretch`, `doStretch`, `stretchBack`, `setFlag`, the pointer handlers) and 14
lines of CSS. What would move: those, as `js/cw-stretch.js` — `CW.stretchLine(trackEl, { from, to, direction, words,
onChange })` returning `{ state, stretch, shrink, back, goTo, finish, render }` — with the direction, the thumb and
*shrink* as options, so the bench keeps today-left and its thumb and this page takes past-left and shrink. Why: one rule
for the labels and the pixel step, one glide, and shrink and the step-up reaching the globe when the window joins it.
Stopped there, as the prompt says: the copy is in the page and `earth-3d.html` behaves as it did.

## The colour-blindness check

Every neighbouring pair on every window, and each era against its own backlit event square, through Machado,
Oliveira and Fernandes's 2009 matrices at full severity (protanopia, deuteranopia, tritanopia), the difference as
CIEDE2000 after simulation; under 10 counts as a fail, 10 to 15 as weak. The script is in the session's scratchpad; the
numbers:

| window | pair | normal | protan | deutan | tritan |
|---|---|---|---|---|---|
| 4.6 billion | Orange sky / Rust | 22.9 | 12.1 | **8.0** | 16.6 |
| 4.6 billion | Soft creatures / Eyes and shells | 12.2 | 10.3 | **9.7** | **7.6** |
| 4.6 billion | Eyes and shells / Green ashore | 43.7 | 43.0 | 41.4 | 14.9 (weak) |
| 4.6 billion | Dinosaurs / Mammals | 18.0 | **2.6** | **6.2** | 36.0 |
| last million A | Ice age / Warm spell | 27.1 | 27.1 | 26.7 | **6.4** |
| last million B, 100,000 | ice at the threshold / Warm spell | 29.4 | 29.5 | 29.3 | **6.1** |
| events | Snowball, Mammals, Ice age, Warm spell, plain glass against their own event square | 13.5–14.6 | | | (weak) |

The other eight era pairs, era against clear glass, plain against clear, and the palest ice against the warm colour
pass (19 to 53). **Fails:** three era pairs for red-green blindness — *Dinosaurs / Mammals* (`#73a03a` / `#b8a043`) is
the worst, near-identical to a protanope — and ice against warm for tritanopia (rare, about one in 10,000). The palest
ice against its own event square failed at 5 before the gold rule and passes now. These are the sketch's colours,
standing for revision 1's, so they are left as they are for Michael's ruling; a second channel (texture by era, as the
ledger suggested) or a shift of the Mammals' tan toward ochre would clear the worst.

## Checked in the pane on the Mac, 1,024 × 768

The page at the pane's own size, `devicePixelRatio` 2, the glass 642 px wide (the left column 160, the scales 150), the
track 676 px. Every item of the prompt's list:

- **Each window** (`page-1024x768-opening.jpg`, `big-window-close.png`, `page-last-million-A.jpg`,
  `last-million-A-two-colours.png`, `last-million-B-graded.png`, `page-last-100000.jpg`, `last-100000-graded.png`,
  `last-12000-the-1760s.png`): squares of 5.6 px on the 4.6 billion window (its 60 px gutter for the row labels), 6.2 on
  the million and the 100,000, 4.7 on the 12,000; the scale in use in copper; the labels as above.
- **Labels and plaques:** rollover on *An orange sky* at 3,292 million years (`rollover-an-orange-sky.jpg`: the label
  beside the cursor, the plaque below, the era lit and the rest dimmed); on the last million a warm spell at 410,000
  (`plaque-warm-spell-410000.png`), an ice age at 500,000 (`plaque-ice-age-500000.png`), Hippos in London at 120,000
  (`plaque-hippos-in-london.png`), After the ice at 5,000 with its six events; on the 100,000 Ice sheets at 70,000 and
  After the ice at 5,000 (`plaque-after-the-ice-100000.png`); on the 12,000 the 1760s (Tupaia's map) and the 1810s
  (Tambora, Frankenstein).
- **A and B** by the words in *How this works* (`how-this-works-box.jpg`) and by `?glass=B`: the same warm spells, the
  ice graded in B, gold events on the palest squares.
- **A drag on each window:** across row 2 of the big window (`drag-across-squares-row-2.jpg`): the line glided to 3,476
  to 3,245 million years ago, one pixel 170,000 years, the 232 squares lit and the rest dimmed, *back* present; by
  finger-style pointer events on the last million from 410,000 to 360,000 (`finger-drag-last-million.png`: the plaque up
  while down, *Warm spell* then *Ice age* as the finger crossed, the label above the finger, both gone on release, the
  line at 410,000 to 359,000); on the 12,000, eight squares from the 1760s (266 to 186 years ago, *one pixel: under a
  year*).
- **The flags** (`flags-dragged-in-their-years.jpg`, `flags-on-the-last-12000.jpg`): the left flag dragged in shows its
  year to its left, the right flag's to its right, the gap's length between; the lit squares followed each flag as it
  moved; *stretch* and *shrink* appeared.
- **stretch** (`after-stretch.jpg`): from the whole, flags at 3,425 and 920 million years, the line ran between them,
  one pixel 1.9 million years, the flags back at the ends, the words gone, *back* present; the window stepped up from the
  12,000 to the 4.6 billion.
- **shrink, the wall and the step up** (`after-shrink-the-wall-and-the-step-up.jpg`): the line at the last 12,026 years
  (the 12,000 window), flags at 7,220 and 3,010 years ago: the whole fitted between them makes 34,300 years, which would
  have run 8,600 years past today; today stayed at the right end, the line became today to 34,300 years ago, one pixel 25
  years, and the window stepped up to the last 100,000 with the last 34,300 years lit. A shrink with no wall, on the big
  window, grew the line on both sides.
- **back** (`after-back.jpg`): the line returned to the last 12,026 years with the glide, the lit squares with it; the
  window stayed at the 100,000 (it does not step down); a second *back* returned to the whole and stepped up to the 4.6
  billion.
- **The tools' words:** *Timeline* took the line down and brought it back (`timeline-taken-down.jpg`); *Window* the glass.
- No console errors; `check-deploys` no errors (its warning lists the new page as untracked, as it is until the commit,
  with another session's palette pictures).

## At iPad size, 768 × 1,024 in the pane

The two-column layout holds (the media rule is at 760); the glass gets 386 px, so the blocks wrap: five a line, two lines
a row, squares of 6.3 px on the big window (`ipad-768x1024-the-4-6-billion-window.jpg`), 673 px tall, the timeline below
it; on the 12,000 window seven blocks a line, 5.3 px squares (`ipad-768x1024-the-last-12000.png`; the picture before
the came was painted per block, `…-before-came-fix.jpg`, shows the empty slot that fix removed). A finger-style drag of
eight squares on the 12,000 window set the line to 266–186 years ago. At 1,024 × 768 (iPad landscape) the page is the
Mac's.

**What a finger cannot do.** Pick one square: at 4.7 to 6.3 px a square is a tenth of a fingertip, so a tap lands on
some square near the meant one and a drag's ends are approximate — the design's answer, that the glass picks spans and
the line picks years, stands, and the plaque-while-down lets her feel for an era. The plaque and the label hide under
the finger's own hand on the 12,000 window's single row (the label is placed 40 px above the touch; the plaque is below
the glass, clear of the hand). The hairline between squares is invisible by finger. Not tried on the real iPad or the
simulator this time: the prompt asked for the pane at iPad size.

## Needs Michael's eye

- **A or B** for the last million (the bench shows both).
- **The threshold −20 m**, against the prompt's "within a few metres": the stack's older interglacials never reach today's
  sea. Also the short double and triple peaks (MIS 7, 15) and MIS 5c showing warm inside Ice sheets.
- **The twelve eras and their words**, merged from the sketch's fifteen because revision 1 is not on disk; the gradient
  as read.
- **The 12,000 window's thirteenth block** (twelve blocks reach the year 12,000; now is 12,026).
- **The colour-blind pairs that fail**, above all Dinosaurs / Mammals.
- **The squares' size** at 1,024 wide: 4.7 to 6.2 px. The page is 1,180 wide at most; the left column (160) and the scale
  column (150) take 334 px with their gaps. A narrower scale column, or the scales above the glass, would give the glass
  a quarter more.
- **Window and Timeline as show/hide words** — the prompt says bulleted words "open tools"; with both tools up from the
  start, each word takes its tool down and brings it back. If they should do something else, say what.
- **The window never steps down** on a stretch or on *back*, only up.
- **The stack grows** with every window pressed and every drag, so *back* retraces them all.
- **The words of *How this works***, placeholders.
- **The timeline's bareness:** no events on the line (the mockup drew ticks and labels under it; the prompt's timeline is
  the bench's, which has none).

## Changed

**1 Nov, later — the selection fix** (`2026-11-01b`, `00a98f8b`). Michael, on the live page: dragging across the squares selected them as if they were text, and the highlight hid the colours. Two causes: the glass had no `user-select` rule (the timeline's track had one, copied from the bench), and a press that landed in the came, a block gap or the label row returned before `preventDefault`, so the browser began a text selection that then washed over the canvas. The window row and the plaque slot now carry `user-select: none` (and `-webkit-touch-callout: none`), and every press on the canvas prevents the default first. Checked in the pane: a drag from the came between two blocks out past the right edge of the glass selects nothing and still sets a span; an ordinary drag across squares as before.

New: `cw-deploys/experiments/earth-3d-window.html`. Edited: `cw-deploys/experiments/index.html` (the new item at the
top; the Earth item's link and meta), `cw-deploys/MANIFEST.md`, `CWVault/00-BOARD.md`. New: this report and
`CWVault/claude/Earth-3D-Bench-07-Nov01/`. Committed and pushed on Michael's word, `9e2cea4f`, this session's hunks only; the hash recorded in a second commit. Other sessions' uncommitted hunks (the Ideas Ledger, the Pool
Inbox, the Prompt Pool, the 3D shelf report, the deleted prompt and report files, the untracked vault files) stay as they
are; when this lands, it is this session's hunks only.
