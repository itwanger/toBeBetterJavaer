"""Render live regression cases in an isolated preview project. Approved episode sources are read-only."""
import argparse,hashlib,json,shutil,subprocess,sys,wave
from pathlib import Path


def run(args):subprocess.run(list(map(str,args)),check=True)
def write(path,data):path.parent.mkdir(parents=True,exist_ok=True);path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')


def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--workspace',type=Path,required=True);ap.add_argument('--out',type=Path,required=True);a=ap.parse_args()
    ws=a.workspace.resolve();out=a.out.resolve();skill=Path(__file__).resolve().parents[1];tools=ws/'shared/tools'
    sys.path.insert(0,str(tools));from pixel_review import report
    from pixel_events import compile_events
    if out.exists() and not (out/'.pixel-contract-fixture').exists():raise ValueError('Refusing to overwrite non-fixture directory')
    out.mkdir(parents=True,exist_ok=True);(out/'.pixel-contract-fixture').touch()
    src=out/'remotion/src';src.mkdir(parents=True,exist_ok=True)
    write(out/'project.json',{'schemaVersion':1,'config':{'video':{'width':1920,'height':1080,'fps':30}},'slug':'pixel-contract-fixture'})
    # Only the marked diagnostic project is refreshed. Never install over either approved episode.
    for asset in (skill/'assets').glob('*.tsx'):shutil.copy2(asset,src/asset.name)
    shutil.copy2(skill/'scripts/tests/ContractScenes.tsx',src/'Root.tsx')
    shutil.copy2(ws/'shared/remotion/templates/tsconfig.json',out/'remotion/tsconfig.json')
    images=out/'assets/images';images.mkdir(parents=True,exist_ok=True)
    for asset in (skill/'assets/pixel-actor').glob('*.png'):shutil.copy2(asset,images/asset.name)
    shutil.copy2(ws/'deepseek-harness-four-plugins/assets/images/ch2-media/live-chat.webp',images/'harness-chat.webp')
    public=out/'remotion/public';public.mkdir(exist_ok=True)
    if not (public/'images').exists():(public/'images').symlink_to(images,target_is_directory=True)
    write(out/'build/cues.json',[{'id':21,'chapter':'ch3','startFrame':0}])
    write(out/'build/chapters.json',[{'id':'ch3','startFrame':0,'endFrame':501}])
    write(out/'assets/references/pixel-actions.json',{'schemaVersion':1,'events':[
      {'id':id,'chapter':'ch3','at':{'beatId':21,'offsetFrames':frame},'kind':kind,'heartDelta':delta,**({'sound':{'name':sound,'peakDbfs':-24}} if sound else {})}
      for id,frame,kind,delta,sound in [('splash',255,'fall',-1,'pixel_splash'),('hit',453,'hit',0,'success_pair'),('collect',472,'heart-collect',1,None)]]})
    compile_events(out)
    # A silent diagnostic bed, never user narration: verify the real mixer uses exactly the event frames.
    with wave.open(str(out/'build/voiceover.wav'),'wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(24000);w.writeframes(bytes(501*800*2))
    before=hashlib.sha256((out/'build/voiceover.wav').read_bytes()).hexdigest()
    run([sys.executable,tools/'mix_effects.py','--project',out])
    mixed=json.loads((out/'build/sound-mix.json').read_text())
    assert [(e['sound'],e['frame']) for e in mixed['events']]==[('pixel_splash',255),('success_pair',453)]
    assert before==hashlib.sha256((out/'build/voiceover.wav').read_bytes()).hexdigest()
    if not (public/'audio').exists():(public/'audio').symlink_to(out/'build',target_is_directory=True)
    run(['node',ws/'node_modules/typescript/bin/tsc','--noEmit','-p',out/'remotion/tsconfig.json'])
    run(['node',skill/'scripts/tests/layout_actions.cjs',ws/'node_modules',src])
    run([sys.executable,tools/'tests/test_pixel_contract.py'])
    suite={'ReservedSpace':[59],'Reflow':[0,59,60,72,84,119,120,129,138,160],
      'ClippedInput':[30],'WholeInput':[30],'DoubleFrame':[30],'SingleFrame':[30],
      'ApprovedModel':[315,332,344,405],'ApprovedHarness':[209],
      'Bridge':[254,255,256,452,453,454,471,472,473]}
    rows=[];checks=[];review=out/'review';review.mkdir(exist_ok=True)
    for composition,frames in suite.items():
        run(['node',tools/'render_frames.mjs','--project',out,'--composition',composition,'--out-dir',review,
          '--pixel-review',*[f'{composition}:{f}' for f in frames]])
        for frame in frames:
            base=f'{composition}-{frame}'
            sample=json.loads((review/(base+'.geometry.json')).read_text())
            sample.update(scene=composition,image=base+'.png',origin='live DOM · 旧问题复现/新组件验收')
            if composition in ('ReservedSpace','Reflow'):sample['fillArea']={'x':24,'y':100,'width':1872,'height':824}
            rows.append(sample)
    result=report(rows,review)
    for row in result['samples']:
        codes={f['code'] for f in row['findings']}
        expected={'ReservedSpace':{'unused-stage'},'ClippedInput':{'clipped-subject'},'DoubleFrame':{'nested-frame'}}.get(row['scene'],set())
        if expected:
            assert expected<=codes,(row['scene'],codes)
        else:assert not codes,(row['scene'],row['frame'],row['findings'])
        if row['scene']=='Bridge':
            hearts=next(n['hearts'] for n in row['nodes'] if n['id']=='status')
            assert int(hearts)==(2 if 255<=row['frame']<472 else 3),(row['frame'],hearts)
        checks.append({'scene':row['scene'],'frame':row['frame'],'expectedFindings':sorted(expected),'passed':True})
    write(out/'regression.json',{'passed':len(checks),'checks':checks,'note':'Intentional bad cases remain red in the phone review; approved project files were not changed.'})
    write(out/'assets/references/pixel-review.json',{'schemaVersion':1,'chapters':{
      'ch1':{'composition':'Reflow','scenes':[{'id':'reflow','from':0,'to':180,
        'transitions':[{'at':60,'duration':24},{'at':120,'duration':18}],
        'fillArea':{'x':24,'y':100,'width':1872,'height':824}}]},
      'ch3':{'composition':'Bridge','scenes':[{'id':'bridge','from':147,'to':501,
        'samples':[254,255,453,471,472],'clip':{'from':210,'to':490}}]}}})
    from review_pixel_chapter import review as review_chapter
    review_chapter(out,'ch1');review_chapter(out,'ch3')
    run([sys.executable,skill/'scripts/historical_pixel_review.py','--out',out/'history'])
    shutil.copy2(skill/'scripts/tests/ContractReview.html',out/'index.html')
    print(f'PASS {len(checks)} live frame regressions; complete review: {out/"index.html"}')


if __name__=='__main__':main()
