# Session Protocol — Curious Woods

**Version:** 1.0  
**Date:** February 18, 2026  
**Purpose:** Every chat that works on Curious Woods follows this protocol.
             Consistency here means nothing gets lost between sessions.

---

## The Project Manager Chat

The Project Manager chat (Opus 4.6) is the institutional memory of this project. It:
- Maintains all vault documents
- Updates Current-Focus.md after every session
- Writes and updates document briefs
- Resolves conflicts between decisions made in different chats
- Is the single source of truth for "where things stand"

**When in doubt about project state, ask the Project Manager.**

---

## ⚠️ CRITICAL: File Writing

**Always use `filesystem:` tools to read and write files — never `bash_tool`.**
Michael works on a Mac. The bash tool runs in a Linux sandbox that Michael cannot
see. Files written with bash are invisible to him. He will test the wrong code
and significant time will be wasted. Every file read and write must go through
the filesystem MCP tools. This applies to ALL chats without exception.

---

## Starting a Session

Every working chat reads these two things before beginning:

1. `/01-ACTIVE/Current-Focus.md` — what's happening now, recent decisions
2. The relevant spec for the work at hand (see Current-Focus for which one)

That's it. Don't read everything. Trust the documents to be current.

If something in the documents contradicts what you remember from earlier in your own conversation history, the documents win — they reflect decisions that may have been made in other chats.

---

## During a Session

When a decision is made — even a small one — note it clearly in the conversation with a marker like:

`DECISION: [what was decided]`

This makes it easy to extract at session end.

When a question comes up that can't be resolved in the current chat:

`OPEN: [what needs to be decided, and by whom]`

When something needs to be communicated to another chat:

`HANDOFF: [what the other chat needs to know, which chat]`

These markers don't need to be formal. They just need to be findable.

### Interim Session Notes (Coding chats especially)

For sessions involving significant back-and-forth — working through a problem, trying approaches, arriving at solutions — write a brief interim note to the vault *during* the session, not just at the end. Use `01-ACTIVE/Note-Coder-MidSession-[date].md` or similar.

The note should capture:
- What is now working that wasn't before
- Decisions made and the reason for each (even if the reason is just "felt right")
- What is currently being built and what done looks like
- Anything that emerged as new territory not covered by the handoff documents

The act of writing this mid-session is itself useful — it forces distillation. Ideas that survive into the note are essential. Ideas that don't are less so. Writing something down that looks wrong on paper is a signal worth heeding.

A future session reading this note should be able to orient without reading the full conversation history. That is the test of whether the note is good enough.

---

## Ending a Session

Before closing any working chat, produce a brief handoff summary:

```
SESSION HANDOFF — [date] — [chat name/purpose]

WHAT CHANGED:
[One paragraph. What was built, designed, or decided.]

DECISIONS:
- [Decision 1]
- [Decision 2]
[etc. Be specific. "Used Model B for intersections" not "made intersection decision."]

OPEN QUESTIONS:
- [Question 1 — who needs to resolve it]
[etc.]

FILES CHANGED:
- [filepath] — [what changed]
[etc.]

HANDOFFS:
- [What another chat needs to know] → [which chat]
```

Copy this handoff and bring it to the Project Manager chat. The Project Manager will update Current-Focus.md and any affected documents.

**This is the step that keeps everything coherent. Don't skip it.**

---

## The Project Manager's Job After Each Handoff

When the Project Manager receives a session handoff, it:

1. Updates `Current-Focus.md` — session notes section, current status if changed
2. Updates any spec documents affected by DECISIONS
3. Updates document briefs (the short headers — see below)
4. Notes any OPEN questions in the appropriate document or in a dedicated `Open-Questions.md`
5. Flags any HANDOFFS that need to reach other chats

The Project Manager confirms when this is done. Michael doesn't need to track it.

---

## Document Structure Standard

Every document that working chats read should have a **brief** at the top — 20-30 lines maximum, pure decisions and current state. Prose reasoning and design history follow below.

**Brief format:**
```
## BRIEF (read this, skip the rest if you're building)

Status: [one line]
Last updated: [date] by [which chat]

What exists:
- [bullet: specific thing that exists]

Current decisions:
- [bullet: specific decided thing]

What to build next:
- [bullet: specific next action]

Read the full document for: [what's below and why you might need it]
```

The Project Manager is responsible for keeping briefs current after every session that changes something.

---

## Chat Roster

| Chat | Model | Purpose | Reads | Status |
|------|-------|---------|-------|--------|
| Project Manager | Opus 4.6 | Documents, design, coordination | Everything | Active — starred as "Project Manager" |
| Geometry Coding (Layer 1) | Sonnet 4.6 | Construction engine | Layer-1-Build-Brief | Complete — Layer 1 built |
| Maya Design | Sonnet 4.6 | Wisp presence + emotional intelligence | Current-Focus, Geometry Workspace | Complete — produced Spec-Maya-Presence-Cursor |
| Working Tool Coding | Sonnet 4.6 | Working Tool implementation | Current-Focus + Spec-Working-Tool | Next — after Layer 1 debugging complete |
| Geometry Coding (Layer 2) | TBD | Maya integration | Current-Focus + Spec-Maya-Presence-Cursor | **BLOCKED** — pending Working Tool completion |
| Story Developer | Sonnet 4.6 | Story series development | Session-Protocol, CW-System-Foundation, Current-Status, Broad Brush Notes | Active — stained glass series in progress. Sessions end with a Session Harvest. |
| Deployment | TBD | Git, static hosting, shareable URLs | Current-Focus | Pending — open when ready to share |
| API / Claude Integration | TBD | Claude API, live Maya | Current-Focus + API spec (TBD) | Future |
| Practice App | TBD | Rhythmic practice tool | Current-Focus + Practice spec (TBD) | Future |

New chats should be added to this table by the Project Manager when created.

---

## Developer Toolkit

`cw-dev-tools.js` is a reusable overlay toolkit for prototype development.
Spec: [[20-SPECS/Spec CW Developer Toolkit]]
File: `/Users/michaelchabin/CuriousWoods/tools/cw-dev-tools.js`

Every coding chat should know this file exists and offer to include it
(via `<script>` tag) when building any new prototype. The toolkit provides
layout definition, component specification, line tuning, color sampling,
reference image underlay, coordinate inspection, and design export.
Removing the script tag leaves the prototype completely unaffected.

For canvas-based prototypes, expose a `getWorldCoordinates(screenX, screenY)`
function so the toolkit can display world coordinates rather than screen pixels.

---

## What the Project Manager Does Proactively

Beyond responding to handoffs, the Project Manager should:

- Keep document briefs accurate and concise
- Flag when a document is getting too long and needs pruning
- Notice when decisions in one spec conflict with another
- Suggest when a new spec document is needed
- Remind Michael of open questions that haven't been resolved
- At the start of any design session, summarize the current open questions so the conversation can be productive immediately

---

## Files That Must Stay Current

These are the documents every chat depends on. The Project Manager treats them as highest priority:

- `01-ACTIVE/Current-Focus.md` — updated after every session
- `01-ACTIVE/Layer-1-Build-Brief.md` — updated when Layer 1 changes
- `20-SPECS/Spec-Maya-Presence-Cursor.md` — updated when Maya design changes
- `00-FOUNDATION/Session-Protocol.md` — this file, updated when the protocol changes
- `00-FOUNDATION/CW-System-Foundation.md` — core philosophy, story types, practice methods, cognitive modes

---

## A Note on Efficiency

Documents in this vault serve two audiences: Michael (human reading, context, history) and working chats (fast orientation, precise decisions). The brief at the top of each document serves the working chats. The rest serves Michael and the design process.

Working chats should read the brief and get to work. They do not need to read full design rationale unless something is unclear or contested.

The Project Manager reads everything, because its job is to hold the whole picture.
