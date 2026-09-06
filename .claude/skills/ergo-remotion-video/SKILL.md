---
name: ergo-remotion-video
description: 二哥呀风格的音频驱动 Remotion 动画视频工作流 — 把文章 / 口播稿做成带二哥克隆音色的短视频 mp4（1920×1080 · 30fps · 1-6 分钟均可）。流程：原始文章 → beats.json（按意群拆 beat，数量由文本长度决定）→ 火山豆包 TTS 逐 beat 原速合成 mp3（seed-icl-2.0 · 音色见 `config/video.config.json`）→ **ffmpeg atempo=1.10 后期变速（speed_ratio 对克隆音色无效）** → ffprobe 测时长生成 cues.ts → 拼接 voiceover.mp3 → Remotion 逐章开发（每 beat 一个 React 组件按 cues 定位）→ **必起 Remotion Studio 让用户逐章验收** → 全部通过后才渲染 mp4。视觉体系：冷白背景 #ededed + 红蓝绿橙灰 5 色 + 顶部章节条 ChapterStrip + **底部单行字幕** + 二哥头像 ErgoHero + 微信对话行 WeChatRow + LLM/Agent 圆方双图标 + 4 色 messages 消息卡 + 白底黑边框卡片（金句容器） + 液压压缩机 Press 组件。**核心原则索引详见 [SKILL.md#核心原则] / [USER_PREFERENCES.md] / [B39_LESSONS.md]**。适用场景：技术科普口播、Agent 面试题拆解、程序员向短视频、B 站 / 视频号讲解片。
---

# Ergo-Style Remotion Audio-Driven Video

把一篇文章或口播稿，做成 3-4 分钟的带二哥克隆音色的 Remotion 动画讲解视频（mp4 输出，1920×1080 · 30fps）。

## 🚨 开工前必读 · 用户 2 次强调（B27）

**逐章验收 · 严禁擅自渲染！**

- ❌ 装完依赖 → 自己 `npx remotion render` 出 mp4 交差
- ❌ 一次做完 5 章 → 一起渲染让用户看结果
- ✅ 每章做完 → 起 `npx remotion studio` 让用户在 `http://localhost:3000` 逐 beat 看
- ✅ 用户明确回复"继续" / "chX 通过" 才做下一章
- ✅ **只有用户明确说"渲染" / "出片"** 才允许 `npx remotion render`

见 [references/USER_PREFERENCES.md](references/USER_PREFERENCES.md) 的"B27 最新沉淀"章节。

## 🎯 适用场景

- 技术科普 / Agent 面试题拆解 / 程序员向短视频
- 需要真人配音 + 动画演出的横屏视频
- B 站 / 视频号 / YouTube 3-5 分钟讲解片
- 用户有一篇文章或口播稿，希望做成带**二哥声音**的视频

## ⚙️ 核心原则（贯穿始终）

> 所有原则的**详细规则和示例**都在 `references/` 下的文档里；本节只列一句话 + 引用，作为索引。**不要在这里写详情，避免多处不一致**。

0. **配置单点维护** — 所有 TTS 参数（音色 / resource / atempo / 音频格式）从 `config/video.config.json` 读；改一次全仓生效（[config/README.md](config/README.md)）。API Key 走环境变量 `VOLC_TTS_API_KEY`。

**默认人物素材**：使用本 Skill 的 [assets/ergo-avatar.jpg](assets/ergo-avatar.jpg)，复制到当前视频的 `remotion/public/images/ergo-avatar.jpg`。用户为当前视频指定的图片优先；更换与同步规则见 [USER_PREFERENCES.md 的二哥人设](references/USER_PREFERENCES.md#二哥人设)。

### 设计原则（详见 [USER_PREFERENCES.md](references/USER_PREFERENCES.md#anchor-1)）

1. **动画 > 文字** — 详见 [USER_PREFERENCES.md#1](references/USER_PREFERENCES.md#anchor-1)
2. **设计克制** — 详见 [USER_PREFERENCES.md#3](references/USER_PREFERENCES.md#anchor-3)
3. **风格统一** — 详见 [USER_PREFERENCES.md#5](references/USER_PREFERENCES.md#anchor-5)
4. **视觉密度 > 元素炫技** — 详见 [USER_PREFERENCES.md#视觉细节铁律](references/USER_PREFERENCES.md#anchor-detail)
5. **迭代找边界** — 详见 [USER_PREFERENCES.md#4](references/USER_PREFERENCES.md#anchor-4)

### 念法 / 字幕 / 节奏

6. **音频正常合成，不加戏** — 详见 [USER_PREFERENCES.md#2](references/USER_PREFERENCES.md#anchor-2)
7. **字幕永远单行** — 详见 [USER_PREFERENCES.md#A](references/USER_PREFERENCES.md#anchor-A)
8. **默认原文念法；指定数字读法写入 ttsText** — 详见 [USER_PREFERENCES.md#B](references/USER_PREFERENCES.md#anchor-B)
9. **「3 分钟」是宣传话术** — 详见 [USER_PREFERENCES.md#C](references/USER_PREFERENCES.md#anchor-C)
10. **音画同步靠 cues.ts** — 详见 [B39_LESSONS.md#1](references/B39_LESSONS.md#1-音画对齐用能量检测不要用分句合成估算)

### 动画细节

11. **逐格填入 > 整块 stagger** — 详见 [USER_PREFERENCES.md#D](references/USER_PREFERENCES.md#anchor-D)
12. **机械动画不用 emoji** — 详见 [USER_PREFERENCES.md#E](references/USER_PREFERENCES.md#anchor-E)

### 流程纪律

13. **硬节点纪律** — 每章开发完必须起 `npx remotion studio` 让用户逐 beat 验收，详细规则见 [USER_PREFERENCES.md#F](references/USER_PREFERENCES.md#anchor-F)
13a. **项目路径 = 当前项目目录** — 稿子/音频/Remotion 代码都在项目目录里，不另开 ~/Documents/video-projects/，详见 [USER_PREFERENCES.md#H](references/USER_PREFERENCES.md#anchor-H)
14. **音画逐词对齐靠能量检测** — 详见 [B39_LESSONS.md#1](references/B39_LESSONS.md#1-音画对齐用能量检测不要用分句合成估算)
15. **跨 beat 连续画面合并 Sequence** — 详见 [B39_LESSONS.md#2](references/B39_LESSONS.md#2-跨-beat-连续画面合并成一个-sequence不要用-noexit)
16. **text 与 ttsText 分离** — 详见 [B39_LESSONS.md#3](references/B39_LESSONS.md#3-字幕分行text-与-ttstext-分离)

## 🏗️ 工作流总览

```
Phase 1   内容分析 · 一次性产出
   1.1  读 article.md
   1.2  产出 script.md（口播稿）+ beats.json（N beat，N 由文本意群决定）+ OUTLINE.md（视觉规划）
   ▼
[Checkpoint · 稿子对齐]     ← 必须停。用户确认口播稿 / 拆 beat 结果
   ▼
Phase 2   音频合成（豆包 TTS · seed-icl-2.0）
   2.0  export VOLC_TTS_API_KEY="..."（key 在环境变量里；音色/atempo 在 config/video.config.json）
   2.1  逐 beat 调火山 TTS 原速合成 → audio/raw/beat_XX.mp3
   2.2  ffmpeg atempo=1.10 后期变速 → audio/beat_XX.mp3（speed_ratio 对克隆音色无效）
   2.3  ffprobe 测时长 → cues.ts / cues.json；ffmpeg 拼接 → voiceover.mp3
   ▼
Phase 3   Remotion 逐章开发
   3.1  脚手架（package.json / Root.tsx / constants.ts / shared.tsx）
   3.2  Chapter1.tsx（hook + 打脸）
        ▼
        [硬节点] 用户验收第 1 章
        ▼
   3.3  Chapter2-N.tsx（按验收节奏推进）
   ▼
[Checkpoint · 全片预览]     ← Remotion Studio 逐 beat 走查
   ▼
Phase 4   渲染
   npx remotion render <CompositionId> out/<name>.mp4
```

## 📁 项目目录约定

```
B_XX/
├── article.md              # 原始文章（保留，视觉信息源）
├── script.md               # 口播稿（决定节拍）
├── beats.json              # N 个 beat 的 machine-readable schema
│                           #   text（字幕原文）/ ttsText（可选·发音停顿或指定读法）
├── OUTLINE.md              # 视觉规划文档
├── chapters.json           # 章节切分
├── cues.json / cues.ts     # 每 beat 的绝对帧号
├── gen_audio.py            # TTS 原速合成 + ffmpeg atempo 变速
├── gen_cues.py             # ffprobe 测时长 → cues.ts + 拼 voiceover.mp3
├── align_words.py          # 能量包络检测 · 逐词音画对齐（B39）
├── audio/
│   ├── raw/                # TTS 原速输出（中间产物）
│   └── beat_XX.mp3         # atempo 变速后的成品
├── sfx/                    # 可选音效
└── remotion/               # Remotion 项目
    ├── package.json
    ├── public/audio/voiceover.mp3
    ├── public/images/ergo-avatar.jpg  # 从 Skill 的 assets/ergo-avatar.jpg 复制
    └── src/
        ├── Root.tsx        # 主 Composition + 各章 ChapterPreview
        ├── constants.ts    # COLORS / WIDTH / HEIGHT / FPS
        ├── cues.ts         # BEATS[i].startFrame/durationFrames
        ├── shared.tsx      # ChapterStrip / WeChatRow / LLMBadge / AgentBadge
        │                   # ErgoHero / MessageStack / Scene / Subtitle
        │                   # CrossFade / SlideIn / ZoomIn / wrapWithTransition
        └── Chapter1..N.tsx # 每章一个文件，beat 区间见 chapters.json
```

## 🎨 视觉体系（复用 B19-B25 沉淀）

### 颜色

```typescript
COLORS = {
  bg:    "#ededed",   // 冷白背景
  ink:   "#0a0a0a",   // 黑字 / 边框
  red:   "#c02020",   // 错 · 警 · 误 · 强调
  blue:  "#2d5be3",   // 用户 · 正确路径 · user 角色
  green: "#16a34a",   // 模型 · AI · assistant 角色
}
// + 橙 #e07b12 (tool 角色) + 灰 #8a8a8a (system 角色) + 金 #f8b500 (满分/推荐)
```

### 组件复用清单

| 组件 | 用途 |
|---|---|
| `ChapterStrip` | 顶部 5 章胶囊导航（黑白胶囊，当前章黑底白字，已过章灰色划线） |
| `Subtitle` | 底部字幕栏（140px 留白，居中 40px 大字，黑底白字） |
| `WeChatRow` | 微信对话行（面试官 / 候选者，带尾巴和头像） |
| `ErgoHero` | 二哥中心大头像（红色脉动光环 + 黑色胶囊标签） |
| `ErgoTag` | 二哥右上角小头像 |
| `LLMBadge` | 绿色圆形 LLM 图标 |
| `AgentBadge` | 蓝色圆角方形 Agent 图标 |
| `MessageStack` | 4 色消息卡堆栈（system/user/assistant/tool） |
| `Scene` | 章节基础容器（含 220/100/200 内边距，B20 铁律） |
| `CrossFade / SlideIn / ZoomIn` | 三种转场，`pickTransition()` 自动路由 |

### 字体

- 中文：`Noto Sans SC`
- 英文 / 数字：`Manrope`
- 代码：`Consolas, Monaco`

## 🎙️ 音频合成 · 火山豆包 TTS

**详见 [references/VOLCENGINE_TTS_GUIDE.md](references/VOLCENGINE_TTS_GUIDE.md)**

- 端点：`POST https://openspeech.bytedance.com/api/v3/tts/unidirectional/sse`
- Header：`X-Api-Key` + `X-Api-Resource-Id: seed-icl-2.0` + `X-Api-Connect-Id`
- Body：`event: 100` + `namespace: BidirectionalTTS` + `req_params.speaker: <见 config/video.config.json:tts.speakerId>`
- **API Key 从环境变量 `VOLC_TTS_API_KEY` 读，绝不硬编码**（本仓库公开）
- **音色 / 资源 ID / atempo / 音频格式**统一在 `config/video.config.json` 维护，单点修改全仓生效（详见 [config/README.md](config/README.md)）
- 历史音色：`S_ZqvEwo792`（B29-B43 默认）、`S_JcYEwo792`（B27 短期用过，已弃用）、`S_7F8Gwo792`（B25 及之前老音色，保留）
- 🚨 **语速不能靠 `speed_ratio`**——B41/B42 实测克隆音色对该参数完全无响应（返回字节与 1.0 相同）。
  正确做法：TTS 原速合成 → `ffmpeg -filter:a atempo=1.10` 后期变速（atempo ≤ 1.2 音质无损且保音高）
- **当前最佳 `ATEMPO = 1.10`**（写在 gen_audio.py 配置区）
- 只调 atempo 不重跑 TTS：`python gen_audio.py --retempo`；换音色才需 `--force` 全量重合成
- 变速后必须重跑 `gen_cues.py` 同步 cues.ts + voiceover.mp3

## 🚨 用户偏好速查表（血泪教训）

按类别汇总用户在 B19-B25 迭代中反复强调的点：

### 内容 / 文字

- ❌ 长段字幕堆屏 → ✅ 动画为主，文字为辅
- ❌ 只有中文字大字撑场 → ✅ 图形 + 表情 + 数据可视化
- 只有金句、面试对话、术语（stateless / messages / undefined）允许全屏字
- 卡片框里的字号服从卡片大小，不能一个字撑爆卡

### 设计

- ❌ 花哨设计（漫画放射线、舞台幕布、SVG 手绘脑）→ ✅ 克制 + 简洁
- ❌ emoji 大脑（用户会说"笑死了"）→ ✅ 抽象图形 / 代码卡片 / 表情
- 迭代规律：**一个 beat 常常要试 2-3 版才知道边界**，不要一次到位
- 卡片风格必须统一：**白底 · 黑边框 · 圆角 32 · 阴影 14px** 是通用金句容器
- 一致性 > 单个惊艳

### 视觉细节

- ❌ opacity 无限循环脉动 → ✅ 进场弹跳 + 稳定显示
- 元素被 ChapterStrip 遮挡 → 立即整体下移 80-100px
- 字号大小服从版面，一般不超过卡片宽度的 40%
- 底部 100px 留白（B20 铁律，Scene 强制）

### 音频 / 人设

- 二哥自介：❌ `HOST · 二哥呀` → ✅ `哈喽，我是二哥！`
- **TTS 正常合成即可，不要为情绪加戏**：稿子写什么念什么，别硬塞语气词/反问/破折号（2026-08-15 用户明确）
- **B29 起 atempo 1.10 是当前最佳节奏**（默认从 `config/video.config.json` 的 `tts.atempo` 读；B27 曾短期用 1.15 + S_JcYEwo792，已弃用）
- **默认按原文朗读**：不批量转换数字/单位；评论口令 `222` 通过 `ttsText` 指定读作「二二二」，数量 `288 道` 指定读作「二百八十八道」；字幕均保留原文数字。规则与示例见 [USER_PREFERENCES.md#B](references/USER_PREFERENCES.md#anchor-B)。

### 字幕

- **画面只显示一行**（`whiteSpace: nowrap`）
- 长句按视觉宽度自动断行（中文 1 单位 / 英文 0.58 单位，阈值 42），按行宽比例分配停留时间
- 字幕忠实音频原文（不改写文字、数字按原文显示；仅 `——` 破折号从字幕剔除，音频保留做停顿）
- 发音停顿和用户指定的读法写进 `ttsText` 字段，`text` 保持原文；评论口令例外见 [USER_PREFERENCES.md#B](references/USER_PREFERENCES.md#anchor-B)。
- 实现：参考 B36 `shared.tsx` 的 `Subtitle` 组件（visualWidth + splitToLines，无需 numeralToArabic 数字转换）

### 动画流控（B27 血泪）

- 相邻 beat 有**跨 beat 无缝动画**（比如 9 宫格逐格填 4→5 的接续）时，后一个 beat 必须绕过 `wrapWithTransition`（crossfade 会让画面看起来"重新出场"）
- 枚举类内容用**逐格填入**：先讲数字（不出容器）→ 空骨架出现 → 一个一个填 label（跟音频节拍）
- **机械/物理动画不用 emoji**：压缩机、齿轮、分割线用 div/SVG 硬画（示例见 Chapter4/5 的 `Press` 组件）

### 硬节点纪律（B27 挨骂沉淀）

- **每章做完立刻起 `npx remotion studio`**（后台：`npx remotion studio > studio.log 2>&1 &`）
- 用户在 `http://localhost:3000` 里点 `ChapterXPreview` 逐 beat 验收
- 用户明确回复"继续" / "chX 通过"才做下一章
- **绝对不能自己 render mp4 交差**（除非用户明确说"渲染"）

### 动画表达技巧

- "读" = 放大镜悬停 + 进度圆点（不用激光线、不用 READ 标签）
- "无状态" = 记忆气泡消散 + 0·0·0 归零
- "记住" 的否定 = 代码终端 `memory: undefined` 打字机
- "为什么" = 白卡片 + 🤔 表情
- "打个比方" / "回家等通知" = 白底黑边框卡片，大字 + 微旋弹入
- "填满窗口" = 进度条 + LIMIT 红线 + 警报灯
- "Lost in the Middle" = U 形注意力曲线（SVG path + strokeDasharray）
- 消息被淘汰 = 化为粒子消散（不要只是变灰）

## 🎬 渲染

```bash
cd remotion
npx remotion render <CompositionId> out/<name>.mp4
```

参考耗时：B39 的 3:46 视频（6837 帧）多核渲染约 3-4 分钟，输出 30MB。
内存不足时才加 `--concurrency=1`（会慢到 10 分钟以上，不要默认带）。

## 🔗 相关文档

- [references/B39_LESSONS.md](references/B39_LESSONS.md) — **B39 项目复盘**（音画逐词对齐能量检测 / 跨 beat 合并 Sequence / text 与 ttsText 分离 / 截图驱动）
- [references/USER_PREFERENCES.md](references/USER_PREFERENCES.md) — **用户偏好总纲**（B19-B27 血泪教训、字幕单行、逐格填入、硬节点纪律、动画表达技巧库）
- [references/VOLCENGINE_TTS_GUIDE.md](references/VOLCENGINE_TTS_GUIDE.md) — **火山 TTS 调用指南**（鉴权 / 音色 / atempo 变速 / 三个必踩的坑）
- [templates/](templates/) — gen_audio.py / gen_cues.py / align_words.py / constants.ts

## 📞 触发这个 Skill

用户说下面任一句话时，Claude 应自动 invoke 这个 skill：

- "帮我把这篇文章做成二哥呀风格的视频"
- "用二哥的声音做一个 X 分钟的讲解视频"
- "做个 Remotion 视频，用二哥克隆音色（音色 ID 在 config/video.config.json 改）"
- "启动 kv-cache 项目"（项目按主题名命名，不用 B_NN 编号）
- `/ergo-remotion-video` 或 `/ergo-video`

## 🎯 用户默认调用提示词模板

**最少输入版**：
```
帮我做一个二哥呀风格的视频，主题是 <XX>。原文在下面：
<粘贴文章>
```

**完整输入版**：
```
帮我做一个二哥呀风格的 Remotion 视频。

主题：<3-5 字概括，比如"Agent 短期记忆">
目标时长：<3-4 分钟>
风格基调：<hook + 打脸 / 纯科普 / 面试题拆解>
项目名：<比如 kv-cache>
输出目录：**项目当前目录**（如 `docs/src/ai/script/<slug>/`）— 所有产物（稿子 / 音频 / Remotion 代码）都在这里，不另开工作区

原文：
<粘贴 article.md 内容>

要求：
- 沿用 B19-B39 视觉体系（冷白背景 + 红蓝绿橙灰 + 白底黑边框卡片）
- 用二哥克隆音色（见 `config/video.config.json`）· seed-icl-2.0 · TTS 原速合成后 ffmpeg atempo（atempo 也从 config 读）
- 逐章验收，每章做完停下等我确认再继续
- 严格执行"动画 > 文字"，只有金句 / 对话 / 术语允许全屏中文字
```

Claude 收到后应：
1. 读 article.md → 生成 script.md + beats.json + OUTLINE.md
2. 停下让用户对齐口播稿
3. 用户确认后设好 `VOLC_TTS_API_KEY`，调 gen_audio.py 原速合成 + atempo 变速
4. 生成 cues.ts + 拼接 voiceover.mp3
5. 搭 Remotion 脚手架 + 开发 Chapter1.tsx
6. 让用户在 Remotion Studio 里验收 Chapter1
7. 逐章推进至最后一章
8. 用户明确说"渲染"后才 `npx remotion render` 出 mp4
