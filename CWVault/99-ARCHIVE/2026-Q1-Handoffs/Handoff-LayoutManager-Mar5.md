# Handoff to Layout Manager — March 5, 2026
**From:** Designer Chat
**Supersedes:** Handoff-LayoutManager-Mar3.md

---

## Context

This briefing covers four areas of work:
1. Palette tool — color and typography fixes
2. Palette tool — two new swatches (Clear and Lead)
3. Model tool — renamed from Overlay, fully redesigned
4. Picker window — a reusable floating chooser, built once, used for both models and palettes
5. Art repository — new folder structure and palettes.json ← NEW

---

## 1. Palette Tool — Fixes

### Typography
- "CHARTRES", "GAUDÍ", "ALHAMBRA" — change from all-caps to mixed case: "Chartres", "Gaudí", "Alhambra"
- Applies to the panel header and anywhere palette names appear in the Tools menu cascade

### Slider colors
- Opacity slider thumb is currently blue — change to Payne's gray `#546A80`
- Slider track stays `#c8b89a`
- Applies to all sliders in all panel tools

### Default palette colors
The three default palettes (Chartres, Gaudí, Alhambra) have placeholder colors in palettes.json — replace those placeholder values with the actual hex values already implemented in the prototype. The palettes.json entry structure is correct; only the color arrays need updating.

---

## 2. Palette Tool — Two New Swatches

### Clear
Represents uncolored medieval forest glass — the pale blue-green color that comes from iron naturally present in sand. This is a real color, not transparency.
- Color: `#c2d4bc` (adjust toward `#a8c5a0` if too gray — should read as faintly blue-green, not gray)
- Same swatch size and treatment as all other swatches
- Applying Clear to a region fills it with the forest glass color
- No label needed — the color communicates what it is

### Lead
Represents lead came — the metal strips between glass pieces.
- Appearance: white or very pale field with a visible border in pewter `#4a4540`
- Same swatch size as all other swatches
- **Global behavior:** When Lead is selected, every region in the construction gains a lead-colored border strip. Simultaneously, every swatch in the palette grid gains the same border — the palette previews exactly what the construction will look like
- When Lead is deselected, borders disappear from swatches and construction simultaneously
- The Lead swatch's own border does not change when Lead is active — it already looks like itself

### Placement
Clear and Lead sit together at the end of the swatch grid. Same treatment as all other swatches, no special labeling.

---

## 3. Model Tool — Replaces Overlay Tool

### Folder
Already correct: `/CuriousWoods/prototypes/models/`

### Filename convention
Filenames stay exactly as-is — do not rename them. The prefix system (`geo_`, `ratio_`, future `proof_`, `art_`) is intentional and should be preserved for future filtering and organization.

Display names are generated from filenames by:
1. Strip the prefix (everything up to and including the first underscore)
2. Replace remaining underscores with spaces
3. Title case the result

**One manual override:** `geo_triangle_medial.svg` → "Nested Triangles" (not "Triangle Medial")

All other auto-generated names are correct:
- `geo_hexagon_triangle.svg` → "Hexagon Triangle"
- `geo_pentagon_pentagram.svg` → "Pentagon Pentagram"
- `geo_squares_nested.svg` → "Nested Squares"
- `ratio_golden_5.svg` → "Golden Rectangle"

### Default state
When the Model tool opens, it loads `geo_squares_nested.svg` (Nested Squares) automatically at default opacity (~35%) and scale (100%). No action required from the child.

Session persistence: none. Every session opens with this default. Persistence is deferred until personalization is further along.

### Panel layout

```
Model                          close
Nested Squares
drag on canvas to reposition
opacity    [————●————————]
scale      [————●————————]
None
Nested Squares
Choose
Hide    Reset
```

**Details:**
- "Model" — tool header, mixed case, Payne's gray `#546A80`, 14px Georgia
- "close" — top right, 11px Georgia, muted warm gray `#b0a090`, warms to Payne's gray on hover
- Model name ("Nested Squares") — 14px Georgia, warm gray `#7a6e60`. Updates to reflect currently loaded model
- "drag on canvas to reposition" — 11px Georgia italic, warm gray `#9a8e80`. Quiet note, not a label
- Opacity slider — 3px track `#c8b89a`, Payne's gray thumb `#546A80`. Range 5–100
- Scale slider — same style. Range 10–400, displayed as percentage. Default 100%
- "None" — Payne's gray `#546A80`, 14px Georgia. Clears the model from canvas entirely
- "Nested Squares" — same treatment. The default model name, always listed. Functions as both state indicator and shortcut back to default
- "Choose" — same treatment. Opens the picker window (see section 4)
- Active selection indicated by color deepening to `#3D3D3A` — same as hover treatment but persistent
- "Hide" and "Reset" — side by side, same treatment as current Overlay implementation

### Canvas interaction
Model is draggable on canvas — preserve existing behavior from Overlay implementation. The "drag on canvas to reposition" note in the panel makes this discoverable.

---

## 4. The Picker Window — Reusable Component

Build this as a reusable component. It will be used for model selection now and for palette/painting selection later. The container is identical each time — only the content changes.

### Appearance
- Floating panel, appears over the canvas
- Background: parchment `rgba(244,241,232,0.96)`
- Border: 0.5px `#c8b89a`
- Shadow: subtle, same as other floating panels
- No title bar, no close button

### Behavior
- Appears on "Choose" click with 200ms ease-in fade
- Dismissed by clicking outside — 150ms ease-out fade
- Clicking a thumbnail loads that item and dismisses the window simultaneously
- Currently loaded item shows a subtle persistent selection border in Payne's gray `#546A80`

### Content — models
- Grid of SVG thumbnails, 3 across
- Each SVG rendered at thumbnail size (~80×80px)
- Display name below each thumbnail: 11px Georgia, warm gray `#7a6e60`
- Source: all files in `/prototypes/models/` except any with "_scaffolded" in the filename

### Content — palettes
- Grid of painting image thumbnails, 3 across
- Source images from `/prototypes/art/`
- Display name below each thumbnail derived from palettes.json "name" field
- Selecting a painting loads its color array from palettes.json into the palette tool

### Position
Floating freely over the canvas — roughly centered. Not anchored to the panel tool that triggered it.

---

## 5. Art Repository and palettes.json ← NEW

### Folder
`/Users/michaelchabin/CuriousWoods/prototypes/art/`

This folder is the beginning of a system-wide art repository. For now it serves the palette picker. In future it will serve stories, geometry overlays, and other content. Structure it to grow — each painting could eventually have its own subfolder containing multiple image resolutions, palette, and notes. For now, flat folder with images and one JSON file is correct.

### palettes.json
Location: `/Users/michaelchabin/CuriousWoods/prototypes/art/palettes.json`
Already written. Contains 16 palettes — 3 defaults (with placeholder colors to be replaced) and 13 derived from images.

**Palettes included:**
- Chartres (default — replace placeholder colors)
- Gaudí (default — replace placeholder colors)
- Alhambra (default — replace placeholder colors)
- Hokusai — The Great Wave
- Hiroshige — Sudden Shower
- Van Gogh — Starry Night
- Van Gogh — Café Terrace (from memory — verify against image)
- Matisse — The Red Room
- Vermeer — Girl with a Pearl Earring
- Manet — The Piper
- Sargent — Carnation, Lily, Lily, Rose
- Earth — Blue Marble
- Sun — Solar Surface (Inouye Solar Telescope)
- Degas — The Guitarist (from memory — verify against image)
- Chinese Blue and White (porcelain)
- Fan Kuan — Travelers in Mountains

**Note on palette sizes:** Most palettes have 8 colors. Four have 6 colors (Sun granulation, Chinese porcelain, Fan Kuan, H-alpha Sun). This is intentional — honest to sources with fewer distinct usable colors. The picker and swatch grid should handle variable palette sizes gracefully.

**Note on H-alpha Sun:** The H-alpha solar filter image exists in the art folder but has no palette entry yet. It is held for later, to be introduced alongside a story about what H-alpha imaging shows. Do not include it in the picker for now.

### Image sizes
Thumbnail images for the picker should be 300×300px JPEG at 85% quality. The current images in the folder may be larger — resize them for picker use. A simple Python script can batch-resize the entire folder.

---

## What Is NOT Changing

- Tools menu structure and animation behavior
- Palette swatch size (revisit after color fixes land)
- Remember inscription
- Panel width (220px rest, 260px expanded)
- All other Tools menu items (Save, Load, New, Labels, Lines, Glass, Share)
- Canvas drag behavior for the model image

---

## Priority Order

Suggested implementation sequence:
1. Palette typography fixes and slider colors — quick wins, visible immediately
2. palettes.json integration — connect palette tool to the JSON file, replace hardcoded colors
3. Default palette color replacement in palettes.json
4. Clear and Lead swatches
5. Model tool panel redesign
6. Picker window — reusable component, test with models first then palettes
