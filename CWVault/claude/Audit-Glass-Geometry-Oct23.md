---
status: REPORT 23 Oct 2026, from Claude Code, read-only. From `claude/Prompt-Audit-Glass-Geometry.md`. Nothing in the code was changed. Michael reads it and rules; a go-ahead prompt follows.
role: What `js/glass.js` is today, measured against `Inventory-Glass-Stories.md` and `Series-Glass-Geometry.md`, and the cheapest honest route from one to the other. Written for a designer: each section short, each term explained the first time it is used.
related: Inventory-Glass-Stories.md, Series-Glass-Geometry.md, Worknote-Parallel-Window.md, Worknote-Fraction-Window.md, Prompt-Extract-Glass-Module.md, Audit-Timeline-Graphics-Oct19.md (the same kind of report for the Time Machine)
---

# Audit: Glass Geometry, 23 October 2026

## How to read this

The lab is one file, `cw-deploys/js/glass.js`, 6,562 lines. Four pages ask it for a board: the standalone lab (`active/glass-geometry.html`), Stained Glass Circles (`active/geo-1-glass-circles.html`), the Wright window and the straightedge board (both in `experiments/`). The pages are thin; everything that matters is in the one file.

A few words I will use throughout:

- **The record** (the code calls it the operation log). Every move she makes is written down as a small entry: a circle, a line, a colour. The screen is rebuilt from the record after every move. Save, Open, Undo and Demo all work by writing, reading or trimming the record. This is the lab's spine and it is sound.
- **Replay**: rebuilding the picture from the record. Every entry has a line of code that says what it means.
- **A flag**: a yes-or-no switch set once when a page asks for the lab, which the code consults later to decide how to behave. There are four board flags: `APP` (the window profile that Stained Glass Circles uses), `BOARD` (the straightedge board), `WRIGHT` (the Wright window) and `FRAMED` (either of the last two: the boards with a frame).
- **The shell**: everything the inventory says every board shares. The plane, the frame, glass and came, the column, what she makes.
- **A board**: the one thing that varies, how panes get made.

Sizes below are rounded; "about 330 lines" means I counted a block and its scattered pieces and rounded to the nearest ten.

## 1. Shell, board, or dead

### The short answer

Of the 6,562 lines, roughly:

| Bucket | Lines | What it is |
|---|---|---|
| Shell | about 4,500 | the plane, the record, the geometry, panes and glass, drawing, the column, Save, Open, Share, Demo, the picker |
| The standalone lab's own powers | about 500 | ways of working that only the `both` level uses and no story in the inventory asks for (see below) |
| The straightedge board | about 330 | behind `BOARD` |
| The Wright window | about 340 | behind `WRIGHT` |
| Shared by the two framed boards | about 60 | behind `FRAMED`, scattered |
| The window profile's chrome | about 120 | behind `APP`: the drawing box, the reordered column, Undo and Reset view as words, the Demo list |
| Dead or unreachable | about 430 | the drawing-guide tool and everything that served it, an export nobody calls, a ghost layer, a sound question with no script |
| Styles and markup | about 370 | mostly shell; a few rules for each board |

The file has grown by a quarter since the extraction, all of it boards:

| Date | Lines | What landed |
|---|---|---|
| 2 Oct | 5,285 | the extraction, two levels |
| 15 Oct | 5,677 | the window profile, tap to fill, the measure |
| 17 Oct | 6,017 then 6,180 | the straightedge board, then its revision |
| 19 Oct | 6,562 | the Wright window |

Each board cost 350 to 500 lines inside the one file and touched the same dozen places.

### The flags, counted

A flag is tested wherever the code has to choose. The more places, the more tangled.

| Flag | Places it is tested | Where |
|---|---|---|
| `APP` | 17 | the mount, the fill mode, the drawing box, replay (Glass only resets), Save (hers, no panel), the column, the palette's remove chip, the demo list, the picker, the viewing words |
| `FRAMED` | 17 | the preview thumbnail, the postcard, the share image, Save's level tag (three places), Open's listing, the home view, two-finger panning, wheel panning, the demo list, the Glass only word, the resize observer |
| `BOARD` | 9 | the first entry of the record, the count in the "one of billions" window, drawing (faint outside the frame, the frame in lead), the tap, the press (frame side, glass by hand), the drag (the free point), the release |
| `WRIGHT` | 9 | the first entry of the record, the thumbnail, the lead, drawing, the tap, the press, the release, the totals element, the viewing words |
| `POWERS` (the level's list: circle, line, map, tips) | 8 | the drag (compass or not), the release (straightedge or not), the picker, the tips, the map word, the Glass only word |
| `FILL_MODE` (lead by edges, or colour by tap) | 6 | the cursor, two places in the press, two in the release, the tip words |
| `MEASURE`, `FULLSCREEN` | 1 and 3 | the ghost circle; the mount, the first touch, the Exit word |

About sixty explicit tests. On top of them are what I would call soft flags: the code also asks "is there a frame?", "does this fill carry a rectangle?", "does this fill carry several panes?", "does the first entry carry `frame` or `wright`?", "does this saved design carry a level?". Those are a dozen more places where a board's shape is recognised by the shape of its data rather than by a named switch.

The gesture code is where the interleaving is deepest. The three functions that decide what a press, a move and a release mean (the code calls them the interaction state machine, about 840 lines) are each a chain: is it Glass only, is it Wright, is it a demo, is it a point, is it a frame side (straightedge), is it a pane inside the frame (straightedge), is it an edge, is it a bare line, is it glass, is it empty ground. A new board adds its question to each chain near the top and returns early. The two existing boards did exactly that and did not break each other, which says the pattern works; it also says a seventh board would make three chains seven questions long.

### Section by section

The file's own headers, in order. S = shell, B = a board's, D = dead.

| Section (lines) | Verdict | Notes |
|---|---|---|
| Header, styles, markup (1–445) | S, with board rules | the window profile's rules, the Exit word's rule and the Wright totals' rule live here; markup for the drawing-guide tool, the ghost layer and the sound question is dead |
| `LEVELS` and the mount (455–580) | S | where the four flags are set; `APP` forces the level, and a level asked for on the wrong profile is refused with a console message and served as `both` |
| CONSTANTS (582–627) | S | colours, thresholds, lead colour (the comment admits the came colour is unsettled since August); `showLines` is a switch nothing flips |
| AUDIO (628–665) | S, pending | nine sounds; see section 4 |
| OPERATION LOG (666–1043) | S, with two board models woven in | the record and replay, about 250 lines of shell; the straightedge frame (frame as four points and four lines, about 70 lines) and the Wright model (frame, panes, cuts, about 65 lines) sit inside it, and replay has a branch for each board's entries |
| CANVAS NOTES (1046–1279) | S, pending | notes placed on the plane by double tap; see section 4 |
| SAVE, SHARE, POSTCARD, LIBRARY (1298–2184) | S, with `FRAMED` crops | the thumbnail, the preview, the postcard, the print sheet, Save, Open's library, drop a file; each of three image renderers has its own copy of "crop at the frame, pad four percent, frame in lead"; the Wright branch adds its lead in two of them; the "one of billions" window is here too |
| GEOMETRY HELPERS (2186–2270) | S | pure arithmetic; also lifted out and run in Node by `tools/glass-log.js`, see section 10 |
| ACTION LAYER (2272–2294) | S | fill, recolour, dissolve as entries in the record |
| FILL POLYGON, SHEETS (2296–2409) | S | how a fill becomes a shape on screen; the sheets (several panes as one piece of glass) came with the straightedge board but every reader of a fill now goes through them, so they are shell; Wright's rectangle is one line here |
| REGION DETECTION (2411–2657) | S | two ways to make a pane: lead the edges until they close (the standalone), or find the shape under a tap by walking the arrangement (the window profile, 142 lines). This is the shell's core and it is good |
| THE PLANE (2659–2704) | S | wraps `plane.js`; sizes the canvas to the host |
| RENDER (2706–3185) | S, with board branches | the screen, drawn every frame: box (`APP`), lattice, fills, the sheet being dragged (`BOARD`), Wright's lead, numbers, handles and readouts (104 lines, `WRIGHT`), construction lines (faint outside the frame on `BOARD`), hover hints, emphasis, ghosts, the circle's measure, the frame's measure, the eraser cursor, points, note callouts, axis labels, the pixel-floor readout |
| AXIS LABELS (3187–3302) | S for `both` and `circles` only | "earned numbers" along the line through 0 and 1; returns nothing on a framed board |
| Measure, home view, animate (3304–3362) | S, `FRAMED` home | the home view is off-centre on framed boards so the frame sits under the middle of the box |
| HIT TESTING (3364–3453) | S | what is under a tap |
| SEGMENT AUTO-COMPLETE (3455–3569) | the standalone's | fills in a short path of lead between two taps; only in the lead-by-edges mode |
| PALETTE ACTION, the window tap (3571–3626) | S, with `WRIGHT` and `BOARD` | the window profile's tap: colour the smallest shape under it |
| INTERACTION STATE MACHINE (3628–4465) | S, deeply interleaved | described above; inside it the eraser (about 250 lines, the standalone's), lattice minting (the standalone's), the straightedge gestures (82 lines), the Wright gestures (96 lines) |
| PALETTE DATA (4467–4549) | S | loads the palettes and the words file |
| MODEL DATA (4551–4577) | D | the drawing-guide catalogue |
| LAYOUT and UI STATE (4579–4615) | S | |
| TOOL ACTIONS (4617–4661) | D | `exportImage` and `toggleLines` have no caller |
| PANEL TOOL SYSTEM (4663–4792) | D | the column's tool stack; only the drawing-guide tool ever stacked there, and nothing opens it |
| PALETTE TOOL (4794–4919) | S | the colour window, the craft row, the lead slider |
| CONSTRUCTIONS (4921–5036) | S | the library manifest, thumbnails, the demo list |
| STEP-THROUGH REPLAY (5038–5397) | S, pending | Demo and the replay panel; see section 4 |
| WIP guard, loaded note, Open (5399–5517) | S | |
| DRAWING GUIDE TOOL (5519–5577) | D | `openDrawingGuide` has no caller |
| PICKER WINDOW (5579–5772) | S, one mode dead | constructions and palettes are reachable; models is not |
| REMEMBER (5774–5801) | S, pending | hidden until the Maya flag |
| LAYOUT ENGINE, UTILITY (5805–5827) | S | |
| HOW THIS WORKS (5829–6360) | S, with every board's words inside | the tips for all three boards (about 90 lines of words) and their fade rules; the window profile's column is built here (`APP`); the Exit word (`FULLSCREEN`); the Wright totals element |
| VIEWING WORDS (6362–6442) | S, board word choices | Show map, Glass only and its opposite (three different words by board), the presence of New, Save, Share, Undo, Open |
| STARTUP and THE MOUNT (6444–6562) | S | the resize observer re-homes framed boards; a test hook exposes Wright's panes and cuts |

### What the dead code is

About 430 lines and some markup have no way to be reached:

- **The drawing guide** (a faint SVG model to trace over): its data, its tool panel, the column stack that held it, its picker mode, its layer and image in the markup, its styles. `openDrawingGuide` is defined and never called; the picker's models mode is reachable only from inside that tool.
- **`exportImage`** and **`toggleLines`**: the old Tools menu's actions. Nothing calls them, so `showLines` is always true.
- **The ghost layer** and `clearGhost`: an overlay from an earlier design.
- **The sound question** ("may I use sound? yes no"): markup and styles with no script behind them. Sound plays without asking.
- **`CRAFT_SWATCHES`**: the palette file's craft row (empty, clear, lead) is loaded and never read. The craft row on screen is built from two hard-coded chips. The lead chip in `palettes.json` has never appeared.

None of it is wired to anything a child sees. Removing it is tidying in the strict sense.

### The standalone lab's own powers

About 500 lines serve only the `both` level and no story in the inventory: lead by tapping edges (and the auto-complete that helps it), the eraser that fades lines to scaffolding, the hover hints on connected edges, Show map and minting a point at a lattice crossing, the earned numbers along the axes, the pixel-floor readout, the Full sheet print. The inventory's Stained Glass is "Glass Circles with the straightedge back and new demos", which is the window profile, not this. Whether the standalone lab in the gallery stays as it is, becomes the Stained Glass board, or keeps these as a board of its own is open (section 10).

## 2. Hard-wired against the inventory

The inventory says these must vary by board or by story. For each: what the code does, whether it is one switch or scattered, and what would have to change.

### The frame

**Today.** Three boards, three frames. Stained Glass Circles and the standalone have none: two copper dots, 0 and 1, and an endless plane. The straightedge board writes its frame into the geometry itself as four points and four lines (kept at negative positions in the record so her own lines can cross them and mint dots). The Wright window keeps a separate model (a rectangle in whole steps, a list of panes, a list of cuts) and has no points at all. The two framed boards share one variable, `frame`, that holds the rectangle in world coordinates, which is how the `FRAMED` code (crops, home view) serves both.

**Snapping.** The straightedge frame snaps its size to tenths of its unit (240 world units); Wright snaps to whole steps of a different unit (56 world units). Neither snaps to the plane's grid, because neither board shows a grid.

**Locked or free.** The straightedge frame locks at her first line or circle anywhere on the board, even one that does not touch the frame. Wright locks at the first cut. Both are near the proposed rule ("locks only when something has been pulled from it") without being it. Neither frame can be moved, only resized by its sides; the series page says it can be moved.

**Resizing and Undo.** The straightedge board rewrites the first entry of the record in place, so Undo does not step back through resizes. Wright writes a `resize` entry, so it does. Two conventions for one act.

**Switch or scattered.** Scattered. The frame appears in the record's first entry (two shapes), in replay (two branches), in drawing (two routines), in gestures (two sets), in the three image renderers, in Save's level tag, in the home view.

**What would change.** One frame: a crop rectangle in the plane's units, written as an entry in the record, present or absent by board, snapping to the grid at the current resolution, with one lock rule. The straightedge frame-as-geometry would go (it is the straightedge board's idea and that board is proposed for retirement); the Wright model would become "the frame plus cuts".

### The grid

**Today.** `plane.js` draws a 1–5–10 lattice with tick numbers (the "map"), but the lab shows it only when Show map is tapped, and that word exists only at level `both`. The lattice's step is frozen at the default view's step on purpose ("Geometry's grid keeps its step, always", a ruling of August). The framed boards never show it; Wright draws its own numbers along the bottom and left and no grid lines; the straightedge board shows no numbers at rest.

**Resolution.** There is no such idea in the code. Wright rounds to whole steps (`Math.round`); the straightedge board rounds to tenths; the plane's lattice step is a function of zoom and the unit. Nothing can be told "halves now".

**Switch or scattered.** One switch for whether the map shows (`mapShown`, a viewing entry in the record), none for resolution. The plane has a "tied or frozen" lattice but no way to set its step directly.

**What would change.** The grid given means `mapShown` true from the start on every board, with the plane told its step. Resolution means a setter on the plane (`setLatticeStep`, say) that the frame, taps and drags all snap to, and an entry in the record when it changes so a replay reproduces it. Modest in `plane.js`; in `glass.js` every snap (frame sides, Wright's cuts, the free point, a tap to make a right triangle later) has to ask the plane instead of rounding on its own.

### How a crossing behaves

**Today.** A crossing makes a point, always and automatically, for every `line` and `circle` entry in the record (`detectLineX`, `detectCircX`, `regX`). There is no switch. Wright avoids it by having no lines or circles: its lines are `cut` entries in a model of its own. The straightedge board briefly had circles whose crossings were hidden vertices (panes split, no dots); that was removed on 18 October.

**What would change.** For Wright's decorative circles (crossings make no new points, but the circle is still lead and still bounds glass), either a new kind of entry or a mark on the entry that `regX` honours. One place to change, with a consequence to think through: the shape-under-a-tap walk finds panes by walking edges between points, so a circle that makes no points cannot bound a pane either, unless the walk is taught about whole circles with no vertices (it already knows one case, the lone circle nothing crosses). This is a board setting, as the inventory says, but it reaches into the shell's one geometry routine.

### How lead arises

**Today.** Three ways, in three places.

- At level `both`: she taps edges, they turn to lead, and when they close the shape fills. Lead is chosen first; colour follows.
- In the window profile (`FILL_MODE` of `tap`): she taps inside a shape; it takes colour and its boundary is drawn as lead. Colour decides the came, as the 22 October ruling has it. A sheet (several panes dragged together) has lead round the outside alone.
- On Wright: every cut is lead from the moment it is pulled, coloured or not, and the frame with it.

**Switch or scattered.** The first two are one switch, `FILL_MODE`. The third is a `WRIGHT` branch in two renderers and in the screen drawing.

**Came.** Lead or zinc: not in the code. The came colour is one constant (`#777777`), and the comment beside it says it was chosen against light glass and fails against dark glass, open since August. Thickness is a slider (0.5 to 6), and it is **not saved**: a construction reopens at the default thickness and a shared file carries none. Pb and Zn: no parts list exists.

**What would change.** Lead-from-colour is the shell's rule already. "Every line is lead" is one board's rule and would be one line a board declares. The came's metal and thickness become entries in the record so they save and replay.

### Mirror and quadrant modes

**Today.** Nothing. The record is a flat list of entries; fills are keyed by the point ids of their vertices; the screen is drawn once. No symmetry anywhere.

**What would change.** Two ways, with different costs. Cheap: a viewing mirror, drawing the scene four times with the plane's transform flipped, which gives the picture but not the panes (a tap in the mirrored quadrant has nothing under it, the parts list counts one quadrant). Honest: a board rule that every entry she makes is written four times, once per quadrant, so the panes exist and the plan can count them. The second is what the fraction window wants if she can colour a quadrant differently. Neither exists; the second needs the pane ids to be made from positions, not from point ids, or four points per crossing.

### The palette

**Today.** Fifteen palettes from `art/palette/palettes.json`; the page asks for one by name (`palette: 'chartres'`), one switch. The craft row (remove, clear) is appended to every palette, so clear glass is in every one. But the clear chip's colour is a hard-coded hex (`FOREST_GLASS`, `#c2d4bc`, Roman green), used also as the colour a shape takes with no colour chosen. Wright's "clear not Roman green" is not possible without changing that constant for everyone; the Wright board calls an uncoloured pane *empty* and gives it the board's background. Transparent or solid and fades toward white or black: every fill carries an opacity in the record, always 1.0; no control sets it.

**What would change.** The craft row from the data file instead of two hard-coded chips (the data is already loaded); a per-board or per-palette clear; an opacity control if fades are wanted.

### Other things the inventory assumes vary and the code fixes

- **The unit.** Three units in one file: 200 world units from 0 to 1, 240 for the straightedge frame, 56 for Wright's step. No metre, no name; the pages say "the board's own unit, which has no name".
- **The readouts.** Three routines and three number formatters (the circle's radius and area; the frame's width, height, diagonal and area; Wright's width, height, area, a line's length and its two panes). Same idea, written three times.
- **The tip words.** Every board's How-this-works text sits in one array in the shell file, with a per-board fade rule beside it.
- **The viewing words.** Glass only's opposite is "Show the making", "Show circles" or "Show lines" by board, chosen in a nested condition.
- **The home view and the drawing box.** The column is 160 pixels, fixed; the box inset is fixed; the home view is centred on the origin or on the frame.
- **Save's listing.** A design saved on a framed board carries its level and only that level lists it; designs from the circles profile and the standalone carry none and are listed together. Her library is one for every board, as it should be, but the rule for who lists what is a flag.
- **The demo list.** Filtered by whether a log draws lines and by level, in two places.
- **The powers a page sets.** Stained Glass Circles asks for `measure: true` itself; the two experiments ask for `fullscreen: true`. The page is deciding how the lab behaves, which the rulings say it should not.

## 3. Disagreements with the series page

### The single workflow

**Fullscreen, how and where.** It is a mount option, `fullscreen: true`, which only the two experiment pages set. Stained Glass Circles and the standalone never go full screen. Where it is on, her first touch on the board is spent on it: the touch draws nothing, and the request is made on the release (the gesture a browser accepts). The board itself is the full-screen element, not the page; that works here because everything the lab shows is inside the board. The way out is a small *Exit* word at the bottom right of the board, present only while full screen, and the Escape key. Where the browser has no full screen (Safari on iPhone, the browser pane on the Mac) the touch is spent and nothing happens, with a note in the console.

That matches the series page's step 2 and step 5 as written on 21 October. It does not match the Time Machine, where on 22 October Michael ruled that full screen is **a word in the column, not the default** on Next. Two boards, two conventions, one day apart. Which holds for the glass boards is open.

**The workshop and the finished work.** The column is there on every board. The "button inside that shows the finished work" is the *Glass only* word, which exists. What it shows is the glass with its lead and, on framed boards, the frame in lead; the plan does not exist. Share is a separate word in the column, not inside the finished-work view as the series proposes.

**Two fingers pan and zoom; one finger acts.** True on the framed boards. On Stained Glass Circles and the standalone, one finger dragging on empty ground pans, and two fingers pinch but do not pan. The trackpad's two-finger scroll pans on framed boards and zooms elsewhere. So the one lab has two gesture sets, which is the thing the ruling "Glass Geometry decides gestures first" exists to prevent.

### The plane and the frame

**Endless plane, frame as a crop.** On the straightedge board, yes: lines run across the whole board, the free point lives outside, glass only inside. On Wright, the plane is endless (she can pan and zoom away from the frame) but nothing can be made outside it: panes exist only inside the frame, lines are cuts of panes, a tap outside does nothing. The confinement Michael called a mistake is not a bug in the plane; it is the model. A right-triangle board or the Triangles board could not be built on Wright's model. On Stained Glass Circles there is no frame; the postcard crops to the glass's bounding box with a margin.

**Moved and resized, not centred on the origin.** Both frames open centred on the origin and neither can be moved. The plane's origin is set to the frame's bottom-left corner so numbers count from there, which is right for Wright and will be wrong for the fraction window, whose origin is the vanishing point in the middle.

**Reset brings her back to the frame with a margin.** The home view is the plane's default zoom (keyed to the box's size, not to the frame) with the pan shifted so the frame is under the middle of the box. It is not fitted to the frame. The *Reset view* word appears only in the window profile and only when the view has moved.

### Readouts while dragging

They exist and vanish on release, as the page says: the circle's radius and area (Glass Circles, because that page asks for it), the frame's four numbers while a side is dragged (straightedge, with ≈ where not exact), Wright's frame numbers while a handle is dragged and a pulled line's length and the two panes it is making (whole numbers only, by design). Nothing shows while a line is drawn on the straightedge board. Three implementations of one idea.

### Glass and came

Tap a pane to colour: yes in the window profile; the standalone leads edges first. Bigger shapes underneath smaller: yes, everywhere (fills sorted by area for drawing and for hit-testing). Clear glass in every palette: yes, as one hard-coded colour. Came never coloured: yes. Colour decides came: yes in the window profile, no at level `both`, and on Wright lead comes regardless. Lead or zinc, thickness chosen, Pb or Zn: thickness yes (not saved), the rest no. Transparent, solid, fades: no.

### What she makes

**The window.** Glass only on screen, and the postcard through Share. The postcard is not "just the glass": it adds a dark mat, an inner border, a vignette, a radial glass gradient, three hundred specks of noise and a warm overlay. A styled picture. On framed boards it is cropped at the frame with the frame in lead; elsewhere it is the glass's bounding box with fifteen percent padding.

**The plan.** Does not exist. The nearest thing is Wright's line of colour totals under the board (area per colour, *empty*, and the total they add to). That is the seed of a parts list, in the page's markup rather than on a sheet, and Wright-only.

**The print sheet.** The standalone's Save panel offers *Full sheet* (3000 by 2400, 300 dpi). The window profile does not.

**Share.** A column word on every board, present when there is work. It opens the postcard preview with a name-and-note box; OK sends it through the system share sheet, or downloads it where there is none. Save, in the window profile, keeps her file quietly and then offers *Share the file* once.

### How a story calls a board

The series proposes one mount call: board, palette, what starts on the plane, fullscreen. Today's call is `{ app: 'window', level, palette, fullscreen, measure, fill, open }`. Two words name one thing (`app` and `level`); two words (`measure`, `fill`) let a page change how the lab works.

## 4. The shell candidates whose definitions are pending

A reading list for the sessions that will define each. What it does, where it lives, what depends on it, whether it could be removed or replaced alone. No judgement here on whether it should stay.

### Save and Open, and her library's keys

**Does.** Save writes the whole record, a name, a note, the replay speed and a thumbnail into the browser's storage under a key of its own; Open lists them in the picker and replays the chosen one as a demo she can take over. In the window profile the first Save asks for a name and later Saves overwrite quietly; a design begun from a demo always asks for a new name. After a save, where the share sheet exists, one offer: *Share the file* or *Not now*. A `.json` file dropped on the board opens after the same guard as Open.

**Lives.** Lines 1609–1766 (Save, the note box, the file), 2129–2156 (the library index, who lists what, drop a file), 5399–5420 (the work-in-progress guard), 5482–5509 (Open's loading), 5612–5679 (the picker's constructions mode), 2181 (Cmd-S and Cmd-O on the board).

**The keys.** `cw-cx-index` (the list: key, name, created, and a level for framed boards); `cw-cx-<time>` (one design: key, name, note, note position, created, operations, speed, png, level); `cw-cx-builtin-png-v3-<key>-<n>` (cached thumbnails of the standard set); `cw-replay-duration` (her last Play speed); `cw-htw-geometry-v1` and `-<stage>` (which tips she has seen). Nothing outside `glass.js` reads any of them. A saved design does not record the palette or the lead thickness.

**Depends on it.** The viewing words (Open is present only when the library has something; Save and Share only when there is work); the "one of billions" window fires after a save with ten or more points; the thumbnail renderer; the choice panel in `cw-panel.js`; Demo's notion of "hers or a demo".

**Alone?** Yes, as a cluster. Replace the storage and the key names, and nothing else moves, provided the record's format is kept so her saved Rose opens.

### Demo with replay, `forkStepThrough`, `checkWipThen`

**Does.** A demo loads a construction's record and plays it step by step: Play with a duration, the arrows, Start over, and the panel that holds them (built on the shared info panel). The record is grouped into visible steps (lead-until-fill is one step, a run of fades is one step, empty steps merge forward). Her first mark during a demo is the fork: the rest is dropped and what has played is hers. `checkWipThen` is the guard in front of New, Open, a dropped file, a demo tap and the story's `replay()`: save first, start fresh, or keep working.

**Lives.** Lines 5038–5397 (grouping, the panel, Play, step, fork), 6236–6248 (the Demo list in the column), 6542–6554 (`replay()` in the API).

**Depends on it.** Nine call sites fork the demo when she acts: the window tap (two), Wright's tap and pull (three), the sheet drag, the free point, a note, the Undo word, a point or edge pressed. The Wright handles and the frame's side are hidden while a demo plays. The step grouping knows every kind of entry, including Wright's `cut` and `resize`. Save's "hers or a demo" flag is set when a demo loads.

**Alone?** The fork calls are the only threads into the gesture code, and they are all the same one-line call. Replacing the replay means keeping that one hook. The guard is self-contained and used by five doors.

### The sound question

**Does.** Nine short tones (point, line, circle, snap, lead on and off, fade and restore, fill, repaint) from a synthesiser the browser provides. Sound is unlocked on her first press and plays without asking; the "may I use sound?" markup has no script.

**Lives.** Lines 628–665; `playSound` is called at about twenty-five places; `unlockAudio` on every press and release.

**Alone?** Yes. Make `playSound` do nothing and the lab is silent; delete the dead markup.

### The Roman glass default fill

**Does.** `FOREST_GLASS`, `#c2d4bc`, is the colour a shape takes when no colour is chosen, the craft row's clear chip, and the colour New resets the palette to. The came colour was chosen against it.

**Lives.** Line 599; used at about eight places (fill, tap, Wright's tap, the sheet, New, the craft row).

**Depends on it.** The craft row; the came colour's contrast argument. The Wright board's *empty* (no glass) is a different thing from clear (Roman glass) and the colour totals distinguish them.

**Alone?** Yes. It is one constant. Making it per board or per palette is a small change once the craft row reads the data file.

### Notes on constructions

Two different things share the word.

**Canvas notes.** A double tap on empty ground places a note box on the plane, in world coordinates, with a drag bar, a resize corner and callout arrows she can drag to points. They are entries in the record (`note_open`, `note_close`) and replay with it, step by step in a demo, and are drawn on the postcard. Reachable at level `both`, and, because the window profile's tap falls through, on Stained Glass Circles too, though no words anywhere mention them. Not reachable on the framed boards. Lines 1046–1279, the callouts in render (2974–3010), the export (2095–2119), their styles.

**The save note.** The name and note she types when saving; shown as a floating card when the design opens; drawn on the postcard at the position she dragged the box to.

**Depends on it.** Replay (the entries), the step grouping (a note is a visible step), the postcard, pan and zoom (note boxes are repositioned on every move).

**Alone?** Canvas notes could be removed if replay keeps understanding the two entries in old records (ignoring them), about 300 lines. The save note is part of the saved design's format and of the postcard.

### The picker window

**Does.** A grid of thumbnails over the board, with a backdrop that closes it. Three modes: her constructions and the standard set (Open), the palettes (Choose new colors), the drawing-guide models (dead). Draggable by its handle with a mouse only; a finger cannot move it.

**Lives.** Lines 5579–5772, its markup and styles.

**Depends on it.** Open, the palette tool, the thumbnails cached per standard construction.

**Alone?** Yes; it is one window with three builders. The models builder can go with the drawing guide.

### Remember

**Does.** "I want to Remember this", draggable, pushed down the column when tools stack there; hidden until the Maya flag is on. Mouse-only drag; a "drag to position" hint that fades.

**Lives.** Lines 5774–5801, markup, styles, and a reference inside the column's layout routine.

**Alone?** Yes. The layout routine would lose three lines.

### The eraser

**Does.** At level `both` only: a double tap on a line or circle fades it to scaffolding (and its points, unless another unfaded thing needs them, or they sit on a labelled axis); double tap and drag sweeps across several; a faded thing double-tapped comes back. A rounded eraser cursor follows the drag. Faded things are `scaffold` entries in the record and hit-test at half the usual radius. Nothing is ever removed.

**Lives.** State 3661–3670, the cursor 2722–2746 and 2936–2945, detection in the press 3765–3806, the sweep 3862–3895, the release 4279–4318, the helpers 3921–4027 and 4228–4246, the tip 'eraser'. About 250 lines.

**Depends on it.** Replay (the `scaffold` entry), drawing (scaffold opacity), hit-testing (half radius), the step grouping, the tip.

**Alone?** Yes, if replay keeps understanding `scaffold` for old records. Note that the series page proposes a different rule ("a line can be removed if nothing has been built from it; otherwise Undo"), which the eraser is not: it hides, never removes.

## 5. A picture behind the plane

**In `plane.js`: cheap.** The plane is pure transforms (world to screen and back, pan, zoom, the viewport's size) and one drawing routine for the lattice. A picture needs nothing from it that it does not already give: a world rectangle for the image, mapped through the transform each frame. Zoom and pan carry it for free.

**In `glass.js`: moderate, for one reason.** The scene is drawn in four places with four private mappings: the screen (`render`), the thumbnail (`captureConstructionPNG`), the share preview (`renderPreviewCanvas`) and the postcard (`renderPostcardPNG`). A picture drawn on screen but not on the postcard is wrong; drawing it four times is the kind of duplication that already bit the frame crop. The drawing order on screen is background, drawing box, lattice, fills, construction, points. The picture goes between background and lattice: one `drawImage` call, about twenty lines, once the four renderers are one.

**What needs to be in place first.**

1. One scene renderer that the screen and the three exports share, with the texture pass (mat, vignette, noise) as a post-pass on the postcard.
2. A home for the picture: in the record (an entry naming the file and its world rectangle, so it saves, replays and shares; a shared file then depends on the picture staying at its address) or in the mount (the story says which picture; a saved design does not carry it). The fraction worknote leans toward the story choosing the painting, which argues for the mount, but then a design made over Caillebotte and opened in the gallery has no Caillebotte.
3. Transparent glass. Every fill today is opaque. A picture under opaque glass is invisible; the "transparent or solid" option the series page mentions stops being optional.
4. The frame as a crop that need not sit at the origin, since the vanishing point is the origin and the frame is the painting's edge.
5. A decision on Glass only: does the picture show in the finished window and on the postcard?
6. Image loading and resolution: the canvas already scales for Retina; a painting large enough to zoom into is a large file, and the page must wait for it before the first frame.

## 6. The shape of a board

Two possibilities, laid side by side. No recommendation here.

### Stay as flags inside `glass.js`

A board is: an entry in `LEVELS`, a flag variable set at the mount, and branches at the dozen places listed in section 1 (the record's first entry, replay, drawing, the three gesture functions, the lead collector, the three image renderers, the tips and their fade rules, the viewing words, the demo list, the step grouping, Save's level tag).

Judged against seven boards: seven flags; each gesture function a chain of seven early returns; roughly 350 to 500 lines per board, so the file reaches 8,000 to 9,000 lines; every board change is a change to the one file that every live page loads, so every step is checked against every page. The two boards built this way did not break each other, so it works; its cost is that nothing stops the next board from reaching into the shell's routines, as the straightedge frame reached into the geometry and Wright reached into the step grouping, and that cost grows with the square of the boards.

### A board as a small separate file the engine loads

A board is a file, say `js/boards/wright.js`, that registers itself (`CW.boards.wright = {...}`) and supplies how panes get made and nothing else. The shell asks it for the panes and draws the rest.

What the interface between shell and board would have to carry, judging from what the two existing boards actually touch:

1. **The board's entries in the record and how to replay them.** Wright has `cut` and `resize`; a right-triangle board would have `triangle`; Stained Glass has `line` and `circle` with crossings. The shell's replay loop calls the board for entries it does not own.
2. **The panes, as shapes with stable names.** Today there are two naming schemes: a list of point ids round the shape (circles and lines) and a rectangle in units (Wright). The shell needs one, because fills, hit-testing, sheets, the parts list and Undo all key on it. A pane key made from its geometry (the sorted vertices, or the rectangle) is the likeliest common form.
3. **The lead the board insists on regardless of colour.** Wright: every cut and the frame. Others: none. One function returning segments and arcs.
4. **Gestures.** The shell owns pan, zoom, pinch, full screen, Undo as a tap or a word, and tap-to-colour on a pane. The board owns making: a press, a move and a release in world coordinates, with the grid's current step to snap to, returning what it wants drawn as a readout while the drag lasts. This is the hardest cut, because today one function decides both.
5. **The frame.** Present or not; the lock rule; what happens to glass when the frame resizes (Wright's one pane follows the frame).
6. **The words.** The tips and their fade rules; the demo list; the Glass only word's opposite.
7. **The unit.** What one step is, so the plane's grid and the plan's numbers agree.

What it would cost: this is the extraction job again at the same scale (several sessions). The gesture functions have to be split into shell and board halves; the two existing boards and the circles profile have to be rewritten into the form; the geometry engine (points, lines, circles, crossings, the shape under a tap: about 1,500 lines) has to be decided, because it is a board for Stained Glass and far from small. If it stays in the shell as a service any board may call, a board file is small (Wright would be about 300 lines) and Stained Glass's board file is a thin declaration; if it moves out, "a small separate file" is not true of that one board.

What it would buy, judged against seven: a seventh board cannot break the other six; the shell is one place that is defined once; the construction harness in `tools/` can test a board's replay alone; the standalone lab becomes one more board rather than the thing the others are flags on.

## 7. The straightedge board

Retiring level `lines` would remove from `glass.js`:

- The frame-as-geometry: `FRAME_UNIT`, `FRAME_DEFAULT`, `FRAME_MIN`, `buildFrame` (four points and four lines at negative positions), `frameOp`, `frameLocked`, the `init` entry carrying `frame`.
- The free point: the `free_point` entry, `freePointOp`, `freeMovable`, `placeFreePoint`, `moveFreePoint`, the `FREE_DRAG` state.
- Dragging a side: `frameDrag`, `frameSideAt`, `resizeFrame`, `tenth`, `hundredth`, the `FRAME_DRAG` state.
- Glass by hand: `paintPending`, `paint`, `paintAlong`, `commitPaint`, the sheet preview in render.
- Drawing: `FAINT_OUTSIDE`, the two-pass construction drawing (faint outside, clipped inside), `drawFrameMeasure`, `frameMeasureText`.
- The tips 'lines' and 'board-color' and their fade rules; `userLineCount`; the "one of billions" count's correction for the frame's four lines.
- Outside the file: `models/logs/geo_halves.json` and its line in `constructions.json`, `tools/glass-lines-constructions.js`, the harness's `board` option in `tools/glass-log.js`, and the page itself with its line on the Experiments index.

About 330 lines in `glass.js` and three files.

**What the other boards use that lives behind `BOARD`:** nothing lives *only* there. But several things the Wright window relies on came in with the straightedge board and live behind `FRAMED`, which is `BOARD || WRIGHT`: the `frame` rectangle and `inFrame`, `frameScreenRect`, `strokeFrame`, the crop at the frame in the three image renderers, the off-centre home view, two-finger panning, the wheel as a pan, Save's level tag and Open's listing by level, the demo list by level, the resize observer's re-homing. Retiring `lines` turns `FRAMED` into "has a frame", which is what it should have meant.

**Sheets** (several panes dragged into one piece of glass) also came with the straightedge board and are now how every fill is read; they stay. The drag gesture that makes a sheet goes; a sheet as a kind of fill stays, so old records replay.

**What is lost that nothing else has:** the one free point placed outside the frame, and lines fainter outside the frame than inside (a nice reading of "construction outside, art inside" that Stained Glass on a grid may want back).

**A caution.** A child who saved a design on the straightedge experiment has an entry tagged `level: 'lines'` in her browser; after retirement nothing lists it. Harmless to the code; worth a word if the page was ever shown to a child.

## 8. `plane.js`

**Is it the one plane?** Yes, in its own terms. It owns the view (the world point under the centre, the zoom), the two transforms (world to screen and back, the only places that know world y is up), one zoom clamp, the viewport's size as state, a unit frame (where 0 sits and how long one unit is), the 1–5–10 lattice step and its drawing with tick numbers, and the pixel floor. It is 221 lines and it knows nothing about glass.

**Where `glass.js` keeps a second idea beside it.**

- **Three units.** The lab declares a different unit frame per board (200, 240 or 56 world units) by calling `setUnitFrame`. The plane serves each honestly, but there is no metre: no one length that every board's numbers are in.
- **The default view, twice.** The plane's default zoom is `min(width, height) / 900`. The lab recomputes the same formula at line 3357 to decide whether *Reset view* should appear. If the plane's default changes, the word will lie.
- **Numbers, twice.** The plane draws tick numbers with the lattice; Wright draws its own numbers along the bottom and left with the lattice hidden.
- **Snapping, twice.** The plane knows its lattice step; lattice minting in the lab recomputes the nearest crossing from the step and the unit (`latticeMintTarget`), and the two framed boards round on their own.
- **Lines to the edge.** `extLine` reads the canvas's size to extend a line past the view, which is the plane's business (it has the viewport).

**The one window read.** `plane.js` line 56 starts its viewport from `window.innerWidth` and `innerHeight` until the lab calls `setViewport`. On a story page the host is not the window, so the first default view is computed for the wrong size; `resizeCanvas` corrects it before the first frame. Harmless, but it is the one place the plane assumes the canvas is the window.

**In `glass.js`:** none. Every size is read from the host or the canvas (`hostW`, `hostH`, `canvas.clientWidth`), which the extraction made true. The pages size the host from the window on purpose (72vh tall, 100vw wide on the board pages), which is theirs to do.

**What the plane lacks for the inventory:** a way to set the lattice step directly (resolution), and a declared metre. Both are small additions to a file that is in good shape.

## 9. An order of work

Small steps, each leaving the three live pages (the standalone lab, Glass Circles, the Wright experiment) working and looking the same except where named. Tidying first (nothing a child sees changes); rebuilding after. Every step: bump `CW_VERSION` and the `?v=` query, run `tools/check-deploys.sh`, and compare the three pages against the committed version before moving on, the way the Time Machine tidying did (hashes of the rendered pages, served side by side).

### Tidying

**T1. Remove the dead code.** The drawing guide and its stack, `exportImage`, `toggleLines`, the ghost layer, the sound question's markup, `CRAFT_SWATCHES`. About 430 lines. *Risk:* the column's layout routine and the panel width constants reference the tool stack; the picker's third mode; the z-index order of the layers. *Check:* the column, Color, Open, Share and a demo on each of the three pages look the same.

**T2. Keep the harness honest.** `tools/glass-log.js` cuts `glass.js` apart by the text of its section headers to run the geometry in Node. Any move of code must keep those headers or update the harness, and the nine standard logs must come out byte-identical (the board records this was done once on 2 October). *Risk:* none to the pages; a silent break of the tool that writes demos.

**T3. One scene renderer.** Fold the four drawings of the scene (screen, thumbnail, share preview, postcard) onto one routine that takes a mapping and options, with the postcard's texture as a pass after it. *Risk:* small pixel differences in the exports. *Check:* a postcard and a thumbnail of the same design before and after, compared.

**T4. Gather the boards.** Move every `BOARD`, `WRIGHT` and `FRAMED` branch into two blocks inside the file (one per board), called from the places the branches were. Still flags, still one file, zero visible change. *Why first:* this step reveals the real interface of section 6 by making the boards' reach visible, without committing to separate files. *Risk:* order of operations in the gesture functions; the early returns must keep their order. *Check:* every gesture on each page.

**T5. One readout, one formatter.** The three measure routines onto one. *Risk:* Wright shows whole numbers only and the others show ≈; the one formatter must take the board's rule. Visible change: none if it does.

### Decisions needed before rebuilding

- Whether the straightedge board retires (section 7). If yes, step R1 shrinks and the frame has one model to start from.
- The fullscreen convention: first touch (the series page) or a column word (the 22 October ruling for the Time Machine).
- Whether the standalone `both` lab keeps its own powers (edge-led lead, the eraser, minting, earned numbers, Full sheet) as a board of its own, or whether Stained Glass replaces it in the gallery.
- Where the picture behind the plane lives (record or mount), since the frame and the renderer are being rebuilt anyway.
- The pending definitions of section 4, at least Save and Open and Demo, because Glass Circles inherits them.

### Rebuilding

**R1. Retire `lines`** (if ruled). Visible change: the experiment page goes; the three live pages do not change. *Risk:* `FRAMED` code paths must be re-read as Wright's.

**R2. One frame.** A crop rectangle in plane units as an entry in the record, present or absent by board, movable, snapping to the grid, one lock rule, resizes undoable. Wright's model becomes frame plus cuts. *Risk:* the Wright demo log and any saved Wright designs replay from the old `init` shape; replay must migrate them as it already migrates old `numbers` values. Visible change: none on Wright if the migration is right; the frame becomes movable (named).

**R3. The grid given, with resolution.** `plane.js` gains a step setter; the lattice shows from the start on every board; snapping asks the plane. Visible change on every page (the grid appears), so this is the first step a child would notice, and it is a ruling of 22 October.

**R4. The shell's interface, written down and built.** Section 6's seven items, as code, with Wright moved onto it first (it is the simplest board). *Risk:* this is the big one; the gesture split. Visible change: none on Wright.

**R5. Stained Glass Circles rebuilt on the shell.** It comes here, after R2 to R4, because it inherits the frame, the grid, Save, Open, Demo and the finished-work view, and the circles board is then "points, lines and circles with crossings" on the shell, with the straightedge back as the inventory asks. What has to be true before it: the frame exists as a crop on every board; the grid is given; one renderer; Save, Open and Demo defined; and Michael's words for the page, which say "two copper dots labeled 0 and 1" and no frame. *Risk:* Michael's own saved designs (Rose II, Bird, Candle, saved from the window profile with no level tag) must open; the story's demos must replay; the `measure` the page asks for becomes the shell's readout.

**R6. The plan with its parts list.** New, shell. Needs pane names and areas (R4's item 2) and the came's metal and thickness in the record. Wright's totals line is its seed and retires into it.

**R7. Mirror and quadrant modes; the picture behind the plane.** For the fraction window, on the shell of R4 with the renderer of T3 and the frame of R2.

The standalone lab is touched by T1 to T4 (invisibly), by R3 (the grid appears) and by the decision above about its own powers.

### Bug fixes, kept apart

Found on the way, not to be mixed with the tidying: lead thickness is not saved or shared; a dropped `.json` from one board replays on another (a Wright record dropped on Glass Circles builds a frame there); the picker, Remember and the drawing-guide image drag with a mouse only, against "every window draggable"; the "one of billions" window counts the frame's four points on the straightedge board and never fires on Wright (no points); the came colour fails against dark glass (open since August).

## 10. Surprises, and what is open

### Surprises

- **Two frames, two philosophies, nine days apart.** The straightedge board put its frame *into* the geometry so her lines could cross it and mint dots. Wright kept a separate model with no points at all. Both are reasonable; together they are the clearest sign that boards are being designed one at a time without a shell to stand on.
- **The craft row's data is loaded and ignored.** `palettes.json` carries empty, clear and lead; the lab reads it into a variable nothing uses and draws two hard-coded chips. The lead chip has never appeared.
- **Lead thickness is not saved.** A design reopens at the default; a shared file carries none.
- **A dropped file ignores the level.** The level filter is on Open's listing, not on the record; drop a Wright design on Glass Circles and `wrReplayOp` runs anyway and sets a frame.
- **Canvas notes are reachable on Stained Glass Circles** by a double tap on empty ground, though the words never mention them and a single tap undoes.
- **About 430 lines have been unreachable since before the extraction** (the drawing guide and its stack above all). The extraction prompt said "report what looked wrong and leave it", and the report of 1 October did name two of these; the rest were not named then.
- **The Node harness depends on the comments.** `tools/glass-log.js` finds the code it needs by the text of the `// ====` headers. Rename a header and the demo writer stops.
- **Two word sources.** The tips are written in the file and then overwritten at load from `text/geometry-v1.json` for four of them; the other boards' tips are in the file alone.
- **The postcard is a styled picture, not just the glass**: mat, vignette, gradient, noise, warm light. The inventory's "the window: just the glass inside the frame" is not what Share sends.
- **The two-instance proof is being deleted.** `experiments/glass-module-bench.html`, the page that showed two labs on one page do not interfere, is marked deleted in the working tree by the experiments clear-out under way in this checkout. If a shell is rebuilt, that proof will be wanted again.
- **The standalone lab is not the inventory's Stained Glass.** About 500 lines of its powers serve no story in the list. It hangs in the gallery.
- **One lab, two gesture sets** (one-finger pan on circles, two-finger on framed boards; the wheel pans on one and zooms on the other).
- **The page decides lab behaviour** in three places (`measure`, `fill`, `fullscreen`), against the ruling that a story hands her nothing the lab needs.

### Open, in the documents, not invented here

- Wright's beat; the doors for Triangles and Limits.
- Whether resolution changes are the child's or the story's to start.
- Costs in the plan: real prices or a made-up unit.
- Whether the perspective version is one story or a series, and whether it stays in this lab.
- Fullscreen: first touch, or a column word (two rulings, 21 and 22 October, for two tools).
- The frame's lock rule (proposed, not ruled). Whether the frame must start square.
- Erasing (proposed: remove if nothing built from it, else Undo; the eraser today hides and never removes).
- Layer order (proposed: bigger under smaller, a board may name one exception).
- Where Undo, Save, Demo and the palette sit in the column (proposed: Glass Circles' column is the standard).
- One mount call (proposed).
- Whether her window persists between visits; what Reset does.
- Whether the straightedge board retires (Michael to confirm).
- The came's colour against dark glass (open since August); lead or zinc.
- Whether the standalone `both` lab stays as a board of its own.
- Whether crossings-make-no-points is a board rule, a per-circle choice, or a new kind of entry.
- Whether the picture behind the plane lives in the record or in the mount.
- The unit's name: the inventory and the Labs ruling speak of a metre; no board has one.

### What I did not read

The brief's reading list in full, the board's Glass Geometry entries since 1 October, `MANIFEST.md`'s entries for the four pages and the bench, the four pages, both data files, `text/geometry-v1.json`, the head of `tools/glass-log.js`, and all of `glass.js` and `plane.js`. I did not read `Story-Voice.md` or `00-PUBLISHING-A-STORY.md` this session; this is a code audit and they govern words and publishing. I did not run the pages in a browser; every statement about behaviour is from the code and the board's checked entries, not from a screen. Where the code and the board's description of a check disagreed I have said what the code does.
