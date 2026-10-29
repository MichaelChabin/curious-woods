---
status: Built and checked 29 Oct 2026; committed on Michael's word the same day ("Commit this session's hunks only, with MANIFEST and the board. Don't push."), then pushed on his word the same day ("Push"; `ac96edf`, live on curiouswoods.org). Waiting on Michael's look.
role: What Prompt-Build-Glass-900-Years-Ago.md asked for, what was built, how it was checked, and what needs his eye.
related: Prompt-Build-Glass-900-Years-Ago.md, cw-deploys/js/glass.js, cw-deploys/active/geo-1-glass-circles.html, cw-deploys/active/glass-geometry.html, cw-deploys/labs.html, cw-deploys/stories/gallery.json
pictures: Glass-900-Years-Ago-Oct29/ (mac-*.jpg are the canvas alone, from the pane at 1280 × 860; ipad-*.jpg are the whole screen of the iPadOS 26.5 iPad Air simulator, upright)
---

# Report: Glass 900 years ago

Built on `b5e2892`. Committed and pushed on Michael's word (`ac96edf`), live on curiouswoods.org. Everything below was checked on this Mac in the app's browser pane and on the iPad Air simulator (iPadOS 26.5), with real taps and drags.

## What changed

**1. Stained Glass is now Glass Geometry.** `active/glass-geometry.html` is titled *Glass Geometry — Curious Woods* (it was *Curious Woods -- Geometry Workspace*). It is off the gallery: its line is gone from `stories/gallery.json`. It is on the Labs page as *Glass Geometry*, with the label that page already had. Its address and its board are unchanged.

**2. Stained Glass Circles is now Glass 900 years ago.** The change is in the gallery line, the page title and the heading. The story's words are untouched. The address stays `active/geo-1-glass-circles.html`. House practice keeps a renamed story's address (*The Birth of Frankenstein* kept `have-you-thought-of-a-story.html`), so there is no redirect. The gallery slug stays `stained-glass-circles`, because anything kept in a child's browser is keyed by it.

**3. A new board, `theophilus`.** It lives in `IN_FILE_BOARDS` beside `circles` and `euclid`, and it is named for the story's person, as the Wright window is. It is the window profile with circles and lines. The story page mounts it in place of `circles`. The `circles` board stays in the file, and only the two-instance bench still mounts it. The euclid board and the Wright window are untouched.

- **Circles** work as before: press on a point, drag to another, let go, and the circle is measured as it is drawn.
- **Lines:** a tap on a point puts a copper ring round it that breathes until the second tap. On a mouse, the faint line that follows the cursor is still there too. A tap on another point draws a line across the whole plane. A tap anywhere else, including the same point again, cancels the line. That includes glass with a colour chosen: the tap colours nothing.
- **A tap inside a shape** with no line waiting colours it, as before.
- **Crossings** make points for line and line, line and circle, and circle and circle. The engine always did this; the board now has the line gesture that uses it.
- **No grid, and no Finer.**
- **Numbers on the axes.** The x axis is the line through 0 and 1, and the y axis is the line through 0 at right angles to it, up positive. A point on either axis gets its number when it appears, whether or not that axis has been drawn. 0 and 1 have theirs from the start. Whole numbers and fractions are written exactly (2, −1, 1/2), with a true minus sign. A point whose number is neither, like the crossings at √3 on the y axis, gets no number. That is left open, as the prompt says.
- **How "exact" is decided.** The engine stores positions as floating-point numbers, not exact values. A position counts as the fraction p/q when it is within a billionth of a unit of it, with q no larger than 100; the smallest such q wins. The engine's rounding error is far smaller than that. A number that is not a fraction (√2, √3, the golden ratio) stays far outside that tolerance for every q up to 100, so the test tells them apart. The same tolerance decides whether a point is on an axis. A fraction with a denominator over 100 would get no number.

**4. The column.** It reads *How this works*, then *Circles and Lines*, *Color*, *New Open Save* and *Demos*, then *Undo*, *Share*, *Full screen*, and *Reset view* where it was. Each item opens its box: the tip window everyone already knows, which can be dragged and closed. The box shows the prompt's sentences exactly as written, with each control under the sentence that explains it:

- *Color* holds the colours (with the remove and clear chips, and the recipe line), the lead slider, *Glass only* and *Choose new colors*.
- *New Open Save* holds Save, Open and New, each under its own sentence.
- *Demos* holds *Rose* and *Top*. The library has both, so there was no need to stop and ask.

These controls are the lab's own elements, moved into the box, so they work exactly as they did. *Choose new colors* fills the box with the new set, and the floating palette window is not used on this board. New and Save appear only when there is something to clear or save, and Open only once she has saved a design, as before. A box opens to the left of 0 when that clears the column. Otherwise it opens to the right of 1, and on an upright iPad that is what happens, so neither point is covered. A box is kept inside the board top and bottom, and none fades away by itself.

**Versions.** `glass.js?v=2026-10-29` on all four pages that load it: the story, the lab, the Wright window, and the two-instance bench. Their stamps, and the Labs page's, are `2026-10-29 b5e2892`. The story's stamp comment names the board: `'theophilus', glass.js?v=2026-10-29`.

## How it was checked

- **The boards that should not change.** The harness (`tools/glass-states/`) walked the circles board, the standalone lab and the Wright window. It ran on the committed tree (a worktree of `b5e2892`) and on this one, once after the build and again after the last edit. All three are *identical in every state* both times: canvas, visible markup, words, view, record and exports. The lab and the Wright window also open in the pane with no console errors. The lab's only visible change is its title.
- **Mac, in the pane at 1280 × 860:**
  - a circle from 0 through 1;
  - 0 tapped (the ring), then 1, giving the line, with −1 numbered where the first circle crosses it;
  - the circle at 1 through 0, giving 2;
  - circles at −1 through 1 and at 1 through −1, then the line through their two crossings: the perpendicular at 0, with 1 and −1 numbered on it, the √3 crossings unnumbered, and 3 and −3 numbered on the x axis;
  - cancelled lines: a point then empty ground, and a point then the same point. The record was unchanged both times, and no undo fired;
  - with red chosen, a point then a tap on blue glass: still blue, record unchanged. The same tap with no line waiting turned it red;
  - the Color box: blue picked and a shape coloured, the slider dragged (the lead thickens), *Glass only* and back (*Show circles and lines*), *Choose new colors* to Hokusai (the box's swatches changed, and no floating window appeared);
  - the New Open Save box: Save with a name, a reload, Open, the design picked and stepped to its end, numbers intact; New after a demo;
  - the Demos box: *Rose* (the box steps aside and the demo plays).
- **Mac and gallery:** the Labs page lists *Glass Geometry*. The gallery's links include *Glass 900 years ago* and nothing called *Stained Glass*.
- **iPad (simulator, upright):** the first-visit box, a circle by finger, the waiting point, the line, the circle at 1, a pan, the circle at −1, the perpendicular with its numbers, a cancel by a tap in a shape with red chosen, colouring red and then blue, Save (with its *Share the file / Not now* offer), Open, the Demos box with *Top* played to its end, and New. The slider, *Glass only* and *Choose new colors* were used on the Mac only.
- `tools/check-deploys.sh`: no errors. Its one warning (Glass Multiplication has no tab icon) was there before.

**Pictures**, in `Glass-900-Years-Ago-Oct29/`:

| File | What it shows |
|---|---|
| `mac-02-line-0-1` | the line through 0 and 1, with −1 |
| `mac-03-two-circles-and-line` | −1, 0, 1, 2 |
| `mac-04-perpendicular-at-0` | the perpendicular, with 1 and −1 on the y axis |
| `mac-05-reopened-with-glass` | the reopened design, with 0 on glass |
| `ipad-01-first-visit` | the first-visit box |
| `ipad-02-circle-and-waiting-point` | a circle, and 0 waiting |
| `ipad-03-axes-and-numbers` | both axes with their numbers |
| `ipad-04-color-box-red-glass` | the Color box, at the moment a tap was lost (see below) |
| `ipad-05-new-open-save-box` | the New Open Save box |
| `ipad-06-demos-box` | the Demos box |
| `ipad-07-top-demo` | *Top*, played to its end |

## Two fixes made while checking

- **The numbers blinked.** The engine restarts every point's birth animation each time she adds anything, so numbers tied to it went out and faded back in after every mark. Each number now has its own clock: it fades in once when its point first appears, and again only if the point goes and comes back.
- **On the iPad, a colour took two taps.** The first tap on a swatch ran its hover (the recipe line changed) and Safari held back the click, so the first shape tapped got the clear glass. This was already true of the circles board's floating palette. On this board a touch's release now picks the colour. The circles board and the lab are unchanged; the harness proves it.

## What needs Michael's eye

1. **The waiting point.** A copper ring that breathes round the point. Is it enough on the iPad? Should it be stronger, or show a line?
2. **The numbers.**
   - They are 11 px Georgia in Payne's grey, up and to the right of the point.
   - They have a thin parchment halo, added so 0 can be read on blue glass. On dark glass the halo reads as a pale ring round the figure (`mac-05`).
   - They are hidden under *Glass only*.
   - The y axis counts up from 0, so its points are labelled 1, −1 just as the x axis's are. Nothing says which axis a number belongs to.
3. **The boxes with controls in them.**
   - The Color box is tall: about 530 px with the Chartres set. On an upright iPad it covers the right-hand third of the board.
   - The palette's name (*Chartres*) no longer shows anywhere, because it was the floating window's title.
   - Save's note box and the WIP guard open over the New Open Save box, and the two parchments overlap muddily (`ipad-05` and the step after it).
   - After a demo, the replay panel and a box can overlap.
4. **The words and the screen.**
   - The sentences say *Glass Only* and *Choose New Colors*. The controls say *Glass only* and *Choose new colors*. The rulings want the word in the text to match the word on the screen exactly; which way should it go?
   - The Save sentence says "save it on your computer". Save keeps it in this browser, on this device, and offers to share the file.
5. **The story's own words now describe the old board.** Michael said he would revise them. They mention the names "under the word 'Demo' on the left" (the demos are in the Demos box now), "Click and drag to pan", and circles only. 

## Open, and named, not decided

- **A number that is neither whole nor a fraction** (√3) gets nothing in this version, as the prompt says.
- **A tap on empty ground with no line waiting still undoes,** as it did on the circles board. The old circles words said so ("Tap any empty space to undo"); the new box words don't. The cancelling tap never undoes. A second tap in empty ground does.
- **A drag that starts on a point while a line is waiting** cancels the line and draws nothing. It does not start a circle. The prompt names taps only.
- **The word *Glass only* turns into to get back** is *Show circles and lines*. The circles board says *Show circles*; this one was not specified.
- **No box fades by itself.** The circles board's first tip faded after two circles; these boxes stay until closed.
- **A tap on the board on the iPad was lost once,** the first tap after picking a colour. It did not happen again in three tries, and it never happened on the Mac. It may be the simulator. A real iPad will tell.
- **The board's points 0 and 1 sit to the left on an upright iPad,** so −1 lies under the column until she pans. Before I panned, a slow drag that started there was taken by Safari as a text selection in the column (the column sets `user-select` but not `-webkit-user-select`). That is the old layout and the old column, not new here.
- **The Open picker is wider than the board on an upright iPad,** and its close word is off the right edge. This is also old.
- **The two-instance bench still mounts `circles`,** and its subtitle still calls that "Stained Glass Circles as its story page mounts it". The Experiments index still describes that bench as "Stained Glass twice". Both are bench notes, left as they are. That index also carries another session's uncommitted changes.

## Not done

- **Committed and pushed** on Michael's word (`ac96edf`); checked live after the deploy: the Labs page lists Glass Geometry, both pages carry their new titles and `glass.js?v=2026-10-29`, the gallery list has no Stained Glass.
- **Not checked on a real iPad.**
- **Full screen** was not tried: the pane refuses it, and on the simulator it was not reached.
