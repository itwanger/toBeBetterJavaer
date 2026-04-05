---
title: SkillHub，官宣开源！
shortTitle: SkillHub官宣开源
description: 科大讯飞开源 SkillHub：给 AI Agent 造了一个 npm，三分钟私有部署，Skills 发布、审核、分发全流程实测。
tag:
  - SkillHub
  - Agent
  - Skills
category:
  - AI
author: 沉默王二
date: 2026-04-03
---

大家好，我是二哥呀。

有个问题困扰了我好久。

团队里每个人都在写 Skills，却没有一个地方统一管理。你写了个代码审查 Skill，他写了个文档生成 Skill，但没办法共享。

科大讯飞最近开源了一个叫 SkillHub 的项目，专门解这个痛点。上线以来 GitHub 已经 1.5K Star，我上手用了一把，确实戳到了点子上。

![](https://cdn.paicoding.com/paicoding/1de96c7647a5c1495dcb6a88bf7bb4ec.jpg)

## 01、SkillHub 究竟是什么

一句话说清楚：SkillHub 是给 AI Agent 技能包用的私有 npm。

你用 npm 管 JavaScript 包，用 Docker Hub 管容器镜像，用 SkillHub 管 Skills。逻辑完全一致，只是对象换成了 Skill。

团队内部有哪些 Skills？哪个版本是最新的？谁维护的？这个 Skill 安不安全？SkillHub 都能管理。

![](https://cdn.paicoding.com/paicoding/df95f4f292bf183e6b3f0f20b26cab5a.jpg)

和公有平台最大的不同是：SkillHub 完全自托管。你的 Skills 全部存在自己的服务器上，不上传到第三方，数据主权在自己手里。对于有保密需求的企业来说，这一点是硬性要求，没有商量的余地。

> 开源地址：https://github.com/iflytek/skillhub

## 02、三分钟把它跑起来

部署是我第一个关注的点。如果部署门槛高，再好的工具用起来也不顺手。

SkillHub 的部署体验给了我惊喜。把仓库拉下来，一行命令搞定：

```bash
git clone https://github.com/iflytek/skillhub.git
cd skillhub
make dev-all
```

或者用官方提供的一键脚本：

```bash
curl -fsSL https://raw.githubusercontent.com/iflytek/skillhub/main/scripts/runtime.sh | sh -s -- up
```

不需要手动配数据库，不需要改配置文件，Docker 会把所有依赖都拉起来。整个过程两三分钟，喝杯咖啡回来就好了。

启动之前有个小坑值得提醒：8080 和 3000 这两个端口得提前确认没被占用。我这台机器就遇到了，把端口改成 3001 就解决了。

![](https://cdn.paicoding.com/paicoding/e0b4bf0c245a5910ecbe40b636eba0da.png)

浏览器打开 `http://localhost:3001`，看到这个界面就说明跑起来了。

![](https://cdn.paicoding.com/paicoding/e498aa94bcd405021acb0b4e771eda66.png)

默认管理员账号 `admin`，密码 `ChangeMe!2026`，进去第一件事改密码——已经贴心地提醒你了。

我个人喜欢让 Codex 来读一下源码，再指导我完成安装，这样比看文档效率高多了。

![](https://cdn.paicoding.com/paicoding/cd9561678a21be35f2bdf6754c9456b6.png)

执行 `make dev-all` 就可以了，Codex 给的答案很准。

![](https://cdn.paicoding.com/paicoding/90e58c6a83b920bdabffec85609ac292.png)

![](https://cdn.paicoding.com/paicoding/cff47a0f83f4119ec456a1fc991a84a0.png)

## 03、发布一个 Skill 有多简单

SkillHub 里的 Skill 是以 zip 包形式上传的，核心文件是一个 SKILL.md，用 frontmatter 描述元数据：

```yaml
---
name: code-review
version: 1.0.0
description: 代码审查技能，支持多语言
namespace: @ai-team
---
```

科大讯飞同时开源了一批官方 Skills，放在另一个仓库：

> https://github.com/iflytek/iFly-Skills

![](https://cdn.paicoding.com/paicoding/7522c7b29db5c0ca16cca932f66ba95b.png)

里面有 OCR、文档处理、代码分析等十几个现成的技能包，拿来就能用，质量有保证。

我用 `ifly-pdf-image-ocr` 这个 Skill 来演示整个发布流程。把仓库 clone 下来，把这个 Skill 目录压成 zip，然后在 SkillHub 里打开发布页面。

命名空间选 global，上传 zip 包，点确认发布。

![](https://cdn.paicoding.com/paicoding/f548d8fdd2045f8b9e7912d07736ae57.jpg)

就这么简单。命名空间的设计参考了 npm 的 scoped package，技能的完整坐标是 `@{namespace_slug}/{skill_slug}`，比如 `@ai-team/code-review`。不同命名空间之间相互隔离，企业可以给不同部门分配不同的命名空间。

除了 Web 界面，还可以通过 CLI 发布，适合集成进 CI/CD 流程。

![](https://cdn.paicoding.com/paicoding/da9ace1835c9b1aadfb06b56afc62270.png)

## 04、审核机制是企业使用的关键

发布是开始，审核才是重点。

企业环境里不能什么人都能随便往技能库里塞东西。没有审核，内部 Skills 库很快就会变成垃圾堆，质量参差不齐，最终没人敢用。

SkillHub 的审核流程是这样的：开发者提交 Skill 后，状态变为"审核中"。后台会自动执行一套安全扫描，检查完成后，管理员能在审核队列里看到完整的扫描报告。

![](https://cdn.paicoding.com/paicoding/6bcd463e88a8b5d683f61ca1489f2d7f.jpg)

安全扫描分四层：

第一层，结构检查。SKILL.md 存不存在、frontmatter 格式对不对、必填字段有没有。有问题直接挡住，不进后续流程。

第二层，代码质量扫描。用静态分析工具检查脚本文件，看代码风格和潜在 bug，不实际执行代码，速度很快。

第三层，安全漏洞检测。查命令注入、路径穿越、硬编码敏感信息这类高危模式，发现问题标注风险等级（高/中/低）。

第四层，依赖链检查。如果 Skill 声明了依赖，递归扫描依赖链里有没有已知漏洞，逻辑和 `npm audit` 类似。

![](https://cdn.paicoding.com/paicoding/156f690a14486a1758380aa2d0926a5f.png)

报告出来后，管理员可以看到所有发现的问题，按严重程度排序，每个问题都有修复建议。管理员根据报告决定通过、驳回还是要求修改。

![](https://cdn.paicoding.com/paicoding/ac8c4cfc3549f0fa20fc0b366d6a97de.png)

发布时还会对密钥信息做校验，防止敏感数据被误提交。

![](https://cdn.paicoding.com/paicoding/ae3b0ce9fb4aebcdfd753be69f0dcba7.png)

## 05、搜索和发现体验

Skill 发布好了，其他人怎么找到它？

SkillHub 内置了全文搜索，基于 PostgreSQL 的 tsvector 实现，不需要额外装 Elasticsearch，部署成本低很多。可以按关键词搜索，也可以按命名空间、下载量、评分、时间筛选。

![](https://cdn.paicoding.com/paicoding/a8d9faa5d6b19aa1a102d5655c4295a6.jpg)

每个 Skill 的详情页包括版本历史、依赖关系、README 预览，还有收藏和评分功能。和 npm 的包详情页体验很像。

![](https://cdn.paicoding.com/paicoding/d7fb091597e380406df390fc00a8d423.jpg)

![](https://cdn.paicoding.com/paicoding/e24ccdfcca7022f1ebc5aef19a74a4ef.jpg)

## 06、团队权限管理的核心设计

在企业环境里，不同部门的 Skills 需要隔离。前端团队的 Skill 不该随意被后端团队覆盖，A 项目组的技能包不该和 B 项目组混在一个池子里。

SkillHub 的命名空间设计解决了这个问题。

创建命名空间的操作很简单，在管理后台几步完成：

```
@ai-team        → AI 基础设施团队的技能包
@frontend       → 前端组维护的工具技能
@backend        → 后端服务相关技能
@infra          → 运维和 CI/CD 技能
```

每个命名空间可以设置成员角色：**管理员**可以审核 Skill、管理成员；**普通成员**只能发布 Skill、等待审核。角色权限明确，不会出现互相干扰的情况。

命名空间还支持可见性控制。设成私有的命名空间，只有成员能搜索和安装里面的 Skills；公开的命名空间，任何登录用户都能浏览。这个设计在大型组织里非常有用——核心团队的技能包可以只对内部开放，通用工具包向全公司开放。

## 07、接入 Claude Code 只需一行提示词

Skills 找到了，怎么让 AI Agent 用起来？

SkillHub 兼容 ClawHub CLI 协议，这意味着 Claude Code、OpenClaw 等工具可以直接识别 SkillHub 里的技能包。

先在 SkillHub 里生成一个作用域 Token：

![](https://cdn.paicoding.com/paicoding/b78babd0211540250febc38e5d85502a.png)

![](https://cdn.paicoding.com/paicoding/3f829c7a592313fb467ba9e8a03d8030.png)

然后有两种方式接入 Agent。

一种是用 CLI：

```bash
export CLAWHUB_REGISTRY=http://localhost:8080
npx clawhub login --token '你的token'
npx clawhub install ifly-pdf-image-ocr --registry http://localhost:3001
```

另一种更省事——直接扔一行提示词给 Claude Code 或 Codex：

```
阅读 http://localhost:3001/space/global/ifly-pdf-image-ocr，并按照说明完成 SkillHub Skills Registry 的配置
```

Agent 读完文档就自己配好了，不需要你手动操作任何东西。

![](https://cdn.paicoding.com/paicoding/3e10f7ea8456ca57e984a76a50d502ce.png)

![](https://cdn.paicoding.com/paicoding/bcbc3cdf821e1070b9c1441bcfc78bc5.png)

Codex 的 Skills 中心里能看到刚安装好的技能包。我用 OCR Skill 试了一把：

> 提示词：把这份文件做 ocr，输出 markdown

结果出来了，干净利落。

![](https://cdn.paicoding.com/paicoding/9b330c9a0565777b3d5fffbf0d4f59d3.png)

一个完整的 Skills 发布 → 审核 → 安装 → 使用闭环，跑通了。除了 Claude Code，OpenClaw、AstronClaw、Loomy 这些 Agent 工具也都支持，只要兼容 ClawHub CLI 协议就行。

## 08、技术选型值得学一下

翻了翻 SkillHub 的源码，技术选型很扎实。

![](https://cdn.paicoding.com/paicoding/e0f3a787c5eb7d60fc578dfbbd0c08c3.png)

后端 Java 21 + Spring Boot 3.x，前端 React 19 + TypeScript，存储层 PostgreSQL + Redis + MinIO。

存储层的设计有意思。PostgreSQL 负责核心业务数据，全文搜索用 tsvector，不依赖外部搜索引擎。Redis 存会话和热点数据，下载计数也用 Redis 做，避免高频写操作打垮数据库。MinIO 存技能包文件，S3 兼容，数据完全在自己服务器上。

SkillHub 还做了存储插件接口，接口定义很干净：

```java
public interface StoragePlugin {
    void upload(String key, InputStream data);
    InputStream download(String key);
    void delete(String key);
    boolean exists(String key);
}
```

内置支持本地文件系统、MinIO、AWS S3、阿里云 OSS、腾讯云 COS，企业根据自己的基础设施选就行，不被厂商绑定。

这种插件化设计，是一个工程素养过关的团队才会在早期就想到的东西。

## 09、怎么写进简历

如果你在团队里搭过 SkillHub，这段经历完全可以写进简历。

**项目名称：** 企业级 AI 技能管理平台（基于 SkillHub 私有部署）

**项目简介：** 搭建团队内部 AI Agent 技能注册中心，实现技能发布、安全审核、版本管理、分发全流程，支持 Claude Code、OpenClaw 等主流 Agent 工具直接调用。

**技术栈：** Spring Boot 3.x、React 19、PostgreSQL、Redis、MinIO、Docker、ClawHub CLI

**核心职责：**

- 基于 SkillHub 完成私有化部署，配置 PostgreSQL + Redis + MinIO 存储架构，支持 amd64/arm64 双架构容器镜像
- 设计多命名空间权限隔离方案，按部门分配 Skill 发布权限，实现技能包的细粒度访问控制
- 接入 ClawHub CLI 协议兼容层，完成 Claude Code 与私有 Skill 注册中心的集成，将 Skill 安装流程从手动配置缩短到一行提示词
- 梳理安全扫描链路（结构检查 → 代码质量 → 安全漏洞 → 依赖链），输出内部技能发布规范，覆盖从提交到上线的完整审核流程
- 将 SkillHub 接入 CI/CD 流水线，实现技能包版本自动发布，消除人工干预步骤

这个项目最大的含金量在于：它不只是部署一个工具，而是建立了一套团队的 AI 技能资产管理体系。企业里越来越多人在用 Agent，但技能管理还是一片空白。能在这个时间点做这件事，是有先发优势的。

## ending

科大讯飞这次选的赛道很准。

不是要做最强的大模型，不是要做最好的 AI 编程工具，而是做"企业 AI 基础设施里缺的那块拼图"。

你有了 Claude Code，有了 Codex，有了各种 Agent 工具，但团队积累的 Skills 放哪？怎么共享？怎么审核？怎么治理？这些问题没有 SkillHub 之前，真的没有一个好答案。

现在有了。

![](https://cdn.paicoding.com/paicoding/a451597fac9ab6871a873318bd32d321.jpg)


【**好的工具，应该让人越用越省心，而不是越用越麻烦。**】

SkillHub 做到了这一点。

1.5K Star 还只是开始，如果你们团队正在搭 AI 工程体系，这个项目值得认真看一眼。不只是为了用它，翻翻源码，学学它的设计思路，也是很值的。

> GitHub 地址：https://github.com/iflytek/skillhub

我们下期见！
