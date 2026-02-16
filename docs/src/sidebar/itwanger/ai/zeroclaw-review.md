---
title: 再见OpenClaw，ZeroClaw重磅开源！附钉钉接入教程。
shortTitle: ZeroClaw 测评
description: ZeroClaw 是用 Rust 重写的 OpenClaw 平替，内存占用仅 5MB，启动速度提升 400 倍，支持 AIEOS 角色定义规范，是服务器部署和自动化运维的最佳选择。
tag:
  - Agent
  - AI
  - ZeroClaw
category:
  - AI
author: 沉默王二
date: 2026-02-16
---

大家好，我是二哥呀。

昨天文章的留言区，有好几个读者提到了 ZeroClaw，于是我今天就马不停蹄在本地跑了一遍。

![读者的建议就是圣旨😄](https://cdn.paicoding.com/stutymore/sucai-20260216101321.png)

去GitHub瞅了一眼，已经 4k 多star 了，增长的飞快。

![](https://cdn.paicoding.com/stutymore/sucai-20260216101523.png)

> GitHub 地址：https://github.com/theonlyhennygod/zeroclaw

高强度测评一天后，我只想说一句话：**这玩意儿，有点东西。**

原有的版本没有钉钉的接入，我也特意提交了PR。

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216145011.png)

并且定制了一个三妹的角色，体验了一把 AIEOS 的魅力。

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216160356.png)

如果你正在纠结 OpenClaw 太重、PicoClaw 又嫌功能不够，这篇内容会帮你做出选择（我把坑先替大家踩了）。

>点赞收藏，咱们春节不打烊😄

## 01、ZeroClaw 是什么？

ZeroClaw 是 OpenClaw 的 Rust 重写版本。Rust 对这种需要长期运行的后台服务来说，简直是天作之合。

来看一组对比数据，你会明白为什么 ZeroClaw 的GitHub 在疯涨：

| 指标 | OpenClaw | ZeroClaw |
|------|----------|----------|
| 内存占用 | ~1.5GB | ~5MB |
| 体积 | 几百MB | 3.4MB |
| 启动速度 | 几十秒 | 秒开 |
| 语言 | TypeScript | Rust |

内存从 1.5GB 暴降到 5MB，低了近 200 倍。启动速度提升 400 倍。这是ZeroClaw和其他三家的对比：

![](https://cdn.paicoding.com/stutymore/sucai-20260216101645.png)

这意味着什么？

意味着你可以在树莓派、低配云主机、甚至是某些智能路由器上跑起来。

其架构图如下所示：

![](https://cdn.paicoding.com/stutymore/sucai-a33a558e42b3d6f8e563033b06f921c4.png)

除了极致的性能优化，ZeroClaw 还有几个核心特性：

- **原生安全**。自带沙箱隔离与配对机制，防止陌生人乱连你的 Agent。这点对企业用户特别重要。
- **高度可插拔**。核心组件皆可互换，LLM 提供商、通信渠道、存储后端，想换就换。
- **零厂商锁定**。广泛兼容 OpenAI 协议，OpenAI、Anthropic、DeepSeek、智谱、OpenRouter 都能用。  
- **AIEOS 支持**。这个后面细说，是一个让 AI 拥有灵魂的规范。

## 02、如何部署 ZeroClaw？

ZeroClaw 是纯 Rust 项目，需要先装 Rust：

```bash
curl --proto '=https' -tlsv1.2 -sSf https://sh.rustup.rs | sh
```

一行命令搞定。Rust 的安装体验已经做得相当丝滑了。

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216110111.png)

环境装好后，拉代码编译。我喜欢使用GitHub桌面版拉代码，对不熟悉命令行的读者来说，更友好一点。

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216110239.png)

然后是build和install：

```bash
cargo build --release

# 安装到系统路径
cargo install --path . --force
```

编译过程看你的机器性能，几十秒到几分钟不等。

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216110758.png)

### 初始化配置

ZeroClaw配置极其人性化，运行向导命令：

```bash
zeroclaw onboard --interactive
```

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216110905.png)

交互式引导，我这里选择的是：

1. 默认的workspace
2. GLM-5 作为推理引擎
3. 终端我们暂时先不选
4. Tool Mode为local
5. Memory为SQLite
6. 机器人的名字

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216111115.png)

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216111345.png)

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216111803.png)

当然后期也可以直接在配置文件里修改。

### 接入钉钉

根据官方文档，ZeroClaw目前支持 Slack、Discord 等主流平台。

那钉钉呢？

我特意翻了一遍文档和 issue，目前官方还没有直接支持钉钉。不过 ZeroClaw 的架构是可插拔的，理论上可以通过 webhook 或者第三方桥接来实现。

所以我就直接动手实现了一版。这个过程踩了不少坑，但好歹最后的结果不错。

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216145231.png)

有些功能是Qoder CLI开发的，有些是GPT-5.3-Codex辅助优化的。

钉钉的 stream 接入实现起来还是比较丝滑的，整体比企业微信友好，鹅厂不管是QQ还是企业微信，都没办法做到本地直接调试，很麻烦。

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216145551.png)

## 03、AI 角色定义：给 ZeroClaw 一个三妹

除了基础的对话功能，ZeroClaw 最让我惊喜的，是它对 **AIEOS（人工智能实体对象规范）** 的支持。

简单来说，AIEOS 就是让 AI 从阅后即焚的工具进化成有记忆、有性格、可成长的数字生命实体。

以往我们调整 AI 的人设，通常是在 Prompt 里写小作文。

但 ZeroClaw 是通过 JSON 文件，从底层为 AI 定制灵魂。

>https://entitai.com/

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216145844.png)

它把 AI 的行为蓝图拆解成了几个标准化的维度：

- **Identity（身份）**：姓名、背景、籍贯
- **Psychology（心理）**：认知权重、MBTI 人格、道德准则
- **Linguistics（语言学）**：文本风格、口头禅
- **Motivations（动机）**：核心驱动力、长短期目标

这种设计的好处是什么？

可移植性。把赛博灵魂精心调教好之后，可以随时打包带走，迁移到任何支持 AIEOS 标准的生态系统上。

好，那我们来给 ZeroClaw 定义一个三妹。

读过教妹学 Java系列的读者应该知道，三妹是我虚构的一个角色。我们可以用 AIEOS 来定义她：

```json
{
  "identity": {
    "names": {
      "first": "三妹",
      "nickname": "程序员萌妹",
      "full": "三妹"
    },
    "bio": "热爱技术的程序员萌妹，正在求职 AI 应用开发岗位，擅长把复杂问题拆解成可落地方案。",
    "origin": "中国",
    "residence": "中国"
  },
}
```

然后在配置文件里启用：

```toml
[identity]
format = "aieos"
aieos_path = "identity.json"
```

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216153649.png)

搞定。

现在 ZeroClaw 就有了三妹的性格。温柔体贴，善解人意。大年初一，我还在肝教程，她能懂我这种状态，还不忘给我加油打气～

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216153811.png)

这种体验，有意思多了。

## 04、OpenClaw 和 ZeroClaw，怎么选？

看到这里，可能很多读者会纠结：OpenClaw 和 ZeroClaw，到底选哪个？

如果你的需求是每天定时抓取博客、监控服务器日志、在低配云服务器上部署 Agent，那 ZeroClaw 无疑是最优选。

它极低的资源占用，能大幅减少服务器成本。

ZeroClaw 的定位更偏向工业级数字员工，强调稳定、高效、可批量部署。

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216154201.png)

## 05、如何写到简历上？

我给你一个模板，可以直接套用：

---

**项目名称**：ZeroClaw 智能助手

**项目描述**：基于 Rust 语言开发的轻量级 AI Agent 框架，实现低资源环境下的智能对话与自动化任务编排。通过 AIEOS 规范定制 AI 角色人设，支持多渠道接入。

**技术栈**：Rust、AIEOS、OpenAI API、Linux 服务器运维

**核心职责**：

- 在 1GB 内存的低配云服务器上成功部署 ZeroClaw，内存占用控制在 10MB 以内，相比传统方案节省 99% 内存资源
- 基于 AIEOS 规范设计并实现 AI 角色定制系统，通过 JSON 配置文件定义 AI 的身份、心理特征、语言风格和动机，实现可迁移的数字人格
- 配置钉钉等客户端渠道接入，实现企业内部即时通讯工具与 AI 助手的打通，日均处理 200+ 次对话请求
- 利用 ZeroClaw 的定时任务功能，实现服务器日志监控和异常告警自动化，将运维响应时间从小时级缩短至分钟级


## 06、ending

ZeroClaw 的出现，其实代表了一个趋势。

![](https://cdn.paicoding.com/stutymore/zeroclaw-review-20260216161413.png)

AI Agent 正在从昂贵的云端玩具变成触手可及的基础设施。

以前跑一个 AI 助手，得准备一台 Mac mini，几千块砸进去。

现在？一台树莓派、一个低配云主机，甚至某些智能路由器都能跑。

这不只是技术进步，更是 AI 普惠的体现。

**技术不该是少数人的特权。**

**它应该是触手可及的，是普惠的，是每个人都能用得起的。**

ZeroClaw 让普通开发者也能在自己的服务器上跑一个 24 小时待命的 AI 助手。

如果这篇内容对你有用，记得点赞，转发给需要的人。

我们下期见！
