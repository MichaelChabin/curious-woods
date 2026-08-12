---
status: Current
role: Session ledger — the fog sketch, and a scoping amendment to the color ruling
date: 2026-08-12
---

# Decisions — the fog map, and what color is allowed to mean

Short session. One artifact committed, one standing decision amended, one standing
practice added.

---

## The color ruling is scoped, not repealed

**What stood.** On 8 August the Phase 4 design note was reviewed and overruled on one
point: **no second channel — color is the sole prime indicator.** Recorded as a standing
principle, with the consequence that the colorblind-safe workshop becomes the
accessibility answer and its quality is load-bearing. That consequence is unchanged and
still owed.

**The problem the fog map surfaced.** The fog viewing shades every piece by the *rank of
its largest prime factor*. Color there does not name a prime at all; it names a
magnitude. Read globally, the 8 August ruling forbids it — color would be monopolised by
prime identity everywhere, forever, and every future viewing that wants to say something
else with color would be illegal before it was designed.

That reading is too strong, and it was never what the ruling was for. It was made to stop
a *second* channel competing with color **inside the default Multiplication view**, where
color's job is to let a child read a factorisation.

**The amendment, deliberate:**

> **Within any one viewing, color means one declared thing.** A viewing states what its
> color axis carries and carries nothing else — no smuggled second meaning, no channel
> quietly doing double duty. In Multiplication that declared thing is prime identity, and
> nothing may compete with it.
>
> **Across viewings, the child assigns color to the question she is asking** — and
> *choosing is the point*. Prime identity in one, magnitude in another, one spotlit prime
> in a third. The plane holds still; what color answers is hers to set.

**This supersedes the global color-monopoly reading.** It does not weaken the ruling
inside the view it was made for.

**The default Multiplication view is unchanged.** Color is prime identity; there is no
second channel; the 16th workshop is still the accessibility answer and still unbuilt.

**Why this is the better shape.** The 8 August ruling and the viewing architecture were
in tension, and the tension was invisible until something tried to use color for
something else. A per-viewing declaration keeps the discipline exactly where it earns its
keep — one meaning at a time, in front of the child — while leaving the platform able to
ask more than one question. It also gives the fog map, the spotlight-a-prime idea, and
the child-chosen ramps a legal home without any of them needing a special case.

---

## Standing practice: every session ends with a git status check

From now on, **every session ends by running `git status` and reporting anything
untracked**, whether or not that session created it.

This is cheap and it is not hypothetical. On 2 August five vault documents turned out to
have no recovery path because they had never been added. On 5 August the entire vault
restructure — the board itself, the facet vocabulary, all of `03-SEEDS/`, and 23 salvaged
artifacts — sat untracked for a day. Both were found by accident.

The check is `git status`, and the verification for any specific file is **`git ls-files`,
not `git log`** — `git log` on a directory returns commits and reads as reassurance while
the named files are absent from every one of them. That is precisely how 2 August
happened.

Reporting is part of the practice. An untracked file that Claude notices and does not
mention is the same as one nobody noticed.

---

## The artifact

`cw-deploys/experiments/fog-map.html` — a standalone canvas sketch, gray by largest prime
factor, saturating at the 256th prime, panning to a million with hover factorisation and
a far-corner readout. Self-contained, no external references, zero console errors.

It does **not** stand on the plane and is not the port; it exists to be looked at. The
seed it belongs to is `03-SEEDS/smoothness-fog.md`, whose status is unchanged — still
cold — and which grew a session section today: the phrase *constructable infinity — a
rule plus a window*, landmark overlays as viewings, and five parameter candidates.

**Publish handling, and a discrepancy worth knowing.** The instruction was
`cw-deploys/experiments/`, with the same handling as the Jankó pages — experimental, not
for public reach. Those two differ in one way that matters: the Jankó instruments live in
`prototypes/`, **outside** the Netlify publish directory, so they are not reachable at
all. Anything inside `cw-deploys/` is served. The fog map is therefore committed at the
named path and **deliberately not linked from `experiments/index.html`** — unadvertised,
but reachable by URL. If genuinely-unreachable was meant, it is one `git mv` to
`prototypes/`.
