---
name: wanger-pixel-remotion
description: 用二哥像素风视频 Skill 制作 xxx.md。把中文 Markdown 口播稿做成二哥横版像素游戏视频，按真实配音逐章制作、审片和导出。用户在本仓库请你做下一期视频、续做某一关或调整像素片尾时使用。
---

# 二哥像素风视频 Skill

本仓库新视频默认用二哥像素风。「用二哥像素风视频 Skill 制作 xxx.md」直接从稿件开始；明确点名「小超视频 Skill」时使用独立的 [chao-remotion](https://github.com/itwanger/chao-remotion)。

## 从稿件到有声预览

1. 确认稿件和项目的绝对路径。工作区为仓库的 `docs/src/ai/script`，每条视频的配音、素材、预览、源码与成片均归入本期目录。读[共享工作流](../../../docs/src/ai/script/shared/WORKFLOW.md)与[像素画面规范](references/PIXEL_STYLE.md)。旧项目先用 `shared/tools/doctor.py --project <项目>` 读取状态。新项目初始化后用 `python3 scripts/install_pixel_assets.py --project <项目>` 安装本 Skill 的组件、人物与提示音，已有项目先核对差异。
2. 按原文整理 `script.md`、`beats.json` 和 `OUTLINE.md`。出现固定片尾「这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！」，直接使用 Harness 定稿干声，禁止为它发起 TTS 请求，包括强制重配。优先在问号处分成两段；原稿为一段时用同一对干声连成的版本。素材缺失或损坏先恢复，禁止回退合成。其余意群按项目配置合成。多音字、人名和包名先查词典，仍不确定就把词与原句给用户定音。按[实际音频](references/AV_SYNC.md)生成字幕与动作帧。读音修正参照[TTS 指南](references/VOLCENGINE_TTS_GUIDE.md)。每次修正后重算受影响的时点与混音。
3. 每次制作一章。先在项目 `OUTLINE.md` 的本章分镜里写清口播的动词、画面主体和要沿用的认可镜头。先按[两期定稿的首版选镜表](references/FIRST_CUT.md)选一段认可样片，给新口播换上自己的素材、动作与读数。截图中的操作沿同一输入拍到结果，原位放大整个控件。见[插件实测](references/PLUGIN_WALKTHROUGH.md)。
4. 新章按[代码组件与自动审片接法](references/CODE_CONTRACT.md)使用舞台边界、动态让位和共用动作事件，填写本章检查清单；运行共享 `chapter_pipeline.py`，它会在混音前编译事件并生成 390px 手机审片页。必需对象裁切、HUD/字幕碰撞、套框与未覆盖检查先修复，留白和文字提示由人工判断。先用最能暴露问题的一段做手机宽度试片，先把自绘镜头与插件集市认可帧并排看底色，再检查素材清晰度、主体占幅与让位过程，或跟随一个工件看到交接结果。停在下一项出现前一帧核对占幅；硬件示意要能从整机找到部件，板边和尺寸标注与 HUD、字幕之间有余量。发现问题就在本轮改好，再检查全章字幕、动作提示音与转场，最后在 Studio 开声按 1 倍速连播并交付 `ChapterNPreview`。用户认可本章再开始下一章。
5. 明确要求“出片”或“导出”时，从共享工作区运行 `node shared/tools/remotion.mjs render --project <项目> --detach`，完成后运行 `python3 shared/tools/verify_export.py --project <项目>`，从最终 MP4 抽帧核对封面、接缝和片尾。收到提交或推送指令时处理对应 Git 仓库。

## 可复用的镜头

模型与能力依次出场、空文件夹、工坊交接可从 [Fable 第一章定稿组件与动效](references/FABLE_CH1_LIBRARY.md) 直接取用。分工、验收、硬件全景及拾音剖面从 [Fable 第二章定稿索引](references/FABLE_CH2_LIBRARY.md) 取用。总览转单项、失败后换策略、HUD 奖励、复杂图取景和跨镜头终端操作，从 [Fable 第三章定稿索引](references/FABLE_CH3_LIBRARY.md) 选取。坐标轴追光、成绩卡让位与实机持续叠分从 [Fable 第四章定稿索引](references/FABLE_CH4_LIBRARY.md) 取用。同题对跑、逐项费率、研究复证、真实评测与逐张发券从 [Fable 第五章定稿索引](references/FABLE_CH5_LIBRARY.md) 取用。插件实测、转场与声音从[五章定稿选用索引：素材、组件、动效、转场、提示音](references/HARNESS_APPROVED_INDEX.md)按要讲的内容挑镜头。索引给出可安装的实现、认可样片和本期原始素材，末尾可进入各章参数与接法。例如讲实测可从「固定全景 → 输入框原位放大 → 跨栏定位」开始；全期告别可直接取知识蘑菇片尾。

- [开场与安装](references/APPROVED_PIXEL_CH1.md)、[第二、三章的排版与运镜](references/APPROVED_PIXEL_CH2_CH3.md)、[完整串片与过关](references/APPROVED_PIXEL_FINAL.md)。
- 得分段按口播登阶、起跳、上旗杆；问句和告别用独立片尾。使用[知识蘑菇片尾](assets/PowerUpOutro.tsx)时，固定告别词沿用[Harness 定稿干声](assets/voice/harness-outro/manifest.json)。安装素材时同步拷贝干声。共享配音入口在请求 TTS 前自动匹配结尾并校验母带。按实际音轨定位收取、按钮和挥手时点。
- 产品证据使用真实屏幕或原文。讲机制时让操作或数据发生在原对象上。演员、视窗、转场、色板、趋势图、声音的细节以[像素规范](references/PIXEL_STYLE.md)为准。
