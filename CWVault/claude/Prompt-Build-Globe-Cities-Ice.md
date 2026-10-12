---
status: Written 12 Oct 2026, evening, in a Claude chat with Michael on the iPad, from Rulings *The one timeline* 14 (his answers to the board's open items of 12 Oct). Run once, 12 Oct: Claude Code's reading is the section *Amendments* at the foot; Michael's answers and a seventh part (molten to black, twice) added the same night, late. Built in his order on the branch `globe-cities-ice` (not pushed): parts 6, 4, 2, 1 and 7 done and checked, awaiting his look; then 3 and 5.
role: The next brief for `active/time-machine.html`, `globe.js` and the map: textures on the globe and the plates, the cities option, the finished zoom, the ice layer, and the plan (not the build) for the Edge of Knowing story and its stripes interactive.
related: Rulings-Sept-2026.md (14), Prompt-Build-Timeline-Stack.md, Spec-Maps.md (the ice, 29 Sep), Plan-Deep-Time.md, Ideas-Ledger.md (The edge of knowing, 5 Oct), Time-Machine-Shape.md, 03-SEEDS/plate-tectonics.md
---

# Prompt: the globe's skin, the cities, the zoom, the ice

Paste everything below the line.

---

Read first: `CWVault/00-BOARD.md` (the entries of 12 Oct), `CWVault/claude/Rulings-Sept-2026.md` item 14, the 29 Sep ice section of `CWVault/claude/Spec-Maps.md`, and `CLAUDE.md`. This brief is Michael's rulings of 12 Oct evening. Where it is silent, the standing method holds: build on a branch, check on the Mac and at 375 px, record in MANIFEST, the Rulings and the board, and wait for his "go" before main moves.

Before you build, read this brief back to me: list what you understand each part to mean, what you would do first, and every question you have, as a section *Amendments, 12 Oct* at the foot of this file. Then stop and wait for my answers.

## 1. Textures on the globe and the drifting pieces

The 9 Oct "out for now" (Rulings 11) is lifted. Give the globe a skin: the drifting pieces in `stories/plates/continents.json` textured as land, the sea as sea, the atmosphere rim at the limb, and the per-pixel globe if that is what the skin needs. This is engine work in `globe.js`, not a setting. Keep the standard view and the drag of Rulings 3. Through Molten the fade magma to black to blue of 12 Oct stays; the skin comes in as the oceans do. Tell me what the texture costs on a phone before you commit to it, and offer a cheaper look if it is heavy.

## 2. The zoom, finished

When she taps an event and the flat map zooms to its place (the box about 2,000 km across, built 12 Oct), the map then shows every other event of the currently open line whose place falls inside the box, each as a place she can tap. Tapping one makes it the event, with its summary above the map as now, and the map re-centres only if the new place is near the box's edge. Events of lines not open are not shown. Say how many events this is at the crowded end (the last 12,000 years) and whether the labels need thinning.

## 3. Cities on the moving continents

An option she can turn on from the column, off by default: a dozen modern cities ride the continents as they move. Each city is a point pinned to its plate in `continents.json` and turned with the plate's rotation, exactly as the plate's outline is. The cities: San Francisco, Mexico City, Montreal, Buenos Aires, Paris, Moscow, Nairobi, Delhi, Beijing, Tokyo, Melbourne, and one more if some plate wants a marker (suggest it). A city fades out before its continent exists as a piece in the model, and does not float. Before about 200 million years the frame is paleomagnetic and longitudes are the model's guess; say so in How this works, in one line, in CW's voice. San Francisco and Mexico City sit on complicated ground: assign each to the plate the model gives its point today, and tell me what that does to them.

## 4. The ice layer

In now. The source is the PMIP4 redistribution of ICE-6G_C (the CMIP6 / PMIP4 ice-sheet data page), not Professor Peltier's own site; the letter to him is no longer waited on. The outlines already traced in `prototypes/ice/ice-outlines.json` (48 steps to 26,000 years ago) are the start: check they match the PMIP4 copy, rebuild from it if they do not, and move them from prototypes into the stories data. `map.setIce` draws them as the timeline drives `map.setTime`. Cite on the page: Peltier, Argus and Drummond 2015, ICE-6G_C, via PMIP4. Record the source and the citation in Spec-Maps.md beside the 29 Sep entry.

## 5. The Edge of Knowing — plan only

The Edge of Knowing (Ideas-Ledger.md, 5 Oct) is a gallery story. Its lab is an interactive on the seafloor stripes: she sees the pattern of magnetic stripes either side of a ridge, and from it reconstructs where a drifting continent was at a chosen age. Do not build it in this session. Write the plan as `claude/Plan-Edge-of-Knowing.md`: what the interactive shows, what she does with her hands, what data it needs (the stripes, the plate rotations we already have), where it sits in the Time Machine and the gallery, and what the story's words would have to carry. The story's words themselves come through the pool later.

## 6. Two small things

"Earth" without the article is my wording; change the tree (`Periods-Deep.md`, `stories/deep-time-periods.json`) to match wherever it says The Earth as a name. The ka unit below a million years stands.

## Records

MANIFEST for every file touched; Rulings 14 marked built where it is; the board's entry of 12 Oct evening updated with the report; screenshots to `Claude outputs/time-machine-12oct-*`; the two benches at a new `?v=`.

## 7. Molten to black, twice (added 12 Oct, late)

The fade through Molten (magma to black by 4.4, blue by 4.0) becomes a crust that freezes in rafts, and it happens twice. The maps are in `prototypes/globe-textures/`, made by `molten.py` there: `cooling-order.png`, a 2:1 grayscale where dark cools first and light stays molten longest, and `cracks.png`, the seams between the rafts. Crust is drawn wherever cooling-order is below a threshold that rises with the age; the cracks glow in MAGMA_GLOW and dim as the threshold rises. The five `molten-NNNN.png` are that recipe baked, to look at, not to ship. The maps were built from noise on the sphere, so no seam and no pinch at the poles.

The sequence, with the ages as the events store has them: the Earth assembles molten at about 4.57; crust within a few million years, black; whether there was an ocean before the Moon is not known, so a faint, uncertain blue that a line in How this works owns up to; at *Moon forms* (4510 in the store) a white flash, and the whole globe is molten again, with a different seed so the second crust is a different crust; black again, and blue by 4.4, which the Jack Hills zircons vouch for. The globe does this as the knob moves; the Molten band itself cannot show it. Link the sequence to the *Moon forms* event, and leave a hook for the gallery stories that will come about it. Measure the cost of the threshold draw with the rest of part 1; it is one lookup per pixel, no trig beyond what the skin already pays.

## Michael's answers, 12 Oct, late

1. The skin: today's picture for *measured*; neutral rock for *guessed*, with the climate wash as the only colour. Yes, give the flat deep map the same skin.
2. Guessed and invented: keep the pale dashed and dotted fills, no skin.
3. The zoom: the ground map only, now; list marks on the deep flat map as engine work for later.
4. San Francisco: pin it to North America, which is where the city sits today (east of the San Andreas), and fade it out at 150 million years when its ground arrives; one line in How this works says that the ground under it is a sliver of ocean floor scraped onto the continent, and that is a story for later. The twelfth is Riyadh.
5. The ESGF copy, with the citation line as you wrote it, no licence word.
6. One look after part 1, since it decides between the cheap rim and the per-pixel skin, and one look at the end for the rest.

---

## Amendments, 12 Oct (Claude Code's reading, before building)

Read: the board's entries of 12 Oct, Rulings 14, Spec-Maps *The ground changes with the year* (29 Sep, the sea, the ice), CLAUDE.md; and on disk `globe.js`, `map.js` (`setIce`, `fit`, the deep view), `stories/plates/continents.json`, `prototypes/ice/ice-outlines.json`, the events store, the tree. Nothing is built. The order I would take, smallest and surest first: **6** (the rename), **4** (the ice: the drawing exists, it is data and a citation), **2** (the zoom), **3** (the cities), **1** (the skin, the largest), **5** (the plan, written last from what the others taught). One branch, one look at the end, unless you want a look after each part.

### 1. The skin — what I understand, what it costs

**What it means.** Today `globe.js` fills each drifting piece as a flat path in one land colour on a gradient sea, with the coast and the graticule stroked over it. A skin means the ground's own picture rides on each piece: the piece is a present-day outline, so the pixels under it in today's world picture (`art/maps/world.webp`, 1024 × 512, or level 1 of the pyramid at 2048 × 1024) are the piece's skin, turned with the plate. The sea stays the gradient it is, deeper toward the limb; the atmosphere rim is a thin pale-blue haze just inside and outside the limb. The standard view, the drag, the tilt limits and the Molten fade all stay; the climate wash multiplies over the skin as it does over the flat colour.

**How it would be done** (the per-pixel globe, which the skin needs): for every pixel of the disc, invert the orthographic projection to a point on the sphere at the chosen age; read which piece is there from an id raster (the pieces drawn once per age change into an offscreen equirectangular canvas, the way `interiorPoints` already rasterises the land); invert that piece's plate rotation to find the point's place today; sample the world picture there. Everything drawn as lines today (coast, shelf, graticule, dashed edges, islands) stays as paths over the top.

**What it costs.** The disc is at most 560 px: 246,000 pixels, four times that at a Retina ratio of 2. Per pixel it is a square root, two inverse trig calls, one 3 × 3 multiply and two texture reads. My estimate, to be measured on the first build: 20 to 40 ms a draw on the Mac, 100 to 250 ms on a 2017 iPad at full resolution. That is fine for a draw at rest (the marker moves, the age changes) and too slow for a drag at 60 frames. So: during a drag draw at half resolution or fall back to the flat colours, and render the skin when the finger lifts. On a phone the disc is 375 px and the cost a quarter. Memory is small: one 1024 × 512 id raster and the picture.

**Cheaper looks, if that is heavy:** (a) the rim and a limb shading only (a radial darkening toward the edge, a haze ring), over the flat fills as they are: nearly free, and it already reads as a globe; (b) a procedural skin, a canvas pattern of fine hatching or noise in the land colour, no per-pixel work; (c) the real skin at rest only, (a) during drag. I would build (a) in any case and the real skin behind it.

**Questions.**
- The skin is *today's* ground: the Sahara's ochre rides with Africa to 500 million years, the Himalaya's height to before India arrived. Honest as "the rock you can stand on today", wrong as a picture of then. Do you want today's picture as the skin, or a neutral rock texture (one tone with relief-like grain) that says nothing about climate, with the climate wash the only colour? I lean to the neutral texture for *inferred* and older, today's picture for *measured* (to 200 million years), and will build both switches if you do not choose.
- Guessed and invented land (past the model's reach): keep the pale dashed and dotted fills, no skin, so the grade still shows at a glance? I would.
- The per-pixel path changes how the flat deep map (`projection: 'flat'`) draws too, since it shares the code; I would give it the same skin.

### 2. The zoom, finished — what I understand

After a tap zooms the flat map to the box (about 2,000 km across, 22° of longitude by 13° of latitude), every other event of the deepest line whose place falls inside the box shows as a tappable place with its name; a tap on one makes it the event (summary above the map, marker to its year); the map re-centres only if the new place lies in the outer part of the view. I would take "near the edge" as the outer 15 % of the box's width or height. Events of lines not open do not show, which today's `markMap` already does by period; this narrows it to the box.

**The crowded end.** 110 after-the-ice events have places. The worst box is the one round Ötzi (the Alps, northern Italy): 26 events inside it, Copper and the Wheel to Frankenstein, the first photograph and Faraday's ring; the boxes round Volta, Frankenstein and the first web page hold 25. So yes, the labels need thinning: the map's own placer already drops the labels that do not fit, heaviest first, and keeps every mark tappable; I would let it, and name only what fits. Deep events: 70 of 74 have a place (`placeNow`, where the evidence is today), spread over the world, at most a handful per box.

**Question.** Past the seam (older than 2.6 million years) the map is the deep view, and `map.js` draws no marks over it ("nothing of the map responds" there). Is part 2 for the ground map only, which is where the after-the-ice and ice-age events live, or do you want marks on the deep flat map too? The second is engine work in `map.js`; I would do the first now and list the second.

### 3. The cities — what I understand, and what the model says

A word *Cities* in the column under Map, off by default. Each city is a point in today's coordinates, assigned to the piece it lies in, turned with that piece's plate exactly as the outline is (`plateMatrixAt`), drawn as a small dot with its name, fading out over the last twenty million years before the piece's birth (`from`) and absent before it. For the *guessed* ages the city goes where the guessed piece goes; for *invented* there are no pieces and no cities. One line in How this works: before about 200 million years the model knows how far north a place was, not how far east, so a city's east-west place is the model's one guess.

**What the model gives each city today** (point-in-piece, checked on disk):
- Montreal — Humber (plate 101, born 1,500 Ma). Buenos Aires — Paraná basin (22041, 1,800). Paris — Armorica (305, 420). Moscow — Baltica (302, 3,600). Nairobi — East African Orogen crust (709, 600). Delhi — Aravalli craton (501, 3,300). Beijing — Trans-North China Orogen (601, 1,800). Tokyo — Kanto (629, 250). Melbourne — Lachlan (801, 450).
- **Mexico City** lies in two overlapping pieces, Mexico (plate 104) and Guerrero (215), both born 250 Ma; their plates carry identical rotations as far as I checked, so either gives the same path; I would pin it to Mexico (104). It fades out at 250 million years, before One continent ends.
- **San Francisco** lies in **no piece**: the model's pieces are the old blocks, and the Coast Ranges are not among them. The nearest is Baja California (plate 105, born 150 Ma), half a degree away. Pinned there it rides with Baja, which the model moves with the Pacific side, and it vanishes at 150 million years. Pinned instead to the North American craton it would stay with Montreal. Neither is the truth, which is that the ground under it is a sliver of ocean floor scraped on. **Your call:** Baja (the model's answer), North America (the plain answer), or Los Angeles in its place (same ground, same problem) — or drop the Pacific coast and say why in How this works.
- **The twelfth:** Riyadh, on Arabia (plate 5031, born 550 Ma). Arabia parts from Africa thirty million years ago and the Red Sea opens between it and Nairobi: a drift a child can watch. The alternative is Reykjavik or Honolulu, but both are on ocean floor and in no piece.

### 4. The ice — what I understand

`map.setIce(outlines, yearsAgo)` and the `time.ice` hook already exist in `map.js`; the page passes nothing to them. The work is data: `prototypes/ice/ice-outlines.json` (48 steps, every 500 years to 21,000 then every 1,000 to 26,000; 597 KB; "the one-degree ice-area fraction, less today's, traced at one half") moves to `stories/ice-outlines.json`, the page hands it to the map's `time`, the `.gitignore` line for `prototypes/ice/` and the file's "not for publication" note go, the page carries the citation, and Spec-Maps records the source beside the 29 Sep entry.

**Checking against PMIP4.** No tool that traced the outlines is on disk (`tools/` has only `plates-from-gplates.py`), so "check they match" means fetching the PMIP4 copy of ICE-6G_C and tracing it again with a new `tools/ice-from-pmip4.py`, then comparing; if the trace is the same the file is the same. That script is the honest provenance anyway.

**Questions.** Which PMIP4 page exactly — the PMIP4 ICE-6G_C boundary-condition files on the ESGF (`sftgif`, the ice fraction, one degree, 0 to 26 ka), or the LSCE PMIP4 page? I will take the ESGF copy unless you say otherwise. And the licence line for the page: PMIP4's redistribution is under CMIP's terms (unrestricted with attribution); I would write "ICE-6G_C (Peltier, Argus and Drummond 2015), via PMIP4" with no licence word, as the brief says, unless you want the terms named.

### 5. The Edge of Knowing — the plan

Understood: no build; `claude/Plan-Edge-of-Knowing.md` with what the stripes interactive shows (a ridge, the stripes mirrored either side, the reversal timescale as the ruler), what she does (slides a continent's edge along the stripes until the pattern on the floor says how far it has come at a chosen age; measures with the same two-ended window), what data (the reversal timescale, the stripes as ages of the floor — the model's plate rotations we have give the answer to check against; the floor ages need a source, probably Müller et al.'s seafloor age grid, to be found), where it sits (a lab reached from the globe's *measured* word and from the gallery as the story's tool), and what the words must carry (Wegener, the stripes, the zircons, the dot and tail). No questions; the picture and the gallery frame are yours.

### 6. The rename

"The Earth" as a name is in three places: `Periods-Deep.md` line 20 (the entry and its label), the root of `stories/deep-time.json`, and nowhere in `deep-time-periods.json` (its one "the Earth" is prose). I change the first two, regenerate nothing (the root has no words in the periods store), and remove the article-stripping line I put in `deep-time.js` on 12 Oct, since the tree will say it. The ka unit stands.

### Records, and one thing of my own

MANIFEST for every file, Rulings 14 marked built part by part, the board's entry, screenshots, both benches at `?v=2026-10-13`. One thing of my own: the skin and the cities both want the plate rotation inverted and applied to single points, which the module does not have yet; that one function (`plateMatrixAt` inverted) serves both, so part 3 is cheaper once part 1's groundwork is in, which is another reason to build 1 before 3 if you want both soon — but I would still show you the cheap rim first.

**Waiting on:** your answers to the skin's three questions, the zoom's one, San Francisco and the twelfth city, the PMIP4 source, and whether one look at the end or one per part.
