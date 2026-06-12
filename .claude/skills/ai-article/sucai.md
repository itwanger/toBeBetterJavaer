标题：在微信里爽用 Claude Code，这个开源 Skill 很顶啊。

大家好，我是二哥呀。

昨天看到逛逛开源的 wechat-claude-code，可以在微信里爽用Claude Code，我就想把这个功能引入到 PaiCLI 中。

现在有了Codex和Claude Code，基本上只要有想法，就可以很快去落地。

给大家展示一下，已经实现了基本的交互哈～

![](https://cdn.paicoding.com/stutymore/sucai-4da59193ab89f247efb5c596adab40be.png)

这里多说一句。

PaiCLI是我用Claude Code+Codex开发的一个类Qoder CLI的Agent工具（主要就是想给大家提供一个 Agent CLI 的实战体验）。

![](https://cdn.paicoding.com/stutymore/sucai-20260612103615.png)

整体的交互体验参考了 Qoder CLI，并且体验还是非常不错的，虽然没办法和顶级的商业产品相比，但阅读代码，做一些多Agent调研，使用Chrome Devtools MCP 打开微信文章，这些基本操作，都已经实现了。

其实之前写OpenClaw的微信交互方案的时候，就觉得很有趣。

![](https://cdn.paicoding.com/stutymore/sucai-20260612134514.png)

今天有空，刚好可以实践一下。

我也会把自己完整的开发方案分享出来，供大家在使用Claude Code/Codex开发的时候做一些参考。

OK，系好安全带，我们粗粗粗发～

## 01、Codex调研微信连CC的技术方案

这一步非常关键。

需要先搞清楚，微信连CC的技术原理是什么。

直接把这个提示词发给Codex。

>wechat-claude-code 研究一下是什么原理，为什么能在微信里链接Claude Code

![](https://cdn.paicoding.com/stutymore/sucai-20260612134012.png)

- 微信侧靠 iLink Bot API，扫码登录、长轮询收消息、发消息、发“正在输入”。这些关键词需要调研清楚。
- 本机 daemon 负责收发与排队，相当于OpenClaw当时的Gateway，方案是长轮询微信消息，拿到消息后进入队列，再调用 Claude
- Claude Code 侧就是启动本地 claude 进程，通过把微信消息写进 stdin，从 stdout 读取 Claude Code 的 stream-json 输出，解析增量文本，再流式推回微信。

整体的技术方案并不发复杂。

但为了不出错，我特意补了一手新的信息源。

>结合 https://paicoding.com/wechat-openclaw 这篇里提到的@tencent-weixin/openclaw-weixin-cli@latest，两个之间有什么关联

![](https://cdn.paicoding.com/stutymore/sucai-20260612134621.png)

刚好我直接在实践微信官方的clawbot 方案的时候写过一篇帖子，里面提到了 openclaw-weixin-cli 插件。

两种方案结合在一起就可以确认了。

![](https://cdn.paicoding.com/stutymore/sucai-20260612135151.png)

扫码拿 token、getupdates 长轮询收消息、sendmessage 回消息、context_token 路由会话、媒体走 CDN/AES、sendtyping 展示“正在输入”。

搞清楚之后，我们就要Codex给我们一个出完整的技术方案了。

![](https://cdn.paicoding.com/stutymore/sucai-20260612134945.png)

一定要确认清楚，Codex的理解和我们的理解是一致的。

不理解的，就和Codex反复沟通。

![](https://cdn.paicoding.com/stutymore/sucai-20260612140003.png)

否则后期开发很容易出错。

所以，大家有没有发现，AI 确实很厉害了，但依然需要我们开发者和 AI 之间保持同频。

如果不能保持同频，你就没办法描述清楚需求，AI 搞错了你也发现不了。

这一点非常非常的关键。

## 02、Claude 再次确认调研

对于我能力之外的需求，我一般还会让Claude 再次确认一下。

方法很简单。

就是让Codex把计划输出到文件中，再把文件交给Claude。

刚好有最顶级的 Fable 5 可以用，直接让调研分析一番。

![](https://cdn.paicoding.com/stutymore/sucai-20260612135301.png)

- 要做的不是"关 HITL"，而是把交互式审批换成非交互式策略。
-  iLink 扫码登录的是一个微信账号，getupdates 会收到所有给这个号发消息的人。如果只校验 boundUserId == sender，那没绑定的人发来的消息怎么处理？

觉得Claude 说的对的，就可以修改一下开发计划。

![](https://cdn.paicoding.com/stutymore/sucai-20260612135631.png)

如果你没有Claude，Codex重新开一个子 Agent 去做这件事也是OK的。

>开一个subagent重新审查一下我们的计划，看看有没有漏洞

![](https://cdn.paicoding.com/stutymore/sucai-20260612140111.png)

记住一定要是子 Agent，正所谓旁观者清，当局者迷。

主Agent很有可能会陷入定性思维，觉得自己之前的计划是对的。

看到没，AI时代，并不意味着开发者就可以不动脑子，相反，我觉得，开发者需要比以前更动脑子。

否则你就会跟不上AI的理解和能力。

就没办法发挥出AI的威力。

啧啧啧。

## 03、开发和测试

开发阶段就很简单了。

>放到docs/phase-23-wechat-channel.md了，开始实施吧

![](https://cdn.paicoding.com/stutymore/sucai-20260612140253.png)

这一步，也可以交给一些物美价廉的LLM，比如说DeepSeek V4 Pro，也基本上不会出错。

因为我们已经把开发需求讨论清楚了。

剩下的，其实就看我们个人对产品的把控了。

比如说：

>我觉得整个交互体验有点问题，第一，微信里收到的回复很奇怪啊，思考过程如果要返回给微信侧的话，应该也需要一个正常的SSE过程，或者说不需要显示思考过程吧，思考过程应该是在PaiCLI这侧显示才对

![](https://cdn.paicoding.com/stutymore/sucai-20260612140628.png)

再比如说交互方式应该优化为，进入 PaiCLI 主交互后输入 /wechat，扫码绑定并后台启动微信通道。

![](https://cdn.paicoding.com/stutymore/sucai-20260612140742.png)

你想要什么样的效果，就反复和Claude Code/Codex沟通就好了。

![](https://cdn.paicoding.com/stutymore/sucai-20260612141019.png)

顶级模型的编码能力我觉得都很强了，你想要什么样的功能，什么样的交互体验，基本上都可以实现。

## 04、微信+PaiCLI的原理