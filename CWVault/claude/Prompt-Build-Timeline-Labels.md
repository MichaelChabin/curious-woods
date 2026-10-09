---
status: Superseded 9 Oct 2026, night. Written in a second chat against `active/deep-time.html`, which that evening folded into `active/time-machine.html`; restated against the page as it is, with Claude's thoughts folded in, as lane D of `Prompt-Build-One-Timeline.md`. Kept as the source. The ruling it carries (no 0 at the left edge; two ends measure; a story sets them) is recorded in Rulings-Sept-2026.md, *The one timeline* 4, amended.
---

---
status: Written 9 Oct 2026, for Michael's Claude Code session, from his design in the plots chat that day. Not yet run. Paste the line under *How to start* into Claude Code in the cw-deploys project.
role: The build brief for three changes to the one timeline: how lines are labelled, two markers that measure a stretch, and collapsing the stack. Amends Spec-Deep-Time-Interface.md (8 Oct) and the ruling of 9 Oct on where zero sits.
---

# Prompt: timeline labels, two markers, and collapsing

## How to start

> Read /Users/michaelchabin/_CW/CWVault/claude/Prompt-Build-Timeline-Labels.md and follow it.

## The prompt

> You are Michael's Claude Code session for Curious Woods. This changes the one timeline on `active/deep-time.html` (and whatever in `js/` draws its lines). Read `CWVault/20-SPECS/Spec-Deep-Time-Interface.md` first; where this page disagrees with it, this page wins. Ask Michael before guessing, and show him each step on screen before going on.
>
> **What changes in the rulings.** Michael, 9 Oct: a line's left edge no longer reads 0. Lines count *ago* only. The question "how long did it take?" is answered by two markers instead (step 2). They also replace the spec's "a story can pin zero to an event": a story sets the two markers instead.
>
> **1. Labels.**
>
> - Every line has one label, centred just above it, with a line drawn out to both ends of the line it names, like a measurement on a drafting drawing:
>
>   `|———— The dinosaurs, 186 million years ————|`
>
> - The label is the period's name and its length. When the highlight on the line above snaps to a named period, the line below gets that name. When the highlight is free, the line below has no name, only its length, with "about": `|——— about 340 million years ———|`.
> - **The top line** reads `|——— The Earth, 4.6 billion years ———|` and has no dates at either end. Its length and its age are the same, since it runs to now.
> - **Every other line** keeps two dates, in years ago: the start at the left end of the line and the end at the right end (for the dinosaurs, "252 million years ago" and "66 million years ago"). The label says how long; the dates say when.
> - No title to the left of a line, and no period label in the funnel: the centred label replaces both.
> - Numbers count *ago*, in billions, millions and thousands of years, as the rulings say. Round lengths to two or three figures (186 million, 4.6 billion).
> - If a label is wider than its line, keep it centred, but don't let it run off the screen.
>
> **2. Two markers.** She can put two markers on any line and read the length of time between them, shown the same way as a label, between the markers: `|—— 1.2 million years ——|`. Check first whether anything like this exists already. If not, propose the gesture to Michael before building it (a tap to set each marker, and a drag to move one, would be the obvious one). A story can open the timeline with the two markers already set: at the asteroid and the first full forest, say.
>
> **3. Collapsing.**
>
> - When more than two lines are showing, the word **Collapse** appears at the right of the screen.
> - Pressing it collapses every line except the bottom one. A collapsed line loses its events and its plots, and slides up into a compact stack. The funnels shrink with it. Each collapsed line keeps its highlighted period or region, its period names (Animals, and the rest), and its label.
> - **The top line** keeps everything except its events, including its highlight.
> - Each collapsed line gets the word **Show** at its right. Pressing it brings that line back down as it was, with its events.
> - Clicking a period on a collapsed line goes to that period: that line opens again, with the period highlighted, and the lines below it are replaced by the new one. (Claude's suggestion, to keep "Show" and a click different; Michael to confirm on screen.)
> - While the stack is collapsed, **Collapse** becomes **Show all**. (Also Claude's suggestion.)
> - A finger has to be able to hit a period on a collapsed strip, so keep a strip about 44 points high. If the labels above the strips make the stack too tall, try a smaller label set in line with the strip instead, and show Michael both.
> - Ask Michael whether the line above should collapse by itself when she goes one level deeper, or only when she presses Collapse. Build the second until he says.
>
> **4. Check on the iPad.** With a date at each end, check that no period on any line is narrower than the 5 percent tap rule allows, in both orientations. Report any that are.
>
> **Afterwards.** List what you built, what you left for Michael, and anything in the spec this page made wrong, so the spec can be updated. Concise and informal; no emojis; commit only when he asks.
