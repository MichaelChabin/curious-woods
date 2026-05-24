Coordinate Plane Foundation Spec v1

> **Relationship to Geometry Workspace (February 2026):** This spec defines the visual rendering of the coordinate plane — grid colors, axis labels, adaptive label frequency, coordinate transforms. In the Geometry Workspace vision ([[10-PROJECTS/Geometry/Geometry Workspace Overview|Geometry Workspace]]), the child *constructs* the coordinate plane through Euclidean gestures, and Maya animates the grid. This spec defines what that grid looks like once built. The rendering standards here remain current and usable.

Window Spec

**Logical Coordinate System:**
- The plane uses mathematical coordinates independent of screen pixels
- All content (points, lines, shapes) is positioned using logical coordinates

**View Window:**

- viewSpan: Defines the coordinate range currently visible

- Format: { x: [minX, maxX], y: [minY, maxY] }
- Example: { x: [-3, 14], y: [-3, 14] } for multiplication table activity
- Example: { x: [-20, 60], y: [-20, 60] } for square numbers pattern

- viewCenter (optional alternative): [x, y] coordinate at canvas center

- Derive viewSpan from center + desired width/height

**Canvas (Physical Screen):**

- Canvas fills the browser viewport (responsive to window size)
- Fills available viewport/container
- Aspect ratio: [specify if constrained]

**Coordinate Transformation:**

- All rendering converts logical coordinates → screen pixels
- Unit scale (pixels per coordinate unit) derives from: **canvasWidth / (maxX - minX)**
- Grid spacing adapts based on unit scale (see Grid Specifications)

**View Adjustment:**

- Pan: Updates viewSpan min/max values
- Zoom: Scales viewSpan range around zoom center point
- Content-driven views: Set viewSpan to frame specific coordinate ranges for each activity

Grid and Axis Specifications

**Grid Lines:**

- Color: #1F3848
- Stroke width: 0.5px
- Opacity: 0.3

**Axes (X and Y):**

- Color: #1F3848 (same as grid)
- Stroke width: 1.5px
- No tick marks

**Axis Labels (Numbers):**

- Font family: Helvetica
- Font size: 14pt (fixed - does not scale with zoom)
- Color: #1F3848 (same as axis)
- X-axis positioning: Centered horizontally on gridline, positioned below axis with minimal gap
- Y-axis positioning: Right-justified with right edge aligned to axis, positioned to left of axis with minimal gap
- Label frequency (adaptive based on grid size):

- Grid size > 40 px: Label every gridline
- Grid size Grid size ≤40 and >10 px Label every 5th gridline
- Grid size <= 10px: Label every 10th gridline

Initial State

**Initial state:**

- Default viewSpan for the multiplication table activity: { x:[-3,14], y:[-3,14]}
- For now this can be the default for any interactive

**Canvas container:**

- Should fill the browser viewport

**Surface/background:**

- The color #FFFFE7, is canvas background

  

Info Box

Info Toggle Button:

- Position: Fixed at bottom-left, 120px from bottom edge, 120px from left edge
- Size: 30px × 30px (small, unobtrusive)
- Background: #546A80 (same as your prime buttons)
- Text: "i" (lowercase, centered)
- Text color: #FFFBB9
- Font: Helvetica Regular, 14pt
- Border: 1px solid #1F3848
- On click: toggles visibility of info box

Info Box:

- Position: Directly above the toggle button (so bottom edge aligns with top of button)
- Initially hidden (display: none)

**Content Display:**

- Grid size (pixels per unit)
- Gridline stroke width
- Axis stroke width
- Font size
- Font name

**Styling:**

- Background: White
- Text color: #1F3848
- Font family: Helvetica
- Font size: 14pt
- Padding: 10px
- Border: none

Behavior:

- Click toggle: info box appears/disappears
- Info box stays visible until toggled off
- Toggle button always visible


# The following is from an earlier document most of which has been superceeded. This has todo with displaying tiles with give number properties.
## Property Definitions

### Sequences Category

**Squares:**
- Detection: `sqrt(n) === floor(sqrt(n))`
- Color: #BE622F (orange)
- Examples: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144

**Pronics (Oblong Numbers):**
- Detection: `k * (k+1) === n` for some integer k
- Color: #8A3B46 (burgundy)
- Examples: 2, 6, 12, 20, 30, 42, 56, 72, 90, 110, 132

**Triangular:**
- Detection: `(sqrt(8*n + 1) - 1) / 2` is an integer
- Color: #3A5C44 (dark green)
- Examples: 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136

**Fibonacci:**
- Detection: Member of Fibonacci sequence
- Color: #546A80 (blue-gray)
- Sequence: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
- Extend as needed for larger tables

### Factorization Category

**Primes:**
- Detection: No divisors except 1 and self
- Color: #003153 (dark blue)
- Examples: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47...

**Composites:**
- Detection: Has divisors other than 1 and self
- Color: #ADAEAE (medium gray)
- Examples: 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20...

### Future Categories (not implemented in v2.0)

**Geometric Patterns:**
- Centered Hexagonal
- Pentagonal
- Star Numbers
- Tetrahedral

**Abundance:**
- Perfect (sum of divisors = number)
- Abundant (sum of divisors > number)
- Deficient (sum of divisors < number)

**Powers:**
- Powers of 2, 3, 5, etc.
- Prime powers (p^n)

---

## Tile Rendering with Properties

### Standard Tile (no properties selected)
- Background: #ADAEAE (medium gray)
- Text: #1F3848
- Font: Helvetica Regular, 14pt
- Border: None

### Single Property Selected
- Background: Property color
- Text: #FFFBB9
- Font: Helvetica Regular, 14pt
- Border: None

### Multiple Properties Selected
- Background: Color of **first selected property** (order matters)
- Text: #FFFBB9
- Font: Helvetica Regular, 14pt
- Border: 3px solid #9CB785 (sage green)
- Border style: Solid
- Additional 1px outline: #1F3848 (makes border crisp)

**Visual hierarchy:**
1. First property determines background color
2. Border indicates multiple properties
3. Text remains readable against any property color

### Smart Text Display (from v1.0)
- Calculate if text fits in tile at current zoom
- If `textWidth > (tileWidth - 4)` OR `tileHeight < 16px`: hide text
- Show only colored blocks when zoomed out
- Text reappears when zooming in

---

## Behavior Specifications

### Property Selection

**User Action:**
1. User clicks anywhere on property item row

**System Response:**
1. Color square fills with property color
2. System calculates all numbers in selected area matching this property
3. Tiles are placed at ALL factor-pair positions for matching products
4. Count updates to show number of instances
5. Existing tiles re-render with new property colors (if applicable)

**Example:**
- User selects "Squares"
- System finds: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144 (within 12×12)
- Places tiles at: (1,1), (2,2), (3,3), (4,4), (5,5), (6,6), (7,7), (8,8), (9,9), (10,10), (11,11), (12,12)
- Count shows: "12"

### Property Deselection

**User Action:**
1. User clicks property item that is currently selected

**System Response:**
1. Color square returns to empty state (border only)
2. Tiles matching ONLY this property are removed
3. Tiles with multiple properties update (lose this property's color/border)
4. Count updates

**Important:** Do NOT remove tiles that were placed manually via keypad multiplication

### Area Selection

**Default State:**
- Area: 12×12 (from origin to tableSize)
- Button text: "Select Area"
- Area display: "Area: 12×12"

**Selection Process:**
1. User clicks "Select Area" button
2. Cursor changes to crosshair
3. User clicks and drags on coordinate plane
4. Rectangle highlights during drag (dashed border, semi-transparent fill)
5. On mouse release:
   - Area locked to selected rectangle
   - Button text changes to "Use 12×12"
   - Area display updates: "Area: [w]×[h]"
   - All property tiles refresh for new area

**Returning to Default:**
1. User clicks "Use 12×12" button
2. Area resets to standard 12×12
3. Button text returns to "Select Area"
4. Area display: "Area: 12×12"
5. All property tiles refresh

### Clear All Properties

**User Action:**
1. User clicks "Clear" button in header

**System Response:**
1. All property selections cleared (color squares become empty)
2. All property-generated tiles removed
3. Manually-placed tiles (from keypad) remain
4. All counts reset to 0
5. Area selection preserved (not reset)

**Important Distinction:**
- Property-generated tiles: Removed
- Keypad-generated tiles: Preserved
- System tracks tile origin (property vs. manual)

---

## State Management

### Active Properties
```javascript
let activeProperties = new Set();
// Example: Set(['squares', 'primes'])
```

### Property-Generated Tiles
```javascript
let propertyTiles = new Map();
// Key: property name
// Value: array of tile objects
// Example: {
//   'squares': [{x: 1, y: 1, value: 1}, {x: 2, y: 2, value: 4}, ...]
// }
```

### Manually-Placed Tiles
```javascript
let manualTiles = [];
// Tiles placed via keypad multiplication
// Never removed by property system
```

### Selected Area
```javascript
let selectedArea = {
  mode: 'default', // 'default' or 'custom'
  bounds: { x1: 1, y1: 1, x2: 12, y2: 12 }
};
```
