# Fable 第五章定稿 · 速度、成本与额度

五章均已认可。第五章以第三版为准，2404 帧，30 fps。下列有声片段来自[这版样片][movie]。换题时先选观众要看清的变化，再取对应组件。

| 口播要表达什么 | 先看定稿 | 下一期怎么搭 |
| --- | --- | --- |
| 同一任务谁先完成，完成同量输出谁更贵 | [两个版本同题对跑](approved-fable-ch5/terminal-race.mp4) · [同模型切 Fast Mode](approved-fable-ch5/fast-mode.mp4) | 用一层 Mac 窗口容纳两个会话。两边共用题目、输出和起跑帧，模型或模式贴在对应会话里。生成进度走到末尾才显示完成。说到账单时，状态行上移，在每侧原位放相同计价单位的金额。发布方给的是速度上限，就在读数旁写“最高”。取 [TerminalRace](../assets/TerminalRace.tsx)。 |
| 一口气报三种价格 | [首项铺满，到词头再让位](approved-fable-ch5/rates.mp4) | 每张票据只留类别和金额。字幕已经逐项说出计费单位，这一镜将 HUD 至字幕之间的高度全给票据。单看截图仍需要区分单位时，把单位贴到金额旁。按[定稿 RateBoard][prices]改费率和入场词头。 |
| 研究任务究竟在解什么，资源节省在哪 | [费马命题、任务树与输出用量](approved-fable-ch5/proof.mp4) | 左侧给出具体命题及条件，右侧播放研究团队的子任务原片。验收出现时贴上检查结果和用时，讲节省时用同单位的两根条对照。换题时一并替换命题、原始素材、验收条件和用量口径。[取材记录][sources] · [定稿实现][review] |
| 编程基准怎样评分，模型每题花多少钱 | [真实题目到总分与成本](approved-fable-ch5/case-and-cost.mp4) | 从评测方的公开题抽出一个可观察行为。本例运行小程序复现重置，先见再次请求成功，再见清理失败。说模型得分时，把“全套评测”叠在同一次检查下方。另起一列，与得分并排显示每题平均花费。取[可运行的复现][fixture]和[定稿图层][review]；换题时同时换检查结果和全套基准数据。 |
| 订阅时长与奖励数量 | [三档订阅逐张发卡](approved-fable-ch5/reset-cards.mp4) | 把实际门槛写在各组上方，给几次就落几张券；后组入场时前组移动。适用方案放在票组上，观众能同时看清资格与数量。取 [RewardTickets](../assets/RewardTickets.tsx)。 |
| 固定告别 | [知识蘑菇定稿](approved-harness-ch5/powerup-outro.webp) | 使用 [PowerUpOutro](../assets/PowerUpOutro.tsx) 与[定稿干声](../assets/voice/harness-outro/manifest.json)。合成入口按文案匹配整句或两段，自动取 Harness 母带。顶砖、收取、点赞、关注按本期干声的词头和角色接触帧落音。[本期提示音表][sounds] |

安装素材后，两个新组件都自带 960×540 坐标的舞台，直接放在章节前景。传入镜头内的帧数，HUD 与字幕仍由 PixelWorld 绘制。

- `TerminalRace` 接收两个 `lanes`，每侧传模型名、可选模式、相对速率、读数标签和费用。两边共用 `prompt`、最多四行的 `output`、输出起点 `outputAt`、基准耗时 `baselineFrames`。用 `billAt` 和 `costUnit` 控制账单，费用来自相同的计量口径。需要说实测耗时，用本次运行的数据；本章按公告上限绘制。
- `RewardTickets` 接收 `title`、短券名 `ticket` 和一至三组 `tiers`。每组传实际门槛 `label`、张数 `count`（1 至 3）、出现帧 `at` 及色值 `tint`。组内每张相隔 6 帧进场。有声样片的 Fast 开关用 soft_click，发券用 success_pair，素材在[提示音库](../assets/pixel-sfx/)。

手机试片选三个时刻：右侧刚写完而左侧还在写、案例的两项验收结果同屏、第三张券落定。以 390 px 宽确认这些变化能直接读出来。图标和人物保留像素边缘；遇到细小中文，先用同一帧比较字号和字重。[字号试样][font]是独立对照，定稿画面以样片为准。

[movie]: ../../../../docs/src/ai/script/claude-fable-5-2/preview/chapter5-v3/chapter5-preview.mp4
[prices]: ../../../../docs/src/ai/script/claude-fable-5-2/remotion/src/PriceLab.tsx
[review]: ../../../../docs/src/ai/script/claude-fable-5-2/remotion/src/ProofAndReview.tsx
[fixture]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/references/ch5-msw/reset.mjs
[sources]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/references/ch5-sources.md
[sounds]: ../../../../docs/src/ai/script/claude-fable-5-2/assets/references/sound-plan.json
[font]: ../../../../docs/src/ai/script/claude-fable-5-2/preview/chapter5-v3/font-study/phone-390.png
