# Claude Code prompt — Glass, left panel and tool architecture

Draft 24 Aug 2026. Paste into a Claude Code session.

---

```
Read CLAUDE.md first and follow its standing rules.

Then read these, in this order:
  CWVault/00-DECISIONS.md                       — settled rules; see "The shelf"
  CWVault/01-ACTIVE/Multiply-Spec-Aug24.md
  CWVault/01-ACTIVE/Divide-Spec-Aug23.md
  CWVault/01-ACTIVE/Make-This-Square-Spec-Aug23.md
  CWVault/01-ACTIVE/Stories-First-Set-Aug24.md  — the story text itself

This prompt covers the panel architecture and naming only. The tools'
behaviour is specified in those files and is NOT restated here. Where this
prompt and those files disagree, the files win — tell me about the conflict
rather than resolving it yourself.

CONTEXT

The tool is now called **Glass**. It was Glass Multiplication; that name is
retired, because the tool does division, square roots, factoring and more, and
naming it for one operation was a category error. Glass Geometry keeps its name
for now — that pairing is unresolved and not yours to fix in this session.

Glass represents a 2D slice of spacetime, so thin it holds only locations. Two
of those locations are named 0 and 1, and everything else is constructed from
them. The default unit is one metre, which may or may not be surfaced to the
child. This is the same plane developed in Glass Geometry.

The plane is positive in all four directions — the axes run North, East,
South and West, all positive. This is deliberate: it shows the symmetry of
square numbers and similar patterns. Most work happens in the north-east
quadrant.

WHAT CHANGES

Currently the tool has a row across the top labelled Multiply, Build, Explore,
Properties. Those functions move off the top. They are not all being deleted —
that list was provisional. The replacement is a left panel, matching the
interface used in Glass Geometry. Glass Geometry as it exists today is the
standard; converge on it.

THE LEFT PANEL

Header: **How this works:**

Below it, a list of words acting as buttons:

    Building Numbers
        Multiply
            the story
        Divide
            the story
        Make a square
            the story
        Primes
            the story
        Explore
            the story

Behaviour:

- Clicking a list item opens a panel that can be MOVED, RESIZED, and CLOSED.
- Clicking **Building Numbers** opens a panel reading:
      "Use any of these to build numbers on the plane."
  with the five tools listed below it.
- Clicking a tool name opens its panel — brief text, and invokes the tool.
- **the story** sits below each tool, indented. It opens a brief, engaging
  story about that tool and what it does, in its own window above the map,
  itself movable, resizable, closable.

Stories are about THE TOOL — authored once, always true. They are not reports
on what the child just did. (The tools already report on what just happened;
that is separate and specified in the tool files.)

The story text for Multiply, Divide and Make a Square is written and lives in
CWVault/01-ACTIVE/Stories-First-Set-Aug24.md. **Use it verbatim.** Do not
rewrite, tighten, expand, or add headings to it. Do not add a summary line, a
"what you'll learn", or a closing sentence. The voice is the deliverable, and
prose that reads as under-explained is under-explained on purpose. If a story
will not fit the panel as written, say so and stop — do not edit it to fit.

**Primes and Explore have no story yet.** Do not write one, and do not leave a
placeholder that speaks. Omit those two "the story" lines entirely; a missing
button is honest, and a button holding the wrong voice is not.

The story exists so a child who is nervous about clicking a button has
something to do instead, and to augment what she sees. It is requested, never
pushed.

JUST-IN-TIME HELP

Each tool shows a prompt explaining what to do, in its own panel. It fades once
she has used the tool, and fades on its own a little later if she hasn't.

There is precedent for this in Glass Geometry — the panel that appears once
there is enough detail to make a plane. Match that behaviour. Do not invent a
second pattern.

EXPLORE

Explore is the asking gesture rather than a making one — it is where she
reviews what she has built.

It shows an empty table with the numbers visible, and behaves the way **Build
by Selecting** does under Build in the current tool. Find that implementation
in the source; I have not restated it here. Clicking any visible number shows
it with its prime colours and tones.

TEXT ELSEWHERE

Text may also appear on the map itself — a readout tracking pointer position,
labels on objects, or a note elaborating on what the child has done. The
readout position rule is in 00-DECISIONS.md and applies across all tools.

SCOPE AND STOPPING

Build the panel architecture and wire the five tools to it. Where a tool's
behaviour is specified in the files above, implement it. Where it is listed
under "Open" in those files, DO NOT INVENT IT — leave the hook and tell me.

Three things are open in Multiply specifically: the tap-a-number branch, where
the product number appears, and whether the flip journey repeats.

STOP and report before committing. List every file touched. Do not deploy.
```

---

## Notes for Michael, not part of the prompt

**Still unresolved and named as such in the prompt:** Glass vs Glass Geometry.
Working names are fine; this needs settling before anything is public.

**Explore's placement.** Kept under Building Numbers on Michael's reasoning:
it is where she reviews what she built, which is still about building, seen
from the other end.

**The just-in-time prompt** is the only thing in this design that speaks
unasked. It has precedent in geometry, so it is not a departure — but it is
worth watching that it does not become the thin end of an explaining habit.

**Not in this prompt:** the tile-not-rectangle persistence rule, the gesture
grammar, acceleration, forgiving release. All of that lives in the spec files,
and the prompt points at them rather than restating them, so there is one place
to change each rule.
