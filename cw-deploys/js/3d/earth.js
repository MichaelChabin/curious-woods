/* earth.js — the Earth on the shelf: the pieces of continent as meshes on a ball, each turned by its plate, with
   the look by age, back to the Earth's birth (Spec-Earth-3D, steps 1, 2 and 3 of Getting there; the audit's §1, §3,
   §4 and §5; 27–28 Oct 2026). The bench is experiments/earth-3d.html, beside the Time Machine and not in it;
   globe.js keeps running the Time Machine.

   The pieces (step 1). From stories/plates/continents.json, as it is: every ring of every piece is triangulated
   once at load — projected onto the plane touching the sphere at the ring's centre (azimuthal equidistant, so a
   ring round a pole and a ring across the dateline are plain polygons), its outline first carried outward by the
   same 0.26° the 2D globe's gap-closing stroke carries a piece's skin (BLOAT_DEG in globe.js), ear-clipped by
   three's ShapeUtils, then every triangle edge longer than `maxEdge` degrees split at its midpoint on the sphere,
   so the piece hugs the ball (at 4° a triangle sags 0.06% of the radius). Each vertex's texture coordinate is
   today's longitude and latitude, unwrapped within its triangle so a piece across the dateline reads the picture
   whole. The pieces of one plate are one mesh, in the file's order, and each frame that mesh takes its plate's
   turn at the age, read exactly as globe.js's plateMatrixAt reads it (the functions are copied, not
   reimplemented). Under the pieces the sea is a ball of its own at the same radius, in globeSea. The land is drawn
   after the sea with no depth test and no depth writing, in the 2D raster's order (plates by their first living
   piece in the file, pieces within a plate in file order), so where two pieces overlap the later paints over the
   earlier, as the raster's last fill wins, and nothing fights for a depth. The far side is discarded by the surface
   point's own facing (since 28 Oct; by the triangle's winding before).

   The look by age (step 2), the 2D globe's paintSkin, shelfRim, drownedBand, dissolvePieces and paintIce as one
   fragment shader on the pieces, one on the sea and one on the shelf rims, every number theirs:
   - The photograph's sea. A sea mask is built once at load from each picture, as buildSeaMask does (the old
     ground: blue leads red by a fifth and leads green; Blue Marble: the same test, which also finds its grey sea
     ice and the dark blues its JPEG leaves round the Arctic, or the near-black its land-only map paints the sea,
     the channels summing under 70 with blue at least red). Under a piece, sea in the picture — an inland sea, and
     the bloat's sliver past every coast — is painted as the translucent shelf wash over the globe's own sea,
     never as the picture's colour (Michael, 27 Oct: Blue Marble's black band).
   - Photograph to paint by 2.6 million years (the spec: a photograph is true only of today). At today the picture;
     going back it fades linearly to paint, gone at the seam. The paint is green and rock (Michael's ruling of
     28 Oct; the softened photograph of the second bench carried today's climate back on the moving plates and
     went): one quiet green (paintGreen in cw-style.js) lit by the rock grain with a fifth of the rock under it, no
     pattern of today's deserts, forests or ice. Then the old rule: bare rock (the grain, grey to tan, rusty where
     the cooling map runs high) blends in from 300 to 450 million years as the plants go; no green before 450; and
     the near-black crust before oxygen blending in from 2,300 back to 2,500, exactly as paintSkin has it (step 3).
   - The islands, the shelves and the dissolves, over the eight million years before the model's reach, as
     globe.js has them (its tg): the outlines soften (each corner drawn toward the mean of itself and its
     neighbours as two Chaikin passes leave it), a translucent shelf rim 2.2° wide round every piece under the
     crust (a quad along each edge and a disc at each corner of the outline, displaced in the vertex shader,
     drawn opaque in the sea's own colour mixed with the wash so overlaps paint once), the drowned band in the
     shelf wash over the crust, and the island — the outline shrunk toward its centre by the square root of the
     land's share of the crust, from the crust curve — lifted a touch lighter, as a second mesh on the same
     triangles with the shrink in its vertex shader. A piece dissolves into the sea over the eight million years
     before its birth (and after its end) by mixing toward the sea's colour, which hides its rim's inner half as
     the 2D's cover does. Past the reach the soft look stays whole: the edges say how sure we are of where.
   - The deep ice: ICEHOUSES copied; the cold ages as the soft feathered overlay of ruling 3 (19 Oct), over land
     and sea alike, by the latitude of the point at that age (the position carried back into the ball's frame),
     feathered over sixteen degrees and roughened by the grain, south only through the Antarctic age, white all
     over for a snowball, each age's strength ramping over its first and last tenth; the Huronian (2,400 to 2,100)
     the same way. None this side of the seam, as the 2D (the ground grade's ice is ICE-6G's, step 4).
   - The rim: the 2D's limb shading (near-black at 0.30 from 0.78 of the radius to the edge) in every surface
     shader, by the fragment's ray's distance from the ball's centre, so it is right in perspective; the thin
     haze (the sea's blue, 0.55, from a pixel inside the edge to four outside; grey steam before there is a sea)
     and the limb line (S.limb) on a shell a little larger than the ball, in its own shader — not glow.js.
   - Light: even (Michael's ruling of 28 Oct). No sun lighting one side; the rim and the haze make it a ball.

   The guessed and invented ages, and the molten Earth (step 3, 28 Oct):
   - The motion model stays in JavaScript, as the spec says, and hands the card one turn per body per frame:
     runSim, cratonSim, simQuat, guessedMatrix, modelVelocity, discsOf and the quaternion helpers are globe.js's,
     copied line for line, and the pieces are prepared as globe.js prepares them (the same rings, the same
     softening for the discs), so that the same seed gives the same run in both engines to the last bit. The seed
     is the page's: setSeed(s) and reguess() as globe.js has them, and the bench hands one seed to both globes.
   - The blobs of the invented ages (4,000 to 4,400): blobSet and makeBlobs's shrink copied; each blob's ring is
     triangulated like a piece (already smooth, so no softening) and drawn by the same land, island and rim shaders
     with one more step in the vertex shader: the point shrunk toward the ring's centre by the square root of the
     crust curve's share at the age, as `shrunk` shrinks it, the picture read at the shrunk point as the 2D reads it.
     The island inside a blob composes the two shrinks (a hair off the 2D's, which recentres between them).
   - The molten Earth (4,567 to 4,400): paintMolten as a fragment shader on the whole ball (the sea's mesh takes it
     while the grade is none), moltenState copied for its five numbers and its phase, MOLTEN_WORDS copied for the
     words: the melt by the grain, the black crust where the cooling-order map is below a threshold rising with
     the age, the cracks glowing and dimming, the faint uncertain first sea, the maps turned 137° and flipped for
     the second crust, the sea's blue by 4,400. The Moon's impact at 4,510 two ways, the bench's choice, neither a
     flare (Michael: without the fireworks): `warm`, the whole ball warming toward the melt's colour over MOON_WARM
     million years either side, no white; or `melt`, no brightening at all — the first crust sinks into the melt
     over MOON_MELT million years after the impact, the last-cooled rafts first, the cracks brightening as it goes,
     while the second crust begins on the turned maps as globe.js has it. The 2D's white flash is not drawn.
   - The grade and its sentence: gradeFor and GRADE_WORDS copied; grade() answers as globe.js's does.

     const earth = await cwEarth(view, {
       plates, cities, crust,         // the files; crust: stories/curves/crust-and-land.json (the amount, and the island's share)
       ground, vegetation,            // the old ground and its vegetation
       blue: px => url,               // Blue Marble by size; blueSmall: the 2,048 px file (the mask)
       textures: '../art/globe/',     // rock-grain.png, cooling-order.png and cracks.png
       seed,                          // the first seed (default: this visit's, as globe.js makes one)
       impact: 'warm' | 'melt',       // the Moon's impact, two ways (bench)
       maxEdge: 4, bloat: 0.75 * 360 / 1024, citiesHost: element
     });
   Returns { group, setTime(ma), time(), grade() → { grade, why }, moltenPhase(), setGround('old'|'blue'), ground(),
   setImpact('warm'|'melt'), impact(), seed(), setSeed(s), reguess(), simMs() → { cratons, blobs, blobBuild },
   setTier(tier), placeAt, project → {x, y, front}, cities,
   stats: { pieces, rings, plates, triangles, rimTriangles, buildMs, lookMs, fetchMs, blue() }, meshes, dispose() }. */
import * as THREE from 'three';
import { Fn, vec2, vec3, vec4, float, uniform, texture, uv, attribute, varying, positionView, positionWorld, modelViewMatrix,
         normalize, dot, cross, length, mix, smoothstep, clamp, abs, min, max, select, If, Discard, sRGBTransferEOTF, atan, asin, sqrt, fract, dFdx, dFdy } from 'three/tsl';
import { cwRGB } from './scene.js';

const D2R = Math.PI / 180;
const SEA_R = 1;   // the sea at the pieces' own radius: the land takes no depth test, so nothing fights and no hairline of land stands past the sea's edge at the limb
// globe.js's numbers, copied
const PLANTS = 450, GREEN_BY = 300, FADE = 8, SHELF_DEG = 2.2, SEAM = 2.6;
const OXYGEN = 2300, DARK_BY = 2500;                               // the blend from bare rock to the dark crust runs from OXYGEN back to DARK_BY
const OLDEST_ROCK = 4000, NO_MAP = 4400, DRIFT_DEG_PER_MA = 0.45;   // a plate's few centimetres a year, as degrees of arc
// the molten sequence, in millions of years ago (globe.js part 7; the ages as the events store has them)
const ASSEMBLED = 4567, FIRST_CRUST = 4558, MOON = 4510, SECOND_CRUST = 4480, FIRST_SEA_FROM = 4548, FIRST_SEA_TO = 4520;
const MAP_TURN = 137 * D2R;   // the second crust: the maps turned this far and flipped, so it is a different crust
// the Moon's impact, two ways (step 3; the bench chooses): the span of the quiet brightening either side of the impact, and
// the span after it over which the first crust sinks into the melt when there is no brightening — both in million years,
// for Michael to move by looking
const MOON_WARM = 5, MOON_MELT = 3;
const RIM_SEG = 10;   // the disc at each point of a shelf rim's outline: ten segments on a 2.2° disc sag 0.11° between them, under the quads' joins along a soft curve
// the cold ages of deep time, in millions of years ago, and how far from the poles the ice reached (degrees of latitude
// from the equator): the Huronian, the two snowballs, the Andean-Saharan, the late Palaeozoic, the Antarctic, the Quaternary
const ICEHOUSES = [[2400, 2100, 55], [717, 635, 0], [460, 430, 60], [360, 260, 50], [34, 2.6, 66], [2.6, 0, 58]];
// the motion model's numbers (globe.js, phase 3 of the earliest continents, 21 Oct 2026)
const SIM_DT = 2, OMEGA_MAX = DRIFT_DEG_PER_MA * Math.PI / 180, SIM_TAU = 160, SIM_SIGMA = 0.0175 * Math.PI / 180;
const SIM_LIFE = [150, 450], SIM_COOL = 60, SIM_KICK = 0.22 * Math.PI / 180;
const SOFT_PASSES = 2, BLOB_START = NO_MAP;
// the words, globe.js's (copied; the swap retires globe.js, so the Earth carries its own)
export const MOLTEN_WORDS = {
  molten:    'A ball of melted rock. Nothing to stand on, and nothing from it survived.',
  crust:     'A skin of black rock freezes over the melt in rafts, and the seams between them glow.',
  'first sea': 'Whether there was a sea before the Moon, nobody knows. The faint blue is a guess, and it says so.',
  moon:      'Something the size of Mars strikes the Earth. The whole surface melts again, and the Moon is made from what was thrown off.',
  'molten again': 'Melted again, from the top down.',
  'crust again': 'Freezing again, into a different crust.',
  sea:       'Blue by 4.4 billion years: a tiny crystal from Western Australia says there was liquid water.'
};
export const GRADE_WORDS = {
  ground:   'This side of the ice ages the globe shows what the map shows: today’s ground, the sea as low as it was, and the ice sheets where they were.',
  measured: 'The seafloor still carries its magnetic stripes, so the plates can be run backwards and measured.',
  inferred: 'Rock magnetism and fossils say how far north each piece was, not how far east. North and south are firm; east and west are one best estimate.',
  fitted:   'These pieces of crust are real and still exist. How they fitted together is argued from scattered evidence, and the models disagree. This is one fit.',
  guessed:  'These pieces of crust are real; you can stand on them today. Where they were, nobody knows. This is a guess; tap another guess, and next time it will be different. The lighter part of each is about how much stood above the sea; the rest lies under shallow water.',
  invented: 'No rock survives from this time. There was probably some continent, and this much is the rocks’ guess at the amount. The shapes and the places are made up; the lighter part is about how much stood above the sea.',
  none:     'No map. A ball of melted rock with a skin that keeps sinking; nothing to draw, and nothing survived.'
};

// ---- globe.js's geometry, copied so the two engines read a plate's turn the same way (x toward lon 0, y toward
//      lon 90 E, z north; a quaternion as [w, x, y, z]) ----
function xyz(lon, lat) { var la = lat * Math.PI / 180, lo = lon * Math.PI / 180; return [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)]; }
function quat(lat, lon, ang) { var ax = xyz(lon, lat), h = ang * Math.PI / 360, s = Math.sin(h); return [Math.cos(h), ax[0] * s, ax[1] * s, ax[2] * s]; }
function slerp(a, b, t) {
  var d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  if (d < 0) { b = [-b[0], -b[1], -b[2], -b[3]]; d = -d; }
  if (d > 0.9995) { var q = [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1]), a[2] + t * (b[2] - a[2]), a[3] + t * (b[3] - a[3])], n = Math.hypot(q[0], q[1], q[2], q[3]); return [q[0] / n, q[1] / n, q[2] / n, q[3] / n]; }
  var th = Math.acos(d), s = Math.sin(th), p = Math.sin((1 - t) * th) / s, r = Math.sin(t * th) / s;
  return [p * a[0] + r * b[0], p * a[1] + r * b[1], p * a[2] + r * b[2], p * a[3] + r * b[3]];
}
function qmat(q) {
  var w = q[0], x = q[1], y = q[2], z = q[3];
  return [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w),
          2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w),
          2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)];
}
/* a plate's turn at an age, as globe.js's plateMatrixAt picks it, but as the quaternion rather than its matrix */
export function plateQuatAt(P, ages, age) {
  if (!P) return null;
  var f = P.first, qs = P.q, n = qs.length;
  if (age <= ages[f]) return qs[0];
  if (age >= ages[f + n - 1]) return qs[n - 1];
  for (var k = 0; k < n - 1; k++) {
    var a0 = ages[f + k], a1 = ages[f + k + 1];
    if (age >= a0 && age <= a1) return slerp(qs[k], qs[k + 1], a1 === a0 ? 0 : (age - a0) / (a1 - a0));
  }
  return null;
}
/* the cold age an age falls in: [its reach, how strong], or null when the world was warm (globe.js's iceStrength) */
export function iceStrength(age) {
  for (var i = 0; i < ICEHOUSES.length; i++) {
    var h = ICEHOUSES[i]; if (age > h[0] || age < h[1]) continue;
    var ramp = Math.max(2, (h[0] - h[1]) * 0.1), st = Math.min(1, (h[0] - age) / ramp, (age - h[1]) / ramp);
    return [h[2], Math.max(0, st)];
  }
  return null;
}
/* the molten sequence's state for an age (globe.js's moltenState, copied): t the crust's progress (0 melt, 1 crusted),
   glow of the cracks, sea the sea's strength, flash the impact's white (not drawn here), second whether this is the
   second crust, and the phase's name */
export function moltenState(age) {
  var st = { t: 0, glow: 1, sea: 0, flash: 0, second: false, phase: 'molten' }, c = function (v) { return v < 0 ? 0 : (v > 1 ? 1 : v); };
  if (age >= ASSEMBLED) return st;
  if (age > MOON) {
    st.t = c((ASSEMBLED - age) / (ASSEMBLED - FIRST_CRUST));
    st.glow = Math.pow(1 - st.t, 1.3) * 0.9 + 0.05 * c((age - MOON) / (FIRST_CRUST - MOON));
    st.sea = 0.35 * c((FIRST_SEA_FROM - age) / (FIRST_SEA_FROM - FIRST_SEA_TO));
    st.phase = st.t < 1 ? 'crust' : (st.sea > 0 ? 'first sea' : 'crust');
  } else {
    st.second = true;
    st.t = c((MOON - age) / (MOON - SECOND_CRUST));
    st.glow = Math.pow(1 - st.t, 1.3) * 0.9 + 0.05;
    st.sea = c((SECOND_CRUST - age) / (SECOND_CRUST - NO_MAP));
    st.phase = st.t < 0.15 ? 'molten again' : (st.sea > 0.5 ? 'sea' : 'crust again');
  }
  var d = Math.abs(age - MOON);
  if (d <= 1.5) { st.flash = 1 - d / 1.5; st.phase = 'moon'; }
  return st;
}

// ---- globe.js's seed and motion model, copied line for line (the brief Prompt-Build-Earliest-Continents.md, 21 Oct 2026) ----
function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function gauss(r) { var u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
function qAxis(ax, ang) { var L = Math.hypot(ax[0], ax[1], ax[2]) || 1, h = ang / 2, s = Math.sin(h) / L; return [Math.cos(h), ax[0] * s, ax[1] * s, ax[2] * s]; }
function qmul(a, b) { return [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2], a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]]; }
function qconj(a) { return [a[0], -a[1], -a[2], -a[3]]; }
function qnorm(q) { var n = Math.hypot(q[0], q[1], q[2], q[3]) || 1; return [q[0] / n, q[1] / n, q[2] / n, q[3] / n]; }
function qToVector(q) {   // a rotation as axis times angle
  if (q[0] < 0) q = [-q[0], -q[1], -q[2], -q[3]];
  var w = Math.min(1, q[0]), s = Math.sqrt(Math.max(0, 1 - w * w)); if (s < 1e-9) return [0, 0, 0];
  var ang = 2 * Math.acos(w); return [q[1] / s * ang, q[2] / s * ang, q[3] / s * ang];
}
function cross3(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
function norm3(a) { var L = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / L, a[1] / L, a[2] / L]; }
function angBetween(a, b) { var d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; return Math.acos(d > 1 ? 1 : (d < -1 ? -1 : d)); }
function mv(M, p) { return [M[0] * p[0] + M[1] * p[1] + M[2] * p[2], M[3] * p[0] + M[4] * p[1] + M[5] * p[2], M[6] * p[0] + M[7] * p[1] + M[8] * p[2]]; }
// a ring's discs: its vertices in the tangent plane at its centre, the long axis by the spread, and as many discs along
// it as its length holds widths, each a little over half the width; and the ring's area, as the mass
function discsOf(ring) {
  var n = ring.length / 3, cx = 0, cy = 0, cz = 0, i;
  for (i = 0; i < n; i++) { cx += ring[3 * i]; cy += ring[3 * i + 1]; cz += ring[3 * i + 2]; }
  var c = norm3([cx, cy, cz]), u = norm3(Math.abs(c[2]) < 0.9 ? cross3([0, 0, 1], c) : cross3([1, 0, 0], c)), v = cross3(c, u);
  var xs = new Float64Array(n), ys = new Float64Array(n), sxx = 0, sxy = 0, syy = 0;
  for (i = 0; i < n; i++) { var p = [ring[3 * i], ring[3 * i + 1], ring[3 * i + 2]]; xs[i] = p[0] * u[0] + p[1] * u[1] + p[2] * u[2]; ys[i] = p[0] * v[0] + p[1] * v[1] + p[2] * v[2]; sxx += xs[i] * xs[i]; sxy += xs[i] * ys[i]; syy += ys[i] * ys[i]; }
  var th = 0.5 * Math.atan2(2 * sxy, sxx - syy), ct = Math.cos(th), st = Math.sin(th), aMin = Infinity, aMax = -Infinity, bMin = Infinity, bMax = -Infinity;
  for (i = 0; i < n; i++) { var a = xs[i] * ct + ys[i] * st, b = -xs[i] * st + ys[i] * ct; if (a < aMin) aMin = a; if (a > aMax) aMax = a; if (b < bMin) bMin = b; if (b > bMax) bMax = b; }
  var L = aMax - aMin, Wd = Math.max(bMax - bMin, 0.01), nd = Math.max(1, Math.min(6, Math.round(L / Wd))), r = Wd / 2 * 1.12, bMid = (bMin + bMax) / 2, out = [];
  for (var k = 0; k < nd; k++) {
    var a2 = aMin + L * (k + 0.5) / nd, x = a2 * ct - bMid * st, y = a2 * st + bMid * ct;
    out.push({ c: norm3([c[0] + x * u[0] + y * v[0], c[1] + x * u[1] + y * v[1], c[2] + x * u[2] + y * v[2]]), r: r });
  }
  return { discs: out, mass: Math.max(L * Wd, 1e-4) };
}
// the stepped model itself. bodies: [{ id, q, omega, parts: [{ from, to, discs, mass }] }] — a part is alive at an age when
// from >= age >= to; the body turns while any part lives. The run goes from age `from` by `dt` (signed) for `steps` steps,
// the randomness all from `rng`, and returns the quaternion of every body at every step (step 0 the start)
function runSim(bodies, from, dt, steps, rng) {
  var nb = bodies.length, out = new Float32Array((steps + 1) * nb * 4), i, j, k;
  var cl = new Array(nb), clusters = [], cool = {};
  for (i = 0; i < nb; i++) { cl[i] = i; clusters.push({ members: [i], omega: bodies[i].omega.slice(), joined: from, life: Infinity }); }
  function store(step) { for (var b = 0; b < nb; b++) { var q = bodies[b].q, o = (step * nb + b) * 4; out[o] = q[0]; out[o + 1] = q[1]; out[o + 2] = q[2]; out[o + 3] = q[3]; } }
  function alive(b, age) { var ps = bodies[b].parts; for (var p = 0; p < ps.length; p++) if (ps[p].from >= age && age >= ps[p].to) return true; return false; }
  function massOf(b, age) { var ps = bodies[b].parts, m = 0; for (var p = 0; p < ps.length; p++) if (ps[p].from >= age && age >= ps[p].to) m += ps[p].mass; return m; }
  function clusterMass(c, age) { var m = 0; for (var t = 0; t < c.members.length; t++) m += massOf(c.members[t], age); return m; }
  function turn(c, ax, ang) { var dq = qAxis(ax, ang); for (var t = 0; t < c.members.length; t++) { var b = c.members[t]; bodies[b].q = qnorm(qmul(dq, bodies[b].q)); } }
  var world = new Array(nb), bound = new Array(nb);
  function place(b, age) {   // the body's discs in the world at this step, and a cap round them all
    var M = qmat(bodies[b].q), ps = bodies[b].parts, ds = [], cx = 0, cy = 0, cz = 0;
    for (var p = 0; p < ps.length; p++) { if (!(ps[p].from >= age && age >= ps[p].to)) continue; for (var d = 0; d < ps[p].discs.length; d++) { var w = mv(M, ps[p].discs[d].c); ds.push({ c: w, r: ps[p].discs[d].r }); cx += w[0]; cy += w[1]; cz += w[2]; } }
    world[b] = ds; if (!ds.length) { bound[b] = null; return; }
    var bc = norm3([cx, cy, cz]), br = 0; for (var e = 0; e < ds.length; e++) { var a = angBetween(bc, ds[e].c) + ds[e].r; if (a > br) br = a; }
    bound[b] = { c: bc, r: br };
  }
  function centroid(c, age) { var x = 0, y = 0, z = 0; for (var t = 0; t < c.members.length; t++) { var bd = bound[c.members[t]]; if (bd) { var m = massOf(c.members[t], age); x += bd.c[0] * m; y += bd.c[1] * m; z += bd.c[2] * m; } } return norm3([x, y, z]); }
  store(0);
  for (k = 1; k <= steps; k++) {
    var age = from + k * dt, adt = Math.abs(dt);
    // the velocities wander: toward rest over SIM_TAU, a seeded nudge each step, a big cluster nudged less, capped
    for (i = 0; i < clusters.length; i++) {
      var c = clusters[i]; if (!c.members.length) continue;
      var w = c.omega, f = 1 - adt / SIM_TAU, s = SIM_SIGMA * Math.sqrt(adt) / Math.sqrt(c.members.length), cap = Math.max(0.35 * OMEGA_MAX, OMEGA_MAX / (1 + 0.25 * (c.members.length - 1)));
      w[0] = w[0] * f + gauss(rng) * s; w[1] = w[1] * f + gauss(rng) * s; w[2] = w[2] * f + gauss(rng) * s;
      var L = Math.hypot(w[0], w[1], w[2]); if (L > cap) { var g = cap / L; w[0] *= g; w[1] *= g; w[2] *= g; }
      if (L > 1e-12) turn(c, w, L * adt);
    }
    for (i = 0; i < nb; i++) if (alive(i, age)) place(i, age); else { world[i] = []; bound[i] = null; }
    // the pieces never pass through each other: push apart, and stick, in two passes
    for (var pass = 0; pass < 2; pass++) {
      for (i = 0; i < nb; i++) {
        if (!bound[i]) continue;
        for (j = i + 1; j < nb; j++) {
          if (!bound[j] || cl[i] === cl[j]) continue;
          if (angBetween(bound[i].c, bound[j].c) > bound[i].r + bound[j].r) continue;
          var best = 0, bi = null, bj = null, di = world[i], dj = world[j];
          for (var a = 0; a < di.length; a++) for (var b = 0; b < dj.length; b++) { var pen = di[a].r + dj[b].r - angBetween(di[a].c, dj[b].c); if (pen > best) { best = pen; bi = di[a]; bj = dj[b]; } }
          if (!(best > 0)) continue;
          var ci = clusters[cl[i]], cj = clusters[cl[j]], mi = clusterMass(ci, age), mj = clusterMass(cj, age), mt = mi + mj || 1;
          var n = cross3(bi.c, bj.c); if (Math.hypot(n[0], n[1], n[2]) < 1e-9) n = cross3(bi.c, [0, 0, 1]);
          var push = best * 1.05;   // a positive turn about n carries i toward j: so i turns back, j on
          turn(ci, n, -push * mj / mt); turn(cj, n, push * mi / mt);
          for (var t = 0; t < ci.members.length; t++) place(ci.members[t], age);
          for (t = 0; t < cj.members.length; t++) place(cj.members[t], age);
          var coolKey = i < j ? i + '|' + j : j + '|' + i;
          if (cool[coolKey] !== undefined && Math.abs(age - cool[coolKey]) < SIM_COOL) continue;   // lately parted: they touch and go
          // they stick: one cluster, one velocity by their masses, a life from the seed
          var wi = ci.omega, wj = cj.omega, w2 = [(wi[0] * mi + wj[0] * mj) / mt, (wi[1] * mi + wj[1] * mj) / mt, (wi[2] * mi + wj[2] * mj) / mt];
          var keep = cl[i], gone = cl[j];
          for (t = 0; t < cj.members.length; t++) { ci.members.push(cj.members[t]); cl[cj.members[t]] = keep; }
          cj.members = []; ci.omega = w2; ci.joined = age; ci.life = SIM_LIFE[0] + rng() * SIM_LIFE[1];
        }
      }
    }
    // a cluster that has held its life breaks along a random rift line through its centre, the halves kicked apart
    for (i = 0; i < clusters.length; i++) {
      var cc = clusters[i]; if (cc.members.length < 2 || Math.abs(age - cc.joined) < cc.life) continue;
      var live = cc.members.filter(function (b) { return bound[b]; }); if (live.length < 2) { cc.joined = age; continue; }
      var cen = centroid(cc, age), rv = norm3([gauss(rng), gauss(rng), gauss(rng)]), nrm = norm3(cross3(cen, rv));
      var A = [], B = [];
      for (var t2 = 0; t2 < cc.members.length; t2++) { var bb = cc.members[t2], bd = bound[bb]; var side = bd ? (bd.c[0] * nrm[0] + bd.c[1] * nrm[1] + bd.c[2] * nrm[2]) : (t2 % 2 ? 1 : -1); (side >= 0 ? A : B).push(bb); }
      if (!A.length || !B.length) { var all = cc.members.slice(); A = all.slice(0, Math.ceil(all.length / 2)); B = all.slice(A.length); }
      var nc = { members: B, omega: cc.omega.slice(), joined: age, life: SIM_LIFE[0] + rng() * SIM_LIFE[1] }; clusters.push(nc);
      cc.members = A; cc.joined = age; cc.life = SIM_LIFE[0] + rng() * SIM_LIFE[1];
      for (t2 = 0; t2 < B.length; t2++) cl[B[t2]] = clusters.length - 1;
      var cA = centroid(cc, age), cB = centroid(nc, age), ax = cross3(cA, cB), aL = Math.hypot(ax[0], ax[1], ax[2]);
      if (aL > 1e-9) { ax = [ax[0] / aL, ax[1] / aL, ax[2] / aL]; cc.omega[0] -= ax[0] * SIM_KICK; cc.omega[1] -= ax[1] * SIM_KICK; cc.omega[2] -= ax[2] * SIM_KICK; nc.omega[0] += ax[0] * SIM_KICK; nc.omega[1] += ax[1] * SIM_KICK; nc.omega[2] += ax[2] * SIM_KICK; }
      for (var x1 = 0; x1 < A.length; x1++) for (var y1 = 0; y1 < B.length; y1++) cool[A[x1] < B[y1] ? A[x1] + '|' + B[y1] : B[y1] + '|' + A[x1]] = age;
    }
    store(k);
  }
  return out;
}
// the quaternion of body b at an age, slerped between the steps on either side
function simQuat(run, nb, b, from, dt, age) {
  var f = (age - from) / dt, steps = run.length / (nb * 4) - 1; if (f < 0) f = 0; if (f > steps) f = steps;
  var k = Math.floor(f), t = f - k, o0 = (k * nb + b) * 4, q0 = [run[o0], run[o0 + 1], run[o0 + 2], run[o0 + 3]];
  if (t <= 0 || k >= steps) return q0;
  var o1 = ((k + 1) * nb + b) * 4; return slerp(q0, [run[o1], run[o1 + 1], run[o1 + 2], run[o1 + 3]], t);
}
function matToQuat(M) {   // a rotation matrix's quaternion
  var tr = M[0] + M[4] + M[8], q;
  if (tr > 0) { var s = Math.sqrt(tr + 1) * 2; q = [0.25 * s, (M[7] - M[5]) / s, (M[2] - M[6]) / s, (M[3] - M[1]) / s]; }
  else if (M[0] > M[4] && M[0] > M[8]) { var s1 = Math.sqrt(1 + M[0] - M[4] - M[8]) * 2; q = [(M[7] - M[5]) / s1, 0.25 * s1, (M[1] + M[3]) / s1, (M[2] + M[6]) / s1]; }
  else if (M[4] > M[8]) { var s2 = Math.sqrt(1 + M[4] - M[0] - M[8]) * 2; q = [(M[2] - M[6]) / s2, (M[1] + M[3]) / s2, 0.25 * s2, (M[5] + M[7]) / s2]; }
  else { var s3 = Math.sqrt(1 + M[8] - M[0] - M[4]) * 2; q = [(M[3] - M[1]) / s3, (M[2] + M[6]) / s3, (M[5] + M[7]) / s3, 0.25 * s3]; }
  return qnorm(q);
}
// a ring's corners cut (Chaikin), by t — 0 leaves it, 1 cuts every corner to its quarter points — a pass at a time, the
// points put back on the sphere (globe.js's soften; the cratons' discs are taken from the softened rings)
function soften(arr, t, passes) {
  var cur = arr;
  for (var pass = 0; pass < passes; pass++) {
    var n = cur.length / 3, out = new Float64Array(n * 6), q = t / 4;
    for (var i = 0; i < n; i++) {
      var j = (i + 1) % n, ax = cur[3 * i], ay = cur[3 * i + 1], az = cur[3 * i + 2], bx = cur[3 * j], by = cur[3 * j + 1], bz = cur[3 * j + 2];
      var dx = bx - ax, dy = by - ay, dz = bz - az;
      var x1 = ax + dx * q, y1 = ay + dy * q, z1 = az + dz * q, m1 = Math.hypot(x1, y1, z1) || 1;
      var x2 = bx - dx * q, y2 = by - dy * q, z2 = bz - dz * q, m2 = Math.hypot(x2, y2, z2) || 1;
      out[6 * i] = x1 / m1; out[6 * i + 1] = y1 / m1; out[6 * i + 2] = z1 / m1;
      out[6 * i + 3] = x2 / m2; out[6 * i + 4] = y2 / m2; out[6 * i + 5] = z2 / m2;
    }
    cur = out;
  }
  return cur;
}

// ---- small vector helpers on plain arrays ----
const v3 = {
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  norm: a => { const L = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / L, a[1] / L, a[2] / L]; },
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  scale: (a, s) => [a[0] * s, a[1] * s, a[2] * s],
  same: (a, b) => Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9 && Math.abs(a[2] - b[2]) < 1e-9,
  angle: (a, b) => 2 * Math.asin(Math.min(1, Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) / 2))
};
function outward(a, b, c) { return v3.dot(v3.cross(v3.sub(b, a), v3.sub(c, a)), v3.add(v3.add(a, b), c)) >= 0; }

/* one ring of a piece → the land's triangles on the unit sphere (hard and softened positions, texture coordinates,
   the ring's centre) and the shelf rim's (base points, offset directions and the centre), as flat arrays. The ring is
   pairs of longitude and latitude, or with opt.xyz a flat array of unit vectors (a blob's); with opt.smooth false the
   ring is taken as already smooth (a blob's: no softening, the island's centre the ring's own mean, as shrunk takes it) */
function triangulateRing(ring, bloatRad, maxEdgeRad, out, rim, opt = {}) {
  // the ring as unit vectors, consecutive duplicates dropped, the join dropped
  let pts = [];
  if (opt.xyz) { for (let i = 0; i < ring.length; i += 3) { const v = [ring[i], ring[i + 1], ring[i + 2]]; if (!pts.length || !v3.same(v, pts[pts.length - 1])) pts.push(v); } }
  else for (let i = 0; i < ring.length; i += 2) { const v = xyz(ring[i], ring[i + 1]); if (!pts.length || !v3.same(v, pts[pts.length - 1])) pts.push(v); }
  while (pts.length > 1 && v3.same(pts[0], pts[pts.length - 1])) pts.pop();
  // spikes (a ring that runs down the dateline to the pole and back up the same meridian: the points on the way
  // down are the points on the way up) collapse to nothing
  let changed = true;
  while (changed && pts.length >= 3) {
    changed = false;
    for (let i = 0; i < pts.length; i++) {
      const n = pts.length, a = pts[i], c = pts[(i + 2) % n];
      if (v3.same(a, c)) { const j = (i + 1) % n, k = (i + 2) % n; pts = pts.filter((_, m) => m !== j && m !== k); changed = true; break; }
    }
  }
  if (pts.length < 3) return 0;
  const n = pts.length;
  // the plane touching the sphere at the ring's centre; azimuthal equidistant onto it
  const c = v3.norm(pts.reduce((s, p) => v3.add(s, p), [0, 0, 0]));
  const seed = Math.abs(c[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
  const e1 = v3.norm(v3.cross(seed, c)), e2 = v3.cross(c, e1);
  const project = p => {
    const d = Math.max(-1, Math.min(1, v3.dot(p, c))), th = Math.acos(d);
    if (th < 1e-9) return [0, 0];
    const t = v3.norm(v3.sub(p, v3.scale(c, d)));
    return [th * v3.dot(t, e1), th * v3.dot(t, e2)];
  };
  const unflat = q => { const th = Math.hypot(q[0], q[1]); if (th < 1e-12) return c.slice(); const dir = v3.add(v3.scale(e1, q[0] / th), v3.scale(e2, q[1] / th)); return v3.norm(v3.add(v3.scale(c, Math.cos(th)), v3.scale(dir, Math.sin(th)))); };
  // counter-clockwise in the plane, before anything is derived from the ring's order
  let flat = pts.map(project), area = 0;
  for (let i = 0; i < n; i++) { const a = flat[i], b = flat[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; }
  if (Math.abs(area) < 1e-12) return 0;
  if (area < 0) { pts.reverse(); flat.reverse(); }
  // the softened outline (globe.js's soften, two Chaikin passes at full strength), two ways: the corner points — each
  // corner at the mean of itself six times and its two neighbours once, which is the midpoint of the two points the
  // passes leave either side of it — and the whole curve, four points to a corner, as globe.js draws it (step 3: the
  // straight chords between the corner points read angular beside the 2D's curve). The land's triangles are the hard
  // outline's, morphing to the chords, plus a fringe along each chord that fills out to the curve: fan triangles that
  // are collapsed onto the corners at the hard end and open as the softening comes in. A blob's ring is already smooth
  const smooth = opt.smooth === false;
  const soft = smooth ? pts : pts.map((p, i) => v3.norm(v3.add(v3.scale(p, 6), v3.add(pts[(i + n - 1) % n], pts[(i + 1) % n]))));
  let curve = null;   // the 4n-point curve: for corner i, its two points are curve[4i − 2] and curve[4i − 1]; the edge from i to i + 1 has curve[4i] and curve[4i + 1] between
  if (!smooth) { const flatArr = new Float64Array(n * 3); pts.forEach((p, i) => { flatArr[3 * i] = p[0]; flatArr[3 * i + 1] = p[1]; flatArr[3 * i + 2] = p[2]; }); const cv = soften(flatArr, 1, SOFT_PASSES); curve = []; for (let i = 0; i < cv.length; i += 3) curve.push([cv[i], cv[i + 1], cv[i + 2]]); }
  const outline = curve || soft;   // what the rim follows, and what the island shrinks toward the mean of (shrunk's centre, of the softened ring)
  const centre = v3.norm(outline.reduce((s, p) => v3.add(s, p), [0, 0, 0]));
  let flatSoft = soft.map(project), flatCurve = curve ? curve.map(project) : null;
  // the outline carried outward by the bloat (the hard ring, the soft ring and the curve each by its own normals)
  function grow(poly) {
    const g = [], n = poly.length;
    for (let i = 0; i < n; i++) {
      const p0 = poly[(i + n - 1) % n], p1 = poly[i], p2 = poly[(i + 1) % n];
      const ea = [p1[0] - p0[0], p1[1] - p0[1]], eb = [p2[0] - p1[0], p2[1] - p1[1]];
      const La = Math.hypot(ea[0], ea[1]) || 1, Lb = Math.hypot(eb[0], eb[1]) || 1;
      const na = [ea[1] / La, -ea[0] / La], nb = [eb[1] / Lb, -eb[0] / Lb];   // outward normals of a counter-clockwise ring
      let m = [na[0] + nb[0], na[1] + nb[1]]; const Lm = Math.hypot(m[0], m[1]);
      if (Lm < 1e-9) m = na; else m = [m[0] / Lm, m[1] / Lm];
      const k = Math.min(2, 1 / Math.max(0.5, m[0] * na[0] + m[1] * na[1]));   // the mitre, limited at a sharp corner
      g.push([p1[0] + m[0] * bloatRad * k, p1[1] + m[1] * bloatRad * k]);
    }
    return g;
  }
  const grown = grow(flat), grownSoft = grow(flatSoft), grownCurve = flatCurve ? grow(flatCurve) : null;
  const faces = THREE.ShapeUtils.triangulateShape(grown.map(q => new THREE.Vector2(q[0], q[1])), []);   // the hard outline is what shows for 992 million years: it is the one triangulated
  const sph = grown.map(unflat), sphSoft = grownSoft.map(unflat), sphCurve = grownCurve ? grownCurve.map(unflat) : null;
  let count = 0;
  const mid = (a, b) => v3.norm(v3.add(a, b));
  function emit(a, b, c) {   // a vertex is [hard, soft]
    const ab = v3.angle(a[0], b[0]), bc = v3.angle(b[0], c[0]), ca = v3.angle(c[0], a[0]), m = Math.max(ab, bc, ca);
    if (m > maxEdgeRad) {   // the longest edge split at its midpoint on the sphere: a shared edge splits the same way on both sides
      if (m === ab) { const q = [mid(a[0], b[0]), mid(a[1], b[1])]; emit(a, q, c); emit(q, b, c); }
      else if (m === bc) { const q = [mid(b[0], c[0]), mid(b[1], c[1])]; emit(a, b, q); emit(a, q, c); }
      else { const q = [mid(c[0], a[0]), mid(c[1], a[1])]; emit(a, b, q); emit(q, b, c); }
      return;
    }
    // facing outward: by the hard positions, or by the soft ones where the hard triangle has no area (a fringe fan, collapsed
    // onto its corner): a triangle wound the wrong way on the far side of the ball passes the facing test and shows through
    const ha = v3.cross(v3.sub(b[0], a[0]), v3.sub(c[0], a[0])), flat = Math.hypot(ha[0], ha[1], ha[2]) < 1e-10;
    if (!(flat ? outward(a[1], b[1], c[1]) : outward(a[0], b[0], c[0]))) { const t = b; b = c; c = t; }
    // texture coordinates: today's longitude and latitude, unwrapped within the triangle; a vertex on a pole takes
    // the others' mean longitude
    const vs = [a, b, c], lons = [], lats = [];
    let ref = null;
    for (const v of vs) { const p = v[0], pole = Math.abs(p[2]) > 0.999999; lats.push(Math.asin(Math.max(-1, Math.min(1, p[2]))) / D2R); lons.push(pole ? null : Math.atan2(p[1], p[0]) / D2R); if (!pole && ref === null) ref = lons[lons.length - 1]; }
    if (ref === null) ref = 0;
    for (let i = 0; i < 3; i++) { if (lons[i] === null) continue; while (lons[i] - ref > 180) lons[i] -= 360; while (lons[i] - ref < -180) lons[i] += 360; }
    const known = lons.filter(l => l !== null), meanLon = known.reduce((s, l) => s + l, 0) / (known.length || 1);
    for (let i = 0; i < 3; i++) {
      const p = vs[i][0], s = vs[i][1], lon = lons[i] === null ? meanLon : lons[i];
      out.pos.push(p[0], p[1], p[2]); out.soft.push(s[0], s[1], s[2]); out.uv.push(lon / 360 + 0.5, lats[i] / 180 + 0.5); out.centre.push(centre[0], centre[1], centre[2]);
    }
    count++;
  }
  for (const f of faces) emit([sph[f[0]], sphSoft[f[0]]], [sph[f[1]], sphSoft[f[1]]], [sph[f[2]], sphSoft[f[2]]]);
  // the fringe: along the chord from soft corner i to i + 1, the four curve points between them, fanned from corner i; at
  // the hard end every point of the fan sits on the corner it came from (the first two on i, the rest on i + 1), so the
  // fan has no area until the softening comes in
  if (sphCurve) {
    const m = sphCurve.length, at = k => sphCurve[((k % m) + m) % m];
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n, hi = sph[i], hj = sph[j];
      const chain = [[hi, sphSoft[i]], [hi, at(4 * i - 1)], [hi, at(4 * i)], [hj, at(4 * i + 1)], [hj, at(4 * i + 2)], [hj, sphSoft[j]]];
      for (let k = 1; k + 1 < chain.length; k++) emit(chain[0], chain[k], chain[k + 1]);
    }
  }
  // the shelf rim: a quad along each edge of the softened outline (the curve's, four points to a corner; a blob's own
  // ring) and a disc of RIM_SEG at each of its points, each vertex a base point on the outline and a unit direction
  // along the surface (zero for the base itself); the vertex shader carries the rim vertices SHELF_DEG out along their
  // directions. The rim shows only as the softening comes in (on globe.js's tg)
  if (rim) {
    const fo = flatCurve || flatSoft, sSoft = fo.map(unflat), no = fo.length;   // the outline, ungrown, in the planar order
    const tangent = (d, p) => v3.norm(v3.sub(d, v3.scale(p, v3.dot(d, p))));
    const tanR = Math.tan(SHELF_DEG * D2R);
    const tri = (A, B, C) => {   // each [base, dir]; wound outward by where the vertices land
      const at = v => v3.norm(v3.add(v[0], v3.scale(v[1], tanR)));
      if (!outward(at(A), at(B), at(C))) { const t = B; B = C; C = t; }
      for (const v of [A, B, C]) rim.pos.push(v[0][0], v[0][1], v[0][2]), rim.dir.push(v[1][0], v[1][1], v[1][2]), rim.centre.push(centre[0], centre[1], centre[2]);
      rim.count++;
    };
    const ZERO = [0, 0, 0];
    for (let i = 0; i < no; i++) {
      const j = (i + 1) % no, a = sSoft[i], b = sSoft[j], fa = fo[i], fb = fo[j];
      const ex = fb[0] - fa[0], ey = fb[1] - fa[1], L = Math.hypot(ex, ey) || 1;
      const nrm = v3.add(v3.scale(e1, ey / L), v3.scale(e2, -ex / L));   // the edge's outward normal, lifted to the sphere
      const da = tangent(nrm, a), db = tangent(nrm, b);
      tri([a, ZERO], [b, ZERO], [b, db]); tri([a, ZERO], [b, db], [a, da]);
      const t1 = v3.norm(v3.cross(Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], a)), t2 = v3.cross(a, t1);
      for (let k = 0; k < RIM_SEG; k++) {
        const th0 = k * 2 * Math.PI / RIM_SEG, th1 = (k + 1) * 2 * Math.PI / RIM_SEG;
        tri([a, ZERO], [a, v3.add(v3.scale(t1, Math.cos(th0)), v3.scale(t2, Math.sin(th0)))], [a, v3.add(v3.scale(t1, Math.cos(th1)), v3.scale(t2, Math.sin(th1)))]);
      }
    }
  }
  return count;
}

// ---- the sea mask of a picture, built once from the picture's pixels (buildSeaMask) ----
function pictureCanvas(img, w, h, mul) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(img, 0, 0, w, h);
  if (mul) { x.globalCompositeOperation = 'multiply'; x.drawImage(mul, 0, 0, w, h); x.globalCompositeOperation = 'source-over'; }
  return { canvas: c, data: x.getImageData(0, 0, w, h).data };
}
function buildMask(pic, w, h, isBlue) {
  const t0 = performance.now(), p = pic.data, n = w * h;
  const mask = new Uint8Array(n);
  let seaCount = 0;
  for (let i = 0, j = 0; i < n; i++, j += 4) {
    const r = p[j], g = p[j + 1], b = p[j + 2];
    const blueLeads = b > r * 1.2 && b > g;   // globe.js's test: the sea ramp, never the land ramp; on Blue Marble it also finds the grey sea ice and the dark blues the JPEG leaves round the Arctic
    const sea = isBlue ? (blueLeads || (r + g + b < 70 && b >= r)) : blueLeads;
    if (sea) { mask[i] = 1; seaCount++; }
  }
  const mc = document.createElement('canvas'); mc.width = w; mc.height = h;
  const mx = mc.getContext('2d'), md = mx.createImageData(w, h), m32 = new Uint32Array(md.data.buffer);
  for (let i = 0; i < n; i++) m32[i] = mask[i] ? 0xffffffff : 0xff000000;   // little-endian ABGR: opaque white or opaque black
  mx.putImageData(md, 0, 0);
  return { maskCanvas: mc, ms: performance.now() - t0, seaShare: seaCount / n };
}

export async function cwEarth(view, o = {}) {
  const S = (window.CW && window.CW.STYLE) || null;
  if (!S) throw new Error('earth.js needs js/cw-style.js loaded before it');
  const CWt = window.CW;
  const maxEdgeRad = (o.maxEdge || 4) * D2R, bloatRad = (o.bloat != null ? o.bloat : 0.75 * 360 / 1024) * D2R;
  const rgb = hex => { const c = cwRGB(hex); return vec3(c[0], c[1], c[2]); };
  const renderer = view.renderer;
  const texBase = o.textures || '../art/globe/';
  const seam = o.seam != null ? o.seam : SEAM;
  let seed = o.seed != null ? o.seed : ((Date.now() % 1000003) + Math.floor(Math.random() * 1000));   // the first seed: this visit's, as globe.js makes one
  let impact = o.impact === 'melt' ? 'melt' : 'warm';

  // ---- the data ----
  const t0 = performance.now();
  const [data, cityFile, crust] = await Promise.all([
    fetch(o.plates || '../stories/plates/continents.json', { cache: 'no-cache' }).then(r => r.json()),
    o.cities === false ? null : fetch(o.cities || '../stories/plates/cities.json', { cache: 'no-cache' }).then(r => r.json()).catch(() => null),
    o.crust === false ? null : fetch(o.crust || '../stories/curves/crust-and-land.json', { cache: 'no-cache' }).then(r => r.json()).catch(() => null)
  ]);
  const fetchMs = performance.now() - t0;
  const ages = data.ages, grades = data.grades || [], plates = {}, reach = data.reach || ages[ages.length - 1];
  for (const pid in data.plates) { const P = data.plates[pid]; plates[pid] = { first: P.first, q: P.rot.map(r => quat(r[0], r[1], r[2])) }; }
  // the pieces as globe.js prepares them (its prepare), for the motion model: the same rings as unit vectors
  const pieces = data.pieces.map(p => ({ plate: String(p.plate), from: p.from, to: p.to, ll: p.rings, rings: p.rings.map(ring => {
    var n = ring.length / 2, arr = new Float64Array(n * 3);
    for (var i = 0; i < n; i++) { var v = xyz(ring[2 * i], ring[2 * i + 1]); arr[3 * i] = v[0]; arr[3 * i + 1] = v[1]; arr[3 * i + 2] = v[2]; }
    return arr;
  }) }));
  function plateMatrixAt(pid, age) {   // globe.js's, for the craton's start when a plate's samples run past the reach
    var P = plates[pid]; if (!P) return null;
    var f = P.first, qs = P.q, n = qs.length;
    if (age <= ages[f]) return qmat(qs[0]);
    if (age >= ages[f + n - 1]) return qmat(qs[n - 1]);
    for (var k = 0; k < n - 1; k++) {
      var a0 = ages[f + k], a1 = ages[f + k + 1];
      if (age >= a0 && age <= a1) return qmat(slerp(qs[k], qs[k + 1], a1 === a0 ? 0 : (age - a0) / (a1 - a0)));
    }
    return null;
  }
  // the crust curve: the part of the crust that stood above the sea, as a share of the crust (the island's share), and
  // the amount of crust (globe.js's exposedShare and crustFraction)
  const curveValue = (pts, age) => (CWt && CWt.curveAt && CWt.maToYear) ? CWt.curveAt(pts, CWt.maToYear(age)) : null;
  function exposedShare(age) {
    if (!crust || !crust.second || !CWt.curveAt) return 0.3;
    const c = curveValue(crust.points, age), l = curveValue(crust.second.points, age);
    return c > 0 ? Math.max(0.02, Math.min(0.9, l / c)) : 0;
  }
  function crustFraction(age) { return crust && CWt.curveAt ? curveValue(crust.points, age) : 0.02; }

  // ---- globe.js's motion model, copied: the cratons' run from the reach to the oldest rock, and the blobs' from 4,400 ----
  var sim = null, blobCache = null;   // the caches for this seed
  function pieceRings(p, age, how) {   // globe.js's, as the model uses it: the softened rings for a guess
    if (how === 'guessed') { if (!p.soft) p.soft = p.rings.map(function (r) { return soften(r, 1, SOFT_PASSES); }); return p.soft; }
    return p.rings;
  }
  // the model's own turning velocity at its reach, from its last two samples: the craton leaves the reach as it arrived
  function modelVelocity(pid) {
    var P = plates[pid]; if (!P || P.q.length < 2) return [0, 0, 0];
    var n = P.q.length, a1 = ages[P.first + n - 1], a0 = ages[P.first + n - 2]; if (!(a1 > a0)) return [0, 0, 0];
    var w = qToVector(qmul(P.q[n - 1], qconj(P.q[n - 2]))), k = 1 / (a1 - a0);
    w = [w[0] * k, w[1] * k, w[2] * k]; var L = Math.hypot(w[0], w[1], w[2]);
    if (L > OMEGA_MAX) { var f = OMEGA_MAX / L; w = [w[0] * f, w[1] * f, w[2] * f]; }
    return w;
  }
  // the cratons' run: every plate with a piece older than the reach, from the reach to the oldest rock
  function cratonSim() {
    if (sim && sim.seed === seed && sim.pieces === pieces.length) return sim;
    var t0 = performance.now(), byPlate = {}, order = [], i;
    for (i = 0; i < pieces.length; i++) {
      var p = pieces[i]; if (p.from <= reach) continue;
      var body = byPlate[p.plate]; if (!body) { body = byPlate[p.plate] = { id: p.plate, parts: [] }; order.push(p.plate); }
      var rs = pieceRings(p, reach + 1, 'guessed');
      for (var k = 0; k < rs.length; k++) { var d = discsOf(rs[k]); body.parts.push({ from: p.from, to: p.to, discs: d.discs, mass: d.mass }); }
    }
    var bodies = order.map(function (pid) {
      var b = byPlate[pid], P = plates[pid], q = P ? P.q[P.q.length - 1] : [1, 0, 0, 0];
      if (P && reach < ages[P.first + P.q.length - 1]) { var M = plateMatrixAt(pid, reach); q = matToQuat(M); }   // a plate whose samples run past the reach
      b.q = q.slice(); b.omega = modelVelocity(pid); b.index = order.indexOf(pid); return b;
    });
    var steps = Math.ceil((OLDEST_ROCK - reach) / SIM_DT), run = runSim(bodies, reach, SIM_DT, steps, mulberry((seed ^ 0x51A7C0DE) >>> 0));
    sim = { seed: seed, pieces: pieces.length, index: {}, run: run, nb: bodies.length, from: reach, dt: SIM_DT, ms: performance.now() - t0 };
    bodies.forEach(function (b, j) { sim.index[b.id] = j; });
    return sim;
  }
  // a plate's turn at a guessed age (globe.js's guessedMatrix, as the quaternion): the model's last position at the reach, the
  // run's after; a plate the model never placed, or that has no piece older than the reach, stands where the model left it
  function guessedQuat(pid, age) {
    if (age <= reach || !pieces.length) return plateQuatAt(plates[pid], ages, Math.min(age, reach));
    var s = cratonSim(), b = s.index[pid];
    if (b === undefined) return plateQuatAt(plates[pid], ages, reach);
    return simQuat(s.run, s.nb, b, s.from, s.dt, age);
  }
  // invented land: blobs whose total area is the crust curve's amount at this age, shapes and places from the seed; made once
  // per seed at the size the curve gives at the oldest rock, placed clear of each other, and run from 4,400 forward by the
  // same motion model; at an age each is shrunk to the curve's amount then (globe.js's blobSet, copied; the shrink is in the
  // vertex shader here, blobShrink)
  function blobSet() {
    if (blobCache && blobCache.seed === seed && blobCache.crust === crust) return blobCache;
    var t0 = performance.now();
    var r = mulberry((seed ^ 0x9E3779B9) >>> 0), ref = crustFraction(OLDEST_ROCK), total = ref * 4 * Math.PI, n = 5 + Math.floor(r() * 5), rings = [], centres = [], rhos = [];
    var shares = []; for (var i = 0; i < n; i++) shares.push(0.4 + r()); var sum = shares.reduce(function (a, b) { return a + b; }, 0);
    for (var k = 0; k < n; k++) {
      var area = total * shares[k] / sum, rho = Math.acos(Math.max(-1, 1 - area / (2 * Math.PI)));   // a cap of this area has this angular radius
      if (!(rho > 0.01)) continue;
      var c = null;
      for (var tries = 0; tries < 40 && !c; tries++) {   // a place clear of the blobs already made, at their full size
        var cLat = Math.asin((2 * r() - 1) * 0.82), cLon = (2 * r() - 1) * Math.PI, cand = [Math.cos(cLat) * Math.cos(cLon), Math.cos(cLat) * Math.sin(cLon), Math.sin(cLat)], clear = true;   // within about 55° of the equator: a blob on a pole is a bar across the flat map
        for (var e = 0; e < centres.length && clear; e++) if (angBetween(cand, centres[e]) < (rho + rhos[e]) * 1.3) clear = false;
        if (clear || tries === 39) c = cand;
      }
      // the outline (phase 2, 21 Oct 2026): ninety-six points and three gentle harmonics, where twenty-eight points and two strong ones made corners
      var m = 96, ring = new Float64Array(m * 3), w1 = 2 + Math.floor(r() * 3), w2 = 5 + Math.floor(r() * 4), w3 = 9 + Math.floor(r() * 6), p1 = r() * 6.28, p2 = r() * 6.28, p3 = r() * 6.28;
      var u = norm3(Math.abs(c[2]) < 0.9 ? cross3([0, 0, 1], c) : cross3([1, 0, 0], c)), v = cross3(c, u);
      for (var j = 0; j < m; j++) {
        var t = j / m * 2 * Math.PI, rr = rho * (1 + 0.2 * Math.sin(w1 * t + p1) + 0.1 * Math.sin(w2 * t + p2) + 0.045 * Math.sin(w3 * t + p3)), cr = Math.cos(rr), sr = Math.sin(rr);
        var x = c[0] * cr + (u[0] * Math.cos(t) + v[0] * Math.sin(t)) * sr, y = c[1] * cr + (u[1] * Math.cos(t) + v[1] * Math.sin(t)) * sr, z = c[2] * cr + (u[2] * Math.cos(t) + v[2] * Math.sin(t)) * sr;
        ring[3 * j] = x; ring[3 * j + 1] = y; ring[3 * j + 2] = z;
      }
      rings.push(ring); centres.push(c); rhos.push(rho);
    }
    // the run: one disc per blob, its radius the curve's at the age (a part per step of size would be exact; the largest serves)
    var bodies = rings.map(function (ring, i) { return { id: 'b' + i, q: [1, 0, 0, 0], omega: [gauss(r) * 0.4 * OMEGA_MAX, gauss(r) * 0.4 * OMEGA_MAX, gauss(r) * 0.4 * OMEGA_MAX], parts: [{ from: BLOB_START, to: 0, discs: [{ c: centres[i], r: rhos[i] * 1.1 }], mass: Math.PI * rhos[i] * rhos[i] }] }; });
    var steps = Math.ceil((BLOB_START - OLDEST_ROCK) / SIM_DT), run = bodies.length ? runSim(bodies, BLOB_START, -SIM_DT, steps, mulberry((seed ^ 0xB10B5) >>> 0)) : new Float32Array(0);
    blobCache = { seed: seed, crust: crust, rings: rings, rhos: rhos, ref: ref, run: run, nb: bodies.length, byAge: {}, ms: performance.now() - t0 };
    return blobCache;
  }
  function blobShrink(age) {   // makeBlobs's share: the blobs' rings at an age are the set's, shrunk to the curve's amount then
    var set = blobSet();
    return set.ref > 0 ? Math.max(0.02, Math.min(1, crustFraction(age) / set.ref)) : 1;
  }
  function blobQuat(i, age) {
    var set = blobSet(); if (i >= set.nb) return [1, 0, 0, 0];
    return simQuat(set.run, set.nb, i, BLOB_START, -SIM_DT, age);
  }
  // the grade for an age (globe.js's gradeFor)
  function gradeFor(age) {
    var g;
    if (age > NO_MAP) g = 'none';
    else if (age > OLDEST_ROCK) g = 'invented';
    else if (age > reach) g = 'guessed';
    else if (age < seam) g = 'ground';
    else {
      g = 'fitted';
      for (var i = 0; i < grades.length; i++) if (age <= grades[i].to) { g = grades[i].grade; break; }
    }
    var why = GRADE_WORDS[g] || '';
    if (g === 'none') why = MOLTEN_WORDS[moltenState(age).phase] || why;
    return { grade: g, why: why };
  }

  // ---- the pieces as meshes, one per plate, with their islands and their shelf rims ----
  const t1 = performance.now();
  const plateBuild = new Map();
  let triangles = 0, rimTriangles = 0, rings = 0;
  const newBuild = () => ({ pos: [], soft: [], uv: [], centre: [], from: [], to: [], rim: { pos: [], dir: [], centre: [], from: [], to: [], count: 0 }, pieces: [] });
  data.pieces.forEach((p, index) => {
    const pid = String(p.plate);
    let b = plateBuild.get(pid); if (!b) { b = newBuild(); plateBuild.set(pid, b); }
    const out = { pos: [], soft: [], uv: [], centre: [] }, rim = { pos: [], dir: [], centre: [], count: 0 };
    let n = 0;
    for (const ring of p.rings) { n += triangulateRing(ring, bloatRad, maxEdgeRad, out, rim); rings++; }
    for (let i = 0; i < n * 3; i++) { b.from.push(p.from); b.to.push(p.to); }
    for (let i = 0; i < rim.count * 3; i++) { b.rim.from.push(p.from); b.rim.to.push(p.to); }
    for (const k of ['pos', 'soft', 'uv', 'centre']) for (const v of out[k]) b[k].push(v);
    for (const v of rim.pos) b.rim.pos.push(v); for (const v of rim.dir) b.rim.dir.push(v); for (const v of rim.centre) b.rim.centre.push(v);
    b.rim.count += rim.count;
    b.pieces.push({ index, from: p.from, to: p.to, triangles: n });
    triangles += n; rimTriangles += rim.count;
  });
  const group = new THREE.Group();
  // globe.js's frame (x toward lon 0, y toward lon 90 E, z north) into the ball's (x east, y north, z toward the viewer)
  group.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)));
  // a body's three meshes from a build: the land, the island on the same triangles, and the rim (null when it has no area)
  function makeMeshes(b) {
    if (!b.pos.length) return null;   // a plate whose only piece has no area (8016: its ring collapses) gets no mesh, and WebGPU no empty draw to warn of
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(b.pos);
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(pos.slice(), 3));   // on a unit ball the normal is the position
    g.setAttribute('soft', new THREE.BufferAttribute(new Float32Array(b.soft), 3));
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(b.uv), 2));
    g.setAttribute('centre', new THREE.BufferAttribute(new Float32Array(b.centre), 3));
    g.setAttribute('born', new THREE.BufferAttribute(new Float32Array(b.from), 1));   // 'from' and 'to' are WGSL's reserved words
    g.setAttribute('ended', new THREE.BufferAttribute(new Float32Array(b.to), 1));
    g.computeBoundingSphere();
    const land = new THREE.Mesh(g, null); land.frustumCulled = false;
    const isle = new THREE.Mesh(g, null); isle.frustumCulled = false; isle.visible = false;
    let rim = null;
    if (b.rim.count) {   // a body whose rings all collapsed has no rim (WebGPU warns of an empty draw)
      const rg = new THREE.BufferGeometry();
      rg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(b.rim.pos), 3));
      rg.setAttribute('dir', new THREE.BufferAttribute(new Float32Array(b.rim.dir), 3));
      rg.setAttribute('centre', new THREE.BufferAttribute(new Float32Array(b.rim.centre), 3));
      rg.setAttribute('born', new THREE.BufferAttribute(new Float32Array(b.rim.from), 1));
      rg.setAttribute('ended', new THREE.BufferAttribute(new Float32Array(b.rim.to), 1));
      rg.computeBoundingSphere();
      rim = new THREE.Mesh(rg, null); rim.frustumCulled = false; rim.visible = false; rim.renderOrder = 0.5;   // over the sea, under every piece
    }
    return { land, isle, rim };
  }
  const meshes = new Map(), islands = new Map(), rims = new Map();
  for (const [pid, b] of plateBuild) {
    const m = makeMeshes(b); if (!m) continue;
    m.land.userData.pid = pid; m.land.userData.pieces = b.pieces;
    meshes.set(pid, m.land); group.add(m.land);
    islands.set(pid, m.isle); group.add(m.isle);
    if (m.rim) { rims.set(pid, m.rim); group.add(m.rim); }
  }
  const buildMs = performance.now() - t1;
  // the blobs' meshes, remade for each seed: each blob's ring triangulated as a piece's (already smooth, so unsoftened),
  // born never and ended never, so the shaders' birth fade leaves them whole; the shrink by the crust curve is the
  // vertex shader's (uBlobF), the turn the motion model's
  let blobMeshes = [], blobSeed = null, blobBuildMs = 0;
  function buildBlobs() {
    const set = blobSet();
    if (blobSeed === set.seed && blobMeshes.length === set.nb) return set;
    const t0 = performance.now();
    for (const m of blobMeshes) { group.remove(m.land); group.remove(m.isle); if (m.rim) group.remove(m.rim); m.land.geometry.dispose(); if (m.rim) m.rim.geometry.dispose(); }
    blobMeshes = [];
    set.rings.forEach((ring, i) => {
      const b = newBuild(), out = { pos: [], soft: [], uv: [], centre: [] }, rim = { pos: [], dir: [], centre: [], count: 0 };
      const n = triangulateRing(ring, bloatRad, maxEdgeRad, out, rim, { xyz: true, smooth: false });
      for (let k = 0; k < n * 3; k++) { b.from.push(1e9); b.to.push(0); }
      for (let k = 0; k < rim.count * 3; k++) { b.rim.from.push(1e9); b.rim.to.push(0); }
      for (const k of ['pos', 'soft', 'uv', 'centre']) b[k] = out[k];
      b.rim.pos = rim.pos; b.rim.dir = rim.dir; b.rim.centre = rim.centre; b.rim.count = rim.count;
      const m = makeMeshes(b); if (!m) return;
      m.land.userData.blob = i; m.land.visible = m.isle.visible = false;
      m.land.material = blobLandMat; m.isle.material = blobIslandMat; if (m.rim) m.rim.material = blobRimMat;
      group.add(m.land); group.add(m.isle); if (m.rim) group.add(m.rim);
      blobMeshes.push(m);
    });
    blobSeed = set.seed; blobBuildMs = performance.now() - t0;
    return set;
  }

  // ---- the pictures ----
  const loader = new THREE.TextureLoader();
  let aniso = 1; try { aniso = Math.min(8, renderer.getMaxAnisotropy ? renderer.getMaxAnisotropy() : 1); } catch (e) {}
  function prep(t) {
    t.colorSpace = THREE.NoColorSpace;   // read as display values; the shader converts once
    t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.ClampToEdgeWrapping;
    t.anisotropy = aniso; t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter; t.magFilter = THREE.LinearFilter;
    return t;
  }
  const loadTex = async url => prep(await loader.loadAsync(url));
  const loadImg = url => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => rej(new Error('did not load ' + url)); im.src = url; });
  const blueUrl = o.blue || (px => `../art/globe/blue-marble-july-${px}.webp`);
  const [texOld, texVeg, texGrain, texCool, texCracks, imgOld, imgVeg, imgBlueSmall] = await Promise.all([
    loadTex(o.ground || '../art/maps/world.webp'), loadTex(o.vegetation || '../art/maps/world-vegetation.webp'),
    loadTex(texBase + 'rock-grain.png'), loadTex(texBase + 'cooling-order.png'), loadTex(texBase + 'cracks.png'),
    loadImg(o.ground || '../art/maps/world.webp'), loadImg(o.vegetation || '../art/maps/world-vegetation.webp'),
    blueUrl ? loadImg(o.blueSmall || blueUrl(2048)).catch(() => null) : null
  ]);
  // the sea masks, from the pictures' own pixels: the old ground as the 2D globe multiplies it, Blue Marble from its
  // 2,048 px file whatever the tier shows
  const MW = 2048, MH = 1024;
  const lookOld = buildMask(pictureCanvas(imgOld, MW, MH, imgVeg), MW, MH, false);
  const lookBlue = imgBlueSmall ? buildMask(pictureCanvas(imgBlueSmall, MW, MH, null), MW, MH, true) : lookOld;
  const canvasTex = c => prep(new THREE.CanvasTexture(c));
  const maskOld = canvasTex(lookOld.maskCanvas), maskBlue = canvasTex(lookBlue.maskCanvas);
  const lookMs = lookOld.ms + (imgBlueSmall ? lookBlue.ms : 0);
  const BLUE_PX = { full: 8192, middle: 4096, floor: 2048 };
  let texBlue = null, bluePx = 0, blueLoading = null;
  async function wantBlue(tier) {
    const px = view.fitTexture(BLUE_PX[tier] || 2048);
    if (px === bluePx || !blueUrl) return;
    const url = blueUrl(px);
    blueLoading = loadTex(url).then(t => { if (texBlue) texBlue.dispose(); texBlue = t; bluePx = px; rebuildMaterials(); view.redraw(); }).catch(e => { console.warn('earth.js: Blue Marble did not load', url, e); });
    return blueLoading;
  }

  // ---- the uniforms: the age and what it sets, the words, and what the frame sets ----
  const uAge = uniform(0), uBlue = uniform(0);
  const uOld = uniform(0);                         // the old look's strength: the eight million years before the reach (globe.js's tg), and whole past it
  const uShrink = uniform(Math.sqrt(0.3));         // the island: the outline shrunk toward its centre by this (the square root of the land's share)
  const uBlobF = uniform(1);                       // the blobs: each shrunk toward its centre by this (the square root of the crust curve's share at the age)
  const uIceReach = uniform(90), uIceStr = uniform(0), uIceNorth = uniform(1), uIceSnow = uniform(0);
  const uGroupInv = uniform(new THREE.Matrix4());  // the world back into the ball's frame (globe.js's), for the latitude at the age
  const uPxDist = uniform(0.01);                   // one screen pixel at the ball's edge, as the ray's distance from the centre
  // the molten sequence's numbers (moltenState's, as uniforms): the first crust's threshold and glow, the second's, the sea,
  // which maps the melt and the sea read (the turned ones after the Moon), the quiet brightening, and the haze's steam
  const uThresh1 = uniform(-1), uGlow1 = uniform(0), uThresh2 = uniform(-1), uGlow2 = uniform(0), uSeaM = uniform(0), uSecond = uniform(0), uWarm = uniform(0), uSteam = uniform(0);

  // ---- the shaders ----
  const SEA3 = rgb(S.globeSea), SEAD3 = rgb(S.globeSeaDeep), SHELF3 = rgb(S.shelfWash || '#7fb0cc'), SHELF_A = float(S.shelfWashAlpha != null ? S.shelfWashAlpha : 0.55);
  const DROWN_W = float(S.drownedWash != null ? S.drownedWash : 0.3), LIFT3 = rgb(S.islandLift || '#a39b8e'), LIFT_A = float(S.islandLiftAlpha != null ? S.islandLiftAlpha : 0.16), RIM_A = float(S.shelfRimAlpha != null ? S.shelfRimAlpha : 0.38);
  const ROCK_G = rgb(S.rockGrey || '#8c8880'), ROCK_T = rgb(S.rockTan || '#a89a80'), ROCK_R = rgb(S.rockRust || '#96603e');
  const OLD3 = rgb(S.oldCrust || '#1c1a17'), OLDG3 = rgb(S.oldCrustGrey || '#3e3a35');   // the crust before oxygen: near-black to dark grey by the grain
  const GREEN3 = rgb(S.paintGreen || '#9aa882');
  const MAGMA3 = rgb(S.magma), GLOW3 = rgb(S.magmaGlow), HOT3 = rgb(S.hot), CRUST3 = rgb(S.crust), CRUSTL3 = rgb(S.crustLight);
  const ICE3 = rgb(S.washIce || '#f4f6f8'), DEEP_ICE_A = S.deepIceAlpha != null ? S.deepIceAlpha : 0.75;
  const DARK3 = vec3(20 / 255, 16 / 255, 12 / 255), DARK_A = 0.30;   // the 2D's limb shading
  const HAZE_SEA3 = vec3(160 / 255, 200 / 255, 228 / 255), HAZE_STEAM3 = vec3(200 / 255, 190 / 255, 180 / 255), HAZE_A = 0.55;   // and its haze: blue once there is a sea, grey steam before
  const limbCss = (S.limb || 'rgba(42,36,28,0.35)').match(/[\d.]+/g).map(Number);
  const LIMB3 = vec3(limbCss[0] / 255, limbCss[1] / 255, limbCss[2] / 255), LIMB_A = limbCss[3] != null ? limbCss[3] : 0.35;
  const centreView = () => modelViewMatrix.mul(vec4(0, 0, 0, 1)).xyz;   // the ball's centre in the camera's frame (every mesh sits at it)
  const rayDist = () => length(cross(centreView(), normalize(positionView)));   // the fragment's ray's distance from the ball's centre: 1 at the edge
  const ageFrame = () => uGroupInv.mul(vec4(positionWorld, 1)).xyz;   // the point in the ball's frame: where it is at the age
  const uvOf = p => vec2(atan(p.y, p.x).div(2 * Math.PI).add(0.5), asin(clamp(p.z, -1, 1)).div(Math.PI).add(0.5));   // a unit vector's place in an equirectangular picture
  // a picture read at a unit vector's place, without the seam: where the longitude wraps, the texture coordinate jumps
  // by a whole width between neighbouring pixels and the card would read the smallest mip — a line of the picture's
  // mean down that meridian (seen on the turned maps of the second crust, 28 Oct). The gradient is taken from the
  // coordinate shifted half a world where the jump is, and handed to the sampler
  const readAt = (tex, p) => {
    const uvn = uvOf(p), u2 = fract(uvn.x.add(0.5));
    const gx = vec2(select(abs(dFdx(uvn.x)).lessThan(0.5), dFdx(uvn.x), dFdx(u2)), dFdx(uvn.y));
    const gy = vec2(select(abs(dFdy(uvn.x)).lessThan(0.5), dFdy(uvn.x), dFdy(u2)), dFdy(uvn.y));
    return texture(tex, uvn).grad(gx, gy);
  };
  const iceNode = () => {   // paintIce: the latitude at the age against the ice's reach, feathered and roughened
    const p = ageFrame();
    const lat = asin(clamp(p.z, -1, 1)).div(D2R);
    const a0 = select(uIceSnow.greaterThan(0.5), float(1), clamp(abs(lat).sub(uIceReach.sub(10)).div(16), 0, 1));
    const a1 = select(lat.greaterThan(0).and(uIceNorth.lessThan(0.5)), float(0), a0);
    const a2 = a1.mul(a1).mul(float(3).sub(a1.mul(2)));
    const rough = readAt(texGrain, p).r.mul(0.4).add(0.8);
    const heart = select(uIceSnow.greaterThan(0.5), float(0.9), float(DEEP_ICE_A));
    return min(a2.mul(rough), 1).mul(heart).mul(uIceStr);
  };
  const finish = col => {   // the ice over everything, then the limb shading, then to linear
    const iced = mix(col, ICE3, iceNode());
    const t = clamp(rayDist().sub(0.78).div(0.22), 0, 1);
    return sRGBTransferEOTF(mix(iced, DARK3, t.mul(DARK_A)));
  };
  const lifeNode = () => {   // the piece's birth fade: 0 at its birth, 1 eight million years later (and the same at its end)
    const aFrom = attribute('born', 'float'), aTo = attribute('ended', 'float');
    const born = clamp(aFrom.sub(uAge).div(FADE), 0, 1);
    const ended = select(aTo.greaterThan(0), clamp(uAge.sub(aTo).div(FADE), 0, 1), float(1));
    return min(born, ended);
  };
  // a fragment of a piece not yet born or ended is discarded, and so is one on the far side of the ball: the facing is
  // decided from the surface point itself (a point on the ball faces the camera when its outward normal points toward
  // it), not from the triangle's winding — a sliver, or a fringe fan collapsed onto its corner, can be wound either way,
  // and one wound the wrong way on the far side passed the winding test and showed through (28 Oct). The land meshes
  // are two-sided for this
  const aliveOrDiscard = () => {
    const aFrom = attribute('born', 'float'), aTo = attribute('ended', 'float');
    If(uAge.greaterThan(aFrom).or(uAge.lessThan(aTo)), () => { Discard(); });
    If(dot(positionView.sub(centreView()), positionView).greaterThanEqual(0), () => { Discard(); });
  };
  // the skin (paintSkin): the picture or its paint by the age, bare rock as the plants go, the dark crust before oxygen,
  // the picture's sea as the shelf wash, the drowned band or the island's lift, the dissolve into the sea
  function skinNode(read, island) {   // read(tex): the picture at this fragment's place today
    return Fn(() => {
      aliveOrDiscard();
      const life = lifeNode();
      const gr = read(texGrain).r, cool = read(texCool).r;
      const rust = clamp(cool.sub(0.55).div(0.25), 0, 1), lit = gr.sub(0.5).mul(0.4).add(0.8);
      let rock = mix(mix(ROCK_G, ROCK_T, gr), ROCK_R, rust).mul(lit);
      const td = clamp(uAge.sub(OXYGEN).div(DARK_BY - OXYGEN), 0, 1);   // how far the dark crust has come in: 0 bare rock, 1 near-black
      const g2 = gr.mul(gr).mul(float(3).sub(gr.mul(2)));
      rock = mix(rock, mix(OLD3, OLDG3, g2), td);
      const old = read(texOld).rgb.mul(read(texVeg).rgb);   // the 2D globe's multiply, on display values
      const photo = texBlue ? mix(old, read(texBlue).rgb, uBlue) : old;
      const paint = mix(GREEN3.mul(lit), rock, 0.2);                         // green and rock: the one quiet green lit by the grain, a fifth of the rock under it
      const tph = clamp(float(1).sub(uAge.div(SEAM)), 0, 1);           // the photograph: whole today, gone at the seam
      const pic = mix(paint, photo, tph);
      const tp = clamp(float(PLANTS).sub(uAge).div(PLANTS - GREEN_BY), 0, 1);   // how far the picture has come in: 0 bare rock, 1 the picture
      let col = mix(rock, pic, tp);
      const sea = mix(read(maskOld).r, read(maskBlue).r, uBlue).mul(float(1).sub(uOld));   // today's inland seas fade out of the old pieces as the old look comes in
      col = mix(col, SHELF3, sea);
      let alpha = float(1).sub(sea.mul(float(1).sub(SHELF_A)));
      const oldA = uOld.mul(life);
      col = island ? mix(col, LIFT3, LIFT_A.mul(oldA)) : mix(col, SHELF3, DROWN_W.mul(oldA));
      const cover = float(1).sub(life);
      col = mix(col, SEA3, cover); alpha = mix(alpha, float(1), cover);
      return vec4(finish(col), alpha);
    })();
  }
  // a blob's point shrunk toward its ring's centre by the crust curve's share (shrunk, in the vertex shader)
  const shrinkBlob = p => { const c = attribute('centre', 'vec3'); return normalize(c.add(p.sub(c).mul(uBlobF))); };
  let landMat = null, islandMat = null, rimMat = null, seaMat = null, moltenMat = null, hazeMat = null, blobLandMat = null, blobIslandMat = null, blobRimMat = null;
  function makeLand(blob) {
    const m = new THREE.MeshBasicNodeMaterial();
    m.side = THREE.DoubleSide; m.depthWrite = false; m.depthTest = false; m.transparent = true;   // painted over the sea in order; the far side goes by the surface point's facing (aliveOrDiscard)
    const p = mix(attribute('position', 'vec3'), attribute('soft', 'vec3'), uOld);   // the outline softens as the old look comes in
    let out;
    if (blob) {   // shrunk by the curve, the picture read at the shrunk point (as the 2D reads it through the body's inverse)
      const shr = shrinkBlob(p); m.positionNode = shr;
      const sv = varying(shr); out = skinNode(tex => readAt(tex, sv), false);
    } else { m.positionNode = p; out = skinNode(tex => texture(tex, uv()), false); }
    m.colorNode = out.rgb; m.opacityNode = out.a;
    return m;
  }
  function makeIsland(blob) {
    const m = new THREE.MeshBasicNodeMaterial();
    m.side = THREE.DoubleSide; m.depthWrite = false; m.depthTest = false; m.transparent = true;
    const c = attribute('centre', 'vec3'), p = mix(attribute('position', 'vec3'), attribute('soft', 'vec3'), uOld);
    const f = blob ? uShrink.mul(uBlobF) : uShrink;   // a blob's island: the two shrinks composed
    const shr = normalize(c.add(p.sub(c).mul(f)));   // shrunk: toward the ring's centre by the share's square root
    m.positionNode = shr;
    const sv = varying(shr), out = skinNode(tex => readAt(tex, sv), true);   // where the island's point lies today, for the picture under it
    m.colorNode = out.rgb; m.opacityNode = out.a;
    return m;
  }
  function makeRim(blob) {
    const m = new THREE.MeshBasicNodeMaterial();
    m.side = THREE.DoubleSide; m.depthWrite = false; m.depthTest = false; m.transparent = false;
    const base = blob ? shrinkBlob(attribute('position', 'vec3')) : attribute('position', 'vec3');
    m.positionNode = normalize(base.add(attribute('dir', 'vec3').mul(Math.tan(SHELF_DEG * D2R))));
    m.colorNode = Fn(() => {
      aliveOrDiscard();
      const k = RIM_A.mul(uOld).mul(lifeNode());
      If(k.lessThan(0.002), () => { Discard(); });
      return finish(mix(SEA3, SHELF3, k));   // opaque, the sea's own colour under the wash: where quads and discs overlap, one paint
    })();
    return m;
  }
  function makeSea() {
    const m = new THREE.MeshBasicNodeMaterial();
    m.colorNode = Fn(() => finish(SEA3))();
    return m;
  }
  // the molten Earth (paintMolten) on the whole ball: the melt by the grain, the crust where the cooling-order map is below
  // the threshold, the cracks glowing, the faint sea; the second crust on the maps turned and flipped; the Moon's impact as
  // the quiet brightening (uWarm) or as the first crust sinking while the second begins (uThresh1 and uThresh2 both live)
  function makeMolten() {
    const m = new THREE.MeshBasicNodeMaterial();
    m.colorNode = Fn(() => {
      const p = ageFrame();
      const ct = Math.cos(MAP_TURN), sn = Math.sin(MAP_TURN);
      const p2 = vec3(p.x.mul(ct).sub(p.y.mul(sn)), p.x.mul(sn).add(p.y.mul(ct)), p.z.negate());   // a different crust: the maps turned and flipped
      const pA = select(uSecond.greaterThan(0.5), p2, p);
      const cv1 = readAt(texCool, p).r, cr1 = readAt(texCracks, p).r, g1 = readAt(texGrain, p).r;
      const cv2 = readAt(texCool, p2).r, cr2 = readAt(texCracks, p2).r, g2 = readAt(texGrain, p2).r;
      const sw1 = readAt(texGrain, pA).r;
      const solid1 = clamp(uThresh1.sub(cv1).div(0.08), 0, 1), solid2 = clamp(uThresh2.sub(cv2).div(0.08), 0, 1);
      const hot = max(sw1.sub(0.62), 0).mul(1.6);
      const melt = mix(MAGMA3, GLOW3, sw1).add(HOT3.mul(hot));
      const crust1 = mix(CRUST3, CRUSTL3, g1).add(GLOW3.mul(cr1).mul(uGlow1));
      const crust2 = mix(CRUST3, CRUSTL3, g2).add(GLOW3.mul(cr2).mul(uGlow2));
      let col = mix(melt, crust1, solid1);
      col = mix(col, crust2, solid2);
      const cvA = select(uSecond.greaterThan(0.5), cv2, cv1), solidA = select(uSecond.greaterThan(0.5), solid2, solid1);
      const seaK = uSeaM.mul(solidA).mul(select(cvA.lessThan(0.55), float(1), float(0.35)));
      col = mix(col, select(cvA.lessThan(0.3), SEAD3, SEA3), seaK);
      col = mix(col, melt, uWarm);   // the quiet brightening: the whole ball toward the melt's colour, no white
      return finish(clamp(col, 0, 1));
    })();
    return m;
  }
  function makeHaze() {   // the 2D's haze and limb line on a shell round the ball, in screen pixels at the edge
    const m = new THREE.MeshBasicNodeMaterial();
    m.side = THREE.FrontSide; m.depthWrite = false; m.depthTest = false; m.transparent = true;
    const out = Fn(() => {
      const d = rayDist(), e = uPxDist;
      If(d.lessThan(float(1).sub(e)), () => { Discard(); });
      const hazeA = float(1).sub(clamp(d.sub(float(1).sub(e)).div(e.mul(5)), 0, 1)).mul(HAZE_A);   // 0.55 a pixel inside the edge, gone four outside
      const limbA = float(1).sub(clamp(abs(d.sub(1)).sub(e.mul(0.5)).div(e.mul(0.5)), 0, 1)).mul(LIMB_A);   // the limb line, a pixel wide
      const a = limbA.add(hazeA.mul(float(1).sub(limbA)));
      const haze3 = mix(HAZE_SEA3, HAZE_STEAM3, uSteam);
      const col = LIMB3.mul(limbA).add(haze3.mul(hazeA).mul(float(1).sub(limbA))).div(max(a, 1e-4));
      return vec4(sRGBTransferEOTF(col), a);
    })();
    m.colorNode = out.rgb; m.opacityNode = out.a;
    return m;
  }
  const sea = new THREE.Mesh(new THREE.SphereGeometry(SEA_R, 160, 80), null);
  sea.renderOrder = 0;
  group.add(sea);
  const haze = new THREE.Mesh(new THREE.SphereGeometry(1.04, 96, 48), null);
  haze.renderOrder = 100000; haze.frustumCulled = false;
  group.add(haze);
  let molten = false;
  function rebuildMaterials() {
    const olds = [landMat, islandMat, rimMat, seaMat, moltenMat, hazeMat, blobLandMat, blobIslandMat, blobRimMat];
    landMat = makeLand(false); islandMat = makeIsland(false); rimMat = makeRim(false); seaMat = makeSea(); moltenMat = makeMolten(); hazeMat = makeHaze();
    blobLandMat = makeLand(true); blobIslandMat = makeIsland(true); blobRimMat = makeRim(true);
    for (const m of meshes.values()) m.material = landMat;
    for (const m of islands.values()) m.material = islandMat;
    for (const m of rims.values()) m.material = rimMat;
    for (const m of blobMeshes) { m.land.material = blobLandMat; m.isle.material = blobIslandMat; if (m.rim) m.rim.material = blobRimMat; }
    sea.material = molten ? moltenMat : seaMat; haze.material = hazeMat;
    olds.forEach(m => { if (m) m.dispose(); });
  }
  rebuildMaterials();
  view.ball.add(group);   // only now, with every mesh wearing a material: the loop is already drawing

  // ---- the age: each body's turn, the raster's order, and the look's numbers ----
  let ma = 0, phaseNow = null;
  const q = new THREE.Quaternion();
  function bodyQuat(pid, age, how) { return how === 'guessed' ? guessedQuat(pid, age) : plateQuatAt(plates[pid], ages, Math.max(age, 0)); }
  function setTime(m) {
    ma = Math.max(0, m); uAge.value = ma;
    const g = gradeFor(ma).grade, how = g === 'guessed' ? 'guessed' : 'model';
    // the old look — the shelves, the islands, the drowned wash, the softened outlines — comes in over the FADE before the
    // reach and stays whole past it (globe.js's tg: 1 for the guessed and invented ages)
    const old = (g === 'guessed' || g === 'invented') ? 1 : Math.max(0, Math.min(1, (ma - (reach - FADE)) / FADE));
    uOld.value = old;
    uShrink.value = Math.sqrt(exposedShare(ma));
    const ice = ma >= seam ? iceStrength(ma) : null;   // this side of the seam the ground grade shows no deep ice, as the 2D
    uIceStr.value = ice ? ice[1] : 0; uIceReach.value = ice ? ice[0] : 90; uIceSnow.value = ice && ice[0] <= 0 ? 1 : 0;
    uIceNorth.value = (ma <= 34 && ma > 2.6) ? 0 : 1;   // the Antarctic ice came first; the north's from 2.6
    // the pieces, at the model's or the guessed positions
    const showPieces = g !== 'none' && g !== 'invented';
    let order = 1;
    for (const [pid, mesh] of meshes) {
      let alive = false, first = Infinity;
      if (showPieces) for (const p of mesh.userData.pieces) if (ma <= p.from && ma >= p.to) { alive = true; first = Math.min(first, p.index); }
      mesh.visible = alive; mesh.userData.first = first;
      const isle = islands.get(pid), rim = rims.get(pid);
      isle.visible = alive && old > 0; if (rim) rim.visible = alive && old > 0;
      if (!alive) continue;
      const Q = bodyQuat(pid, ma, how);
      if (Q) { mesh.quaternion.set(Q[1], Q[2], Q[3], Q[0]); isle.quaternion.copy(mesh.quaternion); if (rim) rim.quaternion.copy(mesh.quaternion); }
    }
    // plates in the order of their first living piece in the file (eachBody's order), pieces within a plate in file
    // order; each plate's island right after its land
    if (showPieces) [...meshes.values()].filter(m => m.visible).sort((a, b) => a.userData.first - b.userData.first).forEach(m => { m.renderOrder = order; islands.get(m.userData.pid).renderOrder = order + 0.5; order++; });
    // the blobs, at the invented ages: made for this seed, shrunk to the curve's amount, turned by their run
    if (g === 'invented') {
      const set = buildBlobs();
      uBlobF.value = Math.sqrt(blobShrink(ma));
      blobMeshes.forEach((m, i) => {
        const Q = blobQuat(i, ma);
        m.land.visible = m.isle.visible = true; if (m.rim) m.rim.visible = true;
        m.land.quaternion.set(Q[1], Q[2], Q[3], Q[0]); m.isle.quaternion.copy(m.land.quaternion); if (m.rim) m.rim.quaternion.copy(m.land.quaternion);
        m.land.renderOrder = 1 + i; m.isle.renderOrder = 1.5 + i;   // the blobs in their order, as the raster paints them
      });
    } else for (const m of blobMeshes) { m.land.visible = m.isle.visible = false; if (m.rim) m.rim.visible = false; }
    // the molten Earth: the ball takes paintMolten's shader while the grade is none, its numbers from moltenState and the
    // bench's choice of impact
    molten = g === 'none';
    sea.material = molten ? moltenMat : seaMat;
    let steam = 0;
    if (molten) {
      const st = moltenState(ma), thresh = st.t * 1.15 - 0.05;
      if (!st.second) { uThresh1.value = thresh; uGlow1.value = st.glow; uThresh2.value = -1; uGlow2.value = 0; }
      else {
        uThresh2.value = thresh; uGlow2.value = st.glow;
        // no brightening: the first crust sinks into the melt over MOON_MELT million years after the impact, the last-cooled
        // rafts first (its threshold running down from whole), the cracks brightening as it goes
        const sink = impact === 'melt' ? Math.max(0, Math.min(1, (MOON - ma) / MOON_MELT)) : 1;
        uThresh1.value = sink < 1 ? 1.1 - 1.15 * sink : -1; uGlow1.value = sink < 1 ? 0.9 * sink : 0;
      }
      uSecond.value = st.second ? 1 : 0; uSeaM.value = st.sea;
      // the quiet brightening: the whole ball toward the melt's colour over MOON_WARM million years either side of the impact
      let warm = 0;
      if (impact === 'warm') { warm = Math.max(0, 1 - Math.abs(ma - MOON) / MOON_WARM); warm = warm * warm * (3 - 2 * warm); }
      uWarm.value = warm;
      steam = st.sea > 0.5 ? 0 : 1;   // the haze is grey steam until there is a sea
      if (st.phase !== phaseNow) { phaseNow = st.phase; if (o.onMolten) o.onMolten(st.phase, ma); }
    }
    uSteam.value = steam;
    view.redraw();
  }
  // what the frame sets: the ball's frame for the ice's latitude, and a pixel at the edge for the haze (frame() is
  // also for a page drawing off-screen between the loop's frames, as the bench's pair pictures do)
  const tmpM = new THREE.Matrix4(), tmpM2 = new THREE.Matrix4();
  function frame(pxHeight) {
    tmpM.makeRotationFromQuaternion(view.ball.quaternion); tmpM2.makeRotationFromQuaternion(group.quaternion);
    uGroupInv.value.copy(tmpM.multiply(tmpM2).invert());
    const D = view.camera.position.length(), f = (pxHeight || view.host.clientHeight || 1) / 2 / Math.tan(view.camera.fov * D2R / 2);
    uPxDist.value = Math.pow(Math.max(1e-6, D * D - 1), 1.5) / (f * D * D);   // d(ray distance)/d(screen pixel) at the edge
  }
  view.onFrame(() => { frame(); if (cityEls.length) placeCities(); });

  // ---- places: a point today, carried by a plate to where it was at the age, and projected ----
  const tmpV = new THREE.Vector3(), tmpN = new THREE.Vector3(), tmpC = new THREE.Vector3();
  function placeAt(lon, lat, plate) {   // by the body's turn at the age: the model's, or the guess's past the reach (globe.js's placeAt)
    const g = gradeFor(ma).grade, Q = bodyQuat(String(plate), ma, g === 'guessed' || g === 'invented' ? 'guessed' : 'model'); const v = xyz(lon, lat);
    if (!Q) return { lon, lat };
    q.set(Q[1], Q[2], Q[3], Q[0]); tmpV.set(v[0], v[1], v[2]).applyQuaternion(q);
    return { lon: Math.atan2(tmpV.y, tmpV.x) / D2R, lat: Math.asin(Math.max(-1, Math.min(1, tmpV.z))) / D2R };
  }
  function project(lon, lat, plate) {   // the stage's pixels; front says whether the point faces the camera
    const v = xyz(lon, lat); tmpV.set(v[0], v[1], v[2]);
    const mesh = meshes.get(String(plate));
    if (mesh) mesh.localToWorld(tmpV); else group.localToWorld(tmpV);
    tmpN.copy(tmpV).normalize(); tmpC.copy(view.camera.position).sub(tmpV);
    const front = tmpN.dot(tmpC) > 0;
    tmpV.project(view.camera);
    const w = view.host.clientWidth, h = view.host.clientHeight;
    return { x: (tmpV.x + 1) / 2 * w, y: (1 - tmpV.y) / 2 * h, front };
  }

  // ---- the cities ----
  const cities = cityFile ? (cityFile.cities || cityFile) : [];
  const cityEls = [];
  if (o.citiesHost && cities.length) {
    const host = o.citiesHost;
    const dotPx = S.dot.minor;
    for (const c of cities) {
      const el = document.createElement('div');
      el.className = 'cw-earth-city';
      el.style.cssText = `position:absolute;left:0;top:0;pointer-events:none;will-change:transform;display:none;font:${S.size.mark}px ${S.font};color:${S.ink};white-space:nowrap;`;
      el.innerHTML = `<span style="position:absolute;left:${-dotPx / 2}px;top:${-dotPx / 2}px;width:${dotPx}px;height:${dotPx}px;border-radius:50%;background:${S.greyDot}"></span>` +
        `<span style="position:absolute;left:${dotPx / 2 + 4}px;top:-0.65em">${c.name}</span>`;   // no halo: Michael's ruling of 13 Oct, kept 27 Oct
      host.appendChild(el); cityEls.push({ c, el });
    }
  }
  function placeCities() {
    const shown = gradeFor(ma).grade;
    for (const { c, el } of cityEls) {
      if (ma > c.from || shown === 'none' || shown === 'invented') { el.style.display = 'none'; continue; }
      const a = Math.min(1, (c.from - ma) / 20);
      const p = project(c.lon, c.lat, c.plate);
      if (!p.front || a <= 0) { el.style.display = 'none'; continue; }
      el.style.display = 'block'; el.style.opacity = a.toFixed(3);
      el.style.transform = `translate(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px)`;
    }
  }

  await wantBlue(view.tier);
  setTime(0);

  const earth = {
    group, meshes, islands, rims, sea, haze, cities,
    get blobs() { return blobMeshes; },
    stats: { pieces: data.pieces.length, rings, plates: meshes.size, triangles, rimTriangles, buildMs: Math.round(buildMs), lookMs: Math.round(lookMs), fetchMs: Math.round(fetchMs), blue: () => bluePx,
             seaShare: { old: lookOld.seaShare, blue: lookBlue.seaShare } },
    setTime, time: () => ma,
    grade: () => gradeFor(ma),
    moltenPhase: () => (ma > NO_MAP ? moltenState(ma).phase : null),
    setGround: g => { uBlue.value = g === 'blue' ? 1 : 0; view.redraw(); }, ground: () => (uBlue.value ? 'blue' : 'old'),
    setImpact: i => { impact = i === 'melt' ? 'melt' : 'warm'; setTime(ma); }, impact: () => impact,
    // the seed, as globe.js keeps it: the same seed in both engines is the same guess (setSeed); reguess draws a new one
    seed: () => seed,
    setSeed: s => { seed = s; sim = null; blobCache = null; setTime(ma); },
    reguess: () => { seed = (seed * 1103515245 + 12345 + Date.now()) % 2147483647; sim = null; blobCache = null; setTime(ma); return seed; },
    simMs: () => ({ cratons: sim ? sim.ms : null, blobs: blobCache ? blobCache.ms : null, blobBuild: blobMeshes.length ? blobBuildMs : null }),   // the runs' costs, for checking
    setTier: async tier => { await wantBlue(tier); sea.geometry.dispose(); sea.geometry = new THREE.SphereGeometry(SEA_R, tier === 'floor' ? 96 : tier === 'middle' ? 128 : 160, tier === 'floor' ? 48 : tier === 'middle' ? 64 : 80); view.redraw(); },
    placeAt, project, placeCities, frame, exposedShare, crustFraction, iceStrength, moltenState, gradeFor,
    plateQuatAt: (pid, age) => plateQuatAt(plates[String(pid)], ages, age),
    bodyQuat: (pid, age) => bodyQuat(String(pid), age, age > reach ? 'guessed' : 'model'),
    looks: { maskOld: lookOld.maskCanvas, maskBlue: lookBlue.maskCanvas },   // for the bench's checks
    dispose: () => {
      for (const m of meshes.values()) m.geometry.dispose(); for (const m of rims.values()) m.geometry.dispose();
      for (const m of blobMeshes) { m.land.geometry.dispose(); if (m.rim) m.rim.geometry.dispose(); }
      sea.geometry.dispose(); haze.geometry.dispose();
      [landMat, islandMat, rimMat, seaMat, moltenMat, hazeMat, blobLandMat, blobIslandMat, blobRimMat, texOld, texVeg, texGrain, texCool, texCracks, texBlue, maskOld, maskBlue].forEach(t => { if (t) t.dispose(); });
      view.ball.remove(group); cityEls.forEach(({ el }) => el.remove());
    }
  };
  return earth;
}
