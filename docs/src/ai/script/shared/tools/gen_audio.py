"""Synthesize project audio units, then apply the project's tempo. Use --dry-run to inspect without TTS."""
import argparse,base64,json,shutil,subprocess,uuid,urllib.request
from pathlib import Path
from project_paths import project_path,load_config,load_volc_key,load_beats,read_json,write_json,request_hash,sha256,find_tool

def synth(text,out_path,tts,key):
    headers={'X-Api-Key':key,'X-Api-Resource-Id':tts['resourceId'],'X-Api-Connect-Id':str(uuid.uuid4()),'Content-Type':'application/json'}
    body={'user':{'uid':'ergo-video'},'event':100,'namespace':'BidirectionalTTS','req_params':{'text':text,'speaker':tts['speakerId'],'speed_ratio':tts.get('speedRatio',1.0),'audio_params':{'format':tts['audio']['format'],'sample_rate':tts['audio']['sampleRate']}}}
    req=urllib.request.Request(tts['apiBase'],data=json.dumps(body).encode(),headers=headers,method='POST')
    temp=Path(out_path).with_suffix('.part');temp.parent.mkdir(parents=True,exist_ok=True)
    try:
        with urllib.request.urlopen(req,timeout=90) as response, temp.open('wb') as output:
            for raw in response:
                if not raw.startswith(b'data:'):continue
                data=json.loads(raw[5:]);code=data.get('code',0)
                if code not in (0,20000000):raise RuntimeError(f'TTS returned error code {code}')
                if isinstance(data.get('data'),str) and data['data']:output.write(base64.b64decode(data['data']))
        if temp.stat().st_size==0:raise RuntimeError('TTS returned empty audio')
        temp.replace(out_path)
        return True
    finally:
        temp.unlink(missing_ok=True)

def retempo(raw,out,ffmpeg,tempo,sample_rate):
    temp=out.with_name(out.stem+'.tmp'+out.suffix);out.parent.mkdir(parents=True,exist_ok=True)
    try:
        subprocess.run([ffmpeg,'-y','-v','error','-i',str(raw),'-af',f'atempo={tempo}','-ar',str(sample_rate),'-ac','1','-c:a','libmp3lame','-b:a','96k',str(temp)],check=True)
        temp.replace(out)
        return True
    finally:temp.unlink(missing_ok=True)

def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--project',required=True,type=project_path);ap.add_argument('--only',type=int,nargs='+');ap.add_argument('--force',action='store_true');ap.add_argument('--retempo',action='store_true');ap.add_argument('--dry-run',action='store_true');args=ap.parse_args()
    root=args.project;cfg=load_config(root);tts=cfg['tts'];_,beats=load_beats(root)
    if tts['audio']['format']!='mp3':raise ValueError('This pipeline currently supports MP3 raw units only')
    if args.only:
        unknown=set(args.only)-{b['id'] for b in beats}
        if unknown:raise ValueError(f'Unknown IDs: {sorted(unknown)}')
        beats=[b for b in beats if b['id'] in args.only]
    if not beats:raise ValueError('No confirmed audio units in beats.json')
    record=root/'build/audio-generation.json';records=read_json(record) if record.exists() else {'units':{}}
    ffmpeg=find_tool('ffmpeg');key=None;counts={'synthesize':0,'process':0,'reuse':0}
    for b in beats:
        raw=root/'audio/raw'/f"beat_{b['id']:02d}.mp3";out=root/'audio/processed'/raw.name;text=b.get('ttsText') or b['text'];fingerprint=request_hash(text,tts);old=records['units'].get(str(b['id']),{})
        valid_raw=raw.exists() and old.get('requestHash')==fingerprint and old.get('rawSha256')==sha256(raw)
        need_raw=args.force or not valid_raw
        if args.retempo and not valid_raw:raise ValueError(f"Unit {b['id']} has missing/stale raw audio; regenerate it before --retempo")
        if args.retempo:need_raw=False
        need_process=need_raw or args.retempo or not out.exists() or old.get('atempo')!=tts['atempo'] or old.get('processedSha256')!=sha256(out)
        action='synthesize' if need_raw else 'process' if need_process else 'reuse';counts[action]+=1
        if args.dry_run:continue
        if not ffmpeg:raise FileNotFoundError('ffmpeg is required')
        if need_raw:
            if key is None:key=load_volc_key(cfg)
            synth(text,raw,tts,key)
        if need_process:retempo(raw,out,ffmpeg,tts['atempo'],tts['audio']['sampleRate'])
        records['units'][str(b['id'])]={'requestHash':fingerprint,'rawSha256':sha256(raw),'processedSha256':sha256(out),'atempo':tts['atempo']}
        records['speakerId']=tts['speakerId'];write_json(record,records)
    print(json.dumps({'project':str(root),'speakerId':tts['speakerId'],'atempo':tts['atempo'],'dryRun':args.dry_run,'units':len(beats),'actions':counts},ensure_ascii=False))
if __name__=='__main__':main()
