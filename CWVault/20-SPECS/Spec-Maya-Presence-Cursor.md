# Spec: Maya Presence & Cursor System

**Version:** 3.0  
**Date:** February 19, 2026  
**Status:** Ready for Layer 2 implementation  
**Depends on:** Layer 1 construction engine (`/prototypes/geometry-layer1.html`)

> **Version history:**
> - v1.0 (Feb 17): Teal luminous wisp with explicit glow radii. Superseded.
> - v2.0 (Feb 19 morning): Particle system in canvas palette. Correct aesthetically
>   but individual particles on 2D canvas produced a Jackson Pollock effect, not a
>   cohesive presence. Superseded.
> - v3.0 (Feb 19): Layered gradient blobs. Same palette, same behavioral framework,
>   but rendered as overlapping soft radial gradients instead of discrete particles.

---

## Design Principle

The geometry canvas produces constructions that look like art — fine Payne's gray lines on
parchment with copper points. Maya must belong in that space. She cannot be louder than the
geometry. She cannot be more interesting than what the child is building.

She is not a character. She has no face, no body, no anthropomorphic features. She is a
presence — something attentive and alive, the way a bird's glide is not human but nice.

She is the child's first experience with machine intelligence. Not Mickey Mouse, not Clippy.
Something new that communicates attention and intention through form and behavior.

---

## Rendering Approach: Layered Gradient Blobs

Instead of discrete particles, Maya is rendered as 3-5 overlapping soft radial
gradients. Each gradient is a Gaussian blob — a concentration of color that fades
to transparent. The overlapping gradients produce internal variation that reads
as alive without anything looking like a dot or a sprite.

This approach is computationally trivial (a few gradient fills per frame),
produces smooth fluid forms, and scales without overhead.

### The Blobs

```
Count:     4 radial gradients, stacked within a containing circle

Container model: A clearly bounded circular form (~90px diameter).
The largest, darkest blob defines the outer boundary. Smaller blobs
stack progressively TOWARD the attention direction within the container,
creating an internal density gradient.

The 4 blobs (back to front, relative to attention direction):
  1. Darkest gray (#2D3D4D), 45px radius — container, centered at Maya's position
  2. Base Payne's gray (#546A80), 30px radius — offset 12px toward attention
  3. Lighter gray (#7A8FA0), 25px radius — offset 20px toward attention
  4. Copper (#BE622F), 20px radius — offset 25px toward attention (at front edge)

Each blob is a radial gradient fading from its color to transparent.
The stacking produces: copper warmth at the "face" edge, gray density
behind, all contained within the darkest circle.
```

### Footprint

```
Resting size:  ~90px diameter (the outer container blob)
               
Dense region:  The overlap zone where 3-4 blobs converge,
               shifted toward the attention direction

The outer boundary IS circular (clear, bounded, readable).
Directionality is communicated by the internal gradient — the
copper and lighter blobs cluster toward the attention side.
Mental model: "circle with weighted interior."
```

---

## Breathing

The blobs shift relative to each other over time. This produces the breathing
quality — the form is never static but never jumpy.

```
What moves:    Each blob's center offset drifts slowly. Each blob's radius
               varies slightly. Each blob's opacity varies slightly.

Rhythm:        NOT mechanical. NOT sinusoidal. Use layered noise or
               randomized easing curves so the rhythm is irregular.
               Slow inhale, slightly longer exhale, occasional pause.
               Period roughly 3-5 seconds but never exactly the same twice.

What it looks like:
               The form gently tightens (blobs drift closer together,
               overlaps increase, density rises) then loosens (blobs
               drift apart, overlaps decrease, form becomes more diffuse).
               The copper blob's opacity rises and falls with the breathing.
               
               Think of a candle flame in still air — it moves, but slowly,
               and you can't predict the next movement from the last.

Amplitudes (as implemented):
               Radius: ±6px per blob
               Opacity: ±0.12 per blob
               These are larger than initially spec'd and produce
               clearly visible breathing. Correct values.

Implementation (as built):
               Each blob's centerX, centerY, radius, and opacity animated
               via independent sine waves at slightly different frequencies
               (e.g., 0.3Hz, 0.37Hz, 0.29Hz) with random phase offsets.
               Beating frequencies produce irregular-feeling rhythm.
```

---

## Attention and Directionality

Maya's attention is communicated by where the dense region of the form points.
The offset of the blob cluster from Maya's center position determines direction.

```
How it works:  Maya has a "position" (her center) and an "attention target"
               (what she's looking at). The blob offsets are biased so that
               more blobs cluster on the side toward the attention target.

Implementation:
               Each blob has a base offset from Maya's center. When the
               attention target changes, these offsets interpolate so that
               the cluster's center of mass shifts toward the target side.
               
               The copper blob is always on the attention side — warmth
               faces what Maya is engaged with.

Default:       Attention faces canvas center, or the child's most recent
               construction area.
```

---

## Two Modes of Movement

### Attending (Attention Shift)

Maya stays in place. Her attention shifts to something new. The dense region
of the blob cluster rotates slowly to face the new target.

```
Speed:         Slow — ~800ms to 1s for a 90-degree reorientation.
               This is breathing-speed behavior. Ambient, organic.
               
What moves:    Only the blob offsets change. Maya's position stays fixed.
               The copper blob drifts to the new attention side.

Trigger:       Child starts working in a new area. An intersection appears
               somewhere. Maya notices something worth watching.
```

### Traveling (Repositioning)

Maya moves across the canvas — to demonstrate, to get closer to the action,
to give space by retreating.

```
Speed:         Movement physics from previous spec versions:
               Short moves (<100px): ~300ms
               Medium moves (100-300px): ~500ms
               Long moves (>300px): ~700ms
               Ease-in-out with slight overshoot.

Dense region:  Snaps to LEAD the direction of travel at the start of
               the move. Maya's warm, dense side faces where she's going.
               
Form stretch:  During travel, the blobs elongate slightly along the travel
               axis — stretched in the direction of movement, compressed
               perpendicular. Like a jellyfish pulsing forward.

On arrival:    The travel-stretch relaxes over ~300ms. The dense region
               then rotates (at attending speed, ~800ms) from the travel
               direction to face the new attention target (usually the
               child's work or the point she arrived at).

Principle:     Every move is intentional. Maya does not wander.
```

### Draggable (Development/Testing Only)

For tuning, Maya can be dragged by the developer. While dragging:
- Dense region leads the drag direction (travel mode)
- On release, dense region rotates to face canvas center (attending mode)
- This lets the developer see both movement modes in action

---

## Attention States Through Visual Variation

State is communicated through blob behavior, not through color changes or icons.

```
Resting:       Loose overlap. Gentle breathing. Copper blob dim (~15-20% opacity).
               Form is diffuse, present but quiet.

Attentive:     Tighter overlap. Breathing quickens slightly. Copper rises
               (~30-40% opacity). Dense region more defined.
               Triggered by: something worth noticing happened.

Acting:        Blobs converge tightly. Copper prominent (~50%+ opacity).
               Form concentrated and purposeful. Precedes coalescing into tool.

Giving space:  Very loose overlap. Blobs drift far apart. All opacity drops.
               Copper nearly invisible. Maya is barely there.
               Triggered by: child working confidently, no intervention needed.
```

---

## Transformation into Tools

When Maya acts, the blobs converge and the form tightens into a recognizable
tool shape. The transition is the announcement — the child sees what Maya
is about to do before she does it.

### Transition Quality

```
Blobs → Tool:  ~300ms. Blobs converge to a single point and the tool
               shape emerges. Copper intensifies during convergence.
               Like something gathering itself with purpose.

Tool → Blobs:  ~300ms. Tool shape softens, blobs re-emerge and drift
               apart to resting offsets. Copper fades. Returns to
               breathing rhythm.
```

### The Five Tool Forms

When blobs converge, the tool is drawn at Maya's position in Payne's gray
and copper. The blobs are hidden during the tool state; the tool form
replaces them.

**1. Crosshairs**
```
Two fine lines intersecting, small circle at center.
Payne's gray lines, copper circle. ~28px across.
Used when: selecting a specific point.
```

**2. Magnifier**
```
Circle with handle. ~32px diameter lens.
Payne's gray handle, copper-tinted rim.
Used when: points are close, precision matters.
```

**3. Pencil**
```
Elongated form, pointed end. ~8px wide, ~28px long.
Tilted ~45 degrees. Payne's gray body, copper tip.
Used when: drawing a line segment.
```

**4. Energetic Knot**
```
Compact, agitated form. ~20px diameter.
The blobs don't fully converge — they orbit tightly.
Visible tension, more copper than other forms.
Used when: drawing a circle (compass gesture).
Most expressive transformation.
```

**5. Sphere**
```
Blobs compress into a solid small circle. ~18px.
Briefly opaque and substantial. Mostly Payne's gray.
Used when: pressing a button or UI element.
Slight comic quality — becoming solid to press something.
```

---

## Demonstration Behavior

### Sequence

```
1. ATTENTIVE   Blobs tighten, copper rises. Maya has noticed something.
               Brief pause (0.5-1s) — gives the child a moment to see it.

2. REORIENT    Dense region rotates to face the relevant point (~800ms).

3. TRAVEL      Blobs stream toward the starting point. Dense region leads.

4. COALESCE    Blobs converge into tool form (~300ms).

5. ACT         Performs the gesture as a child would.
               Ghost previews appear exactly as they would for the child.

6. COMMIT      Construction appears in Maya's visual style (see below).

7. RELEASE     Tool dissolves to blobs (~300ms). Stream back toward
               resting area. Dense region rotates to face child's work.
               Copper fades. Breathing resumes.

8. INVITE      Text appears near her: "Now you try it." Fades after ~4s.
```

### Maya's Constructions

```
Visually distinct from the child's permanent work.

Color:       Payne's gray, same hue as child's lines
Opacity:     40-50% (clearly softer)
Stroke:      Slightly thinner (1px vs 1.5px)
Style:       Solid but soft — no dash

Fade:        Remain at reduced opacity for 2 minutes, then fade to 0%
             over 30 seconds. Cannot be interacted with.
```

---

## Text Near Maya

```
Font:        Georgia 16px, color #2a2620 (dark brown)
Backing:     Soft translucent parchment (#f4f1e8 at 85% opacity)
             Rounded corners (6px), padding 8px 12px
Max width:   240px

Position:    Opposite side from attention direction. If Maya faces center,
             text appears behind her toward the canvas edge.

Duration:    Short (~6 words): 3 seconds
             Medium: 4-5 seconds
             Questions: persist until child acts

Fade:        200ms in, 300ms out. Never abrupt.

Principle:   Brevity. One sentence maximum. What Maya says is more
             valuable because she says less.
```

---

## State Machine

```
States:
  RESTING       Loose blobs, gentle breathing, in resting area.
  ATTENTIVE     Tighter blobs, copper rises, brief pause.
  TRAVELING     Streaming toward a position. Elongated along travel axis.
  COALESCING    Blobs converging into tool form.
  ACTING        Performing a gesture on the canvas.
  RELEASING     Tool dissolving back to blobs.
  RETURNING     Streaming back toward resting area.
  SPEAKING      Text visible. May overlap other states.
  GIVING_SPACE  Very loose blobs, low opacity, nearly invisible.

Transitions:
  RESTING → ATTENTIVE     (event worth responding to)
  ATTENTIVE → TRAVELING   (commits to action after brief pause)
  ATTENTIVE → RESTING     (child acted first — back off)
  TRAVELING → COALESCING  (arrived at destination)
  COALESCING → ACTING     (tool form complete)
  ACTING → RELEASING      (gesture complete)
  RELEASING → RETURNING   (heading back to resting area)
  RETURNING → RESTING     (arrived, breathing resumes)
  RESTING → GIVING_SPACE  (child flowing, give room)
  GIVING_SPACE → ATTENTIVE (child pauses, re-engage)
  any → SPEAKING          (text can appear in most states)
```

---

## Point Visual Simplification (Decision: February 18, 2026)

Two states only:
- **Default** — ~3-4px solid dot, `#BE622F` copper. No animation.
- **Approach glow** — brightens/grows when construction is within snap distance.

No pulsing, no highlight-on-select. Construction preview is the feedback.

---

## Events Maya Responds To

```
POINT_SELECTED          Child tapped a point
SEGMENT_COMMITTED       Line segment completed
CIRCLE_COMMITTED        Circle completed
INTERSECTION_APPEARED   New intersection detected
INTERSECTION_PLACED     Child used an intersection
GESTURE_CANCELLED       Ghost faded, nothing created
UNDO_TRIGGERED          Single tap empty space
CLEAR_TRIGGERED         Double-tap empty space
CANVAS_IDLE             No interaction for >8 seconds
```

---

## Maya as Tool System (Decision: February 19, 2026)

Maya replaces traditional menus and toolbars.

**Pre-API:** Tapping Maya opens a small contextual menu (3-4 options max,
determined by canvas state). Styled in her visual language. Disappears on
selection or tap-away. Options like: Save, My Work, Color, Clean Up.

**Post-API:** Menu disappears. Child talks to Maya directly.

---

## File Location

Copy: `/Users/michaelchabin/CuriousWoods/prototypes/geometry-layer1.html`
To: `/Users/michaelchabin/CuriousWoods/prototypes/geometry-layer2.html`
Keep Layer 1 as clean reference — do not modify it.

**⚠️ Use `filesystem:` tools, NOT `bash_tool`.**

---

## Done When (First Pass)

**Must have:**
- 3-5 overlapping gradient blobs visible on canvas in Payne's gray + copper
- Breathing — blobs shift relative to each other at irregular rhythm
- Directional attention — dense region faces canvas center / active area
- Two movement modes working: attending (slow rotation) and traveling (stream with lead)
- Draggable for testing (dense region leads drag, rotates to center on release)
- Text appears near Maya's position, fades naturally

**Should have but can be rough:**
- One transformation (blobs converge into pencil or knot form)
- Demonstration of one construction
- Return to resting position after acting

**Can wait:**
- All five tool forms
- Full walkthrough scripted
- Contextual menu
- Giving-space behavior

**The critical question:**
Does Maya feel alive? Does she belong on the canvas next to the child's
constructions? Is she present without being distracting?
