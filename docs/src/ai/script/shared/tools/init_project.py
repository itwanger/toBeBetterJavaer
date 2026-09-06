"""Initialize one video under script/, snapshot defaults and copy the shared Remotion template."""
import argparse,json,os,re,shutil
from pathlib import Path
from project_paths import SHARED,WORKSPACE,read_json,write_json,link_public

def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--project',required=True);ap.add_argument('--source',required=True,type=Path);ap.add_argument('--title');args=ap.parse_args()
    project=Path(args.project).expanduser().resolve();source=args.source.expanduser().resolve();slug=project.name
    if project.exists():raise ValueError(f'Will not overwrite existing project: {project}')
    if project.parent!=WORKSPACE:raise ValueError(f'Project must be a direct child of {WORKSPACE}')
    if not re.fullmatch('[a-z0-9]+(?:-[a-z0-9]+)*',slug) or slug=='shared':raise ValueError('Use a lowercase topic slug')
    if not source.is_file():raise ValueError(f'Article not found: {source}')
    cfg={k:v for k,v in read_json(SHARED/'config/video.config.json').items() if not k.startswith('_')}
    title=args.title or slug;composition=''.join(x.title() for x in slug.split('-'))
    project.mkdir()
    for d in ['assets/images','audio/raw','audio/processed','build','preview','output']:(project/d).mkdir(parents=True)
    shutil.copy2(source,project/'article.md');shutil.copy2(SHARED/'assets/ergo-avatar.jpg',project/'assets/images/ergo-avatar.jpg')
    write_json(project/'project.json',{'schemaVersion':1,'slug':slug,'title':title,'compositionId':composition,'outputName':slug+'.mp4','sourceArticle':os.path.relpath(source,project),'config':cfg,'audioUnitMode':'meaning-groups'})
    write_json(project/'beats.json',{'chapters':[],'beats':[]})
    (project/'script.md').write_text(f'# {title}\n\n待整理并确认口播稿。\n')
    (project/'OUTLINE.md').write_text(f'# {title} · 分镜规划\n\n待确认口播稿后规划，章节和动画数量由内容决定。\n')
    shutil.copytree(SHARED/'remotion/templates',project/'remotion')
    # The public directory exposes project-owned artifacts; no duplicate audio/image copies.
    link_public(project)
    print(json.dumps({'project':str(project),'compositionId':composition,'status':'draft; no TTS requested'},ensure_ascii=False))
if __name__=='__main__':main()
