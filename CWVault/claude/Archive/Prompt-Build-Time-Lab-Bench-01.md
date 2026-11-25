---
status: Michael's prompt for the first Time lab bench, 4 Nov 2026, written in the "guidance" chat. Step 3 of Lab-Time.md's *Getting there*. Nothing is built from it until he says go.
role: One page with the Earth, the mosaic and the timeline together, the mosaic as the control, so the Time lab exists as a thing for the first time.
related: Lab-Time.md (read first; the vault copy is Lab-Time-01.md), Report-Earth-3D-Bench-07c.md and Worknote-Deep-Time-Window-04.md (the mosaic as it stands), Spec-Earth-3D.md (the Earth), Standard-Interactives.md, Timeline-Stories.md (what an event carries), cw-deploys/experiments/earth-3d-window.html, cw-deploys/experiments/earth-3d.html
updated: 2026-11-04
---

# The Time lab bench, step 1: one page

Read `claude/Lab-Time.md` first, then `Report-Earth-3D-Bench-07c.md` and `Spec-Earth-3D.md`. This step joins two benches that already work. It invents nothing new in either; what is new is the page and the one gesture that ties them.

## The page

A new page, `cw-deploys/experiments/time-lab.html`, listed on `experiments/index.html`. Title: *Time Lab*. `earth-3d-window.html` and `earth-3d.html` are left exactly as they are; this page takes from them. Page standard, `CW_VERSION` stamp, the house convention for the left column.

**Left column.** *How this works* at the top, with the words below. Then, as the mosaic page has them, **Select years** with *4.6 billion*, *Last million*, *Last 12,000*, and **Information** with *Periods* and *Cities*. Nothing else. No word for a tool that does not exist yet on this page.

**Main column, top to bottom, nothing ever changing place:**

1. **The Earth**, as `earth-3d.html` draws it today, small: about a third of the column's height, centred, the five words of knowing under it as the bench has them. One finger turns it, pinch zooms, *Reset view* is a word under it. Its own age sliders are not on this page; the mosaic and the timeline do that work.
2. **The mosaic**, exactly as `earth-3d-window.html` has it after 7c: the three scales, pointing names the period, tap selects it, drag selects a span, the boxes, the colours. Take the code, don't rewrite it. If the mosaic's stretching line is worth moving into `js/cw-stretch.js` first (open since 7b), do that as its own commit before this page.
3. **The timeline**, under the mosaic, where the mosaic page has it: the flags, *focus*, *back*, pulling a flag. Plus two things the mosaic page lacks:
   - **Events.** The span's events from the store, as the Time Machine's deep timeline draws them, with their labels. Tap an event: its summary, ending in *More*; *More* opens the More in the movable window, as the Time Machine does. The store is the Time Machine's; this page reads it and changes nothing in it.
   - **The year handle.** One handle on the line, as the Time Machine has it. It is the lab's year. Tap the line and it jumps; drag it and it follows.

## The one gesture

**At rest** the page shows the Earth at today and the 4.6 billion mosaic at full colour, nothing selected, and **no timeline**: no line, no flags, no *focus*, no *back*. The only thing on the page that invites a finger is the mosaic (and the Earth, which turns). Nothing is greyed; what is not yet usable is absent.

**She taps a period.** Three things happen at once, and she caused all three:

- the period's span is selected on the mosaic, lit as 7c lights it;
- the timeline appears below with that span, its events on it, the flags at its ends, *focus* and *back* beside it;
- the year handle lands at the span's older end, and **the Earth moves to that age**, continents, sea, paint and edges as `earth-3d.html` draws them at that year.

A drag on the mosaic does the same for the dragged span. From then on, moving the handle moves the Earth; choosing another span moves both. *back* steps the line out as it does now; the handle stays at its year if that year is still on the line, else goes to the nearer end.

The Earth follows the handle **live while she drags** by default. Give the bench a switch, *on release*, for Michael to compare; the better one becomes the rule.

**Which year the Earth shows is always the handle's year.** No other control sets it on this page.

## Words of *How this works*

Michael's words from 7c stand, with one paragraph added at the end, placeholder for him:

> The Earth above shows the world at the year under the handle. Choose a period or a span on the mosaic and the Earth goes there; drag the handle along the timeline and the Earth follows.

## Bench-only

Under a rule in *How this works*, marked *bench only*: the Earth's size (*small* / *large*, large being half the column); *live* / *on release* for the handle; the mosaic page's own switches as they are.

## Not in this step

The 13.8 billion rung; trips and play; the probe; *Cut open*; *Globe* / *Map*; the front-door page; the swap into the Time Machine; any change to the stories. Name them in the report as absent, and nothing else.

## Check, then stop

On the Mac in the pane at 1,024 × 768 and at iPad size (768 × 1,024), by pointer and by finger events: the page at rest (no timeline, nothing greyed); a tap on *Dinosaurs* (the span lit, the line with its events, the handle at 252 million, the Earth at 252 million); a drag of the handle to 66 million with the Earth following, live and on release; a tap on an event and its *More*; *focus* and *back* with the handle; *Last 12,000* and a tap on a block (the Earth at today's continents, the sea at that year's level if the bench has it); the Earth turning and zooming while small; the Earth *large*. Nothing on the page may change place through any of it; say so if anything does. Frame rate on the Mac with the Earth small.

Pictures in `CWVault/claude/Time-Lab-Bench-01-Nov04/`; the report in `CWVault/claude/Report-Time-Lab-Bench-01.md`, with what the Earth bench could and could not do at each age as this page found it, and what needs Michael's eye.

Stop and report. Don't commit.
