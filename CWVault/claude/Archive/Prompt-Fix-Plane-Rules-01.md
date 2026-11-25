---
status: Ready for Claude Code, 12 Nov 2026, once Michael has read it. From the "where are we on geometry" chat.
role: Bring today's boards and benches into line with the house rules for the plane. Small fixes only: what is written on screen and the colour of the came. No new tools, no refactor.
related: Ruling-The-Plane-02.md (read it first; it is the authority), Harvest-Plane-02.md, Report-Survey-Plane-Tools-01.md (your own survey, which says where each rule is broken)
---

# Fix the places where the boards break the plane's rules

Read `CWVault/claude/Ruling-The-Plane-02.md` first, whole. Michael ruled the eight questions from the survey on 12 Nov. This step fixes the places where the code disagrees with him. Your own `Report-Survey-Plane-Tools-01.md` says where those places are; check each against the code before changing it.

If the ruling and this prompt disagree, the ruling wins. If the code is not as described here, stop and report what you found. Don't guess.

## The fixes

### 1. No negative numbers on an axis (ruling, rule 1)

Numbers count outward from 0 and are positive in all four directions, the way `plane.js` already numbers its grid.

- `active/geo-1-glass-circles.html` (Glass 900 years ago): a circle on 0 through 1 writes "−1", and halves appear as "−3/2". No minus sign should appear. Check the Gothic window demo, which writes −2 to 4 along the axis.
- `experiments/construct-coordinates.html` and `construct-coordinates-v2.html`: both write "-1".

Change only what is written on screen. The signed numbers underneath stay.

**Leave alone:** the exponents in Powers in Glass. "2⁻⁶" stays. A negative power is not a negative number, and the story will explain the symbol.

### 2. Fractions are stacked (ruling, rule 5)

Glass 900 years ago writes its axis fractions with a slash ("3/2", "1/2", "7/2"). Write them stacked, the way every other page that shares the number code does. Use the shared code; don't write a new fraction routine.

### 3. Long numbers (ruling, rule 5)

Commas in threes to the left of the decimal point. Thin spaces in threes to the right. So: 1,710,830 and 3.141 592 653.

- `js/cw-number.js`: today it puts an ordinary space every three digits on the left and never groups the digits after the point.
- `experiments/fog-map.html`: thin spaces on the left today.
- The Powers sketch: thin spaces, and a tint on every other group. The tint goes.

**Before changing `cw-number.js`,** list every page that uses its grouping, on the plane or off it (the Time Lab and the timelines may). If any page that is not a plane tool would change what it shows, stop and report those pages with a before and after. Years are a known risk: don't let a year pick up a comma it did not have.

### 4. Came is never coloured (ruling, rule 7)

- `experiments/same-glass-bench.html`: the lead takes each cut's colour. Make it the lead grey the glass boards use. The glass keeps its colour per cut, almost clear, and *Fill* stays.
- The Powers sketch: remove *Coloured came*. *Came only* stays.

### The Powers sketch is a vault file

`CWVault/claude/Sketch-Powers-in-Glass-06.html` is not overwritten. Its changes (the commas, the tint, *Coloured came*) go into a new file, `Sketch-Powers-in-Glass-07.html`.

## Two things to report, not change

1. **How colouring works on Glass 900 years ago.** The harvest says "choose a colour, then press, slide and release on a shape." Michael says press and slide makes a circle, and colouring is a tap on a colour and then a tap on an enclosed space. Say exactly what the code does.
2. **Full screen.** `glass.js` has its own; a shared one exists and the Earth bench uses it. Say which is newer and what moving the glass boards to the shared one would take.

## Not in this step

These are ruled, but each is a build with its own spec to come. Don't start them, and don't change anything on their account:

- one resolution control that follows zoom, with *freeze resolution* and *change resolution*;
- prime colours picked by the child from her palette;
- hiding the came with a word, and see-through glass as a choice on every board;
- one way to colour, undo, save, share and go full screen across all boards;
- moving Same Glass onto the shared plane;
- anything in `outdated-files/`, and the tools outside the repo.

Still open, so don't invent an answer: the look of the resolution control when a story sets it, and the colour of the unity pane.

## Check, then stop

1. Open each changed page and check it by eye. On Glass 900 years ago, draw the circle on 0 through 1 and run the Gothic window demo; no minus sign and no slash should show.
2. Search every changed page for a minus sign or a hyphen in front of a number written to the screen. Report anything left.
3. Append to `00-DECISIONS.md`: "12 Nov 2026 — House rules for the plane ruled (Ruling-The-Plane-02.md). No negative numbers on an axis; fractions stacked; commas left of the point, thin spaces right; came never coloured."
4. Update `MANIFEST.md` and `00-BOARD.md` as the repo's rules ask.
5. Write `CWVault/claude/Report-Fix-Plane-Rules-01.md`: what changed, file by file, with a before and after for each thing she would see; the two things to report; anything you found that this prompt did not expect.
6. Show the diff and stop. Commit and push only after Michael says go.
