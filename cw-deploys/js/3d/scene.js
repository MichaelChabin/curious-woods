/* scene.js — the renderer, the camera, the tiers and the gestures of every 3D page
   (Standard-Interactives, the shared 3D shelf; 26 Oct 2026). One call stands a page up:

     const view = await cwScene(host, {
       ground: '#140f0b',                       // the stage's colour; the renderer clears to it
       camera: { fov: 32, position: [-1.7, 1.4, -3.7], near: 0.05, far: 100, min: 1.25, max: 9 },
       turn: 0.06,                              // an idle turn, radians a second, until the first touch; 0 for none
       key: 'sun-3d',                           // the page's name, for remembering its tier this session
       onTier: (tier) => {},                    // the page rebuilds what the tier changes (its materials)
       picks: () => [meshes],                   // what a tap can pick
       onPick: (hit, view) => {},               // a tap's hit, or null for empty ground
       words: element                           // where Reset view and Let it move go
     });

   The standard's three tiers (§2): every page is made for the best machine, full, and steps itself down to
   middle and then floor by timing its own frames — never by asking what the device is. After a second and a
   half to settle, the frames of the next two seconds are timed; if they average slower than 48 a second the
   view drops a tier and times again; it never climbs back within a session, and the tier it settled on is
   remembered for the session (sessionStorage) so a reload starts there. Frames drawn while the page is hidden,
   and single stalls of 50 ms or more, are not slow frames: the settling starts over, because a background tab
   draws no frames at all and would otherwise read as the slowest machine there is. The pixel ratio is the one thing the
   shelf changes by tier (full: the device's, to 2; middle: 1.5; floor: 1); everything else is the page's, in
   onTier. For testing, ?tier=full|middle|floor forces one, ?gl=1 forces the WebGL 2 backend, and ?reduce=1 stands in
   for the reduced-motion setting.

   The gestures (§4, ruled 26 Oct): one finger turns the ball the way you would turn a globe in your hand (with
   a little inertia); pinch zooms; two fingers move the view; tap picks; Reset view puts everything back. On a
   mouse: drag turns, wheel zooms, a drag with the right button or shift moves the view.

   Reduced motion (the system setting): the page opens still and the word "Let it move" starts it; "Hold still"
   stops it again. A phone (short side of the screen under 600 px) gets one frame at full tier and the words
   "This one needs a bigger screen"; it takes no gesture.

   Returns { renderer, scene, camera, ball, host, backend, tier, fps, moving, ground, setTier, onFrame,
   resetView, redraw, stop }. The page adds its objects to `ball` (what the finger turns) or to `scene` (what
   stays, like the glow). onFrame(fn) is called every drawn frame with (dt, moving). */
import * as THREE from 'three';

const TIERS = ['full', 'middle', 'floor'];
const PIXEL = { full: 2, middle: 1.5, floor: 1 };
const SLOW_MS = 1000 / 48;          // slower than this on average, and the view drops a tier
const SETTLE_MS = 1500, SAMPLE_MS = 2000;

export async function cwScene(host, o = {}) {
  const q = new URLSearchParams(location.search);
  const forcedTier = TIERS.includes(o.tier) ? o.tier : (TIERS.includes(q.get('tier')) ? q.get('tier') : null);
  const forceGL = !!o.forceWebGL || q.get('gl') === '1';
  const reduce = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) || q.get('reduce') === '1';   // ?reduce=1 for testing
  const phone = Math.min(screen.width, screen.height) < 600;
  const key = 'cw3d-tier:' + (o.key || location.pathname);
  const cam = Object.assign({ fov: 32, position: [-1.7, 1.4, -3.7], near: 0.05, far: 100, min: 1.25, max: 9 }, o.camera || {});
  const ground = o.ground || '#140f0b';

  const renderer = new THREE.WebGPURenderer({ antialias: true, forceWebGL: forceGL });
  await renderer.init();
  const backend = renderer.backend.isWebGPUBackend ? 'WebGPU' : 'WebGL 2';
  renderer.setClearColor(new THREE.Color(ground), 1);
  const canvas = renderer.domElement;
  canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;user-select:none;-webkit-user-select:none;';
  host.insertBefore(canvas, host.firstChild);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(cam.fov, 1, cam.near, cam.far);
  camera.position.fromArray(cam.position);
  const target = new THREE.Vector3(0, 0, 0);
  camera.lookAt(target);
  const ball = new THREE.Group();
  scene.add(ball);
  const home = { pos: camera.position.clone(), target: target.clone(), quat: ball.quaternion.clone() };

  // ---------- tiers ----------
  let tier = forcedTier || (phone ? 'full' : (sessionStorage.getItem(key) || 'full'));
  if (!TIERS.includes(tier)) tier = 'full';
  const listeners = [];
  function applyPixelRatio() { renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, PIXEL[tier])); }
  async function setTier(t, opt = {}) {
    if (!TIERS.includes(t)) return;
    tier = t; applyPixelRatio(); resize();
    if (!opt.quiet) { try { sessionStorage.setItem(key, tier); } catch (e) {} }
    if (o.onTier) await o.onTier(tier, view);
    needs = true;
  }

  // ---------- size ----------
  function resize() {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    needs = true;
  }
  if (window.ResizeObserver) new ResizeObserver(resize).observe(host); else window.addEventListener('resize', resize);

  // ---------- the loop ----------
  let moving = !reduce && !phone, needs = true, stopped = false, touched = false;   // touched: the idle turn ends at the first touch
  const frameFns = [];
  let last = performance.now(), fpsCount = 0, fpsAt = last, fps = 0;
  // the timing that picks the tier
  let phase = forcedTier || phone ? 'done' : 'settle', phaseAt = last, sampleN = 0, sampleMs = 0;
  async function frame(now) {
    if (stopped) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    // inertia and the idle turn
    if (ptrs.size === 0) {
      if (Math.abs(vel.x) > 1e-4 || Math.abs(vel.y) > 1e-4) { turnBy(vel.x * dt, vel.y * dt); vel.x *= Math.pow(0.08, dt); vel.y *= Math.pow(0.08, dt); needs = true; }
      else if (o.turn && moving && !touched) { ball.rotateOnWorldAxis(UP, o.turn * dt); needs = true; }
    }
    if (ease) { ease(now); needs = true; }
    frameFns.forEach(fn => fn(dt, moving));
    if (moving || needs) {
      renderer.render(scene, camera);
      needs = false;
      fpsCount++;
      if (now - fpsAt >= 500) { fps = Math.round(fpsCount * 1000 / (now - fpsAt)); fpsCount = 0; fpsAt = now; }
      if (phase !== 'done' && moving) {
        if (document.visibilityState !== 'visible' || dt >= 0.05) { phase = 'settle'; phaseAt = now; }   // hidden, or a stall: not a slow machine
        else if (phase === 'settle' && now - phaseAt > SETTLE_MS) { phase = 'sample'; phaseAt = now; sampleN = 0; sampleMs = 0; }
        else if (phase === 'sample') {
          sampleN++; sampleMs += dt * 1000;
          if (now - phaseAt > SAMPLE_MS) {
            const avg = sampleMs / sampleN;
            if (avg > SLOW_MS && tier !== 'floor') { await setTier(TIERS[TIERS.indexOf(tier) + 1]); phase = 'settle'; phaseAt = performance.now(); }
            else phase = 'done';
          }
        }
      }
    }
  }

  // ---------- gestures ----------
  const UP = new THREE.Vector3(0, 1, 0);
  const ptrs = new Map();
  const vel = { x: 0, y: 0 };
  let pinch = null, ease = null;
  const tmpQ = new THREE.Quaternion(), tmpV = new THREE.Vector3();
  function radPerPx() { return 1.8 / Math.min(host.clientWidth || 1, host.clientHeight || 1); }
  function turnBy(ax, ay) {   // ax, ay in radians: around the camera's up, then its right
    tmpV.set(1, 0, 0).applyQuaternion(camera.quaternion);
    ball.quaternion.premultiply(tmpQ.setFromAxisAngle(tmpV, ay));
    tmpV.set(0, 1, 0).applyQuaternion(camera.quaternion);
    ball.quaternion.premultiply(tmpQ.setFromAxisAngle(tmpV, ax));
  }
  function zoomBy(f) {
    const dir = camera.position.clone().sub(target);
    const d = THREE.MathUtils.clamp(dir.length() * f, cam.min, cam.max);
    camera.position.copy(target).add(dir.normalize().multiplyScalar(d));
    needs = true;
  }
  function panBy(dx, dy) {   // screen pixels → the view moves with the fingers
    const dist = camera.position.distanceTo(target);
    const s = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) / (host.clientHeight || 1);
    const right = tmpV.set(1, 0, 0).applyQuaternion(camera.quaternion).multiplyScalar(-dx * s);
    const up = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion).multiplyScalar(dy * s);
    camera.position.add(right).add(up); target.add(right).add(up);
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
  if (!phone) {
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
    touched = false;   // the idle turn comes back with the home view
    const from = { pos: camera.position.clone(), target: target.clone(), quat: ball.quaternion.clone() }, t0 = performance.now();
    vel.x = vel.y = 0;
    ease = now => {
      const u = Math.min(1, (now - t0) / 500), s = u * u * (3 - 2 * u);
      camera.position.lerpVectors(from.pos, home.pos, s); target.lerpVectors(from.target, home.target, s);
      ball.quaternion.slerpQuaternions(from.quat, home.quat, s);
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
  if (!phone) word('Reset view', resetView);   // a phone's still has no view to reset
  let moveWord = null;
  if (reduce && !phone) {
    moveWord = word('Let it move', () => { moving = !moving; moveWord.textContent = moving ? 'Hold still' : 'Let it move'; needs = true; });
  }
  if (phone) {
    const m = document.createElement('p');
    m.className = 'cw3d-bigger';
    m.textContent = 'This one needs a bigger screen';
    m.style.cssText = 'position:absolute;left:0;right:0;bottom:12px;margin:0;text-align:center;font:italic 15px Georgia,serif;color:#ece6dc;pointer-events:none;';
    host.appendChild(m);
  }

  const view = {
    renderer, scene, camera, ball, host, backend, ground,
    get tier() { return tier; }, get fps() { return fps; }, get moving() { return moving; },
    set moving(v) { moving = !!v; needs = true; },
    get timing() { return phase; },
    reduce, phone, setTier, resetView,
    onFrame: fn => frameFns.push(fn),
    redraw: () => { needs = true; },
    stop: () => { stopped = true; renderer.setAnimationLoop(null); }
  };
  applyPixelRatio(); resize();
  if (o.onTier) await o.onTier(tier, view);
  renderer.setAnimationLoop(frame);
  return view;
}
