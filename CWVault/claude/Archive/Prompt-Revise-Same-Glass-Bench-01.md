---
status: Ready to paste, 15 Oct 2026. First revision after Michael tried the bench.
role: Claude Code prompt revising cw-deploys/experiments/same-glass-bench.html. Builds on claude/Prompt-Build-Same-Glass-Bench.md; where the two disagree, this one wins.
---

# Prompt: Same-glass bench, revision 1

Revise `cw-deploys/experiments/same-glass-bench.html`. Same rules as before: read shared code, don't change it; Glass Geometry decides gestures first. Report what you changed and anything you had to choose yourself.

## 1. Rectangles stay

Every exact stop she passes during a sweep stays on the plane as a rectangle. Nothing fades. Remove tap-to-keep and the faint passing outlines; passing a stop is keeping it.

## 2. Labels

Each rectangle carries its **dimensions** ("4½ × 2"), placed just outside its upper-right corner. Fractions or decimals follow her choice, as everywhere.

The corners lie at different points along the curve, so labels mostly spread themselves out. **Where a label would overlap another, leave it out**; zooming in brings it back. Never shrink a label to make it fit.

The area appears once, in the readout.

## 3. Colour and transparency

- Each rectangle's lead takes **its resolution's colour**: the strong version of that resolution's faint grid colour.
- Rectangles and their labels are **semi-transparent**, so where lines overlap they darken. (The edges along the axes are shared by every rectangle and will go nearly solid; that's expected.)
- Outlines only. No fills yet.

## 4. Assigning colours

She taps a colour in the palette, then taps a resolution in the key in the left column. That resolution's grid lines, rectangles and labels all take the new colour. With no colour chosen, tapping a key entry's dot shows or hides it, as now.

## 5. Instructions, top of the left column

Use exactly this wording, with the command words in italics as in Glass Geometry, and make the behaviour match it:

- Touch the *1* and drag to make a number.
- Tap *Fix* to hold it.
- Turn the *dial* to choose how finely to cut.
- Drag the *corner* to find every way to make that number.
- Tap *Clear* to start again.

## 6. Fix

The word *Fix* sits immediately to the right of the area readout. Tapping it holds the area, and the word becomes *Fixed*. Tapping *Fixed* lets go, and it becomes *Fix* again. (This replaces tapping the readout itself.)

## 7. Clear

*Clear* removes every rectangle, lets go of the held number, and empties the key. The resolution dial stays where it is.

## Not yet

Semi-transparent fills, where darkness would count how many rectangles cover a spot. Michael wants to see this revision first.
