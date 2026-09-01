---
status: Spec draft — 24 Aug 2026. Settled in conversation, not yet built.
  Needs a kid-voice paragraph before it goes to Claude Code (gate 3).
  Three pieces still undesigned — see Open.
role: Multiply — building a number by making a rectangle
related: 01-ACTIVE/Divide-Spec-Aug23.md,
  01-ACTIVE/Make-This-Square-Spec-Aug23.md, 00-DECISIONS.md,
  claude/Map-Tool-Catalog.md
---

# Multiply

The first of the first set, and the one that teaches the map is made of
rectangles at all. Replaces the existing multiplication tool, which is rich and
overwhelming for a reason this spec identifies and fixes.

**One sentence.** She draws a rectangle on the map and finds out how much is
inside it.

---

## The diagnosis this spec rests on

The existing tool overwhelms because **a construction gesture was producing an
interrogation answer.**

Two clicks on the axes means *I am making a product* — she chose the factors and
wants the result. Clicking a number in the field means *I am asking about this
number* — she chose the result and wants the factors. Opposite directions. The
old tool answers the second question when she asked the first, which is why it
feels rich and swamping at once. Divide and Make This Square feel clean because
they only ever answer the question that was asked.

So the gesture decides the answer, and there is no choice offered at that
moment. See `00-DECISIONS.md`, *The shelf*.

---

## The making gesture

The primary form is **one continuous stroke**:

1. Finger down on the axis. The bar follows along it, snapping to whatever
   resolution is active. The display reads the width alone — `7` — updating
   live. Not `7 × 7`; there is nothing to multiply by yet.
2. Release, or keep going. A vertical line stands at 7.
3. Move up into the field. The display reads `7 × 5`, the second number live.
   The rectangle is drawn as an **outline** and grows behind the finger.
4. Release. The rectangle **fills, row by row**, and the display becomes
   `7 × 5 = 35`, the product counting up as each row lands.

Two separate taps do the same thing — a tap is a drag of zero length — so
nothing extra is built and she never learns there were two options.

**Why outline first, then fill.** Sides are chosen; area is discovered. Keeping
the fill as a separate event after release stops the two from blurring into one
gesture, and makes the product genuinely arrive rather than having been there
all along.

**First number is x.** Not a rule she must remember — the order things happened
in front of her. Only the same-axis case needs the rule at all, since one click
on x and one on y is unambiguous by position.

**Same-axis multiplication is allowed.** 6 and 7 both from x is deliberate and
slightly odd, and it is the doorway to the pronic walk: 6×7, 7×8, 8×9, each a
quarter short of a square.

### Acceleration

Required, not optional. 7 × 5 is five rows; 40 × 60 is sixty, and she will build
those once she can pan. Most of the good comes the first time she sees it.

Follow Divide's pattern: accelerate on repetition of the same shape rather than
on a global counter, so speed tracks familiarity rather than time on the app.

### Readout

Per the cross-tool rule: the live number floats **above** the finger, on the
side the drag came from, and a second fixed copy sits in a constant corner —
the same corner in Multiply, Divide, and Make This Square.

---

## The asking gesture

She taps a number in the field. **Undesigned.** See Open.

What is settled is what it must *not* be: the old tool's everything-at-once. My
instinct is that it answers quietly — the cell lights, and how many ways exist
is available without being shouted — but that is instinct, not a decision.

---

## The flip

A separate gesture she chooses, not a step in the operation.

The copy rotates and slides onto the original, sitting **exactly** — proving
same size, by motion, with nothing claimed in words. Then it continues across
the diagonal and settles into its own cell. Same number, two homes, the diagonal
visibly the crease between them.

**On the diagonal the flip goes nowhere.** 7 × 7 rotates onto itself and stops.
There is nothing to travel to. She may notice that squares are the numbers with
only one home, which is a good thing to find out by accident.

---

## What is *not* here, deliberately

There is **no view menu**. What looked like display options are catalog tools:

| Looked like a view option | Is actually |
|---|---|
| Show both rectangles | the flip |
| Show every way to make this number | tap-a-number |
| Show unique products only | the diagonal fold |

Building them as a menu means building each of them twice.

There is also **no "choose your view the first time" preference** — it puts
state where she cannot see it, and in six weeks nobody will remember what was
picked. Divide's leftover choice works because it is a live decision about two
tiles visible in front of her. A view preference is not that.

---

## Edges

Standing principle: **edges answer in the same voice as the middle.**

| Case | Behaviour |
|---|---|
| × 1 | A strip one unit tall. Fills in a single row. |
| × 0 | A rectangle with no height. Nothing to fill. |
| stray release | Snaps to the nearest legal spot rather than cancelling. Fluent users make fewer mistakes, so cancelling puts the cost on beginners. She can also deliberately fling toward the edge to get the extreme, which is the first thing a child probing for breakage will try. |

---

## Open

Three of these are undesigned rather than merely unwritten, and the second one
is the biggest unanswered question in the first set.

- **The tap-a-number branch.** Half the tool. What appears — all four rectangles
  at once, one at a time, a count? It must not become the overwhelming thing
  that already exists.
- **What a rectangle does after it exists.** Does it stay when she builds the
  next one, so she can compare? Do they accumulate? Can she pick one up? This
  gates most of the seventeen-item catalog — if a rectangle vanishes on the next
  tap, most of those tools have nowhere to live.
- **Where the product appears.** Divide's answer is a height, Make This Square's
  is a side. Multiply's is an area, which is the hardest of the three to read
  off a picture. Does 35 look like it belongs to the rectangle, or to a panel?
- **Does the flip journey repeat every time?** Lovely once; forty animations by
  the fortieth multiplication. It is a choice rather than a step, so it may
  simply not repeat unless asked. Bench question.
- **Is a same-axis rectangle a different animal?** 6 and 7 both from x has no
  natural home, since neither was ever a height. Does it land at (6,7) like any
  other, or look different? Bench question.
- **Kid-voice paragraph.** Not written. Gate 3 unmet. To be written together
  with Divide's and Make This Square's, in one voice.

---

## Where it sits

First set of three, sharing one vocabulary — rectangle, width, height — and one
grammar for what happens to leftovers:

1. **Multiply** — this document. The map is made of rectangles.
2. **Divide** — a number restacks to a chosen width; the answer is a height.
3. **Make This Square** — a number rebuilds as a square, one L-ring at a time.

All three now have something that unfolds over time: the row fill, the
restacking, the rings. That is either a coherent family or a lot of waiting, and
it is exactly the sort of thing that reads well in a document and grates on the
fortieth use. Acceleration is the mitigation in all three.

Test for the first set: **can she do something with no instruction and get a
result worth looking at.** Nothing should need a readout she must interpret, or
require her to already believe the map is interesting.
