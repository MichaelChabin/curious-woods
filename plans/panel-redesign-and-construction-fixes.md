# Task: Left Panel Redesign + Construction Behavior Fixes

## Overview

Remove the Tools dropdown menu entirely. Replace it with a fixed "How this works" panel as the primary navigation. Also fix several construction behaviors.

Read this entire document before starting. The items are ordered by dependency — the panel redesign (items 1–5) should be done first, then the construction fixes (items 6–8) can be done in any order.

---

## Item 1: Remove the Tools Dropdown Menu

**Remove** the entire `#tools-root` element and its hover-reveal cascade (`#tools-word`, `#tools-l2`, all `.l2-item` and `.l3-item` elements, and all associated CSS and JS).

Everything the Tools menu currently does will be handled by the new "How this works" panel (item 2) or is no longer needed:

| Old menu item | New home |
|---------------|----------|
| Save | "Save or Share" in new panel |
| Load | "Open Construction" in new panel |
| New | "New" in new panel |
| Labels (numbers) | Remove for now — may return later |
| Lines | Replaced by "Erasing Lines" workflow |
| Color | Color chips stay where they are in the left panel — no change |
| Sound | Remove from menu for now — separate design pass coming |
| Constructions | "Open Construction" in new panel |
| Glass | Lead is on by default — the toggle is no longer needed as a menu item |
| Share | "Save or Share" in new panel |

**Important:** Do not remove any of the *functionality* these menu items trigger — only remove the menu UI that launches them. The functions themselves (`openColorTool()`, `openPaletteTool()`, etc.) should remain available for the new panel to call.

---

## Item 2: "How this Works" Panel

### What it is

A fixed-position element at the top of the left panel area. It replaces the Tools menu as the primary navigation. All items are visible from the start — there is no progressive reveal.

### Structure

```
How this works
  • Lines and Circles
  • Cutting Shapes
  • Using Color
  • Erasing Lines
  • Save or Share
  • Open Construction
  • New
```

### HTML

Place this where `#tools-root` used to be (top of the left panel area):

```html
<div id="htw-panel">
  <span id="htw-heading">How this works</span>
  <ul id="htw-list">
    <li class="htw-item" data-stage="construction">Lines and Circles</li>
    <li class="htw-item" data-stage="shapes">Cutting Shapes</li>
    <li class="htw-item" data-stage="color">Using Color</li>
    <li class="htw-item" data-stage="erasing">Erasing Lines</li>
    <li class="htw-item" data-stage="save">Save or Share</li>
    <li class="htw-item" data-stage="constructions">Open Construction</li>
    <li class="htw-item" data-stage="new">New</li>
  </ul>
</div>
```

### Positioning

- `position: fixed; left: 16px; top: 20px;` (same position as old Tools menu)
- `z-index: 110; pointer-events: all; user-select: none;`

### Styling

- **Heading** ("How this works"): Georgia, 14px, `#546A80`, normal weight. `cursor: default`. Clicking it collapses/expands the bullet list below.
- **Bullets**: Georgia, 13px, `#546A80`, `padding-left: 12px`, `cursor: default`. Hover: `color: #3D3D3A`. Margin between items: ~8px.
- Use `list-style: none` and add a `•` via `::before` pseudo-element or just use the character directly with padding.
- When collapsed, only "How this works" is visible. The bullet list uses `max-height` transition to collapse/expand smoothly (same pattern as the old `#tools-l2`).

### Behavior

**Clicking the heading:** toggles the bullet list collapsed/expanded.

**Clicking a bullet — first four items** (Lines and Circles, Cutting Shapes, Using Color, Erasing Lines): Opens the corresponding tip window on the canvas. The tip window is the existing `#htw-canvas` element, populated with the content for that stage.

**Clicking "Save or Share":** For now, just open a tip window explaining save options. The full functional panel with buttons is a future task.

**Clicking "Open Construction":** For now, call the existing construction picker (`openPickerWindow('constructions')`). The full workflow redesign is a future task.

**Clicking "New":** Show a confirmation dialog: "Save your work first?" with options to save or discard, then reset the canvas to the two seed points. This replaces the old double-click-empty-space-to-reset behavior. Use the existing `_resetCanvas()` or equivalent function.

---

## Item 3: Fix Panel Layout / Overlap Issues

The left panel has elements that can overlap: the new "How this works" panel, the color chips panel below it, and the Remember inscription lower down.

**Rules:**
- "How this works" is always at the top (fixed position, top: 20px).
- The color tool panel sits below it. Its top position should be calculated from the bottom of the "How this works" panel + a gap (`PANEL_TOOL_GAP` or 14px).
- The Remember inscription sits below the color panel (or below "How this works" if no color panel is open).
- When the "How this works" bullet list collapses/expands, elements below it should reflow. Use the existing `layoutPanelTools()` function, updated to account for the new panel.
- **Elements must return to correct positions** when panels open and close. The current bug where panels shift down and don't come back must be fixed — ensure `layoutPanelTools()` is called on both open AND close transitions.

---

## Item 4: Remove Double-Click-Empty-Space-to-Reset

The current behavior where double-clicking empty canvas space resets the entire construction is being replaced by the "New" button in the panel (item 2).

**Remove** the double-click-empty-space handler that triggers a canvas reset. Keep single-click-empty-space for undo — that stays.

---

## Item 5: Smart Trigger Suppression

The canvas tip windows for Stage 1 (Lines and Circles) and Stage 2 (Cutting Shapes) currently appear automatically based on thresholds. Update this behavior:

- **Stage 1** (first visit): still appears automatically. No change.
- **Stage 2** (≥15 points): If the child has ALREADY selected/emphasized segments before reaching 15 points, **do not show the canvas tip window.** She's already figured it out. Just skip it silently.
- When a tip window is closed, it simply closes (fades out or hides). **No animation toward the panel, no collapse behavior.** The bullets are already in the panel from the start.

**How to detect "already using the feature":** For Stage 2 (Cutting Shapes), check if any segments have been emphasized/selected (`state.emphasizedSegments.length > 0` or equivalent). If so, suppress the automatic tip window.

---

## Item 6: Double-Click Line Fades Line AND Points

**Current behavior:** Double-clicking a line fades just that line.

**New behavior:** Double-clicking a line fades the line AND all points that are endpoints of that line.

**Exceptions:** Do NOT fade points that are on labeled axes (points representing numbers on the x or y axis). These are reference points that should always remain visible.

**Restoring:** Double-clicking a faded line to restore it restores ONLY the line, not the points. Points are restored individually (by restoring other lines that share them). This makes fading a broad cleanup tool and restoring a precise one.

**Faded points remain functional:** Faded points can still be used to anchor new lines and circles. They can still participate in shape selection. They are visually subdued but not disabled.

### Implementation notes

- In the double-click handler for lines (in the interaction state machine), after fading the line, iterate through the line's two endpoint point indices.
- For each point, check if it is an axis-labeled point. If not, set it to faded state.
- The point's faded visual should match the line's faded visual — same opacity reduction or color change.
- When restoring a line (double-click a faded line), only restore the line itself. Do not touch point states.

---

## Item 7: Circle Construction — Highlight Only Nearest Point to Cursor

**Current behavior:** During circle drag (tap-hold-drag), every intersection point near the growing circle highlights and makes a sound. This is distracting.

**New behavior:** During circle drag, only highlight the single point nearest to the current cursor/pointer position. All intersection points are still created — the geometry doesn't change. Only the visual feedback changes.

### Implementation notes

- In the pointermove / touchmove handler during circle-drag state, the code currently checks all points for proximity to the circle edge and highlights each one.
- Change this to: collect all points near the circle edge, then select only the one closest to the pointer position (use distance from pointer, not distance from circle edge).
- Highlight only that one point.
- Play the sound only for that one point (and only once per point — don't re-trigger if the nearest point hasn't changed).
- When the pointer moves and a different point becomes nearest, un-highlight the previous one and highlight the new one.

---

## Item 8: Confirm Faded Lines/Points Remain Functional

Verify and ensure that:

1. **Faded lines can be selected** (tapped to emphasize/darken) for shape creation. A faded line is just visually subdued — it is still a geometric object.
2. **Faded points can be used as anchors** for new lines and circles. Tapping a faded point to start a line or circle should work identically to tapping a visible point.
3. **Faded points can participate in shape selection** — if a shape's boundary passes through a faded point, it still counts.

If any of these are not currently working, fix them. If they already work, no changes needed — just confirm.

---

## What this task does NOT include

- Save or Share functional panel (buttons, naming flow, notes text box) — future
- Open Construction full workflow (replay controls, forking) — future
- Stage 3 (Erasing Lines) and Stage 4 (Save/Share) tip window content — future
- The Uniqueness Observation — future
- Region subtraction (overlapping fills) — future
- iPad touch/Pencil support — future
- Sound design — future
- Testing plan — future
- Color palette picker thumbnail fix — future
