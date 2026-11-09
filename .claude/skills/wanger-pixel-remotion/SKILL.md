---
name: wanger-pixel-remotion
description: 用二哥像素风视频 Skill 制作 xxx.md。把中文 Markdown 口播稿做成二哥横版像素游戏视频，按真实配音逐章制作、审片和导出。用户在本仓库请你做下一期视频、续做某一关或调整像素片尾时使用。
---

# 二哥像素风视频 Skill

本仓库新视频默认用二哥像素风。「用二哥像素风视频 Skill 制作 xxx.md」直接从稿件开始；明确点名「小超视频 Skill」时使用独立的 [chao-remotion](https://github.com/itwanger/chao-remotion)。

## 从稿件到有声预览

1. 确认稿件和项目的绝对路径。工作区为仓库的 `docs/src/ai/script`，每条视频的配音、素材、预览、源码与成片均归入本期目录。读[共享工作流](../../../docs/src/ai/script/shared/WORKFLOW.md)与[像素画面规范](references/PIXEL_STYLE.md)。旧项目先用 `shared/tools/doctor.py --project <项目>` 读取状态。新项目初始化后用 `python3 scripts/install_pixel_assets.py --project <项目>` 安装本 Skill 的组件、人物与提示音，已有项目先核对差异。
2. 按原文整理 `script.md`、`beats.json` 和 `OUTLINE.md`。用户确认用稿后，以项目配置中的授权音色和语速合成完整意群。多音字、人名和包名先查词典，仍不确定就把词与原句给用户定音。按[实际音频](references/AV_SYNC.md)生成字幕与动作帧。读音修正参照[TTS 指南](references/VOLCENGINE_TTS_GUIDE.md)。每次修正后重算受影响的时点与混音。
3. 当前会话一次做一章，逐章审片。分镜记录每拍的口播触发词、主体原位、动作、落点。当前对象先用足画面，新对象出现时再移动和重排。实测沿同一输入拍到结果；截图先给完整界面，以图层和放大镜聚焦整个控件。文档进入阅读状态时用原页铺满视窗，图与式按口播移位。参照[插件实测](references/PLUGIN_WALKTHROUGH.md)。
4. 点赞、跳起、触碰、转场的提示音按动作同帧落下。每章在 Studio 按 1 倍速开声连播，按手机宽度核对动作中段、字幕间距和四边；给用户 `ChapterNPreview`。用户认可本章再开始下一章。此阶段用预览与必要的静帧。
5. 明确要求“出片”或“导出”时，从共享工作区运行 `node shared/tools/remotion.mjs render --project <项目> --detach`，完成后运行 `python3 shared/tools/verify_export.py --project <项目>`，从最终 MP4 抽帧核对封面、接缝和片尾。收到提交或推送指令时处理对应 Git 仓库。

## 可复用的镜头

- [开场与安装](references/APPROVED_PIXEL_CH1.md)、[第二、三章的排版与运镜](references/APPROVED_PIXEL_CH2_CH3.md)、[完整串片与过关](references/APPROVED_PIXEL_FINAL.md)。
- 得分段按口播登阶、起跳、上旗杆；问句和告别用独立片尾。下一期可试用[知识蘑菇片尾](assets/PowerUpOutro.tsx)，按本期实配重新定位收取、按钮和挥手时点。
- 产品证据使用真实屏幕或原文。讲机制时让操作或数据发生在原对象上。演员、视窗、转场、色板、趋势图、声音的细节以[像素规范](references/PIXEL_STYLE.md)为准。
