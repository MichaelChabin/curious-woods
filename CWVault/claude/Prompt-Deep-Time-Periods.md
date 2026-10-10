---
status: Written 10 Oct 2026; batch 1 run the same day (Periods-Deep-01.md) and its lessons added under *Learned from batch 1*; batch 2 likewise (Periods-Deep-02.md, *Learned from batch 2*). First written for Michael, at the end of the plots chat, from the period tree agreed that day (Periods-Deep.md). Not yet run. Paste the line under *How to start* into a fresh Cowork chat in the CW project, once per batch.
role: The complete brief for writing the words for each deep-time period (what she reads when she taps one), in the event form. Stands on Prompt-Deep-Time-Events.md and changes only what a period changes.
---

# Prompt: the words for the deep-time periods

## How to start

Paste this into a fresh Cowork chat in the CW project, with the batch number:

> Read /Users/michaelchabin/_CW/CWVault/claude/Prompt-Deep-Time-Periods.md and follow it for batch 1. Save the result as claude/Periods-Deep-01.md.

## The prompt

> You are working with Michael on Curious Woods (CW), a place where a bright, curious ten-year-old explores ideas on her own terms. The Deep Time lab is one zoomable timeline, from the Earth's formation to now, made of nested lines. Each line is divided into periods. When she taps a period she gets a summary and a More, exactly as she does for an event. Your job in this chat is to write those words for one batch of periods, so well that a child who taps one feels she has stood in that world, and a geologist who taps one finds nothing to correct. These are drafts for Michael to read and edit; write them as if they were final.
>
> **Where the files are.** Everything lives on Michael's Mac under `/Users/michaelchabin/_CW/`. Ask for access to `CWVault` and `cw-deploys` there. A path written `claude/X` is `CWVault/claude/X`. Save your work into `CWVault/claude/`, and also to the project. Use web search for the research and the checking. If you can launch subagents, use them as the rounds say; if you cannot, do each round yourself as a separate pass and say so.
>
> **First, read these, in this order.**
>
> 1. `00-WHAT-CW-IS.md`, at the top of the vault.
> 2. `claude/Story-Voice.md`, the voice. E. B. White. Read it twice.
> 3. `claude/Rulings-Sept-2026.md`, its last two sections: deep lines count *ago* only.
> 4. `claude/Periods-Deep.md`, **the period tree**. It is the reason for this work. Read *The rule for names* closely: the names, read in a row, tell each line's story, and nothing makes us the point.
> 5. `20-SPECS/Spec-Deep-Time-Interface.md`, for how the timeline behaves. Where it disagrees with `Periods-Deep.md` on names or edges, `Periods-Deep.md` wins.
> 6. `claude/Prompt-Deep-Time-Events.md`. Its rules for clarity, its traps and its rounds all apply here, except where this page changes them.
> 7. `claude/Events-Deep-01.md` to `claude/Events-Deep-07.md`, the events already written and checked, and `claude/Plots-Deep-01.md`, the plots. They are the model for form, notes and the *Checked* line. Your words must agree with every event and plot that falls inside your periods; list them as you read.
>
> If the `cw-story` skill is listed, load it as well. Its refusals apply here in full.
>
> **The batches.** Thirty periods, in three batches, in tree order:
>
> - **Batch 1 (9):** the Earth's five (*Molten, Oceans, Oxygen, Big cells, Animals*) and the Animals line's four (*Soft bodies, Trilobites, Dinosaurs, Mammals*).
> - **Batch 2 (9):** the Trilobites line's six (*Shells* to *One continent*) and the Dinosaurs line's three (*First dinosaurs, Giants, Flowers*).
> - **Batch 3 (12):** the Mammals line's five (*Recovery* to *Ice*), the Ice line's three (*Lucy, Hand axes, Mammoths*), *The last ice age*, and its three (*Hippos in London, Ice sheets, After the ice*). *After the ice* already has a story (`claude/Story-After-the-Ice.md`); its period words must agree with it and send her to it.
>
> **What a period entry is.** The same three kinds of prose as an event.
>
> - The *label*: the name in `Periods-Deep.md`, exactly. If you think a name fails the read-aloud test, say so in the notes and keep it.
> - The *summary*: 20 to 40 words. It starts with what the period was like, not with an age ("The whole Earth was molten rock."), says plainly what was new in it, and ends with *More*.
> - The *More*: 250 to 350 words that stand alone. The span line goes first, references at the bottom (not counted), then notes for us.
>
> **The fields a period has:**
>
> - **Kind:** period.
> - **Span:** counted *ago*, from `Periods-Deep.md`: `4,600 to 4,000 Ma`. Say whether each edge is a dated boundary or a guess (all are now official boundaries, rounded; Animals moved from a guessed 700 to 720, the start of the Cryogenian, on 10 Oct).
> - **Length:** in plain words, as the line's label will show it: "600 million years".
> - **Official name:** the specialists' name and what it means, from `Periods-Deep.md`, checked: "Hadean, after Hades, the Greek underworld."
> - **Known from:** one line, as for an event: what this stretch of time is known from.
> - **Opens to:** the periods of the line below, if any, in order.
> - **Inside it:** the events and plot features that fall in the span, by label as they stand in the batch files.
> - **Index:** where it fits, what the index animal looks like here (the horse, the elephant line). Mainly batch 3; the sizes need checking.
> - **Pictures wanted:** one or two, with where they might come from and the licence to check.
>
> **The span line of the More** is one line in a code block, counting *ago*:
>
> ```
> From about 4.6 to 4 billion years ago.
> ```
>
> **What a period's More does that an event's does not.** An event is one moment and one place. A period is a world. So:
>
> - **Stand her in it.** Open with what she would see, hear or feel if she were there: the sky, the sea, the ground, what is alive. Make the scene from evidence, and say what it rests on in a clause. "The sky would have been orange" needs a source or a "probably".
> - **Say what is new**, the thing the name points at, plainly and early.
> - **Say how long it lasted**, in a form she can hold: against something she already has in CW, or against the line above ("almost a third of all the time there has been animals").
> - **Give the official name once**, near the end, as a fact: "Geologists call this stretch the Silurian, after the Silures, a people who lived in Wales when the Romans came." Never as something to learn.
> - **Point down, never at a lesson.** End on a fact, an image, or what is still unknown. A period that opens to a line below may end with what changes next, as a fact.
> - **Leave the events their stories.** Name an event in a clause and let her tap it. Don't retell it.
>
> **Clarity comes before everything.** Everything in *Prompt-Deep-Time-Events.md* under that heading holds. Short words, plain sentences, one idea at a time. Every *it* and *this* points at exactly one thing.
>
> **Traps for periods**, which the checkers will look for; look for them while writing:
>
> - **The world as one place.** A period lasted millions of years and covered the whole Earth. "There were forests" is true of somewhere; say where, or "in many places".
> - **Firsts.** "The first fish" is "the oldest fish found", as in the events. Dinosaurs did not begin at 252, and mammals did not begin at 66: the names mark who ruled, not who arrived. Say so in the More where it matters.
> - **Anything that makes us the point.** No "on the way to us", no "paving the way", no "and so, eventually, people". Mark Twain's oyster is the rule (`Periods-Deep.md`).
> - **Etymologies.** Check each official name's meaning against a good source (the International Commission on Stratigraphy, a dictionary of geology). Several are folk tales.
> - **Edges.** The official boundaries move: check each against the current International Chronostratigraphic Chart and say which version. Michael rounds; you round the same way.
> - **Million, billion, thousand.** A slip is a thousandfold. Write numbers out in the notes.
> - **Agreement.** A number in a period's More must match the same number in an event or plot inside it. Where they disagree, say which is right in the notes.
> - **References.** Primary or review papers that exist as cited, and one book a parent could find. Check each exists.
>
> **How the work goes.** Stop at the end of each round and wait for Michael.
>
> *Round 1, the plan.* Read everything above. For each period in the batch, tell Michael in a line or two the scene you would open on, what is new, and what events and plots fall inside it. Say which names you doubt. Michael adjusts.
>
> *Round 2, research.* If you can launch subagents, give each of three a share of the batch. Each returns, per period: the official edges checked against the current chart; the official name's meaning, checked; what the world was like (sky, sea, land, climate, life) with sources and how sure; the scene, with its place; how long it lasted against something she knows; and two or three references confirmed to exist.
>
> *Round 3, writing.* Write each period in the form above. Before handing a More over, read it once as her, and fix every sentence you had to read twice, every pronoun that could point at two things, every "first" that should be "oldest found", and every sentence that faces her instead of the subject. Count the words.
>
> *Round 4, checking.* Check every number, name, place, meaning and reference as someone who did not write them. If you can launch subagents, give each of three a share of the batch to fact-check independently with web search, reporting each claim as confirmed, change (with exact wording) or could not confirm, with a source. Give a fourth only the numbers: edges, lengths, ages, and agreement with the events and plots. Apply the changes, soften or cut what could not be confirmed, and tell Michael plainly what was wrong. Never say a fact was checked unless it was.
>
> **Learned from batch 1** (10 Oct, `claude/Periods-Deep-01.md`). Read that file before you start: it is the model for form, notes and the *Checked* line, and your periods must agree with their parents there (*Trilobites*, *Dinosaurs*, *Mammals*) and with its two new events (*Fern spike*, *Lystrosaurus*). Don't reopen these:
>
> - **The round 1 plan** is, per period: the *scene* (what the More opens on), what is new, and *Inside it*. Michael liked the scene step; keep it.
> - **Edges.** Michael rounds; a small gap from the chart is fine (Oceans stays at 4,000; the chart says 4,031). Animals now starts at 720. An event at an edge is listed under both periods. Edge events come in three kinds: a disaster that causes the edge (a landmark, told in its event; the old period ends on it in a clause, the new one opens on the aftermath, which may want an aftermath event of its own); an event that *is* the edge (it opens the new period); and an event that merely falls near one (it goes where it belongs). Flag them in round 1.
> - **Names mark who ruled, not who arrived.** There were no trilobites for nearly the first twenty million years of *Trilobites*, and no dinosaurs for nearly the first twenty of *Dinosaurs*. Say this kind of thing where it holds.
> - **Event wording wins.** Where an event's checkers settled a figure (Chengjiang about 250 kinds; the oldest trilobites about 520; *Tiktaalik* a fish with fins nearly like legs), copy it. A link must land on the same place and age as the sentence: batch 1 linked the Karijini iron to *Banded iron*, which is Lake Superior's.
> - **What the checkers caught**, so you catch it first: ferns make spores, not pollen; trilobites were not the commonest fossil at Chengjiang (*Kunmingella* was), so "among the commonest"; a reference that seemed to fit said the opposite (the 2017 trilobite eye had no lens), so open each one; rock colours written from memory were wrong; a model's result told as fact (say "might"); "the oldest large fossils there are", contradicted by another period; "nine in ten land animals" for what is nine in ten of the bones in one basin; a distance guessed ("nearly at the South Pole" was 650 km off); "burnt land" with no source.
> - **Length.** Fixes add words. Aim for about 320 in round 3 so round 4 has room.
> - **Batch 2 in particular.** *Shells* must agree with *Animals, kept* (its new summary is in the changes section of Periods-Deep-01), *Chengjiang* and *Burgess Shale*. *One continent* and *First dinosaurs* meet *The Great Dying* and *Lystrosaurus*. The period *Flowers* has the same label as the event *Flowers* (125 million): raise it with Michael in round 1, as Periods-Deep.md already does for *Coal* and *Forests* against *Coal forests*.
>
> **Learned from batch 2** (10 Oct, `claude/Periods-Deep-02.md`). Read it too, and Periods-Deep-01's *Mammals* period, your parent. Don't reopen these:
>
> - **Check the edges against the chart before round 1.** Two in batch 2 had drifted outside the current chart's error and were moved (485 to 487; 145 to 143, because the Cretaceous moved in v2024/12). Michael rounds, but not outside the error.
> - **Agree with the parent period as well as the events.** Batch 2 said trilobites were "at their most varied" in the Ordovician, while the parent said a little under 500 million. Read the parent's More before writing its children.
> - **Agree with the plots in figures, not just in name.** Copy the plot's own words for oxygen, sea level and day length; a figure from research that differs from the plot is a disagreement to raise, not a fact to use.
> - **Open an earlier event before reporting it wrong.** Round 2 said *Land egg* overreached; the event already said what the researcher feared.
> - **A new event near an edge** needs a dot clearly inside its period: *Big footprints* went to 200.95, not 201.0, against an edge rounded to 201.
> - **What the checkers caught**, so you catch it first: eyes listed among hard parts; "great reefs" for mounds built largely by microbes; "Old Latin" for medieval Latin; a stretch of years that fitted the start of the period but not the scene; "in the middle of Pangaea" for a coastal plain; "skeletons with a sail" for partial bones; "a few thousand years" where the paper said less than ten thousand; "nearly all there was" for nine in ten bones; eighty places from a press retelling where the paper says more than seventy; a quarry age that was only the oldest it could be; a scene put in Wales that is in England.
> - **Batch 3 in particular.** *Recovery* must agree with *Mammals* (Corral Bluffs) and *Fern spike*. The period *Grass* and the event *Grasslands* share a word (Periods-Deep.md, *Still open*): raise it in round 1. The Index field matters in this batch: the horse and the elephant line, with sizes to check. *Hippos in London* needs its own check (the Trafalgar Square bones). *After the ice* must agree with `claude/Story-After-the-Ice.md` and send her to it. The Ice line's periods are short, so check the 5 percent tap rule against their line.

> **Saving.** Save the batch as `claude/Periods-Deep-NN.md`, with a header like the event batches that says what was researched, written and checked, and by whom. Each period ends with its *Checked* line. Save it to the project as well.
>
> **Working with Michael.** He is the designer and author. Be concise and informal; humour is fine; no emojis; lists only when they shorten things. Ask rather than guess. Own mistakes plainly. One batch per chat.

## Notes for us

**What this does not cover.** The chunk tree in `cw-deploys/stories/deep-time.json` still has the old periods. Rebuilding it to `Periods-Deep.md` (names, edges, the new lines, the 700-million start of Animals) is a Claude Code job; write that brief once batch 1 has shown the periods read well. The four periods before Animals have no lines of their own yet; a later run can give them some.

**Cost.** About the size of an event batch each: the prose is the same length, and the research is broader but shallower.
