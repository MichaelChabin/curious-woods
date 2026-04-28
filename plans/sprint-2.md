# Sprint 2 — Color Panel, Tip Window Content, and Triggers

Read this entire document before starting. There are two parts: the color panel redesign and the tip window system update.

---

## Part A: Color Panel Redesign

### New layout

```
Chartres                          ← palette name, tappable to open picker
[chip] [chip] [chip] [chip] ...   ← palette colors from the artwork

──────────────────────────────    ← faint separator line (already exists)
[bg] [clear]                      ← universal chips, not part of any palette

         lead thickness
[================================] slider

Choose new colors                 ← tappable text, opens palette picker
```

### Changes

#### 1. Remove elements

- **Remove the "empty" chip.** It no longer exists.
- **Remove the "lead" chip/button.** Lead is always on. There is no lead toggle.
- **Remove the "close" button** from the color panel header. The color panel is always visible — it is integral to the app and cannot be closed.
- **Remove any Glass toggle** (lead on/off) from wherever it lives. Lead is always on.

#### 2. Rearrange the bottom row

Below the faint separator line, show exactly two chips:

1. **Canvas background chip** — filled with the canvas background color (`#f4f1e8`). This is the "un-color" tool. Tapping it then tapping a glass shape fills it with the background color (visually removes the glass). Give it a subtle border so it's visible against the canvas.

2. **Clear chip** — the existing clear/bottle green chip (`#c2d4bc`). This is the default glass color. No label needed.

These two chips are universal — they stay the same regardless of which palette is selected. Everything above the separator is palette-specific.

#### 3. Add lead thickness slider

Below the two universal chips:

- **Label**: "lead thickness" in Georgia, 11px, `#546A80`, above the slider.
- **Slider track**: rendered as a horizontal line whose **thickness matches the current lead setting**. The track itself shows what you're choosing. Color: `#546A80` or similar muted tone.
- **Slider thumb**: fixed size (~12px circle or rectangle), does NOT change size with the setting. Must be easy to grab on touch devices.
- **Range**: minimum thin but visible (~0.5px rendered), maximum substantial but not absurd (~5-6px rendered). Default is the current lead thickness.
- **Behavior**: dragging the slider updates lead thickness on all existing glass shapes immediately (live preview as you drag).

#### 4. Add "Choose new colors" text

At the bottom of the color panel, below the slider:

- Text: **"Choose new colors"**
- Style: Georgia, 13px, `#546A80`, `cursor: default`, hover `#3D3D3A`.
- Clicking it calls `openPickerWindow('palettes')`.
- The palette name at the top also opens the picker when tapped.

#### 5. Remove the palette switcher dropdown

- Clicking the palette name opens the picker window directly.
- Remove the intermediate switcher dropdown (`openPaletteSwitcher` / `closePaletteSwitcher` and the `#palette-switcher` element).

---

## Part B: Tip Window Content and Triggers

### The "How this works" panel list

The panel in the left tool area should show these items:

```
How this works
  • Lines and Circles
  • Cutting Shapes
  • Color
  • Hiding Lines
  • Save or Share
  • New and Open
```

All items are visible from the start. Clicking "How this works" collapses/expands the list.

### Keyword highlighting convention

In the tip window text below, certain keywords function as action words. These should be visually distinct — render them in a **darker color** (`#3D3D3A` instead of `#546A80`) to stand out from the surrounding text. The same highlighting should apply to the matching words in the "How this works" list.

Keywords to highlight: **Save**, **Share**, **New**, **Open**, **Choose new colors**

### Tip window content for each item

Clicking any bullet in the "How this works" list opens a canvas tip window with the corresponding content below. The canvas tip windows have no title bar — just body text and a "close" link. They are draggable (`user-select: none`, pointer events for drag).

---

#### Lines and Circles

**Trigger (first visit only):** appears on canvas automatically when the app first loads.

```
All your beautiful patterns begin with
circles, lines, and two points.

To make a line, tap a point, then tap another.
To make a circle, tap a point, then drag to another.
Where lines and circles intersect, new points appear.
Use those to make more lines and circles.

Tap any empty space to undo.
```

---

#### Cutting Shapes

**Trigger (first visit only):** appears on canvas automatically when there are ≥ 15 points.

**Smart suppression:** if the child has already selected segments or filled a shape before this threshold fires, do NOT show the canvas window.

```
To cut your glass, tap a line. It will fill with lead.
Then tap connected lines.

When you enclose a shape it will turn to glass.
```

---

#### Color

**Trigger (first visit only):** appears on canvas automatically when there are **4 or more filled glass shapes**.

**Smart suppression:** if the child has already used the color palette before this threshold fires, do NOT show the canvas window.

```
To color glass, tap a color, then tap the glass.

To choose a different set of colors, tap Choose new colors.
Use the slider to change lead thickness.
```

Note: "Choose new colors" in this text should be highlighted (darker color) to match the tappable text in the color panel.

---

#### Hiding Lines

**Trigger (first visit only):** appears on canvas automatically when there are ≥ 30 points.

**Smart suppression:** if the child has already used the eraser / double-click-to-fade before this threshold fires, do NOT show the canvas window.

```
Double click a line to make it fade
or to make a faded line reappear.

Double click a line and hold the mouse down to
change more than one line.
```

---

#### Save or Share

**No automatic trigger.** Only opens when the child clicks "Save or Share" in the How this works list.

```
Tap Save to save your work as an image
or as a file you can open and work on later.
Tap Share to send a copy to someone else.
```

"Save" and "Share" should be highlighted (darker color). In the future these will also be tappable text buttons that trigger the actual save/share workflows. For now they are just highlighted text — the existing save functionality is accessed through whatever mechanism currently exists.

---

#### New and Open

**No automatic trigger.** Only opens when the child clicks "New and Open" in the How this works list.

```
Tap New to start a new construction.
Tap Open to see examples and to open
constructions you've saved.
```

"New" and "Open" should be highlighted (darker color). In the future these will be tappable text buttons. For now they are just highlighted text.

---

### Return visit behavior

On return visits (localStorage flag set), no tip windows appear automatically. The "How this works" panel is visible with all items. Clicking any item opens its tip window on the canvas.

**Future enhancement (not for this sprint):** use a `lastVisit` timestamp to decide whether to re-show tip windows if the child hasn't visited in over a week. Not implemented now — just ensure the localStorage flags are in place so this can be added later.

---

## Testing

### Color panel
1. Panel shows palette chips, separator, background chip, clear chip, slider, and "Choose new colors."
2. No close button, no empty chip, no lead chip.
3. Tapping the background chip then tapping glass removes color.
4. Lead thickness slider changes lead width on all shapes in real time.
5. "Choose new colors" opens the palette picker.
6. Palette name also opens the picker.
7. Switching palettes updates chips above the separator; bottom two stay the same.

### Tip windows
8. All six items visible in the How this works list from the start.
9. Clicking each item opens its tip window on the canvas with correct content.
10. Tip windows are draggable and closeable.
11. Keywords (Save, Share, New, Open, Choose new colors) are visually darker in tip text.
12. On first visit: Lines and Circles tip appears automatically on load.
13. Cutting Shapes tip appears at ≥ 15 points (if child hasn't already been cutting shapes).
14. Color tip appears at ≥ 4 filled glass shapes (if child hasn't already used the palette).
15. Hiding Lines tip appears at ≥ 30 points (if child hasn't already used fade/eraser).
16. Save or Share and New and Open only open from the panel — no automatic trigger.
