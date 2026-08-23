---
status: Working note — Aug 19 2026
pillar: Labs (fog-map bench tool)
intuitions: #1 numbers as geometry, #3 multiple representations, #11 measure by counting
related: claude/Map-Tools.md, claude/Irrationality-on-the-Map.md
---
Fog-Map: Why the Plaid Is the Math

Michael's fog-map colours an unbounded coordinate plane by the multiples of the first 256 primes, each prime a darker grey. It looks like a plaid that changes at every zoom level. His question was whether the plaid is meaningful or merely decorative.

It is meaningful. Two facts explain almost everything visible.

(All figures below verified by computation, Aug 19.)

1. Why it is a plaid at all

A plaid appears exactly when a cell's colour depends on x and y only through separate one-dimensional functions combined pointwise — f(x) against g(y). Vertical stripes from one, horizontal from the other, and the crossings make the weave. In the language of the map: a plaid is a rank-one picture.

The current colouring qualifies, and so does most of what Michael proposed. Largest prime factor is a good example: lpf(x·y) = max(lpf x, lpf y), which is separable, so it plaids — and beautifully. Rendered at 512×512 it is far richer than the grey version.

So the answer to "are there other colourings that make different plaids" is yes, endlessly — every interesting one-dimensional sequence generates one. That is a real design lever, not a gimmick.

To break the plaid you need a genuinely joint function — one that can't be split into an x-part and a y-part. gcd(x, y) is the important one, and it produces rays through the origin instead of a weave. That is a second visual family, and it is where the deepest content lives (below).

2. Why the texture never runs out at any zoom

The multiples of the nth prime have density 1/p_n. Euler proved that Σ 1/p diverges — so no matter how far out she zooms, new primes keep adding fresh visible ink and the pattern never settles into uniformity.

But it diverges like log log, which is unimaginably slow:

up to 100 → 1.80 up to 1,000 → 2.20 up to 10,000 → 2.48 up to 100,000 → 2.71 up to 1,000,000 → 2.89

Ink forever, but almost none of it at a time. That is precisely the "changes at every level of zoom without flooding" that Michael noticed. The picture is a portrait of a theorem.

Design consequence for the grey ramp. Whether the plaid stays crisp under unlimited zoom depends on how weight is assigned to the nth prime:

weight ∝ 1/p → total ink diverges; the map keeps gaining texture forever.
weight ∝ 1/(p log p) → total ink converges; deep zooms eventually wash pale.

Michael's "new shade every 2ⁿ-th prime" and "natural-log ramp" are both sensible: they spread ~256 primes across roughly 8–12 visually distinct shades, which is about what an eye can hold. Powers of 2 give a cleaner banding; log gives a smoother gradient. Both are better than linear, which wastes almost the whole ramp on primes too sparse to see.

3. The best thing available here: π by counting

Colour cells by whether gcd(x, y) = 1. The fraction that are coprime tends to 6/π² ≈ 0.60793. Measured: 0.6085 on a 400×400 field, 0.6083 on 600×600 — giving π ≈ 3.138 and 3.1406.

A child can find π by counting coloured cells on a plane of whole numbers. No circle involved. And because it is an area count, it converges honestly — unlike counting pixels around a circle's edge, which converges to the wrong number (see "The screen is also a ruler" in Design-Principles.md). This is the clean route to π that the corrected principle asks for.

The same 6/π² shows up again if she colours the squarefree numbers — measured 0.60796. Two different countings, same strange constant, and π appearing where no circle is.

And it is Michael's ray picture. (x, y) is coprime exactly when it is visible from the origin — not hidden behind a nearer lattice point on the same ray. So the gcd colouring, the orchard of visible points, and the 3 a.m. rays-through-lattice-points construction are all one object. See claude/Irrationality-on-the-Map.md.

4. Colouring by number of factors

Michael's first option, unpacked into three different pictures:

d(n), the divisor count — smooth-ish, highlights the highly composite numbers. Ties directly to the "light up every cell equal to N" tool in Map-Tools.md, where the count of lit cells is d(N).
ω(n), distinct primes — coarse, banded, easy to read.
Ω(n) mod 2, two colours — this is the Liouville function, and it looks like static. That appearance is the content: whether it stays balanced in the long run is genuinely deep water. Pólya conjectured it never tips one way; he was wrong, and the disproof needed a counterexample far out of sight. A two-colour picture that looks like noise and is an open-ended question is a good thing to have on the wall.
Möbius μ, three colours (zero if a square divides it, else ±1) — the non-zero fraction is 6/π² again.
5. Why the rollover matters

The mouse-over showing a number and its factorisation is what turns the picture from wallpaper into a place. Every pixel is addressable and has a reason. A child who notices a suspicious diagonal can ask three cells what they are and find out. That single affordance is what makes an infinite plane explorable instead of merely large.

Summary of what to build
Keep the grey ramp logarithmic; make the ramp function a visible choice.
Add the gcd colouring — it is a different visual family, it holds π, and it unifies with the irrationality work.
Add largest-prime-factor as the flagship plaid. It is the prettiest thing here and costs almost nothing.
Add Ω mod 2 as the "looks like noise, is an open problem" picture.
Keep the rollover on always.