---
status: Ready for Michael's read, 28 Oct 2026. A revision of the fourth Earth bench, before step 5. Paste the block below whole into Claude Code. Built 28 Oct, late, in Claude Code; reported in Report-Earth-3D-Bench-04b.md; not committed.
role: Michael's rulings on the fourth bench (the deeper blue, Blue Marble's own sea at today, the impact as built) and three things to build or check: the photograph's sea, a fine slider for the last three million years, and the coastline.
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-04.md, Prompt-Build-Earth-Bench-04.md
---

# Prompt: the Earth, fourth bench revised

> **Michael's rulings on step 4 (28 Oct):**
>
> - **The sea is the 2D's deeper blue**, with even light. Remove the sea-colour switch and keep the deeper one.
> - **The impact's pace stays** at 6.5 million years.
> - **At today the photograph shows its own sea.** As soon as she moves back, our sea takes over, because the sea level changes all the time and that change is worth seeing. The spec carries this now.
>
> Read `CWVault/claude/Spec-Earth-3D.md` again (*The ground*, *The sea*, *Today's lines on the past*, and the new open item on the slider), your `CWVault/claude/Report-Earth-3D-Bench-04.md`, and NASA's Blue Marble: Next Generation pages for the versions that include the ocean. Where this prompt and the spec disagree, the spec wins.
>
> Same bench, `experiments/earth-3d.html`, the 2D globe still beside it. Nothing a child can see changes.
>
> **1. Blue Marble's own sea, at today.** Find the July 2004 Blue Marble that shows the ocean (the version with the sea floor's shape in its blues, if there is one; name what you chose and why). Quote NASA's terms for it in the report. Make it into WebP at 8,192, 4,096 and 2,048, as the land-only one was, and report the sizes. At today the Earth shows it, sea and all. From the first step back, our sea, in the deeper blue, takes over. The change happens over the first position or two of the slider, so it reads as the sea changing, not as a glitch. Everything else about the photograph's fade to paint by 2.6 million years stays as it is.
>
> For Michael to compare, a bench-only word: ***NASA's sea*** / ***our sea always***, the second being the bench as it is now. Report the file sizes against the land-only pictures, and whether the land-only pictures are still needed for anything; don't delete them.
>
> **2. A fine slider for the last three million years.** Bench only. The main slider gives the last ice age about a dozen positions, so 21,000 years can't be reached by hand. Add a second slider under the first, today to 3 million years, scaled so the last 30,000 years get real room under a finger. The two move together: moving either sets the age, and the other follows. Report the scale and the positions of 6,000, 21,000, 125,000 and 450,000 years. This is a bench tool while Michael decides how the Time Machine's control will work; don't put it anywhere else.
>
> **3. The coastline.** Michael can't see the coast line. Check it where the dark sea doesn't hide it: from the first step back to 2.6 million years, on the deeper blue, and with *today's coasts* on at 250 million years. If it is too faint to read at the home view, make it just visible, and report what you changed. At today it isn't drawn: the photograph shows its own coast.
>
> **4. The uncovered shelf, now that 21,000 can be reached.** The open look from the step 4 report: what a lowered sea uncovers, the 2D's buff or the spec's grey. Build both as a bench-only switch, ***buff shelf*** / ***grey shelf***, for Michael to choose at 21,000 years.
>
> **Check before reporting**, on the Mac in the pane: pairs at today and at the first, second and fifth positions back, with *NASA's sea*, to show the change; today and 21,000 with *our sea always*; 21,000 over the Bering Strait and over the North Sea with each shelf colour; the coast at 10,000 years and at 1 million, and with *today's coasts* at 250 million. Put the pictures beside the report as small JPEGs only. Say plainly what needs Michael's eye.
>
> Name the bench's version in its stamp, register anything new in `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Confirm the Time Machine and the Sun bench open unchanged. Write the report to `CWVault/claude/Report-Earth-3D-Bench-04b.md`. Stop and report before committing.
