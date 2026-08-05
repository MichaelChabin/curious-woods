---
kind: question
status: warm
intuitions: [i02, i10, i11, i13]
domain: [mathematics, physics, history]
era:
place:
scale: [time, temperature, size, distance, speed, frequency, mass, count]
lab: none
hook: Everything you can measure has a when.
---

# Time-indexed quantities

> **Cut back 5 Aug 2026.** This seed originally argued a whole substrate thesis — the
> axis as the shared object, the plane as a special case, transforms as a property of
> the axis. That thesis already existed, better developed, in
> `_msc/_mscVault/5. Claude Design/1. Redesign.md`, and the instructions derived from it
> are in `01-ACTIVE/Plan-Plane-Extraction.md`. **Read those; they are authority.** What
> survives here is the one point they do not cover.

## What Redesign already settles, and settles better

The plane is the platform and labs are viewings of it. The unit is *constructed* — the
distance between two seed points — not declared by a constant. The declaration ("let this
interval be one metre") belongs to the **naming layer**, not to geometry, which is why the
same plane carries a stained-glass window and the Earth–Moon distance. Three floors, only
the pixel floor unconditional.

That is a stronger account than the one this seed was reaching for, and it dissolves the
question this seed opened about where a transform lives: **a transform is a naming-layer
property.** Linear for temperature, logarithmic for pitch, CW-offset for years. The plane
does not know. A viewing supplies the function from lattice position to meaning — decision
7 in the plan — and a scale transform is exactly such a function.

## The surviving point

Michael, 5 Aug: temperature varies with time; a cross-section of the sun looks static but
is a still frame from a four-billion-year film. Every quantity has a when. The melting
point of silica is a value on a temperature scale *and* a fact about the moment somebody
could first reach it.

So a reading is not a number. It is **a value with a time**, and a static quantity is that
with its time axis collapsed to a point.

### The consequence, which is cheap now and expensive later

Anything that stores a reading stores it timestamped, from the first one. Atlas entries are
time series that mostly hold a single point today; adding the second is then free, where
grafting time onto a static store later is a rewrite.

This converges with `S3 — the reading store` in the 5 Aug inventory, which independently
specified an append-only timestamped log per instrument. **S3 is this idea with a
filename.** The convergence is the argument: build S3 once and it serves both the child's
own acuity history and the atlas.

### Where it lands on the child

Her JND stripe is a static reading. Run it again next month and it is a time series — her
own acuity as a quantity with a history, the same species of object as the sun's
temperature, at a scale she owns. The before-and-after that makes the Perception Lab worth
building *is* the moment a reading becomes a series.

## Open

- The reading unit: `(value, time, uncertainty?)`. Uncertainty matters for the atlas — the
  melting point of silica is a range, the era of first glass is a guess — and for her own
  measurements. Decide before the first reading is stored.
- Does the atlas share S3's store, or merely its shape?
