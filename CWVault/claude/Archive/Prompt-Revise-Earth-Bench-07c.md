---
status: Michael's prompt for step 7c of the Earth bench, 2 Nov 2026 (after step 7b, fc6ca96d). Written in the "recent rows" chat.
role: The mosaic page, revised after Michael's first use of 7b. The brief as given.
related: Report-Earth-3D-Bench-07.md, Prompt-Build-Earth-Bench-07b.md, Worknote-Deep-Time-Window-04.md, Worknote-Deep-Time-Window-03.md
updated: 2026-11-02
---

# Step 7c: the mosaic, revised

`experiments/earth-3d-window.html` only. Read Report-Earth-3D-Bench-07.md and Worknote-Deep-Time-Window-04.md first.

**Words.** On the page, the window is now *the mosaic* and its squares are *tiles*.

## The timeline

- *stretch* becomes *focus*. It does what *stretch* did.
- *shrink* goes. In its place, **pulling a flag**: she can drag either flag past the end of the line. It travels on beyond the end, as if the line continued, counting years at the line's present scale; while she holds it beyond the end, it keeps adding years, faster the longer she holds (as a text editor scrolls when a selection is dragged past the window's edge). When she lets go, the line rescales so that flag sits at its end again, the added years now part of the line. This moves the flag, so the selection grows too. Now is a wall for the right flag. When the line outgrows the mosaic in use, the mosaic steps up a scale, as it does now.
- *back* stays.
- **The line reaches 4,600 million years ago**, the mosaic's first tile. Today it stops at 4,567, so the first 33 tiles can't be selected by dragging or by the flags. Those 33 tiles become a period of their own, **Before the Sun**: box words, placeholder for Michael, "A cloud of gas and dust, slowly gathering. The Sun has not yet lit up." Period 1 now starts at 4,567. The Earth's birth stops being a wall; 4,600 is.
- **Line the timeline up with the coloured part of the mosaic**, its two ends under the first and last columns of tiles, not under the year labels on the right.

## The mosaic

- **Pointing names the period.** On rollover the cursor's label is the period's short name (list below), not the year. While dragging, it shows the span being chosen, in years, as now.
- **Tap selects the period.** A tap without moving selects the whole period under it: its span becomes the selection and the timeline's line. A drag selects a range, as now; a tiny drag selects one tile. On the iPad the same: lift without moving to select the period. On the last million, a tap selects the ice age or warm spell under it; on the 12,000, the thousand-year block.
- **The line above the mosaic** drops its first sentence and is centred over the mosaic:
  - 4.6 billion: "Each tile is a million years. Each large square is 100 million. Each row is a billion."
  - Last million: "Each tile is 1,000 years. Each large square is 100,000."
  - Last 12,000: "Each tile is ten years. Each large square is 1,000."
- **The 12,000 mosaic is wider**, as wide as the page allows, and the timeline widens to match it.

**The short names**, Michael's to change, one line each in the table:

| # | Period | Name |
|---|---|---|
| 0 | 4,600 to 4,567 million years ago | Before the Sun |
| 1 | to 4,400 | Formation |
| 2 | to 3,900 | First seas |
| 3 | to 2,450 | Early life |
| 4 | to 2,200 | Early oxygen |
| 5 | to 1,800 | Rust |
| 6 | to 720 | Two parents |
| 7 | to 635 | Ice to the equator |
| 8 | to 539 | Visible life |
| 9 | to 470 | Eyes and shells |
| 10 | to 252 | Life on land |
| 11 | to 66 | Dinosaurs |
| 12 | to 3 | Mammals |
| 13 | to now | Ice ages |

(Spans as the page already has them; this table only adds the names.) On the last million: *Ice age*, *Warm spell*, and the periods' own names where the page uses them.

## How this works

Replace the placeholder with Michael's words:

> The Solar System is about 4.6 billion years old.
>
> You can use this mosaic to explore its history. Each of its 4,600 tiles is a million years. The tiles are grouped by colour, each colour marking something that characterized that period, like dinosaurs or thick ice. Point to one of these coloured periods and you'll see what was going on at the time. Tap to select the period and learn still more.
>
> You can drag across the tiles to select any span of years from the beginning to today. You can also choose one of two other mosaics: the last million years, which holds much of the history of humans as a species, or the last 12,000 years, which holds much of the history of civilization.
>
> Below the mosaic is a timeline. The span of years you choose in the mosaic appears there, along with any events from that period. Tap an event to find out more about it.
>
> There are two flags, one at each end of the timeline. Move them closer together and tap *focus*, and the timeline stretches to give your events more room. If you'd rather widen your selection, drag either flag past the end of the line to add years to it.

Keep the bench's own switches (A or B, year inside or a margin) in *How this works* below his words, marked as bench only.

## Check, then stop

On the Mac in the pane and at iPad size: the first 33 tiles selectable, by drag and by pulling the left flag; pulling either flag, short and held; the right flag at now; the step up a scale from a pull; *focus* and *back*; the names on rollover and the span while dragging; tap to select a period on each mosaic; the line above each mosaic; the timeline's ends under the tiles; the wider 12,000 mosaic. Small pictures in `CWVault/claude/Earth-3D-Bench-07c-Nov02/`; the report in `CWVault/claude/Report-Earth-3D-Bench-07c.md`.

Stop and report. Don't commit.
