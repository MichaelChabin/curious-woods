#!/usr/bin/env python3
"""render.py — makes one base picture for a Curious Woods map.

    python3 render.py <region> <west> <south> <east> <north> [--width 2000]
                      [--exaggeration 1] [--levels 0,-200]

    python3 render.py world -180 -90 180 90 --exaggeration 3
    python3 render.py western-europe -11 42 20 58
    python3 render.py japan 123 29 147 46

Reads ETOPO 2022 (NOAA NCEI; public domain) from cw-deploys/_data/ — the 60 arc-second
grids for `world`, the 30 arc-second grids for everything else, and for each resolution
both the ice-surface grid and the bedrock grid — crops the box, projects it, colours it by
height and nothing else, shades it faintly, and writes these files into
cw-deploys/art/maps/:

    <region>.webp             the picture, quality 85, `--width` pixels wide: height alone
    <region>.json             name, the four corners, the standard parallel, pixel size,
                              the vertical exaggeration, the layers, and the contours
    <region>-ice.webp         a layer, half the picture's width, RGBA lossless: the ice
                              ramp by surface height with the base's own relief, opaque
                              where ice thickness is above zero, transparent elsewhere
    <region>-vegetation.webp  a layer, half width, RGB: one quiet green mixed toward
                              white by tree cover, so that multiplied over the base white
                              is nothing and full cover is the green at its strength;
                              written only when the land-cover grid is in _data/
    <region>-height.png       the same crop at 512 px wide; (ice-surface height in metres
                              + 11000) as a 16-bit value, high byte in red, low byte in
                              green, blue empty. Nothing reads it today. It is the
                              sea-level slider's food.

    python3 render.py --all   re-renders every region in art/maps/ from its own JSON

The ground has layers (Spec-Maps, 26 Sep 2026): height is the base and always present;
ice, vegetation and later sea level are files beside the picture that map.js draws over
it and a story can leave off or swap. So the base ignores the ice entirely, and the ice
is its own picture.

Projection: equirectangular with the standard parallel at the region's mid-latitude
(0 for `world`). That fixes only the picture's height-to-width ratio; inside the box
longitude is linear in x and latitude is linear in y, which is all map.js needs.

Contours, as vectors (third pass, 20 Sep 2026). After the height grid is sampled at the
picture's resolution, the contours at each of `--levels` (metres; 0 and -200 by default —
the coast and the shelf edge) are traced with contourpy (marching squares, the engine
matplotlib uses), simplified with Douglas-Peucker to half a pixel, converted to
longitude and latitude, and written into the region's JSON as
    "contours": { "0": [ [[lon, lat], ...], ... ], "-200": [ ... ] }
map.js draws them in SVG with a non-scaling stroke, so they stay one pixel in a window
map. Rings shorter than MIN_RING_PX after simplification are dropped: a two-pixel islet
is a speck the picture already shows. Other heights are the same call with another
level, which is how the sea-level work arrives later.

Shading is 0.35 over land and ice and half that over water (the sea floor's ridges and
fracture zones are noise at this scale), with the heights multiplied by a per-region
vertical exaggeration before the slope is taken: 3 for `world`, where the earth is
smoother than a billiard ball, 1 for a regional map. It is recorded in the JSON.

The longitude/latitude-to-pixel conversion lives in one named pair, to_pixel and
to_lonlat, and nowhere else. A map lab with a globe in it would swap that pair for a
projection; nothing else here would change.

Ice is not a height. Ice thickness is ice surface minus bedrock; where it is above zero
the ice layer is opaque and takes the ice ramp, so Greenland is white because it is
white. The two grids must share one registration for the subtraction to mean anything;
the script checks and refuses if they do not.

Vegetation is tree cover, from the Copernicus Global Land Cover 100 m tree-cover fraction
for 2019 (Zenodo record 3939050, public), read in a window through rasterio and
block-averaged onto the layer's pixels. Sea and no-data are transparent.

Nothing else goes on the image: no coastline stroke, no labels, no graticule, no border.
Spec: CWVault/claude/Spec-Maps.md. Needs numpy, scipy, h5py, Pillow (with WebP),
contourpy; rasterio for the vegetation layer.
"""

import json
import math
import os
import sys

import contourpy
import h5py
import numpy as np
from PIL import Image
from scipy.ndimage import map_coordinates

# ---------------------------------------------------------------------------------
# The judgment calls, at the top where they can be argued with.
#
# Three families that never borrow from each other (Spec-Maps, "The ground colours"):
# the earth is buff, ochre, grey, violet-grey, white and blue; the story's hand is
# vermilion (map.js); a named thing is a green or violet wash (map.js). Nothing in the
# earth's colours is red or green. The land ramp runs warm at the bottom and cool at the
# top — low ground comes forward, high ground recedes — and the shore buff is one step
# darker than the page's paper (#f4f1e8) so the map lies on the page as an object.
# Breakpoints are not evenly spaced because the earth is not: most land is under 500 m,
# most sea floor is between 3 000 and 6 000 m down.
LAND_STOPS = [
    (0,     '#e6dfcb'),   # the shore: buff, one step under the paper
    (250,   '#d8cdaa'),   # plains
    (800,   '#c3ab80'),   # uplands: ochre
    (1600,  '#a89a80'),
    (2400,  '#8f8d90'),   # mountains: grey going violet
    (3200,  '#aeb0b8'),
    (4800,  '#e8ecee'),   # peaks: white. The spec's 4 200 painted the whole Tibetan
    (6000,  '#f2f5f6'),   # plateau white, which reads as an ice sheet; lifted 600 m.
]
# Ice, by the height of its surface. Lighter than the paper and slightly cool, so white
# reads as snow rather than as a picture that failed to load.
ICE_STOPS = [
    (0,     '#dfe7ec'),
    (1200,  '#eaf1f4'),
    (3000,  '#f6fafb'),
]
# The sea keeps Hokusai's Prussian blues with the floor lifted (the first pass was near
# black at depth and a world map came out mostly night). The sea stops short of paper
# (third pass, 20 Sep): the second pass ran almost to white at the shoreline, low land is
# paper-coloured, and the two met at the coast and cancelled each other — Japan showed
# it. The shelf still lightens shoreward; it no longer arrives at the beach's value.
SEA_STOPS = [
    (-9000, '#22415f'),   # the deepest water; trenches below this stay this colour
    (-4000, '#33699a'),   # abyssal plains
    (-800,  '#5793b4'),   # the continental slope
    (-150,  '#7fb0cc'),   # the shelf edge
    (0,     '#93bed7'),   # the shore
]
# Ice thickness above this, in metres, is painted as ice. Zero means any ice at all.
ICE_MIN_THICKNESS = 0.0

# The layers sit beside the picture at this width (half the picture's, at the default).
LAYER_WIDTH = 1000
# Vegetation: one green, multiplied over the base with alpha proportional to tree
# cover. Quiet on purpose — the wash green (#33663f, a named thing) is a different mark
# and must stay distinguishable, and the ochre and the vermilion must survive the layer.
# Full tree cover reaches VEGETATION_STRENGTH of the green; a multiply at that alpha
# leaves the relief and the ramp showing through.
VEGETATION_GREEN = '#66905a'
VEGETATION_STRENGTH = 0.55
VEGETATION_SOURCE = 'PROBAV_LC100_global_v3.0.1_2019-nrt_Tree-CoverFraction-layer_EPSG-4326.tif'
VEGETATION_NODATA = 255

# Hillshade: sun from the north-west, 45° up, multiplied into the colour at this
# strength. 0 is a flat print; 1 is a grey relief model. Flat ground is left exactly its
# own colour; only slopes brighten or darken. The sea gets half the land's strength.
HILLSHADE_STRENGTH = 0.35
HILLSHADE_STRENGTH_SEA = HILLSHADE_STRENGTH / 2.0
SUN_AZIMUTH = 315.0      # degrees clockwise from north
SUN_ALTITUDE = 45.0      # degrees above the horizon
# Slopes are measured from the picture's own pixels, so a 2 000-pixel world (20 km per
# pixel) has gentler gradients than a 2 000-pixel Europe (1 km per pixel). The vertical
# exaggeration multiplies the height before the slope is taken; 1 means true slopes at
# the picture's resolution. Set per region (--exaggeration), defaulting to this table.
EXAGGERATION = {'world': 3.0}
DEFAULT_EXAGGERATION = 1.0

# Contours. Heights in metres; the coast and the shelf edge by default. Simplified to
# half a pixel; rings shorter than this many pixels (after simplification) are dropped.
DEFAULT_LEVELS = [0.0, -200.0]
SIMPLIFY_PX = 0.5
MIN_RING_PX = 6.0

WEBP_QUALITY = 85
HEIGHT_GRID_WIDTH = 512
HEIGHT_OFFSET = 11000    # metres added before the 16-bit encode (Challenger Deep is -10 935)

HERE = os.path.dirname(os.path.abspath(__file__))
DEPLOYS = os.path.abspath(os.path.join(HERE, '..', '..'))
DATA = os.path.join(DEPLOYS, '_data')
OUT = os.path.join(DEPLOYS, 'art', 'maps')
SOURCES = {
    '60s': ('ETOPO_2022_v1_60s_N90W180_surface.nc', 'ETOPO_2022_v1_60s_N90W180_bed.nc'),
    '30s': ('ETOPO_2022_v1_30s_N90W180_surface.nc', 'ETOPO_2022_v1_30s_N90W180_bed.nc'),
}
# ---------------------------------------------------------------------------------


def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def interp_stops(z, stops):
    """Piecewise-linear colour, float RGB in [0, 1], along one family's stops."""
    xs = np.array([s[0] for s in stops], np.float32)
    cols = np.array([hex_to_rgb(s[1]) for s in stops], np.float32) / 255.0
    out = np.empty(z.shape + (3,), np.float32)
    for c in range(3):
        out[..., c] = np.interp(z, xs, cols[:, c])
    return out


def ramp(z):
    """Height in metres -> float RGB in [0, 1]: the sea ramp below zero, the land ramp
    above. The base knows nothing of ice."""
    out = np.empty(z.shape + (3,), np.float32)
    sea = z < 0
    if sea.any():
        out[sea] = interp_stops(z[sea], SEA_STOPS)
    if (~sea).any():
        out[~sea] = interp_stops(z[~sea], LAND_STOPS)
    return out


def shade_factor(z, dx_m, dy_m, exaggeration):
    """The multiplier the relief applies to a colour: land at full strength, sea at half."""
    sh = hillshade(z, dx_m, dy_m, exaggeration)
    strength = np.where(z < 0, HILLSHADE_STRENGTH_SEA, HILLSHADE_STRENGTH)
    return (1.0 - strength) + strength * sh


def tree_cover(box, w, h):
    """Tree-cover fraction 0..1 on a w×h grid over the box, block-averaged by GDAL from
    the Copernicus 100 m grid; None where the source is absent. Sea and no-data are 0."""
    path = os.path.join(DATA, VEGETATION_SOURCE)
    if not os.path.exists(path):
        return None
    import rasterio
    from rasterio.windows import from_bounds
    from rasterio.enums import Resampling
    west, south, east, north = box
    try:
        with rasterio.open(path) as ds:
            win = from_bounds(west, south, east, north, ds.transform)
            data = ds.read(1, window=win, out_shape=(h, w), resampling=Resampling.average, boundless=True, fill_value=VEGETATION_NODATA)
            nodata = ds.nodata if ds.nodata is not None else VEGETATION_NODATA
    except Exception:           # a download still in progress, or a broken file: no layer
        return None
    frac = np.where(data == nodata, 0, data).astype(np.float32) / 100.0
    return np.clip(frac, 0.0, 1.0)


def hillshade(z, dx_m, dy_m, exaggeration):
    """Normalised so flat ground is 1.0; lit slopes rise above it, shadowed ones fall."""
    zf = z * exaggeration
    d_row, d_col = np.gradient(zf, dy_m, dx_m)      # row 0 is north, so d_row is -north
    g_east, g_north = d_col, -d_row                   # the uphill gradient
    slope = np.arctan(np.hypot(g_east, g_north))
    az_down = np.arctan2(-g_east, -g_north)           # downslope bearing, clockwise from north
    zen = math.radians(90.0 - SUN_ALTITUDE)
    az = math.radians(SUN_AZIMUTH)
    shade = math.cos(zen) * np.cos(slope) + math.sin(zen) * np.sin(slope) * np.cos(az - az_down)
    return np.clip(shade / math.cos(zen), 0.0, 1.6)


def read_reduced(z, r0, r1, c0, c1, f):
    """Block-mean of z[r0:r1, c0:c1] by an integer factor f, read in row chunks so the
    whole grid never sits in memory. Trailing rows/columns that do not fill a block
    are dropped (at most f-1 source cells)."""
    H, W = (r1 - r0) // f, (c1 - c0) // f
    out = np.empty((H, W), np.float32)
    chunk = 512 * f
    for a in range(0, H * f, chunk):
        b = min(a + chunk, H * f)
        blk = np.asarray(z[r0 + a:r0 + b, c0:c0 + W * f], np.float32)
        out[a // f:b // f] = blk.reshape((b - a) // f, f, W, f).mean(axis=(1, 3))
    return out


# ---------------------------------------------------------------------------------
# The projection, as one named pair. Inside the box longitude is linear in x and
# latitude is linear in y (equirectangular; the standard parallel only fixed the
# picture's aspect). Pixel coordinates are continuous, with (0, 0) the picture's top-left
# corner and (W, H) its bottom-right. map.js carries the same pair. A globe would replace
# these two functions and nothing else.

def to_pixel(lon, lat, box, W, H):
    west, south, east, north = box
    x = (np.asarray(lon) - west) / (east - west) * W
    y = (north - np.asarray(lat)) / (north - south) * H
    return x, y


def to_lonlat(x, y, box, W, H):
    west, south, east, north = box
    lon = west + np.asarray(x) / W * (east - west)
    lat = north - np.asarray(y) / H * (north - south)
    return lon, lat


# ---------------------------------------------------------------------------------
# Contours.

def simplify(pts, tol):
    """Douglas-Peucker on an (n, 2) array, iterative. Returns the kept points."""
    n = len(pts)
    if n < 3:
        return pts
    keep = np.zeros(n, bool)
    keep[0] = keep[-1] = True
    stack = [(0, n - 1)]
    while stack:
        a, b = stack.pop()
        if b - a < 2:
            continue
        seg = pts[a:b + 1]
        d = seg[-1] - seg[0]
        L = np.hypot(d[0], d[1])
        if L == 0.0:
            dist = np.hypot(seg[:, 0] - seg[0, 0], seg[:, 1] - seg[0, 1])
        else:
            dist = np.abs(d[0] * (seg[:, 1] - seg[0, 1]) - d[1] * (seg[:, 0] - seg[0, 0])) / L
        i = int(np.argmax(dist))
        if dist[i] > tol:
            keep[a + i] = True
            stack.append((a, a + i))
            stack.append((a + i, b))
    return pts[keep]


def contours(z, levels, box, W, H):
    """Trace each level through the sampled height grid, simplify to SIMPLIFY_PX,
    drop rings shorter than MIN_RING_PX, and return {level: [[[lon, lat], ...], ...]}
    with coordinates rounded to a tenth of a pixel's worth of degrees."""
    # The sample sits at pixel centres: grid column c is x = c + 0.5, row r is y = r + 0.5.
    gen = contourpy.contour_generator(z=z, name='serial', line_type=contourpy.LineType.Separate)
    deg_per_px = min((box[2] - box[0]) / W, (box[3] - box[1]) / H)
    digits = max(0, int(math.ceil(-math.log10(deg_per_px / 10.0))))
    out = {}
    stats = {}
    for level in levels:
        lines = []
        raw_pts = kept_pts = 0
        for line in gen.lines(level):
            raw_pts += len(line)
            pts = simplify(np.asarray(line, np.float64), SIMPLIFY_PX)
            length = float(np.hypot(*np.diff(pts, axis=0).T).sum())
            if length < MIN_RING_PX:
                continue
            kept_pts += len(pts)
            lon, lat = to_lonlat(pts[:, 0] + 0.5, pts[:, 1] + 0.5, box, W, H)
            lines.append([[round(float(a), digits), round(float(b), digits)] for a, b in zip(lon, lat)])
        key = ('%g' % level)
        out[key] = lines
        stats[key] = (len(lines), raw_pts, kept_pts)
    return out, stats


class Grid(object):
    """One ETOPO grid, cropped to the box with a margin and block-reduced."""

    def __init__(self, path, west, south, east, north, W, H, expect=None):
        if not os.path.exists(path):
            sys.exit('missing source grid %s — download ETOPO 2022 into cw-deploys/_data/ first' % path)
        with h5py.File(path, 'r') as f:
            lat = np.asarray(f['lat'], np.float64)
            lon = np.asarray(f['lon'], np.float64)
            self.shape = f['z'].shape
            if expect is not None:
                # The subtraction is meaningless unless both grids sit on the same cells.
                if self.shape != expect.shape or len(lat) != len(expect.lat) or len(lon) != len(expect.lon) \
                        or not np.allclose(lat, expect.lat, atol=1e-9) or not np.allclose(lon, expect.lon, atol=1e-9):
                    sys.exit('grid registration differs between %s and %s — refusing to subtract' % (path, expect.path))
            self.path, self.lat, self.lon = path, lat, lon
            dlat, dlon = lat[1] - lat[0], lon[1] - lon[0]
            if dlat <= 0:
                sys.exit('expected latitude ascending in the source grid')
            margin = 4
            r0 = max(0, int(np.searchsorted(lat, south)) - margin)
            r1 = min(len(lat), int(np.searchsorted(lat, north)) + margin)
            c0 = max(0, int(np.searchsorted(lon, west)) - margin)
            c1 = min(len(lon), int(np.searchsorted(lon, east)) + margin)
            self.factor = max(1, int(min((r1 - r0) / H, (c1 - c0) / W)))
            self.red = read_reduced(f['z'], r0, r1, c0, c1, self.factor)
            self.lat0 = lat[r0] + (self.factor - 1) / 2.0 * dlat
            self.lon0 = lon[c0] + (self.factor - 1) / 2.0 * dlon
            self.step_lat, self.step_lon = self.factor * dlat, self.factor * dlon
        self.box = (west, south, east, north)

    def sample(self, w, h):
        """Bilinear sample at the centres of a w×h pixel grid over the box."""
        west, south, east, north = self.box
        lat_t = north - (np.arange(h) + 0.5) * (north - south) / h
        lon_t = west + (np.arange(w) + 0.5) * (east - west) / w
        rr = (lat_t - self.lat0) / self.step_lat
        cc = (lon_t - self.lon0) / self.step_lon
        R, C = np.meshgrid(rr, cc, indexing='ij')
        return map_coordinates(self.red, [R, C], order=1, mode='nearest').astype(np.float32)


def render(name, west, south, east, north, width, exaggeration=None, levels=None):
    if not (west < east and south < north):
        sys.exit('corners must satisfy west < east and south < north')
    if exaggeration is None:
        exaggeration = EXAGGERATION.get(name, DEFAULT_EXAGGERATION)
    if levels is None:
        levels = list(DEFAULT_LEVELS)
    phi0 = 0.0 if name == 'world' else (south + north) / 2.0
    aspect = (north - south) / ((east - west) * math.cos(math.radians(phi0)))
    W = int(width)
    H = int(round(W * aspect))

    res = '60s' if name == 'world' else '30s'
    surface_file, bed_file = SOURCES[res]
    surface = Grid(os.path.join(DATA, surface_file), west, south, east, north, W, H)
    bed = Grid(os.path.join(DATA, bed_file), west, south, east, north, W, H, expect=surface)

    z = surface.sample(W, H)
    thickness = z - bed.sample(W, H)
    ice = thickness > ICE_MIN_THICKNESS

    # The base: height alone, coloured then shaded. Ice is not here.
    dy_m = (north - south) / H * 111320.0
    dx_m = (east - west) / W * 111320.0 * math.cos(math.radians(phi0))
    rgb = np.clip(ramp(z) * shade_factor(z, dx_m, dy_m, exaggeration)[..., None], 0.0, 1.0)
    img = Image.fromarray((rgb * 255.0 + 0.5).astype(np.uint8), 'RGB')

    os.makedirs(OUT, exist_ok=True)
    webp = os.path.join(OUT, name + '.webp')
    img.save(webp, 'WEBP', quality=WEBP_QUALITY, method=6)

    # The layers, at LAYER_WIDTH. Ice: the ice ramp by surface height with the base's
    # relief, alpha from the full-resolution mask block-averaged down so the edge is
    # anti-aliased. Vegetation: one green, alpha by tree cover.
    lw = LAYER_WIDTH
    lh = int(round(lw * aspect))
    layers = []
    fz = surface.sample(lw, lh)
    ice_rgb = interp_stops(np.maximum(fz, 0.0), ICE_STOPS)
    ice_rgb = np.clip(ice_rgb * shade_factor(np.maximum(fz, 0.0), dx_m * W / lw, dy_m * H / lh, exaggeration)[..., None], 0.0, 1.0)
    fy, fx = int(round(H / lh)), int(round(W / lw))
    alpha = ice[:lh * fy, :lw * fx].reshape(lh, fy, lw, fx).mean(axis=(1, 3)) if (fy >= 1 and fx >= 1 and lh * fy <= H and lw * fx <= W) else np.asarray(Image.fromarray(ice.astype(np.uint8) * 255).resize((lw, lh), Image.BOX), np.float32) / 255.0
    for stale in ('-ice.png', '-vegetation.png', '-ice.webp', '-vegetation.webp'):
        if os.path.exists(os.path.join(OUT, name + stale)):
            os.remove(os.path.join(OUT, name + stale))
    if alpha.max() > 0:
        ice_png = np.zeros((lh, lw, 4), np.uint8)
        ice_png[..., :3] = (ice_rgb * 255.0 + 0.5).astype(np.uint8)
        ice_png[..., 3] = (alpha * 255.0 + 0.5).astype(np.uint8)
        ice_path = os.path.join(OUT, name + '-ice.webp')
        Image.fromarray(ice_png, 'RGBA').save(ice_path, 'WEBP', lossless=True, method=6)
        layers.append({'name': 'ice', 'image': name + '-ice.webp', 'blend': 'normal', 'default': True})
    else:
        ice_path = None

    cover = tree_cover((west, south, east, north), lw, lh)
    if cover is not None:
        cover = np.where(fz < 0, 0.0, cover)
        a = np.clip(cover * VEGETATION_STRENGTH, 0.0, 1.0)[..., None]
        green = np.array(hex_to_rgb(VEGETATION_GREEN), np.float32) / 255.0
        veg_rgb = 1.0 - a * (1.0 - green)          # white where nothing grows; multiply leaves the base alone there
        veg_path = os.path.join(OUT, name + '-vegetation.webp')
        Image.fromarray((veg_rgb * 255.0 + 0.5).astype(np.uint8), 'RGB').save(veg_path, 'WEBP', quality=WEBP_QUALITY, method=6)
        layers.append({'name': 'vegetation', 'image': name + '-vegetation.webp', 'blend': 'multiply', 'default': True})
    else:
        veg_path = None

    # The height grid: 512 wide, same crop, metres + 11000 across red and green.
    hw = HEIGHT_GRID_WIDTH
    hh = int(round(hw * aspect))
    hz = surface.sample(hw, hh)
    v = np.clip(np.round(hz + HEIGHT_OFFSET), 0, 65535).astype(np.uint16)
    hpng = np.zeros((hh, hw, 3), np.uint8)
    hpng[..., 0] = v >> 8
    hpng[..., 1] = v & 0xFF
    height_path = os.path.join(OUT, name + '-height.png')
    Image.fromarray(hpng, 'RGB').save(height_path, 'PNG', optimize=True)

    lines, cstats = contours(z, levels, (west, south, east, north), W, H)

    meta = {
        'name': name,
        'west': west, 'south': south, 'east': east, 'north': north,
        'standard_parallel': phi0,
        'width': W, 'height': H,
        'exaggeration': exaggeration,
        'image': name + '.webp',
        'height_grid': name + '-height.png',
        'height_grid_width': hw, 'height_grid_height': hh, 'height_offset': HEIGHT_OFFSET,
        'source': 'ETOPO 2022 v1 %s ice surface and bedrock, NOAA NCEI' % res + ('; Copernicus Global Land Cover 100 m tree cover 2019' if veg_path else ''),
        'layers': layers,
        'contours': lines,
    }
    json_path = os.path.join(OUT, name + '.json')
    with open(json_path, 'w') as fh:
        # The header indented; the contours on one line each, or the file is all newlines.
        head = dict(meta); del head['contours']
        text = json.dumps(head, indent=2)
        parts = []
        for key in lines:
            parts.append('    %s: [\n      %s\n    ]' % (json.dumps(key), ',\n      '.join(json.dumps(l, separators=(',', ':')) for l in lines[key])))
        text = text[:-2] + ',\n  "contours": {\n' + ',\n'.join(parts) + '\n  }\n}\n'
        fh.write(text)

    kb = lambda p: os.path.getsize(p) / 1024.0
    ice_share = 100.0 * ice.mean()
    # Floating ice stands about a tenth of its thickness above the water (ice is 0.92 the
    # density of sea water); grounded ice on bedrock below sea level does not count.
    floating = 100.0 * (ice & (z < 0.15 * thickness)).sum() / max(1, ice.sum())
    print('%s: %d x %d px, standard parallel %.2f, reduced by %d from the %s grids, exaggeration %g' % (name, W, H, phi0, surface.factor, res, exaggeration))
    print('  %s  %.0f KB' % (os.path.relpath(webp, DEPLOYS), kb(webp)))
    if ice_path:
        print('  %s  %.0f KB' % (os.path.relpath(ice_path, DEPLOYS), kb(ice_path)))
    if veg_path:
        print('  %s  %.0f KB  (tree cover: mean %.1f%% of land)' % (os.path.relpath(veg_path, DEPLOYS), kb(veg_path), 100.0 * cover[fz >= 0].mean() if (fz >= 0).any() else 0.0))
    else:
        print('  no vegetation layer (the tree-cover grid %s is not in _data/, or is unreadable)' % VEGETATION_SOURCE)
    print('  %s  %.0f KB' % (os.path.relpath(height_path, DEPLOYS), kb(height_path)))
    print('  %s  %.0f KB' % (os.path.relpath(json_path, DEPLOYS), kb(json_path)))
    for key in lines:
        n, raw, kept = cstats[key]
        print('    contour %s m: %d lines, %d points (from %d before simplifying)' % (key, n, kept, raw))
    print('  height range in the picture: %.0f to %.0f m; ice on %.1f%% of pixels, %.1f%% of that afloat' % (z.min(), z.max(), ice_share, floating))


def render_all():
    """Every region in art/maps/, again, from its own JSON: corners, width, exaggeration
    and contour levels as recorded there."""
    names = sorted(f[:-5] for f in os.listdir(OUT) if f.endswith('.json'))
    for name in names:
        with open(os.path.join(OUT, name + '.json')) as fh:
            d = json.load(fh)
        levels = [float(k) for k in d.get('contours', {}).keys()] or None
        render(d['name'], d['west'], d['south'], d['east'], d['north'], d['width'], d.get('exaggeration'), levels)


def main(argv):
    if argv == ['--all']:
        render_all()
        return
    opts = {'width': '2000', 'exaggeration': None, 'levels': None}
    args = []
    i = 0
    while i < len(argv):
        a = argv[i]
        if a.startswith('--'):
            key, eq, val = a[2:].partition('=')
            if key not in opts:
                sys.exit('unknown option --%s\n%s' % (key, __doc__))
            if not eq:
                i += 1
                val = argv[i] if i < len(argv) else ''
            opts[key] = val
        else:
            args.append(a)
        i += 1
    if len(args) != 5:
        sys.exit(__doc__)
    name = args[0]
    west, south, east, north = (float(x) for x in args[1:5])
    exaggeration = float(opts['exaggeration']) if opts['exaggeration'] is not None else None
    levels = [float(x) for x in opts['levels'].split(',')] if opts['levels'] else None
    render(name, west, south, east, north, int(opts['width']), exaggeration, levels)


if __name__ == '__main__':
    main(sys.argv[1:])
