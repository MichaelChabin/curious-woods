---
status: Report, 24 Oct 2026 (Claude Code), step R3 of `claude/Prompt-Glass-Geometry-Go-Ahead-02.md`: the grid given, with resolution. Built and checked, **not committed** — Michael's yes first. R4 waits on it.
role: What R3 changed, what was checked and how, what surprised, and what is open. Written for Michael.
related: Prompt-Glass-Geometry-Go-Ahead-02.md, Prompt-Glass-Geometry-Go-Ahead-01.md, Report-Rebuild-Glass-Geometry-R2.md, Inventory-Glass-Stories.md
---

# R3: the grid given, with resolution

Built on R2's commit (bb4b8dd). `js/glass.js` is 6,050 lines; `js/plane.js` 245, from 221. Stamps `2026-10-24g bb4b8dd`, `?v=2026-10-24g` for `glass.js` on the three pages and for `plane.js` on all seven pages that load it (the lab, Stained Glass Circles, the Wright window, Glass Multiplication, the module bench, Same Glass, Drain the Sea).

## What changed

**The metre.** `plane.js` declares one unit, `CW.METRE`, 200 world units: the distance from 0 to 1 that Glass Geometry has always had, so every record that counts from its seeds counts in metres with no change, and the nine standard logs are byte-identical. The Wright window's step was 56 world units; it is a metre now. Its demo log is regenerated in the new shape (the board's first entry no longer carries a unit), and its old shape, and the 19 October shape before it, replay through the migration to the same panes, cuts and fills, checked in Node.

**The lattice step is set directly.** `plane.setLatticeStep(step)` fixes the grid's step in metres, and `plane.latticeStep()` answers with it; the old tied-to-zoom and frozen modes remain for any other consumer. Every snap in `glass.js` asks for it: the frame's handles, the Wright window's cuts (a line settles on the grid and never on a pane's own edges, one step in from them), the minting of a lattice point.

**The grid shows from the start on every board**, in the plane's own style, at whole metres. The lattice's tick numbers now sit on the smallest rung of the 1–5–10 ladder that is at least 40 pixels apart and no finer than the step, so halves and tenths do not crowd. The Wright window's numbers along the bottom and the left are the plane's (its origin is the frame's corner); its own number-drawing is gone. In the plane's convention the numbers run positive in all four directions from the origin, so left of and below the frame they count outwards too.

**Finer.** One word in the column on every board, after *Glass only*, stepping whole → halves → tenths and round again. A change of resolution is a viewing entry in the record (`{ op: 'resolution', step }`): a replay reproduces it, Undo skips it, and it is not work. The default is whole metres: the inventory leaves open whether the child or the story sets it to start, so the coarsest is served.

**Readouts.** The frame's numbers and the Wright window's (a pulled line's length, the two panes it is making, the colour totals) take the `exact` rule back from the retired lines board: exact to tenths or hundredths where they are, ≈ otherwise; at halves a frame reads "width: 10.5, area: 105".

**Kept to the lab until R5.** Two things that came with the map shown were the standalone lab's own rules and would have changed Stained Glass Circles unasked: a tap on empty ground near a grid crossing mints a point instead of undoing (Decisions-Controls-Aug12 §7), and the pixel-floor readout in the canvas's corner. Both are gated to the level that has the map word, which is the lab's.

## Visible changes, as named

On every page the grid appears, at whole metres, and *Finer* appears in the column. On the Wright window the numbers along the bottom and left are the plane's, and the frame fits the box as before (its step is a metre, so the home zoom is 0.26 for a 10 by 10). On the standalone lab the *Show map* word reads *Hide map* at the start, and the earned numbers along the axes, which showed only while the map was hidden, are hidden under it until she hides the map.

**One more, not asked for:** the Wright window's postcard and share preview draw their came thinner than before, because the exports scale the lead's width with the world and a Wright step grew from 56 to 200 world units. The screen is unaffected (its lead is in pixels). The thumbnail of the Wright demo changes the same way. This is the one picture the migration could not keep, and it is named rather than forced: the came's thickness in metres belongs to the renderer step and the parts list.

## What was checked

- **The walk**, R2's tree (bb4b8dd) against this one, the Wright walk extended with Finer at halves, a handle held half a step out at halves, Finer to tenths and round to whole; the Circles walk with Finer round. Stained Glass Circles and the standalone differ by the grid on the canvas, the Finer row in the column, and the resolution entries in the record where Finer was tapped; nothing else — the share previews and postcards are identical. On the Wright window: the record holds the resolution entries, the frame at halves takes 10.5, the exports differ as named above, and the demo plays to the same five fills.
- **A tap on empty ground at a crossing on Stained Glass Circles** writes nothing (checked by script).
- The migration in Node: the 19 October demo and R2's both replay to the same model as the regenerated log, unit 200.
- The nine standard logs byte-identical; the face tests pass; `tools/check-deploys.sh` clean.
- Pictures in the pane: the Wright frame at halves with its readouts and the plane's numbers; the lab with its grid.
- **Not checked:** the iPad, Safari, a phone width; the lattice at tenths zoomed far out (the lines thin to nothing below three pixels apart, as the plane always did).

## What surprised me

- **The map brought two of the lab's habits with it.** Minting and the pixel floor were gated by `mapShown` alone, so showing the map everywhere would have changed Circles' tap and put a readout in its corner. Both are the lab's until R5.
- **The exports' lead is in world units.** Nothing in the audit had noticed that the postcard's came grows and shrinks with the world scale; the change of a Wright step from 56 to 200 made it plain. On screen the came is pixels. One of the two is wrong for the parts list and ruling 7's thickness; the renderer step decides.
- **Tick numbers needed a rung of their own.** At tenths the plane would have written a label every 18 pixels; the labels now climb the 1–5–10 ladder while the lines keep the step.

## Open, not invented

- Whether the child or the story sets the resolution to start (whole served).
- Whether *Finer* should show the step beside it, and where it sits (after *Glass only* for now).
- The plane's numbers run outward in all four directions from the frame's corner; whether the Wright window should show only the frame's own run is a words-and-picture question.
- The came's thickness in metres for the exports (above).
- The *Hide map* word on the lab, and the earned numbers under the map, until R5.
- The Wright tip words still describe the old numbers and the old handles.
- The pixel-floor readout says "unit" where it could now say the metre; words.

## Where things are

Uncommitted in the working tree: `cw-deploys/js/plane.js`, `cw-deploys/js/glass.js`, the seven pages' stamps and queries, `cw-deploys/models/logs/geo_wright.json`, `tools/glass-log.js`, `tools/glass-states/glass-states.html`, this report, the board line. The committed tree for comparison is served from a worktree of bb4b8dd.
