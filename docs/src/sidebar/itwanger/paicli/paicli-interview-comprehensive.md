---
title: AI Agent 面试题第八弹：综合设计题——架构选型、对比分析、场景设计 13 题
shortTitle: 面试题：综合设计题
description: 围绕 PaiCLI 实战，精选 13 道 AI Agent 综合设计面试题，覆盖架构选型、Claude Code 对比、从零设计 Agent、安全模型、可观测性和开源项目经验。
tag:
  - Agent
  - 面试题
  - 架构
category:
  - AI
author: 沉默王二
date: 2026-05-11
---

大家好，我是二哥呀。

最后一弹，综合设计题。这类题目面试官不是在考某个具体知识点，而是在考你的**系统设计能力、技术判断力和工程品味**。

回答这类题的关键是：**不要背答案，要展示思考过程**。面试官想看你怎么分析问题、怎么权衡取舍、怎么在约束条件下做出合理选择。

## 01、PaiCLI 和 Claude Code 在架构上有哪些相似和不同？

相似点：

1. **ReAct 核心循环**：都是 while 循环 + LLM 推理 + 工具调用 + 结果回灌
2. **MCP 生态**：都支持 MCP 协议接入外部工具
3. **HITL 审批**：都有危险操作确认机制
4. **Inline TUI**：都采用主屏直出 + 底部状态栏 + 工具调用折叠
5. **记忆系统**：Claude Code 有 CLAUDE.md，PaiCLI 有长期记忆

不同点：

| 维度 | Claude Code | PaiCLI |
|---|---|---|
| 语言 | TypeScript | Java |
| 模型 | Claude 系列 | GLM/DeepSeek/Kimi/StepFun |
| 定位 | Anthropic 官方产品 | 教学项目，从零构建 |
| Multi-Agent | 无（单 Agent） | 三角色协作 |
| Plan 模式 | 内置自动规划 | 用户显式 /plan 触发 |
| RAG | 无内置（靠工具搜索） | 内置向量检索 |
| Skill | 无明确概念 | 独立 Skill 系统 |
| Runtime API | 无 | HTTP/SSE API |

面试时重点说**不同点里你的设计选择和理由**，而不是罗列功能清单。

## 02、为什么选 Java 而不是 Python/TypeScript 来做 Agent CLI？

这是一道"技术选型"题，面试官想看你能不能跳出"哪个语言好"的争论，从实际约束出发分析。

PaiCLI 选 Java 的理由：

1. **教学目标**：面向 Java 开发者群体，用 Java 实现更容易理解和上手
2. **工程成熟度**：Java 的类型系统、IDE 支持、测试框架在大型项目中优势明显
3. **性能**：JVM 的并发处理能力优秀，ExecutorService、CompletableFuture 等并行工具开箱即用
4. **JGit**：纯 Java 的 Git 实现，Side-History 快照不依赖本机 git 命令
5. **JavaParser**：AST 分析代码关系图谱，Java 生态有成熟方案

Python/TypeScript 的优势（公正分析）：

- **Python**：AI/ML 生态最成熟，LangChain/LlamaIndex 等框架丰富
- **TypeScript**：Claude Code 自身就是 TS，MCP SDK 的 TypeScript 版本最完整

结论：没有绝对的对错，选型取决于**团队背景 + 项目目标 + 生态需求**。

## 03、如果从零设计一个 Agent 产品，你怎么规划迭代路径？

参考 PaiCLI 的 21 期演进：

**Phase 1：最小可用（1-2 周）**
- ReAct 循环 + 基础工具（读写文件、执行命令）
- 单模型接入
- 纯 println 输出

**Phase 2：核心能力（2-4 周）**
- Plan-and-Execute 模式
- Memory 系统（短期 + 长期）
- HITL 审批 + 安全策略
- 多模型适配

**Phase 3：生态集成（2-4 周）**
- MCP 协议（stdio + HTTP）
- 联网能力（搜索 + 抓取）
- 浏览器操控（Chrome DevTools MCP）

**Phase 4：产品化（2-4 周）**
- TUI 渲染
- LSP 诊断注入
- Git 快照与回滚
- 后台任务 + API

关键原则：

- **先跑通再优化**：Phase 1 的 400 行代码能跑，比一上来就设计完美架构重要
- **安全从第二步就加**：不要等到最后才补安全，改造成本极高
- **工具决定能力**：Agent 的能力边界 = 工具集。优先做用户最需要的工具

## 04、Agent 的可观测性怎么设计？

一个生产级 Agent 必须回答三个问题：**它在干什么？它花了多少钱？它出问题了怎么排查？**

PaiCLI 的可观测性体系：

**1. 运行时状态**
- 状态栏：当前模型、token 用量、HITL 状态、MCP server 状态
- `/context`：上下文模式、prompt cache、RAG topK、resources 状态

**2. 成本追踪**
- 每轮输出 token 用量和估算成本
- 区分普通 input / cached input / output

**3. 审计日志**
- `AuditLog`：危险工具调用的 JSONL 记录
- 含工具名、参数（脱敏）、结果、审批方式

**4. 调试日志**
- `~/.paicli/logs/paicli.log`：滚动日志
- LLM 的 `reasoning_content` 写入日志，不进对话历史
- 支持 DEBUG 级别调整

**5. 对话历史**
- `~/.paicli/history/session_*.jsonl`：完整对话记录
- 可重放、可分析

## 05、怎么处理 LLM 的幻觉（Hallucination）问题？

Agent 场景下幻觉的典型表现：

- LLM 编造不存在的文件路径
- LLM 编造不存在的 API 或函数名
- LLM 对工具返回的结果做错误解读

PaiCLI 的应对策略：

**1. 工具结果为准**：Agent 的推理基于工具返回的真实结果，而不是 LLM 的"记忆"。LLM 说"这个文件应该有 X 函数"，但 `read_file` 返回的内容里没有，Agent 会把真实内容喂给 LLM 纠正。

**2. RAG 提供真实数据**：检索注入真实代码段，减少 LLM 凭空想象的空间。

**3. LSP 诊断兜底**：LLM 编造了不存在的类名/方法名写进代码，LSP 诊断会报编译错误，下一轮 LLM 自动修复。

**4. Reviewer 角色**：Multi-Agent 模式下，Reviewer 对 Worker 的输出做质量审查，能发现部分幻觉问题。

**5. 用户确认**：HITL 让用户在关键操作前有机会检查 LLM 的输出是否合理。

核心思路是**不信任 LLM 的陈述，信任工具返回的事实**。

## 06、Agent 的错误恢复策略有哪些？

Agent 运行中可能遇到各种故障，恢复策略按严重程度分层：

**轻度故障（工具执行失败）**
- 把错误信息返回给 LLM，让它决定重试还是换方案
- 单个工具失败不影响其他并行工具
- 示例：`read_file` 文件不存在 → LLM 改路径或用 `list_dir` 找正确路径

**中度故障（MCP Server 挂了）**
- 该 Server 的工具暂时不可用，Agent 用其他工具替代
- `/mcp restart <name>` 手动重启
- 示例：chrome-devtools 挂了 → fallback 到 web_fetch

**重度故障（LLM API 超时/限流）**
- 流式响应中断 → 已收到的部分输出保留
- 限流 → 等待后重试（有退避策略）
- API 不可用 → 提示用户切换模型

**致命故障（Agent 改坏文件）**
- Git Side-History 快照 → `/restore <N>` 回滚
- `revert_turn` 工具 → Agent 自己也能触发回滚

## 07、手写 Agent 和用框架（LangChain/Spring AI）有什么区别？

| 维度 | 手写 | 框架 |
|---|---|---|
| 学习成本 | 理解原理，但开发慢 | 上手快，但黑盒多 |
| 灵活性 | 完全可控 | 受框架约束 |
| 调试 | 直观，断点就能查 | 框架抽象层多，调试困难 |
| 依赖 | 最小化 | 引入大量传递依赖 |
| 升级 | 自己维护 | 框架升级可能 breaking change |
| 适合场景 | 教学、定制化产品 | 快速原型、标准场景 |

PaiCLI 选择手写的理由：教学项目，需要学生看懂每一行代码。而且 PaiCLI 的 Roadmap 里专门规划了 Pro 版本——用 Spring AI / LangGraph4J 重写，让用户对比"手写 vs 框架"的差异。

面试回答建议：先说手写的好处（理解原理、完全可控），再说框架的好处（效率、生态），最后说自己会根据场景选择——"快速验证用框架，需要深度定制用手写"。

## 08、Agent 的测试策略是什么？怎么测一个 AI Agent？

Agent 的测试难点在于 **LLM 输出是非确定性的**——同样的输入，两次可能不一样。

PaiCLI 的测试分层：

**1. 单元测试（确定性）**
- 工具的输入输出逻辑
- PathGuard / CommandGuard 的规则匹配
- JSON-RPC 解析、SSE 增量合并
- Token 预算计算
- `mvn test -Pquick` 快速回归

**2. 集成测试（半确定性）**
- MCP Server 启动和工具注册
- HITL 审批流程
- 配置加载优先级

**3. 端到端测试（非确定性）**
- 完整的 ReAct 循环（需要 API Key）
- 浏览器 MCP 端到端（需要本机 Chrome）
- 通常不在 CI 里自动跑，手工验证

**4. Prompt 回归测试**
- 固定一组测试用例 + 预期行为
- 改 prompt 后跑一遍，人工比对输出

关键原则：**把能确定性测试的部分独立出来测**。Agent 循环是非确定性的，但循环里的每个组件（工具执行、安全检查、消息格式化）都是确定性的。

## 09、如何向面试官介绍你的 Agent 项目？（1 分钟版本）

"我从零开始用 Java 实现了一个 AI Agent CLI，对标 Claude Code。项目分 21 期迭代：

- 核心是 ReAct 循环 + Function Calling，支持 Plan-and-Execute 和 Multi-Agent 两种高级模式
- 接入了 GLM、DeepSeek、Kimi、StepFun 四个模型，运行时可切换
- 实现了 MCP 协议，能通过 stdio 和 HTTP 接入外部工具，内置 Chrome DevTools 浏览器操控
- 安全层有 HITL 审批、路径围栏、命令黑名单、操作审计
- 记忆系统支持短期/长期/RAG 三层，长上下文模式适配 200k-1M 窗口
- 产品化方面做了 inline TUI、LSP 诊断注入、Git 快照回滚、后台任务和 HTTP API

整个项目从第一期的 400 行代码演进到现在的完整产品，最大的收获是理解了 Agent 从原理到产品的全链路。"

## 10、你在做 PaiCLI 的过程中踩过哪些坑？

面试官爱问"踩坑"——这比成功经验更能体现真实能力。

**坑 1：Tool 描述太模糊导致 LLM 乱选工具**
- 早期 `execute_command` 的描述写得泛，LLM 经常用它代替 `read_file`（`cat` 替代 `read_file`）
- 解决：描述里明确写"不要用 execute_command 读文件"

**坑 2：SSE 增量 tool_calls 解析**
- 流式响应的 tool_calls 是增量的（每个 chunk 只有一部分），一开始以为每个 chunk 是完整的 JSON
- 解决：加了增量合并逻辑，按 index 累积 name 和 arguments

**坑 3：MCP Server 启动超时**
- chrome-devtools 首次启动要 npx 拉包，30 秒超时不够
- 解决：超时提升到 60 秒 + 进度提示

**坑 4：符号链接绕过路径校验**
- 项目内创建指向 `/etc/` 的 symlink，`getCanonicalPath` 不够可靠
- 解决：改用 `Files.toRealPath()`

## 11、如果要把 PaiCLI 部署到生产环境，还需要做什么？

从教学项目到生产级产品的 Gap：

**1. 沙箱隔离**：生产环境的 Agent 不能直接操作宿主文件系统。需要 Docker / microVM 隔离，Agent 在容器内执行，通过 volume mount 限制可访问目录。

**2. 多租户**：当前 PaiCLI 是单用户的。生产环境需要用户隔离——每个用户的对话历史、记忆、配置互不干扰。

**3. 限流和配额**：按用户限制 LLM 调用次数 / token 消耗，防止恶意使用。

**4. 监控告警**：Prometheus + Grafana 监控 Agent 延迟、错误率、token 消耗。异常时告警。

**5. 日志聚合**：集中式日志（ELK / Loki），方便跨节点排查问题。

**6. 认证鉴权**：Runtime API 从 API Key 升级到 OAuth / JWT。

**7. 模型网关**：统一的 LLM 调用网关，做负载均衡、fallback、成本控制。

## 12、Agent 领域你觉得下一个大方向是什么？

这是开放讨论题，展示你对行业趋势的理解。

几个可能的方向：

**1. Computer Use / GUI Agent**：Agent 不只操作 API 和命令行，而是能像人一样操作 GUI——点击按钮、填表单、拖拽文件。Anthropic 的 Computer Use、Google 的 Project Mariner 都在做。

**2. 多 Agent 协作标准化**：当前 Multi-Agent 各家实现不同。Google 的 A2A（Agent-to-Agent）协议在尝试标准化 Agent 间通信。

**3. Agent 安全与对齐**：随着 Agent 能力增强，安全问题越来越重要。如何防止 Agent 被 prompt 注入利用、如何保证 Agent 在长时间自主运行时不偏离目标。

**4. 端到端评估**：如何系统化评估 Agent 的能力——不是评估 LLM 的文本生成质量，而是评估 Agent 完成复杂任务的成功率。SWE-bench、GAIA 等 benchmark 在做这件事。

**5. 低成本推理**：Agent 的 token 消耗远超普通对话。推理成本降低（更高效的 KV Cache、推测解码、小模型 + 大模型混合路由）直接影响 Agent 的可行性。

## 13、你觉得 AI Agent 会取代程序员吗？

面试官偶尔会问这种开放问题，考察你的思考深度。

我的观点：**不会取代，但会重新定义"程序员"的工作内容。**

Agent 擅长的：
- 模板化工作（CRUD、配置修改、测试用例生成）
- 搜索和检索（找 API、查文档、读代码）
- 重复性重构（批量重命名、格式化、迁移）

Agent 不擅长的：
- 理解模糊需求（客户说"做个像抖音一样的"，Agent 不知道该怎么开始）
- 架构决策（微服务还是单体、SQL 还是 NoSQL，需要理解业务上下文）
- 创造性设计（产品体验、用户交互、技术创新）

未来的程序员更像是"Agent 的指挥者"——定义目标、审核输出、处理 Agent 搞不定的复杂决策。日常编码的体力活交给 Agent，人类专注在更高层次的思考上。

用 PaiCLI 的话来说：**你是用户，Agent 是执行者。HITL 不会消失，因为最终的决策权必须在人手里。**

## ending

8 篇面试题系列完结。从 Agent 核心架构到综合设计题，100 道题覆盖了 AI Agent 开发的完整知识体系。

这 100 道题的答案不是用来背的——理解背后的设计思路和工程权衡，比记住具体实现细节更重要。面试官真正想考的不是"你知不知道 ReAct"，而是"你能不能在实际项目中做出合理的技术决策"。

源码已经开源在 GitHub 上，结合教程和源码一起看效果最好。
