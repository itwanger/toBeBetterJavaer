---
title: 用 DeepSeek Harness 创造模式做个 PaiCLI 终端测试插件
shortTitle: 让桌面端自己写插件，自动测试多期教程
description: 基于最新源码，完整演示如何用 DeepSeek Harness 桌面端内置的创造模式，让桌面端 Agent 自己写出 PaiWarp 创造版插件。内容包括 Cordis 工具的字符串输出 Schema、Python 伪终端的 Bracketed Paste 多行粘贴、单键修订计划、Shift+Tab 切换模式、DeepSeek Harness 与 PaiCLI 同屏运行、18 项会话日志校验，以及如何把这套自动测试和换图流程推广到后续所有教程章节。
keywords: DeepSeek Harness, 创造模式, PaiWarp, PaiCLI, Plan-and-Execute, 伪终端录屏, 自动化测试
tag:
  - Agent
  - Java
category:
  - AI
author: 沉默王二
date: 2026-11-11
---

我们借助 Codex 完成了第一个 DeepSeek Harness 桌面端插件 `paiwarp-dsh`。

这个插件提供了一个伪终端，自动完成了 PaiCLI 第 1 期 ReAct 的编译、启动、输入提示词、截图和录屏。

那，DeepSeek Harness 本身就是桌面端 Agent，能不能不借助 Codex，让 DeepSeek Harness 自己给自己写一个插件呢？

答案是肯定的。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-desktop-20261111110259.png)

DeepSeek Harness 插件管理页面的右上角有一个“让 Agent 创建插件”的入口。点进去以后，桌面端会切换到专门用来开发插件的创造模式，并自动加载插件的开发规范和项目模板。

我们只需要在输入框里写清楚插件的目标、工具名称、界面布局和验收条件，DeepSeek Harness 就会在当前仓库下建好插件目录，写好前端和后端代码，还会自己运行自检，发现问题后自行修复。

PaiCLI 第 2 期讲的是 Plan-and-Execute 和 DAG 并行执行。测试第 2 期需要做四类操作：

- 输入命令；
- 往终端里粘贴带换行符的并行规划提示词；
- 在计划审阅界面按 `I` 键，补充要求；
- 按 `Shift+Tab` 组合键，把会话切换到 `PLAN` 模式。

## 01、进入创造模式

打开 DeepSeek Harness 桌面端，在左侧导航栏切到“插件”页面。页面右上角有一个“添加插件”按钮，平时用来安装已经写好的本地插件目录或压缩包。点击这个按钮右侧的下拉箭头，菜单里会出现“让 Agent 创建插件”。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-menu-20261110173304-b781bfb4.jpg)

点击“让 Agent 创建插件”后，桌面端会新建一个会话，并在底部输入框上方显示橙色的“创造模式”标签。

插件之后要在独立的伪终端里编译 Java 工程，用无头浏览器（在后台运行、不显示窗口的浏览器）把终端画面渲染成图片，合成 MP4。所以在生成插件之前，先在系统终端里运行下面这组命令，确认本机已经装好这些工具：Java、Maven、Python 虚拟环境、Playwright（用来控制无头浏览器的自动化库）、`pyte`（在内存里模拟终端屏幕内容的 Python 库）和 `ffmpeg`（音视频编码与合成工具）。

```bash
cd /Users/itwanger/Documents/GitHub/paicli
java -version
mvn -v
/tmp/paiwarp-venv/bin/python -c "import pyte, playwright; print('python deps ok')"
ffmpeg -version | head -n 1
```

这里沿用了之前创建的 `/tmp/paiwarp-venv` 虚拟环境。如果你的机器上还没有这个虚拟环境，执行下面三条命令即可，一般两分钟内就能装好。

```bash
python3 -m venv /tmp/paiwarp-venv
/tmp/paiwarp-venv/bin/pip install pyte playwright
/tmp/paiwarp-venv/bin/python -m playwright install chromium
```

另外还要检查仓库根目录下的 `.env` 文件，确认里面配置了可用的大模型密钥，比如 `DEEPSEEK_API_KEY`。否则稍后在伪终端里启动的 PaiCLI 无法调用模型生成执行计划。

## 02、生成插件

为了让创造模式一次写出符合预期的插件，提示词里要写清楚这几项：

- 插件目录放在哪里
- Cordis 怎么配置
- 工具叫什么名字
- 界面怎么布局
- 以及测试时要依次执行的终端操作。

Cordis 是 DeepSeek Harness 底层的插件框架，负责插件的依赖注入和生命周期管理。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-prompt-20261110173310-569ad40b.jpg)

上图是刚把提示词填进输入框时的界面。对话开始后，Agent 会先读取仓库里第 2 期教程的原文，整理出四个测试阶段：串行计划、并行 DAG、按 `I` 键修订计划、按 `Shift+Tab` 切换模式，然后在左侧会话区列出插件的目录规划。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-chapter2-spec-20261110173515-01e57a53.jpg)

如果你想在自己的 DeepSeek Harness 里重现这个过程，把下面这段提示词复制到“创造模式”里发送即可。提示词里的“复跑”指的是把第二章教程里的操作完整地重新执行一遍。

```text
请用 DeepSeek Harness 的创造模式，在当前仓库的 plugins/paiwarp-creator 目录下创建一个可本地安装的插件：

1. package.json 的 name 设为 paiwarp-dsh-creator，displayName 设为「PaiWarp 创造版」，description 写清楚这是由 DeepSeek Harness 创造模式创建、用于自动运行 PaiCLI 第二章教程（docs/articles/build-agent-p2-plan-execute.md 第 09 节「跑起来看看」）并生成截图与录屏的插件。
2. cordis.patch.yml 的 id 设为 paiwarp-creator，配置 runRoot 为 cases/paiwarp-creator/runs。
3. 注册两个工具：
   - paiwarp_creator_run_chapter_two：启动隔离工作区与伪终端会话，返回等待第一步输入的状态。
   - paiwarp_creator_terminal_input：由 DeepSeek Harness Agent 逐步向伪终端输入命令或按键（mvn clean package、启动 jar、串行 /plan、ENTER、并行 DAG /plan、I、补充要求「汇总时用表格输出」、ENTER、SHIFT_TAB、普通任务、ENTER、/exit）。
4. 注册命令 /paiwarp-creator（支持 view、pause、resume、stop、key），并在右侧 ActivityBar 挂一个独立面板，左边显示步骤清单与检查项，右边实时展示伪终端画面、终端文本、四张截图和最终 MP4 录屏。
5. 严格不修改原教程 docs/articles/build-agent-p2-plan-execute.md，只把替换了新截图路径的教程副本写到本次运行产物目录的 build-agent-p2-plan-execute.paiwarp-creator.md。
```

创造模式把插件代码写进 `plugins/paiwarp-creator` 目录后，先不用急着去插件页面安装。

可以在同一个会话里再发一条自检指令，让 Agent 调用插件的底层脚本把整个流程跑一遍，确认工具的输出格式正确、18 项检查全部通过。

```text
请直接在当前创造模式会话里自检 plugins/paiwarp-creator：运行一次完整的第二章复跑，检查 host.js 的工具输出 schema、构建产物检查、并行提示词输入方式，以及 18 项检查结果是否全部为 true。
```

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-selfcheck-20261110174928-c2b879da.jpg)

从自检截图可以看到，Agent 在真实终端里跑完一轮测试后，控制台输出了三行结果。

`checks_all_true true` 表示 18 项检查全部通过，`ledger_entries 40` 表示会话日志里有 40 条记录，`video_duration 188.62` 表示录屏时长为 188.62 秒。

会话日志是 PaiCLI 按时间顺序记录会话中每一个事件的文件。

到这一步，`plugins/paiwarp-creator` 目录已经可以安装到桌面端使用了。

## 03、插件代码长什么样

安装之前，先打开 `plugins/paiwarp-creator` 目录，看看创造模式写出来的代码结构。核心文件有 7 个，分工如下：

- `package.json` 和 `cordis.patch.yml` 负责向桌面端声明插件的身份和配置；
- `host.js` 运行在桌面端的 Node.js 主进程里，负责注册工具和提供状态接口；
- `client.js` 运行在前端渲染进程里，负责绘制右侧的监控面板；
- `creator_runner.py`、`creator_terminal.py` 和 `creator_chapter2.py` 负责驱动伪终端、截图录屏和核对会话日志。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-layered-architecture-20261111111620-43603658.png)

先看描述插件基本信息的 `plugins/paiwarp-creator/package.json` 和 `plugins/paiwarp-creator/cordis.patch.yml`。

```json
{
  "name": "paiwarp-dsh-creator",
  "version": "0.1.0",
  "displayName": "PaiWarp 创造版",
  "description": "Created in DeepSeek Harness Creator Mode to run PaiCLI chapter 2 Plan-and-Execute in a live terminal, record video, capture screenshots, and generate a verified tutorial copy.",
  "type": "module",
  "Author": "itwanger",
  "exports": {
    "./host": "./host.js",
    "./client": "./client.js",
    "./cordis.patch.yml": "./cordis.patch.yml"
  },
  "dsh": {
    "cordis": "./cordis.patch.yml"
  }
}
```

`package.json` 通过 `exports` 字段，把后端入口 `./host.js`、前端入口 `./client.js` 和配置文件 `./cordis.patch.yml` 提供给桌面端加载。

`cordis.patch.yml` 则把插件 ID 定为 `paiwarp-creator`，并把每次运行生成的文件统一放到 `cases/paiwarp-creator/runs` 目录下。

再看运行在主进程里的 `plugins/paiwarp-creator/host.js`。

DeepSeek Harness 要通过它才能操作底层的 Python 伪终端。这个文件里最值得注意的是工具输出格式 `textOutput`，以及两个工具的注册方式。

```javascript
const textOutput = {
  schema: { type: 'string' },
  render: (_args, value) => [{ type: 'text', text: value }],
};

export default function apply(ctx, config = {}) {
  const service = new CreatorService(ctx, config);
  // ...
  ctx.tools.register('paiwarp_creator_run_chapter_two', {
    description: '启动 PaiWarp 创造版的 PaiCLI 第二章（Plan-and-Execute + DAG）实时伪终端会话；随后必须逐步调用 paiwarp_creator_terminal_input 输入命令或按键。',
    input: {
      schema: {
        type: 'object',
        properties: {
          title: { type: 'string', description: '本次复跑标题，可选。' },
        },
        additionalProperties: false,
      },
    },
    output: textOutput,
    execute: (args, execCtx) => service.startInteractive(args, execCtx),
  });

  ctx.tools.register('paiwarp_creator_terminal_input', {
    description: '向正在运行的 PaiWarp 创造版伪终端发送下一步命令或按键（如 mvn clean package、java -jar、/plan、ENTER、I、SHIFT_TAB、/exit），并等待本步完成。',
    input: {
      schema: {
        type: 'object',
        properties: {
          runId: { type: 'string', description: '可选，默认当前活动运行。' },
          input: { type: 'string', description: '要输入到终端的命令或按键。必须与 nextExpectedInput 一致。' },
        },
        required: ['input'],
        additionalProperties: false,
      },
    },
    output: textOutput,
    execute: (args, execCtx) => service.terminalInput(args, execCtx),
  });
}
```

这里有一个容易出错的细节。

`service.startInteractive()` 和 `service.terminalInput()` 每执行完一步，都会用 `JSON.stringify()` 把信息转成一个 JSON 字符串返回给大模型。

- 当前所处的阶段
- 下一步应该输入的内容 `nextExpectedInput`
- 终端最后几行的文本。

如果把 `output.schema` 写成 `{ type: 'object' }`，DeepSeek Harness 的工具校验器发现返回的是字符串而不是对象，就会报错并拦下这次结果，也就拿不到工具的返回值。

把 `schema` 明确声明为 `{ type: 'string' }`，再提供一个 `render` 函数，每次工具调用返回的 JSON 字符串就能原样交给 DeepSeek Harness。

此外，`host.js` 还通过 `ctx.prompts.register` 注册了一段编号为 `paiwarp-creator:chapter-two` 的系统提示词。

用户输入提示词“用 PaiWarp 创造版复跑第二章”时，DeepSeek Harness 会先调用 1 次 `paiwarp_creator_run_chapter_two` 启动伪终端，然后严格按照每次返回值里的 `nextExpectedInput` 字段，连续调用 12 次 `paiwarp_creator_terminal_input`，依次完成：编译、启动、计划、回车、并行 DAG、按 `I` 修订、输入要求、回车执行、`Shift+Tab` 切换模式、输入不带 `/plan` 的提示词、回车执行、`/exit` 退出。

## 04、伪终端怎么处理多行粘贴

DeepSeek Harness 每调用一次 `paiwarp_creator_terminal_input`，`host.js` 就会通过标准输入，把这一步要输入的内容交给 `plugins/paiwarp-creator/creator_runner.py`。

第 1 期只需要输入单行命令，而第 2 期在控制伪终端时有三个难点：

1. 启动时自动生成的退出码文件会干扰构建是否完成的判断；
2. 多行提示词会在第一个换行符处被提前提交；
3. 在计划审阅界面，需要准确发送单键和组合键。

先看 `plugins/paiwarp-creator/creator_runner.py` 是怎么准备隔离环境、并解决第一个问题的。

```python
with tempfile.TemporaryDirectory(prefix="paiwarp-creator-ch02-") as tmp_work, \
     tempfile.TemporaryDirectory(prefix="paiwarp-creator-home-") as tmp_home:
    work = copy_workspace(root, Path(tmp_work))
    home = Path(tmp_home)
    stamp = work / ".paiwarp-creator-last-status"
    terminal = CreatorTerminal(root, work, home, out, state, emit)
    # ...
    wait_shell_ready(terminal, stamp, 20, "交互式 Shell 启动")
    stamp.unlink(missing_ok=True)
    command = expect_input("Shell 已启动", "mvn clean package")
    terminal.enter(command)
    wait_shell_ready(terminal, stamp, 420, "mvn clean package 完成")
    build_exit = int(stamp.read_text().strip())
    jar_path = work / "target" / "paicli-1.0-SNAPSHOT.jar"
    if build_exit != 0 or not jar_path.is_file():
        raise RuntimeError(f"mvn clean package 失败，退出码 {build_exit}，产物存在={jar_path.is_file()}")
```

插件需要知道每条 Shell 命令的退出码，同时又不能打断正在交互的 Bash。

为此，启动 Bash 时设置了环境变量 `PROMPT_COMMAND="echo $? > .paiwarp-creator-last-status"`。Bash 每次显示提示符 `paiwarp-creator $ ` 之前，都会先执行这条命令，把上一条命令的退出码写进 `.paiwarp-creator-last-status` 文件。

问题出在 Bash 刚启动的时候。显示第一个提示符之前，Bash 也会执行一次 `PROMPT_COMMAND`，生成一个内容为 `0` 的状态文件。如果不把这个文件删掉，下一步输入 `mvn clean package` 后，`wait_shell_ready` 会在 Maven 刚开始编译时就读到这个旧的 `0`，以为编译已经完成。紧接着执行 `java -jar`，就会报找不到 Jar 包的错误。

所以 `creator_runner.py` 的处理顺序是，先用 `wait_shell_ready` 确认第一个提示符和状态文件都已出现，再调用 `stamp.unlink(missing_ok=True)` 删掉状态文件，然后才发送 `mvn clean package`。编译结束后，同时检查退出码 `build_exit` 是否为 0、`paicli-1.0-SNAPSHOT.jar` 文件是否存在，两项都满足才算构建成功。

再看第二个难点。

第 2 期教程里的并行 DAG 测试提示词是一条 7 行的 `/plan` 指令，中间有 6 个换行符 `\n`。PaiCLI 用 JLine3 读取用户输入。如果像打字一样把这段文本逐字写进伪终端，JLine3 读到第一行末尾的换行符，就会认为用户按了回车，只把第一行 `/plan 请把任务拆成可并行的 DAG：` 提交给规划器，后面 6 行子任务和依赖要求会被当成另外几次输入。

打开 `plugins/paiwarp-creator/creator_terminal.py`，看看 `enter` 和 `input_mode` 两个方法是怎么解决这个问题的。

```python
def enter(self, text: str) -> None:
    mode = self.input_mode(text)
    self.record_input(text, mode)
    if text == "ENTER":
        self.write("\r")
        self.settle(0.4)
    elif text == "I":
        self.write("i")
        self.wait(lambda: "补充>" in self.visible_text(), 20, "进入计划修改提示符")
    elif text == "SHIFT_TAB":
        self.write("\x1b[Z")
        self.wait(lambda: "PLAN shift+tab to cycle" in self.visible_text(), 20, "切换到 plan 模式")
    elif "\n" in text:
        clean = text.replace("\r\n", "\n").replace("\r", "\n")
        self.write("\x1b[200~" + clean + "\x1b[201~")
        self.settle(0.15)
        self.write("\r")
        self.settle(0.5)
    else:
        self.type_text(text)
        self.settle(0.4)

def input_mode(self, text: str) -> str:
    if text == "ENTER":
        return "enter"
    if text == "I":
        return "key"
    if text == "SHIFT_TAB":
        return "shift-tab"
    if "\n" in text:
        return "bracketed-paste"
    return "line"
```

这段代码把 DeepSeek Harness 发来的内容分成 5 种输入方式。

遇到包含 `\n` 的多行文本，`input_mode` 会返回 `bracketed-paste`（括号粘贴模式）。插件在整段文本的开头加上终端控制序列 `\x1b[200~`，结尾加上 `\x1b[201~`，然后一次性写入伪终端。

这两个控制序列告诉 JLine3，中间的内容是一次粘贴进来的多行文本，遇到换行符不要提交。等待 `0.15` 秒、粘贴内容全部进入输入缓冲区之后，插件再单独发送一个回车符 `\r`，把整段内容一起提交。

遇到计划审阅和模式切换用到的按键时，`enter` 方法不会调用逐字输入的 `type_text`，而是直接发送这个按键对应的字节：

- 收到 `"ENTER"` 时，只发送回车符 `\r`，确认执行当前计划；
- 收到 `"I"` 时，发送小写字母 `i`，然后反复检查终端画面，直到出现 `补充>` 提示符，确认 PaiCLI 已经进入 `Planner.revisePlan` 的补充要求输入状态；
- 收到 `"SHIFT_TAB"` 时，发送 `Shift+Tab` 对应的转义序列 `\x1b[Z`，然后等待底部状态栏变成 `PLAN shift+tab to cycle`。

为了让测试内容始终和教程保持一致，`plugins/paiwarp-creator/creator_chapter2.py` 里的 `chapter_goals` 函数没有把串行计划和并行 DAG 的提示词直接写死在 Python 代码里，而是从 `docs/articles/build-agent-p2-plan-execute.md` 第 09 节“跑起来看看”中读取两个 `text` 代码块。这样一来，测试时输入的每一个字都和教程原文相同。

更重要的是，`creator_terminal.py` 和 `creator_runner.py` 都不依赖具体的某一章。

`creator_terminal.py` 负责伪终端、无头浏览器截图和视频编码；`creator_runner.py` 负责隔离运行环境，并和 DeepSeek Harness 推进每一步。

第二章跑通以后，无论是测试第 3 期的 `/save`、`/memory`、`/compact` 记忆压缩，第 4 期的代码语义检索，第 5 期的 `/team` 多智能体审查，还是第 6 期的 `/mode ask` 人工确认，伪终端驱动代码和 `paiwarp_creator_terminal_input` 的调用约定都不用改。

## 05、安装插件

了解完插件的底层实现，回到 DeepSeek Harness 的“插件”页面，点击右上角的“添加插件”，在弹出的文件选择窗口里选中创造模式生成的 `/Users/itwanger/Documents/GitHub/paicli/plugins/paiwarp-creator` 目录。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-04-install-local-20261110174744-81be57a7.jpg)

导入成功后，已安装列表里会多出一项 `PaiWarp 创造版`（包名为 `paiwarp-dsh-creator`），默认是灰色的“已禁用”状态。点击右侧的“启用”按钮，状态变成绿色的“已启用”，同时桌面端最右侧的插件栏会出现 `PaiWarp 创造版` 的面板图标。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-05-installed-20261110174744-03410942.jpg)

接下来新建一个对话窗口。在输入框里输入下面这句提示词并发送。

```text
用 PaiWarp 创造版复跑第二章。
```

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-06-standard-request-20261110174744-70a279b2.jpg)

请求发出后，点开右侧边栏的 `PaiWarp 创造版` 图标，就能在同一个界面里同时看到 DeepSeek Harness 和 PaiCLI 的运行情况。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-live-plan-20261110175457-fdce7cef.jpg)

对照这张截图，看看左右两边分别在做什么：

- 左侧会话区运行的是 DeepSeek Harness。它的作用相当于测试人员，按照插件注册的系统提示词，一步一步调用 `paiwarp_creator_terminal_input` 向终端输入内容；
- 右侧是 `plugins/paiwarp-creator/client.js` 绘制的实时监控面板。面板左边显示 10 个阶段的进度和 18 项检查的状态；右边定时读取本次运行目录里的状态文件和终端画面截图，实时显示伪终端里 PaiCLI 的运行画面。

截图这一刻，DeepSeek Harness 刚刚用 `bracketed-paste` 方式把 7 行的并行 DAG 提示词粘贴进终端。

运行在伪终端里的 PaiCLI，它的 `Planner` 已经把任务拆成了 4 个互不依赖、可以并行的读取任务，和 1 个依赖前 4 个任务的汇总任务 `task-5`。

4 个读取任务分别是：

- `task-1` 读取 `pom.xml`，
- `task-2` 列出 `src/main/java`，
- `task-3` 列出 `src/test/java`，
- `task-4` 读取 `README.md` 的前 80 行。

终端下方显示了审阅提示，`Enter：开始执行  Ctrl+O：展开详情  I：输入补充要求  ESC：取消计划`。

打开本次运行的输入记录文件 `cases/paiwarp-creator/runs/2026-11-10T09-58-27-843Z-2e79d6e8/harness-inputs.json`，可以核对 DeepSeek Harness 在这 3 分多钟里先后发出的 13 次工具调用。

```json
[
  { "sequence": 21, "tool": "paiwarp_creator_run_chapter_two", "args": { "title": "复跑第二章" } },
  { "sequence": 27, "tool": "paiwarp_creator_terminal_input", "step": 1, "input": "mvn clean package" },
  { "sequence": 33, "tool": "paiwarp_creator_terminal_input", "step": 2, "input": "java -Duser.home=\"$PAIWARP_CREATOR_HOME\" -jar target/paicli-1.0-SNAPSHOT.jar" },
  { "sequence": 39, "tool": "paiwarp_creator_terminal_input", "step": 3, "input": "/plan 创建一个 Java 项目叫 demo，写一个 Hello 类输出 Hello World，然后编译运行" },
  { "sequence": 45, "tool": "paiwarp_creator_terminal_input", "step": 4, "input": "ENTER" },
  { "sequence": 51, "tool": "paiwarp_creator_terminal_input", "step": 5, "input": "/plan 请把任务拆成可并行的 DAG：\n1. 读取 pom.xml\n2. 列出 src/main/java 下的文件\n3. 列出 src/test/java 下的文件\n4. 读取 README.md 的前 80 行\n5. 最后汇总以上结果，告诉我这个项目的构建方式、源码结构和测试情况。\n要求：前 4 个任务彼此独立并行执行，最后 1 个任务依赖前 4 个任务。" },
  { "sequence": 57, "tool": "paiwarp_creator_terminal_input", "step": 6, "input": "I" },
  { "sequence": 63, "tool": "paiwarp_creator_terminal_input", "step": 7, "input": "汇总时用表格输出" },
  { "sequence": 69, "tool": "paiwarp_creator_terminal_input", "step": 8, "input": "ENTER" },
  { "sequence": 75, "tool": "paiwarp_creator_terminal_input", "step": 9, "input": "SHIFT_TAB" },
  { "sequence": 81, "tool": "paiwarp_creator_terminal_input", "step": 10, "input": "读取 README.md 的前 5 行，原样发给我" },
  { "sequence": 87, "tool": "paiwarp_creator_terminal_input", "step": 11, "input": "ENTER" },
  { "sequence": 93, "tool": "paiwarp_creator_terminal_input", "step": 12, "input": "/exit" }
]
```

从序号 `21` 启动会话，到序号 `93` 发送 `/exit` 退出 PaiCLI，每一次工具调用都有记录，整个过程没有人工操作。

## 06、怎么核对 18 项检查

DeepSeek Harness 发出第 12 步 `/exit` 之后，`creator_chapter2.py` 会自动读取临时用户目录下 `.paicli/history/raw/` 里的会话日志（这次共 36 条事件记录），对第 2 期的整个运行过程做 18 项检查。

然后把 4 张终端截图、1 段完整的 MP4 录屏、检查报告 `result.json` 和一份教程副本，全部写进 `cases/paiwarp-creator/runs/2026-11-10T09-58-27-843Z-2e79d6e8/` 目录。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-verified-recording-20261110180307-80965c6c.jpg)

上图是运行完成时的界面。右侧面板的 18 项检查都已经变成绿色的 `true`，视频播放器里也加载好了时长 `194.12` 秒的完整录屏 `paiwarp-creator-chapter2-demo.mp4`。

下面结合插件自动截取的 4 张图，逐一核对第 2 期教程的四个测试场景。

第一张图 `p2-01-serial-plan.png` 截取于串行 `/plan` 计划生成之后。PaiCLI 的 `Planner` 把“创建 `demo` 项目、编写 `Hello.java`、编译并运行”拆成了 3 个前后依赖的步骤。按回车执行后，插件还会到临时工作区里检查两件事，`demo/src/main/java/com/example/Hello.java` 源文件和编译出的 `Hello.class` 文件确实存在，并且终端输出里有 `Hello World`。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-p2-01-serial-plan-20261110180153-1a3598ee.png)

第二张图 `p2-02-parallel-plan.png` 截取于并行 DAG 提示词以 `bracketed-paste` 方式提交之后。终端里清楚地显示了 `1. 并行（4 个任务）` 这一组下面的 4 个互相独立的读取任务，以及 `2.` 下面依赖 `[task-1, task-2, task-3, task-4]` 的汇总任务 `task-5`。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-p2-02-parallel-plan-20261110180153-ead4c1ba.png)

第三张图 `p2-03-revised-plan.png` 截取于 DeepSeek Harness 按下 `I` 键、输入“汇总时用表格输出”之后。会话日志里记录了 `Planner.revisePlan` 重新生成计划的事件，`task-5` 的描述已经改成“用表格汇总项目的构建方式、源码结构和测试情况”。按回车执行后，`PlanExecuteAgent` 同时执行前 4 个只读任务，最后输出一张表头为 `| 维度 | 详情 |` 的 Markdown 表格。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-p2-03-revised-plan-20261110180153-cb49dd42.png)

第四张图 `p2-04-plan-mode-task.png` 截取于 DeepSeek Harness 发送 `SHIFT_TAB` 切换到 `PLAN` 模式、并输入提示词“读取 README.md 的前 5 行，原样发给我”之后。终端底部的状态栏已经变成 `PLAN shift+tab to cycle`。这句虽然没有 `/plan` 前缀，PaiCLI 仍然先生成计划、进入了计划审阅界面。

![](https://cdn.paicoding.com/stutymore/paiwarp-creator-p2-04-plan-mode-task-20261110180153-53516c58.png)

最后看 `plugins/paiwarp-creator/creator_chapter2.py` 里的 `replace_article_copy` 函数，它负责在不改动原教程的前提下生成一份换好截图的教程副本。

```python
def replace_article_copy(root, output):
    source_path = root / "docs" / "articles" / "build-agent-p2-plan-execute.md"
    original_bytes = source_path.read_bytes()
    text = original_bytes.decode("utf-8")
    section_idx = text.index("## 09、跑起来看看")
    # 仅定位第 09 节内的四处图片语法，替换为本次产物里的 screenshots/*.png
    # ...
    target = output / "build-agent-p2-plan-execute.paiwarp-creator.md"
    target.write_text(updated, encoding="utf-8")
    after_bytes = source_path.read_bytes()
    return {
        "copyPath": str(target),
        "originalUnchanged": original_bytes == after_bytes,
        "originalSha256": hashlib.sha256(after_bytes).hexdigest(),
        "copySha256": hashlib.sha256(target.read_bytes()).hexdigest(),
        "replacements": replacements,
    }
```

这套流程可以概括为五步。

从教程原文提取测试内容 → DeepSeek Harness 一步步操作伪终端 → 截图并合成录屏 → 用 `.paicli/history/raw` 会话日志核对运行结果 → 生成换好截图的教程副本。
