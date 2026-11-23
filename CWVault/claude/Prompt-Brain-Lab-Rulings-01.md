---
status: Prompt for Claude Code — 13 Nov 2026, written by Claude in the iPad chat of 12–13 Nov on Michael's rulings. Not yet run.
role: Carry the Brain lab's rulings of 13 Nov into the canonical files, archive four files, and fix the pointers. No building.
related: claude/Brain-Lab-Map.md (the source for everything here), claude/Brain-Series-Map.md, 00-WHAT-CW-IS.md, claude/Rulings-Sept-2026.md, 00-LABS-LEDGER.md
---

# Prompt: the Brain lab's rulings, and four files to the archive

Read first, as usual: `CLAUDE.md`, `CWVault/00-WHAT-CW-IS.md`, `CWVault/claude/Rulings-Sept-2026.md`. Then read `CWVault/claude/Brain-Lab-Map.md` whole. It is the source for this prompt. Its section *Ruled, 13 Nov 2026* holds eight rulings in Michael's name, and its section *What this gathers, and what could be archived* holds five more.

This is vault work only. Build nothing, and do not touch `cw-deploys/`.

## 1. Carry the eight rulings into the canonical files

- `claude/Rulings-Sept-2026.md`: a new section, *The Brain lab*, dated 13 Nov 2026, with the eight rulings. Keep each to a sentence or two and cite `Brain-Lab-Map.md` for the rest. Use Michael's own sentence on guessing as it stands there.
- `00-WHAT-CW-IS.md`: Practice is the fourth view of the lab called *The Brain* (cell, brain, you, practice). The ensō stays where it is in the gallery and opens straight onto today's sitting. Change only what these rulings change.
- `00-LABS-LEDGER.md`, *The Brain*: the four views; the two benches `experiments/two-eyes.html` and `experiments/pond.html` under the cell view; a cross-reference from the tapping bench under *Sound and Music* to the Practice view.

The manager chat keeps the project's copies of these files in step with the vault. You cannot reach the project, so list in your report every canonical file you changed, for Michael to refresh.

## 2. Archive four files

Follow the vault's existing archive habit (look at how earlier files went into `99-ARCHIVE/`, with their dates). Use `git mv`. Put one line at the head of each saying when and why.

1. `00-FOUNDATION/Claude-Learning-System.md`. Reason: it designs a record of each child, and What CW Is says no identity and no records, ever.
2. `20-SPECS/Spec-Mirror-Star.md`. Reason: `Spec-Trace-Bench.md` replaced it. Open it first. If it holds anything Trace's spec does not, stop and tell Michael instead of archiving.
3. `claude/Story-The-Cube-That-Wont-Hold-Still.md`. Reason: an earlier telling; *Professor Necker's Drawing* is the one that hung. Its three useful notes are already in `Brain-Lab-Map.md`.
4. `99-IDEAS/Practice-Tools.md`. Reason: superseded. Leave the rest of `99-IDEAS/` alone; the board says it was kept on purpose.

Then search the vault and `CLAUDE.md` for every reference to these four paths. Fix each one, or mark it as archived. Two are known: story 2 in `claude/Brain-Series-Map.md` points at the Mirror Star spec and should point at `Spec-Trace-Bench.md`; and the board's Trace thread lists the Mirror Star spec under *Authority*. List in your report any reference you left.

## 3. One note, no archive

`00-FOUNDATION/CW-System-Foundation.md` stays. Add a short note at its head: where this file differs from `00-WHAT-CW-IS.md`, that file governs; the known differences are the list of labs, and what Maya knows and stores. Do not change its body.

## 4. Re-point

- `03-SEEDS/perception-lab.md`: it belongs to The Brain's *You* view. Check `00-FOUNDATION/Facet-Vocabulary.md` before changing its `lab` facet. The vocabulary is closed; if it has no word for this lab, do not invent one. Add a line to the seed's body and report.
- `00-BOARD.md`, thread 2, *Perception Lab*: one line saying it belongs to The Brain's *You* view, and one saying that `Spec-S3-Reading-Store.md`, the Brain bench's *deposit a number* and the Trace bench's record per road are three versions of her own numbers and are to become one. That is a note for later. Do not do it.
- `claude/Ideas-Ledger.md`: for the five entries of 12 Nov under *Other labs*, change *Where it sits* to say the cell view of The Brain, citing `Brain-Lab-Map.md`. Change a status only where the map's rulings support it: the strand itself is now ruled (it is the cell view), and so is the pond's place. The others keep their status.
- `00-STORIES-LEDGER.md`: *A Very Strange Cube* is superseded by *Professor Necker's Drawing*; say so on its line. Under *Brain series*, add a pointer to `Brain-Lab-Map.md`.
- `claude/Brain-Series-Map.md`: add `Brain-Lab-Map.md` to its `related` line, with a sentence that it is now the chapter for the You view.
- `00-FOUNDATION/The-Practices.md`: one line at its head pointing to `Brain-Lab-Map.md`, *The Practice view*. Do not change its body.
- `_msc/_mscVault/0. Claude/Practice.md` sits outside this repo. If you can reach it, add the same one-line pointer. If not, say so.

## 5. What not to do

- Do not merge `Brain-Series-Map.md` into `Brain-Lab-Map.md`. Ruled: not yet.
- Do not rewrite, tidy or shorten any file beyond what is asked.
- Do not act on the map's story list. Those are candidates.
- If anything here conflicts with `00-DECISIONS.md` or the Rulings, stop and tell Michael.

## 6. Finish

Write `claude/Report-Brain-Lab-Rulings-01.md`: what changed, file by file; what you could not do; and every reference you left. Add the board entry. Commit and push only on Michael's word.
