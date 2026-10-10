---
status: Deep time, plots, batch 1, 9 Oct 2026. Seven plots, in Michael's order: Oxygen, Sea level, Day length, Minerals, Sun and inside, Continents, People. Researched 9 Oct by three agents with web search (oxygen, day length, sun and inside; sea level; minerals, continents, people), each opening the sources the curve files name and checking their key values. Written in one pass by Claude from their fact sheets. Checked the same day by four independent agents with web search (three took a share of the plots; one read only the numbers: units, log ratios, store years against ages, the Data sections against the prose, the plots against the events); their changes are applied, and each plot ends with what was changed, confirmed and not confirmed. Not reviewed by Michael yet. Michael's rulings of 9 Oct are folded in (see below).
role: The words for the seven Deep Time plots in the event form (Prompt-Deep-Time-Plots.md), each with a Data section for Claude Code saying what to change in tools/curves-deep-time.py and what new data to add. Claude Code's brief is Prompt-Build-Plots-Deep-01.md.
---

# Deep time, plots 1: seven lines across the bar

Written in round 3 of Prompt-Deep-Time-Plots.md and checked in round 4. Plots count *ago* only (Rulings-Sept-2026.md, Deep time). Each plot has a label, a summary, a More, references, a Data section for Claude Code, notes for us, and a *Checked* line.

Michael, 9 Oct, after the plan and the research: guesses are welcome where they are explained ("we can assume sea levels before we know for sure as long as we say that"), and he took Claude's advice on the four open calls:

- **Oxygen's coming and going** (about 2.43 to 2.22 billion years) is drawn as a band that widens down to below a hundred-thousandth of today, not as a wiggle; the More tells it.
- **Bands are added** to the two files that had none: Lambeck's sea level (our judgment of his uncertainty) and the people series (the US Census Bureau's low and high estimates).
- **People reaches back to 315,000 years**, to meet *Homo sapiens*, and fades before that.
- **Minerals keeps Hazen's 2008 count** (about 4,300 kinds then known) and says so; today's official list (more than 6,000) is given in the More.

What the research found wrong in the files, in short. The ice-ages sea-level file is pinned to zero at 5,000 years ago, not today, so its last points read up to 9 metres above today's sea; it also shows the last warm spell, about 125,000 years ago, at today's level, when the sea then stood 6 to 9 metres higher. The day-length file credits the 19-hour plateau to the wrong paper. The earliest inside-heat points have no source behind them. Two continents bands leave out a serious school. The mineral file's last three steps are invented, and its "4,400" is the 2010 count, not 2008's. One event needs a fix: *Antarctica freezes* says the sea fell "about seventy metres"; the sources give 55 to 70.

---

## 1. Oxygen

**Label:** Oxygen
**Kind:** plot
**Span:** 4,000 Ma to now
**Shines on:** the whole Earth; best on *Oxygen arrives* and *Animals*
**Unit and scale:** times today's amount (1 = today's, about 21 parts in 100 of the air); log scale
**Today:** 1 (oxygen is about 20.9 percent of dry air by volume)
**Known from:** sulphur and metals in old seafloor rock before about 420 million years ago; charcoal in coal, and models of how rocks weather, since
**Links:** the jump at about 2.43 billion years → *Oxygen in the air*; the ice at about 2.45 billion → *Great freeze*; red sand at about 2.31 billion → *Red rocks*; the high near 305 million → *Coal*; the step down at 252 million → *The Great Dying*
**Replaces:** the spec's row *oxygen* (Spec-Deep-Time-Interface.md, *Plots*)

**Summary (35 words)**
Oxygen in the air, from four billion years ago to now. For almost half of the Earth's life there was hardly any. It came in steps, and the shaded band shows how little is known. *More*

**More (347 words)**

```
From about 4 billion years ago to now.
```

In a seam of coal, among the black layers made from squashed plants, there are bits of charcoal. Charcoal is what is left when a plant burns but does not burn away. A wildfire needs oxygen. With much less of it than there is now, fire will not spread through living plants at all.

In 2010 Ian Glasspool and Andrew Scott gathered measurements of how much of the coal from each age was charcoal. Coal from about 300 million years ago has a lot of it. They worked out that the air then held more oxygen than it does now: at least a quarter as much again, and perhaps more.

The oldest charcoal is about 420 million years old. For older times, geologists read the rock of old seafloors. Sulphur in it shows when the air had almost no oxygen at all. Iron and other metals behave differently with oxygen and without it, and they show roughly how much there was.

The plot is drawn so that each step up the side means ten times as much oxygen as the step below. Before about 2.43 billion years ago the line sits five or more steps below today: a hundred-thousandth of today's oxygen or less. Then it rises. For about two hundred million years the oxygen came and went, more than once, before it stayed. The shaded band around the line widens there to hold the dips.

For more than a billion years after that there was some oxygen, but not much. How much is argued. Some geochemists say less than a thousandth of today's, others a few hundredths. The band holds both, and it is wide because nobody yet knows which is right.

Between about 800 and 380 million years ago, oxygen climbed to near today's. Large animals appeared over the same stretch of time. A large body needs a lot of oxygen, and many geologists think the two are linked; which came first is argued.

Nearly all the oxygen in the air was made by living things: tiny ones in the sea first, and later plants.

**References**
- Timothy Lyons, Christopher Reinhard and Noah Planavsky, "The rise of oxygen in Earth's early ocean and atmosphere," *Nature*, 2014. The whole curve, and how little is known.
- Ian Glasspool and Andrew Scott, "Phanerozoic concentrations of atmospheric oxygen reconstructed from sedimentary charcoal," *Nature Geoscience*, 2010. Charcoal in coal.
- Alexander Krause, Benjamin Mills, Shuang Zhang, Noah Planavsky, Timothy Lenton and Simon Poulton, "Stepwise oxygenation of the Paleozoic atmosphere," *Nature Communications*, 2018. The climb to near today's.
- Nick Lane, *Oxygen: The Molecule that Made the World* (Oxford, 2002). For a parent.

**Data**
- **File:** `stories/curves/oxygen.json`, 4,000 Ma to now.
- **Series:** one. Unit "times today's"; scale log; `say` "about {v} of today's oxygen".
- **Points:** `[year, value, low, high]`, 28 points before the changes (30 after), store years −3999997974 (4,000 Ma) to 2026.
- **The band:** readings off the envelope of Lyons 2014, figure 1, before 540 Ma; after GEOCARBSULF (Berner 2006, 2009) and the spread of later models (Krause 2018, Lenton 2018) since. A judgment drawn from published envelopes, not a published bound.
- **Today:** 1.0.
- **Fade:** older than 4,000 Ma (store −3999997974): not drawn.
- **Links:** −2429997974 → *Oxygen in the air*; −2449997974 → *Great freeze*; −2309997974 → *Red rocks*; −304997974 → *Coal*; −251937974 → *The Great Dying*.
- **Checked values:**

| Age | File | Found | Source |
| --- | --- | --- | --- |
| 4,000–3,000 Ma | 1e-6 (1e-7–1e-5) | confirmed: under 1e-5 | Pavlov & Kasting 2002; Lyons 2014 |
| 2,450–2,300 Ma | smooth rise 1e-4 → 0.01 | changed: rose and fell across 1e-5 until about 2,220 Ma | Gumsley 2017; Poulton 2021 |
| 2,000–800 Ma | 0.01 (0.001–0.1) | changed: low edge too high; one camp says under 0.001 | Planavsky 2014; Lyons 2014 |
| 300 Ma | 1.5 (1.2–1.7) | confirmed: 25–30 percent of the air, so 1.2–1.45 | Berner 2006; Krause 2018; Glasspool & Scott 2010 |
| 260–230 Ma | 1.0, 0.7 | changed: the drop is at 252 Ma, and its size is argued | Berner 2006; Krause 2018 |
| today | 1.0 | confirmed | |

- **Changes for Claude Code** (in `tools/curves-deep-time.py`):
  - 2,450 Ma (−2449997974): value 1e-6, low 1e-7, high 1e-5.
  - Add 2,430 Ma (−2429997974): value 1e-5, low 1e-6, high 1e-4 (the line crosses a hundred-thousandth at the rise; Gumsley 2017).
  - 2,400 Ma (−2399997974): value 1e-3, low 1e-6, high 0.01.
  - 2,300 Ma (−2299997974): value 0.003, low 1e-6, high 0.1.
  - Add 2,220 Ma (−2219997974): value 0.03, low 0.003, high 0.3 (oxygen stays for good; Poulton 2021).
  - 2,000, 1,800, 1,400, 1,000 and 800 Ma: low 1e-4 (was 0.001); value and high unchanged (Planavsky 2014, under 0.1 percent of today's).
  - 300 Ma (−299997974): value 1.35, low 1.2, high 1.5 (above 26 percent, Glasspool & Scott 2010; 25–30, Krause 2018; 1.35 is about 28 percent).
  - 260 Ma point moves to 252 Ma (−251997974): value 0.9, low 0.7, high 1.4.
  - 230 Ma (−229997974): value 0.85, low 0.7, high 1.4 (Berner 2006 has 15 percent at the boundary; Krause's revised model keeps about 30 through the Triassic).
  - The `source` note adds: Gumsley 2017, Poulton 2021, Planavsky 2014, Krause 2018 for the changed points.
- **New data:** none.

**Notes for us.** The beat: oxygen arrived late, in steps, and how much there was for most of the time is still unknown. The scene is charcoal, not sulphur, because *Oxygen in the air* already tells the sulphur in full; the plot names it in a sentence. The coming and going is drawn as a band (Michael's choice, 9 Oct), and the More says so in one sentence; *Oxygen in the air* tells it. "Five steps below today" is 1e-5 on a log scale: checked. The peak: charcoal gives above 26 percent, models 25 to 30, against about 21 now, so 1.24 to 1.45 times; the More says "at least a quarter as much again, and perhaps more", and the 300 Ma point comes down to 1.35 to match. The link to *Coal* uses its age as the event gives it, 305 Ma; to *The Great Dying*, 251.94 Ma. Links not drawn: the "whiffs" near 2.5 billion (no event; the evidence is argued, Slotznick 2022 against Anbar 2023); *Cyanobacteria* (2,500 Ma) is the oxygen-makers' own tail, not a feature of the line. Wants an event: none.

**Checked (9 Oct 2026, four independent checkers).** Changed: Glasspool & Scott "gathered measurements" (they compiled published charcoal counts), coal of 300 million years "has a lot of" charcoal, and the peak is "at least a quarter as much again, and perhaps more" (above 26 percent, their paper; 25 to 30, Krause), with the 300 Ma point lowered to 1.35; the climb to near today's ends about 380 million years, in the Devonian (Krause 2018), not 400; the line crosses a hundred-thousandth at 2.43 billion, not before the *Great freeze* (a point added); "the shaded band" for a reader who has not met the band. Confirmed: under 15 percent fire cannot spread (Glasspool); the oldest charcoal about 420 million (Glasspool, Edwards & Axe 2004, *Geology*); Poulton 2021, fluctuating across 10⁻⁵ for about 200 million years; Planavsky 2014, at most 0.1 percent of today's; Zhang 2016, at least 4 percent; Krause 2018 and its six authors; Lyons 2014; Lane 2002; all store years. Not confirmed: "nearly all" the oxygen made by living things (the main source is photosynthesis; not opened as "nearly all"); 20.9 percent exactly (about 21 confirmed); Berner 2006's 15 percent at the boundary (not opened).

---

## 2. Sea level

**Label:** Sea level
**Kind:** plot
**Span:** 540 Ma to 3 Ma (new, a guess, see Data); 3 Ma to 20,000 years ago (`sea-level-ice-ages.json`); 20,000 years ago to now (`sea-level.json`)
**Shines on:** *Animals* and the lines below it; best on *The ice ages* and *After the ice*
**Unit and scale:** metres above or below today's sea; linear
**Today:** 0, by definition; rising lately by about 4 millimetres a year (satellite measurements since 1993; NASA, NOAA)
**Known from:** drowned corals and the oxygen in tiny seashells, for the ice ages; for older times, layers of beach and seafloor sand stacked under coasts, and estimates of how much water the ocean basins could hold
**Links:** the drop at about 34 million years → *Antarctica freezes*; the start of the swings at about 2.58 million → *Ice by turns*; the low between about 26,500 and 19,000 years ago → *Last glacial maximum*
**Replaces:** the spec's row *sea level*

**Summary (39 words)**
Sea level, from about 540 million years ago to now. It has stood much higher than today and much lower, as ice grew and melted and the ocean floors changed. Before 3 million years ago it is a guess. *More*

**More (350 words)**

```
From about 540 million years ago to now.
```

Under the farms and beach towns of the New Jersey coast lie layers of sand and mud hundreds of metres thick. Since 1993 Kenneth Miller of Rutgers University and his colleagues have drilled down through them. Some layers are beach sand, and some are mud from deeper water. Where mud lies on beach sand, the sea came in; where beach sand lies on mud, it went out. Once dated, the layers tell how the sea rose and fell over the last hundred million years.

The answer is hard to read, because the land can sink or rise as well. Others, working from how much water the ocean basins could hold, get a much higher sea. Between about 90 and 80 million years ago, the guesses run from about 50 metres above today's sea to more than 200.

Why so high? There was little or no ice at the poles, so nearly all the water was in the sea. And the ocean floors were younger and warmer. Warm rock stands higher than cold, so the basins were shallower, and the sea spilled over the edges of the continents.

About 34 million years ago ice began to stay on Antarctica, and the sea fell. Ice on land is water taken out of the sea. In the last million years the ice has grown and melted again and again, and the sea has fallen and risen with it. In the biggest swings it fell by more than a hundred metres. About 20,000 years ago it stood about 130 metres below today's. By about 7,000 years ago it was within a few metres of where it is now.

The shaded band shows how unsure the answer is. It is narrow over the last 20,000 years and wider before. Before 3 million years ago the line is a guess made for Curious Woods, drawn through the middle of the published curves, and the band holds them all. Before about 540 million years ago nobody has a curve worth drawing, and the line fades.

Today the sea is rising again, by about four millimetres a year.

**References**
- Kenneth Miller and others, "The Phanerozoic record of global sea-level change," *Science*, 2005. New Jersey, and how high the sea stood.
- Kurt Lambeck, Hélène Rouby, Anthony Purcell, Yiying Sun and Malcolm Sambridge, "Sea level and global ice volumes from the Last Glacial Maximum to the Holocene," *PNAS*, 2014. The last 20,000 years.
- Rachel Spratt and Lorraine Lisiecki, "A Late Pleistocene sea level stack," *Climate of the Past*, 2016. The ice ages.
- Douwe van der Meer and others, "Long-term Phanerozoic global mean sea level: insights from strontium isotope variations and estimates of continental glaciation," *Gondwana Research*, 2022. The higher curve.
- Orrin Pilkey and Rob Young, *The Rising Sea* (Island Press, 2009). For a parent; about the sea today.

**Data**
- **Files:**
  - `stories/curves/sea-level.json` serves 20,000 years ago to now (21,000 after the change below).
  - `stories/curves/sea-level-ice-ages.json` serves 3 Ma to 20,000 years ago. For the plot, its points younger than 20,000 years are not drawn.
  - New: 540 Ma to 3 Ma, a guess, below under *New data*; suggested file `stories/curves/sea-level-deep.json`, made by the same script.
- **Series:** one in each. Unit metres against today's; scale linear. `say` in the ice-ages file: "the sea about {v} m {dir} today"; the other two should use the same.
- **Points:**
  - `sea-level.json`: `[year, value]`, 25 points, store −17974 (20,000 years ago) to 2026; no band.
  - `sea-level-ice-ages.json`: `[year, value, low, high]`, 841 points, store −2997974 (3 Ma) to 2026, every 2,000 years to 800,000 years ago and every 5,000 before.
  - New deep: `[year, value, low, high]`, 33 points, store −539997974 (540 Ma) to −2997974 (3 Ma).
- **The band:**
  - Last 20,000 years: none in the file; to add, our judgment of Lambeck's uncertainty (below).
  - 20,000 to 798,000 years: Spratt & Lisiecki's own 95 percent bootstrap bounds.
  - 0.8 to 3 Ma: ±20 m, a judgment from Bintanja & van de Wal's figures (the model has no bounds).
  - 3 to 540 Ma: the spread of the published curves, our judgment; it is a band of disagreement, not of measurement.
- **Today:** 0.
- **Fade:** older than 540 Ma (store −539997974).
- **Links:** −33897974 → *Antarctica freezes*; −2577974 → *Ice by turns*; −24474 → *Last glacial maximum* (the dot is at 26,500 years; the span runs to 19,000, store −16974).
- **Checked values:**

| Age | File | Found | Source |
| --- | --- | --- | --- |
| today (ice-ages file) | +9.0 m | changed: noise; the stack is pinned to 0 at 5,000 years and −130 at 24,000 | Spratt & Lisiecki 2016, data file |
| 2,000 years (ice-ages file) | +6.0 m | changed, same reason; the sea has not stood above today's in the last 7,000 years | Lambeck 2014 |
| 24,000 years (ice-ages file) | −130 m | confirmed (pinned there) | Spratt & Lisiecki 2016 |
| 21,000–20,000 years (Lambeck) | −130 at 20,000 | confirmed in substance: about −134 between 29,000 and 21,000 | Lambeck 2014 (abstract) |
| 14,600–14,300 years | −100 → −82 | confirmed: meltwater pulse 1A, most probably 14 to 18 m in less than 350 years | Deschamps 2012 |
| 6,500–4,000 years (Lambeck) | −3, −2, −1, −0.5 | changed: about 4 m of rise since 6,700 years, 3 of it by 4,200 | Lambeck 2014 (abstract) |
| 124,000–118,000 years | −5.4 to −0.6 | changed: the last warm spell stood +6 to +9 m | Dutton 2015 |
| 3 Ma | −1.5 (±20) | confirmed as an average; warm peaks reached about +16 to +20 | Dumitru 2019; Grant 2019 |
| 34 to 33 Ma | — | a fall of about 55 to 70 m | Miller 2005, 2020; Hutchinson 2021 |
| 90 Ma | — | +50 to +250: Miller 100 ± 50, Müller 170 (85–270), van der Meer about 211 | Miller 2005; Müller 2008; van der Meer 2022 |

- **Changes for Claude Code:**
  - `sea-level-ice-ages.json`: replace every point younger than 20,000 years (store greater than −17974) with the values of `sea-level.json` (after the changes below), so that the map's sea and the plot agree and today reads 0. The stack is pinned at 0 m at 5,000 years and −130 m at 24,000 years; younger values are scaling noise.
  - `sea-level-ice-ages.json`, the last warm spell, a judgment from Dutton and others 2015 (+6 to +9 m): −123974: value 6, low 0, high 9; −121974, −119974 and −117974: value 7, low 5, high 9; −115974: value 2, low −10, high 9.
  - `sea-level-ice-ages.json`, the warm spell about 400,000 years ago (MIS 11; Dutton 2015, +6 to +13 m): for points from −407974 to −397974, where the value is lower than 9, set value 9, low 6, high 13.
  - `sea-level-ice-ages.json`, 3.0 to 2.6 Ma: low −20, high +25 (Pliocene warm peaks about +16 to +20 m; Dumitru 2019, Grant 2019).
  - `sea-level.json`: add `[-18974, -134]` (21,000 years ago; Lambeck 2014). Change −4474 to −3.8, −3974 to −3.2, −2974 to −2.0, −1974 to −0.9 (interpolated from Lambeck's "about 4 m since 6.7 thousand years, 3 m of it by 4.2"; to be checked against his table when it can be opened).
  - `sea-level.json`: add a band, `[year, value, low, high]`: ±6 m from 21,000 to 18,000 years; ±5 m from 16,500 to 11,000; ±3 m from 10,000 to 8,000; ±1.5 m from 7,500 to 4,000; ±0.5 m after; 0 at today. A judgment spanning Lambeck 2014 and Fairbanks 1989 (−121 ± 5 m at the glacial maximum).
  - Store years for Spratt & Lisiecki are years before 2026; the stack counts before 1950. The 76 years do not show at this scale; leave them.
- **New data** (540 Ma to 3 Ma): our judgment, a middle line through Miller 2005 and 2020, Müller 2008, Haq & Schutter 2008 (shape only) and van der Meer 2022, with the band spanning them. At this spacing the line is an average and hides the ice-age swings within it, of up to about a hundred metres, wherever there was ice (the late Carboniferous, the end of the Ordovician, the last 34 million years). Licences: Miller 2020's curve CC BY 4.0 (PANGAEA, doi 10.1594/PANGAEA.923139); van der Meer 2022 CC BY 4.0; Müller 2008 and Miller 2005 cited for their published values. How sure: a guess; the published curves disagree by up to about 200 metres in the Cretaceous and in the early Paleozoic.

```
[-539997974, 0, -50, 80],
[-519997974, 30, -30, 120],
[-499997974, 60, -25, 150],
[-479997974, 100, -25, 200],
[-454997974, 150, 0, 250],
[-444997974, 40, -50, 150],
[-429997974, 100, 0, 200],
[-409997974, 60, 0, 150],
[-384997974, 100, 20, 150],
[-337997974, 80, 0, 130],
[-299997974, 0, -60, 80],
[-264997974, 80, 0, 160],
[-249997974, 20, -40, 100],
[-229997974, 25, -30, 120],
[-199997974, 50, -25, 150],
[-179997974, 80, 0, 170],
[-154997974, 130, 40, 200],
[-139997974, 120, 40, 200],
[-116997974, 150, 50, 250],
[-89997974, 160, 50, 250],
[-69997974, 100, 50, 210],
[-59997974, 75, 25, 190],
[-49997974, 100, 60, 210],
[-39997974, 70, 50, 170],
[-34997974, 60, 40, 150],
[-33497974, 0, -20, 80],
[-29997974, 15, -10, 90],
[-19997974, 15, -5, 70],
[-14997974, 25, 0, 60],
[-9997974, 5, -15, 40],
[-4997974, 10, -10, 30],
[-3997974, 5, -15, 25],
[-2997974, -1.5, -20, 25]
```

The last point matches the ice-ages file at 3 Ma, so the two join.

**Notes for us.** The beat: the sea has stood far higher and far lower, and for most of the bar the height is a guess. The scene is New Jersey, not Barbados, because *Last glacial maximum* tells the Barbados coral. The mechanism for the high Cretaceous sea (young, warm ocean floor stands high) is given in two sentences; it is Müller 2008's argument and the usual textbook one. "In the biggest swings it fell by more than a hundred metres": Spratt & Lisiecki's lows in the last 800,000 years run from about −103 to −130; some cycles were weaker, so the More no longer says "each time". The glacial low is said as "about 130 metres" (Lambeck about 134; Fairbanks's older 121); *Last glacial maximum* says 120 to 130, which still agrees. "Within a few metres by about 7,000 years ago" is Lambeck (about 4 m of rise since 6,700 years). The rate today: NOAA gives 3.6 mm a year for 2006–2015; NASA gives about 4.5 for recent years and 5.9 for 2024; "about four" is fair to the last decade. Michael's "guesses are fine if we say so" covers the deep stretch; the alternative of fading the line by steps (solid to 66 Ma, faint to 540) is left for the build to try, if the band alone does not show the doubt. *Antarctica freezes* says "about seventy metres"; the plot's fall is about 60 (from +60 at 35 Ma to 0 at 33.5); the event should say "about 55 to 70 metres" (Miller 2005, about 55; Hutchinson 2021, "of the order of 70"). Wants events: the last warm spell, about 125,000 years ago (a sea 6 to 9 metres higher, and hippos in the Thames); the high Cretaceous sea and the chalk.

**Checked (9 Oct 2026, four independent checkers).** Changed: Rachel Spratt, not Rebecca; "the New Jersey coast" (the drill sites run from Sandy Hook to Cape May); the high Cretaceous sea "between about 90 and 80 million years ago" (Müller's 170 m is at about 80) and "little or no ice … nearly all the water" (Miller 2005 describes short-lived Antarctic ice); "more than a hundred metres each time" softened to the biggest swings; the glacial low "about 130 metres" (Lambeck about 134); meltwater pulse 1A "in less than 350 years" (Deschamps 2012); the 90 Ma band's low edge to 50, to match the prose; the disagreement "up to about 200 metres", to match the bands drawn. Confirmed: onshore drilling since 1993 at Island Beach and Atlantic City; cores up to 596 m (Bass River); Miller 2005, 100 ± 50 m and its title; Müller 2008, 170 (85 to 270); young, shallow seafloor as the cause; 55 to 70 m at 34 million (Miller 2005; Hutchinson 2021); Lambeck, about 4 m of rise since 6,700 years; the Spratt & Lisiecki stack pinned at 0 m at 5,000 years and −130 at 24,000 (quoted from the paper); Dutton 2015, +6 to +9 and +6 to +13; Dumitru 2019 (16.2 m) and Grant 2019 (about 20, under 25); today's rate about 4 mm a year (NASA); all references and store years; the deep table joins the ice-ages file at 3 Ma. Not confirmed: van der Meer's "about 211 m at 91 Ma" (the Utrecht release says "up to 220" in the Cretaceous); that the ice-ages file's band is the stack's 95 percent bounds (the paper gives 95 percent intervals for highs and lows and 9 to 12 m at 1σ throughout); Lambeck's figure and table (abstract and quotations only).

---

## 3. Day length

**Label:** Day length
**Kind:** plot
**Span:** 4,510 Ma to now
**Shines on:** the whole Earth
**Unit and scale:** hours; linear
**Today:** 24 hours (about 86,400 seconds; the day lengthens by about 1.8 thousandths of a second a century, Stephenson 2016)
**Known from:** daily growth lines in fossil corals and shells; the rhythm of tides and climate kept in layered rock; before about 2.5 billion years, models of the Moon's pull
**Links:** about five and a half hours at about 4.51 billion years → *Big thwack*; about 17 hours at 2.46 billion → *Short days*
**Replaces:** the spec's row *day length*

**Summary (38 words)**
The length of a day, from about 4.5 billion years ago to now. The young Earth spun fast, and the Moon's tides have been slowing it ever since. Early on, a day may have lasted about five hours. *More*

**More (341 words)**

```
From about 4.5 billion years ago to now.
```

In 1963 John Wells, a palaeontologist at Cornell University, looked closely at fossil corals about 390 million years old from New York State and Ontario. A coral adds a fine ridge to its skin every day, and the ridges bunch into bands, one band a year, as tree rings do. A living coral he studied has about 360 ridges in a year's band. Wells counted about 400. A year has stayed about as long as it was, so the days must have been shorter: about 22 hours each.

The reason is the Moon. The Moon pulls on the sea and raises tides, and the tides drag on the turning Earth like a hand on a wheel, slowing it. As the Earth slows, the Moon drifts outward, about four centimetres a year now.

Other clocks agree. Layers of sand laid down by tides in South Australia, about 620 million years old, give a day of about 22 hours. A clam that lived about 70 million years ago, in what is now Oman, grew 372 daily layers a year: a day of about 23 and a half hours. Banded rock in Western Australia gives about 17 hours, 2.46 billion years ago.

The line is not smooth. Between about 2 and 1 billion years ago it may have stayed near 19 hours. In 2023 Ross Mitchell and Uwe Kirscher argued that the Sun, by heating the air each day, gave the Earth's spin a small push that for a while matched the Moon's drag. Others think the push was too weak. The band holds both.

Before about 2.5 billion years ago, only one rock may keep the day: tidal layers in South Africa, about 3.2 billion years old, and the geologists who read them disagree. The line there comes mostly from models of the Moon's pull, and the band is wide. The models say that just after the Moon formed, a day lasted about five hours.

The day is still growing longer, by a little under two thousandths of a second every hundred years.

**References**
- John Wells, "Coral growth and geochronometry," *Nature*, 1963. Daily ridges in Devonian corals.
- George Williams, "Geological constraints on the Precambrian history of Earth's rotation and the Moon's orbit," *Reviews of Geophysics*, 2000. Tidal layers in South Australia.
- Margriet Lantink, Joshua Davies, Maria Ovtcharova and Frederik Hilgen, "Milankovitch cycles in banded iron formations constrain the Earth–Moon system 2.46 billion years ago," *PNAS*, 2022. The 17-hour day.
- Ross Mitchell and Uwe Kirscher, "Mid-Proterozoic day length stalled by tidal resonance," *Nature Geoscience*, 2023. The 19-hour plateau.
- Robert Hazen, *The Story of Earth: The First 4.5 Billion Years, from Stardust to Living Planet* (Viking, 2012). For a parent.

**Data**
- **File:** `stories/curves/day-length.json`, 4,500 Ma to now.
- **Series:** one. Unit hours; scale linear; `say` "a day of about {v} hours".
- **Points:** `[year, value, low, high]`, 14 points before the changes (15 after), store −4499997974 (4,500 Ma) to 2026.
- **The band:** at the dated points (2,460, 1,400, 620, about 390, about 70 Ma), the published uncertainty; between them a judgment; before 2,500 Ma the spread of models, a judgment.
- **Today:** 24.
- **Fade:** older than 4,510 Ma (store −4509997974), the Moon-making impact; there was no Moon to slow the day before it, and the file's first point is from impact models.
- **Links:** −4509997974 → *Big thwack*; −2458997974 → *Short days* (its age as the event gives it, 2,459 Ma).
- **Checked values:**

| Age | File | Found | Source |
| --- | --- | --- | --- |
| 4,500 Ma | 5.5 (4–7) | could not confirm: model only | Canup 2012; Ćuk & Stewart 2012 (2–3 h before the impact) |
| 3,000 Ma | 15 (13–17) | consistent: tidal rock in South Africa read as about 15.2 h at 3.2 Ga (Farhat 2022's data table); another reading gives about 13 | Farhat 2022; Eulenfeld & Heubeck 2023 |
| 2,460 Ma | (none) | 16.9 ± 0.2 h | Lantink 2022 |
| 1,400 Ma | 18.7 | confirmed (18.68) | Meyers & Malinverno 2018 |
| 2,000–1,000 Ma | 18.5, 19 | consistent with a stall near 19 h; disputed | Mitchell & Kirscher 2023; Farhat 2024 |
| 620 Ma | 21.9 | confirmed: 21.9 ± 0.4 h | Williams 2000 |
| 400 Ma | 22.0 | changed: about 21.9 in the Middle Devonian, about 390 Ma | Wells 1963 |
| 300 Ma | 22.4 | changed: about 22.6 (385 to 390 ridges a year) | Wells 1963 |
| 65 Ma | 23.5 | moved: 23.5 at about 70 Ma (372 days a year) | de Winter 2020 |
| today | 24 | confirmed | Stephenson 2016 |

- **Changes for Claude Code:**
  - Source list: Bartlett & Stevenson 2016 model a day held near **21** hours, not 19; the 19-hour stall from about 2 to 1 billion years is Mitchell & Kirscher 2023, *Nature Geoscience* 16, 567–569, disputed by Farhat and others 2024, *Astronomy & Astrophysics* 684, A49. Replace the Bartlett citation with Mitchell & Kirscher, and add Farhat 2024 as the dissent.
  - Add 2,460 Ma (−2459997974): 16.9, low 16.7, high 17.1 (Lantink 2022).
  - 400 Ma point moves to 390 Ma (−389997974): 21.9, low 21.4, high 22.8 (Wells 1963, Middle Devonian, about 400 ridges a year, range 385–410).
  - 300 Ma (−299997974): 22.6, low 22.4, high 22.8 (Wells 1963, Pennsylvanian corals, 385 and 390 ridges).
  - 65 Ma point moves to 70 Ma (−69997974): 23.5, low 23.4, high 23.6 (de Winter 2020).
  - 4,500 Ma point moves to 4,510 Ma (−4509997974), to meet *Big thwack*; value and band unchanged; source "models of the Moon-making impact".
  - 4,000, 3,500 and 3,000 Ma: source note says "model".
- **New data:** none.

**Notes for us.** The beat: the day keeps getting longer, and old rock and old shells kept count. Wells opens because a coral is something she can picture and the arithmetic is one step. "Living corals have about 360 ridges in a year's band" is Wells's own comparison (to check). "A year has stayed about as long as it was" is said plainly; the reason (the Earth's path round the Sun hardly changes) is left out for space. The plateau's mechanism (an atmospheric tide resonating with the day) is told only as "the Sun, by heating the air each day, gave the Earth a small push"; the resonance itself is left out. Note a tension the line will show: corals at 380 Ma and tidal rock at 620 Ma both give about 21.9 hours; the band covers it, and nobody has settled it. Wants events: the 1.4-billion-year day (Xiamaling, China); Wells's corals; the clam in Oman.

**Checked (9 Oct 2026, four independent checkers).** Changed: Wells's corals "about 390 million years" (Middle Devonian; the paper gives no number), and the point moves to 390 Ma with the band widened to his range (385 to 410 ridges, 21.4 to 22.8 h); "a living coral he studied" (Wells measured one species, about 360); "the Earth's spin" pushed, not the Earth; before 2.5 billion, one rock in South Africa, about 3.2 billion years old, has been read twice (about 15.2 h in Farhat 2022's table; about 13 h, Eulenfeld & Heubeck 2023), so the More no longer says none has; "about five hours" just after the Moon formed (the review of impact models says about 5); today "about 86,400 seconds" (the extra changes year to year). Confirmed: Wells at Cornell, 1963, New York and Ontario, about 400 ridges, Pennsylvanian 385 and 390; the Moon receding 3.8 cm a year; Williams 2000, Flinders Ranges, 21.9 ± 0.4 h; de Winter 2020, *Torreites sanchezi*, Oman, 372 days; Lantink 2022, 16.9 ± 0.2 h, title and authors; Meyers & Malinverno, about 18.7 h at 1.4 billion; Mitchell & Kirscher 2023 and the mechanism as told; Farhat 2024's dissent; Bartlett & Stevenson's lock near 21 h (so the file's citation is wrong, as the Data says); Stephenson 2016, +1.8 ms a century; all store years and hour arithmetic. Not confirmed: "palaeontologist" for Wells (very likely); de Winter's 23.5 h from the paper itself (from a news report and the arithmetic: 23.57).

---

## 4. Minerals

**Label:** Minerals
**Kind:** plot
**Span:** 4,567 Ma to now
**Shines on:** the whole Earth; best on *The young Earth* and *Oxygen arrives*
**Unit and scale:** kinds of mineral, on Hazen's count of 2008; linear
**Today:** about 4,300 on the 2008 count (4,259 approved on 1 March 2008); the official list now has 6,226 (International Mineralogical Association, July 2026)
**Known from:** meteorites, the oldest grains of zircon, and which minerals turn up in rocks of each age
**Links:** about a dozen at 4,567 Ma → *Oldest grains*; the jump after about 2.4 billion → *Oxygen in the air* (2,430 Ma) and *Red rocks* (2,310 Ma)
**Replaces:** the spec's row *number of minerals*

**Summary (34 words)**
Kinds of mineral, from the dust the Earth was made from to the Earth now. There were about a dozen at the start, and more than four thousand once oxygen was in the air. *More*

**More (323 words)**

```
From about 4.57 billion years ago to now.
```

At a Christmas party, in about 2006, the biologist Harold Morowitz asked the mineralogist Robert Hazen a question: were there clay minerals on the Earth in its first half-billion years? Hazen said later, "No mineralogist in history had ever asked a question like that." Mineralogists had studied what minerals are made of and where they are found, but hardly ever when each one first appeared.

So Hazen and seven colleagues tried to answer it for every mineral they could, and in 2008 they published their answer. In the dust the Sun and planets formed from, there were about a dozen kinds of mineral. In the first meteorites, about 60. As small worlds melted and changed, about 250. On the young Earth, with its lava and its water and its first granite, perhaps a thousand; once the plates of the crust were moving, about 1,500.

Then the count leaps. Once there was oxygen in the air, rock at the surface could rust, and rusting makes new minerals. By Hazen's count, more than two thousand kinds formed that way, most of them metals joined with oxygen. Hazen thinks hardly any of them could have formed without the oxygen that living things made. After that, for more than a billion years, hardly any new kinds appeared.

The line uses Hazen's count of 2008, when about 4,300 kinds were known. Mineralogists keep finding new ones, and the official list now has more than 6,000. The Earth did not make the new ones lately; people found them. So the line keeps the 2008 count all the way to today.

Each count is an estimate, and the band says so. In 2022 Hazen and Shaunna Morrison looked again, mineral by mineral, at how each one forms. They argued that much of the Earth's variety came earlier than the 2008 paper said, within about the first 250 million years. If they are right, the line's early rise is too slow.

**References**
- Robert Hazen, Dominic Papineau, Wouter Bleeker and others, "Mineral evolution," *American Mineralogist*, 2008. The stages and their counts.
- Robert Hazen and John Ferry, "Mineral evolution: mineralogy in the fourth dimension," *Elements*, 2010. The dozen, and the count of 2010.
- Robert Hazen and Shaunna Morrison, "On the paragenetic modes of minerals: a mineral evolution perspective," *American Mineralogist*, 2022. The newer, earlier view.
- Robert Hazen, *The Story of Earth: The First 4.5 Billion Years, from Stardust to Living Planet* (Viking, 2012). For a parent.

**Data**
- **File:** `stories/curves/minerals.json`, 4,567 Ma to now.
- **Series:** one. Unit "kinds"; scale linear; `say` "about {v} kinds of mineral".
- **Points:** `[year, value, low, high]`, 13 points, store −4566997974 (4,567 Ma) to 2026.
- **The band:** a judgment around Hazen's stage counts (Hazen 2008, table 1); the stages are dated as ranges, and the counts are cumulative estimates.
- **Today:** 4,300 on the 2008 count (the dashed line); the read-out at today should say "about 4,300 kinds known in 2008".
- **Fade:** older than 4,567 Ma (store −4566997974).
- **Links:** −4567297974 → *Oldest grains*; −2429997974 → *Oxygen in the air*; −2309997974 → *Red rocks*.
- **Checked values:**

| Age | File | Found | Source |
| --- | --- | --- | --- |
| 4,567 Ma | 12 | confirmed: "approximately a dozen" (2008); 12 in 2010 | Hazen 2008; Hazen & Ferry 2010 |
| 4,560 Ma | 60 | confirmed | Hazen 2008, stage 1 |
| 4,550 Ma | 250 | confirmed | Hazen 2008, stage 2 |
| 4,400 Ma | 420 (350–500) | confirmed, but from Hazen 2013, not 2008 | Hazen 2013 |
| 4,000 Ma | 1,000 | changed: 1,000 is the total by the end of stage 4, about 3,500 Ma | Hazen 2008 |
| 2,300 Ma | 2,500 | our interpolation, not Hazen's | |
| 2,000 Ma | 4,000 | confirmed in substance: ">4,000" by the end of stage 7, 1,900 Ma | Hazen 2008 |
| 1,000–400 Ma | 4,100, 4,300, 4,400 | changed: invented steps; Hazen gives ">4,000", with few new kinds | Hazen 2008 |
| today | 4,400 | changed: 4,300 in 2008 (4,259 approved); 4,400 is the 2010 count | Hazen 2008; Hazen & Ferry 2010 |

- **Changes for Claude Code:**
  - 4,000 Ma (−3999997974): value 500, low 350, high 750.
  - Add 3,500 Ma (−3499997974): value 1,000, low 800, high 1,200.
  - 4,400 Ma (−4399997974): value 400, low 350, high 750 (Hazen 2013 gives "no more than about 420", an upper bound; the 750 rests on Hazen & Morrison 2022 alone).
  - 2,000 Ma point moves to 1,900 Ma (−1899997974): value 4,000, low 3,500, high 4,300.
  - 1,000 Ma (−999997974): value 4,000, low 3,800, high 4,300.
  - 540 Ma (−539997974): value 4,050, low 3,900, high 4,300.
  - Remove the 400 Ma point.
  - Today (2026): value 4,300, low 4,250, high 4,400.
  - Source note: the 12 is from Hazen & Ferry 2010, *Elements* 6, 9–12; the 420 from Hazen 2013, *American Journal of Science* 313, 807–843; the 2,300 Ma point is an interpolation; "4,300 kinds known in 2008 (4,259 approved, 1 March 2008)".
- **New data:** none.

**Notes for us.** The beat: the Earth's minerals came in waves, and the biggest wave came with oxygen. The scene is the party, which is where the idea came from, not where the evidence is; it is the one place to stand in a story about counting everything (Smithsonian, 13 Jan 2016, "ten years ago", so about 2006). "Seven colleagues": the 2008 paper has eight authors. "More than two thousand kinds formed that way, most of them metals joined with oxygen": Hazen 2008's table note, ">2,000 new oxide and hydroxide species". "For more than a billion years, hardly any new kinds": stages 8 and 9, 1,900 to 542 Ma, "minimal mineralogical innovation". Today's list: the event *Oldest grains* gives 6,226 (July 2026) and *Red rocks* 6,239 (September 2026); the More says "more than 6,000" and so agrees with both. *Red rocks*'s "4,300 kinds then known" agrees with this plot. Wants an event: none.

**Checked (9 Oct 2026, four independent checkers).** Changed: Morowitz asked about clay minerals "in the Earth's first half-billion years" (the Hadean, in his words), not "before there was life"; "Hazen thinks hardly any of them could have formed without the oxygen" (his paper: "may not have occurred to any significant extent prior to biological oxygenesis"), not "none could"; the 4,400 Ma point lowered to 400, since Hazen 2013's 420 is an upper bound. Confirmed: the Christmas party "ten years ago" (Smithsonian, 13 Jan 2016) and the quotation word for word; Morowitz a theoretical biologist; eight authors in 2008; the stage counts, a dozen, 60, 250, 1,000 (granite), 1,500 (plate tectonics); more than 2,000 new oxides and hydroxides; "relative stasis" for the billion years from 1.9; 4,300 known (4,259 approved, 1 March 2008); 6,226 on the IMA list of July 2026; Hazen & Morrison 2022, title and "within the first 250 million years"; Hazen & Ferry 2010, 12 minerals and about 4,400; all store years. The file already has 1,500 at 3,000 and 2,500 Ma, which the More's "about 1,500" reads. Not confirmed: the end page of Hazen 2013.

---

## 5. Sun and inside

**Label:** Sun and inside
**Kind:** plot
**Span:** Sun, 4,567 Ma to now; inside, 4,510 Ma to now (after the change below)
**Shines on:** the whole Earth; best on *The young Earth*
**Unit and scale:** watts on each square metre of the Earth's surface; log scale
**Today:** Sun, about 238 W/m² (1,361 at the top of the air, spread over the whole globe and over day and night, less the 30 percent reflected); inside, about 0.092 W/m² (47 terawatts over the Earth's surface; Davies & Davies 2010)
**Known from:** the physics of stars like the Sun; for the inside, heat measured in boreholes and the seafloor, and particles from inside the Earth caught underground; for the past, models
**Links:** the burst of heat at about 4.51 billion → *Big thwack*
**Replaces:** the spec's row *heating of the crust (Sun versus internal heat)*

**Summary (38 words)**
Two lines: the heat the Earth's surface gets from the Sun, and the heat that comes up from inside. Since the Earth's first few hundred million years, the Sun has given hundreds to thousands of times as much. *More*

**More (348 words)**

```
From about 4.57 billion years ago to now.
```

In a mine in the mountains of central Japan, under about a kilometre of rock, there is a ball holding about a thousand tonnes of clear oil, watched by more than 1,800 light detectors. The ball, called KamLAND, catches antineutrinos, particles so slight that almost all of them pass straight through the whole Earth. Now and then, one hits something in the oil and makes a tiny flash.

Between 2002 and 2009 KamLAND counted 841 flashes of the right kind. Most came from nuclear power stations, but about a hundred came from uranium and thorium breaking down inside the Earth. Together with a detector in Italy, those flashes showed that uranium and thorium make nearly half the heat that comes up through the ground.

That heat is small. Spread over the Earth, it comes to about a tenth of a watt on each square metre. The Sun gives each square metre about 240 watts, averaged over day and night. That is more than 2,000 times as much, which is why the plot is drawn so that each step up the side means ten times the step below.

The young Sun was about 30 percent dimmer than it is now, and it has slowly brightened, as stars like it do. That line is one of the surest on the bar. It leaves a puzzle: with a Sun so dim, the young Earth should have frozen, yet it had oceans. Carl Sagan and George Mullen pointed this out in 1972, and nobody has settled why.

The inside line is much less sure. Models say that just after the Moon-making impact the Earth's surface was molten, and for a short time more heat came up from below than came down from the Sun. By about 4.4 billion years ago the heat from below was about half a watt on each square metre. How fast it fell after that is argued. Many geophysicists think that about 3 billion years ago the Earth lost heat much faster than now. Jun Korenaga argues it lost heat at about today's rate. The band holds both.

**References**
- The KamLAND Collaboration (Gando and others), "Partial radiogenic heat model for Earth revealed by geoneutrino measurements," *Nature Geoscience*, 2011. Heat from uranium and thorium.
- Huw Davies and Rhodri Davies, "Earth's surface heat flux," *Solid Earth*, 2010. Today's heat from inside.
- Georg Feulner, "The faint young Sun problem," *Reviews of Geophysics*, 2012. The dim young Sun, and the puzzle.
- Kevin Zahnle and others, "Emergence of a habitable planet," *Space Science Reviews*, 2007. The molten Earth, and how it cooled.
- Robert Hazen, *The Story of Earth* (Viking, 2012). For a parent.

**Data**
- **File:** `stories/curves/sun-and-inside.json`.
- **Series:**
  - `points` (the Sun): unit W/m²; scale log; `say` "the sun at about {v} W/m²"; 12 points, store −4566997974 (4,567 Ma) to 2026.
  - `second` ("from inside"): unit W/m²; `say` "the inside at about {v} W/m²"; 14 points, store −4566997974 to 2026.
- **Points:** `[year, value, low, high]`.
- **The band:** the Sun, ±3 percent, a judgment on Gough's formula and the fixed 30 percent reflected (the formula is less good in the first 200 million years; Feulner 2012); the inside, today's measured range (Davies & Davies 2010), and before that the spread of the models, a judgment.
- **Today:** Sun 238.2; inside 0.092.
- **Fade:** the Sun, older than 4,567 Ma; the inside, older than 4,510 Ma (store −4509997974) after the change below.
- **Links:** −4509997974 → *Big thwack*.
- **Checked values:**

| Age | File | Found | Source |
| --- | --- | --- | --- |
| Sun today | 238.2 | confirmed: 1,360.8 ± 0.5 at the top of the air; ÷ 4 × 0.7 | Kopp & Lean 2011 |
| Sun at 4,567 Ma | 170.1 | confirmed: 0.714 of today | Gough 1981; Feulner 2012 |
| inside today | 0.092 | confirmed: 47 ± 2 TW | Davies & Davies 2010 |
| inside, 4,567 and 4,540 Ma | 100,000; 10,000 | could not confirm: no source gives these | Zahnle 2007 |
| inside, 4,500 Ma | 30,000 | could not confirm a number; the surface was near 8,000 K just after the impact | Zahnle 2007 |
| inside, 4,480 Ma | 150 | changed: about 140 keeps the surface molten for about 2 million years after the impact; the mantle reaches its melting point by about 20 | Zahnle 2007 |
| inside, 4,400 Ma | 2 | changed: about 0.5 | Zahnle 2007 |
| inside, 4,000 Ma | 0.4 | changed: 0.2 to 0.3 later in the Hadean | Zahnle 2007 |
| inside, 3,000 Ma | 0.25 (0.15–0.4) | changed: low edge excludes Korenaga's view (about today's) | Korenaga 2008, 2011 |
| nearly half from uranium and thorium | — | confirmed: about 20 of 44 TW (KamLAND with Borexino), plus about 4 from potassium | Gando 2011 |

- **Changes for Claude Code** (inside series only; the Sun is unchanged):
  - Remove the points at 4,567 Ma and 4,540 Ma (no source; the Earth was still being assembled).
  - Replace the 4,500 Ma and 4,480 Ma points with: −4509997974: value 10,000, low 140, high 100,000 (the surface molten just after the impact; order of magnitude only); −4507997974: value 140, low 50, high 500 (Zahnle 2007, the magma ocean held for about 2 million years).
  - 4,450 Ma (−4449997974): value 2, low 0.5, high 10 (a judgment, between the magma ocean and 4,400).
  - 4,400 Ma (−4399997974): value 0.5, low 0.3, high 1 (Zahnle 2007).
  - 4,000 Ma (−3999997974): value 0.3, low 0.2, high 0.5.
  - 3,500 Ma (−3499997974): low 0.09 (was 0.2).
  - 3,000 Ma (−2999997974): low 0.09 (was 0.15).
  - 2,500 Ma (−2499997974): low 0.09 (was 0.13).
  - 2,000 Ma (−1999997974): low 0.09 (was 0.11).
  - 1,000 Ma (−999997974): low 0.09 (was 0.1).
  - Source note: Zahnle 2007 for the magma ocean and 4,400; Korenaga 2011, *JGR* 116, B12403, for the low edge; Gando 2011 for the share from uranium and thorium.
- **New data:** none.

**Notes for us.** The beat: the Sun runs the surface; the inside's heat is small, and nobody knows how small it was. The label *Sun and inside* is three words; *Surface heat* was the other choice. KamLAND opens because it is a measurement of the inside that a child can picture; the More does not explain what an antineutrino is beyond "particles so slight they pass straight through". "In a mine in the mountains of central Japan": KamLAND is in the Kamioka mine, Hida, Gifu Prefecture (to check). "Two or three times faster": the classical scaling against Korenaga's nearly constant flux, at about 3 billion years. The crossing of the two lines (the inside above the Sun just after the impact) rests on the spike, which is an order of magnitude from Zahnle's 8,000 K surface, not a number in the paper; the More says "models say". The arithmetic in the More: 238 ÷ 0.092 = 2,587, said as "more than 2,000 times" so that her own rounding (240 ÷ 0.1 = 2,400) agrees; "about 240 watts" for 238.2. Wants events: the faint young Sun; the magma ocean (perhaps *Black Earth*, 4,450 Ma, if it tells the molten surface; to check).

**Checked (9 Oct 2026, four independent checkers).** Changed: KamLAND's 841 flashes were candidates of the right kind, most from nuclear power stations, with about a hundred (111, or 106 by another fit) from uranium and thorium; the heat result came from KamLAND together with Borexino in Italy, and uranium and thorium give "nearly half" (20 of 44 TW; about half only with potassium); "more than 2,000 times" (238 ÷ 0.092 = 2,587; her rounding gives 2,400); "one of the surest on the bar"; "many geophysicists think that about 3 billion years ago the Earth lost heat much faster", not "most … two or three times" (no source for either); the summary's "hundreds to thousands of times". Confirmed: KamLAND under about 1,000 m of rock at Kamioka, about 1,000 tonnes of liquid, 1,879 light detectors, 2002 to 2009; 47 ± 2 TW (Davies & Davies 2010); 1,360.8 W/m² (Kopp & Lean 2011) and 238 absorbed; about 30 percent dimmer (Feulner); Sagan & Mullen 1972 and "not solved"; Zahnle 2007: interior heat of 140 to 190 W/m² against 120 to 170 of sunlight while the surface was molten, about 2 million years to freeze, about 0.5 W/m² by 4.4 billion; Korenaga 2011, heat flow roughly constant; all references and store years. Not confirmed: Gough 1981 in the sources opened (its formula is confirmed through Feulner 2012); Gifu Prefecture ("central Japan" kept).

---

## 6. Continents

**Label:** Continents
**Kind:** plot
**Span:** 4,567 Ma to now (both series)
**Shines on:** *The young Earth* and *First life*
**Unit and scale:** fraction of the Earth's surface; two series, continental crust and land above the sea; linear
**Today:** continental crust 0.40 of the surface (Cawood and others 2018 and Hawkesworth 2020: about 40 percent, with the shelves under the sea); land 0.29 (29.2 percent, CIA World Factbook)
**Known from:** the ages of tiny zircon grains worn out of old continents; the chemistry of old shale and sea water
**Links:** the oldest zircon, 4,404 Ma → *Blue Earth*; the oldest rock, 4,031 Ma → *Grey Earth*
**Replaces:** none; not in the spec's list of current plots (Michael, 9 Oct: "it has data, and Michael wants it")

**Summary (38 words)**
How much of the Earth's surface was continent, from the young Earth to now: the crust that existed, and the part of it standing above the sea. For two billion years, most of it was probably under water. *More*

**More (348 words)**

```
From about 4.5 billion years ago to now.
```

On Erawondoo Hill, in the Jack Hills of Western Australia, there is a layer of old sand turned to stone. Among its grains are tiny crystals of zircon, a mineral so tough that it survives being worn out of one rock and laid down in another. One of them formed 4.4 billion years ago. It is older than any rock on Earth.

Zircon forms mostly in granite, the pale rock that continents are made of. So zircon grains are a record of continents, even after the continents themselves have been worn away. Geologists have dated many thousands of zircons from old sands and rivers around the world, and counting their ages is one way to work out how much continent there was at each time.

It is not simple, because old continent gets worn down or pushed back into the Earth, and its zircons go with it. So the answers differ. Bruno Dhuime and his colleagues worked out in 2012 that about two-thirds of today's continental crust existed by 3 billion years ago. Others argue that most of it was there much earlier still, and has been worn away and rebuilt ever since. The band around the crust line is wide because of this.

Continent is not the same as land. Today about four-tenths of the Earth's surface is continental crust, but only about three-tenths is dry land. Most of the rest lies under shallow sea around the coasts.

In the deep past the gap was much wider. The second line shows the land above the sea, and by some estimates it was a few hundredths of the surface or less until about 2.5 billion years ago. Around then the land rose. In 2018 Ilya Bindeman and his colleagues read the rise in old shale, made from mud washed off the land: its oxygen atoms change about 2.5 billion years ago in the way that rain falling on wide land would change them. Others think that even then only two or three hundredths of the surface was dry.

How much land there was before that is still argued.

**References**
- Simon Wilde, John Valley, William Peck and Colin Graham, "Evidence from detrital zircons for the existence of continental crust and oceans on the Earth 4.4 Gyr ago," *Nature*, 2001. The oldest zircon.
- Bruno Dhuime, Chris Hawkesworth, Peter Cawood and Craig Storey, "A change in the geodynamics of continental growth 3 billion years ago," *Science*, 2012. Two-thirds by 3 billion.
- Meng Guo and Jun Korenaga, "Argon constraints on the early growth of felsic continental crust," *Science Advances*, 2020. Most of it early.
- Ilya Bindeman and others, "Rapid emergence of subaerial landmasses and onset of a modern hydrologic cycle 2.5 billion years ago," *Nature*, 2018. The land rises.
- Ted Nield, *Supercontinent: Ten Billion Years in the Life of Our Planet* (Granta, 2007). For a parent.

**Data**
- **File:** `stories/curves/crust-and-land.json`, 4,567 Ma to now.
- **Series:**
  - `points` (continental crust): unit "of the surface"; scale linear; `say` "continent over about {v} of the surface"; 11 points, store −4566997974 to 2026.
  - `second` ("land above the sea"): `say` "land over about {v} of the surface"; 10 points, store −4566997974 to 2026.
- **Points:** `[year, value, low, high]`.
- **The band:** the spread of the published growth curves (crust) and of the estimates of land above the sea, a judgment; today's values are measured.
- **Today:** crust 0.40; land 0.29.
- **Fade:** older than 4,567 Ma.
- **Links:** −4403997974 → *Blue Earth*; −4030997974 → *Grey Earth*.
- **Checked values:**

| Age | File | Found | Source |
| --- | --- | --- | --- |
| crust today | 0.40 | confirmed: about 40 percent | Hawkesworth 2020 |
| land today | 0.29 | confirmed: 29.2 percent | CIA World Factbook |
| crust, 3,000 Ma | 0.20 (0.08–0.32) | changed: about 0.26 (65 percent of today's) | Dhuime 2012 (press release) |
| crust, 2,500 Ma | 0.28 | confirmed: at least 60, probably 70 percent of today's | Belousova (Goldschmidt 2012 abstract) |
| crust, 4,000 and 3,500 Ma | high 0.14, 0.24 | changed: high edge omits "most of it early" | Guo & Korenaga 2020 (more than 80 percent in the early Archean) |
| land, 2,500 Ma | 0.08 (0.03–0.15) | changed: 0.02 (Flament) to about 0.19 (Bindeman) | Flament 2008; Bindeman 2018 |

- **Changes for Claude Code:**
  - Crust 3,000 Ma (−2999997974): value 0.26, low 0.08, high 0.36.
  - Crust 4,000 Ma (−3999997974): high 0.35 (was 0.14).
  - Crust 3,500 Ma (−3499997974): high 0.36 (was 0.24).
  - Land 2,500 Ma (−2499997974): low 0.02, high 0.20.
  - Sources: add Guo & Korenaga 2020, *Science Advances* 6, eaaz6234, to the crust series; Korenaga, Planavsky & Evans 2017 is about how high the continents stood, so cite it for the land series.
  - The file treats volume of crust as area of surface; the `howSure` should say so (an assumption that crust thickness has not changed much).
- **New data:** none.

**Notes for us.** The beat: continents existed long before land did, and how much of each is argued. "Continent", not "crust", in the summary and label; the More explains crust once by example ("the pale rock that continents are made of"). Granite is a fair stand-in for continental crust for her; geologists would say felsic crust. Fractions are said as tenths and hundredths throughout, never as percent, to match the unit. Bindeman's mechanism is given in one sentence and hedged ("in the way that rain falling on wide land would change them"); the paper reads a change in triple oxygen isotopes in shales as the start of a modern water cycle on wide land. Michael may want a plainer version or none. Wants events: land rising about 2.5 billion years ago (perhaps *Kenorland*, 2,700 Ma, if it tells land above the sea; to check).

**Checked (9 Oct 2026, four independent checkers).** Changed: "most of the rest lies under shallow sea" (the gap between continent and land also holds slopes and sunken pieces of continent); "by some estimates", not "most", for a few hundredths of land before 2.5 billion; "read the rise", so the pronoun points at one thing; today's 40 percent sourced to Cawood and others 2018 (Hawkesworth 2020 not opened by the checker). Confirmed: Erawondoo Hill as the great store of the oldest crystals; Wilde 2001, 4,404 ± 8 Ma, title and authors; Dhuime 2012, about 65 percent by 3 billion, title and authors; Guo & Korenaga 2020, more than 80 percent by the early Archean; land 29.2 percent; Bindeman 2018, triple oxygen isotopes in shales, emergence about 2.5 billion, and the More's sentence fair; Flament 2008, 2 to 3 percent emerged by about 2.5 billion; about two-thirds of today's land by 2.4 billion (Chicago's release on Bindeman); Nield 2007; all fractions and store years. Not confirmed: "zircon forms mostly in granite" (a fair simplification; geologists say felsic rock); that the 4,404 grain came from Erawondoo Hill itself; Belousova's 60 to 70 percent; Korenaga, Planavsky & Evans 2017.

---

## 7. People

**Label:** People
**Kind:** plot
**Span:** 315,000 to 12,000 years ago (new, a guess, see Data); 12,026 years ago to 2023 (`people.json`)
**Shines on:** *Our kind* and *After the ice*
**Unit and scale:** people alive; log scale
**Today:** about 8.3 billion (UN, *World Population Prospects 2024*, for 2026)
**Known from:** censuses, nearly everywhere since about 1950; reconstructions from farmland, towns and records before that; before farming, guesses from archaeology and from genes
**Links:** the start, about 315,000 years ago → *Homo sapiens*; the ice at its largest, about 26,500 years ago → *Last glacial maximum*
**Replaces:** the spec's row *human population*

**Summary (36 words)**
How many people were alive, from the oldest bones of our kind, about 315,000 years ago, to now. For almost all that time there were fewer than ten million. Today there are more than eight billion. *More*

**More (341 words)**

```
From about 315,000 years ago to now.
```

In 2011 Heng Li and Richard Durbin, at the Wellcome Trust Sanger Institute near Cambridge, in England, found a way to read how large a population had been from the genes of one person.

Everyone has two copies of each chromosome, one from their mother and one from their father. Follow both copies back, parent to parent, and somewhere in the past they meet in one ancestor. In a small population they meet sooner; in a large one, later. The number of small differences between the two copies says how long ago they met. Li and Durbin read this along the whole length of a person's genes, and from it worked out how large the population had been at each time.

The number they get is not the number of people. It is the number of parents it would take to pass on that much variety, and a real population is probably several times larger. For the ancestors of one man from West Africa, about 100,000 years ago, Li and Durbin's answer was about 16,000 parents, not 16,000 people.

Archaeologists come at it another way, from the camps people left and how much land hunters need. In 2003 Jean-Noël Biraben, a demographer, guessed that there were perhaps 800,000 people at the start, and that the number passed a million between 30,000 and 40,000 years ago.

The two ways disagree. Before about 50,000 years ago the band runs from tens of thousands to around a million, and it is that wide because nobody knows better.

The plot is drawn so that each mark up the side stands for ten times as many people as the mark below it. That way 100,000 people and 8 billion both fit.

After the ice, people began to farm, and their numbers began to climb: about four and a half million 12,000 years ago, about 230 million 2,000 years ago, a billion in about 1805. Since about 1950 most countries have counted their people, and the numbers are much surer. Today there are about 8.3 billion people.

**References**
- Heng Li and Richard Durbin, "Inference of human population history from individual whole-genome sequences," *Nature*, 2011. Population from one person's genes.
- Jean-Noël Biraben, "L'évolution du nombre des hommes," *Population & Sociétés* no. 394, 2003. Counts from archaeology.
- Jean-Jacques Hublin and others, "New fossils from Jebel Irhoud, Morocco and the pan-African origin of *Homo sapiens*," *Nature*, 2017. Where the line starts.
- Kees Klein Goldewijk, Arthur Beusen, Jonathan Doelman and Elke Stehfest, "Anthropogenic land use estimates for the Holocene – HYDE 3.2," *Earth System Science Data*, 2017. The reconstruction behind the last 12,000 years.
- David Reich, *Who We Are and How We Got Here* (Pantheon, 2018). For a parent.

**Data**
- **Files:** `stories/curves/people.json`, 12,026 years ago (store −10000) to 2023; new, 315,000 to 12,000 years ago, below.
- **Series:** one. Unit "people". The file has no `scale` and no `say`: add scale log and `say` "about {v} people".
- **Points:** `people.json`, `[year, value]`, 70 points, store −10000 to 2023, no band; new, `[year, value, low, high]`, 8 points, store −312974 to −12974 (15,000 years ago).
- **The band:** before 12,000 years ago, the spread between census-type guesses from archaeology (Biraben 2003; Deevey 1960 as tabled by Kremer 1993) and genetic estimates multiplied by 3 to 10 (Frankham 1995: in wild animals, breeding numbers are about a tenth of all numbers); our judgment. After, the low and high summaries of the US Census Bureau's *Historical Estimates of World Population* (to add).
- **Today:** 8.3 billion (UN WPP 2024, for 2026; the file's last point is 8.09 billion in 2023).
- **Fade:** older than 315,000 years (store −312974).
- **Links:** −312974 → *Homo sapiens*; −24474 → *Last glacial maximum*.
- **Checked values:**

| Age | File | Found | Source |
| --- | --- | --- | --- |
| 10,000 BCE | 4,501,152 | confirmed | OWID (HYDE 3.3) |
| year 0 | 232,268,832 | confirmed (OWID has no year 1) | OWID |
| first billion | 1805 | confirmed in OWID; many give 1804 | OWID |
| 2023 | 8,091,734,933 | confirmed | OWID (UN WPP 2024) |
| licence | CC BY 4.0 | confirmed | OWID |

- **Changes for Claude Code:**
  - `people.json`: add `scale: "log"` and `say: "about {v} people"`.
  - Add a band, `[year, value, low, high]`, from the US Census Bureau's low and high summaries, interpolated in log between: 10,000 BCE 1 to 10 million; 5000 BCE 5 to 20 million; 1 CE 170 to 400 million; 1000 CE 254 to 345 million; 1500 CE 425 to 540 million; 1800 CE 813 to 1,125 million; after 1950, ±2 percent.
  - Add today: `[2026, 8300000000, 8200000000, 8400000000]` (UN WPP 2024 medium projection; check the figure on the UN site before adding).
- **New data** (315,000 to 12,000 years ago): people alive, not breeding ancestors. Where a genetic number is used, it is multiplied by 3 to 10 and says so. Sources: Biraben 2003 (perhaps 800,000 at 300,000 to 200,000 years; past a million between 40,000 and 30,000); Deevey 1960 via Kremer 1993 (1 million at 300,000 BCE, all humans, not our kind only; 3.34 million at 25,000 BCE); Li & Durbin 2011 (breeding numbers about 16,000 at 100,000 to 150,000 years; about 5,700 at 50,000, African ancestry); Tallavaara and others 2015 (Europe alone, about 330,000 at 30,000 years, about 130,000 at the glacial maximum); Smith and others 2018 against a bottleneck at the Toba eruption, 74,000 years ago. How sure: shaky; the range is a factor of ten to thirty before 50,000 years and about ten after. Licence: our judgment on cited published figures.

```
[-312974, 150000, 30000, 800000],
[-197974, 200000, 50000, 800000],
[-97974, 200000, 50000, 600000],
[-67974, 250000, 20000, 1000000],
[-47974, 500000, 50000, 1500000],
[-27974, 1500000, 500000, 3500000],
[-17974, 1500000, 500000, 4000000],
[-12974, 3000000, 1000000, 8000000]
```

The band on `people.json`'s first point (−10000) is 1 to 10 million, so the two join.

**Notes for us.** The beat: for almost all of our time there were very few of us, and the number is a guess until the censuses. The scene is the genome lab because the trap the prompt names (breeding ancestors against people) is the thing she needs to see, and the More shows it with Li and Durbin's own number. The coalescence argument is given in one paragraph and is fair to PSMC; the method also uses how the meeting times change along the genome, which is left out. "Several times larger" is Frankham's tenth for wild animals, softened, as people may differ. Biraben's "perhaps 800,000" is for our kind 300,000 to 200,000 years ago, in Africa and southern Asia, per his text; it is the high edge of the band, not the line. The 1805 billion is OWID's; the More says "about 1805". Li and Durbin's 16,100 is a peak, from the genome of one Yoruba man, and rests on the mutation rate they assumed (2.5 × 10⁻⁸ a generation); the slower rate now favoured would roughly double it. The More says "about 16,000 parents" and leaves the rate out. Log scale: the Time Machine bench may already draw people on a linear scale on *After the ice*; the build should keep that line as it is, if it suits, and use log on the deep lines. Michael to say. Wants events: the Toba eruption (74,000 years; a story of a claim and its testing); the first farming.

**Checked (9 Oct 2026, four independent checkers).** Changed: Li and Durbin's 16,000 is for "the ancestors of one man from West Africa" (their Yoruba genome), not of people in Africa; "probably several times larger" (Frankham's tenth is for wild animals); "each mark up the side stands for ten times as many people"; the census sentence softened to "the numbers are much surer" (no source found for "a few percent"); a point added at 15,000 years so the new data meets `people.json` without a gap of 8,000 years. Confirmed: Li & Durbin 2011, title, the Sanger Institute, 16,100 at 100,000 to 150,000 years and 5,700 at 50,000; the method as told; Biraben 2003, perhaps 800,000 of our kind in Africa and southern Asia, and past a million 30,000 to 40,000 years ago; OWID's 4,501,152, 232,268,832, 1805 and 8,091,734,933; 8.30 billion for 2026 (WPP 2024 medium, read from a copy of the UN table); Hublin 2017; Klein Goldewijk 2017; Reich 2018; all six US Census Bureau ranges; all store years. Not confirmed: Deevey via Kremer, Tallavaara 2015 and Smith 2018 (opened in research, not by the checker); the UN's own page for 2026 (it would not load).
