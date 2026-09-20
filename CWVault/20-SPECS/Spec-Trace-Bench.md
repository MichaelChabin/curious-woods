---
status: Spec v1.1 — 11 Sept 2026 (empty road added; H/Z/O note corrected); from Michael's sketch and the star prototype
pillar: Labs (a bench; also called by Stories with its controls fixed)
role: What Trace is, what a story or a child can set on it, and how it is built once for every road we will ever draw. Replaces Spec-Mirror-Star.md, which becomes one setting of this bench.
intuitions: #10 (build a model, run it, look), #9 (how do you know? — the counter answers), #17 (the feeling of not learning is not evidence), #3 (the same trip as a trail, a count, and a graph)
---

# Trace

## The three skeletons

Most brain-series interactives are one of three machines wearing different skins. Naming them lets a story say which it calls and be understood.

*Flash* — show something briefly, take an answer, time it, plot accuracy and time against a variable. Three at a Glance, Four Things at Once, Forty-Seven or Fifty-Four, One Thing at a Time.

*Creep* — change something by tiny steps until she notices, record where, jump, repeat. The colour dot, Which Is Higher, How Long Is Three Seconds.

*Trace* — a road, a dot she moves, a rule about how the road may be travelled, and a counter that records what the rule catches. The star, Königsberg, a Chinese character, a labyrinth. This document.

## What Trace is

A road drawn on parchment. A copper dot that follows her finger or pointer, possibly through a transform (a mirror, a rotation, a delay). A rule that says what counts as a mistake on this road. A counter that watches every attempt and says nothing until asked. When asked, it draws the graph.

A child opens Trace as a Lab and turns every knob herself. A story opens Trace with the knobs set and the words absent, so the story stays a story. Same file, two doors.

## The four slots

Everything on the bench is a choice in one of four slots. A new puzzle is a new road, or occasionally a new rule; it is never a new program.

**Road.** The shape on the screen, as a list of line segments and arcs with a width. Starting set: *nothing* — an empty space with no road and no rule, so she can move the dot and watch what the transform does to it on its own, and with trails on, draw and see the drawing come out mirrored (Leonardo's notebooks are the story that belongs here); a square; the letters H, Z, and O, which are three different lessons in one alphabet (the H is easy under any mirror, because its strokes are only horizontal and vertical and a mirror can only reverse such a stroke, never tilt it — Michael's "simple reversal"; the Z has a diagonal, and a diagonal under a mirror is a different diagonal, which is where the fighting starts; the O has no straight stroke at all, and yet it's easy again, because the mirror of a circle is the same circle and you can simply go round the other way — the trick Michael found on the star, available on the O to anyone); the star (Milner's, two outlines, 6% track); a spiral (the corners never stop); the seven bridges of Königsberg; one Chinese character with its strokes numbered and their directions marked; and *her own road* — she draws a shape with the transform off and must then travel it with the transform on. That last one makes her the setter.

**Rule.** What the counter catches.
*Channel* — the road is a band; a collision is leaving the band. One collision per excursion: count when the dot leaves, do not count again until it has come back.
*Path* — the road is a line; a collision is the dot leaving the line entirely, with a tolerance (about the width of a fingertip on the iPad, narrower with a pointer).
*Once only* — the road is a set of segments; each may be travelled once; the counter records the order, and the attempt ends when she is stuck or has used every segment. Königsberg and the house-without-lifting.
*In order* — segments are numbered and have a direction; a collision is a wrong segment or a wrong direction. Characters.
*No lifting* — a flag on any of the above; lifting ends the attempt.

**Transform.** What sits between her hand and the dot.
*None.* *Mirror* — horizontal, vertical, or both (both is a 180° rotation, and she can discover that). *Rotation* — by any angle; 90° is the classic follow-up to the mirror, and learning transfers only partly between them. *Delay* — the dot arrives a set time after her hand; the feel of steering a boat. *Gain* — the dot moves farther or less far than her hand. *Blind* — the dot is invisible and shows itself only at a collision.

**What is counted.** Per attempt: collisions, seconds, and path length (a shorter trip is also learning). Nothing is displayed during an attempt except, at most, "trip 3 of 10" as a quiet word. The counts appear only when she asks for the graph, or when a story's set of attempts is complete.

## Trails

Each attempt leaves a trail in its own colour, from the palette already in Glass (Chartres by default), so ten trips lie over each other as ten colours. Words: *trails* (on/off) and *clear*. The stacked trails of the star are a picture of learning that needs no caption, and it is the kind of thing she may want to Remember.

## The graph

Three small charts, attempts along the bottom, zero at the base: collisions, seconds, length. YInMn blue lines, copper points, Georgia labels, no grid. A second series in copper when the transform has been changed mid-session (the star's "without the mirror"). A hollow point at attempt 0 for the last attempt of a previous day.

## Words in the left panel (Lab door)

By the Marauder's Map rule: present only when they apply, never greyed. *road* (then the list), *rule*, *mirror* (off · left-right · up-down · both), *turn* (with a small dial), *delay*, *trails*, *clear*, *graph*, *again*, *draw your own*. On the Story door none of these appear; the story sets them and may expose one or two by name (the star exposes *again*, *without the mirror*, *show the star*).

## Tomorrow

One local record per road, `cw.trace.v1.<road>`, with the date and the attempts. On a new day the last attempt is plotted hollow at 0. The mechanism is the one the star prototype uses; keep it identical across benches.

## What it must never do

Score her, rank her, congratulate her, or compare her to anyone. Show a running count during an attempt. Add sound, confetti, or a timer she can see. Explain what the graph means; the story does that, or she does.

## Honesty and calibration

The star's track (6% of width) and the Path tolerance are the two numbers that decide whether first attempts land in the 15–40 collision range that makes the story true. Calibrate on an iPad with a finger, then with a pointer, and record both in a comment at the top of the file. Milner's paper star had a track about 5% of its width.

## The stories that call it (so far)

The Man Who Learned Without Knowing — star, channel, mirror left-right, ten attempts, then *again* / *without the mirror*. The Bridges (to write) — Königsberg, once only, no transform; the reveal is that every attempt ends stuck. A Character (to write) — in order, no transform; the "again" curve is the star's curve in a different costume. The Labyrinth (to write) — Chartres, path, no transform; the surprise is the length. Sleep on It — any road, with the tomorrow point as the whole point.

## For Claude Code, when it's time

Single file, `experiments/trace.html`, no frameworks, iPad-first. Roads as data (a JSON block: segments, width, start, optional order and direction), rules as small functions, transforms as a single mapping on pointer coordinates. Read `UI-Language.md` and `Interface-Foundation.md` first; parchment, Georgia, words not buttons, the Remember inscription present and still. Build the Lab door with the empty space, the square, H, Z, O, and the star, and the channel and path rules, and the four mirrors; then the Story door, by reading settings from the URL or a small config object so a story page can include the file and call `CW.trace.open({...})`. Once only, in order, rotation, delay, gain, blind, and *draw your own* are v1. Port the star story's page to this bench and retire `mirror-star.html`.
