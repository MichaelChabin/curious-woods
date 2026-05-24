# Note: Cursor Vocabulary for Demonstration — March 8, 2026

**From:** Designer Chat
**To:** Layout Manager (primary), Coder (receives finished spec)
**Status:** Design principles established — visual development needed

---

## Purpose

This document is a brief for the Layout Manager to develop the cursor vocabulary used during demonstration playback. The Designer has established the principles and candidate forms. The Layout Manager's job is to develop them visually — trying shapes, transitions, and colors — and produce a finished spec the Coder can implement.

The Coder should not implement cursor behavior until the Layout Manager has delivered a spec. This is a visual design problem before it is an implementation problem.

---

## The Governing Principle

**A cursor communicates intent, not personality.**

The moment a cursor becomes a character it competes with the work. What we want is a cursor that is transparent enough to disappear when the child is focused, but expressive enough to teach when Maya is demonstrating.

The right lineage is puzzle and construction games — Myst, Machinarium, Monument Valley — where cursor shapes tell you what kind of interaction is possible, not how charming the designer is. No trails, sparkles, bouncing, or scaling up on click. These draw attention to the cursor itself. The cursor should point away from itself toward the work.

**Cute for its own sake is always wrong here.**

---

## The Vocabulary: What Needs to Be Communicated

There are four things the cursor needs to express:

**1. State of readiness** — cursor at rest versus cursor near something it can interact with. Approaching a point, the cursor reflects the snap state. This is ambient, always present, not specific to demonstration.

**2. Type of gesture** — tap versus drag. These are fundamentally different intentions:
- A tap is punctual: it lands and releases
- A drag is continuous: it commits and pulls
The cursor should communicate which is about to happen *before* it happens.

**3. Phase within a gesture** — a drag has a beginning (contact), a middle (pulling), and an end (release and snap). Each phase can have a distinct form.

**4. Consequence** — when an intersection is about to appear, when a region is about to close, something is imminent. A quiet signal, not a celebration.

---

## Candidate Forms — Starting Points for Layout Manager

These are starting points, not finished designs. The Layout Manager should try these and variants.

### At rest / approaching
A small filled circle in Payne's gray. Not an arrow, not a pointer. A circle is already the language of this tool — it echoes the geometry without imitating it. Size: small, approximately the same as a construction point.

On approach to a snappable point: the filled circle brightens slightly toward copper. The cursor and the geometry acknowledge each other.

### Tap
The filled circle lands — a brief pulse, then releases. Minimal. The landing is the event.

Avoid: growing on click (draws attention to cursor), color flash (too celebratory).

### Drag — initiation (moment of commitment)
The filled circle opens into a ring — the center empties. This is the moment of grabbing. The child has held long enough that the tool knows she's dragging not tapping.

### Drag — in motion
The ring elongates slightly in the direction of travel. Not an oval — more like the ring is being pulled. It has directionality without being a cartoon. The elongation is subtle: enough to read, not enough to distract.

### Drag — release (circle snaps into existence)
The ring closes back to a filled circle as the compass circle appears on canvas. Beginning and end rhyme. The cursor returns to its resting form at the moment the geometry arrives.

### Consequence imminent (intersection about to appear, region about to close)
A quiet brightening — the cursor shifts slightly toward copper, anticipating. Not an animation, just a state change. The child may not consciously notice it, but she'll absorb it over time.

---

## Color as a Second Layer

Shape communicates *what kind of act*. Color can communicate *what the act is for*:

- **Copper** `#BE622F` — acts that create something (new line, new circle, new fill)
- **Payne's gray** `#546A80` — acts that select or modify (choosing a color, tapping a fill to repaint)

The child doesn't need to consciously understand this distinction. She will absorb it through repeated experience and develop a felt sense that copper means making and gray means choosing. This is the same principle as the recipe lines in the palette — knowledge that seeps in rather than being taught.

---

## What to Avoid

- Trails or motion blur
- Sparkles or particle effects
- Bouncing or elastic behavior
- Scaling up on click
- Any behavior that draws attention to the cursor itself rather than the work

These are all game conventions that signal "this is entertainment." CW's cursor should signal "this is a tool."

---

## Connection to Demonstration Playback

The cursor vocabulary is most important at pause points in a demonstration — the moments where playback stops and the child processes what just happened. The cursor shape at a pause tells the child what kind of act just occurred before she fully reads it in the geometry.

Sequence at a pause point:
1. The act completes (line appears, circle snaps, intersection lights up)
2. The cursor settles into its resting form
3. Playback pauses
4. The child looks at what happened, then taps forward

The cursor's return to rest is part of the punctuation. It signals: this step is done. Take a moment.

See `Note-DemoPlayback-Mar8.md` for the full playback design.

---

## Connection to Maya

When Maya eventually demonstrates constructions live, she will use the same cursor vocabulary. A child who has learned to read the cursor forms from curated demos will already understand Maya's demonstrations. We are building a shared language, not a feature.

Design the cursor forms as if they will be used by an intelligence as well as a recording. Nothing about them should require human curation to be legible.

---

## Deliverable

The Layout Manager should produce:

1. **Visual designs** for each cursor state — resting, approaching, tap, drag initiation, drag in motion, drag release, consequence imminent
2. **Transition specs** — what changes, over how long, with what easing
3. **Color specs** — exact hex values for each state
4. **Size specs** — diameter at rest, elongation ratio during drag
5. **A note on anything that didn't work and why** — this is as useful as what did work

The Coder receives this spec and implements it. No back-and-forth between Layout Manager and Coder on visual decisions — those are resolved before implementation begins.

---

## Open Questions for Layout Manager to Resolve

- Is the filled circle the right resting form, or is something even simpler better?
- How much elongation during drag is readable without being distracting? Try several ratios.
- Does the copper/gray color distinction read clearly enough at small cursor sizes, or does it get lost?
- Should the cursor be visible during the child's own construction, or only during demonstrations? Arguments for both — try it both ways.
