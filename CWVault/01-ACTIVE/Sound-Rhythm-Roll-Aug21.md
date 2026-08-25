---
status: Draft — design conversation, nothing built
role: The roll, the tapping bench, and colour — 21 Aug session
updated: 2026-08-21
extends: Sound-Series-Aug08.md
---

# The roll, the bench, and colour

Extends `Sound-Series-Aug08.md`, which listed "the piano roll that records rather
than plays" as one instrument among several. This session makes it the spine and
adds rhythm as its own body of work. **Nothing built.**

---

## The roll

The Jankó lattice turned on its side becomes the y axis of the shared plane, lowest
note at the bottom. Time runs right. A MIDI file played through it leaves marks on a
sheet rolling right — a graphical record of the music.

Eight groups of twelve gives 96 keys, eight octaves. Upper-right quadrant only for
now; the four-quadrant structure of Glass Multiplication is inherited scaffolding
this lab does not yet use.

**Why this beats a standard piano roll.** A conventional roll inherits the piano's
geometry, where black keys sit in cracks and vertical spacing per semitone is a lie.
Jankó makes pitch genuinely linear: one semitone, one unit, everywhere. Musical
relationships become visual geometry —

- an interval is a fixed vertical distance
- transposing is rigid vertical translation
- inverting is reflection
- a chord is a shape that keeps its shape when moved

On a real keyboard the shape mutates with every key change, which is why children
conclude music theory is arbitrary. Here it isn't.

**The scale demonstration.** Play all the notes of one major scale, move the roll,
play the next one up. Same lumpy staircase, offset. The lumpiness is what makes it
recognisable — an evenly spaced scale would slide invisibly and teach nothing.

### The colour flip

Strictly alternating white/black up the axis is a parity colouring: even semitones
one colour, odd the other. Since 12 is even the pattern repeats per octave. But the
*scale's* colouring does not survive transposition — seven notes at offsets
0,2,4,5,7,9,11 land W W W B B B B from one start and the exact inverse a semitone
up, flipping back and forth as you climb.

Same shape, inverted colours. A child comparing adjacent keys may see *different*
before she sees *same*, which is backwards from what we want.

Not a flaw in the design. It is the visible fingerprint of 7 not dividing 12 evenly —
the same fact that gives Western music its lopsided character. On a piano it shows up
as "why does F major need a B-flat." Here it shows up as a colour inversion. **A lab
eventually, not a bug.**

Options for the marks on the roll, unresolved: inherit the key colour, single neutral
colour, or colour by scale degree (decouples colour from parity entirely, makes the
pattern read identical everywhere).

---

## Colour by prime ratio

The existing Glass Multiplication colour language may transfer literally.

Intervals in just intonation **are** small-prime ratios. Octave 2:1, fifth 3:2,
major third 5:4. So the octave is prime 2, the fifth is prime 3, the third is prime
5 — the same primes the multiplication map already colours. A note is not a name, it
is a fraction, and its colour falls out of the fraction's prime factors. Same rule,
different room.

This delivers the closure failure for free: stack twelve fifths and you should land
where you started, but 3¹² ≠ 2¹⁹ — it misses by about a quarter semitone. A child
who has been multiplying primes on a plane can *see* why. (Already on the board as a
trigger point; this is the first mechanism that makes it visible rather than told.)

### Two dimensions of pitch

Pitch is height (linear, keeps rising) **and** chroma (circular, twelve positions).
Encoding octave as lightness and pitch class as hue solves the y-axis legibility
problem with one rule rather than grey strips bolted on.

Colourblind concern noted and deferred. Whatever is chosen must degrade to lightness
plus position.

---

## The circle

Not a second view of the roll — the other axis of pitch, which the roll cannot show.
Collapses the octave: every instance of a pitch class lands on one spot. A chord
becomes a fixed shape on the dial, a triangle; transposition is literal rotation.

Two orderings, same twelve points, different truths:

**Chromatic** — 1 through 12 in order, neighbours a semitone apart. Chords look like
shapes.

**Fifths** — same points reseated by repeatedly adding 7 and wrapping:
**1, 8, 3, 10, 5, 12, 7, 2, 9, 4, 11, 6**, back to 1. Every number used once, no
repeats. Published circle-of-fifths diagrams are this list buried under letter names
and key signatures. Major scale becomes a contiguous arc; keys sound near or far by
distance around the rim.

Why 7 works: seven keys up is nearly a 3:2 ratio, so walking the circle is
multiplying by 3 and folding back into the octave. It closes after exactly 12 because
7 and 12 share no factors — same reason a 12-hour clock hits every hour counting by
7s. Count by 4 instead and you close after three notes (augmented triad); by 3, four
notes. **The factor structure of 12 is the chord structure.**

### Folded and unfolded

Twelve leaps of seven keys is 84 keys — exactly seven octaves, dead on, no error.
Do it with real 3:2 ratios instead and you land about a quarter semitone *above*
seven octaves. Visibly the wrong key.

The circle only closes because the keyboard cheats. Show both: the folded walk as a
circle that closes, the unfolded walk as a staircase up the y axis that misses. 96
keys leaves headroom for the whole failed climb.

---

## Notation: two numbers

`octave.step` — first number the octave counting from the bottom, second the position
within it. `1.1` is the lowest key. `3.5` is the fifth key of the third octave.

Consistent with the no-letters decision in `Sound-Series-Aug08.md`, and the circle
only cares about the second number.

---

## Range

96 keys is comfortably audible — roughly 27.5 Hz to 7 kHz if the bottom sits near a
piano's low A. Hearing is not the constraint.

*Pitch* is narrower. Below ~30 Hz a note becomes a flutter you can count. Above
~4–5 kHz melody stops working: two tones are distinguishable but the interval between
them is not identifiable, and tunes played there don't sound like tunes. That is a
perceptual ceiling, not a speaker limit, and it is roughly the top octave.

**A finding, not a problem.** The keyboard keeps going and the music stops — a
boundary she can walk up to. The Perception Lab pitch bench is the instrument for
measuring where.

Practical: iPad speakers give almost nothing below 200 Hz, so the bottom two octaves
are headphones-only. Sine waves fare worst; harmonics survive.

---

## Rhythm, and the x axis

Grounding: **John R. Iversen**, McMaster Institute for Music and the Mind (formerly
UCSD), whose Santa Fe Chamber Music Festival talk in the Brain and Music series seeded
this. Two findings matter here.

First, the same physical rhythm produces different brain responses depending on which
metre the listener *imagines* over it. **Beat is not in the signal. It is imposed.**

Second (Iversen, Patel & Ohgushi): Japanese and English speakers group identical
alternating tone sequences differently. Rhythm perception carries an accent.

He opened by clapping twice and pointing at the audience; several clapped back. Three
claps, and everyone did, everyone smiling. *Communicating in a language we didn't know
we spoke.*

### Beat, rhythm, measure

Beat and measure are units — nested periodicities that can rule an axis. **Rhythm is
not a unit**; it is the pattern of events playing against that grid. The grid is
inferred and invisible; the rhythm is what you hear.

So the x axis wants **two rulers**: seconds, supplied by the clock, and beats,
supplied by the child. Usually they agree and nobody notices. Under expressive
playing they come apart, and on the roll that shows as marks drifting off the
gridlines. *Beat is imposed* becomes something visible rather than asserted.

Measures are multiplication on the time axis — four beats to a measure, eight
measures, the same rectangle Glass Multiplication is already about. Subdividing a
beat is that rectangle read the other way. **Both axes end up doing the same
arithmetic in different clothes.**

---

## The tapping bench

Cheap to build: any screen tap, any key. Twelve experiments worth having, grouped by
what they measure.

**Measuring yourself**
1. **Calibration** — your number, you and the machine together
2. **Synchronise** — tap along to a metronome, see the drift
3. **Continuation** — metronome stops, you keep going; your signature
4. **Limits** — how slow before the beat falls apart, how fast before the hand can't

**Where the numbers come from**
5. **Iterated reproduction** — Jacoby's; ugly ratios collapse onto small integers
6. **Ambiguity** — flat unaccented stream, tap where you feel the beat; kids disagree
7. **Subdivision** — 2, 3, 4 against one pulse; door to polyrhythm
8. **Eye vs ear** — flashing light against a click; ear wins, dramatically

**Making things**
9. **Echo** — Iversen's clapping; one leads, one follows. Social.
10. **Free tapping** — the roll just draws it, no target
11. **Two players** — mutual adaptation; who is following whom
12. **Against a real performance** — grid says one thing, the pianist says another

**Cheapest first build: 2, 3 and 9.** Shared harness, and one supplies the
calibration free.

Continuation deserves flagging as an *instrument you return to* — drift after the
metronome vanishes is stable enough to be yours, and changes across years.

### Iterated reproduction, expanded

Play a rhythm with random ugly intervals. Child taps it back. Her version becomes the
next thing she hears. Five or six rounds and it collapses onto a small-integer ratio —
1:1, 1:2, 2:1 — every time. Nobody said where to go; her own hands dragged it onto a
grid already in her head. Different cultures fall into different sets, which is the
second half of the story.

Artifact is beautiful: the drift trail plus the attractor it fell into.

---

## Calibration opens everything

**Decided this session: calibration is the front door.** Not the thing she hits after
she has been tapping.

Why it works: it is the only measurement in the app where there is no bad answer.
Whatever number comes out, the instrument is now better. That is an unusual thing to
hand a child first and it sets the terms — **this is a bench, not a test.** It asks
how she works with a machine, not how good she is.

Most children will learn the word here. **Use it plainly, once, undefined** — *this is
calibration; every instrument that measures anything has to do it* — and move on.
Defining it breaks the spell. Using it as though she already knows it is the trick.

### What calibration can and cannot fix

Fixable: the constant offset — audio output delay plus touch sampling — one number,
measured and subtracted. Bluetooth headphones contribute ~150 ms, enormous, worth
catching.

Not fixable: per-tap wobble. No calibration removes it; you beat it by averaging over
many taps, shrinking as √n.

**The honest catch, kept rather than solved.** Tapping along to a metronome, people
land 20–50 ms *early*. Real, in every study, not fully explained. So a calibration
measures child and machine tangled together and a browser cannot separate them. Fine
for comparing a child to herself across years. Not fine for comparing two children.

Say it out loud: *this measures you and your iPad together, and we can't tell which is
which.* Children like being told where a measurement stops working. It is also the
beginning of instrument error.

### Screen copy — first calibration

> Before anything else, this thing needs a number from you.
>
> Here's the problem. When you tap the screen, the iPad takes a moment to notice. When
> it makes a sound, that takes another moment. Nobody knows how long — it's different
> on every device, and it gets worse with wireless headphones.
>
> So. A click, once a second. Tap along with it.
>
> *[sixteen clicks, then the trail appears]*
>
> Your taps landed 31 thousandths of a second **before** the click.
>
> Some of that is the iPad being slow. Some of it is you. Almost everyone taps early —
> a little ahead of the click rather than on it. There's still no good explanation for
> why.
>
> There's no way to pull your part and the iPad's part apart. So the number is the two
> of you together. It's yours as long as you're on this machine. Different iPad,
> different number.
>
> *[Keep it] [Again]*

The last section does the work: the measurement is contaminated, cannot be cleaned,
and this is stated as a fact about the world rather than an apology. That is what
makes the rest of the bench trustworthy.

**Held, not built:** her number drifts over years, and the drift is mostly nervous
system rather than hardware — worth storing from the first session even though nothing
uses it. And the number differs on the Mac, which is the cleanest demonstration that
it was never purely about her.

---

## Open

- Glass Multiplication needs a new name (Michael, this session).
- Marks on the roll: key colour, neutral, or scale degree.
- Which circle ordering ships first.
- Whether calibration drift storage happens now or later.
- Colourblind degradation for the hue scheme — deferred, not dismissed.
- Still open from Aug 8: `sound` is not a valid `lab` facet value.
- `MANIFEST.md` and `00-BOARD.md` not updated for this file.
