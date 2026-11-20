# The shallow seas for the Time lab (20 Nov 2026; Michael's word of 20 Nov, "bring the seas into the time lab this way",
# after Report-Survey-Ancient-Seas-02.md). The carry is Ancient-Seas-Nov20/build.py's, copied here and not changed:
# Kocsis and Scotese's flooded ground (inside their continental margin, outside their coastline) at an age, carried back
# to today on Scotese's plates (the PALEOMAP rotation file and plate polygons in the coastline record), as a picture in
# TODAY's longitudes and latitudes. The Time lab's pieces carry today's ground on Merdith's plates, so the picture rides
# them. What is new here is only the list of ages (every age the record has a coastline for, 5 to 535 Ma, 80 of them)
# and the packing: 1,800 x 900, three ages to a PNG, one in each of red, green and blue, oldest pictures last.
#
# Usage: build-seas.py <scratch> <out-dir>
#   <scratch>/dl/coast/{CS,CM}/   paleocoastlines_v7_shapefiles.zip, unpacked   (Zenodo 7994000)
#   <scratch>/dl/plates3/         paleomap_global_plate_model_v3.zip, unpacked  (the same record)
# Needs numpy, pyshp, pillow. Writes seas-00.png ... and seas.json into <out-dir>.
import sys, json, os, re, math
import numpy as np, shapefile
from PIL import Image, ImageDraw, ImageFilter
SP, OUT = sys.argv[1:3]
os.makedirs(OUT, exist_ok=True)
W, H, RE = 3600, 1800, 6371.0
D2R = math.pi / 180

def qpole(lat, lon, ang):
    la, lo, h = lat * D2R, lon * D2R, ang * D2R / 2
    s = math.sin(h)
    return np.array([math.cos(h), math.cos(la) * math.cos(lo) * s, math.cos(la) * math.sin(lo) * s, math.sin(la) * s])
def qmul(a, b):
    return np.array([a[0]*b[0]-a[1]*b[1]-a[2]*b[2]-a[3]*b[3], a[0]*b[1]+a[1]*b[0]+a[2]*b[3]-a[3]*b[2],
                     a[0]*b[2]-a[1]*b[3]+a[2]*b[0]+a[3]*b[1], a[0]*b[3]+a[1]*b[2]-a[2]*b[1]+a[3]*b[0]])
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

class Paleomap:   # Scotese's plates: the rotation file's total poles, each relative to a fixed plate, composed up the tree to 000
    def __init__(self, rot, gpml):
        self.seq = {}
        for line in open(rot, encoding='latin-1'):
            p = line.split('!')[0].split()
            if len(p) < 6: continue
            self.seq.setdefault(int(p[0]), []).append((float(p[1]), qpole(float(p[2]), float(p[3]), float(p[4])), int(p[5])))
        self.header = [l.split('!!')[1].strip() for l in open(rot, encoding='latin-1').read().split('\n')[:4]]
        txt = open(gpml, encoding='utf-8').read()
        self.polys = []
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
    def q(self, pid, t, depth=0):
        if pid == 0: return np.array([1.0, 0, 0, 0])
        k = (pid, t)
        if k not in self.cache:
            r = self.rel(pid, t) if depth < 30 else None
            up = self.q(r[1], t, depth + 1) if r else None
            self.cache[k] = qmul(up, r[0]) if up is not None else None
        return self.cache[k]

def fill(draw, pts, value):   # one outline on the grid; a ring across the dateline or round a pole drawn whole
    lon = np.array([p[0] for p in pts], float); lat = np.array([p[1] for p in pts], float)
    u = np.concatenate([[lon[0]], lon[0] + np.cumsum((np.diff(lon) + 180) % 360 - 180)])
    if abs(u[-1] - u[0]) > 180:
        pole = 90.0 if lat.mean() > 0 else -90.0
        u = np.concatenate([u, [u[-1], u[0]]]); lat = np.concatenate([lat, [pole, pole]])
    for k in (-2, -1, 0, 1, 2):
        x = (u + 360 * k + 180) * W / 360
        if x.max() < 0 or x.min() > W: continue
        draw.polygon(list(zip(x.tolist(), ((90 - lat) * H / 180).tolist())), fill=value)
def shp_mask(path):   # Kocsis and Scotese's rings, even-odd (a ring inside a ring is a hole)
    m = np.zeros((H, W), bool)
    for s in shapefile.Reader(path).shapes():
        idx = list(s.parts) + [len(s.points)]
        for a, b in zip(idx, idx[1:]):
            im = Image.new('1', (W, H), 0); ImageDraw.Draw(im).polygon([((x + 180) * W / 360, (90 - y) * H / 180) for x, y in s.points[a:b]], fill=1)
            m ^= np.array(im, bool)
    return m
LAT = 90 - (np.arange(H) + 0.5) * 180 / H; LON = -180 + (np.arange(W) + 0.5) * 360 / W
AREA = np.repeat(((180 / H * D2R * RE) ** 2 * np.cos(LAT * D2R))[:, None], W, 1)
LONG, LATG = np.meshgrid(LON, LAT); X0 = xyz(LONG, LATG)
def cell(lon, lat): return (np.clip(((90 - lat) * H / 180).astype(int), 0, H - 1), ((lon + 180) * W / 360).astype(int) % W)

PM = Paleomap(f'{SP}/dl/plates3/PALEOMAP_PlateModel.rot', f'{SP}/dl/plates3/PALEOMAP_PlatePolygons.gpml')
print('rotation file says:', PM.header[1:4])

def sea(t):   # today's ground that was flooded at age t: a picture 1,800 x 900, 0 to 255
    cs = shp_mask(f'{SP}/dl/coast/CS/{t}Ma_CS_v7.shp'); cm = shp_mask(f'{SP}/dl/coast/CM/{t}Ma_CM_v7.shp')
    flood = cm & ~cs
    im = Image.new('I', (W, H), 0); d = ImageDraw.Draw(im)
    for pid, b, e, pts in PM.polys:
        if b >= t >= e and PM.q(pid, t) is not None: fill(d, pts, pid)
    grid = np.array(im); S = np.full((H, W, 3), np.nan, np.float32)
    for pid in np.unique(grid):
        if pid == 0: continue
        m = grid == pid; S[m] = X0[m] @ qmat(PM.q(int(pid), t)).T
    ok = ~np.isnan(S[..., 0]); lo, la = lonlat(S[ok]); ii, jj = cell(lo, la)
    f0 = np.zeros((H, W), bool); f0[ok] = flood[ii, jj]
    pic = Image.fromarray((f0 * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)).resize((W // 2, H // 2), Image.LANCZOS)
    return pic, {'floodedKm2': round(float(AREA[flood].sum())), 'carriedKm2': round(float(AREA[f0].sum()))}

ages = sorted(int(m.group(1)) for f in os.listdir(f'{SP}/dl/coast/CS') for m in [re.match(r'(\d+)Ma_CS_v7\.shp$', f)] if m and int(m.group(1)) > 0
              and os.path.exists(f'{SP}/dl/coast/CM/{m.group(1)}Ma_CM_v7.shp'))
print(len(ages), 'ages', ages[0], 'to', ages[-1])
index = {'made': '2026-11-20',
         'what': 'Today\'s ground that lay under shallow sea at each age: Kocsis and Scotese\'s flooded ground (inside the continental margin, outside the coastline), carried to today on the PALEOMAP plates. Pictures in today\'s longitude and latitude, 1800 x 900, three ages to a picture (red, green, blue), 255 where the ground was flooded.',
         'credit': 'The shallow seas: Kocsis & Scotese 2021 (PaleoMAP PaleoCoastlines v7), CC BY 4.0',
         'ages': [], 'files': []}
numbers = {}
for k in range(0, len(ages), 3):
    trio = ages[k:k + 3]; chans = []
    for t in trio:
        pic, n = sea(t); chans.append(pic); numbers[t] = n; print(t, n)
    while len(chans) < 3: chans.append(Image.new('L', chans[0].size, 0))
    name = f'seas-{k // 3:02d}.png'; Image.merge('RGB', chans).save(f'{OUT}/{name}', optimize=True)
    index['files'].append(name)
    for c, t in enumerate(trio): index['ages'].append([t, k // 3, c])
json.dump(index, open(f'{OUT}/seas.json', 'w'), separators=(',', ':'))
json.dump(numbers, open(f'{OUT}/../seas-numbers.json', 'w'), indent=1)
print(sum(os.path.getsize(f'{OUT}/{f}') for f in os.listdir(OUT)) / 1e6, 'MB in', len(os.listdir(OUT)), 'files')
