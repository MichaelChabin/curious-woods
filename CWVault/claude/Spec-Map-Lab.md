---
status: Proposed — 20 Sept 2026, from Michael's idea the same day. Not yet built, and it waits on the map's third pass. Name not settled.
role: The Lab about maps themselves — the place where map tools accumulate, and where a child finds out what happens when you flatten a round thing.
related: Spec-Maps.md (the same engine), Rulings-Sept-2026.md (the brain; gestures across tools), The-Intuitions.md
---

# Flattening the World

A globe on the left. A flat map on the right. Draw a line on either one and it appears on the other at the same moment.

That is the whole lab in one sentence, and everything else in it is a consequence.

Draw the straight line from London to Tokyo on the flat map and watch it sag south on the globe. Draw the short way on the globe and watch it bow up over the ice on the flat one. Nobody has to say the word distortion, and nobody should.

## One engine, two views

This is the brain's arrangement and it is the reason the lab is worth building at all.

*About Your Brain* and the brain pictures inside stories are one painting with different controls showing. The map lab is the same: **it is `map.js` with everything turned on.** A story calls the same engine with only the controls it names.

That is what makes a lab an accumulator rather than a side project. A tool built here — a way of measuring a route, a sea-level slider, a second projection — is immediately available to any story that asks for it, because there is only one thing. Two codebases would mean every tool gets built twice and the second copy rots.

So the rule for this lab, and for any lab like it: **nothing is built here that a story could not call.**

## What is in it at the start

Two tools, because Michael asked for two and because two is enough to find out whether the thing is any good.

### The pair

The globe and the flat map, side by side, showing the same world. A line drawn on either appears on both.

She can draw freehand. She can also drop two points and ask for a line between them, and here the lab has its one real piece of content, which is that *between* has two answers:

**the short way** — the actual shortest path over the ground. Straight on the globe. Bent on the flat map.

**the compass way** — hold one bearing and never turn. Straight on a Mercator map. A spiral on the globe.

London to Tokyo, drawn both ways, is the demonstration. They diverge by an enormous distance, and which one looks "straight" depends entirely on which picture you are looking at. This is also the honest answer to why Mercator exists, which almost nobody is told: it is a machine for one job — hold a bearing, sail in a straight line — and it was never built to tell you how big anything is.

### Dragging a country

Pick up Greenland and move it. It changes size and shape as it travels, because that is what the flat map does to things; on the globe beside it, it does not change at all.

Take it down to the equator and it is the size it really is, which is about the size of Algeria and nothing like the size of Africa.

Natural Earth gives the outlines, which the map already needs for country washes, so this costs almost nothing beyond the dragging itself.

## What she makes

A lab should leave her holding something. When she has a map she likes — a centre she chose, a projection she chose, her own lines on it — she can keep it and send it. That is the artifact, and it is the reason to build the lab rather than a demonstration.

What it should *not* do is score the drawing, congratulate her for finding the short way, or tell her which projection is best. There is no best one, which is the point.

## What a projection is, for the build

A pair of functions. `forward(lat, lon) → x, y` and `inverse(x, y) → lat, lon`. That is all, and it is why this lab is an addition rather than a rewrite.

Four to start: **equirectangular** (what the story maps already use), **Mercator**, **orthographic** (the globe), and one **equal-area** so there is something in the room that tells the truth about size.

Three things fall out for free, and they are the payoff for the seams the third pass is putting in:

Marks are already stored in latitude and longitude, so they draw correctly under any projection without being touched.

Coastlines and the shelf edge are already contours in latitude and longitude, so they follow too. The globe gets a correct coastline without a line of new code.

The globe itself is drawn by running the projection backwards: for each pixel on the disc, work out its latitude and longitude, and sample the world picture there. Thirty lines.

## Gestures

Per the ruling, **Glass Geometry decides first.** Drawing a line, dropping a point, dragging a thing — all of those exist there and must mean the same here.

One gesture has no precedent: **spinning the globe.** Dragging on the globe could reasonably mean draw a line or turn the world, and it cannot mean both. That needs deciding, not slipping in. My suggestion, for Michael to accept or reject: drag on the globe turns it; drawing happens only when a drawing tool is chosen, on either picture. The alternative is a handle or a rim she drags to turn it, which keeps drag-means-draw everywhere but adds a thing on screen.

## What is not in it

No panels explaining what she just saw. No *did you know*. No captions under the tools beyond their own names. A lab is a room with instruments in it, and the instruments should be the only things talking.

The lab holds almost no words at all: the name of each tool, the words on its controls, and nothing else.

## Tools that might accumulate here

Each one has to serve an intuition or it does not belong.

**Circles on the globe.** Scatter equal circles over the sphere and watch what each projection does to them. The oldest test in cartography, and it needs no words. #3, #5.

**Measure a route.** Drag along a drawn line and it gives the distance, and the flat map's own length beside it. #5, #11.

**The orange.** Try to flatten a curved surface: cut it, and cut it again, and watch the gaps. This is a real theorem met by hand rather than told — you cannot flatten a sphere without breaking something. #9, #11.

**The sea-level slider**, which the map is already half built for. Its home is here.

**Contours.** Free once the extractor exists, and wrong on a story map — a contour map is something you read. This is where reading one belongs. #1.

**Her own projection.** Choose what to preserve and see what it costs. The furthest out of these and the best if it can be made to work.

## Pillar and intuitions

**Pillar: Labs.**

**#3 — Multiple representations of the same thing.** The definitional case. One object, two pictures, and the whole lab is the act of moving between them.

**#5 — Approximation and order-of-magnitude sense.** How big is Greenland actually.

**#1 — Numbers as geometry, geometry as numbers.** A projection is a formula that is also a picture.

**#9 — Why is this true**, and **#11 — measure by counting**, both later, with the orange and the measuring.

## Build order, and what it waits on

This is a Lab, which is a much larger thing than the map resource, and Michael has said twice that he does not want to get caught up in a new tool. So it waits, and the queue is honest:

1. The second pass is built and **not yet pushed**. Nothing else matters until that is live and Michael has looked at it.
2. The third pass — coastlines, labels, shading — is specified and not built. It also puts in the projection seam this lab needs.
3. Then this, as a bench in `experiments/`, with two tools and nothing else.

Each of the two tools is a session. If the pair is not delightful within one session, that is the signal to stop rather than to push on.

## The prompt, when the queue clears

> **Do not start this until the third pass of `Spec-Maps.md` is built and pushed.** Read `CWVault/claude/Spec-Map-Lab.md`, then `CWVault/claude/Spec-Maps.md`, then the gesture ruling in `CWVault/claude/Rulings-Sept-2026.md`.
>
> **1. `projection.js`.** Four projections, each an object with `name`, `forward(lat, lon)` and `inverse(x, y)`: equirectangular, Mercator, orthographic, and one equal-area. Nothing else in the file.
>
> **2. Refactor `map.js` to take a projection** rather than assuming the bounding box is linear in both axes. The regression check matters more than the feature: after the refactor, `world` and `western-europe` in the existing bench must look pixel-identical to before. If they do not, stop and say so.
>
> **3. `experiments/maps/lab-pair.html`.** Globe on the left, flat map on the right, stacked on a narrow screen. Same world in both. A line drawn on either appears on both as it is drawn, not on release.
>
> Two kinds of line between two dropped points, named on the screen exactly as the spec names them: **the short way** and **the compass way**. Both drawn at once in different weights of the same vermilion, so they can be compared rather than toggled.
>
> The globe is drawn by inverse projection: for each pixel of the disc, find its latitude and longitude and sample the `world` picture. Coastline and shelf contours are already in latitude and longitude, so draw them through the projection too.
>
> Drag on the globe turns it. Drawing happens only with a drawing tool chosen. **Bring this to Michael before building it if you think there is a better answer** — it is a new gesture and the ruling says new gestures get named, not slipped in.
>
> **4. `experiments/maps/lab-drag.html`.** Country outlines from Natural Earth, already downloaded for the region washes. Pick one up and drag it; it re-projects as it moves, so its size and shape change on the flat map and do not change on the globe. Greenland is the one to check.
>
> **5. Nothing is scored, ranked or congratulated. No explanatory text anywhere.** Tool names and control words only.
>
> **The risk to report on first.** The globe is per-pixel canvas work. Say what frame rate it holds while being dragged, on an iPad as well as a Mac, and if it will not hold up, say so before building anything else — drawing at reduced resolution during the drag and full resolution on release is the fallback.
>
> Register both benches in `MANIFEST.md`, add their lines to `00-BOARD.md`, run `tools/check-deploys.sh`, stop and report before committing.

## Not yet decided

The name. *Flattening the World* is what this document calls it; *The World Won't Lie Flat* is the other candidate and is closer to the fact underneath.

Whether the globe and the flat map should be the same size on screen or whether the globe should be smaller, as an inset.

Whether spinning the globe is a drag or a handle.

Whether a story may ever call the pair, or whether the pair is a lab thing only. The principle above says a story could; no story wants it yet.
