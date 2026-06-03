---
title: 这个 Skill 太硬了，刚上线就斩获 1.4K 星标！Agent 搜索能力拉满！
shortTitle: AnySearch 测评
description: AnySearch Skill 深度测评，实测 AI Agent 搜索基础设施，覆盖深网数据、结构化输出、多 Agent 兼容，对比传统搜索方案。
keywords:
  - AnySearch
  - AI 搜索
  - Agent Skill
  - MCP
  - 深网搜索
tag:
  - Agent
  - Skills
category:
  - AI
author: 沉默王二
date: 2026-05-31
---

大家好，我是二哥呀。

用 Claude Code 的兄弟们应该都有这种体验：让 Agent 搜个东西，WebSearch 返回的结果要么是三天前的，要么跟你的问题毫无关系。WebFetch 倒是能抓网页，但碰到动态渲染的页面直接空白，遇到需要登录的内容更是毫无办法。

其中最让人抓狂的是，那些真正有价值的信息——学术论文、代码仓库、金融数据、法律文书——传统的搜索引擎根本摸不到。用搜索引擎的行话来说，这些内容藏在"深网"里，大概占互联网高价值信息的 80%。

直到上个月，一个叫 AnySearch 的项目上线仅一周就冲上了 Skills.sh 热榜 TOP1，截至目前为止，它在 GitHub 上的 Star 数量已经来到了2.3K了。就冲着这个上升势头，二哥近日也把这个 Skill 给装上，深度体验了一把，并详细的研究了一下它的设计思路。

![anySearch stars history](https://cdn.paicoding.com/stutymore/anysearch-skill-review-star-history-202663.png)

这篇文章就来跟大家聊聊 AnySearch 到底做了什么、怎么用、实测效果怎么样。读完这篇文章，也许你会对"Agent 该怎么搜索"这件事有一个全新的认识。

## 01、AnySearch 是什么

先说清楚定位。AnySearch 不是一个搜索引擎，不是 Google 的替代品，也不是 Perplexity 的竞品。它是一个搜索基础设施，专为 AI Agent 设计的数据检索层。

这句话什么意思呢？我们用过 Agent 联网功能的都知道，现在的 Agent 搜索流程大概是这样的：用户提问题 → Agent 调 WebSearch 搜关键词 → 拿到一堆网页链接 → 用 WebFetch 抓内容 → 从 HTML 里提取文字 → 整理给用户。这个链路有三个致命问题：

第一个，搜不到深网内容。传统搜索引擎只能索引表层互联网上约 20% 的内容，剩下的 80% ——行业数据库、金融终端、代码仓库、学术平台、企业工商系统——对搜索引擎来说是不可见的。Agent 搜不到这些，回答的质量就永远被卡在天花板上。

第二个，返回的是网页列表而不是结构化数据。Agent 拿到搜索结果之后还要自己去解析 HTML、过滤广告、提取正文，这个过程既浪费 token 又容易出错。而且不同网站的 HTML 结构千差万别，同一个提取逻辑换个网站就失效了。

第三个，数据源割裂。开发者想给 Agent 接多个专业数据源，得分别找 API、分别写适配、分别维护。金融数据一套接口、学术论文一套接口、代码搜索一套接口，接五六个数据源就能把人累死。

AnySearch 做的事情就是用一套方案同时解决这三个问题。

![anySearch 架构示意图](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260602231019.png)

它自建索引，直接穿透金融、法律、学术、代码、安全、能源等 22 个垂直领域的数据源，返回的是结构化的 Markdown 数据，Agent 拿到就能直接用，不需要二次解析。

它用统一接口覆盖所有数据源。开发者只需要接 AnySearch 一个 API，就能检索所有垂直领域的内容。对 Agent 来说，就是从一个入口访问整个深网。

它原生支持三种接入方式：Skill、MCP 和 API。Claude Code 用户可以装 Skill，Cursor 用户可以配 MCP，自己写应用的可以直接调 API。同一个产品，三种形态，适配不同的使用场景。

## 02、安装 anysearch-skill

安装过程非常简单，两分钟的事。

Claude Code 用户直接让 Agent 帮你装：

```bash
帮我安装 anysearch skill，仓库地址是 https://github.com/anysearch-ai/anysearch-skill。
```

Agent 会自动把 Skill 文件下载到 `.claude/skills/` 目录，配置好之后就能用了。

![anySearch 安装 Skill](https://cdn.paicoding.com/stutymore/anysearch-skill-review-image-2.png)

Codex 用户也是类似的操作，Skills 目录路径略有不同，安装方式一样。

装完之后去 anysearch.com 注册一个账号，在控制台拿到 API Key，配到 Skill 的配置里。整个过程不超过两分钟。
> 多说一句，AnySearch 的免费额度是每天 1000 次 API 调用，面向所有个人开发者免费，这个量日常使用绰绰有余了

如果你跟我一样用的是 PaiCLI，也可以把 AnySearch 的 API 接到 PaiCLI 的工具链里。PaiCLI 本身支持扩展外部工具，配好 API 之后直接在命令行里让 Agent 搜就行，不用每次切到浏览器。

顺便提一嘴，AnySearch 支持四种运行时：Python、Node.js、PowerShell、Bash。不管你的环境是 macOS、Windows 还是 Linux，总有一款能跑起来。Windows 用户不需要额外装 Python，直接用 PowerShell 脚本就行，这是我特别想点赞的一个细节。

## 03、通用搜索实测

装好之后我做的第一件事就是拿它跟 WebSearch 做一个对比测试。

我问了一个比较综合的问题："OpenAI 2026 年的最新融资情况、API 定价变化、以及 Claude Code 和 Codex 在开发者社区的盲测对比。"

用传统的 WebSearch + WebFetch 组合，Agent 大概花了三四分钟，反复搜了四五次，抓了七八个网页，最后拼出一份摘要。数据倒是没错，但很多细节缺失——融资金额没有出资方明细，API 定价只给了最新价没有历史变化，盲测对比只找到两篇文章。

#### 最新融资情况

![最新融资情况](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260603213958.png)

#### API 定价变化

![API 定价变化](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260603214430.png)

#### Claude Code vs Codex 开发者社区盲测对比

![Claude Code vs Codex 开发者社区盲测对比](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260603214550.png)

然后我把同一个问题丢给了接入 AnySearch 的 Agent。

结果让我第一次体验到了什么叫"AI 原生搜索"。Agent 在几十秒内完成了检索、清洗和整理，返回了一份结构化的 Markdown 报告。融资金额精确到了每家出资方，API 定价变化按时间线列了出来，Reddit 上 Claude Code 和 Codex 的盲测胜率用表格呈现。

#### 以 API 定价变化为例

![API 定价变化](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260603215747.png)

这里不难发现，AnySearch 给我们返回的结果不仅有不同模型的详细价格，还列出了和往年相比的变化趋势，同时又和竞品进行了对比。和普通的搜索相比，这两者的差距，就像你让实习生帮你查资料，一个给你丢了一堆网页链接让你自己看，另一个帮你把要点提炼好了还做了对比表格。

这其中更让我觉得舒服的是搜索过程，传统搜索里 Agent 的思考过程特别冗长——搜一次发现不对，换个关键词再搜，抓到网页发现内容不够，就再换一个；来回折腾下来，token 烧了不少，最后却拿不到一个想要的结果。而 AnySearch 因为有意图识别和自动路由，Agent 只需要发起一次查询，剩下的由 AnySearch 在服务端完成。

## 04、垂直领域搜索

AnySearch 的另一个杀手级功能是垂直领域搜索。

它目前支持 22 个垂直领域，包括 `code`（代码）、`tech`（技术）、`finance`（金融）、`academic`（学术）、`legal`（法律）、`security`（安全）、`health`（医疗）、`energy`（能源）等等。每个领域背后有专门的数据源和索引策略。

我选了三个领域做了实测。

代码搜索，我让它搜 "Claude Code MCP server 实现 GitHub Python"，指定 `domain: code`。搜出来的不仅有github上的推荐项目，还有论坛上的热门文章，甚至油管上的视频教程。我们还可以让 Agent 做的更多，比如进一步筛选出最近三个月还在活跃更新的、Python 写的、跟 MCP 相关的项目等等。

![代码搜索](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260603222134.png)

学术搜索，我搜了 "transformer attention mechanism optimization 2025 2026"，指定 `domain: academic`。返回的是来自 arXiv 和学术数据库的论文列表，有标题、作者、机构、链接等结构化信息。以前做技术调研时，大家往往需要自己去 arXiv 一篇篇翻，现在 Agent 就可以直接帮我们完成初筛。不过坦白说学术搜索的覆盖面目前还不够广，有些比较新的预印本搜不到，估计是索引更新有延迟。

![学术搜索](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260603223126.png)

金融搜索，我搜了 "NVIDIA 2026 Q1 revenue data center growth"，指定 `domain: finance`。它返回了英伟达最新的季度营收数据，包括数据中心业务增长率、毛利率变化、同比和环比增长率等。数据也精确到了具体数字，而不是模糊的"大幅增长"。但如果要做专业级的金融分析，任何一个通用搜索产品都替代不了 Bloomberg Terminal，AnySearch 更适合做快速参考。

![金融搜索](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260603223445.png)

我还额外测了一下安全领域的搜索，搜了 "Log4j CVE-2021-44228 latest patches and mitigations 2026"，指定 `domain: security`。返回的结果不光是漏洞的基本描述，还有各家安全厂商的补丁建议、受影响版本清单、以及社区讨论的缓解方案链接。说实话这个搜索结果的质量比我预期的要好，因为安全漏洞信息散布在 CVE 数据库、厂商公告、安全博客等十几个不同来源里，AnySearch 能把这些信息聚合到一起，本身就是一个很有价值的能力。

三个领域的实测下来，我的感受是这样的：垂直领域搜索的质量明显优于通用网页搜索，覆盖面的广度是 AnySearch 最大的优势，但深度上各领域参差不齐。代码和技术类表现最好，金融和学术次之，法律和医疗等专业领域毕竟是新接入的，数据量和覆盖面还有提升空间。安全领域是个惊喜，信息聚合做得比我想象的好。

## 05、并行批量搜索

AnySearch 的 Skill 文件里暴露了一个 `batch_search` 工具，支持同时发起最多 5 个搜索请求，并行执行。

这个功能对于需要同时调研多个主题的场景特别实用。我拿它做了一次多维度技术情报搜集。

任务是：同时调研 Claude Code、Codex、Cursor、Windsurf 这四个 AI 编程工具最近一个月的功能更新。传统方式下 Agent 要串行搜四次，每次搜完再看结果、决定要不要深入，整个过程走下来至少十分钟。

用了 batch_search，四个搜索请求同时发出，十几秒就拿到了全部结果。Agent 把四个工具的更新内容整理成了一份横向对比表。

![批量搜索](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260603224906.png)

说实话，并行搜索这个功能在技术上不算什么创新——就是并发请求而已，任何一个后端开发都能做。但 AnySearch 把它封装成了 Agent 可以直接调用的工具，而且和垂直领域搜索、结构化输出能力结合得很好，这就让它的实用价值大大提升了。

举个实际的例子。我做 PaiAgent 开发的时候，经常需要同时调研好几个竞品的技术方案。以前的做法是挨个去官网翻文档，或者让 Agent 用 WebSearch 串行搜。现在一个 batch_search 下去，五个维度同时出结果，我只需要对着结果做决策就行了。

这种体验变化用个不恰当的比喻就是：以前是串行排队买菜，现在是同时开五个窗口，哪个先出结果看哪个。省下来的时间可以让我们花在更值得做的事情上——比如想想功能设计，或者多写几行代码。

## 06、AnySearch 和传统搜索的差异

前面聊了很多实测体验，这一节我想从技术角度认真聊聊 AnySearch 和传统搜索方案的本质差异。

传统 Agent 搜索依赖的是通用搜索引擎 API——Google Custom Search、Bing Search API 之类的。这些 API 的设计目标是给人类用的，返回的是网页列表。Agent 拿到网页列表之后要自己去抓取、解析、提取，每一步都可能出错，每一步都在消耗 token。

AnySearch 的设计出发点完全不同。它面向的不是人类用户，而是 AI Agent。所以它的整个技术流程是反过来的：先理解 Agent 的查询意图，再路由到最匹配的数据源，最后返回结构化的 Markdown 数据。中间没有 HTML 解析、没有广告过滤、没有无关内容的干扰。

![anySearch 架构示意图](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260602231019.png)

这让我想起一个很有意思的现象。以前大家讨论 Agent 能力的时候，关注点都在模型本身——模型够不够聪明、推理够不够强、上下文够不够长。但 AnySearch 的走红说明了一件事：搜索层的质量，对 Agent 最终表现的影响可能比我们想象的更大。

就像一个很聪明的人被关在一个乱糟糟的图书馆里找资料，他再聪明也得花很多时间翻书架。但如果图书馆的索引系统做得好，普通人也能很快找到需要的东西。AnySearch 做的就是给 Agent 建了一套好用的索引系统。

还有一个维度值得掰开聊——搜索结果的格式对 Agent 后续处理的影响。传统搜索返回的 HTML 页面，平均只有 20% 到 30% 的内容是正文，剩下的是导航栏、广告、推荐阅读、评论区、页脚链接。Agent 拿到这些页面之后，要么用规则提取正文（换个网站就失效），要么把整页 HTML 塞给模型让模型自己找（疯狂烧 token）。AnySearch 返回的是纯 Markdown 结构化数据，没有这些噪音，Agent 可以直接把返回内容放进推理流程里。这个差异在单次查询中可能不算什么，但你想想如果 Agent 每天要做几十上百次搜索，累积下来的 token 节省和准确率提升就是一个很可观的数字了。

再看基准测试。AnySearch 官方公布的数据显示，在 Frames、FreshQA 和 WebWalkerQA 三个数据集上，AnySearch 的准确性和响应延迟都优于依赖公开网页数据的同类产品。

不过这里我得说句公道话。Frames 和 FreshQA 这两个数据集主要测的是事实性问题的回答质量，跟传统搜索引擎的评测维度类似。WebWalkerQA 更贴近 Agent 使用场景，测的是多步检索和信息聚合能力。这三个基准能说明 AnySearch 在特定维度上的优势，但要说它"全面超越传统搜索"，我觉得还为时过早。

因为传统搜索有一个 AnySearch 目前做不到的能力——覆盖面。Google 索引了万亿级别的网页，AnySearch 的索引量级现在还不清楚，保守估计差了几个数量级。所以对于长尾的、冷门的信息需求，传统搜索可能更靠谱。

## 07、社区生态

AnySearch 官方开源了两个项目，一个是 anysearch-skill（Skill 插件），一个是 anysearch-mcp-server（MCP 服务器）。两个都是 MIT 协议，随便用随便改。

![anySearch 社区生态](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260603225127.png)

除了官方项目，社区也贡献了不少有价值的东西。

最值得一提的是GitHub上一个叫 luoqianyi 开发的 easy_anysearch_skill 的项目，它的最大卖点是免 API Key，用了一个代理池机制来绕过速率限制。原理是并发探测多个代理节点，哪个能用就自动切换到哪个，代理不可用的时候自动回退到直连。对于没有 AnySearch API Key 或者网络环境比较受限的用户来说，这个方案很实用。

安装方式也很简单：

```bash
git clone git@github.com:luoqianyi/easy_anysearch_skill.git ~/.claude/skills/easy_anysearch_skill
```

使用时通过 `uv` 运行，不需要手动安装 Python 依赖：

```bash
uv run ~/.claude/skills/easy_anysearch_skill/search.py "搜索关键词"
```

我自己两个都装了。日常开发用官方版，稳定可靠，每天 1000 次免费额度完全够用。偶尔额度不够了或者需要更自由的调用频率，就切到 easy_anysearch_skill。两个互补，基本覆盖了所有场景。

另外，AnySearch 的 MCP Server 也值得说一下。MCP（Model Context Protocol）是现在 Agent 工具接入的主流协议，AnySearch 的 MCP Server 暴露了四个标准工具：`search`（通用/垂直搜索）、`list_domains`（查询可用的垂直领域）、`batch_search`（批量搜索）、`extract`（URL 内容提取）。

配好 MCP 之后，Claude Desktop、Cursor、VS Code Copilot 这些支持 MCP 的工具都能直接用。跟 Skill 方式相比，MCP 的好处是不需要配 Skill 文件，对多工具切换的用户更友好。

AnySearch 现在也上线了 Skills.sh、ClawHub、Glama、LobeHub 这些 Skill/MCP 市场。在 Skills.sh 上排进了 TOP1，说明开发者的认可度确实很高。

整个社区生态给我的感觉是：2016 年的 iOS 越狱社区那种活力——官方给了基础能力，社区在上面做各种骚操作，互相促进。不知道这个比喻恰不恰当，但确实有那味儿。

## ending

虽然只是使用 AnySearch 在有限的几个场景下进了测试，但是我对 Agent 搜索的认知却被刷新了。

以前我觉得 Agent 联网就是搜网页、抓内容、拼答案，就是个信息搬运工。现在我发现，搜索层的设计水平直接决定了 Agent 的天花板在哪里。

一个好用的搜索基础设施应该做到三件事：帮 Agent 找到传统搜索引擎找不到的内容，帮 Agent 用最低的成本获取最干净的数据，帮开发者用一套接口搞定所有数据源。AnySearch 在这三个方向上迈出了一大步。

![anySearch 产品总结](https://cdn.paicoding.com/stutymore/anysearch-skill-review-20260603225510.png)

缺点也有。垂直领域的深度还不够均衡，学术和金融领域的数据覆盖面有待提升。偶尔会出现索引延迟，新发布的内容搜不到。但考虑到它才上线不到一个月，这些问题都可以理解。

2.3K Star 不是白给的。如果你也在用 Claude Code、Codex 或者 PaiCLI 做开发，我强烈建议装上试试。装之前你可能会觉得"Agent 搜搜网页不就够了"，装之后你会发现——原来 Agent 能搜到的东西比你想象的多得多。

最后说一句掏心窝的话。AI 行业现在有个很有意思的趋势：当所有人的注意力都在卷模型大小、卷 benchmark 分数的时候，真正让 Agent 落地的往往是这些"不起眼"的基础设施——搜索、记忆、工具调用、上下文管理。这些东西没有千亿参数的光环，但它们决定了 Agent 到底是玩具还是生产力工具。

【**好的基础设施，不是让你多一个选择，而是让你不需要再做选择。**】
