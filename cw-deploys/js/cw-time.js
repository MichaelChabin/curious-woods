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
   The deep lines (js/deep-time.js, opts.time), the Time Machine's own line and the map keep only what they
   last drew; the page hands the year to the map. Classic script, no dependencies. */
(function () {
  'use strict';
  var CW = window.CW = window.CW || {};
  CW.THIS_YEAR = new Date().getFullYear();
  CW.maToYear = function (ma) { return CW.THIS_YEAR - ma * 1e6; };
  CW.yearToMa = function (year) { return (CW.THIS_YEAR - year) / 1e6; };
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
