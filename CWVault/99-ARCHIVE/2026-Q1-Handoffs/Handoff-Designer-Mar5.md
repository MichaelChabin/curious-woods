# Designer Handoff — March 5, 2026
**From:** Designer Chat
**To:** Layout Manager (sections 1–4), Coder (section 5)
**Supersedes:** No previous Designer handoff — this is the first.
**Read alongside:** Handoff-LayoutManager-Mar5.md (palette and model tool implementation details)

---

## What This Document Covers

Design decisions made in this session that extend or clarify the Layout Manager handoff from earlier today. Sections 1–4 are palette tool decisions for the Layout Manager. Section 5 is an architectural flag for the Coder.

---

## 1. Empty Swatch — New Addition to Palette

A third craft swatch joins Clear and Lead: **Empty**, representing no glass at all.

**Rationale:** A child may want to leave regions unfilled — or remove a fill she has already applied. Without an explicit Empty swatch, the gesture for "fill this region" and "unfill this region" would be the same tap, creating ambiguity about intent.

**Design:** Empty is a swatch like any other. The child selects it from the palette and taps a region. That region returns to the parchment background color. Tapping it again with a different color selected fills it with that color. There is no toggle — the palette is always the source of truth for what a tap will do.

**Appearance:** The parchment color itself, `#f4f1e8`. No label needed — in the company of Clear and Lead, its meaning is self-evident.

**Behavior:** Selecting Empty and tapping a filled region removes the fill. Selecting Empty and tapping an already-empty region does nothing.

---

## 2. Craft Swatches — Dedicated Bottom Row

Empty, Clear, and Lead form a dedicated bottom row in the palette, separated from the historical color swatches above by approximately 6–8px of space.

**The three swatches in order:** Empty · Clear · Lead

**Rationale for separation:** These three represent materials of the craft, not colors derived from a source painting or historical window. The gap communicates this distinction without explanation. It also prevents a child from wondering whether "lead" is a color that came from Starry Night.

**Labels:** Clear and Lead carry small quiet labels — 10–11px Georgia italic, warm gray `#7a6e60`, below or inside the swatch. Empty needs no label.

**Consistency:** This bottom row is identical regardless of which palette is loaded. Whatever painting or window is displayed above, these three are always in the same place.

---

## 3. Distinguishing Empty from Pale Colors

A pale color from Vermeer or Chinese porcelain can be nearly indistinguishable from an empty parchment region. After discussion, the resolution is:

**Labels on Clear and Lead serve this purpose indirectly.** A child who sees an unlabeled parchment-colored region and wonders if it's filled or empty can look at her palette — if Empty is selected, she just emptied it; if a pale color is selected, she just filled it. The palette tells her what she's holding.

**No additional fill indicator is added** — no inner border, no texture shift, no hover state. The ambiguity between a very pale fill and an empty region is accepted as an edge case. When in doubt the prototype will tell us more than reasoning will.

---

## 4. Palette Switching — Fill Behavior

When a child switches from one palette to another (Chartres → Van Gogh, for example), existing fills on the canvas **stay exactly as they are**. The palette is what the child is currently holding — it does not recolor previous decisions.

This was implicit in the design but is worth stating explicitly for implementation.

---

## 5. palettes.json — Schema Change and Recipe Fields

The recipe task is complete. palettes.json has been updated to version 1.1 and the schema has changed. **This requires a rendering code update.**

### Schema change

Colors were previously plain hex strings:
```json
"colors": ["#1a3a8c", "#8b1a1a", ...]
```

They are now objects:
```json
"colors": [
  { "hex": "#1a3a8c", "recipe": "cobalt oxide", "uncertain": false },
  ...
]
```

The palette tool must read `color.hex` rather than the color value directly. All other rendering behavior is unchanged.

### Recipe display

The recipe line at the bottom of the palette panel shows the recipe for the currently selected (hovered or active) swatch:
- Display: `color.recipe`
- If `uncertain` is true: append "?" — displayed as `"cobalt oxide?"` with no space before the question mark
- Typography: 11px Georgia italic, `#2a2620` at ~70% opacity
- Updates as the child moves between swatches

### Craft swatches entry

The craft swatches (Empty, Clear, Lead) are stored as a separate top-level key `craft_swatches` in palettes.json, not inside the palettes array. They are always rendered regardless of which palette is active. Their recipe lines are:
- Empty: "no glass"
- Clear: "iron in sand, unrefined"
- Lead: "lead, antimony"

---

## 6. For the Coder — Action Layer Architecture

**This section is a flag, not a full spec. A detailed note has been written separately at:**
`01-ACTIVE/Note-Coder-ActionLayer-Mar5.md`

**The short version:** Every canvas action — filling a region, loading a model, switching a palette, drawing a construction — must be callable programmatically, not only through UI events. This is what allows Maya to act on the canvas later without architectural surgery.

The Layout Manager is building the panel tools. The Coder owns the connection between those panels and the canvas. Those two should not be tangled together during implementation.

**The handoff point:**
- Layout Manager: child taps a swatch → palette tool knows which color is selected
- Coder: that selection → a named action is called with parameters → canvas updates → action is logged

Read `Note-Coder-ActionLayer-Mar5.md` before wiring panel events to canvas mutations.

---

## 7. Open Items Remaining

These were identified during the session but not resolved — either deferred deliberately or waiting on the prototype:

- **Swatch size** — still at 28px, revisit after color fixes land and the full palette including craft swatches is visible
- **Lead border width** on filled regions — how wide is the lead strip? Not yet specified. The prototype will likely answer this better than reasoning will.
- **Picker thumbnail layout for paintings** — 3 across confirmed for models; paintings may want 2 across given rectangular proportions. Defer until picker is built and we can see it.
- **Backlighting / luminosity** — simulating transmitted light through glass (CSS blend modes, or a bloom effect). Worth doing eventually; changes what the child feels she is making. Separate from the opacity slider, probably an on/off "show light" word control. Future session.
- **Opacity slider scope** — confirmed for model underlay only. Not connected to fills.
- **Art repository subfolder structure** — currently flat folder. Move to per-painting subfolders when the system grows to need it. Not yet.

---

## 8. Files Written This Session

- `01-ACTIVE/Handoff-Designer-Mar5.md` — this document
- `01-ACTIVE/Task-PaletteRecipes-Mar5.md` — brief for the recipe-writing task (complete)
- `01-ACTIVE/Note-Coder-ActionLayer-Mar5.md` — architectural flag for the Coder
- `/prototypes/art/palettes.json` — updated to v1.1 with recipe and uncertain fields
