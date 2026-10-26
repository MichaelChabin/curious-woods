---
status: Handoff, 25–26 Oct 2026. One Cowork chat that began with Drain the Sea and turned into a session on 3D. Every follow-on chat reads this first.
role: What we found, what we built, what Michael decided, and how the work splits
related: Ideas-Ledger.md (vault; the 25 Oct entries), Spec-Drain-the-Sea.md, Notes-Drain-the-Sea-Held.md, Lab-Elements.md, Prompt-Chat-*.md (the five follow-on chats)
---

# 3D in the Woods: what one session found

## What we found in the code

- **Nothing in CW is true 3D yet.** The Time Machine globe (`cw-deploys/js/globe.js`, about 1,200 lines) is a 2D canvas, painted pixel by pixel: for each pixel it inverts the projection, asks which plate is there at that age, turns the plate back to today, and reads today's picture. It's the map bent round. That's why it's honest and smooth, and why it can't be cut open, lit, or looked into. There is no WebGL anywhere in `cw-deploys`. Three.js is named as part of the stack but unused.
- **The water ball** on the Drain the Sea bench is an SVG ellipse with a gradient, not a sphere.
- **The globe already tells a lot of the early Earth from outside:** molten at 4,567 million years, black crust with glowing cracks, the Moon-forming flash, molten again, the sea by 4,400, invented continents run by a motion model, *another guess*. What it lacks is the inside.
- **Drain the Sea** is held. The Time Machine refactoring finished 21 Oct. The read-only audit (`Prompt-Audit-Drain-the-Sea-vs-Time-Machine.md`) has not yet run. Its wording ("is now being refactored") needs updating to "has been refactored" before it is pasted. If the Time Machine globe becomes 3D (below), that audit should also ask what Drain the Sea needs from a 3D globe.
  *Correction, 26 Oct: the audit did run, on 24 Oct; its report is `Audit-Drain-the-Sea-vs-Time-Machine-Oct24.md`. `Prompt-Audit-Earth-3D.md` builds on it.*

## What we built (two sketches, private claude.ai artifacts)

- **Early Earth, Cut Open:** https://claude.ai/artifact/DxzaNG2bDtfzRL1Xf93cPG. A three-quarter sphere with a wedge removed; the outside is painted once from noise (black basalt, glowing cracks, sea, pale rafts that grow with a time slider); the two cut faces are redrawn every frame (drips of cold crust sinking, melt rising to the rafts, mantle stirring, liquid iron core). Core and mantle to scale; crust exaggerated, and the page says so.
- **The Sun, Boiling:** https://claude.ai/artifact/SENQrEtL2CpFtakt33TLTY. Shader version: granules on the surface, limb darkening, and the core, radiative zone and convection zone at true scale, all computed every frame on the graphics card. *Boiling* off freezes it, which shows what a painted texture gives. Michael liked the shimmer in the radiative zone.
- **Sources** are in the vault at `prototypes/3d-sketches/` (artifact pages, so no doctype of their own). Tech: three.js r147 UMD from jsDelivr, OrbitControls, CanvasTexture painting, ShaderMaterial with simplex noise and moving cells. Cut-away = a partial SphereGeometry plus two half-disc CircleGeometry faces. One lesson: an additive halo sprite bleeds onto the cut faces unless it is drawn first and the Sun paints over it.

## What Michael said and decided

- He "hates having two approaches to the same problem." So the 2D globe and the 3D cut-away should become one object: the per-pixel plate lookup moved onto the graphics card as a shader.
- The globe is probably a better default than the flat map at the end of stories; stories still choose. Far out it's a globe, close in it flattens into the map's detail. A voyage gets a time control, with the globe turning to keep the boat centred. NASA Blue Marble for the ground.
- When she lowers the sea or moves the continents, the picture shifting from photograph to painted is "far from a bad thing, it signals the transition from data to model." The photograph is the top grade of the globe's five words of knowing.
- The Moon's birth without the fireworks: sense of scale, Theia's core joining Earth's, and an angle **dial**, "as long as the results are reasonable."
- The flat plane touching the round Earth: put **both** ways of carrying a line on the bench (by string, true distance; by light from the centre, shortest routes).
- Stellar evolution: kids handle one element burning into another if they can see it. It matters now because every Elements tile has a creation story.
- Physics: a gas of bouncing balls in a sphere looks very promising; possibly a physics lab, with the bead lab, sound and gas together. Not decided.
- He wants a CW standard for interactives that aims at the best graphics we can make, then scales down for target devices. "I don't want everything we do to be limited by a 5 year old platform."

## The five threads, and how they split

| Thread | Chat prompt | Depends on |
|---|---|---|
| A. A CW standard for interactives | `Prompt-Chat-Graphics-Standard.md` | nothing; start first |
| B. A 3D Earth for the Time Machine | `Prompt-Chat-3D-Earth.md` | A for the rules; a read-only Claude Code audit before any build |
| C. The Star lab | `Prompt-Chat-Star-Lab.md` | A |
| D. The Furnace: elements made inside stars | `Prompt-Chat-Furnace.md` | A; agrees one handshake with C; Lab-Elements.md |
| E. A physics shelf: gas and beads | `Prompt-Chat-Physics-Shelf.md` | A |

**Recommended order.** A first, because every other chat cites it and it is the shortest. Then B, which has the most value and touches the most code. C and D can run side by side once A exists, as long as they agree the handshake (C owns the star, its shells and its clock; D owns what happens to nuclei inside one shell). E whenever Michael has room. Each chat produces a design document Michael reads, and only then a Claude Code prompt, per the walk-then-build discipline.

All the ideas from this session are in the vault's Ideas-Ledger.md under 25 Oct.
