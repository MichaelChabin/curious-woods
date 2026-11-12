---
status: Report, 12 Nov 2026. Step 5 of the Time lab bench, built on `f90aa9fc` (the step-4 page as committed in `9eed2d35`). Checked in the pane at 1,024 × 768 by pointer and at 768 × 1,024 by finger events. Reported before committing, as the prompt asks; committed and pushed on Michael's word, "commit it and push", this session's hunks only. Michael's prompt `Prompt-Revise-Time-Lab-Bench-05.md`.
role: What step 5 did to `experiments/time-lab.html`, what it found, and what needs Michael's eye.
related: Prompt-Revise-Time-Lab-Bench-05.md, Report-Time-Lab-Bench-04.md (the page as it stood), Prompt-Revise-Time-Lab-Bench-06.md (the next step), Lab-Time-01.md
---

# Report: the Time lab bench, step 5 — the labels and the menu (12 Nov 2026)

Only `cw-deploys/experiments/time-lab.html` was changed. No shared script was touched, and the store was read but not
written. The stamp is `2026-11-12 f90aa9f · time-lab step 5`. There are twenty-three pictures in
`Time-Lab-Bench-05-Nov12/`, named below by number. `check-deploys` reports no errors on the page.

## Years are written short

One function, `agoWord`, writes every year that counts back from now. It is used by the flags, the handle, line one,
the cursor label (the 12,000's decades), the events' tooltips and the bench readout.

- **a billion years ago and older:** Ba (*4.6 Ba*, *4.567 Ba*)
- **a million to a billion:** Ma (*720 Ma*, *66 Ma*, *2.58 Ma*)
- **12,000 years to a million:** ka (*474 ka*, *67.8 ka*, *12 ka*)
- **inside the last 12,000 years:** the calendar year (*4000 BCE*, *1 CE*, *1540*). BCE years are written as the store
  writes them: no comma under 10,000, so *3200 BCE* and *10,000 BCE*.
- **the present:** *now*, never *today*.

**How many figures.** A year that came from a pixel (a dragged flag, or the handle under her finger) shows only as
many figures as one pixel of the line is worth: *96.2 Ma* on the Dinosaurs line, *474.5 ka* on the Fire line, *1730*
where a pixel is ten years. A year that came from a thing (a period's edge, an event, or an end of the line) is
exact. It gets three figures after the point under 10, one under 100, and none above that. A value that rounds up to
1,000 of a unit moves up a unit, so *999.97 Ma* is written *1 Ba*.

**Line one** for a period now reads, for example:

- *Dinosaurs · 252 to 66 Ma · 186 million years*
- *Two parents · 1.8 Ba to 720 Ma · 1,080 million years*
- *Hand axes · 1 Ma to 600 ka · about 400,000 years*
- *Farms · 12 ka to 4000 BCE · six thousand years*
- *Iron · 1200 BCE to 1 CE · 1,200 years*
- *Electricity · 1880 to now · 150 years, so far*

Where both years share a unit, the unit is written once.

**An event's date on line one** is shortened by one rule in one place (`shortDate`). The rule rewrites the summary's
date sentence, so *about 149 million years ago* becomes *about 149 Ma*, *about 26,500 to 19,000 years ago* becomes
*about 26.5 to 19 ka*, and *at least 67,800 years ago* becomes *at least 67.8 ka*. Calendar dates such as *1500s* or
*15 June 763 BCE* are left as they are.

A sweep of all 185 events found no line one still saying *years ago*, *million* or *billion*. The four summaries that
don't open with a date take `agoWord` of the event's year (*Animals ashore · 428 Ma*, *Teotihuacan · 400*). The
store's own prose is unchanged, and that includes the More window's date line, which comes from the store.

**Lengths stay as they were.** That covers the span between the flags (*719 million years*, *6,026 years*), line
one's lengths, and the scale lines (*The Solar System · 4,600 million years*).

## The flags

- **Each flag's year stands outside it.** The left flag's year sits to its left and the right flag's to its right, on
  the labels' row. At an end of the line the year hangs in the gutter beside the tiles (*4.6 Ba*, *now*). A year
  never covers its flag or its pennant.
- **The handle's year moved up a row**, so it can never meet a flag, a pennant or the span. It is centred on the
  handle, kept inside the column, and kept clear of *focus* and *back*.
- **No year twice.** When the handle stands on a flag, that flag's year is not drawn and the handle's year is the
  only one (`03`, `05`). "Stands on" means within a pixel and a half, or writing the same year.
  - The handle also takes the flag's exact year when it is dragged or tapped onto the flag. Without this, the handle
    at the right end of the Farms line read *3970 BCE* (rounded to the pixel) beside a flag that said *4000 BCE*
    (`14`, before the fix). After the fix, the same finger drag reads *4000 BCE · measured* with the flag's year not
    drawn, and onto the left flag *12 ka · measured*.
- **The span sits at the flags' level**, centred between them, inside the two pennants. The copper line under it is
  now unbroken (`02`, `03`, `06`).
- **When the flags are too close for the span:** the span moves up to the handle's row, centred over the flags, if
  the handle's year leaves it room there (`16`). If not, it is not drawn, and the flags' years still give both ends
  (`07`).
  - On the 659 px line, the span fits between the pennants once the flags are about 140 px apart.
- **Step 4's collision rules are gone:** stepping aside, stepping inward, and the two-label resolution. The only rule
  left from them is that a pulled flag whose year has no room outside it within the column goes up a row.

## A selection through the last tile ends at now

Michael's drag through the final tile ended at *1 Ma*. The pointer had left the glass beside the tile above the last
one, so the drag's last tile was 4598.

- **During a drag**, the pointer now counts as being on the last tile when it is past the mosaic's end: to the right
  of the last tile, at or below the top of its block. That area includes the empty end of the row, the 12,000's clear
  glass, and the gutter (`pastEnd`).
- **For every way of making a selection**, a span whose newer end falls inside the mosaic's last tile ends at now
  (`toNow`, in `chooseSpan` and at the end of a pull toward now).

What was checked:

- **Mouse in the pane:** a real drag from 720 Ma out past the final tile ended at now (`08`).
- **Synthetic drags**, on the 4.6 billion into the empty end of the bottom row, on the 12,000 into the clear glass,
  and on the last million out into the gutter, all ended at now.
- **Finger at iPad size:** the same drag ended at now.
- **A pull:** the right flag of Dinosaurs pulled toward now would have stopped at 0.32 Ma. It ends at now.

A flag dragged along the line is left where she puts it. It is the fine-grained tool, and snapping it would stop her
choosing 2000 to 2022 on the 12,000.

## focus and back

The two words now sit side by side on the handle's row, above the flags' labels, with their right end at the
column's edge (`06`). No event's stem or label can reach them. A check of every event label and stem against their
boxes found no overlap in any state, even when the words were absent. Their meaning is unchanged.

To leave them room, the handle's year stays to their left. So at rest *now · measured* sits just left of the line's
end rather than centred on the handle (`02`).

## The menu

The column now reads:

- *How this works*, its text unchanged.
- **Earth**
  - *Full screen*
  - *Large Earth*, *Small Earth*, *Map*: the one in use is in copper.
  - *Reset*: the view's reset word, renamed and now last. It returns the turn and the zoom to the opening view.
- **Information**
  - *Show cities* / *Hide cities*
  - *Show coastlines* / *Hide coastlines*
  - *Place markers* / *Hide markers*

**Large Earth / Small Earth / Map.** Large Earth and Small Earth are the ball in a stage half and a third of the
screen's height (384 px and 256 px at 768 tall). Map is the flat world, at the stage size it had. A tap on the flat
world still goes back to the globe, and the copper moves to the globe size in use.

**Hide periods** is gone, together with `setPeriods`, `state.periods` and `LOOK.dimRest`. Pointing lifts the period,
the text under the Earth tells it, and nothing dims.

**How this works** has lost its *small / large* switch. The bench readout stays under its *bench only* label, since it
is not a switch (`17`).

### Today's coastlines, riding their plates

The page had today's coastline only in the form `earth.js` draws it, which is fixed in the globe's frame: it does not
ride the plates. The data does let the coastline ride the plates the way the cities do, so I built that rather than
stopping.

- **The data:** the 0 m rings of `contours-0.json`, 101 rings and 2,844 points.
- **Which plate carries each point:** the plate whose piece holds that point today. This is the Earth's own `plateAt`
  test, copied, with a box round each ring to make it quick. The page draws the lines on a canvas over the Earth with
  `earth.project` and `projectFlat`, the same calls that place the cities. The colour, width and opacity are the
  Earth's coast's.
- **Where a line is drawn:** a segment is drawn where both ends show, face the camera, and ride one plate. A segment
  that crosses from one plate to another is drawn only this side of the seam (2.6 Ma), so the coastline opens where
  the plates part.
- **When a point shows:** while its piece lives, fading over the twenty million years before the piece's birth (the
  cities' rule). Nothing shows at an age the Earth has no map for.
- **Points no piece holds:** 250 of the 2,844 (9 per cent: Iceland, Hawaii, some Arctic islands). Like the Earth's own
  ground under the pieces, they stay to the seam and are gone past it.

Seen: today's coastline lies on the photograph's coasts (`18`). At 150 Ma it rides with the pieces, with Europe, the
Mediterranean, Arabia and Greenland where the model puts them (`19`). On the flat world at 150 Ma it follows the pieces
of Pangaea (`22`). Drawing it takes about 11 ms when it changes. It is not redrawn while nothing moves.

### Markers

With *Place markers* chosen:

- **A tap on the Earth sets a marker.** On the globe or on the Map, at any age, she may set as many as she likes. The
  stage's cursor becomes a cross.
- **Where a marker goes:** onto the piece under the tap at that age, carried back by its plate to where that ground is
  today. From there it rides like a city.
- **A marker** is a copper dot ringed in parchment, drawn the way the year's handle is.
- **A tap on a marker deletes it.**
- **A drag still turns the Earth** and sets nothing.
- ***Hide markers*** hides them all and ends the placing. A tap then does the Earth's own work again (on the Map, back
  to the globe). *Place markers* brings them back.

**At an age when a marker's ground did not yet exist,** the marker does what a city does. It fades over the twenty
million years before its piece was born and is gone before that. A marker set in Germany (a piece born at 420 Ma)
shows at 410 Ma and is gone at 460 Ma; one in Libya (500 Ma) is gone at 520 Ma. A marker also goes at any age the
Earth has no map for.

**A tap on the sea** sets a marker only this side of the seam. Such a marker rides nothing (the page knows where the
continents went, not the sea floor), so it is shown to the seam and gone past it. A tap on the sea past the seam sets
nothing. For Michael's eye.

What was checked:

- **By real clicks at 1,024:** three markers set at now on the globe (`20`) and carried to 150 Ma (`21`); the sea
  marker gone at 3 Ma.
- **On the Map:** two markers set at 150 Ma, one on Pangaea's America and one in Africa (`22`). Taken to now, they
  stand in Oklahoma and Cameroon (`23`). One was deleted by a tap.
- ***Hide markers* and *Place markers*:** hidden, the tap went back to the globe as the Earth's own tap, and *Place
  markers* brought them back.
- **A drag** turned the view by 54° and set nothing.
- **By finger at iPad size:** two set, one deleted, one carried to 200 Ma, hidden and brought back.

## Select years moves down

Select years and its three words now sit to the left of the mosaic, centred on its height (within 4 px on all three
mosaics). They move again when the mosaic, the Earth's size or anything above changes (`placeSelect`, also run by a
ResizeObserver on the main column).

**The credit moved too.** On the short mosaics at 1,024, a Select years centred on the mosaic ran into the credit
where it stood under Information (`12`, as found). The credit now comes down with Select years, under it (`09`, `13`).
In the narrow one-column layout under 760 px, both stay in the flow.

## Three things found in the check, outside the prompt

- **The coastline was invisible on the flat world in the pane.** A canvas laid directly over the WebGPU one did not
  appear on the flat world until it was given a z-index. The overlay canvases now carry explicit z-indexes: the
  coastlines 1, the Earth's places 2, the markers 3.
- **A handle dragged onto a flag wrote its own rounded year beside the flag's exact one.** Fixed: within a pixel and a
  half of a flag, the handle takes the flag's year.
- **The pane's classic scrollbar.** When a mosaic change made the page taller or shorter, the pane's scrollbar
  appeared or went and changed the column's width by 15 px. Until the ResizeObserver ran, *back* stood 13 px outside
  the column at iPad size on the 12,000. This happens in the pane only, as in step 4; the iPad's scrollbars overlay.

## Checked in the pane

**At 1,024 × 768, by pointer.**

- **Labels, 19 states**, each with a programmatic check: every label against every other label, the pennants, the
  poles, *focus* and *back* (present or not), every event label and stem, and the column's edges.
  - The 4.6 billion, the million and the 12,000; their periods, events, handle drags, flags narrowed and close,
    *focus* and *back*.
- **A second run of 66 states**: three periods on each mosaic, each with the handle in the middle, the handle on the
  right flag, the flags drawn in, the handle between them, *focus* and *back*.
- **Results:** no overlap, no sideways scroll, and nothing in the layout moved place through any gesture. Twelve
  boxes were measured before and after each gesture: the stage, the block, line one, the reminder line, the glass,
  the track, the words, the events, the lower column, and three menu words.
- **The menu:** every word did its work. Large and Small Earth changed the stage (384 and 256 px), Map and back,
  Reset returned to the opening view, cities on (44 places shown) and off, coastlines, and markers.

**At 768 × 1,024, by finger events.**

- The same 19 states: no overlap, and nothing moved through any gesture. The only finding was the scrollbar effect
  above.
- Dinosaurs (`13`) and Farms with the handle on and between the flags (`14`, `15`).
- The drag through the final tile, the pull toward now, and the markers.

**Not tried:** the real iPad or the simulator; *Full screen* (the pane refuses it, as in steps 3 and 4).

## Not in this step

These were left for later: the new list under Select years, the mosaic's closing and its sound (step 6); the 13.8
rung; trips; the probe; *Cut open*; the front door; the swap.

## Needs Michael's eye

1. **Ba or Ga.** This page writes Ba as the prompt rules. The Time Machine writes Ga, by his ruling of 18 Oct
   recorded in `js/deep-time.js` ("the real forms people in the field use, never an invented one"). When the swap
   comes, one of the two gives way.
2. **The 12,000's start reads *12 ka*, not *10,000 BCE*.** The row starts 12,026 years ago, which is older than
   12,000, so the rule as written makes it ka. Moving the edge of the calendar rule to the row's start (10,000 BCE) is
   one number, `LOOK.calYears`.
3. **Round edges.** The 12,000 row's period edges are round numbers of years ago, so I round their calendar years to
   the same place: 6,000 years ago becomes *4000 BCE*, 600 becomes *1400*, 250 becomes *1780*, 150 becomes *1880*.
   The flags and the handle at those edges say the same. 2,000 years ago rounds to the year 0, which does not exist;
   it is written *1 CE*. The alternative is to restate the table in calendar years.
4. **The 4.6 row's own labels count forward** (*1 billion … 4 billion, Now*). They are not years ago, so I left them.
   Beside a flag reading *3.6 Ba* they may read oddly. The alternative is *3.6 Ba, 2.6 Ba, 1.6 Ba, 600 Ma, now*. The
   row also ends in *Now* with a capital, where the million ends in *now*.
5. **The handle's year on the row above the flags' years.** This was my choice, made so that it can never cover a
   flag, a pennant or the span. At a flag, the flag's year is not drawn and the handle's says it.
6. **The span when the flags are close:** up a row where the handle's year leaves room, otherwise not drawn.
7. **focus and back side by side at the top right**, with the handle's year kept left of them. *back* reads directly
   above the right flag's year at the line's end (`03`).
8. **The credit moved under Select years.** The alternative is to clamp Select years below the credit, which puts it
   off-centre on the short mosaics.
9. **Sea markers** are shown to the seam and gone past it, and a tap on the sea past the seam sets nothing.
10. **The coastlines are the coarse rings**, not the detail the Earth loads close in. Close in, they will look coarse
    against the photograph. Where plates part, a segment between them is dropped past the seam. The 9 per cent of
    coastline that no piece holds is gone past the seam.
11. **The page fetches `continents.json` a second time** (963 KB, normally from the cache), because the Earth does
    not export its `plateAt`. Exporting it from `earth.js` is one line, but that file is outside this step.
12. **The Map keeps the stage size it had.** The alternative is to give the Map its own size.
13. **Lengths in figures:** the span word (*6,026 years*, *4,600 million years*) and some of line one's lengths
    (*1,200 years*) are unchanged from step 4.
14. **A tapped event's handle year can differ from its date on line one.** Chillies' handle reads *1540*, the store's
    year, while line one says *1500s*.
15. **After a drag past the end**, the cursor label goes on naming the last tile's period until the pointer moves.
16. ***today* is still in How this works**, in "from the beginning to today", because that text waits for Michael's
    new words.
17. **Open from step 4 and not touched here:** the empty block at iPad width, a period kept across a scale change, a
    scale word moving the Earth, and the placeholder periods.

## Pictures (`Time-Lab-Bench-05-Nov12/`)

`01` at rest at 1,024, the menu · `02` the whole line, 4.6 Ba to now · `03` Dinosaurs tapped, the handle on the left
flag · `04` Archaeopteryx, both columns · `05` the handle on the right flag, one label · `06` the flags in at 200 to
90 Ma, the span centred, focus and back · `07` flags close, no room for the span · `08` the last 720 Ma dragged past
the final tile, ending at now · `09` the last million, Select years centred and the credit under it · `10`, `11`
Farms and Electricity (taken before the credit moved) · `12` Fire, the overlap as found · `13` iPad, Dinosaurs by
finger · `14` iPad, Farms, the handle at the flag before the snap · `15` iPad, Farms by finger, handle mid · `16`
flags close, the span up a row · `17` How this works without the bench switches · `18` coastlines at now · `19`
coastlines at 150 Ma · `20` markers set at now · `21` the markers at 150 Ma · `22` the Map at 150 Ma, markers set and
coastlines · `23` the Map at now, the same markers carried.
