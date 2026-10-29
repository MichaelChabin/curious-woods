---
status: Run 29 Oct 2026 on 53ca022; the report is Report-Earth-3D-Bench-05b.md; committed and pushed on Michael's word. (Was: ready for Michael's read, 29 Oct 2026.) A revision of the fifth Earth bench, with Michael's rulings after looking at step 5 on the Mac and the iPad. Paste the block below whole into Claude Code.
role: The lakes, today's coast, the continents held still this side of the seam, the pale wash, one list of places with a word, the land's lightness settled.
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-05.md, Prompt-Build-Earth-Bench-05.md
---

# Prompt: the Earth, fifth bench revised

> **First, check the spec.** Read `CWVault/claude/Spec-Earth-3D.md`. It should say *This side of the seam the continents stay where they are today* under *The plates*. If it doesn't, stop and tell Michael. Don't write the spec yourself, and don't stash, restore or check out anything under `CWVault/`.
>
> Then read your `CWVault/claude/Report-Earth-3D-Bench-05.md`. Same bench, `experiments/earth-3d.html`. Nothing a child can see changes. Where this prompt and the spec disagree, the spec wins.
>
> **Michael's rulings on step 5 (29 Oct):** level 6 is sharp enough on the iPad; *land lighter* at 100 is right on the iPad and the Mac.
>
> **1. Lakes keep their water.** At 13,000 years the Caspian, the Black Sea, Lake Urmia and Lake Van fill with buff speckles: the lowered sea is being applied to lakes, and the test flickers on the photograph's lake colours. A lowered sea uncovers only floor joined to the ocean, by the floor data's own rule (0 is land *or water not joined to the ocean*). Lakes stay as the picture has them, with no speckles, at every age this side of the seam. Check the Caspian, the Black Sea, Urmia, Van, the Great Lakes and Lake Victoria at today, 13,000 and 21,000 years, close in. The Black Sea is the hard case: its floor may be joined to the ocean in the data through the Bosporus. Say what you find, and don't paint it buff without telling Michael.
>
> **2. Today's coast only on its word.** Today's coastline is off at every age, this side of the seam too; ***today's coasts*** turns it on and off. At today the photograph's edge is the coast and needs no line.
>
> **3. The continents hold still this side of the seam.** At San Francisco about 110,000 years ago the coast shows twice: the pieces move with their plates while the ball of today's ground under them does not. Per the spec, from today to the seam at 2.6 million years every piece stays at today's position, as the old globe and the map have them; the plates start moving at the seam, as `globe.js` does. The ball of today's ground under the pieces is then honest this side of the seam: keep it, and fade it out with the photograph, gone by the seam. Report what happens close in at the seam itself: pictures at San Francisco and Iceland at 2.59 and 2.61 million years, and the largest jump you can find. Watching the plates move close in is a later step, plate boundaries; don't start it.
>
> **4. The pale wash goes this side of the seam.** The pieces' pale wash over the open sea showed as straight-sided polygons close in (round Japan). This side of the seam, don't draw it. Past the seam it stays as it is. It comes in across the seam smoothly, never a snap.
>
> **5. One list of places, and a word.** Beijing shows twice: once from the Time Machine's dozen cities (no halo), once from `places.json` (with a halo). Merge them into one list for the Earth, each place once, all in one style. Use the halo for all, since the photograph needs it, and say so in the report; Michael may overrule. A word in the left column, ***places***, turns them all off and on. The bench-only test places over Australia and the Sahara go behind the same word. Say where the list comes from, in one sentence a designer can read.
>
> **6. *Land lighter* is settled.** Make 100 the constant and remove the slider.
>
> **Check before reporting**, on the Mac in the pane: the six lakes above at the three ages; today's coast off and on at today, at 21,000 years and at 250 million; San Francisco at 110,000 years, close in; Japan close in at today and at 3 million years; Beijing once; *places* off and on. Small JPEGs beside the report. The frame rate in a close view of the Alps, against step 5's 13.3 ms. Say plainly what needs Michael's eye.
>
> Name the bench's version in its stamp, update `MANIFEST.md` and `00-BOARD.md`, run `tools/check-deploys.sh`. Confirm the Time Machine, the Sun bench and a story map open unchanged. Write the report to `CWVault/claude/Report-Earth-3D-Bench-05b.md`. Stop and report. When Michael says so, commit and push.
