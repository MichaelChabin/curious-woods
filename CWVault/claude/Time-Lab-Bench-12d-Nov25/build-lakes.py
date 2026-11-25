"""build-lakes.py — the Time lab bench, step 12d (25 Nov 2026).

Today's lakes in the picture's own water, for earth.js's closeLakes: art/globe/lakes.png, 2,048 x 1,024, today's
longitude and latitude (north up), 255 where a lake is. earth.js's sea masks find water by colour in Blue Marble
(and in the old ground, for ?ground=old; and in the 8,192 picture, which the land reads at full tier), so today's lakes ride the pieces back in time and show as sea on Pangaea.

A lake: water in either picture where ETOPO's floor (art/maps/world-tiles level 3, '0 is land or water not joined
to the ocean') is 0, with no ocean floor within NEAR pixels (about 60 km), so no coast is touched. Widened by GROW
pixels so the finer picture the land reads close in is covered too (the widening falls on land). The Black Sea is
left out: ETOPO does not join it to the ocean at the Bosporus, which is narrower than its cells, and it is sea.
So is everything south of 60 S: Antarctica's blue ice reads as water in the picture, which is another question.

Run from cw-deploys/:  python3 -I ../CWVault/claude/Time-Lab-Bench-12d-Nov25/build-lakes.py
"""
import json
import numpy as np
from PIL import Image
from scipy import ndimage

W, H, NEAR, GROW = 2048, 1024, 3, 2
BLACK_SEA = (27.0, 42.0, 40.2, 47.5)   # lon from, lon to, lat from, lat to (with the Sea of Azov and the Marmara)
SOUTH = -60.0   # Antarctica left as it was: its blue ice reads as water too, a question for Michael (Report 12d), not this step's

def rgb(path, mul=None):
    a = np.asarray(Image.open(path).convert('RGB').resize((W, H), Image.BILINEAR)).astype(float)
    if mul is not None:
        a = a * np.asarray(Image.open(mul).convert('RGB').resize((W, H), Image.BILINEAR)).astype(float) / 255
    return a[..., 0], a[..., 1], a[..., 2]

def water(path, blue, mul=None):   # earth.js's buildMask
    r, g, b = rgb(path, mul)
    sea = (b > r * 1.2) & (b > g)
    return sea | ((r + g + b < 70) & (b >= r)) if blue else sea

pic = water('art/globe/blue-marble-july-2048.webp', True) | water('art/maps/world.webp', False, 'art/maps/world-vegetation.webp')
# the land reads the finer picture too (pixelSea, at the tier's own size): a lake two or three cells wide, Tanganyika,
# is found whole only there, so water anywhere in a cell of the 8,192 picture counts
r8, g8, b8 = (np.asarray(Image.open('art/globe/blue-marble-july-8192.webp').convert('RGB')).astype(float)[..., i] for i in range(3))
w8 = ((b8 > r8 * 1.2) & (b8 > g8)) | ((r8 + g8 + b8 < 70) & (b8 >= r8))
pic |= w8.reshape(H, w8.shape[0] // H, W, w8.shape[1] // W).any(axis=(1, 3))

P = json.load(open('art/maps/world-pyramid.json')); F = P['data']['floor']; T = F['tile']; L = 3
fw, fh = (2 << L) * T, (1 << L) * T
floor = np.zeros((fh, fw), np.uint8)
for k in F['tiles'][str(L)]:
    x, y = map(int, k.split('/'))
    floor[y * T:(y + 1) * T, x * T:(x + 1) * T] = np.asarray(Image.open(f"art/maps/{P['tiles']}/{L}/{x}/{y}{F['suffix']}").convert('RGBA'))[..., 0]
s = fw // W
ocean = (floor > 0).reshape(H, s, W, s).any(axis=(1, 3))   # any ocean in the cell
pad = W // 4                                               # across the dateline
far = ndimage.distance_transform_edt(~np.pad(ocean, ((0, 0), (pad, pad)), mode='wrap'))[:, pad:-pad] > NEAR

lon = (np.arange(W) + 0.5) / W * 360 - 180; lat = 90 - (np.arange(H) + 0.5) / H * 180
LON, LAT = np.meshgrid(lon, lat)
black = (LON >= BLACK_SEA[0]) & (LON <= BLACK_SEA[1]) & (LAT >= BLACK_SEA[2]) & (LAT <= BLACK_SEA[3])

lake = pic & ~ocean & far & ~black & (LAT > SOUTH)
lake = ndimage.binary_dilation(np.pad(lake, ((0, 0), (pad, pad)), mode='wrap'), iterations=GROW)[:, pad:-pad] & ~ocean
Image.fromarray((lake * 255).astype(np.uint8)).save('art/globe/lakes.png', optimize=True)
lab, n = ndimage.label(lake, structure=np.ones((3, 3)))
sizes = ndimage.sum(lake, lab, range(1, n + 1))
print('lakes.png:', int(lake.sum()), 'px in', n, 'pieces of water; the largest:')
for i in np.argsort(-sizes)[:12]:
    ys, xs = np.nonzero(lab == i + 1)
    print('  %5d px  lon %6.1f lat %5.1f' % (sizes[i], lon[xs].mean(), lat[ys].mean()))
