---
title: 谷歌又搞事情，Gemini 可以在 Claude Code/Codex 中带劲蹬了。
shortTitle: gemini-api 接入 Claude Code、Codex 与 Pi 实战
description: 拆解谷歌开源的零依赖 Go 单文件工具 gemini-api（v0.5.0），详解如何在 Claude Code、Codex 与 Pi 中调用 Gemini 4 Neon 及多模态、托管 Agent 能力，附四个高价值实战 Case、无麦克风语音自动化测试技巧与底层源码原理分析。
keywords:
  - gemini-api
  - gemini-api-cli
  - Gemini 4 Neon
  - Claude Code
  - Codex
  - Pi
  - Interactions API
  - AI Agent
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-11-26
---

大家好，我是二哥呀。

Gemini 4 Neon 的实力已经毋庸置疑，甚至连 Antigravity APP 最近都好用了起来。

甚至的甚至，反重力的皮肤也开始火起来了，虽然官方还不支持。

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-20261126113216.png)

当然，如果你已经习惯用 Claude Code、Codex 或者 Pi，不想用反重力，但又想用 Gemini 4 Neon，**那还可以通过 gemini-api 来接入**。

它把 Gemini 4 Neon 等模型、生图配音、长文档解析和云端托管 Agent 全打包成了一个单文件命令，放到系统路径里，你原来的 Agent 就能在终端里随时喊 Gemini 过来打下手。

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-20261126093322.png)

只要一个 API 密钥就能工作，密钥可以在谷歌的 AI Studio 中申请。

![](https://cdn.paicoding.com/stutymore/sucai-20261126091411.png)

很方便。

## 01、和 `gemini-cli` 的区别

看到仓库名 `gemini-api-cli`，很多小伙伴第一反应是，谷歌之前不是已经发过一个 `gemini-cli` 了吗，怎么又冒出来一个命令行工具？

这俩东西不一样，我只能说谷歌一开始的命名有点混乱。

`gemini-cli` 是交互式的命令行 Agent，打开终端之后你可以在里面和它来回对话、让它接管整个代码仓库，和 Claude Code、Codex CLI 属于同一赛道，目前官方也更推荐使用反重力 CLI。

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-20261126101911.png)

`gemini-api` 则是给其他 Agent 调用的无状态工具，是一个用 Go 语言编译出来的单文件可执行程序，开源协议为 Apache 2.0，macOS、Linux 和 Windows 都能跑。

上下文和执行计划还是由你的宿主 Agent 掌握，需要用到哪项 Gemini 能力，就在终端里敲 `gemini-api` 子命令。我把 `v0.5.0` 的 macOS 二进制下载到本机跑了一遍 `gemini-api models`，内置的离线模型已经把 Gemini 4 全家桶和多模态模型收录进来了。

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-01-capabilities-20261126110938-3263b121.png)

文本与推理默认用速度最快的 Gemini 4 Hydrogen（`gemini-4-hydrogen`），随时可以通过 `-m gemini-4-neon` 切换到 Gemini 4 Neon，或者切换到旗舰 Gemini 4 Carbon。

生图默认用 `gemini-nano-banana-2.1`，配音默认用 `gemini-3.8-flash-tts`，作曲默认用 `lyria-3.5`，视频生成默认用 `gemini-omni-1.2-flash`。

理解与转写方面，`analyze` 能读 PDF、图片、音视频、表格和视频链接，`transcribe` 默认用 `gemini-3.5-transcribe` 输出字幕。

云端托管 Agent 方面，`agent run` 可以拉起 `deep-research-preview-04-2026` 做深度调研，也能拉起 `antigravity-preview-09-2026` 在云端 Linux 沙箱里跑代码。

## 02、接入 Claude Code

不想自己敲安装命令的话，可以把下面这段提示词发给你的 Claude Code、Codex 或 Pi，让 Agent 自己去装好并校验环境：

```text
请帮我安装谷歌官方的 gemini-api CLI（仓库地址 https://github.com/google-gemini/gemini-api-cli），并安装配套的 gemini-api-cli Skill（npx skills add google-gemini/gemini-skills --skill gemini-api-cli）。装完后跑一遍 gemini-api version 和一条带 --dry-run 的测试请求确认可用，不要改动我现有的其他配置。
```

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-03-connect-20261126110938-dc0babb2.png)

习惯手动装的话，在 macOS 或 Linux 终端里，一条命令就能装好预编译的二进制文件：

```bash
curl -fsSL https://raw.githubusercontent.com/google-gemini/gemini-api-cli/main/scripts/install.sh | bash
```

Windows 用户可以用 PowerShell 执行官方的安装脚本，熟悉 Go 工具链的小伙伴也可以用 `go install github.com/google-gemini/gemini-api-cli/cmd/gemini-api@latest` 从源码编译。

装完之后需要配一个 `GEMINI_API_KEY`。

我翻了 `gemini-api auth login --help` 的说明，当前 `gemini-api` 只认 API Key 或者 Google Cloud 的 OAuth 访问令牌，暂不支持用个人的 Gemini Pro 或 Ultra 订阅账号直接登录。

API Key 去 Google AI Studio（`https://aistudio.google.com/apikey`）就能一键生成。手里有 Google AI Pro 或 Ultra 订阅的小伙伴，可以顺便在后台看一下账号有没有附赠月度 API 抵扣额度。

我拿自己的免费层 Key 实测了一遍，`gemini-3.8-flash-tts` 语音合成能跑通，消耗 `39` 个 Token 生成了一段 `75388` 字节的 WAV 音频；但调用 `gemini-4-neon` 和 `gemini-nano-banana-2.1` 生图都会返回 `429`，提示免费层额度为 `0`。想用这两个模型，去 AI Studio 绑定结算账号升级付费层，顺手在 `aistudio.google.com/spend` 设一个月度消费上限，用起来心里有底。

拿到 Key 后，有两种保存方式：

```bash
# 方式一：写入当前终端环境变量（适合临时测试或 CI）
export GEMINI_API_KEY="YOUR_API_KEY"

# 方式二：存入系统钥匙串（macOS Keychain / Windows 凭据管理器）
gemini-api configure --api-key "YOUR_API_KEY"
```

有一点要注意，如果你同时在系统钥匙串和终端环境变量里配了不同的 Key，环境变量 `GEMINI_API_KEY` 的优先级更高，会覆盖钥匙串里的配置。拿不准当前生效的是哪个 Key 时，敲一句 `gemini-api whoami` 就能看清凭证来源。

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-02-credentials-20261126110938-75bcabe9.png)

配好之后，可以先用 `--dry-run` 检查一下命令有没有写错。

`--dry-run` 是空跑预览模式。加上这个参数，CLI 会在本地做完所有参数和 JSON 校验，把准备发出去的完整 HTTP 地址、请求头和请求体打印出来，同时自动隐藏密钥，全程不联网、不读取系统钥匙串，也不会消耗 Token。

**在 Claude Code 里接入**：Claude Code 支持插件市场，依次输入下面两条斜杠命令，就能把官方技能包和调用规范一次配齐。

```text
/plugin marketplace add google-gemini/gemini-skills
/plugin install gemini-skills@gemini-skills
```

**在 Codex CLI 里接入**：Codex CLI 同样支持插件命令，在终端里执行两条指令注册并安装。

```bash
codex plugin marketplace add https://github.com/google-gemini/gemini-skills
codex plugin add gemini-skills@gemini-skills
```

**在 Pi 里接入**：

```bash
npx skills add google-gemini/gemini-skills --skill gemini-api-cli
```

如果你连插件都不想装，可以把谷歌官方给的四条简短规则放到 `CLAUDE.md` 或 `AGENTS.md` 里。

```text
你可以在终端里调用 gemini-api 来使用 Gemini 模型、生成或编辑媒体、分析文件和启动托管 Agent。
1. 调用前先用 --help 查看子命令，构造复杂 --body 时用 --schema 核对字段。
2. 不熟悉的复杂调用先加 --dry-run -o json 离线预览。
3. 需要单条完整 JSON 或 --jq 过滤时，在流式命令里加上 --stream=false -o json。
4. 记录媒体命令输出的文件路径和交互 ID，用来串联后续步骤。
```

## 03、实战 Case

下面四个 Case 全都给好了能复制发给 Agent 的提示词，涉及的 `gemini-api` 请求参数我都用本机 `v0.5.0` 跑过 `--dry-run` 校验，字段和语法都没问题。

### Claude Code 里让 Neon 做交叉审查

同一个模型起草完产品方案、投标文档、教程或核心代码后，再让它自己检查，盲区往往重合。

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-04-review-20261126110939-4b2b695a.gif)

写完之后，可以把下面这段提示词发给 Claude Code 或 Codex，请 Gemini 4 Neon 开 `xhigh` 思考档位当独立评审员：

```text
我刚写完当前目录下的方案文档（或者刚改完订单扣库存的核心代码）。请把内容通过 gemini-api 交给 gemini-4-neon 模型，并把 thinking_level 设为 xhigh，站在挑剔的评审角度逐条排查逻辑漏洞、遗漏的边界条件和前后矛盾的地方。记下返回的交互 ID；发现高危问题后先陪我改完第一轮，再用 --previous-interaction-id 追问 Neon 复核改动，确认闭环了再停。
```

拿到交互 ID 后，第二轮复核不用把整份文档和历史对话再发一遍，Agent 带上 `--previous-interaction-id`，Gemini 服务端就会自动接上刚才的上下文继续审查。

### 写稿、做视频与音频

写完文章、教程或口播稿，配封面图、做开场白，装上 `gemini-api` 后，可以把文案和素材生产放进同一条提示词：

```text
我刚写完当前目录下的文章草稿。请根据主题调用 gemini-api image（16:9 比例，2K 分辨率）生成一张暗调清爽风格的配图保存到 ./assets/cover.jpg；再提炼一段 15 秒的双人播客开场白，调用 gemini-api tts 用双人音色合成到 ./assets/intro.wav。拿到两个本地文件路径后，把封面图插进草稿开头，并把素材清单写入 ./assets/manifest.md。
```

更有意思的用法来自 Google DeepMind 的 Philipp Schmid。他分享了一个 Case，不用麦克风，让 Agent 全自动地端到端测试语音功能。

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-05-voice-test-20261126110940-c735062e.png)

配上 `gemini-api` 之后，整个测试流程只需要四步：

1. 让 Codex 或 Claude Code 调用 `gemini-api tts`，按台词合成一段 `24 kHz` 的 WAV 人声文件，例如 `./test-voice.wav`。
2. 启动 Chrome 或 Playwright 时传入虚拟媒体参数 `--use-fake-ui-for-media-stream` 和 `--use-file-for-fake-audio-capture=./test-voice.wav%noloop`。
3. Agent 自动点击页面上的麦克风按钮，浏览器的 `getUserMedia` 接口就会从 `0.0` 秒开始把这段合成语音当作麦克风的实时输入流传给网页。
4. 最后 Agent 读取页面 DOM，断言语音转写出来的文字和界面状态是否符合预期。

下面这条提示词整理自 Philipp Schmid 的公开模板，做语音类 Web 应用的小伙伴可以留着备用：

```text
请端到端测试当前项目的语音输入功能，不要依赖物理麦克风。先用 gemini-api tts 生成一段测试语音保存为 ./fixtures/voice.wav（内容为“帮我查一下最近三个月的订单退款记录”）；再用 Playwright 启动 Chromium，加上 --use-fake-ui-for-media-stream 和 --use-file-for-fake-audio-capture=./fixtures/voice.wav%noloop 参数；打开页面点击麦克风按钮触发采集，最后校验页面 DOM 里出现的转写结果与查询状态。
```

### 后台拉起 Deep Research 与云端沙箱

做行业分析、写汇报 PPT 或者做技术选型时，经常会遇到很耗时的支线调研。`gemini-api agent run` 支持 `--background` 参数，发起任务后立刻返回一个交互 ID，不占用当前连接。

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-06-background-20261126110940-d5c9fe3b.png)

你可以把下面这段提示词发给手头的 Agent，让它在后台派发调研，前台照常陪你推进手头的文档或项目：

```text
请用 gemini-api 的后台模式（--background）拉起 deep-research-preview-04-2026，帮我调研 2026 年主流知识库检索方案在长文档准确率与成本上的公开基准数据，要求附一手论文或官方博客出处。拿到交互 ID 后先记下来，别阻塞当前会话，咱们继续整理手头的 PPT 大纲；过十分钟我喊你时，你再查一次状态把完整报告拉回本地保存为 ./research.md。
```

如果任务还需要真实跑脚本算数据或画图表，可以在提示词里让 Agent 调用 `antigravity-preview-09-2026` 并启用云端远程沙箱（`{"environment":"remote"}`）。谷歌会在云端启动一台自带 Bash、Python 和 Node 的 Linux 沙箱跑完计算，跑完后让本地 Agent 把沙箱里产出的报告或 CSV 下载回本地就行。

### 啃长 PDF、研报和会议录屏

工作里碰到几十页的扫描版产品方案、行业研报、改版前后的视觉稿对比，或者复盘录像，
给 Pi（或者手头的 Claude Code、Codex）配上 `gemini-api` 后，碰到大文件发一句提示词就能交给 Gemini 4 Neon 啃下来：

```text
请用 gemini-api 的 gemini-4-neon 模型分析 ./docs/q4-report.pdf 和 ./recordings/review.mp4（超过 14 MB 的文件先用 files upload 上传后复用引用），梳理出报告里最关键的五个数据结论、会议里有分歧的三个问题点，以及带时间戳和负责人的待办清单，写入 ./summary.md。顺手把录像转写成带说话人标签的 SRT 字幕保存到 ./recordings/review.srt。
```

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-10-pi-documents-20261126113209-3628b91e.png)

Agent 会按 `gemini-api` 的规则自动分流，`14 MB` 以内的文件随请求内联发送，超过这个体积就先走 Files API 上传一次（云端保留 `48` 小时），拿回 `files/<id>` 引用后先后交给 `analyze` 和 `transcribe`，不用重复传大文件。

如果要从杂乱的客户反馈或报错日志里抽取固定格式的表格数据，也可以在提示词里让 Agent 指定 `JSON Schema` 并关闭服务端存储（`"store": false`）。

## 04、底层原理解析

看到这里的不少小伙伴可能会好奇，谷歌明明支持 MCP，为什么还要专门做一个无状态的 `gemini-api` 命令行工具？

我把 `google-gemini/gemini-api-cli` 的源码拉下来翻了一遍，有三个值得一说的工程设计。

### Interactions API

不管是 `generate`、`image`、`tts`、`analyze` 还是 `agent run`，底层请求的都是同一个接口地址 `POST /v1beta/interactions`，也就是谷歌主推的 **Interactions API**（统一交互接口，把单轮生成、多模态媒体、多轮状态和托管 Agent 放进一套协议里）。

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-07-interactions-20261126110941-bb3f4acd.png)

在此之上，CLI 的命令分为两层。

顶层是“意图命令”，比如 `image`、`tts`、`analyze`、`transcribe`。这一层专门干脏活累活，帮你填好默认的模型、自动识别本地的文件大小和 MIME 类型、把返回的图片或音频解码后保存到磁盘。

底层是按 OpenAPI 规范生成的完整资源命令和 `--body` 参数。比如你要给 Gemini 4 Neon 设置 `thinking_level` 为 `xhigh`，先用 `--schema` 查清楚字段，再用 `--body` 传 JSON，就能调用完整的协议。

### 省掉 MCP 的上下文开销

`gemini-api` 换了一种按需查询的思路，把所有说明文档都编进了二进制文件里。

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-08-context-20261126110942-9cc2c23a.png)

先按需查规范，需要选命令时跑 `--help`，或者输出 KDL 格式的 `--usage`；拼复杂请求体时跑 `--schema`，打印内置的 JSON Schema。平时不用，就不占宿主 Agent 的上下文。

然后把文件写到磁盘，标准输出只给路径。图片、音频和视频动辄几兆，如果按原始 REST 接口返回 Base64 字符串，会把上下文撑爆。`gemini-api` 的媒体命令默认会把文件写到磁盘，只往 `stdout` 打印一行本地路径。

最后是 TOON 输出和内置的 `gojq`。加上 `--agent-mode` 后，默认切换为符号更少、更省 Token 的 TOON 格式（基于 `gotoon`），报错则在 `stderr` 里返回结构化 JSON。内置了 `gojq` 之后，不用另装 `jq` 就能用 `--jq` 过滤字段。

简单来说，MCP 是把所有工具说明提前塞进上下文，而 `gemini-api` 是 Agent 用到哪条命令，才去查哪条命令的说明，返回的结果也尽量压缩了体积。

### BYOS 自托管沙箱

`gemini-api` 坚持客户端零状态，本地不创建 SQLite，也不存聊天历史。

默认情况下 Interactions API 会在服务端保存交互记录（`store: true`），每次响应返回一个交互 ID。下一轮只要带上 `--previous-interaction-id`，服务端就会把前面的上下文接上。遇到超长输出被截断的情况，还补上了令牌续传机制，客户端不用自己拼接被截断的文本。

源码里最让我意外的是 `docs/self-hosted/` 目录，里面讲的是 **BYOS（自带沙箱环境）**。

如果代码不能上传到谷歌的云端沙箱，可以用同一个 `gemini-api` 二进制，在自己的内网容器或云主机上运行 `gemini-api environments connect`。

![](https://cdn.paicoding.com/stutymore/gemini-api-cli-guide-09-byos-20261126110943-aef21ea8.png)

## ending

Agent 时代，其实工具最重要的是顺手。

我现在的主力 Harness 就是 Antigravity CLI 和桌面端 APP。

其次是 Codex、Claude Code。

Agent 一多，就很难管理，于是就有了 CC Switch 和 magpie 这类配置管理软件。包括很多把多个 Agent 装在一个 APP 里的。

我自己是比较喜欢原生的 Harness，因为这样可以把记忆长期沉淀下来。

谷歌的 `gemini-api`，姿态就放的很低。你不愿意离开 Claude Code、Codex 或者 Pi，没关系，谷歌把 Gemini 4 Neon 和全套多模态能力做成一个零依赖的工具，让你正在用的 Agent 也能直接调用。

等什么时候谷歌再把个人订阅额度和 `gemini-api` 打通，不用大家单独去折腾 API Key，这套在不同 Agent 里调用 Gemini 的玩法估计会更火。

我们下期见。
