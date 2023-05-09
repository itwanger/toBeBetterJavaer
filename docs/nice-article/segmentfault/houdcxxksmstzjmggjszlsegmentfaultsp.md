---
title: 后端 - 超详细！k8s 面试题总结 - 民工哥技术之路 - SegmentFault 思否
shortTitle: 后端 - 超详细！k8s 面试题总结 - 民工哥技术之路 - SegmentFault 思否
description: etcd 是 CoreOS 团队发起的开源项目，是一个管理配置信息和服务发现（service discovery）的项目，它的目标是构建一个高可用的分布式键值（key-value）数据库...
tags:
  - 优质文章
category:
  - 思否
head:
  - - meta
    - name: keywords
      content: kubernetes,运维,容器,后端,程序员
---

1.  [首页](/)
2.  [专栏](/blogs)
3.  [民工哥技术之路](/blog/mingongge)
4.  文章详情

11[](#comment-area)

[](###)

![头图](https://static.segmentfault.com/main_site_next/689817c0/_next/static/media/bg-219.cbec47c3.svg)

# [超详细！k8s 面试题总结](/a/1190000040004560)

[

![头像](https://avatar-static.segmentfault.com/311/143/3111436489-5e9b140a51f93_huge128)

**民工哥**

25.7k348



](/u/jishuroad)

[

发布于

2021-05-15

](/a/1190000040004560/revision)

[English](/a/1190000040004560/en)

 

## 简述ETCD及其特点？

[etcd](https://link.segmentfault.com/?enc=o2%2BzXcBM8LuBgdmw4gLfMQ%3D%3D.RJAniV3P6VqKzD0yrF2tj9yL1J8NNm192fZE6Z6%2F%2FMqKpDJCMU29Rxum6qtEspNqmZ4DBm3tF11O8RomG7cGf%2FSrzJii6JZYLkJg6Nk6N3kfni%2FL2f1dMq1XAeETh1bewhDgsX5CIUyoy5tft5M6aZf6fXXF6kmCmh9reCDjYevs3PmpLnQnn9X%2FPiI8Z6CCO7A6KB6NcFY55GOdwOQd0fEdm9iockY6eZNwBq6ZbyD%2F9ebmLYEYbxRbv4Lq41qURSCnRKLIjtqI5eiayfEg4YlAd2QNIB780thmyTsfgwxflZpAGhdBQbzht6ERz1LL) 是 CoreOS 团队发起的开源项目，是一个管理配置信息和服务发现（service discovery）的项目，它的目标是构建一个高可用的分布式键值（key-value）数据库，基于 Go 语言实现。

*   特点：
*   简单：支持 REST 风格的 HTTP+JSON API
*   安全：支持 HTTPS 方式的访问
*   快速：支持并发 1k/s 的写操作
*   可靠：支持分布式结构，基于 Raft 的一致性算法，Raft 是一套通过选举主节点来实现分布式系统一致性的算法。

## 简述ETCD适应的场景？

[etcd](https://link.segmentfault.com/?enc=Nt%2FxcY9pvflMF15Y2qeVgg%3D%3D.AMGpyD6C5R9%2BT3IYEOOkg7X5dk3ZGIFcYlQoo%2BVkcPr1%2Bg1IOaYfHvnJnpafhm9sr9w6ijnabGAH8wDbqT%2F7PIx%2B7WqgAZqbRq3eFV3H%2F4V%2Bd5wpupp%2BY4ghFyA6XFA1S5J1qXUD3eGMNv%2FdQoZFM0ZahxGL%2F6ZO7wk2VeOvK3pQxl%2FPaMf70pSrLQi0hMHCLKmdWt39TfzrMDaKnuDqFZdJlPTdrxH80W52oNexkm1YEhTJNw6lsQQVbRi3NqUHC86T%2BcpWvf2QWvq14Mu1LoFnMZtCxsIRRx3%2ButVHE%2FRIWJc6ieo5UsRlPpMN53g2)基于其优秀的特点，可广泛的应用于以下场景：

服务发现(Service Discovery)：服务发现主要解决在同一个分布式集群中的进程或服务，要如何才能找到对方并建立连接。本质上来说，服务发现就是想要了解集群中是否有进程在监听udp或tcp端口，并且通过名字就可以查找和连接。

消息发布与订阅：在分布式系统中，最适用的一种组件间通信方式就是消息发布与订阅。即构建一个配置共享中心，数据提供者在这个配置中心发布消息，而消息使用者则订阅他们关心的主题，一旦主题有消息发布，就会实时通知订阅者。通过这种方式可以做到分布式系统配置的集中式管理与动态更新。应用中用到的一些配置信息放到etcd上进行集中管理。

负载均衡：在分布式系统中，为了保证服务的高可用以及数据的一致性，通常都会把数据和服务部署多份，以此达到对等服务，即使其中的某一个服务失效了，也不影响使用。etcd本身分布式架构存储的信息访问支持负载均衡。etcd集群化以后，每个etcd的核心节点都可以处理用户的请求。所以，把数据量小但是访问频繁的消息数据直接存储到etcd中也可以实现负载均衡的效果。

分布式通知与协调：与消息发布和订阅类似，都用到了etcd中的Watcher机制，通过注册与异步通知机制，实现分布式环境下不同系统之间的通知与协调，从而对数据变更做到实时处理。

分布式锁：因为etcd使用Raft算法保持了数据的强一致性，某次操作存储到集群中的值必然是全局一致的，所以很容易实现分布式锁。锁服务有两种使用方式，一是保持独占，二是控制时序。

集群监控与Leader竞选：通过etcd来进行监控实现起来非常简单并且实时性强。

## 简述什么是Kubernetes？

[Kubernetes](https://link.segmentfault.com/?enc=B7a1nNFW75JhVVq6P85qVw%3D%3D.cOWP9UuBRkh59xKQKq9I2r4CXXzHF%2BioW34Oy6n9syNvyAEE7ucUS7LXNEz%2FcKCqIY2Za72%2BE4kk9zzZJMGI9lgLiNuprSOA7ZewO5i0S%2FoaeyZwwliRBisk845aJfHYicAilwgkIGCXYL6MYctE3wMPeJFGqm6wrU%2Fz3RZPvi3Ng0LLCU6v%2B0E%2F5w7HjsSDJx%2Fv25VnkMqzYuUBGkEBC8CVuWULqQu0cU0gzuKWjh2nZoX2YoSlPKe%2FCYMm11XVoHTXrnTDP2PKtR8VXrw1%2FVQ4iQgQ9ocf58b1Sl2w%2FeV6YEcaBdxBujt7%2Fl6jtBfN)是一个全新的基于容器技术的分布式系统支撑平台。是Google开源的容器集群管理系统（谷歌内部:Borg）。在Docker技术的基础上，为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等一系列完整功能，提高了大规模容器集群管理的便捷性。并且具有完备的集群管理能力，多层次的安全防护和准入机制、多租户应用支撑能力、透明的服务注册和发现机制、內建智能负载均衡器、强大的故障发现和自我修复能力、服务滚动升级和在线扩容能力、可扩展的资源自动调度机制以及多粒度的资源配额管理能力。

## 简述Kubernetes和Docker的关系？

Docker 提供容器的生命周期管理和，[Docker](https://link.segmentfault.com/?enc=oqRI%2B%2BaqAhORYRgapwFqXQ%3D%3D.lk5rUAwhEIOUAOmeNRyvac79UDepkCOdq2g0DuJWiZWP0Jw%2FbvandJKXtKt%2BWfEq88048FMaIoHmECLuNCMdbkIg%2BpVGiatUgXmchfGn2MxPxptFJ2LnyhUdBMQoJ3Nr10KAg3inba9PaYSADPsd4V8CJpn2uWROZPd1vIEmqAlxB3kXmWoqINXM63rKSOMFBDAhaNF6MEZbYkPJwfJzSqWS%2FxWM2OnrCRR6YCGLOxf0c%2BOgfuKvj13FE%2F7atE48hyiXuYrLe7MTfzZyJAjwgdGvQAXO1w8DG%2F6UEfrh6MfuFGX%2FUWVYZwOvPf7%2BA7KK) 镜像构建运行时容器。它的主要优点是将将软件/应用程序运行所需的设置和依赖项打包到一个容器中，从而实现了可移植性等优点。

[Kubernetes](https://link.segmentfault.com/?enc=BCst%2BXhg6R4dX06jRJxaGg%3D%3D.Q7UO%2FxKZYPuXCTPUt3j2uwVbvsBeV09qvcNGpfs73m%2BB05HvbZPGFY1THuku8m7BEJ%2FHClwIXiq63KkUpp%2BMij4Oc%2BQKpIgaFQ3%2FMqX%2F%2BUZMtyzu2pSmsHFV1rKnEBIMYD4yE%2F7FF0K1z4w0lGuUtMPTx%2BdK%2BSRcYj%2FCkFoOkGMRh%2FYnEoQ%2BqrPi0CkzfQApMW2BKGbEXsjXvYDu7odvJGeZPt5ZY2fEOZHffexv4C%2BsErM%2BA2Qg8Ax08iybqLtfKTQmzyEybDnXXwozpF3YufhLLCVIVHgfYgEOja5HDkEDBRFW3pASYd8L%2BFXAi7eh) 用于关联和编排在多个主机上运行的容器。

## 简述Kubernetes中什么是Minikube、Kubectl、Kubelet？

Minikube 是一种可以在本地轻松运行一个单节点 [Kubernetes](https://link.segmentfault.com/?enc=h3jX%2FZhBwXliQPgswK3NHg%3D%3D.WxhBS3kbhR9rzQKJtcJ0Eqr2aOlKiRixiJIZixeeZyG1oaEv8mIIAqKo%2BuOQkUtKsFiGrIu1y4NHj6JoOvxobQSVqpOh9%2B9EdO3vvo9KpIXNXnbOePyM%2BRef7WKkFsAsCMBhJueefi9QpSgnKwrzNKe2r26n9stOspN12wng1SWvJ6PDAEek5tATWCt5r01x%2F9QD4GsRximkzl6VbvPc8KFLsFEy%2FB09kT9jgQ28Qlw2OIskvSRYI1d04Pd5pjNcO7ln2FGlC4cGUDdxFtH6n76unbtvzifzSnEPtc3IWS6EGEus4XvezibK0lP7V1Q4) 群集的工具。

[Kubectl](https://link.segmentfault.com/?enc=QY5dlRn0ZG7t4R422TMwzg%3D%3D.q7%2BVLs09OkqOeTcMbQN6rqs5KkZP9JBGbMhM4Gx0NEXj9JXokUs39UWa%2BNah4lHnNen%2BxH4ekuZ1m0F4rqQgHgxjLpPdYleI2VNKvCSmpFxjHKiAWnN9QDa3zLFpRQkYgTseeY01agX8bBSjXFbcUdykX2UozAohuDknK9uj5XiA9T%2FmeTtkz1Tfvu%2BCHWANnzL48Hzdp8H9%2BmVe%2Fos3MqpMu2Ibaq1wjUIZNyzfczX%2BIgDjDeyBqjKEafgv2DoUclVsdi%2FHQzO5tcN76cYeSdIztfwpsGBORx2TUl%2F2KVFRbBtzrTweqbQ1JfliLkTy) 是一个命令行工具，可以使用该工具控制[Kubernetes](https://link.segmentfault.com/?enc=T0tfpo8SpXYMjO7OBzCxOA%3D%3D.McmooxhthvGpyJcwbI4oymlT4FnyxqE%2B9SHd9h0skNFb2yU2oUiHoilcOjPC06FK96LFjj6AHF6PLo9%2BrdQw7LWByKQxhZoLwtPe%2BYehARybuiz4Rmuoc8hLX%2FJZq5cMiGcndqy%2B6Pv%2BVG7u41cyThleoIyBM3dV5SduBbopA6RuvQcu53iWt1%2BAN7AdnXcGGzb15TJqPwmhC26mwApn16eocKeCSx2fH4WC%2FusWj47GRthnHEvM8fUadZmVLHlNMRmGGXiVQWf8qSaa%2BjJgTmtoZnLuvDAamgD4DJJpKTsQ1swi0EN1ouaZ1NMI6TiF)集群管理器，如检查群集资源，创建、删除和更新组件，查看应用程序。

Kubelet 是一个代理服务，它在每个节点上运行，并使从服务器与主服务器通信。

## 简述Kubernetes常见的部署方式？

常见的[Kubernetes](https://link.segmentfault.com/?enc=nF3Zmj4kBZgfTLwkweMQjQ%3D%3D.7iX3N97LjJLExaoqLVPZRy7gJxTanIrW9XerRRq9ObSc0ZATof7FESlacAZDk%2FJ7Xq5RuyoXQcYa39vPPXsNRxCC1esZEV%2FrvvqoxT1tM8fyF%2BBdLGYeIhhH28vcly0Jx4AcCb5OEVWExoYer0scAK6y61J%2BE2xLE%2BIyv6VuWo%2FUV0BFbbHT4%2B5RxGU81m%2FUt0PWYes81Z6oNG2xtNb9yzWNbC9hvduuzvdsYgGMAOgzTXo60cvsSc9k99O1cYCIyv28mEnLMO0kM8F8J8IzkFbIpoZuhsJcqUvPiGAxXI0UIyrBnrAv86Aj9RA1ICLJ)部署方式有：

*   kubeadm：也是推荐的一种部署方式；
*   二进制：[CentOS 搭建 K8S，一次性成功，收藏了！](https://link.segmentfault.com/?enc=faFFMa2tyXySL1mNdh1k7A%3D%3D.tg7HgyKfo8IyiJD6H2ArSrd4LR6jJULVKSrcC8HJJ9xNJfiaLd7N8TAylQLe5ebAfNN5vw4Vy9IDDPmZ9RwWQ8yLdSEFg%2FuXO%2FP0KsPyarwzHj9tcTBGcOtDKDgMeiGUoygq%2F3K7ukBgmLqry8hnQsW7O9HMXFGxy6LNuwputvP264z1ogMmc5tpmw45aubG6JSkENAwrjWSZ0r2FCCwfRDzs%2FSG8TrCmxdHFgdl2oZnL%2BhPGKOxfeU9gE0aUWl7yg6BShobHGROy5D6EqhFidMgWw3TiwrRbozXwl58hTc09%2F4cTRBE6PR7BfwcLhTr)
*   minikube：在本地轻松运行一个单节点 Kubernetes 群集的工具。
*   [简单几步，无坑部署最小化 K8S 集群](https://link.segmentfault.com/?enc=fts8jSmJqXxfwxMXeKwDcQ%3D%3D.OdH3uStnduxVHtJgERZIPbJ0hxQKWKpFlSDgeuXdRTBS4AOvqfF9jK8nu%2BV34k%2FBUnnxWuB%2FiqNLbc79ucCs6z3Ng4S%2FhQDUSl696XCVM6vjvQCB0oeFMy%2BuwRr9gMgkWdlObLcaAgl5WnynDYl2LFkoHPWf9VVustDZZnnbfhyMg46aAq13ABG%2BQAVIFajZWDWjcPJu4HBblxRyIFEAamODZUqD5SEaD3gdj%2FajCmNoJHFmlVdLYpbgtqHP6Mz5m0Dx7fUBUK5YuzB%2B96b9hYxdNu%2BrXNOLkOaybqWg%2BlA2eaAfPToItzWv1k5NFcro)
*   [Kubernetes 部署如此简单，看完全明白了](https://link.segmentfault.com/?enc=%2F073uIfp%2FjyzrTWP20A3gA%3D%3D.7Is%2B4GkRzMyZ9UvP7t%2BNklv5L%2FYgeB7TY0tu9tkCSc3xCXhqBUXi3T9Da8ISdTmmOrzMk8YEcQl0ELrmMPjT%2FEMnofpIhFvfn5mQtkNJeBqQ9FGknV0jLaJcCv9AOhHEyxf3iv%2Bm0BeTJzNSaAo5skJl5yA3bS6eJ4XPwCStHO8f0Ifhh7W9mivHhKiiEJRAH2LwVQ6R%2Bcskt2ZaVTbibWmr5aAgD3jL0Be7sFHguVz0NgbM9yiW5u2p%2FLoded%2Bqw7O4UupgnZYDadFmFHG4pFg61sGali2VBSuWDsCqfbM8CdK0XqYH0EIue360yUGN)

## 简述Kubernetes如何实现集群管理？

在集群管理方面，[Kubernetes将集群](https://link.segmentfault.com/?enc=FyUEG0cbh8YzXEFPVa8tPw%3D%3D.1BG81ZxnuXhZlssbxG7ShECReiMc8gwHR9FiKhZlQjHxz7iXkoC%2FAfYD7USbqnZi4jlUsXdpRRUuCbhRuowc%2BZGGnG8xugAqCJhIeh7ZsUEcAubMCkRK4%2FJWKDgbkVVJzikOfMAIHDLGmCRJi60JcOhDBqdndbCJzacfyV%2BmIPXyMiSd2uGSBgu4LKNklDdWa%2BDE1uELD%2BNyrb1VlmCDhbke25i4q7Zz5RVwMUnXf33VZZuhYTYs1PxYa3AFX7RNzkYUlavJtmolpHnciWJ%2FQqu4NesnO7hP8RF4OnBLvqYUtURyn0GwFdTEKhIJNpfq)中的机器划分为一个Master节点和一群工作节点Node。其中，在Master节点运行着集群管理相关的一组进程kube-apiserver、kube-controller-manager和kube-scheduler，这些进程实现了整个集群的资源管理、Pod调度、弹性伸缩、安全控制、系统监控和纠错等管理能力，并且都是全自动完成的。推荐大家看看：[轻松管理 Kubernetes 集群的7个工具](https://link.segmentfault.com/?enc=Nn0OhuKVikY2co1MSpHb3w%3D%3D.5qTMZchsUTuBQpneJ46fK7OkY9VEc1MRuWpu4BvPx2cQWLax2nnHxxH4qDGym85Oh86utKNaEAtminHLTvXgPb43xJMp37NizgNAEcgL%2F6gLBayG2rG8mIV7A7YM%2BiIuUbC4w3L5Hqf7S0yUVPbjOqiKZ3wFli1W2fpFnAlHzlBxlvspD3uluGjGpS2JaUfG4pft9NC8ZhPBUhJ3zifq3vdZkkk2prBOfrxDIWC1jCEyJeAoHUc05IBeMI59HY3jEI7clYeToQ7%2BsrsWnIx84KJ26N4yBAYjCaoZN52gRzWivlXJdmpCERWz2bE7Xk7p)。

## 简述Kubernetes的优势、适应场景及其特点？

[Kubernetes](https://link.segmentfault.com/?enc=AlC6C77h9OD0X4dAT5cNwg%3D%3D.qwzGQXzjXb9fPhLIGWImU7lUpihFBmXRVn0RcMw9XZ8blgsypJUy9gu4hAi4uNhJvi%2Blh4OlIcnRfrptO9m2WhrJIT7J%2FhAJ%2FbJ1%2BaJNDmHe6HSt3YG3TeG0UOtV0%2Fdi%2BrnJQan2iRsoAu3qGaEh6HcKHgPl3fQGfEkOwyC6EcWkYYmme%2BNr7itpg1rIhLIO7QoH3u5XA2qhES0DmH%2BLLBXfGYf6E01vem5qrlBUeGDzS0pacBNBnDF9U8psg1N0wZ4u0eSTM8Z57mm9Ux5sFCD61hce%2ByA32wMTC3u8YBQk019v9X3KQ%2BLhqTcvBx99)作为一个完备的分布式系统支撑平台，其主要优势：

*   容器编排
*   轻量级
*   开源
*   弹性伸缩
*   负载均衡

[Kubernetes](https://link.segmentfault.com/?enc=E13hKn3oN9ghJVh5Wvvlmg%3D%3D.G6TR%2BZDu8jGoqE7Y4y%2Fp5VeFr50muonJ7OW6o4eJcO1pfHRw%2B2AoZEewoXelLRKSw4A%2BFPMb3sO7LUJUxkhKzLnvNm8vZ%2B96V2v339QOlSm0UwN9yfQSvJ6OoGSwPdKsKN2Mfci408f8yApGUa8QCaS9KIDaJJ0z1I3DiB8p7kfQOPmPlmYaGuEH9QqPY4gg%2BIYbP064FBivqWgxrWsCB0po0LJ2PRm2uE4LbEMm2bFkQEN1FN4ykV%2BT8MikI4py5tlMk8sufsyzPkDF3BI12vImdj6UEidH%2BNOYzj5uqjal%2FoytdV3c7FfvgQaPfdtI)常见场景：

*   快速部署应用
*   快速扩展应用
*   无缝对接新的应用功能
*   节省资源，优化硬件资源的使用

Kubernetes相关特点：

*   可移植: 支持公有云、私有云、混合云、多重云（multi-cloud）。
*   可扩展: 模块化,、插件化、可挂载、可组合。
*   自动化: 自动部署、自动重启、自动复制、自动伸缩/扩展。

## 简述Kubernetes的缺点或当前的不足之处？

Kubernetes当前存在的缺点（不足）如下：

*   安装过程和配置相对困难复杂。
*   管理服务相对繁琐。
*   运行和编译需要很多时间。
*   它比其他替代品更昂贵。
*   对于简单的应用程序来说，可能不需要涉及Kubernetes即可满足。

## 简述Kubernetes相关基础概念？

master：[k8s集群](https://link.segmentfault.com/?enc=UxDhqMSaKotgYoFAs19p6A%3D%3D.MoyONq%2ByGCP9CN%2FYmP797mKoabQOw8iXTyyYPZ1lJP7uih0BeG91YhE2Auk3VqPCVCqnuZrSAYeFutIqLAY89bMplCi8QgvhCoAmqjAmjgKDEOdUgOuT13CQ%2FWmkrvBkGzpsH%2BeHdpdyHGJYJbx0IZD1spDlR%2BzAfYB5gIdV9Ithcqhxi9CoxMauTNzE3URBAjT6GBls%2Fc77dXDFmQRWIu%2BjmYypbmHKU0lzoJUJY8sjRNpi8F3cxQHu1RNgodl0IxdTeeKPE4nhzGIxp1gqspDT%2BPdmYoxloqhhyiMgy0Ysc6iaaJUNrPLddS7ZdGge)的管理节点，负责管理集群，提供集群的资源数据访问入口。拥有Etcd存储服务（可选），运行Api Server进程，Controller Manager服务进程及Scheduler服务进程。

node（worker）：Node（worker）是Kubernetes集群架构中运行Pod的服务节点，是Kubernetes集群操作的单元，用来承载被分配Pod的运行，是Pod运行的宿主机。运行docker eninge服务，守护进程kunelet及负载均衡器kube-proxy。

pod：运行于Node节点上，若干相关容器的组合([Kubernetes 之 Pod 实现原理](https://link.segmentfault.com/?enc=k0fk0u57Yaud7YGPf0DzFA%3D%3D.rmud0HAIqm9vq9WvOyjGN9Z8ls6Llx13X3k1Kfdg86Egf0nhTvA%2FJKH7Pko9zf9uAjQj0FGgP8q3dFPiyYR1b2k9feFb2ai2zgFWONk8vOrnDTrteHU0j1y5xpRbuHc68fl8o%2BI2iSkYH3aG8anL5cAD0sYQsP%2F3P43NK0D8PWAkYhCj9dbXzgHF54VuoipFJ%2BYn75gwlGAfUCSIh8XxXYMURoCk047Y1pO40hO8BPZDeNBGC4fhu%2BYJH6Q2LCY9f7JA5KKAMz99Apz1Ip9ygpbLB%2BtSlMxuvhFZfi7xye6Gg3wTof96Q0lEXHghcVky))。Pod内包含的容器运行在同一宿主机上，使用相同的网络命名空间、IP地址和端口，能够通过localhost进行通信。Pod是[Kurbernetes](https://link.segmentfault.com/?enc=HAA1W2K2cgFL9C38s7axjw%3D%3D.PSafDGxVr2ZPFAGnRFXcBZ4FN6KVsgimAB2CEVs%2BWEp6CEbTMtEr7Uz%2FfV3l1507oxiaq97JVdHrv3SQRhSd%2B4fF7koqQy1i7rGVOrnBWeckl5nHHQ0UrEq8BKgIYRRSW5rrt02mEUMMSYOyyvGg3jIAznlTmytm323ZMBINpHWA1XPWoVRFFhOSs2oxjVUh2eHJunlnUvG1K8pLpBMpAoqNTkPEzLE%2BB%2FN3yYOM%2BANbwrWH%2BayTpQAP6xAokBFFESc0djqni%2FEnKblJ4w0nhcRrMK2QYDxCOiyw6roivJNW%2BeuSuGehO5RK1Hh5i%2Fzf)进行创建、调度和管理的最小单位，它提供了比容器更高层次的抽象，使得部署和管理更加灵活。一个Pod可以包含一个容器或者多个相关容器。

label：[Kubernetes](https://link.segmentfault.com/?enc=sH1Jq27sGnWtU7Y50zlxag%3D%3D.JE1Y4Oz6jQeYBJGEaKmafBn66g6%2Fvls36aeuokndIkThd8M3Afyb3dmPDBcGc6cKqVlqaM55oRcMTcUwaQUvUCjKkYM1DH1knl%2FR9%2BFp70j6EB5uA5Vp0FX%2BoGGw2blccY6MvqVhpi1Nl7meHgTG86KGcvNrXb%2BGdPtetM2pDKVzelLb%2FFBG5BrwgUj5Yj3cttH5SSyIp3WMMh0dfMrneQNK3YBzIFeq1EqKWhcP0nwv8GLCCqMpTnZ9MmH2j3Tm05harVwmR0BJSR1Om5pTe7q2UgoaxPhFEhTZyQWhiCYl7Cbn6P4dR1x9jYPNSjBG)中的Label实质是一系列的Key/Value键值对，其中key与value可自定义。Label可以附加到各种资源对象上，如Node、Pod、Service、RC等。一个资源对象可以定义任意数量的Label，同一个Label也可以被添加到任意数量的资源对象上去。Kubernetes通过Label Selector（标签选择器）查询和筛选资源对象。

Replication Controller：Replication Controller用来管理Pod的副本，保证集群中存在指定数量的Pod副本。集群中副本的数量大于指定数量，则会停止指定数量之外的多余容器数量。反之，则会启动少于指定数量个数的容器，保证数量不变。Replication Controller是实现弹性伸缩、动态扩容和滚动升级的核心。

Deployment：Deployment在内部使用了RS来实现目的，Deployment相当于RC的一次升级，其最大的特色为可以随时获知当前Pod的部署进度。

HPA（Horizontal Pod Autoscaler）：Pod的横向自动扩容，也是Kubernetes的一种资源，通过追踪分析RC控制的所有Pod目标的负载变化情况，来确定是否需要针对性的调整Pod副本数量。

Service：Service([Kubernetes 之服务发现](https://link.segmentfault.com/?enc=SFjpakHfJB5WkhmMt%2FxOww%3D%3D.polT9csK7cpdKew5rgqy%2FXPneLHNrkrQLrsQDVpLWMaV1y0v4ae9%2F3mAeir2S%2BsRxG4GTqs6tjJ5tG9bwRpdy4JL37V8SF7NmOODpoHTWO7IuKnjdugKUbefejAyBPXXu3GdKQDmW5fuTByoqcHA8PSGprfwOU4vwJGbVfASO7dkYZodn7xtjTKGdE6od8HCSoe%2BmYHyTGhspaJr2OaC5Ro%2B1THLljKXll7kQ8xq4JglXBcsjslqwxNLtNFLKs9AhjXOqNsJFudeAyzDSQ05i6r5lsDdr07nPrftSGrwB3UIeVcaQWfCeEaqpxDL4mD7))定义了Pod的逻辑集合和访问该集合的策略，是真实服务的抽象。Service提供了一个统一的服务访问入口以及服务代理和发现机制，关联多个相同Label的Pod，用户不需要了解后台Pod是如何运行。

Volume：Volume是Pod中能够被多个容器访问的共享目录，[Kubernetes](https://link.segmentfault.com/?enc=4dwYSyyHFUWEIizOtz77YA%3D%3D.HooEsjmQZO%2BQIX7782B2voZAigG5s4kMjwDhhqLmbAwuNpGMhmelnu1EQLmRJTxqTojd98KkcozUXqDvpnKo0IVgOUma8e06%2Br2NNchnNwDF0xrG4ufwqD%2BcfQTCnQEjx%2F%2FjPgjeROCmwUb4U%2BPseR88Lpv952hTMX3R1g10ipy%2FUzUP05IcexQ8p9jo6zQ7trTnYwxSCZM1Y8b95ZIVWaFHmLgTufqqcsptfLU2LEzETv90GFKbS35lv6HZUZTALFh0OxC5QF7a2F%2FFd3ufY26LDgS9xiUpejolZRl%2BMRRxVYqJFrcB0yWdjAiz7gom)中的Volume是定义在Pod上，可以被一个或多个Pod中的容器挂载到某个目录下。

Namespace：Namespace用于实现多租户的资源隔离，可将集群内部的资源对象分配到不同的Namespace中，形成逻辑上的不同项目、小组或用户组，便于不同的Namespace在共享使用整个集群的资源的同时还能被分别管理。

## 简述Kubernetes集群相关组件？

[Kubernetes](https://link.segmentfault.com/?enc=Po0epCdgsSZ%2BAYdY16Sq5Q%3D%3D.EkVU0W3c50vV%2FhUHmX%2BZqHp%2B3%2BOTVA6WoUsvHlcTBRb0kFu%2BjSfYYKLsYZxQmhmYuqXEDADfaht3ih9p3r%2Fp8ZxaQqIhdZPqxWTKaTqFTnb9tdTRzRhI8KSKJ8iz3OWHuUwQeS14G8Krj2gFT7QxgC2EO3Kk%2FoevmXhxyCiojc4wRX5pyrSzPE21vzXoRdX7mIJeXPjAH6%2FoVbuOvVkHTY7MjsmAeFWeO4vPXu7JrzQGzeieHrOXZOScqH3vYX38eo85eZDoc2Yu2GK1WleT7OIFkXWy4tOOncvqkeD%2Bf78D4YXnlN8lF%2F0uMGFQ0enl) Master控制组件，调度管理整个系统（集群），包含如下组件:

Kubernetes API Server：作为Kubernetes系统的入口，其封装了核心对象的增删改查操作，以RESTful API接口方式提供给外部客户和内部组件调用，集群内各个功能模块之间数据交互和通信的中心枢纽。

Kubernetes Scheduler：为新建立的Pod进行节点(node)选择(即分配机器)，负责集群的资源调度。

Kubernetes Controller：负责执行各种控制器，目前已经提供了很多控制器来保证Kubernetes的正常运行。

Replication Controller：管理维护Replication Controller，关联Replication Controller和Pod，保证Replication Controller定义的副本数量与实际运行Pod数量一致。

Node Controller：管理维护Node，定期检查Node的健康状态，标识出(失效|未失效)的Node节点。

Namespace Controller：管理维护Namespace，定期清理无效的Namespace，包括Namesapce下的API对象，比如Pod、Service等。

Service Controller：管理维护Service，提供负载以及服务代理。

EndPoints Controller：管理维护Endpoints，关联Service和Pod，创建Endpoints为Service的后端，当Pod发生变化时，实时更新Endpoints。

Service Account Controller：管理维护Service Account，为每个Namespace创建默认的Service Account，同时为Service Account创建Service Account Secret。

Persistent Volume Controller：管理维护Persistent Volume和Persistent Volume Claim，为新的Persistent Volume Claim分配Persistent Volume进行绑定，为释放的Persistent Volume执行清理回收。

Daemon Set Controller：管理维护Daemon Set，负责创建Daemon Pod，保证指定的Node上正常的运行Daemon Pod。

Deployment Controller：管理维护Deployment，关联Deployment和Replication Controller，保证运行指定数量的Pod。当Deployment更新时，控制实现Replication Controller和Pod的更新。

Job Controller：管理维护Job，为Jod创建一次性任务Pod，保证完成Job指定完成的任务数目

Pod Autoscaler Controller：实现Pod的自动伸缩，定时获取监控数据，进行策略匹配，当满足条件时执行Pod的伸缩动作。

## 简述Kubernetes RC的机制？

Replication Controller用来管理Pod的副本，保证集群中存在指定数量的Pod副本。当定义了RC并提交至Kubernetes集群中之后，Master节点上的Controller Manager组件获悉，并同时巡检系统中当前存活的目标Pod，并确保目标Pod实例的数量刚好等于此RC的期望值，若存在过多的Pod副本在运行，系统会停止一些Pod，反之则自动创建一些Pod。

简述Kubernetes Replica Set 和 Replication Controller 之间有什么区别？Replica Set 和 Replication Controller 类似，都是确保在任何给定时间运行指定数量的 Pod 副本。不同之处在于RS 使用基于集合的选择器，而 Replication Controller 使用基于权限的选择器。

## 简述kube-proxy作用？

kube-proxy 运行在所有节点上，它监听 apiserver 中 service 和 endpoint 的变化情况，创建路由规则以提供服务 IP 和负载均衡功能。简单理解此进程是Service的透明代理兼负载均衡器，其核心功能是将到某个Service的访问请求转发到后端的多个Pod实例上。

## 简述kube-proxy iptables原理？

Kubernetes从1.2版本开始，将iptables作为kube-proxy的默认模式。iptables模式下的kube-proxy不再起到Proxy的作用，其核心功能：通过API Server的Watch接口实时跟踪Service与Endpoint的变更信息，并更新对应的iptables规则，Client的请求流量则通过iptables的NAT机制“直接路由”到目标Pod。

## 简述kube-proxy ipvs原理？

IPVS在Kubernetes1.11中升级为GA稳定版。IPVS则专门用于高性能负载均衡，并使用更高效的数据结构（Hash表），允许几乎无限的规模扩张，因此被kube-proxy采纳为最新模式。

在IPVS模式下，使用iptables的扩展ipset，而不是直接调用iptables来生成规则链。iptables规则链是一个线性的数据结构，ipset则引入了带索引的数据结构，因此当规则很多时，也可以很高效地查找和匹配。

可以将ipset简单理解为一个IP（段）的集合，这个集合的内容可以是IP地址、IP网段、端口等，iptables可以直接添加规则对这个“可变的集合”进行操作，这样做的好处在于可以大大减少iptables规则的数量，从而减少性能损耗。

## 简述kube-proxy ipvs和iptables的异同？

iptables与IPVS都是基于Netfilter实现的，但因为定位不同，二者有着本质的差别：iptables是为防火墙而设计的；IPVS则专门用于高性能负载均衡，并使用更高效的数据结构（Hash表），允许几乎无限的规模扩张。

与iptables相比，IPVS拥有以下明显优势：

*   1、为大型集群提供了更好的可扩展性和性能；
*   2、支持比iptables更复杂的复制均衡算法（最小负载、最少连接、加权等）；
*   3、支持服务器健康检查和连接重试等功能；
*   4、可以动态修改ipset的集合，即使iptables的规则正在使用这个集合。

## 简述Kubernetes中什么是静态Pod？

静态pod是由kubelet进行管理的仅存在于特定Node的Pod上，他们不能通过API Server进行管理，无法与ReplicationController、Deployment或者DaemonSet进行关联，并且kubelet无法对他们进行健康检查。静态Pod总是由kubelet进行创建，并且总是在kubelet所在的Node上运行。

## 简述Kubernetes中Pod可能位于的状态？

Pending：API Server已经创建该Pod，且Pod内还有一个或多个容器的镜像没有创建，包括正在下载镜像的过程。

Running：Pod内所有容器均已创建，且至少有一个容器处于运行状态、正在启动状态或正在重启状态。

Succeeded：Pod内所有容器均成功执行退出，且不会重启。

Failed：Pod内所有容器均已退出，但至少有一个容器退出为失败状态。

Unknown：由于某种原因无法获取该Pod状态，可能由于网络通信不畅导致。

## 简述Kubernetes创建一个Pod的主要流程？

Kubernetes中创建一个Pod涉及多个组件之间联动，主要流程如下：

*   1、客户端提交Pod的配置信息（可以是yaml文件定义的信息）到kube-apiserver。
*   2、Apiserver收到指令后，通知给controller-manager创建一个资源对象。
*   3、Controller-manager通过api-server将pod的配置信息存储到ETCD数据中心中。
*   4、Kube-scheduler检测到pod信息会开始调度预选，会先过滤掉不符合Pod资源配置要求的节点，然后开始调度调优，主要是挑选出更适合运行pod的节点，然后将pod的资源配置单发送到node节点上的kubelet组件上。
*   5、Kubelet根据scheduler发来的资源配置单运行pod，运行成功后，将pod的运行信息返回给scheduler，scheduler将返回的pod运行状况的信息存储到etcd数据中心。

## 简述Kubernetes中Pod的重启策略？

Pod重启策略（RestartPolicy）应用于Pod内的所有容器，并且仅在Pod所处的Node上由kubelet进行判断和重启操作。当某个容器异常退出或者健康检查失败时，kubelet将根据RestartPolicy的设置来进行相应操作。

Pod的重启策略包括Always、OnFailure和Never，默认值为Always。

*   Always：当容器失效时，由kubelet自动重启该容器；
*   OnFailure：当容器终止运行且退出码不为0时，由kubelet自动重启该容器；
*   Never：不论容器运行状态如何，kubelet都不会重启该容器。

同时Pod的重启策略与控制方式关联，当前可用于管理Pod的控制器包括ReplicationController、Job、DaemonSet及直接管理kubelet管理（静态Pod）。

不同控制器的重启策略限制如下：

*   RC和DaemonSet：必须设置为Always，需要保证该容器持续运行；
*   Job：OnFailure或Never，确保容器执行完成后不再重启；
*   kubelet：在Pod失效时重启，不论将RestartPolicy设置为何值，也不会对Pod进行健康检查。

## 简述Kubernetes中Pod的健康检查方式？

对Pod的健康检查可以通过两类探针来检查：LivenessProbe和ReadinessProbe。

LivenessProbe探针：用于判断容器是否存活（running状态），如果LivenessProbe探针探测到容器不健康，则kubelet将杀掉该容器，并根据容器的重启策略做相应处理。若一个容器不包含LivenessProbe探针，kubelet认为该容器的LivenessProbe探针返回值用于是“Success”。

ReadineeProbe探针：用于判断容器是否启动完成（ready状态）。如果ReadinessProbe探针探测到失败，则Pod的状态将被修改。Endpoint Controller将从Service的Endpoint中删除包含该容器所在Pod的Eenpoint。

startupProbe探针：启动检查机制，应用一些启动缓慢的业务，避免业务长时间启动而被上面两类探针kill掉。

## 简述Kubernetes Pod的LivenessProbe探针的常见方式？

kubelet定期执行LivenessProbe探针来诊断容器的健康状态，通常有以下三种方式：

ExecAction：在容器内执行一个命令，若返回码为0，则表明容器健康。

TCPSocketAction：通过容器的IP地址和端口号执行TCP检查，若能建立TCP连接，则表明容器健康。

HTTPGetAction：通过容器的IP地址、端口号及路径调用HTTP Get方法，若响应的状态码大于等于200且小于400，则表明容器健康。

## 简述Kubernetes Pod的常见调度方式？

Kubernetes中，Pod通常是容器的载体，主要有如下常见调度方式：

*   Deployment或RC：该调度策略主要功能就是自动部署一个容器应用的多份副本，以及持续监控副本的数量，在集群内始终维持用户指定的副本数量。
*   NodeSelector：定向调度，当需要手动指定将Pod调度到特定Node上，可以通过Node的标签（Label）和Pod的nodeSelector属性相匹配。
*   NodeAffinity亲和性调度：亲和性调度机制极大的扩展了Pod的调度能力，目前有两种节点亲和力表达：
*   requiredDuringSchedulingIgnoredDuringExecution：硬规则，必须满足指定的规则，调度器才可以调度Pod至Node上（类似nodeSelector，语法不同）。
*   preferredDuringSchedulingIgnoredDuringExecution：软规则，优先调度至满足的Node的节点，但不强求，多个优先级规则还可以设置权重值。
*   Taints和Tolerations（污点和容忍）：
*   Taint：使Node拒绝特定Pod运行；
*   Toleration：为Pod的属性，表示Pod能容忍（运行）标注了Taint的Node。

## 简述Kubernetes初始化容器（init container）？

init container的运行方式与应用容器不同，它们必须先于应用容器执行完成，当设置了多个init container时，将按顺序逐个运行，并且只有前一个init container运行成功后才能运行后一个init container。当所有init container都成功运行后，Kubernetes才会初始化Pod的各种信息，并开始创建和运行应用容器。

## 简述Kubernetes deployment升级过程？

*   初始创建Deployment时，系统创建了一个ReplicaSet，并按用户的需求创建了对应数量的Pod副本。
*   当更新Deployment时，系统创建了一个新的ReplicaSet，并将其副本数量扩展到1，然后将旧ReplicaSet缩减为2。
*   之后，系统继续按照相同的更新策略对新旧两个ReplicaSet进行逐个调整。
*   最后，新的ReplicaSet运行了对应个新版本Pod副本，旧的ReplicaSet副本数量则缩减为0。

## 简述Kubernetes deployment升级策略？

在Deployment的定义中，可以通过spec.strategy指定Pod更新的策略，目前支持两种策略：Recreate（重建）和RollingUpdate（滚动更新），默认值为RollingUpdate。

Recreate：设置spec.strategy.type=Recreate，表示Deployment在更新Pod时，会先杀掉所有正在运行的Pod，然后创建新的Pod。

RollingUpdate：设置spec.strategy.type=RollingUpdate，表示Deployment会以滚动更新的方式来逐个更新Pod。同时，可以通过设置spec.strategy.rollingUpdate下的两个参数（maxUnavailable和maxSurge）来控制滚动更新的过程。

## 简述Kubernetes DaemonSet类型的资源特性？

DaemonSet资源对象会在每个Kubernetes集群中的节点上运行，并且每个节点只能运行一个pod，这是它和deployment资源对象的最大也是唯一的区别。因此，在定义yaml文件中，不支持定义replicas。

它的一般使用场景如下：

*   在去做每个节点的日志收集工作。
*   监控每个节点的的运行状态。

## 简述Kubernetes自动扩容机制？

Kubernetes使用Horizontal Pod Autoscaler（HPA）的控制器实现基于CPU使用率进行自动Pod扩缩容的功能。HPA控制器周期性地监测目标Pod的资源性能指标，并与HPA资源对象中的扩缩容条件进行对比，在满足条件时对Pod副本数量进行调整。

*   HPA原理

Kubernetes中的某个Metrics Server（Heapster或自定义Metrics Server）持续采集所有Pod副本的指标数据。HPA控制器通过Metrics Server的API（Heapster的API或聚合API）获取这些数据，基于用户定义的扩缩容规则进行计算，得到目标Pod副本数量。

当目标Pod副本数量与当前副本数量不同时，HPA控制器就向Pod的副本控制器（Deployment、RC或ReplicaSet）发起scale操作，调整Pod的副本数量，完成扩缩容操作。

## 简述Kubernetes Service类型？

通过创建Service，可以为一组具有相同功能的容器应用提供一个统一的入口地址，并且将请求负载分发到后端的各个容器应用上。其主要类型有：

*   ClusterIP：虚拟的服务IP地址，该地址用于Kubernetes集群内部的Pod访问，在Node上kube-proxy通过设置的iptables规则进行转发；
*   NodePort：使用宿主机的端口，使能够访问各Node的外部客户端通过Node的IP地址和端口号就能访问服务；
*   LoadBalancer：使用外接负载均衡器完成到服务的负载分发，需要在spec.status.loadBalancer字段指定外部负载均衡器的IP地址，通常用于公有云。

## 简述Kubernetes Service分发后端的策略？

Service负载分发的策略有：RoundRobin和SessionAffinity

*   RoundRobin：默认为轮询模式，即轮询将请求转发到后端的各个Pod上。
*   SessionAffinity：基于客户端IP地址进行会话保持的模式，即第1次将某个客户端发起的请求转发到后端的某个Pod上，之后从相同的客户端发起的请求都将被转发到后端相同的Pod上。

## 简述Kubernetes Headless Service？

在某些应用场景中，若需要人为指定负载均衡器，不使用Service提供的默认负载均衡的功能，或者应用程序希望知道属于同组服务的其他实例。Kubernetes提供了Headless Service来实现这种功能，即不为Service设置ClusterIP（入口IP地址），仅通过Label Selector将后端的Pod列表返回给调用的客户端。

## 简述Kubernetes外部如何访问集群内的服务？

对于Kubernetes，集群外的客户端默认情况，无法通过Pod的IP地址或者Service的虚拟IP地址:虚拟端口号进行访问。通常可以通过以下方式进行访问Kubernetes集群内的服务：

映射Pod到物理机：将Pod端口号映射到宿主机，即在Pod中采用hostPort方式，以使客户端应用能够通过物理机访问容器应用。

映射Service到物理机：将Service端口号映射到宿主机，即在Service中采用nodePort方式，以使客户端应用能够通过物理机访问容器应用。

映射Sercie到LoadBalancer：通过设置LoadBalancer映射到云服务商提供的LoadBalancer地址。这种用法仅用于在公有云服务提供商的云平台上设置Service的场景。

## 简述Kubernetes ingress？

Kubernetes的Ingress资源对象，用于将不同URL的访问请求转发到后端不同的Service，以实现HTTP层的业务路由机制。

Kubernetes使用了Ingress策略和Ingress Controller，两者结合并实现了一个完整的Ingress负载均衡器。使用Ingress进行负载分发时，Ingress Controller基于Ingress规则将客户端请求直接转发到Service对应的后端Endpoint（Pod）上，从而跳过kube-proxy的转发功能，kube-proxy不再起作用，全过程为：ingress controller + ingress 规则 ----> services。

同时当Ingress Controller提供的是对外服务，则实际上实现的是边缘路由器的功能。

## 简述Kubernetes镜像的下载策略？

K8s的镜像下载策略有三种：Always、Never、IFNotPresent。

*   Always：镜像标签为latest时，总是从指定的仓库中获取镜像。
*   Never：禁止从仓库中下载镜像，也就是说只能使用本地镜像。
*   IfNotPresent：仅当本地没有对应镜像时，才从目标仓库中下载。默认的镜像下载策略是：当镜像标签是latest时，默认策略是Always；当镜像标签是自定义时（也就是标签不是latest），那么默认策略是IfNotPresent。

## 简述Kubernetes的负载均衡器？

负载均衡器是暴露服务的最常见和标准方式之一。

根据工作环境使用两种类型的负载均衡器，即内部负载均衡器或外部负载均衡器。内部负载均衡器自动平衡负载并使用所需配置分配容器，而外部负载均衡器将流量从外部负载引导至后端容器。

## 简述Kubernetes各模块如何与API Server通信？

Kubernetes API Server作为集群的核心，负责集群各功能模块之间的通信。集群内的各个功能模块通过API Server将信息存入etcd，当需要获取和操作这些数据时，则通过API Server提供的REST接口（用GET、LIST或WATCH方法）来实现，从而实现各模块之间的信息交互。

如kubelet进程与API Server的交互：每个Node上的kubelet每隔一个时间周期，就会调用一次API Server的REST接口报告自身状态，API Server在接收到这些信息后，会将节点状态信息更新到etcd中。

如kube-controller-manager进程与API Server的交互：kube-controller-manager中的Node Controller模块通过API Server提供的Watch接口实时监控Node的信息，并做相应处理。

如kube-scheduler进程与API Server的交互：Scheduler通过API Server的Watch接口监听到新建Pod副本的信息后，会检索所有符合该Pod要求的Node列表，开始执行Pod调度逻辑，在调度成功后将Pod绑定到目标节点上。

## 简述Kubernetes Scheduler作用及实现原理？

Kubernetes Scheduler是负责Pod调度的重要功能模块，Kubernetes Scheduler在整个系统中承担了“承上启下”的重要功能，“承上”是指它负责接收Controller Manager创建的新Pod，为其调度至目标Node；“启下”是指调度完成后，目标Node上的kubelet服务进程接管后继工作，负责Pod接下来生命周期。

Kubernetes Scheduler的作用是将待调度的Pod（API新创建的Pod、Controller Manager为补足副本而创建的Pod等）按照特定的调度算法和调度策略绑定（Binding）到集群中某个合适的Node上，并将绑定信息写入etcd中。

在整个调度过程中涉及三个对象，分别是待调度Pod列表、可用Node列表，以及调度算法和策略。

Kubernetes Scheduler通过调度算法调度为待调度Pod列表中的每个Pod从Node列表中选择一个最适合的Node来实现Pod的调度。随后，目标节点上的kubelet通过API Server监听到Kubernetes Scheduler产生的Pod绑定事件，然后获取对应的Pod清单，下载Image镜像并启动容器。

## 简述Kubernetes Scheduler使用哪两种算法将Pod绑定到worker节点？

Kubernetes Scheduler根据如下两种调度算法将 Pod 绑定到最合适的工作节点：

预选（Predicates）：输入是所有节点，输出是满足预选条件的节点。kube-scheduler根据预选策略过滤掉不满足策略的Nodes。如果某节点的资源不足或者不满足预选策略的条件则无法通过预选。如“Node的label必须与Pod的Selector一致”。

优选（Priorities）：输入是预选阶段筛选出的节点，优选会根据优先策略为通过预选的Nodes进行打分排名，选择得分最高的Node。例如，资源越富裕、负载越小的Node可能具有越高的排名。

## 简述Kubernetes kubelet的作用？

在Kubernetes集群中，在每个Node（又称Worker）上都会启动一个kubelet服务进程。该进程用于处理Master下发到本节点的任务，管理Pod及Pod中的容器。每个kubelet进程都会在API Server上注册节点自身的信息，定期向Master汇报节点资源的使用情况，并通过cAdvisor监控容器和节点资源。

## 简述Kubernetes kubelet监控Worker节点资源是使用什么组件来实现的？

kubelet使用cAdvisor对worker节点资源进行监控。在 Kubernetes 系统中，cAdvisor 已被默认集成到 kubelet 组件内，当 kubelet 服务启动时，它会自动启动 cAdvisor 服务，然后 cAdvisor 会实时采集所在节点的性能指标及在节点上运行的容器的性能指标。

## 简述Kubernetes如何保证集群的安全性？

Kubernetes通过一系列机制来实现集群的安全控制，主要有如下不同的维度：

*   基础设施方面：保证容器与其所在宿主机的隔离；
*   权限方面：
*   最小权限原则：合理限制所有组件的权限，确保组件只执行它被授权的行为，通过限制单个组件的能力来限制它的权限范围。
*   用户权限：划分普通用户和管理员的角色。
*   集群方面：
*   API Server的认证授权：Kubernetes集群中所有资源的访问和变更都是通过Kubernetes API Server来实现的，因此需要建议采用更安全的HTTPS或Token来识别和认证客户端身份（Authentication），以及随后访问权限的授权（Authorization）环节。
*   API Server的授权管理：通过授权策略来决定一个API调用是否合法。对合法用户进行授权并且随后在用户访问时进行鉴权，建议采用更安全的RBAC方式来提升集群安全授权。
*   敏感数据引入Secret机制：对于集群敏感数据建议使用Secret方式进行保护。
*   AdmissionControl（准入机制）：对kubernetes api的请求过程中，顺序为：先经过认证 & 授权，然后执行准入操作，最后对目标对象进行操作。

## 简述Kubernetes准入机制？

在对集群进行请求时，每个准入控制代码都按照一定顺序执行。如果有一个准入控制拒绝了此次请求，那么整个请求的结果将会立即返回，并提示用户相应的error信息。

准入控制（AdmissionControl）准入控制本质上为一段准入代码，在对kubernetes api的请求过程中，顺序为：先经过认证 & 授权，然后执行准入操作，最后对目标对象进行操作。常用组件（控制代码）如下：

*   AlwaysAdmit：允许所有请求
*   AlwaysDeny：禁止所有请求，多用于测试环境。
*   ServiceAccount：它将serviceAccounts实现了自动化，它会辅助serviceAccount做一些事情，比如如果pod没有serviceAccount属性，它会自动添加一个default，并确保pod的serviceAccount始终存在。
*   LimitRanger：观察所有的请求，确保没有违反已经定义好的约束条件，这些条件定义在namespace中LimitRange对象中。
*   NamespaceExists：观察所有的请求，如果请求尝试创建一个不存在的namespace，则这个请求被拒绝。

## 简述Kubernetes RBAC及其特点（优势）？

RBAC是基于角色的访问控制，是一种基于个人用户的角色来管理对计算机或网络资源的访问的方法。

相对于其他授权模式，RBAC具有如下优势：

*   对集群中的资源和非资源权限均有完整的覆盖。
*   整个RBAC完全由几个API对象完成， 同其他API对象一样， 可以用kubectl或API进行操作。
*   可以在运行时进行调整，无须重新启动API Server。

## 简述Kubernetes Secret作用？

Secret对象，主要作用是保管私密数据，比如密码、OAuth Tokens、SSH Keys等信息。将这些私密信息放在Secret对象中比直接放在Pod或Docker Image中更安全，也更便于使用和分发。

## 简述Kubernetes Secret有哪些使用方式？

创建完secret之后，可通过如下三种方式使用：

*   在创建Pod时，通过为Pod指定Service Account来自动使用该Secret。
*   通过挂载该Secret到Pod来使用它。
*   在Docker镜像下载时使用，通过指定Pod的spc.ImagePullSecrets来引用它。

## 简述Kubernetes PodSecurityPolicy机制？

Kubernetes PodSecurityPolicy是为了更精细地控制Pod对资源的使用方式以及提升安全策略。在开启PodSecurityPolicy准入控制器后，Kubernetes默认不允许创建任何Pod，需要创建PodSecurityPolicy策略和相应的RBAC授权策略（Authorizing Policies），Pod才能创建成功。

## 简述Kubernetes PodSecurityPolicy机制能实现哪些安全策略？

在PodSecurityPolicy对象中可以设置不同字段来控制Pod运行时的各种安全策略，常见的有：

*   特权模式：privileged是否允许Pod以特权模式运行。
*   宿主机资源：控制Pod对宿主机资源的控制，如hostPID：是否允许Pod共享宿主机的进程空间。
*   用户和组：设置运行容器的用户ID（范围）或组（范围）。
*   提升权限：AllowPrivilegeEscalation：设置容器内的子进程是否可以提升权限，通常在设置非root用户（MustRunAsNonRoot）时进行设置。
*   SELinux：进行SELinux的相关配置。

## 简述Kubernetes网络模型？

Kubernetes网络模型中每个Pod都拥有一个独立的IP地址，并假定所有Pod都在一个可以直接连通的、扁平的网络空间中。所以不管它们是否运行在同一个Node（宿主机）中，都要求它们可以直接通过对方的IP进行访问。设计这个原则的原因是，用户不需要额外考虑如何建立Pod之间的连接，也不需要考虑如何将容器端口映射到主机端口等问题。

同时为每个Pod都设置一个IP地址的模型使得同一个Pod内的不同容器会共享同一个网络命名空间，也就是同一个Linux网络协议栈。这就意味着同一个Pod内的容器可以通过localhost来连接对方的端口。

在Kubernetes的集群里，IP是以Pod为单位进行分配的。一个Pod内部的所有容器共享一个网络堆栈（相当于一个网络命名空间，它们的IP地址、网络设备、配置等都是共享的）。

## 简述Kubernetes CNI模型？

CNI提供了一种应用容器的插件化网络解决方案，定义对容器网络进行操作和配置的规范，通过插件的形式对CNI接口进行实现。CNI仅关注在创建容器时分配网络资源，和在销毁容器时删除网络资源。在CNI模型中只涉及两个概念：容器和网络。

容器（Container）：是拥有独立Linux网络命名空间的环境，例如使用Docker或rkt创建的容器。容器需要拥有自己的Linux网络命名空间，这是加入网络的必要条件。

网络（Network）：表示可以互连的一组实体，这些实体拥有各自独立、唯一的IP地址，可以是容器、物理机或者其他网络设备（比如路由器）等。

对容器网络的设置和操作都通过插件（Plugin）进行具体实现，CNI插件包括两种类型：CNI Plugin和IPAM（IP Address Management）Plugin。CNI Plugin负责为容器配置网络资源，IPAM Plugin负责对容器的IP地址进行分配和管理。IPAM Plugin作为CNI Plugin的一部分，与CNI Plugin协同工作。

## 简述Kubernetes网络策略？

为实现细粒度的容器间网络访问隔离策略，Kubernetes引入Network Policy。

Network Policy的主要功能是对Pod间的网络通信进行限制和准入控制，设置允许访问或禁止访问的客户端Pod列表。Network Policy定义网络策略，配合策略控制器（Policy Controller）进行策略的实现。

## 简述Kubernetes网络策略原理？

Network Policy的工作原理主要为：policy controller需要实现一个API Listener，监听用户设置的Network Policy定义，并将网络访问规则通过各Node的Agent进行实际设置（Agent则需要通过CNI网络插件实现）。

## 简述Kubernetes中flannel的作用？

Flannel可以用于Kubernetes底层网络的实现，主要作用有：

*   它能协助Kubernetes，给每一个Node上的Docker容器都分配互相不冲突的IP地址。
*   它能在这些IP地址之间建立一个覆盖网络（Overlay Network），通过这个覆盖网络，将数据包原封不动地传递到目标容器内。

## 简述Kubernetes Calico网络组件实现原理？

Calico是一个基于BGP的纯三层的网络方案，与OpenStack、Kubernetes、AWS、GCE等云平台都能够良好地集成。

Calico在每个计算节点都利用Linux Kernel实现了一个高效的vRouter来负责数据转发。每个vRouter都通过BGP协议把在本节点上运行的容器的路由信息向整个Calico网络广播，并自动设置到达其他节点的路由转发规则。

Calico保证所有容器之间的数据流量都是通过IP路由的方式完成互联互通的。Calico节点组网时可以直接利用数据中心的网络结构（L2或者L3），不需要额外的NAT、隧道或者Overlay Network，没有额外的封包解包，能够节约CPU运算，提高网络效率。

## 简述Kubernetes共享存储的作用？

Kubernetes对于有状态的容器应用或者对数据需要持久化的应用，因此需要更加可靠的存储来保存应用产生的重要数据，以便容器应用在重建之后仍然可以使用之前的数据。因此需要使用共享存储。

## 简述Kubernetes数据持久化的方式有哪些？

Kubernetes 通过数据持久化来持久化保存重要数据，常见的方式有：

EmptyDir（空目录）：没有指定要挂载宿主机上的某个目录，直接由Pod内保部映射到宿主机上。类似于docker中的manager volume。

*   场景：
*   只需要临时将数据保存在磁盘上，比如在合并/排序算法中；
*   作为两个容器的共享存储。
*   特性：
*   同个pod里面的不同容器，共享同一个持久化目录，当pod节点删除时，volume的数据也会被删除。
*   emptyDir的数据持久化的生命周期和使用的pod一致，一般是作为临时存储使用。

Hostpath：将宿主机上已存在的目录或文件挂载到容器内部。类似于docker中的bind mount挂载方式。

*   特性：增加了pod与节点之间的耦合。

PersistentVolume（简称PV）：如基于NFS服务的PV，也可以基于GFS的PV。它的作用是统一数据持久化目录，方便管理。

## 简述Kubernetes PV和PVC？

PV是对底层网络共享存储的抽象，将共享存储定义为一种“资源”。

PVC则是用户对存储资源的一个“申请”。

## 简述Kubernetes PV生命周期内的阶段？

某个PV在生命周期中可能处于以下4个阶段（Phaes）之一。

*   Available：可用状态，还未与某个PVC绑定。
*   Bound：已与某个PVC绑定。
*   Released：绑定的PVC已经删除，资源已释放，但没有被集群回收。
*   Failed：自动资源回收失败。

## 简述Kubernetes所支持的存储供应模式？

Kubernetes支持两种资源的存储供应模式：静态模式（Static）和动态模式（Dynamic）。

静态模式：集群管理员手工创建许多PV，在定义PV时需要将后端存储的特性进行设置。

动态模式：集群管理员无须手工创建PV，而是通过StorageClass的设置对后端存储进行描述，标记为某种类型。此时要求PVC对存储的类型进行声明，系统将自动完成PV的创建及与PVC的绑定。

## 简述Kubernetes CSI模型？

Kubernetes CSI是Kubernetes推出与容器对接的存储接口标准，存储提供方只需要基于标准接口进行存储插件的实现，就能使用Kubernetes的原生存储机制为容器提供存储服务。CSI使得存储提供方的代码能和Kubernetes代码彻底解耦，部署也与Kubernetes核心组件分离，显然，存储插件的开发由提供方自行维护，就能为Kubernetes用户提供更多的存储功能，也更加安全可靠。

CSI包括CSI Controller和CSI Node：

*   CSI Controller的主要功能是提供存储服务视角对存储资源和存储卷进行管理和操作。
*   CSI Node的主要功能是对主机（Node）上的Volume进行管理和操作。

## 简述Kubernetes Worker节点加入集群的过程？

通常需要对Worker节点进行扩容，从而将应用系统进行水平扩展。主要过程如下：

*   1、在该Node上安装Docker、kubelet和kube-proxy服务；
*   2、然后配置kubelet和kubeproxy的启动参数，将Master URL指定为当前Kubernetes集群Master的地址，最后启动这些服务；
*   3、通过kubelet默认的自动注册机制，新的Worker将会自动加入现有的Kubernetes集群中；
*   4、Kubernetes Master在接受了新Worker的注册之后，会自动将其纳入当前集群的调度范围。

## 简述Kubernetes Pod如何实现对节点的资源控制？

Kubernetes集群里的节点提供的资源主要是计算资源，计算资源是可计量的能被申请、分配和使用的基础资源。当前Kubernetes集群中的计算资源主要包括CPU、GPU及Memory。CPU与Memory是被Pod使用的，因此在配置Pod时可以通过参数CPU Request及Memory Request为其中的每个容器指定所需使用的CPU与Memory量，Kubernetes会根据Request的值去查找有足够资源的Node来调度此Pod。

通常，一个程序所使用的CPU与Memory是一个动态的量，确切地说，是一个范围，跟它的负载密切相关：负载增加时，CPU和Memory的使用量也会增加。

## 简述Kubernetes Requests和Limits如何影响Pod的调度？

当一个Pod创建成功时，Kubernetes调度器（Scheduler）会为该Pod选择一个节点来执行。对于每种计算资源（CPU和Memory）而言，每个节点都有一个能用于运行Pod的最大容量值。调度器在调度时，首先要确保调度后该节点上所有Pod的CPU和内存的Requests总和，不超过该节点能提供给Pod使用的CPU和Memory的最大容量值。

## 简述Kubernetes Metric Service？

在Kubernetes从1.10版本后采用Metrics Server作为默认的性能数据采集和监控，主要用于提供核心指标（Core Metrics），包括Node、Pod的CPU和内存使用指标。

对其他自定义指标（Custom Metrics）的监控则由Prometheus等组件来完成。

## 简述Kubernetes中，如何使用EFK实现日志的统一管理？

在Kubernetes集群环境中，通常一个完整的应用或服务涉及组件过多，建议对日志系统进行集中化管理，通常采用EFK实现。

EFK是 Elasticsearch、Fluentd 和 Kibana 的组合，其各组件功能如下：

*   Elasticsearch：是一个搜索引擎，负责存储日志并提供查询接口；
*   Fluentd：负责从 Kubernetes 搜集日志，每个node节点上面的fluentd监控并收集该节点上面的系统日志，并将处理过后的日志信息发送给Elasticsearch；
*   Kibana：提供了一个 Web GUI，用户可以浏览和搜索存储在 Elasticsearch 中的日志。

通过在每台node上部署一个以DaemonSet方式运行的fluentd来收集每台node上的日志。Fluentd将docker日志目录/var/lib/docker/containers和/var/log目录挂载到Pod中，然后Pod会在node节点的/var/log/pods目录中创建新的目录，可以区别不同的容器日志输出，该目录下有一个日志文件链接到/var/lib/docker/contianers目录下的容器日志输出。

## 简述Kubernetes如何进行优雅的节点关机维护？

由于Kubernetes节点运行大量Pod，因此在进行关机维护之前，建议先使用kubectl drain将该节点的Pod进行驱逐，然后进行关机维护。

## 简述Kubernetes集群联邦？

Kubernetes集群联邦可以将多个Kubernetes集群作为一个集群进行管理。因此，可以在一个数据中心/云中创建多个Kubernetes集群，并使用集群联邦在一个地方控制/管理所有集群。

## 简述Helm及其优势？

Helm 是 Kubernetes 的软件包管理工具。类似 Ubuntu 中使用的apt、Centos中使用的yum 或者Python中的 pip 一样。

Helm能够将一组K8S资源打包统一管理, 是查找、共享和使用为Kubernetes构建的软件的最佳方式。

Helm中通常每个包称为一个Chart，一个Chart是一个目录（一般情况下会将目录进行打包压缩，形成name-version.tgz格式的单一文件，方便传输和存储）。

##### Helm优势

在 Kubernetes中部署一个可以使用的应用，需要涉及到很多的 Kubernetes 资源的共同协作。使用helm则具有如下优势：

*   统一管理、配置和更新这些分散的 k8s 的应用资源文件；
*   分发和复用一套应用模板；
*   将应用的一系列资源当做一个软件包管理。
*   对于应用发布者而言，可以通过 Helm 打包应用、管理应用依赖关系、管理应用版本并发布应用到软件仓库。
*   对于使用者而言，使用 Helm 后不用需要编写复杂的应用部署文件，可以以简单的方式在 Kubernetes 上查找、安装、升级、回滚、卸载应用程序。

> 来源：[https://www.yuque.com/docs/sh...](https://link.segmentfault.com/?enc=jmsHh2N7Z0ykVXcw%2B%2BiGog%3D%3D.umLhPTD5O3hJVaa54SIxWQkMI0R7LodEhYSTEevO5uhc3quUv1fpi9oDVH8afd8KEyflq0FP%2BGIV2V97H3h6FJ2Y9%2F7Nq2gh7V49QTpj5wo%3D)

![](/img/bVbLc6v)

[kubernetes](/t/kubernetes)[运维](/t/%E8%BF%90%E7%BB%B4)[容器](/t/%E5%AE%B9%E5%99%A8)[后端](/t/%E5%90%8E%E7%AB%AF)[

![](https://avatar-static.segmentfault.com/187/562/1875620466-5df9fe086a004_small)

程序员](/t/%E7%A8%8B%E5%BA%8F%E5%91%98)

阅读 11.4k[发布于 2021-05-15](/a/1190000040004560/revision)

赞11收藏7

[分享](###)

本作品系原创，[采用《署名-非商业性使用-禁止演绎 4.0 国际》许可协议](https://creativecommons.org/licenses/by-nc-nd/4.0/)

* * *

[

![](https://image-static.segmentfault.com/383/303/3833030929-5ffd15fc110ab)

](/blog/mingongge)

[

##### 民工哥技术之路

](/blog/mingongge)

公众号：民工哥技术之路、《Linux系统运维指南 从入门到企业实战》作者。专注系统架构、高可用、高性能...

关注专栏

[

![avatar](https://avatar-static.segmentfault.com/311/143/3111436489-5e9b140a51f93_huge128)



](/u/jishuroad)

##### [民工哥](/u/jishuroad)

10多年IT职场老司机的经验分享，坚持自学一路从技术小白成长为互联网企业信息技术部门的负责人。2019/20...

**25.7k** 声望

**56.5k** 粉丝

关注作者

**0 条评论**

[得票](/a/1190000040004560?sort=votes)[最新](/a/1190000040004560?sort=newest)

![头像](https://image-static.segmentfault.com/317/931/3179314346-5f61e47221e07)

[](###)[](###)提交评论

评论支持部分 Markdown 语法：```**粗体** _斜体_ [链接](http://example.com) `代码` - 列表 > 引用```。你还可以使用 `@` 来通知其他用户。

**推荐阅读**

[##### 又一款内存数据库横空出世，比 Redis 更强，性能直接飙升一倍！杀疯了

KeyDB是Redis的高性能分支，专注于多线程，内存效率和高吞吐量。除了多线程之外，KeyDB还具有仅在Redis Enterprise中可用的功能，例如Active Replication，FLASH存储支持以及一些根本不可用的功能，例如直接备份...

民工哥赞 4阅读 1.3k评论 2

 ![封面图](https://static.segmentfault.com/main_site_next/689817c0/_next/static/media/bg-169.3426af7c.svg)](/a/1190000043522803?utm_source=sf-similar-article) [##### Nginx 一网打尽：动静分离、压缩、缓存、黑白名单、跨域、高可用、性能优化...

早期的业务都是基于单体节点部署，由于前期访问流量不大，因此单体结构也可满足需求，但随着业务增长，流量也越来越大，那么最终单台服务器受到的访问压力也会逐步增高。时间一长，单台服务器性能无法跟上业务增...

民工哥赞 29阅读 1.7k

 ![封面图](https://static.segmentfault.com/main_site_next/689817c0/_next/static/media/bg-169.3426af7c.svg)](/a/1190000043430175?utm_source=sf-similar-article) [

##### 一个HTTP请求的曲折经历

作为程序员的我们每天都在和网络请求打交道，而前端程序员接触的最多的就是HTTP请求。平时工作中，处理网络请求之类的操作是最多的了。但是一个请求从客户端发出到被服务端处理、再回送响应，再被客户端接收这一...

nero赞 25阅读 5.4k评论 1



](/a/1190000022514313?utm_source=sf-similar-article)[##### 学会这些 Web API 使你的开发效率翻倍

随着浏览器的日益壮大，浏览器自带的功能也随着增多，在 Web 开发过程中，我们经常会使用一些 Web API 增加我们的开发效率。本篇文章主要选取了一些有趣且有用的 Web API 进行介绍，并且 API 可以在线运行预览。C...

九旬赞 12阅读 1.2k

 ![封面图](https://static.segmentfault.com/main_site_next/689817c0/_next/static/media/bg-169.3426af7c.svg)](/a/1190000043640962?utm_source=sf-similar-article) [##### 最好用的 python 库合集

🎈 分词 - jieba优秀的中文分词库，依靠中文词库，利用词库确定汉子之间关联的概率，形成分词结果 {代码...} 🎈 词云库 - wordcloud对数据中出现频率较高的 关键词 生成的一幅图像，予以视觉上的突出 {代码...} 🎈 ...

tiny极客赞 11阅读 3.2k评论 2

 ![封面图](https://static.segmentfault.com/main_site_next/689817c0/_next/static/media/bg-169.3426af7c.svg)](/a/1190000041962217?utm_source=sf-similar-article) [

##### 疫情已过，2023 我的前端面试记录

顺利入职。把我最近找工作的心得记录下来。工作交接确定 lastday整理手头工作，相关对接人、交接人放文档中工作交接过渡阶段。做好被咨询者，该拉人拉人，该拉群拉群平时沟通顺畅的同事如果没有 WX 可以加一个属...

linong赞 11阅读 938



](/a/1190000043313242?utm_source=sf-similar-article)[##### 花了几个月时间把 MySQL 重新巩固了一遍，梳理了一篇几万字 “超硬核” 的保姆式学习教程！（持续更新中~）

MySQL 是最流行的关系型数据库管理系统，在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。

民工哥赞 11阅读 1.5k

 ![封面图](https://static.segmentfault.com/main_site_next/689817c0/_next/static/media/bg-169.3426af7c.svg)](/a/1190000043430057?utm_source=sf-similar-article) 

[

![avatar](https://avatar-static.segmentfault.com/311/143/3111436489-5e9b140a51f93_huge128)



](/u/jishuroad)

##### [民工哥](/u/jishuroad)

10多年IT职场老司机的经验分享，坚持自学一路从技术小白成长为互联网企业信息技术部门的负责人。2019/20...

**25.7k** 声望

**56.5k** 粉丝

关注作者

**宣传栏**

**文章目录**

跟随

▲

117[](#comment-area)

## 简述ETCD及其特点？

[etcd](https://link.segmentfault.com/?enc=o2%2BzXcBM8LuBgdmw4gLfMQ%3D%3D.RJAniV3P6VqKzD0yrF2tj9yL1J8NNm192fZE6Z6%2F%2FMqKpDJCMU29Rxum6qtEspNqmZ4DBm3tF11O8RomG7cGf%2FSrzJii6JZYLkJg6Nk6N3kfni%2FL2f1dMq1XAeETh1bewhDgsX5CIUyoy5tft5M6aZf6fXXF6kmCmh9reCDjYevs3PmpLnQnn9X%2FPiI8Z6CCO7A6KB6NcFY55GOdwOQd0fEdm9iockY6eZNwBq6ZbyD%2F9ebmLYEYbxRbv4Lq41qURSCnRKLIjtqI5eiayfEg4YlAd2QNIB780thmyTsfgwxflZpAGhdBQbzht6ERz1LL) 是 CoreOS 团队发起的开源项目，是一个管理配置信息和服务发现（service discovery）的项目，它的目标是构建一个高可用的分布式键值（key-value）数据库，基于 Go 语言实现。

*   特点：
*   简单：支持 REST 风格的 HTTP+JSON API
*   安全：支持 HTTPS 方式的访问
*   快速：支持并发 1k/s 的写操作
*   可靠：支持分布式结构，基于 Raft 的一致性算法，Raft 是一套通过选举主节点来实现分布式系统一致性的算法。

## 简述ETCD适应的场景？

[etcd](https://link.segmentfault.com/?enc=Nt%2FxcY9pvflMF15Y2qeVgg%3D%3D.AMGpyD6C5R9%2BT3IYEOOkg7X5dk3ZGIFcYlQoo%2BVkcPr1%2Bg1IOaYfHvnJnpafhm9sr9w6ijnabGAH8wDbqT%2F7PIx%2B7WqgAZqbRq3eFV3H%2F4V%2Bd5wpupp%2BY4ghFyA6XFA1S5J1qXUD3eGMNv%2FdQoZFM0ZahxGL%2F6ZO7wk2VeOvK3pQxl%2FPaMf70pSrLQi0hMHCLKmdWt39TfzrMDaKnuDqFZdJlPTdrxH80W52oNexkm1YEhTJNw6lsQQVbRi3NqUHC86T%2BcpWvf2QWvq14Mu1LoFnMZtCxsIRRx3%2ButVHE%2FRIWJc6ieo5UsRlPpMN53g2)基于其优秀的特点，可广泛的应用于以下场景：

服务发现(Service Discovery)：服务发现主要解决在同一个分布式集群中的进程或服务，要如何才能找到对方并建立连接。本质上来说，服务发现就是想要了解集群中是否有进程在监听udp或tcp端口，并且通过名字就可以查找和连接。

消息发布与订阅：在分布式系统中，最适用的一种组件间通信方式就是消息发布与订阅。即构建一个配置共享中心，数据提供者在这个配置中心发布消息，而消息使用者则订阅他们关心的主题，一旦主题有消息发布，就会实时通知订阅者。通过这种方式可以做到分布式系统配置的集中式管理与动态更新。应用中用到的一些配置信息放到etcd上进行集中管理。

负载均衡：在分布式系统中，为了保证服务的高可用以及数据的一致性，通常都会把数据和服务部署多份，以此达到对等服务，即使其中的某一个服务失效了，也不影响使用。etcd本身分布式架构存储的信息访问支持负载均衡。etcd集群化以后，每个etcd的核心节点都可以处理用户的请求。所以，把数据量小但是访问频繁的消息数据直接存储到etcd中也可以实现负载均衡的效果。

分布式通知与协调：与消息发布和订阅类似，都用到了etcd中的Watcher机制，通过注册与异步通知机制，实现分布式环境下不同系统之间的通知与协调，从而对数据变更做到实时处理。

分布式锁：因为etcd使用Raft算法保持了数据的强一致性，某次操作存储到集群中的值必然是全局一致的，所以很容易实现分布式锁。锁服务有两种使用方式，一是保持独占，二是控制时序。

集群监控与Leader竞选：通过etcd来进行监控实现起来非常简单并且实时性强。

## 简述什么是Kubernetes？

[Kubernetes](https://link.segmentfault.com/?enc=B7a1nNFW75JhVVq6P85qVw%3D%3D.cOWP9UuBRkh59xKQKq9I2r4CXXzHF%2BioW34Oy6n9syNvyAEE7ucUS7LXNEz%2FcKCqIY2Za72%2BE4kk9zzZJMGI9lgLiNuprSOA7ZewO5i0S%2FoaeyZwwliRBisk845aJfHYicAilwgkIGCXYL6MYctE3wMPeJFGqm6wrU%2Fz3RZPvi3Ng0LLCU6v%2B0E%2F5w7HjsSDJx%2Fv25VnkMqzYuUBGkEBC8CVuWULqQu0cU0gzuKWjh2nZoX2YoSlPKe%2FCYMm11XVoHTXrnTDP2PKtR8VXrw1%2FVQ4iQgQ9ocf58b1Sl2w%2FeV6YEcaBdxBujt7%2Fl6jtBfN)是一个全新的基于容器技术的分布式系统支撑平台。是Google开源的容器集群管理系统（谷歌内部:Borg）。在Docker技术的基础上，为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等一系列完整功能，提高了大规模容器集群管理的便捷性。并且具有完备的集群管理能力，多层次的安全防护和准入机制、多租户应用支撑能力、透明的服务注册和发现机制、內建智能负载均衡器、强大的故障发现和自我修复能力、服务滚动升级和在线扩容能力、可扩展的资源自动调度机制以及多粒度的资源配额管理能力。

## 简述Kubernetes和Docker的关系？

Docker 提供容器的生命周期管理和，[Docker](https://link.segmentfault.com/?enc=oqRI%2B%2BaqAhORYRgapwFqXQ%3D%3D.lk5rUAwhEIOUAOmeNRyvac79UDepkCOdq2g0DuJWiZWP0Jw%2FbvandJKXtKt%2BWfEq88048FMaIoHmECLuNCMdbkIg%2BpVGiatUgXmchfGn2MxPxptFJ2LnyhUdBMQoJ3Nr10KAg3inba9PaYSADPsd4V8CJpn2uWROZPd1vIEmqAlxB3kXmWoqINXM63rKSOMFBDAhaNF6MEZbYkPJwfJzSqWS%2FxWM2OnrCRR6YCGLOxf0c%2BOgfuKvj13FE%2F7atE48hyiXuYrLe7MTfzZyJAjwgdGvQAXO1w8DG%2F6UEfrh6MfuFGX%2FUWVYZwOvPf7%2BA7KK) 镜像构建运行时容器。它的主要优点是将将软件/应用程序运行所需的设置和依赖项打包到一个容器中，从而实现了可移植性等优点。

[Kubernetes](https://link.segmentfault.com/?enc=BCst%2BXhg6R4dX06jRJxaGg%3D%3D.Q7UO%2FxKZYPuXCTPUt3j2uwVbvsBeV09qvcNGpfs73m%2BB05HvbZPGFY1THuku8m7BEJ%2FHClwIXiq63KkUpp%2BMij4Oc%2BQKpIgaFQ3%2FMqX%2F%2BUZMtyzu2pSmsHFV1rKnEBIMYD4yE%2F7FF0K1z4w0lGuUtMPTx%2BdK%2BSRcYj%2FCkFoOkGMRh%2FYnEoQ%2BqrPi0CkzfQApMW2BKGbEXsjXvYDu7odvJGeZPt5ZY2fEOZHffexv4C%2BsErM%2BA2Qg8Ax08iybqLtfKTQmzyEybDnXXwozpF3YufhLLCVIVHgfYgEOja5HDkEDBRFW3pASYd8L%2BFXAi7eh) 用于关联和编排在多个主机上运行的容器。

## 简述Kubernetes中什么是Minikube、Kubectl、Kubelet？

Minikube 是一种可以在本地轻松运行一个单节点 [Kubernetes](https://link.segmentfault.com/?enc=h3jX%2FZhBwXliQPgswK3NHg%3D%3D.WxhBS3kbhR9rzQKJtcJ0Eqr2aOlKiRixiJIZixeeZyG1oaEv8mIIAqKo%2BuOQkUtKsFiGrIu1y4NHj6JoOvxobQSVqpOh9%2B9EdO3vvo9KpIXNXnbOePyM%2BRef7WKkFsAsCMBhJueefi9QpSgnKwrzNKe2r26n9stOspN12wng1SWvJ6PDAEek5tATWCt5r01x%2F9QD4GsRximkzl6VbvPc8KFLsFEy%2FB09kT9jgQ28Qlw2OIskvSRYI1d04Pd5pjNcO7ln2FGlC4cGUDdxFtH6n76unbtvzifzSnEPtc3IWS6EGEus4XvezibK0lP7V1Q4) 群集的工具。

[Kubectl](https://link.segmentfault.com/?enc=QY5dlRn0ZG7t4R422TMwzg%3D%3D.q7%2BVLs09OkqOeTcMbQN6rqs5KkZP9JBGbMhM4Gx0NEXj9JXokUs39UWa%2BNah4lHnNen%2BxH4ekuZ1m0F4rqQgHgxjLpPdYleI2VNKvCSmpFxjHKiAWnN9QDa3zLFpRQkYgTseeY01agX8bBSjXFbcUdykX2UozAohuDknK9uj5XiA9T%2FmeTtkz1Tfvu%2BCHWANnzL48Hzdp8H9%2BmVe%2Fos3MqpMu2Ibaq1wjUIZNyzfczX%2BIgDjDeyBqjKEafgv2DoUclVsdi%2FHQzO5tcN76cYeSdIztfwpsGBORx2TUl%2F2KVFRbBtzrTweqbQ1JfliLkTy) 是一个命令行工具，可以使用该工具控制[Kubernetes](https://link.segmentfault.com/?enc=T0tfpo8SpXYMjO7OBzCxOA%3D%3D.McmooxhthvGpyJcwbI4oymlT4FnyxqE%2B9SHd9h0skNFb2yU2oUiHoilcOjPC06FK96LFjj6AHF6PLo9%2BrdQw7LWByKQxhZoLwtPe%2BYehARybuiz4Rmuoc8hLX%2FJZq5cMiGcndqy%2B6Pv%2BVG7u41cyThleoIyBM3dV5SduBbopA6RuvQcu53iWt1%2BAN7AdnXcGGzb15TJqPwmhC26mwApn16eocKeCSx2fH4WC%2FusWj47GRthnHEvM8fUadZmVLHlNMRmGGXiVQWf8qSaa%2BjJgTmtoZnLuvDAamgD4DJJpKTsQ1swi0EN1ouaZ1NMI6TiF)集群管理器，如检查群集资源，创建、删除和更新组件，查看应用程序。

Kubelet 是一个代理服务，它在每个节点上运行，并使从服务器与主服务器通信。

## 简述Kubernetes常见的部署方式？

常见的[Kubernetes](https://link.segmentfault.com/?enc=nF3Zmj4kBZgfTLwkweMQjQ%3D%3D.7iX3N97LjJLExaoqLVPZRy7gJxTanIrW9XerRRq9ObSc0ZATof7FESlacAZDk%2FJ7Xq5RuyoXQcYa39vPPXsNRxCC1esZEV%2FrvvqoxT1tM8fyF%2BBdLGYeIhhH28vcly0Jx4AcCb5OEVWExoYer0scAK6y61J%2BE2xLE%2BIyv6VuWo%2FUV0BFbbHT4%2B5RxGU81m%2FUt0PWYes81Z6oNG2xtNb9yzWNbC9hvduuzvdsYgGMAOgzTXo60cvsSc9k99O1cYCIyv28mEnLMO0kM8F8J8IzkFbIpoZuhsJcqUvPiGAxXI0UIyrBnrAv86Aj9RA1ICLJ)部署方式有：

*   kubeadm：也是推荐的一种部署方式；
*   二进制：[CentOS 搭建 K8S，一次性成功，收藏了！](https://link.segmentfault.com/?enc=faFFMa2tyXySL1mNdh1k7A%3D%3D.tg7HgyKfo8IyiJD6H2ArSrd4LR6jJULVKSrcC8HJJ9xNJfiaLd7N8TAylQLe5ebAfNN5vw4Vy9IDDPmZ9RwWQ8yLdSEFg%2FuXO%2FP0KsPyarwzHj9tcTBGcOtDKDgMeiGUoygq%2F3K7ukBgmLqry8hnQsW7O9HMXFGxy6LNuwputvP264z1ogMmc5tpmw45aubG6JSkENAwrjWSZ0r2FCCwfRDzs%2FSG8TrCmxdHFgdl2oZnL%2BhPGKOxfeU9gE0aUWl7yg6BShobHGROy5D6EqhFidMgWw3TiwrRbozXwl58hTc09%2F4cTRBE6PR7BfwcLhTr)
*   minikube：在本地轻松运行一个单节点 Kubernetes 群集的工具。
*   [简单几步，无坑部署最小化 K8S 集群](https://link.segmentfault.com/?enc=fts8jSmJqXxfwxMXeKwDcQ%3D%3D.OdH3uStnduxVHtJgERZIPbJ0hxQKWKpFlSDgeuXdRTBS4AOvqfF9jK8nu%2BV34k%2FBUnnxWuB%2FiqNLbc79ucCs6z3Ng4S%2FhQDUSl696XCVM6vjvQCB0oeFMy%2BuwRr9gMgkWdlObLcaAgl5WnynDYl2LFkoHPWf9VVustDZZnnbfhyMg46aAq13ABG%2BQAVIFajZWDWjcPJu4HBblxRyIFEAamODZUqD5SEaD3gdj%2FajCmNoJHFmlVdLYpbgtqHP6Mz5m0Dx7fUBUK5YuzB%2B96b9hYxdNu%2BrXNOLkOaybqWg%2BlA2eaAfPToItzWv1k5NFcro)
*   [Kubernetes 部署如此简单，看完全明白了](https://link.segmentfault.com/?enc=%2F073uIfp%2FjyzrTWP20A3gA%3D%3D.7Is%2B4GkRzMyZ9UvP7t%2BNklv5L%2FYgeB7TY0tu9tkCSc3xCXhqBUXi3T9Da8ISdTmmOrzMk8YEcQl0ELrmMPjT%2FEMnofpIhFvfn5mQtkNJeBqQ9FGknV0jLaJcCv9AOhHEyxf3iv%2Bm0BeTJzNSaAo5skJl5yA3bS6eJ4XPwCStHO8f0Ifhh7W9mivHhKiiEJRAH2LwVQ6R%2Bcskt2ZaVTbibWmr5aAgD3jL0Be7sFHguVz0NgbM9yiW5u2p%2FLoded%2Bqw7O4UupgnZYDadFmFHG4pFg61sGali2VBSuWDsCqfbM8CdK0XqYH0EIue360yUGN)

## 简述Kubernetes如何实现集群管理？

在集群管理方面，[Kubernetes将集群](https://link.segmentfault.com/?enc=FyUEG0cbh8YzXEFPVa8tPw%3D%3D.1BG81ZxnuXhZlssbxG7ShECReiMc8gwHR9FiKhZlQjHxz7iXkoC%2FAfYD7USbqnZi4jlUsXdpRRUuCbhRuowc%2BZGGnG8xugAqCJhIeh7ZsUEcAubMCkRK4%2FJWKDgbkVVJzikOfMAIHDLGmCRJi60JcOhDBqdndbCJzacfyV%2BmIPXyMiSd2uGSBgu4LKNklDdWa%2BDE1uELD%2BNyrb1VlmCDhbke25i4q7Zz5RVwMUnXf33VZZuhYTYs1PxYa3AFX7RNzkYUlavJtmolpHnciWJ%2FQqu4NesnO7hP8RF4OnBLvqYUtURyn0GwFdTEKhIJNpfq)中的机器划分为一个Master节点和一群工作节点Node。其中，在Master节点运行着集群管理相关的一组进程kube-apiserver、kube-controller-manager和kube-scheduler，这些进程实现了整个集群的资源管理、Pod调度、弹性伸缩、安全控制、系统监控和纠错等管理能力，并且都是全自动完成的。推荐大家看看：[轻松管理 Kubernetes 集群的7个工具](https://link.segmentfault.com/?enc=Nn0OhuKVikY2co1MSpHb3w%3D%3D.5qTMZchsUTuBQpneJ46fK7OkY9VEc1MRuWpu4BvPx2cQWLax2nnHxxH4qDGym85Oh86utKNaEAtminHLTvXgPb43xJMp37NizgNAEcgL%2F6gLBayG2rG8mIV7A7YM%2BiIuUbC4w3L5Hqf7S0yUVPbjOqiKZ3wFli1W2fpFnAlHzlBxlvspD3uluGjGpS2JaUfG4pft9NC8ZhPBUhJ3zifq3vdZkkk2prBOfrxDIWC1jCEyJeAoHUc05IBeMI59HY3jEI7clYeToQ7%2BsrsWnIx84KJ26N4yBAYjCaoZN52gRzWivlXJdmpCERWz2bE7Xk7p)。

## 简述Kubernetes的优势、适应场景及其特点？

[Kubernetes](https://link.segmentfault.com/?enc=AlC6C77h9OD0X4dAT5cNwg%3D%3D.qwzGQXzjXb9fPhLIGWImU7lUpihFBmXRVn0RcMw9XZ8blgsypJUy9gu4hAi4uNhJvi%2Blh4OlIcnRfrptO9m2WhrJIT7J%2FhAJ%2FbJ1%2BaJNDmHe6HSt3YG3TeG0UOtV0%2Fdi%2BrnJQan2iRsoAu3qGaEh6HcKHgPl3fQGfEkOwyC6EcWkYYmme%2BNr7itpg1rIhLIO7QoH3u5XA2qhES0DmH%2BLLBXfGYf6E01vem5qrlBUeGDzS0pacBNBnDF9U8psg1N0wZ4u0eSTM8Z57mm9Ux5sFCD61hce%2ByA32wMTC3u8YBQk019v9X3KQ%2BLhqTcvBx99)作为一个完备的分布式系统支撑平台，其主要优势：

*   容器编排
*   轻量级
*   开源
*   弹性伸缩
*   负载均衡

[Kubernetes](https://link.segmentfault.com/?enc=E13hKn3oN9ghJVh5Wvvlmg%3D%3D.G6TR%2BZDu8jGoqE7Y4y%2Fp5VeFr50muonJ7OW6o4eJcO1pfHRw%2B2AoZEewoXelLRKSw4A%2BFPMb3sO7LUJUxkhKzLnvNm8vZ%2B96V2v339QOlSm0UwN9yfQSvJ6OoGSwPdKsKN2Mfci408f8yApGUa8QCaS9KIDaJJ0z1I3DiB8p7kfQOPmPlmYaGuEH9QqPY4gg%2BIYbP064FBivqWgxrWsCB0po0LJ2PRm2uE4LbEMm2bFkQEN1FN4ykV%2BT8MikI4py5tlMk8sufsyzPkDF3BI12vImdj6UEidH%2BNOYzj5uqjal%2FoytdV3c7FfvgQaPfdtI)常见场景：

*   快速部署应用
*   快速扩展应用
*   无缝对接新的应用功能
*   节省资源，优化硬件资源的使用

Kubernetes相关特点：

*   可移植: 支持公有云、私有云、混合云、多重云（multi-cloud）。
*   可扩展: 模块化,、插件化、可挂载、可组合。
*   自动化: 自动部署、自动重启、自动复制、自动伸缩/扩展。

## 简述Kubernetes的缺点或当前的不足之处？

Kubernetes当前存在的缺点（不足）如下：

*   安装过程和配置相对困难复杂。
*   管理服务相对繁琐。
*   运行和编译需要很多时间。
*   它比其他替代品更昂贵。
*   对于简单的应用程序来说，可能不需要涉及Kubernetes即可满足。

## 简述Kubernetes相关基础概念？

master：[k8s集群](https://link.segmentfault.com/?enc=UxDhqMSaKotgYoFAs19p6A%3D%3D.MoyONq%2ByGCP9CN%2FYmP797mKoabQOw8iXTyyYPZ1lJP7uih0BeG91YhE2Auk3VqPCVCqnuZrSAYeFutIqLAY89bMplCi8QgvhCoAmqjAmjgKDEOdUgOuT13CQ%2FWmkrvBkGzpsH%2BeHdpdyHGJYJbx0IZD1spDlR%2BzAfYB5gIdV9Ithcqhxi9CoxMauTNzE3URBAjT6GBls%2Fc77dXDFmQRWIu%2BjmYypbmHKU0lzoJUJY8sjRNpi8F3cxQHu1RNgodl0IxdTeeKPE4nhzGIxp1gqspDT%2BPdmYoxloqhhyiMgy0Ysc6iaaJUNrPLddS7ZdGge)的管理节点，负责管理集群，提供集群的资源数据访问入口。拥有Etcd存储服务（可选），运行Api Server进程，Controller Manager服务进程及Scheduler服务进程。

node（worker）：Node（worker）是Kubernetes集群架构中运行Pod的服务节点，是Kubernetes集群操作的单元，用来承载被分配Pod的运行，是Pod运行的宿主机。运行docker eninge服务，守护进程kunelet及负载均衡器kube-proxy。

pod：运行于Node节点上，若干相关容器的组合([Kubernetes 之 Pod 实现原理](https://link.segmentfault.com/?enc=k0fk0u57Yaud7YGPf0DzFA%3D%3D.rmud0HAIqm9vq9WvOyjGN9Z8ls6Llx13X3k1Kfdg86Egf0nhTvA%2FJKH7Pko9zf9uAjQj0FGgP8q3dFPiyYR1b2k9feFb2ai2zgFWONk8vOrnDTrteHU0j1y5xpRbuHc68fl8o%2BI2iSkYH3aG8anL5cAD0sYQsP%2F3P43NK0D8PWAkYhCj9dbXzgHF54VuoipFJ%2BYn75gwlGAfUCSIh8XxXYMURoCk047Y1pO40hO8BPZDeNBGC4fhu%2BYJH6Q2LCY9f7JA5KKAMz99Apz1Ip9ygpbLB%2BtSlMxuvhFZfi7xye6Gg3wTof96Q0lEXHghcVky))。Pod内包含的容器运行在同一宿主机上，使用相同的网络命名空间、IP地址和端口，能够通过localhost进行通信。Pod是[Kurbernetes](https://link.segmentfault.com/?enc=HAA1W2K2cgFL9C38s7axjw%3D%3D.PSafDGxVr2ZPFAGnRFXcBZ4FN6KVsgimAB2CEVs%2BWEp6CEbTMtEr7Uz%2FfV3l1507oxiaq97JVdHrv3SQRhSd%2B4fF7koqQy1i7rGVOrnBWeckl5nHHQ0UrEq8BKgIYRRSW5rrt02mEUMMSYOyyvGg3jIAznlTmytm323ZMBINpHWA1XPWoVRFFhOSs2oxjVUh2eHJunlnUvG1K8pLpBMpAoqNTkPEzLE%2BB%2FN3yYOM%2BANbwrWH%2BayTpQAP6xAokBFFESc0djqni%2FEnKblJ4w0nhcRrMK2QYDxCOiyw6roivJNW%2BeuSuGehO5RK1Hh5i%2Fzf)进行创建、调度和管理的最小单位，它提供了比容器更高层次的抽象，使得部署和管理更加灵活。一个Pod可以包含一个容器或者多个相关容器。

label：[Kubernetes](https://link.segmentfault.com/?enc=sH1Jq27sGnWtU7Y50zlxag%3D%3D.JE1Y4Oz6jQeYBJGEaKmafBn66g6%2Fvls36aeuokndIkThd8M3Afyb3dmPDBcGc6cKqVlqaM55oRcMTcUwaQUvUCjKkYM1DH1knl%2FR9%2BFp70j6EB5uA5Vp0FX%2BoGGw2blccY6MvqVhpi1Nl7meHgTG86KGcvNrXb%2BGdPtetM2pDKVzelLb%2FFBG5BrwgUj5Yj3cttH5SSyIp3WMMh0dfMrneQNK3YBzIFeq1EqKWhcP0nwv8GLCCqMpTnZ9MmH2j3Tm05harVwmR0BJSR1Om5pTe7q2UgoaxPhFEhTZyQWhiCYl7Cbn6P4dR1x9jYPNSjBG)中的Label实质是一系列的Key/Value键值对，其中key与value可自定义。Label可以附加到各种资源对象上，如Node、Pod、Service、RC等。一个资源对象可以定义任意数量的Label，同一个Label也可以被添加到任意数量的资源对象上去。Kubernetes通过Label Selector（标签选择器）查询和筛选资源对象。

Replication Controller：Replication Controller用来管理Pod的副本，保证集群中存在指定数量的Pod副本。集群中副本的数量大于指定数量，则会停止指定数量之外的多余容器数量。反之，则会启动少于指定数量个数的容器，保证数量不变。Replication Controller是实现弹性伸缩、动态扩容和滚动升级的核心。

Deployment：Deployment在内部使用了RS来实现目的，Deployment相当于RC的一次升级，其最大的特色为可以随时获知当前Pod的部署进度。

HPA（Horizontal Pod Autoscaler）：Pod的横向自动扩容，也是Kubernetes的一种资源，通过追踪分析RC控制的所有Pod目标的负载变化情况，来确定是否需要针对性的调整Pod副本数量。

Service：Service([Kubernetes 之服务发现](https://link.segmentfault.com/?enc=SFjpakHfJB5WkhmMt%2FxOww%3D%3D.polT9csK7cpdKew5rgqy%2FXPneLHNrkrQLrsQDVpLWMaV1y0v4ae9%2F3mAeir2S%2BsRxG4GTqs6tjJ5tG9bwRpdy4JL37V8SF7NmOODpoHTWO7IuKnjdugKUbefejAyBPXXu3GdKQDmW5fuTByoqcHA8PSGprfwOU4vwJGbVfASO7dkYZodn7xtjTKGdE6od8HCSoe%2BmYHyTGhspaJr2OaC5Ro%2B1THLljKXll7kQ8xq4JglXBcsjslqwxNLtNFLKs9AhjXOqNsJFudeAyzDSQ05i6r5lsDdr07nPrftSGrwB3UIeVcaQWfCeEaqpxDL4mD7))定义了Pod的逻辑集合和访问该集合的策略，是真实服务的抽象。Service提供了一个统一的服务访问入口以及服务代理和发现机制，关联多个相同Label的Pod，用户不需要了解后台Pod是如何运行。

Volume：Volume是Pod中能够被多个容器访问的共享目录，[Kubernetes](https://link.segmentfault.com/?enc=4dwYSyyHFUWEIizOtz77YA%3D%3D.HooEsjmQZO%2BQIX7782B2voZAigG5s4kMjwDhhqLmbAwuNpGMhmelnu1EQLmRJTxqTojd98KkcozUXqDvpnKo0IVgOUma8e06%2Br2NNchnNwDF0xrG4ufwqD%2BcfQTCnQEjx%2F%2FjPgjeROCmwUb4U%2BPseR88Lpv952hTMX3R1g10ipy%2FUzUP05IcexQ8p9jo6zQ7trTnYwxSCZM1Y8b95ZIVWaFHmLgTufqqcsptfLU2LEzETv90GFKbS35lv6HZUZTALFh0OxC5QF7a2F%2FFd3ufY26LDgS9xiUpejolZRl%2BMRRxVYqJFrcB0yWdjAiz7gom)中的Volume是定义在Pod上，可以被一个或多个Pod中的容器挂载到某个目录下。

Namespace：Namespace用于实现多租户的资源隔离，可将集群内部的资源对象分配到不同的Namespace中，形成逻辑上的不同项目、小组或用户组，便于不同的Namespace在共享使用整个集群的资源的同时还能被分别管理。

## 简述Kubernetes集群相关组件？

[Kubernetes](https://link.segmentfault.com/?enc=Po0epCdgsSZ%2BAYdY16Sq5Q%3D%3D.EkVU0W3c50vV%2FhUHmX%2BZqHp%2B3%2BOTVA6WoUsvHlcTBRb0kFu%2BjSfYYKLsYZxQmhmYuqXEDADfaht3ih9p3r%2Fp8ZxaQqIhdZPqxWTKaTqFTnb9tdTRzRhI8KSKJ8iz3OWHuUwQeS14G8Krj2gFT7QxgC2EO3Kk%2FoevmXhxyCiojc4wRX5pyrSzPE21vzXoRdX7mIJeXPjAH6%2FoVbuOvVkHTY7MjsmAeFWeO4vPXu7JrzQGzeieHrOXZOScqH3vYX38eo85eZDoc2Yu2GK1WleT7OIFkXWy4tOOncvqkeD%2Bf78D4YXnlN8lF%2F0uMGFQ0enl) Master控制组件，调度管理整个系统（集群），包含如下组件:

Kubernetes API Server：作为Kubernetes系统的入口，其封装了核心对象的增删改查操作，以RESTful API接口方式提供给外部客户和内部组件调用，集群内各个功能模块之间数据交互和通信的中心枢纽。

Kubernetes Scheduler：为新建立的Pod进行节点(node)选择(即分配机器)，负责集群的资源调度。

Kubernetes Controller：负责执行各种控制器，目前已经提供了很多控制器来保证Kubernetes的正常运行。

Replication Controller：管理维护Replication Controller，关联Replication Controller和Pod，保证Replication Controller定义的副本数量与实际运行Pod数量一致。

Node Controller：管理维护Node，定期检查Node的健康状态，标识出(失效|未失效)的Node节点。

Namespace Controller：管理维护Namespace，定期清理无效的Namespace，包括Namesapce下的API对象，比如Pod、Service等。

Service Controller：管理维护Service，提供负载以及服务代理。

EndPoints Controller：管理维护Endpoints，关联Service和Pod，创建Endpoints为Service的后端，当Pod发生变化时，实时更新Endpoints。

Service Account Controller：管理维护Service Account，为每个Namespace创建默认的Service Account，同时为Service Account创建Service Account Secret。

Persistent Volume Controller：管理维护Persistent Volume和Persistent Volume Claim，为新的Persistent Volume Claim分配Persistent Volume进行绑定，为释放的Persistent Volume执行清理回收。

Daemon Set Controller：管理维护Daemon Set，负责创建Daemon Pod，保证指定的Node上正常的运行Daemon Pod。

Deployment Controller：管理维护Deployment，关联Deployment和Replication Controller，保证运行指定数量的Pod。当Deployment更新时，控制实现Replication Controller和Pod的更新。

Job Controller：管理维护Job，为Jod创建一次性任务Pod，保证完成Job指定完成的任务数目

Pod Autoscaler Controller：实现Pod的自动伸缩，定时获取监控数据，进行策略匹配，当满足条件时执行Pod的伸缩动作。

## 简述Kubernetes RC的机制？

Replication Controller用来管理Pod的副本，保证集群中存在指定数量的Pod副本。当定义了RC并提交至Kubernetes集群中之后，Master节点上的Controller Manager组件获悉，并同时巡检系统中当前存活的目标Pod，并确保目标Pod实例的数量刚好等于此RC的期望值，若存在过多的Pod副本在运行，系统会停止一些Pod，反之则自动创建一些Pod。

简述Kubernetes Replica Set 和 Replication Controller 之间有什么区别？Replica Set 和 Replication Controller 类似，都是确保在任何给定时间运行指定数量的 Pod 副本。不同之处在于RS 使用基于集合的选择器，而 Replication Controller 使用基于权限的选择器。

## 简述kube-proxy作用？

kube-proxy 运行在所有节点上，它监听 apiserver 中 service 和 endpoint 的变化情况，创建路由规则以提供服务 IP 和负载均衡功能。简单理解此进程是Service的透明代理兼负载均衡器，其核心功能是将到某个Service的访问请求转发到后端的多个Pod实例上。

## 简述kube-proxy iptables原理？

Kubernetes从1.2版本开始，将iptables作为kube-proxy的默认模式。iptables模式下的kube-proxy不再起到Proxy的作用，其核心功能：通过API Server的Watch接口实时跟踪Service与Endpoint的变更信息，并更新对应的iptables规则，Client的请求流量则通过iptables的NAT机制“直接路由”到目标Pod。

## 简述kube-proxy ipvs原理？

IPVS在Kubernetes1.11中升级为GA稳定版。IPVS则专门用于高性能负载均衡，并使用更高效的数据结构（Hash表），允许几乎无限的规模扩张，因此被kube-proxy采纳为最新模式。

在IPVS模式下，使用iptables的扩展ipset，而不是直接调用iptables来生成规则链。iptables规则链是一个线性的数据结构，ipset则引入了带索引的数据结构，因此当规则很多时，也可以很高效地查找和匹配。

可以将ipset简单理解为一个IP（段）的集合，这个集合的内容可以是IP地址、IP网段、端口等，iptables可以直接添加规则对这个“可变的集合”进行操作，这样做的好处在于可以大大减少iptables规则的数量，从而减少性能损耗。

## 简述kube-proxy ipvs和iptables的异同？

iptables与IPVS都是基于Netfilter实现的，但因为定位不同，二者有着本质的差别：iptables是为防火墙而设计的；IPVS则专门用于高性能负载均衡，并使用更高效的数据结构（Hash表），允许几乎无限的规模扩张。

与iptables相比，IPVS拥有以下明显优势：

*   1、为大型集群提供了更好的可扩展性和性能；
*   2、支持比iptables更复杂的复制均衡算法（最小负载、最少连接、加权等）；
*   3、支持服务器健康检查和连接重试等功能；
*   4、可以动态修改ipset的集合，即使iptables的规则正在使用这个集合。

## 简述Kubernetes中什么是静态Pod？

静态pod是由kubelet进行管理的仅存在于特定Node的Pod上，他们不能通过API Server进行管理，无法与ReplicationController、Deployment或者DaemonSet进行关联，并且kubelet无法对他们进行健康检查。静态Pod总是由kubelet进行创建，并且总是在kubelet所在的Node上运行。

## 简述Kubernetes中Pod可能位于的状态？

Pending：API Server已经创建该Pod，且Pod内还有一个或多个容器的镜像没有创建，包括正在下载镜像的过程。

Running：Pod内所有容器均已创建，且至少有一个容器处于运行状态、正在启动状态或正在重启状态。

Succeeded：Pod内所有容器均成功执行退出，且不会重启。

Failed：Pod内所有容器均已退出，但至少有一个容器退出为失败状态。

Unknown：由于某种原因无法获取该Pod状态，可能由于网络通信不畅导致。

## 简述Kubernetes创建一个Pod的主要流程？

Kubernetes中创建一个Pod涉及多个组件之间联动，主要流程如下：

*   1、客户端提交Pod的配置信息（可以是yaml文件定义的信息）到kube-apiserver。
*   2、Apiserver收到指令后，通知给controller-manager创建一个资源对象。
*   3、Controller-manager通过api-server将pod的配置信息存储到ETCD数据中心中。
*   4、Kube-scheduler检测到pod信息会开始调度预选，会先过滤掉不符合Pod资源配置要求的节点，然后开始调度调优，主要是挑选出更适合运行pod的节点，然后将pod的资源配置单发送到node节点上的kubelet组件上。
*   5、Kubelet根据scheduler发来的资源配置单运行pod，运行成功后，将pod的运行信息返回给scheduler，scheduler将返回的pod运行状况的信息存储到etcd数据中心。

## 简述Kubernetes中Pod的重启策略？

Pod重启策略（RestartPolicy）应用于Pod内的所有容器，并且仅在Pod所处的Node上由kubelet进行判断和重启操作。当某个容器异常退出或者健康检查失败时，kubelet将根据RestartPolicy的设置来进行相应操作。

Pod的重启策略包括Always、OnFailure和Never，默认值为Always。

*   Always：当容器失效时，由kubelet自动重启该容器；
*   OnFailure：当容器终止运行且退出码不为0时，由kubelet自动重启该容器；
*   Never：不论容器运行状态如何，kubelet都不会重启该容器。

同时Pod的重启策略与控制方式关联，当前可用于管理Pod的控制器包括ReplicationController、Job、DaemonSet及直接管理kubelet管理（静态Pod）。

不同控制器的重启策略限制如下：

*   RC和DaemonSet：必须设置为Always，需要保证该容器持续运行；
*   Job：OnFailure或Never，确保容器执行完成后不再重启；
*   kubelet：在Pod失效时重启，不论将RestartPolicy设置为何值，也不会对Pod进行健康检查。

## 简述Kubernetes中Pod的健康检查方式？

对Pod的健康检查可以通过两类探针来检查：LivenessProbe和ReadinessProbe。

LivenessProbe探针：用于判断容器是否存活（running状态），如果LivenessProbe探针探测到容器不健康，则kubelet将杀掉该容器，并根据容器的重启策略做相应处理。若一个容器不包含LivenessProbe探针，kubelet认为该容器的LivenessProbe探针返回值用于是“Success”。

ReadineeProbe探针：用于判断容器是否启动完成（ready状态）。如果ReadinessProbe探针探测到失败，则Pod的状态将被修改。Endpoint Controller将从Service的Endpoint中删除包含该容器所在Pod的Eenpoint。

startupProbe探针：启动检查机制，应用一些启动缓慢的业务，避免业务长时间启动而被上面两类探针kill掉。

## 简述Kubernetes Pod的LivenessProbe探针的常见方式？

kubelet定期执行LivenessProbe探针来诊断容器的健康状态，通常有以下三种方式：

ExecAction：在容器内执行一个命令，若返回码为0，则表明容器健康。

TCPSocketAction：通过容器的IP地址和端口号执行TCP检查，若能建立TCP连接，则表明容器健康。

HTTPGetAction：通过容器的IP地址、端口号及路径调用HTTP Get方法，若响应的状态码大于等于200且小于400，则表明容器健康。

## 简述Kubernetes Pod的常见调度方式？

Kubernetes中，Pod通常是容器的载体，主要有如下常见调度方式：

*   Deployment或RC：该调度策略主要功能就是自动部署一个容器应用的多份副本，以及持续监控副本的数量，在集群内始终维持用户指定的副本数量。
*   NodeSelector：定向调度，当需要手动指定将Pod调度到特定Node上，可以通过Node的标签（Label）和Pod的nodeSelector属性相匹配。
*   NodeAffinity亲和性调度：亲和性调度机制极大的扩展了Pod的调度能力，目前有两种节点亲和力表达：
*   requiredDuringSchedulingIgnoredDuringExecution：硬规则，必须满足指定的规则，调度器才可以调度Pod至Node上（类似nodeSelector，语法不同）。
*   preferredDuringSchedulingIgnoredDuringExecution：软规则，优先调度至满足的Node的节点，但不强求，多个优先级规则还可以设置权重值。
*   Taints和Tolerations（污点和容忍）：
*   Taint：使Node拒绝特定Pod运行；
*   Toleration：为Pod的属性，表示Pod能容忍（运行）标注了Taint的Node。

## 简述Kubernetes初始化容器（init container）？

init container的运行方式与应用容器不同，它们必须先于应用容器执行完成，当设置了多个init container时，将按顺序逐个运行，并且只有前一个init container运行成功后才能运行后一个init container。当所有init container都成功运行后，Kubernetes才会初始化Pod的各种信息，并开始创建和运行应用容器。

## 简述Kubernetes deployment升级过程？

*   初始创建Deployment时，系统创建了一个ReplicaSet，并按用户的需求创建了对应数量的Pod副本。
*   当更新Deployment时，系统创建了一个新的ReplicaSet，并将其副本数量扩展到1，然后将旧ReplicaSet缩减为2。
*   之后，系统继续按照相同的更新策略对新旧两个ReplicaSet进行逐个调整。
*   最后，新的ReplicaSet运行了对应个新版本Pod副本，旧的ReplicaSet副本数量则缩减为0。

## 简述Kubernetes deployment升级策略？

在Deployment的定义中，可以通过spec.strategy指定Pod更新的策略，目前支持两种策略：Recreate（重建）和RollingUpdate（滚动更新），默认值为RollingUpdate。

Recreate：设置spec.strategy.type=Recreate，表示Deployment在更新Pod时，会先杀掉所有正在运行的Pod，然后创建新的Pod。

RollingUpdate：设置spec.strategy.type=RollingUpdate，表示Deployment会以滚动更新的方式来逐个更新Pod。同时，可以通过设置spec.strategy.rollingUpdate下的两个参数（maxUnavailable和maxSurge）来控制滚动更新的过程。

## 简述Kubernetes DaemonSet类型的资源特性？

DaemonSet资源对象会在每个Kubernetes集群中的节点上运行，并且每个节点只能运行一个pod，这是它和deployment资源对象的最大也是唯一的区别。因此，在定义yaml文件中，不支持定义replicas。

它的一般使用场景如下：

*   在去做每个节点的日志收集工作。
*   监控每个节点的的运行状态。

## 简述Kubernetes自动扩容机制？

Kubernetes使用Horizontal Pod Autoscaler（HPA）的控制器实现基于CPU使用率进行自动Pod扩缩容的功能。HPA控制器周期性地监测目标Pod的资源性能指标，并与HPA资源对象中的扩缩容条件进行对比，在满足条件时对Pod副本数量进行调整。

*   HPA原理

Kubernetes中的某个Metrics Server（Heapster或自定义Metrics Server）持续采集所有Pod副本的指标数据。HPA控制器通过Metrics Server的API（Heapster的API或聚合API）获取这些数据，基于用户定义的扩缩容规则进行计算，得到目标Pod副本数量。

当目标Pod副本数量与当前副本数量不同时，HPA控制器就向Pod的副本控制器（Deployment、RC或ReplicaSet）发起scale操作，调整Pod的副本数量，完成扩缩容操作。

## 简述Kubernetes Service类型？

通过创建Service，可以为一组具有相同功能的容器应用提供一个统一的入口地址，并且将请求负载分发到后端的各个容器应用上。其主要类型有：

*   ClusterIP：虚拟的服务IP地址，该地址用于Kubernetes集群内部的Pod访问，在Node上kube-proxy通过设置的iptables规则进行转发；
*   NodePort：使用宿主机的端口，使能够访问各Node的外部客户端通过Node的IP地址和端口号就能访问服务；
*   LoadBalancer：使用外接负载均衡器完成到服务的负载分发，需要在spec.status.loadBalancer字段指定外部负载均衡器的IP地址，通常用于公有云。

## 简述Kubernetes Service分发后端的策略？

Service负载分发的策略有：RoundRobin和SessionAffinity

*   RoundRobin：默认为轮询模式，即轮询将请求转发到后端的各个Pod上。
*   SessionAffinity：基于客户端IP地址进行会话保持的模式，即第1次将某个客户端发起的请求转发到后端的某个Pod上，之后从相同的客户端发起的请求都将被转发到后端相同的Pod上。

## 简述Kubernetes Headless Service？

在某些应用场景中，若需要人为指定负载均衡器，不使用Service提供的默认负载均衡的功能，或者应用程序希望知道属于同组服务的其他实例。Kubernetes提供了Headless Service来实现这种功能，即不为Service设置ClusterIP（入口IP地址），仅通过Label Selector将后端的Pod列表返回给调用的客户端。

## 简述Kubernetes外部如何访问集群内的服务？

对于Kubernetes，集群外的客户端默认情况，无法通过Pod的IP地址或者Service的虚拟IP地址:虚拟端口号进行访问。通常可以通过以下方式进行访问Kubernetes集群内的服务：

映射Pod到物理机：将Pod端口号映射到宿主机，即在Pod中采用hostPort方式，以使客户端应用能够通过物理机访问容器应用。

映射Service到物理机：将Service端口号映射到宿主机，即在Service中采用nodePort方式，以使客户端应用能够通过物理机访问容器应用。

映射Sercie到LoadBalancer：通过设置LoadBalancer映射到云服务商提供的LoadBalancer地址。这种用法仅用于在公有云服务提供商的云平台上设置Service的场景。

## 简述Kubernetes ingress？

Kubernetes的Ingress资源对象，用于将不同URL的访问请求转发到后端不同的Service，以实现HTTP层的业务路由机制。

Kubernetes使用了Ingress策略和Ingress Controller，两者结合并实现了一个完整的Ingress负载均衡器。使用Ingress进行负载分发时，Ingress Controller基于Ingress规则将客户端请求直接转发到Service对应的后端Endpoint（Pod）上，从而跳过kube-proxy的转发功能，kube-proxy不再起作用，全过程为：ingress controller + ingress 规则 ----> services。

同时当Ingress Controller提供的是对外服务，则实际上实现的是边缘路由器的功能。

## 简述Kubernetes镜像的下载策略？

K8s的镜像下载策略有三种：Always、Never、IFNotPresent。

*   Always：镜像标签为latest时，总是从指定的仓库中获取镜像。
*   Never：禁止从仓库中下载镜像，也就是说只能使用本地镜像。
*   IfNotPresent：仅当本地没有对应镜像时，才从目标仓库中下载。默认的镜像下载策略是：当镜像标签是latest时，默认策略是Always；当镜像标签是自定义时（也就是标签不是latest），那么默认策略是IfNotPresent。

## 简述Kubernetes的负载均衡器？

负载均衡器是暴露服务的最常见和标准方式之一。

根据工作环境使用两种类型的负载均衡器，即内部负载均衡器或外部负载均衡器。内部负载均衡器自动平衡负载并使用所需配置分配容器，而外部负载均衡器将流量从外部负载引导至后端容器。

## 简述Kubernetes各模块如何与API Server通信？

Kubernetes API Server作为集群的核心，负责集群各功能模块之间的通信。集群内的各个功能模块通过API Server将信息存入etcd，当需要获取和操作这些数据时，则通过API Server提供的REST接口（用GET、LIST或WATCH方法）来实现，从而实现各模块之间的信息交互。

如kubelet进程与API Server的交互：每个Node上的kubelet每隔一个时间周期，就会调用一次API Server的REST接口报告自身状态，API Server在接收到这些信息后，会将节点状态信息更新到etcd中。

如kube-controller-manager进程与API Server的交互：kube-controller-manager中的Node Controller模块通过API Server提供的Watch接口实时监控Node的信息，并做相应处理。

如kube-scheduler进程与API Server的交互：Scheduler通过API Server的Watch接口监听到新建Pod副本的信息后，会检索所有符合该Pod要求的Node列表，开始执行Pod调度逻辑，在调度成功后将Pod绑定到目标节点上。

## 简述Kubernetes Scheduler作用及实现原理？

Kubernetes Scheduler是负责Pod调度的重要功能模块，Kubernetes Scheduler在整个系统中承担了“承上启下”的重要功能，“承上”是指它负责接收Controller Manager创建的新Pod，为其调度至目标Node；“启下”是指调度完成后，目标Node上的kubelet服务进程接管后继工作，负责Pod接下来生命周期。

Kubernetes Scheduler的作用是将待调度的Pod（API新创建的Pod、Controller Manager为补足副本而创建的Pod等）按照特定的调度算法和调度策略绑定（Binding）到集群中某个合适的Node上，并将绑定信息写入etcd中。

在整个调度过程中涉及三个对象，分别是待调度Pod列表、可用Node列表，以及调度算法和策略。

Kubernetes Scheduler通过调度算法调度为待调度Pod列表中的每个Pod从Node列表中选择一个最适合的Node来实现Pod的调度。随后，目标节点上的kubelet通过API Server监听到Kubernetes Scheduler产生的Pod绑定事件，然后获取对应的Pod清单，下载Image镜像并启动容器。

## 简述Kubernetes Scheduler使用哪两种算法将Pod绑定到worker节点？

Kubernetes Scheduler根据如下两种调度算法将 Pod 绑定到最合适的工作节点：

预选（Predicates）：输入是所有节点，输出是满足预选条件的节点。kube-scheduler根据预选策略过滤掉不满足策略的Nodes。如果某节点的资源不足或者不满足预选策略的条件则无法通过预选。如“Node的label必须与Pod的Selector一致”。

优选（Priorities）：输入是预选阶段筛选出的节点，优选会根据优先策略为通过预选的Nodes进行打分排名，选择得分最高的Node。例如，资源越富裕、负载越小的Node可能具有越高的排名。

## 简述Kubernetes kubelet的作用？

在Kubernetes集群中，在每个Node（又称Worker）上都会启动一个kubelet服务进程。该进程用于处理Master下发到本节点的任务，管理Pod及Pod中的容器。每个kubelet进程都会在API Server上注册节点自身的信息，定期向Master汇报节点资源的使用情况，并通过cAdvisor监控容器和节点资源。

## 简述Kubernetes kubelet监控Worker节点资源是使用什么组件来实现的？

kubelet使用cAdvisor对worker节点资源进行监控。在 Kubernetes 系统中，cAdvisor 已被默认集成到 kubelet 组件内，当 kubelet 服务启动时，它会自动启动 cAdvisor 服务，然后 cAdvisor 会实时采集所在节点的性能指标及在节点上运行的容器的性能指标。

## 简述Kubernetes如何保证集群的安全性？

Kubernetes通过一系列机制来实现集群的安全控制，主要有如下不同的维度：

*   基础设施方面：保证容器与其所在宿主机的隔离；
*   权限方面：
*   最小权限原则：合理限制所有组件的权限，确保组件只执行它被授权的行为，通过限制单个组件的能力来限制它的权限范围。
*   用户权限：划分普通用户和管理员的角色。
*   集群方面：
*   API Server的认证授权：Kubernetes集群中所有资源的访问和变更都是通过Kubernetes API Server来实现的，因此需要建议采用更安全的HTTPS或Token来识别和认证客户端身份（Authentication），以及随后访问权限的授权（Authorization）环节。
*   API Server的授权管理：通过授权策略来决定一个API调用是否合法。对合法用户进行授权并且随后在用户访问时进行鉴权，建议采用更安全的RBAC方式来提升集群安全授权。
*   敏感数据引入Secret机制：对于集群敏感数据建议使用Secret方式进行保护。
*   AdmissionControl（准入机制）：对kubernetes api的请求过程中，顺序为：先经过认证 & 授权，然后执行准入操作，最后对目标对象进行操作。

## 简述Kubernetes准入机制？

在对集群进行请求时，每个准入控制代码都按照一定顺序执行。如果有一个准入控制拒绝了此次请求，那么整个请求的结果将会立即返回，并提示用户相应的error信息。

准入控制（AdmissionControl）准入控制本质上为一段准入代码，在对kubernetes api的请求过程中，顺序为：先经过认证 & 授权，然后执行准入操作，最后对目标对象进行操作。常用组件（控制代码）如下：

*   AlwaysAdmit：允许所有请求
*   AlwaysDeny：禁止所有请求，多用于测试环境。
*   ServiceAccount：它将serviceAccounts实现了自动化，它会辅助serviceAccount做一些事情，比如如果pod没有serviceAccount属性，它会自动添加一个default，并确保pod的serviceAccount始终存在。
*   LimitRanger：观察所有的请求，确保没有违反已经定义好的约束条件，这些条件定义在namespace中LimitRange对象中。
*   NamespaceExists：观察所有的请求，如果请求尝试创建一个不存在的namespace，则这个请求被拒绝。

## 简述Kubernetes RBAC及其特点（优势）？

RBAC是基于角色的访问控制，是一种基于个人用户的角色来管理对计算机或网络资源的访问的方法。

相对于其他授权模式，RBAC具有如下优势：

*   对集群中的资源和非资源权限均有完整的覆盖。
*   整个RBAC完全由几个API对象完成， 同其他API对象一样， 可以用kubectl或API进行操作。
*   可以在运行时进行调整，无须重新启动API Server。

## 简述Kubernetes Secret作用？

Secret对象，主要作用是保管私密数据，比如密码、OAuth Tokens、SSH Keys等信息。将这些私密信息放在Secret对象中比直接放在Pod或Docker Image中更安全，也更便于使用和分发。

## 简述Kubernetes Secret有哪些使用方式？

创建完secret之后，可通过如下三种方式使用：

*   在创建Pod时，通过为Pod指定Service Account来自动使用该Secret。
*   通过挂载该Secret到Pod来使用它。
*   在Docker镜像下载时使用，通过指定Pod的spc.ImagePullSecrets来引用它。

## 简述Kubernetes PodSecurityPolicy机制？

Kubernetes PodSecurityPolicy是为了更精细地控制Pod对资源的使用方式以及提升安全策略。在开启PodSecurityPolicy准入控制器后，Kubernetes默认不允许创建任何Pod，需要创建PodSecurityPolicy策略和相应的RBAC授权策略（Authorizing Policies），Pod才能创建成功。

## 简述Kubernetes PodSecurityPolicy机制能实现哪些安全策略？

在PodSecurityPolicy对象中可以设置不同字段来控制Pod运行时的各种安全策略，常见的有：

*   特权模式：privileged是否允许Pod以特权模式运行。
*   宿主机资源：控制Pod对宿主机资源的控制，如hostPID：是否允许Pod共享宿主机的进程空间。
*   用户和组：设置运行容器的用户ID（范围）或组（范围）。
*   提升权限：AllowPrivilegeEscalation：设置容器内的子进程是否可以提升权限，通常在设置非root用户（MustRunAsNonRoot）时进行设置。
*   SELinux：进行SELinux的相关配置。

## 简述Kubernetes网络模型？

Kubernetes网络模型中每个Pod都拥有一个独立的IP地址，并假定所有Pod都在一个可以直接连通的、扁平的网络空间中。所以不管它们是否运行在同一个Node（宿主机）中，都要求它们可以直接通过对方的IP进行访问。设计这个原则的原因是，用户不需要额外考虑如何建立Pod之间的连接，也不需要考虑如何将容器端口映射到主机端口等问题。

同时为每个Pod都设置一个IP地址的模型使得同一个Pod内的不同容器会共享同一个网络命名空间，也就是同一个Linux网络协议栈。这就意味着同一个Pod内的容器可以通过localhost来连接对方的端口。

在Kubernetes的集群里，IP是以Pod为单位进行分配的。一个Pod内部的所有容器共享一个网络堆栈（相当于一个网络命名空间，它们的IP地址、网络设备、配置等都是共享的）。

## 简述Kubernetes CNI模型？

CNI提供了一种应用容器的插件化网络解决方案，定义对容器网络进行操作和配置的规范，通过插件的形式对CNI接口进行实现。CNI仅关注在创建容器时分配网络资源，和在销毁容器时删除网络资源。在CNI模型中只涉及两个概念：容器和网络。

容器（Container）：是拥有独立Linux网络命名空间的环境，例如使用Docker或rkt创建的容器。容器需要拥有自己的Linux网络命名空间，这是加入网络的必要条件。

网络（Network）：表示可以互连的一组实体，这些实体拥有各自独立、唯一的IP地址，可以是容器、物理机或者其他网络设备（比如路由器）等。

对容器网络的设置和操作都通过插件（Plugin）进行具体实现，CNI插件包括两种类型：CNI Plugin和IPAM（IP Address Management）Plugin。CNI Plugin负责为容器配置网络资源，IPAM Plugin负责对容器的IP地址进行分配和管理。IPAM Plugin作为CNI Plugin的一部分，与CNI Plugin协同工作。

## 简述Kubernetes网络策略？

为实现细粒度的容器间网络访问隔离策略，Kubernetes引入Network Policy。

Network Policy的主要功能是对Pod间的网络通信进行限制和准入控制，设置允许访问或禁止访问的客户端Pod列表。Network Policy定义网络策略，配合策略控制器（Policy Controller）进行策略的实现。

## 简述Kubernetes网络策略原理？

Network Policy的工作原理主要为：policy controller需要实现一个API Listener，监听用户设置的Network Policy定义，并将网络访问规则通过各Node的Agent进行实际设置（Agent则需要通过CNI网络插件实现）。

## 简述Kubernetes中flannel的作用？

Flannel可以用于Kubernetes底层网络的实现，主要作用有：

*   它能协助Kubernetes，给每一个Node上的Docker容器都分配互相不冲突的IP地址。
*   它能在这些IP地址之间建立一个覆盖网络（Overlay Network），通过这个覆盖网络，将数据包原封不动地传递到目标容器内。

## 简述Kubernetes Calico网络组件实现原理？

Calico是一个基于BGP的纯三层的网络方案，与OpenStack、Kubernetes、AWS、GCE等云平台都能够良好地集成。

Calico在每个计算节点都利用Linux Kernel实现了一个高效的vRouter来负责数据转发。每个vRouter都通过BGP协议把在本节点上运行的容器的路由信息向整个Calico网络广播，并自动设置到达其他节点的路由转发规则。

Calico保证所有容器之间的数据流量都是通过IP路由的方式完成互联互通的。Calico节点组网时可以直接利用数据中心的网络结构（L2或者L3），不需要额外的NAT、隧道或者Overlay Network，没有额外的封包解包，能够节约CPU运算，提高网络效率。

## 简述Kubernetes共享存储的作用？

Kubernetes对于有状态的容器应用或者对数据需要持久化的应用，因此需要更加可靠的存储来保存应用产生的重要数据，以便容器应用在重建之后仍然可以使用之前的数据。因此需要使用共享存储。

## 简述Kubernetes数据持久化的方式有哪些？

Kubernetes 通过数据持久化来持久化保存重要数据，常见的方式有：

EmptyDir（空目录）：没有指定要挂载宿主机上的某个目录，直接由Pod内保部映射到宿主机上。类似于docker中的manager volume。

*   场景：
*   只需要临时将数据保存在磁盘上，比如在合并/排序算法中；
*   作为两个容器的共享存储。
*   特性：
*   同个pod里面的不同容器，共享同一个持久化目录，当pod节点删除时，volume的数据也会被删除。
*   emptyDir的数据持久化的生命周期和使用的pod一致，一般是作为临时存储使用。

Hostpath：将宿主机上已存在的目录或文件挂载到容器内部。类似于docker中的bind mount挂载方式。

*   特性：增加了pod与节点之间的耦合。

PersistentVolume（简称PV）：如基于NFS服务的PV，也可以基于GFS的PV。它的作用是统一数据持久化目录，方便管理。

## 简述Kubernetes PV和PVC？

PV是对底层网络共享存储的抽象，将共享存储定义为一种“资源”。

PVC则是用户对存储资源的一个“申请”。

## 简述Kubernetes PV生命周期内的阶段？

某个PV在生命周期中可能处于以下4个阶段（Phaes）之一。

*   Available：可用状态，还未与某个PVC绑定。
*   Bound：已与某个PVC绑定。
*   Released：绑定的PVC已经删除，资源已释放，但没有被集群回收。
*   Failed：自动资源回收失败。

## 简述Kubernetes所支持的存储供应模式？

Kubernetes支持两种资源的存储供应模式：静态模式（Static）和动态模式（Dynamic）。

静态模式：集群管理员手工创建许多PV，在定义PV时需要将后端存储的特性进行设置。

动态模式：集群管理员无须手工创建PV，而是通过StorageClass的设置对后端存储进行描述，标记为某种类型。此时要求PVC对存储的类型进行声明，系统将自动完成PV的创建及与PVC的绑定。

## 简述Kubernetes CSI模型？

Kubernetes CSI是Kubernetes推出与容器对接的存储接口标准，存储提供方只需要基于标准接口进行存储插件的实现，就能使用Kubernetes的原生存储机制为容器提供存储服务。CSI使得存储提供方的代码能和Kubernetes代码彻底解耦，部署也与Kubernetes核心组件分离，显然，存储插件的开发由提供方自行维护，就能为Kubernetes用户提供更多的存储功能，也更加安全可靠。

CSI包括CSI Controller和CSI Node：

*   CSI Controller的主要功能是提供存储服务视角对存储资源和存储卷进行管理和操作。
*   CSI Node的主要功能是对主机（Node）上的Volume进行管理和操作。

## 简述Kubernetes Worker节点加入集群的过程？

通常需要对Worker节点进行扩容，从而将应用系统进行水平扩展。主要过程如下：

*   1、在该Node上安装Docker、kubelet和kube-proxy服务；
*   2、然后配置kubelet和kubeproxy的启动参数，将Master URL指定为当前Kubernetes集群Master的地址，最后启动这些服务；
*   3、通过kubelet默认的自动注册机制，新的Worker将会自动加入现有的Kubernetes集群中；
*   4、Kubernetes Master在接受了新Worker的注册之后，会自动将其纳入当前集群的调度范围。

## 简述Kubernetes Pod如何实现对节点的资源控制？

Kubernetes集群里的节点提供的资源主要是计算资源，计算资源是可计量的能被申请、分配和使用的基础资源。当前Kubernetes集群中的计算资源主要包括CPU、GPU及Memory。CPU与Memory是被Pod使用的，因此在配置Pod时可以通过参数CPU Request及Memory Request为其中的每个容器指定所需使用的CPU与Memory量，Kubernetes会根据Request的值去查找有足够资源的Node来调度此Pod。

通常，一个程序所使用的CPU与Memory是一个动态的量，确切地说，是一个范围，跟它的负载密切相关：负载增加时，CPU和Memory的使用量也会增加。

## 简述Kubernetes Requests和Limits如何影响Pod的调度？

当一个Pod创建成功时，Kubernetes调度器（Scheduler）会为该Pod选择一个节点来执行。对于每种计算资源（CPU和Memory）而言，每个节点都有一个能用于运行Pod的最大容量值。调度器在调度时，首先要确保调度后该节点上所有Pod的CPU和内存的Requests总和，不超过该节点能提供给Pod使用的CPU和Memory的最大容量值。

## 简述Kubernetes Metric Service？

在Kubernetes从1.10版本后采用Metrics Server作为默认的性能数据采集和监控，主要用于提供核心指标（Core Metrics），包括Node、Pod的CPU和内存使用指标。

对其他自定义指标（Custom Metrics）的监控则由Prometheus等组件来完成。

## 简述Kubernetes中，如何使用EFK实现日志的统一管理？

在Kubernetes集群环境中，通常一个完整的应用或服务涉及组件过多，建议对日志系统进行集中化管理，通常采用EFK实现。

EFK是 Elasticsearch、Fluentd 和 Kibana 的组合，其各组件功能如下：

*   Elasticsearch：是一个搜索引擎，负责存储日志并提供查询接口；
*   Fluentd：负责从 Kubernetes 搜集日志，每个node节点上面的fluentd监控并收集该节点上面的系统日志，并将处理过后的日志信息发送给Elasticsearch；
*   Kibana：提供了一个 Web GUI，用户可以浏览和搜索存储在 Elasticsearch 中的日志。

通过在每台node上部署一个以DaemonSet方式运行的fluentd来收集每台node上的日志。Fluentd将docker日志目录/var/lib/docker/containers和/var/log目录挂载到Pod中，然后Pod会在node节点的/var/log/pods目录中创建新的目录，可以区别不同的容器日志输出，该目录下有一个日志文件链接到/var/lib/docker/contianers目录下的容器日志输出。

## 简述Kubernetes如何进行优雅的节点关机维护？

由于Kubernetes节点运行大量Pod，因此在进行关机维护之前，建议先使用kubectl drain将该节点的Pod进行驱逐，然后进行关机维护。

## 简述Kubernetes集群联邦？

Kubernetes集群联邦可以将多个Kubernetes集群作为一个集群进行管理。因此，可以在一个数据中心/云中创建多个Kubernetes集群，并使用集群联邦在一个地方控制/管理所有集群。

## 简述Helm及其优势？

Helm 是 Kubernetes 的软件包管理工具。类似 Ubuntu 中使用的apt、Centos中使用的yum 或者Python中的 pip 一样。

Helm能够将一组K8S资源打包统一管理, 是查找、共享和使用为Kubernetes构建的软件的最佳方式。

Helm中通常每个包称为一个Chart，一个Chart是一个目录（一般情况下会将目录进行打包压缩，形成name-version.tgz格式的单一文件，方便传输和存储）。

##### Helm优势

在 Kubernetes中部署一个可以使用的应用，需要涉及到很多的 Kubernetes 资源的共同协作。使用helm则具有如下优势：

*   统一管理、配置和更新这些分散的 k8s 的应用资源文件；
*   分发和复用一套应用模板；
*   将应用的一系列资源当做一个软件包管理。
*   对于应用发布者而言，可以通过 Helm 打包应用、管理应用依赖关系、管理应用版本并发布应用到软件仓库。
*   对于使用者而言，使用 Helm 后不用需要编写复杂的应用部署文件，可以以简单的方式在 Kubernetes 上查找、安装、升级、回滚、卸载应用程序。

> 来源：[https://www.yuque.com/docs/sh...](https://link.segmentfault.com/?enc=jmsHh2N7Z0ykVXcw%2B%2BiGog%3D%3D.umLhPTD5O3hJVaa54SIxWQkMI0R7LodEhYSTEevO5uhc3quUv1fpi9oDVH8afd8KEyflq0FP%2BGIV2V97H3h6FJ2Y9%2F7Nq2gh7V49QTpj5wo%3D)

![](/img/bVbLc6v)

>参考链接：[https://segmentfault.com/a/1190000040004560](https://segmentfault.com/a/1190000040004560)，整理：沉默王二
