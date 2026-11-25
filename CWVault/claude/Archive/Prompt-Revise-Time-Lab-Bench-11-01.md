---
status: Michael's prompt for step 11 of the Time lab bench, 21 Nov 2026, from the "time lab" chat. Written while step 10d was running; step 10d must be committed before this runs. Three points are the chat's defaults, not yet Michael's word; they are marked.
role: The flags become arrows that only change the span; focus and back leave the line; Measure gets a tool panel; select becomes select / unselect; the shallow seas go fainter and get a word she can use.
related: Worknote-Focus-View-03.md (the plan for this step), Worknote-Focus-View-02.md (the reasoning on select), Report-Time-Lab-Bench-10d.md (the page as it stands), Report-Time-Lab-Seas-Nov20.md, Worknote-Time-Lab-Answers-01.md, js/cw-panel.js
updated: 2026-11-21
---

# The Time lab bench, step 11: one gesture, one job

`cw-deploys/experiments/time-lab.html`. Read Report-Time-Lab-Bench-10d.md and Worknote-Focus-View-03.md first. Step 10d must be committed before you start; if it is not, stop and say so.

Touch no shared script, with one exception: if the seas can only be made fainter inside `js/3d/earth.js`, you may add that as an option that is off unless a page asks, as the seas themselves were added. Say so if you do.

Everything here must work the same with *the periods* switch of step 10d set either way.

## The flags become arrows

Michael, 20 Nov: using the flags both to measure a span and to change the line was a mistake, and it needed *focus* to tell the two apart. From now on the ends of the line do one thing: they change the span.

- At each end of the timeline, in place of the flag, a **double-headed arrow** lying in line with the timeline, just beyond the end. The line shortens to make room. The arrow should say plainly that it moves both ways.
- **Drag either arrow either way.** Inward for fewer years, outward for more. While she drags, the year at that end reads out and follows her finger. When she lets go, the line restretches, with an ease, to the new span. Reduced motion: a cut.
- There is no *focus*. There is no *back* on the line. Both go, with their code.
- **The right end never passes now.** Dragged outward at now, it does nothing. If she has brought it inward, she can take it back out as far as now.
- **The left end** goes back no further than the lab's whole span.
- **Dragging outward needs somewhere to go.** There is little room beyond an arrow, and she may want a great many more years. Build what serves a finger best and say what you built. One way: outward travel adds years at the line's present scale, and held at the window's edge the span keeps growing, faster the longer she holds, with the year reading out. (The chat's suggestion.)
- **The least span** is whatever the line can still show sensibly. Say what you chose.
- **The years at the ends** are centred on the ends of the line, and stand closer to it than now.
- **The span's length** stays, centred above the line, in words.
- The handle stays on the line. If a new span leaves the handle's year outside it, the handle goes to the nearer end, and the Earth with it.

**The tiles always match the line.** In the Time view, when she lets go of an arrow the page runs *select* on the tiles with the new ends, so the gathered tiles and the line show the same years. If the new span reaches beyond the mosaic she is on, the page moves to the smallest mosaic under *Select years* that holds it, and selects there. (The move between mosaics is the chat's default; say how it looks, most of all between mosaics whose tiles are different lengths.)

In The World there are no tiles. The arrows change the line alone, and the tiles agree when she next goes to Time.

## select and unselect

- *select* stands to the left of the tiles, level with the marked tiles.
- Tapped, it gathers the tiles into their line above the timeline, as now, and becomes *unselect*.
- *unselect* puts the tiles back as they were, the selection still marked, and becomes *select* again.
- She can change the marked tiles by tapping a period or dragging across tiles, and tap *select* again.
- A tap on a word under *Select years* shows that span's tiles, and the button goes until she marks something.
- *back* beside the mosaic goes; *unselect* does its work.

## Measure

Measuring a span has its own home now. This retires the idea of the flags as measurers.

- A word, *Measure*, among the tools: in the left column in Time, and in *How This Works* in The World.
- It opens a small tool panel, by the plumbing of step 10b (`toolPanel`). The panel stays open when *How This Works* closes, and is hers to drag and close.
- While it is open, **two markers of its own** stand on the line. They must not be mistaken for the handle or the arrows; choose a look and show it. They start a third and two thirds of the way along. She drags either.
- The panel shows the two years, written by Ruling-Dates-01, and the time between them in words.
- The markers move nothing: not the Earth, not the span, not the tiles.
- When the panel closes, the markers go. Opened again, they return where she left them, if those years are still on the line.
- It works in both views. (That it works in Time as well is the chat's default.)
- The bench's test panel and `?toolpanel=1` go.

## The shallow seas

Michael's rulings of 21 Nov, after looking at 480 Ma.

- **Fainter.** The pale blue of the flooded land is too strong. Make it subtler, so the continents still read as continents where most of the land is under water. Give Michael a bench switch with three strengths, the present one among them, and open on the middle one.
- **A word she can use.** *Show shallow seas* joins *Show cities* and *Show coastlines*, in the column and in *How This Works*, on when the page opens. It replaces the bench switch *the shallow seas on / off*. `?seas=0` still opens with them off.
- **The tears stay.** Nothing hides them. No word of knowing for the seas; *The Earth shown here* covers the whole picture.

## The words

**How this works, in the Time view.** Two paragraphs change; the rest stand.

The second becomes:

> The tiles are grouped by colour. Each colour is a period, named for something that marked it, like dinosaurs or thick ice. Tap a period to read about it. Then tap *select*, and its tiles gather into a line above the timeline. *unselect* puts them back.

The fifth becomes:

> There is an arrow at each end of the timeline. Drag one inward to look at fewer years, or outward to take in more. When you let go, the line stretches to fit.

**How This Works, in The World.** Add one sentence to Michael's draft, before the last:

> Drag an arrow at either end of the line to see more years or fewer.

## Not in this step

A coarse period opening into its finer ones (it waits for Michael's ruling on the periods); *play* and the Green Sahara (step 12); a panel for the Time view; Mores for Humans and Civilization; pictures; Scotese's plates; the 13.8 billion years; the stories' Worlds; the front door; the swap.

## Check, then stop

On the Mac at 1,024 × 768 and at iPad size (768 × 1,024), by pointer and by finger, and once in Safari on the iPad simulator:

- each arrow dragged inward and outward, in Time and in The World, on Complex life and on Machines; the right arrow at now, pushed outward; the left arrow taken to the lab's whole span; the least span;
- an outward drag long enough to leave the mosaic she is on: from Machines out past 1720, and from Complex life out past 720 Ma;
- the tiles and the line agreeing after each release in Time, and after a change made in The World;
- the handle left outside a new span;
- *select* and *unselect* on a period and on a dragged span; a word under *Select years* after each;
- *Measure* in both views: opened, both markers dragged, *How This Works* closed with it open, closed and opened again; an arrow dragged while it is open;
- the seas at 480 Ma and at 69 Ma at each of the three strengths; *Show shallow seas* off and on, in both views; `?seas=0`;
- *the periods* switch set each way, with *select* and an arrow drag on each;
- *Pick a time*, an event's panel, cities and markers, still working;
- reduced motion.

Pictures in `CWVault/claude/Time-Lab-Bench-11-Nov21/`; the report in `CWVault/claude/Report-Time-Lab-Bench-11.md`, with what needs Michael's eye.

Stop and report. Don't commit.
