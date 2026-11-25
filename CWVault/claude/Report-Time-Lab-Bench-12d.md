---
status: Report, 25 Nov 2026. Step 12d of the Time lab bench, built on `56264736` (step 12c, committed and live). Checked in the pane at 1,024 × 768 and 768 × 1,024 on WebGPU. Reported first, as the prompt asks; NOT committed, NOT pushed.
role: What step 12d did to `experiments/time-lab.html` and, behind a new option, to `js/3d/earth.js`; what the slashes at 262 Ma were; what the panel now does; what the check found; one question for Michael.
related: Prompt-Revise-Time-Lab-Bench-12d-01.md (Michael's prompt, as it arrived), Report-Time-Lab-Bench-12c.md (the page as it stood), Time-Lab-Bench-12d-Nov25/build-lakes.py, js/3d/earth.js
updated: 2026-11-25
---

# Report: the Time lab bench, step 12d (25 Nov 2026)

![[Time-Lab-Bench-12d-Nov25/02-262-globe-close-before.jpg]]

*262 Ma, close in, before: Lake Victoria (the blob) and Tanganyika and Malawi (the thin slashes below it), riding Africa as sea.*

![[Time-Lab-Bench-12d-Nov25/05-262-globe-close-after.jpg]]

*The same view, after: the land is whole there. The short sliver at the top is a real gap between two pieces, and stays.*

## Against Report 12c

Nothing in the prompt disagrees with what Report 12c says was built. One small thing I found on the way: step 12c changed `earth.js` but the page still asked for it as `earth.js?v=2026-11-22c`, so a browser that had the 22 Nov file kept it. The page now asks for `?v=2026-11-25b`.

## What was changed

- `cw-deploys/experiments/time-lab.html`. The stamp is `2026-11-25 5626473 · time-lab step 12d · after one sea`.
- `cw-deploys/js/3d/earth.js`, behind one new option, `closeLakes`. A page that does not name it draws as it did. The Earth bench and Ancient Seas load the new file, draw, and log no errors.
- `cw-deploys/art/globe/lakes.png` (new, 9 KB): today's lakes, 2,048 × 1,024.
- `CWVault/claude/Time-Lab-Bench-12d-Nov25/build-lakes.py`: the script that makes it.

`check-deploys` reports no error for this page. Its two errors are another session's pages under `experiments/simple_rules/`, as in 12c.

## The rulings

- **One sea stays.** Nothing changed in it.
- **The bench row is gone** from both views, and `?sea=before` with it. The Time panel's bench words are the eight rows that were there before 12c; The World's panel has no bench words at all now (`18`, `19`). Everything that made *as before* possible is still in `earth.js`, off: `shelfColour` (the page still names `#505083`), `setShelf`, `setOneSea(false)`, and step 12's grey (`seasCrust`, `?crust=grey`). `cwLab.seas.setOne(false)` still reaches it from the console, with no word on the page.
- **The sentence** is unchanged. The page's notes now call it Michael's word.
- The rest of the rulings ask for nothing to be built, and nothing was.

## 1. The slashes at 262 Ma

**What they were: today's lakes.** They were not gaps between pieces. The Earth finds water in today's picture by its colour, so a lake looks like sea. Each piece carries that picture back in time, and past the seam the water inside a piece is painted as sea. So Lake Victoria, Tanganyika and Malawi rode Africa back to 262 million years and showed in the middle of Pangaea as a blob and two slashes. The seas data (Kocsis and Scotese) has no sea at any of the three at 255, 260 or 265 Ma.

How I found it: I switched today's picture water off past the seam, and the blob and the slashes went. Switching it all off was no answer, though: it also filled the tears and the shelf, which the ruling keeps. So the fix takes the lakes only.

**What closes them.** `art/globe/lakes.png` marks today's lakes. A lake is water in today's picture where ETOPO's sea floor says "not joined to the ocean" and no ocean lies within about 60 km, so no coast is touched. The finest Blue Marble (8,192 px) is read too, because Tanganyika is only two or three cells wide at 2,048. Past the seam, on the same ramp as the shelf, the picture's water is taken out where a lake is, and the land's own paint shows there. This side of the seam nothing changes.

**Hide nothing the data says is sea.** The shallow seas still lie over a closed lake wherever Kocsis and Scotese flood it, as they do the Caspian and the Great Lakes at many ages. Hudson Bay, the Mediterranean, the Baltic, the Red Sea and the Persian Gulf are joined to the ocean, so they are not lakes, and they stay.

**The Black Sea is left out by hand.** ETOPO does not join it to the ocean, because the Bosporus is narrower than ETOPO's cells, so by the rule alone it would have closed. It is sea, so the script leaves it as it was.

**What stays, and why:**

- **One short sliver near the top of the close view** (`05`, top centre), and a few hair-thin ones like it elsewhere. These are real gaps between two pieces' outlines in the plate model, with the sea ball showing through. They were there with the picture's water switched off. Closing them would mean growing every piece, which would move every coast, so I left them.
- **The wide tears** through Pangaea are as they were: where the two plate models disagree.

**What else the fix changes,** at every age past the seam, because the same lakes ride other continents too:

- **The Great Lakes at 90 Ma** (`11`, `12`, and `16` side by side). Before, North America at 90 Ma showed today's Great Lakes as sea. Now it is land there, because Kocsis and Scotese do not flood them at 90 Ma.
- **At 480 Ma** (`07`, `08`, `15`), a few small lakes of the Canadian Shield and the Great Lakes close. **Hudson Bay is exactly as it was**, and so are the Laurentia islands.
- The Caspian, Baikal, Ladoga, Great Bear, Great Slave and many small lakes close wherever the seas data does not flood them.

Measured, before against after, in the same view: 480 Ma globe, 259 pixels differ, all at Laurentia's lakes; 480 Ma map, 9 pixels; 90 Ma globe, 556 pixels, all at the Great Lakes; 90 Ma map, 11 pixels. At iPad size, 262 Ma: the globe differs in 77 pixels, all at the rift lakes, and the map in none at that scale.

## 2. The Time view's panel

**The choice: it opens at the top of the window and is never taller than the window. What does not fit scrolls inside it.** It stands where it stood across the page, beside the column, at 8 px from the top. The close word stays put; only the words under it scroll. Nothing is cut or reworded.

- **1,024 × 768** (`17`, `18`): the panel runs from 8 to 759.5 px, with 976 px of words in a 704 px space. A real wheel scroll took it to its last line (`18`).
- **768 × 1,024** (`20`): the whole panel fits, from 8 to 1,012 px, so nothing scrolls.
- **Turning the window** with the panel open refits it.
- **On a touch screen**, a finger on the words scrolls them and no longer drags the panel, but only while they can scroll. A finger on the panel's edge, and the mouse anywhere, still move it. I checked this with made-up touch and mouse presses in the pane: the touch left the panel where it was, and the mouse moved it 40, 60. A real finger on an iPad is not tried.

## What was checked

**At 1,024 × 768.** 262 Ma before and after on the globe at the lab's distance (`01`, `04`), close in (`02`, `05`) and on the map (`03`, `06`). 480 and 90 Ma before and after, globe and map (`07` to `14`). The Time panel open and scrolled to its end (`17`, `18`). 12,000 years over Europe and 21,000 years over Europe and over the land bridge: the globe matches the live site to the pixel in all three. The console holds the version line only, through 262, 90 and 480 Ma, the map, Time and its panel. The Earth bench and Ancient Seas: they open and draw, no errors.

**At 768 × 1,024.** The arrival (`19`): 521 Ma, First trilobites selected, the ring at the middle, The World's panel with no bench row. 262 Ma before and after on the globe (`21`, `22`) and the map (`23`, `24`). 480 and 90 Ma after (`25`, `26`). The Time panel, whole (`20`).

The timeline's labels differ from the live site's at 12,000 and 21,000 years. That is not this step: another session has uncommitted edits to `stories/deep-time-events.json` in the working tree. I did not touch that file.

## Not tried

- An iPad, Safari, or the simulator: in particular a real finger scrolling the panel.
- The arrival at 1,024 × 768 has no picture. The page loads on it, at 521 Ma, as before.
- Anything moving: the pane runs frames only while it is looked at.
- WebGL.

## Needs Michael's eye

1. **The Great Lakes at 90 Ma are gone** (`16`). That is the rule working: today's lakes are not on a 90-million-year-old continent unless the seas data floods them. But it is the most visible change outside 262 Ma.
2. **Antarctica's blue ice** is a question, and I left it alone. In today's picture some of Antarctica's blue ice reads as water by its colour, so past the seam it shows as small patches of sea on Antarctica, the same fault as the lakes. The script can close those too: it is one line, taking out `LAT > SOUTH`. I kept them out because the prompt asked about Pangaea, and closing them would change Antarctica at every age. Say if they should go.
3. **The hair-thin slivers** between pieces stay. If one bothers her as much as the lakes did, say where, and I will look at that one.
