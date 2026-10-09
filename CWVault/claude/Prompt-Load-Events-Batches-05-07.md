---
status: Written 9 Oct 2026, for Michael to paste into Claude Code.
role: Loads batches 05, 06 and 07 into the Time Machine, retires the old records they replace, and removes the two records Michael cut. With these, every September event on the worklist is done.
---

# Prompt: load events batches 05 to 07 into the Time Machine

> Read `CWVault/00-WHAT-CW-IS.md`, then `CWVault/claude/Timeline-Stories.md` (the rulebook for events; read "The three kinds of prose", "Dates" and "What an event record holds"), then `CWVault/claude/Worknote-Time-Machine.md`, and the board entry for batch 4 (1 Oct), which is the last time this was done.
>
> **What is new in the vault (8–9 Oct 2026):** three files of events, written and fact-checked, each event with a `Replaces:` line naming the old September record or records it retires.
>
> - `CWVault/claude/Events-Batch-05.md`: 13 events, Anaxagoras to Gutenberg.
> - `CWVault/claude/Events-Batch-06.md`: 11 events, Galileo to Darwin.
> - `CWVault/claude/Events-Batch-07.md`: 12 events, Issun-bōshi to the first web page.
> - `CWVault/claude/Events-To-Upgrade.md` marks all of them done.
>
> **The job.**
>
> 1. Use the same converter as for batch 4. Make it read `Events-Batch-01.md` to `Events-Batch-07.md` plus `Timeline-Samples.md`, and rerun it.
> 2. Retire every old id named in a `Replaces:` line, with the same mechanism as batch 4 (the `SAME` map in `cw-deploys/active/time-machine.html`, or whatever replaced it). In batches 06 and 07 a line may name two ids separated by a comma (for example `` `tambora`, `lead-frank-4` ``); handle commas as well as "and". The ids to retire:
>    - batch 05 (13): `lead-socrates-4`, `socrates`, `paper`, `teoti`, `zero`, `baghdad`, `hawaii`, `alhazen`, `compass`, `chartres`, `fibonacci`, `aotearoa`, `gutenberg`
>    - batch 06 (13): `galileo`, `decimal`, `lead-frank-0`, `lead-frank-1`, `laki`, `lead-frank-2`, `tambora`, `lead-frank-4`, `frank`, `lead-frank-5`, `photo`, `faraday`, `darwin`
>    - batch 07 (12): `lead-starry-0`, `lead-starry-1`, `lead-starry-2`, `lead-starry-3`, `lead-montp-1`, `lead-starry-4`, `lead-montp-2`, `montp`, `lead-montp-0`, `lead-montp-3`, `curie`, `web`
> 3. Two old records were cut with no replacement. Remove them from the Time Machine too: `lead-socrates-2` (Heraclitus) and `lead-frank-3` (Aldini). If the first is already gone, say so.
> 4. One event is new and replaces nothing: *Issun-bōshi* in batch 07, whose line reads `Replaces: none (new record)`. Treat that as no ids.
> 5. Several events moved in date or place. Take the year, precision and place from the new record, never the old one. The ones that moved: *Socrates* (birth about 470 BCE to his trial, 399 BCE); *Teotihuacan* (200 to about 400 CE); *Ibn al-Haytham* (1020 to about 1030); *Compass* (1040 to about 1088); *Galileo's telescope* (1609 to 1610); *Decimal fractions* (Napier, Edinburgh, 1614, to Stevin, Leiden, 1585); *Galvani's frogs* (1780 to 1791); *First photograph* (1826 to 1827); *Impression, Sunrise* (Le Havre to Paris, 1874).
> 6. Leave `starry` alone: it links to the Starry Night story, which already hangs. And leave `jomon`: it is saved for deep time.
>
> **Things to check come through.** If the converter can't handle one, fix the converter, not the text.
>
> - Precision words with a note in brackets, e.g. `precision: decade (the Kanbun era, 1661–1673)` or `precision: exact (19 August 1839)`. The word before the bracket is the precision; the rest is for us.
> - A date line that says "about" on every step (*Issun-bōshi*, *Darwin's tree*).
> - Japanese and Icelandic letters and macrons: Issun-bōshi, Hawaiʻi, Móðuharðindin, 一寸法師 (that one is only in the references). Make sure the encoding survives.
> - Quotations: any line starting with `> ` in a More is a set-apart quotation (batch 05 has at least one) and renders as the `blockquote` style, as in batch 4.
> - Italic titles inside a More, e.g. *The Great Wave*, *Impression, soleil levant*.
> - What she sees: the label, the summary (ending in *More*), the stepped date line, the More and the references. What she does not see: "Pictures wanted", "Notes for us", the "Checked" paragraph, and the word counts in the headings.
>
> **Check, then stop.**
>
> - Open the Time Machine. Confirm the 36 new events appear with their short labels, that none of the 38 retired ids or the 2 cut ids still shows, and that the moved events sit at their new years.
> - Open four Mores and check them closely: *Issun-bōshi* (macron, "about" date line), *Lumière show* (the programme paragraph), *Laki* (Icelandic letters), *Montparnasse train* (it retires two ids).
> - Look at 1830 to 1900, which is now crowded (Daguerreotype, Paint tubes, Darwin's tree, Japanese prints, Impression, Sunrise, Galloping horse, Van Gogh in Arles, Eiffel Tower, two events in 1895, Radium). Tell me how the labels sit there and send a screenshot.
> - Run `tools/check-deploys.sh`.
> - Add a board entry for this load, as for batch 4.
> - Anything the files leave open, leave open and name it; do not invent.
>
> Stop and report before committing. After my yes, commit and push.
