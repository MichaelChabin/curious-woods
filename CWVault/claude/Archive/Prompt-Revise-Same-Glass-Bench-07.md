---
status: Ready to paste, 16 Oct 2026. Items 1 and 3 are trials; make their constants easy to change.
role: Claude Code prompt revising cw-deploys/experiments/same-glass-bench.html. Builds on the build prompt and revisions 01 to 06; where they disagree, this one wins.
---

# Prompt: Same-glass bench, revision 7

Revise `cw-deploys/experiments/same-glass-bench.html`. Same rules as before. Report what you changed and anything you had to choose yourself.

## 1. Trial: *Every cut*

A new word in the left column, ***Every cut***. Tapping it sweeps **every cut from whole metres up to the one on the dial**, one after another: with the dial at ⅒, it sweeps whole metres, halves, thirds … tenths; at 1/100, every cut from 1 to 100. Each corner is laid down once, however many cuts share it.

For checking, for 2: every cut up to 10 gives 32 distinct corners; up to 30, 122; up to 100, 498 (117 of them between ¼ m and 4 m wide).

The key shows the whole run as **one row**, "every cut to 100", with its own colour and count, instead of a hundred rows. Labels follow the existing overlap rule, so most will be hidden until she zooms; that's expected. *Glass used* and the counts include these corners as usual.

Draw efficiently: several hundred rectangles must stay smooth to pan and zoom on an iPad. If they can't, say so in the report rather than quietly capping the number.

## 2. Pace depends on how many

Replace the fixed delay between rectangles with a pace that depends on how many the sweep will lay down. Aim for a whole sweep to take about **3 seconds** (named constant), whatever its size:

- delay per rectangle = 3 s ÷ the number of rectangles,
- but never longer than **0.5 s** (so 2 at whole metres doesn't crawl) and never shorter than **15 ms** (so a very large sweep takes longer than 3 s rather than flashing by).

All three numbers are named constants.

## 3. Trial: sound

A quiet sound as each rectangle is laid down. Not a reward and not a signal; just the sound of glass being set.

- **When the pace is slow** (delay above about 80 ms), each rectangle makes one very soft, short tick: a burst of filtered noise about 20 ms long, low in volume, with no musical pitch.
- **When the pace is fast**, the ticks would run together, so instead play a **soft shush**: continuous filtered noise whose loudness follows how fast rectangles are arriving. It swells gently as a large sweep gets going and fades out over about half a second when the sweep ends.
- Volume stays low throughout. Nothing chimes, nothing rises in pitch, nothing marks the end of a sweep.

Use the Web Audio API, generating the sound in the page (no audio files). On iPad, audio can only start after a tap; start it on her first tap anywhere.

A word in the left column, ***Sound***, turns it off and on. On by default (Michael to rule). Her choice holds for the visit.

## 4. Instructions

Add two lines:

- Tap *Every cut* to sweep every cut up to the one on the dial.
- Tap *Sound* to turn the sound off or on.
