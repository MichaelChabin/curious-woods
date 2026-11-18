---
status: DRAFT of Michael's prompt for step 8 of the Time lab bench, 17 Nov 2026, from the "time lab review" chat, after step 7 went live (94319125). For Michael to read and change before it goes to Claude Code.
role: A small step. Ga in place of Ba; the text block made shorter by making it wider; the dates ruling of 17 Nov applied to the lab; the timeline in sight on the first screen; four small repairs.
related: Report-Time-Lab-Bench-07.md (the page as it stands), Ruling-Dates-01.md, Rulings-Sept-2026.md (the abbreviations ruling of 18 Oct), Lab-Time.md
updated: 2026-11-17
---

*Saved as it arrived in Claude Code, 17 Nov 2026. Run the same day; the report is Report-Time-Lab-Bench-08.md.*

# The Time lab bench, step 8: Ga, a shorter text block, and small repairs

`cw-deploys/experiments/time-lab.html`, and three texts named below. Read Report-Time-Lab-Bench-07.md first.

## Ga, not Ba

Michael's word, 17 Nov 2026, on the contradiction step 7 reported: **Ga**. The ruling of 18 Oct in Rulings-Sept-2026 stands (*Ma*, *Ga*, *km*; never an invented form). Step 5's *Ba* is withdrawn.

- Every *Ba* the page writes becomes *Ga*: the flags, the handle, the period area's first line, the event line, the ends of the mosaic's rows.
- Append one dated line to Rulings-Sept-2026.md and to 00-DECISIONS.md saying so. Amend; do not replace.
- Report every place you changed, and any *Ba* left in a document that is still current.

## The text block: wider, so it can be shorter

Step 7's block is 174 px tall at 1,024 and 246 px at iPad size. Trimming the longest texts will not cure that: the store's summaries cluster between 35 and 40 words, so the next one sets the height. The columns are the trouble. Each is about half the mosaic's width, and a 40-word summary runs to seven lines in it.

- The two areas together span the full width of the mosaic and the timeline, left edge to right edge. The period area keeps its place on the left edge.
- Give the event area the larger share. Period descriptions run to 30 words; event summaries to 40.
- At iPad size, if two columns still make the block taller than about 120 px, stack them (period above, event below) only if that is shorter. Say which you chose.
- The block's fixed height is then whatever holds the longest text at the new widths. Give the old and new heights in the report.
- Nothing below the block may change place as the text changes. That rule stays.

**Limits, from here on:** a period description is 30 words at most; an event summary is 40 at most, not counting its date. Two texts are over, and one is trimmed at Michael's word. Put these in, and change nothing else in the store:

| Where | New text |
|---|---|
| `jomon`, summary (was 50 words) | About 10000 BCE. The Jōmon people of Japan were making pottery before the ice let go, some of the oldest pots anywhere. History does not begin at the left edge of this line. |
| `big-footprints`, summary (was 41) | About 201 million years ago. Just after the dying that ended the Triassic, big meat-eating dinosaurs left thousands of footprints on lake shores in what is now Connecticut. Before it, the meat-eaters there were smaller. |
| *Farms*, the plaque in `PERIODS_12` (was 30) | The ice is gone and the world is warming. People who followed the herds begin to keep plants and animals, and villages grow up around the fields. |

`jomon` and `big-footprints` are in `stories/deep-time-events.json`, which other pages read; their source files in CWVault (named in each event's `source`) get the same change, so the next load does not undo it.

## Dates, under the ruling of 17 Nov

Read Ruling-Dates-01.md. On the spans inside the last 12,000 years:

- The event area's first line reads as the ruling says: the ordinary date, then the years ago in parentheses. *1831 (195 years ago) · Faraday's ring*. *About 3300 BCE (about 5,300 years ago) · Writing at Uruk*.
- **The flags and the handle write calendar years**, as step 5 ruled. On *Civilization* the left flag now reads *12 ka* while the text beside it reads *10,000 BCE*. The flag is wrong.
- *ka* is for 12,000 years to a million only.

If Prompt-Convert-Dates-01.md has already changed the store's own date lines, use what it left; do not convert twice.

## The timeline in sight on arrival

At 1,024 × 768 the *4.6 billion* mosaic's five rows push the timeline off the bottom, so she arrives seeing no events. On that span only, make the Small Earth smaller, as far as it takes for the timeline and its labels to show without scrolling. Give the size you ended with. If the Earth would fall under about 120 px across, stop there and say how much of the timeline still hides.

## Four small repairs

1. ***Sound OK? yes · no*** moves out of the row where *select* and *back* stand. Put it at the foot of the left column, under *Select years*, until she answers.
2. ***years from the start*** shows only on *4.6 billion* and *Complex life*. From *Humans* down, hide the word and count in the ordinary way. If she had it on and moves to a recent span, it comes back on when she returns.
3. The same word wraps to two lines in the menu. Shorten it to *from the start*, turning to *years ago*.
4. ***How this works*** still says that pointing tells what was going on. Put this in its place, as a draft for Michael to change: *Tap a period on the mosaic and its story appears above. Tap* select *to open it on the line below.*

## Not in this step

The 13.8 billion years before the Sun and the thread; place marks on the Earth; *play* and trips; the graphs; the probe; *Cut open*; the front door; the stories' Worlds; the swap.

## Check, then stop

On the Mac at 1,024 × 768 and at iPad size (768 × 1,024): *Ga* on every label of the *4.6 billion*; the text block's height with the longest period and the longest summary showing together; an event's date line on *Civilization*, *Machines* and *Complex life*; both flags on *Civilization*; the first screen, with the timeline in sight; the sound question answered and gone; *from the start* on, then a move to *Humans* and back.

Pictures in `CWVault/claude/Time-Lab-Bench-08-Nov17/`; the report in `CWVault/claude/Report-Time-Lab-Bench-08.md`, with what needs Michael's eye.

Stop and report. Don't commit.
