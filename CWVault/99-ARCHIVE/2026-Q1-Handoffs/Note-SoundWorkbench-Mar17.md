# Note: Sound Workbench — March 17, 2026

**For:** Prototyper, Designer, Coder
**Built:** Prototyper session, March 17
**File:** `/Users/michaelchabin/CuriousWoods/prototypes/proto-sound-workbench.html`

---

## What It Is

A three-panel interactive workbench for designing the sound vocabulary of the
geometry tool. Everything is synthesized via Web Audio API — no audio files.
Has an export button that copies a complete JSON spec to the clipboard, in the
format the geometry tool will eventually consume.

Michael's note: *"The sound workbench is a story all by itself."* It is
complete enough to be used as a real design tool, not just a prototype.

---

## Panel 1 — Gesture Sounds

Draw on a canvas with the mouse. The workbench automatically classifies the
gesture (tap, line drag, or circle) and plays a synthesized sound.

Controls per gesture type:
- Waveform: sine / triangle / square / sawtooth
- Base pitch (Hz)
- Pitch contour: flat / rise / fall / arch
- Contour amount (semitones)
- Attack (ms), Release (ms), Volume

---

## Panel 2 — Feedback Sounds

Four named feedback events: **snap**, **tap**, **release**, **consequence**.
Click any to hear it and select it for editing.

Controls per event:
- Pitch (Hz), Duration (ms)
- Waveform, Attack (ms), Release (ms), Volume
- Overtone mix (adds 2nd partial at 2× frequency)
- Detune (cents)

**Design intent for consequence:** The snap/tap/release events should feel
clean and confirmatory. Consequence imminent should feel slightly unsettled —
overtone mix and detune are the levers for this. The default settings
deliberately use both to create contrast with the other events.

---

## Panel 3 — Pitch & Ratios

A one-octave keyboard (A to A, 13 keys). Click two keys to see the interval:
name, frequency ratio, and Hz values. Three tuning systems: equal temperament,
just intonation, Pythagorean. Root pitch slider (A = anything). "Play both
together" button. Waveform and sustain controls.

This panel is directly relevant to the music/physics story arc and to
Michael's interest in the mathematical structure of tuning systems.

---

## Export Format

The footer "Copy JSON" button exports the full spec:

```json
{
  "version": 1,
  "gesture": {
    "wave", "pitch", "contour", "contourAmt", "attackMs", "releaseMs", "vol"
  },
  "feedback": {
    "snap":        { "wave", "pitchHz", "durationMs", "attackMs", "releaseMs", "vol", "overtone", "detuneCents" },
    "tap":         { ... },
    "release":     { ... },
    "consequence": { ... }
  },
  "pitch": {
    "tuning", "rootHz", "wave", "sustainMs", "vol"
  }
}
```

This is the format the geometry tool's sound engine should consume.

---

## Open Questions

1. **Gesture detection** — the current classifier uses aspect ratio and path
   closure. Works well for clear gestures; may misclassify ambiguous ones.
   Good enough for design exploration; revisit before wiring to geometry tool.

2. **Live preview** — currently the gesture sound plays on mouseup. A live
   sound (pitch shifting as you draw) would be more expressive. Discussed in
   the Mar17 session but not built.

3. **Integration** — the sound workbench has not been connected to the
   geometry tool. That work belongs to the Coder once sound design decisions
   are made using the workbench.

---

## Server Setup

```bash
cd /Users/michaelchabin/CuriousWoods
python3 -m http.server 8000
```

Then open: `http://localhost:8000/prototypes/proto-sound-workbench.html`
