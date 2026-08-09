---
kind: mechanic
status: warm
intuitions: [i01, i02, i05]
domain: [mathematics]
era:
place:
scale:
lab: number-theory
hook: the map that refuses to go dark
---

<!-- Facets corrected against Facet-Vocabulary.md, 9 Aug 2026: the draft's
     provisional values were kind: idea (not a value — `mechanic`, matching
     subdivision-viewing.md, since a viewing is a representational mechanic),
     intuitions i1/i2/i5 (zero-padded to the closed codes), domain: number
     (→ mathematics), lab: multiplication (→ number-theory). -->

# The fog map — smoothness in grayscale

A viewing, not a workshop. Recolor every prime piece by rank in gray: 2 is white,
and the shade deepens with each later prime toward black. Tile the map exactly as
the port tiles it. Ask nothing else.

**What appears.** A pale field stretching in every direction, because almost
everything is made of small primes — half of all pieces anywhere are 2s. Darkness
is rare and singular: a number has at most one prime factor above its own square
root, so no pane carries more than one truly dark piece. Dark arrives as isolated
threads inside bright panes (166 = 2 × 83: a white sliver under one charcoal band),
and the purest blacks live along the edges where big primes sit naked in 1×p panes.

**Panning outward, the fog darkens — absurdly slowly.** The average size of prime
factors grows at nearly the slowest rate mathematics has. A child panning for
minutes feels the map refusing to go dark while inky flecks scatter through it
like pepper. What she is looking at has a name — the distribution of smooth
numbers, the largest-prime-factor function — but the picture needs no name: big
numbers are mostly built from small stuff, and a large prime hiding inside an
ordinary number is a rare, striking event.

**The poster.** Print the map to 500 × 500 at about 1.5 mm per pane and the
structure takes over from the panes. Every prime row and column is a dark stripe
running the full width — every number in row 83 contains 83's near-black piece —
while composite rows blend into the fog. The stripes' irregular spacing *is* the
prime gaps; twin primes are tight dark pairs; where two stripes cross sits the
darkest knot on the map, the semiprimes. Perfect diagonal symmetry, caught
instantly at poster distance. The weave deepens toward the edges — the fog's slow
gradient, printed. At that scale render one computed gray per pane (lightness from
the largest prime factor's rank does most of the work), no leading. It reads as a
textile scan until you get close, which is the right trap for a curious child.
A sharable, beautiful object that is secretly the prime number theorem.

## Why it is not a workshop

With hundreds of grays, neighboring primes are indistinguishable — it fails the
read-the-factors job the colored workshops do. It answers a different question:
not *which* primes, but *how big*. A magnitude viewing on the same panes and the
same tiling. This is the viewing architecture doing what it was built for.

## Why it waits

Needs nothing but the shipped port plus a grayscale palette function and (for the
poster) an offscreen render at fixed extent. No new objects.

## One beat

The beat is the refusal: *pan as far as you like — the map stays pale, and the
dark stays rare.* The stripes-as-prime-gaps reading, the semiprime knots, and the
printed poster are the artifact's own discoveries, not the pitch.
