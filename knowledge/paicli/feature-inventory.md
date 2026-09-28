调研日期 2026-09-24，基于 paicli commit ea8e05a

# PaiCLI 5 月中旬以后新增功能盘点与文档覆盖对照

源码根目录 `/Users/itwanger/Documents/GitHub/paicli/src/main/java/com/paicli/`，下文源码路径都相对这个目录。文档目录 `docs/src/sidebar/itwanger/paicli/`（26 篇）和 `docs/src/sidebar/itwanger/ai/paicli-interview-advanced.md`。

范围说明：

- 上下文压缩、长短期记忆（含自动提取、冲突和新鲜度）、Plan-and-Execute、edit_file 四块已有独立调研（同目录 `memory-compaction.md`、`plan-execute.md`、`edit-file-tools.md`），本文只在交叉处给指针，不重复展开。`ToolResultOffloader`、`ToolResultClearer`、`ExternalContextTracker`、`AutoFactExtractor`、PAI.md 加载细节都已在 `memory-compaction.md` 里。
- `git log --since=2026-05-10` 会漏掉 bceb60b（2026-05-10 14:17），因为 `--since` 按当天当前时刻截断。本文把 2cbff45（05-09）和 bceb60b（05-10）也算进来，因为 LSP、快照、Prompt 分层、Runtime API、图片输入都在这两个提交里落地，配套文章写于 5 月中下旬。
- ROADMAP.md 标题仍是“21 期”，第 22 期（JLine 交互升级）和第 23 期（微信通道）只有 `docs/phase-22-*.md`、`docs/phase-23-*.md`，没有写进 ROADMAP。Pro 版本（Spring AI / LangGraph4J）尚未开工，分支 `no_LangGraph4J_springai` 停在 2026-04-23 的 9243724，比 main 没有多出任何提交。

## 0. 提交时间线（2026-05-09 之后，共 29 个）

| commit | 日期 | 与本盘点相关的内容 |
|---|---|---|
| 2cbff45 | 05-09 | LSP 诊断注入（lsp 包）、Git Side-History 快照（snapshot 包）、StepClient |
| bceb60b | 05-10 | Prompt 分层（prompt 包 + resources/prompts/）、图片输入（image 包）、Runtime API + DurableTaskManager（runtime 包）、KimiClient |
| 1ce113f | 05-10 | `/model glm-5.1` 显式化，Esc 清空输入 |
| 7749de1 | 05-12 | JLine 交互升级：PaiCliCompleter、PaiCliHighlighter、PaiCliHistory、LocalPathMentionExpander |
| 0a96208 / e0a34a8 / 6473ef4 / c206b18 | 05-12 ~ 05-13 | live thinking 区、JLine Status dock、MCP 启动最多等 8 秒 |
| 72a7e90 | 05-18 | glob_files / grep_code 初版，记忆作用域 |
| d399899 | 05-18 | slash 命令回写 transcript |
| c69be83 | 05-31 | CodeSearchEngine（ripgrep + Java 回退）、FreeLlmApiClient、Runtime Context（日期时区） |
| 2e70764 | 05-31 | 状态栏 ctx token 显示 |
| 9776310 | 06-01 | ReAct 新鲜度 web_search 预检（10 天后被删） |
| 96bc8b2 | 06-11 | PAI.md + `/init`、XfyunMaaSClient、`/compact` `/export`、DeepSeek SSE 强制 HTTP/1.1，同时删除新鲜度预检 |
| 72311b9 / 25d2e93 | 06-12 / 06-13 | 微信 iLink 通道、WechatTextFormatter |
| b7ee842 | 06-23 | AgnesClient，`supportsImageInput()` 能力声明 |
| e8d8a16 | 08-25 | TurnToolPolicy、Better Harness、LlmJudge + 位置平衡成对评审、ConversationLedger、LlmRetryPolicy、AgentBudget 无工具收尾 |
| c086e4d | 08-31 | HunyuanClient、GLM-5.3 与 DeepSeek V4 高推理参数、双路径压缩、AgentBench 基础设施 |
| 2ce84ae | 09-23 | AgentBench 主体（eval/benchmark 约 120 个类 + 16 个 Python 验题脚本）、CommandSandbox（Seatbelt，仅评测用）、DeepSeek DSML 回转、LlmFailureClassifier |
| 98e96d5 | 09-23 | ToolResultBoundary、ToolResultOffloader、记忆冲突与新鲜度 |
| 36a2677 | 09-23 | edit_file、结构化摘要压缩 |
| a0fd238 / 42bf855 / ec1b70c | 09-24 | TeamPlanParser 严格解析、TeamReviewVerdict fail-closed |
| 9fd726b | 09-24 | 交互式命令沙箱 off/auto/required（Seatbelt + bubblewrap）、ToolResultClearer、ExternalContextTracker、MEMORY_EXTERNAL_CONTEXT 拒绝码 |
| ea8e05a | 09-24 | AutoFactExtractor 自动事实提取 |

## 1. 功能清单

每项格式：一句话说明 → 核心类 → 关键设计点 → 引入 commit → 文档覆盖状态。

### 1.1 LSP 诊断注入

- 一句话：`write_file` / `edit_file` 成功后对 Java 文件做语法检查，把错误作为合成 user 消息塞进下一轮 LLM 请求。
- 核心类：`lsp/LspManager.java`、`lsp/LspDiagnosticFormatter.java`；挂钩在 `tool/ToolRegistry.java` L394（write_file）、L499（edit_file）；注入在 `agent/Agent.java` L215 `injectPendingLspDiagnostics()`，Plan 任务执行器和 SubAgent 也接入。
- 关键设计点：
  1. **没有真正的 LSP server**。不启动 JDT LS / rust-analyzer / pyright / gopls，没有 JSON-RPC，只用 JavaParser 3.28.0 的 `parse(file).getProblems()`，只认 `.java`，severity 全部固定为 ERROR，source 固定为 `javaparser`。只能查语法错误，查不出类型和符号错误。
  2. 诊断按文件存 `pendingByFile`，同一文件再次编辑会覆盖旧诊断；单次注入上限 `DEFAULT_MAX_DIAGNOSTICS = 20`（`PAICLI_LSP_MAX_DIAGNOSTICS` 可调），注入文本以 `[LSP 诊断注入]` 开头。
  3. 开关 `PAICLI_LSP_ENABLED` 默认开；有值时用 `Boolean.parseBoolean`，所以 `1`、`yes` 都会被当成关闭。
- commit：2cbff45（2026-05-09）引入；36a2677（09-23）让 edit_file 也触发。
- ROADMAP 第 17 期写的 LspManager 惰性 transport pool、`LspHooks`、`apply_patch`、error/warning/info 分级都未实现，第 17 期正文也没说明 MVP 实际是 JavaParser 版。
- 文档状态：**已覆盖，基本准确，有一处夸大**。`paicli-interview-productization.md` 第 03、10 题写明了 JavaParser 轻量诊断和 `[error] Foo.java:42:15 ... (javaparser)` 格式，这是对的。夸大处在第 03 题“Agent 不用等用户手动编译就能发现编译错误并自动修复”，实际只能发现语法错误；第 10 题“warning 黄色、info 灰色”在实现里永远不会出现。另外 `ai/paicli-interview-advanced.md` 第 04 题写的方法名 `LspManager.reportPostEdit()` 不存在，实际是 `runPostEditLspHook`。

### 1.2 Git Side-History 快照与 revert_turn

- 一句话：每轮对话前后用 JGit 在 `~/.paicli/snapshots/` 下的独立仓库给工作区拍快照，用户用 `/restore <N>`、模型用 `revert_turn` 回滚。
- 核心类：`snapshot/SideGitManager.java`、`SnapshotService.java`、`SnapshotConfig.java`；`revert_turn` 在 `ToolRegistry.java` L895–910；命令在 `cli/Main.java` L2510–2580。
- 关键设计点：
  1. 仓库路径 `snapshotsRoot/<hash(项目根的父目录)>/<hash(项目根)>/.git`，hash 取 SHA-256 前 8 字节；`gitDir` 与 `workTree` 分离，excludes 写进 `info/exclude`，不碰用户 `.git`。提交作者 `PaiCLI Snapshot <snapshot@paicli.local>`，允许空提交。
  2. pre-turn 同步、post-turn 在单线程 daemon 执行器 `paicli-snapshot-writer` 上异步；恢复前先拍 `pre-restore` 快照，删掉目标树里没有的已跟踪文件再逐个写回。`/restore` 的 N 限制 1..100，`revert_turn` 的 offset 只有下限没有上限。
  3. `revert_turn` 在 `ApprovalPolicy` 里是“🔴 高危”，和 `execute_command` 同级；微信通道直接拒绝。
- 容易讲错的点：`PAICLI_SNAPSHOT_MAX` 默认 50，但**只用于列表和查找范围，代码里没有裁剪或 gc 旧提交**，side-git 历史会一直增长。`/snapshot clean` 是删除整个项目快照目录。Runtime API 和后台任务都不走 SnapshotService。
- commit：2cbff45（2026-05-09）引入，snapshot 包之后未改。
- 文档状态：**已覆盖但部分过时/不准确**。`paicli-interview-productization.md`：
  - 第 11 题“默认保留最近 50 轮的快照，超出的自动清理”不成立，没有自动清理。
  - 第 04 题“按项目路径的哈希值组织目录结构”说法可以，但没提两层 hash。
  - 全篇只讲 `/restore`，没有讲 LLM 可调用的 `revert_turn` 工具和它的高危审批，这部分**未覆盖**。

### 1.3 Prompt 分层（PromptAssembler + prompts/ 目录）

- 一句话：把 system prompt 拆成 `resources/prompts/` 下的 Markdown 文件，按固定顺序组装，支持用户级和项目级整文件覆盖。
- 核心类：`prompt/PromptAssembler.java`、`PromptRepository.java`、`PromptContext.java`、`PromptMode.java`（AGENT / PLAN / PLANNER / TEAM_PLANNER / TEAM_WORKER / TEAM_REVIEWER）。
- 关键设计点：
  1. 实际组装顺序：base.md（模型不支持工具时先删掉 `## Tools` / `## Tool Policy` 并追加 `## Tool Availability`）→ personalities/calm.md → modes/*.md（替换 `{{taskType}}` 等变量）→ approvals/*.md → `## Runtime Context`（当前日期、时区）→ `## Project Context`（PAI.md → 检索到的长期记忆 → MCP 资源索引）→ `## Skills` → context/context-management.md → handoff.md。
  2. 覆盖优先级 项目 > 用户 > jar，整文件替换；拒绝 `/` 开头和含 `..` 的路径。项目级目录取的是进程 CWD，不是 ToolRegistry 的 projectPath。
  3. `## Language` 每次组装都校验两次（base.md 一次、最终结果一次），不是只在启动时校验；没有缓存，每次都重新读文件。
- 容易讲错的点：所有调用方都没设 `approvalMode`，所以永远加载 `approvals/suggest.md`，auto 和 never 两个文件实际用不到。handoff.md 现在的内容是“严格输出格式契约”，不是“交接信息”。
- commit：bceb60b（05-10）引入；c69be83（05-31）加 Runtime Context；96bc8b2（06-11）加 PAI.md 与无工具裁剪；2ce84ae（09-23）加 `paicli.prompt.runtime.date/zone` 覆盖。
- 文档状态：**已覆盖但过时**。`paicli-interview-prompt-skill.md`：
  - 第 02 题组装顺序“核心规则、语调、模式、审批、项目上下文、Skill、上下文，最后是本轮对话的交接信息”缺 Runtime Context，没提 Project Context 里的 PAI.md；“交接信息”对 handoff.md 的描述不准。
  - 第 02 题把 approvals 三个文件讲成可用策略，实际只有 suggest 生效。
  - 第 04 题覆盖规则和路径安全描述准确。

### 1.4 PAI.md 项目记忆与 `/init`

- 一句话：对标 CLAUDE.md / AGENTS.md，按五个位置加载 PAI.md 注入 Project Context，`/init` 用模板生成一份。
- 核心类：`prompt/ProjectMemoryLoader.java`、`cli/ProjectMemoryInitializer.java`。
- 关键设计点（细节见 `memory-compaction.md` 2.14）：
  1. 加载顺序 `~/.paicli/PAI.md` → `<root>/PAI.md` → `<root>/.paicli/PAI.md` → `<root>/PAI.local.md` → `<root>/.paicli/PAI.local.md`；`@相对路径` 导入最多 3 层，总预算 `MAX_TOTAL_CHARS = 24_000`。
  2. 每个 turn 重建 system prompt 时都重新读取，不是只在启动时读一次。
  3. `/init` **不调用 LLM**，纯模板，固定五节 Commands / What This Is / Architecture / Things That Will Bite You / Don't，每节最多 5 条；检测到内容含 `paicli` 时改用写死的 PaiCLI 专用内容。
- commit：96bc8b2（2026-06-11）。
- 文档状态：**未覆盖**（26 篇里搜不到 PAI.md、ProjectMemoryLoader、`/init`）。

### 1.5 异步后台任务 + Runtime API

- 一句话：`/task add` 把任务写进 SQLite 由 worker 池后台跑；`serve --http` 起一个只监听 127.0.0.1 的 HTTP 服务，按 thread/turn/events 三个端点调用 Agent。
- 核心类：`runtime/task/DurableTaskManager.java`、`runtime/api/RuntimeApiServer.java`、`RuntimeThreadStore.java`，执行体是 `Main.runHeadlessTask`（L1042–1059）。
- 关键设计点：
  1. 任务库 `~/.paicli/tasks/tasks.db` 表 `runtime_tasks`，ID 为 `task_` + UUID 前 12 位十六进制；`claimNext` 是 synchronized 方法，事务里 `ORDER BY created_at ASC LIMIT 1` 后用 `WHERE status='enqueued'` 条件更新。worker 默认 2（`PAICLI_TASK_WORKERS`），空闲 `wait(300)` 轮询。启动时 `recoverRunningTasks()` 把 running 改回 enqueued，任务从头重跑。
  2. Runtime API 用 JDK `HttpServer`，API key 必填（`PAICLI_RUNTIME_API_KEY`），支持 `Authorization: Bearer` 和 `X-PaiCLI-API-Key` 两种头；事件库 `~/.paicli/runtime/runtime.db`，事件类型 `thread.created / turn.started / message.delta / turn.completed / turn.failed`。
  3. 每个 turn 都 `new Agent(...)` 并用普通 ToolRegistry（不是 HitlToolRegistry），同一 thread 的多个 turn **不共享对话历史**；turn 不进 DurableTaskManager，重启不恢复。
- 容易讲错的点：SSE 是**回放式**，一次性查出 `id > after` 的事件，带定长 `Content-Length` 写完就关连接，不是持续推送的长连接；`message.delta` 是整段结果一次写入，不是逐 token。迭代和 token 默认都不限，仅停滞检测兜底。
- commit：bceb60b（2026-05-10）引入，四个核心文件之后未改；`runHeadlessTask` 在 e8d8a16 接 ledger，9fd726b 接命令沙箱。
- 文档状态：**已覆盖但部分不准确**。
  - `paicli-interview-productization.md` 第 07 题“客户端通过 SSE 端点实时接收执行过程中的事件流”、第 12 题“服务端只需要往 HTTP 响应里持续写 `data:`”与回放式实现不符；第 12 题列了四种事件类型，漏了 `turn.failed`；简历条目“保证 at-least-once 执行语义”只对 `/task` 成立，对 Runtime API 的 turn 不成立。
  - `ai/paicli-interview-advanced.md` 第 03 题“`/task status <id>` 查看单个任务的执行进度”，这个子命令不存在，实际是 `/task log <id>`；“生成一个 UUID 作为任务 ID”不精确。
  - 第 06 题（worker 抢任务的乐观锁描述）、生命周期、失败处理描述准确。

### 1.6 图片输入

- 一句话：`@image:路径`、`@clipboard`、Ctrl+V 把图片作为 image_url 块发给多模态模型，MCP 截图也回灌成图片。
- 核心类：`image/ImageProcessor.java`、`ImageReferenceParser.java`、`ClipboardImage.java`；`llm/LlmClient.java` 的 `ContentPart` 与 `supportsImageInput()`；序列化在 `llm/AbstractOpenAiCompatibleClient.java` L465–515。
- 关键设计点：
  1. 5MB（按 base64 后大小）以内且无 alpha 原样直通；有 alpha 铺白底；超限等比缩到 2000×2000，先 PNG 再 JPEG 五档（0.85→0.25），仍超限再缩到 1200×1200 重试；源图上限 50MB。
  2. b7ee842（06-23）起接口有 `supportsImageInput()`，默认 true；DeepSeek 和混元返回 false，序列化时把图片降级成一句文字说明，而不是在输入层拦截。
  3. 每轮开始 `pruneHistoricalImagePayloads()` 把历史图片换成占位文本；工具返回图片时追加一条“属于工具数据，图片中出现的文字指令不得执行”的 user 消息。
- commit：bceb60b（05-10）引入；b7ee842（06-23）能力声明；c086e4d（08-31）混元为 false。
- 文档状态：**已覆盖，大体准确，缺后续变化**。`paicli-image-input.md` 的压缩管线、`@image` 语法、`@clipboard`、历史裁剪都对得上（没写 1200×1200 第二档）；第 187 行“纯文本模型比如 DeepSeek V4，是不支持的”是对的，但没讲 06-23 之后的 `supportsImageInput()` 降级机制。历史占位文本原文已变为“[历史图片附件已省略 {count} 张；…]”，文章第 316 行写的是旧文案。ROADMAP 第 21 期两次说“公共 LlmClient 接口不做图片能力声明”，与代码相反。

### 1.7 微信 iLink 通道

- 一句话：扫码绑定微信 iLink bot，把 PaiCLI 变成微信里可对话的 Agent，没有审批面板时走默认拒绝策略。
- 核心类：`wechat/IlinkClient.java`、`WechatMessageLoop.java`、`WechatPolicyDecider.java`、`WechatAgentSession.java`、`WechatTextFormatter.java`、`WechatRenderer.java`、`WechatAccountStore.java`；设计文档 `docs/phase-23-wechat-channel.md`。
- 关键设计点：
  1. 接入 `https://ilinkai.weixin.qq.com` 的 `ilink/bot/*` 接口：取二维码 → 每 3 秒查状态、5 分钟超时 → `getupdates` 长轮询（默认 35 秒，Agent 运行中降到 3 秒）→ `sendmessage`；`get_updates_buf` 游标每次持久化，`SESSION_EXPIRED = -14` 时睡 60 秒。账号存 `~/.paicli/wechat/accounts/latest.json`，目录 0700、文件 0600。
  2. 非交互策略：只读工具（read_file、list_dir、glob_files、grep_code、search_code、web_search、web_fetch、browser_status）放行；`execute_command` 必须精确命中白名单；`mcp__*` 必须命中 MCP 白名单；`revert_turn`、`browser_connect/disconnect` 拒绝；`write_file / edit_file / create_project` 放行但受 PathGuard 限制。审批请求一律返回拒绝。
  3. 只接受绑定用户 `boundUserId` 的消息，整个循环只有一个 Agent 会话、单并发排队；回复按 `MAX_CHARS = 3800` 切分，流式按 240/900/3000 字和 2 秒间隔在自然边界分片；Markdown 表格、标题、代码块转成微信可读文本。
- 容易讲错的点：两份白名单没有配置入口，实际恒为空，也就是 `execute_command` 和所有 MCP 工具在微信里都会被拒；phase-23 文档说的“每日 turn 上限 50、单 turn token 预算 64000”在 `WechatPolicyConfig` 里有默认值但**没有任何读取点**，成本围栏没有生效；非绑定用户消息只打 warn 日志不写审计；图片等媒体只记元数据，`/cwd /send /model` 只回复“将在后续启用”。
- commit：72311b9（2026-06-12）引入；25d2e93（06-13）文本格式化；36a2677（09-23）放行 edit_file；9fd726b（09-24）接命令沙箱。
- 文档状态：**未覆盖**（Java 文章里的“微信”都指公众号抓取场景）。

### 1.8 Better Harness（`/better-harness`）

- 一句话：一条命令让 PaiCLI 审查当前项目的 AI 编码工作流，产出带证据的 findings 报告。
- 核心类：`harness/BetterHarnessRunner.java`、`BetterHarnessEvidenceCollector.java`、`BetterHarnessOptions.java`，`resources/skills/better-harness/SKILL.md`。
- 关键设计点：
  1. 四步：确定性采集冻结证据 → 三个无工具 specialist 并行（`session-evidence` 只看 ledger 元数据计数、`project-harness` 看 AGENTS/PAI/README 摘录和测试/CI 信号、`agent-customize` 看 Skill/prompts/MCP/策略文件清单）→ lead 汇总成 JSON `{reportMarkdown, findings[]}` → Java 确定性写 `report.md`、`report.html`、`findings.json`。
  2. quick 与 normal 的差别在摘录预算（4000 / 12000 字符）、文件清单上限（5000 / 20000）和每个 specialist 的 finding 数（0–3 / 0–5）。进度按 5 个确定性工作单元展示，先完成的先刷新。
  3. 脱敏靠“采集阶段就不拿”：不序列化消息正文、reasoning、工具参数和结果、图片、记忆正文、MCP 配置值。AGENTS.md 等 guidance 文件的摘录是原文截断，没有内容脱敏。
- commit：e8d8a16（2026-08-25），之后未改。
- 文档状态：**未覆盖**。

### 1.9 Native AgentBench 与 LLM-as-a-judge

- 一句话：给 PaiCLI 自建 28 题、权重 100 的原生评测集，Candidate 在无网络容器里跑，宿主持有模型 key 并做证据门禁，独立 Python 脚本验题；另有可复用的评审库。
- 核心类：`eval/benchmark/BenchmarkCoordinatorMain.java`、`BenchmarkWorkerMain.java`、`DockerBenchmarkWorkerProcess.java`、`DockerBenchmarkVerifier.java`、`BenchmarkProviderEvidenceGate.java`、`BenchmarkFailureClassifier.java`、`relay/BenchmarkProviderRelay.java`；验题脚本 `src/main/resources/benchmark/*_verify.py`；设计与结果在仓库根 `benchmarks/paicli-native-agentbench-v0.1/`。评审库 `eval/LlmJudge.java`、`eval/PositionBalancedPairwiseJudge.java`。
- 关键设计点：
  1. 七类题：A 代码定位 4 题/8 分、B 工程修复 6/24、C 终端闭环 3/12、D MCP/Web/Browser 编排 5/20、E 长上下文与多 Agent 4/16、F 安全与控制 4/16、G 原创推理 2/4（`DESIGN.md`）。正式批次冻结 1M context、单次输出 16384。
  2. `DOCKER_RELAY` Worker 容器 `--network none --read-only --cap-drop ALL`、1g 内存、2 CPU，provider key 只留宿主，LLM 和 MCP 请求经 framed stdio relay（协议 v12）转回宿主；verifier 另起无网络只读容器，Candidate 退出后才物化隐藏验题包。
  3. 证据门禁区分“评测无效”和“有效 0 分”：resolved model、usage、单次输出上限、context cap、请求指纹任一无法证明记 `*_UNPROVEN`，属于 INFRA_ERROR 不计分并要求对称重跑；`NO_PROVIDER_CALL`、`PROVIDER_CALL_FAILED`、超时和进程错误是 Candidate 的有效失败。禁止 best-of-3。
  4. `LlmJudge` 让模型对每条 rubric 打 1–5 分并附证据，总分由 Java 算 `Σ(score×weight)×20/Σweight`，有 hardFailure 即不通过；`PositionBalancedPairwiseJudge` 同一对答案正反各评一次，两次结论不一致判 TIE 并标 `positionConsistent=false`。这两个类没有被任何 CLI 命令引用，是纯库。
- 当前状态：正式集 `NOT_INTEGRATED`、`formalScores=null`、`publishable=false`。文档口径 24/28 题已物化、原始权重 84/100；但 `FinalSourceRecipeCatalog.IMPLEMENTED_IDS` 已含 E2 共 25 题，`docs/paicli-agentbench-why-tutorial.md` 尾注也写 25 题，正文仍写 24/28，存在口径不一致。2026-09-05 起模型范围缩为 DeepSeek V4 Flash + GLM-5.3-Flash，新批次 168 次尚未开跑，用户明确暂停了评测。
- 已有真实诊断（非正式成绩）：8 题开发集两家都 8/8；D1 两家工具选对但回答带 Markdown 围栏严格失败，补强 `prompts/handoff.md` 后对称复测通过；D2 GLM 通过、DeepSeek 两轮因解释和围栏失败且提示补强无效；D3 首轮因 harness 把 `CASE-METADATA.json` 复制进输入被标为评测无效，修正后两家 100。
- commit：e8d8a16（08-25）LlmJudge；c086e4d（08-31）基础设施；2ce84ae（09-23）主体。
- 文档状态：**未覆盖**（toBeBetterJavaer 里搜不到 AgentBench、judge）。paicli 仓库内部有 `docs/paicli-agentbench-why-tutorial.md` 和 `docs/llm-as-a-judge.md` 两份草稿可作素材。

### 1.10 glob_files / grep_code 精确搜索

- 一句话：对标 Claude Code 的 Glob/Grep，代码定位默认走“glob 找文件 → grep 定位行 → read_file 读行段”，RAG 的 `search_code` 降为辅助。
- 核心类：`tool/CodeSearchEngine.java`、`RipgrepCodeSearchEngine.java`、`JavaCodeSearchEngine.java`，schema 在 `ToolRegistry.java` L438–463，输出组装 L586–664。
- 关键设计点：
  1. `grep_code` 参数 `regex` 默认 false（字面量）、`case_sensitive` 默认 true、`context_lines` ≤5、`max_results` 默认 50 上限 200、`head_limit` 默认 20 上限 50、`max_chars` 默认 24000（1000–60000）；`glob_files` 默认 50 上限 200。统一排除 .git、.paicli、target、node_modules、dist、build、coverage、.idea、.gradle。
  2. 优先 `rg --json --max-filesize 2M`，`rg --version` 2 秒内失败或执行异常时回退 Java 扫描（2MB 上限、前 4096 字节含 0 字节视为二进制）；rg 8 秒超时返回 partial。
  3. 超预算时输出 `partial: true` 和原因；`suggested_reads` 从命中的前 3 个不同文件生成 `read_file {offset: max(1,line-20), limit: 80}`，引导模型按行段读而不是整文件读。
- 评测：`docs/code-search-golden-set.md` + `CodeSearchGoldenSetTest`，强制 Java 回退、`max_chars=6000`，断言命中 `expectedPath:line`、存在 suggested_reads、按建议读回的 80 行包含 expectedText。
- commit：72a7e90（05-18）初版工具；c69be83（05-31）拆出搜索引擎和 golden set。
- 文档状态：**部分覆盖**。`paicli-interview-memory-context.md` 第 281–283 行只用两段话说明“优先 grep_code / glob_files / read_file，模糊查询才走 search_code”，没有讲 ripgrep 回退、预算、suggested_reads 和 golden set，也没有回答“为什么放弃 RAG 优先”。

### 1.11 ReAct 新鲜度 web_search 预检（已删除）

- 一句话：曾经在用户输入含“最新 / 当前 / 今天 / 2026 / latest”等词时，由代码强制先跑一次 web_search 注入结果，10 天后整段删除。
- 事实：9776310（06-01）在 `Agent.java` 加 `injectFreshnessWebSearchIfNeeded` 等三个方法和 base.md 的 “Freshness Policy（强制规则）”；96bc8b2（06-11）全部删除，提交说明未提；测试改名为 `AgentWebSearchDecisionTest`，现有用例断言“问当前 README 时 web_search 调用次数为 0”。
- 现状：没有替代的自动预检。每轮 system prompt 的 `## Runtime Context` 注入当前日期和时区（c69be83 引入），是否联网完全由模型决定，再由 TurnToolPolicy 约束。AGENTS.md 明确写了“不做基于关键词的自动 freshness 预检”。
- 文档状态：**未覆盖，也不需要单独写**。可以作为“关键词触发工具调用为什么是反模式”的反例素材，放进 TurnToolPolicy 或 Agent 决策类文章里。

### 1.12 TurnToolPolicy（按轮工具策略与 URL 授权）

- 一句话：每轮根据用户顶层原文决定暴露哪些工具、允许访问哪些 URL，策略拒绝不能靠换工具或换 provider 绕过。
- 核心类：`tool/TurnToolPolicy.java`（1041 行）；调用点 `Agent.java:862`、`SubAgent.java:561`、`PlanExecuteAgent.java:915`。
- 关键设计点：
  1. 两道闸：调用 LLM 前 `expose()` 过滤工具 schema；执行时 `execute()` 先逐个 `authorize()`，被拒调用生成 `🛡️ 工具调用已拒绝 [CODE]` 合成结果，其余交给 `executeTools()`，之后依次 observe、外部内容标记、超大结果卸载、`onPolicyToolResults` 回调。它在 HITL 审批和 PathGuard/CommandGuard 之前。
  2. URL 只有两个合法来源：用户顶层原文里正则提取的 URL，以及成功 `web_search` 结果的结构化 `discoveredUrls()`。搜索摘要正文、`web_fetch` 正文、浏览器快照、模型回复和工具参数都不能扩充授权；curl/wget/httpie/lynx 也受同一规则约束。
  3. Plan 并行任务和 Team worker 各用 `fork()` 出的策略副本，只有 DAG 声明的依赖分支能通过 `forkWithTrustedUrls` 继承 `searchResultUrls`，不从任务回复文本里解析 URL。共享 Chrome 下只有 Agent 自己 `new_page` 打开的页面可交互，浏览器工具批次持公平锁串行。
- 拒绝码只有 5 个：`NO_ACTION`、`WEB_FORBIDDEN`、`UNGROUNDED_URL`、`TOOL_NOT_ADVERTISED`、`MEMORY_EXTERNAL_CONTEXT`（最后一个 9fd726b 加入，外部内容污染后不让模型自发写记忆）。
- commit：e8d8a16（2026-08-25）引入；9fd726b（09-24）加记忆守卫。
- 文档状态：**未覆盖**。`paicli-websearch-webfetch.md`（05-06）早于它；`paicli-interview-tool-security.md` 第 08 题讲 prompt 注入时只给了通用五道防线，没有提到 PaiCLI 的 URL 溯源和按轮暴露。

### 1.13 ToolResultBoundary 不可信数据边界

- 一句话：所有工具结果回灌前包成 `<tool_result tool="x" trust="untrusted-data">…</tool_result>`，内容里伪造的标签被转义。
- 核心类：`tool/ToolResultBoundary.java`（52 行），调用点 `Agent.java:271`、`SubAgent.java:353`、`PlanExecuteAgent.java:790`，base.md 第 77–78 行声明标签内一律视为数据。
- 关键设计点：正则 `<(/?)(\s*)(tool_result)` 不区分大小写转义成 `&lt;`；工具名非 `[A-Za-z0-9_.:-]` 字符替换为 `_`。边界只改变模型看到的文本，**不产生任何授权**，URL 权限仍只看 `discoveredUrls`。详见 `memory-compaction.md` 3.9。
- commit：98e96d5（2026-09-23）。
- 文档状态：**未覆盖**。`paicli-interview-tool-security.md` 第 08 题“输入隔离和标记”讲的是通用思路（`<user_input>` 标签），可以直接换成 PaiCLI 的真实实现。

### 1.14 AgentBudget 停滞检测与无工具收尾

- 一句话：去掉固定迭代上限，默认只靠“连续 3 轮完全相同的工具调用”判停滞，命中任何预算后关掉工具让模型做一次“部分完成”收尾。
- 核心类：`agent/AgentBudget.java`；收尾实现 `Agent.java` L326–377、`SubAgent.java` L383–420、`PlanExecuteAgent.java` L798 起。
- 关键设计点：
  1. `DEFAULT_STAGNATION_WINDOW = 3`（`paicli.react.stagnation.window`，最小 2）；每轮签名是 `name|arguments;` 按调用顺序拼接，比较原始参数字符串不做 JSON 规范化；某轮没有工具调用就清空窗口。
  2. token 预算和硬迭代上限默认都是 `Integer.MAX_VALUE`，只有显式配置 `paicli.react.token.budget` / `paicli.react.hard.max.iterations` 才生效；判定顺序 停滞 → token → 迭代。
  3. 命中后追加一条要求按“已完成 / 已验证 / 未完成或阻塞 / 建议下一步”回答的 user 消息，用空工具列表调一次 `chat`，输出加 `⚠️ 部分完成` 前缀，不再回到循环。
- commit：a6fa3a8（04-26）引入；e8d8a16（08-25）改为无固定上限 + 无工具收尾。
- 文档状态：**已覆盖但过时**。`paicli-interview-agent-core.md`：
  - 第 111 行“`AgentBudget` 根据 `maxContextWindow()` 动态计算预算（默认取窗口的 80%）”、第 304 行“公式是 `maxContextWindow × 80%`”、第 388 行简历条目同样说法，都不成立；
  - 第 03 题“四层防护”没有停滞检测，第四层引用的 `ContextCompressor` 已在 c086e4d 删除（压缩部分归 `memory-compaction.md`）。
  - `ai/paicli-interview-advanced.md` 第 01 题“默认没有固定的 20 次迭代上限”是准确的。

### 1.15 Team 计划严格解析与 reviewer fail-closed

- 一句话：Team planner 的 JSON 计划按 Plan 同一套规则严格校验，reviewer 只有 JSON 布尔 `approved: true` 才算通过。
- 核心类：`agent/TeamPlanParser.java`、`TeamStructuredReply.java`、`TeamReviewVerdict.java`，使用处 `AgentOrchestrator.java`。
- 关键设计点：开启重复键检测和尾随 token 拒绝，只容忍一层外包 ```` ```json ```` 围栏；id 唯一非空、依赖必须引用已声明 id、Kahn 算法判环，任一不合法返回 `PLAN_INVALID`；reviewer 的字符串 `"true"`、缺字段、非 JSON 一律判不通过，去掉关键词兜底。每步最多重试 `MAX_RETRIES_PER_STEP = 2`。
- 注意：reviewer 调用本身出错、或超过重试次数时，仍“保留当前结果”并标记完成，fail-closed 只作用于能解析出的结论。与 Plan 的逐项对比见 `plan-execute.md` 第 13 节。
- commit：a0fd238、42bf855、ec1b70c（2026-09-24）。
- 文档状态：**未覆盖**（`paicli-multi-agent.md` 写于 05-06）。

### 1.16 ConversationLedger 原始会话账本

- 一句话：`conversationHistory` 是会被裁剪和压缩的发送视图，账本则把实际发送的每条消息 append-only 写进 JSONL，用于审计和取证。
- 核心类：`history/ConversationLedger.java`。
- 关键设计点：路径 `~/.paicli/history/raw/session-<毫秒>-<UUID>.jsonl`，目录 0700、文件 0600；每行含 schemaVersion、sequence、mode、actor、source、完整 message；`FileChannel` 追加后 `force(false)`，失败只记日志。`/clear`、压缩、图片裁剪只追加 `history_clear`、`compaction`、`view_image_prune` 边界事件，不改旧行。ReAct、Plan、Team、后台任务、微信通道共用。
- commit：e8d8a16（2026-08-25）。
- 文档状态：**未覆盖**（`ai/paicli-interview-advanced.md` 第 03 题只有一句“原始会话消息另有持久化账本”）。

### 1.17 LLM 请求重试策略

- 一句话：所有 OpenAI 兼容 provider 统一的有限重试，流式输出一旦交付给用户就不再重放。
- 核心类：`llm/LlmRetryPolicy.java`（包级私有），`AbstractOpenAiCompatibleClient.java`；评测用 `llm/LlmFailureClassifier.java`。
- 关键设计点：默认总尝试 3 次、基础 500ms、上限 30s、jitter ±20%；只重试 408/429/500/502/503/504 和瞬时网络故障；`Retry-After` 支持秒数和 HTTP-date，等待按 100ms 切片检查取消；OkHttp `retryOnConnectionFailure(false)` 防止隐式重放。SSE 没见到 `[DONE]` 或非空 `finish_reason` 视为中断；只要已向监听器推送过 reasoning 或 content，就直接抛错不重试。
- commit：e8d8a16（2026-08-25）；LlmFailureClassifier 2ce84ae（09-23）。
- 文档状态：**未覆盖**。

### 1.18 新模型接入

- 一句话：provider 从 5 月初的 GLM / DeepSeek / StepFun 三家扩到 8 家，统一继承 `AbstractOpenAiCompatibleClient`。
- 清单（`llm/`，`LlmClientFactory` 按 glm / deepseek / hunyuan / step / kimi / freellmapi / xfyun / agnes 分派）：

| Client | 默认模型 | 窗口 | 特殊处理 | 引入 |
|---|---|---|---|---|
| StepClient | step-3.5-flash | 256k | 模型名含 2603 时加 `reasoning_effort=high` | 2cbff45，05-09 |
| KimiClient | kimi-k2.6 | 256k | reasoning_content 回传 | bceb60b，05-10 |
| FreeLlmApiClient | auto，`localhost:5173/v1` | 128k | 本地聚合网关 | c69be83，05-31 |
| XfyunMaaSClient | Qwen3.6-35B-A3B | 128k | `lora_id` 请求头，`supportsTools()=false`，prompt 自动去掉工具段 | 96bc8b2，06-11 |
| AgnesClient | agnes-2.0-flash | 1M | 无 | b7ee842，06-23 |
| HunyuanClient | hy4-preview，TokenHub | 1M | `reasoning_effort=high`、include_usage、不收图片 | c086e4d，08-31 |
| GLMClient | 默认仍是 glm-5.1 | glm-5.3* 为 1M，其余 200k | glm-5.3* 走 `reasoning_effort=max`、`clear_thinking=false`、`tool_stream=true`；glm-5v* 走非 coding 端点 | GLM-5.3 分支 c086e4d |
| DeepSeekClient | deepseek-v4-flash | 1M | V4 高推理 `reasoning_effort=max`；SSE 强制 HTTP/1.1（96bc8b2）；正文 DSML 工具调用回转（2ce84ae），只接受单个完整 block 且工具名在本轮暴露列表内 | 高推理 c086e4d |

- 文档状态：**部分覆盖且过时**。`paicli-interview-multi-model.md`（06-01）第 01 题“四个 Provider 实现类共享一个基类”已不对（现在 8 个），接口示例缺 `supportsImageInput()`、`supportsTools()`；第 12 题只谈 DeepSeek V4 Flash、Step 3.5 Flash、GLM-5.1、Kimi K2.6，没有混元、GLM-5.3、Agnes、讯飞；“GPT-5 系列”与项目 CLAUDE.md 约定的当前一代模型口径不符。`paicli-multi-model.md` 讲 DeepSeek V4 原理，没有 DSML 回转和 HTTP/1.1 这两个工程坑。`paicli-xuexiluxian.md` 第 70 行只列到讯飞星辰。

### 1.19 Inline TUI / JLine 交互升级与状态栏 ctx

- 一句话：默认渲染从手写 DECSTBM 状态栏改为 JLine 4 的 LineReader + `Status` dock，并补上补全、高亮、输入历史、`@path` 展开和上下文 token 显示。
- 核心类：`render/inline/BottomStatusBar.java`、`InlineActivityDisplay.java`、`InlineRenderer.java`，`cli/PaiCliCompleter.java`、`PaiCliHighlighter.java`、`PaiCliHistory.java`、`LocalPathMentionExpander.java`。
- 关键设计点：
  1. `BottomStatusBar` 用 `Status.getStatus(terminal)` 托管底部两行，不再手写 `\n`、moveUp、`CLEAR_TO_EOS`；`AnsiSeq.setScrollRegion` 仍在代码里但已无调用。live thinking 区固定高度（最多 4 行 reasoning、250ms tick），只清自己写过的行；0a96208 试过独立 JLine `Display.update()`，因为会从错误位置向上清屏，第二天被 6473ef4 换掉。
  2. ctx = `conversationHistory` 估算 + 工具 schema 估算（中文 1.5 字符 1 token、其他 4 字符 1 token、每条消息加 4、图片按 bytes/768 夹在 256–4096），显示为 8 格进度条加百分比；`in/out/cache` 是最近任务的累计调用统计，二者分开。费用按 deepseek 输入 2 / 缓存 0.5 / 输出 8 元每百万、其余 5 / 1 / 15 估算。
  3. 输入历史写 `~/.paicli/history/input.history`，过滤密钥赋值、Bearer、私钥、base64 图片和 8000 字符以上的行；`@path` 展开文件上限 120000 字节、目录 80 项，逃逸项目根时保留原文。MCP 启动最多等 8 秒（`PAICLI_MCP_STARTUP_WAIT_SECONDS`），超时后台继续。
- commit：7749de1（05-12）、0a96208（05-12）、6473ef4（05-13）、c206b18（05-13）、2e70764（05-31）。
- 文档状态：**已覆盖但过时**。`paicli-interview-productization.md` 第 02 题“可以通过一条 `ESC[1;{n}r` 指令……PaiCLI 的做法是把终端底部留出 2 行不参与滚动”描述的是 05-13 之前的实现，文章写于 05-30 时已经换成 JLine Status dock；终端能力检测（至少 5 行 20 列、`PAICLI_NO_STATUSBAR`）仍准确。补全、高亮、输入历史脱敏、`@path` 展开、`/export`、`/compact` 命令均**未覆盖**。

### 1.20 OS 级命令沙箱（CommandSandbox）

- 一句话：`execute_command` 可选跑在 macOS Seatbelt 或 Linux bubblewrap 里，工作区可写、HOME 不可见、无网络。
- 核心类：`tool/CommandSandbox.java`、`CommandSandboxMode.java`、`CommandSandboxDetector.java`、`SeatbeltProfile.java`、`BubblewrapArguments.java`；黑名单 `policy/CommandGuard.java`。
- 关键设计点：
  1. `PAICLI_COMMAND_SANDBOX` 三档：`off`（默认）/ `auto`（探针 `/usr/bin/true` 3 秒内成功才启用，否则提示并回退直接执行）/ `required`（不可用时以 PolicyException 拒绝执行）。默认关闭的原因是沙箱里看不到 `~/.m2`、`~/.gitconfig` 且无网络，`mvn`、`npm install`、`git push` 会失败。
  2. Seatbelt profile `(deny default)`、`(deny network*)`，读只放行系统和运行时目录、工作区、`/` 本身（literal）和几个 `/dev` 设备，写只放行工作区和 `/dev/null`；bwrap 用 `--unshare-all --die-with-parent --new-session`，系统目录 `--ro-bind-try`，工作区 `--bind`，`/tmp` 用 tmpfs，不挂 HOME。
  3. HOME/TMPDIR/XDG 重定向到工作区 `.paicli-command-sandbox/`（自动写 `.gitignore`），并从子进程环境里删掉 `*_API_KEY`、`*_AUTH_TOKEN` 等变量；命令始终作为单个 argv 交给 `/bin/bash -c`。
- CommandGuard 仍是 9 条正则黑名单（sudo、`rm -rf /|~|$HOME`、mkfs、`dd of=/dev/`、fork bomb、curl/wget 管道到 shell、`find /`、`chmod -R 777 /`、关机类），类注释说在 HITL 之前，代码里实际在 HITL 审批之后执行。已知问题：Seatbelt 内 `java -version` 以 exit 139 退出，对应用例仍失败。
- commit：2ce84ae（09-23）只给评测用的 Seatbelt；9fd726b（09-24）交互式三档 + bubblewrap。
- 文档状态：**未覆盖**。`paicli-interview-tool-security.md` 和 `paicli-hitl.md` 只讲 HITL 与 CommandGuard 黑名单。

### 1.21 交叉项（已由其他调研负责，这里只标文档状态）

| 功能 | commit | 调研位置 | Java 文章覆盖 |
|---|---|---|---|
| ToolResultOffloader 工具输出卸载 | 98e96d5，09-23 | memory-compaction.md 3.4 | 未覆盖 |
| ToolResultClearer 旧工具结果清理 | 9fd726b，09-24 | memory-compaction.md 3.5 | 未覆盖 |
| ExternalContextTracker 外部内容防护 | 9fd726b，09-24 | memory-compaction.md 2.11 | 未覆盖 |
| AutoFactExtractor 自动事实提取 | ea8e05a，09-24 | memory-compaction.md 2.10 | 未覆盖 |
| MemoryConflictDetector / 新鲜度 | 98e96d5，09-23 | memory-compaction.md 2.8–2.9 | 未覆盖 |
| edit_file | 36a2677，09-23 | edit-file-tools.md | 见该文 |

## 2. 按文章汇总的过时点

| 文章 | 位置 | 问题 |
|---|---|---|
| paicli-interview-agent-core.md | 第 03 题第 111 行、第 10 题第 304 行、简历第 388 行 | `AgentBudget` 按窗口 80% 算预算的说法已失效；缺停滞检测和无工具收尾；`ContextCompressor` 已删除 |
| paicli-interview-productization.md | 第 02 题 | 手写 DECSTBM 留 2 行已换成 JLine Status dock |
| 同上 | 第 03 题 | “发现编译错误”应为“发现语法错误”，JavaParser 查不出类型错误 |
| 同上 | 第 10 题 | warning/info 着色在实现里不会出现，只有 ERROR |
| 同上 | 第 11 题 | “默认保留 50 轮，超出自动清理”不成立，没有裁剪逻辑 |
| 同上 | 第 07、12 题 | SSE 是一次性回放，不是实时推送；漏了 `turn.failed` |
| 同上 | 简历第 4 条 | at-least-once 只对 `/task` 成立 |
| 同上 | 全篇 | 没有 `revert_turn` |
| paicli-interview-prompt-skill.md | 第 02 题 | 组装顺序缺 Runtime Context 和 PAI.md；approvals 实际只用 suggest；handoff 不是“交接信息” |
| ai/paicli-interview-advanced.md | 第 03 题 | `/task status <id>` 不存在，应为 `/task log <id>` |
| 同上 | 第 04 题 | `LspManager.reportPostEdit()` 不存在，应为 `runPostEditLspHook` |
| paicli-interview-multi-model.md | 第 01 题 | “四个 Provider 实现类”已是 8 个，接口缺 `supportsImageInput()` / `supportsTools()` |
| 同上 | 第 12 题 | 模型列表停在 6 月初；“GPT-5 系列”不符合当前一代口径 |
| paicli-image-input.md | 第 316 行 | 历史图片占位文案已变；缺 `supportsImageInput()` 降级 |

## 3. Top 8 选题建议

排序依据：面试出现频率、技术深度、能否和 Claude Code / Codex 直接对照、读者能不能带走可复用的做法。

1. **工具结果是数据不是指令：URL 溯源授权 + 不可信数据边界**（TurnToolPolicy + ToolResultBoundary + MEMORY_EXTERNAL_CONTEXT）。亮点是把 prompt 注入防御从“提示词里写一句别听”落到代码授权，URL 只能来自用户原文或 web_search 结构化结果，并行分支按 DAG 继承凭据，可以对照 Claude Code 的 WebFetch 域名授权和 Codex 的外部上下文禁写记忆。建议写成**面试题**（顺手替换 tool-security 第 08 题的通用答案），素材够再扩成深度拆解。
2. **给 Agent 的命令加 OS 级沙箱：Seatbelt 与 bubblewrap**（CommandSandbox）。Claude Code 和 Codex 都用这两套机制，PaiCLI 的 off/auto/required 三档、探针 fail-closed、HOME 重定向、剥离密钥环境变量、默认关闭的取舍都是现成讲点，还有 Seatbelt 下 bash 缺 `/` 读权限会 SIGABRT 的真实坑。建议写成**教程**，另抽 2 道面试题（“黑名单为什么不是主防线”“沙箱为什么默认不开”）。
3. **怎么评测一个 Agent：Native AgentBench + LLM-as-a-judge**。亮点是“评测无效”和“有效 0 分”的区分、provider key 留宿主的无网络容器、独立 Python 验题、禁止 best-of-3、位置平衡成对评审，外加 D1 因 JSON 围栏严格失败、D3 因 harness 自己污染输入被判无效这类真实案例。建议写成**深度拆解教程**，另出一道面试题“你怎么评估自己做的 Agent”。
4. **为什么 Claude Code 用 grep 不用向量检索：glob_files / grep_code 的预算与引导**。这是高频面试题，PaiCLI 有完整的对照材料：RAG 降级为辅助、ripgrep 回退、`partial` 与 `suggested_reads` 引导模型按行段读、golden set 回归测试。建议写成**面试题**。
5. **Agent 死循环与预算：停滞检测 + 无工具最佳努力收尾**（AgentBudget）。“Agent 死循环怎么办”几乎必问，而现有 agent-core 文章的答案（窗口 80% 预算）已经过时。新答案是去掉固定上限、连续 3 轮相同调用判停滞、命中后关掉工具要一份四栏部分完成报告。建议写成**面试题**，同时修订 agent-core 第 03、10 题。
6. **LLM 结构化输出不可靠怎么兜底：fail-closed 解析**（TeamPlanParser、TeamReviewVerdict、handoff.md 严格格式、DeepSeek DSML 回转）。亮点是一条原则贯穿四处：解析不出来就判失败，不做关键词猜测，不静默删依赖；再配上 D1/D2 评测里模型给 JSON 加围栏导致严格失败的实测。建议写成**面试题**。
7. **流式调用的重试边界：已经输出给用户的内容不能重放**（LlmRetryPolicy）。题目小但很能区分候选人：哪些状态码重试、`Retry-After` 两种格式、SSE 缺 `[DONE]` 判中断、已交付即不重试、关闭 OkHttp 隐式重连。建议写成**面试题**。
8. **把 Agent 接进微信：iLink 通道与无人值守的默认拒绝策略**。读者兴趣高，也有“没有人能点审批时 HITL 怎么办”这个好问题，可以对照 OpenClaw 的 IM 接入思路。写之前要把几处未生效的设计讲清楚：两份白名单恒为空、每日 turn 上限和单 turn 预算没有读取点、媒体只记元数据。建议写成**教程**。

候补：Git Side-History + revert_turn（现有文章需修订，补模型自主回滚和“没有自动清理”）；PAI.md 与 `/init`（对照 CLAUDE.md 分层加载，可作面试题）；ConversationLedger 发送视图与原始账本分离（适合并入压缩类文章）；Better Harness（适合做一次产品实测文）；Runtime API（现有文章需修订 SSE 描述）。

## 4. 其他发现

- ROADMAP 第 17、18、19、21 期正文与实现有多处出入（真实 LSP、快照裁剪、approvals 分层、接口不声明图片能力），写文章时以代码为准，不要引用 ROADMAP 的“功能迭代”条目。
- AGENTS.md 的“项目快照”一节写明 2026-09-05 起用户暂停评测，且当时 TEAM 宿主接线“未编译/测试、当前源码不是可构建检查点”；之后 9 月 7 日至 9 日又有补齐记录。写 AgentBench 相关文章前，建议先在本地 `mvn clean package` 确认 HEAD 可构建。未确认 HEAD 当前是否可构建。
- 新鲜度预检“加了又删”只有代码证据，提交说明没有解释删除原因。如果要写成反例，删除动机需要向作者本人确认。
