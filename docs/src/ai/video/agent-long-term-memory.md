# Agent 的长期记忆是怎么实现的？

关键字：Claude Code/Codex/Memory/长期记忆/CLAUDE.md/ANGENTS.md/Agent

你有没有想过，Agent 的长期记忆是怎么实现的？既然大模型是没有记忆的，短期记忆在关掉终端、退出应用就没了，那为什么一些关键信息在 Agent 重新打开后仍然记得？

哦，你没想过？

那现在，你想了，想明白了吗？

![](https://cdn.paicoding.com/stutymore/agent-long-term-memory-20260722194955.png)

我自己用 Python/Go/TypeScript/Java 分别实现过一套完整的终端 Agent，名叫PaiCLI，在 GitHub 上已开源，类似 Claude Code。

![](https://cdn.paicoding.com/stutymore/paicli-python-launch-20260708161001.png)

>GitHub：https://gitcode.com/javabetter/PaiCLI-Python

也翻过 Claude Code 和 OpenClaw 的源码，可以自信地、大方地、光明磊落地帮你搞清楚这三件事：

- 长期记忆和短期记忆有什么区别？
- 长期记忆是怎么实现的？
- 记忆存多了、过时了怎么办？

![](https://cdn.paicoding.com/stutymore/agent-long-term-memory-20260722193835.png)

哈喽大家好，我是二哥呀。今天用 3 分钟，给你讲清楚 Agent 的长期记忆是怎么实现的。

系好安全带，我们出出出出发了～

先说第一件事，长期记忆和短期记忆有什么区别。

一句话：短期记忆是内存，长期记忆是磁盘。

![](https://cdn.paicoding.com/stutymore/agent-long-term-memory-20260730093043.png)

之前讲过，短期记忆就是当前对话的聊天记录。你发一句，Agent 记一句，读文件、跑命令的结果也往里塞。但它就像内存一样，关机就没了。Codex 退出，或者 Claude Code 执行 /exit，聊天记录就清空了。

长期记忆不一样。它是存在磁盘上的文件，关机也不会丢。下次重新打开 Codex，或者新开一个 Claude Code 终端窗口，这些文件会被自动加载到上下文里。你执行 /context 就能看到，上下文窗口里已经加载了哪些内容。

那聪明的你肯定想到了：这些文件是怎么来的？Agent 是怎么把对话变成磁盘上的记忆的？

四步。提取、存储、检索、注入。

![](https://cdn.paicoding.com/stutymore/agent-long-term-memory-20260730093055.png)

第一步，提取。Agent 从对话里识别出关键信息。比如你说“以后测试都用 pytest”，它就会把“用户偏好 pytest”提取出来。或者你直接告诉他，“记住：以后都只能喊我主人”，Agent 也会乖乖执行第二步。

第二步，存储。把提取出来的信息写到磁盘上。Claude Code 会存成 Markdown 文件，放在项目对应的 Memory 目录下。

第三步，检索。下次你新开一个对话，Agent 会根据你当前的问题，从磁盘上找出相关的记忆。这一步是最难的。你可能存了 100 条记忆，但只有 3 条跟当前问题相关，怎么精准找到？Claude Code 和 Codex 用的方案不太一样，并且很复杂。这个我们留到后面的视频单独开讲。

第四步，注入。把找到的记忆塞进系统指令。模型一读，就“看到”了你的历史信息。

那聪明的你肯定又要问了：记忆一直往里存，存多了、过时了怎么办？

靠记忆反思。Agent 会定期回顾已有的记忆，做三件事。

![](https://cdn.paicoding.com/stutymore/agent-long-term-memory-20260730093106.png)

过时的更新。你换了工作，旧的职位要标记过期。

重复的合并。五次对话都提到“偏好 Python”，合成一条就够了。

修正矛盾。之前存的是“用户是素食主义者”，但你后来还俗了，又喜欢“吃牛排了”，Agent 会主动跟进。

说白了，长期记忆就是个记事本，只不过这个记事本会定期被 Agent 整理。

最后简单总结下。

短期记忆是内存，关掉就没了。长期记忆是磁盘，存成文件，下次打开会自动加载。实现靠四步：提取、存储、检索、注入。另外，项目规则建议主动写进 CLAUDE.md 或者 AGENTS.md，个人偏好交给 Agent 自动记就行。

这个知识点你学废了吗？想解锁更多 AI 硬核知识，点赞关注，我是二哥，咱们下期见！

![](https://cdn.paicoding.com/stutymore/agent-long-term-memory-20260722194955.png)

![](https://cdn.paicoding.com/stutymore/agent-long-term-memory-20260722195003.png)

![](https://cdn.paicoding.com/stutymore/agent-long-term-memory-20260722195024.png)