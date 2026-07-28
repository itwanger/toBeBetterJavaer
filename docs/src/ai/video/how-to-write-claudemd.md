上期讲了 Claude Code 的长期记忆，CLAUDE.md 是最核心的一层。但你有没有想过，写"保持代码整洁"和写"日志用 SLF4J，不用 System.out"，效果差了十万八千里？

Anthropic 官方说过一句话：CLAUDE.md 太长，Claude 会忽略一半，因为重要规则被噪音淹没了。arXiv 上有篇论文专门测了，500 条指令下，最强模型的准确率只有 68%。

我翻了 Anthropic 的官方博客、这篇 arXiv 论文、还有他们自己项目的 CLAUDE.md，今天帮你搞清楚三件事：

- 什么样的规则才能真正生效？
- Anthropic 自己是怎么写 CLAUDE.md 的？
- 规则太多了怎么办？

【截图：CLAUDE.md 写法架构图；风格：whiteboard；截图目标：展示三层结构——好规则三特征（一句话、推断不出来、能执行）、Anthropic 六板块模板（Commands/What This Is/How It Runs/Key Concepts/Things That Will Bite You/Code Conventions）、rules 目录拆分策略（核心 80 行 + 按场景拆分 + paths 精准投放）；关键词：好规则三特征、六板块、rules 目录、80 行】

哈喽大家好，我是二哥呀。今天用 3 分钟，给你讲清楚 CLAUDE.md 到底怎么写才有用。

系好安全带，我们粗粗粗出发了～

先说第一件事，什么样的规则才能真正生效。

很多人的 CLAUDE.md 长这样："使用 Java 17""遵循分层架构""保持代码整洁"。

这三条，等于没写。

为什么？因为 Claude 看了 pom.xml 里的 java.version 就知道用 Java 17，看了目录结构就知道怎么分层。"保持代码整洁"更是一句废话，什么叫整洁？没有标准，Claude 执行不了。

好规则有三个特征。

第一，一句话能写完。如果一条规则要三行才说得清，要么拆成三条，要么说明它太复杂了，应该放到代码注释里。

第二，Claude 靠自己推断不出来。能从 pom.xml、代码结构、配置文件推断出来的，别写，浪费指令预算。

第三，有明确的行动指导。"注意安全"是空话，"禁止提交 .env 和真实 API Key"才是规则。

那聪明的你肯定想到了：那到底该写哪些内容？

我翻了 Anthropic 自己的 claude-code-action 仓库，他们的 CLAUDE.md 分六个板块。

第一，Commands。构建、测试、lint 的具体命令，Claude 不猜，直接用。

第二，What This Is。一句话说清楚项目是什么。

第三，How It Runs。运行机制，不是文档式的介绍，而是"改代码之前必须知道的事"。

第四，Key Concepts。核心概念，3 到 5 个就够了。

第五，Things That Will Bite You。踩坑清单。比如"search_code 是 RAG 辅助，优先用 grep""改了命令入口要同步四个文件"。这些不说清楚就一定会搞错。

第六，Code Conventions。代码约定，只写和默认不一样的部分。

一句话总结：把 CLAUDE.md 当新员工入职须知来写。

那聪明的你肯定又要问了：按这个模板写，规则多了怎么办？

Anthropic 的建议是，CLAUDE.md 控制在 80 行以内，只放最核心的规则。其余按主题拆到 `.claude/rules/` 目录里，每个文件是一份独立的规则集。

更关键的是，rules 文件可以加 paths 字段，指定只在操作某些目录时才加载。比如前端规则只在碰到 tsx 文件时才生效，写后端 Java 代码的时候根本不会加载，不浪费一个 token 的上下文空间。

官方还有一句话：像维护代码一样维护 CLAUDE.md。定期 review，没用的删，没被遵守的加强调。

最后简单总结下。

好规则：一句话、推断不出来、能执行。参考 Anthropic 的六板块模板来写。另外，核心规则放 CLAUDE.md，控制在 80 行，其余按场景拆到 rules 目录，用 paths 精准投放。

这个知识点你学废了吗？想解锁更多 AI 硬核知识，点赞关注，我是二哥，咱们下期见！
