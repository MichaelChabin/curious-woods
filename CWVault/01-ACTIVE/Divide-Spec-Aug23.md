---
status: Spec draft — 23 Aug 2026. Settled in conversation, not yet built.
  Needs a kid-voice paragraph before it goes to Claude Code (gate 3).
role: Divide — the first division tool on the number map
related: claude/Map-Tool-Catalog.md, 00-DECISIONS.md
---

# Divide

The first division a child meets on the map. One of several possible pictures
of division; chosen first because the answer stays a physical thing.

**One sentence.** She picks a number, sweeps a bar to choose a width, and
watches the number restack itself into that many stacks — the answer is how
tall the stack gets.

**Why this one first.** Multiplication on this map produces an area. Division
here produces a height. Both are lengths and areas on the same plane, so the
two operations stay in one world instead of becoming separate rituals with
separate notations. Nothing has to be read before she starts.

---

## Sequence

1. Map is clear.
2. She picks any number on the map. It becomes a rectangle; that number is its
   area. A fraction appears with the area as numerator.
3. The cursor becomes a **vertical measuring bar**, with an arrow at its left
   pointing toward it. Sweeping moves it. The denominator updates live as it
   moves — she reads 20/3, 20/4, 20/5 under her hand before committing to any.
4. Click sets the width.
5. The rectangle disintegrates into unit tiles.
6. The tiles restack along the axis, animated, row by row. The readout reads
   `n + remainder/width`, with n incrementing as each row completes.
7. If there is a remainder, she chooses how to handle it.

## The three remainder choices

**Remainder.** Leftover tiles sit on top of or beside the completed rows.
Exact.

**Fractions.** Leftover tiles are cut into as many slices as there are stacks,
and each stack takes its share. Remainder 3 across 5 stacks: cut into fifths,
three slices deep on each. Exact, and the stack closes flush.

  The slice thickness is **not a choice** — the divisor is the denominator.
  The shape she has already built dictates the cut. Nothing to select, nothing
  to explain.

**Decimals.** Leftover tiles are cut into tenths and stacked. Repeat as needed.
When it will not close: *these slices are too thin to show on your screen, so
20/7 = ~2.85…*

---

## Decisions, with reasons

**The answer is a height, never a printed result.** She reads how tall the
stack got. This is what keeps division and multiplication in the same world.

**The divisor is chosen by sweeping a bar, not by tapping a number.** A tap
says *pick a number*; a bar says *choose a width*, and a width does not care
what the grain is. The same gesture works at integers, tenths, hundredths —
one gesture surviving a change of world. It also gives her twenty divisions in
ten seconds and lets her watch the height fall as the width grows, which is
the pattern *between* divisions and the thing no one-problem-at-a-time lesson
can show.

**The bar snaps to whole units at first.** A first tool needs a floor: every
place the bar can stop should produce something legible. Continuous has no
floor — she could land on 20 / 2.7 in the first four seconds and meet
something the tool cannot yet explain. Snapping also makes the sweep feel like
counting. Unlocked later by zooming far enough that whole units are wide on
screen, so fractional divisors arrive when she goes looking for them rather
than by hand-tremor.

**Decimals is not labelled "approximate" before she has used it.** A warning is
teacherly and gives away the ending. She picks Decimals, the stack visibly
fails to close, and the message arrives as a report of what happened. Only
afterwards does the button carry a mark — and only when the division actually
doesn't terminate. 20 ÷ 8 closes exactly at 2.5, and marking that approximate
would be a lie.

  Which divisions close is then a findable pattern: eighths always, quarters
  always, sevenths never, thirds never. The reason is what the divisor is made
  of — 2s and 5s close, anything else does not. The prime-factor colour
  language arrives inside division without being sent for.

**Fractions are exact and decimals often are not, and the interface should
carry that rather than say it.** The fraction stack closes, flush and
finished. The decimal stack visibly runs out of road. Presented as a flat menu
of three, decimals would look like the grown-up option and the other two like
training wheels — the reverse of the truth.

**Animation accelerates per repeated divisor, not globally.** The twentieth
division of a new number still deserves its animation; the fourth division by
7 does not. Speed should track familiarity with the shape, not time on the app.

**When the division comes out even, she is standing on a cell of the
multiplication map.** 20 ÷ 4 stacks to exactly 5, and that stack is the 4 × 5
rectangle the other tool would have built. Highlight it and say nothing. Same
rectangle, arrived at backwards.

---

## Edges

Standing principle: **edges answer in the same voice as the middle.** No
special cases, no error messages, no cheerful apology. The machinery runs and
produces something coherent. A child probing for what breaks is doing
mathematics, and the tool's answer is either "you found a hole" or "you found
the shape."

| Case | Behaviour |
|---|---|
| ÷ 1 | Every tile in one stack. The rectangle stands on its edge; the answer is its own area. |
| ÷ itself | One tile deep, height 1. The flattest possible rectangle. |
| ÷ 0 | The bar has zero width, so there is nowhere to put the tiles. They sit undistributed. Not an error — a visible failure to proceed, rectangle intact. |
| divisor > dividend | 3 ÷ 5: no rows complete, readout starts at `0 + 3/5`, the whole operation is the remainder step. Consistent with everything else, and arguably the clearest picture of a fraction in the tool. |

The ÷ 0 case is handled by the geometry rather than by code — a consequence of
choosing the bar over the tap, not a rule anyone wrote.

---

## One tension, to be staged rather than avoided

Disintegration turns area into count. The tiles become atoms — which is right
for Remainder and for Fractions, and is then contradicted when Decimals slices
those atoms into tenths. What a tile *is* gets redefined mid-operation.

Not fatal, possibly the best moment in the tool, but it should be deliberate:

- **Fractions** cuts by the divisor — free, and dictated by the shape she
  built.
- **Decimals** always cuts by ten — forced, and imported from outside the
  problem. Nothing about seven stacks suggests cutting into ten.

The forcing is where base ten becomes visible as a decision rather than a fact.
Michael's related note: this argues eventually for a base-six map, where the
arithmetic is easy and the symbols are the problem.

---

## Open

- **Continuous bar.** Would make 20 ÷ π reachable. Either a wonderful thing to
  stumble into or a mess; undecided, and deferred behind snapping.
- **Whether the measuring bar is recognisably the same instrument as T3's
  constant-area drag.** T3 drags a corner and both sides trade off; Divide sets
  a width and reads a height. Same hyperbola from opposite ends. If the
  instruments look related, division and factorisation stop being separate
  topics.
- **Whether acceleration state is stored** between sessions.
- **Kid-voice paragraph.** Not written. Gate 3 is unmet, so this does not go to
  Claude Code yet.

---

## Where it sits

Proposed first set of three, sharing one vocabulary — rectangle, width, height:

1. **Make a rectangle** — the inverse gesture; how she learns the map is made
   of rectangles at all.
2. **Divide** — this document.
3. **Tap a number** — after a sweep she will want to know what else that number
   is; every rectangle it can make.

Everything else in the catalog is a variation on holding one of those three
words still.

Test for the first set: **can she do something with no instruction and get a
result worth looking at.** Nothing in the first set should need a readout she
must interpret, or require her to already believe the map is interesting.
