---
name: ergo-remotion-video
description: 二哥呀风格的音频驱动 Remotion 动画视频工作流 — 把文章 / 口播稿做成带二哥克隆音色的短视频 mp4（1920×1080 · 30fps · 1-6 分钟均可）。流程：原始文章 → beats.json（按意群拆 beat，数量由文本长度决定 · 参考 3-4 分钟 ≈ 55-75 beat）→ 火山豆包 TTS 逐 beat 生成 mp3（seed-icl-2.0 · **S_ZqvEwo792 · 1.10 倍速**）→ ffprobe 测时长生成 cues.ts → 拼接 voiceover.mp3 → Remotion 逐章开发（每 beat 一个 React 组件按 cues 定位）→ **必起 Remotion Studio 让用户逐章验收** → 全部通过后才渲染 mp4。视觉体系：冷白背景 #ededed + 红蓝绿橙灰 5 色 + 顶部章节条 ChapterStrip + **底部单行字幕（长句按视觉宽度自动断行 · 中文数字视觉显阿拉伯）** + 二哥头像 ErgoHero + 微信对话行 WeChatRow + LLM/Agent 圆方双图标 + 4 色 messages 消息卡（system 灰 · user 蓝 · assistant 绿 · tool 橙）+ 白底黑边框卡片（金句容器）+ **液压压缩机 Press 组件（黑压板+红箭头，替代 🗜️ emoji）**。核心原则：动画 > 文字（只有金句 / 对话 / 术语允许全屏字）· 设计克制不要花哨 · 风格统一 · 视觉密度重于单个元素炫技 · **文本即最终念法，TTS 念原文（不做数字中文转换、不加情绪戏）** · **逐格填入 > 整块 stagger（跨 beat 无缝动画需绕过 wrapWithTransition）**。适用场景：技术科普口播、Agent 面试题拆解、程序员向短视频、B 站 / 视频号讲解片。
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

见 [[b27-lessons-learned]] 的"最重要一条"章节。

## 🎯 适用场景

- 技术科普 / Agent 面试题拆解 / 程序员向短视频
- 需要真人配音 + 动画演出的横屏视频
- B 站 / 视频号 / YouTube 3-5 分钟讲解片
- 用户有一篇文章或口播稿，希望做成带**二哥声音**的视频

## ⚙️ 核心原则（贯穿始终）

1. **动画 > 文字** — 只有金句 / 对话 / 术语（如 `messages` / `stateless`）允许全屏中文字，其它全部用图形表达
2. **设计克制** — 不要花哨、不要 emoji 大脑级的 kitsch，简洁 + 一点巧思
3. **风格统一** — 白底黑边框卡片是通用金句容器，所有卡片一致
4. **视觉密度 > 元素炫技** — 单个字号服从整体版面，不能挤占其他元素呼吸空间
5. **音画同步靠 cues.ts** — 动画时长服从音频真实长度，不是反过来对齐
6. **迭代找边界** — 一个 beat 常常要做 2-3 版才知道用户想要什么，不要一次到位
7. **音频正常合成，不加戏** — 稿子写什么就念什么，不要为了"情绪起伏"硬塞语气词 / 反问 / 破折号 / 感叹号，TTS 自己会朗读（2026-08-15 用户明确纠正）
8. **字幕单行** — `whiteSpace: nowrap`，长句按视觉宽度（中文 1 / 英文 0.58）自动断行依次显示（数字按原文显示，不做中文↔阿拉伯转换）
9. **文本即最终念法** — 稿子写什么 TTS 就念什么，不做数字中文读法转换（1M 就念 1M）、不改写、不加情绪戏（2026-08-15 用户两次明确：不加情绪 + 数字按原文）
10. **【B27 新增】逐格填入 > 整块 stagger** — "9 个维度"这类枚举，先只讲数字（不出容器），再让空骨架出现，然后**按音频节拍一格一格填 label**（跨 beat 无缝动画时后一 beat 要绕过 `wrapWithTransition`）
11. **【B27 新增】机械动画不用 emoji** — 压缩机 / 齿轮 / 分割线 / 箭头 都用 SVG 或 div 硬画（如 `Press` 组件：黑压板 + 红箭头 + 被挤中间卡）
12. **【硬节点纪律】** — 每章开发完必须起 `npx remotion studio` 让用户在 `http://localhost:3000` 逐 beat 验收，用户回复"继续"/"chX 通过"才做下一章 · **绝对不能自己 render mp4 交差**
13. **【B39 新增】音画逐词对齐靠能量检测** — 逐格填入/单词弹入必须对真实 beat 音频做 RMS 能量包络分析（`templates/align_words.py`），**不要用"分句单独合成测时长累加"**（分句带句末停顿，整句连读停顿不同，会整体偏早/偏晚）；元素还要**提前 4-6 帧 + stiffness≥200 快弹簧**，念到时已就位
14. **【B39 新增】跨 beat 连续画面要合并成一个 Sequence** — 一张图配多句相邻台词时，把几个 beat 合成一个组件/Sequence，内部用帧分界切字幕，图片只挂载一次；靠 `noExit/noEnter` 无法消除两个实例交接的闪白
15. **【B39 新增】text 与 ttsText 分离** — 为发音加的停顿逗号存在 `ttsText`（TTS 用），`text` 保持原文（字幕用）；字幕分行传 `subtitleLines`+`subtitleLineFrames`

## 🏗️ 工作流总览

```
Phase 1   内容分析 · 一次性产出
   1.1  读 article.md
   1.2  产出 script.md（口播稿）+ beats.json（71 beat）+ OUTLINE.md（视觉规划）
   ▼
[Checkpoint · 稿子对齐]     ← 必须停。用户确认口播稿 / 拆 beat 结果
   ▼
Phase 2   音频合成（豆包 TTS · seed-icl-2.0）
   2.1  逐 beat 调火山 TTS → beat_XX.mp3
   2.2  ffprobe 测时长 → cues.ts / cues.json
   2.3  ffmpeg 拼接 → voiceover.mp3
   ▼
Phase 3   Remotion 逐章开发
   3.1  脚手架（package.json / Root.tsx / constants.ts / shared.tsx）
   3.2  Chapter1.tsx（8 beat · hook + 打脸）
        ▼
        [硬节点] 用户验收第 1 章
        ▼
   3.3  Chapter2-5.tsx（按验收节奏推进）
   ▼
[Checkpoint · 全片预览]     ← Remotion Studio 逐 beat 走查
   ▼
Phase 4   渲染
   npx remotion render B25 out/b25.mp4
```

## 📁 项目目录约定

```
B_XX/
├── article.md              # 原始文章（保留，视觉信息源）
├── script.md               # 口播稿（决定节拍）
├── beats.json              # 71 个 beat 的 machine-readable schema
├── OUTLINE.md              # 视觉规划文档
├── chapters.json           # 章节切分
├── cues.json / cues.ts     # 每 beat 的绝对帧号
├── gen_audio.py            # 调火山 TTS 批量生成 mp3
├── gen_cues.py             # ffprobe 测时长 → cues.ts
├── audio/                  # 71 个 beat_XX.mp3
├── sfx/                    # 可选音效
└── remotion/               # Remotion 项目
    ├── package.json
    ├── public/audio/voiceover.mp3
    ├── public/ergo-avatar.jpg
    └── src/
        ├── Root.tsx        # 主 Composition + 5 个 ChapterPreview
        ├── constants.ts    # COLORS / WIDTH / HEIGHT / FPS
        ├── cues.ts         # BEATS[i].startFrame/durationFrames
        ├── shared.tsx      # ChapterStrip / WeChatRow / LLMBadge / AgentBadge
        │                   # ErgoHero / MessageStack / Scene / Subtitle
        │                   # CrossFade / SlideIn / ZoomIn / wrapWithTransition
        ├── Chapter1.tsx    # beat 1-8
        ├── Chapter2.tsx    # beat 9-15
        ├── Chapter3.tsx    # beat 16-32
        ├── Chapter4.tsx    # beat 33-41
        └── Chapter5.tsx    # beat 42-71
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
- Body：`event: 100` + `namespace: BidirectionalTTS` + `req_params.speaker: S_ZqvEwo792`
- **二哥克隆音色 ID（B29 起默认 · B32 再次确认）：`S_ZqvEwo792`**（新版控制台声音复刻 2.0）
- 历史音色：`S_JcYEwo792`（B27 短期用过 · 1.15 倍速，已弃用）、`S_7F8Gwo792`（B25 及之前老音色，保留）
- **推荐 `speed_ratio: 1.10`**（B29 起当前最佳节奏）· B27 曾用 1.15 已弃用
- 切换音色/语速后必须 `python gen_audio.py --force` 全量重跑，然后跑 `gen_cues.py` 同步 cues.ts + voiceover.mp3

## 🚨 用户偏好速查表（血泪教训）

按类别汇总用户在 B19-B25 迭代中反复强调的点：

### 内容 / 文字

- ❌ 长段字幕堆屏 → ✅ 动画为主，文字为辅（[[animation-over-text]]）
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
- **B29 起 speed_ratio 1.10 是当前最佳节奏**（音色 `S_ZqvEwo792`；B27 曾短期用 1.15 + S_JcYEwo792，已弃用）
- **文本即最终念法**：稿子写什么 TTS 就念什么，数字/单位按原文，不做中文读法转换（2026-08-15 用户明确）

### 字幕

- **画面只显示一行**（`whiteSpace: nowrap`）
- 长句按视觉宽度自动断行（中文 1 单位 / 英文 0.58 单位，阈值 42），按行宽比例分配停留时间
- 字幕忠实音频原文（不删破折号、不改写文字、数字按原文显示）
- 实现：参考 B36 `shared.tsx` 的 `Subtitle` 组件（visualWidth + splitToLines，无需 numeralToArabic 数字转换）

### 动画流控（B27 血泪）

- 相邻 beat 有**跨 beat 无缝动画**（比如 9 宫格逐格填 4→5 的接续）时，后一个 beat 必须绕过 `wrapWithTransition`（crossfade 会让画面看起来"重新出场"）
- 枚举类内容用**逐格填入**：先讲数字（不出容器）→ 空骨架出现 → 一个一个填 label（跟音频节拍）
- **机械/物理动画不用 emoji**：压缩机、齿轮、分割线用 div/SVG 硬画（示例见 Chapter4/5 的 `Press` 组件）

### 硬节点纪律（B27 挨骂沉淀）

- **每章做完立刻起 `npx remotion studio`**（后台 `cmd.exe /c npx remotion studio > studio.log 2>&1`）
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

```powershell
cd remotion
npx remotion render B25 out/b25.mp4 --concurrency=1
```

参考时长：3:43 视频（6693 帧）单核渲染约 13 分钟，多核 4-6 分钟。

## 🔗 相关记忆

- [[b39-lessons]] — **B39 项目复盘**（音画逐词对齐能量检测 / 跨 beat 合并 Sequence / text 与 ttsText 分离 / 截图驱动）
- [[b27-lessons-learned]] — **B27 项目复盘**（字幕单行/逐格填入/液压压缩机/硬节点纪律；其中"数字改中文读法"已于 2026-08-15 废止，数字按原文）
- [[b24-audio-driven-workflow]] — 音频驱动工作流的起源
- [[b23-remotion-workflow]] — Remotion 脚手架 + Sequence 相对帧陷阱
- [[web-video-style]] — 二哥呀视觉偏好总纲
- [[b19-visual-language]] — 微信对话行、淘汰红卡等组件
- [[b20-layout-rules]] — 底部 100px 留白等排版铁律
- [[b16-design-patterns]] — 5 章模板、白卡左边框
- [[animation-over-text]] — 动画优先原则
- [[volcengine-tts-b25]] — 火山 TTS 调用凭证（当前默认音色 S_ZqvEwo792 · 1.10 倍速）

## 📞 触发这个 Skill

用户说下面任一句话时，Claude 应自动 invoke 这个 skill：

- "帮我把这篇文章做成二哥呀风格的视频"
- "用二哥的声音做一个 X 分钟的讲解视频"
- "做个 Remotion 视频，用二哥克隆音色 S_ZqvEwo792"
- "启动 B26 项目"（自动匹配 B 系列命名）
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
项目名：<比如 B26>
输出目录：D:\.claude\projects\<项目名>

原文：
<粘贴 article.md 内容>

要求：
- 沿用 B19-B25 视觉体系（冷白背景 + 红蓝绿橙灰 + 白底黑边框卡片）
- 用二哥克隆音色 S_ZqvEwo792 · seed-icl-2.0 · 语速 1.10
- 逐章验收，每章做完停下等我确认再继续
- 严格执行"动画 > 文字"，只有金句 / 对话 / 术语允许全屏中文字
```

Claude 收到后应：
1. 读 article.md → 生成 script.md + beats.json + OUTLINE.md
2. 停下让用户对齐口播稿
3. 用户确认后调 gen_audio.py 生成 71 个 mp3
4. 生成 cues.ts + 拼接 voiceover.mp3
5. 搭 Remotion 脚手架 + 开发 Chapter1.tsx
6. 让用户在 Remotion Studio 里验收 Chapter1
7. 逐章推进至 Chapter5
8. 最终 `npx remotion render` 出 mp4
