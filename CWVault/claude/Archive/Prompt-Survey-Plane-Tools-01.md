---
status: Michael's prompt, 9 Nov 2026, from the "Woods this week" chat. The tools half of the survey of the plane; the ideas half is Harvest-Plane-01.md. Read only on code: nothing in cw-deploys, js or the site changes, and nothing is committed.
role: Find every tool that puts 0 and 1 on a surface and measures from them, show them all on one page side by side, and report what each one actually does on the ten points where the ideas disagree.
related: Harvest-Plane-01.md (read it first), Series-Glass-Geometry.md, Spec-Glass-Shell.md, Inventory-Glass-Stories.md, Audit-Glass-Geometry-Oct23.md
updated: 2026-11-09
---

# Survey: every tool on the plane, side by side

Read `claude/Harvest-Plane-01.md` first, whole. It holds two years of ideas about the plane where 0 and 1 go down first, grouped into ten panels (Glass, Frame, Rectangle, Square, Finer, Ray, Light up, Powers, Measure, Walk). It ends with ten places where those ideas disagree. This survey is the other half: what the code really does. Michael means to rule the disagreements with both halves in front of him, and then build one lab whose panels open with single words under *How this works*.

**Read only.** Don't change any file in `cw-deploys/`, `js/` or anywhere else, and don't commit or push. Everything this step makes is new files in `CWVault/claude/`, under new names. If running a page needs a local server, run one; change nothing to make a page run.

## What to look at

Every page or sketch that draws on a plane with 0 and 1, built, retired or sketched. At least these; search for more (by name and through git history) and say what you found:

- **Live:** `active/geo-1-glass-circles.html` (the theophilus board, Glass 900 years ago), `active/glass-geometry.html` (the euclid board), `active/glass-multiplication.html` (archived 22 Oct but still up).
- **Benches:** `experiments/geo-2-glass-wright-window.html`, `same-glass-bench.html` (How many ways to make 9), `construct-coordinates.html` and `-v2.html`, `fog-map.html`, `glass-module-bench.html`, `clinks-triangular.html`, `bead-string.html`, `pi-beads.html`.
- **Sketches:** `CWVault/claude/Sketch-Powers-in-Glass-01.html` to `-06.html` (look at `-06`; note only what changed across the six).
- **Retired:** `outdated-files/geometry-v1-20260325.html`, `outdated-files/glass-multiplication.html`, `outdated-files/join-bench-2026-10-07.html`, and whatever in `outdated-files/experiments-retired-2026-10-16/` and `outdated-files/glass-lines-retired-2026-10-24/` is on the plane.
- **Older, outside the repo:** `_msc/_mscVault/z_archive/coordinate-plane-control-panel_4.html` and `keypad_multiplication_4.html` (read only; don't copy them anywhere). `_CW/artifacts/continued-fraction-coordinates.tsx`, `continued-fraction-rectangle.tsx`, the three `random-walk-*.html`, and the two `planetary-scale-*.html`.
- **By name, if they exist anywhere:** `number-theory-v1.html`, a multiply bench, `multiplication-division-prototype`, `pi-counter-glass.html`, `bead-counter.html`.
- **The engines:** `js/plane.js`, `js/glass.js`, `js/boards/`, `js/cw-number.js`. Say which pages use which, and which have their own drawing code.

Leave out the Time Lab, maps and globes, the 3D benches, Sound, and the stories that have no board.

## The page: all of them together

Michael wants to see them all at once. Make one page, `CWVault/claude/Survey-Plane-Tools-01/index.html`, that opens on the Mac by double-click with no server:

- One card per tool, in a grid, all the pictures the same size. Group the cards by the harvest's ten panels; a tool that serves several goes under its main one and is named under the others.
- Two pictures per tool, taken at 1,024 × 768: as it opens, and in use, showing the one thing it does best (a rose coloured, a rectangle dragged, the 9s at tenths, the powers painted). For a retired tool, one picture is enough.
- Under the pictures: its name, its file, its state (*live*, *bench*, *sketch*, *retired*, *outside the repo*), its engine, and one line on what she does there.
- For any tool the site serves, a link that opens it at curiouswoods.org.
- Plain, quiet styling in the house manner: parchment, Georgia, no decoration. The pictures do the work.

Put the pictures in `CWVault/claude/Survey-Plane-Tools-01/pictures/`, named by tool and state.

## The report

`CWVault/claude/Report-Survey-Plane-Tools-01.md`. For each tool, a short entry with:

- what is at 0 and what is 1; where 0 sits on the screen as it opens; how far the plane goes;
- what she can make there (points, lines, circles, rectangles, rays, powers, tiles…) and the gestures that make them;
- what the screen tells her back (numbers on the axes, areas, fractions, counts);
- the words in its column or under *How this works*, exactly as they appear.

Then **one table**: the tools down the side, the harvest's ten disagreements across the top, and in each cell what that tool actually does. Plain words in the cells, short.

1. **Negatives.** Does a minus sign ever appear on screen (an axis label, a readout, an exponent)? Say exactly where and how to make it appear. Does the code use signed coordinates even when the screen shows none?
2. **Where 0 sits** as the page opens.
3. **Earned or given.** Are the numbers and the grid there from the start, or do they appear as she builds?
4. **Resolution and zoom.** Is there a resolution control, and does zoom change what can be made, or only how closely she looks?
5. **What colour means.** Free choice, fixed by a rule (primes, powers), or both; which palette.
6. **Came.** Lead colour and thickness; can it be coloured; can it be hidden; are outlines optional; is the glass see-through?
7. **The paper.** Background colour, exactly.
8. **Which way is up** in the code.
9. **× and =** on screen, or not.
10. **Big numbers.** How a long number or a long decimal is written (commas, spaces, tints, ellipsis).

After the table:

- **Happy accidents.** Things a tool does that no spec asked for but Michael has liked or might. Start with the ones he named on 9 Nov in Same Glass (outlines optional, see-through glass, the line through the rectangles' upper-right corners as the steps get finer) and add any you find elsewhere.
- **The same thing done differently.** Where two or more tools do one job in different ways (the colouring tap, the frame, numbering the axes, fullscreen, undo, save and share), name the ways.
- **What plane.js and glass.js already share**, and what each page still does on its own, in plain words, as a list Michael can read without code.

## Check, then stop

Before stopping, open `index.html` from Finder on the Mac and check that every picture shows and every link works. Write a checksum (`shasum -a 256`) of the report and of `index.html` at the foot of the report.

Stop and report. Don't change any tool, and don't commit.
