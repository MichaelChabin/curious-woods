---
status: 10 Oct 2026, from a chat with Michael about filters, plots and weights. The Earth line is agreed; the Animals line is a draft for him to cross off. Replaces the meaning of `weight` in stories/deep-time-events.json (which had 78 events at 3, 90 at 2, 12 at 1, so it decided nothing).
role: Which events earn a label on which timeline line. The source for the converter's `weight`, and for the renames below.
related: Periods-Deep.md (the line tree), Spec-Maps.md (weights, kind, the placer), Events-Deep-01.md to -07.md (where labels live)
---

# Event lines

## The rule

Each event names the **widest line on which it deserves a label**, from the period tree in Periods-Deep.md: Earth, Animals, Mammals (and the other lines at that level), Ice, Mammoths, The last ice age, After the ice.

1. On its own line, and on every narrower line that contains it, the event gets a label, room permitting.
2. On wider lines it is a tick with no label. It stays there, and still shows how crowded a stretch is.
3. When two labels collide, the event from the wider line wins.

**The budget.** Each line has about a dozen labelled events of its own. Events inherited from wider lines are labelled too, and don't count against it.

The converter writes the old `weight` from this field, so nothing else in the code need change at first.

## The Earth line (agreed, Michael, 10 Oct)

Read aloud, the labels tell the story.

| Label | Age | id | Note |
|---|---|---|---|
| Moon forms | 4.5 billion | big-thwack | renamed from *Big thwack* |
| Oceans form | 4.4 billion | blue-earth | renamed from *Blue Earth* |
| Stromatolites | 3.43 billion | stromatolites | |
| Oxygen alone | 2.43 billion | oxygen-in-the-air | renamed from *Oxygen in the air* |
| Rust | 1.88 billion | banded-iron | renamed from *Banded iron* |
| Cells with nuclei | 1.64 billion | cells-with-nuclei | |
| Snowball one | 717 million | snowball-one | opens the Animals line |
| Animals, fossils | 539 million | animals-kept | renamed from *Animals, kept* |
| Plants ashore | 470 million | plants-ashore | |
| The Great Dying | 252 million | the-great-dying | |
| The asteroid | 66 million | the-asteroid | |
| Homo sapiens | 315,000 | homo-sapiens | all of us, one tick at the edge |

Every Earth period has at least one. *Oceans* has only *Stromatolites* in 1.5 billion years, which is honest.

**Renames** go into the Events-Deep files (labels only; ids stay), then the converter is rerun.

**Left out on purpose.** *Gathering*: the start of the line says it. *Great freeze*: three pixels from *Oxygen alone*. *Dinosaurs*: sits on *The Great Dying*, and is a period name one line down. *Short days*: the day-length graph's job. *Bombardment*: disputed by its own summary. *Kenorland*, *Nuna*, *Rodinia cracks*: supercontinents, a possible filter.

## The Animals line (draft, for Michael)

Inherited from Earth, labelled automatically: Snowball one, Animals fossils, Plants ashore, The Great Dying, The asteroid, Homo sapiens.

Its own dozen:

| Label | Age | id | Period |
|---|---|---|---|
| The thaw | 635 million | the-thaw | Soft bodies |
| Dickinsonia | 558 million | dickinsonia | Soft bodies |
| Burgess Shale | 506 million | burgess-shale | Trilobites |
| Jaws | 439 million | jaws | Trilobites |
| Animals ashore | 428 million | animals-ashore | Trilobites |
| Tiktaalik | 375 million | tiktaalik | Trilobites |
| Land egg | 315 million | land-egg | Trilobites |
| Dinosaurs appear | 233 million | dinosaurs | Dinosaurs (rename proposed: *Dinosaurs* clashes with the period) |
| Pangaea cracks | 201 million | pangaea-cracks | Dinosaurs |
| Archaeopteryx | 149 million | archaeopteryx | Dinosaurs |
| Flowers | 125 million | flowers | Dinosaurs (clashes with the period *Flowers* one line down) |
| Hot spike | 56 million | hot-spike | Mammals |

Left out: *Walking upright* and *Ice by turns* (the last 9% of the line already holds three inherited labels; they belong to the Mammals line), *Forests* and *Coal* (clash with *Coal forests*), *Chengjiang* (Burgess Shale tells the same story), *Gaskiers*, *Little balls*, *Short, sharp ice*, *Antarctica freezes*, *Grasslands*.

## Still open

- The Animals line, until Michael has crossed it off.
- The other lines, one at a time.
- How the converter stores the field: the line's name (`line: earth`) is proposed, since a person can read it.
