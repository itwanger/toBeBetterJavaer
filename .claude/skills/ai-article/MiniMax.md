标题：MiniMax 版 Claude Code 开源，夯还是拉。

大家好，我是二哥呀。

好家伙，MiniMax 直接把他们的 Code CLI v0.4.12 开源了，还是 MIT 协议。

我只能说，伟大无需多言。

![](https://cdn.paicoding.com/stutymore/MiniMax-20260919105536.png)

这样的话，我就可以去研究 MiniMax Code CLI 的源码，从而去升级我的终端 Agent PaiCLI 了，舒服了呀。

我先放一个我用MiniMax Code CLI+DeepSeek V4.1 Flash开发的魂斗罗录屏，整体给我的感受我觉得还是OK的。

【录屏1】

从官方给出的跑分来看，不管是速度还是任务的成功率，都是挺出色的。

![](https://cdn.paicoding.com/stutymore/MiniMax-20260919105759.png)

在 FrontierHarness Eval 上拿到 SOTA 通过率、最快完成时间、第二低 token 消耗的不错成绩。

此处应该有掌声。

>开源的意义不只是降低了 Agent 的使用门槛，更在于让开发者能审计、改造并复用整个工具链；CLI + Agent 的组合会把实验快速推向真实工作流。

除了 Codex，对 Claude Code、Gemini，我其实更喜欢在终端里使用，原因很简单，这些桌面端做的有点垃圾。比如说 Antigravity，真的是烦死了，每次都要确认权限，整个输入界面竟然没有 auto 模式，我理解不了。

![](https://cdn.paicoding.com/stutymore/MiniMax-20260919111642.png)

纯纯的反人类设计。

好，我们先来体验一下 MiniMax Code CLI 吧，直接在终端输入：

```
curl -fsSL https://filecdn.minimax.chat/public/install.sh | bash
```

当然也可以使用源码构建。

```
git clone https://github.com/MiniMax-AI/minimax-code.git
cd minimax-code
pnpm install --frozen-lockfile
pnpm build
pnpm mcode
```

![](https://cdn.paicoding.com/stutymore/MiniMax-20260919113139.png)

安装完成后，我们来配置一下 DeepSeek V4.1 Flash，因为我没有 MiniMax 的 Token Plan，这几乎是国内我唯一没有买 Token 一家，主要是平常没机会用。

配置需要两步。

第一步，在终端输入以下命令，然后键入你的DeepSeek API Key。

```
read -rs "DEEPSEEK_API_KEY?请输入 DeepSeek API Key: "; echo
export DEEPSEEK_API_KEY
```

第二步，键入以下命令就可以在MiniMax Code CLI 中添加第三方模型，无需登录。

```
mcode provider add \
  --name "DeepSeek V4.1 Flash" \
  --base-url "https://api.deepseek.com" \
  --api-format openai-completions \
  --model deepseek-flash \
  --api-key-env DEEPSEEK_API_KEY
```

配置完成后，我们启动来确认一下，键入 `mcode`。

![](https://cdn.paicoding.com/stutymore/MiniMax-20260919114458.png)

然后随便输入一个提示词，看看是否有返回，确认一下配置是否成功。

刚好我沉淀了很多Case，直接让 mcode 自己挑一个跑一下看看效果。

![](https://cdn.paicoding.com/stutymore/MiniMax-20260919122751.png)

我觉得目前最大的问题就是权限这块的设计，一直弹出这个权限确认。

![](https://cdn.paicoding.com/stutymore/MiniMax-20260919123050.png)

我觉得真没必要了，现在都是放权让Agent自己去干活，你自己做不好权限，那你这个Harness就是做的很垃圾，还要人一个一个确认，看似安全，其实很降智。

官方的文档里竟然只有 Windows 的组合键说明，没有macOS的组合键说明，真的拉完了。

![](https://cdn.paicoding.com/stutymore/MiniMax-20260919123145.png)

不过整体长程任务的处理还是不错的，我这个跑了32分钟，仍然没出问题。

![](https://cdn.paicoding.com/stutymore/MiniMax-20260919125303.png)