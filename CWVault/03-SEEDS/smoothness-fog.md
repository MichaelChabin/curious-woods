---
kind: mechanic
status: parked
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

*A curiosity, recorded for later — not an input to current design.*

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

---

## Session growth — 12 Aug 2026

A working sketch now exists: `cw-deploys/experiments/fog-map.html`. It is not the
port and does not stand on the plane — a standalone canvas, gray by largest prime
factor, saturating at the 256th prime, panning to a million. It exists to be
looked at. Status is unchanged: still cold.

### The phrase that came out of it

**Constructable infinity — a rule plus a window.** The map is not stored and is
not large; it is a rule, and what she has is a window onto it. Nothing is
precomputed and nothing runs out. That is a different feeling from a big table,
and it is the honest description of what the plane has always been. Worth keeping
whether or not this viewing is ever built.

### Landmark overlays, as viewings rather than decorations

The fog is a field with no landmarks, which is most of why it reads as fog. Laying
a known structure over it turns the same picture into a place:

- **The squares diagonal as a spine.** It runs corner to corner and is the one
  line a child already knows how to find. Everything else can be described
  relative to it.
- **The pronics beside it.** `k(k+1)` sits immediately off the diagonal — the
  near-miss line, and the reason the diagonal is not lonely.
- **Doubling as an exponential lattice.** Powers of two are a coarse grid over a
  linear one, so the same window carries two scales at once. This is the one most
  likely to be worth building on its own.

Each is a *viewing* laid over the fog viewing, not a feature of it. Which is the
architecture doing what it was built for, again.

### Parameters worth having, if it is ever built

Recorded as candidates, none decided:

- **Saturation point** — where gray bottoms out. Fixed at the 256th prime in the
  sketch; making it movable changes how fast the fog appears to darken, which is
  the whole subject.
- **Smallest instead of largest** prime factor. A different map entirely: the
  smooth numbers become the dark ones. The inverse picture of the same fact.
- **Count the pieces** rather than rank them — shade by number of prime factors
  with multiplicity. Ω(n) instead of P(n).
- **Spotlight a prime.** Pick one and light only its multiples; the stripe the
  poster shows becomes something she chose.
- **Child-chosen fog colors.** Gray is one ramp. Letting her pick the two ends is
  the smallest possible version of the color ruling below — she assigns color to
  the question she is asking.

### The ruling this seed provoked

Working on it surfaced a scoping problem with *color is the sole prime indicator*,
which the fog viewing appears to violate. It does not. See
`01-ACTIVE/Decisions-Fog-Aug12.md`: within one viewing color means one declared
thing; across viewings the child assigns it to her question.
