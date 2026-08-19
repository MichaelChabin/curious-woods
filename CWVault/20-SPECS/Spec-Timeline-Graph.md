---
kind: lab
status: moving
intuitions: [i05, i13, i02, i03, i14, i20]
domain: [history, astronomy, geography, physics]
era:
place:
scale: [time]
lab: none
hook: Byron and Beethoven and a volcano in Indonesia were all having the same year.
---

# Spec — Timeline Graph

*Working name: the Timeline. Established 18 Aug 2026, from Michael's ChatGPT background note + the Frankenstein mockup.*
*Status: design agreed, unbuilt. Supersedes nothing; extends `CW-Date-Convention.md` and `99-IDEAS/Scale-Beam-Tool.md`.*

---

## BRIEF

A fourth Lab. Time on the x axis, everything else negotiable. Nodes are people, events, works, conditions. Clicking a node expands it into a bar spanning its real duration, with coloured bands for periods inside it and a text panel below. Nodes connect to other nodes — by shared facets (free, queried, never rot) and by authored claims (typed, explained, few).

The thing being tested: **can wandering in time produce surprise?** Not "can we build a database." Success is a child saying *wait, that was the same year* three times in ten minutes.

Decisions already made:

- Flat for v1. X is time. Y is context-dependent and belongs to the viewing, not the engine.
- Two edge species, drawn differently.
- This is a **viewing of the plane**, not a new engine — see §9.
- Years stay positive at every depth by prepending digits. Today always ends `…12 026`.

Not decided: §12.

---

## 1. Pillar and intuitions

**Pillar: Labs.** A substantial visual environment, not a story and not practice.

- **i13 sense of historical sweep** — the whole point. Not "when did X happen" but "what else was going on."
- **i05 approximation, order of magnitude** — the prefix-digit scheme makes deep time physically legible (§2).
- **i02 functional thinking** — a person is a function from time to activity. Rolling along the bar reads the value.
- **i03 multiple representations** — the same fact as a position, a bar, a band, an edge, a sentence.
- **i14 civilizations think differently** — three independent inventions of writing sit on the same axis at the same place.
- **i20 attention** — the reward for looking closely at one bar is discovering it overlaps another.

---

## 2. Deep time: the odometer

`CW-Date-Convention.md` sets Year 0 = 10 000 BCE, today = 12 026, and explicitly defers deep time. This is the deferred part.

### The rule

**Digits are only ever added on the left. No digit to the right ever changes.**

Today is `12 026`, `712 026`, `5 712 026`, `565 712 026`, `4 565 712 026` — always ending in the same five digits. Zooming out does not renumber the world; it reveals that the number was longer than you thought.

### The tiers

| Tier | Today reads | Year 0 sits at | Reaches back to |
|---|---|---|---|
| 1 — Civilization | `12 026` | 12 kya | end of the last glacial maximum |
| 2 — Our species | `712 026` | 712 kya | *H. sapiens* ≈ `412 026` |
| 3 — Ice ages | `5 712 026` | 5.712 Mya | Quaternary glaciations begin ≈ `3 112 026` |
| 4 — Mammals | `75 712 026` | 75.712 Mya | K–Pg impact ≈ `9 712 026` |
| 5 — Animals | `575 712 026` | 575.712 Mya | Cambrian ≈ `37 712 026` |
| 6 — Earth | `4 575 712 026` | 4.5757 Gya | Earth forms ≈ `35 712 026`; Moon impact ≈ `65 712 026` |
| 7 — Everything | `14 575 712 026` | 14.576 Gya | Big Bang ≈ `788 712 026` |

**Correction to the note:** the tier-4 digit should be `7`, not `6`. `65 712 026` puts Year 0 at 65.712 Mya, which is *after* the K–Pg impact at 66.0 Mya — the extinction that made mammals possible falls off the left edge by ~290 000 years. Prepending `7` fixes it and costs nothing. Tiers 5–7 shift accordingly.

The prepended digits, read outward: **7, 5, 7, 5, 4, 1.** A child will learn this without being asked to, because she will type it.

### Rendering

**Grouping.** Digits in threes, separated by a narrow no-break space (U+202F), both sides of the decimal, per ISO 80000-1. No commas anywhere in CW. `12 026`, not `12,026`.

**Quiet digits — generalised rule.** `CW-Date-Convention.md` renders the leading `1` of a CE date at 70%. Generalise it: **a digit is quiet when it is identical across every date currently on screen.** Computed from the visible range, not hard-coded. At a 1780–1820 zoom every visible date starts `11 8`, so `11 8` goes quiet and `11 816` reads as **16** with soft context. Zoom out to the millennium and the `8` re-emerges bold.

This is the whole date convention as one line of arithmetic, and it makes zooming feel like focusing rather than reformatting.

**BCE gloss.** Unchanged from the existing convention — small italics at the end of the entry, tier 1 only. Below tier 1 nobody has a conventional counterpart, so drop it and give an approximate "years ago" instead.

---

## 3. Spatial grammar

**X is time.** Always. Past left, future right. *(The mockup runs right-to-left — 1860 at left, 1790 at right. Assumed artifact; the spec is past-left.)*

**Y belongs to the viewing.** The engine does not know what y means. Candidates, one at a time:

- **Latitude** — the default for the human tiers. Puts Sumer and Mesoamerica on the same screen with visible separation.
- **Domain** — art / science / craft / power, as loose horizontal lanes. Cheap, legible, and the most likely v1 choice.
- **A measured quantity** — atmospheric oxygen, global temperature, sea level. This is where the Reference Atlas plugs in, and where the timeline stops being a timeline and becomes a graph in the mathematical sense.
- **Nothing** — a single lane, nodes stacked by collision avoidance. Honest, and probably right for the first prototype.

**Depth is fog, not z.** "Approaching something reveals detail" gets implemented as zoom + proximity-to-centre, exactly as the Scale Beam already does. See `03-SEEDS/smoothness-fog.md`.

---

## 4. What a node knows

```yaml
id: mary-shelley
type: person            # person | event | work | condition | place | idea
label: Mary Shelley
image: mary-shelley.jpg # optional; a node is either an image or a rounded rectangle
start: 11797
end: 11851
precision: exact        # exact | year | decade | century | disputed
places: [London, Geneva, Rome]
periods:
  - { start: 11816, end: 11818, label: "Writing Frankenstein", band: copper }
  - { start: 11818, end: 11823, label: "In Italy", band: sage }
blurb: 63 words. See §7.
sources: [...]
```

**Precision is not optional.** "Probably 1799" must not harden into 1799. Render imprecise endpoints as a soft gradient rather than a hard edge — the child learns that history has fuzzy boundaries without anyone saying so.

**Condition nodes are the ones that matter.** Press gangs. Coffeehouses. Coal. Smallpox inoculation. Gas lighting. Paper. Without them the famous people float. They are also the cheapest nodes to write and the ones a child has never seen on a timeline.

---

## 5. Two edge species

`Facet-Vocabulary.md` is authoritative that connections are **queried, not authored** — hand-authored links rot, facets do not. That stays true. But it cannot express *Tambora caused the year without a summer.* So:

### Facet edges — free, queried, unlimited

Derived, never stored. Same `era`, same `place`, same `scale`, same `domain`. Nobody maintains them; they cannot rot; they are the source of nearly all the surprise. "What else is 11816" answers itself and answers with Beethoven, Byron, a starving Europe, and a volcano.

Drawn as: **faint, thin, many, appearing on hover of a node.** Ambient. Not clickable individually — they are a field, not a link.

### Claim edges — authored, typed, few

```yaml
from: tambora
to: year-without-a-summer
type: caused           # caused | enabled | responded-to | knew | taught
                       # published | depicted | contradicted | funded
strength: strong       # strong | likely | contested
explanation: "Sulfate aerosols in the stratosphere cut sunlight across the
  northern hemisphere for eighteen months."
sources: [...]
```

Drawn as: **solid, labelled, few per node.** Clickable. The label sits on the line and is the reason the child clicks.

Target: 6–8 claim edges per node, chosen for interest, not completeness. Everything else is facets. This keeps the authored corpus in the low thousands instead of the 50 000+ the background note feared.

`contested` edges should look contested — dashed, or a lighter weight. A ten-year-old finding out that historians disagree is worth more than any single fact.

---

## 6. Interaction

**Collapsed.** A rounded rectangle with a name, or an image with a discreet title along the bottom. A thin drop line to the axis. Where the drop line meets the axis, a short tick spanning the node's duration — normally near-invisible, brought forward and lit when the node or a connected node is selected.

**Selected.** The node expands downward into:

1. **The bar** — a long narrow rectangle, horizontally aligned to the axis so its left and right edges sit at the true start and end dates. Name inside. Coloured bands inside it for periods. Claim edges attach here, to the *band* they concern where possible, not to the node as a whole — Frankenstein's edge to Galvani attaches to the "Writing Frankenstein" band, not to Mary Shelley's whole life.
2. **The panel** — text below the bar, ~60–80 words, one image.

**Rolling along the bar.** The cursor is a reading head.

- A vertical hairline follows the cursor.
- Age or elapsed time reads out continuously — for a person, her age; for an event, elapsed duration; for a condition, years since onset.
- Over a band, the panel text swaps to that band's text. *In Italy, studying painting.* *Working on Frankenstein.* Tambora's bands are eruption phases.
- The swap is a crossfade, 200 ms, matching the contextual-options timing in `UI-Language.md`. No layout shift — the panel is sized to its largest child.

**Clicking a band** opens that band as its own node, if it has one. **Clicking the name** goes to the person. **Clicking a claim-edge label** travels the edge, with the destination node arriving expanded.

**Isolated nodes** sit at the date of their principal work. Linked nodes sit at the date of the link — Galvani, reached from Frankenstein, arrives positioned at the frog-leg experiments, not at his birth.

---

## 7. Three depths of text

| Depth | Length | Trigger |
|---|---|---|
| Panel | 60–80 words | selection |
| More | 150–250 words | "more" — a word, not a button |
| Deep | no ceiling | "more" again |

The 60–80 words carry **one irresistible detail** and nothing else. The Mary Shelley text in the background note is the model — 63 words, and the detail is *eighteen*.

House rules for all three depths: written for an adult you like a lot. No "did you know." No rhetorical questions. No "imagine if you were." A ten-year-old smells all three instantly.

---

## 8. Visual language

Inherits `Interface-Foundation.md` and `UI-Language.md` without exception.

- Parchment ground `#f4f1e8`. Georgia throughout.
- Axis and drop lines: Payne's gray `#546A80`, 1 px, ~72% opacity.
- Node borders: Payne's gray. Node fill: parchment, one step deeper.
- Selected bar border and its drop line: copper `#b87333`.
- Period bands: muted, distinguishable by luminance as well as hue (§8 of UI-Language). Start from `palettes.json`; do not invent new colours.
- Claim edges: Payne's gray solid. Facet edges: same hue at ~25%.
- Two-panel layout holds — the timeline is the right panel; Maya, Remember, and contextual words live left.
- Timing from the UI-Language table. Bar expansion reads as panel growth: 400 ms ease-in-out, contents fading in 100 ms after.

---

## 9. Relationship to what already exists

**This is not a new engine.** `99-IDEAS/Scale-Beam-Tool.md` is a draggable, zoomable beam over any scalar with base / personal / story item layers, and it names timelines as a confirmed use. `03-SEEDS/the-beam-substrate.md` and `01-ACTIVE/Plan-Plane-Extraction.md` settle where the year offset lives: **a scale transform is a naming-layer property of a viewing, not a fact about the plane.** CW-offset years are exactly such a transform.

So the build order is: extract the plane → beam as a viewing of it → **timeline as the beam with (a) a CW-year transform, (b) duration bars instead of point tiles, (c) an edge layer.** Only (c) is genuinely new.

The item-layer idea carries over intact and is worth keeping: **base** nodes always present, **personal** nodes marked because she has met them in a story, **story** nodes foregrounded by the story she is in. A child who read Glass finds the glassblowing node already familiar.

---

## 10. Maya

Two jobs at first, and no third.

1. **Answer when asked.** She knows what node is selected and what is on screen.
2. **Help build the graph** — offline, with Michael, not with the child.

She does **not** narrate. She does not point things out. She does not say "notice how." Discovery belongs to the person exploring, and a guide who announces the surprise has destroyed it.

Later, and only later: quiet weighting. A child who has followed electricity for twenty minutes finds Galvani, Volta, Davy and Frankenstein slightly easier to encounter. She is never told this is happening. It is a change in the fog, not a suggestion.

---

## 11. First build

**Patch:** 11780–11820. Europe, with connections outward.

**Size:** 150–300 nodes. Roughly — 60 people, 40 events, 50 works, 40 conditions, 30 places, 30 ideas.

**Density target:** every node has ≥2 claim edges. A node with none is a bug, and the build should say so out loud.

**The set piece:** Tambora → year without a summer → indoors at Villa Diodati → the ghost-story wager → *Frankenstein*, with Galvani and Volta arriving from the other side. Five hops, four disciplines, one summer. If that chain lands, the thing works.

**Success test:** three unprompted *wait, that was the same year* moments in ten minutes of wandering.

---

## 12. Open

1. **What is y in v1?** Single lane is cheapest and probably right. Latitude is the most beautiful. Domain lanes are the most immediately legible. Pick one.
2. **Does the axis zoom continuously or in tiers?** Continuous is truer; tiers make the odometer visible. Possibly both — continuous drag, with tier boundaries that announce themselves as a digit arrives.
3. **Duration of a person: birth-to-death, or working life?** Birth-to-death is honest but puts a wide grey bar under everyone. Working life is more useful and slightly false.
4. **How does a node with no image look?** The mockup's rounded rectangle is fine, but 300 of them is a wall of text. Some visual variety is needed and should not be decorative.
5. **Where do places live?** A place is a node in the schema but has no duration and no natural x. Options: it is a facet only, not a node; or it gets a bar spanning its occupation.
6. **Does the child add nodes?** Enormously appealing — her own life on the same axis as Tambora — and enormously scoped. Park it, but keep the schema open for it.
7. **What does "Remember this" capture here?** A node, an edge, a band, or a view (a window in time with a y meaning)? Probably the view — it is the only one that preserves the surprise.

---

## Related

- `00-FOUNDATION/CW-Date-Convention.md` — extended here, tiers 2–7
- `00-FOUNDATION/Facet-Vocabulary.md` — facet edges are its query model made visible
- `00-FOUNDATION/reference-atlas/timeline-human.md` — first 40 nodes already written
- `99-IDEAS/Scale-Beam-Tool.md` — the engine
- `03-SEEDS/the-beam-substrate.md` — why the transform lives in the viewing
- `01-ACTIVE/Plan-Plane-Extraction.md` — build order
- `03-SEEDS/smoothness-fog.md` — the fog
