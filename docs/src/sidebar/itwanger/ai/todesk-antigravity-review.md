---
title: 用了 ToDesk 这个神级远程，我彻底解放双手了
shortTitle: ToDesk 远程操控 AI Agent 实战
description: 深度拆解 ToDesk 在 AI Coding 与终端 Agent 场景下的高阶远程工作流，对比 SSH、Agent 自带 Remote Control 与全桌面远控的边界，覆盖远程终端、移动端快捷键、小窗盯进度、同账号免密与二次验证、ZeroSync 低延迟传输、ZSTD 碎文件压缩、麦克风映射及版本选型。
keywords:
  - ToDesk
  - 远程控制
  - 远程办公
  - AI Coding
  - 终端 CMD
  - Antigravity
  - AI Agent
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-11-26
---

大家好，我是二哥呀。

我一直想找这么一款软件，通过它，我可以用手机遥控我的电脑，操作我电脑上的任意一款软件，比如说 Antigravity，比如说 Codex，再比如说 DeepSeek Harness。

终于。

踏破铁鞋无觅处，我找到了。

有请我们今天的主角 ToDesk。

你看，我现在登录了桌面端的 ToDesk，我就可以在手机端遥控我整个电脑上的所有软件了。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-01-device-list-redacted-20261126193922-7db3b840.png)

注意看，我手机上看到的桌面和我电脑上的桌面是完全一样的。

这是手机端。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-02-phone-author-view-redacted-20261126193923-50dabb82.png)

这是电脑端。

![同一桌面在 Mac 上的原生画面，右下角显示小米的连接](https://cdn.paicoding.com/stutymore/todesk-antigravity-03-desktop-session-redacted-20261126193924-149b9a58.png)

不仅如此，如果我授权了声音、键鼠、文件、摄像头等权限，相当于我可以无痛在手机上掌控全局。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-04-request-permissions-20261126185433-9712f8a8.png)

看到没，我直接在手机端操控 Antigravity 进行视频制作，而我人，完全不用再电脑前面。

>ToDesk 右下角保留远控工具栏，屏幕里是 Mac 上的 Antigravity 和第四章预览

![小米横屏实拍](https://cdn.paicoding.com/stutymore/todesk-antigravity-21-phone-remote-workspace-20261126185844-a11bf4ec.jpg)

这真的，舒服啊。

关键是没有卡顿，非常丝滑，几乎感受不到延迟。

查了一下，ToDesk 已经上线六年了，累计支持的用户数超过 `3` 亿，很多很多小伙伴都拿它当连接多台设备的数字网线。

## 01、三种远程方案

以前写代码，人离开电脑，活就没办法监工了。

现在不一样了，把任务交给 Claude、Codex 或者 Antigravity，重构项目、跑自动化测试、渲染视频，动辄几十分钟，甚至五六个小时。

**这段时间里，人完全可以走开，但又不能完全不管**。

Agent 跑着跑着，可能会停下来等你确认权限，可能会遇到报错，也可能做出来的效果不及预期，需要补提示词及时调整。

麻烦的是，代码仓库、本地预览服务、浏览器的登录状态和 Agent 的上下文，全都在电脑上，人走了，这些东西带不走。

所以真正需要的，是人在外面也能随时连回这台电脑，看一眼进度，该处理的处理掉，然后接着忙别的事。

能连回电脑的方案大致有三种，区别就在于连上之后能操作的范围有多大。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-11-access-scope-20261126185433-4ddf4243.png)

第一种是 SSH。它只能连到终端和文件系统，省带宽、响应快，跑命令、看日志都没问题。但桌面上的东西它看不到。

第二种是 Agent 自带的 Remote Control。能看到某一款 Agent 的对话进度，也能批准执行计划。但它只管这一个软件，想重启本地服务、切到另一款 Agent，或者打开浏览器控制台查报错，就做不到了。

第三种是桌面远程控制，也就是 ToDesk 这类工具。连上之后，手机上看到的就是电脑的整个桌面，电脑上的任何软件、终端、浏览器和本地预览服务都能直接操作，和坐在电脑前没什么区别。况且，ToDesk 支持 Windows、macOS、Linux、iOS、Android 和 HarmonyOS，统信 UOS、麒麟 OS 等信创系统也能用。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-26-phone-browser-and-desktop-20261126190123-24e54b1a.jpg)

这绝对是 Agent 时代的刚需。

甚至可以远程虚拟机、远程海那边的一台 Claude 主机。

## 02、远程终端与完整桌面

针对 AI Coding 和运维场景，ToDesk 提供了两条互补的通道。一条是轻量的原生远程终端，另一条是配齐了快捷键的完整远程桌面。

### 原生远程终端

如果只想进 Windows 电脑跑几条 Git 命令、看 Docker 日志、重启构建脚本，或者操作终端里的 Agent，加载完整的图形桌面很费流量。

把 ToDesk 的主控端和被控端都升级到 `v5.3.0.0` 及以上版本后，在设备列表里选中目标主机，侧边功能栏里会多出一个终端入口。点开后不传输图形画面，直接通过纯文本通道打开命令行界面。

这个终端支持按需新建和切换多种环境，包括 Windows 自带的 `PowerShell` 和 `CMD`，也支持 `Git Bash` 与 `WSL`。在弱网环境下敲命令、看实时滚动的构建输出，比传输整屏画面流畅得多。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-12-windows-terminals-20261126185436-7ff971d9.png)

需要说明的是，原生远程终端的被控端目前仅支持 Windows，macOS 和 Linux 主机还没有这个独立入口。

如果你的主力开发机是 Mac 或 Linux，就走下面这套完整桌面通道，照样能操作终端里的 Claude Code、Codex CLI 和桌面端的 Antigravity。

### 完整桌面与自定义快捷键

很多小伙伴不愿意拿手机控制电脑，主要原因不是看不清，而是组合键按不了、长一点的提示词输入起来很费劲。

我这次拿小米手机上的 ToDesk `V5.3.1.0` 连回 MacBook Pro 上的 `V5.4.0.0`，专门测了手机端的键鼠和快捷键。

在手机端远程控制窗口的右下角展开工具栏，点开键鼠菜单里的显示快捷键，就能把常用组合键固定在屏幕底部。

![点底部“键鼠”，打开“显示快捷键”](https://cdn.paicoding.com/stutymore/todesk-antigravity-22-phone-show-shortcuts-20261126185844-37a5b443.png)

在客户端的快捷键设置里，还可以按 Windows、macOS 和 Linux 三套系统分别添加常用组合键，比如终止终端进程的 `Ctrl + C`、粘贴指令或者呼出任务管理器，拖动右侧的三条横线还能调整它们的顺序。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-23-phone-custom-shortcut-20261126185844-4c283dad.png)

要给 Antigravity 或终端 Agent 发一大段修改要求时，可以拿虚拟键盘直接敲。

也可以先在手机备忘录里把提示词写好并复制，切进远程桌面点一下输入框粘贴，再按电脑键盘面板里的回车就能发出去。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-24-phone-command-v-20261126185844-f9575b70.jpg)

比如我审完第四章的像素风视频，觉得中间那段画得不够直观，就在手机上把下面这段要求贴进了 Mac 上原来那个 Antigravity 会话里。

```text
先处理刚才的审片意见，把第四章的审查模型画得更直观。然后开始制作第五章，沿用调整后的画面风格。做好后在这里打开第五章预览。
```

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-06-draft-before-send-20261126185432-eb7ffed9.jpg)

按下回车后，Mac 端左下角的输入框立刻清空，上方弹出了 `Queued Messages 1` 的排队卡片，说明这条要求已经进入会话队列，等 Agent 做完当前任务就会接着执行。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-07-queued-message-20261126185432-4a48629a.jpg)

## 03、小窗盯进度与多屏隐私屏

AI Agent 跑长任务时，我们在手机上往往有两个需求。既想随时看看它做到了哪一步、有没有弹出权限确认或报错，又不想让全屏远程控制占满整个手机。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-13-floating-window-20261126185434-4518c161.png)

这时候就可以把 ToDesk 切进手机系统自带的小窗模式，被控端电脑的画面会缩放成一个悬浮窗口，停在屏幕一角。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-27-xiaomi-floating-window-20261126190123-b1d3a1a0.jpg)

你可以照常在手机上回微信、看飞书或者刷文档，抽空扫一眼角落的小窗，看 Agent 的任务是否还在执行就行了。

一旦小窗里弹出需要人来确认的提示，比如确认一条危险命令、补一句提示词，点一下小窗切回全屏处理完，再回小窗。

### 多屏、虚拟屏与隐私屏

Agent 时代，我们通常会外接一两块显示器，要么是双屏，要么是多屏。

展开 ToDesk 手机端的工具栏，点屏幕，可以在几块显示器之间一键切换。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-28-phone-display-and-mac-view-20261126190123-8399bf73.jpg)

如果是用电脑控制电脑，还可以开启工具栏里的多屏幕显示窗口模式，把被控端的多块屏幕分别展开成独立窗口。

如果主机放在机房或者压根没接物理显示器，工具栏里还能扩展 `3` 个虚拟屏，分别放编辑器、终端和浏览器。

如果主机放在开放的办公区，人出门了还在远程工作，又担心被别人看到屏幕上的密钥、业务数据或私人消息，可以在工具栏打开隐私屏，让被控端的物理屏幕显示遮挡壁纸；ToDesk 还提供了强隐私模式，支持远程关闭被控端的物理显示器。

## 04、免密与二次验证

在 AI Coding 场景下，远程工具好不好用，首先要看“几秒钟能不能回到桌面”。

如果每次连自己的电脑都要翻设备代码、抄随机密码，用两次就不想用了；可要是为了省事把连接限制放得太松，主力开发机里的代码和 API 密钥又有泄露的风险。

ToDesk 把便捷和安全拆成了几组开关，可以按需组合，入口在被控客户端的高级设置和安全设置里。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-14-connection-security-20261126185434-1d7eaac6.png)

先把自己的设备连通。

手机、平板和主力电脑登录同一个 ToDesk 账号后，设备会自动出现在我的设备列表里。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-20-same-account-devices-redacted-20261126193925-62b647c5.png)

在被控端勾选允许同账号设备免密连接本设备，同时把允许连接的范围收紧为仅允许同账号连接，或者非同账号连接时需请求同意。这样自己的设备点一下就能直接进桌面，陌生设备就算拿到设备代码也连不进来。

如果还想让账号更安全一些，就在手机端 App 的安全中心把手机设为账号主设备，并在被控端开启二次验证保护。开启之后会多两道关卡，任何新设备登录账号都需要主设备实时授权，连接受保护的设备或改动安全设置，同样要经过主设备同意。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-29-phone-security-approval-20261126190123-6f2b98e7.jpg)

临时需要让同事协助排查的机器，可以把常用的控制端加进白名单，再把临时密码的更新频率设为每次远控后自动更新，并绑定微信接收异地登录和设备上线提醒。安全要求更高的主机，还可以勾选控制本设备需校验本机锁屏密码。

至于离开工位久了电脑自动锁屏的问题，在远程控制悬浮球的安全菜单里启用远程解锁并录入锁屏密码，勾选自动解锁就行。

下次连上处于锁屏状态的电脑时，会自动解锁进入桌面，省得在手机上反复输入密码。

据了解，ToDesk 底层传输方面，画面、文件和剪贴板数据全程采用 SSL 与私有加密算法进行端到端加密，并已通过国家信息系统安全等级保护的三级认证与 ISO 安全体系认证。

## 05、ToDesk为什么这么丝滑

用手机遥控电脑，只要稍微有点卡顿掉帧，操作起来就会很难受。

我在同一局域网下用小米手机连 MacBook Pro 看 `30FPS` 的动画时间线，对照手机录屏回看连续 `20` 秒的播放进度，时间码的走动和原视频基本一致。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-30-phone-playback-clocks-20261126190123-ca2e2bf7.jpg)

这背后有几项技术细节很值得聊一聊。

### ZeroSync 传输架构

传统的远程桌面大多依赖 TCP 传输。TCP 要求数据严格按顺序送达，网络一抖动或者丢包，就要等待重传，进而引发队头阻塞，表现为画面突然停滞几秒，然后再一下子跳过去。

ToDesk 自研的 `ZeroSync` 传输架构把实时音视频领域成熟的 RTC 框架引入了远程控制，改用基于 UDP 的 RTP 协议，给数据包加上序列号与时间戳，再配合带宽预测、拥塞控制和 `OTT SD-WAN` 智能路由，绕开拥堵的节点。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-15-zerosync-network-20261126185435-db85a80d.png)

按 ToDesk 官网公布的数据，这套架构能将带宽利用率提升 `30%` 至 `50%`，网络拥塞率下降 `90%`，在 `30%` 丢包的弱网环境下把综合丢包率降到 `0.03%`，理想网络下端到端延迟低于 `3ms`，最高支持 `8K` 分辨率与 `360FPS`。

### ZSTD 智能压缩传输

如果经常要把电脑上的素材包传回手机设备。

普通的文件传输遇到 `node_modules` 或图片素材库这类大量零碎的小文件，受限于磁盘读写和反复的网络握手，速度会很慢。

ToDesk 客户端内置了智能压缩传输功能，在检测到碎片文件场景时，会在内存中用无损压缩算法 `ZSTD` 自动打包传输，到达接收端后再自动解压还原，CPU 占用低，传大文件的同时远程控制依然能正常操作。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-16-zstd-transfer-20261126185434-5e019a59.png)

PC 端支持拖拽和复制粘贴互传，同一网络下可以走 P2P 传输；手机端也支持上传本地文件，以及从远程电脑下载 `mp4` 视频、文档和代码压缩包，省去了用网盘或微信文件传输助手中转的麻烦。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-31-phone-file-transfer-20261126190123-4a0acc4b.jpg)

### 麦克风映射

手机上打字再方便，也没有直接口喷快。

很多远控工具只做了基础的语音转文字，先在手机上听写，再把文字填进电脑的输入框。ToDesk 在这之外还做了麦克风映射。

在远控悬浮球菜单里依次点开外接设备和麦克风映射并开启，被控电脑上会多出一个名为 `ToDesk Virtual Audio` 的虚拟音频输入设备。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-17-virtual-microphone-20261126185437-f77cdb55.png)

被控端所有需要麦克风的软件，无论是支持语音对话的桌面 Agent、语音输入工具，还是腾讯会议、钉钉，都能在音频设置里选中 `ToDesk Virtual Audio`。

你对着手机或耳机口喷时，就会以音频流的形式传到被控电脑上。

这项功能同样有系统限制，不过，目前仅支持被控端为 Windows 的设备，macOS 暂不支持。

## 06、配置清单

macOS 被控端首次安装要打开系统设置里的隐私与安全性，在录屏与系统录音、辅助功能两项里都勾选 ToDesk，然后重启客户端。

![](https://cdn.paicoding.com/stutymore/todesk-antigravity-32-mac-permission-phone-check-20261126190124-23053689.jpg)

主机如果要长时间跑 Agent，可以提前在操作系统的电源设置里关闭自动睡眠，再在 ToDesk 里配好同账号免密、仅允许同账号连接、主设备二次验证和自动解锁。

## ending

Agent 越来越强，我们的工作节奏也跟着变了。

我们不再需要一直守在工位前盯着屏幕，但也不能把电脑扔在一边不管，总有那么几个时刻，需要看一眼画面、批准一下指令、解决一个卡点。

把 ToDesk 按上面的方式配好，手机就成了主力电脑的遥控器，人走开了，桌面和正在干活的 Agent 依然在掌控之中。

很舒服。

我们下期见。
