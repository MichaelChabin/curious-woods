---
status: Ready for Michael's read, 30 Oct 2026. A second revision of the sixth Earth bench, after Michael tried 6b on the Mac and the iPad. Can go to the session that built 6b, or a fresh one.
role: The stretch on the top line itself; the stand turn; how the page opens; zooming out; a new layout with How this works, the commands and the text under the globe; the window's size; full screen.
related: Spec-Earth-3D.md, Report-Earth-3D-Bench-06b.md, Worknote-Time-Slider.md, Standard-Interactives.md, the Glass Geometry page (How this works, its panels)
---

# Prompt: the Earth, sixth bench, second revision

> Build on step 6b as it stands, committed or not; if it is uncommitted, the two go in together when Michael says. Read `CWVault/claude/Report-Earth-3D-Bench-06b.md` and `CWVault/claude/Worknote-Time-Slider.md`, and look at Glass Geometry's *How this works* and its panels (`cw-deploys/active/glass-geometry`). Don't write the spec, and don't stash, restore or check out anything under `CWVault/`. Nothing a child can see changes.
>
> **1. The stretch belongs to the top line.** My prompt for 6b put it on a second line; that was wrong. The age slider itself stretches:
> - Two small flags sit at the age slider's two ends. She drags them in to bracket the years she wants. (A tap on the line still sets the age, so placing marks by tapping is gone.)
> - Once a flag has moved, the word ***stretch*** appears beside the line; a tap and the age slider now runs between the two flags' years, in a short glide. The flags spring back to the ends, ready to go again.
> - ***back*** steps out one stretch; absent when there is nothing to step out of.
> - Under the line: its two ends, and *one pixel:* what one screen pixel is worth now.
> - The age slider is even, today to 4,567 million years, at the start. The stretched scale near today that it has now is no longer needed: a stretch does that job. Remove the second line and its *tap twice* / *drag in* switch.
>
> **2. The turn is the stand.** Michael tried both: the globe on its stand feels right close in too. Remove the slide and `?turn=`; east spins the globe about its axis at every zoom, north stays up.
>
> **3. How the page opens.**
> - **Blue Marble**, not the old ground.
> - **The whole globe**, not zoomed in, centred on one of the seven places at random (the Alps, the Nile, the Tibetan Plateau, Australia, Mexico City, the Amazon, Lake Victoria). `?view=` still picks one. *Reset* returns to that view.
> - **Today**, on the even line.
> - **Nothing remembered** from a last visit: no saved view, age, ground or words. (The tier may still be remembered for the session, since that is about speed, not settings.)
>
> **4. Zooming out keeps the centre.** Zooming out now heads toward the pointer, so the globe turns as it zooms. Zooming out keeps whatever is at the centre of the window at the centre, and keeps the globe's turn. Zooming in toward the finger or pointer can stay as it is; say if that feels inconsistent once the change is in.
>
> **5. A new layout.**
>
> *The left column, top to bottom:*
> - **The title.**
> - ***How this works***, directly below it, opening a movable panel exactly as Glass Geometry's does. It holds a short text on how the picture is made and how to use it (write a plain first draft; Michael will rewrite it), and the bench's own controls: *Blue Marble* / *old ground*, *old globe*, *another guess*, *places*, and the corner readout of tier and frame rate.
> - **The commands**, in this order:
>   - ***Map*** / ***Globe***
>   - ***Current year***: opens a panel, in the same way, that says how to set the span of the timeline (the flags, *stretch*, *back*), in plain words; a first draft for Michael to rewrite.
>   - ***Coastlines*** / ***Hide coastlines*** (today's coasts, renamed)
>   - ***Reset***
>   - ***Save or share*** (*Keep this picture*, renamed; the same panel with the note)
>   - ***Full screen***
>
> *Under the globe*, in a column exactly as wide as the window that holds the globe:
> - the age slider with its flags, *stretch*, *back* and the line under it;
> - **a title line** giving both the Earth's age and how long ago: in words like *The Earth at 4,317 million years old: 250 million years ago*. At today: *The Earth today, 4,567 million years old*. Report the wording; Michael will adjust it.
> - **a text box below it.** At first it holds the introduction, ending with *The land: satellite pictures from July 2004, a month of them stitched together without clouds. NASA Earth Observatory.* As she changes the year, the text for that age goes here: the grade's word and sentence, the molten phase's, the glide's note, and the rest that sits under the stage now.
>
> Remove the introduction text above the globe; the title moves to the left column.
>
> **6. The window's opening size.** Michael measured: on the Mac about **800 × 500** works once the text above the globe is gone; on the iPad about **800 × 700**. Find one rule that gives those (from the window's width and the screen's height, keeping the age slider and the title line on screen without scrolling), and say what it gives on a phone and on a large monitor. The bars and the size readout stay.
>
> **7. Full screen.**
> - Leave a clear margin above and below the globe: on both the Mac and the iPad the ball is cut off at the bottom now.
> - Move the controls on the left down, clear of the platform's own close button (on the iPad a large X covers them), and clear of the safe areas.
> - Show the title and all the commands, not just a few.
>
> **Check before reporting**, on the Mac in the pane, at 1,280 × 800 and at a large window: the page opening (three reloads, three places, the whole globe, Blue Marble, today); a stretch three deep and back out, on the top line; the turn close in over the Alps; zooming out from a close view of Norway with the pointer off to one side; *How this works* and *Current year* panels open; the text box at today, 250 million years and 4,509; full screen at a laptop size. Small JPEGs beside the report. Say plainly what needs Michael's eye.
>
> Name the bench's version in its stamp, update `MANIFEST.md` and `00-BOARD.md`, run `tools/check-deploys.sh`. Confirm the Time Machine, the Sun bench and a story map open unchanged. Write the report to `CWVault/claude/Report-Earth-3D-Bench-06c.md`. Stop and report. When Michael says so, commit and push.
