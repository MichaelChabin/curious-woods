/* cw-time.js — Curious Woods: the year, owned once; and one way to read a curve.
   Michael's go-ahead of 19 Oct 2026 on the audit (CWVault/claude/Audit-Timeline-Graphics-Oct19.md, §6
   step 1 and §7 step 2): the current year had three owners in three units — the deep lines' millions of
   years ago, the page's years after the ice, the map's store year — and the curve-reading function was
   written five times. Now:
     CW.THIS_YEAR            this year, once
     CW.maToYear(ma)         millions of years ago → the store's astronomer's year (2026 is this year, −9974 the ice)
     CW.yearToMa(year)       and back
     CW.curveAt(pts, x, k)   the value of a curve at x by straight lines between its points; k the column
                             (1 the value, the default; 2 low; 3 high — a column a point lacks falls back to
                             its value); x before the first point gives the first, after the last the last;
                             null for no points
     CW.cwYear(opts)         the owner: { get(), set(year, source), ma(), setMa(ma, source), listen(fn) }.
                             set tells every listener (year, source) and answers whether the year changed;
                             setMa rounds to a whole year, as the deep lines always did. A listener that set
                             the year itself can tell by the source and not redraw twice.
     CW.yearsAgo(year, bce, round)   the years ago of a calendar year, by the house's sum (Ruling-Dates-01.md,
                             17 Nov 2026): the BCE year plus this year, or this year less the CE year, the
                             missing year 0 ignored; `round` (10, 100, 500) for an "about" date
     CW.agoWords(year, bce, round)   the same in parentheses: (196 years ago), (about 360 years ago)
   And one thing done on load: every element marked data-cw-ago="1830" (or "1000 BCE"), with data-cw-round="10"
   where the date is "about", has its text set to those parentheses, so a story's subtitle — 1830 (196 years ago)
   — is right in any year. The text typed in the page is what shows if this script does not run.
   The deep lines (js/deep-time.js, opts.time), the Time Machine's own line and the map keep only what they
   last drew; the page hands the year to the map. Classic script, no dependencies. */
(function () {
  'use strict';
  var CW = window.CW = window.CW || {};
  CW.THIS_YEAR = new Date().getFullYear();
  CW.maToYear = function (ma) { return CW.THIS_YEAR - ma * 1e6; };
  CW.yearToMa = function (year) { return (CW.THIS_YEAR - year) / 1e6; };
  CW.yearsAgo = function (year, bce, round) {
    var n = bce ? +year + CW.THIS_YEAR : CW.THIS_YEAR - year;
    if (round) { var r = Math.round(n / round) * round; if (r > 0) n = r; }
    return n;
  };
  CW.agoWords = function (year, bce, round) {
    var n = CW.yearsAgo(year, bce, round);
    return '(' + (round ? 'about ' : '') + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (n === 1 ? ' year ago)' : ' years ago)');
  };
  function fillAgo() {
    if (typeof document === 'undefined' || !document.querySelectorAll) return;
    Array.prototype.forEach.call(document.querySelectorAll('[data-cw-ago]'), function (el) {
      var m = /^\s*(\d+)\s*(BCE)?\s*$/.exec(el.getAttribute('data-cw-ago') || '');
      if (m) el.textContent = CW.agoWords(+m[1], !!m[2], +el.getAttribute('data-cw-round') || 0);
    });
  }
  if (typeof document !== 'undefined') { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fillAgo); fillAgo(); }
  CW.curveAt = function (pts, x, k) {
    k = k || 1;
    if (!pts || !pts.length) return null;
    var K = function (p) { return p[k] != null ? p[k] : p[1]; };
    if (x <= pts[0][0]) return K(pts[0]);
    for (var i = 1; i < pts.length; i++) {
      if (x <= pts[i][0]) { var a = pts[i - 1], b = pts[i]; return K(a) + (K(b) - K(a)) * (x - a[0]) / ((b[0] - a[0]) || 1); }
    }
    return K(pts[pts.length - 1]);
  };
  CW.cwYear = function (opts) {
    var year = opts && opts.year != null ? +opts.year : CW.THIS_YEAR, listeners = [];
    var y = {
      get: function () { return year; },
      ma: function () { return CW.yearToMa(year); },
      set: function (v, source) {
        v = +v;
        if (!isFinite(v) || v === year) return false;
        year = v;
        for (var i = 0; i < listeners.length; i++) listeners[i](year, source);
        return true;
      },
      setMa: function (ma, source) { return y.set(Math.round(CW.maToYear(ma)), source); },
      listen: function (f) { listeners.push(f); return function () { var i = listeners.indexOf(f); if (i >= 0) listeners.splice(i, 1); }; }
    };
    return y;
  };
})();
