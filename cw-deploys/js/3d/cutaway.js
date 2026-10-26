/* cutaway.js — a ball with a wedge out (Standard-Interactives, the shared 3D shelf; 26 Oct 2026).
   The ball is a sphere missing a quarter (phi from 270° to 360°), closed by two half-discs along the cut.
   The page supplies the shaders: one for the surface, one for the cut faces. The cut faces' shader is a TSL
   Fn of one vec2, q, the point's place on the face with the ball's centre at (0,0) and the surface at length 1,
   so a page draws the inside by radius (length(q)) and angle, the same on both faces.
     cwCutaway({ radius, segments, surface, face })
       radius    the ball's radius (default 1)
       segments  [around, up] for the sphere, and the face's rim takes `around` (default [160, 80])
       surface   a Material for the surface (a node material; the page's)
       face      Fn(([q, side]) => vec3 colour) for the cut faces; side is 1 on one face and -1 on the other,
                 for a page that wants the two to differ (a different seed, say)
   Returns { group, surface, faces, setCut(on), setSurface(material), setFace(fn), rebuild(segments) }:
   group is what the page adds to the scene's ball; setCut(false) closes the ball and hides the faces.
   Picking: the faces are named 'cut' and the surface 'surface', and a hit's local point on a face gives
   the radius: length of (x, y) of the point in the face's frame. */
import * as THREE from 'three';
import { vec2, float, positionLocal } from 'three/tsl';

const CUT = Math.PI * 1.5;   // what the sphere keeps: three quarters of the way round

export function cwCutaway({ radius = 1, segments = [160, 80], surface, face } = {}) {
  const group = new THREE.Group();
  let around = segments[0], up = segments[1];
  let fullGeo = null, cutGeo = null, faceGeoA = null, faceGeoB = null;

  function makeGeometry() {
    if (fullGeo) { fullGeo.dispose(); cutGeo.dispose(); faceGeoA.dispose(); faceGeoB.dispose(); }
    fullGeo = new THREE.SphereGeometry(radius, around, up);
    cutGeo = new THREE.SphereGeometry(radius, around, up, 0, CUT);
    faceGeoA = new THREE.CircleGeometry(radius, Math.max(32, around >> 1), -Math.PI / 2, Math.PI);
    faceGeoB = new THREE.CircleGeometry(radius, Math.max(32, around >> 1), Math.PI / 2, Math.PI);
  }
  makeGeometry();

  const surf = new THREE.Mesh(cutGeo, surface);
  surf.name = 'surface';
  group.add(surf);

  // the two faces lie along the cut: one at phi = 0, one at phi = 270°; each sees q with x mirrored so
  // that the inside reads the same way round from either side
  function faceMaterial(side) {
    const m = new THREE.MeshBasicNodeMaterial({ side: THREE.DoubleSide });
    m.colorNode = face(vec2(positionLocal.x.mul(side), positionLocal.y), float(side));
    return m;
  }
  const faceA = new THREE.Mesh(faceGeoA, faceMaterial(1));
  faceA.rotation.y = Math.PI;
  const faceB = new THREE.Mesh(faceGeoB, faceMaterial(-1));
  faceB.rotation.y = Math.PI * 1.5;
  faceA.name = faceB.name = 'cut';
  group.add(faceA, faceB);

  let cut = true;
  const api = {
    group, surface: surf, faces: [faceA, faceB],
    get cut() { return cut; },
    setCut(on) { cut = !!on; surf.geometry = cut ? cutGeo : fullGeo; faceA.visible = faceB.visible = cut; },
    setSurface(material) { surf.material = material; },
    setFace(fn) { face = fn; faceA.material.dispose(); faceB.material.dispose(); faceA.material = faceMaterial(1); faceB.material = faceMaterial(-1); },
    rebuild(seg) {
      around = seg[0]; up = seg[1]; makeGeometry();
      surf.geometry = cut ? cutGeo : fullGeo; faceA.geometry = faceGeoA; faceB.geometry = faceGeoB;
    },
    /* the radius, 0..1 of the ball, of a raycast hit on a face or the surface */
    radiusOf(hit) {
      if (hit.object === surf) return 1;
      const p = hit.object.worldToLocal(hit.point.clone());
      return Math.min(1, Math.hypot(p.x, p.y) / radius);
    }
  };
  return api;
}
