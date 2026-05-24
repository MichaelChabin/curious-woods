# Road to Demo — March 8, 2026

**Purpose:** A dependency map for the Glass demo release. Not a locked plan — a record of what requires what, so work happens in the right order and no one wastes effort. Update this as decisions land.

**Target:** External testers using Glass within the next few days.
**Last updated:** March 16, 2026 by Project Manager

---

## The Critical Path

These steps must happen in this order. Each one unblocks the next.

```
1. Operation log schema stable
        ↓
2. Save as Construction (JSON download) working
        ↓
3. Eileen records 3–5 curated constructions
        ↓
4. "Show me" playback testable with real content
        ↓
5. Demo goes out
```

**Why this order matters:**
If Eileen records constructions before Save as Construction is working, the format may change and her work is lost. If "show me" is built before curated constructions exist, it can only be tested with synthetic data. Get the format stable first, then the save, then the human work.

**Current state of step 1:** ✅ Confirmed stable as of March 16. `pause: true` flag added to schema for curatorial pause points.
**Current state of step 2:** In progress — new Coder has the handoff (Handoff-Coder-Mar16.md).
**Current state of steps 3–5:** Pending.

---

## Full Dependency Map

### Things that must be done before demo

**A. Constructions panel** ← replaces Drawing Guide
- Requires: models JSON (construction library schema)
- Requires: at least 3 curated operation logs (for "show me")
- Requires: SVG files for those same constructions (for thumbnails and ghost overlay)
- Produces: working try-it and show-me
- **March 16 update:** Playback is child-controlled navigation (tap forward/back), not timed auto-play. "Show me" and "try it" are a sequence, not parallel options. Pause points set by curator via `pause: true` flag in log. See Handoff-Coder-Mar16.md.

**B. Save as Construction**
- Requires: operation log schema stable (✅ essentially done)
- Produces: downloadable JSON of a construction session
- Unblocks: Eileen recording curated constructions

**C. Ghost overlay ("try it")**
- Requires: SVG file for the construction
- Requires: pointer-events:none rendering on canvas (Coder confirms straightforward)
- No human dependency

**D. How-to note**
- Requires: nothing — standalone UI component
- Should be built before demo so first-time experience is complete

**E. Session data hooks**
- Requires: named action functions (action layer — already planned)
- Requires: session object in memory
- No blocking dependencies

**F. Exit survey**
- Requires: session data hooks (to populate the data summary card)
- Requires: a receiver endpoint — Airtable or Google Form (Michael sets this up)
- Requires: Save as Image working end-to-end (so "saved as image" hook fires correctly)

**G. Save as Image**
- Currently implemented for straight-line fills
- Needs verification that arc-bounded fills export correctly
- Needs artist statement panel (quiet overlay after save — title + brief statement, both optional)

**H. Eileen records curated constructions**
- Requires: Save as Construction working (B)
- Requires: Eileen has time and knows the format
- Produces: 3–5 operation log JSON files for the starter library
- Suggested starter set: equilateral triangle, hexagon, nested squares
- These should be beautiful constructions, fully colored, with lead if it looks good

---

## Things That Are Not Blocking But Will Be Asked About

### Sound
Construction gestures make sounds. Testers in a café or with others nearby will be surprised. Is there a mute? There should be, even if it's just a quiet word in the Tools menu. Not blocking demo but worth doing before it goes out.

### Accidental new construction
Double-tap empty canvas confirms new construction. Single-tap empty canvas is undo. These are adjacent gestures. A tester will almost certainly trigger new construction accidentally and lose work. The confirmation dialog is already there — make sure it's clear enough that the tester knows what happened and can cancel.

### Session continuity
Testers will ask: "Can I come back to this?" The honest answer for the demo is no — everything lives in the browser session. This should be acknowledged somewhere, perhaps in the how-to note or the exit survey intro. Don't let it be a surprise.

### "It doesn't look like a kids' app"
This will come up. The response is intentional — CW treats children as intelligent people, not as targets for primary colors and cartoon fonts. Having a brief, confident answer ready matters. Michael should decide whether to address this proactively in a brief framing note on the demo page, or let the work speak for itself and respond when asked.

---

## Things We Haven't Fully Thought About Yet

### What testers will try to do that we haven't designed for
- Pinch-zoom on iPad — does it interfere with the canvas? Unknown until tested on device.
- Rotate gesture on iPad — same question.
- Very long sessions — does performance degrade as the operation log grows?
- Two people using it at once on the same device (a parent and child together) — not designed for, but will happen.

### Accessibility
Not urgent for first demo, but someone will ask. At minimum: can it be used with a keyboard? Almost certainly not currently. Worth knowing the answer before being asked.

### The framing page
The demo probably needs a brief landing page before the tool — one screen that says what this is and sets expectations. Without it, testers arrive cold. Even three sentences and the CW visual language would be enough. This is quick to build but easy to forget.

---

## Eileen's Role — Specific Notes

Eileen is the likely first curator of the construction library. Before she records:
- Save as Construction must be working and tested
- She needs to know: open the tool, build a construction, color it, then use Save → As Construction
- The saved file goes to Downloads and needs to be named clearly (e.g., `hexagon-colored.json`)
- She should build each construction twice — once plain, once fully colored — so we have both versions
- The format she produces becomes the canonical example for future curators

Coordinate with her only after step B is confirmed complete.

---

## Open Decisions Needed Before Demo

| Decision | Who | Status |
|----------|-----|--------|
| Airtable vs Google Form as survey receiver | Michael | **Open — needed before demo** |
| Rating scale visual design (stars vs word scale) | Designer | Open |
| Whether full operation log is included in share | Designer/Michael | ✅ Resolved — opt-in separately |
| Framing page: yes or no, what it says | Michael | **Open — needed before demo** |
| Mute control: where and what it looks like | Designer | ✅ Resolved — permission ask before first sound + mute toggle in Tools |
| Starter set of 3 constructions for Constructions panel | Michael + Eileen | ✅ Resolved — equilateral triangle, hexagon, nested squares |
| Playback style | Designer | ✅ Resolved — child-controlled navigation, not timed auto-play |

---

## When This Document Should Be Updated

- When Save as Construction is confirmed working → note it here, signal Eileen
- When Eileen completes recordings → note files and locations
- When each blocking item above is resolved → mark it done
- After demo goes out → add a section: What We Learned

