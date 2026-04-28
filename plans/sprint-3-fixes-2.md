# Sprint 3 Fixes — Batch 2

---

## 1. Lead Lines Replace Highlighting

**Problem:** Selecting segments still uses the old "highlighting" visual (darkened lines). It should look like placing lead cames. Additionally, when saving as image, only glass fills are rendered — lead lines that don't enclose a shape (decorative lead, structural lead) are omitted.

**Fix:**

### Visual change
When the child taps a segment to select it, the visual should change from "darkened construction line" to **lead came** — the same gray lead rendering used on completed glass shape boundaries. The segment gets the current lead thickness and lead color.

This means selected-but-not-yet-closed segments look like lead, not like highlighted construction lines. The child is placing lead, not highlighting.

### Save as Image must include ALL lead
When rendering the PNG for Save as Image, include:
- Glass fills (colored regions)
- **All lead lines** — both the boundaries of filled glass shapes AND any standalone lead segments that don't enclose a shape (decorative/structural lead)
- The note text at its placed position
- Background

The child deliberately placed those lead lines. They are part of the art, whether or not they form closed shapes.

---

## 2. Enhanced Image Export — Postcard Quality

When saving as image, enhance the presentation to give the result a polished, postcard-art quality. The child's work (glass shapes, lead placement, colors, note) is not modified — only the presentation is enhanced.

### Resolution
- Render at **3x the canvas pixel dimensions** (e.g., a 1200px canvas width becomes 3600px in the image).
- Set PNG DPI metadata to **300 DPI** so image viewers and printers treat it as a smaller, high-resolution image rather than a large low-res one.
- All drawing operations (fills, lead, text) should use the 3x coordinates — not a stretched-up 1x render.

### Background
- Instead of flat parchment, render a **subtle vignette** — slightly darker at the edges, lighter in the center.
- Implementation: after drawing the parchment background, overlay a radial gradient from `rgba(0,0,0,0)` at center to `rgba(0,0,0,0.12)` at the corners. Adjust opacity to taste — it should be barely noticeable, just enough to frame the work.

### Lead rendering enhancement
- In the exported image (not the live canvas), give lead lines a **subtle shadow/bevel** to suggest three-dimensionality.
- Implementation: for each lead line, draw a thin shadow offset by 1px (at 3x scale, 3px) down and right in `rgba(0,0,0,0.2)`, then draw the lead line on top. This creates a very slight raised effect, like real lead cames catching light.

### Glass texture
- Apply a **very subtle noise texture** over each glass fill to suggest the texture of real glass.
- Implementation: after drawing each colored fill, overlay a sparse noise pattern at very low opacity (`rgba(0,0,0,0.03)` for dark speckles and `rgba(255,255,255,0.03)` for light speckles). Generate a few hundred random points within the fill region. This should be barely perceptible — just enough to break up the perfectly flat color.

### Border / Mat
- Add a **border mat** around the image.
- Implementation: expand the canvas dimensions by 60px (at 3x scale, 180px) on each side. Fill the border area with a dark neutral color (`#2a2620` or similar — dark warm brown). Draw a thin inner line (`0.5px` at 1x, `1.5px` at 3x) in `#c8b89a` (the existing parchment border color) between the mat and the artwork area.
- The note, if positioned near an edge, should remain within the artwork area, not extend into the mat.

### What is NOT enhanced
- Colors are exactly as the child chose them
- Glass shapes are exactly as the child defined them
- Lead lines are exactly where the child placed them
- Note text and position are exactly as the child set them
- No decorative elements are added that the child didn't create

### Implementation approach
Create a separate function `renderPostcardPNG()` that handles the enhanced export. Keep the existing thumbnail capture (`captureConstructionPNG`) unchanged — thumbnails should be fast and simple. The postcard render is only used for Save as Image.

---

## Testing

1. Select segments — they should look like lead (gray, with lead thickness), not darkened construction lines.
2. Place some lead lines that don't form closed shapes (decorative lines extending from a shape).
3. Save as Image — verify ALL lead lines appear in the saved image, including non-enclosed ones.
4. Saved image should be 3x resolution with 300 DPI metadata.
5. Saved image should have subtle vignette on background.
6. Lead lines in saved image should have slight shadow/depth.
7. Glass fills in saved image should have subtle noise texture.
8. Saved image should have dark border mat with thin inner line.
9. Note text should render at the position the child placed it, within the artwork area.
10. Compare saved image to canvas — the child's work should be immediately recognizable, just beautifully presented.
