# Note: Demo Playback Design — March 8, 2026

**From:** Designer Chat
**To:** Coder, Layout Manager, Project Manager
**Status:** Design complete — implementation pending

---

## What This Is

The demonstration system is how a child learns what the tool can make before she has made anything herself. It is also the foundation for how Maya will eventually demonstrate constructions live. Getting this right matters beyond the demo — it establishes the vocabulary of instruction for the entire platform.

---

## The Core Mechanic: Tap Forward and Back

Demonstrations do not play automatically at a fixed speed. The child controls them.

The operation log already records every construction step. Playback walks that log — forward one significant step at a time, waiting after each step for the child to tap to continue. The child can also tap backward to revisit a previous step.

**This is not video. It is navigation.**

A child who taps forward quickly has seen enough. A child who steps back three times to watch an intersection appear is telling you exactly where her curiosity lives. Both are valid. Neither is wrong. The system makes no judgment.

### What "significant step" means

Steps are not defined by operation — they are defined by consequence. A step is a moment where something new becomes visible that wasn't visible before:

- First line appears — *this is what tap-tap makes*
- First circle appears — *this is what drag makes*
- First intersection lights up — *this is what happens automatically*
- A region closes and fills — *this is where it goes*

Intermediate operations that don't produce visible consequences — a third line that extends a construction without creating a new intersection — happen fluidly without pausing. The demo breathes only where it matters.

### Pause point format in the operation log

Significant steps are marked in the operation log with a flag:

```json
{ "op": "line", "pause": true, "pauseNote": "first line" }
```

The `pauseNote` is for the curator's reference, not displayed to the child. Playback pauses after any operation marked `pause: true` and waits for a tap.

---

## Who Defines the Pause Points

The person who records a construction — Eileen initially — is also deciding where it breathes. This is a curatorial decision, not an algorithmic one. A human who has watched children use this tool knows where the moments of surprise are. The pause points are that knowledge made explicit.

The Coder should build the flag into the log format now. Eileen decides where the flags go when she records.

---

## Dwell Time as Signal

How a child navigates a demo is behavioral data worth capturing:

- Did she tap forward only, or did she move back?
- Which step did she return to, and how many times?
- How long did she pause at each step before tapping forward?

This is richer than knowing she watched the demo at all. A child who backs up to watch an intersection appear three times is showing you where her curiosity lives. Maya will eventually read this and respond to it.

The session hooks (see Note-Demo-Testing-Mar8.md) should capture per-step navigation, not just demo-watched: true.

---

## Relationship to the Constructions Panel

The demo playback system serves the "show me" path in the Constructions panel. When a child taps "show me" on a construction thumbnail:

1. Canvas clears or dims existing work
2. The construction's operation log begins playing
3. A quiet word appears in the panel: "watching" with a small "stop" nearby
4. Child taps forward and back through significant steps
5. When the construction is complete, the panel offers: "try it" — which loads the ghost overlay for the child to construct toward

The ghost overlay and show-me playback are two phases of the same experience, not separate features.

---

## Relationship to Maya

The curated demos we are building now are pre-recorded answers to a question we are guessing at. Maya's future demonstrations will be live answers to questions she can infer from watching a specific child.

The cursor vocabulary and step-by-step pacing we are designing now must work for both cases. The same visual language that makes a curated demo readable will make Maya's live demonstration readable. We are not building two systems — we are building one system that will eventually be driven by intelligence rather than recording.

Design for the curated case first. Keep the generative case in mind so we don't paint ourselves into a corner.

---

## Cursor Design — See Companion Document

The cursor vocabulary for demonstration is a separate design problem handled by the Layout Manager. See `Note-CursorVocabulary-Mar8.md` for the full brief.

The connection point: pause steps in playback are where the cursor forms are most important. The cursor shape at a pause tells the child what just happened before she reads it in the geometry.

---

## Open Questions

- Should the canvas clear before a demo plays, or should existing work remain visible? Clearing is cleaner; keeping existing work lets the child compare. Probably clearing is right for first demo, with an option to overlay later.
- What does "stop" do mid-playback — does it leave the partial construction on canvas, or clear it?
- Should completed demos be replayable from the panel, or only from the chooser?
