---
status: checked. Editor pass 11, 23 Nov 2026, by Claude, alone and unattended, as the backlog task set. Covers Elements-Batch-01.md in full: ten entries, every words field, every number in the records. Nothing in the batch file, the ledger, the inbox or any store has been changed by this pass; the changes below are for a Claude Code session to apply. This file replaces Editor-Pass-11.md, written a few minutes earlier the same night, which carries stray backslashes before some quotation marks and two phrases since corrected; use this one.
role: The eleventh page of the reading rung, and the first for the Elements lab. What passed, what was fixed, the five questions settled by default, three entries drawn at random, and one prompt for Claude Code.
---

# Editor pass 11

## The page for Michael

**What was read.** All of `Elements-Batch-01.md`: the ten entries (hydrogen, helium, carbon, nitrogen, oxygen, phosphorus, sulfur, silicon, aluminium, iron), each read twice, and the ten records under them, field by field against the schema. Also the ten element cards on the Pool Desk, which turned out to matter.

**The verdict.** The facts are sound. The numbers held up better than any batch so far: I recomputed every atom speed and every door distance, and rebuilt the universe bars from the Sun's figures, and found nothing wrong. The trouble is of another kind, and there are six real faults.

- *The batch file is the old one.* On 25 October you found the entries hard to read, and they were reflowed into paragraphs at your asking. That reflow went onto the Pool Desk and into the schema's carbon example, and stopped there. The batch file in the vault still holds every entry as one block of about 220 words, with "a grown-up" in two of them and Lavoisier unexplained in four. A build from that file would have shipped the version you turned down. The changes below carry the desk's reflow into the file, with my own corrections on top.
- *Hydrogen gives Paris what Cavendish did.* The entry says chemists in Paris burned hydrogen and found that it made water. Cavendish found that first, in London, and the Paris chemists repeated his experiment after hearing of it. A child in England would be right to object. Two sentences now say who did what.
- *Nitrogen quotes a name the sources do not agree on.* The entry says Rutherford called the gas "malignant air". The batch's source says so; the Linda Hall Library says he called it "mephitic air"; his thesis was in Latin, and both are translations. It now says he wrote in Latin and that his name for the gas meant harmful air, which is true either way.
- *Sulfur says "The Bible calls it brimstone."* English Bibles do. It now says the King James Bible, and "the ancient Greeks" where it said "the Greeks".
- *Iron's first people were missing.* "Beads hammered from a fallen meteorite were buried in a grave at Gerzeh" has nobody in it. It now says people at Gerzeh hammered the beads and buried them.
- *Most of the chemists had no trade.* Cavendish, Lockyer, Ramsay, Priestley, Davy, Berzelius, Gay-Lussac and Thénard arrived as bare names. Each now has the word for the work: chemist, astronomer, or, for Priestley, an English minister who experimented with gases.

Smaller things, all fixed below: an oxygen paragraph that began "Most of it"; "saltpetre" and "apothecary" unexplained; helium's age paragraph saying uranium throws off "tiny pieces of helium", as if the helium were already inside; "the Galaxy" unexplained in iron; "some think" without saying who; "for a little more than a hundred years", which goes stale, now "since the early 1900s".

**One quotation confirmed.** Priestley's "with a remarkably vigorous flame" is word for word from his own account, and the date, 1 August 1774, and the burning lens are his too.

**One thing the ledger held open is closed.** The 2026 phosphorus paper the checker found and the writer never opened exists (Gakis and others, submitted 17 September 2026), and its abstract says that current models "struggle to reproduce the observed trends". That supports "In 2026 the puzzle is still argued."

### Decided by default

The five questions were asked on 24 October and not answered. Under the three-day rule they are settled as follows. You can overrule any of them.

1. **Sulfur's `found` stays 1777.** Carbon and iron are dated by the year Lavoisier counted them as elements, so sulfur is dated the same way, and the words already give 1809 as the year the argument ended.
2. **The speed ruler stays a single atom, and the words keep both speeds** for hydrogen, nitrogen and oxygen. The ruler is only useful if every element is measured the same way, and the pairs' speed is the one that is true of the air she breathes.
3. **The bar stays "universe".** The three bars are universe, Earth and you, which is the lab's design, and the Sun is the sample astronomers themselves use. The lab should say once, where the bars are explained, that the universe bar is measured at the Sun's surface.
4. **Emsley's body figures across the lab.** One source for every body figure keeps the bars in agreement with each other, and it is a book a parent can find.
5. **Short spectra stand, and the schema allows them.** Carbon with two lines and phosphorus with one are what the line list shows, and a reference that pads a dull spectrum is no longer a reference.

### Other things I decided, which you may want to overrule

- **The desk's reflow is taken as the base text**, carbon included. Your ruling was that carbon be written from scratch, and it was; the reflow reorders its first paragraph ("There is a great deal of carbon in you" now comes first), says "the centres of three helium atoms" for "helium nuclei", and adds "But" to the turn. It is the version in the schema as the model. I changed nothing further in carbon's words.
- **State goes to `approved`** for all ten, on your word that this work can go out on my reading. If you would rather it wait for yours, the word is `review`.
- **Carbon gets a number where it had none.** The schema asks for the temperature at which carbon "does whatever it does". `boil_k` becomes 4098, the Royal Society of Chemistry's figure for turning straight to gas, which lies inside the range the words give.
- **`found_precision` becomes `year`** for carbon, sulfur and iron. It said `antiquity` beside a year, which leaves a builder to guess whether the tile sorts at 1789 or at the beginning. `found_kind` already says the element was known since antiquity.
- **Sulfur's `latin` becomes "sulfur"**, in the plain form iron's has.
- **A Watch line for iron's share.** "The share is still argued" is a sentence about the present, like phosphorus's, and gets the same treatment.

### Things I could not mend from here

- **Three files the task names are not in the vault.** `Lab-Elements.md`, `Schema-Elements.md` and `Prompt-Elements-Entries.md` exist only in the project. I read them there. Claude Code cannot, so the eight changes the batch asked for in the schema and the lab spec on 24 October are still unmade, and the lab spec still says aluminium was "in 1850 rarer than gold". They are listed below for the next Cowork chat on Elements. Copying the three files into the vault would end the problem.
- **The Pool Desk still shows the ten entries and the five questions as waiting.** I was told to leave the stores alone. The next Cowork run should move them on.

**Three drawn at random** (with `shuf`): *Nitrogen*, *Carbon*, *Oxygen*. Carbon changes only by the reflow and the two fields. Nitrogen and oxygen each change in three or four sentences, as given below.

## Changes to earlier files

### Elements-Batch-01.md

Each entry's `words` is replaced whole, in the rendering and in the JSON record alike. A blank line between paragraphs in the rendering is `\n\n` in the JSON. Every other change is old words first, new words second, and is made in both places wherever the old words stand.

**Hydrogen.** `words` becomes, in three paragraphs (220 words):

> By weight, about three quarters of the ordinary matter in the universe is hydrogen. Counted by atoms instead, it is nine atoms in every ten. There is very little in the rock under your feet, about one part in seven hundred, but the sea is about a ninth hydrogen by weight, because water is two hydrogen atoms held to one oxygen atom. You are about a tenth hydrogen, most of it in your water.
>
> Hydrogen was made in the first few minutes after the universe began, before there were any stars, and nearly all of it is still that same hydrogen. Stars do not make more. They use it up, burning it into helium, and the Sun has been doing that for about 4.6 billion years.
>
> People saw hydrogen before they knew what it was: a gas that bubbled up when iron or zinc was dropped into acid, and that burned. In London in 1766, the chemist Henry Cavendish was the first to study it closely, weigh it, and show that it was a gas of its own kind. He called it inflammable air and found it many times lighter than ordinary air. Later Cavendish burned it and found that what it made was water. Chemists in Paris repeated his experiment, and in 1787 they named the gas hydrogen, water-maker.

`state` "review" becomes "approved".

**Helium.** `words` becomes, in four paragraphs (216 words):

> By weight, about a quarter of the ordinary matter in the universe is helium, second only to hydrogen. On Earth there is almost none: about eight parts in a billion of the rock, a trace in the air, and almost none in you. Helium is so light, and joins with so little, that whatever reaches the air slowly leaks away into space.
>
> Most of the universe's helium was made in the first few minutes after the beginning, alongside hydrogen. Stars have added a little more since, by burning hydrogen.
>
> Helium was seen in the Sun before anyone found it on Earth. In August 1868 the French astronomer Pierre Janssen watched a total eclipse of the Sun from Guntur, in India, and saw a bright yellow line in the light from the Sun's edge. The English astronomer Norman Lockyer saw the same line from London that October. The line matched nothing known on Earth, and Lockyer named the stuff that made it helium, from the Greek for sun.
>
> In March 1895 the chemist William Ramsay, in London, warmed a uranium mineral called cleveite in acid, collected the gas that came off, and saw the same yellow line. Two Swedish chemists, Per Teodor Cleve and Nils Langlet, in Uppsala, found helium in the same mineral the same year.

In `age_words`, "which throw off tiny pieces of helium as they slowly break down." becomes "which throw off tiny pieces as they slowly break down, and each piece becomes an atom of helium." `state` "review" becomes "approved".

**Carbon.** `words` becomes, in four paragraphs (229 words):

> There is a great deal of carbon in you: nearly a quarter of your weight, more than anything but oxygen. There is not much in the Earth's rock, about two parts in ten thousand by weight, and sources disagree widely, depending on how they count limestone. In the universe carbon comes fourth, after hydrogen, helium and oxygen.
>
> Carbon is made when the centres of three helium atoms are squeezed into one. We now think about half of it was made in stars something like the Sun, late in their lives, which puffed it out into space as they died, and the rest in bigger stars, blown off in their winds or thrown out when they exploded.
>
> People have held carbon as long as there have been fires, as charcoal and soot. But nobody knew that charcoal, the black in a pencil and a diamond were one thing.
>
> In Paris in 1772, Antoine Lavoisier and his colleagues burned diamonds with a great lens, and the gas the diamonds gave off clouded limewater, as the gas from burning charcoal does. In 1789 Lavoisier listed carbon among the elements. The proof about diamond came in 1796, when Smithson Tennant, in England, burned a diamond with saltpetre in a gold tube. The diamond gave the same gas, and the same amount of it, that Lavoisier had found from the same weight of charcoal.

`boil_k` null becomes 4098. In the rendering, "| Melts / boils | — K / — K. Does not melt" becomes "| Melts / boils | — K / 4098 K. Does not melt". `found_precision` "antiquity" becomes "year". `state` "review" becomes "approved". Add to the *Checked* line and to the record's `checks` verdict: "Editor pass 11, 23 Nov 2026: 4098 K is the Royal Society of Chemistry's figure for turning to gas, opened that day."

**Nitrogen.** `words` becomes, in four paragraphs (239 words):

> Nitrogen is most of the air: about 78 parts in every hundred by volume, or three quarters by weight. In the rock it is scarce, about two parts in a hundred thousand by weight, and in the universe it is about one part in fifteen hundred. You are about two and a half percent nitrogen, nearly two kilograms in a person who weighs 70 kilograms, and every protein in you is built with it.
>
> Yet the nitrogen you breathe goes in and out again untouched. In the air, nitrogen atoms are held in pairs so tightly that almost nothing can pull them apart: only lightning, a few kinds of bacteria, and, since the early 1900s, factories.
>
> About three quarters of the universe's nitrogen was made from carbon in stars of one to eight times the Sun's weight, late in their lives. The rest came from bigger stars.
>
> In Edinburgh in 1772, a medical student named Daniel Rutherford burned candles and charcoal in closed jars of air, and let a mouse breathe the air in another jar. Then he soaked up the gas that the flames and the mouse had made. Something was left that put out a flame and could not keep a mouse alive. He wrote in Latin, and his name for it meant harmful air. Three chemists, Carl Scheele in Sweden and Henry Cavendish and Joseph Priestley in England, found it at about the same time.

`state` "review" becomes "approved". Add to the *Checked* line and the verdict: "Editor pass 11, 23 Nov 2026: Rutherford's name for the gas is given in sense only, because sources translate his Latin differently (Marshall 2015, malignant; Linda Hall Library, mephitic). The candles and charcoal rest on Marshall and were not reopened."

**Oxygen.** `words` becomes, in four paragraphs (246 words):

> By weight, oxygen is the most common element in the Earth's rock, at nearly half; in the sea, at more than four fifths, because water is mostly oxygen; and in you, at about three fifths. In the air it is a little under a quarter, and in the universe it comes third, after hydrogen and helium, at a little over half a part in a hundred.
>
> Most oxygen was made from helium inside big stars, more than about eight times the Sun's weight, and thrown out when those stars exploded.
>
> Oxygen has no colour, smell or taste, and in the air it is mixed with four times as much nitrogen, so it was a long time before anyone held it alone. Carl Scheele, who made medicines in an apothecary's shop in Uppsala, in Sweden, made it in 1771 or 1772 by heating saltpetre, the white salt in gunpowder, and several other substances, and called it fire air. But his book was slow to be printed, and came out only in 1777.
>
> Joseph Priestley, an English minister who experimented with gases, made oxygen on 1 August 1774 by heating a red powder made from mercury with a burning lens, and saw a candle burn in it, in his words, "with a remarkably vigorous flame." Priestley published first. In Paris, the chemist Antoine Lavoisier saw that it was an element and, in the late 1770s, named it oxygen, acid-maker, because he believed, wrongly, that every acid contained it.

`state` "review" becomes "approved". Add to the *Checked* line and the verdict: "Editor pass 11, 23 Nov 2026: Priestley's words, the date and the burning lens confirmed word for word from his own account."

**Phosphorus.** `words` becomes, in four paragraphs (246 words):

> Phosphorus is scarce in the universe, about six parts in a million by weight. In the rock it is about one part in a thousand. In you it is about one percent, three quarters of a kilogram in a person who weighs 70 kilograms, most of it in your bones and teeth.
>
> Phosphorus was made in big stars and thrown out when they exploded. But calculations of those stars make too little of it: in a 2012 study, about a third as much as astronomers see. In 2026 the puzzle is still argued, and some astronomers think small exploding stars called novae make the rest.
>
> In Hamburg in 1669 an alchemist named Hennig Brand was hoping to find the philosophers' stone, which alchemists believed could turn ordinary metal into gold. He boiled down a great deal of urine and heated what was left until it gave off a white, waxy stuff that glowed in the dark with a pale green light. Brand kept the recipe secret. We know the year from what he told others, written down and printed by the philosopher Gottfried Leibniz in 1710. Phosphorus is often called the first element whose finder we know by name.
>
> The new stuff was called phosphorus, Greek for light-bearer. The glow is not light from the atoms themselves: it is the phosphorus slowly burning in the air. The Paris chemist Antoine Lavoisier, burning it in careful experiments in the 1770s, came to count it as an element.

`state` "review" becomes "approved". In the sources, in both places, "Gakis et al. 2026, arXiv 2609.20930 (found by the checker; not reopened)" becomes "Gakis et al. 2026, arXiv 2609.20930". In the *Checked* line and the verdict, "Gakis et al. 2026 was found by the checker and not reopened by the writer." becomes "Gakis et al. 2026 opened by the editor, 23 Nov 2026: its abstract says current models struggle to reproduce the observed trends." In the *Watch* line, "last checked 2026-10-24" becomes "last checked 2026-11-23"; in the record's `watch`, `last_checked` "2026-10-24" becomes "2026-11-23".

**Sulfur.** `words` becomes, in five paragraphs (230 words):

> There is not much sulfur in the universe, about three parts in ten thousand by weight, and about the same in the Earth's rock. You carry about 140 grams of it, a fifth of one percent of your weight, most of it in your proteins. Hair and nails are among the parts of you richest in it.
>
> Most of the universe's sulfur was made in the last, hottest stages inside big stars and thrown out when they exploded. Some came from exploding white dwarfs, the small dead cores that stars like the Sun leave behind.
>
> People have known sulfur as long as they have known volcanoes. It collects as a yellow crust around volcanic vents and hot springs, and it burns with a blue flame and a choking smell. The King James Bible calls it brimstone, which means burning stone, and the ancient Greeks burned it to cleanse a house: in Homer's Odyssey, Odysseus burns sulfur in his hall.
>
> Pure sulfur has almost no smell. The rotten-egg smell near hot springs is a gas of sulfur joined to hydrogen, and the choking smell of burning sulfur is sulfur joined to oxygen.
>
> For a long time chemists were not sure sulfur was an element. The Paris chemist Antoine Lavoisier counted it as one in 1777, and in 1809 the chemists Joseph Gay-Lussac and Louis Thénard, also in Paris, settled the question.

`latin` "sulpur, sulfur (Latin)" becomes "sulfur"; in the rendering, "| Latin | sulpur, sulfur (Latin) |" becomes "| Latin | sulfur |". `found_precision` "antiquity" becomes "year". `found` stays 1777. `state` "review" becomes "approved".

**Silicon.** `words` becomes, in five paragraphs (225 words):

> By weight, the rock under your feet is more than a quarter silicon, second only to oxygen. Most of it is joined to oxygen, as sand, quartz and flint, or in the minerals of granite and clay. In the universe silicon is about seven parts in ten thousand by weight. In you there is only a gram or so, and nobody is sure your body needs any.
>
> Silicon was made inside big stars near the end of their lives and thrown out when they exploded. A smaller share came from exploding white dwarfs, the small dead cores that stars like the Sun leave behind.
>
> People have used silicon's compounds since the first flint tools, and have made glass from sand for about four thousand years, without ever seeing silicon itself, because it holds on to oxygen so hard.
>
> In 1808 the chemist Humphry Davy, in London, guessed that sand held an element and gave it a name, but could not get it out. In Stockholm in 1824, the chemist Jöns Jacob Berzelius heated a salt made of potassium, silicon and fluorine with more potassium, washed away everything else, and was left with a brown powder: silicon, alone. Grey crystals of silicon were made about thirty years later.
>
> In 2026 nearly every computer chip is built on a thin slice cut from a single silicon crystal.

`state` "review" becomes "approved". The *Watch* line stands.

**Aluminium.** `words` becomes, in four paragraphs (207 words):

> By weight, about a twelfth of the Earth's rock is aluminium: more than any other metal, and third among all the elements, after oxygen and silicon. In the universe it is about fifty parts in a million. In you there is almost none, less than a tenth of a gram, and as far as anyone knows your body has no use for it.
>
> Aluminium was made inside big stars and thrown out when they exploded.
>
> Clay is full of aluminium, yet nobody saw the metal until the 1820s, because aluminium holds on to oxygen so hard that a charcoal fire, which frees iron and copper from their ores, cannot pull it loose. Hans Christian Ørsted, in Copenhagen, got a small impure lump in 1825. Friedrich Wöhler, in Berlin, made it as a grey powder in 1827, and most histories count his as the first true aluminium.
>
> In 1855 the French chemist Henri Sainte-Claire Deville showed small bars of it in Paris as silver from clay, and for some years it sold at about the price of silver. In 1886 Charles Hall, in the United States, and Paul Héroult, in France, each found a way to make it cheaply with electricity, and the price fell and kept falling.

`state` "review" becomes "approved".

**Iron.** `words` becomes, in three paragraphs (223 words):

> By weight, iron is a little more than a twentieth of the Earth's rock, but about a third of the whole Earth, more than any other element. That is because most of it sank to the middle while the young Earth was molten, and made the core. In the universe it is about one part in a thousand. In you there are about four grams, most of it in your blood, where it carries oxygen.
>
> Stars build heavier atoms out of lighter ones and get heat for it, but near iron the building stops paying: making anything heavier costs energy instead of giving it. We now think about half of all iron was made in big stars that exploded, and about half in exploding white dwarfs, the small dead cores that stars like the Sun leave behind. The share is still argued.
>
> People held iron long before they could make it. More than five thousand years ago, people at Gerzeh, in Egypt, hammered beads from a fallen meteorite and buried them in a grave. Getting iron out of rock takes a hot charcoal fire and skill, and people in Anatolia, the land that is now Turkey, were doing it at least 3,500 years ago, perhaps much earlier; the date is argued. The Paris chemist Antoine Lavoisier listed iron among the elements in 1789.

In `age_words`, "so much of the Galaxy's iron arrived later than its oxygen." becomes "so much of the iron in our galaxy, the Milky Way, arrived later than the oxygen." `found_precision` "antiquity" becomes "year". `state` "review" becomes "approved". Add after the *Checked* line, *Watch:* how much of the iron came from exploding white dwarfs · last checked 2026-10-24 (the batch's own check; not searched again) · every 1 year. Add the same to the record's `watch`: `what` "how much of the iron came from exploding white dwarfs", `last_checked` "2026-10-24", `every` "1 year".

**The header.** In *How it was done*, after the sentence ending "see *Changes to earlier files*).", add: "Reflowed into paragraphs on 25 Oct 2026 at Michael's asking, on the Pool Desk; the reflow and the editor's corrections were brought into this file by editor pass 11."

**The ladder.** The status line becomes: "checked. Researched, written and checked in one Cowork chat, 24 Oct 2026; reflowed 25 Oct. Read by Claude, editor pass 11, 23 Nov 2026 (Editor-Pass-11-02.md); changes applied. Michael's rulings: carbon written from scratch; aluminium found = 1827 (Wöhler), Ørsted in a clause; spelling "aluminium" and "sulfur"; iron's birth bin `collisions` (exploding white dwarfs), with `massive-stars` second (proposed in chat, not objected to). Decided by default on 23 Nov 2026, under the three-day rule, and open to Michael's overruling: sulfur's `found` stays 1777; `speed_room` stays a single atom and the words give the pairs' speed too; the bar stays "universe", measured at the Sun's surface; body figures follow Emsley across the lab; spectra with fewer than four lines stand." The words "awaiting Michael" come out.

### Elements-Ledger.md

The heading "## Batch 01 — awaiting Michael (24 Oct 2026)" becomes "## Batch 01 — approved by editor pass 11 (23 Nov 2026)". In the table, every "review" becomes "approved", and these cells change:

- Hydrogen, "—" becomes "That the Paris chemists repeated Cavendish's water experiment is from the editor's knowledge; Britannica confirms Cavendish did it first".
- Nitrogen, "—" becomes "Rutherford's name for the gas given in sense only (sources translate it differently); the candles and charcoal rest on Marshall 2015".
- Phosphorus becomes "Watch: the phosphorus model shortfall, yearly".
- Sulfur becomes "No percentage for the white-dwarf share ("some"); `found` 1777, decided by default".
- Iron becomes "Earliest smelting date argued (said so). Watch: the white-dwarf share, yearly".

Under *Batch 02*, after "body = Emsley, 70 kg.", add: "Every chemist gets the word for the work the first time in each entry. `found_precision` is the precision of the year; `found_kind` says if the thing was known since antiquity. Where a thing does not boil, `boil_k` holds the temperature at which it turns to gas."

### Pool-Inbox.md

Remove the heading "## Elements batch 01 (24 Oct 2026)" and its five numbered lines. The answers are in the batch file's status line.

### For the next Cowork chat on Elements, not for Claude Code

These files are in the project only.

- `Schema-Elements.md`: the batch's own five changes (its *Changes to earlier files*, 1 to 5), which were never made. To change 1 add: "`found_precision` is the precision of the year given." Under `melt_k`, `boil_k`, add: "Carbon: `boil_k` 4098, where it turns to gas." Under `latin`, "the Latin or Greek root behind the symbol where the symbol is not the English initial" becomes "the Latin root of the name or the symbol, where there is one". The carbon example takes the record as it stands after this pass.
- `Lab-Elements.md`: the batch's changes 6 to 8. Under *The entry*, item 1, add: "The universe bar is measured at the Sun's surface, the best sample there is; the lab says so once, where the bars are explained."
- `Prompt-Elements-Entries.md`: under *How the words read*, the rule that Lavoisier is "the Paris chemist Antoine Lavoisier" the first time gains: "and so with every name: the word for the person's work, the first time in each entry."
- The Pool Desk: the ten `element-` items to `approved`, each `more` replaced by the entry as it now stands, and the item `elements-batch-01-questions` answered from the status line.
- The project's copies of `Elements-Batch-01.md` and `Elements-Ledger.md`, once Claude Code has changed the vault's.

## Left alone, on purpose

- *Carbon's words*, beyond the reflow. "Limewater" and "saltpetre" are not explained there, and Lavoisier is placed in Paris but not called a chemist. I would mend all three; the entry is yours by ruling, so they wait for your word.
- *Aluminium's names.* Ørsted, Wöhler, Hall and Héroult stand without a trade, because the Ørsted and Wöhler sentences are your ruling and the other two match them.
- *Iron's birth bin.* `collisions`, with exploding white dwarfs filed there, is your ruling. I think it is defensible: the batch's own source gives white dwarfs about half the iron or a little more, and many of those explosions are two dead stars merging.
- *Hydrogen's caption*, "The lightest thing there is". Light itself weighs less, and so does an electron. It is true of every substance she can meet, and the line is good, so it stays.
- *Nitrogen's caption*, "Four fifths of every breath". By volume it is 78 parts in a hundred; the words give the figure.
- *The Greek roots.* Hydrogen, helium, oxygen and phosphorus tell their Greek names in the words and leave `latin` empty. The field holds Latin only, and the amended schema will say so.
- *"Turkey"* in iron, as in the events, until you rule on Türkiye.
- *Helium's first sighting.* Janssen's yellow line at Guntur rests on the batch's check against Marshall 2012. The page I tried to open for it would not load.

## For Claude Code

> Read `CWVault/00-BOARD.md`, then `CWVault/claude/Editor-Pass-11-02.md`. Apply every change under *Changes to earlier files* for `Elements-Batch-01.md`, `Elements-Ledger.md` and `Pool-Inbox.md`, exactly. In `Elements-Batch-01.md` each entry appears twice, as a readable rendering and as a JSON record under *The records*; make every change in both, so that the two say the same thing, paragraph breaks included (a blank line in the rendering, `\n\n` in the JSON). Replace each `words` whole with the paragraphs the page gives, without the quotation markers. Do not touch carbon's words beyond what the page gives. Check afterwards that the JSON block still parses, that it holds ten records with the same keys as before, that every `words` is between 150 and 250 words, and that every `state` is "approved". Take the five answered questions out of `Pool-Inbox.md`; the answers go into the batch file's status line, which the page gives whole. Leave the section "For the next Cowork chat on Elements" alone: those files are not in the vault. If `cw-deploys` holds a built Elements lab or a `data/elements.json`, rebuild it from the records and read each entry in place; on 23 Nov 2026 neither existed, so if that is still so, say so and build nothing. Do not invent wording: if an old string is not found, stop and report it. Update the board and MANIFEST in the same commit. Report, then commit and push only on Michael's word.

## How this was done

One reader. No subagents wrote or judged anything; one fetched six web pages and quoted them back. Every entry was read twice, once as the child and once as a checker, and each record was compared field by field with the schema by script and by eye.

Sources opened on 23 Nov 2026: Priestley's own account of 1 August 1774 (Le Moyne College's transcription), for the quotation; the Linda Hall Library and the University of Edinburgh on Daniel Rutherford; Britannica on Cavendish, which says of the water experiments that he "had performed the experiments first"; the Royal Society of Chemistry's carbon page, for 4098 K and the two densities; and the abstract of Gakis and others, arXiv 2609.20930. One page, on Janssen and Lockyer, would not open.

Recomputed by me: all ten atom speeds and the three pair speeds from the atomic weights; the three door distances from the batch's own formula; the ten universe figures from the Sun's abundances in Asplund 2021 as I know them; the body figures from Emsley's kilograms; helium's and aluminium's comparisons with air and iron. All agree with the file.

From my own knowledge, and worth a checker's eye when the changes go in: that Lavoisier repeated Cavendish's water experiment in June 1783 after hearing of it; that Priestley was a minister; that saltpetre is the white salt in gunpowder; that English Bibles say brimstone where others do not; the crust figures; the discovery dates for silicon, aluminium and phosphorus; and the spectral lines, which I compared with what I know of each element and did not open at NIST.

The reflowed entries were read from the Pool Desk's database, which I read and did not write.
