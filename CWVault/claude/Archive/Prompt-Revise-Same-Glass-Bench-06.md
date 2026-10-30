---
status: Ready to paste, 15 Oct 2026. Can go with revisions 4 and 5 or after them.
role: Claude Code prompt revising cw-deploys/experiments/same-glass-bench.html. Builds on the build prompt and revisions 01 to 05; where they disagree, this one wins.
---

# Prompt: Same-glass bench, revision 6

Revise `cw-deploys/experiments/same-glass-bench.html`. Same rules as before. Report what you changed and anything you had to choose yourself.

## How many ways: counts in the key

Each row of the key (colour dot, line, fraction) gets a number to its right: **how many ways** that resolution has found for the number, meaning how many exact stops it has laid down. Below the rows, a line: **Total: 12 ways**.

**The total counts points, not rows.** Many stops belong to more than one resolution (1 × 2 is a whole-metre stop, a halves stop and a tenths stop), so the total counts each distinct corner once. Halves (4) and thirds (6) together make 8, not 10, because they share 2 × 1 and 1 × 2.

**Hiding recounts.** When she turns a row's dot off, that row's number stays (dimmed), and the total is recounted from the rows still showing. So she can show just halves and thirds, or just thirds and fifths, and see how many corners they share.

**Counts update live** as a sweep lays stops down, and *Clear* resets them.

**Which number the counts belong to.** With one number on the plane, the counts are for that number. With more than one, they are for the **selected** number: tapping a number's readout selects it (a quiet underline is enough; Michael to rule). Name what you chose in the report.

Expected values for 2, each resolution swept over its whole range: whole metres 2, halves 4, thirds 6, quarters 6, fifths 6, sixths 12, sevenths 6, eighths 8, ninths 10, tenths 12, hundredths 30, thousandths 56. Halves and thirds shown together: total 8. All of whole metres through tenths shown: check by counting distinct corners.

## Instructions

Add one line:

- The numbers in the key count the ways. Turn a dot off to count without it.
