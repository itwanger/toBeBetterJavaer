DeepSeek 终于不再是个盲僧了，多模态 V4-Flash-Vision-Exp 的正式上线，让 DeepSeek 也可以欣赏这个世界的美景了，那聪明的你一定想问，多模态模型和纯文本模型到底有什么区别？

如果你调用过 DeepSeek 的 API，一定知道不管是 V4-Flash 还是 V4-Pro，都是纯文本模型，输入文本，输出文本。

如果你尝试给他输入图片，直接就会回复你，当前模型不支持图片，请切换支持图片的模型。

![](https://cdn.paicoding.com/stutymore/deepseek-multimodal-20260825184221.png)

那聪明的你一定想问，为什么这么强的一个模型，连图片都识别不了？多模态为什么就能识别的了？

我第一时间读了 DeepSeek 的官方文档，也体验了多模态 V4-Flash-Vision-Exp，可以自信地、大方地、光明磊落地帮你搞清楚三件事：

- 多模态和纯文本到底有什么区别？
- 加了视觉能力，文本能力会不会变差？
- 多模态能解锁哪些纯文本做不到的场景？

![](https://cdn.paicoding.com/stutymore/deepseek-multimodal-20260825200900-dbb78504.png)

哈喽大家好，我是二哥呀。今天用 3 分钟，给你讲清楚 DeepSeek V4-Flash-Vision-Exp 和 V4-Flash 的区别。

系好安全带，我们粗粗粗出发了～

先说第一个区别，V4-Flash-Vision-Exp 比 V4-Flash 多了一双眼睛。

V4-Flash 就像 LOL 里的盲僧，或者 DOTA2 里的敌法师——你说什么他都听得懂，但就是看不见。

（当然了，我只是打个比方）

V4-Flash-Vision-Exp 就像是治好了眼睛的盲僧，不仅能听，还能看。

靠什么治好的？

视觉编码器。它的作用是把图片翻译成模型能理解的 token，你可以理解为把一张图切成几百个信息碎片，每一块描述图片的一小部分：颜色、形状、位置。模型读完这些碎片，就“看懂”了这张图。

聪明的你可能会问：为什么非要翻译成 token？

因为大模型的入口只有一个，就是 token。不管是文字还是图片，想进模型，都得先变成 token。文字有现成的词典，一个汉字、一个词语就是一个 token；图片没有词典，它是一堆像素点。没有视觉编码器，图片就像一个人拿着门禁卡却找不到刷卡机，只能傻乎乎站在门口，就是进不去。

那视觉编码器是怎么翻译的？

它先看图，把整张图切成一个一个大小相同的小方块（patch），每个小块再单独编码。接着把这个连续的画面“翻译”成离散的 token——就像把一段连续的声音，采样成一个一个音符。这正是 DeepSeek 视觉模型背后那套“视觉原语（Visual Primitives）”的设计思路。

![](https://cdn.paicoding.com/stutymore/deepseek-multimodal-20260825200109.png)

而且这个 token 数是固定的。DeepSeek 官方的原话是，图片按 token 计费，一张图最多算 384 个 token。也就是说模型不会把一张图拆成无限的碎片。

![](https://cdn.paicoding.com/stutymore/deepseek-multimodal-20260825201041-18ce6404.png)

那聪明的你肯定想到了：治好了眼睛，脑子会不会变笨？

显然不会啊。

![](https://cdn.paicoding.com/stutymore/deepseek-multimodal-20260825194527.png)

对于纯文本任务，Vision-Exp 甚至还有提升。毕竟多模态模型发布的晚，后训练可能做的比纯文本模型更充分。

但对于多模态的 Agent 任务，纯文本模型就完全没办法和多模态模型比了。毕竟纯文本模型是闭着眼睛；多模态模型是睁着眼。

那聪明的你肯定会问，为什么多模态模型的文本能力没有变差？因为视觉编码器是“前置”的一个模块，只在最前面负责把图片翻译成 token。而翻译出来的视觉 token，跟文字 token 走的其实是同一个大模型、同一套参数。

当然了，名字带了 Exp，说明这还只是实验版。DeepSeek 还在迭代，正式版的能力应该还会有大幅提升。

那聪明的你肯定又要问了：多模态到底能干什么纯文本干不了的事？

打个比方，文本模型就像一个只能靠别人口述来了解世界的人。别人说“这帅哥很帅”，他才知道这帅哥很帅；如果没人说过，他就不知道。

多模态模型像一个自己长了眼睛的人。他看一眼帅哥就知道帅不帅，不需要别人描述；而且他还能转身把这帅哥的样子用嘴讲给你听，或者按你的要求给你复制出一个一模一样的帅哥。

![](https://cdn.paicoding.com/stutymore/deepseek-multimodal-20260825195124.png)

最后简单总结下。

V4-Flash 和 V4-Flash-Vision-Exp 的核心区别就一个：视觉编码器。有了它，模型就能看懂图片，文本能力还能保持不变。

换句话说，如果你的应用想要升级到多模态，只需要在 API 调用时把 model 改成 deepseek-v4-flash-vision-exp 就行。

这个知识点你学废了吗？想解锁更多 AI 硬核知识，点赞关注，我是二哥，咱们下期见！

![](https://cdn.paicoding.com/stutymore/deepseek-multimodal-20260825202245.png)

![](https://cdn.paicoding.com/stutymore/deepseek-multimodal-20260825202251.png)

![](https://cdn.paicoding.com/stutymore/deepseek-multimodal-20260825202256.png)