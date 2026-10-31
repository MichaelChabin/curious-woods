---
status: Built and checked 30 Oct 2026; committed and pushed on Michael's word the same evening ("Push this when it is ready") — revision 3 as its own commit first, then this one; the hashes are in the closing section.
role: What Prompt-Revise-Glass-900-Years-Ago-04.md asked for beyond revision 3 (the frame makes points, and enters the record when it becomes fixed), what was built, how it was checked, what needs his eye, and what is open.
related: Prompt-Revise-Glass-900-Years-Ago-04.md, Report-Glass-900-Years-Ago-Revise-03.md, cw-deploys/js/glass.js, cw-deploys/active/geo-1-glass-circles.html
pictures: Glass-900-Years-Ago-Oct30-Rev04/ (mac-*.jpg are the canvas alone from the pane at 1028 × 576, the unit 95 px; ipad-*.png are the whole screen of the iPadOS 26.5 iPad Air simulator, upright, the unit 66 pt)
---

# Report: Glass 900 years ago, revision 4

Built on the working tree as revision 3 left it (`709a1e8` plus revision 3's uncommitted `glass.js`), since this revision stands on that one: the arrangement of pieces, the table fixed from the first circle or line, the quarter units. Everything below was checked on this Mac in the app's browser pane with scripted pointer gestures, and on the iPad Air simulator (iPadOS 26.5) with real taps and drags.

## What changed

**The frame makes points.** Revision 3 said the frame's edges never make points and never enter the construction; revision 4 reverses that. The frame always sits on quarter units, which can be built from 0 and 1, so its edges count as lines she is given, the way a real table's edges would be.

- **The corners are points from the start.** Four points, `tbl:c:bl`, `tbl:c:br`, `tbl:c:tr`, `tbl:c:tl`, of a new type `table`, drawn as any point is. While the frame is free they move with it (`syncTableCorners`, called wherever the frame is set); once it is fixed they stay. A corner that sits where a point already is — 0 at the start, 1 when the frame is a unit wide at 0 — makes no point of its own: that point stands for it, and the corner's point comes back if the frame leaves it. The opening board therefore shows five points: 0, 1, and the corners at 6, (6, 3) and 3 (`mac-01`, `ipad-01`).
- **Crossings on the edges.** After a line or circle is replayed, where it crosses one of the frame's four edges — on the edge itself, not on the edge carried past the corners — a point is registered the way every crossing is (`detectTableX` through `regX`): one that lands within the merge radius of a point already there (1, where the first circle meets the bottom edge; a corner) is that point and makes no second one; a new one joins every line and circle it lies on, so it divides them into segments and arcs as any point does. The ids are the names revision 3 gave the same places — `tbl:l:<line>:<edge>`, `tbl:o:<circle>:<edge>:<k>` — so a design saved under revision 3 names the same vertices it now finds as points. She builds from them as from any point: a circle centred on the point the first circle makes on the left edge (`mac-05`, `ipad-04`: `centerId: tbl:o:2:left:1` in the record), a line through a corner (`mac-06`: `p1Id: tbl:c:tr`), a circle from a corner once the frame is fixed (`mac-07`: `centerId: tbl:c:br`, `edgeId: tbl:c:tr`).
- **Numbers.** A point on an edge that lies on an axis wears its number as any point there does, by the board's own rule (AXIS NUMBERS): at the opening 6 under the right-hand corner and 3 beside the top-left one; the first circle's crossing on the left edge reads 1, the circle centred there puts 2 above it, the corner circle's crossing on the bottom edge reads 3 (`mac-07`, `ipad-04`).
- **While the frame is free, a drag from a corner still resizes it**, the corner's point notwithstanding — the corner's own point loses to the resize, while 0 and 1 win as before (so a drag from 0 is still a circle). A circle can end on a corner while the frame is free: the snap finds the corner's point and the circle fixes the frame (`mac-02b`, `mac-02c`: `edgeId: tbl:c:br`). A line's second tap on a free corner is a point's tap and makes the line. Once the frame is fixed, a press on a corner is a press on a point: a drag from it is a circle, a tap begins a line (`mac-07a`, `mac-07`).
- **The frame enters the record when it becomes fixed.** Just before her first circle or line, `appendOp` writes `{ op: 'table', left, bottom, width, height }` (in units), and replay sets the frame there and its corners with it, so a saved design, a replay and a demo rebuild the same points. A record without one — a demo, a design saved before today — is fixed by its first circle or line at the frame in force (the opening frame, or the record's `init.table`), with the same points (`mac-13`: the Rose, its circles' crossings on the frame's edges as points). `init.table` stays as revision 1 left it: where the free table is, written when a drag ends.
- **Undo works as it did.** The record is replayed from the start after every undo, so a circle or line undone takes with it the points it made on the edges (`mac-08`, `ipad-05`: the corner circle undone, 3 gone from the bottom edge). Undoing back to no circles or lines takes the `table` entry with the last of them (`undoOp`) and frees the frame as before (`mac-09`, `mac-02d`: the record back to `init` alone, the table free, its corners moving with it again).
- **The arrangement of revision 3 is the one these points fall on.** It registers the construction's points in or on the frame first, then names the corners and crossings by the same names, so a name that is now a point is that point; a corner standing on 0, or a free table's corners, stay names resolved from the frame (`vtx`). A fill's record carries point ids where revision 3 carried names, with the same spelling. The frame is still lead, still crops the glass, and its edges still bound pieces (`mac-10`, `mac-11`, `mac-12`).

**The pages.** `glass.js?v=2026-10-30c` on the four pages that load it (the story, the lab, the Wright window, the two-instance bench), stamps `2026-10-30 709a1e8 · glass 04` on all four. Only `glass.js` and those stamps change; the other three boards do not — the harness proves it, below. The story's head comment says what changed.

## How it was checked

- **The boards that should not change.** The harness (`tools/glass-states/`) walked the circles board, the standalone lab and the Wright window on a worktree of `709a1e8` and on this tree, both runs in this pane: *identical in every state*, all three — canvas, visible markup, words, view, record and exports. (Against the revision 3 session's own runs the hidden-markup hash of the opening state differed, and so did the pushed tree's when run here: a difference between pane sessions, not between trees.)
- **Mac, in the pane** (the board 1028 × 576, unit 95 px), every item of the prompt's list: the opening with the corners as points and their numbers (`mac-01`); the top-right corner held out before any circle, 7 by 3 1/2, the size showing and the corner's point under the hand (`mac-02`), released (`mac-03`), put back; a circle from 0 to the right-hand corner while free, the circle snapping to the corner's point and fixing the table (`mac-02b`, `mac-02c`), undone, the table free again (`mac-02d`); a circle from 0 through 1, its crossing on the left edge with its 1 (`mac-04`); a circle centred on that point (`mac-05`); a line through the top-right corner (`mac-06`); a circle from the fixed right-hand corner, held and released, its crossing on the bottom edge with its 3 (`mac-07a`, `mac-07`); Undo removing that circle and its point (`mac-08`); Undo back to nothing, the table free (`mac-09`); the construction rebuilt and pieces against the edges coloured (`mac-10`); Save as *table 04*, the page reloaded, Open and Play: the same record (`table`, two circles, a line, two fills) and the same points (`mac-11`); Glass only (`mac-12`); the Rose demo played, its frame points (`mac-13`). The record read after each step: `init` → `table 0,0,6,3` → `circle` → … and, after Undo to nothing, `init` alone. The console is clean throughout.
- **iPad (simulator, upright, the unit 66 pt):** the opening, the corners as points (`ipad-01`); the top-right corner dragged by finger to 6 1/2 by 2 1/2 before any circle, the corners' numbers following (`ipad-02`), then put back; the first circle by finger, the table fixed, the crossing on the left edge with its 1 (`ipad-03`); a circle centred on that point, a line through the top-right corner by two taps, a circle from the fixed right-hand corner, its crossing on the bottom edge with its 3 (`ipad-04`); Undo by the word, the corner circle and its point gone (`ipad-05`).
- `tools/check-deploys.sh`: no errors. Two warnings, both old: Glass Multiplication's missing tab icon, and the three untracked photographs under `art/palette/` (revision 3's report names them; still not loaded by anything).

**Pictures**, in `Glass-900-Years-Ago-Oct30-Rev04/`:

| File | What it shows |
|---|---|
| `mac-01-opening-corners-as-points` | 0, 1, and the three corners as points, 6 and 3 numbered |
| `mac-02-corner-held-before-any-circle` | the top-right corner held at 7 by 3 1/2, the size showing |
| `mac-03-corner-released-7-by-3-and-a-half` | released: the corners' numbers read 7 and 7/2 |
| `mac-02b-…-held`, `mac-02c-circle-ends-on-the-corner-table-fixed` | a circle from 0 snapping to the right-hand corner while free; released, the table fixed |
| `mac-02d-undone-table-free-again` | that circle undone: the record `init` alone, the table free |
| `mac-04-circle-0-through-1-its-crossing-on-the-left-edge` | the first circle: the point on the left edge, 1 |
| `mac-05-circle-centred-on-the-point-the-frame-made` | a circle centred there: 2 above it |
| `mac-06-line-through-the-corner` | a line from the top-right corner through 0 |
| `mac-07a-…-held`, `mac-07-circle-from-a-fixed-corner-crossing-the-bottom-edge` | a circle from the fixed right-hand corner; its crossing at 3 |
| `mac-08-undo-the-corner-circle-its-frame-point-gone` | Undo: the circle and its point gone |
| `mac-09-undone-to-nothing-table-free` | Undo to nothing: the table free |
| `mac-10-rebuilt-three-pieces-coloured` | the construction rebuilt, pieces against the edges coloured |
| `mac-11-reopened-and-played-the-same-points` | *table 04* reopened and played |
| `mac-12-glass-only` | Glass only |
| `mac-13-the-rose-demo-played-its-frame-points` | the Rose: its crossings on the edges as points |
| `ipad-01-opening-corners-as-points` … `ipad-05-undo-removed-the-corner-circle-and-its-point` | the iPad walk above |

## What needs Michael's eye

1. **How crowded the frame's edges get with points.** Every circle that leaves the frame now puts a point where it crosses, and so does every line; with the Rose played (`mac-13`) the left and bottom edges carry a point at each crossing. The dots are the engine's ordinary dots, so the frame reads as any line does once it has a few. Whether that is right, or whether the edges' points want to be quieter, is his call.
2. **The corners' numbers read in the axis convention**, p/q — `13/2` for a corner at 6 1/2, `7/2` for 3 1/2 (`ipad-02`, `mac-03`) — while the size readouts while dragging read `6 1/2`. The prompt says a point on an axis gets its number "as any point there does", which this is; the two spellings side by side may want one rule.
3. **Three corner points stand on the opening board** before she has done anything (6, (6, 3) and 3 beside 0 and 1). The story's words still describe a board with 0 and 1 alone.
4. **A corner under a finger while free** shows the point's hover ring as a drag begins and resizes anyway (`ipad-02`): the point and the handle are the same place, and only the drag's outcome tells them apart.

## Open, and named, not decided

- **A design saved under revision 3** opens and draws by its names, which are now points of the same names; not checked with a saved file from that session (none was kept; *table 03* was saved in a different pane profile).
- **Revision 3's open items stand**: the move's quarter snap is a reading; a circle wholly inside the frame leaves the ring; a tap outside the frame in open ground undoes; the frame drawn as came once fixed is a choice; the size's numbers can stand off the canvas; a corner outside the drawing box cannot be grabbed (and, as revision 1 noted, the resize can carry a corner off the canvas, after which only a pan brings it back under the hand); the Circles and Lines box says nothing of the table.
- **The `table` entry in a stepped-through demo** is an empty step merged into the first circle's, so stepping shows the table fixed with that circle; nothing marks the moment on its own.
- **A line along an edge** (0 through 1 along the bottom) makes no points of its own: its cuts fall on 0, 1 and the right-hand corner, which stand.

## Not done

- **Not checked on a real iPad**; Save and Open, Share and full screen not tried on the iPad this time (the export and save code is unchanged since revision 1, which checked them there).
- **Not checked:** a design dropped on the window as a file.

## Committed

On Michael's word ("Push this when it is ready"), after the checks: revision 3's tree as its own commit, then this revision, each with its MANIFEST entry and board line, this session's hunks only; the Earth session's uncommitted hunks stay in the working tree. The hashes are recorded in the closing commit.
