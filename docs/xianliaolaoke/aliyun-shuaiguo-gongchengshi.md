真不是我有意要黑这个阿里云工程师，而是他冷漠的态度，超级高水平的甩锅能力，彻彻底底把我给打败了！

给大家看一下我们的第一波交锋。从在线沟通转工单的时候，为了给这位阿里云的售后工程师加油打气，我还特意准备了一句“辛苦了”，就差跪下了。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xianliaolaoke/aliyun-shuaiguo-gongchengshi-1.png)

结果等到的是阿里云售后工程师的一句：“我打开看了一下，这个图片不是您给的这个资源啊”。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xianliaolaoke/aliyun-shuaiguo-gongchengshi-2.png)

我当时心里暗想，好家伙，果然甩锅小能手啊！

然后我就耐心地给他解释，GitHub 会对图片转链，另外，用 HTTP 的时候是可以显示的，只有 CDN 启用了 HTTPS 才不显示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xianliaolaoke/aliyun-shuaiguo-gongchengshi-3.png)

结果他回了一句，“这个我们确认不了哈，这个链接没有请求 CDN 域名，不显示也不是 CDN 返回的”。

从我们的第二波交锋可以看得出，这位阿里售后工程师的甩锅天赋开始崭露头角了，前后的逻辑也非常缜密，不容置疑。

接着我又给他解释，我说你看看这个图片标签里还有一个 `data-canonical-src` 属性，它就来自你们阿里云的 CDN 啊，另外，我把 HTTPS 改成 HTTP 就可以访问了，别的什么都不用动。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xianliaolaoke/aliyun-shuaiguo-gongchengshi-4.png)

我以为，这位阿里售后工程师在收到我这个确凿的证据后，会稍微研究一番，结果没想到，他马上就开始正儿八经地甩锅了，“**这个我们也确认不了，因为这个类似代理请求了，拿不到实际请求 CDN 的返回信息**”。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xianliaolaoke/aliyun-shuaiguo-gongchengshi-5.png)

好吧，我被打败了，彻彻底底地败了，败的一塌糊涂！

**细细品一下，这位阿里售后工程师给出的理由绝壁是天衣无缝，我根本就没办法反驳**！要怪我只能怪，GitHub！

- 第一，你为什么要转链啊？
- 第二，你为什么能转 HTTP 的 CDN 链接，转不了 HTTPS 的呢？
- 第三，你 HTTPS 也不是不能转，直接用 OSS 的 HTTPS 链接你就能转，加了 CDN 的你就不行？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xianliaolaoke/aliyun-shuaiguo-gongchengshi-6.png)

之前给大家提到过，二哥的小破站《Java 程序员进阶之路》的图床是用 GitHub+jsDelivr 做的，免费啊，可以白嫖啊，所以我觉得用起来很爽！

但直到有一天，有个小伙伴提了一个 issue，说 jsDelivr 撤出了国内节点，导致部分图片不显示或者加载缓慢，我就坐立不安、寝食难安了！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xianliaolaoke/aliyun-shuaiguo-gongchengshi-7.png)

毕竟二哥可是一名负责任的好同志啊，必须得解决这个图床的问题。于是我就折腾了两天的 **OSS + CDN**，小破站的图片是能正常访问了，只是没想到，阿里云的这套图床组合在 GitHub 上这么“不靠谱”。

真的是钱花了，事却没办好。害，先来瞧瞧我自己摸索出来的折中方案吧。

1）HTTPS 的 CDN 链接统统替换为 HTTP 的，至少能显示。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xianliaolaoke/aliyun-shuaiguo-gongchengshi-8.png)

 2）如果 HTTP 的也显示有问题，有些会只显示一部分（莫名其妙），就改成 OSS 的链接。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xianliaolaoke/aliyun-shuaiguo-gongchengshi-9.png)


先把问题解决了再说。

小伙伴们有没有更好的的图床解决方案呢？可以在评论区/弹幕区给出自己的答案，救救二哥这个孩子吧！！！！！！

好了，今天的分享就先到这吧，希望小伙伴们能点点赞，转转发，好让阿里云官方看到这个问题， 重视这个问题，并解决这个问题。
