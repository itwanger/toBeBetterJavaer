"""Read-only checks for project paths, public links, audio inputs and generated timing."""
import argparse,json,re
from pathlib import Path
from project_paths import SHARED,WORKSPACE,project_path,load_config,read_json,load_beats,sha256,request_hash
from progress import summarize

def cover_status(p,meta):
    """原稿有视频封面区块时，报告首帧封面是否就绪；没有区块返回 none。原稿可能中途补封面，每次都重新读。"""
    src=meta.get('sourceArticle');source=(p/src).resolve() if src else None
    if not source or not source.is_file():return 'no-source'
    text=source.read_text(encoding='utf-8')
    if not re.search(r'video-covers:start|##\s*视频封面',text):return 'none'
    root=p/'remotion/src/Root.tsx'
    ok=(p/'assets/images/cover-16x9.png').is_file() and root.is_file() and 'CoverFrame' in root.read_text(encoding='utf-8')
    return 'ready' if ok else 'missing: 原稿有视频封面区块，需下载约 16:9 的封面为 assets/images/cover-16x9.png 并在整片加 CoverFrame'

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
    # Script confirmed but audio not yet synthesized: report the stage instead of failing.
    missing_audio=[b['id'] for b in beats if not (p/'audio/processed'/f"beat_{b['id']:02d}.mp3").is_file()]
    audio_ready=bool(beats) and not missing_audio
    for file in (p/'remotion/src').rglob('*.tsx'):
        for asset in re.findall(r"staticFile\(['\"]([^'\"]+)['\"]\)",file.read_text()):
            if audio_ready or not asset.startswith('audio/'):
                check((p/'remotion/public'/asset).is_file(),f'{file.name}: {asset}')
    if beats and not audio_ready:
        print(json.dumps({'project':str(p),'status':'awaiting-audio','checksPassed':len(checks),'audioUnits':len(beats),'missingProcessed':missing_audio,'cover':cover_status(p,meta),'next':'gen_audio.py then gen_cues.py','progress':summarize(meta,[c['id'] for c in data['chapters']])},ensure_ascii=False,indent=2));return
    if beats:
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
    print(json.dumps({'project':str(p),'status':'ready' if beats else 'draft','checksPassed':len(checks),'audioUnits':len(beats),'speakerId':cfg['tts']['speakerId'],'atempo':cfg['tts']['atempo'],'output':str(p/'output'/meta['outputName']),'cover':cover_status(p,meta),'progress':summarize(meta,[c['id'] for c in data['chapters']])},ensure_ascii=False,indent=2))
if __name__=='__main__':main()
