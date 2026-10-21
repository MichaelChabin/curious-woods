---
status: Prompt, 21 Oct 2026 — the brief for the earliest continents, the one piece the audit's order of work left for later (its §8; Michael's "Coming later" of 19 Oct; his ruling 4 of 19 Oct). Written by the audit session for the session that builds it.
role: What to build, in what order, how to check it, and how to record it.
---

# Prompt: the earliest continents, believable

Build the look and the motion of the guessed and invented continents in `cw-deploys/js/globe.js` for the Time Machine, `cw-deploys/active/time-machine.html`.

## Read first

`CLAUDE.md` and the four pages it names; `CWVault/00-BOARD.md`, whose timeline thread has an entry for each round of 19 to 21 October 2026 and says what the engine is now; `CWVault/claude/Audit-Timeline-Graphics-Oct19.md`, §8 (*The earliest continents*); Michael's "Coming later" at the foot of `CWVault/claude/Prompt-Audit-Timeline-Graphics.md`; and his rulings of 19 October in `CWVault/claude/Rulings-Sept-2026.md` under *Timeline graphics*, ruling 4 in particular (the land before about 2,400 million years is dark grey to near-black crust, with texture). The engine's own header in `globe.js` says how the five grades of knowing are drawn and what changed on each day.

## What the pieces are now

Past the model's reach (1,000 million years) the engine draws the **guessed** grade: the real cratons, which still exist, placed by the model's last position plus a steady drift from a seed (`guessedMatrix`), filled pale with a dashed edge, a darker "island" inside for the share that stood above the sea. Before the oldest rock (4,000 to 4,400 million years) it draws the **invented** grade: blobs made from the crust curve (`makeBlobs`), pale with a dotted edge. Both are flat fills with no texture, angular, and no piece knows where another is. The ruling is that they should be believable, not realistic.

## Build, in this order, each its own commit, checked before the next

1. **The look.** Dark grey to near-black crust with texture for both grades, from the rock grain (`tex['rock-grain']`), in place of the pale fills; the island a touch lighter; a semi-transparent continental shelf round each piece, so the edges read as submerged (each piece's outline drawn a little enlarged, translucent, under it). Every colour goes into `cw-deploys/js/cw-style.js` by its role; nothing hard-coded. The grade sentences under the map (`GRADE_WORDS` for guessed and invented) must stay honest about what is known.
2. **The outlines.** Rounded and natural: the invented blobs with a smoother wobble, the cratons' outlines softened a little before tracing, so nothing reads as angular.
3. **The motion.** The pieces never pass through each other: they collide, stick together, and break apart again. Replace the steady drift with a stepped motion model run from the seed, so that *another guess* and a replay give the same world every time, with contact between pieces, joined without a jump to the real positions at the model's reach; cache the positions per age step so that scrubbing the year is not a simulation on every frame. This is the hard part and may take more than one round.

## How to check

Load the page from the local server with a fresh query on the address each time (`?fresh=N`); the browser pane may be hidden, so check by running JavaScript and sampling the canvas rather than by screenshots (`window.__timeMachine` gives the bar, the map and the year; `map.deepInstances()` the two views; `skinMs()` the cost of a frame). Look at 1,500 and 4,200 million years on the flat deep map and the globe; the Earth line must be open to reach them (`bar.open([])`, then `bar.setYear(1500)`). Michael looks at the live site on the iPad after each push.

## How to record

`cw-deploys/MANIFEST.md` and `CWVault/00-BOARD.md` in the same commit as the files; bump the `?v=` query of `globe.js` (and `cw-style.js` when it changes) on the two pages that load them, the Time Machine and `cw-deploys/experiments/maps/drain-the-sea-bench.html`, with their `CW_VERSION` stamps; run `tools/check-deploys.sh` before each commit. Commit locally; push only on Michael's word. Another session may hold uncommitted work in the same checkout: stage only your own hunks of `MANIFEST.md` and `CWVault/claude/Ideas-Ledger.md` (build the staged version from `git show HEAD:` plus your insertion, and `git update-index --cacheinfo`).

## Done

At 1,500 and 4,200 million years, on the flat deep map and the globe, the land is dark textured crust with submerged shelves and rounded edges, the pieces drift without overlapping, and Michael has looked at it on the iPad.
