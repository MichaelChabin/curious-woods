/* remember.js — Curious Woods: "I want to Remember this", and the practice list it fills.
   25 Sep 2026, on Michael's word: the list exists now, so a story may promise it (Rulings,
   the Maya flag and Remember). The list is shown at practice.html, at the site's root.

   cwRemember(word, item, o)   wires one story's inscription → { has() }
     word    the button that says "I want to Remember this"
     item    what goes in the list: { id, title, from, href }
               id     short and fixed, e.g. 'necker-cube'
               title  what she will see in the list: 'The Necker cube'
               from   the story it came from: 'Professor Necker’s Drawing'
               href   the story, from the site's root: 'experiments/professor-neckers-drawing.html'
     o.ref   the paragraph that refers to it. With Maya absent the word is invisible until
             that paragraph comes near, fades in over its last 300 px of climb to the middle
             of the window, and once shown stays for the visit (the star story's behaviour).
             With Maya present it is there all the time.
     o.list  the list page's address from this page, e.g. '../practice.html'

   cwRemember.all()            the list, oldest first, each as { id, title, from, href }
   cwRemember.remove(id)       takes one off

   The list lives on her device only, in localStorage under cw.practice.queue — the key the
   two earlier stories already write. They wrote bare ids ('three-at-a-glance',
   'mirror-star'); those are read here and given their titles, so nothing already kept is lost.
   No dates, no counts: what she keeps, and nothing about when or how often.

   Safari on iPhone and iPad may delete a site's stored data after about seven days without
   a visit, unless the site is on the home screen. The script asks the browser to keep the
   data (navigator.storage.persist) where the browser listens; Safari mostly does not.

   Classic script, no dependencies. */
(function () {
  'use strict';

  var KEY = 'cw.practice.queue';
  var COPPER = '#b87333';

  // what the earlier stories wrote before items had titles
  var KNOWN = {
    'three-at-a-glance': { title: 'Three at a Glance', from: 'Three at a Glance',
                           href: 'active/three-at-a-glance.html' },
    'mirror-star':       { title: 'The star in a mirror', from: 'The Man Who Learned Without Knowing',
                           href: 'active/the-man-who-learned-without-knowing.html' }
  };

  var css = [
    '.cw-remember{color:' + COPPER + ';transition:opacity 200ms;}',
    '.cw-remember:hover,.cw-remember:focus-visible{color:#8f5520;}',
    '.cw-remember.pending{opacity:0;pointer-events:none;}',
    '.cw-remember-note{font-size:13px;line-height:1.35;color:#6b625a;}',
    '.cw-remember-note a{color:#546A80;text-decoration:none;}',
    '.cw-remember-note a:hover{color:#3d5266;}'
  ].join('\n');
  var style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  function read() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
  }
  function write(q) { try { localStorage.setItem(KEY, JSON.stringify(q)); } catch (e) {} }
  function idOf(x) { return typeof x === 'string' ? x : (x && x.id); }
  function full(x) {
    if (typeof x !== 'string') return x;
    var k = KNOWN[x] || { title: x, from: '', href: '' };
    return { id: x, title: k.title, from: k.from, href: k.href };
  }

  function all() { return read().map(full).filter(function (x) { return x && x.id; }); }
  function has(id) { return read().some(function (x) { return idOf(x) === id; }); }
  function add(item) {
    var q = read();
    if (!q.some(function (x) { return idOf(x) === item.id; })) q.push(item);
    write(q);
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) {}
  }
  function remove(id) { write(read().filter(function (x) { return idOf(x) !== id; })); }

  function cwRemember(word, item, o) {
    o = o || {};
    if (!word || !item) return { has: function () { return false; } };
    word.classList.add('cw-remember');

    var note = document.createElement('div');
    note.className = 'cw-remember-note';
    note.innerHTML = o.list ? '<a href="' + o.list + '">In your practice list</a>' : 'In your practice list';
    word.parentNode.insertBefore(note, word.nextSibling);
    function mark() { note.hidden = !has(item.id); }
    word.addEventListener('click', function () { add(item); mark(); });
    mark();

    // the Maya flag
    var maya = !!(window.CW && CW.flags && CW.flags.maya);
    if (!maya && o.ref) {
      word.classList.add('pending'); word.tabIndex = -1; word.setAttribute('aria-hidden', 'true');
      var REACH = 300, shown = false, queued = false;
      var measure = function () {
        queued = false;
        if (shown) return;
        var b = o.ref.getBoundingClientRect(), d = (b.top + b.height / 2) - window.innerHeight / 2;
        var p = d <= 0 ? 1 : d >= REACH ? 0 : 1 - d / REACH;
        word.style.opacity = p;
        word.style.pointerEvents = p > 0.5 ? 'auto' : 'none';
        if (p >= 1) {
          shown = true; word.classList.remove('pending'); word.style.opacity = ''; word.style.pointerEvents = '';
          word.tabIndex = 0; word.removeAttribute('aria-hidden');
        }
      };
      var onMove = function () { if (!queued) { queued = true; requestAnimationFrame(measure); } };
      document.addEventListener('scroll', onMove, true); window.addEventListener('resize', onMove);
      measure();
    }
    return { has: function () { return has(item.id); } };
  }

  cwRemember.all = all;
  cwRemember.remove = remove;
  window.cwRemember = cwRemember;
})();
