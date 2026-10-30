// ============================================================
// CW.fullscreen — a word that fills the screen with one window, for any interactive.
//
// The Earth's 6b bench first (30 Oct 2026; Michael: Full screen in the left column fills the
// screen with the Earth's window; the essential words float over it, small, at one edge, and the
// age slider along the bottom; the same word, or the platform's own way out, returns; where the
// device has no full screen the word doesn't show; build it so another page could use it).
// Classic script, no build step, as cw-panel.js is.
//
//   var fs = CW.fullscreen(host, {
//     wordsHost: element,          // where the word goes (the page's left column); the word is a .word button
//     word: 'Full screen',         // its text (default)
//     words: function () { return [el, el, …]; },   // the essential words: moved into a small column at the top left
//                                                   //   of the screen while it is full, and put back where they were after
//     bottom: function () { return [el, …]; },      // what lies along the bottom (a slider's row), moved the same way
//     onChange: function (on) {}   // after the screen fills or empties, with the elements moved
//   });
//   fs.available  whether the device has full screen at all (false: no word was made)
//   fs.on         whether the screen is full now
//   fs.word       the button, or null
//   fs.enter(), fs.exit(), fs.toggle()
//
// How: the Fullscreen API on `host` (standard or WebKit's prefix: the iPad has it, the iPhone does not, and
// neither does a page the browser refuses it to — then there is no word). While the screen is full the host wears the
// class cw-fullscreen, so the page's own CSS can let its canvas fill it, and two floating boxes inside the host carry
// the moved elements: .cw-fs-words down the left edge at the top, .cw-fs-bottom along the bottom. The elements are
// moved, not copied, so their listeners stay; each goes back before its old next sibling on the way out. The platform's
// own way out (Escape, the iPad's gesture) is heard through fullscreenchange and undoes everything the same way. Where
// the browser has the API but refuses the request (a browser pane, an embedded view), the window fills the viewport
// instead, fixed over the page, and Escape leaves: the same look, for checking.
// ============================================================

(function () {
'use strict';

window.CW = window.CW || {};

var STYLE = '.cw-fullscreen{background:var(--cw-parchment,#f4f1e8);overflow:hidden}' +
  '.cw-fullscreen.cw-fs-fallback{position:fixed!important;inset:0!important;width:auto!important;height:auto!important;z-index:5000;margin:0}' +
  '.cw-fs-words{position:absolute;left:14px;top:12px;display:flex;flex-direction:column;align-items:flex-start;gap:3px;z-index:20;' +
    'padding:6px 10px 7px 8px;border-radius:6px;background:rgba(244,241,232,0.72)}' +
  '.cw-fs-words .word{font-size:13px;padding:1px 0}' +
  '.cw-fs-bottom{position:absolute;left:18px;right:18px;bottom:10px;z-index:20;padding:6px 10px;border-radius:6px;background:rgba(244,241,232,0.72)}';

function addStyle() {
  if (document.getElementById('cw-fullscreen-style')) return;
  var s = document.createElement('style'); s.id = 'cw-fullscreen-style'; s.textContent = STYLE;
  document.head.appendChild(s);
}

CW.fullscreen = function (host, opts) {
  opts = opts || {};
  var doc = document;
  var request = host.requestFullscreen || host.webkitRequestFullscreen;
  var enabled = !!(doc.fullscreenEnabled || doc.webkitFullscreenEnabled);
  var available = enabled && typeof request === 'function';
  var api = { available: available, on: false, word: null, enter: enter, exit: exit, toggle: toggle };
  if (!available) return api;   // no full screen here: no word
  addStyle();

  var word = document.createElement('button');
  word.type = 'button'; word.className = 'word'; word.textContent = opts.word || 'Full screen';
  word.setAttribute('aria-pressed', 'false');
  word.addEventListener('click', toggle);
  if (opts.wordsHost) opts.wordsHost.appendChild(word);
  api.word = word;

  var moved = [], wordsBox = null, bottomBox = null, fallback = false;
  function fsElement() { return doc.fullscreenElement || doc.webkitFullscreenElement || null; }
  function moveInto(els, box) {
    (els || []).forEach(function (el) {
      if (!el || el === box) return;
      moved.push({ el: el, parent: el.parentNode, next: el.nextSibling });
      box.appendChild(el);
    });
  }
  function applyOn() {
    if (api.on) return;
    api.on = true;
    host.classList.add('cw-fullscreen');
    wordsBox = document.createElement('div'); wordsBox.className = 'cw-fs-words';
    bottomBox = document.createElement('div'); bottomBox.className = 'cw-fs-bottom';
    host.appendChild(wordsBox); host.appendChild(bottomBox);
    var ws = typeof opts.words === 'function' ? opts.words() : (opts.words || []);
    if (ws.indexOf(word) < 0) ws = ws.concat([word]);   // the same word returns
    moveInto(ws, wordsBox);
    var bs = typeof opts.bottom === 'function' ? opts.bottom() : (opts.bottom || []);
    moveInto(bs, bottomBox);
    if (!bs.length) bottomBox.style.display = 'none';
    word.setAttribute('aria-pressed', 'true');
    if (opts.onChange) opts.onChange(true, api);
  }
  function applyOff() {
    if (!api.on) return;
    api.on = false;
    for (var i = moved.length - 1; i >= 0; i--) {   // back where they were, last moved first
      var m = moved[i];
      if (m.parent) { if (m.next && m.next.parentNode === m.parent) m.parent.insertBefore(m.el, m.next); else m.parent.appendChild(m.el); }
    }
    moved = [];
    if (wordsBox) wordsBox.remove(); if (bottomBox) bottomBox.remove(); wordsBox = bottomBox = null;
    host.classList.remove('cw-fullscreen', 'cw-fs-fallback');
    if (fallback) { fallback = false; document.documentElement.style.overflow = ''; document.removeEventListener('keydown', onKey); }
    word.setAttribute('aria-pressed', 'false');
    if (opts.onChange) opts.onChange(false, api);
  }
  function onChange() { if (fsElement() === host) applyOn(); else if (!fallback) applyOff(); }
  doc.addEventListener('fullscreenchange', onChange);
  doc.addEventListener('webkitfullscreenchange', onChange);
  function onKey(e) { if (e.key === 'Escape' && fallback) exit(); }
  function enterFallback() {   // the API refused: the window fills the viewport instead
    fallback = true;
    host.classList.add('cw-fs-fallback');
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    applyOn();
  }
  function enter() {
    if (api.on) return;
    var p;
    try { p = request.call(host, { navigationUI: 'hide' }); } catch (e) { p = Promise.reject(e); }
    if (p && typeof p.then === 'function') p.then(function () { if (fsElement() === host) applyOn(); }, function (e) { console.warn('cw-fullscreen: the request was refused; filling the viewport instead.', e && e.message ? e.message : e); enterFallback(); });
    else setTimeout(function () { if (fsElement() === host) applyOn(); else if (!api.on) enterFallback(); }, 300);   // WebKit's prefixed call returns nothing
  }
  function exit() {
    if (fallback) { applyOff(); return; }
    var ex = doc.exitFullscreen || doc.webkitExitFullscreen;
    if (fsElement() === host && typeof ex === 'function') { try { var p = ex.call(doc); if (p && p.catch) p.catch(function () {}); } catch (e) {} }
    else applyOff();
  }
  function toggle() { if (api.on) exit(); else enter(); }
  return api;
};

})();
