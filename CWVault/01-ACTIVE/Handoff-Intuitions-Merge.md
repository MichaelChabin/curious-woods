# Handoff — merge the intuition notes into CWVault

**Written 2026-08-05. For Claude Code. Mechanical, low-risk, do it in one pass.**

## The situation

Two numbered lists of intuitions existed and looked like a conflict. They are not one.
`CWVault/00-FOUNDATION/The-Intuitions.md` (seventeen) is a **strict superset** of
`_msc/_mscVault/1 CW/Goals and Strategies/Intuitions/` (fifteen, one file each). The
fifteen-item folder is the earlier draft. Michael's instruction: keep everything from
both, merge overlaps, and let CWVault hold the comprehensive version.

Nothing needs deleting and nothing is in dispute. This is a move plus a renumber plus a
small merge of open questions.

## Renumbering map

`i01`–`i09` unchanged. Then:

| old | new | name |
|-----|-----|------|
| — | i10 | Modeling and Simulation *(exists only in the master)* |
| — | i11 | Measure by Counting, Refine to Converge *(exists only in the master)* |
| i10 | i12 | Dense Unfamiliar Text |
| i11 | i13 | Historical Sweep |
| i12 | i14 | Civilizations Think Differently |
| i13 | i15 | Holding a Worldview |
| i14 | i16 | Process Over Product |
| i15 | i17 | Not-Yet-Knower |

## What to do

1. **Create `CWVault/00-FOUNDATION/intuitions/`** and move the fifteen per-intuition files
   into it, renamed to the new numbers above. Work on copies; leave the mscVault originals
   in place until Michael confirms, then stub that folder with a pointer.

2. **Create the missing per-intuition files** — `i10`, `i11`, and now `i18`–`i21` —
   following the same structure as the others (why it matters / at MIT it shows up as /
   seeds for ten-year-olds / notes that touch this / open questions). Source their content
   from the corresponding sections of `The-Intuitions.md`, which are already substantial.
   i11 in particular carries the pixel-counting material and the link to *the screen is
   also a ruler* in `Design-Principles.md`. **i18–i21 were added 5 August 2026** — the four
   questions the old folder held open, answered yes. The list is now twenty-one.

3. **Fix internal wikilinks.** The files cross-reference each other as `[[i09 Proof and
   Why]]` and similar. Every link to a renumbered file needs updating. Search the whole of
   CWVault, not just the new folder.

4. **Merge the two Open Questions files.** The master's three are about the list's
   structure (#16 doing double duty, #17 as sibling versus substrate, the
   cognitive/cultural balance). The folder's four — making, computational thinking,
   collaboration, attention — are **all now answered yes** and became i18–i21 on
   5 August. Record them as resolved with their outcome rather than deleting them; the
   reasoning matters. Note also that the folder's "should modeling be its own intuition?"
   is answered — it became i10 — and its "is not-yet-knower foundational?" is answered the
   same way the master answers it: both, sibling and substrate.

   **Two questions the additions raise, to carry forward as newly open:**
   - The balance note in the master says 11 cognitive / 6 cultural. That is now stale and
     the two-part division no longer covers the list — i18–i21 sit outside both halves.
   - i20 (attention) is explicitly a substrate rather than a sibling, the same as i17.
     Two substrates in a flat list is the point at which the list probably wants a
     foundational tier. Held open, not decided.

5. **Do not renumber `The-Intuitions.md` itself.** It is already correct and is the
   authority. The per-intuition files are expansions of it, not replacements.

## What not to do

Do not attempt to reconcile prose differences between a per-intuition file and the
corresponding section of the master. Where they differ, the per-intuition file usually has
*more* — seeds for ten-year-olds, its own open questions — and that extra material is the
reason for the merge. Keep both; the master stays the spine.

## Why this matters more than it looks

Seed facets in `03-SEEDS/` reference intuitions **by number**. That indirection was chosen
so renaming the prose would be free. With two live numberings it did the opposite: `i11`
meant *historical sweep* in one vault and *measure by counting* in the other. Once this
merge lands there is one numbering and the indirection works as intended.
