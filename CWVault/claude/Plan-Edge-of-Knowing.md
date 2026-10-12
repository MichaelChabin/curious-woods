---
status: Plan, 12 Oct 2026, written by Claude Code at the end of the session that built the globe's skin (Prompt-Build-Globe-Cities-Ice.md, part 5), on Michael's ruling of 12 Oct evening (Rulings-Sept-2026.md, The one timeline 14): The Edge of Knowing is a gallery story, and its lab is an interactive on the seafloor stripes. Nothing here is built. The story's words come through the pool later.
role: What the stripes interactive shows, what she does with her hands, what data it needs, where it sits in the Time Machine and the gallery, and what the story's words would have to carry.
related: Ideas-Ledger.md (The edge of knowing, 5 and 7 Oct), Plan-Deep-Time.md, Spec-Deep-Time-Interface.md, 03-SEEDS/plate-tectonics.md, js/globe.js (the five words of knowing), stories/plates/continents.json
---

# The Edge of Knowing: the plan

## The idea, in one paragraph

The globe says *measured* back to two hundred million years and then stops being sure. Why it can be sure that far is a thing a ten-year-old can hold in her hands: the sea floor is a tape recorder. New floor is made at a ridge and moves away on both sides, and the Earth's magnetic field flips every so often, so the floor is striped, north-up and north-down, mirrored either side of the ridge. The width of a stripe is how long the field held that way times how fast the floor moved. Read the stripes and you can run the continents backwards. The story is how that was found (Wegener laughed at for forty years and right for a reason he never knew; the stripes that proved him in the 1960s), and the lab is the reading itself. The same shape runs through the whole timeline — the dot and the tail, the fog line, a date that moves when a method improves — and this story is where she meets it on purpose.

## What the interactive shows

One stretch of sea floor, seen from above, between two continents: the South Atlantic to start, Africa and South America, because the fit is famous and the ridge runs straight down the middle. The ridge is a line; the stripes lie either side of it, drawn in two tones (ink and parch, or ink and the sea's blue), mirrored. Above the floor sits the ruler: the sequence of the field's reversals as a bar of the same two tones, with the ages written along it, the last few million years at first (Brunhes, Matuyama, Gauss, Gilbert, the names small, the ages large).

Three things move:

1. **The ruler slides.** She drags the reversal bar along the stripes from the ridge outwards. When the pattern on the bar matches the pattern on the floor, it clicks, the way the window clicks onto a period, and the stripes under it take their ages. The floor is now dated, stripe by stripe, both sides.
2. **The continent slides back.** With the floor dated, she drags the age: the floor younger than that age vanishes, both sides, and the continents close over it. At a chosen age the gap between Africa and South America is exactly the floor older than that age. She can see them meet, and when.
3. **The speed is read.** A stripe's width divided by its length of time is a speed. The lab writes it once, plainly, where the ruler clicked: "about 3 cm a year, the speed a fingernail grows." That is the one number, and it is hers because she made the match.

Then the edge: she drags the age back past the oldest floor (about 180 million years in the Atlantic, about 200 anywhere), and the stripes run out. There is no floor older than that anywhere on Earth; it has all gone back down. The ruler has nothing to click onto, the word under the globe changes from *measured* to *inferred*, and the story says why that is the edge, and what is used instead (rock magnetism gives north and south, not east and west; the fit of the coasts; fossils that match across the water).

## What she does with her hands

- Drag the ruler along the stripes until it clicks. The click is the lesson: a pattern that only fits one way.
- Drag the age, and watch the continents close. The same gesture as the Time Machine's marker, and it should be the copper knob.
- Tap a stripe to read its age; tap the ridge to read "new floor is made here, today, about as fast as your fingernail grows"; tap a continent's edge to see it was once joined.
- Choose another ocean (the North Atlantic, the Pacific off Mexico where the stripes were first mapped, the Indian Ocean where India raced north) from a word in the column, the way the Time Machine's column offers words that act.

Nothing is scored. The click says she has it.

## What data it needs

- **The reversal timescale:** the geomagnetic polarity timescale, which chron began and ended when, back to 180 million years. Published and public (Ogg's table in the Geologic Time Scale 2020; the older Cande and Kent 1995 is the classic). A small file: a few hundred pairs of ages and a polarity. To be written as `stories/plates/reversals.json` by a tool with the source and the version in it.
- **The age of the sea floor** on a grid, so the stripes can be drawn as they really lie, not as a diagram: Müller et al.'s seafloor age grid (the EarthByte "age of oceanic lithosphere" grid, 2019 or later, CC BY), which gives every point of today's ocean floor an age in millions of years. From it the stripes are made by looking up each point's age in the reversal table: the floor's polarity is the polarity of the field when it was made. That is the honest version of the diagram, and the same tool that makes it can make the continents close by masking the floor younger than the chosen age.
- **The plate rotations we already have** (`stories/plates/continents.json`, Merdith et al. 2021): the answer to check against. When she has dated the floor and closed the gap at, say, 100 million years, the model's position of the two continents at 100 is drawn under hers, faint, and they should agree. Where they do not, that is the story too: the model is a fit, and the floor is the measurement.
- **The pictures** the story will want (the Pictures insert of Prompt-Pool.md): the 1963 magnetic profile from the Reykjanes ridge, Vine and Matthews, the Eltanin-19 profile that was its own mirror image, Wegener's map of the fit, a photograph of pillow lava from a ridge. Rights to be sorted as the pool does.

The age grid is the only heavy piece: it comes as a global grid at six arc minutes, and the lab wants it for a few oceans at a resolution that reads on a phone, so the tool cuts and downsamples it once, into tiles beside the plates' data, a few hundred kilobytes.

## Where it sits

- **In the Time Machine:** behind the word *measured* under the globe. Today that word is only a grade; in this plan it is also a door: tap it (or the sentence under it) and the stripes lab opens in Glass Geometry's window, as the More does, on the ocean nearest to where the globe is turned. The Time Machine stays underneath. Closing the window returns to the globe at the same age, with the word now meaning something.
- **In the gallery:** as the story's own painting, *The Edge of Knowing*, with the lab called from the story's text where the text says to (the Rulings: the interactives sit with the text that calls them). The story opens the lab on the South Atlantic at today's age with the ruler unplaced; the Time Machine opens it wherever the globe is looking.
- **In the code:** a shelf module in the shelves' form, `cwStripes(host, { ocean, age, onAge })`, like `glass.js` and `deep-time.js`: one SVG or canvas, no page of its own until it earns one, a bench in `experiments/` first (the standing method: every perceptual question gets a bench before anyone argues). It shares the knob, the halo, the window and the column's words with the Time Machine and draws nothing the Time Machine draws.

## What the story's words would have to carry

One beat: *how far back can we be sure, and why.* Positives first: what the stripes let us know, before the edge where they stop. In the first person where that makes it stronger ("I find it hard to believe that the floor of the sea is a tape recorder, and it is"), testimony by name where it is someone's experience.

- Wegener in 1912 with the fit of the coasts and the fossils, laughed at because he had no engine for it; the floor mapped in the 1950s for the Navy, striped for no reason anyone could say; Vine and Matthews in 1963 saying the reason in two pages; the Eltanin-19 profile that was its own mirror image and convinced everyone in an afternoon. Four people and a ship; no dates beyond the four years, each placed beside something she knows.
- The reversals themselves, as a wonder on their own: the field flips, nobody knows quite why, and the last time was 780,000 years ago, which the story can place on the Time Machine's line with one tap (Hand axes).
- The edge, honestly: the floor is young because it sinks back; nothing older than about 200 million years survives at sea; past that the globe is *inferred*, then *fitted*, then *guessed*, and the words under the globe are the story's last paragraph in five words.
- The same shape elsewhere, in two sentences each, pointing at the Time Machine's own events: the zircons (Oceans form), a painting whose age moved when the method improved (Sulawesi), a people older than their oldest site (Homo sapiens at Jebel Irhoud). The story names the dot and the tail and lets her go and find them.
- "More:" the Vine–Matthews paper, the age grid and the timescale as named sources, and one paragraph on the magnetometer towed behind a ship, for the child who wants to know how the stripes were seen at all.

What the words must not do: teach plate tectonics as a syllabus, say "what this teaches," or make the lab a quiz. The click is the whole of the assessment, and it is hers.

## Open, for Michael

- Which ocean first: the South Atlantic (the famous fit) or the Pacific off Mexico (where the stripes were first mapped, but with no continent to close).
- Whether the age grid's real stripes or a clean diagram: the real ones are irregular and honest, the diagram is readable at a glance; the plan says the real ones with the diagram as the ruler, and a bench would settle it.
- The door from the globe's *measured* word: a tap on the grade word is new behaviour in the Time Machine's column of rulings.
- The gallery picture.
