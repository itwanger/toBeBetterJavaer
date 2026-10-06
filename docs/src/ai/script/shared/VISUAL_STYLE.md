# 视频画面规范

Claude Code（`ergo-remotion-video` Skill）和 Codex 制作二哥视频，画面都按这里的入口执行。目录和命令见 [WORKFLOW.md](WORKFLOW.md)。

## 当前风格

以 [用户偏好](../../../../.claude/skills/ergo-remotion-video/references/USER_PREFERENCES.md) 为准，要点如下：

- 冷白背景、顶部完整章节导航、底部单行字幕和按章节分段的进度条，自制图示用白底黑边圆角卡片，场景按段落短淡入切换。
- 画面不复述字幕整句，信息来自对象、关系和步骤。
- 原稿配图完整展示。信息量大的配图用 `FigureFocus` 做镜头聚焦：先整图，讲到哪一块就平移放大到哪一块，右侧说明列逐张入场，讲完拉回全图。细则见用户偏好的“配图镜头聚焦”。

参考成片：`what-is-prefix-caching`（配图聚焦）、`workflow-vs-agent-flight-booking`、`agent-intent-routing`。

## 停用的试验：连续画面风格

2026-10-04 的 `nine-prompting-techniques-for-better-llm` 试过“一章一个连续画面、去掉卡片边框、元素跨段落移动”的做法，播放量两千多，之前的卡片风格都在一万以上，prefix-caching 七万多。用户决定回到卡片风格，这套做法不再用于新视频。

- 试验版的 Skill 写法见提交 `e8d09d074`；试验之前的卡片风格基线保存在 Git 分支 `video-style-v1`。
- 组件 `Stage.tsx`、`ProductWindows.tsx` 仍在共享目录，只供那一期维护。
- 播放量只说明结果，没有确认是哪一条规则拖累了表现，不要据此推断单条规则的好坏。
