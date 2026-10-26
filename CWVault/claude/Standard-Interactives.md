---
status: CANONICAL 26 Oct 2026. Michael read it and said yes to all four open items the same day. The four other 3D chats (Earth, Star lab, Furnace, Physics shelf) build to it.
role: How every CW interactive is drawn, built, scaled to the device, kept honest, and shared. Written first for 3D; it holds for 2D canvas work wherever it applies.
related: Worknote-3D-Session-25Oct.md, Life-Drawing-Style.md, Rulings-Sept-2026.md (Gestures across tools; Instructions to the child), cw-deploys/js/cw-style.js, Publishing-a-Story.md
---

# The CW standard for interactives

## The one idea

Make the best picture we can on the best machine we have, then let the page step itself down for smaller machines. We never design for the weakest device. A story is written once, and the art is made once, at full size.

## 1. The machines

**What we author for.** Michael's iPad Pro 11-inch (M5, iPadOS 27) and his MacBook Pro (M1, to be replaced when the next one ships). Anything we make has to look right on both, and be at its best on the iPad, because that is where a child is most likely to meet it.

**Below that.** Older iPads and Macs get the same page at a lower tier. They are served, not designed for.

**Phones.** No 3D on phones. If the screen's shorter side is under about 600 points, a 3D interactive shows a still picture and one line: *This one needs a bigger screen.* The page measures the screen; it never asks what brand the device is. (Painting stories may still work on a phone, as ruled earlier; geometry does not.)

## 2. The tiers

Every 3D interactive has three tiers: **full**, **middle**, and **floor**. Each tier is a short list of numbers the page turns down together.

| | Full | Middle | Floor |
|---|---|---|---|
| Sharpness (pixels per point) | 2 | 1.5 | 1 |
| Balls, particles, grains | all | half | a quarter |
| Noise detail (octaves) | 6 | 4 | 3 |
| Largest texture | 8,192 px | 4,096 | 2,048 |
| Shadows | soft | hard | none |

**How a page picks its tier.** It starts at full. For its first two seconds it times its own frames. If it can't hold its frame rate, it drops a tier and times again. Later, if the frame rate sags for five seconds running (the iPad warming up, say), it drops once more. It never climbs back up during a visit, because a picture that keeps changing its sharpness looks broken.

**What the child sees.** Nothing. There is no setting called "quality," no menu, no message. The picture is simply as good as her machine can make it.

**What must survive the floor.** Each interactive names, in its spec, the one thing that must still be visible at the floor tier: the boiling on the Sun, the crust sinking in the Earth, the balls bouncing. If the floor can't show that, the interactive needs a different design, not a lower tier.

## 3. The technology

**three.js, pinned.** We use the current release (r186 as of this writing). It is copied into the site at `js/vendor/three-r186/`, not loaded from someone else's server, so it can't change under us. A new version comes in on purpose, through a bench, and never by accident.

**WebGPU first, WebGL 2 behind it.** Safari has WebGPU on by default on Michael's iPad and on any Mac running macOS 26 or later. We use three.js's WebGPU renderer, which quietly falls back to WebGL 2 on machines without WebGPU. (Check that the M1 is on macOS 26.)

**What WebGPU buys us.** Two things. First, compute: the graphics card can move hundreds of thousands of balls itself, which is what makes the gas in a sphere possible. Second, speed for heavy shaders like the Sun's. On a WebGL 2 machine the same page runs with fewer balls: one more reason for tiers.

**Shaders in TSL.** All shaders are written in TSL, three.js's own shader language. A TSL shader is written once and runs on both WebGPU and WebGL 2. We don't use the old GLSL `ShaderMaterial`. The two sketches of 25 October get rewritten in TSL as the first job on the shelf.

**Everything else as before.** Vanilla JavaScript, no framework, Georgia, colours from `cw-style.js`.

## 4. The 3D shelf

These are the pieces every 3D interactive borrows rather than rebuilds. They live in `cw-deploys/js/3d/`, each one small and doing one thing.

- **`scene.js`**: the renderer, the camera, the tiers, the gestures, reduced motion. Every 3D page starts here.
- **`cutaway.js`**: a ball with a wedge taken out, with its two cut faces drawn by a shader the page supplies. This serves the Earth, the Sun, stars, and anything else with an inside.
- **`lens.js`**: the magnifier. It is the painting stories' lens (`js/sampler.js`), with the same look and the same gestures, but it shows a closer camera rather than a bigger picture. It is used for a star's core, and later for a nucleus.
- **`noise.js`**: the one noise library, written in TSL. One set of noises, so a crust and a granule are made the same way.
- **`glow.js`**: the one way to draw glow. It is drawn first, behind the object, so it never bleeds onto a cut face (the lesson of the Sun sketch).
- **`honest.js`**: the scale notes and the marks of knowing (section 5).
- **`still.js`**: the picture to keep (section 8).

**Gestures.** The one-finger turn is new; Michael ruled it in on 26 Oct, per the gestures ruling:

- Tap picks, as everywhere.
- Pinch zooms, as in Glass.
- One finger turns the ball, the way you'd turn a globe in your hand. This is the new one: in Glass, one finger moves the view instead.
- Two fingers move the view, as in Glass.
- *Reset view* is a word, as in Glass.

## 5. Honesty in pictures

**Scale.** Every interactive says what is drawn to scale and what isn't. It says so on the picture itself, in a short italic note beside the thing that has been stretched: *crust: drawn twenty times thicker*. A stretched part also gets a thin bracket, so the eye finds it. Anything to scale says nothing. One to three notes, never more, as in the drawings of living things.

**Knowing.** The globe's five words of knowing (measured, inferred, fitted, guessed, invented) show in the picture as well as in the words. The rule follows the drawing style for animals: the more we know, the more solid the picture.

- **Measured** is a photograph or real data: NASA's Blue Marble, a real map of the sea floor.
- **Inferred and fitted** are drawn solid, with crisp edges.
- **Guessed and invented** are painted: softer, slightly washed, the edges uneven.

So when she lowers the sea or moves the continents, the photograph gives way to paint, and she sees the shift from data to model before she reads a word about it. That shift is the point, not a defect to hide.

## 6. The look

**Quiet.** Beauty is welcome; drama is not. That means no lens flares, no camera shake, no explosions, no swelling music, no slow-motion. As Michael put it, drama is becoming like sugar.

**Drawn where it can be.** If a line drawing tells it better than a lit sphere, use the line drawing.

**Glow and motion, in moderation.** One glow per object at most. Motion that shows something (boiling, sinking, orbiting), never motion that only decorates. Nothing spins on its own when the page opens.

**The ground.** The page stays parchment. A scene in space may sit on CW's warm near-black (`black` in `cw-style.js`). Never pure black, and never a field of stars put there for mood. *(Michael, 26 Oct.)*

**Colours.** All colours come from `cw-style.js`, and the old rulings carry over: white means ice; copper is the timeline's and the story's own thing; vermilion is the thing she tapped.

**Reduced motion.** If her device asks for less motion, the scene opens still. A word (*Let it move*) starts it, and nothing else moves unless she moves it herself.

## 7. Budgets and checks

**Frame rate.** At least 60 frames a second on the iPad at full tier. Below 30 on any machine counts as a failure, not a tier.

**Memory.** The whole page stays under 1 GB on the iPad. Textures follow the tier table.

**Heat.** Ten minutes running on the iPad, untouched. The frame rate must not sag, and the iPad's back must not get more than warm. Michael's hand is the instrument.

**Benches.** Every perceptual question gets a bench in `experiments/` before it is argued, as CW already does. Every new shelf piece also gets a bench that shows it alone.

## 8. A picture to keep

Many interactives will offer a picture to keep, CW's postcard. The live view may be running at middle or floor tier, but the kept picture is always made at full: the page draws one frame, off-screen, at full tier and full size (4,096 pixels on the long side), then saves it. That takes a second, and nobody minds a second.

The kept picture carries its notes: the scale notes, the caption, and the small credit at the bottom. A picture that leaves CW should be as honest as one that stays.

## Settled 26 Oct

Michael said yes to all four open items: one finger turns the ball; space scenes may sit on the warm near-black; ten minutes is the heat check; the M1 is on macOS 26, so both his machines run WebGPU.
