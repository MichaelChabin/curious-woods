**Coordinate Multiplication Explorer - Specification v1.0**

> **Relationship to Geometry Workspace (February 2026):** This explorer is an *activity* that lives on the coordinate plane the child constructs in the Geometry Workspace ([[10-PROJECTS/Geometry/Geometry Workspace Overview|Geometry Workspace]]). The developmental arc is: child builds the plane through Euclidean construction (sessions 1-3) → explores coordinates → discovers multiplication as area (this tool). The keypad and ribbon interactions are specific to this activity and don't use the two-gesture construction grammar — they're a different interaction mode for a different purpose. But the canvas, the grid rendering ([[Spec. Coordinate Plane]]), and Maya's presence are shared. Working prototype exists.

_Date: January 2026_ _Status: Working prototype with pan/zoom_ _Foundation: Coordinate Plane Foundation Spec v1.0_
![[keypad_multiplication_4.html]]
**Overview**

An interactive coordinate plane tool for exploring multiplication through geometric construction. Users select numbers from a keypad, watch ribbons extend from the origin, then see rectangles form to place product tiles at all factor-pair positions. The tool emphasizes pattern discovery, commutativity, and the relationship between multiplication and area.

**Core Pedagogical Goals**

- Make multiplication visible as geometric area construction
- Support self-directed pattern exploration (diagonals = squares, adjacent pairs = pronics, etc.)
- Show all factor pairs explicitly (complete factorization)
- Remove calculation pressure - focus on spatial relationships
- Enable discovery without instruction

**Coordinate Plane Configuration**

**View Settings**

- Initial view: Centered on current table size with 3-unit margin

- For 12×12 table: viewSpan = { x: [-3, 15], y: [-3, 15] }

- View dynamically adjusts when table size changes
- User can pan and zoom to explore beyond table boundaries

**Visual Specifications**

Inherits from Coordinate Plane Foundation Spec v1.0:

- Grid lines: #1F3848, 0.5px width, 0.3 opacity
- Axes: #1F3848, 1.5px width
- Background: #FFFFE7
- Axis labels: Helvetica 11pt, #1F3848

**Table Boundary Indicator**

- Appears when table size is changed (± buttons)
- Visual: Dotted border around n×n region

- Color: #1F3848
- Line style: Dashed (5px dash, 5px gap)
- Opacity: Fades from 0.5 to 0 over 2 seconds
- Position: Rectangle from (0,0) to (tableSize, tableSize)

**Table Size**

- Range: 4×4 minimum to 16×16 maximum
- Default: 12×12
- Controlled by ± buttons on keypad
- Changing size automatically:

- Clears all placed tiles
- Recenters view on new table size
- Shows boundary flash
- Updates keypad (grays out unused buttons)

**Keypad Component**

**Overall Container**

- Background: #F4F6EF (pearl)
- Border: 2px solid #1F3848
- Border radius: 4px
- Padding: 10px
- Position: Fixed at screen coordinates (not coordinate plane position)

- Current: left side, x = -3.2 coordinate position
- **Note for v1.1:** Make draggable with fixed screen position

**Number Button Grid**

- Layout: 3 columns × up to 6 rows (for 16 buttons max)
- Button size: 40px × 40px
- Gap: 4px between buttons
- Grid contains buttons 1-16

**Number Button States**

**Active Buttons (1 to tableSize):**

_Prime Numbers (2, 3, 5, 7, 11, 13):_

- Background colors:

- 1: #F4F6EF (pearl), text #1F3848
- 2: #003153 (dark blue), text #FFFBB9
- 3: #BE622F (orange), text #FFFBB9
- 5: #8A3B46 (burgundy), text #FFFBB9
- 7: #3A5C44 (dark green), text #FFFBB9
- 11: #546A80 (blue-gray), text #FFFBB9
- 13: #5F1A70 (purple), text #FFFBB9

- Border: 1px solid #1F3848

_Composite Numbers (4, 6, 8, 9, 10, 12, 14, 15, 16):_

- Background: #ADAEAE (medium gray)
- Text: #1F3848
- Border: 1px solid #1F3848

_Highlighted State (during selection):_

- Box shadow: 0 0 0 3px #BE622F (orange outline)
- Button remains highlighted until:

- Second number is selected (completes multiplication)
- Backspace is pressed
- Clear is pressed

**Inactive Buttons (beyond tableSize):**

- Same styling as composite buttons
- Opacity: 0.3
- Cursor: not-allowed
- No click interaction

**Control Buttons**

Located below number grid in 3-column layout:

**Backspace Button (****←****):**

- Size: 40px × 40px
- Background: #ADAEAE
- Text: "←"
- Text color: #1F3848
- Border: 1px solid #1F3848
- Function: Clears first selection only (unhighlights button, clears ribbon animation)

**Clear Button (CLR):**

- Size: 40px × 40px
- Background: #ADAEAE
- Text: "CLR"
- Text color: #1F3848
- Border: 1px solid #1F3848
- Function: Removes all placed tiles and resets selection state

**Increase Size Button (+):**

- Size: 40px × 40px
- Background: #ADAEAE
- Text: "+"
- Text color: #1F3848
- Border: 1px solid #1F3848
- Function: Increases tableSize by 1 (max 16), clears table, recenters view, flashes boundary

**Decrease Size Button (−):**

- Size: 40px × 40px
- Background: #ADAEAE
- Text: "−"
- Text color: #1F3848
- Border: 1px solid #1F3848
- Function: Decreases tableSize by 1 (min 4), clears table, recenters view, flashes boundary

**Size Display**

- Position: Spans 3 columns below control buttons
- Text: "{n}×{n}" (e.g., "12×12")
- Font: Helvetica 11pt
- Color: #1F3848
- Alignment: Center
- Padding: 4px

**Interaction Sequence**

**First Click (Select First Factor)**

1. User clicks number button (e.g., 5)
2. Button highlights with orange outline
3. Horizontal ribbon animation begins:

- Start: Origin (0,0)
- End: (5,0) on x-axis
- Duration: 500ms
- Style: #3A5C44 color, 3px width
- Behavior: Ribbon extends smoothly, remains visible

**Second Click (Complete Multiplication)**

1. User clicks second number button (e.g., 6)
2. Second button highlights
3. Vertical ribbon animation begins:

- Start: Origin (0,0)
- End: (0,6) on y-axis
- Duration: 500ms
- Style: #3A5C44 color, 3px width
- Behavior: Extends while horizontal ribbon remains visible

**Rectangle Formation (After 500ms)**

1. Both ribbons remain visible
2. Rectangle animations begin for ALL factor pairs of product within table boundary:

- For 5×6 = 30: rectangles at (30,1), (15,2), (10,3), (6,5), (5,6), (3,10), (2,15), (1,30)
- Within 12×12: only (6,5), (5,6), (3,10), (2,15) animate
- Each rectangle: Origin at (0,0), expands to (width, height)
- Duration: 1000ms
- Style: #3A5C44 color, 2px width

**Tile Placement (After rectangles complete)**

1. Product tiles appear at all factor-pair positions
2. Tile specifications:

- Size: 1 grid unit × 1 grid unit
- Position: Upper-right corner at lattice point (width, height)
- Background: #ADAEAE (medium gray)
- Text: Product value
- Text color: #1F3848
- Font: Helvetica Regular 14pt
- Text: Centered in tile

1. Button highlights clear
2. Selection state resets
3. Animations clear

**Product Tiles**

**Appearance**

- Background: #ADAEAE (medium gray)
- Text: Product value (e.g., "30")
- Text color: #1F3848
- Font: Helvetica Regular 14pt
- Centered horizontally and vertically in tile
- No border

**Positioning**

- Size: 1 grid unit × 1 grid unit
- Upper-right corner at factor-pair coordinate (w, h)
- Example: 6×5 tile occupies square from (5,4) to (6,5)
- Tiles appear at ALL factor-pair positions within table boundary

**Clickable Properties**

Clicking any placed tile opens properties panel showing:

- Number value
- Prime factorization
- Properties (prime, perfect square, triangular, Fibonacci, etc.)
- All positions where this number appears

**Pan and Zoom Controls**

**Mouse Wheel Zoom**

- Scroll up: Zoom in (×0.9)
- Scroll down: Zoom out (×1.1)
- Zoom center: Mouse cursor position
- No zoom limits (can zoom arbitrarily in/out)

**Click-Drag Pan**

- Click and hold on canvas (not on tile)
- Drag to pan view
- Releases on mouseup or mouseleave
- Click detection: 100ms delay after pan ends (prevents accidental tile clicks)

**View Recentering**

- Triggered by: Changing table size (± buttons)
- Centers view on current table with 3-unit margin
- Maintains aspect ratio

**Properties Panel**

**Position and Styling**

- Position: Right side of screen, vertically centered
- Width: 300px
- Max height: 80vh with scroll
- Background: White
- Border: 2px solid #1F3848
- Padding: 20px
- Display: Hidden by default, shows on tile click

**Close Button**

- Position: Top-right (10px from edges)
- Text: "×"
- Font size: 20pt
- Color: #1F3848
- Style: No background, no border
- Cursor: pointer

**Content Structure**

**Number Display:**

- Font size: 24pt
- Color: #1F3848
- Margin bottom: 15px

**Sections (each):**

- Heading (h3):

- Font size: 12pt
- Color: #546A80
- Margin bottom: 5px

- Content (p):

- Font size: 11pt
- Line height: 1.5
- Margin: 0

**Section 1: Prime Factorization**

- Shows factors joined with " × "
- Example: "2 × 3 × 5"
- Special case for 1: Shows "1"

**Section 2: Properties**

- Checks for: Prime, Perfect square, Triangular, Fibonacci
- Lists found properties comma-separated
- If none: "None identified"

**Section 3: Appears at positions**

- Lists all (x, y) coordinates where x × y = number
- Format: "(2, 15), (3, 10), (5, 6), (6, 5), (10, 3), (15, 2)"
- Searches within current tableSize only

**Info Toggle and Box**

**Info Toggle Button**

- Position: Fixed at bottom-left, 120px from edges
- Size: 30px × 30px
- Background: #546A80
- Text: "i" (lowercase, centered)
- Text color: #FFFBB9
- Font: Helvetica Regular 14pt
- Border: 1px solid #1F3848
- Function: Toggles info box visibility

**Info Box**

- Position: Directly above toggle button
- Background: White
- Text color: #1F3848
- Font: Helvetica 11pt
- Padding: 10px
- Line height: 1.4
- Initially hidden

**Content Display:**

- Grid size (pixels per unit)
- Gridline stroke width (0.5px)
- Axis stroke width (1.5px)
- Font: Helvetica 11pt
- Label frequency (varies with zoom)

**Animation System**

**Ribbon Animations**

**Type: ribbon-h (horizontal)**

- Extends from (0,0) to (target, 0)
- Duration: 500ms
- Color: #3A5C44
- Width: 3px
- Behavior: Persists after completion until rectangles finish

**Type: ribbon-v (vertical)**

- Extends from (0,0) to (0, target)
- Duration: 500ms
- Color: #3A5C44
- Width: 3px
- Behavior: Begins after horizontal completes, persists

**Rectangle Animations**

**Type: rectangle**

- Start: 500ms after first ribbon begins
- Rectangles for all factor pairs animate simultaneously
- Origin: (0,0)
- Extends to: (width, height) for each factor pair
- Duration: 1000ms
- Color: #3A5C44
- Width: 2px
- Stroke only (no fill)

**Animation Cleanup**

- All animations clear after rectangles complete AND tiles are placed
- Ribbons and rectangles removed together
- Button highlights removed
- Selection state reset

**State Management**

**selectedFirst**

- Type: Number or null
- Purpose: Tracks first selected number
- States:

- null: No selection
- number: First number selected, waiting for second

- Reset: After multiplication completes or backspace/clear

**placedTiles**

- Type: Array of objects
- Structure: { x: number, y: number, value: number }
- Purpose: Tracks all product tiles on plane
- Persistence: Until cleared or table size changes

**animations**

- Type: Array of animation objects
- Structure varies by type:

- ribbon-h/ribbon-v: { type, target, startTime, duration }
- rectangle: { type, targetW, targetH, startTime, duration }

- Purpose: Tracks active animations for rendering
- Cleanup: After completion

**viewSpan**

- Type: Object with x and y ranges
- Structure: { x: [minX, maxX], y: [minY, maxY] }
- Purpose: Defines visible coordinate range
- Updates: Pan, zoom, table size change

**tableSize**

- Type: Number (4-16)
- Default: 12
- Purpose: Defines active multiplication table size
- Effects: Button availability, boundary display, tile placement limits

**boundaryFlashStart**

- Type: Number (timestamp) or null
- Purpose: Triggers boundary animation on size change
- Duration: 2000ms fade

**Pattern Discovery Examples**

**Self-Directed Explorations**

Users can discover without instruction:

**Perfect Squares (diagonal line):**

- Click: (2,2), (3,3), (4,4), (5,5)...
- Pattern: Diagonal from origin
- Discovery: "These numbers appear only once!"

**Pronic Numbers (next to squares):**

- Click: (5,6), (6,7), (7,8)...
- Pattern: Parallel to diagonal
- Discovery: "These are always two numbers apart!"

**Multiples (vertical/horizontal lines):**

- Click 5 with: (1,5), (2,5), (3,5)...
- Pattern: Vertical line through 5
- Discovery: "All multiples of 5 line up!"

**Dense vs Sparse Regions:**

- Numbers like 12, 24 appear many times
- Primes appear only on edges
- Discovery: "Some numbers have more rectangles!"

**Commutativity:**

- Click (3,4) creates tiles at both (3,4) and (4,3)
- Discovery: "The order doesn't matter!"

**Technical Implementation Notes**

**Coordinate Transformation**

- Screen pixels → logical coordinates via pixelsPerUnit
- Recalculated on resize, zoom, pan
- All drawing uses logical coordinates converted to screen

**Click Detection**

- Pan prevents immediate click (100ms delay)
- Converts screen click to grid square
- Checks for existing tile at position

**Keypad Positioning (Current)**

- Positioned in coordinate space at x = -3.2
- Vertical center at tableSize / 2
- **Limitation:** Moves during pan/zoom
- **v1.1 Note:** Make draggable with fixed screen position

**Animation Rendering**

- Uses requestAnimationFrame loop
- All animations drawn each frame based on elapsed time
- Progressive rendering (ribbons persist, rectangles build on them)

**Known Limitations / Future Work**

**Current Version (v1.0)**

- Keypad position shifts during pan/zoom
- No visual indication of zoom level
- No "reset view" button
- Properties panel shows limited number properties

**Planned for v1.1**

- Draggable keypad with fixed screen position
- Keypad remembers position when moved
- Visual drag handle on keypad
- Default position: left side of screen

**Future Enhancements**

- Property visualization toggles (show all squares, show all primes, etc.)
- Different number base support
- Tile color-coding by properties
- LaTeX notation toggle (show 49 as 7²)
- Decimal modes (tenths, tens)
- Narrated geometric construction intro
- "Fill table" button for reference mode
- Undo/redo for tile placement
- Export/save table state

**Pedagogical Notes**

**Design Principles**

- **Minimize calculation pressure:** Focus on visual patterns
- **Support discovery:** No instructions needed for basic exploration
- **Show complete structure:** All factor pairs visible
- **Make commutativity explicit:** Both orientations always appear
- **Enable flow state:** Rhythmic clicking, satisfying animations
- **Respect geometry:** Multiplication is fundamentally about area

**Teacher Prompts**

- "What patterns do you notice?"
- "Can you make a diagonal line?"
- "Which numbers appear most often?"
- "Try multiplying a number by itself several times"
- "What happens when you multiply by 1?"

**Learning Outcomes**

Students naturally discover:

- Commutativity (a×b = b×a)
- Prime vs composite structure
- Factorization as geometric decomposition
- Special number types (squares, pronics)
- Multiplication as area measurement
- Patterns in the multiplication table

  

**Files Required for Implementation**

1. coordinate_plane_spec_v1.0.md - Foundation specification
2. coordinate_multiplication_explorer_v1.0.md - This document
3. keypad_multiplication.html - Working prototype