# 火山引擎豆包 TTS · 声音复刻 2.0（seed-icl-2.0）调用指南

> 目标：用**新版控制台**训练的克隆音色（`S_xxx` 开头）通过 HTTP SSE 生成 mp3 语音。

## 📋 前置准备

需要 3 样东西：

| 字段 | 示例 | 说明 |
|---|---|---|
| `API_KEY` | 从环境变量 `VOLC_TTS_API_KEY` 读取 | 火山**新版**控制台 → 声音复刻 2.0 → API Key（单键鉴权，不再需要 App ID / Access Key）。**禁止硬编码进文件**，本仓库是公开仓库 |
| `SPEAKER_ID` | **`S_ZqvEwo792`（B29 起默认 · B32 再次确认）** / `S_JcYEwo792`（B27 短期用过，已弃用）/ `S_7F8Gwo792`（B25 老音色） | 在新版控制台训练好的克隆音色 ID（永远 `S_` 开头，**无后缀**） |
| `RESOURCE_ID` | `seed-icl-2.0` | 固定值，对应"声音复刻 2.0" |

## ⚠️ 语速：speed_ratio 对克隆音色无效，必须用 ffmpeg atempo

**B41/B42 实测**：克隆音色 `S_ZqvEwo792` 传任何 `speed_ratio`，API 返回的音频字节与 1.0 **完全相同**。
所以语速**不能**靠 TTS 参数，只能：

1. TTS 原速合成（`speed_ratio: 1.0`）→ `audio/raw/beat_XX.mp3`
2. `ffmpeg -filter:a atempo=1.10` 后期变速 → `audio/beat_XX.mp3`

atempo 在 1.2 以内音质无损且保持音高。当前最佳 **`ATEMPO = 1.10`**，见 `templates/gen_audio.py`。

## 📖 官方文档

**https://www.volcengine.com/docs/6561/1598757**（v3 HTTP Chunked/SSE）

## 🌐 接口

- **端点**：`POST https://openspeech.bytedance.com/api/v3/tts/unidirectional/sse`
- **响应**：SSE 流，音频在 `data.data` 字段里 **base64 编码**

## 🔑 Request Headers

```
X-Api-Key:         <API_KEY>              ← 新版单键鉴权（关键！）
X-Api-Resource-Id: seed-icl-2.0           ← 声音复刻 2.0 固定值
X-Api-Connect-Id:  <随机 uuid>
Content-Type:      application/json
```

## 📦 Request Body

```json
{
  "user": {"uid": "your-app-name"},
  "event": 100,
  "namespace": "BidirectionalTTS",
  "req_params": {
    "text": "要合成的文本",
    "speaker": "S_ZqvEwo792",
    "speed_ratio": 1.0,
    "audio_params": {"format": "mp3", "sample_rate": 24000}
  }
}
```

> `speed_ratio` 保持 1.0——克隆音色不认这个参数，变速交给 ffmpeg atempo。

## 🐍 完整可运行 Python 示例

```python
import json, base64, uuid, os, requests

API_KEY     = os.environ["VOLC_TTS_API_KEY"]   # export VOLC_TTS_API_KEY="..."
SPEAKER_ID  = "S_ZqvEwo792"                     # 二哥克隆音色（B29 起默认）
TEXT        = "哈喽，我是二哥！"
OUT_FILE    = "out.mp3"

url = "https://openspeech.bytedance.com/api/v3/tts/unidirectional/sse"
headers = {
    "X-Api-Key":         API_KEY,
    "X-Api-Resource-Id": "seed-icl-2.0",
    "X-Api-Connect-Id":  str(uuid.uuid4()),
    "Content-Type":      "application/json",
}
body = {
    "user":   {"uid": "demo"},
    "event":  100,
    "namespace": "BidirectionalTTS",
    "req_params": {
        "text":    TEXT,
        "speaker": SPEAKER_ID,
        "speed_ratio": 1.0,
        "audio_params": {"format": "mp3", "sample_rate": 24000},
    },
}

r = requests.post(url, headers=headers, json=body, stream=True, timeout=60)
r.raise_for_status()

with open(OUT_FILE, "wb") as f:
    for line in r.iter_lines():
        if not line or not line.startswith(b"data:"):
            continue
        j = json.loads(line[5:].strip())
        chunk = j.get("data", {}).get("data")
        if chunk:
            f.write(base64.b64decode(chunk))

print(f"✅ 写入 {OUT_FILE}")
```

## ⚠️ 三个必踩的坑

### 坑 1 · 新旧版控制台鉴权完全不同

- **旧版**：`X-Api-App-Id` + `X-Api-Access-Key` 双凭证 —— 已过时
- **新版**：只需 **`X-Api-Key`** 单凭证
- 症状：用旧鉴权调新音色 → 401 / 鉴权失败

### 坑 2 · speaker_id 必须匹配 resource_id

| speaker 格式 | 对应 resource_id | 类型 |
|---|---|---|
| `S_xxx`（无后缀） | `seed-icl-2.0` | 自己训练的克隆音色 |
| `zh_xxx_bigtts` | `seed-tts-2.0` | 火山官方预设音色 |

不匹配报错：`resource ID is mismatched with speaker related resource`

### 坑 3 · 老克隆（1.0 训的）用 2.0 端点不通

只能用旧版 API 调，或者在新版控制台重训一个。

## 🎛️ 可选参数

放在 `req_params` 下：

```json
{
  "speed_ratio":  1.0,        // 克隆音色无效，恒 1.0，变速用 ffmpeg atempo
  "volume_ratio": 1.0,
  "pitch_ratio":  1.0
}
```

## ✅ 快速自检 checklist

- [ ] 控制台是"新版"吗？
- [ ] `VOLC_TTS_API_KEY` 环境变量设了吗？（不要写死进文件）
- [ ] `X-Api-Resource-Id` 是 `seed-icl-2.0` 吗？
- [ ] speaker 是 `S_` 开头无后缀吗？
- [ ] 请求方法是 POST + stream=True 吗？
- [ ] 解析响应时是从 `data:` 前缀 JSON 里的 `data.data` base64 解码吗？
- [ ] 变速是走 ffmpeg atempo 而不是 speed_ratio 吗？
