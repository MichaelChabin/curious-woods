/* still.js — the kept picture (Standard-Interactives §8; 26 Oct 2026; brought to the standard 27 Oct).
   One frame drawn off-screen at full tier, 4,096 px on the long side whatever the live view runs at, with the
   scale notes drawn on the picture where they sit on screen, a one-line caption and the small credit at the
   bottom, handed back as a PNG blob. The page asks for it from a word ("Keep this picture") and offers it as a file.
     cwStill(view, { long, honest, caption, credit })
       view     what cwScene returned
       long     the long side in pixels (default 4096)
       honest   what cwHonest returned; its notes are drawn on the picture (none if absent)
       caption  one line, under the picture
       credit   one line, small, at the bottom (default: the honest notes' credit)
   How: the view is put at full tier for one frame (the page's onTier rebuilds its materials), drawn into a render
   target the size of the picture, read back, put into a 2D canvas with the notes drawn over it and the words
   under it, and the live tier restored. The readback comes top-down from WebGPU and bottom-up from WebGL 2, so the
   rows are flipped on the WebGL side. Open (27 Oct): on WebGL 2 the readback waits on requestAnimationFrame, so
   a still cannot be made while the page is hidden on that backend. Returns a Promise of a Blob (image/png). */
import * as THREE from 'three';

export async function cwStill(view, { long = 4096, honest = null, caption = '', credit = '' } = {}) {
  const { renderer, scene, camera, host } = view;
  const hostW = Math.max(1, host.clientWidth), hostH = Math.max(1, host.clientHeight);
  const aspect = hostW / hostH;
  const w = aspect >= 1 ? long : Math.round(long * aspect);
  const h = aspect >= 1 ? Math.round(long / aspect) : long;
  const scale = w / hostW;   // picture pixels per screen pixel

  const liveTier = view.tier;
  if (liveTier !== 'full') await view.setTier('full', { quiet: true });

  const rt = new THREE.RenderTarget(w, h, { type: THREE.UnsignedByteType, colorSpace: THREE.SRGBColorSpace, depthBuffer: true });
  const oldAspect = camera.aspect;
  camera.aspect = w / h; camera.updateProjectionMatrix();
  renderer.setRenderTarget(rt);
  renderer.render(scene, camera);
  const px = await renderer.readRenderTargetPixelsAsync(rt, 0, 0, w, h);   // waits for the card to finish
  renderer.setRenderTarget(null);

  const flip = !!(renderer.backend && renderer.backend.isWebGLBackend);
  const S = (window.CW && window.CW.STYLE) || null;
  const font = S ? S.font : 'Georgia, serif';
  const fsCaption = Math.round((S ? S.size.label : 15) * scale * 1.1);
  const fsCredit = Math.round((S ? S.size.minor : 13) * scale * 0.9);
  const pad = Math.round(fsCaption * 0.9);
  if (!credit && honest) credit = honest.credit || '';
  const bandH = (caption || credit) ? pad + (caption ? fsCaption * 1.4 : 0) + (credit ? fsCredit * 1.5 : 0) + pad : 0;
  const ground = view.ground;

  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h + Math.round(bandH);
  const ctx = cv.getContext('2d');
  ctx.fillStyle = ground; ctx.fillRect(0, 0, cv.width, cv.height);

  const img = ctx.createImageData(w, h);
  const src = new Uint8ClampedArray(px.buffer, px.byteOffset, w * h * 4);
  if (flip) { for (let y = 0; y < h; y++) img.data.set(src.subarray((h - 1 - y) * w * 4, (h - y) * w * 4), y * w * 4); }
  else img.data.set(src);
  for (let i = 3; i < img.data.length; i += 4) img.data[i] = 255;   // the picture is opaque
  ctx.putImageData(img, 0, 0);

  // the scale notes, where they sit on screen (the camera still has the picture's aspect, which is the stage's)
  if (honest) honest.draw(ctx, w, h, scale);

  camera.aspect = oldAspect; camera.updateProjectionMatrix();
  rt.dispose();
  if (liveTier !== 'full') await view.setTier(liveTier, { quiet: true });

  // the caption and the credit, under the picture
  let y = h + pad;
  ctx.textBaseline = 'top'; ctx.textAlign = 'left';
  if (caption) { ctx.font = `${fsCaption}px ${font}`; ctx.fillStyle = S ? S.parchment : '#f4f1e8'; ctx.fillText(caption, pad, y); y += fsCaption * 1.4; }
  if (credit) { ctx.font = `${fsCredit}px ${font}`; ctx.fillStyle = S ? S.grey : '#9a958b'; ctx.fillText(credit, pad, y); }

  return new Promise(res => cv.toBlob(res, 'image/png'));
}
