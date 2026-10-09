---
status: Current thinking, not rulings — Michael's summary of a chat of 8 Oct 2026, filed by Claude Code 9 Oct 2026 at his word. It reflects where his thinking is; where it contradicts Plan-Deep-Time.md or Time-Machine-Shape.md it has not yet overruled them.
role: The format of the one timeline — one zoomable line from the Big Bang to now, the envelope, periods and events, where zero sits, landmarks, period names, how stories open the lab — and its open questions. The brief for Stage 7 reads this beside the plan.
related: Plan-Deep-Time.md (Stage 7), Time-Machine-Shape.md, Timeline-Stories.md, Rulings-Sept-2026.md (Deep time), Ideas-Ledger.md (Other labs, 8–9 Oct)
---

# The one timeline: current thinking (8 Oct 2026)

Michael's words, from his summary of the chat. Filed unchanged.

## One timeline

There is one zoomable timeline, from the Big Bang to now. Deep Time and Time Machine become one continuous zoom: the last 12,000 years is simply the deepest drop-down.

It is a lab. Stories borrow its capabilities rather than carrying timelines of their own.

Format follows Time Machine, not the colored-box prototype: a simple line with the adjustable blue highlight.

## The envelope

Time Machine's draggable, resizable blue envelope is the model, with its funnel down to the close-up line. Deep Time's filled rectangles are retired.

- **Detents.** As an end is dragged near a period boundary, it clicks into place. It stays freely movable.
- **Color.** Snapped to a named period, the envelope is blue. Dragged off, it turns white. Consider carrying the color down the funnel's edges too.
- **Label.** Snapped, the funnel's empty space shows the period name. Free, it shows the span ("about 340 million years").
- **Clash to watch.** If segments ever get colors, a blue envelope must not vanish over a blue segment: give it a strong outline or keep segment colors quiet.
- **Wording.** Line labels should use the same phrase throughout (Time Machine currently mixes "years after the ice" and "years after 0").

## Periods and events

The timeline holds two kinds of thing.

- **Periods** are segments. Tapping one drops it down into its own timeline, which can have periods of its own.
- **Events** are points (or spans, using the dot-and-tail marker). Tapping one gives a 30–60 word summary; More opens up to 350 words with an image or two.

**The 5% rule.** A segment narrower than about 5% of its bar (roughly a 44-point tap target on iPad) is not a period. It becomes an event, or rides inside a larger period.

One data pool holds every period and event; each knows its parent.

## Where zero sits

Each line's left edge is labeled both 0 and years ago, so the right edge reads as a duration with no subtraction.

- By default, a dropped-down line resets to zero at its own left edge.
- A story can pin zero to any event. Example: a story on recovery after the dinosaur-killing impact sets zero at the impact, so later events read "years after the impact."

This supports a family of "how long after" stories: from the impact to a full ecosystem, from the ice's retreat to the last mammoths, from the first grass to grass everywhere.

## Landmarks

Most events appear only on the line she is looking at. A small set of **landmarks** appears on every line where it falls, at every level. Some help her remember a period (the oceans form, the meteor strike, the Siberian volcanoes); some are simply great milestones (photosynthesis). The aim is a set of markers that, once absorbed, give her a sense of scale she can carry with her.

Candidates, oldest first (dates rough, to be checked; starred are the strongest):

- *The Big Bang, 13.8 billion years ago
- First stars, about 13.5 billion
- *The Sun lights up, 4.6 billion
- The Moon is made, 4.5 billion
- *The oceans form, about 4.4 billion
- *First life, about 3.8 billion
- *Photosynthesis, about 3 billion
- Oxygen fills the air, 2.4 billion
- Complex cells, about 1.8 billion
- Snowball Earth, about 700 million
- *The Cambrian explosion, 539 million
- *Plants on land, about 470 million
- Fish crawl ashore, about 375 million
- *The Siberian volcanoes (the Great Dying), 252 million
- First dinosaurs, about 230 million
- *The meteor strike, 66 million
- Our line splits from the chimps', about 6 million
- *The first of our kind, about 300,000 years ago
- *The end of the ice, about 12,000 years ago (the door to the Time Machine)

**Pile-up rule needed.** On the full line, everything from the meteor on falls in the last 1.5%. In a crowded stretch, show only the most important landmark; the rest appear as she zooms in.

## Period names

Names are plain and useful, not cute. Hazen's _The Story of Earth_ is the reference for content; his names are not used. Dates are approximate, in billions of years ago (Ga).

| Period | Span (Ga) | Share of Earth bar | Inside it |
|---|---|---|---|
| The young Earth | 4.57–4.0 | 12% | Events: Sun lights up, Moon is made, first crust, first oceans |
| First life | 4.0–2.4 | 35% | Events: first continents, first life |
| Oxygen arrives | 2.4–1.8 | 13% | |
| Ancestors | 1.8–0.635 | 25% | Complex cells, first sex; Snowball Earth as a span event near its end |
| Animals | 0.635–now | 14% | Drops down to: in the sea, on land, dinosaurs, after the dinosaurs |

After the dinosaurs (66 million years ago to now) drops down again, eventually reaching humans and then the last 12,000 years (the Time Machine view).

Above all of this sits **Before the Earth** (13.8–4.57 Ga), with its own drop-down: first stars, galaxies, the Sun.

## Stories open the lab

A story calls the timeline with a few settings: where to start, which events to feature, and whether the map is on. Example: the Van Gogh story opens it zoomed to 1853–1890, with the blue highlight on his lifetime.

From there she can tap events, use the map, and zoom out as far as the Big Bang.

- As she zooms out, the highlight shrinks to a small marker that never disappears, like the "you are here" dot on a mall map.
- One tap snaps her back to the story's span.
- Once she wanders off, she has left the story. It was the door that got her in. The marker and her visited list are the way back; no story state is held in the background.

## Open questions

- Do names say what happened ("Oxygen arrives") or what Earth was like ("Black rock")? Current list mixes both.
- Use Hazen's color sequence (black, blue, gray, red, white, green) as segment colors?
- What does the map show before there is an Earth to map?
- Is 5% the right minimum width? Confirm with an iPad pass.
- With four or five nesting levels, stack the lines or show only two at a time (the lower becoming the upper as she goes deeper)?
- Landmarks: a short list (about eight) that really sticks, or a longer one thinned by the pile-up rule?

## Where this stands against what is built (Claude Code, 9 Oct)

Not a ruling; a reading, for the Stage 7 brief. Five periods here against the ruled six chunks of `stories/deep-time.json` (the cuts differ: 4.0, 2.4, 1.8, 0.635 here; 4.4, 3.5, 2.5/1.8, 0.8, 0.539 there). The filled bars retired in favour of the Time Machine's envelope, against the loose ledger idea *Hazen's colours are the bar*. *Before the Earth* above the Earth bar, against the plan's "not the universe". A line's left edge reading 0 and *years ago* together, against the deep ruling that deep lines say *ago* only; the pinned zero is the shape page's "name a zero" applied inside the lab. The landmarks are a new field on an event (seen on every line), not in the record yet. None of this is built; the decisions are in the Stage 7 questions on the board.
