---
status: Ready, 24 Oct 2026. The rebuild, steps R2 to R4 of `claude/Audit-Glass-Geometry-Oct23.md`, under the rulings in `claude/Prompt-Glass-Geometry-Go-Ahead-01.md`. Follows `claude/Report-Tidy-Glass-Geometry-01.md`.
role: Paste into Claude Code at the root of `_CW`. Three steps; stop and report after each; commit nothing until Michael says yes.
related: Audit-Glass-Geometry-Oct23.md, Prompt-Glass-Geometry-Go-Ahead-01.md, Report-Tidy-Glass-Geometry-01.md, Inventory-Glass-Stories.md, Series-Glass-Geometry.md, Worknote-Fraction-Window.md
---

# Glass Geometry: the rebuild, part one (R2 to R4)

Thank you for the tidying report. It is clear, the check is convincing, and the harness in `tools/glass-states/` is the right tool for what follows: run it after every step.

**The rule for this prompt: stop and report after each step, and do not commit until Michael has said yes to that step.** Read `claude/Prompt-Glass-Geometry-Go-Ahead-01.md` first; its twelve rulings govern everything here, and nothing below changes them. Then read `claude/Inventory-Glass-Stories.md` and `claude/Worknote-Fraction-Window.md`, because the shell being built here must serve every board on that list, not only the two that exist.

Where a ruling or the inventory leaves something open, leave it open and name it in the report. Do not invent.

## R2. One frame

One frame on every board that has one: a rectangle on the plane, in metres, written as an entry in the record so it saves, replays and undoes. Present or absent by board. It is the crop (what the thumbnail, the preview, the postcard and, later, the plan show) and nothing else until a board builds from it. It can be moved and resized by its sides and corners; it snaps to the grid at the current resolution (R3 adds resolution; until then, whole metres); it need not be centred on the origin. It locks when something is built from it or when she taps a *Lock* word; locked, it cannot be moved or resized, and Undo is the way back.

The Wright window's model becomes the frame plus its cuts, and its frame-sides become the first four segments on the board, with nothing else special about them. Its demo log and any saved Wright design replay from the old shape through a migration in the replay, as the record already migrates old values.

The home view fits the frame with a margin, as the series page says, on every board with a frame. The *Reset view* word returns to it.

Visible changes, named: the frame on the Wright window can be moved; it has a *Lock* word; the home view fits it. Nothing else.

**Stop and report.**

## R3. The grid given, with resolution

`plane.js` gains a way to set its lattice step directly, and a declared unit, the metre. The lattice shows from the start on every board, in the plane's own style; the Wright window's numbers along the bottom and left are the plane's tick numbers, not its own. Every snap in `glass.js` (the frame's sides, Wright's cuts, a tap that will later make a right triangle) asks the plane for the step instead of rounding on its own. A change of resolution is an entry in the record, so a replay reproduces it. Offer resolution in the column as one word, *Finer*, that steps whole → halves → tenths and back round; the inventory leaves open whether the child or the story sets it to start, so default to whole and name it in the report.

The three units in the file (200, 240 and 56 world units) become one metre, with the standard logs and the Wright demo migrated so their pictures are unchanged. If a log cannot be migrated without changing its picture, say so rather than forcing it.

Visible changes, named: the grid appears on every page; *Finer* appears in the column; the Wright window's numbers are the plane's. Nothing else. A child will notice this step; it is ruling 8 and the inventory's first ruling made real.

**Stop and report.**

## R4. The shell's interface, and Wright moved onto it

Write down, then build, the interface between the shell and a board, from the tidying report's list of what the Wright block reaches into and what the shell asks of it. Two things the report named as not yet in one place come first:

1. **One name for a pane.** Fills, hit-testing, sheets and the future parts list key on it. Make the key from the pane's geometry (its sorted vertices, rounded to the plane's tolerance), so circles-and-lines panes and Wright's rectangles share one scheme and a right triangle or an inscribed square will too. Saved records keep opening.
2. **The gesture vocabulary of ruling 9, as code, in one place.** The shell decides what was touched (a pane, empty ground, a segment, a point, two fingers) and calls the board's one hook for it; the board never sees a raw press. The five slots: tap a pane (shell: colour it); tap empty ground (board); drag from a segment (board); drag from a point (board, a circle where it has circles); two fingers (shell: the view). Undo as a word; full screen as a word in the column (ruling 2), on every board.

Then the rest of the interface: a board supplies its entries and how to replay them, its lead that is lead regardless of colour, its pane polygons, what it draws over the glass, its tips with their fade rules, which of its entries change the picture. The shell owns everything else, the geometry engine included, as a service a board may call.

Move the Wright block onto this interface as a separate file, `js/boards/wright.js`, registering itself as `CW.boards.wright`. The mount becomes one call, `cwGlass(host, { board: 'wright', palette, open })`; the pages stop passing `app`, `level`, `measure`, `fill` and `fullscreen`. The `circles` profile and the standalone `both` stay as they are inside `glass.js` for now, served by the same mount word (`board: 'circles'`, `board: 'euclid'`), and are moved in R5.

Visible changes, named: the full-screen word in the column on every board; otherwise none on any page. Run the two-instance bench as well as the three pages.

**Stop and report**, and include the interface as written: that document becomes `CWVault/20-SPECS/Spec-Glass-Shell.md` once Michael has read it.

## After R4

R5, Stained Glass rebuilt on the shell, waits for the Save/Open and Play sessions and for Michael's words; R6, the plan with its parts list; R7, mirror modes and the picture behind the plane. Not in this prompt.

## Every step

Bump `CW_VERSION` and the `?v=` queries; run `tools/check-deploys.sh` and `tools/glass-states/`; the nine standard logs byte-identical through `tools/glass-log.js` except where a migration is named; MANIFEST and the board updated in the same commit, when the commit comes. Report what changed, what was checked, what surprised you, and what is open.
