---
status: Ready for Michael's read, 28 Oct 2026. A small change to the Earth bench's layout. Can run alone, or in the same session as Prompt-Revise-Earth-Bench-04d.md.
role: The old 2D globe hidden behind a word; the new Earth larger.
related: Spec-Earth-3D.md, Prompt-Revise-Earth-Bench-04d.md
---

# Prompt: the Earth bench, a bigger Earth

> Same bench, `experiments/earth-3d.html`. Michael (28 Oct): he no longer needs the old globe beside the new one all the time, and wants the new Earth bigger. Don't write the spec, and don't stash, restore or check out anything under `CWVault/`.
>
> **1. The old globe on a word.** Hide the 2D globe when the page opens. A word in the left column, ***old globe***, shows it beside the new one as now; the same word hides it again. While hidden it keeps following the age, the seed and the turn, so it is right the moment it appears. The comparison pictures (`cwPair`) still work with it hidden.
>
> **2. The new Earth larger.** With the old globe hidden, the new Earth's stage grows to about 1.8 times its present width, or as large as the window allows beside the left column, whichever is smaller. With the old globe showing, the two return to their present size side by side. On a phone, nothing changes: the stage already fills the width.
>
> **Check before reporting**, on the Mac in the pane, at a laptop-sized window and a large one: the page opening with the old globe hidden and the Earth large; *old globe* on and off; the turn, pinch and sliders working at the larger size; the frame rate at the larger size, at full tier, during a turn. Small JPEGs beside the report.
>
> Name the bench's version in its stamp, update `MANIFEST.md` and `00-BOARD.md`, run `tools/check-deploys.sh`. Write the report to `CWVault/claude/Report-Earth-3D-Bench-04e.md`. Stop and report. When Michael says so, commit and push.
