面试官问你：“模型越来越强，Harness 会不会被模型吃掉？”

如果你回答“会啊，以后模型什么都能干，Harness 早晚没用”，或者反过来说“不会，Harness 永远重要”，恭喜你，出门右拐回家等通知吧。

为什么？

因为这两个回答都没有把 Harness 能做的事区分开。Agent 等于 Model 加 Harness，Harness 负责协助模型完成工作，它做的事分两种。

第一种叫补短板，替模型做它还做不好的事。比如模型输出的 JSON 少了括号、多了逗号，Harness 就可以补一手解析容错和失败重试；再比如说工具调用的结果太长会超出模型的上下文窗口，Harness 就得把工具的数据结果做一次裁剪。

第二种叫划边界，规定 Agent 能做什么、不能做什么。比如只允许修改项目目录里的文件，删除文件和执行命令之前要先经过用户确认，每一次工具调用要记审计日志等。

被模型吃掉的，比如早期的 Agent 要调用工具，得靠 Harness 用正则表达式从模型的回答里提取工具名和参数；现在的模型原生支持 Function Calling，能直接输出工具调用需要的 JSON，Harness 就不用再做这一步了。补短板的事正在随着模型变强一件一件被模型接过去，划边界的事在模型越强的时候反而越不能少。

![](https://cdn.paicoding.com/stutymore/will-model-eat-harness-20260924131623-32f3ebfd.png)

我翻了李博杰《深入理解 AI Agent》，还有 Anthropic 和 OpenAI 的工程博客与模型文档，可以自信地、大方地、光明磊落地帮你搞清楚这三件事。

【本脚本已整理到飞书文档，共计350题，有需要的可以call我】

![](https://cdn.paicoding.com/stutymore/will-model-eat-harness-20260924135801.png)

**先说第一件事，模型已经吃掉了什么。**

比如说输出格式修正，2024 年 8 月，OpenAI 推出 Structured Outputs，官方测试里模型遵循 JSON Schema 的得分，只靠模型训练是 93%，剩下的 7% 由 API 侧的约束解码补齐，达到了 100%。

比如说推理引导。早期要在系统提示词里写“让我们一步一步思考”，模型才会分步推理。Opus 5.5 的官方提示词指南已经写明，删掉“回答前先仔细思考”这类指令以后，回复开始得更快，但质量却没有下降。

再比如说上下文压缩。对话快超出上下文窗口时，Harness 要调用模型把早期的对话写成摘要。从 GPT-5.1-Codex-Max 开始，OpenAI 通过训练让模型自己压缩上下文，这项能力叫 compaction。

Anthropic 今年 3 月的工程博客讲了原因。Harness 里的每个组件，背后都有一个假设，就是模型自己做不到某件事。模型变强以后，假设不成立，组件也就没用了。

![](https://cdn.paicoding.com/stutymore/will-model-eat-harness-20260924131809-0037d12d.png)

**那聪明的你肯定想到了：模型一直在变强，划边界的事为什么吃不掉？**

第一个原因，模型再强也不能保证不出错。模型的行为是概率性的，训练能让它更少犯错，但不能让它不做危险操作。只要 Agent 手里有删除文件的权限，模型就有可能删错。Anthropic 今年 5 月的文章原话是，模型层的防御“永远不可能 100% 有效”。而且模型越强，越会找到意想不到的办法去完成目标，文章里举过一个例子，Fable 会为了让测试通过，去翻 Git 历史找测试的答案。

Opus 5.5 的发布页也写着，它尝试绕过设定边界的次数比 Opus 5 少了约 85%，但不是零。所以 Opus 5.5 同时配备了在每个动作执行前进行审查的分类器，和安全团队可以审计的开源沙箱。

![](https://cdn.paicoding.com/stutymore/will-model-eat-harness-20260924132119-04706de9.png)

第二个原因，边界的规则来自每家公司的业务。哪些目录能改、哪些操作要审批，每家公司都不一样，这些规则不在模型的训练数据里，模型没法通过训练学会。就算是通用的规则也不行，Opus 5.5 的训练数据截止到今年 6 月，9 月 22 日才发布，而业务规则随时可能调整。所以这些规则只能写在 Harness 里，用代码强制执行。

**那聪明的你肯定又要问了：面试官到底想听什么，工程上又该怎么做？**

模型是靠训练把补短板的事吃掉的，而且训练时用的就是自家公司的 Harness。OpenAI 官方的 Codex 提示词指南要求，修改文件要用他们原版的 apply_patch 实现，因为模型专门训练过这种 diff 格式。

模型把 Harness 今天替它做的事练成自己的能力以后，Harness 就不用再做这件事，转而去做新一代模型在更难的任务上还做不好的事。

![](https://cdn.paicoding.com/stutymore/will-model-eat-harness-20260924132355-7f94a519.png)

工程上的做法是，每换一次模型，就做一次消融实验，也就是逐项去掉某个部分，看效果有没有变化。Claude Code 的创建者 Boris Cherny 的做法是，把整个系统提示词删掉，再一行一行加回来，看哪一行真正影响效果。Anthropic 7 月公布过结果，针对 Opus 5 和 Fable 5，Claude Code 的系统提示词删掉了 80% 以上，编码评测上没有什么损失。

面试时可以这样答。补短板的事会被模型吃掉，但要一件一件来，速度取决于模型的训练周期；划边界的事不会被吃掉，权限、沙箱和审计要一直留在模型外面。

![](https://cdn.paicoding.com/stutymore/will-model-eat-harness-20260924132457-ebe1eac7.png)

最后简单总结下。

模型吃掉的是 Harness 补短板的事，吃不掉的是 Harness 划边界的事。

另外给大家一条实用建议，每换一次模型，就把 Harness 里补短板的部分逐条去掉，系统提示词和 Skill 都算在内，跑一遍评测，效果不降的就可以永久删掉了。反正 Opus 5.5 我就又迭代升级了一波 Skill，感觉模型的能力明显变强了。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

<!-- video-covers:start -->
## 视频封面

![竖版封面](https://cdn.paicoding.com/stutymore/will-model-eat-harness-cover-portrait-20260924131907-d34bcc97.png)

![宽屏横版封面](https://cdn.paicoding.com/stutymore/will-model-eat-harness-cover-wide-20260924131907-e83b69f8.png)

![标准横版封面](https://cdn.paicoding.com/stutymore/will-model-eat-harness-cover-standard-20260924131908-473474aa.png)
<!-- video-covers:end -->
