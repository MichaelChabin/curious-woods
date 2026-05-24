# Session Handoff — March 16, 2026
## Numbers Feature: Axis Labels

**Session type:** Design + Implementation (single session, shipped)
**File modified:** `/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html`
**Status:** Complete, ready to deploy

---

## What Was Built

A **Numbers toggle** that reveals integer labels on axis points — the first step toward a child-built coordinate system in the Glass tool.

### Behavior

- **Default: Numbers ON.** 0 and 1 appear on the two seed points immediately, always.
- **X-axis integers** appear on any line drawn through seed:0 and seed:1, labeled at each point whose distance from 0 is a near-integer multiple of the unit distance. Labels are positive in both directions (map convention — no negatives). So 2, 3, 4 appear to the right; 2, 3, 4 also appear to the left.
- **Y-axis integers** appear when the child constructs a line through seed:0 that is perpendicular to the x-axis. This is an *earned* discovery — the line must be explicitly built.
- **Numbers OFF** makes all labels invisible. The toggle is in the Constructions panel, above "How this works."
- **Suppressed in glass mode** (showGlass) and in PNG/image export automatically — they bypass the render loop.
- **Logged in the operation log** as `{ op:'numbers', value:bool }` so constructions carry their numbers state through save, load, and playback.

### Visual style

- 10px Georgia, YInMn blue `#546A80`, 72% opacity
- Positioned above and to the right of each point
- Reads as a property of the geometry, not as arithmetic notation

---

## Pedagogical Intent

This feature carries a specific philosophical payload that shaped every design decision:

**"You can put 0 and 1 anywhere you like. After that, everything else falls into place."**

The seeds are always 0 and 1. They are given — a gift, a starting agreement, like "given two points." The child doesn't discover 0 and 1; she discovers that they were there all along. Everything after — 2, 3, the y-axis, integers on a perpendicular — must be constructed. Numbers are a property of space that geometry summons, not a counting system imposed from outside.

The all-positive convention (map convention) is intentional. No negatives avoids the question "why is -3 × 3 not really a square?" This is not arithmetic. It is a map. Euclid would have no objection.

The y-axis is earned: the child has to build a line through 0 that is perpendicular to the x-axis before y-integers appear. She doesn't know in advance she needs to do this — she discovers it. The numbers reward the construction.

**Practical benefit for Eileen's demo:** Numbers make it much easier to construct squares. The child can see where (1,0) and (0,1) are, and recognize that (1,1) is the corner she needs. The coordinate system and the geometric construction reinforce each other without either being explained.

---

## Implementation Details (for Coder)

Four touch points, all in `geometry-v1.html`:

### 1. State variable (CONSTANTS section)
```javascript
var showNumbers = true;
```

### 2. replayLog() — numbers op handling
```javascript
} else if (op.op === 'numbers') {
    showNumbers = op.value;
}
```

### 3. AXIS LABELS section (new, ~100 lines, after render loop)
- `getAxisLabels()` — pure function. Reads `points`, `lines`, `showNumbers`, `showGlass`. Returns array of `{x, y, text}` in screen coords.
- Detects x-axis: any line containing both seed:0 and seed:1
- Detects y-axis: any line through seed:0 whose direction is perpendicular to x-axis (dot product < 0.05)
- For each axis, walks ALL points (not just pointsOnLine) and tests via `ptOnLine()` — this catches intersection points that may not yet be registered on the line
- Integer detection: `Math.round(Math.abs(projection / unit))`, tolerance 1.2% of unit
- `drawAxisLabels()` — called at the very end of `render()`, after points are drawn

### 4. Constructions panel HTML + initConstructions()
- New row at top of panel: "Numbers" label on left, "on"/"off" toggle on right
- Clicking either fires `toggleNumbers()` which flips `showNumbers`, calls `appendOp({ op:'numbers', value:showNumbers })`, updates display
- "on" renders in muted gray `#b0a090`; "off" renders in YInMn blue `#546A80` (active state more prominent)

---

## Design Decisions Made This Session

| Decision | Rationale |
|----------|-----------|
| All-positive, map convention | No negatives. Not arithmetic. Child can construct squares without explaining signed multiplication. |
| 0 and 1 always labeled | Seeds are the given. "You can put 0 and 1 anywhere you like." Earned means nothing when you're just opening the tool. |
| Y-axis requires construction | The perpendicular must be drawn first. Numbers appear as reward for the construction. |
| Labels suppressed in glass mode | Glass is about color and form. Numbers would feel wrong there. |
| Numbers default ON | The discovery happens from seeing them. Off is for the child who wants to hide them. |
| Logged in operation log | So saved constructions replay with correct numbers state. Consistency with everything else. |

---

## Open Items (not this session)

- **iPad touch:** Numbers toggle in Constructions panel not touch-tested
- **Accidental y-axis:** Can a child accidentally construct a perpendicular through 0? Probably not. Worth watching in Eileen's demo.
- **Label collision:** At very small viewScale, labels from multiple axes could overlap. Not a problem in practice yet — no constructions reach that density.
- **Numbers in PNG capture:** Currently suppressed (correct). If we ever want a "with coordinates" export option, that's a future toggle.

---

## Deploy

Drag `/Users/michaelchabin/CuriousWoods/cw-deploys/` to Netlify.
Live at: `https://thecuriouswoods.netlify.app/geometry-v1.html`

File size: ~136KB (was 133KB before this session).
