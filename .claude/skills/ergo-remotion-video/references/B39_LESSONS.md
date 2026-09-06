# B39 经验沉淀 · 长科普片工作流（2026-08）

项目：DeepSeek Harness / Cordis 源码解读，3 分 46 秒，40 个 beat，5 章。
这是继 B27 后对工作流的重要补强，重点解决了**音画逐词对齐**和**跨 beat 连续画面**两个老问题。

## 1. 音画对齐：用能量检测，不要用分句合成估算

### 问题
逐格填入（"模型、工具、技能… 全是插件"）、英文词逐个弹出（Plugin/Context/Service/inject/Events）这类动画，
元素必须在音频念到那个词的**瞬间**出现。之前用"把每个分句单独合成 TTS、测时长、累加"的办法，
**总是对不齐**——因为分句单独合成带句末停顿，整句连读时停顿不同，累加出来的词边界整体偏早/偏晚，用户反复说"没同频"。

### 正确做法（B39 验证有效）
直接分析**真实 beat 音频文件**的能量包络：

```bash
python templates/align_words.py audio/beat_27.mp3
```

1. ffmpeg 把 mp3 转 16kHz 单声道 wav
2. 按 20ms 窗口算 RMS 能量
3. 阈值 0.10 + 最短静音 2-3 块，切出每个发声段
4. 把发声段（含多音节拆段）映射到词，得到每个词的真实起点秒数
5. 秒 × 30 = 帧，填进组件的 `start` 数组

脚本模板见 `templates/align_words.py`。

### 动画侧关键：提前 + 快弹簧
光时间对了还不够。如果在词起点才 `spring` 从 0 弹起，要 10+ 帧才到位，等于词念完才出现。
- 每个元素**提前 4-6 帧**触发
- 弹簧用 `stiffness: 200-300, damping: 18`，约 4 帧就位
- 这样音频念到词时，元素已经稳稳显示

```ts
const pop = spring({ frame: frame - (wordStartFrame - 6), fps: FPS,
                     config: { damping: 18, stiffness: 300 } });
```

## 2. 跨 beat 连续画面：合并成一个 Sequence，不要用 noExit

### 问题
"一张截图配两句相邻的台词"（如 beat2+3 同一张 GitHub 图、beat6+7 三连问、beat22-24 回滚热重载、beat34+35 对比图），
如果每个 beat 是独立 `<Sequence>` + `<Beat>` 包裹，交接处组件卸载/重挂载，图片重新解码，会**闪白/重播入场**。
即使给前一个 beat 加 `noExit`、后一个加 `noEnter`，两个组件实例仍然不同，闪白依旧。

### 正确做法（B39 验证有效）
把连续的多个 beat **合并成一个 React 组件、一个 Sequence**：
- 组件内部用 `useCurrentFrame()` 判断当前在哪个 beat
- 字幕在内部按 `D22`/`D23` 分界手动切换（用 `BeatSubtitle` 直接渲染）
- 图片只挂载一次，全程不重渲染，画面绝对连续
- 组件内用相对帧（0 开始），Sequence 的 `durationInFrames` = 几个 beat 之和

```tsx
const D22 = dur(22), D23 = dur(23);
const B22to24 = () => {
  const frame = useCurrentFrame();
  let sub, local;
  if (frame < D22) { sub = CUES[21].text; local = frame; }
  else if (frame < D22+D23) { ... }
  return <AbsoluteFill>
    <Scene>{/* 一张图，全程不重挂 */}</Scene>
    <BeatSubtitle text={sub} localFrame={local} durationFrames={...} />
  </AbsoluteFill>;
};
// 导出时一个 Sequence 包住 D22+D23+D24
```

B39 里合并的片段：
- Ch1 B23（beat2+3 GitHub 截图）
- Ch1 B67（beat6+7 三连问）
- Ch3 B21to24（beat21-24 无痕挂钩→回滚→热重载）
- Ch4 B28to29（依赖图）、B31to32（三模式）
- Ch5 B34to35（对比图）

## 3. 字幕分行：text 与 ttsText 分离

### 问题
为了让 TTS 读对英文词（Cordis 夹在中文中间会连读走样），需要在 Cordis 前加逗号停顿，
但用户要求**字幕忠实原文**，不能把为朗读加的逗号显示出来。

### 正确做法
`beats.json` 里一个 beat 可以有两个字段：
- `text`：字幕显示文本（= 原文）
- `ttsText`：TTS 朗读文本（可含为发音加的停顿逗号）

`gen_audio.py` 合成时优先用 `b.get("ttsText", b["text"])`；
`gen_cues.py` 把 `text` 写进 cues.ts 给字幕用。音频文件不变，字幕显示原文，两全。

同样，字幕强制分行时给 `<Beat>` 传 `subtitleLines`（每行文本）+ `subtitleLineFrames`（每行帧数，用能量检测测），
不要依赖自动宽度切分来对齐多句台词。

## 4. Windows / 编码坑

- **PowerShell 5.1 的 `Set-Content -Encoding utf8` 会加 BOM**，导致 package.json 解析失败（JSONError: Unexpected token '锘'）。
  写 JSON/配置文件一律用 Write 工具（无 BOM），不要用 PowerShell 重定向。
- 内联多行 Python 代码（`python -c "..."`）在 PowerShell 里引号会被吃掉，写成临时 `.py` 文件再跑。
- TTS 合成输出加 `$env:PYTHONIOENCODING="utf-8"` 避免中文打印乱码。

## 5. 素材驱动：用户给截图就用截图

B39 用户在验收过程中陆续提供了真实截图（公众号发布图、GitHub 仓库页、Harness 论文页、
Cordis 来源手绘图、卸载对比图、模式下拉菜单）。规律：
- **beat 配真实截图时，自制图形一律让位**——删掉原来画的卡片/图标，直接 `Img` 展示截图
- 截图统一展示样式：宽 ~1180、5px 黑边框、borderRadius 16、深阴影 `0 24px 80px rgba(0,0,0,0.4)`
- 弹簧入场（`stiffness 110, damping 16`），**不要加扫光/旋转/退场**，除非用户要——
  B39 用户明确说过"图片出入场不要加特效，正常出现、音频结束一起消失"
- 截图尺寸用百分比/固定宽度，不要让它撑满全屏

## 6. 数字滚动 / 计数器

"3000+ 插件"这类用 `interpolate(spring(...), [0,1], [0, target])` 做滚动，
触发时机同样要跟音频对齐（用能量检测或分句分界）。

## 7. 这次的最终成片配置（可作默认值参考）

- 音色 `S_ZqvEwo792`，`speed_ratio 1.10`
- 3 分 46 秒，6837 帧，40 个 beat
- 渲染：`npx remotion render B39 out.mp4`，约 3-4 分钟，输出 30MB
- 字幕：底部黑底白字胶囊，38px，单行 nowrap，破折号 `——` 会被剔除（splitToLines 逻辑）

## 相关
- SKILL.md 主工作流
- templates/align_words.py（本次新增的对齐脚本）
- references/USER_PREFERENCES.md
- references/VOLCENGINE_TTS_GUIDE.md
