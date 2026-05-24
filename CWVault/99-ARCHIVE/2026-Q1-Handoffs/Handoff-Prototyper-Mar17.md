# Prototyper Session Handoff — March 17, 2026

**From:** Prototyper Chat (this session)
**Continues:** Handoff-Prototyper-Mar16-session2.md

---

## What We Built This Session

### 1. Cursor Modes Prototype
**File:** `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-modes.html`
**URL:** `http://localhost:8000/prototypes/proto-cursor-modes.html`

A fresh standalone prototype (not iterating on proto-cursor-mar16) exploring
four cursor modes selectable by button bar. The scene contains 7 points and
7 segments, including two closely-spaced points (~12px apart) placed
deliberately to motivate the magnifier modes.

**Five modes implemented:**

| Button | Behavior |
|--------|----------|
| arrow | Native system cursor, no custom behavior |
| crosshair | Static near-black crosshair+circle, no proximity transitions |
| arrow → crosshair | Native arrow; transforms to crosshair within 36px of a point or 14px of a segment; click commits action and returns to arrow |
| magnifier crosshair | 68px radius lens, 5× zoom, crosshair at center; 1:1 mouse does NOT hold — mouse movement is amplified |
| precision magnifier | 36px diameter (2× normal crosshair), arms reach to lens edge, no inscribing circle; magnified fill inside; **1:1 mouse movement**; slider controls zoom 2×–12× |

**Key design insight from session:** The large magnifier amplifies hand
movement, fighting itself. The precision magnifier solves this: zoom is
only for *reading*, not for navigating. Mouse stays 1:1.

**Commit semantics (Mode 3 — arrow→crosshair):**
Clicking a point commits an action (start/terminate a line, complete a
circle). Clicking a segment selects it. After commit, cursor returns to
arrow. The crosshair is precision mode; the arrow is navigation mode.

---

### 2. Sound Workbench
**File:** `/Users/michaelchabin/CuriousWoods/prototypes/proto-sound-workbench.html`
**URL:** `http://localhost:8000/prototypes/proto-sound-workbench.html`

Three-panel workbench, all synthesized via Web Audio API, exports JSON.

**Panel 1 — Gesture sounds**
Draw on a canvas with the mouse. Tap, line drag, or circle gesture is
detected automatically and plays a sound. Controls: waveform (sine /
triangle / square / sawtooth), base pitch, pitch contour (flat / rise /
fall / arch), contour amount in semitones, attack ms, release ms, volume.

**Panel 2 — Feedback sounds**
Four event buttons: snap, tap, release, consequence. Click to hear and
select for editing. Each event has independent settings: pitch, duration,
waveform, attack, release, overtone mix (adds 2nd partial at 2× freq),
detune in cents. Default consequence sound has detune + overtone mix for
a slightly unsettled quality — intentional contrast with clean snap/tap.

**Panel 3 — Pitch & ratios**
One-octave keyboard (A to A, 13 keys). Click two keys to see the
interval: name, frequency ratio, and Hz values. Three tuning systems:
equal temperament, just intonation, Pythagorean. Root pitch slider (A=
anything). "Play both together" button. Waveform and sustain controls.

**Export:** Footer button copies full JSON spec to clipboard. Format:
```json
{
  "version": 1,
  "gesture": { "wave", "pitch", "contour", "contourAmt", "attackMs", "releaseMs", "vol" },
  "feedback": {
    "snap":        { "wave", "pitchHz", "durationMs", "attackMs", "releaseMs", "vol", "overtone", "detuneCents" },
    "tap":         { ... },
    "release":     { ... },
    "consequence": { ... }
  },
  "pitch": { "tuning", "rootHz", "wave", "sustainMs", "vol" }
}
```
This is the format the geometry tool will eventually consume.

---

## Also Updated This Session

**proto-cursor-mar16.html** received several refinements early in the
session before we pivoted to the fresh cursor-modes prototype:
- Circle stroke width: 0.75 → 1.5px
- Mousedown collapses crosshair to filled 3px dot; stretches into oval
  as drag exceeds 6px threshold
- Tap ring decoupled from cursor: now drawn at the point's fixed coords
  (drawTapRing), so cursor snaps back to crosshair instantly on mouseup
  with no delay

---

## Design Decisions Made This Session

**Cursor vocabulary is about affordance, not aesthetics.** The core
question is: does the cursor shape tell the child what they can do right
now, before they do anything? Each cursor state = a different action
context.

**The magnifier dilemma:** A large magnifier amplifies hand movement,
which fights the precision goal. The precision magnifier solves this by
keeping mouse 1:1 and using zoom only for visual reading. The right zoom
level is an open question — the slider (2×–12×) is there to find it
empirically.

**Sound: consequence should feel different.** The other feedback events
(snap, tap, release) should feel clean and confirmatory. Consequence
imminent should feel slightly unsettled — overtone mix and detune are
the levers. How much contrast is enough vs. too much is an open question.

---

## Open Questions / Next Steps

1. **Cursor mode 3 threshold** — does 36px feel right for the
   arrow→crosshair transition distance? May need tuning against real
   construction density.

2. **Precision magnifier zoom** — Michael wants to play with the slider
   to find the useful range. No design decision yet.

3. **Cursor vocabulary sheet** — a static layout showing all states side
   by side was discussed but not built. Still potentially useful for
   presenting to Eileen.

4. **Line/segment hover state** — still no design decision on what the
   cursor does when hovering over a line (not a point). Probably Payne's
   gray crosshair but needs a decision before spec is written.

5. **Sound workbench: gesture detection** — the current detector is
   simple (aspect ratio + closure). It works for obvious gestures but
   may misclassify ambiguous ones. Good enough for exploration; revisit
   before wiring to geometry tool.

6. **Sound workbench: live preview** — currently you have to release the
   mouse before the gesture sound plays. A live sound (pitch changes as
   you draw) would be more expressive. Discussed but not built.

7. **Cursor spec document** — still not written. Blocked on line/segment
   hover decision. Once that's resolved, the spec can be completed and
   handed to Coder.

---

## File Locations

| Item | Path |
|------|------|
| Cursor modes prototype | `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-modes.html` |
| Sound workbench | `/Users/michaelchabin/CuriousWoods/prototypes/proto-sound-workbench.html` |
| Cursor vocabulary prototype (older) | `/Users/michaelchabin/CuriousWoods/prototypes/proto-cursor-mar16.html` |
| Geometry tool | `/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html` |
| Vault active | `/Users/michaelchabin/CuriousWoods/CuriousWoods/01-ACTIVE/` |

---

## Server Setup

```bash
cd /Users/michaelchabin/CuriousWoods
python3 -m http.server 8000
```

Hard reload: Cmd+Shift+R
