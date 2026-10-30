---
status: Ready to paste, 15 Oct 2026. Small revision; can go with revision 4 or after it.
role: Claude Code prompt revising cw-deploys/experiments/same-glass-bench.html. Builds on the build prompt and revisions 01 to 04; where they disagree, this one wins.
---

# Prompt: Same-glass bench, revision 5

Revise `cw-deploys/experiments/same-glass-bench.html`. Same rules as before. Report what you changed and anything you had to choose yourself.

## 1. *Glass used*

Under each number's readout in the left column, a second line: **Glass used: 18½ square metres** (fractions or decimals per her choice, as everywhere).

It is the area covered by all of that number's rectangles together, every resolution included, **with overlaps counted once**: the area *Fill* would paint. Compute it exactly, in fractions, never by sampling pixels:

1. Take every stop of that number on the plane, from every resolution swept, duplicates removed, sorted by width, narrowest first.
2. The narrowest rectangle counts whole.
3. Each next rectangle adds only the strip that sticks out past the one before it: (its width − the previous width) × its height.
4. Add them up.

It updates live as a sweep lays rectangles down, so she can watch it climb. *Clear* resets it. Hidden resolutions (key dot off) still count; the number is about the glass, not the view. *Mirror* doesn't change it.

Expected values for checking, after sweeping the whole range of a single resolution from a cleared plane: for 9, whole metres 21, halves 34½, tenths 60.9, hundredths 100.395. For 2, whole metres 3, halves 5. (Whole metres, halves, tenths and hundredths nest: every whole-metre stop is also a halves stop and a tenths stop, so sweeping them in that order gives the same totals.)

## 2. Axes, numbered in whole metres

Draw the x and y axes as solid lines, clearly darker than any grid line, always visible at every zoom.

Number them in **whole numbers only**, never fractions or decimals, along the outside of each axis: 1, 2, 3 … When zoomed out so far that every whole number would crowd, label every 2, 5, 10, 20, 50, 100 … (whichever is the smallest step that leaves room), still whole numbers. When zoomed in so far that not even 1 is on screen, the labels go away and the resolution's grid lines carry the scale. Keep 0 at the origin.

With *Mirror* on, the other three quarters are numbered the same way, with no minus signs (as in revision 4).

Put the label text and the step choice in one place, so other benches on the plane can reuse it.
