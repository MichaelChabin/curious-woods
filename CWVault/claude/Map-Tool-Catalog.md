---
status: Live catalog — opened Aug 19 2026. Add entries; do not summarize away.
role: The working list of map tools and what each one is good for
related: claude/Map-Tools.md, claude/Fog-Map.md, claude/Rectangle-Tool-worknote.md, claude/Irrationality-on-the-Map.md, claude/Voice-Samples-Map.md
authority: Single source for map tools. See CWVault/00-DECISIONS.md.
---
Map Tool Catalog

The list of tools that can be applied to the number map, and the uses each can be put to.

How an entry gets in

Three gates. A tool or use is Draft until all three pass, then Ready.

The gesture is one sentence. If it takes a paragraph to say what she does, it is two tools.
Every claim is computed, not remembered. Densities, periods, limits, counts — run them. Record the numbers in the entry. This catalog has already caught one wrong claim in a foundational doc; it will catch more.
The kid-voice explanation exists. Written to the register in claude/Voice-Samples-Map.md. This is the real gate: if it can't be written that way, the tool isn't understood well enough to build.

Gate 3 is doing the most work. It is also the cheapest failure — a paragraph that won't come out clean costs an hour, a built tool that can't be explained costs a month.

The loop

Michael names a tool or a curiosity → Claude generates candidate uses, computes every claim, and writes the kid-voice paragraph → Michael reads the paragraph and says whether it lands → entry moves to Ready or gets cut. The paragraph is the deliverable, not the description of the paragraph.

Entries
T1 — Light up every cell that…

Gesture. Choose a test; cells that pass it glow. Status. Draft — needs voice.

Uses:

Primes glow only along the top row and left column, never the interior. A picture of what a prime is, not a definition of one.
Light every cell equal to N: they fall on a hyperbola, and the count of lit cells is N's divisor count. Verified d = 6, 8, 9, 10, 12, 12, 12 for 12, 24, 36, 48, 60, 72, 96.
Multiples of k → a lattice of spacing k. Cells ≡ r (mod n) → diagonals.
The squares → the diagonal, which is also the map's crease.

Composes with. Everything. This is the universal overlay. Intuitions. #1, #3.

T2 — Wrap the numbers into n columns

Gesture. Write 1, 2, 3, … in rows n wide; drag n. Status. Draft — needs voice. Highest-value unbuilt tool.

Uses:

Primes occupy very few columns. At n = 6, two of six (verified to 2000). At n = 30, eight of thirty: 1, 7, 11, 13, 17, 19, 23, 29 (verified to 5000). Dragging n and watching the prime columns narrow is the payoff.
Times tables mod n: ×5 mod 12 visits every column, ×4 only 0, 4, 8. The multipliers that reach everything are those sharing no factor with n — same gcd fact that governs where a peel bottoms out.
Any sequence shows its period. Fibonacci mod 10 repeats every 60 (verified). Powers of 2 mod 7 cycle with period 3.

Composes with. T1 (light-up inside the wrap). Intuitions. #3, #6.

T3 — Hold a rectangle, drag its corner

Gesture. Grab a number as a rectangle of that many squares; drag a corner. Status. Draft — designed in detail, needs voice.

Uses:

Fix beads, vary width → divisor fingerprint; the stub is the remainder.
Fix width, vary beads → clock arithmetic, live; addition mod n by dropping in beads.
Drag continuously → the hyperbola. Under it: area = N·ln(b/a), so equal areas mean equal ratios (the logarithm law, felt). Slide until the swept area equals the starting rectangle and you stop at e, for any N (verified exactly for N = 30).
Count columns instead of integrating and the gap from the smooth curve converges to γ = 0.5772156649… (verified: 0.6264 at 10 columns, 0.57722 at 100,000).
Lattice points under the hyperbola = every division she could do; total ≈ N ln N + (2γ−1)N (verified at N = 10,000: 93,668 vs 93,648 predicted).
Tangent at (a, N/a) hits the axes at exactly 2a and 2N/a — slope by pure counting, no limits. The tangent triangle has area 2N everywhere on the curve (verified at every divisor of 30).

Composes with. T1, T4. Full treatment. claude/Rectangle-Tool-worknote.md. Intuitions. #1, #3, #11.

T4 — Peel squares off a rectangle

Gesture. Cut off the largest square that fits; repeat on what's left. Status. Draft — needs voice. Strongest artifact candidate.

Uses:

The counts are the continued fraction of the side ratio. 6×5 → [1;5], 10×3 → [3;3], 15×2 → [7;2].
The last square is the gcd.
Fibonacci rectangles give the longest possible peel, all ones, and look most like the golden rectangle that never closes.
A peel that eats itself proves incommensurability. 1×√2 reproduces its own shape forever: [1; 2,2,2,…]. A proof she can watch.
k on the n(n+k) diagonal decides the alphabet of the peel, since gcd(n, n+k) = gcd(n, k). On k = 6, every rectangle bottoms out at 1, 2, 3, or 6. Forever.

Composes with. T3, T1. Full treatment. claude/Rectangle-Tool-worknote.md, claude/Irrationality-on-the-Map.md. Intuitions. #1, #4, #9.

T5 — Colour the plane by a property

Gesture. Every cell takes its colour from a rule about the number in it. Status. Ready for two uses (voice written); rest Draft.

Uses:

Largest prime factor — a plaid, because lpf(x·y) = max(lpf x, lpf y) is separable. Voice written. Rule of thumb established here: a plaid appears exactly when the colour depends on x and y through separate 1-D functions. To break the plaid, need a joint function.
gcd(x,y) — rays, not plaid. The orchard. Voice written.
Number of factors — d(n) smooth, ω(n) banded, Ω(n) mod 2 (Liouville) looks like static and hides an open question.
Möbius μ, three colours; non-zero fraction 6/π².
Grey-ramp choice matters: weight ∝ 1/p keeps gaining texture forever (Σ1/p diverges — verified 1.80, 2.20, 2.48, 2.71, 2.89 at 10²…10⁶); ∝ 1/(p log p) eventually washes pale. Log or powers-of-2 ramps beat linear.

Composes with. T2, T6. Full treatment. claude/Fog-Map.md. Intuitions. #1, #3, #11.

T6 — The orchard: stand at the origin and look

Gesture. Put yourself at the corner; a tree is visible unless a nearer tree stands on the same line. Status. Ready — voice written.

Uses:

Visible ⟺ gcd(x, y) = 1 ⟺ the fraction y/x is in lowest terms. Every visible tree is one irreducible fraction; the hidden ones behind it are the same fraction written worse.
π by counting trees. Visible fraction → 6/π². Verified 0.6083 on 600×600, giving π = 3.1406. An area count, so it converges honestly — unlike counting pixels around a circle.
A line of irrational slope hits no tree, ever. Incommensurability as a picture. See claude/Irrationality-on-the-Map.md.

Composes with. T5, T7. Intuitions. #1, #9, #11.

T7 — Add two trees (mediant / Farey)

Gesture. Pick two visible trees; add their arrows tip-to-tail; land on the tree that sits between them. Status. Draft — needs voice. Michael's Farey hunch; he is right.

Uses:

The mediant of a/b and c/d is (a+c)/(b+d) — which is just vector addition of the two lattice points. Verified: 1/3 and 1/2 give 2/5.
Doing this repeatedly generates every fraction in lowest terms, each exactly once. That tree is called Stern–Brocot; the sorted lists are the Farey sequences. F₅ = 0/1, 1/5, 1/4, 1/3, 2/5, 1/2, 3/5, 2/3, 3/4, 4/5, 1/1.
Neighbours in a Farey sequence satisfy bc − ad = 1 — verified for F₅, F₇, F₁₂, F₃₀ (279 terms). Geometrically: the triangle from the origin to two Farey neighbours contains no other tree, and has area exactly ½. So the arithmetic rule is the visual fact "nothing in between."
Continued fractions are the fast route down this tree — which links T7 straight back to T4's peel.

Composes with. T4, T6. Intuitions. #1, #3, #9.

## T8 — Change what a cell is worth

**Gesture.** One control for how wide the map is; another for what one cell is
worth.
**Status.** Draft — voice written below, needs Michael's read.

Uses:

- **The map gets emptier as it grows.** Distinct products in an n×n map,
  against the integers in range (computed):

  | n | rectangles | distinct products | share of 1…n² |
  |---|---|---|---|
  | 10 | 55 | 42 | 42% |
  | 20 | 210 | 152 | 38% |
  | 50 | 1275 | 800 | 32% |
  | 100 | 5050 | 2906 | 29.06% |

  This is the Erdős multiplication-table problem; the density goes to zero.
  Note the first column: **55 is the count of rectangles, not of numbers.** A
  foundational conversation had those confused, which is gate 2 doing its job.

- **The map gets fuller as the cells get finer.** Integers 1–100 reachable on a
  10-wide map (computed):

  | grain | reachable |
  |---|---|
  | 1 | 42% |
  | 1/2 | 63% |
  | 1/3 | 66% |
  | 1/4 | 73% |
  | 1/5 | 77% |
  | 1/10 | 100% |

  Tenths finish it because any n is (n/10) × 10. Thirds barely beat halves —
  66 against 63 — because thirds only help numbers already friendly with 3.
  The grain that helps you depends on what the number is made of, which is T5
  arriving from a new direction.

- **Numbers arrive.** 11 is unreachable at integer grain on a 10-wide map. It
  arrives at half grain as 5.5 × 2. 22 arrives instead by widening the map to
  20. Two different ways to admit the same number.

- **The two settings can produce the identical grid.** A 10-wide map at tenths
  and a 100-wide map at integers are the same 100×100 lattice of cells — same
  pixels, same picture. One holds 100% of its numbers, the other 29%. Nothing
  changed but what the cells were declared to be worth. This is the entry's
  strongest use and the reason it is a tool rather than a preference.

- **1/3 never lands.** No grain of tenths, hundredths, or millionths produces a
  side of exactly one third. Refining forever stays wrong. Incommensurability
  as a place on the map you cannot reach — which hands off to T4 and T6.
  Michael's reading: this is a fact about base ten, and argues eventually for a
  base-six map. Open problem there is symbols, not arithmetic — 101 does not
  look like five.

**Composes with.** T1, T3, T5. Sets the substrate every other tool runs on.
**Intuitions.** #3, #11.

### Voice

Every square on this map is two numbers multiplied. Across the top, 1, 2, 3,
and so on. Down the side, the same. Where they cross, the answer.

Make the map ten by ten and there are a hundred squares. But there aren't a
hundred different answers in them. There are 42. The rest are repeats — 12
shows up as 2 × 6 and as 3 × 4, and 6 shows up twice as well.

So 58 numbers between 1 and 100 are not on the map at all. 11 isn't. 13 isn't.
22 isn't, and 22 isn't even prime — it's 2 × 11, and 11 is off the edge.

Now make the map bigger. A hundred wide, ten thousand squares. You'd think it
fills in. It doesn't. It gets worse: 2,906 different answers out of 10,000
possible numbers. 42 out of every 100 became 29 out of every 100. The bigger
you make it, the rarer it is to be a product of two things.

There's another way to go, though. Leave the map ten wide and change what a
square is worth. Make each one a tenth instead of a whole. Now the sides can
be 5.5, or 2.3, or 7.9.

11 turns up straight away: 5.5 × 2.

Keep going and every number from 1 to 100 turns up, all hundred of them,
because any number you like is just a tenth of it times ten. The map that was
42 out of 100 is now 100 out of 100. Same size map.

Here's the part I'd sit with. A map ten wide with tenth-sized squares has 100
squares across. A map a hundred wide with whole-sized squares also has 100
squares across. They are the same grid. Same lines, same crossings, same
picture on the screen.

One of them holds every number in its range. The other holds 29 out of every
100.

Nothing changed except what you decided a square was worth.

---

## T9 — Hold the perimeter

**Gesture.** Fix the amount of fence and drag; the shape changes and the area
changes with it.
**Status.** Draft — voice written below, needs Michael's read.

Uses:

- **Area peaks at the square.** With half-perimeter 16 (computed): 1×15 = 15,
  2×14 = 28, 3×13 = 39, 4×12 = 48, 5×11 = 55, 6×10 = 60, 7×9 = 63, 8×8 = 64.
  Same fence, four times the field.

- **The sibling of T3, and they touch.** T3 fixes the area and the perimeter
  bottoms out at the square; T9 fixes the perimeter and the area tops out at
  the square. T3's corner traces a hyperbola (xy = N); T9's traces a straight
  line (x + y = P/2). Two constraints, opposite curves, meeting at the same
  point. The square is where both stop wanting to move.

- **A correction to record, and it matters for the interface.** The idea that
  a constant-area drag could *settle* into √N by perimeter friction does not
  survive computation. For N = 53 (√53 = 7.2801), perimeter at x = 7 is 29.143
  against a minimum of 29.120 — **0.077% above minimum while a full 0.28 away
  from the root**. The well is far too shallow to feel. The usable signal is
  the **difference between the sides**, |x − N/x|: 0.571 at x = 7, 0.161 at
  x = 7.2, 0 at the root. Sharp, roughly linear, and it reaches zero rather
  than flattening. **If the square is to be findable by feel, drive the feel
  from side difference, not perimeter.** Gate 2 caught this; it was asserted
  confidently in conversation before it was computed.

- The square root arrives as a *place the shape wants to be* rather than a
  button. No notation required to find it, and n² and √n sit on the two sides
  of the same rectangle.

**Composes with.** T3 (its dual), T4.
**Intuitions.** #1, #11.

### Voice

Say you have 32 metres of fence and you want to put a field inside it.

Make it long and thin — 1 metre by 15 — and you get 15 square metres. Try 2 by
14 and you get 28. Keep going. 3 by 13 is 39. 5 by 11 is 55. 7 by 9 is 63.

8 by 8 is 64.

Same fence every time. You never bought more. But the square field is more
than four times the size of the thin one, and it's the biggest you can do. Go
past it and you're just repeating yourself backwards — 9 by 7 is the 7 by 9
you already had, turned sideways.

There's an opposite version. Instead of holding the fence still, hold the
field still. Say you want exactly 53 square metres, no more, no less. Now drag
the corner and watch the fence.

1 by 53 needs 108 metres of fence. 7 by 7.571 needs 29.14. Somewhere in there
the fence gets as cheap as it's ever going to get, and again it happens when
the two sides are the same.

They're not the same, though. 53 isn't a square. The two sides get closer and
closer as you drag and they meet at 7.2801 — and that number keeps going after
the 1, forever, and never repeats.

That's the square root of 53. You didn't look it up. You dragged until the
sides matched.


Why none of this was in anyone's schooling

Worth recording, because it will come up with every adult who sees it.

These are pictures without procedures. Curricula are organized around procedures that can be set as exercises and marked, and a picture that produces understanding but no homework problem has nowhere to live. The material also falls between floors: too elementary for a number theory course, too unfamiliar for arithmetic. And most of it is only cheap to draw on a screen — before that, every one of these images was hours of hand plotting for a single instance, when the whole point is being able to change n and watch.

Not a conspiracy. A gap that opened because the tools arrived after the syllabus was set.