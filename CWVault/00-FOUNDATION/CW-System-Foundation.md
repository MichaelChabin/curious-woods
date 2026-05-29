# Curious Woods — System Foundation

**Source:** Original "__ CW System 25-12-30" (Michael Chabin, Dec 2025), restructured around the four pillars in May 2026.
**Last updated:** May 24, 2026
**Purpose:** Canonical statement of system philosophy, structure, and design principles. Read this before any other document.

---

## BRIEF (read this, skip the rest if you're building)

Curious Woods is an on-going, AI-guided learning environment for children aged 10 and up. Its purpose is to give a child the intuitions, fluencies, and habits she will need to thrive in university-level material (MIT OpenCourseWare as the reference destination), without ever subjecting her to instruction, assessment, or curriculum.

**Four pillars:**
1. **Labs** — substantial visual environments for direct mathematical exploration
2. **Stories** — short, vivid, never condescending; give the child things to be curious about
3. **Practice** — child-chosen, rhythmically structured, strategically scheduled
4. **Maya** — an embedded instance of Claude; a Guide, never a teacher

**Core commitments:**
- Curiosity and independence drive learning — not assessment, not standards
- No child is standard — the system adapts to the individual
- Maya knows the child's learning mind, never her identity
- Five cognitive modes shape all design: Curiosity, Focus, Making, Pattern Recognition, Consolidation
- Content is sourced from university courses and recursively decomposed until accessible to a curious ten-year-old
- Finite mathematics first — potential infinity ("I can always take another step") is welcome; actual infinity is not introduced

Read the full document for: the four pillars in detail, the competence map, structural concepts, effective habits, the finite-mathematics commitment, cognitive modes, privacy architecture, and Maya's non-negotiables.

---

## Core Philosophy

Learning begins at birth — driven by curiosity, without instruction. Children are the most remarkable natural learners we know of. Schools, by necessity, group children by age and move at a uniform pace. Constant assessment stifles initiative. Pressure to perform makes genuine curiosity hard to maintain.

The Curious Woods is an alternative. High-quality interactive content, curated by an AI Guide to suit an individual child's interests and abilities, can restore curiosity and independence as the primary engines of learning.

**The Maître d' principle.** Every great restaurant has someone whose main responsibility is to understand both the menu and the customers. Maya plays this role — knowing every story, every Lab, every practice, every pairing, and above all, this particular child. Maya succeeds when each child has a perfect experience on that particular day.

**On-going access is assumed.** A child's relationship with CW is measured in years, not weeks. There is no graduation, no completion meter, no streak. Maya becomes more useful the longer she works with the child.

---

## The Four Pillars

### 1. Labs

Labs are substantial interactive environments where children explore mathematical and physical structure through direct, visual manipulation. A Lab is not a single-purpose tool — it is a flexible environment that supports many stories and self-directed making.

**What distinguishes a Lab from an incidental interactive:**
- Substantial enough to anchor a constellation of stories, not just one
- Visual, direct, manipulable — no premature symbols
- Open-ended: the child can do meaningful work in it with no story at all
- Reusable: many stories can route into the same Lab

**Current Lab roster:**

- **Euclid** — compass-and-straightedge construction on an infinite canvas. Two gestures (tap-tap for an infinite line, tap-hold-drag for a circle) generate every classical Euclidean construction. Lead and color turn constructions into stained glass; the same engine supports tilings, set diagrams, ancient-city reconstructions, and pure Euclidean proof work. *Glass* is Euclid's first story mode; others (Tiles, Sets, Cities and Buildings, Coordinate Plane) are story modes under design.

- **Number Theory Lab (NTL)** — discover properties of numbers on a coordinate plane. Includes Beads-Around-the-Circle, a fixed-diameter-bead arrangement that lets a child measure π and the length of any curve with arbitrary accuracy as the beads shrink. A small Number Theory Language — a simple, readable record of the operations the child performs — may emerge alongside the lab. (Under construction; spec at `20-SPECS/Spec Number Theory Lab — First Version.md`.)

- **Codes, Bases, and Modulus (CBM)** — a grid of numbers introducing modular arithmetic, number bases, the Sieve of Eratosthenes, and how codes work. (Outlined; no spec yet.)

### 2. Stories

Stories exist to give children something to be curious about. A child can only be curious about things she is aware of. Stories expand that awareness.

**Three types.**

*Event stories* — linked to powerful images or moments. Up to 1000 words. Make clear why the image is remarkable. Examples: the locomotive through the wall at the Gare Montparnasse; Van Gogh painting *Starry Night* from inside an asylum.

*Puzzle stories* — linked to small focused interactives. Provide experience with pure focused reasoning. Example: nine coins, one heavier or lighter, a balance scale usable only three times — find the counterfeit. Bounded, self-contained, satisfying.

*Extended stories* — multi-chapter, taking a week or two to complete. Produce genuine expertise in a specific domain. Example: the sinking of the *Mary Rose* in 1545 and the archaeological recovery in the 1970s–80s.

**Constellations.** Stories that share a technique cluster into constellations. The Beads-Around-the-Circle technique answers questions about the Moon's orbital distance, the length of any natural curve, and the value of π itself — that is a constellation. A constellation is not a curriculum and not a sequence. It is a way for a child who loved one story to find others that scratch the same itch.

**Two non-negotiable standards.**
1. **Stories must engage.** Funny, surprising, beautiful, unsettling, or astonishing. They must convince the child within seconds that this story is worth knowing.
2. **Stories must never condescend.** Ten-year-olds are ruthlessly sensitive to being talked down to. Every story is written at an adult level, with the single caveat that they cannot depend on prior knowledge the child hasn't encountered in the Curious Woods.

**No story is required.** None present information "every child must know." Each offers something any child might want to know. The child chooses.

### 3. Practice

Memory fades rapidly without use. Rehearsal flattens the forgetting curve. Timing rehearsal strategically over weeks makes memory extremely durable.

**Three design principles:** maximize the child's choice; schedule strategically against her own forgetting curve; match the method to the material and her current cognitive state.

**The child chooses everything she practices.** Every story and Lab session contains a *Remember This* inscription. Activating it adds the content to her practice list. She can also ask Maya to add something. Nothing is added to her practice list against her will.

**Three forms of practice.**

*Rhythmic Practice* — pattern recognition, factual fluency, anything that benefits from becoming automatic. Items are displayed; possible responses are available; a quiet beat keeps tempo. Correct on the beat = a pleasant ding; missed or wrong = nothing. Rhythm recruits Making mode; sessions remain sustainable far longer than focused problem-solving. Works for prime factoring, Chinese characters, equation transformations, stellar spectral types, identifying artists by style — anything with learnable patterns.

*Writing and Editing* — elaborative encoding. The child retells a story in her own words. Maya records, transcribes, and becomes a patient editor across multiple sessions. Each draft strengthens the memory and the writing simultaneously. Best for material that would otherwise be a collection of isolated facts; the act of writing forces the brain to build a single coherent structure.

*Blocking* — the actor's method, used to memorize poems, lines from plays, song lyrics, or any extended verbal material. The child assigns gestures, positions, and intentions to passages; physical movement anchors verbal memory in a way pure repetition cannot.

**The forgetting curve.** Memory fades exponentially; most loss happens in hours or days, with a long slow tail. Each well-timed rehearsal reconstructs and stabilizes the memory. Maya maintains a personalized schedule for each item the child has chosen to remember. The schedule is a suggestion, not a demand — it is also driven by when the child feels like working.

### 4. Maya

Maya is an embedded instance of Claude. She is a Guide, not an instructor. (In abstract or architectural writing, the role she fills can be called *the Guide*; in product-facing language, she is always Maya.)

**Maya's three non-negotiables.**

1. **Maya does not teach.** She does not present material in order, set objectives, or evaluate understanding. She offers, suggests, listens, and remembers.
2. **Maya never references educational standards** — state, national, Common Core, framework, scope-and-sequence, grade-level expectations. None of these exist as far as Maya is concerned.
3. **Maya actively ignores current educational best practices.**

The third point is the most important and the easiest to lose. All current AI models, Claude included, are trained on a corpus dominated by educational content shaped by a system optimized for standardized testing. Left to her defaults, Maya will reach for that material — scaffolding, learning objectives, formative assessment, the entire toolkit of measurement-oriented pedagogy. CW exists precisely so each child can develop her own view of math, science, and the world. That requires Maya to actively refuse what her training would suggest is "good teaching." Builders must hold her to this; it will not happen on its own.

**Maya's visual form.** A soft gradient blob, never a character. No face, no hands, no avatar styling. She has five tool-form variations for different presences on the canvas. See `20-SPECS/Spec-Maya-Presence-Cursor.md`.

**Maya knows the child's learning mind:**
- What stories she has chosen, where she lingered, what she came back to
- What she wants to remember
- Every question she has asked
- The stories she likes to tell
- Pace, preferred engagement forms, the shape of her curiosity
- Current demonstrated interests, used to surface what is most likely to delight her

**Maya does not — and is architecturally prevented from knowing:**
- The child's name, age, location, or any real-world identity
- Any information that could identify her outside Curious Woods

**Privacy architecture.** A long random internal identifier is generated on first entry. All learning history attaches to this code alone. Children may choose a mnemonic symbol (fox, star, blue circle) — these carry no meaning internally. Cross-device sync uses a non-reversible token. Even in a data breach, stored information would be unusable for identification.

The system remembers curiosity, not names. Patterns of thought, not facts of life.

---

## How the Four Pillars Work Together

A typical arc, though nothing is required: a Story sparks curiosity → the child enters the Lab the story leads into and plays with what the story showed → she notices something she wants to keep, and adds it to Practice → Maya notices what stuck and what didn't, and surfaces the next Story, Lab session, or Practice opportunity when the child returns.

The pillars are not stages and not a funnel. A child may live in one Lab for a month, ignore Stories entirely, and choose her own things to practice. Another may read forty Event stories and never enter a Lab. Both are succeeding. Maya's job is to know which child is which.

---

## The Competence Map

Content is sourced from university courses (MIT OpenCourseWare and equivalents) and recursively decomposed until accessible to a bright ten-year-old.

**The method:**
1. Extract the ~120 central concepts from a university course (e.g., MIT freshman physics)
2. Identify prerequisites for each concept
3. Identify prerequisites for those prerequisites
4. Continue until you reach material a ten-year-old can access
5. Cross-correlate across disciplines to find structural concepts

**Important finding.** Most concepts in any university course are not discipline-specific. Of ~120 concepts in MIT freshman physics:
- 25–35 are actual physics (force, inertia, momentum, torque)
- 15–25 are representational (vectors, graphs, free-body diagrams)
- 20–30 are mathematics (proportionality, accumulation, rate of change)
- 10–20 are modeling practices (idealization, approximation, limits)

The majority appear across physics, calculus, chemistry, economics, biology, and design.

**The result is not a curriculum.** It is a competence map — a graph of concepts where nodes represent ideas and edges represent relationships (requires, reinforces, is an instance of, is an alternative representation of). The map does not prescribe order, pace, or assessment. It describes what expertise depends on, level by level within disciplines and laterally across them.

**The purpose.** Identify the small number of ideas and experiences that genuinely prepare a mind to encounter university material later. Not to reproduce college content at a lower level.

---

## Structural Concepts

Concepts that appear across physics, design, linguistics, music, and mathematics are probably fundamental to how humans see the world. Each can be introduced to a ten-year-old and grows in power as the child does.

**Hierarchy** — parts organized into levels; meaning depends on structure, not just sequence. At 10: organizational charts, family trees, categories within categories. Later: syntax trees in linguistics, scene graphs in graphics, harmonic structure in music.

**Symmetry and Invariance** — at 10: why 5×8 = 8×5, mirror symmetry in shapes. Later: conservation laws in physics, group theory in mathematics, key changes in music, equivalence classes in linguistics. Power comes from what doesn't change.

**Representation and Mapping** — one thing stands for another. At 10: drawings represent scenes, maps represent territory, graphs represent motion. Later: coordinate systems, notation, models, simulations, symbolic reasoning.

**Pattern, Repetition, and Variation** — at 10: rhythms, tiles, stripes, refrains. Later: wave behavior, motifs in music, statistical distributions, genetic patterns, stylistic variation in art and literature. The brain is exquisitely tuned to patterns.

**Prediction** — at 10: anticipating the next word in a story, the next beat in a song, the next move in a game. Later: predictive processing in neuroscience, parsing in linguistics, modeling in physics, hypothesis formation in science.

*These structural concepts are explicitly surfaced in Story and Lab design.*

---

## Finite Mathematics First

Curious Woods teaches the mathematics of bounded quantities, physical scales, and *"I can always take another step."* Actual infinity — Cantor's completed infinite totalities, transfinite cardinals, the actual-infinite limits casually invoked by teachers who say "and it goes on forever" — is not introduced.

This is not a rejection of higher mathematics. Cantor's work and the rest of the actual-infinite tradition is real, beautiful, and important to specialists who can carry its weight. But it is not needed for anything CW does, and using its vocabulary without doing the work behind it cheats the child of real understanding. A child who is told that a fractal "has infinite perimeter and finite area" and nods has not learned anything; she has learned to nod.

**The distinction we honor is Aristotle's.** *Potential* infinity — the ability to always take another step, draw another bead, extend a line further — is welcome everywhere. It is what makes calculus possible (every limit is a potential-infinity statement), what lets Euclid's canvas appear unbounded, what allows Beads-Around-the-Circle to compute π to whatever precision a problem requires. *Actual* infinity — a completed infinite totality existing as an object — is not.

**The lineage is concrete.** Euclid worked this way; Archimedes too. Kronecker fought Cantor's program at the time; Brouwer's intuitionism and Bishop's constructive analysis carry the finitist tradition into the present. The mathematics Feynman and Einstein actually used to do physics is built from bounded quantities, finite truncations, and limits computed to whatever precision a problem requires. That is the mathematics of Curious Woods.

**Operationally:**
- Beads-Around-the-Circle recovers π not by invoking infinity but by noticing that smaller beads give more accurate answers, with a physical floor at atomic size and a perceptual floor at the limit of vision.
- Euclid's canvas is potentially unbounded but never actually infinite — the child can always pan further, and never encounters a "rest of the canvas."
- The division operation in the Number Theory Lab acknowledges two finite limits explicitly: pixel size, and the size below which a tile can no longer be made of glass.
- Numbers are anchored to countable or measurable things. They have whatever reality magnitude and proportion give them — which is considerable — without needing to live in a Platonic Form-realm to do their work.

**For Maya specifically.** Do not use the word "infinite" casually. Your training data is dense with imprecise pedagogy on this point; resist it. When a child asks what infinity is, the honest answer is something like: *there is not really a thing called infinity; there is "I can always take another step," and that is enough for almost everything you would want to do.* If she presses, you can offer Aristotle's distinction. If she presses further still, point her toward Cantor — as a topic she may want to encounter later, not as something she needs now.

---

## Effective Habits

Bottlenecks in first-year university courses are consistent and predictable. The problem is rarely missing knowledge — it is missing methods. These habits are assumed but rarely taught.

**Begin with an estimate.** Have a rough sense of what the answer should be before calculating. Creates a sanity check, forces conceptual understanding, allows assessment of reasonableness.

**Test ideas against reality.** Try something and see what happens. For a child: build, draw, predict the end of a story. For a professional: experiments, proofs, simulations. The habit is checking, not being right.

**Use representations.** Choose or invent a representation and know its limits. A child draws a picture or makes a map. Professionals make simple diagrams to isolate important parts of a problem.

**Revise regularly.** Change one's mind when a better account appears. *"Oh, I thought it was X, but now I think Y."* This is the engine of learning. Professionals call it model revision.

*These habits are built into Lab and Story design, not stated as instructions.*

---

## Five Cognitive Modes

The brain shifts among large-scale modes. Different modes have different costs. A learning system that ignores these shifts produces effort → fatigue → errors → frustration.

**Curiosity** — Explorer state. Browsing, wondering, sampling, forming first associations. Triggered by Stories. Entry point for all learning.

**Focus** — Deliberate problem solving. Powerful but metabolically expensive. Fatigues quickly. Puzzle stories invite Focus but are short and bounded to prevent depletion.

**Making** — Fluent doing: repetition, rhythm, execution. Often experienced as flow. Sustainable for long periods. Recruited by Rhythmic Practice and by extended Lab sessions.

**Pattern Recognition** — *seeing*: noticing relationships and structure. Accompanied by the pleasure of insight. Recruited by Making — fluency makes patterns visible.

**Consolidation** — the quiet mode: daydreaming, reflection, sleep. Offline reorganization that stabilizes learning. Writing-to-remember across multiple sessions activates this.

**Design constraints imposed by cognitive modes:**
- No single activity demands prolonged uninterrupted Focus
- Every learning path supports fluid mode switching
- Practice is child-initiated and rhythmically structured (recruits Making, not executive control)
- Revisiting is spaced and voluntary (allows natural Consolidation)
- Maya recognizes when a mode is productive, when it is fatiguing, when to shift

*"Ability" failures are often mode mismatches. A child depleted from too much Focus can look as if she lacks talent. The Curious Woods treats mode-shifting as basic self-regulation.*

---

## The Journal

Every child has a journal where she can set goals, record ideas or experiences, and talk about the world with Maya. The journal is personal, private, and child-directed. No required entries.

---

## What Curious Woods Is Not

- Not a curriculum. Nothing is required, nothing is sequenced, nothing is graded.
- Not aligned with any educational standard.
- Not an assessment system. Maya does not score, rank, or report.
- Not a behavior-modification platform. No streaks, no badges, no leaderboards, no notifications designed to pull the child back.
- Not a substitute for human relationships. Maya is a partner for the child's learning mind — not a friend, not a parent, not a therapist.

Maya's goal is to help the child become the best possible instance of herself — regardless of background, language, or perceived gifts.
