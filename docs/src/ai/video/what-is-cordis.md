# DeepSeek Harness 是基于 Cordis 插件系统构建的，那 Cordis 到底是个啥？

DeepSeek Harness 今天正式发布了。你兴冲冲打开 GitHub，翻了翻源码和文档，发现一个词反复出现——Cordis。

一个只有 627 star 的 TypeScript 项目，竟然是 DeepSeek Harness 的地基，或者叫基架？

![](https://cdn.paicoding.com/stutymore/what-is-cordis-20260813224707.png)

我研究了 Cordis 的源码、作者发表的学术论文，以及 DeepSeek Harness 的官方文档，可以自信地、大方地、光明磊落地帮你搞清楚这三件事：

- Cordis 到底是什么，谁做的？
- 它凭什么能当 Harness 的基架？核心能力是什么？
- DeepSeek Harness 的「一切皆插件」是怎么靠 Cordis 实现的？

![](https://cdn.paicoding.com/stutymore/what-is-cordis-20260813225805-a12a62e2.png)

哈喽大家好，我是二哥呀。今天用 3 分钟，给你讲清楚 DeepSeek Harness 背后的插件内核——Cordis。

系好安全带，我们粗粗粗出发了～

先说第一件事，Cordis 到底是什么。

一句话：构建框架的框架。

有点绕，是吧？不着急，我给你解释清楚。

它不是给你直接写业务代码的应用框架，而是给框架开发者用的底层基座。你可以把它理解成一个万能地基——DeepSeek Harness 是盖在这个地基上的大楼。

创建者叫 Shigma，就在 DeepSeek 工作。他之前做了一个叫 Koishi 的聊天机器人框架，在 GitHub 上有 5600 多个 star，生态里跑着 3000 多个插件。Cordis 就是从 Koishi 里抽出来的插件内核。

![](https://cdn.paicoding.com/stutymore/what-is-cordis-20260813225228.png)

而且 Shigma 还专门写了一篇学术论文，给 Cordis 的设计做了理论证明。

![](https://cdn.paicoding.com/stutymore/what-is-cordis-20260813230007-9520fcf1.png)

那聪明的你肯定想到了：插件系统到处都是，Cordis 凭什么能当 DeepSeek Harness 的基架？

靠一个核心能力——可逆副作用。

打个比方。传统插件系统像在墙上钉钉子挂画。你装一个插件，它注册了事件监听、添加了服务、改了配置——相当于钉了一堆钉子。卸载的时候呢？要一个个拔钉子，还得补墙。漏拔一个，就是内存泄漏。

Cordis 用的是无痕挂钩。

每个插件产生的副作用，在创建的那一刻，Cordis 就自动记录了「怎么撤销」。卸载插件的时候，一键全部回滚，干干净净，墙面跟新的一样。

![](https://cdn.paicoding.com/stutymore/what-is-cordis-20260813230305-dec363df.png)

这就是为什么 Cordis 能做到真正的热重载——改一个插件，不用重启整个应用，旧的副作用自动清理，新的插件直接加载。

那聪明的你肯定又要问了：光能装能卸还不够，插件之间怎么协作？

靠依赖声明。

在 DeepSeek Harness 里，模型是插件，工具是插件，技能是插件，会话、沙箱、存储、UI，全是插件。

![](https://cdn.paicoding.com/stutymore/what-is-cordis-20260813225313.png)

插件 A 说「我需要 database 服务」，Cordis 就等 database 服务就绪了，再启动 A。不用你手动编排加载顺序，Cordis 自己搞定。

这也是 Harness 能切换不同运行模式的原因。

标准模式全套工具拉满，Code 模式只加载编码相关的插件，Mini 模式只留一个终端和文件编辑器。切换模式，就是换一组插件组合。底层都是同一个 Cordis 内核在调度。

![](https://cdn.paicoding.com/stutymore/what-is-cordis-20260813225425.png)

最后简单总结下。

Cordis 是构建插件系统的元框架，从 3000 多个插件的实战中打磨出来的。核心能力是可逆副作用——插件装了能卸，卸了不留痕迹。DeepSeek Harness 的「一切皆插件」就建立在这个能力之上。

另外，想看懂 Harness 的架构，建议先花 10 分钟搞清楚 Cordis 的五个核心概念——Plugin、Context、Service、inject、Events。搞懂这五个词，整个 Harness 的设计就搞懂了。

要不，下一期就展开给大家详细讲讲？

这个知识点你学废了吗？想解锁更多 AI 硬核知识，点赞关注，我是二哥，咱们下期见！

![](https://cdn.paicoding.com/stutymore/what-is-cordis-20260813233038.png)

![](https://cdn.paicoding.com/stutymore/what-is-cordis-20260813233047.png)

![](https://cdn.paicoding.com/stutymore/what-is-cordis-20260813233054.png)