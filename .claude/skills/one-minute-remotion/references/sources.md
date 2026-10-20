# 来源与整合决定

整合日期：2026-10-20。新流程以用户指定的完整文稿和声音为先，以一分钟为时长目标；文字稿统一保存到 `docs/src/ai/one-minute/`，超时不删减。以下文档用于选择可复用做法，不要求逐字执行各上游的全部流程。

## huashu-art-motion

- 仓库：https://github.com/alchaincyf/huashu-art-motion
- 本次读取的固定版本：`8a0d7d72ca65fcce6f8ba82c4a6c8dfe35b8422c`。
- 主要参考 `SKILL.md`、`references/03-一帧先行四条路线.md`、`references/06-口播驱动的艺术短片.md`、`references/12-口播整片与经验回流.md`、`references/动画语法/t1_3b1b.md`、`references/动画语法/y3_whiteboard.md`。
- `06` 自称方法草案，不能说成已完成验证的生产流程；本 Skill 同时参考较新的 `12`，仍需通过自己的成片验收。
- 采用对象动作、同例贯穿、连续形变、白板累积、有目的运镜、先验证核心画面的做法。
- 不复制作者角色、卡通形象、示范视频、字体文件或完整引擎，不继承模型等级分档、逐镜固定2至6秒、强制三方向选择、快动作像素门槛和自动修改上游经验库。
- 改写方法文档所需的上游 MIT 许可保存在 [upstream-LICENSE.txt](upstream-LICENSE.txt)。作者个人形象及部分示范素材有额外限制，因此本 Skill 不附带这些素材。

## 二哥现有流程

- `toBeBetterJavaer/.claude/skills/ergo-remotion-video/SKILL.md` 及其 `references/AV_SYNC.md`、`VOLCENGINE_TTS_GUIDE.md`、`USER_PREFERENCES.md`。
- 实际共享工具在 `ai-better/script/shared/`；toBeBetterJavaer 的 `docs/src/ai` 是指向 `../../../ai-better` 的软链接。本次已在本机核实。
- 保留现有音色配置快照、读音词典、整句意群合成、逐词对齐、字幕、Remotion导出和波形/全帧解码验证。
- 不引入另一套语音克隆，也不迁移到 PaiVideo；用户如果明确选择本地声音管线，再按那次请求另行接入。
- 本流程不继承多章导航、长片格式、固定营销尾段及按长片章节拆分的习惯。按用户要求以文字稿、配音、分镜、动画预览、导出五个阶段推进；“下一步”只做一个阶段，配音完成后停下供试听。只有明确要求连续出片时才串联余下阶段；仅创建 Skill 不包含试配音与渲染。
- `video-script` 只提供规范用词、具体例子、初次解释术语及准确来源原则；不继承长稿字数、固定三层、闯关或关注结尾。

## 私人配置

音色标识与音频配置只在实际项目初始化时从本机共享配置或用户指定项目读取。本 Skill 不内嵌音色标识、声纹、音频样本、密钥或环境变量的值。
