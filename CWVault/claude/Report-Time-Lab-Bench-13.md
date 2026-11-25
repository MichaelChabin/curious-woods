---
status: Report, 25 Nov 2026. Step 13 of the Time lab bench, built on `8c669f91` (step 12d, committed and pushed). Checked in the pane at 1,024 × 768 and 768 × 1,024 on WebGPU. Reported first, as the prompt asks; COMMITTED on Michael's word, "Yes, commit", 25 Nov; NOT pushed.
role: What step 13 did to `experiments/time-lab.html` (Places, following, the equator and poles, the distances, the coastlines); what I chose where the prompt left a choice; what the check found; whether England and Scotland come together in this plate model.
related: Prompt-Revise-Time-Lab-Bench-13-01.md (Michael's prompt, as it arrived), Report-Time-Lab-Bench-12d.md (the page as it stood), Report-Time-Lab-Bench-12.md (the coastlines' table), Report-Time-Lab-Bench-11.md (Measure), Report-Time-Lab-Bench-12b.md (an event's place turns to face her)
updated: 2026-11-25
---

# Report: the Time lab bench, step 13: Places (25 Nov 2026)

![[Time-Lab-Bench-13-Nov25/04-world-following-england-300-Ma.jpg]]

*300 Ma, England followed: it stays in the middle, and the equator has come up under it. Scotland is the other copper dot.*

## The answer first: England and Scotland do not come together in this model

**This plate model does not show England and Scotland coming together. Please don't build her first discovery on it.**

- England's ground (London, Manchester, Cardiff, Newcastle, and Dublin too) is one piece on plate 315. That piece is born at **420 Ma**. Before that the model has no England at all, and plate 315 has no motion of its own before about 425 Ma.
- Scotland's ground (Edinburgh, Glasgow, Inverness, and Belfast too) is on plate 303, part of the old North American continent. It goes back to 600 Ma.
- From the moment England appears, 420 Ma, the two are already side by side, **about 520 km apart, the same as today**, and they stay that way to now (`06`: 415 Ma, England just appearing beside Scotland).
- Before 420 Ma Scotland is far away on its own: about 4,000 km from where England first appears at 480 Ma, about 7,400 km at 600 Ma. But there is no England to measure from.

So in the lab England does not travel to Scotland. It arrives beside it. The ocean between them (the Iapetus Ocean, which closed about 430 to 420 million years ago) is not in this model. What she *can* see: England and Scotland riding together from the equator's south, across it at about 320 Ma, and north to where they are now (`02` to `06`).

## Against Report 12d

Nothing in the prompt disagrees with what Report 12d says was built. Step 12d was committed (`8c669f91`) before I started.

## What was changed

- `cw-deploys/experiments/time-lab.html` only. The stamp is `2026-11-25 8c669f9 · time-lab step 13 · Places`.
- **No shared script changed.** The equator and poles needed nothing new from `earth.js`: its own way of placing a point that rides no plate already puts it in the Earth's own frame. The page still asks for `earth.js?v=2026-11-25c`.

`check-deploys` reports no error for this page. Its two errors are another session's pages under `experiments/simple_rules/`, as in 12d. The console in a fresh tab holds the version line only.

## The panel

| | 1,024 × 768 | 768 × 1,024 |
|---|---|---|
| The World, Places open, two markers | `01`, `12` | `31` |
| The World, following | `02` to `06`, `10`, `11` | `32` |
| The map | `07`, `08` | `33` |
| Time | `14`, `17` | `34` |

- **Places** stands where Show cities, Show coastlines and Place markers stood: in the column in Time, among the tools in How This Works in The World. Show shallow seas, Map and Measure are as they were.
- The panel holds, in order: Show cities, Show coastlines, Show equator and poles, Place a marker; then her markers; then the distances. Each show word turns to Hide … when on.
- **One tool panel at a time.** Opening Places closes Measure, and opening Measure closes Places, in both views (`13`). An event's panel is not touched.
- **Closing Places closes only the panel.** What is shown stays shown, the markers stay, and a followed marker stays followed. The placing stops (see below).
- It moves, keeps its place in each view, and is never taller than the window; what does not fit scrolls inside it, and a finger on the words scrolls them, as step 12d's Time panel does.

**Where it opens.** I had to choose here, because of following: she will drag the handle with Places open, and watch the middle of the globe.

- **The World:** under How This Works if there is room above the line; if not, beside How This Works, level with its top. At 1,024 × 768 there is no room under it, so Places opens beside it (`01`). At 768 × 1,024 there is room, just, so it opens under it (`31`). Either way it stops above the line, so the handle and the events stay in reach.
- **Time:** the upper left of the Earth's box, kept clear of the Earth's middle, where a followed marker stands. On an upright iPad that puts it 29 px to the left of the Earth's box (`34`), clear of the column's words.
- **On an upright iPad with How This Works open**, the panel is too short for everything once two markers are down, so it scrolls. When a marker is placed or tapped, the panel scrolls to its foot, so the marker and the distance are in sight (`31`); the show words scroll off the top.

## Markers

- **A tap on a marker opens Places with it lit**, its name in copper (`12`). It no longer deletes it. It does this whether or not she is placing, and whether or not Places was open.
- **remove** in the panel is the only way to delete one. Removing the followed marker ends the following.
- **Placing one** opens Places with the new one lit, so follow is right there (`01`, `31`).
- **The markers now stay on the Earth** whether or not she is placing. Before, Hide markers hid them all. There is no word to hide them now; remove is the way.
- **Names** (the chat's default): *near* and the nearest of the lab's cities within 500 km, today's names. The two I placed came out *near London* and *near Edinburgh*. A marker far from any city is *Marker 1*, *Marker 2* (a marker on the Atlantic came out *Marker 1*). A second marker near the same city is *near London 2*.
- **The followed marker has a thin copper ring** round its dot, on the globe and on the map, so it reads as followed even where nothing turns (`07`).
- Tapping a marker's name in the list lights it, or unlights it.

**How she leaves placing.** Place a marker turns to **Stop placing** while she is placing. She leaves by tapping Stop placing, or by closing Places, since the word that stops it is in the panel she closed. A tap on a marker while placing opens it and places nothing. I would keep it so. The other way would be one marker per tap of Place a marker, which is fewer taps for one marker and more for two.

## Following

- **follow** makes that marker the followed one; the word becomes **following**. Only one is followed; choosing another lets go of the first. Tapping *following* lets go.
- **The globe keeps the marker in the middle as the year changes:** a drag of the handle, the arrows, Pick a time, an event's travel, and play when it comes. Checked by dragging the handle from now to 480 Ma in 600 steps: at every step England was exactly in the middle, to 10⁻¹³ of a degree.
- **Upright, no zoom.** "Upright" here is the globe on its stand, as every turn has been since step 10c: north stays up the screen and nothing rolls. The globe is turned to the marker's longitude *and tipped to its latitude*, so the marker is in the middle and the equator moves. The other reading, the equator always across the middle, would leave England near the top at 51° N and the equator still. The tilt stops at the lab's 70° limit, so a marker further toward a pole than that sits a little off the middle.
- **Smooth.** A small step of the year, three degrees or less, is taken at once; that is what a drag of the handle gives. A larger jump (Pick a time, the start of following) eases, with a time constant of 160 ms.
- **Under reduced motion:** every turn is taken at once. *This I read in the code; I could not switch reduced motion on in the pane.*
- **Show equator and poles turns on** when she follows, if it was off (the chat's default).
- **On the map** nothing turns. The globe under the map is kept turned, so Globe comes back to the followed marker (`07`).
- **Her finger on the globe lets go** once it has moved 8 px, the lab's line between a tap and a drag; the word goes back to follow. A tap does not let go. Checked with touch events: a 2 px move kept it; a drag let go, and the next change of year did not turn the globe.
- **An event tapped while following:** the following wins. The handle travels to the event and the globe stays on the marker; the event's panel opens as always (`11`, Dinosaurs at 233 Ma). Every other turn the page makes gives way the same way: Pick a time and its back, a city tapped, a tap on the map.
- **This side of the seam** the plates do not move, so a followed marker holds still. Nothing special was needed.

**Where the marker's ground did not exist yet** (you asked me to report this, not to invent a rule). A marker is drawn while its piece lives, fading in over the first 20 million years of the piece's life, as the cities do. Before the piece is born, it is not drawn. **Following holds the globe where it last was, and the marker stays followed.** When she brings the handle back into its years, the globe picks it up again. England at 480 Ma (`05`): no England, the globe where England last was at 420 Ma, and Scotland's marker near the left edge. The panel says *near London is not on this Earth yet: the ground under it had not formed.*

## The equator and poles

A thin line for the equator and a small cross at each pole, in the coastlines' own line colour and lighter than the coastlines. Nothing in vermilion. They ride no plate: the continents move under them (`02`: the North Pole's cross over Greenland at today; `04`: the equator just under England at 300 Ma). On the map the equator runs across the middle and each pole's cross is at the middle of the map's top and bottom edges (`07`, `33`).

## Distances

- With two or more markers, from the followed one to each of the others; with none followed, from the first placed (the chat's default).
- Along the surface, at the year on the line, and it changes as the handle moves.
- **Rounded to two figures**, never finer than 10 km: 534 → 530, 3,436 → 3,400, 5,570 → 5,600. The plate model is not sure to better than that.
- **Something she can feel**, the nearest by ratio: *about as far as* one of these. I worked each out along the surface from the cities' places. Your four were right; I added seven, because from 340 km to 20,000 km the gaps were too wide:

| | km |
|---|---|
| London to Paris | 340 |
| Paris to Marseille | 660 |
| Paris to Berlin | 880 |
| London to Rome | 1,430 |
| London to Moscow | 2,500 |
| New York to Los Angeles | 3,940 |
| London to New York | 5,570 |
| London to Beijing | 8,140 |
| London to Buenos Aires | 11,130 |
| London to Sydney | 16,990 |
| halfway round the Earth | 20,000 |

  No two next to each other are more than about twice apart (London to Paris and Paris to Marseille are the widest), so the word is never more than about 40% out. Under about 240 km it says *less than London to Paris*; under 20 km, *in the same place*.
- What it said: London to Edinburgh, *520 km, about as far as Paris to Marseille*, at every age from now to 420 Ma. London to New York, *5,600 km, about as far as London to New York* today and *3,400 km, about as far as New York to Los Angeles* at 300 Ma (`17`).
- **When a marker is not there**, a sentence in place of a number: *… is not on this Earth yet: the ground under it had not formed*; *The ground under … is gone by this year*; for a marker on the open sea, past 2.6 million years, *… is on the sea, and this Earth does not carry the sea floor back this far*; and with no map at all (the molten Earth), *This Earth has no map for this year, so there are no distances.* If the one measured from is not there, it is said once.

The distance at the four pictured ages, England followed:

| | London to Edinburgh |
|---|---|
| 0 Ma (`02`) | 520 km |
| 66 Ma (`03`) | 520 km |
| 300 Ma (`04`) | 520 km |
| 480 Ma (`05`) | not there yet |

(The real distance is 534 km; my taps were a few kilometres off the two cities.)

## The coastlines

**What changed.** A point of today's coast that no piece holds, but that lies within **10 km** of a living piece's outline, now rides that piece. 103 of the 147 points no piece held are taken in. A stretch whose two ends ride different plates is still not drawn, and nothing shows before its piece exists: those rules did not change. `?coastsnap=0` opens the page as before; `?coastsnap=25` (or any number) tries another distance.

Beside Report 12's table (each cell: drawn, with *before → after*):

| Stretches of today's coast | 69 Ma | 100 Ma | 201 Ma | 639 Ma |
|---|---|---|---|---|
| One end on no piece | 385 → 211 | 385 → 211 | 385 → 211 | 385 → 211 |
| The piece did not exist yet | 229 → 254 | 264 → 290 | 433 → 474 | 1,625 → 1,762 |
| The two ends ride different plates | 219 → 255 | 209 → 244 | 180 → 212 | 25 → 29 |
| **Drawn** | **2,011 → 2,124** | **1,986 → 2,099** | **1,846 → 1,947** | **809 → 842** |

The *before* column is Report 12's to the stretch (I ran the same rules outside the page and they agree). Of the 174 stretches taken in, about two thirds are now drawn; the rest fall to the other two rules, as they should.

**How far is "a few kilometres".** I tried several. You may want another:

| Within | Points taken in | Drawn at 100 Ma |
|---|---|---|
| none (before) | 0 | 1,986 |
| 2 km | 33 | 2,025 |
| 5 km | 66 | 2,057 |
| 10 km (built) | 103 | 2,099 |
| 25 km | 162 | 2,157 |
| 50 km | 187 | 2,184 |

**Over North America at 100 Ma the difference is small** (`15` before, `16` after). The stretches taken in are scattered: the Caspian, Arctic Canada, Japan, the Red Sea, the Mediterranean. What is still not drawn is mostly islands no piece comes near (Iceland, Hawaii, the Caribbean, Kerguelen, South Georgia), and the east coast of Greenland, which lies more than 10 km outside its piece. The Gulf coast lying out in the sea at 100 Ma, which you found useful, is the same before and after.

It did not prove larger than it looked, so it is in this step, not left for 14.

## What was checked

**At 1,024 × 768, in The World:** Places opened by a real click, and closed by its close word; Measure opened while Places was open and the other way round; each show word on and off, on the globe and on the map (with all three off, nothing but the markers and the event's ring is drawn); two markers placed by real taps on England and Scotland, the panel lit on placing; England followed by a real click; the handle dragged from now to 480 Ma; pictures at 0, 66, 300 and 480 Ma, and 415 Ma; following switched to Scotland by a real click (`10`); a finger on the globe; an event tapped while following, by a real click; a tap on a marker, with Places open and closed; remove; Pick a time and back while following; a marker on the sea; 2,000 and 4,500 Ma.

**At 1,024 × 768, in Time:** Places from the column, Measure from the column over it and the other way round, following and three markers' distances (`17`).

**At 768 × 1,024:** the arrival (`30`); Places in The World and two markers placed by real taps (`31`); England followed (`32`); the map with everything on (`33`); Time, with Places clear of the middle (`34`); Measure and Places over each other in Time; each show word in Time.

**The arrival on First trilobites is unchanged** (`30`, beside 12d's `19`): the same Earth at 521 Ma, the ring in the middle, the event selected and no panel. Only How This Works' list of tools is shorter, Places in place of three words.

## Found on the way

- **17 of the 191 events with a place lie on no piece.** Dinosaurs' place (Ischigualasto, Argentina) is one. Past the seam their ring is not drawn, so a tapped event can show no ring. That is step 12's, not this step's; I did not change it. The same 10 km rule as the coastlines would take most of them in. Say if you want it.
- **A tool panel keeps the place where it last closed, in that view**, even if she never moved it. So Places, opened beside How This Works, closed, then opened again after How This Works has come back, can sit on top of How This Works. Measure has done the same since step 11. I left the rule as it is.

## Not tried

- An iPad, Safari, or the simulator: in particular a real finger on the globe while following, and a real finger scrolling Places.
- Anything moving: the pane runs no frames under a script, so I checked the easing by running it by hand, not by watching it.
- Reduced motion (read in the code only). WebGL.

## Needs Michael's eye

1. **England and Scotland** (the first section). The model shows them riding together, not coming together. Something else may have to be her first discovery.
2. **"Upright" while following** means turned and tipped to the marker, north up the screen. Is that what you meant?
3. **Where Places opens in The World at 1,024 × 768**: beside How This Works, over the upper middle of the globe (`01`). The followed marker, in the middle, stays clear of it.
4. **Following goes on when Places closes.** I think that is right: she can close the panel and watch England. Say if not.
5. **Placing stays on until Stop placing**, or until Places closes. Fine, or one marker per tap?
6. **The added distances** in the table above, and *Paris to Marseille* for London to Edinburgh.
7. **The coastlines' 10 km.** Two, five, ten or twenty-five?
8. **The markers can no longer be hidden**, only removed. Is that what you want?

## The files in `Time-Lab-Bench-13-Nov25/`

**The World, 1,024 × 768.** `01`: two markers placed on England and Scotland, Edinburgh lit on placing. `02`, `03`, `04`: England followed at 0, 66 and 300 Ma. `05`: 480 Ma, England not there yet. `06`: 415 Ma, England appearing beside Scotland. `07`: the map at 200 Ma, the followed marker ringed, the equator and the poles. `08`: the map with all three show words on. `09`: the globe with all three on, following. `10`: Scotland followed at 480 Ma. `11`: Dinosaurs tapped while following; the globe stays on England. `12`: a tap on a marker opens Places, lit. `13`: Measure opened; Places closed.

**Time, 1,024 × 768.** `14`: Places at the upper left of the Earth. `17`: three markers, England followed at 300 Ma, two distances.

**The coastlines.** `15`: 100 Ma over North America, before. `16`: after.

**768 × 1,024.** `30`: the arrival. `31`: two markers placed, the panel scrolled to the distance. `32`: England followed at 300 Ma. `33`: the map, everything on. `34`: Time, Places clear of the middle, England followed.
