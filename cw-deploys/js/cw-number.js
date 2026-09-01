// ============================================================
// CW.num — HOW A NUMBER IS WRITTEN. One file, every lab and bench.
//
// Extracted 2 Sep 2026, on Michael's instruction that the benches and the labs
// all write numbers the same way. Until now each page carried its own rules:
// plane.js grouped thousands for its lattice labels, the Multiply bench had its
// own decimal trimmer derived from that, the Ruling bench had its own stacked
// fractions, and Glass Multiplication wrote String(n) on a pane with no grouping
// at all. Four dialects of one language. This is the language.
//
// The rules are not invented here. They are gathered from where they were
// settled, and cited so they can be argued with:
//
//   • A fraction is STACKED, never a slash — numerator over a bar over
//     denominator. (Walk-Glass-Aug26, step 3: "a properly stacked fraction
//     (never slashes)".)
//   • A number never speaks more precision than the act that made it showed.
//     (Decisions-Controls-Aug12 §6.) So nothing here rounds. A decimal is exact
//     or it is not written as a decimal.
//   • Trailing zeros are trimmed; thousands are grouped. (plane.js's own tick
//     labels, which this file now serves.)
//   • Names are small and earned; the shape carries the magnitude, so a numeral
//     does not grow without bound. (Walk-Glass-Aug26, step 1.)
//   • THE MATH AXIS. Every term on a line — whole number, operator, fraction —
//     sits on one horizontal line: the axis, where TeX puts the fraction bar and
//     the middles of × = −. It is NOT the baseline. In the DOM this is a flex
//     row with align-items:center, so every box centre and every fraction bar
//     land together; `vertical-align` on a two-line stack cannot do it, because
//     it aligns the numerator's baseline and the bar falls wherever the leading
//     leaves it. On canvas it is the y this file's draw calls take: y is always
//     the axis, never a baseline. Measured at spread 0.00px (2 Sep).
//
// Georgia sets OLD-STYLE FIGURES — 3 4 5 7 9 descend, 6 and 8 ascend, 0 1 2 sit
// at x-height — so digits' ink centres genuinely differ from each other by about
// a pixel at panel sizes. Alignment here is by box, not by ink: correcting per
// glyph would make the digits bob against each other, which is worse.
//
// Deliberately NOT changed while extracting: the thousands separator stays the
// ordinary space plane.js has always used, so adopting this file re-renders
// nothing. plane.js's own comment says "thin space" and means U+2009, which is
// typographically the right answer and one constant away — but a standardisation
// pass is the wrong place to smuggle in a restyle. See GROUP_SEP.
//
// Classic script, no build step. Load BEFORE plane.js, which uses it.
// Depends on nothing. CW.snap is used if present and worked around if not.
// ============================================================

(function() {
'use strict';

window.CW = window.CW || {};

var GROUP_SEP  = ' ';    // plane.js's long-standing separator. U+2009 is the
                         // documented intent; changing it is a design decision.
var FRAC_SCALE = 0.82;   // numerator and denominator, as a share of the number
var FRAC_PAD   = 0.22;   // bar overhang past the widest of the two, in its ems
var FRAC_GAP   = 0.06;   // clear air between a bar and the digits it separates
var CSS_ID     = 'cw-num-css';

function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { var t = a % b; a = b; b = t; }
    return a;
}
function group(s) {
    var dot = s.indexOf('.');
    var ip = dot < 0 ? s : s.slice(0, dot), rest = dot < 0 ? '' : s.slice(dot);
    var sign = '';
    if (ip.charAt(0) === '-') { sign = '-'; ip = ip.slice(1); }
    return sign + ip.replace(/\B(?=(\d{3})+(?!\d))/g, GROUP_SEP) + rest;
}
function snap(v) { return (CW.snap ? CW.snap(v) : Math.round(v) + 0.5); }

CW.num = {

    gcd: gcd,
    reduce: function(n, d) { var g = gcd(n, d) || 1; return { n: n / g, d: d / g }; },

    // ---- as text ----------------------------------------------------------

    // A whole number, thousands grouped.
    count: function(n) { return group(String(n)); },

    // num / 10^places, exactly — an integer and a count of decimal places, which
    // is the form both the zoom grain and a power-of-ten ruling produce. Integer
    // arithmetic all the way to the string, so 6.3 × 2 is 63 × 20 over 10² and
    // reads 12.6 rather than 12.600000000000001. Trailing zeros are trimmed:
    // the act showed one place, so the number speaks one.
    decimal: function(num, places) {
        places = places || 0;
        var neg = num < 0, s = String(Math.abs(num));
        if (places > 0) {
            while (s.length <= places) s = '0' + s;
            var ip = s.slice(0, s.length - places),
                fp = s.slice(s.length - places).replace(/0+$/, '');
            s = fp ? ip + '.' + fp : ip;
        }
        return group((neg ? '-' : '') + s);
    },

    // Whether n/d can be written as a terminating decimal at all — that is,
    // whether the denominator is built from 2s and 5s. Thirds cannot, which is
    // why they are written as fractions and not as 0.333…
    isDecimal: function(d) {
        d = Math.abs(d) || 1;
        while (d % 2 === 0) d /= 2;
        while (d % 5 === 0) d /= 5;
        return d === 1;
    },

    // ---- in the DOM -------------------------------------------------------
    // Wrap a run of these in an element with class `cw-line` and every term —
    // integers, operators, fractions — lands on the math axis.

    // n / d. d === 1 gives a plain grouped number. opts.mixed lifts the whole
    // part out of an improper fraction, the way we would normally write it.
    html: function(n, d, opts) {
        opts = opts || {};
        d = d || 1;
        if (d === 1) return '<span class="cw-n">' + group(String(n)) + '</span>';
        if (opts.mixed && Math.abs(n) > d) {
            var w = (n < 0 ? -1 : 1) * Math.floor(Math.abs(n) / d), r = Math.abs(n) % d;
            return '<span class="cw-mix"><span class="cw-n">' + group(String(w)) +
                   '</span>' + CW.num.html(r, d) + '</span>';
        }
        return '<span class="cw-frac"><span class="cw-nu">' + group(String(n)) +
               '</span><span class="cw-de">' + group(String(d)) + '</span></span>';
    },

    // An operator or a quiet word, so a caller never hand-rolls the class.
    op: function(s) { return '<span class="cw-op">' + s + '</span>'; },

    // ---- on canvas --------------------------------------------------------
    // In every call below (x, y) anchors the number and **y is the math axis**,
    // not a baseline: for a fraction it is the bar, for anything else it is the
    // middle. Pass the same y for a whole row and the row is aligned.
    // opts: {size, weight, color, align: 'center'|'left'|'right'}

    drawText: function(ctx, text, x, y, opts) {
        opts = opts || {};
        var size = opts.size || 14;
        ctx.save();
        ctx.font = (opts.weight ? opts.weight + ' ' : '') + size + 'px Georgia, serif';
        if (opts.color) ctx.fillStyle = opts.color;
        ctx.textAlign = opts.align || 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
        ctx.restore();
    },

    // { w, h } of n/d drawn at opts.size, so a caller can keep it inside
    // something before committing to it.
    measure: function(ctx, n, d, opts) {
        opts = opts || {};
        var size = opts.size || 14;
        d = d || 1;
        ctx.save();
        ctx.font = (opts.weight ? opts.weight + ' ' : '') + size + 'px Georgia, serif';
        if (d === 1) {
            var w1 = ctx.measureText(group(String(n))).width;
            ctx.restore();
            return { w: w1, h: size };
        }
        var fs = size * FRAC_SCALE;
        ctx.font = (opts.weight ? opts.weight + ' ' : '') + fs + 'px Georgia, serif';
        var wn = ctx.measureText(group(String(n))).width,
            wd = ctx.measureText(group(String(d))).width;
        ctx.restore();
        return { w: Math.max(wn, wd) + 2 * FRAC_PAD * fs, h: 2 * (fs + FRAC_GAP * size) };
    },

    // n over a bar over d, the bar on the axis at y. d === 1 draws the whole
    // number centred on the same axis, so callers do not branch.
    draw: function(ctx, n, d, x, y, opts) {
        opts = opts || {};
        d = d || 1;
        var size = opts.size || 14, weight = opts.weight ? opts.weight + ' ' : '';
        if (d === 1) return CW.num.drawText(ctx, group(String(n)), x, y, opts);

        var fs = size * FRAC_SCALE, gap = FRAC_GAP * size;
        var nu = group(String(n)), de = group(String(d));
        ctx.save();
        ctx.font = weight + fs + 'px Georgia, serif';
        if (opts.color) { ctx.fillStyle = opts.color; ctx.strokeStyle = opts.color; }
        var wn = ctx.measureText(nu).width, wd = ctx.measureText(de).width;
        var bar = Math.max(wn, wd) + 2 * FRAC_PAD * fs;
        var cx = x;                                     // centre of the stack
        if ((opts.align || 'center') === 'left')  cx = x + bar / 2;
        if (opts.align === 'right')               cx = x - bar / 2;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(nu, cx, y - gap);
        ctx.textBaseline = 'top';
        ctx.fillText(de, cx, y + gap);

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - bar / 2, snap(y));
        ctx.lineTo(cx + bar / 2, snap(y));
        ctx.stroke();
        ctx.restore();
    }
};

// The stylesheet, injected once. It travels with the module so a page cannot
// adopt the markup and miss the alignment — which is the whole of the standard
// in the DOM.
CW.num.css =
    '.cw-line{display:flex;align-items:center;flex-wrap:wrap;gap:.32em;line-height:1.2}' +
    '.cw-mix{display:flex;align-items:center;gap:.18em}' +
    '.cw-frac{display:flex;flex-direction:column;align-items:center;' +
        'line-height:1.1;font-size:' + FRAC_SCALE + 'em}' +
    '.cw-frac .cw-nu{border-bottom:1px solid currentColor;padding:0 3px}' +
    '.cw-frac .cw-de{padding:0 3px}';

if (typeof document !== 'undefined' && !document.getElementById(CSS_ID)) {
    var st = document.createElement('style');
    st.id = CSS_ID;
    st.textContent = CW.num.css;
    (document.head || document.documentElement).appendChild(st);
}

})();
