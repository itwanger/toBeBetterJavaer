# 视频项目布局与执行约定

本文件是目录、路径与命令的唯一维护入口。Skill 保留内容、风格和验收规则；共享执行代码由本目录维护。

员工入门请先看[图文操作手册](../README.md)，本文件用于技术配置与命令核对。

## 文件归属

```text
script/
├── package.json / package-lock.json  共用 Node 依赖与锁定版本
├── shared/
│   ├── VISUAL_STYLE.md               画面规范入口，Claude Code 与 Codex 共用
│   ├── config/video.config.json      新项目默认配置，无密钥
│   ├── config/pronunciations.json    配音读法词典（按音色生效）
│   ├── assets/ergo-avatar.jpg        默认人物原图
│   ├── assets/interview/             面试头像及来源记录
│   ├── assets/brands/                已核实来源的产品图标
│   ├── assets/harness/               Harness 马具比喻的马匹图
│   ├── assets/sfx/                   提示音
│   ├── tools/                       通用 Python / Node 命令
│   └── remotion/
│       ├── components/              无主题数据的公共组件
│       ├── examples/                章节骨架和卡片样张，不参与项目编译
│       └── templates/               初始化后成为项目自身的动画骨架
└── <topic>/
    ├── project.json                 项目信息、输出名、完整配置快照
    ├── article.md / script.md        原文快照 / 确认后的口播稿
    ├── beats.json / OUTLINE.md       beat 与章节定义 / 分镜规划
    ├── assets/images/               本视频实际采用的图片和人物副本
    ├── assets/references/            按需保存的参考材料
    ├── audio/raw/                   TTS 原始 MP3
    ├── audio/processed/             按项目倍率处理的 MP3
    ├── build/                       cues、chapters、cues.ts、合并音轨和生成记录
    ├── remotion/src/                本视频的场景与注册入口
    ├── remotion/public/audio         相对链接 -> ../../build
    ├── remotion/public/images        相对链接 -> ../../assets/images
    ├── preview/                     试听、关键帧、日志和检查报告
    └── output/                      交付 MP4
```

共享目录和依赖声明入库；视频目录继续按仓库既有策略留在本地。新克隆仓库需要初始化视频项目。当前机器复用仓库已有 `remotion-project/node_modules` 安装，`script/node_modules` 为相对链接，不下载第二套依赖。新环境在 `script/` 下按锁文件安装依赖；不要在每个视频目录重复安装。

## 配置约定

`project.json.config` 是完整快照，包含 `tts`、`video`、`volc` 三部分。所有生成工具只读取项目快照，不运行时合并全局默认值。初始化时复制默认值，之后改共享默认值不影响已建项目。

API Key 只读取 `config.volc.apiKeyEnv` 对应的环境变量。不要存进 JSON、命令参数或报告。公共组件不得依赖某视频的 beats、标题或字幕时点。

## 项目选择与初始化

下面示例从仓库根目录执行。工具和 `--project` 都支持绝对路径，因此也可从其他 cwd 调用。`--project` 表示项目目录，不是原文文件，也不是 `shared`。

```bash
python3 docs/src/ai/script/shared/tools/init_project.py --project docs/src/ai/script/what-is-prefix-caching --source docs/src/ai/video/what-is-prefix-caching.md --title 'Prefix Caching'
python3 docs/src/ai/script/shared/tools/doctor.py --project docs/src/ai/script/what-is-prefix-caching
```

初始化拒绝覆盖现有目录，复制原文和默认头像，生成完整项目配置及草稿骨架，不调用 TTS。草稿只有 `DraftPreview`，确认口播稿后再实现真实章节与总 Composition。

初始化默认开启提示音：`project.json` 写入 `deliveryAudio: "build/voiceover-with-effects.wav"`，并创建空的 `assets/references/sound-plan.json`。事件为空时混音与原配音一致，逐章制作时再加事件。用户不要提示音时，初始化加 `--no-effects`；已初始化的项目删除 `deliveryAudio`，章节音频改读 `build/voiceover.wav`。

初始化复制的文章仅为整理起点，按 Skill 的内容规则整理项目 `article.md`，原始源文章不改。项目用稿可能与源文章不同，检查记录分别保存来源哈希与用稿哈希。

## 制作进度

新项目的 `project.json` 带 `progress` 字段，记录用户已经认可到哪一步。阶段依次为 `script`、`audio`、各章节 ID、`render`、`verified`。只在对应的用户回复或工具结果出现后标记，后续会话据此判断授权范围。

```bash
python3 docs/src/ai/script/shared/tools/progress.py --project docs/src/ai/script/<topic>              # 查看当前阶段与下一步
python3 docs/src/ai/script/shared/tools/progress.py --project docs/src/ai/script/<topic> --mark ch2    # 用户认可第二章后
```

`doctor.py` 的输出也带同样的进度摘要。

## 面试开场素材

选择面试头像开场模式，或科普场景需要用二哥和豆包表示学习者与老师时，从 `shared/assets/interview/` 复制 `doubao-facing-right.png` 与 `ergo-facing-left.png` 到本项目 `assets/images/`，将所用素材的 `sources.json` 条目保存到项目 `assets/references/` 并在分镜记录用途。初始化工具只复制默认头像。

新项目尚无这些文件时，从仓库根目录执行（将 `<topic>` 替换成当前项目目录名）：

```bash
cp -n docs/src/ai/script/shared/assets/interview/doubao-facing-right.png docs/src/ai/script/<topic>/assets/images/doubao-facing-right.png
cp -n docs/src/ai/script/shared/assets/interview/ergo-facing-left.png docs/src/ai/script/<topic>/assets/images/ergo-facing-left.png
```

如果项目已有同名图片，先确认是否为用户指定版本，不覆盖。面试开场直接用 `Scenes.tsx` 的 `InterviewStage`，它按上面两个文件名读取项目副本；只需要头像时用 `InterviewAvatar.tsx`。

## Harness 马匹素材复用

用户认可的两张马匹图在 [assets/harness](assets/harness/)。`horse-bare.png` 是无马具版，`horse-with-tack.png` 是同一匹马、同一姿势的带马具版，均为朝右侧视的 1536×1024 透明 PNG，来源、生成提示词和哈希在同目录 `sources.json`。

讲 Harness 的“野马套上缰绳和马鞍”比喻时，把两张 PNG 复制到本项目 `assets/images/`，`sources.json` 复制为 `assets/references/harness-horse-sources.json`。两张图保持相同位置和缩放，先显示无马具版，配音讲到缰绳、马鞍时短淡入带马具版，可小幅右移一次后稳定展示。时点按本项目真实音频定位，不重新生成，也不用手写几何 SVG 马替代。只提到 Harness、没有马具比喻时不插入马匹。

## 内容和 beat 拆分

`beats.json` 保留如下输入结构，数量由实际内容决定：

```json
{
  "chapters": [{"id": "ch1", "title": "章节标题"}],
  "beats": [{"id": 1, "chapter": "ch1", "text": "确认后的 beat 台词。", "ttsText": "确认后的 beat 台词。"}]
}
```

数组顺序就是播放顺序，ID 保持稳定且唯一，同一章节的 beat 连续排列。`ttsText` 可省略。beat 按完整句子或自然意群划分，不以字幕长度或目标段数决定合成次数；一个 beat 内可切换多组字幕和动画。讲同一画面的相邻 beat 共用 Sequence；用户反馈配音断句过多时，可合并相关意群重新合成，并在项目中保存旧短语到新配音单元的映射。短语时点必须从新音频定位，不能继续把已移除的 beat ID 当作 cues 查询。具体见 [配音单元与字幕短语分开](../../../../../.claude/skills/ergo-remotion-video/references/AV_SYNC.md#配音单元与字幕短语分开)。

`OUTLINE.md` 同时维护正文配图的使用映射：来源 URL、项目文件、场景、beat 范围、预览检查状态。每张保留的正文图都要有明确去向；未采用则记录原因。素材清单只登记下载路径不能代替分镜。逐章检查要覆盖实际配图帧和主要动画场景，确认图片完整可读、字幕切换时图像保持连续。

正文导航由 `ChapterShell` 内的 `ChapterStrip` 渲染，传入本项目品牌、章节名称和当前章。面试模式的特殊顶部布局仅限对话开场。

## 配音与时间轴

口播稿确认后、第一次合成前，先套用读音词典 [pronunciations.json](config/pronunciations.json)。`rules` 写入 `ttsText`，字幕 `text` 不变；`watch` 只列出要复听的 beat。已有音频的 beat 默认跳过，不会被动重合成。

```bash
python3 docs/src/ai/script/shared/tools/pronunciations.py --project docs/src/ai/script/<topic>            # 只报告
python3 docs/src/ai/script/shared/tools/pronunciations.py --project docs/src/ai/script/<topic> --write    # 写入 ttsText
```

规则按 `speakers` 限定音色，换音色后不生效，需要重新验证后再加。`status` 为 `candidate` 的规则写入后仍要复听。用户确认某个读法，或新发现一个误读，就更新词典条目，不在文档里追加案例。判断误读和局部修复的方法见 [TTS 使用约定](../../../../../.claude/skills/ergo-remotion-video/references/VOLCENGINE_TTS_GUIDE.md#判断是否读错)。

用户指定读法时直接采用，扫描当前项目全部章节，字幕 `text` 保持不变；数字按数量、错误码或型号的实际语义处理。修正已有配音先运行 `pronunciations.py` 查看范围，再用 `--write --include-voiced` 写入并核对，仅重生成受影响的完整意群。词典的用户指定状态与新音频的复听验收分开记录；具体方法见 [局部修复](../../../../../.claude/skills/ergo-remotion-video/references/VOLCENGINE_TTS_GUIDE.md#局部修复)。

```bash
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/what-is-kv-cache --dry-run
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/what-is-kv-cache
python3 docs/src/ai/script/shared/tools/gen_cues.py --project docs/src/ai/script/what-is-kv-cache
python3 docs/src/ai/script/shared/tools/align_words.py --project docs/src/ai/script/what-is-kv-cache --id 69
```

密钥只在 `~/.zshrc` 里 export 时，`zsh -lc` 不会加载它；从 Agent 里调用配音要用 `zsh -ic 'python3 …/gen_audio.py …'`。

`--dry-run` 不读取密钥、不联网、不写音频；先检查动作数量再决定是否执行。输出里的 `pronunciation` 列出尚未写入的词典规则和待复听的 beat。`--only <id...>` 只处理指定单元；`--force` 明确重合成；`--retempo` 复用参数匹配的 raw，仅重新处理倍率。文本、音色和请求参数或文件哈希变化都会使旧 raw 失效；不是仅检查文件存在。

`gen_cues.py` 使用 `audio/processed` 中的实际解码采样生成时间轴和 WAV。输出在 `build/`，当前项目的 `remotion/src` 从 `../../build/cues` 导入。生成文件不要手改；音频变化后重新生成。生成记录也在 `build/`，不要硬编码某条视频的 ID、总帧数或时长。

## 音频复核与时点生成

配音生成后，先对全部单元跑一次 ASR 与逐词强制对齐，后面每章直接用；局部重生成后用 `--only` 只更新受影响的单元。脚本依赖 mlx_audio，它装在 uv 独立环境（`~/.local/share/uv/tools/mlx-audio/bin/python`），模型在 `~/.cache/mlx-models`；脚本会自动切换到该解释器，也可用 `MLX_AUDIO_PYTHON` 指定。

```bash
python3 docs/src/ai/script/shared/tools/review_audio.py --project docs/src/ai/script/<topic>            # 全部章节
python3 docs/src/ai/script/shared/tools/review_audio.py --project docs/src/ai/script/<topic> --only 25 30
python3 docs/src/ai/script/shared/tools/asr_slice.py --project docs/src/ai/script/<topic> 25:5.6:7.4    # 对可疑词做切片二次转写
```

输出在 `preview/chapter<N>-asr.json`（含与朗读文本的归一化差异）和 `preview/ch<N>-forced-alignment.json`。差异多为转写归一化（Claude 写成 Cloud、“地”写成“的”、数字写成汉字），只有同一位置多次出现多余或缺失音节才值得处理。ASR 一致不等于读音验收。

每章的字幕分组和动画锚点写在 `assets/references/ch<N>-spec.json`，格式见 `build_timing.py` 的说明：字幕短语必须原样拼接成原文（保留空格），单行宽度不超过 34 个单位；字幕与朗读不一致时（87% 读“百分之八十七”、路径读“点 agent 斜杠”）用 `[字幕, 朗读锚点]`。事件锚点为 null（单元起点）、"end" 或朗读文本中的片段，附偏移帧数（入场常用 -5）。

修正读音后，字幕起点和事件锚点都对照新 `ttsText` 检查；品牌英文改读中文时尤其不能继续用英文查询起音。重新对齐、生成时点并同步提示音后，按章节顺序交付全部修改处的上下文试听。Studio 未成功加载并播放新资源时，明确记录播放未验证。

```bash
python3 docs/src/ai/script/shared/tools/build_timing.py --project docs/src/ai/script/<topic> --chapter ch2
python3 docs/src/ai/script/shared/tools/chapter_pipeline.py --project docs/src/ai/script/<topic> --chapter ch2 --still term:60 --still figure:640
```

`chapter_pipeline.py` 依次执行时点生成、混音（存在 sound-plan.json 时）、类型检查、关键帧输出到 `preview/chapter<N>/<label>-<frame>.png`，任一步失败即停止。提示音偏移依赖新事件时，先跑一次得到时点，写好 sound-plan 后再跑一次。

顺序约定：**先生成 `ch<N>-phrase-timing.json`，再写或改 `Chapter<N>.tsx`**。反过来会让 Studio 热更新记下“找不到模块”的错误，也可能让关键帧从旧包渲染。改动组件后如有疑问，重渲染关键帧核对，不以浏览器累计的控制台日志判断当前状态，用 Studio 服务端日志。

## 预览与导出

```bash
node docs/src/ai/script/shared/tools/remotion.mjs typecheck --project docs/src/ai/script/what-is-kv-cache
node docs/src/ai/script/shared/tools/remotion.mjs studio --project docs/src/ai/script/what-is-kv-cache --port 3001
node docs/src/ai/script/shared/tools/remotion.mjs still --project docs/src/ai/script/what-is-kv-cache --composition Chapter5Preview --frame 250
```

`still` 默认写到 `preview/path-check.png`，传 `--out <路径>` 可直接写到目标文件，多张关键帧不必逐张复制。

### 预览浏览器

优先继续使用已经运行的正确 Studio；端口按实际情况选择，不关闭其他项目服务。共享 Studio 入口带 `--no-open`，只启动服务，不自动打开外部浏览器。预览默认用宿主的内置浏览器打开服务实际输出的 URL，并复用当前项目已有的预览标签；不要默认另起 Chrome 或 agent-browser。内置浏览器不可用或确有兼容问题时，说明原因后再用外部浏览器。

- **Claude Code**：用内置浏览器（`mcp__Claude_Browser__*`）打开。空格键不会触发播放，点底部的 Play 按钮；回到某一帧，点左下角的帧数按钮输入数字后回车；用页面里 audio 元素的 `currentTime` 是否前进判断音频真的在播。
- **Codex**：通过 `mcp__codex_app__open_in_codex` 展示，用可用的内置浏览器控制工具检查画面。

看完预览后暂停播放。临时自动化浏览器在检查完成、失败或取消时关闭本次会话；不要留下循环播放，也不要批量终止其他任务的浏览器。遇到无法自动息屏时，用 `pmset -g assertions` 核对是否仍有本次进程持有 `Video Wake Lock`。

`still` / `render` 所需的后台渲染浏览器与 Studio 预览分开处理，不能用内置预览标签替代。macOS 有本机 Chrome 时共享入口为这两种操作自动使用；其他环境可设置 `REMOTION_BROWSER_EXECUTABLE`，否则遵循 Remotion 默认渲染浏览器行为。

只有用户明确授权「出片 / 渲染」后执行：

```bash
node docs/src/ai/script/shared/tools/remotion.mjs render --project docs/src/ai/script/what-is-kv-cache
python3 docs/src/ai/script/shared/tools/verify_export.py --project docs/src/ai/script/what-is-kv-cache
```

整片渲染通常超过 10 分钟（本机约 4.5 分钟成片需 12 分钟），超过 Agent 单条命令的上限，必须加 `--detach`：入口会脱离会话启动子进程，打印 pid 与日志路径 `preview/render/render.log`，之后轮询日志或 `pgrep -f 'remotion-cli.js render'` 等待完成。macOS 没有 setsid，不要手写 nohup 组合。

```bash
node docs/src/ai/script/shared/tools/remotion.mjs render --project docs/src/ai/script/<topic> --detach
```

渲染前入口会重新读原稿：有“视频封面”区块时必须已有 `assets/images/cover-16x9.png`，且 `Root.tsx` 用了 `CoverFrame`，否则报错退出；用户明确不要首帧封面时加 `--no-cover`。`doctor.py` 输出的 `cover` 字段同样报告 `ready`、`missing`、`none`。

render 先输出 `preview/render/remotion-raw.mp4`，再复制其 H.264 视频流，用项目 `deliveryAudio` 指定的混音（未设置时使用 `build/voiceover.wav`）重新编码 AAC、按总帧数截定时长，写到 `output/<project.outputName>`。这样处理已有导出中观察到的统一音频延迟；仍需实际验证。失败时不替换已有最终 MP4。

`verify_export.py` 完整解码、核对尺寸帧率帧数、比较原配音与导出声音的同位置波形，生成每章截图与 `preview/export-check/report.json`。类型检查和截图通过不等于用户已验收，也不等于已发布。

## 成片版本管理

每条视频的 `output/` 顶层只保存 `project.outputName` 指定的最终音画合成 MP4，保留原文件名。试做、章节预览和无音轨中间文件放 `preview/`，旧版放 `output/legacy/`。共享 render 临时封装的 `*.tmp.mp4` 继续忽略，成功后才改名为最终文件。

根 `.gitignore` 用固定规则放行所有项目的最终成片，新视频无需追加规则。下面规则应放在通用的依赖、密钥和缓存忽略规则之前；工作区 `package-lock.json` 的例外保留在通用 `package-lock.json` 规则之后。

```gitignore
/docs/src/ai/script/**
!/docs/src/ai/script/*/
!/docs/src/ai/script/*/output/
!/docs/src/ai/script/*/output/*.mp4
/docs/src/ai/script/*/output/*.tmp.mp4
!/docs/src/ai/script/shared/**
!/docs/src/ai/script/README.md
!/docs/src/ai/script/package.json
```

验收后用 `git status --short --untracked-files=all -- docs/src/ai/script/` 确认待提交 MP4 都是各项目配置指定的最终文件，并用 `git check-ignore` 抽查预览、配音、临时文件及旧版仍被忽略。规则只按目录和文件名匹配，不会判断视频是否通过验收，因此必须在提交前完成成片检查。提交前检查文件大小；遇到远端大小限制时再选择 Git LFS 或 Release 附件，不自动转换整个仓库的 MP4 存储方式。

最终成片出现在 Git 待提交列表中不代表已上传。仅在用户明确要求时执行 commit/push，成功后再报告已上传 GitHub。

## 命令执行注意

- 不在 Bash 里 `cd`：工作目录会跨调用漂移，之后的相对路径全错。一律从仓库根目录用相对路径，或给工具传绝对路径。
- Python heredoc 含中文时加 `# -*- coding: utf-8 -*-` 并设 `LC_ALL=en_US.UTF-8`，否则在某些工作目录下会报非 UTF-8 编码错误。
- zsh 通配符无匹配会直接报错并中断整条命令；扫描文件用 `find` 或 bash。
- 多步命令用 `set -o pipefail` 和 `&&` 串联，一步失败必须停下，不要让后面的步骤在坏输入上继续。
- `doctor.py` 在稿子已确认、配音未生成时输出 `awaiting-audio` 状态和缺失单元，不再抛异常；`ready` 才表示时间轴完整。

## 维护与验证

- 工具只通过 `--project` 选择输入输出位置；相对路径解析不依赖工具文件被复制到视频目录。
- 不恢复 Skill 下的 `config/`、`templates/gen_audio.py` 或项目根目录的 Python 副本。
- 修改目录后跑 `doctor`、配音 dry-run、时间轴 dry-run、类型检查和一张实际 still，另在一个临时新项目验证初始化命令。
- 修改共享组件后渲染 [examples/Cards.example.tsx](remotion/examples/Cards.example.tsx) 的样张，核对卡片和色调。


## 共享场景组件

从项目 `remotion/src/` 引入，路径前缀为 `../../../shared/remotion/components/`。组件只负责版式，标题、字幕、图片路径和帧数都由项目传入。新章节从 [examples/Chapter.example.tsx](remotion/examples/Chapter.example.tsx) 复制起步，画面要求见 [VISUAL_STYLE.md](VISUAL_STYLE.md)。颜色只从 `C` 取，自制卡片用 `card` 或 `Card`，不在章节里另写卡片样式。

|组件|文件|用途|
|---|---|---|
|`ChapterShell`|`Scenes.tsx`|背景、章节音频、`ChapterStrip` 导航、底部单行字幕；传 `progress={CHAPTERS}` 时在字幕下方画按章节分段的进度条（`ChapterProgress`）|
|`SceneChain`|`Scenes.tsx`|按起点列表挂载场景，每个场景持续到下一个场景开始，不再手算 `durationInFrames`|
|`subtitleAt`|`Scenes.tsx`|取某个章节局部帧上的字幕|
|`FigureCard`|`Scenes.tsx`|原稿配图，`contain` 完整显示，默认不套卡片直接放在背景上；`dark` 把终端截图放进深色卡片|
|`CoverFrame`|`Scenes.tsx`|整片第 0 帧显示原稿 16:9 封面，之后 `fadeFrames`（默认 6）帧内淡出，不平移时间轴。只放在整片 Composition 的最上层，章节预览不加|
|`HostCard`|`Scenes.tsx`|圆形头像、铁锈橙细边、深色姓名胶囊，用于自介和结尾|
|`InterviewStage`|`Scenes.tsx`|左侧豆包面试官、右侧二哥求职者、中央插槽，`candidateExit` 控制离场|
|`SceneEntrance`、`ConceptIcon`|`Enhancements.tsx`|短入场转场；paper、terminal、feedback、error 四个概念图标|
|`CheckpointIcon` 等 10 个|`Icons.tsx`|检查点、对话、依赖包、分块、发出邮件、回滚、齿轮、法槌、概率、哨子|
|`LevelStairs`、`QuizBoard`|`Quest.tsx`|闯关段位台阶、按配音入场的选项卡与答案揭晓；题目示意图、选项图标和时点由项目传入|
|`AgentBot`、`UserIcon`、`UserBubble`|`Figures.tsx`|Agent 机器人头、用户头像、用户消息气泡；从 agent-intent-routing 提升，标签和颜色由项目传入|
|`FigureFocus`、`focusAt`、`FocusNote`、`FocusRing`|`FigureFocus.tsx`|原稿配图镜头聚焦：按关键帧在原图上平移放大、拉回全图；`FocusRing` 在整图上用直角框框出当前栏，可带小标签（多栏信息图用它，不放大）；`fitBox` 取和原图同宽高比的取景框，带边框的配图必须用；children 叠加的标记随镜头移动；`FOCUS_BOX` + `FOCUS_GUIDE` 为左图右说明列布局，`FOCUS_BOX_WIDE` 为居中取景|
|`ClaudeCodeWindow`、`CodexWindow`|`ProductWindows.tsx`|产品界面示意，稿子在演示产品操作时使用|
|`C`、`card`、`MONO`、`SERIF`、`Popped`、`Arrow`|`index.tsx`|全片色板、卡片样式（直角、3px 蓝色细边、无模糊灰色偏移阴影）、等宽和衬线字体、入场、箭头|
|`Card`、`Kicker`、`SYNTAX`、`typed`、`Caret`、`Selected`|`Cards.tsx`|可倾斜的卡片、等宽小标签、卡内代码配色、打字机与光标、选中态|
|`SegmentBar`、`segmentsAt`|`Cards.tsx`|分格进度条：首次请求逐格填满，缓存命中这类瞬间完成的场景直接满格|
|`RankTable`、`NoteCard`|`Cards.tsx`|排行表：逐行错峰入场、条形从 0 长出，到时点后指定行加蓝框、其余行变淡；便签式结论卡：略微倾斜，大号衬线结论、等宽来源、铁锈橙收尾|

卡片和色调的样张在 [examples/Cards.example.tsx](remotion/examples/Cards.example.tsx)，可直接渲染，渲染命令写在文件开头。

两期以上重复手写的场景或图标，确认不含主题数据后提升到这里，并在本表登记。

## 增强效果与音效混音

新制章节按 Skill 的轻量增强规则选择效果。共享 `Enhancements.tsx` 提供短入场转场与概念图标；品牌素材来源记入 `shared/assets/brands/`。本期的事件时点保存在项目 `assets/references/sound-plan.json`，每个事件指定 `beatId`、`offsetFrames`、`sound`、`peakDbfs` 与用途。

```bash
python3 docs/src/ai/script/shared/tools/mix_effects.py --project docs/src/ai/script/what-is-agent-reflection
```

混音保持原始 `build/voiceover.wav` 和采样长度不变，生成 `build/voiceover-with-effects.wav`、`build/sound-mix.json`。`chapter_pipeline.py` 在存在 sound-plan 时自动混音。预览读取混音文件；项目设置 `deliveryAudio: "build/voiceover-with-effects.wav"` 后（新项目初始化时默认写入），导出入口也采用该音轨。音效计划、配音或混音文件发生变化时，导出入口校验哈希并拒绝过期混音；每次重新生成配音时间轴后必须重新混音。第一章认可样片提供效果参考，不固定每章数量。提示音参考峰值约 -35 至 -31 dBFS、长度约 75–160ms，按实际配音与试听调整；不是响度保证。检查音效窗外配音采样一致、长度不变且无削波。

### 品牌素材复用

具体模型和产品优先使用共享库中的官方标志；未收录时先查官网或官方模型仓库，确认没有可用官方素材后才采用带明确名称的通用概念图形。

品牌图标使用前查看 `shared/assets/brands/<name>.source.json`，核对来源及素材哈希，再将图片复制到本项目 `assets/images/`，来源记录复制到 `assets/references/`。

|产品|共享素材|已核实来源|
|---|---|---|
|Claude Code|`shared/assets/brands/claude-code.png`|Anthropic 官方 VS Code 扩展；详情见同名 `.source.json`|
|Claude|`shared/assets/brands/claude.png`|claude.ai 的 Claude 官方应用图标（338×338，米色底铁锈橙标志）；用于 Claude 模型系列，Claude Code 产品仍用 `claude-code.png`；见 `claude.source.json`|
|Codex|`shared/assets/brands/codex.png`|OpenAI 官方 VS Code 扩展中的 Codex 应用图标；详情见同名 `.source.json`|
|DeepSeek|`shared/assets/brands/deepseek.png`|DeepSeek 官网 `favicon.ico` 小鲸鱼；无缩放转为 PNG，原 ICO 与同名 `.source.json` 一并保留|
|Kolibri|`shared/assets/brands/kolibri-logo-banner.webp`、`kolibri-wordmark.svg`|Aleph Alpha 官网公告横幅的蜂鸟与字标、导航白色字标；见 `kolibri.source.json`|
|GLM / Z.ai|`shared/assets/brands/glm-logo.svg`|GLM-5.3 官方模型仓库使用的 Z.ai 标志；见 `glm.source.json`|
|Qwen|`shared/assets/brands/qwen-logo.png`|Qwen 官网的 80×80 图标；见 `qwen.source.json`|
|Aleph Alpha|`shared/assets/brands/aleph-alpha-logo.svg`|Aleph Alpha 官网黑色字标；见 `aleph-alpha.source.json`|
|Microsoft|`shared/assets/brands/microsoft-logo.png`、`microsoft-symbol.svg`|microsoft.com 页头的四色方块加字标组合（216×46 PNG，灰字适合浅色背景）；Microsoft Learn 页头的四色方块矢量标志；见 `microsoft.source.json`|
|Lenovo|`shared/assets/brands/lenovo-logo.svg`|lenovo.com 页头红底白字矢量标志；见 `lenovo.source.json`|
|Pi|`shared/assets/brands/pi-logo.svg`|官方仓库 earendil-works/pi 的 `pi-logo.ts` 定义的 4×4 像素格与三色品牌色，原样转写为 SVG；显示时加 `imageRendering: pixelated`；见 `pi.source.json`|

Kolibri 横幅原图为 1920×660，蜂鸟与字标视窗为 `[660, 213, 1260, 423]`（原图像素）。只调整显示窗口，保留原文件；窗口随版面等比缩放，不切掉蜂鸟或文字。白色 `kolibri-wordmark.svg` 配深色背景，黑色 Aleph Alpha 字标配浅色背景。GLM 与 Qwen 的版本号由旁边的文字标签表达，不把共用品牌标志称为某个版本的专属标志。

例如复用 Qwen 素材与来源：

```bash
cp docs/src/ai/script/shared/assets/brands/qwen-logo.png docs/src/ai/script/aleph-alpha-kolibri/assets/images/
cp docs/src/ai/script/shared/assets/brands/qwen.source.json docs/src/ai/script/aleph-alpha-kolibri/assets/references/
```

其他项目替换命令中的项目目录；Kolibri 复制两个素材文件和 `kolibri.source.json`。来源记录保存下载地址、官方引用页、获取日期与 SHA256，便于核对和后续更新。

讲到 DeepSeek 或 DeepSeek Harness 的自制标题和卡片时，名称旁优先放官方小鲸鱼，不用通用机器人图形代替品牌标识。

小图标用于自制卡片、项目标题等需要识别产品的位置，原稿整图保持原样。同排图标等比缩放，按视觉大小协调容器和名称间距；尺寸随版面确定，不固定为某期的像素值。新增官方图标经来源与预览核验后补入共享库和本清单。

### 硬件产品图复用

讲具体 GPU 型号时优先用官方产品图。素材位于 `shared/assets/hardware/`，原始文件、产品形态、官方引用页、下载地址、日期、尺寸和 SHA256 一起保存；用前将图片复制到项目 `assets/images/`，对应 `.source.json` 复制到 `assets/references/`。原图使用 `objectFit: contain` 等比完整显示，不用通用双风扇显卡冒充数据中心 GPU，不重绘 NVIDIA 标志。

|产品|共享素材|官方来源与形态|
|---|---|---|
|NVIDIA A100|`hardware/nvidia-a100-sxm.jpg`、`nvidia-a100.source.json`|NVIDIA A100 产品页的 A100 for HGX，SXM 模块|
|NVIDIA H100|`hardware/nvidia-h100-sxm.jpg`、`nvidia-h100.source.json`|NVIDIA Hopper Architecture In-Depth 图 1，SXM5 模块|
|Intel Xeon 6|`hardware/intel-xeon6.jpg`、`intel-xeon6.source.json`|Intel Newsroom，CPU 封装正反面实物图|
|第六代骁龙 8 至尊版|`hardware/snapdragon-8-elite-gen6.png`、同名 `.source.json`|小米 18 Pro 官网芯片产品图；SoC 内含 Hexagon NPU|
|Snapdragon X Elite|`hardware/snapdragon-x-elite.png`、同名 `.source.json`|高通电脑芯片官网产品图；SoC 内含 Hexagon NPU|
|Google TPU v1|`hardware/google-tpu-v1-board.png`、同名 `.source.json`|Google Cloud 首代 TPU 发布文章的板卡实物图|
|Apple M5 Pro / M5 Max|`hardware/apple-m5-pro-max.jpg`、同名 `.source.json`|Apple Newsroom，官方 SoC 产品图|
|小米 18 Pro|`hardware/xiaomi-18-pro-colors.png`、同名 `.source.json`|小米产品官网，四款配色完整产品图|
|MacBook Pro|`hardware/macbook-pro-14-16.png`、同名 `.source.json`|Apple 产品官网，14 / 16 英寸完整产品图|

CPU、GPU、TPU 的封装和板卡图可用于对应概念的产品实例。手机和电脑的 NPU 通常集成在 SoC 内；使用骁龙、Apple 芯片图时标清“内含 NPU”或实际部件名称，不把整个 SoC 的产品图称为独立 NPU 实拍。电脑算力场景使用电脑端 SoC，手机场景使用与手机相符的 SoC。官方产品渲染图与实物照片分别按来源标注。

SXM、PCIe、NVL 的外观不同，图旁标清所用形态，不用 SXM 图指代 PCIe 外形。型号为替代选择时写清“或”；“2 张 A100 或 H100”配分别标注的型号图，不把一张 A100 加一张 H100 画成推荐混装。H100 官网横幅另存 `hardware/nvidia-h100-banner.jpg` 及来源记录，只用于需要横幅的场景。
