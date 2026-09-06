"""
gen_audio.py · TTS 1.0 原速合成 → ffmpeg atempo 后期变速

TTS 参数（speakerId / resourceId / atempo / 音频格式）全部从 ../config/video.config.json 读。
改音色只改 config, 不改本文件。
敏感 key 走环境变量 VOLC_TTS_API_KEY。

🚨 火山克隆音色的顶层 speed_ratio 参数【不生效】（API 返回与 1.0 完全相同的字节），
所以语速不能靠 TTS 参数，必须 TTS 原速合成后用 ffmpeg atempo 后期变速。
atempo 在 1.2 以内音质无损、保持音高。B41/B42 已验证。

前置：
  export VOLC_TTS_API_KEY="你的火山 API Key"

用法：
  python gen_audio.py            # 只合成缺失的 raw，再 atempo
  python gen_audio.py --force    # TTS 全部重合成 + atempo
  python gen_audio.py --retempo  # 只重跑 atempo，不调 TTS（调完 ATEMPO 用这个）
  python gen_audio.py --only 5 12
"""
import json, base64, uuid, argparse, shutil, subprocess, os, sys
from pathlib import Path
import requests

# ─── 加载全局配置（单点维护）────────────────────
# gen_audio.py 会被 cp 到 B_XX/ 目录独立运行，所以要支持多种路径:
#  1. <skill>/templates/gen_audio.py → ../config/        (skill 内部跑)
#  2. B_XX/gen_audio.py           → ./config/           (项目里手 copy 了 config/)
#  3. B_XX/gen_audio.py           → ../../config/       (项目里 link 到 skill 的 config)
_HERE = Path(__file__).resolve().parent
_candidates = [
    _HERE / "config" / "config_loader.py",                  # ./config/        (项目里 copy 了 config/)
    _HERE.parent / "config" / "config_loader.py",           # ../config/      (项目与 skill 平级)
    _HERE.parent.parent / "config" / "config_loader.py",    # ../../config/   (项目在 skill 子目录下)
    _HERE.parent.parent.parent / "config" / "config_loader.py",  # ../../../config/
]
_loader_dir = None
for _c in _candidates:
    if _c.exists():
        _loader_dir = _c.parent
        break
if _loader_dir is None:
    sys.exit("❌ 找不到 config/config_loader.py。\n"
             "   请把 skill 根目录的 config/ 一起放到项目里，或在 skill 根目录跑。")
sys.path.insert(0, str(_loader_dir))
from config_loader import load_tts_config, load_volc_key  # noqa: E402

# ─── 业务参数（从 config 读，单点维护）───────────
_tts        = load_tts_config()
SPEAKER_ID  = _tts["speakerId"]
RESOURCE_ID = _tts["resourceId"]
URL         = _tts["apiBase"]
SPEED       = _tts.get("speedRatio", 1.0)   # 克隆音色无效, 保持 1.0
ATEMPO      = _tts.get("atempo", 1.10)
SAMPLE_RATE = _tts["audio"]["sampleRate"]
AUDIO_FMT   = _tts["audio"]["format"]
API_KEY     = ""                             # 默认空, main() 里按需加载

OUT_DIR     = Path("./audio")
RAW_DIR     = Path("./audio/raw")
BEATS_FILE  = Path("./beats.json")
# ─────────────────────────────────────────────────


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
        "X-Api-Resource-Id": RESOURCE_ID,
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
            "audio_params": {"format": AUDIO_FMT, "sample_rate": SAMPLE_RATE},
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

    # --retempo 不需要 key; 其他场景按需加载
    if not args.retempo:
        global API_KEY
        API_KEY = load_volc_key()

    OUT_DIR.mkdir(exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    beats = load_beats()

    ffmpeg = _find_ffmpeg()
    print(f"ffmpeg: {ffmpeg}")
    print(f"speaker: {SPEAKER_ID}  resource: {RESOURCE_ID}  atempo: {ATEMPO}")

    todo = beats
    if args.only:
        wanted = set(args.only)
        todo = [b for b in beats if b["id"] in wanted]

    for b in todo:
        bid = b["id"]
        # ttsText 优先：发音停顿和指定读法只进 TTS，字幕仍用原文 text。
        text = b.get("ttsText") or b["text"]
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
