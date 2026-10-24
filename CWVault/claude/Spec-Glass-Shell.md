---
status: DRAFT, 24 Oct 2026 (Claude Code), written for step R4 of `claude/Prompt-Glass-Geometry-Go-Ahead-02.md` and built in the same step. Becomes `20-SPECS/Spec-Glass-Shell.md` once Michael has read it. Where the rulings or the inventory leave something open, this page leaves it open and says so.
role: The interface between the Glass Geometry shell (`js/glass.js`) and a board (`js/boards/<name>.js`): what a board supplies, what the shell owns, what the shell lends a board, how a pane is named, and the gesture vocabulary as code. The Wright window is the first board on it.
related: Prompt-Glass-Geometry-Go-Ahead-01.md (the twelve rulings), Inventory-Glass-Stories.md (the boards the shell must serve), Worknote-Fraction-Window.md, Report-Tidy-Glass-Geometry-01.md (what the Wright block reached into; the first draft of this), Audit-Glass-Geometry-Oct23.md §6
---

# The Glass shell and its boards

## The idea, stated once

The inventory says it in a line: *everything in "panes, by board" is the one thing a board supplies; everything else is the shell.* A board says how the plane is divided into panes and how she divides it. The shell owns the plane, the record, the frame, the grid, the glass and its came, the palette, the column, the demos, Save and Open and Share, the exports, and the geometry engine, which a board may call as a service. A board never sees a raw press: the shell decides what was touched and calls the board's one hook for it.

## Names

- **The shell:** `js/glass.js`, mounted by one call, `cwGlass(host, { board, palette, open })`. `board` is the name of a board; `palette` the palette to open with; `open` a construction to have ready behind the story's own word. Nothing else is passed: no `app`, `level`, `measure`, `fill` or `fullscreen` (ruling 10).
- **A board:** a classic script `js/boards/<name>.js` that registers a factory, `CW.boards.<name> = function (shell) { return board; }`. The shell calls the factory once at mount, handing it the services below, and keeps what comes back.
- **Two boards still live inside the shell** until R5 moves them out: `euclid`, the standalone lab (circles and lines, lead on edges, the map), and `circles`, Stained Glass Circles (the window profile: tap a pane to colour it, the circle measured as it is drawn). They are served by the same mount word and the same gesture dispatcher, with their old machinery behind it.

## The record

The record is the shell's. Its entries, and whose they are:

| Entry | Whose | What |
|---|---|---|
| `init` `{ seed0, seed1 }` | shell | the lab's two seeds, a metre apart |
| `init` `{ board, frame }` | shell | a board's opening: its name and, where it has one, the opening frame in metres |
| `frame` `{ left, bottom, width, height }` | shell | the frame moved or resized |
| `lock` | shell | the frame locked by the word |
| `resolution` `{ step }` | shell, viewing | the grid's step; a replay reproduces it, Undo skips it |
| `numbers`, `show_glass` | shell, viewing | the map and Glass only |
| `line`, `circle`, `emphasize`, `deemphasize`, `scaffold`, `lattice_point` | shell | the geometry engine's |
| `fill`, `repaint_fill`, `dissolve_fill` | shell | glass on a pane, recoloured, taken away |
| `note_open`, `note_close` | shell | notes |
| anything else | the board | by its shape: the shell offers every entry it does not know to `board.replay(op)` |

A **fill** names its pane one of two ways: `vertices` and `edges` (the geometry engine's point ids and the edges between them, straight or arc) for a pane the engine found, or `pane`, a board's own description of the pane, opaque to the shell, which asks `board.panePolygon(pane)` for its outline. The Wright window's panes are rectangles in metres, `{ x0, y0, x1, y1 }`; a right triangle's or an inscribed square's will be whatever that board says. A fill may still hold several panes (`panes`, a sheet), as the retired lines board left it.

**Older shapes** are rewritten in place before every replay, as the record has always migrated old values: the Wright window's first `init.wright`, R2's `init.unit`, `resize` → `frame`, and a fill's `rect` → `pane`. Saved records keep opening.

## One name for a pane

Fills, hit-testing, sheets and the parts list to come all key on the pane. The key is made from the pane's geometry and nothing else, so the engine's panes and a board's share one scheme: **the pane's boundary points — its vertices and, for a curved edge, the midpoint of the arc — each rounded to a thousandth of a world unit, sorted and joined.** A rectangle has four points and no arcs; a petal has two vertices and two arc midpoints, which is how the two half-lenses of a vesica, same vertices and same area, are told apart (the old scheme, point ids plus an area check, could not). The key is derived, never stored: a saved record carries the pane, not the key.

Open: the tolerance. A thousandth of a world unit is five millionths of a metre; the engine's own merge radius for crossings is far coarser (2.5 hundredths of a metre). One is the plane's and one is the engine's, and the rebuild has not said which the pane should take.

## The gesture vocabulary (ruling 9)

The shell decides what was touched, in this order, and calls one hook:

| Touched | Who | What happens |
|---|---|---|
| a frame handle | shell | the frame moves or resizes until the release (R2) |
| a segment the board offers | board | `board.dragSegment(seg, world)` returns a drag, or nothing |
| a point | board, else shell | `board.dragPoint(pt, world)` where the board has one; otherwise the shell's compass, where the board has circles |
| a pane | shell | a tap colours it with the colour chosen, clear glass with none, the first chip takes the glass away; a moved hand does nothing |
| empty ground | board | a tap: `board.tapGround(world)`; a mouse drag pans |
| two fingers | shell | the view: zoom and pan; the trackpad's two-finger scroll pans, a pinch zooms |

A **drag** is an object the board hands back: `{ move(world, pos, moved), end(world, isTap) }`. The shell calls `move` on every pointer move (`moved` is true once the hand has left the tap radius) and `end` once on the release. The board writes its entry in `end`, after `shell.fork()` so a demo she interrupts ends there.

**Segments** a drag may start from are the board's to offer: `board.segments()` returns them in world coordinates, `{ x1, y1, x2, y2, ref }`, and `ref` is whatever the board wants back. The shell finds the nearest within the line's hit radius. On the Wright window they are the frame's four sides and every cut.

**Undo** is a word. **Full screen** is a word in the column on every board, where the browser allows an element to go full screen (ruling 2); it reads *Full screen*, then *Exit full screen*, as the Time Machine's does. No touch on the board is spent on it.

Until R5 the two in-file boards keep their old machinery behind the dispatcher: one finger on empty ground pans there (on a board on the interface it does nothing; the view is two fingers), and the wheel zooms rather than pans. Named, not settled.

## What a board supplies

The object the factory returns:

| Member | What |
|---|---|
| `name` | its name in the record and the library ('wright') |
| `frame` | the opening frame `{ left, bottom, width, height }` in metres, or `null` for a board without one |
| `madeWord` | the word that brings the making back from Glass only ('Show lines') |
| `reset()` | a replay is about to begin |
| `onFrame(frameU)` | the shell's frame has changed (replayed, or under a handle) |
| `builtFromFrame()` | true once something is built from the frame; the shell's frame locks |
| `replay(op)` | replay this entry if it is yours; true if it was |
| `visibleOps` | `{ cut: true }`: which of its entries change the picture (the demo's step grouping) |
| `leadLines()` | its lead that is lead regardless of colour, as segments and arcs in world coordinates |
| `segments()` | what a drag may start from (above) |
| `paneAt(wx, wy)` | the pane strictly around a world point, as the board describes it, or null |
| `panePolygon(pane)` | the pane's outline in world coordinates |
| `dragSegment(seg, world)` | a drag from a segment, or null |
| `dragPoint(pt, world)` | a drag from a point, or null (optional; the shell's compass otherwise) |
| `tapGround(world)` | a tap on empty ground; true if it did something |
| `draw(ctx)` | what it draws over the glass: readouts while a line is pulled, and nothing else on the Wright window |
| `tips` | its How-this-works tips: `{ id, label, content, trigger(), suppress(), fades(), colour }`, each with its own fade rule |
| `mount(host)`, `update()` | optional: its own furniture in the host (the Wright window's colour totals), and the moment to refresh it |
| `state()` | for the Node harness and a browser check: its model as it stands |

## What the shell lends a board

The `shell` object handed to the factory. Everything is a function, so a board never holds the shell's state:

| Service | What |
|---|---|
| `log()`, `append(op)`, `fork()` | the record: read it, write an entry (the shell replays), end a demo at her first mark |
| `frame()`, `frameUnits()`, `metre()` | the frame in world coordinates and in metres; the metre in world units |
| `step()`, `snap(v)`, `clean(v)` | the grid's resolution, a value snapped to it, a value cleaned of float noise |
| `glass()`, `glassOn(pane)`, `splitGlass(fill, panes)` | the live fills; the fill holding a pane; glass in a pane cut with it, one fill giving way to one per pane, named after it |
| `w2s(x, y)`, `zoom()` | world to screen; the plane's zoom |
| `readout(ctx, text, x, y, align, baseline)`, `readoutText(word, v, rule)`, `numText(v)` | the one label and the one formatter (T5) |
| `lead()` | `{ colour, width }`: the came as drawn on screen |
| `showGlass()` | whether Glass only is on |
| `play(name)` | a sound, where sound is on |
| `host` | the host element, for `mount` |

The geometry engine (points, lines, circles, crossings, the face walk) is the shell's and is not lent yet: no board on the interface asks for it. Stained Glass will, in R5, and the services it needs are added then rather than guessed now.

## What the shell owns, drawn and otherwise

The plane and its grid; the frame, its handles, its measure, Lock, the home view; the glass and its came, in one scene renderer for the screen, the thumbnail, the preview and the postcard; the palette; the record, replay, Undo, the demo and the fork; Save, Open, Share, the library and what each mount lists (a board's designs carry its name); the column and every word in it; the tips' mechanism; sound as a setting; full screen.

The order of drawing on screen: the box, the grid, the glass with its came, the board's lead and the frame as one pass of came, the board's drawing, the frame's handles and measure, then the construction. The lab's own lead on edges is drawn after the construction, snapped and one stroke at a time, as it always was: two habits the renderer step settles (T3's list).

## Where the Wright window stands on this

`js/boards/wright.js`, 24 Oct 2026. Its model is its panes and cuts, read off the shell's frame. It offers the frame's sides and its cuts as segments; a drag from one pulls a line across the one pane on the side the hand moves to, settling on the grid, never on the pane's own edges. Its panes are rectangles in metres. It draws the pulled line and its readouts. Its three tips are the same words. Its colour totals are its own furniture. It has no points and no circles, asks for no geometry, and touches no state of the shell's but through the services above. The colouring of a pane, which it used to do itself, is the shell's.

## Open, not invented

- The pane key's tolerance (above).
- Where *Full screen* sits in the column: after *Share* for now, on every board.
- A drag that starts inside a pane does nothing. The frame is moved by its centre handle (R2's open question stands).
- The in-file boards' one-finger pan and wheel zoom, until R5.
- The lead's drawing order and habits per board, for the renderer step.
- What a board asks of the geometry engine, for R5.
- Mirror and quadrant modes and the picture behind the plane (R7): shell features the inventory names; nothing here provides for them yet beyond the frame and the plane being the shell's.
