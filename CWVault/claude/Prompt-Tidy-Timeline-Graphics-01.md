---
status: Michael's prompt of 19 Oct 2026, answering `claude/Audit-Timeline-Graphics-Oct19.md`; saved to disk by the session that ran it. The rulings are recorded in Rulings-Sept-2026 (*Timeline graphics, 19 Oct 2026*) and 00-DECISIONS.
role: The rulings on the audit's open questions and the go-ahead for the tidying steps 1 to 3.
---

# Timeline graphics: rulings and go-ahead

Thank you for the audit. It is clear and convincing, and its order of work stands. Below are my answers to the questions it left open, then what to do now.

## Rulings

1. **One copper.** Use the copper of the current-year marker (`#b5652b`) everywhere copper appears. For the two vermilions, pick the map's (`#c84830`) and show me both side by side; I'll confirm.
2. **Dead code.** The China and Egypt viewings and their chooser, Both, Climate and the climate wash, the seven-copies argument, the hidden reset word and left bar, the `#model` paragraph: delete them. They were stories, not timeline tools. Fix the page's header comment to match.
3. **Ice.** No ice outline held unchanged for 2.6 million years. The ice fades in and out with the glaciations, where they matter: the ice-age cycles of the last 2.6 million years (driven by a published curve, cited), and the great deep-time glaciations (around 2,400 million years ago, around 720 to 635 million, and the later ones). Deep-time ice is drawn as a soft, semi-transparent overlay with feathered edges, over land and sea alike. Never a sharp line, and bare land never shows on top of ice. (See the attached screenshot of 2.4 billion years: hard white bands, and land drawn over them. That is what to fix.) The soft edge is also the honest one: we know there was ice, not exactly where.
4. **The look of the land in deep time.** The flat brown grain goes. The rule, by age:
   - Before about 2,400 million years (little oxygen): dark grey to near-black crust, with texture.
   - From then until plants, about 450 million years ago: bare rock. Grey and tan, rusty in places, textured, no green anywhere.
   - After plants: green spreads, until today's picture takes over. Each change is a gradual blend, not a switch. The invented continents (audit §8) follow the first rule and come later, as planned.
5. **The bracket**, which replaces the Focus window, the envelope and the two markers. One tool:
   - Two markers that look like the current-year marker, standing at either end of a stretch of time, joined by a bar.
   - The earlier date sits outside, to the left of the left marker; the later date outside, to the right of the right marker. Near the edge of the timeline, a date that would fall off flips inside.
   - The span (the number of years between them) is centred on the bar, in a gap. When the markers come too close, it hops above the bar.
   - Whichever marker she last touched is the current year, and the map shows it. The current one is solid copper; the other is an outline in copper. Tapping the outline makes it current. When she lets go, the map stays at that year.
   - Tapping the bar opens the stretch as a new, expanded line below. Dragging the bar slides the whole bracket, span unchanged.
   - Play makes the left marker walk toward the right one, the map following, and stops when it arrives.
   - A bracket opens a new line only if the stretch has something in it (events, periods, a curve). Otherwise the tap does nothing, so the nesting ends where the content ends.

   This is the same thing as the Focus window, so the term Focus window is retired. Please tell me whether the bracket really can absorb the Focus window and the envelope with nothing lost, before it is built.
6. **The grid.** Off. Spec-Maps rules out a graticule and a frame; the globe follows the map.

## What to do now

Do the tidying steps, 1 to 3 of the audit's order of work, with the rulings above:

1. One style file, with the copper settled and the two vermilions shown to me.
2. One owner of the year, and one curve-reading function.
3. Delete the dead code listed in ruling 2.

Nothing a child can see should change except the colour shade. Stop after step 3 and report: what changed, what you checked, and anything that surprised you. Then we'll go on to the bugs.

Before you start, please take a baseline in Safari on the iPad (or tell me how to take one for you): how the globe and the flat deep map behave during play today. Step 4 will need it.

*(The screenshot of 2.4 billion years named in ruling 3 did not arrive with the prompt. The hard bands and the land over them are in the code: the polar caps are bands of latitude filled at 80 % and clipped to the land, and the dissolving pieces and the cities are drawn after them.)*
