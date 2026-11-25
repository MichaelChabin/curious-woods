---
status: Michael's prompt for step 7 of the Earth bench, 2 Nov 2026 (after step 6e, 834c3982). Replaces Prompt-Build-Earth-Bench-07.md, which was never run.
role: The window: a new page in front of the Earth bench that introduces a way of picking a time or a range. The brief as given.
related: Worknote-Deep-Time-Window-03.md (the design as it stands; read it first), revisions 1 and 2 beside it, Sketch-Earth-in-Squares-01.html, Window-Mockups-Nov01/, Worknote-Time-Slider.md, Spec-Earth-3D.md
updated: 2026-11-02
---

# Step 7: the window

Before the Earth bench opens, a page of its own that introduces a way of picking a time or a range: a stained-glass window where each square is a stretch of time, over the bench's own timeline. We perfect it here before it joins the globe. Nothing on `experiments/earth-3d.html` changes in this step except that it is reached through the new page.

Read first: CLAUDE.md's four and the board, then `CWVault/claude/Worknote-Deep-Time-Window-03.md`, with revisions 1 and 2 beside it for detail. Where they disagree, revision 3 wins; say so in the report if you find a clash. The sketch `CWVault/claude/Sketch-Earth-in-Squares-01.html` is a working prototype of the first window and of dragging a span, and `CWVault/claude/Window-Mockups-Nov01/mock-window-dark-03.png` shows the look. Neither is code to copy as is.

Michael expects to try arrangements and change them. Keep the window's sizes, colours, lines and words in one small table at the top of the script, so a change is one line.

## The page

A new page, `experiments/earth-3d-window.html`, in front of the bench: the experiments index opens it, and *Next* at bottom right goes to `earth-3d.html` as it is. The page standard, `CW_VERSION`, MANIFEST and the board as CLAUDE.md says.

Glass Geometry's left column, in the house convention (bulleted words in normal type open tools; italic words are commands; no boxed buttons):

- *How this works* at the top, opening a text box (placeholder words, marked as placeholder; Michael will write them)
- Select years
  - *4.6 billion*
  - *Last million*
  - *Last 12,000*
- Information
  - *Periods* / *Hide periods*
  - *Cities* / *Hide cities*: show the words, but they do nothing on this page yet

Mark the scale in use the way Glass Geometry marks a command in use, if it has a way; otherwise copper. Say which.

## The windows

One window shown at a time, centred over the timeline, with one line of explanation just above it:

| Command | Explanation | Square | Block | Squares |
|---|---|---|---|---|
| *4.6 billion* | 4.6 billion years. Each small square is a million years. Each large square is 100 million. Each row is a billion. | 1 million years | 100 million (10 × 10) | 4,600: four full rows of 1,000 and a fifth of 600 |
| *Last million* | The last million years. Each small square is 1,000 years. Each large square is 100,000. | 1,000 years | 100,000 | 1,000 |
| *Last 12,000* | The last 12,000 years. Each small square is ten years. Each large square is 1,000. | 10 years | 1,000 | twelve full blocks to the year 2000, then a thirteenth with one square for each decade that has begun (three in 2026), worked out from the date |

For every window: past at top left, time running down each column of ten and then right; handmade-glass shading, each square a slightly different shade; near-black lines between the small squares; the silver came between blocks, a little darker than the sketch's, and between rows, a little narrower than the sketch's; a gold mark at now, strong enough to see against the last colour. No squares for time that hasn't happened.

**The years on the right.** On the 4.6 billion window, each row's end is marked at its bottom right in small type: 1 billion, 2 billion, 3 billion, 4 billion, and 4.6 billion just after the last square of the short last row. The other windows mark their block edges the same way, in the same small type; the 12,000 window counts years after the ice. The label under the cursor says how long ago and, on the 12,000 window, the ordinary year ("the 1760s").

**The glass.**
- *4.6 billion*: thirteen periods, revision 3's table (revision 1's twelve colours, and a pale ice colour for the last three squares).
- *Last million*: ice age against warm spell, from `stories/curves/sea-level-ice-ages.json`, the curve the globe's sea follows. Build two ways with a bench-only switch: A, two colours, the line set so the warm spells fall where the interglacials do (report the threshold and the warm spells it gives); B, graded, the paler the lower the sea.
- *Last 12,000*: plain glass for now.

Events: single squares backlit in a brighter version of their own colour, taken by label from the repo's event files inside each window's span. Report which.

Run every pair of neighbouring colours through a color-blindness simulation, with the dark lines in place, and report any pair that fails.

## Periods

With *Periods* on, rolling over a period lights it (the rest of the window dims gently) and shows a white, legible box below it, with a pointer line up to the period and its words inside. On the iPad, while her finger is down. One box at a time, never wider than the window and never past its edges: centred on the period, slid inward if it would stick out. With *Periods* off, the lighting stays and the box doesn't appear.

The words: revision 3's table for the 4.6 billion window. On the last million window, two boxes, placeholders for Michael: *Ice age*: "Sheets of ice cover much of the north, and the sea is low enough to walk to some islands." *Warm spell*: "Warm, like now. Forests grow where the ice was." None yet on the 12,000 window. Keep the words in a table that can later hold several texts per period; when a period has several, show them shuffled, without repeats.

## The timeline below

The Earth bench's own timeline: its stretching age line and two copper flags. Use its code (Michael); don't write a new one. If using it means moving code into `js/`, say what you would move and why, and stop there rather than changing how `earth-3d.html` behaves.

- The flags show their years on the outside: the right flag's year to its right, the left flag's to its left. When a flag is at an end of the line with no room outside, try a margin at each end of the line, or the year tucked inside, and show Michael both.
- Between the flags, a narrow copper line, with the span written on it in black ("200 years").
- The flags, and dragging across squares in the window, choose the selection. The lit squares in the window always show the selection.
- To the right of the timeline, *stretch*, *shrink* and *back*. None of them changes the selection; they change only how finely the line shows it.
  - *stretch*: the space between the flags fills the timeline.
  - *shrink*: the timeline fills in on either side of the flags with years in proportion to the distance between them, so the flags keep their years and move toward the middle. Now is a wall: what would run past today comes in on the left instead. If the line's span outgrows the window in use, the window steps up a scale.
  - *back*: one step back, as on the bench.
- The text the bench shows goes below the timeline.

## Not in this step

The globe above it all, cities, carrying her span into the globe, stories painting the glass, the period-box pools, the intro page's real words, the last million's swings as periods.

## Check, then stop

Check on the Mac in the pane and at iPad size: each window, its explanation, its labels on the right, the thirteenth block on the 12,000 window, *Periods* on and off with the box staying inside the window, A and B, a drag on each window, the flags' years at the ends of the line, stretch, shrink (with the wall at now and the step up a scale), back, the lit squares following the flags. Small pictures beside the report, in `CWVault/claude/Earth-3D-Bench-07-Nov02/`; the report in `CWVault/claude/Report-Earth-3D-Bench-07.md`. Note anything a finger can't do on the iPad.

Stop and report. Don't commit.
