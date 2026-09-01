面试官问你："Agent 挂了几十个 Skill，怎么保证命中率？"如果你回答"写个路由规则做分发"，恭喜你，又踩坑了。

为什么？

因为 Skill 的选择根本不走路由，走的是 LLM 语义匹配。命中不命中，全看 description 怎么写。

哈喽大家好，我是二哥呀。今天继续用 3 分钟，拆一道 Agent 高频面试题。

## Skill 和 Tool Call 的选择机制不同

先搞清楚一件事：Skill 和 Tool Call 不是一回事。

Tool Call 是 Function Calling 协议，LLM 根据 JSON Schema 选函数、填参数，走的是结构化匹配。

Skill 是什么？Skill 是一组打包好的能力，由一个 SKILL.md 文件定义，里面写着名称、描述、触发场景和执行流程。Agent 启动时，把所有 Skill 的 description 注入到 system prompt 里。用户说一句话，LLM 读所有 description，自己判断该不该触发、触发哪个。

换句话说，Skill 的选择机制是自然语言级别的语义匹配，不是 JSON Schema 级别的结构匹配。

## 提高 Skill 命中率的四招

搞清楚了机制，再来看怎么提高 Skill 的命中率。四招。

第一招，写好 description。这是命中率的根本。一个 Skill 的 description 如果写成"处理文章相关任务"，那完蛋了，用户说"帮我写篇文章"和"帮我改个标题"都会命中它。怎么改？写具体场景和触发关键词。比如标题生成的 Skill，description 就应该写"为文章生成候选标题。触发关键词：标题、起标题、想标题、爆款标题"。关键词列得越明确，LLM 匹配时越果断。

第二招，缩小 Skill 的职责范围。一个 Skill 只干一件事。别搞一个大而全的"写作助手"Skill，把写文章、起标题、排版、配图全塞进去。拆开来，写文章是一个 Skill，起标题是一个 Skill，各管各的。职责越单一，description 越好写，命中越准。

第三招，消除语义重叠。两个 Skill 的 description 如果在语义上有重叠，LLM 就会犹豫。比如"AI 文章撰写"和"技术文章撰写"，用户说"帮我写篇 AI 技术文章"，LLM 不知道该选哪个。解决办法：要么合并，要么在 description 里明确划定边界——"AI 文章撰写"加一句"专注 AI Coding 工具实测和大模型评测"，"技术文章撰写"加一句"专注 Java、数据库等传统技术栈"。让 LLM 有判断依据。

第四招，用 disable-model-invocation 兜底。有些 Skill 只在用户主动输入斜杠命令时才该触发，不应该被 LLM 自动匹配。这类 Skill 在 SKILL.md 里把 disable-model-invocation 设成 true，LLM 就不会自作主张去触发它。这一招专门用来治理 Skill 误触。

## 面试官追问：Skill 数量继续膨胀怎么办

面试官如果追问："Skill 数量继续膨胀怎么办？"

告诉他——短期靠 description 质量兜底，中期靠 Skill 分组，把 Skill 按业务领域归类，做两阶段匹配。但说到底，Skill 的命中率取决于 LLM 自身的语义理解能力。所以不要盲目堆 Skill 数量，够用就好，每加一个都要问自己：它的 description 能和现有 Skill 清晰区分吗？

## 一句话总结

最后一句口诀——描述一定要清晰，职责一定要单一。

这道题你学废了吗？想解锁更多 Agent 面试题的源码级拆解，点赞关注，我是二哥，下期见！
