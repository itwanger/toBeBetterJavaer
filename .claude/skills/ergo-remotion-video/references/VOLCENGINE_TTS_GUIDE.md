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

“超长”读 **chāo cháng**（chao1 chang2），不能把“超”读成 **zhao**。2026-09-18 用户反馈：已发布的 `harness-five-elements` 视频中，beat 64“超长的输出一定要有截断机制”出现了该误读。后续合成包含“超长”的句子时，重点复听“超”的声母和整句衔接；ASR 转写成“超长”或“朝长”均不能据此放行。需要修复时保留字幕原文，按整句局部修复流程处理；尚无经试听确认有效的专用 `ttsText` 写法，不把拼音标注当作已验证的合成方案。本次用户仅要求记录到 Skill，不重制已发布视频。

RL 的已确认纠音实例：2026-09-18，在 `what-is-reinforcement-learning` 第一章中，用户认可“说 MiMo-V2.6 正在做 RL 训练”的读音，但指出后续 RL 异常。保留已认可音频，将后续五处的 `ttsText` 写成 `R L`（两个英文字母，中间一个空格），按完整意群重新合成，字幕仍写 `RL`；用户随后明确确认“RL 的发音正确了”。本次音色为 `S_j97bqlje2`，资源为 `seed-icl-2.0`，后处理倍率为 `1.10`。相同音色遇到 RL 误读时可优先复用此写法；不批量改动已认可的音频，不推广为所有缩写的统一规则，换音色或上下文仍需复听。

ASR 用于检查漏字、多字和辅助定位短语。它可能把不同发音都归一化成同一术语，因此“识别成 SQLite”不能证明音素正确。复听修正句及前后相邻句，检查起音、断句和语速；没有实际试听能力时，记录已完成的 ASR 检查与待复听项，不宣称已听到正确读音。

同一术语在不同句子里的合成读音可能不同。用户认可其中一处时，保留该音频作为读音参照，只修其余异常处；不要因统一 `ttsText` 写法而重做已认可的段落。用户确认某个术语正确，只标记该项通过，不推定整章或其他英文词已经验收。

局部修正先保留旧音频与生成记录。读音或断句问题优先重生成包含该词的完整意群，避免单词拼接造成接缝；字幕分组不限制整句合成。复核其余音频未变化，随后重建真实时间轴；已启用音效的项目重建混音，并重新检查受影响的字幕、短语动画与提示音时点。Studio 使用同名音频时更新资源版本并刷新预览，确认加载的是新音频，暂停在修正句起点供复听。

带连字符的标识符会被念出连字符：2026-09-20 `what-is-agent-checkpoint` 的 “file-history” 两次 ASR 分别在 file 与 history 之间听到“垃圾”“杠”，`ttsText` 改为 `file history` 重生成后转写正常。后续遇到 `file-history`、`step-001` 这类写法，`ttsText` 里把连字符换成空格，字幕保留原样。

`gitt` 写法不稳定：同一视频里第 28、31、41 段读音正常，第 30 段转写为“D 操作”，改回 `Git` 重生成后正常。它只是当前音色的候选提示，每处都要用切片 ASR（`shared/tools/asr_slice.py`）或复听单独核对，不能批量信任。

判断某个词是否读错的顺序：先看 `review_audio.py` 的差异是否是转写归一化；再看强制对齐的音段时长能否装下多余音节；最后对该时间段做切片二次转写。两次独立转写在同一位置都出现多余或错误音节，才整句重生成。

### Pi 与 LangGraph4J

2026-09-27，在 `building-effective-agents-principles` 中，用户指出 `LangGraph4J` 发音异常，并要求第一、二章及全文的 `Pi` 发音统一。以下写法用于本次音色 `S_j97bqlje2`、资源 `seed-icl-2.0`、后处理 `atempo: 1.10`；均已重新合成并做 ASR 检查，尚未获得用户对修正后听感的明确确认，不能记为已验收。

- **Pi**：本视频统一按「派」引导单音节读法，`ttsText` 中把产品名 `Pi` 写成「派」，`text` 和画面仍保留 `Pi`。不要让同一视频中有的读成单音节、有的逐字母读成 P-I。用户要求全文统一时，扫描全部章节，而不只修正在预览的一章；本次共重做 7 个完整意群、10 处产品名，包括尚未制作动画的后三章。已核对的 [Pi 官方文档](https://pi.dev/docs/latest) 没有给出明确音标，因此这是本视频的配音约定，不称作官方强制读法。汉字「派」是当前中文音色的合成提示，也不是英文音素控制。
- **LangGraph4J**：连写标识符出现误读时，只在 `ttsText` 中替换为 `Lang Graph four J`，明确英文单词边界、four 和字母 J；字幕不改。重生成包含该词的完整意群，不拼接单词音频。本次 ASR 为 `LangGraph for J`，for 与 four 的转写差异不能单独证明读音错误或正确。[官方仓库](https://github.com/langgraph4j/langgraph4j) 用 “LangGraph for Java” 解释名称，但该文字不构成 four J 的官方音标标准，仍需复听 Graph、four、J 及整句衔接。

后续相同音色出现这些词时优先使用上述提示，用户另有指定时覆盖。全文统一后保留原音频备份，核对未涉及的音频哈希不变；同步更新 `ttsText` 对应的字幕朗读锚点，重建全文时间轴及已制作章节的短语时点，刷新 Studio 音频版本。可按章节顺序输出每处术语带前后文的对照试听，避免仅抽查第一处就宣称全文一致。ASR 将「派」还原为 `Pi` 或把 `four` 写成 `for` 属于待结合听感判断的转写差异，不能据此把用户指出的问题视为已解决。

### 补充说明的断句

括号里的内容若是独立补充说明，需要与前面的主句形成听得出的语义边界；解释术语的紧密短语则可以连贯读出。不要只凭括号或逗号批量加停顿，也不要把整句拆成多个 TTS 文件。出现连读歧义时，保留 `text` 原文，在 `ttsText` 中调整标点引导断句，只重生成受影响的完整意群；字幕可在该边界独立分组。

2026-09-18，`what-is-reinforcement-learning` 第二章的“你看着这些标注来学习（特点是手把手教，成本高）。”被用户指出听成“学习特点”。修复时将 `ttsText` 写为“你看着这些标注来学习。特点是手把手教，成本高。”，字幕原文保持不变并分两组显示。此次音色 `S_j97bqlje2`、资源 `seed-icl-2.0`、倍率 `1.10` 下，逐词对齐的“学习”结束至“特点”起音间隔约 0.32 秒，低能量区间检查也支持存在停顿；这只是本次技术检查结果，不是固定停顿参数，也不替代用户对自然度的复听验收。

沿用局部修复流程，重建时间轴与混音并检查字幕、动画同步。目标是消除语义粘连，同时保持完整句子的自然节奏。

### 起音前杂音

用户指出起音前杂音时，先对照原配音、混音及音效计划，区分孤立噪声、字母发音与提示音。结合波形和实际语音起点判断：若孤立尖峰明确位于语音之前，优先只清理该区间并短淡入，保留后面的句子节奏；边界不确定或噪声与语音重叠时，不强行裁切。不能按固定时长批量删除句首，也不能把轻辅音或呼吸一律当作杂音。

保留原文件、处理参数及处理前后哈希，并把后处理写入生成记录；后续重合成或重新变速时需复核并重做仍有必要的清理，不能假设原处理会自动保留。处理后核对解码采样数与起音完整性：长度变化就重新对齐；长度不变且处理区间确实在语音前时，可以保留已核实的语音时点，但仍重建合并音轨与混音。波形尖峰消失是技术检查，最终听感以复听为准。

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
