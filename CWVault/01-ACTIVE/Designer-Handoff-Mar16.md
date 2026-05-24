# Designer Handoff — March 16, 2026

**From:** Designer Chat (this conversation)
**To:** Next Designer Chat
**Supersedes:** Designer-Context-Mar5.md, Handoff-Designer-Mar5.md
**Purpose:** Complete picture of design decisions and new ideas from the March 8–16 sessions.

Read this document first. Then read Current-Status.md for implementation state,
and Road-to-Demo-Mar8.md for the dependency map.

---

## What the Designer Chat Is For

Design decisions, visual language, interaction philosophy, and architectural thinking.
Not implementation. The Designer works out what something should be and why before
the Coder builds it. The Layout Manager handles visual development and prototyping
of UI components.

---

## Settled Design Decisions (March 8–16)

### Constructions Panel
Replaces the Drawing Guide tool entirely. The SVG tracing overlay was retired —
precision mismatch between the overlay and the geometry engine is fundamental and
cannot be cleanly resolved. The Constructions panel is the replacement.

Full spec: `Handoff-Coder-Mar16.md` — that document is the authoritative source
for implementation. Key decisions:

- Playback is **child-controlled navigation**, not automatic timed playback
- Child taps forward and back through significant steps
- "Show me" leads to "try it" — a sequence, not parallel options
- Pause points are **curatorial decisions** marked in the operation log by Eileen
- Ghost overlay ("try it") has no sliders — fixed opacity, fixed size

### Demo Testing and Data Collection
Full spec: `Note-Demo-Testing-Mar8.md`

Key philosophical decision: **show the child what data was collected before asking
permission to share it.** This is pedagogically intentional — it teaches data agency.
The summary card ("you spent 14 minutes, made 2 constructions, used the Chartres
palette…") is not just disclosure, it's an experience.

Privacy line: no identity data ever. Behavioral data (anonymous) with explicit opt-in.

### Integer Labels and Axis System
Full spec: `Handoff-Mar16-Numbers.md`

The numbers system is complete and deployed. The philosophical framing matters for
future design decisions:

- "You can put 0 and 1 anywhere you like. After that, everything falls into place."
- Labels are **map convention** — all positive in all directions. Not arithmetic.
  Euclid would accept this. A child can construct squares without explaining why
  -3 × 3 isn't a square.
- The y-axis is **earned** — the child must construct a perpendicular through 0.
  Numbers appear as a reward for the construction.
- This is not a coordinate system imposed from outside. It is a property of space
  that geometry summons.

This framing should inform any future work involving numbers, coordinates, or
labeling anywhere in CW.

### Cursor Vocabulary
Full brief: `Note-CursorVocabulary-Mar8.md`

The cursor communicates intent, not personality. Four things to express: state of
readiness, type of gesture (tap vs drag), phase within a gesture, and consequence
imminent. Copper for acts that create; Payne's gray for acts that select or modify.

**The cursor is Maya's only physical representation.** Design it like a character,
not a pointer. A child who has learned to read the cursor forms from curated demos
will already understand Maya's demonstrations. We are building a shared language.

**Touch magnifier:** On touch interfaces, implement a magnifier with crosshairs
offset above and slightly left of the touch point. Appears only near snappable
points. 2–3× magnification. Solves the fat-finger problem and fits the cursor
vocabulary — it is Maya's attention made visible.

**Status:** Layout Manager is developing the visual forms. Coder waits for spec
before implementing. One exception: touch magnifier can be built now.

### Demo Playback
Full spec: `Note-DemoPlayback-Mar8.md`

Child-controlled navigation. Pause points defined by curator. Dwell time per step
is behavioral data — capture it in session hooks. The relationship to Maya:
curated demos are pre-recorded answers to a question we're guessing at; Maya's
future demonstrations will be live answers to inferred questions. Build the
curated system in a way that doesn't prevent the generative system.

---

## New Design Territory (March 16) — Not Yet Specced

These ideas emerged in conversation today. They are not yet in any implementation
document. They need design sessions before they become Coder tasks.

### The Glass Family — Constrained Variants

Glass is not one interactive — it is a **family of experiences sharing an engine**.
The full construction tool is the richest member. Others are constrained or inverted
versions that each illuminate something the full tool doesn't foreground.

**Circles-only variant:**
- Only the drag gesture works; tap-tap is disabled
- Intersections appear automatically
- Enclosed regions auto-fill
- A complete, self-contained experience
- Teaches: intersections appear on their own, without asking; geometry does something
- The most surprising thing about the tool lands cleanly before anything else arrives

**Lines-only variant:**
- Only tap-tap works; drag is disabled
- Start with four asymmetrical seed points (not two)
- Four asymmetrical points generate a rich set of intersections quickly
- The child is already in the middle of something before she starts
- Teaches: lines create intersections; intersections create regions

**Maze variant:**
- Child removes segments from a complete filled grid rather than building up
- Subtraction rather than addition — a different cognitive act
- Teaches something different about structure than construction does

**Kaleidoscope variant — NEW, significant:**
- The construction engine already knows how to reflect across a line
- A mirror in a kaleidoscope is just a line of symmetry
- Child constructs a small region, places a mirror line, construction reflects
- Second mirror at an angle: four copies. Third mirror: multiplies
- The angle between mirrors determines the symmetry of the result
- Two mirrors at 60° → sixfold symmetry → same geometry as the hexagon
- Child discovers this by doing, not by being told
- **Story arc:** colored glass → mirrors → kaleidoscope → the rose window is a
  kaleidoscope you can walk into
- The virtual tube framing gives the child permission to think of this as play
- This is probably the most compelling near-term addition to the Glass family

### The Coding Strategy This Implies

If the tool is built as proper objects/modules (cursor object, construction engine
object, palette object), then each constrained variant is just the full tool
instantiated with different parameters. Circles-only = construction engine with
line gesture disabled and auto-fill on. This is the payoff of object-oriented
thinking for CW specifically.

The Coder is likely already aware of this direction. The friction comes from
building new habits. Worth mentioning gently, not prescriptively.

### Mini Interactives as Story-Integrated Tool Introductions

A story with a substantial tool at the end can introduce the tool's elements
through small, self-contained interactives embedded in the story pages.

By the time the child reaches the full tool, she isn't learning how to use it —
she's recognizing things she already knows.

**For the sound analyzer story (example):**
- Early in story: mini interactive — tap a key, see a wave. Just the visual shape
  of sound. No controls.
- Later: compare two waves — which is taller, which is more compressed. Still no
  analysis.
- Full analyzer arrives: she already has a felt relationship with waves as visual
  objects. The analyzer isn't new — it's the thing she's been looking at, with
  more depth.

**The coding implication:** Each mini interactive is the full tool with most of
its surface hidden. "Show only the wave display" = instantiate the tool with
analysis controls disabled. The story controls what's visible. The engine is
always complete underneath.

**This is complete in itself.** The mini experience is not a tutorial. It doesn't
gate access to the full tool. A child might spend twenty minutes with circles
alone and never feel she's being prepared for something else.

### The Dashboard Ecosystem

The child's dashboard should feel like a real place, not a lesson sequence.
The mixture matters:

**Short pieces** (5 minutes or less):
- Single striking image with a single question — Eta Carinae, an optical illusion
- These are *moments*, not stories
- They maintain the child's relationship with the platform between deeper experiences
- Built differently from stories — no five-page structure needed

**Deep stories** (substantial, with tools):
- The Glass story is this category
- The sound analyzer story is this category
- Arrive less frequently but stay longer

**The interplay:** Short pieces mean the child opens CW on a Tuesday afternoon
with twenty minutes, finds something worth her time, and comes back. Without them
the platform is only for long sessions.

### Glass Extensions Worth Speccing Soon

Quick list generated in conversation — each is a design session, not yet a spec:

- **Filters and polarizers** — light as selective transmission; stack colored
  filters, predict the result. Chemistry already in palettes points here.
- **Mosaics** — filled regions without construction lines (Glass mode already
  exists as a toggle); tessellation is the natural next step → connects to Tiles
- **Stained glass as code** — fill regions to match a reference window;
  constraint as a different kind of freedom
- **Kaleidoscope** — described above; probably first priority in this list

### Physics Simulation — Ropes, Webs, and Gaudí's Chains

**Feasible, not particularly difficult, and belongs in the Glass family.**

The idea: the geometric constructions the child builds — lines, segments, the
connected graph of her work — are treated as a physical structure under gravity.
Switch on physics and the construction relaxes into whatever shape gravity and
tension demand. Switch it off and it snaps back.

**Two distinct modes:**

*Gravity / hanging chains:*
Points have mass. Segments become springs or rigid rods. Gravity pulls everything
down. The construction relaxes — straight lines become curves, polygons sag and
droop. The result looks like spider web, lace, or a net.

The Gaudí connection is exact and profound. He used hanging chains to find the
ideal shapes for arches — an inverted catenary experiences only compression, never
bending stress. He was using physics as a computational tool a century before
computers. A child who builds a construction, switches on gravity, watches it
collapse into curves, then flips it upside down and sees an arch — has just
discovered what took Gaudí years of physical modeling.

*Tension / web structure:*
Threads pulled taut between anchor points. The geometry emerges from balance of
tensions rather than gravity. Different phenomenology from hanging — where gravity
sags, tension pulls tight and creates geometric forms. A spider web is this.

**Why this is feasible:**
Physics simulation of this kind (spring-based or constraint-based) is well-understood
and runs comfortably in a browser in JavaScript. The construction engine already has
the necessary ingredients — points with positions, segments connecting them. Adding
mass, velocity, and a simulation loop is not architecturally complicated. A working
prototype is probably one session for a capable Coder.

**Story arc this enables:**
Colored glass → Gothic windows as Euclidean geometry → Gaudí inverts everything →
his arches discovered by hanging chains → here, try it yourself.

This is the most direct connection between the abstract geometry the child has been
building and the physical world she lives in. The geometry acquires weight. That
transition is the kind of surprise that makes mathematics feel real rather than invented.

**Not for the first demo. But soon after.**

---

## Open Design Questions

These are unresolved and need attention. Some need a session; some need Michael
to make a call.

| Question | Status | Notes |
|----------|--------|-------|
| Rating scale for exit survey | Designer decision | Stars feel childish; word scale ("frustrating · okay · good · great · wonderful") may fit CW better |
| Canvas clear before demo plays? | Open | Clearing is cleaner; keeping work lets child compare. Probably clear for first demo. |
| "Stop" mid-playback — leave or clear? | Open | Leaving lets child explore partial construction |
| Canonical vs inherited view during replay | Open | Fixed seed scale or whatever child was at? |
| Framing page for demo | Michael's call | Yes or no; what it says |
| Mute control location and wording | Designer | Should be in Tools menu, consistent with "words not buttons" |
| Starter set of 3 constructions | Michael + Eileen | Suggested: triangle, hexagon, nested squares |
| Airtable vs Google Form as survey receiver | Michael | Needed before exit survey can be implemented |
| "How this works" wording | Voice pass needed | Current draft is functional, not yet the right voice for a child |
| Cursor during child's own construction | Layout Manager | Should cursor be visible always or only during demos? Try both. |

---

## Things to Add to Notes Documents When Time Allows

- Touch magnifier → add to `Note-CursorVocabulary-Mar8.md`
- Object-oriented direction → add note for PM and Coder
- Kaleidoscope concept → new design note
- Mini interactives pattern → new design note
- Dashboard ecosystem thinking → new design note or Foundation update
- Glass family map → new design note listing all variants with brief descriptions

---

## The Framing Sentence Worth Preserving

From today's conversation, on kaleidoscopes:

> "The rose window is a kaleidoscope you can walk into."

This is the story arc for that piece. Don't lose it.

---

## Voice and Philosophy Reminders

These are not new but worth restating for a fresh Designer session:

- **Children are intelligent.** CW does not condescend. The visual language —
  parchment, Georgia, Payne's gray, copper — signals seriousness, not cuteness.
  Primary colors and cartoon fonts are not the answer.
- **The child's work is the most colorful thing on screen.** Her stained glass
  construction, not the interface, should be what you remember when you close the app.
- **Words not buttons.** Controls are words in the same Georgia register as
  everything else. The Marauder's Map principle.
- **Cute for its own sake is always wrong.** Applies to cursors, animations,
  sounds, Maya, everything.
- **The connection to the tool must feel inevitable, not instructional.** A child
  arrives at Glass through a story about colored glass. The tool is what she
  reaches for next, not what she is handed.

---

## Documents Written This Session

| Document | Purpose |
|----------|---------|
| `01-ACTIVE/Current-Status.md` | Updated — complete picture of built state and all decisions |
| `01-ACTIVE/Next-3.md` | Updated — current priorities |
| `01-ACTIVE/Road-to-Demo-Mar8.md` | New — dependency map for demo release |
| `01-ACTIVE/Note-Demo-Testing-Mar8.md` | New — session hooks, data summary card, exit survey |
| `01-ACTIVE/Note-DemoPlayback-Mar8.md` | New — child-controlled navigation, pause points, dwell time |
| `01-ACTIVE/Note-CursorVocabulary-Mar8.md` | New — brief for Layout Manager |
| `01-ACTIVE/Handoff-Coder-Mar16.md` | New — reconciled coder handoff, supersedes two earlier docs |
| `00-FOUNDATION/Session-Protocol.md` | Updated — interim session notes added as standard practice |
| `01-ACTIVE/Designer-Handoff-Mar16.md` | This document |
