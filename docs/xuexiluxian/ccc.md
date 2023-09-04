---
star: true
title: 2023年最值得收藏的C++入门学习路线（🔥）
shortTitle: C++学习路线
category:
  - 学习路线
tag:
  - 学习路线
description: 非 C++职业选手，但工作中学过一段时间，这篇分享给对 C++ 感兴趣的爱好者，文末有侯捷老师的视频资源可供下载。
head:
  - - meta
    - name: keywords
      content: C++,学习路线
---

>非 C++职业选手，但工作中学过一段时间，这篇分享给对 C++ 感兴趣的爱好者，文末有侯捷老师的视频资源。

## 一、书籍推荐

学习 C++ 语法，首推《C++ Primer 第五版》。我在参加第一份工作的时候，就买过一本《C++ Primer 第四版》，这本书一直不舍得扔，尽管它已经非常破了，但我们之间的感情是深厚的，毕竟跟随我辗转了好几个城市了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/ccc-primer-book.png)

*是不是一下子就暴露自己工作年限了*？

这本书非常全面地讲解了 C++ 的语法以及 C++ 的各种特性，如果能坚持看完的话，帮助会很大。如果时间比较充分的话，建议至少看两遍。如果时间比较紧张的话，至少通读一遍吧，要能把握住这本书的大体框架，然后结合个人的实际情况选择性地看一些重点章节。

然后是《Effective C++》，侯捷老师译的，这本书主要讲解了编写 C++ 代码需要注意的一些条款，和《Effective Java》 属于同一个系列。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/ccc-2.jpg)

第三本是《STL源码剖析》这本书，侯捷老师写的，这本书讲了C++的底层实现，包括各种容器（vector、list、heap、deque、Red Black tree、hash table、set/map）的实现、各种常见算法（排序、查找、排列组合、数据移动与复制技术）的实现等。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/ccc-3.png)

第四本《深度探索C++对象模型》，侯捷老师译的，这本书讲解了 C++ 面向对象特性的底层实现机制，读起来虽然有点晦涩，但读完后就会搞明白“代码跑起来的时候实际发生了什么”。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/ccc-4.jpg)

## 二、视频推荐

既然有三本书都是侯捷老师的，那再刷一刷侯捷老师的视频，岂不是效果更佳？不过，由于涉及到版权，国内的 B 站、A 站都下架了相关的视频资源，包括：

- 《C++面向对象高级编程》
- 《STL》
- 《C++ 内存管理》
- 《C++ 11 新特性》
- 《C++ 程序的生前死后》



![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/ccc-b3de882e-3b4e-453e-a9b7-e327ca7ec30e.png)


我从网上 down 了一份，保存到了本地。需要的小伙伴请长按识别/扫描下方的二维码关注作者的原创公众号「**沉默王二**」回复关键字「**cpp**」就可以拉取到了。

![回复关键字 cpp ](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

给大家看一下我保存的这些视频资源哈。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/ccc-5.png)

如果还需要更多 C++ 的学习资料，可以直接戳我整理的这个 GitHub/码云仓库——📚程序员必读书单整理，附下载地址，里面有大量的 C++ 学习资料。

- GitHub 地址：[https://github.com/itwanger/JavaBooks](https://github.com/itwanger/JavaBooks#c-1)
- 码云地址：[https://gitee.com/itwanger/JavaBooks](https://gitee.com/itwanger/JavaBooks#c-1)


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/cpp-books.jpg)

简单罗列一下：

- 大规模c++程序设计
- 牛客校招面试题（附答案与解析）c++篇
- 深度探索C++对象模型 PDF中文清晰版
- 深入理解c11(c11新特性解析与应用)
- C++ Primer 第五版--- 高清版
- C++语言的设计和演化
- Effective.Modern.C++ - 中文版
- Effective+STL中文版：50条有效使用STL的经验
- More Effective C++中文
- STL源码剖析--侯捷

## 三、练手项目

书有了，视频有了，还得动手去敲代码，尤其是初学阶段，记得这四个大字：**唯手熟尔**。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/ccc-7c451ad4-73e5-4ac4-a9e5-d0bdbae06ff0.jpg)

推荐一个轻量级练手项目吧。

**要说轻量级，必须得点名 workflow 这个开源项目，一个非常适合阅读的 C++ 开源项目**。

这是搜狗公司的C++服务器引擎，支撑搜狗几乎所有后端C++在线服务，包括所有搜索服务、云输入法、在线广告等。

学习起来，也非常的友好，比如说搭建一个 HTTP 服务器，几行代码就能搞定：

```C++
#include <stdio.h>
#include "workflow/WFHttpServer.h"

int main()
{
    WFHttpServer server([](WFHttpTask *task) {
        task->get_resp()->append_output_body("<html>Hello World!</html>");
    });

    if (server.start(8888) == 0) {  // start server on port 8888
        getchar(); // press "Enter" to end.
        server.stop();
    }

    return 0;
}
```

除此之外，还可以：

*   实现自定义的协议的客户端/服务器端，搭建自己的 RPC 系统
*   构建异步任务流
*   作为文件异步IO工具使用
*   作为并行计算工具使用
*   构建微服务系统

GitHub 链接：[https://github.com/sogou/workflow](https://github.com/sogou/workflow)

最新的 master 分支对新手来说，可能学习的压力比较大，这里分享一些我这些年积攒下来阅读开源项目的小心得，希望能给小伙伴们提供一点点帮助和心得。

好的开源项目动辄几万行的源码，虽然是宝藏，但如果不讲究技巧的话，即便是投入了大量的时间，也会收效甚微。

毫无疑问，阅读优秀的开源项目源码是程序员提高自己编程能力的最佳手段之一。

但是，有一说一，阅读别人的源代码永远不会是一件很轻松的事情。

**首先，一定要找到好的开源项目**。star 是衡量一个好的项目的一个重要标准，像 docker、Spring Boot、Redis、workflow 等等， star 数都非常的可观，所以都是非常的学习素材。

优秀的开源项目都是经过作者精心布局的，本身的代码就非常的优秀。但很多人会有一种偏执，认为代码即文档。但在我看来，如果一个项目缺少了详实的文档，必然算不上优秀。

规模宏大的项目一旦离开了文档的解释，总免不了令人生畏。所以，好的开源项目，一定要有完善的文档。

像 workflow 的文档就挺扎实的。

*   Client基础
    *   [创建第一个任务：wget](https://github.com/sogou/workflow/blob/master/docs/tutorial-01-wget.md)
    *   [实现一次redis写入与读出：redis\_cli](https://github.com/sogou/workflow/blob/master/docs/tutorial-02-redis_cli.md)
    *   [任务序列的更多功能：wget\_to\_redis](https://github.com/sogou/workflow/blob/master/docs/tutorial-03-wget_to_redis.md)

*   Server基础

    *   [第一个server：http\_echo\_server](https://github.com/sogou/workflow/blob/master/docs/tutorial-04-http_echo_server.md)
    *   [异步server的示例：http\_proxy](https://github.com/sogou/workflow/blob/master/docs/tutorial-05-http_proxy.md)

*   并行任务与工作流　

    *   [一个简单的并行抓取：parallel\_wget](https://github.com/sogou/workflow/blob/master/docs/tutorial-06-parallel_wget.md)

*   几个重要的话题

    *   [关于错误处理](https://github.com/sogou/workflow/blob/master/docs/about-error.md)
    *   [关于超时](https://github.com/sogou/workflow/blob/master/docs/about-timeout.md)
    *   [关于全局配置](https://github.com/sogou/workflow/blob/master/docs/about-config.md)
    *   [关于DNS](https://github.com/sogou/workflow/blob/master/docs/about-dns.md)
    *   [关于程序退出](https://github.com/sogou/workflow/blob/master/docs/about-exit.md)

*   计算任务

    *   [使用内置算法工厂：sort\_task](https://github.com/sogou/workflow/blob/master/docs/tutorial-07-sort_task.md)
    *   [自定义计算任务：matrix\_multiply](https://github.com/sogou/workflow/blob/master/docs/tutorial-08-matrix_multiply.md)
    *   [更加简单的使用计算任务：go\_task](https://github.com/sogou/workflow/blob/master/docs/about-go-task.md)

*   文件异步IO任务

    *   [异步IO的http server：http\_file\_server](https://github.com/sogou/workflow/blob/master/docs/tutorial-09-http_file_server.md)

*   用户定义协议基础

    *   [简单的用户自定义协议client/server](https://github.com/sogou/workflow/blob/master/docs/tutorial-10-user_defined_protocol.md)

*   其它一些重要任务与组件

    *   [关于定时器](https://github.com/sogou/workflow/blob/master/docs/about-timer.md)
    *   [关于计数器](https://github.com/sogou/workflow/blob/master/docs/about-counter.md)
    *   [条件任务与资源池](https://github.com/sogou/workflow/blob/master/docs/about-conditional.md)

*   服务治理

    *   [关于服务治理](https://github.com/sogou/workflow/blob/master/docs/about-service-governance.md)
    *   [Upstream更多文档](https://github.com/sogou/workflow/blob/master/docs/about-upstream.md)

*   连接上下文的使用

    *   [关于连接上下文](https://github.com/sogou/workflow/blob/master/docs/about-connection-context.md)

*   内置客户端

    *   [异步MySQL客户端：mysql\_cli](https://github.com/sogou/workflow/blob/master/docs/tutorial-12-mysql_cli.md)
    *   [异步kafka客户端：kafka\_cli](https://github.com/sogou/workflow/blob/master/docs/tutorial-13-kafka_cli.md)

**其次，要从低版本开始学习**。比如说我们在学习 workflow 的时候，可以先从 v0.9.0 这个最终的 release 版本开始学习。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xuexiluxian/ccc-3e0137d4-f0f3-4a1d-8e6c-c16eefcd175d.jpg)

然后再逐层往上推进，这样的学习效果肯定会更佳，尤其是针对新手来说。

**最后，保持耐心**。阅读开源项目的过程中，一定会遇到一些看不懂的代码，这很正常，不要慌，更不要轻易放弃。

就像我们学习物理、数学一样，遇到实在是一时半会搞不定的章节，可以选择跳过，因为作者在排版布局的时候，也容易忽略新手的感觉，把他认为是比较轻松的排在前面，但对于读者来说，可能恰恰相反。

可以先做个记录，在弄懂整块代码后再回头去读那些不明白的部分。当你回头再读的时候，很有可能问题就迎刃而解了。

咬牙坚持下去，抽丝剥茧，你总会成为期待中的那个样子的。

我之前有提到过，**提高编程能力**的办法有两个。

*   造轮子
*   拆轮子

阅读源码的过程就是拆轮子的过程，多研究别人的代码是怎么写的，会让我们在编程功底上有一个很大的飞跃。

## 四、一点小心得

学习并非是一朝一夕的事情，记得坚持就好。

最后，再推荐一个非常适合初学者从**入门到进阶**的仓库，解决了**面试者与学习者**想要深入 C++ 及如何入坑 C++的问题。并且涵盖了源码分析，多线程并发等知识，是一个比较全面的 C++ 学习从入门到进阶提升的仓库。

[GitHub - Light-City/CPlusPlusThings: C++那些事](https://github.com/Light-City/CPlusPlusThings)

*   [const 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/const)
*   [static 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/static)
*   [this 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/this)
*   [inline 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/inline)
*   [sizeof 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/sizeof)
*   [函数指针那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/func_pointer)
*   [纯虚函数和抽象类那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/abstract)
*   [vptr\_vtable 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/vptr_vtable)
*   [virtual 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/virtual)
*   [volatile 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/volatile)
*   [assert 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/assert)
*   [位域那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/bit)
*   [extern 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/extern)
*   [struct 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/struct)
*   [struct 与 class 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/struct_class)
*   [union 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/union)
*   [c 实现 c++ 多态那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/c_poly)
*   [explicit 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/explicit)
*   [friend 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/friend)
*   [using 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/using)
*   [:: 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/maohao)
*   [enum 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/enum)
*   [decltype 那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/decltype)
*   [引用与指针那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/pointer_refer)
*   [宏那些事](https://github.com/Light-City/CPlusPlusThings/blob/master/basic_content/macro)


----


GitHub 上标星 9300+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 9300+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)