---
title: 轻量开源版 Muse 来了！CopilotKit 开源 OpenMuse，个人 Agent 的工程细节全摊开了
shortTitle: OpenMuse 源码实测
description: OpenMuse 是 CopilotKit 开源的自托管个人 Agent，对标 Meta Muse。本文用 DeepSeek V4.1 Flash 在本地运行 OpenMuse，并结合源码拆解持久任务的租约与检查点、外部写操作的哈希审批、只读浏览器和断网终端的安全设计。
keywords: OpenMuse, Meta Muse, 个人 Agent, CopilotKit, AG-UI
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-10-08
---

大家好，我是二哥呀。

9 月 8 号，Meta 发布了个人 Agent 产品 Muse。

发邮件、订行程、填表单、帮忙下单，这些事都可以交给它。Meta 给每个用户在云端分配一台专属的虚拟机，叫 Muse Secure VM，Agent、浏览器和各种账号凭证都放在这台机器里。同一台机器上还运行着另一个叫 Sentinel 的 Agent，Muse 想往外发送任何东西，都要先经过 Sentinel 批准。

发布两天，Muse 就冲到了美区 App Store 第二名。

不过它目前只在北美开放，开始使用前还要绑定一张支付卡，国内的小伙伴基本用不上。

两周后，做 AG-UI 协议的 CopilotKit 开源了一个 OpenMuse。

浏览器、Linux 终端、文件、能在后台持续执行的任务，Muse 的这几样能力，OpenMuse 都照着做了一份。一套 React Native 代码同时运行在 iOS、Android 和 Web 上，MIT 协议，部署在自己的机器上。

截至 10 月 8 号，仓库已经有 4199 个 Star。

【截图：OpenMuse GitHub 仓库首页；风格：data-board；截图目标：证明 Star 数和项目定位；关键词：OpenMuse、4199 Star、MIT】

我对这个项目感兴趣，是因为它的源码能回答几个我一直很好奇的问题。

Meta 把 Muse 的安全设计讲得很清楚，可我们看不到源码。OpenMuse 沿用了同一个思路，代码却完整地摆在 GitHub 上。一个个人 Agent，任务执行到一半服务重启了，怎么接着往下执行？发邮件之前，怎么保证一定经过人点头？Agent 用的浏览器和终端，权限被限制到了什么程度？这些问题都能在源码里一行一行地找到答案。

最近我一直在迭代 PaiCLI，读别人家的 Agent 源码，总能找到一些可以借鉴的地方。

先叠个甲，OpenMuse 现在还是 alpha 版本。它的验收文档写得很坦白，真实模型的效果、真实 Google 账号的接入都还没有验收。

所以这篇我把它当成一个开源的个人 Agent 模板来测。先在本地运行起来，把委派任务、浏览器、终端、网页监控挨个用一遍，再结合源码看看它为什么这样设计。

Muse 我们暂时用不上，OpenMuse 倒是 clone 下来就能读。

系好安全带，我们粗粗粗发～

## 01、OpenMuse 是什么

> https://github.com/CopilotKit/openmuse

一句话概括，OpenMuse 是一个带浏览器、终端和文件的个人 Agent 应用，委派给它的任务会在后台一直执行，中途需要人做决定时再停下来等。

它和 Meta Muse 最大的差别在部署方式上。

Muse 的 Agent 和用户数据都在 Meta 的云上，由 Sentinel 统一把关。OpenMuse 的服务端、任务 Worker、浏览器服务都运行在自己的机器上，模型用自己的 API Key，数据默认存在本地的 `.openmuse/` 目录里。

README 里列了十个功能模块，我挑几个最常用的说一下：

- Chat：对话入口，可以搜索和阅读邮件，把复杂的事委派成后台任务
- Agent computer：一个持久化的 Chromium 浏览器，加一个可选的 Linux 容器
- Activity：后台任务的计划、进度、暂停恢复、审批记录都在这里
- Goals & Tracking：目标管理，以及定时检查公开网页有没有变化
- Documents：从邮件附件里取出 PDF，填好表单后准备一封回复邮件
- Gmail & Calendar：接入 Google 账号，发邮件和改日程都要单独审批

【截图：OpenMuse 功能模块总览；风格：skill-card；截图目标：展示 OpenMuse 的十个功能模块；关键词：Chat、Agent computer、Activity】

整体架构是这样的。

客户端用 Expo 和 React Native 写，一套代码同时出 iOS、Android 和 Web 三端。客户端和服务端之间使用 AG-UI 协议，这是 CopilotKit 推出的一套事件流规范，约定 Agent 怎么把文本、工具调用、状态变化一条条推送给前端界面。

服务端是 Hono 加 CopilotKit runtime，任务 Worker 默认就运行在 API 进程里。数据库默认用 PGlite，也就是编译成 WASM 的嵌入式 Postgres，需要多进程部署时再换成独立部署的 Postgres。浏览器是一个独立的 Playwright 服务，Linux 电脑则是一个 Docker 容器。

【截图：OpenMuse 架构图；风格：whiteboard；截图目标：说清客户端、API、任务 Worker、浏览器服务、Docker 电脑之间的关系；关键词：AG-UI、PGlite、Playwright】

我统计了一下源码，TypeScript 代码一共 3.7 万行左右，其中 `tests/` 目录占了 1.38 万行，比服务端代码的 0.92 万行还多。一个开源才三周的 alpha 项目，测试写得比业务代码还多，这一点让我对后面的源码阅读多了几分期待。

README 首页还有一句宣传语，说 OpenMuse 兼容任意的 Agent harness。harness 指的是模型之外的那一层程序，负责循环调用模型、执行工具、管理上下文，Claude Code、Codex 都可以看作一种 harness。

这句话落到代码里，是环境变量 `AGENT_BACKEND` 的三个取值。

```ts
// apps/server/src/agent.ts（节选）
if (config.agentBackend === "agui")
  return new HttpAgent({
    url: config.agentUrl,
    headers: { Authorization: `Bearer ${config.agentToken}` },
  });
// sample 和 model 都走 OpenMuse 自己的对话 Agent
```

`sample` 是脚本化的演示回复，`model` 是 OpenMuse 自带的 Agent，`agui` 则可以连接任何一个实现了 AG-UI 协议的远程 Agent。

要说清楚的是，`.env.example` 的注释写明了外部 Agent 只替换对话路由。委派出去的后台任务、审批流程，仍然由 OpenMuse 自己的任务引擎执行。仓库里还有一个对接 CopilotKit 另一个开源项目 OpenBot 的适配器，带 13 个契约测试，但目前默认关闭，服务端也没有接入它。

## 02、在本地运行起来

OpenMuse 对环境的要求是 Node 22 以上，pnpm 的版本在 `package.json` 里固定成了 11.19.0，用 corepack 装一下就行。

```bash
git clone https://github.com/CopilotKit/OpenMuse.git openmuse
cd openmuse
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env
```

接下来有一个绕不开的步骤，注册 CopilotKit 账号。

服务端读取配置时，会强制检查 `CPK_INTELLIGENCE_API_KEY`，没有这个 Key，就连不需要模型的 sample 模式都启动不了。这个 Key 对应的是 CopilotKit Intelligence 服务，负责保存和回放对话线程，它不在 MIT 协议的范围内。

```ts
// apps/server/src/config.ts:152
intelligenceApiKey: required("CPK_INTELLIGENCE_API_KEY", intelligenceKeyRequiredMessage),
```

好在免费的 Developer 套餐就够本地测试用。先在 CopilotKit 官网注册账号，然后在项目目录里执行这两条命令。

```bash
npx copilotkit@latest login
npx copilotkit@latest project select
```

`project select` 会生成项目 Key，并自动写进 `.env`，终端输出里不会打印这个 Key，打开 `.env` 确认一下就好。

【截图：copilotkit login 和 project select 的终端输出（需自行操作）；风格：checklist-card；截图目标：展示 Intelligence 项目 Key 的生成过程；关键词：copilotkit login、project select、CPK_INTELLIGENCE_API_KEY】

然后配置模型，我用的是 DeepSeek V4.1 Flash。

OpenMuse 只认 `openai`、`anthropic`、`google` 三种模型前缀，DeepSeek 要借用 `openai` 前缀，再把 Base URL 指向 DeepSeek 的官方地址。DeepSeek 官方 API 里，V4.1 Flash 的模型名是 `deepseek-flash`。

```bash
AGENT_BACKEND=model
MODEL=openai/deepseek-flash
OPENAI_API_KEY=<DeepSeek API Key>
OPENAI_BASE_URL=https://api.deepseek.com
OPENAI_CHAT_COMPLETIONS=true
```

最后一行 `OPENAI_CHAT_COMPLETIONS=true` 一定要加上。

OpenMuse 默认用 OpenAI 的 Responses API 调用模型，源码注释里专门点了 DeepSeek 的名，说这类兼容端点的 Responses API 工具调用循环不完整，需要改用 Chat Completions 接口。

```ts
// apps/server/src/engine/tanstack-agent.ts:33-40
case "openai":
  // OpenAI-compatible endpoints that do not implement the Responses API
  // tool loop (e.g. DeepSeek) can opt into the Chat Completions wire format.
  if (process.env.OPENAI_CHAT_COMPLETIONS === "true")
    return openaiChatCompletions(id as OpenAIChatModel, {
      baseURL: process.env.OPENAI_BASE_URL,
      maxRetries: MODEL_MAX_RETRIES,
    });
```

浏览器服务和 Linux 电脑也一并配上。浏览器服务需要一个至少 32 位的随机 Token，API 和浏览器服务两边用同一个值。

```bash
BROWSER_WORKER_URL=http://127.0.0.1:8790
WORKER_TOKEN=<openssl rand -hex 32 生成的随机串>
```

然后开三个终端，分别启动 API、Web 端和浏览器服务。

```bash
# 终端一：构建 Linux 电脑镜像并启动 API
docker build -t openmuse-computer:local apps/computer
COMPUTER_ENABLED=true pnpm dev

# 终端二：启动 Web 端
pnpm dev:web

# 终端三：安装 Chromium 并启动浏览器服务
pnpm --dir apps/worker exec playwright install chromium
pnpm dev:browser
```

浏览器打开 `localhost:8081` 就能看到界面，API 的健康检查地址是 `localhost:8787/api/health`。

【截图：OpenMuse Web 端首屏（需自行操作）；风格：skill-card；截图目标：展示 OpenMuse 打开后的第一印象；关键词：Chat、Activity、Computer】

【截图：/api/health 返回结果（需自行操作）；风格：checklist-card；截图目标：证明 API 服务启动成功；关键词：health、8787、JSON】

运行之前，有两处默认配置建议大家先看一眼。

第一处是遥测。源码把 CopilotKit 的遥测采样率默认设成了 1，也就是全量上报，数据发往 CopilotKit 的遥测服务再进入 PostHog，并且会和注册的 Intelligence 账号关联起来。不想上报的话，在 `.env` 里加上 `COPILOTKIT_TELEMETRY_DISABLED=true`。

第二处是网页搜索。网页搜索默认开启，用的是 Parallel 提供的免费 Search MCP，模型生成的搜索词和对话上下文会发送给 Parallel。不需要的话，设置 `WEB_SEARCH_ENABLED=false` 关掉。

## 03、交给它一个任务

README 的“Try it”环节里，第一个推荐的任务是填写一份“家长同意书”。

在 Chat 里发送 **Complete the permission slip**，OpenMuse 会在内置的示例邮箱里找到一封带 PDF 附件的学校邮件，然后创建一个后台任务。

【截图：在 Chat 里委派填写同意书的任务（需自行操作）；风格：swimlane；截图目标：展示对话如何变成一个后台任务；关键词：Complete the permission slip、delegate、Activity】

打开 Activity，能看到这个任务被拆分成了五步：

1. 找到源文件
2. 填写一份新的副本
3. 准备一封回复邮件
4. 等待用户的决定
5. 记录结果

执行到第二步时任务会停下来，提示用户输入表单里要填的值，并列出这份 PDF 支持的字段。填好以后，任务继续执行，生成一份填好的 PDF 副本，原件保持不动。

【截图：任务停下来请求输入表单值（需自行操作）；风格：checklist-card；截图目标：展示 waiting_input 状态和 PDF 支持的字段；关键词：waiting_input、表单字段、原件不变】

【截图：填好的 PDF 副本（需自行操作）；风格：skill-card；截图目标：展示填写后的 PDF 效果；关键词：PDF、fill、副本】

界面上看，这就是一个普通的表单流程。源码里值得细看的，是任务执行到一半服务重启了怎么办。

这类文档任务的执行函数，每完成一步，都会把这一步的产出写回任务状态里，源码里管这个动作叫检查点（checkpoint）。找到的源文件存进 `state.source`，填好的副本 ID 存进 `state.filledId`。下次重新执行这个任务时，函数先看状态里有没有这些值，有就直接跳过这一步。

```ts
// apps/server/src/engine/service.ts（节选）
let filledId = typeof task.state.filledId === "string" ? task.state.filledId : undefined;
if (!filledId) {
  await ctx.guard();
  const filled = await this.files.fill(owner, source.fileId, fields, `document:${task.id}`);
  filledId = filled.id;
  task = await ctx.checkpoint({
    state: { ...task.state, source, filledId },
    artifactIds: [filledId],
  });
}
```

所以服务在第三步重启，恢复以后不会再填一遍 PDF，直接从准备回复邮件开始。

那谁来发现任务中断了，又由谁接着执行？答案是任务 Worker 和一套基于 SQL 的租约机制。

Worker 每秒扫描一次任务表，最多同时执行 3 个任务。它会找出四类任务来执行，排队中的、定时到点的、正在等待审批的，以及状态是执行中但租约已经过期的。最后一类就是上次执行到一半进程没了的任务。

抢占任务用的是 CAS。OpenMuse 整个数据库只有一张 `records` 表，所有实体都以 JSONB 的形式存在 `data` 列里，CAS 靠 Postgres 的 JSONB 包含运算符 `@>` 实现。

```ts
// apps/server/src/db.ts:69-81
async compareAndSwap<T>(owner, kind, id, expected, patch) {
  const result = await this.db.query(
    "UPDATE records SET data=data || $5::jsonb,updated_at=now() WHERE owner=$1 AND kind=$2 AND id=$3 AND data @> $4::jsonb RETURNING data",
    [owner, kind, id, JSON.stringify(expected), JSON.stringify(patch)],
  );
  return (result.rows[0]?.data as T | undefined) ?? null;
}
```

只有 `data` 里的字段和期望值完全一致时 UPDATE 才会命中，这和我们在 MySQL 里用 version 字段做乐观锁是一回事。

Worker 抢占到任务时，会生成一个新的 `leaseId`，把租约过期时间设成 60 秒以后。执行期间，每 20 秒续一次租约，续租同样使用 CAS，条件是 `leaseId` 没变、状态还是执行中。

```ts
// apps/server/src/engine/worker.ts（节选）
const heartbeat = setInterval(() => {
  void this.db
    .compareAndSwap(owner, "tasks", taskId,
      { leaseId, status: "running" },
      { leaseUntil: new Date(this.now() + leaseMs).toISOString() })
    .then((value) => { if (!value) controller.abort(); })
    .catch(() => controller.abort());
}, Math.max(10, Math.floor(leaseMs / 3)));
```

续租失败，说明这个任务已经被暂停、取消，或者被别的 Worker 接手了，当前执行会被立刻中止。前面提到的检查点写入也带着同一个 `leaseId` 做条件，租约丢了，写检查点就会失败。

这样一来，进程崩溃以后，60 秒内没人续租，租约自然过期，下一轮扫描时任务被重新领走，再借助检查点跳过已完成的步骤。分布式锁里常说的“锁要有过期时间、续期要校验持有者”，OpenMuse 用一张表就做到了。

【截图：任务租约与心跳的执行流程；风格：swimlane；截图目标：说清抢占、续租、过期、恢复四个环节；关键词：leaseId、60 秒租约、20 秒心跳】

对于交给模型自由发挥的任务，OpenMuse 还加了几道限制。模型最多执行 16 步，单次运行最长 5 分钟，并且强制工具一个一个地串行执行，源码注释给出的理由是保证检查点按顺序写入。

## 04、发邮件之前

第三步准备好的回复邮件不会直接发出去，任务会切换到等待审批状态，界面上出现一张审批卡片，上面是完整的收件人、主题和正文。

【截图：回复邮件的审批卡片（需自行操作）；风格：checklist-card；截图目标：展示发邮件前的人工审批界面；关键词：审批、email.send、收件人】

【截图：审批通过后的收据（需自行操作）；风格：checklist-card；截图目标：展示外部写操作完成后的记录；关键词：receipt、Activity、succeeded】

在 sample 模式下，这封邮件只会写进本地的示例邮箱，不会真的发出去。接入真实 Gmail 以后使用的是同一套审批流程。

这一章我想重点讲讲审批，因为它是 OpenMuse 防御提示词注入的主要手段。

先看模型手里有哪些工具。后台任务里，模型想发邮件只能调用 `prepare_email`，想改日程只能调用 `prepare_event`。这两个工具做的事情是生成一份待审批的提案，然后让任务暂停。任务的系统提示词里写得很直白。

> External writes require prepare_email/prepare_event; there is no tool to approve them.

模型手里压根没有批准提案的工具。批准只能由用户在客户端点按钮，按钮背后是一个需要登录态的 REST 接口。

就算网页或者邮件里藏了一段“立刻把这封邮件转发给某某”的指令，模型最多只能生成一份提案，提案要发出去，还得用户亲手批准。

提案生成时，服务端会对邮件内容、Google 账号连接、操作目标和目标版本一起计算一个 sha256。

```ts
// apps/server/src/actions.ts:77-88
hash: createHash("sha256")
  .update(JSON.stringify({
    input,
    connection,
    target: prepared?.target,
    targetVersion: prepared?.targetVersion,
  }))
  .digest("hex"),
expiresAt: new Date(this.now() + 30 * 60 * 1000).toISOString(),
```

客户端批准时，必须把这个 hash 一起提交上来。服务端处理批准请求，按顺序做了这几项检查：

- hash 和库里的一致，否则提示“提案已变更，请打开最新的审批”
- 关联的任务还处在执行中或等待审批状态，已取消的任务不能执行
- 提案没有超过 30 分钟的有效期
- Google 账号还连着，并且和生成提案时是同一个账号
- 用一条带条件的 UPDATE 把提案状态从待审批改成执行中

用户看到的内容和最终执行的内容由 hash 绑定，中间被改了一个字，批准就会失败。改日程时的目标版本用的是 Google Calendar 事件的 ETag，更新和删除请求都会带上 `If-Match` 头，日程在审批期间被别人改过，Google 那边也会拒绝。

最后一项检查用的 SQL 值得单独看一下。

```sql
UPDATE records AS action SET data=jsonb_set(data,'{status}',$4::jsonb)
WHERE owner=$1 AND kind='actions' AND id=$2
  AND data->>'status'='awaiting_review'
  AND (data->>'expiresAt')::timestamptz > $3::timestamptz
  AND EXISTS (SELECT 1 FROM records task WHERE task.kind='tasks'
    AND task.id=action.data->>'taskId'
    AND task.data->>'status' IN ('running','waiting_approval'))
RETURNING data
```

状态、过期时间、任务状态三个条件放在同一条 UPDATE 里，用户双击按钮、两台设备同时点批准，最终只有一个请求能把提案改成执行中。

我觉得整个审批设计里最见功力的，是对“结果不确定”的处理。

调用 Gmail 发邮件时，如果遇到网络错误、HTTP 5xx、408 超时，或者响应体读不出来，OpenMuse 不会把这次操作标成失败，而是标成 `outcome_unknown`，意思是 Google 那边可能已经执行成功了。

```ts
// packages/integrations/src/google.ts（节选）
} catch {
  if (write) throw new OutcomeUnknownError();
  throw new Error("Could not reach Google; check the connection and try again");
}
if (write && (response.status >= 500 || response.status === 408)) {
  throw new OutcomeUnknownError();
}
```

服务启动时，还会把所有还处在执行中的提案统一改成 `outcome_unknown`，备注“服务在执行期间重启，创建新操作前请先去 Google 那边确认”。

处在这个状态的任务，用户点重试会被拒绝，提示先去确认那次操作的结果。

做过支付的小伙伴对这个设计应该很熟悉。调用第三方支付超时，订单只能记成“处理中”，要等查询订单或支付回调确认，直接当失败重试就可能重复扣款。邮件也是一样，一封“确认参加”的回复被发了两遍，收件人那边就很尴尬了。

模型那一侧同样做了防重复。提案 ID 由任务 ID 和邮件内容的 hash 拼起来再算一次 sha256，写库时用 `ON CONFLICT DO NOTHING`。模型在一次执行里用相同的内容重复调用 `prepare_email`，拿到的始终是同一份提案。模型调用本身失败时最多重试 2 次，源码注释特意说明，外部写操作在模型循环之外执行，模型重试不会把邮件再发一遍。

【截图：外部写操作的审批与执行流程；风格：swimlane；截图目标：说清提案生成、hash 校验、条件更新、结果不确定四个环节；关键词：prepare_email、sha256、outcome_unknown】

## 05、Agent 的浏览器

审批管住了邮件和日程，那 Agent 自己操作的浏览器呢？

按 README 的第四个体验步骤，在 Chat 里发送 **Check out Hacker News for cool stuff**，OpenMuse 会打开浏览器服务里的 Chromium 读取 Hacker News 首页，再把挑出来的内容整理在对话里。

【截图：Agent 浏览 Hacker News 的内嵌结果（需自行操作）；风格：skill-card；截图目标：展示浏览结果如何内嵌在对话里；关键词：Hacker News、browse_web、内嵌卡片】

翻遍源码，我发现 OpenMuse 的 Agent 在浏览器里只能做一件事，读网页。

对话里的 `browse_web` 和任务里的 `read_web` 这两个工具，都是先导航到目标地址，再调用浏览器服务的读取接口。读取接口执行的是一段写死在服务里的脚本，取 `document.body.innerText`，最多 10 万个字符。

```ts
// apps/worker/src/browser.ts（节选）
// Evaluation is fixed by the worker; callers cannot inject JavaScript.
const result = await page.evaluate(() => {
  const text = document.body?.innerText ?? "";
  return {
    url: location.href,
    title: document.title.slice(0, 300),
    text: text.slice(0, 100_000),
    truncated: text.length > 100_000,
  };
});
```

Agent 的工具列表里没有点击，也没有输入。任务提示词里也写了，需要交互的预订操作目前要由用户接管浏览器来完成。

这和 Meta Muse 的定位差别很大。Muse 能直接帮用户订行程、下单付款，OpenMuse 把所有需要在网页上点击和输入的事情都留给了人。从源码看，这是有意为之的取舍，也让它目前更像一个研究助手，还算不上能替人跑腿的个人助理。

需要人来操作的时候，点击 **Take control**。

【截图：Take control 接管界面（需自行操作）；风格：skill-card；截图目标：展示用户接管 Agent 浏览器的界面；关键词：Take control、截图预览、点击输入】

这个接管界面的实现方式比较特别，它既没用 CDP 的画面推流，也没用 VNC，而是每 2 秒拉取一张 PNG 截图。

```js
// apps/server/src/browser-console.ts（节选）
image.onclick = e => {
  const r = image.getBoundingClientRect();
  input({ type: 'click',
    x: Math.floor((e.clientX - r.left) * 1280 / r.width),
    y: Math.floor((e.clientY - r.top) * 800 / r.height) });
};
const timer = setInterval(refresh, 2000);
```

用户在截图上点一下，前端把点击位置换算成 1280×800 视口里的坐标，发给浏览器服务去执行。键盘输入只支持白名单里的按键，以及最多 1 万个字符的文本插入。

这个设计在流畅度上肯定比不过 VNC，好处是安全。文件开头的注释说明，接管界面只渲染一张截图，远程网页的任何代码都不会在用户这一侧执行。接管界面的访问地址带 HMAC 签名，15 分钟后失效。

浏览器服务本身还有一套出网限制，防的是 SSRF，让 Agent 被一个恶意网页引导去访问内网地址。

规则是只允许访问 80 和 443 端口的公网 HTTP(S) 地址，域名里带 `localhost`、`local`、`internal`、`home`、`lan` 后缀的直接拦截，DNS 解析出来的任何一个 IP 落在私网或保留网段，整个请求都会被拒绝。页面导航、页面里发起的子请求、每一次重定向，都要过一遍这个检查。

只在请求前校验 DNS 还不够，攻击者可以用 DNS 重绑定绕过去。所谓 DNS 重绑定，是让同一个域名第一次解析时返回公网 IP 骗过校验，浏览器真正建立连接时再解析一次，这次返回内网 IP。

OpenMuse 的做法是在浏览器服务里起一个本地代理，Chromium 的所有流量都经过这个代理，代理只连接校验时解析出来的那个 IP，不做第二次 DNS 查询。

```ts
// apps/worker/src/proxy.ts:13
/** All upstream sockets connect to a validated IP, never a second DNS lookup. */
```

浏览器服务的 README 也把边界讲清楚了，这是应用层的出网策略，不是内核级防火墙，也挡不住 Chromium 本身的漏洞利用。

资源上的限制也很明确，最多 3 个并发会话、20 个保存的浏览器配置，空闲 30 分钟自动关闭；下载只允许 PDF，单个文件不超过 10 MiB。

【截图：浏览器出网校验流程；风格：three-layer；截图目标：说清 URL 校验、DNS 校验、固定 IP 代理三层防护；关键词：SSRF、DNS 重绑定、出网代理】

## 06、终端和网页监控

依次点击 Computer → Terminal → Start computer，就能启动 Agent 用的 Linux 电脑。

我准备了三条命令，分别验证它的边界。

```bash
python3 --version
curl https://example.com
sleep 40
```

按源码的设计，第一条会正常输出版本号；第二条会因为容器没有网络而失败；第三条会在 30 秒时被终止。

【截图：三条命令的执行收据（需自行操作）；风格：checklist-card；截图目标：验证断网和 30 秒超时两条边界；关键词：python3、curl 失败、timed_out】

这些边界都写在创建容器的参数里。

```ts
// apps/server/src/computer-backend.ts:220-262（节选）
"--user", "1000:1000",
"--read-only",
"--cap-drop", "ALL",
"--security-opt", "no-new-privileges",
"--network", "none",
"--memory", "512m", "--memory-swap", "512m",
"--cpus", "1",
"--pids-limit", "128",
"--tmpfs", "/tmp:rw,nosuid,nodev,noexec,size=67108864,mode=1777",
"--mount", `type=volume,source=${identity.volume},target=/workspace`,
```

非 root 用户、只读根文件系统、丢弃全部 Linux capabilities、禁止提权、断网，内存 512 MB 且不给 swap，进程数上限 128。`/tmp` 是 64 MB 的内存盘，并且带 `noexec`，不能执行里面的文件。唯一能持久保存数据的地方是挂载在 `/workspace` 的命名卷，容器停止以后文件还在。

每条命令都用 `timeout --signal=TERM --kill-after=2s 30s` 包起来执行，到 30 秒先发 TERM，2 秒后还没退出就强制杀掉。输出上限 128 KB，读写单个文件上限 256 KB。

镜像基于 `node:22.22.0-bookworm-slim`，里面装了 bash、python3 和 git。需要上网的事情交给前面那个浏览器服务，终端只负责处理本地文件。

命令执行同样有幂等设计。Agent 调用执行命令的工具时必须带一个 `operationId`，服务端用它计算出收据 ID。同一个 `operationId` 再次提交，直接返回已有的收据，不会重新执行；同一个 ID 换了一条不同的命令，服务端返回 409。

如果命令执行期间服务中断，收据会被标记为中断，备注“结果未知，重新执行前请先检查文件”。和邮件的处理思路一样，结果不确定的操作不会自动重放。

另外，OpenMuse 还支持把 Linux 电脑换成 E2B 的云端桌面，环境变量是 `COMPUTER_PROVIDER=e2b-desktop`，Agent 可以截图、点击、输入，操作一个完整的 Xfce 桌面。

不过这个桌面有外网、有免密 sudo，端口也是公开的。项目的安全文档明确写了，被提示词注入的 Agent 可能会把电脑里的数据发出去，或者在桌面浏览器里提交表单。打算启用它的小伙伴要清楚这个代价。

【截图：Docker 容器与 E2B 桌面的权限对比；风格：data-board；截图目标：对比两种电脑在网络、权限、能力上的差别；关键词：network none、sudo、E2B】

再看网页监控。在 Goals → Track 里可以创建一个监控，README 推荐先用内置的测试页面试一下，改一下测试页的内容就能触发提醒。

【截图：创建网页监控并触发提醒（需自行操作）；风格：skill-card；截图目标：展示网页监控的创建和提醒效果；关键词：Track、availability、提醒】

监控支持三种条件，页面有变化、页面出现某段文字、页面上的美元价格低于某个阈值。检查间隔从 1 分钟到一周可选，默认 15 分钟。

“页面有变化”这个条件有一个很细的处理。很多网页上都有“3 分钟前”“2 小时前”这类相对时间，每次打开都不一样，直接比较页面内容的 hash 会不停地误报。OpenMuse 会额外计算一个去掉相对时间后的 hash，如果只是这些时间变了，就安静地继续监控，不发提醒。

```ts
// apps/server/src/engine/service.ts:1110
// Only relative times changed anywhere on the page ("3 minutes ago"): keep watching quietly.
const quiet = Boolean(baseline?.timelessHash && baseline.timelessHash === timelessHash);
```

检查失败时用指数退避，下次检查的间隔是 2 的失败次数次方分钟，封顶 60 分钟，连续失败 5 次就暂停这个监控。提醒还带去重键，同一次变化只通知一次。

价格条件的局限也要说一下。价格是用正则匹配 `$` 或 `USD` 后面的数字，人民币价格识别不了。

顺带说一句 Ideas 模块。它会根据邮件内容给出建议，比如“这封邮件带了表单附件，要不要帮忙填写”。从源码看，目前这些建议是用正则规则匹配出来的，还没有用到模型，验收文档里也写了，基于模型的个性化建议是后续的工作。

## ending

把 OpenMuse 的源码读下来，我最大的感受是，它在工程上下的功夫，比它在功能上走得远。

功能上，Agent 只能读网页，需要交互时要人接管；终端是断网的；Ideas 还是正则规则；真实模型效果、真实 Google 账号都没有验收，验收文档里写明了发布验证期间没有发出过一封真实邮件。拿它直接当日常助理用，现在还早。

工程上，任务租约和检查点、提案 hash 绑定、结果不确定时拒绝重试、DNS 重绑定防护、容器参数，每一处都有清楚的边界，出了问题也能从记录里查到原因。正在做 Agent 产品的小伙伴，这些设计可以直接拿来参考。

**OpenMuse 花力气最多的地方，是让 Agent 每一次对外的写操作都经过人的批准、留下记录，并且不会被重复执行。**

我们下期见。
