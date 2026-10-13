---
title: REA 保姆级教程：DeepSeek Harness 实操
---

这几天，一个叫 REA 的开源项目爆了。

它能让 Agent 在没有源码的情况下，查清一个软件的某个功能是怎么实现的，再照着做一个你自己的版本。网页、桌面应用、安卓 App，甚至 1996 年的老游戏，都能搞。

![](https://cdn.paicoding.com/stutymore/rea-deepseek-harness-tutorial-20261013160203.png)

这个项目火到什么程度呢？10 月 13 日，REA 冲到了 GitHub 日榜第一，单日新增 45327 颗 Star，截止到发稿前，已经有 17 万星标了。关键是 AI 圈的大街小巷，都在谈论它。更离谱的是，有博主称以后不存在闭源项目了，因为反正会被逆向。

为什么一个逆向工具，能出圈到这种程度？

我翻了 REA 的源码和接入文档，还有 DeepSeek Harness 的 MCP 客户端文档，可以自信地、大方地、光明磊落地帮你搞清楚这三件事。

- REA 凭什么能让 Agent 做逆向？
- 市面上的 REA 教程，用的都是 Codex 和 Claude Code。REA 最新的 6.4.0 版本，一键接入命令支持十几个 Agent，偏偏没有 DeepSeek Harness，那如果非要用 DeepSeek Harness，怎么办？
- 接好之后，怎么跑通官方的逆向案例？

哈喽大家好，我是二哥呀。今天用 3 分钟，手把手带你用 DeepSeek Harness 跑通 REA。视频的文稿已经整理到王二讲Agent开源知识库。

REA 全称 Reverse Engineer Anything，也就是逆向万物工程。逆向的意思是，你手里没有源码，但能从程序的安装文件和运行轨迹出发，查清楚一个功能到底是怎么实现的。

REA 做了三件事。

第一件，把专业的逆向工具打包成了 MCP 工具。MCP 是让 Agent 调用外部工具的协议。6.4.0 版本一共有 170 个工具。分析原生程序时，背后是 Hopper、Ghidra、IDA 这些反汇编器，也就是把机器码翻译成汇编和伪代码的工具；分析网页时，通过 Chrome 的调试协议 CDP 读取页面；分析安卓应用时，用的是 JADX。Ghidra 每次都以只读模式启动一个临时工程，分析完就删掉，不会改动原程序的任何一个字节。

第二件，把逆向老手的套路固化成工具。老手查一个功能，通常先搜界面上出现的关键字，再找出哪些地方引用了这个关键字，最后定位到引用所在的函数。REA 把这三步串成了一个 trace_feature 工具，Agent 调用一次，就能拿到“哪个函数用到了这个关键字”。结果太长的话会先做摘要，然后把完整结果持久化起来，Agent 再用 inspect_analysis_view 分页读取，每页默认 64 条。

第三件，每条结论都能拿出证据。REA 每次返回结果，都会生成一条 Evidence 记录，记下分析了哪个文件、调用了什么操作、得到了什么结果。配套的 Skill 规定，Agent 的每条结论都要分清哪些是观察到的、哪些是推断的、哪些还不确定。搜不到关键字的话，REA 也会说明“搜不到不代表不存在”。

![](https://cdn.paicoding.com/stutymore/rea-deepseek-harness-tutorial-architecture-20261013164717-fdfad804.png)

**那聪明的你肯定想到了，DeepSeek Harness 没有一键接入，怎么办？**

DeepSeek Harness 是 DeepSeek 在 8 月 13 日开源的 Agent Harness，有桌面端，也有命令行。它接入 MCP 的方式和 Codex、Claude Code 都不一样，不读 mcpServers 这种 JSON 配置，而是用一种叫 Cordis 的 YAML 补丁文件。

接入分三步。

第一步，打开终端，确认 Node 版本。REA 要求 22.19 以上、24.11 以上或者 26 以上，23 和 25 都不行。

```bash
node --version
```

第二步，接入 MCP。在用户目录下创建或打开 `~/.dsh/cordis.patch.yml`，DeepSeek Harness 的桌面端和命令行都会读取这个文件。写入下面这段。

```yaml
- insert:
    - id: rea-mcp
      name: "@deepseek-ai/dsh-mcp-client"
      config:
        serverName: rea
        transport: stdio
        command: npx
        args: ["-y", "rea-agents@6.4.0", "mcp"]
```

解释一下这几行。name 指定用 DeepSeek Harness 自带的 MCP 客户端插件；serverName 是工具名前缀，接好后工具会显示成 `mcp__rea__` 开头；transport 写 stdio，表示 DeepSeek Harness 自己用 npx 启动 REA，通过标准输入输出通信；版本号固定成 6.4.0，避免哪天 REA 自动升级后行为发生变化。

![](https://cdn.paicoding.com/stutymore/rea-deepseek-harness-tutorial-20261013162911.png)

第三步，安装 Skill。先预览，再执行。

```bash
npx -y rea-agents@6.4.0 setup --skill --dry-run
npx -y rea-agents@6.4.0 setup --skill --yes
```

Skill 会被装进 `~/.agents/skills/reverse-engineer-anything`，DeepSeek Harness 会自动扫描这个目录。

装完后重启 DeepSeek Harness，新建一个会话，发送“列出你能用的 REA 工具”。看到一串 `mcp__rea__` 开头的工具，就说明接好了。

![](https://cdn.paicoding.com/stutymore/rea-deepseek-harness-tutorial-20261013162832.png)

当然了，你也可以直接打开 DeepSeek Harness，输入 `DeepSeek Harness 要接入 REA 的应该怎么做`，DeepSeek Harness 也会自己做调研，然后帮你安装，但知道原理你会明白 REA 和 Agent 之间的关系，Agent 能做逆向靠的是什么。

![](https://cdn.paicoding.com/stutymore/rea-deepseek-harness-tutorial-20261013162717.png)

**那聪明的你肯定又要问了，接好之后，到底能不能真的逆向？**

我们跑一遍官方的恐龙游戏案例。

第一步，在终端启动一个带调试入口的 Chrome。

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/rea-dino-browser \
  "https://wayou.github.io/t-rex-runner/"
```

9222 是调试端口，REA 通过它连接浏览器。user-data-dir 指定一个独立的临时目录，不会动到你平时用的 Chrome 和登录状态。

第二步，把下面这段话发给 DeepSeek Harness。

> 使用 REA 调查这个恐龙游戏，https://wayou.github.io/t-rex-runner/ 。Chrome 调试地址是 http://127.0.0.1:9222 。先调用 list_browser_targets 找到这个页面，再调用 inspect_web_page，开启 include_script_sources，读取 index.js。告诉我游戏从什么速度开始、怎样加速、什么时候停止加速，每条结论都给出代码出处。

这里有个内行才知道的细节。inspect_web_page 是被动读取，它通过 CDP 拿到页面已经加载的脚本源码，REA 读取页面的这部分源码里，没有调用 Runtime.evaluate，也就是说，它不会在你的页面里执行任何一行 JavaScript，也不会点击和跳转。

正常情况下，你会在对话里看到至少两次 REA 的工具调用。

![](https://cdn.paicoding.com/stutymore/rea-deepseek-harness-tutorial-20261013163318.png)

第三步，让它照着规则做一个新游戏。

> 根据刚才查到的加速规则，在当前文件夹创建 dino-demo.html，做一个能直接用浏览器打开的恐龙小游戏。恐龙能跳，仙人掌从右边过来，加一个 2 到 18 的速度滑块，再加一个“自动加速”选项，开启后从 6 开始，沿用原游戏的加速规则。

第四步，让它自己验收。

> 从速度 6 开始，排除碰撞，分别计算 0、1000、4000、10000 次更新后的速度，保留三位小数，和 6.000、7.000、10.000、13.001 逐项比较。

![](https://cdn.paicoding.com/stutymore/rea-deepseek-harness-tutorial-20261013163718.png)

最后提醒一点。

用 REA 分析别人的软件之前，先看一眼对方的许可协议。REA 的免责声明写得很清楚，不支持绕过 DRM、破解授权校验、做游戏外挂，也不支持复制别人的专有代码。

这个知识点你学会了吗？想解锁更多 Agent 硬核知识，点赞关注，我是二哥，咱们下期见！

<!-- video-covers:start -->

## 视频封面

![竖版封面](https://cdn.paicoding.com/stutymore/rea-deepseek-harness-tutorial-cover-portrait-20261013165652-6c43e55c.png)

![宽屏横版封面](https://cdn.paicoding.com/stutymore/rea-deepseek-harness-tutorial-cover-wide-20261013165707-48809e18.png)

![标准横版封面](https://cdn.paicoding.com/stutymore/rea-deepseek-harness-tutorial-cover-standard-20261013165708-bbd102cb.png)

<!-- video-covers:end -->
