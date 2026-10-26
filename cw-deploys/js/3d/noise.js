/* noise.js — the shelf's one noise library, in TSL (Standard-Interactives, the shared 3D shelf; 26 Oct 2026).
   Every 3D page takes its noise from here, so one look of grain runs through the Sun, the Earth and the furnace,
   and no page carries a GLSL copy of its own. Four functions, each a node you call inside a TSL Fn:
     noise3(p)                 gradient noise on a vec3, about -1 to 1 (three's MaterialX Perlin, mx_noise_float,
                               scaled by 1.4 so its swing matches the simplex noise the 25 Oct sketches were tuned to)
     fbm3(p, octaves, gain)    the same summed over octaves, unrolled at build time
     hash3(p)                  three pseudo-random numbers in 0..1 for a cell (the sine hash the 25 Oct sketches used)
     cells3(p, t)              moving cells (Worley): vec3(nearest distance, second distance, the nearest cell's number),
                               the cell centres drifting with t — the granules of the Sun, the plates of a crust
   ES module; imports from the pinned three.js under js/vendor/. */
import { Fn, float, vec3, floor, fract, sin, dot, sqrt, Loop, If, mx_noise_float } from 'three/tsl';

export const noise3 = (p) => mx_noise_float(vec3(p), 1.4);

export function fbm3(p, octaves = 3, gain = 0.5, lacunarity = 2.0) {
  let sum = float(0), amp = 1, freq = 1, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum = sum.add(noise3(vec3(p).mul(freq)).mul(amp));
    norm += amp; amp *= gain; freq *= lacunarity;
  }
  return sum.div(norm);
}

export const hash3 = /*@__PURE__*/ Fn(([p_]) => {
  const p = vec3(p_);
  const q = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)));
  return fract(sin(q).mul(43758.5453123));
});

export const cells3 = /*@__PURE__*/ Fn(([x_, t_]) => {
  const x = vec3(x_), t = float(t_);
  const n = floor(x), f = fract(x);
  const F1 = float(8).toVar(), F2 = float(8).toVar(), id = float(0).toVar();
  Loop({ start: -1, end: 2 }, { start: -1, end: 2 }, { start: -1, end: 2 }, ({ i, j, k }) => {
    const g = vec3(float(i), float(j), float(k));
    const o = hash3(n.add(g));
    // each cell's centre wanders on its own slow circle
    const m = float(0.5).add(sin(t.mul(float(0.35).add(o.yzx.mul(0.4))).add(o.mul(6.2831))).mul(0.38));
    const r = g.add(m).sub(f);
    const d = dot(r, r);
    If(d.lessThan(F1), () => { F2.assign(F1); F1.assign(d); id.assign(o.x); })
      .ElseIf(d.lessThan(F2), () => { F2.assign(d); });
  });
  return vec3(sqrt(F1), sqrt(F2), id);
});
