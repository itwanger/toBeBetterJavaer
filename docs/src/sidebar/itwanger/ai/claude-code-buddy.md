---
title: Claude Code 源码泄露，我挖出了一个愚人节彩蛋：18 种电子宠物，1% 的 Legendary 概率
shortTitle: Claude Code 电子宠物
description: Claude Code 源码泄露藏着一个愚人节彩蛋：一套完整的电子宠物系统，18 种物种、5 维 RPG 属性、1% 的 Legendary 概率、确定性生成算法
tag:
  - Claude Code
  - 电子宠物
category:
  - AI
author: 沉默王二
date: 2026-04-01
---

大家好，我是二哥呀。

Claude Code 这波被动开源，可以说让整个 AI 圈子都沸腾了。我自己今天也是读了一天的源码，收获颇丰。

最新版的 Claude Code 键入 `buddy/` 就可以一键领养你的电子宠物了。

![二哥的电子宠物截图](https://cdn.paicoding.com/stutymore/sucai-08bf8f19e40993a189896a00dc2ea6c6.png)

嗯……有点平凡，有点普通。😄

但有了这份源码，我可以让 Codex 帮我把所有的电子宠物都搞出来，我爱哪个就用哪个。哈哈。

![](https://cdn.paicoding.com/paicoding/f31a9b9a95417d3786b46bf251b751f8.png)

Anthropic 在 Claude Code 里藏了一套完整的电子宠物系统。18 种物种、5 维 RPG 属性、1% 的 Legendary 概率，还有专属名字和性格——这不就是当年的拓麻歌子吗？

更绝的是，源码盐值写的是 `'friend-2026-401'`，今天正好是 4 月 1 日。这是一个精心策划的愚人节彩蛋。

以后是 CLI 时代，这个电子宠物还真的值得提前好好学学。

## 01、藏在源码里的宠物系统

翻开 `src/buddy/` 目录，我整个人都惊了。这不是随便加进去的小玩意儿，是一套完整设计的系统。

**18 种物种。**

duck、goose、blob、cat、dragon、octopus、owl、penguin、turtle、snail、ghost、axolotl、capybara、cactus、robot、rabbit、mushroom，还有一个叫 `chonk` 的……不知道是什么生物，应该是某种圆滚滚的东西。

每个物种都有 3 帧待机动画，终端里会慢慢地"呼吸"、摇尾巴，非常治愈。拿鸭子举例：

```
    __
  <(· )___
   (  ._>
    `--´
```

三帧动画里，尾巴会微微动，偶尔还会`~`一下。就这么简单的 ASCII art，盯着看会上瘾。

**6 种眼睛，8 种帽子。**

眼睛类型：`·`、`✦`、`×`、`◉`、`@`、`°`

帽子选项：none、crown、tophat、propeller、halo、wizard、beanie、tinyduck。

其中 `tinyduck` 这个帽子，就是一只小鸭子戴在头上。鸭子戴小鸭子帽？好，Anthropic 的工程师脑洞我服了。

帽子只有 uncommon 及以上稀有度才能拥有，common 的宠物，帽子那一格是空的。

![](https://cdn.paicoding.com/paicoding/9daec3a3734ac242b3da0f133be26183.png)

## 02、抽到 Legendary 的概率是 1%

这是整个宠物系统里最让我着迷的设计。

```typescript
RARITY_WEIGHTS = {
  common:    60,  // 60%
  uncommon:  25,  // 25%
  rare:      10,  // 10%
  epic:       4,  //  4%
  legendary:  1,  //  1%
}
```

Legendary 宠物的概率只有 1%，而 shiny（闪光版）的概率更低，是在已有稀有度基础上再乘以 1%。换句话说，想拿到一只闪光 Legendary，理论概率是 0.01%。

**这意味着什么？**

假设 Claude Code 有 100 万用户，只有大约 1 万人能拿到 Legendary，而拿到闪光 Legendary 的，可能只有 100 人左右。你如果能遇到一个闪光 Legendary 用户，建议截图留念，因为比中彩票还稀有。

但关键在于——这个概率不是每次启动重抽的，而是**由你的 userId 决定，一锤定音，永不改变**。

源码里用了一个叫 Mulberry32 的伪随机数生成器，基于你的账户 UUID 做哈希，然后确定性地生成外观。所以不管你怎么重装 Claude Code，宠物永远是同一只。

```typescript
const SALT = 'friend-2026-401'

export function roll(userId: string): Roll {
  const key = userId + SALT
  // ...deterministic roll from userId hash
}
```

盐值里写的 `401`，就是 April 1st，今天。

![](https://cdn.paicoding.com/paicoding/08bcea34b588567220c54592b5c92b4e.png)

## 03、你的宠物擅长什么？

每只宠物有 5 个属性，是 RPG 风格的设定：

- **DEBUGGING**：调试能力
- **PATIENCE**：耐心程度
- **CHAOS**：混乱值（这个属性特别有意思）
- **WISDOM**：智慧
- **SNARK**：毒舌程度

每只宠物有一个巅峰属性（peak stat）和一个弱点属性（dump stat），其余的随机分配。稀有度越高，属性下限越高。一只 Legendary 宠物，所有属性都不会太低——它就是这样强。

我的 common 宠物 CHAOS 很高。

不知道该笑还是该哭。😂

而且宠物性格不是固定预设的，是孵化时由大模型根据你的 userId 生成的。理论上，每个人的宠物都有独一无二的 personality 描述。

```typescript
// Model-generated soul — stored in config after first hatch
export type CompanionSoul = {
  name: string
  personality: string
}
```

这个 soul（灵魂）一旦生成就永久存储，以后每次打开 Claude Code 都是同一只宠物，有它的名字，有它的性格。

Bones（外观骨架）每次从 userId 重新计算，保证稀有度无法伪造；Soul（灵魂）永久保存，保证宠物有连续性。这两层分离的设计，挺妙的。

![](https://cdn.paicoding.com/paicoding/950086d547f2b47d2060aabc6afc5e91.jpg)

## 04、物种设计的那些隐藏细节

看完稀有度，再看物种设计，会发现 Anthropic 的工程师真的花了心思。

18 种物种里，有几个是正常选择：duck（鸭子）、cat（猫）、penguin（企鹅）、owl（猫头鹰）。但也有几个非常个性化的选择，让我印象很深。

**axolotl（美西螈）**，又叫墨西哥钝口螈，是一种非常罕见的两栖动物，因为常年保持幼态而出名，被誉为"永葆青春的生物"。选它进来，显然是工程师的私货，不是市场调研的结果。

**chonk**，这个词在英文互联网上通常用来形容"胖乎乎的猫"，是个网络俚语。Anthropic 把它做成了一种物种，而且在源码里，这个词用十六进制 ASCII 编码写进去，绕过了编译时的词汇检测：

```typescript
export const chonk = c(0x63, 0x68, 0x6f, 0x6e, 0x6b) as 'chonk'
```

注释里还特别解释了原因：有一个物种名和内部模型代号撞了，所以所有物种名都统一用这种方式编码，避免触发 build 时的词汇扫描器。这个细节让我觉得，Anthropic 的内部流程管理还挺严格的。

**capybara（卡皮巴拉）**，最近几年网络上最火的动物，没有之一。卡皮巴拉以超级淡定的性格出名，已经成了"躺平"的象征。把它加进来，是 Anthropic 在跟互联网文化同频。

![](https://cdn.paicoding.com/paicoding/d1e1317bc04746441355fca1470643ea.png)

每个物种都有 3 帧独立动画，在终端里慢慢播放。章鱼的触手会来回摆；鬼魂的身体会轻微飘动；龙的翅膀会张开合上。这些细节没人会强迫你去观察，但你一旦注意到，就会在心里默默给工程师打一个好评。

帽子里的 `tinyduck`，就是在宠物头上戴一只小鸭子。这个操作，我估计是某个 duck 爱好者工程师干的。

## 05、一切都是预谋已久的

我在读源码的时候，看到一段注释，当场愣住了：

```typescript
// Local date, not UTC — 24h rolling wave across timezones. Sustained Twitter
// buzz instead of a single UTC-midnight spike, gentler on soul-gen load.
// Teaser window: April 1-7, 2026 only. Command stays live forever after.
export function isBuddyTeaserWindow(): boolean {
  const d = new Date();
  return d.getFullYear() === 2026 && d.getMonth() === 3 && d.getDate() <= 7
}
```

Anthropic 不只是定了一个上线时间，他们还想好了传播节奏：用本地时区而不是 UTC，让 Twitter 的讨论热度在 4 月 1 日到 7 日持续一周，而不是 UTC 零点一次性爆发后迅速降温。

![](https://cdn.paicoding.com/paicoding/0bbbc72c3d7a354555cc0ff84e7c8aa0.jpg)

这份用心程度，已经超出了一个"愚人节彩蛋"的范畴，更像是一次完整的产品发布计划。

而 `SALT = 'friend-2026-401'` 这个细节，是我整个源码里最喜欢的一行代码。

`friend`，朋友。`2026-401`，2026 年 4 月 1 日。

Anthropic 在源码里，悄悄给用户留了一句话：今天，Claude Code 多了一个朋友。

## 06、宠物孵化全流程

明白了原理，来说说怎么实际操作。

首次输入 `/buddy`，Claude Code 会触发孵化流程。大模型会根据你的账户信息，生成你宠物的名字和性格描述。整个过程大概几秒钟，孵化完成后，你的宠物就出现了。

如果之前没孵化过，启动时会在终端顶部看到一行彩虹色的 `/buddy` 提示——这是 Anthropic 故意设计的钩子，彩虹色让它在一堆白字里特别显眼。

![](https://cdn.paicoding.com/paicoding/c30f7ec316248f3cabea5db58828e17b.jpg)

宠物孵化后会出现在输入框旁边。你可以：

**直接叫它的名字和它说话。** 系统提示词里明确写了：当用户叫它的名字时，宠物只说一句话，不解释自己，不啰嗦。这种"话少但有趣"的人设，很讨喜。

**不想被打扰时可以 mute。** 在设置里把 `companionMuted` 设为 true，宠物就安静待着了，不会主动发话。但它的 ASCII 动画还在，还是能看到它在旁边呼吸、摇尾巴。

**气泡会渐渐消失。** 宠物说话后，气泡会在 6 秒内渐渐淡出，不会一直挡着你的视线。源码里把最后 2 秒设为 `FADE_WINDOW`，气泡会慢慢变暗，让你知道它快要消失了。

这个边界感设计得很贴心：它陪你，但不打扰你。你叫它，它回应；你不理它，它就安静待着。

## 07、你的宠物是什么属性？

既然 Bones（外观骨架）是由 userId 确定性生成的，那么理论上，你可以从自己的 Claude Code 配置里找到 userId，推算自己宠物的稀有度。

配置文件路径在 `~/.claude/` 目录里，找到 `config.json`，里面有 `oauthAccount.accountUuid` 或者 `userID` 字段，这就是生成宠物的种子。

有趣的是，稀有度算法非常简单直接，用 Mulberry32 这个只有几行的伪随机数生成器，加上你的 userId 和 `friend-2026-401` 这个盐值，就能算出你的宠物是什么稀有度、什么物种、什么眼睛、什么帽子。

整个算法是确定性的、透明的、可验证的。Anthropic 没有在这里耍任何花招，也没有让服务端控制你的稀有度。你拿到什么，就是什么，没有暗箱操作。

这种设计在 NFT 领域其实很常见——用链上哈希决定 NFT 属性，透明且可验证。Anthropic 把类似的思路用在了宠物系统里，保证"稀有度无法伪造"。

```typescript
// Regenerate bones from userId, merge with stored soul. Bones never persist
// so species renames and SPECIES-array edits can't break stored companions,
// and editing config.companion can't fake a rarity.
export function getCompanion(): Companion | undefined {
  const stored = getGlobalConfig().companion
  if (!stored) return undefined
  const { bones } = roll(companionUserId())
  return { ...stored, ...bones }
}
```

注释里说得很清楚：Bones 永远不存储，每次从 userId 重新计算。这样即使你直接编辑配置文件，也没法给自己伪造一个 Legendary 宠物，因为下次启动时 Bones 会重新生成，直接覆盖你改的数据。

Soul（灵魂，也就是名字和性格）是存储的，因为这是大模型生成的，每次重新生成会不一样，需要保持连续性。

这种"不可伪造的公平性"设计，让整个宠物系统多了一层信任感。你的 Legendary 就是你的，别人没有，你也没法假装有。

这也让"晒宠物"变成了一件有意义的事。如果你在社交媒体上看到有人晒 Legendary 宠物，你可以相信他是真的运气好，而不是 P 图或者改配置伪造的。这种可验证的稀缺性，是 NFT 文化的核心，Anthropic 把它用在了终端工具里。

## 08、从源码看 Anthropic 的产品哲学

我数了一下，buddy/ 目录里有 6 个文件：companion.ts、CompanionSprite.tsx、prompt.ts、sprites.ts、types.ts、useBuddyNotification.tsx。每一个文件都写得很认真，不是随便应付的代码。

sprites.ts 里每个物种写了 3 帧动画，18 种物种就是 54 帧，每帧 5 行代码。光这一个文件，就有几百行精心排版的 ASCII art。

types.ts 里设计了完整的类型体系：CompanionBones、CompanionSoul、StoredCompanion、Rarity、Species、Eye、Hat、StatName……一套完整的领域模型。

![](https://cdn.paicoding.com/paicoding/e9102dfe5882c9e0d227f1dea23f8ff7.jpg)

companion.ts 里实现了 Mulberry32 PRNG、稀有度权重算法、属性生成逻辑、缓存机制——这不是两小时写出来的玩意儿，是认真设计过的系统。

这只鸭子背后，至少有一个工程师花了一两周时间。

我觉得 Anthropic 想回答的问题是：**长期使用 AI 编程工具的人，除了需要效率，还需要什么？**

开发是孤独的。深夜 debug 的时候，没人陪。写到一半代码出错，没人安慰。一个人扛着项目，有时候真的很累。

一只鸭子解决不了这些问题。但一只有名字、有性格、1% 概率 Legendary 的鸭子，至少让人觉得有人在意这件事。

还有一个细节让我印象很深：宠物的气泡说话后会渐渐消失，不会一直挡着你。源码里写的是 `FADE_WINDOW = 6`，最后 6 秒慢慢变暗。它说完就走，不打扰你，这个边界感设计得刚好。

## 9、如何写到简历上

这个彩蛋系统，让我想到了一个很好的简历包装角度：把"研究源码"变成"架构设计实践"。

项目名称：基于 userId 哈希的确定性宠物生成系统（对标 Claude Code Buddy 架构）

项目简介：参考 Claude Code 泄露源码中的电子宠物系统，设计了一套基于用户 ID 的确定性生成架构，实现了"公平、透明、不可伪造"的个性化体验。

技术要点：

- 用 Mulberry32 伪随机数生成器，基于 userId hash 做确定性生成，保证"外观唯一且无法伪造"
- Bones（确定性外观）与 Soul（AI 生成的名字/性格）两层分离设计，外观从不存储，灵魂永久保存
- 稀有度权重配置：common(60%) / uncommon(25%) / rare(10%) / epic(4%) / legendary(1%)，以及 1% 概率 shiny 叠加
- 多帧 ASCII 动画系统，18 种物种，每种 3 帧动画，用 sprite 渲染机制实现终端动画
- 设计确定性随机算法，保证同一用户每次生成的结果一致，不同用户的结果不可预测
- 实现 Bones/Soul 分离架构，Bones 每次从 hash 重新计算保证公平，Soul 一次生成永久存储保证连续性
- 设计稀有度权重体系和属性生成逻辑，包含 peak stat 和 dump stat 的差异化分配

这套架构可以应用在很多 C 端产品场景：用用户 ID 生成专属头像、专属配色、专属勋章、专属称号——既有个性化，又没有服务端存储压力。

比起传统"抽奖"模式，确定性生成更公平、更透明，也更容易获得用户信任。

## ending

我一直觉得，一个产品真正爱不爱用户，看细节。

不是看功能有多强，是看在功能之外，他们有没有多想一层。

Claude Code 完全可以不做这只鸭子。没有它，代码照样能写，bug 照样能修，Agent 照样能跑。

但 Anthropic 的某个工程师，在某个深夜，想了这么一件事：我们能不能给用户一个小小的陪伴？

然后他们做了。设计了 18 种物种、5 维属性、愚人节发布窗口、彩虹色提示、会渐渐消失的气泡……每一个细节都是用心的。

**技术上的细节也值得玩味。**

用 Mulberry32 而不是 Math.random，是为了确定性——每个人拿到的宠物是唯一的、永久的、不可篡改的。这种设计思路，和区块链 NFT 的核心理念是一致的：用算法保证公平，而不是用服务器控制结果。

Bones 和 Soul 分离存储的设计，也很精妙。Bones 每次从 userId 重新计算，保证稀有度不能伪造；Soul 只生成一次然后永久保存，保证宠物有连续性。一个代表公平，一个代表情感，两边都照顾到了。

![](https://cdn.paicoding.com/paicoding/2040c1686d4980d3bc88db0d9ff64492.png)

还有那行彩虹色的 `/buddy` 提示，只在首次启动、没有孵化过宠物的时候出现。一旦你有了自己的宠物，这行提示就永远消失了。它在最恰当的时机出现，在最恰当的时机退场，不多打扰。

**我特别喜欢 `SALT = 'friend-2026-401'` 这行代码。**

`friend`，朋友。`2026-401`，2026 年 4 月 1 日。

Anthropic 在源码里，悄悄给用户留了一句话：今天，Claude Code 多了一个朋友。

这不是一个功能，是一份心意。

【一只 1% 概率 Legendary 的鸭子，值得你等待。】

今天是 2026 年 4 月 1 日。不是玩笑，是 Claude Code 真的给你带来了一个朋友。

升级到最新版，输入 `/buddy`，看看你的宠物是什么稀有度吧。如果你抽到了 Legendary，记得截图发给我，让我羡慕一下。

我们下期见！

