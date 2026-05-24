---
status: Hub document — first draft
role: Constellation hub for the Pi-Stories class
created: 2026-05-13
---

# Pi-Stories

## The core idea

A circle's circumference and its diameter are incommensurable — you cannot measure one cleanly in units of the other. Pi is the constant that bridges them. Once a child has felt that, pi stops being a memorized number and becomes a *tool*: given any one measurement of a circle (radius, diameter, circumference, area), the others follow. The stories in this constellation each give the child a real situation — a moon, a wheel, a tree, a planet — where knowing one measurement and reaching for another is the natural move. Pi is what gets her across.

The deeper move underneath is multi-step problem solving with units, where each step uses geometry-as-numbers to convert what you know into what you want.

## The overlay

A graphics layer on top of the geometry app. The child can drop a circle of a given radius, diameter, or circumference (whichever the story makes natural), and the overlay shows the other values updating live. The overlay handles unit conversion (km, miles, days, hours) so the child can chain steps: *moon's distance → orbital radius → circumference → divide by 28 days → speed*. The geometry underneath is unchanged — points, lines, intersections all still work. The overlay is just a measurement skin that knows about pi.

Full spec: [[Pi-Overlay-Spec]] *(not yet written)*

## Intuitions served

- #1 — Numbers as geometry, geometry as numbers
- #4 — Multi-step problems and patience with them
- #10 — Modeling and simulation
- #11 — Measure by counting; refine to converge *(when the story includes the pixel-counting origin of pi)*

## Stories in this constellation

### Drafted
*(none yet)*

### Sketched
- [[The-Moons-Speed]] — Given the distance to the moon, double it for the orbital radius, multiply by pi for the circumference, divide by 28 days × 24 hours. How fast is the moon actually moving?

### Just a title
- [[Counting-to-Pi]] — The pixel-counting origin story. Where pi comes from before it's used.
- [[The-Redwood]] — A tree's circumference at chest height tells you its diameter, which tells you (roughly) its age class.
- [[The-Bike-Wheel]] — How far does one revolution take you? How many revolutions to school?
- [[The-Earths-Belt]] — If you wrapped a rope around the equator, then added one meter to its length and lifted it evenly off the ground, how high would it float?

## Rhymes with

*To be filled in as other constellations emerge. Candidates:*

- A "refinement converges" constellation (Counting-to-Pi shares DNA with The-Ground-Curves and any story where measurement gets more exact by getting more granular)
- A "scale" constellation (The-Moons-Speed sits next to anything about astronomical distance and time)
