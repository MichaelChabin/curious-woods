---
status: checked. Researched, written and checked in one Cowork chat, 24 Oct 2026; reflowed 25 Oct. Read by Claude, editor pass 11, 23 Nov 2026 (Editor-Pass-11-02.md); changes applied. Michael's rulings: carbon written from scratch; aluminium found = 1827 (Wöhler), Ørsted in a clause; spelling "aluminium" and "sulfur"; iron's birth bin `collisions` (exploding white dwarfs), with `massive-stars` second (proposed in chat, not objected to). Decided by default on 23 Nov 2026, under the three-day rule, and open to Michael's overruling: sulfur's `found` stays 1777; `speed_room` stays a single atom and the words give the pairs' speed too; the bar stays "universe", measured at the Sun's surface; body figures follow Emsley across the lab; spectra with fewer than four lines stand. Words rewritten in the told-aloud voice on Michael's word, 23 Nov 2026 (Ruling-Voice-01.md; text in Elements-Told-Aloud-02.md).
role: Elements lab, batch 01 — the first ten core tiles, as records for data/elements.json and a readable rendering for Michael
related: Lab-Elements.md, Schema-Elements.md, Laws-Macroscopic.md, Prompt-Elements-Entries.md, Elements-Ledger.md
---

# Elements, batch 01

Hydrogen, helium, carbon, nitrogen, oxygen, phosphorus, sulfur, silicon, aluminium, iron.

**How it was done.** Round 1, the plan, went to Michael and came back with four answers (above). Round 2: three research agents, a share each (H He C N; O P S; Si Al Fe), returned fact sheets with sources. Round 3: written in this chat from those sheets; speeds and door distances computed, not looked up. Round 4: three checking agents, a share each, checked every claim against sources they found themselves; a fourth read only the numbers, units, by-mass questions, agreement and the JSON against this rendering (which is generated from the JSON by script, so the two cannot drift). About forty changes were applied; the main ones are in each entry's *Checked* line. No earlier Elements batch exists, so agreement was checked within the batch and against the schema's carbon example (which this batch corrects; see *Changes to earlier files*). Reflowed into paragraphs on 25 Oct 2026 at Michael's asking, on the Pool Desk; the reflow and the editor's corrections were brought into this file by editor pass 11.

**Conventions used throughout**, so later batches can match them. Abundance is percent by weight. *Universe* is the Sun's present surface (Asplund, Amarsi & Grevesse 2021), standing in for the universe. *Crust* is the CRC Handbook value. *You* is Emsley's figures for a 70 kg adult (oxygen 43 kg, carbon 16 kg, hydrogen 7 kg, nitrogen 1.8 kg, phosphorus 0.78 kg, sulfur 0.14 kg, iron 4.2 g, silicon about 1 g, aluminium about 60 mg). Densities, melting and boiling points from RSC. Lines from the NIST Handbook of Basic Atomic Spectroscopic Data strong-line tables (neutral atom, air wavelengths, 380–750 nm; the ASD query form could not be reached from the chat, the Handbook tables could). `speed_room` is √(3kT/m) at 293 K for a single atom. The door: σT⁴ × 0.01 m², "full sunshine" at 1000 W/m², on axis at distance d = √(σT⁴·0.01/(π·1000)), the same model that gives the lab's 105,000 km for the Sun's core. The Sun's age is written 4.6 billion years, the universe's 13.8 billion.

**A new field**, `found_kind`: `isolated` (first held as itself), `shown-element` (known since antiquity; the year is when someone showed it was an element), or `antiquity`. It carries the prompt's three kinds of "found" without overloading `found_precision`. See *Changes to earlier files*.

---

## Hydrogen (H, 1)

*The lightest thing there is, the first element there was, and still most of everything.*

Three quarters of everything is hydrogen. Weigh all the ordinary matter in the universe, every star and every cloud of gas, and about three quarters of the weight is hydrogen. Count the atoms instead, and nine in every ten are hydrogen. Yet there is very little in the rock under your feet, about one part in seven hundred. It is in the sea, which is about a ninth hydrogen by weight, because water is two hydrogen atoms holding on to one of oxygen. And it is in you: about a tenth of you, most of it in your water.

Hydrogen was made in the first few minutes after the universe began, before there was a single star, and nearly all of it is still that same hydrogen. Stars do not make more. They use it up, burning it into helium, and the Sun has been doing that for about 4.6 billion years.

People saw hydrogen long before they knew what it was. When iron or zinc was dropped into acid, bubbles came up, and the gas in the bubbles would burn. In London in 1766 the chemist Henry Cavendish collected that gas, and studied it closely, and weighed it, and showed that it was a gas of its own kind. He called it inflammable air, and he found it many times lighter than ordinary air.

Later Cavendish burned it, and found that what it made was water.

Chemists in Paris repeated his experiment, and in 1787 they gave the gas its name: hydrogen, which means water-maker. So the sea is a ninth hydrogen, and you are a tenth, and nearly every atom of it is older than any star.

**Rulers.** A 10 cm cube of hydrogen gas, at room temperature and sea level, weighs less than a tenth of a gram; the same cube of water weighs more than ten thousand times as much. Hydrogen turns liquid only at 20 K and freezes at 14 K, a few steps from the bottom of the ruler. Held close, a 10 cm door into a room that cold would feel cold on your face, because your heat would be leaving through it. If its atoms were a gas on their own they would move at about 2,700 metres a second, faster than any other atom, because they are the lightest. In real hydrogen gas the atoms travel in pairs, and the pairs move at about 1,900.

**Age.** Almost every hydrogen atom is as old as the universe, about 13.8 billion years, made in its first few minutes. The hydrogen in a glass of water, or in you, is older than the Sun by about nine billion years. Stars never add to it; they only use it up.

| | |
|---|---|
| Universe / crust / you, % by weight | 74 / 0.14 / 10 |
| Birth | big-bang |
| Row, column | 1, 1 |
| Found | First held as itself, 1766 |
| 10 cm cube | 8.2e-05 kg. As the gas, at room temperature and sea level: about 0.08 grams. |
| Melts / boils | 14 K / 20.3 K |
| Atom speed as a gas, 293 K | 2700 m/s |
| Visible lines, nm (strength) | 656.3 (1), 486.1 (0.33), 434 (0.17), 410.2 (0.08), 397 (0.04), 388.9 (0.03) |
| Spectrum | Showy, and the simplest there is. Four lines are easy to see: red, blue-green, blue and violet. A hydrogen tube glows pinkish purple. The red line is what makes clouds of glowing gas in space look red in photographs. |
| Isotopes | 1: 0.999885; 2: 0.000115 |
| Stories | how-old-are-you (uses), helium (mentions) |
| Laws | — |
| Mixtures | — |
| Latin | — |

**Sources.** Royal Society of Chemistry, Periodic Table: Hydrogen (https://periodic-table.rsc.org/element/1/hydrogen): crust, density, melting and boiling, Cavendish; Asplund, Amarsi & Grevesse 2021, A&A 653, A141 (https://www.aanda.org/articles/aa/full_html/2021/09/aa40445-21/aa40445-21.html): the Sun's mass fractions, as the universe bar; Composition of the human body (Emsley's figures) (https://en.wikipedia.org/wiki/Composition_of_the_human_body): body share; Cavendish, 'Three Papers, Containing Experiments on Factitious Air', Phil. Trans. 56 (1766) (https://jimclifford.ca/philosophical-transactions-ocr-1665-1869/articles/jstor-105491/): the 1766 work; Guyton de Morveau, Lavoisier, Berthollet & Fourcroy, Méthode de nomenclature chimique (1787) (https://www.wordorigins.org/big-list-entries/hydrogen): the name in print, 1787; Avenas, C. R. Chimie 23 (2020) 221 (https://doi.org/10.5802/crchim.21): meaning of the name; NIST Handbook of Basic Atomic Spectroscopic Data, hydrogen strong lines (https://physics.nist.gov/PhysRefData/Handbook/Tables/hydrogentable2.htm): lines; John Emsley, Nature's Building Blocks (Oxford, 2nd ed. 2011): a book a parent can find

*Checked:* Checked 24 Oct 2026 by a separate agent against RSC, Asplund 2021, Emsley, Cavendish 1766 and NIST. Changed: Cavendish was not first to collect the gas (Boyle saw it in 1671), so he is now first to study, weigh and show it was its own kind; "first thing there was" became "first element"; the 1787 name is cited to the Méthode. All numbers confirmed. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md.

---

## Helium (He, 2)

*Seen in the Sun twenty-seven years before anyone held it on Earth.*

A quarter of the universe is helium, and the Earth has almost none. By weight, about a quarter of all the ordinary matter there is is helium, and only hydrogen has more. But in the Earth's rock there are about eight parts in a billion, in the air there is a trace, and in you there is almost none at all. Helium is so light, and joins with so little, that whatever reaches the air slowly leaks away into space.

Most of the helium in the universe was made in the first few minutes after the beginning, alongside the hydrogen. Stars have added a little more since, by burning hydrogen.

So people found helium in the Sun before they found it on Earth.

In August 1868 the French astronomer Pierre Janssen watched a total eclipse of the Sun from Guntur, in India. In the light from the Sun's edge he saw a bright yellow line. That October the English astronomer Norman Lockyer saw the same line from London. The line matched nothing known on Earth. Lockyer gave the stuff that made it a name, helium, from the Greek word for the Sun, and for twenty-seven years the name belonged to something nobody had ever held.

Then in March 1895, in London, the chemist William Ramsay warmed a uranium mineral called cleveite in acid, and collected the gas that came off, and looked at its light. There was the yellow line. Two Swedish chemists, Per Teodor Cleve and Nils Langlet, in Uppsala, found helium in the same mineral the same year.

It had been in the rock all along.

**Rulers.** A 10 cm cube of helium gas at room temperature and sea level weighs about a sixth of a gram, about a seventh as much as the same cube of air. Helium turns liquid at 4.2 K, nearer the bottom of the ruler than anything else, and at ordinary pressure it never freezes at all. Its atoms travel alone, not in pairs, and at room temperature they move at about 1,350 metres a second, more than two and a half times as fast as the molecules of air.

**Age.** Most of the universe's helium is as old as its hydrogen, about 13.8 billion years. The helium on Earth is different. Nearly all of it comes from uranium and thorium in the rock, which throw off tiny pieces as they slowly break down, and each piece becomes an atom of helium. That helium seeps up and gathers with natural gas, which is where balloon helium comes from. So the helium in a party balloon was made inside the Earth's rock, a little at a time, over hundreds of millions of years: younger than the Earth, and far younger than the hydrogen in the same room.

| | |
|---|---|
| Universe / crust / you, % by weight | 24 / 8e-07 / 0 |
| Birth | big-bang (also ordinary-stars) |
| Row, column | 1, 18 |
| Found | First held as itself, 1895 |
| 10 cm cube | 0.00016 kg. As the gas, at room temperature and sea level: about a sixth of a gram. |
| Melts / boils | — K / 4.2 K. Never freezes at ordinary pressure, however cold. It turns solid only when squeezed to about 25 times the pressure of the air. |
| Atom speed as a gas, 293 K | 1350 m/s |
| Visible lines, nm (strength) | 587.6 (1), 388.9 (0.6), 447.1 (0.4), 667.8 (0.4), 501.6 (0.2), 706.5 (0.2), 402.6 (0.1), 728.1 (0.1) |
| Spectrum | Showy. The bright yellow line at 587.6 nm is the one seen in the Sun in 1868. A helium tube glows a pinkish orange. |
| Isotopes | 4: 0.999999; 3: 1.34e-06 |
| Stories | helium (opens) |
| Laws | — |
| Mixtures | — |
| Latin | — |

**Sources.** Royal Society of Chemistry, Periodic Table: Helium (https://periodic-table.rsc.org/element/2/helium): density, boiling point, Ramsay, Cleve and Langlet; Marshall & Marshall, 'Rediscovery of the Elements: Helium', The HEXAGON, Summer 2012 (https://chemistry.unt.edu/system/files/james-l-marshall-pdfs/helium.pdf): Janssen, Lockyer, dates, the name; Asplund, Amarsi & Grevesse 2021, A&A 653, A141 (https://www.aanda.org/articles/aa/full_html/2021/09/aa40445-21/aa40445-21.html): the universe bar; Abundance of elements in Earth's crust (CRC Handbook column) (https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust): crust; NIST Handbook of Basic Atomic Spectroscopic Data, helium strong lines (https://physics.nist.gov/PhysRefData/Handbook/Tables/heliumtable2.htm): lines; Mary Elvira Weeks, Discovery of the Elements: a book a parent can find

*Checked:* Checked 24 Oct 2026 against RSC, Marshall 2012, PDG (primordial helium 0.245), CRC and NIST. Changed: crust to "about eight parts in a billion"; "none in you" to "almost none"; speed 1,400 to 1,350 m/s; Cleve and Langlet "that spring" to "the same year" (not confirmed to the season). Lockyer as namer confirmed. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md.

---

## Carbon (C, 6)

*Pencil lead, diamond, charcoal and nearly a quarter of you are the same stuff, arranged differently.*

A quarter of you is carbon. Not a pinch or a trace, but very nearly a quarter of everything you weigh, and only oxygen has a bigger share of you. Yet the rock of the Earth has almost none: in ten thousand spadefuls of ground you would get two of carbon, give or take, for the people who measure these things cannot agree on how to count the limestone. And in the whole universe carbon comes fourth, after hydrogen, helium and oxygen.

Deep in a star, where everything is hot and packed tight, the centres of three helium atoms are squeezed together into one atom of carbon, and the squeezing gives off heat, which is part of why the star shines. We now think about half of all the carbon there is was made in stars like the Sun, but old, near the end of their lives. The carbon rose into their outer layers and drifted off into space as the star died. The other half was made in bigger stars, which blew it off in their winds or flung it out when they exploded.

People have had carbon on their hands for as long as they have had fire. They had it as charcoal, and they had it as soot from their candles and up their chimneys. Later they had it as the black in a pencil. A few had it as diamonds.

But nobody knew that the charcoal and the pencil and the diamond were one thing.

In Paris in 1772 Antoine Lavoisier and his friends used a large lens to focus sunlight onto small diamonds, and the diamonds burned. The gas that came off them turned clear limewater cloudy, which is exactly what the gas from burning charcoal does. In 1789 Lavoisier wrote carbon down in his list of the elements.

Then in 1796, in England, Smithson Tennant put a few small diamonds into a tube made of gold, with saltpetre to make them burn, and kept the tube red hot for an hour and a half. When he looked, the diamonds were gone. He had caught the gas, and he measured it. It was the same gas that charcoal gives, and very nearly the same amount of it, weight for weight.

So the diamond was charcoal, and the charcoal was diamond, and both of them are a quarter of you.

**Rulers.** A 10 cm cube of graphite weighs about 2.2 kg, a little over twice water; the same cube of diamond weighs 3.5 kg, because the same atoms are packed tighter. Carbon never melts in open air. Heated where there is no air to burn it, it glows red, then orange, then white, and at around 3,900 to 4,100 K, depending on whose measurement you take, it turns straight to gas. A 10 cm door into a room that hot would feel like full sunshine from six or seven metres away. If its atoms were a gas at room temperature they would move at about 780 metres a second.

**Age.** Nearly every carbon atom in you was made in a star that died before the Sun was born, so most of you is older than the Sun, which is about 4.6 billion years old. About one carbon atom in a trillion is different: carbon-14, made high in the air when cosmic rays strike nitrogen, most of it within the last ten thousand years. Carbon-14 slowly turns back into nitrogen; half of any heap of it is gone in about 5,700 years. That is the clock that dates a bone or a piece of charcoal, back to about fifty thousand years, when too little is left to count.

| | |
|---|---|
| Universe / crust / you, % by weight | 0.26 / 0.02 / 23 |
| Birth | ordinary-stars (also massive-stars) |
| Row, column | 2, 14 |
| Found | Known since antiquity; shown to be an element, 1789 |
| 10 cm cube | 2.2 kg. As graphite, the black in a pencil. As diamond, 3.5 kg: the same atoms, packed tighter. |
| Melts / boils | — K / 4098 K. Does not melt in open air. Above about 3,900 to 4,100 K (measurements differ) it turns straight to gas, hotter than any other element stays solid. It melts only under about a hundred times the pressure of the air. |
| Atom speed as a gas, 293 K | 780 m/s |
| Visible lines, nm (strength) | 538 (1), 601.3 (1) |
| Spectrum | Dull. The single atom has only two faint visible lines worth listing. The blue-green at the bottom of a gas flame comes from short-lived scraps of molecules, among them pairs of carbon atoms (the green) and carbon joined to hydrogen (the blue), and a candle's yellow is glowing soot, which gives a smooth rainbow, not lines. |
| Isotopes | 12: 0.9893; 13: 0.0107; 14: 1.2e-12, half-life 5700 years → nitrogen-14 |
| Stories | how-old-are-you (uses), ash-and-sand (mentions) |
| Laws | — |
| Mixtures | steel |
| Latin | carbo (charcoal) |

**Sources.** Royal Society of Chemistry, Periodic Table: Carbon (https://periodic-table.rsc.org/element/6/carbon): crust, densities, sublimation; Tennant, 'On the Nature of the Diamond', Phil. Trans. 87 (1797) 123–127 (https://jimclifford.ca/philosophical-transactions-ocr-1665-1869/articles/jstor-106919/): the diamond proof, 1796 (burned with nitre in a gold tube; compared with Lavoisier's charcoal figure); Wisniak, 'Smithson Tennant', Educación Química 26 (2015) 250 (https://elsevier.es/en-revista-educacion-quimica-78-articulo-smithson-tennant-S0187893X15000373): the 1772 burning-lens experiments; Kobayashi, Karakas & Lugaro 2020, ApJ 900:179 (https://arxiv.org/abs/2008.04660): about half from ordinary stars; Kobayashi 2023 review, arXiv 2302.07255 (https://arxiv.org/abs/2302.07255): about half of carbon from ordinary stars; Kondev et al. 2021 (NUBASE2020), Chinese Physics C 45, 030001 (https://doi.org/10.1088/1674-1137/abddae): carbon-14 half-life; NIST Handbook of Basic Atomic Spectroscopic Data, carbon strong lines (https://physics.nist.gov/PhysRefData/Handbook/Tables/carbontable2.htm): lines; John Emsley, Nature's Building Blocks (Oxford, 2nd ed. 2011): body share; a book a parent can find

*Checked:* Checked 24 Oct 2026 against RSC, Wisniak 2015, Tennant 1797, Kobayashi 2020/2023, NUBASE2020 and NIST. Changed: Tennant did not burn equal weights of diamond and charcoal; he burned diamond with nitre in a gold tube and compared it with Lavoisier's charcoal figure; the 1772 comparison with charcoal softened; gas-flame blue is mainly CH, not C2. Could not confirm where Tennant did the work, so "in England". Crust figure uncertain by a factor of up to twenty between sources. Editor pass 11, 23 Nov 2026: 4098 K is the Royal Society of Chemistry's figure for turning to gas, opened that day. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md. Tennant's paragraph corrected from his paper (Phil. Trans. 1797), opened 23 Nov 2026: several small diamonds, a gold tube closed at one end, a strong red heat for about an hour and a half, the gas measured by its bulk.

---

## Nitrogen (N, 7)

*Four fifths of every breath, and it goes in and comes out again untouched.*

Most of every breath you take is nitrogen, and you breathe it straight out again. The air is about 78 parts nitrogen in every hundred by volume, or three quarters by weight. In the rock nitrogen is scarce, about two parts in a hundred thousand by weight, and in the universe it is about one part in fifteen hundred. But you are about two and a half percent nitrogen, nearly two kilograms of it in a person who weighs 70 kilograms, and every protein in you is built with it.

None of that came straight from your breath. In the air, nitrogen atoms go about in pairs, and each pair holds together so tightly that almost nothing can pull it apart. Lightning can. A few kinds of bacteria can. And since the early 1900s, factories can.

About three quarters of the universe's nitrogen was made from carbon, in stars of one to eight times the Sun's weight, late in their lives. The rest came from bigger stars.

In Edinburgh in 1772 a medical student named Daniel Rutherford burned candles and charcoal in closed jars of air, and let a mouse breathe the air in another jar. Then he soaked up the gas that the flames and the mouse had made. Something was left. A flame put into it went out, and a mouse could not live in it. Rutherford wrote in Latin, and the name he gave it meant harmful air. Three chemists, Carl Scheele in Sweden and Henry Cavendish and Joseph Priestley in England, found it at about the same time.

It was not harmful. It was only not the part of the air that a flame and a mouse need, and it is most of every breath.

**Rulers.** A 10 cm cube of nitrogen gas at room temperature and sea level weighs a little over a gram, almost the same as the same cube of air, since air is mostly nitrogen. Cooled to 77 K, nitrogen turns into a clear liquid that looks like water, and at 63 K it freezes. Held close, a 10 cm door into a room at 77 K would feel cold on your face, because your heat would be leaving through it. Single nitrogen atoms, if they were a gas at room temperature, would move at about 720 metres a second; in the air they travel in pairs, and the pairs move at about 510, faster than sound.

**Age.** Nearly every nitrogen atom in you, and in the air, was made in stars that died before the Sun was born, so it is more than 4.6 billion years old. A tiny amount is still made here, when carbon-14 breaks down, and an equally tiny amount unmade, when cosmic rays turn nitrogen into carbon-14.

| | |
|---|---|
| Universe / crust / you, % by weight | 0.07 / 0.002 / 2.6 |
| Birth | ordinary-stars (also massive-stars) |
| Row, column | 2, 15 |
| Found | First held as itself, 1772 |
| 10 cm cube | 0.0011 kg. As the gas, at room temperature and sea level: a little over a gram. |
| Melts / boils | 63.2 K / 77.4 K |
| Atom speed as a gas, 293 K | 720 m/s |
| Visible lines, nm (strength) | 744.2 (1), 746.8 (1), 575.3 (0.75), 742.4 (0.75), 648.3 (0.45), 496.4 (0.4) |
| Spectrum | Not showy as a single atom: its strongest visible lines are deep red, at the edge of sight. A nitrogen tube glows pink-purple, and the blue, violet and pink at the edges of the northern lights are nitrogen, but those colours come from nitrogen molecules, pairs of atoms, not single ones. |
| Isotopes | 14: 0.99636; 15: 0.00364 |
| Stories | how-old-are-you (uses) |
| Laws | — |
| Mixtures | — |
| Latin | — |

**Sources.** Royal Society of Chemistry, Periodic Table: Nitrogen (https://periodic-table.rsc.org/element/7/nitrogen): density, melting and boiling, Rutherford; Marshall & Marshall, 'Daniel Rutherford, Nitrogen, and the Demise of Phlogiston', The HEXAGON, Spring 2015 (https://chemistry.unt.edu/system/files/james-l-marshall-pdfs/nitrogen.pdf): Rutherford's experiments; azote and nitrogène; University of Edinburgh, Our History: Daniel Rutherford (https://ourhistory.is.ed.ac.uk/index.php/Daniel_Rutherford_(1749-1819)): the 1772 thesis; Kobayashi, Karakas & Lugaro 2020, ApJ 900:179 (https://arxiv.org/abs/2008.04660): birth; NIST Handbook of Basic Atomic Spectroscopic Data, nitrogen strong lines (https://physics.nist.gov/PhysRefData/Handbook/Tables/nitrogentable2.htm): lines; John Emsley, Nature's Building Blocks (Oxford, 2nd ed. 2011): body share; a book a parent can find

*Checked:* Checked 24 Oct 2026 against RSC, Marshall 2015, Edinburgh, Kobayashi 2020 (74% from AGB stars) and NIST. Changed: "mephitic air" was Rutherford's word for carbon dioxide; he called the leftover "malignant air"; "since 1913, factories" to "for a little more than a hundred years" (the arc process ran in Norway from 1903); "much of" to "about three quarters". Editor pass 11, 23 Nov 2026: Rutherford's name for the gas is given in sense only, because sources translate his Latin differently (Marshall 2015, malignant; Linda Hall Library, mephitic). The candles and charcoal rest on Marshall and were not reopened. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md.

---

## Oxygen (O, 8)

*Nearly half the rock, more than four fifths of the sea and three fifths of you, by weight.*

Nearly half of the ground is oxygen. That is by weight, and it is more than any other element: nearly half of the Earth's rock, more than four fifths of the sea, because water is mostly oxygen, and about three fifths of you. In the air it is a little under a quarter. In the universe it comes third, after hydrogen and helium, at a little over half a part in a hundred.

Most oxygen was made from helium inside big stars, more than about eight times the Sun's weight, and thrown out when those stars exploded.

Oxygen has no colour, no smell and no taste, and in the air it is mixed with four times as much nitrogen. So although it was in every rock and every river and every breath, it was a long time before anyone held it alone.

Then three people did, within a few years.

Carl Scheele made medicines in an apothecary's shop in Uppsala, in Sweden. In 1771 or 1772 he heated saltpetre, the white salt in gunpowder, and several other substances, and got a gas he called fire air. But his book was slow to be printed, and it came out only in 1777.

Joseph Priestley was an English minister who experimented with gases. On 1 August 1774 he used a burning lens to focus sunlight onto a red powder made from mercury, and a gas came off, and a candle put into that gas burned, in his words, "with a remarkably vigorous flame." Priestley published first.

In Paris the chemist Antoine Lavoisier saw that the gas was an element. In the late 1770s he named it oxygen, which means acid-maker, because he believed that every acid contained it.

He was wrong about the acids, and the name stayed.

**Rulers.** A 10 cm cube of oxygen gas at room temperature and sea level weighs about 1.3 grams, a little more than the same cube of air. At 90 K oxygen turns into a liquid, and the liquid is pale blue; at 54 K it freezes. Single oxygen atoms, as a gas at room temperature, would move at about 680 metres a second; in the air oxygen travels in pairs, and the pairs move at about 480.

**Age.** Nearly every oxygen atom in you, in the sea and in the rock was made in a big star that exploded before the Sun was born, so it is more than 4.6 billion years old. The oxygen gas you breathe is old atoms in a new arrangement: plants on land, and tiny floating algae and bacteria in the sea, split it out of water, and it is used up and remade all the time.

| | |
|---|---|
| Universe / crust / you, % by weight | 0.58 / 46 / 61 |
| Birth | massive-stars |
| Row, column | 2, 16 |
| Found | First held as itself, 1771 (about) |
| 10 cm cube | 0.0013 kg. As the gas, at room temperature and sea level: about 1.3 grams. Ozone is a second form, three atoms instead of two. |
| Melts / boils | 54.4 K / 90.2 K |
| Atom speed as a gas, 293 K | 680 m/s |
| Visible lines, nm (strength) | 615.7 (1), 615.8 (1), 700.2 (1), 725.4 (1), 615.6 (0.87), 645.6 (0.87), 394.7 (0.4) |
| Spectrum | The atom's ordinary visible lines are faint and mostly red. Its famous colours are rarer ones not in this list: the green (557.7 nm) and red (630.0 nm) of the northern lights are single oxygen atoms high in the air, where the air is so thin that an atom can wait the second or more it needs to shine before something bumps it. Liquid oxygen is pale blue, which is another thing again. |
| Isotopes | 16: 0.99757; 17: 0.00038; 18: 0.00205 |
| Stories | oxygen (opens), how-old-are-you (uses), ash-and-sand (uses) |
| Laws | — |
| Mixtures | glass |
| Latin | — |

**Sources.** Royal Society of Chemistry, Periodic Table: Oxygen (https://periodic-table.rsc.org/element/8/oxygen): density, melting and boiling, Scheele, Priestley; Abundance of elements in Earth's crust (CRC Handbook column) (https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust): crust, 46.1%; WebElements, Oxygen: geological data (https://webelements.co.uk/oxygen/geology.html): seawater, 85.7% by mass; Priestley, Experiments and Observations on Different Kinds of Air, vol. 2 (1775) (https://www.chm.bris.ac.uk/~paulmay/webprojects2004/wallis/priestley%20the%20science.htm): 1 August 1774; his words; J. R. Partington, A History of Chemistry, vol. 3 (1962): Scheele's dates; NIST Handbook of Basic Atomic Spectroscopic Data, oxygen strong lines (https://physics.nist.gov/PhysRefData/Handbook/Tables/oxygentable2.htm): lines; John Emsley, Nature's Building Blocks (Oxford, 2nd ed. 2011): body share; a book a parent can find

*Checked:* Checked 24 Oct 2026 against RSC, CRC, WebElements, Priestley 1775 and NIST. Changed: sea share to "more than four fifths" (seawater 85.7%, not pure water's 88.8%); air to "a little under a quarter" by weight; Scheele worked in an apothecary's shop and made it in 1771 or 1772 from saltpetre and other substances; aurora wording; plankton wording. Could not open Partington for Scheele's dates. Lavoisier's naming year argued (1777 or 1779), so "late 1770s". Editor pass 11, 23 Nov 2026: Priestley's words, the date and the burning lens confirmed word for word from his own account. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md.

---

## Phosphorus (P, 15)

*A stuff that glows in the dark, first boiled out of urine in Hamburg in 1669.*

Phosphorus was first found in urine, by a man who was looking for gold.

There is not much of it anywhere. In the universe it is about six parts in a million by weight, and in the rock about one part in a thousand. But in you it is about one percent, three quarters of a kilogram in a person who weighs 70 kilograms, and most of that is in your bones and your teeth.

Phosphorus was made in big stars and thrown out when they exploded. But there is a puzzle. When astronomers calculate how much phosphorus those stars should make, the answer comes out too small: in a 2012 study, about a third of what they see. In 2026 the puzzle is still argued, and some astronomers think small exploding stars called novae make the rest.

In Hamburg in 1669 an alchemist named Hennig Brand was hoping to find the philosophers' stone, which alchemists believed could turn ordinary metal into gold. He boiled down a great deal of urine, and heated what was left, until it gave off a white, waxy stuff.

And the stuff glowed in the dark, with a pale green light.

Brand kept the recipe secret. We know the year only from what he told others, which the philosopher Gottfried Leibniz wrote down and printed in 1710. Phosphorus is often called the first element whose finder we know by name.

The new stuff was called phosphorus, which is Greek for light-bearer. The glow is not light from the atoms themselves. It is the phosphorus burning, very slowly, in the air. The Paris chemist Antoine Lavoisier burned it in careful experiments in the 1770s, and came to count it as an element.

It was not gold. It is what your bones are built with.

**Rulers.** A 10 cm cube of white phosphorus, the kind Brand made, weighs about 1.8 kg; red phosphorus, the kind on the side of a matchbox, weighs about 2.2 kg for the same cube. White phosphorus melts at 317 K, about 44 °C, about where a hand pulls away from something hot, and boils at 554 K. Even before it melts, at about 30 °C in damp air, it can catch fire on its own, which is why it is kept under water. If its atoms were a gas at room temperature they would move at about 490 metres a second.

**Age.** Nearly every phosphorus atom in your bones was made in a big star that exploded before the Sun was born, so it is more than 4.6 billion years old. It reached you from the rock, by way of soil, plants and food.

| | |
|---|---|
| Universe / crust / you, % by weight | 0.0006 / 0.1 / 1.1 |
| Birth | massive-stars |
| Row, column | 3, 15 |
| Found | First held as itself, 1669 |
| 10 cm cube | 1.8 kg. As white phosphorus, the kind Brand made. Red phosphorus, the kind on a matchbox, about 2.2 kg. |
| Melts / boils | 317.3 K / 553.7 K. Figures for white phosphorus, which can catch fire by itself at about 30 °C in damp air. Red phosphorus turns to gas without melting, at a much higher temperature. |
| Atom speed as a gas, 293 K | 490 m/s |
| Visible lines, nm (strength) | 619.9 (1) |
| Spectrum | Dull: one faint visible line. The green glow of white phosphorus is not the atom's light at all; it comes from short-lived molecules made as the phosphorus burns slowly in the air. |
| Isotopes | 31: 1 |
| Stories | how-old-are-you (uses) |
| Laws | — |
| Mixtures | — |
| Latin | — |

**Sources.** Royal Society of Chemistry, Periodic Table: Phosphorus (https://periodic-table.rsc.org/element/15/phosphorus): density, melting and boiling, Brand; F. Krafft, 'Phosphorus: From Elemental Light to Chemical Element', Angew. Chem. Int. Ed. 8 (1969) (https://www.chem.pmf.hr/_download/repository/03_Krafft1969_fosfor.pdf): whose account the 1669 date is; Leibniz, Kraft, Kunckel; Cescutti et al. 2012, A&A (https://arxiv.org/abs/1112.3824): the phosphorus shortfall in models; Bekki & Tsujimoto 2024, arXiv 2405.06325 (https://arxiv.org/abs/2405.06325): novae as an extra phosphorus source; Gakis et al. 2026, arXiv 2609.20930 (https://arxiv.org/abs/2609.20930): models still struggle, 2026; NOAA CAMEO Chemicals: phosphorus, white (https://cameochemicals.noaa.gov/chemical/1337): ignites about 30 °C in moist air; Abundance of elements in Earth's crust (CRC Handbook column) (https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust): crust; NIST Handbook of Basic Atomic Spectroscopic Data, phosphorus strong lines (https://physics.nist.gov/PhysRefData/Handbook/Tables/phosphorustable2.htm): lines; John Emsley, The Shocking History of Phosphorus (Macmillan, 2000); US title The 13th Element: a book a parent can find

*Checked:* Checked 24 Oct 2026 against RSC, Krafft 1969, Cescutti 2012, Bekki & Tsujimoto 2024, CAMEO and NIST. Changed: "nearly all" in bones to "most" (85–90%); the model shortfall dated and the novae idea added; Lavoisier's "1777" softened to "in the 1770s" (Krafft puts it with the 1789 Traité); self-ignition at about 30 °C in damp air. Gakis et al. 2026 opened by the editor, 23 Nov 2026: its abstract says current models struggle to reproduce the observed trends. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md.

*Watch:* whether models of exploding stars and novae still make too little phosphorus · last checked 2026-11-23 · every 1 year

---

## Sulfur (S, 16)

*Brimstone: the yellow stone that collects at volcanoes and burns with a blue flame.*

Sulfur is the yellow stone that burns. There is not much of it: about three parts in ten thousand of the universe by weight, and about the same of the Earth's rock. You carry about 140 grams, a fifth of one percent of your weight, most of it in your proteins, and your hair and your nails are among the parts of you richest in it.

Most of the universe's sulfur was made in the last, hottest stages inside big stars, and thrown out when they exploded. Some came from exploding white dwarfs, the small dead cores that stars like the Sun leave behind.

People have known sulfur for as long as they have known volcanoes. It gathers as a yellow crust around the vents of volcanoes and around hot springs, and it burns with a blue flame and a choking smell. The King James Bible calls it brimstone, which means burning stone. The ancient Greeks burned it to cleanse a house: in Homer's Odyssey, Odysseus burns sulfur in his hall.

But the stone itself has almost no smell.

The rotten-egg smell near a hot spring is a gas, sulfur joined to hydrogen. The choking smell of the flame is another gas, sulfur joined to oxygen. Pure sulfur smells of next to nothing.

For a long time chemists were not sure that sulfur was an element at all. The Paris chemist Antoine Lavoisier counted it as one in 1777, and in 1809 the chemists Joseph Gay-Lussac and Louis Thénard, also in Paris, settled the question.

So the yellow crust at the mouth of a volcano and a little of each of your fingernails are the same stuff.

**Rulers.** A 10 cm cube of sulfur, the ordinary yellow crystal, weighs about 2.1 kg, twice water. Sulfur melts at 388 K, about 115 °C, into a yellow liquid that turns dark red and thick as it gets hotter, then thins again near boiling. It boils at 718 K, still too cool to glow. If its atoms were a gas at room temperature they would move at about 480 metres a second.

**Age.** Nearly all the sulfur on Earth, and in you, was made in stars that died before the Sun was born, so it is more than 4.6 billion years old. The yellow crust at a volcano's mouth is that same old sulfur, brought up from inside the Earth.

| | |
|---|---|
| Universe / crust / you, % by weight | 0.031 / 0.035 / 0.2 |
| Birth | massive-stars (also collisions) |
| Row, column | 3, 16 |
| Found | Known since antiquity; shown to be an element, 1777 |
| 10 cm cube | 2.1 kg. As the ordinary yellow crystal. Another crystal form, made by letting melted sulfur cool, is about 1.96 kg. |
| Melts / boils | 388.4 K / 717.8 K |
| Atom speed as a gas, 293 K | 480 m/s |
| Visible lines, nm (strength) | 469.4 (1), 675.7 (1) |
| Spectrum | Dull: two faint visible lines. The blue flame of burning sulfur comes from molecules, not single atoms. |
| Isotopes | 32: 0.9499; 33: 0.0075; 34: 0.0425; 36: 0.0001 |
| Stories | how-old-are-you (uses) |
| Laws | — |
| Mixtures | — |
| Latin | sulfur |

**Sources.** Royal Society of Chemistry, Periodic Table: Sulfur (https://periodic-table.rsc.org/element/16/sulfur): body, density, melting and boiling, Gay-Lussac and Thénard; Abundance of elements in Earth's crust (CRC Handbook column) (https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust): crust; Kobayashi, Karakas & Lugaro 2020, ApJ 900:179 (https://arxiv.org/abs/2008.04660): birth; NIST Handbook of Basic Atomic Spectroscopic Data, sulfur strong lines (https://physics.nist.gov/PhysRefData/Handbook/Tables/sulfurtable2.htm): lines; NIST Atomic Weights and Isotopic Compositions: S (https://www.physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=S): isotopes; Theodore Gray, The Elements (2009): a book a parent can find

*Checked:* Checked 24 Oct 2026 against RSC, CRC, NIST, the Odyssey (Book 22) and Kobayashi 2020. Changed: hair and nails are rich in sulfur but do not hold a large share; the Greek cleansing now cites Homer. Could not confirm a percentage for the white-dwarf share, so "some". Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md.

---

## Silicon (Si, 14)

*More than a quarter of the ground under your feet, and nobody saw it alone until 1824.*

More than a quarter of the ground under your feet is silicon, and until 1824 nobody had ever seen it.

By weight, only oxygen has a bigger share of the Earth's rock. Most of the silicon is joined to oxygen: as sand, as quartz, as flint, and in the minerals of granite and clay. In the universe silicon is about seven parts in ten thousand by weight. In you there is only a gram or so, and nobody is sure your body needs any of it.

Silicon was made inside big stars near the end of their lives and thrown out when they exploded. A smaller share came from exploding white dwarfs, the small dead cores that stars like the Sun leave behind.

People have had silicon in their hands since the first flint tools. They chipped it, joined to oxygen, into blades. For about four thousand years they have melted it, joined to oxygen, into glass.

But nobody had seen silicon itself, because it holds on to oxygen so hard.

In 1808 the chemist Humphry Davy, in London, guessed that sand held an element, and gave the element a name, but he could not get it out. In Stockholm in 1824 the chemist Jöns Jacob Berzelius did. He took a salt made of potassium, silicon and fluorine, and heated it with more potassium, and washed away everything else. What was left was a brown powder: silicon, alone. Grey crystals of silicon were made about thirty years later.

In 2026 nearly every computer chip is built on a thin slice cut from a single silicon crystal. The oldest tools were made of silicon, and so are the newest.

**Rulers.** A 10 cm cube of silicon, a dark grey crystal with a shine like metal, weighs about 2.3 kg, a little more than twice water. Silicon melts at 1,687 K, glowing bright yellow by then, and a 10 cm door into a room that hot would feel like full sunshine from a little over a metre away. It boils at 3,538 K. If its atoms were a gas at room temperature they would move at about 510 metres a second.

**Age.** Nearly every silicon atom in a grain of sand was made in a star that exploded before the Sun was born, so the silicon is more than 4.6 billion years old, even if the grain was broken out of its rock quite recently.

| | |
|---|---|
| Universe / crust / you, % by weight | 0.067 / 28 / 0.0014 |
| Birth | massive-stars (also collisions) |
| Row, column | 3, 14 |
| Found | First held as itself, 1824 |
| 10 cm cube | 2.3 kg. As the dark grey crystal. Berzelius's first silicon was a brown powder. |
| Melts / boils | 1687 K / 3538 K |
| Atom speed as a gas, 293 K | 510 m/s |
| Visible lines, nm (strength) | 390.6 (1), 728.9 (0.5), 742.3 (0.5), 740.6 (0.45), 570.8 (0.4), 568.4 (0.3), 703.5 (0.3), 741.6 (0.3), 594.9 (0.25), 716.6 (0.25) |
| Spectrum | Not showy. One violet line at the edge of sight and a scatter of faint yellow-green and red lines. Silicon gives a flame no colour. |
| Isotopes | 28: 0.92223; 29: 0.04685; 30: 0.03092 |
| Stories | silicon (opens), ash-and-sand (uses), how-old-are-you (mentions) |
| Laws | — |
| Mixtures | glass |
| Latin | silex (flint) |

**Sources.** Royal Society of Chemistry, Periodic Table: Silicon (https://periodic-table.rsc.org/element/14/silicon): density, melting and boiling, Berzelius 1824; Abundance of elements in Earth's crust (CRC Handbook column) (https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust): crust, 28.2%; Wikipedia, Silicon (history, citing Thomson 1817 and Berzelius) (https://en.wikipedia.org/wiki/Silicon): Davy 1808, Gay-Lussac and Thénard 1811, Deville about 1854; Corning Museum of Glass, 'Origins of Glassmaking' (https://whatson.cmog.org/exhibitions-galleries/origins-glassmaking): first glass, Mesopotamia, about 4,000 years ago; Kobayashi, Karakas & Lugaro 2020, ApJ 900:179 (https://arxiv.org/abs/2008.04660): birth; NIST Handbook of Basic Atomic Spectroscopic Data, silicon strong lines (https://physics.nist.gov/PhysRefData/Handbook/Tables/silicontable2.htm): lines; John Emsley, Nature's Building Blocks (Oxford, 2nd ed. 2011): body; a book a parent can find

*Checked:* Checked 24 Oct 2026 against RSC, CRC, Wikipedia's history (Davy, Thomson, Deville), Corning Museum of Glass and NIST. Changed: Berzelius's salt was potassium fluorosilicate; glass "more than" to "about four thousand years" (Corning: about 4,000 years, Mesopotamia); spectrum colours; one wavelength 742.4 to 742.3. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md.

*Watch:* computer chips still built on silicon · last checked 2026-10-24 · every 1 year

---

## Aluminium (Al, 13)

*The most common metal in the ground, and for a few years a luxury, priced like silver.*

There is more aluminium in the ground than any other metal, and until the 1820s nobody had seen a scrap of it.

By weight, about a twelfth of the Earth's rock is aluminium. Among all the elements only oxygen and silicon have more. In the universe it is about fifty parts in a million. In you there is almost none, less than a tenth of a gram, and as far as anyone knows your body has no use for it.

Aluminium was made inside big stars and thrown out when they exploded.

Clay is full of aluminium. People dug clay, and shaped it, and baked it into pots and bricks for thousands of years, and never saw the metal inside. Aluminium holds on to oxygen so hard that a charcoal fire, which frees iron and copper from their ores, cannot pull it loose.

Hans Christian Ørsted, in Copenhagen, got a small impure lump in 1825. Friedrich Wöhler, in Berlin, made it as a grey powder in 1827, and most histories count his as the first true aluminium.

Then, for a while, it was precious. In 1855 the French chemist Henri Sainte-Claire Deville showed small bars of it in Paris as silver from clay, and for some years it sold at about the price of silver.

In 1886 two men, Charles Hall in the United States and Paul Héroult in France, each found a way to make it cheaply with electricity. The price fell, and kept falling, until the metal that had cost as much as silver was wrapping sandwiches.

**Rulers.** A 10 cm cube of aluminium weighs 2.7 kg, not quite three times water and about a third as much as the same cube of iron. It melts at 933 K, about 660 °C. Melted aluminium is barely hot enough to glow, so in a lit room it looks like liquid silver, not red. It boils at 2,792 K. If its atoms were a gas at room temperature they would move at about 520 metres a second.

**Age.** Nearly every aluminium atom on Earth was made in big stars that died before the Sun was born, so it is more than 4.6 billion years old. A short-lived kind, aluminium-26, was still fresh when the Sun and planets formed, and its heat helped melt some of the first small worlds. Half of any heap of it is gone in about 700,000 years, so that first supply has long since disappeared.

| | |
|---|---|
| Universe / crust / you, % by weight | 0.0054 / 8.2 / 9e-05 |
| Birth | massive-stars |
| Row, column | 3, 13 |
| Found | First held as itself, 1827 |
| 10 cm cube | 2.7 kg |
| Melts / boils | 933.5 K / 2792 K |
| Atom speed as a gas, 293 K | 520 m/s |
| Visible lines, nm (strength) | 396.2 (1), 394.4 (0.5), 669.6 (0.04) |
| Spectrum | Two strong violet lines at the very edge of sight, and almost nothing else. Aluminium gives a flame no colour; the white sparks of aluminium in fireworks are heat glow, not lines. |
| Isotopes | 27: 1; 26: 0, half-life 717,000 years → magnesium-26 |
| Stories | how-old-are-you (mentions) |
| Laws | — |
| Mixtures | — |
| Latin | alumen (alum) |

**Sources.** Royal Society of Chemistry, Periodic Table: Aluminium (https://www.rsc.org/periodic-table/element/13/aluminium): density, melting and boiling, Ørsted; Wikipedia, History of aluminium (citing Wöhler 1827, Drozdov 2007, Essig 1900) (https://en.wikipedia.org/wiki/History_of_aluminium): Wöhler, Deville, the 1855 price; Laparra 2015, 'A portrait of aluminium, metal of dream and modernity', ICSOBA Travaux 44 (https://icsoba.org/assets/files/publications/2015/Papers/KN02%20-%20A%20portrait%20of%20aluminium,%20metal%20of%20dream%20and%20modernity.pdf): 'at the level of silver', 1855–60; Binczewski 1995, 'The Point of a Monument', JOM 47(11) (https://www.tms.org/pubs/journals/jom/9511/binczewski-9511.html): 1884 price, same as silver; NIST Handbook of Basic Atomic Spectroscopic Data, aluminum strong lines (https://physics.nist.gov/PhysRefData/Handbook/Tables/aluminumtable2.htm): lines; John Emsley, Nature's Building Blocks (Oxford, 2nd ed. 2011): a book a parent can find

*Checked:* Checked 24 Oct 2026 against RSC, Laparra 2015, Binczewski 1995, Wikipedia's history (Wöhler 1827, Essig 1900) and NIST. Confirmed: Wöhler in Berlin, "grey powder" in his own words, Deville in 1855, priced like silver 1855–60, Hall and Héroult 1886. The lab's "in 1850 rarer than gold" could not be documented as a market price; this entry says "priced like silver". Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md.

---

## Iron (Fe, 26)

*A little more than a twentieth of the ground, a third of the whole Earth, and the point where stars stop getting heat from building.*

A third of the whole Earth is iron, and most of it is where nobody has ever seen it.

By weight, iron is a little more than a twentieth of the Earth's rock. But while the young Earth was molten, most of its iron sank to the middle and made the core, so that iron is about a third of the whole planet, more than any other element. In the universe it is about one part in a thousand. In you there are about four grams, most of it in your blood, where it carries oxygen.

Stars build heavier atoms out of lighter ones, and they get heat for doing it. But near iron the building stops paying: to make anything heavier costs energy instead of giving it. We now think about half of all iron was made in big stars that exploded, and about half in exploding white dwarfs, the small dead cores that stars like the Sun leave behind. The share is still argued.

People held iron long before they could make it, and the oldest iron we know they held fell out of the sky.

More than five thousand years ago, people at Gerzeh, in Egypt, hammered beads from a fallen meteorite and buried them in a grave. Getting iron out of rock is harder. It takes a hot charcoal fire and skill, and people in Anatolia, the land that is now Turkey, were doing it at least 3,500 years ago, perhaps much earlier; the date is argued. The Paris chemist Antoine Lavoisier listed iron among the elements in 1789.

So there is iron from exploded stars in the middle of the Earth, and in a bead from a grave in Egypt, and in your blood.

**Rulers.** A 10 cm cube of iron weighs about 7.9 kg, nearly eight times water. Iron melts at 1,811 K, glowing yellow-white by then. Because it melts so high, a blacksmith can soften it in the forge and hammer it without its running away. A 10 cm door into a room that hot would feel like full sunshine from a little under a metre and a half away. Iron boils at 3,134 K. If its atoms were a gas at room temperature they would move at about 360 metres a second, slow, because they are heavy.

**Age.** Nearly every iron atom in your blood was made in a star that blew up before the Sun was born, so it is more than 4.6 billion years old. Most of it was first made as a kind of nickel, which turned into cobalt and then, mostly within a year, into iron. An exploding white dwarf usually goes off hundreds of millions to billions of years after its star was born, so much of the iron in our galaxy, the Milky Way, arrived later than the oxygen.

| | |
|---|---|
| Universe / crust / you, % by weight | 0.12 / 5.6 / 0.006 |
| Birth | collisions (also massive-stars) |
| Row, column | 4, 8 |
| Found | Known since antiquity; shown to be an element, 1789 |
| 10 cm cube | 7.9 kg |
| Melts / boils | 1811 K / 3134 K |
| Atom speed as a gas, 293 K | 360 m/s |
| Visible lines, nm (strength) | 382 (1), 386 (1), 388.6 (0.6), 404.6 (0.6), 382.4 (0.5), 385.6 (0.5), 516.7 (0.5), 393 (0.4), 438.4 (0.4), 495.8 (0.3) |
| Spectrum | Hundreds of lines, crowded into the violet and blue, so none stands out; a glowing iron spark is coloured by its heat, not its lines. Many of the dark lines in the Sun's rainbow are iron's. |
| Isotopes | 54: 0.05845; 56: 0.91754; 57: 0.02119; 58: 0.00282 |
| Stories | how-old-are-you (uses) |
| Laws | 9 |
| Mixtures | steel |
| Latin | ferrum |

**Sources.** Royal Society of Chemistry, Periodic Table: Iron (https://www.rsc.org/periodic-table/element/26/iron): density, melting and boiling, body; Abundance of elements in Earth's crust (CRC Handbook column) (https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust): crust, 5.63%; McDonough 2005, bulk Earth composition (via KnowledgeDoor) (https://www.knowledgedoor.com/2/elements_handbook/element_abundances_in_the_bulk_earth.html): whole Earth, 32%; Kobayashi, Karakas & Lugaro 2020, ApJ 900:179 (https://arxiv.org/abs/2008.04660): half of iron-peak elements from Type Ia; Rehren et al. 2013, J. Archaeological Science (UCL release) (https://www.ucl.ac.uk/news/2013/aug/earliest-known-iron-artefacts-come-outer-space): the Gerzeh beads; Archaeology magazine, 'Anatolia iron smelting' (Kaman-Kalehöyük, 2019) (https://www.archaeology.org/news/7495-190325-anatolia-iron-smelting): smelting perhaps much earlier; NIST Handbook of Basic Atomic Spectroscopic Data, iron strong lines (https://physics.nist.gov/PhysRefData/Handbook/Tables/irontable2.htm): lines; Hugh Aldersey-Williams, Periodic Tales (2011): a book a parent can find

*Checked:* Checked 24 Oct 2026 against RSC, CRC, McDonough 2005 (Fe 32%, O 29.7%), Kobayashi 2020, UCL (Gerzeh), Archaeology magazine and NIST. Changed: "a twentieth" to "a little more than a twentieth" (5.6%); door distance; nickel-to-iron "mostly within a year"; white-dwarf delay counted from the star's birth. The earliest smelting date is argued and said so. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md.

*Watch:* how much of the iron came from exploding white dwarfs · last checked 2026-10-24 (the batch's own check; not searched again) · every 1 year

---


## The records

For `data/elements.json`.

```json
[
 {
  "id": "hydrogen",
  "symbol": "H",
  "name": "Hydrogen",
  "z": 1,
  "shelf": "core",
  "guest_of": "",
  "latin": "",
  "abundance": {
   "universe": 74,
   "crust": 0.14,
   "body": 10
  },
  "birth": "big-bang",
  "birth_also": "",
  "row": 1,
  "column": 1,
  "found": 1766,
  "found_precision": "year",
  "found_kind": "isolated",
  "cube_kg": 8.2e-05,
  "cube_note": "As the gas, at room temperature and sea level: about 0.08 grams.",
  "melt_k": 14.0,
  "boil_k": 20.3,
  "temp_note": "",
  "speed_room": 2700,
  "lines": [
   [
    656.3,
    1.0
   ],
   [
    486.1,
    0.33
   ],
   [
    434.0,
    0.17
   ],
   [
    410.2,
    0.08
   ],
   [
    397.0,
    0.04
   ],
   [
    388.9,
    0.03
   ]
  ],
  "spectrum_note": "Showy, and the simplest there is. Four lines are easy to see: red, blue-green, blue and violet. A hydrogen tube glows pinkish purple. The red line is what makes clouds of glowing gas in space look red in photographs.",
  "isotopes": [
   {
    "a": 1,
    "share": 0.999885,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 2,
    "share": 0.000115,
    "halflife": "stable",
    "decays_to": null
   }
  ],
  "line": "The lightest thing there is, the first element there was, and still most of everything.",
  "words": "Three quarters of everything is hydrogen. Weigh all the ordinary matter in the universe, every star and every cloud of gas, and about three quarters of the weight is hydrogen. Count the atoms instead, and nine in every ten are hydrogen. Yet there is very little in the rock under your feet, about one part in seven hundred. It is in the sea, which is about a ninth hydrogen by weight, because water is two hydrogen atoms holding on to one of oxygen. And it is in you: about a tenth of you, most of it in your water.\n\nHydrogen was made in the first few minutes after the universe began, before there was a single star, and nearly all of it is still that same hydrogen. Stars do not make more. They use it up, burning it into helium, and the Sun has been doing that for about 4.6 billion years.\n\nPeople saw hydrogen long before they knew what it was. When iron or zinc was dropped into acid, bubbles came up, and the gas in the bubbles would burn. In London in 1766 the chemist Henry Cavendish collected that gas, and studied it closely, and weighed it, and showed that it was a gas of its own kind. He called it inflammable air, and he found it many times lighter than ordinary air.\n\nLater Cavendish burned it, and found that what it made was water.\n\nChemists in Paris repeated his experiment, and in 1787 they gave the gas its name: hydrogen, which means water-maker. So the sea is a ninth hydrogen, and you are a tenth, and nearly every atom of it is older than any star.",
  "rulers_words": "A 10 cm cube of hydrogen gas, at room temperature and sea level, weighs less than a tenth of a gram; the same cube of water weighs more than ten thousand times as much. Hydrogen turns liquid only at 20 K and freezes at 14 K, a few steps from the bottom of the ruler. Held close, a 10 cm door into a room that cold would feel cold on your face, because your heat would be leaving through it. If its atoms were a gas on their own they would move at about 2,700 metres a second, faster than any other atom, because they are the lightest. In real hydrogen gas the atoms travel in pairs, and the pairs move at about 1,900.",
  "age_words": "Almost every hydrogen atom is as old as the universe, about 13.8 billion years, made in its first few minutes. The hydrogen in a glass of water, or in you, is older than the Sun by about nine billion years. Stars never add to it; they only use it up.",
  "stories": [
   {
    "id": "how-old-are-you",
    "role": "uses"
   },
   {
    "id": "helium",
    "role": "mentions"
   }
  ],
  "laws": [],
  "mixtures": [],
  "sources": [
   {
    "title": "Royal Society of Chemistry, Periodic Table: Hydrogen",
    "used_for": "crust, density, melting and boiling, Cavendish",
    "url": "https://periodic-table.rsc.org/element/1/hydrogen"
   },
   {
    "title": "Asplund, Amarsi & Grevesse 2021, A&A 653, A141",
    "used_for": "the Sun's mass fractions, as the universe bar",
    "url": "https://www.aanda.org/articles/aa/full_html/2021/09/aa40445-21/aa40445-21.html"
   },
   {
    "title": "Composition of the human body (Emsley's figures)",
    "used_for": "body share",
    "url": "https://en.wikipedia.org/wiki/Composition_of_the_human_body"
   },
   {
    "title": "Cavendish, 'Three Papers, Containing Experiments on Factitious Air', Phil. Trans. 56 (1766)",
    "used_for": "the 1766 work",
    "url": "https://jimclifford.ca/philosophical-transactions-ocr-1665-1869/articles/jstor-105491/"
   },
   {
    "title": "Guyton de Morveau, Lavoisier, Berthollet & Fourcroy, Méthode de nomenclature chimique (1787)",
    "used_for": "the name in print, 1787",
    "url": "https://www.wordorigins.org/big-list-entries/hydrogen"
   },
   {
    "title": "Avenas, C. R. Chimie 23 (2020) 221",
    "used_for": "meaning of the name",
    "url": "https://doi.org/10.5802/crchim.21"
   },
   {
    "title": "NIST Handbook of Basic Atomic Spectroscopic Data, hydrogen strong lines",
    "used_for": "lines",
    "url": "https://physics.nist.gov/PhysRefData/Handbook/Tables/hydrogentable2.htm"
   },
   {
    "title": "John Emsley, Nature's Building Blocks (Oxford, 2nd ed. 2011)",
    "used_for": "a book a parent can find",
    "url": ""
   }
  ],
  "checks": [
   {
    "claim": "every number, name, date, line, isotope and reference in this record",
    "verdict": "Checked 24 Oct 2026 by a separate agent against RSC, Asplund 2021, Emsley, Cavendish 1766 and NIST. Changed: Cavendish was not first to collect the gas (Boyle saw it in 1671), so he is now first to study, weigh and show it was its own kind; \"first thing there was\" became \"first element\"; the 1787 name is cited to the Méthode. All numbers confirmed. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md."
   }
  ],
  "watch": [],
  "state": "approved"
 },
 {
  "id": "helium",
  "symbol": "He",
  "name": "Helium",
  "z": 2,
  "shelf": "core",
  "guest_of": "",
  "latin": "",
  "abundance": {
   "universe": 24,
   "crust": 8e-07,
   "body": 0
  },
  "birth": "big-bang",
  "birth_also": "ordinary-stars",
  "row": 1,
  "column": 18,
  "found": 1895,
  "found_precision": "year",
  "found_kind": "isolated",
  "cube_kg": 0.00016,
  "cube_note": "As the gas, at room temperature and sea level: about a sixth of a gram.",
  "melt_k": null,
  "boil_k": 4.2,
  "temp_note": "Never freezes at ordinary pressure, however cold. It turns solid only when squeezed to about 25 times the pressure of the air.",
  "speed_room": 1350,
  "lines": [
   [
    587.6,
    1.0
   ],
   [
    388.9,
    0.6
   ],
   [
    447.1,
    0.4
   ],
   [
    667.8,
    0.4
   ],
   [
    501.6,
    0.2
   ],
   [
    706.5,
    0.2
   ],
   [
    402.6,
    0.1
   ],
   [
    728.1,
    0.1
   ]
  ],
  "spectrum_note": "Showy. The bright yellow line at 587.6 nm is the one seen in the Sun in 1868. A helium tube glows a pinkish orange.",
  "isotopes": [
   {
    "a": 4,
    "share": 0.99999866,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 3,
    "share": 1.34e-06,
    "halflife": "stable",
    "decays_to": null
   }
  ],
  "line": "Seen in the Sun twenty-seven years before anyone held it on Earth.",
  "words": "A quarter of the universe is helium, and the Earth has almost none. By weight, about a quarter of all the ordinary matter there is is helium, and only hydrogen has more. But in the Earth's rock there are about eight parts in a billion, in the air there is a trace, and in you there is almost none at all. Helium is so light, and joins with so little, that whatever reaches the air slowly leaks away into space.\n\nMost of the helium in the universe was made in the first few minutes after the beginning, alongside the hydrogen. Stars have added a little more since, by burning hydrogen.\n\nSo people found helium in the Sun before they found it on Earth.\n\nIn August 1868 the French astronomer Pierre Janssen watched a total eclipse of the Sun from Guntur, in India. In the light from the Sun's edge he saw a bright yellow line. That October the English astronomer Norman Lockyer saw the same line from London. The line matched nothing known on Earth. Lockyer gave the stuff that made it a name, helium, from the Greek word for the Sun, and for twenty-seven years the name belonged to something nobody had ever held.\n\nThen in March 1895, in London, the chemist William Ramsay warmed a uranium mineral called cleveite in acid, and collected the gas that came off, and looked at its light. There was the yellow line. Two Swedish chemists, Per Teodor Cleve and Nils Langlet, in Uppsala, found helium in the same mineral the same year.\n\nIt had been in the rock all along.",
  "rulers_words": "A 10 cm cube of helium gas at room temperature and sea level weighs about a sixth of a gram, about a seventh as much as the same cube of air. Helium turns liquid at 4.2 K, nearer the bottom of the ruler than anything else, and at ordinary pressure it never freezes at all. Its atoms travel alone, not in pairs, and at room temperature they move at about 1,350 metres a second, more than two and a half times as fast as the molecules of air.",
  "age_words": "Most of the universe's helium is as old as its hydrogen, about 13.8 billion years. The helium on Earth is different. Nearly all of it comes from uranium and thorium in the rock, which throw off tiny pieces as they slowly break down, and each piece becomes an atom of helium. That helium seeps up and gathers with natural gas, which is where balloon helium comes from. So the helium in a party balloon was made inside the Earth's rock, a little at a time, over hundreds of millions of years: younger than the Earth, and far younger than the hydrogen in the same room.",
  "stories": [
   {
    "id": "helium",
    "role": "opens"
   }
  ],
  "laws": [],
  "mixtures": [],
  "sources": [
   {
    "title": "Royal Society of Chemistry, Periodic Table: Helium",
    "used_for": "density, boiling point, Ramsay, Cleve and Langlet",
    "url": "https://periodic-table.rsc.org/element/2/helium"
   },
   {
    "title": "Marshall & Marshall, 'Rediscovery of the Elements: Helium', The HEXAGON, Summer 2012",
    "used_for": "Janssen, Lockyer, dates, the name",
    "url": "https://chemistry.unt.edu/system/files/james-l-marshall-pdfs/helium.pdf"
   },
   {
    "title": "Asplund, Amarsi & Grevesse 2021, A&A 653, A141",
    "used_for": "the universe bar",
    "url": "https://www.aanda.org/articles/aa/full_html/2021/09/aa40445-21/aa40445-21.html"
   },
   {
    "title": "Abundance of elements in Earth's crust (CRC Handbook column)",
    "used_for": "crust",
    "url": "https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust"
   },
   {
    "title": "NIST Handbook of Basic Atomic Spectroscopic Data, helium strong lines",
    "used_for": "lines",
    "url": "https://physics.nist.gov/PhysRefData/Handbook/Tables/heliumtable2.htm"
   },
   {
    "title": "Mary Elvira Weeks, Discovery of the Elements",
    "used_for": "a book a parent can find",
    "url": ""
   }
  ],
  "checks": [
   {
    "claim": "every number, name, date, line, isotope and reference in this record",
    "verdict": "Checked 24 Oct 2026 against RSC, Marshall 2012, PDG (primordial helium 0.245), CRC and NIST. Changed: crust to \"about eight parts in a billion\"; \"none in you\" to \"almost none\"; speed 1,400 to 1,350 m/s; Cleve and Langlet \"that spring\" to \"the same year\" (not confirmed to the season). Lockyer as namer confirmed. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md."
   }
  ],
  "watch": [],
  "state": "approved"
 },
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
 },
 {
  "id": "nitrogen",
  "symbol": "N",
  "name": "Nitrogen",
  "z": 7,
  "shelf": "core",
  "guest_of": "",
  "latin": "",
  "abundance": {
   "universe": 0.07,
   "crust": 0.002,
   "body": 2.6
  },
  "birth": "ordinary-stars",
  "birth_also": "massive-stars",
  "row": 2,
  "column": 15,
  "found": 1772,
  "found_precision": "year",
  "found_kind": "isolated",
  "cube_kg": 0.0011,
  "cube_note": "As the gas, at room temperature and sea level: a little over a gram.",
  "melt_k": 63.2,
  "boil_k": 77.4,
  "temp_note": "",
  "speed_room": 720,
  "lines": [
   [
    744.2,
    1.0
   ],
   [
    746.8,
    1.0
   ],
   [
    575.3,
    0.75
   ],
   [
    742.4,
    0.75
   ],
   [
    648.3,
    0.45
   ],
   [
    496.4,
    0.4
   ]
  ],
  "spectrum_note": "Not showy as a single atom: its strongest visible lines are deep red, at the edge of sight. A nitrogen tube glows pink-purple, and the blue, violet and pink at the edges of the northern lights are nitrogen, but those colours come from nitrogen molecules, pairs of atoms, not single ones.",
  "isotopes": [
   {
    "a": 14,
    "share": 0.99636,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 15,
    "share": 0.00364,
    "halflife": "stable",
    "decays_to": null
   }
  ],
  "line": "Four fifths of every breath, and it goes in and comes out again untouched.",
  "words": "Most of every breath you take is nitrogen, and you breathe it straight out again. The air is about 78 parts nitrogen in every hundred by volume, or three quarters by weight. In the rock nitrogen is scarce, about two parts in a hundred thousand by weight, and in the universe it is about one part in fifteen hundred. But you are about two and a half percent nitrogen, nearly two kilograms of it in a person who weighs 70 kilograms, and every protein in you is built with it.\n\nNone of that came straight from your breath. In the air, nitrogen atoms go about in pairs, and each pair holds together so tightly that almost nothing can pull it apart. Lightning can. A few kinds of bacteria can. And since the early 1900s, factories can.\n\nAbout three quarters of the universe's nitrogen was made from carbon, in stars of one to eight times the Sun's weight, late in their lives. The rest came from bigger stars.\n\nIn Edinburgh in 1772 a medical student named Daniel Rutherford burned candles and charcoal in closed jars of air, and let a mouse breathe the air in another jar. Then he soaked up the gas that the flames and the mouse had made. Something was left. A flame put into it went out, and a mouse could not live in it. Rutherford wrote in Latin, and the name he gave it meant harmful air. Three chemists, Carl Scheele in Sweden and Henry Cavendish and Joseph Priestley in England, found it at about the same time.\n\nIt was not harmful. It was only not the part of the air that a flame and a mouse need, and it is most of every breath.",
  "rulers_words": "A 10 cm cube of nitrogen gas at room temperature and sea level weighs a little over a gram, almost the same as the same cube of air, since air is mostly nitrogen. Cooled to 77 K, nitrogen turns into a clear liquid that looks like water, and at 63 K it freezes. Held close, a 10 cm door into a room at 77 K would feel cold on your face, because your heat would be leaving through it. Single nitrogen atoms, if they were a gas at room temperature, would move at about 720 metres a second; in the air they travel in pairs, and the pairs move at about 510, faster than sound.",
  "age_words": "Nearly every nitrogen atom in you, and in the air, was made in stars that died before the Sun was born, so it is more than 4.6 billion years old. A tiny amount is still made here, when carbon-14 breaks down, and an equally tiny amount unmade, when cosmic rays turn nitrogen into carbon-14.",
  "stories": [
   {
    "id": "how-old-are-you",
    "role": "uses"
   }
  ],
  "laws": [],
  "mixtures": [],
  "sources": [
   {
    "title": "Royal Society of Chemistry, Periodic Table: Nitrogen",
    "used_for": "density, melting and boiling, Rutherford",
    "url": "https://periodic-table.rsc.org/element/7/nitrogen"
   },
   {
    "title": "Marshall & Marshall, 'Daniel Rutherford, Nitrogen, and the Demise of Phlogiston', The HEXAGON, Spring 2015",
    "used_for": "Rutherford's experiments; azote and nitrogène",
    "url": "https://chemistry.unt.edu/system/files/james-l-marshall-pdfs/nitrogen.pdf"
   },
   {
    "title": "University of Edinburgh, Our History: Daniel Rutherford",
    "used_for": "the 1772 thesis",
    "url": "https://ourhistory.is.ed.ac.uk/index.php/Daniel_Rutherford_(1749-1819)"
   },
   {
    "title": "Kobayashi, Karakas & Lugaro 2020, ApJ 900:179",
    "used_for": "birth",
    "url": "https://arxiv.org/abs/2008.04660"
   },
   {
    "title": "NIST Handbook of Basic Atomic Spectroscopic Data, nitrogen strong lines",
    "used_for": "lines",
    "url": "https://physics.nist.gov/PhysRefData/Handbook/Tables/nitrogentable2.htm"
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
    "verdict": "Checked 24 Oct 2026 against RSC, Marshall 2015, Edinburgh, Kobayashi 2020 (74% from AGB stars) and NIST. Changed: \"mephitic air\" was Rutherford's word for carbon dioxide; he called the leftover \"malignant air\"; \"since 1913, factories\" to \"for a little more than a hundred years\" (the arc process ran in Norway from 1903); \"much of\" to \"about three quarters\". Editor pass 11, 23 Nov 2026: Rutherford's name for the gas is given in sense only, because sources translate his Latin differently (Marshall 2015, malignant; Linda Hall Library, mephitic). The candles and charcoal rest on Marshall and were not reopened. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md."
   }
  ],
  "watch": [],
  "state": "approved"
 },
 {
  "id": "oxygen",
  "symbol": "O",
  "name": "Oxygen",
  "z": 8,
  "shelf": "core",
  "guest_of": "",
  "latin": "",
  "abundance": {
   "universe": 0.58,
   "crust": 46,
   "body": 61
  },
  "birth": "massive-stars",
  "birth_also": "",
  "row": 2,
  "column": 16,
  "found": 1771,
  "found_precision": "about",
  "found_kind": "isolated",
  "cube_kg": 0.0013,
  "cube_note": "As the gas, at room temperature and sea level: about 1.3 grams. Ozone is a second form, three atoms instead of two.",
  "melt_k": 54.4,
  "boil_k": 90.2,
  "temp_note": "",
  "speed_room": 680,
  "lines": [
   [
    615.7,
    1.0
   ],
   [
    615.8,
    1.0
   ],
   [
    700.2,
    1.0
   ],
   [
    725.4,
    1.0
   ],
   [
    615.6,
    0.87
   ],
   [
    645.6,
    0.87
   ],
   [
    394.7,
    0.4
   ]
  ],
  "spectrum_note": "The atom's ordinary visible lines are faint and mostly red. Its famous colours are rarer ones not in this list: the green (557.7 nm) and red (630.0 nm) of the northern lights are single oxygen atoms high in the air, where the air is so thin that an atom can wait the second or more it needs to shine before something bumps it. Liquid oxygen is pale blue, which is another thing again.",
  "isotopes": [
   {
    "a": 16,
    "share": 0.99757,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 17,
    "share": 0.00038,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 18,
    "share": 0.00205,
    "halflife": "stable",
    "decays_to": null
   }
  ],
  "line": "Nearly half the rock, more than four fifths of the sea and three fifths of you, by weight.",
  "words": "Nearly half of the ground is oxygen. That is by weight, and it is more than any other element: nearly half of the Earth's rock, more than four fifths of the sea, because water is mostly oxygen, and about three fifths of you. In the air it is a little under a quarter. In the universe it comes third, after hydrogen and helium, at a little over half a part in a hundred.\n\nMost oxygen was made from helium inside big stars, more than about eight times the Sun's weight, and thrown out when those stars exploded.\n\nOxygen has no colour, no smell and no taste, and in the air it is mixed with four times as much nitrogen. So although it was in every rock and every river and every breath, it was a long time before anyone held it alone.\n\nThen three people did, within a few years.\n\nCarl Scheele made medicines in an apothecary's shop in Uppsala, in Sweden. In 1771 or 1772 he heated saltpetre, the white salt in gunpowder, and several other substances, and got a gas he called fire air. But his book was slow to be printed, and it came out only in 1777.\n\nJoseph Priestley was an English minister who experimented with gases. On 1 August 1774 he used a burning lens to focus sunlight onto a red powder made from mercury, and a gas came off, and a candle put into that gas burned, in his words, \"with a remarkably vigorous flame.\" Priestley published first.\n\nIn Paris the chemist Antoine Lavoisier saw that the gas was an element. In the late 1770s he named it oxygen, which means acid-maker, because he believed that every acid contained it.\n\nHe was wrong about the acids, and the name stayed.",
  "rulers_words": "A 10 cm cube of oxygen gas at room temperature and sea level weighs about 1.3 grams, a little more than the same cube of air. At 90 K oxygen turns into a liquid, and the liquid is pale blue; at 54 K it freezes. Single oxygen atoms, as a gas at room temperature, would move at about 680 metres a second; in the air oxygen travels in pairs, and the pairs move at about 480.",
  "age_words": "Nearly every oxygen atom in you, in the sea and in the rock was made in a big star that exploded before the Sun was born, so it is more than 4.6 billion years old. The oxygen gas you breathe is old atoms in a new arrangement: plants on land, and tiny floating algae and bacteria in the sea, split it out of water, and it is used up and remade all the time.",
  "stories": [
   {
    "id": "oxygen",
    "role": "opens"
   },
   {
    "id": "how-old-are-you",
    "role": "uses"
   },
   {
    "id": "ash-and-sand",
    "role": "uses"
   }
  ],
  "laws": [],
  "mixtures": [
   "glass"
  ],
  "sources": [
   {
    "title": "Royal Society of Chemistry, Periodic Table: Oxygen",
    "used_for": "density, melting and boiling, Scheele, Priestley",
    "url": "https://periodic-table.rsc.org/element/8/oxygen"
   },
   {
    "title": "Abundance of elements in Earth's crust (CRC Handbook column)",
    "used_for": "crust, 46.1%",
    "url": "https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust"
   },
   {
    "title": "WebElements, Oxygen: geological data",
    "used_for": "seawater, 85.7% by mass",
    "url": "https://webelements.co.uk/oxygen/geology.html"
   },
   {
    "title": "Priestley, Experiments and Observations on Different Kinds of Air, vol. 2 (1775)",
    "used_for": "1 August 1774; his words",
    "url": "https://www.chm.bris.ac.uk/~paulmay/webprojects2004/wallis/priestley%20the%20science.htm"
   },
   {
    "title": "J. R. Partington, A History of Chemistry, vol. 3 (1962)",
    "used_for": "Scheele's dates",
    "url": ""
   },
   {
    "title": "NIST Handbook of Basic Atomic Spectroscopic Data, oxygen strong lines",
    "used_for": "lines",
    "url": "https://physics.nist.gov/PhysRefData/Handbook/Tables/oxygentable2.htm"
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
    "verdict": "Checked 24 Oct 2026 against RSC, CRC, WebElements, Priestley 1775 and NIST. Changed: sea share to \"more than four fifths\" (seawater 85.7%, not pure water's 88.8%); air to \"a little under a quarter\" by weight; Scheele worked in an apothecary's shop and made it in 1771 or 1772 from saltpetre and other substances; aurora wording; plankton wording. Could not open Partington for Scheele's dates. Lavoisier's naming year argued (1777 or 1779), so \"late 1770s\". Editor pass 11, 23 Nov 2026: Priestley's words, the date and the burning lens confirmed word for word from his own account. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md."
   }
  ],
  "watch": [],
  "state": "approved"
 },
 {
  "id": "phosphorus",
  "symbol": "P",
  "name": "Phosphorus",
  "z": 15,
  "shelf": "core",
  "guest_of": "",
  "latin": "",
  "abundance": {
   "universe": 0.0006,
   "crust": 0.1,
   "body": 1.1
  },
  "birth": "massive-stars",
  "birth_also": "",
  "row": 3,
  "column": 15,
  "found": 1669,
  "found_precision": "year",
  "found_kind": "isolated",
  "cube_kg": 1.8,
  "cube_note": "As white phosphorus, the kind Brand made. Red phosphorus, the kind on a matchbox, about 2.2 kg.",
  "melt_k": 317.3,
  "boil_k": 553.7,
  "temp_note": "Figures for white phosphorus, which can catch fire by itself at about 30 °C in damp air. Red phosphorus turns to gas without melting, at a much higher temperature.",
  "speed_room": 490,
  "lines": [
   [
    619.9,
    1.0
   ]
  ],
  "spectrum_note": "Dull: one faint visible line. The green glow of white phosphorus is not the atom's light at all; it comes from short-lived molecules made as the phosphorus burns slowly in the air.",
  "isotopes": [
   {
    "a": 31,
    "share": 1.0,
    "halflife": "stable",
    "decays_to": null
   }
  ],
  "line": "A stuff that glows in the dark, first boiled out of urine in Hamburg in 1669.",
  "words": "Phosphorus was first found in urine, by a man who was looking for gold.\n\nThere is not much of it anywhere. In the universe it is about six parts in a million by weight, and in the rock about one part in a thousand. But in you it is about one percent, three quarters of a kilogram in a person who weighs 70 kilograms, and most of that is in your bones and your teeth.\n\nPhosphorus was made in big stars and thrown out when they exploded. But there is a puzzle. When astronomers calculate how much phosphorus those stars should make, the answer comes out too small: in a 2012 study, about a third of what they see. In 2026 the puzzle is still argued, and some astronomers think small exploding stars called novae make the rest.\n\nIn Hamburg in 1669 an alchemist named Hennig Brand was hoping to find the philosophers' stone, which alchemists believed could turn ordinary metal into gold. He boiled down a great deal of urine, and heated what was left, until it gave off a white, waxy stuff.\n\nAnd the stuff glowed in the dark, with a pale green light.\n\nBrand kept the recipe secret. We know the year only from what he told others, which the philosopher Gottfried Leibniz wrote down and printed in 1710. Phosphorus is often called the first element whose finder we know by name.\n\nThe new stuff was called phosphorus, which is Greek for light-bearer. The glow is not light from the atoms themselves. It is the phosphorus burning, very slowly, in the air. The Paris chemist Antoine Lavoisier burned it in careful experiments in the 1770s, and came to count it as an element.\n\nIt was not gold. It is what your bones are built with.",
  "rulers_words": "A 10 cm cube of white phosphorus, the kind Brand made, weighs about 1.8 kg; red phosphorus, the kind on the side of a matchbox, weighs about 2.2 kg for the same cube. White phosphorus melts at 317 K, about 44 °C, about where a hand pulls away from something hot, and boils at 554 K. Even before it melts, at about 30 °C in damp air, it can catch fire on its own, which is why it is kept under water. If its atoms were a gas at room temperature they would move at about 490 metres a second.",
  "age_words": "Nearly every phosphorus atom in your bones was made in a big star that exploded before the Sun was born, so it is more than 4.6 billion years old. It reached you from the rock, by way of soil, plants and food.",
  "stories": [
   {
    "id": "how-old-are-you",
    "role": "uses"
   }
  ],
  "laws": [],
  "mixtures": [],
  "sources": [
   {
    "title": "Royal Society of Chemistry, Periodic Table: Phosphorus",
    "used_for": "density, melting and boiling, Brand",
    "url": "https://periodic-table.rsc.org/element/15/phosphorus"
   },
   {
    "title": "F. Krafft, 'Phosphorus: From Elemental Light to Chemical Element', Angew. Chem. Int. Ed. 8 (1969)",
    "used_for": "whose account the 1669 date is; Leibniz, Kraft, Kunckel",
    "url": "https://www.chem.pmf.hr/_download/repository/03_Krafft1969_fosfor.pdf"
   },
   {
    "title": "Cescutti et al. 2012, A&A",
    "used_for": "the phosphorus shortfall in models",
    "url": "https://arxiv.org/abs/1112.3824"
   },
   {
    "title": "Bekki & Tsujimoto 2024, arXiv 2405.06325",
    "used_for": "novae as an extra phosphorus source",
    "url": "https://arxiv.org/abs/2405.06325"
   },
   {
    "title": "Gakis et al. 2026, arXiv 2609.20930",
    "used_for": "models still struggle, 2026",
    "url": "https://arxiv.org/abs/2609.20930"
   },
   {
    "title": "NOAA CAMEO Chemicals: phosphorus, white",
    "used_for": "ignites about 30 °C in moist air",
    "url": "https://cameochemicals.noaa.gov/chemical/1337"
   },
   {
    "title": "Abundance of elements in Earth's crust (CRC Handbook column)",
    "used_for": "crust",
    "url": "https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust"
   },
   {
    "title": "NIST Handbook of Basic Atomic Spectroscopic Data, phosphorus strong lines",
    "used_for": "lines",
    "url": "https://physics.nist.gov/PhysRefData/Handbook/Tables/phosphorustable2.htm"
   },
   {
    "title": "John Emsley, The Shocking History of Phosphorus (Macmillan, 2000); US title The 13th Element",
    "used_for": "a book a parent can find",
    "url": ""
   }
  ],
  "checks": [
   {
    "claim": "every number, name, date, line, isotope and reference in this record",
    "verdict": "Checked 24 Oct 2026 against RSC, Krafft 1969, Cescutti 2012, Bekki & Tsujimoto 2024, CAMEO and NIST. Changed: \"nearly all\" in bones to \"most\" (85–90%); the model shortfall dated and the novae idea added; Lavoisier's \"1777\" softened to \"in the 1770s\" (Krafft puts it with the 1789 Traité); self-ignition at about 30 °C in damp air. Gakis et al. 2026 opened by the editor, 23 Nov 2026: its abstract says current models struggle to reproduce the observed trends. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md."
   }
  ],
  "watch": [
   {
    "what": "whether models of exploding stars and novae still make too little phosphorus",
    "last_checked": "2026-11-23",
    "every": "1 year"
   }
  ],
  "state": "approved"
 },
 {
  "id": "sulfur",
  "symbol": "S",
  "name": "Sulfur",
  "z": 16,
  "shelf": "core",
  "guest_of": "",
  "latin": "sulfur",
  "abundance": {
   "universe": 0.031,
   "crust": 0.035,
   "body": 0.2
  },
  "birth": "massive-stars",
  "birth_also": "collisions",
  "row": 3,
  "column": 16,
  "found": 1777,
  "found_precision": "year",
  "found_kind": "shown-element",
  "cube_kg": 2.1,
  "cube_note": "As the ordinary yellow crystal. Another crystal form, made by letting melted sulfur cool, is about 1.96 kg.",
  "melt_k": 388.4,
  "boil_k": 717.8,
  "temp_note": "",
  "speed_room": 480,
  "lines": [
   [
    469.4,
    1.0
   ],
   [
    675.7,
    1.0
   ]
  ],
  "spectrum_note": "Dull: two faint visible lines. The blue flame of burning sulfur comes from molecules, not single atoms.",
  "isotopes": [
   {
    "a": 32,
    "share": 0.9499,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 33,
    "share": 0.0075,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 34,
    "share": 0.0425,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 36,
    "share": 0.0001,
    "halflife": "stable",
    "decays_to": null
   }
  ],
  "line": "Brimstone: the yellow stone that collects at volcanoes and burns with a blue flame.",
  "words": "Sulfur is the yellow stone that burns. There is not much of it: about three parts in ten thousand of the universe by weight, and about the same of the Earth's rock. You carry about 140 grams, a fifth of one percent of your weight, most of it in your proteins, and your hair and your nails are among the parts of you richest in it.\n\nMost of the universe's sulfur was made in the last, hottest stages inside big stars, and thrown out when they exploded. Some came from exploding white dwarfs, the small dead cores that stars like the Sun leave behind.\n\nPeople have known sulfur for as long as they have known volcanoes. It gathers as a yellow crust around the vents of volcanoes and around hot springs, and it burns with a blue flame and a choking smell. The King James Bible calls it brimstone, which means burning stone. The ancient Greeks burned it to cleanse a house: in Homer's Odyssey, Odysseus burns sulfur in his hall.\n\nBut the stone itself has almost no smell.\n\nThe rotten-egg smell near a hot spring is a gas, sulfur joined to hydrogen. The choking smell of the flame is another gas, sulfur joined to oxygen. Pure sulfur smells of next to nothing.\n\nFor a long time chemists were not sure that sulfur was an element at all. The Paris chemist Antoine Lavoisier counted it as one in 1777, and in 1809 the chemists Joseph Gay-Lussac and Louis Thénard, also in Paris, settled the question.\n\nSo the yellow crust at the mouth of a volcano and a little of each of your fingernails are the same stuff.",
  "rulers_words": "A 10 cm cube of sulfur, the ordinary yellow crystal, weighs about 2.1 kg, twice water. Sulfur melts at 388 K, about 115 °C, into a yellow liquid that turns dark red and thick as it gets hotter, then thins again near boiling. It boils at 718 K, still too cool to glow. If its atoms were a gas at room temperature they would move at about 480 metres a second.",
  "age_words": "Nearly all the sulfur on Earth, and in you, was made in stars that died before the Sun was born, so it is more than 4.6 billion years old. The yellow crust at a volcano's mouth is that same old sulfur, brought up from inside the Earth.",
  "stories": [
   {
    "id": "how-old-are-you",
    "role": "uses"
   }
  ],
  "laws": [],
  "mixtures": [],
  "sources": [
   {
    "title": "Royal Society of Chemistry, Periodic Table: Sulfur",
    "used_for": "body, density, melting and boiling, Gay-Lussac and Thénard",
    "url": "https://periodic-table.rsc.org/element/16/sulfur"
   },
   {
    "title": "Abundance of elements in Earth's crust (CRC Handbook column)",
    "used_for": "crust",
    "url": "https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust"
   },
   {
    "title": "Kobayashi, Karakas & Lugaro 2020, ApJ 900:179",
    "used_for": "birth",
    "url": "https://arxiv.org/abs/2008.04660"
   },
   {
    "title": "NIST Handbook of Basic Atomic Spectroscopic Data, sulfur strong lines",
    "used_for": "lines",
    "url": "https://physics.nist.gov/PhysRefData/Handbook/Tables/sulfurtable2.htm"
   },
   {
    "title": "NIST Atomic Weights and Isotopic Compositions: S",
    "used_for": "isotopes",
    "url": "https://www.physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=S"
   },
   {
    "title": "Theodore Gray, The Elements (2009)",
    "used_for": "a book a parent can find",
    "url": ""
   }
  ],
  "checks": [
   {
    "claim": "every number, name, date, line, isotope and reference in this record",
    "verdict": "Checked 24 Oct 2026 against RSC, CRC, NIST, the Odyssey (Book 22) and Kobayashi 2020. Changed: hair and nails are rich in sulfur but do not hold a large share; the Greek cleansing now cites Homer. Could not confirm a percentage for the white-dwarf share, so \"some\". Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md."
   }
  ],
  "watch": [],
  "state": "approved"
 },
 {
  "id": "silicon",
  "symbol": "Si",
  "name": "Silicon",
  "z": 14,
  "shelf": "core",
  "guest_of": "",
  "latin": "silex (flint)",
  "abundance": {
   "universe": 0.067,
   "crust": 28,
   "body": 0.0014
  },
  "birth": "massive-stars",
  "birth_also": "collisions",
  "row": 3,
  "column": 14,
  "found": 1824,
  "found_precision": "year",
  "found_kind": "isolated",
  "cube_kg": 2.3,
  "cube_note": "As the dark grey crystal. Berzelius's first silicon was a brown powder.",
  "melt_k": 1687,
  "boil_k": 3538,
  "temp_note": "",
  "speed_room": 510,
  "lines": [
   [
    390.6,
    1.0
   ],
   [
    728.9,
    0.5
   ],
   [
    742.3,
    0.5
   ],
   [
    740.6,
    0.45
   ],
   [
    570.8,
    0.4
   ],
   [
    568.4,
    0.3
   ],
   [
    703.5,
    0.3
   ],
   [
    741.6,
    0.3
   ],
   [
    594.9,
    0.25
   ],
   [
    716.6,
    0.25
   ]
  ],
  "spectrum_note": "Not showy. One violet line at the edge of sight and a scatter of faint yellow-green and red lines. Silicon gives a flame no colour.",
  "isotopes": [
   {
    "a": 28,
    "share": 0.92223,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 29,
    "share": 0.04685,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 30,
    "share": 0.03092,
    "halflife": "stable",
    "decays_to": null
   }
  ],
  "line": "More than a quarter of the ground under your feet, and nobody saw it alone until 1824.",
  "words": "More than a quarter of the ground under your feet is silicon, and until 1824 nobody had ever seen it.\n\nBy weight, only oxygen has a bigger share of the Earth's rock. Most of the silicon is joined to oxygen: as sand, as quartz, as flint, and in the minerals of granite and clay. In the universe silicon is about seven parts in ten thousand by weight. In you there is only a gram or so, and nobody is sure your body needs any of it.\n\nSilicon was made inside big stars near the end of their lives and thrown out when they exploded. A smaller share came from exploding white dwarfs, the small dead cores that stars like the Sun leave behind.\n\nPeople have had silicon in their hands since the first flint tools. They chipped it, joined to oxygen, into blades. For about four thousand years they have melted it, joined to oxygen, into glass.\n\nBut nobody had seen silicon itself, because it holds on to oxygen so hard.\n\nIn 1808 the chemist Humphry Davy, in London, guessed that sand held an element, and gave the element a name, but he could not get it out. In Stockholm in 1824 the chemist Jöns Jacob Berzelius did. He took a salt made of potassium, silicon and fluorine, and heated it with more potassium, and washed away everything else. What was left was a brown powder: silicon, alone. Grey crystals of silicon were made about thirty years later.\n\nIn 2026 nearly every computer chip is built on a thin slice cut from a single silicon crystal. The oldest tools were made of silicon, and so are the newest.",
  "rulers_words": "A 10 cm cube of silicon, a dark grey crystal with a shine like metal, weighs about 2.3 kg, a little more than twice water. Silicon melts at 1,687 K, glowing bright yellow by then, and a 10 cm door into a room that hot would feel like full sunshine from a little over a metre away. It boils at 3,538 K. If its atoms were a gas at room temperature they would move at about 510 metres a second.",
  "age_words": "Nearly every silicon atom in a grain of sand was made in a star that exploded before the Sun was born, so the silicon is more than 4.6 billion years old, even if the grain was broken out of its rock quite recently.",
  "stories": [
   {
    "id": "silicon",
    "role": "opens"
   },
   {
    "id": "ash-and-sand",
    "role": "uses"
   },
   {
    "id": "how-old-are-you",
    "role": "mentions"
   }
  ],
  "laws": [],
  "mixtures": [
   "glass"
  ],
  "sources": [
   {
    "title": "Royal Society of Chemistry, Periodic Table: Silicon",
    "used_for": "density, melting and boiling, Berzelius 1824",
    "url": "https://periodic-table.rsc.org/element/14/silicon"
   },
   {
    "title": "Abundance of elements in Earth's crust (CRC Handbook column)",
    "used_for": "crust, 28.2%",
    "url": "https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust"
   },
   {
    "title": "Wikipedia, Silicon (history, citing Thomson 1817 and Berzelius)",
    "used_for": "Davy 1808, Gay-Lussac and Thénard 1811, Deville about 1854",
    "url": "https://en.wikipedia.org/wiki/Silicon"
   },
   {
    "title": "Corning Museum of Glass, 'Origins of Glassmaking'",
    "used_for": "first glass, Mesopotamia, about 4,000 years ago",
    "url": "https://whatson.cmog.org/exhibitions-galleries/origins-glassmaking"
   },
   {
    "title": "Kobayashi, Karakas & Lugaro 2020, ApJ 900:179",
    "used_for": "birth",
    "url": "https://arxiv.org/abs/2008.04660"
   },
   {
    "title": "NIST Handbook of Basic Atomic Spectroscopic Data, silicon strong lines",
    "used_for": "lines",
    "url": "https://physics.nist.gov/PhysRefData/Handbook/Tables/silicontable2.htm"
   },
   {
    "title": "John Emsley, Nature's Building Blocks (Oxford, 2nd ed. 2011)",
    "used_for": "body; a book a parent can find",
    "url": ""
   }
  ],
  "checks": [
   {
    "claim": "every number, name, date, line, isotope and reference in this record",
    "verdict": "Checked 24 Oct 2026 against RSC, CRC, Wikipedia's history (Davy, Thomson, Deville), Corning Museum of Glass and NIST. Changed: Berzelius's salt was potassium fluorosilicate; glass \"more than\" to \"about four thousand years\" (Corning: about 4,000 years, Mesopotamia); spectrum colours; one wavelength 742.4 to 742.3. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md."
   }
  ],
  "watch": [
   {
    "what": "computer chips still built on silicon",
    "last_checked": "2026-10-24",
    "every": "1 year"
   }
  ],
  "state": "approved"
 },
 {
  "id": "aluminium",
  "symbol": "Al",
  "name": "Aluminium",
  "z": 13,
  "shelf": "core",
  "guest_of": "",
  "latin": "alumen (alum)",
  "abundance": {
   "universe": 0.0054,
   "crust": 8.2,
   "body": 9e-05
  },
  "birth": "massive-stars",
  "birth_also": "",
  "row": 3,
  "column": 13,
  "found": 1827,
  "found_precision": "year",
  "found_kind": "isolated",
  "cube_kg": 2.7,
  "cube_note": "",
  "melt_k": 933.5,
  "boil_k": 2792,
  "temp_note": "",
  "speed_room": 520,
  "lines": [
   [
    396.2,
    1.0
   ],
   [
    394.4,
    0.5
   ],
   [
    669.6,
    0.04
   ]
  ],
  "spectrum_note": "Two strong violet lines at the very edge of sight, and almost nothing else. Aluminium gives a flame no colour; the white sparks of aluminium in fireworks are heat glow, not lines.",
  "isotopes": [
   {
    "a": 27,
    "share": 1.0,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 26,
    "share": 0,
    "halflife": "717,000 years",
    "decays_to": "magnesium-26"
   }
  ],
  "line": "The most common metal in the ground, and for a few years a luxury, priced like silver.",
  "words": "There is more aluminium in the ground than any other metal, and until the 1820s nobody had seen a scrap of it.\n\nBy weight, about a twelfth of the Earth's rock is aluminium. Among all the elements only oxygen and silicon have more. In the universe it is about fifty parts in a million. In you there is almost none, less than a tenth of a gram, and as far as anyone knows your body has no use for it.\n\nAluminium was made inside big stars and thrown out when they exploded.\n\nClay is full of aluminium. People dug clay, and shaped it, and baked it into pots and bricks for thousands of years, and never saw the metal inside. Aluminium holds on to oxygen so hard that a charcoal fire, which frees iron and copper from their ores, cannot pull it loose.\n\nHans Christian Ørsted, in Copenhagen, got a small impure lump in 1825. Friedrich Wöhler, in Berlin, made it as a grey powder in 1827, and most histories count his as the first true aluminium.\n\nThen, for a while, it was precious. In 1855 the French chemist Henri Sainte-Claire Deville showed small bars of it in Paris as silver from clay, and for some years it sold at about the price of silver.\n\nIn 1886 two men, Charles Hall in the United States and Paul Héroult in France, each found a way to make it cheaply with electricity. The price fell, and kept falling, until the metal that had cost as much as silver was wrapping sandwiches.",
  "rulers_words": "A 10 cm cube of aluminium weighs 2.7 kg, not quite three times water and about a third as much as the same cube of iron. It melts at 933 K, about 660 °C. Melted aluminium is barely hot enough to glow, so in a lit room it looks like liquid silver, not red. It boils at 2,792 K. If its atoms were a gas at room temperature they would move at about 520 metres a second.",
  "age_words": "Nearly every aluminium atom on Earth was made in big stars that died before the Sun was born, so it is more than 4.6 billion years old. A short-lived kind, aluminium-26, was still fresh when the Sun and planets formed, and its heat helped melt some of the first small worlds. Half of any heap of it is gone in about 700,000 years, so that first supply has long since disappeared.",
  "stories": [
   {
    "id": "how-old-are-you",
    "role": "mentions"
   }
  ],
  "laws": [],
  "mixtures": [],
  "sources": [
   {
    "title": "Royal Society of Chemistry, Periodic Table: Aluminium",
    "used_for": "density, melting and boiling, Ørsted",
    "url": "https://www.rsc.org/periodic-table/element/13/aluminium"
   },
   {
    "title": "Wikipedia, History of aluminium (citing Wöhler 1827, Drozdov 2007, Essig 1900)",
    "used_for": "Wöhler, Deville, the 1855 price",
    "url": "https://en.wikipedia.org/wiki/History_of_aluminium"
   },
   {
    "title": "Laparra 2015, 'A portrait of aluminium, metal of dream and modernity', ICSOBA Travaux 44",
    "used_for": "'at the level of silver', 1855–60",
    "url": "https://icsoba.org/assets/files/publications/2015/Papers/KN02%20-%20A%20portrait%20of%20aluminium,%20metal%20of%20dream%20and%20modernity.pdf"
   },
   {
    "title": "Binczewski 1995, 'The Point of a Monument', JOM 47(11)",
    "used_for": "1884 price, same as silver",
    "url": "https://www.tms.org/pubs/journals/jom/9511/binczewski-9511.html"
   },
   {
    "title": "NIST Handbook of Basic Atomic Spectroscopic Data, aluminum strong lines",
    "used_for": "lines",
    "url": "https://physics.nist.gov/PhysRefData/Handbook/Tables/aluminumtable2.htm"
   },
   {
    "title": "John Emsley, Nature's Building Blocks (Oxford, 2nd ed. 2011)",
    "used_for": "a book a parent can find",
    "url": ""
   }
  ],
  "checks": [
   {
    "claim": "every number, name, date, line, isotope and reference in this record",
    "verdict": "Checked 24 Oct 2026 against RSC, Laparra 2015, Binczewski 1995, Wikipedia's history (Wöhler 1827, Essig 1900) and NIST. Confirmed: Wöhler in Berlin, \"grey powder\" in his own words, Deville in 1855, priced like silver 1855–60, Hall and Héroult 1886. The lab's \"in 1850 rarer than gold\" could not be documented as a market price; this entry says \"priced like silver\". Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md."
   }
  ],
  "watch": [],
  "state": "approved"
 },
 {
  "id": "iron",
  "symbol": "Fe",
  "name": "Iron",
  "z": 26,
  "shelf": "core",
  "guest_of": "",
  "latin": "ferrum",
  "abundance": {
   "universe": 0.12,
   "crust": 5.6,
   "body": 0.006
  },
  "birth": "collisions",
  "birth_also": "massive-stars",
  "row": 4,
  "column": 8,
  "found": 1789,
  "found_precision": "year",
  "found_kind": "shown-element",
  "cube_kg": 7.9,
  "cube_note": "",
  "melt_k": 1811,
  "boil_k": 3134,
  "temp_note": "",
  "speed_room": 360,
  "lines": [
   [
    382.0,
    1.0
   ],
   [
    386.0,
    1.0
   ],
   [
    388.6,
    0.6
   ],
   [
    404.6,
    0.6
   ],
   [
    382.4,
    0.5
   ],
   [
    385.6,
    0.5
   ],
   [
    516.7,
    0.5
   ],
   [
    393.0,
    0.4
   ],
   [
    438.4,
    0.4
   ],
   [
    495.8,
    0.3
   ]
  ],
  "spectrum_note": "Hundreds of lines, crowded into the violet and blue, so none stands out; a glowing iron spark is coloured by its heat, not its lines. Many of the dark lines in the Sun's rainbow are iron's.",
  "isotopes": [
   {
    "a": 54,
    "share": 0.05845,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 56,
    "share": 0.91754,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 57,
    "share": 0.02119,
    "halflife": "stable",
    "decays_to": null
   },
   {
    "a": 58,
    "share": 0.00282,
    "halflife": "stable",
    "decays_to": null
   }
  ],
  "line": "A little more than a twentieth of the ground, a third of the whole Earth, and the point where stars stop getting heat from building.",
  "words": "A third of the whole Earth is iron, and most of it is where nobody has ever seen it.\n\nBy weight, iron is a little more than a twentieth of the Earth's rock. But while the young Earth was molten, most of its iron sank to the middle and made the core, so that iron is about a third of the whole planet, more than any other element. In the universe it is about one part in a thousand. In you there are about four grams, most of it in your blood, where it carries oxygen.\n\nStars build heavier atoms out of lighter ones, and they get heat for doing it. But near iron the building stops paying: to make anything heavier costs energy instead of giving it. We now think about half of all iron was made in big stars that exploded, and about half in exploding white dwarfs, the small dead cores that stars like the Sun leave behind. The share is still argued.\n\nPeople held iron long before they could make it, and the oldest iron we know they held fell out of the sky.\n\nMore than five thousand years ago, people at Gerzeh, in Egypt, hammered beads from a fallen meteorite and buried them in a grave. Getting iron out of rock is harder. It takes a hot charcoal fire and skill, and people in Anatolia, the land that is now Turkey, were doing it at least 3,500 years ago, perhaps much earlier; the date is argued. The Paris chemist Antoine Lavoisier listed iron among the elements in 1789.\n\nSo there is iron from exploded stars in the middle of the Earth, and in a bead from a grave in Egypt, and in your blood.",
  "rulers_words": "A 10 cm cube of iron weighs about 7.9 kg, nearly eight times water. Iron melts at 1,811 K, glowing yellow-white by then. Because it melts so high, a blacksmith can soften it in the forge and hammer it without its running away. A 10 cm door into a room that hot would feel like full sunshine from a little under a metre and a half away. Iron boils at 3,134 K. If its atoms were a gas at room temperature they would move at about 360 metres a second, slow, because they are heavy.",
  "age_words": "Nearly every iron atom in your blood was made in a star that blew up before the Sun was born, so it is more than 4.6 billion years old. Most of it was first made as a kind of nickel, which turned into cobalt and then, mostly within a year, into iron. An exploding white dwarf usually goes off hundreds of millions to billions of years after its star was born, so much of the iron in our galaxy, the Milky Way, arrived later than the oxygen.",
  "stories": [
   {
    "id": "how-old-are-you",
    "role": "uses"
   }
  ],
  "laws": [
   9
  ],
  "mixtures": [
   "steel"
  ],
  "sources": [
   {
    "title": "Royal Society of Chemistry, Periodic Table: Iron",
    "used_for": "density, melting and boiling, body",
    "url": "https://www.rsc.org/periodic-table/element/26/iron"
   },
   {
    "title": "Abundance of elements in Earth's crust (CRC Handbook column)",
    "used_for": "crust, 5.63%",
    "url": "https://en.wikipedia.org/wiki/Abundance_of_elements_in_Earth%27s_crust"
   },
   {
    "title": "McDonough 2005, bulk Earth composition (via KnowledgeDoor)",
    "used_for": "whole Earth, 32%",
    "url": "https://www.knowledgedoor.com/2/elements_handbook/element_abundances_in_the_bulk_earth.html"
   },
   {
    "title": "Kobayashi, Karakas & Lugaro 2020, ApJ 900:179",
    "used_for": "half of iron-peak elements from Type Ia",
    "url": "https://arxiv.org/abs/2008.04660"
   },
   {
    "title": "Rehren et al. 2013, J. Archaeological Science (UCL release)",
    "used_for": "the Gerzeh beads",
    "url": "https://www.ucl.ac.uk/news/2013/aug/earliest-known-iron-artefacts-come-outer-space"
   },
   {
    "title": "Archaeology magazine, 'Anatolia iron smelting' (Kaman-Kalehöyük, 2019)",
    "used_for": "smelting perhaps much earlier",
    "url": "https://www.archaeology.org/news/7495-190325-anatolia-iron-smelting"
   },
   {
    "title": "NIST Handbook of Basic Atomic Spectroscopic Data, iron strong lines",
    "used_for": "lines",
    "url": "https://physics.nist.gov/PhysRefData/Handbook/Tables/irontable2.htm"
   },
   {
    "title": "Hugh Aldersey-Williams, Periodic Tales (2011)",
    "used_for": "a book a parent can find",
    "url": ""
   }
  ],
  "checks": [
   {
    "claim": "every number, name, date, line, isotope and reference in this record",
    "verdict": "Checked 24 Oct 2026 against RSC, CRC, McDonough 2005 (Fe 32%, O 29.7%), Kobayashi 2020, UCL (Gerzeh), Archaeology magazine and NIST. Changed: \"a twentieth\" to \"a little more than a twentieth\" (5.6%); door distance; nickel-to-iron \"mostly within a year\"; white-dwarf delay counted from the star's birth. The earliest smelting date is argued and said so. Words told aloud, 23 Nov 2026, by Ruling-Voice-01.md; what was added beyond the checked entry is listed in Elements-Told-Aloud-02.md."
   }
  ],
  "watch": [
   {
    "what": "how much of the iron came from exploding white dwarfs",
    "last_checked": "2026-10-24",
    "every": "1 year"
   }
  ],
  "state": "approved"
 }
]
```

## Changes to earlier files

**Schema-Elements.md**

1. Under *Sort keys*, after `found`: add "`found_kind` one of `isolated` (first held as itself), `shown-element` (known since antiquity; `found` is the year someone showed it was an element), `antiquity` (no such year). `found_precision` keeps `exact`, `year`, `about`, `antiquity`."
2. Under *Sort keys*, `abundance`: add "Universe is the Sun's present surface (Asplund, Amarsi & Grevesse 2021) as a stand-in; crust is the CRC Handbook figure; body is Emsley's figures for a 70 kg adult (Nature's Building Blocks)."
3. Under *Spectrum*, `lines`: replace "four to ten lines" with "up to ten lines; fewer where the line list has fewer in the visible (carbon two, phosphorus one, sulfur two, aluminium three), and the note says so".
4. Under *Rulers*, `speed_room`: add "For an element whose gas is made of pairs (hydrogen, nitrogen, oxygen), the words give the pairs' speed as well."
5. Replace the worked example's carbon record with batch 01's. What was wrong in the example: body 18 → 23 (Emsley's 16 kg of 70); universe 0.5 → 0.26 (Asplund 2021); cube 2.3 → 2.2 (RSC, CRC; 2.27 is a perfect crystal); carbon-14 share 0.0000000001 → 0.0000000000012 (a hundred times too high); half-life 5730 → 5700 years (NUBASE2020); and the words' claim that Lavoisier's 1772 diamond burning showed diamond was carbon. He saw that diamond burns to the same kind of gas as charcoal; Smithson Tennant proved diamond is carbon in 1796 (Phil. Trans. 87, 1797). `found_precision` "year" → "antiquity", with `found_kind` "shown-element". The *Notes for the batch chat* line about "1772 is usually given" can go.

**Lab-Elements.md**

6. Under *The entry*, item 3: replace "Aluminium: the most common metal in the crust, and in 1850 rarer than gold." with "Aluminium: the most common metal in the crust, and in the 1850s priced like silver." The "dearer than gold" story rests on unsourced 1852 figures; the documented prices (300 francs a kilogram in 1855, the 1884 Washington Monument price) are silver's level (Laparra 2015; Binczewski 1995).
7. Under *Birth: what kind of star*: replace "Carbon, nitrogen, oxygen: stars of about one to eight suns, late in life, which then shed their outer layers and give the stuff away." with "Carbon and nitrogen: stars of about one to eight suns, late in life, which then shed their outer layers and give the stuff away (about half the carbon, about three quarters of the nitrogen; Kobayashi 2020). Oxygen comes almost all from the bigger stars." And replace "Everything up to iron: stars of more than about eight suns, which build the elements in shells and then explode." with "Everything up to iron: stars of more than about eight suns, which build the elements in shells and then explode; about half the iron instead comes from exploding white dwarfs, which the lab files under the last bin."
8. Under *Birth*, last bullet: add "The `collisions` bin also holds exploding white dwarfs (Type Ia supernovae), which make about half of all iron."

## For the stories

Second ideas that wanted into an entry, one line each, as candidates for Lab-Elements.md.

- **Factory air.** Nitrogen pulled out of the air by lightning, bacteria, and since 1903 by factories (Birkeland–Eyde in Norway; Haber–Bosch, 1913); half the protein in the world now passes through one. Tiles N, H. (The "half" is unchecked.)
- **The balloon that came out of the rock.** Helium on Earth is made underground by uranium and thorium, gathers in natural gas, and leaks to space once let go. Tiles He, U.
- **Why the northern lights are green and red.** An oxygen atom high up has to wait a second, or more than a minute for the red, before it can shine; lower down something always bumps it first. Nitrogen gives the blue and pink. Tiles O, N. Opens spectra from a direction other than helium.
- **A diamond in a gold tube.** Florence, 1694, a diamond vanishing under a burning glass; Paris, 1772, Lavoisier's great lens; Tennant's proof, 1796. Tile C. Law: mass conserved.
- **Silver from clay.** Deville's bars beside the crown jewels in 1855; the 100-ounce cap on the Washington Monument, 1884; the price falling after 1886. The Napoleon III banquet only as the story people tell. Tile Al.
- **The secret that glowed.** Brand's recipe, sold to Kraft, shown at German courts and to Boyle in London; the phosphorus match after it. Tile P.
- **Iron from the sky.** The Gerzeh beads and Tutankhamun's meteorite dagger, before anyone could smelt. Tiles Fe, Ni. (Where the dagger is kept now needs a Watch line.)
- **Acid-maker.** Lavoisier named oxygen for a mistake and the name stuck; what else is named for an idea that turned out wrong.
- **Kawah Ijen's blue fire.** Burning sulfur gas at night on an East Java volcano, and the miners who carry the sulfur out (dated; Watch line). Tile S.
- **The kilogram made of silicon.** The silicon-28 spheres used to redefine the kilogram in 2019 (unchecked). Tile Si.

## For Michael

- Sulfur's `found`: 1777 (Lavoisier counted it as an element) or 1809 (Gay-Lussac and Thénard settled it)?
- The speed ruler is for single atoms, as the schema says; hydrogen, nitrogen and oxygen gas move as pairs, so those entries give both speeds. Keep both, or make the field the real gas?
- The universe bar is really the Sun's surface. Label it "the Sun", or keep "universe"?
- Body figures follow Emsley (oxygen 61%, carbon 23%); many tables say 65% and 18%. Keep Emsley across the lab?
- Spectra with fewer than four visible lines (carbon, phosphorus, sulfur, aluminium) are left honest and short, and the schema is changed to allow it. All right?
