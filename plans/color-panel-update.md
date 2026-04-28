# Color Panel Update

## What this changes

Simplify the color panel to reflect that lead is always on and is integral to the tool. Remove unnecessary elements, add a lead thickness slider, and improve discoverability of palette switching.

---

## New color panel layout

```
Chartres                          ← palette name, tappable to switch
[chip] [chip] [chip] [chip] ...   ← palette colors from the artwork

──────────────────────────────    ← faint separator line (already exists)
[bg] [clear]                      ← universal chips, not part of any palette

         lead thickness
[================================] slider

Select Colors                     ← tappable text, opens palette picker
```

---

## Changes to make

### 1. Remove elements

- **Remove the "empty" chip.** It no longer exists.
- **Remove the "lead" chip/button.** Lead is always on. There is no lead toggle.
- **Remove the "close" button** from the color panel header. The color panel is always visible — it is integral to the app and cannot be closed.
- **Remove any Glass toggle** (lead on/off) from the Tools menu or wherever it lives. Lead is always on.

### 2. Rearrange the bottom row

Below the faint separator line, show exactly two chips:

1. **Canvas background chip** — filled with the canvas background color (`#f4f1e8`). This is the "un-color" tool. Tapping it then tapping a glass shape removes the color (fills with background). It should look like a chip with the canvas color and a subtle border so it's visible against the canvas.

2. **Clear chip** — the existing clear/bottle green chip (`#c2d4bc`). This is the default glass color. No label needed.

These two chips are universal — they stay the same regardless of which palette is selected. Everything above the separator is palette-specific.

### 3. Add lead thickness slider

Below the two universal chips, add a labeled slider:

- **Label**: "lead thickness" in Georgia, 11px, `#546A80`, above or to the left of the slider.
- **Slider track**: rendered as a horizontal line whose **thickness matches the current lead setting**. This is the key visual — the track itself shows what you're choosing. Color: `#546A80` or similar muted tone.
- **Slider thumb**: fixed size (a small circle or rectangle, ~12px), does NOT change size with the setting. Must be easy to grab on touch devices.
- **Range**: the minimum should be thin but visible (~0.5px rendered). The maximum should be substantial but not absurd (~5-6px rendered). The default is whatever the current lead thickness is.
- **Behavior**: dragging the slider updates lead thickness on all existing glass shapes immediately (live preview as you drag).

### 4. Add "Select Colors" text

At the bottom of the color panel, below the slider:

- Text: "Select Colors"
- Style: Georgia, 13px, `#546A80`, `cursor: default`, hover `#3D3D3A`.
- Clicking it calls `openPickerWindow('palettes')` — same as clicking "Choose..." in the current palette switcher.
- The palette name at the top remains tappable as well (for users who already know).

### 5. Remove the palette switcher dropdown

The current flow is: click palette name → dropdown with shortlist + "Choose..." → click "Choose..." → picker window.

Simplify this:
- Clicking the palette name at the top opens the picker window directly (same as "Select Colors").
- Remove the intermediate switcher dropdown (`openPaletteSwitcher` / `closePaletteSwitcher` and the `#palette-switcher` element).

---

## What does NOT change

- The palette color chips themselves (grid layout, swatch rendering, recipe tooltip on hover)
- The color selection behavior (tap a color, it becomes current, tap glass to apply)
- The palette picker window (`buildPickerPalettes`) — it was fixed in the previous sprint
- The panel's position in the left panel area

---

## Testing

1. The color panel shows palette chips, separator, background chip, clear chip, slider, and "Select Colors".
2. There is no close button, no empty chip, no lead chip.
3. Tapping the background chip then tapping a glass shape removes its color.
4. Dragging the lead thickness slider changes lead width on all shapes in real time.
5. "Select Colors" opens the palette picker with thumbnails.
6. Clicking the palette name also opens the palette picker.
7. Switching palettes updates the chips above the separator. The two chips below stay the same.
