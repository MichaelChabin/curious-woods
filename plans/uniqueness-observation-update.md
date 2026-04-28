# Uniqueness Observation — Updated Specification

## Overview

After the child saves a construction, a text box appears on the canvas showing how many possible arrangements exist given her construction's points — displayed in scientific notation with a relatable comparison. The numbers are real, computed from the child's actual work.

---

## The calculation

Given `p` points, the number of possible pairs is `C(p,2) = p(p-1)/2`. Each pair could have a line drawn between them or not, giving `2^C(p,2)` possible line configurations. This is a conservative lower bound — adding circle selections, color choices, and fading states would make the number much larger.

**Formula:** `arrangements = 2^(p*(p-1)/2)` where `p = points.size`

**Display in scientific notation:** Convert to the form `n.n × 10^exponent`.

To compute this without overflow:
- `exponent = Math.floor(C(p,2) * Math.log10(2))`
- `mantissa = 10^(C(p,2) * Math.log10(2) - exponent)`
- Display as: `mantissa` rounded to one decimal place, `× 10`, then the exponent as a superscript

For example, 79 points → C(79,2) = 3081 → 2^3081 ≈ 7.2 × 10^927

Use Unicode superscript characters for the exponent, or render with `<sup>` in the HTML.

---

## The comparison table

Select the comparison based on the exponent:

| Exponent | Comparison phrase |
|----------|------------------|
| < 13 | (do not show the observation — too few arrangements to be impressive) |
| 13 – 19 | "more than all the grains of sand on every beach on Earth" |
| 20 – 49 | "more than all the drops of water in all the oceans" |
| 50 – 79 | "more than all the atoms in the Earth" |
| 80 – 119 | "more than all the atoms in the universe" |
| 120+ | "more than all the atoms in a billion universes" |

---

## The text

```
You made {points} points, {lines} lines, and {circles} circles.

With those points alone, there are {mantissa} × 10{exponent} possible
arrangements — {comparison}.

The one you just made — no one has made that before.
```

Example with 79 points, 5 lines, 10 circles:

```
You made 79 points, 5 lines, and 10 circles.

With those points alone, there are 7.2 × 10⁹²⁷ possible
arrangements — more than all the atoms in a billion universes.

The one you just made — no one has made that before.
```

Example with 15 points, 3 lines, 4 circles:

```
You made 15 points, 3 lines, and 4 circles.

With those points alone, there are 4.1 × 10³¹ possible
arrangements — more than all the drops of water in all the oceans.

The one you just made — no one has made that before.
```

---

## Behavior

- Appears after every save (both Save as Construction and Save as Image), as long as `points.size >= 10` (the minimum for the comparison to be impressive — 10 points gives ~10^13).
- Standard canvas tip window: draggable, closeable, no title.
- Positioned near the center of the canvas, offset so it doesn't cover the artwork.
- The last line never changes. The numbers and the comparison are computed fresh each time.

---

## Add to the JSON content file

Add to `cw-deploys/text/geometry-v1.json`:

```json
"uniqueness": {
  "intro": "You made {points} points, {lines} lines, and {circles} circles.",
  "calculation": "With those points alone, there are {mantissa} × 10{exponent} possible arrangements — {comparison}.",
  "conclusion": "The one you just made — no one has made that before.",
  "comparisons": [
    { "min_exponent": 13, "text": "more than all the grains of sand on every beach on Earth" },
    { "min_exponent": 20, "text": "more than all the drops of water in all the oceans" },
    { "min_exponent": 50, "text": "more than all the atoms in the Earth" },
    { "min_exponent": 80, "text": "more than all the atoms in the universe" },
    { "min_exponent": 120, "text": "more than all the atoms in a billion universes" }
  ]
}
```

The comparison is selected by finding the highest `min_exponent` that is ≤ the computed exponent.

---

## Testing

1. Save a construction with 10 points — observation appears with scientific notation and "grains of sand" comparison.
2. Save a construction with 30 points — observation appears with a larger exponent and "atoms in the Earth" comparison.
3. Save a construction with 79 points — exponent is ~927, comparison is "billion universes."
4. Save a construction with < 10 points — observation does NOT appear.
5. The scientific notation is correctly formatted (mantissa has one decimal, exponent is superscript).
6. The observation is draggable and closeable.
7. Saving again with a different construction shows updated numbers.
