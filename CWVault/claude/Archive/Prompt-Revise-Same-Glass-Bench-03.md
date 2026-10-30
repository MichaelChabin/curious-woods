---
status: Ready to paste, 15 Oct 2026. Third revision after Michael tried the bench.
role: Claude Code prompt revising cw-deploys/experiments/same-glass-bench.html. Builds on the build prompt and revisions 01 and 02; where they disagree, this one wins.
---

# Prompt: Same-glass bench, revision 3

Revise `cw-deploys/experiments/same-glass-bench.html`. Same rules as before: read shared code, don't change it; Glass Geometry decides gestures first. Report what you changed and anything you had to choose yourself.

## 1. *Join*: straight lines between the corners

A new word in the left column, *Join*. Tapping it draws, for each resolution she has used, a line joining that resolution's corners in order, from the tallest stop to the widest, in the resolution's colour. Tapping *Join* again erases the lines.

These are straight pieces between exact stops, never a smooth curve. Coarse resolutions give an angular line; finer ones come closer to a curve without becoming one. Never draw xy = N as a continuous curve.

The lines follow the key: a resolution hidden by its dot hides its line too. Lines update as new stops are added.

## 2. Camera: zoom out only when needed

During a drag, the camera moves only when the new rectangle would go off the visible plane, and then **only outward**, with a small margin. It never zooms in by itself. Zooming in stays hers: pinch, scroll, or *Near*. This replaces "the camera follows the corner" in revision 2.

## 3. Readout order

The readout uses the same order as the labels: **9 = ⅕ × 45**, area first, then width × height.

## 4. Lighter fills

With *Fill* on (fills only, no outlines, as already changed), make each fill lighter, so that the region near the axes stays readable after five or six resolutions instead of going black. Keep the opacity in one named constant.

## 5. A new number while one is fixed

Dragging from the *1* while a number is fixed starts a new number, as now. The old number's rectangles stay on the plane, with their colours and labels.

## 6. Bold the words that act

For now, every word in the left column that does something when tapped is **bold** (and stays italic, as in Glass Geometry): ***Fix*** / ***Fixed***, ***Near***, ***Whole***, ***Join***, ***Color***, ***Fill***, ***Clear***. Instruction text that merely names them can stay as it is. The left column's layout is provisional; Michael will rework it once the set of controls settles.

## 7. Instructions

Add one line after the dial line:

- Tap *Join* to connect the corners; tap it again to erase.
