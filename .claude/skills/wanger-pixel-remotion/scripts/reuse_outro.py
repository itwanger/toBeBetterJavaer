"""Install the two approved narration units before gen_audio, if the closing text and voice match."""
import argparse,json,shutil,sys
from pathlib import Path

def run(project, replace):
    sys.path.insert(0,str(project.parent/'shared/tools'))
    from project_paths import load_beats,load_config,request_hash,sha256,read_json,write_json
    bank=Path(__file__).resolve().parents[1]/'assets/voice/harness-outro'
    master=read_json(bank/'manifest.json')
    tts=load_config(project)['tts']
    record=project/'build/audio-generation.json'
    generation=read_json(record) if record.exists() else {'units':{},'speakerId':tts['speakerId']}
    beats=load_beats(project)[1][-2:]
    units=list(master['units'].items())
    if len(beats)!=len(units) or any(b['text']!=m['text'] for b,(_,m) in zip(beats,units)):
        raise SystemExit('片尾文案或分段不同，本项目音频未改动。')
    jobs=[]
    for b,(src_id,m) in zip(beats,units):
        if request_hash(b.get('ttsText') or b['text'],tts,b.get('ttsSsml'))!=m['requestHash'] or tts['atempo']!=m['atempo']:
            raise SystemExit('音色、语速或实际朗读请求不同，本项目音频未改动。')
        for kind in ('raw','processed'):
            src=bank/f'{src_id}-{kind}.mp3'
            dest=project/f"audio/{kind}/beat_{b['id']:02}.mp3"
            key=m[kind+'Sha256']
            if sha256(src)!=key: raise SystemExit(f'母带校验失败: {src}')
            if dest.exists():
                if sha256(dest)==key: continue
                if not replace: raise SystemExit('已有不同录音；确认要换成定稿干声后使用 --replace。')
            jobs.append((src,dest))
        generation['units'][str(b['id'])]={k:v for k,v in m.items() if k!='text'}
    for src,dest in jobs:
        dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dest)
    if not record.exists() or read_json(record)!=generation:
        record.parent.mkdir(parents=True,exist_ok=True);write_json(record,generation)
    print(f"片尾两段已匹配；复制 {len(jobs)} 个文件。")
if __name__=='__main__':
    a=argparse.ArgumentParser(description=__doc__)
    a.add_argument('--project',type=Path,required=True);a.add_argument('--replace',action='store_true')
    opts=a.parse_args();run(opts.project.resolve(),opts.replace)
