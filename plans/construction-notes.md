# Construction Notes — Notes as Operations

## Overview

Notes become events in the operation log, just like lines and circles. The child (or author) can place a note at any point during construction. The note appears at that moment during replay and disappears when it was closed. This turns constructions into narrated sequences — tutorials, demonstrations, proofs.

---

## Placing a note

**Gesture:** Double-click in empty space on the canvas.

This replaces the old double-click-empty-space-to-reset behavior (which is now handled by "New" in the How this works panel).

**What happens:**
1. A note text box appears at the double-click location.
2. The child types her note.
3. She can drag the note box to reposition it.
4. She can resize the note box (the textarea expands to fill it).
5. When she's done, she clicks away from the box, or clicks a small "done" control on the box, or simply continues constructing.
6. The note is recorded in the operation log.

---

## Operation log entries

Two new operation types:

```javascript
{ op: 'note_open', noteId: 'n:0', text: 'This is the unit circle.', x: 150, y: -80, width: 200 }
```
- `noteId`: unique identifier for this note (e.g., `n:0`, `n:1`, incrementing)
- `text`: the note content (may contain newlines)
- `x`, `y`: world coordinates of the note position
- `width`: width of the note box in world coordinates (for text wrapping)

```javascript
{ op: 'note_close', noteId: 'n:0' }
```
- Closes/hides the note with the matching `noteId`

A note that is never explicitly closed stays visible for the rest of the construction.

---

## Note behavior during construction

- Multiple notes can be open at the same time.
- Each note is draggable and resizable while open.
- If the child drags or resizes a note after placing it, the position/size update is reflected in the `note_open` operation (update in place — the log records the final position, not every drag step).
- Notes have the same visual style as tip windows: Georgia serif, `#546A80`, semi-transparent parchment background, no title bar, draggable.
- A small "×" or "close" in the top-right corner closes the note (which appends `note_close` to the log).

---

## Note behavior during replay (step-through)

- When the replay reaches a `note_open` operation, the note appears on the canvas at the saved position with the saved text.
- When the replay reaches a `note_close` operation, the note fades out (~1 second fade).
- **Stepping backward** past a `note_close` makes the note reappear. Stepping backward past a `note_open` makes it disappear.
- **→| (jump to last)** shows all notes that are open at the end of the construction. Notes that were opened and closed mid-construction are not visible at the end.
- **|← (jump to first)** shows only notes that are open at step 1.

---

## Grouping in step-through

Notes are their own steps — they are NOT grouped with adjacent geometry operations. Each `note_open` is one click of →. Each `note_close` is one click of →. This gives the viewer time to read each note before proceeding.

---

## Undo

- Undo (`undoOp()`) removes the last operation. If the last operation was `note_open`, the note disappears. If it was `note_close`, the note reappears.
- Single-click-empty-space undo still works — but only if the click is NOT a double-click. The interaction handler must distinguish: single click = undo, double click = place note.

---

## Interaction timing

To distinguish single-click-empty-space (undo) from double-click-empty-space (place note):

- On first click in empty space, start a short timer (~300ms).
- If a second click arrives within that window: it's a double-click → place note. Cancel the undo.
- If the timer expires with no second click: it's a single click → undo.

This introduces a ~300ms delay before undo executes. That's acceptable — the child won't notice.

---

## Use cases

**Child's own notes:** "I think this angle is 60 degrees" — personal annotations during exploration.

**Guided constructions (authored by teacher/parent/Michael):**
- Step-by-step instructions: "Draw a circle through both points"
- Observations: "Notice these three sides are equal"
- Proofs: "These triangles share a base and have equal heights, therefore equal area"
- Tips: "Try fading the construction lines to see the pattern"

**Canonical constructions with narration:** The built-in library constructions (equilateral triangle, golden rectangle, etc.) can include notes that explain each step. During replay, the child reads the explanation, sees the construction happen, then advances.

---

## Saving and loading

Notes are part of the operation log, so they are automatically saved and loaded with constructions. No special handling needed — `saveConstruction()` already saves the full operation log, and `replayLog()` already walks through all operations.

The only new code needed is teaching `replayLog()` to handle `note_open` and `note_close` operation types: creating/showing/hiding note DOM elements on the canvas.

---

## Save as Image

Notes that are **currently open** when the child saves as image are rendered into the exported PNG, same as the save-flow note. They use the same font, size, and wrapping rules. Position is taken from the note's world coordinates, mapped to export coordinates.

Notes that are closed are not rendered.

---

## What this does NOT include

- Rich text formatting in notes (bold, italic, etc.) — future
- Images or diagrams in notes — future
- Maya-authored notes (Maya places notes based on what the child is doing) — future, Layer 2
