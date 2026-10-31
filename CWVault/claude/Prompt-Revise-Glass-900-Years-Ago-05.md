---
status: Ready for Michael's read, 31 Oct 2026. Paste it into Claude Code after revision 2 (Prompt-Revise-Glass-900-Years-Ago-04.md) has been reported and accepted.
role: Revision 3 of the Glass 900 years ago board: the table centred and labelled in metres, the plane running edge to edge, colouring the piece under her finger, Save New Open as commands, and the colour panel with lead thickness and sunlight.
related: Prompt-Revise-Glass-900-Years-Ago-03.md, Prompt-Revise-Glass-900-Years-Ago-04.md, js/glass.js, css/story.css, active/geo-1-glass-circles.html
---

# Prompt: Glass 900 years ago, revision 3

> This follows revisions 1 and 2. Read the board as it stands after them, in `cw-deploys/js/glass.js`, and the story page that mounts it, `active/geo-1-glass-circles.html`, with `css/story.css` (the `breakout` rule and `--shell`). Read them; don't infer them. Change only this board and its page unless a step says otherwise.
>
> **1. The table at the start.** This replaces revision 1's opening placement.
>
> - 1 sits at the centre of the drawing area, with 0 one unit to its left.
> - The table starts 6 units wide and 4 tall, centred on 1. So its corners are at (−2, −2) and (4, 2), and the x axis runs through its middle.
> - Units are metres. Below the table's bottom edge, centred on it, a label reads *Table 6 m × 4 m*, in the same type as *How this works*. It stays there, and stays current, as she moves or resizes the table, in whole metres and quarters in lowest terms (*Table 4 1/4 m × 3 m*). It doesn't hide while she drags.
> - The size readouts that appear while she drags (width above the top edge, height to the right) stay as they are and still vanish when she lets go; add *m* to them so they match the label.
>
> **2. The plane runs edge to edge.** The plane is endless, and the board should say so.
>
> - The board's drawing area runs the full width of the screen, from the left edge to the right edge, not just the width of the page (`breakout` stops at `--shell`, 1028 px; this board needs its own full-width rule). Its height stays as it is: lines never run up into the text above or down into what follows. When she pans up or down, the plane she pans to is there.
> - The left column (*How this works* and the words below it) stays lined up with the page as it is now. Lines that pass behind the column are hidden while they are behind it and show again on its far side, in the margin.
> - Lines already pass under the panels correctly; keep that.
>
> **3. Colouring the piece she means.** No more round cursor.
>
> - When she presses with a colour chosen, the piece of glass under the tip of her finger or the mouse lights up with a thin outline. If she slides, the outline moves to whatever piece is now under the tip. When she lifts, that piece takes the colour. On the Mac, the outline also follows the mouse before she clicks.
> - The piece is the one actually under the tip, however small it is.
> - **The leak.** In Michael's screenshot, one tap filled nearly a whole corner of the table, across several lead lines. Near that corner there are pairs of points almost on top of each other, so the first suspect is two nearly identical crossings being treated as one, leaving a gap in the pieces. Find the cause and fix it. If you can't reproduce it, say so and wait: Michael will save a construction that shows it.
>
> **4. Save, New, Open.** The *How this works* item for these becomes three commands, in italics, in this order: *Save New Open*. Each does something when tapped; they no longer open a box of sentences.
>
> - *Save* opens a panel with two choices: *Save as Construction* and *Save as Image*. Either opens a panel where she names the file and can add a note. A construction saves as constructions save now, with its note. An image is the glass inside the table, as *Show Glass Only* shows it, with sunlight as it is set, and the note printed under the picture; it is saved to her computer.
> - *New*: if nothing is unsaved, it starts a new construction at once. Otherwise a panel asks *Save First?* with two choices, *Save First* and *Start New*, and a close. *Save First* opens the Save panel; once the file is saved, the drawing clears and a new one begins. *Start New* clears the drawing and begins a new one. Close leaves everything as it was.
> - *Open*: if nothing is unsaved, it opens the list of saved constructions at once. Otherwise the same panel, with *Save First* and *Open*, and a close. *Save First* opens the Save panel; once the file is saved, the drawing clears and the list opens. *Open* clears the drawing and opens the list.
>
> **5. The colour panel.**
>
> - It opens on the left, centred on the *How this works* column, with its top just below the last word in the column (*Reset view*).
> - She can drag it anywhere across the board's full width, including over the margin; it is never clipped by the board's edge. She can't drag it up or down past the board's top or bottom, into the text. If the board changes size (leaving full screen, say), the panel is nudged back inside. Give the Save panels the same rule.
> - Remove the sentences *Use the slider to change the thickness of the lead.*, *Tap Glass Only to see your finished design.* and *Tap Choose New Colors to select a new set of colors to use.* Keep *To color your glass, tap a color, then tap a shape.*
> - **Lead thickness.** The slider is centred under the colours. Below it, centred and close enough that it plainly belongs to it, the words *lead thickness*.
> - **Sunlight.** A second slider below the first, built exactly like it, with *sunlight* centred below it. It sets how bright the glass is, as if more or less sun were shining through: the colours in the panel and every piece already coloured. The middle of the slider is the colours exactly as given; left is dimmer, right is brighter. Sunlight saves with the construction and shows in saved and shared images.
> - **Commands, in italics.** *Glass only* becomes *Show Glass Only*; when tapped it shows the glass and its words become *Show Construction*, and back again. *Choose new colors* becomes *New Colors*.
>
> **Check before reporting**, on the Mac and on the iPad in the pane: the opening view (1 at the centre, 0 to its left, the table 6 by 4 around them, its label below); the label staying put and current through a move and a resize, with the drag readouts in metres vanishing on release; lines running to both edges of a wide screen, hidden behind the left column and showing in the margin past it, and not into the text above or below; panning up and down; colouring a large piece and a very small one with the outline showing first, by mouse and by finger; the leak, fixed or reported; Save as Construction and Save as Image (the image's note under it), New and Open with and without unsaved work, and the close on each; the colour panel's opening place, dragged to both sides and stopped at top and bottom; both sliders; sunlight saved, reopened and in a shared image; Show Glass Only and back; New Colors. Screenshots beside the report. Say plainly what needs Michael's eye: the sunlight range, the outline's look, and the column with lines passing behind it.
>
> Name the board's new version in its stamp, update `MANIFEST.md`, add the line to `00-BOARD.md`, run `tools/check-deploys.sh`. Anything this prompt leaves open, leave open and name. Stop and report before committing.
