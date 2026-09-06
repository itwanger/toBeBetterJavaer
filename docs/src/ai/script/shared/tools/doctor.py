"""Read-only checks for project paths, public links, audio inputs and generated timing."""
import argparse,json,re
from pathlib import Path
from project_paths import SHARED,WORKSPACE,project_path,load_config,read_json,load_beats,sha256,request_hash

def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--project',required=True,type=project_path);args=ap.parse_args();p=args.project;cfg=load_config(p);meta=read_json(p/'project.json');data,beats=load_beats(p);checks=[]
    def check(ok,label):
        if not ok:raise ValueError(label)
        checks.append(label)
    for relative in ['assets/images','audio/raw','audio/processed','build','preview','output','remotion/src','article.md','script.md','OUTLINE.md']:
        check((p/relative).exists(),relative)
    for name,target in [('audio','build'),('images','assets/images')]:
        path=p/'remotion/public'/name;check(path.is_symlink() and path.resolve()==(p/target).resolve(),f'public/{name} -> {target}')
    check((SHARED/'assets/ergo-avatar.jpg').is_file(),'shared default avatar')
    check((WORKSPACE/'node_modules/@remotion/cli/package.json').exists(),'shared Remotion dependency resolves')
    for file in (p/'remotion/src').rglob('*.tsx'):
        for asset in re.findall(r"staticFile\(['\"]([^'\"]+)['\"]\)",file.read_text()):
            if beats or not asset.startswith('audio/'):
                check((p/'remotion/public'/asset).is_file(),f'{file.name}: {asset}')
    if beats:
        for b in beats:check((p/'audio/processed'/f"beat_{b['id']:02d}.mp3").is_file(),f"processed {b['id']}")
        cues=read_json(p/'build/cues.json');chapters=read_json(p/'build/chapters.json');manifest=read_json(p/'build/timeline-manifest.json')
        check([b['id'] for b in beats]==[b['id'] for b in cues],'audio unit order matches cues')
        generated=read_json(p/'build/audio-generation.json')['units']
        cursor=0
        for b,c in zip(beats,cues):
            check(b['text']==c['text'] and c['startFrame']==cursor,f"cue {b['id']} text and boundary")
            cursor+=c['durationFrames']
            record=generated[str(b['id'])]
            check(record['requestHash']==request_hash(b.get('ttsText') or b['text'],cfg['tts']) and record['atempo']==cfg['tts']['atempo'],f"cue {b['id']} configuration")
            check(manifest['inputs'][str(b['id'])]['audioSha256']==sha256(p/'audio/processed'/f"beat_{b['id']:02d}.mp3"),f"cue {b['id']} audio hash")
        chapter_cursor=0
        for ch in chapters:
            check(ch['startFrame']==chapter_cursor,f"chapter {ch['id']} boundary");chapter_cursor=ch['endFrame']
        check(chapter_cursor==cursor,'chapter and cue totals match')
        check((p/manifest['audioSource']).is_file(),'manifest voiceover path')
    check(cfg['tts']['atempo']>0 and cfg['video']['fps']>0,'project configuration')
    print(json.dumps({'project':str(p),'status':'ready' if beats else 'draft','checksPassed':len(checks),'audioUnits':len(beats),'speakerId':cfg['tts']['speakerId'],'atempo':cfg['tts']['atempo'],'output':str(p/'output'/meta['outputName'])},ensure_ascii=False,indent=2))
if __name__=='__main__':main()
