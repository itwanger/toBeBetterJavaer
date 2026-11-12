# CoT 第一章：软件操作与生成过程的认可方案

用户已认可《CoT 思维链》第一章。该方案适用于“输入 → 生成 → 展开/收起 → 解释概念”的软件演示；已有两期的集市、工坊、机关和跑旗继续按各自题材选用。

项目：`docs/src/ai/script/what-is-cot/`，`Chapter1Preview`，1920×1080、30 fps、1004 帧。配音与字幕按原稿冻结。下列时点用于找样片，下一期必须换成新配音的实际词头。

## 从口播选镜头

| 当前口播动作 | 认可版画法 | 本期帧 |
| --- | --- | --- |
| 发送一条提示词 | 左下小人物在完整工位敲键盘；右侧为按真实结构重建的输入界面，提示词逐字出现，按钮按下后切实测画面 | 0–84，43 发送 |
| 深度求索中、计时、分析行不断刷新 | 保留真实全局，在原分析区连续显示一个重点层；计时推进，尾部片段刷新；讲到生成片段时同一层扩展并逐字出现内容 | 84–301，156 刷新，233 展开片段 |
| 拆解问题、分析条件、尝试思路 | 画面必须来自“思考”区；按词头叠加“拆解问题、分析条件、不同思路”，不误接答案正文 | 349–519 |
| 变成完成折叠条 | 原位置附近放大整个控件，状态、用时、箭头一起出现；四边留给边框与阴影安全距离，开始逐层回看时收回 | 596–675 |
| 这就是 CoT | 取真正的思考片段，像素轮廓圈住它；三个文字节点与方块、箭头逐级形成，命名时再出现 CoT 标签 | 740–896 |

认可取景见 [关键帧](cot-ch1-approved/keyframes.jpg)。连续动作见 [输入与转场](cot-ch1-approved/input.mp4)、[刷新与生成](cot-ch1-approved/streaming.mp4)、[关键词依次出现](cot-ch1-approved/keywords.mp4)、[完成控件聚焦](cot-ch1-approved/completed.mp4)。[来源、哈希与认可记录](cot-ch1-approved/manifest.json)保留项目位置；[本期实际源码快照](cot-ch1-approved/source/HarnessReal.tsx)用于查看镜头接法，下一期不照搬 CoT 文本和时序。

讲三个关键词时，在原生输入区上方叠加短标签，本期词头为 433、455、488 帧。第一项居中；第二、三项到来才让旧项移动，并画连接箭头。背景仍保留思考正文，不用关键词替换原始证据。

## 这类题材的空间与动作

**人物是角落里的操作发起者。** 不用占满整屏的大桌子、大显示器抢走主体。小人、键盘和电脑要构成自然的完整姿势；已有精灵没有合适动作时，用 imagegen 生成完整工位动画，再制作 GIF/PNG 帧，不用长线段拼接手臂。本期人物画幅 360×360，透明留边后实际工位约 240×300，放在 1920×1080 的左下角。尺寸是构图起点，不是跨题材硬规定。

**输入与生成要真的动起来。** 输入框显示实际问题，光标和字随打字推进；“刷新”就持续改变片段，“生成”就让字逐步出现，“计时”就推进读数。只放静态截图、三条装饰线或亮灯无法交代这些动词。输入界面尽量沿用原产品的结构、颜色和控件关系，不另画无关的概念框。

**真实证据与演示按用途切换。** 本期用户授权重建输入与生成过程，文字摘录来自实际思考区。真实采集、动画时序、完成后回看和手动收起的区别记在素材来源文件中，不在画面添加“演示”“完成后展开回看”“本轮手动收起”等制作说明。素材不足时可用示意表现过程，来源记录中不得把示意写成模型实际输出。其它题材仍优先取真实操作证据，不因为有此样例就把实测全部模拟掉。

**焦点跟口播走。** 开始讲分析状态后，问题气泡就不再是重点。进入完成条时，焦点才转到整个完成控件。单独一行文字撑不起画面时，保持全局，用局部层强调；有足够上下文的正文可以直接推近。少量关键点聚焦，避免每句都弹一个放大层。控件原位锚定，必要时为四边安全区小幅让位，不移到无关的画面中央。

**比例来自素材，不用填黑补齐。** 真实图像等比取景；必要时先调整应用窗口比例再采集，或裁掉无关状态栏。本期原生窗口已经有圆角，沿用原边界，不额外套不贴合的 Mac 框。字幕、HUD 和原生窗口各自保持稳定。

**没有提前占位。** 只有思考片段时居中；第一项出现才让图上移，第一项居中；第二、三项加入时，再移动和缩小已出现内容。未出现的节点、空格和连接箭头都不画。CoT 标签到命名词头再出现，不能一开始就为它空出标题行。说明句由字幕承担，不在画面上再复制一遍“模型一步一步生成的推理过程”。

## 可直接安装的素材

现有 `scripts/install_pixel_assets.py --project <新项目绝对路径>` 会安装以下文件，仍拒绝覆盖已有自定义文件：

- [敲键盘透明 GIF](../assets/ergo-typing-v1/ergo-typing.gif)和 `frame-0.png` 至 `frame-3.png`：安装到 `assets/images/ergo-typing-v1/`。原图集、[生成提示词](../assets/ergo-typing-v1/PROMPT.md)和哈希同时保留。GIF 用于展示/复用；Remotion 依 `Math.floor(frame / 4) % 4` 选择 PNG，发送后停在第 3 帧，保证跳帧与渲染一致。
- [HarnessTypingOpening](../assets/HarnessTypingOpening.tsx)：完整角落人物、模拟输入、光标和按钮。接受 `f`、`send`、`prompt`、`framesDirectory`；当前布局对应 1920×1080。放在 `PixelWorld` 的 foreground 内，不再套窗口。
- [HarnessAnalysisStream](../assets/HarnessAnalysisStream.tsx)：放在 1872×832 的真实图像视窗中，接受摘录和各动作时点，按口播刷新并逐字显示。摘录由调用者提供，不内置某模型的推理内容。
- [ReasoningKeywords](../assets/ReasoningKeywords.tsx)：按三个词头依次出现标签，只有已出现项参与排布；接受 `f`、`starts`、`end`、`labels`、`width`、`top`，不自动新增声音或占位槽。
- [AnchoredNativeControl](../assets/AnchoredNativeControl.tsx)：接受原图、相机、裁切矩形、原位锚点与进度；四边限制确保完整控件、边框和阴影留在安全区。与全局图像共享坐标，不能只传一块孤立文字图。

```tsx
<HarnessTypingOpening f={frame} send={sendAt} prompt="本期真实问题" />
<ReasoningKeywords f={frame} starts={[splitAt,conditionsAt,approachesAt]} end={reasoningEndsAt} />

// 放在真实视窗内，时点来自当前配音。
<HarnessAnalysisStream f={frame} excerpt={capturedExcerpt}
 statusAt={statusAt} analysisAt={refreshAt} excerptAt={excerptAt}
 fadeAt={fadeAt} endAt={openAnalysisAt} />

<AnchoredNativeControl file="images/current-run/collapsed.png"
 sourceWidth={2560} sourceHeight={1200} stageWidth={1872} stageHeight={832}
 camera={{left:420,top:180,width:1720}} rect={[440,382,400,90]}
 anchor={[454,416]} zoom={2.4} progress={focusProgress} safeInset={36}
 underline={[14,80,332]} />
```

## 验收与认可边界

构图时兼顾手机播放比例；关键控件的聚焦层以读清目标为准，保留全局和完整边界。检查频率统一遵循[协作与精简检查](COLLABORATION.md)：局部修改只取2–3个关键状态或一次连续预览；可复用这些帧快速核对手机可读性，不另开密集审片、不用机械字号阈值重排认可画面。音轨未动不重混音。

第一章已经认可，后续制作沿用其基线；修改其它章节或公共组件，不顺带重排该章。用户提出具体修订时仅处理相应范围。认可不等于授权导出整片或提交仓库。
