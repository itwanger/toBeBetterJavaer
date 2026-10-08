# 视频画面规范

Claude Code（`ergo-remotion-video` Skill）和 Codex 制作二哥视频，画面都按这里的入口执行。目录和命令见 [WORKFLOW.md](WORKFLOW.md)。

## 当前风格

以 [用户偏好](../../../../.claude/skills/ergo-remotion-video/references/USER_PREFERENCES.md) 为准，要点如下：

- 暖米色背景、顶部完整章节导航、底部单行字幕和按章节分段的进度条，场景按段落短淡入切换。
- 全片一套色调，颜色只从共享色板 `C` 取：蓝色主色，铁锈橙强调，绿色只表示正确，深色写正文，灰色写次要信息。
- 自制图示用共享卡片 `card`：直角、蓝色细边、无模糊的灰色偏移阴影。卡内用等宽小标签，数据场景用 `Cards.tsx` 的分格进度条、排行表和便签结论卡。
- 画面不复述字幕整句，信息来自对象、关系和步骤。
- 原稿配图完整展示。信息量大的配图用 `FigureFocus` 做镜头聚焦：先整图，讲到哪一块就平移放大到哪一块，右侧说明列逐张入场，讲完拉回全图。

样张：[examples/Cards.example.tsx](remotion/examples/Cards.example.tsx)，渲染命令写在文件开头。
