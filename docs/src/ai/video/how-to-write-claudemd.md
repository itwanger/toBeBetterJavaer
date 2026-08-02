# CLAUDE.md 到底要怎么写才有用？

上期讲了 Claude Code 的长期记忆，CLAUDE.md 是最核心的一环。那你到底会不会写 CLAUDE.md 呢？

会写和不会写，做出来的项目效果可以说是天差地别。

我翻了 Anthropic 的官方博客、arXiv 论文、并通过大量的工程实践，今天来帮你搞清楚这三件事：

- 什么样的规则才能真正生效？
- Anthropic 自己是怎么写 CLAUDE.md 的？
- 规则太多了怎么办？

![](https://cdn.paicoding.com/stutymore/how-to-write-claudemd-20260728173107.png)

哈喽大家好，我是二哥呀。今天用 3 分钟，给你讲清楚 CLAUDE.md 到底怎么写才有用。

系好安全带，我们粗粗粗出发了～

先说第一件事，什么样的规则才能真正生效。

很多人的 CLAUDE.md 可能只写了这些内容：“使用 Java 17”、“遵循分层架构”、“保持代码整洁”。

那我可要明确地告诉你，这样写等于没写。

为什么？

因为 Claude 看了 pom.xml 里的 java.version 就知道用 Java 17，看了目录结构就知道怎么分层。“保持代码整洁”更是一句废话，什么叫整洁？没有标准，Claude 执行不了，不知道怎么执行。

arXiv 上有一篇论文专门测了这件事：给模型同时塞 500 条指令，最强模型的准确率只有 68%。而且模型会偏向前面的指令，后面的更容易被忽略。

所以 CLAUDE.md 不是越多越好。

好的写法有三个特征。

![](https://cdn.paicoding.com/stutymore/how-to-write-claudemd-20260730100625.png)

第一，一句话写完。如果一条规则要三行才说得清，要么拆成三行，要么说明它太复杂了。

第二，Claude 靠自己推断不出来的写进去。能从 pom.xml、代码结构、配置文件推断出来的，别写，纯纯浪费 token。

第三，有明确的行动指导。“注意安全”是空话，“禁止提交 .env 和真实 API Key”才是规则。

给你看一个真实的例子。我的 PaiCLI 项目，CLAUDE.md 里是这么写的：

- 构建：mvn clean package，默认跳过测试
- 快速回归：mvn test -Pquick
- search_code 是 RAG 辅助，不是主要的代码定位方式，优先用 grep
- 改了命令入口 → 同步 Main.java + CliCommandParser + 测试 + 文档
- 禁止提交 .env、真实 API Key、target/ 产物

每一条，不说清楚 Claude Code 就一定会搞错。Claude Code 不可能猜到要用 mvn clean package，也不会默认跳过测试，也不可能知道改一个斜杠命令要同步四个地方。

那聪明的你肯定想到了：那到底该写哪些内容？

我翻了 Anthropic 自己的 claude-code-action 仓库，他们的 CLAUDE.md 分六个板块。

![](https://cdn.paicoding.com/stutymore/how-to-write-claudemd-20260730100635.png)

第一，构建、测试的具体命令，不让 Claude 去猜，直接明确告诉他。

第二，一句话说清楚项目是什么。

第三，运行机制，不是文档式的介绍，而是“改代码之前必须知道的事”。

第四，核心概念，3 到 5 个就够了。

第五，踩坑清单。比如“search_code 是 RAG 辅助，优先用 grep”。这些不说清楚 Claude Code 就很容易搞错。

第六，代码约定，只写和默认不一样的部分。

一句话总结：把 CLAUDE.md 当新员工入职须知来写。

那聪明的你肯定又要问了：按这个模板写，规则多了怎么办？

Anthropic 的建议是，CLAUDE.md 控制在 80 行以内，只放最核心的规则。其余按主题拆到 `.claude/rules/` 目录里，每个文件是一份独立的规则集。

![](https://cdn.paicoding.com/stutymore/how-to-write-claudemd-20260730100653.png)

更关键的是，rules 文件可以加 paths 字段，指定只在操作某些目录时才加载。比如前端规则只在碰到 tsx 文件时才生效，写后端 Java 代码的时候根本不会加载，上下文不浪费一个 token 的空间。

官方还有一句提醒：像维护代码一样维护 CLAUDE.md。定期 review，没用的删，没被遵守的强调下。

这个知识点你学废了吗？想解锁更多 AI 硬核知识，点赞关注，我是二哥，咱们下期见！

---

## 参考：CLAUDE.md 官方模板

以下模板参考 Anthropic 的 claude-code-action 仓库结构，结合工程实践整理，可以直接复制到你的项目里改：

```markdown
# CLAUDE.md

## Commands
- 构建：mvn clean package -DskipTests
- 测试：mvn test
- 单个测试：mvn test -Dtest=XxxTest
- 代码检查：mvn spotbugs:check
- 格式化：mvn spotless:apply

## What This Is
一句话说清楚项目是什么。
比如：PaiCLI 是一个纯 Java 实现的终端 Agent，不依赖 Spring AI/LangGraph4J。

## How It Runs
- 入口：Main.java → CliCommandParser 分发命令
- Agent 循环：AgentLoop.java，工具注册在 ToolRegistry
- 不要动 agent/core/ 下的接口定义，下游工具全部依赖它们

## Key Concepts
- Agent 循环：用户输入 → LLM 决策 → 工具执行 → 结果回填 → 下一轮
- 工具注册：所有工具实现 Tool 接口，在 ToolRegistry 统一注册
- 记忆系统：MemoryManager 基于文件持久化

## Things That Will Bite You
- search_code 是 RAG 辅助，不是主要的代码定位方式，优先用 grep
- 改了命令入口 → 必须同步 Main.java + CliCommandParser + 测试 + 文档
- FileUtils 的路径处理有沙箱限制，不要绕过它自己拼路径
- 测试里的 API Key 全部用 mock，禁止提交真实 Key

## Code Conventions
- 日志用 SLF4J，不用 System.out
- 异常不要吞掉，至少 log.warn
- 所有 public API 返回统一的 Result 包装类
- 新工具必须实现 Tool 接口并在 ToolRegistry 注册

## Don't
- 不要在业务代码里直接 new Thread，用 ExecutorService
- 不要改 .env.example 的格式，CI 依赖它
```

![](https://cdn.paicoding.com/stutymore/how-to-write-claudemd-20260728173811.png)

![](https://cdn.paicoding.com/stutymore/how-to-write-claudemd-20260728173819.png)

![](https://cdn.paicoding.com/stutymore/how-to-write-claudemd-20260728173826.png)
