# Sprint 3 Fixes — Issues Found During Testing

Read this entire document before starting. These are corrections and refinements to the existing Sprint 3 implementation.

---

## 1. Construction Replay Controls — Position and Overlap

**Problem:** The ← → Cancel controls are partly covered by the color panel when it appears. They're fixed in place and can't be moved.

**Fix:**
- Move the controls to the **canvas** (not fixed to the viewport). They belong to the current construction, not to the UI frame.
- Make them **draggable** — same pattern as canvas tip windows (pointer events, `user-select: none`, entire container is drag handle).
- Default position: upper area of the canvas, but to the right of the left panel so they don't overlap the color chips or How this works list.

---

## 2. Construction Zoom on Load

**Problem:** When a construction is loaded, the zoom level is approximately 2x what it should be — the seed points (0 and 1) are twice as far apart as they are on a fresh canvas.

**Fix:** Save the current `viewScale`, `viewX`, and `viewY` as part of the construction data at save time. When loading a construction, restore these values. If the saved data doesn't include viewport info (older saves), use the default viewport (same as a fresh canvas).

---

## 3. Construction Note Not Displayed on Load

**Problem:** When a saved construction is loaded, the note text (which is visible in the PNG thumbnail) is not displayed on the canvas.

**Fix:** When loading a construction that has a saved note, display the note text box on the canvas at its saved position and size. The note should be visible during replay and after. It should be draggable and closeable (the child may not want to see it while working).

---

## 4. Glass Fill with Orphan Lead Lines

**Problem:** It's possible (and good) to apply lead to lines that aren't closed loops. But if a closed loop has an "orphan" lead line attached to it — a lead line extending beyond the loop — the loop doesn't fill with glass.

**Fix:** When checking whether selected lead segments form a closed region, **ignore segments that extend beyond the loop.** The algorithm should find any closed sub-path within the selected segments and fill it. Orphan segments that don't participate in the closed path should remain as lead decoration but not prevent the fill.

In other words: if the user has selected segments A-B-C-D-A (a closed loop) plus segment D-E (an orphan), the loop A-B-C-D-A should still fill with glass. Segment D-E stays as lead but is not part of the fill boundary.

---

## 5. Remove Share from How This Works

**Problem:** Share is not fully implemented yet. Having it in the list sets expectations we can't meet.

**Fix:** Remove "Share" from the How this works panel and from the tip window text. The panel list becomes:

```
How this works
  • Lines and Circles
  • Cutting Shapes
  • Color
  • Hiding Lines
  • New     Open     Save
```

Note the last line — see item 6 below.

---

## 6. Replace "Save or Share" and "New and Open" with a Single Action Row

**Problem:** "Save or Share" and "New and Open" as separate bullets with explanatory tip windows is overcomplicated. These actions are clear enough on their own.

**Fix:** Replace the last two bullets with a single row of three action words on one line:

```
  • New     Open     Save
```

- Displayed on one line with space between them.
- Styled to look like actions: **italic** Georgia, 13px, `#546A80`, hover `#3D3D3A`. The italic distinguishes them from the informational bullets above.
- **No tip windows** for these. Clicking them triggers the action directly:
  - **New**: if work in progress → save dialog ("Start over" / "Save and continue"), then clear to seed points.
  - **Open**: if work in progress → save dialog, then open the construction picker.
  - **Save**: opens the save dialog ("Save Construction" / "Save as Image").

These are always direct actions — no first-visit/return-visit distinction needed.

---

## 7. Save as Image — Note Position

**Problem:** The note text box can be placed anywhere on the canvas, but in the saved PNG image the note appears below the image aligned to the left, not at the position where the child placed it.

**Fix:** When rendering the PNG for Save as Image, draw the note text at the **exact canvas position** where the child placed the text box. The note position (x, y relative to the canvas/viewport) must be captured when OK is tapped and used as the drawing coordinates in the PNG render.

The note is part of the art — its position matters.

---

## 8. Cancel for Save/Open/New Operations

**Problem:** Once the child initiates a Save, Open, or New operation, there's no way to cancel and go back to what she was doing.

**Fix:** Every dialog that appears as part of these flows must have a **Cancel** option:

- Save dialog ("Save Construction / Save as Image"): add **Cancel** below or to the right.
- Note text box: add **Cancel** next to the OK button.
- Work-in-progress dialog ("Start over / Save and continue"): add **Cancel**.
- Construction picker: already has a close button — verify it works and returns to the canvas without changes.

Cancel always means: close the dialog, change nothing, return to the canvas exactly as it was.

---

## Summary of How This Works panel after these changes

```
How this works
  • Lines and Circles
  • Cutting Shapes
  • Color
  • Hiding Lines
  • New     Open     Save          ← italic, direct actions
```

Clicking "How this works" collapses/expands the list. The heading always stays visible.

---

## Testing

1. Replay controls are on the canvas, draggable, not overlapping color panel.
2. Loading a construction restores the correct zoom level.
3. Saved notes display on canvas when construction is loaded.
4. A closed loop fills with glass even if orphan lead lines are attached.
5. "Share" does not appear anywhere in the UI.
6. "New", "Open", "Save" appear on one line, in italic, and trigger actions directly.
7. Save as Image renders the note at the position the child placed it.
8. Every dialog has a Cancel option that returns to the canvas unchanged.
