面试官问你：“了解 Agent 的沙箱（Sandbox）吗？”如果你回答“就是给危险命令拉个黑名单，rm -rf 那些拦掉呗”，恭喜你，出门右拐回家等通知吧。

为什么？

因为黑名单匹配的是命令的文本，不是命令真正做的事情。Claude Code 的权限文档里专门有一节，标题就叫 What a Bash rule doesn’t match。官方自己列了对照表，`Bash(curl *)` 挡得住 `curl https://example.com`，挡不住 `sh -c 'curl https://example.com'`。

官方在这一节的结论是，这套规则匹配的是模型通常会写出来的命令文本，不是安全边界。

【截图：黑名单失效对照；风格：whiteboard；截图目标：左列是黑名单规则，右边两列分别是挡得住的写法和挡不住的写法，突出同一个动作换个写法就穿过去了；关键词：Bash 规则、命令文本、绕过写法】

我翻了 Claude Code 的 sandboxing 文档、Codex 的 codex-rs/sandboxing 源码，还有 Firecracker 的 NSDI 论文和 gVisor 的安全文档，可以自信地、大方地、光明磊落地帮你搞清楚这三件事。

- 沙箱到底是什么？为什么命令黑名单不算沙箱？
- Claude Code、Codex、云端 Agent 三条路线分别怎么做？
- 沙箱装上了就安全了吗？

哈喽大家好，我是二哥呀。今天用 4 分钟，给你讲透 Agent 的沙箱。

**先说第一件事，沙箱到底是什么。**

Anthropic 官方文档说得很清楚，Agent 的安全分两层。权限系统在命令跑起来之前做判断，它看到的只有一串命令字符串。沙箱不一样，边界由操作系统在运行中的进程上强制执行，不管模型最后选择运行什么，边界都成立。

一个合格的沙箱要守住四道防线。文件系统，能读能写哪些目录。网络，能连哪些域名。进程，能不能创建新进程、能发起哪些系统调用。还有 CPU、内存、磁盘的配额。

告诉面试官，权限系统管的是要不要让它跑，沙箱管的是跑起来之后能碰到什么。黑名单属于前者，而命令的写法是无穷的。

【截图：沙箱的四道防线；风格：three-layer；截图目标：上层是权限系统在命令执行前做判断，下层是操作系统强制的沙箱边界，边界内并列文件系统、网络、进程与系统调用、资源配额四道防线；关键词：权限系统、沙箱边界、四道防线】

**那聪明的你肯定想到了，各家 Agent 具体是怎么实现的？**

先说 Claude Code，它不上容器，直接用操作系统自带的沙箱能力。macOS 上是内置的 Seatbelt 框架，Linux 和 WSL2 上用 bubblewrap 做文件隔离，再用 socat 把网络流量转发给沙箱外的代理。

文件系统这边，默认可写的只有当前工作目录，默认可读的却是整台机器，官方提醒过，这个默认仍然读得到 `~/.ssh` 和 `~/.aws/credentials`。还有一组叫 protected paths 的路径，落在可写目录里也拒绝写入，比如 `.claude` 的设置文件和 `.mcp.json`。理由很直白，能改这些文件的命令，可以给自己授权。

再说 Codex。sandbox_mode 有三档，read-only 是默认值，workspace-write 可以写工作区，danger-full-access 等于不要沙箱。macOS 上是一份 SBPL 策略文件，第一条实质规则就是 `(deny default)`，默认全部拒绝，再逐条白名单放行。Linux 上要纠正一个过时说法，网上大量文章还在写 Landlock 加 seccomp，现在官方文档说的是 bubblewrap，源码里 landlock.rs 还在，但挂着 use_legacy_landlock 的字段，属于旧路径。

最后说云端。云端跑的是别人的代码，方案更重。一种是 microVM，代表是 AWS 开源的 Firecracker，一个沙箱一台微型虚拟机，各自有独立内核。官网宣称 125 毫秒以内启动，口径是到客户机的 init 进程跑起来，不是应用能对外服务。

另一种是用户态内核，代表是 Google 的 gVisor。它在应用和宿主内核中间插了一个叫 Sentry 的用户态内核，系统调用先被 Sentry 接住，只有很小一部分转发给宿主内核。Linux 大约有 350 个系统调用，Sentry 实现了 237 个，而它自己向宿主机发起的只有 68 个。

【截图：三条沙箱路线对比；风格：swimlane；截图目标：三条泳道分别是 Claude Code 的操作系统原语、Codex 的 SBPL 与 bubblewrap、云端的 microVM 与用户态内核，每条标注隔离原语和网络默认值；关键词：Seatbelt、bubblewrap、Firecracker、gVisor】

取舍在哪？Anthropic 给过一份少见的第一方对比，操作系统原语开销极低，gVisor 和虚拟机隔离更强但开销高，gVisor 上频繁 open 和 close 的文件 I/O 最多会慢 10 到 200 倍。同一页还提醒过，别想当然认为虚拟机就一定更安全，它的安全性高度依赖 hypervisor 和设备模拟代码的质量。

隔离强度和启动成本是一条跷跷板，往哪边压，取决于你跑的是自己的代码还是别人的。

**那聪明的你肯定又要问了，沙箱装上了是不是就安全了？**

不是的。沙箱本身也被绕过好几次了。

第一个例子出在 Claude Code 的网络白名单上。策略里只允许 `*.google.com`，攻击者构造一个主机名，`attacker-host.com` 后面跟一个空字节，再跟 `.google.com`。过滤器看结尾放行，操作系统却在空字节那里截断，真正连上的是攻击者的主机。

第二个例子是 CVE-2025-55284。Claude Code 1.0.4 之前，ping、nslookup、dig 在免审批白名单里。攻击者用间接提示注入让 Claude 读 `.env` 里的密钥，编码成子域名发一次 DNS 查询，密钥就流到了攻击者的服务器上。

Codex 那边也有同类问题。有个叫 GitPwned 的手法，白名单里的 `git show` 带上 `--output` 就能写 `.git/config`，注入一个恶意的外部 diff 工具，用户下次敲 `git diff` 代码就执行。白名单只认命令名，不认完整的调用。

【截图：三起沙箱逃逸；风格：checklist-card；截图目标：三张卡片分别是空字节截断绕过域名白名单、DNS 子域名外传密钥、git show 写 .git/config 注入 diff 工具，每张标注失效的那一层；关键词：空字节截断、DNS 外传、白名单只认命令名】

那自己写 Agent 该怎么办？别手搓黑名单，直接套操作系统的原语，macOS 用 sandbox-exec，Linux 用 bubblewrap。嫌麻烦就用 Anthropic 开源的命令行工具 srt 把进程包一层，本地的 MCP Server 也能包。别随手放行 `/var/run/docker.sock`，Anthropic 警告过，那等于把宿主机交出去。

最后简单总结下。黑名单拦的是命令长什么样，沙箱限制的是进程能碰到什么，前者换个写法就绕过去了，后者要操作系统点头。另外给你一个今天就能做的动作，打开 Claude Code 敲一下 `/sandbox`，确认工作目录之外的写入是关着的。

还想深入学习的，推荐五个开源项目。

anthropics/sandbox-runtime，5.3k 星标，就是前面那个 srt，Claude Code 在用的沙箱运行时。

superradcompany/microsandbox，8.3k 星标，Rust 写的本地 microVM，适合想要硬件级隔离又不想把代码送上云的。注意 macOS 只支持 Apple Silicon。

e2b-dev/runtime，1.6k 星标，E2B 云端沙箱的执行引擎，一个沙箱一台 Firecracker microVM，创建沙箱等于恢复快照。

google/gvisor，19.4k 星标，用户态内核那一路。已经有 Docker 或者 Kubernetes 体系的，换一层 runtime 就能把隔离强度提上去。

firecracker-microvm/firecracker，36.8k 星标，最底层的那块积木，AWS Lambda 和 Fargate 都跑在它上面。

顺便提醒一句，挑项目别只看星标。Daytona 仓库有 7.1 万星标，但 README 顶部有官方声明，核心开发 2026 年 6 月起转入私有代码库，不再更新。星标高不等于还活着。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！
