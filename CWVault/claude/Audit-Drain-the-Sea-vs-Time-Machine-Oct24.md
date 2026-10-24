---
status: Report, 24 Oct 2026 (Claude Code, from Michael's prompt `claude/Prompt-Audit-Drain-the-Sea-vs-Time-Machine.md`, written 19 Oct and run 24 Oct against the refactored code). Read-only: no code was changed. Michael reads it and decides what to do.
role: How much of the Drain the Sea bench stands on the Time Machine's shared code and how much is its own; what the refactoring of 19 to 21 Oct did for it for free, what it left behind, and an order for bringing the rest across.
---

# Drain the Sea against the Time Machine: an audit

Written for a designer. Where a word from the code is unavoidable it is in `this type` and explained the first time. Everything here was read in the code and then checked by running `experiments/maps/drain-the-sea-bench.html` and `active/time-machine.html` on the Mac in the app's browser pane, at 800 × 600. Nothing was tried on the iPad.

**The short answer.** The bench already stands on the Time Machine's shelf for the big things: the timeline, the map, the globe, the ice-age sea, the data layers and the one style file are the same scripts, loaded from the same files. The refactoring reached all of those without the bench changing a line. What it left behind is the bench's own wiring: how the probe moves the timeline, how the sea is set, and about two hundred lines of page code (the gauge, the ball, the strip, the drag bars, the column) that were written beside the Time Machine's rather than taken from it. Three of those are not tidying but faults that the refactoring exposed, and they are named first.

## The zoom speed, as asked on 24 Oct

The number lives in `js/plane.js` as `CW.ZOOM_GAIN`, wheel 0.10 and pinch 0.65, set there on 24 Oct from Michael's sliders. One thing to know: the Time Machine, and every story page with a map, does not load `plane.js`. They read a second copy of the same two numbers inside `js/map.js`, kept there as a fallback. So "one shared setting" is today one setting written in two files, which must be changed together by hand, as they were on 24 Oct. The bench still has its two sliders, below the map, starting at the ruled numbers and writing the live number while the page is open. They are bench-only and could go now the number is picked, or stay as the one place to tune it. Glass Geometry's own pinch does not read the number: its line in `js/glass.js` uses the fingers' spread as it is. The held note says "every map and board that zooms"; the board is not on the setting yet.

## Three things the refactoring exposed

These came out of running the bench as it is today. None stops the page working; each makes it tell her something false.

**1. The probe now moves her bracket.** The bench asks the timeline to frame the last 250 million years with a call named `focus`, which survived the refactoring, and then sets the year to the floor's age. Before 21 Oct that put the Focus window on 250 to today and the handle at the age. Now `focus` sets the Earth line's bracket to 250 to today and opens the stretch beneath as a snapshot, which is right; but setting the year then moves the nearer marker of the opened line to the age. I watched it: with the probe reading 52 million years, the second line's bracket read 250 to 52, its solid marker at 52. The stretch she is looking at has been shortened by the floor under her finger, and the solid marker says the world is at 52 million years while the map shows today. Section 3 says what the probe should drive instead.

**2. The sea has two owners, and the year's wins silently.** Her gauge sets the sea by hand; the timeline's marker sets it from the ice-age curve through the map. Both write the same number. I drained the sea to 3,000 metres with the gauge, then moved the marker to 20,000 years ago: the sea came back up to 116 metres below today, the gauge's line following, with nothing to say why. Dragging the marker to today put the sea at today. Any touch of the timeline undoes her draining. The Time Machine has one owner of the year now, and the sea follows it; the bench needs a rule for whose sea it is (section 7, step 3).

**3. The bench shows no ice at all this side of the ice ages.** It turns off the pyramid's painted ice layer (Greenland and Antarctica today) and hands the map no ice-age outlines. That was Michael's instruction of 17 Oct, when the ice was being drawn on the exposed floor. The cause was fixed at the source the same day: the map never draws ice below the current sea. The switch stayed. The held note of 19 Oct wants ice on, unmistakable, over Greenland and Antarctica. Section 5.

## 1. Shared, copied, or its own

| Part of the bench | Which | The files |
|---|---|---|
| The timeline | **Shared.** The same module the Time Machine mounts, reading the same period tree, event store and period words. | `js/deep-time.js`; `stories/deep-time.json`, `deep-time-events.json`, `deep-time-periods.json` |
| The map and the globe | **Shared.** The same scripts, the same pyramid, the same ice-age sea curve, the same plates, coasts and cities past the seam. Mounted with four options of its own: the painted ice layer off, no ice-age outlines, its own height, and the floor painted as floor at every depth. | `js/map.js`, `js/globe.js`; `art/maps/world-pyramid.json`, `stories/curves/sea-level-ice-ages.json`, `stories/plates/continents.json`, `cities.json`, `art/maps/world-tiles/contours-0.json` |
| The layers: floor, age, stripes | **Shared code, used only here.** The data layers, their colour tables and the reading of a number under a point were built for this bench but live in the map script, available to any page. The tiles are rendered by the bench's own renderer. | `js/map.js` (the data-layer block); `experiments/maps/render.py` |
| The left column | **A copy.** The words and the panels come from the shared column stylesheet and the shared info panel, as the Time Machine's do. The column's own CSS rules in the page are pasted from the Time Machine's, with the bench's words in place of its. | `css/htw.css`, `js/cw-panel.js`; the page's `<style>` |
| The drag bars | **A copy, already drifting.** The same CSS as the Time Machine's grips; the script is a rewrite of the Time Machine's that keeps the margins in a variable so reset can restore them. Two versions of one thing. | the page; `active/time-machine.html` |
| The probe | **Its own, on the shelf.** A shelf file used by this bench alone. It reads the style file and rides the map's public surface: read a point, place a pixel, pan, fit, bounds. | `js/probe.js`; `stories/plates/reversals.json` |
| The depth gauge | **Its own, in the page.** The uneven scale, the marks, the water line and its drag, with a private SVG helper. Nothing shared. | the page (`GAUGE_KNOTS`, `drawGauge`) |
| The water ball | **Its own, in the page.** The volume table is a data file of its own with its tool. The ball's five blues and its shadow are written in the page. | the page (`drawBall`); `stories/curves/ocean-volume.json`, `tools/ocean-volume.py` |
| The readout strip | **Two strips, one a copy of the other.** The probe's strip is the probe's, with a hook for the page's extra words. When the probe is off the bench draws a second strip of its own with the same look, for the sea's sentence and the ball's line. The map script's own strip is still created and its word hidden by CSS. | `js/probe.js`; the page (`.bench-strip`) |
| The zoom setting | **Shared**, with the caveat above: one number in two files. | `js/plane.js`, `js/map.js` |
| The map's size at reset | **Its own.** The bench works out "as large as it can be with the whole world, poles included" itself and hands the map a height. The Time Machine lets the map script size the stage. Both pages fit the whole world; they get there by different code. | the page (`fitSize`); `js/map.js` |
| Full words, press-and-hold | **Shared.** Built into the timeline module on 18 Oct for every timeline. | `js/deep-time.js` |

Two small vestiges, the same kind the Time Machine audit listed and the Time Machine has since removed: the bench asks the map for a reset word in its bottom strip and then hides it, and the map's left bar is hidden the same way. The Time Machine asks for neither.

## 2. The year

**Today.** The probe reads the floor and tells the page. The page tells the timeline to frame the last 250 million years if it is not already, and sets the timeline's year to the floor's age, with a flag raised so that the timeline's reply (the `onYear` callback, "the year moved") is ignored and the map stays at today. When she drags a marker herself the flag is down, the callback runs, and the page hands the map the store's year. So the probe's age reaches the timeline and never the map, which is what the spec asks: the floor's age is the floor's, not the world's.

**Through the owner?** Not today. The Time Machine's single owner of the year exists (`CW.cwYear` in `js/cw-time.js`, which the bench already loads) but the bench does not make one. It still uses the callback, which the module kept for pages that have no owner. The bench and the Time Machine are the only two pages on the deep timeline, and they now take the year by different doors.

**What it would take.** About fifteen lines in the page and nothing in any shared file. Make an owner; pass it to the timeline instead of the callback; listen to it, and on a change from any source but the probe hand the map the year. The owner already tells each listener who set the year, which is exactly what the raised flag was doing by hand. The probe sets the year through the owner, naming itself as the source. The flag goes.

**The question underneath.** With one owner there is one year on the page, and the solid marker is it. The probe's age is a different kind of number: not where she is in time but when a piece of floor was made. Section 3 argues it should not be the year at all.

## 3. The Focus window, and what the probe should drive

The bench's "window follows the probe" was built on the Focus window and the handle. Both are gone from the Time Machine; the module kept a `focus` call so this bench would not break, and reimplemented it over the bracket. That is why the bench still runs, and why it now misbehaves (fault 1 above): the bracket and the handle were two things, and the probe was allowed to move the second without touching the first. Now they are one thing. Moving "the year" moves a bracket end.

The bench is the only caller of `focus` anywhere. It is a back door kept open for one page.

**What the probe should drive instead.** Two things, separately:

- *The stretch she sees.* On entering the probe, set the Earth line's bracket to 250 million years to today, once, and open it beneath. That is one call to the module, made when the ring appears, not on every reading. The module has no public way to set a bracket except the back door; it needs a plain one (`setBracket(a, b)`, or `focus` renamed and documented as that). The "around the age" mode, which re-frames the line as she drags, should go or be judged against this: a stretch that keeps changing under a moving finger is the thing the snapshot rule of 19 Oct was written against.
- *The floor's age.* A mark of its own on the deepest line: the probe's ring, drawn on the timeline at the age, with the age beside it, moving as she drags. The module has a tool layer for exactly this, built on 21 Oct (`addTool`: a tool draws into its own group with the line's scale). The bracket is the first tool; the probe's mark would be the second, perhaps forty lines, and it would leave the markers and the year alone. The ring on the line and the ring on the map are then the same instrument.

When she then drags a marker, the world changes under the floor she is reading, and nothing is confused: the marker is when, the ring is how old.

## 4. Style

What the bench defines for itself rather than taking from the one style file. The Time Machine aliases its page colours to the style file's CSS variables; the bench writes the same hex values by hand.

**In the page's CSS.** The seven colours at the top (parchment, deep parchment, ink, soft ink, slate, Payne's grey, grey, copper, the rule) as literal hex, all of them already in the style file; a hover grey `#3D3D3A` also in the style file; the column's border `#d6c9ad` and the grip's `#b9ad92`, which are in the Time Machine's CSS too and in no style file; the gauge's label halo as a parchment at 0.85; the strip's parchment at 0.82 (the probe uses the same number from the style file); a seventh grey, `#7a6e60`, for the chron line, in no other file. Type sizes: 36, 22, 20, 15, 14, 13, 12 and 11 px, chosen in the page; the gauge's 11 px label is the smallest type on any map page. The intro's *Next* is bold; the Time Machine's is not.

**In the page's script.** The gauge's ink `#4a4336` (the style file's coast colour, written out), its copper `#b5652b` (the style file's copper, written out), its probe dot in ink; line weights 1.5, 1 and 3; the water line's arrow. The ball's five blues (`#d6e8f3` to `#17344f`) and its shadow, in no style file, and not the sea's blues either.

**In the map script, for this bench.** The floor's eight-stop blue ramp by depth, its opacity, the wet-glass blue and alpha, the age ramp's seven stops, the two stripe tones and their alphas, the relief strength. These are the sea-floor blues of the 18 Oct ruling and they sit in `js/map.js` beside code, not in `js/cw-style.js` beside the shore and shelf colours that are already there.

**In the probe.** Every colour from the style file. Its own: the ring's 48 px, the stroke weights 5 and 1.8, type at 15, 14 and 7 px, the strip's padding.

**In the renderer.** The land ramp, including the white that begins at 4,800 metres, is in `render.py` and baked into the tiles. So is the painted ice layer's white. The held note "high land never goes white" is a change to the renderer and a re-render of the pyramid, not a change to any script.

**Should the blues and the ice rule live in the one style file?** Yes, and the rule has two halves. The values — the floor ramp, the age ramp, the stripe tones, the glass, the ball's blues, the gauge's weights — belong in `cw-style.js` under the earth's heading, where the shore, the shelf and the ice whites already are; the map script would read them as it reads those. *White means ice* is not a value but a constraint on every ramp: no stop in the floor ramp, the land ramp or the age ramp may be white or near-white. Today it is kept by the floor and age ramps happening to lack one, and broken by the land ramp's peaks. The style file is the right place to write the rule down, beside the two ice whites it already names (`iceFill` for the sheets, `washIce` for the deep glaciations), so the next ramp is checked against it. The held note's coming colours — the neutral grey floor, the thinner glass, the orange ridge glow, the ice's faint blue and fine texture — should be born in the style file, not in the map script.

## 5. Ice

Same code, half switched off.

The ice the go-ahead's ruling changed is in two places, and the bench loads both: the map script draws the ICE-6G sheets on their own canvas, cross-faded between steps, fading with the ice-age curve beyond 26,000 years, and never below the current sea; the globe engine paints the deep-time glaciations as a soft overlay past the seam. Steps 6 and 7 of the Time Machine's order did that work on 19 and 20 Oct, and the bench got it for free: past 2.6 million years the bench's drifting world shows the snowballs and the cold ages exactly as the Time Machine does.

This side of the seam the bench shows nothing, by its own two settings: the pyramid's painted ice layer off, and no outlines handed to the map. Both date from 17 Oct, when ice was drawn on the drained floor. The cut below the sea was built the same day in the map script, where any page gets it. So the bench can take the ice back by removing two options, and the drained floor stays bare where the floor layer says it was under water. That is the ice the held note asks for over Greenland and Antarctica today; the painted layer's "white because it is white" look is the renderer's, and the note's faint blue and fine texture would be a renderer change (section 4).

One thing to know: at today's year the map draws no outline at all (the outline file starts at 500 years ago, and zero is "no ice"), so today's Greenland and Antarctica come only from the painted layer. Turning the outlines on without the painted layer gives ice in the ice ages and none today.

## 6. New shelf pieces

**General enough to be the Time Machine's own.**

- *The probe.* Already a shelf file; it rides the map's public surface and nothing in it is about the sea in particular except the words. "Tap the ground and read what is under your finger" is a thing any map story will want. The held note's *Probe* word in the column, off by default, belongs with it.
- *The data layers and the reading of a point.* Already in the map script; only this bench turns them on. Any page can.
- *The sea level by hand.* The map already takes a sea level from a page; the Time Machine's sea follows the year, the bench's follows the gauge. The gauge itself is the first control any page would need to lower the sea by hand (the sea-level bench of 29 Sep, *The sea, lower*, is a second customer). It should become a shelf piece when that second page wants it, not before.
- *The zoom setting.* Already shared; the two-file copy is the thing to settle (section 7).
- *The drag bars.* Two copies now. The map script already has bar code of its own (a left bar and a widen); one shelf version, asked for by an option, would end the copies.
- *The two-page shape* (the words, then the working parts with the column) and the whole-world sizing. Both pages do these by hand with pasted CSS. A shared skeleton is a bigger decision than this bench; the story template exists for stories, and the Time Machine is the model.

**This story's only.**

- The water ball on Santa Fe, its volume table and the distances.
- The sea's sentence and the ball's line.
- The three paragraphs, the bench's toggles (wet glass, two fingers, the window modes), the chron line.
- The timeline framed to the last 250 million years on entering the probe: a story's choice, made through the shared bracket.

## 7. Order

Each step leaves both pages working. The first three answer the faults; they need the bench and one small addition to the timeline module, and nothing from the Time Machine.

**Now**

1. **One owner of the year on the bench.** Make the owner, pass it to the timeline, listen, and drop the callback and the raised flag. The probe names itself as the source. Fifteen lines in the page; nothing shared changes.
2. **The probe stops moving the bracket.** Give the module a plain bracket setter (or rename `focus` to be one) and call it once when the probe enters; draw the probe's age as a tool on the deepest line through the tool layer. Remove the "around the age" mode or judge it against the snapshot rule. The Time Machine is untouched, since the setter is additive and the tool is the bench's.
3. **One owner of the sea.** Rule it: on this page the sea is hers. Then either stop handing the map the ice-age curve on this page (the marker's year moves the world and not the water; the ice-age low is a mark on the gauge, as it already is), or make the gauge add to the curve's level. The first is one option removed and is what the spec's words describe. Michael's call.
4. **The colours into the one style file**, with today's values, so nothing visible changes: the floor and age ramps, the stripe tones, the glass, the ball's blues, the gauge's inks and weights, the page's own hex. Write *white means ice* beside the two ice whites. Then the held note's new colours are a change to one file plus one painter, judged on the bench.
5. **The ice back on.** Remove the two options; check the drained floor at 130 and 2,500 metres with the ice-age sheets showing on the exposed shelf and nowhere below the water. The held note's blue-white textured ice, and the land's white top, go to the renderer as their own small job.

**Wait for**

6. **The drag bars and the column.** Leave the copies until the Time Machine makes its bars a shelf option, then take it. The pasted column CSS goes the same way if a page skeleton is ever shared.
7. **The gauge as a shelf piece.** When *The sea, lower* or a story page wants it.
8. **The zoom number in one file.** Either the Time Machine and the story pages load `plane.js` (one script more on eleven pages), or the number moves to the style file, which every map page already loads, and `plane.js` reads it from there. The second is the smaller change and puts the number beside the other named values. Do it when the style file is next opened.

After steps 1 to 3 the bench is on the Time Machine's model in every way that matters to a child: one year, one sea, the bracket hers, the probe an instrument on both the map and the line. After 4 and 5 the held note's colour and ice decisions can be built on the bench in a day, in the right files.

## What I checked, and what I am unsure of

- Run in the pane on the Mac at 800 × 600, both pages, no console errors. The three faults were produced from the console with the bench's own hooks, not by finger: the probe's age set to 52 million years, the sea drained to 3,000 metres, the marker moved to 20,000 years ago and back.
- Not tried: the iPad, the probe by finger on the refactored timeline, the gauge by finger. Fault 1 will look the same by finger; I did not watch the bracket redraw under a moving probe, which may also flicker, since the bench re-opens the line whenever a reading leaves the inner fifth of the stretch.
- The held note's grey floor and ridge glow are design decisions I have placed, not judged.
- Whether the probe's age should ever move the world (drag the floor's age and watch the Atlantic close to where that floor was made) is a story idea, not a fault; the spec says the map stays, and this report follows the spec.
