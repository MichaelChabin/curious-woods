# Sprint 3 Fixes — Batch 3

Read this entire document before starting. These are bug fixes and refinements to the current implementation.

---

## 1. Two-sided shapes (lens shapes) should fill with glass

**Bug:** If a closed shape has only 2 sides (two arcs meeting at two points, forming a lens), it does not fill with glass. It should. Any closed boundary — 2 segments, 3 segments, or more — is a valid glass shape. Fix the fill detection logic to accept closed paths with ≥ 2 segments.

---

## 2. Palette picker "close" button scrolls out of view

**Bug:** When scrolling through palettes in the picker window, the "close" button scrolls up and disappears.

**Fix:** Make the close button (or the header bar containing it) sticky at the top of the picker window. Use `position: sticky; top: 0; z-index: 1;` on the header element, with a background color so it doesn't show content through it.

---

## 3. Note positioning prompt

When the save note box appears (for both Save as Construction and Save as Image), display a line of text above the note box:

```
This note will appear as part of your image. You can place it anywhere you like.
```

Style: Georgia, 12px, `#b0a090` (subtle, not competing with the note itself). Positioned just above the note box, moves with it when dragged. Disappears when OK is tapped.

---

## 4. Eraser cursor should appear immediately on double-click-and-hold

**Bug:** When double-clicking a line and holding, the cursor doesn't change to the eraser until the mouse moves.

**Fix:** Change the cursor to the eraser shape immediately when the double-click-and-hold is detected (in the pointerdown/mousedown handler for the double-click state), before any pointermove/mousemove fires.

---

## 5. Default color should be "clear" (bottle green) for new constructions

When clearing the canvas to start a new construction or after loading a construction, reset `state.palette.selected` to the "clear" swatch color (the bottle green default glass). Do not carry over the last-used color from a previous construction.

---

## 6. Complete canvas clearing

When starting a new construction (via "New") or preparing to load an existing one (via "Open"), clear ALL of the following:

- All constructed points (keep only seed points 0 and 1)
- All constructed lines
- All constructed circles
- All glass fills
- All lead lines
- Any note text box on the canvas
- The step-through panel (← → →| |← Cancel controls)
- Reset the color to "clear" (bottle green) per item 5 above
- Reset zoom/pan to default viewport

Nothing should remain except the two seed points at 0 and 1.

---

## 7. Construction loading flow (revised)

When the child clicks "Open":

1. **If no current work** on canvas (operationLog.length <= 1, just seed points): open the construction picker immediately.
2. **If there is current work**:
   - Show dialog: `Save first?    Yes    No    Cancel`
   - "Yes" → trigger save flow → after save completes, clear canvas, then open picker.
   - "No" → clear canvas immediately, then open picker.
   - "Cancel" → return to canvas, do nothing.
3. Once the picker is open: child taps a thumbnail → close picker → clear canvas (if not already clear) → begin step-through.

---

## 8. Step-through controls (revised)

### Controls layout

```
|←    ←    →    →|
      Cancel
```

Four arrow buttons plus Cancel below:
- **|←** (first): jump to the initial state — just the seed points and the very first step.
- **←** (back): go back one step.
- **→** (next): advance one step.
- **→|** (last): jump to the completed construction — all geometry and all fills applied at once.

Style: Georgia, 16px for arrows, `|` characters are part of the arrow buttons (not separate elements). 13px for Cancel. Color `#546A80`, hover `#3D3D3A`. `user-select: none`. The control panel should be on the canvas (position: fixed), draggable, with a subtle parchment background so it's visible against any construction.

### Initial state when construction is loaded

The construction should display the **first step** already visible. For example, if the first operation was connecting points 0 and 1 with a line, that line should be showing when the controls appear. Do not start with a blank canvas + controls.

### Step grouping (revised)

Walk through the operation log and group operations into user-visible steps:

1. **Geometry steps** (`line`, `circle`): one step per operation.
   - Points involved are NOT highlighted before the step (remove the highlight/glow effect if implemented). Just show the geometry appearing.
   - New intersection points that result appear as part of the same step.

2. **Fill/color steps**: **each fill is its own step**. If the original construction had 5 colored shapes, the child clicks → five times to see each shape colored one at a time, in the same order they were applied in the original construction.
   - Each fill step shows: the lead appearing on the boundary segments AND the color fill, together.

3. **Scaffold steps** (`scaffold`): batch consecutive scaffold operations into one step.

4. **Other** (`numbers`, `dissolve_fill`, etc.): one step per operation.

### Cancel behavior

When Cancel is clicked, show a dialog:

```
Start over    Continue from here
```

- **"Start over"**: clear canvas to seed points, remove step-through controls.
- **"Continue from here"**: remove step-through controls, discard remaining unplayed steps. Everything loaded so far stays as live geometry.

### Forking

If the child performs any construction action during replay (taps a point, starts a line or circle, selects a segment):
1. Silently discard all remaining unplayed operations.
2. Remove the step-through controls.
3. The child's action proceeds normally.

No warning dialog.

---

## 9. Color panel should open when Color tip window triggers

**Bug:** The color panel does not appear when:
- The Color threshold triggers (≥ 4 filled glass shapes on first visit)
- The child clicks "Color" in the How this works panel

**Fix:**
- When the Color stage triggers, open the color panel simultaneously with the tip window.
- When "Color" is clicked in the How this works panel, open the color panel AND show the tip window.
- On return visits, the color panel should be open from the start — it is integral to the app.
- The color panel should NOT have a close button. Once it appears, it stays.

---

## Testing

1. Create a lens shape (two arcs meeting at two points) → it should fill with glass.
2. Open palette picker, scroll down → close button stays visible at top.
3. Save as Image → note prompt text appears above note box, moves with it.
4. Double-click-and-hold a line → eraser cursor appears immediately.
5. Start a new construction → default color is clear/bottle green, not the previous color.
6. Click New → canvas clears completely (only seed points remain, no leftover controls/notes).
7. Click Open with work in progress → save dialog appears → after save/discard, picker opens.
8. Load a construction → first step is already visible.
9. Click → → steps advance one at a time, fills are individual steps in original order.
10. Click →| → entire construction appears at once.
11. Click |← → returns to first step.
12. Points do NOT highlight/glow during step-through.
13. Step-through panel is draggable on the canvas.
14. Click Color in panel → color panel opens.
15. Return visit → color panel is open immediately on load.
