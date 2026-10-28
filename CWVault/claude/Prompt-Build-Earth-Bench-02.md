---
status: Run in Claude Code 27 Oct 2026 (afternoon); the report is Report-Earth-3D-Bench-02.md, the pictures in Earth-3D-Look-Oct27/; not committed. Step 2 of the migration in Spec-Earth-3D.md.
role: The Earth's look by age: the photograph's sea, the fade from photograph to paint, the paint by age, the islands and shelves, the deep ice, and the rim that makes it a ball.
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-01.md, Audit-Earth-3D.md (sections 1 and 5), Standard-Interactives.md
---

# Prompt: the Earth, second bench

*Michael, 27 Oct: the first bench works on the iPad, and Blue Marble looks very good. One change from the spec's order: the molten sequence moves to step 3, beside the guessed and invented ages, because the slider has to reach past 1,000 million years for any of them.*

> Read `CWVault/claude/Spec-Earth-3D.md` again (it has changed since the first bench: *Close in, and flat*, the Scotese ruling, `earth.js` on the shelf) and your own `CWVault/claude/Report-Earth-3D-Bench-01.md`. Then `CWVault/claude/Audit-Earth-3D.md`, sections 1 and 5, and in `cw-deploys/js/globe.js` the functions that make the look: `paintSkin`, `buildSeaMask`, `shrunk` and the shelf rim and drowned band, `dissolvePieces`, `paintIce` with its `ICEHOUSES` table, and the limb shading and haze. Read them; don't infer them. Where this prompt and the spec disagree, the spec wins.
>
> This is step 2 of the spec's *Getting there*, on the same bench, `experiments/earth-3d.html`, with the 2D globe still beside it. Ages stay 0 to 1,000 million years. Nothing a child can see changes; the Time Machine and every story stay as they are.
>
> **1. The photograph's sea.** Blue Marble's ocean is near-black, so the shelf each piece carries past the coast shows as a dark band that drifts with the continent and reads as night. Find the sea in the picture (both pictures: the old ground's sea too, as `buildSeaMask` does) and draw it on the pieces as the translucent shelf wash the 2D globe uses, never as the picture's own sea colour. Check it hardest on Blue Marble.
>
> **2. Photograph to paint, by 2.6 million years.** Per the spec: the photograph is true only near today. At today it is the photograph; going back, it fades gradually to paint and is gone by 2.6 million years. Never a snap. The paint should look like the same ground painted: softer, washed, the fine texture gone. Build two kinds of paint, switchable on the bench only, for Michael to choose by looking:
> - *the photograph painted*: today's picture smoothed and simplified, its colours kept;
> - *green and rock*: one quiet green with the rock grain under it, no pattern of today's deserts and forests carried back.
>
> Then the old look-by-age rule, unchanged: bare rock (the grain, grey to tan, rusty where the cooling map runs high) blending in from 300 to 450 million years, as plants go. No green before 450. The near-black crust before oxygen lies past the slider's reach and waits for step 3.
>
> **3. The islands, the shelves, the dissolves.** As the 2D globe has them: the island (the part of an old piece that stood above the sea) inside the drowned part, the translucent shelf rim round each body, the band between washed, and a piece fading into the sea over the eight million years before its birth. Same ages and strengths as `globe.js`, so the side-by-side matches.
>
> **4. The deep ice.** The cold ages of `ICEHOUSES` that fall inside 1,000 million years (the snowballs, the late Ordovician, the late Palaeozoic, the Antarctic and the last 2.6 million years), as the soft feathered overlay of ruling 3 (19 Oct): over land and sea alike, by latitude at that age, never a hard edge, bare land never on top of ice. White means ice. The ICE-6G sheets of the last 2.6 million years and the lowered sea are step 4; this is only the deep overlay.
>
> **5. The rim.** The 2D globe darkens its edge and puts a thin haze at it, blue once there is a sea. Give the ball the same, in its shader, not with `glow.js`. Quiet, per the standard: no glow beyond the rim.
>
> **6. Lit and even** stay switchable; Michael has not ruled. Make sure the rim and the paint look right in both.
>
> **7. Old ground or Blue Marble** stays a word on the bench, so both can be judged with the paint.
>
> **Check before reporting**, on the Mac in the pane: the same fifteen pairs as last time (0, 100, 250, 540, 1,000 million years, three views), plus 1, 2.6 and 450 million years at one view, on Blue Marble and on the old ground, both paints. Put the pictures beside the report. Say where the 3D and the 2D still differ and why. Say plainly what needs Michael's eye on the iPad: the fade from photograph to paint as the slider moves, the two paints, the shelf wash on Blue Marble, the ice's edge, and the rim.
>
> Name the bench's version in its stamp, register any new art in `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Confirm the Time Machine and the Sun bench open unchanged. Anything the spec leaves open, leave open and name. Stop and report before committing.
