
## BRIEF (read this, skip the rest if you're building)

Status: Full design vision complete. Layer 1 built and being revised. Layer 2 in spec.  
Last updated: February 23, 2026

Story library: [[10-PROJECTS/Geometry/Geometry-Story-Library]] — confirmed content direction,
  9 stories mapped to specific constructions. Stained Glass in active development.

What exists:
- Two gestures: tap-tap (infinite line), drag (compass) — universal, permanent
- Lines are infinite by definition — no finite segments, no extension gesture
- Canvas opens with two bare unlabeled seed points — no initial segment, no labels
- Scaffold toggle: double-tap any line or circle to fade it (20-25% opacity)
- Intersection detection: automatic, immediately usable
- Point birth animation + six synthesized sounds (Web Audio API)
- Undo/clear: single tap empty space / double-tap empty space
- Maya: gradient blob particle system (Payne's gray + copper), not a character
- Full emotional intelligence framework for Maya's responses

Developmental arc (decided):
1. Equilateral triangle — learn gestures, discover intersections
2. Number line — construct units, discover negatives
3. Coordinate plane — perpendicular through 0, unit circle gives y-axis
4. Sandbox — ongoing, free construction, coloring, beauty

Key decisions:
- No deletion — scaffold toggle (reversible fade) replaces hiding
- Unit circle is permanent canvas resident
- Child builds the coordinate plane; it is not handed to her
- Maya shares responsibility; child is never alone with the mathematics
- Seed points unlabeled (labels are a future discovery moment)
- Lines 0.5px default, click logical segment to emphasize at 2px

Cognitive modes recruited (see [[00-FOUNDATION/CW-System-Foundation]]):
- Equilateral triangle walkthrough → Curiosity + Focus
- Sandbox free construction → Making (flow state)
- Discovering relationships in constructions → Pattern Recognition
- Spacing between sessions → Consolidation

Read the full document for: complete session walkthroughs, Maya's three voices,
coloring closed regions, sandbox design, what the plane makes possible

---

## A Synthesis Design Document

_Capturing the vision developed in conversation, February 2026_

---

## The Core Idea

A child starts with two points and two gestures. From these, she constructs the entire coordinate plane — and everything that lives on it. The interface never changes. The questions get deeper.

This is not a geometry app with multiple modes. It is a construction environment in which mathematics gradually reveals itself.

---

## The Canvas

A warm, textured surface — like good paper. Not white, not grid-lined. Pannable and zoomable, with world-space coordinates so that constructions stay fixed when the view moves. Objects on the canvas capture interaction first; empty space defaults to pan. Mouse and touch are both supported (drag to pan, wheel or pinch to zoom).

The canvas accumulates the child's work across sessions. When the child returns, her constructions are there. Each session may start fresh for structured activities (rebuilding the number line from 0 and 1 is valuable repetition), but the sandbox preserves everything.

---

## Two Gestures

Everything is built from two actions that mirror the only two tools Euclid had:

**Tap-tap: the straightedge.** Tap one point, then tap another. An infinite line appears through them, extending across the entire canvas in both directions. During the move from first tap to second, a ghost line previews the result — also infinite. A line is infinite by definition; there are no finite segments and no extension gesture. The two tapped points define the line's position and direction, not its endpoints.

**Drag: the compass.** Press on an existing point and drag. A ghost circle grows, centered on the pressed point, with radius extending to wherever the drag reaches. The circle snaps to existing points as the radius approaches them — the target point brightens, confirming the snap. Release while snapped, and the circle commits. Release in empty space, and the ghost fades — no arbitrary circles allowed. Every circle passes through a meaningful point.

**Tap on an intersection** that the system has detected (shown as a glowing available point) makes that intersection into a real, permanent point.

**Double-tap on a line or circle** toggles it to scaffold opacity (20-25%) — visually faded but geometrically active. Intersections still detect, snap still works. Double-tap again to restore. This is how the child reveals the finished form beneath the construction scaffolding.

---

## Three Feedback States

These are universal across all activities:

- **Highlight** — "This is active." A selected point or segment brightens subtly, confirming the child's attention is registered.
- **Glow** — "This is available." Intersection points pulse gently when they exist. Valid snap targets intensify as the drag approaches. Objects that can be interacted with signal their availability.
- **Ghost preview** — "This is what will happen." During any construction, a translucent preview shows the result before the child commits. Ghost lines stretch between points during tap-tap. Ghost circles grow during drag. Nothing is permanent until the gesture completes.

---

## Sensory Grammar of State

The child moves through cognitive states during a session: observing, selecting, constructing, evaluating. These states are reflected through ambient cues — not explicit mode labels, but subtle shifts in the environment:

- **Color temperature** of the canvas shifts subtly between states — warmer during observation and evaluation, slightly cooler during active construction.
- **Ambient tone** — a barely perceptible sound environment that shifts quality with the child's activity. Selection produces a quiet, clear tone (like touching glass). Construction confirmation is a gentle chord resolving. Evaluation has a warmer, settled quality.
- **Maya's presence light** — a soft, breathing glow at the edge of the canvas. It brightens when the child touches the canvas (Maya is attentive). It settles when the child is still. It's alive without demanding attention.

These cues reinforce cognitive state transitions subliminally. The child never consciously thinks about modes — she feels the shifts the way you feel light changing through the day. Whether these ambient cues measurably affect learning is an open research question worth investigating seriously.

---

## Maya: Shared Responsibility

Maya (Claude, the Guide) is not an instructor. She is a partner. The child steers; Maya ensures they don't hit rocks. The child knows, at all times, that Maya is there — that she shares responsibility for the interaction and will ensure it comes out well. This security is what allows genuine exploration.

### Maya's Three Voices

**Words.** Maya speaks sparingly. She names what the child builds ("A circle centered on zero, through one"). She states mathematical facts made visible by the construction ("Every point on that circle is the same distance from zero"). She asks questions that open doors ("What's on the other side of zero?"). She does not say "good job." She does not lecture. She waits, observes, and speaks when speaking adds something.

**Canvas marks.** Maya can draw on the canvas — temporary, translucent illustrations that fade after a few seconds. Ghost segments showing equal distances. A brief pulse highlighting an intersection. A fading circle suggesting a construction the child might try. Maya's marks have a visually distinct quality from the child's constructions — softer, luminous, clearly temporary. The child always knows "I made this" versus "Maya showed me this." Nothing Maya draws persists unless the child reconstructs it herself.

**Highlighting.** Maya can briefly brighten or pulse existing objects the child has already built, drawing attention to relationships. Two segments pulse simultaneously to show they're equal. A circle brightens to remind the child it's available for a new purpose.

### Maya's Pacing

When the child might discover something, Maya gives them a beat to see it. Not a long uncomfortable silence, not an immediate hint. Just a breath. If the child sees it, the discovery is theirs. If they don't, Maya helps — gently, without judgment. The child who discovers feels brilliant. The child who is shown feels guided, not corrected.

When the child is working confidently, Maya may say nothing for minutes. Her presence light breathes steadily. The ambient security of having a partner is itself a form of support.

When the child is stuck or drifting, Maya intervenes early and lightly. Not "you made a mistake" but "we're in an interesting spot — here's a thought." A ghost mark on the canvas. A brief question. The intervention is collaborative.

### Scaffold and Cleanup

The child can fade construction scaffolding herself — double-tap any line or circle to toggle it to scaffold opacity (20-25%). The construction fades visually but remains geometrically active. Double-tap again to restore. This lets the child reveal the finished form beneath the scaffolding without asking anyone.

When Maya is present (Layer 2+), she can also suggest cleanup: "Want to see just the shape?" But the child always has direct control through the double-tap gesture. The child can show the beautiful result _and_ demonstrate how she built it by restoring the scaffolding.

---

## The Developmental Arc

### Session One: The Equilateral Triangle (Sandbox)

The child meets the canvas for the first time. Two bare points on an empty parchment surface. Nothing else. She learns the two gestures by building Euclid's first proposition — two circles that intersect, an infinite line through the intersection points and the originals, forming an equilateral triangle. She experiences the feedback states, hears the construction sounds, hears Maya name what she's built, and discovers that constructions have consequences (circles intersect; intersections become points; points connect into shapes).

This session is play. The child may build more shapes, experiment with circles, fade her construction lines to see the finished forms. The goal is fluency with the gestures and comfort with the environment.

### Session Two: The Number Line

Starting fresh with 0 and 1, the child draws an infinite line through them and marks off equal distances using circles — constructing 2, 3, 4 to the right. Maya suggests the other direction. The child builds -1, -2, -3 to the left, inventing or discovering negative numbers in the process. Each point is labeled as it's created — the child is counting, and the labels confirm what she already feels.

The unit circle (centered on 0, through 1) remains on the canvas. It helped find -1 without new construction. It will keep giving.

### Session Three: The Coordinate Plane

Starting again with 0 and 1, the child rebuilds the number line (valuable repetition — faster and more confident each time). Then Maya suggests "up." The child constructs circles centered on 1 and -1, each through the other. These intersect directly above and below 0. The child connects the intersections — a vertical line through the origin, perpendicular to the number line.

The unit circle gives the first vertical unit points for free — it intersects the new vertical axis one unit above and below 0. The child marks off units on the vertical axis using the same circle technique. The coordinate plane is born.

Maya animates the grid: circles bloom along the x-axis, generating verticals; then along the y-axis, generating horizontals. The child recognizes every step — Maya is doing what the child already knows how to do, just faster. The grid fills in, lighter than the axes, clearly secondary. The child built the structure. The grid is convenience.

### The Sandbox (Ongoing)

Available from the beginning, running in parallel with structured sessions. The child can always go to the sandbox and just _make things_. Early sandbox work builds gestural fluency. As the child's skills grow, sandbox constructions become more sophisticated — recursive subdivision, tilings, symmetry patterns, fractal structures.

In the sandbox, Maya's role shifts from guide to appreciative companion. She names mathematical structures the child discovers through play ("That's a Sierpinski triangle"). She points out properties ("Notice how each smaller triangle is the same shape as the big one"). She asks questions ("How many triangles will there be if you do it one more time?").

The sandbox is where constructions become beautiful. The child can color closed regions (see below) and create works worth sharing.

---

## Coloring Closed Regions

In the sandbox, the child can color areas of her constructions:

- **Tap segments in sequence** to select them. Each highlights on selection.
- When selected segments form a **closed path**, the enclosed area glows — the system detects closure automatically and signals "this is a region now."
- The child picks a **color from a palette** and taps the glowing interior. The region fills.
- **Deselecting**: tap a selected segment again to toggle it off.

No new gestures. Everything is taps. The system does the work of recognizing closure, and the glow feedback communicates it.

---

## No Deletion

Constructions have dependencies — a point may depend on a circle, and a line may depend on that point. Deletion would cascade unpredictably or create orphaned objects. Instead:

- **Scaffold toggle** serves all practical needs. Double-tap any line or circle to fade it to 20-25% opacity. It recedes visually but remains geometrically active — intersections still detect, snap still works.
- The toggle is reversible. Double-tap again to restore. The full construction can always be brought back.
- If a construction is too messy, the child starts fresh — the way an artist starts a new page. That's not failure; it's practice.
- If a child asks to delete something, Maya can explain: "That line helped make this point. Want to fade it instead?" The child learns that constructions have history — which is itself a mathematical insight.

---

## The Unit Circle as Permanent Resident

The unit circle — centered on 0, radius to 1 — stays on the canvas permanently. It is the single most generative construction in the system:

- It defines the unit distance.
- It provides -1 on the number line without new construction.
- It provides the first unit points on the y-axis.
- It will become the literal unit circle for trigonometry.
- It is a constant reminder that everything grew from the relationship between two points.

---

## What the Plane Makes Possible

Once the coordinate plane exists, the child has built a visual calculator. With Maya's guidance, the same canvas and the same gestures support:

- **Arithmetic** — distances the child can see and count on the number line she built.
- **Coordinate geometry** — placing points, reading addresses, discovering distance.
- **Area** — counting unit squares in the grid (pixel calculus). Area isn't a formula; it's "how many squares fit inside."
- **Rationals** — the diagonal of a rectangle from the origin to any grid point intersects the axes at rational values. Fractions are constructed, not defined.
- **Linear equations** — two points define a line. The slope is visible. The intercept is where the line meets the axis. Systems of equations are solved by finding where lines cross.
- **Trigonometry** — the unit circle on the canvas. A point moving around it traces sine and cosine. The connection between circular motion and wave functions is visible.
- **Calculus concepts** — area under a curve by counting squares (Riemann sums). Secant lines approaching tangent lines (derivatives). The grid can be subdivided finer and finer, and the child sees convergence.
- **Transformations** — selecting shapes and reflecting, rotating, scaling them. Defining axes of reflection and centers of rotation as persistent canvas objects.

The interface never changes. The questions get deeper.

---

## What Remains to Design

### Curves

Beyond straight lines and circles — function plotting, Bézier curves, smooth approximations of discrete paths. These introduce objects defined by control points or equations rather than compass-and-straightedge rules. The interaction model for manipulating curves (drag a control point, watch the curve deform) needs design.

### Annotation

Text on the canvas — labels, notes, Maya's comments attached to world-space positions. The Florence 1430 model: content lives on the surface alongside geometry.

### Construction History and Replay

The sequence of construction steps is the proof. Recording actions as an ordered list enables stepping backward and forward, sharing demonstrations, and Maya discussing the child's process. Implications for undo, save, and conversation.

### Measurement Feeding Back into Construction

A child measures an angle and wants to use that measurement to construct something. The output of measurement becomes an input to the next action.

### Traversal Activities

Graph theory, Euler paths, mazes, random walks, grid-path counting — these involve tracing paths through existing structures rather than constructing new ones. The interaction model (selecting edges, tracing routes) needs design, but should feel consistent with the construction grammar.

### Tables and Grids

Structured arrangements like multiplication tables, number grids, and counting puzzles. The grid on the coordinate plane is a starting point, but these activities may need their own interaction patterns for clicking cells, highlighting patterns, and checking answers.

---

## Design Principles

1. **The child builds it, so it belongs to her.** The coordinate plane is not handed to the child. She constructs it from two points and two gestures. Every mathematical structure she encounters, she has made.
    
2. **Two gestures, three feedback states.** Tap-tap for lines, drag for circles. Highlight, glow, ghost preview. These are universal and permanent. New activities change what objects exist and what constraints apply — never how the child interacts.
    
3. **Maya shares responsibility.** The child is never alone with the mathematics. Maya is always present — watching, naming, suggesting, confirming. The child explores with confidence because recovery is always available.
    
4. **Beauty motivates fluency.** The sandbox is where constructions become art. A child who makes beautiful things with compass and straightedge has internalized the gestures at the level of motor memory. That fluency is the foundation for everything else.
    
5. **The curriculum is a single continuous construction.** Euclidean construction → number line → coordinate plane → arithmetic → geometry → trigonometry → calculus. The tool stays simple. The meaning deepens.
    
6. **Sensory state, not explicit mode.** Ambient cues — color, tone, Maya's presence — communicate what kind of cognitive work is happening. The child feels the shifts without thinking about them.
    
7. **Design for experience first.** Build the most engaging and durable learning experience possible. Measure what matters. Then engineer for reach. Do not optimize for lowest-common-denominator hardware before discovering what transforms learning.
    

---

_This document captures a vision in progress. The next steps are to walk through concrete interaction scenarios for the coordinate plane activities, the sandbox, and the traversal/puzzle activities — stress-testing the gesture grammar and Maya's role in each context._