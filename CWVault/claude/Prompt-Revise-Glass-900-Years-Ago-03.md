---
status: Ready for Michael's read, 30 Oct 2026 (02: quarter-unit sizing, the frame's size shown while dragging; 03: the frame is lead, and it is fixed from the first circle or line). Paste the block below whole into Claude Code, after the three photos are in place (see 4).
role: First revision of the Glass 900 years ago board: numbers placed as the coordinate plane will place them, the frame as her design table, and twelve-colour palettes with three new Gaudi sets.
related: Prompt-Build-Glass-900-Years-Ago.md, js/glass.js, palettes.json, art/palette/
---

# Prompt: Glass 900 years ago, revision 1

> Read the Glass 900 years ago board as it now stands in `cw-deploys/js/glass.js`, the palette window and the picker (Choose new colors), how palettes are loaded (`palettes.json`, `PALETTES_DATA`), and how the Roman glass and remove-glass choices work. Read them; don't infer them. Change only this board unless a step says otherwise.
>
> **1. Numbers.** These must agree with the coordinate plane that comes later. A number on the x axis sits just below its point. A number on the y axis sits just to the left of its point. Nothing else about the numbers changes.
>
> **2. Where 0 and 1 start.** Move them down and left, so 0 sits about a quarter of the way in from the left edge of the board and about a third of the way up from the bottom, with 1 one unit to its right. Choose the unit so the frame in 3 fits inside the board at its start, with a margin.
>
> **3. The frame.** In the story, this is the table she designs her window on.
>
> - A rectangle 3 units tall and 6 wide. At the start its lower left corner is at 0, so it runs from 0 to 6 along the x axis and from 0 to 3 up.
> - She can drag it until she makes her first circle or line. From then on it stays where it is: setting up the table comes first, then the work on it, as it did 900 years ago. New frees it again, and so does undoing back to no circles or lines. No Lock word on this board; the first circle or line is the lock. While it is free, a drag that starts on the frame's edge, away from any point, moves the whole frame; a drag that starts on a corner changes its size, snapping to quarter units in both directions, never smaller than 1 by 1. A drag that starts on a point still makes a circle, as now.
> - While she drags the frame, moving it or resizing it, its size shows: the width above the top edge, centred along it, and the height to the right of the right edge, centred along it. They read in units, as whole numbers and quarters in lowest terms (4, 4 1/4, 4 1/2, 4 3/4). When she lets go, they disappear. (Later they feed the inventory of materials.)
> - The frame never changes the construction. Points, circles, lines and the log are the same with or without it, and it is not a step that undo undoes.
> - The frame is lead. Its four edges bound pieces of glass just as circles and lines do, so wherever a circle or line meets the frame, the space between them and the edge is a piece of its own that she can colour. Before there is any circle or line, the whole table is one piece. The frame's edges never make points and never enter the construction: no points where shapes cross the frame, nothing in the log.
> - It crops the glass. Inside the frame, glass and lead. Outside it, no glass and no lead; the construction is still shown there, as plain lines and circles, and she can go on building there. Glass only and Share show only what is inside the frame. While the frame is free it follows her drag in real time.
> - While a line is waiting, a tap that doesn't finish it only cancels it, inside the frame or out; the next tap colours.
> - The frame's place and size save and open with the construction.
>
> **4. Palettes of twelve.** The palette window shows the colours in three rows of four, each swatch the size of the top colours in the palette window now. Roman glass and remove glass stay in the code and keep working where they are used now, but this board doesn't show them. Palettes with fewer than twelve colours fill the rows from the top left and leave the rest empty.
>
> Three new palettes for this board, all drawn from Gaudi's basilica, in this order, each colour in the order given. The first is the board's default.
>
> - *Gaudi Full*: #103DF2, #1230C4, #168BFA, #13D8F4, #19DCC7, #05B875, #64DA43, #C2F34D, #FFF43B, #FFB52D, #FF5925, #F80B4B. Its picture in the picker is `art/palette/glass-gaudi-full.png`.
> - *Gaudi Sea and Forest*: #071E91, #1035EF, #075BFF, #1295FF, #35C5FF, #9CEFF5, #05DDDC, #45F0CE, #00C58B, #05A66C, #70E957, #D7F64A. Its picture is `art/palette/glass-gaudi-sea-forest.png`.
> - *Gaudi Fire and Sunlight*: #D90838, #FF0A43, #FF2870, #FF5350, #FF4A20, #FF701C, #FF951B, #FFB02A, #FFCA29, #FFE02D, #FFF22E, #FFFF78. Its picture is `art/palette/glass-gaudi-fire-sun.png`.
>
> Michael has put the three photos at those paths. If any is missing, stop and ask. The existing palettes stay in the picker as they are. Note in the report how the palette data would grow into the general system Michael wants later (a work of art, up to twelve colours chosen from it, a palette she keeps), but build none of it now.
>
> **Check before reporting**, on the Mac and on the iPad in the pane: the opening view, with 0, 1 and the frame where they belong; numbers on both axes; the frame moved, resized larger and smaller by quarters with its size showing and then disappearing; the whole table coloured before any circle; the frame fixed after the first circle, then free again after New and after undoing back to nothing; a circle crossing the frame's edge, with the pieces between it and the edge coloured separately and no new points on the frame; a cancelled line followed by a colouring tap; a circle started on a point inside the frame; Glass only and a Share image cropped to the frame; Save and Open keeping the frame; each new palette, and an old one with fewer colours. Put screenshots beside the report. Say plainly what needs Michael's eye: the frame's feel when dragged, the moment it becomes fixed, how the construction looks outside it, and the swatch grid.
>
> Name the board's new version in its stamp, update `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Anything this prompt leaves open, leave open and name. Stop and report before committing.
