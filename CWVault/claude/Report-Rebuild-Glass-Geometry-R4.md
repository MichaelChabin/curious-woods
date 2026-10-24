---
status: Report, 24 Oct 2026 (Claude Code), step R4 of `claude/Prompt-Glass-Geometry-Go-Ahead-02.md`: the shell's interface, and the Wright window moved onto it. Built and checked, **not committed** — Michael's yes first. The interface as written is `claude/Spec-Glass-Shell.md`, which becomes `20-SPECS/Spec-Glass-Shell.md` once he has read it.
role: What R4 changed, what was checked and how, what surprised, and what is open. Written for Michael.
related: Spec-Glass-Shell.md, Prompt-Glass-Geometry-Go-Ahead-02.md, Prompt-Glass-Geometry-Go-Ahead-01.md, Report-Rebuild-Glass-Geometry-R3.md, Report-Tidy-Glass-Geometry-01.md
---

# R4: the shell's interface, and Wright moved onto it

Built on R3's commit (56b88f0). `js/glass.js` is 5,847 lines, from 6,050; the new `js/boards/wright.js` is 253. Stamps `2026-10-24h 56b88f0`, `?v=2026-10-24h` for `glass.js` on the three pages and the bench; the Wright page loads `js/boards/wright.js` after it. `plane.js` is untouched this step.

The interface was written first, then built: `claude/Spec-Glass-Shell.md`. The report below says what the building added to the writing.

## What changed

**One mount word.** `cwGlass(host, { board, palette, open })`. The lab is `board: 'euclid'`, Stained Glass Circles `board: 'circles'` (the measure is now the board's, not the page's), the Wright window `board: 'wright'`. The pages pass nothing else; `level`, `app`, `measure`, `fill` and `fullscreen` are gone from the module, and a page that still passed them would be served euclid with a console line. A board registered under `CW.boards` is built once at mount from its factory with the shell's services; `euclid` and `circles` stay inside `glass.js`, served by their old levels behind the same word, for R5.

**One name for a pane.** The key is the pane's boundary points, its vertices and the midpoint of every arc, rounded to a thousandth of a world unit, sorted and joined. Fills, sheets and the tap on a pane all use it; a board's panes and the engine's share it. Derived, never stored. A fill in the record names its pane as the engine's `vertices` and `edges` or as a board's own description, `pane` (the Wright window's rectangle in metres). The old `rect` is migrated to `pane` at replay, with the other migrations; the demo log is regenerated in the new shape and its three older shapes (19 Oct, R2, R3) replay to the same model, checked in Node.

**The gesture vocabulary in one place.** A new section, THE BOARD, after the record: the shell decides what was touched — a frame handle, a segment the board offers, a point, a pane, empty ground — and calls the board's one hook; two fingers are the view, with the pinch. A board hands back a drag, `{ move, end }`, and the shell runs it to the release. The tap on a pane is the shell's on every board now (the Wright window used to do its own): the colour chosen, clear glass with none, the first chip takes the glass away, and a pane already wearing the colour is left alone. The two in-file boards' presses still go through the old machine behind the dispatcher, until R5 moves Circles out.

**The Wright window as a board.** `js/boards/wright.js` keeps its model (panes and cuts off the shell's frame), offers the frame's sides and its cuts as segments, pulls a line across one pane on a drag from one, names the pane around a point and gives its outline, draws the pulled line and its readouts, adds up the colours under the board, and carries its three tips. It holds none of the shell's state: everything it needs comes through the services the spec lists. The lead pass (the cuts and the frame as one path of came) is the shell's.

**Full screen as a word** (ruling 2). *Full screen* in the column after *Share*, on every board, where the browser allows an element to go full screen; it reads *Exit full screen* while it is, as the Time Machine's word does. The first touch on the Wright window is no longer spent on it, and the small *Exit* word at the bottom right is gone. The Wright page's placeholder sentence about the first touch now says the word.

## Visible changes, as named

- *Full screen* in the column on every page, after *Share*, where the browser allows it (the app's pane does; iPhone Safari will not). The column is one row taller, so the colour window sits a row lower.
- On the Wright window: the first touch draws instead of going full screen; the *Exit* word is gone.
- On the two-instance bench: the left instance was the lab at the circles level without the window profile, which no live page serves and no board name names; under the one mount word it is Stained Glass Circles' board, with its column and tap-to-colour. The right instance is unchanged. The bench's note says so.
- In the record: a Wright fill carries `pane`, not `rect` (the demo log regenerated; older records open through the migration). A tap on a pane that already wears the colour writes nothing, on Circles as on the Wright window; it used to write a silent repaint on Circles.

Nothing else on any page: see the check.

## What was checked

- **The walk**, R3's tree (56b88f0) against this one, the harness taught both mount vocabularies (it mounts the new tree with the board word and loads the Wright board's script; the first touch is dispatched only where the old tree's *Exit* word is). Stained Glass Circles and the lab: every canvas, view, record, share preview and postcard identical in every state; the markup and the words differ by the *Full screen* row alone. The Wright window: every canvas, view, share preview and postcard identical in every state — the handles, Lock, Undo, Finer at halves and tenths, the line held mid-pull with its readouts, the demo, the big pane tapped; the record's hash differs from the demo on, by `pane` for `rect`; the words by *Full screen* present and *Exit* gone.
- **The nine standard logs** byte-identical through `tools/glass-log.js`, which now builds the Wright board from its file as the shell does; the Wright demo regenerated, differing from before by `rect` → `pane` in its five fills and nothing else; the face tests pass; `tools/check-deploys.sh` clean.
- **The migration in Node:** the 19 October, R2 and R3 shapes of the Wright demo replay to the same frame, panes, cuts and fills as the regenerated log.
- **The two-instance bench** in the pane: both instances mount with no console errors, the left as `circles` and the right as `euclid`; *again* starts the Rose on the left and Undo there leaves the right alone.
- The Wright page in the pane: mounts, no errors, the frame and its handles and the plane's numbers as before.
- **Not checked:** going full screen itself (the pane refuses the API, as it refused the Time Machine's; the code is the Time Machine's pattern and works there on the iPad); the iPad, Safari, a phone width; a real two-finger gesture on the board.

## What surprised me

- **The tap under Glass only reached the board by the pan.** Under Glass only every press pans, and the old window tap on release found the pane anyway. The first run of the walk showed the big pane untouched after the demo; the release now tries the pane before handing the tap to the board. The walk earned its keep in the first hour.
- **The old pane name could not tell a vesica's two halves apart.** Same two vertices, same area, different arcs; the geometric key, with the arc midpoints, can. Not something a child has met yet.
- **The Wright block needed less of the shell than the tidying report listed.** Once the tap on a pane and the lead pass were the shell's, the board asked for the record, the frame, the grid, the glass, the mapping, the readout, the came's style, Glass only and sound — fourteen functions — and nothing of the engine or the gesture state.
- **One mount word forced a choice on the bench.** The lab at the circles level without the window profile had one page, the bench, and no name under the new word; I gave the bench the circles board and named it above rather than keep a second vocabulary for one experiment.

## Open, not invented

- The pane key's tolerance: a thousandth of a world unit, where the engine merges crossings at a fortieth of a metre; which the pane should take.
- Where *Full screen* sits: after *Share* for now, on every board.
- A drag that starts inside a pane does nothing; the frame moves by its centre handle (R2's question stands).
- The in-file boards' one-finger pan and wheel zoom against the interface's two-finger view, until R5.
- The lead's drawing habits per board (one path before the board's drawing on the interface; one stroke at a time after the construction on the lab), for the renderer step.
- What a board will ask of the geometry engine: nothing is lent yet; R5 adds what Circles needs.
- Mirror and quadrant modes, and the picture behind the plane (R7): the spec names them and provides nothing yet.
- The Wright tips and the page's placeholder paragraph are still the old words, now wrong about full screen only where I changed one sentence; the rest is yours.
- The retired `level: 'wright'` tag in saved designs and the demo manifest is still the board's name in the library, as `entry.level`; the field's name could become `board` when the Save/Open session comes.

## Where things are

Uncommitted in the working tree: `cw-deploys/js/glass.js`, the new `cw-deploys/js/boards/wright.js`, the four pages, `cw-deploys/models/logs/geo_wright.json`, `tools/glass-log.js`, `tools/glass-states/glass-states.html`, the spec draft `claude/Spec-Glass-Shell.md`, this report, the board line. The committed tree for comparison is served from a worktree of 56b88f0. The MANIFEST entry (and `js/boards/` as a new folder in it) is written at the commit, on your yes, as for R2 and R3.
