# Tip Window Auto-Fade and Panel Connection

## Overview

When the child demonstrates that she understands a feature, the corresponding tip window fades away and the panel bullet briefly highlights — teaching the child that the panel is where information lives.

---

## The pattern

1. A tip window is open on the canvas.
2. The child works and crosses a competence threshold (see below).
3. The tip window **fades out gradually** over ~2.5 seconds. Not abrupt — slow enough to notice.
4. As the window fades, the corresponding **bullet in the "How this works" panel briefly bolds** (or pulses — a brief color shift to `#3D3D3A` and back) for ~2 seconds. This creates a visual connection: the information moved to the panel.
5. The bold fades back to normal.

## Only one tip window on canvas at a time

If a new tip window needs to appear while an old one is still open:
- The old window fades out (same gentle fade).
- After the old window is gone (~500ms delay), the new one fades in.
- The old window's bullet gets its brief bold pulse as the old window fades.

## If the child closed the window herself

No fade animation needed — she already dismissed it. The bold-pulse on the panel bullet can still happen when the competence threshold is reached, as a quiet confirmation.

## Competence thresholds (triggers for auto-fade)

| Tip window | Threshold |
|-----------|-----------|
| Lines and Circles | Child has made ≥ 2 lines AND ≥ 2 circles |
| Cutting Shapes | Child has created her first filled glass shape |
| Color | Child has colored ≥ 2 shapes |
| Hiding Lines | Child has faded at least one line |

These thresholds should be checked after each relevant operation (new line, new circle, new fill, scaffold toggle). Each check only needs to fire once — set a flag after the fade triggers.

## Implementation

- Add a `checkTipFadeThresholds()` function, called from `appendOp()` alongside the existing `checkHtwTriggers()`.
- For each stage, count the relevant objects (lines, circles, fills, scaffold operations) and compare against the threshold.
- When a threshold is met and the corresponding tip window is currently open on canvas:
  - Apply a CSS transition: `opacity` from 1 to 0 over 2500ms.
  - On transition end: hide the window (`display: none`), reset opacity.
  - Simultaneously: add a `htw-pulse` class to the corresponding panel bullet.
- The `htw-pulse` class applies a brief style change (e.g., `color: #3D3D3A; font-weight: bold`) then transitions back over 2 seconds. Use a CSS animation or a setTimeout to remove the class.

## What this does NOT include

- Maya integration (these thresholds will become Maya's decisions in the future)
- Adaptive timing based on child behavior (future — Maya)
