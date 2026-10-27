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

   Reduced motion (the system setting): the page opens still and the word "Let it move" starts it; "Hold still"
   stops it again. A phone (short side of the screen under 600 px) gets one frame at full tier and the words
   "This one needs a bigger screen"; it takes no gesture — unless the page passes phone: 'run' (the Earth, by
   Spec-Earth-3D: the one exception to the standard's phone rule), when the phone runs the page at the floor tier
   with every gesture and no message, and only a device that cannot draw 3D at all (cwScene throws) gets a still.

   Textures (the Earth audit, §9): view.maxTexture is the largest texture side the device allows (WebGPU's
   maxTextureDimension2D, WebGL 2's MAX_TEXTURE_SIZE), and view.fitTexture(px) halves a wanted size until the device
   allows it, so a tier's 8,192 picture steps down to 4,096 where 8,192 is refused instead of failing to load.

   Returns { renderer, scene, camera, ball, host, backend, tier, fps, refresh, target, moving, ground, setTier,
   onFrame, resetView, redraw, stop, maxTexture, fitTexture, turnTo, turnOf }. The page adds its objects to `ball` (what the finger turns) or to `scene`
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
  function resize() {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    needs = true;
  }
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
    if (ptrs.size === 0) {
      if (Math.abs(vel.x) > 1e-4 || Math.abs(vel.y) > 1e-4) { turnBy(vel.x * dt, vel.y * dt); vel.x *= Math.pow(0.08, dt); vel.y *= Math.pow(0.08, dt); needs = true; }
      else if (turn && moving && !touched) { ball.rotateOnWorldAxis(UP, turn * dt); needs = true; }
    }
    if (ease) { ease(now); needs = true; }
    frameFns.forEach(fn => fn(dt, moving));
    if (moving || needs) {
      renderer.render(scene, camera);
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
  let pinch = null, ease = null;
  const tmpQ = new THREE.Quaternion(), tmpV = new THREE.Vector3();
  // the trackball turns 1.8 radians across the stage's shorter side; the desk globe turns 180° across it, as globe.js's disc
  // does across its width (Michael, 27 Oct: match the 2D for now, to be judged by finger on the iPad)
  function radPerPx() { return (globe ? Math.PI : 1.8) / Math.min(host.clientWidth || 1, host.clientHeight || 1); }
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
      gLon -= ax / DEG; gLat = THREE.MathUtils.clamp(gLat + ay / DEG, -90, 90);
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
    const d = THREE.MathUtils.clamp(dir.length() * f, cam.min, cam.max);
    camera.position.copy(target3).add(dir.normalize().multiplyScalar(d));
    needs = true;
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
      if (ptrs.size === 1) {
        if (p.button === 2 || p.shift) panBy(dx, dy);
        else { const k = radPerPx(); turnBy(dx * k, dy * k); vel.x = dx * k / dt; vel.y = dy * k / dt; }
        needs = true;
      } else if (ptrs.size === 2 && pinch) {
        const [a, b] = [...ptrs.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        if (d > 0 && pinch.d > 0) zoomBy(pinch.d / d);
        panBy(mx - pinch.mx, my - pinch.my);
        pinch = { d, mx, my };
      }
    });
    const end = e => {
      const p = ptrs.get(e.pointerId); if (!p) return;
      ptrs.delete(e.pointerId); pinch = null;
      const now = performance.now();
      if (ptrs.size === 0) {
        if (p.moved < 8 && now - p.t0 < 350 && p.button === 0) { vel.x = vel.y = 0; pick(e.clientX, e.clientY); }
        else if (now - p.t > 80) vel.x = vel.y = 0;   // held still before letting go: no inertia
      } else vel.x = vel.y = 0;
    };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    canvas.addEventListener('wheel', e => { e.preventDefault(); zoomBy(Math.exp(THREE.MathUtils.clamp(e.deltaY, -60, 60) * 0.0025)); if (o.onTouch) o.onTouch(); }, { passive: false });
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
