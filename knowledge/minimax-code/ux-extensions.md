调研日期 2026-09-25，基于 minimax-code commit 8b55164

# MiniMax Code 调研：产品体验与扩展机制

> 范围：TUI / 会话 / 模型接入 / 多模态 / 扩展机制 / 无头模式 / 分发升级与配置 / 工程化。
> Agent 主循环、工具、权限决策、上下文压缩、记忆、子代理由另一路负责，这里只在必要处引用。
> 所有路径相对仓库根 `minimax-code/`。拿不准的地方标注“未确认”。

仓库定位：MiniMax Code（命令 `mcode`，npm 包 `@minimax-ai/code`）是内部 monorepo 的“公开投影”，公开范围 = 终端 TUI + Headless CLI（`mcode exec`）+ ACP server；桌面版（Electron）源码不在仓库内。根 `package.json` 版本 0.5.4，README 声称目标“0.4.12 源码预览”。Node 22.19+/24.2+/25/26，pnpm 9.12.0。

整体链路（`docs/architecture.md`）：

```
TUI / exec / ACP → CliService → local Applications → Session / Turn / Agent services → Pi / model providers / local tools
```

---

## 1. TUI

### 1.1 框架：不是 Ink，是 fork 的 Pi TUI 引擎

- 引擎位于 `packages/tui/src/tui/engine/`，来自 earendil-works/pi 的 `packages/tui/src`（Pi 0.84.2，commit `836aee6d…`，2026-08-18 导入），MCode 自己持有源码。
- `engine/UPSTREAM.md` 记录来源，`engine/BASELINE.json` 记录每个文件的上游哈希与适配后哈希，`engine/LOCAL_CHANGES.md` 是“fork 差异台账”（L001–L030），每条都写明：Pi 无法满足的产品约束、最小改动、用户可见影响、验证证据、何时可以删掉这条差异。
- 产品代码只允许 import `engine/public.ts`，不能直接引实现文件。
- 渲染方式：差分渲染（Pi 的 differential renderer）。支持两种模式：`regular`（默认，主屏 + 原生 scrollback）和 `fullscreen`（alt-screen，支持鼠标选择/搜索），通过 `--tui-mode` 或 `tui/tui-settings.json` 的 `tuiMode` 切换（`packages/tui/src/host/tui-settings.ts`）。
- 其他依赖：`marked` 解析 Markdown、`cli-highlight` 做语法高亮、`chalk` 着色、`get-east-asian-width` 处理 CJK 宽度、`@mariozechner/clipboard`（可选）读剪贴板图片。

设计亮点：“fork 差异台账”这种做法值得借鉴。每条差异都要写清楚删除条件，还有 `verify-tui-engine-baseline.mjs` 校验基线，这样 fork 不会慢慢失控。

```text
| L026 | Streaming display | components/markdown.ts | Cache stable blocks, retain two trailing blocks, and fall back to full parsing for reference definitions. | ...
| L027 | Continuous resize | tui.ts and tui-main-screen.ts | Add a resize hook, immediately draw the visible tail, and replay history after 150ms. | ...
```

### 1.2 布局

`packages/tui/src/tui/shell/` 是外壳层：

| 文件 | 作用 |
| --- | --- |
| `chat-layout.ts` / `frame.ts` / `surface-host.ts` | 主布局：transcript 滚动区 + Composer + 状态栏；面板统一由 Surface Host 管理 |
| `composer.ts` | 输入框（Pi Editor + 产品层 Draft 持久化、附件、占位符） |
| `activity-line.ts` | 运行中活动行：spinner、耗时、模型重试计数（`tui-activity-line.test.ts`: “renders a sanitized model retry counter as transient activity”） |
| `status-line-items.ts` / `status-line-config.ts` / `workspace-status-line.ts` | 底部状态栏 |
| `todo-panel.ts` / `task-panel.ts` / `follow-up-panel.ts` | Todo、后台任务、排队消息 |
| `inline-panel.ts` / `regular-feature-presenter.ts` | 内联选择器和全屏功能面板 |
| `tips.ts` / `welcome/` | 空闲时的 Tips 与欢迎页（`tui.showTips` 默认 true） |

- **活动折叠**：transcript 单元格（`transcript/model.ts`）有 `collapsed | preview | expanded` 三种显示模式。单元格类型包括 `thinking / tool / shell / diff / delegation / agent-team / permission / question / todo / compaction / usage / final-summary` 等。`Ctrl+O`（`composer.toggle-details`）切换 Thinking、工具输出和 diff 的展开/折叠，`Ctrl+T` 切换完整 Todo 列表。
- **Diff 展示**：`transcript/presentation/structured-preview.ts` 把 unified diff 逐行着色。`+` 行用 `diffAddedBg` 背景，`-` 行用 `diffRemovedBg`，`@@` 用 accent，文件头用 muted，内容再按文件扩展名做语法高亮。超出行数时显示 “N lines hidden”。

```ts
function colorDiffLine(line: string, highlightedContent: string, width: number): string {
  if (line.startsWith('+') && !line.startsWith('+++')) {
    const content = `${chalk.bold.hex(colors.success)('+')}${highlightedContent}`;
    return applyBackgroundToLine(content, width, chalk.bgHex(colors.diffAddedBg));
  }
  if (line.startsWith('-') && !line.startsWith('---')) {
    const content = `${chalk.bold.hex(colors.error)('-')}${highlightedContent}`;
    return applyBackgroundToLine(content, width, chalk.bgHex(colors.diffRemovedBg));
  }
  if (line.startsWith('@@')) return chalk.hex(colors.accent)(line);
```

- **权限选择器**：`packages/tui/src/tui/features/interaction/permission-picker.ts`（700 行）。有三个选项：`1 Allow for this conversation`、`2 Always allow matching actions`（请求不支持时隐藏）、`3 Deny and guide MCode`（可以附带文字反馈，引导模型换做法）。数字键直选；选 Always 时还要二次确认，确认页展示“将保存的确切规则范围”；`Ctrl+E` 展开请求详情；`Ctrl+C` 停止运行。另有 `permission-mode-picker.ts`（Ask / Auto / Full access）、`plan-review-panel.ts`（Plan 审阅）和 `questionnaire-picker.ts`（ask_user 问卷）。

```ts
    // The numbered actions are intentionally direct: approval should not
    // require a user to hunt for a focus ring when a tool is waiting.
    if (/^[1-9]$/u.test(data)) {
```

- **面板关闭后恢复聊天**：`docs/tui-capabilities.md` 的 “Feature panels and chat restoration” 描述了主屏模式下的恢复策略：关闭或收缩面板后恢复露出的聊天行；尽量不重建历史，以免清掉 shell scrollback；Apple Terminal 下用原地擦除，避免残影进入 scrollback。
- **Follow-tail**：`docs/superpowers/specs/2026-09-23-tui-follow-tail-design.md`。用户上滚阅读时，新 token 不再把视口拉回底部；提交消息或切换会话时重新开始跟随底部。

### 1.3 快捷键

默认绑定定义在 `packages/tui/src/tui/shell/keybindings.ts`（产品层）和 `packages/tui/src/tui/engine/keybindings.ts`（编辑器/选择器层，Emacs 风格：`Ctrl+A/E/B/F`、`Alt+B/F`、kill-ring yank 等）。

| Key | ID | 作用 |
| --- | --- | --- |
| `Enter` | `run.submit-guidance` | 空闲时发送；运行中把当前 Draft 作为引导注入当前响应（steer） |
| `Alt+Enter` | `run.queue-draft` | 运行中排队到下一轮 |
| `Shift+Enter` | — | 换行 |
| `Alt+↑` / `Shift+←` | `run.restore-waiting-*` | 把最近一条排队消息拿回 Composer |
| `Esc` | `app.interrupt` | 关闭面板或中断；模型回复前中断会把消息放回输入框 |
| `Ctrl+C` | `app.clear` | 清空 Composer，连按两次退出 |
| `Ctrl+D` | `app.exit` | Composer 为空时退出 |
| `Ctrl+Z` | `app.suspend` | 挂起回到 shell |
| `Ctrl+/` | `app.toggle-side-session` | 在主会话和 `/btw` 旁路会话之间切换 |
| `Ctrl+V`（Win `Alt+V`，mac `Super+V`） | `composer.paste-image*` | 粘贴剪贴板图片或视频文件 |
| `Ctrl+G` | `composer.external-editor` | 用外部编辑器编辑 |
| `Ctrl+R` | `composer.search-history` | 搜索 prompt 历史 |
| `Ctrl+T` | `composer.toggle-tasks` | 完整 Todo 列表 |
| `Ctrl+O` | `composer.toggle-details` | 展开/折叠 Thinking、工具输出和 diff |
| `Shift+Tab` | `composer.toggle-plan` | Plan Mode 开关 |
| `Alt+M` | `composer.cycle-permission` | 在 Ask / Auto / Full access 之间循环 |
| `Ctrl+-` | `composer.restore-draft` | 撤销上一次清空 Draft |
| `PageUp/PageDown` | `interaction.scroll-*` | 滚动当前交互面板 |
| `Ctrl+U`（欢迎页） | `welcome.resume-codex` | 接续最近的 Codex 会话 |

- 输入前缀：`/` 命令，`@` 引用文件、目录或插件，`!cmd` 执行 shell 并把结果写入上下文，`!!cmd` 执行但不写入上下文（`tui/commands/bash-input.ts`）。
- 自定义快捷键：`<data-dir>/tui/keybindings.json` 是扁平的 `{ id: key | key[] }` 映射（`src/host/tui-keybindings.ts`），也可以在 TUI 里用 `/hotkeys` 编辑。注册表在注册时检测同作用域冲突；文件无效时整份忽略（fail closed），保留默认绑定。
- `docs/installation.md` 专门写了 Ghostty 下 `Option+M` 输出 `µ` 的问题及两种解法（`macos-option-as-alt`，或者用 `/hotkeys` 改绑到 `ctrl+x`）。

### 1.4 斜杠命令完整清单

定义在 `packages/tui/src/tui/commands/catalog.ts`（描述统一用英文）。每条命令都有元数据：`category`、`discoverability`（`primary / contextual / search-only`）、`runAvailability: 'idle'`（运行中不可用，会提示“先停止”）、`visibleWhen`（上下文可见性）、`argumentHint`（带参数提示的命令才接受参数）以及 `getArgumentCompletions`（参数补全）。

| 命令 | 说明 |
| --- | --- |
| `/help` | 显示命令与快捷键 |
| `/new`（别名 `/clear`） | 在当前工作区开新会话 |
| `/update` | 检查并安装更新（search-only） |
| `/changelog` | 查看随包附带的更新历史 |
| `/sessions [query]`（别名 `/resume`） | 搜索、恢复和管理会话 |
| `/goal <objective \| pause/resume/edit/clear/help/budget=>` | 启动或管理会话 Goal（带 token 预算的自动续跑） |
| `/plan [on\|off\|status\|view]` | 切换 Plan Mode，或查看最新 Plan |
| `/review` | 审查 staged、unstaged 和 untracked 的本地改动 |
| `/parent` | 从子代理会话或旁路会话回到父会话 |
| `/btw [question]`（别名 `/side`） | 在不打断主任务的情况下开临时旁路会话提问 |
| `/history` | 浏览会话历史（contextual） |
| `/fork` | 从历史某点分叉出新会话 |
| `/rewind` | 回退到历史某点（带预览与范围选择） |
| `/edit` | 编辑之前发出的消息并重跑 |
| `/retry` | 失败后重发上一条消息 |
| `/rename [title]` | 重命名会话 |
| `/compact [instructions]` | 压缩当前对话 |
| `/status` | 账号与模型状态 |
| `/tasks` | 查看后台代理与 Runtime 任务 |
| `/permission [status\|ask\|auto\|full]` | 选择或查看权限模式 |
| `/login` / `/logout` | 登录或登出 MiniMax 账号 |
| `/doctor` | 检查本地配置文件（search-only） |
| `/context` | 查看 Runtime 持有的上下文快照 |
| `/steer <message>` | 不中断地引导当前工作 |
| `/feedback <message>` | 审阅后提交脱敏反馈（search-only） |
| `/checkin` | 领取 MiniMax 账号每日奖励 |
| `/settings` | TUI 设置 |
| `/statusline` | 选择、排序并预览状态栏条目 |
| `/theme` | 主题与明暗外观（search-only） |
| `/hotkeys` | 查看和自定义快捷键 |
| `/reload` | 重新加载 TUI 配置与插件 |
| `/model [filter]` | 选择模型 |
| `/provider` | 查看 provider、编辑 MiniMax 凭据 |
| `/plugins [filter]` | 浏览、安装、启用和移除插件 |
| `/skills [filter]` | 列出内置和用户 Skills（search-only） |
| `/mcp [filter\|reload]` | 查看 MCP 能力与项目配置（search-only） |
| `/add-dir <path>` | 添加可读写的额外工作区目录（search-only） |
| `/usage` | 会话用量（含 cache Read/Fresh/Write） |
| `/export [path.md]` | 把会话导出为 Markdown |
| `/transcript` | 浏览、搜索、检查完整对话 |
| `/copy` | 把最后一条回复作为 Markdown 复制 |
| `/queue` | 管理排队消息 |
| `/quit`（别名 `/exit`） | 退出 |
| 内部保留 | `/archive /config /decision /allow /always /deny /permissions /stop`（不出现在补全中，只作兼容或键盘回退） |
| 动态 | 已启用的 Skills 以 `/skill-name` 或 `/plugin:skill` 形式出现，内置命令优先；`mcode init` 实际发送 `/init` Skill |

旁路会话（side mode）下只允许只读白名单：`help changelog context status usage export transcript copy parent`。其他命令会提示“先按 Ctrl+C 回到主会话”。

### 1.5 /model 选择器与收藏（f4e2285）

- 实现：`packages/tui/src/tui/features/model/picker.ts`（UI），`packages/local-runtime-v2/src/service/model-system/catalog/model-favorites.ts`（存储）。
- 选择器按 provider 分组，可以同时选 effort（`features/model/effort.ts`）、thinking 开关（`thinking.ts`）和上下文窗口（`context-window.ts`）。
- `Ctrl+S` 收藏或取消收藏当前模型。收藏的模型进入顶部 `★ Favorites · N` 分组，按收藏先后排序，在原 provider 分组里也保留星标。当前模型如果是收藏项，打开选择器时焦点落在 Favorites 行。搜索同样过滤 Favorites。
- 收藏只记录 `{providerId, modelId}`，存在本地 runtime SQLite 的 preferences 表，key 为 `model-favorites`。值损坏时退化为空列表或部分列表；目录里已不存在的模型会被隐藏，下次写入时如果目录读取成功就剪枝。UI 先乐观更新，保存失败时回滚并提示 “Couldn't update favorites. Press ctrl+s to retry.”。宿主没有收藏存储时隐藏快捷键。

```ts
  set(input: SetModelFavoriteInput, catalog?: readonly ModelFavoriteRef[]): ModelFavoriteRef[] {
    const target = toRef(input);
    if (!target) return this.list();
    const known = catalog ? new Set(catalog.map(refKey)) : undefined;
    const current = this.list();
    const exists = current.some((entry) => refKey(entry) === refKey(target));
    const next = current.filter(
      (entry) =>
        (refKey(entry) === refKey(target) ? input.favorite : true) &&
        (!known || known.has(refKey(entry)) || refKey(entry) === refKey(target)),
    );
    // Starring an existing favorite is idempotent and keeps its position.
    if (input.favorite && !exists) next.push(target);
```

- 启动时可指定模型：`mcode -m <provider>/<model>[#variant]` 只作用于这个 Session，不改全局默认；`/new` 回到默认模型。

### 1.6 会话标题与终端通知（8b55164）

- 文件：`packages/tui/src/tui/platform/terminal-title.ts`、`terminal-notifications.ts`、`terminal-capabilities.ts`，配置解析在 `packages/config/src/tui-config.ts`。
- 终端标题格式为 `Needs approval | Fix login | MCode`。条目可配置为 `status / session-name / project-name / app-name`，默认 `[status, session-name, app-name]`，设为 `null` 或 `[]` 表示关闭。未命名会话显示为 `项目名 (会话ID前8位)`。退出或挂起时清除标题，恢复时重新写入。TUI 只管理自己写入的标题，不知道之前 shell 的标题。
- 状态文案：`Ready / Working / Needs approval / Needs input / Done / Failed / Stopped / Error`。
- 通知事件：`turn-complete / turn-failed / permission-required / question-required`；`when: unfocused（默认）| always | never`；`method: auto | osc9 | osc777 | bel`。
- auto 模式按终端选择后端：kitty 用 OSC 99，Ghostty/iTerm2/WezTerm/Warp 用 OSC 9，cmux 用 OSC 777，本地 Windows Terminal 或 WSL interop 用 PowerShell Toast，其余情况用 BEL。在 tmux 里自动包成 passthrough 序列。通知会去重（最多保留 256 个 key），turn-complete 要等队列清空才发。焦点状态通过 CSI 1004 focus report 获取（引擎差异 L028）。

```yaml
tui:
  terminalTitle: [status, session-name, app-name]
  notifications:
    when: unfocused
    method: auto
    events: [turn-complete, turn-failed, permission-required, question-required]
```

```ts
  switch (capabilities.terminalId) {
    case 'cmux':
      return 'osc777';
    case 'kitty':
      return 'osc99';
    case 'ghostty':
    case 'iterm2':
    case 'wezterm':
    case 'warp':
      return 'osc9';
```

### 1.7 主题、状态栏、Markdown、流式思考

- **主题**：文档 `packages/tui/docs/theme-config.md`（中文），代码 `src/tui/theme/`。内置 `minimax`（默认）、`midnight`、`graphite`、`aurora` 四套，每套都有深色和浅色调色板。默认根据终端证据（OSC 11 / DEC 2031）自动判断明暗。`/theme` 可以实时预览，按 `a` 在自动/浅色/深色之间循环。选择结果写入 `<data-dir>/tui/tui-settings.json`。自定义主题放在 `<data-dir>/tui/themes/*.json`，支持热重载。有测试对所有主题做 WCAG AA 对比度回归（`test/unit/tui/theme/palettes.test.ts`）。
- **状态栏**：文档 `packages/tui/docs/status-line-config.md`。可选条目有 `current-dir / session-title / git-branch / review-link(PR/MR) / plan-mode / approval-mode / model-with-reasoning / model / context-window / subagent / token-quota / cache-read-ratio / context-remaining / context-meter / custom-command / build-mode`。其中 `build-mode` 是独占的机器可读 `[V]` 协议，供自动化读取状态。`custom-command` 会运行外部命令，把 JSON 喂给 stdin，取 stdout 的第一行显示（超时 500–30000ms，默认 5000ms；刷新间隔最小 10s；块模式最多 1–5 行）。状态栏配置在 `config.yaml` 的 `tui.statusLine`，未知 ID 被忽略，`[]` 表示隐藏整行。
- **Markdown**：复用 Pi 引擎的 `engine/components/markdown.ts`，支持 LaTeX（`engine/latex.ts`）和终端图片（`engine/terminal-image.ts`，kitty/iTerm 协议）。MCode 的本地差异：紧凑的代码块外框（L007）、链接标签单独着色（L029）、流式渲染缓存（L026：已稳定的块缓存，只重解析末尾两个块）。
- **流式思考**：`thinking` 单元格默认折叠或显示预览，`Ctrl+O` 展开全文。测试 `test/unit/tui-thinking-preview.test.ts` 验证了两件事：delta 持续流入时，着色布局的工作量有上限；长思考预览之后，展开、transcript 搜索和复制仍然正常。模型的 thinking 开关由目录中的 `thinking_config.mode`（`switchable / forced_on / forced_off / hidden`）决定（`features/model/thinking.ts`）。
- **i18n**：部分功能带 `copy.en.ts` / `copy.zh-Hans.ts`（composer、session-mutation），内置命令描述固定为英文。

---

## 2. 会话

- **数据目录**：默认 `~/.minimax`。选择 profile 时为 `~/.minimax-<profile>`，可以用 `MINIMAX_DATA_DIR` 或 `MAVIS_DATA_DIR` 覆盖（`packages/tui/src/runtime/data-dir.ts`、`packages/config/src/data-dir.ts`）。profile 通过 argv 里的 `--profile <name>` 读取（`config.ts` 中的 `cliArgValue("profile")`），但它是否作为公开 CLI 选项暴露：未确认。
- **会话持久化格式**：`~/.minimax/v2/` 下（`packages/shared/src/local-runtime-paths.ts`、`packages/local-runtime/src/persistence/layout/v2-session-artifacts.ts`）：
  - `v2/sessions/YYYY/MM/DD/<sessionDir>/manifest.json | ledger.jsonl | display.jsonl | snapshot.json | reports/`
  - `ledger.jsonl` 是运行账本，`display.jsonl` 是展示用 transcript（schema v1），`snapshot.json` 是最新快照。
  - `v2/sqlite/runtime-state.sqlite`（运行态和偏好，包括模型收藏）、`session-index.sqlite`（会话索引）、`usage-state.sqlite`（用量）、`legacy-import.sqlite`。
  - 数据库用 better-sqlite3 + drizzle-orm，有迁移与备份机制（`packages/local-runtime-v2/src/infra/db/`）。
- **resume / continue**：
  - `mcode --continue`（`-c`）恢复当前工作区最近的会话；`mcode --session <id>` 打开指定会话，只写 `--session` 不带 id 则打开选择器；`--resume <id>` 是隐藏兼容选项。三者互斥（`packages/tui/src/cli/contract.ts`）。
  - `mcode exec --session <id>` 或 `--continue` 也可以在 headless 模式下续跑。
- **多会话管理 `/sessions`**：`packages/tui/src/tui/features/session/manager.ts`，键盘优先。输入即搜索；`Ctrl+A` 在当前工作区和全部会话之间切换；`Tab` 在 active 和 archived 之间切换；`Ctrl+N` 新建；`Ctrl+R` 重命名；`Ctrl+D` 归档或恢复（需确认）；`Ctrl+L` 加载更多；`Enter` 切换到选中会话。
- **会话变更**：`/fork`、`/rewind`（带预览面板和范围选择器，见 `features/session-mutation/`）、`/edit`、`/retry`、`/history`。
- **历史搜索**：`Ctrl+R` 搜索 prompt 历史（`features/history/search-panel.ts`）；`/transcript` 在全屏里浏览、搜索和检查完整对话（alt-screen 搜索索引有缓存，见 L025）。
- **导出**：`/export [path.md]` 导出 Markdown（`src/tui/transcript/export.ts`）。只导出 user 和 assistant 消息，导出前做凭据脱敏（`redactTuiSensitiveText`）；`/copy` 复制最后一条回复。
- **旁路会话 `/btw`**：继承已持久化历史里“最近一段完整前缀”（未完成的工具调用组整组排除），分叉点在创建前就固定；不出现在 `/sessions` 列表中；沿用主会话的权限模式。
- **会话标题**：`config.sessionTitle` 控制自动生成（用 `defaultLightModel` 这类轻量模型），细节未深入确认。
- **Codex 接续**：欢迎页检测到最近的 Codex 会话后提示 `Ctrl+U`，内置 Skill `resume-codex` 负责安全接续 Codex CLI 或 VS Code 会话（`packages/tui/src/tui/controller/product/codex-handoff-flow.ts`、`packages/local-runtime/assets/skills/resume-codex/`）。

---

## 3. 模型接入

### 3.1 Provider 类型

`packages/tui/src/provider/contract.ts`：

```ts
export const MCODE_PROVIDER_API_FORMATS = [
  'anthropic-messages',
  'openai-completions',
  'openai-responses',
] as const;
export type McodeMiniMaxModelSource = 'token_plan' | 'minimax_api_key';
export type McodeProviderKind = 'codex-oauth' | 'minimax-oauth' | 'minimax-api-key' | 'custom';
```

- **MiniMax 账号**：`mcode login [--region cn|global] [--no-browser]` 走浏览器 OAuth（`packages/oauth-core`），使用 Token Plan 额度。
- **MiniMax 官方 API Key**：`mcode provider set-minimax-key --api-key-env X`，存到 `config.yaml` 的 `minimax_api`。`mcode provider use token-plan|api-key` 切换来源（`minimaxModelSource`）。
- **自定义 provider（BYOK）**：`mcode provider add --name --base-url --api-format --model(可重复) --api-key-env --context-limit --output-limit --support-image --use`，存到 `config.yaml` 的 `custom_provider.<key>`。`--use` 会先用第一个模型做连通性测试，成功才保存并设为默认。未知模型默认上下文 200,000、输出 16,384。
- **ChatGPT/Codex OAuth**：`packages/local-runtime-v2/src/service/model-system/codex-oauth.ts`，支持 `browser` 和 `device_code` 两种登录，凭据写入 profile 的 `codex-auth.json`，从 `chatgpt.com/backend-api/codex/models` 发现模型。
- **已知 provider 预设**：来自 models.dev（`catalog/provider-presets/`）。`/model` 里的 “+ Add 3rd-party provider…” 引导填写；Z.AI 和智谱区分 Coding Plan 与 API；`Ctrl+E` 可以改 Base URL，测试不通过就不保存，也不会自动换 endpoint。
- **特定 endpoint 的身份头**：OpenRouter 自动加 attribution 头；OpenCode Go 加 `x-opencode-session`（`model-system/README.md`）。
- **中转鉴权**：`anthropic-messages` 默认发 `x-api-key`；遇到要求 Bearer 的中转，在 `custom_provider.<id>.options.headers` 里显式加 `Authorization`。

### 3.2 配置与切换

- 配置文件是 `<data-dir>/config.yaml`，POSIX 下权限强制 0600，加载时去掉 group/other 权限。`--api-key-env` 读取当前环境变量的值后以明文存入，不保存对环境变量的引用。
- 默认模型字段：`defaultModel`（`providerID/modelID`）、`defaultModelVariant`、`defaultModelThinking.effort`、`defaultModelContextWindow`、`defaultLightModel`（用于标题等辅助任务）。见 `packages/config/src/config.ts` 的 `Config`。
- 切换方式：`/model`（会话内持久），`-m/--model`（只影响启动的那个会话），`exec --model` / `--effort`（只影响这次 Run）。
- 模型目录：在线目录，加上随包打入的快照作为离线回退。

### 3.3 Reasoning / Thinking

- `ModelConfig.thinking.effortOptions/defaultEffort` 控制 effort；`thinking_config.mode` 控制开关展示方式；`interleaved: { field: 'reasoning_content' | 'reasoning_details' }` 声明交错思考字段；`variants` 按 variant 覆盖（例如 `thinking` / `''`）。
- MiniMax 开放平台模型通过 `openplatform_thinking_variants` 能力声明 `thinking` 和 `none-thinking` 两套请求参数（`model-system/resolution/openplatform-thinking.ts`）。
- 旧版 effort 值由 `normalizeLegacyThinkingEfforts` 迁移（`packages/config/src/byok-config.ts`）。
- 协议层的 reasoning 回传：主要在 vendored pi-ai 里，本路未深入。

### 3.4 Prompt cache

- 底层由 pi-ai 负责 `cache_control`；保留时长取 `PI_CACHE_RETENTION=long|short`，默认 short（`packages/local-runtime/src/context/messages-count-tokens-payload.ts`）。
- 会话亲和：`custom_provider.*.models.*.compat.sendSessionAffinityHeaders: true` 时，每个请求带 `x-session-affinity: <sessionId>`；openai-completions 额外带 `session_id` 和 `x-client-request-id`。这个开关默认 false，只对 Fireworks、Cloudflare AI Gateway 的 Anthropic 路由等自动开启。刻意不使用 Anthropic 的 `metadata.user_id` 作为缓存 key（`docs/examples.md`）。
- 可观测：状态栏 `cache-read-ratio` 条目，计算方式为 `cacheRead / (input + cacheRead + cacheWrite)`；`/usage` 分别显示 Read、Fresh、Write。

### 3.5 重试与限流

`packages/agent-core/src/pi-turn-runner/llm-retry.ts`：

```ts
export const DEFAULT_LLM_RETRY_POLICY: Readonly<LLMRetryPolicy> = {
  maxRetries: 5,
  baseDelayMs: 1_000,
  maxDelayMs: 30_000,
  maxRetryElapsedMs: 120_000,
};
```

- 支持 `retry-after-ms` 和 `retry-after` 头；没有时按指数退避 `base * 2^(n-1)`，上限 30s。错误分类由 `@mavis/shared/llm-error-classifier` 负责（`toLLMRetryDecision`）。
- 重试以“逻辑调用”为单位，同一个调用标识（`LLM_RETRY_CALL_IDENTITY`）下的每次物理请求都单独记录用量。重试事件分 `waiting / recovered / exhausted / cancelled`，TUI 活动行会显示重试计数。
- 作用域区分 `agent / compaction / title`。BYOK（`minimax_api`、`custom_provider:*`）有单独的错误归因（`byok-error-attribution.ts`）。
- 网络代理：`packages/tui/src/cli/network-proxy.ts` 读取 `HTTP(S)_PROXY / NO_PROXY`，自动为 localhost 加 no-proxy，并设置 undici 全局 dispatcher。

---

## 4. 多模态与 “tools beyond code”

- **接入方式**：内置 **Matrix MCP**（stdio 子进程，名称为 `matrix`），外加独立的 **`mcode-tools` CLI**，两者配合。
  - Matrix MCP：`packages/local-runtime-v2/src/service/mcp/runtime/builtin-matrix.ts`。由 `process.execPath` 启动随包打入的 `matrix-mcp-stdio.js`；单次调用超时 1,500,000ms（25 分钟）；账号 access token 通过环境变量 `MAVIS_MATRIX_ACCESS_TOKEN` 注入；连接池 key 由 workspace、auth、lane 的哈希组成，切换账号或 lane 时不会复用旧的子进程。
  - 当 mcode-tools 接管媒体类工具后，Matrix MCP 收窄为只暴露 `web_search`（`webSearchOnly`）。
- **工具清单**（`packages/config/src/agent-capabilities.ts` 的 `AGENT_BUILTIN_MCP_TOOL_IDS`）：
  - 图片：`images_understand`、`image_synthesize`、`images_search_and_download`、`image_reverse_search`
  - 视频：`submit_video_generation`、`query_video_generation`、`gen_videos`、`batch_text_to_video`、`batch_image_to_video`、`videos_understand`
  - 语音/音乐：`get_voice_list`、`batch_text_to_audio`、`batch_text_to_music`、`synthesize_speech`、`batch_synthesize_speech`、`audios_understand`、`transcribe_audio`
  - 搜索：`web_search`（由 `features.webSearch` 统一控制工具和对应 prompt），另有内置工具 `web_fetch`。
  - 其他内置：`website_deploy`（网站部署）；内置 Skill 有 `deploy-website`、`docx`、`pdf`、`pptx`、`xlsx`、`deep-research`、`visual-page`、`x-link-reader`、`lark-tools` 等（`packages/local-runtime/assets/skills/`）。
- **mcode-tools**：public npm `@minimax-ai/code@0.3.11` tarball 里的 `embedded/mcode-tools/cli.mjs`，版本 0.0.4。构建时下载并校验 SHA-512 和 SHA-256，不执行包脚本（`scripts/lib/mcode-tools-artifact.mjs`）。运行时由 `packages/mcode-tools-host` 做本地 **OAuth lease broker**，给子进程发放短期 access token，子进程拿不到 refresh token（`packages/oauth-lease-protocol`）。模型先加载 Skill `mcode-tools-master`，再通过 Bash 调用 `mcode-tools connector ...`，适合和管道、循环、本地文件、批处理组合使用。
- **托管连接器（Connectors）**：云端客户端 + 权限 + 调用适配（`local-runtime-v2/src/service/host-connector-system`），需要登录。
- **ASR**：`packages/config/src/asr.ts`（云端语音转文字配置）。本路未见 TUI 语音输入入口：未确认。
- **图片输入**：Composer 支持粘贴图片或视频文件（`Ctrl+V`），`exec --file` 可附加文件。BYOK 模型需要 `--support-image` 或 `modalities.input` 含 `image` 才能发图。ACP 声明 `promptCapabilities.image=false`。
- **后端 API**：Matrix 调用的是 MiniMax 自家 “Matrix biz-gateway”（`MCP_DEFAULTS.timeout` 的注释提到 “matrix biz-gateway worst-case multimodal RPCs”）。具体对应哪些 MiniMax 开放平台 API（如 T2A、Hailuo 视频、Music）源码中没有直接写出：未确认。

---

## 5. 扩展机制

### 5.1 插件

- 代码：`packages/local-runtime-v2/src/service/plugin-system/`；CLI 入口：`packages/tui/src/cli/plugin-command.ts`；TUI 入口：`src/tui/features/plugin/manager.ts`。
- **支持的包格式**（`plugin/package/package-readers.ts`）：
  1. `.minimax-plugin/plugin.json`：MiniMax 原生格式。字段有 `name / displayName / version / description / author / icon / darkIcon / category / exampleQueries / apps / mcpServers / skills / hooks / hostBindings`，其中 `apps` 指 MiniApp。
  2. `.claude-plugin/plugin.json`：Claude Code 兼容格式。源码中这个字符串用 `cl…` 转义拼出来，大概率是为了躲避源码扫描。
  3. `.codex-plugin/plugin.json`：Codex 兼容格式。
  4. 根目录 `plugin.json`：agent-plugins.org 1.0.0 schema（`AGENT_PLUGINS_V1`），配套 `mcp.json`。
  - 兼容格式只读取可执行能力 skills、mcpServers、hooks，一样都没有则拒绝。
- **来源（marketplace）**：只有 `official`（官方目录，安装需要登录）和 `local`（profile 下本地插件目录的直接子目录，发现即视为已安装）两种。运行时有 GitHub importer（`plugin/import/github-*.ts`），但 CLI/TUI 没有暴露，也不支持注册任意第三方 marketplace。
- **命令**：`mcode plugin list [--available] [-m official|local] [--json]`、`add|remove|enable|disable <name[@marketplace]>`、`plugin marketplace list|upgrade`。
- **TUI `/plugins`**：`Tab` 在 All/Installed/Official/Local 间切换；`Enter` 安装；`Space` 启停；`Delete`/`Ctrl+D` 移除；`Ctrl+R` 刷新。
- **单条消息选定插件**：在 Composer 输入 `@` 可以选择插件，显示为 `@Name`。插件身份在编辑、撤销、历史、排队和 `/edit` 中都保留。Runtime 在该轮提示 Agent 优先使用这个插件的 Skills、MCP 和 App 工具。选择插件不等于安装或启用。exec/ACP 用持久链接形式 `[@Notes](plugin://notes%40local)`。

### 5.2 Skills

- Registry：`packages/agent-modules/skills`，配置在 `packages/config/src/skills-config.ts`。
- 外部来源与默认优先级（同名时高者胜出）：

```ts
    sources: {
      'workspace-minimax': { enabled: true, priority: 65 },   // <ws>/.minimax/skills
      'workspace-cc': { enabled: true, priority: 60 },        // <ws>/.claude/skills
      'workspace-agents': { enabled: true, priority: 55 },    // <ws>/.agents/skills
      'user-cc': { enabled: true, priority: 40 },
      'user-codex': { enabled: true, priority: 35 },
      'user-agents': { enabled: true, priority: 30 },
    },
```

- `walkUp: true` 表示向上查找到 git 根；`duplicateWarn` 记录同名冲突；有总开关 `external.enabled`。
- 支持目录 symlink（整个 skills 根目录或单个 skill 目录都可以），目标可以在工作区外，会监听 `SKILL.md` 的新建和编辑；`SKILL.md` 本身必须是普通文件（`docs/tui-capabilities.md`）。
- 内置 Skills 共 18 个（`AGENT_BUILTIN_SKILL_IDS`），另有若干由其他能力拥有的 Skill（如 `resume-codex`、`cu-desktop`）。frontmatter 支持 `descriptions.zh-Hans`、`displayNames`、`requiresBeta` 等扩展字段。
- 还有 Skill 自进化配置 `skillEvolve`（`skill-evolve-config.ts`，内置 `skill-refiner` Skill），细节未深入。
- Skills 自动注册为斜杠命令，ACP 客户端同样能拿到。

### 5.3 Hooks

- 只能随插件提供，未发现用户级或项目级 settings 里的 hooks 配置（本路 grep 未找到）。
- 代码：`packages/agent-modules/plugin-hooks/`（解析、执行、会话生命周期协调）和 `plugin-system/plugin/package/hook/`。兼容格式的默认路径是 `hooks/hooks.json`。
- 事件：

```ts
export const PLUGIN_HOOK_EVENTS = [
  'SessionStart', 'SessionEnd', 'UserPromptSubmit', 'PreToolUse', 'PermissionRequest',
  'PostToolUse', 'SubagentStart', 'SubagentStop', 'Stop', 'PreCompact', 'PostCompact',
] as const;
```

- `SessionStart` 的 source 取值为 `startup / resume / clear / compact / fork / plugin_activation`。
- handler 类型只有 `command`，分 shell 形式和 exec 形式（`args`）两种；可用 `matcher` 匹配工具名、`condition` 匹配工具入参（如 `Bash(rm *)`）。超时默认 5s，上限 10s（`parser.ts`）。事件 JSON 从 stdin 传入。
- 三种来源格式 `MINIMAX / CLAUDE / CODEX` 分别投影各自的语义：对 Claude/Codex 格式，exit 2 表示阻断，MiniMax 格式不适用；可返回 `updatedInput`、`updatedPermissions`、`additionalContext`、`continue:false`、`systemMessage`、`updatedResult`（替换模型看到的工具结果，审计日志保留原结果）、`terminalSequence`（白名单内的终端通知字节）等。
- 插件有可写的 `pluginDataDir`，包目录本身不可变；`activationKey` 在更新或重新激活时变化。

### 5.4 MCP

- 共享底座：`packages/agent-modules/mcp`（基于 `@modelcontextprotocol/sdk`，传输 stdio / http(streamable) / sse）。默认单次调用超时 120s，每个 server 并发 5。
- **配置层级**，同名时整条替换，不做字段合并：**ACP session（客户端注入）> project `.mcp.json` > profile `mcp.json`**。builtin 保留名不能被覆盖；插件 MCP 由插件 runtime 单独管理。profile 文件位置为 `<data-dir>/mcp.json`，也兼容 `<data-dir>/mcp/mcp.json`（`service/mcp/runtime/config-file.ts`）。
- **项目级 `.mcp.json`**（`packages/local-runtime-v2/docs/project-mcp.md`、`service/mcp/project-config.ts`）：
  - 只读取会话主工作目录下的文件，不向上查找，也不看 `/add-dir` 添加的目录；文件上限 1 MiB，必须是项目内普通文件。
  - `command/args/env/url/headers` 支持 `${VAR}` 和 `${VAR:-default}`，变量缺失时停用该 server 并报出变量名，不回显变量值。
  - 支持正整数 `timeout`，支持 `enabled:false`。禁用或出错的 project 条目仍会遮蔽同名 profile 条目，避免在用户不知情时连到另一个目标。
  - HTTP 凭据不跟随跨 origin 重定向；stdio 的 cwd 和 `roots/list` 都使用 canonical 项目根目录。
  - **没有项目级信任确认**：文档写的是“无需导入，也不设置 MCP 专属批准或配置摘要授权”，也没有 `pending_approval` 状态。连接是自动的，工具权限确认发生在连接之后，拦不住 stdio 进程启动。这是有意的产品取舍，也是明显的安全边界，值得在对比中指出。
  - 每次工具发现和调用前都重新读取配置；配置变化时中止旧的 project 调用并关闭旧连接。
- **状态**：`configured / available / disabled / error`。`/mcp` 分组显示 Built-in、User-configured、Project、Client session；`/mcp reload` 重新读取配置并展示，不做连接测试。
- **OAuth**：`types.ts` 注释说明旧 daemon 的 OAuth2 流程被裁掉了；`runtime/config.ts` 只把 `auth.type === 'oauth2'` 标记为 `pending_auth`。本路未见用户 MCP 的完整 OAuth 授权流程（未确认），远程 server 只能靠 headers 和环境变量传 token。
- **资源/提示词**：本路只看到 `tools/list` 和 `tools/call`，未见 MCP resources/prompts 支持（未确认）。
- **渐进披露**：`config.mcpToolSearch`（`enabled / thresholdPct / minDeferCount / topK…`），工具数量多时延迟暴露 schema（细节属于另一路）。

### 5.5 其他

- **自定义斜杠命令**：没有独立的 commands 目录，靠 Skills 充当斜杠命令。
- **输出风格（output style）**：未发现。
- **状态栏 `custom-command`、自定义主题、自定义快捷键** 都算轻量扩展点（见第 1 节）。
- **`/goal`**：带 token 预算、可暂停和恢复的“目标续跑”（`packages/agent-modules/goal`）。
- **cron**：`packages/agent-modules/cron`（定时任务），TUI 入口未确认。

---

## 6. 非交互 / 无头模式

- **`mcode exec [prompt]`**：`packages/tui/src/cli/contract.ts`、`packages/tui/src/headless/`。
  - 输入：`--input -`（从 stdin 读）、`--input-format text|json`、`--file`（可重复）、`--cwd`。
  - 模型：`--model <provider/model>`、`--effort`；`--prompt-mode tui|coding|work`，默认 tui。
  - 会话：`--session <id>`、`--continue`；`--config <path>` 为本进程指定 Runtime 配置文件。
  - 权限：`--permission smart|full|off`，默认 **smart**。ask 模式需要 TUI 或 ACP，headless 下不可用。
  - 预算：`--timeout 30s|2m`、`--max-steps`。
  - 输出：`--output-format text|json|stream-json`、`--output-schema <file|inline JSON Schema>`（用 Ajv 校验最终答案，失败时记为失败但保留原答案）、`-o/--output-last-message <path>`（原子写入）、`--diagnostics-dir`。
  - `mcode exec review`：审查本地改动，返回结构化 `ReviewResultV1`。
- **结果契约**（`headless/contract.ts`）：

```ts
export interface ExecResult {
  readonly schemaVersion: 1;
  readonly type: 'exec.result';
  readonly runId: string;
  readonly sessionId: string;
  readonly turnId: string;
  readonly status: ExecResultStatus; // succeeded | failed | timeout | cancelled | limit_exceeded
  readonly output?: unknown;
  readonly error?: ExecError;
  readonly model?: ExecModelIdentity;
  readonly usage?: ExecTokenUsage;   // input/output/reasoning/cacheRead/cacheWrite
  readonly usageSource?: ExecUsageSource;
  readonly usageIncomplete?: boolean;
  readonly durationMs: number;
}
```

- **stream-json 事件**（`headless/events.ts`）：`exec.started → session.started|session.resumed → turn.started → item.started/updated/completed(agent_message|reasoning|tool_call) → turn.completed|turn.failed → exec.completed`。风格与 Codex exec 的 JSONL 相近。
- **退出码**（`headless/exit-policy.ts`）：`0` 成功，`2` 调用参数错误，`3` 配置错误，`4` 运行时错误，`6` 超时，`7` 超出限制，`70` 内部错误，`130` 取消，`141` 管道断开。这套退出码对 CI 集成很友好。
- headless 下 `--model` 覆盖只做只读的账号状态检查，用 BYOK 模型时不要求 Token Plan 登录。
- **SDK**：没有公开 JS SDK（`packages/tui` 的 exports 只有 `package.json`，`@mavis/*` 都是私有包）。编程集成走 exec JSON 或 ACP。
- **IDE 集成**：`mcode acp` 在 stdio 上跑 Agent Client Protocol server（`packages/tui/src/acp/`，依赖 `@agentclientprotocol/sdk` 1.3.0）。能力：`loadSession`；`sessionCapabilities: list/fork/resume/close`；`mcpCapabilities: http/sse`（客户端可注入 MCP）；`setMode` 和 `setConfigOption`（权限模式、模型）；支持终端认证方法 `mcode login`；把 Skills 作为斜杠命令下发。`promptCapabilities` 的 image、audio、embeddedContext 都是 false。文档提到 Zed，但“不代表 live Zed 验收”。仓库内没有 VS Code 插件；VS Code 终端标签的标题需要设置 `terminal.integrated.tabs.title: "${sequence}"`。
- **CI 集成**：README 把 Headless 定位为“Shell、CI、批处理与评测”。仓库没有官方 GitHub Action（未发现）。

---

## 7. 安装、分发、升级、配置层级、遥测

### 7.1 安装与分发

- 官方安装脚本：`curl -fsSL https://filecdn.minimax.chat/public/install.sh | bash`，Windows 用 `irm …/install.ps1 | iex`。默认装到 `~/.minimax-code`（可用 `MCODE_INSTALL_DIR` 改），不需要 sudo，需要时自带 Node.js；会往 shell rc 写一行带 `# MiniMax Code CLI` 注释的 PATH（`MCODE_NO_MODIFY_PATH` 可跳过）。不支持 Alpine/musl。安装器没有卸载参数，README 给出手动卸载步骤。安装脚本本身不在仓库内。
- npm 安装：`npm install -g @minimax-ai/code@latest --include=optional --allow-scripts=@minimax-ai/code,better-sqlite3`，需要执行原生 SQLite 的安装脚本。
- GitHub Release：`minimax-code-X.Y.Z.tar.gz` 加 `.sha256`，本质是 npm 安装包，不含 Node，也不是离线包。
- 两个启动器：`mcode` 和 `mcode-tools`。

### 7.2 升级

- `packages/tui/src/update/`。`install-source.ts` 识别安装来源：`managed-installer / npm-global / npm-prefix / pnpm-global / yarn-global / bun-global / unsupported`，包管理器安装的按对应命令升级。registry 为 npmjs，国内镜像为 npmmirror。
- 托管安装器的升级（`service.ts` + `release.ts`）：下载 `releases/<version>/manifest.json` 和 `.sig`，用 **Ed25519** 验签（签名 64 字节，`crypto.verify(null, …)`），校验目标平台后装进 `versioned-prefix.ts` 的 `releases/<ver>` 目录，再原子切换 `current` 指针，过程中加更新锁 `.mcode-update.lock`。
- 启动时只提示有新版本（`startup-notice.ts`），不会静默自动安装。实际升级用 `/update` 或 `mcode update`。

### 7.3 配置层级

| 层 | 位置 | 内容 |
| --- | --- | --- |
| 进程/环境 | 环境变量、`--config <path>`（exec）、`-m`、`--tui-mode` | 数据目录覆盖、单次模型、遥测总开关 |
| 用户/profile | `<data-dir>/config.yaml`（默认 `~/.minimax/config.yaml`） | provider、默认模型、permission、tui、telemetry、skills、goal、sandbox 等，完整字段见 `packages/config/src/config.ts` 的 `Config` |
| 用户/profile | `<data-dir>/mcp.json`、`<data-dir>/AGENTS.md`（全局指令）、`<data-dir>/tui/{tui-settings.json,keybindings.json,themes/}`、`codex-auth.json`、`permission.json`（v1/v2 格式） | MCP、全局指令、TUI 偏好、凭据、权限规则 |
| 项目 | `<ws>/AGENTS.md`、`<ws>/.mcp.json`、`<ws>/.minimax|.claude|.agents/skills` | 项目指令、项目 MCP、项目 Skills |
| 会话 | ACP 注入的 MCP、会话内的模型和权限模式 | — |

- 没有“项目级 config.yaml / settings.local”这一层（未发现）；hooks 在插件 `PermissionRequest` 的 `updatedPermissions` 中有 `localSettings / projectSettings / userSettings` 目标，这是兼容 Claude 的语义，宿主如何落盘属于另一路范围（未确认）。
- 私有配置文件 0600：`packages/config/src/private-config-file.ts`。

### 7.4 遥测与隐私

`docs/telemetry.md`，`docs/tui-capabilities.md` 的 “Diagnostic upload privacy” 一节。

- 三个通道各自独立 opt-in，**默认全部关闭**：`telemetry.enabled`（TUI 使用事件）、`telemetry.metrics`（运行时指标）、`telemetry.diagnostics`（与账号关联的错误诊断）。`MCODE_DISABLE_TELEMETRY=1` 或 `DO_NOT_TRACK=1` 一次关闭全部通道。
- `mcode telemetry status` 显示每个通道的生效值和原因；`mcode telemetry preview` 展示一个解码后的示例请求，不会真的发送。
- 使用事件每次生成新的随机 ID（`distinct_id` 不固定），字段白名单明确列出。
- 错误诊断采用 allowlist schema：不含 message、stack、headers、prompt、URL，加密只是传输层保护，不等于脱敏。反馈上传的 ZIP 只包含 **counts**（`diagnostic-counts-v1`）：角色、状态、错误码、HTTP 状态计数，不含原始会话内容。
- 自动 LLM 错误报告默认关闭。

---

## 8. 工程化

### 8.1 Monorepo 包划分

`pnpm-workspace.yaml`，包范围以 `release/extraction.json` 的 `packageRoots` 为准：

| 包 | 名称 | 职责 |
| --- | --- | --- |
| `packages/tui` | `@minimax/code`（私有） | CLI、TUI、headless、ACP 入口，约 416 个 ts 文件、10.8 万行 |
| `packages/local-runtime-v2` | `@mavis/local-runtime-v2` | 进程内 Runtime：session、turn、model-system、plugin-system、mcp、sandbox、cron 等 |
| `packages/local-runtime` | `@mavis/local-runtime` | 复用的宿主设施（DB、文件工具、权限、存储），内置 prompts 和 skills 资产 |
| `packages/agent-core` / `agent-runtime` / `agent-extension` / `agent-tools` | `@mavis/*` | Agent 契约与 PiTurnRunner、扩展 SPI、内置适配器、平台工具（含 Matrix） |
| `packages/agent-modules/*` | 12 个 | background-task、context-manager、conversation-contract、cron、goal、mcp、permission、plugin-hooks、runaway-guard、session-report、skills、system-reminder，约定“永不 import runtime 包” |
| `packages/config` / `protocol` / `shared` | — | 配置 schema 与解析、CLI/Runtime 数据结构、共享工具 |
| `packages/oauth-core` / `oauth-lease-protocol` / `mcode-tools-host` | — | OAuth 凭据、跨进程 token 租约、mcode-tools 宿主 |
| `packages/browser-core` | — | Browser Core（Electron 和 headless Chrome 共用） |
| `third_party/pi-mono`（agent/ai/coding-agent/tui）、`third_party/sandbox-runtime` | vendored | 模型协议、agent 基础设施、沙箱 |

### 8.2 构建

- `scripts/build.mjs` 用 esbuild 打包：入口 `cli: packages/tui/src/index.ts`，另有 `mcode-tools`、`matrix-mcp-stdio`；输出 ESM，`platform: node`，`target: node22`，原生模块设为 external，产物是 `dist/cli.js`。
- `@mavis/*` 从源码直接解析，不下载内部 registry。`tsconfig.standalone.json` 的 paths 由 `pnpm gen:tsconfig` 根据各包的 exports 生成。
- 类型检查用 `tsc -p tsconfig.standalone.json`，devDeps 里还有 `@typescript/native-preview`（tsgo）。lint 只覆盖 tui（eslint airbnb-base + prettier）。

### 8.3 测试

- 单一事实源：`test/vitest-suites.json`，按 gate 分组，当前为 `capability`（174 个文件）、`sandbox`（2）、`policy`（1）、`status-contract`（1）、`windows`（1）。`vitest.oss.config.mjs` 从这个文件读取 include，并把包 exports 映射成 alias。规则是不允许在 package.json 或 vitest config 里硬编码测试路径。
- 仓库级测试用 `node:test`：`test/smoke.test.mjs`（启动真实 `dist/cli.js`）、`byok.test.mjs`、`public-artifact.test.mjs`、`source-sync.test.mjs`。
- **离线保证**：`test/network-deny.mjs` 在测试子进程里劫持 `fetch` 和 `Socket.connect`，所有外连尝试写入审计文件，smoke 测试结束时断言审计文件不存在，也就是“无意外外连”。
- **TUI 渲染测试**：`packages/tui/test/helpers/virtual-terminal.ts` 用 `ghostty-web` 的 WASM VT 引擎作为虚拟终端，把真实 ANSI 输出喂进去再断言屏幕文本和单元格属性，比字符串快照更贴近真实终端。未发现 `toMatchSnapshot` 类的快照测试。
- TUI 单测覆盖面（`packages/tui/test/unit/` 下 87 个 `.test.ts`）：keybindings、model-picker、session-manager、terminal-presentation（标题和通知）、thinking-preview、tool-preview-diff、markdown-stream、resize-replay、IME 光标、粘贴、ACP、headless contract/runner、telemetry privacy、update service 等。另有 `test/pi-084-upstream` 保留上游引擎测试语料。
- `pnpm verify`（`scripts/verify.mjs`）与 CI 使用同一套 gate，顺序为：`check:source → check:tsconfig → export source preview → test:release-tools → lint:tui → typecheck → build → check:standalone → test:artifact → test:capabilities → test:windows(win32) → test:status-contract → test:smoke → test:byok → test:policy → test:sandbox(darwin) → test:release-package`。支持 `--profile full|platform|docs|archive|package` 和 `--list`。

### 8.4 发布

`docs/releasing.md`：

- `pnpm release:cli --version X.Y.Z [--dry-run]`：从最新的 `origin/main` 建 `release/vX.Y.Z` 分支，同步两处版本号，打 annotated tag，原子推送分支和 tag（不推 main），再开版本 PR 回 main。
- tag 触发 `cli-release.yml`：full verify、secret 扫描（gitleaks）、打包，在 Linux 和 macOS × Node 22.19.0/24.2.0/25/26 的矩阵上安装同一份 archive，并验证 launcher、原生 SQLite、ripgrep 和离线 smoke/BYOK。全部通过后才创建 draft Release，上传资产后再公开。已发布的 tag 不移动、不覆盖。这个流程不发布到 npm registry，也不改官方安装器。
- 其他 workflow：`ci.yml`、`compatibility.yml`、`performance.yml`（`perf:full` 标签）、`security.yml`、`source-candidate.yml`（内部源码同步候选）、`sync-issue-to-feishu.yml`。

### 8.5 文档体系

- 根目录：`README.md`（英文）和 `README_ZH.md`（中文译文，互相链接）、`CONTRIBUTING.md`、`SECURITY.md`、`LICENSE-STATUS.md`、`THIRD_PARTY_NOTICES.md`。
- `docs/`：`README.md`（索引，分 Get started / Contribute / Maintain and release 三组）、`architecture.md`、`tui-capabilities.md`（能力、实现、证据三列对照表）、`examples.md`、`installation.md`、`telemetry.md`、`verification.md`（验收记录，包括明确的 NOT RUN 边界）、`releasing.md`、`source-sync.md`、`release-audit.md`、`open-source-status.md`、`publication-authorization.md`、`maintainers.md`、`performance-ci.md`、`demo.md`，以及 `superpowers/{specs,plans}`（按日期命名的设计 spec 和实施 plan）。
- 包内文档：`packages/tui/docs/{status-line-config.md, theme-config.md}`、`packages/local-runtime-v2/docs/project-mcp.md`、`packages/local-runtime-v2/src/service/model-system/README.md`、`engine/{UPSTREAM,LOCAL_CHANGES}.md`。
- 文档语言规则：以英文为主；中文只作为明确标注的译文。本地化产品字符串和内置 prompt 的语言是运行时内容，不属于文档翻译。实际上部分包内文档是中文（theme-config、project-mcp）。

### 8.6 AGENTS.md 与 CONTRIBUTING 对贡献者和 Agent 的规则

根 `AGENTS.md` 约 60 行，写法可以作为精简 AGENTS.md 的参考。结构是：

1. **一句话点明仓库的特殊性**：这是内部 monorepo 的公开投影，文件清单在 `release/public-source.json`，“移动或重命名文件的代价比普通仓库高 → 优先改内容、少改布局”。
2. **Layout**：每个顶层目录一行。
3. **Generated files 表**：文件、重新生成命令、检查命令三列，并写明“不要手改”。
4. **Branches**：`feat/ fix/ docs/ refactor/ test/ chore/` 加 kebab-case，**禁止用 agent 或工具名作分支前缀（包括 `codex/`）**，禁止合并内部 Git 历史。
5. **Single sources of truth 表**：关注点、声明位置、消费者三列（包范围、exports、vitest 套件、退役路径、verify 流水线等）。这是最值得借鉴的一段：用一张表防止 Agent 在多处硬编码。
6. **Common changes**：新增包、改 exports、新增测试、新增 gate 各给一句操作步骤。
7. **Verification**：`pnpm verify` 与 CI 一致；说明何时可以用 `--profile docs`；要求“报告实际跑了哪些检查、哪些没跑，离线测试不能证明 live service”。
8. **Boundaries**：不引用内部 host，不恢复退役路径，不为了通过检查删除能力，不提交账号、会话、日志、凭据，文档和 commit 用英文。

CONTRIBUTING 补充：

- 目前只接受 collaborator 的 PR，其他人先开 Issue。PR 需写明用户可见变化、跑了的检查、没跑的 live 或平台验证、文档影响。
- 打标签的规则见 `docs/maintainers.md`；性能相关改动加 `perf:full`。
- 仓库开发用的 Skills 放在 `.agents/skills/`：`cli-guide`（TUI/exec/ACP 与 runtime 边界导航）、`cross-layer-drift-sweep`（跨层检查重命名、默认值和契约漂移）、`testing-workflow`（选择聚焦检查和必需 gate）、`verify-all-runtime-sinks`（检查备用运行路径、缓存和产物）、`retro`（把实际出过的失败沉淀为规则）。
- Capability boundaries：保留 MiniMax OAuth、Token Plan、BYOK、mcode-tools、search、plugins、connectors、updates、feedback，不允许为了独立构建而删掉能力。

---

## 附：对 PaiCLI 可借鉴的点（简评）

1. **命令元数据化**：每个斜杠命令声明 `discoverability`、`runAvailability: 'idle'`、`visibleWhen`、`argumentHint` 和参数补全。“运行中不可用”“无会话不可见”“search-only 不进默认列表”都由数据驱动，未知命令和参数误用会统一给出原因。
2. **运行中输入的三种语义**：Enter 表示引导当前响应（steer），Alt+Enter 表示排队到下一轮，`/btw` 开旁路会话。三者分开，比单一队列更好用。
3. **exec 契约**：`ExecResult schemaVersion:1`，加上 stream-json 事件、结构化退出码和 `--output-schema`（Ajv 校验），可以作为 PaiCLI 无头模式和评测证据格式的参考。
4. **项目 MCP 的取舍**：同名整条替换，禁用条目仍遮蔽同名 profile 条目，`${VAR:-default}` 展开缺失时不回显值，凭据不跨 origin 重定向。但不做信任确认，这一点 PaiCLI 可以反向做得更安全。
5. **终端通知与标题**：按终端能力选择 OSC 9/99/777 或 BEL，自动处理 tmux passthrough 和焦点抑制，成本低、体验收益高。
6. **网络零外连测试**：用 `network-deny.mjs` 做审计，外加 ghostty-web 虚拟终端做渲染断言。
7. **fork 差异台账**：vendored 依赖的每条改动都写清删除条件。
