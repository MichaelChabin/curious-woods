---
status: Report, 19 Oct 2026 (Claude Code), answering `claude/Prompt-Tidy-Timeline-Graphics-01.md`: the tidying steps 1 to 3 built and checked, the bracket question answered, the iPad baseline described. Committed `54bbf5e` and `1223dab`, pushed on Michael's word.
role: What changed in the tidying, what was checked and how, what surprised; whether the bracket absorbs the Focus window and the envelope; how to take the iPad baseline.
---

# Tidying the timeline's graphics, steps 1 to 3

Written for Michael, after the audit (`Audit-Timeline-Graphics-Oct19.md`) and his rulings of 19 October. Nothing a child can see has changed except the copper, and that is proved below rather than claimed.

## What changed

**Step 1, one style file: `js/cw-style.js`.** Every colour, type size, line weight and dot size the five scripts used now lives in one file, named by its role (ink, ink soft, grey, parchment, copper, vermilion, slate, payne, the earth's coast and shelf, the globe's seas and lands, and so on). The five scripts (`map.js`, `timeline.js`, `globe.js`, `deep-time.js`, `probe.js`) read from it and stop with a plain message if it is missing. The Time Machine's own CSS reads the same values through CSS variables the file writes to the page, so the page and the scripts cannot drift again. The values are exactly the ones the scripts carried this morning, with two changes:

- **Copper is `#b5652b` everywhere** (ruling 1). Two places had `#b87333`: the copper "the one the story is about" dot on the four story maps (Hokusai, Vermeer, Van Gogh, Necker), and the probe's ring and needle on the Drain the sea bench. Both now take the marker's copper. That is the one visible change.
- **The globe's marker takes the map's vermilion `#c84830`** (it had `#c8451f`). The two are in the picture I sent; your yes settles it. Until then the file carries the map's.

Where two scripts had near-twins of one colour I kept both under their own names, unchanged: the map's label halo `#f4f1ea` beside the page's parchment `#f4f1e8`, and two one-off literals in `map.js` (a caption grey, a hover blue). Merging them would be a visible change, so it waits.

**Step 2, one owner of the year: `js/cw-time.js`.** The year is now one object, `CW.cwYear`, that anything can set and anything can listen to. The deep lines set it when she moves their marker and follow it when anything else moves it; the page's own After the ice handle sets it; play sets it; one listener on the page hands it to the map. Before, the year was kept in three places in three units and passed around by hand. The same file holds the one curve-reading function (there were five copies) and the one "this year". The deep module still answers the old `onYear` callback for a page without an owner, so the Drain the sea bench is untouched. The map's `setTime` is unchanged, so the eleven pages that load the map needed nothing but the two new script tags.

**Step 3, the dead code out** (ruling 2): the China and Egypt viewings, their chooser and the arrival sweep; the *Climate* handler and the model paragraph; the CSS that hid the map's strip word and left bar (the page now asks the map not to make them, two new options); the climate wash in the globe engine and the seven-copies argument of its land path; *Both* and its half-width layer in the map. The page's header comment now describes the column as it is.

**What did not change, deliberately.** The globe's graticule and frame (ruling 6) are a visible change and wait for the bug pass. The fast flag, the seam transition, the ice beyond 26,000 years and the grain are the bugs; untouched.

## What was checked

- **The Time Machine, six states, before and after.** The opening; Animals tapped (720 million years, the flat deep map); 150 million years; 20,000 years with the ice sheets; the globe at 20,000 years and at 150 million; After the ice open with Detail. For each I hashed every drawn part: the deep lines' SVG, the page's overlay and Detail line, the summary, the column, the map's tiles and their positions, the sea and ice canvases, the globe's and the flat deep map's canvases pixel for pixel, the box's size. Every hash is identical before and after.
- **The other ten pages that load the scripts**, each served side by side from the committed tree and the new one, their bodies and canvases hashed with the copper normalised: Hokusai, Vermeer, Van Gogh, Have you thought of a story, Stained Glass Circles, After the Ice, the sea-level bench, the Drain the sea bench (past Next), the story template: identical. Professor Necker's page differs only by its own random scatter of stars, which differs on every load.
- **Behaviour that the hashes cannot see.** Play on a deep line: the year runs, the map follows (one frame behind, as before), the marker and its age move, the "just passed" line is said, stop stops. Play on After the ice: the handle runs, the map follows a few times a second, the copper ticks on the lines above follow, stop stops. The page-standard check passes. A fresh tab of the new page shows no errors, only the two pre-existing canvas warnings.
- **Not checked:** Safari, the iPad, a phone width.

## What surprised me

- The app's browser pane served me a cached copy of the page once, which looked like a broken build until a load with a fresh query string showed the real one running clean. I have noted it so the next session does not lose an hour to it.
- There was no copper on the Time Machine itself to change: its copper was already the marker's. The change lands on the story maps and the probe.
- The page's handling of reduced motion existed only for the arrival sweep, which was dead; it went with it.
- `cwMap` had no way to say "no reset word, no left bar"; the page had been hiding them with CSS. Two options now say it.

## The bracket: can it absorb the Focus window and the envelope with nothing lost?

Yes, with one thing to decide and one piece of work it drags in.

**What carries over cleanly.** The Focus window's two draggable ends and draggable body are the bracket's two markers and its bar. The envelope's snap to a period (the detents, the blue when snapped, the period's name on the funnel) can stay as the markers' behaviour near a period's edge. The free envelope's measurement, lane D's "about 186 million years" on the line, is the span on the bar. The knob's age beside it is the date outside each marker. Tapping the open period to close its line becomes tapping the bar again. Play from the left marker to the right one is today's play from a line's older end to its younger end, with the right marker as the stop.

**The one thing to decide.** Today the envelope's ends and the current-year knob are different things: dragging an end rescales the line below live, and dragging the knob moves the map and leaves the line below alone. In the bracket the current year *is* one of the ends. So when she scrubs the year to watch the continents move, she is also moving an end of the stretch. If the line below follows the bracket live, as the envelope's line does today, then scrubbing the year zooms the line beneath in and out under her finger, and play shrinks it as it runs. If instead the line below is set when she taps the bar and stays until she taps again, scrubbing is calm, but the funnel from the bracket to the line below no longer meets it exactly while she scrubs. Your spec says the bar's tap opens the stretch and the bar's drag slides it, and does not say which. My recommendation is the second: the line below is a snapshot of the stretch when she tapped the bar, redrawn when she taps again, and the funnel is drawn to the stretch as opened, not to the markers.

**Nothing is lost in reach.** A year strictly inside an opened stretch that is not one of its ends is reached on the opened line itself, whose own bracket's markers go anywhere in it.

**What it drags in.** After the ice today is the page's own two lines (Main and Detail) with a Focus window on Main; the deep module lays that line out but does not draw it. The bracket on that line means the deep module draws After the ice too, which retires the hand-over (the audit's §6 step 6, the long debt). Two things Detail does that the deep lines do not must come across: the 1–5–10 ladder ticks that relabel as the span changes, and the soft stretch under a date given to a decade, century or millennium. The People and Sea level curves become curves under the deepest line, which the module already draws. The September `timeline.js` stays for the five story pages.

So: build the bracket on the deep lines first, with the snapshot rule; then retire the hand-over so After the ice gets it too.

## The iPad baseline, for step 4

I cannot drive the iPad from here. The tidying is live now, and it changes nothing in play (the fast flag, the seam and the squares are as they were), so the baseline is taken on the live site as it is.

On the iPad in Safari, open `curiouswoods.org/active/time-machine.html` and tap Next. Then, with Control Centre's screen recording running (Settings → Control Centre → add Screen Recording, if it is not there):

1. Tap *Animals*. Tap *play* at the default speed and let it run to the end. Note where the land is flat brown and where it has texture, whether the run stutters or stops, and roughly how long the run takes.
2. Tap *reset*, then *Globe*, then *play*. The same notes. Tap *stop* in the middle: do the textures come back?
3. With the globe stopped at about 150 million years, drag it slowly: the blue squares, and whether they jiggle. Then the same on the flat map (*Map*), dragging to pan.

Two recordings of about a minute each, map and globe, sent to the Mac, are the baseline; if you say what you saw in a line or two beside them, that is all step 4 needs. If you would rather I read numbers than watch, Settings → Safari → Advanced → Web Inspector lets the Mac's Safari read the iPad's console while the page runs, and the globe's own `skinMs()` reading says how long each frame's texture pass takes.
