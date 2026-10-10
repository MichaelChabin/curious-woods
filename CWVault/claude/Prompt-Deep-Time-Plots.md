---
status: Written 9 Oct 2026, for Michael, at the end of the deep-time batch 5 chat, from his request that day ("when a user clicks on Oxygen, I want a summary of what this is and why it matters… with a More… the format is the same"). Not yet run. Paste the line under *How to start* into a fresh Cowork chat in the CW project. Michael's answers to Claude's questions (9 Oct) are folded in under *What Michael decided*.
role: The complete brief for writing the words for the Deep Time plots (oxygen, sea level, day length and the rest) in the event form, with a Data section for Claude Code, and for checking both the words and the data. Stands on Prompt-Deep-Time-Events.md and changes only what a plot changes.
---

# Prompt: the words and data for the Deep Time plots

## How to start

Paste this into a fresh Cowork chat in the CW project:

> Read /Users/michaelchabin/_CW/CWVault/claude/Prompt-Deep-Time-Plots.md and follow it. Save the result as claude/Plots-Deep-01.md.

## The prompt

> You are working with Michael on Curious Woods (CW), a place where a bright, curious ten-year-old explores ideas on her own terms. The Deep Time lab can draw quantities that change over time along its line: oxygen in the air, sea level, the length of a day, and others. When she taps one, she gets a summary and a More, exactly as she does for an event. Your job in this chat is to write those words for each plot, so well that a child who taps one comes away delighted and a scientist who taps one finds nothing to correct, and to check the data the plot draws. These are drafts for Michael to read and edit; write them as if they were final.
>
> **Where the files are.** Everything lives on Michael's Mac under `/Users/michaelchabin/_CW/`. Ask for access to `CWVault` and `cw-deploys` there. A path written `claude/X` is `CWVault/claude/X`. Read with that access, and save your work into `CWVault/claude/`. Use web search for the research and the checking. If you can launch subagents, use them as the rounds say; if you cannot, do each round yourself as a separate pass and say so.
>
> **First, read these, in this order.**
>
> 1. `00-WHAT-CW-IS.md`, at the top of the vault.
> 2. `claude/Story-Voice.md`, the voice. E. B. White. Read it twice.
> 3. `claude/Rulings-Sept-2026.md`, especially its last section, *Deep time*: deep lines count *ago* only.
> 4. `20-SPECS/Spec-Deep-Time-Interface.md`, the rulings of 8 Oct, and its section *Plots*. It is the reason for this work. It says plots behave like events; a plot shows only where it has data and fades outside it; a faint dashed line marks today's value; the copper handle reads the value wherever it sits; fuzz shows doubt; features of a plot point to events.
> 5. `claude/Prompt-Deep-Time-Events.md`, the brief for the deep-time events. Its rules for clarity, its traps and its rounds all apply here, except where this page changes them.
> 6. `claude/Events-Deep-01.md` to `claude/Events-Deep-05.md`, the events already written and checked. They are the model for the form, the notes, and the *Checked* line that ends each entry. Several touch the plots directly, and your words must agree with them: *Short days* and *Big thwack* (day length), *Oxygen in the air*, *Great freeze* and *Red rocks* (oxygen and minerals), *Oldest grains* (minerals), *Grey Earth* (continents), *Ice by turns*, *Antarctica freezes* and *Last glacial maximum* (sea level), *Homo sapiens* (people).
> 7. The data, in `cw-deploys/stories/curves/`: `oxygen.json`, `sea-level-ice-ages.json`, `sea-level.json`, `day-length.json`, `minerals.json`, `sun-and-inside.json`, `crust-and-land.json`, `people.json`. Each file says what it holds (`_about`), where it came from (`source`), how sure it is (`howSure`), its unit and scale, the phrase the read-out uses (`say`), and its points. Read every one whole.
>
> If the `cw-story` skill is listed, load it as well. Its refusals apply here in full.
>
> **What Michael decided (9 Oct).**
>
> - **Seven plots, in this order:** Oxygen, Sea level, Day length, Minerals, Sun and inside heat, Continents, People. (Continents is `crust-and-land.json`; the spec does not list it among the current plots, but it has data, and Michael wants it.)
> - **Sea level is one plot**, served by two files: `sea-level-ice-ages.json` for 3 million years to 20,000, and `sea-level.json` for the last 20,000 in more detail. One label, one More; the Data section says which file serves which span.
> - **People runs back to about 300,000 years.** `people.json` starts 12,000 years ago. Find published estimates for the older stretch, from genetics and archaeology, and give them as a wide band; the More says how shaky they are. The spec's rule is that the plot fades before 300,000 years rather than flatlining at zero.
> - **Check the data; do not change the files.** The JSON is made by a script in Michael's Claude Code project (`tools/curves-deep-time.py`), so a hand edit would be overwritten. Checkers test the key values against the sources. What needs changing goes in the Data section, worded so Claude Code can apply it in the script.
>
> **A gap the files leave, which you should fill the same way as People:** sea level stops at 3 million years, and the spec draws it over the whole bar. Look for a published long-term curve (for the last 540 million years, for example Haq and Schutter 2008, Miller and others 2005, or van der Meer and others 2022), and say how well the sources agree. If there is nothing honest before about 540 million years, say so: the plot simply fades there. Ask Michael before adding any other new data.
>
> **What a plot entry is.** The same three kinds of prose as an event.
>
> - The *label*: a word or two, three at most, that names the quantity (*Oxygen*, *Sea level*, *Day length*).
> - The *summary*: 20 to 40 words. It starts with what the line is, not with an age ("Oxygen in the air, from four billion years ago to now."), says plainly what the line does and why it matters, and ends with *More*.
> - The *More*: 250 to 350 words that stand alone. It says what the line measures, how anyone can know it for a time nobody saw, and why it matters to the rest of the bar. The span line goes first, references at the bottom (not counted), then the Data section, then notes for us.
>
> **The fields a plot has**, instead of an event's Age and Tail:
>
> - **Kind:** plot.
> - **Span:** where it has data, counted *ago*: `4,000 Ma to now`. If two files serve it, give both spans.
> - **Shines on:** the lines where it is worth showing, from the spec's table and the chunk tree (for example, "the whole Earth; best on The rusting of the world").
> - **Unit and scale:** the unit she reads, and whether the line is drawn on a linear or a log scale. A log scale needs one plain sentence in the More: each step up the side is ten times the last.
> - **Today:** today's value, for the dashed line, with its source.
> - **Known from:** one line, like an event's.
> - **Links:** the features of the line that should point to events, each with its age and the event's label as it stands in `Events-Deep-01` to `05` (for example, "the jump at about 2.4 billion years → *Oxygen in the air*"). Only events that exist; if a feature wants an event that does not exist yet, say so in the notes.
> - **Replaces:** the spec's row for it, by name.
>
> **The span line of the More** is one line in a code block, counting *ago*:
>
> ```
> From about 4 billion years ago to now.
> ```
>
> **The Data section** comes after the references, under the heading **Data**, as a list. It is written for Claude Code, so it is exact rather than graceful. For each plot:
>
> - **File(s):** the path in `cw-deploys`, and which span each serves.
> - **Series:** each series in the file (some have a `second`), its unit, its scale, and its `say` phrase as written.
> - **Points:** the form (`[year, value, low, high]`, where year is the store's astronomer's year, this year minus the age), how many, and the span they cover.
> - **The band:** what `low` and `high` mean in this file (a published bound, a reading off a figure's envelope, a judgment), so the build draws the fuzz honestly.
> - **Today:** the value for the dashed line.
> - **Fade:** the age beyond which the plot is not drawn.
> - **Links:** the same links as the field, given as store years and event labels.
> - **Checked values:** a short table of the key points (the few a child's eye will land on: today, the big jumps, the oldest point) with what the checkers found: confirmed, changed or could not confirm, with the source.
> - **Changes for Claude Code:** exact edits to make in the script, if any ("the oxygen point at 300 Ma should be 1.5, not 1.6, low 1.2, high 1.8; source…"). Write *none* when there are none.
> - **New data:** for People's older stretch and Sea level's deep stretch, the points themselves in the same `[year, value, low, high]` form, with source, licence and how sure, ready to go into the script.
>
> **Clarity comes before everything.** Everything in *Prompt-Deep-Time-Events.md* under that heading holds. Short words, plain sentences, one idea at a time. Every *it* and *this* points at exactly one thing.
>
> **The rules that matter most for plots:**
>
> - **She is looking at the line.** The More may say what the line does ("it stays near nothing for two billion years, then jumps"), as a fact, never as an instruction to look. Never "notice how", never "can you see".
> - **The line is the middle of a band, never a reading.** Where the band is wide, say so plainly and say why: that is the point (Michael, 6 Oct: "Uncertainty is a feature. We are conveying the need for more research").
> - **Say how we know, in a scene.** As with events, open where the evidence is: banded rock in Karijini, a coral core off Barbados, a grain of zircon, a census. A plot gathers many measurements; pick the one that shows how the rest were done.
> - **Agree with the events.** A number in a plot's More must match the same number in the event that tells it (17 hours at 2.46 billion; the jump in oxygen between 2.43 and 2.22 billion; 120 to 130 metres at the last glacial maximum). Where the curve and an event disagree, say which is right in the notes and put the fix in the Data section or the notes for the event.
> - **Why it matters, without a lesson.** Say what the quantity did to the world (oxygen let big bodies be; the day's length set the tides), never what she should take from it. End on a fact, an image, or what is still unknown.
> - **Guesses are welcome if the More explains them** (the spec). Say whose guess, and on what.
>
> **Traps for plots**, which the checkers will look for; look for them while writing:
>
> - **Log scales in words.** "A hundred-thousandth of today" and "a tenth of today" are both on the oxygen line, five steps apart. Check every ratio twice.
> - **Fractions of today against percent.** Oxygen is in the file as a fraction of today's (1 = 21 percent of the air). Never mix the two in a sentence.
> - **Store years against years ago.** `-2459997974` is 2.46 billion years ago. Convert every year in the Data section and check it against the age in words.
> - **Million, billion, thousand.** A slip is a thousandfold. Write numbers out in the notes.
> - **Curves read off figures.** Several files say "read from the figure". Treat each value as a reading, find the paper, and check the readings a child will see.
> - **The minerals' counts** are Hazen's of 2008 (about 4,400 kinds then known); the catalogue is about 6,000 now. Say which count, and from when.
> - **Model, not measurement.** Day length before 2.5 billion years, the inside's heat in the first stretch, the oldest oxygen: say "a model" or "a guess" where the file's own `howSure` does.
> - **Population before writing.** Estimates from genes are of the number of breeding ancestors, not the number of people alive. Never give one as the other.
> - **References.** Primary or review papers that exist as cited, and one book a parent could find. Check each exists. Batch 1's checkers caught a title written from memory that did not exist.
>
> **How the work goes.** Stop at the end of each round and wait for Michael.
>
> *Round 1, the plan.* Read everything above. Tell Michael in a few lines what each file holds, what it is missing, and any place where a curve and an event already disagree. Ask what you need to. Michael adjusts.
>
> *Round 2, research.* If you can launch subagents, give each of three a share of the plots. Each returns, per plot: the sources the file names, opened and read; the key values checked against them; the state of any argument; a scene where the evidence is, with its place; two or three references confirmed to exist; and, for People and Sea level, the new data with sources. If you cannot launch subagents, do this yourself as a pass before writing.
>
> *Round 3, writing.* Write each plot in the form above. Before handing a More over, read it once as her, and fix every sentence you had to read twice, every pronoun that could point at two things, and every sentence that faces her instead of the subject. Count the words.
>
> *Round 4, checking.* Check every number, name, place, quotation and reference as someone who did not write them. If you can launch subagents, give each of three a share of the plots to fact-check independently with web search, reporting each claim as confirmed, change (with exact wording) or could not confirm, with a source. Give a fourth only the numbers: units, log ratios, store years against ages, the Data section against the prose, and the plots against the events. If you cannot launch subagents, do it yourself as a separate pass after the writing is finished. Apply the changes, soften or cut what could not be confirmed, and tell Michael plainly what was wrong. Never say a fact was checked unless it was.
>
> **Saving.** Save the result as `claude/Plots-Deep-01.md`, with a header like the event batches that says what was researched, written and checked, and by whom. Each plot ends with its *Checked* line, as an event does. Then write a short prompt for Michael's Claude Code session, `claude/Prompt-Build-Plots-Deep-01.md`, that tells it to read the Data sections, apply the changes and new data in `tools/curves-deep-time.py`, and carry each plot's words into the store the way it carries events.
>
> **Working with Michael.** He is the designer and author. Be concise and informal; humour is fine; no emojis; lists only when they shorten things. Ask rather than guess. Own mistakes plainly.

## Notes for us

**What the files already are.** Claude Code built the curve files on 30 Sep and 7 Oct. Every one names its source and says how sure it is; several were read off published figures, not taken from tables, which is why the checking matters more than the finding. `people.json` came from Our World in Data and is the firmest; `oxygen.json` and `crust-and-land.json` are the shakiest, by their own account.

**What this does not cover.** The spec's longer table of candidate plots (temperature, carbon dioxide, kinds of sea animal, the Sun's brightness and the rest) is left for later. Each needs its data found, which is a bigger job; a second run of this prompt can take them, once these seven show what works.

**Cost.** Seven plots is smaller than an event batch in prose, but the checking is heavier: every curve has a dozen or more numbers, and two need new data. About the size of an event batch.
