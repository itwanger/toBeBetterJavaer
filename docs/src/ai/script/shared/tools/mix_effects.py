"""Mix opt-in, beat-relative effects without changing narration samples or timing."""
import argparse,array,hashlib,json,math,random,wave
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--project',required=True,type=Path);args=p.parse_args();root=args.project.resolve();shared=Path(__file__).resolve().parents[1]
plan=json.loads((root/'assets/references/sound-plan.json').read_text());cues={x['id']:x for x in json.loads((root/'build/cues.json').read_text())};fps=json.loads((root/'project.json').read_text())['config']['video']['fps'];src=root/'build/voiceover.wav'
with wave.open(str(src)) as w:
 assert w.getnchannels()==1 and w.getsampwidth()==2
 rate=w.getframerate();voice=array.array('h');voice.frombytes(w.readframes(w.getnframes()))
# Deterministic, original sound designs. All envelopes go to zero at both ends.
rng=random.Random(52);library={}
for name,duration in [('error',.16),('tick',.075),('page',.16)]:
 n=round(rate*duration);out=[];smooth=0
 for i in range(n):
  t=i/rate;u=i/max(1,n-1);envelope=math.sin(math.pi*u)**2
  if name=='error':v=math.sin(2*math.pi*(410*t-450*t*t))*.65+math.sin(2*math.pi*205*t)*.2
  elif name=='tick':v=math.sin(2*math.pi*1050*t)*math.exp(-u*4)
  else:smooth=.85*smooth+.15*rng.uniform(-1,1);v=smooth
  out.append(v*envelope)
 peak=max(abs(x) for x in out);out=[x/peak for x in out];library[name]=out
 dest=shared/f'assets/sfx/{name}.wav';dest.parent.mkdir(exist_ok=True,parents=True)
 if not dest.exists():
  with wave.open(str(dest),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(array.array('h',(round(x*32767*.25) for x in out)).tobytes())
mix=[float(x) for x in voice];events=[]
for event in plan['events']:
 frame=cues[event['beatId']]['startFrame']+event.get('offsetFrames',0);offset=round(frame/fps*rate);gain=10**(event['peakDbfs']/20)*32767
 sound=library[event['sound']]
 for i,x in enumerate(sound):
  if offset+i<len(mix):mix[offset+i]+=x*gain
 events.append({**event,'frame':frame,'durationSec':len(sound)/rate})
peak=max(abs(x) for x in mix);assert peak<32767, f'Mix would clip: {peak}'
output=root/'build/voiceover-with-effects.wav'
with wave.open(str(output),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(array.array('h',(round(x) for x in mix)).tobytes())
record={'planSha256':hashlib.sha256((root/'assets/references/sound-plan.json').read_bytes()).hexdigest(),'sourceSha256':hashlib.sha256(src.read_bytes()).hexdigest(),'outputSha256':hashlib.sha256(output.read_bytes()).hexdigest(),'source':'build/voiceover.wav','output':'build/voiceover-with-effects.wav','events':events,'peakDbfs':20*math.log10(peak/32767),'sampleCount':len(mix)}
(root/'build/sound-mix.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n');print(json.dumps(record,ensure_ascii=False))
