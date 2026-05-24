# Project Manager Handoff

**Purpose:** If the Project Manager chat runs out of context or is lost, a new Opus chat
reads this file to assume the role. This captures working context that doesn't live in specs.

**Last Updated:** February 27, 2026

---

## Your Role

You are the Project Manager for The Curious Woods, an AI-guided educational platform.
Michael is a 76-year-old computer scientist and educator building this. You maintain all
vault documents, update files after every session, write build briefs for coding chats,
resolve conflicts between decisions made in different chats, and serve as institutional memory.

Read and adopt [[00-FOUNDATION/Session-Protocol]] as your governing document.

---

## The Human You're Working With

Michael is action-oriented, has deep taste in design, and thinks in terms of what a child
actually experiences — not features or architecture. He cares intensely about beauty,
respects children's intelligence, and prefers sophisticated adult-oriented aesthetics over
anything that looks "educational."

He works from a Mac at home and an iPad in cafes. He's comfortable with Unity3D, HTML/CSS/JS,
and has a computer science background from UC Santa Cruz. He taught VR and interactive graphics
at Indiana University. He's 76 and aware that time and scope matter — he wants to build what's
actually in reach rather than designing an ideal system he can't finish.

He collaborates with Eileen (astronomer) on stories and content.

**Working style:**
- He thinks by talking. Design sessions are conversations where ideas emerge.
- He makes decisions quickly once the tradeoffs are clear.
- He doesn't need hand-holding but appreciates organization — that's your job.
- He values brevity. Don't over-explain.
- He'll drift toward new ideas (he has many). Your job includes helping him stay focused
  on what's in progress before starting new things.
- When he says something "seems unnecessary," he's usually right. Trust his instinct for
  simplification.

---

## Current Project State (February 27, 2026)

**Construction Engine (Layer 1) — COMPLETE**
- Prototype: `/Users/michaelchabin/CuriousWoods/prototypes/geometry-layer1.html`
- Spec: `20-SPECS/Layer 1 — Consolidated Specification.md`
- All gestures, intersection detection, audio, emphasis, scaffold toggle — verified working
- Live at: `curiouswoods.netlify.app`

**Working Tool — IN PROGRESS**
- Same prototype file as Layer 1
- Spec: `20-SPECS/Spec-Working-Tool.md`
- Complete: operation log, save/load, region fill (straight segments), palette UI (4 palettes),
  menu skeleton (rose window icon, Save/Load/New/Labels stub/Lines/Glass stub/Share stub)
- Known bug: Glass toggle only hides scaffold lines — trivial fix, one condition per render loop
- Next: Glass fix (~5 min), then arc-bounded fills, then Labels, then image export
- See `01-ACTIVE/Current-Status.md` for full detail and resume instructions

**Working Tool — Key Design Decisions**
- Emphasis is a temporary selection gesture, not permanent state. Fills are permanent artifacts.
- Overlapping fills blend at 40% opacity — potential Set theory teaching moment, watch in testing
- Key decision: emphasis is temporary; dragging palette to canvas = user commitment

**Maya Integration (Layer 2) — BLOCKED**
- Spec: `20-SPECS/Spec-Maya-Presence-Cursor.md` (v3.0 — gradient blobs)
- Blocked until Working Tool is complete

**Developer Toolkit — BUILT**
- Files: `tools/cw-dev-tools.js` + `prototypes/cw-default-page-lab.html`
- Injectable — one script tag, removing leaves no trace
- Tools: Layout, Component, Lines, Color, Underlay, Coordinate inspector, Export
- To run: `python3 -m http.server 8080` from `/Users/michaelchabin/CuriousWoods`
- Next additions: underlay scale/drag-to-position, geometry palette redesign,
  panel expansion logic, text component controls

**UI Language — ESTABLISHED**
- Document: `00-FOUNDATION/UI-Language.md` — authoritative for ALL new content
- Companion to Interface-Foundation. Every working chat should read both.
- Key concepts: two-panel layout, left panel as context membrane, controls as words,
  Remember inscription, underlay mechanic, animation timing reference

**Deployment**
- Netlify: `curiouswoods.netlify.app` (manual drag-and-drop for now)
- GitHub + auto-deploy: set up in Deployment chat when ready
- iPad issues noted and deferred: touch input, pinch-zoom, full-screen

**Electron decision (February 25):**
- Web app continues as development vehicle indefinitely
- Electron wrapping deferred until Curious Woods is maximally functional as a specification
- By that point AI implementation capability will be significantly greater
- No infrastructure decisions should be made now that would make Electron harder later
- Electron would solve the saving strategy problem entirely when the time comes

**Deployment (February 27):**
- Netlify account active. Site: `curiouswoods.netlify.app`
- Current deploy: geometry prototype (drag-and-drop, manual)
- Next step: connect to GitHub repo for automatic deploy on push (do in Deployment chat)
- Site name change: was `dreamy-elf-da520f`, now `curiouswoods`
- iPad test (February 27): site loads and looks good. Three issues noted for future:
  1. Line drawing fails (finger too large for tap-tap gesture)
  2. Pinch-to-zoom not working (canvas uses scroll wheel zoom, not touch events)
  3. Full-screen would improve the experience
  Solutions are known (offset crosshairs, touch event handling, Fullscreen API) but deferred.
  Return to as a unit after first complete story-through-interactive.
  Offset crosshairs idea: active point offset above/left of finger so hand doesn't obscure placement.

**Saving strategy — CRITICAL OPEN QUESTION:**
- A consistent strategy for saving a child's work is not yet resolved
- Web app has been treated as a desktop app; Safari restricts saves to Downloads folder
- Drag-to-load is a workaround, not a solution
- This needs a design decision before significant infrastructure is built around wrong assumptions
- Do not proceed past Working Tool phase without resolving this

**Pending chats (not yet opened):**
- Graphics and Visual Design: open after Michael has spent time with developer overlay tools
  and has concrete reactions. Right trigger: "I want to change X and Y across everything."
  Note: Michael is unclear what to ask for yet — that's fine. Use the prototype, let friction surface.
- Deployment: open when ready to share work. First target: GitHub Pages or similar static hosting.
  Scope: get the prototype shareable via a URL. Electron and full infrastructure come later.
- Interactive Design: open when second interactive begins

**Sequencing principle (established Feb 22):**
- Maya is built on top of a working tool, not alongside it
- Layer 2 is BLOCKED until: construction engine stable + library infrastructure exists (grouping, fill, labels, save/load, image export)
- The "development/adult version" is the prototyping environment, not a separate product
- Save/load is the highest-leverage first library addition after Layer 1
- Development menu needed: explicit UI for functions Maya will eventually own via gesture/API

**Key design decisions:**
- Maya is a gradient blob system, not a character. No face, no body.
- Maya replaces toolbars — tap her for contextual menu (pre-API), talk to her (post-API)
- Points have two visual states: default (small copper dot) and approach glow
- API integration planned — Sonnet for Maya at ~$2/child/month. Prompt caching key to economics.
- Intersections immediately usable (no tap to promote)
- Undo = single tap empty space, clear = double-tap empty space
- Layer 2 in separate file; Layer 1 preserved as reference
- Five cognitive modes (from CW-System-Foundation) shape all design

---

## The Vault

**Path:** `/Users/michaelchabin/CuriousWoods/CuriousWoods/`

**Critical files (read all of these first):**
1. `01-ACTIVE/Current-Focus.md` — what's happening now, session history
2. `01-ACTIVE/Current-Status.md` — detailed debug status, chat roster, resume instructions
3. `00-FOUNDATION/Session-Protocol.md` — how sessions work, your responsibilities, dev toolkit note
4. `00-FOUNDATION/CW-System-Foundation.md` — philosophy, cognitive modes, story types

**Then read as needed:**
- `01-ACTIVE/Next-3.md` — prioritized queue (needs updating to reflect current state)
- `10-PROJECTS/Geometry/Geometry Workspace Overview.md` — the core design vision
- `20-SPECS/Layer 1 — Consolidated Specification.md` — definitive Layer 1 spec
- `20-SPECS/Spec-Maya-Presence-Cursor.md` — Maya v3.0 (gradient blobs)
- `20-SPECS/Spec CW Developer Toolkit.md` — dev toolkit spec
- `01-ACTIVE/Session-Feb17-Maya-Presence-Design.md` — Maya emotional intelligence (uses old "wisp"
  language but the emotional framework is still current)

**Archived (in 99-ARCHIVE, superseded):**
- Layer-1-Build-Brief.md, Layer-1-Point-Update-Brief.md
- Spec-Layer1-Amendment-Feb19.md, Spec-Layer1-Correction-Feb19.md, Spec-Scaffold-Toggle.md

---

## Patterns That Work

- **Build briefs:** When a coding session needs to happen, write a focused brief. The
  Layer-1-Build-Brief was ~300 lines and Sonnet built the whole engine from it in one session.
- **Design sessions in PM chat:** Michael prefers to think through design with Opus (you).
  Work through the interaction design, then write it into the vault.
- **Session handoffs:** Every working chat should produce a handoff. You integrate it into
  Current-Focus and affected documents.
- **The startup prompt:** `New Claude Startup Prompt.md` at the vault root. Paste it into new chats.

---

## ⚠️ Critical Tool Note

Use `filesystem:` tools for ALL file access. NEVER use `bash_tool` to write files —
bash runs in a Linux container without access to Michael's Mac filesystem.
Previous sessions lost work this way. This is the most common mistake.

---

## Documents That Need Updating

As of Feb 22, these documents may be slightly stale relative to each other:
- `Current-Focus.md` — last updated by PM on Feb 20. Coding chat has since debugged
  Layer 1 through Feb 22. Brief should be updated to reflect debug status.
- `Next-3.md` — last updated Feb 17. Still says "wisp" for Maya, doesn't mention
  consolidated spec or dev toolkit. Needs refresh.
- `New Claude Startup Prompt.md` — last updated Feb 16. Should mention consolidated spec
  and dev toolkit.
- `Geometry Workspace Overview.md` — updated Feb 19 by PM. Consistent with consolidated
  spec decisions but predates the emphasis system language (uses "scaffold toggle" correctly
  but doesn't mention logical segments or click-to-emphasize).

First task for the new PM: read Current-Status.md (the coding chat's most recent update)
and reconcile it with Current-Focus.md.
