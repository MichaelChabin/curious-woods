Curious Woods — UI Language Document

**Source:** Design conversation with Michael Chabin, February 27, 2026 **Purpose:** Extends the Interface Foundation with dynamic layout, contextual controls, and the two-panel content model. All working chats should read this alongside the Interface Foundation.

---

## BRIEF (read this, skip the rest if you're building)

Status: First complete statement. Authoritative for all new interactive and story content. Last updated: February 27, 2026

Core decisions:

- Two-panel layout: left panel dynamic, right panel pure narrative
- Left panel is a **context membrane**, not a sidebar — tools appear when contextually relevant,
  fade when they aren't. A tool dragged onto the canvas becomes a user commitment — stays
  regardless of context. Things behind the panel are the world. Things in front are tools.
- Left panel breathes with its contents — sized exactly to what it holds
- Controls appear as words, never buttons
- Options fade in when they become possible, fade out when they don't apply
- One permanent inscription: "I want to / Remember / this" — never moves, never fades
- Parchment is the universal ground — left panel a slightly deeper tone of the same family
- 0.5px warm separator line between panels — present but nearly subliminal
- Save is always local; sharing is always child-initiated
- Child's data belongs to the child — portable as a drag-and-drop text file

Read the full document for: panel behavior and animation timing, the Remember inscription, story layout, palette design, color blindness considerations, typography principles, the underlay mechanic

---

## 1. The Two-Panel Layout

All Curious Woods content — stories and interactives alike — uses a two-panel layout.

**Right panel:** The primary experience. Stories, narrative, the construction canvas for interactives. This panel is never interrupted by controls, images, or interface elements. It is pure content. Maximum 700px wide for text, centered in available space.

**Left panel:** The supporting presence. Images, illustrations, simple animations, palette, contextual tools, and the permanent Remember inscription. This panel exists to serve whatever is happening in the right panel without competing with it.

**The separator:** A single 0.5px vertical line between the panels in warm dark brown, approximately `#c8b89a`. Present enough to give the eye a clean edge. Invisible enough that the child never consciously registers it as a border.

**Tone:** The left panel is a slightly deeper tone of the parchment family — not gray, not a different hue, just richer. The right panel is the standard content parchment `#f4f1e8`. The tone difference encodes hierarchy: the right panel is where primary attention lives, the left panel is peripheral and supportive.

---

## 2. The Living Left Panel

The left panel is never a fixed container. It is sized exactly by its contents at every moment. It grows when something needs space. It contracts when that thing departs or is moved away.

**Resting state:** The panel's minimum width is defined by its two permanent anchors — the Tools word at the top and the Remember inscription at the bottom. Nothing else is present. The panel feels quiet and ready.

**Growth:** When content arrives — a palette, an image, a set of contextual options — the panel expands to hold it. The expansion is deliberate and paced, never mechanical.

**Contraction:** When content departs — the child moves the palette onto the canvas, an image fades, options are no longer relevant — the panel contracts back toward its resting width. The contraction is equally deliberate.

**Animation timing for panel width changes:**

- Width transition: 400ms ease-in-out
- Content inside fades in after panel reaches new size: 100ms delay, then 200ms ease-in
- The panel leads. Content follows. This sequence says "space is being made" rather than everything happening simultaneously.

---

## 3. Contextual Controls — The Marauder's Map Principle

Controls appear when they become possible. They recede when they don't apply. The child never sees a greyed-out option or a disabled button. The interface reflects only what is available right now.

**Controls are words, not buttons.** A border, background, and shadow say "I am a thing you press." A word that appears when something becomes possible says the same thing more honestly and more quietly. Once a child understands that words in the left panel are actionable, no button convention is needed.

**Typography for actionable words:** Payne's gray `#546A80`, 14px Georgia, left-padded 16px. On hover, a subtle warmth — not an underline, not a background change, just a very slight deepening of the color confirming the child's intention before the click.

**Appearance and disappearance:** Options fade in over 200ms ease-in when they become available. They fade out over 150ms ease-out when they no longer apply. Fast enough to feel responsive, slow enough to feel intentional rather than mechanical.

**The hover-expand pattern:** Some words reveal more words on hover. Tools expands to Show Save and Share below it. Save expands to reveal Save as Image and Save as Construction. These secondary words fade in and slide downward over 300ms ease-out on hover, with a 150ms delay before movement begins — long enough that casual cursor movement doesn't trigger expansion, short enough that intentional hover feels immediately responsive. On mouse-out, collapse over 200ms ease-in.

**What this communicates to the child:** The interface is reading the situation. It knows what you just did and what that makes possible. This is the same contextual awareness the child is developing mathematically — noticing what is true right now, what follows from what.

---

## 4. The Remember Inscription

This is vertically centered in the left panel, always present. It will move down to accommodate images or tools if necessary, but it is meant to convey a lasting presence.

```
I want to
Remember
this
```

**Typography:**

- "I want to" — `#3C5C83` dark blue, 17px Georgia
- "Remember" — `#b87333` copper, 20px Georgia
- "this" — `#3C5C83` dark blue, 17px Georgia
- Left-padded 16px, bottom-padded 24px

**Behavior:** This element does not fade, expand, animate, or respond to context. It is the one fixed point in an otherwise dynamic panel. Its stillness gives it a different quality from everything around it.

**Why it is always present:** This is not a tool. It is a reminder of who is in control of the learning. Every time a child sees it, even peripherally, it reinforces: this is yours, you decide what matters. The slight deliberateness required to move attention to the bottom of the panel and click is appropriate — this should never be accidentally activated.

**What it captures:** The inscription is context-sensitive in what it records, even though the gesture is always identical. In the geometry workspace it captures a construction method for the practice queue. In a story it captures a passage, image, or idea the child selects. The child makes one gesture of intention. The system understands what kind of thing it is and responds accordingly.

**Selection:** The child can click the inscription after selecting text in the right panel, or after clicking an image in the left panel, to mark exactly what caught her — not the whole story, but this sentence, this face, this moment.

---

## 5. Story Layout

**Right panel:** Pure narrative text. Georgia 20px, `#2a2620`, line height 1.4, paragraph spacing 1.4em. No images, no controls, no interruptions. The reading eye never has to negotiate.

**Left panel in stories:** Images and simple animations that correspond to what the narrative is currently describing. They fade in as the story reaches them and recede as it moves on. The synchronization is the connection — the child doesn't hunt for illustrations, they arrive in their natural moment.

**Opening state:** At the start of a story, before the first image is called for, the left panel shows a quiet visual motif related to the story's world. Not empty — present and waiting.

**Image behavior:** Images fade in over 300ms ease-in when the narrative calls for them. They fade out over 400ms ease-out as the story moves on. The fade-out is slightly slower than the fade-in — departure is more gradual than arrival.

**Simple animations:** Mathematical or historical animations relevant to the story appear in the left panel at their natural narrative moment, run once or loop gently, and depart with the same fade behavior as images.

**The Art Lab:** For content worth deeper exploration — a Vermeer painting, a rose window — the story does not attempt to contain the full experience. Instead a brief invitation appears at the story's end: an Art Lab interactive where the child can look closer, understand technique, understand history. Story creates curiosity. The Art Lab satisfies it for the child who wants more.

---

## 6. Palette Design for Glass

The color palette appears in the left panel when a closed region is highlighted in the geometry workspace. The panel expands to hold it. When the palette is moved onto the canvas by the child, the panel contracts back to resting width.

**Palette layout:** Small comfortable color chips, 3 wide as default, 4 wide if more than 12 colors. Palette name at top as the selection mechanism for switching between palettes — Gaudí, Chartres, Alhambra, Persian Tiles.

**Recipe line:** At the bottom of each palette, a single brief line describing how the currently selected color was made. For example: "cobalt oxide, reduced atmosphere, 800° for 10 hours." This was explained in the story. Seeing it here closes a loop quietly — the chemistry the child learned becomes the color she is choosing. Typography: 11px Georgia italic, `#2a2620` at reduced opacity, approximately 70%.

**Palettes available by default:** Gaudí, Chartres, Alhambra, Persian Tiles. Each has its own color story.

---

## 7. The Underlay Mechanic

Any construction canvas can have an underlay — a real-world image of stained glass, a Celtic knot, a tile pattern — visible at reduced opacity beneath the construction surface. The child sees a beautiful finished thing and attempts to reverse-engineer it using the available tools.

**This is not instruction.** No hint is given. The goal is visible. The tools are available. The gap between them is the learning.

**Difficulty calibration** happens through image selection without changing the tool. Simple Celtic knot for early sessions. Complex Alhambra tessellation later. Persian quasicrystal pattern for a child who is flying. The tool stays identical throughout.

**Opacity:** Underlay images appear at 20-40% opacity — present enough to guide, transparent enough that the child's own construction reads clearly above it.

---

## 8. Color Blindness Considerations

The existing palette — YInMn blue for lines, copper for points, parchment ground — handles the most common forms of color blindness reasonably well because elements differ in both hue and luminance, not hue alone. Position, weight, and texture do work alongside color throughout.

**The stained glass palettes** are where care is needed. Palettes that combine reds and greens should ensure sufficient luminance contrast between adjacent regions so that the geometry of the construction remains fully legible regardless of color perception. The construction itself — the lines and forms — must never depend on color discrimination to be readable.

**A child who cannot distinguish certain fills** may be drawn more strongly toward the formal geometry of the construction. This is not a bad outcome.

---

## 9. Child Data and Portability

The child's history — constructions attempted, stories visited, practice queue state, preferences — is stored locally on her device. No server holds it. No account is required.

**Portability:** The child's history can be exported as a text file she owns and carries. When opening the application on a new device, she drags the file in to reintroduce herself. Her data moves with her because she carries it.

**What this teaches:** That personal data is a thing you can hold, move, and control. Most children have no idea this is possible. Learning it here, in a context where the data is genuinely theirs, is worth something beyond the convenience.

**Saving constructions:** A finished construction can be saved as an image for sharing with family. It can also be saved as a construction file for reopening and continuing. Both are local. An image sent to a grandparent requires nothing more than the child's usual means of sharing a photo.

---

## 10. Animation and Timing Reference

| Element | Action | Duration | Curve |
|---------|--------|----------|-------|
| Left panel width | Expand or contract | 400ms | ease-in-out |
| Panel content | Fade in after panel settles | 100ms delay + 200ms | ease-in |
| Contextual options | Appear | 200ms | ease-in |
| Contextual options | Disappear | 150ms | ease-out |
| Tools expansion | Hover delay | 150ms | — |
| Tools expansion | Words arrive | 300ms | ease-out |
| Tools collapse | Words depart | 200ms | ease-in |
| Story images | Fade in | 300ms | ease-in |
| Story images | Fade out | 400ms | ease-out |
| Remember inscription | Any animation | none | — |

---

## 11. What This Document Does Not Cover

- Color palette hex values and CSS variables → Interface Foundation
- Maya conversation UI → Interface Foundation
- Typography specifications → Interface Foundation
- Geometry canvas interaction model → Geometry Workspace Overview
- Maya's canvas presence and emotional intelligence → Maya Presence Spec

---

## 12. Related Documents

- `00-FOUNDATION/Interface-Foundation.md` — color, typography, Maya UI
- `00-FOUNDATION/CW-System-Foundation.md` — philosophy and cognitive modes
- `10-PROJECTS/Geometry/Geometry Workspace Overview.md` — construction environment
- `10-PROJECTS/Planned-Interactives.md` — full interactive roadmap
- `30-SKILLS/SKILL-Story-Developer.md` — story craft principles _(to be created)_
