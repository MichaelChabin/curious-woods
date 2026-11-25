---
status: Report, 25 Nov 2026. A survey, read only, from Michael's prompt of 25 Nov ("Woods this week" chat, on his word that day). Nothing in cw-deploys, js or the site was changed. The lab was run on the local server (the working tree at 56264736) at 1,024 × 768, and its own hooks (window.cwLab) were used to try the walk's spans. No pictures: the pane was hidden and showed frames a step behind, so none would have shown what the text says.
role: How much of the Time lab a walk page can borrow as it stands, what would have to change, the two choices Michael must make before a bench, and a sketch and size for that bench.
related: Worknote-Walk-Back-01.md to -03.md (claude.ai project), Report-Time-Lab-Bench-12c.md, cw-deploys/experiments/time-lab.html, js/3d/earth.js, js/cw-panel.js, js/deep-time.js, stories/deep-time-events.json
updated: 2026-11-25
---

# Survey: what the walk can borrow from the Time lab (25 Nov 2026)

## For Michael

**The short answer: almost everything the walk needs is already in the lab, but almost none of it can be borrowed by another page as things stand.** The mosaic, the line, the arrows, the handle, the events on the line, the panel, How this works, arriving and *back* (Pick a time's) are all written inside `time-lab.html` itself, in one script of about 2,600 lines. Only the Earth (`earth.js`, `scene.js`), the panel's window (`cw-panel.js`), the More (`map.js`, `deep-time.js`) and the year (`cw-time.js`) are separate files. A separate page can load those today. To load the rest it would have to copy it, which is the second Time lab you don't want.

**What the lab already does that the walk needs.** I tried each of these on the lab:

- **Put the line on any two years** while the mosaic stays whole. The lab's own call does it: Machines stayed whole and the line went to 1826–1926.
- **Show the events of a span on the line**, packed in rows, each tap opening the panel as in the lab: 21 events for 1826–1926 (18 named, the rest short marks), 10 for 1726–1826, 8 for 1926–now.
- **Gather a span's tiles** and run the move between mosaics. This includes finer tiles merging into coarser ones, which is what *the days gather into years* would use.
- **Restore everything to where it was.** Pick a time's *back* does it: the view, the mosaic, the line, the year, the selected event, the panel and the globe's turn. *Back to the walk* is the same thing.
- **A tap on an arrow does nothing** in the lab today. Only a drag acts. So a page can give the tap a job without taking anything from the lab.
- **The Earth can be any size**, with the lab's look (one sea, the soft shores, the photograph, any ground colour).

**What the lab does not have.**

- **No mosaic of days.** The finest tile is a year (Computing, 1950 to now).
- **No way to show the rest of the tiles dim with a bracket.** The lab lights the chosen span brighter and leaves the rest in its own colour.
- **No page-chosen events, and no rank.** The store's *weight* is 1, 2 or 3, and 149 of its 201 events are 2.
- **No text beside the Earth.**
- **No first-visit offer.**

**Two things in the content, not the code, that you should know before a bench.**

1. **The first step has no events.** The store's newest event is the first web page (1990). Between 2016 and now it holds none, and 1926–now has eight. The walk's first two steps need events written before they can show ten.
2. **The Earth beside the text will not change for most of the early walk.** This side of the ice the lab's Earth is today's satellite picture, so at 2016, 1926, 1826, 1726 and back to about 20,000 years ago it is the same globe. If the small Earth is to say something in those steps, the obvious thing is to ring the places of the ten events. The lab already rings one event's place. Ringing ten is a small change in the lab page's own module.

### The choices before a bench

**1. Where the walk lives.** This is the one that matters.

- **(A) A state of the lab page itself (my recommendation).** Its address would be `experiments/time-lab.html?walk=1`, and later the offer and the word in How this works would open it. Everything she sees then *is* the lab's, working as in the lab, because it is the same code. *Back to the walk* is Pick a time's *back* again, and leaving the walk is simply being in the lab. The cost: the walk's code goes into `time-lab.html`, behind a switch. With the switch off, the lab must be shown to be unchanged to the pixel, as step 12c did.
- **(B) A page of its own, `experiments/walk-back.html`, as the prompt names it.** First the lab's script would be lifted out of the page into a shared file (`js/time-lab.js`), with a few doors the walk needs (below). Then both pages load it. This changes the lab: mechanically, but every line moves. CLAUDE.md asks for your word before a new shared script. It also costs a session on its own before the walk is begun. Going from the walk to the lab and back would mean crossing between two pages and keeping her place in between.
- (C) Copying the lab's parts into a walk page. You have ruled this out already.

**2. The ten years of days at iPad size.**

- Ten years is 3,652 days. At a row a year, the mosaic on an iPad held sideways is about 366 tiles across 660 px, so **each day is under 2 px wide**. It reads as a texture of colour, not as tiles. In The World's width it is about 2.3 px.
- The choices: keep days and let them be a texture; give the first step the whole width; or make the first mosaic weeks (52 a row, about 12 px each). Weeks would mean changing your ruling.
- A related small point: every day of the last ten years falls in the lab's period *Electricity*, so the days are all one colour (the lab's handmade wander aside).

## The detail, part by part

### 1. The mosaic

**Where it lives:** `time-lab.html`, inline. It is made of:

- `WINDOWS`, the eight mosaics, each a line of settings;
- `build`, which colours them;
- `computeLayout` and `rectIn`, which lay them out;
- `drawMosaic`, which draws them;
- `gatherOf`, `lineLayout` and `drawLine`, for the gathered line;
- `planMove` and `moveFrame`, for the move.

**Can a second page load it?** Not as it stands. It is not in a file.

**Days, then years, at the walk's spans:**

- **Years: yes, by settings alone.** A mosaic that begins in a given year is a `first:` entry, as Machines (`first: 1720`) and Computing (`first: 1950`) are. So "1926 to now in years" and "1826 to now in years" would each be one line in `WINDOWS`. Their tiles take the colours of the 12,000's periods, as Machines' do.
- **Days: not as it stands.** The tile is a fixed share of a year (`unitMa`), so a day as a unit is possible. But the lab's mosaics run time *down* each column and then right; your ruling is a row a year. A row-a-year layout can be had with a column one tile tall (`colH: 1`) and a block a year wide (`bw: 366`, `rows: 10`). Leap years would then be off by a day a row. Rows of exactly 365 or 366 days would need `rectIn` and `hit` to learn irregular rows: a change to the lab's code, though one it would never use.
- **The days gathering into years** is the move the lab already plays when finer tiles merge into coarser ones: ten or a hundred glide together onto their middle tile, which travels. I did not watch it at 3,652 tiles. The move's limit is 12,000 tiles before it becomes a cut, so it is inside that limit.

**Some tiles bright, some dim, with a bracket, while the line shows only the bright ones:**

- **The line half is there now.** The lab's `resetSpan` sets the line to any span and moves no tile. Checked: Machines whole, line 1826–1926, its 21 events on it, the handle carried to the line.
- **The dim half is not.** `drawMosaic` lights the tiles inside the span (`backlit`) and leaves the rest in their own colour. The walk wants the reverse emphasis: the inside at its colour, the rest dimmed. That is a few lines in `drawMosaic` and `drawLine`, behind a setting the lab never turns on.
- **The bracket is new drawing.** For a one-row mosaic it is a line under the row from the first bright tile to the last. On the 4.6 billion, whose rows wrap, it would be one bracket per row. On mosaics with period names under the row (Machines, Civilization), it must sit below the names or the names must give way. That is not decided.

**The lab's rule that the tiles always match the line** is enforced in one place, `setSpan`, when an arrow is let go. The walk sets its line with `resetSpan` instead, so the rule does not fire during the walk, and comes back by itself the first time she drags an arrow. That is the behaviour you ruled.

### 2. The line, the handle and the two arrows

**Where it lives:** `time-lab.html`. The parts are `STR`, `renderStretch`, `placeLabels`, `arrowMove`, `releaseArrow` and `setSpan`, and the track's pointer listeners.

**A tap on an arrow given a different job, a drag keeping the lab's:**

- A press on an arrow is marked as the arrow's. A tap (no movement) ends in `releaseArrow` with nothing dragged, and so does nothing.
- One door would give the tap a job: in the track's `pointerup`, an arrow pressed and not moved calls a function the page may give (`onArrowTap(i)`). If the page gives none, it is as now. The lab would be unchanged.

**The line's span set to any two years:**

- **Yes.** `resetSpan(a, b)` takes any two ages in millions of years. It does not snap to a mosaic's grid. `setSpan` does snap: 1226–1726 on Civilization's decade tiles came out 1226–1730. So the walk should use `resetSpan` while it walks.
- **The ends' words:** the ends read 1826 and 1926, the span's length *100 years*.

**One thing to watch:** `resetSpan` does not redraw. The page must call `renderStretch` after it. The lab's own code always does.

### 3. The events

**How the lab loads them:** one fetch of `stories/deep-time-events.json`. That is 201 events at the check (the store is changed but not committed in the working tree: another session's, five more than this morning). Each one is kept whole as `rec`.

**Which show on the line:**

- `eventsOnLine` takes every event inside the line's span.
- It sorts them: the selected event first, then heavier first, then older first.
- `placeEvents` names as many as fit in four rows; the rest are short marks.
- So **where they bunch already shows**: at 1826–1926 most are after 1850.

**Exactly ten chosen events for a span:**

- One door: `eventsOnLine` filtered by a list the page gives (the ids of the period's ten).
- The list belongs in a small file of the walk's own: `stories/walk-back.json`, the walk's periods, each with its years, its text and its ten ids.
- If the store later gives an id a new name, the file must follow it. The store already carries `aliases` for that.

**The ten highest-ranked, later:**

- The same door, taking the first ten by a rank.
- The store has no rank. `weight` is written from the widest line of the tree an event earns a label on (3 on the Earth line, else at most 2). It is 1 for 12 events, 2 for 149 and 3 for 40, and marked *proposed* on most.
- A rank would be a new field in the vault's event notes, carried by `tools/deep-events-from-vault.py`.

**Events per step today, at the walk's first sketch:**

| Step | Events in the store |
|---|---|
| The ten years of days (2016–now) | 0 |
| 1926–now | 8 |
| 1826–1926 | 21 |
| 1726–1826 | 10 |

### 4. The panel

**Where it lives:**

- The window is `js/cw-panel.js` (`CW.createInfoPanel`), which another page can load as it is.
- What goes in it (`panelHTML`, `eventDate`, the date rules, the period's name at the top, More in the panel's place) is in `time-lab.html`, with the More's own pieces in `deep-time.js` and `map.js`.

**Opening the lab's one panel for an event:** inside the lab page it is `tapEvent(e)`, the same call a tap makes. A separate page could only open the same panel by copying `panelHTML` and its date helpers, about 150 lines.

**A separate text beside the Earth:** nothing in the lab does this. Step 9 removed the text block that stood under the Earth. It is a new element of the page: a box beside the stage, not a `cw-panel`, because you ruled that the lab speaks beside the Earth and the panel is where she asks. The step's old `WORDS.spanTexts` are there and unused, but they are the lab's mosaics' texts, not the walk's.

### 5. The Earth

**Where it lives:** `js/3d/earth.js` on `js/3d/scene.js`. Both are modules, and both are loaded by another page as they stand.

**A small globe beside a block of text:**

- **Yes.** The globe fills its stage's height, and the stage is any box the page gives. The lab already changes its height at will (`setStageH`, then `earth.resized()`).
- For "beside", the stage is made narrower and a text box stands next to it. That is page layout, nothing in `earth.js`.

**The lab's look:**

- One sea, the soft shores and the satellite picture are options and calls a page names.
- The dark of The World is only the colour the renderer clears to (the lab's `ground(css)`), so a small dark Earth on a parchment page is one call.
- A dark *page* is another matter. The mosaic's came, its words and the period names under the row are drawn for parchment and would need dark versions. "If it fits": the Earth's box dark, the page parchment, fits now.

**The options the walk page would name**, as the lab names them:

```js
cwScene(stage, { ground, gesture: 'globe', home, camera: {…}, phone: 'run' })
cwEarth(view, { marksHost: stage, seas: true, oneSea: true, seasSoft: true })
earth.setGround('blue'); earth.setPlaces(false)
```

`seasCrust`, `seasStrength` and `shelfColour` are not needed: they are only for step 12c's *as before*.

**At the walk's years:**

- Everything this side of the ice (about 20,000 years) is today's photograph, so the first steps all show the same Earth.
- The ring of an event's place is drawn by the lab page's own module (`setEventPlace`, one point). Ten rings would need it to take a list.

### 6. How this works

**How the lab's words are built:**

- **In Time:** `htwPanel`, a `cw-panel` filled from `WORDS.htwFirst`, `htwTime`, the grade's sentence and `htwSeas`, then the bench's rows.
- **In The World:** `htw2`, its words, then the tools as words. Each tool is the left column's own word mirrored (`mirrorWord`), so one act and one state.

**The walk as a word there later:**

- A word in the left column (under *Focus*, say) and one line in the World's list would mirror it there.
- If the walk is a state of the lab (choice A), the word starts the walk.
- If it is a page of its own (choice B), the word is a link, and her place in the lab has to be carried across, in the address or in the session's storage.

**The first-visit offer** has no home yet:

- It is a `localStorage` key: the house already keeps `cw-sound` that way.
- It also needs a ruling on order. The lab now arrives in The World on First trilobites, dark from the first paint. The offer either comes before that arrival or replaces it.

### 7. What else a walk page needs that the lab lacks

- **The walk's own file:** the periods, each with its years, its one short text and its ten event ids. Then the code to step through them: next on the left arrow's tap, back toward now on the right arrow's.
- **The mosaics of the distance walked:** one `first:` mosaic per early step (2016 in days, 1926 in years, 1826 in years, 1726 in years). For the wider steps after that, the lab's existing mosaics, which all run to now. Each holds more than the distance walked (1720 for 1726, 200 BCE for a step back to 1226), so the dim tiles would then include a little not yet walked. If that matters, one `first:` mosaic per step, in decades or millennia, is one line each.
- **The state the walk keeps** for *back to the walk*: Pick a time's `before` is the pattern. It holds the view, the mosaic, the line, the year, the mark, the event, the panel, the flat map and the globe's turn. The walk adds its step.
- **The words:** *back to the walk*, the offer, the text beside the Earth.
- **Creature stops**, later: the Earth's place in the layout given to a model and a fossil picture. That is not surveyed here. The Earth bench and the 3D shelf are where that starts.

## A sketch of the bench

**If the walk is a state of the lab (A):** `time-lab.html?walk=1` opens the Time view with the walk's layout.

- **The Earth's row:** a small stage on the left, the period's text beside it.
- **The mosaic:** the distance walked, the step bright, the rest dim, with the bracket under the bright tiles.
- **The line:** set by `resetSpan` to the step, its events filtered to the step's ten, the panel as in the lab.

The arrows and the switch back:

- A tap on the left arrow takes the next step: the mosaic grows, by the lab's move going out, and the line resets.
- A tap on the right arrow goes back a step.
- A drag on either is the lab's own, and from then on the page is simply the lab, with *back to the walk* beside the text.
- *Back to the walk* restores everything, as Pick a time's *back* does.

**New code**, all behind `?walk=1`:

| Part | Lines |
|---|---|
| The walk's state and stepping | about 150 |
| The days mosaic and the step mosaics (settings) | about 20 |
| Dim and bracket in `drawMosaic` and `drawLine` | about 60 |
| The arrow-tap door | about 5 |
| The event filter | about 5 |
| The Earth-and-text row (styles and placing) | about 80 |
| *Back to the walk* | about 60 |
| Ten rings on the Earth, if wanted | about 20 |

Plus `stories/walk-back.json`, with its text and ids written in the vault first.

**Size:** about 400 lines in the lab page, and one bench session. A second session would check the lab unchanged with the walk off (to the pixel, as 12c did) and walk the steps on the iPad.

**If it is a page of its own (B):**

- **First, one session:** lift the lab's script into `js/time-lab.js` as it is, with the doors above, and show the lab unchanged.
- **Then the walk page:** about 300 lines of its own on top, plus whatever of the lab's layout it needs (the page's styles are also in `time-lab.html`, about 250 lines). The walk-to-lab crossing adds about 50 lines on each side.
- **Size:** two sessions before the walk is walked on the iPad, and a third to check.

**Either way, before the bench:**

- ten events for 2016–now, and two or three more for 1926–now, written in the vault and run through the tool;
- the walk's period texts;
- your word on the days.
