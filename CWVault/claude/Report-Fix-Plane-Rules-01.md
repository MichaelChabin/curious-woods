---
status: Report, 12 Nov 2026, for Michael. Built and checked in the browser pane on the Mac; reported before committing; committed and pushed on his word, "Commit and push", the same day (`76d45a54`).
role: What changed when the boards were brought to the plane's house rules (Ruling-The-Plane-02.md, rules 1, 5 and 7), file by file, with what she sees before and after; the two things the prompt asked to be reported and not changed; what the prompt did not expect.
related: Ruling-The-Plane-02.md, Prompt-Fix-Plane-Rules-01.md, Report-Survey-Plane-Tools-01.md, Fix-Plane-Rules-01-Nov12/ (eight pictures), Sketch-Powers-in-Glass-07.html
---

# The boards brought to the plane's rules

Four rules were fixed: no minus sign on an axis, fractions stacked, long numbers grouped with commas on the left and thin spaces on the right, and came never coloured. Every place the survey named was as the survey described it, so nothing stopped the work. Nine pages and two shared scripts changed, and one new sketch was made in the vault. Nothing was committed when this report was written.

Three things need Michael's eye before he says go:

1. **Same Glass with Fill off.** Every outline is now the same grey, so with Fill off the cuts can be told apart only by their labels, their Join lines and the key. The ruling accepts this ("by the glass alone"); it is a real change to how the bench reads.
2. **The stacked fractions on Glass 900 years ago are small.** The digits are 9 px, the shared code's size for a fraction beside 11 px whole numbers.
3. **Six pages changed only because they share the number code.** They now write 1,000 where they wrote 1 000. All six are plane tools. No page off the plane uses the shared number code, and no year passes through it.

## What changed, file by file

### `js/cw-number.js` (the shared number code)

- Long numbers: a comma every three digits to the left of the point, a thin space every three digits to the right.
- A new call, `CW.num.group`, groups a string of digits, for a page whose number is too long to be an ordinary number (Same Glass uses it).
- A new option, `halo`, on the two canvas calls: the number drawn over a 3 px band of the paper's colour. Glass 900 years ago's axis numbers had this halo already, in their own code; it moved here so the stacked fraction could have it too.

| | Before | After |
|---|---|---|
| A whole number | 1 710 830 | 1,710,830 |
| A decimal | 3.141592653 | 3.141 592 653 |
| A fraction's denominator (Same Glass's dial) | 1 over 10 000 | 1 over 10,000 |

### `js/glass.js` (every glass board; only Glass 900 years ago shows the change)

The axis numbers no longer carry a sign, and a fraction is drawn stacked by the shared code. The positions underneath stay signed. A whole number sits where it sat. A fraction on the x axis hangs with its top where a whole number's top is, so its bar is about 4 px lower than the middle of the whole numbers beside it.

| | Before | After |
|---|---|---|
| The point one unit left of 0 | −1 | 1 |
| The Gothic window demo, along the axis | −2, −3/2, −1, 0, 1/2, 1, 3/2, 2, 3, 7/2, 4 | 2, 3 over 2, 1, 0, 1 over 2, 1, 3 over 2, 2, 3, 7 over 2, 4 |

The improper fractions stay improper (3 over 2, not 1½), as they were.

### `active/geo-1-glass-circles.html` (Glass 900 years ago)

No change of its own: the new script addresses and the stamp, `2026-11-12 2a9c4e0 · glass 07c · words 02 · compass 2 · plane rules 1`. Pictures: `01-glass-900-gothic-window-after.jpg`, `02-glass-900-circle-on-0-through-1-after.png`. The survey's `glass-900-years-ago-axis-detail.png` is the before.

### `experiments/construct-coordinates.html` and `construct-coordinates-v2.html`

The numbers left of 0 and below 0 are written without the hyphen. One line each.

| | Before | After |
|---|---|---|
| Left of 0 and below it | -1, -2, -3 … | 1, 2, 3 … |

Pictures: `03-construct-coordinates-after.jpg`, `04-construct-coordinates-v2-after.jpg`.

### `experiments/fog-map.html`

| | Before | After |
|---|---|---|
| Under the pointer | 290 318 = 2 · 7 · 89 · 233 | 290,318 = 2 · 7 · 89 · 233 |
| The corner | far corner 1 510 × 1 133 = 1 710 830 | far corner 1,510 × 1,133 = 1,710,830 |

Picture: `05-fog-map-after.jpg`.

### `experiments/same-glass-bench.html`

- Every rectangle's lead is `#777777`, the grey the glass boards use, at the same 2 px and the same strength as before. The same grey is the line in each row of the key, and the outline that arrives when the tiles finish.
- The glass under Fill keeps its cut's colour, as light as it was (0.035). Fill is untouched.
- The bench's own grouping for very long numbers now calls the shared code, so those take commas and thin spaces too.

| | Before | After |
|---|---|---|
| The outlines, Fill off | each cut's colour | lead grey, all cuts |
| The line in a key row | the cut's colour | lead grey |
| The dot in a key row | the cut's colour | the cut's colour |
| Glass under Fill | the cut's colour, almost clear | the same |

Pictures: `07-same-glass-lead-grey.jpg`, `08-same-glass-fill.jpg`.

Still in the cut's colour, because they are not lead: the faint grid, the labels at the corners, the Join lines, and the brief 4 px flash round a rectangle when its label is tapped. A held number's own moving outline (copper first) is also unchanged. If any of these should be grey as well, say so.

### Six pages that changed only through the shared code

`active/glass-geometry.html`, `active/glass-multiplication.html`, `experiments/glass-module-bench.html`, `experiments/geo-2-glass-wright-window.html`, and the two above. Each has a new stamp and the new script addresses, and nothing else. What she could see differently: a grid number or a pane numeral of 1,000 or more now has a comma (Glass Multiplication's pane 1,024; any board zoomed far enough out for a grid line at 1,000), and a readout such as "area: 1,200".

### `CWVault/claude/Sketch-Powers-in-Glass-07.html` (new; 06 untouched)

- Commas on the left: "10⁸ = 100,000,000", "10⁻⁶ = 1 over 1,000,000", "This piece is 9,000,000,000 m²."
- The tint on every other group is gone.
- *Coloured came* is gone from View. *Came only* stays.
- A decimal (half steps) takes thin spaces after the point.
- One line the prompt did not ask for: `<meta charset="utf-8">` at the top. Without it the sketch read as garbled characters ("2â¿") when served to the pane. 06 has the same fault from a server and is left as it is.

The exponents are untouched: "2⁻⁶" stays. Picture: `06-powers-sketch-07.jpg`.

## The check

Each changed page was opened in the pane at 1,024 × 768 with no console errors.

- **Glass 900 years ago.** The line through 0 and 1, the circle on 0 through 1 and two more: the axis read 2, 1, 0, 1, 2. The Gothic window demo, taken to its end: as in the table above. No minus sign and no slash.
- **The search for a minus or a hyphen before a number written to the screen.** Three things are left:
  1. `cw-number.js` still writes a hyphen before a negative number if a page hands it one. No page on the plane does today (the grid numbers and Same Glass's axis numbers are made positive before they reach it).
  2. Powers 07 keeps "2⁻⁶" on the board, and in the column "2ⁿ from -6 to 6" and "from −6". These are exponents, which the ruling keeps. The column's hyphen and its true minus disagree with each other.
  3. Glass 900 years ago's date line reads "~11,100 after the ice". That is a tilde, not a minus; at small sizes it can be mistaken for one.
- **The page-standard check** (`tools/check-deploys.sh`): no errors on any page of this step. It reports two errors on another session's untracked files (`experiments/simple_rules/`), and the old warning that Glass Multiplication has no tab icon.
- Not checked: the iPad. The glass states harness was not run; the change to `glass.js` is confined to the axis numbers, which only Glass 900 years ago draws.

## Two things to report, not change

### 1. How colouring works on Glass 900 years ago

Michael is right, and the harvest's sentence describes the same code badly.

- She taps a colour in the Color box. The piece under the mouse then wears a thin copper outline as the mouse moves (a finger shows the outline only while it is down).
- A press on a piece and a release colours the piece that is under the tip **at the release**. A plain tap is exactly this, and it is the ordinary case: tap a colour, tap an enclosed space.
- If she slides between the press and the release, the outline follows and the piece she ends on takes the colour. Nothing pans meanwhile. This is what the harvest called "press, slide and release". It is a tap that forgives a slip, not a separate gesture, and the column's words say only "tap a color, then tap a shape."
- A press that starts on a point is always the point's, colour chosen or not. So press and slide from a point makes a circle, as he says.
- With no colour chosen, a press on a piece does not start the colouring gesture at all. (The survey says a piece then takes clear glass; I did not confirm that in this step.)

The code is `glass.js`, under *THE PIECE SHE MEANS* (revision 5, 31 Oct): `tipPressStart` at the press, `tapPane` at the release.

### 2. Full screen

The shared one is the newer. `glass.js`'s own was first built on 17–18 Oct and made a word in the column on 24 Oct. `js/cw-fullscreen.js` was written on 30 Oct for the Earth bench (steps 6b and 6c). Only `experiments/earth-3d.html` uses it. The Time Lab and the Time Machine each have a third and fourth copy of their own.

What differs:

| | `glass.js`'s own | `cw-fullscreen.js` |
|---|---|---|
| What fills the screen | the whole lab, column and all | one window; chosen words move into a small floating box over it, a slider's row along the bottom |
| The word | "Full screen", then "Exit full screen" | "Full screen" both ways |
| Where full screen is refused | nothing happens; a line in the console | the window fills the page instead, and Escape leaves |
| Where the device has none | tests the element only | tests the browser's own flag as well, so no word on an iPhone |

Moving the glass boards to the shared one would take:

1. One more script tag on the four pages that mount a board, and in the test harness.
2. About 25 lines in `glass.js` replaced by one call, with the resize, the column's layout and the re-homing of an empty board done in its `onChange`. One other place asks whether the screen is full (where the column's width is read) and would ask the shared code.
3. Two small additions to `cw-fullscreen.js`. Today it always lifts its word out of the column into the floating box, and it makes the word a button of class `word`; the glass column's words are a different element and class, and on a glass board the whole column comes along, so the word should stay where it is.
4. A choice that is Michael's: whether the word changes to "Exit full screen" (ruling R4 of 24 Oct, "it says what tapping it will do") or stays "Full screen" (the Earth bench). The two codes disagree, and one of them has to change.
5. A check on the iPad, where the platform draws its own X at the top left.

It is a small build, perhaps half a session with the iPad check. I did not start it.

## What the prompt did not expect

1. **The fog map's axis numbers are not grouped at all.** They are written plain ("1000", "1000000") by a different line from the readouts. The prompt named only the thin spaces, so I left the axis as it is. By rule 5 they should take commas; it is a one-line change.
2. **Same Glass had a second grouping routine of its own**, for numbers past sixteen digits, with an ordinary space. It now calls the shared code.
3. **The halo.** The stacked fraction needed the parchment halo the axis numbers already had, so the shared code gained a `halo` option. No other page passes it.
4. **Powers 06 has no charset line**, and reads garbled from a server. 07 has one.
5. **The retired Multiply and Ruling benches are still served** (the clear-out that moves them is another session's uncommitted work). They load the shared number code, so on the site they will show commas too until the clear-out lands.
6. **The board had no line for the plane survey, the harvest or the ruling.** This step's board entry names all three so the next session can find them.

## Files

Changed: `js/cw-number.js`, `js/glass.js`, `active/geo-1-glass-circles.html`, `active/glass-geometry.html`, `active/glass-multiplication.html`, `experiments/construct-coordinates.html`, `experiments/construct-coordinates-v2.html`, `experiments/fog-map.html`, `experiments/geo-2-glass-wright-window.html`, `experiments/glass-module-bench.html`, `experiments/same-glass-bench.html`, `MANIFEST.md`, `00-BOARD.md`, `00-DECISIONS.md`.

New: `CWVault/claude/Sketch-Powers-in-Glass-07.html`, this report, `CWVault/claude/Fix-Plane-Rules-01-Nov12/` (eight pictures).

`MANIFEST.md` also carries another session's uncommitted hunks (the clear-out). At the commit only this step's hunks go in.

The diff itself: `Fix-Plane-Rules-01-Nov12/working-tree.diff` (the thirteen tracked files of this step, without the other session's hunks in `MANIFEST.md`) and `sketch-06-to-07.diff`.
