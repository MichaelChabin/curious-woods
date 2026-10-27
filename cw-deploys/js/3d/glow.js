/* glow.js — the one glow, drawn first (Standard-Interactives; the lesson of the 25 Oct worknote; 26 Oct 2026, the colour read right 27 Oct).
   A soft light behind a ball. It is a sprite that always faces the camera, added onto the ground (additive
   blending, so black adds nothing), and it is drawn before everything else: depth test off, depth write off,
   renderOrder -1, and `transparent` left false so it sits in the opaque list, where renderOrder is obeyed — the
   transparent list is always drawn after the opaque one, whatever the order says. The ball then paints over it,
   so the glow can never bleed onto the cut faces, which it did in the sketch whenever it was drawn after them.
   Both backends apply a material's blending when transparent is false (checked in r186: WebGL's state and
   WebGPU's pipeline both skip blending only for NormalBlending).
     cwGlow({ colour, size, reach, strength })
       colour    the glow's colour at its heart (CSS hex, from cw-style.js: a display value, read as one — not through
                 THREE.Color, which would take it for sRGB and convert it to linear before the shader converted it
                 again, and did until 27 Oct, which made the glow redder than the colour named)
       size      the sprite's width in world units (the ball is 2 across at radius 1)
       inner, mid, reach   0..1 of the sprite's half-width: full strength to inner, a knee at mid (three tenths
                 of the strength), nothing at reach (defaults 0.31, 0.45, 1: the sketch's stops)
       strength  the glow's brightness inside inner, 0..1 (default 0.55)
   Returns the sprite; add it to the scene (not to the ball, so turning the ball leaves the light where it is). */
import * as THREE from 'three';
import { Fn, vec3, float, uv, length, smoothstep, mix, select, sRGBTransferEOTF } from 'three/tsl';

export function cwGlow({ colour = '#ffbe6e', size = 3.4, inner = 0.31, mid = 0.45, reach = 1, strength = 0.55 } = {}) {
  const n = parseInt(String(colour).replace('#', ''), 16);
  const c = { r: (n >> 16 & 255) / 255, g: (n >> 8 & 255) / 255, b: (n & 255) / 255 };
  const mat = new THREE.SpriteNodeMaterial();
  mat.colorNode = Fn(() => {
    const d = length(uv().sub(0.5)).mul(2);                    // 0 at the heart, 1 at the sprite's edge
    // three stops, the 25 Oct sketch's: full strength to `inner`, a knee at `mid`, nothing at `reach`
    const knee = strength * 0.3;
    const near = mix(float(strength), float(knee), smoothstep(float(inner), float(mid), d));
    const far = mix(float(knee), float(0), smoothstep(float(mid), float(reach), d));
    const glow = select(d.lessThan(mid), near, far);
    return sRGBTransferEOTF(vec3(c.r, c.g, c.b).mul(glow));   // the colour above is a display value
  })();
  mat.blending = THREE.AdditiveBlending;
  mat.transparent = false; mat.depthTest = false; mat.depthWrite = false;
  const sprite = new THREE.Sprite(mat);
  sprite.renderOrder = -1;
  sprite.scale.set(size, size, 1);
  sprite.name = 'glow';
  return sprite;
}
