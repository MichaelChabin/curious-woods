---
status: Michael's prompt for step 12d of the Time lab bench, 25 Nov 2026, from the "Woods this week" chat. On his word of 25 Nov ("I agree with all your recommendations"), which rules step 12c and the leftover points of step 12b as the status page recommended.
role: Small fixes after step 12c, one sea. The bench row goes; the sentence stays; the thin slashes in Pangaea at 262 Ma are looked at; the Time view's panel fits the window. Nothing else changes.
related: Report-Time-Lab-Bench-12c.md (the page as it stands), Prompt-Revise-Time-Lab-Bench-12c-01.md, Report-Time-Lab-Bench-12b.md, js/3d/earth.js
updated: 2026-11-25
---

# The Time lab bench, step 12d: after one sea

`cw-deploys/experiments/time-lab.html`. Read `CWVault/00-BOARD.md` and `CWVault/claude/Report-Time-Lab-Bench-12c.md` first. If anything below disagrees with what that report says was built, stop and say so before changing anything.

Touch no shared script, with the same exception as steps 12 to 12c: what the seas need inside `js/3d/earth.js` may change behind options a page names. A page that names none must draw as it does now.

## Michael's rulings, 25 Nov

* One sea stays. The shelf and the shallow seas stay in the ocean's own colour.
* The bench row goes. Take the sea: one blue / as before out of both views, and `?sea=before` with it. Keep in `earth.js` everything that made as before possible (`shelfColour`, `setShelf`, `setOneSea(false)`, the grey of step 12), switched off, for Drain the Sea.
* The sentence stays as built (`WORDS.htwSeas`). It is now his word, not the chat's draft.
* Laurentia as islands at 480 Ma, and Hudson Bay as it falls, stay. Both are what the maps say.
* The First trilobites ring in open water, and the asteroid's at the water's edge, stay.
* The veil at 537 Ma stays; the seas go out as they always have.
* From step 12b, unchanged: the handle travels on a tap; 1.2 seconds; upright on arrival; the panel opens at once. Nothing to build.

## Two things to fix

1. The thin slashes at 262 Ma. Report 12c says a few short, straight, thin blue lines in the middle of Pangaea read as scratches (`03`, centre). Find out what they are. If they are gaps between pieces where the data has land on both sides, close them, so that the land is whole there. If any is a real seaway or a tear the data really has, leave it and say which. Show the same view before and after. Hide nothing that the data says is sea.
2. The Time view's panel is too long. It is 1,013 px tall in a window 768 tall, opens low over the mosaic, and she has to drag it up to read the end. With the row gone it loses 25 px, which is not enough. Make the whole panel reachable without dragging, at 1,024 × 768 and at 768 × 1,024: for example, open it at the top of the window and let it scroll inside itself. Do not cut or reword any of its sentences. Say what you chose.

## Check, then stop

On the Mac at 1,024 × 768 and at iPad size (768 × 1,024): 262 Ma on the globe and the map, before and after; 480 and 90 Ma, to show nothing else changed; the Time view's panel at both sizes, scrolled to its end; the arrival on First trilobites; 12,000 and 21,000 years against the live site. A clean console.

Write `CWVault/claude/Report-Time-Lab-Bench-12d.md`, with pictures in a folder beside it. Update the board and MANIFEST in the same commit.

Before committing, run `git status` and make sure the index holds only this step's files. Another session's staged work went out inside the wrong commit on 23 Nov (`f986e3a1`). Commit by naming your paths. Report first; commit and push only on Michael's word.
