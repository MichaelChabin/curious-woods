Curious Woods — Image Libraries and Painting Construction Note
Source: Design conversation, February 27, 2026
Purpose: Captures a design direction that emerged late in conversation. Needs full specification before implementation. Forward to Story Developer when that chat is established.

---

## BRIEF

Status: Design direction captured. Needs full specification before implementation.
Last updated: February 27, 2026

---

## The Core Idea

The Glass interactive and future interactives require two libraries: palettes and underlays. In developing the UI for these libraries, a richer possibility emerged that connects them in an unexpected way.

**Palettes derived from paintings.** Rather than showing abstract color chips, the palette browser shows images — paintings, photographs, historical artifacts. The child chooses a world, not a color. Clicking Starry Night generates a palette of its dominant colors. Clicking a Chartres window generates its blues and reds and golds. The emotional and aesthetic associations of the image do the work of color selection naturally. A child who wants her stained glass to feel like Starry Night already knows what she means before she sees a single chip.

This also teaches something about color almost accidentally. Colors belong to worlds, not to abstract swatches. A Vermeer palette is amber and shadow and cool light. A Matisse palette is saturated and flat and joyful. The image predicts what you'll get.

**Underlays as painting studies.** Any painting or historical image can serve as an underlay on the construction canvas — visible at reduced opacity beneath the child's work. The child attempts to find the geometric structure of the image using compass and straightedge. This is not reproduction. It is interpretation — finding which circles approximate Van Gogh's swirling forms, where Vermeer's perspective grid lies, how Mondrian's compositions resolve into right angles and ratios.

**The combination.** A child can load the same painting as both underlay and palette simultaneously. She works on top of Starry Night with Starry Night's colors. Her geometric interpretation sits above the painting, colored from it, rhyming with it without reproducing it. The resulting image — her construction layered over the original at reduced opacity — is itself worth saving.

---

## Why This Matters Pedagogically

A child who has spent time trying to construct Starry Night — finding the circles, choosing the blues and yellows, discovering where the geometry holds and where it dissolves — will never see that painting the same way again. She has a personal relationship with it that no amount of art history instruction could produce.

This is the deepest version of what The Curious Woods does. Not teaching children about things. Giving them experiences that permanently change how they see things.

---

## The Geometric Proof Underlays

Separately, the underlay library should include geometric constructions — finished proof figures without construction lines, labels, or scaffolding. The Pythagorean theorem, the golden ratio, the construction of a regular pentagon. Just the elegant finished form on parchment.

A child who reconstructs one of these from scratch using the available tools has essentially followed the proof without being told that's what she's doing. When she encounters the formal proof later it will feel like something she already knows.

Standard for geometric proof underlays:

- Finished forms only — no construction lines, no scaffolding, no labels
- Rendered in YInMn blue at full opacity
- No fill colors — the child adds those
- SVG format, resolution independent
- Line weight matching standard construction line weight so the underlay reads as continuous with the child's work

---

## Paintings Worth Considering for the Opening Library

A curated opening set spanning different kinds of geometric relationship:

**High geometric structure**
- Mondrian — compositions are literally geometric constructions
- Vermeer — careful perspective grids underlie every interior
- Cézanne — cylinders, spheres, cones as he described them himself

**Rich geometric energy**
- Van Gogh Starry Night — circular swirling forms a compass could approximate
- Klimt — pattern work at the boundary between painting and tile design
- Seurat — pointillist grids with underlying compositional geometry

**Historical and cultural**
- Chartres rose window — pure Euclidean construction made luminous
- Alhambra tile panels — symmetry groups made visible
- Persian girih panels — quasicrystal geometry five centuries before it was understood

**Challenging and rewarding**
- Raphael School of Athens — Renaissance perspective at its most deliberate
- Dürer self-portraits — he wrote extensively about geometric proportion in the human figure

---

## UI Implications

The palette and underlay browsers share the same image-forward interface. A painting appears in both contexts — as a palette source and as a potential underlay. The child browses images the way she might browse in a gallery.

For palettes: clicking an image generates and displays the derived palette, perhaps overlaid briefly on the image so she can see the colors in context before committing.

For underlays: clicking an image loads it at standard opacity beneath the construction canvas.

The possibility of loading the same image in both roles simultaneously needs a clear UI moment — perhaps a brief confirmation that says "use as underlay and palette?" when a painting already loaded as one is selected for the other purpose.

---

## Story Potential

This direction opens extraordinary story possibilities. A chapter about Van Gogh painting from inside an asylum, looking out at the night sky — followed by the child picking up her compass to find those circles. A chapter about how Vermeer is believed to have used a camera obscura to establish his perspective grids — followed by the child finding that grid herself. A chapter about Mondrian's progression from realistic painting to pure geometric abstraction — followed by the child tracing that journey in her own construction.

Anyone who does one of these will never see the painting the same way again.

Forward to Story Developer when that chat is established. This is a rich seam of extended story material connecting art history, geometry, and perception.

---

## Related Documents

- `00-FOUNDATION/CW-UI-Language.md` — left panel and library browser UI
- `20-SPECS/Spec-Contextual-Tools-System.md` — Tools menu and Overlay item (note: original document referenced this as `00-FOUNDATION/CW-Tools-Spec.md` — correct path is here)
- `10-PROJECTS/Planned-Interactives.md` — Glass and future interactives
- `30-SKILLS/SKILL-Story-Developer.md` — story craft principles (to be created)
