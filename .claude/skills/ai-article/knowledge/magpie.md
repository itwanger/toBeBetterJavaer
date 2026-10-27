# Magpie 调研缓存

调研日期：2026-10-27；源码 commit `5e3dd1d5`（2026-10-27，Release `v0.1.1667`）；增量补充用 `git log --since="2026-10-27"`。
仓库：https://github.com/yetone/magpie ，官网：https://usemagpie.ai/zh/ ，中文文档：https://usemagpie.ai/docs/zh/start 。截至 2026-10-27：22,746 Star、2,020 Fork，MIT，Go 1.26.8。

## 背景与定位

- 作者：`yetone`（代表作 Neovim AI 插件 `avante.nvim`、划词翻译 `openai-translator`、AI 客户端 `alma`）
- 定位：“Every agent's model. One place. Codex on DeepSeek, Claude Code on Kimi, from the menu bar.” 本机 AI 编码工具统一模型管理器与多协议网关，在菜单栏、桌面窗口、终端 TUI、浏览器面板和 CLI 中把任意供应商的模型分配给任意客户端
- 技术栈：
  - 后端与网关：Go 1.26.8，本地存储 SQLite（`modernc.org/sqlite`）+ JSONC / TOML / YAML 解析
  - 桌面端：Wails v3（原生系统托盘、390×580 快捷弹出面板、900×600 主窗口），前端 `internal/gui/assets/` 原生 JS + CSS 单二进制内嵌
  - 终端 TUI：Charmbracelet `bubbletea` + `bubbles` + `lipgloss`（`magpie tui`）
  - 插件与脚本：内置纯 Go JS 运行时 `moejs`，需要运行 OpenCode 认证插件、pi 包或异步钩子时按需下载 Bun 运行时到 `~/.config/magpie/runtime/bun/`
  - 本地隐私脱敏：`internal/pii/guard`（纯 Go ONNX Runtime 运行 39MB int8 量化的 `QuantumNous/astrlink-guard` XLM-R 模型）与 ggml `pf-serve`

## 安装与启动

- macOS / Linux 一键安装：`curl -fsSL https://usemagpie.ai/install.sh | sh`（支持 `--proxy http://127.0.0.1:7890` 或 `--mirror <前缀>`，自动校验 SHA-256）
- macOS 安装包：`magpie-darwin-arm64.dmg` / `.pkg` / `.zip`，安装脚本将 `magpie.app` 放入 `/Applications`，CLI 软链至 `~/.local/bin/magpie`
- Windows：PowerShell `irm https://usemagpie.ai/install.ps1 | iex` 或安装包 `magpie-windows-amd64-setup.exe`
- Docker：`docker run -d --name magpie -p 3425:3425 -v magpie:/data -e MAGPIE_WEB_PASSWORD=change-me ghcr.io/yetone/magpie:latest`
- 启动命令（`main.go`）：
  - `magpie`：启动桌面应用（菜单栏图标 + 主窗口）
  - `magpie tray`：仅启动菜单栏/托盘图标
  - `magpie tui`：终端内完整 Bubble Tea 交互界面
  - `magpie web`：启动本地浏览器管理界面并输出一次性鉴权令牌地址
  - `magpie serve`：前台仅运行网关服务
  - `magpie daemon install`：注册为 macOS `launchd` 或 Linux `systemd` 后台自启服务
- 默认本地网关地址：`http://127.0.0.1:3425`，默认网关 Token 为 `magpie`
- 常用 CLI 命令：`magpie ls`、`magpie presets`、`magpie provider add <preset> <key>`、`magpie accounts add <provider>`、`magpie models`、`magpie <agent> <provider/model>`、`magpie <agent> default`、`magpie usage 7d`、`magpie update`

## 支持的客户端与配置安全写回

- 内置 60+ 客户端适配器（`internal/agent/agent.go`），在 Windows 上自动发现 WSL 中的工具（`<id>@wsl:<distro>`）：Claude Code（`claude`）、Claude Desktop（`claude-desktop`）、Codex（`codex`）、Gemini CLI（`gemini`）、Antigravity CLI（`agy`）、OpenCode（`opencode`）、Cursor CLI（`cursor`）、GitHub Copilot CLI/JetBrains、VS Code Chat、Zed、Goose、Pi、Cline、Aider、DeepSeek Harness（`dsh`）、Kimi Code（`kimi`）、Qwen Code（`qwen`）、Zhipu ZCode（`zcode`）、MiMo Code（`mimo`）、MiniMax Code（`minimax`）、Qoder 等
- 五大 API 协议双向互转（`internal/gateway/`）：OpenAI Chat Completions（`/v1/chat/completions`）、OpenAI Responses（`/v1/responses`）、Anthropic Messages（`/v1/messages`）、Google Gemini（`/v1beta/models/...`）、Ollama 原生协议（`/api/chat` 等）。自动处理跨协议流式工具调用索引排序、孤立 `tool_result` 与前置 `tool_use` 配对、JSON Schema 清理，以及跨厂商推理块（Anthropic `thinking`、OpenAI `reasoning_content` / `encrypted_content`、Gemini `thoughtSignature`）的映射或剥离
- 最小侵入与原子写入（`internal/agent/applied.go`、`stash.go`、`claude.go`、`codex.go`）：
  - 每次写入前先读原文件，只更新接入模型所需字段，保留原注释、键名顺序与缩进，同目录写临时文件后原子重命名替换
  - Claude Code：只改 `~/.claude/settings.json` 中 `env` 段的 `ANTHROPIC_BASE_URL`、`ANTHROPIC_AUTH_TOKEN` 及四档模型环境变量
  - Codex：在 `~/.codex/config.toml` 中加 `[model_providers.magpie]` 表，模型清单写入 `magpie-models.json`，不碰原有 ChatGPT 登录状态
  - Claude Desktop：为接第三方供应商会新建 `Claude-3p` 配置目录
  - 备份与还原：`~/.config/magpie/stash.json` 存接入前原值，`~/.config/magpie/applied.json` 存每次写入快照并检测外部修改导致的配置漂移（Drift）。点界面“断开并还原”或执行 `magpie <agent> default` 即可从 `stash.json` 完整还原

## 核心功能与源码机制

### 1. 模型聚合、四档映射与子 Agent 分配
- 统一模型标识 `provider/model`，各家供应商模型在列表中聚合展示
- Claude Code 分档映射（`internal/agent/claude.go`）：主模型 `ANTHROPIC_MODEL` 之外，支持为 `opus`、`sonnet`、`haiku`、`fable` 四档分别指定不同模型，还可以单独指定子 Agent 模型（`CLAUDE_CODE_SUBAGENT_MODEL`）和自动模式分类器模型（`CLAUDE_CODE_AUTO_MODE_MODEL`）；网关根据请求头 `x-claude-code-agent-id` 区分主会话与子 Agent 会话

### 2. 供应商、多账号、插件与 Coding Plan 额度保活
- 三类接入：免 Key 订阅账号登录（Claude Pro/Max/Team、ChatGPT Codex Plus/Pro、Cursor、Grok、Copilot、Devin，支持本机凭证自动发现）、数十家内置厂商预设（DeepSeek、Kimi、智谱 GLM、MiniMax、Qwen、火山引擎、OpenAI、Anthropic、Gemini、本地 Ollama/LM Studio 等）、自定义兼容接口及一键导入现有配置
- 插件系统（`~/.config/magpie/plugins/`）：支持 npm 包、git 仓库或本地目录，可加载 `@opencode-ai/plugin` 与 `pi-ai` 包处理浏览器 OAuth、设备码登录、定期刷新 Token
- Coding Plan 额度管理（`internal/provider/`）：
  - 5 小时窗口预热（`warmup.go`、`warmup_daily.go`）：支持“窗口重置时预热”（重置后发一条极小请求立即开启下一窗口计时）与“每日定时预热”（每天指定时间如 `06:00` 自动唤醒各账号窗口，电脑睡眠唤醒后 1 小时内补发），让工作时段跨过重置点时能连用两个窗口额度
  - 重置卡自动使用（`codex_autoreset.go`）：显示剩余张数与过期时间，支持周额度耗尽且无其他可用账号时或重置卡即将过期前自动使用重置卡

### 3. 路由组与三大内置模板
- 自动路由组 `auto/<模型 ID>`（兼容旧称 `group/auto-<slug>`，源码 `internal/provider/autoref.go`、`canon.go`）：多个供应商提供同名模型时自动合并成组
- 自定义路由组 `group/<id>`：任意不同模型、账号组合，支持最多 8 层嵌套与环检测
- 三个一键路由组模板（`internal/provider/grouptemplate.go`）：
  - `smart`（难题给强模型，简单的给便宜模型）：判断模型把复杂设计/调试交给强模型，简单提问、上下文压缩和子 Agent 请求分给便宜模型
  - `thrifty`（便宜优先）：先用便宜或免费模型，需要高推理或便宜模型失败时切给强模型
  - `steady`（永不卡住）：最多三家不同供应商的最强模型互为后备

### 4. 账号路由策略与故障转移
- 八种路由策略（`internal/gateway/routing.go`）：
  - 智能（`smart`，默认）：在有额度的账号里按“剩余额度 / 距离重置小时数”挑最快重置且宽裕的，5 小时窗排在更晚重置的周窗前面，已用满 90% 以上的账号靠后
  - 按顺序（`order`）：固定按排好的顺序走，前一个答不了才换下一个
  - 轮流（`rotate`）：优先选过去 30 分钟活跃会话最少的账号，摊平用量
  - 最少使用（`usage`）：有额度数据时优先选已用比例低的，普通 Key 按近期指数衰减 Token 用量排序
  - 重置前用完（`pace`）：比较各账号距离周重置每小时还能用掉多少，多的先上
  - 此外还有按权重（`weight`）、免费优先（`free`）、速度优先（`fast`）
- 故障转移（`internal/gateway/fallback.go`）：网关通过 `holdWriter` 在收到上游正常首包前暂存响应，未发给客户端前出错可无感切给下一个账号。五类冷却：429 限流按 `Retry-After` 跳过（无头信息则指数退避最高 30 分钟）、402 欠费停用歇 30 分钟、额度用完休息到重置时刻、模型不可用按账号+模型独立退避、5xx/超时翻倍退避最高 10 分钟

### 5. 会话保持（Session Affinity）与缓存命中保护
- 源码 `internal/gateway/affinity.go`，避免频繁换号丢掉厂商 Prompt 缓存或因跨厂商 `reasoning` 格式不兼容报错：
  - 自动（`auto`，默认）：同一轮工具调用内保持；跨轮时当上一轮缓存读写达 1024 tokens 以上，在 5 分钟保鲜期内（Anthropic 1 小时缓存则为 1 小时）继续锁定同一账号
  - 整个会话（`session`）：只要账号正常响应，24 小时会话期内始终用同一个
  - 一轮之内（`turn`）：从用户发消息到 Agent 工具调用完结保持不变，下次用户发言时重新选
  - 关闭（`off`）：每次请求都重新选
  - 严格（`strict`）：锁定账号且限流时直接等待或报错，不跨账号切换

### 6. 规则分流、替身模型、意图路由与死循环打断
- 按请求特征分流（`internal/gateway/rules.go`）：支持按上下文 Token 长度（甚至一轮中途涨超当前模型窗口 95% 时自动挪给大窗口模型）、是否带图、是否需要 reasoning、来自哪个 Agent、是否在压缩上下文、工作文件夹、星期几与时段分流
- 视觉与搜索替身（`vision.go`、`search.go`）：主模型不支持识图时，由指定的识图模型先把图片转成文字描述交给主模型；主模型不支持联网搜索时，由指定的搜索 API 或搜索替身模型代搜后再把结果交回主模型
- 意图路由（`classify.go`）：判断模型只看最新用户消息（前 3000 字 + 后 1000 字）及截断的上一轮对话（剥离系统提示词、思考内容、工具调用参数/结果和 Claude Code 的 `system-reminder`），默认最多等 8 秒（可调至最高 60 秒），结果按哈希缓存 10 分钟供同轮后续工具调用复用；超时或报错时若上一轮意图仍在候选中则沿用，否则回退默认规则。支持用本地 Ollama / LM Studio 模型做判断
- 死循环检测打断（`loop_guard.go`、`tool_loop.go`）：流式输出最近 256 个语句单元中不重复单元 ≤ 24 个时判定复读死循环；连续 8 轮工具调用的名称、参数、返回结果完全相同时判定工具死循环，自动结束本条回复并返回可重试错误

### 7. 可观测性与本地隐私脱敏
- 实时流水与用量统计（`prompt.go`、`internal/usage/`）：展示每个请求由谁应答、为何选它、每次尝试轨迹、TTFT、TPS、Token 消耗、缓存命中率和折算费用；网关页可按结构化进度条查看 System Prompt / Tools / Messages 占比及自动脱敏密钥后的原始消息
- 本地隐私脱敏（`internal/pii/`）：发往云端前在本地识别并掩码姓名、邮箱、密钥、内部域名，流式返回时实时还原
