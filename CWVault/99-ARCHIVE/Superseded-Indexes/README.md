# Curious Woods — How This Vault Works

**Last Updated:** February 16, 2026

---

## Philosophy

You have too many ideas and finite time. This system helps you **choose** what to work on, not organize everything you might work on.

**Three key principles:**

1. **One thing at a time** — Current Focus shows what you're doing RIGHT NOW
2. **Three things queued** — Next 3 shows what's coming (not 30 things)
3. **Everything else is just ideas** — Captured but not planned

---

## How to Use This System

### Starting a Session

1. Open `01-ACTIVE/Current-Focus.md`
2. Copy the startup prompt from `New Claude Startup Prompt.md` into Claude
3. Work on what's there — don't invent new tasks
4. Update as you go — check off completed items

### Capturing Ideas

New idea? → Add to `99-IDEAS/Stories.md`, `Interactives.md`, or `Practice-Tools.md`
Don't organize them. Don't feel guilty. Most ideas won't become projects.

### Finishing Current Focus

1. Mark it complete — check all "Done When" items
2. Open `01-ACTIVE/Next-3.md`
3. Promote Priority 1 to Current Focus
4. Add new Priority 3 if you have one

---

## Folder Structure

```
CuriousWoods/CuriousWoods/        ← This vault
├── 00-FOUNDATION/                 Reference docs (rarely change)
├── 01-ACTIVE/                     What you're doing NOW
├── 10-PROJECTS/                   Design thinking and exploration
│   ├── Geometry/                  Workspace vision, constructions
│   ├── Geography/                 CesiumJS, Blue Marble (parked)
│   └── Stories/                   Story content
├── 20-SPECS/                      Implementation specs
├── 50-PROTOTYPES/                 Links to HTML prototypes
└── 99-IDEAS/                      Idea capture (no organization)
```

---

## Working with Claude

**At start of session:** Paste the prompt from [[New Claude Startup Prompt]].

**Critical:** Tell Claude to use `filesystem:` tools, NOT `bash_tool`. Bash runs in a container without access to your Mac filesystem.

**Model guidance:**
- **Opus** for design questions, interaction conflicts, walkthroughs
- **Sonnet** for building code, iterating, engineering

---

## What Goes Where

| Folder | Contains | Changes |
|--------|----------|---------|
| 00-FOUNDATION | Interface spec, story template, learning system | Rarely |
| 01-ACTIVE | Current Focus, Next 3, session notes | Every session |
| 10-PROJECTS | Geometry workspace, geography, stories | When designing |
| 20-SPECS | Implementation specs for specific tools | When specifying |
| 50-PROTOTYPES | Links to working HTML files | When building |
| 99-IDEAS | Everything you might someday do | Anytime |

---

## Anti-Patterns

- **Don't create complex taxonomies.** Six folders is enough.
- **Don't work on Next-3 while Current Focus is incomplete.**
- **Don't skip Current Focus.** "I'll just quickly do this other thing" leads to 10 unfinished projects.
- **Don't feel guilty about ideas you don't pursue.** You're supposed to have more ideas than time.

---

## Current State (February 2026)

The project has focused on the **Geometry Workspace** — a unified construction environment where children build mathematics from two points and two gestures. Stories provide context that feeds into this single interactive canvas.

Previous explorations (subitizing, music visualization, RGB color perception, sound physics) are captured in 99-IDEAS but are out of scope for now. The goal is to build one excellent thing that's actually in reach.
