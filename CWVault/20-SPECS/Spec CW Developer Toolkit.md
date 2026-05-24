# Spec: CW Developer Toolkit (cw-dev-tools.js)

  

**Version:** 1.0

**Date:** February 20, 2026

**Output file:** `/Users/michaelchabin/CuriousWoods/tools/cw-dev-tools.js`

**Status:** Ready to implement as a standalone session

  

-----

  

## What This Is

  

A single injectable JavaScript file that adds a visual design toolkit to any

Curious Woods HTML prototype. One script tag activates it. Removing the tag

leaves the prototype completely unaffected.

  

This is a development tool, not a product feature. It exists to let Michael

specify visual design precisely and interactively — replacing language descriptions

with exact coordinates, sizes, colors, and component definitions.

  

Every coding chat should know this file exists and offer to include it when

building new prototypes.

  

-----

  

## How to Invoke

  

Add one line to any HTML prototype:

  

```html

<script src="/Users/michaelchabin/CuriousWoods/tools/cw-dev-tools.js"></script>

```

  

A small, unobtrusive toolbar appears at the bottom of the viewport.

All dev tools are accessed from this toolbar.

The toolbar and all overlays are removed when the script tag is removed.

Nothing in the prototype’s own code is affected.

  

-----

  

## The Toolbar

  

Fixed position, bottom center of viewport.

Dark background (#1a1a1a), subtle, stays out of the way.

Seven icon buttons, each activating one tool mode.

Keyboard shortcut: backtick (`) toggles the toolbar visible/hidden.

All tools are inactive by default — toolbar present but not interfering.

  

```

[ ⊹ Layout ] [ ⬜ Component ] [ — Lines ] [ 𝐓 Text ] [ ◉ Color ] [ 🖼 Underlay ] [ ⬇ Export ]

```

  

-----

  

## Tool 1: Layout (Draggable Areas)

  

**Purpose:** Define regions of the page by dragging resizable rectangles.

Replaces “put the tile grid in the upper left area” with exact coordinates.

  

**Behavior:**

  

- Click Layout tool → cursor becomes crosshair

- Drag to draw a labeled rectangle on the page

- Rectangle is resizable (drag corners/edges) and moveable (drag interior)

- Double-click rectangle to name it (“tile grid”, “beat indicator”, “score display”)

- Label appears inside the rectangle

- Multiple rectangles can coexist

- Rectangles are semi-transparent so the prototype shows through

  

**Visual style:**

  

- Border: 1px dashed #4AABAA (teal)

- Fill: rgba(74, 171, 170, 0.08) — barely visible tint

- Label: white, 11px, top-left corner of rectangle

- Resize handles: small teal squares at corners and edge midpoints

  

**Export format:**

  

```javascript

layout: {

tileGrid: { x: 120, y: 80, width: 640, height: 400 },

beatIndicator: { x: 120, y: 500, width: 640, height: 60 },

scoreDisplay: { x: 780, y: 80, width: 180, height: 60 }

}

```

  

-----

  

## Tool 2: Component (Buttons and Text Boxes)

  

**Purpose:** Define UI components visually. Specify shape, size, padding,

color, text, font, and border by manipulating a live preview.

The coder gets exact specifications, not descriptions.

  

**Behavior:**

  

- Click Component → a floating component editor appears

- Choose component type: Button or Text Box

- A live preview renders in the editor as properties are adjusted

- Drag the preview onto the prototype page to place it

- Placed components are moveable and resizable

- Multiple components can be placed

  

**Button properties:**

  

```

Shape: Rectangle | Rounded (radius: 4-24px) | Pill | Circle

Width: numeric input or drag

Height: numeric input or drag

Padding: top/right/bottom/left (px)

Background: color picker (see Color tool)

Border: width (px), color, style (solid/dashed/none)

Text: input field

Font: family (Georgia | system-ui | monospace), size (px), weight

Text color: color picker

Shadow: none | subtle | medium (offset, blur, color)

```

  

**Text Box properties:**

  

```

Width: numeric input or drag

Height: auto | fixed (px)

Padding: top/right/bottom/left (px)

Background: color picker or transparent

Border: width, color, style

Font: family, size, weight, line-height

Text color: color picker

Text content: editable sample text

```

  

**Export format:**

  

```javascript

components: {

primaryButton: {

type: 'button',

width: 160, height: 44, borderRadius: 8,

padding: { top: 0, right: 24, bottom: 0, left: 24 },

background: '#2c5aa0',

border: { width: 0, color: 'none', style: 'none' },

text: 'Begin',

font: { family: 'Georgia', size: 16, weight: 'normal' },

textColor: '#ffffff',

shadow: 'none'

}

}

```

  

-----

  

## Tool 3: Lines

  

**Purpose:** Specify line visual properties — width, color, opacity.

Particularly useful for the geometry canvas and any structural visual elements.

  

**Behavior:**

  

- Click Lines → floating panel with sliders and inputs

- Draw test lines directly on the prototype to preview settings

- Properties apply to all test lines drawn in this session

- Adjust until the line looks right, then export

  

**Properties:**

  

```

Width: 0.5 — 4px (slider + numeric input)

Color: color picker

Opacity: 10 — 100% (slider)

Style: Solid | Dashed | Dotted

Cap: Butt | Round | Square

```

  

**Export format:**

  

```javascript

lines: {

constructionLine: { width: 1.5, color: '#546A80', opacity: 1.0, style: 'solid' },

infiniteLine: { width: 1.0, color: '#546A80', opacity: 0.8, style: 'solid' },

gridLine: { width: 0.5, color: '#546A80', opacity: 0.4, style: 'solid' }

}

```

  

-----

  

## Tool 4: Color

  

**Purpose:** Sample colors from anywhere on screen, build and save a project

palette, assign palette colors to prototype elements.

  

**Behavior:**

  

**Sampling:**

  

- Click Color → eyedropper cursor

- Click anywhere on screen → samples color at that pixel

- Sampled color appears in a swatch with its hex value

- Option to add to palette

  

**Palette:**

  

- 12 swatch slots (enough for a complete project palette)

- Click a swatch to select it as the active color

- Drag swatches to reorder

- Right-click swatch to rename it (“parchment”, “Payne’s gray”, “copper”)

- Palette persists in localStorage between sessions

  

**Assigning colors:**

  

- With a palette color selected, click any component or line on the prototype

- That element’s color updates to the selected palette color

- Works on: Layout rectangles, Component previews, Line test strokes

  

**Curious Woods default palette (pre-loaded):**

  

```

#f4f1e8 parchment (canvas background)

#546A80 Payne's gray (primary accent)

#3D3D3A dark gray

#2a2620 dark brown (text)

#2c5aa0 blue (active/selected)

#BE622F copper (points)

#4AABAA teal (Maya)

(5 empty slots)

```

  

**Export format:**

  

```javascript

palette: {

parchment: '#f4f1e8',

paynesGray: '#546A80',

darkGray: '#3D3D3A',

darkBrown: '#2a2620',

blue: '#2c5aa0',

copper: '#BE622F',

teal: '#4AABAA'

}

```

  

-----

  

## Tool 5: Reference Image Underlay

  

**Purpose:** Place a reference image beneath the prototype at adjustable opacity.

Build toward a visual target rather than building blind.

Replaces “move it a little to the left” with direct visual comparison.

  

**Behavior:**

  

- Click Underlay → file picker opens

- Select any image file (PNG, JPG, SVG)

- Image appears behind all prototype content at 30% opacity

- Opacity slider: 10-80% (never full opacity — always shows through)

- Image is centered and scaled to fit viewport by default

- Position: locked (underlay is a reference, not an element)

- Toggle: show/hide underlay without losing the image

- Multiple underlays not supported — one reference at a time

  

**Use cases:**

  

- Sketch or mockup as underlay, build prototype on top

- Screenshot of a reference app to match layout

- Color reference image for sampling

- Animation keyframe reference

  

**Note:** Underlay image is not exported — it’s a session reference only.

  

-----

  

## Tool 6: Coordinate Inspector (always active)

  

**Purpose:** Show exact coordinates as cursor moves. Click to drop a named marker.

  

**Behavior:**

  

- When any dev tool is active, a small readout follows the cursor showing x, y

- Coordinates are in the prototype’s coordinate space (not screen pixels)

For canvas-based prototypes: world coordinates if available, screen otherwise

- Click anywhere (when in Layout or Component mode) to drop a coordinate marker

- Markers are small teal crosshairs with coordinate label

- Right-click marker to name it

- All markers included in Export

  

**Readout appearance:**

  

- Small dark pill, top-right of cursor

- White text, 11px monospace

- “x: 342 y: 218”

  

-----

  

## Tool 7: Export

  

**Purpose:** Output all current specifications as a JavaScript object,

ready to paste to the coding chat.

  

**Behavior:**

  

- Click Export → modal appears with formatted output

- Output includes all defined: layout areas, components, line specs,

palette, coordinate markers

- “Copy to clipboard” button

- Optional: “Download as .json”

  

**Full export format:**

  

```javascript

const cwDesignSpec = {

palette: { ... },

layout: { ... },

components: { ... },

lines: { ... },

markers: {

origin: { x: 400, y: 300 },

tileStart: { x: 120, y: 80 }

}

};

```

  

This object is pasted directly to the coding chat with the instruction:

“Use these specs for the visual design.”

  

-----

  

## Keyboard Shortcuts

  

```

` Toggle toolbar visible/hidden

Escape Cancel current tool, return to idle

Cmd+Z Undo last dev tool action (does not affect prototype)

Cmd+E Open Export panel

1-6 Activate tools 1-6 directly

```

  

-----

  

## Technical Implementation Notes

  

**Single file, no dependencies.** Pure vanilla JavaScript. No frameworks,

no external libraries. Must work injected into any HTML page regardless of

what the page itself uses.

  

**Non-invasive.** The toolkit creates its own DOM layer (fixed position,

high z-index) that sits above the prototype. It does not modify the prototype’s

DOM, CSS, or JavaScript. Removing the script tag leaves no trace.

  

**Overlay architecture:**

  

```

z-index 10000: Toolbar

z-index 9999: Tool panels and editors

z-index 9998: Layout rectangles, component previews, markers

z-index 9997: Reference image underlay

z-index 1+: Prototype content (unaffected)

```

  

**State management:** All toolkit state in a single `CWDevTools` namespace

object. No globals polluted. No conflicts with prototype code.

  

**Coordinate mapping:** For canvas-based prototypes (like the geometry engine),

the toolkit should detect if a `getWorldCoordinates(screenX, screenY)` function

exists and use it for coordinate display. Otherwise display screen coordinates.

Document this convention so all canvas prototypes expose this function.

  

-----

  

## Done When

  

- Single script tag activates the full toolkit in any HTML prototype

- Layout tool: drag to create named rectangles, resize, export coordinates

- Component tool: define buttons and text boxes visually, place on page, export specs

- Lines tool: adjust width/color/opacity with live preview, export

- Color tool: sample, palette of 12 with CW defaults pre-loaded, assign to elements

- Underlay tool: load image, adjust opacity, toggle visibility

- Coordinate inspector shows x/y readout following cursor when any tool active

- Export produces clean JavaScript object, copy to clipboard works

- Backtick toggles toolbar, escape cancels tool, number keys activate tools

- No interference with prototype functionality when toolbar is hidden

- Removing script tag leaves prototype completely clean

  

-----

  

## File Location

  

```

/Users/michaelchabin/CuriousWoods/tools/cw-dev-tools.js

```

  

Create the `/tools` directory if it does not exist.

  

-----

  

## After This Is Built

  

1. Add to Session Protocol: every coding chat should know this file exists

2. Write SKILL.md entry so Claude loads awareness of it automatically

3. Add script tag to geometry-layer1.html as the first test

4. Refine based on use — this is version 1.0, expect iteration