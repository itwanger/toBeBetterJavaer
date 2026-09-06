# `config/` · 全局配置（单点维护）

ergo-remotion-video 的所有 TTS / 业务参数都从这里读。**改一次，全仓生效**。

## 文件

| 文件 | 用途 |
|---|---|
| `video.config.json` | 业务参数（音色 / 资源 ID / atempo / 音频格式），**入库** |
| `config_loader.py` | Python loader：读 JSON + 合并环境变量（敏感 key） |

## 当前配置

```json
{
  "tts": {
    "speakerId":  "S_tGhhqlje2",          // 二哥自训克隆音色
    "resourceId": "seed-icl-2.0",         // 声音复刻 2.0
    "apiBase":    "https://openspeech.bytedance.com/api/v3/tts/unidirectional/sse",
    "speedRatio": 1.0,                    // 克隆音色无效，保持 1.0
    "audio":      { "format": "mp3", "sampleRate": 24000 },
    "atempo":     1.10                    // ffmpeg 后期变速
  },
  "volc": {
    "apiKeyEnv":  "VOLC_TTS_API_KEY"      // 从环境变量读
  }
}
```

## 怎么改

### 换音色

只需要在「声音复刻 2.0」控制台训练新音色，把控制台给的 `S_xxx` 填进 `tts.speakerId`：

```json
{ "tts": { "speakerId": "S_新音色id", ... } }
```

不需要改 `test_tts.py` / `gen_audio.py` / SKILL.md。

### 换语速

改 `tts.atempo`（1.0 = 原速, 1.10 = 加快 10%），建议 ≤ 1.20 保持音高。

改完跑：

```bash
python templates/gen_audio.py --retempo   # 只重跑 atempo，不调 TTS
```

### 换 API Key

API Key 走环境变量，**不入库**。在 `~/.zshrc` 加：

```bash
export VOLC_TTS_API_KEY="你的火山声音复刻 2.0 API Key"
```

或者临时：

```bash
export VOLC_TTS_API_KEY="..." && python test_tts.py
```

## 谁在用这个 config

| 文件 | 读什么 |
|---|---|
| `test_tts.py` | tts.speakerId / resourceId / apiBase / audio |
| `templates/gen_audio.py` | tts 全字段 + volc.apiKeyEnv |
| `templates/gen_cues.py` | 不读 TTS（ffprobe + ffmpeg） |
| `templates/align_words.py` | 不读 TTS（纯本地能量分析） |

## B_XX/ 项目里怎么用

`gen_audio.py` 被 `cp` 到 `B_XX/` 之后独立运行，loader 会按以下顺序找 config：

1. `./config/config_loader.py`（项目里手 copy 了 `config/`）
2. `../config/config_loader.py`（项目在 skill 根目录的同目录下，最常见）
3. `../../config/config_loader.py`（项目在 skill 根目录的子目录下）

所以两种部署方式都支持：

- **方式 A**：把 `config/` 整个 copy 到 `B_XX/` 项目里（自包含，不依赖 skill 目录）
- **方式 B**：`B_XX/` 跟 `ergo-remotion-video/` 平级，loader 自动从上级找 config（节省空间，改一处全仓生效）

找不到时给明确错误提示，不静默失败。
