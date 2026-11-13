---
status: READY 13 Nov 2026. Written in a Claude chat for Claude Code.
role: Put the two simulation sketches on the Experiments page and push them, so Michael can send Eileen the links.
replaces: Prompt-Publish-Two-Galaxies-01.md (not run; this covers it)
related: cw-deploys/experiments/two-galaxies-meet.html, cw-deploys/experiments/the-day-the-moon-was-made.html, cw-deploys/experiments/index.html, cw-deploys/MANIFEST.md
---

# Publish two sketches under Experiments

## What exists

Two pages are on disk in `cw-deploys/experiments/`, written from a chat. Check each
sha256 first. If either differs, stop and say so.

- `two-galaxies-meet.html`
  `64fb91d094a67da962d4c5ef594aa43451795a0e60198a00441a358153dec4ac`
- `the-day-the-moon-was-made.html`
  `68015ca3c68cf9d10b5056d9468882f92c2cae8416a02710b4a8d19d1057130e`

Both are quick sketches Michael wants to show Eileen. Each is one file, plain canvas,
no shared scripts, no three.js. They are not built to `Standard-Interactives.md` and
are not meant to be yet.

## What to do

1. Do not change how either page behaves or looks. You may add the usual stamp if the
   other experiments carry one where a reader can see it; nothing else.
2. Add two items to `experiments/index.html`, newest at the top (the Moon first), in
   the page's own form:

   **The day the Moon was made** (`the-day-the-moon-was-made.html`)
   - desc: *A small planet strikes the young Earth and some of the spray stays in orbit.
     Change the small planet's size and how glancing the blow is, and see how big a
     piece ends up circling the Earth.*
   - note: *A sketch from a chat, 13 Nov 2026. Every lump pulls on every other. It is a
     flat slice of about 800 lumps, so the two sizes are right and the numbers are not
     to be quoted; the page says so. Not built to the interactives standard.*
   - meta: added 2026-11-13

   **Two galaxies meet** (`two-galaxies-meet.html`)
   - desc: *Two galaxies of stars swing past each other and, if you let them, join.
     One finger turns the view, pinch zooms. Try making the stars circle against the visitor.*
   - note: *A sketch from a chat, 12 Nov 2026. The stars feel the two centres but not each
     other, and the slowing that lets the galaxies join is put in by hand; the page says so.
     Not built to the interactives standard.*
   - meta: added 2026-11-12

3. Add the entries to `MANIFEST.md` in its usual form, and to `00-BOARD.md` if the rule applies.
4. Run `check-deploys`.
5. Open each page in the pane at 1,024 x 768 and 768 x 1,024 and say what you see.
   Galaxies: do the tails form, do the two join, do the buttons and sliders work.
   Moon: do the two bodies and their labels show, does the crash throw a spray, does
   the line at the top right report a piece in orbit, does it run smoothly.
   Take one picture of each for the report.

## Open items, not to be invented

- Whether either should later be rebuilt to the standard.
- Changes Michael has talked about for the Moon page (heavy iron, an energy tally,
  the length of the day). None of them is in this step.

## Stop

Report before any commit. Then, on Michael's word, commit and push, this session's
hunks only, and give him the two addresses on curiouswoods.org to send.
