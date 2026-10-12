"""Run one chapter's build chain and stop at the first failure.

  python3 shared/tools/chapter_pipeline.py --project <dir> --chapter ch2 \
      --still term:60 --still figure:640 [--skip-mix] [--skip-typecheck]

Steps: build_timing -> mix_effects (when assets/references/sound-plan.json exists) -> typecheck ->
key frames into preview/chapter<N>/<label>.png via the shared Remotion entry -> beat-onset check.

Beat-onset check: one still per beat about 0.4 s after the first spoken word (preview/chapter<N>/onset/), then the
share of non-background pixels in the main area (below the chapter strip, above the subtitle). A beat whose
frame is nearly empty is printed as a warning: the scene waits for a later keyword while the sentence has
already started. Manually picked stills tend to land after everything has appeared, so this check is on by
default; --skip-onset turns it off.
Author the chapter's sound-plan entries between timing and mix when they depend on new events;
re-run the pipeline afterwards (build_timing is idempotent).
"""
import argparse, json, subprocess, sys
from pathlib import Path
from project_paths import project_path, read_json, SHARED

TOOLS = SHARED / 'tools'
MAIN_AREA = (96, 150, 1824, 900)      # 1920×1080 下导航之下、字幕之上
BG = (0xf7, 0xf2, 0xe8)
SPARSE = 0.02                          # 主体区非背景像素低于 2% 视为空画面
ONSET_DELAY = 12                       # 第一个字起音后 12 帧（约 0.4 秒）


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
    parser.add_argument('--skip-onset', action='store_true', help='skip the per-beat onset stills and empty-frame check')
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
    report = {'chapter': args.chapter, 'composition': composition, 'stills': rendered}
    if not args.skip_onset:
        report['onset'] = onset_check(project, args.chapter, composition, out_dir / 'onset')
    print(json.dumps(report, ensure_ascii=False))


def onset_frames(project: Path, chapter: str) -> list:
    """Chapter-local frame ~0.4 s after each beat's first aligned word."""
    timing = read_json(project / 'assets/references' / f'{chapter}-phrase-timing.json')
    cues = read_json(project / 'build/cues.json'); cues = cues if isinstance(cues, list) else cues['cues']
    chapters = read_json(project / 'build/chapters.json'); chapters = chapters if isinstance(chapters, list) else chapters['chapters']
    start = next(c['startFrame'] for c in chapters if c['id'] == chapter)
    fps = timing.get('fps', 30)
    align = read_json(project / 'preview' / f'{chapter}-forced-alignment.json'); align = align if isinstance(align, list) else align['units']
    first = {u['id']: (u['items'][0]['start_time'] if u.get('items') else 0) for u in align}
    rows = []
    for cue in cues:
        if cue.get('chapter') == chapter and cue['id'] in first:
            rows.append((cue['id'], cue['startFrame'] - start + round(first[cue['id']] * fps) + ONSET_DELAY))
    return rows


def onset_check(project: Path, chapter: str, composition: str, out_dir: Path) -> dict:
    from PIL import Image
    frames = onset_frames(project, chapter)
    specs = [f'b{beat}:{frame}' for beat, frame in frames]
    run('onset stills', ['node', str(TOOLS / 'render_frames.mjs'), '--project', str(project), '--composition', composition, '--out-dir', str(out_dir), *specs])
    sparse = []
    for (beat, frame) in frames:
        img = Image.open(out_dir / f'b{beat}-{frame}.png').convert('RGB').crop(MAIN_AREA).resize((432, 188))
        pixels = list(img.getdata())
        busy = sum(1 for p in pixels if max(abs(p[i] - BG[i]) for i in range(3)) > 24) / len(pixels)
        if busy < SPARSE:
            sparse.append({'beat': beat, 'frame': frame, 'busy': round(busy, 4)})
    for row in sparse:
        print(f"WARNING beat {row['beat']} @ {row['frame']}: main area nearly empty ({row['busy']:.1%}) right after the sentence starts", flush=True)
    return {'dir': str(out_dir.relative_to(project)), 'beats': len(frames), 'sparse': sparse}


if __name__ == '__main__':
    main()
