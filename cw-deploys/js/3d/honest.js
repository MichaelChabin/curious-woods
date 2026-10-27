/* honest.js — the scale notes, on the picture (Standard-Interactives §5; rebuilt 27 Oct 2026).
   Every 3D picture says where it departs from the truth, on the picture itself: a short italic note placed
   beside the stretched thing, with a thin drawn bracket so the eye finds it, re-placed as the ball turns and
   hidden while its point is on the far side. One to three notes; anything drawn to scale says nothing.
   Georgia and the colours from cw-style.js (loaded first as a classic script; plain defaults if it is not).

     const honest = cwHonest(view, { notes, credit, keep })
       notes   [{ text, at, normal, along, span, frame, show }]
         text    the note, short, one line, no brackets in the text: "granules: drawn about fifty times too big"
         at      [x, y, z], the point the note is about, in the ball's frame (frame: 'ball', the default; the note
                 turns with the ball) or the scene's ('scene')
         normal  [x, y, z], the way the surface faces there (default: outward from the ball's centre); the note
                 hides when it faces away from the camera
         along   [x, y, z], the direction the bracket runs (default: east–west on the ball, level with `at`)
         span    the bracket's length in world units, the width of what is stretched (default 0.3; the ball is 2 across)
         show    () => boolean, for a note that is true only sometimes (time runs fast only while it runs)
       credit  one line (who made the picture, from what), kept for the still
       keep    { top, bottom, left, right } in screen pixels: bands of the stage the notes stay out of (a page's
               own line along the bottom, say); default none

   The notes are drawn on a 2D canvas over the stage, redrawn when the view or the ball moves; the same drawing
   goes onto the kept picture (still.js) at the picture's size, so a note sits on the still where it sat on screen.
   Returns { draw(ctx, w, h, scale), notes, credit, setNotes(notes), remove() }.

   The marks of knowing (§5: measured, inferred, fitted, guessed, invented — the more we know, the more solid the
   picture: a photograph, then solid with crisp edges, then painted and washed) belong in this file too. Not
   built yet: the Sun shows nothing by grade, and the Earth will need them first (27 Oct 2026). */
import * as THREE from 'three';

const V = new THREE.Vector3(), N = new THREE.Vector3(), A = new THREE.Vector3(), E1 = new THREE.Vector3(), E2 = new THREE.Vector3(), C = new THREE.Vector3(), CAM = new THREE.Vector3();
const Q = new THREE.Quaternion();
const UPV = new THREE.Vector3(0, 1, 0);
const TIGHT = 150;   // screen pixels of margin a note wants beside the ball; with less, it slants out and may sit over the limb

export function cwHonest(view, { notes = [], credit = '', keep = {} } = {}) {
  const S = (window.CW && window.CW.STYLE) || null;
  if (!S) console.log('honest.js: cw-style.js is not loaded; plain defaults');
  const font = S ? S.font : 'Georgia, serif';
  const inkText = S ? S.parchmentDeep : '#ece6d6';     // on the dark ground of a space scene
  const inkLine = S ? S.grey : '#9a958b';
  const halo = S ? S.alpha(view.ground || S.black, 0.55) : 'rgba(12,10,8,0.55)';
  const size = S ? S.size.label : 15;
  const { camera, ball, host } = view;

  let list = notes.slice();

  /* where a note sits for a picture w × h drawn through the camera as it is now; null while hidden */
  function place(n, w, h, scale) {
    const inBall = n.frame !== 'scene';
    ball.updateMatrixWorld();
    camera.updateMatrixWorld();
    if (inBall) ball.getWorldQuaternion(Q); else Q.identity();
    // the point, its normal and the bracket's direction, in the world
    V.fromArray(n.at); if (inBall) V.applyMatrix4(ball.matrixWorld);
    N.fromArray(n.normal || n.at).normalize().applyQuaternion(Q);
    if (n.along) A.fromArray(n.along).normalize().applyQuaternion(Q);   // given in the note's frame
    else { A.crossVectors(N, UPV); if (A.lengthSq() < 1e-6) A.set(1, 0, 0); A.normalize(); }   // east–west, from the world normal
    // the far side: the surface there faces away from the camera
    camera.getWorldPosition(CAM);
    if (N.dot(CAM.clone().sub(V)) < 0.12 * CAM.distanceTo(V)) return null;
    const span = n.span == null ? 0.3 : n.span;
    E1.copy(V).addScaledVector(A, -span / 2); E2.copy(V).addScaledVector(A, span / 2);
    const toPx = (p) => { const q = p.clone().project(camera); if (q.z > 1) return null; return { x: (q.x + 1) / 2 * w, y: (1 - q.y) / 2 * h }; };
    const p = toPx(V), e1 = toPx(E1), e2 = toPx(E2);
    if (!p || !e1 || !e2) return null;
    // the ball's centre on the picture, and its radius there, so the label can clear the limb
    if (inBall) ball.getWorldPosition(C); else C.set(0, 0, 0);
    const c = toPx(C) || { x: w / 2, y: h / 2 };
    const dist = CAM.distanceTo(C);
    const rPx = (h / 2) / (dist * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));   // a unit radius, in pixels
    let ox = p.x - c.x, oy = p.y - c.y, od = Math.hypot(ox, oy);
    if (od < 1) { ox = 1; oy = 0; od = 1; }
    ox /= od; oy /= od;
    let lead = Math.max(36 * scale, rPx - od + 18 * scale);   // out past the limb
    // where the ball fills the stage sideways (a tablet held upright) there is little margin beside it: the leader
    // goes out at a slant, away from the ball's middle, and the words may sit over the limb, with a halo
    const sideRoom = ox >= 0 ? w - (p.x + ox * lead) : p.x + ox * lead;
    const tight = sideRoom < TIGHT * scale;
    if (tight) {
      const dy = p.y < c.y ? -1 : 1;
      ox = (ox >= 0 ? 1 : -1) / Math.SQRT2; oy = dy / Math.SQRT2;
      lead = 44 * scale;
    }
    return { p, e1, e2, out: { x: ox, y: oy }, lead, tight, label: { x: p.x + ox * lead, y: p.y + oy * lead } };
  }

  /* draw the notes onto a 2D context for a picture w × h; scale is pixels per screen pixel (1 on screen) */
  function draw(ctx, w, h, scale = 1) {
    const fs = size * scale;
    ctx.save();
    ctx.lineWidth = Math.max(1, 1 * scale);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.font = `italic ${fs}px ${font}`;
    ctx.textBaseline = 'middle';
    list.forEach(n => {
      if (n.show && !n.show()) return;
      const L = place(n, w, h, scale);
      if (!L) return;
      const { p, e1, e2, out, label, tight } = L;
      // the bracket: a thin line the width of the stretched thing, with a short tick at each end turned toward
      // the label, and a leader from its middle out to the words
      const tick = 5 * scale;
      ctx.strokeStyle = inkLine;
      ctx.beginPath();
      ctx.moveTo(e1.x + out.x * tick, e1.y + out.y * tick); ctx.lineTo(e1.x, e1.y);
      ctx.lineTo(e2.x, e2.y); ctx.lineTo(e2.x + out.x * tick, e2.y + out.y * tick);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(p.x + out.x * tick, p.y + out.y * tick); ctx.lineTo(label.x - out.x * 6 * scale, label.y - out.y * 6 * scale);
      ctx.stroke();
      // the words, on the side the leader points to; kept inside the picture, wrapped onto two or three lines
      // where the margin is narrow; a soft halo of the ground under them, for where they sit over the limb
      const pad = 4 * scale, right = out.x >= 0;
      const m = 8 * scale, mL = m + (keep.left || 0) * scale, mR = m + (keep.right || 0) * scale, mT = m + (keep.top || 0) * scale, mB = m + (keep.bottom || 0) * scale;
      ctx.textAlign = right ? 'left' : 'right';
      let x = label.x + (right ? pad : -pad);
      let room = Math.max(72 * scale, right ? w - mR - x : x - mL);
      if (tight) room = Math.max(room, TIGHT * scale);
      let lines = wrap(ctx, n.text, room);
      if (lines.length > 1) {   // balance the lines, so the break falls near the middle, not on the last word
        const total = ctx.measureText(n.text).width, want = total / lines.length * 1.1;
        const even = wrap(ctx, n.text, Math.min(room, want));
        if (even.length === lines.length) lines = even;
      }
      const widest = Math.max(...lines.map(l => ctx.measureText(l).width));
      if (right && x + widest > w - mR) x = w - mR - widest;
      else if (!right && x - widest < mL) x = mL + widest;
      const lh = fs * 1.25;
      let y = tight ? (out.y < 0 ? label.y - (lines.length - 1) * lh : label.y) : label.y - (lines.length - 1) * lh / 2;
      y = Math.min(Math.max(y, mT + fs / 2), h - mB - fs / 2 - (lines.length - 1) * lh);
      ctx.fillStyle = halo;
      lines.forEach((l, i) => { const lw = ctx.measureText(l).width; ctx.fillRect((right ? x : x - lw) - pad, y + i * lh - fs * 0.62, lw + pad * 2, fs * 1.24); });
      ctx.fillStyle = inkText;
      lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh));
    });
    ctx.restore();
  }
  function wrap(ctx, text, width) {
    const out = []; let cur = '';
    text.split(' ').forEach(word => {
      const t = cur ? cur + ' ' + word : word;
      if (ctx.measureText(t).width > width && cur) { out.push(cur); cur = word; } else cur = t;
    });
    if (cur) out.push(cur);
    return out;
  }

  // ---------- the overlay on the stage ----------
  const cv = document.createElement('canvas');
  cv.className = 'cw-honest';
  cv.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;';
  host.appendChild(cv);
  const ctx = cv.getContext('2d');
  let lastKey = '';
  function update() {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const key = [w, h, dpr, camera.matrixWorld.elements.join(','), camera.projectionMatrix.elements.join(','), ball.quaternion.x, ball.quaternion.y, ball.quaternion.z, ball.quaternion.w,
      list.map(n => n.show ? (n.show() ? 1 : 0) : 1).join('')].join('|');
    if (key === lastKey) return;
    lastKey = key;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    draw(ctx, w, h, 1);
  }
  view.onFrame(update);
  update();

  return {
    draw,
    get notes() { return list; },
    credit,
    setNotes(n) { list = n.slice(); lastKey = ''; update(); },
    remove() { cv.remove(); list = []; lastKey = ''; }
  };
}
