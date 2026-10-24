---
status: Draft, 17 Oct 2026. First iteration of the Earth-layers work (see Earth-Layers-Inventory.md). Beat and kid-voice paragraph agreed with Michael the same day. Amends Spec-Maps.md (one stated exception, below); Spec-Maps wins everywhere else.
role: The sea-level slider, the seafloor-age and magnetic-stripe layers, and the probe, on the Time Machine map and its deep-time timeline. Bench first; no story page changes.
related: Spec-Maps.md (layers, the world that moves), Worknote-Time-Machine.md, Earth-Layers-Inventory.md, Lab-The-Ship.md
---

# Drain the Sea

## The beat

Pull the plug on the ocean and the floor turns out to be young: younger than the dinosaurs, and youngest in the middle.

**Pillar.** A story, using the map (picture furniture) plus one new shelf tool, the probe. **Intuitions.** #13, historical sweep: the probe's age moves the deep-time handle, so a spot on the floor lands beside events she knows. #9, how do you know?: the needle is the evidence, and she gathers it with her own finger. #17, not yet knowing: the story does not say *why* the floor is young. It leaves her with the puzzle.

## The words (agreed, 17 Oct)

> Take hold of the sea and pull it down. At first very little happens. Then, about 120 metres down, the coasts move outward. Britain joins France. Alaska joins Siberia. The sea was this low about twenty thousand years ago, when ice held the missing water, and people walked across.
>
> Keep going. At about two and a half kilometres, the tops of a mountain range break the surface in the middle of the Atlantic. The range runs the length of the ocean, then around Africa and on through all the other oceans: 65,000 kilometres of mountains, more than one and a half times around the Earth. It is the longest mountain range there is. Nobody knew how far it ran until the 1950s.
>
> Tap the floor beside the mountains. The rock there is a few hundred thousand years old. Drag farther out, and farther. The rock gets older the farther you go from the mountains, on both sides. Watch the little needle while you go. The oldest ocean floor anywhere, east of the Mariana Islands, is about 180 million years old. Early dinosaurs were walking around on land when it formed. The continents hold rock twenty times older than that.

(The third paragraph changed from "tap… tap farther out" to the probe's drag. The story page itself comes later; these words are here so the bench serves them.)

## Three new things on the map

### 1. The sea, lowered

A slider (one word in the left column, *Sea level*, opening it) lowers the sea from today's level to the deepest trench, about 11 km down. The ground that comes out of the water is drawn from the same height data the map already uses (ETOPO 2022 covers the sea floor). Spec-Maps already designed for this: "a different sea level is a contour at a different number plus a recolour." Now it's built, on the moving world rather than on one crop.

- The handle's number is the only number, said plainly: "the sea 120 metres lower", "the sea 2.5 kilometres lower".
- **Open, for the bench:** how newly dry floor is coloured. It could use the land ramp (it becomes land) or a ramp of its own (it is *sea floor*, out of the water). Try both; Michael chooses by looking.
- **Open:** whether the slider snaps gently at a few depths (120 m, 2.5 km), or is perfectly smooth. Smooth unless the bench says otherwise.

### 2. Two layers, off until asked for

Both are layers in the Spec-Maps sense: files beside the base, rendered once, drawn over it by `map.js`, and left off unless a story turns them on.

- **Age of the floor.** A colour wash, young to old. Source: the Seton et al. 2020 seafloor-age grid (EarthByte). Colour is a choice for the bench, but the ochre and vermilion rule still holds: marks stay the loudest thing.
- **Magnetic stripes.** The *measured* stripes, from EMAG2v3 (NOAA, about 4 km cells), drawn as a quiet two-tone wash. At the whole-world scale they blur into nothing. They come out as she zooms in, which is the point.

### 3. The probe (new shelf tool)

A small ring she drags over the sea floor. Beside it, two things:

- **The age**, in words, rounded and said with "about": "about 400,000 years", "about 2 million years", "about 180 million years".
- **A small compass needle**, pointing up when a compass on that rock, as it cooled, would have pointed north, and down when it would have pointed south. The needle is worked out **from the age** using the published record of the field's flips (the geomagnetic polarity timescale, GTS2020), so the age and the needle can never disagree. Michael's earlier word was "the direction of north". It means north or south only, never a compass bearing.

As she drags, the needle flips. Between about 121 and 83 million years old it stops flipping for nearly 40 million years (the Cretaceous quiet zone). She finds that herself. Nothing on the page points it out.

**The timeline follows.** The deep-time handle moves to the probe's age as she drags, so whatever else was happening sits right there. How smoothly it follows under a moving finger is for the bench.

**On land.** The probe goes quiet. (Continental rock ages are a later layer.)

## How the probe is used

**Entering.** A tap on the sea floor slides the map in to a zoom where the stripes are a comfortable width, and the probe appears under her finger. The right zoom depends on the ocean: the slow Atlantic needs to be close to the deepest level, the fast Pacific less. Report what worked.

**The stated exception to Spec-Maps.** Spec-Maps says a tap on the timeline centres the map "never a change of scale she did not ask for." A tap on the sea is her asking for the probe, and the probe brings its own zoom. This is the only exception, and it is stated here so nobody repeats it by accident.

**Dragging.** One finger moves the probe, never the map. When the probe comes within about a sixth of the map's width of an edge, the map drifts to keep it in view. The drift speeds up the nearer the edge she gets, has a speed cap, and stops the moment her finger stops or lifts. It never runs away on its own.

**Leaving.** A word, *Done* unless the bench finds a better one, returns her to the view she had before she tapped. So does a tap on land.

**Open, for the bench:** whether two fingers may still pinch and pan while the probe is out. That's the same split the plane uses, but it's one more thing to discover. Build it switchable and let Michael try both.

## Facts used, with checks

- The sea at the last glacial maximum, about 20,000 years ago, was about 120 to 130 m lower. Britain was joined to France and Alaska to Siberia.
- The crest of the mid-ocean ridge sits about 2,500 m deep (varies).
- The ridge system is about 65,000 km long. The Earth's circumference is about 40,000 km.
- Its full extent was recognised in the 1950s (Heezen and Tharp's mapping, Ewing). Parts of the Mid-Atlantic Ridge were known from the 1870s, hence "how far it ran", not "that it was there".
- The oldest ocean floor in place is about 180 million years old, in the western Pacific east of the Marianas.
- Continental rocks reach about 4 billion years (Acasta Gneiss), so "twenty times older" is fair.
- The last reversal was about 780,000 years ago. The Cretaceous Normal Superchron ran from about 121 to 83 million years ago.
- The deepest point (Challenger Deep) is about 10,900 m.

## The prompt for the bench

> Read `CWVault/claude/Spec-Drain-the-Sea.md` in full, then `CWVault/claude/Spec-Maps.md` (*The ground has layers*, *The world that moves*) and `CWVault/claude/Worknote-Time-Machine.md`. Where this prompt and the spec disagree, the spec wins; where this spec and Spec-Maps disagree, Spec-Maps wins except for the one stated exception about the probe's zoom.
>
> **First, report before building.** How the Time Machine page hands a year to `map.js`; whether the deep-time timeline's handle can be moved from outside (by the probe); whether elevation values are available in the browser at each pyramid level or only as coloured tiles; and what that means for lowering the sea on the moving map. If any of it makes the plan below wrong, stop and say so.
>
> **Then build a bench**, `experiments/maps/drain-the-sea-bench.html`, page standard, Georgia: the Time Machine map and deep-time timeline, the three paragraphs from the spec above it as a story would have them, and the following. No story page changes.
>
> 1. **Sea level.** The slider as specified. Render newly dry floor two ways, switchable on the bench only, and report which reads better.
> 2. **The two layers.** Age (Seton et al. 2020) and stripes (EMAG2v3), rendered as pyramid layers by `render.py`, off by default. Report the cost per level, and where the stripes first become visible as she zooms.
> 3. **The probe.** As specified: entering on a tap on the sea, the zoom, one-finger drag, edge drift with a cap, *Done*, quiet on land, age in words, the needle from the age via GTS2020 (put the polarity table in a small JSON with its source), the deep-time handle following. Two-finger pan switchable. The probe goes on a shelf (`js/probe.js` or similar) for later stories.
>
> Data: check each source's licence and cite it in the data files and in the report. Downloads go to `_data/`, never committed. Anything this spec leaves open, leave open and name. Register the bench in `MANIFEST.md` and `experiments/index.html`, add a line to `00-BOARD.md`, run `tools/check-deploys.sh`. Check on the Mac, and say plainly what needs Michael's finger on the iPad. Stop and report before committing.
