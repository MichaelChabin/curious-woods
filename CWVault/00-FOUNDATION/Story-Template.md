---
status: Revised April 2026 (v4.0)
role: Authoring template for Curious Woods stories
---

# Story Template — The Universal Pattern

A story in Curious Woods is not fiction for its own sake. It is a context-provider that sets up a problem or situation which exercises one or more of the platform's Intuitions (see [The-Intuitions.md](The-Intuitions.md)). Every story in the system follows the pattern below.

## Every Story Must Name

Before drafting, every story should answer these three questions in a short header block. If an author can't answer them, the story isn't ready to write.

```
Intuitions served:     # from The-Intuitions.md
                       # e.g., #10 (Modeling), #13 (Historical sweep), #15 (Holding a worldview)

Design principles:     # from Design-Principles.md — note any that especially shape this story
                       # e.g., day-in-the-life; process over conquerors

Voice notes:           # anything specific to this story — character perspective, tone, pitfalls to avoid
```

These three lines become the story's compass. If the draft drifts from them, the draft is wrong — not the header.

---

## Voice and Stance — Non-Negotiable

### Talk to the child as an adult.

Never talk down. No sing-song. No cutesy diminutives. No forced exclamation marks. No "let's explore together!" voice. If a word is specific and right, use it — children are more capable with language than most adult writers assume.

### Never assume prior knowledge unless the story has provided it.

If a story mentions a concept, person, or place, teach it inside the story or write the story so the reader doesn't need it. Don't gate entry on unstated prior knowledge. A child who doesn't know who Voltaire is shouldn't be locked out of a story that name-drops him.

### You like this kid.

The voice is warm, curious, affectionate — the voice of a trusted adult who delights in a child's mind. Not saccharine. Not ironic. Honestly fond. The reader should feel read *to*, not read *at*.

### Honest about the past.

Daily life in most times was not great. We do not romanticize. We also do not dwell on gruesomeness for effect. Specific and fair, the way one might talk about a real ancestor whose life was difficult but whom one loves anyway.

---

## Authoring Rules

(See `Design-Principles.md` for the full set. The ones that most shape stories:)

- **Process over product, makers over conquerors.** Favor Faraday in his basement, Lavoisier weighing gases, Ada Lovelace seeing what Babbage's machine could become. Avoid framing stories around conquerors or power-famous men.
- **No wars as scaffolding.** Wars are what happen when civilization collapses. They are not our organizing frame for history.
- **Day-in-the-life over empire.** A Sumerian scribe counting grain. A Florentine glassmaker mixing colors. A Warring States philosopher walking to meet a student. Inside a worldview, not above it.
- **Stories serve intuitions.** Named in the header block. If a story can't name which intuitions it seeds, it isn't ready.

---

## The Five-Page Pattern

Every story unfolds across five pages: **WHAT → WHERE → WHEN → STORY → WHY**.

### Page 1 — WHAT (The Hook, 3–5 seconds)

A single full-screen image that raises an immediate question. No body text. Minimal overlay if any. The child taps anywhere to continue.

Purpose: instant curiosity — the image should make the child want the next page.

**Examples:** a train through a station wall; a petri dish with a ring of clear glass; a geometric pattern that seems impossible.

### Page 2 — WHERE (Place, 3–5 seconds)

A single full-screen image that establishes the setting. Simple text overlay naming the place. Tap to continue.

Purpose: ground the story in a physical world. Place before time, because place is sensorial.

**Examples:** an alley in Kyoto with autumn leaves; Alexandria harbor at dawn; the inside of a glassmaker's workshop.

### Page 3 — WHEN (Time, 5–8 seconds)

A timeline animation placing the moment in context — historical, cosmic, seasonal, developmental, whatever the story needs. Brief, elegant, informative.

Purpose: build intuition #13 (historical sweep). Not dates as trivia — *a mental landscape of eras*.

**Examples:** October 22, 1895 on a 1890s Paris timeline; 300 BCE with Rome and Han China both visible at the same moment; spring equinox on an annual cycle.

### Page 4 — THE STORY (Scrolling Prose)

The main reading experience. Story text in a comfortable column, with Maya accessible via a button in the left area.

**Layout:**

- Text column: fixed 500–600px, anchored right, regardless of screen size.
- Left area: Maya button, always visible during scroll. Maya window opens in this area and can be resized.
- iPad landscape (1024×768) is the primary target. Larger screens grow the left area, not the text column.

**Typography:**

- 20px Georgia.
- 1.4 line-height (28px), tight and editorial.
- 1.4em paragraph spacing.
- 50–75 characters per line — optimal for parafoveal reading.

**Embedded visuals and small interactives:**

- Width ≤ 600px so they fit in the text column.
- Photos, simple diagrams, small draggable demos.
- Used to illustrate, not to replace, text.

**Length guidance:**

- Event stories: ~1000 words.
- Puzzle stories: ~500 words.
- Extended stories: broken into chapters, each structured the same way.

### Page 5 — WHY (Full-Screen Interactive)

The exploration that follows the story. **Default: this is Glass (or whichever flexible interactive the platform already has), loaded with graphics, parameters, or seed geometry appropriate to the story.** Bespoke tools are the exception, not the rule.

Why this default: the platform's architecture is *few flexible interactives, many contexts* (see Design-Principles.md). The child learns that the same tools solve wildly different problems — which is itself an intuition (#3, multiple representations). A story about perspective drawing loads Glass with vanishing-point scaffolding; a story about frequency loads Glass with a waveform overlay. Same tool, different skin, same cognitive moves.

Build a bespoke interactive only when:

- The flexible interactive genuinely cannot do the job.
- The cognitive move the story sets up is fundamentally different from what Glass supports.
- You've tried the flexible route and it's forced.

**When the full-screen page is worth it** (regardless of tool):

- Coordinate or geometry exploration needing zoom, pan, and large workspace.
- Multiple signal displays or time-series data.
- Any tool where a 500–600px column would crush the interaction.

**When to embed in Page 4 instead:**

- Small demonstrations that enhance reading.
- Photos and illustrations.
- Interactions that are illustrative, not exploratory.

---

## Maya Across Pages

See `Mayas-Map.md` for Maya's stance and role.

**Pages 1–2:** No Maya. Brief, immersive, no conversation yet.

**Page 3:** No Maya. The timeline should be clean.

**Page 4:** Maya button active in the left area. The child can ask about anything in the story. Maya knows the story, its embedded visuals, and what's coming in Page 5.

**Page 5:** Maya button active. The child can ask about what the interactive is showing. Maya connects discoveries back to the story and suggests related stories or variations.

Maya's role is not to teach; see Mayas-Map.md. She is the protector of wonder, not a dispenser of answers.

---

## Anti-Patterns

### Don't make it "educational"

- ❌ Page 1: "Today's lesson: Momentum and Energy"
- ✅ Page 1: a stunning photograph of a train through a wall

### Don't use childish design

- ❌ Cartoon mascots guiding the reader
- ✅ Professional photography and typography

### Don't clutter the flow

- ❌ Sidebars, callouts, fun-fact boxes scattered through the text
- ✅ Clean prose, embedded visuals at natural points

### Don't force complex interactives into the text column

- ❌ A coordinate plane squeezed into 600px
- ✅ Conclude the story, link to full-screen Page 5

### Don't prescribe navigation

- ❌ "Click here to continue" buttons throughout
- ✅ Natural scroll, tap-anywhere on Pages 1–3

### Don't separate context from tools

- ❌ "Here's a math tool" with no story
- ✅ Story creates curiosity; tool enables exploration

### Don't build on conquerors or great-men-of-power

- ❌ A story about the Silk Road framed through Genghis Khan's conquests
- ✅ A story about the Silk Road framed through a Sogdian merchant's day

### Don't use war as the scaffolding of history

- ❌ A story about Tudor England framed as Henry VIII's wars
- ✅ A story about Tudor England framed through a shipbuilder's craft, or an illuminator's workshop

### Don't presume prior knowledge the story hasn't provided

- ❌ "Like Voltaire's wit, this argument…"  (assumes the reader knows Voltaire)
- ✅ Either introduce Voltaire in two lines, or drop the reference

### Don't pre-chew meaning

- ❌ Paragraph-then-explanation-of-paragraph pattern
- ✅ Trust the reader. Let re-reading do its work. (This serves intuition #12.)

---

## Examples

### Event Story — The Montparnasse Train Crash

```
Intuitions served:   #2 (Functional thinking), #5 (Approximation), #10 (Modeling), #11 (Measure by counting)
Design principles:   honest about the past; day-in-the-life (train driver, station staff)
Voice notes:         A specific accident, specific people. The driver is not a villain — the
                     brake system failed. Treat him and the station workers as competent adults.
```

**Page 1 (WHAT):** The famous photograph — locomotive nose through the station wall, suspended above the street. No text.

**Page 2 (WHERE):** Photograph of Montparnasse Station, Paris. Overlay: "Montparnasse Station, Paris."

**Page 3 (WHEN):** Timeline of 1890s Paris. October 22, 1895 highlighted. Brief animation showing the technological context.

**Page 4 (STORY):** The approach from Granville. The brake failure. The moments on the platform. The aftermath and investigation. Embedded historical photo. Small draggable demo: speed-vs-stopping-distance.

**Page 5 (WHY):** Glass (or a momentum overlay on Glass) with a train-and-wall scenario. Adjust mass and speed; see kinetic energy. Maya asks: "What happens when you double the speed?"

---

### Day-in-the-Life — The Glassmaker of Florence (reframed example)

```
Intuitions served:   #1 (Geometry as numbers), #10 (Modeling), #13 (Historical sweep),
                     #16 (Process over conquerors)
Design principles:   day-in-the-life; process over product; honest about the past
Voice notes:         Maria works hard and the work is beautiful. Her life is not romanticized —
                     the furnace is hot, the hours are long, lead is poisonous. But the craft
                     is real and she is proud of it.
```

**Page 1 (WHAT):** A fragment of stained glass catching morning light.

**Page 2 (WHERE):** A Florentine workshop, shutters open, furnace glowing.

**Page 3 (WHEN):** A timeline showing Renaissance Italy, with attention to everyday life, not dynasties.

**Page 4 (STORY):** Maria's day. The fire. The mixing of colors (a little chemistry, inside the story). Cutting lead came. The geometry of a rose window. Small embedded diagram of a simple construction. The price of her work and who buys it.

**Page 5 (WHY):** Glass, pre-loaded with a rose-window scaffolding. The child can construct her own.

---

## Maya Context (deferred)

Every story will eventually need a small data file telling Maya what the story contains, what's embedded, and what natural follow-ups exist. The structure of that file is **not** part of this template — it belongs in an implementation spec once Layer 2 (Maya) is unblocked. For now, authors can note key story elements in prose in the story's design doc.

---

## Technical Implementation (high level)

- No build step; vanilla HTML/CSS/JS.
- iPad landscape is the primary target; scales to desktop.
- Pages 1–3 load instantly (minimal content).
- Page 4 lazy-loads images as the reader scrolls.
- Page 5 loads on demand when the reader advances.
- Accessibility: keyboard navigation, screen reader support, optional TTS.

---

## Version History

### v4.0 (April 2026)

- Added required header block: *Intuitions served, Design principles, Voice notes.*
- Added *Voice and Stance* section (adult-level, unprovided-prior-knowledge, affection, honest-about-past).
- Added *Authoring Rules* section referencing Design-Principles.md.
- Reframed Page 5 around Glass-with-graphics as default; bespoke tools as exception.
- Added anti-patterns: great-men framing, war-as-scaffolding, hidden prerequisites, pre-chewed meaning.
- Replaced Mary Rose example (warship/sinking frame) with a day-in-the-life Florentine glassmaker example.
- Deferred the detailed maya-context.json schema to a future implementation spec.
- Trimmed file-structure and implementation sections to high-level notes.

### v3.0 (February 16, 2026)

- Updated to five-page pattern (WHAT/WHERE/WHEN/STORY/WHY).
- Added WHAT page (the hook) and WHY page (connected to Geometry Workspace).

### v2.0 (January 27, 2026)

- Restructure around three-page pattern (WHERE/WHEN/STORY).
- Fixed text column at 500–600px; elastic Maya area.

### v1.0 (January 26, 2026)

- Initial two-column layout with Maya on the right.
