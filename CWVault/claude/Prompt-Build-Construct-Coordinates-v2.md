---
status: BUILT 28 Oct 2026 (Claude Code, on da958b6; reported, then committed and pushed on Michael's word). The page is experiments/construct-coordinates-v2.html; the report Report-Construct-Coordinates-v2.md with the pictures in Construct-Coordinates-v2-Oct28/. What is open is named in the report: the copper from cw-style.js not palettes.json, the slow lines' order, a fraction's timing.
role: Second bench for constructing the plane in front of her, the way the glass boards may open. Adds numbers as they are minted, two new pauses, floating axis labels, and fractions constructed from any grid intersection.
related: experiments/construct-coordinates.html (v1, Aug 2026), Series-Glass-Geometry.md, Standard-Interactives.md
---

# Prompt: Construct Coordinates, second bench

> Read `cw-deploys/experiments/construct-coordinates.html` first, all of it: the steps log (`buildSteps`), the timing weights, the ceremony that sweeps in and fades, the finer grid (`buildSub`), tap-to-skip, and the knobs. Read it; don't infer it. Then build `cw-deploys/experiments/construct-coordinates-v2.html` beside it. Leave v1 exactly as it is.
>
> This may become part of the geometry kit, so keep every construction as data in a steps log, as v1 does, with drawing separate from the log. Don't touch `glass.js` now.
>
> **Keep from v1:** the opening from the seeds 0 and 1, full circles only (no arcs), the legible opening and the accelerando, ceremony that fades once its work is done, tap skips ahead, deep zoom constructs the finer grid, palette and type.
>
> **1. Numbers as they are minted.** Each integer on the x and y axes gets its label the moment its point appears, not all together at the end. Remove the labels-last block.
>
> **2. Pause at the y axis.** When the two radius-2 circles centred on 1 and −1 have both been drawn and cross at (0, √3), hold before the y axis line is drawn, so she sees the crossing that the axis goes through. Default 0.5 s. A knob for it.
>
> **3. Pause at the first grid lines.** The first few grid lines (with their circles) are built slowly, each followed by a short hold, so she can see what is happening; then the accelerando takes over. Two knobs: how many lines get the slow treatment (default 3) and how long each hold is (default 0.4 s). These holds are real time added to the run, not a reshuffle of the duration knob.
>
> **4. Axis labels.** The words *x axis* and *y axis*. *x axis* sits under the x axis near the right edge of the screen. *y axis* sits left of the y axis near the top. They float: on pan and zoom they stay at those screen edges, riding their axis, for as long as the axis is on screen, and disappear when it isn't. They never cover a construction: if a label would sit on a line, point, circle or number, it slides along its axis to the nearest clear spot. Same type as the number labels, a little quieter.
>
> **5. Fractions.** Once the grid is built, she can tap any intersection of the main grid (not the finer grid). Tapping a point on the y axis or the x axis does nothing. The fraction is the point's height over its width, both taken as positive: (2, 1) gives 1/2, (3, 1) gives 1/3, (−2, 1) gives 1/2. Call it f.
>
> The construction, step by step, with the same ceremony as the opening:
>
> - A line from the tapped point through (0, 0), drawn across the plane. It stays.
> - The point where it crosses the vertical line x = 1 is marked. That is (1, f), or (1, −f) for points in the second and fourth quadrants. It stays.
> - A circle centred on (1, 0) through that point. Its radius is f, so it marks the x axis at 1 − f and 1 + f.
> - Then the length is carried along both axes, both directions, to the edges of the screen, by one of two methods. **A bench switch chooses between them**, for Michael to decide by looking:
>   - *walk from 1*: circles each centred on one mark and passing through its neighbour, stepping outward from 1 − f and 1 + f. On the y axis, the same from (0, 1): a circle centred there with radius f, then the walk. Every circle is centred on a point and passes through a point. For unit fractions (1/2, 1/3, …) the walk lands on 0 and on every multiple of f. For others it doesn't: 2/3 gives marks at 1/3, 5/3, 7/3, … and never at 2/3.
>   - *carry to 0*: the circle's radius is carried to (0, 0), and one circle there marks both axes at f; then the walk steps outward from 0 by f. This always marks the multiples of f.
> - The circles fade once their marks are made, as in the opening. The marks stay. No labels on the fraction marks in this bench.
> - The fraction is written, stacked (numerator over a bar over denominator), to the left of the tapped point. If it isn't in lowest terms, write it as tapped and then in lowest terms: (4, 2) shows *2/4, 1/2*.
>
> Fraction work (line, crossing point, marks, label) is drawn in the copper accent from `palettes.json`, so it reads apart from the grid. Several fractions can stand at once. Tap-to-skip finishes the fraction now being built. A knob for how long one fraction takes (default 3 s), with its own short legible opening and accelerando like the main run.
>
> **6. Clear.** A word in the panel, *clear fractions*, removes every fraction and leaves the grid, the numbers and the axis labels alone. Replay still rebuilds everything.
>
> **Check before reporting**, on the Mac: the full opening at default knobs; the pause at (0, √3); the first three grid lines; the labels after zooming in, zooming out, and panning each axis off screen; fractions from (2, 1), (3, 1), (3, 2), (4, 2) and (−2, 1), each under both switch settings; clear. Put screenshots beside the report. Say plainly what needs Michael's eye: the pauses, where the labels slide to, and the two methods on 2/3.
>
> Name the bench's version in its stamp, register it in `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Anything this prompt leaves open, leave open and name. Stop and report before committing.
