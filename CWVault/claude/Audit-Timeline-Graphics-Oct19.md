---
status: Report, 19 Oct 2026 (Claude Code, from Michael's prompt `claude/Prompt-Audit-Timeline-Graphics.md`). Read-only: no code was changed. Michael reads it and decides what to do.
role: What the Time Machine's map and globe code is, why the four things Michael saw happen, where it is inconsistent, how ready it is for tools, and an order of work.
---

# The timeline's map and globe: an audit

Written for a designer. Where a word from the code is unavoidable it is in `this type`, and it is explained the first time. Everything here was read in the code and then checked by running `active/time-machine.html` on the Mac in the app's browser pane, at 1024 × 768. Nothing was tried on the iPad or in Safari, which matters for one of the four problems (see *Risks*).

## 1. How the code is organised

Five files draw the timeline and the map. Each was built in its own week, and each still carries the shape of that week.

**The page, `active/time-machine.html` (930 lines).** The conductor. It holds the current year, wires the timeline to the map, draws its own last two lines (the After the ice line, *Main* and *Detail*, from 30 September), owns *play*, the summary block, the More windows, the column's words, and the marks the map shows. More of the behaviour lives here than in any of the modules.

**The deep lines, `js/deep-time.js` (770 lines).** The stack of coloured period lines: Earth, then whatever she opens beneath it. It owns the copper marker and the envelope. It knows nothing about the map; it tells the page the year, and the page tells the map.

**The last line, `js/timeline.js` (510 lines).** The After the ice line's marks, labels and tap-picking, from September. Shared with five story pages, so it cannot be changed freely. When After the ice is open, the deep module lays its line out but draws nothing; the page draws it with this module instead, and the copper *handle* on it is a second marker, separate from the deep module's. This is the *hand-over*.

**The ground map, `js/map.js` (1,640 lines).** Today's world: the pyramid of picture tiles made by `render.py` from ETOPO (height) and Copernicus (vegetation), the sea lowered by the sea-level curve, the ice sheets from ICE-6G, the coast and shelf lines, the story marks and their labels, pan, zoom, the bars. It also, since 6 October, hosts the globe: past the *seam* at 2.6 million years it creates one or two globe instances in a layer over its own tiles and hands them the year.

**The drifting world, `js/globe.js` (840 lines).** The continents moved to their year. One engine draws two views: the disc, and the same world flat (a 2:1 rectangle). It is also the only thing that draws the Earth before 4.4 billion years (the molten sequence).

### The path from data to pixels

*This side of the seam (younger than 2.6 million years), the flat map.* The page gives the map a year. The map reads the sea level off the curve and repaints the shelf on a canvas; blends the two nearest ice outlines on another canvas; places picture tiles for the level of zoom; draws the coast lines, the marks and the labels in an SVG over the top. The ground is a photograph, in effect, at whatever resolution the zoom asks for.

*Past the seam, the flat map and the globe.* The map hands the year to the globe engine. The engine looks up every plate's rotation for that year (`stories/plates/continents.json`: 795 pieces of continent on 416 plates, rotations every 5 million years back to 1,000 million). It fills an offscreen picture with each piece at its position, coloured by plate number, the *id raster*. Then, for every pixel of the view, it works out which point of the sphere is under that pixel, reads the id raster to find the plate, turns that point back to where it sits today, and copies the colour of today's ground picture (`art/maps/world.webp` with its vegetation, 1024 × 512) from there. That is the *skin*. For ages between 200 and 1,000 million years it copies a plain rock grain instead of the ground picture; beyond 1,000 million it paints no skin at all, only pale flat shapes with dashed or dotted edges; beyond 4,400 million it paints the molten maps. The skin is painted at half the screen's resolution and scaled up, and at a quarter while the finger is down.

So there are two completely different ways of putting ground on the screen: tiles of a high-resolution photograph (the ground map), and a per-pixel copy of one low-resolution photograph through the plate rotations (the globe engine). The flat deep map and the globe are one way; the ground map is another. The seam is where they meet.

### Three kinds of year

The current year is written in three units and kept in three places:

| Who | Unit | Where it lives |
|---|---|---|
| The deep lines | millions of years ago (`ma`) | inside `deep-time.js` |
| The After the ice line | years after the ice (year 0 = 10000 BCE) | the page's `handle` |
| The map | the store's astronomer's year (2026 is this year, −9974 is the ice) | inside `map.js` |

Conversions between them are written out by hand in the page, in the deep module, in the map and in the globe engine, each with its own copy of "this year". Nothing is wrong with any of them; there are simply four of them.

## 2. The same job done differently

Where the ground map and the globe engine do the same job, they almost never do it the same way.

| Job | Ground map (this side of the seam) | Globe engine (past the seam, and the globe at any age) |
|---|---|---|
| The land | ETOPO relief tiles with vegetation, the ramp in Spec-Maps, full resolution at every zoom | to 200 Ma: today's picture copied per pixel at half resolution; 200–1,000 Ma: a one-tone brown grain; beyond: flat pale fills, no texture |
| The sea | the picture's sea, the Spec-Maps ramp (pale shelves, dark trenches) | a flat two-colour gradient, no depth |
| Sea level | lowered by the curve; the shelf exposed, the new shore drawn | never changes |
| The ice | ICE-6G outlines, cross-faded between steps, cut away under water | this side of the seam: none at all; past it: polar caps as bands of latitude from a table of cold ages |
| Coast lines | the pyramid's contour files, per zoom level, 0 m and −200 m | its own copy of the 0 m file, drawn only under 5 million years, then fading |
| Projection | plate carrée at the whole world, bending toward Mercator as she zooms in, latitude capped at 85° | flat view: strict plate carrée, poles and all, its own zoom; disc: orthographic, capped at 560 px |
| Scale at the whole world | fitted to the box so no edge of the world shows (at 803 × 409 px: 2.27 px per degree, 3° cropped each side) | the flat view is the box's width less 16 px, 2:1 (2.19 px per degree) |
| Height of the box | the page's | grown to width ÷ 2 while the flat deep map shows, shrunk back at the seam |
| Cities | the page adds them as SVG marks: grey 3 px dot, 14 px name | the engine draws them on its canvas: ink 2.4 px dot, 14 px name, riding their plates |
| The tapped place | a vermilion dot (`#c84830`), 6.5 px, with a 12 px glow, bold name | a vermilion dot (`#c8451f`), 4.5 px, with an 11 px glow, bold name |
| Event places | the deepest line's events as dots | none (noted as engine work, 13 Oct) |
| Zoom to a place | slides and fits a 22° box | flat view: its own zoom, ×4; disc: turns to face it, no zoom |
| Play | redraws every frame (every 60 ms once After the ice is open) | switches to *fast*: no skin, flat brown fills |
| While dragging | labels freeze, the ice draws at half resolution | the skin drops to quarter resolution |
| Graticule and frame | none (Spec-Maps: none) | a graticule every 30°; the flat view draws a 1 px frame |
| The climate wash | — | a model by latitude, withdrawn from the column on 13 Oct, still in the code |

Two of these rows are not merely different but contradict each other on screen. At 20,000 years ago the ground map shows the ice sheets and the sea 116 m lower; tap *Globe* and the globe shows today's coast, no ice, today's sea. And Spec-Maps' *The look* says no graticule and no frame; the globe has both.

## 3. The four problems, and their causes

### 1. Missing textures on the map during play

Two causes, which together explain both what Michael saw and what I saw.

**The *fast* flag is applied unevenly.** When *play* starts, the page tells every deep view that exists at that moment to draw *fast*: skip the skin, fill the land flat brown. This was a Safari fix of 13 October ("Safari stepped"). But the instruction only reaches views that already exist. Open the page, tap Animals, press play: the flat deep view was made when Animals was tapped, so it goes fast and the land is flat brown for the whole run to the seam (that is what I saw: flat brown at 530, 400, 300, 200, 136 and 57 million years). If instead the view is created *during* the run, it never hears the instruction and keeps its skin. The same page can behave either way depending on what she did first.

**Two of the skins are flat by design.** From 200 to 1,000 million years the skin is a one-tone brown grain (the *inferred* and *fitted* grades of the 12 October rulings), and the grain's contrast is low enough that at half resolution it reads as a flat fill. At 200 million years today's picture fades in over 8 million years. So on a run without the fast flag she sees plain brown, then at 200 million years "suddenly textured and coloured". That is the grade boundary, working as ruled, but looking like a fault. Past 1,000 million years there is no texture at all, by the same rulings.

So: the texture layer for 200–1,000 exists and is applied, but is too quiet to read as a texture; past 1,000 there is none; and whether any skin shows during play depends on an accident of order.

### 2. The jump in scale at the seam

Three things change size at once when the year crosses 2.6 million years, and none of them is the continents moving.

- **A deliberate zoom.** The deep layer is styled to arrive "pulling away from the ground and leave coming down to it" (6 October): it is scaled by 2.4 and faded, over half a second, every time it comes or goes. I confirmed the transform in the running page. This is the zoom she sees. It made sense when the globe was a different kind of picture from the map; now that the flat deep map is meant to *be* the map at an older year, it reads as a fault.
- **Two different sizes.** The flat deep map is drawn 16 px narrower than the box and as a strict 2:1 rectangle; the ground map is fitted so that no edge of the world comes inside the frame, which at this box makes it about 4 % larger and crops 3° of longitude at each side. The continents land, then grow.
- **The box changes height.** While the flat deep map shows, the map's box is grown to half its width so the whole world fits; at the seam it shrinks back to the page's height.

And under all three, the sea changes from a flat gradient to the ETOPO blues, and the ICE-6G ice appears. A side finding: the ice file ends at 26,000 years, and for any older year the map draws the 26,000-year outline unchanged, so the full ice-age sheets stand on the map from 26,000 all the way back to the seam at 2.6 million years. The map says "ice sheets" for two and a half million years on the strength of one outline.

### 3. Textures vanish on the globe during play

The same *fast* flag, applied cleanly this time. With the globe up, play sends *fast* and the engine skips the skin: flat brown. Stop sends it back. I measured it: at rest the skin takes 18 to 20 ms per frame on a 393 px globe; during play it is not painted at all.

The flag was a performance patch. The honest fix is to make the skin cheap enough that no flag is needed: the plate picture (the id raster) is already cached per age; the skin could be cached per age step too and only re-projected as the view turns, or painted at a fixed modest size regardless of the box. That has to be tried in Safari on the iPad, where the stepping was.

### 4. The jiggling blue squares

They are not plate boundaries. They are **continental shelf**. The pieces in the plate file are continental crust including its shelf; the skin copies today's picture at each point's present-day position; and in today's picture the shelf is pale blue sea. So every piece comes through with a pale-blue rim, and where two continents were joined (both shelves meeting along the old join) the rims make a blue chain down the middle of the land. Inland seas and lakes come through the same way.

They are square because the skin is painted at half resolution (2 px blocks), at a quarter while the finger is down (4 px blocks), from a picture that is itself only about 3 px per degree. Every frame of a drag re-samples the picture at a new offset, so the blocks snap from one position to the next: the jiggle. On the flat map a pan does the same. At rest they are still there, just still.

Two fixes, both in the engine: treat a sea-coloured point of today's picture under a piece as shelf (paint it the shelf's own colour, or the land tone, or make the piece transparent there so the globe's sea shows), and sample the picture smoothly rather than by nearest block, at a resolution that does not change while dragging.

## 4. Duplicated code, dead code, and arrangements that only make sense historically

**Duplicated.**
- Reading a value off a curve at a year is written five times (the page, the map, the deep module, and twice in the globe engine).
- A helper for making SVG elements is written four times; "this year" is computed in four places; two files each carry a hex-colour mixer.
- The ice is drawn two ways inside the map (on a canvas for the moving map, as SVG paths for the still maps).
- The cities are drawn twice (the engine on the canvas; the page as map marks), with different dots.
- The tapped place is drawn twice (the map's *on* mark; the engine's marker), in two slightly different vermilions.
- The coast lines are loaded twice (the map's contour files; the engine's own copy of the 0 m file).
- There are two zooms (the ground map's view; the flat deep map's own) and two markers (the deep module's knob; the page's handle on Detail).

**Dead or vestigial.**
- The China and Egypt viewings, the chooser they belonged to, and the arrival sweep (30 September). Reachable only by typing `?view=` into the address.
- The *Climate* handler on the page, for a word that is no longer in the column; the climate wash, the continental-interior erosion, the latitude bands and the climate sentence in the engine (withdrawn 13 October).
- The seven-shifted-copies argument to the land path (the smear went 10 October).
- The *Both* view and its half-width layer (no word offers it).
- The map's own *reset* word in the bottom strip, and its left bar, both hidden by the page's CSS since the controls moved above the map (13 October); and a click handler on the hidden word.
- The `#model` paragraph under the map, never shown.
- The page's header comment still lists Globe, Map, Both and Climate as the column's words.

**Historical arrangement.** The ground map *owns* the globe: it creates it, sizes it, decides from the year whether it shows, and passes it the year. That was right on 6 October, when the globe was a second base past the seam. Now the globe is also the view this side of the seam, and the flat deep map is meant to be the same map at an older year, so the ground map hosts the thing that replaces it. The fast flag, the seam transition, the grown box, the second zoom and the second marker are all patches on that arrangement. Likewise the hand-over: the deep module was built as the one timeline, but the page still draws the last line itself with the September module, so the current year has two owners and tools would have to serve both.

## 5. Graphic style

**What is consistent.** One typeface, Georgia, everywhere. One ink, `#2a241c`, in every file. One parchment halo under labels. Italic for words that act. These are real strengths and they came from Glass Geometry's conventions being copied by hand.

**What is not.**
- *Copper* is `#b5652b` on the page and in the deep module, `#b87333` in the map and the probe. *Vermilion* is `#c84830` in the map and the page, `#c8451f` for the engine's marker. Six greys are in use (`#9a958b`, `#8a8378`, `#7d7a72`, `#6b655a`, `#b9b3a6`, `#b0a090`) with no stated roles.
- Type sizes used across the five files: 11, 12, 13, 14, 15, 16, 17, 20 px, each chosen locally. Line weights: 0.8, 1, 1.1, 1.5, 1.6, 1.8, 2 and 2.5 px.
- Four marker styles: the page's handle (copper, 7 px, white ring), the deep knob (copper, 6.5 px, parchment ring, age beside it), the map's dots (4, 3 and 6.5 px), the engine's dot (4.5 px) and city dots (2.4 px).
- The land colours: the ground map follows the ramp in Spec-Maps; the engine uses its own two land tones and its own two sea blues, none from the spec.
- The engine draws a graticule and a frame; Spec-Maps' *The look* rules both out.

**Where it is defined.** Nowhere shared. The page has CSS variables; each of the four scripts has its own block of constants at its top; the column takes its words from `css/htw.css`. The only number shared across files is the zoom gain, put on `plane.js` on 18 October, and that is the pattern to follow: one small shared file of named values that every script reads. Today, something new matches only if its author copies the right values by hand, which is how the two coppers happened.

## 6. How easy is it to add a tool? The two year markers

What the tool needs, and whether it can have it today:

| Needs | Today |
|---|---|
| The current year, to read and to set | three copies in three units; setting it means calling the deep module *and* the map *and* keeping the page's handle in step, as *play* does by hand |
| The scale of the deepest line (year to pixel and back) | private to the deep module; the page keeps a second, private one for Detail |
| Somewhere to draw on the line | the deep module wipes and redraws its whole SVG on every change, so anything a tool drew would vanish; there is no layer for tools |
| Pointer events that do not fight the knob | the knob and the tap strip have their own handlers; the page's overlay has another set for Detail |
| The map and globe to follow a year | one call, `map.setTime(year)`: the one part that is ready |

Where it would plug in today: into the page, as another block beside *play*, reaching into the deep module to draw and taking care of the hand-over itself. It would work, and it would be the fourth copy of the year logic. The next tool would do the same.

What would have to change first, in order:

1. **One owner of the year.** A small object, in one unit (the store's year is the natural one, since the map already takes it), with "set" and "listen". The deep module, the page's line, the map and *play* all listen to it instead of calling each other.
2. **A public scale.** The deep module gives out, for its deepest line, year-to-pixel and pixel-to-year, and its span.
3. **A tool layer.** The module draws its lines, then calls each registered tool with the scale and a group to draw into, then draws the knob. A tool is an object with *draw* and pointer handlers, nothing more.
4. **The knob becomes the first tool** written against that layer, so the two markers are two knobs, and a tool that wants a marker uses the same one the module uses.
5. **The measurement.** The free envelope already measures a span and writes its length on the line (lane D, 9 October). Two markers are a second measurer. Decide whether the envelope's reading and the markers' reading are one thing, or whether the envelope snaps and the markers measure.
6. **The hand-over.** Either the deep module draws the After the ice line too (retiring the page's own two lines, a bigger job than it looks because Detail's packing and picking live in the shared September module), or a tool must work on both lines. The first is right; it can come after the markers if the markers are allowed to be deep-lines-only at first.

After steps 1 to 4, the two markers are perhaps a hundred lines and touch one file. Before them, they are a patch on three.

## 7. An order of work

Each step leaves the page working. Tidying steps change nothing she can see; the bug steps change only the bug.

**Tidying**
1. One style file: the colours, type sizes, line weights and dot sizes, as named values on `CW` beside the zoom gain. The four scripts and the page read from it, with today's values, so nothing changes. Then settle the two coppers and the two vermilions on one of each (one shade changes: visible, tiny, and Michael's choice which).
2. One year: the object of §6 step 1, and one curve-reading function, replacing the five.
3. Delete the dead code listed in §4. Confirm first that *Both* and *Climate* are gone for good and that the viewings' chooser is not coming back soon (the comment of 16 October says it may).

**The bugs**
4. Problems 3 and 1 (the flag): remove *fast*; make the skin cheap by caching it per age step and view, and painting at a fixed size. Check in Safari on the iPad before and after, since Safari is why the flag exists. If it still steps, the fallback is a skin that updates on every second frame, never a flat fill.
5. Problem 4: mask the shelf and sample the picture smoothly at one resolution, dragging or not.
6. Problem 2: remove the 2.4× arrival; give the flat deep map the ground map's centre and scale so the two frames at the seam are the same size; stop growing the box. Then the ice beyond 26,000 years: decide what the map should show between the oldest outline and the seam (nothing, a fade, or the globe's cold-age caps), and do that.
7. Problem 1 (the grain): once the flag is gone, judge the 200–1,000 million year grain on its own. If it should read as texture, it needs more contrast and probably a hint of relief; that is a drawing decision, not a code one.

**One shared way of drawing** (the ground rule for the passes that follow)
8. Give the globe engine the two things the ground map has and it lacks: the sea level from the curve, and the ICE-6G ice this side of the seam. Then the globe at 20,000 years agrees with the map.
9. Give the flat deep view the ground map's projection (its Mercator bend as she zooms in) and its view, so that the only difference between the flat deep map and the ground map is the age of the picture. At that point the ground map's tiles are what the engine reads *when zoomed in on today*, which is the one thing the per-pixel skin cannot do well, and the two paths become one path with a high-resolution source for the youngest age.
10. Move the cities, the marker and the event places into the engine so each is drawn once, in one style, on both views.
11. Take the climate wash, the graticule and the frame out of the engine, or keep the graticule as an option with a word.

**Tools**
12. Steps 2 to 4 of §6 (the scale, the tool layer, the knob as the first tool).
13. The two year markers.
14. The hand-over retired: the deep module draws After the ice.

## 8. The earliest continents (for later)

Would the cleaned-up structure make them easy? Mostly.

- *Rounded, natural outlines.* The invented shapes are made in one place in the engine (a circle wobbled by two sine waves). Smoother wobble, more harmonics, and a little smoothing of the real cratons' outlines when they are drawn as guesses: easy, one function.
- *Dark grey, with texture.* The skin already has a branch per grade. A *guessed* and *invented* branch that reads the rock grain at a dark tone is a few lines, once the skin is cheap (step 4) and the shelf masking exists (step 5).
- *Semi-transparent shelves.* Draw each piece twice: a larger, paler, translucent copy under the piece. The per-pixel skin does not know "larger"; the shelf would be drawn as a path, which the engine already does for the dissolving pieces. Easy.
- *Never passing through each other; colliding, sticking, breaking.* This is the hard one. Today a guessed piece's position is "the model's last position plus a steady drift from a seed": no piece knows where another is. Collisions need a step-by-step motion model with contact, run from the seed so that *another guess* and replay give the same world every time, and joined seamlessly to the real cratons at 1,000 million years. It needs the year owner (so the model steps when the year steps) and a cache of positions per age step (so scrubbing is not a simulation each frame). Do it after everything above; do the look first, because the look is most of what distracts.

Nothing in this needs the ground map; all of it lives in the engine, which is the right place.

## 9. Risks, and what I am unsure of

- **Safari.** The fast flag exists because Safari stepped on 13 October. I checked in the app's browser pane, not Safari, and not on the iPad. Step 4 must be judged there. A 2× iPad screen has four times the pixels of what I measured.
- **The Mercator bend.** Making the flat deep view share the ground map's projection means the per-pixel inverse has to include the bend. It is a formula, not a mystery, but it is the step most likely to show a seam of its own.
- **The ice beyond 26,000 years** is a design question, not a bug. The map has been showing the ice-age sheets for 2.6 million years, and someone may have liked it.
- **The grain.** Whether the brown grain for 200–1,000 million years is "missing texture" or "the honest look of an inferred age" is Michael's call; the rulings of 12 October chose the second.
- **Which run Michael saw.** His "flat brown until 200 million years" fits a run without the flag (the grain, then the picture); my run had the flag and was flat brown throughout. Both are explained; I did not see his.
- **The hand-over** is the largest structural debt for tools and the slowest to pay, because the September module serves five story pages.
- **Not checked:** phone width; the iPad; *Cities* on the ground map after the seam; the probe bench, which shares the map and would be touched by steps 8 and 9.
