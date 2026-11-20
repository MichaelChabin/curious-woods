# The seas on the Time lab's own plates (20 Nov 2026; Report-Survey-Ancient-Seas-02.md). A fresh copy of the Nov 18
# script's painting, with one new step: Kocsis and Scotese's flooded ground (inside their continental margin, outside
# their coastline) is carried back to today on Scotese's plates, read here from the PALEOMAP rotation file and plate
# polygons in the coastline record, and written as a picture in TODAY's longitudes and latitudes. The Time lab's pieces
# carry today's ground on Merdith's plates already, so a picture in today's frame rides them with nothing more to do.
#
# Usage: build.py <scratch> <out-data-dir> <cw-deploys> <numbers.json>
#   <scratch>/dl/coast/{CS,CM}/   paleocoastlines_v7_shapefiles.zip, unpacked   (Zenodo 7994000)
#   <scratch>/dl/plates3/         paleomap_global_plate_model_v3.zip, unpacked  (the same record)
#   <scratch>/dl/dem01/           Scotese_Wright_2018_Maps_1-88_6minX6min_PaleoDEMS_nc.zip, unpacked (Zenodo 5460860)
# Needs numpy, scipy, h5py, pyshp, pillow. Writes only new files; nothing of the Nov 18 build is written over.
import sys, json, glob, os, re, math
import numpy as np, h5py, shapefile
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage
from scipy.spatial import cKDTree
SP, OUT, CWD, NUMS = sys.argv[1:5]
os.makedirs(OUT, exist_ok=True)
W, H, RE = 3600, 1800, 6371.0
D2R = math.pi / 180

# ---------------------------------------------------------------- rotations
def qpole(lat, lon, ang):
    la, lo, h = lat * D2R, lon * D2R, ang * D2R / 2
    s = math.sin(h)
    return np.array([math.cos(h), math.cos(la) * math.cos(lo) * s, math.cos(la) * math.sin(lo) * s, math.sin(la) * s])
def qmul(a, b):
    return np.array([a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3], a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],
                     a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1], a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0]])
def qconj(a): return np.array([a[0], -a[1], -a[2], -a[3]])
def slerp(a, b, t):
    d = float(a @ b)
    if d < 0: b, d = -b, -d
    if d > 0.9995:
        q = a + t * (b - a); return q / np.linalg.norm(q)
    th = math.acos(d); s = math.sin(th)
    return math.sin((1 - t) * th) / s * a + math.sin(t * th) / s * b
def qmat(q):
    w, x, y, z = q
    return np.array([[1-2*(y*y+z*z), 2*(x*y-z*w), 2*(x*z+y*w)], [2*(x*y+z*w), 1-2*(x*x+z*z), 2*(y*z-x*w)], [2*(x*z-y*w), 2*(y*z+x*w), 1-2*(x*x+y*y)]])
def xyz(lon, lat):
    lo, la = np.asarray(lon) * D2R, np.asarray(lat) * D2R
    return np.stack([np.cos(la) * np.cos(lo), np.cos(la) * np.sin(lo), np.sin(la)], -1)
def lonlat(v):
    return np.arctan2(v[..., 1], v[..., 0]) / D2R, np.arcsin(np.clip(v[..., 2], -1, 1)) / D2R
def km(a, b): return RE * np.arccos(np.clip(np.sum(a * b, -1), -1, 1))

# Scotese's plates: the rotation file's total poles, each relative to a fixed plate, composed up the tree to 000
class Paleomap:
    def __init__(self, rot, gpml):
        self.seq = {}
        for line in open(rot, encoding='latin-1'):
            p = line.split('!')[0].split()
            if len(p) < 6: continue
            self.seq.setdefault(int(p[0]), []).append((float(p[1]), qpole(float(p[2]), float(p[3]), float(p[4])), int(p[5])))
        self.header = [l.split('!!')[1].strip() for l in open(rot, encoding='latin-1').read().split('\n')[:4]]
        txt = open(gpml, encoding='utf-8').read()
        self.polys = []   # (plate, begin, end, [(lon, lat) …])
        def when(s): return math.inf if 'distantPast' in s else -math.inf if 'distantFuture' in s else float(s)
        for fm in txt.split('<gml:featureMember>')[1:]:
            pid = re.search(r'<gpml:reconstructionPlateId>.*?<gpml:value>(\d+)</gpml:value>', fm, re.S)
            b = re.search(r'<gml:begin>.*?<gml:timePosition[^>]*>([^<]+)<', fm, re.S); e = re.search(r'<gml:end>.*?<gml:timePosition[^>]*>([^<]+)<', fm, re.S)
            if not pid or not b or not e: continue
            for pl in re.findall(r'<gml:exterior>.*?<gml:posList[^>]*>([^<]+)</gml:posList>', fm, re.S):
                v = np.array(pl.split(), float).reshape(-1, 2)   # GPML writes latitude first
                self.polys.append((int(pid.group(1)), when(b.group(1)), when(e.group(1)), [(lo, la) for la, lo in v]))
        self.cache = {}
    def rel(self, pid, t):
        s = self.seq.get(pid)
        if not s: return None
        for a, b in zip(s, s[1:]):
            if a[2] == b[2] and a[0] <= t <= b[0] and b[0] > a[0]:
                return slerp(a[1], b[1], (t - a[0]) / (b[0] - a[0])), a[2]
        return None
    def q(self, pid, t, depth=0):   # today → age t, or None where the file does not carry the plate that far
        if pid == 0: return np.array([1.0, 0, 0, 0])
        k = (pid, t)
        if k not in self.cache:
            r = self.rel(pid, t) if depth < 30 else None
            up = self.q(r[1], t, depth + 1) if r else None
            self.cache[k] = qmul(up, r[0]) if up is not None else None
        return self.cache[k]

# Merdith's plates, exactly as earth.js reads stories/plates/continents.json (plateQuatAt)
class Merdith:
    def __init__(self, path):
        d = json.load(open(path)); self.ages = d['ages']; self.pieces = d['pieces']
        self.plates = {int(k): (v['first'], [qpole(*r) for r in v['rot']]) for k, v in d['plates'].items()}
    def q(self, pid, t):
        P = self.plates.get(int(pid))
        if not P: return None
        f, qs = P; n = len(qs); A = self.ages
        if t <= A[f]: return qs[0]
        if t >= A[f + n - 1]: return qs[-1]
        for k in range(n - 1):
            if A[f + k] <= t <= A[f + k + 1]: return slerp(qs[k], qs[k + 1], (t - A[f + k]) / (A[f + k + 1] - A[f + k]))

# ---------------------------------------------------------------- pictures in longitude and latitude
def fill(draw, pts, value):   # one outline on the 3,600 × 1,800 grid; a ring across the dateline or round a pole drawn whole
    lon = np.array([p[0] for p in pts], float); lat = np.array([p[1] for p in pts], float)
    u = np.concatenate([[lon[0]], lon[0] + np.cumsum((np.diff(lon) + 180) % 360 - 180)])
    if abs(u[-1] - u[0]) > 180:   # it winds round a pole: close it along the pole's edge
        pole = 90.0 if lat.mean() > 0 else -90.0
        u = np.concatenate([u, [u[-1], u[0]]]); lat = np.concatenate([lat, [pole, pole]])
    for k in (-2, -1, 0, 1, 2):
        x = (u + 360 * k + 180) * W / 360
        if x.max() < 0 or x.min() > W: continue
        draw.polygon(list(zip(x.tolist(), ((90 - lat) * H / 180).tolist())), fill=value)
def shp_mask(path):   # Kocsis and Scotese's rings, even-odd (a ring inside a ring is a hole), as the Nov 18 build read them
    m = np.zeros((H, W), bool)
    for s in shapefile.Reader(path).shapes():
        idx = list(s.parts) + [len(s.points)]
        for a, b in zip(idx, idx[1:]):
            im = Image.new('1', (W, H), 0); ImageDraw.Draw(im).polygon([((x + 180) * W / 360, (90 - y) * H / 180) for x, y in s.points[a:b]], fill=1)
            m ^= np.array(im, bool)
    return m
LAT = 90 - (np.arange(H) + 0.5) * 180 / H; LON = -180 + (np.arange(W) + 0.5) * 360 / W
AREA = np.repeat(((180 / H * D2R * RE) ** 2 * np.cos(LAT * D2R))[:, None], W, 1)   # km² of each cell
LONG, LATG = np.meshgrid(LON, LAT)
def cell(lon, lat): return (np.clip(((90 - lat) * H / 180).astype(int), 0, H - 1), ((lon + 180) * W / 360).astype(int) % W)
def area(m): return float(AREA[m].sum())

PM = Paleomap(f'{SP}/dl/plates3/PALEOMAP_PlateModel.rot', f'{SP}/dl/plates3/PALEOMAP_PlatePolygons.gpml')
MD = Merdith(f'{CWD}/stories/plates/continents.json')
print('rotation file says:', PM.header[1:4]); print(len(PM.polys), 'plate polygons;', len(MD.pieces), 'pieces')

def paleomap_grid(t):   # today's ground: which of Scotese's plates holds each cell, among the polygons that exist at age t
    im = Image.new('I', (W, H), 0); d = ImageDraw.Draw(im)
    for pid, b, e, pts in PM.polys:
        if b >= t >= e and PM.q(pid, t) is not None: fill(d, pts, pid)
    return np.array(im)
def merdith_grid(t):   # today's ground: which Merdith plate's piece holds each cell at age t, in the order earth.js paints them
    alive = [(i, p) for i, p in enumerate(MD.pieces) if p['from'] >= t >= p['to']]
    first = {}
    for i, p in alive: first.setdefault(p['plate'], i)
    im = Image.new('I', (W, H), 0); d = ImageDraw.Draw(im)
    for i, p in sorted(alive, key=lambda ip: (first[ip[1]['plate']], ip[0])):
        for r in p['rings']:
            if len(r) >= 6: fill(d, list(zip(r[0::2], r[1::2])), int(p['plate']))
    return np.array(im)
def carry(grid, model, t):   # every cell of today's ground to where its plate puts it at age t: unit vectors (NaN where no plate)
    out = np.full((H, W, 3), np.nan, np.float32); X0 = xyz(LONG, LATG)
    for pid in np.unique(grid):
        if pid == 0: continue
        q = model.q(int(pid), t)
        if q is None: continue
        m = grid == pid; out[m] = X0[m] @ qmat(q).T
    return out

# ---------------------------------------------------------------- the new step
def seas(tag, sAge, mAge, measure):
    cs = shp_mask(f'{SP}/dl/coast/CS/{sAge}Ma_CS_v7.shp'); cm = shp_mask(f'{SP}/dl/coast/CM/{sAge}Ma_CM_v7.shp')
    flood = cm & ~cs                                   # Scotese's frame: continent, but outside the coast
    gP = paleomap_grid(sAge); S = carry(gP, PM, sAge)  # today's frame → Scotese's
    ok = ~np.isnan(S[..., 0])
    lo, la = lonlat(S[ok]); ii, jj = cell(lo, la)
    f0 = np.zeros((H, W), bool); f0[ok] = flood[ii, jj]   # today's frame: this ground was flooded then
    im = Image.fromarray((f0 * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))
    if not measure: im = im.resize((W // 2, H // 2), Image.LANCZOS)   # a step of the journey: half the width, as the left Earth's steps are
    im.save(f'{OUT}/seas-{tag}.png', optimize=True)
    n = {'tag': tag, 'scoteseAge': sAge, 'merdithAge': mAge, 'bytes': os.path.getsize(f'{OUT}/seas-{tag}.png')}
    gM = merdith_grid(mAge); land = gM > 0
    hit = np.zeros((H, W), bool); hit[ii, jj] = True; hit = ndimage.binary_dilation(hit, np.ones((3, 3)))
    n['km2'] = {
        'floodedInScotese': area(flood), 'continentInScotese': area(cm), 'carried': area(f0),
        'notCarried': area(flood & ~hit),               # flooded ground that none of Scotese's own polygons reaches
        'onTimeLabLand': area(f0 & land), 'inTimeLabOcean': area(f0 & ~land),
        'timeLabLand': area(land), 'timeLabLandNoVerdict': area(land & ~ok)   # Time-lab land no PALEOMAP polygon carries: it gets no sea whatever Scotese drew
    }
    if not measure: return n, None
    M = carry(gM, MD, mAge); painted = f0 & land
    ctx = dict(tag=tag, sAge=sAge, mAge=mAge, flood=flood, cs=cs, cm=cm, gP=gP, gM=gM, S=S, M=M, f0=f0, painted=painted, ok=ok, land=land)
    def patches(mask, top=10):   # the biggest connected patches, in today's frame
        lab, k = ndimage.label(mask, np.ones((3, 3)))
        if not k: return []
        a = ndimage.sum(AREA, lab, range(1, k + 1)); out = []
        for i in np.argsort(a)[::-1][:top]:
            m = lab == i + 1; w = AREA[m]
            v = (xyz(LONG[m], LATG[m]) * w[:, None]).sum(0); c = lonlat(v / np.linalg.norm(v))
            out.append({'km2': round(float(a[i])), 'today': [round(float(c[0]), 1), round(float(c[1]), 1)]})
        return out
    n['inOceanPatches'] = patches(f0 & ~land); n['notCarriedPatchesScoteseFrame'] = patches(flood & ~hit, 6); n['noVerdictPatches'] = patches(land & ~ok, 8)
    # how far apart the two models put the same flooded ground on the globe, raw and after the one best turn of the whole Earth
    a, b, w = S[painted].astype(float), M[painted].astype(float), AREA[painted]
    U, _, Vt = np.linalg.svd((b * w[:, None]).T @ a); Rb = U @ np.diag([1, 1, np.sign(np.linalg.det(U @ Vt))]) @ Vt
    raw, fit = km(a, b), km(a @ Rb.T, b)
    n['modelsApartKm'] = {'median': float(np.median(raw)), 'p90': float(np.percentile(raw, 90)), 'afterBestTurnMedian': float(np.median(fit)), 'afterBestTurnP90': float(np.percentile(fit, 90)),
                          'bestTurnDegrees': float(np.degrees(np.arccos(np.clip((np.trace(Rb) - 1) / 2, -1, 1))))}
    ctx['Rb'] = Rb
    # the tears. Two cells of sea that touch in Scotese's frame but ride different plates in either model: how far the second
    # lands from where the first cell's own carry would have put it (0 where the two models move the pair alike)
    src = np.full((H, W), -1, np.int64); flat = np.flatnonzero(painted); pi, pj = cell(*lonlat(S[painted])); src[pi, pj] = flat
    for _ in range(1):   # fill the single-cell holes the resampling leaves
        hole = (src < 0) & flood; mx = ndimage.maximum_filter(src, 3); src[hole] = mx[hole]
    Sf, Mf, gPf, gMf = S.reshape(-1, 3), M.reshape(-1, 3), gP.ravel(), gM.ravel()
    tears = {}
    for da, db in ((0, 1), (1, 0)):
        A = src[:H - da, :W - db] if (da or db) else src; B = src[da:, db:]
        A = src[:H - da if da else H, :W - db if db else W]
        both = (A >= 0) & (B >= 0); c1, c2 = A[both], B[both]
        diff = (gPf[c1] != gPf[c2]) | (gMf[c1] != gMf[c2]); c1, c2 = c1[diff], c2[diff]
        for key in set(zip(gPf[c1].tolist(), gMf[c1].tolist(), gPf[c2].tolist(), gMf[c2].tolist())):
            m = (gPf[c1] == key[0]) & (gMf[c1] == key[1]) & (gPf[c2] == key[2]) & (gMf[c2] == key[3])
            Q1 = qmat(qmul(MD.q(key[1], mAge), qconj(PM.q(key[0], sAge))))
            want = Sf[c2[m]].astype(float) @ Q1.T; got = Mf[c2[m]].astype(float)
            step = (Sf[c2[m]] - Sf[c1[m]]).astype(float) @ Q1.T; step /= np.maximum(np.linalg.norm(step, axis=1, keepdims=True), 1e-12)
            d = km(want, got); opening = RE * np.sum((got - want) * step, 1)
            k2 = tuple(sorted([(key[0], key[1]), (key[2], key[3])]))
            if k2[0] != (key[0], key[1]): pass   # the opening's sign is the same seen from either side
            T = tears.setdefault(k2, {'d': [], 'o': [], 'c': []})
            T['d'] += d.tolist(); T['o'] += opening.tolist(); T['c'] += c1[m].tolist()
    rows = []
    for k2, T in tears.items():
        d = np.array(T['d']); o = np.array(T['o']); c = np.array(T['c'])
        v = xyz(LONG.ravel()[c], LATG.ravel()[c]).mean(0); cl = lonlat(v / np.linalg.norm(v))
        rows.append({'scotesePlates': [k2[0][0], k2[1][0]], 'merdithPlates': [k2[0][1], k2[1][1]], 'pairs': int(len(d)), 'lengthKm': round(len(d) * 11.1),
                     'medianKm': round(float(np.median(d))), 'maxKm': round(float(d.max())), 'medianOpeningKm': round(float(np.median(o))), 'today': [round(float(cl[0]), 1), round(float(cl[1]), 1)]})
    rows.sort(key=lambda r: -r['pairs'] * r['medianKm'])
    n['seams'] = rows   # every place the sea crosses from one plate to another in either model
    n['tears'] = [r for r in rows if r['medianKm'] >= 20 and r['pairs'] >= 8][:40]
    n['seamsThatHold'] = [r for r in rows if r['medianKm'] < 20 and r['pairs'] >= 30][:15]
    n['tornLengthKm'] = {'over20': sum(r['lengthKm'] for r in rows if r['medianKm'] >= 20), 'over50': sum(r['lengthKm'] for r in rows if r['medianKm'] >= 50),
                         'over100': sum(r['lengthKm'] for r in rows if r['medianKm'] >= 100), 'allSeams': sum(r['lengthKm'] for r in rows)}
    return n, ctx

def shore(ctx, lon, lat):   # a place of today: how far the nearest sea lies from it on each Earth, and which way
    if 'trees' not in ctx:
        ctx['pts'] = {'flood': xyz(LONG[ctx['flood']], LATG[ctx['flood']]), 'any': xyz(LONG[~ctx['cs']], LATG[~ctx['cs']]), 'right': ctx['M'][ctx['painted']].astype(float)}
        ctx['trees'] = {k: cKDTree(v) for k, v in ctx['pts'].items()}; ctx['Sp'] = ctx['S'][ctx['painted']]
    i, j = cell(np.array([lon]), np.array([lat])); i, j = int(i[0]), int(j[0]); x0 = xyz(lon, lat)
    out = {'scotesePlate': int(ctx['gP'][i, j]), 'merdithPlate': int(ctx['gM'][i, j])}
    def near(p, name, extra=None):
        pts = ctx['pts'][name]
        if not len(pts): return None
        d, k = ctx['trees'][name].query(p); q = pts[k]
        e = np.cross([0, 0, 1], p); e /= np.linalg.norm(e); nn = np.cross(p, e)
        r = {'km': round(float(RE * 2 * math.asin(min(1, d / 2)))), 'bearing': round(float(math.degrees(math.atan2((q - p) @ e, (q - p) @ nn))) % 360)}
        if extra is not None: r['k'] = int(k)
        return r
    qs = PM.q(out['scotesePlate'], ctx['sAge']) if out['scotesePlate'] else None
    if qs is not None:
        p = qmat(qs) @ x0; pl = lonlat(p); out['scotese'] = [round(float(pl[0]), 2), round(float(pl[1]), 2)]
        pi, pj = cell(np.array([pl[0]]), np.array([pl[1]]))
        out['leftUnderWater'] = bool(~ctx['cs'][pi[0], pj[0]])
        out['leftFlood'] = near(p, 'flood')         # the flooded ground (inside the margin)
        out['leftAnySea'] = near(p, 'any')          # anything outside the coastline
    qm = MD.q(out['merdithPlate'] or 101, ctx['mAge'])
    p = qmat(qm) @ x0; pl = lonlat(p); out['merdith'] = [round(float(pl[0]), 2), round(float(pl[1]), 2)]
    out['rightUnderWater'] = bool(ctx['painted'][i, j])
    pts = ctx['pts']['right']; r = near(p, 'right', True)
    if r:
        k = r.pop('k'); out['right'] = r
        s = ctx['Sp'][k].astype(float); m = pts[k]   # the same cell of sea, where each model puts it on the globe
        out['thatSeaApartKm'] = {'raw': round(float(km(s, m))), 'afterBestTurn': round(float(km(ctx['Rb'] @ s, m)))}
        if qs is not None: out['thatSeaFromHereOnScoteseKm'] = round(float(km(qmat(qs) @ x0, s)))
    return out

# ---------------------------------------------------------------- check the two readings of the plates against the survey's
rex = json.load(open(f'{CWD}/experiments/ancient-seas/trex.json'))
g0 = paleomap_grid(70); err = []
for f in rex['finds']:
    lon, lat = f['path'][-1]; i, j = cell(np.array([lon]), np.array([lat])); q = PM.q(int(g0[i[0], j[0]]), 70)
    if q is not None: err.append(float(km(qmat(q) @ xyz(lon, lat), xyz(*f['path'][0]))))
CARL = (-104.44, 32.18)
checks = {'findsAt70_vsWebService_km': {'n': len(err), 'median': round(float(np.median(err)), 1), 'max': round(float(np.max(err)), 1)},
          'carlsbad260_km': round(float(km(qmat(PM.q(101, 260)) @ xyz(*CARL), xyz(*rex['newMexico']['262']))), 1),
          'carlsbadMerdith262_km': round(float(km(qmat(MD.q(101, 262)) @ xyz(*CARL), xyz(*rex['newMexicoMerdith']['262']))), 1),
          'carlsbadMerdith70_km': round(float(km(qmat(MD.q(101, 70)) @ xyz(*CARL), xyz(*rex['newMexicoPathMerdith'][0]))), 1)}
print('checks', checks)

# ---------------------------------------------------------------- run
numbers = {'rotationFileHeader': PM.header, 'checks': checks, 'moments': {}, 'journey': {}}
meta = {'made': '2026-11-20', 'what': 'Kocsis and Scotese flooded ground (inside the continental margin, outside the coastline), carried to today on the PALEOMAP plates; pictures in today\'s longitude and latitude, 3600 x 1800, white where the ground was flooded', 'moments': {}, 'journey': []}
HELL = (-106.91, 47.32)   # Jordan, Montana: the Hell Creek country
for tag, sAge, mAge in (('262', 260, 262), ('080', 80, 80), ('069', 70, 69)):
    n, ctx = seas(tag, sAge, mAge, True)
    n['carlsbad'] = shore(ctx, *CARL)
    if tag != '262':
        n['hellCreek'] = shore(ctx, *HELL)
        fs = []
        for f in rex['finds']:
            lon, lat = f['path'][-1]; s = shore(ctx, lon, lat); s.update(occ=f['occ'], place=f['place'], doubt=f['doubt']); fs.append(s)
        n['finds'] = fs
    numbers['moments'][tag] = n
    nmS = lonlat(qmat(PM.q(101, sAge)) @ xyz(*CARL)); nmM = lonlat(qmat(MD.q(101, mAge)) @ xyz(*CARL))
    meta['moments'][tag] = {'file': f'seas-{tag}.png', 'scoteseAge': sAge, 'merdithAge': mAge, 'newMexico': [round(float(nmS[0]), 4), round(float(nmS[1]), 4)], 'newMexicoMerdith': [round(float(nmM[0]), 4), round(float(nmM[1]), 4)]}
    print(tag, json.dumps(n['km2']), n['bytes'])
for age in range(65, 0, -5):   # the journey's steps: the same carry at every five million years the record has a coastline for (it has none for 55)
    if not os.path.exists(f'{SP}/dl/coast/CS/{age}Ma_CS_v7.shp'): print(age, 'no coastline in the record'); continue
    n, _ = seas(f'{age:03d}', age, age, False); numbers['journey'][f'{age:03d}'] = n; meta['journey'].append(age)
    print(age, round(n['km2']['onTimeLabLand']), round(n['km2']['inTimeLabOcean']), n['bytes'])
json.dump(meta, open(f'{OUT}/seas.json', 'w'), separators=(',', ':'))
json.dump(numbers, open(NUMS, 'w'), indent=1)

# ---------------------------------------------------------------- the left Earth at 80 Ma, painted as the Nov 18 build painted the others
DEM = glob.glob(f'{SP}/dl/dem01/Scotese*_nc')[0]
SEA = [(-9000,'#22415f'),(-4000,'#33699a'),(-800,'#5793b4'),(-150,'#7fb0cc'),(0,'#93bed7')]
LAND = [(0,'#a3ad86'),(200,'#9aa882'),(800,'#a89a80'),(1800,'#9a9488'),(3500,'#8f8d90'),(11000,'#8f8d90')]
def hx(h): h = h.lstrip('#'); return [int(h[i:i+2], 16) for i in (0, 2, 4)]
def ramp(z, stops):
    xs = np.array([s[0] for s in stops], float); cs = np.array([hx(s[1]) for s in stops], float)
    return np.stack([np.interp(z, xs, cs[:, k]) for k in range(3)], -1)
def dem(age):
    f = h5py.File(glob.glob(f'{DEM}/*_{age}Ma.nc')[0], 'r'); z = f['z'][:].astype(np.float32); lat = f['latitude'][:]
    z = z[:, :-1]
    if lat[0] < lat[-1]: z = z[::-1]
    return z[:-1]
def paint(z, high=None):
    sea = z < 0
    img = np.where(sea[..., None], ramp(np.minimum(z, 0), SEA), ramp(np.maximum(z, 0), LAND))
    if high is not None:
        img = np.where((~high & ~sea)[..., None], np.array(hx('#93bed7'), float), img)
        img = np.where((high & sea)[..., None], np.array(hx(LAND[0][1]), float), img)
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8))
z = dem(80)
paint(z).save(f'{OUT}/earth-080.jpg', quality=84, optimize=True, progressive=True)
paint(z, shp_mask(f'{SP}/dl/coast/CS/80Ma_CS_v7.shp')).save(f'{OUT}/earth-080-high.jpg', quality=84, optimize=True, progressive=True)
def simplify(pts, tol):
    if len(pts) < 3: return pts
    if pts[0] == pts[-1] and len(pts) > 3:
        P = np.array(pts); k = int(np.argmax(np.hypot(*(P - P[0]).T)))
        return simplify(pts[:k + 1], tol)[:-1] + simplify(pts[k:], tol)
    keep = [0, len(pts) - 1]; stack = [(0, len(pts) - 1)]; P = np.array(pts)
    while stack:
        a, b = stack.pop()
        if b <= a + 1: continue
        A, B = P[a], P[b]; seg = B - A; L = np.hypot(*seg) or 1e-9
        V = P[a + 1:b] - A; d = np.abs(seg[0] * V[:, 1] - seg[1] * V[:, 0]) / L; i = int(np.argmax(d)) + a + 1
        if d[i - a - 1] > tol: keep.append(i); stack += [(a, i), (i, b)]
    return [pts[i] for i in sorted(set(keep))]
lines = []
for s in shapefile.Reader(f'{SP}/dl/coast/CS/80Ma_CS_v7.shp').shapes():
    idx = list(s.parts) + [len(s.points)]
    for a, b in zip(idx, idx[1:]):
        r = s.points[a:b]; cur = []
        for p, q in zip(r, r[1:]):
            edge = abs(p[0] - q[0]) > 180 or (abs(p[0]) >= 179.99 and abs(q[0]) >= 179.99) or (abs(p[1]) >= 89.9 and abs(q[1]) >= 89.9)
            if edge:
                if len(cur) > 1: lines.append(cur)
                cur = []
            else:
                if not cur: cur = [p]
                cur.append(q)
        if len(cur) > 1: lines.append(cur)
lines = [[[round(x, 2), round(y, 2)] for x, y in simplify([tuple(p) for p in l], 0.03)] for l in lines]
json.dump({'080': [l for l in lines if len(l) > 1]}, open(f'{OUT}/coasts-080.json', 'w'), separators=(',', ':'))
print({f: os.path.getsize(f'{OUT}/{f}') for f in sorted(os.listdir(OUT))})
