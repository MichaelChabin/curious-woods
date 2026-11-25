---
status: Draft — 24 Oct 2026; schema for the Elements lab data file, with carbon as the worked example. Amended 25 Oct 2026: `words` is written in paragraphs, one per question, under Prose-Standard.md; the carbon example's words replaced by batch 01's checked carbon, reflowed.
role: The shape of one tile record, for the batch chat that writes entries and the Claude Code session that builds the lab
related: Lab-Elements.md, Laws-Macroscopic.md, Prompt-Pool.md (the checking routine), Prose-Standard.md (how the words read)
---

# Elements: the tile record

One record per tile, in `data/elements.json` (working name). Every tile has the same fields so no two entries can disagree about what matters, and so the sorts have something to sort on. The batch chat fills the words and sources; the numbers it fills from standard references and marks as checked. Where a field honestly has no good value, it says so in the field rather than leaving it blank or inventing one.

## Fields

**Identity**

- `id` short slug: `carbon`
- `symbol`, `name`, `z` (proton count)
- `shelf` one of `core`, `metals`, `mixture`, `guest`
- `guest_of` story id that brought a guest tile; empty otherwise
- `latin` the Latin or Greek root behind the symbol where the symbol is not the English initial (`plumbum` for Pb); empty otherwise

**Sort keys**

- `abundance` percent by mass, three numbers: `universe`, `crust`, `body`. Rough is fine; two figures at most. These drive the three bars and the "how much" sort.
- `birth` one of `big-bang`, `ordinary-stars` (one to eight suns, late in life), `massive-stars` (over eight suns, in shells, then the explosion), `collisions` (the explosions themselves and merging dead stars), `made-by-people`. The dominant source; a second in `birth_also` if it matters.
- `row`, `column` in Mendeleev's table (period 1–7, group 1–18)
- `found` the year people first held it as itself, plus `found_precision`: `exact`, `year`, `about`, `antiquity`. For things known since antiquity, `found` is the year someone showed it was an element, and the words say so.

**Rulers**

- `cube_kg` the 10 cm cube, in kilograms, at room temperature. For a gas, at room temperature and sea level. Where an element has two common forms (carbon), give the everyday one and name the other in `cube_note`.
- `melt_k`, `boil_k` in kelvin. Where an element does not melt in open air (carbon turns straight to gas), put the temperature at which it does whatever it does and say what in `temp_note`.
- `speed_room` metres per second: how fast one of its atoms would move as a gas at room temperature, computed from the mass (√(3kT/m) at 293 K). This is a ruler, not a fact about the stuff; the words say "if it were a gas" where it is not.
- `glow` nothing to store; the glow slider is one formula for every tile.
- `age` the age paragraph (words), since the honest answer is a range and a story.

**Spectrum**

- `lines` the strongest visible lines of the neutral atom, as `[nm, strength]` pairs, strength 0–1 relative to the brightest; four to ten lines. From a standard line list (NIST's atomic spectra database), not from memory.
- `spectrum_note` what a child actually sees: some elements are showy (hydrogen, sodium, neon), some are not, and for some the famous colour is a molecule, not the atom (carbon's blue flame).

**For the builder (thin for now)**

- `isotopes` list of `{a, share, halflife, decays_to}`: the stable kinds with their natural share, plus the one or two unstable kinds a story will meet. `halflife` as a number of years with a unit word, or `stable`. Only the clocks need the decay; leave the rest out.

**Words** (all of them read by Prose-Standard.md)

- `line` one sentence, the tile's caption: what this is to a ten-year-old.
- `words` the entry proper, about 150–250 words, in the three-questions shape (how much; where it came from; who first held it). **One paragraph per question**, separated by a blank line (`\n\n` in the JSON); a short fourth paragraph that turns the story is allowed. Never one block. No "did you know." No exclamation marks.
- `rulers_words` one short paragraph reading the rulers for this tile, in the same voice.
- `age_words` the age paragraph.

The build shows a blank line in any words field as a new paragraph.

**Links**

- `stories` ids of stories that met it, with the role each played (`opens`, `uses`, `mentions`)
- `laws` numbers from Laws-Macroscopic.md that the entry leans on, if any
- `mixtures` ids of mixtures it is part of

**Housekeeping (as the pool does it)**

- `sources` list of `{title, used_for, url}`
- `checks` list of `{claim, verdict}` from the checkers
- `watch` for any sentence that speaks of the present (`what`, `last_checked`, `every`)
- `state` the pool's ladder: `draft`, `review`, `fix`, `approved`, `built`

## Worked example: carbon

The shape of the record. Batch 01 corrected several of the numbers below; where they differ, `Elements-Batch-01.md` is right. The `words` are batch 01's checked carbon, reflowed on 25 Oct, and are the model for how an entry reads.

```json
{
  "id": "carbon",
  "symbol": "C",
  "name": "Carbon",
  "z": 6,
  "shelf": "core",
  "guest_of": "",
  "latin": "carbo (charcoal)",

  "abundance": { "universe": 0.5, "crust": 0.02, "body": 18 },
  "birth": "ordinary-stars",
  "birth_also": "massive-stars",
  "row": 2,
  "column": 14,
  "found": 1789,
  "found_precision": "year",

  "cube_kg": 2.3,
  "cube_note": "As graphite (pencil lead, charcoal). As diamond, 3.5 kg: the same atoms, packed tighter.",
  "melt_k": null,
  "boil_k": null,
  "temp_note": "Does not melt in open air. Glows, burns if there is oxygen, and above about 3900 K turns straight to gas. The highest of any element.",
  "speed_room": 780,

  "lines": [[477.2, 0.4], [538.0, 0.5], [601.3, 0.3], [658.8, 0.6], [711.5, 0.5]],
  "spectrum_note": "Not a showy one. The blue-green of a gas flame is pairs of carbon atoms, not single ones; the single atom's visible lines are faint and red-orange. Honest strip: dim.",

  "isotopes": [
    { "a": 12, "share": 0.989, "halflife": "stable", "decays_to": null },
    { "a": 13, "share": 0.011, "halflife": "stable", "decays_to": null },
    { "a": 14, "share": 0.0000000001, "halflife": "5730 years", "decays_to": "nitrogen-14" }
  ],

  "line": "Pencil lead, diamond, charcoal and most of you are the same stuff, arranged differently.",

  "words": "There is a great deal of carbon in you: nearly a quarter of your weight, more than anything but oxygen. There is not much in the Earth's rock, about two parts in ten thousand by weight, and sources disagree widely, depending on how they count limestone. In the universe carbon comes fourth, after hydrogen, helium and oxygen.\n\nCarbon is made when the centres of three helium atoms are squeezed into one. We now think about half of it was made in stars something like the Sun, late in their lives, which puffed it out into space as they died, and the rest in bigger stars, blown off in their winds or thrown out when they exploded.\n\nPeople have held carbon as long as there have been fires, as charcoal and soot. But nobody knew that charcoal, the black in a pencil and a diamond were one thing.\n\nIn Paris in 1772, Antoine Lavoisier and his colleagues burned diamonds with a great lens, and the gas the diamonds gave off clouded limewater, as the gas from burning charcoal does. In 1789 Lavoisier listed carbon among the elements. The proof about diamond came in 1796, when Smithson Tennant, in England, burned a diamond with saltpetre in a gold tube. The diamond gave the same gas, and the same amount of it, that Lavoisier had found from the same weight of charcoal.",

  "rulers_words": "A 10 cm cube of graphite weighs a little over 2 kg, twice water; the same cube of diamond weighs 3.5 kg, because the atoms are packed tighter. Carbon never melts in air. Heat it and it glows red, then yellow, then white, and at about 3900 K it goes straight to gas, hotter than any other element will stand. If its atoms were a gas at room temperature they would move at about 780 metres a second, a little slower than oxygen's, because they are a little heavier.",

  "age_words": "Nearly every carbon atom in you was made in a star that died before the Sun was born, so most of you is older than the Sun. One in a trillion of your carbon atoms is the heavy kind, carbon-14, made last year or the year before by cosmic rays hitting the air, and it is slowly turning back into nitrogen. That is the clock that dates a bone or a piece of charcoal, back to about fifty thousand years, which is as long as the clock runs before it has all turned.",

  "stories": [
    { "id": "how-old-are-you", "role": "uses" },
    { "id": "ash-and-sand", "role": "mentions" }
  ],
  "laws": [9],
  "mixtures": ["steel"],

  "sources": [
    { "title": "Royal Society of Chemistry, Periodic Table: Carbon", "used_for": "abundance, density, sublimation, discovery", "url": "" },
    { "title": "NIST Atomic Spectra Database, C I", "used_for": "lines", "url": "" },
    { "title": "Lavoisier, Traité élémentaire de chimie (1789)", "used_for": "the name; the diamond experiment", "url": "" }
  ],
  "checks": [],
  "watch": [],
  "state": "draft"
}
```

## Notes for the batch chat

- Read Prose-Standard.md and its models before writing a word. It governs how every words field reads; this page governs only what the fields are.
- The example's numbers are from memory and were corrected by batch 01; take every figure from `Elements-Batch-01.md` and its sources, not from here.
- One beat per entry. Carbon's is "the same stuff, arranged differently." If a second idea wants in, it is a story, not an entry.
- The three-questions shape (how much; where it came from; who first held it) is the order of the `words` field every time, one paragraph per question, so a child who has read three entries knows where to look in the fourth.
- Numbers in the words are rounded to what a child can hold: "nearly a fifth," "two parts in ten thousand," "about 3900 K." The exact figures live in the fields.
- Where the honest answer is dull (carbon's spectrum), say it is dull. The lab is a reference; a reference that oversells is useless.
- `found` wants the year someone showed it was an element, not the year someone first used it, and the words should carry the difference.
- Mixtures use a shorter record: `id`, `name`, `shelf: "mixture"`, `made_of` (list of `{id, share}`), `cube_kg`, `melt_k`, `line`, `words` (what it is made of, in what proportion, why anyone bothered), `stories`, housekeeping. Bronze is the model to write first.
