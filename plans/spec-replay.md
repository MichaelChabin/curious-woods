# Specification: Construction Replay

This is the authoritative specification for how construction replay works. If existing code contradicts this document, the code should be changed to match.

---

## What replay is

The child opens a saved or canonical construction and steps through it manually, one step at a time. She controls the pace. She can go forward, backward, jump to the start or end, and take over at any point to make the construction her own.

Replay is NOT an automatic animation with timers. The child clicks to advance each step.

---

## Loading a construction

### Opening from the picker

1. Child clicks "Open" (or "New and Open" on first visit).
2. **If work in progress** (operationLog.length > 1): show a dialog with three options:
   - **Save** — trigger the save flow, then clear canvas after save completes.
   - **Discard** — clear canvas without saving.
   - **Cancel** — return to canvas, do nothing.
3. **If no work in progress**: proceed directly.
4. Open the construction picker (thumbnail grid).
5. Child taps a thumbnail.
6. Close the picker.
7. **Do not ask to save again** — the save check already happened in step 2. Track this with a flag that resets after the picker closes.

### Preparing the canvas

1. Reset operationLog to `[{ op: 'init', seed0: {x: -100, y: 0}, seed1: {x: 100, y: 0} }]`.
2. Call `replayLog(false)` to clear all geometry.
3. Set the viewport to the **default viewport** (same as a fresh canvas): `viewX = 0, viewY = 0, viewScale = Math.min(window.innerWidth, window.innerHeight) / 900`.
4. Do NOT use `fitViewToConstruction()` — the construction hasn't been loaded yet. Do NOT restore saved zoom. Start from the standard view.

### Beginning step-through

1. Parse the saved construction's operation log into **steps** (see step grouping below).
2. Set the replay cursor to step 0.
3. **Immediately execute step 0** — the child sees the first meaningful action (e.g., the first line drawn), not a blank canvas with just seed points.
4. Show the step-through controls.
5. If the construction has a saved note, display it at its saved position (draggable, closeable).

---

## Step-through controls

### Layout

```
|←   ←   →   →|
     Cancel
```

- **|←** (first): jump to step 0 (first action after seed points).
- **←** (back): go back one step.
- **→** (next): advance one step.
- **→|** (last): jump to the final state — all steps applied at once.
- **Cancel**: exit replay.

### Styling

- Georgia, 16px for arrow characters, 13px for "Cancel".
- Color: `#546A80`, hover: `#3D3D3A`.
- `user-select: none`.
- The control panel is a floating container on the canvas with a subtle parchment background (`rgba(244,241,232,0.96)`, `border: 0.5px solid #c8b89a`, `border-radius: 6px`).
- **Draggable** — the child can move it out of the way.
- **Default position**: upper right area of the canvas, away from the left panel and away from where geometry typically starts.

### How stepping works

**→ (next):**
1. Advance the replay cursor by one step.
2. Execute all operations in that step (see step grouping below).
3. Call `replayLog(false)` — rebuild from operationLog[0..currentIndex].
4. If any `note_open` operations are in this step, show the note on canvas.
5. If any `note_close` operations are in this step, fade the note out.

**← (back):**
1. Move the replay cursor back one step.
2. Rebuild from operationLog[0..currentIndex] by calling `replayLog(false)`.
3. Notes: if stepping back past a `note_close`, the note reappears. If stepping back past a `note_open`, the note disappears.

**|← (first):**
1. Set replay cursor to step 0.
2. Rebuild from just init + step 0.

**→| (last):**
1. Set replay cursor to the final step.
2. Apply all remaining operations at once.
3. All notes that are open at the end of the construction are visible. Notes that were opened and closed mid-construction are not visible.

**Cancel:**
Show a dialog:
- **Start over** — clear canvas to seed points, remove step controls.
- **Continue from here** — remove step controls, discard remaining unplayed steps. Everything loaded so far stays as live geometry.

---

## Step grouping

The operation log is a flat list of individual operations. These are grouped into user-visible "steps" — each click of → advances one step.

### Rules for grouping

Walk through the operation log (skipping the `init` operation) and group as follows:

**Geometry steps — one step each:**
- A single `line` operation = one step. All intersection points it creates appear as part of the same step.
- A single `circle` operation = one step. All intersection points it creates appear as part of the same step.

**Glass steps — batch into one step:**
- A sequence of consecutive `emphasize` operations, optionally followed by `deemphasize` operations, optionally followed by a `fill` operation = one step. The child sees lead placed and the shape colored in a single click.
- A `repaint_fill` operation, optionally preceded by `emphasize`/`deemphasize` = one step.

**Scaffold steps — batch into one step:**
- Consecutive `scaffold` operations = one step. The child sees a group of lines fade or unfade together.

**Note steps — one step each:**
- A `note_open` operation = one step. The note appears.
- A `note_close` operation = one step. The note fades out.

**Other:**
- `dissolve_fill` = one step.
- `numbers` = one step.

### Eliminating empty steps

After grouping, **discard any step where nothing visibly changes.** This happens when:
- A group of `emphasize` + `deemphasize` operations cancel each other out (net result: no emphasis change).
- An `emphasize` sequence is immediately followed by a `fill` that consumes the emphasis — the emphasis is invisible because the fill covers it. In this case, merge the emphasis into the fill step.
- A palette/color selection event was recorded but has no visual effect on its own.

**Test for empty steps:** after applying a step's operations, compare the visible canvas state (points, lines, circles, fills, scaffold states, notes) to the state before the step. If nothing changed, merge this step into the next step.

---

## Forking (child takes over)

If the child performs any construction action during replay — taps a point, starts a line or circle, selects a segment, double-clicks to place a note:

1. Silently discard all remaining unplayed operations from the loaded construction.
2. The operations played so far become the child's operation log.
3. Remove the step-through controls.
4. The child's action proceeds normally.

No warning dialog. The child's intent is clear.

---

## Canonical vs. saved constructions

**All constructions open as copies.** The original is never modified. If the child saves after modifying, it creates a new entry. Canonical constructions always remain in the picker.

---

## What is NOT displayed during replay

- **No point highlighting/glowing** before each step. Just show the geometry appearing.
- **No timer-based animation.** Every step is manual (click →).
- **No sound** during replay (this may change when sound design is complete).
