---
title: Hy4 preview发布，SWE-bench、Terminal-Bench、GPQA Diamond 这些评测集到底在测什么？
---

每次有新模型发布，你一定见过这样一张成绩单。

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831150354.png)

就拿腾讯刚刚发布的 Hy4 preview 来说。SWE-bench Multilingual 82.9、Terminal-Bench 85.4、GPQA Diamond 92.3。。。。。。

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831150542.png)

看得你是一头雾水。

82.9 算高分还是算低分？SWE-bench 和 SWE-bench Pro 有什么区别？Terminal-Bench 和 MCP-Atlas 又有什么区别？

我把跑分评测的官方论文和官网都翻了一遍，可以自信地、大方地、光明磊落地帮你搞清楚三件事：

- 评测到底在评测什么？
- 为什么不能只看一个分数就判断模型好不好？
- 看懂成绩单之后，怎么帮我们选模型？

哈喽大家好，我是二哥呀。今天用 3 分钟，带你看懂大模型的成绩单。系好安全带，我们粗粗粗出发了～

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831145556-0f555230.png)

主流的评测主要有 8 个：SWE-bench Multilingual、SWE-bench Pro、DeepSWE、Terminal-Bench、MCP-Atlas、Toolathlon-Verified、CyberGym、GPQA Diamond。我按能力类型把它们分成三大类，代码能力、Agent 工具能力和推理能力。一个一个来解释。

## 代码能力：SWE-bench 考模型修 bug

先说代码能力。SWE-bench Multilingual、SWE-bench Pro、DeepSWE，考的都是同一件事，模型修 bug 的能力。

SWE-bench 是由普林斯顿大学 NLP 团队推出的一款专门用于评估大语言模型（LLM）解决真实世界软件工程（Software Engineering）问题能力的基准测试集。

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831152737.png)

其中 “SWE” 就是 Software Web Engineering / Software Engineer（软件工程师）的缩写，而 “bench” 是 Benchmark（基准测试）的简写。

它的考法是给模型一个真实的 GitHub Issue 和整个代码仓库，模型自己定位 bug、自己写补丁（也就是把代码改对），直到跑通项目测试才算对。

SWE-bench 的项目动不动就是几万行，模型得先读懂架构，再精准找到 bug 在哪里，改完还不能引入新的 bug。

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831145814-769b9641.png)

## SWE-bench 的三个升级方向

诞生之初的 SWE-bench 只有 2294 道题，且全部局限于 Python 语言。为了紧跟大模型能力的进化，它随后往三个方向进行了升级。

首先是编程语言种类的增加，推出了支持 9 种语言的 SWE-bench Multilingual；

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831154530.png)

其次是难度的增加，推出了 SWE-bench Pro，之前的版本里，模型平均修一个 bug 只要改 41 行代码；到了 Pro，平均要改 170 行。要改的行数越多，说明这个 bug 牵扯的代码面越广、藏得越深，也就越难。

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831154601.png)

DeepSWE 是由 Datacurve 于 2026 年发布的一款专门用于评估 AI 编程智能体（Coding Agents）的长周期软件工程（Long-horizon Software Engineering）基准测试集。

DeepSWE 包含的 113 道题全部是从零编写的，从根源上杜绝了数据污染，确保大模型无法靠“死记硬背”偷看答案。

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831154450.png)

Hy4 preview 的成绩单是，SWE-bench Multilingual 82.9、SWE-bench Pro 65.7、DeepSWE 64.3。

## Agent 工具能力：模型自己动手干活

那聪明的你肯定想到了，光会改代码还不够，模型自己动手干活的能力呢？

Terminal-Bench、MCP-Atlas、Toolathlon-Verified、CyberGym，考的就是模型能不能像真人一样操作工具、执行任务，也就是 Agent 工具的执行能力。

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831155118.png)

Terminal-Bench 是由 Harbor 团队与 Laude 研究所等开源社区共同推出的一款针对 Agent 在终端操控能力上的权威基准测试。

它把模型扔进 Docker 沙箱里，通过 89 道真实终端任务，比如说编译代码、训练模型、搭服务器等，让 Agent 自己敲命令把任务干完。

MCP-Atlas 考的是 Agent 对 MCP 的调用能力。一共 1000 道题，36 个 MCP 服务器，大模型得自己知道该调用哪个，还得跨服务器串联调用。每道题还特意放了一堆干扰工具，考察模型能不能把对的挑出来。

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831150017-7c2d64f4.png)

Toolathlon-Verified 由香港科技大学 NLP 团队提出，更贴近真实的办公场景，包括 32 个真实的软件，从 Google Calendar 到 Kubernetes。

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831155644.png)

CyberGym 考查的是模型的安全攻防能力，覆盖 1507 个真实漏洞，模型要写出能复现漏洞的概念验证代码（PoC），才算通过。

Hy4 preview 的成绩是，Terminal-Bench 85.4、MCP-Atlas 83.7、Toolathlon-Verified 74.1、CyberGym 78.4。整体表现不错。

## 推理能力：GPQA Diamond

那聪明的你肯定又要问了，怎么衡量模型在需要深度推理和领域专业知识问题上的能力呢？

GPQA Diamond。

全称 Graduate-Level Google-Proof Q&A，是全球 AI 行业公认最具含金量的研究生/博士级全能科学推理基准测试之一。

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831160201.png)

由纽约大学等机构的学者于 2023 年底提出，并在 2026 年初升级发布了 v1.0 规范。该测试主要用来衡量大语言模型在生物学、物理学和化学三大科学领域的高阶推理与知识储备能力。

Hy4 preview 拿了 92.3 分，还算不错。

这个知识点你学废了吗？想解锁更多 AI 硬核知识，点赞关注，我是二哥，咱们下期见！

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831161007.png)

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831161014.png)

![](https://cdn.paicoding.com/stutymore/what-benchmarks-test-20260831161038.png)