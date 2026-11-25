---
status: READY 19 Nov 2026. Written in the "time lab handoff" chat for Claude Code, on Michael's word ("Please do").
role: Commit and push the ancient-seas bench as the survey left it, so Michael can watch the journey on his iPad from curiouswoods.org. Find out why the Time lab's Earth is blank.
related: Report-Survey-Ancient-Seas-01.md, Prompt-Survey-Ancient-Seas-and-Finds-01.md, cw-deploys/experiments/ancient-seas.html, cw-deploys/experiments/time-lab.html
updated: 2026-11-19
---

# Publish the ancient-seas bench, and one blank Earth

## Why

The survey's bench has never been seen on an iPad, and the journey from 69 Ma to now has
never been watched at its own speed. Michael wants to see it from the site, not from disk.

## First: a blank Earth

On Michael's Mac, 19 Nov, just after a macOS update, `experiments/ancient-seas.html` at
262 Ma shows Scotese and Wright's Earth correctly on the left. The Time lab's Earth on the
right is a plain blue ball with no land. The *New Mexico* ring and name are drawn. Your own
picture `01-262-heights.jpg` shows land there, so it worked on 18 Nov. Michael also reports
that "nothing is showing" on the Time lab bench itself.

1. Open `experiments/time-lab.html` and `experiments/ancient-seas.html` in a fresh tab.
   Say what each Earth shows, and what the console says.
2. If the Time lab's Earth is blank, find the cause before anything is pushed. Say whether
   it is the page, the data, WebGPU after the update, or the way the page was opened.
3. If the fix is small and inside `ancient-seas.html`, make it. If it touches
   `time-lab.html` or a shared script, stop and report first.
4. If both Earths draw for you and you cannot make it fail, say so and go on.

## Then: publish

1. Change nothing in how the bench looks or behaves, beyond a fix from the step above.
2. Commit this survey's files only:
   - `cw-deploys/experiments/ancient-seas.html`
   - `cw-deploys/experiments/ancient-seas/` (the pictures, `coasts.json`, `trex.json`)
   - the survey's own lines in `cw-deploys/MANIFEST.md`, `cw-deploys/experiments/index.html`
     and `CWVault/00-BOARD.md`
   - `CWVault/claude/Report-Survey-Ancient-Seas-01.md`, `Creature-Trex-Finds-01.md` and
     the `Ancient-Seas-Nov18/` folder
3. Other sessions have uncommitted edits in the board, the manifest and the vault
   (including many deletions under `CWVault/claude/`). Leave them alone. Commit your own
   hunks only, as step 8 did.
4. Run `tools/check-deploys.sh`.
5. Push. Michael has given his word for this push.
6. Load `https://curiouswoods.org/experiments/ancient-seas.html` once it is live and say
   what you see.

## Michael's answers to the survey's six questions

Record these in the report; build none of them in this step.

1. **Which sea:** flooded to Kocsis and Scotese's coastline. It is the widest sea of the
   age, so it will need a word of honesty where it is shown.
2. **The Delaware Basin:** left for the Carlsbad story, with a regional map of its own.
3. **Scotese's plates, 541 Ma to 2.6 Ma:** probably yes. Michael decides after he has seen
   the bench on the iPad.
4. **The Chicxulub ring at 69 Ma:** mask it.
5. **The Paleobiology Database's licence:** credit them; do not write to them.
6. **69 Ma, not 68:** fine, as long as the label says 69.

## Not in this step

The mask for the ring; the rest of the survey (the genus curve, Macrostrat, quakes and
eruptions); Scotese's plates in the Time lab; anything in `time-lab.html` beyond finding
the blank Earth.

## Report

Add a dated section at the top of `Report-Survey-Ancient-Seas-01.md`: what the blank Earth
was, what was committed, the hash, and what the live page shows. Then stop.
