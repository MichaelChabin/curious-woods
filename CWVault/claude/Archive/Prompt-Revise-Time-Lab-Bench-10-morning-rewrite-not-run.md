---
status: Michael's prompt for step 10 of the Time lab bench. Drafted 19 Nov 2026, evening; rewritten 20 Nov, morning, to take in his decisions of that morning (open in The World on a trilobite moment; a How this works panel open on arrival). Step 9 must be committed before this runs. One part is Claude's suggestion, behind a switch.
role: The lab opens in The World on Complex life at the trilobites, with How this works as an open panel; a detent in place of Reset and Align North; The World dark; cities as points; Dinosaurs' More; the 1054 bug; the ice on today's Earth; the handle's label shortened; and, behind a switch, the 4.6 billion built tile by tile.
related: Report-Time-Lab-Bench-09.md (the page as it stands), Worknote-Focus-View-03.md (the plan; supersedes -02), Prompt-Revise-Time-Lab-Bench-11.md (the next step, for direction only), Ruling-Dates-01.md, js/cw-panel.js
updated: 2026-11-20
archived: 21 Nov 2026. NEVER RUN in this form. The step 10 that ran (74d63a13) was the 19 Nov evening draft, which Claude Code saved as Prompt-Revise-Time-Lab-Bench-10.md. The parts of this rewrite that were not built became step 10b (Prompt-Revise-Time-Lab-Bench-10b-01.md). Kept for the record.
---

# The Time lab bench, step 10: arriving in The World

`cw-deploys/experiments/time-lab.html` only, unless a part says otherwise. Read Report-Time-Lab-Bench-09.md first. Step 9 must be committed before you start; if it is not, stop and say so.

## Arriving

The lab opens in **The World**, on **Complex life**, with the handle at an event about the first trilobites and that event's panel open. If the store has no event for the first trilobites, use the nearest one that shows them (Chengjiang, say) and name it in the report. The globe faces where the event's ground lay at the time if the record carries a place; otherwise it faces the place the evidence is today.

## How this works: a panel, open on arrival

In The World, *How this works* is no longer a word in a column. It is a **panel**, open on the left when she arrives, every time (for now, while Michael tests). Use `js/cw-panel.js`, as step 9's panel does; if it needs a change, stop and report before changing it.

- At its top, the title *How This Works*.
- Then enough words to use The World: a few sentences, draft below, for Michael to change.
- Then the tools, as words in the house convention: *Map* / *Globe*, *Full screen*, *Show cities*, *Show coastlines*, *Place markers*, *Sound on*, *Pick a time*.
- **A word in it may open a panel of its own**, which stays open after *How This Works* closes. Build the plumbing for this and show it once: *Pick a time* is not one, so use a small test panel behind a bench switch (`?toolpanel=1`) holding *Show cities* and *Show coastlines*. Real tool panels come later (the first will be *Measure*, step 11).
- **Closing it** (its *close*): the panel shrinks and travels to the upper left corner, where it becomes the word *How this works*. A tap on that word opens the panel again, travelling back out. Reduced motion: a cut.
- **Below that word**, at the upper left: *Time*, which takes her to the Time view, as now. *back*, after *Pick a time*, stands beside *Time*, as now.
- While the panel is open, the two words sit at the upper left as well, so *Time* is always one tap away.
- The event's panel (step 9) is separate and opens where it hides least, clear of *How This Works*.

Draft words, for Michael to rewrite:

> This is the Earth at the moment marked on the line below. Drag the round marker along the line and the Earth changes with it. Tap a name on the line to read what happened there. Turn the globe with a finger; spread two fingers to come closer. *Time* takes you to all the years there are.

**In the Time view nothing changes yet.** Its left column stays as it is, with *How this works* as a word. Michael will decide whether Time gets the same panel after using it in The World.

The upper-right words of step 9 (*Reset*, *Align North*) go (below). Nothing else stands at the upper right.

## A detent, in place of Reset and Align North

*Reset* and *Align North* were solving one problem, disorientation, and undid each other. Both go, with their code.

- **North up is a resting place.** Let go within about 10° of upright and the globe eases the rest of the way, quickly and softly. While she drags near upright it pulls a little toward it. Nothing is said. Angle and strength behind a bench switch, for Michael to feel on the iPad.
- **The opening size is a resting place.** Pinch or scroll out past the size the Earth opened at and it eases back. Zooming in is free.
- Every opening view stands upright, at its own longitude.
- On the map, nothing changes.

## The World is dark

The World's ground is near-black, not parchment: to mark it as another mode, and because the lab will one day show the time before the Earth, whose ground is black.

- The Earth sits in the dark, lit as now.
- The ground under the timeline is dark and translucent, fading in as in step 9. The line, the flags, the handle, the years and the events' names are in parchment and pale copper.
- Panels keep their parchment.
- Time keeps its parchment. The move between the views fades one ground into the other.
- Step 9's fade (`?fade=1`) is on by default for the corner words. The year on the handle never fades. Say how it feels.

## The handle's label

The label above the handle reads *14.3 ka*, not *14.3 ka · measured*. The word of knowing moves to the date line in the event's panel. Report where else the page shows it.

## Cities as points

With *Show cities* on, each city is one small point, its name hidden. A tap shows the name beside it; another tap, or a tap elsewhere, hides it. In both views and on the map. Points stay on their ground as it moves through time.

## Periods and their Mores

- Wire the Time Machine's More for *Dinosaurs* (252 to 66 Ma, `stories/deep-time-periods.json`), the one whose name and span match.
- List the other twenty-five in the report by span, with name, dates and present words, as the worklist for a writing batch.

## Small repairs

- **The year on the handle.** An event dated 4 July 1054 (store year 1054.5) reads *1055*. Write the year the event falls in, not the year rounded. Find every place the page rounds a year this way.
- **Ice on today's Earth.** Today's globe shows no ice on Greenland or Antarctica, and what looks like ice on the Himalaya. Find out why (the Blue Marble picture, the ice layer, the heights, or something else), make the present show ice where there is ice today, and check 20,700 years too.
- **The Time view's Earth.** Opening in The World, the Time view no longer needs to fit the 4.6 billion. Make its Earth one size on the seven one-row spans, as large as it comfortably can be with the line and the events' names in sight at 1,024 × 768 and at iPad size; on the *4.6 billion* it shrinks as far as it must. Say the sizes.
- **How this works in Time.** Cut the two sentences that are no longer true ("its story appears above" and "The Earth above").

## Building the 4.6 billion (Claude's suggestion; behind `?build=1`, off unless Michael asks)

When she goes from a smaller span to the *4.6 billion* in the Time view, the mosaic she was on stays where it is and the older tiles assemble above it, from now back to the beginning: slowly at first, then faster, with a year count running back beside them, until the last tile lands at the Sun's birth. About six seconds the first time in a visit; the step 7 move after that. A tap finishes it at once. Reduced motion: a cut. The shuffle's sound, if she has sound on. Say whether six seconds feels long or short.

## Not in this step

The flags as arrows, the end of *focus*, *Measure*, *select* and *unselect* (step 11); *play* and the Green Sahara (step 12); a panel for the Time view; period Mores beyond Dinosaurs; pictures for events; Scotese's plates; the seas; the 13.8 billion years; the stories' Worlds; the front door; the swap.

## Check, then stop

On the Mac at 1,024 × 768 and at iPad size (768 × 1,024), by pointer and by finger, and once in Safari on the iPad simulator:

- the first screen: The World, Complex life, the trilobite event and its panel, *How This Works* open;
- *How This Works* closed and reopened; *Time* reached with it open and with it closed; `?toolpanel=1`, the test panel left open after *How This Works* closes;
- the globe let go at 5°, 10° and 20° from upright, and pinched out past its opening size;
- The World, dark, on a deep span and a recent one; the words fading and returning;
- the handle's label with no word of knowing; the word in the event's panel;
- cities shown, one tapped, then another, then empty ground;
- Dinosaurs' panel with its More;
- the handle on *Guest star* (1054) and on two other events dated in the second half of a year;
- today's Earth over Greenland, Antarctica and the Himalaya; then 20,700 years;
- `?build=1`, first time and second;
- reduced motion.

Pictures in `CWVault/claude/Time-Lab-Bench-10-Nov20/`; the report in `CWVault/claude/Report-Time-Lab-Bench-10.md`, with what needs Michael's eye.

Stop and report. Don't commit.
