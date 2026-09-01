---
status: Seeded — 30 Aug 2026, from an iPad design chat. Needs Michael's read.
role: Constellation hub — the 1816 cluster around Frankenstein
kind: story
intuitions: [i13, i02, i05, i10, i11, i16, i17]
domain: [history, physics, chemistry, art, biology, geography]
era: 11816
place: Geneva
lab: none
hook: A volcano on the far side of the world kept five bored people indoors by a lake, and one of them was eighteen and wrote a monster.
---

# Frankenstein — the 1816 constellation

## The core idea

Every node here is within a few hops of one summer. A volcano in Indonesia darkens the
sky; Europe's harvest fails; rain keeps a house party indoors in Geneva; a dare produces
the first science-fiction novel — and the novel's idea of life from electricity arrives
from the other side, out of thirty years of argument about twitching frogs. The move the
cluster exercises is **i13, historical sweep**: not *when did this happen* but *what else
was happening, and did it know*. The second move is **i17**: several of these links are
contested, and the child should see historians disagreeing.

This is the set piece `20-SPECS/Spec-Timeline-Graph.md` §11 asks for. If the chain
Tambora → year without a summer → Diodati → the wager → *Frankenstein* lands, with
Galvani and Aldini arriving from the electrical side, the Timeline works.

## How the files are shaped

- `nodes/*.md` — one file per node. Frontmatter follows the Timeline spec §4 (`type`,
  `start`, `end`, `precision`, `places`, `periods`) **and** carries the seed facets from
  `Facet-Vocabulary.md` so the same file is a seed and a node. Dates are CW years.
  Body: the **panel** text (60–80 words, one irresistible detail), then **more**
  (150–250 words), then sources.
- `edges.yaml` — the authored **claim edges**, spec §5. Typed, few, with strength and an
  explanation. Same-year kinships are **not** listed; they are facet edges and fall out
  of `era` for free. That is the answer to "there is nothing wrong with things going on
  at the same time" — the system agrees, and does not need them written down.
- This file — the hub.

## Threads (proposed facet — not yet in the vocabulary)

Six bundles appeared without being planned. They are written as a `threads:` line in
each node so the idea can be tested, but **`threads` is not in `Facet-Vocabulary.md`**
and per its amendment rule needs Michael's approval before it counts. Decision wanted:
adopt as a facet, fold into `domain`, or drop.

- `electricity` — Franklin, Galvani, Volta, Aldini, Faraday
- `tambora` — the eruption and everything it touched
- `climate` — Michael's name for the wider bundle; overlaps `tambora`, outlives it
- `speed-of-information` — nobody connected the failed summer to the volcano for a century
- `epidemics` — typhus in Ireland; a door to the disease stories
- `made-things` — monsters, machines, the running machine
- `how-we-know` — ice cores, tree rings, frog legs: measurement over guessing
- `hidden-names` (added 30 Aug) — Mary publishes anonymously; Germain writes to Gauss as
  M. LeBlanc; Ada signs A.A.L. Three women, one era, no names. The thread found itself.

## Stories in this constellation

All nodes are **seeds**; none is drafted as a five-page story. The ones that most want
to be stories:

### Sketched (panel + more written)
- [[nodes/sophie-germain]] — the candles confiscated, the false name, the 1816 prize
- [[nodes/ada-lovelace]] — from the ghost-story villa to the first program, two edges
- [[nodes/chladni-plates]] — sand finds the quiet places on a singing plate
- [[nodes/darwin-i-think]] — two words and a branching sketch
- [[nodes/jane-marcet]] — the anonymous book that made Faraday; the platform's own ancestor
- [[nodes/frankenstein]] — an eighteen-year-old wins a ghost-story wager
- [[nodes/tambora]] — the loudest sound in recorded history
- [[nodes/year-without-a-summer]] — snow in June, and nobody knew why
- [[nodes/villa-diodati]] — rain, boredom, and a dare
- [[nodes/aldini-london]] — the demonstration a five-year-old's whole city talked about
- [[nodes/how-we-know-tambora]] — the ice remembers; the Numbers door
- [[nodes/drais-running-machine]] — a bicycle's grandfather, born of a famine

### Node only (panel written, story not obvious)
- [[nodes/byron-darkness]] · [[nodes/galvani]] · [[nodes/volta]] · [[nodes/franklin-kite]]
  · [[nodes/faraday-induction]] · [[nodes/erasmus-darwin]] · [[nodes/typhus-ireland]]
  · [[nodes/turner-skies]] · [[nodes/arctic-ice-11817]]

## Doors into existing labs

- **Biomorphs (Blind Watchmaker sims):** [[nodes/erasmus-darwin]] → Charles Darwin. The
  novel's preface names him. Direct, unforced.
- **Numbers / the plane:** [[nodes/how-we-know-tambora]] — measuring the past by counting
  layers (i11). Also [[nodes/tambora]] on the `count` and `distance` scales.
- **Sound / Perception:** [[nodes/chladni-plates]] → [[nodes/sophie-germain]] — sand on a
  vibrating plate is pitch made geometry, and the 1816 prize is this constellation's own
  year. Simulation candidate (Eileen): see the hub's Open list. Beethoven was still **left out** — the
  Tambora link is thin (he was in Vienna during the famine, and that is all). If he
  enters, it is through deafness and the Sound lab, not through 1816.
- **Timeline:** all of it. This is the Timeline's first patch.

## Rhymes with

- [[../Pi-Stories/Pi-Stories]] — measure by counting, refine to converge
- `03-SEEDS/montparnasse-11895.md` — the other "one year does the connecting" demo
- `03-SEEDS/year-of-seeing-11895.md`

## Corrections made while seeding

- An early draft claimed *Frankenstein*'s Arctic frame responded to the 1817 whaling
  reports. It did not: Walton's letters were written before Scoresby's report reached
  London, and the 1818 expeditions sailed after the book was out. The edge is now
  facet-only (same era). Kept visible here per `00-DECISIONS.md`'s Corrections habit.
- The "less sunlight, less ice" puzzle is real and unresolved: the likeliest reading is
  that the haze shifted winds and **moved** the ice south rather than melting it. Written
  as `contested`.

## Open

- Adopt `threads` as a facet, or not (now including `hidden-names`).
- Chladni simulation (Eileen's idea): buildable in the existing stack — see
  `03-SEEDS/chladni-bench.md`.
- Two nodes (Drais, Turner) have only one claim edge; two edges (Faraday→how-we-know,
  typhus→how-we-know) are weak and marked so in `edges.yaml`. The fix is neighbouring
  constellations (bicycles; epidemics), not padding.
- Where do these render first — the Timeline (unbuilt) or the dashboard's six icons?
- Images: Wellcome (Galvani, Aldini, Volta — CC-BY), Gallica (Aldini), Commons (Drais,
  Turner, Tambora maps, 1831 frontispiece), Gutenberg for text. Nothing fetched yet;
  full-resolution originals should live outside git with the URL in the node.
