---
status: Michael's prompt for step 2 of the Time lab bench, 4 Nov 2026, written in the "guidance" chat. Builds on the step-1 page, which is not yet committed; committing step 1 is Michael's word, separately.
role: The 12,000 mosaic on the Time lab page gets its periods, so it matches the story strip Michael approved today.
related: Prompt-Build-Time-Lab-Bench-01.md and Report-Time-Lab-Bench-01.md (the page as it stands), Periods-12000-01.md (the eight periods, their colours and plaques), Sketch-Story-Strip-01.html (the model: what the row looks like), Lab-Time-01.md, Report-Earth-3D-Bench-07c.md (how the 4.6 row's periods behave)
updated: 2026-11-04
---

# The Time lab bench, step 2: the 12,000 row gets its periods

Read `Periods-12000-01.md` first, then open `Sketch-Story-Strip-01.html` in a browser (it is an artifact page with no doctype of its own; wrap it or open it as is). The sketch is the model for what the row looks like: 1,203 tiles in blocks of a thousand, the thirteenth block unfinished and the rest of it clear glass, the eight periods in colour with handmade variation tile by tile, the period names in small capitals under the row, a lit tile with a tall mark. Michael: "that is exactly what the mosaic should look like in the current Time lab." This step makes the lab's 12,000 mosaic match it. The sketch's tall mark and its play are for the stories, later, not this page.

`cw-deploys/experiments/time-lab.html` only. `earth-3d-window.html` stays as it is.

## The row

- **Periods.** The 12,000 mosaic gets the eight periods of `Periods-12000-01.md`, in the page's `PERIODS` form: the spans, the sketch's colours, the short names, the plaque words as the box words. They replace the thousand-year blocks as the thing a tap selects, and the decade as the thing pointing names.
- **Behaviour as the 4.6 row has it after 7c:** pointing names the period and lifts it; tapping selects the whole period, its span becoming the timeline's line with its events and the year handle at its older end (the step-1 gesture); a drag selects a span; a tiny drag one tile. The box appears under the lit span, as the 4.6 row's does.
- **The period names stand under the row at all times**, small capitals in the muted ink, each centred under its span, on a second line where two would collide and dropped where there is no room, as the sketch does it. This is the one way the 12,000 row differs from the 4.6: its names are always there. Whether the 4.6 row should have the same is Michael's question, not this step's.
- **The unfinished block.** The thirteenth block's tiles past now are drawn as clear glass, the hairline only, as the sketch draws them, not left out. The gold tile at now stays.
- **Handmade glass:** each tile a shade of its period's colour, as the page already shades the 4.6 row.
- **Width:** as the page has it, the row taking the words' column.

## Colours

Check every neighbouring pair of the eight for the common kinds of colour-blindness, as was done for the 4.6 row. Where a pair fails, move the lightness, not the hue, and say in the report what was changed and why. Farms against Electricity (ochre, gold) are not neighbours and need not differ.

## For the stories, later

Write the row's drawing so that a story page can call it later with its own lit tile and marks: one function that takes a width, a height, the periods, a lit span and a list of marks, and draws. Don't build the story strip or touch any story. Say in the report what moving that function into a shelf module (`js/cw-strip.js`, say) would take, and whether the stretching line should go with it (open since 7b).

## Not in this step

The story strip on story pages; the 4.6 row's names; the 13.8 rung; trips; the probe; *Cut open*; the front door; the swap. Name them as absent and nothing else.

## Check, then stop

On the Mac in the pane at 1,024 × 768 and at iPad size (768 × 1,024), by pointer and by finger: the 12,000 row at rest with its names under it; pointing at each period (the name, the lift, the box); a tap on *Writing* (its span lit, the line 3200 to 1200 BCE with its events, the handle at 3200 BCE, the Earth at today's continents); a drag across *Printing* and *Machines*; a tiny drag on one tile; the clear tiles at the right end; the names at iPad width, where the row wraps; *focus*, *back* and a pull as before. Nothing on the page may change place.

Pictures in `CWVault/claude/Time-Lab-Bench-02-Nov04/`; the report in `CWVault/claude/Report-Time-Lab-Bench-02.md`, with the colour check's results and what needs Michael's eye.

Stop and report. Don't commit.
