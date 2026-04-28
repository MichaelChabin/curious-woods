# Task: "How this Works" Panel Element & Closing Animation

## Context

The canvas tip windows (Stage 1 and Stage 2) are working. Lead lines default to on. Dragging and closing work. What remains is:

1. The "How this works" heading and bullet list in the left panel
2. The closing animation that connects the canvas window to its bullet

---

## 1. The Panel Element

### What it is

A **fixed-position element in the left panel**, below the Tools menu. It is NOT inside the `#tools-l2` dropdown. It is a separate, persistent element that is always visible (the heading is always visible; the bullets collapse).

### Structure

```
How this works          ← always visible, clickable to collapse/expand
  • Lines and Circles   ← bullet, clickable to open canvas window
  • Making Shapes       ← bullet, appears after Stage 2 is seen
```

### HTML

Add a new element in the left panel area, below `#tools-root`, above `#remember`:

```html
<div id="htw-panel" style="display:none;">
  <span id="htw-panel-heading">How this works</span>
  <ul id="htw-panel-list">
    <!-- Bullets added by JS as stages are encountered -->
  </ul>
</div>
```

### Positioning

- `position: fixed; left: 16px;`
- Vertically: below the Tools menu. Use the existing layout engine to position it — it should sit in the gap between the bottom of the Tools menu and the Remember inscription. Respect `TOOLS_PANEL_GAP` or similar spacing constants.
- `z-index` same as other left-panel UI (pointer-events: all).

### Styling

- **Heading** ("How this works"): Georgia, 14px, `#546A80`, normal weight. `cursor: default`. Same style as `.l2-label`. No question mark.
- **Bullets**: Georgia, 13px, `#546A80`, `padding-left: 12px`, `cursor: default`, hover `#3D3D3A`. Use `list-style: none` and add a `•` character or small dot via `::before`. `margin-top: 6px` between items.
- `user-select: none` on the entire panel element.

### Behavior

- **Clicking the heading** collapses or expands the bullet list below it. Use `max-height` transition (same pattern as `#tools-l2`). When collapsed, only "How this works" is visible. The heading always remains visible regardless of collapse state.
- **Clicking a bullet** opens the corresponding canvas tip window at its last known position (or default position if never moved). The bullet itself does not expand or show inline text — the canvas is where you read.
- **Bullets appear progressively.** Only stages the child has encountered (per localStorage flags) get bullets. On first visit, the panel starts hidden (`display:none`). It appears when the first canvas window is closed.
- **On return visits** (localStorage shows stages have been seen): the panel is visible on load with all previously-seen bullets, collapsed state (just the heading visible). No canvas windows appear spontaneously.

### Bullet labels

| Stage ID | Bullet label |
|----------|-------------|
| construction | Lines and Circles |
| shapes | Making Shapes |
| hiding | *(future — not yet implemented)* |
| saving | *(future — not yet implemented)* |

---

## 2. Closing Animation

When a canvas tip window is closed (via the "close" link), it should animate **toward the left panel** before disappearing.

### The animation: collapse toward the left

1. On close click, disable pointer events on the window.
2. Animate over ~400ms with `ease-in`:
   - `opacity`: 1 → 0
   - `transform`: apply `translateX(-80px) scaleX(0.3)`
   - The window slides left and compresses horizontally, as if being absorbed into the left panel edge.
3. When the animation completes:
   - Hide the canvas window (`display: none`, reset transform).
   - If this is the first time this stage was closed:
     - Add the corresponding bullet to `#htw-panel-list`.
     - If the panel is not yet visible, show it (`display: block`) with a gentle fade-in.
     - The new bullet should fade in (`opacity 0→1` over 200ms) after the canvas window animation completes.
   - Set localStorage flags.

### CSS for the animation

```css
.htw-canvas.closing {
  transition: opacity 400ms ease-in, transform 400ms ease-in;
  opacity: 0;
  transform: translateX(-80px) scaleX(0.3);
  pointer-events: none;
}
```

Apply the `.closing` class to trigger the animation. Listen for `transitionend` to do cleanup.

### Important details

- If a previous Stage's canvas window is still open when a new Stage triggers, close the previous window first (with the animation), wait for it to complete, then open the new Stage's window. Use a short delay (~200ms) between the previous window finishing and the new one appearing.
- When reopening a canvas window from a bullet click, no special animation is needed — just show it (fade in, 200ms) at its last known position.

---

## 3. Integration with existing Stage 1 and Stage 2 code

The canvas windows and their content already work. The changes needed are:

- **On close**: instead of just hiding, apply the closing animation, then add the bullet to the panel.
- **On startup (return visit)**: instead of showing the canvas window, show the panel with bullets for all seen stages.
- **Track last position**: when the canvas window is dragged, store its position (in a JS variable, not localStorage — it doesn't need to persist across sessions). When reopened from a bullet, use that position.

---

## What this task does NOT include

- Stage 3 (Hiding Lines) and Stage 4 (Saving) content — future
- Region subtraction for overlapping fills — separate task
- Maya / Uniqueness Observation — separate task
- Color palette relocation — separate task
- Any changes to the Tools dropdown menu — the panel is independent of it
