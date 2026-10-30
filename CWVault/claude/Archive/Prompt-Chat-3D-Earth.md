# Chat prompt: A 3D Earth for the Time Machine

*26 Oct 2026. Paste the block below into a new chat in the CW project. Best after the standard chat (`Prompt-Chat-Graphics-Standard.md`) has produced `claude/Standard-Interactives.md`.*

> We're designing a true 3D Earth for the Time Machine, to replace the 2D-canvas globe without losing anything it does. Michael "hates having two approaches to the same problem," so the goal is **one Earth object** that serves the deep-time globe, story maps, Drain the Sea, and the cut-away interior.
>
> **Read first:** `claude/Worknote-3D-Session-25Oct.md`; `claude/Standard-Interactives.md` if it exists; `claude/Spec-Maps.md`; `claude/Spec-Drain-the-Sea.md` and `claude/Notes-Drain-the-Sea-Held.md`; `claude/Prompt-Timeline-Graphics-Go-Ahead.md` and the timeline audit it cites. Then open the *Early Earth, Cut Open* sketch. The current globe is `cw-deploys/js/globe.js` in the vault; its header comment explains the five words of knowing, the skin, the molten sequence and the motion model. Read it; don't infer it.
>
> **The idea in one paragraph.** Today the globe works out each pixel in JavaScript: which plate is here at this age, turn it back to today, read today's picture. On the graphics card, a shader does the same per pixel, all at once: today's picture, a "which plate" picture, and a small table of each plate's turns by age. That makes the globe fast and truly round, so it can be lit, tilted, cut open, zoomed until it flattens into the map, and turned to follow a voyage.
>
> **What Michael has said** (25 Oct): the globe is probably a better default than the flat map at the end of stories, but stories choose; far out a globe, close in the map's detail; a voyage gets a time control with the boat kept centred; NASA Blue Marble for the ground; when she lowers the sea or moves continents, the shift from photograph to painted "signals the transition from data to model," and that's good; the photograph should fade, not snap. The Ideas Ledger's 25 Oct entries hold the rest.
>
> **What this chat should produce**, in order, each read by Michael before the next:
>
> 1. **A read-only Claude Code audit prompt.** Before designing, find out: everything `globe.js` does and every page that calls it; which parts move to a shader and which stay in JavaScript; what Drain the Sea needs (sea-level layer, seafloor age, stripes, probe, depth gauge, water ball as a real sphere); how the map's tile pyramid could feed close zoom; and an honest cost. This can fold in the held Drain the Sea audit (`Prompt-Audit-Drain-the-Sea-vs-Time-Machine.md`, whose wording is out of date).
> 2. **A spec**, `claude/Spec-Earth-3D.md`: the one object, its layers (ground, plates, sea level, ice, the five grades of knowing, the interior), its gestures, the globe-to-map zoom, what is kept exactly as now, and a migration that leaves every page working at each step.
> 3. **A bench prompt**, then the build prompts, staged.
>
> **Ask Michael first:** whether the 3D Earth should arrive in the Time Machine at once, or on a bench beside it until it matches; and how he wants the interior (the cut-away) reached from the globe.
>
> **Out of scope:** stars, gases, the Moon story's words. Name open items and don't invent them. Stop and report before any commit. Log ideas with the cw-ideas skill at the end.
