---
kind: lab
status: moving
intuitions: [i03, i05, i11, i17]
domain: [perception, music, biology, mathematics]
era:
place:
scale: [frequency, time, count]
lab: perception
hook: How small a difference can you tell? Find out, then find out again next month.
---

# The Perception Lab

Colour discrimination, pitch discrimination, rhythm discrimination. **One build, three
axes** — the measurement harness is the expensive part and it is shared. The child picks
the dimension she wants to be tested in, which is the point: she is not being assessed,
she is calibrating her own instrument.

All three improve with practice. That is the whole pedagogy. A number that moves because
she worked on it is worth more than any explanation of what perception is.

## Status

The colour tool was an artifact, not an HTML file, which is why it is not on disk. Its
full design is recovered below from Michael's own description (21 June and 4 August) and
is easy to replicate — the build is a couple of hours, not a rediscovery project.

The MIDI keyboard now connects to the Mac, which supplies a pitch source and unblocks the
suspended *Music for Physics* work at the same time.

**Unverified and worth chasing:** the 4 August session records that Claude Code had
previously built two sound tools and a Music for Physicists lab. Only
`experiments/sound-workbench.html` appears in `MANIFEST.md`. The other two are unaccounted
for.

## The three instruments

### Colour — recovered spec

A rectangle in a colour the child picks. A filled circle inside it, same colour, moving and
bouncing off the walls — so invisible. Every quarter second the circle's colour shifts by a
small equal increment. The child taps the moment she can see it. On the tap: the rectangle
changes to the circle's new colour, the circle sets off again in a random direction and is
once more invisible, and a narrow swatch is added to a growing stripe below, spaced by the
distance between the two detected colours.

What the stripe is: **a ruler whose unit is her own perception.** Every band is one step she
can just barely see. She is measuring colour space by counting her own perceptible steps.

### Pitch — the twist the colour version does not have

Same structure: a reference tone, a second tone drifting away, tap when you hear two. But
pitch is ratio, not distance. A child who detects 3 Hz at 200 Hz needs roughly 15 Hz at
1000. So her stripe does not come out evenly spaced — **it stretches.** The logarithmic ear
falls out of her own measurements rather than out of a definition, which is exactly the
beads-around-the-circle move in another substrate.

It also lands on the Jankó lattice: a JND in cents tells her how many keys wide her
smallest perceivable step is. She discovers *why twelve* — and that she could probably hear
twenty-four.

### Rhythm — a distribution, not a threshold

Tap along to a beat; get back the scatter of your own errors, some early, some late, with a
spread. A child's first honest encounter with variance, and the practice-over-time view is
her first graph of her own data with a trend in it.

**Framing discipline:** *here is the shape of your tapping*, never a number that goes up.
The no-assessment principle is load-bearing here and rhythm is where it is easiest to break.

## Michael's own objection, and why it is the doorway

He flagged the colour tool as not very meaningful for a child with no practice. As a
one-shot he is right — it is just a number. But acuity is trainable. Run it as
before-and-after, with sorting or listening or tapping in between, and **the stripe getting
visibly finer is the lesson.** She watches her own eye sharpen. The weakness is the feature.

This also makes the Lab the floor under the sorting work: you cannot sort what you cannot
tell apart, and you cannot rank below a JND. Discrimination is the grain of the whole
selection space.

## Why it is a Lab and not three interactives

Substantial, visual, direct, reusable, open-ended — it meets the criteria in
`CW-System-Foundation.md`. More importantly, a child returns to the same element in
different contexts, which is the definition of a lab rather than an activity. She meets
just-noticeable-difference in colour; later, in pitch, she meets it again and recognises
it. The recognition *is* i03, multiple representations of the same thing — and it is a
much better route to i03 than telling her.

## The connective payload

`scale: frequency` is not decoration. It is the same axis that carries Röntgen's X-rays
and Marconi's radio in `year-of-seeing-11895`. The child measuring which greens she can
tell apart is working on a slice of the electromagnetic spectrum, and she can be shown
that later, from either end, without anyone having authored a link.

`i11 — measure by counting, refine to converge` is the deep one. A staircase procedure
that narrows until it converges on her threshold *is* a limit process. She will meet it
again in the beads around the circle.

## Open

- **Does it inherit the coordinate-space substrate, or is it built free of it?** Asked
  and not yet answered. This decides the shape of the next month.
- What claims `timbre`? Reserved in the Glass Multiplication ledger and unspent. The
  Perception Lab is the obvious claimant and should not take it by accident.
- Does the child's threshold history live locally and portably, like everything else?
  Presumably yes, but it is the first genuinely longitudinal data in the project.
