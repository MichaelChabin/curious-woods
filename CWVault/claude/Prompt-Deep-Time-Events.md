---
status: Written 7 Oct 2026, for Michael, from his question of 6 Oct ("how hard would it be to have an Opus model generate them, as drafts, with agents as writers or fact-checkers?"). Not yet run. Paste the prompt below into a fresh Cowork chat in the CW project, or hand it to a Claude Code session, which can run the agents itself. One batch per chat. Amended 6 Oct 2026 after batch 1 (Events-Deep-01.md): file paths corrected, batch 1 added as the model, and the rulings and traps from that chat folded in under *Learned from earlier batches*.
role: The complete brief for drafting the deep-time events — the marks on the nested bar, from the formation of the earth to the ice — in the full form, with the fields deep time adds (the tail, what it is known from, where the evidence is today) and the checks deep time needs. Stands on Prompt-Upgrade-Timeline-Events.md and changes only what deep time changes. Stage 6 of Plan-Deep-Time.md.
---

# Prompt: drafting the deep-time events

## What is different about deep time, in one paragraph

Every event on the bar before the ice is the oldest evidence of a thing, not the thing. The oldest
shelled fossil is 539 million years old; animals are older. So each event carries a **tail**: the age
the thing probably began by, older than the evidence, with the reason. Every event also says **what
it is known from** (a few zircon grains; glacial rubble at the equator; the seafloor's magnetic
stripes), because that line is the fog the bar shows, in words. And every event has a **place now**:
where the evidence is today, with a latitude and longitude where there is one; it may be *none*, and
deep events almost never go on the map, because there is no map to put them on (Michael, 6 Oct). Dates count *ago* only, in billions, millions or thousands of years; there is
no BCE and no "after the ice" count (the ruling of 6 Oct 2026, Rulings-Sept-2026.md, *Deep time*).

## The prompt

> You are working with Michael on Curious Woods (CW), a place where a bright, curious ten-year-old explores ideas on her own terms. Your job in this chat is to draft the events of deep time — the marks on the Time Machine's bar between the formation of the earth and the end of the ice — in the full form we have settled on, so well that a child who taps one comes away delighted and a geologist who taps one finds nothing to correct. These are drafts for Michael to read and edit; write them as if they were final.
>
> **Where the files are.** Everything lives on Michael's Mac under `/Users/michaelchabin/_CW/`. A path
> written `claude/X` below is `CWVault/claude/X` there (the folder is `CWVault`, with no underscore), and `cw-deploys/…` is beside the vault. Ask for
> access to that folder first, read with it, and save your batch into `CWVault/claude/`. Use web search
> for the research and the checking; if you can launch subagents, use them as the rounds say, and if
> you cannot, do each round yourself as a separate pass and say so.
>
> **First, read these, in this order.** They override anything older in the project.
>
> 1. `00-WHAT-CW-IS.md`, at the top of the vault (not in `claude/`)
> 2. `claude/Story-Voice.md` — the voice. E. B. White. Read it twice.
> 3. `claude/Rulings-Sept-2026.md` — the rulings, and its last section, *Deep time*: deep lines count *ago* only.
> 4. `claude/Timeline-Stories.md` — the rulebook for events. Where it disagrees with anything above, it wins, except on dates, where the *Deep time* ruling wins.
> 5. `claude/Timeline-Samples.md` and `claude/Events-Batch-04.md` — the model for voice. Michael's own rewrite of *Pythagoras* in batch 04 is the best single example of prose that runs.
> 6. `claude/Events-Batch-03.md`, its first event, *The ice lets go* — the one existing event about the earth itself, and the nearest in kind to what you will write.
> 7. `claude/Plan-Deep-Time.md` and `claude/Ideas-Ledger.md` under *Other labs* (5–6 Oct) — what the bar is and why the tail, the known-from line and the place-now exist.
> 8. `cw-deploys/stories/deep-time.json` — the chunk tree. Its `marks` are the worklist: about thirty-six sketches from Michael's notes of 5 October, each with an age, a label, a sentence or two, and sometimes a `tail`. Its chunks each carry a `knownFrom` line. The sketches are starting points, never sources: check everything in them.
>
> 9. The latest `claude/Events-Deep-NN.md` — the batches already done, checked. They are the closest model for form, for the notes, and for the *Checked* line that ends each event. Your batch starts where the last one stopped.
>
> If the `cw-story` skill is listed, load it as well. Its refusals apply here in full.
>
> **What an event is.** Three kinds of prose. The *label*: a word or two, three at most, that names the thing (*Banded iron*, *Snowball one*, *Dickinsonia*). The *summary*: 20 to 40 words, starting with the age ("About 2.4 billion years ago."), saying plainly what happened, ending with *More*. The *More*: a story of 250 to 350 words that stands alone, with the date line first, references at the bottom that don't count toward the length, and notes for us below that.
>
> **The fields deep time adds.** Every event has all of these:
>
> - **Age:** in millions of years ago, with how sure: `2400 Ma · ± 50 Ma` for a dated layer; `3500 Ma · ± 200 Ma` for an argued one. Say which: a radiometric date on the rock itself, a date on the layers above and below, or an estimate.
> - **Tail:** the age the thing probably began by, older than the oldest evidence, with the reason in a clause: `tail: 3000 Ma — the chemistry in older rocks that may be its trace`. The tail ends at a prior bound when there is one (the oldest cities, for writing; the oldest rock, for anything in rock) and is `none` when the event is a dated moment, not a first (an impact, a thaw).
> - **Known from:** one line, what this stretch of time is known from: `a few zircon grains, some moon rocks and meteorites`. The chunk's own `knownFrom` line is the default; sharpen it for the event.
> - **Place now:** where the evidence is today, named the way the people there name it, with latitude and longitude, or *none* when there is nowhere honest to point: `Jack Hills, Murchison, Western Australia (26.17 S, 116.95 E)`. If the evidence is in several places, the one the More opens in. If the event is about a position on the ancient earth (a supercontinent), say so and give the place of the best evidence.
> - **Kind:** from the closed list — *earth event* for the planet and its rock, air and sea; *crop or animal* for life (the list has no better word yet; say in the notes if one is needed); *place* for a site; *object* for a fossil or a rock that is the thing itself; *person* for Charnia's finders, say.
>
> **The date line of the More** is one line, or two when there is a tail, in a code block, counting *ago* only:
>
> ```
> About 2.4 billion years ago
>       and probably begun by 3 billion years ago.
> ```
>
> No BCE, no "after the ice", no plain year. In prose, "2.4 billion years ago" and "about 717 million years ago" are the forms; never "2,400 million", never "2.4 Ga".
>
> **Clarity comes before everything.** Short words, plain sentences, one idea at a time, no sentence that admires itself. Every *it*, *they*, *this*, *that* and *one* points at exactly one thing; where a pronoun could point at two, repeat the noun. Plain is not choppy: join related facts into sentences that run, put the hedge first and once, and give a mechanism a paragraph when it can be explained honestly (the moon's tides slowing the day can be given; the chemistry of banded iron can be given; the physics of a magma ocean's cooling cannot, in the space, and is left out).
>
> **The rules that matter most for deep time:**
>
> - **Every first is "the oldest we have found."** Write "the oldest rock that survives," "the oldest fossil that nobody disputes," never "the first rock," "the first life." The tail says what the words imply. This is the lesson the whole bar teaches, by repetition and without a sentence of explanation.
> - **Say how we know, in the scene.** Open where the evidence is: the freezer with the ice cores was the model. For deep time the scene is a quarry, a drill core, a hillside, a microscope, a grain of zircon under an ion beam. Anything not recorded about that moment is said of the thing in general, not claimed for the place.
> - **Say whose guess a guess is, and when the argument is open, keep it open.** "Nobody is sure what they were" is a fact. Isua's carbon, the Doushantuo balls, the sponge chemistry at 640 million years: these are arguments, and the More tells the argument, not a winner.
> - **Numbers that show size are welcome, hedged.** How deep, how long, how cold, how many kinds of mineral. "About," "could have," "must have." Never exact where the source is not.
> - **No grand words.** Not "the story of our planet," not "a turning point," not "transformed," not "remarkable." The planet is not a character and has no plans. Oxygen did not "decide" anything.
> - **Assume nothing, explain only what the story leans on.** Basalt and granite get a clause the first time ("basalt, the dark rock that lava sets into"); the Moho gets nothing because no event leans on it.
> - **Who is reading.** A child in Western Australia, in Greenland, in Newfoundland, in Minnesota, in Leicestershire, in Namibia, in Guizhou is reading about her own ground. Name the places as the people there name them, and the finds as things people there did. Tina Negus, fifteen, found Charnia and was not believed; that is told as what happened to a girl, not as a moral.
> - End on a fact, an image, or what is still to be found. Never on a lesson.
>
> **Traps for deep time**, which the checkers will look for; look for them while writing:
>
> - **Dates that have moved.** The oldest zircon is 4.4 billion (4,404 ± 8 million, Jack Hills); the Acasta gneiss 4.03 billion; the Nuvvuagittuq rocks 3.8 billion by zircons, 4.28 by one method (2008), and about 4.16 for rock cutting through them (2025), still argued; the Strelley Pool stromatolites between about 3.43 and 3.35 billion, from the layers around them; the Great Oxidation between 2.43 and 2.22 billion; the Sturtian 717 to 660 million; the Marinoan to 635; the Cambrian from 538.8. Take the newest well-cited figure and give the uncertainty.
> - **Disputed finds told as settled.** Isua's graphite as life; the Doushantuo embryos; the 24-isopropylcholestane sponges; the Saglek 3.95-billion-year carbon. Tell the dispute.
> - **Units.** Million and billion are one slip apart and the slip is a thousandfold. Write the number out in the notes and check it against the source twice.
> - **Mechanisms half-told.** The snowball's thaw by carbon dioxide can be given in a paragraph; the cause of the Great Oxidation cannot be settled in one, and the More says it is argued.
> - **Legends.** Roger Mason and Charnia in 1957 are documented; "the quarrymen had seen them for years" is not. Hazen's own work is cited as his papers, not as a story.
> - **Figures from popular books.** Hazen's counts of minerals are from his 2008 paper, and the catalogue has grown since; say which count and from when. Day lengths come from Williams 2000, Meyers & Malinverno 2018, not from a rounded figure in a documentary.
> - **References.** Primary or review papers that exist as cited, and one book a parent could find (Hazen's *The Story of Earth*; Knoll's *A Brief History of Earth*; Fortey's *Life*). Author, title, journal, year. Check each exists.
>
> **How the work goes.** Stop at the end of each round and wait for Michael.
>
> *Round 1, the batch.* Propose the next ten to twelve marks from the chunk tree, one chunk's worth or two small ones, in age order, and say which you are least sure of and which have a tail. Michael adjusts.
>
> *Round 2, research.* If you can launch subagents, give each of three a share of the batch and have it return a fact sheet per event: the dated figures with their sources and uncertainties, the state of any argument, the place where the evidence is with its coordinates, and two or three candidate references that it has confirmed exist. If you cannot, do this yourself as a pass before writing.
>
> *Round 3, writing.* Write each event in the exact form of the batch files, with the fields above. Before handing a More over, read it once as her, and fix every sentence you had to read twice, every pronoun that could point at two things, every "first" that should be "oldest found," and every sentence that faces her instead of the subject. Count the words.
>
> *Round 4, checking.* Check every age, number, name, place, quotation and reference as someone who did not write them. If you can launch subagents, give each of three or four of them a share of the batch to fact-check independently with web search, reporting each claim as confirmed, change (with exact wording) or could not confirm, with a source; one checker reads only for units and ages. If you can't, do it yourself as a separate pass after the writing is finished. Apply the changes, soften or cut what could not be confirmed, and tell Michael plainly what was wrong. Never say a fact was checked unless it was.
>
> **Learned from earlier batches.** Batch 1 (6 Oct) settled these; don't reopen them.
>
> - **Uncertainty is the point.** Michael: "It is a feature. We are conveying the need for more research." An event about what nobody can see (Black Earth) or an idea that came apart (the bombardment) belongs on the bar, and its More tells how people work it out anyway.
> - **Place now may be none**, and nothing obliges a mark on the map.
> - **Traditional owners** are named only when a checker confirms the site lies in their native-title determination or land claim; otherwise name the place and not the people. Indigenous names for places are given as the people there write them (the nation's own spelling over a wiki's).
> - **British spelling** in labels and prose (*Grey Earth*, not Hazen's *Gray*).
> - **The dot is the oldest evidence the More is built on.** When the famous evidence has fallen (the 2.7-billion-year cyanobacteria molecules, shown in 2015 to be contamination), move the dot and say why in the notes.
> - **A sketch's number is not a source.** Batch 1 found the sketches' "18-hour day" and "fifteen times closer" unsupported or model-only.
>
> What batch 1's checkers caught, so you can catch it first: a reference title written from memory that did not exist; a recent event given the wrong year and the wrong people (the Nuvvuagittuq closure was 2024, and stopped geologists, not collectors); a length off by a factor of five (a drill core of 908 m called "nearly two hundred metres"); "most scientists" where the source says there is no consensus; "showed" where a paper only argued; a mechanism retold more simply than the paper tells it (how the Idiwhaa gneiss formed). Write "many", "argued" and "seems" unless the source says more.
>
> **Marks not in the chunk tree.** Add these where their age falls:
>
> - *The day at 2.46 billion* — about 17 hours, read from banded iron at Joffre Gorge, Karijini (Lantink and others, *PNAS*, 2022). It replaces the sketches' unsupported 18-hour day. (Ideas-Ledger, *Other labs*.)
>
> Patterson's measurement of the Earth's age (1953) is an After the Ice event, not a deep one; leave it for that line.
>
> **Saving.** Save the batch as `claude/Events-Deep-NN.md`, a new series starting at 01, with a header like the earlier batches that says what was researched, written and checked by whom. In the vault at `/Users/michaelchabin/_CW/CWVault/claude/`, or tell Michael which file to copy. The build (Stage 6, Claude Code) will teach `tools/events-from-vault.py` the new fields and move the marks out of `deep-time.json` into the store.
>
> **Working with Michael.** He is the designer and author. Be concise and informal; humour is fine; no emojis; lists only when they shorten things. Ask rather than guess. Own mistakes plainly. One batch per chat.

## Notes for us

**How hard this is.** Not hard: the pipeline exists (research agents, one writing pass, three or four
checkers) and has run four batches. What deep time changes is the checking, not the writing: dates
move as methods improve, several of the best stories are open arguments, and a slip between million
and billion is a thousandfold. So the fourth checker reads only for units and ages. The sources are
also less open to a parent than a museum record is: most are papers; the prompt asks for one book
per event a parent could find.

**Cost.** A batch of twelve, with three research agents and four checkers, is about the size of
batch 03: an hour or two of a chat, or less in Claude Code where the agents run in parallel. Thirty-six
marks is three batches.

**What the build then needs** (Stage 6): `events-from-vault.py` reads the new fields (`Age`, `Tail`,
`Known from`, `Place now`) and writes `year` as the store's astronomer's year (this year minus the
age), `precision` as a number of years, `evidence: 'earliest'` when there is a tail, `tail` as a year,
`knownFrom`, and `placeNow`; the date line as its one or two parts; `js/deep-time.js` reads its marks
from the store by chunk instead of from the tree; and `js/timeline.js`'s stretch gains the one-sided
form for the Time Machine's own line.
