# DeepSeek Harness (DSH) Desktop, Plugin System, and Mode Architecture: Source Research

> 调研日期：2026-11-11｜仓库：`/Users/itwanger/Documents/GitHub/deepseek-harness`｜commit fcc0ad4621（基线 2026-09-28 commit 21638c56 为 0.1.7-rc.2；第 6 节为 Mode / Agent Preset / Creator Mode / Team Mode 源码拆解；第 7 节新增 CoT 思维链 / Reasoning 在桌面端 UI 的真实呈现、推理等级控制、多轮回放签名与压缩机制）。

> Research date: 2026-09-28. Read at `origin/master` commit `21638c56315ae6a2b552d6091945d3144c9af32e` (2026-09-27), which is 3 days after tag `dsh-v0.1.7-rc.2` (`477b4f4205`, 2026-09-24). The root `package.json` version is `0.1.7-rc.2`. Between rc.2 and this commit, the only doc changes in the files cited below are small ones: plugin page skeleton and refresh polish, desktop product analytics, and update-copy wording. These are marked "post-rc.2" where they come up. Line numbers refer to the commit above. Items marked **(inference)** are my own reading and are not stated in the source.

## 0. Key terms

- **Cordis**: the plugin framework under DSH. Its slogan is "everything is a plugin": the model adapter, the tool registry, the session log and even the agent loop are all Cordis plugins (`docs/architecture.md:11-13`, `README.md:7`).
- **Plugin**: a TS/JS module that exports `apply(ctx)`, with optional `name` and `inject` (`docs/user/develop/basic/index.md:17-27`).
- **Bundle**: the installable, distributable unit. It is an npm package whose `package.json` declares `dsh.bundle.patch`, a YAML patch that inserts or overrides plugin rows.
- **Profile**: a directory at `$DSH_HOME/profiles/<name>` (default `~/.dsh`) whose `package.json` declares `dsh.profile.bundles` (`docs/user/develop/basic/publish.md:9-16`).

## 1. The plugin mechanism

### 1.1 Definition and manifest

A minimal plugin looks like this (`docs/user/develop/basic/index.md:35-44`):
```ts
import type { Context } from '@deepseek-ai/cordis'
export const name = 'hello-plugin'
export function apply(ctx: Context) { console.log('[hello-plugin] plugin loaded!') }
```
Three forms are supported: function, object, and class (a class form `extends Service`) (`index.md:105-138`). `inject = ['tools']` declares dependencies, and the framework waits for those services before it calls `apply` (`index.md:87-103`). Everything registered through `ctx` is cleaned up automatically on unload, and `ctx.effect()` supplies a disposer for anything else (`index.md:66-85`).

The bundle manifest is `package.json` plus `cordis.patch.yml` (`publish.md:35-62`):
```json
{ "name": "dsh-hello-plugin", "version": "0.1.0", "type": "module", "main": "index.js",
  "files": ["index.js", "cordis.patch.yml"],
  "dsh": { "bundle": { "patch": "./cordis.patch.yml" } } }
```
```yaml
- insert:
    - id: hello
      name: dsh-hello-plugin
```
Optional fields:
- `dsh.client` declares a browser half. The package must also export `./client` (`docs/cookbook/adding-a-package.md:38`).
- `locale/en.json` supplies `meta.title` and `meta.description`.
- A top-level `"icon"` sets the card image (`adding-a-package.md:112-150`).
- DSH packages that the plugin must share with the host should be declared under both `peerDependencies` and `devDependencies` (`publish.md:103`).

A package without `dsh.bundle` still installs, but only as a plain dependency. It prints a warning and activates nothing (`publish.md:64`).

### 1.2 Installation and loading order

**Official CLI**: `dsh plugin --profile <name> <args...>` hands the arguments to pnpm and runs it inside the profile directory, so every pnpm verb works (`apps/cli/reference/README.md:81`). Examples from the docs:
```sh
dsh plugin --profile demo add ./hello-plugin
dsh plugin --profile tui add github:deepseek-harness/turtle-ui
dsh plugin --profile <name> add @deepseek-ai/dsh-subagent-codex
dsh plugin --profile demo remove dsh-hello-plugin
dsh --profile demo --dump-config
```
(`publish.md:80,112,116`; `apps/cli/reference/README.md:86-97`). A Git-source plugin with a `prepare` script is blocked by pnpm ≥10 until you allow it in the profile's `pnpm-workspace.yaml` (`reference/README.md:100`). The CLI refuses to operate on the `desktop` profile with the message `profile "desktop" is managed exclusively by the Electron application` (`apps/cli/src/args.ts:83-86`).

**Layer order**: bundles in `dsh.profile.bundles` order (`@deepseek-ai/dsh-base` first), then the profile's `cordis.patch.yml`, then `$DSH_HOME/cordis.patch.yml`, then each `--patch` in argv order. Later layers win per row, and a patch replaces a row's whole `config` (`publish.md:118-132`). The profile pnpm config uses `nodeLinker: hoisted` and `autoInstallPeers: false` so that every plugin shares the installation's single Cordis instance (`packages/boot/app-boot/src/profile.ts:226-235`).

**Version gate**: before any plugin is imported, DSH checks its `peerDependencies` on `@deepseek-ai/dsh*` against the running version. An incompatible plugin is refused. Exact-version exemptions are stored in the profile's `compatibility.json`, and the CLI provides `dsh plugin --profile <p> version-exemptions | allow-version <pkg@ver> --dsh-version <v> --accept-risk | revoke-version ...` (`packages/boot/app-boot/README.md:52-56`; `packages/boot/plugin-manager/README.md:61-69`).

**GUI (Web and Desktop share it)**: the sidebar **Plugins** page (`packages/client/ui-plugin-manager/README.md:30-54`).
- The page has an **Official** group: bundles the installation ships switched off, which cannot be uninstalled and carry an **Experimental** tag. It also has an **Installed** group.
- **Add plugin** accepts an npm name, a Git address, a tarball, or an absolute path. The Host first runs `inspect`, which calls `pnpm view`, and then installs.
- It streams pnpm output, can cancel, and restores `package.json` and `pnpm-lock.yaml` on failure.
- It offers **Allow these scripts and retry** for blocked build scripts.
- It probes `registry.npmjs.org` against `registry.npmmirror.com` and picks the faster one. The default `fallbackRegistries` is npmmirror (`plugin-manager/README.md:79`).
- When GitHub is unreachable it offers the "Use mainland China mirror" option.

The official optional bundles shipped switched off (`packages/boot/app-boot/src/profile.ts:213-218`):
- `dsh-experimental-agent-team-profile`
- `dsh-experimental-voice-input-bundle`
- `dsh-experimental-auto-review`
- `dsh-experimental-schedule-bundle` (post-rc.2. At the `dsh-v0.1.7-rc.2` tag the list has only the first three.)

**Agent self-install**: yes. The `plugin_manager` tool (`packages/boot/plugin-manager/src/tools.ts:20-31`) has these actions:
```
action enum: list_plugins, list_bundles, set_plugin, set_bundle, install_bundle,
             remove_bundle, list_version_exemptions, set_version_exemption
```
The tool is enabled only in **Creator mode** (preset id `cordis`, UI label "Creator mode", `packages/client/ui-agent-preset/src/client/locales.ts:55`). Starting Creator mode requires the "Coding Tools" switch in General settings (`locales.ts:71`). Creator mode also carries the `cordis_inspect_list` and `cordis_inspect_query` tools and three authoring skills: `cordis-plugin-development`, `cordis-composition-reference`, and `editing-cordis-compositions` (`packages/preset/agent-preset/skills/`). Its example prompts include "Create a DSH plugin that adds a project notes entry to the sidebar ... Install it and verify" (`guide-locales.ts:60-66`).

Every `plugin_manager` action requires `danger-full-access` or approval for that single call. Allowing build scripts needs a separate explicit user approval through `approvedBuilds`. A version exemption needs `acceptRisk: true` (`plugin-manager/README.md:31`; `tools.ts:21-28`).

**Discovery**: there is no marketplace (searching for "marketplace" returns nothing). The README only asks authors to add the `dsh-plugin` topic to their GitHub repositories (`README.md:46`).

### 1.3 Extension points (what a plugin can do)

Because everything is a plugin, the API surface is the whole `ctx` (`docs/cookbook/extension-cookbook.md:98-135`, the feature-to-mechanism table):
- **Tools**: `ctx.tools.register(defineTool({...}))` (`docs/user/develop/basic/tool.md:9-34`). MCP tools are registered through the same interface.
- **Hooks**: waterfall events such as `tools/pre-execute`, `tools/post-execute`, `agent/pre-step`, `agent/request` and `agent/turn-stopping`, which can allow, deny or ask. There are also compatibility packages `dsh-hooks-claude-code` and `dsh-hooks-codex`.
- **System prompt**: `ctx.systemPrompt.section()`.
- **Commands and scheduling**: slash commands, scheduling, `followup()`/`steer()`, model adapters (`registerAdapter`), subagent providers, skill providers, compaction backends, and so on.
- **UI slots** (browser half, `ctx.slots.inject/register`). Examples: `sidebar`, `main`, `sidebar.right.pane.tab`, `conversation.composer`, `conversation.input.dock`, `conversation.chat.node`, `tool.call.toolview`, `settings.section`, `settings.general.item`, `shell.overlay`. The Plugins page adds `plugins.item`, `plugins.bundle.config`, `plugins.row.config` and `plugins.detail.actions/badge/section` (`ui-plugin-manager/README.md:58-86`).
- The agent can also inspect the runtime API before writing code, through `tool-cordis`.

### 1.4 Isolation and trust model (important)

- **Host half runs in-process with no sandbox**: "installed Host code executes in-process outside the workspace sandbox" (`plugin-manager/README.md:31`). On Desktop, "Both host and plugins execute in the same Electron Node-mode process" (`apps/desktop/README.md:81`).
- **Browser half runs in the main page**: the client half loads as a lazy bundle served under `/plugins` in the same document as the app, with no iframe or worker (`packages/client/modules/README.md` Summary; `docs/architecture.md:55`, "activating client plugins in the same document").
- **The only `node:vm` realm is for Creator dynamic definitions**, which are process-local and gone on restart. Persistent plugins go through Plugin Manager (`packages/extensions/cordis-host-runner/README.md` Summary).
- `SAFETY.md:9,23` states that untrusted plugins may damage the host computer and asks users to review plugins before running them.
- Credentials: `~/.dsh/.credentials.yaml` is protected only by 0600 permissions. An agent or plugin running as the same OS user can read it, and an OS-keychain provider is deferred (`packages/credentials/credentials-local/README.md:115,200,212`).
- Official requests include the plugin package inventory: the `dsh_plugin_packages` field (`{name, version}` pairs) is on by default in every official DeepSeek API request (`packages/llm/plugin-package-inventory-deepseek/README.md`, Configuration section, `enabled: true`).

### 1.5 Plugins compared with Skills and MCP

| | Plugin/Bundle | Skill | MCP server |
|---|---|---|---|
| Form | npm package with JS code running in-process | `SKILL.md` or `<name>.md` instructions with YAML frontmatter | External process or HTTP service |
| Location | `$DSH_HOME/profiles/<p>/node_modules` | `<proj>/.dsh/skills`, `<proj>/.agents/skills`, `~/.dsh/skills`, `~/.agents/skills` (`packages/skill/skill-filesystem/README.md:50-54`) | One `@deepseek-ai/dsh-mcp-client` row per server in `cordis.patch.yml`; tools are named `mcp__<server>__<tool>` |
| Install | `dsh plugin add` / Plugins page / `plugin_manager` | Drop the file in place; directories are watched and hot-loaded | Write a YAML row. No MCP settings UI package was found |
| Trust | Full host privileges | Prompt text only | "each server command is trusted executable code outside the agent sandbox"; none enabled by default (`apps/cli/reference/README.md:131`) |

In DSH, Skills and the MCP client are themselves plugins. `dsh-skill-filesystem` and `dsh-mcp-client` are ordinary Cordis packages.

### 1.6 Web compared with Desktop

The mechanism is the same on both. Desktop README design table: "Plugin changes | Desktop and Web need the same installation and activation behavior. | The main application uses the shared Web Plugin Manager and bundled pnpm." (`apps/desktop/README.md:72`). The differences are:
1. **Separate profiles**. Web uses `~/.dsh/profiles/web` and Desktop uses `~/.dsh/profiles/desktop`. Plugins installed in one are not shared with the other. Sessions, settings and credentials are shared (`README.md:70,81,444`).
2. **Bundled pnpm on Desktop**, so pnpm does not need to be on PATH (`:13`).
3. **Native recovery on Desktop**: after a startup crash, a native dialog offers "Disable third-party plugins, back up profile patch, and restart" (`:111,117`).
4. **Update lock**: a mandatory-update policy `40005` refuses further plugin mutations (`:414`).
5. "Electron exposes no plugin-management IPC"; the page goes through the same authenticated HTTP API (`:83`).

## 2. Desktop app compared with WebUI

**Stack**: Electron `^44` + electron-builder + electron-updater `^6.8.9` (`apps/desktop/package.json`). The shell loads the complete Web app from `dsh-app://app/` ("an Electron shell around the complete dsh Web application", `README.md:7`). A privileged scheme is registered at `src/main.ts:129-139`.

**How the shell talks to the agent**: Electron spawns a child process with `ELECTRON_RUN_AS_NODE=1` that runs `@deepseek-ai/dsh-desktop-host`, which in turn runs the shared CLI profile runner and the Web Host (`src/host-process.ts:189-199`; `src/node-environment.ts:15`). The window's HTTP requests are forwarded to that local authenticated Web Host, and WebSocket streams connect straight to it. Node IPC carries only boot injections, readiness and shutdown. The default port is **19387**, while Web uses **3080** (`README.md:7`). **(inference)** Desktop runs the same local server stack as the WebUI and does not embed a separate agent. Note that `packages/host/webserver/README.md` Summary still says "Electron loads dist over file:// and carries fetch over an IPC bridge", which contradicts the Desktop README and is stale.

**WebUI security model**: binds to `127.0.0.1` by default, and `dsh web --host 0.0.0.0` is explicitly unsupported (`apps/cli/reference/README.md:115`). Each process mints a random launch token. The opened URL carries `?token=...`, which is exchanged for a signed cookie (HttpOnly, SameSite=Strict, 30 days, no `Secure`) whose secret lives in `~/.dsh/.credentials.yaml`. Every request goes through Host/Origin checks against DNS rebinding and cross-site requests (`packages/client/connection/README.md:39-43`). On Desktop, credentials are attached only for the owned window (`apps/desktop/README.md:7`). The renderer gets no filesystem, raw IPC, shell or arbitrary pnpm arguments (`:83`). `<webview>` is allowed only in the main window, with sandbox and contextIsolation (`:85`).

**Desktop-only capabilities**:
- **Auto-update**. `src/update-coordinator.ts:67-72`:
  ```ts
  this.updater.autoDownload = false
  this.updater.autoInstallOnAppQuit = false
  this.updater.channel = 'nightly'
  this.updater.allowPrerelease = true
  this.updater.allowDowngrade = false
  ```
  The updater uses a generic provider with the fixed Nightly channel (`scripts/electron-builder-config.mjs:247`). Production source is `https://download.deepseek.com/dsh-desk/feeds/<mac-arm64|mac-x64|win-x64>/` (`README.md:240`). It checks every 10 minutes with ±20% jitter and backs off to at most 1 hour on failure. Automatic checks never download; the user clicks to download (`:381-385`). The Electron shell, the dsh runtime and pnpm form one signed update unit, and the shell and dsh versions always match exactly (`:67,73`). There is also a **mandatory update policy** at `/api/v0/check_client_update`, which shows a blocking modal (`:391-418`). Linux is not a release target (`:210`).
- **Window, tray and menus**. Closing the window only hides it and tasks keep running. Quitting asks for confirmation when tasks are running (`:27,31`). Only Windows has a tray icon; macOS has no menu-bar icon (`:29`; `src/tray.ts:23`). Native About, Check for Updates and Edit menus exist (`:9,95`). A single-instance lock is enforced (`src/single-instance.ts:20`). There is one main window of 1280×820, min 520 wide (`src/main.ts:204-207`); **no multi-window** was found (the other windows are welcome, update overlays and test login).
- **Native directory dialog** (`:11`; `src/directory-picker.ts:24`). **Deep link** `dsh://open` only brings the window forward and carries no credentials (`src/main.ts:1195-1198`; `README.md:449`). **Notifications** are used only for mandatory-update reminders (`src/update-attention.ts:43`). Custom keybindings are stored in `userData/keybindings.json` (`:43`).
- **Bundled runtime**: independent Python, Node.js and pnpm. Python ships numpy, pandas, python-docx, python-pptx, openpyxl and more, installed to `~/.dsh/dsh-runtimes/dsh-primary-runtime`. The `office-docx`, `office-pptx` and `office-xlsx` skills are registered by default (`:55-57`).
- **Sidebar Browser** is enabled by default on Desktop (`<webview>`). On Web it is off by default and uses an iframe (`packages/bundle/web-app/cordis.patch.yml:276-279`; `packages/client/ui-sidebar-browser/README.md:12,28`).
- **Crash reports** are written to `~/Library/Logs/DeepSeek Harness` (`:115`).
- **Post-rc.2**: Desktop reports product analytics through OTel by default "without a user-facing control"; Web does not (`packages/client/product-analytics/README.md` Summary).

**Sign-in**:
- Sign-in uses a **DeepSeek Platform account**. The default `platformOrigin` is `https://platform.deepseek.com` (`packages/credentials/deepseek-account-platform/src/index.ts:53`).
- It is OAuth with PKCE S256. The system browser opens `/dsh/authorize`, and a local loopback serves `/oauth/callback` (`index.ts:540-588`).
- The token is saved to the local credential store as a grant (`index.ts:601`). It does not go to the OS keychain.
- After sign-in, the `llm-deepseek-account` route uses the account token (`x-dsh-auth-token`) for inference and "never falls back to an API key" (`packages/llm/llm-deepseek-account/README.md`).
- It also reads balance, shows embedded Usage and Top-up Platform pages, and shows arrears and bonus notices (`deepseek-account-platform/README.md:37-45,102-106`; `apps/desktop/README.md:15`).
- **No cloud sync** of sessions or settings was found.
- Sign-in is available on both Web and Desktop. The `deepseek-account` row is in the base bundle, and Desktop only adds `desktopPlatform` (`packages/bundle/base/cordis.patch.yml:112-115`).
- Note that `apps/desktop/README.md:440`, "Account sign-in is not connected; the Sign in button is disabled", is stale. The code enables it (`src/client/WelcomePage.tsx:212`), and the Sep 16 commit "integrate DeepSeek account sign-in" added it.

**Data upload (shared by Web and Desktop)**: on by default, `session-log-deepseek` uploads session-log increments with official DeepSeek requests (`enabled: true`; `packages/session/session-log-deepseek/README.md:30-33`; `apps/cli/reference/README.md:127`).

## 3. Architecture overview

The monorepo layout (`package.json` workspaces):
- `packages/*/*`: about 60 capability groups, all Cordis plugins.
- `apps/cli` (the `dsh` launcher), `apps/web` (frontend), `apps/desktop` (Electron) and `apps/desktop-host` (the private Desktop Host).
- `native/` (Linux `landlock-run` and flock) and `python/sdk`.

The client side (`packages/client/*`, React UI and slots) and the host side are built separately (`build:lib:host` and `build:lib:client`).

Main pieces:
- **Agent loop**: `core/agent-loop` drives turns and steps, with waterfall events as extension points (`docs/architecture.md:66-107`).
- **Tools**: `core/tools` holds the scoped registry and the guarded pipeline.
- **Sessions**: an append-only JSONL log under `~/.dsh/sessions` (`packages/bundle/base/cordis.patch.yml:133`).
- **Compaction**: `compaction-basic` condenses old history into a summary under token pressure, retries after overflow, and supports `/compact` (`packages/compaction/compaction-basic/README.md`).
- **Sub-agents**: `dsh-subagent` offers in-process, ACP, SDK, Codex and Claude Code children side by side (`packages/subagent/subagent/README.md`).
- **Sandbox**: new sessions default to `workspace-write` (bwrap, Landlock or Seatbelt) (`apps/cli/reference/README.md:121`).
- **Presets**: Standard, Minimal ("极简"), PTC and Creator.

## 4. Memory

- **No official long-term memory tool or plugin was found.** The extension cookbook lists "Memory" only as a mechanism, "section provider + tool" (`extension-cookbook.md`), and no shipped package implements it.
- **What ships officially**:
  1. `dsh-agent-instructions` injects `~/.dsh/AGENTS.md` plus the project's `AGENTS.md`/`CLAUDE.md` (and `*.local.md`) chain as a durable user message on the first request, with a 65,536-byte budget (`packages/context/agent-instructions/README.md:32,64-66`; `apps/cli/reference/README.md:119`).
  2. Sessions are persisted to disk and use compaction.
  3. Web supports `@`-mentioning other sessions (`session-reference`), which injects a read-only snapshot marked as untrusted background (`packages/bundle/web-app/cordis.patch.yml:93`).
  4. There is a `session_search` tool, but no shipped bundle or preset enables it.
- **Third-party memory**: the official guide `docs/user/guide/mcp-memory.md` gives three **default-off** MCP reference configurations (Memorix, MCP Reference Memory, Engram), loaded with `dsh web --patch .../memorix.cordis.yml`. The guide states that their inclusion "does not imply endorsement, recommendation, partnership, or ongoing support by DeepSeek" (`:5-7,17-31`). The stdio bridge strips environment variables that look like credentials, and all `DSH_*` variables (`:13`).
- **Bearing on the article's advice not to install third-party memory plugins**:
  - Supporting it: SAFETY.md and the plugin-manager README both say third-party plugins run in-process, outside the sandbox, with full privileges. The official route for memory is MCP, and DeepSeek disclaims endorsement.
  - Against it: the official docs themselves provide ready-made configurations for third-party memory, and the code does not forbid them. It is more accurate to say "officially there is only instruction-file 'memory'; for third-party memory, use the MCP reference configs rather than an unreviewed plugin".

## 5. Changes from 0.1.5 to 0.1.7-rc.2

There is no CHANGELOG file. From `git log dsh-v0.1.5-rc.1..dsh-v0.1.7-rc.2`: 2,437 non-merge commits. Tag dates: 0.1.5-rc.1 on 09-10, 0.1.6-alpha.1 on 09-15, 0.1.7-alpha.1 on 09-22, 0.1.7-rc.2 on 09-24. The busiest scopes were web (381), desktop (203), plugin-manager and plugins (78).

**Desktop**:
- Native Windows installer and icons (09-10/11)
- Welcome window (09-11)
- Web UI loads before backend readiness; native recovery dialog (09-15)
- Ordinary and mandatory update flows; bundled Python Office runtime and Office skills; native About (09-16)
- DeepSeek account sign-in and Platform pages (09-16/17)
- Windows caption menus (09-17)
- Sidebar webview browser; F12 DevTools; build-version publishing (09-21)
- Crash report (09-22)
- Close hides the window and quit asks for confirmation; arrears and top-up notices by credential (09-23/24)

**Plugins**:
- Plugin manager, preset user layers and external bundle isolation (09-04)
- Install cancellation (09-14)
- Official optional bundles shipped switched off, including Auto review (09-15)
- Registry fallback and remembering the registry choice (09-18)
- Manifest icons (09-20)
- Mirror recovery for GitHub install failures; picking the fastest public registry; preferring the mainland mirror (09-22)
- DSH peer version compatibility with exact exemptions and typed refusals (09-23)
- Offering Auto review while keeping Inspector explicitly installed (09-24)
- Creator progressive skills (09-21)

**Post-rc.2 on master**: Schedule became an optional bundle; Desktop OTel product analytics; the whale-tail running animation.


## 6. Modes, Agent Presets, and Creator Mode (`8bd073392e`, `0.2.2-alpha.3`, 2026-11-03)

Between `21638c56` (2026-09-28, `0.1.7-rc.2`) and `8bd073392e` (2026-11-03, `0.2.2-alpha.3`), 4,745 commits landed. Below is the exact architecture of "Modes" (Agent Presets), "Creator mode" / "Create Mode", conversational preset/plugin authoring, Personalized Recommendations, and Subagent/Team modes at `8bd073392e`.

### 6.1 What is a "Mode" in DeepSeek Harness?

In DeepSeek Harness, a user-facing **Mode** (中文 UI 称「模式」或「Agent 预设」) is an **Agent Preset**: a declarative Cordis plugin composition declared by `@deepseek-ai/dsh-agent-preset` (`packages/preset/agent-preset/src/index.ts:13-30`) and managed at runtime by `@deepseek-ai/dsh-agent-preset-registry` (`packages/preset/agent-preset-registry/src/index.ts:54-414`, service key `ctx.agentPresets`).

As the built-in guide explains (`packages/client/ui-agent-preset/src/client/guide-locales.ts:58-60, 136-137`):
> "A plugin adds capabilities to DSH, such as a tool, a service connection, or a UI entry. A mode is an agent preset that selects tools and defines how the agent works in a task. A plugin can be included in a custom preset."
> （"插件为 DSH 增加能力，例如工具、服务连接或界面入口。模式是一份 Agent 预设，用来选择任务可用的工具，并约定 Agent 的工作方式。自定义模式中也可以使用自己开发的插件。"）

Key architectural division (`packages/bundle/web-app/cordis.patch.yml:478-601`, `.agents/notes/implemented/architecture/2026-08-10-host-plane-ownership-after-presets.md`):
- **Host plane (shared across all sessions)**: LLM adapters, tool/prompt/skill registries, the `core/agent-loop`, session JSONL persistence, background job registry (`jobs-local`), schedule service (`dsh-schedule`), token meter, sandbox policy, and subagent backends. In `packages/bundle/web-app/cordis.patch.yml:495-593`, process-wide per-agent tool rows inherited from `dsh-base` are explicitly `disabled: true` so that each Web/Desktop session mounts its own preset instead.
- **Preset plane (per-preset revision scope)**:
  - **Persona (`@deepseek-ai/dsh-persona`)**: `packages/preset/persona/src/index.ts:30-75`. Registers `deployment:persona-prefix` (order `0`) and `deployment:persona-suffix` (order `10200`) in the preset's scope, shadowing the global `system-prompt` persona for sessions using this mode. Supports `complete: true` (makes `prefix` the entire system prompt and suppresses all other sections) and `includeRuntimeContext: false` (suppresses optional runtime context).
  - **Scoped Tools & Policies**: `tool-bash`, `tool-pwsh`, `tool-fs`, `tool-fs-search`, `tool-jobs`, `tool-schedule`, `tool-skill`, `tool-goal`, `tool-ask-user`, `tool-todo`, `tool-web`, `tool-present`, `tool-plugin-manager`, `tool-cordis`, `tool-executor-ptc`, etc.
  - **Isolated Service Groups (`cordis:group` + `isolate`)**: Any preset child plugin that provides a Cordis service must isolate the provider and its consumers inside a `cordis:group` with `isolate: { <service>: true }` (`packages/preset/agent-preset-registry/src/mount.ts:59-83, 211-213`). If a preset leaks a service into the root realm, `leakedServices()` catches it and fails the preset mount with `Preset services require isolate realms: ...`.

### 6.2 How Presets Are Defined, Loaded, and Bound to Sessions

1. **Declaration Schema** (`packages/preset/agent-preset/src/index.ts:16-23`, `packages/preset/agent-preset-registry/src/definition.ts:5-11`):
   ```yaml
   - id: preset-review
     name: '@deepseek-ai/dsh-agent-preset'
     config:
       id: review
       name: Review
       description: Reviews changes with the shell only.
       order: 10
       plugins:
         - id: persona
           name: '@deepseek-ai/dsh-persona'
           config:
             prefix: You review software changes.
         - id: tool-bash
           name: '@deepseek-ai/dsh-tool-bash'
   ```
   `AgentPreset` sets `static readonly [EntryGroup.key] = true` (`packages/preset/agent-preset/src/index.ts:15`) so child `!!js` expressions are preserved until the preset's own Loader tree activates them.
2. **Eager Activation & Reference-Counted Revisions (`Generation`)** (`packages/preset/agent-preset-registry/src/index.ts:33-47, 97-168` and `src/mount.ts:204-216`):
   - When a `@deepseek-ai/dsh-agent-preset` row activates, `ctx.agentPresets.register(config)` eagerly creates a detached `Scope` (`createScope(this.owner, key)`) and mounts an in-memory `PresetTree` (`mountPreset()`).
   - `auditRows(tree)` (`mount.ts:134-158`) checks every enabled child row for import/activation errors or missing injected services, and `leakedServices()` checks for un-isolated services. If any check fails, `record.broken` stores the diagnostic string; the preset remains visible in the Settings roster with a `Failed to load` (`加载失败`) badge, without crashing the app.
   - Each live revision is tracked as a `Generation { scope, key, mount, users, retired }`. When a preset definition is updated or unloaded, the old `Generation` is marked `retired = true`, but its scope is disposed only when `users === 0` (`collect()`). Thus, running Agents and their subagents keep the exact tool/prompt composition they started with (`KV Cache` prefix stability), while new sessions bind to the new revision.
3. **Session Binding & First-Turn Lock** (`packages/preset/agent-preset-registry/src/index.ts:266-383`, `src/session.ts:30-46`):
   - An Agent binds its scope parent to the selected `Generation.key` via `bindScopeParent(key, generation.key)` (`index.ts:282`).
   - While a session is still **blank** (`boundary.openTurnStartSeq === null && boundary.lastTurn === 0`), calling `@Remote('select')` (`index.ts:364-383`) recomposes the blank Agent (`recompose()`) and appends `{ type: 'agent-preset/selected', data: { agentPreset } }` to the session JSONL log.
   - Once the first turn starts, `select` throws `RemoteError('agent-preset/locked', 'This session has already started')` (`index.ts:368-370`).

### 6.3 The 4 Built-in Modes (Presets)

Shipped in `packages/bundle/web-app/presets/*.patch.yml` (localized names/descriptions resolved via `packages/preset/agent-preset-registry/src/display.ts:40-73` and `packages/client/ui-agent-preset/src/client/locales.ts:50-62, 95-103`):

1. **Standard mode / 标准模式 (`id: standard`, `order: 1`, default)** — `packages/bundle/web-app/presets/standard.patch.yml:1-130`:
   - Persona: `You are a coding agent powered by the {{model}} model.`
   - Includes: `agent-instructions` (64 KiB budget), `time-context`, `tool-bash`/`tool-pwsh`, `tool-fs` (`applyPatch: false`), `tool-fs-search`, `tool-jobs`, `tool-schedule`, `skill-filesystem` + `tool-skill`, `command-goal` + `tool-goal`, `planning` group (`plan-mode`), `compaction` group (`compaction-basic`, `command-compact`, `tool-result-pruner` at 8192 chars), `delegation` group (`tool-subagent-control`, `tool-subagent` spawn, `tool-subagent-fork` fork, `workflow-ptc`, `tool-workflow`), `tool-ask-user`, `tool-todo`, `tool-web`, `present` (`dsh-tool-present`), and `tool-plugin-manager` (enabled when `profileContext` is present; note that in `0.2.1+`, Standard mode also has `plugin_manager` enabled!).
2. **PTC mode / PTC 模式 (`id: ptc`, `order: 2`)** — `packages/bundle/web-app/presets/ptc.patch.yml:1-134`:
   - Programmatic Tool Calling. Mounts `@deepseek-ai/dsh-tool-executor-ptc` (`ptc.patch.yml:125-126`), which gives the model `run_code` to write TypeScript programs calling tools through a generated SDK in a sandboxed runtime (`dsh-ptc-runtime-node`), filtering/aggregating results before returning to the model.
   - Disables `workflow-ptc`, `tool-workflow`, `tool-plugin-manager`, and `tool-plugin-market`.
   - Hidden when "Coding Tools" (代码工作工具) is turned off in General Settings (`packages/client/ui-agent-preset/src/client/settings-store.ts:53-55`).
3. **Minimal mode / 极简模式 (`id: minimal`, `order: 3`)** — `packages/bundle/web-app/presets/minimal.patch.yml:1-78`:
   - Persona: `prefix: You are a helpful software engineer assistant.`, `complete: true`, `includeRuntimeContext: false` (`minimal.patch.yml:11-16`). Suppresses all other system prompt sections and optional runtime context!
   - Mounts only: `tool-fs` with `read: false, readImage: true, write: false, edit: false` (`read_image` only), `compaction` group (`compaction-basic` + `/compact`), and `persistent-shell` group (`dsh-terminal`, `dsh-terminal-bash`, `dsh-tool-bash-persistent` / `dsh-tool-pwsh-persistent` with 300s timeout).
   - Used for baseline benchmarking and A/B comparisons. Also gated behind the "Coding Tools" switch.
4. **Creator mode / 创造模式 (`id: cordis`, `order: 4`)** — `packages/bundle/web-app/presets/cordis.patch.yml:1-138`:
   - Everything in Standard mode, **plus**:
     - `tool-cordis` (`@deepseek-ai/dsh-tool-cordis`, `cordis.patch.yml:122-123`): provides `cordis_inspect_list` and `cordis_inspect_query` (`packages/extensions/tool-cordis/src/index.ts:22-73`) to inspect live Host and Client Services, Events, mounted plugin `Config` JSON Schemas (`Config.listConfigs`), live Tool schemas, theme tokens, and the live React UI `Slots` tree (`Slots.listSubTree`).
     - `skill-filesystem` with `customSkillDirs` pointing to `@deepseek-ai/dsh-agent-preset/skills` (`cordis.patch.yml:124-128`), mounting 4 specialized skills:
       1. `agent-experience`
       2. `cordis-plugin-development` (with `references/host-plugin.md`, `ui-plugin.md`, `mcp-bundle.md`, `practices.md`, `user-actions.md`, `verification.md`, and copyable `templates/decoration` and `templates/mcp`)
       3. `editing-cordis-compositions` (how to create or override Agent Presets / Modes as bundles)
       4. `cordis-composition-reference` (Loader YAML dialect + generated `references/packages.md` catalog of all ~140 Cordis plugin packages)
     - `tool-plugin-manager` (`@deepseek-ai/dsh-plugin-manager/tools`) and `tool-plugin-market` (`@deepseek-ai/dsh-plugin-market/tools`, active when the custom plugin index bundle is enabled).
   - **Important change since `0.2.0-rc.1` (`3c26fdd204`, `3c17f569da`)**: Creator mode (`cordis`) and custom presets are **no longer gated behind Coding Tools**! Even with Coding Tools off in General Settings, Standard, Creator, and Custom modes remain available (`packages/client/ui-agent-preset/README.md:30`, `settings-store.ts:53-55`).

### 6.4 How "Create Mode" (Creating a Custom Mode or Plugin) Works Under the Hood

In `0.2.2-alpha.3`, **there is no manual YAML text editor in the Web UI and no `agent_preset` write tool anymore** (removed in `#4569` `d1e22a7e24`, restored as read-only viewer in `2426d398b5` and Creator button in `d52227c135`). Instead, **all Mode (Agent Preset) and Plugin creation is conversational through Creator Mode (`cordis`)**, backed by bundle installation (`plugin_manager`).

#### A. Five Entry Points to Create a Mode or Plugin in the UI
1. **New-Session Mode Chip (`AgentPresetSeat`)**: `packages/client/ui-agent-preset/src/client/AgentPresetSeat.tsx:81-221` (slot `conversation.hero.agentPreset`, beside the workspace picker on the blank new-session screen). Users click the chip and select **Creator mode（创造模式）** or any custom mode before the first turn starts.
2. **Settings → Agent presets → "Let the agent help me create a preset"（让 Agent 帮我创建预设模式）**: `packages/client/ui-agent-preset/src/client/AgentPresetSection.tsx:85-100`. In the **Custom（自定义）** group of `Settings → Agent presets`, a `+ Let the agent help me create a preset` button invokes `startCreatorDraft()` (`packages/client/ui-agent-preset/src/client/index.ts:216-222`):
   ```ts
   const startCreatorDraft = () => {
     const listed = mainBlank()?.projectionValues?.agentPreset
     if (typeof listed !== 'string' || listed === 'cordis') (mainBlankSeat() ?? unboundSeat).stage('cordis', true)
     scope.uiWorkspace.startSession(undefined, { clearPreviousDraft: false, agentPreset: 'cordis' })
   }
   ```
   When triggered from Settings, `stage('cordis', true)` sets `introduce: true`, which plays a character-by-character staggered fade-in animation on the `AgentPresetSeat` hero chip (`AgentPresetSeat.tsx:52-68, 122-160`) to visually announce that the new task switched to Creator mode!
3. **Plugins Page → Add plugin dropdown → "Let the agent create a plugin"（让 Agent 创建插件）**: `packages/client/ui-agent-preset/src/client/CreatePluginMenuItem.tsx:27-50` (registered in slot `plugins.add.actions`), which calls the same `startCreatorDraft()`.
4. **Three Region "More" Menus → "Create your plugin"（创建你的插件）**: `packages/client/ui-entry-customization/src/client/index.ts` & `locales.ts:6-20` (added in `#6247` `5ff29190ed`). Clicking `More` in the left sidebar (`sidebar.panellist.actions`), `More conversation views` in the session header (`conversation.session.header.views.actions`), or `More tools` in the right sidebar guide (`sidebar.right.tab.guide.actions`) and choosing **Create your plugin** opens a Creator mode session (`agentPreset: 'cordis'`) and pre-fills the composer draft (without auto-sending) with a region-specific prompt:
   - Left sidebar: `"创建一个带左侧栏入口的 DSH 插件。"` (`Create a DSH plugin with a left sidebar entry.`)
   - Conversation view: `"创建一个 DSH 会话视图插件。"` (`Create a DSH conversation view plugin.`)
   - Right sidebar: `"创建一个带右侧栏入口的 DSH 插件。"` (`Create a DSH plugin with a right sidebar entry.`)
5. **Experimental: Personalized Recommendations Action Card ("Create" button below an answer)**: `@deepseek-ai/dsh-personalized-recommendations` (`packages/experimental/creation-recommendations/src/index.ts:91-327`). When enabled, if the user asks for or implies a reusable view/page/tracker, the Agent loads the `personalized-pages` skill and calls `propose_action` (`action: 'create_personalized_page'`) in the same turn. Below the answer, an interactive card lets the user pick a location (`Right sidebar`, `Session tab`, `Global page`, or `Write your own`) and click **Create**. Clicking **Create** spawns a background subagent running the `cordis` (Creator) preset (`startActivation({ provider: 'spawn', agentPreset: 'cordis', cwd: sourceDirectory, ... })`, `index.ts:269-294`) that writes the plugin into `.dsh-created-plugins/<uuid>`, returns `structured_output({ ready: true })`, and the Host validates, copies to `$DSH_PROFILE_DIR/created-plugins/<uuid>`, and installs it via `ctx.pluginManager.installBundle(directory)` with one-click **Undo** and **Restore**!

#### B. Step-by-Step: How Creator Mode Authors and Installs a Custom Mode
When a user in Creator mode asks to create a custom mode (e.g., *"基于标准模式创建「代码审查」模式…保存成可选择的预设"*), the agent follows `packages/preset/agent-preset/skills/editing-cordis-compositions/SKILL.md:16-84`:
1. **Inspect existing presets/packages**: Uses `cordis_inspect_query` (`Config.listConfigs`) or reads `packages/bundle/web-app/presets/standard.patch.yml` and loads `cordis-composition-reference` to see all available plugin packages and their `Config` schemas.
2. **Write a 2-file Bundle in the workspace** (plus optional `locale/*.json` and `icon.svg` per `host-plugin.md`):
   - `<mode-dir>/package.json`:
     ```json
     {
       "name": "@local/dsh-review-preset",
       "version": "1.0.0",
       "private": true,
       "type": "module",
       "dsh": { "bundle": { "patch": "./cordis.patch.yml" } }
     }
     ```
   - `<mode-dir>/cordis.patch.yml`:
     - To **add a new custom mode**, use `- insert:` with a `@deepseek-ai/dsh-agent-preset` row (`id: preset-<id>`):
       ```yaml
       - insert:
           - id: preset-review
             name: '@deepseek-ai/dsh-agent-preset'
             config:
               id: review
               name: Review
               description: Reviews changes with the shell only.
               order: 10
               plugins:
                 - id: persona
                   name: '@deepseek-ai/dsh-persona'
                   config:
                     prefix: You review software changes.
                 - id: tool-bash
                   name: '@deepseek-ai/dsh-tool-bash'
       ```
     - To **override a built-in mode** (e.g. `standard`), target its Loader row id (`preset-standard`) without `insert` (replaces `config` wholesale).
3. **Install via `plugin_manager` tool**: Calls `plugin_manager` with `action: "install_bundle"` and `target: "<absolute-path-to-bundle-dir>"`.
   - `PluginManager` links/installs the package into `$DSH_HOME/profiles/<profile>`, adds `"@local/dsh-review-preset"` to `dsh.profile.bundles` in the profile's `package.json`, and hot-reloads the profile Loader tree (`dsh-hmr`).
   - `AgentPreset` activates immediately (`AgentPreset[Service.init]`), calling `ctx.agentPresets.register(this.config)`, which mounts the new `PresetTree` and adds `review` to the live preset roster!
4. **Verify**: The agent checks the `install_bundle` result (`application: "applied"`) and `cordis_inspect_query` / `list_plugins`. The new mode immediately appears under **Custom（自定义）** in `Settings → Agent presets` and in the new-session mode picker chip!

### 6.5 Subagent Preset Selection & Agent Teams Mode (`0.2.1` – `0.2.2`)

Two additional "Mode" mechanisms landed in recent releases:
1. **Subagent Preset Selection (`allowedAgentPresets` & `agentPreset`)**:
   - `packages/subagent/tool-subagent/src/preset-selection.ts:5-72` and `docs/upgrade-guide/v0.2.1-alpha.1/subagent-preset-composition/guide.md`.
   - Previously, `dsh-tool-subagent` configured child agents with inline `persona` and `toolFilter`. Those fields were removed! Now, an in-process `spawn` subagent tool row can configure `agentPreset: '<default-preset-id>'` and `allowedAgentPresets: ['reviewer', 'researcher', ...]` (`snapshots/session/subagent-agent-preset/cordis.yml:28-34`).
   - That exposes an `agent_preset` enum parameter on the `subagent` tool so the parent Agent can dynamically spawn specialist subagents running different custom Modes!
2. **Session Team Mode (`@deepseek-ai/dsh-agent-team` & `@deepseek-ai/dsh-tool-agent-team`)**:
   - `docs/upgrade-guide/v0.2.1-rc.2/session-team-mode/guide.md` and `docs/upgrade-guide/v0.2.1-rc.3/team-mode-menu/guide.md`.
   - Agent Teams moved out of `experimental` into `packages/team/` and is mounted by default in `dsh-base` and `dsh-web-app`.
   - Users toggle **Use Agent Teams** per root Session directly inside the conversation's model and reasoning menu (`remote.agentTeams.setEnabled(rootSessionId, enabled)`), or set `agent-team.defaultEnabled: true` in Cordis config (`e180fce05a`). When enabled, the root session and its subagent tree get shared DAG task board tools (`task_create`, `task_update`, `task_list`, `task_wait`, etc.) and a live shared task board under the Subagent header panel.
3. **Plan Mode (`/plan` & `@deepseek-ai/dsh-plan-mode`)**:
   - Mounted inside `standard`, `ptc`, and `cordis` presets inside an isolated `planning` group (`standard.patch.yml:48-68`), gated by `exit_plan_mode` review while keeping the tool catalog identical for KV-cache stability.
4. **Permission Presets (`@deepseek-ai/dsh-permission-presets`)**:
   - Separate from Agent Presets: bundles sandbox mode (`read-only`, `workspace-write`, `danger-full-access`) and approval policy (`auto`, etc.), selectable via `/permission` or the composer permission seat.

---

## 7. CoT / Reasoning (Thinking) Architecture, Desktop UI Presentation, Effort Control & Replay (`fcc0ad4621`)

> **核心避坑提醒**：DeepSeek Harness 桌面端**没有**单独的“开启/关闭思考模式”开关按钮，思考过程在聊天窗口里也**不是**一上来就大段展开的灰色折叠框。写文章或口播稿时，严禁把网页版聊天框的刻板印象套到 DeepSeek Harness 桌面端上。

### 7.1 桌面端如何控制思考开关与深度：模型菜单中的「推理等级」
- **UI 入口**（`packages/client/ui-model-selection/src/client/locales.ts:21-25`、`README.zh.md:34-44`）：在输入框（Composer）右下角点击模型触发器（或输入 `/model`），根菜单包含「模型」（`menu.model`）和「推理等级」（`menu.effort`）两项。
- **四档递增推理等级**（`packages/llm/llm-deepseek/src/model-info.ts:6-31`）：官方 `llm-deepseek` 适配器按从低到高顺序公布四个等级：
  - `off`（`Off`）：Use for simple tasks that do not need reasoning.
  - `low`（`Low`）：Prefer for routine or latency-sensitive tasks.
  - `high`（`High`，**默认值**）：The default balance for most tasks.
  - `max`（`Max`）：Reserve for the hardest quality-first tasks.
- **底层序列化映射**（`packages/llm/llm-deepseek/src/serialize.ts:147-156`）：
  - 当选择 `low`、`high` 或 `max` 时，请求体发送 `thinking: { type: 'enabled' }` 并附带 `output_config: { effort: 'low' | 'high' | 'max' }`。
  - 只有当把「推理等级」切换到 `off` 时，请求体才发送 `thinking: { type: 'disabled' }` 并省略 `output_config`。
  - 若部署配置了 `thinking: 'disabled'`，则模型仅公开 `off` 一档，传入其他档位直接抛 `UNSUPPORTED_REASONING_EFFORT`。
- **为什么强制要求适配器的 `efforts` 从低到高排列？**
  - 因为轻量后台任务需要自动选最低推理等级。例如首轮提示词生成会话标题插件 `@deepseek-ai/dsh-session-title-first-prompt-llm`（`packages/session/session-title-first-prompt-llm/src/index.ts:75-76`）定义了 `selectReasoningEffort = (model) => model.reasoning?.efforts[0]?.id`，直接取第 `0` 项（即 `off` 或最低档），省去后台生成 `10` 个汉字以内标题时的思考耗时与 Token。
  - 同时在 `packages/bundle/base/cordis.patch.yml:73-76` 中，会话标题插件将 `maxOutputTokens` 设为 `4096`（注释明确说明：`reasoning a model cannot switch off also counts as output`），留出充足余量防止不可关闭的思考 Token 耗尽额度导致标题正文被截断。

### 7.2 桌面端聊天视图（`ui-chat`）中 CoT 思维链的真实呈现形式
- **协议层内容块与流式分流**（`packages/llm/llm-deepseek/src/translate.ts:50-81`、`docs/subsystems/llm-streaming.zh.md:167-226`）：
  - 服务端返回的 `thinking` 内容块在 Harness 内部被译为 `{ type: 'reasoning', text }`，与普通文本块 `{ type: 'text', text }` 完全独立。
  - 流式传输时，`thinking_delta` 转为 `reasoning-delta` 事件发往前端；而 `signature_delta` 仅在后台累加到 `block.replay.signature` 中，不向 UI 发射分片。
  - `AssistantStreamAccumulator` 将同一思考块的连续 `reasoning-delta` 压缩为单条带时间戳间隔的紧凑记录，并分别统计 `runFirstTokenTime`（首个思考 Token 到达时间）与 `runFirstVisibleTime`（首个正文可见 Token 到达时间）。
- **三层过程折叠体系**（`packages/client/ui-chat/src/client/conversation-nodes/README.zh.md:25-65, 115-198`）：
  - 显隐从外向内分三层：**整轮过程控件（Whole Turn） → 过程组（Process Group） → 单个「思考」行（`ReasoningRow`）或工具行**。
  - **运行中状态**：会话底部显示动态摆尾的小鲸鱼图标（APNG 遮罩）与蓝色高光文字 `深度求索中，用时 X秒 ···`（`locale.ts:96-97`）。相邻的思考和工具调用（如思考 → `read` → `bash`）被归入同一个过程组；阶段回复或最终回答会截断过程组，且回复本身留在折叠范围外保持可见。當没有工具正在运行、模型正在思考时，过程组标题显示 `正在分析请求`，在桌面端默认的「标准（`standard`）」工作步骤展示模式下，组标题后用 ` · ` 追加最近一个非空推理段落（剥离 `**` 并限长 160 字素簇）。
  - **单个「思考」行的默认收起与首行流光预览**（`packages/client/ui-chat/src/client/chat/ReasoningRow.tsx:12-111`、`reasoning-text.ts:8-24`）：
    - 哪怕在流式输出期间，单个「思考」行（图标 `IconThinkOutlineRegular` + 标题 `思考`）初始也是**收起**状态（`open={expanded}` 默认为 `false`）。
    - 收起状态下，流式期间调用 `latestCompletedParagraphFirstLine(text)`：只预览**最新一个首行已经以换行符结束的段落的第一行**（尚未换行的半截单行不预览，该段落后续文字也不改变该首行预览），剥离 `**` 标记与开头的 `<signature>...</signature>` 标签后，用 `TextShimmer` 渲染从左到右扫过的流光高光。
    - 思考块结算完成后，在「标准」「详细」「完全展开」模式下保留第一行预览，「简洁（`compact`）」模式下隐藏预览。用户手动点击该行后，才通过 `conversation.chat.reasoning.body` 插槽以紧凑 Markdown 排版展开完整的思考正文。
  - **整轮结束后的自动收起与用量明细**：
    - 轮次正常结束后（默认「回答结束后」收起时机），整轮过程默认自动收起为顶部的 `已完成，用时 X秒` 折叠条，将所有过程组、思考行和工具调用一并隐藏，界面上只保留干净的 Assistant 回复。
    - 点击轮次底部的「本轮用量」（`locale.ts:189-198`），在「输出」项旁会专门展示 `（其中推理 {tokens}）`（`reasoningTokens` 已包含在 `outputTokens` 内，不重复累加）。

### 7.3 多轮对话回放、跨模型签名降级与上下文压缩
- **同模型多轮回放与 KV Cache 保护**（`packages/llm/llm-deepseek/src/serialize.ts:26-39, 65-67`、`README.zh.md:175-184`）：
  - 序列化历史消息时，此前 `assistant` 轮次的 `reasoning` 块会被还原为 `{ type: 'thinking', thinking: block.text, signature }` 原样传回（无论该轮是否调用了工具）；而 `user` 消息和 `tool_result` 中的 `reasoning` 块会被直接省略过滤。
  - 原样保留历史 `assistant` 思考块不仅让模型在连续工具调用中保持推理连贯，而且保证了已组装的历史 Token 前缀完全不变，从而命中服务端的 `KV Cache`（在 `usage.cacheReadTokens` 中上报）。
- **跨模型切换时的签名校验与无损降级**（`packages/llm/llm-deepseek/src/replay.ts:39-64`）：
  - 每个助手消息在 `source.replayState` 中保存了 `{ response: { kind: 'deepseek-messages', version: 1, model }, blocks }`。
  - 下次组装请求调用 `readReplay(message, targetModel)` 时，会严格校验 `response.model === model` 以及块数量和类型是否对齐。如果用户在会话中途切换了模型（例如从 `deepseek-v4-pro` 切到 `deepseek-flash`），`readReplay` 返回 `undefined`，序列化时自动剥离旧模型绑定的 `signature`，只把 `{ type: 'thinking', thinking: block.text }` 明文发出去，避免因跨模型签名不匹配导致请求报错失败。
- **流式中断与上下文压缩处理**：
  - 流式中途取消时，`BlockAssembler.interruptedBlocks()`（`docs/subsystems/llm-streaming.zh.md:403-409`）会安全固化已输出的非空白文本和 `reasoning` 前缀，并丢弃未派发的半截工具调用。
  - 触发自动上下文压缩（`packages/compaction/compaction-basic/README.md:129, 198, 258`）时，摘要请求设置 `purpose: 'compaction'`，模型返回的 `reasoning` 思考块会被直接剔除，只有总结出的纯文本进入 `<compacted-summary>` 检查点，避免总结时的思考草稿污染并占用主会话上下文。


---

## 8. LLM Protocols in DeepSeek Harness, Pi Agent, Claude Code & Codex (`fcc0ad4621`)

### 8.1 双适配器架构与 UI 配置入口
- **双适配器设计**（`packages/llm/README.zh.md:25-35`、`.agents/notes/implemented/architecture/2026-06-13-twin-llm-adapters.zh.md:13-29`）：
  1. `@deepseek-ai/dsh-llm-deepseek`（`packages/llm/llm-deepseek/`）：服务于 `deepseek-official` 和 `deepseek-account`，用原生 `fetch` 直接调用 **Anthropic Messages API（`/v1/messages`）** 与 **Files API（`/v1/files`）**，默认端点 `https://api.deepseek.com/anthropic`（`README.zh.md:57,83`）。DSH 在 2026-09-19 归档移除了 `llm-deepseek` 中的 OpenAI Chat Completions 传输实现，官方路线固定走 Anthropic Messages 协议（`README.zh.md:118`）。
  2. `@deepseek-ai/dsh-llm-pi-ai`（`packages/llm/llm-pi-ai/src/provider.ts:47-51`）：服务于内置第三方供应商目录和用户自定义供应商，支持三种协议：`openai-completions`（`/v1/chat/completions`）、`openai-responses`（`/v1/responses`）、`anthropic-messages`（`/v1/messages`）。
- **UI 模型设置入口**（`packages/client/ui-settings-models/src/client/locales.ts:148-272`、`ModelsSection.tsx:575-593`、`CustomProviderCard.tsx:218-291`、`protocol-label.ts:10-14`）：
  - 侧栏进入「模型」→ 点击「添加模型提供商」→ 切换「第三方模型提供商」或「自定义模型 API」。
  - 在「自定义模型 API」中，「API 协议」下拉框提供三个选项：`OpenAI Chat Completions`、`OpenAI Responses`、`Anthropic Messages`。
  - 选择 OpenAI 两种协议时，「API 地址」占位符为 `https://gateway.example/v1`；切换为 `Anthropic Messages` 时占位符变为 `https://gateway.example`（适配器自动拼接 `/v1/messages`）。编辑 DeepSeek 官方提供商时，占位符为 `https://api.deepseek.com/anthropic（默认使用环境 DEEPSEEK_BASE_URL）`，提示 `请填写兼容 Anthropic Messages 协议的 API 地址。`。

### 8.2 OpenAI Chat Completions / Responses 与 Anthropic Messages 核心协议差异
1. **消息结构、System Prompt 与工具调用/返回**：
   - **OpenAI Chat Completions（`/v1/chat/completions`）**：`system`（或推理模型的 `developer`）放在 `messages` 数组内；`assistant` 文本在 `content`，工具调用拆到独立的 `tool_calls` 字段（`arguments` 为 JSON 字符串）；每个工具返回拆成一条独立的 `role: "tool"` 消息（不支持图片块，工具返回图片时 Pi 适配器需在末尾追加一条合成 `role: "user"` 图片消息，`pi/packages/ai/src/api/openai-completions.ts:1416-1460`）。
   - **Anthropic Messages（`/v1/messages`）**：首部系统提示词提取到顶层 `system` 字段（支持带 `cache_control` 的文本块数组）；`messages` 仅由 `user` 和 `assistant` 交替组成，统一采用 `content` 内容块数组——`assistant` 按顺序放入 `thinking`、`text`、`tool_use`（`input` 为解析后的 JSON 对象），工具返回则作为 `role: "user"` 消息里的 `tool_result` 块（原生支持嵌套文本和图片，配合 `/v1/files` 可传 `file_id` 避免每轮重传 Base64，且同一条 `user` 消息合并时 `tool_result` 块必须排在普通 `text`/`image` 块前面，`llm-deepseek/src/serialize.ts:125-146`）。
   - **OpenAI Responses（`/v1/responses`）**：顶层 `instructions` 传系统指令，`input` 为扁平 Item 流（`reasoning`、`message`、`function_call`、`function_call_output` 各自作为独立顶层项）；Codex 还支持 WebSocket `response.create` 携带 `previous_response_id` 只传单轮新增 `input` 项（`codex-rs/codex-api/src/endpoint/responses_websocket.rs:159-186`）。
2. **思维链（Thinking）与多轮回放签名**：
   - **OpenAI Chat Completions**：各厂商方言碎片化（`reasoning_effort`、`enable_thinking`、`thinking` 等近 10 种写法，流式增量分散在 `reasoning_content` / `reasoning` / `reasoning_text`），DeepSeek 的 Chat Completions 接口在思考模式下还要求回放历史 `assistant` 消息时必须显式携带 `reasoning_content`（哪怕为空字符串 `""`）。
   - **Anthropic Messages**：流式通过 `content_block_start`（`thinking`）→ `thinking_delta` → `signature_delta` 下发思考文本与加密签名；多轮工具调用时，客户端把 `{ type: "thinking", thinking, signature }`（或安全脱敏的 `redacted_thinking`）按原顺序放在 `assistant.content` 中原样带回。
   - **OpenAI Responses**：无状态模式下请求需传 `include: ["reasoning.encrypted_content"]`，服务端在 `reasoning` 项下发 `encrypted_content`，下一轮原样塞回 `input`。
3. **SSE 流式事件与 Token 计费口径**：
   - **OpenAI Chat Completions**：无事件名的 `data: {...}` 分片流，需显式传 `stream_options: { include_usage: true }` 才会在最后一个 chunk 返回 `usage`（中途取消则拿不到任何 Token 统计）；`prompt_tokens` 包含 `cached_tokens`（算未缓存输入需做减法）。
   - **Anthropic Messages**：强类型状态机事件流，`message_start` 第一帧就返回 `input_tokens`、`cache_read_input_tokens`、`cache_creation_input_tokens`（中途取消也能记账，且 `input_tokens` 仅代表未缓存新增部分，总输入需相加）；`content_block_stop` 显式标记块结束（适配器只需在此时 `JSON.parse` 一次工具参数，避免每帧 `partialParse` 的 $O(n^2)$ 开销）；`message_delta` 返回 `output_tokens` 与 `stop_reason`。
4. **提示词缓存（KV Cache）与中途动态更新**：
   - **OpenAI**：服务端自动前缀匹配，客户端传 `prompt_cache_key` 辅助路由粘性。
   - **Anthropic Messages**：显式在 `system`、`tools` 末尾和最后一条 `user` 消息块上打 `cache_control: { type: "ephemeral" }` 断点；DeepSeek 的 Messages 接口还支持 `anthropic-beta: mid-conversation-tool-changes-2026-07-01`，允许在对话历史中途追加 `role: "system"` 更新和 `tool_addition` / `tool_removal` 块而不改动顶层 `system` 与 `tools`，守住已有的 KV Cache 前缀（`llm-deepseek/src/serialize.ts:83-116`）。
5. **跨协议切换模型的清洗与非破坏性投影**（`pi/packages/ai/src/api/transform-messages.ts:64-235`、`llm-pi-ai/src/replay.ts:152-259`）：
   - 会话中途切换协议/模型时，剥离异构模型的 `thinkingSignature`，将历史 `thinking` 块降级为普通 `text` 块，丢弃无法解密的 `redacted_thinking`；同步重写并映射 `tool_call_id`（Anthropic 限 64 字符 `^[a-zA-Z0-9_-]+$`，Chat Completions 限 40 字符超长取 SHA-256 短哈希）；补齐中断轮次悬空的 `tool_result`。DSH 只在请求的瞬态副本上做转换，本地会话日志完整保留原模型的 `ReplayEnvelope`。
