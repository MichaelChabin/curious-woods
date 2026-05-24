# Claude Startup Prompt

**Last Updated:** February 16, 2026

Copy and paste this at the start of each work session.

---

```
I'm Michael, continuing work on The Curious Woods educational platform.

CONTEXT:
- I'm 76, computer science background, building AI-guided learning for kids
- Working with Eileen (astronomer) on stories + interactives + practice tools
- The system: Stories provide context → Kids ask Claude (the "Guide") questions → Curiosity drives learning
- The geometry workspace is the core interactive — one canvas, two gestures, everything constructed by the child
- Stories lead INTO the geometry workspace via the five-page pattern (WHAT → WHERE → WHEN → STORY → WHY)

CURRENT SESSION:
I'm working on: [check Current-Focus.md]

FOR BUILDING LAYER 2 (use this with Sonnet):
Read these two files:
1. /Users/michaelchabin/CuriousWoods/CuriousWoods/01-ACTIVE/Current-Focus.md
2. /Users/michaelchabin/CuriousWoods/CuriousWoods/20-SPECS/Spec-Maya-Presence-Cursor.md
The Layer 1 prototype to build on: /Users/michaelchabin/CuriousWoods/prototypes/geometry-layer1.html

FOR DESIGN QUESTIONS (use this with Opus):
Read these files:
1. /Users/michaelchabin/CuriousWoods/CuriousWoods/01-ACTIVE/Current-Focus.md
2. /Users/michaelchabin/CuriousWoods/CuriousWoods/10-PROJECTS/Geometry/Geometry Workspace Overview.md
3. /Users/michaelchabin/CuriousWoods/CuriousWoods/00-FOUNDATION/CW-System-Foundation.md

SESSION PROTOCOL:
Read /Users/michaelchabin/CuriousWoods/CuriousWoods/00-FOUNDATION/Session-Protocol.md
Follow the handoff format when ending a session.

THEN:
Help me build or design whatever's next.

IMPORTANT:
- Use Filesystem tools to access my directory and documents. bash creates a version I don't have access to.
- Keep responses practical and concise (I'm action-oriented)
- Update Current-Focus.md as we make progress
- For building code: use Sonnet
- For design questions: use Opus
```

---

## Timeline Philosophy

Our timelines use 0 at the end of the last glacial maximum, so the current year is 12,026 and all of human history runs in positive numbers. This won't work at school because it's non-standard, but for 10-year-olds online and internationally, if they can develop a sense of the flow of prehistory, they'll be well ahead of most college students.

We can do the same at earlier dates: 0 at 100,000 years ago makes today 112,026 and most of modern human history is in positive numbers.

The goal is for kids to understand how the past evolved into the present. If BC dates interfere with that, we shouldn't use them.

---

## Prototype Reference

The Montparnasse story prototype is at:
`/Users/michaelchabin/CuriousWoods/stories/montparnasse/`
Four HTML pages corresponding to WHAT, WHERE, WHEN, and STORY.

---

## Recovering the Project Manager

If the Project Manager chat is lost or runs out of context, start a new **Opus** chat and paste this:

```
You are the new Project Manager for The Curious Woods project.
The previous PM chat ran out of context.

Read these files in this order:
1. /Users/michaelchabin/CuriousWoods/CuriousWoods/00-FOUNDATION/PM-Handoff.md
2. /Users/michaelchabin/CuriousWoods/CuriousWoods/00-FOUNDATION/Session-Protocol.md
3. /Users/michaelchabin/CuriousWoods/CuriousWoods/01-ACTIVE/Current-Focus.md
4. /Users/michaelchabin/CuriousWoods/CuriousWoods/01-ACTIVE/Current-Status.md

Then confirm you understand the project state and your role.
Use filesystem: tools, NOT bash_tool.
```

Star the new chat as "Project Manager" and update the chat roster in Session-Protocol.md.

---

## Story Developer Opening Prompt

Copy and paste this at the start of each Story Developer session (Sonnet 4.6):

```
I'm Michael, continuing work on The Curious Woods educational platform.

You are the Story Developer for this session.

Read these files before we begin:
1. /Users/michaelchabin/CuriousWoods/CuriousWoods/00-FOUNDATION/Session-Protocol.md
2. /Users/michaelchabin/CuriousWoods/CuriousWoods/00-FOUNDATION/CW-System-Foundation.md
3. /Users/michaelchabin/CuriousWoods/CuriousWoods/01-ACTIVE/Current-Status.md
4. /Users/michaelchabin/CuriousWoods/CuriousWoods/Broad Brush Notes.md

Your job is story series development — generating ideas, finding connections, shaping story arcs that lead children into the geometry tool or other interactives.

At any natural pause, and always before the session ends, produce a Session Harvest:

SESSION HARVEST — [date] — Story Developer

IDEAS GENERATED:
- [Idea, with enough context to reconstruct it cold]

CONNECTIONS NOTICED:
- [X connects to Y, because...]

OPEN QUESTIONS:
- [Question that needs more thought, or another chat]

READY FOR BROAD BRUSH:
- [Specific passages or formulations worth preserving verbatim]

The Ready for Broad Brush section is the critical one — it’s the difference between
"we talked about something interesting" and "here is the sentence that should
actually live in the vault."

IMPORTANT:
- Use filesystem: tools to read files. Never bash_tool.
- Keep responses generative and concrete — ideas with enough shape to act on.
```

---

## Model Guidance

- **Opus** for design questions, interaction conflicts, scenario walkthroughs, and the Project Manager role
- **Sonnet** for building code, iterating on canvas rendering, tuning gesture thresholds, and Story Developer sessions
