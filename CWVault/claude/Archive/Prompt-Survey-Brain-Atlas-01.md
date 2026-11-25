---
status: Michael's prompt, 15 Nov 2026, from the "brain lab references" chat. A survey only. Nothing in cw-deploys, js or the site changes, and nothing is committed.
role: Fetch the Allen Human Reference Atlas as a 3D model, find out what is really inside it, show it as glass beside the Allen Institute's own picture, and report whether CW can build its brain on it.
related: Brain-Lab-Map.md (read it first), the page active/about-your-brain.html, experiments/two-eyes.html (the house look for living things)
updated: 2026-11-15
---

# Survey: a real brain for the Brain lab

## Why

The Brain lab needs one brain that every story can call: turn it, light up a part, send a signal along a path. The brain on `active/about-your-brain.html` is a painting with regions placed by eye. Two hand-made sketches in the chat (glowing dots, shapes placed from anatomy books) showed the idea works and showed its limit: real folds and true inner shapes have to come from atlas data.

Michael has ruled the look, from a frame of the Allen Institute's basal ganglia video:

- **Smooth glass.** Solid, shaded surfaces you can see through. No dots.
- **Clear.** With nothing chosen, the inner parts are always faintly visible through the cortex.
- **Real anatomy.** True folds, so that "moving" and "touch" can sit where they belong.
- **Inner parts partly transparent but solid enough that their outlines are unmistakable**, and the near one plainly in front of the far one.
- **A faint head** that appears only while the brain is turning.

This step does not build that. It finds out whether the data can carry it.

**Read only on code.** Don't change any file in `cw-deploys/`, `js/` or the site, and don't commit or push. Everything this step makes is new files under new names.

## What to fetch

Put all downloads in a new folder, `_CW/atlas-sources/brain/`, with one subfolder per source. Don't add them to git. Save each source's licence text and README beside its files, and record the URL and the date fetched.

1. **First choice: Allen Human Reference Atlas – 3D, 2020, as converted by HuBMAP.** The "Allen Brain" models (female and male) in GLB, from the CCF 3D Reference Object Library: `https://hubmapconsortium.github.io/ccf/pages/ccf-3d-reference-library.html`. Take the newest release. Both are stated to be CC BY 4.0.
2. **Its source volume**, only if the GLB falls short (see below): `http://download.alleninstitute.org/informatics-archive/allen_human_reference_atlas_3d_2020/version_1/`. Read its README first. Note that the MRI template it was drawn on (ICBM 2009b, McGill) has its own terms; report them, don't assume.
3. **Fallback: Brainder, "Brain for Blender"**: `https://brainder.org/brain-for-blender`. The OBJ set: whole hemispheres (pial), the cortex split by the Desikan-Killiany atlas, and the subcortical structures. CC BY-SA 3.0. Fetch it only far enough to answer the same questions; it is the comparison, not the plan.

Don't fetch the BICAN basal ganglia annotation set in this step. Note only where it lives (`https://brain-map.org/consortia/hmba/hmba-release-basal-ganglia`), its licence as stated there, and what format it comes in.

## What to find out

For the Allen GLB (and, more briefly, for Brainder):

- **The parts.** How many separate meshes, and are they named? List every name. If the names are codes, map them to the atlas's structure names from its ontology file and say how sure the mapping is.
- **The ones CW needs first.** For each of these, say whether it exists as its own part, under what name, and on which sides: the cortex as a whole; precentral gyrus and postcentral gyrus; the occipital cortex around the calcarine fissure; the cortex above the temporal lobe that does hearing; caudate, putamen, globus pallidus (outer and inner), subthalamic nucleus, substantia nigra; thalamus, and the lateral geniculate body within it if separate; hippocampus; amygdala; cerebellum; brainstem; corpus callosum; optic nerve, chiasm and tract.
- **Left and right.** The atlas was drawn on half a brain. Is the model one hemisphere, or mirrored into two? If mirrored, are the two sides separate parts?
- **The folds.** Does the outer surface show real gyri and sulci, and how crisp are they? Is there one outer surface for the whole cortex, or only the gyri as pieces with seams between them? If only pieces, say whether a clean outer shell can be made from them.
- **Size.** File size, triangle count in total and for the largest parts.
- **Fit for the web.** Simplify a copy until the whole brain would load comfortably on an iPad (aim for a few megabytes in all; use meshopt or Draco as you judge best). Say what size you reached and what was lost. Keep the simplified copy in the same sources folder.
- **Terms.** For each source: the licence, in one plain sentence, and the exact credit line it asks for.

If the GLB turns out to be one fused lump, or its parts can't be named, say so plainly and go to the source volume (item 2): make surfaces from the labelled voxels for the structures listed above, and report on those instead. The Allen community forum describes a way through ITK-SNAP; use whatever tool you judge best and say which.

## The pictures

Michael needs to see it, not read about it. Make `CWVault/claude/Survey-Brain-Atlas-01/index.html`, a page that opens on the Mac by double-click with no server, holding pictures only (1,024 × 768), with a line of plain words under each:

1. The whole brain from the left side and from the front-left, as glass on the dark teal ground of `experiments/two-eyes.html`.
2. The same two views with the basal ganglia lit: caudate, putamen and pallidum each in its own colour, partly transparent, outlines unmistakable, the near side plainly in front of the far side. This is the picture to set beside the Allen frame.
3. The same with the thalamus lit, and one with the hippocampus lit.
4. The precentral and postcentral gyri lit on the glass cortex, if they exist as parts.
5. One picture of the simplified copy beside the full one, same view, so the loss can be judged.
6. One picture of the Brainder brain in view 2, for comparison.

Use Three.js for the rendering. The glass is a first attempt, not a ruling: get it believable and stop. Say in the report how you did it (material, how the transparent surfaces were ordered) and what still looks wrong. Put the pictures in `CWVault/claude/Survey-Brain-Atlas-01/pictures/`.

If you also leave a live page that turns with the mouse, it may need a local server. That is fine; say how to start it.

## Open items. Don't invent these.

- **Which CW name goes with which structure.** The page `about-your-brain.html` has twelve names ("conscious thought", "the switchboard", "getting better at things", and so on). Read how that page places each one, and list, for each, the atlas parts that could stand for it. Michael rules the matches.
- **The wiring.** No atlas here includes pathways. Report only what landmarks exist for the road from eye to switchboard to the back of the head (optic nerve, chiasm, tract, lateral geniculate, calcarine cortex), so the path can be drawn against them later.
- **The head.** Don't look for a head model in this step. Note it as wanted.
- **The colours.** Michael has said he might not pick the Allen colours. Use quiet ones in the house manner and don't treat them as settled. The amber is kept for the signal and should not be used for a region.

## The report

`CWVault/claude/Report-Survey-Brain-Atlas-01.md`, written for Michael, in plain words:

- First, the answer in three or four sentences: can CW build its brain on the Allen atlas, yes, no, or yes with these gaps.
- Then the findings under the headings above, with the table of wanted structures (found / not found / found under another name).
- What Brainder offers that the Allen atlas does not, and the other way round.
- What you would do next, as a short list, without doing it.

## Check, then stop

Before stopping, open `index.html` from Finder and check that every picture shows. Write a checksum (`shasum -a 256`) of the report and of `index.html` at the foot of the report.

Stop and report. Don't build the lab's brain, don't change any page, and don't commit.
