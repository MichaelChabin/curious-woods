# Specification: Notes

This is the authoritative specification for how notes work — both construction notes (placed during building) and save-time notes. If existing code contradicts this document, the code should be changed to match.

---

## Two kinds of notes

### 1. Construction notes (placed during building)

These are notes the child places on the canvas while constructing. They are operations in the log, just like lines and circles. They appear and disappear during replay at exactly the moment they were placed.

### 2. Save-time notes (placed during save flow)

These are notes added when saving as image or saving as construction. They are metadata attached to the saved file, not part of the operation log. They are for titling and annotating the finished piece.

---

## Part A: Construction Notes

### Placing a construction note

**Gesture:** Double-click in empty space on the canvas.

This replaces the old double-click-empty-space-to-reset behavior (now handled by "New" in the panel).

**Timing:** To distinguish single-click (undo) from double-click (note):
- On first click in empty space, start a 300ms timer.
- Second click within 300ms → place note. Cancel the undo.
- Timer expires with no second click → undo.

### What happens when placing a note

1. A note text box appears at the double-click location on the canvas.
2. The child types her note.
3. She can drag the box to reposition it.
4. She can resize the box — the textarea expands to fill the box.
5. The note finalizes (text becomes read-only) when the user performs any action outside the box — clicks empty space, taps a point, starts a line or circle, places another note, etc. There is no "done" button. The user simply moves on.
   - **The finalizing click is consumed** — it only finalizes the note. It does not propagate as an undo, a point tap, or any other canvas action. The next click after finalization behaves normally. This prevents the common habit of "clicking away to deselect" from accidentally triggering undo.
6. When finalized, the operation is appended to the log:
   - `{ op: 'note_open', noteId: 'n:0', text: '...', x: [world x], y: [world y], width: [world width] }`
   - The `note_close` is appended later, only when the child explicitly closes the note (clicks the × on the note). Placing a new note does NOT close the previous one — it only finalizes the previous note's editing state (the note becomes read-only but stays visible).

### Operation log entries

```javascript
{ op: 'note_open', noteId: 'n:0', text: 'This is the unit circle.', x: 150, y: -80, width: 200 }
{ op: 'note_close', noteId: 'n:0' }
```

- `noteId`: unique identifier, incrementing (`n:0`, `n:1`, `n:2`...)
- `x`, `y`: world coordinates (not screen pixels) — so notes stay in the right place relative to geometry regardless of zoom/pan.
- `width`: note box width in world coordinates.
- `text`: may contain newlines.

A note that is never explicitly closed stays visible for the rest of the construction.

### Multiple notes

Multiple notes can be open at the same time. Each has its own noteId.

### Construction note visual style

#### Box layout

```
┌──────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← drag bar (top)
├──┬───────────────────────────┤
│ ◁│ [textarea]                │  ← arrow cell (left), text (right)
│  │                           │
│  │                           │
│  │                        ⌟  │  ← resize handle (bottom-right)
└──┴───────────────────────────┘
```

- **Drag bar** (top): a thin strip (~6px) of slightly darker parchment (`rgba(200,184,154,0.4)`). This is the drag handle — dragging the bar repositions the note. Makes draggability obvious without adding a title bar.
- **Arrow cell** (left): a fixed-width column (~20px), visually separated from the textarea by a subtle vertical border. Contains a small left-pointing arrow (`◁` or thin wedge), pointing away from the text and outward toward the canvas. The arrow is styled in the same color as the note text (`#546A80`), slightly faded. See Part D for callout line behavior.
- **Textarea** (right): fills the remaining space. Georgia, 13px, `#546A80`, italic.
- **Resize handle** (bottom-right): small drag handle. When resized, the textarea fills the new dimensions. Text reflows to the new width. **Note:** the resize handle must actually work — dragging it changes the box dimensions and the textarea reflows.
- **Close button**: small "×" in top-right corner of the drag bar area.

#### General styling

- Semi-transparent parchment background: `rgba(244,241,232,0.75)`.
- Border: `0.5px solid #c8b89a`, `border-radius: 6px`.
- `user-select: none` on the box frame. The textarea itself allows text selection and editing.
- `touch-action: none` on the drag surfaces (drag bar, arrow cell, resize handle).

### Construction notes during replay

- When replay reaches a `note_open` step: the note appears on the canvas at the saved position and size, with the saved text. It is not editable during replay.
- When replay reaches a `note_close` step: the note fades out over ~1 second.
- Stepping backward past a `note_close`: the note reappears.
- Stepping backward past a `note_open`: the note disappears.
- `→|` (jump to last): shows all notes that are open at the end of the construction.
- `|←` (jump to first): shows only notes that are open at step 0.

### Undo

- Undo removes the last operation. If the last operation was `note_open`, the note disappears. If it was `note_close`, the note reappears.

### Construction notes in Save as Image

Notes that are **currently open** when the child saves as image are rendered into the exported PNG. Same font, color, and wrapping as on canvas. Position is the note's world coordinates, mapped to export coordinates. Notes that are closed are not rendered.

---

## Part B: Save-Time Notes

### When they appear

The save-time note appears as part of the Save as Image flow:

1. Child taps "Save as Image" (from the panel or tip window).
2. Chooses **Postcard** or **Full sheet**.
3. **A preview appears** — the cropped artwork with the border mat, rendered at screen resolution. Construction notes that are currently open are shown in the preview.
4. The save-time note box appears in the **upper left of the preview**.
5. The child types a name (title) and note text.
6. She can drag the note box anywhere within the artwork area.
7. She can resize the note box — the textarea expands to fill it.
8. She taps OK → the full-resolution export renders.
9. She taps Cancel → returns to the canvas, nothing saved.

### Save-time note box

#### Layout

```
┌─────────────────────────────┐
│ [name field]                │  ← title of the piece
│─────────────────────────────│
│                             │
│ [textarea]                  │  ← note body, grows with box
│                             │
│                             │
│              Cancel    OK   │
└─────────────────────────────┘
```

#### Sizing

- **Default width:** 240px (can be resized wider).
- **The textarea fills the box.** Use CSS flexbox: the note box is a flex column. The name field and the Cancel/OK row are fixed height. The textarea has `flex: 1` and grows to fill remaining space.
- **When the child resizes the box, the textarea grows.** Text reflows to the new width. A wider box means longer lines, a narrower box means more wrapping.
- **Text must not overflow the box.** Use `overflow: hidden` on the textarea. What's visible in the box is what gets exported.

#### Positioning

- **Default position:** upper left of the preview, inside the artwork area.
- **Draggable** — the child can drag it anywhere within the artwork area.
- **Constrained to artwork area.** The box cannot be dragged or resized past the inner edge of the border mat. Clamp position and dimensions.

#### Instruction text

Above the note box (moves with it):
```
This note will appear as part of your image.
You can place it anywhere you like.
```
Style: Georgia, 12px, same color as note body text. Word-wraps to box width. Disappears when OK is tapped.

#### Visual style

- Semi-transparent parchment background: `rgba(244,241,232,0.75)`.
- Border: `0.5px solid #c8b89a`, `border-radius: 6px`.
- Name field: Georgia, 14px, `#3D3D3A`. Not italic.
- Textarea: Georgia, 13px, `#546A80`, italic. `line-height: 1.5`.
- Cancel/OK: Georgia, 13px, `#546A80`. OK is slightly bolder.

### Rendering in the exported image

#### What the child sees is what she gets

The export must match the preview exactly:

1. **Title** (from name field): renders as the first line of the note. Slightly larger or bolder than the body — e.g., Georgia 10pt at 300 DPI (~42px), not italic.
2. **Body** (from textarea): renders below the title. Georgia 9pt at 300 DPI (~38px), italic. `line-height: 1.5`.
3. **Wrapping:** text wraps at the same width as the note box, scaled to export dimensions. Use `ctx.measureText()` to wrap word-by-word at the box width.
4. **Manual newlines** entered by the child are honored.
5. **Position:** the note renders at the exact position where the child placed the box on the preview. No translation needed — the preview IS the export composition.
6. **No background.** The note renders as text directly on the art, like a caption or signature. The semi-transparent background is only for editing — it does not appear in the export.
7. **Color:** `#546A80` (the standard text color). Not purple, not Payne's gray, not a palette-derived color. Always `#546A80`.

#### Font size on preview must match export

The preview is a scaled-down version of the final export. The note text on the preview must be rendered at the **exact proportional size** it will be in the export. If the final image is 1800px wide and the preview is 600px wide, the note text is 1/3 of its export pixel size on the preview.

The child sees exactly what she'll get.

### For Save as Construction

The save-time note for a construction save is simpler:
1. The note box appears (same layout: name + textarea + Cancel/OK).
2. The name becomes the construction title (shown in the picker thumbnail).
3. The note text is saved as metadata in the construction entry.
4. The note text is displayed when the construction is loaded for replay.
5. No preview is needed — the note is not rendered into an image.

---

## Part C: Notes and Zoom

Construction notes use **world coordinates for position** but **fixed pixel dimensions for box size and text**. This means:

- A note placed at world position (100, -50) stays at that position relative to the geometry, regardless of zoom or pan.
- The note box width and text size are in **screen pixels, not world units**. The note does not scale with zoom. Text is always readable — same size as the left panel text (~13px Georgia) regardless of zoom level.
- **Zooming in:** the note stays at its world position (which moves on screen with the geometry). The note box stays the same pixel size. The geometry around it gets larger.
- **Zooming out:** the note stays at its world position (which converges toward the center of the canvas on screen). The note box stays the same pixel size. At extreme zoom-out, the note may overlap geometry — this is acceptable.
- During replay, notes render at fixed pixel size at whatever zoom level the replay is at. Always legible.

### Drift (refinement — implement after core notes and callout lines are stable)

For notes **with a callout line**, the note can drift outward from the anchor point as the user zooms out. This keeps the note readable and out of the way of dense geometry, while the callout line maintains the visual connection to what the note refers to.

- **When to drift:** when the zoom level drops below a threshold (to be tuned — start with ~50% of default zoom).
- **Direction:** radially outward from the anchor point along the line from anchor to note position.
- **How far:** proportional to how far the user has zoomed out. The note slides further outward as zoom decreases.
- **Zoom back in:** the note slides back toward its original world position. At default zoom or closer, the note is at its placed position.
- **Animation:** smooth — the note glides rather than jumping.
- **Notes without callout:** do not drift. They stay at their world position. Without a tether, drifting would be disorienting.

Drift is a refinement. The core implementation should ship without it — fixed-pixel notes at their world positions, with callout lines. Drift gets layered on after testing.

---

## Summary

| Property | Construction note | Save-time note |
|----------|------------------|----------------|
| When created | During construction (double-click empty space) | During save flow |
| In operation log | Yes (`note_open`, `note_close`) | No (metadata) |
| Visible during replay | Yes, at the moment it was placed | Only at load time |
| Editable during replay | No | N/A |
| Rendered in Save as Image | Yes, if currently open | Yes, always |
| Background in export | Semi-transparent (part of canvas) | None (text only) |
| Position coordinates | World coordinates | Preview coordinates (mapped to export) |

---

## Part D: Callout Lines

### What callout lines are

A callout line connects a construction note to a specific location on the canvas — like a callout in a technical drawing. It clarifies what the note refers to, which the note's position alone can leave ambiguous.

Callout lines are optional. A note without any callouts works exactly as before. A single note can have **multiple callout lines**, each pointing to a different location — useful when a note explains a concept that relates to several points in the construction.

### The arrow cell

The arrow cell on the left edge of the note box (see construction note visual style above) is the affordance for creating callout lines. A small left-pointing arrow (`◁`) sits in the cell, pointing away from the text and outward toward the canvas.

The arrow cell **stays visible as long as the note is open.** It does not fade after placing a callout, because the user may want to add more.

### Placing a callout

1. The user creates a note (double-click empty space, type text, click/act outside to finalize).
2. The arrow cell is visible with a left-pointing arrow.
3. **The user drags from the arrow cell outward onto the canvas.**
4. A thin line follows from the note box edge to the cursor as the user drags.
5. On release, the anchor point is placed at that world-coordinate position.
6. A thin line connects the note box edge to the anchor point. A small arrowhead renders at the anchor end.
7. **To add another callout:** drag from the arrow cell again. Each drag creates a new callout line to a new anchor point.

If the user never drags from the arrow cell, the note has no callouts. It works as notes always have.

### Removing the last callout

**Double-click in the arrow cell** to remove the most recently placed callout. Each double-click removes one callout in reverse order (last placed, first removed). When all callouts are removed, the arrow cell returns to its initial state.

### Callout visual style

- **Line:** `1px`, color `#546A80` (same as note text), `opacity: 0.8`.
- **Arrowhead:** small wedge at the anchor end, same color as the line. ~8px.
- **No lines during editing.** Callout lines are not drawn while the note textarea is active (the user is typing). They appear after the note is finalized.

### Coordinate model

- **Note position** (`x`, `y`): world coordinates. The note stays at this world position when panning or zooming.
- **Note box size** (`width`, text size): **fixed pixel dimensions** — the note box and text do NOT scale with zoom. The note is always readable regardless of zoom level. This is a change from the previous spec where notes scaled with zoom.
- **Anchor point** (`anchorX`, `anchorY`): world coordinates. The anchor stays locked to its position in the geometry space. It moves correctly with pan and zoom.
- **The callout line** connects the nearest edge of the note box to the anchor point. It is recomputed on every frame (pan, zoom, note drag).

What this means at different zoom levels:
- **Normal zoom:** note is near the anchor, line is short, everything reads naturally.
- **Zoom out:** both note position and anchor converge on screen (both are world coords). The line gets short. The note box stays readable because its pixel size is fixed. The note may visually overlap the anchor — this is fine.
- **Zoom in:** note and anchor spread apart on screen. The line gets long, clearly connecting the note to its referent.

### Operation log

The `note_open` operation gains an optional `anchors` array:

```javascript
{ op: 'note_open', noteId: 'n:0', text: 'This is the unit circle.',
  x: 150, y: -80, width: 200,
  anchors: [
    { x: 300, y: -120 },
    { x: -50, y: 200 }
  ] }
```

- `anchors`: array of world-coordinate anchor points. **Optional** — if absent or empty, no callout lines are drawn. Each entry adds one callout line from the note to that anchor.
- When the user adds or removes an anchor, the `note_open` operation is updated in the log.

### Callout lines during replay

- When replay reaches a `note_open` step with `anchors`: the note appears with all its callout lines already connected. The lines are not animated — they simply appear.
- When replay reaches a `note_close` step: the note, all its callout lines, and arrowheads all fade together.
- Stepping backward follows the same rules as notes: back past `note_close` restores the note and its callout; back past `note_open` removes both.
- The callout is not editable during replay.

### Callout lines and Save as Image

Callout lines are **not rendered** in Save as Image exports. The save-time note (Part B) is the only note in the exported image. Construction notes and their callouts are part of the building process, not the finished piece.

### Callout lines and undo

- If the last operation was `note_open` and it included anchors, undo removes the entire note including all its callout lines.
- There is no separate undo for individual anchors via the canvas undo gesture. Use double-click in the arrow cell to remove callout lines one at a time (see "Removing the last callout" above).
