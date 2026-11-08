#!/usr/bin/env python3
"""Install the pinned, licensed huashu drawing libraries into a Remotion project."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil

p = argparse.ArgumentParser()
p.add_argument('--project', required=True, type=Path)
a = p.parse_args()
source = Path(__file__).resolve().parents[1] / 'assets/huashu'
manifest = json.loads((source / 'provenance.json').read_text())
for name, expected in manifest['sha256'].items():
    if hashlib.sha256((source / name).read_bytes()).hexdigest() != expected:
        raise SystemExit(f'Upstream asset changed: {name}')
# The upstream is browser-global JS. Keep every algorithm, isolate globals per
# module, and export only the supported deterministic drawing surface.
util = (source / 'util.js').read_text().replace('window.U = {', 'Object.assign(U, {', 1)
util = util.replace('\n};\n\n// ---------- 画布尺寸', '\n});\n\n// ---------- 画布尺寸', 1)
parts = ['// @ts-nocheck\n// huashu-art-motion MIT; pinned source + adaptation: provenance.json\n'
         'const window = {}; const U = {};\n'
         '// Color-only bridge; painterly hand()/board() helpers need the full engine.\n'
         'const PAINT = {hex: h => {const s=h.replace("#", ""); return [0,2,4].map(i=>parseInt(s.slice(i,i+2),16));}};\n', util,
         '\nconst MO: any = window.MO = {};\n']
for name in ['motion', 'camera', 'diagram']:
    code = (source / f'{name}.js').read_text()
    if name == 'motion':
        code = code.replace('const MO = window.MO = {};', '')
    else:
        var = {'camera': 'CAM', 'diagram': 'DG'}[name]
        parts.append(f'\nconst {var}: any = window.{var} = {{}};\n')
        code = code.replace(f'const {var} = window.{var} = {{}};', '')
    parts.append(code)
parts.append('\nexport {U, MO, CAM, DG};\n')
runtime = '\n'.join(parts).encode()
library = {'runtime.ts': runtime, 'LICENSE': (source / 'LICENSE').read_bytes(),
           'provenance.json': (source / 'provenance.json').read_bytes()}
font_files = {f.name: f.read_bytes() for f in (source / 'fonts').iterdir() if f.is_file()}
project = a.project.expanduser().resolve()
if not (project / 'project.json').is_file():
    raise SystemExit(f'Project not initialized: {project}')
collection = next((parent for parent in project.parents
                   if parent.name == 'one-minute' and parent.parent.name == 'script'), None)

def matches(folder, files):
    return (folder.is_dir() and
            {f.name for f in folder.iterdir()} == set(files) and
            all((folder / name).is_file() and (folder / name).read_bytes() == data
                for name, data in files.items()))

def check_existing(folder, files):
    if (folder.exists() or folder.is_symlink()) and not matches(folder, files):
        raise SystemExit(f'Refusing to replace customized or incomplete assets: {folder}')

def install(folder, files):
    check_existing(folder, files)
    folder.mkdir(parents=True, exist_ok=True)
    for name, data in files.items():
        file = folder / name
        if not file.exists():
            file.write_bytes(data)

def share_link(local, shared, files):
    check_existing(local, files)
    if local.is_symlink() and local.resolve() == shared.resolve():
        return
    backup = local.with_name(local.name + '.before-sharing')
    if backup.exists() or backup.is_symlink():
        raise SystemExit(f'Inspect leftover backup before retrying: {backup}')
    existed = local.exists() or local.is_symlink()
    if existed:
        local.rename(backup)
    local.parent.mkdir(parents=True, exist_ok=True)
    try:
        local.symlink_to(os.path.relpath(shared, local.parent), target_is_directory=True)
    except Exception:
        if existed:
            backup.rename(local)
        raise
    if existed:
        if backup.is_symlink():
            backup.unlink()
        else:
            shutil.rmtree(backup)  # Exact file set and bytes were verified above.

dest = project / 'remotion/src/huashu'
fonts = project / 'remotion/public/huashu-fonts'
# Verify both local copies before converting either to a shared link.
check_existing(dest, library)
check_existing(fonts, font_files)
if collection:
    # Pin adaptations as well as upstream; future upgrades never mutate old projects.
    version = manifest['commit'][:12] + '-' + hashlib.sha256(runtime).hexdigest()[:12]
    shared = collection / 'shared/huashu' / version
    install(shared / 'runtime', library)
    install(shared / 'fonts', font_files)
    share_link(dest, shared / 'runtime', library)
    share_link(fonts, shared / 'fonts', font_files)
else:
    install(dest, library)
    install(fonts, font_files)
print(json.dumps({'installed': str(dest), 'commit': manifest['commit'],
                  'fonts': str(fonts), 'shared': str(shared) if collection else None}, ensure_ascii=False))
