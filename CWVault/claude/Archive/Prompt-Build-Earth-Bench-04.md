---
status: BUILT 28 Oct 2026 in Claude Code (not committed; the report Report-Earth-3D-Bench-04.md with the pictures in Earth-3D-Ground-Oct28/; Michael reads, looks on the Mac and the iPad, says commit). Was: Ready for Michael's read, 28 Oct 2026. Step 4 of the migration in Spec-Earth-3D.md. Paste the block below whole into Claude Code.
role: This side of the seam and the honesty: the ice-age sea, the ICE-6G ice, today's coasts and their word, the honest block under the stage, the kept picture. Opens with committing step 3 and Michael's ruling on the Moon's impact.
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-03.md, Audit-Earth-3D.md (sections 1, 5 and the standard's list), Standard-Interactives.md
---

# Prompt: the Earth, fourth bench

> **First, commit step 3.** Michael has looked at the third bench, on the Mac and on the iPad, and says commit. Commit it as it stands, with its report and pictures, before changing anything.
>
> **Then, Michael's rulings on step 3 (28 Oct):**
>
> - **The Moon's impact is *no flash*.** Remove *quiet brightening*, its word, `MOON_WARM` and `?impact=`; the crust sinking into the melt is the only way. Make it last about twice as long: `MOON_MELT` near six million years, about ten positions of the slider. Report the number you chose.
> - **The soft edges and the near-black crust stay as built.**
>
> Read `CWVault/claude/Spec-Earth-3D.md` (it carries these rulings now), your `CWVault/claude/Report-Earth-3D-Bench-03.md`, and `CWVault/claude/Audit-Earth-3D.md`, sections 1 and 5 and its list of what the standard asks that the globe has never done. Then, in `cw-deploys/js/globe.js`: `setGround` and what it does with the sea and the ice, `buildSeaMask`, `iceMask`, `iceReach`, `iceStrength`, `paintIce`, `prepareCoast` and `COAST`, and the seam. In `cw-deploys/js/map.js`: `setSeaLevel`, `drawSea`, the sea-level curve and `curveAt`, the ICE-6G outlines and `icePairs`, and how it hands the globe the sea and the ice. Then the shelf's `honest.js` and `still.js`. Read them; don't infer them. Where this prompt and the spec disagree, the spec wins.
>
> This is step 4 of the spec's *Getting there*, on the same bench, `experiments/earth-3d.html`, the 2D globe still beside it. Nothing a child can see changes.
>
> **1. The ice-age sea.** This side of the seam, the sea follows the sea-level curve the Time Machine uses, at the age on the slider. Lowering the sea is lowering the sea's ball, from ETOPO's heights, per the spec. Paint what a lowered sea uncovers as `globe.js` paints it now, and tell Michael how that looks beside Blue Marble: the spec says floor that comes out is grey, and the shelf at the last ice age is a look he hasn't seen on the photograph. Check it hardest at 21,000 years (the lowest sea: the Bering land bridge, the North Sea dry, Sundaland).
>
> **2. The ICE-6G ice.** The ice sheets of the last 2.6 million years from the same outlines and pairs `map.js` hands the globe, fading in and out as the 2D does. White means ice. Where the ICE-6G ice ends at the seam and the deep ice of the old ages begins, no snap.
>
> **3. The sea's colour.** The 3D's sea is lighter and flatter than the 2D's, and side by side it's the first thing one sees. Make it switchable, bench only, for Michael to choose by looking: *as now* and *the 2D's blue* (the 2D's colours and depth, but even light, no sun side). No other change to the sea.
>
> **4. Today's coasts, and their word.** This side of the seam, today's coastline is the coast itself and is always drawn, as the 2D draws it. Past the seam it is off. A word in the left column, ***today's coasts***, turns it on over the ancient ground; the same word turns it off. Carry the line the way `globe.js` carries it (read `prepareCoast`; don't assume whether it rides the plates). Thin, quiet, the 2D's colour. If the 2D draws any other modern line, report it; don't add one.
>
> **5. The honest block.** Under the 3D stage, `honest.js`'s block replaces the bench's own grade line: what the picture is, what it says (the grade's word and sentence, and the molten phase's while there is no grade), and the credit *NASA Earth Observatory* while the photograph shows at all. No scale note and no bracket: on a true ball nothing is stretched (the audit, section 5). The crust's note waits for *Cut open*.
>
> **6. The kept picture.** *Keep this picture* makes the shelf's `still.js` picture: always at full, 4,096 pixels, whatever the tier, with the honest block's lines and the credit written on it, as the standard asks. Report whether this does everything `prototypes/globe-250.html` was for; don't remove that page.
>
> **Check before reporting**, on the Mac in the pane: pairs at today, 6,000 years, 21,000, 125,000, 450,000, 1 million and 2.6 million years, one view each, plus a close view at 21,000 over the Bering Strait and one over the North Sea, on Blue Marble; *today's coasts* on and off at 250 and 3,000 million years; both sea colours at today and at 250; the impact as the slider runs 4,515 to 4,500, four pictures; three kept pictures (today, 21,000 years, 3,000 million) put beside the report with their sizes and how long each took. The frame rate during a slider drag through the last 2.6 million years, where the sea and ice change every frame. Say plainly what needs Michael's eye.
>
> Name the bench's version in its stamp, register anything new in `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Confirm the Time Machine and the Sun bench open unchanged. Anything the spec leaves open, leave open and name. Write the report to `CWVault/claude/Report-Earth-3D-Bench-04.md`. Stop and report before committing.
