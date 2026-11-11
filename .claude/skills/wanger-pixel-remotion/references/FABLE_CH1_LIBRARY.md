# Claude Fable 5.2 第一章定稿

2026-11-10 认可的版本为 1474 帧、30 fps。选动态布局时先看[有声定稿][movie]和[让位前、中、后的手机成帧](approved-fable-ch1/reflow-frames.jpg)。本章从发布原片进入代码终端、实机和协作工坊，最后由二哥跳旗。

| 下次要讲什么 | 直接取用 | 使用时换什么 |
| --- | --- | --- |
| 两个对象共享一个基座，接着讲规格和能力 | [ModelSpecReveal](../assets/ModelSpecReveal.tsx) 提供透明前景。第一项规格居中，两项并列用足宽度，首项能力到达时规格收矮、上移，随后已有卡片横向让位。[定稿动效](approved-fable-ch1/model-reflow.webp) | 传本章的局部帧、两个模型名、两项规格、基座名、能力数组和词头帧。每项能力给图标、短名、颜色和起音帧。发布原片、暖底、字幕和 HUD 由外层舞台提供。 |
| 空目录起步，随后多人分工 | [EmptyFolderWindow](../assets/EmptyFolderWindow.tsx) 显示指针、文件夹打开及目录空态。在 SVG 中用 0–1 的 `progress` 驱动。进入工坊后取[三类工人](../assets/WorkshopBot.tsx)和[像素图标](../assets/PixelMarks.tsx)。[定稿动效](approved-fable-ch1/workshop.webp) | 先展示观众实际要辨认的对象，再跟随工件经过编写、测试、审查三个工位。按新案例换站点、工具和交接动作。 |
| 高清发布片、终端菜单和原型实机 | [本期原片线索][sources]、[全景组件](../assets/WorkspaceOverview.tsx)、[原位放大](../assets/NativeDetailLens.tsx) | 从新选题的原始录像取材。独立图层标出当前模型、控件或部件，保持图窗、主体的外缘和字幕可见。 |
| 换景、跳旗、提示音 | [章节接法][scene]、[本期事件][sound]、[已有转场与音效索引](HARNESS_APPROVED_INDEX.md) | 复用转场类型及 WAV。落点、音量、金币计数读新一期口播与关卡进度。 |

首次接入动态布局可以从下面的形状开始。坐标基于 1920×1080，时间是当前章节局部帧。能力按起音顺序传入；图标可选 code、chip、orbit、clock、test、review、branch。

```tsx
<ModelSpecReveal
  frame={frame}
  models={modelNames}
  baseLabel="共享基座"
  specs={specs}
  events={{firstModel, secondModel, base, firstSpec, secondSpec}}
  abilities={[{at: softwareFrame, label: '软件工程', mark: 'code', color: pixelColors.mint}]}
/>
```

初始化新项目后运行 Skill 的[素材安装脚本](../scripts/install_pixel_assets.py)。本期专有的原片、口播和时间轴留在原项目。成片里的数字用于复核样例，下一期用自己的数据。

[movie]: ../../../../docs/src/ai/script/claude-fable-5-2/preview/chapter1-reflow/chapter1-preview.mp4
[sources]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/references/hd-captures.json
[scene]: ../../../../docs/src/ai/script/claude-fable-5-2/remotion/src/Chapter1.tsx
[sound]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/references/sound-plan.json
