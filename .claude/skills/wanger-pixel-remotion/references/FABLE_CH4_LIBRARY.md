# Fable 第四章 · 评测读图与实机叠分

2026-11-10 认可稿为第二版，42.23 秒、1267 帧。下面三个带声片段都从[整章定稿][movie]截取。先按口播选动作，再换本期素材、刻度和起音。

| 口播需要看什么 | 定稿短片 | 素材、组件与接法 |
| --- | --- | --- |
| 说出评测名，再解释评的是什么 | [软件工程与合入检查](approved-fable-ch4/aligned-merge.mp4) | 代码单左边、主线起点、名称标签贴左上主题牌外沿。检查框右边和主线终点贴右上状态栏外沿。在原分支上方单独叠标签，等念到名称才出现。金色提交点沿代码单的分支移动，验收才点亮合入路径。[定稿分支坐标][shots] |
| 在手机上读原表、对比多个成绩 | [软件得分依次入场](approved-fable-ch4/score-cards.mp4) | 原表先给全貌，定位到目标行时保住列名、单位和档位。提取当前模型的数值放进独立成绩卡。只有第一项时用满卡组宽度，后两项在各自词头入场时，前面的卡才收窄。[NarratedScoreCards](../assets/NarratedScoreCards.tsx) |
| 成本与得分同时出现在曲线上 | [画轴、沿线移动、读 Max 点](approved-fable-ch4/axis-trace.mp4) | 从发布方矢量图取原始点和单位。讲横轴时金点向右扫，读数留在刚经过的真实刻度；讲纵轴时从同一原点向上扫。进入目标数据段才移动相机，淡化对照线，用粗线、亮点、节点脉冲读主曲线。终点停稳，同屏保留档位、成本和得分。[AxisSweep](../assets/AxisSweep.tsx) · [ChartLineTrace](../assets/ChartLineTrace.tsx) · [原始点][data] |
| 实机动作与模拟基准连续出现 | [实机连续播放，成绩叠在下方](approved-fable-ch4/live-scores.mp4) | 让一个录像元素贯穿整段，用贴在实机一角的标签交代来源。评测名称和模拟范围写在半透明图层里。先呈现这一行的四项成绩，随后图层收窄，以相同零点和上限比较两项，最后显示从原数算出的比值。字幕、HUD 和关键动作都留出空间。[LiveScoreOverlay](../assets/LiveScoreOverlay.tsx) |

安装新项目后，三个新组件从 `remotion/src` 导入，放在 960×540 的 SVG 坐标系内。每次以新旁白计算帧号。

- `AxisSweep` 接收 `axis`、`origin`、`end`、`progress` 和 `ticks`。每个刻度包含**屏幕坐标** `position` 和带单位的 `label`，按扫过顺序排列。成本轴先用真实对数映射求坐标。相机移动时刻度、曲线与高亮共用一个映射。节点标签朝内收，留出字牌宽度。
- `NarratedScoreCards` 接收 `f`、`rows`（`name/value/tint/at`）和可选 `y/h`。在下一项入场的前一帧检查第一项的占幅；卡片左右外边线与原图窗共用安全边线。
- `LiveScoreOverlay` 接收 `frame`、最多四个 `rows`（`name/score/color`）、两项的数组索引 `compare`、标题与范围 `title/subtitle`，以及四个词头 `timing.show/focus/second/ratio`。条长共用 `maxValue`，默认 100；`unit` 默认 %。分母为正数才显示比值。底层只挂一次 `Sequence + OffthreadVideo`，在有效原片长度内选播放速率。各项入场只改变图层，底片时间继续向前。
- 转场沿用共享 `MotionHandoffs` 在**不同场景**间移交主体。同张图的读轴、同段录像的成绩变化就在各自图层完成。点名、终点命中和跳旗可从[已有提示音](../assets/pixel-sfx)里取，音量和词头重按新配音定。第四章在合入路径点亮时用了 `soft_click`，公布软件读数和两倍比较时用了 `data_pluck`，到达 Max 点用了 `soft_pop`；场景切到 CAD 时用 `soft_whoosh`，进入模拟成绩时用 `focus_air`。跳旗沿用 `pixel_wipe / pixel_jump / success_pair`。实机视频默音，口播和提示音从同一条章节混音播放。[定稿声音接法][cues]

涉及追线改动时，按协作规则选必要状态核对亮点、真实刻度与读数对应，兼顾手机可读性。实机在成绩出现前、四项全貌、双条比较、比值出现后，都应能对回原录像的**不同时刻**。数据的评测范围、档位、原片与对应关系留在[来源记录][sources]。

[movie]: ../../../../docs/src/ai/script/claude-fable-5-2/preview/chapter4-v2/chapter4-preview.mp4
[shots]: ../../../../docs/src/ai/script/claude-fable-5-2/remotion/src/BenchLab.tsx
[data]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/references/ch4-cad-points.json
[sources]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/references/ch4-sources.md

[cues]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/references/sound-plan.json
