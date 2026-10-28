#!/usr/bin/env python3
"""blue-marble-tiles.py — Blue Marble: Next Generation, July 2004, land only, at 500 m a pixel, as a tile pyramid in
the map's tiling (art/maps/world-pyramid.json: level z is 2^(z+1) columns by 2^z rows of 512-pixel equirectangular
tiles, column 0 at 180° W, row 0 at the north). For the Earth bench's close in (Spec-Earth-3D step 5; Michael's prompt
Prompt-Build-Earth-Bench-05.md, 28 Oct 2026).

The source: NASA's eight pieces, world.200407.3x21600x21600.{A1,B1,C1,D1,A2,B2,C2,D2}.jpg, each 90° by 90° at
21,600 pixels (A to D west to east from 180° W, 1 north and 2 south), 86,400 by 43,200 for the world, 463 m a pixel at
the equator. Downloaded once into cw-deploys/_data/blue-marble/500m/ (ignored, never committed) from
assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/july/.

Levels 0 to 6. Level 6 is 65,536 by 32,768 (611 m a pixel), one deeper than the map's pyramid; the source holds it
(0.76 of a source pixel to a tile pixel). A level 7 would be 1.5 times the source and invent detail, so there is none.

Each piece is resized with Lanczos to its size at level 6 (16,384 px), then halved with Lanczos for each level up;
level 0 is made from level 1's tiles. The sea: a pixel the Earth's shader reads as sea (blue leads red by a fifth and
leads green, or the channels sum under 70 with blue at least red: buildMask's test in js/3d/earth.js) is never shown
as its colour (it is painted as the shelf wash over our sea), so it is written as one flat dark blue, SEA_FLAT, which
the same test reads as sea; the tiles are smaller for it and nothing shown changes. A tile that is all sea is not
written at all, and the index lists the tiles that exist, as the map's layers list theirs; where there is no tile the
Earth reads the coarser picture, whose sea is sea too.

  python3 -I tools/blue-marble-tiles.py SRC_DIR OUT_DIR [--quality 80] [--jobs 4]

Writes OUT_DIR/{z}/{x}/{y}.webp and OUT_DIR/blue-marble.json (the levels and the tiles that exist)."""
import json, os, sys, time
from concurrent.futures import ProcessPoolExecutor
import numpy as np
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
TILE = 512
TOP = 6                       # the deepest level
SEA_FLAT = (4, 8, 26)         # the sea's pixels, flattened: blue leads, so the shader's test reads them as sea
PIECES = [('A1', 0, 0), ('B1', 1, 0), ('C1', 2, 0), ('D1', 3, 0), ('A2', 0, 1), ('B2', 1, 1), ('C2', 2, 1), ('D2', 3, 1)]


def sea_of(a):
    r, g, b = a[..., 0].astype(np.int32), a[..., 1].astype(np.int32), a[..., 2].astype(np.int32)
    blue_leads = (b * 10 > r * 12) & (b > g)
    return blue_leads | ((r + g + b < 70) & (b >= r))


def write_tile(img, path, quality):
    a = np.asarray(img).copy()
    sea = sea_of(a)
    if sea.all():
        return None
    a[sea] = SEA_FLAT
    os.makedirs(os.path.dirname(path), exist_ok=True)
    Image.fromarray(a).save(path, 'WEBP', quality=quality, method=6)
    return os.path.getsize(path)


def do_piece(args):
    src_dir, out, name, pc, pr, quality = args
    t0 = time.time()
    im = Image.open(os.path.join(src_dir, f'world.200407.3x21600x21600.{name}.jpg')).convert('RGB')
    made = {}
    size = TILE * (1 << TOP) // 2            # the piece at level 6: 90° of 360° at 2^(TOP+1) tiles
    cur = im.resize((size, size), Image.LANCZOS)
    del im
    for z in range(TOP, 0, -1):
        n = cur.width // TILE                 # tiles across the piece at this level
        for ty in range(n):
            for tx in range(n):
                x, y = pc * n + tx, pr * n + ty
                b = write_tile(cur.crop((tx * TILE, ty * TILE, (tx + 1) * TILE, (ty + 1) * TILE)), os.path.join(out, str(z), str(x), f'{y}.webp'), quality)
                if b is not None:
                    made.setdefault(z, {})[f'{x}/{y}'] = b
        if z > 1:
            cur = cur.resize((cur.width // 2, cur.height // 2), Image.LANCZOS)
        else:
            cur.save(os.path.join(out, f'_piece-{name}-1.png'))   # level 1's one tile, for level 0
    return name, made, time.time() - t0


def main():
    src_dir, out = sys.argv[1], sys.argv[2]
    quality = int(sys.argv[sys.argv.index('--quality') + 1]) if '--quality' in sys.argv else 80
    jobs = int(sys.argv[sys.argv.index('--jobs') + 1]) if '--jobs' in sys.argv else 4
    os.makedirs(out, exist_ok=True)
    have = {}
    with ProcessPoolExecutor(jobs) as ex:
        for name, made, s in ex.map(do_piece, [(src_dir, out, n, pc, pr, quality) for n, pc, pr in PIECES]):
            print(f'{name}: {s:.0f} s', flush=True)
            for z, d in made.items():
                have.setdefault(z, {}).update(d)
    # level 0: two tiles, each 180° by 180°, from four of level 1's
    for x in range(2):
        m = Image.new('RGB', (TILE * 2, TILE * 2))
        for dx in range(2):
            for y in range(2):
                p = os.path.join(out, f'_piece-{"ABCD"[x * 2 + dx]}{y + 1}-1.png')
                m.paste(Image.open(p), (dx * TILE, y * TILE))
        b = write_tile(m.resize((TILE, TILE), Image.LANCZOS), os.path.join(out, '0', str(x), '0.webp'), quality)
        if b is not None:
            have.setdefault(0, {})[f'{x}/0'] = b
    for f in os.listdir(out):
        if f.startswith('_piece-'):
            os.remove(os.path.join(out, f))
    levels = []
    for z in range(TOP + 1):
        cols, rows = 2 << z, 1 << z
        levels.append({'z': z, 'cols': cols, 'rows': rows, 'width': cols * TILE, 'height': rows * TILE,
                       'metres_per_pixel_equator': round(40075016.7 / (cols * TILE)),
                       'tiles': len(have.get(z, {})), 'bytes': sum(have.get(z, {}).values())})
    index = {
        'name': 'blue-marble', 'west': -180.0, 'south': -90.0, 'east': 180.0, 'north': 90.0, 'tile': TILE,
        'source': 'Blue Marble: Next Generation, July 2004, land surface (world.200407), 500 m; NASA Earth Observatory (Reto Stöckli, NASA Goddard Space Flight Center)',
        'sea': 'a pixel buildMask reads as sea is written as one flat dark blue ' + str(list(SEA_FLAT)) + '; a tile that is all sea is not written',
        'quality': quality, 'levels': levels,
        'tiles': {str(z): sorted(have.get(z, {}).keys(), key=lambda k: (int(k.split('/')[1]), int(k.split('/')[0]))) for z in range(TOP + 1)}
    }
    with open(os.path.join(out, 'blue-marble.json'), 'w') as f:
        json.dump(index, f, separators=(',', ':'))
    for L in levels:
        print(f"level {L['z']}: {L['tiles']} of {L['cols'] * L['rows']} tiles, {L['bytes'] / 1e6:.1f} MB")


if __name__ == '__main__':
    main()
