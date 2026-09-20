"""Transcribe a time slice of one processed unit for a second opinion on a flagged term.

  python3 shared/tools/asr_slice.py --project <dir> 25:5.6:7.4 30:6.0:7.4

Each spec is <unitId>:<startSec>:<endSec>. Results append to preview/asr-slices.json.
Slice ASR is only a hint (it may still normalize sounds); listening remains the final check.
"""
import argparse, json, subprocess, tempfile
from mlx_env import ensure_mlx_audio, ASR_MODEL
from project_paths import project_path, read_json, write_json, sha256


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--project', required=True, type=project_path)
    parser.add_argument('slices', nargs='+', help='unitId:startSec:endSec')
    args = parser.parse_args()
    ensure_mlx_audio()
    from mlx_audio.stt.utils import load_model

    model = load_model(ASR_MODEL)
    target = args.project / 'preview/asr-slices.json'
    results = read_json(target) if target.is_file() else []
    for spec in args.slices:
        unit_id, start, end = spec.split(':')
        source = args.project / 'audio/processed' / f'beat_{int(unit_id):02d}.mp3'
        with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
            subprocess.check_call(['ffmpeg', '-y', '-v', 'error', '-i', str(source), '-ss', start, '-to', end, '-ar', '16000', '-ac', '1', tmp.name])
            text = model.generate(tmp.name, max_tokens=60, language='Chinese').text
        row = {'unit': int(unit_id), 'slice': [float(start), float(end)], 'audioSha256': sha256(source)[:12], 'asr': text}
        results.append(row)
        print(json.dumps(row, ensure_ascii=False), flush=True)
    write_json(target, results)


if __name__ == '__main__':
    main()
