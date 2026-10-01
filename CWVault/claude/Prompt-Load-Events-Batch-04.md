---
status: Written 1 Oct 2026, for Michael to paste into Claude Code.
role: Loads batch 04 into the Time Machine, retires the old records it replaces, and picks up the shorter labels in batches 01 to 03.
---

# Prompt: load events batch 04 into the Time Machine

> Read `CWVault/00-WHAT-CW-IS.md`, then `CWVault/claude/Timeline-Stories.md` (the rulebook for events; read "The three kinds of prose", "Dates" and "What an event record holds"), then `CWVault/claude/Worknote-Time-Machine.md`.
>
> **What changed in the vault today (1 Oct 2026):**
>
> 1. A new file, `CWVault/claude/Events-Batch-04.md`: fifteen events, Stonehenge to Aeschylus, written and fact-checked. Each one has a `Replaces:` line naming the old September record or records it retires. One event, *Nineveh's library*, replaces two old ids (`nineveh` and `lead-nineveh-4`).
> 2. The labels in `Events-Batch-01.md`, `Events-Batch-02.md` and `Events-Batch-03.md` were shortened to a word or two (for example *Ötzi*, *Pompeii*, *Krakatoa*, *Figs*). Nothing else in those files changed except one sentence added to each header.
> 3. `Events-To-Upgrade.md` marks the fifteen old records as done (batch 04).
>
> **The job.**
>
> 1. Find the converter that turns the vault's event files (the `Events-Batch-NN.md` files and `Timeline-Samples.md`) into the Time Machine's event data, and the data file it writes. Tell me their names before changing anything if you are unsure which they are.
> 2. Make sure the converter reads all four batch files, `Events-Batch-01.md` to `Events-Batch-04.md` (batches 02 and 03 may not have been added yet either), plus `Timeline-Samples.md`. Rerun it, so the shorter labels in batches 01 to 03 come through too. Batches 01 and 02 are new events and have no `Replaces:` line; that is expected.
> 3. Retire every old id named in a `Replaces:` line, using the Time Machine's existing mechanism for this (the `SAME` map in `cw-deploys/active/time-machine.html`, or whatever replaced it). The fifteen batch-04 events retire sixteen old ids: `stonehenge`, `enhed`, `alphabet`, `oracle`, `iron`, `olmec`, `lead-nineveh-0`, `lead-nineveh-1`, `lead-nineveh-3`, `nineveh`, `lead-nineveh-4`, `coins`, `lead-socrates-0`, `lead-socrates-1`, `confucius`, `lead-socrates-3`. The `Replaces:` line may name more than one id, separated by "and"; handle that.
> 4. Note that `iron` has moved: the old record was Hattusa, about 1200 BCE; the new one is Tell Hammeh in the Jordan Valley, about 900 BCE. Take the year and place from the new record, not the old one.
>
> **Things in batch 04 the converter may not have met before.** Check each one comes through correctly; if the converter can't handle one, fix the converter, not the text.
>
> - **Quotations.** Four Mores (*Enheduanna*, *Greek alphabet*, *Assyrian eclipse*, *Confucius*) contain lines starting with `> `. These are set-apart quotations and should render as the `blockquote` style in `css/story.css`, not as plain text with a `>` in front.
> - **Pronunciations in quotation marks inside brackets**, e.g. Pythagoras ("pih-THAG-or-us"), and the Chinese characters 卜 and 册 in *Oracle bones*. Make sure the encoding survives.
> - **Place lines with extra words**, e.g. "Athens, Greece; the Pnyx marks it (37.97 N, 23.72 E), though the assembly may have met in the Agora at first". Take the coordinates from the brackets; everything else is for us.
> - **Fractional astronomers' years for exact dates**, e.g. `−762.55` for 15 June 763 BCE, written with a true minus sign (−), not a hyphen.
> - **Precision words** used in this batch: `century`, `decade`, `year`, `exact`.
> - **What the child sees and what she doesn't.** She sees the label, the summary (ending in *More*), the stepped date line, the More, and the references. She does NOT see "Pictures wanted", "Notes for us", or the "Checked" paragraph. The word counts in the headings ("Summary (36 words)") are for us too.
>
> **Check, then stop.**
>
> - Open the Time Machine and confirm that the fifteen new events appear with their short labels, that none of the sixteen retired ids still shows, and that the batch 01 to 03 events show their new short labels.
> - Look at Detail with the Focus window wide open, where labels crowd. Tell me whether the shorter labels have made the crowding better, and send me a screenshot.
> - Open three Mores, *Enheduanna*, *Oracle bones* and *Pythagoras*, and check the quotations, the characters and the stepped date lines.
> - Run `tools/check-deploys.sh`.
> - Anything the files leave open, leave open and name it; do not invent.
>
> Stop and report before committing. After my yes, commit and push.
