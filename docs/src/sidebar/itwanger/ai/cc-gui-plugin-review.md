---
title: 不用折腾命令行！CC GUI让Claude Code在IDEA里开箱即用
shortTitle: CC GUI插件测评
description: 深度测评CC GUI插件，让Claude Code无缝集成IntelliJ IDEA，基于技术派项目实战，支持MCP、Skills、可视化操作。
tag:
  - Claude Code
  - IntelliJ IDEA
  - CC GUI
category:
  - AI
author: 沉默王二
date: 2026-03-26
---

大家好，我是二哥呀。

大号评论区看到一位球友推荐了 CC GUI，一款 IntelliJ IDEA 插件，并且是经过 JetBrains 官方验证过的，必须带大家先尝鲜一波，踩踩坑。

![](https://cdn.paicoding.com/paicoding/08227a7d6afa31ddc27ba35da97e939e.png)

> 插件地址：https://plugins.jetbrains.com/plugin/29342-cc-gui-claude-or-codex-

![](https://cdn.paicoding.com/paicoding/5b9901c572d3d8121c10e666fb2ed177.jpg)

目前最新版是 0.3.2。

![](https://cdn.paicoding.com/stutymore/sucai-20260326175154.png)

## 01、安装与配置

怎么安装呢？

很简单。

打开 IntelliJ IDEA，进入插件市场（快捷键 Cmd+Shift+A，然后输入 Plugins），搜索 “CC GUI”，这里能看到有两个图标完全一样，但作者不一样的插件。

我们选下载次数最多的这个安装，目前已经有 2 万多下载量了。

![](https://cdn.paicoding.com/stutymore/sucai-20260326175513.png)

安装完成后不需要重启 IDE。在右侧工具栏会有一个 “CC GUI” 的选项，点击它打开面板。

![](https://cdn.paicoding.com/stutymore/sucai-20260326175640.png)

首次使用会提醒我们安装 Claude Code SDK，点击前往安装。这个 SDK 是 Agent 运行的基础，大概 20 秒就能装好。

![](https://cdn.paicoding.com/stutymore/sucai-20260326175740.png)

安装完成后，需要配置模型供应商。点击供应商设置：

![](https://cdn.paicoding.com/stutymore/sucai-20260326175849.png)

这里可以直接用本地的 settings.json 授权。如果你之前配置过 Claude Code，直接把配置文件路径填进去就行。这样如果你用的是国内的 Coding Plan 套餐，比如说 GLM-5、Kimi 2.5 之类的，就可以直接用，不用再去登录 Claude 官方账号。

配置好后，在统计面板可以看到 token 的使用情况，包括每次请求的 token 数和累计使用量。

![](https://cdn.paicoding.com/stutymore/sucai-20260326180120.png)

MCP 面板这里可以添加一些 MCP 工具，这是 CC GUI 的一个亮点功能。MCP 让 Agent 可以调用外部工具，扩展能力边界。

强烈推荐大家安装 Chrome Devtools 这个 MCP，它可以让 Agent 直接调用 Chrome 浏览器，帮我们做前端测试和调试。针对一些需要登录态才能复现的 bug，或者需要特定浏览器环境的问题，这个超级好用。

![](https://cdn.paicoding.com/stutymore/sucai-20260326180240.png)

idea 是大号给大家推荐的，让 Claude Code 可以连接 IntelliJ IDEA 的插件。

然后是 git 的提交工具，可以帮我们生成 commit message。

![](https://cdn.paicoding.com/stutymore/sucai-20260326180507.png)

我之前一直用的是 GitHub 桌面版的 Copilot。

![](https://cdn.paicoding.com/stutymore/sucai-20260326180605.png)

接下来，重点可以看一下 Skills 面板。Skills 是 Claude Code 的扩展能力包，相当于插件，可以让 Agent 完成特定领域的任务。

我这里推荐大家必装的有这么两个：web-access 和 frontend-design。

![](https://cdn.paicoding.com/stutymore/sucai-20260326180712.png)

web-access 是帮我们链接浏览器的，当我们需要一些登录权限才能访问的页面，或者需要模拟用户操作时，用这个 Skills 会非常方便。

frontend-design 是帮我们设计前端页面的，可以根据描述生成 HTML/CSS 代码，整体的设计风格我认为还是不错的，比自己从头写要省事很多。

目前这个插件在 GitHub 已经有 2.2k star 了，社区反馈非常不错。作者更新也很勤快，基本每周都有新版本，bug 修复和功能迭代都很及时。

> https://github.com/zhukunpenglinyutong/idea-claude-code-gui/blob/main/README.zh-CN.md

![](https://cdn.paicoding.com/stutymore/sucai-20260326181423.png)

## 02、实战一：文章阅读统计功能优化

配置好之后，我们来上实战。第一个案例基于技术派项目的实际代码。

技术派是一个开源的技术社区平台，有文章、评论、用户等核心模块。

相关代码在 `ArticleReadService.java` 里，阅读数更新逻辑是直接操作数据库的。我想改成 Redis 缓存+定时同步的方案，涉及多个文件的改动，包括 Service 层、Controller 层、还有定时任务。

我在 CC GUI 里说：“帮我优化技术派项目的文章阅读统计功能，改成 Redis 缓存方案，先累加 Redis 计数，再定时同步到数据库”。

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326194022.png)

Agent 首先分析了现有代码结构，然后它看了项目的依赖，确认已经有 Redis 配置。

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326194053.png)

发现问题，并给出优化方案。

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326194148.png)

第一步，修改 CountServiceImpl.incrArticleReadCount()，移除数据库直接操作，只保留 Redis 计数更新：

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326194450.png)

第二步，添加定时同步任务，新增定时任务，每 5 分钟同步 Redis 阅读计数到数据库。

第三步，准备批量更新。

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326194620.png)

第四步，单元测试。

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326194648.png)

我确认方案后，授权 Agent 开始执行。

整个过程我只用确认关键步骤，具体的代码编写、文件创建、方法调用关系，Agent 都帮我处理好了。

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326194749.png)

具体来说，Agent 生成的 Redis 缓存方案有几个亮点：

一是使用了 Redis 的`incr`命令做原子累加，避免并发时的竞态条件。

```java
@Override
public void incrArticleReadCount(Long authorUserId, Long articleId) {
    // 移除: articleDao.incrReadCount(articleId);
    // 只更新 Redis 计数器
    RedisClient.pipelineAction()
            .add(CountConstants.ARTICLE_STATISTIC_INFO + articleId, CountConstants.READ_COUNT,
                    (connection, key, value) -> connection.hIncrBy(key, value, 1))
            .add(CountConstants.USER_STATISTIC_INFO + authorUserId, CountConstants.READ_COUNT,
                    (connection, key, value) -> connection.hIncrBy(key, value, 1))
            .execute();
}
```

二是设置了 key 的过期时间，防止冷数据一直占用内存。三是定时同步时用了批量更新，减少数据库连接次数。

```java
/**
 * 每5分钟执行一次，将 Redis 中的文章阅读计数同步到数据库
 */
@Scheduled(cron = "0 */5 * * * ?")
public void syncArticleReadCountToDb() {
    Long start = System.currentTimeMillis();
    log.info("开始同步文章阅读计数到数据库");

    // 扫描所有文章统计 key
    Set<String> keys = scanKeys(CountConstants.ARTICLE_STATISTIC_INFO + "*");

    int batchSize = 100;
    int synced = 0;

    for (String key : keys) {
        try {
            // 提取 articleId
            Long articleId = Long.parseLong(key.replace(CountConstants.ARTICLE_STATISTIC_INFO, ""));

            // 获取 Redis 中的阅读计数
            Integer readCount = RedisClient.hGet(key, CountConstants.READ_COUNT, Integer.class);
            if (readCount != null && readCount > 0) {
                // 批量更新数据库
                batchUpdateReadCount(articleId, readCount);
                synced++;

                if (synced % batchSize == 0) {
                    log.info("已同步 {} 篇文章的阅读计数", synced);
                }
            }
        } catch (Exception e) {
            log.error("同步阅读计数失败, key: {}", key, e);
        }
    }

    log.info("同步文章阅读计数完成，共同步 {} 篇文章，耗时: {}ms", synced, System.currentTimeMillis() - start);
}
```

这些细节我自己写可能都会遗漏，但 Agent 都考虑到了。

完事直接让他帮我们测试一下，会调用 Chrome Devtools MCP 进行测试。

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326195552.png)

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326200149.png)

## 03、实战二：评论系统分页查询重构

第二个案例还是基于技术派项目，重构评论系统的分页查询功能。

技术派的评论模块在 `CommentReadService.java` 里，目前的实现有个问题：查询文章评论时，一次性把一级评论和二级回复都查出来，数据量大的时候很慢。比如一篇文章有 100 条评论，每条评论又有 10 条回复，就要查 1000 条数据，页面加载特别卡。

我想改成延迟加载方案：先查一级评论，用户点击“展开回复”时再异步加载二级评论。这样首屏加载快，用户体验好。

但这个重构涉及前后端改动。后端要改查询逻辑，加一个新的接口专门查回复；前端要改交互，加点击事件和加载动画。以前这种重构我得前后端分开改，还要协调接口格式，很费时间。

现在在 CC GUI 里，我直接说：“帮我重构技术派项目的评论系统，改成一级评论和二级回复分开加载。先查一级评论分页，点击展开时再异步加载回复”。

Agent 首先分析了现有代码。

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326202322.png)

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326202410.png)

Agent 给出了重构方案：

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326202516.png)

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326202546.png)

在 IntelliJ IDEA 中进行代码编写，尤其是后端代码的优点就是，你可以随时查看。

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326202757.png)

这是其他工具完全无法取代的。

实施方案来了。

1. 修改 TopCommentDTO - 添加 childCommentCount（子评论总数）和 hasMoreChild（是否有更多子评论）
2. 修改 CommentReadService - 新增 getSubComments(Long topCommentId, PageParam page) 方法
3. 修改 CommentRestController - 新增 /comment/api/subcomments 接口
4. 修改前端 - 点击展开时异步加载子评论

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326203055.png)

这次任务就比较多了，一共 9 个。要修改的文件清单也一目了然。

| 模块              | 文件                        | 操作          |
| ----------------- | --------------------------- | ------------- |
| paicoding-api     | TopCommentDTO.java          | 添加字段      |
| paicoding-api     | SubCommentListVO.java       | 新建          |
| paicoding-service | CommentReadService.java     | 添加接口方法  |
| paicoding-service | CommentReadServiceImpl.java | 修改+新增方法 |
| paicoding-service | CommentDao.java             | 添加方法      |
| paicoding-web     | CommentRestController.java  | 添加接口      |
| paicoding-ui      | comment-item.html           | 修改模板      |

等改完我们再来看一下实际的效果。

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326204753.png)

整体效果还不错，😄

![](https://cdn.paicoding.com/stutymore/cc-gui-plugin-review-20260326213228.png)

## 04、ending

工具的价值，在于让复杂的事情变简单。

Claude Code 本身是个强大的工具，但它在终端里。CC GUI 做的，就是搭一座桥，让 Claude Code 的能力无缝流入 IDE，成为我们工作流的一部分。

【**工具是手的延伸，而不是手的替代**。】

作为开发者，我们要做的，就是保持开放的心态，拥抱这些新工具，找到最适合自己的工作流。不要固守成规，也不要盲目跟风，而是根据自己的实际需求，选择最能提升效率的组合。

CC GUI+Claude Code，是我目前找到的比较好的组合。

我们下期见.
