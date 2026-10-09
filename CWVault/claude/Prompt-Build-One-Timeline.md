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

Done on `active/deep-time.html` the same morning, from Michael's five points: the flat map alone fills its area (the box grows to the map's 2:1 at full width, within the window's cap, and comes back); the map's words sit below the map and the event's summary above it; as the marker passes an event the page posts its name and summary, marked *just passed* (an experiment, his to keep or cut); a mark is a short vertical bar with the tail running from it. Not done: the graph tool, which is lane E.

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
lane E; the China and Egypt viewings keep their own fixed lines with no deep lines above; Detail's ends say
"years after the ice" (the viewing's own phrase) in place of "years after 0". The iPad test is his, now.

1. When the last rung opens, the Time Machine's Main, Focus window and Detail appear beneath it, the map and the summary below as today, the marker handing to the copper handle. The deep bar above is the Time Machine's Main made recursive, so Main's own line may become the last rung itself; decide with the code in front of us and say which.
2. `active/time-machine.html` opens on the Earth bar; `active/deep-time.html` redirects to it; the gallery hangs one painting (its picture Michael's choice: the earth from space, or the hourglass). After the Ice's own page comes off the wall or stays, Michael's call.
3. The Time Machine reads the one store only; `stories/after-the-ice-events.json` retires from the page (After the Ice's page still reads it); her line's old ids resolve through the store's `aliases`.
4. **The column** is Geometry's left column (`#htw-panel`, `css/htw.css`), holding only words that act: How this works (with the page's explaining paragraphs inside it), What I've seen, Globe · Map · Both, Climate, another guess (present only when the word is *guessed* or *invented*), the curves (lane E), the question.
5. **The arrival run** on first visit stays as the Time Machine has it today, on the bottom rung. The descent from the Earth bar is deferred (Michael, 9 Oct).

*Proves:* every gesture of the Time Machine works under the deep bar; the Mores open; What I've seen still finds old ids. iPad test after this lane.

## Lane D — labels, the measurer, and collapsing

*Written 9 Oct 2026, night, from Michael's second chat of the day (`claude/Prompt-Build-Timeline-Labels.md`, which
named the retired page; this lane restates it against the page as it is, and supersedes it) and his ruling of the
same night: a line's left edge no longer reads 0; lines count ago only; "how long did it take?" is answered by a
measurement between two ends, and a story sets those ends instead of pinning a zero (Rulings, *The one timeline*,
amended). Built the same night on Michael's "build it", checked, committed and pushed on his word: the labels and dates; the
envelope as the measurer (no markers of their own built); Collapse, Show and Show all, with the label above each
strip (the in-line variant not needed at this height); and *Collapse by itself* as a word in the column for him to
compare. Open for him: whether a measurement that opens nothing is wanted; collapse by itself or on press.*

> Read `CWVault/00-WHAT-CW-IS.md`, `CWVault/claude/Rulings-Sept-2026.md` (*The one timeline*, with its amendment
> of 9 Oct night), `CWVault/20-SPECS/Spec-Deep-Time-Interface.md`, and the board's entries for lanes B and C of
> 9 Oct. The page is `active/time-machine.html`; the deep lines are `js/deep-time.js`; Main is the last rung,
> drawn by the page on the funnel's foot. Build the three steps in order, show Michael each on screen before the
> next, ask before guessing, and stop before committing.

1. **Labels.** Every line gets one label, centred just above it, with a line drawn out to both ends of the line
   it names, as a measurement on a drafting drawing: `|———— The dinosaurs, 186 million years ————|`. The label
   is the period's name and its length when the envelope above is snapped; its length alone, with *about*, when
   the envelope is free: `|——— about 340 million years ———|`. The top line reads `|——— The Earth, 4.6 billion
   years ———|` and has no dates at its ends (its length and its age are the same). Every other line keeps two
   dates, in years ago, at its ends: the start at the left, the end at the right (*now* where it reaches now).
   The **0** at the left edge goes; the name at the left of a line goes; the label in the funnel goes: the centred
   label replaces both. Numbers count ago, in billions, millions and thousands, rounded to two or three figures.
   A label wider than its line stays centred but never runs off the screen. Main, the last rung, gets the same
   label above it, `After the ice, 12,000 years`, and keeps the Time Machine's own readouts below it. The
   tier height can come down with the name row gone; check the phone.
2. **The measurer.** Try the envelope first, since it is already two draggable ends with the length written
   between them: a free envelope *is* a measurement, and the line it opens below shows what happened in between,
   which is what a "how long after" story wants. `bar.focus(a, b)` exists, so a story can open the timeline with
   the envelope set from the asteroid to the first full forest. Show Michael that. Build separate markers (a word
   *Measure* in the column, then two taps to set and a drag to move; two bare taps on a line already mean "open
   this period" and "jump the marker") only if, having seen the envelope measure, he wants a measurement that
   opens nothing.
3. **Collapsing.** When more than two lines show, the word *Collapse* appears at the right of the stack. Pressing
   it collapses every line but the bottom one into a compact stack of strips about 44 points high (a finger must
   hit a period on a strip): a collapsed line loses its events and its curve, keeps its envelope, its period
   names and its label, and its funnel shrinks with it. The top line keeps everything but its events. Each strip
   has the word *Show* at its right, which brings that line back as it was; while collapsed, *Collapse* reads
   *Show all*. A tap on a period of a strip opens that period — the tap rule as it is, which already replaces
   the lines below. If the labels above the strips make the stack too tall, try the label in line with the strip,
   and show Michael both. Build collapse-on-press first; then show him collapse-by-itself (going a level deeper
   collapses every line above the parent, so two full lines always show, the strips the way back — Claude's
   advice) as a switch, and he rules.
4. **Record** the amended ruling where it is applied, mark the ledger's *Zero at the left edge, or pinned to an
   event* as superseded by the measurer, and name on the board anything left open.

*Proves:* the three on the Mac and at 390 px; the chain to After the ice collapsed to strips with Main whole
beneath; a story-set envelope reading its length. Stop for Michael's look before lane E.

## Lane E — the graph tool

The curves (sea level, oxygen, day length, minerals, the sun and inside; people) each belong to one line: oxygen to the whole Earth, people to the last rung. A word *Graphs* in the column opens a panel that says so, one line per curve with the line it belongs to. Choosing a curve switches to that line, opens the envelope to the curve's span, plays the marker through it once, and the panel says what she is looking at (the curve file's `say` and `howSure`, in words). The Time Machine's own curve drawing gains the band (low to high) that `js/deep-time.js` draws. **Michael's words are in `CWVault/20-SPECS/Spec-Deep-Time-Interface.md`, *Plots* (8 Oct):** a plot behaves like an event (a summary on tap, a More that says what the data are, how we know, why it matters); it shows only on lines where it has data and fades outside them; a faint dashed line at today's value; the value at the handle; a band where the estimate is shaky; features of a plot point to events; the candidate plots and where each shines. Build to that.

## Lane F — landmarks, and Before the Earth

1. **Landmarks.** A `landmark` field on an event record (a flag on the markdown's own line, `**Landmark:** yes`, read by the generator). Michael's eight starred ones first: the Sun lights up, the oceans form, first life, photosynthesis, the Cambrian explosion, plants on land, the Siberian volcanoes, the meteor strike, the first of our kind, the end of the ice (ten starred on his page; he chooses eight). Where one is not yet an event in the store, it is written as one, to Timeline-Stories.md, and checked as the batches were. A landmark shows on every line where it falls, at every level; the pile-up rule: in a crowded stretch only the most important shows, the rest appear as she zooms. Importance is `weight`.
2. **Before the Earth** (13.8 to 4.57 billion years) as one rung above the Earth, with first stars, galaxies and the Sun as its events, written and checked the same way. Built last.

## Deferred, by Michael's word

The descent on first visit; pictures in a More; the ten uncertain ages and the three `idea` kinds; textures, the atmosphere rim, the per-pixel globe; the Edge of Knowing story; a pinned zero for stories (superseded 9 Oct night: a story sets the measurer's ends instead, lane D).

## Open, for Michael, before the lanes that need them

- Period names: what happened ("Oxygen arrives") or what the Earth was like ("Black rock")? His list mixes both (lane B).
- Segment colours: Hazen's sequence, quiet, or none (lane B).
- With four or five levels open, stack the lines or show only two at a time (lane B).
- What the map shows before there is an Earth (lane E).
- The gallery picture and After the Ice's page (lane C).
- Whether the envelope is measurer enough, or markers of their own are wanted; collapse by itself or on press (lane D).
- The graph panel's words are in the spec's *Plots* now; what remains is Michael's reading of the built panel (lane E).
- Eight landmarks of the ten starred (lane F).
