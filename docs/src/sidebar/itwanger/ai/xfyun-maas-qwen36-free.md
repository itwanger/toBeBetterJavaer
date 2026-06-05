---
title: 终于可以爽用 Codex+Claude Code 了，无限 token！
shortTitle: 讯飞MaaS免费Qwen3.6实测
description: 讯飞星辰 MaaS 平台限时免费开放 Qwen3.6-35B-A3B、Qwen3.5-35B-A3B，本文手把手教你领取免费调用权益，并接入 Claude Code、Codex、PaiCLI 实测代码理解与长文档分析。
keywords:
  - 讯飞星辰 MaaS
  - Qwen3.6-35B-A3B
  - 免费大模型 API
  - Claude Code 接入国产模型
  - Codex 切换模型
tag:
  - Agent
  - 大模型
category:
  - AI
author: 沉默王二
date: 2026-06-02
---

大家好，我是二哥呀。

用 Claude Code 和 Codex 写了大半年代码，最大的感触就是工作效率拉到了满中满。

但同时，钱包也隐隐作痛，每个月第一天我都要先充 500 刀。

![](https://cdn.paicoding.com/stutymore/xfyun-maas-qwen36-free-8cf0a9db49a59b97047496092280403f.jpg)

我是能用得起，但讲真，身边很多二三线城市的朋友根本不敢用 Opus 4.8 和 GPT-5.5 这种顶级模型，毕竟一个月三千多块不是个小数目。

更别提在校的大学生了。

所以我最近一直在薅免费且战力很不错的模型，因为后台很多小伙伴在求。

就在今天，我发现讯飞星辰 MaaS 平台限时免费开放了 Qwen3.6-35B-A3B 和 Qwen3.5-35B-A3B 两个模型，新老用户都能领，免费无限 token。

>薅起来：https://maas.xfyun.cn/modelSquare?ch=MaaS-jgkol-l7P2y

需要的小伙伴速度冲一波啊。

我立马就接进了 Claude Code、Codex，还有我的 PaiCLI，拿来做长文档分析、代码理解，真的可太爽了。

![](https://cdn.paicoding.com/stutymore/xfyun-maas-qwen36-free-20260603094426.png)

想薅的趁早啊。

## 01、讯飞星辰 MaaS 的领取流程

第一步，打开讯飞星辰 MaaS 平台的模型集市，地址是 `https://maas.xfyun.cn/modelSquare?ch=MaaS-jgkol-l7P2y`。进去之后能看到很多模型，比如说DeepSeek V4。

![](https://cdn.paicoding.com/stutymore/xfyun-maas-qwen36-free-20260602232241.png)

第二步，选择 Qwen3.6-35B-A3B 和 Qwen3.5-35B-A3B 两个免费的模型。在模型卡片上点击【API调用】，进入服务配置页面。

![](https://cdn.paicoding.com/stutymore/sucai-20260602221226.png)

第三步，填写模型服务的 API 名称，选择一个要授权的应用。如果你还没有应用，先创建，再回来绑定。

![](https://cdn.paicoding.com/stutymore/sucai-20260602221532.png)

第四步，把三样关键信息复制出来：

![](https://cdn.paicoding.com/stutymore/xfyun-maas-qwen36-free-20260603094715.png)

- modelId：比如我这里拿到的是 `xopqwen36v35b`，这个就是后面要填的模型名称
- OpenAI 兼容接口地址：`https://maas-api.cn-huabei-1.xf-yun.com/v2`
- API Key：在服务接口认证信息复制

## 02、Qwen3.6-35B-A3B 是什么水平？

Qwen3.6-35B-A3B 是通义千问团队前不久开源的稀疏混合专家（MoE）模型，采用 Apache 2.0 协议。

名字里的两个数字很有讲究：总参数 35B，但每次推理只激活其中的 3B。这意味着它在跑的时候的实际计算量，跟一个 3B 的小模型差不多，但天花板却是 35B 的水平。

昨天有朋友直接就薅了 2亿 token，真的是免费的用起来是一点不心疼啊。😄

![](https://cdn.paicoding.com/stutymore/sucai-20260602214126.png)

这里多解释一句，激活 3B 这个设计为什么重要。

传统的稠密模型，参数有多大，每次推理就得全量算多大，35B 的模型就老老实实算 35B，又慢又费显存。

![](https://cdn.paicoding.com/paicoding/0a6b0c98769594b8b00b0a41a22e8f58.png)

MoE 的思路是把模型拆成一堆专家，每次只挑几个最相关的专家上场，其余的歇着。所以 Qwen3.6-35B-A3B 虽然总参 35B，单次推理只动用 3B，推理速度和成本接近一个 3B 小模型，知识储备和能力上限却是 35B 的底子。这就是它能又快又便宜，还能保持不错能力的根本原因。

跑分这块没得说。

![](https://cdn.paicoding.com/stutymore/xfyun-maas-qwen36-free-20260602234409.png)

它还是个原生多模态模型，带视觉编码器，在多项视觉、文档理解指标接近或超过 Claude Sonnet 4.5。

一个激活参数只有 3B 的模型能做到这种程度，确实有点东西。

一句话总结：适合拿来做长文档分析、长代码片段理解、代码生成、复杂问题推理。

对天天要读源码、啃文档的小伙伴来说，免费 + 能力够用，实在没法拒绝。

## 03、接入 Claude Code 和 Codex

讲一下怎么把模型接进 Claude Code 和 Codex，这是大家用得最多的两个 Agent。

第一步，下载 PaiSwitch，这是我自己肝的一个轮子，仓库地址 `https://github.com/itwanger/PaiSwitch`。它的作用和 CC-switch 类似，就是在本地给 Claude Code、Codex 切换不同的底层模型。

![](https://cdn.paicoding.com/stutymore/sucai-20260602224314.png)

之前有小伙伴评论区问，已经有 CC-switch 了，为啥还要自己造？

原因很简单，我想搞明白底层到底是怎么回事。比如，为什么 Claude Code 切到 DeepSeek V4 Pro 还能正常用？为什么 Codex 切底层模型的时候，需要适配一套新的协议？

![](https://cdn.tobebetterjavaer.com/paicoding/README-3b4ef8952cb448f798c7e85c46994f50.png)

这里面其实藏着一个关键差异。

Claude Code 走的是 Anthropic Messages 协议，Codex 走的是 OpenAI Responses 协议，而讯飞 MaaS 提供的是 OpenAI Chat Completions 协议。三套协议不一样，要让它们互通，中间必须有一层做协议转换。

![](https://cdn.tobebetterjavaer.com/paicoding/README-bfefe858cf2e433a899baf747a4bde41.png)

作为一个工具的使用者，你完全可以不关心这些底层细节，能用就行。

但作为一个天天给大家讲技术原理的博主，万万不能不懂啊。😄 

所以这个轮子我必须得造。

我已经给 PaiSwitch 加上了讯飞星辰 MaaS 的支持，内置了一个新的 provider，Claude Code 和 Codex 两边都能用。

![](https://cdn.paicoding.com/stutymore/xfyun-maas-qwen36-free-20260602232921.png)

具体怎么转呢？

Claude Code 这一侧，走本地的 `/claude-proxy/{code}` 通道，把 Anthropic Messages 协议转成 OpenAI Chat Completions。Codex 这一侧，走本地的 `/codex-proxy/{code}/v1` 通道，把 Responses 协议转成 Chat Completions。两边都支持 lora_id 和 resourceId，调微调模型也可以用。

适配后，接入步骤就两步。

第一步，在 PaiSwitch 里新建一个讯飞 MaaS 平台的供应商，填三样东西：

- Base URL：`https://maas-api.cn-huabei-1.xf-yun.com/v2`
- 模型名称：`xopqwen36v35b`
- API Key：在服务接口认证信息复制

和前面的一样。填完记得点一下测试连接，看看能不能通。

![](https://cdn.paicoding.com/stutymore/sucai-20260602224458.png)

第二步，在仪表盘里选你想切换的模型。目前 PaiSwitch 已经集成了 DeepSeek V4、GLM-5.1、Kimi 等一堆供应商，讯飞 MaaS 现在也在列。哪天平台上新了什么免费模型，我第一时间就能接进来。

![](https://cdn.paicoding.com/stutymore/sucai-20260602224809.png)

下一步，我觉得可以给PaiSwitch增加另外一个功能了，就是 auto 模式，按照一个顺序，自动切换。

策略包括动态惩罚路由，每个模型有一个基础优先级，但实际排序用的是“基础优先级 + 惩罚分”。

![](https://cdn.paicoding.com/stutymore/freellmapi-install-guide-20260529202211.png)

滑动窗口限流。

![](https://cdn.paicoding.com/stutymore/freellmapi-install-guide-20260529202710.png)

冷却升级，同一个模型在 24 小时内第一次触发 429，冷却 2 分钟。第二次 10 分钟。第三次 1 小时。第四次直接冷却 24 小时。

![](https://cdn.paicoding.com/stutymore/freellmapi-install-guide-20260529203323.png)

敲，这就是做轮子的意义。

这样，讯飞星辰MaaS平台上新什么模型，有哪些免费的模型可以用，我就可以第一时间接入到Claude Code和Codex中。

![](https://cdn.paicoding.com/stutymore/sucai-20260602225437.png)

如果发挥想象，用PaiSwitch做个API中转好像也不是不可能啊。

## 04、接入 PaiCLI

PaiCLI 是我做的一个 Agent CLI，类似 Claude Code，支持代码检索、RAG、多 Agent 协作、MCP、Skills 等等。

接入方法很简单。如果你也在用 Claude Code 或者 Codex 在开发，可以直接把讯飞的 HTTP 接口文档丢给 Agent，让它帮你对接。

> 按照：https://www.xfyun.cn/doc/spark/推理服务-http.html 接入千问 Qwen3.6-35B-A3B

![](https://cdn.paicoding.com/stutymore/sucai-20260602221914.png)

然后把前面拿到的 modelId、API Key、接口地址填进 PaiCLI 的 `.env` 配置文件。PaiCLI 里专门给讯飞 MaaS 留了一组配置项：

```bash
# ========== 讯飞星辰 MaaS 配置 ==========
XFYUN_MAAS_API_KEY=你的_api_key
# 模型名称，以模型卡片展示的 modelId 为准
XFYUN_MAAS_MODEL=xopqwen36v35b
# Base URL，新服务用 v2，存量服务按控制台改 v1
XFYUN_MAAS_BASE_URL=https://maas-api.cn-huabei-1.xf-yun.com/v2
# 调微调模型时填服务卡片上的 resourceId
XFYUN_MAAS_LORA_ID=0
```

![](https://cdn.paicoding.com/stutymore/sucai-20260602222207.png)

填完之后重启 PaiCLI，输入 `/model xfyun` 就切过去了，接下来就可以爽用这个模型了。

![](https://cdn.paicoding.com/stutymore/sucai-20260602222313.png)

我先测了最常见的一个场景：代码理解。

直接丢给它一段没头没尾的代码，让它告诉我这段代码是干嘛的、关键逻辑在哪。Qwen3.6 的反应很利索，没有绕圈子，直接把这段代码的职责、输入输出、几个关键分支讲得明明白白。更难得的是，它不只是逐行翻译代码，而是能讲出这段代码“为什么这么写”，这种解释对学习源码的小伙伴来说非常有用。

![](https://cdn.paicoding.com/stutymore/sucai-20260602220936.png)

实测下来我的结论是：拿它做日常的代码理解、文档总结，完全够用，而且因为限时免费，用起来一点心理负担都没有。

要知道，同样的活儿用 Opus 4.8、GPT-5.5 来跑，那是要真金白银烧 token 的。

把高价模型省下来留给真正难啃的硬骨头，日常的杂活交给免费的 Qwen3.6 就够用了。

## ending

写到这儿，我越来越觉得，免费这件事本身就是一种生产力。

不是说免费的就一定好，而是当一个能力够用的模型不再向你收费，你就敢放开手脚去试。

敢让它读完整个仓库，

敢把几万字的文档一股脑丢进去，

敢一遍跑不满意就再跑十遍，

不用每点一次回车就在心里盘算这次烧了多少 money。

这种状态，恰恰是学习和探索最需要的。

对于很多小伙伴来说，缺的从来不是热情，是预算。现在有一个免费、能力还不错的模型摆在面前，那就别犹豫了。

【**白嫖不丢人，丢人的是机会摆在面前却懒得伸手。**】

现在就去讯飞星辰 MaaS 平台，把 Qwen3.6-35B-A3B、Qwen3.5-35B-A3B 薅了吧，现在就去。

![](https://cdn.paicoding.com/stutymore/xfyun-maas-qwen36-free-20260602235028.png)

>https://maas.xfyun.cn/modelSquare?ch=MaaS-jgkol-l7P2y

接进你的 Claude Code、Codex 里跑两天试试。

我们下期见。
