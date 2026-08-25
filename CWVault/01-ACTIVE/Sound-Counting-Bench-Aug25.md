---
status: Draft — one thing built and shipped, several claims corrected by listening
role: Ratios delivered by counting rather than by waves — 25 Aug session
updated: 2026-08-25
extends: Sound-Rhythm-Roll-Aug21.md
---

# Counting, not waves

Extends `Sound-Rhythm-Roll-Aug21.md`. **Built and live:**
`cw-deploys/experiments/six-against-five.html`.

> **Read the listening section before reusing anything from the first half.**
> Michael tested the bench by ear and disproved three claims I had written into
> it with confidence. The corrections are the best material this session produced.

---

## The decision that reorganised the rest

Michael's objection, and it was the right one: before a child can meet ratios
through waves, she has to understand frequency as a wave and read a sine curve as
a picture of pressure. That is a long prerequisite chain for an idea that does not
actually need it.

**It does not need it.** Two clicks at 6 against 5 is a polyrhythm, countable, no
waves involved. Then add a speed knob: the same two click tracks, sped up, stop
being a rhythm somewhere around 20 per second and become a chord. Same two numbers
throughout. Nothing added but speed.

**Waves are deferred to timbre**, which is where they are genuinely required and
where she will want them by the time she arrives.

### The consequence worth naming

This collapses the tapping bench and the pitch axis into **one instrument at two
speeds**. Aug 21 already noted that a note below ~30 Hz becomes a flutter you can
count; this walks the child across that boundary on purpose, from the rhythm side.
The uncomfortable band between roughly 8 and 20 per second is neither rhythm nor
pitch and is a place to sit rather than pass through.

---

## The y axis, as it now stands

Superseding parts of the Jankó material in Aug 21.

**One column, all alike.** The two-tier Jankó layout solved a hand-span problem
that does not exist on a vertical axis. A single column of identical keys keeps the
whole payoff — one semitone, one unit, everywhere — and loses nothing.

**No built-in colouring.** Keys are white by default. Colour is applied by whatever
activity is running and means only what that activity says it means. This disposes
of the parity/colour-flip problem in Aug 21 by declining to have a default colouring
at all. *This is a decision, not an absence of one, and should be written as a rule.*

**Notation `(o,s)`, both numbers from zero.** Bottom key is `(0,0)`. Comma, not
period — `1,10` and `1,2` read as coordinates, where `1.10` and `1.2` read as
decimals and sort backwards. Michael's first sketch mixed a zero-based octave with
a one-based step; zero-based throughout is what makes the arithmetic work.

What it buys:

- Every key also has one number, `12 × octave + step`.
- Going back: `39 ÷ 12 = 3 remainder 3` → `(3,3)`. **Octave is the quotient, step is
  the remainder.** Division-with-remainder and mod 12 arrive as furniture, not as a
  topic. A clock is the same object.
- Intervals become subtraction. One-based indexing quietly breaks this.

**Gridline every 12, octave integers up the left margin.** Zoomed out, only the
octave numbers survive and the axis is a plain number line; zoom in and the twelfths
appear. That gives the two working scales a meaning beyond big-and-small.

**Sizes.** Six octaves visible on an iPad puts each key near 12px — fine to read,
too thin for a finger. Comfortable tapping wants 24px+, about three octaves. Zoom is
the reconciliation, and may want to be two named states rather than one continuous
range.

**Unresolved: two origins.** `(2,5)` is an *address*, anchored at the bottom of the
keyboard. "Seven steps up from home" is a *measurement*, anchored wherever she put
home. Both are wanted; they are different jobs, like a street number and a distance.
Fine to have both provided it is deliberate and they never share a typeface.

---

## Ratio colour

**A single note has no ratio.** A ratio needs two notes. So colour-by-ratio is
necessarily a colouring of *distance from a chosen reference*, and moving home moves
every colour — as one rigid stack twelve tall that slides intact, never reshuffling.
Which makes the shifting something to *show*: drag home, the colours slide, and what
that says without anyone saying it is that the relationship is a property of a pair,
not of a note.

**Factors of 2 are dropped before colouring**, because the y position already encodes
powers of 2. The only keys left with nothing but 2s are home and its octaves — so the
blue keys land exactly on the gridlines. The colour rule and the coordinate grid agree
without being made to.

**Important limit, established by listening (below): the colouring describes how a
note is built out of home. It does not predict how the pair will sound.** Those are
different questions and the bench separates them cleanly. Any copy that lets the
colours stand in for consonance is wrong.

A working sketch of this exists (drag home, watch the stack slide) but is **not in
the repo**; it lives only in the 25 Aug conversation. Worth staging to
`prototypes/` if wanted.

---

## What listening actually settled

Michael tested the bench by ear. Three results, all of which corrected me.

### 1. The fraction is not the sound

At the slower voice near 200 Hz, **7:5 and 45:32 are indistinguishable** — they land
about 8 cents apart, roughly a twelfth of a semitone, below what anyone can hear. I
had shipped them as opposites: 45:32 the ugly one, 7:5 the honest candidate. They are
the same interval wearing two labels.

**Therefore simple ratios cannot be the cause of consonance.** If they were, 7:5 —
small, tidy — would sound clearly better than 45:32, and it does not sound different
at all. And this generalises: any interval whatever has a tidy-looking fraction
sitting closer to it than anyone can hear. The famous fractions are *where the sweet
intervals are*, not *why they are sweet*.

This is the strongest finding of the session and it is discoverable by a child in
about ninety seconds with the bench as built.

### 2. Consonance is not fusion

I had written that the ear "reports one sound rather than two things happening near
each other." Michael: *"Are you saying that when both are going, I am hearing a
single tone. I can distinguish both frequencies."* Correct, and the claim was wrong.
Two notes a fifth apart are two notes and should be.

The one place near-total fusion does happen is the octave, and his description of it
is better than anything I wrote: **"I think I can still distinguish the two notes,
but there is no question they are the same pitch."** That is height and chroma —
Aug 21's two dimensions of pitch — arrived at by ear. Use the sentence.

### 3. Roughness lives in the harmonics; identity does not

With brightness at minimum the intervals still **"sound like the chords they should
sound like"** — so interval identity survives the loss of the overtone stack. With
brightness at maximum, 45:32 is *"almost painful."*

So the brightness knob moves how much a pair grinds without moving which interval it
is. Two things I had been treating as one come apart under a single control.

**The mechanism is roughness between near-coincident partials**, not periodicity
detection: 200 against 281 puts a 562 beside a 600, and close-but-unequal partials
grind. The real-world anchor is distortion — a flute's tritone is mild, a distorted
guitar's is savage, and distortion is a machine for adding partials, which is why
rock is built on fifths.

**Still unconfirmed:** whether 3:2 stays clean at full brightness. The check was
attempted and hit the defect below, so it has not actually been made. Ask for it.

---

## A defect found by ear

Michael, on 3:2 near 200 Hz: *"when the brightness setting gets to about 1200 hz…
there is a kind of ringing maybe or howl… It dominates the higher I go."*

Real, and mine. At those settings one full pattern is 10 ms while the click was 14 ms
long, so the code capped it at half the pattern and cut it off mid-decay at 14% of
full amplitude. Every click therefore ended in a step, and the loop seam carried a
17% discontinuity. A step is broadband; the lowpass was hiding it and opening the
filter uncovered it — as a pitched buzz at the pattern rate, 100 per second,
belonging to neither voice.

**Fixed:** clicks now wrap around the end of the buffer instead of being truncated
at it. Measured seam step fell from 0.171 to 0.007; the click now fades to 0.0035
rather than stopping at 0.143.

**Method note worth keeping.** A listener's ear located a specific software defect
from a description of its character and its dependence on a control. Any claim
gathered from a bench before this fix is suspect if brightness was involved.

---

## What the ear reports, corrected

**Pitch is the repetition rate, not the click's own sound.** The click is a short
decaying tone of its own; nobody hears it as a note. It becomes timbre. Moving the
click-pitch slider changes the character completely while the note does not move —
a five-second test, and not what anyone guesses.

**The missing fundamental.** The ear reads the *spacing* of the partials and reports
the number that would explain it, even when that number is absent. This is why the
bench survives an iPad speaker that moves nothing below 200 Hz, and the mechanism
behind Aug 21's note that sines fare worst and harmonics survive.

**The implied root, downgraded.** Two voices together imply a third repetition at the
slow voice ÷ `d`. This is a *lean*, not an audible extra voice, and I had oversold it
("sometimes you can hear it outright"). For 3:2 at 200/300 the combined partials are
nearly the stack of a 100 Hz note with members missing, which gives the ear grounds to
lean toward 100 — and that lean is why a fifth feels rooted. For 45:32 the equivalent
sits near 6 Hz, which is a flutter, so there is nothing to lean on.

**And the collapse was too hard.** I had written that lining-up, denominator size and
rootedness are "one fact described three ways." They are closely related. They are not
identical, and finding 1 above is what shows it.

---

## Positions add, ratios multiply

Walk up 4 keys then 3 more and you are at 7. In fractions, 5/4 × 6/5 = 3/2, which is
what sits at 7. Always, for any pair.

**Distance up the axis is multiplication of fractions, performed by walking.** The
keyboard is a slide rule she would be operating without being told what it is. Same
structure as Glass Multiplication, in a different room.

Limits: the specific pairing (3 steps ↔ 6:5) is historical, not derivable from
position; and the match is approximate. What is *exact* is the structure.

---

## The bench as built

`experiments/six-against-five.html` — one page, instrument above, reading below.

- **Speed** 1.5–330 per second, log, with the track ticked at both boundaries.
- **Brightness** — a lowpass. Now understood to be the roughness control rather than
  a comfort control, which is a promotion.
- **Click pitch** 400–4200 Hz, opening at 1850. Added because 1850 was a constant I
  picked by feel that shapes what you hear — precisely the situation Aug 8's rule
  covers (make the arbitrary thing visible and choosable). It also happens to sit
  beside 1800, which is 9 × 200 and 6 × 300 and therefore a partial the 3:2 pair
  genuinely shares; the buried constant had been quietly favouring the fifth.
- Both voices lay down **one identical click** and differ only in rate, so the tone
  at the top was never introduced; it assembles itself out of repetition.
- Seven ratios, 2:1 through 45:32 — and 7:5 beside 45:32 is now a demonstration
  rather than a pair of alternatives.
- **A piano strip** under the dot rows: black and white keys that slide to keep both
  voices roughly centred, a continuous marker at each voice's exact pitch, the nearest
  key lit only within **15 cents**, and a readout giving both notes with cents
  deviation. Tapping a key sets the slower voice; the faster follows by ratio.
  **Designer-facing.** Letters are deliberate here and are not the child-facing
  scheme; whether a child-facing version exists at all is open until the all-white
  axis is built.
- A side effect worth keeping: tap any key with 3:2 selected and the readout shows
  the faster voice at **+2¢**. The equal-temperament gap now announces itself in the
  corner of the screen without a word of explanation.
- Audio is a looping buffer rebuilt one full pattern long on every change — nothing
  resampled, no scheduler.
- Standalone; does not stand on the plane.

---

## The voice, and what was rewritten

The child-voice pass is approved and is carried on the bench page. Michael: *"keep
that in the same voice, which I like a lot."* It is the reference sample for the
Series.

Two short pieces sit directly under the instrument — *what note is that* and *what
the picture is showing*. A "things worth trying" list was proposed and rejected: it
reads as an assignment however it is phrased.

**The long reading was rewritten once the listening results came in.** Changes:

- *Nobody invented the numbers* moved **before** the consonance section, because the
  explanation now needs the overtone stack rather than a repeat period.
- *Why some pairs sound sweet and others sound like a scrape* replaced by *Why some
  pairs grind and others don't* — roughness between near partials, with the brightness
  slider offered as a test the reader runs rather than a result asserted.
- *The third note nobody is playing* softened from an audible note to a lean.
- *One place where it doesn't quite work* now uses the **fifth** rather than the minor
  third, because a tempered fifth beats about once a second and a tempered minor third
  does not — and it ties to the +2¢ on screen.
- *And one that's simply broken* **deleted**. Replaced by *Two fractions, one sound*:
  7:5 and 45:32 are the same sound, so the small-numbers rule fails exactly where you
  test it hardest, and the ending is the distorted-guitar anchor.
- "Small numbers, sweet. Big numbers, scrape. That's most of what a chord is" is gone.

Roughly 1,870 words. The closing line is *"The simple fractions are still where the
sweet intervals live. They are just not the reason."*

---

## Open

- **Does 3:2 stay clean at full brightness on the fixed build?** The one control not
  yet run. If it does not, the click is too bright and wants fixing before any further
  conclusions.
- Whether **brightness still earns its slot** now that click pitch exists.
- Whether 15 cents is the right lighting tolerance, and whether the piano strip is the
  right size.
- **No tapping.** Given calibration is the front door (Aug 21), the tapping version of
  this bench probably matters more than the ratio picker does.
- No way to hear a true ratio against the keyboard's approximation — the closure
  material still has no door, though the +2¢ readout is now half of one.
- Whether the strength-by-simplicity gradient on the prime colours earns its keep.
- Whether home should be uncoloured rather than sharing blue with the octave.
- Version stamps on the shipped page and on `experiments/index.html` read
  `2026-08-25 UNCOMMITTED` and want the hash at commit.
- Still open from Aug 8: **`sound` is not a valid `lab` facet value.**
- Carried from Aug 21, untouched: Glass Multiplication needs a new name; which circle
  ordering ships first; colourblind degradation for the hue scheme.
