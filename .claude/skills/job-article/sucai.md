标题：夯爆了！Codex 接入 DeepSeekV4、GLM5.1、Qwen3.6。

终于可以爽用Codex+Claude Code了，无限token！

甲方要求：https://scngz77sbzpd.feishu.cn/wiki/O4ZwwWxdUiOMR1krJWjcZOJJnt8

讯飞星辰MaaS平台 Qwen3.6-35B-A3B 模型的调用实战：https://scngz77sbzpd.feishu.cn/wiki/GVmrwP4c3im2XukX06ZcWVhrnYe

之前就在朋友圈看到：阿里发布的Qwen3.6-37B-A3B这个模型可以啊，3090可以跑出30 token/s, 75k上下文。

![](https://cdn.paicoding.com/stutymore/sucai-20260602214126.png)

没成想，今天可以在Claude Code+Codex中爽用这个模型了，免费无限token，可太爽了啊。

我已经给PaiSwitch添加了讯飞星辰 MaaS平台的支持，新增内置 provider：xfyun-maas，同时支持 Claude Code 和 Codex。

Claude Code 侧走现有本地 /claude-proxy/{code} 转 Anthropic Messages ↔ OpenAI Chat Completions。

Codex 侧走现有本地 /codex-proxy/{code}/v1 转 Responses ↔ OpenAI Chat Completions。

支持 lora_id/resourceId。

我这里就拿 Qwen3.6-35B-A3B 来举例，原因很简单。

限时免费。

![](https://cdn.paicoding.com/stutymore/sucai-20260602215245.png)

我突然想到一点，那些做中转站的，狂喜啊。

逮住使劲薅。

当然了，对于那些付不起 GPT-5.5和Opus 4.8 的用户来说，这个模型也是一个不错的选择。

![](https://cdn.paicoding.com/stutymore/sucai-20260602215501.png)

非常适合拿来作为长文档/长代码片段分析、代码理解和生成、复杂问题推理等场景的模型。

比如说我在PaiCLI中接入 Qwen3.6 后，直接让他分析一段代码是干嘛的。

![](https://cdn.paicoding.com/stutymore/sucai-20260602220936.png)

对于学习源码的大学生来说，无疑是非常好的选择，毕竟免费，模型能力又不错。

能白嫖为啥不呢？

接入方法其实很简单。

第一步，在讯飞星辰 MaaS平台选一个适合自己的模型，点击【API调用】。

![](https://cdn.paicoding.com/stutymore/sucai-20260602221226.png)

第二步，填写模型服务API名称，选择要授权的应用。

![](https://cdn.paicoding.com/stutymore/sucai-20260602221532.png)

第三步，复制 modelId，比如说我这里是 `xopqwen36v35b`，OpenAI 接口地址为 `https://maas-api.cn-huabei-1.xf-yun.com/v2`，并复制好 API Key。

![](https://cdn.paicoding.com/stutymore/sucai-20260602221643.png)

第四步，如果你是 Claude Code/Codex 开发，可以直接把 HTTP 协议的接口文档扔给 Agent。

>按照：https://www.xfyun.cn/doc/spark/%E6%8E%A8%E7%90%86%E6%9C%8D%E5%8A%A1-http.html 接入千问 Qwen3.6-35B-A3B

![](https://cdn.paicoding.com/stutymore/sucai-20260602221914.png)

第五步，把之前的 modelId、API Key、接口地址等信息填入 PaiCLI 的 .env 配置文件中。

![](https://cdn.paicoding.com/stutymore/sucai-20260602222207.png)

第六步，重启 PaiCLI，输入 `/model xfyun` 就可以爽用这个模型了。

![](https://cdn.paicoding.com/stutymore/sucai-20260602222313.png)

希望大家都能薅到好模型，免费用到爽！

## 02、接入 DeepSeekV4 和 GLM5.1

第一步，下载PaiSwitch，这是二哥肝的一个轮子，和CC-switch类似，为的就是本地方便在Claude Code+Codex中切换不同的模型。

>https://github.com/itwanger/PaiSwitch

![](https://cdn.paicoding.com/stutymore/sucai-20260602224314.png)

之所以不用CC-switch，原因很简单，没办法理解底层到底为什么？

比如说，为什么Claude Code可以切换到 DeepSeek V4 Pro 还能用？

![](https://cdn.tobebetterjavaer.com/paicoding/README-3b4ef8952cb448f798c7e85c46994f50.png)

为什么 Codex 切底层模型的时候，需要适配新的协议？

![](https://cdn.tobebetterjavaer.com/paicoding/README-bfefe858cf2e433a899baf747a4bde41.png)

作为一个工具的使用者，当然可以不去理解这些底层的原理，但如果是一个天天给大家讲技术原理的博主，万万不能够啊。😄

所以，这个轮子我是必须得去造啊。

当然，我必须负责任地告诉大家，PaiSwitch真的非常好用。

第二步，新建一个讯飞MaaS平台的供应商。

![](https://cdn.paicoding.com/stutymore/sucai-20260602224458.png)

- Base URL：`https://maas-api.cn-huabei-1.xf-yun.com/v2`
- 模型名称：`xopqwen36v35b`
- API Key：从 MaaS平台上复制过来

记得点击测试连接，看看是否能够通过。

第三步，在仪表盘这里选择你想要切换的模型。

![](https://cdn.paicoding.com/stutymore/sucai-20260602224809.png)

目前已经集成了DeepSeek V4、GLM-5.1、Kimi、阶跃星辰等等。

下一步，我觉得可以给PaiSwitch增加另外一个功能了，就是 auto 模式，按照一个顺序，自动切换。

策略包括动态惩罚路由，每个模型有一个基础优先级，但实际排序用的是“基础优先级 + 惩罚分”。

![](https://cdn.paicoding.com/stutymore/freellmapi-install-guide-20260529202211.png)

滑动窗口限流。

![](https://cdn.paicoding.com/stutymore/freellmapi-install-guide-20260529202710.png)

冷却升级，同一个模型在 24 小时内第一次触发 429，冷却 2 分钟。第二次 10 分钟。第三次 1 小时。第四次直接冷却 24 小时。

![](https://cdn.paicoding.com/stutymore/freellmapi-install-guide-20260529203323.png)

敲，这就是做轮子的意义。

这样，讯飞星辰MaaS平台上新什么模型，有哪些免费的模型可以用，我就可以第一时间接入到Claude Code和Codex中。

![](https://cdn.paicoding.com/stutymore/sucai-20260602225437.png)

如果发挥想象，用PaiSwitch做个API中转好像也不是不可能啊。

## 03、还等什么

抓紧时间过来薅啊。