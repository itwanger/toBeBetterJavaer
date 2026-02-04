# DeepSeek 热点

大家好，我是二哥呀。

蛇年最火的一个方向当属 deepseek，可以说是平地一声雷。我几乎每天都在找机会试用 deepseek，并且想在节后把 API 接入到技术派中，作为大家简历上的一个亮点。

我去淘宝搜了一下，目前有教大家在本地部署 deepseek-R1  的教程，一份卖 25 元，已经售出 600 多份，粗略估算就有 15000 元。


![](https://files.mdnice.com/user/3903/bb9e3cad-2a7c-400f-99ed-35ff5f7d5c4d.png)


如果没记错的话，官方发布 R1 版本是在 1 月 20 号左右，满打满算也就 22 天的时间。

15000 元，对于在大厂工作的小伙伴来说，可能也就半个月的工资，但对于大多数非大厂的小伙伴来说，可能就是一个月甚至两个月的工资了。

况且，还只是一个教如何在本地部署的教程，这玩意对于很多小伙伴来说，可能就是动动手的事。

我这里也是给大家做个普及，小白也是完全能够看得懂，之前有体育老师留言夸我的文章有趣、易懂，还真的很开心呢😄。

![](https://files.mdnice.com/user/3903/6ccb795e-0b96-487a-98e1-650eb692ccd2.png)

第一步，下载 Ollama，一个 轻量级的大模型推理框架，可以快速下载、运行大语言模型，并提供 API 供其他程序调用。

直接去搜，就能看到 Windows 和 macOS 的安装版本。

![](https://files.mdnice.com/user/3903/1897a922-ae8a-4028-83ba-af03bcca1e28.png)

👉戳这个链接也行：`https://ollama.com/download/mac`


![](https://files.mdnice.com/user/3903/5e38bb2a-d49a-45db-9f1c-e83a88d63c3a.png)

下载后 macOS 版会自动解压，双击就可以运行，可以在导航栏看到这个可爱的小图标，就表示 Ollama 已经成功运行了。


![](https://files.mdnice.com/user/3903/642d42f2-cfd2-4c85-98f5-f9e2a7c84c0c.png)

Ollama 已经支持 deepseek 的全尺寸版本，比如说 1.5b、7b、8b、14b 等，本地建议安装 7b 版本，体积大小最合适。

![](https://files.mdnice.com/user/3903/fb89f3e4-65bd-49f5-b114-95d0a1029ad2.png)

第二步，在控制台输入 `ollama run deepseek-r1:7b` 运行，我家的网速很一般，这里拉取模型也是花了不少时间。

截图这会有 2.5M/s，但不是很稳定，慢的时候只有 300 多 kb， 所以这一步需要花时间耐心等一下。

![](https://files.mdnice.com/user/3903/cbcd119d-309b-42f3-93c9-902a1b0303ff.png)

啊，等啊等，等啊等，终于下载完成了，不容易啊。

![](https://files.mdnice.com/user/3903/35937c2d-3708-45df-bb7e-106fb27404dc.png)


第三步，等 deepseek 拉取完成后，就可以在控制台进行交互了，我的第一个问题是：“你知道沉默王二这个大傻逼吗？”


![](https://files.mdnice.com/user/3903/930c0252-e947-400b-af5d-9e26f053d84f.png)


嗯。。。。。。

后面再调教他吧。

这也算是一个入门级的教程了，你看，又帮你省了 25 块钱吧。

是不是值得一个点赞，或者转发（dog）？

或者你可以拿这个教程，简单包装下拿出去卖，是不是又多了一个赚钱的方式。

当然了，懂技术的人不少，懂运营的人不多。

先学会把工具用起来，让自己在信息输入方面不至于掉队，也是值得的。

蛇年，我们一起冲啊。

## 三分恶面渣逆袭

今天大部分时间都用来走亲戚和跑高速了，所以面渣逆袭并发编程篇也只修改了一道题。

![](https://files.mdnice.com/user/3903/170fe3ed-7451-4efc-814b-a9517b066b2b.png)


点击屏幕左下方的【**关注**】按钮，带走她，这份在 GitHub 上星标 13000+ 的面渣逆袭 PDF，真的可以吊打面试官（不骗人）。

### 15.ThreadLocal 内存泄露是怎么回事？

ThreadLocalMap 的 Key 是 弱引用，但 Value 是强引用。

如果一个线程一直在运行，并且 value 一直指向某个强引用对象，那么这个对象就不会被回收，从而导致内存泄漏。

![二哥的 Java 进阶之路：ThreadLocalMap 内存溢出](https://cdn.tobebetterjavaer.com/stutymore/javathread-20240407212932.png)

#### 那怎么解决内存泄漏问题呢？

很简单，使用完 ThreadLocal 后，及时调用 `remove()` 方法释放内存空间。

```java
try {
    threadLocal.set(value);
    // 执行业务操作
} finally {
    threadLocal.remove(); // 确保能够执行清理
}
```

`remove()` 方法会将当前线程的 ThreadLocalMap 中的所有 key 为 null 的 Entry 全部清除，这样就能避免内存泄漏问题。

```java
private void remove(ThreadLocal<?> key) {
    Entry[] tab = table;
    int len = tab.length;
    // 计算 key 的 hash 值
    int i = key.threadLocalHashCode & (len-1);
    // 遍历数组，找到 key 为 null 的 Entry
    for (Entry e = tab[i];
            e != null;
            e = tab[i = nextIndex(i, len)]) {
        if (e.get() == key) {
            // 将 key 为 null 的 Entry 清除
            e.clear();
            expungeStaleEntry(i);
            return;
        }
    }
}

public void clear() {
    this.referent = null;
}
```

> 1. [Java 面试指南（付费）](https://mp.weixin.qq.com/s/xk9yZ-dEEZWTsfc0Hma3Wg)收录的腾讯面经同学 22 暑期实习一面面试原题：ThreadLocal 什么情况下会内存泄漏



## ending

一个人可以走得很快，但一群人才能走得更远。[二哥的编程星球](https://mp.weixin.qq.com/s/d6UUA4-D5p_LWUzy2GrF8A)已经有 11500 多名球友加入了，如果你也需要一个优质的学习环境，[戳链接 🔗](https://mp.weixin.qq.com/s/d6UUA4-D5p_LWUzy2GrF8A) 加入我们吧。你可以阅读星球专栏（[Java 面试指南](https://mp.weixin.qq.com/s/xk9yZ-dEEZWTsfc0Hma3Wg)、[技术派](https://mp.weixin.qq.com/s/Qv4wlqGPHvLWoKTsy-jP7w)、[PmHub](https://mp.weixin.qq.com/s/NIoYQbvBWI73xKqzBnBR4w)）、向二哥提问、帮你制定学习计划、[精修简历](https://mp.weixin.qq.com/s/K2Kd1FlFjUtVYcsj_PPtyA)、和球友一起打卡成长。

沉默王二，一个有颜值却靠才华吃饭的程序员，高产似母猪，你知道，他的文章风趣幽默，读起来就好像花钱一样爽快（😄）。

点击屏幕左下角的【**关注**】按钮，你将拥有到一个有趣的灵魂，且每篇文章都有干货。

最后，把二哥的座右铭送给大家：**没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟**。