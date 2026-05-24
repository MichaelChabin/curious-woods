# Handoff to Prototyper — March 16, 2026

**From:** Designer Chat
**Supersedes:** Handoff-LayoutManager-Mar5.md, Handoff-LayoutManager-Mar3.md
**Role rename:** "Layout Manager" → "Prototyper" — better reflects actual function

---

## What the Prototyper Is For

The Prototyper builds self-contained visual experiments and utility tools that
can be developed and tested independently of the main geometry-v1.html file.
This keeps the Coder's context clean and allows visual/interaction design
questions to be resolved before implementation.

**The Prototyper's deliverables are:**
1. Standalone HTML prototypes that demonstrate interaction behavior
2. Finished specs (with measurements, colors, transitions, sizes) the Coder can implement directly
3. Utility tools that can be plugged into any CW HTML file for development purposes

The Prototyper does not touch geometry-v1.html directly. That is the Coder's file.

---

## What You've Built So Far

### Measurement Tool (`cw-dev-tools.js`)
A pluggable development utility — drop a script tag into any HTML file and get
on-screen measurement and inspection capabilities. Confirmed complete and on disk.

**Location:** `/Users/michaelchabin/CuriousWoods/tools/cw-dev-tools.js`

Also in that folder: `Geomtryt underlay.png` (geometry reference image).

To use in any HTML file:
```html
<script src="/path/to/cw-dev-tools.js"></script>
```

### UI Component Prototypes (March 3–5)
Palette tool fixes, Model tool redesign, Picker window as reusable component.
These were designed in the March 3 and March 5 handoffs. Status of implementation
in geometry-v1.html is the Coder's record, not yours — your prototypes were the
design artifacts.

---

## What Has Happened Since Your Last Session (March 5 → March 16)

You need this context to design intelligently. You don't need to act on all of it —
just understand it.

### The Constructions Panel (replaces Drawing Guide)
The Drawing Guide tool (SVG tracing overlay) was retired. Fundamental precision
mismatch between overlay coordinates and the geometry engine — not fixable cleanly.
It has been replaced by the Constructions panel, which shows curated demonstrations
that a child navigates step by step.

**How it works:**
- Child taps forward and back through significant steps of a construction
- "Show me" leads to "try it" — a sequence, not parallel options
- Pause points are marked in the operation log by Eileen (the curator), not by algorithm
- Ghost overlay ("try it" mode) shows the target construction on the canvas at fixed
  opacity so the child can build on top of it

### Numbers / Axis Labels (shipped March 16)
Integer labels now appear on construction points. The x-axis is auto-detected.
The y-axis is *earned* — it appears only after the child constructs a perpendicular
through point 0. Labels suppressed in Glass mode and PNG export. This is live in
the geometry tool.

### Demo Testing System (designed, not yet built)
When a child finishes a demo session, she'll see a summary card: "you spent
14 minutes, made 2 constructions, used the Chartres palette." She's asked if she
wants to share it. Behavioral data only — no identity. The data summary card is
pedagogically intentional: it teaches data agency.

### Operation Log
Every canvas action is logged as JSON. Save, load, undo, and demo playback all
derive from replaying this log. The `pause: true` flag marks curator-designated
pause points. This is the spine of the whole system.

---

## Your Current Task: Cursor Vocabulary

This is the primary design problem for this session.

The full brief is in `01-ACTIVE/Note-CursorVocabulary-Mar8.md`. Read it. What
follows here is the context that brief doesn't have.

### Why the Cursor Matters More Than It Looks Like

**The cursor is Maya's only physical representation.**

Maya is the AI guide character — a presence without anthropomorphic features
(gradient blobs in Payne's gray and copper). She has no face, no body, no cartoon
form. When Maya eventually demonstrates constructions live, she will use the cursor
to do it. A child who has learned to read the cursor forms from curated demos will
already understand Maya's demonstrations. We are building a shared language.

Design the cursor as if it will be used by an intelligence, not just recorded by one.

### The Cursor States to Design

1. **At rest** — cursor not near anything interactive
2. **Approaching a snappable point** — geometry and cursor acknowledge each other
3. **Tap** — punctual, lands and releases
4. **Drag initiation** — moment of commitment, before motion begins
5. **Drag in motion** — has directionality, moving
6. **Drag release** — circle snaps into existence, cursor returns to rest
7. **Consequence imminent** — intersection about to appear, region about to close

Color layer:
- **Copper** `#BE622F` — acts that create (new line, new circle, new fill)
- **Payne's gray** `#546A80` — acts that select or modify (choosing a color, repainting)

### The Touch Magnifier — Build This Now

This is the one cursor-related item that cannot wait for the full spec.

On touch interfaces, a magnifier appears near snappable points — offset above and
slightly left of the touch point so the finger doesn't obscure it. Shows the point
and its immediate surroundings at 2–3× magnification with crosshairs. Solves the
fat-finger problem.

This is Maya's attention made visible — design it in that spirit. Not a generic
iOS magnifier. Something that fits the visual language: parchment, Payne's gray,
copper for the crosshair.

Prototype this as a standalone HTML file. The Coder will need: exact offset
position, magnification factor, crosshair style, when it appears and disappears,
and the transition behavior (fade? snap?).

### What to Produce

For the cursor vocabulary:
1. Visual designs for each state — resting, approaching, tap, drag (initiation /
   motion / release), consequence imminent
2. Transition specs — what changes, how long, what easing
3. Color specs — exact hex for each state
4. Size specs — diameter at rest, elongation ratio during drag
5. A note on anything that didn't work and why

For the touch magnifier:
1. A working HTML prototype demonstrating the behavior
2. Specs as above

The Coder receives the finished spec and implements. No visual decisions happen
during implementation.

---

## New Tool: Sound Workbench

This is a new Prototyper responsibility, mentioned here so you know it's coming.

The geometry tool will make sounds — gesture-mirroring audio (a whoosh + ding for
circles, paired soft knocks for lines). Rather than designing sounds directly in
the geometry file, the plan is to build a standalone sound workbench: a self-
contained HTML tool where sounds can be designed, tested, and tuned. The output
is a JSON artifact that the geometry tool consumes.

**Why this belongs with the Prototyper:**
- It's a standalone utility, like the measurement tool
- It involves visual UI (waveform display, controls) as well as audio
- It produces a deliverable (JSON) that the Coder plugs in, rather than being
  built into the geometry file directly

No spec yet — this is a heads-up, not a task. Expect a design session on this
before a build session.

---

## Project Visual Language (for reference)

Everything you build should feel like it belongs in the same world as the geometry tool.

| Element | Value |
|---------|-------|
| Canvas/background | Parchment `#f4f1e8` |
| Primary interactive text | Payne's gray `#546A80` |
| Accent / creation acts | Copper `#BE622F` |
| Points | Copper `#BE622F` |
| Lines | YInMn blue (see geometry tool) |
| Panel background | `rgba(210,200,180,0.18)`, border `0.5px #c8b89a` |
| Floating panels | Parchment `rgba(244,241,232,0.96)`, border `0.5px #c8b89a` |
| Typography | Georgia serif throughout |
| UI text size | 14px for labels, 11px for quiet notes |
| Quiet note style | 11px Georgia italic, warm gray `#9a8e80` |

Words, not buttons. Controls are words in the same Georgia register as everything
else. No primary colors, no cartoon fonts, no cuteness for its own sake.

The child's work — her colored glass construction — is always the most colorful
thing on screen.

---

## File Locations

| Item | Path |
|------|------|
| Vault root | `/Users/michaelchabin/CuriousWoods/CuriousWoods/` |
| Active geometry file | `/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html` |
| Deploy folder | `/Users/michaelchabin/CuriousWoods/cw-deploys/` |
| Prototypes folder | `/Users/michaelchabin/CuriousWoods/CuriousWoods/50-PROTOTYPES/` |
| Models/SVGs | `/Users/michaelchabin/CuriousWoods/cw-deploys/models/` |
| Art/palettes | `/Users/michaelchabin/CuriousWoods/cw-deploys/art/` |
| Dev tools | `/Users/michaelchabin/CuriousWoods/tools/cw-dev-tools.js` |

**All prototype files go in `50-PROTOTYPES/`.** Do not put prototype files in
`cw-deploys/` — that folder is the Netlify deploy target and should stay clean.

**Use filesystem MCP tools for all file writes**, not bash. Bash writes to a
Linux sandbox, not the Mac filesystem.

---

## Open Questions for This Session

- Should prototype HTML files have a consistent naming convention?
  Suggestion: `proto-[subject]-[date].html` (e.g., `proto-cursor-mar16.html`)
- During the child's own construction (not demo mode), should the cursor be
  always visible or only near snappable points? Try both.
