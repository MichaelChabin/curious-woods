/* still.js — the kept picture (Standard-Interactives §8; 26 Oct 2026; brought to the standard 27 Oct).
   One frame drawn off-screen at full tier, 4,096 px on the long side whatever the live view runs at, with the
   scale notes drawn on the picture where they sit on screen, the honest block's lines (or a one-line caption) and
   the small credit at the bottom, handed back as a PNG blob. The page asks for it from a word ("Keep this picture")
   and offers it as a file.
     cwStill(view, { long, honest, caption, credit, note, date })
       view     what cwScene returned
       long     the long side in pixels (default 4096)
       honest   what cwHonest returned; its notes are drawn on the picture (none if absent), and its block's lines —
                what the picture is, and what it says with the word of knowing in italics — go under the picture,
                wrapped to its width (the Earth bench, 28 Oct 2026)
       caption  one line, under the picture, in place of the block's first line
       credit   one line, small, at the bottom (default: the block's credit, else the honest notes' credit)
       note     her own words, if she wrote any: the first line under the picture, in italics (30 Oct 2026)
       date     today's date, as words, before the credit on the last line (30 Oct 2026)
   How: the view is put at full tier for one frame (the page's onTier rebuilds its materials), drawn into a render
   target the size of the picture, read back, put into a 2D canvas with the notes drawn over it and the words
   under it, and the live tier restored. The readback comes top-down from WebGPU and bottom-up from WebGL 2, so the
   rows are flipped on the WebGL side. Open (27 Oct): on WebGL 2 the readback waits on requestAnimationFrame, so
   a still cannot be made while the page is hidden on that backend. Returns a Promise of a Blob (image/png).
   The Earth's sixth bench (29 Oct 2026): the picture is of whatever the view draws (view.stage(): the flat world while
   it is up), and a cropped window (view.setFrame) keeps its camera's view offset, so the picture takes the window's shape
   and shows what the window shows; the camera's aspect is set only when the window is not cropped.
   The 6b bench (30 Oct 2026): the work is in two halves, so a page can draw the picture once and compose its words
   again as a note is written: cwStillPicture(view, { long }) draws the frame and hands back { canvas, w, h, scale }
   (the picture alone, the notes on it); cwStillCompose(picture, { honest, caption, credit, note, date }) puts the
   band of words under it and returns the Blob. cwStill is the two in one. */
import * as THREE from 'three';

export async function cwStillPicture(view, { long = 4096, honest = null } = {}) {
  const { renderer, host } = view;
  const { scene, camera } = view.stage ? view.stage() : view;   // the flat world while it is up (the Earth's sixth bench)
  const cropped = !!(camera.view && camera.view.enabled) || !camera.isPerspectiveCamera;   // a cropped window's offset, or a camera framed by its page, is left as it is
  const hostW = Math.max(1, host.clientWidth), hostH = Math.max(1, host.clientHeight);
  const aspect = hostW / hostH;
  const w = aspect >= 1 ? long : Math.round(long * aspect);
  const h = aspect >= 1 ? Math.round(long / aspect) : long;
  const scale = w / hostW;   // picture pixels per screen pixel

  const liveTier = view.tier;
  if (liveTier !== 'full') await view.setTier('full', { quiet: true });

  const rt = new THREE.RenderTarget(w, h, { type: THREE.UnsignedByteType, colorSpace: THREE.SRGBColorSpace, depthBuffer: true });
  const oldAspect = camera.aspect;
  if (!cropped) { camera.aspect = w / h; camera.updateProjectionMatrix(); }
  renderer.setRenderTarget(rt);
  renderer.render(scene, camera);
  const px = await renderer.readRenderTargetPixelsAsync(rt, 0, 0, w, h);   // waits for the card to finish
  renderer.setRenderTarget(null);

  const flip = !!(renderer.backend && renderer.backend.isWebGLBackend);
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  const img = ctx.createImageData(w, h);
  // WebGPU hands every row but the last back padded to 256 bytes: a width that is not a multiple of 64 (a cropped
  // window's) has a longer stride than its pixels, so the rows are read by the stride (29 Oct 2026; the square stage
  // never met it, and a 4,096-wide picture has none)
  const stride = h > 1 ? Math.round((px.length - w * 4) / (h - 1)) : w * 4;
  const src = new Uint8ClampedArray(px.buffer, px.byteOffset, px.length);
  for (let y = 0; y < h; y++) { const sy = flip ? h - 1 - y : y; img.data.set(src.subarray(sy * stride, sy * stride + w * 4), y * w * 4); }
  for (let i = 3; i < img.data.length; i += 4) img.data[i] = 255;   // the picture is opaque
  ctx.putImageData(img, 0, 0);

  // the scale notes, where they sit on screen (the camera still has the picture's aspect, which is the stage's)
  if (honest) honest.draw(ctx, w, h, scale);

  if (!cropped) { camera.aspect = oldAspect; camera.updateProjectionMatrix(); }
  rt.dispose();
  if (liveTier !== 'full') await view.setTier(liveTier, { quiet: true });
  return { canvas: cv, w, h, scale, ground: view.ground };
}

export function cwStillCompose(picture, { honest = null, caption = '', credit = '', note = '', date = '' } = {}) {
  const { w, h, scale, ground } = picture;
  const S = (window.CW && window.CW.STYLE) || null;
  const font = S ? S.font : 'Georgia, serif';
  const fsCaption = Math.round((S ? S.size.label : 15) * scale * 1.1);
  const fsSays = Math.round((S ? S.size.minor : 13) * scale);
  const fsCredit = Math.round((S ? S.size.minor : 13) * scale * 0.9);
  const pad = Math.round(fsCaption * 0.9);
  const blk = honest && honest.block ? honest.block : null;
  if (!credit) credit = (blk && blk.credit) || (honest && honest.credit) || '';
  const what = caption || (blk && blk.what) || '';
  const says = blk && blk.says ? blk.says : null;
  note = (note || '').trim();
  const last = [date, credit].filter(Boolean).join(' · ');   // the date before the credit, one small line
  // the lines wrapped to the picture's width, measured first so the band under the picture is the right height
  const measure = document.createElement('canvas').getContext('2d');
  const wrap = (text, fnt, width) => { measure.font = fnt; const out = []; let cur = ''; text.split(' ').forEach(word => { const t = cur ? cur + ' ' + word : word; if (measure.measureText(t).width > width && cur) { out.push(cur); cur = word; } else cur = t; }); if (cur) out.push(cur); return out; };
  const noteLines = note ? note.split(/\r?\n/).flatMap(l => l.trim() ? wrap(l.trim(), `italic ${fsCaption}px ${font}`, w - 2 * pad) : ['']) : [];
  const whatLines = what ? wrap(what, `${fsCaption}px ${font}`, w - 2 * pad) : [];
  const saysText = says ? (says.word ? says.word + '  ' : '') + says.sentence : '';
  const saysLines = saysText ? wrap(saysText, `italic ${fsSays}px ${font}`, w - 2 * pad) : [];
  const creditLines = last ? wrap(last, `${fsCredit}px ${font}`, w - 2 * pad) : [];   // wrapped too, for a narrow window's picture (29 Oct)
  const bandH = (noteLines.length || whatLines.length || saysLines.length || last)
    ? pad + (noteLines.length ? noteLines.length * fsCaption * 1.4 + fsCaption * 0.3 : 0) + whatLines.length * fsCaption * 1.4 + (saysLines.length ? fsSays * 0.4 + saysLines.length * fsSays * 1.35 : 0) + (last ? fsCredit * 0.5 + creditLines.length * fsCredit * 1.3 : 0) + pad
    : 0;

  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h + Math.round(bandH);
  const ctx = cv.getContext('2d');
  ctx.fillStyle = ground; ctx.fillRect(0, 0, cv.width, cv.height);
  ctx.drawImage(picture.canvas, 0, 0);

  // the band: her note in italics, then what the picture is; what it says, the word of knowing in italics with the
  // rest; the date and the credit small
  let y = h + pad;
  ctx.textBaseline = 'top'; ctx.textAlign = 'left';
  const onDark = S ? (S.parchment || '#f4f1e8') : '#f4f1e8', onDarkSoft = S ? (S.parchmentDeep || '#ece6d6') : '#ece6d6';
  const dark = (() => { const n = parseInt(String(ground).replace('#', ''), 16); return (((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) < 128; })();   // the words in ink on parchment, in parchment on a dark ground
  const ink = dark ? onDark : (S ? S.ink : '#2a241c'), inkSoft = dark ? onDarkSoft : (S ? S.inkSoft : '#6b655a'), inkCredit = S ? S.grey : '#9a958b';
  if (noteLines.length) { ctx.font = `italic ${fsCaption}px ${font}`; ctx.fillStyle = ink; noteLines.forEach(l => { ctx.fillText(l, pad, y); y += fsCaption * 1.4; }); y += fsCaption * 0.3; }
  ctx.font = `${fsCaption}px ${font}`; ctx.fillStyle = ink;
  whatLines.forEach(l => { ctx.fillText(l, pad, y); y += fsCaption * 1.4; });
  if (saysLines.length) {
    y += fsSays * 0.4; ctx.fillStyle = inkSoft;
    saysLines.forEach((l, i) => {
      if (i === 0 && says.word) {   // the word in italics, the sentence upright after it
        ctx.font = `italic ${fsSays}px ${font}`; ctx.fillText(says.word, pad, y); const wW = ctx.measureText(says.word + '  ').width;
        ctx.font = `${fsSays}px ${font}`; ctx.fillText(l.slice(says.word.length).trimStart(), pad + wW, y);
      } else { ctx.font = `${fsSays}px ${font}`; ctx.fillText(l, pad, y); }
      y += fsSays * 1.35;
    });
  }
  if (last) { y += fsCredit * 0.5; ctx.font = `${fsCredit}px ${font}`; ctx.fillStyle = inkCredit; creditLines.forEach(l => { ctx.fillText(l, pad, y); y += fsCredit * 1.3; }); }

  return new Promise(res => cv.toBlob(res, 'image/png'));
}

export async function cwStill(view, opts = {}) {
  const picture = await cwStillPicture(view, { long: opts.long, honest: opts.honest });
  return cwStillCompose(picture, opts);
}
