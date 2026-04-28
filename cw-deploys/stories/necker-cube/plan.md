# Necker Cube Interactive — Implementation Plan

## Context

Michael designed a Necker cube perceptual learning story for CuriousWoods. The child discovers bistable perception, learns to control it through relaxed focus, then sees what happened in their brain. This is the first story-based interactive and the first use of the `stories/` directory structure. It also lays groundwork for spaced repetition practice (return visits).

The interactive is a single HTML file at `cw-deploys/stories/necker-cube/index.html`, matching the no-framework, single-file pattern of `geometry-v1.html`.

## Files to Create/Modify

- **Create**: `cw-deploys/stories/necker-cube/index.html` — the interactive (single file, all HTML/CSS/JS)
- **Modify**: `cw-deploys/index.html` — add gallery entry for the Necker cube story
- **Existing asset**: `cw-deploys/stories/necker-cube/brain-watercolor.png` (already in place)

## Experience Flow (5 Acts)

### Act 1 — Open
- Full viewport, Necker cube centered, no text
- Plain wireframe cube rendered on canvas
- Subtle "tap to begin" hint fades in after 3 seconds
- Child taps anywhere → transition to Act 2

### Act 2 — Narrative + Cube (side by side)
- **Left**: cube canvas. **Right**: text pane
- Child taps to advance paragraphs (text fades in, 600ms)
- Cube form changes as narrative progresses:
  - Paragraphs 1–4 (ambiguity): plain wireframe
  - Paragraphs 5–6 (two orientations): shaded versions A and B, alternating
  - Paragraphs 7–8 (focus circles): wireframe + copper rings on two diagonal corners
  - Paragraphs 9–end (learning explanation): focus circles remain
- Cube transitions: interpolate line weights/opacities over 400ms
- All paragraphs remain visible (scrollable), not paginated

### Act 3 — Practice
- Cube with focus circles, large on left
- Right pane: gentle prompt ("Let your eyes rest on one circle...")
- Child taps when they perceive a flip → brief acknowledgment (text like "There it is." or "Yes.")
- After ~4-5 self-reported flips, text appears: "You're getting the feel of it." with option to continue to brain animation
- No scoring, no timer, no fail state

### Act 4 — Brain Animation
- Brain watercolor replaces the cube on the left (crossfade, 800ms)
- Canvas overlay on top of the image for glow effects
- **Child taps to advance each station** — they control the pace
- Each tap:
  1. Copper/amber radial glow appears at the new station
  2. A traveling pulse connects from previous station (particle path, ~800ms)
  3. Text appears on the right describing what's happening
  4. Previous stations dim to soft afterglow (don't disappear)
- Station sequence:
  1. Retina (~120, 480) — "Light hits your retina."
  2. V1 (~880, 420) — "The back of your brain detects edges and lines."
  3. LOC (~780, 350) — "Your brain assembles the lines into a cube."
  4. Parietal (~580, 200) — "But wait — it could be two different cubes." (small cube inset flips once)
  5. Prefrontal↔Parietal shimmer (~220, 280 ↔ ~580, 200) — "Your brain holds both versions at once, switching between them." (cube inset flips rhythmically)
  6. Prefrontal (~220, 280) — "When you focus on one corner, you tell your brain which one to see." (cube stabilizes)
  7. All glow — "Six places in your brain worked together — in less than a second."
- Cerebellum (~780, 680) is visible in the image but NOT part of the animation path

### Act 5 — Close
- All brain stations glowing softly
- Final text: "This is what learning feels like. It is easy. It is fun. It is wonderful."
- Pause, then: a gentle link/prompt to return to the gallery

## Layout & Responsive

- **CSS Grid**: two columns, 50/50 split
- Left = visual pane (cube or brain), right = text pane
- `@media (max-width: 700px)`: stack vertically, visual pane 45vh on top
- Must work on 2017+ iPads (1024x768 minimum)
- Text: Georgia, 18px, 1.65 line-height, max-width 420px

## Cube Rendering (Canvas)

Four forms, all rendered on the same canvas:
1. **Wireframe**: 12 edges, equal weight (~2px), color #3D3D3A
2. **Oriented-A**: front face edges thicker/darker, back face thinner/lighter (biases "facing down-right")
3. **Oriented-B**: opposite emphasis (biases "facing up-left")
4. **Focus circles**: wireframe + copper (#b87333) rings on two diagonal corners

Transitions interpolate line weights and opacities over 400ms using requestAnimationFrame.

## Brain Animation (Canvas overlay on image)

- `<img>` for the watercolor, `<canvas>` absolutely positioned on top
- Glow effect: radial gradient centered on station coordinates, copper/amber color
- Traveling pulse: interpolate position along path between stations
- Afterglow: previous stations stay at ~20% opacity
- Final "all glow": all stations at ~60% opacity simultaneously
- Canvas scales with image (percentage-based coordinates mapped to actual pixels)

## JS Architecture

**State machine** with states: `OPEN`, `NARRATIVE`, `PRACTICE`, `BRAIN_ANIM`, `CLOSE`, `RETURN_WELCOME`

**Narrative content** as a JS array of `{ text, cubeForm, breakAfter }` objects. `cubeForm` triggers cube transitions. `breakAfter` marks act boundaries.

**Single `requestAnimationFrame` loop** — routes to current renderer based on state. Handles cube interpolation, brain glow animation, and pulse travel.

**Pointer events** (`pointerdown`) for all input, matching geometry-v1.html cross-device pattern.

**Canvas DPR scaling** following the geometry-v1.html pattern: `canvas.width = rect.width * dpr`, draw at `dpr` scale.

## localStorage Schema

All keys prefixed `cw-necker-`:

```json
{
  "cw-necker-visits": [
    {
      "date": "2026-04-05T14:30:00Z",
      "type": "first",
      "flips": 5,
      "durationMs": 45000
    }
  ],
  "cw-necker-narrative-seen": true
}
```

- `visits` array supports future spaced repetition calculations (dates, flip counts, duration)
- `narrative-seen` boolean controls first-visit vs return-visit flow

## Return Visit Flow

On load, check `cw-necker-narrative-seen`:
- **First visit**: full experience (Acts 1–5)
- **Return visit**: cube on left, welcome text on right: "Welcome back. Ready to practice?" + smaller link "Or read the full story again"
  - "Practice" → Act 3 directly
  - "Full story" → Act 1 (full replay)

## Style (matching existing app)

```
Background:  #f4f1e8
Text:        #546A80
Dark text:   #3D3D3A
Copper:      #b87333
Borders:     #c8b89a
Font:        Georgia, serif
```

## Implementation Sequence

1. HTML shell + CSS layout (responsive grid, both columns)
2. Cube canvas renderer (all 4 forms + transitions)
3. State machine + Act 1 (open screen)
4. Act 2 (narrative paragraphs + cube form changes)
5. Act 3 (practice + flip acknowledgment + localStorage)
6. Act 4 (brain image + overlay canvas + station glows + pulse)
7. Act 5 (close + return link)
8. Return visit flow
9. Update `cw-deploys/index.html` gallery entry
10. Polish: timing, transitions, responsive testing

## Verification

- Open in browser, experience full first-visit flow (Acts 1–5)
- Verify cube transitions at correct narrative moments
- Verify brain animation stations are positioned correctly on the watercolor
- Tap through all stations, confirm pulse travels correctly
- Close and reopen — verify return-visit flow appears
- Test at iPad resolution (1024x768) and phone width (<700px)
- Check localStorage entries after a session
- Check that cerebellum is not highlighted during brain animation
