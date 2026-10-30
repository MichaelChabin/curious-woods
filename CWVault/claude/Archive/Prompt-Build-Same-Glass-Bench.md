---
status: Ready to paste, 15 Oct 2026. Items marked "Michael to rule" are Claude's guesses, which Michael agreed to try; the bench should make each one easy to see and change.
role: Claude Code prompt for a bench where a child makes a number as a rectangle, holds its area, and sweeps the corner to find every exact way to make it, at resolutions she chooses. Story working title: "How Many Ways to Make 9." Grid lab, rectangles level. Intuition #11.
related: claude/Prompt-Glass-Grid-Bench.md, claude/Worknote-Glass-Grid-24Sept.md, claude/Rectangle-Tool-worknote.md, claude/Map-Tool-Roadmap.md (act 2, "Reshape it", and act 4, "Cut finer")
---

# Prompt: Same-glass bench (working name)

Read `CWVault/00-WHAT-CW-IS.md`, then `cw-deploys/MANIFEST.md` (Page standard), then `CWVault/claude/Rulings-Sept-2026.md`. Then study Glass Geometry (`cw-deploys/active/glass-geometry`) for lead, glass fill, palette, pan and zoom, and the Glass grid bench (`cw-deploys/experiments/glass-grid-bench.html`, if built) for rectangles dragged on a grid. Name the files you used in your report.

**Read shared code; don't change it.** Use `js/plane.js` if it exists, but don't edit it, Glass Geometry, the grid bench or the multiplication lab. If the bench needs something they don't offer, put it in the bench and name it in the report.

**Gestures:** where this prompt is silent, do what Glass Geometry does; if it has no answer, do what the multiplication lab does. Only if neither answers, choose the simplest thing and name it in the report.

Build a bench, not a story page, at `cw-deploys/experiments/same-glass-bench.html`. Nothing is scored, counted for her, or congratulated.

## The idea in one paragraph

She makes a number as a rectangle of glass. She holds the area. Then she drags the corner from right to left, and the corner can stop only where the area is *exactly* that number at the resolution she has chosen. Each stop she keeps stays behind as lead. The overlapping rectangles cut each other into panes, which she can colour. The window that results is a record of every exact way to make the number. At finer resolutions there are more stops, but far fewer than she expects: between 1 m and 9 m wide, 9 has 3 exact stops in whole metres, 13 in tenths, 21 in hundredths, 29 in thousandths. The curve never fills in. That surprise is the point of the bench.

## The plane

As in the grid bench: y up, faint grid lines, the unit is a metre, 0 and 1 marked. Grid lines never divide glass. All arithmetic in exact fractions, never floating point.

## 1. Make a number

She presses inside the unit square at the origin ("the 1") and drags. A rectangle anchored at the origin follows, its corner snapping at the current resolution. Live readout: width × height = area. Dragging on empty space pans, as in Glass Geometry.

Any number she can make is allowed: 9 by 9 × 1 or 3 × 3, 7 only as a strip, 4½ as 1½ × 3 at halves.

## 2. Hold it

Tapping the area readout locks the area. A locked readout looks locked (Michael to rule on how). Tapping it again unlocks it.

On locking, the rectangle **reshapes smoothly into the widest stop** (N × the resolution's smallest height: 9 × 1 at whole metres, 18 × ½ at halves) while the view glides out to keep it in sight. She watches the same glass stretch into a strip. Her starting rectangle is not kept.

## 3. Sweep

With the area held, she drags the corner. It moves along xy = N (draw that path only as the corner's motion, never as a drawn curve) and **can stop only at exact stops**: points where both width and height are multiples of the current resolution and width × height = N exactly.

While she drags, the view follows the corner smoothly, zooming as needed so the whole rectangle stays visible. On release it settles to a comfortable zoom around the corner. **If she pinches or pans herself, her view wins until she lets go.**

## 4. Keep

Each exact stop shows a faint outline as she passes. Tapping the corner at a stop keeps that rectangle as lead (Michael to rule). Kept rectangles overlap and cut each other into panes, as in the grid bench. Colouring works as in Glass Geometry; colouring and measuring are separate taps.

## 5. The resolution dial

In the left column, a horizontal dial showing three resolutions: the current one in the middle, larger, with its neighbours smaller on either side. Arrows on both ends, and she can swipe the dial. **A touch that moves more than a few pixels is a swipe; otherwise it's a tap.** Tapping a neighbour selects it.

The sequence: 1, ½, ⅓, ¼, ⅕, ⅙, ⅐, ⅛, ⅑, ⅒, 1/100, 1/1000, 1/10000 (Michael to rule on the end).

**Each position is drawn as a tiny bar cut into that many pieces**, with its fraction beneath. At fine resolutions the cuts run together into grey, which is correct: it's the pixel limit, shown honestly.

**A resolution finer than one pixel at the current zoom is dimmed.** It lights up again when she zooms in. She can still choose a dimmed one; its stops exist even where she can't see them.

**Changing resolution while the area is held** moves the corner to the widest stop at the new resolution, and the view glides out to show it (Michael to rule).

Keep the dial in its own module. It will become a general tool for every plane and grid in CW, where it sets snap spacing, faint grid spacing, and readout denominators — nothing more.

## 6. The key

Also in the left column, below the dial. It starts empty and **lists only the resolutions she has actually used**, each with its own lead colour and a dot. Tapping a dot shows or hides that resolution's gridlines **and the rectangles kept at it** (Michael to rule; in general tools the dot will mean gridlines only).

Every kept rectangle remembers the resolution it was made at.

## 7. Two numbers at once

She can unlock, make another number, and lock it. Each held number has its own corner and its own lead colour (Michael to rule). The test case: 9 and 10. Their exact stops can never coincide, because one corner can't make two areas. Near the far right the two paths come within a pixel of each other; zooming in separates them again.

## 8. Readouts

Fractions or decimals are hers: tapping a number switches, and her choice holds (already ruled). 4½ and 4.5 both apply here.

## Not in this bench

- **The pixel ruler** (lines 1, 10, 50, 100, 500 pixels long, for her to measure on her own screen). Its own small bench later.
- **Named physical scales** below the pixel (machine shop, cells, chip features, atoms). Later, possibly as dial positions with names.
- **Rounding mode** (stops where the area *rounds* to N). Exact first.
- Moving the dial or key into a pop-out panel like Glass Geometry's colour panel.

## Report

Name the files you read and used; anything you had to add because shared code lacked it; every gesture you chose yourself; and, for each "Michael to rule" item, what you built so he can judge it on the iPad.
