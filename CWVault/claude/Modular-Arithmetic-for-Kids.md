---
status: Working note — Aug 19 2026
pillar: Labs (Glass Multiplication Map / Number Map)
intuitions: #1 numbers as geometry, #3 multiple representations, #6 pattern → rule
related: claude/Rectangle-Tool-worknote.md, claude/Map-Tools.md
---
Modular Arithmetic a Ten-Year-Old Can Actually Have

Modular arithmetic is unusually kid-accessible because it needs no algebra — only counting and patience. What follows is sorted by how soon she can have it. Items marked [TOOL] are ones the rectangle-on-the-map already produces for free; [TOOL+] needs a small addition; unmarked items need something else, usually a story or a paper-and-pencil moment.

All numeric claims below verified by computation, Aug 19.

Day one

Clock and calendar. What day is it in 100 days? That is mod 7, and she already half knows it. The honest entry point. [TOOL] — this is exactly the fixed-width drag: lock the container at 7, add beads, watch the stub cycle 0,1,2,3,4,5,6,0,…

Casting out nines. A number leaves the same remainder mod 9 as the sum of its digits, because 10 ≡ 1 (mod 9) and so does every power of 10. She can check any addition or multiplication instantly. It's a magic trick that also explains why the divisibility rules she may already have been handed are not arbitrary. Elevens work the same way with alternating sums, because 10 ≡ −1 (mod 11). Not from the tool. Needs place value on screen, not squares. Possibly its own small toy.

What digits squares can end in. Square 0 through 9, look at the last digits: only 0, 1, 4, 5, 6, 9 ever appear. So no square ends in 2, 3, 7, or 8. Ten calculations, a permanent fact, and her first taste of a proof by exhausting the cases. [TOOL] — the square diagonal of the map, read mod 10.

Patterns she can discover by filling in a table

Times tables mod n. Multiply by 5 mod 12 and you hit every number; multiply by 4 and you only ever land on 0, 4, 8. The multipliers that reach everything are exactly those sharing no factor with n. This is the same gcd fact that governs where the square-peel bottoms out — two very different pictures, one cause. [TOOL+] — needs a "wrap the row at n" view of the map.

Powers. 2, 4, 8, 16, … mod 7 goes 2, 4, 1, 2, 4, 1 — period 3. Mod 5 it goes 2, 4, 3, 1 — period 4. The cycle length always divides one less than the prime. That is Fermat's little theorem, findable before anyone names it. [TOOL+] — repeated doubling of the rectangle under a fixed width.

Repeating decimals. 1/7 = 0.142857… with period 6, and that period is the cycle of powers of 10 mod 7. 1/13 also has period 6; 1/17 has period 16. And 142857 × 2 = 285714, × 3 = 428571 — the same digits rotated. Fractions and remainders turn out to be one subject. Not from the tool. Wants a division-by-hand moment, or its own toy.

Fibonacci mod 10 repeats every 60 terms. Verified. Nobody expects this, and a patient child can find it with a strip of paper. (The general fact is called the Pisano period, but she does not need the name.) Not from the tool.

The beautiful pictures

Circle string art. Put n points around a circle, draw a line from each k to 2k. Doubling mod n produces a cardioid. Change the multiplier and a whole family of curves appears. This is the strongest shareable artifact in the list — it is string art that happens to be group theory, and it is pretty long before it is understood. [TOOL+] — needs a "trace a rule" gesture. See Map-Tools.md.

Primes live in very few columns. Rewrap the counting numbers into 6 columns and every prime past 3 sits in exactly two of them (the 1s and the 5s) — verified out to 2000. Rewrap into 30 columns and they occupy 8 of the 30: 1, 7, 11, 13, 17, 19, 23, 29 — verified out to 5000. The number of allowed columns is Euler's totient, though again she does not need the word. [TOOL+] — this is the same "wrap at n" view as the times tables, which is a strong argument for building that one view.

Out in the world

Check digits. Barcodes, ISBNs, and credit-card numbers all carry a digit computed mod 10 or mod 11 so that a mistyped number fails the test. She can verify one off a cereal box in about a minute. This is the "grown-ups actually use this" moment, and it is real rather than decorative. Not from the tool. Excellent story hook.

What this suggests for the map

Three of the richest items above — times tables mod n, powers and their cycles, and primes-in-few-columns — all want the same single new view: wrap the counting numbers into n columns and let n be dragged. That is one gesture with one sentence of explanation, and it pays for three of the best patterns on this page. It should probably be built before anything else here.