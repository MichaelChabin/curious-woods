---
status: Built and checked 30 Oct 2026; committed on Michael's word the same evening ("Push this when it is ready", given for revision 4, which stands on this one), as its own commit, `8f0d1e88`, just before revision 4's. Waiting on his look.
role: What Prompt-Revise-Glass-900-Years-Ago-03.md asked for beyond revision 1 (02: quarter units and the size while dragging; 03: the frame fixed from the first circle or line, and the frame as lead), what was built, how it was checked, what needs his eye, and what is open.
related: Prompt-Revise-Glass-900-Years-Ago-03.md, Report-Glass-900-Years-Ago-Revise-01.md, cw-deploys/js/glass.js, cw-deploys/active/geo-1-glass-circles.html
pictures: Glass-900-Years-Ago-Oct30-Rev03/ (mac-*.jpg are the canvas alone from the pane at 1028 × 648, the unit 95 px, or the pane's own screenshot where a box is the subject; mac-17 is the share image itself; ipad-*.png are the whole screen of the iPadOS 26.5 iPad Air simulator, upright)
---

# Report: Glass 900 years ago, revision 3

Built on `709a1e8` (the tree after revision 1 was committed and pushed). The prompt is revision 1's prompt rewritten twice; revision 1 is live, so this report is the delta: what the 02 and 03 lines changed. Everything below was checked on this Mac in the app's browser pane with scripted pointer gestures, and on the iPad Air simulator (iPadOS 26.5) with real taps and drags. Nothing is committed.

## What changed

**The table is free until her first circle or line, then fixed (03).** Setting up the table comes first, then the work on it. The table can be dragged — moved by its edge, resized by a corner — only while the construction has no circle and no line. From the first circle or line it stays where it is: a press on its edge is then a press on the board, so a tap there colours the pane whose edge it is, a drag pans. No Lock word; nothing is stored. Whether the table is fixed is read off the construction (`tableFixed`: are there any lines or circles), so New frees it, undoing back to no circles or lines frees it, and a design opened from Open is fixed or free by what is in it. On the screen the moment shows: the bare free table is a thin half-strength line; once fixed (and once there is glass against it, and under Glass only) its edge is drawn as came, the window's lead (`mac-09`).

**Quarter units, and the size while she drags (02).** The move and the resize both snap to quarter units (`TABLE_STEP`); the resize never goes under 1 by 1. While she holds the frame its width stands above the top edge, centred, and its height to the right of the right edge, centred, in 11 px Georgia in Payne's grey as every readout on the plane is: whole numbers and quarters in lowest terms, written as the prompt writes them, `6`, `6 3/4`, `4 1/4`, `2 1/4` (`mac-03`, `mac-05`, `mac-07`). They go when she lets go (`mac-06`). Revision 1 snapped the move to whole units; it now snaps to quarters too, my reading of "in both directions", so the frame's corners always sit on quarters.

**The frame is lead (03).** Its four edges bound pieces of glass as circles and lines do. The shape under a tap is found, on this board, in an arrangement of what lies inside the frame: each line cut to the frame and divided at the construction's points inside it, each circle's arcs inside the frame, and the frame's four edges, divided at everything on them. The vertices are the construction's points in or on the frame and the table's own: its corners and the places where lines and circles cross its edges. The table's vertices are named, never made — `tbl:c:bl` for a corner, `tbl:l:<line>:<edge>` for a line's crossing, `tbl:o:<circle>:<edge>:<k>` for a circle's — and a fill's record carries the names as it carries point ids; the place is worked out again from the frame and the construction whenever the pane is drawn or named, so no point exists, no entry enters the record but the fill itself, and a saved design reopens with its pieces (`mac-18`). A crossing that lands on a construction point takes the point's id (1, where the first circle meets the bottom edge). The face walk itself is the one the board has had since 2 October; it is given the frame's arrangement instead of the construction's segments and arcs, and every piece is bounded because the frame's inside is the only outside.

- Before any circle or line the whole table is one piece: a tap colours it, named by the four corners, and it follows the frame as she drags it (`mac-02` to `mac-08`: the blue table moved and resized with its glass). While the table is free, 0 and 1 on its bottom edge are not vertices, so the piece has no notch when the frame leaves them; once the table is fixed they are.
- A circle crossing the frame: the quarter disc between the first circle and the two edges, and the rest of the table, are two pieces (`mac-10`); with the second circle, the lens cut by the bottom edge, the piece between the second circle and the edge, the rest (`mac-11`); none of it makes a point, the record has the two circles and the fills and nothing else.
- A line: through 0 and 1 it runs along the bottom edge, fixes the table, and adds nothing to the arrangement (the edge stands for it); the whole table is still one piece. A line from 0 through the circles' crossing leaves the frame through its top edge, and the piece between it, the top edge, the left edge and the first circle's arc is a piece of its own (`mac-20`).
- Outside the frame there is no glass, so a tap there colours nothing; the construction is shown there and she can go on building there (`mac-15`, the third circle started from the crossing inside the frame and going out).
- The pieces' lead along the frame's edge is the frame's own came, full width, stroked after the clip (revision 1 noted the half-width lead there).

**A line waiting, a tap that does not finish it (03).** The press on a free table's edge used to cancel the line and begin a drag; now it only cancels. Elsewhere a tap that does not land on a point already only cancelled (29 Oct), and the next tap colours: checked (`mac-12`: the cancelling tap added nothing to the record, the next tap coloured).

**The pages.** `glass.js?v=2026-10-30b` on the four pages that load it (the story, the lab, the Wright window, the two-instance bench), stamps `2026-10-30 709a1e8` on all four. Only `glass.js` and those stamps change; the other three boards do not — the harness proves it, below.

## How it was checked

- **The boards that should not change.** The harness (`tools/glass-states/`) walked the circles board, the standalone lab and the Wright window on a worktree of `709a1e8` and on this tree: *identical in every state*, all three — canvas, visible markup, words, view, record and exports.
- **Mac, in the pane** (the board 1028 × 648, unit 95 px), every item of the prompt's list: the opening view (`mac-01`); the whole table coloured before any circle; the table moved by its top edge a quarter right and half up with its glass, the size showing, then released (`mac-03`, `mac-04`); enlarged from its top-right corner to 6 3/4 by 3 1/2 (`mac-05`, `mac-06`), shrunk to 4 1/4 by 2 1/4 (`mac-07`, `mac-07b`), back to 6 by 3 (`mac-08`); the first circle, the table fixed, a drag on its edge panning instead (`mac-09`); the quarter disc and the rest coloured separately, no new points (`mac-10`); the second circle and its pieces (`mac-11`); a line waiting cancelled by a tap, the next tap colouring (`mac-12`); Undo back to nothing, the table free again and moved a quarter up (`mac-13`); the whole table coloured and a circle drawn, then New, the table back at 6 by 3 and free; a circle started on the crossing inside the frame (`mac-14`); Glass only (`mac-16`); the share image cropped to the frame with the frame in lead (`mac-17`); Save as *table 03*, the page reloaded, Open and Play, the pieces and the frame back (`mac-18`); the Color box with Gaudi Full (`mac-18b`), the picker with the three Gaudí palettes first and Chartres chosen (`mac-19`; each of the three and Chartres picked, the grid unchanged since revision 1); lines against the frame (`mac-20`). The console is clean throughout.
- **iPad (simulator, upright, the unit 66 pt):** the opening view (`ipad-01`); the whole table coloured by a finger (`ipad-02`); the free table moved half a unit up by a finger on its top edge, its glass following (`ipad-03`); the first circle by finger, the table fixed with its edge in came (`ipad-04`); the piece between the circle and the frame's edge coloured on its own (`ipad-05`).
- `tools/check-deploys.sh`: no errors. Two warnings: Glass Multiplication's missing tab icon (old), and three untracked files under `art/palette/` — *Gaudi Full.jpeg*, *Gaudi Sea and Forrest.jpeg*, *Gaudi Fire and Sunlight.heic*, Michael's photographs, put there since revision 1. They are not the three paths the board uses (`glass-gaudi-*.png`, the conversions from revision 1); nothing loads them. Untracked, they stay off the deploy until someone adds them.

**Pictures**, in `Glass-900-Years-Ago-Oct30-Rev03/`:

| File | What it shows |
|---|---|
| `mac-01-opening` | 0, 1 and the free table, a thin line |
| `mac-02-whole-table-coloured-before-any-circle` | the whole table one piece, blue |
| `mac-03-table-moved-mid-drag-coloured` | the table held a quarter right and half up, `6` above and `3` beside, the glass with it |
| `mac-04-table-moved-released` | released: the numbers gone |
| `mac-05-table-larger-by-quarters-mid-drag` | the top-right corner held at 6 3/4 by 3 1/2 (the height's number off the canvas's right) |
| `mac-06-table-larger-released-no-numbers` | released |
| `mac-07-table-smaller-by-quarters-mid-drag`, `mac-07b-…-released` | 4 1/4 by 2 1/4, held and released |
| `mac-08-table-back-6-by-3` | restored |
| `mac-09-first-circle-table-fixed-edge-came` | the first circle: the table fixed, its edge now came |
| `mac-10-pieces-against-the-frame` | the quarter disc and the rest of the table, two pieces |
| `mac-11-two-circles-pieces-no-points-on-the-frame` | the lens cut by the bottom edge, the piece between the second circle and the edge |
| `mac-12-after-cancel-then-colour` | after a line waiting was cancelled and the next tap coloured |
| `mac-13-undone-to-nothing-table-free-moved-up-a-quarter` | undone to nothing: free again, moved a quarter up |
| `mac-14-circle-from-a-point-inside-mid-drag` | a circle started from the crossing inside the frame, measured |
| `mac-15-construction-with-glass` | four pieces coloured, the third circle running out of the frame |
| `mac-16-glass-only` | Glass only |
| `mac-17-share-preview` | the share image: cropped to the frame, the frame in lead |
| `mac-18-reopened-table-and-pieces-kept` | *table 03* reopened and played: the pieces and the frame back |
| `mac-18b-reopened-color-box-gaudi-full`, `mac-19-picker-gaudi-first-chartres-chosen` | the Color box; the picker |
| `mac-20-lines-against-the-frame` | the line along the bottom edge and the line through the crossing: the piece between it, the top edge, the left edge and the arc |
| `ipad-01-opening` … `ipad-05-piece-between-circle-and-edge-by-finger` | the iPad walk above |

## What needs Michael's eye

1. **The frame's feel when dragged.** It now jumps by quarters, a quarter of 95 px on the Mac, so the move reads as sliding more than it did; on the iPad the move took on the first try. The numbers appear the moment the press lands on the edge and go the moment it lifts.
2. **The moment it becomes fixed.** Nothing announces it but the edge: thin line before the first circle, came after. A press on the edge after that pans or colours as a press anywhere on the board does. Is that enough of a sign, or does the table want a word somewhere (the Circles and Lines box says nothing about the table yet)?
3. **How the construction looks outside it.** As before: lines and circles run across the edge unchanged, and now the pieces stop at a full-width came (`mac-15`). Pieces outside the frame cannot be coloured at all now; a tap there in open ground still undoes, as a tap in open ground has on this board since 29 October. The box words don't say so.
4. **The swatch grid** is unchanged since revision 1 (`mac-18b`).
5. **The three photographs** he has put under `art/palette/` under their own names: are they meant to replace the three PNGs, cropped by him? If so, they need converting to the three paths (the HEIC will not load in a browser); say the word.

## Open, and named, not decided

- **The move snaps to quarters** — the prompt says the resize does; the move is my reading.
- **A circle wholly inside the frame** leaves the piece round it the whole table's shape, as it always has (the ring; "the same temporary fix, not region subtraction"); the circle's own piece sits on top. If the whole table was coloured while free, a tap round such a circle makes a second fill of the same shape (named by 0 and 1 on the edge now) rather than repainting the first.
- **A tap outside the frame** colours nothing and, in open ground, undoes after the double-tap wait; on a filled region's old glass outside the frame (a revision-1 design) it pans.
- **Designs saved under revision 1** with fills straddling the frame still open and draw clipped as before.
- **The frame as came while the construction shows** (once fixed or once there is glass) is my choice, not the prompt's; the prompt says the edge is lead and says nothing of how it is drawn.
- **The size's numbers** can stand off the canvas when the frame is larger than the drawing box (`mac-05`): the number is placed, not clamped.
- **A corner outside the drawing box cannot be grabbed** (the window profile's rule; from revision 1).
- **Older items** from revision 1 stand: no upper limit on the frame's size; a point wins at a corner; the frame under Glass only takes a press before the pan; the recipe lines of the Gaudí palettes are empty; the picker's order on the other boards; the story's words describe the board before 29 October; the save box over the New Open Save box; the Open picker wider than an upright iPad's board; *Glass Only* vs *Glass only*; √3 gets no number; the name field on the iPad needs a tap before it takes typing.
- **The Circles and Lines box** says nothing of the table.
- **Prompt 04 is already in the vault** (`Prompt-Revise-Glass-900-Years-Ago-04.md`, "paste after revision 03 has been reported and accepted"): the frame's crossings and corners become real points she can build from, and the frame enters the log when it becomes fixed. Not built here. When it is, the named vertices of this revision (`tbl:…`) give way to points, and the arrangement built here is the one those points fall on; a design saved under this revision would need its `tbl:` names mapped to the points it then makes, or it opens as the pieces it has, which still draw.

## Not done

- **Not committed.** The prompt says stop and report. In the working tree: `glass.js`, the four pages' stamps, this report, the two prompts (02, 03), the pictures; MANIFEST and the board have their entries.
- **Not checked on a real iPad**; full screen not tried (the pane refuses it; the simulator was not taken there).
- **Not checked:** a design dropped on the window as a file; the Share image on the iPad this time (revision 1 checked it, and the export code is unchanged); Save and Open on the iPad this time (as revision 1).
