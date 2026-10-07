#!/usr/bin/env python3
"""
plates-from-gplates.py — the continents in motion, for the Time Machine's deep-time globe.

Stage 1 of CWVault/claude/Plan-Deep-Time.md. Reads an EarthByte plate model through
pyGPlates and writes stories/plates/continents.json: the pieces of continent as they are
today, each with its plate and the years it exists, and every plate's rotation sampled
through time, so a page can turn each living piece to where it was in any year and draw
it there. True motion, not stills (Michael, 6 Oct 2026).

Usage (from the project root):
    python3 tools/plates-from-gplates.py                       # writes the JSON, runs the checks
    python3 tools/plates-from-gplates.py --png /tmp/plates     # also draws proof pictures
Needs:  pip install pygplates plate-model-manager   (Pillow for --png)
The model (about 100 MB) is fetched once into --cache (default ~/Library/Caches/cw-plate-models).

The file it writes:
  ages    the sampled ages in millions of years ago: every --step to --deep-from, then every --deep-step
  pieces  [{id, name, type, plate, from, to, rings:[[lon,lat,lon,lat,...], ...]}]   present-day coordinates
          from/to in millions of years ago (from is the older end; 'to' 0 means it is here today)
  plates  {plate: {first, rot:[[lat, lon, angle], ...]}}   finite rotation from today to ages[first + i],
          about the pole (lat, lon) by angle degrees, in the model's absolute frame (paleomagnetic for Merdith 2021)
  grades  how sure the positions are, by age, with the reason — the fog line's data
Rotations are stored only for the ages a plate has a living piece. Between samples a page
interpolates as a rotation (slerp of the quaternions), not number by number.
"""
import argparse, json, math, os, sys, time, collections

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--model', default='merdith2021')
    ap.add_argument('--cache', default=os.path.expanduser('~/Library/Caches/cw-plate-models'))
    ap.add_argument('--out', default='cw-deploys/stories/plates/continents.json')
    ap.add_argument('--step', type=float, default=5)          # Ma, recent
    ap.add_argument('--deep-from', type=float, default=540)   # Ma, where the deep step begins
    ap.add_argument('--deep-step', type=float, default=10)    # Ma, deep
    ap.add_argument('--simplify', type=float, default=0.75)   # degrees, Douglas–Peucker tolerance
    ap.add_argument('--png', default=None, help='directory for proof pictures (equirectangular)')
    ap.add_argument('--png-ages', default='0,70,200,540,750')
    a = ap.parse_args()

    import pygplates
    from plate_model_manager import PlateModelManager
    t0 = time.time()
    model = PlateModelManager().get_model(a.model, data_dir=a.cache)
    rot_files = model.get_rotation_model()
    poly_files = model.get_layer('ContinentalPolygons')
    rot = pygplates.RotationModel(rot_files)
    feats = []
    for pf in poly_files: feats.extend(pygplates.FeatureCollection(pf))
    big = model.get_big_time()
    print(f'model {a.model}: {len(feats)} continental features, reach {big} Ma, {time.time()-t0:.1f}s')

    # ---- ages ----
    ages = []
    x = 0.0
    while x < a.deep_from - 1e-9: ages.append(round(x, 3)); x += a.step
    x = a.deep_from
    while x <= big + 1e-9: ages.append(round(x, 3)); x += a.deep_step
    if ages[-1] != big: ages.append(float(big))

    # ---- pieces ----
    TYPE = {'ClosedContinentalBoundary': 'continent', 'Craton': 'craton', 'ContinentalFragment': 'fragment',
            'PassiveContinentalBoundary': 'margin', 'TerraneBoundary': 'terrane', 'IslandArc': 'arc',
            'Coastline': 'coast', 'InferredPaleoBoundary': 'inferred', 'UnclassifiedFeature': 'other'}
    pieces, fids, raw_pts, kept_pts = [], [], 0, 0
    for f in feats:
        b, e = f.get_valid_time()
        frm = 4567.0 if math.isinf(b) else b    # the piece's real birth age, past the model's reach too (7 Oct): a craton born at 2.6 Ga is drawn, placed at random, when the year is older than the model
        to = 0.0 if (math.isinf(e) or e < 0) else e
        if frm <= to: continue
        rings = []
        for g in f.get_geometries():
            if not isinstance(g, pygplates.PolygonOnSphere): continue
            pts = [p.to_lat_lon() for p in g.get_points()]
            raw_pts += len(pts)
            s = simplify([(lon, lat) for lat, lon in pts], a.simplify)
            if len(s) < 3: continue
            kept_pts += len(s)
            flat = []
            for lon, lat in s: flat.extend((round(lon, 2), round(lat, 2)))
            rings.append(flat)
        if not rings: continue
        fids.append(f.get_feature_id().get_string())
        pieces.append({'id': len(pieces), 'name': f.get_name() or '', 'type': TYPE.get(f.get_feature_type().get_name(), 'other'),
                       'plate': f.get_reconstruction_plate_id(), 'from': round(frm, 1), 'to': round(to, 1), 'rings': rings})
    print(f'pieces {len(pieces)}, points {raw_pts} -> {kept_pts} at {a.simplify} deg')

    # ---- rotations, only while a plate has a living piece ----
    alive = collections.defaultdict(lambda: [big, 0.0])   # plate -> [youngest 'to', oldest 'from']
    for p in pieces:
        r = alive[p['plate']]; r[0] = min(r[0], p['to']); r[1] = max(r[1], p['from'])
    plates = {}
    n_rot = 0
    for pid, (young, old) in alive.items():
        first = next(i for i, t in enumerate(ages) if t >= young - 1e-9)
        last = max(i for i, t in enumerate(ages) if t <= old + 1e-9)
        if first > 0: first -= 1          # one sample either side, so interpolation reaches the ends
        if last < len(ages) - 1: last += 1
        rows = []
        for i in range(first, last + 1):
            fr = rot.get_rotation(ages[i], pid, anchor_plate_id=0)
            lat, lon, ang = fr.get_lat_lon_euler_pole_and_angle_degrees()
            rows.append([round(lat, 3), round(lon, 3), round(ang, 3)])
        plates[str(pid)] = {'first': first, 'rot': rows}
        n_rot += len(rows)
    print(f'plates {len(plates)}, rotation samples {n_rot}')

    # the five words of knowing (Michael and Claude, 7 Oct 2026): measured, inferred, fitted, guessed, invented;
    # the first three are the model's, by age; the page adds guessed (the real cratons placed at random past
    # the model's reach), invented (random land from the amount curve before the oldest rock) and none
    grades = [
        {'to': 200,  'grade': 'measured', 'why': 'the seafloor still carries its magnetic stripes, so the plates can be run backwards and measured'},
        {'to': 540,  'grade': 'inferred', 'why': 'rock magnetism and fossils give how far north each piece was, not how far east; the east-west positions are one best estimate'},
        {'to': big,  'grade': 'fitted',   'why': 'the pieces are real and still exist; how they fitted together is argued from scattered evidence, and the models disagree'},
    ]
    out = {
        '_about': 'The continents in motion, for the Time Machine (CWVault/claude/Plan-Deep-Time.md, Stage 1). '
                  'pieces are present-day outlines with a plate and a lifetime in millions of years ago; plates hold each plate\'s finite rotation '
                  '(pole lat, lon, angle in degrees) from today to each sampled age, starting at ages[first]. To draw a year: for every piece alive, '
                  'take its plate\'s rotation at that age (slerp between samples), turn every point of its rings, project. Made by tools/plates-from-gplates.py.',
        'source': {'model': a.model, 'citation': 'Merdith, A.S. et al. (2021), Extending full-plate tectonic models into deep time: Linking the Neoproterozoic and the Phanerozoic, Earth-Science Reviews 214, 103477',
                   'url': 'https://doi.org/10.5281/zenodo.10346399', 'licence': 'CC BY 4.0 (EarthByte)',
                   'frame': 'paleomagnetic: latitude is meaningful, longitude is unconstrained before the seafloor record', 'generated': time.strftime('%Y-%m-%d')},
        'howSure': 'see grades; positions measured to 200 Ma, inferred (latitude only) to 540, fitted to the model\'s reach; beyond it the page guesses, and before the oldest rock it invents',
        'units': {'ages': 'millions of years ago', 'rings': 'lon, lat in degrees, flat pairs', 'rot': 'pole lat, pole lon, angle, degrees'},
        'reach': big, 'ages': ages, 'grades': grades, 'pieces': pieces, 'plates': plates,
    }
    os.makedirs(os.path.dirname(a.out), exist_ok=True)
    with open(a.out, 'w') as fh: json.dump(out, fh, separators=(',', ':'))
    size = os.path.getsize(a.out)
    import gzip
    gz = len(gzip.compress(open(a.out, 'rb').read(), 6))
    print(f'wrote {a.out}: {size/1e6:.2f} MB, {gz/1e6:.2f} MB gzipped')

    # ---- checks: the file's own numbers must reproduce pyGPlates ----
    data = json.load(open(a.out))
    worst = 0.0
    for age in (70, 200, 450, 700):
        recon = []
        pygplates.reconstruct(feats, rot, recon, age)
        want = {}
        for r in recon:
            key = r.get_feature().get_feature_id().get_string()
            g = r.get_reconstructed_geometry()
            if isinstance(g, pygplates.PolygonOnSphere): want.setdefault(key, []).append([p.to_lat_lon() for p in g.get_points()])
        n = 0
        for p in data['pieces']:
            if not (p['to'] <= age <= p['from']): continue
            key = fids[p['id']]
            if key not in want: continue
            q = rotation_at(data, p['plate'], age)
            if q is None: continue
            # the first ring's first point survives simplification; a feature with several rings
            # comes back from pyGPlates in no fixed order, so take the nearest of its rings' first points
            lon, lat = p['rings'][0][0], p['rings'][0][1]
            got = rotate((lon, lat), q)
            d = min(angular(got, (exp[0][1], exp[0][0])) for exp in want[key])
            worst = max(worst, d); n += 1
        print(f'check {age} Ma: {n} pieces compared, worst so far {worst:.4f} deg')
    print('CHECK', 'ok' if worst < 0.02 else 'FAILED', f'(worst {worst:.4f} deg; the rounding of poles to 0.001 deg allows ~0.01)')
    # India
    q = rotation_at(data, 5011, 70)
    print('India (23N 78E) at 70 Ma by the file:', [round(v, 2) for v in rotate((78, 23), q)], '(lon, lat); pyGPlates says', [round(v, 2) for v in (rot.get_rotation(70, 5011) * pygplates.PointOnSphere(23, 78)).to_lat_lon()[::-1]])

    if a.png:
        draw_png(data, a.png, [float(x) for x in a.png_ages.split(',')])

# ---- the arithmetic a page will do (kept here so the check uses the file alone) ----
def to_xyz(lon, lat):
    la, lo = math.radians(lat), math.radians(lon)
    return (math.cos(la) * math.cos(lo), math.cos(la) * math.sin(lo), math.sin(la))
def to_lonlat(v):
    x, y, z = v
    return (math.degrees(math.atan2(y, x)), math.degrees(math.asin(max(-1, min(1, z)))))
def quat(lat, lon, ang):
    ax = to_xyz(lon, lat); h = math.radians(ang) / 2; s = math.sin(h)
    return (math.cos(h), ax[0] * s, ax[1] * s, ax[2] * s)
def slerp(q0, q1, t):
    d = sum(x * y for x, y in zip(q0, q1))
    if d < 0: q1 = tuple(-x for x in q1); d = -d
    if d > 0.9995:
        q = tuple(a + t * (b - a) for a, b in zip(q0, q1)); n = math.sqrt(sum(x * x for x in q)); return tuple(x / n for x in q)
    th = math.acos(d); s = math.sin(th)
    return tuple((math.sin((1 - t) * th) * a + math.sin(t * th) * b) / s for a, b in zip(q0, q1))
def rotation_at(data, plate, age):
    P = data['plates'].get(str(plate))
    if not P: return None
    ages = data['ages']; f = P['first']; rows = P['rot']
    idx = [i for i in range(f, f + len(rows))]
    if age <= ages[idx[0]]: return quat(*rows[0])
    if age >= ages[idx[-1]]: return quat(*rows[-1])
    for k in range(len(idx) - 1):
        a0, a1 = ages[idx[k]], ages[idx[k + 1]]
        if a0 <= age <= a1:
            t = 0 if a1 == a0 else (age - a0) / (a1 - a0)
            return slerp(quat(*rows[k]), quat(*rows[k + 1]), t)
def rotate(lonlat, q):
    w, x, y, z = q; px, py, pz = to_xyz(*lonlat)
    # v' = v + 2w(u×v) + 2u×(u×v), u = (x,y,z)
    cx, cy, cz = y * pz - z * py, z * px - x * pz, x * py - y * px
    dx, dy, dz = y * cz - z * cy, z * cx - x * cz, x * cy - y * cx
    return to_lonlat((px + 2 * w * cx + 2 * dx, py + 2 * w * cy + 2 * dy, pz + 2 * w * cz + 2 * dz))
def angular(a, b):
    va, vb = to_xyz(*a), to_xyz(*b)
    return math.degrees(math.acos(max(-1, min(1, sum(x * y for x, y in zip(va, vb))))))

def simplify(pts, tol):
    """Douglas–Peucker on a closed ring in degrees, longitude scaled by cos(mean latitude)."""
    if len(pts) < 4: return pts
    c = math.cos(math.radians(sum(p[1] for p in pts) / len(pts))) or 1e-6
    P = [(p[0] * c, p[1]) for p in pts]
    keep = [False] * len(P); keep[0] = keep[-1] = True
    stack = [(0, len(P) - 1)]
    while stack:
        i, j = stack.pop()
        if j <= i + 1: continue
        ax, ay = P[i]; bx, by = P[j]; dx, dy = bx - ax, by - ay; L = math.hypot(dx, dy)
        best, bi = -1, -1
        for k in range(i + 1, j):
            px, py = P[k]
            d = abs(dx * (ay - py) - dy * (ax - px)) / L if L else math.hypot(px - ax, py - ay)
            if d > best: best, bi = d, k
        if best > tol: keep[bi] = True; stack.append((i, bi)); stack.append((bi, j))
    return [p for p, k in zip(pts, keep) if k]

def draw_png(data, outdir, png_ages):
    from PIL import Image, ImageDraw
    os.makedirs(outdir, exist_ok=True)
    W, H = 1440, 720
    for age in png_ages:
        im = Image.new('RGB', (W, H), (214, 226, 236)); dr = ImageDraw.Draw(im)
        for x in range(0, W, 120): dr.line([(x, 0), (x, H)], fill=(200, 212, 222))
        for y in range(0, H, 120): dr.line([(0, y), (W, y)], fill=(200, 212, 222))
        grade = next(g['grade'] for g in data['grades'] if age <= g['to'])
        col = {'crisp': (120, 110, 80), 'latitude': (150, 140, 110), 'ghost': (180, 172, 150)}[grade]
        n = 0
        for p in data['pieces']:
            if not (p['to'] <= age <= p['from']): continue
            q = rotation_at(data, p['plate'], age)
            if q is None: continue
            for ring in p['rings']:
                poly = []
                for i in range(0, len(ring), 2):
                    lon, lat = rotate((ring[i], ring[i + 1]), q)
                    poly.append(((lon + 180) / 360 * W, (90 - lat) / 180 * H))
                # a ring that straddles the date line would smear; draw it only if its span is sane
                xs = [x for x, _ in poly]
                if max(xs) - min(xs) < W * 0.6: dr.polygon(poly, fill=col, outline=(90, 80, 60))
            n += 1
        dr.text((12, 10), f'{age:g} million years ago  ·  {n} pieces  ·  {grade}', fill=(40, 40, 40))
        fn = os.path.join(outdir, f'plates-{age:g}.png'); im.save(fn); print('drew', fn)

if __name__ == '__main__':
    main()
