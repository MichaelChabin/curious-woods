# Prompt: build the shared 3D shelf, with one bench

*26 Oct 2026. Paste the block below into Claude Code on the Mac. It builds to `claude/Standard-Interactives.md` (canonical 26 Oct).*

> We're setting up the shared 3D shelf for Curious Woods, and one bench that uses it.
>
> **Read first:** `CWVault/claude/Standard-Interactives.md` (the rules; where this prompt and that page disagree, the page wins), `CWVault/claude/Worknote-3D-Session-25Oct.md`, `cw-deploys/MANIFEST.md` (the page standard), `cw-deploys/js/cw-style.js`, and the two sketches in `prototypes/3d-sketches/`. Note the lesson in the worknote: the glow must be drawn first, or it bleeds onto the cut faces.
>
> **1. three.js, pinned.** Copy the current three.js release (the standard says r186; use whatever is current today and report the number) into `cw-deploys/js/vendor/three-<release>/`, with only the files we need. Use its WebGPU renderer, with the automatic WebGL 2 fallback. No CDN, no build step, no framework.
>
> **2. The shelf,** in `cw-deploys/js/3d/`, each file small and doing one thing, all shaders in TSL (no GLSL `ShaderMaterial` anywhere):
> - `scene.js`: the renderer, camera, the three tiers and how a page picks one (section 2 of the standard), the gestures (one finger turns, pinch zooms, two fingers move the view, tap picks, *Reset view*), reduced motion (opens still, *Let it move* starts it), and the bigger-screen message for phones.
> - `cutaway.js`: a ball with a wedge out; the page supplies the shader for the cut faces.
> - `noise.js`: one noise library in TSL.
> - `glow.js`: the one glow, drawn first.
> - `honest.js`: scale notes with their brackets (section 5), in Georgia, colours from `cw-style.js`.
> - `still.js`: the kept picture, one frame drawn off-screen at full tier, 4,096 px on the long side, with its notes and credit.
>
> Leave `lens.js` for later; the Star lab chat will say what it needs. Don't invent it.
>
> **3. The bench:** `cw-deploys/experiments/sun-3d.html`, *The Sun, Boiling* rebuilt on the shelf: granules, limb darkening, the cut-away with core, radiative zone and convection zone at true scale, and the shimmer in the radiative zone, which Michael liked. Warm near-black ground. A small corner readout, for the bench only, showing the backend (WebGPU or WebGL 2), the tier, and the frame rate. It must look at least as good as the sketch. If something can't be matched in TSL, say so; don't fake it.
>
> **4. Report before committing.** Tell me which three.js release you pinned; the frame rate at each tier on the Mac (force each tier for the test); what the bench does with WebGPU switched off; the file sizes; and anything in the standard that turned out wrong or vague. Register the files in `MANIFEST.md` and `00-BOARD.md`. Then stop and report. No commit until Michael has opened the bench on the iPad and the Mac and run the ten-minute heat check.
