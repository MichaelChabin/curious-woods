---
status: Michael's prompt of 30 Oct 2026, pasted into Claude Code and built the same day; kept here so the report and the code comments that name it point at a file.
role: The first revision of Glass 900 years ago after Michael used the board: numbers under and beside the axes, 0 and 1 moved, the table she designs her window on, palettes of twelve from Gaudí's basilica.
related: Report-Glass-900-Years-Ago-Revise-01.md, Prompt-Build-Glass-900-Years-Ago.md, cw-deploys/js/glass.js, cw-deploys/active/geo-1-glass-circles.html, cw-deploys/art/palette/palettes.json
---

# Prompt: Glass 900 years ago, revision 1

> Read the Glass 900 years ago board as it now stands in `cw-deploys/js/glass.js`, the palette window and the picker (Choose new colors), how palettes are loaded (`palettes.json`, `PALETTES_DATA`), and how the Roman glass and remove-glass choices work. Read them; don't infer them. Change only this board unless a step says otherwise.
>
> 1. Numbers. These must agree with the coordinate plane that comes later. A number on the x axis sits just below its point. A number on the y axis sits just to the left of its point. Nothing else about the numbers changes.
> 2. Where 0 and 1 start. Move them down and left, so 0 sits about a quarter of the way in from the left edge of the board and about a third of the way up from the bottom, with 1 one unit to its right. Choose the unit so the frame in 3 fits inside the board at its start, with a margin.
> 3. The frame. In the story, this is the table she designs her window on.
>
> * A rectangle 3 units tall and 6 wide. At the start its lower left corner is at 0, so it runs from 0 to 6 along the x axis and from 0 to 3 up.
> * She can drag it at any time. A drag that starts on the frame's edge, away from any point, moves the whole frame; a drag that starts on a corner changes its size, snapping to whole units, never smaller than 1 by 1. A drag that starts on a point still makes a circle, as now.
> * The frame never changes the construction. Points, circles, lines and the log are the same with or without it, and it is not a step that undo undoes.
> * It crops the glass. Inside the frame, glass and lead as now. Outside it, no glass and no lead; the construction is still shown there, as plain lines and circles. Glass only and Share show only what is inside the frame. All of this follows the frame in real time as she moves or resizes it, so the window is redrawn while she drags.
> * The frame's place and size save and open with the construction.
>
> 4. Palettes of twelve. The palette window shows the colours in three rows of four, each swatch the size of the top colours in the palette window now. Roman glass and remove glass stay in the code and keep working where they are used now, but this board doesn't show them. Palettes with fewer than twelve colours fill the rows from the top left and leave the rest empty.
> Three new palettes for this board, all drawn from Gaudi's basilica, in this order, each colour in the order given. The first is the board's default.
>
> * Gaudi Full: `#103DF2`, `#1230C4`, `#168BFA`, `#13D8F4`, `#19DCC7`, `#05B875`, `#64DA43`, `#C2F34D`, `#FFF43B`, `#FFB52D`, `#FF5925`, `#F80B4B`. Its picture in the picker is `art/palette/glass-gaudi-full.png`.
> * Gaudi Sea and Forest: `#071E91`, `#1035EF`, `#075BFF`, `#1295FF`, `#35C5FF`, `#9CEFF5`, `#05DDDC`, `#45F0CE`, `#00C58B`, `#05A66C`, `#70E957`, `#D7F64A`. Its picture is `art/palette/glass-gaudi-sea-forest.png`.
> * Gaudi Fire and Sunlight: `#D90838`, `#FF0A43`, `#FF2870`, `#FF5350`, `#FF4A20`, `#FF701C`, `#FF951B`, `#FFB02A`, `#FFCA29`, `#FFE02D`, `#FFF22E`, `#FFFF78`. Its picture is `art/palette/glass-gaudi-fire-sun.png`.
>
> Michael has put the three photos at those paths. If any is missing, stop and ask. The existing palettes stay in the picker as they are. Note in the report how the palette data would grow into the general system Michael wants later (a work of art, up to twelve colours chosen from it, a palette she keeps), but build none of it now.
> Check before reporting, on the Mac and on the iPad in the pane: the opening view, with 0, 1 and the frame where they belong; numbers on both axes; the frame moved, resized larger and smaller, and moved while glass is coloured, watching the crop follow; a circle started on a point inside the frame; Glass only and a Share image cropped to the frame; Save and Open keeping the frame; each new palette, and an old one with fewer colours. Put screenshots beside the report. Say plainly what needs Michael's eye: the frame's feel when dragged, how the construction looks outside it, and the swatch grid.
> Name the board's new version in its stamp, update `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Anything this prompt leaves open, leave open and name. Stop and report before committing.
