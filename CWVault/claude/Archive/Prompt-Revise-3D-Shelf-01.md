---
status: Ready to paste, 27 Oct 2026. Run before Prompt-Build-Earth-Bench-01.md, which edits scene.js after it.
role: Bring the 3D shelf and the Sun bench into line with Standard-Interactives.md, using the list at the end of Report-3D-Shelf-Oct26.md.
related: Standard-Interactives.md, Report-3D-Shelf-Oct26.md, Spec-Earth-3D.md, Prompt-Build-Earth-Bench-01.md
---

# Prompt: the 3D shelf, brought up to the standard

> Read `CWVault/claude/Standard-Interactives.md` in full, then the last section of `CWVault/claude/Report-3D-Shelf-Oct26.md` (*Read against the standard*). The shelf was built before the standard reached the disk; this session makes them agree. Where this prompt and the standard disagree, the standard wins. Change only `cw-deploys/js/3d/`, `experiments/sun-3d.html`, `js/cw-style.js` (colours only) and the one new bench below. `globe.js`, `map.js`, the Time Machine and every story stay exactly as they are. Do not start any step of `Prompt-Build-Earth-Bench-01.md`; it runs after this and adds the desk-globe turn to `scene.js`.
>
> **1. No idle turn.** Nothing spins when the page opens (§6). `scene.js` keeps the `turn` option but its default is zero, and the Sun bench passes none. The boiling still moves, since that motion shows something.
>
> **2. The scale notes, on the picture.** Rebuild `honest.js` so each note is a short italic label placed beside the stretched thing on the picture, with a thin drawn bracket so the eye finds it, re-placed as the ball turns and hidden when its point is on the far side. One to three notes; anything drawn to scale says nothing (§5). On the Sun that leaves the granules (say how much too big they are drawn) and, only if time runs faster than real, one note saying so. Drop the notes about the zones, the limb and anything else that is true to scale. No square brackets in the text.
>
> **3. The marks of knowing.** Not now. The Sun shows nothing by grade, and the Earth will need them first. Leave a short comment in `honest.js` saying they belong there, and name it in the report.
>
> **4. How a page picks its tier** (§2). Time the first two seconds; drop a tier if the page can't hold 60 frames a second, or the display's own refresh if that is lower; time again. Add the later check: if the rate sags for five seconds running, drop once more. Never climb back during a visit. Keep remembering the tier in `sessionStorage`, and keep ignoring hidden-tab frames and single stalls, which the first test showed are needed. Don't add the GPU-cost readback (report item 2); leave it open and say so.
>
> **5. The ground.** The Sun's stage sits on `black` from `cw-style.js`, read from `CW.STYLE`, not its own `#140f0b`.
>
> **6. Colours.** The zone she tapped is marked in vermilion, not copper, in the legend and in the sentence. Michael's ruling, 27 Oct: every colour comes from `cw-style.js`. So the Sun's own colours (the surface's three, the three zones', the glow's) move into `cw-style.js` as one named group, `sun`, and the bench reads them from there. A star lab will use the same group later.
>
> **7. A bench for each shelf piece** (§7). Michael's ruling, 27 Oct: one page, `experiments/shelf-3d.html`, not six. A word in its left column picks the piece, and the stage shows that piece alone on a plain ball: the scene and its gestures, the cut-away, the noise, the glow, the scale notes, the kept picture. Keep it plain; it's a workbench, not a story.
>
> **8. The kept picture** (§8). `still.js` makes the picture at full tier, 4,096 px on the long side, with the scale notes drawn on the picture where they sit on screen, a one-line caption, and the small credit at the bottom. For the Sun the caption is *The Sun, cut open.* until Michael writes a better one.
>
> **Leave open, and name in the report:** the GPU-cost readback for picking a tier; versioning the shelf's module imports (`?v=`); WebGL 2's readback waiting on `requestAnimationFrame` while the page is hidden.
>
> **Check before reporting**, on the Mac in the browser pane, on WebGPU and with `?gl=1`: the Sun opens still apart from the boiling; the notes sit beside the granules and follow the turn; a tap marks its zone in vermilion; the tier drop works when forced (`?tier=`) and the sag check fires when you slow the page; the kept picture carries its notes, caption and credit; each piece shows alone on the new bench; reduced motion (`?reduce=1`) and 375 px still behave. Confirm the Time Machine opens unchanged.
>
> Update `MANIFEST.md`, `experiments/index.html` and the line in `00-BOARD.md`; run `tools/check-deploys.sh`. Write the report to `CWVault/claude/Report-Revise-3D-Shelf-01.md`. Stop and report before committing.
