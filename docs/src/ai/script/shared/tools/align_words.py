"""Inspect real audio energy; silence boundaries are candidates, not word timestamps."""
import argparse,array,json,math,shutil,subprocess
from project_paths import project_path

def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--project',required=True,type=project_path);ap.add_argument('--id',required=True,type=int);ap.add_argument('--threshold',type=float,default=.1);args=ap.parse_args()
    path=args.project/'audio/processed'/f'beat_{args.id:02d}.mp3'
    data=subprocess.check_output([shutil.which('ffmpeg') or 'ffmpeg','-v','error','-i',str(path),'-ar','16000','-ac','1','-f','s16le','-'])
    samples=array.array('h');samples.frombytes(data);win=320
    energies=[math.sqrt(sum(x*x for x in samples[i:i+win])/len(samples[i:i+win])) for i in range(0,len(samples),win)]
    peak=max(energies) or 1;active=[e/peak>args.threshold for e in energies];segments=[];start=None;silence=0
    for i,flag in enumerate(active):
        if flag:
            if start is None:start=i
            silence=0
        elif start is not None:
            silence+=1
            if silence>=2:segments.append({'startSec':start*.02,'endSec':(i-silence+1)*.02});start=None
    if start is not None:segments.append({'startSec':start*.02,'endSec':len(active)*.02})
    print(json.dumps({'audio':str(path),'segments':segments,'note':'Use listening or ASR to associate these regions with phrases.'},ensure_ascii=False,indent=2))
if __name__=='__main__':main()
