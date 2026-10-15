> 调研日期：2026-10-15｜仓库：/Users/itwanger/Documents/GitHub/paicli（main）｜commit：78786aa
`git -C /Users/itwanger/Documents/GitHub/paicli log --oneline --since=2026-10-15`

# PaiCLI 修 bug 闭环：定位、编辑、验证、评测

- 引用路径省略前缀 `src/main/java/com/paicli/`，资源文件省略 `src/main/resources/`，行号以 78786aa 为准；本地工作区可能带未提交改动，核对用 `git show 78786aa:<路径>`
- 本文只讲“修 bug 闭环”这条线。Agent 主循环、预算与 RunawayGuard 常量、审批名单与 auto/ask 模式、命令黑名单与沙箱、Side-Git 快照机制、工具并行规则、Team 角色，都只写在 `paicli-architecture.md`，这里只补它们对修 bug 闭环的影响
- 闭环在源码里的样子：`glob_files` / `grep_code` 找位置 → `read_file` 按行读 → `edit_file` 局部替换 → 写完自动做 Java 语法诊断 → `execute_command` 跑编译或测试 → 看 exit code 和输出决定下一步。除语法诊断外，每一步都由模型自己决定要不要做

---

## 一、定位

### glob_files 与 grep_code

- `glob_files`（`tool/ToolRegistry.java:434-443`，实现 `:532-571`）：按文件名 glob 找候选文件，默认 50 条、上限 200；遍历时跳过 `.git`、`.paicli`、`target`、`node_modules`、`dist`、`build`、`coverage`、`.idea`、`.gradle`（`:78-80`）
- `grep_code`（参数 `:445-460`，实现 `:573-643`）
  - 参数与上限：`max_results` 默认 50、上限 200；`head_limit`（单文件命中数）默认 20、上限 50；`context_lines` 默认 0、上限 5；`max_chars` 默认 24000，夹在 1000 到 60000（`:580-585`）；`regex` 默认 false 即字面量搜索，`case_sensitive` 默认 true
  - 引擎：优先 ripgrep，系统属性 `paicli.search.disable.rg=true` 或本机没有 `rg` 时退回 `JavaCodeSearchEngine`（`tool/RipgrepCodeSearchEngine.java:35-36`、`:202`）；Java 实现跳过超过 2MB 或疑似二进制的文件（`tool/JavaCodeSearchEngine.java:20`、`:96`）
  - rg 命令带 `--json`、`--max-filesize`，字面量搜索加 `--fixed-strings`（`RipgrepCodeSearchEngine.java:141-150`）；rg 子进程 8 秒超时，超时返回空结果和原因“rg 搜索超时 8 秒”（`:25`、`:55-59`）
  - 两层截断：条数达到 `max_results` 时标 `partial`（`:67`、`:109`）；拼接输出超过 `max_chars` 时停止，并追加“请缩小 path/glob/pattern 或提高 offset 后 read_file”（`ToolRegistry.java:612-639`）
  - `suggested_reads`：对已输出的命中，最多 3 个文件各生成一条 `read_file {"path":..., "offset": 命中行-20, "limit":80}` 建议（`:645-659`），把“搜索”和“读上下文”串起来
- 提示词要求：精确符号、文件名、字符串、调用链优先 `grep_code` / `glob_files`；看到 `partial: true` 或 `suggested_reads` 先缩小范围或按建议分段读，不要整读大文件（`prompts/base.md:35-37`）

### read_file

- `ToolRegistry.java:333-350`，实现 `readFileForTool` `:500-530`
- 不带 `offset` / `limit` 时整文件返回；带参数时按行分页，`limit` 默认 200、上限 2000，每行带 `%5d | ` 行号前缀，读不完时提示“可用 offset=N 继续读取”
- 整文件返回超过 32000 字符时，由卸载器写进 `.paicli/tool-outputs/` 并只留首尾预览；带 `offset` / `limit` 的读取不卸载，避免“卸载 → 读回 → 再卸载”（卸载机制见 architecture 第五节，豁免规则 `tool/ToolResultOffloader.java:104-114`）

### search_code

- RAG 语义检索，需要先 `/index`，没索引时直接返回提示（`ToolRegistry.java:728-767`）；提示词把它定位为模糊描述时的辅助手段（`base.md:38`）。索引与检索实现见 architecture 第十一节

## 二、编辑

### edit_file（36a2677 新增）

- Schema：`path`、`old_text`、`new_text` 必填，`replace_all` 可选（`ToolRegistry.java:395-408`）；描述里要求片段来自记忆或较早读取时先重新 `read_file`，新建文件用 `write_file`
- 执行 `editFile`（`:463-498`）：目标必须是已有普通文件；替换前后内容相同时报错“文件未修改”（`:479-481`）；编辑后超过 5MB 拒绝（`:482-486`）；写完通知 diff 观察者，再跑 LSP 钩子（`:487-493`）
- 匹配逻辑 `tool/TextEditMatcher.java`（纯函数，不碰文件系统，`:9-22`），按顺序尝试
  1. 精确匹配；文件是 CRLF 而片段只有 LF 时按 CRLF 重新匹配，替换文本也转成 CRLF（`:65-75`）
  2. 逐行归一化后匹配：NFKC、去行尾空白、弯引号、各种横线、特殊空格统一成 ASCII，找到后映射回原文位置，只替换原文对应那段（`:13-15`、`:108` 起）
  3. 片段每个非空行都带 `read_file` 行号前缀（如 `   12 | `）时剥掉前缀重试；重试也失败时报告原始片段的错误（`:25`、`:44-62`）
- 唯一性按可重叠方式判断，`"aa"` 在 `"aaa"` 里算两处，宁可拒绝也不猜（`:20-21`）；多处匹配时报错并给出最多 3 个起始行号，提示加长上下文或用 `replace_all`（`:172-179`）；找不到时提示先 `read_file` 重读（`:167-170`）
- `replace_all=true` 只做精确匹配，按不重叠方式逐个替换（`:90-106`）
- 提示词：修改已有文件局部内容优先 `edit_file`，`old_text` 必须唯一，失败先重读不要猜（`base.md:76`）
- 没有“改之前必须读过这个文件”或“文件读后被改动”的检查：`editFile` 只校验 `old_text` 能否在当前文件内容里匹配（`ToolRegistry.java:463-478`）

### write_file

- `ToolRegistry.java:352-393`：整文件覆盖，自动建父目录，单文件 5MB 上限（`:83`）；写完同样跑 LSP 钩子（`:387`）

### 并发写的保护

- 同一批里多个 `edit_file` 按模型给出的顺序串行执行，不会互相覆盖（354b62b，规则见 architecture 第五节）

## 三、验证

### 唯一自动发生的验证：写 Java 文件后的语法诊断

- `write_file`、`edit_file` 成功后调 `runPostEditLspHook`（`ToolRegistry.java:387`、`:493`、`:1179-1187`），钩子失败不影响工具结果
- `lsp/LspManager.java`：默认开启，`PAICLI_LSP_ENABLED=false` 关闭（`:141-147`）；只处理 `.java` 文件（`:50-53`），用 JavaParser 解析收集 `Problem`，不是真正的 LSP 服务器，不做类型检查和编译（`:85-92`）；同一文件的新诊断覆盖旧诊断，诊断为空时清掉该文件的待发记录（`:122-128`）
- 注入：每次调模型前 `flushPendingLspDiagnostics` 取出诊断，作为一条 user 消息追加（`agent/Agent.java:226`、`:595-605`；Plan 任务 `agent/PlanExecuteAgent.java:730`、`:902`；Team worker `agent/SubAgent.java:308`、`:539`）
- 格式 `lsp/LspDiagnosticFormatter.java:21-41`：首行 `[LSP 诊断注入]`，提示“优先修复 error，再处理 warning；不要原样重复同一处错误写法”，每条 `- [error] 路径:行:列 信息 (javaparser)`，默认最多 20 条（`:8`，`PAICLI_LSP_MAX_DIAGNOSTICS` 可调）

### execute_command 跑编译和测试

- Schema 只有一个 `command` 参数，没有超时或后台运行参数（`ToolRegistry.java:667-674`）
- 执行 `executeCommandOutput`（`:1764-1865`）
  1. 先过 CommandGuard，命中抛 `PolicyException`，外层统一审计并返回 `🛡️ 策略拒绝: 原因`（`:1774-1781`）
  2. 在项目目录 `bash -c` 执行，沙箱启用时换成沙箱 argv（`:1797-1807`）；stderr 合并进 stdout（`:1808`）
  3. 超时固定 60 秒（`:63`、`:123`），交互式入口没有配置项改它；超时 `destroyForcibly`，返回“命令执行超时（60秒），已强制终止”，判失败（`:1824-1835`）
  4. 正常结束返回 `命令执行完成 (exit code: N)\n<输出>`，exit code 非 0 时包成 `ToolOutput.failure`（`:1837-1844`）
- 输出处理 `readProcessOutput`（`:1921-1953`）
  - 卸载开启（默认）时先完整捕获，上限 200 万字符（`:68`、`:1923`）
  - 不超过 8000 字符原样返回（`:1943-1945`）
  - 超过 8000 字符写进 `.paicli/tool-outputs/`，上下文保留开头 8000 字符和结尾 800 字符预览，以及 `read_file` 读回建议（`:1946-1950`，`ToolResultOffloader.java:93-101`、`:131-146`）。测试框架把失败摘要放在末尾时，结尾预览和卸载文件都能拿到
  - 卸载关闭时退回旧行为：只保留开头 8000 字符并追加“...(输出已截断)”（`:1952`）
- 失败标志的去向：`successful=false` 会被 `RunawayGuard` 用来累计同类错误（`agent/RunawayGuard.java:80-83`）；回给模型的仍是文本，没有“测试失败自动重试”或结构化测试报告解析

### 提示词里关于验证的要求

- `prompts/modes/agent.md:5`：“代码修改、文件读取、命令验证必须基于真实工具结果”
- `prompts/handoff.md:7`：最终回复说明“完成了什么、验证了什么、还有哪些明确边界”，不要虚构未执行的命令
- 预算命中时的收尾指令要求分列“已完成、已验证、未完成或阻塞、建议下一步”（`agent/AgentBudget.java:186-191`）
- 三个模式提示词和 `base.md` 里都没有“改完代码必须跑编译或测试”的硬性要求（对 `prompts/` 全目录检索“测试 / 验证 / test”只有上面几处和 VERIFICATION 任务类型）
- Plan 模式反而允许不调工具验证：`modes/plan.md:8` 和任务输入末尾都写“ANALYSIS 或 VERIFICATION 类型任务上下文足够时直接给出结果”（`agent/PlanExecuteAgent.java:1234`）；Team worker 提示词同样如此（`modes/team-worker.md:5`）
- Team 的 reviewer 不带工具，只能看 worker 的文字结果，无法自己跑测试复核（architecture 第十三节）

## 四、修复循环会不会停下来

常量和机制见 architecture 第二节，这里只分析修 bug 场景：

- 默认不限轮数、不限 token，循环靠模型自己不再调用工具结束
- “原样重跑同一条失败命令”会被拦住：同一动作连续 3 步出现时 `RunawayGuard` 提醒一次；仍原样重复到 5 步，`AgentBudget` 判停滞并强制无工具收尾
- “改一点、跑一次”的循环通常拦不住
  - `RunawayGuard` 的计数键只要在某一步没出现就归零（`RunawayGuard.java:87-96`、`:109-114`）。编辑和测试分在两步时，编辑那一步里没有测试命令，测试命令的计数每次都被清零
  - `AgentBudget` 比较整步的“工具名 + 原始参数”签名（`AgentBudget.java:107-121`、`:193-199`），每次 `edit_file` 的参数都不同，签名不会连续相同
  - 只有编辑和测试落在同一步、且测试命令完全相同时，测试命令的动作键才会连续累计
  - 需要硬上限时只能显式配置 `-Dpaicli.react.hard.max.iterations` 或 `-Dpaicli.react.token.budget`
- 被策略或用户拒绝的结果（`🛡️`、`[HITL]`、`[AUTO]`、用户取消）不计入重复（`RunawayGuard.java:75`、`:130-137`）

## 五、审批对闭环的影响

名单与两档模式见 architecture 第六节，修 bug 场景下的结果：

- auto 模式（启动默认）：`edit_file`、`write_file` 直接执行，不弹框也不经分类器；跑测试的 `execute_command` 先交给分类器，分类器 allow 条件里包括“不访问网络，不下载或安装软件、依赖和插件”（`hitl/LlmApprovalClassifier.java:46-51`）；不放行时以 `[AUTO]` 失败交回模型，同一轮连续被拦 3 次才转人工
- ask 模式：每次 `edit_file`、`write_file`、`execute_command` 都要确认；`a` 可以本会话放行同一工具（`hitl/TerminalHitlHandler.java:20`）
- 参数不合法的调用不会弹确认框，直接拿校验错误（`hitl/HitlToolRegistry.java:56-59`）
- 命令沙箱默认关闭；打开后沙箱里没有网络、看不到 `~/.m2`，`mvn` 这类需要联网或本地仓库的构建会失败（`tool/CommandSandboxMode.java:15-17`，`AGENTS.md:175`）

## 六、改坏了怎么回滚

快照机制见 architecture 第十四节，修 bug 场景下的结果：

- 粒度是整个顶层 turn：`revert_turn` / `/restore N` 只能回到第 N 个 turn 开始前，不能只撤销某一次 `edit_file`
- auto 模式下模型调用 `revert_turn` 不会自动执行，以 `[AUTO]` 失败交回，同一轮连续被拦 3 次才转人工确认（`HitlToolRegistry.java:103-114`）；也可以由用户切 ask 模式或自己用 `/restore`
- 快照排除 `target`、`node_modules` 等目录，回滚不恢复构建产物

## 七、评测

### 代码搜索 Golden Set

- 用例 `src/test/resources/code-search/golden-set.json`，共 5 条，每条字段 id、question、pattern、glob、expectedPath、expectedText
- 测试 `src/test/java/com/paicli/tool/CodeSearchGoldenSetTest.java`：强制 `paicli.search.disable.rg=true` 走 Java 实现，CI 不依赖 rg（`:27-28`）；`max_chars=6000`（`:18`）；断言输出不超过 6500 字符、包含 `expectedPath:行号`、包含 `suggested_reads`（`:38-44`）；再用 `read_file offset=行号-20, limit=80` 读回，必须包含 `expectedText`（`:46-51`）
- 只测定位正确性，没有耗时、排名、token 指标

### LLM-as-a-Judge

- `eval/LlmJudge.java`：按 Rubric 逐维打 1 到 5 分，加权总分和是否通过由 Java 计算；未知维度、重复维度、缺维度、越界分数、非法 JSON 直接抛 `IOException`，不当 0 分（`:72-100`、`:137-142`）
- `eval/PositionBalancedPairwiseJudge.compare`（`:34-53`）：同一对答案判两次，第二次交换 A/B 位置，两次逻辑胜者不一致降级为 TIE（`:46-47`）
- 文档 `docs/llm-as-a-judge.md:79-84` 写明边界：没有数据集加载器、批量 Runner、`/eval` 命令；没有统一 temperature / seed；没有和人工标注对过一致率

### Native AgentBench

- 设计 `benchmarks/paicli-native-agentbench-v0.1/DESIGN.md`：评的是“模型在 PaiCLI Harness 里完成真实任务的能力”；原则“以可执行验证器为主，语义 Judge 为辅；确定性事实不交给 LLM 猜”；正式 28 题状态 `planned`，公开 8 题 dev 集 `executable / diagnostic`
- dev 集 `dev-suite.json` 8 题：dev-java-closed-range、dev-java-shared-normalizer、dev-python-order-summary、dev-node-event-report、dev-terminal-release-manifest、dev-code-retry-location、dev-safe-path-copy、dev-secret-safe-bundle；每题一个 `validators/dev/<id>.sh`
- 修 bug 类题的判分方式，以 `validators/dev/dev-java-closed-range.sh` 为例：先 `javac` 编译被修改的源码，失败即 exit 1；再生成并运行隐藏测试 `ClosedRangeHiddenTest`，断言区间端点、重叠等边界
- 通过判定 `eval/benchmark/BenchmarkVerifier.java:54-60`：超时为 TIMEOUT，exit code 为 0 为 PASSED，其余 FAILED
- 统计工具调用要从 `ToolRegistry.onPolicyToolResults` 取，它包含被 `TurnToolPolicy` 拒绝的调用，顺序不变（`ToolRegistry.java:1584-1591`，`AGENTS.md:25`）
- 当前状态（`AGENTS.md:21-22`）：评测因 token 消耗暂停；正式分数 `formalScores=null`、`publishable=false`，不能对外说成正式榜单

---

## 演进记录（面试素材）

| commit | 日期 | 之前 | 之后 |
|---|---|---|---|
| 2ce84ae | 09-23 | `execute_command` 只回文本，exit code 非 0 也算成功 | 返回类型化 `ToolOutput`，exit code 非 0 判失败 |
| 98e96d5 | 09-23 | 命令输出超过 8000 字符只保留开头，测试框架放在末尾的失败摘要会被截掉 | 完整输出卸载到会话文件，上下文保留开头 8000 和结尾 800 字符 |
| 36a2677 | 09-23 | 没有局部编辑工具，修 bug 只能 `write_file` 整文件覆盖 | 新增 `edit_file`，默认唯一匹配，`replace_all` 全部替换；加入 `DANGEROUS_TOOLS` 和审计 |
| 354b62b | 09-24 | 同一批 `edit_file` 可能并行执行，读改写丢更新；CRLF 文件匹配失败 | 有副作用的工具按顺序串行；CRLF 文件按 CRLF 匹配并保留原换行 |
| 36f106f | 09-25 | 只有精确匹配；停滞检测窗口 3 | `TextEditMatcher` 加逐行归一化匹配和行号前缀剥离；新增 RunawayGuard（3 步提醒），停滞窗口改为 5 |
| 72a60c2 | 09-25 | 默认确认档可 `/hitl off` 全部关闭 | auto 模式下编辑直接执行、命令交给分类器审查，`/hitl off` 删除 |
| e074207 | 10-10 | 参数解析失败只返回“工具执行失败: 异常信息” | 执行前 Schema 校验，缺参数、类型、enum 错误按字段返回 |

## 现有差距（面试答案可能要超出源码的地方）

- 改完代码没有强制验证：提示词不要求跑测试，Plan 的 VERIFICATION 任务允许不调工具直接下结论（`PlanExecuteAgent.java:1234`、`modes/plan.md:8`）
- 自动诊断只有 Java 语法：JavaParser 解析，不做类型检查和编译，其他语言没有诊断（`LspManager.java:50-53`、`:85-92`）
- `execute_command` 固定 60 秒超时，没有超时参数和后台任务，耗时长的全量测试会被强杀（`ToolRegistry.java:63`、`:667-674`、`:1824-1835`）
- 测试结果只有 exit code 和文本，没有结构化解析（如 surefire 报告里的失败用例），也没有失败自动重试
- `edit_file` 没有“先读后改”和“读后文件被改动”的检查（`ToolRegistry.java:463-478`）
- “改一点、跑一次”的循环默认没有上限，RunawayGuard 和停滞检测都拦不住（第四节）
- 回滚粒度是整个 turn，不能撤销单次编辑；auto 模式下模型不能自己回滚
- Team reviewer 不能跑测试，reviewer 的 LLM 调用出错时直接算通过（`AgentOrchestrator.java:541-549`、`:600-607`）
- 代码搜索 Golden Set 只有 5 条，只测正确性；Native AgentBench 正式 28 题还没有可发布的分数（`AGENTS.md:22`）
