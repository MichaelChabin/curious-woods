#!/usr/bin/env python3
"""ocean-volume.py — the water above each sea level, worked out once from ETOPO 2022, for the water
ball on the Drain the sea bench (18 Oct 2026, Michael's brief).

    python3 tools/ocean-volume.py      → cw-deploys/stories/curves/ocean-volume.json

For every sea level from today down to the deepest trench, every 10 m, the volume of water that lies
between today's surface and that level: the water she has taken out when the sea stands there. Not
area times depth: each cell of the 60 arc-second grid contributes its own area (cos latitude) times
the part of its depth that lies above the level, and only cells of the world ocean count (the largest
connected body below sea level, as render.py's ocean mask has it: the Caspian never drains). Fully
drained, the figure is the ocean's whole volume, to check against the published 1.33 to 1.34 billion
cubic kilometres. The ball's diameter is that of a sphere of the same volume.

Reads cw-deploys/_data/ETOPO_2022_v1_60s_N90W180_surface.nc through h5py in bands; needs numpy, scipy.
Also writes a small table of straight-line distances from Santa Fe to places a reader may know, from
their coordinates, for the one comparison the strip may add."""
import json, math, os, sys
import h5py
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..'))
SRC = os.path.join(ROOT, 'cw-deploys', '_data', 'ETOPO_2022_v1_60s_N90W180_surface.nc')
OUT = os.path.join(ROOT, 'cw-deploys', 'stories', 'curves', 'ocean-volume.json')
STEP = 10            # metres between levels
DEEPEST = 11000      # metres: past Challenger Deep
R_EARTH_KM = 6371.0088

SANTA_FE = (35.687, -105.938)
PLACES = [  # name, lat, lon — well-known places, their coordinates to the nearest hundredth of a degree
    ('Albuquerque', 35.08, -106.65), ('Denver', 39.74, -104.99), ('Phoenix', 33.45, -112.07), ('Dallas', 32.78, -96.80),
    ('Los Angeles', 34.05, -118.24), ('Chicago', 41.88, -87.63), ('Mexico City', 19.43, -99.13), ('Seattle', 47.61, -122.33),
    ('New York', 40.71, -74.01), ('Honolulu', 21.31, -157.86), ('London', 51.51, -0.13), ('Tokyo', 35.68, 139.69),
]


def great_circle_km(a, b):
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 2 * R_EARTH_KM * math.asin(math.sqrt(h))


def main():
    if not os.path.exists(SRC):
        sys.exit('missing %s' % SRC)
    from scipy.ndimage import label
    with h5py.File(SRC, 'r') as f:
        lat = np.asarray(f['lat'], np.float64); lon = np.asarray(f['lon'], np.float64)
        nrow, ncol = f['z'].shape
        dlat = abs(lat[1] - lat[0]); dlon = abs(lon[1] - lon[0])
        # the ocean mask, as render.py makes it: the largest connected body below sea level
        below = np.zeros((nrow, ncol), bool)
        for a in range(0, nrow, 1080):
            below[a:a + 1080] = np.asarray(f['z'][a:a + 1080], np.float32) < 0
        lab, n = label(below)
        sizes = np.bincount(lab.ravel()); sizes[0] = 0
        ocean = lab == int(np.argmax(sizes))
        del lab, below
        # area-weighted histogram of depth in 1 m bins, in km²
        cell_km2_eq = (R_EARTH_KM * math.radians(dlat)) * (R_EARTH_KM * math.radians(dlon))
        hist = np.zeros(DEEPEST + 2, np.float64)
        for a in range(0, nrow, 1080):
            z = np.asarray(f['z'][a:a + 1080], np.float32)
            oc = ocean[a:a + 1080]
            w = (cell_km2_eq * np.cos(np.radians(lat[a:a + 1080])))[:, None] * np.ones((1, ncol))
            depth = np.clip(-z, 0, DEEPEST)
            d = np.where(oc & (z < 0), depth, -1)
            idx = np.floor(d[d >= 0]).astype(np.int64)
            hist += np.bincount(idx, weights=w[d >= 0], minlength=DEEPEST + 2)[:DEEPEST + 2]
    area_km2 = hist.sum()
    # V(L): water between today's surface and level L = Σ over bins of area × min(depth, L), depth in km
    bins = np.arange(DEEPEST + 2) + 0.5          # the bin's middle depth
    points = []
    for L in range(0, DEEPEST + 1, STEP):
        v = float((hist * np.minimum(bins, L) / 1000.0).sum())   # km³
        d = (6 * v / math.pi) ** (1 / 3) if v > 0 else 0.0
        points.append([L, round(v), round(d, 1)])
    total = points[-1][1]
    distances = [{'place': n, 'km': round(great_circle_km(SANTA_FE, (la, lo)))} for n, la, lo in PLACES]
    distances.sort(key=lambda x: x['km'])
    out = {
        '_about': 'The water taken out of the sea when it is lowered to each level, every 10 metres from today to the deepest trench, as a volume and as the diameter of a ball of that volume, for the water ball on experiments/maps/drain-the-sea-bench.html. Each point [metres lower than today, cubic kilometres of water above that level, diameter of the ball in kilometres]. Worked out from ETOPO 2022 by tools/ocean-volume.py: every cell of the 60 arc-second grid gives its own area times the part of its depth above the level, only cells of the world ocean counting (the largest connected body below sea level, so the Caspian and the Dead Sea are left out). Fully drained the figure is the ocean’s whole volume. The distances are straight lines over the ground from Santa Fe, from the places’ coordinates, for the one comparison the strip may add; nothing not in this table is to be said.',
        'source': 'ETOPO 2022 v1, 60 arc-second ice-surface grid (NOAA NCEI), public domain',
        'method': 'area-weighted histogram of depth in 1 m bins; V(L) = sum over bins of area × min(depth, L); the ball is the sphere of the same volume',
        'version': '2026-10-18',
        'ocean_area_km2': round(area_km2),
        'total_km3': total,
        'published_total_km3': 1335000000,
        'published_note': 'Charette and Smith (2010), The volume of Earth’s ocean, Oceanography 23(2), give 1.3324 billion km³; Eakins and Sharman (2010, NOAA NGDC, from ETOPO1) 1.335 billion; the figure here is the same grid a generation later, with the ice shelves’ water left out where the surface grid shows ice',
        'santa_fe': {'lat': SANTA_FE[0], 'lon': SANTA_FE[1]},
        'distances_from_santa_fe': distances,
        'points': points,
    }
    with open(OUT, 'w') as fh:
        json.dump(out, fh, indent=1, ensure_ascii=False)
    for L in (130, 2500, 3700, DEEPEST):
        p = points[L // STEP]
        print('%6d m lower: %14s km³  ball %7.1f km across' % (p[0], format(p[1], ','), p[2]))
    print('ocean area %s km²; total %s km³ (published about 1,335,000,000: %.1f%% off)' % (format(round(area_km2), ','), format(total, ','), 100 * (total - 1335e6) / 1335e6))
    print('wrote', OUT)


if __name__ == '__main__':
    main()
