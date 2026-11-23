---
status: Report, 23 Nov 2026. Step 12b of the Time lab bench, built on `7a2f8d54` (step 12, committed and pushed). Checked in the pane at 1,024 × 768 and 768 × 1,024, on WebGPU and once on WebGL. Reported first, as the prompt asks. Committed on Michael's word, 23 Nov 2026; not pushed.
role: What step 12b did to `experiments/time-lab.html` and to step 12's option in `js/3d/earth.js`; the answers the prompt asked for; what I chose where it left a choice; what the check found; what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-12b-01.md (Michael's prompt, as it arrived), Report-Time-Lab-Bench-12.md (the page as it stood), Report-Time-Lab-Seas-Nov20.md (where the seas came from), js/3d/earth.js
updated: 2026-11-23
---

# Report: the Time lab bench, step 12b (23 Nov 2026)

![[Time-Lab-Bench-12b-Nov23/03-seas-90-world-globe.jpg]]

*90 Ma: the seaway and the shelf, one blue.*

## Against Report 12

Nothing in the prompt disagrees with what Report 12 says was built.

**Changed later the same day, on Michael's word.** As first built, Hide shallow seas hid the shelves as well as the seaways, which is how I read "hide both kinds". Michael looked at it live and missed the continental crust the land stands on. Hide now takes away the seaways only, as it did before this step. The stamp is `2026-11-23 91a2e9a · time-lab step 12b · the shelves stay`.

## What was changed

- `cw-deploys/experiments/time-lab.html`. The stamp is `2026-11-23 7a2f8d5 · time-lab step 12b`.
- `cw-deploys/js/3d/earth.js`, behind step 12's option `seasCrust`, as you allowed: a third value, `'shelf'`. A page that does not name it has the paint it had. The Earth bench and Ancient Seas load and draw with a clean console.

`check-deploys` reports no error for this page. Its two errors are another session's pages under `experiments/simple_rules/`. The console is clean. Nineteen pictures are in `Time-Lab-Bench-12b-Nov23/`.

## The shallow seas are blue

| | The World, globe | The map |
|---|---|---|
| 480 Ma | `01` | `05` |
| 201 Ma | `02` | `06` |
| 90 Ma | `03` | `07` |
| 69 Ma | `04` | `08` |

In Time at 90 Ma: `10`. At iPad size: `31`.

**Why the shelf and the seaway differed: two sets of data, drawn two ways.**

1. **The shelf** is the lab's own, and older. Each piece of continent is cut wider than its land. Inside a piece, wherever today's picture is sea, the lab lays a pale wash over the ocean. That is the blue off the coasts.
2. **The seaway** is Kocsis and Scotese's flooded ground, brought in on 20 Nov. It is a second layer over the same pieces. Step 12 painted it grey.

Each knew nothing of the other.

**What the two blues are now: one.**

- The deep ocean is as it was: `#5793b4` at the middle of the ball, down to `#33699a` at its edge.
- Every shallow sea is the shelf's own paint: `#7fb0cc` laid at 55% over the ocean under it. At the middle of the ball that comes to about `#6da3c1`.
- The seaway now uses exactly that paint, so there is nothing to match by eye and no seam.
- It is painted whole. Nothing of the land's picture shows through, so it cannot be taken for land.

Before, the seaway was the grey `#a3a29c` with a second blue, `#93bed7`, faint over it.

**Kept.** Dry land has its picture. The deep ocean has its blue. The shorelines are soft, as step 12 built them. The tears are straight and sharp.

**Hide shallow seas and `?seas=0` hide the seaways only** (`11`, at 72 Ma). The shelves stay: they are the continental crust each piece carries beyond today's coast.

**The grey, kept and off.**

- It lives in `earth.js`, in the seas' paint, untouched: the constants `SEAS_CRUST` and `SEAS_CRUST_BLUE`, and the uniform `uCrust`.
- A page turns it on with `seasCrust: true` or a colour, or with `setSeasCrust(true)`.
- On this page, `?crust=grey` opens with it (`09` is that, at 90 Ma). `?crustgrey=` still takes another grey.

**The bench switch for the crust is gone**, the chat's default. I also took out the row beside it, *the shallow seas, how strong*. A sea painted whole has no strength to set, and the switch would have done nothing. The shorelines' switch stays.

## A selected event's place turns to face her

| | Before | After |
|---|---|---|
| The World, the globe tipped 40° and facing Asia; The asteroid tapped | `20` | `21` |
| Time; Dimetrodon tapped | `22` | `23` |
| The map; The asteroid tapped | | `24` |
| iPad size; Dimetrodon tapped | | `32` |

- **A tap on an event that has a place** eases the globe round, the short way, until the place is at the middle. 1.2 seconds. It arrives upright. The size does not change.
- **The place is where that ground lay at the event's year**, as on arrival.
- **Upright means the place is in the middle from left to right**, and at its own height above or below the equator. Chicxulub at 66 Ma, then 25° north, stands well above the middle (`21`). A place near a pole would stand near the top of the ball.
- **The handle travels with it.** It eases to the event's year over the same 1.2 seconds, and the Earth passes through the years between. They land together. **Until now a tap cut the handle to the year.** This is how I read "as they do on arrival". `LOOK.face.travel` set to false gives the cut back, with the globe still easing.
- **An event with no place moves nothing**, and its tap is as it always was: the handle cuts to the year. Nine of the store's events have no place.
- **Under reduced motion**: a cut, the year and the turn at once.
- **Her finger wins.** If she is holding the globe when she taps, the globe stays hers and only the handle travels. A finger put on the globe on the way stops the turn there; the handle goes on to the year. A hold of the line stops the handle where it is.
- **A second event tapped on the way** takes over from wherever the globe and the handle have reached.
- **Only a tap on an event turns the globe.** Not the events the handle passes. Not her markers. Pick a time and the arrival face their places their own way, as before.

**What the map does: nothing moves.** The map is whole and still, and centring means nothing on it. The ring marks the place (`24`). The handle travels. The globe under the map is turned, so when she taps Globe the place is in front.

**One mend on the way.** The scene's own glide could outlive a turn the page set a moment later. Pick a time, tapped while a glide was running, would have been turned back at the next frame. A turn the page sets now ends any glide first.

## What was checked

**At 1,024 × 768.**

- The seas at 480, 201, 90 and 69 Ma in The World, on the globe and on the map. In Time, on the globe, at 90 and 280 Ma. Hide shallow seas by a real click; `?seas=0`.
- The grey turned on and off again.
- Dimetrodon tapped by a real click with the globe facing Asia and tipped 45°: the handle and the globe caught midway, then landed, the ring at the middle (x 512 of 1,024).
- The same in Time: the ring at the middle of the Earth's box (x 404 of 808).
- Grasslands, which has no place: the year cut, the globe did not move.
- Tiktaalik, then The asteroid while the globe was still turning: it landed on The asteroid.
- A finger held on the globe, then a tap: no turn, the year arrived. A finger put down midway: the turn stopped, the year arrived.
- On the map: nothing moved; back on the globe the place was in front.
- Reduced motion: a cut.
- The arrival on First trilobites: 521 Ma, selected, no panel, the ring at the middle. Unchanged.
- A city tapped (Delft came to the middle). A place on the map tapped (back to the globe, the place in front). Pick a time and its back.
- WebGL, once: the seas at 90 Ma draw the same.
- The Earth bench and Ancient Seas: they open and draw, no errors.

**At 768 × 1,024.** The arrival (`30`). The seas at the four ages. Dimetrodon tapped by a real click (`32`).

## Not tried

- An iPad, or Safari. The prompt asked for the Mac and iPad size, and I did not start the simulator.
- **How the turn and the travel look, running.** The pane runs frames only while it is looked at. I saw both caught midway and both landed, not the motion between.
- Time on the map. I looked at the map in The World only.

## Known and left

- **Faint lighter lines inside the blue**, most in the Gulf at 90 and 69 Ma (`03`, `04`). They are where two pieces' shelves overlap and the wash falls twice. They were there in step 12; the grey made them hard to see. They are edges of pieces, the same kind of thing as the tears.
- **Hudson Bay and the Great Lakes are blue at every age.** That is today's water in the land's own picture, the first of the three sets of data in Report 12. With the seas hidden they are still that pale blue (`11`).

## Needs Michael's eye

1. **The blue itself.** Is it light enough against the deep ocean? It is the shelf's own colour, a modest step lighter. At 480 Ma most of a continent is this blue (`01`). A lighter blue means changing the shelf's wash, which is the land's paint and not behind step 12's options.
2. **The handle travelling on a tap.** New. A tap across 400 million years runs the Earth through all of them in 1.2 seconds. Wanted, or should the handle cut and the globe alone ease?
3. **1.2 seconds.** The arrival takes 1.7 for a 35° turn. This may be a half turn.
4. **Upright against "in the middle".** A place far north or south is not at the middle of the ball. Upright won, as on arrival.
5. **The panel opens at once, at the upper right**, while the globe is still turning under it (`21`).
6. ~~Hide shallow seas hiding the shelves.~~ Answered 23 Nov: the shelves stay.
7. **The faint lines in the Gulf.** Leave them with the tears, or mend them?

## The chat's three defaults

- **The crust's bench switch goes**: gone, and the strength row with it.
- **Her finger wins**: built so.
- **Only a selection turns the globe**: built so.

## The files in `Time-Lab-Bench-12b-Nov23/`

**The seas.** `01` to `04`: 480, 201, 90 and 69 Ma, The World, the globe. `05` to `08`: the same on the map. `09`: 90 Ma with the grey turned on, for comparison. `10`: 90 Ma in Time. `11`: 72 Ma, the seas hidden, the shelves still there.

**The turn.** `20`: The World, before, tipped and facing Asia. `21`: The asteroid tapped, its place in front. `22`: Time, before. `23`: Dimetrodon tapped. `24`: the map, The asteroid tapped, nothing moved.

**At iPad size.** `30`: the arrival, unchanged. `31`: the seas at 90 Ma. `32`: Dimetrodon tapped.
