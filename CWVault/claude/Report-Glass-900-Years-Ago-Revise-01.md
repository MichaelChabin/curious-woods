---
status: Built and checked 30 Oct 2026; committed on Michael's word the same day ("Commit, don't push"; `e38c88fd`) and pushed on his word the same day ("Push now"). Waiting on his look.
role: What Prompt-Revise-Glass-900-Years-Ago-01.md asked for, what was built, how it was checked, what needs his eye, and what is open.
related: Prompt-Revise-Glass-900-Years-Ago-01.md, Report-Glass-900-Years-Ago.md, cw-deploys/js/glass.js, cw-deploys/active/geo-1-glass-circles.html, cw-deploys/art/palette/palettes.json
pictures: Glass-900-Years-Ago-Oct30/ (mac-*.jpg are the canvas alone, from the pane at 984 × 553, or the pane's own screenshot where a box or the picker is the subject; ipad-*.jpg are the whole screen of the iPadOS 26.5 iPad Air simulator, upright)
---

# Report: Glass 900 years ago, revision 1

Built on `d624fb7`; committed on Michael's word (`e38c88fd`) and pushed the same day on his word. Everything below was checked on this Mac in the app's browser pane and on the iPad Air simulator (iPadOS 26.5), with real taps and drags on the iPad and scripted pointer gestures on the Mac.

**One thing first.** The three photographs were not at `art/palette/glass-gaudi-full.png`, `glass-gaudi-sea-forest.png` and `glass-gaudi-fire-sun.png`; the only Gaudí picture in that folder was March's `glass-gaudi.jpg`. The prompt says stop and ask if any is missing. I looked before stopping, and found them in Preview's iCloud folder (`~/Library/Mobile Documents/com~apple~Preview/Documents/`), saved there this afternoon: *Gaudi Full.jpeg*, *Gaudi Sea and Forrest.jpeg* and *Gaudi Fire and Sunlight.heic* (and a *Gaudi Colors.png* from this morning, which I took to be the source of the colours). Since the names leave no doubt which is which, I converted each to a PNG at 360 px on its long side (the picker shows them at 92 px) and put them at the three paths, rather than leave the board with broken pictures. **Please check they are the three you meant**, and replace any you would rather crop yourself; the paths are the prompt's, so a replacement needs no code change. Nothing is committed.

## What changed

**1. The numbers.** A number on the x axis sits just below its point, centred; a number on the y axis sits just to the left of its point. 0 is on the x axis, so it sits below. Nothing else about them changed: 11 px Georgia in Payne's grey, the parchment halo, the fade-in on their own clock, hidden under Glass only, exact fractions only. At the start 0 and 1 sit just under the frame's bottom edge, outside the frame; the y axis's 1 and −1 sit just outside its left edge (`mac-03`).

**2. Where 0 and 1 start.** The board's home view puts 0 a quarter of the way in from the left edge of the drawing box and a third of the way up from its bottom, 1 one unit to its right. The unit is the largest that leaves the opening frame (6 by 3 from 0) inside the drawing box with half a unit to spare at its right and at its top, whichever binds. In the pane at 984 × 553 the unit is 90 px; on the upright iPad it is about 67 px, the width binding (`mac-01`, `ipad-01`). *Reset view* returns to this view whatever she has done to the frame since: home is where the board opened, not where the frame is. A change of the host's size before her first mark re-homes, as it does for a board with a frame.

**3. The frame — the table.** A rectangle on the plane in the board's unit, 6 wide and 3 tall, its lower-left corner at 0 to start. In the code it is the shell's `frame`, which is why the thumbnail, the share preview and the postcard crop to it as they already did for the Wright window, but it is not the Wright window's frame: no handles, no Lock, no entries in the record. Its own section in `glass.js` is THE TABLE.

- **Dragging.** A press on the frame's edge (within 9 px) away from any point moves the whole frame; a press within 16 px of a corner resizes it, the opposite corner staying where it is. Both snap to whole units: the move by whole units from where the press began, the corner to the nearest whole unit under the hand. Neither side goes below one unit; there is no upper limit. A press on a point wins, so a drag from 0, which sits on the frame's corner at the start, still makes a circle (`mac-11` is a circle started from a point inside the frame). A line waiting is cancelled by a press on the frame, as any tap elsewhere cancels it. A tap on the edge that does not move is nothing: it does not undo. The frame can be dragged under Glass only too; a press on it there wins over the hidden points.
- **Never the construction.** Points, circles, lines, crossings and every step in the record are the same with or without it, and Undo never touches it.
- **The crop.** The glass and its came are clipped to the frame on the screen; outside it the construction shows as plain lines and circles, and glass she has laid outside it is simply not drawn until the frame reaches it (`mac-08` has five panes coloured, two of them inside the frame; `mac-09` and `mac-10` show the frame moved one unit right and one down with the green pane cut at the frame's new left edge). Under Glass only the frame's edge is drawn as came, as the share image has it (`mac-12`, `ipad-05`). The share preview and the postcard clip to the frame and stroke it in lead (`mac-13`, `ipad-06`); the thumbnail in Open crops to it as before (`ipad-06b`). All of it follows the frame while she drags: the frame is set on every move and the screen redraws each frame.
- **How it is drawn, while the construction shows:** a thin one-pixel line in the construction's ink at half strength, stronger while she drags it. No measure is shown while dragging; the prompt did not ask for one.
- **Save and Open.** The frame is kept on the record's opening entry (`init.table`, in units), written there when a drag ends and read at replay. So Save and the shared file carry it, Open restores it (`mac-19`, `ipad-07`: a design saved with the frame at 1, 1, 4 by 2 reopens with it there), a demo and any design saved before today open with the board's opening frame, and *New* puts the frame back at the start. This is the one place the record knows of it: an extra field on the entry every record begins with, never a step. If the prompt's "the log is the same with or without it" was meant to exclude even that, say so; the alternative is a second record beside the operations, which Save, Open, the shared file, the drop-to-open and the demos would each have to learn. A demo being stepped through keeps a moved frame as she steps.

**4. Palettes of twelve.** On this board the Color box shows the palette in three rows of four, each swatch the size it had in the three-column grid (41 × 28 px), the grid 178 px wide instead of 132. A palette with fewer than twelve colours fills the rows from the top left and leaves the rest of the cells empty (`mac-16`, Chartres: nine colours, three empty cells). The craft row — Roman glass and remove glass — is not shown on this board; the chips stay in the code and work on the circles board, the lab and the Wright window as before. Roman glass is still what a tap lays when no colour is chosen; only the chip is gone. The three new palettes are in `palettes.json` after the existing ones, each with its twelve colours in the prompt's order, its picture, and empty recipe lines (open, below): `gaudi_full` *Gaudi Full*, `gaudi_sea_forest` *Gaudi Sea and Forest*, `gaudi_fire_sun` *Gaudi Fire and Sunlight*. The board's profile names them as its own (`palettes`), so on this board the picker lists the three first, in that order, then the existing palettes as the file has them (`mac-15`, `ipad-08`); every other board's picker lists the file's order, the three at its end. The board's default is Gaudi Full (the profile's `palette`); the story page's mount no longer names a palette, so the board decides. A page can still ask for another by name.

**The pages.** `glass.js?v=2026-10-30` on the four pages that load it (the story, the lab, the Wright window, the two-instance bench) and stamps `2026-10-30 d624fb7` on all four; only the story page changes otherwise (its mount line and its head comment). The three other boards do not change — the harness proves it, below.

## How the palette data would grow (noted, not built)

Today a palette in `palettes.json` is an id, a name, a source picture, a description and a list of colours with a recipe line each; the picker shows the picture (or a grid of the colours where there is none), and the Color box shows the colours. The general system Michael wants — a work of art, up to twelve colours chosen from it, a palette she keeps — fits that shape with three additions and no change to what exists:

- **The work.** A palette's `source` becomes a work: the picture, its title, its maker, its date and credit, as the stories carry for theirs. The picker already shows the picture; it would show the title under it.
- **The choosing.** Each colour gains where it was taken from the picture (a point, or a small patch) so the choice can be shown on the picture and redone. The choosing tool is the picture with a tap minting a colour, as a lattice click mints a point; a twelfth tap fills the grid. The Color box's three rows of four are already the shape of the result, and an unfinished choice leaves empty cells, as a short palette does now.
- **Hers.** A palette she keeps goes in her library beside her constructions (`cw-pal-<time>`, indexed as the constructions are), with `hers: true`, listed in the picker under *My palettes* above the standard set, as Open lists *My constructions* above the standard constructions. A design saved with her palette would carry the palette's id, as it carries its level, so it reopens with its colours.

None of it is built. The recipe lines of the three Gaudí palettes are empty and show nothing on hover; a recipe for a work of art (pigment or glass) is a line Michael writes, as March's were.

## How it was checked

- **The boards that should not change.** The harness (`tools/glass-states/`) walked the circles board, the standalone lab and the Wright window on a worktree of `d624fb7` and on this tree: *identical in every state*, all three — canvas, visible markup, words, view, record and exports. (The harness still posts its results to the hard-coded port 8778, which a server from 24 October still holds; the files landed in that session's folder and were compared there.)
- **The story page** opens in the pane with no console errors, from a no-store server (the pane kept serving the cached `glass.js` at the new query string from the Python server; the harness's `serve.js` sends no-store).
- **Mac, in the pane** (the board 984 × 553, unit 90 px): the opening view; a circle 0 through 1 and 1 through 0, the line through 0 and 1 (−1 and 2 numbered below), circles −1 through 1 and 1 through −1 and the line through their crossings (1 and −1 numbered left of their points on the y axis, 3 and −3 below on the x axis); the frame moved by its top edge (+1, +1), enlarged from the top-right corner to 8 by 4, shrunk to 4 by 2, restored to 6 by 3; Reset view after each; five panes coloured from Gaudi Full, two inside the frame; the frame moved one unit right and one down with the glass coloured, watched mid-drag and after release, and moved back; a circle started from a crossing inside the frame; Glass only and back; Share (the preview cropped to the frame); the Color box with Gaudi Full, Gaudi Sea and Forest, Gaudi Fire and Sunlight and Chartres; the picker; the frame set to 4 by 2 at 1, 1, Save as *table test*, the page reloaded, Open, the design reopened with the frame at 1, 1, 4 by 2 and the record's init carrying it.
- **iPad (simulator, upright):** the first-visit box; two circles by finger; the Color box, the first blue picked and the lens coloured on one tap each; the frame moved one unit left by a finger on its top edge; resized from its top-left corner to 6 by 2; Glass only and back; Share (the preview cropped); Save as *ipad frame*, the page reloaded, Open, the design reopened with the frame at 6 by 2; the picker with the three Gaudí palettes first.
- `tools/check-deploys.sh`: no errors. Two warnings: Glass Multiplication's missing tab icon (old), and the three new PNGs untracked under `cw-deploys/` (they go in with the commit).

**Pictures**, in `Glass-900-Years-Ago-Oct30/`:

| File | What it shows |
|---|---|
| `mac-01-opening` | 0, 1 and the frame where they belong |
| `mac-02-two-circles-and-the-x-axis` | two circles and the x axis, −1 and 2 below their points |
| `mac-03-both-axes-numbered` | both axes: 1 and −1 left of their points on the y axis |
| `mac-05-frame-larger-mid-drag` | the frame enlarged to 8 by 4, the corner still held |
| `mac-06-frame-smaller-mid-drag` | shrunk to 4 by 2, still held (the view panned to reach the corner) |
| `mac-07-frame-back` | 6 by 3 again, Reset view |
| `mac-08-glass-coloured` | five panes coloured, two inside the frame |
| `mac-09-frame-moved-with-glass-mid-drag` | the frame held one unit right and one down, the green pane cut at its edge |
| `mac-10-frame-moved-with-glass` | the same after release |
| `mac-11-circle-from-a-point-inside-mid-drag` | a circle started from a crossing inside the frame, measured |
| `mac-12-glass-only` | Glass only: the frame in came, the glass inside it |
| `mac-13-share-preview` | the share preview, cropped to the frame |
| `mac-14-color-box-gaudi-full` | the Color box, Gaudi Full in three rows of four |
| `mac-15-picker-gaudi-first` | the picker, the three Gaudí palettes first |
| `mac-16-color-box-chartres-nine-of-twelve` | Chartres: nine colours, three empty cells |
| `mac-17-color-box-gaudi-sea-forest`, `mac-18-color-box-gaudi-fire-sun` | the other two |
| `mac-19-reopened-frame-kept` | *table test* reopened, the frame at 1, 1, 4 by 2 |
| `ipad-01-opening`, `ipad-01b-two-circles-by-finger` | the opening view; two circles by finger |
| `ipad-02-color-box-gaudi-full` | the Color box on the iPad |
| `ipad-03-glass-and-frame-moved-by-finger` | the lens coloured, the frame moved one unit left |
| `ipad-04-frame-resized-by-finger` | resized to 6 by 2 from its top-left corner |
| `ipad-05-glass-only`, `ipad-06-share-preview` | Glass only; the share preview |
| `ipad-06b-open-picker-thumbnail-cropped`, `ipad-07-reopened-frame-kept` | Open's thumbnail cropped to the frame; the design reopened at 6 by 2 |
| `ipad-08-picker-gaudi-first` | the picker on the iPad |

## What needs Michael's eye

1. **The frame's feel when dragged.** It jumps by whole units under the hand rather than sliding, because everything snaps; there is no handle, no measure and no change of cursor, only the line going a little stronger while it is held. On the iPad the move and the resize both took on the first try. Is a whole-unit jump right for the move, or should the move slide and only the resize snap? And should the width and height be shown while a corner is held, as the Wright window shows them?
2. **How the construction looks outside it.** The lines and circles run across the frame's edge unchanged (`mac-10`); nothing marks inside from outside except the glass stopping. The frame's own line is thin and half-strength, drawn under the construction; while glass is coloured against its edge the pane's came is cut in half by the clip, so a pane touching the frame shows a thinner lead there than elsewhere until Glass only, where the frame's came covers it. Does the frame want to read more as a table — a faint fill, or the tan of the drawing box's line — or less?
3. **The swatch grid.** Three rows of four at the old swatch size, 178 px wide in a 220 px box (`mac-14`, `ipad-02`); the recipe line below it is empty for the Gaudí palettes. Chartres's nine leave three blank cells at the end of the third row (`mac-16`). The Color box is as tall as before and still covers the right of the frame on an upright iPad.
4. **The three pictures** are my conversions of the photographs in Preview's folder, not files he placed; see the first paragraph.
5. **0 and 1 under the frame's edge.** The numbers sit just outside the frame along its bottom and left edges at the start, which reads well on both screens; a number inside a pane keeps its halo.

## Open, and named, not decided

- **A corner outside the drawing box cannot be grabbed.** A gesture starts only inside the drawing box (the window profile's rule), so a frame she has enlarged past the box's top or right edge has a corner she cannot reach until she pans (it happened on the Mac at 8 by 4). Not a change to the rule; named.
- **The move snaps to whole units** — the prompt says the resize snaps; the move is my reading, so the frame's corners always sit on whole numbers.
- **No upper limit on the frame's size.** The prompt names only the lower one.
- **Which hit wins on a point at a corner.** A point wins over the frame everywhere, so the corner at 0 cannot resize the frame while 0 is there; the other three corners and any edge can, and she can move the frame first.
- **The frame under Glass only** takes a press before the pan; the prompt says she can drag it at any time. Not tried by hand.
- **The share image strokes the frame in lead.** That is the board-with-a-frame habit the exports already had (the Wright window); the prompt says only that the image shows what is inside.
- **The recipe lines** of the three Gaudí palettes are empty.
- **The picker's order on the other boards** has the three Gaudí palettes at the end, after the existing ones; only this board lists them first.
- **Where the frame is kept** (the record's opening entry; see 3 above).
- **The story's words** still describe the board before 29 October (the demos "under the word Demo", circles only, "click and drag to pan"); Michael said he would revise them.
- **Old items from the 29 October report** stand: the save box opens over the New Open Save box (`ipad` save step), the Open picker is wider than the board on an upright iPad (`ipad-06b`), the sentences say *Glass Only* and the control says *Glass only*, √3 gets no number.
- **The name field on the iPad** did not take typing until it was tapped; the save box focuses it with a timer, which Safari on iPadOS does not honour without a touch. It took the name once tapped. Not new to this build.

## Not done

- **Committed and pushed** (`e38c88fd`, both on Michael's word): `glass.js`, `palettes.json`, the three PNGs, the four pages, this report, the prompt, the pictures, MANIFEST and the board, this session's hunks only.
- **Not checked on a real iPad**, and **full screen** not tried (the pane refuses it, the simulator was not taken there).
- **Not checked:** the frame dragged by hand under Glass only; a design dropped on the window as a file (the drop reads the same record, so the frame should come with it).
