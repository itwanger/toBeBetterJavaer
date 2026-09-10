"""Canonical workspace/project paths. Project config is a frozen copy of defaults."""
import copy,hashlib,json,os,shutil
from pathlib import Path
SHARED=Path(__file__).resolve().parents[1]
WORKSPACE=SHARED.parent

def read_json(path):
    return json.loads(Path(path).read_text(encoding='utf-8'))

def write_json(path,value):
    path=Path(path);path.parent.mkdir(parents=True,exist_ok=True)
    temp=path.with_suffix(path.suffix+'.tmp');temp.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8');temp.replace(path)

def project_path(value):
    path=Path(value).expanduser().resolve()
    if not (path/'project.json').is_file():
        raise ValueError(f'Project not initialized: {path}; use shared/tools/init_project.py first')
    return path

def load_config(project):
    cfg=read_json(Path(project)/'project.json')['config']
    if not all(k in cfg for k in ('tts','video','volc')):
        raise ValueError('project.json must contain a complete config snapshot (tts/video/volc)')
    return copy.deepcopy(cfg)

def load_volc_key(config):
    name=config['volc'].get('apiKeyEnv','VOLC_TTS_API_KEY')
    key=os.environ.get(name,'').strip()
    if not key:raise ValueError(f'Missing environment variable: {name}')
    return key

def load_beats(project):
    data=read_json(Path(project)/'beats.json')
    beats=data['beats']
    ids=[b['id'] for b in beats]
    if any(type(i) is not int or i<1 for i in ids):raise ValueError('Audio IDs must be positive integers')
    chapters=[c['id'] for c in data['chapters']]
    if len(chapters)!=len(set(chapters)):raise ValueError('Duplicate chapter IDs')
    if any(b['chapter'] not in chapters for b in beats):raise ValueError('Unknown chapter in audio units')
    positions=[chapters.index(b['chapter']) for b in beats]
    if positions!=sorted(positions):raise ValueError('Audio units must follow contiguous chapter order')
    if beats and set(chapters)!={b['chapter'] for b in beats}:raise ValueError('Every defined chapter needs audio units')
    if len(ids)!=len(set(ids)):raise ValueError('Duplicate audio unit IDs')
    return data,beats

def find_tool(name):
    """Local patch: fall back to the repo-bundled .tools when PATH lacks the executable."""
    found=shutil.which(name)
    if found:return found
    bundled=WORKSPACE/'.tools'/name/(name+('.exe' if os.name=='nt' else ''))
    return str(bundled) if bundled.is_file() else None

def sha256(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def request_hash(text,tts):
    # atempo changes processing only; all synthesis parameters participate in cache identity.
    params={k:v for k,v in tts.items() if k!='atempo'}
    return hashlib.sha256(json.dumps({'text':text,'tts':params},sort_keys=True,ensure_ascii=False).encode()).hexdigest()

def is_public_link(path):
    """A project-local link: POSIX symlink, or NTFS junction on Windows.

    Windows symlink creation needs admin rights or Developer Mode, so this
    workspace uses directory junctions instead. Both forms resolve the same way.
    """
    path=Path(path)
    return path.is_symlink() or (os.name=='nt' and os.path.isdir(path) and os.path.isjunction(path))

def _make_link(link,destination):
    if os.name!='nt':
        link.symlink_to(os.path.relpath(destination,link.parent),target_is_directory=True)
        return
    destination.mkdir(parents=True,exist_ok=True)
    try:
        link.symlink_to(os.path.relpath(destination,link.parent),target_is_directory=True)
    except OSError:
        # No SeCreateSymbolicLinkPrivilege; a junction needs no elevation.
        # Junctions store an absolute target, so this link is machine-local.
        import _winapi;_winapi.CreateJunction(str(destination.resolve()),str(link))

def link_public(project):
    for name,destination in [('audio',project/'build'),('images',project/'assets/images')]:
        link=project/'remotion/public'/name;link.parent.mkdir(parents=True,exist_ok=True)
        if is_public_link(link):
            if link.resolve()!=destination.resolve():raise ValueError(f'Unexpected public link: {link}')
        elif link.exists():raise ValueError(f'Public path must be a project-local link: {link}')
        else:_make_link(link,destination)
