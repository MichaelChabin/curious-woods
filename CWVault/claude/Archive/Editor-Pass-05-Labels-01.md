---
status: checked. An addition to Editor-Pass-05.md, 17 Nov 2026, by Claude, on Michael's word the same day. It does not replace that page; the two are applied together. Michael's ruling: Hazen's names for the early Earth (the Big Thwack, Black Earth, Blue Earth, Grey Earth) were borrowed with his organisation, which does not fit Curious Woods. He hoped colour and informal names would make the periods memorable in a book read once. We speak to her often, so a label can simply say what happened, and the associations are built by what she meets there. *Moon forms* and *Oceans form* were already his labels; this page finishes the job. The two new labels, *Crust forms* and *Oldest rock*, are Claude's choice and Michael may overrule them.
role: The label changes that follow from dropping Hazen's names, for Events-Deep-01.md, with the prompt for Claude Code that covers both pages.
---

# Editor pass 5: the Hazen names

## The page for Michael

Four events in batch 1 carried Robert Hazen's chapter names. Two already have your labels. After this page none of his names is a label, a heading, or a line in her text.

| Was | Label now | Whose |
|---|---|---|
| Big thwack | *Moon forms* | yours, already |
| Blue Earth | *Oceans form* | yours, already |
| Black Earth | *Crust forms* | mine, new |
| Grey Earth | *Oldest rock* | mine, new |

*Crust forms* sits in a row with *Moon forms* and *Oceans form*: three things that happened, in order. *Oldest rock* sits beside *Oldest grains*, and it is what the event is: the oldest rock that survives.

Two sentences come out of her text: "Robert Hazen calls this time Black Earth." and "Robert Hazen calls this time Blue Earth." Each gave her a name she would never meet again here. *Oceans form* now ends on the zircon count, "About one in twenty is older than four billion years", which is a better ending.

Hazen himself stays where he is a source: his count of minerals in *Oldest grains* and *Red rocks*, and his book in the references, for a parent.

One thing I did not touch: the thirty periods link to these events by their old names (*Black Earth*, *Blue Earth*, *Grey Earth*, *Moon formed*). The old names stay in the store as aliases, so the links still land, and no period's words change.

## Changes to earlier files

Old words first, new words second. Apply these after the changes of Editor-Pass-05.md, which finds its entries by the old headings.

### Events-Deep-01.md

**3. Big thwack.** The heading "## 3. Big thwack" becomes "## 3. Moon forms". The label stands. In the references, `chapter "The Big Thwack". The label is his.` becomes `chapter "The Big Thwack". For a parent.`

**4. Black Earth.** The heading "## 4. Black Earth" becomes "## 4. Crust forms". "**Label:** Black Earth" becomes "**Label:** Crust forms". In the More, cut the one-line paragraph "Robert Hazen calls this time Black Earth." In the references, `chapter "Black Earth: the first basalt crust". The name.` becomes `chapter "Black Earth: the first basalt crust". For a parent.` The More falls by seven words; it must still be 250 or more.

**5. Blue Earth.** The heading "## 5. Blue Earth" becomes "## 5. Oceans form". The label stands. In the More, cut the last paragraph, "Robert Hazen calls this time Blue Earth."

**6. Grey Earth.** The heading "## 6. Grey Earth" becomes "## 6. Oldest rock". "**Label:** Grey Earth" becomes "**Label:** Oldest rock". No change to the More.

In each of the four entries' notes, add: "17 Nov 2026 (Michael): Hazen's names dropped; see Editor-Pass-05-Labels-01.md. The old name is kept as an alias for links."

**The ladder.** The status line of Events-Deep-01.md gains, after the line Editor-Pass-05 adds: "Hazen's names dropped, 17 Nov 2026 (Editor-Pass-05-Labels-01.md)."

## For Claude Code

This prompt replaces the one in Editor-Pass-05.md.

> Read `CWVault/00-BOARD.md`, then `CWVault/claude/Editor-Pass-05.md`, then `CWVault/claude/Editor-Pass-05-Labels-01.md`. First apply every edit under *Changes to earlier files* in Editor-Pass-05.md exactly, to `CWVault/claude/Events-Deep-01.md` and `CWVault/claude/Events-Deep-02.md`: the words, the Watch lines, the additions to notes and Checked lines, and the two status lines. Then apply the changes in Editor-Pass-05-Labels-01.md to Events-Deep-01.md: four headings, two labels, two sentences cut, two reference lines, the notes and the status line. Change no other label. Do not invent wording: if an old string is not found exactly once, stop and report it. Before changing the four headings, check whether `tools/deep-events-from-vault.py` or the store makes an event's id from its heading or label. If it does, keep each event's existing id, and say how you did it. Keep the old names (*Big thwack*, *Black Earth*, *Blue Earth*, *Grey Earth*, and *Moon formed*) as aliases, so that every link from the periods and plots still lands; do not rewrite any period's or plot's words. Report any other event in the store already labelled *Crust forms* or *Oldest rock*. Recount each changed summary and More, by the way each file already counts, and correct the counts in their headings; every More must be 250 to 350 words and every summary 20 to 40, and if one is not, stop and report it. Rebuild the deep-time events store with `tools/deep-events-from-vault.py`, as Prompt-Pool's Events insert names, and say what changed in the store. Open the Time Machine and read each changed entry in place: *Oldest grains*, *Gathering*, *Moon forms*, *Crust forms*, *Oceans form*, *Oldest rock*, *Bombardment*, *Kenorland*, *Cyanobacteria*, *Short days*, *Oxygen alone*, *Rust*, *Bangiomorpha*, *Rodinia cracks*, *Snowball one*, *Snowball two*, *The thaw*. Open the period *Molten* and tap each event named in it, to confirm the old names still open the right events. Report, without changing anything, which period or periods the store lists *Cyanobacteria* (2,500 Ma) and *Nuna* (1,800 Ma) under, since each sits exactly on a period edge. Update the board and MANIFEST in the same commit. Report, then commit and push only on Michael's word.

## How this was done

The old strings were copied from Events-Deep-01.md as read on 17 Nov 2026. The counts after the cuts, on top of Editor-Pass-05's changes: *Crust forms* 313 words, *Oceans form* 338. Whether the build keys an event on its heading I do not know, which is why the prompt asks Claude Code to look before it renames.
