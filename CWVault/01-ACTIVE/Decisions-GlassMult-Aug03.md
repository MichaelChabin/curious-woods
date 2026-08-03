# Decisions — Glass Multiplication, 3 August 2026

Session ledger. Decisions are settled unless marked Open. Supersedes nothing;
extends `Decisions-GlassMult-Jul28.md` and closes one item left Open there.

## Settled

**Octave equivalence — resolved in favour of the octave.** 11 takes C an octave
above 2, 13 takes E an octave above 3, in the same glass instrument. This was the
one item the July 28 ledger marked Open and told us to test before committing.
Tested: a child can distinguish C from C′. The pitch collision is real — verified
at exactly 2.000× the frequency — and it does not cost us the distinction. It also
leaves room to grow, since the next primes continue the same construction rather
than needing a new idea. The shape of the prime table is no longer blocked.

**How it was settled: a bench, not an argument.** `experiments/prime-tones.html`
plays four candidate schemes against the four primes that already exist, with the
lab's own audio chain lifted verbatim so the test sounds like the thing it is
testing. Comparison pairs put 2 and 11 back to back; a set of numbers hears them
inside a factorisation. **The method generalises: a perceptual question gets a
bench, not a discussion.** Build the smallest thing that can be listened to or
looked at, keep it out of the lab, and decide from it. The bench stays in
`experiments/` as the record of how this was decided.

**Timbre is reserved, not spent.** The bell voice built for this test turned out
not to be needed — pitch alone carried 11 and 13. That is the useful result: timbre
remains an unclaimed dimension. The vocabulary it establishes:
**pitch carries identity, timbre carries category.** Timbre is how a number sounds
like a *different kind of idea*, not a different number. Nothing uses it yet, and
whatever claims it first sets the convention, so spend it deliberately.

**Sound has a ceiling, and it is close.** Sound stops earning its keep past 13, or
19 at the most. The applications are factoring, and children rarely factor larger
numbers. So `primeInfo` should be generalised to a table that comfortably reaches
19 — not to an open-ended scheme. Design for a handful more primes, not for
generality. This bounds v2.2 and everything after it, and it means the primes work
is small; **the Map Size control is the expensive half of v2.2, not the primes.**

**Vault documents are tracked in git.** Five were untracked, so an overwrite had no
recovery path. The trap: `git log -- CWVault/01-ACTIVE/` returns commits, which
reads as reassurance while the specific files are absent from all of them. When a
document matters, confirm it with `git ls-files`, not `git log`.

## Code state at the close of v2.1b

`cw-deploys/active/glass-multiplication.html` — 821 lines. Four style blocks in
cascade order: `v2-construction-style`, `v2-a-style`, `v2-1-style`, `v2-1b-style`.
Append, never rewrite.

The three places v2.2 will press:
- `factorize` hardcodes `[2,3,5,7]` in **two** places.
- `primeInfo` is a literal keyed 2/3/5/7 carrying midi, note name and pan. This is
  the table to generalise — to 19, per the ceiling above.
- **27 lines** carry a hardcoded 10: grid template, loop bounds, the `/10` in the
  drag math, and the came SVG's `viewBox="0 0 10 10"`. This is the real cost of the
  Map Size control.
- The `>100` ceiling is already gone; it left with `hasReachableEmpty` in v2.1b.

## Open

Carried forward from July 28, unchanged:

- **Queue items** — state or idea only. Parked with the practice work.
- **Maya's unasked-for door** — the rule for offering a story nobody requested.
  Needs writing before it needs code.

New:

- **What claims timbre first.** Reserved above, unassigned. Worth deciding before
  something claims it by accident.
- **The v2.2 handoff does not exist yet.** It can now be written: the octave answer
  was the thing blocking it.
