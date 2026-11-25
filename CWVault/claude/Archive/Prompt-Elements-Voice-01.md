---
status: Written 23 Nov 2026, for Michael to paste into Claude Code. One prompt for the whole of that evening's work on Elements batch 01: the corrections of editor pass 11, then the told-aloud voice, then the pointers to the new ruling. Not yet run.
role: The single Claude Code step that brings Elements-Batch-01.md, its ledger, the inbox, Prose-Standard.md and Story-Voice.md up to date. When Michael says it is committed, this file is archived.
related: Editor-Pass-11-02.md, Elements-Told-Aloud-02.md, Ruling-Voice-01.md
---

# Prompt: Elements batch 01, corrections and voice

Paste everything in the block.

> Read `CWVault/00-BOARD.md`, then these three pages in `CWVault/claude/`: `Editor-Pass-11-02.md`, `Ruling-Voice-01.md` and `Elements-Told-Aloud-02.md`. Ignore `Editor-Pass-11.md` and `Elements-Told-Aloud-01.md`; each was replaced the same night by the file numbered 02. The work is in three parts, in this order, and one commit.
>
> **Part 1, the corrections.** Carry out the prompt at the foot of `Editor-Pass-11-02.md` in full: every change under its *Changes to earlier files* for `Elements-Batch-01.md`, `Elements-Ledger.md` and `Pool-Inbox.md`, exactly, in the rendering and in the JSON record alike. Do its checks. Do not commit yet.
>
> **Part 2, the voice.** In `Elements-Batch-01.md`, replace each of the ten `words` again, this time with the text under that element's heading in `Elements-Told-Aloud-02.md`, from the first line under the heading down to, but not including, the line that begins *Added:*. Do it in the rendering and in the JSON record, so the two say the same thing: a blank line in the rendering is `\n\n` in the JSON. Change no other field in Part 2; every `rulers_words`, `age_words`, `line` and number stays as Part 1 left it. Then:
>
> - To each entry's *Checked* line, and to its record's `checks` verdict, add: "Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md."
> - To carbon's, add as well: "Tennant's paragraph corrected from his paper (Phil. Trans. 1797), opened 23 Nov 2026: several small diamonds, a gold tube closed at one end, a strong red heat for about an hour and a half, the gas measured by its bulk."
> - To the end of the batch file's status line, add: " Words rewritten in the told-aloud voice on Michael's word, 23 Nov 2026 (Ruling-Voice-01.md; text in Elements-Told-Aloud-02.md)."
> - In `Elements-Ledger.md`, in the Batch 01 table, add to carbon's last cell: " That the carbon rises to the star's outer layers before it is shed is from the editor's knowledge; no source opened." Under *Batch 02*, add at the end of its paragraph: " Words are written told aloud, by Ruling-Voice-01.md, with Elements-Told-Aloud-02.md as the model; about 250 to 300 words, as a guide."
>
> Check afterwards that the JSON block parses, that it holds ten records with the same keys as before, that every `state` is "approved", and that each `words` has the same number of paragraphs and the same text as its entry in `Elements-Told-Aloud-02.md`. The 150-to-250-word check in Part 1's prompt applies after Part 1 only; after Part 2 the words run from about 255 to 400, and that is intended.
>
> **Part 3, the pointers.** In `CWVault/claude/Prose-Standard.md`, directly under the heading "# How Curious Woods prose reads", add this paragraph: "*Amended 23 Nov 2026 by Ruling-Voice-01.md. The test is whether it is read. A told-aloud voice is wanted, word counts are guides, and the voice is never finished. Where this page and that one differ, that one wins.*" In the same file, at the end of the list under "## Read the models first", add: "- *Carbon* and *Oxygen*, told aloud (`Elements-Told-Aloud-02.md`). A reference entry that opens on its strangest true thing and comes back to it at the end." In `CWVault/claude/Story-Voice.md`, directly under the heading "# How a Curious Woods story is written", add: "*Amended 23 Nov 2026 by Ruling-Voice-01.md: the test is whether it is read, and a told-aloud voice is wanted. Where this page and that one differ, that one wins.*" Change nothing else in either file.
>
> If `cw-deploys` holds a built Elements lab or a `data/elements.json`, rebuild it from the records and read each entry in place; on 23 Nov 2026 neither existed, so if that is still so, say so and build nothing. Do not invent wording: if an old string or a heading is not found, stop and report it. Update the board and MANIFEST in the same commit. Report what you changed, with the word count of each `words`, then commit and push only on Michael's word.

## Not in this prompt, because Claude Code cannot reach them

- The `cw-story` skill. The new SKILL.md was sent to Michael in the chat of 23 Nov.
- `Schema-Elements.md`, `Lab-Elements.md` and `Prompt-Elements-Entries.md`, which are in the project only. Their changes are listed in Editor-Pass-11-02.md; add to them a pointer to Ruling-Voice-01.md and, in the schema, "about 250 to 300 words, as a guide" for `words`.
- The Pool Desk's ten element cards and its questions card.
- The project's copies of `Elements-Batch-01.md` and `Elements-Ledger.md`, once the vault's have changed.
