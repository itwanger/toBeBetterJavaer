---
title: 支付宝二面：使用 try-catch 捕获异常会影响性能吗？大部分人都会答错！
shortTitle: 支付宝二面：使用 try-catch 捕获异常会影响性能吗？大部分人都会答错！
description: 扯什么 try-catch 性能问题？
author: 是yes呀
category:
  - 微信公众号
---

“二哥，你看着这鬼代码，竟然在 for 循环里面搞了个 `try-catch`，不知道`try-catch`有性能损耗吗？” 老王煞有其事地指着屏幕里的代码：

```
 for (int i = 0; i < 5000; i++) {
     try {
         dosth
     } catch (Exception e) {
         e.printStackTrace();
     }
 }
```

我探过头去看了眼代码，“那 老王你觉得该怎么改？”

“当然是把 `try-catch` 提到外面啊！” 老王脑子都不转一下，脱口而出。

“你是不是傻？且不说性能，这代码的目的明显是让循环内部单次调用出错不影响循环的运行，你其到外面业务逻辑不就变了吗！”

 老王挠了挠他的地中海，“好像也是啊！”

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8V8dYibzJPUyLTOiaflK9O1oNu5ynX77ecE8GZBJMCu4FDOdZNMz66lJEw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

“回过头来，catch 整个 for 循环和在循环内部 catch，在不出错的情况下，其实性能差不多。” 我喝一口咖啡不经意地提到，准备在 老王前面秀一下。

“啥意思？” 老王有点懵地看着我，“`try-catch`是有性能损耗的，我可是看过网上资料的！”

果然， 老王上钩了，我二话不说直接打开 idea，一顿操作敲了以下代码：

```
public class TryCatchTest {

    @Benchmark
    public void tryfor(Blackhole blackhole) {
        try {
            for (int i = 0; i < 5000; i++) {
                blackhole.consume(i);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Benchmark
    public void fortry(Blackhole blackhole) {
        for (int i = 0; i < 5000; i++) {
            try {
                blackhole.consume(i);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}
```

“BB 不如 show code，看到没， 老王，我把 `try-catch` 从 for 循环里面提出来跟在for循环里面做个对比跑一下，你猜猜两个差多少？”

“切，肯定 tryfor 性能好，想都不用想，不是的话我倒立洗头！” 老王信誓旦旦道。

我懒得跟他BB，直接开始了 benchmark，跑的结果如下：

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8VLO3DiaFJtQSOT2cxM9bGpxCcc2T3MYzNyibvEa9aAQA75s7BSkDCQUFA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

可以看到，两者的性能（数字越大越好）其实差不多：

*   fortry: 86,261(100359-14098) ~ 114,457(100359+14098)
*   tryfor: 95,961(103216-7255) ~ 110,471(103216+7255)

我再调小(一般业务场景 for 循环次数都不会很多)下 for 循环的次数为 1000 ，结果也是差不多：

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8Vu2NibLGzzsxxHx057xxdUleWkw0CzatjkicV5ATY8ibgZzg1OfwibnlERg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

 老王一看傻了：“说好的性能影响呢？怎么没了？”

我直接一个javap，让 老王看看，其实两个实现在字节码层面没啥区别：

> tryfor 的字节码

异常表记录的是 0 - 20 行，如果这些行里面的代码出现问题，直接跳到 23 行处理。

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8VOqgDQpKC9d1bItvZvYDktfJZ1zHibBfxAQhMyg3TiaZAnHedevDpibfeA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

> fortry 的字节码

差别也就是异常表的范围小点，包的是 9-14 行，其它跟 tryfor 都差不多。

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8VUF175V6eI88MdOGcJ5z2iagQiaVnkSU23y9qEgph35XbEicntzWdKFIFQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

所以从字节码层面来看，没抛错两者的执行效率其实没啥差别。

“那为什么网上流传着`try-catch`会有性能问题的说法啊？” 老王觉得非常奇怪。

这个说法确实有，在《Effective Java》这本书里就提到了 `try-catch` 性能问题：

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8Vct7s8STia6NXdKtsm5PheGR97Pma1t08AbS5ibcJFWgm1dVSMBCO0Ubw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

并且还有下面一段话：

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8VwWfNcOOtNgLnRP3MhRibuQgvLMf3Tpyq4BcRaoRGxvfJbAFOsLDglmQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

正所谓听话不能听一半，以前读书时候最怕的就是一知半解，因为完全理解选择题能选对，完全不懂蒙可能蒙对，一知半解必定选到错误的选项！

《Effective Java》书中说的其实是不要用 `try-catch` 来代替正常的代码，书中的举例了正常的 for 循环肯定这样实现：

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8VrZdOBoCtfZXJOGMVHicy8u38sJnCLVsQoYjwUxIxfUO2ZaN4W7J1icicQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

但有个卧龙偏偏不这样实现，要通过  `try-catch` 拐着弯来实现循环：

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8VeQ2RzfXhje63oVYzsTpIFS66ib9Y7NZYFHrrArnL9yTjBJgVATXNHmw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这操作我只能说有点逆天，这两个实现的对比就有性能损耗了。

我们直接再跑下有`try-catch` 的代码和没 `try-catch`的 for 循环区别，代码如下：

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8VuQmWXtnqmlJme23R4gZEl8womzQdTaY7p8uADotSC5bS7ApTUhHDtg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

结果如下：

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8VdLR0khht8pAnxOSVppCRUc8uQNNMY0qFBUYSU8vFpLnK05lR394Tgg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

+-差不多，直接看前面的分数对比，没有 `ry-catch` 的性能确实好些，这也和书中说的 `try-catch` 会影响 JVM 一些特定的优化说法吻合，但是具体没有说影响哪些优化，我猜测可能是指令重排之类的。

好了，我再总结下有关 `try-catch` 性能问题说法：

1.  `try-catch` 相比较没 `try-catch`，确实有一定的性能影响，但是旨在不推荐我们用 `try-catch` 来代替正常能不用 `try-catch` 的实现，而不是不让用 `try-catch`。
2.  for循环内用  `try-catch` 和用 `try-catch` 包裹整个 for 循环性能差不多，但是其实两者本质上是业务处理方式的不同，跟性能扯不上关系，关键看你的业务流程处理。
3.  虽然知道`try-catch`会有性能影响，但是业务上不需要避讳其使用，业务实现优先（只要不是书中举例的那种逆天代码就行），非特殊情况下性能都是其次，有意识地避免大范围的`try-catch`，只 catch 需要的部分即可（没把握全 catch 也行，代码安全执行第一）。

“好了， 老王你懂了没？”

“行啊二哥，BB是一套一套的，走请你喝燕麦拿铁！”  老王一把拉起我，我直接一个挣脱，“少来，我刚喝过咖啡，你那个倒立洗头，赶紧的！”我立马意识到 老王想岔开话题。

“洗洗洗，我们先喝个咖啡，晚上回去给你洗！”

晚上22点， 老王发来一张图片：

![](https://mmbiz.qpic.cn/mmbiz_png/eSdk75TK4nGlicp5nqtD0gsibIg8XCZk8VYrrLRlutAIJAJ2riaIVHud9fNwSlibJ2hGWd7ZEbZWN2gibbardhnRwBQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

你别说，这头发至少比三毛多。

* * *

**微信8.0将好友放开到了一万，小伙伴可以加我大号了，先到先得，再满就真没了**

**扫描下方二维码即可加我微信啦，`2023，抱团取暖，一起牛逼。`**

![](https://mmbiz.qpic.cn/mmbiz_jpg/CKvMdchsUwkZFvnBvKpaEJNAIsxNEsXjdn86ZLzYmDxWWyLWKH20X6IRP2KR2mYiaVnoKqTIaPDeFPAfu92eegA/640?wx_fmt=jpeg)

## 推荐阅读

*   [如何去除 List 中的重复元素？我一行代码搞定，赶紧拿去用！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247506448&idx=1&sn=ca9e42766d18f63a3f4612e8ee013882&scene=21#wechat_redirect)
*   [IDEA 28 个天花板技巧，yyds！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247506429&idx=1&sn=5bd3be962978a8c25d1e490bb2e774cc&scene=21#wechat_redirect)
*   [新来了个同事，代码命名规范是真优雅呀！代码如诗！！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247506219&idx=1&sn=8faa38c4906a9d898ee7ec4ecc7ad21a&scene=21#wechat_redirect)
*   [订单超时自动取消的 3 种解决方案，yyds！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247506210&idx=1&sn=99ef122b136b88791a0c88aadd66f6c3&scene=21#wechat_redirect)
*   [Spring Event + DDD = 王炸！！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247506199&idx=1&sn=457912818af109f0d6f9d707fb5bcd48&scene=21#wechat_redirect)
*   [带了一个 3 年的开发，不会循环删除 List 中的元素，心态崩了。。。](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247506173&idx=1&sn=cafc7f5d5da032bc29dce718fd427436&scene=21#wechat_redirect)
*   [重磅更新！Mall实战教程全面升级，瞬间高大上了！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499376&idx=1&sn=3ed28795cdd35fbaa3506e74a56703b0&scene=21#wechat_redirect)
*   [40K+Star！Mall电商实战项目开源回忆录！](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486684&idx=1&sn=807fd808adac8019eb2095ba088efe54&scene=21#wechat_redirect)



![](https://mmbiz.qpic.cn/mmbiz_gif/CKvMdchsUwlkU1ysoMgG69dVYbCQcI6Byneb8ibzZWPfUCr3T8CuBicCSGyFE6SpAtxpxtDCp6VlZ4F1hEL1BNyg/640?wx_fmt=gif)

>参考链接：[https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247506471&idx=1&sn=68dbbb83ea983bd5499074bef9ff7712&chksm=fc2c662fcb5bef397209de9d3f045456d2a01d1da17e856d81a167b8ab940b4ebce3d9571e95&scene=126&sessionid=0#rd](https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247506471&idx=1&sn=68dbbb83ea983bd5499074bef9ff7712&chksm=fc2c662fcb5bef397209de9d3f045456d2a01d1da17e856d81a167b8ab940b4ebce3d9571e95&scene=126&sessionid=0#rd)，出处：macrozheng，整理：沉默王二
