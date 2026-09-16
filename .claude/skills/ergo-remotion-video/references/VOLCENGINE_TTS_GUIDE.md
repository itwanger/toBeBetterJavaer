# 火山 TTS 使用约定

实际实现：[shared/tools/gen_audio.py](../../../../docs/src/ai/script/shared/tools/gen_audio.py)。项目配置来自 `project.json.config`，新项目初始值来自 [shared/config/video.config.json](../../../../docs/src/ai/script/shared/config/video.config.json)。不要在 Skill 下新增另一份 config 或模板脚本。

## 目前使用的请求方式

- endpoint、音色、resourceId、采样率均从项目配置读取。
- 当前实现为 SSE TTS：`X-Api-Key`、`X-Api-Resource-Id`、`X-Api-Connect-Id` headers；请求体包含 `event: 100`、`namespace: BidirectionalTTS` 与 `req_params`。
- `req_params` 使用 `text`、`speaker`、`speed_ratio`、`audio_params`。API Key 只通过 `config.volc.apiKeyEnv` 对应的环境变量读取，默认 `VOLC_TTS_API_KEY`。
- 历史实测中，当前克隆音色服务对顶层 `speed_ratio` 无明显响应。现有流程使用原速合成后 `ffmpeg atempo`，最终倍率取项目配置；变速可能影响音质和自然度，不称为无损。
- 若服务或 API 改动，核实当前官方文档及返回结果，再更新共享实现；本文件不是永不变化的服务契约。

## 术语读音与局部修复

用户已指定的读法优先保留。遇到有争议或合成不稳定的术语，核对作者本人、官方文档或官方演示，并记录出处；区分作者采用的读法和社区常见读法，不把搜索摘要中的“官方推荐”直接当作结论。`text` 保留原稿拼写，只在 `ttsText` 中写读法提示，不加入解释性旁白。

SQLite 的作者 Richard Hipp 在 [本人访谈](https://changelog.com/podcast/201) 中明确读作 **S-Q-L-ite**：三个字母后接 `/aɪt/`，像矿物名的 `-ite`，不额外加一个 L。作者也接受其他常见读法；不要写成“官方要求读两个 L”。当前项目可用 `S Q L ite` 作为 TTS 输入提示，但提示文本不是实际发音保证，仍需试听；字幕保留 `SQLite`。

Git 的目标读音是 **/ɡɪt/**，一个音节：硬 g 加 sit 中的短 /ɪ/，不读成 get /ɡet/、/dʒɪt/ 或逐字母 G-I-T。读音参照 [剑桥词典](https://dictionary.cambridge.org/us/pronunciation/english/git)；[Git 官方 README](https://github.com/git/git/blob/master/README.md)提供命名说明，但不直接给出音标，不把词典标注写成官方音标声明。

本地克隆音色曾将“用 git 的 worktree 隔离”读得接近 get，用户听感与 ASR 均提出疑点；仅改大小写为 `Git` 后，ASR 仍识别为 get。可在 `ttsText` 中试用 `gitt` 引导短 /ɪ/，字幕继续保留原稿 `git` / `Git`。此次整句重生成后 ASR 从 get 变为 Git，但尚不等于音素验收通过。该拼写只是当前音色的候选提示，不是正确拼写、IPA 或 SSML 音素控制；换音色需重新验证，不批量替换全部 Git。优先重生成包含术语的完整 beat，连同“Git 的 worktree”及相邻句复听，避免单词拼接引入新接缝。

ASR 用于检查漏字、多字和辅助定位短语。它可能把不同发音都归一化成同一术语，因此“识别成 SQLite”不能证明音素正确。复听修正句及前后相邻句，检查起音、断句和语速；没有实际试听能力时，记录已完成的 ASR 检查与待复听项，不宣称已听到正确读音。

局部修正先保留旧音频与生成记录，只重生成受影响的 beat，复核其余音频未变化；随后重建真实时间轴，已启用音效的项目重建混音，并重新检查受影响的短语动画时点。Studio 使用同名音频时刷新预览，停在修正句起点供复听，不沿用缓存音频作为验收依据。

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
