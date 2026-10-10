---
title: 怎么设计 Agent 的 Human-in-the-loop？
---

面试官问你：“Human-in-the-loop 怎么设计？”如果你回答“危险操作之前弹窗，让用户确认一下就行”，恭喜你，出门右拐回家等通知吧。

为什么？

因为弹窗弹多了，人会烦的，我就很讨厌 Agent 的弹窗设计，都已经人工智能了，直接 Auto 梭哈到底啊。不管是 Claude Code 还是 Codex，我都是直接给的最大权限。

![](https://cdn.paicoding.com/stutymore/agent-human-in-the-loop-20261009095405.png)

Human-in-the-loop，可以翻译成【人在回路中】，但不管翻译成啥，听起来就很别扭。意思就是在 Agent 的执行过程中设置一些需要人来做决定的节点，比如批准、修改或者拒绝，然后再让 Agent 接着执行。难点不在弹窗本身，而在于哪里该弹，哪里不该弹。

恭喜看到这里的你，已经成功击败 30% 的学习者，给自己鼓个掌吧。**接下来我问你，哪些操作必须等人点头？**

A，所有写操作；B，除了只读操作以外的全部操作；C，按风险和可逆性分级。聪明的你可以把答案打在弹幕或者留言区。

我的答案是只读操作，比如读取文件、搜索代码，直接执行。可回滚的写操作，事后通知就行，比如 Claude Code 的 auto 模式，对项目目录里的文件编辑直接放行，改错了用 Git 撤回就行。至于不可逆的操作，以及涉及资金、权限、对外发送的操作，比如删除数据库、转账、群发邮件，必须事前审批。

审批的内容要具体、要清晰，要把完整的命令、要修改的文件 diff、订单的金额展示出来，用户看一眼就知道自己需要批准什么。

![](https://cdn.paicoding.com/stutymore/agent-human-in-the-loop-risk-levels-20261009102401-76c97060.png)

恭喜看到这里的你，已经成功击败 50% 的学习者了。**接下来继续问你，怎么样才能少打扰用户？**

A，记住授权；B，把规则写在前面；C，交给另一个模型审查。聪明的你会选哪一个？

我的答案是三个都要。先说记住授权。Claude Code 的审批弹窗里有一个选项叫“Yes, and don't ask again”，选了它，Bash 命令的授权会写进仓库根目录的 `.claude/settings.local.json`，下次遇到同样的命令就不再询问。

再说规则。Claude Code 的权限规则分 deny（拒绝）、ask（询问）、allow（允许）三种，按 deny、ask、allow 的顺序匹配，先匹配上哪一条就按哪一条执行。allow 规则没法给 deny 规则开例外，所以把 `rm -rf` 这类命令写进 deny，Agent 任何时候都执行不了。

最后是交给另外一个模型审查，也是 auto 模式的做法。规则判断不了的操作，比如 Shell 命令、网络请求、项目目录以外的文件操作，交给分类器模型审查。分类器分两个阶段，第一个阶段只输出一个 Token，判断要不要拦截，被标记了，才进入第二个阶段做推理。按照 Anthropic 官方博客的数据，这种做法能将误报率从 8.5% 降到 0.4%。

这里有一个细节，分类器只看用户的消息和 Agent 的工具调用，不看工具返回的结果。因为网页和文件里可能藏着恶意指令，不把工具结果注入上下文能在很大程度上防止提示词注入攻击。被拦截的操作会作为工具结果返回给模型，让模型换一种更安全的做法；连续被拒绝 3 次，或者累计被拒绝 20 次，Agent 就停下来，交给用户处理。

![](https://cdn.paicoding.com/stutymore/agent-human-in-the-loop-auto-mode-20261009102726-94be2d3e.png)

恭喜看到这里的你，成功击败 70% 的学习者了。**继续问你，等用户确认的时候，Agent 怎么停下来？**

A，在 Agent Loop 里 sleep，等用户回复；B，保存状态后退出，用户回复以后再继续；C，让模型自己再问一遍。

说一下我的答案。审批可能要等几分钟，也可能要等到第二天，进程如果一直挂在那里等，一旦服务重启，任务就没了。

OpenAI Agents SDK 的做法是，给工具设置 needs_approval，模型调用这个工具时，运行就会暂停，结果里的 interruptions 会列出待审批的工具调用。调用 to_state 方法转成 RunState，再用 to_json 方法存进数据库。用户批准以后取出来，调用 approve 或者 reject，再交给 Runner 接着执行。

LangGraph 用的是 interrupt 函数，调用时把整张图的状态存进 checkpointer，也就是状态存档器，用户回复以后，用 Command 带上 resume 的值恢复执行。

这里有一个坑。LangGraph 恢复时，不是从 interrupt 那一行接着执行，而是把整个节点从头执行一遍。如果你在 interrupt 之前就扣了款，恢复以后就会再扣一次。所以 interrupt 之前的操作必须幂等，就算是重复执行也不会影响结果。

![](https://cdn.paicoding.com/stutymore/agent-human-in-the-loop-resume-20261009102915-d909fe9a.png)

恭喜看到这里的你，成功击败 90% 的学习者了。最后，面试官如果追问：“全自动的场景，没人审批，怎么办？”

告诉他，用边界代替审批。Pi 这个 Agent 默认不做权限审批，它的安全文档里写的很清楚，没必要一直盯着对话记录、审查改动，真正的安全来自限制 Agent 能访问的文件、凭证、进程和网络，推荐把 Pi 放进容器或者微型虚拟机里运行。确实需要审批，就装上 permission-gate 扩展，在 `rm -rf`、sudo 这类命令执行之前弹窗确认。

沙箱限定 Agent 只能在权限范围内做事情，白名单决定哪些操作不用咨询用户，事后审计把每一步操作记下来，出了问题能查清楚。

恭喜你升到王者段位了，成功击败 99% 的学习者。

最后简单总结下。撤不回的操作等人点头，撤得回的操作交给规则和沙箱。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

<!-- video-covers:start -->

## 视频封面

![竖版封面](https://cdn.paicoding.com/stutymore/agent-human-in-the-loop-cover-portrait-20261009103222-851fd7ea.png)

![宽屏横版封面](https://cdn.paicoding.com/stutymore/agent-human-in-the-loop-cover-wide-20261009103222-3f83b20f.png)

![标准横版封面](https://cdn.paicoding.com/stutymore/agent-human-in-the-loop-cover-standard-20261009103223-66f11dbd.png)

<!-- video-covers:end -->
