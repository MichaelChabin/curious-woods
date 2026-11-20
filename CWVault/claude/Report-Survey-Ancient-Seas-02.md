---
status: Report, 20 Nov 2026, a Claude Code session, on Michael's prompt of 20 Nov from the "Woods This Week" session (pasted whole). A test on the ancient-seas bench. Nothing in `time-lab.html` and no shared script changed. Not committed, as the prompt asks.
role: Whether the shallow seas of Kocsis and Scotese's coastlines can ride the Time lab's own plates (Merdith), so the lab gets its seaway without moving onto Scotese's Earth. They can, for North America, to the kilometre.
related: Report-Survey-Ancient-Seas-01.md (the survey; this tests its path 3), Ancient-Seas-Nov20/build.py, Ancient-Seas-Nov20/numbers.json, cw-deploys/experiments/ancient-seas.html, Spec-Earth-3D.md (the ruling of 27 Oct)
---

# The seas on the Time lab's own plates: a test

## In short

1. **It works, and the survey's doubt about path 3 was wrong for the seaway.** With *Seas on the plates* on, the Western Interior Seaway lies on the Time lab's North America at 69 Ma, the same shape as on Scotese's Earth, with the T. rex finds along its western shore (pictures 01, 03). At 80 Ma it runs through from the Gulf of Mexico to the Arctic on both Earths (pictures 09, 11).
2. **The seaway does not tear at all.** Every piece of it, from Texas to the Dakotas, lies on one plate in both models (North America, 101). Carried across, it lands within a kilometre or two of where the same rocks put it on Scotese's Earth. Hell Creek is 66 km from the shore on the left Earth and 63 km on the right.
3. **It tears where the two models cut the plates differently, and the worst is Asia.** At 69 and 80 Ma the seas of Tibet, the Pamir and the Himalaya land 4,000 to 6,000 km apart, because Merdith carries those rocks with India, far to the south, and Scotese keeps them on Asia. In North America the tears are at the edges: southern Mexico, Baja California, southern California, the Alaska panhandle and the Arctic islands.
4. **About a quarter of Scotese's flooded ground cannot be carried at all**, because the ground it lay on is gone or has no plate of his at that age. Most of it is north of India.
5. **At 262 Ma the sea lands on New Mexico exactly where Scotese drew it relative to the rocks**, at Carlsbad's doorstep on both Earths. But Pangaea as a whole tears much more: two thirds of the places where the sea crosses a plate edge are off by more than 100 km.
6. **The journey was a small addition and is in.** The seas on the right Earth now change through the journey from 69 Ma to now.

**My reading:** the seas inside continents sit right wherever both models keep the continent in one piece, and North America's interior is the best case. At 69 and 80 Ma the edges are good enough to show a child, with *worked out* beside them. At 262 Ma I would show it only close in on New Mexico, not as a whole Earth.

## What was built

On `cw-deploys/experiments/ancient-seas.html` only. `js/3d/earth.js`, `js/3d/scene.js` and `time-lab.html` are untouched by this step. (`time-lab.html` shows as changed in the working tree; that is another session's work.)

**One new word, *Seas on the plates*,** under a heading of its own, *The Time lab's Earth*. It acts on the right Earth and leaves the left as it was. It opens on.

**How the sea is carried.** The prompt asked for each piece of sea to go back to today on Scotese's plates and forward on Merdith's. The second half turned out to need no work, and this is why the result is so clean:

- The build script takes Kocsis and Scotese's flooded ground for an age: inside their continental margin (the −1,400 m line of the paleoDEM), outside their coastline.
- It carries that back to today on Scotese's plates, read straight from the PALEOMAP rotation file and plate polygons in the coastline record. No web service is used.
- It saves the result as a picture in **today's** longitudes and latitudes, white where today's ground was under shallow sea then.
- The Time lab's pieces already carry today's ground on Merdith's plates. So the picture is laid on each plate's piece and rides with it. A sea on North America's rock stays on North America's rock, because it is painted on the rock.

On the page, each plate's mesh gets a second mesh on the same triangles that reads the sea picture and paints `#93bed7`, the shore blue of Spec-Maps' ramp and the same blue the left Earth floods with. It keeps the land's own rules: no piece before its birth, the far side hidden, the limb shaded, and each sea painted right after its own plate's land, so a later plate's land still covers it.

**The rotation file is the one the maps were made on.** The survey could not find the v2d3 rotations. The file inside `paleomap_global_plate_model_v3.zip` names itself *PALEOMAP Plate Model m15g60_v2d3*, by Scotese, 02/01/2016. So this step used the maps' own plates.

**Checked against the survey.** My reading of Scotese's plates puts the 70 T. rex finds within a median 0.5 km (1.1 km at most) of where the GPlates Web Service put them on 18 Nov. My reading of Merdith's plates puts Carlsbad within 0.0 km of the survey's positions at 70 and 262 Ma.

**A third moment, 80 Ma** (Claude's suggestion in the prompt; cheap, so it is in). Scotese's map 19, his plates at 80. The left Earth is painted from the 80 Ma heights and from the coastline, as the others are. *Show T. rex* goes away at 80 Ma: the animal had not yet lived.

**The journey.** The record has a coastline every five million years from 65 to 5 Ma, except 55. Each was carried the same way (twelve pictures, half width). On the right Earth the sea blends from one to the next as the year runs. Because the pictures are in today's frame, the blend does not ghost: the plates do the moving. The sea fades out between 5 Ma and 2.6 Ma, where the photograph takes over.

**Weight.** The bench's data folder goes from 3.4 MB to 6.3 MB: three sea pictures at 3,600 × 1,800 (0.15 to 0.26 MB each), twelve at 1,800 × 900 (about 0.11 MB each), and the 80 Ma Earth (two pictures, 0.43 MB each, and its coastline).

**Files.** `Ancient-Seas-Nov20/build.py` (a fresh copy; the Nov 18 script is untouched), `Ancient-Seas-Nov20/numbers.json` (every number below, and every seam), and new files only in `cw-deploys/experiments/ancient-seas/`: `seas-262.png`, `seas-080.png`, `seas-069.png`, `seas-065.png` … `seas-005.png`, `seas.json`, `earth-080.jpg`, `earth-080-high.jpg`, `coasts-080.json`. Run again from scratch, the script reproduces every one of them byte for byte.

## The numbers

Areas are in millions of square kilometres. Scotese's plates are at 260, 80 and 70 Ma; the Time lab's Earth is at 262, 80 and 69 Ma, as the bench has them.

### How much lands where

| | 262 Ma | 80 Ma | 69 Ma |
|---|---|---|---|
| Flooded ground on Scotese's Earth | 78.1 | 96.9 | 75.2 |
| Carried back to today | 43.5 | 75.9 | 53.2 |
| Could not be carried | 35.9 (46%) | 20.7 (21%) | 21.4 (28%) |
| Of the carried: lands on the Time lab's land | 37.3 (86%) | 69.2 (91%) | 46.7 (88%) |
| Of the carried: falls in the Time lab's ocean | 6.2 (14%) | 6.7 (9%) | 6.5 (12%) |
| The Time lab's land | 174.6 | 188.8 | 189.2 |
| Time-lab land that none of Scotese's plates carries | 23.7 (14%) | 18.3 (10%) | 18.5 (10%) |

- **Could not be carried** is flooded ground with no ground of today to ride on. At 69 and 80 Ma the largest patch is the sea north of India (4.6 to 6.3 million km²), ground since swallowed under the Himalaya. At 262 Ma it is nearly half, mostly the Tethys shores of Pangaea.
- **Falls in the Time lab's ocean** is sea on ground the Time lab has no piece for. It is not painted. The patches are continental shelves: the South China Sea, the Sea of Okhotsk, the Siberian Arctic shelf, the Gulf of Guinea, and at 262 Ma western Mexico.
- **What the Time lab's land misses.** I cannot give this as one true number. The sea is painted on rock, so wherever Scotese's plates carry a piece of the Time lab's land, that land gets exactly the sea Scotese drew on it. The land that can miss a sea is the last row: about a tenth of the Time lab's land, which none of Scotese's plates carries at that age, so it stays dry whatever he drew. The largest patches at 69 Ma are Cuba, the Bahamas and the floor of the Gulf of Mexico (2.0 million km²), the shelf south-west of Australia, parts of Antarctica, the eastern Mediterranean and eastern Indonesia.

### How far apart the two models put the same sea

For every cell of sea painted on the Time lab's land: the distance on the globe between where Scotese has it and where Merdith has it.

| | 262 Ma | 80 Ma | 69 Ma |
|---|---|---|---|
| Median, as they stand | 455 km | 424 km | 465 km |
| Median after the one best turn of the whole Earth | 435 km | 136 km | 163 km |
| One cell in ten is farther than, after the turn | 1,077 km | 313 km | 300 km |
| The best turn | 5° | 6° | 7° |

This is the survey's finding again: one turn fixes most of it in the Cretaceous and none of it in the Permian. It does not matter to this method, because the sea is laid on the rocks and not on the globe.

### Where it tears

A tear can only happen where the sea crosses from one plate to another, in either model. For each such crossing I measured how far the far side lands from where the near side's own carry would put it. Lengths are rough (to within a third).

| | 262 Ma | 80 Ma | 69 Ma |
|---|---|---|---|
| Length of sea crossing a plate edge | 341,000 km | 424,000 km | 333,000 km |
| Of that, off by more than 20 km | 76% | 41% | 36% |
| Of that, off by more than 100 km | 66% | 32% | 29% |

**The seaway itself: no tear.** At 69 Ma it crosses one edge of Scotese's (his plates 101 and 135, in Texas), and Merdith keeps both on plate 101. Over 2,000 km of that edge the two sides land within 2 km of each other, which is the size of one cell of the picture.

**North America, 69 Ma** (39,000 km of crossings, 12,500 km of them off by more than 20 km):
- **Southern Mexico, at the Isthmus of Tehuantepec:** about 1,280 km. Merdith and Scotese place the Chiapas and Central American blocks very differently.
- **Baja California and the Gulf of California:** 180 to 460 km.
- **Southern California, the Mojave and the Sierra:** about 400 km.
- **The Alaska panhandle:** about 400 km.
- **The Canadian Arctic islands, Baffin Bay and north Greenland:** 75 to 300 km.
- **Hispaniola:** 220 to 335 km.

**North America, 80 Ma** adds Vancouver Island and Washington (300 to 350 km), Labrador and Baffin (about 65 km) and western Alaska (about 50 km).

**North America, 262 Ma:** the far west comes apart. Nevada and Utah are several plates of Scotese's and tear by 100 to 435 km; British Columbia and the Yukon by 70 to 90 km, with one Yukon terrane 3,000 km out of place.

**The rest of the world.**
- **Tibet, the Pamir, the Himalaya (69 and 80 Ma):** 4,000 to 6,800 km. Merdith's pieces put these rocks on the Indian plate, which is still far south; Scotese has them on Asia. This is the one place where the picture is plainly wrong, and it is the survey's objection made real.
- **The Yellow Sea and Korea:** about 290 km, along 10,000 km of crossing.
- **The South China Sea's north shore:** about 660 km.
- **At 262 Ma:** West against East Antarctica, 320 km along the longest crossing on the Earth; New Zealand, 615 km; East Africa against Madagascar, 210 km; central Asia, 1,800 to 11,000 km.

### 69 Ma: T. rex and the shore

- **Hell Creek** (Jordan, Montana): **66 km** from the shore on the left Earth, **63 km** on the right. The sea lies due east on both.
- **The 57 finds from Montana, the Dakotas and Wyoming:** a median **60 km** from the shore on the left Earth and **61 km** on the right. 42 of them are within 100 km on the left, 44 on the right; 52 are within 200 km on both. The farthest is 283 km on the left, 286 km on the right.
- For all 70 finds, the two Earths differ by a median 2 km in the distance to the nearest sea. Five finds fall just inside the flooded ground on each Earth, four of them the same finds; all five lie within a cell or two of the shore.
- The one find that differs is in Sonora: 355 km from the sea on the left, 198 km on the right. Its nearest sea lies to the west-south-west on both, and the difference fits the Baja California tear above.

So yes: the finds line the seaway's western shore on the right Earth exactly as they do on the left (picture 03).

### 262 Ma: New Mexico

- Carlsbad's point falls at the very edge of the flooded ground on both Earths: the sea is 4 km away on the left and 3 km on the right, to the south-west. (The survey's 60 km was measured on the heights. Kocsis and Scotese's coastline, which this step uses, brings the sea to Carlsbad.)
- Relative to New Mexico's rocks, the sea lands where Scotese drew it, to within a cell of the picture. New Mexico and its sea are on plate 101 in both models.
- On the globe, that sea is 512 km from where Scotese has it (431 km after the best turn). New Mexico itself is the same distance away: 4.2° N on his Earth, 8.6° N on the Time lab's. The sea moved with New Mexico.

## The pictures

In `claude/Ancient-Seas-Nov20/`, made by the page's own readback. Scotese and Wright's Earth is on the left, flooded to the coastline, with the coastline drawn; the Time lab's is on the right.

**69 Ma**
- `01-069-seas-on-the-plates.jpg`, `02-069-seas-off.jpg`: far, on and off.
- `03-069-close-seas-on.jpg`, `04-069-close-seas-off.jpg`: close in over New Mexico and the finds. In 03 the right Earth's shore matches the left's kink for kink.

**262 Ma**
- `05-262-seas-on-the-plates.jpg`, `06-262-seas-off.jpg`: far.
- `07-262-close-seas-on.jpg`, `08-262-close-seas-off.jpg`: close in. New Mexico's island and its strait appear on the right Earth as on the left.

**80 Ma**
- `09-080-seas-on-the-plates.jpg`, `10-080-seas-off.jpg`: far. The seaway is open to the Arctic on both.
- `11-080-close-seas-on.jpg`, `12-080-close-seas-off.jpg`: close in.

**The journey**
- `13-journey-50-seas-on.jpg`, `14-journey-25-seas-on.jpg`, `15-journey-05-seas-on.jpg`, `16-now.jpg`.

**Safari on the iPad simulator**
- `17-ipad-simulator-safari-069.jpg`: 69 Ma after a tap on the word, seas on.

The straight-edged pale wedges on the right Earth (in the Gulf of Mexico, west of New Mexico at 262 Ma) are the Time lab's own shelves. They are there with the seas off (pictures 04, 08).

## How it was checked

- **The pane, 1,024 × 768:** every word tapped. 80 Ma; *Seas on the plates* off and on; 69 Ma; *now* (the journey ran, caught at 43 Ma with the sea blending); back to 69 Ma. The console held only the version line. No sideways scroll.
- **The pane, 768 × 1,024:** the page stacks as before, no sideways scroll.
- **WebGL** (`?gl=1`): both Earths and the seas draw; no errors. The sea layer reads two pictures, so it adds nothing to the land's count of 16.
- **Safari on the iPad simulator** (iPadOS 26.5, landscape): opens with both Earths and the seas; a tap on *69 Ma* works.
- **`tools/check-deploys.sh`:** the page passes. The check's two errors are another session's untracked pages under `experiments/simple_rules/`.

**Not checked.**
- **A real iPad.** Michael's to try.
- **The journey at its own pace in Safari.** I saw it run in the pane and took its steps as held pictures.
- **Close in on the simulator.** One far view and one tap only.

**Known and left.**
- At 262 Ma the Time lab lays its deep ice over land and sea. The carried sea is painted over that ice. I saw no ice under it in these views, but near the south pole it would show.
- The record has no coastline for 55 or 75 Ma. On the journey the sea blends from 60 straight to 50.

## What it would take to bring the seas into the Time lab

If Michael likes what he sees, about two sessions.

1. **The data.** Kocsis and Scotese give a coastline every five million years from 5 to 535 Ma, with a few gaps: 80 pictures. At half width that is about 9 MB in all, fetched two at a time as she moves. The script already makes them; it needs only the list of ages.
2. **Into `earth.js`.** Two ways.
   - As the bench does it: a second mesh on each plate. It costs a second draw for every plate, and leaves the land's shader alone.
   - Inside the land's shader. The land is at the device's limit of 16 pictures, but since 19 Nov its two sea masks share one picture and use only its red and green. The carried sea for the two bracketing ages could go in that picture's blue and alpha, for no extra picture. This is the better way if it holds; I have not tried it.
3. **The things the bench skips:** the flat world, the deep ice over the sea, the shelf rims' order, and the fade at the seam.
4. **The honesty word.** *Worked out*, and the sea at its widest in the age (Michael's answer 1 of 19 Nov).
5. **The tears.** Three choices, for Michael: leave them; hide the carried sea on the pieces where the two models disagree by more than some distance (the script can list them: Tibet and its neighbours first); or accept them everywhere but Asia.
6. **The limits.** No seas before 540 Ma, where the coastlines end. No sea north of India, where the ground is gone.

This would leave the Time lab on Merdith's plates, with the code moving them, and take from Scotese only where the shallow seas lay.

## For Michael

1. Whether the seas earn a place in the Time lab this way (path 3), in place of path 1.
2. What to do about Asia's tears (item 5 above).
3. Whether 80 Ma stays as a moment on the bench.

**The bench is ready for your word to commit and push**, so you can look at it on the iPad at `curiouswoods.org/experiments/ancient-seas.html`.
