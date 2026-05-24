# Curious Woods Interface Foundation Specification

## BRIEF (read this, skip the rest if you're building)

Status: Partially superseded. Authoritative for color palette, typography, and Maya text UI.
Last updated: February 27, 2026 (UI Language companion document added)

Companion document: `00-FOUNDATION/UI-Language.md` — read alongside this.
UI-Language covers: two-panel layout, living left panel, contextual controls, Remember inscription,
story layout, palette design, underlay mechanic, animation timing. Authoritative for all new content.

What's still current:
- Color palette (CSS variables) — used across all layers
- Typography (Georgia/system fonts) — used across all layers
- Story page layout (WHAT/WHERE/WHEN/STORY pages)
- Maya conversation formatting and text styling

What's been superseded:
- Geometry canvas interaction → see [[10-PROJECTS/Geometry/Geometry Workspace Overview|Geometry Workspace]]
- Maya's canvas presence (wisp, transformations) → see [[20-SPECS/Spec-Maya-Presence-Cursor]]
- Maya's emotional intelligence framework → see [[01-ACTIVE/Session-Feb17-Maya-Presence-Design]]

Read the full document for: complete CSS specs, layout dimensions, control window behavior,
text rendering, reading ergonomics, Maya UI elements

---

**Version 1.0 | January 2026**

---

## Overview

This specification defines the fundamental interface elements present in ALL Curious Woods content. Whether a child is reading a story, exploring a coordinate plane, or experimenting with sound physics, these elements provide consistent navigation, interaction, and support.

**Philosophy:** The interface prioritizes conversation and curiosity over control and instruction. Maya (Claude) is positioned as a knowledgeable ally, not a teaching authority. Controls are tools that serve the content, not features that demand attention.

---

## Core Elements

Every Curious Woods page includes:

1. **Content Area** - where stories/interactives live
2. **Maya Button & Conversation System** - always-available guide
3. **Control Panels** - content-specific tools (minimal by default)

---

## 1. Content Area

### Purpose

The primary workspace where children engage with stories, interactives, or tools.

### Specifications

- **Position:** Center-left of viewport
- **Width:** Maximum 700px for text-based content, flexible for interactives
- **Background:** `#f4f1e8` (warm off-white, "parchment")
- **Padding:** 40px
- **Font:** Georgia, serif (primary), system fonts for UI elements
- **Text color:** `#2a2620` (dark brown)

### Reading Ergonomics & Column Width

**Why 700px maximum?**

The 700px content width is based on human visual physiology, specifically **parafoveal vision** - the "cone" of perception around your eye's fixation point while reading.

**How eyes read:**
- Eyes don't move smoothly - they make quick jumps (saccades) and brief pauses (fixations)
- At each fixation, you perceive:
  - **Foveal (sharp):** 1-2 words at fixation point
  - **Parafoveal (clear):** 3-4 words to the right, 1-2 words to the left  
  - **Peripheral (blurry):** Beyond that, used for planning next jump
- Your effective "reading cone" spans about 12-15 characters sharp, 20-25 characters usable

**Optimal line length:**
- **Research consensus:** 50-75 characters per line
- **At 20px Georgia:** 700px ≈ 65-70 characters ≈ 12-15 words per line
- **Fixations needed:** 2-3 per line (efficient)
- **Parafoveal coverage:** Most of line visible from center fixation

**Why not wider?**
- **Lines > 800px (80+ characters):** Require 4-6 fixations, eyes "lose place" returning to next line, comprehension drops
- **Brain's preview fails:** Parafoveal vision can't reach line end, prediction/comprehension suffers

**Why not narrower?**
- **Lines < 500px (50 characters):** Too many line returns, disrupts reading rhythm, wastes energy on vertical eye movement

**Additional factors:**
- **Line height 1.4:** Tight, dynamic spacing ideal for punchy writing and short sentences - standard for quality editorial design (newspapers, magazines, narrative non-fiction)
- **Paragraph spacing 1.4em:** One full line between paragraphs (28px) maintains clear separation while preserving visual cohesion
- **Georgia font:** Serif font designed specifically for screen readability, clear letterforms, good spacing
- **Color contrast (#2a2620 on #f4f1e8):** Warm off-white reduces eye strain vs. pure white, dark brown is gentler than pure black, high contrast without harshness

**Target audience considerations:**
- **10-year-olds:** Still developing efficient saccade patterns, benefit from optimal line length
- **Neurodivergent readers:** May have tracking differences, generous line height and optimal width reduce cognitive load
- **Extended reading:** Stories are 500-1000+ words, comfort matters more than space efficiency
- **Screen fatigue:** Reading on screens is more tiring than paper, optimal line length mitigates this

**The "empty space" is intentional:**
- Side margins aren't wasted - they provide visual breathing room, saccade landing zones, and cognitive buffer between content and controls
- Research shows readers don't notice margins when reading comfortably - they only notice when lines are too long or too short

### Behavior

- Content scrolls naturally within this area
- Does not overlap with Maya button or control panels (by default)
- Adapts to screen size but maintains readability

---

## 2. Maya Button & Conversation System

### Philosophy

Maya represents Claude as a conversational guide - not a teaching authority, but a knowledgeable friend. The design emphasizes availability without intrusion.

### 2.1 Maya Button

**Position:**

- **Side:** Right side of viewport
- **Vertical:** Approximately 25% down from top of viewport
- **Horizontal:** Positioned to fit naturally in margin space
    - Right edge: viewport edge minus 20-40px
    - Left edge: content area right edge plus 20px
    - Width adapts to this available space
    - Minimum width: 80px
    - Default width: ~100-120px (enough for typical names like "Maya", "Alex", "Sam")

**Appearance:**

- **Background:** `#777878` (medium gray)
- **Text:** `#FFFBB9` (light yellow)
- **Border:** 2px solid `#546A80` (Payne's gray)
- **Font:** 14px Georgia, serif (scales to 12px for names 13-15 chars)
- **Padding:** 8px 12px
- **Border radius:** 4px top corners, 0 bottom (connects to transcript icon)
- **Shadow:** Subtle (0 2px 4px rgba(0,0,0,0.2))

**Hover state:**

- Background: `#DCDCDC` (light gray)
- Text: `#3D3D3A` (dark gray)

**Behavior:**

- Displays child's chosen name for Claude (e.g., "Maya", "Alex")
- Click activates voice mode (speech-to-text)
- Max name length: 15 characters
- Button is draggable (along with entire conversation system)
- Does NOT change color when conversation window is open

### 2.2 Transcript Icon

**Position:**

- Directly below Maya button (no gap)
- Same width as Maya button

**Appearance:**

- **Height:** 20px (approximately 2/3 of Maya button height)
- **Background:** `#777878` (matches button)
- **Border:** 2px solid `#546A80`, no top border
- **Border radius:** 0 top corners, 4px bottom corners
- **Icon:** Three horizontal lines (≡), 18px wide × 10px tall
    - Lines: `currentColor` (inherits from button state)
    - Stroke width: 1.5px
    - Spacing: ~3px between lines

**Hover state:**

- Background: `#DCDCDC`

**Active state (transcript open):**

- Background: `#2c5aa0` (blue)
- Border color: `#2c5aa0`
- Icon color: `#F6F6F6` (light gray)

**Behavior:**

- Click toggles transcript window visibility
- Visual indicator of transcript state (active color when open)

### 2.3 Transcript Window

**Position:**

- Extends directly below transcript icon (no gap)
- Width matches Maya button (resizable)
- Entire unit (button + icon + window) moves together when dragged

**Appearance:**

- **Background:** `#F6F6F6` (light gray)
- **Border:** 2px solid `#546A80`, no top border
- **Border radius:** 0 top corners, 8px bottom corners
- **Shadow:** 0 4px 12px rgba(0,0,0,0.3)
- **Default size:** 300px wide × 200px tall
- **Resize range:** 250-600px wide, 150-600px tall

**Structure:**

```
┌─────────────────────┐
│ Maya                │ ← Button (clickable for voice)
├─────────────────────┤
│ ≡                   │ ← Transcript icon (toggle)
├─────────────────────┤
│                     │
│ Conversation area   │ ← Scrollable transcript
│                     │
│                     │
│                    ◢│ ← Resize handle (bottom-right)
└─────────────────────┘
```

**Conversation Format:**

Child's questions:

- Color: `#2c5aa0` (deep blue) - child chooses this color in settings
- Font: 14px Georgia
- Alignment: Left
- No label (color and position identify speaker)

Maya's responses:

- Color: `#2d5016` (forest green)
- Font: 14px Georgia
- Alignment: Left
- Indent: 20px (one tab)
- No label (color and indent identify speaker)

Spacing:

- 2px between question and answer (tight pairing)
- 16px between Q&A pairs (clear separation)
- Single line break after each exchange

**Interaction:**

_Voice Mode (primary):_

- Child clicks Maya button
- Speaks question
- Speech transcribed and appears in blue
- Maya responds via audio
- Response text appears in green (indented)
- Transcript shows history

_Text Mode (fallback):_

- Child clicks transcript icon to open
- Types directly in transcript area
- Text appears in blue as typed
- Press Enter to send
- Maya's response appears in green below

_Scrolling:_

- Content scrolls inside transcript window
- No visible scrollbar (hidden but functional)
- Auto-scrolls to bottom after each exchange

_Resizing:_

- Triangle handle in bottom-right corner
- Drag to resize window
- Entire unit (button + icon + window) resizes together
- Bottom-right corner follows cursor

_Dragging:_

- Click and hold Maya button or transcript window
- Drag entire unit to new position
- Position persists during session

**Persistence:**

- Each story/interactive maintains separate conversation history
- Reopening transcript shows full history for that content
- Conversations persist across sessions (stored per-story)

**Technical Notes:**

- Transcript window uses `contenteditable` for direct typing
- No separate input box needed
- Content area has `overflow: hidden`, transcript content scrolls
- Resize handle anchored to window, not content
- Container uses `position: fixed` initially, switches to `left` positioning when resized

---

## 3. Control Panels

### Philosophy

Controls are tools that serve the content, not features that compete for attention. Most settings are "set once, forget" - only frequent actions remain always visible.

### 3.1 General Structure

**Two states:**

_Minimal State (default):_

- Small toolbar with only frequent controls
- Always visible but unobtrusive
- Example: Play/Pause/Stop buttons for stories

_Full State (expandable):_

- Complete panel with all controls
- Organized into collapsible sections
- Only opened when needed (first use, changing settings, troubleshooting)

### 3.2 Position & Layout

**Default position:**

- Upper left corner of viewport
- Distance from edges: 20px from top, 20px from left

**Appearance:**

- **Background:** `#F6F6F6` (light gray, matches transcript window)
- **Border:** 2px solid `#546A80` (Payne's gray)
- **Border radius:** 8px
- **Shadow:** 0 4px 12px rgba(0,0,0,0.3)

**Title bar:**

- **Background:** `#DCDCDC` (light gray)
- **Text color:** `#3D3D3A` (dark gray)
- **Font:** 16px Georgia, serif
- **Padding:** 10px 15px
- **Border radius:** 6px 6px 0 0
- **Controls:** Minimize [−], Close [×] buttons on right

**Behavior:**

- Draggable via title bar
- Minimizable (collapses to title bar only)
- Closable (hides completely)
- Position persists during session
- Resizable where appropriate (content-dependent)

### 3.3 Control Elements

**Buttons:**

- **Background:** `#546A80` (Payne's gray)
- **Text:** `#F6F6F6` (light gray)
- **Border:** 1px solid `#3D3D3A`
- **Padding:** 6-8px 12-16px
- **Border radius:** 4px
- **Font:** 14px Georgia, serif

**Button states:**

- Hover: Background `#DCDCDC`, Text `#3D3D3A`
- Active/Selected: Background `#2c5aa0` (blue), Text `#F6F6F6`
- Disabled: Opacity 0.5, no hover effect

**Sliders:**

- Track: `#DCDCDC` background
- Fill: `#546A80`
- Handle: `#2c5aa0` when active
- Labels: `#3D3D3A` text

**Dropdowns:**

- Background: `#F6F6F6`
- Border: 1px solid `#546A80`
- Text: `#3D3D3A`
- Arrow indicator on right

**Collapsible sections:**

- Header: Clickable, shows ▼/▶ indicator
- Background: Slightly darker than panel (`#ECECEC`)
- Padding: 8px 12px
- Content: Revealed/hidden on click

### 3.4 Content-Specific Controls

Control panels are defined by Content-Type specs, which specify:

- Which controls are needed
- How they're organized
- Which are in minimal vs. full state
- Default values and ranges

**Examples:**

- Story reading: TTS controls (voice, speed, play/pause)
- Coordinate plane: Property toggles, zoom, pan
- Music physics: Frequency sliders, waveform controls

---

## 4. Color Palette

### Primary Colors

**Backgrounds:**

- Content area: `#f4f1e8` (warm off-white, parchment)
- Windows/panels: `#F6F6F6` (light gray)
- Title bars: `#DCDCDC` (medium gray)

**Borders & Accents:**

- Primary border: `#546A80` (Payne's gray)
- Secondary border: `#3D3D3A` (dark gray)

**Text:**

- Primary text: `#2a2620` (dark brown) - content
- UI text: `#3D3D3A` (dark gray) - controls
- Child's questions: `#2c5aa0` (deep blue) - customizable
- Maya's responses: `#2d5016` (forest green)

**Interactive Elements:**

- Default buttons: `#777878` (medium gray)
- Hover state: `#DCDCDC` (light gray)
- Active/selected: `#2c5aa0` (blue)
- Maya button text: `#FFFBB9` (light yellow)

**Shadows:**

- Standard: `0 2px 4px rgba(0,0,0,0.2)` (subtle)
- Elevated: `0 4px 12px rgba(0,0,0,0.3)` (panels, windows)

### Usage Guidelines

- Use content background (`#f4f1e8`) for reading/story areas
- Use window background (`#F6F6F6`) for UI panels, controls, overlays
- Use Payne's gray (`#546A80`) as primary accent throughout
- Blue (`#2c5aa0`) for active/selected states and child's conversation
- Keep text high contrast (dark on light) for accessibility

---

## 5. Typography

### Font Families

**Content (stories, explanations):**

- Primary: Georgia, serif
- Fallback: "Times New Roman", Times, serif

**UI (buttons, controls, labels):**

- Primary: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui
- Fallback: Arial, sans-serif

### Text Sizes

**Content:**

- Story text: 20px
- Image captions: 16px
- Footnotes: 14px

**UI:**

- Button text: 14px
- Control labels: 14px
- Panel titles: 16px
- Maya button: 14px (12px for long names)
- Conversation: 14px

### Line Heights

- Content text: 1.4 (tight, dynamic, professional editorial feel)
- Conversation: 1.6 (compact but readable)
- UI text: 1.4 (tight, efficient)

### Paragraph Spacing

- Story paragraphs: 1.4em (28px - one full line between paragraphs)
- Maintains clear separation while preserving visual cohesion
- Rhythm is consistent: same space between paragraphs as between lines

---

## 6. Interaction Patterns

### Dragging

**Draggable elements:**

- Maya button + transcript system (entire unit)
- Control panels (via title bar)

**Behavior:**

- Click and hold to start drag
- Cursor changes to indicate draggable state
- Element follows cursor
- Release to drop
- Position persists during session
- Cannot drag outside viewport bounds

**Visual feedback:**

- Slight opacity reduction during drag (optional)
- Cursor: `move` or `grab`/`grabbing`

### Resizing

**Resizable elements:**

- Transcript window (via corner handle)
- Some control panels (content-dependent)

**Behavior:**

- Triangle handle visible in bottom-right corner
- Cursor changes to resize indicator (`nwse-resize`)
- Click and drag handle to resize
- Min/max dimensions enforced
- Maintains aspect ratio where appropriate
- Size persists during session

**Visual feedback:**

- Handle visible on hover
- Cursor indicates resize direction

### Minimizing

**Behavior:**

- Click minimize button [−] in title bar
- Panel collapses to title bar only
- Content hidden
- Minimize button changes to restore button [○]
- Click restore to expand

**Use cases:**

- Control panels when not actively needed
- Keep panel accessible but out of way

### Closing

**Behavior:**

- Click close button [×] in title bar
- Element disappears completely
- Can be reopened via menu/button/setting
- State may or may not persist (content-dependent)

### Clicking vs. Dragging

**Maya button has dual function:**

- Quick click (< 200ms): Activates voice mode
- Click and drag: Moves entire unit
- Prevents accidental voice activation during repositioning

---

## 7. Layout Principles

### Screen Targets

**Primary target:** iPad (1024×768 to 1366×1024) **Also supports:** Desktop browsers (responsive)

### Spatial Organization

**Left side:** Tools, controls, task-oriented elements

- Upper left: Control panels
- Philosophy: "Doing"

**Right side:** Guide, conversation, understanding

- Right margin: Maya button/transcript
- Philosophy: "Asking"

**Center:** Content, exploration, learning

- Stories scroll naturally
- Interactives use available space
- Philosophy: "Experiencing"

### Margins & Spacing

**Viewport margins:**

- Minimum 20px from all edges
- Content area: 40px internal padding

**Element spacing:**

- Between major elements: 20-40px
- Between related elements: 8-12px
- Between UI components: 4-8px

**Conversation spacing:**

- Within Q&A pair: 2px
- Between Q&A pairs: 16px

### Z-Index Layers

1. **Base:** Content area (z-index: 1)
2. **Floating:** Maya button, control panels (z-index: 1000)
3. **Modals:** Full-screen overlays if needed (z-index: 2000)

### Responsive Behavior

**On smaller screens:**

- Content area width reduces proportionally
- Maya button/transcript scale down
- Control panels may stack or simplify
- Maintain core functionality and readability

---

## 8. Accessibility

### Keyboard Navigation

- All interactive elements keyboard accessible
- Tab order follows logical reading flow
- Enter/Space activates buttons
- Escape closes panels/modals
- Arrow keys navigate within controls

### Screen Readers

- Semantic HTML throughout
- ARIA labels where needed
- Alt text for all images
- Clear focus indicators
- Announced state changes

### Visual Accessibility

- High contrast text (WCAG AA minimum)
- Sufficient text size (minimum 14px for UI)
- No reliance on color alone for meaning
- Clear focus indicators (visible keyboard focus)

### Input Methods

- Touch-friendly (44px minimum touch targets on iPad)
- Mouse/trackpad support
- Keyboard alternatives for all actions
- Voice input for conversation with Maya

---

## 9. Technical Implementation Notes

### File Structure

```
curious-woods-page/
├── index.html              # Main page
├── styles/
│   ├── foundation.css      # This spec's styles
│   └── content.css         # Content-specific styles
├── scripts/
│   ├── maya-system.js      # Conversation handling
│   ├── controls.js         # Panel management
│   └── content.js          # Content-specific logic
├── assets/
│   ├── images/             # Content images
│   └── audio/              # Generated TTS files (cached)
└── data/
    └── conversations.json  # Stored conversation history
```

### CSS Variables

Recommended CSS custom properties:

```css
:root {
  /* Colors */
  --cw-content-bg: #f4f1e8;
  --cw-window-bg: #F6F6F6;
  --cw-title-bar: #DCDCDC;
  --cw-border: #546A80;
  --cw-border-dark: #3D3D3A;
  --cw-text-primary: #2a2620;
  --cw-text-ui: #3D3D3A;
  --cw-child-text: #2c5aa0;
  --cw-maya-text: #2d5016;
  --cw-button-default: #777878;
  --cw-button-hover: #DCDCDC;
  --cw-button-active: #2c5aa0;
  --cw-maya-button-text: #FFFBB9;
  
  /* Spacing */
  --cw-padding-small: 8px;
  --cw-padding-medium: 12px;
  --cw-padding-large: 20px;
  --cw-padding-content: 40px;
  
  /* Shadows */
  --cw-shadow-subtle: 0 2px 4px rgba(0,0,0,0.2);
  --cw-shadow-elevated: 0 4px 12px rgba(0,0,0,0.3);
  
  /* Font sizes */
  --cw-font-content: 20px;
  --cw-font-ui: 14px;
  --cw-font-title: 16px;
}
```

### Browser Requirements

- Modern browsers (Chrome, Safari, Firefox, Edge)
- JavaScript enabled
- Audio playback support
- Local storage for preferences and conversation history
- Speech recognition API (optional, for voice input)

### Performance Considerations

- Minimize DOM manipulation during interactions
- Use CSS transforms for dragging/positioning (GPU accelerated)
- Debounce resize operations
- Cache generated TTS audio
- Lazy load images where appropriate
- Request animation frame for smooth animations

---

## 10. Content Integration

### How Content-Type Specs Use This Foundation

Content-Type specifications (stories, interactives, tools) build on this foundation by:

1. **Referencing this spec:** "Uses Curious Woods Interface Foundation v1.0"
2. **Defining their content area:** What appears in the main content space
3. **Specifying their controls:** Which controls are needed, in minimal vs. full panels
4. **Adding content-specific behavior:** Interactions unique to that content type

### What Content Types Must Preserve

- Maya button position, appearance, and behavior
- Conversation window format and interaction
- Control panel structure (though content differs)
- Color palette
- Typography hierarchy
- Interaction patterns (drag, resize, minimize, close)

### What Content Types Can Customize

- Content area layout and organization
- Specific controls in panels
- Additional UI elements (sliders, canvases, visualizations)
- Content-specific colors (must harmonize with palette)
- Animation and transitions (within performance guidelines)

---

## 11. Version History

### Version 1.0 (January 2026)

- Initial specification
- Defines Maya conversation system
- Establishes control panel framework
- Sets color palette and typography
- Documents interaction patterns

---

## 12. Related Specifications

**Content-Type Specifications** (read these next, depending on what you're building):

- `01-content-story-reading-v1.0.md` - For text-based stories with TTS
- `01-content-coordinate-plane-v1.0.md` - For mathematical interactives
- `01-content-music-physics-v1.0.md` - For sound/physics exploration

**Supporting Documentation:**

- `README.md` - How to use these specifications
- Template files - Starting points for common content types

---

## 13. Implementation Checklist

When creating new Curious Woods content:

- [ ] Content area uses parchment background (`#f4f1e8`)
- [ ] Maya button positioned on right, ~25% from top
- [ ] Maya button displays child's chosen name
- [ ] Transcript icon below Maya button with three-line icon
- [ ] Transcript window expands below icon when opened
- [ ] Conversation format: blue questions (left), green answers (indented)
- [ ] Single line break between Q&A pairs
- [ ] Transcript scrolls internally, window has resize handle
- [ ] Control panels positioned upper left
- [ ] Panels have minimize and close buttons
- [ ] All draggable elements use title bar or designated area
- [ ] Colors match specified palette
- [ ] Typography uses Georgia for content, system fonts for UI
- [ ] High contrast text for accessibility
- [ ] Keyboard navigation works throughout
- [ ] Touch targets minimum 44px on iPad

---

**Document Status:** Version 1.1 - Partially superseded for interactive content  
**Note (February 2026):** This spec remains authoritative for story pages (WHAT/WHERE/WHEN/STORY) and the Maya conversation UI. For the geometry workspace — the primary interactive canvas — see [[10-PROJECTS/Geometry/Geometry Workspace Overview|Geometry Workspace]], which defines a different interaction model: pannable/zoomable textured canvas with construction gestures (tap-tap for lines, drag for circles) and Maya's expanded role (canvas marks, highlighting, presence light). The color palette, typography, and Maya conversation formatting from this spec still apply.
**Next Step:** Reconcile this foundation with the geometry workspace interaction model  
**Questions:** Reference README.md or ask Maya (in conversation)

---

## Implementation Reference

**Prototype Location:** `/Users/michaelchabin/CuriousWoods/curious-woods-story-prototype_12.html`

This prototype demonstrates the Maya conversation system with:
- Draggable Maya button + transcript unit
- Resizable transcript window
- Text-mode conversation (voice mode simulated)
- Proper conversation formatting and spacing

**Known Issues:**
- Resize bug: When resizing, container switches from `right` to `left` positioning (lines 482-486 in prototype)
