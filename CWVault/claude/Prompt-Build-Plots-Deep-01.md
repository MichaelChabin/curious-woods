---
status: Written 9 Oct 2026, for Michael's Claude Code session, at the end of the chat that wrote claude/Plots-Deep-01.md. Not yet run. Paste the line under *How to start* into Claude Code in the cw-deploys project.
role: The build brief for the seven Deep Time plots: apply the data changes and new data in tools/curves-deep-time.py, and carry each plot's words into the store the way events are carried.
---

# Prompt: build the Deep Time plots, batch 1

## How to start

> Read /Users/michaelchabin/_CW/CWVault/claude/Prompt-Build-Plots-Deep-01.md and follow it.

## The prompt

> You are Michael's Claude Code session for Curious Woods. Read `CWVault/claude/Plots-Deep-01.md` whole. It holds seven plots (Oxygen, Sea level, Day length, Minerals, Sun and inside, Continents, People), each with a label, a summary, a More, references, a **Data** section written for you, notes, and a *Checked* line. Also read `20-SPECS/Spec-Deep-Time-Interface.md`, section *Plots*, for how a plot behaves.
>
> **1. The data.** Every curve file in `cw-deploys/stories/curves/` is made by `tools/curves-deep-time.py`, except `sea-level.json` and `people.json`, which were made earlier (30 Sep); find what made those, and if nothing did, bring them under the same script. Never hand-edit a JSON file; change the script and regenerate.
>
> - Apply each plot's **Changes for Claude Code** exactly. Each change names a store year (this year minus the age, 2026 as the base) and the age it stands for; check that the two agree before you apply it, and stop and say so if they do not.
> - Add each plot's **New data**: the deep sea level, 540 Ma to 3 Ma (suggested file `sea-level-deep.json`), and People from 315,000 to 15,000 years ago (into `people.json`, ahead of its present points). Carry each block's source, licence and how-sure into the file's `source` and `howSure`.
> - Update each file's `source` and `howSure` text where the Data section says to (the day-length citation, the minerals counts, the continents citations, the inside-heat sources).
> - Give `people.json` a `scale` ("log") and a `say` ("about {v} people"), and a band (`[year, value, low, high]`) as its Data section describes. Give `sea-level.json` its band the same way.
> - The sea-level plot is one plot served by three files: deep (540 to 3 Ma), ice ages (3 Ma to 20,000 years), Lambeck (20,000 years to now). Draw it as one line. Also replace the ice-ages file's points younger than 20,000 years with Lambeck's, so the map's sea agrees with the plot and reads 0 today.
>
> **2. The fades and today's line.** Each Data section gives the **Fade** (the age beyond which the plot is not drawn) and **Today** (the value for the faint dashed line). Use them. Minerals' read-out at today should say "about 4,300 kinds known in 2008".
>
> **3. The words.** Carry each plot into the store the way `tools/events-from-vault.py` carries events: label, summary, More (with its span line), references, kind `plot`, span, unit and scale, today, known-from, and the links. A plot is tapped like an event: the summary, then More.
>
> **4. The links.** Each Data section lists **Links** as store years and event labels. Make each a feature of the line that points to that event, as the spec says. Check that every label exists in the store; if one does not, leave it out and list it.
>
> **5. Check.** After regenerating, print for each plot the value, low and high at every store year named in its Changes, New data and Links, and compare with the Data section. Then open `active/deep-time.html` and look at each plot on its best line (its **Shines on** field). Report what you changed, what you could not, and anything that looks wrong on screen.
>
> **One event to fix, separately:** *Antarctica freezes* (`claude/Events-Deep-05.md`) says the sea fell "about seventy metres"; it should say "about 55 to 70 metres". Change it in the vault file and the store only if Michael agrees.
>
> **Working with Michael.** Concise and informal; no emojis; ask rather than guess. Commit only when he asks.
