---
kind: bench
status: seed
intuitions: [i01, i03, i11, i10]
domain: [physics, music, perception, mathematics]
era: 11787
place: Wittenberg
scale: [frequency]
lab: perception
hook: Slide the pitch and watch the sand find the new quiet lines.
---

# Bench — Chladni figures, simulated

Eileen's question (30 Aug): can we simulate the sand patterns? Yes, at two levels of
honesty, and the dishonest one is good enough for the story.

**Level 1 — the bench to build.** For an idealized square plate, the standing-wave
shapes have a closed form: the (m,n) mode is sin(mπx)sin(nπy) ± sin(nπx)sin(mπy), and
the sand collects where that sum is zero. Simulate a few thousand grains that jiggle in
proportion to local amplitude and drift down its gradient; they walk to the nodal lines
and the figure assembles itself out of noise — which is what the real sand does and is
the whole show. A frequency slider crossfades between modes; grains re-walk on every
change. Vanilla JS + canvas, well within the existing stack; thousands of grains is
nothing next to canvas-panes' 3840 pieces. The grain-walk is i11 made kinetic: the
pattern is not drawn, it is *found by counting*, grain by grain.

**Level 1b — Michael's better version (30 Aug): the neighbor rule.** Instead of the
closed form, run the real numerical method, because it is child-legible. A grid of
rectangles with a number at each node; the one rule is *each node accelerates toward
the average of its four neighbors* (below average → pulled up, above → pulled down;
the overshoot is the wave). That question — am I larger or smaller than my neighbors'
average? — is the discrete Laplacian, and it is operational all the way down: a child
can run it by hand on a 5×5 grid before the machine takes over. Swap "accelerate
toward" for "move toward" and the same grid does heat spreading — one question, two
physics. Drive one edge at a chosen frequency, let the grains flee the nodes that keep
changing and settle where the value stays near zero, and the figure assembles out of
the child's own rule. Runs on the existing lattice. Prefer this to Level 1.

**Level 2 — the honest caveat, which is the story.** A real plate with free edges obeys
a much harder equation, and its true figures differ from the level-1 idealization in
exactly the way that made the Academy's prize hard: Germain's problem was that the
simple math (known since Euler for strings and membranes) does not cover a stiff plate. In grid terms: the neighbor rule simulates a *membrane*
(a drumhead); a stiff plate's rule needs the neighbors' neighbors — each node must
also peek two steps away — which is a truthful cartoon of exactly what made the prize
hard, and the bench can show both rules side by side.
A finite-difference plate sim is possible but slow and fussy, and not needed. Maya (or
the story) says plainly: this bench shows the easy cousin of the problem; the gap
between it and the brass plate is what Sophie Germain spent five years on.

**The physical version costs almost nothing** — a speaker or bowed edge, a metal plate,
sand or salt — and is the rare lab a family can repeat on the kitchen table. Postcard
potential is obvious.

Related: `02-CONSTELLATIONS/Frankenstein-11816/nodes/chladni-plates.md`,
`nodes/sophie-germain.md`; Perception Lab; Sound benches.
