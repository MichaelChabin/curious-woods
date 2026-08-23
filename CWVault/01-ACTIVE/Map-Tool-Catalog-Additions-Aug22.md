---
status: merged — Aug 23 2026. T8 and T9 appended verbatim to the Entries section
  of CWVault/claude/Map-Tool-Catalog.md. Both entries are still Draft there,
  pending Michael's read of the voice paragraphs. The "sum the contents"
  candidate below is NOT merged and stays live here.
role: Additions to the Map Tool Catalog (T8, T9)
related: claude/Map-Tool-Catalog.md, claude/Rectangle-Tool-worknote.md,
  claude/Voice-Samples-Map.md
---

# Map Tool Catalog — additions, 22 Aug

Two entries. Both came out of a session on the multifunction rectangle tool
and neither is in the catalog or the worknote.

A third candidate — **sum the rectangle's contents** (origin-anchored blocks
total the sum of cubes, always a perfect square: 4×4 → 100) — is held back at
Michael's instruction. It may be a use under T1 rather than a tool of its own.

**Note on the catalog itself:** `Map-Tool-Catalog.md` does not exist anywhere
under `_CW` or `_msc`. It lives only as a Project upload, so it is not in git
and this vault cannot see it. Same class of problem as the five untracked
documents found on 2 Aug. Needs a decision: migrate into the vault, or accept
that the catalog is a Project artifact and say so in its frontmatter.

---

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
