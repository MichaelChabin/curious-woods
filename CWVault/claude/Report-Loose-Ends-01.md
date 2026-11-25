---
status: Report, 25 Nov 2026, by a Claude Code session, on Michael's prompt "Loose ends, 25 Nov 2026" (from the "Woods this week" chat). Two commits made on the prompt's own instructions (`dbc78e9b`, `25c09f60`); everything else in the working tree, waiting for Michael's word. Nothing pushed.
role: What was done and what was skipped for each of the eight loose ends.
related: 00-BOARD.md, Life-Trial-01.md, Events-Deep-09.md, Ruling-Dates-01.md, Report-Brain-Lab-Rulings-01.md, Report-Build-Brain-Bench-01.md, Archive/Editor-Pass-11-02.md, Elements-Batch-01.md, Ideas-Ledger.md
updated: 2026-11-25
---

# Report: loose ends, 25 Nov 2026

## For Michael, first

Nearly everything is done. Two commits are made, because the prompt asked for them: the Ideas Ledger's 430 lines as they stood, and the 23 Nov tidy of `claude/` as moves. Everything else is in the working tree, waiting for your word to commit and push.

Four things need you:

1. **The switchboard.** The prompt says the brain bench's switchboard "stays lit while the signal runs", as built. It doesn't, as built. The page lights one button at a time, so starting the signal puts the switchboard out; only the two geniculate bodies inside it glow, at the handoff. I recorded the choice as the page behaves, and said so beside it. If you meant it should stay lit, that is a small code change, and a ruling.
2. **Olmec heads.** The summary now reads "Before 900 BCE (more than 2,900 years ago)", in the batch file, the store, the Time lab and the Time Machine. But the More's date line still says "About 1100 BCE (about 3,100 years ago)". In the Time lab that line is the heading above the summary, so the two sit one above the other. The prompt named only the summary, so I left the date line.
3. **What CW Is, line 14.** The Time Machine now takes After the Ice's place there. The rest of the sentence still describes After the Ice's copper dot rolling up from year 0, and I had no wording for the Time Machine to put in. I marked it as still to be rewritten.
4. **Carbon in the schema.** Change 5 says carbon's `found_precision` should be "antiquity". The batch's own record, which pass 11 says to copy, still says "year". I copied the record as it stands. The schema's sentence "Batch 01 corrected several of the numbers below", and its note that the example's numbers "are from memory", are now out of date, since the example *is* batch 01's record. I left both, as the prompt gave no wording.

One premise was wrong: `Prompt-Elements-Voice-01.md` had never been committed, so `git mv` could not move it. I moved it into `Archive/` by hand.

The 23 Nov tidy was also only half a move. 36 originals were still in `claude/`, each beside an identical copy in `Archive/`. To commit it as moves I removed those originals, each only after checking that the copy matched it byte for byte. Eleven of them had never been committed, so their only copy now is the one in `Archive/`, which is committed.

## Before anything

The index was empty when I started; no other session had anything staged. The working tree held another session's uncommitted work, which I left alone and staged none of: the 16 Oct clear-out lines in `cw-deploys/MANIFEST.md`, the deletions and edits under `cw-deploys/experiments/`, `Prompt-Pool.md`, `Report-3D-Shelf-Oct26.md`, and the many untracked files (pictures, worknotes, sketches, `prototypes/`, `Beads Analysis/`, `Claude outputs/`). I committed by naming paths. When this session's work is committed, `MANIFEST.md` will be staged by hunk, this session's only. `Handoff-Brain-Lab-01.md`, another session's file and never committed, is untouched. During this session `cw-deploys/experiments/time-lab.html` and `cw-deploys/js/3d/earth.js` changed in the working tree; this session did not touch them, so another session is at work on the Time lab, and its changes stay out of this session's commit.

## 1. Red metal

Done. The status line of `Story-Copper-Red-Metal.md` now begins "approved — approved by Michael on the Pool Desk, 23 Nov 2026." and keeps the rest. Nothing else in the file changed. The Stories Ledger had no line for it. It now has one, under a new heading *Written, not built*, named after its stage in Publishing-a-Story, since none of the ledger's existing headings fitted a story whose words are approved but not built. Not built.

## 2. The five creatures

Done. They went in as First trilobites did, as a new batch file: `Events-Deep-09.md` holds the five, copied word for word from `Life-Trial-01.md` after editor pass 10, each with its Checked line, so the store marks them checked (`checked: true`). Its status line says they are approved and loaded. Their kind is the closed list's `crop` ("crop or animal"). The drawings are not loaded.

Rebuilt with `tools/deep-events-from-vault.py`, with no change to the tool: 196 events became 201, the five new, none gone, none else changed. *Acanthostega* has no map point, because its place line says the site's position is not published.

`Life-Trial-01.md`'s status line now opens "approved and loaded", with 25 Nov. The prompt gives no date for the approval on the Pool Desk, and the desk keeps its verdicts in its own database, so the line gives the date of loading only.

Read in place in the Time lab: *Meganeura* and *Pakicetus* each open their More in the panel, with the date line, the words and the place (Commentry; Chorlakki). Tapping an event selects it but does not move the year handle.

## 3. Five lines of wording

- **Ice lets go:** done. In `Events-Batch-03.md` the year is about −9700, and the summary and date line read "About 9700 BCE (about 11,700 years ago)". Both stores were rebuilt; in each, this record changed and nothing else did. The Time lab shows "About 9700 BCE (about 11,700 years ago)".
- **Olmec heads:** done, except for the date line (above, point 2). The summary in `Events-Batch-04.md` reads "(more than 2,900 years ago)". The store keeps that text, and both pages show it once, with no doubled brackets.
- **`00-WHAT-CW-IS.md`, lines 14 and 34:** done. Both name the Time Machine in After the Ice's place, citing your word of 15 Nov. Line 14's remaining description is flagged (above, point 3).
- **`Rulings-Sept-2026.md`, line 135:** "Where After the Ice hangs and how it starts" is marked settled, 15 Nov 2026, with the reason.
- **The brain bench's four choices:** recorded as decided by default, 19 to 20 Nov. They are in a new section at the end of `Report-Build-Brain-Bench-01.md`, placed after its checksums so that its own checksum still holds (checked), and in the board's Brain lab entry, where its *For Michael to read* list was. No code changed. On the switchboard, see above, point 1.

## 4. The Brain lab's two rulings

- `brain` is in the `lab` facet's closed list in `00-FOUNDATION/Facet-Vocabulary.md`, with a dated note. `perception-lab.md` got nothing new. No seed takes the new word: the only seeds that use the facet besides that one are the Chladni bench and the moiré of turning discs, and neither plainly belongs to The Brain.
- The ensō: one line under *The Brain lab (13 Nov 2026)* in `Rulings-Sept-2026.md`, dated 25 Nov, says "today's sitting" means her list offering what is ready, so the two rulings agree. The 25 Sept section is untouched.

## 5. The Elements files

Done, with one wording left alone (above, point 4).

- **`Schema-Elements.md`.** Changes 1 to 5:
  - `found_kind` added, with the sentence on `found_precision`.
  - The abundance sources added.
  - "Up to ten lines" replaces "four to ten lines".
  - The pairs' speed added.
  - The worked example's record replaced by batch 01's carbon, copied from the batch's JSON and checked to parse to the same record.

  The pass's other additions: carbon's `boil_k` 4098, and the new wording of `latin`. The schema has no headings called *Sort keys*, *Spectrum* or *Rulers*; they are bold labels inside *Fields*, and each change went under its label. The note "1772 is usually given", which change 5 says can go, is not in the file.
- **`Lab-Elements.md`.** Changes 6 to 8:
  - "In the 1850s priced like silver" replaces "in 1850 rarer than gold". That is the batch's own wording; the batch's entry says that from 1855 it sold for some years at about the price of silver.
  - The two *Birth* bullets replaced.
  - The white dwarfs added to the last bullet.
  - The universe-bar sentence added under *The entry*, item 1.

  The Pool Desk item is untouched.
- **`Prompt-Elements-Entries.md`.** The rule on naming people now ends "and so with every name: the word for the person's work, the first time in each entry".

All three status lines say they were amended. No Elements lab or `data/elements.json` exists under `cw-deploys/`, so nothing was built.

## 6. The Ideas Ledger

- The other session's 430 lines were committed as found, in a commit of their own, before I touched the file: `dbc78e9b`.
- *Milanković in Budapest* and *The glass, painted by the story* go from `loose` to `candidate`, one word each. *Two honest signals* is left as `candidate`.
- **Merged** 25 Nov, each entry marked so at its foot:
  - From `Ideas-Ledger-02.md`, which is a whole second copy of the ledger: the twelve entries not already in it. Ten went under *Other labs*: the glass brain, three names, the brain in the corner, her record, activity maps, roads, guess the road, maps inside the brain, zoom to neuron, other brains. *The seam you can't find* went under *Stories*, and *One store, opened at a moment* under *Across the whole*.
  - From `Ideas-Pending-2026-11-02.md`: its three entries, under the headings it names, and the addition under *How stars make the elements*.

  The ledger goes from 141 entries to 156. No entry clashed. Eight entries are in both copies but differ; in each case the ledger's copy is the newer one (the Brain lab session's 23 Nov edits, the 23 Nov line on carbon, today's two status words). Both source files now open with a line saying what was merged and where. They are still not committed; they are another session's files.

## 7. The archive, and the tidying of 23 Nov

- **The 23 Nov tidy, committed as moves: `25c09f60`.**
  - 34 originals already gone from `claude/` are removed. 33 of their Archive copies had been committed earlier, and the 34th is added here.
  - 36 originals the chat had copied rather than moved (25 committed, 11 never committed) are removed from `claude/` after a byte-for-byte check. Their copies are added.
  - 11 Archive-only files are added.
  - The four copied-in files went in as the chat left them; my edits to them came after.
- **Four more, moved into `Archive/` (no name was taken there):**
  - `Prompt-Revise-Time-Lab-Bench-12b-01.md`: `git mv`. SHA-256 `530af7ce43654130de3dbc30b785129ca83b38b6957acb3d2afeb3514feac4bf`, the same after the move.
  - `Prompt-Revise-Time-Lab-Bench-12c-01.md`: `git mv`. `1fca44a2d192203dca6b28437193af13f4687010163dc3fab8444eb64b1d7659`, the same.
  - `Editor-Pass-11-02.md`: `git mv`. `c5861241d83c2b0372944278e505fa373bdb868f565e922176862c50b36f1b88`, the same.
  - `Prompt-Elements-Voice-01.md`: never committed, so moved by hand. `916f8eb005a9f5ff82a6c507510826919dad670bf47b8109136353448372ae55`, the same.

  The moves are not staged; they go in with the rest, on your word.

## 8. Board and MANIFEST

The board's head line records this session. The Brain lab entry records the four choices. MANIFEST has one entry, dated 25 Nov, for the two stores. Both will go in the same commit as the items they record.

**When you say go:** one commit with items 1 to 7's remaining changes, this report, the board and this session's MANIFEST hunk, then the push. On the site, the five creatures and the two dates show in the Time lab and the Time Machine once it is pushed.
