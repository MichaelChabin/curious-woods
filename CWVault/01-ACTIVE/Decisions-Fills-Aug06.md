---
status: Current
role: Session ledger — the appearance of glass, settled at the bench
date: 2026-08-06
---

# Decisions — glass, light and lead

Reported by Claude Code, 6 August, working `experiments/fills-and-light.html` with
Michael. Extends `Decisions-Benches-Aug05.md`, which recorded that dimming was out but
predates all of the colour work below.

Everything here was settled by looking, not by argument. Several of these are corrections
of things that were wrong in code and only visible on screen.

---

## Decision 10 is now overturned in both halves

The plan reads: *"Selection is in the lead; discovery is in the light. Selecting a region
thickens or brightens its came. Showing a set dims everything else rather than
brightening the members."*

**Both halves are gone.**

- The second half was amended on 5 Aug: showing a set **lights its members**; the rest are
  already at rest. Nothing is degraded to make anything else stand out.
- The first half went today. Selecting a pane no longer thickens its came — **it moves the
  pane to the lit palette**, exactly as set membership does.

What replaces it is simpler and stronger: **there is one visual language for "this one",
and it is the lit palette.** Selection is a reason to be lit, not a separate kind of
marking. Two mechanisms for one idea was the mistake.

---

## Colour

**Two declared palettes, never one degraded.** Every procedural route to a quiet colour
computes something nobody chose: alpha over parchment gives pastel, mixing toward grey
gives mud, mixing toward white is desaturation wearing a different name. **You cannot
degrade a beautiful colour and get another beautiful colour.** A workshop declares a
colour per prime; a resting and a lit palette are derived from it.

**Derive in OKLCH, never in RGB.** Chroma can drop without the hue drifting or the colour
muddying. Both palettes derive from the same declared colour, so hue is held by
construction. Out-of-gamut results must be **detected and reported, not silently
clipped** — clipping happens in RGB after the conversion and shifts the very hue that
working in OKLCH was meant to preserve. A rule can look right in the numbers and be
quietly wrong on screen.

**Declare what a gradient appears to be, not what it averages.** This is the one most
likely to generalise. The eye does not average a shaded surface: it reads the lit part as
the surface colour and discounts the dark part as shading. The lab's blue pane *averages*
luminance 58 but *reads* at about 70, its bright stop. A flat fill has no shading to
discount, so matching the mean lands it twelve points dark while being arithmetically
correct. **A flat fill must declare the appearance, not the average.**

**Settings chosen by eye, 6 August**, against "As the lab ships":

| | chroma | lightness |
|---|---|---|
| resting | 93% | +6 |
| lit | 125% | +7 |

At 125% chroma, **3 and 13 leave sRGB** and are flagged. Both are yellows, where sRGB is
narrowest. About 112% clears them. Unresolved — see Open.

---

## Lead

**Every piece is leaded, not just every pane.** Decision 6 taken literally: a piece is a
region. Without inner cames, two adjacent pieces of the *same* prime share an invisible
edge, so 4, 8 and 9 render as solid blocks with no divisions at all. This was the cause of
"the separation between prime factors is hard to read, sometimes on the same number."

**Inner cames and the frame are different objects.** They carry their own colour and
weight, drawn inner-first so the frame sits over them, as real leaded glass does. Chosen:
**145 at 1px inside, 98 at 1.5px around.**

**Geometry's `#777777` came only works against geometry's glass — this is platform-level.**
It was chosen against `#c2d4bc` at luminance 207, where it is a strong dark line with 88
points of contrast. Against a dark pane at luminance 85 it becomes a *lighter* line at 34
points and stops reading as a line at all. **If both labs share leading, the came has to
work against light and dark glass both.** The bench now reports the weakest separation
across the six primes live, because this failure is invisible until you look for it.

---

## Glass

**Flat, with striations and seeds.** No gradient, no inner shadow. The doming in
Glass Multiplication is an inset edge-shadow and is not something geometry has ever had.

**Texture is directional and chosen per piece.** Pieces stack vertically so their
boundaries are horizontal; striations *across* the stack run vertical and cross those
boundaries, while *along* runs horizontal and competes with them. A glazier cuts from a
sheet and not every piece comes off it the same way round: **70% across, 30% along.**

**Per-piece lightness variation is required, not decorative.** The lab gets it free —
`background-size:155%` with a randomised position means every piece samples a different
window of its gradient, so no two are identical and the eye reads the brightest members of
a varied set. **A flat fill has zero variance, which reads as dead however bright it is.**
Lightness only; hue and chroma hold, so the prime is never in doubt. Chosen: 10%.

**Specular highlights are light reflecting off the glass**, not shading applied to it —
a different thing from the doming that was removed. Three properties, all physical:

- **Smaller highlights burn brighter.** A highlight is a reflection of the source; a
  smoother surface reflects it tightly and intensely, a rougher one spreads the same
  energy wider and dimmer. Constant intensity across sizes reads as wrong because one
  light cannot make both. Intensity scales on **area**, since the two axes move
  independently.
- **Elliptical, not round.** A reflection is the shape of the *source* seen at an angle.
  Neither a window nor the eye is a disc.
- **Only some pieces catch the light.** A flat sheet reflects the source where the angle
  happens to be right, not everywhere at once. Chosen: 20% catching, 89% strength, 203%
  elongation.

**No highlights on unlit panes.** Nothing to reflect.

---

## Motion

**The glass is fixed; only the light moves.** Striations, seeds and per-piece variation are
properties of the material. A pane that shimmers stops being a made object, and the child
cannot return to *the same window* twice. Light genuinely moves, so highlights may drift —
slowly, as the sun would, and optionally.

Performance is not the constraint and should not be cited as one: `canvas-panes` measured
**14% of the frame budget at 32×32**. What moves is a design question.

---

## Method

**Four errors today were invisible in code and obvious on screen.** Worth recording
because they are the argument for the bench, not against it.

1. Alpha-compositing translucent glass over a white backing — which reproduced the pastel
   failure *inside the mode built to cure it*.
2. Taking the dark body stop of a gradient as the pane's colour.
3. Matching the gradient's mean when the eye reads its bright part.
4. Leaving pieces with no lead between them, so same-prime neighbours merged.

Each passed review as correct code. **A perceptual question gets a bench, not an
argument** — and the corollary is that the person looking at it will find things the
person writing it cannot.

---

## Open

- **The 125% chroma gamut clip.** 3 and 13 are being clipped and their hue shifted.
  Either drop to ~112% or declare those two primes' lit colours directly instead of
  deriving them.
- **Inner came against a light resting palette.** At 93% resting chroma the 145 inner came
  nearly matches prime 13's resting colour — the readout warns at 2 luminance separation.
  Needs a value that clears all six, or a came that adapts to the pane beneath it.
- **The second, non-colour channel.** Unchanged from 5 Aug and still gates Phase 4. It is
  required rather than desirable: several real palettes have fewer than six usable hues.
- **Whether flat glass needs a highlight at all.** The specular slider exists to answer
  this and the answer is not yet recorded.
