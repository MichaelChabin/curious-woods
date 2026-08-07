---
status: Current
role: Session ledger — bench results and the decisions they changed
date: 2026-08-05
---

# Decisions — the three graphics benches

Reported by Claude Code, 5 August. Method per `experiments/prime-tones.html`: a perceptual
question gets a bench, not an argument. **Extended by `Decisions-Fills-Aug06.md`**, which
carries the colour, lead, glass and motion work and overturns decision 10's first half.

## canvas-panes — passed decisively

32×32 — double the planned 16 — is 1024 panes and 3840 glass pieces at **2.4 ms p95, 14%
of the frame budget, zero dropped frames** under continuous pan and zoom.

Canvas is not the constraint. This confirms the plan's claim that larger maps arrive for
nothing and there is no Map Size feature to build. Phase 4 is unblocked on performance.

**Methodological note worth keeping:** the bench measures *draw time*, not frame rate.
Frame rate is vsync-clamped — it reads 60fps right up until it reads 30 — so it cannot
fail gracefully and is useless as a gate. Any future performance bench should measure the
same way.

## prime-glass — reports a real problem

With colour off and stripe order as the only channel, **6, 10 and 14 render
pixel-identical**: three panes of two equal pieces. Order says which prime came first,
never which prime it was.

So colour is currently carrying *information*, not delight. That is the weaker position
the plan explicitly hoped to avoid.

Two candidate second channels are in the bench: piece width by prime, and cutting each
piece into as many parts as its prime.

## fills-and-light — changes a settled decision

**Dimming the unselected is out.** Every procedural route to a quiet colour computes
something nobody chose: alpha over parchment gives pastel, mixing toward grey gives mud.

The replacement is two *declared* palettes — a resting one and a lit one, both derived
from the workshop's declared colour in OKLCH so hue never moves. Showing a set moves those
panes to the lit palette. **Nothing is degraded; some things get better and nothing gets
worse.** This is strictly better than what decision 10 asked for.

## The finding that ties the two together

All fifteen real palettes from `art/palettes.json` are now imported, and several — Chinese
Blue and White, Hokusai — have **fewer than six usable hues**. They cannot distinguish six
primes by colour at all, however tuned.

So the second-channel question is load-bearing for **palette viability**, not only for
accessibility. Two benches, run for different reasons, arrived at the same requirement
from opposite directions. That convergence is the strongest signal available.

---

## Amendments to the plan's settled decisions

**Decision 10, second half** — "discovery is in the light; showing a set dims everything
else" becomes **"showing a set lights its members; the rest are already at rest."** The
first half, selection-in-the-lead, is untouched.

**Decision 9** — "palettes declare their own prime colours" has no data path.
`palettes.json` is 15 palettes of `{id, name, source, description, colors}` with no prime
mapping, and prime colours live separately as 16 CSS variables. This is a **schema
addition**, not a wiring job. And since all 15 derive from artworks, the colourblind-safe
workshop is a **16th to author**, not an existing one to relabel.

**New, implied:** a second non-colour channel is now required rather than desirable. It is
what makes the low-hue palettes usable and what returns colour to delight. Decide it before
Phase 4.

## Four places the plan and the code disagree

1. The **half-pixel snapping** defect described in Phase 1 belongs to `number-theory-v1`,
   not Glass Geometry — which has no grid at all, so "everything except the grid" cannot
   describe it. The fix belongs in **Phase 3**, when the lattice arrives and creates the
   inconsistency.
2. **Three zoom clamps with two ranges**, not three. The inventory was wrong; the plan
   corrected it.
3. **Decision 8** (stripes smallest prime first) is already true in the data but
   contradicted in presentation: stripes stack vertically, and mirrored panes get
   `rotate(-90deg) scaleY(-1)`, so the same factorisation reads in a different direction on
   either side of the diagonal.
4. **`user-select`** — Glass Geometry has 15 rules but all on chrome, none on canvas or
   body. Glass Multiplication has none anywhere and has a drag gesture over text-bearing
   panes, so it is the likelier source of the Safari blue-paint.

## Status

Phase 1 has not started, per the plan's instruction to review the benches first.

---

# What is still open before Phase 4

*Reviewed 6 August against `Plan-Plane-Extraction.md` and `Decisions-Fills-Aug06.md`.
The benches have answered what they were built to answer. Three things remain, and only
one of them is a gate.*

## 1. The second channel — the gate

`prime-glass` carries two candidates (piece width by prime; cutting each piece into as
many parts as its prime) and has reported the *problem* — 6, 10 and 14 pixel-identical —
but not a *decision between them*. By the project's own method the bench should settle it
by being looked at.

The question to put to it: **with colour off, can you tell 6, 10 and 14 apart at a glance,
and does the answer survive at small pane sizes?**

Standing recommendation, to be overruled by the bench if the bench disagrees:
**subdivision, not width.** Width is an encoding — a pane says "1.4 units wide" and cannot
be read without a key, which is the same failure as colour. Subdivision is a *count*: two
is a piece cut in two, seven is a piece cut in seven, read by looking, no key. It is the
only candidate decision 6 already endorses — *panes are regions, cut and leaded exactly as
geometry cuts and leads.* Subdivision is cutting; width-by-prime is a bar chart wearing a
window. It serves i11 (measure by counting) directly.

Two things now argue for it that did not on 5 Aug. **Every piece is leaded**, so a
subdivided piece already has the machinery to show its divisions. And the fills bench
found that same-prime neighbours merge without inner cames — subdivision is that same
finding used deliberately rather than suffered.

Expected failure mode is small pane sizes, which `canvas-panes`'s detail ladder handles.

## 2. Decision 9 — half-specified now, not unspecified

The fills bench has supplied the *shape*: **a workshop declares a colour per prime**, and
resting and lit palettes derive from it in OKLCH. That is the data path decision 9 lacked.

Still owed: the `palettes.json` schema change itself (currently
`{id, name, source, description, colors}`, with prime colours living separately as 16 CSS
variables), and **the 16th workshop** — the colourblind-safe one, which must be authored
rather than relabelled, since all 15 existing palettes derive from artworks. It does not
exist yet.

Settle the channel first: if subdivision lands, the low-hue palettes (Chinese Blue and
White, Hokusai) become viable, which changes how hard the 16th workshop has to work.

## 3. Decision 8 — mirroring, now with a second consequence

Stripes are ordered smallest prime first in the data, but stripes stack vertically and
mirrored panes get `rotate(-90deg) scaleY(-1)`, so the same factorisation reads in
opposite directions on either side of the diagonal.

**The fills work makes this worse and more interesting.** Texture direction was chosen
*relative to the stacking*: pieces stack vertically, their boundaries are horizontal, and
striations run across those boundaries 70% of the time. A 90° rotation turns every
"across" into an "along" — so the mirror transform now contradicts both the stripe order
and the texture rule, and the two halves of the table would be made of different glass.

So this is not a tidiness question. **Does a pane read the same way everywhere, or does it
mirror with the table?** Commutativity is visible either way; only one keeps "a pane's
shape is its factorisation" true, and only one keeps the glass consistent. Decide before
Phase 4, not during it.

---

# Phase 1 is not blocked by any of this

Worth stating plainly, because "benches first" reads as though it gates everything. It
does not. **The benches gate Phase 4.** Phase 1 is the plane extracted from Glass
Geometry — view state, transforms, one zoom clamp, the y-up flip, save-path consolidation
— and none of it touches panes, primes, colour or stripes.

Two corrections to the Phase 1 item list, from Claude Code's reading of the code:

- **Half-pixel snapping is not a Phase 1 item.** The plan describes it as "applied to
  everything except the grid," but that describes `number-theory-v1`. Glass Geometry has
  no grid, so the inconsistency cannot exist there yet. The `snap()` audit belongs in
  **Phase 3**, when the lattice arrives and creates it. Do not hunt for it in Phase 1.
- **`user-select` splits across two phases.** Glass Geometry has 15 rules, all on chrome,
  none on canvas or body — so the Phase 1 work is as written. But Glass Multiplication has
  *zero* rules anywhere and a drag gesture over text-bearing panes, so it is the likelier
  source of the Safari blue-paint and its fix lands in **Phase 4**.

One addition to Phase 1, from the fills bench: **the came is platform-level.** Geometry's
`#777777` was chosen against light glass and becomes a lighter line at a third of the
contrast against dark panes. If both labs share leading, came colour belongs to the shared
layer with a rule that works against both, not to one lab's stylesheet.

Everything else in the Phase 1 list is confirmed against the inventory and can proceed.
