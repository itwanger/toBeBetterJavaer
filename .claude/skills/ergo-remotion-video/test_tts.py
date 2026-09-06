"""最小 TTS 验证脚本 · 走 config/video.config.json + 火山 seed-icl-2.0

用法:
    VOLC_TTS_API_KEY=xxx python3 test_tts.py
    # 或在 shell 里 export VOLC_TTS_API_KEY=xxx 后直接 python3 test_tts.py

所有 TTS 参数（speakerId / resourceId / audio format）从 config/video.config.json 读。
改音色只改 config, 不改本文件。
"""
import os, sys, json, base64, uuid, urllib.request, urllib.error
from pathlib import Path

# 加载全局配置
SKILL_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SKILL_DIR / "config"))
from config_loader import load_tts_config, load_volc_key  # noqa: E402

tts_cfg = load_tts_config()
API_KEY    = load_volc_key()
SPEAKER_ID = tts_cfg["speakerId"]
RESOURCE   = tts_cfg["resourceId"]
API_BASE   = tts_cfg["apiBase"]
AUDIO      = tts_cfg["audio"]      # {format, sampleRate}
TEXT       = "哈喽，我是二哥！"
OUT_FILE   = "test_tts_out.mp3"

print(f"✅ 读到 {len(API_KEY)} 字节的 VOLC_TTS_API_KEY")
print(f"✅ 音色: {SPEAKER_ID}  resource: {RESOURCE}  audio: {AUDIO['format']}@{AUDIO['sampleRate']}")

headers = {
    "X-Api-Key":         API_KEY,
    "X-Api-Resource-Id": RESOURCE,
    "X-Api-Connect-Id":  str(uuid.uuid4()),
    "Content-Type":      "application/json",
}
body = {
    "user":      {"uid": "tts-verify"},
    "event":     100,
    "namespace": "BidirectionalTTS",
    "req_params": {
        "text":         TEXT,
        "speaker":      SPEAKER_ID,
        "audio_params": {"format": AUDIO["format"], "sample_rate": AUDIO["sampleRate"]},
    },
}

print(f"📡 POST {API_BASE}")
req = urllib.request.Request(
    API_BASE, data=json.dumps(body).encode("utf-8"),
    headers=headers, method="POST",
)

try:
    resp = urllib.request.urlopen(req, timeout=60)
except urllib.error.HTTPError as e:
    print(f"❌ HTTP {e.code} {e.reason}")
    print(e.read().decode("utf-8", errors="replace"))
    sys.exit(2)

ct = resp.headers.get("Content-Type", "")
print(f"   Content-Type: {ct}")

# 正常授权: data 字段是 base64 字符串; 鉴权/资源错误: code 非 0
chunks = []
err = None
for raw in resp:
    line = raw.decode("utf-8", errors="replace").rstrip("\r\n")
    if not line or not line.startswith("data:"):
        continue
    try:
        j = json.loads(line[5:].strip())
    except Exception:
        continue
    code = j.get("code", 0)
    msg  = j.get("message", "")
    if code == 20000000:
        break
    if code != 0:
        err = f"code={code}, message={msg}"
        continue
    payload = j.get("data")
    if isinstance(payload, str) and payload:
        try:
            chunks.append(base64.b64decode(payload))
        except Exception as ex:
            print(f"⚠️  base64 decode 失败: {ex}")

if err and not chunks:
    print(f"❌ 服务端报错: {err}")
    sys.exit(3)
if not chunks:
    print("❌ 没拿到任何音频块")
    sys.exit(4)

audio_bytes = b"".join(chunks)
with open(OUT_FILE, "wb") as f:
    f.write(audio_bytes)
print(f"✅ 写入 {OUT_FILE} · {len(audio_bytes)} bytes")
