---
status: Michael's prompt for step 10c of the Time lab bench, 21 Nov 2026, from the "time lab" chat, after step 10b (94929fd3, pushed). Supersedes Prompt-Revise-Time-Lab-Bench-10c-01.md: the one change is that the desk globe is tied to Michael's ruling of 27 Oct, and Code is asked to find where that ruling was lost. It carries his rulings of 21 Nov on step 10's and step 10b's reports. Two points are the chat's defaults, not yet Michael's word; they are marked.
role: The globe turns like a desk globe; a tap on a city centres it; the flat map sits centred above the line; the word of knowing gets a line of its own; new words for How this works in the Time view.
related: Report-Time-Lab-Bench-10b.md (the page as it stands), Worknote-Time-Lab-Answers-01.md (Michael's answers), Worknote-Focus-View-03.md (the plan, now in the vault), Standard-Interactives.md, js/3d/earth.js, js/3d/scene.js
updated: 2026-11-21
---

# The Time lab bench, step 10c: a desk globe, and Michael's answers

`cw-deploys/experiments/time-lab.html`, and `js/3d/earth.js` or `js/3d/scene.js` for the first part only. Read Report-Time-Lab-Bench-10b.md first.

**About the shared scripts.** Michael allows a change to `earth.js` or `scene.js` in this step, for the way the globe turns and for nothing else, on the terms the seas were built on: an option that is off unless a page asks, and only the Time lab asks. The Earth bench and the ancient-seas bench must open and turn as before. Touch no other shared script; if a part seems to need it, stop and say so.

## The globe turns like a desk globe

Michael, 21 Nov: the resting place helps, but it is still too easy to lose north. So the globe stops rolling.

This is an old ruling come back. On 27 Oct Michael ruled that a thing with an axis turns like a globe on a stand: north up at rest, the poles the limits of the tilt, a drag right moving the surface east (Ideas-Ledger.md, *A globe on a stand turns like a globe on a stand*; see also Standard-Interactives.md, section 4, on gestures; the free trackball stays for the Sun). The lab's globe rolls, so the ruling was lost somewhere. **Before you write anything, find out where:** whether the stand's turning already exists in `scene.js` or `earth.js`, and why the Time lab does not have it. Say what you found at the head of the report. If the turning exists, use it; write new code only for what is missing.

- A drag left or right spins the Earth about its own axis.
- A drag up or down tips the axis toward her or away. She can tip far enough to look straight down on either pole, and no further.
- There is no roll. North is always toward the top of the screen. A twist of two fingers turns nothing.
- Pinch and scroll are as now. The resting place for the opening size stays.
- The north-up resting place goes, with its pull, its two bench switches and their `?detent=` and `?pull=`. A globe that cannot roll has no need of them.
- Every arrival is upright, because nothing else is possible: the opening, *Pick a time*, a tap on the map, a tap on a city.
- For Michael to compare, a bench switch in the Time view's *How this works*, *the globe turns* desk / free, and `?turn=free`. Free is the turning of step 10b, with its resting place.
- On the map, nothing changes.

Say how a drag feels near a pole, where a desk globe is at its worst, and what you did about it.

## A tap on a city

With *Show cities* on, a tap on a city's point turns the globe, with an ease, to bring that city to the middle, and shows its name. No zoom. A second tap on it, or a tap elsewhere, hides the name; the globe stays where it is.

On the flat map a tap on a city shows its name and moves nothing. (The chat's default.)

## The flat map in The World

In The World the flat map has too much room above it and stands hard against the timeline. Centre it between the top of the window and the top of the line's ground. Say the room above and below at 1,024 × 768 and at iPad size.

## The word of knowing

On an event's date line the word reads as a word about the date: *1889 (137 years ago) · measured*. It is a word about the picture of the Earth. Take it off the date line and give it a line of its own in the event's panel, small, in the copper italic:

> *The Earth shown here: measured*

The same form for the other grades (*inferred*, and the rest). It goes at the foot of the panel's first view, under the summary and above *More*. A period's panel has none, as now. (The place in the panel is the chat's default.)

## Arriving

If the store holds an event labelled *First trilobites*, the lab arrives on it. If not, on Chengjiang, as now. (The event is being written; do not write one.)

## How this works, in the Time view

Replace the words with these. The grey paragraphs go; these fold them in.

> The Solar System is about 4.6 billion years old. This mosaic shows part of that time: 720 million years, one tile for each million.
>
> The tiles are grouped by colour. Each colour is a period, named for something that marked it, like dinosaurs or thick ice. Tap a period to read about it. Then tap *select*, and its tiles gather into a line above the timeline. *back* brings the mosaic back.
>
> You can also drag across the tiles to mark any span of years you like. Under *Select years* there are other mosaics, every one running to now: the whole 4.6 billion, Complex life, Humans, Civilization, Writing, Paper, Machines and Computing.
>
> Below the mosaic is a timeline. It shows the span you chose and the events in it. Tap an event to find out more. Drag the round marker along the line and the Earth goes to that year.
>
> There is a flag at each end of the timeline. Move them closer together and tap *focus*, and the line stretches to give the events more room. Drag a flag past the end of the line to add years.
>
> Tap *The World* to fill the entire window with the Earth.

- **The second sentence is live.** It names the span and the tile of the mosaic she is on. On the 4.6 billion it reads: *This mosaic shows all of it: 4.6 billion years, one tile for each million.* Write the sentence for each of the eight mosaics and list all eight in the report, for Michael to read.
- The line under the words that changes with the handle's year stays. The bench switches stay, less the two that go and plus the one that comes.

## Not in this step

The seas (their look, the tears, their word of knowing); the flags as arrows, the end of *focus*, *Measure*, *select* and *unselect* (step 11); *play* and the Green Sahara (step 12); a panel for the Time view; the words of *How This Works* in The World; period Mores; pictures; the 13.8 billion years; the front door; the swap.

## Check, then stop

On the Mac at 1,024 × 768 and at iPad size (768 × 1,024), by pointer and by finger, and once in Safari on the iPad simulator:

- the globe dragged left and right, up and down, and on a slant, at the equator and near each pole; tipped to each pole and pushed past it; two fingers twisted;
- `?turn=free`: the old turning and its resting place, whole;
- the opening, *Pick a time* three times, and a tap on the map: each upright;
- a city tapped on the globe, then another, then empty ground; a city tapped on the map;
- markers placed, and the seas showing, with the new turning;
- the flat map in The World, centred;
- an event's panel at today, at 40 ka and at 518 Ma, with the word on its own line and the date line clean;
- the Time view's *How this works* on each of the eight mosaics;
- `earth-3d.html` and `ancient-seas.html`: open, and turn as they did;
- reduced motion.

Pictures in `CWVault/claude/Time-Lab-Bench-10c-Nov21/`; the report in `CWVault/claude/Report-Time-Lab-Bench-10c.md`, with what needs Michael's eye.

Stop and report. Don't commit.
