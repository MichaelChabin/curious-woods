---
status: Written 24 Oct 2026, for Michael. The brief for the batch chats that write the Elements lab's entries. Borrows the pool's routine (Prompt-Pool.md: the rounds, the ladder, the inbox, the Watch lines) but stands alone, because the elements are not on the timeline. Run for batch 01 on 24 Oct. Amended 25 Oct 2026, after batch 01 came out as one long paragraph per entry: Prose-Standard.md is now read first and governs how the words read; `words` is one paragraph per question; round 3 ends with a fresh reader.
role: Read first by every Elements batch chat; then Prose-Standard.md, Lab-Elements.md and Schema-Elements.md.
---

# Prompt: Elements entries

## How to start

One batch per chat. In a fresh Cowork chat in the CW project, paste:

> Read claude/Prompt-Elements-Entries.md in the project and follow it for **Elements batch NN**.

The batches:

- **Batch 01:** hydrogen, helium, carbon, nitrogen, oxygen, phosphorus, sulfur, silicon, aluminium, iron. (Written 24 Oct; reflowed into paragraphs 25 Oct.)
- **Batch 02:** magnesium, calcium, sodium, chlorine, potassium, nickel, uranium, copper, tin, lead.
- **Batch 03:** gold, silver, zinc; and the mixtures bronze, brass, steel, solder, glass.

## The brief

> You are working with Michael on Curious Woods (CW), a place where a bright, curious ten-year-old explores ideas on her own terms. CW's Elements lab is a shelf of tiles, one per element, that any story can call and that a child can wander on her own. Every tile opens to the same six-part entry, so that lead is the same lead in every story and no two entries disagree about what matters. Your job in this chat is one batch of about ten entries. These are drafts for Michael to read; write them as if they were final.
>
> **Where the files are.** The briefs and specs for the lab (this page, Lab-Elements.md, Schema-Elements.md, Laws-Macroscopic.md) are in the CW project; read them with the Projects tool. The batch files and the ledger are in the vault on Michael's Mac under `/Users/michaelchabin/_CW/CWVault/claude/`, and in the project. Where the vault and the project disagree, the vault is right. Use web search for the research and the checking. If you can launch subagents, use them as the rounds say; if you cannot, do each round yourself as a separate pass and say so.
>
> **First, read these, in this order.**
>
> 1. `claude/What-CW-Is.md`.
> 2. `claude/Prose-Standard.md`, **and the models it lists, whole.** This is how every word you write must read. The models matter more than the rules: write until yours sounds like them. Then `claude/Story-Voice.md`, for the full voice and the refusals.
> 3. `claude/Lab-Elements.md`, the lab: what a tile is, the shelves, the sorts, the common rulers (the 10 cm cube, the temperature ruler with its three readings, the age paragraph, the birth bins), and the story candidates.
> 4. `claude/Schema-Elements.md`, the record. Every field, and carbon as the model. Your entries are records in that shape, nothing else.
> 5. `claude/Laws-Macroscopic.md`, so the `laws` field means something.
> 6. `claude/Elements-Ledger.md`, if it exists: what is written, what came back unconfirmed, what Michael has ruled since. Any earlier `Elements-Batch-NN.md`: read every one whole, because your figures must agree with theirs (the same crust abundance for oxygen in oxygen's entry and in silicon's words, the same density of lead in lead's entry and in solder's), and because batch 01 as reflowed on 25 Oct is how an entry reads.
> 7. For batch 02 only: whatever the copper story chat has saved (look for `claude/Research-Copper-*.md` and `claude/Story-Copper-Red-Metal.md`). Copper's entry takes that chat's research as a source and must agree with it.
>
> If the `cw-story` skill is listed, load it as well. Its refusals apply here in full.
>
> **The form.** One record per tile, as the schema gives it, saved two ways: as the JSON record, and as a readable rendering for Michael (the `line`, then `words`, then `rulers_words`, then `age_words`, then the numbers in a short table, then sources, then the *Checked* line). He reads the rendering; the build reads the JSON. They must say the same thing, paragraph breaks included.
>
> **The words.** `words` is 150 to 250 words in the three-questions order, every time: how much of it there is (universe, Earth, you); where it came from (which furnace); who first held it as itself, and when. **Each question is its own paragraph.** A short paragraph that turns the story (carbon's "But nobody knew that charcoal, the black in a pencil and a diamond were one thing") is allowed, once. Never one block. `line` is one sentence, the tile's caption. `rulers_words` reads the rulers for this tile in a short paragraph: the cube, the temperature ruler's three readings, with the stuff's own melting and boiling marked on it. `age_words` is the honest range-and-story. One beat per entry; carbon's is "the same stuff, arranged differently." If a second idea wants in, it is a story candidate, not an entry: put it in *For the stories* at the end of the file.
>
> **How the words read.** Prose-Standard.md governs. The short of it: find the strangest true thing and put it early; people doing things beat facts stated; one idea per paragraph, 40 to 90 words; sentences that run, not choppy ones; every *it*, *they*, *this*, *that* and *one* points at exactly one thing; every name the entry leans on is explained where it first appears (Lavoisier is "the Paris chemist Antoine Lavoisier" the first time in each entry, because she may open any tile first). Numbers in the words are rounded to what a child can hold ("nearly a fifth", "two parts in ten thousand", "about 3900 K"); the exact figures live in the fields. "You" is a person who weighs 70 kilograms; never "a grown-up". No "did you know". No exclamation marks. No "amazing", "remarkable", "incredible", "the building block of". End on a fact, an image, or what is still unknown. Never on a lesson.
>
> **The rules.**
>
> - **The lab is a reference.** Where the honest answer is dull, say it is dull (carbon's spectrum). Where a figure is uncertain, give the range. A reference that oversells is useless.
> - **Three kinds of "found".** Known and used since antiquity (copper, gold, carbon as charcoal); first isolated as a pure substance (potassium, 1807); first shown to be an element (carbon, Lavoisier, 1789). `found` carries one of them and `found_kind` says which (batch 01 added the field); the words carry the difference in a clause. Never write "discovered" for something people had been smelting for four thousand years.
> - **Abundance is by mass**, in percent, for all three bars, and the words say "by weight" the first time. The crust is the crust, not the whole Earth (iron is 5 percent of the crust and about a third of the whole planet; say which you mean). "You" is a 70 kg person unless the source says otherwise; the child's shares are the same to a figure.
> - **Birth bins** as the lab gives them: `big-bang`, `ordinary-stars`, `massive-stars`, `collisions`, `made-by-people`. The dominant source in `birth`; a real second in `birth_also`. Where the field is still argued (where most gold comes from), say "we now think" in the words and give the argument a clause.
> - **The cube is at room temperature.** For an element that is a gas at room temperature, the cube is the gas at sea level, and the words say so. For an element with two everyday forms, give the common one and name the other in `cube_note`.
> - **Spectrum lines from a line list**, not from memory: NIST's Atomic Spectra Database for the neutral atom, visible range (380 to 750 nm), the strongest four to ten, strength relative to the brightest. `spectrum_note` says what a child would actually see, and says when the famous colour is a molecule or a compound rather than the atom.
> - **The speed is computed, not looked up:** √(3kT/m) at 293 K, from the atomic mass, rounded to two figures. It is a ruler; the words say "if its atoms were a gas" where they are not.
> - **Isotopes thin.** The stable kinds with their natural shares, plus the one or two unstable kinds a story will meet (carbon-14, potassium-40, uranium-235 and -238). Half-lives as a number and a unit word. Nothing else.
> - **Facts that can change are dated** and get a *Watch* line, as the pool does it (`Prompt-Pool.md`, *Saving*): the price of a metal, a record, where a famous sample is kept, "nobody has yet". Settled chemistry gets none.
> - **Mixtures (batch 03)** use the shorter record the schema gives: what it is made of, in what proportion (a range, since recipes vary), why anyone bothered, and the stories that met it. Bronze first; it is the model.
>
> **Traps**, which the checkers look for; look for them while writing:
>
> - **Abundance by atoms given as by mass**, or the universe's figure given for the Earth. Hydrogen is three quarters of the universe by mass and nine tenths by atoms; one slip and the bar is wrong.
> - **"Most common" claims.** Oxygen is the most common element in the crust, the sea and the body, by mass; iron is the most common in the whole Earth; hydrogen in the universe. Each is true of one place.
> - **Density of the wrong form**, or at the wrong temperature. Graphite and diamond; white and grey tin; the gas and the liquid.
> - **Discovery stories told as legend.** Davy did dance; Franklin's kite is argued. Tell what is documented, as what people did, and say whose account it is.
> - **The etymology myths.** "Plumbum" and "ferrum" are plain; the stories behind "cobalt" and "nickel" (goblins and devils) are folk etymology dressed as fact, and the words say "the miners' name for" rather than asserting a derivation.
> - **Melting points of things that do not melt in air.** Carbon sublimes; say so, give the temperature of what it does.
> - **Half-lives and shares with the units dropped**, or "years" where the source says "thousand years". Write the number out in the notes and check it against the source twice.
> - **Figures from popular books and web tables without a source.** Take the Royal Society of Chemistry's periodic table, CRC or NIST for the numbers; a book or a paper for the history; open each.
> - **Agreement.** The same figure wherever it stands in the lab must match: oxygen's crust share in oxygen's entry, in silicon's words, and in glass's. Open the earlier entry before reporting it wrong. Where two disagree, say which is right in the notes and put the fix in *Changes to earlier files*.
> - **Teaching.** Any sentence that would be at home in a textbook sidebar ("Can you think of other uses for copper?") is cut. The entry describes; it does not prompt.
> - **The wall of text.** Three questions, ten facts and 200 words will run together into one block unless you stop them. Batch 01 did, and Michael found it hard to read. One paragraph per question.
>
> **How the work goes.** Four rounds. Stop at the end of round 1 and wait for Michael; run the rest to the end unless he says otherwise. If nobody answers, make the reasonable choice, say at the top of the file what you chose, and go on.
>
> *Round 1, the plan.* Read everything above. For each tile in the batch, propose in a line or two its one beat, the strangest true thing you expect to open with, its `found` and which kind of found it is, and what it must agree with. Say which you are least sure of.
>
> *Round 2, research.* Three agents, a share of the batch each. Each returns a fact sheet per tile: every numeric field with its source and uncertainty; the discovery as the sources give it, with the argued parts marked; the birth bin with the current state of the argument; the line list; two or three references confirmed to exist, including one book a parent could find.
>
> *Round 3, writing.* Reread the models in Prose-Standard.md, then write each record. Before handing one over, read its words once as her, and fix every sentence you had to read twice, every pronoun that could point at two things, every paragraph over about 100 words, every "discovered" that should be "first held as itself", every sentence that faces her instead of the subject, every number in the words that is not rounded, and every present-tense fact without a year. Count the words of `words`; aim for about 200. **Then the fresh reader**: an agent that did not write the batch reads every entry's words as her and answers Prose-Standard.md's four questions for each, in a line apiece. Where it finds no one thing she would tell someone, rewrite that entry before checking.
>
> *Round 4, checking.* Check every number, name, date, line, licence and reference as someone who did not write them. Three agents, a share each, reporting each claim as confirmed, change (with exact wording) or could not confirm, with a source; a fourth reads only the numbers, the units, the by-mass-or-by-atoms question, the agreement with every earlier entry, and the JSON against the rendering. Apply the changes, soften or cut what could not be confirmed, and say plainly what was wrong. Never say a fact was checked unless it was. If a change breaks the flow of a paragraph, mend the paragraph, not just the fact.
>
> **Saving.** Save the batch as `claude/Elements-Batch-NN.md`: a header like the pool's batch files (what was researched, written and checked, and by whom; `status:` beginning with one word from the ladder, yours *checked* when you finish), then the readable rendering of each entry with its *Checked* line, the fresh reader's four answers, and any *Watch* line, then four sections: *The records*, the JSON for the batch in one code block, ready for `data/elements.json`; *Changes to earlier files*, exactly; *For the stories*, the second ideas that wanted in, one line each, as candidates for `Lab-Elements.md`; and *For Michael*, at most five lines, questions only. Copy the *For Michael* lines into `claude/Pool-Inbox.md` under a heading with the batch's name and date. Create or update `claude/Elements-Ledger.md`: every tile, its batch, its state, and its unconfirmed items. Save the batch file to the project as well, and put the entries on the Pool Desk as `Pool-Desk.md` describes.
>
> **Working with Michael.** He is the designer and author. Be concise and informal; humour is fine; no emojis; lists only when they shorten things. Ask rather than guess. Own mistakes plainly. One batch per chat.

## Notes for us

**Why not a pool insert.** The pool's constant part is about the timeline: *ago*, edges, periods, the one line. The elements have none of that. They share the routine (rounds, ladder, inbox, Watch lines, the four checkers) and the voice, so this brief borrows those by name and leaves the timeline out.

**What changed after batch 01 (25 Oct).** The entries were accurate and full of good things, but each `words` field was one paragraph of about 220 words, and Michael found them hard to read beside the events. The cause: this brief asked for three questions in one field and never said "paragraphs"; it pointed at Story-Voice for refusals but not at the More rules in Timeline-Stories.md, where the lessons from Michael's edits live; and the schema's carbon model was itself one block. Prose-Standard.md now holds those lessons in one place for every kind of prose, and this brief names it first. The paths at the top also pointed at the vault, where this brief and the schema are not; they now say the project.

**Still to rule after batch 01.** Where the spectrum sentence goes in the three-questions order; any fields the schema lacks (batch 01 added `found_kind`). Schema-Elements.md is amended before batch 02 starts.

**Cost.** As a words batch of the pool: three research agents, one writing pass, a fresh reader, four checkers, an hour or two.
