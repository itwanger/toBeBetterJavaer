---
title: AI Agent 知识体系
---

# AI Agent 知识体系

主打 AI 时代的工程化技术栈，覆盖 Claude Code、Codex、OpenClaw、Skills、Harness、MCP、RAG 等核心知识点。无论你是准备 AI 岗面试，还是想用 Agent 工具提升开发效率，这里都能找到答案。

> 持续更新中，建议收藏本页，随时回来查漏补缺。

## 面试备战

面试题集与高频面试场景，覆盖 Agent、RAG、大模型、MCP、Skills 等核心考点。

| 文章 | 核心内容 |
| --- | --- |
| [AI Agent 面试 288 题合集](/ai/video/) | Agent/RAG/MCP/LLM 全覆盖 |
| [AI 大模型 333 题备份清单](ai-large-model-333.md) | 大模型高频面试题库 |
| [AI Agent 学习路线](ai-agent-xuexiluxian.md) | 后端转 AI Agent 的完整学习路径 |
| [阿里一面：Agent 项目怎么做](agent-mianshi.md) | LangChain、Multi-Agent、A2A |
| [面试 AI 应用开发岗](ai-mianshi-openclaw.md) | Token、RAG、OpenClaw 实战 |
| [暗水印与 SSE、MCP 面试](anshui-yin-mianshi.md) | SSE、Streamable HTTP、MCP |
| [LangGraph4J 面试](langgraph4j-interview.md) | Agent 项目、Function Calling |
| [RAG 面试：MySQL 硬扛百万向量](rag-mysql-mianshi.md) | MySQL 向量检索方案 |
| [RAG + Agent + MCP 面试](paismart-rag-interview.md) | RAG 工程化面试全流程 |
| [LoRA + Agent + RAG 面试](paismart-rag-mianshi.md) | 微调与 Agent 深度问答 |
| [Skills 和 Prompt 有什么区别](skills-mianshi-hangye.md) | Skills 原理与行业应用 |
| [OpenClaw 架构原理面试](openclaw-jiagou-yuanli.md) | 核心架构到 Agent 部署 |
| [OpenClaw Memory vs RAG](openclaw-memory-review.md) | SQLite vs ElasticSearch |
| [OpenClaw 多 Agent 路由](openclaw-multi-agent.md) | dmPolicy + bindings |
| [DeepSeek 招人标准](deepseek-agent-hiring.md) | DeepSeek 岗位要求解读 |
| [RAG 面试：录用理由](rag-interview-questions.md) | RAG 高频考点 |

## Agent 核心技术

从 Prompt Engineering 到 Harness Engineering，Agent 时代的核心概念与工程实践。

### Harness Engineering

| 文章 | 核心内容 |
| --- | --- |
| [为什么 2026 年要拼 Harness](agent-harness-engineering.md) | Prompt → Context → Harness 演进 |
| [字节 Harness Agent 49k+ Star](harness-engineering-review.md) | 字节开源 Harness 框架深度评测 |
| [Anthropic 官方 Harness 发布](claude-managed-agents-launch.md) | 官方 Harness 提速 10 倍 |
| [Loop Engineering 实战](loop-engineering-guide.md) | /loop /goal 工程化实践 |

### Skills 体系

| 文章 | 核心内容 |
| --- | --- |
| [Skills 到底是啥（附源码实战）](claude-skills-quanwei-jiedu.md) | Skills 权威解读 + TRAE + Java |
| [Skill Creator 深度拆解](skill-creator-deep-dive.md) | Claude Code Skill Creator 源码分析 |
| [Skills 原理教程](skills-yuanli-jiaocheng.md) | 从零写 30 个 Skill 的实战经验 |
| [6 个 Skills 效率翻倍](6-skills-recommend.md) | Codex + Claude Code 通用 Skills |
| [Top 10 热门 Agent Skills](agent-skills-top10.md) | 横评热门 Skills 生态 |
| [AnySearch Skill 评测](anysearch-skill-review.md) | Agent 搜索能力 Skill |
| [web-access Skill 评测](web-access-skill-review.md) | Agent 联网能力 Skill |
| [web-access Skill 微信版](web-access-skill-review-wechat.md) | 2.8K 星标联网 Skill |
| [BrowserAct 反爬 Skill](browseract-anti-crawl-review.md) | 浏览器自动化 + 验证码 |
| [MiniMax Skills 实测](minimax-skills-ceping.md) | MiniMax 开源 Skills 评测 |
| [SkillHub 科大讯飞开源](skillhub-iflytek.md) | 技能商店三分钟搭建 |
| [SkillHub 官宣开源](skillhub-iflytek-new.md) | SkillHub 最新进展 |
| [Codex Skill：RedFox Hub](redfox-hub-review.md) | 神级 Codex Skill |
| [北邮饺子馆的 Skill](dumpling-skill.md) | 有趣的开源 Skill 案例 |
| [童锦程.skill 开源新时代](ai-opensource-new-era.md) | .skill 开源新形态 |

### CLI 与 Agent 工作流

| 文章 | 核心内容 |
| --- | --- |
| [CLI 是 Agent 的未来](cli-agent-future.md) | 命令行在 Agent 时代的核心地位 |
| [CLI、MCP、Skills、Plugin](cli-revolution.md) | CLI 生态全景解读 |
| [CLI vs Harness vs Agent](agent-cli-harness-opus.md) | Claude 生态概念辨析 |
| [Agent 工作流 8 步法](agent-workflow-8steps.md) | 从对话模式到 Agent 自动开发 |
| [Token 优化神器 RTK](rtk-token-killer.md) | 11 万 Token 压到 2 万 |

## Claude Code

从源码分析到实战技巧，Claude Code 的深度使用指南。

### 原理与源码

| 文章 | 核心内容 |
| --- | --- |
| [Claude Agent 工作原理](claude-agent-principle.md) | Agent 核心运行机制 |
| [压缩机制四阶段全解析](claude-code-compaction.md) | 压缩机制源码级分析 |
| [上下文管理：不是塞进去就行](claude-code-context-management.md) | 上下文窗口工程实践 |
| [为什么用 grep 不用 RAG](claude-code-grep-vs-rag.md) | 代码检索策略选型 |
| [源码泄露：6 个神级 Agent](claude-code-leak-agents.md) | Agent 和 Prompt 分析 |
| [源码彩蛋：18 种电子宠物](claude-code-buddy.md) | 1% Legendary 概率 |
| [从零手搓 Claude Code](learn-claude-code.md) | 35k+ Star 开源项目 |
| [手搓 Claude Code 面试实战](interviewer-learn-claude-code.md) | 两个字："就这！" |

### 实战指南

| 文章 | 核心内容 |
| --- | --- |
| [34.9k Star 最佳实践仓库](claude-code-best-practice-beta.md) | 比提示词教程更实用 |
| [Claude Code 指南 20k+ Star](claude-code-plugin-tutorial.md) | 火爆全网的指南 |
| [CLAUDE.md 怎么维护](claude-code-claudemd-guide.md) | 不只是 /init 一下 |
| [Claude Code 命令推荐](cc-mingling.md) | 常用命令速查 |
| [Warp 才是最佳终端](warp-claude-code.md) | 终端选型推荐 |
| [Claude Fable 5 代码正确性](claude-fable-5-code-correctness.md) | 如何保证 AI 写的代码是对的 |
| [Claude Mythos 模型](claude-code-mythos.md) | 最新模型体验 |
| [Opus 4.6 vs GPT 5.3 Codex](claude-opus-gpt-codex-2026.md) | 双雄同步更新对比 |

### IDE 集成

| 文章 | 核心内容 |
| --- | --- |
| [IDEA 爽用 Claude Code 终极方案](cc-gui-idea.md) | CC GUI 丝滑体验 |
| [CC GUI 让 IDEA 开箱即用](cc-gui-plugin-review.md) | 不用折腾命令行 |
| [MCP + ACP IDEA AI 升级](intellij-idea-ai-agent-review.md) | IDEA AI 能力全面升级 |

### 浏览器 Agent

| 文章 | 核心内容 |
| --- | --- |
| [Top 3 浏览器 Agent 横评](claude-code-agent-browser-automation.md) | 三大浏览器 Agent 对比 |
| [OpenCLI：从 MCP 到 Agent](opencli-review.md) | 浏览器操作越来越丝滑 |

## Codex

OpenAI Codex 系列评测与实战。

| 文章 | 核心内容 |
| --- | --- |
| [IDEA + Codex = 王炸](idea-codex.md) | Java AI Coding 终于来了 |
| [Codex 桌面版来了](codex-desktop-review.md) | 一人指挥 Agent 军团 |
| [Codex 版本大升级](codex-april-2026-deep-review.md) | Computer Use 操作 IDEA + Chrome |
| [Codex 版本大更新](codex-update-2026-04.md) | Computer Use 全栈 Agent |
| [Codex 使用技巧](codex-usage-tips.md) | 从智障到真香的进阶之路 |
| [AGENTS.md 写了 2000 行](codex-agentsmd-guide.md) | AGENTS.md 维护指南 |
| [手机版 Codex + ChatGPT](codex-chatgpt-mobile.md) | 移动端体验 |
| [GPT-5.4 + Chrome DevTools MCP](codex-gpt54-chrome-devtools-mcp.md) | 浏览器操控实战 |
| [Codex + 飞书插件](codex-feishu-plugin.md) | Markdown 秒传飞书 |
| [Codex + 天工 Skyclaw](codex-skyclaw-agent.md) | 国产 Agent 组合 |
| [Codex 终于能切国产模型了](step-3-7-flash-review.md) | 自由切换国内大模型 |

## Qoder

阿里 Qoder/QoderWork 系列评测。

| 文章 | 核心内容 |
| --- | --- |
| [Qoder 1.0 实测](qoder-1-0-quest-review.md) | Quest 独立视窗 + 跨项目并行 |
| [Qoder Experts Mode 实测](qoder-experts-mode-ceping.md) | AI 专家团协作开发 |
| [Qoder Experts 消耗测试](qoder-experts-mode-xiaohao.md) | 一天实测数据 |
| [Qoder Skills 实测](qoder-skills-shice.md) | 手搓「面试官 Skill」 |
| [Qoder Browser Use](qoderwork-chrome-review.md) | Agent 联网能力拉满 |
| [QoderWork 评测](qoderwork-review.md) | 阿里版 Claude Cowork |
| [QoderWork 深度评测](qoderwork-review2.md) | 国产 Cowork 实测 |
| [QoderWork 春节实战](qoderwork-spring-festival.md) | 出行 + 聚会一天搞定 |
| [QoderWork 存储清理](qoderwork-storage-cleanup.md) | 一键找回 151G |
| [QoderWork 日常实战](qoderwork-practice-brief.md) | 出行聚会祝福一天搞定 |

## OpenClaw 生态

从安装到多 Agent 部署，OpenClaw 全系列教程与生态平台。

### OpenClaw 核心

| 文章 | 核心内容 |
| --- | --- |
| [OpenClaw 安装：6 种方式](openclaw-install-all-method.md) | 全网最全安装指南 |
| [OpenClaw 接入飞书](openclaw-install-feishu.md) | 手把手飞书教程 |
| [OpenClaw 接入企业微信](openclaw-wecom-tutorial.md) | 十分钟跑通，无需公网 IP |
| [OpenClaw GitHub 学习路线](openclaw-github-study-path.md) | 最省时间的学习路径 |
| [OpenClaw 架构原理](openclaw-jiagou-yuanli.md) | 核心架构全解析 |
| [OpenClaw 记忆系统](openclaw-memory-system.md) | Markdown + SQLite 向量索引 |
| [OpenClaw Memory + Skills](openclaw-memory-skills-gitcode.md) | 给 PaiFlow 装上记忆和 Skills |
| [OpenClaw 多 Agent 部署](openclaw-multi-agent-member-review.md) | 1 个 OpenClaw 养多个 Agent |
| [OpenClaw 自动审核实测](openclaw-first-lobster-gitcode-review.md) | Agent 自动干活 |
| [OpenClaw 卸载面试梗](openclaw-interview-uninstall.md) | "包卸过" |

### 衍生平台

| 文章 | 核心内容 |
| --- | --- |
| [阿里 CoPaw 开源](copaw-ali.md) | 阿里版 OpenClaw |
| [Go 版 OpenClaw + 钉钉](picoclaw-dingding.md) | PicoClaw 7 天破 9000 Star |
| [Go 版 OpenClaw 实战](picoclaw-shizhan.md) | 半小时部署 PicoClaw |
| [ZeroClaw + 钉钉](zeroclaw-review.md) | ZeroClaw 重磅开源 |
| [ArkClaw 字节版](arkclaw-coding-plan-review.md) | 无需部署，开箱即用 |
| [AstronClaw 安装](astronclaw-install-guide.md) | 1 分钟上岗 |
| [AstronClaw 评测](astronclaw-review.md) | 国产 Agent 平台真香 |
| [Hermes Agent 90.2k Star](hermes-agent-context.md) | OpenClaw 最强对手 |
| [Hermes Agent 安装教程](hermes-agent-install.md) | 保姆级部署教程 |
| [网易龙虾开源](lobsterai-wangyi.md) | 国产 Agent 距离差多远 |
| [HarnessClaw 本地工作台](harnessclaw-review.md) | 本地 Agent 工作台实测 |
| [HarnessClaw + Claude Code](harnessclaw-review-cc.md) | HarnessClaw 进阶实战 |
| [OpenHarness 3.9k+ Star](openharness-review.md) | 轻松复刻 Claude Code |
| [AionUI 14k+ Star](aionui-review.md) | 多 Agent 统一 UI |
| [EvoMap Agent 系统](evomap-review.md) | 10 分钟登顶 ClawHub |
| [小米版 Claude Code](mimo-code-review.md) | 小米开源 AI Coding |

## 大模型测评

各家大模型的实测与对比。

### GLM 系列

| 文章 | 核心内容 |
| --- | --- |
| [GLM-5 实测：macOS 模型切换应用](glm-5-review.md) | 用 GLM-5 开发桌面应用 |
| [GLM-5.1 最强国产 Agent](glm-5-1-new.md) | Claude Code + GLM-5.1 实战 |
| [GLM-5.1 简历 Agent 开源](glm-5-1.md) | 爆肝两天的简历 Agent |
| [GLM-5 + GPT-5.3-Codex](glm5-paiswitch.md) | 模型切换工具升级 |
| [GLM-5 Turbo 评测](glm5-turbo-pingce.md) | 最适合 OpenClaw 的天选模型 |
| [GLM-5.1 vs DeepSeek V4](glm51-vs-deepseekv4.md) | draw.io 绘图对比 |

### DeepSeek 系列

| 文章 | 核心内容 |
| --- | --- |
| [DeepSeek V4 灰度曝光](deepseek-v4-review.md) | 国产模型继续冲 |
| [Claude Code + DeepSeek V4](deepseek-v4.md) | 国产最强 Agent 组合 |
| [DeepSeek TUI 12M](deepseek-tui-review.md) | 叫板 Claude Code |

### Kimi 系列

| 文章 | 核心内容 |
| --- | --- |
| [Kimi K2.5 多模态实测](kimi-k25-shice.md) | 追平 Gemini 3 Pro |
| [Kimi K2.6 Agent 集群](kimi-k26-agent-swarm.md) | 开源 Agent 集群 |
| [Kimi 地图轨迹动画](kimi-ok-computer-zhu-yuanzhang.md) | 人人体验编程 Agent |

### 阶跃星辰 / Step 系列

| 文章 | 核心内容 |
| --- | --- |
| [Step 3.5 Flash 上线](step-3-5-flash-2603-review.md) | 更快更强的 Agent 大脑 |
| [Step Flash 性价比](step-flash-2603-xiaohao.md) | 性价比杀疯了 |
| [StepPlan + PaiCLI](stepplan-paicli-paiagent.md) | 国产模型性价比之选 |

### 其他模型

| 文章 | 核心内容 |
| --- | --- |
| [千问 3.5 全球最强开源](qwen3-5-plus-review.md) | 阿里开源大模型登顶 |
| [文心 5.0 实测](wenxin-5-test.md) | 2.4 万亿参数原生全模态 |
| [MiniCPM-V 4.6 手机端](minicpm-v-46.md) | 手机端大模型开源 |
| [Pony Alpha 神秘模型](pony-alpha-review.md) | 模型切换工具开发 |
| [无限期免费模型评测](agnes-ai-free-model-review.md) | Token 随便用 |

## RAG 与知识检索

检索增强生成的原理、工程实践与面试考点。

| 文章 | 核心内容 |
| --- | --- |
| [Embedding 和 Rerank 是啥](embedding-rerank-rag.md) | 让 LLM 听懂人话 |
| [RAG 升级成 Agent](rag-to-agent-paicli.md) | 一天完成 RAG → Agent |
| [卡帕西 LLM Wiki 方案](karpathy-llm-wiki.md) | 不用 RAG 的替代方案 |
| [OCR + LiteParse](liteparse-ocr-review.md) | 扫描件 PDF 也能被 RAG 检索 |
| [LangGraph4J + PaiAgent](langgraph4j-paiagent.md) | Java Agent 框架实战 |

## Token 与免费 API

薅 Token 指南与免费 API 资源。

| 文章 | 核心内容 |
| --- | --- |
| [20+ 平台免费 Token 合集](free-token-api-guide.md) | 全网薅了一遍 |
| [每月 13 亿免费 Token](freellmapi-install-guide.md) | 14 家 AI 大厂 API |
| [字节 Agent Plan 性价比](agent-plan-paiagent.md) | DeepSeek V4 + Seedance2 |
| [天工 SkyClaw v1.0 免费](tiangong-skyclaw-v1-review.md) | 免费 Token 薅到爽 |
| [讯飞 MaaS + 千问 3.6 免费](xfyun-maas-qwen36-free.md) | 无限 Token 爽用 |

## AI 办公与集成

微信、飞书、企业微信等平台对接 Agent 的实战方案。

### 微信集成

| 文章 | 核心内容 |
| --- | --- |
| [一行命令把 Claude Code 装进微信](weclaw.md) | 比 OpenClaw 更自由 |
| [微信接入 OpenClaw](wechat-openclaw.md) | 个人微信官方支持 |
| [安卓微信接入 OpenClaw](wechat-openclaw-android.md) | 语音 + 图片全支持 |
| [Codex + iLink Bot 接入微信](wechat-claude-code-paicli.md) | 基于开源 Skill |

### 飞书与办公

| 文章 | 核心内容 |
| --- | --- |
| [飞书 CLI 开源实测](feishu-cli-tutorial.md) | 三个案例直呼太香 |
| [Codex 飞书插件](codex-feishu-plugin.md) | Markdown 秒传飞书 |
| [办公小浣熊 2.0](bangongxiaohuanxiong-desktop-2-review.md) | 本地文件 + 浏览器自动化 + 飞书 |
| [字节 Coding Plan](volcano-coding-plan.md) | 最强 Coding Plan 方案 |

### IDE 与桌面工具

| 文章 | 核心内容 |
| --- | --- |
| [IDEA + 飞算 AI](feisuan-javaai-agent-review.md) | Java AI 开发王炸组合 |
| [天工 Skywork 桌面版](skywork-desktop-review.md) | 国产桌面 Agent 全面拥抱 Windows |
| [BMAD Method 33k+ Star](bmad-method-33k-stars-review.md) | 敏捷开发团队搬进 AI |
| [RuoYi 全栈 AI 平台](ruoyi-ai-review.md) | 开源全栈 AI 方案 |

## 更多精选

| 文章 | 核心内容 |
| --- | --- |
| [23 个 AI Agent 工具横评](ai-tools-2026.md) | 从夯到拉，真香的就这几个 |
| [AI Infra 六大方向](ai-infra-six-keywords.md) | 超级周期必须知道 |
| [智谱学习搭子实测](chatglm-xuexidazi.md) | 学习效率翻倍 |
| [ChatGLM 学习搭子评测](chatglm-xuexidazi-review.md) | 5 分钟打开新世界 |
| [X 推荐算法开源分析](x-recommendation-algorithm.md) | 马斯克开源的宝藏设计 |
| [胡彦斌的 APP](mashangfei-review.md) | 多少程序员都弄不出来 |
| [元宝派一周体验](yuanbaopai-review.md) | 腾讯 AI + 社交的野心 |
| [Moltbook 24 小时观察](moltbook-observation.md) | 15 万 AI 在吐槽什么 |
| [Nano Banana 2 + Lovart](nano-banana-2-lovart.md) | 全网最详细 Lovart 教程 |
| [SSL 证书自动化续签](cdn-cert-auto-renew.md) | 一行 acme.sh 搞定 |
| [讯飞 Codex + GLM-5.2 世界杯](loomy-worldcup-review.md) | 顶级世界杯 AI 搭子 |
| [PaiCLI Agent 面试](paicli-agent-interview.md) | 大模型离职脱敏制度 |
| [Agent CLI 实战面试](paicli-interview-advanced.md) | 让 Agent 自己干 |
