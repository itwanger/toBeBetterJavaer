---
title: Seed2.1 Pro升级，这个模型肉眼可见的变强了。
shortTitle: Seed2.1 Pro 升级实测
description: 字节 Seed2.1 Pro 升级实测，4 个 Case 从 SVG 动画到仙剑 RPG，看看豆包工作的底层模型到底强了多少
keywords: Seed2.1 Pro, 豆包工作, Blender MCP, Three.js, 仙剑奇侠传
tag:
  - Agent
category:
  - AI
author: 沉默王二
date: 2026-09-15
---

听说这一波豆包 Seed2.1 Pro 升级了一波大的，升级到了 0915 版本！

我一直在找使用途径，发现豆包工作竟然可以第一时间使用，于是我就开始狠狠蹬了起来。

![](https://cdn.paicoding.com/stutymore/seed21-pro-upgrade-review-20260915080645.png)

经过我的实测，我发现 Seed-2.1-pro-0915 在 Coding 工程交付、Agent 长链路任务执行上有明显的提升，尤其是在多模态的理解能力上。

我直接上个短片大家感受下。

【Blender】

左边是我用豆包工作调用 Blender MCP 生成的白模预演，右边是我用豆包工作通过 Seedance 2.5 渲染的视频。

这种 3D 空间构图、场景布局、运镜控制和速度表现，让我感觉这个模型的能力肉眼可见的提升了。

![](https://cdn.paicoding.com/stutymore/seed21-pro-upgrade-review-20260915092319.png)

其实 6 月份发布的版本已经很出色了，这次虽然是小版本升级，但在很多方面都表现更出色了：

- 深度调研中，证据溯源、时效判断和数据核验都得到了强化；
- 工具执行的前后一致性也进一步提升；
- 和飞书文档的协作更心有灵犀了，文档、PPT、表格都更得心应手；
- 多模态理解和 Computer Use 的加强让让我们可以更放心地把工作交给 Agent。

talk is cheap，show you the case。

## 01、鹈鹕骑自行车

第一个 Case，仍然是鹈鹕骑自行车。

先上录屏大家感受下。

【录屏1】

我必须得说明一下，这个 Case 看起来简单，但很考验一个模型的视觉编码能力。

```
在新目录 seed21-pelican 中，用单个 HTML 和 SVG 做一只鹈鹕骑自行车的循环动画。鹈鹕有长喙、喉囊和翅膀，身体坐在车座上，翅膀扶住车把，双脚始终踩着踏板；腿部随踏板自然屈伸，车轮和踏板同步转动。 
画面干净、有幽默感，背景移动表现前进。提供速度滑块和暂停按钮，调速后动作仍协调。不要使用外部图片，直接写代码并实际打开验证，交付 HTML 和运行方式。
```

![](https://cdn.paicoding.com/stutymore/sucai-20260914190328.png)

点开思考过程，能看得出来 Seed2.1 Pro 思考得非常细致。

![](https://cdn.paicoding.com/stutymore/sucai-20260914190406.png)

尤其是自我纠错的过程。它自己截图看了一遍生成的画面，发现喙部不对，直接在对话里写了反馈。

> 当前已获取场景渲染截图。我发现鹈鹕头部结构存在异常，喙部位置偏高、形态突兀，喉囊几乎不可见，与头部的适配效果不佳。

![](https://cdn.paicoding.com/stutymore/sucai-20260914190526.png)

甚至还做了响应式处理。

![](https://cdn.paicoding.com/stutymore/sucai-20260914191302.png)

手机端的适配也完全 OK。

![](https://cdn.paicoding.com/stutymore/sucai-20260914192202.png)

色彩搭配合理，鹈鹕和自行车的每一个细节都考虑到了。

![](https://cdn.paicoding.com/stutymore/sucai-20260914191859.png)

鹈鹕有长喙、喉囊、翅膀和尾羽，身体坐在车座上，翼指紧紧握住车把，双脚始终锁在踏板上。膝和肘随踏板自然屈伸，身体轻微起伏时手脚不离位。车轮辐条、曲柄踏板、链条、车道虚线、六层视差背景（云、丘、树、草）严格同步，调速或暂停后动作依然协调。另外还有眨眼、喉囊晃动、围巾飘动这些加分项。

## 02、Blender 白模预演

第二个 Case，我们用 Blender MCP 做一段 8 秒的白模预演视频，主题是「微型无人机穿过未来美术馆」。

【视频2】

提示词比较长，我只贴一下核心部分。

```
请使用 Blender MCP 制作一个 8 秒、24fps、16:9 的单镜头白模预演。主题："微型无人机穿过未来美术馆"。场景由连通的入口走廊、中央展厅、侧廊和露台组成。入口门洞宽 2 米、高 3 米；展厅至少 10×10 米，中央立一根高 3 米、半径 0.6 米的圆柱；侧廊净宽 2.5 米。
```

![](https://cdn.paicoding.com/stutymore/sucai-20260914194711.png)

豆包工作启动后发现 Blender MCP 没装好。

有些模型在遇到工具不可用的时候，会假装没事继续干，最后给你一个根本没法用的东西。Seed2.1 Pro 如实报告了问题，打算用 bpy 命令先顶上。

![](https://cdn.paicoding.com/stutymore/sucai-20260914194927.png)

不过这次我想强制用 Blender MCP，所以可以直接插入一条指令。

![](https://cdn.paicoding.com/stutymore/sucai-20260914195007.png)

授权之后，豆包工作自己打开了 Blender，开始搭建场景。

![](https://cdn.paicoding.com/stutymore/sucai-20260914195329.png)

整个建模过程全程通过 MCP 操作。Seed2.1 Pro 直接控制 Blender 在 3D 视口里添加几何体、设置灯光、调整相机路径。

![](https://cdn.paicoding.com/stutymore/sucai-20260914201755.png)

虽然我不懂 Blender，但看着它在 3D 空间里一会儿调相机位置一会儿改灯光角度，确实挺有意思的。

![](https://cdn.paicoding.com/stutymore/sucai-20260914201825.png)

展开操作记录，每一步干了什么都写得清清楚楚。

![](https://cdn.paicoding.com/stutymore/sucai-20260914201903.png)

发现不合适的地方，自己就改好。

![](https://cdn.paicoding.com/stutymore/sucai-20260914202018.png)

白模预演视频完成。

![](https://cdn.paicoding.com/stutymore/sucai-20260914202348.png)

交付的产物也很完整。`.blend` 工程文件、渲染脚本、预演视频、关键帧截图，全都按目录结构存好了。

![](https://cdn.paicoding.com/stutymore/sucai-20260914202426.png)

看一眼 Blender 里透视模式下的建模效果。入口走廊、中央展厅、侧廊和露台的空间关系一目了然。

![](https://cdn.paicoding.com/stutymore/sucai-20260914202629.png)

白模渲染完，我让 Seed2.1 Pro 自己看图纠错。把渲染帧回传给它，让它检查圆柱位置对不对、有没有穿墙、速度变化是否平滑。

![](https://cdn.paicoding.com/stutymore/sucai-20260914203114.png)

纠错完成后，把白模预演交给 Seedance 2.5 渲染成片。

![](https://cdn.paicoding.com/stutymore/sucai-20260914214712.png)

PS：可以在网页端，也可以在豆包工作中选择 Seedance 2.5 技能直接渲染。

![](https://cdn.paicoding.com/stutymore/sucai-20260914230207.png)

我给 Seedance 写了一段详细的提示词，描述展厅里的陈设。有古典石雕、清明上河图长卷、青花瓷展柜，还有完整的一镜到底运镜路线，从入口穿过展厅，绕雕像半圈，穿侧门进走廊，最后到露台。

![](https://cdn.paicoding.com/stutymore/sucai-20260914214923.png)

![](https://cdn.paicoding.com/stutymore/seed21-pro-upgrade-review-20260915090944.png)

来看一下最后的成片。

【视频】

从 Blender 白模搭建到 Seedance 2.5 成片，整个流程跑下来还是挺快的。场景构建、相机路径、关键帧检查、渲染输出，模型自己完成了绝大部分。

## 03、3D 地铁跑酷

第三个 Case，让 Seed2.1 Pro 用 Vite + Three.js 从零做一个 3D 地铁跑酷游戏。

【效果视频】

不是那种方块摆在直线上的 demo。第三人称追尾视角，三条轨道，列车、低路障、高横杆三种障碍物，金币收集计分，速度逐渐递增。角色要有清晰的奔跑、跳跃和滑铲动画，场景要有卡通风格的城市背景。所有模型全部代码生成，不依赖外部图片或 3D 文件。

![](https://cdn.paicoding.com/stutymore/seed21-pro-upgrade-review-20260915083405.png)

Seed2.1 Pro 交出来的是一个海滨城市主题的跑酷游戏。青蓝渐变天空，右侧开阔海面加白色护栏步道，左侧高低错落的暖色小楼和彩色遮棚，近处有棕榈树、长椅、车站招牌。轨道是提亮的道砟加木质枕木和金属铁轨，暖色站台带黄色安全条和蓝色腰线。

角色是原创的卡通人物。有头发、有面部表情，亮蓝上衣、深灰裤子、红白鞋加橙色背包。奔跑时手臂自然摆动，跳跃时收腿蓄力，滑铲时后仰前伸贴地，三种姿态清晰可辨。

![](https://cdn.paicoding.com/stutymore/seed21-pro-upgrade-review-20260915084443.png)

金币、换道、跳跃、滑铲、撞车各有音效。全部用 Web Audio API 实时合成，不依赖任何音频文件。

## 04、仙剑奇侠传

最后一个 Case，也是四个任务里系统最复杂的。

【视频4】

一句提示词，让 Seed2.1 Pro 在浏览器里做一个像素风的《仙剑奇侠传》致敬版。

```
在浏览器里做一个像素风的《仙剑奇侠传》致敬版，单页可玩，素材用代码绘制的像素图，不使用原作资源。
地图：斜俯视的江南小镇「余杭镇」，溪流、石桥、竹林、瓦房、灯笼，可行走并有碰撞。
剧情：从「初出余杭」开始的一段完整剧情，带头像的对话框，任务面板记录目标，沿途和赵灵儿结伴。
系统：开箱获得道具、采药点采集草药、行囊、存档读档。
战斗：回合制，指令「攻击/仙术/道具/防御/逃跑」，至少三种敌人和一个 Boss，伤害数字、胜利结算与经验。
配一段循环的古风背景音乐。
```

![](https://cdn.paicoding.com/stutymore/sucai-20260915003603.png)

这个 Case 的难度不在某一个技术点上，而在系统的完整性。

一个提示词要同时搞定这些东西。

- 斜俯视像素地图，溪流、石桥、竹林、瓦房和灯笼全部用 Canvas 2D 代码绘制。
- 李逍遥和赵灵儿的像素头像、行走动画、战斗立绘，都是程序化生成的。
- 五声音阶的古风背景音乐，用 Web Audio API 实时合成。
- 从序章「婶婶的嘱托」到终章「山水有相逢」一共五章完整剧情。
- 回合制战斗系统，李逍遥有御剑术和万剑诀，赵灵儿有冰心诀和观音咒群疗。
- 三种敌人加一个 Boss 水妖（168 HP）。还有开箱、采药、行囊、存档读档。

![](https://cdn.paicoding.com/stutymore/seed21-pro-upgrade-review-20260915084735.png)

- pixelart.js 管所有像素美术，瓦片、建筑、人物、敌人、头像全在这一个文件里画出来。
- world.js 管地图生成和剧情文本。audio.js 用 Web Audio 合成古风配乐和音效。
- game.js 是主引擎，管移动碰撞、剧情推进、战斗流程、存读档和渲染。

没有一张外部图片，没有一段外部音频文件。纯前端，零素材。

![](https://cdn.paicoding.com/stutymore/seed21-pro-upgrade-review-20260915084833.png)

水面有 4 帧流动动画，灯笼发着暖光，药草和宝箱带闪光提示，人物有两帧行走循环，战斗中受击会闪白加震屏。

为了验证游戏真的能从头打到尾，我还让 Codex 做了一次独立通关测试。从开场对话接采药任务，过石桥进东竹林采三株止血草，路上遇敌打毒蜂和灵狐，到竹林空地和赵灵儿结伴，北上黑水潭挑战 Boss 水妖，实际使用御剑术、冰心诀和草药打了好几个回合，两人升到 3 级，回客栈交任务触发「尾声·山水有相逢」。

![](https://cdn.paicoding.com/stutymore/seed21-pro-upgrade-review-20260915085019.png)

通关过程中 Codex 发现了 6 个 Bug。铺路顺序覆盖了水格导致地图没桥面，散植装饰堵住了通道，采药后任务计数不更新，开始或读档后队伍 HUD 不显示，Boss 战前对话结束没有触发战斗启动，结局还显示旧任务提示。这些反馈给豆包工作之后全部修复了。

一句提示词，从零搭出一个有完整剧情、回合制战斗、采药开箱存档的像素风 RPG。

所有美术和音乐都是代码生成的，整个项目不到一千行代码。这是四个 Case 里最能体现 Seed2.1 Pro 长程多步推进能力的。

## ending

高强度测了一天 Seed2.1 Pro，说说最真实的感受。

>PS：目前Seed-2.1-pro-0915版本API已在火山方舟上线，并可以在豆包工作和TRAE里调用。

视觉自检能力是提升最明显的。鹈鹕那个 Case，它截图发现喙部不对就改了。Blender 那个更明显，白模渲染完自己逐帧核对有没有穿墙。

长任务不跑偏。仙剑那个 Case 最能说明问题，5 章剧情、多套系统、4 个文件，从头到尾没有丢掉任何一个需求。

工具调用靠谱了。Blender 那个 Case，MCP 没装好它如实说了。装好之后全程通过 MCP 操控 Blender，没有出现「说做了但没做」的情况。

随着时间的推移，你能感受到国模在一点一滴的提升，不是那种平地惊起一声雷，但能让你踏踏实实感觉到进步。

这才是最重要的，前路漫漫，抱有期待；念念不忘终有回响。

我们下期见。
