/* stack.js — Curious Woods: one picture slot, several pictures, in a loop.
   Michael's idea, 22 Sep 2026. Spec: CWVault/claude/Story-Pattern.md.

   cwStack(figure, steps, onShow)  → { show(i) }

   `figure` is a <figure> holding an <img> and a <figcaption>. `steps` is the pictures,
   in the order she meets them; the last one leads back to the first, so she can always
   come round rather than feel stuck:
     { src, w, h, alt, caption, name: 'the stone', ratio: 'calc(1920 / 1601)' }
   `ratio` is the picture's shape, for a slot whose pictures are not all the same shape.
   `onShow(step, index)` is called each time a picture lands, for whatever else the page
   hangs on it (the Delft plan's marks).
   The word names where she is going — "Next: the powder", and "Back to the stone" on the
   last one — so it is right whatever steps are there.

   The word, not the picture, moves the stack on. A picture may already have taps of its
   own — the magnifier on a painting, a place on a map — and a tap that meant two things
   at once would be a trap. So the bold word runs on at the end of the caption, in the same
   column, and says what is coming: "Next: the powder". On its own line it read as a heading
   for whatever came after (Michael, 22 Sep), so it stays in the caption's last line.

   A step whose picture will not load is dropped, and the loop closes over what is left,
   so a missing file never leaves her looking at a broken frame.

   Classic script, no dependencies. */
(function () {
  'use strict';

  var CSS = [
    '.cw-stack-next{display:inline;font-size:inherit;font-weight:bold;white-space:nowrap;',
    '  color:#546A80;background:none;border:0;padding:0;font-family:inherit;cursor:pointer;',
    '  text-align:left;transition:color 120ms;}',
    '.cw-stack-next:hover,.cw-stack-next:focus-visible{color:#3d5266;outline:none;}',
    '.cw-stack img{transition:opacity 140ms;}',
    '.cw-stack.turning img{opacity:0;}'
  ].join('\n');
  var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);

  function cwStack(figure, steps, onShow) {
    var img = figure.querySelector('img');
    var cap = figure.querySelector('figcaption');
    if (!img || !cap || !steps || !steps.length) return { show: function () {} };
    figure.classList.add('cw-stack');

    var words = document.createElement('span');            // the caption's own words, so it may carry italics
    while (cap.firstChild) cap.removeChild(cap.firstChild);
    cap.appendChild(words);

    var word = document.createElement('button');
    word.type = 'button'; word.className = 'cw-stack-next';
    cap.appendChild(document.createTextNode(' '));
    cap.appendChild(word);

    var live = steps.slice(), at = 0;

    function draw() {
      var s = live[at];
      figure.classList.add('turning');
      var next = live[(at + 1) % live.length];
      window.setTimeout(function () {
        img.src = s.src; img.alt = s.alt || '';
        if (s.w) img.width = s.w; if (s.h) img.height = s.h;
        if (s.ratio) figure.style.setProperty('--pic', s.ratio);
        words.innerHTML = s.caption + ' ';
        word.textContent = live.length > 1
          ? (at === live.length - 1 ? 'Back to ' + (next.name || 'the start') : 'Next: ' + (next.name || 'the next one'))
          : '';
        word.hidden = live.length < 2;
        figure.classList.remove('turning');
        if (onShow) onShow(s, at);
      }, 140);
    }

    word.addEventListener('click', function () { at = (at + 1) % live.length; draw(); });

    // drop any step whose picture is not there, then start
    var left = live.length;
    live.forEach(function (s) {
      var probe = new Image();
      probe.onerror = function () { s.gone = true; done(); };
      probe.onload = done;
      probe.src = s.src;
      function done() { if (--left === 0) { live = live.filter(function (x) { return !x.gone; }); if (live.length) draw(); else figure.remove(); } }
    });

    return { show: function (i) { at = i % live.length; draw(); } };
  }

  window.cwStack = cwStack;
})();
