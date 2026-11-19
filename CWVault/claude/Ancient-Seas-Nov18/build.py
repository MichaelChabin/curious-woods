# Build the ancient-seas bench's data from the downloads: painted Earths, flooded-to-coastline Earths,
# journey frames, coastlines, and the T. rex finds. Usage: build.py <scratchpad> <out-dir> <repo cw-deploys>
import sys, json, glob, os, math
import numpy as np, h5py, shapefile
from PIL import Image, ImageDraw
SP, OUT, CWD = sys.argv[1:4]
os.makedirs(OUT, exist_ok=True)
DEM = glob.glob(f'{SP}/dl/dem01/Scotese*_nc')[0]
SEA = [(-9000,'#22415f'),(-4000,'#33699a'),(-800,'#5793b4'),(-150,'#7fb0cc'),(0,'#93bed7')]   # Spec-Maps' sea ramp: deeper is darker
LAND = [(0,'#a3ad86'),(200,'#9aa882'),(800,'#a89a80'),(1800,'#9a9488'),(3500,'#8f8d90'),(11000,'#8f8d90')]   # the Time lab's quiet green, lifting to rock; never white
def hx(h): h=h.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]
def ramp(z, stops):
    xs=np.array([s[0] for s in stops],float); cs=np.array([hx(s[1]) for s in stops],float)
    return np.stack([np.interp(z,xs,cs[:,k]) for k in range(3)],-1)
def dem(age):
    f=h5py.File(glob.glob(f'{DEM}/*_{age}Ma.nc')[0],'r'); z=f['z'][:].astype(np.float32)
    lat=f['latitude'][:]
    z=z[:, :-1]
    if lat[0]<lat[-1]: z=z[::-1]
    d=f.attrs.get('description',b''); return z[:-1], (d.decode() if isinstance(d,bytes) else str(d))   # 1800 x 3600, north up
def coast_rings(age):
    sf=shapefile.Reader(f'{SP}/dl/coast/CS/{age}Ma_CS_v7.shp'); R=[]
    for s in sf.shapes():
        idx=list(s.parts)+[len(s.points)]
        R+= [s.points[a:b] for a,b in zip(idx,idx[1:])]
    return R
def land_mask(rings, w=3600, h=1800):
    m=np.zeros((h,w),bool)
    for r in rings:
        im=Image.new('1',(w,h),0); ImageDraw.Draw(im).polygon([((x+180)*w/360,(90-y)*h/180) for x,y in r],fill=1)
        m^=np.array(im,bool)
    return m
def paint(z, high=None):
    sea=z<0
    img=np.where(sea[...,None], ramp(np.minimum(z,0),SEA), ramp(np.maximum(z,0),LAND))
    if high is not None:   # flooded to the coastline: outside it is sea; inside it is land, even where the heights say water
        img=np.where((~high & ~sea)[...,None], np.array(hx('#93bed7'),float), img)
        img=np.where((high & sea)[...,None], np.array(hx(LAND[0][1]),float), img)
    return Image.fromarray(np.clip(img,0,255).astype(np.uint8))
def save(im, name, w=None, q=84):
    if w and im.size[0]!=w: im=im.resize((w,w//2),Image.LANCZOS)
    p=f'{OUT}/{name}'; im.save(p, quality=q, optimize=True, progressive=True); return os.path.getsize(p)
sizes={}; descs={}
ONLY_COAST=len(sys.argv)>4 and sys.argv[4]=='coast'
# the two moments, the present, and the flooded versions
for age,tag in (() if ONLY_COAST else ((260,'262'),(70,'069'))):
    z,descs[tag]=dem(age)
    sizes[f'earth-{tag}.jpg']=save(paint(z),f'earth-{tag}.jpg')
    sizes[f'earth-{tag}-high.jpg']=save(paint(z,land_mask(coast_rings(age))),f'earth-{tag}-high.jpg')
if not ONLY_COAST:
  z,descs['000']=dem(0)
  im=paint(z).convert('RGBA')
  ice=Image.open(f'{CWD}/art/maps/world-ice.webp').convert('RGBA').resize(im.size,Image.LANCZOS)
  im=Image.alpha_composite(im,ice).convert('RGB')
  sizes['earth-000.jpg']=save(im,'earth-000.jpg')
# the journey from 69 Ma to now: every five million years between, at half the width
for age in ([] if ONLY_COAST else range(65,0,-5)):
    z,d=dem(age); descs[f'{age:03d}']=d
    sizes[f'earth-{age:03d}.jpg']=save(paint(z),f'earth-{age:03d}.jpg',w=1800,q=80)
# the coastlines, as rings of [lon,lat] rounded to 0.02 degrees, simplified, the artificial edges dropped
def simplify(pts, tol):
    if len(pts)<3: return pts
    if pts[0]==pts[-1] and len(pts)>3:   # a closed ring: split at the point farthest from the start, simplify each half
        P=np.array(pts); k=int(np.argmax(np.hypot(*(P-P[0]).T)))
        return simplify(pts[:k+1],tol)[:-1]+simplify(pts[k:],tol)
    keep=[0,len(pts)-1]; stack=[(0,len(pts)-1)]
    P=np.array(pts)
    while stack:
        a,b=stack.pop(); 
        if b<=a+1: continue
        A,B=P[a],P[b]; seg=B-A; L=np.hypot(*seg) or 1e-9
        V=P[a+1:b]-A; d=np.abs(seg[0]*V[:,1]-seg[1]*V[:,0])/L; i=int(np.argmax(d))+a+1
        if d[i-a-1]>tol: keep.append(i); stack+= [(a,i),(i,b)]
    return [pts[i] for i in sorted(set(keep))]
coasts={}
for age,tag in ((260,'262'),(70,'069')):
    lines=[]
    for r in coast_rings(age):
        cur=[]
        for p,q in zip(r,r[1:]):
            edge=abs(p[0]-q[0])>180 or (abs(p[0])>=179.99 and abs(q[0])>=179.99) or (abs(p[1])>=89.9 and abs(q[1])>=89.9)
            if edge:
                if len(cur)>1: lines.append(cur)
                cur=[]
            else:
                if not cur: cur=[p]
                cur.append(q)
        if len(cur)>1: lines.append(cur)
    lines=[[[round(x,2),round(y,2)] for x,y in simplify([tuple(p) for p in l],0.03)] for l in lines]
    coasts[tag]=[l for l in lines if len(l)>1]
json.dump(coasts,open(f'{OUT}/coasts.json','w'),separators=(',',':')); sizes['coasts.json']=os.path.getsize(f'{OUT}/coasts.json')
if not ONLY_COAST: json.dump({'descriptions':descs,'sizes':sizes},open(f'{SP}/out/build-log.json','w'),indent=1)
print(json.dumps(sizes,indent=0)); print(sum(sizes.values())/1e6,'MB'); print(descs)
