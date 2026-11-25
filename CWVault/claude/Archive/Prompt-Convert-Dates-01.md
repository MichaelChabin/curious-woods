---
status: Ready to paste into Claude Code. Written 17 Nov 2026 by Claude in the daily-events chat, from Michael's ruling of the same day (Ruling-Dates-01.md). Not yet run.
role: The prompt that applies the dates ruling to everything already built: the store, the batch files, the Time Machine and the stories.
---

# Prompt: convert the dates

> Michael has ruled that Curious Woods stops writing dates as years "after the ice". Read `CWVault/00-BOARD.md`, then `CWVault/claude/Ruling-Dates-01.md` whole; it is the rule, and where it and an older page disagree, it wins. In short: a date she reads is the ordinary date, with BCE where it applies, followed by the years ago in parentheses, as in `1000 BCE (3,026 years ago)` or `About 6200 BCE (about 8,200 years ago)`. The parentheses go on the date line of a More, on a full story's subtitle, and on the date that opens a summary. Dates in running prose stay plain. The timeline keeps its name, *After the Ice*, and its starting point; only the count goes. Deep time is untouched.
>
> **First, survey and report; change nothing yet.** Find every place the count appears or is computed:
>
> - the stores: `cw-deploys/stories/timeline-events.json` (each event's `dateLine` holds `count`, `ordinary` and `ago`), and any other store with the same parts;
> - the builders: `tools/events-from-vault.py` and anything else that parses the three stepped lines out of a batch file;
> - the pages and scripts that draw a date: `cw-deploys/active/time-machine.html`, `cw-deploys/js/timeline.js`, `cw-deploys/js/cw-time.js`, `cw-deploys/experiments/time-lab.html`, `cw-deploys/template-story.html`, and the stories under `cw-deploys/active/` whose subtitle carries a count (Hokusai, Van Gogh, Vermeer, Necker, Have You Thought of a Story, Theophilus's World);
> - the vault: every `Events-Batch-NN.md` and `Events-Daily-*.md` date line, the story files under `claude/Story-*.md`, and the pages that state the old rule (`Timeline-Stories.md`, `Rulings-Sept-2026.md`, `Prompt-Pool.md`, `Prompt-Upgrade-Timeline-Events.md`, `00-WHAT-CW-IS.md`, `Spec-Timeline-Intro.md`).
>
> Leave `outdated-files/`, `Archive/`, the dated bench folders and anything already retired alone. Tell Michael how many places you found of each kind, and anything that looks like more than a change of wording, then wait for his word.
>
> **Then make the change.**
>
> 1. *The page works out the years ago.* The store keeps the year and whether it is "about"; the page computes the years ago from today's year when it draws the line, so the number never goes stale. For a BCE date, the BCE year plus this year; for a CE date, this year minus that one (the missing year 0 is ignored, as before). An exact date gets the exact sum. An "about" date gets a round figure with its own "about", rounded as roughly as the date is known: use the event's `precision` (decade, century, millennium) to choose the rounding, and show Michael the rule you chose with ten examples before applying it to all.
> 2. *One line, not three steps.* The date line of a More becomes a single line in the new form. Take out the stepping CSS. The summary panel opens with the same date and parentheses, written by the page, not stored in the summary text.
> 3. *The timeline's axis* is labelled in ordinary years, with years ago where there is room. No tick, tooltip or label says "after the ice" as a count. The name of the timeline stays.
> 4. *The store.* Drop `count` from each `dateLine`, or leave it unread; say which you did and why. Do not change any year.
> 5. *The builders.* `tools/events-from-vault.py` must read both the old three-line code block and the new one-line one, since the batch files will hold both until they are converted.
> 6. *The vault's batch files and stories.* Rewrite each date line and each story subtitle to the new form. In the batch files the date line stays in its code block, now one line. Where a summary begins with a date, add the parentheses there too; the summary's word count leaves them out. Change nothing else in any event: not a word of a More, a note or a Checked line. Follow the vault's rule for revised files as `CLAUDE.md` gives it.
> 7. *The rulebooks.* In each page that states the old rule, add one line at the head of the passage: "Superseded 17 Nov 2026 by Ruling-Dates-01.md." Do not rewrite the passages.
>
> **Check.** Open the Time Machine and read five events in place: one with an exact day, one plain year, one "about" CE date, one BCE date, and the oldest event in the store. Confirm each shows one date line in the new form and that the years ago is right for today's year. Open two stories and read their subtitles. Search the deployed pages for "after the ice" and list every remaining use; each should be the timeline's name and nothing else. Run the store check if there is one.
>
> Update the board and `MANIFEST.md` in the same commit. Report what changed, with the counts, the rounding rule, and anything you left alone and why. Commit and push only on Michael's word.
