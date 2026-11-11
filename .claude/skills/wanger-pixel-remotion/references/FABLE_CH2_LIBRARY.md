# Claude Fable 5.2 第二章定稿

2026-11-10 认可的第二章为 2937 帧、30 fps。[完整带声样片][movie]。[整机与剖面四帧](approved-fable-ch2/hardware.jpg)和[任务单的分派与验收](approved-fable-ch2/ticket.webp)可用于下一章开工时选镜。

| 口播在讲什么 | 取哪件素材、怎么拍 | 手机上检查什么 |
| --- | --- | --- |
| 二哥提问，主 Agent 开始工作 | [ReactionActor](../assets/ReactionActor.tsx) 先思考，再指向[工坊角色](../assets/WorkshopBot.tsx)。沿用马路的全宽字幕带，进入无路面的工作区后换字幕牌。 | 看脚底与路面、字幕带与路面下沿。二哥和执行任务的角色能分清。 |
| 部分人被调去做同一件事 | [金色任务单](../assets/TaskTicket.tsx) 从主角色手中移出；被调动的工人跟单，其他人留在原处。原项目有[工具标志及出处][tools]。 | 遮住字幕，找得到哪组动了、哪组留下，以及任务交给谁。人数读数可由旁白承担。 |
| 子任务展开，最后得到总结果 | 单据的分支图案接到原始任务树，深度和节点数就地标注。回到整套证明时先盖验收章，再显示用时；比较下一项指标时，整张完成单才向侧面移动。[定稿接法][proof] | 观众能区分子任务的统计与整套任务的耗时。验收状态和对应数值出现在同一个物件上。 |
| 从设备整机讲到内部部件 | 先认清整机，才进入示意剖面。以短名和引线标出进声孔和麦克风，保留固定的胶囊和后壁，让壳体前端移动。将尺寸括号绑定到两端，将共振读数绑定到声道。[示意实现][hub]、[原片来源][source] | 在最大放大帧看完整外缘、阴影与字幕。调节过程中检查引线始终落在所指部件，初态和终态都停得住。 |

新项目安装后，把 `TaskTicket` 放进 SVG，传脚本算出的 `x`、`y` 和 `scale`。同一张单据可以用 `accepted` 显示验收状态。表示分工时，任务单移动、工人接手、提示声分别对到新配音的动作帧。

设备、面板或带尺寸线的主体可套 [FitPixelSubject](../assets/FitPixelSubject.tsx)。`bounds` 包含图形、最外描边、阴影和随主体移动的标注；`area` 是扣除 HUD 和字幕后的可用矩形。两者使用父 SVG 的同一坐标系。只有背景照片需要满幅时，独立安排背景。器件图、论文、品牌标志随每一期重新核对出处和指代。

[movie]: ../../../../docs/src/ai/script/claude-fable-5-2/preview/chapter2-hub/chapter2-preview.mp4
[proof]: ../../../../docs/src/ai/script/claude-fable-5-2/remotion/src/ProofLab.tsx
[hub]: ../../../../docs/src/ai/script/claude-fable-5-2/remotion/src/HubCutaways.tsx
[tools]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/images/ch2/tools/SOURCES.md
[source]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/images/ch2/hub/SOURCES.md
