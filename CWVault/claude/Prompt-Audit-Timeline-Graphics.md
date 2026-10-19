---
status: Michael's prompt of 19 Oct 2026, saved to disk by the session that answered it. The answer is `claude/Audit-Timeline-Graphics-Oct19.md`.
role: The brief for the read-only audit of the Time Machine's map and globe graphics, and the ground rules for the passes that follow.
---

# Prompt: Audit the timeline's map and globe graphics

This pass is read-only. Do not change any code. I want a plain-language report first. We'll decide what to do after I've read it.

## Background

The deep-time timeline grew in layers: modern maps first, then older periods added one at a time, going further back. It works and looks wonderful in places, but the map and the globe apply graphics inconsistently, and some of the code probably only makes sense if you know the order it was written in.

## What I see

1. **Missing textures on the map.** Load the timeline, select Animals, press Play. Continents are flat brown shapes until about 200 million years ago, then suddenly become textured and coloured. It looks as if texture layers exist for the earlier periods but aren't being applied.
2. **A jump in scale.** As the continents reach their modern positions, they turn into the modern map, but they zoom into place as they do. The older maps and the modern map seem to use different scales or projections.
3. **Textures vanish on the globe during play.** Same steps on the globe: flat brown, no texture. If I pause, the textures appear. Press Play again and they disappear.
4. **Jiggling blue squares.** The globe shows chains of small blue squares (plate boundaries, I think). When I rotate the globe they jiggle rapidly. On the map they appear too, and jiggle when I pan.

## What the report should cover

- How the map and globe code is organized, and the path each takes from data to pixels.
- Every place the map and globe do the same job differently: textures, colours, scale, projection, overlays, animation.
- The root cause of each of the four problems above.
- Duplicated code, dead code, and code whose arrangement only makes sense historically.
- Overall graphic style. Is there one consistent visual language across the timeline, map and globe: colours, type, line weights, markers, labels, controls? Is it defined in one place, so anything new automatically matches? List where it's inconsistent.
- How easy is it to add tools? See the test case below.
- A proposed order of work in small steps. Each step should leave the timeline working, and looking the same except for the bugs being fixed.
- Anything risky, or anything you're unsure about.

Write it for a designer, not a programmer: short, clear, no jargon you don't explain.

## Test case for adding tools: two year markers

I want the timeline to be a place children can bring tools to. Here's the first one I have in mind. Don't build it; use it to judge how ready the code is.

- There are two markers on the timeline, and they are equals. Neither is "first" or "second."
- Whichever marker the child last touched is the current year. The map and globe show that year.
- While she drags a marker, the map and globe follow it. When she lets go, they stay at that year.
- Tapping the other marker makes it current, so she can flip the map back and forth between two moments: Pangaea, then Pangaea breaking up; the world before the ice, then after.
- The distance between the two markers is always shown. How long from the first animals to the dinosaurs? From copper to bronze?

Tell me where a tool like this would plug in, what it would need from the existing code (the current year, the scale of the timeline, the map and globe), and what would have to change first to make adding tools like this easy. The goal is that the next tool, and the one after, cost little.

## Ground rules for the passes that follow

- The goal is one shared way of drawing for both map and globe: same textures, same scale, same overlays, same behaviour in play and pause.
- One shared style, defined in one place.
- A clear, simple way for new tools to plug into the timeline.
- Keep tidying and bug-fixing separate. A tidying step should change nothing a child can see.
- Check each step against the current version before moving on.

## Coming later (don't build yet)

For the earliest Earth, I asked for invented continents whose total area roughly matches how much of the surface was continental crust at the time, even though nobody knows where they were. They currently look too angular, have no texture, and look unreal enough to distract from the story. In a later pass I'd like them to:

- have rounded, natural outlines;
- be dark gray or nearly black, with texture, so they read as pieces of continental crust;
- have semi-transparent continental shelves, so the edges look submerged;
- never pass through each other: they can collide, stick together, and break apart again.

They don't need to be realistic, only believable. Please tell me in the report whether the cleaned-up structure would make this easy, and what would need to be in place first.
