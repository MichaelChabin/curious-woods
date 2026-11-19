---
status: Report, 18 Nov 2026, a Claude Code session, on Michael's survey prompt of 18 Nov (from the "time lab review" chat; pasted whole, its status line still DRAFT). A survey. Nothing is wired into the Time lab; no shared script changed. Not committed, as the prompt asks.
role: Whether Scotese and Wright's paleoDEMs, Kocsis and Scotese's paleocoastlines and the Paleobiology Database can give the Time lab's Earth its shallow seas and its fossils, tested on one bench at 262 Ma and 69 Ma, with T. rex end to end.
related: Lab-Time-01.md, Spec-Earth-3D.md (Open: Scotese), Report-Time-Lab-Bench-08.md, Timeline-Stories.md, Plan-Life-in-Deep-Time.md, Life-Drawing-Style.md, Creature-Trex-Finds-01.md, cw-deploys/experiments/ancient-seas.html
---

# Survey: ancient seas, and fossils where they lay

## 19 Nov 2026: the blank Earth, the publish, and Michael's six answers

A Claude Code session, on Michael's prompt `claude/Prompt-Publish-Ancient-Seas-01.md`.

### What the blank Earth was

**It is the shared script, `js/3d/earth.js`, meeting a limit of the graphics device.** It is not the data and not the way the page was opened. The macOS update (27.2.1, installed 19 Nov at 9:34) is the likely trigger, not the cause.

1. **What I saw**, in a fresh tab over `localhost`, before changing anything. `experiments/time-lab.html` opens and draws: the Earth of today, the mosaic, the line. Set to 262 Ma, its Earth is a plain blue ball. `experiments/ancient-seas.html` at 262 Ma shows Scotese and Wright's Earth on the left and a plain blue ball on the right, with the *New Mexico* ring and name drawn. So it failed for me exactly as it did for Michael.
2. **What the console says.** On WebGPU: *The number of sampled textures (17) in the Fragment stage exceeds the maximum per-stage limit (16)*, then a stream of *Invalid BindGroupLayout* errors, one set a frame. On WebGL (`?gl=1`): *FRAGMENT shader texture image units count exceeds MAX_TEXTURE_IMAGE_UNITS(16)*. The land's shader is refused, so the pieces are not drawn and only the sea ball shows. The overlay (the ring, the name) is a separate 2D canvas and is not affected.
3. **Why 17.** Close in, the land's shader reads 17 pictures: the grain, the cooling order, the old ground, the vegetation, Blue Marble, two sea masks, the floor, three page tables, two tile arrays, two close ice fills, and the two ice slots. three.js gives one binding to two slots that hold the same picture. So the count is 16 while the two ice slots hold the same mask (or both hold nothing), and 17 when they differ. At 262 Ma they differ. 262 Ma falls at the end of the late Paleozoic cold age, so `setTime` asks `icePairs` for the ice, and beyond 26,000 years `icePairs` returns one pair: the 26,000-year outline in slot 0, at weight 0, and nothing in slot 1.
4. **Why it drew on 18 Nov and not on 19 Nov.** The count is fixed when a material is first drawn after it is built, and the materials are rebuilt whenever Blue Marble arrives at a new size (at load, and at every change of tier). I tested this in the page. Rebuilt at 100 Ma, where both slots are empty, the land draws, and it goes on drawing when the age is then moved to 262 Ma. Rebuilt at 262 Ma, it is refused. So whether the Earth draws depends on which age the page was at when its materials were last built and first drawn. That is a matter of timing. After the update the pane measured a different tier on each of three loads (*full*, *middle*, *floor*), which fits shader caches emptied by the update and slower first frames. I could not go back to 18 Nov to prove the order of events that day; the 17 against 16 is certain, the trigger is my best reading.
5. **What this means for the Time lab.** `time-lab.html` has the same fault and I did not touch it. Its Earth can go blank at any age where the two ice slots differ: inside a deep cold age past 2.6 Ma, and between two steps of the ice ages this side of it. A blank Earth stays blank until the materials are rebuilt at an age where the slots agree.

### The fix made, and the fix owed

**Made, inside `ancient-seas.html` only** (the prompt's step 3): a few lines before the module ask the device for 18 sampled pictures where the adapter has more than 16 (this Mac's has 48). With it both Earths draw at 262 Ma, at 30 Ma on the journey, and after a rebuild at 262 Ma, which is the case that failed. Nothing else in the bench changed. A WebGL device has 16 and no more, so this does not help one.

**Owed, in a shared script, and not made** (the prompt says to report first). Two ways:
- **In `earth.js`: bring the land's count down to 16 or fewer for good.** For example, the two sea masks in one picture (red and green), or the grain and the cooling order in one. This is the better fix. It works on WebGL as well, so it covers older iPads, and it removes the dependence on timing.
- **In `scene.js`: ask the device for more, as this bench now does.** One place, a few lines, but WebGPU only.

Either needs Michael's word, and a walk through the ice ages and the deep cold ages afterwards.

### What was committed

The survey's files only, as the prompt lists them: `cw-deploys/experiments/ancient-seas.html` (with the fix above and its version line), `cw-deploys/experiments/ancient-seas/`, this report, `Creature-Trex-Finds-01.md`, the `Ancient-Seas-Nov18/` folder, and the survey's own lines in `MANIFEST.md` and the board. `experiments/index.html` has no line of the survey's (the bench is hung nowhere), so nothing of that file was committed; its uncommitted edits are another session's. The other sessions' edits and deletions were left alone.

### Michael's answers to the six questions (recorded; none built in this step)

1. **Which sea:** flooded to Kocsis and Scotese's coastline. It is the widest sea of the age, so it will need a word of honesty where it is shown.
2. **The Delaware Basin:** left for the Carlsbad story, with a regional map of its own.
3. **Scotese's plates, 541 Ma to 2.6 Ma:** probably yes. Michael decides after he has seen the bench on the iPad.
4. **The Chicxulub ring at 69 Ma:** mask it.
5. **The Paleobiology Database's licence:** credit them; do not write to them.
6. **69 Ma, not 68:** fine, as long as the label says 69.

---

The bench is `cw-deploys/experiments/ancient-seas.html`. Twenty-two pictures and the working files are in `claude/Ancient-Seas-Nov18/`. The specimen file is `claude/Creature-Trex-Finds-01.md`.

## In short

1. **All three sources are free for us.** The two Scotese datasets are CC BY 4.0. The Paleobiology Database contradicts itself: its policy says CC BY 4.0, but every download from its data service is stamped CC0. Either way we may use it; credit it as if it were CC BY.
2. **The seaway is there, but only in the coastlines.** Scotese and Wright's 69 Ma map of heights and depths has no Western Interior Seaway. Their maps for 75, 80 and 90 Ma show it in full (picture 19). Kocsis and Scotese's coastline for 70 Ma does show it, as a gulf reaching north from the Gulf of Mexico past New Mexico into the Dakotas. That coastline is drawn to the highest sea of the age, using marine fossils. Painted that way (*Sea at its highest* on the bench), New Mexico and the T. rex finds sit on the western shore (pictures 8, 12, 14).
3. **Carlsbad's Permian sea is too small for these maps.** At 262 Ma, Carlsbad falls on land, 360 m above the sea, on an island at Pangaea's western edge. Open shallow sea lies about 60 km away, and Midland, Texas is under 160 m of water (pictures 4, 21). The Delaware Basin is about 200 km across and does not appear as a basin, so its reef is invisible. Neither source will show the rock of Carlsbad Caverns forming.
4. **The two plate models cannot be laid on each other.** Scotese's maps sit on his own plate model, PALEOMAP. At 69 Ma, Merdith's continents sit a median 670 km away from his, mostly in longitude. Turning the whole Earth 8° brings most of that within about 100 km. At 262 Ma no single turn helps: after the best one, the median gap is 250 km and one point in ten is still 700 km or more off. To use the paleoDEMs, the Time lab would need PALEOMAP plates for the years they cover (*What it would take*, below).
5. **T. rex works end to end.** The database holds 70 occurrences of *Tyrannosaurus rex*, 8 of them doubtful. Each is now placed where it lay at 68 Ma in both plate models, and travels along its own path to today on the bench (pictures 12–18). Five famous specimens are in the finds file. Their ages are all *worked out*, not measured at the specimen (see *One creature* below).

## The licences, and the credit lines they ask for

**PALEOMAP PaleoDEMs (Scotese and Wright, 2018).** CC BY 4.0. Zenodo record 5460860 says so, and so does the `License.txt` inside the 1° download. The authors ask for this citation, in their own report: *Scotese, C.R., and Wright, N., 2018. PALEOMAP Paleodigital Elevation Models (PaleoDEMS) for the Phanerozoic. PALEOMAP Project, https://www.earthbyte.org/paleodem-resource-scotese-and-wright-2018/.* DOI 10.5281/zenodo.5460860.

**PaleoMAP PaleoCoastlines (Kocsis and Scotese).** CC BY 4.0, from the Zenodo record's metadata and its readme. The record is 7994000, version 7.3 (published 8 September 2023); the shapefiles inside are labelled v7. The record asks for the paper to be cited: *Kocsis, Á. T., and Scotese, C. R., 2021. Mapping paleocoastlines and continental flooding during the Phanerozoic. Earth-Science Reviews 213, 103463. doi:10.1016/j.earscirev.2020.103463.*

**The Paleobiology Database.** Michael believed it was CC BY 4.0, and that is what the database's policy says. Creative Commons announced it on 19 December 2013 ("Paleobiology Database now CC BY"), and GBIF's copies of the data are listed under CC BY 4.0. But the database's own data service, asked for its terms (`datainfo`), stamps every download today with *data_license: Creative Commons CC0* and the CC0 public-domain link. I found no page on paleobiodb.org that settles which is right. Both licences allow a public, non-commercial site for children. CC0 asks for nothing; CC BY asks for credit. So credit it either way: *Data from the Paleobiology Database (paleobiodb.org), downloaded 18 November 2026.* The database asks that a published paper using its data say so. A web page is not a paper, so this line is courtesy, not obligation.

**The GPlates Web Service** (gws.gplates.org, the University of Sydney), which carried every point between today and the past for this survey. Its pages state no terms of use, only a copyright line. The rotations it applies are the models' own, and each model carries its own licence. The bench never calls the service: every position was worked out once and saved in `trex.json`.

**Not fetched:** Ron Blakey's maps (licensed separately, outside this survey) and Scotese's own coloured PaleoAtlas (`PALEOMAP_PaleoAtlases.zip`, 113 MB, the same record, not needed).

## The elevation maps

**Fetched: the 0.1° set.** It was not withheld on request, as the authors' 2018 report says it once was. Zenodo serves it as `Scotese_Wright_2018_Maps_1-88_6minX6min_PaleoDEMS_nc.zip`, 207 MB. The 1° set came too, 9.3 MB, for comparison. Each set holds **109 maps** from today back to 541 Ma, not the 117 the record's text promises. The others (the Pleistocene steps and the Precambrian) are not in the files. They are netCDF-4. I read them with Python's h5py, so no new tools were needed.

**What the 0.1° is, and is not.** By the authors' account, every map starts as today's heights and depths (6-minute grids) carried back to the age on the PALEOMAP plates. It is then repainted by hand, in 256 grey levels (40 m steps), to match the rocks of that age. So the coasts and the big shapes of the past are hand-drawn at a scale of tens to hundreds of kilometres. The fine texture inside them is today's ground, carried back. Picture 20 shows the 69 Ma map at 0.1° beside the 1°. The tenth-degree map has crisper coasts and islands, but nothing at 1° is missing from it. A side effect of the method shows on the 69 Ma map: a ring at Yucatán that looks like the Chicxulub crater, three million years before the asteroid struck. It is a piece of today's sea floor carried back and not erased (pictures 8, 12; *For Michael*, item 4).

**What plate model the maps stand on.** Scotese's report names it: the PALEOMAP Global Plate Model v2d3 (Scotese, 2016). It also says to place a map on the plates at its *plate model age*, which is not quite its age. The 69 Ma map stands on the plates at 70 Ma; the 262.5 Ma map at 260. The v2d3 rotation file is not in either record (the coastline record has v3 and v19o_r1c). So every point in this survey was carried by the GPlates Web Service's PALEOMAP model (Scotese, 2016). To check that this model and the maps agree, today's coastline was carried to 70 and 260 Ma and drawn over each map. It falls on the maps' coasts everywhere (picture 22), so the two agree.

**Weight.** One 0.1° map is 26 MB as data. Painted in our colours as a 3,600 by 1,800 JPEG it is 0.17 to 0.5 MB, and at 1,800 by 900, about 0.13 MB. The bench carries 18 pictures, 3.4 MB in all: the two moments and today at 3,600, and thirteen steps between 69 Ma and today at 1,800. A painted set for the whole globe, all 109 maps:

| Resolution | Painted (JPEG) | Heights as data (16-bit PNG), for a probe or a lowered sea |
|---|---|---|
| 0.1°, 3,600 × 1,800 | about 38 MB | about 300 MB |
| 0.2°, 1,800 × 900 | about 14 MB | about 90 MB |
| about 0.35°, 1,024 × 512 | about 5 MB | about 34 MB |

**My choice, and why:** 0.2° for the set, with 0.1° kept only for the few moments a story zooms into. The shapes of the past are hand-drawn at a coarser scale than 0.2°, so the step down loses little. The whole ball at the Time lab's size shows no difference. Picture 20 shows what 0.1° adds close in: crisper coasts and islands, not new seas. The heights are needed as data only if the probe or *Drain the Sea* is to read the past, and nothing asks for that yet.

## The bench

`experiments/ancient-seas.html`, standing on `js/3d/scene.js` and `js/3d/earth.js` as the Time lab does. Neither script and nothing in `time-lab.html` changed. The page passes `tools/check-deploys.sh`.

- **Left**, Scotese and Wright's Earth: a ball of our own, painted from the paleoDEM in the house colours. The sea uses Spec-Maps' ramp: pale blue on the shelves, darker over deeper water, nearly navy in the trenches. The land uses the Time lab's quiet green (`paintGreen`), lifting to tan and grey rock with height and never reaching white. Scotese's own palette shades the highest peaks white, which our rule forbids. White appears only at *now*, where today's ice (`art/maps/world-ice.webp`) is laid over the map.
- **Right**, the Time lab's Earth, made exactly as `time-lab.html` makes it, at the same moment.
- **Moment**: *262 Ma*, *69 Ma*, *now*. Each turns both Earths so that New Mexico faces her (an ink ring and the name). From 69 Ma, *now* plays the journey over seven seconds. The left Earth steps through Scotese's maps every five million years, blending each into the next, while each find travels its own path. The right Earth's year runs with it. *69 Ma* plays it back.
- **Sea**: *from the heights* (the map as it is) or *at its highest* (the same heights flooded to Kocsis and Scotese's coastline: outside it is sea, inside is land).
- **Show coastlines**: Kocsis and Scotese's line, thin, at the two moments.
- **Show T. rex**: the 70 finds as vermilion dots, the 8 doubtful ones as rings. They show at 69 Ma and on the journey, on both Earths, each Earth carrying them on its own plates.
- **Reset view.** One finger turns each Earth, pinch zooms, as in the Time lab.

## The pictures

All are in `claude/Ancient-Seas-Nov18/`, made by the page's own readback (the pane shows a WebGPU canvas late). Where two Earths are shown, Scotese and Wright's is on the left and the Time lab's on the right.

**262 Ma, the Permian sea**
- `01-262-heights.jpg`: both Earths, New Mexico facing.
- `02-262-heights-coastline.jpg`: the same, coastline on.
- `03-262-highest-coastline.jpg`: flooded to the coastline. At 262 Ma it changes almost nothing; the heights and the coastline agree.
- `04-262-close-coastline.jpg`, `05-262-close.jpg`: the left Earth close in, line on and off. New Mexico on an island off Pangaea's west coast, shallow sea all round it, no Delaware Basin.
- `21-262-new-mexico-points-flat.jpg`: the flat map with Carlsbad, Guadalupe Peak, Midland, Albuquerque, El Paso and north-east New Mexico marked. Of these, only Midland is under water.

**69 Ma, the Western Interior Seaway**
- `06-069-heights.jpg`: the map as it is, with no seaway.
- `07-069-heights-coastline.jpg`: the coastline on, a gulf drawn across dry land.
- `08-069-highest-coastline.jpg`, `09-069-highest.jpg`: flooded to the coastline, the seaway as a gulf, New Mexico on its western shore. The Time lab's Earth beside it has no sea on North America.
- `10-069-close-highest.jpg`, `11-069-close-heights-coastline.jpg`: close in, both ways.
- `19-scotese-75-80-90-heights.jpg`: Scotese's own heights at 75, 80 and 90 Ma, the seaway in full on each, for comparison with 06.
- `20-resolution-tenth-vs-one-degree-69.jpg`: 0.1° (left) and 1° (right), western North America at 69 Ma.
- `22-check-todays-coast-on-69-map.jpg`: today's coastline carried to 70 Ma, in vermilion, over the 69 Ma map: the plates and the map agree.

**T. rex, and the journey**
- `12-069-trex-highest-coastline.jpg`, `13-069-trex-heights.jpg`: the 70 finds at 69 Ma on both Earths.
- `14-069-trex-close.jpg`: close in, flooded, coastline on. The finds from Montana, the Dakotas and Wyoming line the gulf's north-western shore. Those from Colorado, New Mexico and Sonora lie inland to the south-west.
- `15-journey-50.jpg`, `16-journey-25.jpg`: the journey held at 50 and 25 Ma.
- `17-now.jpg`, `18-now-close.jpg`: today, each find over its rock.

## What the pictures say about the seas

**At 262 Ma the source cannot show what Michael wants.** The Delaware Basin was a deep basin ringed by the Capitan reef, open to the ocean through a channel to the south-west, and about 200 km across. On Scotese's map that region is a low island, about 300 to 400 m up, with shallow sea round it. The map gets the large truth right: West Texas and New Mexico at the edge of Pangaea, close to the equator, with sea nearby. It misses the basin. That is what a hand-painted global map at this scale cannot do. To show the reef would take a regional map of the Permian Basin drawn from the published geology, painted for that one story. Blakey's regional maps are the best-known ones, but they are licensed separately.

**At 69 Ma the two sources disagree, and the coastline is the better guide.** The heights put no sea on North America at 69 Ma; the coastline, drawn from where marine fossils of that age are found, puts a long gulf there. The geology sides with the coastline in outline. By the late Maastrichtian the seaway had shrunk from the north and was draining. Its last arm lay over the Dakotas, where the Fox Hills sandstone and the Pierre Shale are its beaches and its floor. The Hell Creek and Lance rivers, where T. rex is found, ran across the coastal plain to its west. The coastline is a highstand, the sea at its widest during the age, so it is an outline, not a single moment's shore. If the Time lab shows the shallow seas from this source, it should paint them from the coastlines, not from the heights alone. That is a choice for Michael (*For Michael*, item 1).

## One creature, end to end: T. rex

**What the database holds.** Asking the Paleobiology Database for everything under the name *Tyrannosaurus* returns 85 occurrences: 70 it counts as *Tyrannosaurus rex*, 14 named only to the genus (8 *sp.*, 3 *cf.*, 3 *?*), and 1 *Tyrannosaurus mcraeensis*, the 2024 species from New Mexico's Hall Lake Formation. The 70 come from 30 references. Twenty-three of them come from one paper: Pearson and others, 2002, on the Hell Creek of North Dakota.

**Doubtful: 8 of the 70.**
- 5 are marked *cf.*: compared with T. rex, not certainly it.
- 1 is marked *?*: Duffy, BHI 4100, South Dakota.
- 2 come from rocks the database dates as Campanian, 83.6 to 72.2 Ma, older than T. rex is known. They are a find in the Dinosaur Park Formation of Alberta and NMMNH P-28367 from the Kirtland Formation of New Mexico. The second may belong with *T. mcraeensis*; I did not check.

Not doubtful by the database's marks, but worth knowing:
- Two records repeat a specimen: LACM 23844 appears twice at Engdahl Ranch, and DMNH 32825 twice in Colorado.
- The database lists Stan, Wankel rex, Peck's Rex and Black Beauty as *Tyrannosaurus regina*, and Sue and the Ruby site as *T. imperator*. These are Paul and others' 2022 names. The database counts them all as *T. rex*.
- Jane (BMRP 2002.4.1) is in as a juvenile *T. rex*; since October 2025 her museum calls her *Nanotyrannus lethaeus* (the finds file has the detail).

**Where each was, then and now.** Every find carries its place today and where it lay at 68 Ma in two models, PALEOMAP and Merdith 2021. It also carries the database's own ancient place (its "gplates" model), its formation, its age range and its reference. The bench draws them at 70 Ma, the plate age of Scotese's 69 Ma map, so that they sit on the map they are drawn on. Between 68 and 70 Ma the finds move a median 91 km. At 68 Ma the two models put the same find a median 850 km apart, almost all of it in longitude.

The full table follows at the end. The whole record, references included, is `Ancient-Seas-Nov18/trex-finds-full.json`.

**The specimens.** `claude/Creature-Trex-Finds-01.md` holds five famous specimens: who found each, the year, where, where it can be seen now, and how its age is known, each marked *measured*, *worked out* or *a guess*, with sources. A research agent gathered it from published sources and I read it before handing it over. Its summary: the five are Sue (FMNH PR 2081), the holotype CM 9380, Stan (BHI 3033), the Wankel rex (MOR 555, the Nation's T. rex) and Scotty (RSM P2523.8), with a short entry each for Trix and Black Beauty. Every age is *worked out*; none is *measured*, because no rock at any of these quarries has been dated. The Montana ones rest on the Hell Creek Formation of Garfield and McCone Counties, dated by argon–argon on ash beds and the boundary coal: 66.052 Ma for the end of the Cretaceous and 66.29 Ma for the Null coal about 30 m below it. Their place in the formation comes from measured sections. Sue's South Dakota Hell Creek has no dates of its own; its age is borrowed from Montana. Stan's site sits 16.2 m below the boundary, placed by fossil plants. Scotty's age rests on magnetic reversals and pollen. The nearest thing to a measured age is Trix's, whose level matches two ash beds dated about 66.9 Ma some 8 km away. Jane: Zanno and Napoli (*Nature*, 30 October 2025) found *Nanotyrannus* a separate animal, and the Burpee Museum now calls Jane *Nanotyrannus lethaeus*; the database has not caught up. What the agent could not confirm (Sue's county and level in the formation, CM 9380's level, which mounts are real bone) is listed at the end of the file.

## What it would take to make this the Time lab's Earth

The Time lab draws its continents as pieces on Merdith's plates, painted by rule: green after plants, rock before. Scotese's maps are whole-Earth pictures, one every five million years, on his own plates. There are three ways to bring them together, from cheapest to dearest.

1. **Swap the Earth for Scotese's pictures, 541 Ma to the seam at 2.6 Ma.** This is what the bench does. Inside that span the Earth becomes one painted ball per step, blended into the next. The pieces, the plate model and the cities' plates give way to PALEOMAP for those years. Merdith's model and the Time lab's guesses keep everything before 541 Ma, where Scotese has no maps. The cost:
   - **Blending.** A crossfade, as on the bench, is cheap but ghosts: a coast moves 100 to 300 km between steps, so a moving continent shows two faint coasts mid-blend. Done properly, each picture is turned plate by plate toward the year she has set before the two are blended. That needs a raster of plate numbers for each map and PALEOMAP's rotations in JavaScript. `earth.js` already turns Merdith's plates the same way, by its copy of `globe.js`'s rotation code.
   - **Everything that rides a plate** would ride PALEOMAP inside the span: cities, today's coastlines, her markers, the T. rex finds. That needs the PALEOMAP rotation file in the page. The coastline record's `paleomap_global_plate_model_v3.zip` holds one, 400 KB. It is v3, not the v2d3 the maps were made on, though the check in picture 22 shows the two agree closely at these two ages.
   - **A seam at 541 Ma**, where PALEOMAP hands back to Merdith. The continents would jump there unless one model glides into the other, as the Time lab already glides at 2.6 Ma.
   - **Weight**: about 14 MB of painted pictures at 0.2°, loaded as she moves.
   - **Sessions**: about three. One for the pictures and plate rasters, one for the turned blend and the riding points, and one to check every age on the iPad.
2. **Keep Merdith, and carry Scotese's paint onto Merdith's pieces.** Each map's pixels would be carried back to today on PALEOMAP and forward again on Merdith. The plates of the two models are cut differently, so the paint would tear where they differ. At 262 Ma the seas would land up to hundreds of kilometres from where Scotese drew them, beside Merdith's coasts, and the picture would look wrong. Not worth it.
3. **Keep Merdith, and paint only the seas.** Kocsis and Scotese's flooded areas would be carried onto Merdith's pieces as a wash. Same objection as 2, on a smaller scale.

The spec's ruling of 27 Oct ("keep Merdith, and decide about Scotese by looking") leaves this to Michael's eye. The bench is the looking. If the seas earn their place, I would take path 1 and paint the seas from the coastlines.

**Blending between steps** (the prompt asks only what it would take): see path 1. A crossfade costs nothing extra and ghosts. A plate-by-plate turn costs the rasters and the rotations, and is right.

## For Michael

1. **Which sea:** the heights (Scotese and Wright as published), or the heights flooded to Kocsis and Scotese's coastline (the highest sea of the age, from fossils)? Only the second shows the seaway at 69 Ma.
2. **Whether the Delaware Basin matters enough** for a regional map of its own, outside this survey (Blakey excluded).
3. **Whether to go down path 1** (above), and whether the Time lab's honesty words cover it. Scotese's seas are *worked out* from rocks and fossils; the shapes of the mountains are closer to *a guess*.
4. **The Chicxulub ring** on the 69 Ma map: tell the child it is an artefact, mask it, or leave it.
5. **The Paleobiology Database's licence:** whether to write to them about the CC0 stamp, or simply credit them.
6. **The 69 Ma moment is the map's 69 Ma, on plates at 70.** The prompt said 68. There is no map for 68: the nearest are 69 and 66, and the 66 Ma map is the end of the Cretaceous. 69 is closer, and its finds sit within about 90 km of where they lay at 68.

## What I could not fetch or check

- **The PBDB licence**: the contradiction above. I did not find a page that settles it.
- **The v2d3 rotation file** the maps were made on is in neither record. I used the web service's PALEOMAP (Scotese 2016) and checked it against the maps by eye (picture 22), not number by number.
- **The web service's terms**: none stated.
- **The journey's timing** was not seen running at its own pace. The pane draws few frames for a WebGPU page. The tap on *now* started it and it ended at today with the right words pressed; the pictures of its steps were taken with the page held at each age. Michael's iPad is the test.
- **The iPad**: not tried. The page was checked in the pane at its desktop size and at 768 × 1,024, where it stacks, with no sideways scroll.
- **The Kirtland find and *T. mcraeensis***: whether NMMNH P-28367 is now referred to the new species. Not checked.
- **Specimens**: what the agent could not confirm is listed at the end of the finds file.

## How it was made (for the next session)

The data was built by `Ancient-Seas-Nov18/build.py`, with `gws.py` for the web service, run from a scratch folder against the two Zenodo downloads. The downloads (about 240 MB) were not kept in the project. The script paints each map with the house ramps and floods the two moments to the coastline. It writes the coastlines as simplified rings: a closed ring is split before simplifying, because the first try collapsed every island to a point. The T. rex finds and New Mexico's paths through the ages (both models) went to `cw-deploys/experiments/ancient-seas/trex.json`. Bench hooks: `window.cwSeas` (`set`, `setAge`, `journeyTo`, `finish`, `face`, `sea`, `coast`, `rex`, `zoom`, `picture`).

## The finds: Tyrannosaurus rex in the Paleobiology Database, 18 Nov 2026

Longitudes and latitudes in degrees. *Then* is 68 Ma, carried by the GPlates Web Service. The ages, intervals and references are in the JSON.

| # | PBDB occ. | Named as | Site | Formation, place | Now (lon, lat) | Then, 68 Ma, PALEOMAP | Then, 68 Ma, Merdith | Specimen | Doubt |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 139292 | Tyrannosaurus rex | Knudsen's Coulee (NMC 9954) | Scollard, Alberta, CA | -113.03, 51.91 | -84.7, 59.9 | -69.9, 60.5 | NMC 9554 |  |
| 2 | 139293 | cf. Tyrannosaurus rex | East of Huxley (NMC 9550) | Scollard, Alberta, CA | -113.23, 51.93 | -85.0, 60.0 | -70.1, 60.6 | NMC 9950, cervical plus remainder of specimen (TMP 1981.012. | cf. |
| 3 | 220009 | Tyrannosaurus rex | RTMP BB 91a, Irishman's Coulee | Dinosaur Park, Alberta, CA | -111.53, 50.73 | -83.7, 58.5 | -69.3, 59.0 |  | age |
| 4 | 280101 | Tyrannosaurus rex | Dragon's Grave bonebed, Hanson Ranch | Lance, Wyoming, US | -104.46, 43.49 | -79.4, 50.2 | -66.8, 50.5 |  |  |
| 5 | 291021 | cf. Tyrannosaurus rex | Ken's Site | Laramie, Colorado, US | -104.49, 40.39 | -80.7, 47.2 | -68.6, 47.6 |  | cf. |
| 6 | 401751 | Aublysodon molnaris n. sp. | LACM 7245, Engdahl Ranch | Hell Creek, Montana, US | -107.08, 47.54 | -80.4, 54.6 | -66.9, 54.9 | LACM 28471 |  |
| 7 | 457806 | Tyrannosaurus rex | PTRM V91007, Doaks Butte | Hell Creek, North Dakota, US | -103.96, 45.95 | -77.7, 52.5 | -64.7, 52.6 |  |  |
| 8 | 457816 | Tyrannosaurus rex | PTRM V89004, Doaks Butte | Hell Creek, North Dakota, US | -103.96, 45.95 | -77.7, 52.5 | -64.7, 52.6 |  |  |
| 9 | 457841 | Tyrannosaurus rex | PTRM V92067 | Hell Creek, North Dakota, US | -103.30, 46.10 | -77.0, 52.5 | -63.9, 52.5 |  |  |
| 10 | 457862 | Tyrannosaurus rex | PTRM V89003 | Hell Creek, North Dakota, US | -103.75, 45.98 | -77.5, 52.4 | -64.5, 52.5 |  |  |
| 11 | 457881 | Tyrannosaurus rex | PTRM V88018, Mud Buttes | Hell Creek, North Dakota, US | -103.77, 46.03 | -77.5, 52.5 | -64.5, 52.6 |  |  |
| 12 | 457902 | Tyrannosaurus rex | PTRM V87012, Mud Buttes | Hell Creek, North Dakota, US | -103.77, 46.03 | -77.5, 52.5 | -64.5, 52.6 |  |  |
| 13 | 457914 | Tyrannosaurus rex | PTRM V88017, Mud Buttes | Hell Creek, North Dakota, US | -103.77, 46.03 | -77.5, 52.5 | -64.5, 52.6 |  |  |
| 14 | 457927 | Tyrannosaurus rex | PTRM V88020, Mud Buttes | Hell Creek, North Dakota, US | -103.77, 46.03 | -77.5, 52.5 | -64.5, 52.6 |  |  |
| 15 | 457946 | Tyrannosaurus rex | PTRM V88004, Mud Buttes | Hell Creek, North Dakota, US | -103.77, 46.03 | -77.5, 52.5 | -64.5, 52.6 |  |  |
| 16 | 457975 | Tyrannosaurus rex | PTRM V92068 | Hell Creek, North Dakota, US | -103.80, 46.14 | -77.5, 52.6 | -64.4, 52.7 |  |  |
| 17 | 457986 | Tyrannosaurus rex | PTRM V92002 | Hell Creek, North Dakota, US | -103.94, 46.41 | -77.5, 52.9 | -64.4, 53.0 |  |  |
| 18 | 458111 | Tyrannosaurus rex | PTRM V86003, Pretty Butte | Hell Creek, North Dakota, US | -103.96, 46.38 | -77.5, 52.9 | -64.4, 53.0 |  |  |
| 19 | 458207 | Tyrannosaurus rex | PTRM V97002, Cannonball Creek | Hell Creek, North Dakota, US | -103.02, 46.45 | -76.5, 52.8 | -63.4, 52.8 |  |  |
| 20 | 458213 | Tyrannosaurus rex | PTRM V96022, Cannonball Creek | Hell Creek, North Dakota, US | -104.02, 46.46 | -77.6, 53.0 | -64.4, 53.1 |  |  |
| 21 | 458258 | Tyrannosaurus rex | PTRM V86002, East Marmarth | Hell Creek, North Dakota, US | -103.90, 46.33 | -77.5, 52.8 | -64.4, 52.9 |  |  |
| 22 | 458288 | Tyrannosaurus rex | PTRM V87006, East Marmarth | Hell Creek, North Dakota, US | -103.90, 46.33 | -77.5, 52.8 | -64.4, 52.9 |  |  |
| 23 | 458292 | Tyrannosaurus rex | PTRM V87004, East Marmarth | Hell Creek, North Dakota, US | -103.90, 46.33 | -77.5, 52.8 | -64.4, 52.9 |  |  |
| 24 | 459864 | Tyrannosaurus rex | PTRM V95016, Cannonball Creek | Hell Creek, North Dakota, US | -104.00, 46.46 | -77.5, 53.0 | -64.4, 53.0 |  |  |
| 25 | 459975 | Tyrannosaurus rex | PTRM V95025, Cannonball Creek | Hell Creek, North Dakota, US | -104.00, 46.46 | -77.5, 53.0 | -64.4, 53.0 |  |  |
| 26 | 460445 | Tyrannosaurus rex | PTRM V97024 | Hell Creek, North Dakota, US | -103.90, 46.36 | -77.5, 52.8 | -64.4, 52.9 |  |  |
| 27 | 460473 | Tyrannosaurus rex | PTRM V92029, Doaks Butte | Hell Creek, South Dakota, US | -103.95, 45.94 | -77.7, 52.5 | -64.7, 52.6 |  |  |
| 28 | 460480 | Tyrannosaurus rex | PTRM V92027, Doaks Butte | Hell Creek, South Dakota, US | -103.95, 45.94 | -77.7, 52.5 | -64.7, 52.6 |  |  |
| 29 | 460503 | Tyrannosaurus rex | PTRM V92025, Doaks Butte | Hell Creek, South Dakota, US | -103.95, 45.94 | -77.7, 52.5 | -64.7, 52.6 |  |  |
| 30 | 464520 | Dynamosaurus imperiosus n. gen. n. sp. | Seven Mile Creek (AMNH) | Lance, Wyoming, US | -104.41, 43.44 | -79.4, 50.1 | -66.8, 50.4 | AMNH 5866/BMNH R7794; holotype |  |
| 31 | 487164 | Tyrannosaurus rex | Big Dry Quarry | Hell Creek, Montana, US | -106.46, 47.96 | -79.5, 54.9 | -65.9, 55.1 | AMNH 5029 (field no. 6) (=CM 9379) |  |
| 32 | 487166 | Tyrannosaurus rex | Big Dry East Quarry | Hell Creek, Montana, US | -106.46, 47.96 | -79.5, 54.9 | -65.9, 55.1 | AMNH 5027 |  |
| 33 | 487593 | Tyrannosaurus rex n. gen. n. sp. | Quarry No. 1, Sieber Ranch (AMNH) | Lance, Montana, US | -105.84, 48.29 | -78.6, 55.1 | -65.0, 55.2 | CM 9380 = AMNH 973 |  |
| 34 | 488363 | cf. Tyrannosaurus rex | Lull 2 Quarry (UCMP V-5620) | Lance, Wyoming, US | -104.64, 43.12 | -79.8, 49.9 | -67.2, 50.1 |  | cf. |
| 35 | 490989 | Tyrannosaurus rex | southwest end, South Table Mountain | Denver, Colorado, US | -105.20, 39.75 | -81.7, 46.8 | -69.7, 47.2 | tooth |  |
| 36 | 491014 | Tyrannosaurus rex | south shores, Standley Lake (UCM) | Denver, Colorado, US | -105.11, 39.87 | -81.6, 46.8 | -69.5, 47.3 | UCM 36303, tooth |  |
| 37 | 491021 | Tyrannosaurus rex | Littleton (DMNH Loc. 612) | Denver, Colorado, US | -105.02, 39.61 | -81.6, 46.6 | -69.5, 47.0 | DMNH 2827 |  |
| 38 | 491030 | Tyrannosaurus rex | Oak Place, Westminster (DMNH Loc. 1513) | Denver, Colorado, US | -105.04, 39.84 | -81.5, 46.8 | -69.4, 47.2 | DMNH 32825, tooth |  |
| 39 | 491043 | Tyrannosaurus rex | Promontory Pointe (DMNH Loc. 1927) | Denver, Colorado, US | -105.11, 39.87 | -81.6, 46.8 | -69.5, 47.3 | DMNH 32825, tooth |  |
| 40 | 519729 | Tyrannosaurus rex | Alkali Creek (USNM) | Lance, Wyoming, US | -104.07, 43.13 | -79.1, 49.8 | -66.6, 50.0 | USNM 8064, ilium |  |
| 41 | 529533 | Tyrannosaurus rex | Eastend "Scotty" site, RSM loc. 72F07-0022 | Frenchman, Saskatchewan, CA | -108.82, 49.52 | -81.3, 56.8 | -67.3, 57.2 | RSM P2523.8 |  |
| 42 | 545327 | cf. Tyrannosaurus rex | False Disciple Point | Lance, Wyoming, US | -104.53, 43.17 | -79.6, 49.9 | -67.0, 50.2 |  | cf. |
| 43 | 545995 | cf. Tyrannosaurus rex | Fish Tooth Hill, UCMP V-5918 | Lance, Wyoming, US | -104.65, 43.27 | -79.7, 50.0 | -67.1, 50.3 |  | cf. |
| 44 | 566954 | Tyrannosaurus regina | KJ9239 (DMNH 517) | Hell Creek, South Dakota, US | -103.62, 45.65 | -77.5, 52.1 | -64.5, 52.2 | BHI 3033 ("Stan") |  |
| 45 | 577480 | Tyrannosaurus rex | Engdahl Ranch (LACM) | Hell Creek, Montana, US | -107.08, 47.54 | -80.4, 54.6 | -66.9, 54.9 | LACM 23844 |  |
| 46 | 577481 | Albertosaurus megagracilis n. sp. | Engdahl Ranch (LACM) | Hell Creek, Montana, US | -107.08, 47.54 | -80.4, 54.6 | -66.9, 54.9 | LACM 23845 |  |
| 47 | 646548 | Tyrannosaurus rex | Standing Rock Hadrosaur Site | Hell Creek, South Dakota, US | -101.63, 45.53 | -75.4, 51.6 | -62.5, 51.5 | "most likely" |  |
| 48 | 690124 | Tyrannosaurus imperator | Ruby Site, Haystack Butte | Hell Creek, South Dakota, US | -103.45, 45.06 | -77.6, 51.5 | -64.8, 51.6 | SDSM 12047 |  |
| 49 | 692635 | Tyrannosaurus rex | Chris's Bonebed (CBB) | Hell Creek, Montana, US | -106.10, 47.80 | -79.2, 54.7 | -65.7, 54.9 |  |  |
| 50 | 700704 | Tyrannosaurus rex | UW V-93037, Frankbabbaloo | Ferris, Wyoming, US | -106.89, 41.94 | -82.7, 49.2 | -70.3, 49.7 | UW 26624 |  |
| 51 | 700725 | Tyrannosaurus rex | UW V-93032, Theropod Cove | Ferris, Wyoming, US | -107.00, 41.80 | -82.9, 49.1 | -70.5, 49.6 | UW 26625 |  |
| 52 | 702708 | Tyrannosaurus rex | UW V-93007, Oedipus Rex | Ferris, Wyoming, US | -106.88, 41.94 | -82.7, 49.2 | -70.2, 49.7 | UW 26623 |  |
| 53 | 702767 | Tyrannosaurus rex | UW V-93035, Gor-Gor's Revenge | Ferris, Wyoming, US | -106.88, 41.94 | -82.7, 49.2 | -70.3, 49.7 | UW 93035 |  |
| 54 | 1093504 | Tyrannosaurus rex | Too Weathered, UCMP loc. V.86097 | Hell Creek, North Dakota, US | -103.50, 46.41 | -77.0, 52.8 | -63.9, 52.9 | UCMP 172228 |  |
| 55 | 1093548 | Tyrannosaurus rex | Sandy Overlook, UCMP loc. V86101 | Hell Creek, North Dakota, US | -103.50, 46.41 | -77.0, 52.8 | -63.9, 52.9 | UCMP 172366 |  |
| 56 | 1123288 | Tyrannosaurus rex | Snyder Creek (CM) | Lance, Wyoming, US | -104.50, 43.42 | -79.5, 50.1 | -66.9, 50.4 | CM 1400 |  |
| 57 | 1179394 | Tyrannosaurus rex | Dumbbell Hill, Silver Tip Gulch | Lance, Wyoming, US | -108.85, 44.94 | -83.6, 52.5 | -70.6, 53.0 | YPM VPPU 016516 |  |
| 58 | 1199943 | Tyrannosaurus rex | Cabullona Basin, unknown locality | Lomas Coloradas, Sonora, MX | -109.00, 31.00 | -88.6, 39.0 | -77.7, 39.9 | ERNO 8549–8452 (teeth) |  |
| 59 | 1210694 | Tyrannosaurus regina n. sp. | MOR HC-069, Wankel T-Rex | Hell Creek, Montana, US | -106.26, 47.73 | -79.4, 54.6 | -65.9, 54.8 | MOR 555/USNM 555000 ("Wankel rex") |  |
| 60 | 1210695 | Tyrannosaurus regina | T. rex Coulee, Crowsnest Pass | Willow Creek, Alberta, CA | -114.11, 49.61 | -87.3, 57.9 | -73.1, 58.7 | RTMP 81.6.1 ("Black Beauty"), 81.6.4–11 |  |
| 61 | 1210698 | Tyrannosaurus imperator n. sp. | "Sue" site (PROXY) | Hell Creek, South Dakota, US | -101.97, 45.05 | -76.0, 51.2 | -63.2, 51.2 | FMNH PR 2081 (= BHI 2033) |  |
| 62 | 1350466 | Tyrannosaurus rex | Lane's Little Jaw Site | Hell Creek, Montana, US | -105.08, 45.66 | -79.1, 52.4 | -66.1, 52.6 |  |  |
| 63 | 1372226 | Tyrannosaurus rex | LACM 7245, Engdahl Ranch | Hell Creek, Montana, US | -107.08, 47.54 | -80.4, 54.6 | -66.9, 54.9 | LACM 23844 |  |
| 64 | 1584409 | ? Tyrannosaurus rex | Duffy T-rex site | Hell Creek, South Dakota, US | -103.62, 45.65 | -77.5, 52.1 | -64.5, 52.2 | BHI 4100 ("Duffy") | ? |
| 65 | 1584410 | Tyrannosaurus regina | Peck's Rex site (PROXY) | Hell Creek, Montana, US | -106.31, 47.89 | -79.3, 54.8 | -65.8, 55.0 | MOR 980 ("Peck's Rex") |  |
| 66 | 1588479 | Tyrannosaurus rex | Tooth Draw Quarry (TD), Deer's Ears Butte | Hell Creek, South Dakota, US | -103.19, 45.00 | -77.3, 51.4 | -64.5, 51.5 | over 260 isolated teeth and at least 14 elements |  |
| 67 | 1599636 | Tyrannosaurus rex | "Kevin" site (PROXY) | Lance, Wyoming, US | -104.48, 47.48 | -77.5, 54.0 | -64.2, 54.1 | tooth tip |  |
| 68 | 1625433 | Tyrannosaurus rex | NMMNH L-3335 [PROXY] | Kirtland, New Mexico, US | -108.32, 36.51 | -87.0, 44.2 | -74.6, 45.0 | NMMNH P-28367 | age |
| 69 | 1688887 | Tyrannosaurus rex | Powder River Basin (unspecific) | Hell Creek, Montana, US | -105.04, 45.98 | -78.9, 52.7 | -65.8, 52.9 | BMR P2002.4.1 (juvenile; 'Jane') |  |
| 70 | 2069689 | Tyrannosaurus rex | Naturalis T. rex locality | Hell Creek, Montana, US | -107.24, 46.95 | -80.9, 54.1 | -67.5, 54.4 | Naturalis specimen ("Trix"), RGM 792.000 |  |

