/* honest.js — the scale notes with their brackets (Standard-Interactives §5; 26 Oct 2026).
   Every 3D picture says where it departs from the truth, in a short block under the stage headed
   "Honest about the picture". Each note is one thing the picture does — the granules, the speed of time, the
   colours — followed by its bracket: the true size or rate set beside the drawn one, in square brackets, in the
   quieter ink, so a child can see the gap without being told to mind it. Georgia, colours from cw-style.js
   (loaded first as a classic script; a plain message and parchment defaults if it is not).
     cwHonest(host, { title, notes, credit })
       notes   [{ what, says, bracket }]  — what: the thing; says: what the picture does, read on from it as one sentence;
                                            bracket: the true measure against the drawn one
       credit  one line, the quieter ink (who made the picture, from what)
   Returns { lines() } — the notes as plain text lines, for still.js to write onto the kept picture. */
export function cwHonest(host, { title = 'Honest about the picture', notes = [], credit = '' } = {}) {
  const S = (window.CW && window.CW.STYLE) || null;
  if (!S) console.log('honest.js: cw-style.js is not loaded; parchment defaults');
  const ink = S ? S.ink : '#2a241c', soft = S ? S.inkSoft : '#6b655a', font = S ? S.font : 'Georgia, serif';
  const sizeText = S ? S.size.label : 15, sizeMinor = S ? S.size.minor : 13;

  const sec = document.createElement('section');
  sec.className = 'cw-honest';
  sec.style.cssText = `font-family:${font};color:${ink};font-size:${sizeText}px;line-height:1.5;max-width:66ch;margin:0 auto;`;
  const h = document.createElement('p');
  h.style.cssText = `margin:0 0 4px;color:${ink};`;
  h.innerHTML = `<b style="font-weight:normal;border-bottom:1px solid ${soft}">${title}</b>`;
  sec.appendChild(h);
  const ul = document.createElement('ul');
  ul.style.cssText = 'list-style:none;margin:0;padding:0;';
  notes.forEach(n => {
    const li = document.createElement('li');
    li.style.cssText = 'margin:0 0 6px;';
    const w = document.createElement('span'); w.textContent = n.what + ' ';
    const s = document.createElement('span'); s.textContent = n.says + ' ';
    const b = document.createElement('span'); b.style.color = soft; b.textContent = n.bracket ? '[' + n.bracket + ']' : '';
    li.append(w, s, b);
    ul.appendChild(li);
  });
  sec.appendChild(ul);
  if (credit) {
    const c = document.createElement('p');
    c.style.cssText = `margin:8px 0 0;color:${soft};font-size:${sizeMinor}px;`;
    c.textContent = credit;
    sec.appendChild(c);
  }
  host.appendChild(sec);
  return {
    lines: () => notes.map(n => n.what + ' ' + n.says + (n.bracket ? ' [' + n.bracket + ']' : '')),
    credit
  };
}
