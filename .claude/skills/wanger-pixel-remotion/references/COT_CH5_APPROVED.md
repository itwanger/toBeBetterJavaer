# CoT 第五章：历史处理与动态空间（2026-11-12已认可）

用户明确称本章为“非常经典的一个标杆”。以最后认可源码为准：包含统一配色、按需箭头通道和紧凑推导行总结。源码与动态样例见[素材包清单](../assets/cot-knowledge-approved/manifest.json)，本期认可记录为 `docs/src/ai/script/what-is-cot/preview/approved-ch5/manifest.json`。

## 按动作取素材

| 源码对象 | 可复用的内容 | 适用边界 |
| --- | --- | --- |
| Window / Model / Plate / Whale | 等高对齐的独立窗口，品牌短名放标题栏，深描边与硬阴影 | 客户端与模型是独立主体；新题材更换品牌与角色，不套 DSH 外壳。 |
| Thought / Signature / Archive | 当前行撑起纸面，签名到来才让位，原记录与发送副本区分 | 本期签名行为是产品特定事实，换模型/API 需重新查证。 |
| Stage / ExchangeGeometry / Flow | 无连线时正常间距；传输开始后平滑腾出通道；箭头与数据共用动态端口 | 路径不得穿过正文；字体和图标不随容器横向拉伸。 |
| HistoryOverview / Tools / Cache | 新卡、新工具、缓存配对出现时才分配空间 | 不预排未来空槽；缓存应保留已有数据，读取不等于移走原件。 |
| CrossModel / CompactHistory | 原件保留、出站副本去签名；摘要思考丢弃、正文进入检查点 | 复用数据归属与连续移动方法，不将本期协议处理泛化到所有产品。 |
| CotRecap | 折角草稿纸、Token＋短关键词、铅笔书写；新行连续让位，独立答案条同宽对齐 | 不用两根细线撑满大空纸，不把文字扩成解释段落。 |
| TokenSymbol / ResultSymbol / 像素鲸鱼 | 同一数据符号、正误状态、品牌识别 | 抽象符号初次出现配必要短名，避免临时 T1/T2。 |

核心源码：[HistoryMechanism.tsx](../assets/cot-knowledge-approved/source/HistoryMechanism.tsx)。其同目录依赖 PixelSymbols、PixelImageWindow、Chapter2Design 和 PixelWorld；包内提供前面三项，PixelWorld 沿用 Skill 公共组件。还需将 `references/ch5-phrase-timing.json` 接到项目时点入口、鲸鱼放到 `public/images/dsh/pixel-whale-v1.png`。原图 HistoryOriginal 使用本期完整插画，不能把这个图的文件名和内容照搬到新题材。

Chapter4/Chapter5 是本期接线示例，依赖共享字幕、FlagCourse、WorldWipe、PowerUpOutro 与本期混音；并非独立可安装组件。取用时改为新稿真实配音锚点，不复制本期帧号。片尾干声和声音直接使用已有素材库，包内声音事件记录用于理解接触时点，不重存音频副本。

## 认可尺度与动态样例

本期为1920×1080、30fps；Stage x24/y94、1858×834。第五章无传输时两窗916宽，传输时回到820宽，24帧内腾出通道；标题/短名约46–62px，主要线路14px。总结纸与答案条1840宽，共用左右边界。这里是认可比例与接法，不是新项目的硬尺寸标准。

- [通道动态让位](../assets/cot-knowledge-approved/previews/dynamic-gap.mp4)：原章节1645–1852帧。
- [推导行与最终答案](../assets/cot-knowledge-approved/previews/recap-layout.mp4)：2462–2709帧。
- 本期完整章节参考：`preview/ch5-unified/chapter5-preview.mp4`。它早于以上两项局部修订，不作为覆盖最后源码的依据；当前版本由认可源码与局部片段共同确定。无须为了归档重新导出。

## 选用而不是混用

保持深青、金黄、薄荷绿、橙色、奶油纸与墨色轮廓。双端需要直接比较时同宽同高；焦点只在一端时可分配不同空间。当前行既要对齐，又要有足够视觉重量：符号、必要短名和真实动作合成一个对象。不要将“铺满”简化为加大一个仍然空荡的背景框。
