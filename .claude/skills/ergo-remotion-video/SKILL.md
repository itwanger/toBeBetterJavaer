---
name: ergo-remotion-video
description: 把口播稿做成二哥风格的 Remotion 视频，包括整理视频用稿、火山 TTS 配音、音画对齐、逐章动画预览和导出带配音的 MP4。用户说“做视频”“口播稿转视频”“Remotion”“继续做下一章”“出片”“渲染”“改读音”“配音读错了”，或给出 docs/src/ai/video/ 下的稿子要做成视频时使用。共享工具、配置和素材在 docs/src/ai/script/shared/，每条视频按主题在 docs/src/ai/script/ 下独立保存。
---

# 二哥风格 Remotion 视频

本 Skill 只记流程节点和禁令。目录、命令、组件清单和素材清单统一在 [共享工作流](../../../docs/src/ai/script/shared/WORKFLOW.md)，画面偏好在 [用户偏好](references/USER_PREFERENCES.md)。

按已有经验直接制作，用户负责审片，提出要调整的地方再改。不做额外的自证检查，不逐条核实稿子，交付时只说做了什么、哪里需要用户注意。

## 定位项目

1. 从仓库根目录定位 `docs/src/ai/script/`，工具的 `--project` 传项目目录。
2. 继续旧项目先跑 `doctor.py` 看 `progress`，再读 `script.md`、`beats.json`、`OUTLINE.md`。
3. 找不到路径时修正路径，不新增另一套配置、依赖或生成目录。

## 流程节点

每个节点得到对应的用户回复后，用 `progress.py --mark` 记录。

1. **整理用稿**。写项目 `article.md`、`script.md`、`beats.json`、`OUTLINE.md`。文末公众号推广尾段连同后面的图片整段删掉，正文里的资料领取（288 道、222）和结尾点赞关注保留，源文章不改。原稿“视频封面”区块里的横版 16:9 封面（标题写“16:9 封面”或“宽屏横版封面”）下载为 `assets/images/cover-16x9.png` 做整片首帧。
2. **用户确认口播稿**，标记 `script`。确认前不合成配音。确认后按稿子制作，画面配合稿子讲。发现稿子和现行版本对不上，一句话告诉用户，由用户决定改不改。
3. **配音**。`pronunciations.py --write` 套用读音词典，再 `gen_audio.py`、`gen_cues.py`、`review_audio.py`（生成逐词对齐）。标记 `audio`。
4. **逐章制作**。每章写 `ch<N>-spec.json`、生成时点，再写 `Chapter<N>.tsx`，跑 `chapter_pipeline.py`。工具报出的开口空画面处理掉，然后把 `Chapter<N>Preview` 交给用户。用户回复“继续”标记该章，再做下一章。
5. **出片**。用户说“渲染”或“出片”才标记 `render` 并导出，整片渲染加 `--detach`。
6. **成片检查**。跑 `verify_export.py`，通过后标记 `verified`。交付的是 `output/<outputName>`。
7. **纳入 Git**。`output/` 顶层只放最终 MP4，规则见 [成片版本管理](../../../docs/src/ai/script/shared/WORKFLOW.md#成片版本管理)。commit 和 push 只按用户明确指令执行。

## 禁令

- 密钥只从 `config.volc.apiKeyEnv` 指定的环境变量读取，不写进项目、Skill、日志或命令参数。
- 不手改 `build/` 下的生成文件，不按字数估算时长。配音变化后重新生成时间轴和混音。
- 用户指定音色或语速只改当前项目配置；修改共享默认值、共享组件或读音词典，不批量重做旧视频。
- 配音按确认稿朗读，不自动加语气词。`text` 是字幕原文，`ttsText` 只写读法调整。
- 没有实际试听，不说读音已验收。
- 原稿配图原样展示，不用简化图形替换，也不重新生成。带边框时取景框和图片同宽高比（`fitBox`），边框里不露空白。
- 颜色只从共享色板 `C` 取，自制卡片只用共享 `card` 或 `Card`。
- 录制还原的界面文字、顺序和数字只取自录制，没录到的不补，两次录制不拼成一次。录制只在临时目录里跑。
- 录制、调用 API、翻安装包或源码核对这类实操验证，先问用户。需要调 API 时用 DeepSeek，不调用 Anthropic API。
- 不伪造品牌标志和硬件产品图，先用共享素材库，见 [品牌素材复用](../../../docs/src/ai/script/shared/WORKFLOW.md#品牌素材复用)。

## 音画规则

- **配音单元**。beat 按完整句子或自然意群拆分，一个 beat 里可以切换多组字幕和动画。选择题的问句和选项合成一个单元。细节见 [音画对齐](references/AV_SYNC.md)。
- **读音**。先查 [读音词典](../../../docs/src/ai/script/shared/config/pronunciations.json)，用户指出的误读和指定的读法直接改并更新词典。方法见 [TTS 使用约定](references/VOLCENGINE_TTS_GUIDE.md)。
- **画面跟着配音走**。元素按配音提到的先后入场，在术语起音前 4 到 6 帧开始，之后稳定显示。每句话一开口主体区就要有相关内容。讲同一画面的相邻 beat 共用一个场景。
- **真实素材优先**。讲 Agent 产品的具体交互时，可以提议真实录制（`record_tui.py` 录屏、`TuiRecording.tsx` 还原）；题目示意图、过渡画面优先复用本期已有的录制和原稿截图。
- **原稿配图**。在 `OUTLINE.md` 里写清每张图对应的场景、beat 和聚焦顺序。
- **提示音**。默认开启，只标少量有意义的变化，音量低于配音。用户说不要时关闭。

稿子里有“面试官问你”或面试追问时，读 [面试头像开场](references/INTERVIEW_OPENING.md)。普通科普稿不加面试剧情。

## 组件和素材

- 先用共享组件，清单见 [共享场景组件](../../../docs/src/ai/script/shared/WORKFLOW.md#共享场景组件)，新章节从 `shared/remotion/examples/Chapter.example.tsx` 复制起步。
- 同一个场景或图标两期以上重复手写、且不含主题数据时，提升到共享组件并登记。
- 品牌图标、面试头像、提示音在 `shared/assets/`，用前复制到项目 `assets/images/`。
- 组件代码按 JSX 元素换行，单行不超过约 160 个字符，样式常量放在文件顶部。

## 最短示例

```bash
python3 docs/src/ai/script/shared/tools/init_project.py --project docs/src/ai/script/<topic> --source docs/src/ai/video/<topic>.md --title '<标题>'
python3 docs/src/ai/script/shared/tools/doctor.py --project docs/src/ai/script/<topic>
```
