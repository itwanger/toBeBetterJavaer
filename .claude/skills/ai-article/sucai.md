标题：Codex 最新焚决发布，快！

昨天看到G哥关于 Codex 的最新焚诀，立马就在我本地体验了一波，效果确实显著。

所以今天就按照我的理解来给大家普及一波。

![](https://cdn.paicoding.com/stutymore/sucai-20260915140106.png)

操作其实很简单，分两步。

第一步，在 Codex 中输入以下提示词：

>按照篇焚诀：https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra 审查当前项目的 AGENTS.md 和 Skills，找出过宽的 Skill 触发、无关文档强制读取、重复检查、冲突规则，以及频繁要求确认的指令。逐条告诉我问题和最小修改建议，先不要改文件。

![](https://cdn.paicoding.com/stutymore/sucai-20260915143805.png)

这样会找到很多需要修正的 Skills 细节，以及 AGENTS.md 的优化方案。

![](https://cdn.paicoding.com/stutymore/sucai-20260915143854.png)

第二步，输入以下提示词。

>根据刚才的审查结果优化 AGENTS.md 和 Skills。缩小 Skill 触发范围，删除无关文档读取，合并重复检查，解决冲突规则，并减少低风险任务中的无意义确认。保留安全边界、敏感操作确认和必要测试。修改完成后列出具体改动

![](https://cdn.paicoding.com/stutymore/sucai-20260915144005.png)

