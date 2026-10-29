---
status: Ready for Michael's read, 29 Oct 2026. Paste the block below whole into Claude Code.
role: Two renames (Stained Glass becomes Glass Geometry, on the Labs page; Stained Glass Circles becomes Glass 900 years ago) and a new board for the story: circles and lines, no grid, numbers on the axes, the controls inside the How this works boxes.
related: active/glass-geometry.html, active/geo-1-glass-circles.html, js/glass.js, labs.html, stories/gallery.json, Series-Glass-Geometry.md
---

# Prompt: Glass 900 years ago

> Read `cw-deploys/js/glass.js` where it matters here: `IN_FILE_BOARDS` and the circles board, the window profile (`APP`), the circle gesture and its measuring, the line gesture on the euclid board, point minting at intersections, tap-to-colour, the column built in `initHowThisWorks`, `HTW_STAGES` and the boxes they open, the palette window (Glass only, lead thickness, Choose new colors), New Open Save, `buildDemoList`, Finer, Reset view and Full screen. Then `active/geo-1-glass-circles.html`, `active/glass-geometry.html`, `labs.html` and `stories/gallery.json`. Read them; don't infer them.
>
> **1. Stained Glass becomes Glass Geometry.** The gallery's *Stained Glass* (`active/glass-geometry.html`) is renamed *Glass Geometry*, in its page title and wherever its name shows. It leaves the gallery and goes on the Labs page (`labs.html`), listed the way that page lists its labs. Its address and its board stay as they are.
>
> **2. Stained Glass Circles becomes Glass 900 years ago.** In `stories/gallery.json`, the page title and the page's heading. The story's words are otherwise untouched; Michael will revise them after he has used the new board. Keep the address unless house practice says a renamed story gets a new one; if it does, redirect the old address and say so.
>
> **3. A new board for the story.** A new board in `IN_FILE_BOARDS`, the window profile with circles and lines, mounted by the story page in place of `circles`. Leave the `circles` board in the file, unused, and leave the euclid board and the Wright window untouched.
>
> - **Circles**, as the circles board makes them now, measured as they are drawn: press on a point, drag to another point, let go. The circle is centred on the first and passes through the second.
> - **Lines**: tap a point, and it shows that it's waiting; tap another point, and a line runs through both, across the whole plane. A tap anywhere else, including the same point again, cancels the waiting line and colours nothing.
> - A tap inside a shape, with no line waiting, colours it, as now.
> - Where shapes cross, new points appear, as now, for line and line, line and circle, circle and circle.
> - **No grid.** Nothing drawn behind the construction, and no *Finer* on this board.
> - **Numbers on the axes.** The x axis is the line through 0 and 1; the y axis is the line through 0 at right angles to it. When a point is made that lies on either axis, its number appears beside it as the point appears, whether or not she has drawn that axis. 0 and 1 have theirs from the start. Points anywhere else get no number. Integers and fractions get their exact names (2, −1, 1/2). A point whose value is neither, like √3, gets no number in this version; leave that open and name it. Use exact values if the engine keeps them; if it doesn't, say how you decided.
>
> **4. The column.** *How this works* with four items, then *Undo*, *Share*, *Full screen*, and *Reset view* where it is now. The other words move into the boxes the items open, beside the sentences that explain them. Each box's words are below, exactly as written; the controls named in brackets sit in that box and work while it is open.
>
> *Circles and Lines*
> To make a circle, tap a point, then drag to another point.
> To make a line, tap a point, then tap another.
> Where shapes intersect, new points appear. Use these to build still more circles and lines.
>
> *Color* [the colours, the lead thickness slider, Glass only, Choose new colors]
> To color your glass, tap a color, then tap a shape.
> Use the slider to change the thickness of the lead.
> Tap Glass Only to see your finished design.
> Tap Choose New Colors to select a new set of colors to use.
>
> *New Open Save* [New, Open, Save]
> Tap Save to give your construction a name and save it on your computer.
> Tap Open to open a construction you've saved.
> Tap New to start a new construction from scratch.
>
> *Demos* [the demo list]
> Tap any of these to see sample constructions.
>
> The demos for now are *Rose* and *Top*. Michael will provide new ones. If the library has no demos by those names, list what it has and stop to ask.
>
> **Check before reporting**, on the Mac and on the iPad in the pane: a circle from 0 through 1; a line through 0 and 1, with −1 and 2 getting their numbers when circles cross it; the perpendicular at 0, and 1 on the y axis getting its number; a cancelled line; colouring with no line waiting; each box opened with its controls used inside it; a demo; Save, Open, New. Confirm Glass Geometry is on the Labs page and off the gallery, and that it and the Wright window open unchanged apart from the name. Put screenshots beside the report. Say plainly what needs Michael's eye: the waiting point, the numbers, and the boxes with controls in them.
>
> Name the board's version in its stamp, register anything new in `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Anything this prompt leaves open, leave open and name. Stop and report before committing.
