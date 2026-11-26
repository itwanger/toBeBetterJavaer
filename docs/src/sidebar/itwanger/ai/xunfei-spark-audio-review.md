---
title: 真人感拉满，讯飞语音大模型表现令人惊喜。
shortTitle: 讯飞语音大模型测评与 PaiAgent 接入指南
description: 以 5 条客服直播听写、9 路并发批量视频配音和 64 秒多角色会议实测，对比本地 Qwen3-ASR 与讯飞听写 V2.0、实时字幕、极速转写及超拟人合成，给出 PaiAgent 接入方案、底层架构解析与企业年终预算账。
keywords:
  - SparkAudio 1.0
  - Spark-ASR-2.0
  - 语音听写大模型 V2.0
  - 实时语音转写
  - 录音文件转写极速版
  - 超拟人语音交互
  - 讯飞开放平台
  - PaiAgent
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-11-24
---

大家好，我是二哥呀。

最近的重心放在了做视频上，也做出了不少被大家喜欢的内容，其中一条视频的点赞数第一次突破了 1 万个。

对于咱们这种没有露脸，纯 AI 做的视频，绝对是个了不起的成绩（感谢大家）。

![](https://cdn.paicoding.com/stutymore/sucai-20261124110314.png)

从 0 播放到 1000 播放，到 1 万播放，到 10 万播放，再到 30 万播放，如果你做过视频的话，知道这个过程会有多难。

但好在，我坚持了下来。

苍何还特意跑过来问我，语音合成用的什么技术，他自己找的不是很满意。那答案可以揭晓了，有些视频用的是科大讯飞的超拟人语音合成，然后克隆的我的声音。

![](https://cdn.paicoding.com/stutymore/sucai-20261124110539.png)

看过我视频的小伙伴应该能感受到，声音几乎没什么 AI 味，真人感拉满。

<audio controls preload="none" aria-label="沉默王二的复刻音色试听" src="https://cdn.paicoding.com/stutymore/xf-spark-00b-own-voice-preview-20261124191124-57793a83.mp3" style="width:100%;max-width:32rem"></audio>

先给大家听一段，是不是很 nice？

在我看来，不管是短剧还是短视频，尤其是真人上镜的，语音这块一定要高度重视，这是我们唯一能带给观众活人感的入口。

爆款视频的特点，绝对是情绪，绝对是 emotion，这个就需要语音合成的基座模型非常给力，有足够多的语料训练。

科大讯飞这次推出的 SparkAudio 1.0，是他们首个基于全国产算力训练的语音基座大模型，有需要的企业或者开发者，值得好好试一试。

- 支持 99 种语言、202 种方言，打破语音沟通的边界；
- 从语音识别到音频理解，能读懂声音背后的故事和情绪；
- 纯国产算力，更可控。

顺带提一嘴，最近正好赶上讯飞开放平台的年终大促，官方称这是迄今为止力度最大的一次，**全场 7 折外 + 满 2000 元起赠的 AI 能力大礼包，新人还能领一张 6 折特惠券**。

如果团队本来就有采购计划，不管是把未来一年的语音和 AI 能力用量一次配齐，还是先用充 700 得 1000 的不限期礼品储值卡备一些额度，赶在活动期内下单都能省下一笔预算。

>活动链接：https://t.xfyun.cn/1Xw1UE

![](https://cdn.paicoding.com/stutymore/xunfei-spark-audio-review-20261124164308.png)

来吧，实践出真知。

## 01、实时听写

先从企业最常用的实时语音听写测起。

它对应讯飞开放平台的「语音听写大模型（中英）V2.0」，底层模型是 Spark-ASR-2.0，专门用来把 60 秒以内的短语音实时转成文字。

为了方便大家跟着复现，我把讯飞的实时听写、实时字幕、文件转写、语音问答、语音合成和声音克隆六个功能，都接进了 PaiAgent。

![](https://cdn.paicoding.com/stutymore/xunfei-spark-audio-review-20261124164720.png)

PaiAgent 我已经开源在 GitHub 上，目前也有 728 个 star 了，有需要源码的可以直接去拉取。

>https://github.com/itwanger/PaiAgent

先拿一条 5 秒的客服工单热个身。

录音里说的是“请把派聪明的工单转给徐杨，周四下午三点回访”。这里面最容易翻车的是人名，本机 Qwen3-ASR-1.7B（4-bit）默认写成了“徐阳”。

![](https://cdn.paicoding.com/stutymore/xf-spark-03c-ticket-comparison-20261124170522-5f23c69e.png)

在 PaiAgent 的「客服派单对照」里，我给讯飞加了一句排班背景“值班同事叫徐杨”，再把“派聪明，徐杨”填进会话热词。同一段原声，这次返回的是“请把派聪明的工单转给徐杨，周四下午3:00回访。”展开「查看 WebSocket 首帧参数」，能看到这两项都放进了 `parameter.iat.context`。

### 客服派单上线评审会

我给产品、客服和研发拉到了一个群聊，做了一场 **4 分 51 秒、20 轮发言**的模拟会议。

<audio controls preload="none" aria-label="三人模拟客服派单上线评审会，4 分 51 秒完整 WAV" src="https://cdn.paicoding.com/stutymore/xf-spark-03d-dispatch-review-20261125085836-7718a7f6.wav" style="width:100%"></audio>

在 PaiAgent 的「实时听写」里选「多人会议」，点「听写整场会议」就能实时把会议转写成文字。

**1 分 41 秒**，客服问群里报了 36 张退单，为什么报表只有 29 张。讯飞把 36、29、差出的 7 张都记对了。

![](https://cdn.paicoding.com/stutymore/xunfei-spark-audio-review-20261125091157.png)

**3 分 53 秒**产品先提原计划，再当场改口。讯飞写下的是“原定周四下午3:00直接上线，现在改了周四下午3:00只做演练，周五上午10:00才开两家门店。”

![](https://cdn.paicoding.com/stutymore/xunfei-spark-audio-review-20261125091251.png)

点议题就能定位原声，旁边保留了这次实测原文，展开「对照模拟台词」还能逐句核对。

![](https://cdn.paicoding.com/stutymore/xunfei-spark-audio-review-20261125091444.png)

识别非常准确，完全没有误差，对于线上多人会议这种场景，「语音听写大模型（中英）V2.0」还是太权威了。

## 02、超拟人语音合成

下面两条都是我在 PaiAgent 里用讯飞的【聆玉昭】音色配的。

**等日出 · 轻声提醒**

“手冷吧？杯子给你，捂一会儿。再等两分钟，太阳就出来了。”

<audio controls preload="none" aria-label="聆玉昭轻声提醒，等日出" src="https://cdn.paicoding.com/stutymore/xf-spark-04a-smart-sunrise-wait-20261124172440-d815af1c.mp3" style="width:100%;max-width:32rem"></audio>

**看见日出 · 惊喜招呼**

“出来了，出来了！快看山尖那儿！相机给我，第一张我给你拍！”

<audio controls preload="none" aria-label="聆玉昭惊喜招呼，看见日出" src="https://cdn.paicoding.com/stutymore/xf-spark-04b-smart-sunrise-first-light-20261124172440-923f20c2.mp3" style="width:100%;max-width:32rem"></audio>

第二句我配了两遍。点「用这句试配」，保留台词和发音人，选「平叙」合成一次，再换成「惊喜招呼」合成一次。

录屏里，平叙这一版时长 6.19 秒，惊喜招呼这一版是 5.16 秒。可以听开头两个“出来了”，哪一版更像刚看见太阳就脱口而出？

<video controls playsinline preload="none" aria-label="聆玉昭朗读同一句台词：先平叙，再惊喜招呼" poster="https://cdn.paicoding.com/stutymore/xf-spark-04d-smart-sunrise-readings-20261124173006-10e3f8ee.png" src="https://cdn.paicoding.com/stutymore/xf-spark-04d-smart-sunrise-readings-20261124173006-8a1d58da.mp4" style="width:100%;height:auto"></video>

讯飞超拟人合成接口的参数有文案、发音人、语速、音高和音量。

后三个参数默认都是 50，「轻声提醒」用的是 40、46、40，「惊喜招呼」用的是 61、56、57。

## 03、声音克隆

在 PaiAgent 的「声音克隆」里选第 10 段「下班后」，照着“下班后，经过小区的篮球场……”读了一遍，把这段 11.2 秒的「沉默王二.m4a」上传，点「开始克隆」。

注意，训练时，录音得跟选中的朗读词对上。

等「我的声音」显示「可以试听」，台词就可以自己写了。我在右边选「保持原声」，填了这么一句，点「合成并试听」：

> 刚才那段日出拍到了。相机先别收，转过来，咱俩也拍一张。好，收工！

点开下面的视频，开头是我本人读的那段，**第 13 秒**切到用我的音色合成的这句新台词。平时刷过视频的小伙伴，应该能感受到，这就是我本人。

<video controls playsinline preload="none" aria-label="沉默王二本人原声与讯飞复刻对照，第 13 秒切换到合成台词" poster="https://cdn.paicoding.com/stutymore/xf-spark-04e-own-voice-comparison-20261124185627-6cbd7be0.png" src="https://cdn.paicoding.com/stutymore/xf-spark-04e-own-voice-comparison-20261124185627-86764bb1.mp4" style="width:100%;height:auto"></video>

## 04、企业批量实战

企业团队采购语音接口时，更关心这套能力能不能稳定地跑在批量视频生产和会议直播的工作流里。

打开 PaiAgent 顶栏的「企业实战」，可以直接翻看上次实测的音频和字幕，也可以改文案重新跑一批。

![](https://cdn.paicoding.com/stutymore/xf-spark-11c-studio-clone-20261125093029-0a4f0d3a.png)

### 批量生产短视频配音

做 MCN 矩阵、教培课程或者市场部产品宣发时，每周要给几十、上百条短视频配音，改稿后还得重配，这部分往往最耗人力。

先选「本人音色批量配音」，把版本发布、客服派单、直播场控、研发解说和采购提醒五条文案放进同一个队列，选已经训练好的「我的声音」，点「批量生成」。

![](https://cdn.paicoding.com/stutymore/xunfei-spark-audio-review-20261125093623.png)

这次是 **5 条文案、285 个字符、2 路并发**。从点按钮到最后一条可以播放，页面计时 **5.80 秒**，五段音频加起来 **55.61 秒**。

<audio controls preload="none" aria-label="PaiAgent 批量生成的本人音色发版播报" src="https://cdn.paicoding.com/stutymore/xf-spark-11a-studio-clone-20261125093029-b8d73a76.mp3" style="width:100%;max-width:32rem"></audio>

切到「多角色批量配音」，分别是客服安抚、发布会、直播口播和新人培训，用聆玉昭、聆飞逸、聆小璇、聆小玥四个音色并发合成。

![](https://cdn.paicoding.com/stutymore/xunfei-spark-audio-review-20261125093722.png)

这批 **224 个字符，5.45 秒**全部生成，成品总时长 **45.29 秒**。

下面这条是聆玉昭给异常订单客户的回电承诺，大家可以试听。

<audio controls preload="none" aria-label="PaiAgent 多角色配音队列中的聆玉昭客服安抚音频" src="https://cdn.paicoding.com/stutymore/xf-spark-11b-studio-tts-20261125093029-7422e52e.mp3" style="width:100%;max-width:32rem"></audio>

按讯飞超拟人合成的 650 万字符套餐来算，年终七折是 `700` 元，新客六折券后 `600` 元，套餐默认给到 `100` 路并发。

折算到每条 60 字左右的企业口播，单条音频成本约 `0.0055` 到 `0.0065` 元；就算团队一个月批量生产 `1000` 条短视频配音，花在合成接口上的费用大约是 `5.5` 到 `6.5` 元。

### 直播的实时字幕与会议纪要

接着测企业里的版本评审会、内部培训和直播场景，这类场景要求会议中能实时出字幕，会后能把整段录音快速归档并抽取待办清单。

![](https://cdn.paicoding.com/stutymore/xunfei-spark-audio-review-20261125094017.png)

为了让大家也能用同一份输入复测，我用前面实测通过的聆玉昭、聆飞逸和聆小璇三个超拟人发音人，分别扮演产品经理、后端负责人和测试负责人，中间插入 `0.4` 秒停顿，拼接出一段 `64.09` 秒（`513 KB` MP3）的多角色版本评审会录音。

<audio controls preload="none" aria-label="64秒三角色模拟版本评审会录音" src="https://cdn.paicoding.com/stutymore/xf-spark-12a-meeting-20261125082839-985b4e84.mp3" style="width:100%;max-width:32rem"></audio>

在「字幕与纪要」里点「运行会议流程」。录音开始播放，左侧的「实时字幕」跟着出字。这次从开始连接到看到第一个字用了 **1.46 秒**，整段字幕跑完 **66.55 秒**。录音结束后，页面把同一份 MP3 提交给极速转写，从提交到拿到归档文字用了 **3.71 秒**。

![](https://cdn.paicoding.com/stutymore/xf-spark-12b-studio-minutes-20261125093030-8b2f6d3f.png)

右边这份纪要用的是实时字幕。PaiAgent 把字幕交给 DeepSeek 工作流，**9.36 秒**后拿到决议和待办。

## 05、接入 PaiAgent

拿【实时听写】来演示一遍如何接入。

![](https://cdn.paicoding.com/stutymore/xunfei-spark-audio-review-20261124175241.png)

登录讯飞开放平台，进入「语音听写大模型（中英）V2.0」产品页。

在「产品价格」里找到「个人认证免费包」，完成个人认证后，点卡片底部的「免费领取」。这次我领的是 2 万次，有效期 90 天。如果是企业团队做批量压测，切到「企业认证免费包」可以领到 20 万次听写，录音文件转写大模型版企业免费包也有 50 小时，足够先拿一批真实工单和会议录音跑通流程。

>https://www.xfyun.cn/services/spark_asr_zh_en_v2.0#anchor5

![](https://cdn.paicoding.com/stutymore/xf-spark-06-iat-desktop-20261124174918-c3243ba0.png)

订单页会让你选应用。

我选了「派聪明」，第一次接入可以点「选择应用」旁的加号新建。核对应用名和 0 元订单，确认领取。

回到听写控制台，选中同一个应用，左边能看到剩余次数，右边能找到 APPID、APISecret 和 APIKey。

![](https://cdn.paicoding.com/stutymore/xf-spark-06-iat-console-desktop-20261124174918-e159db2b.png)

把这三个值按名字填进 PaiAgent 的 `backend/.env`。第一次配置可以从 `backend/.env.example` 复制一份。

```dotenv
XFYUN_IAT_APP_ID=你的APPID
XFYUN_IAT_API_KEY=你的APIKey
XFYUN_IAT_API_SECRET=你的APISecret
```

保存后重启后端，打开 PaiAgent 顶部的「讯飞语音」即可使用实时听写。语音合成和声音克隆需要在各自的服务页给同一个应用开通权限。

![](https://cdn.paicoding.com/stutymore/xunfei-spark-audio-review-20261124175459.png)

## 06、为什么这么强？

举一个客服质检的例子。

客户说“你可真行啊”，质检员却分不清对方是在夸人还是在抱怨。传统方案先把录音转成文字再送给语言模型，语气和重音全都丢了；SparkAudio 1.0 让音频经过编码器再送进语言模型，把声音和情绪放在一起理解。

![](https://cdn.paicoding.com/stutymore/xf-spark-04-tone-20261124151431-213a6f1f.png)

问题是，给海量录音逐字标注太贵，怎么把声音和情绪一起训练进编码器？

讯飞换了思路，用半监督音频编码器 SemiEnc，先由标注数据训练出的专项模型提取特征，再经量化器生成训练目标，这样没有标注的纯音频也能用来训练，学到语义和情绪信息。

训练时先冻结两端、只训练适配器（Adapter）完成空间映射，再放开全参数训练并把上下文扩到 32K，最后通过监督微调（SFT）和同策略蒸馏（OPD）提升指令的遵循能力。全流程均在昇腾 910B、海光 BW1000 等国产算力平台上完成。

![](https://cdn.paicoding.com/stutymore/xf-spark-09a-training-20261124154949-c9c13761.png)

底座训练好以后，推理阶段还得解决速度和成本问题。全靠语言模型逐字转写既慢又贵，讯飞用协同解码 CoDec 多加了一条并行路径，音频编码器的输出一路送进语言模型，另一路交给 CTC 解码器一次性并行算出初稿。

语言模型通过投机解码核验这份初稿，没问题的前缀直接沿用，只从出现分歧的位置介入修正，省下了大量逐字生成的等待时间。Spark-ASR-2.0 在基座上又融合了业务上下文，这也是前面传入名单后，“徐阳”能改成“徐杨”的原因。

![](https://cdn.paicoding.com/stutymore/xf-spark-09b-codec-20261124154949-1ea2344c.png)

高噪声场景下，Spark-ASR-2.0 从上一代的 37.84 降到了 29.21（业界对照 35.76），方言错误率降到了 9.05（业界对照 25.92）。

中英文混合一项，Spark-ASR-2.0 从 18.29 降到 8.00。

![](https://cdn.paicoding.com/stutymore/xf-spark-05-whitepaper-20261124151431-6e5c7301.png)

转写出来的字幕写错了还能动态修改，可到了同传和实时语音交互，播出去的话却收不回来。为了控制开口时机，讯飞在语言模型后面接了 Talker 负责发声，并用动态分段端到端建模（S-S2S）衔接理解与播报。

![](https://cdn.paicoding.com/stutymore/xf-spark-09c-streaming-20261124154949-b121891a.png)

## 07、年终活动怎么买更划算

提醒需要的企业和开发者一下。

讯飞开放平台正在做年终活动，官方称这是开放平台迄今优惠力度最大的一次。到 **2026 年 12 月 31 日**为止，包括语音听写、实时转写、离线 SDK、文字识别和星火大模型在内的全线 AI 能力，新老用户买活动套餐都能享七折，优惠没有上限。

如果团队年底正好在排明年的预算，可以把接下来一年预计要用的能力一起算一算，会比平时按原价零散续费省一些。

>https://t.xfyun.cn/1Xw1UE

拿前面测过的客服听写算一笔账。假设每天有 4000 条工单，一年按 250 个工作日算，正好是 100 万次。听写 V2.0 的一年包原价 2000 元，活动价 1400 元，按这个用量能省 600 元。

![](https://cdn.paicoding.com/stutymore/xf-spark-10a-dictation-desktop-20261124180945-e8231ad0.png)

如果主要做配音，算字数时记得把改稿重配的字数也算进去。超拟人合成 650 万字符原价 1000 元，从未在平台付过费的新客用六折券是 **600 元**，每个账号限购一次、最高减 1000 元。

![](https://cdn.paicoding.com/stutymore/xf-spark-10b-newcomer-desktop-20261124180945-1a4106a7.png)

如果同一个账号这两笔都买了，现金实付合计正好 **2000 元**，可以领第一档 AI 能力礼包（官方折算总价值约 1004 元），里面有 200 元礼品卡、2000 万个 Spark-Audio-1.0 Tokens 和 20 亿 Spark-X2.6 Tokens。

年度采购量更大的企业，满 5000 元、10000 元往上还有对应的阶梯礼包，实付满 1 万元起会额外提供 1V1 专项技术支持，最高档累计权益约 18 万元，比较适合用量稳定的中大型团队一次性采购全年额度。

![](https://cdn.paicoding.com/stutymore/xf-spark-10c-gifts-desktop-20261124180945-172f181f.png)

**这轮优惠到 12 月 31 日结束**，之后会恢复原价，排明年预算时记得留出审批和支付的时间。

## ending

这三个月折腾短视频，我最大的感受是，AI 做内容已经过了拼“能不能生成”的阶段，现在拼的是有没有活人感、情绪对不对味。

emotion 比 remotion 更重要，这个能力就需要声音来承载。

实际用下来，这玩意非常便宜，尤其是 TTS 这块，我充的 500 到现在还没用完。

国产算力能把语音基座做到这个水准，还能把成本压到让中小团队都用得起，确实值得点赞。

我们下期见。
