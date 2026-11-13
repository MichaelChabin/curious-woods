---
status: READY 12 Nov 2026. Written in a Claude chat for Claude Code.
role: Put the galaxy sketch on the Experiments page and push it.
related: cw-deploys/experiments/two-galaxies-meet.html, cw-deploys/experiments/index.html, cw-deploys/MANIFEST.md
---

# Publish *Two galaxies meet* under Experiments

## What exists

`cw-deploys/experiments/two-galaxies-meet.html` is on disk, written from a chat on 12 Nov 2026.
Its sha256 is `64fb91d094a67da962d4c5ef594aa43451795a0e60198a00441a358153dec4ac`.
Check that first. If it differs, stop and say so.

It is a quick sketch Michael wants to show Eileen: two discs of stars, about 9,000 dots,
pulled by two heavy centres. One file, plain canvas, no shared scripts, no three.js.
It is not built to `Standard-Interactives.md` and is not meant to be yet.

## What to do

1. Do not change how the page behaves or looks. You may add the usual stamp if the
   other experiments carry one where a reader can see it; nothing else.
2. Add an item to `experiments/index.html`, newest at the top, in the page's own form:
   - title: *Two galaxies meet*
   - desc: *Two galaxies of stars swing past each other and, if you let them, join.
     One finger turns the view, pinch zooms. Try making the stars circle against the visitor.*
   - note: *A sketch from a chat, 12 Nov 2026. The stars feel the two centres but not each
     other, and the slowing that lets the galaxies join is put in by hand; the page says so.
     Not built to the interactives standard.*
   - meta: added 2026-11-12
3. Add the entry to `MANIFEST.md` in its usual form, and to `00-BOARD.md` if the rule applies.
4. Run `check-deploys`.
5. Open the page in the pane at 1,024 x 768 and 768 x 1,024. Say what you see: do the
   tails form, do the two join, do the buttons and sliders work, does the note read.
   Nobody has yet seen this page drawn, so this look matters.

## Open items, not to be invented

- Whether it should later be rebuilt to the standard (three.js, tiers, real self-gravity).
- Whether the colours should mean anything. For now they only tell the two galaxies apart.

## Stop

Report before any commit. Commit and push only on Michael's word, this session's hunks only.
