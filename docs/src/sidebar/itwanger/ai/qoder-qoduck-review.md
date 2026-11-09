---
title: Token 不限量，Qoder 匿名模型 Qoduck 干活猛猛滴。
shortTitle: Qoder 匿名模型 QoDuck 实测
description: Qoder 匿名模型 QoDuck 深度实测，详解 Gamefeel Benchmark 跑分表现与限时 0x 免费福利，实战达·芬奇手稿风 3D 交互解剖书、复古水彩悬崖跳水动画、网络协议交互图解与鹈鹕骑单车循环动画四个 Case，附完整可复现提示词。
keywords:
  - Qoder
  - QoDuck
  - Qwen4
  - AI编程
  - Vibe Coding
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-11-09
---

大家好，我是二哥呀。

该说不说，这跑分无敌。

![](https://cdn.paicoding.com/stutymore/sucai-20261109105936.png)

我心目中的神 Opus 5.5 只有 47.2 分，Qwen 4-Flash-Early Max 竟然高了 2.7 分。

甚至很多人都认为，Qoder 上线的匿名模型 Qoduck 就是 Qwen 4。

![](https://cdn.paicoding.com/stutymore/sucai-20261109110139.png)

并且目前是 free，可以猛猛地蹬啊，Token 自由，就在此刻，不蹬白不蹬，蹬了享大福。

当然了，光看跑分肯定是不够的，我们必须实战一波。我一口气跑了四个 Case，涵盖 3D 手稿解剖书、水彩跳水动画、网络协议图解和鹈鹕骑单车。先放一张四个 Case 的实测效果总览图，大家感受一下成色。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-20261109145335.png)

每一个 Case 的提示词我都整理好了，大家打开 Qoder 切到 `QoDuck 高` 档位，复制进去就能复刻出同样的效果。

## 01、达·芬奇手稿

第一个 Case 是做一本达·芬奇手稿风格的 3D 解剖书。

复古羊皮纸上画着人体骨骼和肌肉，每块肌肉都连着一根末端带铜环的拉绳。用鼠标按住铜环往外拉，对应的关节就会跟着动起来。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-anatomy-20261109150319-14412866.png)

提示词如下，大家可以复制到 Qoder 里复现。

```text
做一本达·芬奇手稿风的 3D 交互解剖书：摊开的旧书上有骨架和 13 块肌肉，拖动肌肉拉绳就能牵动对应关节。写到 qoder-cn/qoduck-20261109/01-muscles/index.html。
```

虽然只有一句话，`QoDuck` 却自己把实现方案规划好了。

用 CSS 做出书页摊开的透视效果，用 SVG 把骨骼按部位分组，再写一段让关节像弹簧一样回到原位的逻辑。

11 分钟，就写出了第一版能交互的网页，随后在本地启动服务，打开浏览器逐项检查拖拽铜环和旋转视角这两项功能。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-biceps-20261109150319-3dfb5e68.gif)

我自己用鼠标操作了一遍，拖拽过程很流畅。按住铜环往外拉，能看到肱二头肌收缩、颜色变深，整条前臂跟着往上抬，肘关节的角度从自然下垂时的 `-12°` 一直弯曲到 `-99°`；一松手，前臂又会带着一点回弹慢慢落回原位。

如果想看清肌肉下面的骨头是怎么动的，可以点一下底部的“骨骼层”按钮，表面的肌肉会变淡，露出下面的尺骨、桡骨和关节连接点。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-20261109151943.png)

点一下“逐肌演示”，页面会从第 I 号胸肌开始，依次演示到第 XIII 号，左页目录会同步高亮当前肌肉的名称和主要作用，用来讲解运动解剖很直观。

## 02、悬崖跳水动画

第二个 Case 是复古水彩风的跳水动画。画面里，一个穿红色泳裤的小人从高高的悬崖边纵身跳下。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-still-falling-20261109150319-eee2a17a.gif)

这个 Case 在实测时返工过一次。第一轮测试时，我给的提示词如下。

```text
做一段复古水彩风的海边跳水网页动画：红泳裤的小人从悬崖纵身跃下，翻转入水，镜头一路跟随，能重播。写到 qoder-cn/qoduck-20261109/02-diver/index.html。
```

首轮提示词只写了翻转、入水和镜头跟随，漏掉了最关键的反差笑点。

`QoDuck` 用 5 分钟就把网页写了出来，助跑、起跳、空中抱膝翻转到入水，整个过程很连贯，但看起来只是一次规规矩矩的跳水比赛，没有任何笑点。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-diver-comparison-20261109150321-d1334d02.jpg)

发现问题后，我在 Qoder 里追加了第二轮提示词。

```text
基于 qoder-cn/qoduck-20261109/02-diver 的首版另做一版，写到 qoder-cn/qoduck-20261109/02-diver-encore/index.html。复刻原片的笑点：海面近在眼前，人却一直落不下去，中途翻转、经过“还在下落”的牌子，最后才扑通入水。保留红泳裤、纸上水彩和跟拍。
```

`QoDuck` 用了 6 分多钟交出第二版。它把接近海面的那段下落延长了大约 10 秒。小人在半空中一边翻滚一边手忙脚乱地扑腾，旁边的木牌一块接一块从下往上掠过，直到第 20 秒才一头扎进水里。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-20261109152238.png)

完整可复刻的提示词如下。

```
用 Canvas 做一段约 23 秒的海边跳水动画，写成可直接打开的 index.html。方形画幅，复古水彩质感：米白纸底、蓝绿色碎浪、赭色崖壁。一个穿红泳裤的人屈膝，从悬崖跃出，镜头跟着他往下走。

笑点是海面明明就在脚下，他却迟迟落不进去。让海面一直留在画面里，崖壁不断向上滑过；他在空中翻身、倒立，身边甚至掠过一块写着“还在下落”的木牌。让这个荒诞的瞬间持续几秒，最后才扑通入水，溅起水花。提供播放、暂停、重播和时间条，点“还在下落”就能定格到人和木牌同框的那一帧。
```

## 03、网络协议交互图解

第三个 Case 是网络协议交互图解网站 `Protocol Explorer`。

平时背 TCP 三次握手、四次挥手、DNS 递归查询与迭代查询，或者 TLS 握手，光看文字很容易犯困；做成可以一步一步点击执行的交互图解，就清楚多了。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-dns-20261109150321-c10c7f4f.png)

提示词如下，可以直接复制使用。

```text
做一个 Protocol Explorer：左边选网络协议，中间用蓝色等距图逐步演示数据包，右侧解释当前步骤，底部显示报文列表。支持搜索、播放和单步。写到 qoder-cn/qoduck-20261109/03-protocols/index.html。
```

拿到需求后，`QoDuck` 用了大约 6 分钟写出第一版 HTML，一次性做出了 TCP 三次握手、TCP 四次挥手、DNS 域名解析、HTTP 请求响应、TLS 握手、DHCP 地址分配、ICMP Ping 探测和 ARP 地址解析这 8 个协议，共 33 个交互步骤，接着自己打开浏览器检查切换协议是否正常。

第一轮自检时，它发现页面在生成底部报文列表、绘制动画中移动的数据包时出现了脚本报错，没等我提醒，就在同一轮会话里把问题修好了。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-dns-sequence-20261109150321-404cf773.gif)

拿到第一版后，我在电脑浏览器上把 8 个协议的 33 个步骤逐一点了一遍。

点到 TCP 三次握手的第一步时，我又点了一下“上一步”，想看看在第一步继续往回退会怎样，结果浏览器控制台报了错，底部的报文列表和进度条也没有清零。

我就继续让 QoDuck 继续优化，最后的效果就好很多了。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-20261109152734.png)

设置做了时序图。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-20261109152810.png)

演示的时候还有报文。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-20261109152842.png)

完整的提示词如下所示。

```
做一个网络协议浏览器，写成可直接打开的 index.html。用浅色背景和蓝色等距设备图。左栏可搜索、切换协议，中间画客户端、路由器或服务器，右栏解释当前步骤，底部列出已经发生的报文。内置 TCP 三次握手、四次挥手、DNS、HTTP、TLS、DHCP、ICMP、ARP 八个可播放的演示。

用 TCP 三次握手检验效果：我点三次“下一步”，应依次看到 SYN、SYN+ACK、ACK 沿正确方向传输，每步同步更新右侧说明并新增一行报文。支持自动播放、暂停、上一步、重置；从第一步退回起点时，报文应清零。再加一个时序图视图，点其中一条消息，就能跳到对应步骤。
```

## 04、鹈鹕骑单车

第四个 Case 测的是经典的“鹈鹕骑单车”。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-pelican-20261109150322-83506deb.png)

提示词如下。

```text
做一个鹈鹕骑单车的循环网页动画，让人看得清脚怎么踩踏板。写到 qoder-cn/qoduck-20261109/04-pelican/index.html。
```

第一遍是在默认工作区里跑的，模型读到了仓库里以前做过的同题文件。

为了验证 `QoDuck` 从零实现的真实水平，我又新建了一个任务跑第二遍，在提示词里明确要求它不要读取仓库里的其他作品和提示词，事后还检查了会话里的工具调用记录，确认它没有读取过任何旧文件。

```text
做一个鹈鹕骑单车的循环网页动画，让人看得清脚怎么踩踏板。请从零写，不读仓库里的其他作品或提示词。写到 qoder-cn/qoduck-20261109/04-pelican-blind/index.html。
```

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-pedal-trace-20261109150322-95290ff1.gif)

两遍都跑得很快，大约 4 分钟就写完了全部代码，算上自检也只用了 6 分钟左右。

把底部的速度滑块拉到 `0.5x` 慢放，再勾选“显示踩踏轨迹”，或者打开右上角的 `1.6x` 踏板放大镜，可以清楚地看到靠近镜头和远离镜头。

四个 Case 都是用简短的提示词先把核心功能跑通。

如果还想进一步打磨画面细节，比如给解剖书补上更精细的颅骨、骨盆和手指骨骼，或者给协议图解网站增加浅色网络图和时序图模式，可以接着修改。

我在仓库里保留了 `QoDuck` 原版和二次修改版的对比截图。从结果看，`QoDuck` 生成的代码结构清晰，不管是单个 HTML 文件还是拆分成多个模块的工程，后续都很方便接着迭代。

![](https://cdn.paicoding.com/stutymore/qoder-qoduck-review-before-after-20261109150322-c0aa5b91.jpg)

## ending

这么跑下来，`QoDuck` 给我最大的惊喜是出活快、理解准。哪怕只给一两句提示词，它也能把带联动效果的交互网页跑通，多数 Case 只用了五六分钟，最复杂的解剖书也只用了 11 分钟左右。

而且它会主动打开浏览器检查自己写的页面。像协议图解网站里的两个问题，脚本报错是它在自检阶段自己修掉的，回退报错则是我反馈一句话后，它马上就改好了。

其实国模发展到现在，和顶级的模型肯定还是有差距的，跑分不能全看全信。

但确实在提升。

比去年这个时候的模型能力提升的已经不是一星半点。

我们下期见。
