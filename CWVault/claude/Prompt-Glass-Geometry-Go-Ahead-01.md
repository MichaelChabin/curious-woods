---
status: Ready, 24 Oct 2026. Michael's rulings on `claude/Audit-Glass-Geometry-Oct23.md`, and the go-ahead for the tidying steps and the retirement of the straightedge board. The rebuild (R2 onward) has its own prompt later.
role: Paste into Claude Code at the root of `_CW`. Follows the audit's order of work; settles the questions it left open as far as they bear on these steps.
related: Audit-Glass-Geometry-Oct23.md, Inventory-Glass-Stories.md, Series-Glass-Geometry.md, Prompt-Audit-Glass-Geometry.md
---

# Glass Geometry: rulings and go-ahead, part one

Thank you for the audit. It is clear, and its order of work stands. Below are the rulings that bear on the first steps, then what to do now. Rulings that bear only on the rebuild are recorded here so they are in one place, and are not to be built yet.

## Rulings

**1. The straightedge board retires.** Level `lines`, its page, its demo log, its line in `constructions.json`, its harness option. Two of its ideas are kept as notes for the Stained Glass board, not code: a free point placed outside the frame, and lines fainter outside the frame than inside. Add both to `Inventory-Glass-Stories.md` under Stained Glass, as open.

**2. Fullscreen is a word in the column**, as on the Time Machine, never the first touch. A story page may also offer a button that does the same thing. The page never sets `fullscreen`; the lab offers the word on every board.

**3. The standalone lab** (`active/glass-geometry.html`, level `both`) stays as it is, hanging in the gallery, until Stained Glass is rebuilt on the shell; then it is replaced. Its own powers (lead by edges, the eraser, minting, earned numbers, Full sheet) are held, not deleted, until then. Tidying touches it only invisibly.

**4. A picture behind the plane** is a shell feature, to be planned for in the renderer step: the story names the picture in the mount, and the record keeps a reference to it so a saved design remembers its picture. Transparent glass follows from it. Not built now.

**5. What she shares is the framed window.** No mat, vignette, noise or warm light; the glass inside the frame, with its came, and a plain edge. Not built now; recorded so the renderer step (T3) does not preserve the postcard styling as a requirement.

**6. Save, Open, Demo, sound.** Save keeps a construction and nothing else; Save as an image goes, since Share sends the window. Open lists her constructions and the built-in ones together, each with Play; the separate *Demo* word goes; a story's *again* is the same Play called from the page. The sound question leaves the lab: it belongs on the lab's intro page and in stories, and the lab reads the setting. Not built now, except as the tidying says below.

**7. The frame.** One frame on every board: a rectangle on the plane, in metres, present or absent by board. It is the crop: what is shared and what the plan counts. Zoom never changes what it contains, because it lives on the plane and not on the screen. It locks when something is built from it, or when she locks it with a button; until then it moves and resizes freely. A line pulled off a frame side is a segment parallel to that side, running until it meets the segments bounding its pane; the frame's four sides are the first four segments on the board and nothing more special than that. Not built now.

**8. The unit is the metre, everywhere.** One unit for the frame, the grid, the readouts and the plan. A Wright step is one metre at the starting resolution. The three units in the file today become one in the rebuild. Not built now.

**9. The gestures, one vocabulary for every board.** Tap a pane: colour it. Tap empty ground: the board decides. Drag from a segment: the board decides what grows. Drag from a point: a circle, where the board has circles. Two fingers: the view. A board fills these slots and adds no gesture of its own. This is the interface the audit's section 6 asks for; it is built in R4, not now.

**10. No exceptions.** The frame locks by the one rule above; a line or circle can be removed if nothing has been built from it, otherwise Undo; bigger panes lie under smaller, on every board; Glass Circles' column is the standard column. One mount call, with one word, `board`, naming the board; the page never sets `measure`, `fill` or `fullscreen`.

**11. The palette** stays one input to the shell, a list of colours plus clear. A global palette tool is wanted later (choose a painting; pick colours from an image; build from one colour and its complements) and will plug in there. Nothing to do now beyond keeping that input clean.

**12. The two-instance bench** (`experiments/glass-module-bench.html`) is kept, not deleted. If the experiments clear-out has removed it from the working tree, restore it.

## What to do now

Do the tidying steps T1 to T5 of the audit's order of work, then R1, in that order, with the rulings above. Nothing a child can see changes except where named. After each step: bump `CW_VERSION` and the `?v=` query, run `tools/check-deploys.sh`, and compare the three live pages (the standalone lab, Glass Circles, the Wright experiment) against the committed version the way the Time Machine tidying did.

**T1. Dead code out.** The drawing guide and its stack, `exportImage`, `toggleLines`, the ghost layer, the sound question's markup and styles, `CRAFT_SWATCHES`. Also, under ruling 6: make `playSound` read a setting (on by default, from storage under a key you name) rather than asking; this is the one visible change in T1 and it is nothing a child sees.

**T2. The harness.** Keep `tools/glass-log.js` honest through every move: the section headers it cuts on, or the harness updated, and the standard logs byte-identical after each step.

**T3. One scene renderer** for the screen, the thumbnail, the share preview and the postcard, with the postcard's texture as a pass after it. Under ruling 5 the texture pass is to be removable in one place; keep it for now so nothing visible changes.

**T4. Gather the boards.** Every `BOARD`, `WRIGHT` and `FRAMED` branch into two blocks in the file, one per board, called from where the branches were. Still flags, still one file, zero visible change. Report what the two blocks reach into; that report is the first draft of the shell's interface for R4.

**T5. One readout, one formatter**, taking the board's rule for whole numbers or ≈.

**R1. Retire `lines`** under ruling 1, re-reading every `FRAMED` path as Wright's.

Stop after R1 and report: what changed, what you checked, what the two board blocks of T4 reach into, and anything that surprised you. Then the rebuild prompt.

Where the audit or these rulings leave something open, leave it open and name it; do not invent.
