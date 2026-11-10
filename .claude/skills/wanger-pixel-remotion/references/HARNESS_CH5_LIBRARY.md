# 第五章论文阅读与知识蘑菇片尾

《DeepSeek Harness 四个插件》第五章使用 30 fps。正文展示一张真实 PDF 如何从阅读器进入特写，片尾在章内 F2233 切入「这个知识点你学会了吗？」。本页帧号均从第五章第一帧开始数。

| 库 | 下一期怎么用 | 取用入口 |
| --- | --- | --- |
| 素材 · 论文原页 | 取同一张白底 PDF 页面，保留图、图注和公式的印刷位置。本例为《Attention Is All You Need》第 4 页，页面坐标 612 × 792 pt。 | [第 4 页源图](approved-harness-ch5/source-page-4.webp) · [论文原文](https://arxiv.org/pdf/1706.03762) |
| 素材 · 人物与道具 | 思考、走路、起跳、指向和挥手用同一套二哥精灵。问号砖、书本蘑菇和星点由片尾组件绘制。 | [人物姿势](../assets/pixel-actor/) · [片尾组件](../assets/PowerUpOutro.tsx) |
| 阅读动效 · 从图读到公式 | 先读完整双图和图注，再把左图从印刷位置移到阅读位。同页的小节标题与公式依次出现，金线随口播划过。 | [PaperFigureLayers](../assets/PaperFigureLayers.tsx) · [连续成帧](approved-harness-ch5/paper-figure.webp) |
| 片尾动效 · 解锁、成长与告别 | 提问时出现问号砖，顶砖后蘑菇沿弧线入手。点赞和关注分别触发一次成长，署名时站定，告别时挥手。 | [片尾样片](approved-harness-ch5/powerup-outro.webp) · [点赞关注按钮](../assets/LikeFollowTiles.tsx) |
| 镜头转场 · 从工作台进入阅读 | F988 开始用 18 帧推入论文镜头，锁住外窗和字幕。F1386 过关和 F1507 回顾都用菱格。F2233 随提问直接切入独立片尾。 | [进入论文的转场](approved-harness-ch5/reader-push.webp) · [推入、横移与上移](../../../../docs/src/ai/script/shared/remotion/components/MotionSceneChain.tsx) · [菱格](../assets/WorldWipe.tsx) |
| 提示音 · 动作落点 | 文件、帧号和动作如下表。新一期根据自己的配音填写时间，章预览和整期共用同一条混音。 | [提示音 WAV](../assets/pixel-sfx/) · [本期声音表](../../../../docs/src/ai/script/deepseek-harness-four-plugins/assets/references/sound-plan.json) |

### 从论文原页取图

把 `PaperFigureLayers` 放在 PDF 原页所在的窗口里。`page` 传素材路径及原页宽高，`figure.crop`、`readings[].crop` 均按原页坐标取完整矩形。分别传入图的目标位置、标题和公式的阅读位置，以及划线的进度。本期左图原框为 [139, 61, 132, 165]，移至 [64, 65] 并放大到 1.28 倍。换论文时重新量取，按手机宽度检查分式末端、根号和上下标。[第五章用法](../../../../docs/src/ai/script/deepseek-harness-four-plugins/remotion/src/Chapter5.tsx)

### 片尾声音与口播

| 触发动作 | 本期章内帧 | WAV |
| --- | ---: | --- |
| 推进论文镜头 | 994 | [focus_air](../assets/pixel-sfx/focus_air.wav) |
| 读到公式，下划线准备展开 | 1178 | [data_pluck](../assets/pixel-sfx/data_pluck.wav) |
| 过关菱格闭合 | 1386 | [pixel_wipe](../assets/pixel-sfx/pixel_wipe.wav) |
| 顶到问号砖 | 2276 | [pixel_jump](../assets/pixel-sfx/pixel_jump.wav) |
| 蘑菇落到手中 | 2319 | [success_pair](../assets/pixel-sfx/success_pair.wav) |
| 点赞按钮按下 | 2350 | [pixel_like](../assets/pixel-sfx/pixel_like.wav) |
| 关注按钮按下 | 2360 | [pixel_follow](../assets/pixel-sfx/pixel_follow.wav) |

`PowerUpOutro` 接收片尾局部帧、当前字幕及 `unlock / like / follow / name / bye` 五个口播锚点。下一期先按自己的提问、解锁、点赞关注、署名和告别定时，再对齐顶砖（unlock − 12）、接住蘑菇（unlock + 31）和两次按下（like、follow 各 + 3）。人物脚底、砖底、蘑菇弧线和按钮奖励均使用同一组坐标。问句起点只出现一条字幕，全段只有一条配音。[本期片尾接法](../../../../docs/src/ai/script/deepseek-harness-four-plugins/remotion/src/NextOutroPreview.tsx)
