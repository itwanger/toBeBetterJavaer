# PaiCLI 找 Bug / 修 Bug / 验证修复 源码依据

> 调研日期：2026-09-02
> 源码路径：/Users/itwanger/Documents/GitHub/paicli
> 前置知识库：paicli-architecture.md（2026-07-27），本文只补充它没写的内容
> 引用路径省略前缀 `src/main/java/com/paicli/`，资源文件省略 `src/main/resources/`

---

## 一、2026-07-27 以来的改动

`git log --since="2026-07-27" --oneline | wc -l` 结果为 2 条提交，另有 31 个文件的未提交改动（+2795 行）。

- e8d8a16（08-25）"Add harness workflow and tighten agent controls"：新增 `eval/LlmJudge.java`、`eval/PositionBalancedPairwiseJudge.java`、`docs/llm-as-a-judge.md`、`tool/TurnToolPolicy.java`（984 行，URL 来源约束）、`tool/ToolOutput.java` 改成带 successful 字段的类型化结果、`agent/AgentBudget.java` 默认不限轮数、`history/ConversationLedger.java` 只追加账本。
- c086e4d（08-31）"Add Hunyuan provider, dual-path compaction, and benchmark infra"：新增 `eval/benchmark/` 评测包（SuiteDefinition、CaseDefinition、ScoreAggregator 等）、`benchmarks/paicli-native-agentbench-v0.1/` 设计文档与 28 题蓝图、ToolRegistry 增加 `sanitizeCommandEnvironment`。
- 未提交工作区：`execute_command` 改为返回类型化的 `ToolOutput`（exit code 非 0 判失败）、新增 `tool/CommandSandbox.java`（macOS sandbox-exec 子进程隔离，仅 benchmark 启用）、benchmark 的 verifier / docker / relay 子包。

与本文相关的核心事实：审批策略、命令黑名单、Side-Git 快照这三块在 07-27 之前就有，这段时间没动；新增的是类型化失败结果、Judge、benchmark 验证器。

---

## 二、定位 Bug 用的工具（常量与截断）

所有常量在 `tool/ToolRegistry.java` 第 61 到 70 行：

```java
private static final int DEFAULT_COMMAND_TIMEOUT_SECONDS = 60;
private static final int DEFAULT_TOOL_BATCH_TIMEOUT_SECONDS = 90;
private static final int MAX_PARALLEL_TOOLS = 4;
private static final int MAX_COMMAND_OUTPUT_CHARS = 8_000;
private static final int MAX_READ_FILE_LINES = 2_000;
private static final int MAX_GREP_RESULTS = 200;
private static final int MAX_GREP_CONTEXT_LINES = 5;
private static final int DEFAULT_GREP_MAX_CHARS = 24_000;
private static final int MAX_GREP_MAX_CHARS = 60_000;
private static final int DEFAULT_GREP_HEAD_LIMIT = 20;
```

### grep_code：优先 ripgrep，不可用时退回 Java 实现

`tool/RipgrepCodeSearchEngine.java` 第 34 到 36 行：系统属性 `paicli.search.disable.rg` 为 true 或本机没有 `rg` 时，走 `fallback(request)`，即 `tool/JavaCodeSearchEngine.java`（自己遍历文件做匹配，单文件超过 2MB 或疑似二进制跳过，第 20 行 `MAX_SEARCH_FILE_BYTES = 2 * 1024 * 1024`）。

rg 命令行（第 138 到 168 行）：`rg --json --line-number --max-filesize 2M`，非正则时加 `--fixed-strings`；子进程超时 8 秒（第 25 行），超时返回 partial 结果并说明原因。截断有两层。第一层按条数：`max_results` 默认 50、上限 200，达到上限时 `partial=true`，原因写"已达到 max_results=N"（第 63 到 66 行）。第二层按字符：`ToolRegistry.grepCode` 第 496 到 520 行，输出超过 `max_chars`（默认 24000，上限 60000）时停止拼接，并追加提示：

```java
if (truncatedByChars) {
    sb.append("\npartial: true（已达到 max_chars=").append(maxChars)
      .append("，请缩小 path/glob/pattern 或提高 offset 后 read_file）");
}
appendSuggestedReads(sb, ...);   // 最多 3 个文件，给出 read_file offset 建议
```

`suggested_reads` 会直接生成下一步的 `read_file {"path":..., "offset": 命中行-20, "limit": ...}` 调用建议，把"搜索"和"读上下文"串成一条链。

### read_file：整读或分页读，上限 2000 行

`ToolRegistry.readFileForTool` 第 384 到 414 行：不带 `offset`/`limit` 时整文件读入；带参数时按行分页，`limit` 默认 200、上限 2000，超出部分追加"...(已截断，可用 offset=N 继续读取)"。每行带行号前缀（`%5d | `），方便模型引用行号。

### execute_command：60 秒超时、8000 字符截断、exit code 回传

`ToolRegistry.executeCommandOutput` 第 1429 到 1500 行（未提交工作区版本）：

```java
pb.redirectErrorStream(true);              // stderr 合并进 stdout
boolean finished = process.waitFor(commandTimeoutSeconds, TimeUnit.SECONDS);
if (!finished) {
    process.destroyForcibly();
    return ToolOutput.failure("命令执行超时（" + commandTimeoutSeconds + "秒），已强制终止");
}
String output = getCommandOutput(outputFuture);
int exitCode = process.exitValue();
String result = String.format("命令执行完成 (exit code: %d)\n%s", exitCode, output);
return exitCode == 0 ? ToolOutput.text(result) : ToolOutput.failure(result);
```

输出读取在 `readProcessOutput`（第 1523 到 1545 行）：逐行累积到 8000 字符即停，尾部追加"...(输出已截断)"。注意：截断保留的是头部，测试框架把失败摘要放在末尾时可能被截掉，模型需要自己用 `| tail` 之类的方式收窄。

执行前先过 `policy/CommandGuard.check`，被拒绝时抛 `PolicyException`，外层统一写审计并返回"🛡️ 策略拒绝: 原因"。

### 没有 edit 工具

`ToolRegistry` 注册的内置工具共 16 个（比 07-27 知识库多了 browser_connect、browser_disconnect、browser_status、load_skill）。没有 `edit_file`/`apply_patch` 这类局部替换工具，修 Bug 只能 `write_file` 整文件覆盖（单文件 5MB 上限，第 79 行）。

---

## 三、修复后的验证

### 系统提示词：只要求"基于真实工具结果"，没有"改完必须跑测试"

在 `prompts/` 下 grep test/verify/验证，结果只有这几处：

- `prompts/modes/agent.md` 第 5 行："代码修改、文件读取、命令验证必须基于真实工具结果。"
- `prompts/handoff.md` 第 3 行："最终回复要聚焦用户目标：说明完成了什么、验证了什么、还有哪些明确边界。不要虚构未执行的命令或未看到的文件。"
- `prompts/modes/planner.md` 第 11 行：任务类型枚举里有 `VERIFICATION: 验证结果是否正确`。

结论：没有"write_file 之后必须 execute_command 跑测试"的硬性指令。验证是否发生取决于模型自觉，或者 Plan 模式下规划器是否生成了 VERIFICATION 类型任务。而 `agent/PlanExecuteAgent.java` 第 1077 行对 VERIFICATION 任务的提示是"请基于以上上下文直接给出结果"，也就是允许不调工具、纯靠上下文判断，这条在面试里可以当作反例讲。

### 唯一自动的验证信号：write_file 之后的 Java 语法诊断

`ToolRegistry` 第 318 行 write_file 成功后调用 `runPostEditLspHook(path, safe)`。`lsp/LspManager.java` 第 38 到 61 行：只处理 `.java` 文件，用 JavaParser 做语法解析（第 84 到 90 行 `javaParser.parse(file)` 收集 `Problem`），不是真正的 LSP 服务器，不做类型检查和编译。诊断结果暂存，下一轮 LLM 调用前由 `agent/Agent.java` 第 491 到 501 行 `injectPendingLspDiagnostics()` 以 user 消息注入，格式（`lsp/LspDiagnosticFormatter.java` 第 30 行）：`- [error] 路径:行:列 信息`。

### exit code 非 0 怎么回传

`ToolRegistry.ToolExecutionResult`（第 1565 到 1600 行）带 `successful` 字段，来源是 `ToolOutput.successful()`；超时一律 `successful=false`。但回传给模型的只有文本：`agent/Agent.java` 第 265 到 268 行 `LlmClient.Message.tool(toolResult.id(), toolResult.result())`，模型看到的是"命令执行完成 (exit code: 1)\n<合并后的 stdout+stderr>"。`successful` 标志目前只被 `TurnToolPolicy` 第 472 行（判断 web_search 结果可信度）和 benchmark 记录使用，没有触发"失败自动重试"之类的逻辑。旧工具的成败靠 `looksLikeFailureText`（第 1271 到 1290 行）按前缀猜：`🛡️`、`❌`、`[HITL]`、`工具执行失败` 等。

### 循环终止：默认不限轮数，靠停滞检测兜底

`agent/AgentBudget.java` 第 78 到 88 行：token 预算和硬轮数上限默认都是 `Integer.MAX_VALUE`，只有 `-Dpaicli.react.hard.max.iterations=N` 才生效。停滞检测（第 109 到 125 行）：最近 3 轮"工具名 + 参数"签名完全相同即判停滞，退出并做一次收尾回复。这对"改了没用又原样重跑同一条测试命令"的死循环有效，对"每次改一点再跑"的循环无效。

---

## 四、回滚机制：Side-Git 快照

### 粒度：每个顶层 turn 前后各一个 commit，存在项目外的独立 git 仓库

`snapshot/SnapshotService.runTurn`（第 28 到 37 行）：turn 开始前同步做 `preTurnSnapshot`，结束后异步做 `postTurnSnapshot`（单线程 executor）。

`snapshot/SideGitManager.java` 第 41 到 48 行：gitDir 在 `~/.paicli/snapshots/<父目录哈希>/<项目路径哈希>/.git`，用 JGit 把项目目录设为 work tree，不碰项目自己的 `.git`：

```java
Repository repository = new FileRepositoryBuilder()
        .setGitDir(gitDir.toFile())
        .setWorkTree(projectRoot.toFile())
        .build();
```

快照就是 `git add . && git add -u && git commit --allow-empty`（第 62 到 80 行），commit message 形如 `pre-turn react-1725000000000\n\nmode=react\ninput=...`。排除列表（`snapshot/SnapshotConfig.java` 第 16 到 25 行）：`.git`、`.paicli/snapshots`、`target`、`node_modules`、`dist`、`.idea`、`*.class`、`*.jar`。默认最多保留 50 个快照，环境变量 `PAICLI_SNAPSHOT_ENABLED=false` 可关闭。

### 能回滚到哪一步

`revert_turn` 工具（`ToolRegistry` 第 766 到 780 行）参数 `offset`，1 表示最近一次 turn 开始前。实现 `SideGitManager.restorePreTurn`（第 103 到 124 行）：只从 PRE_TURN 快照列表里取第 offset 个，恢复前先打一个 PRE_RESTORE 快照，然后不用 checkout，而是逐文件把目标树的内容写回工作区，并删除目标树里没有的已跟踪文件：

```java
TurnSnapshot current = preRestoreSnapshot("restore-" + Instant.now().toEpochMilli(), ...);
Map<String, ObjectId> targetTree = treeEntries(repository, target.commitId());
List<String> removed = deleteTrackedFilesMissingFromTarget(currentTree, targetTree);
List<String> restored = writeTargetTree(repository, targetTree);
```

所以粒度是"整个 turn"，不能回滚到某一次 write_file。用户侧命令是 `/snapshot`、`/snapshot status`、`/snapshot clean`、`/restore N`（`cli/Main.java` 第 1697 到 1699 行、第 2515 到 2523 行）。

---

## 五、人机审批（HITL）

### 需要审批的工具

`hitl/ApprovalPolicy.java` 第 18 到 23 行：

```java
private static final Set<String> DANGEROUS_TOOLS = Set.of(
        "write_file", "execute_command", "create_project", "revert_turn");
public static boolean requiresApproval(String toolName) {
    return DANGEROUS_TOOLS.contains(toolName) || isMcpTool(toolName);   // mcp__ 前缀
}
```

危险等级：execute_command 和 revert_turn 标"高危"，write_file 和 create_project 标"中危"，MCP 工具全部需要审批。读类工具（read_file、grep_code、glob_files、list_dir、search_code）不审批。

### 审批模式

`prompt/PromptAssembler.java` 第 56 到 61 行：`approvalMode` 取值 `auto`、`suggest`、`never`，默认 `suggest`，其他值一律归为 suggest。三个文件 `prompts/approvals/{auto,suggest,never}.md` 只是提示词层面的语气差异，例如 never.md："当前审批策略偏保守。涉及写文件、执行命令、恢复快照或外部 MCP 工具时，优先选择可解释、可回滚、范围最小的操作。"

真正的开关是运行时的 `/hitl on`、`/hitl off`（`cli/CliCommandParser.java` 第 126 到 134 行）。`hitl/HitlToolRegistry.executeToolOutput`（第 36 到 54 行）：HITL 关闭或工具不在名单里直接执行；否则弹出审批。终端交互选项（`hitl/TerminalHitlHandler.java` 第 19 到 23 行）：`y/Enter` 批准、`a` 本会话同工具全部放行、`n` 拒绝、`s` 跳过、`m` 修改参数后执行。拒绝和跳过都写审计并返回 `ToolOutput.failure("[HITL] 操作已被拒绝：...")`，模型会看到这条文本。

### 命令黑名单（HITL 之前的快速拒绝）

`policy/CommandGuard.java` 第 19 到 41 行，9 条正则，文件头注释明说"黑名单是出名的反模式（永远列不全），但能拦住 LLM 容易踩的明显破坏性命令，减少 HITL 弹窗骚扰。真正的安全责任在 HITL 审批和用户判断"：

```java
new DenyRule("禁止 sudo 提权", Pattern.compile("(?i)\\bsudo\\b")),
new DenyRule("禁止 rm -rf 删除全盘或用户目录",
        Pattern.compile("(?i)\\brm\\s+-[a-z]*r[a-z]*f[a-z]*\\s+(/|~|\\$home)|...")),
new DenyRule("禁止 mkfs 格式化磁盘", Pattern.compile("(?i)\\bmkfs(\\.|\\b)")),
new DenyRule("禁止 dd 写入裸设备", Pattern.compile("(?i)\\bdd\\b[^\\n]*\\bof=/dev/")),
new DenyRule("识别为 fork bomb", Pattern.compile(":\\(\\)\\s*\\{\\s*:\\s*\\|\\s*:\\s*&\\s*\\}\\s*;\\s*:")),
new DenyRule("禁止 curl / wget 管道直接执行远端脚本",
        Pattern.compile("(?i)\\b(curl|wget)\\b[^|\\n]*\\|\\s*(sh|bash|zsh|fish|ksh)\\b")),
new DenyRule("不允许扫描 /、~ 或整个文件系统", Pattern.compile("(?i)\\bfind\\s+(/|~|\\$home)")),
new DenyRule("禁止 chmod 777 全盘", Pattern.compile("(?i)\\bchmod\\s+-R\\s+777\\s+(/|~)")),
new DenyRule("禁止 shutdown / reboot / halt", Pattern.compile("(?i)\\b(shutdown|reboot|halt|poweroff)\\b"))
```

不做 shell 解析，只做正则匹配；`git`、`curl` 单独使用默认放行。`base.md` 第 70 到 71 行同步告诉模型这些禁令，并要求被拒后"不要原样重试"。

---

## 六、并行与 Sub-agent

### 工具并行

`ToolRegistry.executeTools` 第 1351 到 1380 行：同一轮多个工具调用时，`Executors.newFixedThreadPool(min(调用数, 4))`，`invokeAll` 整批超时 90 秒，超时的单个调用标记 `timedOut=true`，结果按原顺序返回。含浏览器工具的批次强制串行（第 1337 到 1349 行）。`base.md` 第 44 到 45 行要求模型"互不依赖的 read_file/list_dir/grep_code 在同一轮返回"。

### Sub-agent：ReAct 模式没有派生工具，只有 Team 模式的固定 Worker

`ToolRegistry` 里没有 `sub_agent`/`spawn_agent` 之类的工具，ReAct 主 Agent 不能自己派 Sub-agent。Sub-agent 只在 Team 模式（`agent/AgentOrchestrator.java`）里存在，第 106 到 111 行固定创建 planner、worker-1、worker-2、reviewer 四个 `SubAgent` 实例。

并行派发（第 466 到 530 行 `runBatchParallel`）：同一批无依赖步骤，`newFixedThreadPool(min(批大小, 2))`，Worker 从 `LinkedBlockingQueue` 池里取，每个步骤新建一个独立 reviewer，输出写各自的 `ByteArrayOutputStream`，全部完成后按步骤顺序刷到终端。理论上可以让两个 Worker 去不同目录找 Bug，但并行度上限是 2，且步骤划分由规划器决定，用户不能直接指定。

上下文隔离：每个 `SubAgent` 有自己的 `conversationHistory`（`agent/SubAgent.java` 第 230 到 235 行把任务追加进自己的历史），步骤结束后 `worker.clearHistory()`（第 512 行）。共享的是 `toolRegistry`（含同一个 HITL 审批器）和 `llmClient`。

结果汇总（第 662 到 690 行 `buildStepContext`）：后继步骤的上下文只包含"已完成的依赖步骤"描述和结果前 500 字符（`step.result().substring(0, 500) + "..."`）。也就是说 Worker 找到的 Bug 位置若写在 500 字之后，会被截掉。Reviewer 每步审一次，不合格最多重试 2 次（`MAX_RETRIES_PER_STEP = 2`，第 48 行）。

---

## 七、代码搜索 Golden Set

- 用例文件：`src/test/resources/code-search/golden-set.json`，当前 5 条
- 测试类：`src/test/java/com/paicli/tool/CodeSearchGoldenSetTest.java`
- 文档：`docs/code-search-golden-set.md`
- 运行：`mvn test -Dtest=CodeSearchGoldenSetTest -DskipTests=false`，`mvn test -Pquick` 也覆盖

用例格式（每条 6 个字段）：

```json
{
  "id": "parallel-tool-execution",
  "question": "三条执行路径共享的并行工具入口在哪里？",
  "pattern": "executeTools",
  "glob": "**/ToolRegistry.java",
  "expectedPath": "src/main/java/com/paicli/tool/ToolRegistry.java",
  "expectedText": "public List<ToolExecutionResult> executeTools"
}
```

判定标准（测试第 20 到 55 行）：强制 `paicli.search.disable.rg=true` 走 Java fallback 保证 CI 不依赖 rg；`max_chars=6000` 模拟单轮预算；断言 grep 输出长度不超过 6500、包含 `expectedPath:行号`、包含 `suggested_reads`；然后 `read_file offset=行号-20, limit=80` 必须包含 `expectedText`。只测 correctness，文档里列的耗时 P50/P95、命中排名、token 估算都是"后续指标"，未实现。

---

## 八、LLM-as-Judge 与位置平衡 A/B

两个类都在 `eval/` 包，文档 `docs/llm-as-a-judge.md`，测试 `LlmJudgeTest`、`PositionBalancedPairwiseJudgeTest`。

`eval/LlmJudge.java`：按 Rubric 逐维打 1 到 5 分，模型只返回分数、证据和 `hardFailures`，加权总分和是否通过由 Java 算（构造参数 `passThreshold` 0 到 100）。返回未知维度、重复维度、缺维度、分数越界或非法 JSON 时直接抛 IOException，不当 0 分处理（第 72 到 100 行）。

`eval/PositionBalancedPairwiseJudge.compare`（第 34 到 53 行）：同一对答案判两次，第二次交换 A/B 位置，两次逻辑胜者不一致则降级为 TIE：

```java
RawJudgment first  = judge(userInput, referenceAnswer, rubric, baselineAnswer, candidateAnswer);
RawJudgment second = judge(userInput, referenceAnswer, rubric, candidateAnswer, baselineAnswer);
Winner firstLogicalWinner  = logicalWinner(first.winner(),  Winner.BASELINE,  Winner.CANDIDATE);
Winner secondLogicalWinner = logicalWinner(second.winner(), Winner.CANDIDATE, Winner.BASELINE);
boolean positionConsistent = firstLogicalWinner == secondLogicalWinner;
Winner finalWinner = positionConsistent ? firstLogicalWinner : Winner.TIE;
```

边界（文档"当前边界"一节）：没有 `/eval` 命令、没有数据集加载器和批量 Runner、没有固定 temperature/seed、没有和人工标注对过一致率。

补充：`benchmarks/paicli-native-agentbench-v0.1/` 的 dev 集 8 题用 shell 验证器判分，例如 `validators/dev/dev-java-closed-range.sh` 先 `javac` 编译被修改的源码，再编译并运行一个隐藏的 `ClosedRangeHiddenTest`，任一步失败即 exit 1。`eval/benchmark/BenchmarkVerifier.java` 第 57 行按验证器 exit code 是否为 0 判定通过。设计原则（DESIGN.md）："以可执行验证器为主，语义 Judge 为辅；确定性事实不交给 LLM 猜。"
