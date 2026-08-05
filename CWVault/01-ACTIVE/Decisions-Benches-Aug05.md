---
status: Current
role: Session ledger — bench results and the decisions they changed
date: 2026-08-05
---

# Decisions — the three graphics benches

Reported by Claude Code, 5 August. Method per `experiments/prime-tones.html`: a perceptual
question gets a bench, not an argument.

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

Phase 1 has not started, per the plan's instruction to review the benches first. Two of
three have reported; `fills-and-light` is still being worked.
