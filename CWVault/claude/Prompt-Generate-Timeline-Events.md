---
status: DRAFT 30 Sept 2026, for Michael's approval. Not yet run.
role: The prompt that generates timeline events in quantity, in batches, to the standard of Timeline-Stories.md and the two samples in Timeline-Samples.md.
how to use: Paste the prompt below into a fresh chat in the CW project, filling the two blanks. One batch per chat. Each batch runs in three rounds, and Michael answers between rounds.
---

# Generating timeline events

## The prompt

> You are writing events for the Curious Woods timelines. An event is something that can be placed on a timeline and a map. Each one has a label, a summary, and a More: a short story that a curious ten-year-old finds by tapping.
>
> Read these first, in this order, with the Projects tool: `claude/What-CW-Is.md`, `claude/Story-Voice.md`, `claude/Timeline-Stories.md`, `claude/Timeline-Samples.md`. Timeline-Stories.md is the rulebook for events. The two samples are the model; Michael rewrote both himself. Where anything you know about writing for children disagrees with them, they win.
>
> **This batch:** ______ (a stretch of time, a part of the world, or a theme; for example "2000 BCE to 500 BCE, outside Europe", or "the sky: comets, eclipses, meteorites").
>
> **Events already written, not to repeat:** ______ (paste the labels, or name the file).
>
> Work in three rounds. Stop at the end of each round and wait for Michael.
>
> **Round 1: candidates.** Propose twenty events, one line each: label, date, place, kind, and one sentence on why it earns a place. An event earns a place if it would make a bright ten-year-old say "really?", or if she could meet it again somewhere else in Curious Woods. A fact that is merely true does not earn a place. Across the twenty, spread the dates, the parts of the world, and the kinds (a sky event, an earth event, a crop or animal, a craft or invention, an object, a place, a person, a text). Leave room for what our stories don't reach on their own: a law, a banned book, an argument, a piece of music, someone who was wrong for three hundred years. Say which candidates you are least sure of, and why. Michael crosses out, adds, and picks about ten.
>
> **Round 2: writing.** For each event Michael kept, write the full record in the form of the samples:
>
> - **Label.** A few words that name the thing, unique if possible.
> - **Year, precision, kind, place.** The year as an astronomers' year (negative for BCE); precision one of exact, year, decade, century, millennium; the place with its latitude and longitude, and a note if the exact spot is unknown.
> - **Summary.** 20 to 40 words, starting with the date as a plain year, ending with *More*. It says plainly what happened.
> - **More.** 250 to 350 words. The stepped date line first (after the ice / the ordinary date / years ago). Then the story, written by the rules in Timeline-Stories.md, "How a More is written".
> - **Pictures wanted.** What would serve as evidence, not decoration.
> - **References.** Three to five real sources, each with what it was used for. Primary sources and serious books or papers; never an education site.
> - **Notes for us.** The beat in one line, and one check per claim that could be challenged, saying where the fact came from and how sure it is.
>
> Before you hand a More over, read it once as her. Check each of these, and fix what fails:
>
> 1. Every name and idea the story leans on is explained where it first appears. Nothing else is explained.
> 2. Every *it*, *they*, *this* and *that* points at one thing. Where it might not, say the noun again.
> 3. There are one or two short turning paragraphs: a question the next part answers, or a line that sums up.
> 4. "Someone," not "somebody."
> 5. One argument at a time. Cut any side story that competes with it.
> 6. Nothing is claimed about this moment that nobody recorded. Say it of the thing in general instead.
> 7. No mechanism is half-explained. Explain it plainly or leave it out.
> 8. A war says what happened, what it cost in lives, money and effort (or that nobody recorded the cost), and what changed. It is never told as an adventure.
> 9. Religious words are fine; taking sides is not, and no religious text alone counts as evidence. No calendar events for now.
> 10. "Nobody knows" appears wherever it is true, and each guess says whose guess it is.
> 11. It ends on a fact, an image, or what is still to be found. Never on a lesson.
> 12. Nothing tells her something is interesting, amazing or important, and nothing would look at home in a lesson plan.
>
> **Round 3: checking.** Go back through every event as a fact-checker who did not write it. Search for each date, number and name. Mark each claim *confirmed*, *changed* (say what to), or *could not confirm*. Soften or cut anything you could not confirm. Then give Michael a short list of what changed.
>
> When Michael approves the batch, save it to the project as `claude/Events-Batch-<number>.md`, and add its labels to the list of events already written.

## Notes for us

**Why three rounds.** Crossing out a line costs Michael nothing; crossing out three hundred finished words wastes his time. The checking round is separate because a writer checking its own work misses things.

**Batch size.** Twenty candidates to about ten events keeps each chat short enough to read closely. Fifteen batches make about 150 events, which is the size suggested for adult testers.

**Where the events go.** Batches are markdown in the project, for reading. Turning them into the bench's own events file is a Claude Code job, per Spec-Maps.md: never straight into `stories/world-events.json`. That conversion wants its own short prompt when the first batch is approved.

**Not yet decided.** Weight: the map needs each event's weight to decide what shows at each zoom. It is editorial, so the prompt does not guess it; Michael, or a later pass, sets it. Pictures: found and licensed later, in one pass for all batches.
