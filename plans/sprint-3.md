# Sprint 3 — Construction Replay, Save/Share, & Functional Buttons

Read this entire document before starting.

---

## Part A: Construction Replay

### Overview

When the child opens a construction (canonical or saved), it loads step-by-step into the live geometry engine. The child clicks through each step, seeing the construction built as if she were making it. She can take over at any point.

### Loading a construction

1. If the canvas has any work in progress (operationLog.length > 1), show a dialog:
   ```
   Start over    Save and continue
   ```
   These are tappable text (Georgia, 13px, `#546A80`, highlighted darker on hover). "Start over" clears without saving. "Save and continue" triggers the save flow, then clears after save completes.

2. Once the canvas is clear (just seed points), begin the step-through.

### Step-through controls

Display in the upper left of the canvas (below the "How this works" panel, not overlapping it):

```
  ←  →
Cancel
```

- **→ (right arrow)**: advance one step. This is the primary control.
- **← (left arrow)**: go back one step (undo the last replayed operation).
- **Cancel**: exit replay mode.

Style: Georgia, 16px for arrows, 13px for Cancel. Color `#546A80`, hover `#3D3D3A`. `user-select: none`. These controls float on the canvas — `position: fixed`, with a subtle parchment background pill/container so they're visible against any construction.

### What each step shows

The operation log contains these types: `init`, `line`, `circle`, `emphasize`, `deemphasize`, `fill`, `repaint_fill`, `dissolve_fill`, `scaffold`, `numbers`.

**Group operations into user-visible steps:**

1. **Geometry steps** (`line`, `circle`): one click per operation.
   - Before the line or circle appears, **briefly highlight the two points involved** — a glow or pulse effect lasting ~350ms. Then draw the line or circle. This shows cause and effect: "those two points make this line."
   - New intersection points that result from the new line/circle appear as part of the same step.

2. **Glass steps** (sequences of `emphasize` + `fill`, or `emphasize` + `deemphasize`): batch into one click.
   - When → is clicked: show all the emphasize operations (lead appearing on segments) AND the fill operation together as one step. The child sees lead placed and the shape colored in a single click.
   - Similarly batch `repaint_fill` with any preceding emphasize/deemphasize.

3. **Scaffold steps** (`scaffold`): batch consecutive scaffold operations into one click.
   - The child sees a group of lines/points/circles fade or unfade together.

4. **Other** (`numbers`, `dissolve_fill`): one click per operation.

**Grouping logic:** walk forward through the remaining operations. The current operation determines the group type. Keep consuming operations of compatible types:
- `emphasize` groups with subsequent `emphasize`, `deemphasize`, `fill`, `repaint_fill`
- `scaffold` groups with subsequent `scaffold`
- Everything else is a single step

### The ← (back) button

Undo the last visible step. If the step was a group (multiple operations), undo all of them. Internally this means tracking the operation index boundaries of each step as it's played.

Maintain a stack of step boundaries: `[0, 1, 4, 5, 8, ...]` where each number is the operationLog index where a step begins. Going back means replaying the log up to the previous boundary.

### Cancel behavior

When Cancel is clicked, show a dialog:

```
Start over    Continue from here
```

- **"Start over"**: clear to seed points, remove replay controls.
- **"Continue from here"**: remove replay controls, discard remaining unplayed steps. Everything loaded so far stays as live geometry the child can work with.

### Forking (child takes over)

If the child performs any construction action during replay (taps a point to start a line, tap-holds to start a circle, selects a segment, etc.):

1. Silently discard all remaining unplayed operations.
2. Remove the ← → Cancel controls.
3. The child's action proceeds normally. She is now working on an original.

No warning dialog. The child's intent is unambiguous.

### Canonical vs. saved constructions

**All constructions open as copies.** Whether it's a canonical built-in (equilateral triangle, hexagon, etc.) or the child's own saved work:

- The original is never modified.
- If the child saves after modifying, it creates a new entry.
- Canonical constructions always remain in the picker regardless of what the child does.

---

## Part B: The Construction Picker

### Opening the picker

The picker opens when the child clicks **"New and Open"** in the How this works panel (which should directly trigger the action — see Part F), or when she taps **"Open"** in the tip window.

### Thumbnails

- **Canonical constructions**: pre-generated PNG thumbnails of the finished construction. These should be captured once and stored. If they don't exist yet, generate them by replaying the full operation log onto an offscreen canvas and calling `captureConstructionPNG()`.
- **Saved constructions**: PNG thumbnails are captured at save time (the `png` field in the localStorage entry).
- **Delete button**: each saved construction thumbnail has a **small × in the upper right corner**. Tapping it removes the construction from localStorage after a brief confirmation ("Delete this?"). Canonical constructions do NOT have the × — they cannot be deleted.

### Picker layout

Use the existing `buildPickerConstructions()` function and picker window. It already shows thumbnails in a grid. Clicking a thumbnail should:
1. Close the picker.
2. Check for work in progress (show save dialog if needed).
3. Begin step-through of the selected construction.

---

## Part C: Save Flow (revised)

The save flow has two distinct actions: **Save as Construction** and **Save as Image**. These replace the single save behavior.

### Triggering save

When the child taps "Save" (either in the tip window or directly from the How this works panel), show a dialog on the canvas:

```
Save Construction    Save as Image
```

Tappable text, same style as other dialogs (Georgia, 13px, `#546A80`, hover `#3D3D3A`).

### Save as Construction

Saves the work so the child can reopen and continue later.

1. **Note UI appears**: a moveable, resizable text box on the canvas.
   - The child can type a name and a note/message.
   - The text box can be **dragged** to any position on the canvas.
   - The text box can be **resized** by dragging its edges or corners.
   - Style: Georgia serif, parchment background, subtle border. Same visual language as other canvas windows. `user-select: text` (the child needs to type in this one). A small drag handle area (the top edge/header) for moving, distinct from the text area.
   - An **OK** button at the bottom-right of the text box.
   - The position and size of the note box are saved as part of the construction data.

2. When the child taps OK:
   - Capture a small PNG thumbnail (the current `captureConstructionPNG` behavior — glass fills, cropped tight).
   - Save to localStorage: operation log, thumbnail, name, note text, note position/size, timestamp.
   - Show the Uniqueness Observation (see Part E) if threshold is met.
   - Toast: "Saved"

### Save as Image

Saves a full-size PNG of the finished art — glass fills + lead lines only. No construction points, no construction lines, no circles. This is the art.

1. **Note UI appears**: same moveable, resizable text box as Save Construction.
   - The child can position it where it looks right — it becomes part of the image, like a signature or title.

2. When the child taps OK:
   - Render a full-size PNG:
     - Canvas background (parchment)
     - Glass fills (colored regions)
     - Lead lines along shape boundaries
     - The note text, rendered at the position and size the child chose
     - **Nothing else** — no construction points, no construction lines, no circles, no UI elements
   - Trigger a browser download of the PNG file. The filename should be the name the child entered (sanitized) or a default like "glass-2026-03-30.png".
   - Show the Uniqueness Observation (see Part E) if threshold is met.

### Note text box implementation

The note text box is a new component:

```html
<div id="save-note-box" class="save-note-box" style="display:none;">
  <div class="save-note-header" id="save-note-drag">
    <input type="text" id="save-note-name" placeholder="name" />
  </div>
  <textarea id="save-note-text" placeholder="add a note..."></textarea>
  <div class="save-note-footer">
    <span class="save-note-ok" id="save-note-ok">OK</span>
  </div>
</div>
```

- **Draggable** via the header (pointer events, same pattern as canvas tip windows).
- **Resizable** via a resize handle at the bottom-right corner (or use CSS `resize: both` on the textarea with `overflow: auto`).
- **Position and dimensions** are read at OK time and saved with the construction/image.
- Style: Georgia, 13px, parchment background `rgba(244,241,232,0.96)`, border `0.5px solid #c8b89a`, border-radius 6px.
- The name input is a single line at the top. The textarea is below it for the note.

---

## Part D: Share

Share sends the glass art (same rendering as Save as Image) via the native OS share sheet.

### Flow

1. When the child taps "Share" (tip window or panel):
   - Show the same note UI as Save as Image (the child can add a message).
   - When OK is tapped:
     - Render the full-size PNG (same as Save as Image — glass + lead + note, no construction geometry).
     - Convert the PNG data URL to a File object.
     - Call `navigator.share()`:

```javascript
navigator.share({
  title: noteName || 'My Glass Construction',
  text: noteText || '',
  files: [new File([pngBlob], (noteName || 'glass') + '.png', { type: 'image/png' })]
});
```

2. If `navigator.share` is not available (some desktop browsers), fall back to downloading the PNG (same as Save as Image) with a toast: "Sharing not available on this browser — image downloaded instead."

---

## Part E: The Uniqueness Observation

After the child completes a save (Construction or Image) or share, show a text box on the canvas.

### Content

The numbers are computed from the child's actual session:

```
You've made [n] points, [n] lines, and [n] circles.
With those, there are more possible arrangements
than atoms in the universe. The one you just made —
no one has made that before.
```

Where:
- `[n] points` = total number of points
- `[n] lines` = total number of lines
- `[n] circles` = total number of circles

### Threshold

Show if total points >= 15 (conservative threshold where the claim is unassailable). If fewer, don't show.

### Behavior

- Standard canvas tip window: draggable, closeable, no title.
- Shows every time the child saves or shares, as long as threshold is met. The numbers change each time.

---

## Part F: How This Works Panel — Direct Actions

**Important behavioral distinction:**

The first four items always open tip windows (explanations):
- Lines and Circles → tip window
- Cutting Shapes → tip window
- Color → tip window (and opens color panel)
- Hiding Lines → tip window

The last two items behave differently depending on whether this is a first visit or a return visit:

**First visit** (no localStorage flag for this session):
- **Save or Share** → opens the tip window with explanation text and tappable action words (Save, Share). The child learns what the options mean.
- **New and Open** → opens the tip window with explanation text and tappable action words (New, Open).

**Return visits** (localStorage flag set):
- **Save or Share** → immediately shows the save dialog ("Save Construction / Save as Image / Share"). No tip window — the child already knows.
- **New and Open** → immediately shows the new/open dialog ("New / Open").

Use the same localStorage mechanism that distinguishes first visit from return visit elsewhere. The tip window is training wheels; once seen, the panel becomes a fast path.

---

## Part G: Bug Fix — Action Words Not Responding to Clicks

The tappable action words (New, Open, Save, Share) in the tip windows and the How this works panel bullets currently don't respond to clicks. The code for `HTW_TIP_ACTIONS` and `HTW_ACTIONS` exists but handlers aren't firing.

Debug this first before implementing the new save/share flows. Check:
- Are event listeners being attached to the `.htw-action` spans?
- Is `pointer-events: none` somewhere in the CSS hierarchy blocking clicks?
- Are the click events reaching the elements? (Add `console.log` inside handlers to test.)
- Does the keyword detection pattern in `htwBuildBody` match the `[Save]` bracket syntax in the content arrays?

---

## Testing

1. Click "Save or Share" in panel → save dialog appears immediately (no tip window).
2. Click "New and Open" in panel → new/open dialog appears immediately.
3. "Save Construction" → note box appears, fill in name + note, tap OK → saves to localStorage with thumbnail.
4. "Save as Image" → note box appears, position it on canvas, tap OK → PNG downloads with glass + lead + note rendered.
5. "Share" → note box, OK → native share sheet opens (or fallback download).
6. Open a saved construction from picker → step-through controls appear.
7. Click → repeatedly — each step shows point highlights then geometry/glass.
8. Click ← to go back steps.
9. Click Cancel → "Start over" / "Continue from here" dialog.
10. During replay, tap a point to start drawing → controls disappear, remaining steps discarded.
11. After saving, modified construction creates new entry — original unchanged.
12. Delete × on saved construction thumbnails works. Canonical constructions have no ×.
13. After saving with ≥ 15 points, uniqueness observation appears with correct counts.
14. Tip window action words (New, Open, Save, Share, Choose new colors) respond to clicks.

---

## What is NOT in this sprint

- Return visit timing (localStorage timestamp for re-orientation)
- Sound design
- Region subtraction
- Running notes as a general tool (notes only appear during save flow for now)
