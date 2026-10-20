#!/usr/bin/env python3
"""Install the pinned, licensed huashu drawing libraries into a Remotion project."""
import argparse
import hashlib
import json
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
dest = a.project / 'remotion/src/huashu'
dest.mkdir(parents=True, exist_ok=True)
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
(dest / 'runtime.ts').write_text('\n'.join(parts))
shutil.copy2(source / 'LICENSE', dest / 'LICENSE')
shutil.copy2(source / 'provenance.json', dest / 'provenance.json')
fonts = a.project / 'remotion/public/huashu-fonts'
fonts.mkdir(parents=True, exist_ok=True)
for f in (source / 'fonts').iterdir():
    shutil.copy2(f, fonts / f.name)
print(json.dumps({'installed': str(dest), 'commit': manifest['commit'],
                  'fonts': str(fonts)}, ensure_ascii=False))
