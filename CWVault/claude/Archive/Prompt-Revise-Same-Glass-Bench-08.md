---
status: Ready to paste, 16 Oct 2026. Part 1 is new; part 2 is a first, light simplification of the left column (Michael is still absorbing the bench, so nothing drastic).
role: Claude Code prompt revising cw-deploys/experiments/same-glass-bench.html. Builds on the build prompt and revisions 01 to 07; where they disagree, this one wins.
---

# Prompt: Same-glass bench, revision 8

Revise `cw-deploys/experiments/same-glass-bench.html`. Same rules as before: read shared code, don't change it; Glass Geometry decides gestures and panels first. Report what you changed and anything you had to choose yourself.

## Part 1. Show the cutting: tiles that flow

The bench shows each rectangle but hides how it was made. This part shows the glass being cut and put back together.

**What happens.** The number's glass is cut into tiles at the current cut, and the tiles slide into the new rectangle.

1. **The source.** For a whole number N, the source is the N × 1 rectangle at the origin (for 2, the two square metres side by side), drawn faintly. If N is not whole, use the stop at the current cut that is nearest to square (its sides are always whole numbers of tiles).
2. **The cut.** The cut lines appear across the source at the current resolution, so at thirds each square metre becomes nine tiles, each ⅓ × ⅓. About 0.4 s.
3. **The flow.** The tiles move one at a time, in order, into the new rectangle: taken from the source in reading order (bottom row first, left to right, then the next row up) and placed into the target in the same order. So for 2 = 6 × ⅓, each row of the two squares slides out to become the next two metres of the long strip. About 2 s in all.
4. **The finish.** The tiles fade into the ordinary rectangle, with its label.

The tile count is always N × (cut)² (18 for 2 at thirds), which is also the target's width × height in tiles. Keep the tiles in the rectangle's colour, semi-transparent like everything else, with fine lead lines between them while they move.

**When it plays.**

- **Automatically, once, for the first rectangle of each new cut** during a sweep. The sweep waits for it to finish, then carries on at its usual pace.
- **When she taps a rectangle's label** ("2 = ⅔ × 3"). It plays for that rectangle. (Tapping the plane still pauses a sweep; only the label plays the tiles.)

**When it doesn't.** If the tiles would number more than **200** (named constant), it doesn't play: at hundredths, 2 would need 20,000 tiles, and by then the tiles are smaller than the pixels. A tapped label above the limit gives a brief highlight of its rectangle instead. *Every cut* doesn't play it. With *Mirror* on, only the upper-right quarter animates.

All timings are named constants. With *Sound* on, the flow makes the same soft shush a sweep makes; nothing else.

## Part 2. A lighter left column

**At the top: *How this works*,** behaving exactly as Glass Geometry's does: tapping it opens a movable panel listing the ideas below; tapping one opens its explanation; the panel can be moved and closed, and tapping *How this works* opens it again. Move every instruction line out of the column and into these explanations. Use this wording, with command words in italics:

- **Making a number.** Touch the *1* and drag to make a rectangle. Its area is the number. Tap *Fix* to hold it; tap *Fixed* to let go.
- **Cutting finer.** Turn the *dial* to cut each metre into smaller pieces. Every way to make the number at that cut appears, one rectangle at a time. Tap the plane to pause; tap again to go on. Tap *Every cut* to try every cut up to the one on the dial.
- **Watching the glass.** Tap a label, like *2 = ⅔ × 3*, to watch the glass cut into tiles and put back together.
- **Counting.** The numbers in the key count the ways. Turn a dot off to count without it.
- **Looking.** Tap *Near* or *Whole* to change the view. Pinch to zoom. Tap *Mirror* to see all four quarters.
- **Glass.** Tap *Join* to connect the corners, and *Fill* to fill the rectangles. Tap *Color*, choose a colour, then tap a row of the key.

Drop "Drag right to make it wider, up to make it taller" entirely. The gesture keeps working; it just isn't described.

**Below it, the working parts, in the order she uses them:**

1. The numbers: each readout ("2 = ½ × 4 ***Fixed***") with *Glass used* under it.
2. The dial, with ***Every cut*** directly beneath it.
3. The key: colour dot, fraction, count, and the *Total* line.
4. One row: ***Near***, ***Whole***, ***Mirror***.
5. One row: ***Join***, ***Fill***, ***Color***.
6. At the bottom, set apart by a little space: ***Sound*** and ***Clear***.

***Color* opens the palette in a panel,** as Glass Geometry's colour panel does, instead of colours sitting in the column.

Bold only the words that act. Fractions, counts and readout numbers are plain.

The column's layout is still provisional. Make spacing and order easy to change.
