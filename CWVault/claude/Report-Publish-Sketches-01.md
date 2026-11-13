---
status: Report, 12 Nov 2026 (evening, Mountain time; the prompt's 13 Nov is the chat's date). Built on `47fb78b9`. Checked in the pane at 1,024 × 768 and 768 × 1,024; not on an iPad. Reported first, as the prompt asks; then committed and pushed on Michael's word, "Commit and push", `a796b122`, this session's hunks only.
role: What publishing the two simulation sketches under Experiments did, what the pane showed, and what needs Michael's eye.
related: Prompt-Publish-Sketches-01.md, Prompt-Publish-Two-Galaxies-01.md (not run; covered by this one), cw-deploys/experiments/two-galaxies-meet.html, cw-deploys/experiments/the-day-the-moon-was-made.html, cw-deploys/experiments/index.html, cw-deploys/MANIFEST.md
---

# Report: two sketches under Experiments (12 Nov 2026)

## What was on disk

Both pages matched the prompt's sha256 before anything was touched:

- `two-galaxies-meet.html` — `64fb91d0…53dec4ac`
- `the-day-the-moon-was-made.html` — `68015ca3…1d1057130e`

## What changed

- **Both pages: the stamp, nothing else.** Two lines at the top of each page's one script, the form
  `time-passing-bench.html` uses: `const CW_VERSION = '2026-11-12 47fb78b · a sketch from a chat'` and a
  `console.log` of it. It is in the console, as on every other experiment; a reader does not see it. Without it
  `check-deploys` errors (`no-stamp`) and the pre-commit hook refuses the pages. New hashes:
  galaxies `86911a5d…156bd8a3`, Moon `858792a3…c055750e`. A diff against the prompt's files is the two
  lines in each and nothing else.
- **No tab icon was added.** The page standard asks for one; the check does not insist on it under
  `experiments/`, and the prompt said *nothing else*. Michael's call (below).
- **`experiments/index.html`:** the two items at the top, the Moon first, in the page's own form, the words as the
  prompt gives them. The clear-out's uncommitted hunks in that file are left alone.
- **MANIFEST and the board:** an entry each.

`check-deploys` on the two pages: no errors. Console on both: the stamp line, nothing else.

## What the pane showed

The pane draws frames only while it is being looked at, so for each run the page's loop was put on timers
(`requestAnimationFrame` → `setTimeout` 16 ms) in the pane only; nothing in the files.

**Two galaxies meet.**
- *Tails:* yes. By 430 million years both have thrown long curved tails and a bridge between them; picture 01,
  1,024 × 768 at 620 million years, shows the yellow galaxy with a tail swept over it and the blue one with a long
  tail trailing to the left edge.
- *Join:* yes. They close by about 820 million years and are one round, bright ball by 1,530.
- *Buttons:* *Start again* restarts at 0. *Pause* holds the clock (1,790 stayed 1,790) and becomes *Go on*.
  *Stars circle with the visitor* ↔ *against*, and *They join* ↔ *They pass* (the note under the sky changes with
  it, to "Real galaxies would also slow down and join"). With *against* and *pass*, the two discs swing past each
  other whole with almost no tails — which is what counter-rotating discs do, and the point of the prompt's
  "try making the stars circle against the visitor".
- *Sliders:* both restart the run on release (the clock goes back to 0 on the next frame); a heavy visitor
  (0.9) visibly distorts the yellow galaxy more.
- *Gestures:* a drag turns the view, the wheel zooms.
- *768 × 1,024:* the page opens with the two galaxies one above the other, and the run reads the same. The
  controls wrap to two rows; on the second, *How near they pass* stretches across the full width — it works,
  it just looks unlike its neighbour. No sideways scroll.

**The day the Moon was made.**
- *Bodies and labels:* yes — *the young Earth* and *Theia, about as big as Mars* over the two hexagonal bodies,
  their cores darker. At 768 × 1,024 Theia sits below the Earth instead of to its right; the labels still clear
  both bodies.
- *Spray:* yes. At impact the rim glows white-hot to orange and a stream of hot lumps leaves the far side;
  picture 02, 768 × 1,024 at 8 hours, shows the glowing Earth and a clump in orbit to its left.
- *The line at the top right:* yes, from the first measurement after the hit — "Biggest piece circling the Earth:
  1.7 Moons" at 2 hours, 1.2–1.3 Moons by 4–11 hours at the defaults. A near head-on blow (the slider at 0.1)
  gives 0.1 Moons, which is the right direction.
- *Pause, Colours:* *Pause* holds the clock and becomes *Go on*; *Colours show heat* ↔ *Colours show where it
  came from* (the Earth blue-grey, Theia tan).
- *Smoothly:* **not answerable in the pane**, which runs no real frames. What can be said: one step of the
  physics costs 0.78 ms on this Mac at the defaults (776 lumps), and the page takes up to five steps a frame
  but stops at 9 ms, so a slower device should run the impact more slowly rather than in jerks. Not tried on
  the iPad simulator or a real iPad.

## For Michael's eye

1. **Tab icon.** Neither page has one, so Safari shows a blank tab. The usual answer would be a file in
   `art/icons/`; there is no galaxy or Moon icon there. Leave it, or name one to use.
2. **"About 800 lumps" against "a few hundred".** The index note (your words) says about 800, and the count at the
   defaults is 776; the page's own note under the sky says "a few hundred lumps". Not changed, since the prompt
   says not to touch the page.
3. **The dates.** The index says the Moon was added 2026-11-13; on this Mac it is still the evening of 12 Nov
   (MST). Left as the prompt wrote it.

## On your word

Commit this session's hunks only (the two pages, the index's two items, MANIFEST's entries, the board's line,
this report, the two pictures, the two prompts), then push. The addresses to send Eileen:

- https://curiouswoods.org/experiments/two-galaxies-meet.html
- https://curiouswoods.org/experiments/the-day-the-moon-was-made.html
