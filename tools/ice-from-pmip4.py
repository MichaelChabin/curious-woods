#!/usr/bin/env python3
"""ice-from-pmip4.py — the ice of the last ice age, from the PMIP4 copy of ICE-6G_C (12 Oct 2026;
Prompt-Build-Globe-Cities-Ice.md part 4, on Michael's ruling of 12 Oct: the PMIP4 redistribution is the
source, not Professor Peltier's own site, and the letter to him is no longer waited on).

Writes cw-deploys/stories/ice-outlines.json: the ice that existed then and not now, by years ago, as filled
rings of [lon, lat] (even-odd fill), which js/map.js's setIce draws as the timeline drives setTime.

  python3 tools/ice-from-pmip4.py fetch  [cachedir]   download the 48 files (37 MB each, netCDF classic),
                                                      check each against the md5 the PMIP4 page lists, keep
                                                      the ice mask reduced to a one-degree fraction (.npy),
                                                      and delete the file
  python3 tools/ice-from-pmip4.py trace  [cachedir]   trace the outlines from the fractions and write the JSON
  python3 tools/ice-from-pmip4.py compare [cachedir]  the new outlines against prototypes/ice/ice-outlines.json
                                                      (29 Sep, traced from the one-degree files of Peltier's site)

Source: PMIP4 ICE-6G-C ice-sheet data, https://pmip4.lsce.ipsl.fr/doku.php/data:ice_ice6g_c (the files on
the LSCE share it links), I6_C.VM5a_10min.<t>.nc, 48 steps, 0 to 26 ka: every 500 years to 21 ka, then every
1,000; a ten-minute grid, 1080 by 2160; sftgif the ice mask, 0 or 100, floating ice included. The recipe is the
29 Sep one: the ice-area fraction at one degree, less today's, smoothed, traced at one half.
Cite: Peltier, Argus and Drummond 2015 (J. Geophys. Res. Solid Earth 120, 450–487, doi:10.1002/2014JB011176)
and Argus, Peltier, Drummond and Moore 2014 (Geophys. J. Int. 198, 537–563, doi:10.1093/gji/ggu140), via PMIP4.
Needs numpy, scipy, matplotlib (contourpy). The netCDF is classic (CDF\\x01), which scipy reads."""
import sys, os, json, hashlib, urllib.request, ssl
import numpy as np

SHARE = 'https://sharebox.lsce.ipsl.fr/index.php/s/1RSwVf7afj38cmG/download?path=%2F&files='
STEPS = [x / 2 for x in range(0, 43)] + [22, 23, 24, 25, 26]          # 0, 0.5, … 21, 22 … 26 (ka)
def fname(t): return 'I6_C.VM5a_10min.%s.nc' % (('%g' % t))
MD5 = json.loads('''
%s''' % open(os.path.join(os.path.dirname(__file__), 'ice-from-pmip4-md5.json')).read())
OUT = os.path.join(os.path.dirname(__file__), '..', 'cw-deploys', 'stories', 'ice-outlines.json')
PROTO = os.path.join(os.path.dirname(__file__), '..', 'prototypes', 'ice', 'ice-outlines.json')

def fetch(cache):
    os.makedirs(cache, exist_ok=True)
    from scipy.io import netcdf_file
    ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE   # the LSCE certificate does not verify here; the md5 is the check
    for t in STEPS:
        key = '%g' % t; npy = os.path.join(cache, 'ice-frac-%s.npy' % key)
        if os.path.exists(npy): print(key, 'kept'); continue
        fn = os.path.join(cache, fname(t))
        with urllib.request.urlopen(SHARE + fname(t), context=ctx, timeout=300) as r, open(fn, 'wb') as f:
            while True:
                b = r.read(1 << 20)
                if not b: break
                f.write(b)
        h = hashlib.md5(open(fn, 'rb').read()).hexdigest()
        if MD5.get(key) and h != MD5[key]: os.remove(fn); raise SystemExit('md5 differs for %s: %s, the page says %s' % (fname(t), h, MD5[key]))
        nc = netcdf_file(fn, 'r', mmap=False)
        ice = nc.variables['sftgif'][:].astype(np.float32)          # (lat, lon), 0 or 100; lat south to north, lon 0 to 360
        lat = nc.variables['lat'][:]; lon = nc.variables['lon'][:]
        nc.close(); os.remove(fn)
        assert ice.shape == (1080, 2160) and lat[0] < 0 and lon[0] >= 0, (ice.shape, lat[0], lon[0])
        frac = ice.reshape(180, 6, 360, 6).mean(axis=(1, 3)) / 100.0   # the one-degree ice-area fraction
        frac = np.roll(frac, 180, axis=1)                                 # lon -180 … 180, so the seam is at the dateline, not through Britain
        np.save(npy, frac.astype(np.float32))
        print(key, 'ok', h[:8], 'ice cells', int((frac > 0.5).sum()))

def rings_at(diff, level=0.5):
    from scipy.ndimage import gaussian_filter
    from contourpy import contour_generator
    # a light smoothing (half a cell): the traced area then matches the 29 Sep trace from Peltier's one-degree files to
    # within a tenth of a percent at 20,000, 12,000 and 8,000 years ago; rings of fewer than six points are specks
    sm = gaussian_filter(diff, sigma=0.5, mode=('nearest', 'wrap'))
    lon = np.arange(360) - 179.5; lat = np.arange(180) - 89.5
    gen = contour_generator(lon, lat, sm)
    out = []
    for line in gen.lines(level):
        if len(line) < 6: continue
        if abs(line[0][0] - line[-1][0]) > 1e-6 or abs(line[0][1] - line[-1][1]) > 1e-6: line = np.vstack([line, line[:1]])
        out.append([[round(float(x), 3), round(float(y), 3)] for x, y in line[:-1]])
    return out

def trace(cache):
    now = np.load(os.path.join(cache, 'ice-frac-0.npy'))
    ages, outlines = [], {}
    for t in STEPS:
        key = '%g' % t; frac = np.load(os.path.join(cache, 'ice-frac-%s.npy' % key))
        diff = np.clip(frac - now, 0, 1)                                  # the ice that existed then and not now
        age = int(round(t * 1000)); ages.append(age)
        outlines[str(age)] = rings_at(diff)
        print(age, len(outlines[str(age)]), 'rings')
    data = {
        '_about': 'Ice that existed then and not now, by years ago, as filled rings of [lon, lat] (even-odd fill), for js/map.js setIce. From the PMIP4 copy of ICE-6G_C (VM5a): the ten-minute ice mask (sftgif, floating ice included) reduced to the one-degree ice-area fraction, less today\'s, smoothed (gaussian, half a cell) and traced at one half, rings of fewer than six points dropped; 48 steps, every 500 years to 21,000 years ago, then every 1,000 to 26,000. Made by tools/ice-from-pmip4.py, which checks every file against the md5 the PMIP4 page lists. Never edited by hand.',
        'source': 'PMIP4 ICE-6G-C ice-sheet data, https://pmip4.lsce.ipsl.fr/doku.php/data:ice_ice6g_c (I6_C.VM5a_10min.<t>.nc)',
        'cite': ['Peltier, W.R., Argus, D.F. and Drummond, R. (2015), Space geodesy constrains ice-age terminal deglaciation: The global ICE-6G_C (VM5a) model, J. Geophys. Res. Solid Earth 120, 450–487, doi:10.1002/2014JB011176',
                 'Argus, D.F., Peltier, W.R., Drummond, R. and Moore, A.W. (2014), The Antarctica component of postglacial rebound model ICE-6G_C (VM5a), Geophys. J. Int. 198, 537–563, doi:10.1093/gji/ggu140'],
        'via': 'PMIP4', 'generated': '2026-10-12',
        'ages': ages, 'outlines': outlines }
    json.dump(data, open(OUT, 'w'), separators=(',', ':'))
    print('wrote', OUT, os.path.getsize(OUT) // 1024, 'KB')

def compare(cache):
    a = json.load(open(OUT)); b = json.load(open(PROTO))
    print('ages same:', a['ages'] == b['ages'])
    for age in a['ages']:
        ra, rb = a['outlines'][str(age)], b['outlines'][str(age)]
        pa = sum(len(r) for r in ra); pb = sum(len(r) for r in rb)
        if ra or rb: print(age, 'new %d rings %d pts' % (len(ra), pa), '| 29 Sep %d rings %d pts' % (len(rb), pb))

if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'trace'
    cache = sys.argv[2] if len(sys.argv) > 2 else os.path.expanduser('~/Library/Caches/cw-ice-pmip4')
    {'fetch': fetch, 'trace': trace, 'compare': compare}[cmd](cache)
