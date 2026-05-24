# Next 3 Priorities

**Last Updated:** March 16, 2026 by Project Manager

---

## Priority 1: Demo-Ready Glass

**What:** Get geometry-v1.html to a state where external testers can use it meaningfully.

**Why Now:** Construction and coloring are substantially complete. The remaining pieces are the Constructions panel playback system, how-to note, and demo/testing infrastructure. All designed; Coder has the handoff.

**What Remains (in order per Handoff-Coder-Mar16.md):**
1. Constructions panel playback — child-controlled navigation, pause flags, show-me→try-it sequence
2. Save as Construction — PNG capture, note UI, localStorage
3. Dwell time tracking for session data
4. Touch magnifier (offset crosshairs for iPad/touch)
5. How-to note — collapsible, open on launch, "watch it build ▸" in copper

**Also needed before demo (Michael's tasks):**
- Choose survey receiver: Airtable or Google Form
- Set up endpoint and provide URL to Coder
- Decide on framing page (yes/no, what it says)

**Eileen's task (unblocked when Save as Construction is confirmed working):**
- Record 3–5 curated constructions: equilateral triangle, hexagon, nested squares
- Each construction built twice — plain and fully colored
- See Road-to-Demo-Mar8.md for full Eileen instructions

**Done When:** A child can open the page, understand what to do without instruction, build and color something, watch a construction demo, and leave with a sense of accomplishment. Testers can share session data. Michael can read it.

---

## Priority 2: Models JSON + Construction Library

**What:** A companion JSON file for the models folder describing each construction: display name, SVG path, operation log path, description, and which contexts it appears as a default.

**Why Now:** After demo. The Constructions panel currently hardcodes the three defaults. The JSON makes it context-sensitive without code changes when new interactives arrive.

**Schema:**
```json
{
  "constructions": [
    {
      "id": "equilateral_triangle",
      "name": "Equilateral Triangle",
      "svg": "models/geo_triangle_equilateral.svg",
      "log": "models/logs/geo_triangle_equilateral.json",
      "description": "Three equal sides, three equal angles",
      "defaultIn": ["glass", "euclid"]
    }
  ]
}
```

**Done When:** Constructions panel reads from JSON. Adding a new construction is two files (SVG + log) plus one JSON entry.

---

## Priority 3: Cursor Vocabulary

**What:** The Layout Manager is developing the cursor vocabulary spec (Note-CursorVocabulary-Mar8.md). Once the spec is delivered, the Coder implements it using the hooks already stubbed in the playback code.

**Why Now:** After demo. The cursor is the last major visual design element before Maya integration becomes meaningful. The touch magnifier (offset crosshairs) is already in Priority 1 as the one exception that can't wait.

**Done When:** Cursor states are fully implemented and consistent with Layout Manager spec. Tool feels alive and responsive to gesture intent.

---

## Someday/Maybe

- Maya integration (Layer 2) — blocked until Glass demo is stable
- Second interactive (Tiles) — decide single app vs. multiple apps when Glass is done
- Exit survey full implementation — designed in Note-Demo-Testing-Mar8.md, not yet built
- Backlighting / transmitted light simulation
- Story system — Montparnasse pages, second story, Page 3 WHEN template
- Coordinate Plane interactive — specced, deferred
- Electron wrapping — deferred deliberately
- Object-oriented refactor (cursor, palette, operation log) — direction to build toward
- Scale Beam Tool — spec complete (20-SPECS/Scale-Beam-Tool.md), needs Designer pass then Coder integration as reusable engine component
- Reference Atlas — human timeline complete (00-FOUNDATION/reference-atlas/timeline-human.md); siblings planned: timeline-deep.md, temperature.md, size.md

---

**Rules:**
1. ONLY 3 priorities — if you want to add a 4th, something drops to Someday/Maybe
2. Order matters — Priority 1 is always next
3. Check prerequisites before starting
