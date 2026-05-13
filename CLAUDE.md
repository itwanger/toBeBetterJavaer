# CLAUDE.md

本文件为 Claude Code 提供项目指引，聚焦写作任务和 Skill 的使用。

## 写作任务（优先级最高）

当我要求写文章、出选题、搜集热点、或者任何内容创作相关的任务时：

### 第一步：确认当前日期
```bash
date "+%Y年%m月%d日"
```
后续所有操作以这个日期为准，不要使用训练数据中的日期。

### 第二步：判断任务类型并读取对应 Skill

**AI技术类文章**（含面试对话类）→ 读取 `.claude/skills/ai-article/SKILL.md`
触发关键词：
- "写一篇AI文章"、"AI技术文章"
- "大模型测评"、"AI工具实测"
- "GLM"、"Claude Code"、"Qoder"、"TRAE"等AI工具名
- "SpringAI"、"RAG"、"Agent"、"工作流"等AI技术词
- "搜集AI热点"、"AI选题"
- "写一篇面试文章"、"面试对话类"、"老王面试"
- "AI面试题"、"技术面试"、"面试场景"
- 涉及 AI 技术栈 + 面试/面经的组合

**求职/校招/面试类文章** → 读取 `.claude/skills/job-article/SKILL.md`
触发关键词：
- "写一篇求职文章"、"求职类文章"、"校招文章"
- "秋招"、"春招"、"校招"、"offer"、"面经"
- "薪资"、"面试"、"八股"、"简历"
- "求职建议"、"球友故事"、"学习路线"
- "搜集求职热点"、"求职选题"

**标题生成** → 读取 `.claude/skills/title-generator/SKILL.md`
触发关键词：
- "帮我起标题"、"生成标题"、"想几个标题"、"取标题"
- "爆款标题"、"打开率"、"标题优化"
- 文章写完后用户要求起标题的场景

注意：标题生成 Skill 是独立的，可以单独使用，也可以在写完文章后作为最后一步调用。

### 第三步：执行任务
- 素材参考目录：对应 Skill 的 `./references/` 或 `./sample/` 目录
- 文章输出目录：`docs/src/sidebar/itwanger/`
- 只读取对应 Skill 目录下的文件，不要跨目录读取

### 使用示例

**AI技术类（安装教程/产品评测/面试对话）：**
```
写一篇关于GLM-4.7实测的AI文章
```
```
搜集最近的AI热点，出2个选题
```
```
按照AI文章风格，写一篇Claude Code使用教程
```
```
写一篇面试文章，面试题围绕 Spring AI + Agent
```
```
帮我写一篇老王面试的文章，面试题在sucai.md里
```

**求职/校招/面试类：**
```
写一篇秋招建议的文章，素材我放到sucai.md里了
```
```
球友拿到了影石的offer，薪资数据帮我写一篇文章
```
```
帮我写一篇面经八股类的文章，面试题在sucai.md里
```
```
搜集最近的求职热点，出2个选题
```

**标题生成：**
```
帮我给这篇文章起5个标题，文章路径：docs/src/sidebar/itwanger/ai/xxx.md
```
```
文章主题是微信接入OpenClaw，帮我想几个爆款标题
```
```
写完了，帮我生成标题
```

---

## Skill 目录总览

```
.claude/skills/
├── ai-article/            # AI技术文章 Skill（安装教程/产品评测/面试对话）
│   ├── SKILL.md           # 工作流和写作规范（含面试对话类专属章节）
│   ├── biaoti.md          # 标题风格参考（含面试类标题）
│   ├── sucai.md           # 临时素材文件
│   ├── references/        # 历史文章风格参考 + 面试对话范文
│   └── scripts/           # 字数检查脚本
│
├── job-article/           # 求职/校招/面试类文章 Skill
│   ├── SKILL.md           # 工作流和写作规范
│   ├── biaoti.md          # 求职类标题风格参考
│   ├── sucai.md           # 临时素材文件
│   ├── references/        # 历史文章风格参考（4种风格）
│   │   ├── 25-26jie-quanshuo.md        # 秋招建议类
│   │   ├── gongsi-xinzi-xuexiluxian.md # 公司薪资+学习路线类
│   │   ├── leijun-jianli.md            # 面经八股类
│   │   └── offer-changbiaoti.md        # 求职观察类
│   └── scripts/           # 字数检查脚本
│
└── title-generator/       # 标题生成 Skill
    ├── SKILL.md           # 标题生成规范
    └── references/        # 高/低打开率标题参考数据
```

---

## 项目基本信息

**toBeBetterJavaer**（二哥的Java进阶之路）是一个 Java 学习和面试准备的综合文档站点，基于 VuePress 2 构建，内容全部为中文。

**文章输出目录**：`docs/src/sidebar/itwanger/`

**图片规范**：使用 CDN 地址 `cdn.paicoding.com`，不要用本地路径。

**文件命名**：小写字母加连字符，如 `my-tutorial.md`。

**写作风格**：通俗易懂、风趣幽默，像朋友聊天一样，不要教科书式的写法。

**Markdown 头部模板**：
```yaml
---
title: 文章标题
shortTitle: 短标题
description: 文章描述
tag:
  - 标签
category:
  - 分类
author: 沉默王二
date: YYYY-MM-DD
---
```
