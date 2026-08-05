---
status: First draft — April 2026 (expanded April 23 with #11)
role: Foundational spine of the platform
---

# The Intuitions

*Originally drafted as Sixteen; now seventeen, with "Measure by counting; refine to converge" added April 23, 2026.*

## The Destination

A child raised with Curious Woods should be able to thrive in college. "Thrive" is operationalized as being able to engage successfully with MIT OpenCourseWare intro courses across disciplines — math, physics, computer science, engineering, literature, history, philosophy.

Thriving there does not require covering hundreds of curriculum topics. It requires a relatively small set of **intuitions and cultural fluencies** the child arrives with. Build those, and the courses become absorbable. Without them, no amount of content covers the gap.

This document names them.

## Two Halves

The list divides into two parts that differ in character:

- **Cognitive tools** — verbs. Mental equipment the child applies to problems.
- **Cultural fluencies** — stances. Ways the child is *at home* in unfamiliar territory.

Both are necessary. Neither substitutes for the other.

---

## Part I — Cognitive Tools

### 1. Numbers as geometry, geometry as numbers

Fluent translation between symbolic and spatial: a function is a curve, a curve is a function; an equation describes a locus.

**Evidence:** 18.01 opens with tangent lines as limits of secants. 18.02 is unintelligible without seeing vectors as arrows and surfaces as graphs. 8.01 derives kinematics by reading slopes off position graphs.

**Seeding:** Glass already does this — points, lines, intersections felt before named.

### 2. Functional thinking

A function is a rule that takes inputs to outputs. Relationships between varying quantities are themselves *objects* to be studied, composed, inverted.

**Evidence:** All of 18.01/18.02. 6.0001 introduces functions in lecture 4 and never lets go. 8.01 treats x(t), v(t), a(t) as a related family.

**Seeding:** "When this changes, what else changes, and how?" — verbal before symbolic.

### 3. Multiple representations of the same thing

The same idea expressed as table, graph, equation, picture, words — and the ability to move between them.

**Evidence:** 18.06 demands matrices be seen simultaneously as transformations, systems of equations, and column spaces. 6.006 expects a problem stated in English, modeled as a graph, coded as an algorithm.

**Seeding:** Show the same pattern in three skins early and often.

### 4. Multi-step problems and patience with them

Comfort holding a problem in mind across many sub-steps without panic; trust that the path will reveal itself.

**Evidence:** 18.02 problem sets routinely require 6–10 sequential moves. 8.01 mechanics problems chain free-body diagram → equations → algebra → numerical answer.

**Seeding:** Long constructions (hexagon-from-circle) train this without naming it.

### 5. Approximation and order-of-magnitude sense

Knowing roughly how big an answer should be; sensing when a result is wrong by orders of magnitude.

**Evidence:** 8.01 lectures repeatedly check answers via dimensional reasoning. 6.006 algorithm analysis is entirely about big-picture growth, not exact counts.

**Seeding:** "About how many? About how big?" as a habitual question.

### 6. Variables as placeholders, not mysteries

A letter stands for a quantity whose value may be known later, unknown, or varying — and that's fine.

**Evidence:** Every math and physics course. 6.0001 spends real time on the assignment-vs-equation distinction.

**Seeding:** Naming things the child is keeping track of (in code, in stories) before formal algebra.

### 7. Decomposition

Breaking a large unfamiliar thing into smaller familiar pieces.

**Evidence:** 6.0001 and 6.006 are essentially courses in this. 2.001 free-body diagrams are decomposition made visible.

**Seeding:** "What's the smallest piece of this you already know how to do?"

### 8. Iteration and recursion as natural moves

Doing a thing over and over with small changes; defining something in terms of itself.

**Evidence:** 6.0001 introduces loops in week 2 and recursion in week 4. 18.01 limits are iterative in spirit.

**Seeding:** Construction replay, repeated patterns, nested stories.

### 9. Proof and "why is this true" — one reflex, two registers

The instinct that a claim needs a reason, and that reasons can chain. Proof is the limiting case of evidence-based reasoning, where the evidence is so constraining that the posterior collapses to 0 or 1. Evidence-weighing is the general case; proof is the tangent to which secants converge.

**Evidence:** 18.06 expects students to follow proofs from day one. 24.00 is structurally an argument-evaluation course.

**Seeding:** "How do you know?" treated as a friendly question, not an interrogation. Evidence reasoning can start at 4; formal proof emerges later as the tight limiting case.

### 10. Modeling and simulation

Building a simplified, runnable version of something to reason about it. Choosing what to include and what to ignore. Running it forward to see what happens; adjusting when predictions miss.

**Evidence:** 8.01 free-body diagrams and Newton's laws as dynamical models. 6.006 pseudocode as a model of computation. 18.02 vector fields as flow models. 2.001 mechanics modeling.

**Seeding:** Interactives that let children *build* small simulations — not just watch them. Stories where characters reason with models ("if the dam holds X, then Y happens"). Modeling is where #2, #3, and #7 come together as an active verb.

### 11. Measure by counting; refine to converge

Continuous things can be measured by counting small enough discrete pieces. Making the pieces smaller makes the answer more exact. This is the Riemann-sum intuition — and the limit concept more generally — the foundation of integral calculus and every numerical method.

Distinct from #5 (approximation): #5 is *roughly right*; #11 is *exactly right in the limit through systematic refinement*.

**Evidence:** 18.01 opens with tangent as the limit of secants; integration is the limit of Riemann sums. 8.01 uses discrete timesteps to model continuous motion. 6.006 complexity analysis converges to exact growth rates. 2.001 finite-element thinking. Every numerical method across every science course.

**Seeding:** Counting pixels is the ur-example — the screen is a measurement substrate the child can use directly. Measure a circle's area by counting the pixels inside. Measure the pixels along its edge. Find that the ratio is invariant across sizes and gets closer to π as the circle grows. Zoom into a curve and watch it straighten — the Euclidean-on-small-scales insight that underlies differential geometry. See Design-Principles.md: *The screen is also a ruler.*

---

## Part II — Cultural Fluencies

### 12. Comfort with dense unfamiliar text

Willingness to sit with a paragraph that doesn't immediately yield, and trust that re-reading works.

**Evidence:** 21L.001 assigns Homer, Augustine, Dante in week one. 24.00 throws Plato at undergrads cold.

**Seeding:** Stories that reward second readings; never pre-chewing meaning.

### 13. Sense of historical sweep

Intuitive feel for "long ago," "before that," "elsewhere at the same time" — not dates, but a mental landscape of eras.

**Evidence:** 21H.007J presumes students can place Rome relative to Han China without prompting.

**Seeding:** Day-in-the-life anchors (a Sumerian scribe, a Florentine glassmaker) over kings-and-battles timelines.

### 14. Awareness that civilizations think differently

Knowing that what feels obvious is local; other coherent worldviews exist and once felt obvious to their holders.

**Evidence:** Any humanities intro that ranges across cultures — Warring States philosophy, medieval theology, Enlightenment science.

**Seeding:** Stories from multiple traditions told from inside, not compared from outside. The "what would Chen do? what would Marcus do?" pattern.

### 15. Holding a worldview without judging it (yet)

The ability to inhabit an idea long enough to understand it before evaluating.

**Evidence:** 24.00 explicitly demands this. Literature courses presume it.

**Seeding:** "What would have to be true for this to make sense?" as a story prompt.

### 16. Process over product, makers over conquerors

Knowing that things were *figured out* by people working — Faraday in his basement, Lavoisier weighing gases, Ada Lovelace seeing what Babbage's machine could become.

**Evidence:** Implicit across science courses, which presume students don't think knowledge fell from the sky.

**Seeding:** This is also the platform's authoring stance (see Design-Principles.md) — the intuition and the constraint are the same commitment, doing double duty.

### 17. Comfort being the not-yet-knower

Equanimity when surrounded by things you don't understand; trust that comprehension comes with time.

Wonder *is* comfortable not-yet-knowing — the positive emotional valence around incomplete understanding. Children are born fluent in it; assessment-driven schooling is what erodes it. The platform's job on #16 is not instructive but **preservative**: don't kill what's already there; feed it.

**Evidence:** Every MIT intro course assumes this. The students who struggle most are the ones who lack it.

**Seeding:** This is the meta-fluency. It underlies every other item on the list. See Mayas-Map.md for how Maya holds this role as protector of wonder.

---

## Part III — Added August 2026

*The four questions held open in the earlier intuition notes — making, computational
thinking, attention, collaboration — were answered yes on 5 August 2026. They append as
18–21 rather than being slotted in by theme, because seed facets in `03-SEEDS/` reference
intuitions by number and renumbering would orphan them. Theme is what the two-part
division above is for; number is only an address.*

### 18. Making things well — craft, and grace as a function

Caring how a made thing looks and reads, and knowing that this is not decoration. A thing
made with grace gets attended to; a thing made carelessly gets set down. This applies to a
stained-glass window, a diagram, a proof, and a paper.

Michael, 5 August: *professional papers that lack grace don't get read.* That is the whole
argument, and it is why this is a competence rather than a courtesy. The child who learns
that her work has an audience — and that the audience is under no obligation — has learned
something most undergraduates have not.

Distinct from #16, which is a stance toward *other people's* making: knowing that things
were figured out by people working. #18 is her own hands.

**Evidence:** 21W writing courses exist because MIT found that engineers who cannot write
are less useful engineers. 18.06 and 18.100 both grade proofs partly on clarity — an
unreadable correct proof is marked down, and the reason given is that a proof is an
argument addressed to a reader. Design and lab courses assess presentation directly.

**Seeding:** every lab ends in something she would show someone. The artifact is the
point, not the residue. Glass windows, coloured walks, her own stripe of just-perceivable
steps. Nothing in the platform should produce output that is only evidence she did the
activity.

### 19. Encoding a procedure so something else can run it

Writing down a multi-step action precisely enough that a machine, or another person,
executes it without you there. The externalising is the intuition — not the loop, not the
branch, but the discovery that a procedure is *a thing that can be written down and
handed over*.

Distinct from #7 and #8, which are about performing decomposition and iteration in your
own head. This is about getting the procedure out of your head intact, which is harder and
is where the errors live.

**Evidence:** 6.0001 and 6.006 are essentially courses in this. But it reaches much
further — a lab protocol, a proof written for a reader, and a construction script are the
same move.

**Seeding:** a small language — a subset of Python, or something smaller still — that the
child uses to encode actions in the labs. This converges with something already specified
for a different reason: `Plan-Plane-Extraction.md` notes that a script is an operation log
written by an author rather than a child, replayed with timing, and that `zoom to 3` must
mean the same thing in every lab for a script to be portable. **The scripting system and
the child's small language are the same object approached from two ends.** Whoever builds
either should know that.

### 20. Attention — sustained, deliberate noticing

The capacity to hold attention on one thing long enough for it to yield, and to notice
small differences that a glance would miss.

**Structurally this is a substrate, not a sibling** — the same double role #17 plays, and
for the same reason. None of the other twenty develops in a child who cannot stay with
something. Listed as an item because it can be worked on directly, which the flat list
makes possible; see the open question below about whether the list eventually wants a
foundational tier.

**Evidence:** every course assumes it and none teaches it. The failure mode it produces —
bouncing off dense material after one pass — is the same failure #12 describes from the
other side.

**Seeding:** already latent across the platform and worth making explicit. Rhythmic
practice is an attention exercise. So is the colour just-noticeable-difference instrument:
a child who taps the moment she can see a change has been attending closely for a
sustained stretch, and her stripe is the record of it. Long constructions do the same work
for a different flavour of attention. What none of these should do is *announce* that
attention is being trained.

### 21. Collaboration — working with someone on a hard problem

Doing difficult work with another person: dividing it, disagreeing usefully, and building
on something you did not think of.

**Evidence:** MIT problem sets are collaborative by design and explicitly permitted to be.
Lab courses are structurally two-person or larger. The graduate pipeline is entirely
collaborative.

**Seeding: this is the honest gap.** The other twenty can be seeded by a child alone with
a screen. This one cannot, and no amount of good design inside a single-player web
platform will produce it. Michael, 5 August: *collaboration is hard.* Recorded as a real
intuition anyway, because leaving it off the list would mean pretending the platform is
complete when it is not.

Candidate directions, none decided: shareable artifacts that invite a response rather than
applause (which is #18 doing double duty); a child and an adult at the same screen; two
children, asynchronously, working the same construction. See also `Mayas-Map.md` — Maya's
discipline is to point the child outward, and this is the intuition that discipline exists
to serve.

---

## Open Questions

These are live and worth holding, not urgent:

1. **#16 plays two roles.** It's a competence the child develops *and* the platform's authoring rule. That's a feature, not a bug — the intuition and the stance reinforce each other — but it's worth being explicit about when referenced.

2. **#17 is sibling and substrate simultaneously.** Listed alongside the others for clarity, but structurally it underlies all of them. Treated as the meta-fluency in Maya's Map.

3. **Balance (11 cognitive / 6 cultural).** Appropriate for an MIT-OCW-readiness frame (science-heavy). If the platform's destination ever broadens, the cultural half has room to grow. For now, each cultural item is load-bearing.

---

## What This Document Is For

This list is the **spine**. Everything downstream references it:

- **Interactives** serve specific intuitions. Any spec should name which.
- **Stories** set up problems that exercise intuitions. A story should name which.
- **Maya** navigates the child toward any nearby intuition node. See Mayas-Map.md.
- **Current status** measures progress as *which intuitions are being exercised, how well*.

The list will be revised as evidence accumulates. It is a first draft, not a fixed standard.
