---
status: Spec draft — 23 Aug 2026. Settled in conversation, not yet built.
  Needs a kid-voice paragraph before it goes to Claude Code (gate 3).
role: Make This Square — square roots by construction, on the number map
related: 01-ACTIVE/Divide-Spec-Aug23.md, claude/Map-Tool-Catalog.md, 00-DECISIONS.md
---

# Make This Square

The third of the first set, and the sibling of Divide. Same grammar: pick a
number, watch it come apart, watch it be rebuilt into a shape, decide what to
do with what's left over.

**One sentence.** She picks a number and it rebuilds itself into the largest
square it can make, one L-shaped ring at a time.

**Why it earns a place.** Michael has run this with children on paper. They
find the odd numbers quickly and generalise to any number on their own,
unprompted. That is observed behaviour rather than a computed or argued claim,
which makes it the strongest evidence in the vault for any tool. What has never
been tried is doing it for arbitrary numbers — that is what this tool adds.

---

## Sequence

1. She picks a number on the map. Say 18.
2. It becomes a rectangle, which dissolves into a cluster of square tiles.
3. One tile glides to the corner. Labelled **1**.
4. Three more glide down and wrap around it in an L. Labelled **3**.
5. Five more do the same. Then seven.
6. She now has a 4 × 4 square and **2 tiles left over**.
7. **Stop here.** Do not proceed automatically.

Step 7 is the tool. Four is too small, five is too big, and there is no whole
number in between. That is the entire question, and it should be allowed to
sit there until she does something about it.

## What's left over

She chooses, exactly as in Divide:

**Leave it.** Two tiles beside a 4 × 4 square. Exact, and honest.

**Decimals.** Each leftover tile slices into ten rows and ten columns. Two
tiles become 200 small ones. The square's side is now 40 small tiles, so the
next ring is 81, then 83 — still consecutive odd numbers, in the new unit.
They run out with 36 left, at side 42, which reads **4.2**.

Ask again and the 36 become 3,600 smaller ones: rings of 841, 843, 845, 847,
stopping at side 424, which reads **4.24**, with 224 left.

Then: *this can go on as long as you like, but the tiles will be too small to
see.* The side is shown as √18 ≈ 4.24…, and the area as 18 ≈ 4.24².

All verified: √18 = 4.242641.

---

## The missing third option

Divide offers three: Remainder, Fractions, Decimals. This tool can only offer
two.

There is no fraction that squares to 18. Not a hard one, not an ugly one —
none. So if the two tools are built to look deliberately alike, the gap where
the Fractions button should be is the difference between rational and
irrational, sitting in the interface where she can find it without a word being
said.

**Put nothing there.** No greyed-out button, no explanation, no tooltip. Two
options where the other tool had three.

---

## Decisions, with reasons

**The refinement is her choice, never automatic.** Originally drafted as
automatic. Changed because the moment worth having is step 7 — no whole number
fits — and an automatic slide into tenths skips it in about half a second. Also
keeps the grammar identical to Divide.

**The rings stay visibly L-shaped.** The odd count should be something she can
see rather than read.

**The odd numbers are never named.** She finds 1, 3, 5, 7 and predicts 9. Then
the grain changes and it is 81, 83, 85 — still consecutive odds, in the new
unit. The rule survives a change of world, and she gets to guess right twice
rather than be told once.

**Nothing animates over the top of a child who is about to guess.** Direct
consequence of the observed behaviour above: if she is reaching for the next
odd number, the tool must not supply it first.

**Perfect squares announce themselves by finishing.** 16 uses 1, 3, 5, 7 and
has nothing left. No definition needed — it is the one that comes out clean.

**Non-integers are handled by T8, not by a special case.** 17.24 does not break
into whole tiles, which contradicts the atom story before the tool starts. The
fix is that the tool inherits its grain from the map: set the map to tenths and
17.24 is 1,724 tiles of side 0.1, all whole. It then runs exactly as before,
from 1, 3, 5, 7 upward, stopping at side 41 tiles — 4.1 — with 43 left. One
dependency instead of one exception.

---

## Edges

Same standing principle as Divide: **edges answer in the same voice as the
middle.**

| Case | Behaviour |
|---|---|
| 1 | One tile. Finished immediately, side 1. |
| 2 | Ring of 1, then nothing fits. Left with 1. In decimals: 21, 23, 25, 27 → side 1.4, 4 left. Then 281 → 1.41. An early, cheap irrational. |
| 0 | A square with no tiles. |
| perfect square | Finishes clean, no leftover, no choice offered. |

Fewer edges than Divide, because it takes one number rather than two.

---

## Open

- **Whether it should know about T3.** The constant-area drag also finds √18,
  by settling into the shape. This one builds it ring by ring. Same number, two
  completely different routes. Unknown whether a child meeting both finds that
  satisfying or confusing. Worth a bench.
- **Whether the tools are ever seen at once.** Michael's assumption is no.
  Affects how loud the missing Fractions button can be.
- **Kid-voice paragraph.** Not written. Gate 3 unmet; does not go to Claude
  Code yet. Same debt outstanding on Divide.

---

## Verified

Computed, not remembered.

```
18   →  1, 3, 5, 7            side 4     left 2
     →  81, 83                side 4.2   left 36
     →  841, 843, 845, 847    side 4.24  left 224      √18 = 4.242641

2    →  1                     side 1     left 1
     →  21, 23, 25, 27        side 1.4   left 4
     →  281                   side 1.41  left 119      √2  = 1.414214

16   →  1, 3, 5, 7            side 4     left 0        exact
```
