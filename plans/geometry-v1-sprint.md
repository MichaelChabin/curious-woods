# Geometry v1 Sprint — Implementation Plan

Read this entire document before starting. Work through items in order. Each item is independent enough to test before moving to the next.

---

## 1. Remove the Tools dropdown menu

The `#tools-root` hover-reveal menu (Tools → L2 items → L3 items) is being replaced. Remove it from the DOM and all associated JavaScript (the `mouseenter`/`mouseleave` handlers on `toolsRoot`, the `revealed` class toggling, the L2/L3 cascade logic).

**Do not remove** the left panel itself (`#left-panel`) or any panel tool functionality (palette, model, constructions). Those will be reconnected to the new panel in the next step.

---

## 2. Build the "How this works" panel

This is a **fixed-position element in the left panel**, not a dropdown menu. It is always visible.

### HTML structure

Place this in the left panel area, near the top (where the Tools menu used to be):

```html
<div id="htw-panel">
  <span id="htw-panel-heading">How this works</span>
  <ul id="htw-panel-list">
    <li class="htw-item" data-stage="construction">Lines and Circles</li>
    <li class="htw-item" data-stage="shapes">Cutting Shapes</li>
    <li class="htw-item" data-stage="color">Using Color</li>
    <li class="htw-item" data-stage="eraser">Erasing Lines</li>
    <li class="htw-item" data-stage="save">Save or Share</li>
    <li class="htw-item" data-stage="constructions">Open Construction</li>
  </ul>
</div>
```

**All six items are visible from the start.** No progressive reveal.

### Behavior

- **Clicking "How this works"** collapses or expands the bullet list. The heading always stays visible.
- **Clicking "Lines and Circles"** opens a canvas tip window with the Stage 1 content (already implemented).
- **Clicking "Cutting Shapes"** opens a canvas tip window with the Stage 2 content (already implemented).
- **Clicking "Using Color"** opens the color palette panel tool (existing `openColorTool()`).
- **Clicking "Erasing Lines"** — for now, just opens a tip window with placeholder text: "Double-tap a line to fade it. Double-tap a faded line to restore it."
- **Clicking "Save or Share"** — for now, opens the existing save functionality.
- **Clicking "Open Construction"** — opens the existing constructions panel / picker.

### Styling

- `position: fixed; left: 16px; top: 20px;`
- Heading: Georgia, 14px, `#546A80`, normal weight, `cursor: default`.
- Bullets: Georgia, 13px, `#546A80`, `padding-left: 12px`, `cursor: default`, hover `#3D3D3A`. Use `list-style: none` with `•` via `::before` or padding.
- `user-select: none` on the entire panel.
- Collapse/expand uses `max-height` transition, same pattern as the old `#tools-l2`.

### Canvas tip windows

The existing Stage 1 and Stage 2 tip windows continue to work as they do now. They are:
- Draggable (pointer events, not mouse events)
- Closeable (lowercase "close" in top-right)
- No title bar on canvas — just body text and close
- `user-select: none`, `touch-action: none`

Closing a tip window simply closes it. No animation, no collapse to panel.

### Smart trigger suppression

The existing threshold triggers (Stage 1 on first visit, Stage 2 at ≥15 points) still fire on first visit. But: **if the child is already performing the action a tip describes, do NOT show the canvas window.** Specifically:
- If the child has already selected segments or filled a shape before the Stage 2 threshold fires, skip showing the Stage 2 canvas window.
- If the child has used the eraser before its threshold fires, skip showing its canvas window.

No bullet manipulation is needed — all bullets are always visible.

---

## 3. Revert the "no orphans" restriction

The previous session added logic to prevent disconnected or orphan segments in shape selection. **Remove this restriction entirely.**

Shape selection rules should be:
- The child selects segments by tapping them (they darken / show as lead).
- If the selected segments form a closed boundary, it becomes glass.
- Lines extending beyond the closed boundary are fine (they're construction scaffolding).
- Independent shapes floating inside a larger shape are fine.
- Shapes formed by any combination of line segments and/or circular arcs are valid.

Search for any validation logic that rejects shapes based on orphan detection, disconnected segments, or similar constraints, and remove it.

---

## 4. Compositing order for overlapping fills

When multiple filled regions overlap, **draw the largest fill first and the smallest fill on top.** This ensures that a small shape inside a large shape remains visible.

Implementation: sort the fills array by area (descending) before rendering. Area can be approximated — exact calculation isn't needed. For polygonal fills, use the shoelace formula. For fills involving arcs, a bounding-box area approximation is acceptable for now.

This is a temporary solution. Full region subtraction will come later.

---

## 5. Double-click a line fades line AND its points

Currently double-clicking a line fades only the line. Change this so:

- **Fading a line also fades all points that are endpoints of that segment**, with two exceptions:
  - Points on a labeled axis (x-axis or y-axis points with number labels) do NOT fade.
  - Points that are also endpoints of OTHER non-faded lines do NOT fade (a point stays visible if any of its lines are still visible).

- **Restoring a line does NOT cascade.** Restoring a faded line brings back only the line. Points must be restored individually (by restoring a line that uses them).

- **Faded points remain functional.** They can still be used to anchor new lines and circles, and they participate in shape selection. They are just visually dimmed.

---

## 6. Circle construction: highlight only nearest point to cursor

During circle construction (tap-hold-drag), the current behavior highlights every intersection point along the circle as it's being drawn. This is overwhelming.

Change this so: **only the single point nearest to the current cursor/pointer position highlights and makes a sound.** All intersection points are still created — the geometry doesn't change. Only the visual/audio feedback is filtered to the one point closest to where the child is looking.

This applies during the drag phase only. Once the circle is committed (pointer up), all intersection points exist as normal.

---

## 7. Fix palette picker thumbnails

When the user clicks the palette name in the color panel, then clicks "Choose...", the picker window opens via `openPickerWindow('palettes')` → `buildPickerPalettes()`.

The function loads thumbnail images from `art/` + `pal.source`. Palettes that are missing a `source` field are skipped entirely (`if (!pal.source) return;`).

Fix this so:
- All palettes appear in the picker, even those without a `source` image. Use a fallback: render color swatches from the palette's colors as a thumbnail if no source image exists.
- Clicking a palette thumbnail switches the active palette and closes the picker.
- Verify that `palettes.json` has `source` fields pointing to actual image files in the `art/` directory for all palettes that have artwork.

---

## 8. iPad touch and Apple Pencil support

The interaction state machine uses both mouse and touch event listeners on the canvas. On iPad with Apple Pencil:
- **Lines don't work** — the tap-tap gesture to make a line doesn't register.
- **Segment selection doesn't work** — segments highlight on hover (pointer move) but tapping to select doesn't commit.
- **No pinch-to-zoom** — `touch-action: none` on the canvas prevents browser zoom, but custom pinch-to-zoom isn't implemented.

### Diagnosis approach

The likely issue is in the touch event handling around the interaction state machine (~line 1542). Apple Pencil generates pointer events with `pointerType: 'pen'`. Check whether:
- `touchend` is reliably firing after Apple Pencil lifts
- The time/distance thresholds for distinguishing tap from drag work with Pencil input
- `pointerup` events from Pencil are being processed the same as mouse `mouseup`

### Recommended fix

Consider migrating the canvas interaction entirely to Pointer Events (`pointerdown`, `pointermove`, `pointerup`) instead of maintaining separate mouse and touch listeners. Pointer Events unify mouse, touch, and pen input. This would be a larger change but would fix the iPad issues and simplify the code.

If that's too large a change for this sprint, the minimum fix is to ensure `touchend` / `pointerup` from Apple Pencil correctly triggers the same code paths as `mouseup`.

For pinch-to-zoom: detect two-pointer touches, compute the distance between them, and scale `viewScale` accordingly. Only activate pinch-to-zoom when two pointers are down simultaneously (so it doesn't interfere with single-pointer drawing).

---

## What is NOT in this sprint

- Save or Share functional panel (buttons, naming flow, notes) — future
- Open Construction full workflow (replay, forking) — future
- Region subtraction — future (compositing order is the temporary fix)
- The Uniqueness Observation — future
- Sound design — future
- Modularization of geometry-v1.html — future
- Full planar subdivision / automatic region detection — future
- Testing infrastructure — future

---

## Testing each item

After each item, verify:
1. The app loads without console errors.
2. Lines can be created (tap-tap two points).
3. Circles can be created (tap-hold-drag).
4. Shapes can be selected and filled with color.
5. The "How this works" panel is visible and all bullets are clickable.
6. On iPad (if available): lines and circles can be created, segments can be selected.
