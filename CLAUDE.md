# CLAUDE.md

## 项目概况

主要工作是写公众号文章，和AI有关，Agent有关，可以是面试题、Agent工具测评。

## 作者与项目

- 作者：沉默王二（二哥），程序员，GitHub：https://github.com/itwanger
- 网站：javabetter.cn（本仓库的部署站点）、paicoding.com（技术派社区）
- 实战项目源码都在本地 `/Users/itwanger/Documents/GitHub/` 下，文章中涉及项目细节时直接读源码，不要凭空编造：
  - 技术派（`paicoding`）— 前后端分离的技术社区系统，即 paicoding.com
  - PaiCLI（`paicli`）— 对标 Claude Code 的 Java Agent 命令行工具
  - PaiAgent（`PaiAgent-one`）— LangGraph4j + Spring AI 的工作流编排平台
  - 派聪明（`PaiSmart`）— 基于 ES 混合搜索的 RAG 知识库
  - PaiFlow（`PaiFlow`）— 可视化 AI Agent 工作流编排平台，类 Dify/Coze/n8n
  - PmHub（`pmhub`）— 基于 SpringCloud & LLM 的智能项目管理系统

## 目录地图

- `docs/src/sidebar/itwanger/ai/` — AI 类文章
- `docs/src/sidebar/itwanger/qiuzhi/` — 求职/面试类文章
- `docs/src/ai/video/` — AI Agent 面试题的逐题答案文章（兼作视频口播素材）

## 常用命令

- 写作前先运行 `date "+%Y年%m月%d日"` 确认日期

## 写作工作流

1. 写 AI 文章 → ai-article Skill；口播稿 → video-script Skill
2. 抓取微信公众号等需登录/动态渲染页面：用 Chrome DevTools MCP 或 web-access Skill，不用 WebFetch

## 表达原则（所有文字输出生效，包括回复用户）

- 不造比喻。只用日常生活里大家都说过的比喻，自己造的一律换成直白描述。”读起来像打点滴”是反面教材，直接说”太碎了”
- 简单的话不要说复杂。”我结合这次写文的实际体验说几个观察”就是把”我说几点感受”绕了一圈。能一句话说清楚的，不要两句话绕
- 全角双引号。正文（含文章、帖子、评论等一切非代码文本）禁用半角双引号 `”`，一律用全角双引号 “”；代码块和行内代码不受此限制

## 约束

- 文件名：小写字母 + 连字符，如 `my-tutorial.md`
- 涉及到技术部分一定要严谨，用书面用语，语义要准确无误
- 模型相关数据以当前一代（Opus 4.8 / GPT-5.6）为准，禁止引用过时模型数据
