---
status: Ruled by Michael, 17 Nov 2026, in the daily-events chat. His words: "I think we can stop using After the Ice dates. Use ordinary dates, BCE when that applies, and put the number of years ago in parentheses. After the ice was a well intentioned mistake and I'd still like to have kids develop a better sense of the past, but that was getting cumbersome." His four answers to the questions that followed are folded in below. Not yet applied to the store or the pages; Prompt-Convert-Dates-01.md is the prompt for Claude Code that applies it.
role: How a date is written in anything a child reads in Curious Woods. Where an older page disagrees, this one wins.
supersedes: Timeline-Stories.md, "Dates" (the after-the-ice count, the stepped date line); Rulings-Sept-2026.md, "Dates", where it speaks of the count; the date-line instructions in Prompt-Pool.md, Prompt-Upgrade-Timeline-Events.md and the nightly task.
---

# Ruling: dates

## The rule

A date is written the ordinary way, with BCE where that applies, and the number of years ago follows in parentheses.

```
29 May 1919 (107 years ago)
1377 (649 years ago)
1000 BCE (3,026 years ago)
About 6200 BCE (about 8,200 years ago)
Probably 1533 (about 490 years ago)
```

The count of years "after the ice" is retired. No date she reads is written that way any more.

## What stays

The 12,000-year timeline keeps its name, *After the Ice*, and its starting point, the ice letting go. Only the count goes. The timeline's axis is labelled in ordinary years and in years ago.

The hope behind the count stays too: that she comes to feel how far back a thing is. The years ago in parentheses now carries that, in a number she can check by adding.

Deep time is untouched. Its lines already count *ago* only.

## Where the parentheses go

In two places:

- **The date line of a More.** It is now one line, not three stepped ones. A full story's subtitle takes the same form.
- **The summary**, whose first words are the date.

Dates inside running prose stay plain: "In 1915 Albert Einstein…". A paragraph with three dates in it does not get three sets of brackets.

## How the number is worked out

- **A simple sum.** For a BCE date, the BCE year plus this year: 1000 BCE in 2026 is 3,026 years ago. For a CE date, this year minus that one. This ignores the missing year 0 (strictly, 1000 BCE is 3,025 years back), as the house has always done. She can check the sum herself, and nothing she can do on the timeline makes the one year show.
- **An exact date gets the exact sum.** 1919 (107 years ago).
- **An "about" date gets a round figure, with its own "about".** Round it as roughly as the date is known: about 6200 BCE (about 8,200 years ago); about 830 (about 1,200 years ago). "Probably 1533" is treated the same way.
- **The number goes stale every January.** So the store keeps the year, and the page works out the years ago when it draws the line. In the vault's batch files the figure is the one that was true in the year of writing.

## Two things I settled, for Michael to overrule

- **In the batch files the date line stays in its code block**, now one line long, so the build still finds it in the same place.
- **The summary's 20 to 40 words do not count the parentheses.** The page writes them, not the author, and counting them would push many good summaries over the limit.

## What this changes

- New events, from tonight: the nightly task and the weekly editor pass now read this page.
- Tonight's five (*Sobral eclipse*, *Ozone hole*, *Oranjemund wreck*, *Jikji*, *Dufuna canoe*) are rewritten in the new form as `Events-Daily-2026-11-16-03.md`.
- Everything already built: the 109 events in the store, the batch files, the Time Machine page and the stories that carry a count in a subtitle. That is Claude Code's work, by `Prompt-Convert-Dates-01.md`.
- The pages that state the old rule (Timeline-Stories, the Rulings, Prompt-Pool, What-CW-Is) each get a line pointing here, in the same Claude Code session.
