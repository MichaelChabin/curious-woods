---
status: Draft — opening session for a new Series, not a settled design
role: What was decided, argued and built in the 8 Aug conversation about sound
updated: 2026-08-08
---

# Sound Series — opening session

**Produced this session:** `cw-deploys/experiments/janko-lattice.html`,
`cw-deploys/experiments/janko-midi.html`. Everything else here is conversation.

---

## What this is

A lab for sound, standing alongside Glass Multiplication and Glass Geometry rather
than inside them. Not a music-appreciation module and not notation instruction. An
investigation of what sound is made of, with instruments a child plays rather than
lessons she receives. Inspiration is *Why You Hear What You Hear*.

Michael's earlier name for this material was **Music for Physicists**; the board
already carries it as a parked thread. This promotes it and widens it.

Two reasons to build it soon. First, it is genuinely unlike the existing labs, so
structural holes in the shared plane should surface fast — sound puts **time on one
axis and frequency on the other**, which are different kinds, and frequency wants a
logarithmic axis while time stays linear. If pan-and-zoom survives one linear and one
log axis, the plane is a real platform. If it does not, better to find out now.
Second, Michael is learning the material as he goes, which is useful evidence about
what a newcomer needs.

---

## The central pedagogical problem

Twelve tones can be understood two ways. Both are valid, both are necessary, and they
do not agree.

**Ratios.** Two notes sound sweet when their frequencies are small whole numbers apart
— 2:1, 3:2, 4:3. Arithmetic, audible, and the same object as fractions-as-chords.
Explains *why* consonance exists.

**Equal steps.** Twelve identical multiplications, each ×2^(1/12), stacking to exactly
2. Geometry. Explains why the lattice shape slides and every key is the same.

Equal temperament's fifth sits about two cents below 3:2. Twelve stacked fifths
overshoot seven octaves — 531441 against 524288, already on the board as a trigger
point. The circle does not close.

**The gap is the best thing in the lab, because it is audible.** Sound a pure 3:2
against an equal-tempered fifth and you hear a slow throb — beats, a few per second.
Tune by ear until the throb stops, then read off the ratio you landed on. That is a
measurement made with the ears, and it needs nobody's authority.

This is the walking stick again: two rulers that refuse to commensurate, and the
mismatch is the finding, not the failure.

---

## Decision: no traditional notation

No letters, no sharps, no flats, no staff. Same rule as *number is not numeral* — C♯
and D♭ and 61 and 277.18 Hz are one thing in four costumes, and letters are the costume
carrying the most historical lint.

Three honest replacements, all already in hand: **steps from a home you chose** (0–11,
what the lattice shows), **ratios** (3:2), **frequencies** (Hz). A child moves between
them, which is the point — i03, multiple representations, almost by construction.

Useful accident: MIDI is already numbered, 0–127, one per semitone. The hardware speaks
this language natively; letters only appear when software puts them there.

**This must not be a secret.** Framed as a preview — the shape of sound, why you hear
what you hear — and said out loud once that names exist and we are not using them yet.
If she takes up an instrument she meets the letters in week one, and it should feel like
*oh, that's the old name for step 7*, not like she was misled.

Claude drifts back to letters when explaining rather than building, because every
published source uses them. Tells: "the key of", "sharp", any letter reached for as a
shortcut. Flag it.

---

## The Jankó lattice

Two tiers, all one colour, alternating notes. Front tier steps 0, 2, 4, 6, 8, 10; back
tier 1, 3, 5, 7, 9, 11, offset by half a key. Twelve notes across six key-widths, so an
octave is in a child's hand.

Jankó was a real keyboard — Paul von Jankó, 1882, full lever keys, not buttons; pianos
were built with it and it flopped commercially because nobody wanted to relearn. (The
button relatives are the chromatic button accordion, the Wicki-Hayden concertina, and
modern hex controllers.) A proper Jankó has six rows, three copies of the two-tier pair,
solving a hand-mechanics problem that does not exist on glass. **Two rows is the honest
minimum and the right choice for a screen.**

### The all-white departure

Jankó kept black-and-white as a landmark. That colouring encodes C major specifically —
a historical accident frozen into hardware, and the reason one key feels plain and
another exotic when structurally they are identical. Removing it is more honest but costs
bearings.

The fix is better than colour: **let the child choose home, and mark that.** The landmark
moves with her decision. Transposing becomes picking up the marker and setting it down
elsewhere; the shape she learned still fits. Same move as the walking stick — make the
arbitrary thing visible and choosable rather than hidden.

### The shape

Major scale from home reads as three on the front tier, four on the back, then the front
key closing the octave. Rigid, slides intact. Moving home by one semitone flips tiers — a
half-step is a diagonal step in this lattice, which is the honest fact rather than a
glitch.

### Scales worth including

Three shapes, not more. **Major**; **natural minor** only — the classical three-form minor
is a notation problem, not a sound problem; and **pentatonic**, which earns its place
because nothing sounds wrong in it. Five notes, any order, always works: permission to
improvise on day one. It is also the most globally common scale on earth, which makes the
cross-cultural point without a word of explanation.

Better still: let her **build her own shape** from any subset of the twelve, sliding like
the others. Then major and minor are two of her collection rather than the two official
ones. Same code.

### Cello overlay — open

Eileen is learning cello, so this has a real user. The catch is more interesting than the
feature: on a piano each pitch has one key; on a cello most pitches live in **three or
four places** — different string, different position, and they do not sound identical.
There is no such thing as "the fingering."

The part worth putting on screen: cello strings are tuned in **fifths**, each seven steps
above the last, so the four starting points sit at 0, 7, 14, 21 — a repeating diagonal on
the lattice. The 3:2 ratio is built into the pegs, the way the guqin's thirteen studs are
its harmonic nodes inlaid as furniture.

Direction chosen: **highlight one suggested string, indicate the alternatives.** Open:
string letters, or strings numbered 1–4 from the bottom, which is more consistent with
dropping notation and makes the fifths spacing visible as numbers.

---

## The sound-space material

Sound from a source fills a roughly spherical volume, intensity falling as 1/r².
**This is an area fact in disguise** — energy spreads over 4πr², so doubling distance
quadruples the surface and quarters the intensity. Same object as a rectangle doubling
its side. Not "it gets quieter" but *here is the surface it is spread across.* (i01, i05.)

Two corrections that improve the picture:

Real instruments do not radiate spheres. A violin is lumpy; brass beams its highs forward;
low notes go everywhere. That is why your seat matters, and it makes a good slider — the
sphere deforms per instrument.

In a hall the 1/r² dies. Past the **critical distance**, reflected sound outweighs direct
sound and the level roughly stops falling. **That is the reason halls exist.** Row 4 and
row 24 hear nearly the same loudness and radically different sound.

Punchline for the whole thread: **air carries only one number at each point.** Blending is
addition. The eardrum reads a single wiggling line — an orchestra is a sum.

Two possible outputs, both held: a talk for the Santa Fe Chamber Music Festival audience,
and the lab. Different animals, built differently.

---

## Where a tradition spends its precision

Michael's line, worth keeping and worth hedging:

> Japanese practice puts its attention inside a single note where Western practice puts
> it between notes.

Hold it as a **lens, not a law**. Safer general form: *every tradition attends to both,
and they differ in where they spend their precision.* Same claim, nobody flattened, still
true when a child goes looking. (Chinese theory has ample between-note structure,
including a twelve-pitch system built from stacked 3:2s that hit the same closure
problem, and equal temperament solved there decades before Europe. A violinist's vibrato
is entirely inside the note.)

The scales are almost a non-event for the lattice, which is good news — yo and in are
five-note selections from the same twelve, so they are other shapes to slide. The real
material is timbre, which is what a spectrum view shows and what the book is about.

**Sawari** on the shamisen is the star: a bridge built so the string buzzes against it.
Engineered inharmonicity — added partials outside the harmonic series, on purpose, because
the sound is considered more alive. Western makers spent centuries eliminating exactly
that. Same physics, opposite aesthetic verdict, and buildable with a paperclip on a rubber
band. (i14, i15.)

Shakuhachi is nearly as good: overblowing walks the harmonic series with breath, so the
ratio ladder becomes something a body does. *Meri-kari* bends pitch continuously, which
quietly says the twelve are a choice.

What she should carry into a seminar seven years later is not Japan. It is **twelve was a
choice, somebody chose differently, and both were reasonable.**

---

## The liberal-arts argument

What a first-year is assumed to have is not knowledge but **recognition** — not "I know
about the guqin" but "I have met this, it is not strange." Recall is testable;
recognition only accumulates. Seven years of encounters beats any list, which is why the
MIT-backward exercise produced intuitions rather than requirements.

Music suits this because the encounter can be **made** rather than read. She does not
learn that a shamisen buzzes on purpose; she puts a paperclip on a rubber band and hears
a Western maker's nightmare become somebody else's beauty. A memory with her hands in it.

**Rule: the culture arrives attached to a tool, never as context delivered before the
fun.** The moment a paragraph about Japan precedes the buzz, it is a lesson.

---

## Instrumentation and privacy

The valuable signal is **how children move through the material** — which lab holds
attention, where a story is abandoned, which beat lands. No person attached, and none
needed. Say it that way: *"training on children"* and *"understanding how children move
through material"* sound similar and land completely differently. The first phrase should
not appear in any pitch.

Design constraint worth designing around now: under COPPA a persistent identifier counts
as personal information even when meaningless to us. The *support for internal
operations* exemption likely covers continuity and analytics, but it is narrow, and
stepping outside it triggers verifiable parental consent — which would kill the
frictionless entry the whole design depends on.

Clean architecture: **her identity and her history live on her device and never arrive.**
The received stream is unstitched — events, not sessions, not joinable back to a person.
She gets years of her own data; we get the shape of how children move; the two are never
the same table.

---

## Held, not pursued

**Piano tutoring via MIDI.** Synthesia and Flowkey already do the feedback loop. What
nobody has is the front half — arriving at the keyboard already knowing what an octave
*is*. That gap is ours. Not the project.

**EEG.** Elemind does phase-locked audio for sleep onset, which is well supported;
entrainment for *skill acquisition* is not, and consumer dry-electrode forehead EEG
largely reads muscle tension and eye movement. Honest use is a **state read** — engaged,
or fried and should stop — with no claims about waves teaching anything.

**Guiding fingers.** Haptic gloves for piano have failed repeatedly, because what
beginners get wrong is wrist height, forearm rotation and tension. A glove cannot fix a
shoulder. **But MIDI gives velocity and timing on every note, so tension is visible in the
data** — fourth finger consistently softer, timing wobbling one direction. You can see
the physical fault and say "your hand is working too hard," which is what a good teacher
says. Same insight, no hardware.

---

## Inventory

**Instruments** — the lattice (built, two versions); the **piano roll that records rather
than plays**, which is the plane with pitch up and time across, letting her move the holes
and hear what happened; the beat-tuner; the sawari bench.

**Sights** — a spectrum view (half the series needs it, nothing substitutes); the sphere
overlay; the orchestra-is-a-sum demonstration.

**Openings** (short, no tool) — how a speaker works; MIDI versus a recording, instructions
versus a trace; where a tradition spends its precision.

**Threads that fire later** — twelve is a choice, and the line was never divided; critical
distance and why halls exist; equal steps against whole ratios.

---

## Open questions

- What opens the series. The beat-tuner is argued for: the only one where she measures
  with her ears and gets a number back. Not settled, and Maya can generate stories ad hoc
  once the lab exists, so the opening need not be decided first.
- A name for the story form (see `03-SEEDS/story-with-instruments.md`).
- Cello overlay: string letters or numbers 1–4 from the bottom.
- **`sound` is not a value in `lab`.** The facet vocabulary lists `euclid`,
  `number-theory`, `codes-bases-modulus`, `perception`, `none`. If this is a Lab it needs
  a value, and only Michael approves one. Seeds written meanwhile use `lab: none`.
- Whether the sphere-of-sound material becomes a festival talk, a lab, or both.
- Two existing files claim adjacent ground: `experiments/sound-workbench.html` (gesture
  and feedback sounds) and `experiments/prime-tones.html` (11 and 13). Decide whether
  either belongs to this Series or stays interface work. Note also that `prime-tones.html`
  is listed in `experiments/index.html` but **not** in `MANIFEST.md`.
