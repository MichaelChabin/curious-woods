/* earth.js — the Earth on the shelf: the pieces of continent as meshes on a ball, each turned by its plate
   (Spec-Earth-3D, step 1 of Getting there; the audit's §3; 27 Oct 2026). The first bench is
   experiments/earth-3d.html, beside the Time Machine and not in it; globe.js keeps running the Time Machine.

   What it does, and what it does not yet do. From stories/plates/continents.json, as it is: every ring of every
   piece is triangulated once at load — projected onto the plane touching the sphere at the ring's centre
   (azimuthal equidistant, so a ring round a pole and a ring across the dateline are plain polygons), its outline
   first carried outward by the same 0.26° the 2D globe's gap-closing stroke carries a piece's skin (BLOAT_DEG in
   globe.js), ear-clipped by three's ShapeUtils, then every triangle edge longer than `maxEdge` degrees split at
   its midpoint on the sphere, so the piece hugs the ball (a 20° triangle would sag 1.5% of the radius; at 4° it
   sags 0.06%). Each vertex's texture coordinate is today's longitude and latitude, unwrapped within its triangle so
   a piece across the dateline reads the picture whole. The pieces of one plate are one mesh, in the file's order,
   and each frame that mesh takes its plate's turn at the age, read exactly as globe.js's plateMatrixAt reads it:
   the same finite rotation, the same slerp between the two nearest five-million-year samples, held at the ends
   (the functions are copied, not reimplemented). Under the pieces the sea is a ball of its own, at the same
   radius, in globeSea from cw-style.js. Ages 0 to 1,000 million years only (the model's reach): the guessed and invented
   ages, the molten sequence, the ice, the look by age, the dissolves and the sea lowering are later steps.

   Overlaps and seams (the audit's §3): the pieces are drawn after the sea with no depth test and no depth
   writing, in the 2D raster's order — plates in the order of their first living piece in the file, pieces within
   a plate in file order — so where two pieces overlap the later one paints over the earlier, as the raster's last
   fill wins, and nothing fights for the same depth (with a depth test and the sea a hair inside, WebGL 2 in the
   pane broke the land into blotches of sea at 0.9999 of the radius, and at 0.9995 a hairline of land stood past
   the sea's edge at the limb). The far side is culled by its facing, and a triangle is a chord inside the sphere,
   so nothing stands past the limb. The bloat closes the hairlines between neighbours as the raster's stroke does.

   The ground, two ways, both today's picture at every age (not honest; the bench says so): the old ground,
   art/maps/world.webp multiplied by world-vegetation.webp as globe.js does, and NASA's Blue Marble: Next Generation
   (land-only, July 2004) at the tier's size — 8,192, 4,096 or 2,048 px wide — stepped down where the device refuses
   the size (view.fitTexture). The pictures are read as display values and converted once (sRGBTransferEOTF), so the
   multiply matches the 2D canvas's. Light, two ways: one soft light from the upper left in the camera's frame, or
   even. The dozen cities of stories/plates/cities.json ride their plates as HTML dots and names over the stage,
   placed by projecting from the ball, hidden on the far side, fading over the twenty million years before their
   ground's birth as the Time Machine's do.

     const earth = await cwEarth(view, {
       plates: '../stories/plates/continents.json', cities: '../stories/plates/cities.json',
       ground: '../art/maps/world.webp', vegetation: '../art/maps/world-vegetation.webp',
       blue: px => `../art/globe/blue-marble-july-${px}.webp`,   // Blue Marble by size
       maxEdge: 4,                 // degrees; the longest triangle edge after subdivision
       bloat: 0.75 * 360 / 1024,   // degrees; the raster's gap-closing half-stroke
       segments: [160, 80],        // the sea ball's
       citiesHost: element         // where the city dots and names go (over the stage)
     });
   Returns { group, setTime(ma), time(), setGround('old'|'blue'), ground(), setLight('lit'|'even'), light(),
   setTier(tier), placeAt(lon, lat, plate), project(lon, lat, plate) → {x, y, front} in the stage's pixels,
   cities, stats: { pieces, rings, plates, triangles, buildMs, fetchMs }, meshes, dispose() }. */
import * as THREE from 'three';
import { Fn, vec3, float, uniform, texture, uv, attribute, normalView, normalize, dot, mix, smoothstep, If, Discard, sRGBTransferEOTF } from 'three/tsl';
import { cwRGB } from './scene.js';

const D2R = Math.PI / 180;
const SEA_R = 1;   // the sea at the pieces' own radius: the land takes no depth test (below), so nothing fights and no hairline of land stands past the sea's edge at the limb

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

/* one ring of a piece → triangles on the unit sphere, as flat arrays of positions and texture coordinates */
function triangulateRing(ring, bloatRad, maxEdgeRad, out) {
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
  // the plane touching the sphere at the ring's centre; azimuthal equidistant onto it
  const c = v3.norm(pts.reduce((s, p) => v3.add(s, p), [0, 0, 0]));
  const seed = Math.abs(c[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
  const e1 = v3.norm(v3.cross(seed, c)), e2 = v3.cross(c, e1);
  const flat = pts.map(p => {
    const d = Math.max(-1, Math.min(1, v3.dot(p, c))), th = Math.acos(d);
    if (th < 1e-9) return [0, 0];
    const t = v3.norm(v3.sub(p, v3.scale(c, d)));
    return [th * v3.dot(t, e1), th * v3.dot(t, e2)];
  });
  const unflat = q => { const th = Math.hypot(q[0], q[1]); if (th < 1e-12) return c.slice(); const dir = v3.add(v3.scale(e1, q[0] / th), v3.scale(e2, q[1] / th)); return v3.norm(v3.add(v3.scale(c, Math.cos(th)), v3.scale(dir, Math.sin(th)))); };
  // counter-clockwise in the plane, then the outline carried outward by the bloat
  let area = 0;
  for (let i = 0; i < flat.length; i++) { const a = flat[i], b = flat[(i + 1) % flat.length]; area += a[0] * b[1] - b[0] * a[1]; }
  if (area < 0) flat.reverse();
  if (Math.abs(area) < 1e-12) return 0;
  const n = flat.length, grown = [];
  for (let i = 0; i < n; i++) {
    const p0 = flat[(i + n - 1) % n], p1 = flat[i], p2 = flat[(i + 1) % n];
    const ea = [p1[0] - p0[0], p1[1] - p0[1]], eb = [p2[0] - p1[0], p2[1] - p1[1]];
    const La = Math.hypot(ea[0], ea[1]) || 1, Lb = Math.hypot(eb[0], eb[1]) || 1;
    const na = [ea[1] / La, -ea[0] / La], nb = [eb[1] / Lb, -eb[0] / Lb];   // outward normals of a counter-clockwise ring
    let m = [na[0] + nb[0], na[1] + nb[1]]; const Lm = Math.hypot(m[0], m[1]);
    if (Lm < 1e-9) m = na; else m = [m[0] / Lm, m[1] / Lm];
    const k = Math.min(2, 1 / Math.max(0.5, m[0] * na[0] + m[1] * na[1]));   // the mitre, limited at a sharp corner
    grown.push([p1[0] + m[0] * bloatRad * k, p1[1] + m[1] * bloatRad * k]);
  }
  const faces = THREE.ShapeUtils.triangulateShape(grown.map(q => new THREE.Vector2(q[0], q[1])), []);
  const sph = grown.map(unflat);
  let count = 0;
  const mid = (a, b) => v3.norm(v3.add(a, b));
  function emit(a, b, c) {
    const ab = v3.angle(a, b), bc = v3.angle(b, c), ca = v3.angle(c, a), m = Math.max(ab, bc, ca);
    if (m > maxEdgeRad) {   // the longest edge split at its midpoint on the sphere: a shared edge splits the same way on both sides
      if (m === ab) { const q = mid(a, b); emit(a, q, c); emit(q, b, c); }
      else if (m === bc) { const q = mid(b, c); emit(a, b, q); emit(a, q, c); }
      else { const q = mid(c, a); emit(a, b, q); emit(q, b, c); }
      return;
    }
    if (v3.dot(v3.cross(v3.sub(b, a), v3.sub(c, a)), v3.add(v3.add(a, b), c)) < 0) { const t = b; b = c; c = t; }   // facing outward
    // texture coordinates: today's longitude and latitude, the longitudes unwrapped within the triangle; a vertex
    // on a pole takes the others' mean longitude
    const vs = [a, b, c], lons = [], lats = [];
    let ref = null;
    for (const v of vs) { const pole = Math.abs(v[2]) > 0.999999; lats.push(Math.asin(Math.max(-1, Math.min(1, v[2]))) / D2R); lons.push(pole ? null : Math.atan2(v[1], v[0]) / D2R); if (!pole && ref === null) ref = lons[lons.length - 1]; }
    if (ref === null) ref = 0;
    for (let i = 0; i < 3; i++) { if (lons[i] === null) continue; while (lons[i] - ref > 180) lons[i] -= 360; while (lons[i] - ref < -180) lons[i] += 360; }
    const known = lons.filter(l => l !== null), meanLon = known.reduce((s, l) => s + l, 0) / (known.length || 1);
    for (let i = 0; i < 3; i++) { const v = vs[i], lon = lons[i] === null ? meanLon : lons[i]; out.pos.push(v[0], v[1], v[2]); out.uv.push(lon / 360 + 0.5, lats[i] / 180 + 0.5); }
    count++;
  }
  for (const f of faces) emit(sph[f[0]], sph[f[1]], sph[f[2]]);
  return count;
}

export async function cwEarth(view, o = {}) {
  const S = (window.CW && window.CW.STYLE) || null;
  if (!S) throw new Error('earth.js needs js/cw-style.js loaded before it');
  const maxEdgeRad = (o.maxEdge || 4) * D2R, bloatRad = (o.bloat != null ? o.bloat : 0.75 * 360 / 1024) * D2R;
  const rgb = hex => { const c = cwRGB(hex); return vec3(c[0], c[1], c[2]); };
  const renderer = view.renderer;

  // ---- the data ----
  const t0 = performance.now();
  const [data, cityFile] = await Promise.all([
    fetch(o.plates || '../stories/plates/continents.json', { cache: 'no-cache' }).then(r => r.json()),
    o.cities === false ? null : fetch(o.cities || '../stories/plates/cities.json', { cache: 'no-cache' }).then(r => r.json()).catch(() => null)
  ]);
  const fetchMs = performance.now() - t0;
  const ages = data.ages, plates = {};
  for (const pid in data.plates) { const P = data.plates[pid]; plates[pid] = { first: P.first, q: P.rot.map(r => quat(r[0], r[1], r[2])) }; }

  // ---- the pieces as meshes, one per plate ----
  const t1 = performance.now();
  const byPlate = new Map();   // plate → { pos, uv, from, to, pieces: [{ index, from, to }] }
  let triangles = 0, rings = 0;
  data.pieces.forEach((p, index) => {
    const pid = String(p.plate);
    let b = byPlate.get(pid); if (!b) { b = { pos: [], uv: [], from: [], to: [], pieces: [] }; byPlate.set(pid, b); }
    const out = { pos: [], uv: [] };
    let n = 0;
    for (const ring of p.rings) { n += triangulateRing(ring, bloatRad, maxEdgeRad, out); rings++; }
    for (let i = 0; i < n * 3; i++) { b.from.push(p.from); b.to.push(p.to); }
    for (const v of out.pos) b.pos.push(v); for (const v of out.uv) b.uv.push(v);
    b.pieces.push({ index, from: p.from, to: p.to, triangles: n });
    triangles += n;
  });
  const group = new THREE.Group();
  // globe.js's frame (x toward lon 0, y toward lon 90 E, z north) into the ball's (x east, y north, z toward the viewer)
  group.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(0, 0, 1), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)));
  const meshes = new Map();
  const uAge = uniform(0), uLit = uniform(0), uBlue = uniform(0);
  for (const [pid, b] of byPlate) {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(b.pos);
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(pos.slice(), 3));   // on a unit ball the normal is the position
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(b.uv), 2));
    g.setAttribute('born', new THREE.BufferAttribute(new Float32Array(b.from), 1));   // 'from' and 'to' are WGSL's reserved words
    g.setAttribute('ended', new THREE.BufferAttribute(new Float32Array(b.to), 1));
    g.computeBoundingSphere();
    const m = new THREE.Mesh(g, null);
    m.frustumCulled = false;
    m.userData.pid = pid; m.userData.pieces = b.pieces;
    meshes.set(pid, m); group.add(m);
  }
  const buildMs = performance.now() - t1;

  // ---- the pictures ----
  const loader = new THREE.TextureLoader();
  let aniso = 1; try { aniso = Math.min(8, renderer.getMaxAnisotropy ? renderer.getMaxAnisotropy() : 1); } catch (e) {}
  async function loadTex(url) {
    const t = await loader.loadAsync(url);
    t.colorSpace = THREE.NoColorSpace;   // read as display values; the shader converts once
    t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.ClampToEdgeWrapping;
    t.anisotropy = aniso; t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter; t.magFilter = THREE.LinearFilter;
    return t;
  }
  const [texOld, texVeg] = await Promise.all([loadTex(o.ground || '../art/maps/world.webp'), loadTex(o.vegetation || '../art/maps/world-vegetation.webp')]);
  const BLUE_PX = { full: 8192, middle: 4096, floor: 2048 };
  let texBlue = null, bluePx = 0, blueLoading = null;
  const blueUrl = o.blue || (px => `../art/globe/blue-marble-july-${px}.webp`);
  async function wantBlue(tier) {
    const px = view.fitTexture(BLUE_PX[tier] || 2048);
    if (px === bluePx || !blueUrl) return;
    const url = blueUrl(px);
    blueLoading = loadTex(url).then(t => { if (texBlue) texBlue.dispose(); texBlue = t; bluePx = px; rebuildMaterials(); view.redraw(); }).catch(e => { console.warn('earth.js: Blue Marble did not load', url, e); });
    return blueLoading;
  }

  // ---- the materials ----
  let landMat = null, seaMat = null;
  const LIGHT = normalize(vec3(-0.5, 0.55, 0.7));   // one soft light from the upper left, in the camera's frame
  function shadeNode() {
    const ndl = dot(normalize(normalView), LIGHT);
    const soft = smoothstep(-0.35, 0.65, ndl).mul(0.62).add(0.38);   // soft: the night side is dim, not black
    return mix(float(1), soft, uLit);
  }
  function makeLand() {
    const m = new THREE.MeshBasicNodeMaterial();
    m.side = THREE.FrontSide; m.depthWrite = false; m.depthTest = false; m.transparent = false;   // painted over the sea in order; the far side goes by its facing
    const aFrom = attribute('born', 'float'), aTo = attribute('ended', 'float');
    m.colorNode = Fn(() => {
      If(uAge.greaterThan(aFrom).or(uAge.lessThan(aTo)), () => { Discard(); });   // a piece not yet born, or ended
      const old = texture(texOld, uv()).rgb.mul(texture(texVeg, uv()).rgb);        // the 2D globe's multiply, on display values
      let disp = old;
      if (texBlue) disp = mix(old, texture(texBlue, uv()).rgb, uBlue);
      return sRGBTransferEOTF(disp).mul(shadeNode());
    })();
    return m;
  }
  function makeSea() {
    const m = new THREE.MeshBasicNodeMaterial();
    m.colorNode = Fn(() => sRGBTransferEOTF(rgb(S.globeSea)).mul(shadeNode()))();
    return m;
  }
  const sea = new THREE.Mesh(new THREE.SphereGeometry(SEA_R, 160, 80), null);
  sea.renderOrder = 0;
  group.add(sea);
  function rebuildMaterials() {
    const oldLand = landMat, oldSea = seaMat;
    landMat = makeLand(); seaMat = makeSea();
    for (const m of meshes.values()) m.material = landMat;
    sea.material = seaMat;
    if (oldLand) oldLand.dispose(); if (oldSea) oldSea.dispose();
  }
  rebuildMaterials();
  view.ball.add(group);   // only now, with every mesh wearing a material: the loop is already drawing

  // ---- the age: each plate's turn, and the raster's order ----
  let ma = 0;
  const q = new THREE.Quaternion();
  function setTime(m) {
    ma = Math.max(0, m); uAge.value = ma;
    let order = 1;
    for (const [pid, mesh] of meshes) {
      const Q = plateQuatAt(plates[pid], ages, ma);
      if (Q) mesh.quaternion.set(Q[1], Q[2], Q[3], Q[0]);
      let alive = false, first = Infinity;
      for (const p of mesh.userData.pieces) if (ma <= p.from && ma >= p.to) { alive = true; first = Math.min(first, p.index); }
      mesh.visible = alive; mesh.userData.first = first;
    }
    // plates in the order of their first living piece in the file (eachBody's order), pieces within a plate in file order
    [...meshes.values()].filter(m => m.visible).sort((a, b) => a.userData.first - b.userData.first).forEach(m => { m.renderOrder = order++; });
    view.redraw();
  }

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
    const dotPx = S.dot.minor, halo = S.alpha(S.halo, S.haloAlpha), hp = S.haloPx;
    for (const c of cities) {
      const el = document.createElement('div');
      el.className = 'cw-earth-city';
      el.style.cssText = `position:absolute;left:0;top:0;pointer-events:none;will-change:transform;display:none;font:${S.size.mark}px ${S.font};color:${S.ink};white-space:nowrap;`;
      el.innerHTML = `<span style="position:absolute;left:${-dotPx / 2}px;top:${-dotPx / 2}px;width:${dotPx}px;height:${dotPx}px;border-radius:50%;background:${S.greyDot}"></span>` +
        `<span style="position:absolute;left:${dotPx / 2 + 4}px;top:-0.65em;text-shadow:0 0 ${hp}px ${halo},0 0 ${hp}px ${halo},0 0 ${hp}px ${halo}">${c.name}</span>`;
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
  view.onFrame(() => { if (cityEls.length) placeCities(); });

  await wantBlue(view.tier);
  setTime(0);

  const earth = {
    group, meshes, sea, cities,
    stats: { pieces: data.pieces.length, rings, plates: meshes.size, triangles, buildMs: Math.round(buildMs), fetchMs: Math.round(fetchMs), blue: () => bluePx },
    setTime, time: () => ma,
    setGround: g => { uBlue.value = g === 'blue' ? 1 : 0; view.redraw(); }, ground: () => (uBlue.value ? 'blue' : 'old'),
    setLight: l => { uLit.value = l === 'lit' ? 1 : 0; view.redraw(); }, light: () => (uLit.value ? 'lit' : 'even'),
    setTier: async tier => { await wantBlue(tier); sea.geometry.dispose(); sea.geometry = new THREE.SphereGeometry(SEA_R, tier === 'floor' ? 96 : tier === 'middle' ? 128 : 160, tier === 'floor' ? 48 : tier === 'middle' ? 64 : 80); view.redraw(); },
    placeAt, project, placeCities,
    plateQuatAt: (pid, age) => plateQuatAt(plates[String(pid)], ages, age),
    dispose: () => { for (const m of meshes.values()) m.geometry.dispose(); sea.geometry.dispose(); if (landMat) landMat.dispose(); if (seaMat) seaMat.dispose(); texOld.dispose(); texVeg.dispose(); if (texBlue) texBlue.dispose(); view.ball.remove(group); cityEls.forEach(({ el }) => el.remove()); }
  };
  return earth;
}
