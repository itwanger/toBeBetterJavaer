---
title: 轻量开源版 Muse 来了！CopilotKit 开源 OpenMuse，Personal Agent 的工程细节全摊开了
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

一个月前，Meta 发布了一款 Personal Agent 产品 Muse。

发邮件、订行程、填表单，这些事都可以交给它。Meta 给每个用户在云端分配了一台专属的虚拟机，叫 Muse Secure VM，Agent、浏览器和各种账号凭证都放在这台机器里。同一台机器上还运行着另一个叫 Sentinel 的 Agent，Muse 想往外发送任何东西，都要先经过 Sentinel 的批准。

这个产品现在非常的火，火到市面上出现了很多 Personal Agent，火到我感觉互联网大厂接下来卷的重心会是 Personal Agent。

Muse 发布两周后，做 AG-UI 协议的 CopilotKit 开源了一个 OpenMuse。

浏览器、Linux 终端、文件、能在后台持续执行的任务，Muse 的能力，OpenMuse 都照着做了一套。一套 React Native 代码同时运行在 IOS、Android 和 Web 上，按照 MIT 协议开源。

![](https://cdn.paicoding.com/stutymore/openmuse-review-20261008142239.png)

>GitHub地址：https://github.com/CopilotKit/openmuse

不过，OpenMuse 现在还是 alpha 版本。

不过的不过，这玩意写到简历上还是贼加分的，或者接下来你们公司要做 Personal Agent，看完今天这篇内容你就是先驱者。

## 01、OpenMuse 是什么？

省流总结，OpenMuse 是一个带浏览器、终端和文件的Personal Agent 应用，委派给它的任务会在后台一直运行，中途需要人做决定时再停下来等用户确认。

![](https://cdn.paicoding.com/stutymore/openmuse-review-20261008142555.png)

模型支持 DeepSeek V4.1 Flash，数据默认存在本地的 `.openmuse/` 目录里。

主要的功能模块包括：

- Chat：对话入口，可以搜索和阅读邮件，把复杂的事委派成后台任务
- Agent computer：一个持久化的 Chromium 浏览器，加一个可选的 Linux 容器
- Activity：后台任务的计划、进度、暂停恢复、审批记录都在这里
- Goals & Tracking：目标管理，以及定时检查公开网页有没有变化
- Documents：从邮件附件里取出 PDF，填好表单后准备一封回复邮件
- Gmail & Calendar：接入 Google 账号，发邮件和改日程都要单独审批

![](https://cdn.paicoding.com/stutymore/openmuse-review-20261008142857.png)

整体架构是这样的。

客户端用的 Expo 和 React Native，一套代码可以同时运行在 iOS、Android 和 Web 三端。客户端和服务端之间使用 AG-UI 协议，这是 CopilotKit 推出的一套事件流规范，约定 Agent 怎么把文本、工具调用、状态变化推送给前端界面。

![](https://cdn.paicoding.com/stutymore/openmuse-review-architecture-20261008155307-c4afe46e.png)

服务端是 Hono 加 CopilotKit runtime，执行 `pnpm dev` 时会启动一个 Node.js 进程，对外提供 HTTP 接口。负责执行后台任务的 Worker 默认也在这个进程里一起启动，类似一个 Spring Boot 应用既提供 Controller 接口，又用 `@Scheduled` 执行定时任务。

数据库默认用 PGlite，也就是编译成 WASM、嵌入在进程里的 Postgres。浏览器是一个独立的 Playwright 服务，Linux 电脑则是一个 Docker 容器。

## 02、在本地运行起来

第一步，把仓库克隆到本地。

```bash
git clone https://github.com/CopilotKit/OpenMuse.git openmuse
```

第二步，申请账号。

```
npx copilotkit@latest login && npx copilotkit@latest project select
```

这一步是必须的，因为服务端读取配置时，会强制检查 `CPK_INTELLIGENCE_API_KEY`，没有这个 Key，就连不需要模型的 sample 模式都启动不了。这个 Key 对应的是 CopilotKit Intelligence 服务，负责保存和回放对话线程。后续可以 fork 改掉。

![](https://cdn.paicoding.com/stutymore/openmuse-review-20261008144225.png)

接着就可以启动本地服务了 `pnpm dev`。

![](https://cdn.paicoding.com/stutymore/openmuse-review-20261008150524.png)

第三步，配置必要的参数。

```
cp .env.example .env
```

比如说，把模型改成 DeepSeek V4.1 Flash。

OpenMuse 只认 `openai`、`anthropic`、`google` 三种模型前缀，DeepSeek 要借用 `openai` 前缀，再把 Base URL 指向 DeepSeek 的 API 地址，V4.1 Flash 的模型名是 `deepseek-flash`。

```bash
AGENT_BACKEND=model
MODEL=openai/deepseek-flash
OPENAI_API_KEY=<DeepSeek API Key>
OPENAI_BASE_URL=https://api.deepseek.com
OPENAI_CHAT_COMPLETIONS=true
```

最后一行 `OPENAI_CHAT_COMPLETIONS=true` 一定要加上。虽然 OpenMuse 默认用 OpenAI 的 Responses API 调用模型，但 OpenMuse 认为 DeepSeek 这类兼容端点的 Responses API 工具调用不完整，需要改用 Chat Completions 接口。

浏览器服务则是一个独立的 HTTP 服务，OpenMuse 服务端每次调用它，都要在请求头里带上一个共享密钥 WORKER_TOKEN，浏览器服务比对一致才会响应。这个密钥至少 32 个字符，服务端和浏览器服务都从同一个 .env 文件里读取。

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

浏览器打开 `localhost:8081` 就能看到界面。

![](https://cdn.paicoding.com/stutymore/openmuse-review-20261008150623.png)

运行之前，有两处默认配置建议大家先看一眼。

第一处是遥测（Telemetry），也就是软件运行时自动把使用数据发回给开发商，类似 VS Code 里“发送使用情况统计信息”的选项。OpenMuse 用的是 CopilotKit SDK 自带的遥测，服务启动、收到请求这类事件会发往 CopilotKit 的服务器，再存进 PostHog 这个产品数据分析平台。源码把采样率默认设成了 1，也就是每个事件都上报，并且会和注册的 CopilotKit 账号关联起来。不想上报的话，在 `.env` 里加上 `COPILOTKIT_TELEMETRY_DISABLED=true`。

第二处是网页搜索。网页搜索默认开启，用的是 Parallel 提供的免费 Search MCP，模型生成的搜索词和对话上下文会发送给 Parallel。不需要的话，设置 `WEB_SEARCH_ENABLED=false` 关掉。

## 03、交给它一个任务

第一个推荐的任务是填写一份“家长同意书”。

![](https://cdn.paicoding.com/stutymore/openmuse-review-20261008151946.png)

能看到这个任务被拆分成了五步：

1. 找到源文件
2. 填写一份新的副本
3. 准备一封回复邮件
4. 等待用户的决定
5. 记录结果

执行到第二步时任务会停下来，提示用户输入表单里要填的值，并列出这份 PDF 支持的字段。填好以后，任务继续执行，生成一份填好的 PDF 副本。

![](https://cdn.paicoding.com/stutymore/openmuse-review-20261008152148.png)

源码里值得细看的，是任务执行到一半服务重启了怎么办，也是能体现你技术功底的一个点（真的建议细看）。

这类文档任务的执行函数，每完成一步，都会把这一步的产出写回到任务状态里，源码里管这个动作叫检查点（checkpoint）。找到的源文件存进 `state.source`，填好的副本 ID 存进 `state.filledId`。下次重新执行这个任务时，函数先看状态里有没有这些值，有就直接跳过这一步。

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

那谁来发现任务中断了，又由谁接着执行呢？

答案是任务 Worker 和一套基于 SQL 的租约机制。

Worker 每秒扫描一次任务表，最多同时执行 3 个任务。它会找出四类任务来执行，排队中的、定时到点的、正在等待审批的，以及状态是执行中但租约已经过期的。

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

你看，技术都是想通的。

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

这样一来，进程崩溃以后，60 秒内没人续租，租约自然过期，下一轮扫描时任务被重新领走，再借助检查点跳过已完成的步骤。

![](https://cdn.paicoding.com/stutymore/openmuse-review-lease-heartbeat-20261008155452-4bfa90f8.png)

## 05、Agent 浏览器

提示词：

```
用 Browser 打开 https://1.1.1.1/cdn-cgi/trace，读取页面里的 http、tls、loc 字段，并解释含义。必须实际读取网页，不要用搜索结果代替。
```

![](https://cdn.paicoding.com/stutymore/openmuse-review-20261008153734.png)

当然了，这一步我们没有使用域名，因为 OpenMuse 会做域名解析，有些暂时无法访问到（一些原因你懂），但确实可以证明浏览器能力已经可以正常工作。

我发现，OpenMuse 在浏览器里只能做一件事，读网页。

不管是对话里的 `browse_web`，还是任务里的 `read_web`，都是先导航到目标地址，再调用浏览器服务的读取接口。

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

这一步，和 Meta Muse 还是差别很大的。Muse 能直接帮用户订行程、下单付款，OpenMuse 暂时还做不到这一点，当然了，后面的版本也许会更接近 Muse 的能力。

![](https://cdn.paicoding.com/stutymore/openmuse-review-take-control-20261008155905-5b8fc49b.png)

浏览器服务本身还有一套出网限制，用来防止 SSRF。

规则是只允许访问 80 和 443 端口的公网 HTTP(S) 地址，域名里带 `localhost`、`local`、`internal`、`home`、`lan` 后缀的直接拦截，DNS 解析出来的任何一个 IP 不符合要求，整个请求都会被拒绝。

当然了，只在请求前校验 DNS 还不够，攻击者可以用 DNS 重绑定绕过去。所谓 DNS 重绑定，是让同一个域名第一次解析时返回公网 IP 骗过校验，浏览器真正建立连接时再解析一次，这次返回内网 IP。

OpenMuse 的做法是在浏览器服务里起一个本地代理，Chromium 的所有流量都经过这个代理，代理只连接校验时解析出来的那个 IP，不做第二次 DNS 查询。

```ts
// apps/worker/src/proxy.ts:13
/** All upstream sockets connect to a validated IP, never a second DNS lookup. */
```

## ending

Meta 超级智能实验室的产品负责人 Nat Friedman 曾公开承认，Muse 深受 OpenClaw 启发，连工作区文件名和 SOUL.md 的内容都很接近。他在今年 1 月份用上 OpenClaw 后，给团队买了几百台 Mac mini。Meta 想做的，是一个更安全、更容易上手、能服务几十亿人的 OpenClaw。

![](https://cdn.paicoding.com/stutymore/openmuse-review-20261008161420.png)

这背后是 Personal Agent 和编程 Agent 在用法上的差别。

用 Claude Code 写代码时，我们就在终端前面，每一步都看得到，发现不对马上按 Esc 打断或者补充新的需求。Personal Agent 的用法是交代一件事，然后去忙别的，过一阵子再回来看结果。

人不在场，设计的重心就跟着变了。

任务中断了要能自己接着执行，所以有租约和检查点。用户回来时要能看懂这段时间发生过什么，所以每个操作都要留下记录。

正在做 Personal Agent 的小伙伴，OpenMuse 的很多设计我认为都是可以直接拿来参考的。

我们下期见。
