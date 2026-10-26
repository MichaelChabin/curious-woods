/* still.js — the kept picture (Standard-Interactives; 26 Oct 2026).
   One frame drawn off-screen at full tier, 4,096 px on the long side whatever the live view runs at, with the
   honest notes and the credit written under it in Georgia, handed back as a PNG blob. The page asks for it from a
   word ("Keep this picture") and offers it as a file.
     cwStill(view, { long, notes, credit, title })
       view    what cwScene returned
       long    the long side in pixels (default 4096)
       notes   the lines from honest.js (view.honest.lines()); credit a line
   How: the view is put at full tier for one frame (the page's onTier rebuilds its materials), drawn into a render
   target the size of the picture, read back, put into a 2D canvas with the words drawn under it, and the live
   tier restored. The readback comes top-down from WebGPU and bottom-up from WebGL 2, so the rows are flipped on
   the WebGL side. Returns a Promise of a Blob (image/png). */
import * as THREE from 'three';

export async function cwStill(view, { long = 4096, notes = [], credit = '', title = '' } = {}) {
  const { renderer, scene, camera, host } = view;
  const aspect = host.clientWidth / Math.max(1, host.clientHeight);
  const w = aspect >= 1 ? long : Math.round(long * aspect);
  const h = aspect >= 1 ? Math.round(long / aspect) : long;

  const liveTier = view.tier;
  if (liveTier !== 'full') await view.setTier('full', { quiet: true });

  const rt = new THREE.RenderTarget(w, h, { type: THREE.UnsignedByteType, colorSpace: THREE.SRGBColorSpace, depthBuffer: true });
  const oldAspect = camera.aspect;
  camera.aspect = w / h; camera.updateProjectionMatrix();
  renderer.setRenderTarget(rt);
  renderer.render(scene, camera);
  const px = await renderer.readRenderTargetPixelsAsync(rt, 0, 0, w, h);   // waits for the card to finish
  renderer.setRenderTarget(null);
  camera.aspect = oldAspect; camera.updateProjectionMatrix();
  rt.dispose();
  if (liveTier !== 'full') await view.setTier(liveTier, { quiet: true });

  const flip = !!(renderer.backend && renderer.backend.isWebGLBackend);
  const S = (window.CW && window.CW.STYLE) || null;
  const font = S ? S.font : 'Georgia, serif';
  const fs = Math.round(w / 90);                 // the notes' size: about 45 px on a 4,096 px picture
  const line = Math.round(fs * 1.45), pad = fs * 1.2;
  const words = [];
  if (title) words.push({ t: title, c: S ? S.parchment : '#f4f1e8', s: fs * 1.2 });
  notes.forEach(n => words.push({ t: n, c: S ? S.parchmentDeep : '#ece6d6', s: fs }));
  if (credit) words.push({ t: credit, c: S ? S.grey : '#9a958b', s: fs * 0.9 });
  const ground = view.ground;

  const cv = document.createElement('canvas');
  const wrapped = [];
  const ctx0 = cv.getContext('2d');
  cv.width = w; cv.height = 10;
  words.forEach(wd => { ctx0.font = `${wd.s}px ${font}`; wrap(ctx0, wd.t, w - pad * 2).forEach(l => wrapped.push({ t: l, c: wd.c, s: wd.s })); });
  const textH = wrapped.length ? wrapped.reduce((a, l) => a + l.s * 1.45, 0) + pad * 2 : 0;
  cv.width = w; cv.height = h + Math.round(textH);
  const ctx = cv.getContext('2d');
  ctx.fillStyle = ground; ctx.fillRect(0, 0, cv.width, cv.height);

  const img = ctx.createImageData(w, h);
  const src = new Uint8ClampedArray(px.buffer, px.byteOffset, w * h * 4);
  if (flip) { for (let y = 0; y < h; y++) img.data.set(src.subarray((h - 1 - y) * w * 4, (h - y) * w * 4), y * w * 4); }
  else img.data.set(src);
  for (let i = 3; i < img.data.length; i += 4) img.data[i] = 255;   // the picture is opaque
  ctx.putImageData(img, 0, 0);

  let y = h + pad + fs;
  ctx.textBaseline = 'alphabetic';
  wrapped.forEach(l => { ctx.font = `${l.s}px ${font}`; ctx.fillStyle = l.c; ctx.fillText(l.t, pad, y); y += l.s * 1.45; });

  return new Promise(res => cv.toBlob(res, 'image/png'));
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
