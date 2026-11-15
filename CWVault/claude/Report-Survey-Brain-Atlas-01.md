---
status: Survey, 15 Nov 2026, for Michael to read and rule. Read only on code; nothing in cw-deploys, js or the site changed; nothing committed.
role: Whether the Allen Human Reference Atlas, as a 3D model, can carry the Brain lab's one brain. What is inside the model, how it looks as glass, what it weighs, what it lacks, and how Brainder compares.
related: Brain-Lab-Map.md, Survey-Brain-Atlas-01/index.html (the pictures), cw-deploys/active/about-your-brain.html (the twelve names), cw-deploys/experiments/two-eyes.html (the ground colour), atlas-sources/brain/README.md (every download, its address, licence and credit)
---

# A real brain for the Brain lab: the survey

The pictures are in **`Survey-Brain-Atlas-01/index.html`**. Double-click it in Finder. Fifteen pictures, each 1,024 × 768, with a line under each.

## The answer

**Yes, with gaps.** The Allen model is not a fused lump. It is 283 separate parts, every one named in plain anatomical English, left and right apart, with real folds. All the inner parts CW wants first are there as their own pieces: caudate, putamen, both segments of the pallidum, subthalamic nucleus, substantia nigra, thalamus with the lateral geniculate, hippocampus, amygdala. The moving strip and the touch strip are there too. Packed for the web the whole brain is 3.0 MB with nothing thrown away, so it needs no simplifying to load on an iPad.

The gaps: there is no single outer surface for the cortex (it comes as about fifty gyri a side, though a clean glass shell can be drawn from them, as the pictures show); there is no part for "where seeing starts", for the reading patch, for the words patch or for the "how many" fold; there is no optic nerve; eight parts carry each other's names (now identified, see *The parts*); and the folds are an average of 152 brains, so they are true but soft.

I did not need the source volume to make surfaces. I did download it afterwards, on Michael's word, to check the names.

## What was fetched

Everything is in `_CW/atlas-sources/brain/`, one folder per source, with licence texts and a `README.md` giving each address and the date (15 Nov 2026). The folder is kept out of git by a line in `.git/info/exclude`, which is local to this Mac and is not a tracked file.

- **Allen, by HuBMAP.** Female and male GLB, release **1.4**. The library page still links 1.2; 1.4 is on HuBMAP's newer server and is the newest. The two files hold the same model at the same size, to the triangle. I used the female one.
- **Allen source volume.** Its README at first; then, on Michael's word ("Yes, identify it"), the two label volumes (1.1 and 1.8 MB) and the Allen structure list, to check the names.
- **Brainder.** Three OBJ sets: the whole hemispheres (pial), the cortex split by Desikan-Killiany, and the subcortical structures. I did not fetch the white, inflated, Destrieux or DKT sets.
- **BICAN basal ganglia.** Not fetched, as asked. See *Terms* for where it lives.

## The parts

**283 meshes, all named.** 141 structures on the left, the same 141 on the right, and one optic chiasm. The names are words, not codes (`Allen_head_of_caudate_L`), so no ontology lookup was needed. They are the 141 structures of the Allen 3D atlas.

HuBMAP also supplies a crosswalk table to UBERON terms. It has 107 rows, so it is coarser than the model and I did not rely on it.

**Eight names are wrong, and all eight are now identified.** The first sign was a part called `posteroventral_putamen` that arches over the corpus callosum, nowhere near a putamen. I then checked every part against the Allen source volume: fitted the model onto the labelled voxels (it lands within about 1 mm) and asked which label each part's surface sits on. 133 of the 141 sit on their own label. The other eight wear each other's names, in a ring, the same on both sides:

| The file calls it | It really is |
|---|---|
| `posteroventral_putamen` | paracingulate gyrus |
| `paracingulate_gyrus` | frontomarginal gyrus |
| `frontomarginal_gyrus` | perirhinal gyrus |
| `perirhinal_gyrus_rostral_part_of_FuGt` | atrium of the lateral ventricle |
| `atrium_of_lateral_ventricle` | rostral gyrus |
| `rostral_gyrus` | frontal pole |
| `frontal_pole` | **optic radiation** |
| `optic_radiation` | posteroventral putamen |

Each match is total: the true label touches 100% of the part's surface and the name's own label touches none. Picture 13 shows the eight under their true names. Two matter to CW: the real **optic radiation** is a broad sweep of 2,116 triangles, not a stub, and the small real **posteroventral putamen** belongs with the putamen. The fix is a table of eight lines, applied when the model loads; the viewer does this now. The check's output is in `atlas-sources/brain/work/name-check.txt`.

The list below gives the names **as the file has them**.

Every name, with its triangle count on one side:

> amygdalohippocampal_area (106), amygdaloid_complex (680), angular_gyrus (6,246), anterior_amygdaloid_area (166), anterior_commissure (274), anterior_cortical_nucleus (180), anterior_horn_of_lateral_ventricle (2,708), anterior_intermediate_orbital_gyrus (1,162), anterior_nuclear_complex_of_thalamus (244), anterior_olfactory_nucleus (14), anterior_parahippocampal_gyrus (1,342), atrium_of_lateral_ventricle (622), basal_forebrain (868), basilar_part_of_pons (940), basolateral_nucleus_basal_nucleus (424), basomedial_nucleus_accessory_basal_nucleus (150), bed_nucleus_of_stria_terminalis (576), body_of_caudate (1,708), body_of_hippocampus (430), body_of_lateral_ventricle (1,544), central_canal_of_medulla_oblongata (12), central_nuclear_group (92), centromedian_nucleus_of_thalamus (246), cerebellar_deep_nuclei (654), cerebellar_vermis (4,732), cerebral_aqueduct (76), cerebral_peduncle_crus_cerebri (462), cingulate_gyrus_caudal_posterior_part (4,316), cingulate_gyrus_rostral_anterior_part (3,508), claustrum (3,258), corpus_callosum (6,034), cuneus (6,032), dorsal_lateral_geniculate_nucleus (170), external_segment_of_globus_pallidus (638), fornix (644), fourth_ventricle (426), frontal_agranular_insular_cortex_area_Fl (88), frontal_operculum (1,330), frontal_pole (2,116), frontomarginal_gyrus (1,084), gyrus_ambiens (180), gyrus_rectus_straight_gyrus (1,866), habenular_nuclei (110), head_of_caudate (2,466), head_of_hippocampus (516), hypothalamus (150), inferior_cerebellar_peduncle (112), inferior_colliculus (168), inferior_frontal_gyrus_opercular_part (2,974), inferior_frontal_gyrus_triangular_part (5,096), inferior_horn_of_lateral_ventricle (1,328), inferior_occipital_gyrus (4,628), inferior_olive (124), inferior_temporal_gyrus (7,058), ingulo_parahippocampal_isthmus (246), internal_segment_of_globus_pallidus (454), lateral_dorsal_nucleus_of_thalamus (222), lateral_hemisphere_of_cerebellum (11,928), lateral_nucleus (498), lateral_occipitotemporal_fusiform_gyrus_occipital_part (1,908), lateral_olfactory_gyrus (130), lateral_orbital_gyrus (2,986), lateral_posterior_nucleus_of_thalamus (380), limen_insula (64), lingual_gyrus_medial_occipitotemporal_gyrus (7,406), long_insular_gyri (1,218), mammillary_region_of_HTH (462), mammillothalamic_tract (124), medial_geniculate_nuclei (120), medial_nucleus (86), medial_orbital_gyrus (2,406), mediodorsal_nucleus_of_thalamus (760), midbrain_tegmentum (724), middle_cerebellar_peduncle (332), middle_frontal_gyrus (13,462), middle_temporal_gyrus (10,316), midline_nuclear_complex (248), nucleus_accumbens (472), occipital_pole (1,520), occipitotemporal_fusiform_gyrus_temporal_part (4,584), olfactory_bulb (8), olfactory_tract (142), optic_radiation (84), optic_tract (276), paracentral_lobule_caudal_part (2,020), paracentral_lobule_rostral_part (3,082), paracingulate_gyrus (824), parafascicular_nucleus_of_thalamus (112), paravermis_of_cerebellum (3,423), parietal_operculum (1,234), perirhinal_gyrus_rostral_part_of_FuGt (90), pineal_body (98), piriform_region (492), planum_polare (2,336), planum_temporale (1,646), pontine_tegmentum (528), postcentral_gyrus (9,084), posterior_cortical_nucleus (102), posterior_horn_of_lateral_ventricle (418), posterior_intermediate_orbital_gyrus (1,938), posterior_parahippocampal_gyrus (1,110), posteroventral_putamen (2,100), precuneus (9,366), preoptic_region_of_HTH (222), pretectal_region (56), primary_motor_cortex (11,082), pulvinar_of_thalamus (894), putamen (2,098), pyramidal_part_of_medulla_oblongata (116), red_nucleus (100), reuniens_nucleus_medioventral_nucleus_of_thalamus (160), rostral_gyrus (1,160), septal_nuclei (902), short_insular_gyri (1,480), subcallosal_gyrus_parolfactory_gyrus (406), substantia_nigra (118), subthalamic_nucleus (204), superior_cerebellar_peduncle_brachium_conjunctivum (258), superior_colliculus (72), superior_frontal_gyrus (20,300), superior_occipital_gyrus (6,032), superior_temporal_gyrus (4,198), supramarginal_gyrus (4,734), supraoptic_region_of_HTH (340), supraparietal_lobule (9,278), tail_of_caudate (610), tail_of_hippocampus (524), tegmentum_of_medulla_oblongata (632), temporal_agranular_insular_cortex_area_Tl (480), temporal_pole (2,570), thalamus (5,702), third_ventricle (1,168), transverse_temporal_gyrus_Heschls_gyrus (1,434), tuberal_region_of_HTH (642), ventral_anterior_nucleus_of_thalamus (820), ventral_lateral_nucleus_of_thalamus (878), ventral_posterior_lateral_nucleus (442), ventral_posterior_medial_nucleus (186), white_matter_of_forebrain (44,758), white_matter_of_hindbrain (14,264), zona_incerta (314)

and `optic_chiasm` (3,706), one piece.

## The ones CW needs first

| Wanted | Result | Name in the model | Sides |
|---|---|---|---|
| The cortex as a whole | **Not found** as one part | about fifty gyri a side | |
| Precentral gyrus | Found under another name | `primary_motor_cortex` | L, R |
| Postcentral gyrus | Found | `postcentral_gyrus` | L, R |
| Occipital cortex round the calcarine fissure | **Not found** as its own part | the fissure is the fold between `cuneus` and `lingual_gyrus`; `occipital_pole` caps the back | L, R |
| Hearing cortex on top of the temporal lobe | Found | `transverse_temporal_gyrus_Heschls_gyrus`, with `planum_temporale` beside it | L, R |
| Caudate | Found, in three parts | `head_of_caudate`, `body_of_caudate`, `tail_of_caudate` | L, R |
| Putamen | Found | `putamen` | L, R |
| Globus pallidus, outer | Found | `external_segment_of_globus_pallidus` | L, R |
| Globus pallidus, inner | Found | `internal_segment_of_globus_pallidus` | L, R |
| Subthalamic nucleus | Found | `subthalamic_nucleus` | L, R |
| Substantia nigra | Found, coarse (118 triangles) | `substantia_nigra` | L, R |
| Thalamus | Found | `thalamus`, which has the outline of the whole, and 15 named nuclei inside it | L, R |
| Lateral geniculate body | Found, separate | `dorsal_lateral_geniculate_nucleus` | L, R |
| Hippocampus | Found, in three parts | `head_of_hippocampus`, `body_of_hippocampus`, `tail_of_hippocampus` | L, R |
| Amygdala | Found | `amygdaloid_complex` and nine named pieces of it | L, R |
| Cerebellum | Found, in four parts | `lateral_hemisphere_of_cerebellum`, `paravermis_of_cerebellum`, `cerebellar_vermis`, `cerebellar_deep_nuclei` | L, R |
| Brainstem | **Not found** as one part | about a dozen pieces: midbrain tegmentum, cerebral peduncle, the colliculi, the pons in two parts, the medulla in three, the olive | L, R |
| Corpus callosum | Found, as two halves | `corpus_callosum` | L, R |
| Optic nerve | **Not found** | | |
| Optic chiasm | Found, added by HuBMAP | `VH_F_optic_chiasm` (`VH_M_` in the male file) | one piece |
| Optic tract | Found | `optic_tract` | L, R |

Also there, and likely to be wanted: `nucleus_accumbens`, `red_nucleus`, `claustrum`, `fornix`, the optic radiation (under the name `frontal_pole`; see the ring above), the lateral ventricles in five parts, and the insula.

## Left and right

Two whole hemispheres. HuBMAP mirrored the atlas's one half, and the two sides are separate parts, so one side can be lit alone.

Three small faults, none serious:

- **The labels are on the wrong sides.** By the glTF rule (up is +y, front is +z) the brain's left should be at +x. The parts named `_L` are at −x. Because the two halves are mirror twins this costs nothing: flip x, or swap the letters. The viewer flips x.
- **Six left parts are filed under the right hemisphere's group** in the file's tree (hypothalamus, midbrain tegmentum, red nucleus, inferior colliculus, mammillary region, subthalamic nucleus). The names are right. It matters only if code trusts the tree.
- **The brain is not at the origin.** It sits where a head would be in the Visible Human body, in metres, 136 × 146 × 167 mm. It needs centring.

## The folds

The outer surface shows real gyri and sulci. The central sulcus, the Sylvian fissure and the frontal and temporal gyri are all where they belong, which is why the two strips can be lit in their true places (pictures 8 and 9). The folds are **soft rather than crisp**. The atlas was drawn on an average of 152 brains, and averaging rounds the folds; the sulci are shallow grooves, not deep clefts.

There is **no single outer surface**. The cortex is about fifty closed pieces a side, one per gyrus, with seams where they meet. The seams are tight: no gaps show at this size.

A clean shell can be made from them, and the pictures already do it without building anything. The trick is to draw the cortex twice: first into the depth buffer only, then in colour, so that only the nearest layer of cortex is ever painted. The inner walls between gyri vanish and the pieces read as one sheet of glass. For most uses that is enough. If a true single surface is wanted (for a silhouette, or a head to wrap round it), it would have to be made, by joining the pieces in Blender or by borrowing Brainder's.

## Size

- Each GLB: **12.0 MB**. 656,268 triangles, 324,855 points.
- Largest parts, per side: white matter of the forebrain 44,758 triangles; superior frontal gyrus 20,300; white matter of the hindbrain 14,264; middle frontal gyrus 13,462; lateral cerebellum 11,928; primary motor cortex 11,082.
- The inner parts are small: thalamus 5,702; head of caudate 2,466; putamen 2,098; outer pallidum 638; inner pallidum 454; subthalamic nucleus 204. They are smooth enough at lab size but would show facets filling a screen.

## Fit for the web

The tool was **gltfpack 1.3** (meshopt), run from a scratch folder. Nothing was installed into the project.

| Copy | Triangles | Size | What was lost |
|---|---|---|---|
| `allen-f-full-meshopt.glb` | 656,268 | **3.0 MB** | nothing to the eye; positions rounded to 16 bits |
| `allen-f-half.glb` | 405,338 | 1.9 MB | very little |
| `allen-f-quarter.glb` | 231,076 | **1.1 MB** | the folds a little softer and flatter; see picture 10 |

So the aim of a few megabytes is met **without simplifying at all**. The simplified copy asked for is the 1.1 MB one. I asked for a quarter of the triangles and the tool stopped at about a third, where its error limit was reached. All three keep every part's name. A web server's own compression takes another fifth to a quarter off each.

I chose meshopt over Draco because its decoder is small (about 25 KB) and Three.js ships it.

## Terms

- **Allen, by HuBMAP.** *Anyone may use and change it, for any purpose, if they give credit.* CC BY 4.0, since release 1.3. Credit asked: Browne, Kristen, and Heidi Schlehlein. 2024. "3D Reference Organ for Brain, Female v1.4." https://doi.org/10.48539/HBM674.NTLM.353. It adds that the model was made from the Allen atlas (Ding et al. 2016).
- **Allen source volume.** *The same.* CC BY 4.0 as of 1 September 2022, by its README. Credit asked: Song-Lin Ding, Joshua J. Royall, Susan M. Sunkin, Benjamin A.C. Facer, Phil Lesnar, Amy Bernard, Lydia Ng, Ed S. Lein (2020). "Allen Human Reference Atlas – 3D, 2020," RRID:SCR_017764, version 1.0.0. © 2019 Allen Institute for Brain Science. A caution: the Allen Institute's general citation policy speaks of noncommercial use. The README's CC BY 4.0 is specific to this atlas and newer, and CC BY allows commercial use. If it ever matters, ask them.
- **The MRI template (ICBM 2009b, McGill).** *Free to use, copy, change and pass on, if the copyright notice goes with it.* Notice: Copyright (C) 1993–2004 Louis Collins, McConnell Brain Imaging Centre, Montreal Neurological Institute, McGill University. CW would be using shapes drawn on the template, not the template, but the notice costs one line and I would carry it.
- **Brainder.** *Anyone may use and change it if they give credit and share what they make from it under the same licence.* CC BY-SA 3.0. Credit asked: "by Anderson Winkler … licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License. The original work can be found at https://brainder.org/brain-for-blender." The share-alike rule is the thing to weigh: a CW brain model built from Brainder would itself have to be given away under that licence.
- **BICAN basal ganglia (not fetched).** It lives at https://brain-map.org/consortia/hmba/hmba-release-basal-ganglia, under *Brain structures and templates in 3D space*: parcellations of the basal ganglia on a population-averaged MRI template, to view and download, and also on BALSA for Connectome Workbench. The page does not state a licence; it says licensing is in the Brain Knowledge Platform's Data Catalog. It does not state a file format either. BALSA usually means Workbench scene files with NIfTI and GIFTI inside, but I did not check.

## The glass: how it was done

Three.js r170, in `atlas-sources/brain/viewer/index.html`.

- **One material for everything**, a small shader of my own rather than Three's physical glass. A surface is nearly clear where it faces you and brightens where it turns away, so every fold shows as a pale edge. A soft light from the upper left and a small highlight make it read as smooth and solid.
- **Order.** Inner parts first: sorted far to near, each writing depth, so the near one always covers the far one. Unlit inner parts are drawn faint and write no depth, which is why they always show a little. Then the depth is cleared and the cortex goes on top, nearest layer only, by the two-pass trick above.
- **Lit parts** are 62% solid at the face and solid at the rim, with a little fog by distance, so the far side is dimmer than the near.
- **The ground** is `#041419`, from Two Eyes.

What still looks wrong:

- The glass is **smoky, not clear**. It reads as dark glass with pale edges. The Allen frame is lighter.
- **You cannot see the far half of the cortex** through the near half. Real glass would show it faintly.
- **From the side, the pallidum hides behind the putamen** and shows only as a pale patch (picture 3). That is true anatomy, but it fails "each in its own colour" from that angle. Front-left is fine (picture 4).
- **Lit strips on the cortex look painted on**, more like enamel than lit glass (picture 8).
- The unlit inner parts are a **tangle of pale shells** rather than quiet shapes (picture 1).
- No head, and nothing moves.

The colours are placeholders: blue caudate, green putamen, rose pallidum, violet thalamus, coral hippocampus, green and violet for the strips. No amber anywhere.

## Brainder beside Allen

**What Brainder has that Allen has not**

- **One whole outer surface per hemisphere**, ready made. No seams, no trick needed.
- **Crisp folds.** It is one real person's brain, so the sulci are deep and sharp (picture 11). It looks more like a brain.
- **A part for the cortex round the calcarine fissure** (`pericalcarine`), which is close to "where seeing starts".
- A brainstem in one piece.
- White-matter and inflated surfaces, and two other ways of dividing the cortex, one of which (Destrieux) names the sulci. I did not fetch those.

**What Allen has that Brainder has not**

- **The pallidum in two segments, the subthalamic nucleus and the substantia nigra.** Brainder has one pallidum and neither of the others. For the basal ganglia story this decides it.
- **The thalamus's nuclei, the lateral geniculate among them.** Brainder has one thalamus.
- **A whole caudate.** Brainder's stops short, with no tail.
- The optic chiasm, tract and radiation. Brainder has none.
- A corpus callosum in one arch (Brainder's is five short segments), the fornix, the claustrum, the amygdala's nuclei.
- **A licence with no strings beyond credit.**
- A third of the weight for the same picture: 656,000 triangles against 1.5 million for Brainder's three sets, whose two hemispheres alone are 579,000.
- Mirror symmetry. Brainder's two sides differ, as real sides do. Whether that is a gain or a loss is a matter of taste.

Brainder's cortex pieces are open patches of the surface, not solids, and its sides are named plainly (`lh`, `rh`, `Left-`, `Right-`). All 104 files I fetched are named.

The two could be combined, Brainder's shell over Allen's inner parts, but they are different brains in different spaces and would have to be fitted to each other, and the share-alike licence would then cover the result.

## Open items. Nothing here is decided.

### Which CW name goes with which structure

How the page places each one, and the Allen parts that could stand for it. Michael rules the matches.

| CW name | The page says | Allen parts that could stand for it |
|---|---|---|
| conscious thought | prefrontal cortex, "the front of the brain just behind your forehead" | (true names, after the ring is undone) `frontal_pole`, `superior_frontal_gyrus`, `middle_frontal_gyrus`, the inferior frontal gyrus (two parts), `frontomarginal_gyrus`, the orbital gyri, `gyrus_rectus`, `rostral_gyrus`. The superior and middle frontal gyri run all the way back to the moving strip, so they take in more than prefrontal cortex. The atlas draws no line. |
| where seeing starts | V1, "at the very back of your head" | No part. `cuneus` and `lingual_gyrus`, whose shared fold is the calcarine fissure, with `occipital_pole`. Together they are larger than V1. |
| how many | the intraparietal sulcus, "this fold" | No part: it is a groove. It runs between `supraparietal_lobule` above and `supramarginal_gyrus` and `angular_gyrus` below, and could be drawn along that seam. |
| hearing | auditory cortex, "along the top of the temporal lobe" | `transverse_temporal_gyrus_Heschls_gyrus`. A clean match. `planum_temporale` if a larger patch is wanted. |
| moving | the motor cortex, "this strip" | `primary_motor_cortex`. A clean match. `paracentral_lobule_rostral_part` carries it over the top to the midline. |
| touch | the somatosensory cortex, "the twin of the moving strip, just behind it" | `postcentral_gyrus`. A clean match. `paracentral_lobule_caudal_part` at the midline. |
| reading | the visual word form area, "on the underside of the brain" | No part. It is a spot in the left fusiform gyrus: `occipitotemporal_fusiform_gyrus_temporal_part` or `lateral_occipitotemporal_fusiform_gyrus_occipital_part`. The spot would be placed by hand inside one of them. |
| experience | the hippocampus | `head_of_hippocampus`, `body_of_hippocampus`, `tail_of_hippocampus`. A clean match. |
| getting better at things | the basal ganglia | the caudate (three parts), `putamen`, both segments of the pallidum. To rule: whether `nucleus_accumbens`, `subthalamic_nucleus` and `substantia_nigra` are counted in. |
| the words you know | Wernicke's area, "along the top of the temporal lobe, mostly on the left" | No part. The back of `superior_temporal_gyrus` with `planum_temporale`, left side; some accounts add `supramarginal_gyrus` and `angular_gyrus`. The atlas does not divide the superior temporal gyrus front from back. |
| the switchboard | the thalamus | `thalamus` and its 15 nuclei. A clean match. |
| smoothness and balance | the cerebellum | `lateral_hemisphere_of_cerebellum`, `paravermis_of_cerebellum`, `cerebellar_vermis`, `cerebellar_deep_nuclei`. A clean match. |

Six clean matches, two that fit loosely (conscious thought, where seeing starts), four with no part of their own.

### The wiring

No atlas here has pathways. The landmarks for the road from the eye, in order (pictures 12 and 12b):

1. **The eye and the optic nerve: missing.** The road would have to start in empty space ahead of the chiasm.
2. **Optic chiasm:** there, one piece.
3. **Optic tract:** there, left and right, running back from the chiasm.
4. **Lateral geniculate body:** there, left and right, at the end of the tract.
5. **Optic radiation:** there, left and right, once the names are put right: a broad sheet from the geniculate back toward the occipital lobe.
6. **Calcarine cortex:** no part, but the fold between `cuneus` and `lingual_gyrus` marks where it is.

So the road can be pinned at five true places. Only the first stretch, eye to chiasm, would be drawn by hand.

### The head

Wanted, not looked for. Worth knowing for later: this brain is already sized and placed to fit HuBMAP's Visible Human bodies, which come from the same library.

### The colours

Not settled. See *The glass*.

## What I would do next

Without doing any of it:

1. **Michael looks at picture 4 beside the Allen frame** and says what is wrong with the glass. That decides whether the look needs a bench of its own.
2. **Rule the twelve matches**, at least the six clean ones.
3. ~~Identify the misnamed part.~~ Done, the same day: eight names in a ring, all identified. What remains is to tell HuBMAP, if Michael wishes; it is their file's fault, not the atlas's.
4. **Decide the shell:** the drawing trick as it stands, a joined surface made in Blender, or Brainder's with its licence.
5. **Decide what to do about the three parts the atlas lacks** that the page already names: where seeing starts, reading, the words you know. Either hand-placed patches on the glass, or Brainder's `pericalcarine` for the first.
6. Then a bench: the 3.0 MB copy, centred and flipped, the eight names put right, the glass, and one signal along the five landmarks.

## To turn it with the mouse

    cd /Users/michaelchabin/_CW/atlas-sources/brain
    python3 -m http.server 8791

then open http://localhost:8791/viewer/index.html. Buttons light each set, change the view and swap in the simplified copy or Brainder.

## What was checked, and what was not

- `index.html` was opened from disk in Safari, as a double-click would. The page came up and its first picture showed. I could only see the top of the page there, so the others were checked by script: each file the page names is present, is a PNG, and is 1,024 × 768. All the pictures were also looked at as they were made, or their near twins were.
- The pictures were made in the app's browser pane, on this Mac's graphics. **Nothing was tried on an iPad**, so "loads comfortably on an iPad" rests on file size and triangle count, not on a test.
- The male file was listed and measured but not drawn, and its names were not checked against the volume; it has the same parts in the same order, so the same ring is expected.
- Pictures 3, 4, 12, 12b and 13 were made after the names were put right. The rest were made before; the only difference would be the tiny posteroventral putamen, unlit, in picture 10.
- The board has a dated note. MANIFEST is untouched, since nothing went into `cw-deploys/`. Nothing is committed.

## Checksums

`shasum -a 256`. A file cannot hold its own sum, so the report's is of everything above this heading:
`sed '/^## Checksums$/,$d' Report-Survey-Brain-Atlas-01.md | shasum -a 256`

- `Report-Survey-Brain-Atlas-01.md`, above this heading: `ba0894662c4e12bdee22fddc5d609ca6fdc601d8d53848ef8afadb1e38fd0146`
- `Survey-Brain-Atlas-01/index.html`: `704f73154d33a6f1b97bcd4f5d64684252f523f611d15eef35b379c64f97d9ec`
