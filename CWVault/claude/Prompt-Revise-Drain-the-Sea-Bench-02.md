# Prompt — Revise the Drain the Sea bench, 02

*18 Oct 2026. Merges the earlier draft of 02 with Michael's second look (17 Oct, evening). Run after 01, which is done. Paste the block below whole.*

> Read `CWVault/claude/Spec-Drain-the-Sea.md`, `CWVault/claude/Prompt-Revise-Drain-the-Sea-Bench-01.md` (what has already changed) and this prompt. Then read the Time Machine page and its scripts: it is the model for this layout. This revises `experiments/maps/drain-the-sea-bench.html` and the shelf files named below. No story page changes. The work is in the order below, layout first, because everything else sits on it.
>
> **0. Record rulings.** Append to `CWVault/claude/Rulings-Sept-2026.md` and `00-DECISIONS.md`, dated 18 Oct 2026, Michael. Corrections stay visible, so amend rather than replace.
>
> *The picture gets the screen — amended.* A map is as large as it can be **while still showing the whole world, poles included**, with room for the left column. At reset it is that size. She can then make it bigger with the drag bars. (Yesterday's version, full width at any height, cut off the poles.)
>
> *White means ice.* On every map, white and near-white mean ice and nothing else. Height on land keeps the land ramp; depth at sea uses the sea ramp below.
>
> *Deeper is darker.* The sea floor follows the old convention of sea charts: pale blue on the shallow shelves, darkening across the open floor, nearly black-navy in the deepest trenches. Ground that was sea keeps its blues even when the water has been taken away, so old sea floor never looks like land.
>
> *Abbreviations.* Abbreviate only where full words would hide something: labels, crowded lines, readouts. Never in prose. When we abbreviate, use the real forms people in the field use: **Ma** (millions of years ago), **Ga** (billions), **km**. Never invent one (no "Ba"). The first time a page uses an abbreviation, it appears once in full with the short form after it: "52 million years ago (52 Ma)". Every abbreviation shows its full words on demand: **press and hold** on the label shows them in place, and a word in the left column, *Full words*, expands every label that has room. Nothing responds to hover.
>
> *Where zero goes.* Zero is a choice, and moving it is a good habit. The direction, not yet built: the child sets zero herself. Any event she taps can offer *count from here*, and readouts then say "X years after (or before) that event". Until it is built, a story may suggest a zero; Drain the Sea's suggestion is the Atlantic beginning to open. Do not build the gesture now; report what it would take in `timeline.js` and the probe.
>
> **1. Layout, on the Time Machine's model.**
> - **Two pages.** The story's three paragraphs go on a page of their own, ending in a bold *Next*. The second page holds the working parts. A way back to the words sits in the left column.
> - **The second page:** Glass Geometry's left column, as Time Machine uses it. The deep-time timeline **above** the map, not laid over it. The map below it, with Time Machine's map/globe switch, its drag bars on the left and bottom edges (dragging must work, by finger and by mouse), and *reset*.
> - **At reset**, the map is as wide as it can be without losing either pole, given the left column and the timeline above it. Report the size on the iPad in landscape and portrait, and on the Mac.
> - **The left column** holds: *How this works*; the layer words *Age* and *Stripes*; *Full words*; and the way back to the story. The bench-only toggles stay below the map, out of the left column.
> - The probe's readout strip along the map's bottom edge stays as built in 01.
>
> **2. Colour.** Under the two colour rulings above. Replace white for high sea floor with the deeper-is-darker sea ramp: shallow shelves pale, ridge tops a light-to-middle blue, the abyss deep blue, trenches nearly black. Drained floor keeps that ramp, with the same relief shading the land uses. Remove the bench's *land colours / sea colours* toggle. Add one bench-only toggle to try: the water that is still there drawn as a thin glassy layer over the blue floor, so the floor still under water looks wet. Report screenshots at today's sea level, 130 m lower, 2,500 m lower, and drained, at whole-world scale and close in.
>
> **3. A vertical depth gauge** replaces the horizontal slider. It's a tall gauge down the map's right edge, like a tide pole: today's sea at the top, the drained bottom at the foot. Keep the current uneven scale, so the top 130 m gets generous room. Marks, labelled in short words: *the ice-age low* (130 m), *ridge tops* (about 2,500 m), *the average floor* (about 3,700 m), *the deepest trench* (about 11,000 m). She drags the water line down it. **When the probe is out, its floor gets a mark on the same gauge**, so she sees where the sea is and where the floor under her finger is, on one scale. The sentence the slider used ("The sea 6,850 metres lower than today. No sea was ever this low.") moves into the readout strip. Report how it feels on the iPad.
>
> **4. Zoom that isn't twitchy.** The pinch and wheel zoom are too sensitive, here and in Time Machine. Find where the gain lives (`plane.js`, if that is still where view state lives) and make it one named number shared by every page. On this bench only, add a slider for that number so Michael can tune it by feel on the iPad and on the Mac (trackpad pinch and mouse wheel may want different numbers; if so, make two). Report the default you chose and why. Do not change the shared default until Michael has picked a number.
>
> **5. The water ball.** The water she has drained is drawn on the map, at true scale, as a ball seen from above: a shaded sphere in the sea's own blue, with a soft highlight. Beautiful, not diagrammatic. It sits on Santa Fe for now (later, the place she names), grows as she lowers the sea, and shrinks as she raises it. It is a true circle on the ground, keeps its real size as she zooms, and never takes taps.
> - **The volume** comes from a table worked out once from ETOPO 2022: the water above each sea level, every 10 m from today to the deepest trench, stored as a small JSON with source and method. Not area times depth. Report three checks: at 130 m lower, at 2,500 m lower, and fully drained (which should be close to the published ocean volume, about 1.33 billion cubic kilometres; say how close).
> - **The words.** One quiet line in the readout strip: "The water you've taken out would make a ball about 450 kilometres across." When it helps, add one known distance from Santa Fe ("about as far as Santa Fe to Denver"), from a small table in the JSON. Do not invent comparisons the table lacks.
> - Nothing else about the ball is explained. It is a picture.
>
> **6. The timeline window follows the probe.** When the probe gives an age, the Focus window frames the last 250 million years (or a span around the probe's age, if that reads better; try both), so Detail shows what was happening. The handle still follows the probe.
> - First report which events in the shared list fall between 250 million years ago and today.
> - **Do not write event text.** List in `CWVault/claude/Pool-Inbox.md`, under *Wanted for Drain the Sea*, the ones Detail needs and the pool lacks. Candidates: the first dinosaurs; Pangaea starting to break up; the Atlantic starting to open; the first flowers; the asteroid, 66 million years ago; the first whales, about 50 million years ago; India meeting Asia; the Isthmus of Panama closing. Say which exist.
> - Report how Detail looks with the probe at 2, 52 and 180 million years.
>
> **7. Abbreviations**, under the ruling. "Ba" becomes "Ga" everywhere it appears, including the Time Machine page; report every place. The readout strip uses full words; labels may use Ma and Ga. Build press and hold and *Full words* in `timeline.js`, so every timeline gets them. Report where full words still collide when expanded.
>
> Bump stamps and script versions, update `MANIFEST.md` and `00-BOARD.md`, run `tools/check-deploys.sh`. Check that the Time Machine page still works after any shared change. Anything left open, name it. Say plainly what needs Michael's finger on the iPad. Stop and report before committing.
