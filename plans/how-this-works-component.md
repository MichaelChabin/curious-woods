# Plan: "How this Works" Tip Window Component

## What this is

A reusable tip window that bridges the reader-to-actor gap when a user arrives at any interactive. It shows a few key tips specific to that context, then gets out of the way.

Designed to evolve into a **context-sensitive guide** — the same component can later update its content as canvas state changes (e.g., when enough geometry exists to form closed regions and fill them with color). The architecture should keep content separate from mechanism so swapping in dynamic content later is straightforward.

First use: the Geometry workspace (geometry-v1.html).

---

## Behavior

### Canvas window (the tip itself)

1. **First visit** (no localStorage flag):
   - Window appears on the canvas, positioned above-left of the two seed points.
   - **No title on the canvas version** — the message speaks for itself.
   - The window is **draggable** and **closeable**.
   - Text inside must NOT be selectable — the entire window surface is a drag handle. Use `user-select: none` on the window. This prevents the current bug where trying to drag selects text instead.

2. **Context-sensitive stages:**
   - When canvas state crosses a threshold (e.g., ≥ 15 points), the window reappears on canvas with new content for that stage.
   - Each stage fires once (localStorage flag per stage).

3. **Closing the canvas window:**
   - Lowercase "close" link in the top-right corner of the window (matches palette and constructions panels).
   - On close: window fades out. The topic is added to the panel list in the tool area.
   - Sets localStorage flags.

4. **Every canvas window must be draggable and closeable.** This is a universal rule for this app — no exceptions.

### Tool area panel (the index)

The tool area shows an index of topics the child has encountered:

```
How this works
  • Making Lines and Circles
  • Cutting Shapes
  • Hiding Lines
  • Saving Glass
```

- **"How this works"** (no question mark) is a collapsible heading — click to show/hide the bullet list below it.
- **Bullets appear progressively** — only topics the child has encountered are shown.
- **Clicking a bullet opens the canvas window** with that topic's content. Nothing expands inline in the panel — the panel is an index, the canvas is where you read.
- On return visits (localStorage flag set), the panel starts collapsed with all previously-seen topics in the list.

---

## Stages and content

### Stage 1: Making Lines and Circles (shown on first visit)

```
You have circles and lines, and you start
with two points. All your beautiful patterns
begin with these.

Tap one point, then tap another to make a line.

Tap and hold one point, then drag to another
to make a circle.

  New points appear wherever lines and
  circles cross.

    You can use those points to construct
    other lines and circles.

Tap in any empty space to undo.
```

### Stage 2: Cutting Shapes

**Trigger:** ≥ 15 points (seeds + intersections). Check runs after each new intersection is created. Fires once.

```
Shapes are forming.

To cut a shape, tap a line. It will darken.
Then tap connected lines.
Enclosed shapes turn to glass.
To color your glass, tap a color, then the glass.
```

### Stage 3: Hiding Lines

**Trigger and content:** TBD — will be designed separately.

### Stage 4: Saving Glass

**Trigger and content:** TBD — will be designed separately.

---

## Visual design

Match the existing panel tool / workspace tool language exactly:

- **Canvas window**: parchment background `rgba(244,241,232,0.96)`, `0.5px solid #c8b89a` border, `border-radius: 6px`, subtle shadow. **No title bar** — just body text and a small "close" in the top-right corner. `user-select: none` on the entire window. `cursor: grab` (and `cursor: grabbing` while dragging).
- **Body text**: Georgia serif, 13px, `#546A80`. Indented lines use left padding (not nested lists).
- **Tool area heading**: "How this works" — 14px Georgia, `#546A80`, click to collapse/expand the list below.
- **Tool area bullets**: 13px Georgia, `#546A80`, clickable, hover `#3D3D3A`. Each bullet opens the canvas window with that topic's content.
- **Canvas window width**: natural width that reads well — no forced constraint. Should not be so wide it obscures the seed points.
- **Dragging**: the entire canvas window surface is the drag handle (since there is no title bar). Pointer events on the window initiate drag, not text selection.

---

## Related default: Lead lines on

Glass lead lines should be **on by default**. This ensures adjacent shapes with the same color remain visually distinct. Users can turn lead off via the existing Glass menu option. This is a one-line change in the CONSTANTS or state initialization section — not part of the tip window component itself, but should ship alongside it since the coloring tips assume lead is visible.

---

## Content data model

```javascript
var HTW_KEY = 'cw-htw-geometry-v1';

var HTW_STAGES = [
  {
    id: 'construction',
    heading: 'Making Lines and Circles',
    trigger: function() { return true; },  // always show on first visit
    content: [
      { text: 'You have circles and lines, and you start with two points. All your beautiful patterns begin with these.', indent: 0 },
      { text: 'Tap one point, then tap another to make a line.', indent: 0 },
      { text: 'Tap and hold one point, then drag to another to make a circle.', indent: 0 },
      { text: 'New points appear wherever lines and circles cross.', indent: 1 },
      { text: 'You can use those points to construct other lines and circles.', indent: 2 },
      { text: 'Tap in any empty space to undo.', indent: 0 }
    ]
  },
  {
    id: 'shapes',
    heading: 'Cutting Shapes',
    trigger: function() { return points.length >= 15; },
    content: [
      { text: 'Shapes are forming.', indent: 0 },
      { text: 'To cut a shape, tap a line. It will darken.', indent: 0 },
      { text: 'Then tap connected lines.', indent: 0 },
      { text: 'Enclosed shapes turn to glass.', indent: 0 },
      { text: 'To color your glass, tap a color, then the glass.', indent: 0 }
    ]
  },
  {
    id: 'hiding',
    heading: 'Hiding Lines',
    trigger: null,  // TBD
    content: []     // TBD
  },
  {
    id: 'saving',
    heading: 'Saving Glass',
    trigger: null,  // TBD
    content: []     // TBD
  }
];
```

---

## Implementation — where things go in geometry-v1.html

### 1. CSS (add after the `/* --- Panel tools --- */` section, ~line 119)

New section: `/* --- How-this-works tip window --- */`

Styles needed:
- `.htw-canvas` — canvas window: parchment bg, border, border-radius, shadow, `position: fixed`, `user-select: none`, `cursor: grab`, `z-index` above canvas but below modals.
- `.htw-canvas.dragging` — `cursor: grabbing`.
- `.htw-canvas-close` — small "close" positioned top-right.
- `.htw-body` — body text container: `font: 13px/1.55 Georgia, serif; color: #546A80;`
- `.htw-indent-1` — first indent level: `padding-left: 14px;`
- `.htw-indent-2` — second indent level: `padding-left: 28px;`
- `.htw-panel-heading` — "How this works" collapsible heading in tool area.
- `.htw-panel-list` — bullet list: `max-height` transition for smooth collapse/expand.
- `.htw-panel-item` — clickable bullet item.

### 2. HTML

#### In the tools menu (add as a new `<li class="l2-item">` in `#tools-l2`):

```html
<li class="l2-item" id="htw-menu-item" style="display:none;">
  <span class="l2-label" id="htw-heading">How this works</span>
  <ul class="l3-list" id="htw-list">
    <!-- Bullets added by JS as stages are encountered -->
  </ul>
</li>
```

#### Canvas window (add after tools-root `</div>`, ~line 263):

```html
<div id="htw-canvas" class="htw-canvas" style="display:none;">
  <span class="htw-canvas-close" id="htw-close">close</span>
  <div class="htw-body" id="htw-canvas-body"></div>
</div>
```

Note: No `.panel-tool-header` on the canvas version — the entire window is a drag surface.

### 3. JavaScript

#### a. New section: `// HOW-THIS-WORKS TIP WINDOW` (add before STARTUP)

**Critical: dragging implementation.**
The canvas window must use pointer events for dragging (not mouse events — this is a touch-first app). The entire window is the drag handle. `pointerdown` initiates drag, `pointermove` moves the window, `pointerup` ends it. Must call `e.preventDefault()` to suppress text selection. Set `touch-action: none` on the element.

**Functions:**

- `initHowThisWorks()` — called at startup:
  - Check localStorage for which stages have been seen.
  - If **no stages seen**: build Stage 1 content, call `openHtwOnCanvas('construction')`.
  - If **any stages seen**: show the tool area heading + bullets for seen stages.
  - Register trigger checks for unseen stages.

- `checkHtwTriggers()` — called after each new intersection:
  - Walk `HTW_STAGES`, check each unseen stage's trigger.
  - If a new stage fires: call `openHtwOnCanvas(stageId)`, set per-stage localStorage flag.

- `openHtwOnCanvas(stageId)` — renders the canvas window with that stage's content. Positioned above-left of seed points. Attaches drag and close handlers.

- `closeHtwCanvas()` — fades out canvas window. Adds bullet to tool area list if not already there. Sets localStorage.

- `openHtwFromPanel(stageId)` — called when a bullet is clicked in the tool area. Opens canvas window with that stage's content.

- `toggleHtwPanel()` — collapse/expand the bullet list under "How this works" heading.

#### b. Register with existing systems:

- The `#htw-menu-item` is an `<li>` in `#tools-l2`, so it participates in the existing hover-reveal cascade.
- The `#htw-heading` click handler calls `toggleHtwPanel()` — collapse/expand behavior, NOT open the canvas window.
- Each `.htw-panel-item` click handler calls `openHtwFromPanel(stageId)`.

#### c. Trigger integration:

Wherever new intersection points are created, add a call to `checkHtwTriggers()`. Lightweight — one loop over stages, exits immediately once all have fired.

#### d. Startup integration:

In the `// STARTUP` section (~line 2933), after `initSound()`, add:
```
initHowThisWorks();
```

### 4. Constructions panel cleanup

**Remove** the existing "How this works" section from the Constructions panel (`cx-how-label`, `cx-how-list`, and the `cx-how-item` list items). The new component replaces this.

### 5. Lead lines default

In the state initialization, set lead lines to **on** by default. One-line change.

---

## Bug fix: current implementation

The existing How-this-works canvas window (if Claude Code has already built one) has a bug: **trying to drag the window selects text instead of moving it.** The fix:
- Add `user-select: none` to the window CSS.
- Add `touch-action: none` to the window element.
- Use `pointerdown`/`pointermove`/`pointerup` for drag (not mousedown).
- Call `e.preventDefault()` in `pointerdown` to suppress text selection.
- The entire window surface is the drag handle (no separate drag-handle element needed, since there is no title bar on the canvas version).

---

## What makes this a reusable component

The pattern is: `initHowThisWorks()` takes a config object:
- `key` — localStorage key (unique per interactive)
- `title` — panel heading (default: "How this works")
- `stages` — array of `{ id, heading, trigger, content }` objects
- `anchor` — positioning hint (element IDs or coordinates to position near)

For geometry-v1.html these are hardcoded constants. When extracted to a module, they become parameters.

**Future directions:**
- The `?` icon convention: every tool gets a `?` that opens contextual help, adding a new topic to the index.
- Maya/Claude integration: the tip window could become a surface where Maya offers contextual suggestions.
- Dynamic content: trigger functions can test any app state.

---

## What this plan does NOT cover

- Breaking geometry-v1.html into modules (separate effort)
- Testing (separate plan)
- Content for Stages 3 and 4 (to be designed separately)
- The `?` icon convention (future)
- Maya/Claude integration (future)
- Other interactives that will use this component (future)
