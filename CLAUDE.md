# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 写作任务（优先级最高）

当我要求写文章、出选题、搜集热点、或者任何内容创作相关的任务时：

### 第一步：确认当前日期
```bash
date "+%Y年%m月%d日"
```
后续所有操作以这个日期为准，不要使用训练数据中的日期。

### 第二步：判断文章类型并读取对应 Skill

**AI技术类文章** → 读取 `.claude/skills/ai-article/SKILL.md`
触发关键词：
- "写一篇AI文章"、"AI技术文章"
- "大模型测评"、"AI工具实测"
- "GLM"、"Claude Code"、"Qoder"、"Cursor"、"TRAE"等AI工具名
- "SpringAI"、"RAG"、"Agent"、"工作流"等AI技术词
- "搜集AI热点"、"AI选题"

**求职类文章** → 读取 `.claude/skills/qiuzhi/SKILL.md`
触发关键词：
- "写一篇求职文章"、"求职类文章"
- "薪资"、"年终奖"、"offer"
- "公司招聘"、"岗位分析"
- "面试"、"简历"、"实习"、"春招"、"秋招"、"暑期实习"
- "搜集求职热点"、"求职选题"

**如果不确定类型**，直接问我："这篇文章是AI技术类还是求职类？"

### 第三步：执行任务
- 素材参考目录：对应 Skill 的 `./sample/` 目录
- 文章输出目录：`docs/src/sidebar/itwanger/`
- 只读取对应 Skill 目录下的文件，不要跨目录读取

### 使用示例

**AI技术类：**
```
写一篇关于GLM-4.7实测的AI文章
```
```
搜集最近的AI热点，出2个选题
```
```
按照AI文章风格，写一篇Claude Code使用教程
```

**求职类：**
```
写一篇关于字节年终奖的求职文章
```
```
搜集最近的求职热点，出2个选题
```
```
按照求职文章风格，写一篇蚂蚁招聘岗位分析
```

**混合类型（需要指定）：**
```
写一篇关于智谱招聘的文章，用求职风格
```
```
写一篇关于AI岗位薪资的文章，用求职风格
```

---

## Project Overview

**toBeBetterJavaer** (二哥的Java进阶之路) is a comprehensive Java learning guide and interview preparation resource, built as a static documentation website using VuePress 2. The site contains 595+ Markdown files covering Java fundamentals, enterprise development, databases, distributed systems, and interview preparation - all in Chinese.

**Tech Stack:**
- VuePress 2.0.0-rc.14 with vuepress-theme-hope 2.0.0-rc.52
- Vite as the build tool
- Vue 3.4.31
- TypeScript (ES2022 target)
- Package manager: **pnpm** (required)

## Common Development Commands

All commands must be run from the `docs/` directory:
```bash
# Install dependencies (run from docs/ directory)
pnpm install

# Start development server (with hot reload)
pnpm docs:dev

# Start dev server with cache cleared (use if you see stale content)
pnpm docs:clean-dev

# Build for production
pnpm docs:build

# Update VuePress packages
pnpm docs:update-package
```

**Note:** The development server typically runs on `http://localhost:8080` by default.

## Architecture & Structure

### Directory Layout
```
toBeBetterJavaer/
├── docs/                          # Main documentation directory
│   ├── src/                       # Source content (595+ MD files)
│   │   ├── .vuepress/             # VuePress configuration
│   │   │   ├── config.ts          # Main site configuration
│   │   │   ├── theme.ts           # Theme settings
│   │   │   ├── navbar.ts          # Top navigation bar
│   │   │   ├── sidebar.ts         # Sidebar structure
│   │   │   ├── client.ts          # Client-side enhancements
│   │   │   ├── components/        # Custom Vue components
│   │   │   ├── public/            # Static assets (images, icons)
│   │   │   └── styles/            # Custom SCSS styles
│   │   │
│   │   ├── [Content Directories]  # 47 topic directories (see below)
│   │   ├── blog.md                # Blog page
│   │   ├── home.md                # Home page
│   │   └── README.md
│   │
│   ├── package.json               # NPM scripts
│   ├── pnpm-lock.yaml
│   └── tsconfig.json              # TypeScript config
├── .claude/                       # Claude Code Skills
│   └── skills/
│       ├── ai-article/            # AI技术文章 Skill
│       │   ├── SKILL.md
│       │   └── sample/            # AI技术类素材
│       └── qiuzhi/                # 求职类文章 Skill
│           ├── SKILL.md
│           └── sample/            # 求职类素材
└── images/                        # Additional image assets
```

### Content Organization

The 47 main content directories are organized into these categories:

**Java Core:**
- `overview/` - Introduction & environment setup
- `basic-grammar/` - Syntax fundamentals
- `array/`, `string/` - Data types
- `oo/` - Object-oriented programming
- `collection/` - Collections framework
- `exception/` - Exception handling
- `io/` - Input/Output streams

**Advanced Java:**
- `thread/` - Multithreading & concurrency (37 files)
- `jvm/` - Java Virtual Machine (31 files)
- `java8/` - Java 8+ features (Lambda, Stream, Optional)
- `nio/` - Non-blocking I/O
- `socket/` - Network programming

**Enterprise Development:**
- `springboot/` - Spring Boot tutorials (26 files)
- `mybatis/` - Database ORM
- `maven/` - Build tool
- `git/` - Version control

**Databases:**
- `mysql/` - MySQL tutorials (23 files)
- `redis/` - Caching
- `mongodb/` - NoSQL

**Distributed Systems:**
- `mq/` - Message queues (RabbitMQ, Kafka)
- `elasticsearch/` - Search engine
- `zookeeper/` - Distributed coordination
- `microservice/` - Microservices
- `netty/` - Network framework

**Interview & Career:**
- `interview/` - Interview Q&A (16 files)
- `mianjing/` - Interview experiences
- `cityselect/` - Company recommendations by city (15 files)
- `sidebar/sanfene/` - "面渣逆袭" (Mianza Nixi) interview prep series

**Learning Resources:**
- `xuexiluxian/` - Learning roadmaps (19 files)
- `pdf/` - PDF downloads
- `xuexijianyi/` - Study advice
- `cs/` - Computer science basics

**Special Sections:**
- `zhishixingqiu/` - Premium content (paid membership)
- `sidebar/itwanger/` - Author's articles (二哥原创文章)
- `sidebar/sjtu/` - Shanghai Jiao Tong University survival guide
- `szjy/` - Website building tutorials

### Configuration Files

**Key Config Files:**
- `docs/src/.vuepress/config.ts` - Main site config (title, description, head meta, analytics)
- `docs/src/.vuepress/theme.ts` - Theme settings (PWA, comments, search, encryption)
- `docs/src/.vuepress/navbar.ts` - Top navigation menu structure
- `docs/src/.vuepress/sidebar.ts` - Sidebar structure (auto-generated from directories)
- `docs/tsconfig.json` - TypeScript configuration (ES2022, NodeNext modules)

**Theme Features Enabled:**
- Dark mode switch
- PWA support (offline capability)
- Blog functionality
- Giscus comments integration
- DocSearch (Algolia) for site search
- Encryption for premium content
- Article metadata display
- Social media links (Zhihu, CSDN, GitHub, Gitee)

### Markdown Front Matter

Content files use front matter for metadata:
```yaml
---
title: Page Title
shortTitle: Short Title
description: Page description for SEO
tag:
  - AI
  - 大模型
category:
  - 技术文章
author: 二哥
date: 2026-01-21
---
```

### Supported Markdown Features

- Code blocks with syntax highlighting
- Mathematical formulas (MathJax)
- PlantUML diagrams
- Tabs component
- Task lists
- Image lazy loading
- Custom Vue components

## Development Workflow

### Adding/Editing Content

1. Create or edit Markdown files in appropriate directories under `docs/src/`
2. Add front matter with relevant metadata
3. Test locally: `pnpm docs:dev` (from `docs/` directory)
4. View changes at `http://localhost:8080`

### Building & Deployment
```bash
# From docs/ directory
pnpm docs:build

# Output is in docs/dist/
# Deploy by uploading dist/ to Nginx static directory
```

The deployment process is manual:
1. Build: `pnpm docs:build`
2. Compress: `zip -r dist.zip dist`
3. Upload to server Nginx directory
4. Extract: `unzip dist.zip`

### Navigation Structure

**Top Navbar** (configured in `navbar.ts`):
- 博客 (Blog)
- 进阶之路 (Learning Path)
- 知识星球 (Knowledge Planet - premium content)
- 学习路线 (Learning Roadmaps)
- 面渣逆袭 (Interview Prep)
- 珍藏资源 (Resources - PDFs, articles, etc.)

**Sidebars** are auto-generated from the directory structure in `sidebar.ts`.

## Important Notes

### Content Guidelines

- All content is in **Chinese** (Simplified)
- This is an educational resource focused on **Java learning and interview preparation**
- Writing style should be "通俗易懂、风趣幽默" (easy to understand, humorous)
- Target audience: Java learners from beginners to experienced developers

### Technical Considerations

- **Image Assets:** Use CDN URLs (`cdn.paicoding.com`) for images to reduce bundle size
- **Analytics:** Baidu Analytics integration is configured
- **Search:** Algolia DocSearch is integrated for site search
- **Premium Content:** Some sections (like `zhishixingqiu/`) use encryption
- **Performance:** PWA enabled for offline access

### File Naming

- Use lowercase with hyphens: `my-tutorial.md`
- Avoid special characters and spaces
- Keep names descriptive but concise

### Testing

There are **no automated tests** in this project. Testing is manual:
1. Run dev server
2. Visually inspect pages
3. Check links and rendering
4. Verify navigation works correctly

### TypeScript Configuration

- Target: ES2022
- Module: NodeNext
- Only `.vuepress/` directory files are compiled
- Content files remain as Markdown

## Key Dependencies

**Core:**
- vuepress: 2.0.0-rc.14
- vuepress-theme-hope: 2.0.0-rc.52
- vue: 3.4.31
- @vuepress/bundler-vite: 2.0.0-rc.14

**Plugins:**
- @vuepress/plugin-docsearch: 2.0.0-rc.40
- @vuepress/plugin-pwa: 2.0.0-rc.40
- mathjax-full: ^3.2.2

## Common Issues

**Stale Content After Changes:**
- Run `pnpm docs:clean-dev` instead of `pnpm docs:dev`
- Or manually delete `.cache` and `.temp` directories

**Build Errors:**
- Ensure you're using **pnpm**, not npm or yarn
- Delete `node_modules` and run `pnpm install`
- Check Node.js version compatibility

**Missing Images:**
- Use CDN URLs when possible
- Local images go in `docs/src/.vuepress/public/`

**Navigation Not Updating:**
- Check `navbar.ts` for top menu items
- Check `sidebar.ts` for sidebar structure
- Restart dev server after config changes