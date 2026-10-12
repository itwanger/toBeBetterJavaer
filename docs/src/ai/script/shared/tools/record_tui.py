"""Record a real terminal session (Claude Code, Codex CLI, Pi ...) in tmux for a faithful on-screen reconstruction.

  python3 shared/tools/record_tui.py --project <dir> --name steer --cwd /tmp/demo \
      --cmd 'claude --permission-mode acceptEdits' --steps steps.json
  python3 shared/tools/record_tui.py --project <dir> --name steer --extract-only

Steps run in order after the session starts; every step is logged with its time in events.json:
  {"sleep": 7}                                 wait a fixed time
  {"type": "重构 order 模块……"}                 type literal text (no Enter)
  {"key": "Enter"}                             send a tmux key name: Enter, Escape, Up, C-c ...
  {"waitFor": "⎿  (Added|Wrote) ", "count": 2, "timeout": 120}
                                               wait until the regex matches at least `count` times on screen
  {"mark": "queued"}                           write a named marker into events.json

Frames are captured every --interval seconds into assets/references/recordings/<name>/frames/NNNN.ans (with
colours) plus NNNN.t (seconds since capture start). timeline.json lists each distinct screen line with the
first and last second it was visible, which is the source for the reconstruction's text, order and timing.
Use a throwaway working directory: the recorded agent really runs and really edits files there.
"""
import argparse, json, re, shutil, subprocess, threading, time
from project_paths import project_path, write_json

ANSI = re.compile(r'\x1b\[[0-9;?]*[A-Za-z]|\x1b\]8;[^\x1b]*\x1b\\')


def tmux(*args: str, check: bool = True) -> str:
    return subprocess.run(['tmux', *args], check=check, capture_output=True, text=True, encoding='utf-8').stdout


def screen(session: str) -> str:
    return tmux('capture-pane', '-p', '-S', '-500', '-t', session, check=False)


def capture_loop(session: str, frames, interval: float, t0: float, stop: threading.Event) -> None:
    i = 0
    while not stop.is_set():
        out = tmux('capture-pane', '-p', '-e', '-t', session, check=False)
        (frames / f'{i:04d}.ans').write_text(out, encoding='utf-8')
        (frames / f'{i:04d}.t').write_text(f'{time.time() - t0:.2f}', encoding='utf-8')
        i += 1
        stop.wait(interval)


def run_steps(session: str, steps: list, t0: float) -> list:
    events = []
    log = lambda kind, value: events.append({'t': round(time.time() - t0, 2), kind: value})
    for step in steps:
        if 'sleep' in step:
            time.sleep(step['sleep'])
        elif 'type' in step:
            tmux('send-keys', '-t', session, '-l', step['type']); log('type', step['type'])
        elif 'key' in step:
            tmux('send-keys', '-t', session, step['key']); log('key', step['key'])
        elif 'mark' in step:
            log('mark', step['mark'])
        elif 'waitFor' in step:
            pattern, need = re.compile(step['waitFor']), step.get('count', 1)
            deadline = time.time() + step.get('timeout', 120)
            while len(pattern.findall(screen(session))) < need:
                if time.time() > deadline:
                    raise SystemExit(f'waitFor timed out: {step["waitFor"]!r} x{need}')
                time.sleep(0.2)
            log('matched', step['waitFor'])
    return events


def extract(out) -> None:
    """Distinct screen lines with first/last visible second, in order of first appearance."""
    seen: dict[str, list[float]] = {}
    for ans in sorted((out / 'frames').glob('*.ans')):
        t = float(ans.with_suffix('.t').read_text())
        for line in ANSI.sub('', ans.read_text(encoding='utf-8')).splitlines():
            text = line.rstrip()
            if text.strip():
                seen.setdefault(text, [t, t])[1] = t
    rows = [{'first': a, 'last': b, 'text': text} for text, (a, b) in seen.items()]
    write_json(out / 'timeline.json', sorted(rows, key=lambda r: r['first']))
    print(json.dumps({'recording': str(out), 'frames': len(list((out / 'frames').glob('*.ans'))), 'lines': len(rows)}, ensure_ascii=False))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--project', required=True, type=project_path)
    parser.add_argument('--name', required=True, help='recording name, e.g. steer or esc')
    parser.add_argument('--cwd', help='throwaway working directory the agent runs in')
    parser.add_argument('--cmd', help='command started inside tmux')
    parser.add_argument('--steps', help='JSON file with the step list')
    parser.add_argument('--size', default='104x34', help='terminal columns x rows')
    parser.add_argument('--interval', type=float, default=0.25)
    parser.add_argument('--tail', type=float, default=3, help='seconds to keep capturing after the last step')
    parser.add_argument('--extract-only', action='store_true', help='rebuild timeline.json from existing frames')
    args = parser.parse_args()
    out = args.project / 'assets/references/recordings' / args.name
    if args.extract_only:
        return extract(out)
    if not (args.cwd and args.cmd and args.steps):
        parser.error('--cwd, --cmd and --steps are required unless --extract-only')
    steps = json.loads(open(args.steps, encoding='utf-8').read())
    session = f'rec-{args.name}'
    shutil.rmtree(out / 'frames', ignore_errors=True)
    (out / 'frames').mkdir(parents=True)
    cols, rows = args.size.split('x')
    tmux('kill-session', '-t', session, check=False)
    tmux('new-session', '-d', '-s', session, '-x', cols, '-y', rows, '-c', args.cwd, args.cmd)
    t0, stop = time.time(), threading.Event()
    worker = threading.Thread(target=capture_loop, args=(session, out / 'frames', args.interval, t0, stop))
    worker.start()
    try:
        events = run_steps(session, steps, t0)
        time.sleep(args.tail)
    finally:
        stop.set(); worker.join()
        tmux('kill-session', '-t', session, check=False)
    write_json(out / 'events.json', {'cmd': args.cmd, 'cwd': args.cwd, 'size': args.size, 'steps': steps, 'events': events})
    extract(out)


if __name__ == '__main__':
    main()
