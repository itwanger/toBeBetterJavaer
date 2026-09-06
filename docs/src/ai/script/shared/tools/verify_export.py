"""Verify an exported MP4 against this project's timeline and original voiceover."""
import argparse,array,json,math,subprocess
from project_paths import project_path,read_json,write_json,sha256,load_config

def run(args):return subprocess.run(args,check=True,capture_output=True)
def pcm(path,rate):
    a=array.array('f');a.frombytes(run(['ffmpeg','-v','error','-i',str(path),'-vn','-ac','1','-ar',str(rate),'-f','f32le','-']).stdout);return a

def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--project',required=True,type=project_path);ap.add_argument('--video');ap.add_argument('--dry-run',action='store_true');args=ap.parse_args()
    project=args.project;meta=read_json(project/'project.json');cfg=load_config(project);video=project/args.video if args.video else project/'output'/meta['outputName'];reference=project/'build/voiceover.wav'
    chapters=read_json(project/'build/chapters.json');frames=chapters[-1]['endFrame'];fps=cfg['video']['fps'];rate=cfg['tts']['audio']['sampleRate'];duration=frames/fps;out=project/'preview/export-check'
    if args.dry_run:print(json.dumps({'project':str(project),'video':str(video),'reference':str(reference),'frames':frames}));return
    probe=json.loads(run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(video)]).stdout)
    vs=next(s for s in probe['streams'] if s['codec_type']=='video');aus=next(s for s in probe['streams'] if s['codec_type']=='audio')
    assert (vs['width'],vs['height'],vs['r_frame_rate'],int(vs['nb_frames']))==(cfg['video']['width'],cfg['video']['height'],f'{fps}/1',frames)
    assert vs['codec_name']=='h264' and aus['codec_name']=='aac'
    assert abs(float(vs['duration'])-duration)<.002
    assert abs(float(probe['format']['duration'])-duration)<.1
    check=run(['ffmpeg','-v','error','-i',str(video),'-f','null','-']);assert not check.stderr.strip(),check.stderr.decode()
    ref=pcm(reference,rate);rendered=pcm(video,rate);assert abs(len(ref)-len(rendered))/rate<.1
    correlations=[]
    # Select voiced windows across the file; static silence cannot prove synchronization.
    for fraction in [.04,.14,.34,.54,.76,.97]:
        start=min(int(len(ref)*fraction),max(0,len(ref)-rate));a=ref[start:start+rate];b=rendered[start:start+len(a)]
        ma=sum(a)/len(a);mb=sum(b)/len(b);va=sum((x-ma)**2 for x in a);vb=sum((x-mb)**2 for x in b)
        if va<1e-8 or vb<1e-8:continue
        corr=sum((x-ma)*(y-mb) for x,y in zip(a,b))/math.sqrt(va*vb);assert corr>.94,(start/rate,corr)
        correlations.append({'startSec':start/rate,'waveformCorrelation':corr})
    assert correlations,'No voiced samples could be compared'
    out.mkdir(parents=True,exist_ok=True)
    for ch in chapters:
        frame=(ch['startFrame']+ch['endFrame'])//2
        run(['ffmpeg','-y','-v','error','-ss',str(frame/fps),'-i',str(video),'-frames:v','1',str(out/f"{ch['id']}.png")])
    result={'file':str(video),'sizeBytes':video.stat().st_size,'sha256':sha256(video),'durationSec':float(probe['format']['duration']),'frames':frames,'fps':fps,'width':vs['width'],'height':vs['height'],'videoCodec':vs['codec_name'],'audioCodec':aus['codec_name'],'fullDecodeErrors':False,'audioSamplesCompared':correlations}
    write_json(out/'report.json',result);print(json.dumps(result,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
