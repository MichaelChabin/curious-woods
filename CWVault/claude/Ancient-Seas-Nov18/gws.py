# Reconstruct lon/lat points with the GPlates Web Service, in chunks, by POST through curl.
import json, subprocess, time
def recon(pts, t, model='PALEOMAP', chunk=400):
    out=[]
    for i in range(0,len(pts),chunk):
        part=pts[i:i+chunk]
        data='points='+','.join(f'{x:.4f},{y:.4f}' for x,y in part)+f'&time={t}&model={model}&return_null_points'
        for attempt in range(4):
            r=subprocess.run(['curl','-s','-m','90','-X','POST','https://gws.gplates.org/reconstruct/reconstruct_points/','--data',data],capture_output=True,text=True)
            try: j=json.loads(r.stdout); break
            except Exception: time.sleep(2+3*attempt)
        else: raise RuntimeError(r.stdout[:300])
        c=j['coordinates'] if j.get('type')=='MultiPoint' else [g and g.get('coordinates') for g in j.get('geometries',[])]
        if len(c)!=len(part): raise RuntimeError(f'got {len(c)} for {len(part)}: {str(j)[:300]}')
        out+=c
    return out
