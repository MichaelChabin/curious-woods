---
status: Written 9 Oct 2026 by Claude Code from Michael's rulings of the same day (Rulings-Sept-2026.md, *The one timeline*) and his page of current thinking, Timeline-Format-Thinking-Oct08.md. For Michael to read, amend, and then paste into Claude Code, one lane at a time. Nothing in lanes B to E is built.
role: The Stage 7 brief of Plan-Deep-Time.md: how Deep Time and the Time Machine become the one timeline, in lanes each proved on the page before the next.
related: Plan-Deep-Time.md (Stage 7), Timeline-Format-Thinking-Oct08.md, Time-Machine-Shape.md, Timeline-Stories.md, Rulings-Sept-2026.md
---

# Prompt: build the one timeline

> Read `CWVault/00-WHAT-CW-IS.md`, then `CWVault/claude/Rulings-Sept-2026.md` (*Deep time* and *The one timeline*), then `CWVault/claude/Timeline-Format-Thinking-Oct08.md` (Michael's page; where it and the older plan differ, the rulings of 9 Oct say which wins), then `CWVault/claude/Plan-Deep-Time.md` (Stage 7 and *What not to do*), then the board. The pages are `active/deep-time.html` and `active/time-machine.html`; the modules `js/deep-time.js`, `js/timeline.js`, `js/map.js`, `js/globe.js`; the stores `stories/deep-time.json` (the tree) and `stories/deep-time-events.json` (the one store, every event). Build one lane, check it, stop and report; after Michael's yes, commit and push, and only then the next lane.

## What it becomes

One lab, one page, `active/time-machine.html`, opening on the Earth bar. One zoomable line from the Earth's beginning (later the Big Bang) to now, in the Time Machine's own form: a simple line with the blue envelope and its funnel down to the close-up line, at every level. A period is a segment of the line; tap it and it drops down into a line of its own. The last 12,000 years is the deepest drop-down, and there the Time Machine's Main, Focus window and Detail appear as they are today, with the map and the summary. Stories will open this lab on their own span; that is a later prompt.

## Lane A — on the page as it is (built 9 Oct 2026)

Done on `active/deep-time.html` the same morning, from Michael's five points: the flat map alone fills its area (the box grows to the map's 2:1 at full width, within the window's cap, and comes back); the map's words sit below the map and the event's summary above it; as the marker passes an event the page posts its name and summary, marked *just passed* (an experiment, his to keep or cut); a mark is a short vertical bar with the tail running from it. Not done: the graph tool, which is lane D.

## Lane B — the line in the Time Machine's form

*Built 9 Oct 2026, evening, on Michael's "start lane B"; checked, committed and pushed on his word.* All five points below, with
these calls made in the building, his to overturn: segments carry a quiet tint of Hazen's colour (his open question
on colours); the lines stack (his open question on two at a time); period names as his table has them; the
twitch is gone, since with an envelope any span opens — a leaf period opens as a line of its events alone; a
crowded line thins its marks by pixel spacing until lane E's landmarks; the 5 % rule demoted nothing but would
have demoted the ice ages (3.9 % of After the dinosaurs), which ride inside Humans (6 million years, where our line
splits), and After the ice (3.9 % of Our kind) stays as the door. One phrase for the ends: **0** over the years ago
at the left, the duration over the years ago (or *now*) at the right; the Time Machine's own ends change in lane C.

1. **The envelope replaces the filled bars.** `js/deep-time.js` draws each level as the Time Machine draws Main: a line, the periods as segments on it (quiet colour or none), the blue envelope over the chosen span with its funnel down to the next level's line. The marker, the *known from* line, the marks and their labels stay. The twitch stays for a period with nothing beneath.
2. **Detents.** Dragging an end of the envelope near a period boundary clicks it into place; it stays freely movable. Snapped, the envelope is blue and the funnel's space shows the period's name; free, it turns white and shows the span ("about 340 million years"). Try the colour running down the funnel's edges; Michael looks.
3. **One phrase for the line's ends.** Each line's left edge reads 0 and *years ago* together; the right edge reads as a duration. The Time Machine's "years after 0" and "years after the ice" become one wording, chosen with Michael.
4. **The periods are Michael's five**, from his table, with Animals dropping down to the sea, the land, the dinosaurs and after the dinosaurs, and after the dinosaurs dropping again to humans and the last 12,000 years. `stories/deep-time.json` is rewritten to that tree, every node with a parent, the *known from* lines rewritten for the new cuts and checked. The root extends to 4,568 so the oldest grains draw. **The 5 % rule:** a segment narrower than five percent of its line (a 44-point tap target on the iPad) is not a period; it becomes an event or rides inside a larger one. Say on the board which segments the rule demoted.
5. **Every event finds its line** by `ma` as now; the generator's `chunk` follows the new tree.

*Proves:* the envelope and funnel read at every level on the Mac and at 390 px; a child can grab a period without aiming. Stop for Michael's look before lane C.

## Lane C — the hand-over, and one page

*Built 9 Oct 2026, night, on Michael's "start on C"; checked, committed and pushed on his word.* Points 1 to 5, with these calls
made in the building, his to overturn: Main is the last rung itself — the deep module lays After the ice out
but does not draw it, and its funnel ends on Main (point 1 decided); the one painting keeps the Time Machine's
hourglass and name until he chooses, Deep Time's line is off the wall and its picture kept; After the Ice's own
page stays on the wall; the map's default view on this page is Map (the ground, where its events live), Globe and
Both hers to choose; the curves are plain words in the column for now, one at a time across both kinds, until
lane D; the China and Egypt viewings keep their own fixed lines with no deep lines above; Detail's ends say
"years after the ice" (the viewing's own phrase) in place of "years after 0". The iPad test is his, now.

1. When the last rung opens, the Time Machine's Main, Focus window and Detail appear beneath it, the map and the summary below as today, the marker handing to the copper handle. The deep bar above is the Time Machine's Main made recursive, so Main's own line may become the last rung itself; decide with the code in front of us and say which.
2. `active/time-machine.html` opens on the Earth bar; `active/deep-time.html` redirects to it; the gallery hangs one painting (its picture Michael's choice: the earth from space, or the hourglass). After the Ice's own page comes off the wall or stays, Michael's call.
3. The Time Machine reads the one store only; `stories/after-the-ice-events.json` retires from the page (After the Ice's page still reads it); her line's old ids resolve through the store's `aliases`.
4. **The column** is Geometry's left column (`#htw-panel`, `css/htw.css`), holding only words that act: How this works (with the page's explaining paragraphs inside it), What I've seen, Globe · Map · Both, Climate, another guess (present only when the word is *guessed* or *invented*), the curves (lane D), the question.
5. **The arrival run** on first visit stays as the Time Machine has it today, on the bottom rung. The descent from the Earth bar is deferred (Michael, 9 Oct).

*Proves:* every gesture of the Time Machine works under the deep bar; the Mores open; What I've seen still finds old ids. iPad test after this lane.

## Lane D — the graph tool

The curves (sea level, oxygen, day length, minerals, the sun and inside; people) each belong to one line: oxygen to the whole Earth, people to the last rung. A word *Graphs* in the column opens a panel that says so, one line per curve with the line it belongs to. Choosing a curve switches to that line, opens the envelope to the curve's span, plays the marker through it once, and the panel says what she is looking at (the curve file's `say` and `howSure`, in words). The Time Machine's own curve drawing gains the band (low to high) that `js/deep-time.js` draws. Michael's words for the panel are wanted before this lane is built; the prompt for it names them.

## Lane E — landmarks, and Before the Earth

1. **Landmarks.** A `landmark` field on an event record (a flag on the markdown's own line, `**Landmark:** yes`, read by the generator). Michael's eight starred ones first: the Sun lights up, the oceans form, first life, photosynthesis, the Cambrian explosion, plants on land, the Siberian volcanoes, the meteor strike, the first of our kind, the end of the ice (ten starred on his page; he chooses eight). Where one is not yet an event in the store, it is written as one, to Timeline-Stories.md, and checked as the batches were. A landmark shows on every line where it falls, at every level; the pile-up rule: in a crowded stretch only the most important shows, the rest appear as she zooms. Importance is `weight`.
2. **Before the Earth** (13.8 to 4.57 billion years) as one rung above the Earth, with first stars, galaxies and the Sun as its events, written and checked the same way. Built last.

## Deferred, by Michael's word

The descent on first visit; pictures in a More; the ten uncertain ages and the three `idea` kinds; textures, the atmosphere rim, the per-pixel globe; the Edge of Knowing story; a pinned zero for stories (the mechanism is lane B's wording; a story's call comes with the stories prompt).

## Open, for Michael, before the lanes that need them

- Period names: what happened ("Oxygen arrives") or what the Earth was like ("Black rock")? His list mixes both (lane B).
- Segment colours: Hazen's sequence, quiet, or none (lane B).
- With four or five levels open, stack the lines or show only two at a time (lane B).
- What the map shows before there is an Earth (lane E).
- The gallery picture and After the Ice's page (lane C).
- The words of the graph panel (lane D).
- Eight landmarks of the ten starred (lane E).
