---
status: Ready to paste, 15 Oct 2026. Second revision after Michael tried the bench.
role: Claude Code prompt revising cw-deploys/experiments/same-glass-bench.html. Builds on Prompt-Build-Same-Glass-Bench.md and Prompt-Revise-Same-Glass-Bench-01.md; where they disagree, this one wins.
---

# Prompt: Same-glass bench, revision 2

Revise `cw-deploys/experiments/same-glass-bench.html`. Same rules as before: read shared code, don't change it; Glass Geometry decides gestures first. Report what you changed and anything you had to choose yourself.

## 1. Two views: *Near* and *Whole*

Two words in the left column, below the instructions.

- *Near* puts the unit square (the *1*) in the lower-left quarter of the screen, at a comfortable zoom.
- *Whole* frames every rectangle on the plane, with a small margin.

Each glides smoothly to its view. Neither changes anything she has made.

## 2. Labels

Each rectangle's label reads **area = width × height**, width first: **9 = 1½ × 6**. No parentheses. Placement and overlap rules are as in revision 1. Fractions or decimals follow her choice.

## 3. Transparent fills, as an option

An on/off control in the left column, worded *Fill*. When on, each rectangle gets a semi-transparent fill in its resolution's colour. Overlaps mix and darken (multiply blending), so the area near the axes, covered by every rectangle, goes darkest. Off by default. Outlines and labels behave as before either way.

## 4. Dragging when the area is fixed

When the area is *Fixed*, she no longer has to trace the curve. **A one-finger drag anywhere on the plane moves the corner along the curve:**

- Right or down makes the rectangle **wider** (and shorter).
- Left or up makes it **taller** (and narrower).
- A diagonal drag goes by whichever direction is larger.

**Finger distance multiplies; it does not add.** A fixed finger distance, about 100 pixels (keep it in one named constant), doubles or halves the width. So 1 m → 2 m → 4 m takes the same finger travel as 100 m → 200 m → 400 m, and she can reach the far stops at fine resolutions in a few swipes. The corner snaps to the exact stop nearest the target width (nearest by ratio, not by metres) and never lands anywhere else.

The camera follows the corner as she drags, zooming to keep the whole current rectangle in view.

While *Fixed*, panning and zooming use two fingers (pinch and two-finger drag), as in Glass Geometry; on a Mac, the trackpad and scroll wheel as Glass Geometry does. When not *Fixed*, one-finger drag behaves as before: from the *1* it makes a rectangle, elsewhere it pans.

## 5. Zoom-out limit

When she isn't dragging, she can't zoom out further than *Whole*. The zoom-in limit stays as it is.

## 6. Instructions

Update the top of the left column to match:

- Touch the *1* and drag to make a number.
- Tap *Fix* to hold it.
- Turn the *dial* to choose how finely to cut.
- Drag right to make it wider, up to make it taller.
- Tap *Near* or *Whole* to change the view.
- Tap *Clear* to start again.
