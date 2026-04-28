# Sprint 4 — New Items Only

---

## 1. Round lead joints and caps

Lead lines currently render with sharp pointed extensions at angles and endpoints. Real lead cames have rounded joints.

- Set `ctx.lineJoin = 'round'` when drawing lead lines.
- Set `ctx.lineCap = 'round'` when drawing lead lines.

Apply everywhere lead is drawn: during segment selection, on completed glass boundaries, and in the export renderer. Both the live canvas and exported images.

---

## 2. Save as Image — preview before export

Currently the child places the note on the full canvas, but the export crops to the artwork bounding box — so the note ends up in a different position than intended.

### New flow

1. Child taps "Save as Image"
2. Chooses Postcard or Full sheet:
   - **Postcard:** 1800×1200 pixels at 300 DPI (6×4 inches)
   - **Full sheet:** 3000×2400 pixels at 300 DPI (10×8 inches)
3. **A preview appears on the canvas** — the cropped artwork with the border mat, rendered at screen resolution. The note box is **live on top of the preview** — the child can drag it to exactly where she wants it, seeing the final composition.
4. The preview does NOT need the full texture enhancements (glass noise, lead shadow, vignette). Just the clean artwork, lead lines, border mat, and the draggable note. It needs to be fast.
5. She taps OK.
6. The full-resolution export renders with all enhancements, and the note in the position she chose on the preview.

The child places the note directly on the cropped composition. The position she sees is the position she gets. No coordinate translation needed.

---

## 3. Enhanced image export — postcard quality

Apply these presentation enhancements to the exported image only (not the live canvas). The child's work is not modified — only the presentation.

### Export scaling rules

- **Lead line thickness scales proportionally** with the artwork.
- **Enforce min/max lead thickness in export:** never thinner than 0.5pt (~2px at 300 DPI), never thicker than 4pt (~17px at 300 DPI).
- **Note text at fixed physical size:** 13pt at 300 DPI ≈ 54px, always readable regardless of artwork scale.
- **Circular arcs:** ensure enough resolution for smooth curves at any scale.

### Presentation enhancements

**Background vignette:**
Radial gradient from `rgba(0,0,0,0)` at center to `rgba(0,0,0,0.12)` at corners.

**Lead shadow/bevel:**
For each lead line, draw a thin shadow offset 1px down and right (3px at 3x scale) in `rgba(0,0,0,0.2)`, then draw the lead line on top.

**Lead highlight:**
Thin highlight along top/left edge of each lead line: 1px in `rgba(255,255,255,0.15)`.

**Glass texture:**
After drawing each colored fill, overlay sparse noise at very low opacity — `rgba(0,0,0,0.03)` dark speckles and `rgba(255,255,255,0.03)` light speckles. A few hundred random points per fill region.

**Subtle glass gradient:**
Within each fill, very faint gradient — slightly lighter toward center, slightly darker near lead edges. About 5% opacity difference.

**Warm light overlay:**
Faint warm overlay across all glass regions: `rgba(255,248,230,0.03)`.

**Border mat:**
Expand canvas by 60px on each side (180px at 3x). Fill with dark warm brown `#2a2620`. Thin inner line in `#c8b89a` between mat and artwork.

**Note rendering:**
No background — just text directly on the art, at the position chosen on the preview.

### DPI metadata
Set the PNG `pHYs` chunk to 300 DPI (11811 pixels per meter). Patch the binary PNG data before creating the download blob.

### Implementation
Create `renderPostcardPNG(size)` where size is 'postcard' or 'fullsheet'. Keep existing thumbnail capture unchanged.

---

## 4. Separate text content from code

All user-facing text should be loadable from an external JSON file, with current hardcoded text as fallback defaults.

### Create `cw-deploys/text/geometry-v1.json`

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

Words in `[brackets]` are tappable action words.

### Loading

Fetch `text/geometry-v1.json` at startup (alongside `loadPalettesJSON()`). If it loads, use its content. If it fails, fall back to hardcoded defaults. The app must work identically either way.

### Implementation

- Add `loadContentJSON()` called early in startup.
- Store loaded content in a `CONTENT` variable.
- Each place that uses hardcoded text checks `CONTENT` first, falls back to hardcoded default.
- Hardcoded defaults remain in the code as the safety net.

---

## Testing

1. Lead joints are rounded — no sharp points extending past glass.
2. Save as Image shows Postcard/Full sheet choice.
3. Preview appears showing cropped artwork with border mat.
4. Note box is draggable on the preview.
5. Exported image matches the preview — note is where the child placed it.
6. Exported image has vignette, lead shadows/highlights, glass texture, warm light, border mat.
7. Exported image is correct DPI (300) and correct dimensions.
8. Small and large constructions both export with reasonable lead thickness.
9. Note text is readable at both Postcard and Full sheet sizes.
10. App loads and works normally if `text/geometry-v1.json` is missing.
11. Text from JSON file appears in tip windows when file is present.
