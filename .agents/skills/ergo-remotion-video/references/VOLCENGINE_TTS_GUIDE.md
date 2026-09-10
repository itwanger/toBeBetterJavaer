# 火山 TTS 使用约定

实际实现：[shared/tools/gen_audio.py](../../../../docs/src/ai/script/shared/tools/gen_audio.py)。项目配置来自 `project.json.config`，新项目初始值来自 [shared/config/video.config.json](../../../../docs/src/ai/script/shared/config/video.config.json)。不要在 Skill 下新增另一份 config 或模板脚本。

## 目前使用的请求方式

- endpoint、音色、resourceId、采样率均从项目配置读取。
- 当前实现为 SSE TTS：`X-Api-Key`、`X-Api-Resource-Id`、`X-Api-Connect-Id` headers；请求体包含 `event: 100`、`namespace: BidirectionalTTS` 与 `req_params`。
- `req_params` 使用 `text`、`speaker`、`speed_ratio`、`audio_params`。API Key 只通过 `config.volc.apiKeyEnv` 对应的环境变量读取，默认 `VOLC_TTS_API_KEY`。
- 历史实测中，当前克隆音色服务对顶层 `speed_ratio` 无明显响应。现有流程使用原速合成后 `ffmpeg atempo`，最终倍率取项目配置；变速可能影响音质和自然度，不称为无损。
- 若服务或 API 改动，核实当前官方文档及返回结果，再更新共享实现；本文件不是永不变化的服务契约。

## 调用与缓存

```bash
# 只检查计划，不读取密钥、不调用 TTS、不写音频
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/what-is-kv-cache --dry-run

# 确认稿子后，生成缺失或发生变化的配音单元
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/what-is-kv-cache

# 只重做某个单元；示例 ID 来自既有项目，不是新项目固定编号
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/what-is-kv-cache --only 69 --force

# 仅修改倍率后复用相同合成参数的 raw 音频
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/what-is-kv-cache --retempo

# 配音变化后同步时间轴
python3 docs/src/ai/script/shared/tools/gen_cues.py --project docs/src/ai/script/what-is-kv-cache
```

缓存索引在项目 `build/audio-generation.json`，合成文本、音色等请求参数及文件哈希共同决定复用；不能仅凭同名 MP3 存在而跳过。倍率变化只影响 processed，合成参数变化需要新 raw。`--retempo` 遇到 raw 不匹配会报错，不能拿旧音色悄悄生成新配置的文件。

原速文件：`audio/raw/beat_<id>.mp3`；处理文件：`audio/processed/beat_<id>.mp3`。单元 ID 保持稳定，重试采用临时文件成功后替换，失败不覆盖已经完成的音频。
