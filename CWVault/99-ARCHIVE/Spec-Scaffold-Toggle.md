# Spec Amendment: Scaffold Opacity Toggle

**Version:** 1.0  
**Date:** February 18, 2026  
**Amends:** Layer 1 construction engine (`/prototypes/geometry-layer1.html`)  
**Status:** Ready to implement

---

## What This Adds

A simple double-tap gesture that toggles any line or circle between full opacity
and scaffold opacity. Objects at scaffold opacity visually recede but remain fully
active geometrically — intersections still detect, snap still works, points remain.

This completes Layer 1 as a standalone experience. A child can build a construction,
fade the scaffolding, and see the finished work clearly.

---

## The Gesture

```
Double-tap any segment or circle → toggles between full and scaffold opacity
Double-tap again → restores full opacity

No menu. No confirmation. No mode change.
Tap-tap (line gesture) is not affected — double-tap on an object is distinct
from tap-tap between two points because it targets an existing object directly.
```

---

## Opacity Values

```
Full opacity:      100% (current default for all committed objects)
Scaffold opacity:  20-25% — visually recedes but still perceptible
                   Parchment shows through; the object reads as background
                   Exact value to be tuned — should feel like watermark, not ghost
```

---

## What Can Be Toggled

```
Segments:   Yes — double-tap anywhere along the line
Circles:    Yes — double-tap anywhere on the circumference
Points:     No — points are too small and too important to fade
            Intersection points, seed points, and placed points always full opacity
```

---

## Hover Behavior on Scaffold Objects

```
Scaffold object at rest:    20-25% opacity
Scaffold object on hover:   Briefly rises to 50% opacity
                            Signals "I'm here, double-tap to restore me"
                            Returns to scaffold opacity when cursor leaves
Scaffold object snap-target: Rises to full glow opacity during snap detection
                             (geometric function unaffected by visual state)
```

---

## Object State

Add a boolean flag to each segment and circle:

```javascript
// Add to Segment and Circle objects:
isScaffold: false  // default

// Rendering uses this flag:
opacity = object.isScaffold ? 0.22 : 1.0
```

---

## Intersection Detection

Scaffold objects participate fully in intersection detection.
A faded circle still intersects with other objects.
Intersection points that depend on scaffold objects still pulse and remain usable.
The visual state of a parent object does not affect the geometric state of its children.

---

## Maya Awareness (Layer 2 note)

When Layer 2 is built, Maya should be aware of each object's isScaffold state.
She should not highlight or draw attention to scaffold objects without first
restoring them to full opacity. A simple check before any canvas mark or
highlighting action:

```
if object.isScaffold → restore to full opacity before highlighting,
                        or choose a different object to reference
```

This flag is the complete interface between Layer 1 scaffold state and Layer 2 Maya behavior.

---

## Undo Behavior

```
Single tap empty space (undo) reverses the last construction action.
Scaffold toggles are also undoable — undo restores the previous opacity state.
Double clear (double-tap empty space) resets all objects including scaffold state.
```

---

## Done When

- Double-tap on a circle fades it to scaffold opacity
- Double-tap again restores it to full opacity
- Hover on a scaffold object briefly brightens it to 50%
- Intersection detection works correctly regardless of scaffold state
- Snap still targets scaffold objects normally
- Points are never affected by the toggle
- Undo reverses scaffold toggles
- A hexagon can be constructed, its six circles faded, and the result reads cleanly

---

## Implementation Note

This is a small addition. The main work is:
1. Adding `isScaffold` boolean to Segment and Circle object models
2. Modifying the render loop to apply opacity from object state
3. Adding double-tap detection to the hit-test and gesture handler
4. Adding hover opacity lift for scaffold objects
5. Including scaffold toggle in the undo stack

Estimated scope: modest. No new geometry, no new object types, no new gestures beyond
the double-tap target detection.
