# Session Handoff — March 12, 2026

## Active File
`/Users/michaelchabin/CuriousWoods/cw-deploys/geometry-v1.html`
Deploy: drag `cw-deploys/` to Netlify → thecuriouswoods.netlify.app

---

## What We Were Working On This Session
Fixing the geometry tool so it works identically on MacBook Pro (Retina, dpr=2) and the external 4K LG monitor.

---

## The Bug — RESOLVED March 12, 2026

### Root cause
`resizeCanvas()` was setting `canvas.width` and `canvas.height` to physical pixels (`innerWidth * dpr`) but never setting `canvas.style.width` or `canvas.style.height`. Without those, the browser sizes the canvas CSS layout box to match its pixel buffer — so on Retina (dpr=2) the canvas CSS box became 2600×1712px instead of 1300×856px. `canvas.clientWidth` then returned 2600, making all coordinate math (`w2s`, `s2w`, hit testing) wrong by a factor of 2.

### Symptoms this caused
- Points rendered at wrong screen positions
- World coordinates completely offset from where you clicked
- Hit testing effectively broken (threshold divided by wrong scale)
- Constructions impossible on MacBook
- Worked fine on external monitor only because it was running at dpr=1

### The fix (two lines added to `resizeCanvas()`)
```javascript
canvas.style.width  = window.innerWidth  + 'px';
canvas.style.height = window.innerHeight + 'px';
```
This pins the CSS layout box to CSS pixels on all screens. `canvas.clientWidth` now correctly equals `window.innerWidth` everywhere.

### Current state — confirmed working
- Both MacBook Pro and external 4K LG monitor work identically
- Points positioned correctly, hit testing works, constructions work
- `PARAMS.pointSize = 2` (reduced from 3.5 — looks right on both screens)

### Diagnostic code still in the file (remove when confirmed stable)
- `#cursor-coords` div in HTML — shows live world coords + last tapped point
- `updateCoordsDisplay()` function and `ccLastPoint` variable
- Extended startup readout block at bottom of DOMContentLoaded

---

## State of the Codebase

### What works well (confirmed on 4K)
- Infinite line construction (tap-tap)
- Circle construction (drag)
- Intersection point detection and birth animation
- Segment/arc emphasis and glow
- Region detection and fill (forest glass default)
- Color palette tool with Chartres, Gaudí, Isfahan, Alhambra, Alhambra palettes
- Lead border toggle
- Palette switcher via painting thumbnail picker
- Export as image (PNG, correct bounds, lead included)
- Save/load construction as JSON
- Undo
- Glass toggle
- Drawing Guide (SVG model overlay with scale/opacity)
- All bug fixes from previous session (Remember inscription, lead+color undo, segment hit priority)

### What is NOT yet built
1. **Constructions panel** — replaces "Drawing Guide" in Tools menu. Should show 3 default thumbnails (Equilateral Triangle, Hexagon, Nested Squares) each with "try it" (ghost overlay) and "show me" (playback from log file). Log files go in `cw-deploys/models/logs/`.
2. **Sound permission / mute toggle** in Tools menu
3. **How-To note panel**

---

## Key Constants (current values)
```javascript
PARAMS.pointSize = 3.5          // world units — but use Math.max(3.5, 8/viewScale) in render
PARAMS.lineWidth = 0.5
PARAMS.emphasisWidth = 2.0
THRESHOLDS.lineHitRadius = 14   // screen pixels
THRESHOLDS.pointHitRadius = 12
COLORS.point = '#BE622F'        // copper
FOREST_GLASS = '#c2d4bc'
LEAD_BORDER_COLOR = '#777777'
LEAD_WIDTH = 2
GLOW = { color:'rgba(84,106,128,0.18)', blur:9, width:10 }
```

## View / Coordinate System
- World coordinates: arbitrary units, centered on (0,0)
- Seeds always start at world (-100,0) and (100,0)
- `viewX, viewY` = world position at screen center
- `viewScale` = screen pixels per world unit
- `w2s(wx,wy)` → screen coords; `s2w(sx,sy)` → world coords
- Fresh load: `viewX=0, viewY=0, viewScale = Math.min(innerW,innerH)/900`
- On file load: `fitViewToConstruction()` fits bounding box to screen with 120/100px padding

## Asset Paths
| Asset | Path |
|-------|------|
| Active file | `cw-deploys/geometry-v1.html` |
| Palettes JSON | `cw-deploys/art/palettes.json` |
| Art images | `cw-deploys/art/` |
| Model SVGs | `cw-deploys/models/` |
| Vault | `CuriousWoods/CuriousWoods/` |

---

## Broader Project Context
The Curious Woods is an AI-guided educational geometry platform for children.
This file (`geometry-v1.html`) is the geometry construction workspace — Layer 1.
Maya (the AI guide, Layer 2) is not yet integrated.
The operation log (JSON array) records every action for undo, save, load, and
future Maya demonstrations ("show me" playback).

Michael works on Mac/4K at home, Eileen (astrophysicist collaborator) on MacBook Pro.
Always use `filesystem:` MCP tools to write files — never bash (bash writes to Linux container).
