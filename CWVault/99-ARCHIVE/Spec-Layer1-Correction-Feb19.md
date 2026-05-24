# Correction: Segment vs. Infinite Line Gesture

**Date:** February 19, 2026  
**Amends:** `20-SPECS/Spec-Layer1-Amendment-Feb19.md` (Change 3)  
**Status:** Ready to implement — small correction to tap-tap gesture behavior

---

## The Problem

The amendment incorrectly specified that tap-tap always creates an infinite line.
That was wrong. The correct behavior distinguishes between segments and infinite
lines based on where the second tap lands.

---

## Correct Gesture Behavior

### Tap-tap → Finite Segment (default, common case)

1. Tap point A → highlights (active)
2. Ghost line stretches from A toward cursor
3. Cursor approaches point B → B glows
4. Tap point B → **finite segment commits between A and B**

This is the standard case. Building triangle edges, polygon sides, construction
lines between specific points. Most of what a child does.

### Tap-pass-tap → Infinite Line (special case)

1. Tap point A → highlights (active)
2. Ghost line stretches from A toward cursor
3. Cursor approaches point B → B glows
4. **Cursor continues past B** → B remains highlighted (system has registered it
   as the second defining point)
5. Ghost line now previews as **infinite** — extending to canvas bounds in both
   directions through A and B
6. **Tap anywhere past B** → infinite line commits through A and B

The second tap past B is a commit gesture only — it does not create a new point.
The infinite line is defined by A and B. Where past B the child taps does not matter.

---

## Key Details

**B highlights as cursor passes through it** — this is the feedback that signals
"the system has registered B, you can keep going." Without this highlight the
gesture would be opaque.

**Ghost preview changes at the moment the cursor passes B** — before B, ghost shows
a finite segment from A to cursor. After passing B, ghost switches to showing the
infinite line through A and B. This makes the transition legible.

**Snap behavior near B** — as cursor approaches B, the ghost snaps to show the
segment A→B (as if the child were about to tap B). As cursor passes through and
beyond B, the snap releases and the ghost extends to infinite. Natural and readable.

**The tap-beyond does not create a point.** This is essential. The infinite line
is defined by two constructed points (A and B). No arbitrary point is introduced.
Euclidean correctness is maintained.

---

## State Machine Addition

Add a state between AWAITING_SECOND_TAP and committed:

```
IDLE
→ FIRST_TAP (tapped point A)
→ AWAITING_SECOND_TAP (ghost segment tracking cursor)
   → if cursor passes through existing point B without tapping:
      → INFINITE_LINE_MODE (B registered, ghost switches to infinite preview)
         → tap anywhere past B → infinite line through A and B commits
   → if cursor taps point B directly:
      → finite segment A→B commits
→ IDLE
```

---

## Summary of What Changes from the Amendment

Change 3 in the amendment said: "tap-tap creates an infinite line."
That was incorrect. The correct rule is:

- **Tap B directly → segment**
- **Pass through B then tap beyond → infinite line**

Everything else in the amendment stands as written.
