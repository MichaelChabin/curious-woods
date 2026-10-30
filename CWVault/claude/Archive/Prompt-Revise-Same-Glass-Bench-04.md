---
status: Ready to paste, 15 Oct 2026. Fourth revision after Michael tried the bench on the iPad. Items 4 to 6 are trials: build them so Michael can judge them, and make them easy to change.
role: Claude Code prompt revising cw-deploys/experiments/same-glass-bench.html. Builds on the build prompt and revisions 01 to 03; where they disagree, this one wins.
---

# Prompt: Same-glass bench, revision 4

Revise `cw-deploys/experiments/same-glass-bench.html`. Same rules as before: read shared code, don't change it; Glass Geometry decides gestures first. Report what you changed and anything you had to choose yourself.

## 1. Starting view, and the size of the 1

The origin sits near the **lower-left corner of the plane**, about 60 px in from the left edge and 60 px up from the bottom (enough for the 0 and axis labels). Not the middle: the rectangles only live in the upper-right quarter, and the middle leaves three-quarters of the screen unused.

Scale so that **10 metres fits the plane's shorter side** (its height on an iPad in landscape), so a metre is roughly 100 px. Keep the margin and the "10 metres" in named constants.

***Near* returns to exactly this view.** One home, not two.

## 2. Colour by number when more than one is fixed

With one number fixed, rectangles are coloured by resolution, as now. With **two or more** numbers on the plane, each number's rectangles, labels and *Join* lines take **that number's colour** (the coloured dot already beside it in the readout), so she can tell which rectangles belong to which number. Resolution is still readable from the labels. The key's dots still hide by resolution.

## 3. The first number is 2

When the page opens, 2 is already made and fixed (2 × 1 at whole metres), so the first thing she can do is turn the dial. She can still drag from the *1* to make any other number.

(2 is chosen because at every resolution it has no square: no stop ever lands on the diagonal, since nothing she can write as a fraction times itself makes 2. The gap in the middle never closes. Draw nothing to point this out.)

## 4. Trial: the sweep runs itself

When the area is fixed and she turns the dial to a resolution she hasn't swept yet, the bench **steps through every exact stop by itself**, from the tallest to the widest, laying down one rectangle at a time, at about three a second (named constant). The camera zooms out only as needed, as in revision 3. Tapping anywhere on the plane pauses; tapping again continues. Turning the dial again starts the next sweep from wherever the corner is.

Dragging still works exactly as in revision 2, for a child who wants to move the corner herself.

Name the pace and the order (tallest first) in the report so Michael can judge them.

## 5. Trial: all four quarters

A new word in the left column, ***Mirror***. Tapping it shows every rectangle reflected into the other three quarters of the plane, across both axes, so the picture becomes a four-way pattern centred on the origin. Tapping it again shows the upper-right quarter only.

The reflected rectangles are copies: same colours, same transparency, same fills, no labels. Widths and heights are lengths, so they stay positive: **axis numbers in the other quarters are written without minus signs**. When *Mirror* is on, the starting view and *Near* centre the origin instead of putting it at the lower left; *Whole* frames all four quarters.

## 6. Instructions

Update the top of the left column:

- The *2* is already made. Turn the *dial* to cut more finely.
- Tap the plane to pause; tap again to go on.
- Touch the *1* and drag to make a different number; tap *Fix* to hold it.
- Tap *Join* to connect the corners; tap it again to erase.
- Tap *Mirror* to see all four quarters.
- Tap *Near* or *Whole* to change the view.
- Tap *Clear* to start again.

Drop "Drag right to make it wider, up to make it taller" from the instructions; the gesture stays but is no longer the main way in.
