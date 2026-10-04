---
name: ergo-remotion-video
description: 把口播稿做成二哥风格的 Remotion 视频，包括整理视频用稿、火山 TTS 配音、音画对齐、逐章动画预览和导出带配音的 MP4。用户说“做视频”“口播稿转视频”“Remotion”“继续做下一章”“出片”“渲染”“改读音”“配音读错了”，或给出 docs/src/ai/video/ 下的稿子要做成视频时使用。共享工具、配置和素材在 docs/src/ai/script/shared/，每条视频在 docs/src/ai/script/<topic>/ 独立保存。
---

# 二哥风格 Remotion 视频

本 Skill 只记流程节点和禁令。目录、命令、组件清单和素材清单统一在 [共享工作流](../../../docs/src/ai/script/shared/WORKFLOW.md)，维护 Skill 时同步更新该文件并实际跑一遍命令。

## 定位项目

1. 从仓库根目录定位 `docs/src/ai/script/`，不把终端 cwd 当作视频项目目录。工具的 `--project` 传项目目录。
2. 继续旧项目，先运行 `doctor.py`，看输出里的 `progress`，再读 `script.md`、`beats.json`、`OUTLINE.md`。没有 `progress` 的旧项目，以项目文件和用户最新指令判断授权范围。
3. 找不到路径时修正路径，不新增另一套配置、依赖或生成目录。

## 流程节点

每个节点完成并得到对应的用户回复后，用 `progress.py --mark` 记录，后续会话据此判断走到了哪一步。

1. **整理用稿**。写项目 `article.md`、`script.md`、`beats.json`、`OUTLINE.md`。文末公众号推广尾段从起点删到文件末尾，连同后面的图片，项目内所有清单同步删除，不留“不使用”的标记。正文里的资料领取（288 道、222）和视频结尾的点赞关注保留。源文章不改。用户要求保留公众号引导时以用户为准。原稿“视频封面”区块的 16:9 封面下载为 `assets/images/cover-16x9.png`，做整片首帧。
2. **用户确认口播稿**，标记 `script`。确认前不合成配音。
3. **配音**。先跑 `pronunciations.py --write` 套用读音词典，再 `gen_audio.py`、`gen_cues.py`、`review_audio.py`。词典的 watch 项和 candidate 规则列入复听清单。标记 `audio`。
4. **逐章制作**。每章先写 `ch<N>-spec.json` 并生成时点，再写 `Chapter<N>.tsx`，然后跑 `chapter_pipeline.py` 出关键帧，并在 Studio 里预览。抽查配图帧、主要场景和转场中间帧，试听提示音。用户回复“继续”或明确认可后标记该章，再做下一章。最后一章同样先给 `Chapter<N>Preview`，用户认可后再切到整片 Composition 连看。
5. **出片**。只有用户明确说“渲染”或“出片”才标记 `render` 并导出，已经授权过的不重复询问。整片渲染加 `--detach`，轮询日志等待完成。
6. **成片检查**。跑 `verify_export.py`，核对完整解码、尺寸、帧率、帧数、音频同步和各章截图，通过后标记 `verified`。交付的是 `output/<outputName>`，不能把 Studio 预览或旧版称作本次成片。
7. **纳入 Git**。`output/` 顶层只放最终 MP4，试做放 `preview/`，旧版放 `output/legacy/`，细则见 [成片版本管理](../../../docs/src/ai/script/shared/WORKFLOW.md#成片版本管理)。commit 和 push 只按用户明确指令执行。

## 禁令

- 密钥只从 `config.volc.apiKeyEnv` 指定的环境变量读取，不写进项目、Skill、日志或命令参数。
- 不手改 `build/` 下的生成文件，不按字数估算时长。配音变化后重新生成时间轴和混音。
- 用户指定音色或语速时只改当前项目配置，用户要求改默认值时才改共享配置，不从历史项目恢复旧音色或旧倍率。
- 已有视频只读自己的 `project.json` 配置。修改共享默认值、共享组件或读音词典，不批量重做旧视频的配音和成片。
- 配音按确认稿朗读，不自动加语气词、情绪指令或反问。`text` 是字幕原文，`ttsText` 只写读法调整。
- ASR 识别正确不等于读音正确。没有实际试听，不宣称读音已验收。用户认可某个词，只代表这一项通过。
- 原稿配图原样展示，不用简化图形替换，也不重新生成。
- 画面不写字幕已有的整句、问句和台词，骂人的话不上画面。讲到产品的使用就画产品界面操作，讲到模型就写当代具体型号。
- 不伪造品牌标志。没有官方图标时，用通用概念图标。

## 音画规则

- **配音单元**。beat 按完整句子或自然意群拆分，不为字幕换行另起一段 TTS。一个 beat 里可以切换多组字幕和多个动画时点。用户觉得停顿太多时，合并被拆开的意群重新合成。细节见 [音画对齐](references/B39_LESSONS.md)。
- **读音**。先查 [读音词典](../../../docs/src/ai/script/shared/config/pronunciations.json)，新发现的误读和用户确认的读法都更新到词典里。争议术语先核对作者或官方的一手来源。判断和局部修复的方法见 [TTS 使用约定](references/VOLCENGINE_TTS_GUIDE.md)。
- **动画时点**。元素在术语起音前 4 到 6 帧开始入场，之后稳定显示，不循环脉动。讲同一画面的相邻 beat 共用一个场景，字幕切换不等于切换场景。
- **原稿配图**。在 `OUTLINE.md` 里把每张图对应到场景和 beat 范围，逐章预览时确认图片确实出现且可读。不采用的图要写明原因。
- **提示音**。新项目默认开启。只标记少量有意义的变化，比如错误出现、结果返回、资料场景切入，放在短停顿处，音量低于配音。用户说不要时关闭。
- **时长**。“3 分钟”按稿子保留，实际时长以配音为准，不为凑时长删内容。

画面构成先读 [画面规范](../../../docs/src/ai/script/shared/VISUAL_STYLE.md)：画面靠动画不靠文字、一章一个连续画面、去框、产品和型号写具体。这份规范与 Codex 共用，迭代画面经验时只改它。字幕分组、人物角色、闯关稿等补充见 [用户偏好](references/USER_PREFERENCES.md)。稿子里有“面试官问你”、求职者回答或面试追问时，读 [面试头像开场](references/INTERVIEW_OPENING.md)。普通科普稿不加面试剧情。

## 组件和素材

- 先用共享组件：`ChapterShell`、`FigureCard`、`HostCard`、`InterviewStage`、`Icons`，连续画面用 `Stage.tsx` 的 `track`、`Actor`、`Spotlight`，产品界面用 `ProductWindows.tsx`。清单见 [共享场景组件](../../../docs/src/ai/script/shared/WORKFLOW.md#共享场景组件)，新章节从 `shared/remotion/examples/Stage.example.tsx` 复制起步。
- 同一个场景或图标在两期以上重复手写，且不含主题数据时，提升到共享组件并登记。
- 产品图标、Harness 马匹、面试头像、提示音都在 `shared/assets/`，用前复制到项目 `assets/images/`，来源记录复制到 `assets/references/`。
- 组件代码按 JSX 元素换行，单行不超过约 160 个字符，样式常量放在文件顶部，便于用户按坐标改版。

## 最短示例

```bash
python3 docs/src/ai/script/shared/tools/init_project.py --project docs/src/ai/script/what-is-prefix-caching --source docs/src/ai/video/what-is-prefix-caching.md --title 'Prefix Caching'
python3 docs/src/ai/script/shared/tools/doctor.py --project docs/src/ai/script/what-is-prefix-caching
```

初始化只建草稿骨架，不调用 TTS，不生成成片。`DraftPreview` 不能当成已经制作的视频。
