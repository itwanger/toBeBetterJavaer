---
title: 科大讯飞官宣开源，有点猛啊。SkillHub免折腾，三分钟给AI Agent搭建技能商店。
shortTitle: 科大讯飞开源 SkillHub
description: 科大讯飞开源 SkillHub：企业级 Agent 技能注册中心，1.5K Star，三分钟私有部署，兼容 Claude Code，支持技能发布、审核、分发全生命周期管理
tag:
  - SkillHub
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-04-02
---

大家好，我是二哥呀。

科大讯飞这次干的漂亮（值得鼓掌）。

他们开源了一个叫 SkillHub 的项目，定位是“企业级 Agent Skill 商店”。说人话就是：给 AI Agent 造了一个 npm，或者说是 Docker Hub，但专门为 Skills 设计。

上线没多久，GitHub 上已经 1.5K Star 了。

![](https://files.mdnice.com/user/3903/a7bd809a-7319-41da-8e00-d448361f0df9.jpg)


我第一时间上手体验了一把，发现这玩意儿确实解决了企业内部 AI Agent Skill 共享的痛点。

并且非常适合写到简历上，出去求职也是倍加分。


![](https://files.mdnice.com/user/3903/2188dd84-b36d-49b9-b55e-bc2d30a23932.jpg)


我之前就有做这样一个实战项目的打算，看来可以基于 SkillHub 进行二开了，哈哈。科大讯飞牛的，无需多言。

>系好安全带，我们出发啦。滴滴滴😄


## 01、SkillHub 是什么？

先说定位。

SkillHub 是一个企业级、自托管的 Agent 技能注册中心。你可以把它理解成 AI Agent 世界里的 npm 或者 Docker Hub——专门用来管理 Skills。

一个 Skill 就是一个可复用的能力单元，比如“代码审查”、“文档生成”、“API 测试”这些。

![](https://cdn.paicoding.com/paicoding/df95f4f292bf183e6b3f0f20b26cab5a.jpg)

一个典型的 Skill 包括：

- **SKILL.md**：技能描述文件，定义技能的元数据和使用方法
- **提示词模板**：指导 AI 如何执行任务的指令集
- **工具定义**：技能需要调用的外部工具或 API
- **示例数据**：演示技能如何使用的样例
- **配置文件**：技能的参数设置和环境变量

很多企业有自己的业务场景，需要定制 Skills。比如“连接内部数据库”、“调用内部 API”、“处理内部文档格式”、“生成合规报告”。这些 Skills 包含敏感信息，不能放到公网上。而且团队之间需要共享，不能每个人都自己写一遍。


![](https://files.mdnice.com/user/3903/9f2ffbc5-99cb-4386-ba5b-971b53a33ee1.jpg)


这就是 SkillHub 要解决的问题：让企业能在自己服务器上搭一个私有“技能商店”，团队成员可以在里面发布、发现、下载、管理技能包。

> 开源地址：https://github.com/iflytek/skillhub
> 
> 使用文档：https://zread.ai/iflytek/skillhub

## 02、一键部署 SkillHub

我最欣赏 SkillHub 的一点是：部署门槛极低。

官方提供了一键启动脚本，只需要一行命令：

```bash
curl -fsSL https://raw.githubusercontent.com/iflytek/skillhub/main/scripts/runtime.sh | sh -s -- up
```

整个过程大概两三分钟，不需要配置数据库、不需要安装依赖、不需要修改配置文件。

**如果你想用 docker-compose 部署，也完全可以。**

你可以使用以下命令。

```bash
git clone https://github.com/iflytek/skillhub.git
cd skillhub
docker compose up -d
```

也可以使用我推荐的 GitHub 桌面版，把仓库先拉到本地。


![](https://files.mdnice.com/user/3903/533f761a-1365-4ab6-926a-9115ed36f516.png)


![](https://files.mdnice.com/user/3903/8cc3b65c-f48f-453d-afee-5dc71baeaef1.png)

然后终端进入 SkillHub 的根目录。

启动 Codex，让他帮我们读一下源码，然后引导我们怎么安装使用。

![](https://files.mdnice.com/user/3903/da2b05a4-d5a2-45bc-87b0-752bf24920a7.png)

非常简单哈，执行 `make dev-all` 就可以。


![](https://files.mdnice.com/user/3903/8d1403be-d594-4cf5-9088-8be846a5cfc9.png)


![](https://files.mdnice.com/user/3903/11888962-0ad6-49b5-b408-47086cda1c4b.png)


温馨提醒：启动前最好确认一下8080端口和3000端口有没有被占用。由于我本机有好多个容器，3000已经被占用了，所以我这里的演示就切到了 3001 端口。


![](https://files.mdnice.com/user/3903/182313a5-f5e2-46a8-9920-d408eb0303f3.png)

启动完成后，浏览器访问 `http://localhost:3000`，就能看到 SkillHub 的界面了。

默认管理员账号是 `admin`，密码是 `ChangeMe!2026`。登录后记得第一时间改密码——密码已经提醒我们了，真贴心。


![](https://files.mdnice.com/user/3903/4467ab83-a9f1-4635-8d8e-3f80cafd7264.png)

界面设计很简洁，没有花里胡哨的东西。作为一个企业内部工具，这种克制的设计风格我很喜欢——功能都在该在的位置，不会让用户迷路。

好，给自己鼓个掌吧，我们的 SkillHub 到此就部署成功了。

## 03、Skill 发布、发现、治理

SkillHub 的核心功能可以概括为四个词：发布、发现、治理、集成。

### 首先是发布

技能包的核心格式是 SKILL.md，这是一个标准化的 Markdown 文件，包含 frontmatter（元数据）和 body（内容）两部分。这种格式和 Hugo、Jekyll 等静态博客引擎一致，学习成本很低。

```yaml
---
name: code-review
version: 1.0.0
description: 代码审查技能，支持多语言
namespace: @ai-team
---

# Code Review Skill

这个技能可以帮助你进行代码审查...

## 使用方法

1. 调用方式...
2. 参数说明...
```

刚好科大讯飞提供了一系列非常实用的Skills。

>https://github.com/iflytek/iFly-Skills

![](https://files.mdnice.com/user/3903/f6156bcc-2cbb-4848-9c02-65a240e98d30.png)

我们就拿 ifly-pdf-image-ocr 来举例说明一下吧。仍然是把这个仓库clone 到本地。

![](https://files.mdnice.com/user/3903/20a10f76-6713-4821-9190-eace723971b1.jpg)

然后把 ifly-pdf-image-ocr 压缩成zip 文件。

打开SkillHub，进入【发布】。

![](https://files.mdnice.com/user/3903/459d89e6-396e-44dd-a666-ad57002add26.png)

命名空间选择 global（企业内部可以选择对应的组织），技能的完整坐标格式是 `@{namespace_slug}/{skill_slug}`，比如 `@ai-team/code-review`。这种命名方式借鉴了 npm 的 scoped package 设计，非常清晰。

不同命名空间下的技能相互隔离，互不干扰。

![](https://files.mdnice.com/user/3903/ea381067-05c5-4f9c-8f58-d04ab139bb4f.png)



然后上传我们刚刚压缩的zip包，点击【确认发布】。


![](https://files.mdnice.com/user/3903/4db3e343-6370-44f4-ae86-852c90a5e7c3.jpg)

OK，已经上传成功了。

发布技能可以通过 Web 界面上传，也可以通过 CLI 工具。对于需要集成到 CI/CD 流程的场景，CLI 方式更合适。


![](https://files.mdnice.com/user/3903/59812aa0-5924-4832-a954-870f86529738.png)



### 其次是发现

SkillHub 内置了全文搜索功能，基于 PostgreSQL 实现。可以按关键词搜索技能，也可以按命名空间、下载量、评分、时间等维度筛选。


![](https://files.mdnice.com/user/3903/a91fe020-2ae5-4e3b-a56f-2421e0689ae3.jpg)


搜索结果会显示技能的基本信息：名称、描述、版本、作者、下载量、评分。

点击进入详情页，可以看到版本历史、依赖关系、README 预览，以及收藏、评分等互动功能。


![](https://files.mdnice.com/user/3903/1d4406dc-3718-44eb-b4d4-5ab77bc81f1a.jpg)


![](https://files.mdnice.com/user/3903/8744ec7b-ecc5-4e98-9f02-bb90b127d93f.jpg)


这个体验和 npm 的包详情页很像，用过 npm 的同学应该会很熟悉。

### 再次是治理

企业内部需要管控技能质量，不能什么人都随便发布。

发布时会对一些必要的密钥进行校验，防止重要信息泄露。

![](https://files.mdnice.com/user/3903/f3df7483-aabc-4e3a-9a9f-4d9e6d6f1368.png)


另外，SkillHub 还提供了完整的审核工作流：

开发者提交技能后，技能状态是“审核中”，我这里拿另外一个账号来发布一个新技能。


![](https://files.mdnice.com/user/3903/b6816a1a-e46d-4c20-9808-e7829f08b122.jpg)


管理员进入审核队列，可以看到后台异步执行的安全扫描报告——包括代码质量检查、安全漏洞扫描等。


![](https://files.mdnice.com/user/3903/3723b940-b521-443e-9227-fa08bb11c1b6.jpg)


![](https://files.mdnice.com/user/3903/29d5e551-54e9-4524-b6a7-f564fb50338c.jpg)


审核通过后，技能状态变为“已发布”，其他用户才能看到和下载。

这个审核机制对企业来说太重要了。没有它，内部技能库很快就会变成垃圾堆，充斥着各种质量参差不齐的技能包，最终无人敢用。


### 最后是集成

SkillHub 兼容 ClawHub CLI 协议。这意味着通过 SkillHub 安装的技能，可以被 Claude Code、OpenClaw 等 AI Agent 直接发现和使用。

你可以在 SkillHub 里生成一个作用域 Token（Scoped Token），然后用这个 Token 配置 AI 客户端。


![](https://files.mdnice.com/user/3903/ad788d81-8e79-4f3e-b8eb-b2d17637de75.png)


![](https://files.mdnice.com/user/3903/ac4b951e-e5d5-4c09-85ff-d76f7b32b78d.png)


之后 Agent 就能自动识别 SkillHub 里的技能包，就像使用官方 Skills 一样方便。

## 04、安全扫描机制详解

企业内部对安全的要求通常很高，SkillHub 的安全扫描机制值得单独说说。

扫描流程是这样的：


![](https://files.mdnice.com/user/3903/4c513ae0-0999-42a0-99e5-f41e9f91292e.jpg)


技能包上传后，系统会自动解压并进入审核队列。后台有一个独立的扫描服务，会对技能包进行多维度的安全检查。

**第一层：结构检查。**

验证 SKILL.md 是否存在、frontmatter 是否合法、必填字段是否完整。如果结构有问题，直接拒绝，不会进入后续扫描。

**第二层：代码质量检查。**

扫描技能包中的脚本文件，检查代码风格、潜在 bug、复杂度等。这一层用的是静态分析工具，不会实际执行代码，所以速度很快。

**第三层：安全漏洞扫描。**

检查是否存在已知漏洞模式，比如命令注入风险、路径穿越风险、敏感信息硬编码等。如果发现问题，会在报告中标注风险等级（高/中/低）。


![](https://files.mdnice.com/user/3903/eb5733ce-070a-44e8-a361-b97f1a6fd54e.png)


**第四层：依赖安全检查。**

如果技能包声明了依赖，会递归检查依赖链中是否存在已知漏洞。这一层依赖的是漏洞数据库，类似 npm audit 的机制。

扫描完成后，管理员可以在审核界面看到完整的报告。报告会列出所有发现的问题，按严重程度排序，并给出修复建议。管理员可以根据报告决定是通过、驳回还是要求修改。


![](https://files.mdnice.com/user/3903/ce1867f9-615a-4c4c-b4f5-0e6434523002.png)


这套机制对企业来说非常实用。

## 05、CLI 工具使用指南

SkillHub 提供了 ClawHub CLI 协议兼容层，现有工具可无缝迁移。

![](https://files.mdnice.com/user/3903/0a1a1e8f-da8c-4b10-b572-25a6efd7390f.png)

这里给大家解释一下。

SkillHub 是服务端，本质上是一个 Skill 注册中心，用来存放、搜索、审核、下载和发布技能。

clawhub 是一个命令行客户端，也就是我们说的 CLI 工具。

clawhub 这个 CLI，可以去连接我们本地（生产环境）部署的这个 SkillHub，然后完成技能的搜索、查看和安装。

在进行 CLI 操作之前，我们先通过下面这行命令测一下 SkillHub 暴露的兼容发现端点。

```
curl http://localhost:8080/.well-known/clawhub.json
```

![](https://files.mdnice.com/user/3903/ace7d88e-bdd8-49f6-a65a-b001581c0a4f.png)

如果返回的是 `{"apiBase":"/api/v1"}`，就说明这个 SkillHub 实例可以被 clawhub 当成一个兼容 registry 来使用。

接下来回到终端，把 clawhub 指向我们之前跑起来的 SkillHub。

```bash
export CLAWHUB_REGISTRY=http://localhost:8080
```

然后用刚才在 Web 里创建的 token 登录。

```
npx clawhub login --token '你刚复制的token'
```

登录完成以后，通过 `npx clawhub whoami` 先确认一下当前是谁。


![](https://files.mdnice.com/user/3903/f13a9cd7-2dfa-4374-aa21-14e026b63765.png)

接下来，我演示几个最常见的动作。第一步是搜索技能。比如我已经上传了一个 OCR 相关的 skill，我可以直接搜索。

```
npx clawhub search ifly
```


![](https://files.mdnice.com/user/3903/e152c54b-c917-4fa5-a2ff-8b2c661358c4.png)

搜索到以后，我可以继续查看这个技能的详细信息。

```
npx clawhub inspect ifly-pdf-image-ocr
```


![](https://files.mdnice.com/user/3903/6c6d3672-716e-49e1-8438-3e670603ff58.png)

如果 Skill 是在某个团队 namespace 下面，那 CLI 里会用 namespace--slug 这种格式，比如：

```
npx clawhub inspect ocr-team--ifly-pdf-image-ocr
```

当然了。

我们上面只是为了说明CLI、SkillHub和clawhub之间的关系。

明白原理之后，我们其实可以不要上面这些步骤，直接这样一行命令就OK了。

```
npx clawhub install ifly-pdf-image-ocr --registry http://localhost:3001
```

![](https://files.mdnice.com/user/3903/664fae53-f2c3-45b3-ae9f-80d5ea814492.jpg)


或者一个提示词就OK了。

```
阅读 http://localhost:3001/space/global/ifly-pdf-image-ocr，并按照说明完成 SkillHub Skills Registry 的配置
```

Claude Code 和 Codex 都可以哦。

![](https://files.mdnice.com/user/3903/69044bc5-80f4-4e47-b31e-d3aa61d45463.png)


![](https://files.mdnice.com/user/3903/4d4cca47-7474-4be0-aca8-1bb4ce87490c.png)

OK，Codex 的 Skills 中心已经可以看到我们刚刚安装好了。


![](https://files.mdnice.com/user/3903/1d48d0fd-f0d9-4fba-91dc-b8086ac1b829.png)

然后我们来试一把。

>提示词：把这份文件做ocr，输出markdown


![](https://files.mdnice.com/user/3903/98a79d4c-34f9-43ec-95a0-6b8975dd40f4.png)

结果已经出来了。

![](https://files.mdnice.com/user/3903/65069500-63ec-4641-bbe8-ca6cd1790c89.png)

完美，到此为止，我们算是用SkillHub做了一个完整的Skills发布、校审、安装、使用。


## 06、SkillHub 技术栈深度解析

翻了一下源码，SkillHub 的技术选型很扎实。

![](https://files.mdnice.com/user/3903/4629e7dd-7067-403c-922e-bf22ba0c8023.png)

- 后端：Java 21 + Spring Boot 3.x
- 前端：React 19 + TypeScript
- 存储层：PostgreSQL + Redis + S3/MinIO

这是一个经典的存储架构组合：

- **PostgreSQL**：存储用户、技能、命名空间等核心数据。全文搜索用的是 PostgreSQL 内置的 tsvector，不需要额外引入 Elasticsearch
- **Redis**：存储会话、热点数据、分布式锁。技能下载计数器也用 Redis 实现，避免每次请求都写数据库
- **S3/MinIO**：存技能包文件。MinIO 是 S3 兼容的私有化方案，数据完全在自己的服务器上

SkillHub 还设计了存储插件接口，支持多种存储后端：

```java
public interface StoragePlugin {
    void upload(String key, InputStream data);
    InputStream download(String key);
    void delete(String key);
    boolean exists(String key);
}
```

内置插件支持：本地文件系统、MinIO、AWS S3、阿里云 OSS、腾讯云 COS。企业可以根据自己的基础设施选择合适的存储后端。


## 07、如何写到简历上？

如果你在企业里部署和使用过 SkillHub，可以这样写。

项目名称：企业级 AI 技能管理平台（基于 SkillHub 私有部署）

项目简介：搭建企业内部的 AI Agent 技能注册中心，实现技能的发布、审核、分发全生命周期管理，支持 Claude Code、OpenClaw 等 AI Agent 直接调用。

核心职责：

- 基于 PostgreSQL Full-Text Search + RBAC 权限模型设计 Skill 搜索与可见体系，可按命名空间/下载量/评分/时间等多维筛选。
- 接入 Redis Stream + Scanner Adapter 的安全扫描链路，将 Skill 发布流程扩展为“上传校验 -> 安全扫描 -> 人工审核 -> 发布入库”，确保企业私有技能分发的安全合规
- 基于 Docker Compose + Kubernetes + GitHub Actions + Prometheus/Grafana 实现本地开发、一键部署、容器化交付和可观测监控，支持 amd64/arm64 双架构镜像
- 补齐 172 个前端单测、23 个 E2E 用例、164 个 Java 测试文件。


## ending

科大讯飞这次开源 SkillHub，是站在了“企业级”这个细分赛道上。

企业需要什么？私有部署、权限管理、审核流程、数据主权。这些需求，公有平台满足不了，但 SkillHub 满足得了。

**从技术角度看，SkillHub 有几个值得学习的设计。**


![](https://files.mdnice.com/user/3903/28f4930a-c0bf-4053-bbd6-5eb33892af56.jpg)


一是“注册中心”模式的运用。npm 证明了注册中心模式在软件分发上的成功，SkillHub 把这个模式引入 AI Agent 领域。

二是“私有部署优先”的定位。大部分 AI 工具都是 SaaS 模式，数据存在厂商服务器上。SkillHub 从一开始就设计为私有部署。

三是“CLI 优先”的设计理念。Web 界面好看，但 CLI 才是自动化的基础。SkillHub 提供了完整的 CLI 工具，可以无缝融入 CI/CD 流程。

【**好的开源项目，不是功能最多的，而是最懂用户痛点的**。】

SkillHub 已经 1.5K Star 了，如果你也在做企业 AI 平台，建议去看一眼源码，一定能给你很多很多启发。


> GitHub 地址：https://github.com/iflytek/skillhub

觉得有用的话，点个 Star，鼓励一下国产开源。

我们下期见！
