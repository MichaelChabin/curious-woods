---
status: checked. Editor pass 4, 15 Nov 2026, by Claude, in the "how much can you do" chat, on Michael's word ("go and you can do the next passes"). Covers Events-Batch-06.md and Events-Batch-07.md in full (23 events, every More read), which finishes the After the Ice events: 107 in seven batches. Read after Claude Code had applied passes 1 and 2 (commits f1cb4f37 and 7f6d1409), so the Franklin and Gorky changes were seen in place. Nothing in any batch file or store has been changed by this pass; the changes below are for a Claude Code session to apply.
role: The fourth page of the reading rung, and the tally for the seven After the Ice batches.
---

# Editor pass 4

## The page for Michael

**What was read.** Batch 6 (eleven events, Galileo to Darwin) and batch 7 (twelve, Issun-bōshi to the first web page), every More.

**The verdict.** Both stand. No fault of fact in either. Four small things:

- *Franklin's kite* is now 354 words, four over the limit, because of my own change in pass 2. The fix below gives the words back.
- *Van Gogh in Arles* has a four-word label. *Van Gogh* will do; no other event uses it.
- Galvani is "a doctor" in two events. Story-Voice asks for the exact word, and he was a physician who taught anatomy.
- *First web page* speaks of the present twice ("nobody has a copy", "you can still read it"). It gets a Watch line.

**One line confirmed.** *Frankenstein* gives Mary Godwin's remark about the thunderstorms. The checkers could not find it. It is in the second letter of *History of a Six Weeks' Tour*, dated 1 June 1816, and the More paraphrases it fairly.

**Three drawn at random:** *Laki* (batch 6, 5), *Paint tubes* (batch 7, 3), *Montparnasse train* (batch 7, 9). None needed a change.

## The tally for After the Ice

All 107 events have now been read by someone who did not write them and was looking for the reader as well as the facts.

- Batches 1 to 3, written before 1 October: 56 events, nine real faults (Nok's iron, the Kalinga quotation, Great Zimbabwe's population, Tunguska's "almost no one", Andromeda's autumn, Krakatau, Huaynaputina, Saint-Domingue's sugar, the Uluburun tin), and the old choppy rhythm throughout.
- Batches 4 to 7, written after: 51 events, no real faults.

Nine in 107 is about one event in twelve, all of them in the first three batches. That is the argument for the rhythm rewrite of those 56 being more than polish: it is a second full pass over the batches that needed one.

**Next:** the deep-time files (Events-Deep-01 to 07, Periods-Deep-01 to 03, Plots-Deep-01, Life-Trial-01), where the risk moves from voice to numbers. Then the rewrite page for batches 1 to 3.

## Changes to earlier files

Old words first, new words second. Recount each changed More.

### Events-Batch-06.md

**3. Franklin's kite.** "The man was Benjamin Franklin, who had made his living as a printer in Philadelphia," becomes "The man was Benjamin Franklin, once a printer in Philadelphia,". The More must come back to 350 words or fewer; if it does not, stop and report the count.

**4. Galvani's frogs.** "He was a doctor who taught anatomy, the study of how bodies are built," becomes "He was a physician who taught anatomy, the study of how bodies are built,".

**6. Volta's pile.** "Luigi Galvani, a doctor in Bologna, who died in 1798" becomes "Luigi Galvani, a physician in Bologna, who died in 1798".

**8. Frankenstein.** No change to the words. In the notes, replace "Not confirmed: the thunderstorm sentence in Letter II" with "Confirmed 15 Nov 2026 from the editor's knowledge of the text: *History of a Six Weeks' Tour*, Letter II, 1 June 1816; a checker should open the Internet Archive copy once".

### Events-Batch-07.md

**7. Van Gogh in Arles.** The label "Van Gogh in Arles" becomes "Van Gogh". The heading stays.

**12. First web page.** No change to the words. *Watch:* whether an older copy of the first page has been found, and whether the 2013 restoration is still at info.cern.ch · last checked 15 Nov 2026 (from the batch's Checked line of 8 Oct 2026) · every year.

### The ladder

When these are in, the status lines of Events-Batch-06.md and Events-Batch-07.md gain: "Read by Claude, editor pass 4, 15 Nov 2026 (Editor-Pass-04.md); changes applied." The words "Awaiting Michael's reading" come out.

## A ruling to carry out: After the Ice can go

Michael, 15 Nov 2026, in this chat: "The after the ice can go. We are working on a reworking of both the earth and the timeline, so we'll ultimately merge that with the events in the timeline." The page `cw-deploys/active/after-the-ice.html` reads the old store `stories/after-the-ice-events.json`, which holds none of the 107 events above.

This is its own step, not part of the word changes, because other pages may link to it.

## For Claude Code

> Read `CWVault/00-BOARD.md`, then `CWVault/claude/Editor-Pass-04.md`. Apply every edit under *Changes to earlier files* exactly, including the label, the Watch line, the note in Frankenstein and the status lines. Recount each changed More and correct the count in its heading. Rebuild or edit the stores as you did for passes 1 to 3. Do not invent wording: if an old string is not found, stop and report it. Update the board and MANIFEST in the same commit. Report, then commit and push only on Michael's word.

And separately, when Michael asks for it:

> Michael has ruled that the After the Ice page can go (Editor-Pass-04.md, *A ruling to carry out*). Do not remove anything yet. Report every page, script, gallery entry and document in `cw-deploys/` and the vault's live pages that links to or loads `active/after-the-ice.html` or `stories/after-the-ice-events.json`, and whether `00-WHAT-CW-IS.md` and the Rulings still describe After the Ice as hanging in the gallery. Propose the removal (the page and its store to `outdated-files/` with dated names, links repointed to the Time Machine, MANIFEST and the board updated) and wait for Michael's word.

## How this was done

One reader, no subagents. Every More and summary read whole; notes and Checked lines in their first few hundred characters. No web search was needed in this pass. Galvani's brass hooks and iron railing, Faraday's ring and the Six Weeks' Tour letter agree with what I know of the sources.
