"""
gen_audio.py · TTS 1.0 原速合成 → ffmpeg atempo 后期变速

🚨 火山克隆音色 S_ZqvEwo792 的顶层 speed_ratio 参数【不生效】（API 返回与 1.0 完全相同
的字节），所以语速不能靠 TTS 参数，必须 TTS 原速合成后用 ffmpeg atempo 后期变速。
atempo 在 1.2 以内音质无损、保持音高。B41/B42 已验证。

用法：
  python gen_audio.py            # 只合成缺失的 raw，再 atempo
  python gen_audio.py --force    # TTS 全部重合成 + atempo
  python gen_audio.py --retempo  # 只重跑 atempo，不调 TTS（调完 ATEMPO 用这个）
  python gen_audio.py --only 5 12
"""
import json, base64, uuid, argparse, shutil, subprocess
from pathlib import Path
import requests

# ─── 配置区 ───────────────────────────────────────
API_KEY     = "21d267c1-b3f4-4cc5-b844-1a96c9f45c93"
SPEAKER_ID  = "S_ZqvEwo792"   # 二哥克隆音色（B29 起默认 · B42 再次确认）
SPEED       = 1.0             # TTS speed_ratio 对克隆音色无效，保持 1.0
ATEMPO      = 1.10            # 后期 ffmpeg atempo 变速（SKILL 当前最佳：1.10）
SAMPLE_RATE = 24000
OUT_DIR     = Path("./audio")
RAW_DIR     = Path("./audio/raw")
BEATS_FILE  = Path("./beats.json")
# ─────────────────────────────────────────────────

URL = "https://openspeech.bytedance.com/api/v3/tts/unidirectional/sse"


def _find_ffmpeg() -> str:
    p = shutil.which("ffmpeg")
    if p:
        return p
    candidates = list(Path("./remotion/node_modules/@remotion").glob(
        "compositor-*/ffmpeg*"))
    if candidates:
        return str(candidates[0])
    raise FileNotFoundError("ffmpeg 未找到。请先 cd remotion && npm install")


def synth(text: str, out_path: Path) -> bool:
    headers = {
        "X-Api-Key":         API_KEY,
        "X-Api-Resource-Id": "seed-icl-2.0",
        "X-Api-Connect-Id":  str(uuid.uuid4()),
        "Content-Type":      "application/json",
    }
    body = {
        "user":   {"uid": "ergo-batch"},
        "event":  100,
        "namespace": "BidirectionalTTS",
        "req_params": {
            "text":         text,
            "speaker":      SPEAKER_ID,
            "speed_ratio":  SPEED,
            "audio_params": {"format": "mp3", "sample_rate": SAMPLE_RATE},
        },
    }
    r = requests.post(URL, headers=headers, json=body, stream=True, timeout=90)
    if r.status_code != 200:
        print(f"  X HTTP {r.status_code}: {r.text[:200]}")
        return False
    with open(out_path, "wb") as f:
        wrote = False
        for line in r.iter_lines():
            if not line or not line.startswith(b"data:"):
                continue
            try:
                j = json.loads(line[5:].strip())
            except Exception:
                continue
            if j.get("code") not in (0, 20000000):
                print(f"  ! API error: {j}")
                return False
            chunk = j.get("data")
            if isinstance(chunk, str) and chunk:
                f.write(base64.b64decode(chunk))
                wrote = True
    return wrote


def retempo(raw: Path, out: Path, ffmpeg: str, tempo: float = ATEMPO) -> bool:
    cmd = [
        ffmpeg, "-y", "-hide_banner", "-loglevel", "error",
        "-i", str(raw),
        "-filter:a", f"atempo={tempo}",
        "-ar", str(SAMPLE_RATE), "-ac", "1",
        "-codec:a", "libmp3lame", "-b:a", "96k",
        str(out),
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    return r.returncode == 0


def load_beats():
    raw = json.loads(BEATS_FILE.read_text(encoding="utf-8"))
    if isinstance(raw, dict) and "beats" in raw:
        return raw["beats"]
    return raw


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true", help="TTS 全量重合成")
    ap.add_argument("--retempo", action="store_true", help="只重跑 atempo，不调 TTS")
    ap.add_argument("--only", type=int, nargs="+")
    args = ap.parse_args()

    OUT_DIR.mkdir(exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    beats = load_beats()

    ffmpeg = _find_ffmpeg()
    print(f"ffmpeg: {ffmpeg}")
    print(f"atempo: {ATEMPO}")

    todo = beats
    if args.only:
        wanted = set(args.only)
        todo = [b for b in beats if b["id"] in wanted]

    for b in todo:
        bid = b["id"]
        text = b["text"]
        raw = RAW_DIR / f"beat_{bid:02d}.mp3"
        out = OUT_DIR / f"beat_{bid:02d}.mp3"

        if not args.retempo:
            if raw.exists() and not args.force:
                print(f"skip raw beat_{bid:02d} (exists)")
            else:
                print(f"synth raw beat_{bid:02d}: {text[:30]}...")
                if not synth(text, raw):
                    print(f"  X TTS failed")
                    continue
                print(f"  -> raw {raw.stat().st_size:>7} bytes")

        if not raw.exists():
            print(f"  X raw missing for beat_{bid:02d}, skip atempo")
            continue
        if retempo(raw, out, ffmpeg, ATEMPO):
            print(f"  -> beat_{bid:02d}.mp3  [atempo={ATEMPO}]  {out.stat().st_size:>7} bytes")
        else:
            print(f"  X retempo failed for beat_{bid:02d}")


if __name__ == "__main__":
    main()
