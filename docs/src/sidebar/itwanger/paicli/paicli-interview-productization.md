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

这是 AI Agent 面试题系列的第六弹。前五弹我们聊了 Agent 核心架构、记忆与上下文、工具与安全、MCP 协议、Prompt 与 Skill 系统。今天聊**产品化工程**。

一个 Agent 从“能跑起来”到“用户愿意天天用”，中间隔着的不是一两个算法突破，而是一大坨工程细节。终端渲染怎么做？代码改完了编译错了怎么办？文件改坏了怎么回滚？后台任务怎么不丢？外部系统怎么调你？图片怎么传进来？

这一弹对应 PaiCLI 的第 16-21 期，一共 13 道题。面试官在这个方向考的不是你能不能手写 ANSI 转义码，而是你有没有**产品化的工程思维**——知道用户会在哪里摔跤，提前把安全网铺好。

## 01、Agent CLI 的终端渲染有哪些方案？

终端渲染这件事，很多人觉得不就是 `System.out.println` 吗？还能玩出花来？

还真能。三种主流方案，各有各的取舍。

### 纯 println（Plain 方案）

最简单，最暴力。标准输出直接 print，没有颜色、没有折叠、没有状态栏。

好处是任何终端都能用——Windows cmd、SSH 远程、CI/CD 的日志流，全都没问题。坏处是信息密度低，工具调用的参数和结果全铺开，一轮 Agent 推理下来终端能刷几百行，找关键信息靠肉眼。

PaiCLI 的 `PlainRenderer` 就是这个方案，作为最底层的兜底实现。

### Inline 流式（Claude Code 风格）

这是 PaiCLI 的默认方案。主屏直接输出，不抢占终端。底部用 DECSTBM 做一个固定状态栏，显示当前模型、token 用量、HITL 状态。

最关键的是**工具调用可折叠**。Agent 读了 3 个文件，终端只显示一行 `Read 3 files (ctrl+o to expand)`，按 Ctrl+O 展开看具体内容。行内 git diff 也有——改了文件直接在终端里看红绿对比。

PaiCLI 的 `InlineRenderer` 实现了这套方案。代码在 `com.paicli.render.inline` 包下，核心是 `FoldableBlock` 做折叠、`BottomStatusBar` 做状态栏、`InlineDiffRenderer` 做行内 diff。

### 全屏 TUI（Lanterna/Curses 风格）

独占整个终端窗口。可以做文件树、分栏布局、弹窗。用户体验最丰富，但侵入性也最强——进了全屏 TUI，用户的 shell 就被接管了。

PaiCLI 的 `LanternaRenderer` 基于 Lanterna 库实现，有 CenterPane 做对话区、StatusPane 做状态栏、模态弹窗做 HITL 审批。

**PaiCLI 最终选 inline 作为默认**，原因很简单：它在“信息密度”和“用户体验”之间取得了最好的平衡。不抢占终端、有折叠和状态栏、和 Claude Code 的体验一致——用户不需要学新的交互范式。

【此处插入 截图目标：三种渲染器的终端效果对比，inline 的折叠块和状态栏 vs lanterna 的全屏分栏 vs plain 的纯文本输出；关键词：InlineRenderer、LanternaRenderer、PlainRenderer；建议位置：终端截图拼图】

## 02、DECSTBM 是什么？状态栏怎么实现的？

DECSTBM 这个词面试里大概率不会直接考，但如果你说到 inline 状态栏，面试官可能会追问底层原理。

### DECSTBM 的本质

DECSTBM（DEC Set Top and Bottom Margins）是 VT100 终端的转义序列，用来设置终端的**滚动区域**。

```
ESC[1;{n}r    # 设置滚动区域为第 1 行到第 n 行
```

这条转义序列告诉终端：只有第 1 行到第 n 行参与滚动，剩下的行保持不动。PaiCLI 把终端底部留出 2 行不参与滚动，主内容在上面正常滚，底部状态栏钉死不动。

### PaiCLI 的实现

`BottomStatusBar` 在 `com.paicli.render.inline` 包下，核心逻辑：

```java
public final class BottomStatusBar implements AutoCloseable {
    private static final long REDRAW_PERIOD_MS = 200L;
    private static final int RESERVED_BOTTOM_ROWS = 2;

    private final Terminal terminal;
    private final ScheduledExecutorService scheduler;
    private volatile StatusInfo current;
    // ...
}
```

启动时把可滚动区域限制在前 N-2 行，最后 2 行专门给状态栏。后台线程每 200ms 重绘一次。关闭时还原 scroll region。

状态栏显示什么？当前模型、token 用量、HITL 状态、MCP server 状态。一眼就能看到 Agent 跑到哪了、花了多少 token。

有个细节值得注意：**不是所有终端都支持 DECSTBM**。`InlineRenderer` 在构造时会检测终端能力：

```java
this.statusBar = TerminalCapabilities.supportsScrollRegion(terminal)
        ? new BottomStatusBar(terminal, out)
        : null;
```

不支持的终端（如某些旧版 Windows Terminal）设置 `PAICLI_NO_STATUSBAR=true` 可以手动禁用。优雅降级，不会崩。

【此处插入 截图目标：InlineRenderer 的底部状态栏效果，显示模型名称、token 用量和 HITL 状态；关键词：DECSTBM、BottomStatusBar、状态栏；建议位置：终端截图】

## 03、LSP 诊断注入是什么？对 Agent 有什么价值？

这个问题非常实际。Agent 改了代码，改出编译错误怎么办？

### 人类开发者怎么发现编译错误

打开 IDE，红色波浪线。一目了然。

### Agent 怎么发现编译错误

没有 IDE，没有波浪线。如果不主动做诊断，Agent 改完代码就算完了，编译错了也不知道。等用户自己发现再来找 Agent 修——体验差到爆。

PaiCLI 第 17 期做的 LSP 诊断注入就是解决这个问题的。

### 工作流程

```
Agent 执行 write_file → 文件写入成功 → post-edit hook 触发
→ LspManager 对修改的文件做语法诊断 → 收集错误/警告
→ LspDiagnosticFormatter 格式化为文本
→ 下一轮 LLM 请求前，把诊断结果作为合成 user message 注入
→ LLM 看到编译错误，自动修复
```

`LspManager` 的核心方法：

```java
public void runPostEditLspHook(String displayPath, Path editedFile) {
    if (!enabled()) return;
    if (editedFile == null) return;
    Path file = editedFile.toAbsolutePath().normalize();
    if (!isJavaFile(file)) {
        clearDiagnostics(file);
        return;
    }
    List<LspDiagnostic> diagnostics = diagnoseJava(displayPath, file);
    replaceDiagnostics(file, diagnostics);
}
```

当前 MVP 对 Java 用 JavaParser 做轻量语法诊断，不依赖本机安装完整的 JDT LS。

`LspDiagnosticFormatter` 负责把诊断结果格式化成 LLM 能理解的文本：

```java
prompt.append("[LSP 诊断注入]\n");
prompt.append("Agent 刚修改代码后，系统收集到以下诊断。"
    + "请优先修复 error，再处理 warning；不要原样重复同一处错误写法。\n\n");
```

这段 prompt 注入文本明确告诉 LLM 两件事：优先修 error，别重蹈覆辙。

价值就一句话：**Agent 改完代码后，不等用户手动编译就能发现编译错误，自动修复**。编辑-诊断-修复的闭环。

【此处插入 截图目标：Agent 改完代码后终端自动显示 LSP 诊断信息的效果；关键词：LspManager、LspDiagnosticFormatter、诊断注入；建议位置：终端截图】

## 04、Git Side-History 快照是怎么工作的？

Agent 改文件是有风险的——改坏了需要回滚。这不是“可能会发生”的事，是**一定会发生**的事。

### 为什么不用用户的 .git

很多人第一反应是：用户项目本来就有 git，每次 Agent 改完文件 git commit 一下不就行了？

不行，三个原因。

**污染历史**。Agent 的自动快照不应该出现在用户的 git log 里。用户的 commit history 是有意义的叙事，不是垃圾回收站。

**冲突风险**。用户可能正在做 rebase、merge，Agent 的 commit 会直接干扰 git 状态机。

**分支混乱**。快照不是有意义的 commit，混在正式分支里增加噪音。

### Side-Git 的实现

PaiCLI 第 18 期的解决方案是**独立的 side-git 仓库**。`SideGitManager` 在 `com.paicli.snapshot` 包下：

```java
public class SideGitManager {
    private static final PersonIdent SNAPSHOT_IDENT =
        new PersonIdent("PaiCLI Snapshot", "snapshot@paicli.local");

    private final Path projectRoot;
    private final SnapshotConfig config;
    private final Path gitDir;

    public SideGitManager(Path projectRoot, SnapshotConfig config) {
        this.projectRoot = normalizeProjectRoot(projectRoot);
        this.config = config;
        this.gitDir = this.config.snapshotsRoot()
                .resolve(hash(parentKey(this.projectRoot)))
                .resolve(hash(this.projectRoot.toString()))
                .resolve(".git");
    }
}
```

快照仓库独立存储在 `~/.paicli/snapshots/<project_hash>/<worktree_hash>/.git`，完全不碰用户的 `.git` 目录。

用 JGit（纯 Java Git 实现），不依赖本机 git 命令。每个 turn 开始前创建 `pre-turn` 快照（同步，确保基线已保存），turn 结束后异步创建 `post-turn` 快照。

```java
public synchronized TurnSnapshot preTurnSnapshot(String turnId, String summary)
        throws IOException, GitAPIException {
    return createSnapshot(SnapshotPhase.PRE_TURN, turnId, summary);
}

public synchronized TurnSnapshot postTurnSnapshot(String turnId, String summary)
        throws IOException, GitAPIException {
    return createSnapshot(SnapshotPhase.POST_TURN, turnId, summary);
}
```

`/restore <N>` 从 pre-turn 快照恢复文件到工作区。

【此处插入 截图目标：Side-Git 快照的存储结构示意图，展示 project_hash/worktree_hash/.git 的层级；关键词：SideGitManager、JGit、pre-turn、post-turn；建议位置：目录结构截图或白板图】

## 05、快照恢复会影响用户的 .git 吗？

不会。这是面试官最喜欢追问的安全性问题。

### 恢复流程

1. 从 side-git 找到第 N 个 `pre-turn` 快照的 commit
2. **恢复前先创建一个 `pre-restore` 快照**——防止恢复操作本身搞丢当前状态
3. 把快照 commit 的文件内容写回工作区
4. 用户的 `.git` 完全不动

```java
public synchronized TurnSnapshot preRestoreSnapshot(String turnId, String summary)
        throws IOException, GitAPIException {
    return createSnapshot(SnapshotPhase.PRE_RESTORE, turnId, summary);
}
```

恢复完之后，`git status` 会显示文件被修改。用户可以选择 commit 或 discard——主动权完全在用户手里。

### 安全网的安全网

关键设计：**pre-restore 快照**。

万一用户恢复到错误的 turn 怎么办？因为恢复前拍了 pre-restore 快照，可以再恢复回来。这是安全网的安全网。

听起来是个小细节，但产品化就是由无数这样的小细节堆出来的。少一层保护，用户就可能丢数据。

【此处插入 截图目标：/restore 命令执行的终端效果，显示恢复前的 pre-restore 快照创建提示；关键词：pre-restore、/restore、安全回滚；建议位置：终端截图】

## 06、异步后台任务是怎么设计的？

有些任务很重——“重构整个模块”、“给所有接口加单元测试”。这种任务跑起来十几分钟甚至更久，用户不可能守在终端前等着。

### 架构

PaiCLI 第 20 期做了后台任务系统。`DurableTaskManager` 在 `com.paicli.runtime.task` 包下：

```java
public class DurableTaskManager implements Closeable {
    private final Path dbPath;
    private final TaskRunner runner;
    private final int workerCount;
    private final Connection connection;
    private final Map<String, Thread> runningTasks = new ConcurrentHashMap<>();
}
```

整体架构：

```
/task add "重构整个模块" → DurableTaskManager → SQLite 入队
                                                    ↓
                                              Worker Pool（默认 2 个 worker）
                                                    ↓
                                              Worker 启动独立 Agent 线程执行
                                                    ↓
                                              完成/失败/取消 → 更新 SQLite 状态
```

### 任务生命周期

`enqueued → running → completed / failed / canceled`

### 为什么用 SQLite 做持久化

两个字：**不丢**。

任务状态存在 SQLite（`~/.paicli/tasks/tasks.db`），进程退出不丢失。进程重启后，残留的 `running` 任务自动恢复为 `enqueued` 重新执行：

```java
private void recoverRunningTasks() {
    // 进程重启时，把残留的 running 状态恢复为 enqueued
}
```

`/task log <id>` 查看执行摘要。

这个设计参考了消息队列的思路——SQLite 当 broker，Worker Pool 当 consumer，任务状态机保证 at-least-once 语义。面试的时候说出“at-least-once”这个词，面试官会知道你真的理解分布式任务调度。

【此处插入 截图目标：/task add 和 /task log 命令的终端交互效果；关键词：DurableTaskManager、SQLite、Worker Pool；建议位置：终端截图】

## 07、Runtime API 的设计目标是什么？

### 为什么要 HTTP 接口

PaiCLI 不只是一个交互式 CLI。如果只能在终端里一问一答，那它的价值天花板就是一个人的生产力。

加了 HTTP API 之后，PaiCLI 变成了一个**可编程的 Agent 引擎**：

- **CI/CD**：在 pipeline 里调用 PaiCLI 做自动代码审查或测试生成
- **IDE 插件**：VS Code / JetBrains 插件通过 HTTP 调用 PaiCLI
- **Web 面板**：用 Web UI 替代终端交互

### 核心端点

`RuntimeApiServer` 在 `com.paicli.runtime.api` 包下：

```java
public class RuntimeApiServer implements AutoCloseable {
    private final RuntimeThreadStore store;
    private final TaskRunner runner;
    private final String apiKey;
    private final HttpServer server;

    public RuntimeApiServer(RuntimeThreadStore store, TaskRunner runner,
                            int port, String apiKey) throws IOException {
        this.server = HttpServer.create(new InetSocketAddress("127.0.0.1", port), 0);
        this.server.createContext("/v1/threads", this::handleThreads);
    }
}
```

三个核心端点：

```
POST /v1/threads              # 创建对话线程
POST /v1/threads/{id}/turns   # 发起一轮交互
GET  /v1/threads/{id}/events  # SSE 流式事件
```

### 安全设计

三层保护。**只监听 127.0.0.1**，不接受外部连接。**必须配置 PAICLI_RUNTIME_API_KEY**，每次请求校验：

```java
if (!authorized(exchange)) {
    writeJson(exchange, 401, "{\"error\":\"unauthorized\"}");
    return;
}
```

**基于 JDK 内置 HttpServer**，零额外依赖——不引入 Netty、不引入 Spring，一个 `com.sun.net.httpserver.HttpServer` 就够了。

【此处插入 截图目标：Runtime API 的 curl 调用示例和 SSE 流式响应效果；关键词：RuntimeApiServer、/v1/threads、SSE；建议位置：终端截图】

## 08、图片输入对 Agent 有什么价值？

### 实现上有什么挑战

PaiCLI 第 21 期做了图片输入。先说价值，再说坑。

**价值**很直观。用户贴一张报错截图，Agent 直接看图定位问题。浏览器截图让 Agent 能“看到”页面渲染效果，而不是只读 DOM 文本。UI 开发时，Agent 看到设计稿就能写代码。

**挑战**才是面试重点。

### 协议适配

OpenAI 兼容协议的 `content` 字段要从 `string` 扩展为 `List<ContentPart>`，包含 text 和 image_base64 类型。纯文本时保持 string 格式（兼容），有图片时切换为 content array。

### 模型差异

不是所有模型都支持图片输入。PaiCLI 的做法是公共接口不声明图片能力，统一上传，让 provider API 负责接收或报错。

### Token 成本与压缩

图片按 tile 数计 token，一张截图可能消耗几千 token。`ImageProcessor` 在 `com.paicli.image` 包下做了压缩预处理：

```java
public final class ImageProcessor {
    public static final int IMAGE_MAX_WIDTH = 2000;
    public static final int IMAGE_MAX_HEIGHT = 2000;
    private static final float[] JPEG_QUALITIES =
        new float[]{0.85f, 0.70f, 0.55f, 0.40f, 0.25f};
}
```

先缩放到 2000x2000 以内，再逐级降低 JPEG 质量直到文件大小在 API 限制以内。

### 历史膨胀

旧截图反复进入上下文会迅速吃光 token。PaiCLI 在新一轮任务开始前省略历史 image payload，只保留文本元信息。这个策略和第 12 期的长上下文工程是同一个思路——**历史越旧，信息密度要越高**。

【此处插入 截图目标：用户粘贴图片后 Agent 识别并响应的终端效果；关键词：ImageProcessor、ClipboardImage、图片输入；建议位置：终端截图】

## 09、Renderer 接口抽象的设计思路是什么？

PaiCLI 有三种渲染形态（inline / lanterna / plain），但 Agent 核心逻辑不应该关心渲染。

这是一个经典的**策略模式**应用。

### Renderer 接口

`Renderer` 在 `com.paicli.render` 包下：

```java
public interface Renderer extends AutoCloseable {
    void start();
    default void beginTurn() {}
    void close();
    PrintStream stream();
    void appendToolCalls(List<LlmClient.ToolCall> toolCalls);
    void appendDiff(String filePath, String before, String after);
    void updateStatus(StatusInfo status);
    ApprovalResult promptApproval(ApprovalRequest request);
    int openPalette(String title, List<String> items);
}
```

接口设计的关键在于**每个方法对应一个交互语义**，而不是一个 UI 元素。`appendToolCalls` 表示“有一组工具调用需要展示”，至于怎么展示——折叠块、全屏分栏还是纯 println——实现类自己决定。

### 三个实现各自怎么做

`InlineRenderer`：ANSI 颜色 + `FoldableBlock` 折叠块 + `BottomStatusBar` 状态栏。工具调用用 `ToolCallRenderer.collapsedHeader` 生成折叠标题。

`LanternaRenderer`：全屏分栏 + CenterPane 对话区 + 模态弹窗做 HITL 审批。

`PlainRenderer`：纯 `println`，零依赖。

Agent、PlanExecuteAgent、SubAgent 都通过 `Renderer` 接口输出，不直接 `System.out.println`。切换渲染形态只需要换一个 Renderer 实现，Agent 代码零改动。

这就是接口抽象的价值——**Agent 代码不知道也不需要知道终端长什么样**。

【此处插入 截图目标：Renderer 接口及三个实现类的类图关系；关键词：Renderer、InlineRenderer、LanternaRenderer、PlainRenderer；建议位置：白板/类图】

## 10、LSP 诊断注入和 IDE 的红色波浪线有什么区别？

本质是一样的——都是对代码做分析后输出诊断信息。但消费者不同，整个链路就不同。

### 关键区别

| 维度 | IDE 红色波浪线 | Agent LSP 诊断注入 |
|---|---|---|
| 消费者 | 人（看到波浪线，手动修复） | LLM（收到诊断文本，自动修复） |
| 触发时机 | 实时（每次按键） | post-edit hook（文件写入后） |
| 展示方式 | GUI 波浪线 + 悬浮提示 | 文本格式化后注入 LLM prompt |
| 交互 | 人决定是否修复 | LLM 自动在下一轮推理中修复 |

### 本质

Agent 的 LSP 诊断注入是把“人看波浪线 → 人修复”变成了“LLM 看诊断文本 → LLM 修复”。实现了**编辑-诊断-修复的自动闭环**。

`LspDiagnosticFormatter` 的格式化策略也值得注意：

```java
String line = String.format("- [%s] %s:%d:%d %s (%s)",
    severityLabel(d.severity()), d.filePath(),
    d.line(), d.column(), d.message(), d.source());
```

格式化成 `[error] Foo.java:42:10 缺少分号 (javaparser)` 这种格式——行号、列号、错误等级一目了然。LLM 拿到这个文本，定位到具体行，直接修。

这里有个很关键的 prompt 细节：formatter 会在注入文本开头加一句“不要原样重复同一处错误写法”。为什么？因为 LLM 有时候会重蹈覆辙，把一样的错误代码再写一遍。加了这句提示之后，重复出错率明显下降。

【此处插入 截图目标：LSP 诊断注入后 LLM 自动修复编译错误的完整对话流程；关键词：LspDiagnosticFormatter、error、自动修复闭环；建议位置：终端截图】

## 11、Side-Git 快照的性能影响大吗？怎么优化？

快照需要遍历工作区所有文件、计算 hash、创建 git objects，对大型项目会有性能开销。这个问题面试官经常问——你做了快照，那性能呢？

### PaiCLI 的四个优化策略

**排除大文件目录**。默认排除 `.git/`、`node_modules/`、`target/`、`dist/`、`.idea/`、`*.class`、`*.jar`。通过 `PAICLI_SNAPSHOT_EXCLUDES` 可自定义。

**Pre-turn 同步，Post-turn 异步**。Pre-turn 快照必须同步——Agent 改文件前基线必须存好，这是底线。Post-turn 快照异步执行（fire-and-forget），不阻塞下一轮用户输入。

**快照数量上限**。默认保留最近 50 个 turn 的快照，超出的自动清理。`/snapshot clean` 手动清理。

**JGit 纯 Java**。不 fork git 子进程，避免进程创建开销。JGit 的 object 写入在 Java heap 里完成。

### 实测数据

中型 Java 项目（5 万行代码），单次快照 200-500ms。对用户体验的影响可以忽略——用户打一句话的时间比这长得多。

面试的时候，说“pre-turn 同步保底线、post-turn 异步不阻塞”这个设计决策，比说“我做了性能优化”有价值得多。面试官考的是你的**权衡思维**。

【此处插入 截图目标：快照性能测试数据或 /snapshot list 命令的输出效果；关键词：SideGitManager、JGit、性能、pre-turn 同步、post-turn 异步；建议位置：终端截图或性能数据表】

## 12、Runtime API 为什么选 SSE 而不是 WebSocket？

这是一个经典的技术选型题。

### SSE vs WebSocket 对比

| 维度 | SSE | WebSocket |
|---|---|---|
| 方向 | 单向（服务端 → 客户端） | 双向 |
| 协议 | HTTP | 独立协议（ws://） |
| 重连 | 浏览器自动重连 | 需要手动实现 |
| 代理兼容 | 好（HTTP） | 差（需要代理支持 ws） |
| 实现复杂度 | 低 | 高 |

### PaiCLI 选 SSE 的三个原因

**Agent 交互是单向流式的**。用户提交一轮输入后，等 Agent 流式返回结果。不需要双向实时通信。

**HTTP 兼容性好**。SSE 就是普通 HTTP 长连接，所有 HTTP 客户端和代理都支持。不需要担心企业内网防火墙拦 WebSocket。

**和 OpenAI API 保持一致**。OpenAI 的 streaming response 也是 SSE，生态工具可复用。用户已有的 OpenAI 客户端库直接对接。

### 如果未来需要双向通信呢

比如运行中取消、实时 HITL 审批。可以在 SSE 基础上加一个 POST 端点发送客户端事件，不需要引入 WebSocket。REST + SSE 的组合能覆盖绝大多数场景。

面试的时候别说“SSE 比 WebSocket 好”，要说“**在这个场景下 SSE 更合适**”。技术选型没有绝对的好坏，只有适不适合。

【此处插入 截图目标：SSE 流式事件的 curl 调用示例，展示 data: 格式的事件流；关键词：SSE、/v1/threads/events、流式；建议位置：终端截图】

## 13、从产品角度看，Agent CLI 的“好用”体现在哪些方面？

面试开放题。答好了加分，答不好也不扣分。但如果你能结合 PaiCLI 的实践把每一点都落地，面试官会觉得你真的做过产品化。

### 可预测性

用户能预期 Agent 会做什么。Plan-and-Execute 的计划确认、HITL 审批都是提升可预测性的手段。Agent 不是黑箱——它要改什么文件、跑什么命令，用户看得清清楚楚。

### 可恢复性

Agent 搞砸了能回滚。Git Side-History 快照就是这个目的。`/restore <N>` 一条命令回到改之前的状态。

### 可观测性

用户能看到 Agent 在干什么。Token 用量在状态栏实时更新、工具调用有折叠日志、操作审计记录到 JSONL、LSP 诊断有独立面板。

### 低干扰

不该打扰用户时不打扰。HITL 默认关闭、工具调用折叠不铺满屏幕、后台任务异步执行不阻塞终端。

### 渐进式复杂度

新用户用 ReAct 就够了，进阶用户解锁 Plan / Team / Skill / MCP。功能分层，不一上来就暴露所有复杂度。PaiCLI 的 slash 命令面板（`/` 触发）就是这个思路——常用的放前面，高级的折叠起来。

### 容错性

网络断了、MCP Server 挂了、LLM 超时了——每种故障都有优雅降级路径，不会直接崩溃。`InlineRenderer` 检测到终端不支持 DECSTBM 就降级到无状态栏模式，不会报错退出。

六个维度说完，面试官大概率会追问某一个展开。准备好案例就行。

【此处插入 截图目标：PaiCLI 完整运行界面，展示折叠块、状态栏、slash 命令面板等产品化特性；关键词：产品化、可预测性、可恢复性、渐进式复杂度；建议位置：终端截图全貌】

## ending

这 13 道题覆盖了 Agent 产品化工程的主要方面：TUI 渲染三方案、DECSTBM 状态栏、LSP 诊断注入闭环、Git Side-History 安全网、异步后台任务、Runtime API、图片输入、Renderer 接口抽象。

每一个都不是什么高深的算法问题，但每一个都是“能用”到“好用”之间的关键一步。面试官考的是你有没有这种产品化的工程直觉——用户会在哪里出问题，你提前做了什么。

下一篇进入第七弹：**多模型适配与成本**——Provider 抽象、运行时切换、成本估算、fallback 策略。

## 简历包装

**项目名称**：PaiCLI -- AI Agent 命令行工具

**项目简介**：基于 Java 17 的 AI Agent CLI 产品，对标 Claude Code，从 ReAct 循环演进到完整 Agent 产品形态，覆盖 TUI 终端渲染、LSP 诊断注入、Git 快照回滚、异步任务、Runtime API 和多模态输入。

**技术栈**：Java 17、JLine（终端交互）、Lanterna（全屏 TUI）、JGit（Git 操作）、JavaParser（语法诊断）、SQLite（任务持久化）、JDK HttpServer（Runtime API）、ANSI/VT100 转义序列

**核心职责**：

1. 设计并实现 Renderer 接口抽象（`Renderer.java`），统一 Inline 流式、Lanterna 全屏、Plain 三种终端渲染形态，Agent 核心逻辑与渲染完全解耦，新增渲染方案零侵入。Inline 模式基于 DECSTBM 实现底部常驻状态栏（`BottomStatusBar.java`），工具调用支持 Ctrl+O 折叠/展开（`FoldableBlock`）。
2. 实现 LSP 诊断注入（`LspManager.java` + `LspDiagnosticFormatter.java`），Agent 每次 write_file 后自动触发 JavaParser 语法诊断，诊断结果格式化为结构化文本注入下一轮 LLM 请求，构建编辑-诊断-修复自动闭环，编译错误自修复率显著提升。
3. 设计 Git Side-History 快照系统（`SideGitManager.java`），基于 JGit 维护独立 side-git 仓库，每轮 turn 前后自动快照，不污染用户 .git 历史。支持 `/restore <N>` 一键回滚，恢复前自动创建 pre-restore 安全快照，实现双层安全网。
4. 实现 Runtime API（`RuntimeApiServer.java`）和异步后台任务系统（`DurableTaskManager.java`），基于 JDK HttpServer + SSE 提供 `/v1/threads` RESTful 接口，支持 CI/CD 和 IDE 插件集成。任务状态持久化到 SQLite，进程重启自动恢复，保证 at-least-once 执行语义。
5. 实现图片复制粘贴输入（`ImageProcessor.java` + `ClipboardImage.java`），支持剪贴板图片和文件路径两种输入方式，自动缩放压缩（2000x2000 上限 + 逐级 JPEG 质量降级），历史 image payload 自动裁剪避免 token 膨胀。
