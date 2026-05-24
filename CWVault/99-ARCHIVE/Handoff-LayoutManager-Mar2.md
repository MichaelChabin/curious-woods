# Handoff to Layout Manager — March 2, 2026
**From:** Designer Chat
**For:** Layout Manager — implementation spec for palette and model tool revisions

---

## Context

This briefing covers four areas of work:
1. Palette tool — color and typography fixes
2. Palette tool — two new swatches (Clear and Lead)
3. Model tool — renamed from Overlay, redesigned panel, folder already correct
4. Terminology change throughout — "overlay" becomes "model" everywhere

---

## 1. Palette Tool — Fixes

### Typography
- "CHARTRES", "GAUDÍ", "ALHAMBRA" — change from all-caps to mixed case: "Chartres", "Gaudí", "Alhambra"
- This applies to the panel header and anywhere palette names appear in the Tools menu cascade

### Colors
- The opacity slider thumb is currently blue. Change to Payne's gray `#546A80`
- The slider track stays `#c8b89a` as specced
- "Choose Image" (currently blue link-style) — this is being removed entirely; see Model tool section below

### Palette name as selection mechanism
The palette name at the top of the palette tool ("Chartres") is the switching mechanism. Clicking it reveals the other available palettes plus "Select...". This is not yet implemented. When implemented:
- Clicking the name reveals the other two defaults below it as words (same Payne's gray, 14px Georgia, indented)
- Below those: "Select..." in the same treatment — will eventually open a painting picker window (not yet built)
- The same fade-in / slide-right animation as the Tools cascade, same timing (150ms ease-out)
- Selecting a different palette swaps swatches and name in place — no close/reopen

---

## 2. Palette Tool — Two New Swatches

### Clear
A swatch representing uncolored medieval forest glass. Appears in the swatch grid alongside the color swatches.
- Color: `#c2d4bc` (pale iron-tinged blue-green — adjust toward `#a8c5a0` if too gray)
- Same swatch size and treatment as all other swatches
- No label needed — the color communicates what it is
- Applying Clear to a region leaves it unfilled (or filled with the forest glass color at low opacity — TBD based on what reads better on canvas)

### Lead
A swatch representing lead came — the metal strips between glass pieces.
- Appearance: white or very pale field with a visible dark border in pewter `#4a4540`
- Same swatch size as all other swatches
- **Global behavior:** When Lead is selected, every region in the construction gains a lead-colored border strip. Simultaneously, every swatch in the palette grid gains a matching border — the palette previews exactly what the construction will look like.
- When Lead is deselected, borders disappear from both swatches and construction simultaneously
- The Lead swatch's own border does not change when Lead is active — it already looks like itself

### Placement
Clear and Lead sit together at the end of the swatch grid (bottom-right positions). They are not separated or labeled differently from the other swatches.

---

## 3. Model Tool — Replaces Overlay Tool

### Folder
Already correct: `/CuriousWoods/prototypes/models/`
Contains: nested_squares.svg, triangle_medial.svg, hexagon_triangle.svg, pentagon_pentagram.svg, pythagoras_proof.svg, pythagoras_two_squares.svg, golden_rectangle.svg, golden_rectangle_5.svg, starry_night_armature.svg (plus scaffolded variants — ignore scaffolded files for now, first iteration is models only)

### Panel layout
Remove the current Overlay tool entirely. Replace with a Model tool using this layout:

```
Model                          close
Nested Squares
drag on canvas to reposition
opacity    [————●————————]
scale      [————●————————]
Choose
Hide    Reset
```

**Details:**
- "Model" — tool header, same as "Overlay" was. Mixed case. Payne's gray `#546A80`, 14px Georgia
- "close" — top right, 11px Georgia, muted warm gray `#b0a090`, warms to Payne's gray on hover
- Model name ("Nested Squares") — 14px Georgia, warm gray `#7a6e60`. Displays the currently loaded model's display name (derived from filename: nested_squares → "Nested Squares")
- "drag on canvas to reposition" — 11px Georgia italic, warm gray `#9a8e80`. Quiet note, not a label
- Opacity slider — same style as palette opacity slider: 3px track `#c8b89a`, Payne's gray thumb `#546A80`
- Scale slider — same style. Range: 10–400, displayed as percentage. Default: 100%
- "Choose" — Payne's gray `#546A80`, 14px Georgia. Opens thumbnail picker window (see below)
- "Hide" and "Reset" — same treatment as current Overlay tool. Side by side.

### Default state
When the Model tool opens, it loads `nested_squares.svg` automatically at default opacity (~35%) and scale (100%). The child sees the model on the canvas immediately without having to choose anything.

### Thumbnail picker window
Triggered by clicking "Choose". A floating window (parchment background `rgba(244,241,232,0.96)`, 0.5px border `#c8b89a`, subtle shadow) showing thumbnails of all SVG files in `/prototypes/models/` — excluding any file with "_scaffolded" in the filename (first iteration ignores scaffolded variants).

- Thumbnails render the SVG at small size (approximately 80×80px)
- Model display name below each thumbnail (filename → display name conversion: underscores to spaces, title case)
- Clicking a thumbnail loads that model, closes the picker, updates the model name in the panel
- Window is dismissible by clicking outside it

### Canvas interaction
The model image is draggable on the canvas — the child grabs it and repositions it. This behavior exists in the current Overlay implementation and should be preserved exactly.

---

## 4. Terminology — "Overlay" → "Model" Throughout

Replace all instances of "overlay" / "Overlay" with "model" / "Model" in:
- The Tools menu cascade (Level 2 item: "Model" not "Overlay")
- Any variable names, comments, or UI strings in the implementation
- The panel tool header

The SVG files in `/prototypes/models/` keep their current filenames — no change needed there.

---

## What is NOT changing

- Tools menu structure and animation behavior — unchanged
- Palette swatch size — unchanged for now (revisit after color fixes land)
- Remember inscription — unchanged
- Panel width (220px rest, 260px expanded) — unchanged
- All other Tools menu items (Save, Load, New, Labels, Lines, Glass, Share) — unchanged

---

## Questions for Layout Manager

One open question: when Clear is applied to a region, should the region show the forest glass color `#c2d4bc` as a fill, or should it truly be empty (no fill, just bounded by construction lines)? The designer preference is whichever reads more beautifully on the parchment canvas — please test both and use judgment, or flag for design review.
