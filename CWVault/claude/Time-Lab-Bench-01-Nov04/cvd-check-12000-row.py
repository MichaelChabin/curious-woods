# The colour-blind check of the 7 report: Machado, Oliveira and Fernandes 2009 at full severity, then CIEDE2000.
import numpy as np, itertools
M = {
 'protan': [[0.152286,1.052583,-0.204868],[0.114503,0.786281,0.099216],[-0.003882,-0.048116,1.051998]],
 'deutan': [[0.367322,0.860646,-0.227968],[0.280085,0.672501,0.047413],[-0.011820,0.042940,0.968881]],
 'tritan': [[1.255528,-0.076749,-0.178779],[-0.078411,0.930809,0.147602],[0.004733,0.691367,0.303900]],
}
def hex2rgb(h): h=h.lstrip('#'); return np.array([int(h[i:i+2],16) for i in (0,2,4)])/255.0
def lin(c): return np.where(c<=0.04045, c/12.92, ((c+0.055)/1.055)**2.4)
def gam(c): c=np.clip(c,0,1); return np.where(c<=0.0031308, 12.92*c, 1.055*c**(1/2.4)-0.055)
def sim(rgb, kind):
    if kind=='normal': return rgb
    return gam(np.array(M[kind]) @ lin(rgb))
def lab(rgb):
    r=lin(rgb); X,Y,Z = np.array([[0.4124,0.3576,0.1805],[0.2126,0.7152,0.0722],[0.0193,0.1192,0.9505]]) @ r
    x,y,z = X/0.95047, Y/1.0, Z/1.08883
    f=lambda t: np.where(t>0.008856, np.cbrt(t), 7.787*t+16/116)
    fx,fy,fz=f(x),f(y),f(z)
    return 116*fy-16, 500*(fx-fy), 200*(fy-fz)
def de2000(l1,l2):
    L1,a1,b1=l1; L2,a2,b2=l2
    C1=np.hypot(a1,b1); C2=np.hypot(a2,b2); Cm=(C1+C2)/2
    G=0.5*(1-np.sqrt(Cm**7/(Cm**7+25**7)))
    a1p=(1+G)*a1; a2p=(1+G)*a2
    C1p=np.hypot(a1p,b1); C2p=np.hypot(a2p,b2)
    h1=np.degrees(np.arctan2(b1,a1p))%360; h2=np.degrees(np.arctan2(b2,a2p))%360
    dL=L2-L1; dC=C2p-C1p
    dh = h2-h1
    if C1p*C2p==0: dh=0
    elif dh>180: dh-=360
    elif dh<-180: dh+=360
    dH=2*np.sqrt(C1p*C2p)*np.sin(np.radians(dh/2))
    Lm=(L1+L2)/2; Cmp=(C1p+C2p)/2
    if C1p*C2p==0: hm=h1+h2
    elif abs(h1-h2)<=180: hm=(h1+h2)/2
    elif h1+h2<360: hm=(h1+h2+360)/2
    else: hm=(h1+h2-360)/2
    T=1-0.17*np.cos(np.radians(hm-30))+0.24*np.cos(np.radians(2*hm))+0.32*np.cos(np.radians(3*hm+6))-0.20*np.cos(np.radians(4*hm-63))
    dth=30*np.exp(-((hm-275)/25)**2)
    Rc=2*np.sqrt(Cmp**7/(Cmp**7+25**7))
    Sl=1+0.015*(Lm-50)**2/np.sqrt(20+(Lm-50)**2); Sc=1+0.045*Cmp; Sh=1+0.015*Cmp*T
    Rt=-np.sin(np.radians(2*dth))*Rc
    return float(np.sqrt((dL/Sl)**2+(dC/Sc)**2+(dH/Sh)**2+Rt*(dC/Sc)*(dH/Sh)))
P=[('Farms','#b8923e'),('Cities','#a3472b'),('Writing','#1f6b73'),('Iron','#3b4f7a'),('Paper','#9fb98a'),('Printing','#6b3a66'),('Machines','#4a5a66'),('Electricity','#e2bd55')]
LINE='#141416'; GOLD='#e2b33a'; CLEAR='#e6e8e4'
kinds=['normal','protan','deutan','tritan']
def row(name,a,b):
    vals=[de2000(lab(sim(hex2rgb(a),k)),lab(sim(hex2rgb(b),k))) for k in kinds]
    flag=' FAIL' if min(vals)<10 else (' weak' if min(vals)<15 else '')
    print(f'{name:40s} ' + ' '.join(f'{v:5.1f}' for v in vals) + flag)
print('pair'.ljust(40),' '.join(k.rjust(5) for k in kinds))
for (n1,c1),(n2,c2) in zip(P,P[1:]): row(f'{n1} / {n2}',c1,c2)
row('Electricity / the gold tile',P[-1][1],GOLD)
row('Electricity / clear glass',P[-1][1],CLEAR)
print('against the near-black line, least over every simulation:')
for n,c in P: print(f'  {n:12s} {min(de2000(lab(sim(hex2rgb(c),k)),lab(sim(hex2rgb(LINE),k))) for k in kinds):5.1f}')
# the backlit event tile of each colour (the page's backlit: +0.22 lightness, +0.18 saturation; pale (>0.68) goes to gold)
import colorsys
def backlit(h):
    r,g,b=hex2rgb(h); hh,l,s=colorsys.rgb_to_hls(r,g,b)
    if l>0.68:
        gr=hex2rgb('#f0c84a'); t=0.75; return '#%02x%02x%02x'%tuple(int(round(255*(v+(w-v)*t))) for v,w in zip((r,g,b),gr))
    r2,g2,b2=colorsys.hls_to_rgb(hh,min(1,l+0.22),min(1,s+0.18)); return '#%02x%02x%02x'%(int(r2*255),int(g2*255),int(b2*255))
print('each colour against its own backlit event tile:')
for n,c in P: row(f'  {n} / its event',c,backlit(c))
