---
status: Report — the Earth bench, step 7c, the mosaic page revised 2 Nov 2026 to Prompt-Revise-Earth-Bench-07c.md and Worknote-Deep-Time-Window-04.md, on a3a5cb37 (the page's last commit fc6ca96d), committed as d94dba59; checked in the pane on the Mac at 1,024 × 768 and at iPad size (768 × 1,024). Built to the prompt's "stop and report", then committed and pushed on Michael's word, 2 Nov ("Please commit and push").
role: What changed on the page, how the pull works and what its numbers are, where the brief was read two ways and which was taken, what the pane showed on the Mac and at iPad size, and what needs Michael's eye
related: Prompt-Revise-Earth-Bench-07c.md, Worknote-Deep-Time-Window-04.md, Report-Earth-3D-Bench-07.md (the 7b build this revises), cw-deploys/experiments/earth-3d-window.html, Earth-3D-Bench-07c-Nov02/ (the pictures)
updated: 2026-11-02
---

# Report: the Earth bench, step 7c — the mosaic (2 Nov 2026)

One page changed, `cw-deploys/experiments/earth-3d-window.html`, nothing else under `cw-deploys/` (MANIFEST gets its
entry). `earth-3d.html`, `js/`, the Time Machine and every story untouched. The working tree carries another session's
uncommitted clear-out of `experiments/index.html` and MANIFEST; it is not this session's and was left as it stands.
Stamp `2026-11-02b a3a5cb3 · earth-3d-window step 7c`. `check-deploys`: no errors (the two warnings are older and not this
page's). The pictures are in `Earth-3D-Bench-07c-Nov02/`, fifteen of them, the pane's own screenshots and zooms (a
1,024 × 768 page drawn at about four fifths; the iPad pictures at 0.8). **Committed and pushed on Michael's word, 2 Nov ("Please commit and push").**

## What was built

**Words.** The page's words say *mosaic* and *tiles* everywhere a child reads them: the three explanation lines, *How
this works*, the canvas's and the timeline's spoken labels, the bench readout. The title, *The Earth in squares*, is
kept as it was — the prompt says "on the page, the window is now the mosaic and its squares are tiles", and the title is
on the page, so it may want to follow; one line to change (`<title>` and the `h1`), yours to say.

**The timeline.** *stretch* is now *focus* (`WORDS.focus`); it does what stretch did. *shrink* is gone — the word, the
function and its hook. *back* stays.

**Pulling a flag.** Drag either flag past the end of the line. It travels on past the end (up to `LOOK.pullReach`, 48
px, after which the flag stops moving but the years go on counting), the grey line runs on under it, its year and the
span on the copper line count up live, and while it is held past the end it keeps adding years, faster the longer it
is held. On release the line rescales so that flag sits at its end again, the other flag stays at its year, and the
selection has grown; *back* returns. Now is a wall for the right flag, 4,600 for the left: a flag at a wall does not
travel past the end at all. When the line outgrows the mosaic in use, the mosaic steps up a scale, as it did for
shrink. The arithmetic, all in `LOOK`:

- the years added = (the distance past the end in px + `pullRate` × (t + t² ⁄ 2·`pullRamp`)) × the line's years per
  pixel, t the seconds held past the end; `pullRate` 60 px a second, `pullRamp` 1 s — the rate grows by another 60 px a
  second for every second held (a text editor's autoscroll, as the prompt says);
- so a hold adds, in lengths of the line's own pixels: 1 s 90 px, 2 s 240, 3 s 450, 5 s 1,050 (nearly two whole lines
  at 592 px), 10 s 3,600 (six lines). Each pull starts from the new scale, so pulls compound: two 10-second pulls
  multiplied a 1,000-year line by 37.
- The sum is worked out from the clock, not from frames, so a hold is right to the millisecond whether or not the
  page was drawing (the pane runs no frames while unlooked at; the checks below prove the formula to four figures).

**The line reaches 4,600 million years ago**, the mosaic's first tile (`LINE_END`; the Earth bench's own line still
stops at 4,567). The first 33 tiles are a fourteenth period, **Before the Sun**, 4,600 to 4,567, with the prompt's
placeholder words in its box; period 1, *Formation*, now starts at 4,567. Its colour is mine, a dark grey `#3b3a40`
(the cloud; the mockup has none), well apart from Formation's orange on lightness alone. The store's *Oldest grains*
event (4,567.3 million years, the first solids) falls in the last tile of Before the Sun by a third of a tile.

**The timeline under the tiles.** The track and the explanation line now run from the first column of tiles to the
last, not under the years on the right: at 1,024 wide the line is 592 px (from x = 3 to 595 in the glass box's 676), so
one pixel is 3.9 million years on the whole line where it was 3.4. On the 12,000 the right end is under the thirteenth
block's three columns, the `now` label beyond it in a gutter of its own (`LOOK.gutterNow`, 34 px).

**The mosaic: pointing names the period.** The label under the cursor is the period's short name — the fourteen of
the prompt's table, in `PERIODS` as `n`, Michael's to change — and on the last million *Ice age* or *Warm spell*; on
the 12,000, which has no periods, the tile's decade (*the 1760s*, *about 3,500 BCE*, *the first years CE*), the nearest
thing it has to a name. After the name come the tile's events (*Before the Sun · Oldest grains*; *the 1760s · Tupaia's
map*) and *now* for the gold tile. A tile with more than three events says how many (`LOOK.labelEvents`): the gold tile
of the 4.6 billion mosaic holds every event since the ice, 125, and used to list them all in one line off the page.
**While dragging the label is the span being chosen, in years** (*300 million years*, *33 million years*, *90 years*);
the 7b page showed the tile's year while dragging, so this is new, not "as now".

**Tap selects the period.** A press that does not move (3 px of slop by mouse, 8 by finger — `LOOK.tapSlop`,
`tapSlopTouch`) selects the whole period under it: its span becomes the selection and the line (`unitSpan`): on the
4.6 billion a period, on the last million the run of ice or warmth under it (one warm spell, one ice age), on the
12,000 the thousand-year block. A drag selects the tiles crossed; a tiny drag past the slop within one tile selects
that tile. By finger the same: lift without moving to select the period. The box and the name show while the finger
is down, as before.

**The line above the mosaic** drops its first sentence and is centred over the coloured tiles: *Each tile is a
million years. Each large square is 100 million. Each row is a billion.* / *Each tile is 1,000 years. Each large
square is 100,000.* / *Each tile is ten years. Each large square is 1,000.*

**The 12,000 mosaic is wider.** For it the glass and the timeline take the words' column too (`.main.full`), and
*focus* and *back* go under the line's right end beside *one pixel*; the other two mosaics keep their layout with the
words to the right of the line. At 1,024 wide the 12,000 is 808 px instead of 676, its tiles 5.54 px where they were
4.46 and the line 718 px; at 768 wide, 552 instead of 420, seven blocks a line, two lines, tiles 6.97 px where they
were 4.5. "As wide as the page allows" was read as the width of the page's main column with the left column kept;
taking the whole page (the left column moved above, as the narrow layout does) would give 992 px and tiles of 7 px at
1,024, at the cost of the column jumping when she picks the 12,000. Yours to say.

**How this works** carries Michael's words from the prompt, *focus* in copper, and under a rule marked *bench only* the
bench's switches as before (A / B for the last million, *year inside* / *a margin*, the readout). One thing in the words
is ahead of the page: "along with any events from that period. Tap an event to find out more about it" — this page's
timeline is the bare stretching line and carries no events yet; they come when the mosaic joins the globe (revision
4's *What comes next*).

**Bench hooks** (`window.cwWin`): `pull(i, px, sec)` makes a pull as the pointer would and lets go (i 1 the left flag,
0 the right), `tap(i)` and `unitSpan(i)`, `focus()`; `shrink` is gone. The element ids are the bench's: `flagA` and
`labelA` are the *left* flag (the older end), `flagB` the right.

## Checked in the pane on the Mac, 1,024 × 768

Every item of the prompt's list, by pointer events on the canvas and the track and by the hooks; the pictures as named:

- **The first 33 tiles, by drag** (`03-…`): a drag from tile 0 to tile 32 sets the line to 4,600–4,567, *33 million
  years* on the copper, the 33 tiles lit; the label said *33 million years* while dragging. **By pulling the left
  flag:** a tap on Formation (line 4,567–4,400) then the left flag pulled 48 px and held 2 s: the line to 4,600–4,400,
  the first 33 lit; a pull cannot pass 4,600.
- **Pulling either flag, short and held** (`05-…`, `06-…`): the left flag of a 186-million-year line (Dinosaurs, 252–66)
  pulled 40 px and let go at once — 12.6 million years added by the distance, 0.8 more by the 45 ms it took to let go,
  the line 265.4–66, the released value equal to the formula to the last figure. The right flag of that line pulled
  30 px and held 1.6 s: it reached today and stopped there. On the 12,000, a thousand-year block pulled 48 px and held
  10 s by the hook: ×6.1 (to 6,081 years); a second 10-second pull ×6.1 again (36,976 years).
- **The right flag at now, the left at 4,600:** on the whole line a real drag past either end moves nothing and the
  flag stays drawn at the end (`pull` null, the flags at 0 and 4,600).
- **The step up from a pull** (`08-…`): the second pull above took the 12,000's line past 12,026 years, and the mosaic
  stepped up to the last million with the last 37 tiles lit, *Last million* in copper.
- **focus and back** (`07a-…`, `07b-…`): flags at 4,450 and 4,420 on a 4,600–4,400 line, *focus* → the line 4,450–4,420,
  one pixel 25,000 years; *back* → 4,600–4,400 again. On the 12,000 with flags 418 years apart, *focus* → a 418-year
  line, *one pixel: under a year*.
- **The names on rollover and the span while dragging** (`02-…`): *Before the Sun*, *Early life*, *Life on land*, *Ice
  ages · now · 125 events*, *Before the Sun · Oldest grains* on tile 32; on the last million *Ice age*, *Warm spell*; on
  the 12,000 *the 1760s · Tupaia's map*, *about 3,500 BCE · Silk · Wheel*, *the 2020s · now*. Dragging over three
  blocks: *300 million years*; on release the label returns to the name.
- **Tap to select a period on each mosaic:** Dinosaurs → 252–66; Early oxygen → 2,450–2,200; on the last million the
  warm spell at tile 880 → 126,000–117,000 years ago (*9,000 years*); on the 12,000 the block holding tile 650 →
  6,026–5,026 years ago (*1,000 years*). A 2 px wobble is still a tap.
- **The line above each mosaic** (`01-…`, `04-…`, `08-…`): the three lines, centred over the tiles.
- **The timeline's ends under the tiles** (`01-…`, `03-…`): the track from x = 3 to 595, the first and last tile columns;
  on the 12,000 from 3 to 718, the last column of the thirteenth block.
- **The wider 12,000** (`04-…`): 808 px, thirteen blocks on one line, the words under the line's right end.
- `09-…`: *How this works* open. No console errors.

## At iPad size, 768 × 1,024 in the pane

The two-column layout holds (the media rule is at 760); the glass gets 420 px, the 4.6 billion wraps to five blocks a
line, two lines a row, tiles of 6.4 px, and the track runs from the first tile to the last of the first line, 336 px
(`10-…`). By finger (pointer events of type touch): a press on Early oxygen shows the name and the box while the
finger is down (`11-…`); a lift after a 5 px wobble selects the period, 2,450–2,200, the name and box gone (`12-…`); the
left flag pulled 30 px past the end and held 2 s: the line to 2,660–2,200, the formula's figure (`13-…`). The 12,000
takes 552 px, seven blocks a line and two lines, tiles 6.97 px, *now* after the thirteenth block on the second line; a
finger tap on a block selects its thousand years, *focus* and *back* under the line's right end (`14-…`). Not tried on
the real iPad or the simulator: the prompt asked for the pane at iPad size.

**What a finger cannot do**, as before: pick one tile at 5 to 7 px. The tap-to-select-a-period is the answer the
design gives it, and the 8 px finger slop means a wobble is a tap, not a one-tile drag.

## Needs Michael's eye

- **The title** *The Earth in squares*, kept; whether it becomes the mosaic's.
- **The pull's pace**: 60 px a second growing by 60 a second (`LOOK.pullRate`, `pullRamp`), and the 48 px the flag
  travels before it stops (`pullReach`). The flag stops moving while the years go on counting; its year and the span
  tell her it is still pulling.
- **Before the Sun's colour**, the dark grey; and *Oldest grains* in its last tile.
- **"As wide as the page allows"** read as the main column (808 at 1,024), not the whole page (992).
- **The label's events** capped at three names; the gold tile says *125 events*.
- **The 12,000's label**, the decade, where the other mosaics name a period.
- **The words of *How this works*** speaking of events on the timeline, which this page's line does not carry yet.
- Still open from 7b: the dim on rollover; the thirteen colours; A or B and −20 m; the million mosaic's years counting
  ago; year inside or a margin; the box over the timeline for a last-row period; the colour-blind pairs; moving the
  stretching line into `js/cw-stretch.js`.
