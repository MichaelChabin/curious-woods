/* scene.js — the renderer, the camera, the tiers and the gestures of every 3D page
   (Standard-Interactives, the shared 3D shelf; 26 Oct 2026; brought to the standard 27 Oct). One call stands a
   page up:

     const view = await cwScene(host, {
       ground: CW.STYLE.black,                  // the stage's colour; the renderer clears to it (default: black in cw-style.js)
       camera: { fov: 32, position: [-1.7, 1.4, -3.7], near: 0.05, far: 100, min: 1.25, max: 9 },
       turn: 0,                                 // an idle turn, radians a second, until the first touch; default none (§6:
                                                //   nothing spins on its own when the page opens)
       key: 'sun-3d',                           // the page's name, for remembering its tier this session
       onTier: (tier) => {},                    // the page rebuilds what the tier changes (its materials)
       picks: () => [meshes],                   // what a tap can pick
       onPick: (hit, view) => {},               // a tap's hit, or null for empty ground
       words: element,                          // where Reset view and Let it move go
       gesture: 'trackball',                    // or 'globe': the desk-globe turn (below); the trackball unless asked
       home: { lon: 20, lat: 15 },              // 'globe' only: the view when the page opens, and after Reset view
       onTurn: (view) => {},                    // 'globe' only: a finger, the inertia or Reset view turned the ball
       phone: 'still'                           // or 'run': a phone runs the page at the floor tier instead of a still
     });

   The standard's three tiers (§2): every page is made for the best machine, full, and steps itself down to
   middle and then floor by timing its own frames — never by asking what the device is. The rate a page must hold
   is 60 a second (§7), or the display's own refresh if that is lower (a 50 Hz screen can never show 60); the
   refresh is measured once, before the first frame, from empty animation frames, which run at the display's rate.
   For its first two seconds of drawing the page times its frames; if the average cannot hold the rate the view
   drops a tier and times two seconds again. Later, if the rate sags for five seconds running (a tablet warming
   up), it drops once more. It never climbs back during a visit, and the tier it settled on is remembered for the
   session (sessionStorage), so a reload starts there. Frames drawn while the page is hidden are not timed (a
   background tab draws none, and would otherwise read as the slowest machine there is), and a single stall —
   one frame of 60 ms or more, a shader compiling, a tab coming back — is left out of the average rather than
   counted against the machine; both were needed in the first test (26 Oct). A stretch where frames were drawn
   but nearly all were stalls is a machine that cannot hold the rate at all, and drops too; a stretch of fewer
   than ten frames says nothing. The pixel ratio is the one thing
   the shelf changes by tier (full: the device's, to 2; middle: 1.5; floor: 1); everything else is the page's, in
   onTier. For testing, ?tier=full|middle|floor forces one (and skips the timing), ?gl=1 forces the WebGL 2
   backend, and ?reduce=1 stands in for the reduced-motion setting.

   Open (27 Oct): timing frames cannot tell "60 with room to spare" from "60 barely"; the GPU's own cost of a
   frame (a readback, as the Sun bench's cwBench measures it) could pick a tier in one frame. Not added.

   The gestures (§4, ruled 26 Oct): one finger turns the ball the way you would turn a globe in your hand (with
   a little inertia); pinch zooms; two fingers move the view; tap picks; Reset view puts everything back. On a
   mouse: drag turns, wheel zooms, a drag with the right button or shift moves the view.

   The desk-globe turn (gesture: 'globe'; the Earth's, 27 Oct 2026, by Spec-Earth-3D and the deep-time ruling 3 of
   6 Oct): the ball turns like a globe on a stand. North is up at rest; a drag up or down tilts it, and the tilt
   stops when a pole faces her; a drag to the right moves the surface east whatever the tilt, because the spin is
   about the ball's own axis and the tilt about the camera's right. The view is a longitude and a latitude at the
   centre of the picture, as globe.js's: view.turnOf() reads it and view.turnTo(lon, lat) sets it (without onTurn,
   so a page can follow another view without a loop). The drag turns 180° across the stage's shorter side, as the 2D
   disc turns across its width (the trackball: 1.8 radians). The inertia is the trackball's, unchanged. The Sun keeps
   the trackball.

   Close in (the globe only; Spec-Earth-3D step 5, 28 Oct 2026). She looks straight down at the ground at every zoom:
   the camera stays on the line through the ball's centre. Zoom works on the height above the ground, not the distance
   from the centre, so a pinch close in is as gentle as far out; the wheel and the pinch hold the ground under the
   pointer, or between the two fingers, where it was (the view is turned to put it back, by the point's longitude and
   latitude read off the ball). Two fingers turn the ball under them rather than sliding the camera off the centre. The
   one-finger turn slows with the zoom: at the centre of the picture one pixel is height × 2 tan(fov / 2) / H radians of
   ground (H the stage's shorter side), and close in the turn is exactly that, the longitude divided by the cosine of the
   latitude, so the ground stays under the finger; far out it rises to the 180° across the stage it always had (reached
   at the home height, and never more), the cosine fading out on the way. view.setZoomLimits(min, max) sets the nearest
   and farthest distances (the page's deepest level by tier); the near and far planes follow the height each frame, so
   nothing is cut away at any zoom. view.lonLatAt(x, y) reads the longitude and latitude under a point of the stage (or
   null off the ball); view.onGesture(fn) hears 'start' when a finger, the wheel, the inertia or Reset view starts to
   move the view and 'end' when it has stopped, for a page whose labels hold still while the view moves.

   For the Earth's sixth bench (29 Oct 2026; Spec-Earth-3D *How she handles it* and *Close in, and flat*), five additions,
   each idle unless a page asks for it, so the Sun bench is as it was:
   - o.onTap(x, y): a tap (the same tap that picks) in stage pixels; when it answers true, nothing is picked.
   - view.glideTo(lon, lat, distance, ms): the globe eases to a longitude and latitude at the centre, the short way round,
     and to a distance from the centre (the height above the ground eased geometrically), as Reset view eases home; a
     gesture while it runs ends it, and the page hears 'start' and 'end' through onGesture.
   - view.hold: while true, the fingers, the wheel and the inertia move nothing (the flat world is still); a tap is still
     heard. view.drawWith(scene, camera) draws another scene through another camera in place of the ball (null: the ball
     again); view.stage() says which is in force, for a kept picture or a page's own drawing.
   - view.setFrame({ w, h }): the window is cropped. The picture keeps the scale it has at that size (the window's usual
     size) and the window shows the middle of it, however narrow, wide, short or tall it is made: the camera takes a view
     offset of the larger picture (three's setViewOffset), so the Earth stays centred and its size does not follow the
     window. null: the window is its usual size again. view.refSize() is the size the scale is set by.
   - o.onReset: called when Reset view is tapped (the page puts back what it changed, the window's size).

   Reduced motion (the system setting): the page opens still and the word "Let it move" starts it; "Hold still"
   stops it again. A phone (short side of the screen under 600 px) gets one frame at full tier and the words
   "This one needs a bigger screen"; it takes no gesture — unless the page passes phone: 'run' (the Earth, by
   Spec-Earth-3D: the one exception to the standard's phone rule), when the phone runs the page at the floor tier
   with every gesture and no message, and only a device that cannot draw 3D at all (cwScene throws) gets a still.

   Textures (the Earth audit, §9): view.maxTexture is the largest texture side the device allows (WebGPU's
   maxTextureDimension2D, WebGL 2's MAX_TEXTURE_SIZE), and view.fitTexture(px) halves a wanted size until the device
   allows it, so a tier's 8,192 picture steps down to 4,096 where 8,192 is refused instead of failing to load.

   Returns { renderer, scene, camera, ball, host, backend, tier, fps, refresh, target, moving, ground, setTier,
   onFrame, resetView, redraw, stop, maxTexture, fitTexture, turnTo, turnOf, lonLatAt, setZoomLimits, zoomLimits,
   onGesture, busy }. The page adds its objects to `ball` (what the finger turns) or to `scene`
   (what stays, like the glow). onFrame(fn) is called every animation frame with (dt, moving), drawn or not.
   cwRGB(hex) gives a CSS hex colour as [r, g, b] in 0..1, display values, for a shader that reads cw-style.js. */
import * as THREE from 'three';

const TIERS = ['full', 'middle', 'floor'];
const PIXEL = { full: 2, middle: 1.5, floor: 1 };
const TEST_MS = 2000;        // the first two seconds are timed (§2)
const SAG_S = 5;             // seconds running below the rate, and the view drops once more (§2)
const TEST_SLACK = 1.08;     // 60 a second under vsync measures 59-and-a-bit; this much over the frame's time is still holding it
const SAG_SLACK = 1.15;      // a sag is plainly below the rate, not a frame or two late
const STALL_MS = 60;         // one frame this long is a stall, not a slow machine (three refreshes of a 60 Hz screen,
                             // 50 ms, is a slow frame and counts; the iPad simulator sat there under a forced slowing)
const SOME = 10;             // frames drawn in a stretch before that stretch can say anything (a page throttled to a frame
                             // or two a second while still "visible" is not a slow machine)

/* the timing that picks the tier, kept apart from the loop so it can be checked with made-up frames (it is
   in the Node check under tools/, not a page): tell it each drawn frame — the time now, the gap since the last
   frame, and whether the page is visible — and it answers 'drop' when the view should drop a tier, else null.
   'test' for the first two seconds of drawing (again after a drop), then 'done', where the sag check runs. */
export function cwTierTimer({ target = 60, skip = false } = {}) {
  const frameMs = 1000 / target;
  let phase = skip ? 'done' : 'test';
  let testAt = null, testN = 0, testMs = 0, testAll = 0;             // the two-second test
  let sagAt = null, sagN = 0, sagMs = 0, sagAll = 0, sagRun = 0;     // the five-second sag check, one second at a time
  return {
    get phase() { return phase; }, get sag() { return sagRun; },
    dropped() { testAt = null; sagAt = null; sagRun = 0; },   // after a drop: time again from the next frame
    frame(now, raw, visible, atFloor) {
      if (!visible) { testAt = null; sagAt = null; sagRun = 0; return null; }   // hidden: nothing is timed
      if (phase === 'test') {
        if (testAt === null) { testAt = now; testN = 0; testMs = 0; testAll = 0; return null; }   // the first frame starts the clock and is not a gap
        testAll++;
        if (raw < STALL_MS) { testN++; testMs += raw; }                              // a stall is left out
        if (now - testAt >= TEST_MS && testN >= SOME) {
          if (testMs / testN > frameMs * TEST_SLACK && !atFloor) return 'drop';     // time again
          phase = 'done'; return null;
        }
        if (now - testAt >= TEST_MS * 2 && testAll >= SOME) {   // four seconds of frames, nearly all stalls: it cannot hold the rate at all
          if (!atFloor) return 'drop';
          phase = 'done';
        }
        return null;
      }
      if (sagAt === null) { sagAt = now; sagN = 0; sagMs = 0; sagAll = 0; return null; }
      sagAll++;
      if (raw < STALL_MS) { sagN++; sagMs += raw; }
      if (now - sagAt >= 1000) {
        // a sagging second: frames were drawn, and either nearly all were stalls or the clean ones ran slow
        if (sagAll >= SOME && (sagN < 5 || sagMs / sagN > frameMs * SAG_SLACK)) sagRun++; else sagRun = 0;
        sagAt = now; sagN = 0; sagMs = 0; sagAll = 0;
        if (sagRun >= SAG_S) { sagRun = 0; if (!atFloor) return 'drop'; }
      }
      return null;
    }
  };
}

export function cwRGB(hex) {
  const n = parseInt(String(hex).replace('#', ''), 16);
  return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
}

/* the display's refresh, from empty animation frames before the first drawn one; null if it cannot be told
   (a hidden tab gets no frames) */
function measureRefresh(ms = 350) {
  return new Promise(res => {
    const gaps = []; let prev = null, finished = false;
    const t0 = performance.now();
    const timer = setTimeout(done, ms + 500);
    function done() {
      if (finished) return; finished = true; clearTimeout(timer);
      if (gaps.length < 8) return res(null);
      gaps.sort((a, b) => a - b);
      const med = gaps[gaps.length >> 1];
      const hz = 1000 / med;
      const common = [30, 48, 50, 60, 72, 75, 90, 100, 120, 144, 165, 240].find(c => Math.abs(hz - c) / c < 0.04);   // 59-and-a-bit is a 60 Hz screen
      res(hz >= 24 && hz <= 360 ? (common || Math.round(hz)) : null);
    }
    function tick(now) {
      if (prev != null) gaps.push(now - prev); prev = now;
      if (now - t0 < ms && gaps.length < 60 && document.visibilityState === 'visible') requestAnimationFrame(tick); else done();
    }
    requestAnimationFrame(tick);
  });
}

export async function cwScene(host, o = {}) {
  const q = new URLSearchParams(location.search);
  const S = (window.CW && window.CW.STYLE) || null;
  const forcedTier = TIERS.includes(o.tier) ? o.tier : (TIERS.includes(q.get('tier')) ? q.get('tier') : null);
  const forceGL = !!o.forceWebGL || q.get('gl') === '1';
  const reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) || q.get('reduce') === '1';   // ?reduce=1 for testing
  const phone = Math.min(screen.width, screen.height) < 600;
  const phoneStill = phone && o.phone !== 'run';   // a phone shows a still, unless the page runs on phones at the floor
  const globe = o.gesture === 'globe';
  const DEG = Math.PI / 180;
  const key = 'cw3d-tier:' + (o.key || location.pathname);
  const cam = Object.assign({ fov: 32, position: [-1.7, 1.4, -3.7], near: 0.05, far: 100, min: 1.25, max: 9 }, o.camera || {});
  const ground = o.ground || (S ? S.black : '#0c0a08');
  const turn = o.turn || 0;

  const renderer = new THREE.WebGPURenderer({ antialias: true, forceWebGL: forceGL });
  const [, refresh] = await Promise.all([renderer.init(), measureRefresh()]);
  const target = Math.min(60, refresh || 60);   // the rate the page must hold: 60, or the display's own if lower
  const backend = renderer.backend.isWebGPUBackend ? 'WebGPU' : 'WebGL 2';
  renderer.setClearColor(new THREE.Color(ground), 1);
  const canvas = renderer.domElement;
  canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;user-select:none;-webkit-user-select:none;';
  host.insertBefore(canvas, host.firstChild);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(cam.fov, 1, cam.near, cam.far);
  camera.position.fromArray(cam.position);
  const target3 = new THREE.Vector3(0, 0, 0);
  camera.lookAt(target3);
  const ball = new THREE.Group();
  scene.add(ball);
  const home = { pos: camera.position.clone(), target: target3.clone(), quat: ball.quaternion.clone(),
                 lon: o.home && o.home.lon != null ? o.home.lon : 0, lat: o.home && o.home.lat != null ? o.home.lat : 0 };
  let gLon = home.lon, gLat = home.lat;   // the desk-globe turn's view: the longitude and latitude at the centre

  // ---------- the texture limit ----------
  let maxTexture = 4096;
  try {
    const b = renderer.backend;
    if (b.isWebGPUBackend) maxTexture = b.device.limits.maxTextureDimension2D;
    else if (b.gl) maxTexture = b.gl.getParameter(b.gl.MAX_TEXTURE_SIZE);
  } catch (e) { console.warn('scene.js: the texture limit could not be read; 4,096 assumed', e); }
  function fitTexture(px) { let p = px; while (p > maxTexture && p > 256) p = p >> 1; return p; }

  // ---------- tiers ----------
  let tier = forcedTier || (phoneStill ? 'full' : phone ? 'floor' : (sessionStorage.getItem(key) || 'full'));   // a phone that runs starts at the floor
  if (!TIERS.includes(tier)) tier = 'full';
  let switching = false;
  function applyPixelRatio() { renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, PIXEL[tier])); }
  async function setTier(t, opt = {}) {
    if (!TIERS.includes(t)) return;
    switching = true;
    tier = t; applyPixelRatio(); resize();
    if (!opt.quiet) { try { sessionStorage.setItem(key, tier); } catch (e) {} }
    if (o.onTier) await o.onTier(tier, view);
    needs = true; switching = false;
  }
  const dropTier = () => setTier(TIERS[Math.min(TIERS.length - 1, TIERS.indexOf(tier) + 1)]);

  // ---------- size ----------
  let frameRef = null;   // the cropped window's usual size ({ w, h }), whose scale the picture keeps; null when not cropped
  function resize() {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    if (frameRef) { camera.aspect = frameRef.w / frameRef.h; camera.setViewOffset(frameRef.w, frameRef.h, (frameRef.w - w) / 2, (frameRef.h - h) / 2, w, h); }
    else { camera.clearViewOffset(); camera.aspect = w / h; }
    camera.updateProjectionMatrix();
    needs = true;
  }
  const refSize = () => frameRef ? { w: frameRef.w, h: frameRef.h } : { w: host.clientWidth || 1, h: host.clientHeight || 1 };
  let drawScene = null, drawCamera = null, hold = false;   // view.drawWith and view.hold
  if (window.ResizeObserver) new ResizeObserver(resize).observe(host); else window.addEventListener('resize', resize);

  // ---------- the loop ----------
  let moving = !reduce && !phoneStill, needs = true, stopped = false, touched = false;   // touched: the idle turn, if any, ends at the first touch
  const frameFns = [];
  let last = performance.now(), fpsCount = 0, fpsAt = last, fps = 0;
  const timer = cwTierTimer({ target, skip: !!(forcedTier || phone) });   // the timing that picks the tier
  async function frame(now) {
    if (stopped) return;
    const raw = now - last;
    const dt = Math.min(0.05, raw / 1000); last = now;
    // inertia and the idle turn
    if (hold) { vel.x = vel.y = 0; }
    if (ptrs.size === 0) {
      if (Math.abs(vel.x) > 1e-4 || Math.abs(vel.y) > 1e-4) { turnBy(vel.x * dt, vel.y * dt); vel.x *= Math.pow(0.08, dt); vel.y *= Math.pow(0.08, dt); needs = true; }
      else if (turn && moving && !touched) { ball.rotateOnWorldAxis(UP, turn * dt); needs = true; }
    }
    if (ease) { ease(now); needs = true; }
    if (globe) fitPlanes();
    const isBusy = ptrs.size > 0 || Math.abs(vel.x) > 1e-4 || Math.abs(vel.y) > 1e-4 || !!ease || now < wheelUntil;
    if (isBusy !== busy) { busy = isBusy; gestureFns.forEach(fn => fn(busy ? 'start' : 'end')); }
    frameFns.forEach(fn => fn(dt, moving));
    if (moving || needs) {
      renderer.render(drawScene || scene, drawCamera || camera);
      needs = false;
      fpsCount++;
      if (now - fpsAt >= 500) { fps = Math.round(fpsCount * 1000 / (now - fpsAt)); fpsCount = 0; fpsAt = now; }
      if (moving && !switching && !stopped) {
        if (timer.frame(now, raw, document.visibilityState === 'visible', tier === 'floor') === 'drop') { await dropTier(); timer.dropped(); }
      }
    }
  }

  // ---------- gestures ----------
  const UP = new THREE.Vector3(0, 1, 0);
  const ptrs = new Map();
  const vel = { x: 0, y: 0 };
  let pinch = null, ease = null, wheelUntil = 0, busy = false;
  const gestureFns = [];
  const tmpQ = new THREE.Quaternion(), tmpV = new THREE.Vector3();
  // the trackball turns 1.8 radians across the stage's shorter side; the desk globe turns 180° across it, as globe.js's disc
  // does across its width (Michael, 27 Oct: match the 2D for now, to be judged by finger on the iPad)
  // the globe close in: the ground's own radians a pixel at the centre, rising to the 180° across far out (see the header)
  const homeAlt = Math.max(0.5, home.pos.length() - 1);
  function radPerPx() {
    const rs = refSize(), H = Math.min(rs.w, rs.h);
    if (!globe) return 1.8 / H;
    const alt = camera.position.length() - 1, ground = alt * 2 * Math.tan(cam.fov * DEG / 2) / H, far = Math.PI / H;
    const r = far / (homeAlt * 2 * Math.tan(cam.fov * DEG / 2) / H), s = THREE.MathUtils.clamp((alt - 1) / Math.max(0.01, homeAlt - 1), 0, 1);
    return Math.min(far, ground * (1 + (r - 1) * s * s * (3 - 2 * s)));
  }
  function lonStretch() {   // close in a turn along the parallel is divided by its cosine, so the ground keeps up with the finger
    const alt = camera.position.length() - 1, s = THREE.MathUtils.clamp((alt - 1) / Math.max(0.01, homeAlt - 1), 0, 1);
    return 1 / THREE.MathUtils.lerp(Math.max(0.1, Math.cos(gLat * DEG)), 1, s * s * (3 - 2 * s));
  }
  const tmpQ2 = new THREE.Quaternion();
  function applyGlobe(tell) {   // the desk-globe turn: spin about the ball's own axis, then tilt about the camera's right
    tmpV.set(0, 1, 0).applyQuaternion(camera.quaternion);
    tmpQ2.setFromAxisAngle(tmpV, -gLon * DEG);
    tmpV.set(1, 0, 0).applyQuaternion(camera.quaternion);
    tmpQ.setFromAxisAngle(tmpV, gLat * DEG);
    ball.quaternion.copy(tmpQ).multiply(tmpQ2);
    needs = true;
    if (tell && o.onTurn) o.onTurn(view);
  }
  function turnBy(ax, ay) {   // ax, ay in radians: around the camera's up, then its right
    if (globe) {   // the same radians, as a change of the view's longitude and latitude; the tilt stops at the poles
      gLon -= ax / DEG * lonStretch(); gLat = THREE.MathUtils.clamp(gLat + ay / DEG, -90, 90);
      applyGlobe(true); return;
    }
    tmpV.set(1, 0, 0).applyQuaternion(camera.quaternion);
    ball.quaternion.premultiply(tmpQ.setFromAxisAngle(tmpV, ay));
    tmpV.set(0, 1, 0).applyQuaternion(camera.quaternion);
    ball.quaternion.premultiply(tmpQ.setFromAxisAngle(tmpV, ax));
  }
  function wrapLon(l) { l = ((l + 180) % 360 + 360) % 360 - 180; return l === -180 ? 180 : l; }
  function zoomBy(f) {
    const dir = camera.position.clone().sub(target3);
    const d = globe ? 1 + THREE.MathUtils.clamp((dir.length() - 1) * f, cam.min - 1, cam.max - 1)   // the globe: the height above the ground
                    : THREE.MathUtils.clamp(dir.length() * f, cam.min, cam.max);
    camera.position.copy(target3).add(dir.normalize().multiplyScalar(d));
    camera.updateMatrixWorld();
    needs = true;
  }
  // the globe: the longitude and latitude under a point of the page (client pixels), or null off the ball
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), invQ = new THREE.Quaternion();
  function lonLatAt(cx, cy) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    camera.updateMatrixWorld(); ray.setFromCamera(ndc, camera);
    const o = ray.ray.origin, d = ray.ray.direction, b = o.dot(d), c = o.lengthSq() - 1, disc = b * b - c;
    if (disc < 0) return null;
    const p = o.clone().addScaledVector(d, -b - Math.sqrt(disc)).applyQuaternion(invQ.copy(ball.quaternion).invert());
    return { lon: Math.atan2(p.x, p.z) / DEG, lat: Math.asin(THREE.MathUtils.clamp(p.y, -1, 1)) / DEG };
  }
  // the globe: turn the view so that the ground at `at` (a longitude and latitude) lies under the client point (cx, cy);
  // three passes of a small correction, exact enough close in and harmless far out
  function holdAt(at, cx, cy) {
    if (!at) return;
    for (let i = 0; i < 3; i++) {
      const now = lonLatAt(cx, cy); if (!now) return;
      gLon += wrapLon(at.lon - now.lon); gLat = THREE.MathUtils.clamp(gLat + (at.lat - now.lat), -90, 90);
      applyGlobe(false);
    }
    if (o.onTurn) o.onTurn(view);
  }
  function zoomAt(f, cx, cy) {   // the globe zooms holding the ground under the pointer; the trackball about the centre
    const at = globe && cx != null ? lonLatAt(cx, cy) : null;
    zoomBy(f);
    if (at) holdAt(at, cx, cy);
  }
  let planesD = -1;
  function fitPlanes() {   // the near and far planes by the height: the ground never cut, the depth kept fine
    const D = camera.position.length(); if (Math.abs(D - planesD) < 1e-9) return;
    planesD = D; camera.near = Math.max(1e-4, (D - 1) * 0.5); camera.far = D + 1.2; camera.updateProjectionMatrix();
  }
  function panBy(dx, dy) {   // screen pixels → the view moves with the fingers
    const dist = camera.position.distanceTo(target3);
    const s = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) / (host.clientHeight || 1);
    const right = tmpV.set(1, 0, 0).applyQuaternion(camera.quaternion).multiplyScalar(-dx * s);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion).multiplyScalar(dy * s);
    camera.position.add(right).add(up); target3.add(right).add(up);
    needs = true;
  }
  function pick(x, y) {
    if (!o.picks || !o.onPick) return;
    const r = canvas.getBoundingClientRect();
    const nd = new THREE.Vector2(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(nd, camera);
    const hits = ray.intersectObjects(o.picks().filter(m => m.visible), false);
    o.onPick(hits.length ? hits[0] : null, view);
    needs = true;
  }
  if (!phoneStill) {
    canvas.addEventListener('pointerdown', e => {
      if (e.button !== 0 && e.button !== 2) return;
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}   // a synthetic pointer has nothing to capture
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t0: performance.now(), t: performance.now(), button: e.button, shift: e.shiftKey, moved: 0 });
      vel.x = vel.y = 0; ease = null; touched = true;
      if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 }; }
      if (o.onTouch) o.onTouch();
    });
    canvas.addEventListener('pointermove', e => {
      const p = ptrs.get(e.pointerId); if (!p) return;
      const now = performance.now(), dx = e.clientX - p.x, dy = e.clientY - p.y, dt = Math.max(1, now - p.t) / 1000;
      p.moved += Math.abs(dx) + Math.abs(dy);
      p.x = e.clientX; p.y = e.clientY; p.t = now;
      if (hold) return;   // the flat world: nothing moves, a tap is still heard
      if (ptrs.size === 1) {
        if ((p.button === 2 || p.shift) && !globe) panBy(dx, dy);   // the globe never slides off its centre: she looks straight down
        else { const k = radPerPx(); turnBy(dx * k, dy * k); vel.x = dx * k / dt; vel.y = dy * k / dt; }
        needs = true;
      } else if (ptrs.size === 2 && pinch) {
        const [a, b] = [...ptrs.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        if (globe) {   // the ground between the fingers goes where they go, then the pinch zooms holding it there
          holdAt(lonLatAt(pinch.mx, pinch.my), mx, my);
          if (d > 0 && pinch.d > 0) zoomAt(pinch.d / d, mx, my);
        } else {
          if (d > 0 && pinch.d > 0) zoomBy(pinch.d / d);
          panBy(mx - pinch.mx, my - pinch.my);
        }
        pinch = { d, mx, my };
      }
    });
    const end = e => {
      const p = ptrs.get(e.pointerId); if (!p) return;
      ptrs.delete(e.pointerId); pinch = null;
      const now = performance.now();
      if (ptrs.size === 0) {
        if (p.moved < 8 && now - p.t0 < 350 && p.button === 0) {
          vel.x = vel.y = 0;
          const r = canvas.getBoundingClientRect();
          if (!(o.onTap && o.onTap(e.clientX - r.left, e.clientY - r.top, view))) pick(e.clientX, e.clientY);
        }
        else if (now - p.t > 80) vel.x = vel.y = 0;   // held still before letting go: no inertia
      } else vel.x = vel.y = 0;
    };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    canvas.addEventListener('wheel', e => { if (hold) return; e.preventDefault(); wheelUntil = performance.now() + 160; vel.x = vel.y = 0; zoomAt(Math.exp(THREE.MathUtils.clamp(e.deltaY, -60, 60) * 0.0025), e.clientX, e.clientY); if (o.onTouch) o.onTouch(); }, { passive: false });
  }

  function resetView() {
    touched = false;   // an idle turn, if the page asked for one, comes back with the home view
    const from = { pos: camera.position.clone(), target: target3.clone(), quat: ball.quaternion.clone() }, t0 = performance.now();
    vel.x = vel.y = 0;
    const fromLon = gLon, fromLat = gLat, dLon = wrapLon(home.lon - gLon);   // the globe eases home the short way round
    ease = now => {
      const u = Math.min(1, (now - t0) / 500), s = u * u * (3 - 2 * u);
      camera.position.lerpVectors(from.pos, home.pos, s); target3.lerpVectors(from.target, home.target, s);
      if (globe) { gLon = fromLon + dLon * s; gLat = fromLat + (home.lat - fromLat) * s; applyGlobe(true); }
      else ball.quaternion.slerpQuaternions(from.quat, home.quat, s);
      if (u >= 1) ease = null;
    };
    if (o.onReset) o.onReset(view);
  }
  // the globe eases to a place at the centre and a distance (view.glideTo; see the header)
  function glideTo(lon, lat, dist, ms = 600) {
    if (!globe) return;
    const t0 = performance.now(), fromLon = gLon, fromLat = gLat, dLon = wrapLon(lon - gLon);
    const fromH = camera.position.distanceTo(target3) - 1, toH = THREE.MathUtils.clamp(dist != null ? dist : fromH + 1, cam.min, cam.max) - 1;
    vel.x = vel.y = 0;
    ease = now => {
      const u = Math.min(1, (now - t0) / Math.max(1, ms)), s = u * u * (3 - 2 * u);
      gLon = fromLon + dLon * s; gLat = THREE.MathUtils.clamp(fromLat + (lat - fromLat) * s, -90, 90);
      const d = 1 + fromH * Math.pow(toH / fromH, s), dir = camera.position.clone().sub(target3).normalize();
      camera.position.copy(target3).addScaledVector(dir, d); camera.updateMatrixWorld();
      applyGlobe(true);
      if (u >= 1) ease = null;
    };
    needs = true;
  }

  // ---------- the words ----------
  const wordsHost = o.words || null;
  function word(text, onTap) {
    if (!wordsHost) return null;
    const b = document.createElement('button'); b.type = 'button'; b.className = 'word'; b.textContent = text;
    b.addEventListener('click', onTap); wordsHost.appendChild(b); return b;
  }
  if (!phoneStill) word('Reset view', resetView);   // a phone's still has no view to reset
  let moveWord = null;
  if (reduce && !phoneStill) {
    moveWord = word('Let it move', () => { moving = !moving; moveWord.textContent = moving ? 'Hold still' : 'Let it move'; needs = true; });
  }
  if (phoneStill) {
    const m = document.createElement('p');
    m.className = 'cw3d-bigger';
    m.textContent = 'This one needs a bigger screen';
    m.style.cssText = 'position:absolute;left:0;right:0;bottom:12px;margin:0;text-align:center;font:italic 15px ' + (S ? S.font : 'Georgia,serif') + ';color:' + (S ? S.parchmentDeep : '#ece6d6') + ';pointer-events:none;';
    host.appendChild(m);
  }

  const view = {
    renderer, scene, camera, ball, host, backend, ground, refresh, target,
    get tier() { return tier; }, get fps() { return fps; }, get moving() { return moving; },
    set moving(v) { moving = !!v; needs = true; },
    get timing() { return timer.phase; }, get sag() { return timer.sag; },
    reduce, phone, setTier, resetView, maxTexture, fitTexture,
    turnTo: (lon, lat) => { if (!globe) return; if (lon != null) gLon = lon; if (lat != null) gLat = THREE.MathUtils.clamp(lat, -90, 90); applyGlobe(false); },
    turnOf: () => globe ? { lon: wrapLon(gLon), lat: gLat } : null,
    lonLatAt: (x, y) => { const r = canvas.getBoundingClientRect(); return lonLatAt(r.left + x, r.top + y); },   // stage pixels
    setZoomLimits: (min, max) => { if (min != null) cam.min = min; if (max != null) cam.max = max; zoomBy(1); },
    zoomLimits: () => ({ min: cam.min, max: cam.max }),
    zoomTo: d => { const dir = camera.position.clone().sub(target3).normalize(); camera.position.copy(target3).addScaledVector(dir, THREE.MathUtils.clamp(d, cam.min, cam.max)); camera.updateMatrixWorld(); needs = true; },   // the camera's distance from the centre, for a page's checks
    onGesture: fn => gestureFns.push(fn),
    glideTo,
    get hold() { return hold; }, set hold(v) { hold = !!v; if (hold) { vel.x = vel.y = 0; ease = null; } needs = true; },
    drawWith: (s, c) => { drawScene = s || null; drawCamera = s ? c : null; needs = true; },
    stage: () => ({ scene: drawScene || scene, camera: drawCamera || camera }),
    setFrame: f => { frameRef = f && f.w > 0 && f.h > 0 ? { w: f.w, h: f.h } : null; resize(); },
    refSize,
    get busy() { return busy; },
    onFrame: fn => frameFns.push(fn),
    redraw: () => { needs = true; },
    stop: () => { stopped = true; renderer.setAnimationLoop(null); }
  };
  applyPixelRatio(); resize();
  if (globe) { applyGlobe(false); home.quat.copy(ball.quaternion); }
  if (o.onTier) await o.onTier(tier, view);
  renderer.setAnimationLoop(frame);
  return view;
}
