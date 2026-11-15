# models/brain — the Curious Woods brain

One brain for every page that needs one. Placed here 15 Nov 2026 for `experiments/brain-bench.html`.

- **`allen-f-full-meshopt.glb`** (3.0 MB) — the Allen Human Reference Atlas, 3D, 2020, as HuBMAP's 3D Reference Organ for Brain, Female, release 1.4. 283 named parts, every triangle kept (656,268), packed with gltfpack 1.3 (`-kn -cc -vp 16`, meshopt). The file itself is never renamed or edited. A page that loads it centres it, scales it, and flips x so that the parts named left are on the left.
- **`allen-true-names.json`** — eight lines. Eight parts in HuBMAP's file wear each other's names; this puts them right as the model loads.
- **`brain-names.json`** — Curious Woods' names, on top of the atlas's own. `names` is the CW names, each pointing at parts and marked true part, loose fit or placed by hand. `parts` gives every part's exact atlas name and a common name; a common name marked *proposed* has not been read by Michael. `placed` and `road` hold what CW adds by hand (the eyes, the optic nerve) and the road the signal runs.

How the survey found all this: `CWVault/claude/Report-Survey-Brain-Atlas-01.md`. The original downloads are in `_CW/atlas-sources/brain/`, outside git.

## Credit, which must travel with the model

- Browne, Kristen, and Heidi Schlehlein. 2024. "3D Reference Organ for Brain, Female v1.4." https://doi.org/10.48539/HBM674.NTLM.353 (HuBMAP). Licence: CC BY 4.0. Changed here: repacked; and, as it loads, centred, mirrored left for right, and eight part names put right.
- Made from: Song-Lin Ding, Joshua J. Royall, Susan M. Sunkin, Benjamin A.C. Facer, Phil Lesnar, Amy Bernard, Lydia Ng, Ed S. Lein (2020). "Allen Human Reference Atlas – 3D, 2020," RRID:SCR_017764, version 1.0.0. © 2019 Allen Institute for Brain Science. Licence: CC BY 4.0.
- The atlas was drawn on the ICBM 2009b template: Copyright (C) 1993–2004 Louis Collins, McConnell Brain Imaging Centre, Montreal Neurological Institute, McGill University.
