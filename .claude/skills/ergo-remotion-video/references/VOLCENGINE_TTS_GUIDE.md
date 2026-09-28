# 火山 TTS 使用约定

实现在 [shared/tools/gen_audio.py](../../../../docs/src/ai/script/shared/tools/gen_audio.py)，项目配置来自 `project.json.config`，新项目初始值来自 [video.config.json](../../../../docs/src/ai/script/shared/config/video.config.json)。具体词的读法记在 [读音词典](../../../../docs/src/ai/script/shared/config/pronunciations.json)，本文件只写方法。

## 请求方式

- endpoint、音色、resourceId、采样率都从项目配置读取。
- 当前是 SSE TTS：headers 为 `X-Api-Key`、`X-Api-Resource-Id`、`X-Api-Connect-Id`；请求体包含 `event: 100`、`namespace: BidirectionalTTS` 和 `req_params`（`text`、`speaker`、`speed_ratio`、`audio_params`）。
- 历史实测中，克隆音色对 `speed_ratio` 没有明显响应。现在的做法是原速合成，再用 `ffmpeg atempo` 按项目倍率变速。变速可能影响音质和自然度，不称为无损。修改倍率后重建处理音频和时间轴；换音色要重新合成。
- 服务或 API 变化时，先核实官方文档和实际返回，再改共享实现。

## 术语读音

- 用户已经指定的读法优先。有争议的术语，核对作者本人、官方文档或官方演示并记录出处，区分作者读法和社区常见读法。搜索摘要和 AI 答案不能当作官方依据。
- `text` 保留原稿拼写，`ttsText` 只写读法提示，不加解释性旁白。`ttsText` 里的拼写只是给当前音色的提示，不是 IPA 或 SSML 音素控制，换音色要重新验证。
- 同一个术语在不同句子里可能读得不一样。用户认可了其中一处，就保留那段音频，只修其余有问题的地方，不为了统一写法重做已认可的段落。
- 新发现的误读、试出来有效的写法、用户确认的读法，都更新到读音词典：能稳定替换的写进 `rules`，还没有可靠写法的写进 `watch`，并在 `note` 里写日期、项目和出处。

## 判断是否读错

1. 先看 `review_audio.py` 的差异，排除转写归一化，比如 Claude 写成 Cloud、数字写成汉字。
2. 再看强制对齐的音段时长，能不能装下多出来的音节。
3. 最后用 `asr_slice.py` 对这一段做切片二次转写。

两次独立转写在同一位置都出现多余或错误的音节，才整句重生成。ASR 识别出正确拼写不代表发音正确，它会把不同发音归一成同一个词。无法试听时，如实记录已完成的 ASR 检查和待复听项。

## 局部修复

1. 保留旧音频和生成记录。
2. 重生成包含该词的完整意群，不拼接单词音频，避免接缝。字幕分组不限制整句合成。
3. 核对其余音频的哈希没有变化，重建时间轴。启用了提示音的项目重新混音，检查受影响的字幕、短语动画和提示音时点。
4. Studio 使用同名音频时，更新资源版本号并刷新预览，确认加载的是新音频，停在修正句起点供复听。

用户要求某个词全文统一时，扫描全部章节，包括还没做动画的章节，而不只是正在预览的一章。按章节顺序输出每一处带前后文的试听片段，不能只抽查第一处就宣称全文一致。

## 补充说明的断句

括号里的独立补充说明，要和前面的主句有听得出的语义边界；解释术语的紧密短语则连贯读出。不按括号或逗号批量加停顿，也不把一句拆成多个 TTS 文件。

例如“你看着这些标注来学习（特点是手把手教，成本高）。”曾被听成“学习特点”。修复时 `ttsText` 写成“你看着这些标注来学习。特点是手把手教，成本高。”，字幕原文不变，分两组显示，只重生成这一个意群。

## 起音前杂音

用户指出句首杂音时，先对照原配音、混音和音效计划，区分孤立噪声、字母发音和提示音。孤立尖峰明确位于语音之前时，只清理该区间并做短淡入；边界不确定或噪声和语音重叠时，不强行裁切。不按固定时长批量删句首，也不把轻辅音或呼吸当作杂音。

保留原文件、处理参数和前后哈希，写入生成记录。以后重新合成或变速，要复核并重做仍然需要的清理。处理后核对采样数和起音完整性：长度变了就重新对齐；长度不变且处理区间确实在语音之前，可以保留已核实的时点，但仍要重建合并音轨和混音。

## 调用与缓存

```bash
# 套用读音词典（只报告；加 --write 写入 ttsText）
python3 docs/src/ai/script/shared/tools/pronunciations.py --project docs/src/ai/script/<topic>

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
