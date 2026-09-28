标题：再见了 WebUI，DeepSeek 桌面版真不错。

从藏师傅那里看到了DeepSeek Harness桌面版的安装地址，顺手就装上了。

并且装上的那一刻，会自动升级到v0.1.7-rc.2 版本。

![](https://cdn.paicoding.com/paicoding/5ff8f2c816cfe6b964c6c97886e9cccc.png)

这样就再也不用在Chrome浏览器里使用WebUI版本了，爽啊。

对于一套Harness来说，终端里跑起来，再在浏览器里使用，总有点不爽的感觉。

![](https://cdn.paicoding.com/stutymore/sucai-20260928102439.png)

如果你还没有的话，我把 Windows和 macOS 的下载链接放到这个链接了（官方毕竟还没有公开，所以不喜欢尝鲜的小伙伴可以暂时跳过，不着急）。

>https://paicoding.com/dsh-desktop-download

还支持登录。

![](https://cdn.paicoding.com/stutymore/sucai-20260928102544.png)

这样的话，未来不知道会不会有云端的版本。

一些不需要在本地工作的，可能就真的可以移动端、桌面端、云端同步。

想想还是挺期待的。

说一说我的AI员工吧。

编程主力仍然是Codex+GPT-6 Astra，包括绘图做视频。

文本主力是Claude Code+Opus 5.5。

三号员工就是DeepSeek Harness+DeepSeek V4.1 Flash了。

我个人还是喜欢DeepSeek，性价比高，还不用买Token plan，用多少算多少，关键是速度贼快。

文本能力和编程能力也都在线，作为三号员工，是绰绰有余！

接下来，再给大家推荐几个官方都认可的DeepSeek Harness插件。

①、DSH-better-sidebar

为 DeepSeek Harness 添加了侧边栏、底边栏、分栏、可浮动栏等 UI 定制化能力。

属于为其他插件提供基础能力的底座插件。

![](https://cdn.paicoding.com/stutymore/sucai-20260928103824.png)

安装方法也很简单。

```
帮我安装 dsh-better-sidebar 插件，地址：https://github.com/omdsh-dev/DSH-better-sidebar
```

![](https://cdn.paicoding.com/stutymore/sucai-20260928104111.png)

虽然官方的安装方法只支持WebUI版本，但DeepSeek V4.1 Flash显然有桌面版安装的能力，直接就自己搞定了。

![](https://cdn.paicoding.com/stutymore/sucai-20260928104750.png)

打开设置也能看到插件安装成功了。

![](https://cdn.paicoding.com/stutymore/sucai-20260928104924.png)

我们还可以在右侧重新打开一个窗口，左侧窗口的上下文是会自动注入的。

![](https://cdn.paicoding.com/stutymore/sucai-20260928105057.png)

喜欢开多窗口工作的小伙伴可以体验一下，我个人还是非常喜欢这个插件的。

②、dsh-TUI

内测期就一直跟版本打磨的终端界面，补的是官方缺的 TUI。喜欢键盘、SSH、远程、不想开浏览器的小伙伴，这个比一堆皮肤更有用。

![](https://cdn.paicoding.com/stutymore/sucai-20260928105401.png)

>https://dshtui.com/

而且更新速度也能跟得上官方的速度。

装上之后，像素鲸鱼顶栏、实时工作状态行、思考流式展开、终端图片预览（Sixel / Kitty）、双击 Esc 时间回溯、蓝白上下文进度条 + TPS 仪表，就都有了。

安装方法也很简单。

>帮我安装这个：https://dshtui.com/

![](https://cdn.paicoding.com/stutymore/sucai-20260928105717.png)

官方提供了多种安装方式，DSH 会自动帮我们做出最优选择。

![](https://cdn.paicoding.com/stutymore/sucai-20260928105937.png)

整体设计我觉得还是挺漂亮的，是我喜欢的风格。

③、DeepSeek Harness 插件库

如果你还想尝试更多，可以试试这个 `https://deepseek-harness-plugin.com/zh-CN/`

![](https://cdn.paicoding.com/stutymore/sucai-20260928110615.png)

当然了，对于插件，我个人觉得也没必要装太多，够用就行了，太花里胡哨也就偏离了 Agent 的本质。

随着模型能力的提升，一部分Skills、MCP、插件能力都会被吃掉。

就像 Memory 这块，我认为官方的做法一定就是最优解，就千万别装什么第三方的 Memory 插件。

