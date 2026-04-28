# Next Round — Design Notes

Items discussed but not included in the current sprint. These are ready for design refinement and implementation after the current sprint is stable.

---

## 1. Return visit timing

Use a `lastVisit` timestamp in localStorage to adjust the return experience:
- **Never visited** → full first-visit flow (tip windows appear at thresholds)
- **Visited recently** (within ~1 week) → quiet return, just the panel, blank canvas
- **Visited but it's been a while** (>1 week) → gentle re-orientation, possibly offer to open a saved construction or show examples

The threshold ("a while") is a design judgment — start with one week, adjust based on tester feedback.

---

## 2. "Open or New" panel item

Change the "Open Construction" bullet in the How this works panel to **"Open or New"**.

When clicked, a tip window appears on the canvas with:

```
Tap New to start a new construction.
Tap Open to see examples and to open
constructions you've saved.
```

"New" and "Open" are tappable text — styled like the rest of the tip window text (Georgia, same color) but functioning as buttons. Subtle differentiation on hover/tap (underline or slight color change) so the child discovers they're interactive.

- **Tapping "New"**: if a construction is in progress, offer to save it first. Then clear the canvas to seed points.
- **Tapping "Open"**: opens the construction thumbnail picker. If a construction is in progress, offer to save first.

This establishes a pattern: tip windows can contain **tappable text that acts as buttons**, making them lightweight dialogs when needed. Same pattern used by Save or Share.

---

## 3. Save or Share panel

When "Save or Share" is clicked in the How this works panel, a tip window opens explaining each option. The window also contains tappable text buttons:

- **Save as Image** — save the current canvas as a PNG
- **Save as Construction** — save the operation log so it can be replayed
- **Share** — share with someone (the "grandparent's refrigerator" use case)

Each option leads to a naming flow with an optional **notes text box** (moveable, resizable, with OK button). The notes component is designed to be reusable — it will appear anywhere a child wants to attach a personal message to something she made.

---

## 4. Construction replay workflow

When a construction is opened from the picker:
- If work is in progress: dialog offering to save current work first
- Canvas clears, construction loads at correct position and zoom
- Controls appear: **Show Me** (upper left), **← →** (below Show Me), **Finished**
- "Show Me" returns to initial state and replays the full construction
- Arrows step forward/backward one operation at a time
- "Finished" clears the loaded construction and resets canvas
- At any point during replay, if the child starts making changes, the remaining construction steps are deleted — the child's work is now an original

---

## 5. Lead thickness control

Since selecting segments IS placing lead, lead thickness is a property of the shape-making process. Add a simple global lead thickness control near the color chips in the panel. Changing it affects all lead on the canvas. Per-shape thickness is a future refinement.

---

## 6. The Uniqueness Observation

A simple text box (no Maya integration for now) that appears when the child saves work. It uses the child's actual session numbers:

"You've made [n] points, [n] lines, and [n] circles. With those, there are more possible arrangements than atoms in the universe. The one you just made — no one has made that before."

The calculation is real if rough. The numbers come from the child's actual session. For testers to see — does not require Maya/Claude integration.

---

## 7. Sound design

Needs a full design pass:
- Always ask permission before playing sounds
- Sound will be a component across many interactives
- Philosophy: what role does sound play? Feedback? Atmosphere? Discovery?
- During circle construction: currently every intersection makes a sound, which is overwhelming. The sprint fixes the visual (highlight nearest only) — sound should follow the same rule.

---

## 8. Color palette refinements

- The "Choose..." picker needs working thumbnails (in current sprint, item 7)
- Consider the workflow for switching palettes — is it discoverable enough?
- Color tips text content still needs to be written

---

## 9. Region subtraction (future)

The mathematically correct solution for overlapping fills. Each filled region is a true geometric object — a larger region containing a smaller filled region becomes a frame, not a cover. Important for:
- Correct visual display
- Future area calculations
- Path to calculus (area between curves)

Compositing order (current sprint item 4) is the temporary fix.

---

## 10. Full planar subdivision (distant future)

Automatic region detection computed from the arrangement of lines and circles. Would replace manual segment selection. Needed for:
- Area calculations
- Four-color theorem
- Euler's formula for planar graphs

High risk, high reward. Not a prerequisite for the demo.

---

## 11. Auto-complete segment selection

When the child taps a segment that is not contiguous to the currently selected segment, and there is an unambiguous shortest path between them in the segment graph, auto-select all intermediate segments.

- Use BFS from the endpoints of the selected segments
- Only auto-complete when exactly one shortest path exists
- If multiple paths of the same length exist, do nothing — wait for the child to disambiguate by tapping the next segment
- The segment adjacency graph already exists (logical segments sharing points)

This would make shape selection dramatically faster for complex shapes.

---

## 12. Note callout lines

Each construction note could have a thin line connecting it to a specific point or location on the canvas — like a callout in a technical drawing. The child places the note, then taps a point that the note refers to. The line updates with zoom/pan.

- Anchor stored as world coordinates in the `note_open` operation
- If no anchor is set, no line is drawn — the note stands alone
- Solves the problem of notes being spatially disconnected from what they describe

---

## 13. Reduced hit-detection for faded elements

Faded lines, circles, and points should have roughly half the normal hit-detection radius. They remain interactive but require more deliberate tapping. Prevents accidental selection when working near faded scaffolding.
