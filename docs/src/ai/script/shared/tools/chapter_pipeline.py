"""Run one chapter's build chain and stop at the first failure.

  python3 shared/tools/chapter_pipeline.py --project <dir> --chapter ch2 \
      --still term:60 --still figure:640 [--skip-mix] [--skip-typecheck]

Steps: build_timing -> mix_effects (when assets/references/sound-plan.json exists) -> typecheck ->
key frames into preview/chapter<N>/<label>.png via the shared Remotion entry.
Author the chapter's sound-plan entries between timing and mix when they depend on new events;
re-run the pipeline afterwards (build_timing is idempotent).
"""
import argparse, json, subprocess, sys
from pathlib import Path
from project_paths import project_path, SHARED

TOOLS = SHARED / 'tools'


def run(label: str, cmd: list) -> None:
    print(f'== {label}', flush=True)
    result = subprocess.run(cmd, text=True, capture_output=True)
    tail = (result.stdout + result.stderr).strip().splitlines()[-12:]
    for line in tail:
        print(line, flush=True)
    if result.returncode != 0:
        raise SystemExit(f'{label} failed (exit {result.returncode})')


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--project', required=True, type=project_path)
    parser.add_argument('--chapter', required=True)
    parser.add_argument('--still', action='append', default=[], help='label:frame (chapter-local frame)')
    parser.add_argument('--composition', help='defaults to Chapter<N>Preview')
    parser.add_argument('--skip-mix', action='store_true')
    parser.add_argument('--skip-typecheck', action='store_true')
    args = parser.parse_args()
    project = args.project; number = args.chapter[2:]
    composition = args.composition or f'Chapter{number}Preview'
    py, node = sys.executable, 'node'
    run('build_timing', [py, str(TOOLS / 'build_timing.py'), '--project', str(project), '--chapter', args.chapter])
    if not args.skip_mix and (project / 'assets/references/sound-plan.json').is_file():
        run('mix_effects', [py, str(TOOLS / 'mix_effects.py'), '--project', str(project)])
    if not args.skip_typecheck:
        run('typecheck', [node, str(TOOLS / 'remotion.mjs'), 'typecheck', '--project', str(project)])
    out_dir = project / 'preview' / f'chapter{number}'; out_dir.mkdir(parents=True, exist_ok=True)
    rendered = []
    for still in args.still:
        label, frame = still.rsplit(':', 1)
        target = out_dir / f'{label}-{frame}.png'
        run(f'still {label}@{frame}', [node, str(TOOLS / 'remotion.mjs'), 'still', '--project', str(project), '--composition', composition, '--frame', frame, '--out', str(target)])
        rendered.append(str(target.relative_to(project)))
    print(json.dumps({'chapter': args.chapter, 'composition': composition, 'stills': rendered}, ensure_ascii=False))


if __name__ == '__main__':
    main()
