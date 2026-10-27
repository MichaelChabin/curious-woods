---
status: Draft for Michael's read, 27 Oct 2026. Step 2 of the 3D Earth chat (Prompt-Chat-3D-Earth.md). Built on the audit of 26 Oct (Audit-Earth-3D.md) and Michael's rulings of 26–27 Oct. Nothing is built from it until he has read it.
role: The one Earth: what it is, what it shows, how she handles it, how it becomes the map, what stays exactly as now, and how every page gets there without breaking.
related: Audit-Earth-3D.md, Standard-Interactives.md, Worknote-3D-Session-25Oct.md, Spec-Maps.md, Spec-Drain-the-Sea.md, Notes-Drain-the-Sea-Held.md, Report-3D-Shelf-Oct26.md, cw-deploys/js/globe.js (header)
---

# The Earth

## The one idea

There is one Earth in Curious Woods. The Time Machine's globe, its flat deep map, a story's world map, Drain the Sea and the Earth cut open are all the same object, seen from different distances and at different ages. Michael hates two approaches to one problem; this is the answer for the ground.

It is a ball, from far out all the way in to the Alps. When she wants the whole world at once, a word lays the same Earth out flat. Whatever age she sets, the continents are where they were, and the picture says how sure we are.

**Pillar.** Picture furniture, like the map: stories, the Time Machine and the labs call it. **Intuitions.** #13, historical sweep: any age, any place, one gesture. #9, how do you know?: the picture changes as the knowing changes, before a word is read. #3, one thing shown two ways: the ball and the flat world are visibly the same Earth, the same pictures and the same plates, laid out two ways. #5, order of magnitude: the water ball at true scale beside the Earth, the crust's thinness under *Cut open*.

## How it's made, in one paragraph

The pieces of continent become cut-outs of today's picture, glued to a ball and turned by their plates. The graphics card draws them where they are; nothing works out, pixel by pixel, which plate it is looking at. The plate model and the motion model stay in JavaScript, as now, and hand the card one turn per plate per frame. (The audit, section 3, found this; it replaces the "which plate" picture the first plan put at the centre.) The shaders are written in TSL on three.js's WebGPU renderer, which falls back to WebGL 2, per the standard. The Earth stands on the shelf already built: `scene.js`, `noise.js`, `honest.js`, `still.js`, and later `cutaway.js`.

## What it shows

### The ground: a photograph that gives way to paint

**Two kinds of ground, one under the other.** The *data* is ETOPO 2022, as now: height, sea depth, coasts, contours, ice thickness. Nobody sees it directly, but everything that depends on height reads it: the sea lowered, the shoreline at any level, the probe. The *skin*, what she sees, is NASA's Blue Marble, the photograph, in place of the height-coloured ramps and the vegetation layer. (Michael, 26 Oct.)

**The story maps match the globe.** They take the same skin, because they are the same Earth zoomed in. (Michael, 26 Oct.)

**The photograph fades by 2.6 million years.** A photograph is true only of today. As she goes back it fades to paint, gradually, and is gone by the seam at 2.6 million years, where the plates start to move. Before that the paint follows the colours already ruled: green while there are plants, bare rock before about 450 million years, near-black before oxygen at about 2,400. The paint looks like the photograph painted, so what changes is how sure the picture is, not what it shows. (Michael, 26 Oct; it replaces the globe's present rule, which carries today's picture on the plates back to 300 million years.)

**The land-only Blue Marble**, over CW's own sea: the version with the sea floor painted in is NASA's blues, and the floor belongs to Drain the Sea (grey, per the held note). Credit: *NASA Earth Observatory*.

### The plates, and the five words of knowing

The ages and their words stay exactly as `globe.js` has them: *ground* this side of 2.6 million years, then *measured*, *inferred*, *fitted*, *guessed*, *invented*, and *none* above 4,400. The plate model (Merdith 2021, to 1,000 million years), the motion model past it, the blobs before the oldest rock, the seed, *another guess*: all kept.

The picture carries two honest signals, and they are separate:

- **The surface** says how sure we are of what the ground looked like: photograph near today, paint everywhere else.
- **The edges** say how sure we are of where the pieces were: crisp for measured, inferred and fitted; soft, washed and uneven for guessed and invented, as they are now.

### The sea

The sea is a ball of its own, glassy, just above the floor. Lowering the sea is lowering that ball, from the same height data. Where the floor comes out, it is grey (the held note). The island, the drowned band and the shelf round each old piece stay as they are now, drawn as meshes.

### Ice

The ice ages of the last 2.6 million years from ICE-6G, as now, fading in and out; the great cold ages of deep time as the soft, feathered overlay of ruling 3 (19 Oct). White means ice.

### Today's lines on the past

Today's coastlines, and any other modern line, are **off** over an ancient surface. A word in the left column turns them on. (Michael, 26 Oct.) This side of the seam they are the coast itself and always drawn.

### The inside: *Cut open*

A word, ***Cut open***, takes a wedge out of the Earth; the same word closes it. (Michael, 26 Oct.) The two cut faces show the inside at the age she has set, and the outside and the inside are always the same moment. There are three insides by era, blending into each other as the outside does:

- **Molten** (4,567 to 4,400 million years): the magma ocean, the crust appearing at the rim exactly as it does on the outside, the Moon's impact melting it again from the top down.
- **Dripping** (4,400 to about 2,500): the 25 Oct sketch: cold crust sinking in drips, melt rising to the rafts. The rafts at the rim are the pieces on the outside where they cross the cut.
- **Plates** (after about 2,500): slabs sinking; a solid inner core somewhere in the last billion and a half years, when it formed being uncertain and said so.

Core and mantle to scale; the crust stretched, with a note and a thin bracket on the picture: *crust: drawn twenty times thicker* (or whatever it turns out to be). The inside is painted, never photographed: inferred today, guessed before.

## How she handles it

- **One finger turns it like a globe on a stand.** North up at rest; the tilt stops when a pole faces her; a drag to the right moves the surface east, whatever the tilt (deep-time ruling 3, 6 Oct). The toolkit's free trackball stays for the Sun; the Earth gets its own turn. (Michael, 27 Oct.)
- **Pinch zooms**, from the whole ball down to the finest detail the map pictures hold.
- **Two fingers move the view**; **tap picks**: a city, an event's place, a piece of continent at this age.
- ***Reset view*** is a word.
- **Nothing turns on its own** when the page opens.
- In Drain the Sea, a ***Probe*** word puts the probe out. While it is out, one finger moves the probe and the Earth holds still; two fingers turn and zoom. (Held note, 19 Oct.)

## Close in, and flat

*Ruled 27 Oct (Michael), replacing the audit's morph.*

**Close in is the ball.** She zooms in on the globe all the way. The Earth is big enough that, close in, it already looks flat, the way Google Earth does. The map's tile pyramid is draped on the ball piece by piece as she zooms, and dropped as pieces leave the view. The marks, labels and placer sit on the ball, placed by projection, with the same rules as now. Nothing bends, nothing is handed over.

**Flat is a word.** A flat map shows what a ball never can: the whole world at once. Pangaea entire, every ocean's ridges, the dots of After the Ice spreading over every continent together. So a word in the left column (*Map*, as in the Time Machine today; *Globe* brings the ball back) lays the same Earth out flat: the same plates, the same pictures, the same age. The flat world is whole and still. It does not pan or zoom; to look closer, she goes back to the ball. An animation of the ball unwrapping into the flat world would be a pleasure and can come later; it is not needed.

**What goes.** The map that pans and zooms on today's story pages, with its bend from Mercator at regional spans, retires: close in, the ball does that job. There is then one way to look at the Alps, not two.

**A story chooses where it opens:** close in on the ball (Van Gogh's Provence, which will look like an ordinary map), far out on the ball (Hokusai's blue, from Berlin to Japan), or the flat world.

## Where it runs

**Every screen, one version.** The Earth is an exception to the standard's rule against 3D on phones. A phone gets the Earth at the lowest tier; a phone too old to draw 3D at all gets a still picture and one line. Phones are served, not designed for. (Michael, 27 Oct.)

**Tiers**, per the standard: sharpness, the ground picture (8,192, 4,096, 2,048), the ball's smoothness, the noise in the crust and ice, how far in the tiles go. The kept picture is always made at full.

**What must survive the floor:** the continents where they were at her age, moving as the year moves, with their edges saying how sure we are.

**Only where it's wanted.** A story page loads the Earth only if the story asks for it. A story that ends on a short span of the map need not carry three.js.

## What stays exactly as now

The ages and the words of the five grades; every grade sentence and molten sentence; the molten sequence and its ages; the plate model, the motion model, the blobs, the seed and *another guess*; the seam at 2.6 million years; the *Globe* and *Map* words; the dozen cities riding their plates; the placer and its rules; the ice-age sea curve; the colours from `cw-style.js`; the parchment around the Time Machine's Earth. And the names a page uses to talk to the globe (`setTime`, `placeAt`, `project`, `turn`, `grade`, `reguess` and the rest), so that when the time comes, swapping the engine is one switch in `map.js`.

## Getting there

`globe.js` keeps running the Time Machine until the last step. Every page works at every step.

1. **The first bench**, `experiments/earth-3d.html`, beside the Time Machine and not in it: the lit ball, north up, the desk-globe turn, pinch; the pieces as meshes, turned by the plate model to 1,000 million years under a slider; the cities. The old 2D globe beside it at the same age, so the two can be compared by eye. Blue Marble and the old coloured ground switchable, so the photograph can be judged. Tried on a phone once.
2. **The look by age**: the fade from photograph to paint, the paint by age, the islands and shelves, the deep ice, the molten sequence. Judged side by side with the old globe at a fixed list of ages and views.
3. **The guessed and invented ages**: the motion model, the blobs, *another guess*, with the same seed giving the same guess in both engines.
4. **This side of the seam and the honesty**: the sea, the floor, the ICE-6G ice, today's lines and their word, the edges, the scale note, the kept picture.
5. **Close in**: the tiles draped on the ball, the marks and labels on it, the probe on the Drain the Sea bench.
6. **Flat**: the *Map* word laying the same Earth out flat, whole and still.
7. ***Cut open***: the three insides lined up with the outside.
8. **The swap**: `map.js` makes the Earth instead of the globe; the Time Machine on the 3D Earth, checked on the iPad at every tier. `globe.js` retires on Michael's word, after the iPad and not before.
9. **After**: Drain the Sea on it (the water ball as a real sphere, the ridges, the grey floor); the story pages' world maps moved onto the Earth, each opening where its old map did; the Earth at a story's end as a story's choice.

Each step ends with Michael's finger before the next. The audit guessed eleven to fifteen Claude Code sessions, with the morph; without it, perhaps one or two fewer, and the riskiest step gone.

## Open, and not invented here

- **Scotese.** Whether Scotese and Wright's PaleoDEMs (heights for the last 540 million years) become the data under the painted past, and if so, which plate model the Earth runs on: Merdith's or Scotese's, not both. The follow-up question in `Prompt-Audit-Earth-3D.md` has not been answered yet.
- **Which month of Blue Marble.** One month shows seasonal snow, which competes with *white means ice*. One summer month, a blend, or the seasons.
- **The photograph against two map rules.** The Sahara's orange and Australia's red-brown under vermilion marks bend *no red on the earth*; labels may be harder to read on a photograph than on the quiet ramp. A bench question, and Spec-Maps changes when it's settled.
- **Light.** Whether the ball has a day side and a night side, and whether that is light or drama.
- **The wedge.** Whether *Cut open* also turns the cut toward her, or she turns the ball to look in.
- **The water ball.** In space beside the Earth, or on the surface where the water was.
- **The insides' details.** Exactly where the eras meet; when the inner core appears.
- **The small still maps.** Whether margin maps and pop-up windows become the Earth too, or stay small pictures.
- **The flat world's projection.** Plain equirectangular (the pictures' own shape, so the simplest) or something kinder to the poles. A bench look.
- **Marks on the flat world.** Whether a tap on the flat world picks a place as on the ball, or the flat world is only to look at.
- **Engineering, for the build to report on:** seams between piece meshes, the pinch at the poles, old iPads below 30 frames a second.
