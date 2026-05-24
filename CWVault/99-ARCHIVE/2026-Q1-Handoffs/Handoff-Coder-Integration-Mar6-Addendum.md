# Coder Handoff Addendum — March 6, 2026
**Supplements:** Handoff-Coder-Integration-Mar6.md
**Addresses:** Three specific implementation questions from the Coder

---

## 1. showLines and showGlass — Wire Them Up

Wire both toggles as working implementations, not stubs.

The old canvas-drawn rose window menu is being removed entirely. Every item it contained migrates into the HTML Tools menu from the lab file. The Tools menu is now the only menu.

**Lines** (`open-lines` action) → toggle `showLines`. Immediate effect on canvas render. No panel needed — it is a simple on/off toggle, same as the old behavior.

**Glass** → the old menu had a "Glass" item toggling `showGlass` (hides uncolored geometry, shows only filled regions). Add a `Glass` item to the Tools menu L2 list alongside the others, wired to toggle `showGlass`. Same simple on/off.

**Color** (`open-color` action) → already wired to open the palette tool. Correct. This replaces the old menu's implicit "open palette" behavior.

**Save, Load, New** → stubs in the lab file's dispatch switch already exist. Leave as stubs for now — the save/load implementation is deferred. The items should appear in the menu (they do) and toast gracefully (they do).

The full intended Tools menu L2 item list, in order:
```
Save  →  As Construction / As Image  (stubs)
Load                                  (stub)
New                                   (stub)
Labels                                (stub)
Lines                                 (working toggle)
Color                                 (opens palette tool — working)
Drawing Guide                         (opens model tool — working)
Glass                                 (working toggle)
Share                                 (stub)
```

---

## 2. Empty Swatch → Remove Fill

Confirmed. When Empty is the selected swatch and the child taps inside a filled region, that fill is dissolved.

**Implementation:** In `onUp`, before the existing segment hit-test path, add a fill hit-test:

```javascript
// At the top of the tap-handling block in onUp:
if (isTap && getActiveColor() === null) {
  const hitFill = hitFilledRegion(world.x, world.y);
  if (hitFill) {
    dissolveRegion(hitFill.id);
    playSound('repaint');
    return;
  }
}
```

`hitFilledRegion(wx, wy)` needs to be written — a point-in-polygon test across all non-dissolved fills, returning the fill object if the tap lands inside one.

This path only activates when Empty is selected. Normal tap behavior (segment emphasis, line/circle scaffold toggle) is unchanged for all other selections.

---

## 3. Fill Behavior — Forest Glass as Default, Palette as Override

**New auto-fill behavior:**

When segments close a region, fill it automatically with the Clear (forest glass) color: `#c2d4bc`.

This replaces the current behavior of filling with `palActiveColor()`. The auto-fill always uses forest glass regardless of what is currently selected in the palette. The child did not choose this fill — the system applied it. Forest glass is the default state of glass: it exists, it has color, but no one has chosen it yet.

**Child selects a color and taps a filled region:**

The fill changes to the selected color. This requires the same `hitFilledRegion` hit-test described above, but activated when any non-null, non-Lead color is selected:

```javascript
if (isTap && getActiveColor() !== null && !state.palette.leadActive) {
  const hitFill = hitFilledRegion(world.x, world.y);
  if (hitFill) {
    recolorRegion(hitFill.id, getActiveColor(), state.palette.opacity);
    playSound('repaint');
    return;
  }
}
```

**Empty selected and taps a filled region:** fill is removed entirely (no color — transparent/parchment). This is not a return to forest glass. The child has made a deliberate choice to have no glass here.

**Summary of fill states for a region:**
- Never closed → no region, no fill
- Just closed by construction → forest glass `#c2d4bc` (auto-applied)
- Child taps with color selected → that palette color
- Child taps with Empty selected → no fill (transparent)
- Child taps again with a color → fills again with new color

The palette is always the source of truth for what a tap will do to a region.

---

## 4. On Double-Tap to Remove Fill — Do Not Implement

The double-tap gesture is already claimed by the scaffold toggle (double-tap a line or circle fades it to scaffold opacity). Adding double-tap on filled regions creates ambiguity — a region shares its boundary with lines, and a double-tap near an edge could be interpreted as either.

The Empty swatch approach is cleaner: the child selects Empty and taps the region. Intention is unambiguous. The palette is always in control.

Do not implement double-tap-to-remove-fill.

---

## 5. Lead Borders on Fills — Starting Value

Lead border width on filled regions is not yet formally specified. Use **3px** as the starting value. Flag it visually when testing so it can be reviewed and adjusted — this will likely need a design look before shipping.

The border should render as an inset stroke on the filled region path, in pewter `#4a4540`, applied to all non-dissolved fills when `state.palette.leadActive` is true.
