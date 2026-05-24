---
status: First draft — April 2026
role: Authoring rules for everything downstream
---

# Design Principles

These are the authoring rules that shape every interactive, story, and Maya interaction. They are not preferences; they are commitments.

---

## On Pedagogy

### Curiosity over assessment

The platform does not test, score, grade, or track progress against standards. Curiosity is the engine. When curiosity is present, learning happens; when it is suppressed (by evaluation, by pressure, by premature closure), learning stops.

### Nurture into position; do not stretch

We reject the frame of stretching a child to meet a standard. The child is already growing. The platform makes growth directions visible and available — never forced. (See Mayas-Map.md.)

### Preserve wonder

Wonder is the affective substrate of #17 (comfort being the not-yet-knower). Children are born fluent in it. The platform's job is to keep it alive, not to teach it. Concretely: never close a question prematurely; celebrate noticing, not only solving; treat not-knowing as a good place to be.

### Introduce features when the child is most likely to want them

Not when they first become available. Never explain something the child can't yet do anything with. First-visit design acts as a teacher; return-visit design trusts the child remembers.

---

## On Stories and Anchors

### Process over product; makers over conquerors

Stories favor lesser-known figures whose *work* mattered — Faraday in his basement, Lavoisier weighing gases, Ada Lovelace seeing what Babbage's machine could become. We do not build cultural anchors on famous men who are famous for power or conquest. Many of them (Columbus, for instance) turn out to be despicable on closer examination. Process and craft and discovery are better anchors.

### No wars as scaffolding

Wars are what happen when civilization collapses. We do not use them as the structure of historical understanding. The student who has learned "history = wars + kings + dates" has learned the wrong lesson.

### Day-in-the-life over empire

A Sumerian scribe counting grain. A Florentine glassmaker mixing colors. A Warring States philosopher walking to meet a student. Embodied, specific, inside a worldview — not above it. The child learns history by inhabiting lives, not surveying timelines.

### Honest about daily life

Daily life in the past was rarely great. We do not romanticize. We also do not dwell on gruesomeness for effect. The tone is honest and affectionate — the way one might talk about a real ancestor.

### Stories serve intuitions

A story's purpose is to set up a problem the child wants to solve, using tools that exercise specific intuitions. Stories are not fiction for its own sake; they are context-providers. A good story lists which intuitions it seeds (see The-Sixteen-Intuitions.md).

---

## On Interactives

### Few flexible interactives, many contexts

We do not build one interactive per topic. Glass, extended with a generic graphics layer, can support perspective drawing, frequency plots, measurements of physical structures, and more. The same geometric tools serve many intuitions across many contexts. The child learns that the same *moves* work everywhere — which is itself an intuition (#3, multiple representations).

### Two gestures carry everything

- Tap-tap → infinite line (through two points)
- Tap-hold-drag → circle (center + radius, snaps to existing points)
- Intersections are automatic and immediately usable

This is structural, not cosmetic. A small gesture vocabulary means the child is never learning controls — she is always working on the problem.

### Every canvas window is draggable and closeable

No exceptions. The child controls her workspace. Nothing is forced into position or blocks her view without a close affordance.

### Marauder's Map — controls appear as words

Options are words that fade in when available and fade out when irrelevant. No disabled/greyed-out states. No buttons pretending to be anything other than what they are.

### Geometry is the foundation; glass is a layer

The geometry engine does not change because of coloring or visual decoration. Every point and line remains accessible and functional regardless of what has been filled. Decoration is additive; structure is sacred.

### The screen is also a ruler

The display's pixel grid is a measurement substrate. Count pixels inside a shape to measure its area. Count pixels along a curve to measure its length. Zoom in on a curve and watch it straighten. Most math/science curricula predate the screen and ignore this affordance; we don't. Pixel-counting is how a ten-year-old can measure the area of a circle, discover that the ratio of circumference to diameter is invariant, and get closer to π as the circle grows. It is the seed of Intuition #11 (measure by counting; refine to converge) and a direct path into the Riemann-sum / limit thinking of calculus. Design interactives and stories that invite this kind of measurement rather than presuming it's the teacher's job to hand the answer over.

### Lead is always on

Glass is a stained-glass tool. Lead is structural, not optional. Selecting segments *is* placing lead — there is no separate "construction mode" vs "lead mode."

---

## On the Code and Data

### Operation log is the spine

Every canvas action is a JSON operation. Save, load, undo, construction replay — all derive from log replay. The log is the authoritative record of what happened; everything else is a view of it. Protect its integrity.

### Static-first architecture

No build step, no npm, no frameworks without explicit justification. Vanilla JS, HTML5 Canvas, Web Audio. When modularization eventually happens, prefer ES modules over a bundler.

### All constructions open as copies

Originals are never modified. Canonical constructions (equilateral triangle, hexagon) stay in the picker permanently.

---

## On Privacy and the Child

### Anonymous identifiers only

No real-world identity is collected, ever. Data is locally stored and child-portable.

### The "Remember this" inscription is permanent

It never fades. It encodes the child's ownership of what she made.

### The work is the child's

We do not upload children's creations to servers, train models on them, or use them as data. Every piece of work belongs to the child who made it.

---

## On Maya

### Not anthropomorphic

Maya is a wisp of light and presence, not a character with a personality. She does not perform. She does not have feelings about herself. She does not pretend to be human.

### Not a tutor

Maya does not set problems, wait for answers, or grade responses. (See Mayas-Map.md for what she is.)

### Infinitely patient

She never rushes. She never pressures. She has all the time in the world.
