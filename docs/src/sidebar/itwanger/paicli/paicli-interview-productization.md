---
title: AI Agent 面试题第六弹：TUI、LSP 诊断、Git 快照、Runtime API、图片输入 13 题
shortTitle: 面试题：产品化工程
description: 围绕 PaiCLI 实战，精选 13 道 Agent 产品化工程面试题，覆盖 TUI 终端渲染、LSP 诊断注入、Git Side-History、Runtime API 和图片输入。
tag:
  - Agent
  - 面试题
  - TUI
category:
  - AI
author: 沉默王二
date: 2026-05-11
---

大家好，我是二哥呀。

第六弹，聚焦**产品化工程**。一个 Agent 从"能用"到"好用"，中间隔着大量的工程细节——终端渲染、编辑后自动诊断、文件安全网、HTTP API、多模态输入。

这块对应 PaiCLI 的第 16-21 期，面试官通常不会考细节实现，而是考你有没有产品化的工程思维。

## 01、Agent CLI 的终端渲染有哪些方案？各自的优缺点？

三种主流方案：

**1. 纯 println（Plain）**：
- 最简单，直接标准输出
- 没有折叠、没有状态栏、没有颜色
- 任何终端都能用
- PaiCLI 的 `PlainRenderer`

**2. Inline 流式（Claude Code 风格）**：
- 主屏直出，不抢占终端
- 底部用 DECSTBM 做固定状态栏
- 工具调用可折叠（`Read 3 files (ctrl+o to expand)`）
- 行内 git diff 展示
- PaiCLI 的 `InlineRenderer`（默认）

**3. 全屏 TUI（Lanterna/Curses 风格）**：
- 独占整个终端窗口
- 可以做文件树、分栏布局、弹窗
- 用户体验最丰富但侵入性最强
- PaiCLI 的 `LanternaRenderer`

PaiCLI 最终选择 inline 作为默认——它在"信息密度"和"用户体验"之间取得了最好的平衡，不抢占终端又有状态栏和折叠能力。

## 02、DECSTBM 是什么？状态栏怎么实现的？

DECSTBM（DEC Set Top and Bottom Margins）是 VT100 终端的转义序列，用来设置终端的滚动区域。

原理：

```
ESC[1;{n}r    # 设置滚动区域为第 1 行到第 n 行
```

把终端底部留出 1-2 行不参与滚动，主内容在上面滚动，底部状态栏保持不动。

PaiCLI 用这个实现底部状态栏，显示：当前模型、token 用量、HITL 状态、MCP server 状态等。

注意事项：不是所有终端都支持 DECSTBM。不支持的终端（如某些旧版 Windows Terminal）设置 `PAICLI_NO_STATUSBAR=true` 禁用状态栏。

## 03、LSP 诊断注入是什么？对 Agent 有什么价值？

LSP（Language Server Protocol）是编辑器和语言服务之间的协议。LSP Server 能对代码做语法检查、类型检查，输出诊断信息（错误、警告）。

PaiCLI 的 LSP 诊断注入：

```
Agent 执行 write_file → 文件写入成功 → post-edit hook 触发
→ 对修改的文件做 LSP 诊断 → 收集错误/警告
→ 下一轮 LLM 请求前，把诊断结果作为合成 user message 注入
→ LLM 看到编译错误，自动修复
```

价值：**Agent 改完代码后，不等用户手动编译就能发现编译错误**。等价于 IDE 里的红色波浪线——代码一改，立刻告诉你哪里有问题。

当前 MVP 对 Java 用 JavaParser 做轻量语法诊断，不依赖本机安装完整的 JDT LS。

## 04、Git Side-History 快照是怎么工作的？为什么不用用户的 .git？

Agent 改文件是有风险的——改坏了需要回滚。PaiCLI 的解决方案是**独立的 side-git 仓库**，每次 turn 前后自动快照。

为什么不用用户的 `.git`：

1. **污染历史**：Agent 的自动快照不应该出现在用户的 git log 里
2. **冲突风险**：用户可能正在做 rebase、merge，Agent 的 commit 会干扰
3. **分支混乱**：快照不是有意义的 commit，混在正式分支里增加噪音

Side-Git 的实现：

- 在 `~/.paicli/snapshots/<project_hash>/<worktree_hash>/.git` 维护独立仓库
- 用 JGit（纯 Java Git 实现），不依赖本机 git 命令
- 每个 turn 开始前创建 `pre-turn` 快照（同步，确保基线已保存）
- turn 结束后异步创建 `post-turn` 快照
- `/restore <N>` 从 pre-turn 快照恢复文件到工作区

## 05、快照恢复会影响用户的 .git 吗？

不会。`/restore <N>` 只恢复文件内容到工作区，不修改用户的 `.git` 目录。

恢复流程：

1. 从 side-git 找到第 N 个 `pre-turn` 快照的 commit
2. 恢复前先创建一个 `pre-restore` 快照（防止恢复操作本身搞丢当前状态）
3. 把快照 commit 的文件内容写回工作区
4. 用户的 `.git` 完全不动——`git status` 会显示文件被修改，用户可以选择 commit 或 discard

关键设计：**恢复前的 pre-restore 快照**。万一用户恢复到错误的 turn，还能再恢复回来。安全网的安全网。

## 06、异步后台任务是怎么设计的？

PaiCLI 的后台任务让用户可以提交长时间运行的任务，不用守在终端前。

架构：

```
/task add "重构整个模块" → DurableTaskManager → SQLite 入队
                                                    ↓
                                              Worker Pool（默认 2 个 worker）
                                                    ↓
                                              Worker 启动独立 Agent 线程执行
                                                    ↓
                                              完成/失败/取消 → 更新 SQLite 状态
```

任务生命周期：`enqueued → running → completed / failed / canceled`

持久化特性：

- 任务状态存在 SQLite（`~/.paicli/tasks/tasks.db`），进程退出不丢失
- 进程重启后，残留的 `running` 任务自动恢复为 `enqueued` 重新执行
- `/task log <id>` 查看执行摘要

这个设计参考了消息队列的思路——SQLite 当 broker，Worker Pool 当 consumer，任务状态机保证 at-least-once 语义。

## 07、Runtime API 的设计目标是什么？为什么要 HTTP 接口？

Runtime API 让 PaiCLI 不只是一个交互式 CLI，还能被其他程序调用：

- **CI/CD**：在 pipeline 里调用 PaiCLI 做自动代码审查或测试生成
- **IDE 插件**：VS Code / JetBrains 插件通过 HTTP 调用 PaiCLI
- **Web 面板**：用 Web UI 替代终端交互

核心端点：

```
POST /v1/threads           # 创建对话线程
POST /v1/threads/{id}/turns  # 发起一轮交互
GET  /v1/threads/{id}/events # SSE 流式事件
```

安全设计：

- 只监听 `127.0.0.1`，不接受外部连接
- 必须配置 `PAICLI_RUNTIME_API_KEY`，每次请求校验
- 基于 JDK 内置 `HttpServer`，零额外依赖

## 08、图片输入对 Agent 有什么价值？实现上有什么挑战？

价值：

- **浏览器截图**：Agent 操作浏览器后，能"看到"页面渲染效果，而不是只读 DOM 文本
- **用户粘贴图片**：用户贴一张报错截图，Agent 直接看图定位问题
- **设计稿理解**：UI 开发时，Agent 看到设计稿就能写代码

实现挑战：

**1. 协议适配**：OpenAI 兼容协议的 `content` 字段要从 `string` 扩展为 `List<ContentPart>`，包含 text 和 image_base64 类型。纯文本时保持 string 格式（兼容），有图片时切换为 content array。

**2. 模型差异**：不是所有模型都支持图片输入。PaiCLI 的做法是公共接口不声明图片能力，统一上传，让 provider API 负责接收或报错。

**3. Token 成本**：图片按 tile 数计 token，一张截图可能消耗几千 token。PaiCLI 做了压缩/缩放预处理，降低成本。

**4. 历史膨胀**：旧截图反复进入上下文会迅速吃光 token。PaiCLI 在新一轮任务开始前省略历史 image payload，只保留文本元信息。

## 09、Renderer 接口抽象的设计思路是什么？

PaiCLI 有三种渲染形态（inline / lanterna / plain），但 Agent 核心逻辑不应该关心渲染。

`Renderer` 接口的抽象：

```java
interface Renderer {
    void showThinking(String thought);
    void showToolCall(String toolName, Map<String, Object> params);
    void showToolResult(String toolName, String result);
    void showResponse(String response);
    void showHitlPrompt(HitlRequest request);
    // ...
}
```

三个实现各自决定怎么展示：

- `InlineRenderer`：ANSI 颜色 + 折叠块 + 状态栏
- `LanternaRenderer`：全屏分栏 + 模态弹窗
- `PlainRenderer`：纯 println

Agent、PlanExecuteAgent、SubAgent 都通过 Renderer 接口输出，不直接 `System.out.println`。切换渲染形态只需要换一个 Renderer 实现，Agent 代码零改动。

## 10、LSP 诊断注入和 IDE 的红色波浪线有什么区别？

本质是一样的——都是 LSP Server 对代码做分析后输出诊断信息。但在 Agent 场景下有几个关键区别：

| 维度 | IDE 红色波浪线 | Agent LSP 诊断注入 |
|---|---|---|
| 消费者 | 人（看到波浪线，手动修复） | LLM（收到诊断文本，自动修复） |
| 触发时机 | 实时（每次按键） | post-edit hook（文件写入后） |
| 展示方式 | GUI 波浪线 + 悬浮提示 | 文本格式化后注入 LLM prompt |
| 交互 | 人决定是否修复 | LLM 自动在下一轮推理中修复 |

Agent 的 LSP 诊断注入本质上是把"人看波浪线 → 人修复"变成了"LLM 看诊断文本 → LLM 修复"，实现了**编辑-诊断-修复的自动闭环**。

## 11、Side-Git 快照的性能影响大吗？怎么优化？

快照需要遍历工作区所有文件、计算 hash、创建 git objects，对大型项目会有性能开销。

PaiCLI 的优化策略：

**1. 排除大文件目录**：默认排除 `.git/`、`node_modules/`、`target/`、`dist/`、`.idea/`、`*.class`、`*.jar`。通过 `PAICLI_SNAPSHOT_EXCLUDES` 可自定义。

**2. Pre-turn 同步，Post-turn 异步**：
- Pre-turn 快照必须同步（Agent 改文件前基线必须存好）
- Post-turn 快照异步执行（fire-and-forget），不阻塞下一轮用户输入

**3. 快照数量上限**：默认保留最近 50 个 turn 的快照，超出的自动清理。`/snapshot clean` 手动清理。

**4. JGit 纯 Java**：不 fork git 子进程，避免进程创建开销。JGit 的 object 写入在 Java heap 里完成。

实测在中型 Java 项目（5 万行代码）上，单次快照 200-500ms，对用户体验的影响可以忽略。

## 12、Runtime API 为什么选 SSE 而不是 WebSocket？

SSE（Server-Sent Events）和 WebSocket 的对比：

| 维度 | SSE | WebSocket |
|---|---|---|
| 方向 | 单向（服务端 → 客户端） | 双向 |
| 协议 | HTTP | 独立协议（ws://） |
| 重连 | 浏览器自动重连 | 需要手动实现 |
| 代理兼容 | 好（HTTP） | 差（需要代理支持 ws） |
| 实现复杂度 | 低 | 高 |

PaiCLI 选 SSE 的原因：

1. **Agent 交互是单向流式的**：用户提交一轮输入后，等 Agent 流式返回结果。不需要双向实时通信。
2. **HTTP 兼容性好**：SSE 就是普通 HTTP 长连接，所有 HTTP 客户端和代理都支持。
3. **和 OpenAI API 保持一致**：OpenAI 的 streaming response 也是 SSE，生态工具可复用。

如果未来需要双向通信（比如运行中取消、实时 HITL 审批），可以在 SSE 基础上加一个 POST 端点发送客户端事件，不需要引入 WebSocket。

## 13、从产品角度看，Agent CLI 的"好用"体现在哪些方面？

面试开放题。从 PaiCLI 的产品化实践总结：

**1. 可预测性**：用户能预期 Agent 会做什么。Plan-and-Execute 的计划确认、HITL 审批都是提升可预测性的手段。

**2. 可恢复性**：Agent 搞砸了能回滚。Git Side-History 快照就是这个目的。

**3. 可观测性**：用户能看到 Agent 在干什么。Token 用量、工具调用日志、审计记录、LSP 诊断。

**4. 低干扰**：不该打扰用户时不打扰。HITL 默认关闭、工具调用折叠、后台任务异步执行。

**5. 渐进式复杂度**：新用户用 ReAct 就够了，进阶用户解锁 Plan / Team / Skill / MCP。功能分层，不一上来就暴露所有复杂度。

**6. 容错性**：网络断了、MCP Server 挂了、LLM 超时了——每种故障都有优雅降级路径，不会直接崩溃。

## ending

这 13 道题覆盖了 Agent 产品化工程的主要方面：终端渲染、LSP 诊断、Git 快照、后台任务、Runtime API、图片输入、Renderer 抽象。

下一篇我们进入**多模型适配与成本**——Provider 抽象、运行时切换、成本估算。
