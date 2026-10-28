/* earth.js — the Earth on the shelf: the pieces of continent as meshes on a ball, each turned by its plate, with
   the look by age (Spec-Earth-3D, steps 1 and 2 of Getting there; the audit's §3 and §5; 27 Oct 2026). The bench is
   experiments/earth-3d.html, beside the Time Machine and not in it; globe.js keeps running the Time Machine.

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
   earlier, as the raster's last fill wins, and nothing fights for a depth. The far side goes by its facing.

   The look by age (step 2), the 2D globe's paintSkin, shelfRim, drownedBand, dissolvePieces and paintIce as one
   fragment shader on the pieces, one on the sea and one on the shelf rims, every number theirs:
   - The photograph's sea. A sea mask is built once at load from each picture, as buildSeaMask does (the old
     ground: blue leads red by a fifth and leads green; Blue Marble: the same test, which also finds its grey sea
     ice and the dark blues its JPEG leaves round the Arctic, or the near-black its land-only map paints the sea,
     the channels summing under 70 with blue at least red). Under a piece, sea in the
     picture — an inland sea, and the bloat's sliver past every coast — is painted as the translucent shelf wash
     over the globe's own sea, never as the picture's colour (Michael, 27 Oct: Blue Marble's black band).
   - Photograph to paint by 2.6 million years (the spec: a photograph is true only of today). At today the picture;
     going back it fades linearly to paint, gone at the seam. Two paints, the bench's choice: the photograph
     painted — today's picture with the sea filled in from the land beside it, taken down to 1,024 px and blurred,
     a touch desaturated and lifted, its colours kept — or green and rock, one quiet green (paintGreen in
     cw-style.js) lit by the rock grain with a little of the rock under it, no pattern of today's deserts and
     forests carried back. Then the old rule: bare rock (the grain, grey to tan, rusty where the cooling map runs
     high) blends in from 300 to 450 million years as the plants go; no green before 450. The near-black crust
     before oxygen lies past 1,000 million years and waits for step 3 with the guessed ages.
   - The islands, the shelves and the dissolves, over the eight million years before the model's reach, as
     globe.js has them (its tg): the outlines soften (each corner drawn toward the mean of itself and its
     neighbours as two Chaikin passes leave it), a translucent shelf rim 2.2° wide round every piece under the
     crust (a quad along each edge and a disc at each corner of the outline, displaced in the vertex shader,
     drawn opaque in the sea's own colour mixed with the wash so overlaps paint once), the drowned band in the
     shelf wash over the crust, and the island — the outline shrunk toward its centre by the square root of the
     land's share of the crust, from the crust curve — lifted a touch lighter, as a second mesh on the same
     triangles with the shrink in its vertex shader. A piece dissolves into the sea over the eight million years
     before its birth (and after its end) by mixing toward the sea's colour, which hides its rim's inner half as
     the 2D's cover does.
   - The deep ice: ICEHOUSES copied; the cold ages inside 1,000 million years as the soft feathered overlay of
     ruling 3 (19 Oct), over land and sea alike, by the latitude of the point at that age (the position carried
     back into the ball's frame), feathered over sixteen degrees and roughened by the grain, south only through
     the Antarctic age, white all over for a snowball, each age's strength ramping over its first and last tenth.
     None this side of the seam, as the 2D (the ground grade's ice is ICE-6G's, step 4). Bare land never on top.
   - The rim: the 2D's limb shading (near-black at 0.30 from 0.78 of the radius to the edge) in every surface
     shader, by the fragment's ray's distance from the ball's centre, so it is right in perspective; the thin
     haze (the sea's blue, 0.55, from a pixel inside the edge to four outside) and the limb line (S.limb) on a
     shell a little larger than the ball, in its own shader — not glow.js, nothing beyond the four pixels.
   - Light: one soft light from the upper left in the camera's frame, or even; both still open (Michael, 27 Oct).

     const earth = await cwEarth(view, {
       plates, cities, crust,         // the files; crust: stories/curves/crust-and-land.json (the island's share)
       ground, vegetation,            // the old ground and its vegetation
       blue: px => url,               // Blue Marble by size; blueSmall: the 2,048 px file (the mask and the paint)
       textures: '../art/globe/',     // rock-grain.png and cooling-order.png
       maxEdge: 4, bloat: 0.75 * 360 / 1024, citiesHost: element
     });
   Returns { group, setTime(ma), time(), setGround('old'|'blue'), ground(), setLight('lit'|'even'), light(),
   setPaint('photo'|'green'), paint(), setTier(tier), placeAt, project → {x, y, front}, cities,
   stats: { pieces, rings, plates, triangles, rimTriangles, buildMs, lookMs, fetchMs, blue() }, meshes, dispose() }. */
import * as THREE from 'three';
import { Fn, vec2, vec3, vec4, float, uniform, texture, uv, attribute, varying, positionView, positionWorld, modelViewMatrix,
         normalize, dot, cross, length, mix, smoothstep, clamp, abs, min, max, select, If, Discard, sRGBTransferEOTF, atan, asin, sqrt } from 'three/tsl';
import { cwRGB } from './scene.js';

const D2R = Math.PI / 180;
const SEA_R = 1;   // the sea at the pieces' own radius: the land takes no depth test, so nothing fights and no hairline of land stands past the sea's edge at the limb
// globe.js's numbers, copied
const PLANTS = 450, GREEN_BY = 300, FADE = 8, SHELF_DEG = 2.2, SEAM = 2.6;
const RIM_SEG = 16;   // the disc at each corner of a shelf rim: sixteen segments leave a notch of 0.04° between the discs and the quads
// the cold ages of deep time, in millions of years ago, and how far from the poles the ice reached (degrees of latitude
// from the equator): the Huronian, the two snowballs, the Andean-Saharan, the late Palaeozoic, the Antarctic, the Quaternary
const ICEHOUSES = [[2400, 2100, 55], [717, 635, 0], [460, 430, 60], [360, 260, 50], [34, 2.6, 66], [2.6, 0, 58]];
// the paint (bench, 27 Oct): the photograph painted is the picture at this width, with its sea filled in from the land
// this many texels out, blurred this many times by a five-tap box, desaturated and lifted toward the pale by these shares
const PAINT_W = 1024, PAINT_FILL = 6, PAINT_BLUR = 2, PAINT_DESAT = 0.15, PAINT_LIFT = 0.12, PAINT_PALE = [236, 230, 214];

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
   the ring's centre) and the shelf rim's (base points and offset directions), as flat arrays */
function triangulateRing(ring, bloatRad, maxEdgeRad, out, rim) {
  // the ring as unit vectors, consecutive duplicates dropped, the join dropped
  let pts = [];
  for (let i = 0; i < ring.length; i += 2) { const v = xyz(ring[i], ring[i + 1]); if (!pts.length || !v3.same(v, pts[pts.length - 1])) pts.push(v); }
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
  // the softened outline (globe.js's soften, two Chaikin passes at full strength): each corner goes to the mean of
  // itself six times and its two neighbours once, which is where the passes leave it
  const soft = pts.map((p, i) => v3.norm(v3.add(v3.scale(p, 6), v3.add(pts[(i + n - 1) % n], pts[(i + 1) % n]))));
  const centre = v3.norm(soft.reduce((s, p) => v3.add(s, p), [0, 0, 0]));   // the island shrinks toward this (shrunk's centre, of the softened ring)
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
  let flat = pts.map(project), flatSoft = soft.map(project);
  // counter-clockwise in the plane
  let area = 0;
  for (let i = 0; i < n; i++) { const a = flat[i], b = flat[(i + 1) % n]; area += a[0] * b[1] - b[0] * a[1]; }
  if (Math.abs(area) < 1e-12) return 0;
  if (area < 0) { flat.reverse(); flatSoft.reverse(); }
  // the outline carried outward by the bloat (the hard ring and the soft ring each by its own normals)
  function grow(poly) {
    const g = [];
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
  const grown = grow(flat), grownSoft = grow(flatSoft);
  const faces = THREE.ShapeUtils.triangulateShape(grown.map(q => new THREE.Vector2(q[0], q[1])), []);   // the hard outline is what shows for 992 million years: it is the one triangulated
  const sph = grown.map(unflat), sphSoft = grownSoft.map(unflat);
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
    if (!outward(a[0], b[0], c[0])) { const t = b; b = c; c = t; }   // facing outward
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
  // the shelf rim: a quad along each edge of the softened outline and a disc of sixteen at each corner, each vertex a base
  // point on the outline and a unit direction along the surface (zero for the base itself); the vertex shader carries
  // the rim vertices SHELF_DEG out along their directions. The base points are the softened ring's: the rim shows only
  // as the softening comes in (both on globe.js's tg)
  if (rim) {
    const sSoft = flatSoft.map(unflat);   // the softened ring, ungrown, in the same order as the planar polygon
    const tangent = (d, p) => v3.norm(v3.sub(d, v3.scale(p, v3.dot(d, p))));
    const tanR = Math.tan(SHELF_DEG * D2R);
    const tri = (A, B, C) => {   // each [base, dir]; wound outward by where the vertices land
      const at = v => v3.norm(v3.add(v[0], v3.scale(v[1], tanR)));
      if (!outward(at(A), at(B), at(C))) { const t = B; B = C; C = t; }
      for (const v of [A, B, C]) rim.pos.push(v[0][0], v[0][1], v[0][2]), rim.dir.push(v[1][0], v[1][1], v[1][2]);
      rim.count++;
    };
    const ZERO = [0, 0, 0];
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n, a = sSoft[i], b = sSoft[j], fa = flatSoft[i], fb = flatSoft[j];
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

// ---- the sea mask and the paint of a picture, built once from the picture's pixels (buildSeaMask, and the paint of step 2) ----
function pictureCanvas(img, w, h, mul) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(img, 0, 0, w, h);
  if (mul) { x.globalCompositeOperation = 'multiply'; x.drawImage(mul, 0, 0, w, h); x.globalCompositeOperation = 'source-over'; }
  return { canvas: c, data: x.getImageData(0, 0, w, h).data };
}
function buildLook(pic, w, h, isBlue) {
  const t0 = performance.now(), p = pic.data, n = w * h;
  // the mask: sea where the picture says sea
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
  // the paint: the land's colours alone taken down to PAINT_W (a texel is the mean of the land under it), the sea
  // filled in from the land beside it, blurred, a touch desaturated and lifted
  const pw = PAINT_W, ph = PAINT_W / 2, sx = w / pw, sy = h / ph, pn = pw * ph;
  let col = new Float32Array(pn * 3), land = new Uint8Array(pn);
  for (let y = 0; y < ph; y++) for (let x = 0; x < pw; x++) {
    let r = 0, g = 0, b = 0, k = 0;
    for (let yy = y * sy; yy < (y + 1) * sy; yy++) { let i = yy * w + x * sx; for (let xx = 0; xx < sx; xx++, i++) { if (mask[i]) continue; const j = i << 2; r += p[j]; g += p[j + 1]; b += p[j + 2]; k++; } }
    if (k) { const o = (y * pw + x) * 3; col[o] = r / k; col[o + 1] = g / k; col[o + 2] = b / k; land[y * pw + x] = 1; }
  }
  let next = new Float32Array(pn * 3), nl = new Uint8Array(pn);
  for (let pass = 0; pass < PAINT_FILL; pass++) {   // the sea filled in: each sea texel beside land takes the mean of the land beside it
    next.set(col); nl.set(land);
    for (let y = 0; y < ph; y++) {
      const yu = y > 0 ? y - 1 : 0, yd = y < ph - 1 ? y + 1 : ph - 1;
      for (let x = 0; x < pw; x++) {
        const i = y * pw + x; if (land[i]) continue;
        let r = 0, g = 0, b = 0, k = 0, q;
        q = y * pw + (x > 0 ? x - 1 : pw - 1); if (land[q]) { r += col[q * 3]; g += col[q * 3 + 1]; b += col[q * 3 + 2]; k++; }
        q = y * pw + (x < pw - 1 ? x + 1 : 0); if (land[q]) { r += col[q * 3]; g += col[q * 3 + 1]; b += col[q * 3 + 2]; k++; }
        q = yu * pw + x; if (land[q]) { r += col[q * 3]; g += col[q * 3 + 1]; b += col[q * 3 + 2]; k++; }
        q = yd * pw + x; if (land[q]) { r += col[q * 3]; g += col[q * 3 + 1]; b += col[q * 3 + 2]; k++; }
        if (k) { next[i * 3] = r / k; next[i * 3 + 1] = g / k; next[i * 3 + 2] = b / k; nl[i] = 1; }
      }
    }
    let t = col; col = next; next = t; t = land; land = nl; nl = t;
  }
  for (let pass = 0; pass < PAINT_BLUR * 2; pass++) {   // a five-tap box, across then down, wrapping round the world
    const horiz = (pass & 1) === 0;
    for (let y = 0; y < ph; y++) for (let x = 0; x < pw; x++) {
      let r = 0, g = 0, b = 0, k = 0;
      for (let d = -2; d <= 2; d++) {
        const qx = horiz ? (x + d + pw) % pw : x, qy = horiz ? y : y + d; if (qy < 0 || qy >= ph) continue;
        const o = (qy * pw + qx) * 3; r += col[o]; g += col[o + 1]; b += col[o + 2]; k++;
      }
      const o = (y * pw + x) * 3; next[o] = r / k; next[o + 1] = g / k; next[o + 2] = b / k;
    }
    const t = col; col = next; next = t;
  }
  const pc = document.createElement('canvas'); pc.width = pw; pc.height = ph;
  const px = pc.getContext('2d'), pd = px.createImageData(pw, ph);
  for (let i = 0, o = 0, j = 0; i < pn; i++, o += 3, j += 4) {
    let r = col[o], g = col[o + 1], b = col[o + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    r += (lum - r) * PAINT_DESAT; g += (lum - g) * PAINT_DESAT; b += (lum - b) * PAINT_DESAT;
    pd.data[j] = r + (PAINT_PALE[0] - r) * PAINT_LIFT; pd.data[j + 1] = g + (PAINT_PALE[1] - g) * PAINT_LIFT; pd.data[j + 2] = b + (PAINT_PALE[2] - b) * PAINT_LIFT; pd.data[j + 3] = 255;
  }
  px.putImageData(pd, 0, 0);
  return { maskCanvas: mc, paintCanvas: pc, ms: performance.now() - t0, seaShare: seaCount / n };
}

export async function cwEarth(view, o = {}) {
  const S = (window.CW && window.CW.STYLE) || null;
  if (!S) throw new Error('earth.js needs js/cw-style.js loaded before it');
  const CWt = window.CW;
  const maxEdgeRad = (o.maxEdge || 4) * D2R, bloatRad = (o.bloat != null ? o.bloat : 0.75 * 360 / 1024) * D2R;
  const rgb = hex => { const c = cwRGB(hex); return vec3(c[0], c[1], c[2]); };
  const renderer = view.renderer;
  const texBase = o.textures || '../art/globe/';

  // ---- the data ----
  const t0 = performance.now();
  const [data, cityFile, crust] = await Promise.all([
    fetch(o.plates || '../stories/plates/continents.json', { cache: 'no-cache' }).then(r => r.json()),
    o.cities === false ? null : fetch(o.cities || '../stories/plates/cities.json', { cache: 'no-cache' }).then(r => r.json()).catch(() => null),
    o.crust === false ? null : fetch(o.crust || '../stories/curves/crust-and-land.json', { cache: 'no-cache' }).then(r => r.json()).catch(() => null)
  ]);
  const fetchMs = performance.now() - t0;
  const ages = data.ages, plates = {}, reach = data.reach || ages[ages.length - 1];
  for (const pid in data.plates) { const P = data.plates[pid]; plates[pid] = { first: P.first, q: P.rot.map(r => quat(r[0], r[1], r[2])) }; }
  // the part of the crust that stood above the sea, as a share of the crust: the island's share (globe.js's exposedShare)
  const curveValue = (pts, age) => (CWt && CWt.curveAt && CWt.maToYear) ? CWt.curveAt(pts, CWt.maToYear(age)) : null;
  function exposedShare(age) {
    if (!crust || !crust.second || !CWt.curveAt) return 0.3;
    const c = curveValue(crust.points, age), l = curveValue(crust.second.points, age);
    return c > 0 ? Math.max(0.02, Math.min(0.9, l / c)) : 0;
  }

  // ---- the pieces as meshes, one per plate, with their islands and their shelf rims ----
  const t1 = performance.now();
  const byPlate = new Map();
  let triangles = 0, rimTriangles = 0, rings = 0;
  data.pieces.forEach((p, index) => {
    const pid = String(p.plate);
    let b = byPlate.get(pid); if (!b) { b = { pos: [], soft: [], uv: [], centre: [], from: [], to: [], rim: { pos: [], dir: [], from: [], to: [], count: 0 }, pieces: [] }; byPlate.set(pid, b); }
    const out = { pos: [], soft: [], uv: [], centre: [] }, rim = { pos: [], dir: [], count: 0 };
    let n = 0;
    for (const ring of p.rings) { n += triangulateRing(ring, bloatRad, maxEdgeRad, out, rim); rings++; }
    for (let i = 0; i < n * 3; i++) { b.from.push(p.from); b.to.push(p.to); }
    for (let i = 0; i < rim.count * 3; i++) { b.rim.from.push(p.from); b.rim.to.push(p.to); }
    for (const k of ['pos', 'soft', 'uv', 'centre']) for (const v of out[k]) b[k].push(v);
    for (const v of rim.pos) b.rim.pos.push(v); for (const v of rim.dir) b.rim.dir.push(v);
    b.rim.count += rim.count;
    b.pieces.push({ index, from: p.from, to: p.to, triangles: n });
    triangles += n; rimTriangles += rim.count;
  });
  const group = new THREE.Group();
  // globe.js's frame (x toward lon 0, y toward lon 90 E, z north) into the ball's (x east, y north, z toward the viewer)
  group.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)));
  const meshes = new Map(), islands = new Map(), rims = new Map();
  for (const [pid, b] of byPlate) {
    if (!b.pos.length) continue;   // a plate whose only piece has no area (8016: its ring collapses) gets no mesh, and WebGPU no empty draw to warn of
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
    const m = new THREE.Mesh(g, null); m.frustumCulled = false;
    m.userData.pid = pid; m.userData.pieces = b.pieces;
    meshes.set(pid, m); group.add(m);
    const isle = new THREE.Mesh(g, null); isle.frustumCulled = false; isle.visible = false;
    islands.set(pid, isle); group.add(isle);
    const rg = new THREE.BufferGeometry();
    rg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(b.rim.pos), 3));
    rg.setAttribute('dir', new THREE.BufferAttribute(new Float32Array(b.rim.dir), 3));
    rg.setAttribute('born', new THREE.BufferAttribute(new Float32Array(b.rim.from), 1));
    rg.setAttribute('ended', new THREE.BufferAttribute(new Float32Array(b.rim.to), 1));
    rg.computeBoundingSphere();
    const rm = new THREE.Mesh(rg, null); rm.frustumCulled = false; rm.visible = false; rm.renderOrder = 0.5;   // over the sea, under every piece
    if (b.rim.count) { rims.set(pid, rm); group.add(rm); }   // a plate whose rings all collapsed has no rim (WebGPU warns of an empty draw)
  }
  const buildMs = performance.now() - t1;

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
  const [texOld, texVeg, texGrain, texCool, imgOld, imgVeg, imgBlueSmall] = await Promise.all([
    loadTex(o.ground || '../art/maps/world.webp'), loadTex(o.vegetation || '../art/maps/world-vegetation.webp'),
    loadTex(texBase + 'rock-grain.png'), loadTex(texBase + 'cooling-order.png'),
    loadImg(o.ground || '../art/maps/world.webp'), loadImg(o.vegetation || '../art/maps/world-vegetation.webp'),
    blueUrl ? loadImg(o.blueSmall || blueUrl(2048)).catch(() => null) : null
  ]);
  // the sea masks and the paints, from the pictures' own pixels: the old ground as the 2D globe multiplies it, Blue
  // Marble from its 2,048 px file whatever the tier shows
  const MW = 2048, MH = 1024;
  const lookOld = buildLook(pictureCanvas(imgOld, MW, MH, imgVeg), MW, MH, false);
  const lookBlue = imgBlueSmall ? buildLook(pictureCanvas(imgBlueSmall, MW, MH, null), MW, MH, true) : lookOld;
  const canvasTex = c => prep(new THREE.CanvasTexture(c));
  const maskOld = canvasTex(lookOld.maskCanvas), maskBlue = canvasTex(lookBlue.maskCanvas), paintOld = canvasTex(lookOld.paintCanvas), paintBlue = canvasTex(lookBlue.paintCanvas);
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
  const uAge = uniform(0), uLit = uniform(0), uBlue = uniform(0), uPaint = uniform(0);
  const uOld = uniform(0);                         // the old look's strength: the eight million years before the reach (globe.js's tg)
  const uShrink = uniform(Math.sqrt(0.3));         // the island: the outline shrunk toward its centre by this (the square root of the land's share)
  const uIceReach = uniform(90), uIceStr = uniform(0), uIceNorth = uniform(1), uIceSnow = uniform(0);
  const uGroupInv = uniform(new THREE.Matrix4());  // the world back into the ball's frame (globe.js's), for the latitude at the age
  const uPxDist = uniform(0.01);                   // one screen pixel at the ball's edge, as the ray's distance from the centre

  // ---- the shaders ----
  const SEA3 = rgb(S.globeSea), SHELF3 = rgb(S.shelfWash || '#7fb0cc'), SHELF_A = float(S.shelfWashAlpha != null ? S.shelfWashAlpha : 0.55);
  const DROWN_W = float(S.drownedWash != null ? S.drownedWash : 0.3), LIFT3 = rgb(S.islandLift || '#a39b8e'), LIFT_A = float(S.islandLiftAlpha != null ? S.islandLiftAlpha : 0.16), RIM_A = float(S.shelfRimAlpha != null ? S.shelfRimAlpha : 0.38);
  const ROCK_G = rgb(S.rockGrey || '#8c8880'), ROCK_T = rgb(S.rockTan || '#a89a80'), ROCK_R = rgb(S.rockRust || '#96603e');
  const GREEN3 = rgb(S.paintGreen || '#9aa882');
  const ICE3 = rgb(S.washIce || '#f4f6f8'), DEEP_ICE_A = S.deepIceAlpha != null ? S.deepIceAlpha : 0.75;
  const DARK3 = vec3(20 / 255, 16 / 255, 12 / 255), DARK_A = 0.30;   // the 2D's limb shading
  const HAZE3 = vec3(160 / 255, 200 / 255, 228 / 255), HAZE_A = 0.55;   // and its haze, blue once there is a sea
  const limbCss = (S.limb || 'rgba(42,36,28,0.35)').match(/[\d.]+/g).map(Number);
  const LIMB3 = vec3(limbCss[0] / 255, limbCss[1] / 255, limbCss[2] / 255), LIMB_A = limbCss[3] != null ? limbCss[3] : 0.35;
  const LIGHT = normalize(vec3(-0.5, 0.55, 0.7));   // one soft light from the upper left, in the camera's frame
  const centreView = () => modelViewMatrix.mul(vec4(0, 0, 0, 1)).xyz;   // the ball's centre in the camera's frame (every mesh sits at it)
  const shadeNode = () => {   // the normal from the surface point itself, so a displaced vertex (an island, a rim) shades right
    const nv = normalize(positionView.sub(centreView()));
    const ndl = dot(nv, LIGHT);
    const soft = smoothstep(-0.35, 0.65, ndl).mul(0.62).add(0.38);   // soft: the night side is dim, not black
    return mix(float(1), soft, uLit);
  };
  const rayDist = () => length(cross(centreView(), normalize(positionView)));   // the fragment's ray's distance from the ball's centre: 1 at the edge
  const seaBase = () => SEA3.mul(shadeNode());
  const ageFrame = () => uGroupInv.mul(vec4(positionWorld, 1)).xyz;   // the point in the ball's frame: where it is at the age
  const iceNode = () => {   // paintIce: the latitude at the age against the ice's reach, feathered and roughened
    const p = ageFrame();
    const lat = asin(clamp(p.z, -1, 1)).div(D2R);
    const a0 = select(uIceSnow.greaterThan(0.5), float(1), clamp(abs(lat).sub(uIceReach.sub(10)).div(16), 0, 1));
    const a1 = select(lat.greaterThan(0).and(uIceNorth.lessThan(0.5)), float(0), a0);
    const a2 = a1.mul(a1).mul(float(3).sub(a1.mul(2)));
    const guv = vec2(atan(p.y, p.x).div(2 * Math.PI).add(0.5), asin(clamp(p.z, -1, 1)).div(Math.PI).add(0.5));
    const rough = texture(texGrain, guv).r.mul(0.4).add(0.8);
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
  const aliveOrDiscard = () => { const aFrom = attribute('born', 'float'), aTo = attribute('ended', 'float'); If(uAge.greaterThan(aFrom).or(uAge.lessThan(aTo)), () => { Discard(); }); };
  // the skin (paintSkin): the picture or its paint by the age, bare rock as the plants go, the picture's sea as the
  // shelf wash, the drowned band or the island's lift, the dissolve into the sea
  function skinNode(uvN, island) {
    return Fn(() => {
      aliveOrDiscard();
      const life = lifeNode();
      const gr = texture(texGrain, uvN).r, cool = texture(texCool, uvN).r;
      const rust = clamp(cool.sub(0.55).div(0.25), 0, 1), lit = gr.sub(0.5).mul(0.4).add(0.8);
      const rock = mix(mix(ROCK_G, ROCK_T, gr), ROCK_R, rust).mul(lit);
      const old = texture(texOld, uvN).rgb.mul(texture(texVeg, uvN).rgb);   // the 2D globe's multiply, on display values
      const photo = texBlue ? mix(old, texture(texBlue, uvN).rgb, uBlue) : old;
      const paintA = mix(texture(paintOld, uvN).rgb, texture(paintBlue, uvN).rgb, uBlue);
      const paintB = mix(GREEN3.mul(lit), rock, 0.2);
      const paint = mix(paintA, paintB, uPaint);
      const tph = clamp(float(1).sub(uAge.div(SEAM)), 0, 1);           // the photograph: whole today, gone at the seam
      const pic = mix(paint, photo, tph);
      const tp = clamp(float(PLANTS).sub(uAge).div(PLANTS - GREEN_BY), 0, 1);   // how far the picture has come in: 0 bare rock, 1 the picture
      let col = mix(rock, pic, tp);
      const sea = mix(texture(maskOld, uvN).r, texture(maskBlue, uvN).r, uBlue).mul(float(1).sub(uOld));   // today's inland seas fade out of the old pieces as the old look comes in
      col = mix(col, SHELF3, sea);
      let alpha = float(1).sub(sea.mul(float(1).sub(SHELF_A)));
      const oldA = uOld.mul(life);
      col = island ? mix(col, LIFT3, LIFT_A.mul(oldA)) : mix(col, SHELF3, DROWN_W.mul(oldA));
      const cover = float(1).sub(life);
      col = mix(col, seaBase(), cover); alpha = mix(alpha, float(1), cover);
      return vec4(finish(col), alpha);
    })();
  }
  let landMat = null, islandMat = null, rimMat = null, seaMat = null, hazeMat = null;
  function makeLand() {
    const m = new THREE.MeshBasicNodeMaterial();
    m.side = THREE.FrontSide; m.depthWrite = false; m.depthTest = false; m.transparent = true;   // painted over the sea in order; the far side goes by its facing
    m.positionNode = mix(attribute('position', 'vec3'), attribute('soft', 'vec3'), uOld);   // the outline softens as the old look comes in
    const out = skinNode(uv(), false);
    m.colorNode = out.rgb; m.opacityNode = out.a;
    return m;
  }
  function makeIsland() {
    const m = new THREE.MeshBasicNodeMaterial();
    m.side = THREE.FrontSide; m.depthWrite = false; m.depthTest = false; m.transparent = true;
    const c = attribute('centre', 'vec3'), p = mix(attribute('position', 'vec3'), attribute('soft', 'vec3'), uOld);
    const shr = normalize(c.add(p.sub(c).mul(uShrink)));   // shrunk: toward the ring's centre by the share's square root
    m.positionNode = shr;
    const sv = varying(shr);   // where the island's point lies today, for the picture under it
    const uvN = vec2(atan(sv.y, sv.x).div(2 * Math.PI).add(0.5), asin(clamp(sv.z, -1, 1)).div(Math.PI).add(0.5));
    const out = skinNode(uvN, true);
    m.colorNode = out.rgb; m.opacityNode = out.a;
    return m;
  }
  function makeRim() {
    const m = new THREE.MeshBasicNodeMaterial();
    m.side = THREE.FrontSide; m.depthWrite = false; m.depthTest = false; m.transparent = false;
    m.positionNode = normalize(attribute('position', 'vec3').add(attribute('dir', 'vec3').mul(Math.tan(SHELF_DEG * D2R))));
    m.colorNode = Fn(() => {
      aliveOrDiscard();
      const k = RIM_A.mul(uOld).mul(lifeNode());
      If(k.lessThan(0.002), () => { Discard(); });
      return finish(mix(seaBase(), SHELF3, k));   // opaque, the sea's own colour under the wash: where quads and discs overlap, one paint
    })();
    return m;
  }
  function makeSea() {
    const m = new THREE.MeshBasicNodeMaterial();
    m.colorNode = Fn(() => finish(seaBase()))();
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
      const col = LIMB3.mul(limbA).add(HAZE3.mul(hazeA).mul(float(1).sub(limbA))).div(max(a, 1e-4));
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
  function rebuildMaterials() {
    const olds = [landMat, islandMat, rimMat, seaMat, hazeMat];
    landMat = makeLand(); islandMat = makeIsland(); rimMat = makeRim(); seaMat = makeSea(); hazeMat = makeHaze();
    for (const m of meshes.values()) m.material = landMat;
    for (const m of islands.values()) m.material = islandMat;
    for (const m of rims.values()) m.material = rimMat;
    sea.material = seaMat; haze.material = hazeMat;
    olds.forEach(m => { if (m) m.dispose(); });
  }
  rebuildMaterials();
  view.ball.add(group);   // only now, with every mesh wearing a material: the loop is already drawing

  // ---- the age: each plate's turn, the raster's order, and the look's numbers ----
  let ma = 0;
  const q = new THREE.Quaternion();
  function setTime(m) {
    ma = Math.max(0, m); uAge.value = ma;
    const old = Math.max(0, Math.min(1, (ma - (reach - FADE)) / FADE));
    uOld.value = old;
    uShrink.value = Math.sqrt(exposedShare(ma));
    const ice = ma >= SEAM ? iceStrength(ma) : null;   // this side of the seam the ground grade shows no deep ice, as the 2D
    uIceStr.value = ice ? ice[1] : 0; uIceReach.value = ice ? ice[0] : 90; uIceSnow.value = ice && ice[0] <= 0 ? 1 : 0;
    uIceNorth.value = (ma <= 34 && ma > 2.6) ? 0 : 1;   // the Antarctic ice came first; the north's from 2.6
    let order = 1;
    for (const [pid, mesh] of meshes) {
      const Q = plateQuatAt(plates[pid], ages, ma);
      let alive = false, first = Infinity;
      for (const p of mesh.userData.pieces) if (ma <= p.from && ma >= p.to) { alive = true; first = Math.min(first, p.index); }
      mesh.visible = alive; mesh.userData.first = first;
      const isle = islands.get(pid), rim = rims.get(pid);
      isle.visible = alive && old > 0; if (rim) rim.visible = alive && old > 0;
      if (Q) { mesh.quaternion.set(Q[1], Q[2], Q[3], Q[0]); isle.quaternion.copy(mesh.quaternion); if (rim) rim.quaternion.copy(mesh.quaternion); }
    }
    // plates in the order of their first living piece in the file (eachBody's order), pieces within a plate in file
    // order; each plate's island right after its land
    [...meshes.values()].filter(m => m.visible).sort((a, b) => a.userData.first - b.userData.first).forEach(m => { m.renderOrder = order; islands.get(m.userData.pid).renderOrder = order + 0.5; order++; });
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
  function placeAt(lon, lat, plate) {
    const Q = plateQuatAt(plates[String(plate)], ages, ma); const v = xyz(lon, lat);
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
    for (const { c, el } of cityEls) {
      if (ma > c.from) { el.style.display = 'none'; continue; }
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
    stats: { pieces: data.pieces.length, rings, plates: meshes.size, triangles, rimTriangles, buildMs: Math.round(buildMs), lookMs: Math.round(lookMs), fetchMs: Math.round(fetchMs), blue: () => bluePx,
             seaShare: { old: lookOld.seaShare, blue: lookBlue.seaShare } },
    setTime, time: () => ma,
    setGround: g => { uBlue.value = g === 'blue' ? 1 : 0; view.redraw(); }, ground: () => (uBlue.value ? 'blue' : 'old'),
    setLight: l => { uLit.value = l === 'lit' ? 1 : 0; view.redraw(); }, light: () => (uLit.value ? 'lit' : 'even'),
    setPaint: p => { uPaint.value = p === 'green' ? 1 : 0; view.redraw(); }, paint: () => (uPaint.value ? 'green' : 'photo'),
    setTier: async tier => { await wantBlue(tier); sea.geometry.dispose(); sea.geometry = new THREE.SphereGeometry(SEA_R, tier === 'floor' ? 96 : tier === 'middle' ? 128 : 160, tier === 'floor' ? 48 : tier === 'middle' ? 64 : 80); view.redraw(); },
    placeAt, project, placeCities, frame, exposedShare, iceStrength,
    plateQuatAt: (pid, age) => plateQuatAt(plates[String(pid)], ages, age),
    looks: { maskOld: lookOld.maskCanvas, maskBlue: lookBlue.maskCanvas, paintOld: lookOld.paintCanvas, paintBlue: lookBlue.paintCanvas },   // for the bench's checks
    dispose: () => {
      for (const m of meshes.values()) m.geometry.dispose(); for (const m of rims.values()) m.geometry.dispose();
      sea.geometry.dispose(); haze.geometry.dispose();
      [landMat, islandMat, rimMat, seaMat, hazeMat, texOld, texVeg, texGrain, texCool, texBlue, maskOld, maskBlue, paintOld, paintBlue].forEach(t => { if (t) t.dispose(); });
      view.ball.remove(group); cityEls.forEach(({ el }) => el.remove());
    }
  };
  return earth;
}
