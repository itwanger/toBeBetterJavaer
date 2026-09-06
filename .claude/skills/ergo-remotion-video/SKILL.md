---
name: ergo-remotion-video
description: 将文章或口播稿制作成二哥风格的音频驱动 Remotion 视频。使用 script/shared 的共用工具、配置和素材，各视频独立保存内容与产物；逐章预览验收，用户明确要求出片后导出带配音 MP4。
---

# 二哥风格 Remotion 视频

本 Skill 维护制作规则，实际工具与默认配置由仓库中的 `docs/src/ai/script/shared/` 维护。不要再把 Python 工具、默认配置或公共组件复制到每条视频里。

## 先定位路径

1. 从当前仓库根目录定位 `docs/src/ai/script/`；不把终端 cwd 当作视频项目目录。下文命令示例均从仓库根目录运行；其他目录执行时，为工具和 `--project` 传绝对路径。
2. 共用资源：`docs/src/ai/script/shared/`。项目：`docs/src/ai/script/<topic>/`。
3. 继续旧项目先读 `project.json`、`script.md`、`beats.json`、`OUTLINE.md` 和当前检查记录，核实本轮授权到哪一步。
4. 初始化或迁移后运行路径检查；禁止通过增加另一套配置、依赖或生成目录掩盖找不到路径的问题。

详细布局及新建、配音、预览命令见 [项目布局与执行约定](../../../docs/src/ai/script/shared/WORKFLOW.md)。维护 Skill 或目录时同时更新该文件并验证其命令。

## 配置和素材

- 新项目默认值：[shared/config/video.config.json](../../../docs/src/ai/script/shared/config/video.config.json)。初始化时复制为项目 `project.json` 中的完整 `config`。已有视频只读项目配置，不随默认值改变。
- 用户指定音色或语速时，修改对应项目配置；只有用户要求修改默认值时才改共享配置。不要从历史示例恢复旧音色或固定倍率。
- 密钥只从 `config.volc.apiKeyEnv` 指定的环境变量读取（默认 `VOLC_TTS_API_KEY`），不写进项目、Skill、日志或命令参数。
- 默认人物：[shared/assets/ergo-avatar.jpg](../../../docs/src/ai/script/shared/assets/ergo-avatar.jpg)。初始化复制到项目 `assets/images/ergo-avatar.jpg`。用户指定素材优先；修改默认头像不批量替换旧视频。
- 主题配图放在项目 `assets/images/`，参考材料放 `assets/references/`。保留正文中的原稿配图是视频素材，不只是参考：在 `OUTLINE.md` 中逐张映射到场景及 beat 范围，原样展示；不自行用简化图形替换或重新生成。未采用时记录具体原因。下载成功不等于已用于画面。
- `remotion/public/images`、`remotion/public/audio` 是指向本项目 `assets/images`、`build` 的相对软链接，由初始化工具创建。组件继续用 `staticFile('images/...')` 和 `staticFile('audio/voiceover.wav')`；不要重复拷贝媒体。

## 流程与验收

1. **文章与稿子**：整理项目视频用稿 `article.md`、口播 `script.md`、`beats.json` 与 `OUTLINE.md`。默认从文末微信公众号推广尾段的起点截到文件末尾，文字和后续图片全部移除；同步清理项目 `article.md`、口播、配音清单、分镜及图片引用清单，不能仅标记“不使用”却仍保留。KV Cache 的明确截断点为“这个公众号历史发布过很多有趣的 Agent 知识点”，该句本身也删除。正文学习资料领取（如 288 道 / 222）和视频点赞关注结尾保留；用户明确要求保留公众号引导时再覆盖此默认规则。源文章文件不因整理项目用稿自动改写。稿子确认后才合成配音。
2. **拆分与配音**：按意群拆 beat，数量由文本长度决定 · 参考 3–4 分钟 ≈ 55–75 beat。逐 beat 合成配音，章节数由内容决定。迁移旧项目不自动重拆或重合成。
3. **逐 beat 动画**：`beats.json` 保存有稳定 ID 的 beat，动画按各 beat 的实际音频时点定位。相邻 beat 需要连续画面时合并为一个场景 Sequence，保持画面连续。
4. **真实时间轴**：原速 TTS → 项目倍率处理 → 解码累计采样数，生成 `build/cues.json`、`build/chapters.json`、`build/cues.ts`、`build/voiceover.wav`。动画读取这些生成文件，不手改生成的时间轴，也不按字数估计最终时长。
5. **逐章动画**：共享视觉组件从 `shared/remotion/components` 引入，主题动画留在项目 `remotion/src/`。连续场景合并 Sequence，避免每句卸载重挂。
6. **逐章预览**：每章完成后运行类型检查、抽查各类场景及配图的关键帧并打开 Studio；核对素材映射是否实际出现、图片可读性和连续展示。用户指定旧版为视觉基准时，对照实际视频截图检查，而非只读旧代码。已有 Studio 可继续使用；先核实端口和项目，默认端口不是固定占用要求。用户回复「继续」或明确通过后制作下一章。
7. **完整导出**：只有用户明确说「渲染」或「出片」才调用 render。已有明确授权不重复询问。输出在项目 `output/`，使用共享渲染入口处理音轨封装。
8. **成片检查**：检查完整解码、尺寸、帧率、帧数、音频同步和导出关键帧。交付真正位于 `output/` 的 MP4，不能把旧版或仅 Studio 预览称作本次成片。

## 音画与风格

- 配音读已确认的稿子，不自动加语气词或情绪指令。`text` 是字幕原文，`ttsText` 只承载明确的读法调整；没有 `ttsText` 时读 `text`。
- 评论口令 `222` 的指定读法是「二二二」，数量 `288 道` 的指定读法是「二百八十八道」；字幕仍保留数字。不要推广为全部数字自动转换。
- 先合成用户确认的音色，再按项目 `atempo` 调整；不要承诺变速无损。修改倍率后重建处理音频与时间轴。音色变化需要重合成相关配音。
- 配音负责讲述、字幕承载原文，画面呈现关系、动作和结果。原稿信息图中的解释文字完整保留；自制图形保留理解所需的对象、标签、箭头和中间步骤，不能为少文字而退化成几个术语方块。对话避免大段台词和底部字幕重复；字幕切换不等于切换场景。
- 视觉表达优先于长段文字堆屏：原稿大图与语义动画互补，按内容安排独立场景，不把“动画为主”理解成持续运动或替换原稿配图。金句和术语强调可用大字整屏；机械结构用 SVG/div，不用 emoji 替代。
- 正文默认采用冷白背景、红蓝绿橙灰、白底黑边圆角卡片、完整章节胶囊导航 `ChapterStrip`、底部单行字幕与细进度条。当前章节黑底白字，已过章节弱化；章节名称和数量随内容变化，不用当前章节编号替代完整导航。具体版式见 [用户偏好](references/USER_PREFERENCES.md)。共享组件调整应兼容旧项目，主题文字和字幕时点不得写进公共组件。
- 长字幕分句显示，一次只显示一行。通过真实音频能量、试听和必要的 ASR 核验短语边界；能量检测不是逐词对齐证明。
- 元素在术语起音前约 4–6 帧开始快速入场，之后稳定显示，避免循环脉动和频繁重复入场。
- 「3 分钟」保留用户稿子的表述；实际时长由配音决定，不为凑时长删内容。

进一步规则：[用户偏好](references/USER_PREFERENCES.md)、[音画对齐](references/B39_LESSONS.md)、[TTS 使用约定](references/VOLCENGINE_TTS_GUIDE.md)。

## 面试对话开场（按稿子选用）

稿子实际包含“面试官问你”、求职者回答或面试追问时，先读 [面试头像开场](references/INTERVIEW_OPENING.md)。采用豆包面试官与二哥求职者的头像对话、中央语义动画和底部字幕；人物在左右相对的位置，不画两个并排朝观众坐的全身人物。普通科普稿不自动增加面试剧情。

该模式只约束面试对话范围，不扩散为后续正文的改版；面试结束后回到正文的完整章节导航、配图和语义动画。复用共享头像与头像组件，主题分镜和实际音频时点留在本项目；不复用 KV Cache 样片的固定台词、帧数、音色 ID 或语速。

## 最短执行示例

```bash
python3 docs/src/ai/script/shared/tools/init_project.py --project docs/src/ai/script/what-is-prefix-caching --source docs/src/ai/video/what-is-prefix-caching.md --title 'Prefix Caching'
python3 docs/src/ai/script/shared/tools/doctor.py --project docs/src/ai/script/what-is-prefix-caching
```

初始化只建草稿骨架，不调用 TTS、不创建成片。随后按稿子确认、配音、章节验收的实际进度执行；不能把草稿 `DraftPreview` 当成已制作的视频。
