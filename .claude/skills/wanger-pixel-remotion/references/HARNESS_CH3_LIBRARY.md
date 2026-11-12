# 第三章归藏设计镜头库

《DeepSeek Harness 四个插件》第三章认可版，1920 × 1080，30 fps。三个组件可通过像素素材安装脚本进入新项目的 `remotion/src/`。工作台、网页和字形样本取自当期实测。

| 分类 | 做法 | 可复用组件 | 认可画面 |
| --- | --- | --- | --- |
| 画面组件 · 插件署名 | 保留工作台全景，在截图范围内淡入真实图标、中文名和插件 ID。 | [PluginTitleOverlay](../assets/PluginTitleOverlay.tsx) | [片名成帧](approved-harness-ch3/plugin-title.webp) |
| 阅读版式 · 整页与原文 | 左边固定完整页面，右边依次读同一页的题头、引文和解释。 | [FullPageReading](../assets/FullPageReading.tsx) | [整页与原文成帧](approved-harness-ch3/full-page-reading.webp) |
| 对象动效 · 字形收进 HTML | 字形样本分别缩向文件，离线打开时恢复同页原文。 | [GlyphsIntoHtml](../assets/GlyphsIntoHtml.tsx) | [从字形到离线打开的动图](approved-harness-ch3/glyphs-into-html.webp) |

## 介绍一个新插件

在全景截图上方放 `PluginTitleOverlay`。传入图标的素材路径、中文名、插件 ID、截图内容区的 `box`，以及 0 到 1 的显隐进度 `progress`。窗口边框和字幕在遮罩之外。本期以读出插件名的 F45 为锚点，F39–53 淡入，F98–110 淡出。下期按新名称的音节长度调整停留时间。

## 展示一页作品，再读其中两段

在源坐标为 1440 × 650 的窗口里放 `FullPageReading`。`page` 接收完整页面截图及其 CSS 宽高，左栏等比容纳整页。`heading` 的 x、y、width、height 从同一页量取，scale、left、top 确定标题在右栏的落点。每张 `excerpts` 图片给出原文件路径、纵坐标和显隐进度。右栏宽 854 个源像素，下一期按实际段落长度重测高度和间距。

这期的两句素材同时出现在输入框和成品。为让手机观众认出原句，在原 HTML 中用内嵌字体将这两段放大重排，再截取段落，保留引号、黑底和原句标点。先出“苹果”的引文，接着出 Transformer 的解释。构图须保证两段末字完整、手机播放比例下重点可读。

## 讲字形嵌入，再演示离线打开

把 `GlyphsIntoHtml` 放在同一个 `FullPageReading` 内。传入 HTML 文件名和字形截图数组，每个样本提供起点和各自的收拢进度。文件出现、字形显现、离线打开分别由 `fileOpacity`、`reveal`、`opened` 驱动。右栏原文也传入同一个 `opened`，文件落向左下角时，右侧就回到刚才读过的版面。

本期从真实 HTML 截取“苹果”和“Transformer”两个字样，分别于 F782 和 F788 开始收拢，各用 26 帧。F852 起回到离线页面。换网页时，先离线打开该文件并与原页核对，再使用离线状态和对应字形。此例原页与离线截图的像素相同。

[本期实际用法](../../../../docs/src/ai/script/deepseek-harness-four-plugins/remotion/src/Chapter3.tsx) · [原文阅读层取材脚本](../../../../docs/src/ai/script/deepseek-harness-four-plugins/preview/chapter3-layers/reading.py) · [离线对照记录](../../../../docs/src/ai/script/deepseek-harness-four-plugins/preview/chapter3-redesign/page.json)
