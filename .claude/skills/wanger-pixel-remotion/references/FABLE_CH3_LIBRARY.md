# Fable 第三章定稿选镜

2026-11-10 认可稿为第八版，1920×1080、30 fps、2258 帧。下列短片均从同一份[有声定稿][movie]截取。先按要解释的动作选一行，再用新配音确定入场、接触和结果的帧。

| 当前要讲什么 | 看定稿 | 下一期怎么用 |
| --- | --- | --- |
| 从几项能力过渡到其中一项 | [原图抬起 → 独立算力台](approved-fable-ch3/focus-and-effort.mp4) | 原稿插图先给全貌，当前格抬起，邻格变淡。接下来只需要指认时，在原对象上做动作；需要几秒钟解释它如何运作时，切到独立场景。本例让分支、旋钮、灯带共同显示步骤复杂度与算力投入。取 [IllustrationFocus](../assets/IllustrationFocus.tsx) 和 [EffortDesk](../assets/EffortDesk.tsx)。 |
| 质疑原方案、测试、换策略 | [落水、机关桥、补回红心](approved-fable-ch3/bridge.mp4) | 用同一个障碍拍两次尝试。把角色放在开关右边，直跳失败后停下、回头，观众从电线认出开关和桥座的联系。踩下时桥片升起，走过去验证结果，顶砖取回刚才丢的心。章末口播报成绩时才进跳旗镜头。取 [RetryBridge 与 BridgePickup](../assets/RetryBridge.tsx)。 |
| 读懂一张复杂的图 | [从整树跟到分支](approved-fable-ch3/tree.mp4) | 单层 Mac 窗固定；让真实视频在窗内移动。先看根节点，再跟到要读的分支，把「整棵树最大深度」独立钉在窗内，保住数字的统计范围。窗口宽度按手机可读性和素材实际比例确定。取 [FocusedMedia](../assets/FocusedMedia.tsx)。 |
| 工程约束改变了装配方式 | [直放碰壁 → 倾斜装入](approved-fable-ch3/hardware.mp4) | 从同一原图的两处剖面取景，标注直接指向碰撞位置。声学、散热、电流依次到来时，证据图才上移让位。换案例时重新量原图坐标。[装配镜头实现][cad] |
| 同一次操作由两段口播讲完 | [Mac 终端选模型 → 回到同一模型提问](approved-fable-ch3/terminal.mp4) | 默认勾选、移动中的高亮、确认后的勾选是三个不同状态。确认后同步更新右上模型名；切回终端时延续它。问题用本期主题，先读结果，再让结果收起、给字段和校验反馈腾地方。取 [MacClaudeTerminal、ModelPicker、TerminalPadlock](../assets/MacClaudeTerminal.tsx)。 |

## 组件、图层与动效的接法

运行 Skill 自带的[安装脚本](../scripts/install_pixel_assets.py)后，从新项目的 `remotion/src/` 导入这些组件。

- **原画和算力台。** 给 `IllustrationFocus` 传 `file`、原画坐标系 `sourceSize`、每格的 `source` 与 `destination` 矩形，以及选中序号 `selected` 和 0–1 的 `progress`。目标坐标用 960×540。给 `EffortDesk` 传局部帧 `frame` 和随口播平滑变化的 `strength`（0–4）；三处动作共享同一强度。五档名称属于这类推理设置，灯的数量是视觉示意。[定稿词头与停留时长][timing]
- **真实图窗。** `FocusedMedia` 的 `width/height` 是 1920×1080 画布上的窗口尺寸，`camera.cx/cy` 是源图像素，`camera.scale` 是显示倍率。将录屏和追踪标记放进 children，把中文读数传给 `overlay`。本例 1280×668 的任务树放进 1858×803 的内容区，倍率从 1.45 到 2.38；开工时以新素材重定中心点及倍率。完整原图能读清时可直接取 [PixelMediaWindow](../assets/PixelImageWindow.tsx) 贴合素材。[本期原片与出处][tree-source]
- **终端。** `MacClaudeTerminal` 接受 `frame`、已确认的 `model` 和 SVG 子元素。`ModelPicker` 接受当前页的 `choices`（最多四个可见项）、`defaultModel`、可连续移动的 `position` 和已确认的 `confirmed` 行号。回车时一起更新勾选和标题。数据和结果来自当期原表、接口文档或实测。这里 Fable 实调超时，画面按文章原表排出两个模型的编程成绩；修改签名返回 400 来自官方 Cookbook 的独立记录。出处与限制保存在[取材记录][sources]。画面保留命令、问题、读数和反馈。[本期完整接法][terminal-code]

## 奖励、HUD 与提示音

机关桥的失败和得奖改变的是同一个状态。把 `RetryBridge` 放在 `PixelWorld` 的 foreground，用 `bridgeHearts(frame, timing)` 驱动 `hearts`。把 `BridgePickup` 放在世界层之后，使飞行中的红心能经过 HUD。传给三处的 timing 共用同一时间轴，八个帧按动作先后递增。本例把片段局部帧 0 定在进场：

```tsx
const timing = {start: 0, jump: 74, splash: 108, retry: 131, press: 207, hit: 306, collect: 325, end: 329};
return <>
  <PixelWorld mode="platform" coins={2} hearts={bridgeHearts(frame, timing)}
    caption={caption} captionStyle="band" foreground={<RetryBridge frame={frame} timing={timing}/>}>
    {null}
  </PixelWorld>
  <BridgePickup frame={frame} timing={timing} />
</>;
```

`splash` 是鞋底碰水的一帧，水花、[落水短音](../assets/pixel-sfx/pixel_splash.wav)和三心变两心在这里同时发生。`hit` 是顶砖帧，[奖励双音](../assets/pixel-sfx/success_pair.wav)与红心起飞同帧；抵达 `collect` 才补回第三颗。本期两声峰值分别为 −21 和 −24 dBFS。混音用对应意群的 `offsetFrames = 动作所在的全片帧 − 意群起始帧`。默认落点为 1920×1080 原版 HUD 的第三个心槽；HUD 排版变化时把实测中心传入 `BridgePickup.target`。金币数量、关卡成绩由各自的剧情驱动。

新章优先按[统一动作事件接法](CODE_CONTRACT.md)从同一份事件生成动画、HUD 和声音计划，替代分别手写 offset；本页保留定稿接触帧供核对。

## 首版怎么验

涉及这些接缝时，按协作规则选择必要状态或片段核对：总览退场后，目光能否立刻落到新主体；第一次助跑是否误踩了开关；丢心到领回之间能否一直看见空心槽；终端切回来的模型是否与上次确认的一致。读实验图时还要看放大前后是否能认出同一个节点。碰到英文档位或专名读错，只重配所在意群，用实际录音的起音重新对字幕、旋钮和音效。

[movie]: ../../../../docs/src/ai/script/claude-fable-5-2/preview/chapter3-v8/chapter3-preview.mp4
[timing]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/references/ch3-phrase-timing.json
[cad]: ../../../../docs/src/ai/script/claude-fable-5-2/remotion/src/ConstraintsLab.tsx
[tree-source]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/references/ch2-sources.json
[terminal-code]: ../../../../docs/src/ai/script/claude-fable-5-2/remotion/src/ClaudeTerminal.tsx
[sources]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/references/ch3-sources.md
