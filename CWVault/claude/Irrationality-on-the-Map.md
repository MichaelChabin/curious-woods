---
status: Working note — Aug 19 2026
pillar: Labs (Glass Multiplication Map / Number Map)
intuitions: #1 numbers as geometry, #9 evidence and proof, #11 measure by counting
related: claude/Rectangle-Tool-worknote.md, Design-Principles.md
---
Irrationality, Without the Memorized Proof

Michael's question: is there a picture of incommensurability better than the standard classroom proof? Yes — two of them, and one already lives in the rectangle tool.

The rays, corrected

Draw a ray from the origin through every lattice point below the diagonal. Each ray crosses the vertical line x = 1 at height n/m.

Those heights are the rationals, not the irrationals. A lattice point is by definition a ratio of whole numbers, so a ray through one can only ever name a rational. The rays paint every rational in [0,1], densely, and never once land anywhere else.

Which is the point, arrived at from the other side. The irrationals are exactly the heights no ray ever reaches. A line of irrational slope leaves the origin and misses every lattice point in the infinite plane, forever — no whole number of steps across ever lines up with a whole number of steps up. That is incommensurability, geometrically, and it is a picture rather than a manipulation.

Michael's instinct that "where the diagonal and the grid meet there will always be gaps" is right. The gaps are the whole subject.

Same picture as the fog-map. A lattice point (x, y) is visible from the origin — not hidden behind a nearer point on the same ray — precisely when gcd(x, y) = 1. So the ray construction and a gcd-coloured coordinate plane are one object seen twice. See claude/Fog-Map.md, where counting the visible points yields π.

What the staircase can't do

The staircase from corner to corner has length 2 for any grid, however fine, and whether or not the sides are commensurable — because you always travel exactly 1 across and 1 up whatever route you take. It is blind to the distinction, so it cannot demonstrate it.

Two true facts about grids and diagonals that are not the same fact. Worth keeping separate in any story that uses them. (The staircase's own lesson — that shapes can converge while lengths don't — is now written up under "The screen is also a ruler" in Design-Principles.md.)

The proof that is already in the tool

Peel squares off a 1 × √2 rectangle. One square comes off, then two, and what remains is a smaller rectangle of exactly the same shape. Peel again: one, then two, then the same shape again, smaller. It never terminates, because it cannot — it keeps reproducing itself.

√2 = [1; 2, 2, 2, 2, …], forever.

So:

a peel that stops means the two sides are commensurable, and the last square is their common measure (the gcd);
a peel that eats itself means they never share a measure at all.

That is a proof a ten-year-old can watch happen, on a tool built for another purpose. It is also, very likely, how the Greeks actually found it — the method is old enough to have its own name, anthyphairesis, and it predates the algebraic argument by centuries.

The golden rectangle is the same story with the simplest possible peel: [1; 1, 1, 1, …], one square every time, forever.

Design implications
The peel tool should accept a rectangle whose sides are dragged, not typed — so she can land on √2 by accident and watch it fail to close.
It should visibly mark self-similarity: when the leftover is the same shape as what it came from, say so. That recognition is the proof.
Do not name the result first. "It stops" and "it doesn't" are the two outcomes; the words rational and irrational can arrive much later, as labels for something she has already seen happen.
Worth adding later

Tennenbaum's proof of √2's irrationality is a pure square-and-overlap picture with infinite descent — no algebra at all — and would fit this toolset almost without modification.