# 视频项目布局与执行约定

本文件是目录、路径与命令的唯一维护入口。Skill 保留内容、风格和验收规则；共享执行代码由本目录维护。

## 文件归属

```text
script/
├── package.json / package-lock.json  共用 Node 依赖与锁定版本
├── shared/
│   ├── config/video.config.json      新项目默认配置，无密钥
│   ├── assets/ergo-avatar.jpg        默认人物原图
│   ├── assets/interview/             可选面试头像及来源记录
│   ├── tools/                       通用 Python / Node 命令
│   └── remotion/
│       ├── components/              无主题数据的公共组件
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

已有 KV Cache 项目的 `auditions/` 保留历史试听记录，`output/legacy/` 保留旧版成片。这些记录不作为新项目的模板或当前路径依据。

共享目录和依赖声明入库；视频目录继续按仓库既有策略留在本地。新克隆仓库需要初始化视频项目。当前机器复用仓库已有 `remotion-project/node_modules` 安装，`script/node_modules` 为相对链接，不下载第二套依赖。新环境在 `script/` 下按锁文件安装依赖；不要在每个视频目录重复安装。

## 配置约定

`project.json.config` 是完整快照，包含 `tts`、`video`、`volc` 三部分。所有生成工具只读取项目快照，不运行时合并全局默认值。初始化复制默认值，之后用户修改默认音色不会改变旧视频。

API Key 只读取 `config.volc.apiKeyEnv` 对应的环境变量。不要存进 JSON、命令参数或报告。公共组件不得依赖某视频的 beats、标题或字幕时点；更新组件保持兼容，重大视觉升级先验收旧视频预览。

## 项目选择与初始化

下面示例从仓库根目录执行。工具和 `--project` 都支持绝对路径，因此也可从其他 cwd 调用。`--project` 表示项目目录，不是原文文件，也不是 `shared`。

```bash
python3 docs/src/ai/script/shared/tools/init_project.py --project docs/src/ai/script/what-is-prefix-caching --source docs/src/ai/video/what-is-prefix-caching.md --title 'Prefix Caching'
python3 docs/src/ai/script/shared/tools/doctor.py --project docs/src/ai/script/what-is-prefix-caching
```

初始化拒绝覆盖现有目录，复制原文和默认头像，生成完整项目配置及草稿骨架，不调用 TTS。草稿只有 `DraftPreview`，确认口播稿后再实现真实章节与总 Composition。

初始化复制的文章仅为整理起点。第一阶段按 Skill 的内容规则清理项目 `article.md`：文末公众号推广尾段从起点删至末尾，后续图片及其素材清单条目一起删除，不以完整快照或排除条目的形式留在视频项目中。原始源文章另行保留，项目用稿可能与源文章不同，检查记录应分别保存来源哈希与用稿哈希。

## 面试开场素材

选择面试头像开场模式时，从 `shared/assets/interview/` 复制 `doubao-facing-right.png` 与 `ergo-facing-left.png` 到本项目 `assets/images/`，并在分镜记录素材来源。初始化工具仍只复制默认头像，普通视频不自动引入豆包或面试情节。

新项目尚无这些文件时，从仓库根目录执行（将 `<topic>` 替换成当前项目目录名）：

```bash
cp -n docs/src/ai/script/shared/assets/interview/doubao-facing-right.png docs/src/ai/script/<topic>/assets/images/doubao-facing-right.png
cp -n docs/src/ai/script/shared/assets/interview/ergo-facing-left.png docs/src/ai/script/<topic>/assets/images/ergo-facing-left.png
```

如果项目已有同名图片，先确认是否为用户指定版本，不覆盖。画面用 `staticFile('images/doubao-facing-right.png')` 等地址读取项目副本；共享头像组件从 `shared/remotion/components/InterviewAvatar.tsx` 导入，只负责头像、角色标注和高亮，不含具体主题、音色或固定时间轴。该目录的 `sources.json` 保留图片来源，原始二哥头像不变。

## 内容和 beat 拆分

`beats.json` 保留如下输入结构，数量由实际内容决定：

```json
{
  "chapters": [{"id": "ch1", "title": "章节标题"}],
  "beats": [{"id": 1, "chapter": "ch1", "text": "确认后的 beat 台词。", "ttsText": "确认后的 beat 台词。"}]
}
```

数组顺序就是播放顺序，ID 保持稳定且唯一，同一章节的 beat 连续排列。`ttsText` 可省略；字幕与配音分别保留。按意群拆 beat，数量由文本长度决定 · 参考 3–4 分钟 ≈ 55–75 beat。逐 beat 合成配音，再依据真实音频定位动画。相邻 beat 需要连续画面时合并 Sequence，不因此合并配音。迁移旧项目不自动重拆或重合成。

`OUTLINE.md` 同时维护正文配图的使用映射：来源 URL、项目文件、场景、beat 范围、预览检查状态。每张保留的正文图都要有明确去向；未采用则记录原因。素材清单只登记下载路径不能代替分镜。逐章检查要覆盖实际配图帧和主要动画场景，确认图片完整可读、字幕切换时图像保持连续。

正文导航复用 `shared/remotion/components` 的 `ChapterStrip`，传入本项目品牌、章节名称和当前章。面试模式的特殊顶部布局仅限对话开场。用户指定旧版为视觉基准时，在本项目 `preview/` 保存对照帧与检查记录；恢复版式和场景组织，时间轴仍以本次真实音频为准。

## 配音与时间轴

```bash
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/what-is-kv-cache --dry-run
python3 docs/src/ai/script/shared/tools/gen_audio.py --project docs/src/ai/script/what-is-kv-cache
python3 docs/src/ai/script/shared/tools/gen_cues.py --project docs/src/ai/script/what-is-kv-cache
python3 docs/src/ai/script/shared/tools/align_words.py --project docs/src/ai/script/what-is-kv-cache --id 69
```

`--dry-run` 不读取密钥、不联网、不写音频；先检查动作数量再决定是否执行。`--only <id...>` 只处理指定单元；`--force` 明确重合成；`--retempo` 复用参数匹配的 raw，仅重新处理倍率。文本、音色和请求参数或文件哈希变化都会使旧 raw 失效；不是仅检查文件存在。

`gen_cues.py` 使用 `audio/processed` 中的实际解码采样生成时间轴和 WAV。输出在 `build/`，当前项目的 `remotion/src` 从 `../../build/cues` 导入。生成文件不要手改；音频变化后重新生成。生成记录也在 `build/`，不要硬编码某条视频的 ID、总帧数或时长。

## 预览与导出

```bash
node docs/src/ai/script/shared/tools/remotion.mjs typecheck --project docs/src/ai/script/what-is-kv-cache
node docs/src/ai/script/shared/tools/remotion.mjs studio --project docs/src/ai/script/what-is-kv-cache --port 3001
node docs/src/ai/script/shared/tools/remotion.mjs still --project docs/src/ai/script/what-is-kv-cache --composition Chapter5Preview --frame 250
```

优先继续使用已经运行的正确 Studio；端口按实际情况选择，不关闭其他项目服务。macOS 有本机 Chrome 时共享入口自动使用；其他环境可设置 `REMOTION_BROWSER_EXECUTABLE`，否则遵循 Remotion 默认浏览器行为。

只有用户明确授权「出片 / 渲染」后执行：

```bash
node docs/src/ai/script/shared/tools/remotion.mjs render --project docs/src/ai/script/what-is-kv-cache
python3 docs/src/ai/script/shared/tools/verify_export.py --project docs/src/ai/script/what-is-kv-cache
```

render 先输出 `preview/render/remotion-raw.mp4`，再复制其 H.264 视频流，用 `build/voiceover.wav` 重新编码 AAC、按总帧数截定时长，写到 `output/<project.outputName>`。这样处理已有导出中观察到的统一音频延迟；仍需实际验证。失败时不替换已有最终 MP4。

`verify_export.py` 完整解码、核对尺寸帧率帧数、比较原配音与导出声音的同位置波形，生成每章截图与 `preview/export-check/report.json`。类型检查和截图通过不等于用户已验收，也不等于已发布。

## 维护与验证

- 工具只通过 `--project` 选择输入输出位置；相对路径解析不依赖工具文件被复制到视频目录。
- 不恢复 Skill 下的 `config/`、`templates/gen_audio.py` 或项目根目录的 Python 副本。
- 修改目录后跑 `doctor`、配音 dry-run、时间轴 dry-run、类型检查和一张实际 still；另在一个临时新项目验证初始化命令，避免只兼容已有 KV Cache。
- 迁移已有视频时核对成片及配音哈希，不能因整理目录而重合成或重新出片。
