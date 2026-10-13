# 火山 TTS 使用约定

实现在 [shared/tools/gen_audio.py](../../../../docs/src/ai/script/shared/tools/gen_audio.py)，项目配置来自 `project.json.config`，新项目初始值来自 [video.config.json](../../../../docs/src/ai/script/shared/config/video.config.json)。具体词的读法记在 [读音词典](../../../../docs/src/ai/script/shared/config/pronunciations.json)，本文件只写方法。

## 请求方式

- endpoint、音色、resourceId、采样率都从项目配置读取。
- 当前是 SSE TTS：headers 为 `X-Api-Key`、`X-Api-Resource-Id`、`X-Api-Connect-Id`；请求体包含 `event: 100`、`namespace: BidirectionalTTS` 和 `req_params`（`text`、`speaker`、`speed_ratio`、`audio_params`）。
- 历史实测中，克隆音色对 `speed_ratio` 没有明显响应。现在的做法是原速合成，再用 `ffmpeg atempo` 按项目倍率变速。变速可能影响音质和自然度，不称为无损。修改倍率后重建处理音频和时间轴；换音色要重新合成。
- 服务或 API 变化时，先核实官方文档和实际返回，再改共享实现。

## 术语读音

- 用户已经指定的读法优先。拿不准的术语先问用户，不自行去查读法。
- `text` 保留原稿拼写，`ttsText` 只写读法提示，不加解释性旁白。`ttsText` 里的拼写只是给当前音色的提示，不是 IPA 或 SSML 音素控制，换音色要重新验证。
- 同一个术语在不同句子里可能读得不一样。用户认可了其中一处，就保留那段音频，只修其余有问题的地方，不为了统一写法重做已认可的段落。
- 新发现的误读、试出来有效的写法、用户确认的读法，都更新到读音词典：能稳定替换的写进 `rules`，还没有可靠写法的写进 `watch`，并在 `note` 里写日期、项目和出处。
- 数字读法按语义处理：参数量 `78B` 读“七十八 B”，版本号逐位读（`0.58.4` 读“零点五八点四”），型号 `3.8` 写“三点八”避免读成日期。规则限定目标术语，不批量转换所有数字。
- 用户指定中文品牌读法时，连同后面的型号检查。例如 Qwen 读“千问”，`Qwen3.8` 的朗读提示为“千问 三点八”，`Qwen3.6` 为“千问 三点六”，字幕仍显示英文型号。用户指定读法无需等待 ASR 报错才修正。

## 判断是否读错

用户指出误读或指定读法时，直接按要求修。没人指出时，只处理 `review_audio.py` 在同一位置明显多字、缺字的情况（比如句首“派”被吞），转写归一化（Claude 写成 Cloud、数字写成汉字）不用管。

## 局部修复

1. 保留旧音频和生成记录。
2. 已有配音默认跳过，修正当前项目时用 `pronunciations.py --write --include-voiced`，再用 `gen_audio.py --only <id...>` 重生成相关完整意群，不拼接单词音频。
3. 重建时间轴。朗读改成中文后，`ch<N>-spec.json` 的锚点也改成实际朗读文本，字幕起点含该词时用 `[原字幕, 朗读锚点]`，例如 `["用 Qwen3.8-27B 重写。", "用 千问 三点八"]`。有提示音的项目重新混音。

用户要求某个词全文统一时，扫描全部章节，包括还没做动画的章节。

## 补充说明的断句

括号里的独立补充说明，要和前面的主句有听得出的语义边界；解释术语的紧密短语则连贯读出。不按括号或逗号批量加停顿，也不把一句拆成多个 TTS 文件。

例如“你看着这些标注来学习（特点是手把手教，成本高）。”曾被听成“学习特点”。修复时 `ttsText` 写成“你看着这些标注来学习。特点是手把手教，成本高。”，字幕原文不变，分两组显示，只重生成这一个意群。

没有标点的长句读得不连贯时，在 `ttsText` 的意群边界加逗号，比如“大模型的 API 要求，每一个 tool use 后面……”。

## 起音前杂音

用户指出句首杂音时，先排除提示音。孤立杂音明确在语音之前时，只把这一段清零并做短淡入，采样数保持不变；把处理参数和前后哈希写进 `build/audio-generation.json` 对应单元的 `cleanup`，并更新 `processedSha256`，否则下次跑 `gen_audio.py` 会被还原。之后重建时间轴和混音。噪声和语音重叠时不强行裁切。

## 调用与缓存

```bash
# 套用读音词典（只报告；加 --write 写入 ttsText）
python3 docs/src/ai/script/shared/tools/pronunciations.py --project docs/src/ai/script/<topic>

# 当前项目已有配音，用户授权改读音时才写入这些单元
python3 docs/src/ai/script/shared/tools/pronunciations.py --project docs/src/ai/script/<topic> --write --include-voiced

# 只检查计划，不读密钥、不调用 TTS、不写音频
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/<topic> --dry-run

# 生成缺失或发生变化的配音单元
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/<topic>

# 只重做某个单元
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/<topic> --only 69 --force

# 只改了倍率，复用合成参数相同的 raw 音频
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/<topic> --retempo

# 配音变化后同步时间轴
python3 docs/src/ai/script/shared/tools/gen_cues.py --project docs/src/ai/script/<topic>
```

缓存索引在项目 `build/audio-generation.json`，合成文本、音色等请求参数和文件哈希共同决定是否复用，不凭同名 MP3 存在就跳过。倍率变化只影响 processed，合成参数变化需要新的 raw。`--retempo` 遇到 raw 不匹配会报错。

原速文件在 `audio/raw/beat_<id>.mp3`，处理后的文件在 `audio/processed/beat_<id>.mp3`。单元 ID 保持稳定，重试先写临时文件，成功后再替换，失败不覆盖已完成的音频。
