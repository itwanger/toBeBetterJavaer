"""Per-beat ASR transcript plus Qwen3 forced alignment on the processed audio.

  python3 shared/tools/review_audio.py --project <dir> [--chapter ch3] [--only 25 30]

Writes preview/chapter<N>-asr.json (expected vs transcript, normalized diff) and
preview/ch<N>-forced-alignment.json (per-character spans used by build_timing.py).
--only re-runs the listed units and merges them into the existing chapter files.
ASR is for omission checks and phrase location only; it never certifies pronunciation.
"""
import argparse, array, difflib, json, re, subprocess
from pathlib import Path
from mlx_env import ensure_mlx_audio, ASR_MODEL, ALIGNER_MODEL
from project_paths import project_path, load_beats, sha256, read_json, write_json

STRIP = re.compile(r'[\s，。？！：；、,.!?;:“”"\'()（）《》/\-—·]+')


def norm(text: str) -> str:
    return STRIP.sub('', text).lower()


def duration_sec(path: Path) -> float:
    pcm = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', str(path), '-ar', '16000', '-ac', '1', '-f', 's16le', '-'])
    samples = array.array('h'); samples.frombytes(pcm)
    return len(samples) / 16000


def diff_summary(expected: str, transcript: str) -> list:
    a, b = norm(expected), norm(transcript)
    matcher = difflib.SequenceMatcher(None, a, b)
    return [[op, a[i1:i2], b[j1:j2]] for op, i1, i2, j1, j2 in matcher.get_opcodes() if op != 'equal']


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--project', required=True, type=project_path)
    parser.add_argument('--chapter', help='chapter id such as ch3; default all chapters')
    parser.add_argument('--only', nargs='*', type=int, default=[], help='unit ids to re-run and merge')
    args = parser.parse_args()
    ensure_mlx_audio()
    from mlx_audio.stt.utils import load_model

    project = args.project
    data, beats = load_beats(project)
    chapters = [c['id'] for c in data['chapters'] if not args.chapter or c['id'] == args.chapter]
    if args.only:
        chapters = [c for c in chapters if any(b['id'] in args.only and b['chapter'] == c for b in beats)]
    asr = load_model(ASR_MODEL)
    aligner = load_model(ALIGNER_MODEL)
    preview = project / 'preview'; preview.mkdir(exist_ok=True)
    for chapter in chapters:
        number = chapter[2:]
        asr_path = preview / f'chapter{number}-asr.json'
        align_path = preview / f'{chapter}-forced-alignment.json'
        asr_rows = read_json(asr_path) if args.only and asr_path.is_file() else []
        align_units = read_json(align_path)['units'] if args.only and align_path.is_file() else []
        for beat in (b for b in beats if b['chapter'] == chapter and (not args.only or b['id'] in args.only)):
            audio = project / 'audio/processed' / f"beat_{beat['id']:02d}.mp3"
            spoken = beat.get('ttsText') or beat['text']
            transcript = asr.generate(str(audio), max_tokens=300, language='Chinese').text
            row = {'id': beat['id'], 'expected': spoken, 'asr': transcript, 'durationSec': round(duration_sec(audio), 3), 'diff': diff_summary(spoken, transcript)}
            result = aligner.generate(str(audio), text=spoken, language='Chinese')
            unit = {'id': beat['id'], 'text': spoken, 'audioSha256': sha256(audio),
                    'items': [{'text': i.text, 'start_time': round(i.start_time, 3), 'end_time': round(i.end_time, 3)} for i in result.items]}
            asr_rows = [r for r in asr_rows if r['id'] != beat['id']] + [row]
            align_units = [u for u in align_units if u['id'] != beat['id']] + [unit]
            print(json.dumps({k: row[k] for k in ('id', 'asr', 'diff')}, ensure_ascii=False), flush=True)
        asr_rows.sort(key=lambda r: r['id']); align_units.sort(key=lambda u: u['id'])
        write_json(asr_path, asr_rows)
        write_json(align_path, {'model': ALIGNER_MODEL, 'asrModel': Path(ASR_MODEL).name, 'units': align_units})
        flagged = [r['id'] for r in asr_rows if r['diff']]
        print(json.dumps({'chapter': chapter, 'units': len(asr_rows), 'unitsWithDiff': flagged}, ensure_ascii=False), flush=True)


if __name__ == '__main__':
    main()
