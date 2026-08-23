---
status: Working note — Aug 19 2026, revised same day. Not settled design.
pillar: Labs (Glass Multiplication Map / Number Map)
intuitions: #1 numbers as geometry, #3 multiple representations, #11 measure by counting
superseded: Map-Tool-Catalog.md is authoritative for map tools. Kept for
  history; may contain claims later corrected.
---
The Rectangle on the Map

A working note. Michael and Claude, Aug 19. Nothing here is decided.

The move

A number on the multiplication map can be held as a rectangle of that many squares, and its corner can be dragged. The beads never change — only the container does. That one rule covers everything below.

Do it in place. The rectangle stays on the map rather than detaching to a scratch space. This matters more than it first appears. A rectangle running from the origin out to (x, y) covers x·y cells — so its area in cells is the number printed at its own corner. The multiplication table is a table of areas. Almost nobody who memorized that table ever saw this. Working in place also means every structure on the map is available at once: the hyperbola becomes a set of lit cells, the k-diagonals are lines she can drag along, and commutativity is a reflection across the square diagonal.

Open tension: in place, the rectangle covers cells whose printed values are other products, while its own value is the count of unit squares. Two kinds of number on screen at the same time. Might be rich, might be confusing. Needs testing.

The two drags are duals

Fix the beads, vary the width. Drag 30 to width 7 and you get four full rows plus a stub of 2. The width is the modulus; the stub is the remainder. Across all widths the stub sequence is a fingerprint of the number, and the widths where it vanishes are exactly the divisors. Primes look obviously different.

Fix the width, vary the beads. Now the stub cycles 0,1,2,3,4,5,6,0,1,… That is clock arithmetic, visible as an actual repeating thing. Stub of 4, drop in 5 beads, stub becomes 2 — she has done 4 + 5 ≡ 2 (mod 7) with nobody saying the word. Multiplication follows from repeating the rectangle. This is the door to cyclic groups, Fermat's little theorem, and most of cryptography, standing on a stub of leftover squares.

Same gesture, opposite thing held. Worth building as one mode with a lock.

Peeling — a verb, not a mode

Cut the largest square off a rectangle. Repeat on what's left. The counts at each stage are the continued fraction of the side ratio. This is Euclid's algorithm made visible.

6×5 → one 5×5, five 1×1. [1; 5]
10×3 → three 3×3, three 1×1. [3; 3]
15×2 → seven 2×2, two 1×1. [7; 2]

Two things fall out free. The last square is the gcd — 6×4 ends on 2×2. And it terminates only because the sides are commensurable; a golden rectangle spirals forever. That is the rational/irrational split delivered by a gesture instead of a sentence.

Peeling is a property of a rectangle, not of N, so it should work on any rectangle however she made it. Which argues for letting her add and remove beads freely.

The link to n(n+k)

Any rectangle n×(n+k) is a square plus a strip. Peel the square and you hold n×k — a square plus a strip again. The peel is n(n+k) run on its own leftovers.

Since gcd(n, n+k) = gcd(n, k), the diagonal a rectangle sits on determines which final squares are possible for every rectangle on that diagonal, forever. On k=6: only 1, 2, 3, 6. On k=1: always 1, always in exactly two moves, [1; n]. So k does two jobs — the size of the bite in n(n+k) = (n + k/2)² − (k/2)², and the alphabet of the peel.

Choosing k to be the previous n gives Fibonacci: every step yields exactly one square, [1;1,1,…], the longest possible peel for the size, and the rectangles that look most like the golden one that never closes. The hardest rectangles and the prettiest are the same rectangles. Findable by dragging.

The hyperbola, and the area under it

Fix the area at N and drag the corner continuously; the corner traces xy = N. Michael's question: is there a relationship between N and the area under that curve?

Yes, and it is one of the best things on this page.

Area under the curve from x = a to x = b is N · ln(b/a).

Three consequences, in increasing order of how much they should be built.

1. Equal areas mean equal ratios. Sliding from 1 to 2 sweeps the same area as sliding from 2 to 4, or 4 to 8 — each is N·ln2 ≈ 0.693 N. Multiply the width, add a fixed slab of area. That is the logarithm law, felt as a physical fact before it is a rule. This is also, historically, how logarithms were discovered — the hyperbola came first.

2. e is findable by a ten-year-old. Slide out from x = 1 until the area swept under the curve equals the area of the rectangle you started with. You stop at x = e. Always. It does not matter whether the rectangle was 30 or 104 or 7 — the answer is 2.718…, every time. A transcendental constant, discovered by counting pixels and comparing to a rectangle she made herself. Verified: area from 1 to e under xy = 30 is exactly 30.

3. The pixels are not an approximation problem — they are the point. Michael is right that pixel resolution makes the curve discrete and countable, and right that this bounds the extremes. But counting columns gives Σ N/x, which is N times a harmonic number. And H(M) − ln(M) converges:

M = 10 → 0.6264 M = 100 → 0.5822 M = 1,000 → 0.5777 M = 10,000 → 0.57727 M = 100,000 → 0.57722

That limit is γ, the Euler–Mascheroni constant, 0.5772156649…, one of the genuinely mysterious numbers in mathematics — nobody knows if it is even irrational. The gap between her pixel count and the smooth curve is γ, and it appears because of the discreteness, not in spite of it. Intuition #11 exactly: measure by counting, refine to converge.

And it closes the loop back to the stub. Counting lattice points under xy = N column by column gives floor(N/x) in column x — which is precisely "how many full rows of width x," the ragged-rectangle mode. The leftover in each column is N mod x. So the area under the hyperbola, counted honestly, is the sum of every division she could do. That total is ≈ N ln N + (2γ − 1)N — the Dirichlet divisor problem, an open research area at the fine end. Checked: N = 10,000 gives 93,668 lattice points against a predicted 93,648.

So the same picture holds the modulus drag, the divisor fingerprint, the logarithm, e, and γ. That is not four features. It is one.

The artifact

Candidate: the peeled rectangle itself. A rectangle cut into colored squares is beautiful before it is understood. No two alike — 40×64 looks nothing like 41×64. Named by its continued fraction. The wall of them is the real artifact; kids collect.

Kept in reserve: the remainder trace across all widths, the lit lattice points on the hyperbola, a whole diagonal peeled at once, and "how far out until the area equals my rectangle" as a shareable result.

Open
How a peel gets named; what makes a kid want a forty-first.
Peel by hand (she cuts each square) or on request (the rectangle unfolds). Michael: both, depending. By hand for one rectangle she cares about; unfold for comparing a row.
The two-kinds-of-number tension when working in place.
Most children arrive through a story with the other tools hidden. The map should still be this deep underneath.