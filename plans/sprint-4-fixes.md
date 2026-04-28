# Sprint 4 — Fixes and Enhancements

---

## 1. Bugs from testing

### 1a. Two-sided shapes don't fill
A shape with only 2 segments (e.g., a lens formed by two arcs meeting at two points) should fill with glass. The fill logic currently requires ≥ 3 segments. Change it to accept ≥ 2.

### 1b. Palette picker "close" scrolls out of view
When scrolling through palettes in the picker window, the "close" button scrolls up and disappears. Fix: make the close button (or its containing header bar) `position: sticky; top: 0` with a background color so it stays visible while scrolling.

### 1c. Eraser cursor doesn't appear until mouse moves
On double-click-and-hold, the cursor should change to the eraser shape immediately — before any mouse movement. Currently the cursor only changes once the mouse moves. The child needs to see the eraser appear so she knows what she can do.

### 1d. Default color should be "clear" for new constructions
When starting a new construction (New or loading from picker), reset the selected color to "clear" (bottle green). Currently the default is whatever color was used last.

### 1e. Canvas clearing is incomplete
When starting New or loading a construction, clear ALL of the following:
- All constructed lines, circles, and points (except seed points 0 and 1)
- All glass fills and lead
- Notes from any previously loaded construction
- The step-through panel (← → →| |← Cancel)
- Reset selected color to "clear"

### 1f. Double save prompt when opening a construction
When the child clicks Open, she's already asked if she wants to save current work. After saving or declining, the canvas is cleared. But when she then selects a construction thumbnail from the picker, the save prompt fires again.

**Fix:** The save check should only happen once — when "Open" is first clicked. By the time the picker appears, the canvas is already clear. Do not prompt again when a thumbnail is selected. Track that the save check has already been completed for this open flow.

### 1g. Construction loading — first step should be visible
When a construction is loaded from the picker, it should display the first step immediately (e.g., if the first action was connecting points 0 and 1 with a line, show that line). Do not start with just the seed points — show the first action already completed.

### 1h. Construction loading — zoom is wrong
When loading a saved construction, the zoom level is approximately 2x what it should be. The construction should load at the zoom level it was saved at. Save the `viewScale` value as part of the construction data when saving. When loading, restore `viewScale` to the saved value.

### 1i. Point highlighting during step-through is unnecessary
When stepping through a loaded construction, points currently highlight before each step (as they did during original construction). Remove this highlight during replay — just show the geometry appearing. The highlighting was pedagogically interesting but in practice it slows down the step-through.

### 1j. Fills should apply individually during step-through
When stepping through a loaded construction, all color fills currently apply in a single step. Instead, each fill should be its own step, applied in the order they were created in the original construction. So if the original had 5 colored shapes, the child clicks → five times to see each one colored.

### 1k. Add |← and →| buttons to step-through controls
The step-through panel currently has ← → and Cancel. Add:
- **|←** (go to first step): resets the replay to the very first step.
- **→|** (go to last step): jumps to the completed construction — all geometry and fills appear at once.

Layout:
```
|←  ←  →  →|
   Cancel
```

### 1l. Orphan lead lines should not prevent fills
If a closed loop of lead includes segments that extend beyond the loop (orphan lead lines attached to the loop), the loop should still fill with glass. Currently a loop that begins with an orphan lead line attached does not fill. Any closed loop should fill, regardless of extra lead lines connected to it.

---

## 2. Note instruction text

The instruction text above the note box ("this note will appear as part of your image. You can place it anywhere you like.") needs two fixes:

- **Color:** change to the same color as the note text itself (match the note body text color, likely `#546A80`).
- **Line wrapping:** the instruction text should word-wrap to fit within the width of the note box. It should not extend beyond the box edges.

---

## 3. Note box semi-transparent background

The note box background should be **semi-transparent at all times** — enough to read text while typing, but enough to see the artwork behind it for precise placement.

- Change the note box background to `rgba(244,241,232,0.75)` (parchment at 75% opacity).
- This applies while typing, while dragging, and while stationary — no state changes.
- In the **exported image** (Save as Image), render the note with **no background at all** — just the text, like a caption or signature printed directly on the art.

---

## 4. Enhanced Image Export — Postcard Quality

When saving as image, enhance the presentation. The child's work is not modified — only the presentation.

### Image size options

When the child taps "Save as Image", show a choice before the note UI:

```
Postcard    Full sheet
```

Tappable text, same style as other dialogs.

- **Postcard:** 1800×1200 pixels at 300 DPI (6×4 inches).
- **Full sheet:** 3000×2400 pixels at 300 DPI (10×8 inches).

The artwork is cropped to its bounding box (all glass fills and lead lines), padded by 15%, then scaled to fit within the chosen format. Centered within the frame.

### Export scaling rules

When scaling artwork to fit the export size:

- **Lead line thickness scales proportionally** with the artwork. Store lead thickness as a proportion of the artwork bounding box, not absolute pixels.
- **Enforce minimum/maximum lead thickness in export:** never thinner than 0.5pt (about 2px at 300 DPI) and never thicker than 4pt (about 17px at 300 DPI) regardless of scaling.
- **Note text renders at a fixed physical size:** 13pt at 300 DPI ≈ 54px, regardless of artwork scale. Always readable.
- **Circular arcs:** if the artwork is scaled up significantly, ensure arcs are rendered with enough resolution to appear smooth (no visible faceting).

### Presentation enhancements

Apply these to the exported image only (not the live canvas):

**Background vignette:**
- After drawing the parchment background, overlay a radial gradient from `rgba(0,0,0,0)` at center to `rgba(0,0,0,0.12)` at corners.

**Lead shadow/bevel:**
- For each lead line, draw a thin shadow offset by 1px down and right (3px at 3x scale) in `rgba(0,0,0,0.2)`, then draw the lead line on top. Creates a subtle raised effect.

**Lead highlight:**
- A thin highlight along the top/left edge of each lead line: 1px lighter in `rgba(255,255,255,0.15)`.

**Glass texture:**
- After drawing each colored fill, overlay sparse noise at very low opacity — `rgba(0,0,0,0.03)` for dark speckles and `rgba(255,255,255,0.03)` for light speckles. A few hundred random points per fill region.

**Subtle glass gradient:**
- Within each glass fill, apply a very faint gradient — slightly lighter toward center, slightly darker near the lead edges. About 5% opacity difference.

**Warm light overlay:**
- A faint warm overlay across all glass regions: `rgba(255,248,230,0.03)`. Suggests light passing through glass.

**Border mat:**
- Expand canvas by 60px on each side (180px at 3x). Fill with dark warm brown `#2a2620`. Thin inner line in `#c8b89a` between mat and artwork.

**Note rendering:**
- Note text renders with NO background — just text directly on the art.
- Position exactly where the child placed it.
- Must remain within the artwork area, not extend into the mat.

### DPI metadata
Set the PNG `pHYs` chunk to 300 DPI (11811 pixels per meter). The Canvas API doesn't set DPI — patch the binary PNG data before creating the download blob.

### Implementation
Create a separate function `renderPostcardPNG(size)` where size is 'postcard' or 'fullsheet'. Keep existing thumbnail capture unchanged.

---

## 5. Lead line rendering — round joins and caps

Lead lines currently render with sharp pointed extensions at angles and endpoints. Real lead cames have rounded joints. Fix this on both the live canvas and in the exported image:

- Set `ctx.lineJoin = 'round'` when drawing lead lines — where leads meet at a point, they round off instead of spiking past the glass.
- Set `ctx.lineCap = 'round'` when drawing lead lines — where a lead line ends, it rounds off.

This applies everywhere lead is drawn: during segment selection, on completed glass boundaries, and in the export renderer.

---

## 6. Save as Image — preview before export

The current flow has the child place the note on the full canvas, but the export crops to the artwork bounding box — so the note ends up in a different position than where she placed it.

### New flow

1. Child taps "Save as Image"
2. Chooses Postcard or Full sheet
3. **A preview appears on the canvas** — the cropped artwork with the border mat, rendered at screen resolution. The note box is **live on top of the preview** — the child can drag it to exactly where she wants it, seeing the final composition.
4. The preview does NOT need the full texture enhancements (glass noise, lead shadow, vignette). Just the clean artwork, lead lines, border mat, and the draggable note. It needs to be fast.
5. She taps OK
6. The full-resolution export renders with all enhancements, and the note in the position she chose on the preview.

This eliminates the coordinate translation problem entirely — the child places the note directly on the cropped composition. The position she sees is the position she gets.

---

## 7. Lead replaces highlighting

### Visual change
When the child taps a segment to select it, the visual should be **lead came** — the gray lead rendering with the current lead thickness. Not a "darkened construction line." Selected-but-not-yet-closed segments look like placed lead.

### Save as Image includes ALL lead
When rendering the PNG for Save as Image, include:
- Glass fills
- **All lead lines** — both boundaries of filled shapes AND standalone lead segments that don't enclose a shape
- Note text
- Background and enhancements

The child deliberately placed those lead lines. They are part of the art.

---

## Testing

1. Create a lens shape (2 arcs, 2 points) — it should fill with glass.
2. Palette picker — scroll through palettes, close button stays visible.
3. Double-click-and-hold — eraser cursor appears immediately.
4. Start new construction — selected color is "clear" (bottle green).
5. Clear canvas — verify all geometry, fills, lead, notes, and step panel are removed.
6. Click Open, save when prompted, select a construction — should NOT be asked to save again.
7. Load a construction — first step is visible immediately.
8. Load a construction — zoom matches what it was when saved.
9. Step through — no point highlighting during replay.
10. Step through — each fill is a separate step.
11. |← goes to first step, →| shows completed construction.
12. Place lead lines that don't form a closed shape — they appear in saved image.
13. Close a loop that has orphan lead attached — it fills with glass.
14. Select a segment — looks like lead (not a darkened line).
15. Note instruction text wraps to box width in matching color.
16. Note box is semi-transparent while editing and dragging.
17. Save as Image — note has no background, just text on art.
18. Save as Image — choose Postcard or Full sheet, verify correct dimensions and 300 DPI.
19. Save as Image — verify vignette, lead shadows, glass texture, border mat.
20. Small construction exports cleanly (lead not too chunky).
21. Large construction exports cleanly (lead not too thin).
22. Lead line joints are rounded, no sharp points extending past glass.
23. Save as Image shows a preview with draggable note before final export.
24. Note position in exported image matches where it was placed on the preview.

---

## 8. Separate text content from code

All user-facing text (tip window content, dialog labels, the uniqueness observation, instruction text, button labels) should be loadable from an external JSON file, with the current hardcoded text serving as fallback defaults.

### The content file

Create `cw-deploys/text/geometry-v1.json` with all text content organized by feature:

```json
{
  "htw": {
    "construction": {
      "heading": "Lines and Circles",
      "body": [
        "All your beautiful patterns begin with circles, lines, and two points.",
        "To make a line, tap a point, then tap another.",
        "To make a circle, tap a point, then drag to another.",
        "Where lines and circles intersect, new points appear.",
        "Use those to make more lines and circles.",
        "",
        "Tap any empty space to undo."
      ]
    },
    "shapes": {
      "heading": "Cutting Shapes",
      "body": [
        "To cut your glass, tap a line. It will fill with lead.",
        "Then tap connected lines.",
        "",
        "When you enclose a shape it will turn to glass."
      ]
    },
    "color": {
      "heading": "Color",
      "body": [
        "To color glass, tap a color, then tap the glass.",
        "",
        "To choose a different set of colors, tap [Choose new colors].",
        "Use the slider to change lead thickness."
      ]
    },
    "eraser": {
      "heading": "Hiding Lines",
      "body": [
        "Double click a line to make it fade",
        "or to make a faded line reappear.",
        "",
        "Double click a line and hold the mouse down to",
        "change more than one line."
      ]
    },
    "save": {
      "heading": "Save or Share",
      "body": [
        "Tap [Save] to save your work as an image or as a file you can open and work on later.",
        "Tap [Share] to send a copy to someone else."
      ]
    },
    "newopen": {
      "heading": "New and Open",
      "body": [
        "Tap [New] to start a new construction.",
        "Tap [Open] to see examples and to open constructions you've saved."
      ]
    }
  },
  "uniqueness": "You've made {points} points, {lines} lines, and {circles} circles. With those, there are more possible arrangements than atoms in the universe. The one you just made — no one has made that before.",
  "note_instruction": "This note will appear as part of your image. You can place it anywhere you like.",
  "dialogs": {
    "save_first": ["Start over", "Save and continue"],
    "cancel_replay": ["Start over", "Continue from here"],
    "save_type": ["Save Construction", "Save as Image"],
    "image_size": ["Postcard", "Full sheet"]
  }
}
```

Words in `[brackets]` are tappable action words (the existing highlighting/action pattern).

### Loading

At startup, fetch `text/geometry-v1.json`. If it loads successfully, use its content. If it fails (404, parse error, network issue), fall back to the current hardcoded text. The app must work identically with or without the JSON file.

### Implementation

- Add a `loadContentJSON()` function, called early in startup (alongside `loadPalettesJSON()`).
- Store the loaded content in a `CONTENT` variable.
- Each place that currently uses hardcoded text should check `CONTENT` first, fall back to the hardcoded default.
- The hardcoded defaults remain in the code — they are the safety net.

### Editing workflow

To change any text: edit `text/geometry-v1.json`, deploy, done. No code changes needed. To sync the defaults: tell Code "update the hardcoded defaults to match the JSON file."

---

## What is NOT in this sprint

- Return visit timing (localStorage timestamp)
- Sound design
- Region subtraction
- Maya/Claude integration
- iPad finger input (Pencil works)
- Modularization
