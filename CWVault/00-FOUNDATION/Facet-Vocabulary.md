---
status: Authoritative — the closed vocabulary for seed facets
role: Makes the seed graph queryable. Amend by procedure, never ad hoc.
established: 2026-08-05
---

# Facet Vocabulary

Ideas in this project are not a list. They are notes carrying **facets**, and the
connections between them are *queried*, not authored. Nobody maintains a link saying
Montparnasse relates to the Lumière brothers. Both notes say `era: 11895`, and the
question "what else is 1895" answers itself.

The discipline that makes this work: **a facet must be a permanent property of the
thing itself.** 1895 is permanently 1895. Sand melts at the temperature it melts at.
Hand-authored links rot within months; facets do not rot at all.

## The rule

Facet **values** are closed — only what is listed below. Facet **prose** (`hook`,
`note`) is free. A seed with a value not on these lists is a malformed seed, and any
chat that notices one should say so.

## Amendment

The lists are meant to grow, but by procedure, not by improvisation.

1. Propose the value in session, with the seed that needs it.
2. Michael approves.
3. Append it to the table here, with the date and the one-line reason.
4. Never rename or delete an existing value — a rename orphans every seed using it.
   Deprecate instead: mark it `(deprecated YYYY-MM-DD → replacement)` and leave it.

A chat may propose. Only Michael approves. Adding a value silently is the failure
mode this whole document exists to prevent.

---

## `intuitions` — required, one or more

> **RESOLVED 2026-08-05.** Two numbered lists existed and appeared to conflict. They do
> not: the seventeen-item list in `The-Intuitions.md` is a **strict superset** of the
> fifteen-item folder in `_msc/_mscVault/1 CW/Goals and Strategies/Intuitions/`. The
> fifteen-list is the earlier draft — its own `Open Questions.md` still holds *"should
> modeling be its own intuition?"* open, and `The-Intuitions.md` answers yes (≤10) and
> then adds *measure by counting* (≤11) on 23 April. Nothing on either list is dropped.
>
> **The seventeen-item numbering below is authoritative.** Seeds written so far already
> use it and need no audit. The fifteen-item folder is superseded; its per-intuition
> content is being merged into CWVault — see `01-ACTIVE/Handoff-Intuitions-Merge.md`.
> Renumbering map for anything citing the old scheme: i01–i09 unchanged, then old i10→i12,
> i11→i13, i12→i14, i13→i15, i14→i16, i15→i17.

From `The-Intuitions.md`. Referenced by number so renaming the prose costs nothing.

| Value | Short name |
|-------|-----------|
| `i01` | numbers as geometry, geometry as numbers |
| `i02` | functional thinking |
| `i03` | multiple representations |
| `i04` | multi-step patience |
| `i05` | approximation, order of magnitude |
| `i06` | variables as placeholders |
| `i07` | decomposition |
| `i08` | iteration and recursion |
| `i09` | proof and why-is-this-true |
| `i10` | modeling and simulation |
| `i11` | measure by counting, refine to converge |
| `i12` | comfort with dense unfamiliar text |
| `i13` | sense of historical sweep |
| `i14` | civilizations think differently |
| `i15` | holding a worldview without judging |
| `i16` | process over product, makers over conquerors |
| `i17` | comfort being the not-yet-knower |
| `i18` | making things well — craft and grace |
| `i19` | encoding a procedure so something else can run it |
| `i20` | attention — sustained deliberate noticing |
| `i21` | collaboration |

*Added 2026-08-05: `i18`–`i21`. The four questions held open in the earlier intuition
notes, answered yes. Appended rather than slotted in by theme — renumbering would orphan
every seed written so far.*

## `domain` — required, one or more

| Value | Value | Value |
|-------|-------|-------|
| `mathematics` | `physics` | `chemistry` |
| `biology` | `perception` | `music` |
| `engineering` | `computing` | `history` |
| `art` | `craft` | `language` |
| `philosophy` | `geography` | `astronomy` |

*Added 2026-08-05: `craft` — glassmaking, instrument-making, and the making trades are
not `art` and not `engineering`; the distinction is load-bearing for the Glass stories.*

## `kind` — required, exactly one

| Value | Meaning |
|-------|---------|
| `story` | narrative the child reads or is inside |
| `lab` | a substantial environment (Euclid, NTL, CBM, Perception) |
| `mode` | a story mode routing into a lab |
| `mechanic` | an interaction pattern reusable across labs |
| `bench` | small thing built to settle one question |
| `atlas` | an entry on a reference scale |
| `question` | open, needs deciding before it needs building |

## `lab` — optional, exactly one

`euclid` · `number-theory` · `codes-bases-modulus` · `perception` · `none`

*Added 2026-08-05: `perception` — colour, pitch, and rhythm discrimination share one
measurement harness and therefore constitute a Lab, not three interactives.*

## `status` — required, exactly one

`seed` — captured, nothing decided
`warm` — has a next action, can be picked up cold
`moving` — on the board, actively worked
`built` — shipped and live
`parked` — real, wanted, not soon
`archived` — superseded; kept for the record

## `era` — optional, a CW year

Per `CW-Date-Convention.md`: Year 0 = 10,000 BCE, so 1895 CE is `11895`. A number, not
a string, so ranges sort. This facet is what makes "what else was happening then"
a query rather than an act of memory.

## `place` — optional

A real place name, written the way an atlas writes it: `Paris`, `Sumer`, `Alhambra`.
No values are pre-listed because the world is the list, but spell it consistently —
`Paris`, never `paris` or `Paris, France`.

## `scale` — optional, one or more

The measurable axis a seed hangs on, linking it to the Reference Atlas. This is how
the melting point of sand and the temperature of a star end up on the same beam.

`temperature` · `time` · `size` · `distance` · `speed` · `frequency` · `mass` · `count`

## `hook` — required, free prose

One sentence, in the child's direction, that would make her want to open the door.
Not a description. The hook for Montparnasse is not "a train crash in 1895."

---

## Shape of a seed

```yaml
---
kind: story
status: seed
intuitions: [i05, i13, i16]
domain: [physics, history]
era: 11895
place: Paris
scale: [speed, mass]
lab: none
hook: A locomotive came through the wall of the station and stood in the street.
---
```

Then prose below: what it is, what it opens onto, what remains undecided.

## What this is not

Not a taxonomy of everything. Facets exist to answer questions the project actually
asks — *what else is this era, what serves this intuition, what hangs on this scale.*
A facet nobody queries is clutter with a schema. If a new facet is proposed, the test
is: name the query it makes possible.
