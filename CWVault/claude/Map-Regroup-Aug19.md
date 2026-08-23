---
status: Consolidation — Aug 19 2026. Everything from the 3 a.m. session that wasn't already written down.
role: Handoff. Read this before continuing the map-tools work in a new session.
authority: Michael's vocabulary and decisions. Where this conflicts with a top-level doc, the top-level doc wins — this was never allowed to edit them.
related: claude/Map-Tool-Catalog.md, claude/Rectangle-Tool-worknote.md, claude/Fog-Map.md, claude/Irrationality-on-the-Map.md, claude/Modular-Arithmetic-for-Kids.md, claude/Voice-Samples-Map.md, claude/Map-Tools.md
superseded: Map-Tool-Catalog.md is authoritative for map tools. Kept for
  history; may contain claims later corrected.
---
Map Regroup — Aug 19

Tags used throughout: [EXISTS] built and deployed today · [SPEC] named in the vault, not built · [NEW] came out of this session.

All numeric claims below were computed, not remembered.

1. The frame that holds the introductory set

Michael's, and it is the strongest organizing idea in the session.

A rectangle has three slots — width, height, area — and every operation is just which one is missing.

Know both sides, want the area → multiply
Know the area and one side, want the other → divide
Know the area, and the only other thing you know is that the sides are equal → square root

One refinement worth keeping. Square root is not the third case of the same thing. With multiply and divide you are given two facts. With square root you are given one fact and one condition — "make it square." That is a different kind of knowing, and it is exactly why square roots are harder, and why they so often don't land on the lattice.

That last point closes a loop: a rectangle that can't be made square with whole numbers is the same rectangle whose square-peel never terminates. See claude/Irrationality-on-the-Map.md.

Why this matters for division. Division here is never the traditional algorithm. It is "which side is missing." Guzinto is undefined and stays undefined.

2. What the map actually is today

From a read of the vault and the deployed tool, Aug 19.

Geometry. Not a 10×10 table. A canvas plane, origin bottom-left at world (0,0), y up, 200 world units per unit interval. A pane is addressed (column, row) and holds the product. visibleBounds() clamps to ≥ 1, so today only the first quadrant exists. Expansion is by pan and zoom, not by a fixed extent.

Four quadrants are [SPEC], not [EXISTS] — and explicitly not negative multiplication. Positive values in all four cardinal directions; the other quadrants are near-free reflections. The compass letters N, E, S, W are already drawn, with the comment that W and S "point into territory that exists and is not drawn; that is the point."

Consequence for anything written earlier in this session: primes glow on the bottom row and left column today, becoming four rails when quadrants land. Not "top row and left column" — that was a classroom-table reflex and it was wrong.

A pane holds a state, not just a number. Unbuilt = transparent, parchment and construction lattice showing through ("an empty aperture is a number not yet made"). Built = glass backed by came, composed of prime-coloured pieces. The unity pane at the origin is clear glass.

Colour is prime identity and is currently the sole channel. From the sample: 2 blue, 3 gold, 5 red, 7 green. Chips stop at 7; sound reaches 19; primes past 19 are clear glass.

Exact vocabulary — do not invent variants

Modes: Multiply · Build · Explore · Properties Build: Build with primes · Build by selecting · Rows & columns · Multiples · Diagonals ↗ · Diagonals ↘ Properties: Squares · Pronics · Powers of 2 · Powers of 3 · Triangular numbers · Nearly square Globals: Fill · Continue? · Clear · Show numbers / Hide numbers · Save · Postcard · Full sheet Viewing: Show map / Hide map · grid follows zoom / grid keeps its step · axes · shown [SPEC] and unbuilt: Choose / Select · Rectangles only · Restack · Make Square · Start fresh? / Keep working Domain nouns: pane · glass · came · aperture · workshop · viewing · lattice · unity pane · reveal

Two notes for anyone extending this. Properties is already the "light up every cell that…" tool — new highlights are new Properties entries, not a new mode. And the Aug-12 amendment governs colour: within any one viewing, colour means one declared thing; across viewings the child assigns colour to her question. So a gcd colouring is its own viewing, never an overlay on fog.

The fog-map already is the largest-prime-factor map — it shades each pane by the rank of its largest prime factor, white at 2, black at the 256th prime (1619). The plaid Michael noticed is that function. Why it is a plaid is in claude/Fog-Map.md; the kid-voice explanation of it is in claude/Voice-Samples-Map.md.

3. The introductory set
Multiply [EXISTS, extend]

Today: tap-tap on the axes; drag a rectangle anchored at the origin, the corner snapping to panes, live readout 4 × 7 = 28; on release the reveal runs bottom factor, left factor, product, at all instances.

[NEW] Tap one number twice to square it. Squaring becomes a discovered special case of multiplying rather than a separate idea.

[NEW] Drag rectangles from either axis with a control point at the upper right corner. Michael's move, and it is what makes 3 × 0.5 easy — see the resolution slider below.

[NEW] The detach. Today the corner drag changes the product. The move that came out of this session is the opposite: hold the beads constant and let the container change. That is not in any vault doc, and it is the thing that turns Restack from a division picture into modular arithmetic, because it lets her keep the number and vary the width. Full treatment in claude/Rectangle-Tool-worknote.md.

Restack [SPEC]

Vault description: 4 ÷ 3 gives three columns plus the fourth pane in thirds.

Michael's design: the child picks any number, then a number of stacks. The readout shows n + some fraction, with n incrementing each time a row completes. The number that appears is the height of the stack, watched growing — not a digit produced by a ritual.

[NEW] The leftover pane has two readings, and both are free. Two panes left on a stack of four is 2 left over or two-fourths of a row. First reading is the remainder, which is what modular arithmetic runs on. Second is the fraction, which is what demystifies division.

[NEW] Those two readings are the two meanings of division. Picking a number of stacks and asking how tall — that is one question. Fixing a width and asking how many rows fit — that is a different question that feels different to a child, and is almost always taught as though it were the same. The tool naturally contains both. Worth knowing before naming either.

Decision: treat division as fractions by default. The win is large — it kills "2 remainder 2" as a pseudo-number, and it fixes the deeper problem that children read ¾ as an unfinished sum rather than as a number. A fraction is a division, complete.

The one exception: how-many-fit questions. Thirty people, seven-seat vans — 4²/₇ vans is a correct fraction and a wrong answer. Not a maths error, a modelling one. Keeping the leftover readable both ways covers it at no cost.

Open: does Restack keep the original rectangle visible while the new stacks build, or does the number transform in place? Unresolved.

Make Square [SPEC]

Michael's method, entirely graphic, and verified. To take the root of 2: start with one unit square. Slice a second unit square into ten rows and ten columns. Tile the small squares around the first as a gnomon — ten across the top, ten down the side, one in the corner: 21 tiles. Do it again with 23, then 25, then 27. That is 96 tiles used, 4 left over, and the square now has side 1.4. Slice those 4 into 400 smaller tiles and continue: the next gnomon takes 281, leaving 119, and the side reads 1.41.

This is the digit-by-digit square root as pictures. Nothing is asserted.

[NEW] The gnomon counts are consecutive odd numbers — 21, 23, 25, 27 — because a gnomon around a square of side n is 2n + 1. Which is the same fact as 1 + 3 + 5 + 7 = 16 building the whole squares. Make Square is the odd-number pattern running one zoom level down, and again at the next. If a child has met the odd numbers on the diagonal, she will recognise them here, and that recognition is the method.

(The averaging method — guess a width, restack for the height, take the halfway point — converges faster: 1.5, 1.41667, 1.4142157, 1.4142135624 in four moves from a start of 1. It is 3,700 years old. But it asserts a step where the gnomon method shows one, so the gnomon is right for this map. Keep averaging in reserve.)

Build with primes [EXISTS]

Michael's fill order, verified on a 7 × 7 map:

7 alone → 4 panes
add 5 → 9 panes
add 3 → 16 panes, which is every odd pane, exactly as he predicted
add 2 → 49 panes

[NEW] The punchline: 2, added last, delivers 33 of the 49 panes by itself. The smallest prime does two-thirds of the entire map. That is a discovery worth engineering the order to produce.

Each prime carries a colour, so products carry their factorisation as colour.

The resolution slider [NEW]

Michael's: steps of 0.5, then powers of 10.

This is already justified by his own square-root method — the gnomon slices into tenths, so the slider and Make Square are the same act at different moments. Half is the odd one out, and it earns its place by being the first thing that makes multiplication shrink something.

Different units on x and y: interesting, deferred, and correctly deferred.

4. The misconceptions, and the structural answers

Michael's ask: each of these answered implicitly and unavoidably, through graphics and sound rather than text.

Sharpening. "Answered at the very beginning" edges toward a tutorial. The stronger version is: not front-loaded, but unavoidable because the map cannot behave otherwise. A misconception can't survive in a world that contradicts it every single time she touches it — and she never has to be told she was wrong, because she never got to be wrong out loud.

Which also means these are not seven features. They are four or five readouts that happen to be permanently on.

Misconception	The structural answer
Multiplication makes things bigger	This is the most durable misconception in arithmetic, and a whole-number map reinforces it on every pane. It only breaks when a factor is under 1. This is a debt the design incurs, and the resolution slider at 0.5 is where it gets paid.
Division is one thing	Restack's two readings, both permanently available.
1 is prime	Count the rectangles that land on a pane. A prime has exactly two. A composite has more. The unity pane has one. Not a rule imposed — a number she reads. And clear glass adds no colour because a thing that changes nothing cannot be a building block. (Michael's discomfort is historically respectable: Lehmer's prime table of 1914 still listed 1, and Goldbach thought it was prime.)
Zero	She will ask why the axes start at 1. A rectangle with a side of nothing isn't a rectangle. It has no pane because it has no shape.
Area and perimeter blur	Same glass, different came. Thirty panes as 1 × 30 needs 62 lengths of came; as 5 × 6, 22. Hold the beads, drag the corner, show the came rising while the glass stays put. Then the discovery: the square always needs the least. Area 36 runs 74, 40, 30, 26, 24 as she squeezes toward 6 × 6. A real theorem, found by dragging.
Bigger means more factors	Dies in the ear, not the eye. One tone per prime factor already exists. 48 is 2·2·2·2·3 — five tones. 49 is 7·7 — two. The bigger number is the thinner sound, every time, and nobody says anything.
7 × 8 = 8 × 7 is obvious	The strength isn't that they look alike. It's that one pane is reachable from several rectangles — 28 is 4×7 and 7×4 and 2×14 and 1×28. Many names, one place. That also quietly fixes the equals sign, which most children read as "here comes the answer."

Michael intends a story attached to each. None written yet.

Accessibility flag. 5 and 7 as red and green is the colourblind pair, and colour is currently the sole channel for prime identity. The vault already lists the colourblind-safe workshop as a vacancy; this is where it bites.

5. Positions held (for consistency across sessions)

No negatives on the map. Four directions means positive integers running outward, not signed quadrants.

Supporting evidence, should it be needed: the approximate number system — shared with infants and corvids — represents how many things are in a collection, and there is no collection of minus three things. Negatives can't be read off perception; they are built symbolically on top. European mathematicians rejected them for centuries and Maseres was still arguing in the 1750s that they be thrown out of algebra. A child's confusion is the historically normal response.

If negatives ever do come up, the complete answer is that the result is forced, not chosen:

0 = (3 + (−3)) × (−2) = 3×(−2) + (−3)×(−2) = −6 + (−3)×(−2)

so (−3) × (−2) must be +6, or addition and multiplication stop agreeing. Nobody decided this. It is the only value that lets the arithmetic she already has survive the extension — which is also the general move by which number systems grow.

No infinity needed. A map that expands as far as she likes is potential infinity, which is what Euclid used. He never says there are infinitely many primes; he says there are more primes than any assigned multitude.

The plane is constructed, not given. "You can put 0 anywhere you like" — and the rebuild button reconstructs the grid from 0, 1, lines and circles, as Euclid could have done and never did. Worth knowing that Roman surveyors came closest: centuriation laid out a fixed origin and two perpendicular axes, the decumanus and the cardo, and numbered plots by coordinates — roughly two thousand years before Descartes formalised it. Good story material.

6. Why none of this was in anyone's schooling

Worth having ready, because every adult who sees the orchard asks.

These are pictures without procedures. Curricula organise around things that can be set as exercises and marked, and an image that produces understanding but no homework problem has nowhere to live. The material also falls between floors — too elementary for a number theory course, too unfamiliar for arithmetic. And most of it is only cheap to draw on a screen: before that, each of these images was hours of hand-plotting for a single instance, when the entire point is changing n and watching.

Not a conspiracy. A gap that opened because the tools arrived after the syllabus was set.

7. Where to pick up
Stories. One per misconception, in the register of claude/Voice-Samples-Map.md. Michael to pick the first.
Resolve Restack's open question — original rectangle visible, or transform in place.
Kid-voice paragraphs for the catalog entries that don't have them (T1–T4, T7 in claude/Map-Tool-Catalog.md). The paragraph is the acceptance test: if it can't be written that way, the tool isn't understood well enough to build.
The colourblind workshop, before colour hardens as the sole channel.

Two edits were made to Design-Principles.md this session — the pixel-counting correction (areas converge, lengths do not) and a new "Re-define, every time" section. Number Map 3 and Claude Code should know, so the three of us don't collide.