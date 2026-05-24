# Handoff to Coder — Integration of Tools System into Geometry Workspace
**Created:** March 6, 2026
**From:** Designer Chat
**Priority:** High — this is the next major development task

---

## The Situation

There are currently two separate prototype files:

- `prototypes/cw-default-page-lab.html` — 70KB, contains the complete HTML/CSS/JS tools system: two-panel layout, Tools menu, Palette tool, Model tool, Remember inscription, Picker window. Built by the Layout Manager. This is the UI layer.

- `prototypes/geometry-layer1.html` — 52KB, contains the complete construction engine: tap-tap lines, drag circles, intersection detection, fills, region detection, undo, sounds, pan/zoom. This is the canvas engine. It has its own older canvas-drawn palette strip and menu icon that need to be replaced.

**The goal:** One unified file — the construction engine from `geometry-layer1.html` running inside the two-panel layout with the HTML tools system from `cw-default-page-lab.html`.

The recommended approach is to use `cw-default-page-lab.html` as the base and integrate the canvas engine into it, rather than the other way around. The lab file's HTML structure is the keeper. The geometry file's canvas engine is what gets transplanted in.

---

## What to Keep from geometry-layer1.html

Everything from the first line of the `<script>` block down to the pointer event listeners, **except** the PAL system and MENU system (detailed below). Specifically keep:

**Keep entirely:**
- `COLORS`, `THRESHOLDS`, `PARAMS` constants
- The entire audio system (`unlockAudio`, `playSound` and all its cases)
- The operation log (`initLog`, `appendOp`, `undoOp`, `newConstruction`)
- All geometry data structures: `points`, `lines`, `circles`, `fills` Maps
- All geometry functions: `dist`, `s2w`, `w2s`, `findIntersections`, `hitPt`, `hitLC`, `hitAnyLine`, `checkAndFill`, `checkAndDissolve`, `findSnap`
- The render pipeline: `render`, `drawLine`, `drawCircle`, `drawFill`, `drawPoint`, `drawGhostLine`, `drawGhostCircle`
- `resizeCanvas` and the ResizeObserver
- The interaction state machine: `interactionState`, `onDown`, `onMove`, `onUp`
- All canvas event listeners (mousedown, mousemove, mouseup, touchstart, touchmove, touchend, wheel, drop)
- `initLog()` call at the bottom
- Save/load/export functions: `saveConstruction`, `loadConstruction`, `_loadFromFile`, `exportImage`

**The canvas element** stays as a full-viewport element sitting behind the HTML panels. In the lab file there is no canvas — one needs to be added, positioned with `position: fixed; inset: 0; z-index: 0;` so it sits beneath the left panel and all tools.

---

## What to Remove from geometry-layer1.html

**Remove entirely — these are replaced by the HTML tools system:**

### The PAL system (canvas-drawn palette strip)
Everything associated with the `PAL` object:
- The `PALETTES` array (hardcoded Gaudi/Chartres/Isfahan/Alhambra — replaced by `palettes.json`)
- The `PAL` object and all `pal*` functions: `palColors`, `palActiveColor`, `palW`, `palH`, `palInside`, `palHit`, `palSetOpacity`
- The `renderPalette()` function (draws the palette strip on canvas)
- All PAL hit-detection and interaction code inside `onDown`, `onMove`, `onUp` (look for `palHit`, `palDragging`, `sliderDragging`, `PAL.paintMode`)

### The MENU system (canvas-drawn rose window icon + dropdown)
Everything associated with the `MENU` object:
- The `MENU` object and `MENU_ITEMS` array
- All `menu*` functions: `menuIconCx`, `menuIconCy`, `menuW`, `menuH`, `menuHit`, `handleMenuAction`
- `drawRoseWindow()` function
- `renderMenu()` function
- All MENU hit-detection and interaction code inside `onDown`, `onMove`, `onUp` (look for `menuHit`, `menuDragging`, `MENU.collapsed`, `MENU.saveExpanded`)
- The `MENU.showLines` and `MENU.showGlass` toggle state (see note below)

**Note on showLines and showGlass:** These two toggles currently live on the MENU object. Their rendering logic (whether construction lines are drawn at full or scaffold opacity, whether uncolored regions are hidden) should be preserved — just moved to plain state variables rather than properties of the removed MENU object. The Tools menu in the lab file already has "Lines" and a "Color" item as stubs — these are the future home for these toggles.

---

## What to Keep from cw-default-page-lab.html

Everything. The entire file is the base. The canvas engine slots into it.

**One structural addition needed:** Add a `<canvas id="canvas">` element to the HTML, before all the tool divs, with CSS:
```css
#canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  touch-action: none;
  display: block;
}
```

The left panel, tools, and all UI sit at `z-index: 100+` already — the canvas beneath them is correct.

---

## The Critical Wire-Up: Palette → Canvas Fill

This is the most important integration point and the one most likely to be done wrong.

**Current geometry-layer1.html behavior:**
When a region is filled, the color comes from `palActiveColor()` — a function that reads `PALETTES[PAL.paletteIdx].colors[PAL.activeColorIdx]`. This is a canvas-drawn palette strip selecting a hardcoded color array.

**After integration:**
The color should come from the HTML palette tool's selected swatch. The palette tool in the lab file already tracks `state.palette.selected` — a hex color string (or `null` for Empty).

**The wire-up:** Replace all calls to `palActiveColor()` in the fill logic with a call to a new function:

```javascript
function getActiveColor() {
  return state.palette.selected; // null means empty/remove fill
}
```

Then in the fill logic, when `getActiveColor()` returns `null`, treat it as "remove fill from this region" rather than "fill with null". This is the Empty swatch behavior.

**Lead borders:** When `state.palette.leadActive` is true, filled regions should display a border in pewter `#4a4540`. The width of this border is not yet specified — use 3px as a starting point and flag it for design review.

**This connection — palette selection → canvas fill — is the action layer.** See `01-ACTIVE/Note-Coder-ActionLayer-Mar6.md` for the architectural context. Every fill action should go through a named function `fillRegion(regionId, colorHex)` rather than being triggered directly by UI events.

---

## palettes.json Integration

The lab file already loads `palettes.json` from `../art/palettes.json` via `loadPalettesJSON()`. This works when the file is served from `prototypes/`. After integration the unified file still lives in `prototypes/` so the path stays correct.

The hardcoded `PALETTES` array in `geometry-layer1.html` is replaced entirely by `palettes.json`. The three default palettes (Chartres, Gaudí, Alhambra) are in the JSON. The old Gaudi/Isfahan/Alhambra hardcoded colors can be discarded.

---

## Model Tool and Canvas

The Model tool in the lab file currently renders the SVG model as an `<img>` element in a fixed-position `#model-layer` div, positioned over the canvas. This approach is fine and should be preserved as-is. The model sits visually above the canvas (z-index: 590) and below the picker (z-index: 601).

No changes needed to model tool behavior — it already works independently of the canvas engine.

---

## The Story Column

The lab file has a right panel with a story column (`#right-panel`, `#story-column`). In the geometry workspace there is no story — the right panel is the canvas. After integration:

- Remove the `#right-panel` and `#story-column` HTML and CSS
- Remove the story toggle button (`#btn-story`, `#controls`)
- The canvas fills the full viewport behind the left panel

The two-panel layout CSS (`#app`, `#left-panel`, `#right-panel`) should simplify to just the left panel fixed on the left with the canvas filling everything else.

---

## Interaction: Left Panel Overlap with Canvas

The left panel sits over the canvas. Canvas pointer events must not fire when the pointer is over the left panel or any tool panel.

The lab file already sets `pointer-events: none` on `#left-panel` itself (tools inside it have `pointer-events: all` individually). The canvas should similarly ignore events when the pointer is over any open panel tool.

A simple guard at the top of `onDown`:
```javascript
function onDown(e) {
  if (e.target !== canvas) return; // ignore clicks on HTML elements
  // ... rest of handler
}
```
This works because HTML elements sit above the canvas in z-order and absorb their own events — the canvas only sees events that reach it directly.

---

## Suggested Integration Sequence

1. Start with `cw-default-page-lab.html` as the working file
2. Add the `<canvas>` element and its CSS
3. Copy in the construction engine (COLORS, THRESHOLDS, PARAMS, audio, log, geometry data, render pipeline, interaction state machine, event listeners)
4. Remove the story column HTML/CSS and story toggle
5. Replace `palActiveColor()` with `getActiveColor()` reading from `state.palette.selected`
6. Add the `pointer-events` guard to `onDown`
7. Test that tap-tap lines, drag circles, fills, and undo all work
8. Test that the palette tool correctly drives fill color
9. Test that the model tool overlay still works (it should without changes)
10. Test on iPad — touch events, pan/zoom, 44px touch targets on tool words

---

## Files for Reference

- `prototypes/cw-default-page-lab.html` — the UI base file
- `prototypes/geometry-layer1.html` — the construction engine source
- `prototypes/art/palettes.json` — palette data (v1.1 with recipe fields)
- `prototypes/models/` — SVG model files
- `01-ACTIVE/Note-Coder-ActionLayer-Mar6.md` — architectural note on the action layer
- `01-ACTIVE/Handoff-Designer-Mar5.md` — design decisions for palette and model tools
- `20-SPECS/Spec-Contextual-Tools-System.md` — Tools menu specification

---

## What This Does Not Include

The following are known future work, not part of this integration task:

- Maya integration (Layer 2) — blocked until the construction tool is stable
- The "Lines" and "Color" (Glass mode) toggles in the Tools menu — stubs exist, wire-up deferred
- Save As Construction / Load — stubs exist, implementation deferred
- Labels — stub exists, implementation deferred
- Share — stub exists, implementation deferred
- Backlighting / glass luminosity effect — future design session
- Touch-specific refinements beyond basic functionality

The goal of this task is one working unified file where a child can construct geometry and color regions using the HTML palette tool. Everything else is subsequent.
