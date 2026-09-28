"""Record and show which user approvals a video project has reached.

  python3 shared/tools/progress.py --project <dir>                      # show stage and next step
  python3 shared/tools/progress.py --project <dir> --mark script         # 用户确认口播稿
  python3 shared/tools/progress.py --project <dir> --mark audio          # 配音生成且 review_audio 已跑
  python3 shared/tools/progress.py --project <dir> --mark ch2            # 用户认可第二章
  python3 shared/tools/progress.py --project <dir> --mark render         # 用户明确说「出片 / 渲染」
  python3 shared/tools/progress.py --project <dir> --mark verified       # verify_export 通过

Only mark a stage after the matching user reply or tool result; the record is what a later
session reads to know how far it is authorized. project.json keeps everything else unchanged.
"""
import argparse, datetime, json
from project_paths import project_path, read_json, write_json, load_beats

NEXT = {
    'script': '整理 script.md 与 beats.json，交给用户确认口播稿',
    'audio': '运行 pronunciations.py --write、gen_audio.py、gen_cues.py、review_audio.py',
    'render': '全部章节已认可，等待用户明确说「出片」或「渲染」',
    'verified': 'remotion.mjs render --detach 完成后运行 verify_export.py',
}


def stages(chapter_ids: list) -> list:
    return ['script', 'audio', *chapter_ids, 'render', 'verified']


def summarize(meta: dict, chapter_ids: list) -> dict:
    record = meta.get('progress')
    if record is None:
        return {'tracked': False, 'note': '旧项目没有进度记录，按 project.json、preview/ 与用户最新指令判断'}
    order = stages(chapter_ids)
    pending = next((s for s in order if s not in record), None)
    if pending is None:
        return {'tracked': True, 'done': record, 'next': None}
    hint = NEXT.get(pending) or f'制作 {pending} 并逐章预览，等待用户回复「继续」或明确认可'
    return {'tracked': True, 'done': record, 'next': pending, 'hint': hint}


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--project', required=True, type=project_path)
    ap.add_argument('--mark')
    args = ap.parse_args()
    meta = read_json(args.project / 'project.json')
    data, _ = load_beats(args.project)
    chapter_ids = [c['id'] for c in data['chapters']]
    if args.mark:
        if args.mark not in stages(chapter_ids):
            raise ValueError(f'Unknown stage {args.mark}; expected one of {stages(chapter_ids)}')
        today = datetime.date.today().isoformat()
        meta = {**meta, 'progress': {**meta.get('progress', {}), args.mark: today}}
        write_json(args.project / 'project.json', meta)
    print(json.dumps(summarize(meta, chapter_ids), ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
