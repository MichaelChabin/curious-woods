# Designer Chat Context — March 5, 2026
**Purpose:** Design decisions and rationale from this session not captured in the Layout Manager handoff. Read alongside Handoff-LayoutManager-Mar5.md.

---

## Palette Tool — Design Rationale

### Why words not thumbnails for palette switching
The palette name at the top of the palette tool ("Chartres") is the switching mechanism — clicking it reveals the other defaults as words, plus "Choose..." which opens the picker. We considered showing palette thumbnails directly in the panel but decided against it. The picker window is the right place for visual selection. The panel stays quiet.

### Forest glass — Clear swatch
Forest glass (`#c2d4bc`) is the pale blue-green color of uncolored medieval glass, caused by iron naturally present in sand. It is a real color, not transparency. A child applying Clear to a region is making an authentic historical choice — this is what glass looked like before glassmakers learned to remove the iron. The color is immediately recognizable once you know what it is. Eileen noted "now that I know what it is, I see it everywhere."

### Lead swatch — global behavior logic
When Lead is selected, every swatch in the palette gains a pewter border (`#4a4540`) simultaneously with every region in the construction. The palette becomes a preview of the whole construction's character. The child can see exactly what cobalt will look like bounded in lead before she commits. The Lead swatch itself already has a border at all times — it looks like itself whether Lead is active or not. This is intentional visual logic, not an oversight.

### Swatch size — deferred decision
Swatch size (currently 28px) was left unchanged pending the color fixes. The concern was that Clear and Lead need enough area to communicate their nature. Revisit after the palette color fixes land and the full palette including Clear and Lead is visible. May be fine as-is.

---

## Model Tool — Design Rationale

### Why "Model" not "Overlay" or "Template"
- "Overlay" describes the technical behavior (it goes under the construction) — too mechanical
- "Template" implies the child fills it in — wrong relationship
- "Model" implies she's looking at a finished thing and figuring out how it was built — correct

### The three-word selection pattern
```
None
Nested Squares
Choose
```
"None" clears the canvas. The default model name ("Nested Squares") is always listed — functions as both state indicator and shortcut back to default. "Choose" opens the picker. Active selection shown by color deepening to `#3D3D3A`. This pattern — None / default / Choose — is reusable. For palettes it will be: None / Chartres / Choose.

### Partials — deferred
Models can have partial versions (construction hints — e.g. the midpoint-to-corner arc that makes the golden rectangle constructible). Decided to defer partials entirely for first iteration. First iteration: models only, no partials. Revisit when a child is actually in front of it and we can see whether she needs them.

### Session persistence — deferred
Every session opens with defaults: Nested Squares loaded at ~35% opacity, Chartres as palette. No persistence. Revisit when personalization is further along — we don't yet know what a child would want to return to.

---

## Art Repository — Design Rationale

### Why a repository, not just a palette folder
The art folder (`/prototypes/art/`) is the beginning of a system-wide resource. Paintings will eventually serve stories (history, chemistry, geometry of composition), palette tools, and potentially geometry overlays. A single authoritative record per painting — multiple image resolutions, palette, brief text, tags — prevents scattered duplication as the system grows. For now: flat folder, one JSON file. Structure to grow into subfolders per painting when the time comes.

### palettes.json — two palettes from memory
Van Gogh Café Terrace and Degas — The Guitarist were derived from memory rather than image analysis. Both should be verified against the actual images before shipping. The Café Terrace is well known enough that the palette is likely accurate. The Degas is less certain.

### H-alpha Sun — held for later
The H-alpha solar filter image exists in the art folder but has no palette entry. It is intentionally absent from the first set. The image is nearly monochromatic red — beautiful but hard for a child to use well without context. It wants a brief story from Eileen about what H-alpha imaging shows (hydrogen in the chromosphere, solar flares, the physics of why this specific wavelength reveals what it does). Introduce it alongside that story.

### Solar granulation — include now
The Inouye Solar Telescope granulation image is included in the first set despite also being astronomical. Unlike the H-alpha image, the palette (deep ambers, warm golds, near-blacks) is immediately beautiful and usable without any context. Finding out what it is becomes the surprise.

### Image thumbnail sizing
300×300px JPEG at 85% quality for picker thumbnails. Screen use only — ppi irrelevant, pixel dimensions are what matter. Batch resize with a Python script rather than doing them one by one in Preview.

---

## Picker Window — Design Rationale

### Why floating over canvas rather than emerging from panel
The picker is a moment of pure choice — the child has nothing to do but look and select. Floating freely over the canvas, dismissed by clicking outside, is the most honest expression of that. It doesn't pretend to be part of the panel system. It arrives, offers options, and disappears.

### Why build it now
The picker window will recur — models, palettes, eventually perhaps stories or other assets. Building it once as a reusable component with identical container behavior (parchment background, 0.5px border, fade in/out, click-outside dismiss) means every future use is just supplying different content to the same shell.

---

## Open Questions for Future Design Sessions

- Swatch size — revisit after color fixes land
- Lead border width — how wide is the lead strip on a filled region? Not yet specified
- Clear behavior at region boundaries — does forest glass color sit flush against adjacent filled regions, or is there a natural gap suggesting the lead came between them?
- Palette picker thumbnail layout — 3 across confirmed for models; paintings may want 2 across given their rectangular proportions
- Art repository subfolder structure — when to move from flat folder to per-painting subfolders
- H-alpha Sun palette — write when Eileen's story is ready
- Degas and Café Terrace palette verification
