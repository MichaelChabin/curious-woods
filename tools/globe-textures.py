#!/usr/bin/env python3
"""globe-textures.py — the globe's skin maps for js/globe.js (12 Oct 2026, Prompt-Build-Globe-Cities-Ice.md, parts 1 and 7).

Reads Michael's maps in prototypes/globe-textures/ (made there by molten.py: 2048 x 1024, built from
noise on the sphere, so no seam and no pinch at the poles) and writes what the site ships, at
1024 x 512, which is all a 560 px disc can show:
  cw-deploys/art/globe/cooling-order.png   dark cools first, light stays molten longest; the engine
                                           draws crust where the value is below a threshold that
                                           rises with the age
  cw-deploys/art/globe/cracks.png          the seams between the rafts, which glow and dim
  cw-deploys/art/globe/rock-grain.png      a neutral rock grain for the inferred and fitted ages,
                                           the same noise recipe as molten.py's crust, one tone
                                           with grain and no climate in it (Michael, 12 Oct)
Run from _CW/: python3 tools/globe-textures.py
"""
import numpy as np
from PIL import Image

SRC = 'prototypes/globe-textures/'
OUT = 'cw-deploys/art/globe/'
W, H = 1024, 512

for name in ('cooling-order.png', 'cracks.png'):
    im = Image.open(SRC + name).convert('L').resize((W, H), Image.LANCZOS)
    im.save(OUT + name, optimize=True)
    print(name, im.size)

# the rock grain: molten.py's value noise on the sphere, so it too has no seam
lon = (np.arange(W) + 0.5) / W * 2 * np.pi - np.pi
lat = np.pi / 2 - (np.arange(H) + 0.5) / H * np.pi
LON, LAT = np.meshgrid(lon, lat)
P = np.stack([np.cos(LAT) * np.cos(LON), np.cos(LAT) * np.sin(LON), np.sin(LAT)], -1)

def value_noise3(p, freq, seed):
    q = p * freq + 100.0
    i = np.floor(q).astype(np.int64); f = q - i
    f = f * f * (3 - 2 * f)
    def h(ix, iy, iz):
        n = (ix * 73856093) ^ (iy * 19349663) ^ (iz * 83492791) ^ (seed * 2654435761)
        n = (n ^ (n >> 13)) * 1274126177
        return ((n ^ (n >> 16)) & 0xFFFFFF) / 0xFFFFFF
    ix, iy, iz = i[..., 0], i[..., 1], i[..., 2]
    fx, fy, fz = f[..., 0], f[..., 1], f[..., 2]
    c = [[[h(ix + a, iy + b, iz + d) for d in (0, 1)] for b in (0, 1)] for a in (0, 1)]
    lx = lambda a, b: a * (1 - fx) + b * fx
    ly = lambda a, b: a * (1 - fy) + b * fy
    lz = lambda a, b: a * (1 - fz) + b * fz
    return lz(ly(lx(c[0][0][0], c[1][0][0]), lx(c[0][1][0], c[1][1][0])),
              ly(lx(c[0][0][1], c[1][0][1]), lx(c[0][1][1], c[1][1][1])))

def fbm(p, octaves=6, base=2.0, seed=1, gain=0.5):
    v = np.zeros(p.shape[:-1]); amp = 1.0; freq = base; tot = 0
    for o in range(octaves):
        v += amp * value_noise3(p, freq, seed + o); tot += amp
        amp *= gain; freq *= 2.1
    return v / tot

grain = fbm(P, 6, 12.0, seed=33)
grain = (grain - grain.min()) / (grain.max() - grain.min())
Image.fromarray((grain * 255).astype(np.uint8)).save(OUT + 'rock-grain.png', optimize=True)
print('rock-grain.png', (W, H))
