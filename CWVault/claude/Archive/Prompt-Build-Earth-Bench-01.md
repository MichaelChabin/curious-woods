---
status: Run in Claude Code 27 Oct 2026, late morning — built and checked in the pane, not committed; the report is Report-Earth-3D-Bench-01.md with the fifteen pair pictures in Earth-3D-Bench-Oct27/. Was: Ready for Michael's read, 27 Oct 2026. Step 1 of the migration in Spec-Earth-3D.md. Paste the block below whole into Claude Code.
role: The first bench for the one Earth: the ball, the desk-globe turn, the pieces of continent as meshes turned by the plate model, Blue Marble beside the old ground, and the old 2D globe beside it all.
related: Spec-Earth-3D.md, Audit-Earth-3D.md, Standard-Interactives.md, Report-3D-Shelf-Oct26.md
---

# Prompt: the Earth, first bench

> Read `CWVault/claude/Spec-Earth-3D.md` in full; it is the brief. Then `CWVault/claude/Audit-Earth-3D.md`, sections 0 to 4 and 11, `CWVault/claude/Standard-Interactives.md`, and `CWVault/claude/Report-3D-Shelf-Oct26.md`. Then the shelf itself, `cw-deploys/js/3d/`, and `experiments/sun-3d.html` for how a page stands on it. Then `cw-deploys/js/globe.js`, its header and `plateMatrixAt`, for how a plate's turn is read at an age. Where this prompt and the spec disagree, the spec wins.
>
> This is step 1 of the spec's *Getting there*. It builds one new page beside the Time Machine and changes nothing a child can see. `globe.js`, `map.js`, the Time Machine and every story stay exactly as they are.
>
> **1. The desk-globe turn.** Add it to `scene.js` as an option, so the Earth turns like a globe on a stand (deep-time ruling 3, 6 Oct: north up at rest, the tilt stops when a pole faces her, a drag to the right moves the surface east whatever the tilt) and the Sun keeps its free trackball. Inertia, if any, the same in both. The Earth passes no idle turn: nothing moves when the page opens. While you are in `scene.js`, make it refuse a texture larger than the device allows and step down to the next size, as the audit's section 9 asks.
>
> **2. The pieces as meshes.** From `cw-deploys/stories/plates/continents.json`, as it is: each piece of continent triangulated once at load, on the unit sphere, with long triangles subdivided so the piece hugs the ball; texture coordinates are today's longitude and latitude. Each frame, each piece takes its plate's turn at the age, read exactly as `plateMatrixAt` reads it, so the two engines agree. Under the pieces, the sea as a ball of its own in the globe's sea colour from `cw-style.js`. Ages from today to 1,000 million years only: the guessed and invented ages, the molten sequence, the ice, the look by age and the sea lowering are later steps. Report the triangle count, how long triangulation takes, and whether writing the triangles once with a tool would be worth it.
>
> **3. The ground, two ways.** The pieces carry today's picture at every age on this bench, which is not honest, and the page says so in one line under the stage (*bench only: today's ground carried back in time*). A word switches the picture between the old ground (`art/maps/world.webp` with its vegetation, as the globe uses now) and Blue Marble. For Blue Marble: NASA's *Blue Marble: Next Generation*, the land-only version over a plain sea, one month; use a northern summer month and name it. Download the source once into `_data/`, never committed. Make it into WebP at 8,192, 4,096 and 2,048 on the long side, chosen by the tier, in `art/globe/`. Credit *NASA Earth Observatory* on the page and in the kept picture. Read NASA's terms from the source and quote them in the report. Report the file sizes.
>
> **4. Light.** The spec leaves open whether the ball has a day side and a night side. Build it switchable: lit by one soft light from the upper left, and evenly lit. Michael chooses by looking.
>
> **5. Seams, overlaps and poles.** Where pieces meet or overlap, draw them so no hairline and no flicker shows, in the raster's order where they overlap. Look hard at the limb, during a turn, and at the poles. Report what you did and what still shows.
>
> **6. The cities.** The dozen cities of the Time Machine (`stories/plates/cities.json`), riding their plates, as small dots with names placed by projecting from the ball; the far side hidden. Names fixed in screen pixels with the map's halo.
>
> **7. The bench.** `experiments/earth-3d.html`, page standard, Georgia, on parchment. Two stages side by side at the same size: on the left the 3D Earth, on the right the existing 2D globe (`cwGlobe`, flat fills or skin as the Time Machine has it), both at the same age and turned to the same longitude and latitude, so Michael can compare them by eye. One slider for the age, 0 to 1,000 million years, driving both. Turning one turns the other. The words, in a left column: *Blue Marble* / *old ground*, *Lit* / *even*, *Reset view*. A frame-rate number and the current tier in small grey type, bench only. Nothing else: no timeline, no story words.
>
> **8. Phones.** Per the spec the Earth is an exception to the standard's phone rule: on a phone it runs at the floor tier, and only a device that cannot draw 3D at all gets the still picture and its line. Make the bench do that. Check it at 375 px in the pane.
>
> **Check before reporting**, on the Mac in the browser pane: both stages agree at 0, 100, 250, 540 and 1,000 million years, at three views each (take screenshots of each pair and put them beside the report); the turn keeps north up and stops at the poles; pinch and two fingers work; no seams; the frame rate during a turn and during a drag of the slider, at each tier. Say plainly what needs Michael's finger on the iPad: the feel of the turn, the frame rate at full tier, the heat, the light, and the photograph against the old ground.
>
> Register the page in `experiments/index.html` and `MANIFEST.md`, and any new art; add the line to `00-BOARD.md`; run `tools/check-deploys.sh`. Confirm the Time Machine and the Sun bench still open unchanged. Anything the spec leaves open, leave open and name. Stop and report before committing.
