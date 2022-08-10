---
title: Java类是如何默认继承Object的？
shortTitle: Java类是如何默认继承Object的？
description: 积累在平时，多了解一点细节总是好的
category:
  - 微信公众号
head:
---

来源丨walkinger

https://juejin.im/post/5ca1e8ade51d454e6a300048

![](https://mmbiz.qpic.cn/mmbiz_jpg/xq9PqibkVAzq8bjJ7ic6W9X0HQpaf5jIoB84FptSMEPKm3xx2XYuicZQcAQ1BzOfibGgbgEiahQpU9k6R1ZL0wvt7Ng/640?wx_fmt=jpeg)



* * *

**前  言**

学过 `Java`的人都知道， `Object`是所有类的父类。但是你有没有这样的疑问，我并没有写 `extendsObject`，它是怎么默认继承 `Object`的呢？那么今天我们就来看看像 `Java`这种依赖于虚拟机的编程语言是怎样实现默认继承 `Object`的，以及 `Java`编译器和 `JVM`到底是如何做的？

* * *

**继承自Object验证**

首先我们来验证一下 `Object`是不是所有类的父类，随便新建一个Java类，如下图：

![](https://mmbiz.qpic.cn/mmbiz_png/xq9PqibkVAzq8bjJ7ic6W9X0HQpaf5jIoBeJzeArXuLfoUHHiaAEWZSakuDbszOnDRPmFQJqy8rtJXvjxP64UyaRQ/640?wx_fmt=png)

从上面的代码可以看出， `newMyClass()`打点之后可以选择调用的方法有很多，我们定义的 `MyClass`类里面只有一个 `main`方法，那这些方法哪来的，显然是 `Object`里声明的，故 `MyClass`类的父类就是 `Object`，因此，在 `MyClass`中可以使用 `Object`类的 `public`或 `protected`资源。

另外，当 `A`类继承 `MyClass`类时，通过打点也可以调到 `Object`内的方法，这是继承的传递，好比 `Object`是 `MyClass`的“父亲”， `MyClass`是A类的“父亲”， `Object`是A类的“爷爷”，间接的继承了 `Object`。因此， `Object`是超类，是所有类的父类。

* * *

**推测可能的原因**

> 要了解 `Java类是如何默认继承Object的？` 的原因其实并不需要知道JVM的实现细节。只需了解一下对于这种虚拟机程序的基本原理即可。一般对于这种靠虚拟机运行的语言（如 `Java`、 `C#`等）会有两种方法处理默认继承问题。

*   **编译器处理**

在编译源代码时，当一个类没有显式标明继承的父类时，编译器会为其指定一个默认的父类（一般为 `Object`），而交给虚拟机处理这个类时，由于这个类已经有一个默认的父类了，因此， `VM`仍然会按照常规的方法像处理其他类一样来处理这个类。对于这种情况，从编译后的二进制角度来看，所有的类都会有一个父类（后面可以以此依据来验证）。

*   **JVM处理**

编译器仍然按照实际代码进行编译，并不会做额外的处理，即如果一个类没有显式地继承于其他类时，编译后的代码仍然没有父类。然后由虚拟机运行二进制代码时，当遇到没有父类的类时，就会自动将这个类看成是 `Object`类的子类（一般这类语言的默认父类都是 `Object`）。

* * *

**验证结论**

从上面两种情况可以看出，**第 1种情况** 是在编译器上做的文章，也就是说，当没有父类时，由编译器在编译时自动为其指定一个父类。**第 2种情况** 是在虚拟机上做文章，也就是这个默认的父类是由虚拟机来添加的。

那么 `Java`是属于哪一种情况呢？其实这个答案很好得出。只需要随便找一个反编译工具，将 `.class`文件进行反编译即可得知编译器是如何编译的。

就以上面代码为例，如果是**第 1种情况**，就算 `MyClass`没有父类，但由于编译器已经为 `MyClass`自动添加了一个Object父类，所以，在反编译后得到的源代码中的 `MyClass`类将会继承 `Object`类的。如果不是这种情况，那么就是**第 2种情况**。

那么实际情况是什么样的呢？现在我们就将 `MyClass.class`反编译看看到底如何。

*   **jd-gui 反编译**

![](https://mmbiz.qpic.cn/mmbiz_png/xq9PqibkVAzq8bjJ7ic6W9X0HQpaf5jIoBdqoBYEHmWl3yibG3ibZyFcBGTAKFmuP1TYw0Er8Jj3jZ9SpiaZK1XePeA/640?wx_fmt=png)

*   **使用JDK自带的工具（javap）反编译**

`CMD`命令行下执行： `javap MyClass>MyClass.txt`

![](https://mmbiz.qpic.cn/mmbiz_png/xq9PqibkVAzq8bjJ7ic6W9X0HQpaf5jIoBpxQeYtViciahfAWQztBSUiawRvXQfEv6KHAo19hjTSa02AOicT2Dk6q1ZQ/640?wx_fmt=png)

可以看出实际的反编译后的文件中并没有 `extendsObject`，使用排除法，因此是 **第2种情况**。

这样来推导出的结论是 第2种情况，但事实真的如此吗？为什么网上还有说反编译后的是有 `extendsObject`字样？



*   **JDK版本问题？**

猜想是 `JDK`版本的问题，于是把 `JDK`版本切换到7，使用 `jd-gui`和 `javap`反编译，接果和使用 `JDK8`反编译后的结果一样，也都没有 `extendsObject`。

继续换版本，下载了半天把 `JDK 6`下载下来了，安装后把 `JDK`版本切换到 `JDK 6`。

仍然在 `CMD`窗口执行 `javap MyClass>MyClass.txt`，得到的 `TXT`文件内容如下：

![](https://mmbiz.qpic.cn/mmbiz_png/xq9PqibkVAzq8bjJ7ic6W9X0HQpaf5jIoBjlspuobsW90Gcpfibb8dSCU03aPyvficgs0Ko5Ozn9lDib4aibHQ6N97kQ/640?wx_fmt=png)

what？竟然有 `extendsObject`， `jd-gui`反编译后的依然没有。即， `JDK 6`之前使用 `javap`反编译后的 `MyClass`类显式的继承 `Object`， `JDK 7`以后没有； `jd-gui`反编译后的不管 `JDK`版本如何始终没有。我们以 `java`自带的工具为准。

* * *

**小   结**

那么就是说 `JDK 6`之前是编译器处理， `JDK 7`之后是虚拟机处理。

但是仔细想想我们在编辑器里（ `IDEA`）打点时就能列出 `Object`类下的方法，此时还没轮到编译器和 `jvm`，编辑器就已经知道 `MyClass`类的父类是 `Object`类了，这是因为编辑器为我们做了一些智能处理。

* * *

**后 记

**

> 由于能力有限，若有错误或者不当之处，还请大家批评指正，一起学习交流！

****个人网站：****www.codesheep.cn (程序羊)****

**更多热文在此：**

  ●  [Spring Boot 系列实战文章合集（源码已开源）](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247484006&idx=1&sn=15cf2b8a17bd6f49952f65bdc718724b&chksm=fdded4a2caa95db4b3099fa75635a7d99655e22963f9dc65446cd703a66cbc9b2a22b87b7ece&scene=21#wechat_redirect)

  ●  [程序员写简历时必须注意的技术词汇拼写](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247484027&idx=1&sn=1f005a4c2ec45631865429ff9ccfbe44&chksm=fdded4bfcaa95da942be42b38c7733bdf5ce322136231ca2014dc6b92c117a2fe5bea35bb6bb&scene=21#wechat_redirect)

  ●  [异步编程的几种方式](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247484090&idx=1&sn=90561bfbd4738f32f4cf811f7193c0b8&chksm=fdded47ecaa95d681a61983899a63a38cae03e9440777e474198753c02ac8c6dc4528c71e912&scene=21#wechat_redirect)

  ●  [从一份配置清单详解Nginx服务器配置](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247483807&idx=1&sn=e3a164701c2f6e0f3cf91bd25d595479&chksm=fdded75bcaa95e4d857e5f4e040f37b7c3d8f3b301856493419498b6e54d8a43addfc25e7505&scene=21#wechat_redirect)

  ●  [一文上手 Elasticsearch常用可视化管理工具](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247483913&idx=1&sn=254e99832da662cd5dc7af57bfb0081b&chksm=fdded4cdcaa95ddbf867ce83b2a4c48aa497d6b61b087ba9111b040dfcfaab1f8c9aa34f2d53&scene=21#wechat_redirect)

  ●  [Docker容器可视化监控中心搭建](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247483763&idx=1&sn=6ceb9e73540b5016dadfb212636b3855&chksm=fdded7b7caa95ea1165b507397c39267d3bf7522c83cc8ed10eae4ee4a13db831eb58a3dc167&scene=21#wechat_redirect)

  ●  [利用ELK搭建Docker容器化应用日志中心](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247483768&idx=1&sn=df06fd3fc033ef8120a14677db388d9a&chksm=fdded7bccaa95eaaac9ff046c1c7fad0d3489ec7af546d829175af6106340e053f570e8c927c&scene=21#wechat_redirect)

  ●  [RPC框架实践之：Google gRPC](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247483780&idx=1&sn=e04264df80209244f8e263ef0931d134&chksm=fdded740caa95e56190918108985795439a277a88e054c119b3cb63a92a8e0899943d9f3e02b&scene=21#wechat_redirect)

  ●  [一文详解 Linux系统常用监控工具](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247483877&idx=1&sn=113867c83c0cecf5781a9e1a7f91bdd1&chksm=fdded721caa95e37f757660e7f14775ac55e4a72f9c24b119af7ef83ca7587ceb53f22298c99&scene=21#wechat_redirect)

* * *

作者更多 **务实、能看懂、可复现的** 技术文章尽在公众号 **CodeSheep**，欢迎扫码订阅，第一时间获取更新 ⬇️⬇️⬇️

![](https://mmbiz.qpic.cn/mmbiz_gif/xq9PqibkVAzr3Ax6dwjysCZ8Zsom5kkKicbdS1tYartkx9YyCm5qtynaUicLDXjYcZaQbXVIFjBETA7RJJEYvkiciaA/640?)

****欲进群交流，可在公众号内回复「****进群****」，我邀请您！****

******让我“****好看****” ************

![](https://mmbiz.qpic.cn/mmbiz_gif/kw2nrMk65scprt048NlNbq4wEMicKRhkt63RdNGIiaNLqIzDKYz5hXvVsfibs6WsaoNr1P5PhD0sBHwujeQDMaZeg/640?wx_fmt=gif)

******

>转载链接：[https://mp.weixin.qq.com/s/OVlSeJEWgpKv_pKQgrP9mw](https://mp.weixin.qq.com/s/OVlSeJEWgpKv_pKQgrP9mw)，出处：CodeSheep，整理：沉默王二
