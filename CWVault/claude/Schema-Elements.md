---
status: Draft — 24 Oct 2026; schema for the Elements lab data file, with carbon as the worked example. Amended 25 Oct 2026: `words` is written in paragraphs, one per question, under Prose-Standard.md; the carbon example's words replaced by batch 01's checked carbon, reflowed. Amended 25 Nov 2026: Elements-Batch-01.md's changes 1 to 5 and editor pass 11's additions (Editor-Pass-11-02.md); the worked example is batch 01's carbon record.
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
- `latin` the Latin root of the name or the symbol, where there is one (`plumbum` for Pb); empty otherwise

**Sort keys**

- `abundance` percent by mass, three numbers: `universe`, `crust`, `body`. Rough is fine; two figures at most. These drive the three bars and the "how much" sort. Universe is the Sun's present surface (Asplund, Amarsi & Grevesse 2021) as a stand-in; crust is the CRC Handbook figure; body is Emsley's figures for a 70 kg adult (Nature's Building Blocks).
- `birth` one of `big-bang`, `ordinary-stars` (one to eight suns, late in life), `massive-stars` (over eight suns, in shells, then the explosion), `collisions` (the explosions themselves and merging dead stars), `made-by-people`. The dominant source; a second in `birth_also` if it matters.
- `row`, `column` in Mendeleev's table (period 1–7, group 1–18)
- `found` the year people first held it as itself, plus `found_precision`: `exact`, `year`, `about`, `antiquity`. For things known since antiquity, `found` is the year someone showed it was an element, and the words say so.
- `found_kind` one of `isolated` (first held as itself), `shown-element` (known since antiquity; `found` is the year someone showed it was an element), `antiquity` (no such year). `found_precision` keeps `exact`, `year`, `about`, `antiquity`. `found_precision` is the precision of the year given.

**Rulers**

- `cube_kg` the 10 cm cube, in kilograms, at room temperature. For a gas, at room temperature and sea level. Where an element has two common forms (carbon), give the everyday one and name the other in `cube_note`.
- `melt_k`, `boil_k` in kelvin. Where an element does not melt in open air (carbon turns straight to gas), put the temperature at which it does whatever it does and say what in `temp_note`. Carbon: `boil_k` 4098, where it turns to gas.
- `speed_room` metres per second: how fast one of its atoms would move as a gas at room temperature, computed from the mass (√(3kT/m) at 293 K). This is a ruler, not a fact about the stuff; the words say "if it were a gas" where it is not. For an element whose gas is made of pairs (hydrogen, nitrogen, oxygen), the words give the pairs' speed as well.
- `glow` nothing to store; the glow slider is one formula for every tile.
- `age` the age paragraph (words), since the honest answer is a range and a story.

**Spectrum**

- `lines` the strongest visible lines of the neutral atom, as `[nm, strength]` pairs, strength 0–1 relative to the brightest; up to ten lines; fewer where the line list has fewer in the visible (carbon two, phosphorus one, sulfur two, aluminium three), and the note says so. From a standard line list (NIST's atomic spectra database), not from memory.
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
 "abundance": {
  "universe": 0.26,
  "crust": 0.02,
  "body": 23
 },
 "birth": "ordinary-stars",
 "birth_also": "massive-stars",
 "row": 2,
 "column": 14,
 "found": 1789,
 "found_precision": "year",
 "found_kind": "shown-element",
 "cube_kg": 2.2,
 "cube_note": "As graphite, the black in a pencil. As diamond, 3.5 kg: the same atoms, packed tighter.",
 "melt_k": null,
 "boil_k": 4098,
 "temp_note": "Does not melt in open air. Above about 3,900 to 4,100 K (measurements differ) it turns straight to gas, hotter than any other element stays solid. It melts only under about a hundred times the pressure of the air.",
 "speed_room": 780,
 "lines": [
  [
   538.0,
   1.0
  ],
  [
   601.3,
   1.0
  ]
 ],
 "spectrum_note": "Dull. The single atom has only two faint visible lines worth listing. The blue-green at the bottom of a gas flame comes from short-lived scraps of molecules, among them pairs of carbon atoms (the green) and carbon joined to hydrogen (the blue), and a candle's yellow is glowing soot, which gives a smooth rainbow, not lines.",
 "isotopes": [
  {
   "a": 12,
   "share": 0.9893,
   "halflife": "stable",
   "decays_to": null
  },
  {
   "a": 13,
   "share": 0.0107,
   "halflife": "stable",
   "decays_to": null
  },
  {
   "a": 14,
   "share": 1.2e-12,
   "halflife": "5700 years",
   "decays_to": "nitrogen-14"
  }
 ],
 "line": "Pencil lead, diamond, charcoal and nearly a quarter of you are the same stuff, arranged differently.",
 "words": "A quarter of you is carbon. Not a pinch or a trace, but very nearly a quarter of everything you weigh, and only oxygen has a bigger share of you. Yet the rock of the Earth has almost none: in ten thousand spadefuls of ground you would get two of carbon, give or take, for the people who measure these things cannot agree on how to count the limestone. And in the whole universe carbon comes fourth, after hydrogen, helium and oxygen.\n\nDeep in a star, where everything is hot and packed tight, the centres of three helium atoms are squeezed together into one atom of carbon, and the squeezing gives off heat, which is part of why the star shines. We now think about half of all the carbon there is was made in stars like the Sun, but old, near the end of their lives. The carbon rose into their outer layers and drifted off into space as the star died. The other half was made in bigger stars, which blew it off in their winds or flung it out when they exploded.\n\nPeople have had carbon on their hands for as long as they have had fire. They had it as charcoal, and they had it as soot from their candles and up their chimneys. Later they had it as the black in a pencil. A few had it as diamonds.\n\nBut nobody knew that the charcoal and the pencil and the diamond were one thing.\n\nIn Paris in 1772 Antoine Lavoisier and his friends used a large lens to focus sunlight onto small diamonds, and the diamonds burned. The gas that came off them turned clear limewater cloudy, which is exactly what the gas from burning charcoal does. In 1789 Lavoisier wrote carbon down in his list of the elements.\n\nThen in 1796, in England, Smithson Tennant put a few small diamonds into a tube made of gold, with saltpetre to make them burn, and kept the tube red hot for an hour and a half. When he looked, the diamonds were gone. He had caught the gas, and he measured it. It was the same gas that charcoal gives, and very nearly the same amount of it, weight for weight.\n\nSo the diamond was charcoal, and the charcoal was diamond, and both of them are a quarter of you.",
 "rulers_words": "A 10 cm cube of graphite weighs about 2.2 kg, a little over twice water; the same cube of diamond weighs 3.5 kg, because the same atoms are packed tighter. Carbon never melts in open air. Heated where there is no air to burn it, it glows red, then orange, then white, and at around 3,900 to 4,100 K, depending on whose measurement you take, it turns straight to gas. A 10 cm door into a room that hot would feel like full sunshine from six or seven metres away. If its atoms were a gas at room temperature they would move at about 780 metres a second.",
 "age_words": "Nearly every carbon atom in you was made in a star that died before the Sun was born, so most of you is older than the Sun, which is about 4.6 billion years old. About one carbon atom in a trillion is different: carbon-14, made high in the air when cosmic rays strike nitrogen, most of it within the last ten thousand years. Carbon-14 slowly turns back into nitrogen; half of any heap of it is gone in about 5,700 years. That is the clock that dates a bone or a piece of charcoal, back to about fifty thousand years, when too little is left to count.",
 "stories": [
  {
   "id": "how-old-are-you",
   "role": "uses"
  },
  {
   "id": "ash-and-sand",
   "role": "mentions"
  }
 ],
 "laws": [],
 "mixtures": [
  "steel"
 ],
 "sources": [
  {
   "title": "Royal Society of Chemistry, Periodic Table: Carbon",
   "used_for": "crust, densities, sublimation",
   "url": "https://periodic-table.rsc.org/element/6/carbon"
  },
  {
   "title": "Tennant, 'On the Nature of the Diamond', Phil. Trans. 87 (1797) 123–127",
   "used_for": "the diamond proof, 1796 (burned with nitre in a gold tube; compared with Lavoisier's charcoal figure)",
   "url": "https://jimclifford.ca/philosophical-transactions-ocr-1665-1869/articles/jstor-106919/"
  },
  {
   "title": "Wisniak, 'Smithson Tennant', Educación Química 26 (2015) 250",
   "used_for": "the 1772 burning-lens experiments",
   "url": "https://elsevier.es/en-revista-educacion-quimica-78-articulo-smithson-tennant-S0187893X15000373"
  },
  {
   "title": "Kobayashi, Karakas & Lugaro 2020, ApJ 900:179",
   "used_for": "about half from ordinary stars",
   "url": "https://arxiv.org/abs/2008.04660"
  },
  {
   "title": "Kobayashi 2023 review, arXiv 2302.07255",
   "used_for": "about half of carbon from ordinary stars",
   "url": "https://arxiv.org/abs/2302.07255"
  },
  {
   "title": "Kondev et al. 2021 (NUBASE2020), Chinese Physics C 45, 030001",
   "used_for": "carbon-14 half-life",
   "url": "https://doi.org/10.1088/1674-1137/abddae"
  },
  {
   "title": "NIST Handbook of Basic Atomic Spectroscopic Data, carbon strong lines",
   "used_for": "lines",
   "url": "https://physics.nist.gov/PhysRefData/Handbook/Tables/carbontable2.htm"
  },
  {
   "title": "John Emsley, Nature's Building Blocks (Oxford, 2nd ed. 2011)",
   "used_for": "body share; a book a parent can find",
   "url": ""
  }
 ],
 "checks": [
  {
   "claim": "every number, name, date, line, isotope and reference in this record",
   "verdict": "Checked 24 Oct 2026 against RSC, Wisniak 2015, Tennant 1797, Kobayashi 2020/2023, NUBASE2020 and NIST. Changed: Tennant did not burn equal weights of diamond and charcoal; he burned diamond with nitre in a gold tube and compared it with Lavoisier's charcoal figure; the 1772 comparison with charcoal softened; gas-flame blue is mainly CH, not C2. Could not confirm where Tennant did the work, so \"in England\". Crust figure uncertain by a factor of up to twenty between sources. Editor pass 11, 23 Nov 2026: 4098 K is the Royal Society of Chemistry's figure for turning to gas, opened that day. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md. Tennant's paragraph corrected from his paper (Phil. Trans. 1797), opened 23 Nov 2026: several small diamonds, a gold tube closed at one end, a strong red heat for about an hour and a half, the gas measured by its bulk."
  }
 ],
 "watch": [],
 "state": "approved"
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
