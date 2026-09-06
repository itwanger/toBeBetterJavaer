"""config_loader.py · 读 config/video.config.json，并合并环境变量（敏感字段）。

用法:
    sys.path.insert(0, "<skill_dir>")
    from config_loader import load_tts_config, load_volc_key
    tts  = load_tts_config()        # 返回 dict, 包含 speakerId/resourceId/apiBase/speedRatio/audio/atempo
    key  = load_volc_key()          # 返回 str; 不存在则 SystemExit

被以下文件使用:
    test_tts.py
    templates/gen_audio.py
"""
import json
import os
import sys
from pathlib import Path

_SKILL_DIR   = Path(__file__).resolve().parent.parent  # .../ergo-remotion-video
_CONFIG_PATH = _SKILL_DIR / "config" / "video.config.json"


def _read() -> dict:
    if not _CONFIG_PATH.exists():
        sys.exit(f"❌ 找不到配置文件: {_CONFIG_PATH}\n"
                 f"   这是 ergo-remotion-video 的全局配置入口。")
    with open(_CONFIG_PATH, encoding="utf-8") as f:
        return json.load(f)


def load_full() -> dict:
    """返回完整 config（debug 用，一般用 load_tts_config/load_volc_key）。"""
    return _read()


def load_tts_config() -> dict:
    """返回 tts 配置段: speakerId / resourceId / apiBase / speedRatio / audio / atempo"""
    cfg = _read()
    tts = cfg.get("tts")
    if not tts:
        sys.exit("❌ config/video.config.json 缺少 'tts' 段")
    return tts


def load_volc_key() -> str:
    """从环境变量读火山 TTS API Key（不存进 config）"""
    cfg = _read()
    env_name = cfg.get("volc", {}).get("apiKeyEnv", "VOLC_TTS_API_KEY")
    key = os.environ.get(env_name, "").strip()
    if not key:
        sys.exit(
            f"❌ 没读到环境变量 {env_name}\n"
            f"   请先执行: export {env_name}='你的火山声音复刻 2.0 API Key'"
        )
    return key


if __name__ == "__main__":
    # 自检: python3 config/config_loader.py
    tts = load_tts_config()
    print("tts config:", json.dumps(tts, ensure_ascii=False, indent=2))
    try:
        k = load_volc_key()
        print(f"volc key: {k[:6]}...{k[-4:]} (len={len(k)})")
    except SystemExit as e:
        print(str(e))
