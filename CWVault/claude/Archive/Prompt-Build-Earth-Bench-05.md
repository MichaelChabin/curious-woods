---
status: Built 28 Oct 2026 (night) on b1a514c with 04d's items and 04e folded in; reported in Report-Earth-3D-Bench-05.md; committed and pushed in the same session, as the prompt asked.
role: The Earth all the way in: the map's detail laid on the ball as she zooms, a sharper photograph, the marks and labels on the ball. And a bigger Earth on the bench, with the old globe behind a word.
related: Spec-Earth-3D.md (Close in, and flat), Report-Earth-3D-Bench-04c.md, Prompt-Revise-Earth-Bench-04d.md, Audit-Earth-3D.md (sections 6, 9 and 11), Spec-Maps.md (The world that moves), Standard-Interactives.md
---

# Prompt: the Earth, fifth bench: close in

> **First, three checks.**
> - Read `CWVault/claude/Spec-Earth-3D.md`. Under *The ground* it should say *the land-only Blue Marble, over CW's own sea, at every age*. If it doesn't, stop and tell Michael. Don't write the spec yourself, and don't stash, restore or check out anything under `CWVault/`.
> - If `CWVault/claude/Report-Earth-3D-Bench-04d.md` doesn't exist, `Prompt-Revise-Earth-Bench-04d.md` hasn't run: do its two items first, in this session (the fine slider as a 3-million-year window around the main slider's age; *land lighter* defaulting to 100, its range to 200), and report them with the rest.
> - `Prompt-Revise-Earth-Bench-04e.md` is folded into part 1 below; don't run it separately.
>
> Then read the spec's *Close in, and flat* and *Getting there*, your `CWVault/claude/Report-Earth-3D-Bench-04c.md`, `CWVault/claude/Audit-Earth-3D.md` sections 6, 9 and 11, and `CWVault/claude/Spec-Maps.md`, *The world that moves*. In the code: `cw-deploys/js/map.js`, its header and the tiles, the view, the placer and its weights, and the halo; `art/maps/world-pyramid.json` (six levels of 512-pixel tiles, with the ice and shelf layers and the floor data); and `cw-deploys/js/3d/earth.js` as it stands. Read them; don't infer them. Where this prompt and the spec disagree, the spec wins.
>
> This is step 5 of the spec's *Getting there*, on the same bench, `experiments/earth-3d.html`. Nothing a child can see changes: `globe.js`, `map.js`, the Time Machine and every story stay exactly as they are.
>
> **Michael's choices for this step (28 Oct):**
> - **The probe waits** for Drain the Sea (the spec's step 9). Not in this step.
> - **A sharper photograph.** He wants to see close in at real detail, so the photograph gets NASA's finest Blue Marble.
> - **Close in on the past is still his to decide** (what it should show, and whether today's cities belong there). Build close in for every age with what each age has, as below, and leave the rest open.
>
> **1. A bigger Earth; the old globe on a word.** The bench opens with the 2D globe hidden. A word in the left column, ***old globe***, shows it beside the new one as now; the same word hides it. While hidden it keeps following the age, the seed and the turn, so it is right the moment it appears, and the comparison pictures (`cwPair`) still work. With the old globe hidden, the Earth's stage grows to about 1.8 times its present width, or as large as the window allows beside the left column, whichever is smaller; with it showing, the two return to their present size side by side. On a phone, nothing changes.
>
> **2. Pinch all the way in.** From the whole ball down to the finest level the pictures hold. The Earth still turns like a globe on a stand: north up, the tilt stopping at the poles. Close in, one finger must move the ground under the finger, so the turn slows with the zoom; say how you did it. She always looks straight down at the ground; no tilting toward the horizon (name it as open). Keep the near and far planes, and the depth, honest at every zoom: no flicker, no shimmer, no ground cut away.
>
> **3. The detail, laid on the ball.** As she zooms, the pieces of picture for what she can see arrive at the level the screen needs, each laid on its own small patch of the ball, and are dropped when they leave the view. Until a piece arrives, the coarser picture below shows, so there are never holes; a piece that arrives fades in rather than popping. Keep a limit on how many are held, and say what it is.
>
> - **The photograph.** Make a Blue Marble pyramid in the same tiling as `world-pyramid.json`, from NASA's finest Blue Marble: Next Generation (July 2004, land only, about 500 metres a pixel, published in pieces). Go one level deeper than the map's pyramid if the source supports it, and say so. WebP, in `art/globe/tiles/`; the source once into `_data/`, never committed. Report the sizes level by level, and what a phone and an iPad would load for a typical close view. Quote NASA's terms. *land lighter* applies to the tiles exactly as to the ball.
> - **The old ground.** *old ground* uses the map's own pyramid tiles, as they are.
> - **What depends on height** reads the detail too: what a lowered sea uncovers (the shelf and floor data at the finer levels), the ICE-6G ice, today's coast. At 21,000 years, close in on the North Sea, the shelf's edge should be as sharp as the map's.
> - **The paint.** Past the seam the photograph is gone and the paint has no fine detail; close in shows the paint at the ball's own resolution, with the rock grain. Don't invent detail for it. This side of the seam the photograph fades into the paint as now, at every zoom.
> - **The pieces.** The tiles are today's picture, and the pieces carry today's picture on their plates. Make the tiles ride the pieces exactly as the ball's picture does, so close in and far out never disagree. If that is hard past the seam, say so; it can wait for Michael's decision about the past.
>
> **4. Marks and labels on the ball.** The dozen cities, and the map's own places with their weights, placed on the ball by projection with the map's rules: the same placer, heavier marks first, labels fixed in screen pixels with the halo, nothing jittering under her finger during a gesture and placed afresh when it ends, the far side hidden. More places appear as she zooms, as on the map. Names in vermilion are where *no red on the earth* is tested hardest against the photograph: take pictures over the Sahara and over Australia, and name what you see.
>
> **5. Seams and poles, close in.** Where pieces meet, and at the poles, look hard at full zoom. Report what shows and what you did.
>
> **6. Tiers.** Per the standard: the deepest level she can reach drops with the tier (the audit suggests 5, 4, 3, plus your new level at full if you make one). The kept picture is always at full. Watch memory on the iPad's budget (the audit's 1 GB).
>
> **Check before reporting**, on the Mac in the pane, at a laptop-sized window and a large one: the page opening with the Earth large and the old globe hidden; *old globe* on and off. Then close views on Blue Marble at today: the Alps; Provence round Arles; the Nile delta; Hawaii; Japan; the South Pole. At 21,000 years: the North Sea and the Bering land bridge. At 250 million years: one close view, to show what the past looks like close in. For two of today's views (the Alps, Provence), a picture of the map at the same place and scale beside the Earth's, so Michael can compare the two. The frame rate while zooming in and out at full tier; how long the first close view takes to fill, cold; how many tiles and how much memory it holds at the deepest view. Small JPEGs beside the report. Say plainly what needs Michael's eye.
>
> **Leave open, and name:** tilting toward the horizon; what close in should show in the past, and whether today's cities belong there; the probe; contours on the ball; the story pages' maps moving onto the Earth (step 9).
>
> Name the bench's version in its stamp, register anything new in `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Confirm the Time Machine, the Sun bench and a story map open unchanged. Write the report to `CWVault/claude/Report-Earth-3D-Bench-05.md`. Stop and report. When Michael says so, commit and push.
