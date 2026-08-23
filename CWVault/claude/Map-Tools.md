---
status: Working note — Aug 19 2026
pillar: Labs (Glass Multiplication Map / Number Map)
intuitions: #1 numbers as geometry, #3 multiple representations, #11 measure by counting
related: claude/Rectangle-Tool-worknote.md, claude/Modular-Arithmetic-for-Kids.md
superseded: Map-Tool-Catalog.md is authoritative for map tools. Kept for
  history; may contain claims later corrected.
---
Tools for the Map

Ranked by patterns unlocked per sentence of explanation — Michael's stated criterion. Each tool below is explainable in one line, or obvious the first time it is used.

The organizing bet, consistent with Design-Principles ("two gestures carry everything"): a small vocabulary of tools that compose. The richness should come from combinations, not from a long menu. Five tools that pair freely beat fifteen that each do one thing.

1. Light up every cell that… — highest yield, cheapest explanation

One gesture: choose a test, and cells passing it glow.

Primes glow only along the top row and left column. Nothing in the interior, ever. That is a one-glance definition of primality: a prime has no rectangle but 1×N. Most people carry a verbal definition of prime for life; this is a picture of one.
Light every cell equal to N. They lie on a hyperbola — the same curve the rectangle-drag traces, arrived at from a completely different direction. And how many cells light up is the divisor count of N. A prime lights 2. 60 lights 12. So "which numbers are popular in the times table" is exactly "which numbers have many divisors," and she can rank them by eye. Verified: d = 6, 8, 9, 10, 12, 12, 12 for 12, 24, 36, 48, 60, 72, 96.
Light multiples of k → a regular lattice whose spacing is k.
Light cells ≡ r (mod n) → diagonal stripes.
Light the squares → the diagonal, which is also the crease of the map.

One tool, five discoveries, and it composes with everything below.

2. Wrap the numbers into n columns — the one to build next

Write 1, 2, 3, … in rows n wide, and let n be dragged.

Primes occupy very few columns. At n = 6, every prime past 3 sits in two of the six columns (verified to 2000). At n = 30, they occupy 8 of the 30 (verified to 5000). Dragging n and watching the prime columns narrow and widen is, as far as I can tell, unfairly beautiful for how little it costs to build.
Times tables mod n. Multiply by 5 mod 12 and you visit every column; by 4 and you only ever land on 0, 4, 8. The multipliers that reach everything are exactly those sharing no factor with n — the same gcd fact that decides where a square-peel bottoms out. Two unrelated-looking pictures, one cause.
Any sequence, wrapped, shows its period. Fibonacci mod 10 repeats every 60 (verified). Powers of 2 mod 7 cycle with period 3.

This single view pays for three of the best items in the modular-arithmetic note. It is the highest-value unbuilt thing on the board.

3. Hold a rectangle and drag its corner — already designed

Two locks on one gesture. Fix the beads and vary the width → the number's divisor fingerprint, and the stub is the remainder. Fix the width and vary the beads → clock arithmetic, live. Drag continuously → the hyperbola, and under it the logarithm, e, and γ. Full treatment in claude/Rectangle-Tool-worknote.md.

4. Peel squares off a rectangle — already designed

Continued fractions, the gcd as the final square, Fibonacci as the longest peel, and the golden rectangle that never closes. Also in the worknote. The strongest candidate for a collectible artifact.

5. Trace a rule

Pick a rule, draw an arrow from each number to where the rule sends it.

Points on a circle, each k joined to 2k, makes a cardioid. Change the multiplier and a family of curves appears. String art that happens to be group theory, and pretty long before it is understood.
Orbits and cycle lengths become visible as loops rather than as lists.
Leaves room for rules that are famously unsolved (3n+1) without ever saying so.

Explanation cost: one sentence. Slightly higher build cost than 1 and 2.

6. Difference the neighbours

Show how much each cell rose over the one before.

Squares differ by 1, 3, 5, 7, … and those differences differ by a constant 2. Difference again and it's flat.
How many times you must difference before it goes flat is the degree of the pattern. That is the whole idea of polynomial order, delivered by subtraction.
Ties directly to n(n+k) = (n + k/2)² − (k/2)² and the gnomon.

Cheap to build, cheap to explain, and it is the one tool here that points at calculus rather than number theory.

7. Count what you see

Not really a tool — a permission. Cells and pixels are countable, and the map should always let her count rather than be told. This is where γ comes from (see the worknote), and it is Intuition #11 and the "screen is also a ruler" principle in Design-Principles.

Composition is the point
Light-up + wrap → primes in columns.
Light-up + drag → the lit lattice points under the hyperbola, which are the divisors.
Peel + light-up-the-diagonal → why k decides the final square.
Difference + rectangle → the gnomon, visible as the strip you add.

Recommended build order: wrap at n, then light up every cell that…, then trace and difference. The rectangle and the peel already exist in design and can absorb the others as they land.