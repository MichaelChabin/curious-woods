---
status: Built 28 Oct 2026 in Claude Code on 4719840 (report Report-Earth-3D-Bench-04c.md); committed and pushed on Michael's word, 28 Oct. A second revision of the fourth Earth bench, before step 5.
role: Michael's rulings on step 4b (our sea at every age, the buff shelf, the fine slider kept) and one look: the land lighter.
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-04b.md, Prompt-Revise-Earth-Bench-04.md
---

# Prompt: the Earth, fourth bench, second revision

> **First, check the spec.** Read `CWVault/claude/Spec-Earth-3D.md` and confirm it says *the land-only Blue Marble, over CW's own sea, at every age* under *The ground*. If it doesn't, stop and tell Michael: the vault's copy has been overwritten by an older one before. Don't write the spec yourself, and don't stash, restore or check out anything under `CWVault/`.
>
> **Michael's rulings on step 4b (28 Oct):**
>
> - **Our sea, at every age.** NASA's sea is too dark, and its sea floor is drawn from soundings, not seen, so it isn't a photograph. Remove NASA's sea, the change at the first step back, and the *NASA's sea* / *our sea always* word. Our sea, in the deeper blue, is the sea at today too. Stop using the ocean pictures and remove them from `art/globe/`; they stay in git's history. The land-only pictures stay.
> - **The buff shelf.** Keep the 2D's buff for what a lowered sea uncovers; remove the grey and the *buff shelf* / *grey shelf* word.
> - **The fine slider stays**, as built, on this bench only.
> - **The coast is drawn at today again**, as it is everywhere this side of the seam.
>
> **One look: the land lighter.** Michael finds Blue Marble's land too dark. On the bench only, give him a way to lift it, a small slider marked *land lighter*, from as now to clearly lighter, so he can choose by looking. Brighten the land's mid-tones and shadows without washing out the greens or making the deserts glare; say how you did it (a curve, not a flat add). The fade to paint by 2.6 million years is unchanged. Michael will name the setting, and it becomes a constant.
>
> **The note under the globe.** While the photograph shows, the honest block says what the picture is, in words like: *The land: satellite pictures from July 2004, a month of them stitched together without clouds.* Report the wording you used; Michael will adjust it.
>
> **Check before reporting**, on the Mac in the pane: today and 21,000 years at the home view and over the North Sea, each at three settings of *land lighter* (as now, halfway, full), as small JPEGs beside the report; the coast at today. Say plainly what needs Michael's eye.
>
> Name the bench's version in its stamp, update `MANIFEST.md` and `00-BOARD.md`, run `tools/check-deploys.sh`. Confirm the Time Machine and the Sun bench open unchanged. Write the report to `CWVault/claude/Report-Earth-3D-Bench-04c.md`. Stop and report. When Michael says so, commit and push, so he can look on the site and the iPad.
