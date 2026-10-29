---
status: Built 29 Oct 2026 by Claude Code on ee7fcfb; the report is Report-Earth-3D-Bench-06.md, the pictures in Earth-3D-Bench-06-Oct29/; not committed, waiting for Michael's word. (Was: ready for Michael's read, 29 Oct 2026. Step 6 of the migration in Spec-Earth-3D.md, flat, with three fixes from step 5b and two small things Michael asked for.)
role: The Map word laying the same Earth out flat in Equal Earth; Iceland and Hawaii kept to the seam; the pieces gliding past the seam instead of jumping; today's names; tap to centre and zoom; a window she can crop.
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-05b.md, Standard-Interactives.md, Spec-Maps.md
---

# Prompt: the Earth, sixth bench: flat

> **First, check the spec.** Read `CWVault/claude/Spec-Earth-3D.md`. Under *Open*, the flat world's projection should say *Ruled 29 Oct (Michael): Equal Earth*. If it doesn't, stop and tell Michael. Don't write the spec yourself, and don't stash, restore or check out anything under `CWVault/`.
>
> Then read the spec's *Close in, and flat*, *How she handles it* and *The plates*, and your `CWVault/claude/Report-Earth-3D-Bench-05b.md`. In the code, `cw-deploys/js/3d/earth.js` as it stands, `scene.js`, `still.js`, and in `cw-deploys/js/map.js` the bars that stretch the map and the placer. Read them; don't infer them. Where this prompt and the spec disagree, the spec wins.
>
> Same bench, `experiments/earth-3d.html`. Nothing a child can see changes: `globe.js`, `map.js`, the Time Machine and every story stay exactly as they are.
>
> **1. Three fixes from step 5b (Michael, 29 Oct).**
> - **Iceland and Hawaii stay to the seam.** The ball of today's ground under the pieces stays at full strength from today to 2.6 million years, painted like everything else (the photograph fading to paint as on the pieces), and fades out just past the seam, smoothly. Past the seam, islands no piece holds are gone until the plate-boundaries step; name them.
> - **The pieces glide instead of jumping.** Between 2.6 and about 5 million years (one named constant), each piece eases from today's place to where the model puts it, so nothing snaps close in. The note under the globe says, while the glide is on, in words like: *Here the continents are easing into the places the plate model gives them; the path between is drawn, not known.* Report the wording; Michael will adjust it. Pictures at San Francisco and New Guinea at 2.59, 3, 4 and 5 million years, close in.
> - **Today's names.** On the Earth, places carry today's names: Tokyo, not Edo. Don't change `places.json` or what any story calls a place; the Earth's own list uses today's names. Report every name you changed.
>
> **2. Flat.** A word in the left column, ***Map***, lays the same Earth out flat; ***Globe*** brings the ball back. Same pieces, same pictures, same age, the same sea, ice, paint, grades and soft edges, laid out in the **Equal Earth** projection (Šavrič, Patterson and Jenny, 2018): every place its true size, the outline rounded like an atlas's. The flat world is **whole and still**: it doesn't pan, turn or zoom. Centred on the 0° meridian. The age slider and the fine slider work on it as on the ball, and *another guess* too. Around the flat world, the page's parchment.
>
> - **Where pieces cross the edge of the flat world** (the 180° meridian), cut them cleanly, so nothing stretches across the map. Look hard at Russia's far east, Fiji and Antarctica, and at Pangaea at 250 million years, whatever lies on the edge then.
> - **The poles** become curved edges, not points. Look at Antarctica and the Arctic ice.
> - **Places** show on the flat world, placed by the same placer and rules, with the halo; *places* turns them off.
> - **A tap on the flat world** goes back to the globe, centred and zoomed on the place tapped. For Michael to judge.
> - No animation between the two; the spec leaves that for later.
>
> Report how you drew it (projecting the pieces, or laying the ball's picture out), and what it costs a frame on the Mac.
>
> **3. Tap to centre and zoom.** On the globe, a tap on a place glides it to the centre and zooms in one step (named constants for the glide's time and the step's size). *Reset view* returns. A drag that starts on a place still turns the Earth; only a tap moves to it.
>
> **4. A window she can crop.** The window that holds the Earth gets bars on its right and bottom edges, as the map's are, so she can drag it narrower, wider, shorter or taller. The Earth stays centred in it. *Keep this picture* takes the window's shape at full size. A word, or *Reset view*, returns the window to its usual size; say which you chose. On a phone, no bars.
>
> **Check before reporting**, on the Mac in the pane: the flat world at today, 21,000 years, 250 million years (Pangaea entire), 540, 3,000, 4,300 and 4,509, each beside the globe at the same age; *Map* and *Globe* back and forth; a tap on the flat world landing on the globe, centred and zoomed; a tap on a city on the globe; the window cropped to a tall shape and a wide one, with a kept picture of each; Iceland at 2.5 and 2.7 million years; the glide pictures above; Tokyo. Small JPEGs beside the report. The frame time on the flat world while dragging the age slider. Say plainly what needs Michael's eye.
>
> **Leave open, and name:** the animation from ball to flat; marks on the flat world beyond places; sharper pictures for particular places on the globe (Michael's Egypt thought); plate boundaries; the probe.
>
> Name the bench's version in its stamp, update `MANIFEST.md` and `00-BOARD.md`, run `tools/check-deploys.sh`. Confirm the Time Machine, the Sun bench and a story map open unchanged. Write the report to `CWVault/claude/Report-Earth-3D-Bench-06.md`. Stop and report. When Michael says so, commit and push.
