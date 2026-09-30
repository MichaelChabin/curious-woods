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
    python3 render.py --pyramid   the whole earth as tiles, for the map that moves (below)
    python3 render.py --contours  the finer levels' coastlines again, cut per tile column
    python3 render.py --shelf     the shallow-sea layer, for a lower sea (Time on the map)
    python3 render.py --ice       ice outlines through time from ICE-6G_C, to prototypes/ice/ (not served)

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
    chunk = 64 * f          # rows per read: at f = 42 (a level-0 band) 512·f rows would be 3.7 GB
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


# ---------------------------------------------------------------------------------
# The pyramid (27 Sep 2026, Spec-Maps "The world that moves"): the whole earth as
# 512-pixel tiles, equirectangular, level z being 2^(z+1) by 2^z tiles — two tiles at
# level 0, 64 by 32 at level 5, about 1.2 km a pixel at the equator, which is as fine
# as the 30 arc-second grid goes. Written to art/maps/world-tiles/<z>/<x>/<y>.webp with
# the layers beside each tile at half size, <y>-ice.webp and <y>-vegetation.webp, only
# where the tile has any; and art/maps/world-pyramid.json naming it all. Each level is
# rendered in bands of one tile row, so no level ever sits whole in memory. Tree cover
# is read once, at the finest level's half resolution, and averaged down for the rest.
#
# Relief: the exaggeration steps down as the pixels get finer, because a world at 20 km
# a pixel shows nothing at 1 and Switzerland at 1 km is a caricature at 3.
PYRAMID_LEVELS = 6                 # levels 0..5
TILE = 512
LAYER_TILE = 256
PYRAMID_EXAGGERATION = {0: 3.0, 1: 2.5, 2: 2.0, 3: 1.6, 4: 1.3, 5: 1.0}
PYRAMID_DIR = 'world-tiles'
PYRAMID_CONTOUR_MAX_KB = 1024      # a level's contour file above this is not written, and said so
PYRAMID_LAYER_MAX_LEVEL = None     # None: every level; the report says what the layers cost


def render_pyramid():
    import time
    t0 = time.time()
    out_dir = os.path.join(OUT, PYRAMID_DIR)
    os.makedirs(out_dir, exist_ok=True)
    surface_file, bed_file = SOURCES['30s']

    # Tree cover once, at level-5 half resolution over the whole earth (the grid ends at
    # 80°N and 60°S; outside it is nodata, which is no trees).
    finest_w = TILE * 2 ** PYRAMID_LEVELS                    # level 5 width in px
    cover_full = tree_cover((-180.0, -90.0, 180.0, 90.0), finest_w // 2, finest_w // 4)
    if cover_full is None:
        print('  no vegetation layer (the tree-cover grid is not in _data/, or is unreadable)')
    print('  tree cover read: %.0f s' % (time.time() - t0))

    levels_meta, layer_tiles, contour_files, sizes = [], {'ice': {}, 'vegetation': {}}, {}, {}
    for z in range(PYRAMID_LEVELS):
        cols, rows = 2 ** (z + 1), 2 ** z
        W, H = cols * TILE, rows * TILE
        deg_px = 360.0 / W
        ex = PYRAMID_EXAGGERATION[z]
        do_layers = PYRAMID_LAYER_MAX_LEVEL is None or z <= PYRAMID_LAYER_MAX_LEVEL
        level_bytes = {'base': 0, 'ice': 0, 'vegetation': 0}
        counts = {'base': 0, 'ice': 0, 'vegetation': 0}
        lines_all = {}
        # tree cover at this level's layer resolution
        cover_z = None
        if cover_full is not None and do_layers:
            f = (finest_w // 2) // (cols * LAYER_TILE)
            cover_z = cover_full.reshape(rows * LAYER_TILE, f, cols * LAYER_TILE, f).mean(axis=(1, 3)) if f > 1 else cover_full
        for ty in range(rows):
            north = 90.0 - ty * 180.0 / rows
            south = north - 180.0 / rows
            band = (-180.0, south, 180.0, north)
            surface = Grid(os.path.join(DATA, surface_file), -180.0, south, 180.0, north, W, TILE)
            bed = Grid(os.path.join(DATA, bed_file), -180.0, south, 180.0, north, W, TILE, expect=surface)
            z_band = surface.sample(W, TILE)
            thickness = z_band - bed.sample(W, TILE)
            ice = thickness > ICE_MIN_THICKNESS
            phi = math.radians((north + south) / 2.0)
            dy_m = deg_px * 111320.0
            dx_m = deg_px * 111320.0 * max(0.05, math.cos(phi))
            rgb = np.clip(ramp(z_band) * shade_factor(z_band, dx_m, dy_m, ex)[..., None], 0.0, 1.0)
            base8 = (rgb * 255.0 + 0.5).astype(np.uint8)
            # ice at half resolution: colour from the ramp, alpha from the full mask averaged
            if do_layers and ice.any():
                fz = z_band[::2, ::2]
                ice_rgb = interp_stops(np.maximum(fz, 0.0), ICE_STOPS)
                ice_rgb = np.clip(ice_rgb * shade_factor(np.maximum(fz, 0.0), dx_m * 2, dy_m * 2, ex)[..., None], 0.0, 1.0)
                alpha = ice.reshape(TILE // 2, 2, W // 2, 2).mean(axis=(1, 3))
                ice8 = np.zeros((TILE // 2, W // 2, 4), np.uint8)
                ice8[..., :3] = (ice_rgb * 255.0 + 0.5).astype(np.uint8)
                ice8[..., 3] = (alpha * 255.0 + 0.5).astype(np.uint8)
            else:
                ice8 = None
            veg8 = None
            if cover_z is not None:
                cb = cover_z[ty * LAYER_TILE:(ty + 1) * LAYER_TILE]
                cb = np.where(z_band[::2, ::2] < 0, 0.0, cb)
                if cb.max() > 0:
                    a = np.clip(cb * VEGETATION_STRENGTH, 0.0, 1.0)[..., None]
                    green = np.array(hex_to_rgb(VEGETATION_GREEN), np.float32) / 255.0
                    veg8 = ((1.0 - a * (1.0 - green)) * 255.0 + 0.5).astype(np.uint8)
                    veg_any = cb
            for tx in range(cols):
                d = os.path.join(out_dir, str(z), str(tx))
                os.makedirs(d, exist_ok=True)
                x0 = tx * TILE
                p = os.path.join(d, '%d.webp' % ty)
                Image.fromarray(base8[:, x0:x0 + TILE], 'RGB').save(p, 'WEBP', quality=WEBP_QUALITY, method=4)
                level_bytes['base'] += os.path.getsize(p); counts['base'] += 1
                hx0 = tx * LAYER_TILE
                if ice8 is not None and ice8[:, hx0:hx0 + LAYER_TILE, 3].max() > 0:
                    p = os.path.join(d, '%d-ice.webp' % ty)
                    Image.fromarray(ice8[:, hx0:hx0 + LAYER_TILE], 'RGBA').save(p, 'WEBP', lossless=True, method=4)
                    level_bytes['ice'] += os.path.getsize(p); counts['ice'] += 1
                    layer_tiles['ice'].setdefault(str(z), []).append('%d/%d' % (tx, ty))
                if veg8 is not None and veg_any[:, hx0:hx0 + LAYER_TILE].max() > 0.005:
                    p = os.path.join(d, '%d-vegetation.webp' % ty)
                    Image.fromarray(veg8[:, hx0:hx0 + LAYER_TILE], 'RGB').save(p, 'WEBP', quality=WEBP_QUALITY, method=4)
                    level_bytes['vegetation'] += os.path.getsize(p); counts['vegetation'] += 1
                    layer_tiles['vegetation'].setdefault(str(z), []).append('%d/%d' % (tx, ty))
            # contours for this band, in lon/lat; rings are cut at band edges and simply abut
            band_lines, _ = contours(z_band, DEFAULT_LEVELS, band, W, TILE)
            for key in band_lines:
                lines_all.setdefault(key, []).extend(band_lines[key])
            print('  level %d band %d/%d  %.0f s' % (z, ty + 1, rows, time.time() - t0), flush=True)
        # the level's contour file, if it is small enough to ship
        cpath = os.path.join(out_dir, 'contours-%d.json' % z)
        parts = []
        for key in lines_all:
            parts.append('  %s: [\n    %s\n  ]' % (json.dumps(key), ',\n    '.join(json.dumps(l, separators=(',', ':')) for l in lines_all[key])))
        text = '{\n' + ',\n'.join(parts) + '\n}\n'
        ckb = len(text.encode('utf-8')) / 1024.0
        if ckb <= PYRAMID_CONTOUR_MAX_KB:
            with open(cpath, 'w') as fh:
                fh.write(text)
            contour_files[str(z)] = '%s/contours-%d.json' % (PYRAMID_DIR, z)
        elif os.path.exists(cpath):
            os.remove(cpath)
        n_lines = sum(len(v) for v in lines_all.values())
        sizes[z] = dict(level_bytes, contour_kb=ckb, contour_lines=n_lines, shipped=ckb <= PYRAMID_CONTOUR_MAX_KB, counts=counts)
        levels_meta.append({'z': z, 'cols': cols, 'rows': rows, 'width': W, 'height': H,
                            'metres_per_pixel_equator': round(40075000.0 / W), 'exaggeration': ex})
        print('level %d: %d tiles, base %.1f MB, ice %d tiles %.1f MB, vegetation %d tiles %.1f MB, contours %d lines %.0f KB%s' % (
            z, counts['base'], level_bytes['base'] / 1e6, counts['ice'], level_bytes['ice'] / 1e6,
            counts['vegetation'], level_bytes['vegetation'] / 1e6, n_lines, ckb, '' if sizes[z]['shipped'] else ' (NOT shipped)'), flush=True)

    meta = {
        'name': 'world-pyramid',
        'west': -180.0, 'south': -90.0, 'east': 180.0, 'north': 90.0,
        'tiles': PYRAMID_DIR, 'tile': TILE, 'layer_tile': LAYER_TILE,
        'levels': levels_meta,
        'layers': [
            {'name': 'ice', 'suffix': '-ice.webp', 'blend': 'normal', 'default': True, 'tiles': layer_tiles['ice']},
            {'name': 'vegetation', 'suffix': '-vegetation.webp', 'blend': 'multiply', 'default': True, 'tiles': layer_tiles['vegetation']},
        ],
        'contours': contour_files,
        'source': 'ETOPO 2022 v1 30s ice surface and bedrock, NOAA NCEI; Copernicus Global Land Cover 100 m tree cover 2019',
    }
    with open(os.path.join(OUT, 'world-pyramid.json'), 'w') as fh:
        json.dump(meta, fh, indent=1)
        fh.write('\n')
    total = sum(s['base'] + s['ice'] + s['vegetation'] for s in sizes.values())
    print('pyramid: %d base tiles, %.1f MB in all, %.0f s' % (sum(s['counts']['base'] for s in sizes.values()), total / 1e6, time.time() - t0))


PYRAMID_COLUMN_LEVELS = [3, 4, 5]   # levels whose coastlines ship per tile column, not per level


def render_contours(levels=None):
    """The finer levels' coastlines, cut per tile column: world-tiles/contours-<z>-<x>.json,
    each holding every line that touches that column (a line crossing columns is in each).
    A whole level's file was over the megabyte cap at these levels; a column's is small,
    and the map fetches only the columns in view. Rewrites the pyramid JSON's `contours`."""
    import time
    t0 = time.time()
    levels = levels or PYRAMID_COLUMN_LEVELS
    out_dir = os.path.join(OUT, PYRAMID_DIR)
    surface_file, bed_file = SOURCES['30s']
    meta_path = os.path.join(OUT, 'world-pyramid.json')
    with open(meta_path) as fh:
        meta = json.load(fh)
    for z in levels:
        cols, rows = 2 ** (z + 1), 2 ** z
        W = cols * TILE
        per_col = [dict() for _ in range(cols)]
        n_lines = 0
        for ty in range(rows):
            north = 90.0 - ty * 180.0 / rows
            south = north - 180.0 / rows
            surface = Grid(os.path.join(DATA, surface_file), -180.0, south, 180.0, north, W, TILE)
            z_band = surface.sample(W, TILE)
            band_lines, _ = contours(z_band, DEFAULT_LEVELS, (-180.0, south, 180.0, north), W, TILE)
            for key in band_lines:
                for line in band_lines[key]:
                    lons = [q[0] for q in line]
                    x0 = max(0, int((min(lons) + 180.0) / (360.0 / cols)))
                    x1 = min(cols - 1, int((max(lons) + 180.0) / (360.0 / cols)))
                    for x in range(x0, x1 + 1):
                        per_col[x].setdefault(key, []).append(line)
                    n_lines += 1
            print('  contours level %d band %d/%d  %.0f s' % (z, ty + 1, rows, time.time() - t0), flush=True)
        total = 0
        biggest = 0
        for x in range(cols):
            parts = []
            for key in per_col[x]:
                parts.append('  %s: [\n    %s\n  ]' % (json.dumps(key), ',\n    '.join(json.dumps(l, separators=(',', ':')) for l in per_col[x][key])))
            text = '{\n' + ',\n'.join(parts) + '\n}\n'
            with open(os.path.join(out_dir, 'contours-%d-%d.json' % (z, x)), 'w') as fh:
                fh.write(text)
            b = len(text.encode('utf-8')); total += b; biggest = max(biggest, b)
        old = os.path.join(out_dir, 'contours-%d.json' % z)
        if os.path.exists(old):
            os.remove(old)
        meta['contours'][str(z)] = {'perColumn': '%s/contours-%d-{x}.json' % (PYRAMID_DIR, z), 'cols': cols}
        print('level %d: %d lines, %d column files, %.1f MB in all, the biggest %.0f KB' % (z, n_lines, cols, total / 1e6, biggest / 1024.0), flush=True)
    with open(meta_path, 'w') as fh:
        json.dump(meta, fh, indent=1)
        fh.write('\n')
    print('contours: %.0f s' % (time.time() - t0))


SHELF_LEVELS = [0, 1, 2, 3, 4, 5]   # the shallow-sea layer's levels, 256 px a tile, so level 5 is 2.4 km a pixel
SHELF_DEPTH = 130                  # metres: the lowest the sea has been since the last ice age, near enough


def ocean_mask():
    """The world ocean on the 60 arc-second grid: the largest connected body of ground
    below sea level. The Caspian, the Dead Sea and every other depression on land are
    separate bodies and are left out, so a lower sea never drains them."""
    from scipy.ndimage import label
    with h5py.File(os.path.join(DATA, SOURCES['60s'][0]), 'r') as f:
        lat = np.asarray(f['lat'], np.float64)
        lon = np.asarray(f['lon'], np.float64)
        below = np.zeros(f['z'].shape, bool)
        for a in range(0, below.shape[0], 1080):
            below[a:a + 1080] = np.asarray(f['z'][a:a + 1080], np.float32) < 0
    lab, n = label(below)
    sizes = np.bincount(lab.ravel()); sizes[0] = 0
    ocean = lab == int(np.argmax(sizes))
    return ocean, lat, lon


def render_shelf():
    """The shallow-sea layer for the map that moves (Spec-Maps, *Time on the map*): for
    every pyramid tile at levels 0 to 4 with continental shelf in it, a 256-pixel
    greyscale PNG, `<y>-shelf.png` beside the tile: 0 for land and for water not joined to
    the ocean, the depth in metres (1 to 130) for ocean up to 130 m deep, 255 for deeper
    ocean. The browser paints what a lower sea exposes. Adds `shelf` to the pyramid JSON."""
    import time
    t0 = time.time()
    ocean, olat, olon = ocean_mask()
    print('  ocean mask: %.0f s' % (time.time() - t0), flush=True)
    out_dir = os.path.join(OUT, PYRAMID_DIR)
    meta_path = os.path.join(OUT, 'world-pyramid.json')
    with open(meta_path) as fh:
        meta = json.load(fh)
    listed = {}
    total = 0
    for z in SHELF_LEVELS:
        cols, rows = 2 ** (z + 1), 2 ** z
        W = cols * LAYER_TILE
        src = SOURCES['60s' if z <= 2 else '30s'][0]
        n = 0
        for ty in range(rows):
            north = 90.0 - ty * 180.0 / rows
            south = north - 180.0 / rows
            g = Grid(os.path.join(DATA, src), -180.0, south, 180.0, north, W, LAYER_TILE)
            zb = g.sample(W, LAYER_TILE)
            # the ocean mask at these pixels, nearest cell
            lat_t = north - (np.arange(LAYER_TILE) + 0.5) * (north - south) / LAYER_TILE
            lon_t = -180.0 + (np.arange(W) + 0.5) * 360.0 / W
            ri = np.clip(np.round((lat_t - olat[0]) / (olat[1] - olat[0])).astype(int), 0, len(olat) - 1)
            ci = np.clip(np.round((lon_t - olon[0]) / (olon[1] - olon[0])).astype(int), 0, len(olon) - 1)
            oc = ocean[np.ix_(ri, ci)]
            v = np.where(~oc | (zb >= 0), 0, np.where(zb < -SHELF_DEPTH, 255, np.clip(np.round(-zb), 1, SHELF_DEPTH))).astype(np.uint8)
            for tx in range(cols):
                t = v[:, tx * LAYER_TILE:(tx + 1) * LAYER_TILE]
                if not ((t > 0) & (t <= SHELF_DEPTH)).any():
                    continue
                p = os.path.join(out_dir, str(z), str(tx), '%d-shelf.png' % ty)
                Image.fromarray(t, 'L').save(p, 'PNG', optimize=True)
                total += os.path.getsize(p); n += 1
                listed.setdefault(str(z), []).append('%d/%d' % (tx, ty))
        print('level %d: %d shelf tiles  %.0f s' % (z, n, time.time() - t0), flush=True)
    meta['shelf'] = {'suffix': '-shelf.png', 'tile': LAYER_TILE, 'depth': SHELF_DEPTH, 'levels': SHELF_LEVELS, 'tiles': listed}
    with open(meta_path, 'w') as fh:
        json.dump(meta, fh, indent=1)
        fh.write('\n')
    print('shelf: %d tiles, %.1f MB, %.0f s' % (sum(len(v) for v in listed.values()), total / 1e6, time.time() - t0))


ICE6G_DIR = os.path.join(DATA, 'ice6g')           # I6_C.VM5a_1deg.<ka>.nc, downloaded from Peltier's data page
ICE_OUT_DEFAULT = os.path.abspath(os.path.join(DEPLOYS, '..', 'prototypes', 'ice'))   # NOT served
ICE_UPSAMPLE = 10                                  # the 1-degree grid is smoothed onto a 0.1-degree one before tracing
ICE_SIMPLIFY_DEG = 0.04


def render_ice(out_dir=None):
    """Ice outlines through time from ICE-6G_C (VM5a) (Peltier, Argus and Drummond 2015;
    Argus et al. 2014), for maps that show time (Spec-Maps, *Time on the map*). For each time
    step, the ice that existed then and does not now — the ice-area fraction then, less
    today's — smoothed from its one-degree grid and traced at one half, as filled rings in
    longitude and latitude. Today's ice sheets are the pyramid's own ice layer and are left
    to it. Written to prototypes/ice/ by default, which is never served: nothing derived from
    ICE-6G is published until its authors have said yes."""
    import glob
    from scipy.io import netcdf_file
    from scipy.ndimage import zoom, gaussian_filter
    out_dir = out_dir or ICE_OUT_DEFAULT
    os.makedirs(out_dir, exist_ok=True)
    files = {}
    for f in glob.glob(os.path.join(ICE6G_DIR, 'I6_C.VM5a_1deg.*.nc')):
        ka = float(os.path.basename(f)[len('I6_C.VM5a_1deg.'):-3])
        files[ka] = f
    def frac(ka):
        nc = netcdf_file(files[ka], 'r', mmap=False)
        lat = np.array(nc.variables['lat'][:], np.float64)
        lon = np.array(nc.variables['lon'][:], np.float64)
        g = np.array(nc.variables['sftgif'][:], np.float64)
        nc.close()
        if lat[0] > lat[-1]:                 # make latitude run north to south, row 0 at the top
            pass
        else:
            g = g[::-1]; lat = lat[::-1]
        shift = int(np.searchsorted(lon, 180.0))     # longitudes 0.5..359.5 -> -179.5..179.5
        g = np.roll(g, -shift, axis=1)
        return g, lat
    today, lat = frac(0.0)
    ages = sorted(files)
    out = {}
    for ka in ages:
        if ka == 0.0:
            out['0'] = []
            continue
        g, _ = frac(ka)
        extra = np.clip(g - today, 0.0, 100.0)
        # pad one column each side so rings close across the date line, then smooth and upsample
        padded = np.concatenate([extra[:, -1:], extra, extra[:, :1]], axis=1)
        fine = zoom(gaussian_filter(padded, 0.6), ICE_UPSAMPLE, order=3)
        fine = np.clip(fine, 0.0, 100.0)
        H, W = fine.shape
        gen = contourpy.contour_generator(z=fine, name='serial', fill_type=contourpy.FillType.OuterOffset)
        rings = []
        polys = gen.filled(50.0, 1000.0)
        pts_list, offs_list = polys
        for pts, offs in zip(pts_list, offs_list):
            for a, b in zip(offs[:-1], offs[1:]):
                ring = np.asarray(pts[a:b], np.float64)
                # fine grid index -> source cell -> degrees. zoom() aligns the corner cells, so a
                # fine index k is source cell k * (n_src - 1) / (n_fine - 1). Padded source column 0
                # is longitude -180.5 (today's 179.5, wrapped); source row 0 is latitude lat[0].
                src_c = ring[:, 0] * (padded.shape[1] - 1) / (W - 1)
                src_r = ring[:, 1] * (padded.shape[0] - 1) / (H - 1)
                lon_d = -180.5 + src_c
                lat_d = lat[0] - src_r
                deg = np.stack([lon_d, lat_d], axis=1)
                deg = simplify(deg, ICE_SIMPLIFY_DEG)
                if len(deg) < 4:
                    continue
                deg[:, 0] = np.clip(deg[:, 0], -180.0, 180.0)
                rings.append([[round(float(x), 3), round(float(y), 3)] for x, y in deg])
        out['%g' % (ka * 1000)] = rings
        print('  %5.1f ka: %d rings, %d points' % (ka, len(rings), sum(len(r) for r in rings)), flush=True)
    meta = {
        '_about': 'Ice that existed then and not now, by years ago, as filled rings of [lon, lat] (even-odd fill). '
                  'From ICE-6G_C (VM5a): Peltier, Argus and Drummond (2015), J. Geophys. Res. Solid Earth 120, 450-487; '
                  'Argus, Peltier, Drummond and Moore (2014), Geophys. J. Int. 198, 537-563. The one-degree ice-area '
                  'fraction, less today\'s, smoothed and traced at one half. NOT FOR PUBLICATION until the authors have said yes.',
        'ages': sorted(int(k) for k in out),
        'outlines': out,
    }
    path = os.path.join(out_dir, 'ice-outlines.json')
    with open(path, 'w') as fh:
        json.dump(meta, fh, separators=(',', ':'))
    print('ice: %d time steps, %.0f KB -> %s' % (len(out), os.path.getsize(path) / 1024.0, path))


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
    if argv == ['--pyramid']:
        render_pyramid()
        return
    if argv == ['--contours']:
        render_contours()
        return
    if argv == ['--shelf']:
        render_shelf()
        return
    if argv == ['--ice']:
        render_ice()
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
