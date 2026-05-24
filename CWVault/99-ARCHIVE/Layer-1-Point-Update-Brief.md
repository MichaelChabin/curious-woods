# Layer 1 Point Update — Brief for Coding Session

**Date:** February 18, 2026  
**Task:** Update point rendering in the existing Layer 1 prototype.  
**File:** `/Users/michaelchabin/CuriousWoods/prototypes/geometry-layer1.html`  
**Scope:** Small — point visuals only. No new features.

---

## What to Change

### Point size
- Currently too large and visually dominant.
- New size: approximately **twice the line stroke width**. If lines are 1.5-2px, points should be ~3-4px diameter.
- The goal: constructions (lines, circles, shapes) are what the child notices, not dots.

### Point color
- Try `#BE622F` (warm copper/burnt orange) as the default point color.
- This complements the Payne's gray (`#546A80`) used for lines and circles.
- On the parchment background (`#f4f1e8`), copper points should be visible but not loud.

### Point behavior — reduce to two states

**Remove these states:**
- Pulsing/gold animation for newly created points (new points behave like any other)
- Highlight/blue ring on selection (the ghost preview communicates selection)
- Any other decorative point states

**Keep only:**
1. **Default** — small solid dot (`#BE622F`, ~3-4px). No animation, no decoration. Just sitting there, available.
2. **Approach glow** — when a ghost circle's edge or a ghost line's endpoint gets within snap distance, the point brightens or grows slightly. This is the only active visual feedback. It says: "if you commit now, I'm what you'll get."

### Why no selected state?
- When the child taps a point to start tap-tap, the ghost line immediately appears anchored to that point. The ghost line *is* the feedback.
- When the child presses a point to start a circle, the ghost circle immediately appears centered there. The ghost circle *is* the feedback.
- No highlight needed because the construction preview does that job.

### Hit detection
- The invisible hit detection radius stays generous (~15-20px screen space) for touch usability.
- Only the visual dot shrinks. The tap target does not.

---

## What NOT to Change

- Gestures (tap-tap, drag) — working, don't touch
- Intersection detection — working, don't touch
- Ghost previews — working, don't touch
- Snap behavior — working, don't touch
- Undo/clear — working, don't touch
- Canvas pan/zoom — working, don't touch

---

## Done When

- Points are small copper dots (~3-4px) on the parchment canvas
- An equilateral triangle construction looks clean — lines and circles dominate, points are subtle markers
- Points only change appearance when a construction approaches them (approach glow)
- No pulsing, no highlight-on-select, no special new-point animation
- Everything else still works exactly as before

---

## After This

Once the point update looks right, this cleaned-up Layer 1 becomes the base for Layer 2 (Maya wisp presence). The coding session should **not** modify geometry-layer1.html further after confirming the update — Layer 2 work goes in a new geometry-layer2.html.

---

**⚠️ Use `filesystem:` tools, NOT `bash_tool`.**
