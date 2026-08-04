# Inventory — Glass Geometry

Descriptive inventory of `cw-deploys/active/glass-geometry.html` (4,882 lines,
238 KB) for an instance that cannot read the file directly. **Nothing here
proposes changes.** Where something is half-built, vestigial, or implemented
twice, it is flagged as found, not fixed.

The file is well-sectioned: ~26 blocks marked `// ====` with `What:`, `Depends:`
and `Exposes:` headers. Section names, in file order: CONSTANTS, AUDIO,
OPERATION LOG + DATA STRUCTURES, CANVAS NOTES, SAVE FLOW (revised), GEOMETRY
HELPERS, ACTION LAYER, FILL POLYGON + HIT TEST, REGION DETECTION, CANVAS + VIEW,
RENDER, ERASER CURSOR, AXIS LABELS, HIT TESTING, SEGMENT AUTO-COMPLETE, PALETTE
ACTION HELPER, INTERACTION STATE MACHINE, PALETTE DATA, MODEL DATA, STATE, TOOL
ACTIONS, PANEL TOOL SYSTEM, PALETTE TOOL, CONSTRUCTIONS PANEL, STEP-THROUGH
REPLAY, DRAWING GUIDE, PICKER WINDOW, REMEMBER INSCRIPTION, LAYOUT ENGINE,
UTILITY, HOW-THIS-WORKS TIP WINDOW, STARTUP.

---

## 1. Coordinate system

**There is a world space, and geometry is stored in it.** Points, lines, circles
and fills all hold world coordinates. Screen pixels appear only at render and hit
test time. This is the single most important fact about the file: the data model
is already resolution-independent.

The whole transform is two functions and three mutable globals:

```js
var viewX=0, viewY=0;
var viewScale = Math.min(window.innerWidth, window.innerHeight) / 900;

function w2s(wx,wy) { return { x:(wx-viewX)*viewScale+canvas.clientWidth/2,  y:(wy-viewY)*viewScale+canvas.clientHeight/2 }; }
function s2w(sx,sy) { return { x:(sx-canvas.clientWidth/2)/viewScale+viewX,   y:(sy-canvas.clientHeight/2)/viewScale+viewY }; }
```

`viewX,viewY` is the world point under the screen centre; `viewScale` is
pixels-per-world-unit. **World y is down** — there is no y-flip, so world space
inherits screen orientation. (Note the contrast with `number-theory-v1`, §10,
which flips y. Any shared module has to decide this.)

**Conversion sites:** `w2s` is called in 30 places, `s2w` in 17. They are
concentrated — render, hit test, eraser cursor, axis labels, note positioning,
export — rather than scattered arbitrarily.

### Is there a declared unit?

**No. The unit is implicit and lives in the log's first entry**, not in any
scale variable:

```js
operationLog = [{ op:'init', seed0:{x:-100,y:0}, seed1:{x:100,y:0} }];
```

The two seed points are 200 world units apart, and **that distance _is_ the unit
interval**. Nothing declares this; it is recovered at render time by measuring:

```js
var unit = dist(s0.x, s0.y, s1.x, s1.y);   // in getAxisLabels()
```

So "1" means whatever the seeds happen to be apart. There is no scale factor
saying what a unit interval represents, no origin object, no unit object. A
construction that has had its seeds moved (not currently possible, but nothing
prevents a log from declaring different seeds) would silently rescale everything
measured against them.

`viewScale`'s initial value is derived from **screen size**
(`min(innerWidth,innerHeight)/900`), so the same construction shows at a
different pixels-per-unit on every device. That is deliberate — the comment says
"the workspace feels the same size regardless of screen" — but it means initial
zoom is not reproducible across machines.

### Pan and zoom

Both are live. Pan: drag on empty canvas, `viewX/viewY` updated directly from
the pointer delta divided by `viewScale`. Zoom: mouse wheel and two-finger
pinch. There is no zoom-to-cursor — **wheel zoom scales about the screen centre**
because it changes `viewScale` without compensating `viewX/viewY`.

**Three separate zoom clamps, with three different ranges** — flagged as the
same concept implemented three times:

| Site | Range | Context |
|---|---|---|
| wheel handler | `s>0.1 && s<10` | mouse wheel |
| pinch handler | `s>0.1 && s<10` | two-finger |
| `fitViewToConstruction()` | `0.05` – `2.0` | fit-to-content on load/replay |

The first two are identical code written twice; the third disagrees with both.

### What would resist extraction as a standalone module

1. **`viewX/viewY/viewScale` are bare mutable globals**, written from at least
   nine sites (init, new construction, fit-to-view, wheel, pinch, pan, replay
   restore, step-through restore, startup). Any module boundary has to turn nine
   direct writes into API calls.
2. **`w2s` closes over `canvas`** for `clientWidth/clientHeight`. The transform
   is not a pure function of (world, view) — it needs the viewport element.
3. **The unit lives in the operation log, not the view.** A coordinate module
   that owns "what a unit means" would have to read `points.get('seed:0')` and
   `seed:1`, i.e. reach into the geometry model. Currently only `getAxisLabels()`
   does this.
4. **Threshold division is inconsistent.** Hit tests correctly convert screen
   tolerances to world by dividing by `viewScale`
   (`THRESHOLDS.pointHitRadius/viewScale`, and the same for line, circle, snap).
   But `regX()`'s duplicate-point rejection uses a **bare world constant**:
   `if (dist(pt.x,pt.y,ex.x,ex.y) < 5) dup = true;` — no scale division. At the
   default unit of 200 units per interval this is 2.5% of a unit; it does not
   track zoom, and it is the one place where a "how close is close" decision is
   made in world units with a magic number.
5. **Mixed-space records in the log.** `note_open` stores `x,y` in world
   coordinates but `width` in **screen pixels**, and the code says so:
   `// width is stored in screen pixels; legacy logs may have world-coord values (< 100) — normalize`.
   A single op carries both spaces, with a heuristic (`>= 100`) to guess which.
6. **World y is down**, which any shared module with `number-theory-v1` must
   reconcile.

---

## 2. Tool registry

Two distinct systems, both managed by the PANEL TOOL SYSTEM section.

**Panel tools** — dock into the left column, **maximum two open at once**
(opening a third closes the oldest). Positioned by `layoutPanelTools()`, which
stacks them vertically from `TOOLS_TOP`, below the How-this-works panel if it is
showing, with `PANEL_TOOL_GAP` between. All are draggable by their header and
have a `close` word (not a button).

| id | DOM | title | What it does | Shown when |
|---|---|---|---|---|
| `constructions` | `#tool-constructions` | "Constructions" | Two collapsible sections: built-in canonical constructions and the child's saved ones. Thumbnails; opening one loads it via `replayLog` | "Open" action word, or the picker |
| `palette` | `#tool-palette` | palette name, e.g. "Chartres" — the title itself is the button that opens the palette chooser | Colour swatches for the current palette plus craft swatches, lead-thickness slider | "Color" HTW stage, or `openColorTool()` |
| `model` | `#tool-model` | model name, e.g. "Nested Squares" | Scale and opacity sliders for the tracing-guide overlay | `openDrawingGuide()` |

`getPanelToolEl(id)` returns `null` for anything else — the registry is a
three-way if-chain, not a table.

**Workspace tools** — free-floating windows (`.workspace-tool`, `position:fixed`,
z-index 500), dragged by header, tracked in `state.workspaceTools`. Opening a
panel tool that is already a workspace tool pulses it rather than duplicating.

**The picker window** — a full-canvas modal grid used for *both* model choosing
and palette choosing (`openPickerWindow('constructions'|'palettes')`).

**The left panel itself** is not a tool. `#htw-panel` holds the heading "How this
works" and four `.htw-item` entries (`data-stage`: construction, shapes, color,
eraser) plus three action words — New, Open, Save — which are direct actions, not
stages. This matches the CLAUDE.md design note that the Tools dropdown was
removed; `collapseMenu()` survives as an explicit no-op: `function collapseMenu() { /* no-op — Tools menu removed */ }`.

---

## 3. Gesture vocabulary

All canvas gestures go through one handler triple —
`onDown`/`onMove`/`onUp` on `pointerdown`/`pointermove`/`pointerup` — plus
`wheel`, `contextmenu` (suppressed), `dragover`/`drop`.

State machine: `IDLE → POINT_PRESSED → AWAITING_SECOND_TAP` (line) or
`→ DRAGGING_CIRCLE` (circle).

**Universal — not tool-dependent. There is no armed-tool concept anywhere in
this file.** What a gesture means is decided entirely by *what is under the
pointer*, never by a selected mode:

| Gesture | Target | Meaning |
|---|---|---|
| tap | point | select; first tap arms a line, second completes it |
| tap-hold-drag | point → anywhere | circle: centre + radius, snapping to existing points |
| tap | empty space | **undo** (`undoOp()`) |
| double-tap | empty space | new construction (with confirm) |
| double-click | empty space | open a canvas note |
| tap | segment / arc | emphasize (place lead) |
| double-click | segment / arc | fade it to scaffold |
| double-click + hold, then drag | segments | eraser sweep — fade/restore many; mode locked at sweep start (`eraserSweepMode = 'fade' \| 'restore'`) |
| tap | filled region | delegated to `tryPaletteAction()` — recolour or dissolve depending on palette state |
| drag | empty canvas | pan |
| wheel | anywhere | zoom (about screen centre) |
| two-finger pinch | anywhere | zoom |
| drop file | anywhere | load construction |
| Cmd/Ctrl-S | — | save |

Thresholds: `{ tapMovement:8, doubleClickTime:300, snapDistance:15,
pointHitRadius:12, lineHitRadius:14, circleHitRadius:8 }` — all screen pixels,
converted to world by dividing by `viewScale` at use.

Faded (scaffold) elements keep **half** the hit tolerance of solid ones
(`tFade = t*0.5`), so they remain reachable but yield to live geometry.

Three or more simultaneous pointers are ignored outright.

---

## 4. `operationLog`

**The log is the source of truth, not a parallel record.** Every mutation calls
`appendOp()`, which pushes and immediately calls `replayLog(true)`; `replayLog`
clears and rebuilds *every* derived Map from scratch. Undo is `operationLog.pop()`
followed by a replay. There is no incremental update path and no way for the
Maps to drift from the log.

```js
function appendOp(op) { operationLog.push(op); replayLog(true); checkHtwTriggers(); checkTipFadeThresholds(); }
function undoOp() { if (operationLog.length <= 1) return; operationLog.pop(); replayLog(false); }
```

Derived structures, all rebuilt on every op: `points`, `lines`, `circles`,
`logicalSegments`, `logicalArcs`, `fills`, `pointAnimations`, `canvasNotes`.

**Coordinates in the log are world coordinates**, with the two exceptions noted
below.

### Op types and fields

| `op` | Fields | Notes |
|---|---|---|
| `init` | `seed0:{x,y}`, `seed1:{x,y}` | always index 0; carries the implicit unit |
| `line` | `p1Id`, `p2Id` | infinite line through two points |
| `circle` | `centerId`, `edgeId` | radius derived, never stored |
| `emphasize` | `key` | key of a logical segment or arc |
| `deemphasize` | `key` | |
| `fill` | `fillId`, `vertices`, `edges`, `color`, `opacity` | vertices in world coords; `edges` carries arc info for curved boundaries |
| `repaint_fill` | `fillId`, `color`, `opacity` | |
| `dissolve_fill` | `fillId` | sets a flag; the fill is never removed from the log |
| `scaffold` | `target:'line'\|'point'\|'circle'`, `idx`, `value` | fade/restore |
| `numbers` | `value` | toggles axis-label visibility — **a view setting recorded as a geometry op** |
| `note_open` | `noteId`, `text`, `x`, `y`, `width`, optional `anchors[]` | **mixed space**: x,y world, width screen px |
| `note_close` | `noteId` | |

Point ids are structural, not sequential: `seed:0`, `seed:1`, and intersections
keyed by what produced them — `ll:i:j` (line×line), `lc:i:j:k` (line×circle),
`cc:i:j:k` (circle×circle), with indices ordered so the key is stable regardless
of creation order. Intersections are **discovered, never logged** — they are
recomputed on every replay by `detectLineX`/`detectCircX`.

Two legacy-migration paths live inside `replayLog`: the `note_open` width
normalisation, and `anchorX/anchorY` → `anchors[]`. Both are load-bearing for old
saved files.

### Written, replayed, saved, loaded

- **Written:** only via `appendOp`.
- **Replayed:** `replayLog(animateNew)`; `animateNew` controls whether new points
  get birth animations. Editing state for open notes is preserved across replays
  by a snapshot taken at the top of the function.
- **Saved:** see §7.
- **Loaded:** `_loadFromFile(file)` for dropped JSON; `loadConstruction` and the
  Constructions panel for localStorage entries. On load the view is explicitly
  **not** restored — `// Always use default viewport — do not restore saved zoom`
  — even though saved entries contain a `viewport` block. Flagged: the field is
  written and then deliberately ignored.

---

## 5. `HTW_STAGES`

Four stages. Content is overridden at startup from `../text/geometry-v1.json` if
that file loads; the array below is the hardcoded fallback. Stage 0 has
`trigger: () => true` and never auto-fires (the loop starts at `i = 1`) — it is
the panel entry and the first-visit window only.

Seen-state is per stage in localStorage under `cw-htw-geometry-v1-<id>`, with a
backward-compatibility alias at the bare key for `construction`.

| id | Panel label | Fires when | Suppressed when | Auto-fades when |
|---|---|---|---|---|
| `construction` | Lines and Circles | never automatically | never | 2 lines **and** 2 circles exist |
| `shapes` | Cutting Shapes | 15 or more points exist | any `emphasize` op has ever been recorded, **or** any fill exists | 1 or more undissolved fills |
| `color` | Color | 4 or more undissolved fills | any `repaint_fill` op has ever been recorded | a repaint count threshold |
| `eraser` | Hiding Lines | 30 or more points exist | any `scaffold` op has ever been recorded | — |

The suppression logic is the design principle made literal: if the child is
already doing the thing, the tip is **marked as seen without ever being shown**
(`htwMarkStageSeen(s); continue;`), so it will not appear later either.

Two separate mechanisms, worth distinguishing:
- **`checkHtwTriggers()`** — should a window open? Skips if one is already
  showing; first eligible unsuppressed unseen stage wins; `break`s.
- **`checkTipFadeThresholds()`** — should the *open* window fade because the
  child has demonstrated competence? Fires once per stage (`_tipFadeFired`).

Both are called from `appendOp`, so evaluation happens on every logged act.

Tip body text supports two inline markers: `{keyword}` renders highlighted,
`[keyword]` renders as a tappable action wired through `HTW_TIP_ACTIONS` —
currently `New`, `Open`, `Save`, `Choose new colors`.

The `color` stage is the only one with a side effect at trigger time: it calls
`openColorTool()` before opening the window, so the panel is there to point at.

---

## 6. `#remember`

**It captures nothing.** This is the largest gap between documented intent and
implementation in the file.

What exists: a `<div id="remember">` holding three spans — "I want to" /
"Remember" (in copper `#b87333`) / "this" — and a `mousedown`/`mousemove`/
`mouseup` triple that lets it be dragged. On first drag it sets
`state.rememberManual = true`, which detaches it from `layoutPanelTools()`'s
auto-positioning so it stays where the child puts it. A "drag to position" hint
appears below it and fades after 4 seconds.

There is **no click handler, no storage write, no capture of what is on the
canvas, no queue, no typing of the remembered thing**. It has no relationship to
the operation log. Grepping every reference to `remember` outside its own drag
code yields only CSS, the element lookup, and one `getBoundingClientRect()` call
in the layout engine.

So: the inscription is present as a *permanent visual promise* — consistent with
"never fades, encodes child data ownership" — but the mechanism behind it is
unbuilt. The Jul 28 decisions ledger records "I want to remember this" as
explicitly **deferred**, so this is expected state, not rot.

---

## 7. Save / open / export

### Flagged: two complete save implementations, both reachable

The file contains two parallel save paths that write to the **same localStorage
key scheme** with **different entry shapes**. Section header at line 1127 says
"SAVE FLOW (revised)", so the older one appears to have been superseded without
being removed.

| | Older path | Newer path |
|---|---|---|
| Entry point | `saveConstruction()` | `showSaveDialog()` |
| Chain | → `showNoteUI()` → `commitSaveConstruction()` | → `showSaveNoteBox(mode)` → `doSaveConstruction()` |
| Reached from | Cmd/Ctrl-S; the "save before leaving" dialog in step-through replay | the `Save` action word; the `Save` tip action; startup path |
| Entry fields | `{key, name, note, created, operations, png}` | `{key, name, note, notePos, created, operations, png, viewport}` |
| Side effect | **always** also triggers a `.json` download | download only in the image/share branch |

Both use `key = 'cw-cx-' + Date.now()` and both append to the index at
`cw-cx-index`. A construction saved by one path and reopened is fine; but
`notePos` and `viewport` simply do not exist on entries written by the older
path, and the older path forces a file download the newer one does not.

### Storage

- `cw-cx-<timestamp>` — one entry per construction.
- `cw-cx-index` — array of `{key, name, created}`.
- `cw-htw-geometry-v1[-<stage>]` — tip-window seen flags.
- A preview-PNG cache keyed per built-in construction.

### File format

Dropped/downloaded JSON is `{ version:1, name, note, created, operations }` —
**the operation log and nothing else**. No viewport, no PNG. Loading it replays
from `init`, so a saved file is fully portable and device-independent. This is
the strongest part of the persistence design.

### Export

Yes, images can be exported, by two routes:

- **`exportImage()`** — full-canvas PNG. Computes a bounding box that explicitly
  includes complete circle extents rather than just intersection points.
- **`renderPostcardPNG()`** — the finished-art render: glass fills, lead, and the
  note text at the position the child placed it. Two sizes, `'postcard'` and
  `'fullsheet'`. Construction lines, circles and points are omitted. There is a
  preview canvas (`renderPreviewCanvas`, `showExportPreview`) before commit.
- **Share** — `doSaveImage(..., isShare)` uses `navigator.share` with the PNG as
  a `File` when available, falling back to a download.

Thumbnails for the Constructions panel are separate, via `captureConstructionPNG`
and `toDataURL`.

---

## 8. Axis and grid rendering

**There is no grid. There are no drawn axes.** This is the sharpest contrast with
`number-theory-v1` and the most important thing to know before designing a shared
coordinate system.

What exists is `getAxisLabels()` — **emergent numbering on points the child has
actually constructed**:

1. Find `seed:0` and `seed:1`; `unit = dist(seed0, seed1)`.
2. Label them `0` and `1` unconditionally.
3. Find the x-axis: the line containing both seeds.
4. Find a y-axis: any line through `seed:0` whose direction is perpendicular to
   the x-axis (dot product `< 0.05`). Explicitly *not* required to be vertical on
   screen — perpendicular to the seed line is the definition.
5. For every point in `points`, project onto the axis direction, divide by
   `unit`, and if the result is within tolerance of an integer, emit that integer
   as a label.

Tolerance is `unit * 0.012` — 1.2%, proportional to the unit, so it is
zoom-independent and scale-independent.

Consequences worth stating plainly:

- **Numbers appear only where a construction has produced a point.** There is no
  tick at 5 unless the child built something at 5.
- **All labels are positive** — `Math.round(Math.abs(n))`, commented
  "map convention — no negatives". The plane has no negative quadrants as far as
  numbering is concerned.
- **There is no renumbering under zoom**, because there is no step to adapt.
  Labels do not thin out as you zoom away; every qualifying point keeps its
  numeral at 10px Georgia regardless of `viewScale`. At low zoom they will
  collide.
- Labels are suppressed entirely in glass mode (`showGlass`) and during PNG
  export, and toggled by `showNumbers` (which is itself recorded in the log as a
  `numbers` op).
- Rendering is `ctx.fillText` at `w2s(point)` offset by `(+5, -3)`, slate
  `#546A80` at 0.72 alpha.

---

## 9. External files

Two `fetch` calls, both with hardcoded fallbacks, both non-blocking.

**`../text/geometry-v1.json`** — top-level keys `htw`, `uniqueness`,
`note_instruction`.
- `htw` → one entry per stage id (`construction`, `shapes`, `color`, `eraser`),
  each with a `body` array of lines, which replaces that stage's `content` at
  load. This is how tip copy is edited without touching code.
- `uniqueness` → `intro`, `calculation`, `conclusion`, `comparisons` — the "no
  one has made that before" text shown after saving.
- `note_instruction` → a single string.

**`../art/palettes.json`** — `{version, generated, note, palettes[15],
craft_swatches}`. Each palette: `{id, name, source, description, colors}`, where
`source` is a filename in `../art/` used as the picker thumbnail
(`img.src='../art/'+encodeURIComponent(pal.source)`). Default palette id is
`chartres_glass`.

**`../models/`** — five tracing-guide SVGs listed in `MODEL_FILES`:
`geo_squares_nested`, `geo_nested_triangle`, `geo_hexagon_triangle`,
`geo_pentagon_pentagram`, `ratio_golden_5` (display-named "Golden Rectangle" via
a one-entry override table; all other names are derived from the filename by
stripping the prefix and title-casing). Loaded as an `<img>` overlay, positioned
by CSS transform, with scale/opacity sliders — **entirely outside the canvas and
the coordinate system**. The guide is traced by eye; it has no geometric
relationship to world space.

`SVG_CACHE` holds inline copies of all five as fallback strings, so the guides
render even if `../models/` is unreachable.

**`../models/logs/`** — three operation-log JSONs (`geo_nested_triangle`,
`geo_hexagon_triangle`, `geo_squares_nested`) used as the built-in canonical
constructions in the Constructions panel. Note the asymmetry: five SVG guides,
only three replayable logs. `geo_pentagon_pentagram` and `ratio_golden_5` exist
as tracing guides with no corresponding construction.

---

## 10. `experiments/number-theory-v1.html` — the numbered plane

1,581 lines. A sketch, but the plane is the better-behaved of the two.

### Transform

One place, four lines, and **world y is up** — the opposite of Glass Geometry:

```js
let pan  = { x: 0, y: 0 };   // world coord under screen centre
let zoom = ZOOM_INIT;        // pixels per unit

function worldToScreen(wx, wy) { return { x: (wx - pan.x)*zoom + viewW/2, y: -(wy - pan.y)*zoom + viewH/2 }; }
function screenToWorld(sx, sy) { return { x: (sx - viewW/2)/zoom + pan.x,  y: -(sy - viewH/2)/zoom + pan.y  }; }
```

`viewW/viewH` are cached CSS pixels, so unlike `w2s` the transform does not reach
into the DOM. Zoom is clamped once, in one place: `ZOOM_MIN 4`, `ZOOM_MAX 600`,
`ZOOM_INIT 60`.

### Numbering and renumbering under zoom

A single adaptive step function drives **both** the labels and the grid, which is
why the texture stays coherent:

```js
function labelStep() {
  if (zoom > 40) return 1;
  if (zoom > 10) return 5;
  return 10;
}
```

Grid spacing above 40 px → label every unit; 10–40 px → every 5th; at or below
10 px → every 10th. Drawing walks visible world bounds computed by inverse-
projecting the screen corners, floored/ceiled to the step with a one-step margin
so lines do not pop at the edges.

Labels are **always positive** — the source comment is "positive in all four
directions" — matching Glass Geometry's map convention. Integers are formatted
with thousands separators; a thin-space fractional grouping helper exists and is
unused in this stage, parked for later.

Axis numbers are also hit-testable (`hitTestAxisNumber`), snapping world position
to the nearest labelled tick, so at low zoom only multiples of 5 or 10 are
clickable — the affordance follows the labelling.

### The faint shadows that read as misalignment

**Cause: half-pixel snapping is applied to everything except the grid.**

There is one helper, `function snap(v) { return Math.round(v) + 0.5; }`, and it
is used at exactly five sites — rectangle corners (all four), rectangle
diagonals, the width-highlight line, and the two axes:

```js
const axisX = snap(origin.x);
const axisY = snap(origin.y);
```

The grid loop does **not** use it. It strokes at raw fractional screen
coordinates:

```js
for (let x = wMinX; x <= wMaxX; x += step) {
  const sx = worldToScreen(x, 0).x;      // e.g. 180.7 — not snapped
  ctx.moveTo(sx, 0); ctx.lineTo(sx, viewH);
}
```

So for the same world coordinate, the axis or a rectangle edge lands on a
half-pixel boundary and renders as one crisp pixel, while the grid line lands
wherever the transform puts it and is anti-aliased across two pixel columns. Two
effects follow, and both are visible:

1. **A displacement of up to half a pixel** between the grid line for world *x*
   and the rectangle edge or axis at the same *x*.
2. **A soft double edge on the grid line itself** — the anti-aliased smear reads
   as a shadow beside the crisp line.

It is most obvious exactly where the two coincide, which for origin-anchored
rectangles on integer coordinates is everywhere they matter.

A secondary contributor: `GRID_WIDTH = 0.5` at `GRID_OPACITY = 0.3`. A sub-pixel
stroke is anti-aliased at *any* position, so grid lines can never resolve to a
single hard pixel the way the 1 px axes do — snapping alone would reduce the
misalignment but not fully remove the softness.

Both canvases are set up identically for HiDPI (`ctx.setTransform(dpr,0,0,dpr,0,0)`
here; `ctx.scale(dpr,dpr)` after a reset in Glass Geometry), so device pixel
ratio is not the cause — the inconsistency is purely which draw calls pass
through `snap()`.
