---
status: BUILT 28 Oct 2026 in Claude Code (not committed; the report Report-Earth-3D-Bench-03.md with twenty-five pictures in Earth-3D-Deep-Oct28/; Michael reads, looks on the Mac and the iPad, chooses the impact, says commit). Was: Ready for Michael's read, 28 Oct 2026. Step 3 of the migration in Spec-Earth-3D.md.
role: The Earth back to its birth: the guessed and invented ages, the near-black crust before oxygen, the molten sequence. With Michael's rulings on step 2.
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-02.md, Audit-Earth-3D.md (sections 1 and 4), Standard-Interactives.md
---

# Prompt: the Earth, third bench

> **First, Michael's rulings on step 2 (28 Oct):**
>
> - **The paint is *green and rock*.** The softened photograph carries today's ground on the moving plates: Australia's desert beside Antarctica, the ice sheets riding back to ages when they were forest, which breaks *white means ice*. Green and rock claims only what we know. Remove *photograph painted* and its word; the photograph is for today only, fading by 2.6 million years, as now. The green, `paintGreen`, stays as you made it until Michael moves it.
> - **Even light.** No sun lighting one side. Remove *Lit* and its word; keep the rim and the haze.
>
> Read `CWVault/claude/Spec-Earth-3D.md` (it carries these rulings now), your `CWVault/claude/Report-Earth-3D-Bench-02.md`, and `CWVault/claude/Audit-Earth-3D.md`, sections 1 and 4. Then in `cw-deploys/js/globe.js`: the grades and `gradeFor`, the motion model (`runSim`, `cratonSim`, `simQuat`, `guessedMatrix`), the blobs (`blobSet`, `makeBlobs`, `blobMatrix`, `shrunk` by the crust curve), `reguess` and the seed, the near-black crust in `paintSkin`, the Huronian in `ICEHOUSES`, and the molten sequence (`moltenState`, `paintMolten`, the cooling-order and cracks maps, `MOLTEN_WORDS`). Read them; don't infer them. Where this prompt and the spec disagree, the spec wins.
>
> This is step 3 of the spec's *Getting there*, on the same bench, `experiments/earth-3d.html`, the 2D globe still beside it. Nothing a child can see changes.
>
> **1. The slider to the beginning.** From today to 4,567 million years, both globes. Keep the slow stretch near today that step 2 gave it; choose the rest so every era gets room under a finger, and report the scale.
>
> **2. The guessed ages** (the model's reach to 4,000). The motion model stays in JavaScript, as it is, and hands the card one turn per body per frame. Same seed, same world: both globes take the seed from one place, and a word, *another guess*, gives both a new one. The edges go soft and uneven here, per the spec's two signals (the edges say how sure we are of *where*), as the 2D's softened outlines are now.
>
> **3. The invented ages** (4,000 to 4,400). The blobs as meshes, shapes from the seed, shrunk by the crust curve, run by the same motion model from 4,400 forward; the island inside each, the drowned part washed. Soft edges, as the guessed ages.
>
> **4. Before oxygen.** The near-black crust blending in from 2,300 back to 2,500, exactly as `paintSkin` has it; the Huronian ice (2,400 to 2,100) as the soft overlay you built in step 2.
>
> **5. The molten Earth** (4,567 to 4,400). A shader on the whole ball, not on the pieces: the melt, the black crust by the cooling-order map with the cracks glowing and dimming, the faint uncertain first sea, the Moon's impact at 4,510, melted again from the top down with the maps turned for a different second crust, black again, and the sea's blue by 4,400. Ages as `globe.js` has them. The words for each phase from `MOLTEN_WORDS`, shown under the stage as the 2D page shows them.
>
> **The Moon's impact, two ways, switchable on the bench only**, for Michael to choose by looking. The standard bans explosions, and Michael asked for the Moon's birth "without the fireworks":
> - *a quiet brightening*: the whole ball warms toward the melt's colour over a short span of the slider, no white flash, no glow beyond the rim;
> - *no flash*: the surface simply melts again.
> Neither is a flare, a shake or a burst.
>
> **6. The grade and its sentence.** Under the stage, the grade's word and sentence, from `globe.js`'s `GRADE_WORDS`, as the age moves, so Michael can see the edges change with the words.
>
> **Check before reporting**, on the Mac in the pane: pairs at 1,500, 2,400, 3,000, 4,000, 4,300, 4,450, 4,510, 4,540 and 4,567 million years, one view each, plus three *another guess* pairs at 3,000 showing the two globes agree. Put the pictures beside the report. Measure how long the motion model's run takes when the slider first passes 1,000 and when *another guess* is tapped, and say what that pause will feel like on the iPad. Say plainly what needs Michael's eye: the soft edges, the blobs, the near-black crust, the molten sequence as the slider moves, and the two impacts.
>
> Name the bench's version in its stamp, register anything new in `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Confirm the Time Machine and the Sun bench open unchanged. Anything the spec leaves open, leave open and name. Stop and report before committing.
