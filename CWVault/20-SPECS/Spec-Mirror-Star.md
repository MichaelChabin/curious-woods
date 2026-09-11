---
status: Superseded 11 Sept 2026 by Spec-Trace-Bench.md — the star is one setting of the Trace bench (road star, rule channel, mirror left-right). Built as `experiments/trace.html`, not `mirror-star.html`. Kept for its context section.
pillar: Stories (tool called by The Man Who Learned Without Knowing; second skeleton of the brain series after flash-the-dots)
role: Build brief. Paste the "Prompt" section into Claude Code as-is; the rest is context it can read if it needs it.
---

# Mirror-Star — build spec

## Prompt for Claude Code

Build a single-file bench, `experiments/mirror-star.html`, for Curious Woods. No frameworks, no build step, no network calls. It must run on an iPad in Safari with a finger, and on a Mac with a trackpad or mouse. Read `00-FOUNDATION/UI-Language.md` and `00-FOUNDATION/Interface-Foundation.md` first and follow them: parchment ground `#f4f1e8`, Georgia, controls are words not buttons, the left panel breathes, the Remember inscription is present and never moves.

**What it is.** Brenda Milner's mirror-drawing task, on screen. A five-pointed star drawn as two concentric outlines with a track between them. The child traces the track with her finger or pointer while seeing only a left-right mirror of her motion. The tool counts how many times she leaves the track on each trip and how long each trip takes, and after ten trips shows her two graphs. The graphs are the point of the whole thing; do not show anything before trip ten is done.

**The star.** Regular five-pointed star (pentagram outline, not a pentagon), point up. Outer outline and an inner outline offset inward by 6% of the star's width; the track is the band between them. Star width about 60% of the shorter viewport side. Lines: YInMn blue `#2E5090`, 1.5px. Track fill: none. A copper dot `#b87333`, 10px, marks the start position, at the top point, on the track's centreline. The cursor is a second copper dot, 8px.

**The mirror.** Horizontal motion is reversed; vertical is not. Implement it as a transform on the pointer coordinates, not on the canvas, so the star itself is never mirrored and looks the same on every trip. Pointer capture on the canvas; touch events must not scroll the page.

**A trip.** Begins when the pointer goes down within 20px of the start dot and ends when, after having travelled at least 80% of the track's length, it returns within 20px of the start dot. If the pointer is lifted mid-trip, the trip is abandoned and the cursor returns to the start with no count; say nothing about it. Direction is the child's choice.

**Counting.** An error is one continuous excursion outside the track: count once when the cursor leaves the band, do not count again until it has re-entered. Errors and elapsed time per trip. Keep a faint trace of the current trip's path on the canvas (1px, `#2E5090` at 30%), cleared at the start of the next trip, so she can see where she went. Show nothing else during a trip: no running count, no timer, no trip number. A small word in the left panel, "trip 3 of 10", in the standard actionable-word style but not actionable, is the only feedback allowed.

**After ten trips.** The star fades out (400ms) and two small graphs fade in (300ms) in its place, one above the other: bumps per trip and seconds per trip, trips 1–10 on the x-axis, y from zero. Lines in YInMn blue, points in copper, no gridlines, axis labels in Georgia 14px `#2a2620`. Beneath them, one line of Georgia 20px: "Your hand learned the mirror." Nothing else — no score, no average, no comparison to anyone.

**Words in the left panel** (the Marauder's Map rule: present only when they apply). Before the first trip: "start" is not needed; she just begins. After trip ten: "again" (ten more trips, appended to the graphs as trips 11–20), "without the mirror" (same star, mirror off, three trips, plotted in a second colour, copper line, so she can see the whole difficulty was in her head), "show the star" (return to the star with graphs kept). Always: the Remember inscription; clicking it with the graphs showing saves the graph image locally.

**Tomorrow.** Store the per-trip results in `localStorage` under `cw.mirror-star.v1` with an ISO date. When the tool opens and a previous session exists from a different day, plot that session's last trip as a hollow point at trip 0, in the same graph space, once the new ten trips are done. This is the first Curious Woods tool with a come-back-tomorrow memory; keep the mechanism simple and document it in a comment block at the top, because other tools will copy it.

**Data.** Nothing leaves the device. No account, no identifier, no analytics. The stored record is plain JSON a child could read.

**Do not add:** a difficulty setting, a timer countdown, sounds, confetti, a "great job", a leaderboard, instructions beyond the single line the story gives, or any text that tells her what she should conclude.

**Test it** with a real finger on an iPad. First-trip error counts for an adult should land in the 15–40 range and tenth-trip counts in the 2–6 range; if they don't, adjust the track width (6% is the starting guess; Milner's paper track was about 5mm wide at a star about 100mm across) and report what you changed.

## Context (not part of the prompt)

*Why the graphs are hidden until the end.* The story's beat is that the feeling of not learning is not evidence. She must spend ten trips feeling clumsy with no counter reassuring her, then see the line drop. A running score would give the game away and turn the experiment into a game.

*Why mirror-off exists.* It's the cheapest way to show that the difficulty is entirely in her head, and therefore so is the learning.

*Why no comparison to others.* "Most people bump twenty or thirty times" is in the story text; the tool must never rank her.

*Source apparatus.* Milner 1962; the classic mirror-drawing star (Lafayette Instrument still sells it) is a two-outline star with a metal stylus that closes a circuit when it touches the edge. Our "error" is the same event: contact with the edge.

*Related.* flash-the-dots (Three at a Glance) is the first skeleton: show, answer, time, plot. This is the second: do, count, reveal. Sleep on It and Leave It Alone will reuse the "tomorrow" mechanism.
