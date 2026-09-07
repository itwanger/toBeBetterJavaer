标题：阿里发布全新Qoder，Codex不香了。

标题2：阿里发布全新Qoder，还可以爽用Qwen3.8-Max。

大家好，我是二哥呀。

全新 Qoder 发布了！整体能力可以说有了大幅提升。

以前的 Qoder 是偏 IDE 的，主要面向程序员群体，新版的 Qoder 不再局限于编程，其【通用】模式更像是一个 Worker，面向所有人。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907121839.png)

不仅能做 PPT，还能制作视频，甚至还有鱼塘。对，你没看错，真正做到了一个 Qoder，解决你所有的需求。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907122130.png)

我甚至已经想好了，直接搞个斗地主插件进来，工作摸鱼两不误，哈哈。

高强度体验了一天，能感受到这就是 Codex 的最佳替代品。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907122503.png)

Computer Use 和 Chrome Use 用起来也比之前更丝滑了。

废话不多说，我们直接进实测。

## 01、BYOK 升级

Qoder 也是真听啊，不再强绑定模型，意味着你可以直接把自己的 API Key 接入到 Qoder。

比如说 DeepSeek-V4-Flash-Vision-Exp。

有了 BYOK（Bring Your Own Key），基本上 Qoder 就是一个完全开放的 Agent 了，毕竟你可以在 Qoder 里爽用任何一家，免费的都行。

挺佩服这种 Open 精神。

这波必须给点个赞。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907142742.png)

>官网地址：https://qoder.com/zh

下载安装后的第一步，在设置里找到【模型】，点击【添加模型】。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907090721.png)

第二步，供应商选择 DeepSeek，模型选择 DeepSeek-V4-Flash-Vision-Exp，填写API Key。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907090833.png)

第三步，点击【校验并添加模型】，如果 API Key 填写正确，就会提示已添加成功。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907090916.png)

然后我们直接来一个小 case 测试下。

>生成一个骑自行车的鹈鹕 SVG。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907091136.png)

很快就有产出了哈。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907091434.png)

来看看效果。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907092104.png)

有点抽象，哈哈，说明 DeepSeek-V4-Flash-Vision-Exp 还有很大的进步空间，狠狠期待下一个版本。

毕竟 GPT-6 Astra 这波真的拉高了模型的能力上限。

好，我们再换成 Cantus 模型来试一下，这是一个超越 Qoder 「极致」模型的新模型，擅长超长自主任务执行，能够解决最复杂的知识工作与编程任务。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907092520.png)

效果果然不一样。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907092800.png)

不管是骑车的姿势，还是脚在脚踏板上的细节，都非常到位。

当然了，Qwen3.8-Max 的效果也非常顶，鹈鹕的嘴里还有鱼，这个细节真的很可爱啊。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907095034.png)

我第一眼看到的时候，嘴角都忍不住微微上扬了一下，有点意思。

一个模型到底厉不厉害，跑分看看就得了，真正重要的还是要看在同等的 Harness，相同提示词的环境下，实际产出的结果对比。

## 02、强大的 Harness

全新 Qoder 给我的另外一种强烈的感觉就是，Harness 有了更进一步的提升。

自主 Agentic 循环更稳定了，不管是检索代码库、跨文件编辑、运行测试，还是根据真实结果自我纠错，都有了质的提升。

还有权限与安全，边界也更清晰了。

在长上下文处理、自动上下文压缩、工具调用准确率上，都能明显感觉到。

talk is cheap，show you the vibe。哈哈

应该是上高中的时候，特别迷恋暴力摩托这块游戏，玩起来简单，但又很刺激，尤其是把别人踹倒的时候。

太坏了我。

简单介绍下北京，这是 EA 1991/1995 年经典神作《Road Rash》（主创：Randy Breen）。

所以我就想，咱直接让 Qoder 配合 Qwen3.8-Max 做一款暴力摩托的游戏吧。

选择新的工作区（这个交互比之前更友好了，可以选择图标和颜色）

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907090607.png)

基础版的提示词。

```
使用 Three.js 开发单文件版《暴力摩托》核心原型：
  1. 公路与驾驶：双向起伏弯道，摩托过弯具备真实的压弯倾角（Roll）；
  2. 格斗系统：J 键左打、K 键右打、L 键挥武器，AI 车手会靠近挑衅，击中带受击硬直与音效，连续击打使对手摔车；
  3. 撞车与避障：躲避对向逆行车辆，发生撞击后角色被甩出滑行；
  4. 复古 90 年代街机 HUD（速度表、血条与排名）。
```

完整版提示词有需要的同学可以评论区喊一声。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907100715.png)

整体任务还是挺复杂的，设计到项目骨架搭建、道路系统和驾驶手感、碰撞和摔车、音效和比赛流程，最后是构建。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907105817.png)


推进到步骤5的时候，我看了一眼耗时55分钟43秒。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907111945.png)

但任务完全没有跑偏，说明 Qoder 的上下文处理做的非常不错。

然后Qoder已经自己打开 Chrome 开始自己做测试了，摩托车的声音听起来很复古，有点当年的感觉。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907112832.png)

只是画面略显【牛来】，建模还有待加强，另外就是摩托的行驶方向好像是反的。

不过任务还没有跑完，Qoder还在自我测试和修改当中。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907113353.png)

在当前任务进行的过程中，如果有新的提示词需要补充，也可以插话（插入当前上下文）或者插队（插到队列头部）。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907120902.png)

果然自我迭代后的效果就好很多了。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907143852.png)

画面像模像样了。

然后我们直接用 Computer Use 让 Qoder 控制电脑帮我们测试一下。

>[@computer-use](plugin://computer-use) 你直接控制我的电脑玩一把，把玩的过程保存成一个视频

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907145901.png)

我这里耍了点小心机，没有给 Qoder 开启 Computer Use 权限，想看看 Qoder 能不能降级到 Chrome Use 去测一波。

还真给它装到了，哈哈。

【视频】

在本机 Chromium 里用真实键盘事件（Enter 发车、按住 W 油门、A/D 转向、J/K 出拳——与物理键盘同一条输入通道，不是调试钩子）完整打了一把，同时用上下文级录像记录全过程，再用 ffmpeg 转成 mp4。

牛的。

## 03、还有Work

全新Qoder提供了两种模式，一种是编程，另外一种就是通用的 Work。

做PPT，做视频，处理日常的工作任务，都可以轻松应对。

- Goal 让 Agent 围绕明确目标持续工作；
- Plan 帮你先想清楚路径；记忆、本地项目和运行状态可以提供任务需要的背景信息；
- Browser Use、Computer Use 让 Qoder 可以帮你操作网页、桌面应用。
- 此外，Qoder 还接入了 40+ 连接器、70+ 插件与 20K+ 技能，直接打通你的工作系统。

刚好我手头正在做 Agent 方面的视频，我们就用Qoder的【通用】模式来体验一下。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907103010.png)

左上角切换到【通用】模式，选择工作目录，权限我一般选择【完全访问】，模型选择极致。

提示词非常简单，因为我把制作视频的流程已经做成Skill了，然后脚本也提前写好了。

>按照ergo-remotion-video skill为这期脚本what-is-prefix-caching.md制作

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907103409.png)

就看Qoder能帮我做到什么程度了。

这个任务还是非常复杂的，一开始的工具执行就来到了 30 多次。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907103804.png)

准备音色开始生成配音，分片已经OK了。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907104203.png)

OK，第一章做完了，

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907110947.png)

Qoder 会自动打开 Chrome，然后我们可以直接在这里看到整体视频的演示，包括声音。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907111335.png)

我把视频也上传了，大家可以感受一下，整体 Qoder 的产出还是非常给力的。

【录屏】

画面风格我很喜欢。

在我确认后，会进入第二章的制作。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907111831.png)

接着是第3章、第4章、第5章。

![](https://cdn.paicoding.com/stutymore/new-qoder-20260907144212.png)

整个过程没有出现错误，声音、画面都相当的一流，是我预期的样子。

## 04、ending

AI 真的变化太快了。

一年前，Qoder 刚出现的时候，我是真没想到，IntelliJ IDEA 我是几乎不打开了。

编程全部交给 Qoder 这样的产品。

一年时间过去，Qoder 不仅承接了我的编程工作，还承接了大量日常工作，比如说制作PPT、做视频，做测试。

更夸张的是，你完全无法预知未来会变成什么样子。

模型的能力还在提高，Harness 的能力也在提高，剩下的，恐怕只有人的创造力，能否匹配上 Agent 进化的速度了。

