---
status: Report, 24 Oct 2026 (Claude Code), answering Michael's rulings and go-ahead of 24 Oct on `claude/Audit-Glass-Geometry-Oct23.md`: the tidying steps T1 to T5 and R1 built, checked and committed (b1d2c8a, ff57ca1, ac3efdf, e71159d, 1934fb7), not pushed. The rebuild prompt follows his read.
role: What changed in each step, what was checked and how, what the two board blocks reach into (the first draft of the shell's interface for R4), and what surprised. Written for Michael.
related: Audit-Glass-Geometry-Oct23.md, Inventory-Glass-Stories.md, Series-Glass-Geometry.md, Report-Tidy-Timeline-Graphics-01.md (the same kind of report for the Time Machine)
---

# Tidying Glass Geometry, T1 to T5 and R1

Six commits, one per step, each with its MANIFEST entry and its board line. Nothing a child can see has changed except where a ruling named it, and that is proved below rather than claimed. `js/glass.js` is 5,923 lines, from 6,562.

| Step | Lines after | What |
|---|---|---|
| T1 | 6,203 | the dead code out; sound a setting |
| T3 | 6,168 | one scene renderer |
| T4 | 6,303 | the two boards gathered into blocks |
| T5 | 6,302 | one readout, one formatter |
| R1 | 5,923 | the straightedge board retired |

T2 was a check at every step rather than a change, and is described with the checking.

## What changed

**T1, the dead code out.** The drawing-guide tool and everything that served it (its catalogue of five SVG models and their inline copies, the column stack that held it, the drag that pinned a stacked tool to the workspace, its picker mode, its layer and panel in the markup, its styles); `exportImage` and `toggleLines`, and with them the `showLines` switch nothing ever flipped; the ghost layer; the "may I use sound?" markup that had no script; and the palette file's craft row, which was loaded into a variable nothing read. The craft row on screen was always built from two chips of its own, so it looks the same. Under ruling 6, sound is now a setting the lab reads and never asks about: `playSound` and `unlockAudio` look at the browser key `cw-sound` and stay silent when it says `off`; on otherwise; nothing writes it yet, which is for the intro page and the stories.

**T3, one scene renderer.** The screen, the thumbnail, the share preview and the postcard each drew the glass and its came their own way. Now one function, `drawScene`, draws it for all four, over three primitives: one pass of came (a fill's outline or a sheet's outside, the lead lines, the frame), one way of stroking a lead line (a segment or an arc, snapped or not, one path or one at a time), and one drawing of the construction (lines to the edge of the view, or spanning their points). Each caller's habits are the function's options, named in its comment for the rebuild's renderer step to settle: fills largest-first or in the record's order; came after each fill or after all of them, in passes; the thumbnail without came; the screen's segment ends snapped; the Wright cuts as one path; the thumbnail's circles before its lines. The postcard's texture (the gradient and noise on each pane, the warm light over all) is one object, `POSTCARD_TEXTURE`, hooked into the scene, so ruling 5 (what she shares is the framed window, plain) is one deletion when the rebuild reaches it. Kept for now, as you asked.

**T4, the boards gathered.** Every `BOARD` and `WRIGHT` branch, which had been woven through the record's section, the screen's drawing, the press, the move, the release and the tips, is in one of two blocks, `linesBoard` and `wrightBoard`. Each is a closure returning what the shell calls: a fresh record, a reset, a replay of its own entries, its drawing, its gestures (press, move, release, the tap on a pane, the tap on empty ground), its tips with a fade rule each; the Wright block also gives its lead lines, a pane's rectangle as a polygon, which entries count as visible steps in a replay, the totals element, and its model for the Node harness. The shell calls them where the branches were, behind the same flags, so nothing moved for a child: still flags, still one file. Two things stayed in the shell on purpose and are named in the commit: the shared frame and every `FRAMED` rule (the crop of the thumbnail, preview and postcard, Save's level tag, Open's listing, the home view, two-finger and wheel panning, the demo list, the re-homing on a resize), because under ruling 7 the frame becomes the shell's on every board and those are its rules; and the replay of a board's entries by their shape rather than by the flag, because a record dropped from one board onto another has always replayed its entries, and that bug is for the bug pass.

**T5, one readout, one formatter.** The three formatters (the circle's, the lines board's, the Wright window's) are one, `readoutText`, taking the board's rule: `whole` (the Wright window, whole steps always), `approx` (the circle: a whole number where it is one, else ≈ to two places), and until R1 `exact` (the lines board's frame: exact to tenths or hundredths where it is, else ≈). The three drawings go through one label (11px Georgia in Payne's grey at 0.85, placed with its alignment) and one measuring line (the radius, the frame's diagonal). The Wright window's numbers along the bottom and the left take the same label.

**R1, the straightedge board retired.** Level `lines` is gone: the block T4 had gathered, the `BOARD` flag, the level's entry, every call into the block, the frame-stroking helper only it used, and the `exact` rule (the frame of the rebuild, which snaps to the grid, will want it back). Every `FRAMED` path reads as the Wright window's; the flag's comment lists the frame's rules that ruling 7 makes the shell's. The page, its demo log and its harness script moved whole, in their folder layout, to `outdated-files/glass-lines-retired-2026-10-24/`; Halves left the constructions manifest; the harness lost its `board` option; the page's row left the Experiments index; a redirect sends its old address to the Wright window; the two ideas you wanted kept are notes under Stained Glass in the inventory, which is committed with them. What came in with the lines board and stays: a fill that holds several panes (a sheet), because every reader of a fill goes through it and a saved record may hold one. One named change: a record of the retired board, which began with a frame and no seeds, opens on an empty board now; before R1 it opened as the board, and without a guard it would have broken the lab. The two-instance bench is restored with its row (ruling 12); the 16 October clear-out's copy of it in its own outdated folder is that session's and was left.

## What was checked, and how

**The check.** The three live pages, and the lines board until it retired, walked through the same states on the committed tree and on the working tree, and hashed at each: the canvas bitmap, the visible markup (hidden elements and whitespace apart), the column's words with their presence, the view, the record (fill ids normalised, since the lab names them by the clock), the share preview, and the postcard with its noise seeded. The states: the opening; a real gesture on the canvas held mid-drag and then released (a circle from 0 through 1 with its measure; on Wright a line pulled off the top side and the right handle held out, with their readouts; on the lines board a side held and dragged); a demo or a standard construction played to its end; a pane tapped; Show map and Glass only; Share's preview; the postcard. Every visible hash is identical after every step; the only hashes that differ from the committed tree are of the full markup, which no longer holds the dead hidden elements T1 removed. The nine standard logs and Wright come out byte-identical from `tools/glass-log.js` after every step; the face tests pass; `tools/check-deploys.sh` is clean.

**How it was done, and why that way.** The app's browser pane stops drawing frames when it is hidden, and this session was not open in a window for most of the work: a canvas hash read there was a stale frame, which cost an hour to find. Headless Chrome ran the walk cleanly, and then Chrome left the machine mid-session; Firefox would not open its remote protocol. So the walk is a harness page, `tools/glass-states/glass-states.html`, that mounts the module from a served tree with the frame loop on timers instead of animation frames and pointer capture tolerated for scripted gestures, driven from inside the pane by script; a tiny Node server with CORS serves each tree and receives the results; `compare.js` diffs two runs. The clock is frozen for the hashed frame, because the snap ring pulses by it. It is in `tools/` for the next step; the rebuild will want it.

**Not checked:** Safari, the iPad, a phone width, and the lab with sound on (the harness does not hear).

## What the two blocks reach into

This is the first draft of the shell's interface for R4, read off the two blocks' headers (the lines block is in the T4 commit, ac3efdf, and gone since). A board reaches into the shell for:

- **The record:** the entries (`operationLog`), appending one, and replaying.
- **The geometry** (the lines board only): points, lines and circles, adding a point and integrating it, the point-on-line test, sorting a line's points, the segments, crossing detection, the duplicate tolerance. The Wright window touched none of it, which is the clearest sign that a board need not.
- **The shared frame and the plane:** the frame rectangle, the inside test, the frame on screen; the plane's unit frame, zoom and pan.
- **Fills and the face walk:** the fills, the live ones, recolour and dissolve, the pane key, a fill as a polygon, the sheet's outside, the hit test; the lines board also the shape under a tap.
- **The gesture state:** the interaction state, the selected point, where the press began, the ghost line, the first tap, the thresholds; the Wright window also the pan state.
- **The demo:** whether a replay is active, and the fork.
- **The palette:** the chosen colour, the remove sentinel, the default glass.
- **Drawing:** the context, world to screen, the colours and widths, the lead pass, the lead lines, the construction drawing, Glass only.
- **Sound, the numbers, the host, the window tap.**

What the shell asks of a board, as the blocks answer it: a fresh record; a reset; replay this entry if it is yours; your lead lines; a pane's polygon; draw what is yours over the glass; take this press, move or release if it is yours; a tap on a pane; a tap on empty ground; your tips with their fade rules; which of your entries change the picture. The Wright block answers all of that in about 330 lines. The seven items of the audit's section 6 are these, with two differences the blocks revealed: the shell's gesture code still decides *which* hook to call, in its own order, so the vocabulary of ruling 9 is not yet one place; and the pane's name is still two schemes (point ids for circles and lines, a rectangle in steps for Wright), which the shell's fills, hit test and parts list all key on.

## What surprised me

- **Two of the four drawings differed in ways that only the check could see.** The Wright window strokes its cuts as one path; the exports stroke one at a time; at a T-junction the antialiasing differs by a pixel's shade. The thumbnail draws circles before lines at 80 percent alpha, the screen lines before circles. Neither would have been noticed by eye; both are kept as options and named for the rebuild to settle.
- **The pane stops drawing when hidden.** Not a fault in the lab, but a trap for any check that reads a canvas in the pane while nobody is watching. The harness avoids it; the memory notes it.
- **Chrome disappeared from /Applications during the session.** If that was you, nothing here depends on it now; if it was not, worth knowing.
- **The lines board put its frame into the geometry; the Wright window did not touch the geometry at all.** Gathering them showed how different the two were underneath, and how much lighter the second kind is. The Wright block is the shape to copy.
- **A record of the retired board would have broken the lab** without a one-line guard, because its first entry has no seeds. The guard is the one behaviour R1 changed.
- **The `exact` rule for the frame's numbers had only the retired board for a user.** It went with it; the rebuild's frame will want it back.
- **The experiments index and MANIFEST both carry another session's uncommitted hunks.** Each commit here staged only this session's hunks of them (HEAD plus my edits), as the memory's method says, and the bench's row is back in the working copy so the clear-out's commit, when it comes, keeps it.

## Left open, not invented

- Full screen stays as it was on the Wright window (first touch, Exit word) until the rebuild makes it a column word (ruling 2); the standalone and Stained Glass Circles never asked for it.
- The `fullscreen` and `measure` options the pages pass stay until the one mount call of ruling 10.
- A design saved on the retired board (level `lines`) in anyone's browser library is listed by no mount now. The page was an experiment; if a child saved on it, her design is still in her browser, unreachable.
- The replay of a record dropped across boards by its shape, named in T4, is for the bug pass.
- The clear-out's copy of the bench in `outdated-files/experiments-retired-2026-10-16/` is that session's to remove.
- Not seen on the iPad.

## Where things are

Commits b1d2c8a (T1), ff57ca1 (T3), ac3efdf (T4), e71159d (T5), 1934fb7 (R1), on `main`, not pushed. The check harness: `tools/glass-states/`. The retired board: `outdated-files/glass-lines-retired-2026-10-24/`. The audit: `claude/Audit-Glass-Geometry-Oct23.md`. The board entry: "24 Oct — Glass Geometry tidying".
