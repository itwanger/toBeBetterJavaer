# DeepSeek Harness (DSH) Desktop and Plugin System: Source Research

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
