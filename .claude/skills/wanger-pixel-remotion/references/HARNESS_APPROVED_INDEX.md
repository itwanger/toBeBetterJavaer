# 二哥像素风选用索引：《DeepSeek Harness 四个插件》

以 2026-11-10 确认的[五章整期定稿][film]为准（4:12.23，30 fps），包括最后 6.5 秒的知识蘑菇片尾。想先看效果，可以打开[定稿抽帧][sheet]；要挑一个镜头，从下面五类按用途找。每行的「看」指向认可样例，「取」指向能带进下一期的实现。

将本期做法用到新题材时，先按口播判断该借哪一种镜头。发布视频铺底、模型卡让位和 Sub-agent 工坊的跨期用法，见 [Fable 第一章定稿组件与动效](FABLE_CH1_LIBRARY.md)、[第二章的分工、验收与剖面](FABLE_CH2_LIBRARY.md)、[第三章的机制关卡、读图与终端](FABLE_CH3_LIBRARY.md)、[第四章的双轴读图与实机叠分](FABLE_CH4_LIBRARY.md)、[第五章的同题对跑、评测实例与发券](FABLE_CH5_LIBRARY.md)和[首版选镜与同帧对照](FIRST_CUT.md)。

**新项目怎么取：** 初始化项目后，从仓库根目录执行下面的命令，把末尾路径换成新项目的绝对路径。[安装脚本][install]会把 TSX 放进 `remotion/src/`，人物 PNG 放进 `assets/images/`，提示音 WAV 放进 `assets/sfx/`；遇到已有的不同版本会报告冲突。横移、上移和推近直接引用工作区的[共享转场][motion]。

```bash
python3 .agents/skills/wanger-pixel-remotion/scripts/install_pixel_assets.py --project "/新项目的绝对路径"
```

## 1. 素材：哪些能直接带走，哪些要重新取

| 要找什么 | 去哪里取 | 下一期怎么换 |
| --- | --- | --- |
| 二哥人物、图标和道具 | [七张人物姿势 PNG](../assets/pixel-actor/)；[四款像素图标、卡片配色](../assets/PixelPluginCard.tsx)；[问号砖、书本蘑菇、星点](../assets/PowerUpOutro.tsx) | 人物可直接沿用。砖块和蘑菇在组件里绘制；卡片图标按新主题选，市场招牌和卡片保持一致。 |
| 第 1 章：带原始读数的趋势图 | [日活原图][users]、[插件数量原图][plugins] | 换成新数据的出处和原图，再量折线坐标；不要沿用本期的 154 万。 |
| 第 2 章：输入前后和分镜工作台 | [同一工作台的截图组][desk2] | 用同一视口拍空框、输入、结果三态，留下左右边界和发送按钮。 |
| 第 3 章：署名、网页原文与字形 | [插件图标、整页、两段原文与中英文字样][desk3] | 从新插件和新生成的同一份 HTML 取材，离线打开后再核对版面。 |
| 第 4 章：工作台入口与用量证据 | [原始界面和请求记录][desk4]、[分子分母的原始数值][case4] | 换成同一次请求、同一步的原始记录与统计范围。 |
| 第 5 章：论文图、图注与公式 | [认可版 PDF 第 4 页](approved-harness-ch5/source-page-4.webp)、[书架、阅读器与论文实测截图][desk5] | 换论文时取一张完整原页，重新量图注、公式和上下标；整页和特写都从它取。 |

工作台截图、产品数据和论文页是**本期取材示例**，不随安装脚本复制。追溯出处见[本期素材来源][sources]。

## 2. 组件：先决定观众要看什么

| 要呈现的画面 | 取实现 | 看认可样例 |
| --- | --- | --- |
| 用一个场景介绍四个插件 | [像素集市](../assets/PluginMarket.tsx)＋[图标卡](../assets/PixelPluginCard.tsx)。共用名称、图标、颜色，先认摊位再认卡片。 | [开市](approved-harness-ch1/market.webp) · [四卡全貌](approved-harness-ch1/four-cards.png) |
| 在手机上读图表 | [图表视窗](../assets/PixelImageWindow.tsx)。原图与追光层共用一个坐标系。 | [手机宽度的折线](approved-mobile-chart.webp) |
| 看完整工作台，再看当前操作 | [固定全景](../assets/WorkspaceOverview.tsx)＋[原位放大层](../assets/NativeDetailLens.tsx)。全景等比显示，放大层取整个控件。 | [全景](approved-harness-ch2/workspace.webp) · [输入框两端](approved-harness-ch2/input-focus.webp) |
| 在全景上介绍一个插件 | [插件署名](../assets/PluginTitleOverlay.tsx)。换图标、中文名和 ID，保留背景。 | [归藏设计开场](approved-harness-ch3/plugin-title.webp) |
| 既看整页，又读清其中两段 | [整页与原文双栏](../assets/FullPageReading.tsx)。左栏固定全页，右栏放同页原文。 | [左右同读](approved-harness-ch3/full-page-reading.webp) |
| 指认多个入口，或解释一个百分比 | [入口清单](../assets/NarratedRouteList.tsx)按口播点亮；[占比面板](../assets/EvidenceSharePanel.tsx)让原始记录、分子和分母同屏。 | [四个入口](approved-harness-ch4/narrated-routes.webp) · [占比怎么算](approved-harness-ch4/evidence-share.webp) |
| 先读论文原页，再看图和公式 | [论文分层](../assets/PaperFigureLayers.tsx)。给图、标题、公式各量一个原页矩形。 | [双图到公式](approved-harness-ch5/paper-figure.webp) |
| 章节得分，或全期告别 | 每章得分取[砖阶、旗杆与角色](../assets/FlagCourse.tsx)；全期告别取[知识蘑菇片尾](../assets/PowerUpOutro.tsx)，内含[点赞关注按钮](../assets/LikeFollowTiles.tsx)。 | [跳旗](stair-to-flag.webp) · [知识蘑菇](approved-harness-ch5/powerup-outro.webp) |

## 3. 动效：把动作对到哪句口播

| 口播触发 | 取哪个动作 | 看效果 |
| --- | --- | --- |
| 读趋势，再报终点数值 | [沿折线追光](../assets/ChartLineTrace.tsx)：逐点停留或连续走线，让亮点在报数时抵达终点。 | [追光和读数](approved-mobile-chart.webp) |
| 市场开张、获得支持、引来访客；接着逐一点名 | [集市](../assets/PluginMarket.tsx)分三拍开门、落币、进人；[四卡重排](../assets/FourCardLineup.tsx)从单卡到 2×2，再让位。 | [开市](approved-harness-ch1/market.webp) · [四卡重排](approved-harness-ch1/cards.webp) |
| “在这里输入……改第 3 镜” | [原位放大](../assets/NativeDetailLens.tsx)拍完整输入框；[跨栏定位](../assets/ControlHandoff.tsx)收回左框，再框住右卡并放大说明。 | [输入过程](approved-harness-ch2/input-focus.webp) · [左输入到右结果](approved-harness-ch2/cross-panel.webp) |
| “字形也收进文件，离线仍能打开” | [字形收进 HTML](../assets/GlyphsIntoHtml.tsx)：样本分别收向文件，打开后恢复同页原文。 | [收拢与离线打开](approved-harness-ch3/glyphs-into-html.webp) |
| 依次报入口，或报某一步的占比 | [清单](../assets/NarratedRouteList.tsx)的高亮与原控件同步；[占比](../assets/EvidenceSharePanel.tsx)用同一组数值驱动横条与百分比。 | [入口定位](approved-harness-ch4/narrated-routes.webp) · [原始记录](approved-harness-ch4/evidence-share.webp) |
| 从原图讲到公式 | [论文分层](../assets/PaperFigureLayers.tsx)：图从印刷位置移出，标题、公式、划线依次出现。 | [连续成帧](approved-harness-ch5/paper-figure.webp) |
| 报本关得分 | [登阶跳旗](../assets/FlagCourse.tsx)：先定报分时的落座帧，再向前排登阶和起跳。 | [助跑到落座](stair-to-flag.webp) |
| 提问、解锁、点赞关注、署名告别 | [知识蘑菇](../assets/PowerUpOutro.tsx)：顶砖、接蘑菇、两次按键成长、挥手。按新配音重定五个锚点，字幕只留一层。 | [认可片尾](approved-harness-ch5/powerup-outro.webp) · [整期接法][outro] |

## 4. 转场：什么时候切，怎么接

| 两镜之间的关系 | 取用与定稿示例 |
| --- | --- |
| 并列主题：图表 → 集市 | [共享转场][motion] 的 `turn` 横移。本期用 22 帧，新镜从右侧进入。[看切点](approved-harness-ch1/transitions.webp) |
| 从场景进入逐项点名：集市 → 四卡 | [共享转场][motion] 的 `rise` 上移。本期用 20 帧，字幕和 HUD 留在外层。[看切点](approved-harness-ch1/transitions.webp) |
| 从操作进入细节：工作台 → 论文 | [共享转场][motion] 的 `push` 推近。本期用 18 帧，保留外窗和字幕。[看阅读器推入](approved-harness-ch5/reader-push.webp) |
| 讲解 → 跑道，或跨章换场 | [WorldWipe 菱格](../assets/WorldWipe.tsx)遮满时换景。跨章由上章收拢、下章揭开。[看四个实际接点][sheet] |
| 最后一句总结 → 独立片尾 | 在“这个知识点你学会了吗？”起句直接切入[片尾场景][outro]。本期在 **04:05.73** 切，用原混音接到底。[看告别段](approved-harness-ch5/powerup-outro.webp) |

## 5. 提示音：先选动作，再取 WAV

| 动作落点 | 直接取音 |
| --- | --- |
| 横移交接；上移或卡片到场；推入细节 | [横移 soft_whoosh](../assets/pixel-sfx/soft_whoosh.wav) · [上移／登场 soft_pop](../assets/pixel-sfx/soft_pop.wav) · [推近 focus_air](../assets/pixel-sfx/focus_air.wav) |
| 指认操作结果；报出关键数值或公式 | [点选 soft_click](../assets/pixel-sfx/soft_click.wav) · [读数 data_pluck](../assets/pixel-sfx/data_pluck.wav) |
| 菱格遮满；离阶起跳或顶砖；坐旗或接住蘑菇 | [换场 pixel_wipe](../assets/pixel-sfx/pixel_wipe.wav) · [起跳 pixel_jump](../assets/pixel-sfx/pixel_jump.wav) · [收取 success_pair](../assets/pixel-sfx/success_pair.wav) |
| 点赞、关注两个按钮分别按下 | [点赞 pixel_like](../assets/pixel-sfx/pixel_like.wav) · [关注 pixel_follow](../assets/pixel-sfx/pixel_follow.wav) |

固定告别词另存了[两段干声及请求、文件指纹](../assets/voice/harness-outro/manifest.json)，来自定稿的第 48、49 意群。安装素材后，配音入口自动匹配固定片尾的一段或两段写法，从定稿母带取音。详见[第五章定稿接法](FABLE_CH5_LIBRARY.md)。

本期片尾四个声音可作校准示例：顶砖 **F2276**、接蘑菇 **F2319**、点赞 **F2350**、关注 **F2360**，均为第五章局部帧。下一期按自己的动作接触帧写声音表，单章预览与整期用同一条混音。用量与响度看[本期声音表][sounds]，不要把表里的意群偏移误当成章内帧。

**需要参数或接法时再按章查：** [① 折线、集市、四卡与跳旗](HARNESS_CH1_LIBRARY.md) · [② 工作台与跨栏](HARNESS_CH2_LIBRARY.md) · [③ 署名、读原文与 HTML](HARNESS_CH3_LIBRARY.md) · [④ 入口与占比](HARNESS_CH4_LIBRARY.md) · [⑤ 读论文与知识蘑菇](HARNESS_CH5_LIBRARY.md)。换素材后关注动作、文字和完整边界；检查频率与手机可读性核对统一按 [COLLABORATION.md](COLLABORATION.md) 执行。

[install]: ../scripts/install_pixel_assets.py
[motion]: ../../../../docs/src/ai/script/shared/remotion/components/MotionSceneChain.tsx
[film]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/output/deepseek-harness-four-plugins.mp4
[sheet]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/preview/export-check/approved-cuts-and-outro.jpg
[users]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/assets/images/official-users.png
[plugins]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/assets/images/official-plugins.png
[desk2]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/assets/images/ch2-media/
[desk3]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/assets/images/ch3/
[desk4]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/assets/images/ch4/
[desk5]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/assets/images/ch5/
[case4]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/assets/references/ch4-case.json
[sources]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/assets/references/sources.md
[outro]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/remotion/src/NextOutroPreview.tsx
[sounds]: ../../../../docs/src/ai/script/deepseek-harness-four-plugins/assets/references/sound-plan.json
