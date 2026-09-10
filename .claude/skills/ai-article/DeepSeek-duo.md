标题：DeepSeek V4.1 Flash 正式发布！我用 Blender 复刻了苹果 Duo，有点离谱。

大家好，我是二哥呀。

DeepSeek V4.1 Flash 正式版发布了！

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910141634.png)

DeepSeek Harness 也做了深度兼容，我第一时间就用上了。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910142202.png)

这次的模型名直接切到了 deepseek-flash，API 调用就更方便了。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910142511.png)

DeepSeek Harness 也是支持直接在同一个上下文里切换模型。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910142723.png)

>ps：以下内容是基于 deepseek-v4.1-flash-expires-on-0910版本做的测试，来不及用正式版重新测试了，大家注意。不过我看了官方技术博客，能力上完全一样。

## DeepSeek 和其他国模对比

昨天做完 DeepSeek V4.1 Flash 测试版的 6 个 case 后，大家对 DeepSeek 的能力褒贬不一。

官方的态度是，DeepSeek V4.1 Flash 的能力已经超过了 V4 Pro，9月14号就会下线 Pro，直接将其路由到 V4.1 Flash 上。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910120800.png)

其实我个人是非常讨厌多模型的，需要来回切换，直接给我一个型号，你自己内部路由就行了。

管你是Flash，还是 Sol，你按照任务给我提供性价比最高的服务就行了。

用户还要调思考的强度，切换型号，好麻烦啊，这叫什么玩意的人工智能！

真正的AI你就应该替我搞定选择，我只要最好的。

我自己这几天也在高强度测试国模和国产Agent，因为我的 Apple Id 忘记了手机号码，暂时没办法继续支付了。

呜呜呜。

所以我的天才程序员 Codex 和Claude Code接下来可能会用不了。

所以的所以，我得提前找好备胎。

国内的 WorkBuddy+混元Hy4 preview、豆包+默认的两款模型（忘记啥名字了）、ZCode+GLM-5.3 Flash、DeepSeek Harness+deepseek-v4.1-flash-expires-on-0910、Qoder+Qwen3.8-Max，我都测试了一个遍（当然是在同样的提示词+Skills情况下）。

说句实在话。

不吹不黑。

DeepSeek 和 Qoder 是我更满意的替代方案，不过后者确实更消耗 Token。

我晒几个证据。

下面是 WorkBuddy 给我做的视频，画面的中间部门完全是空白，提升空间还很大。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-7553416db91c0d4578f5604bb5918431.png)

豆包制作的也是类似，有些画面还会有重影（忘记保存截图了），我就只放一个我真做过的证据。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-ebb52e377cc0ccab6370469834783d92.png)

ZCode+GLM-5.3 Flash 好一些，但也需要一些微调。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910114101.png)

DeepSeek Harness + DeepSeek-V4-Flash-Vision-Exp 的效果相对不错，速度是最快的。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910114220.png)

甚至比Codex+GPT-6 Astra都快。

当然了，效果最好的还是 Codex+GPT-6 Astra，这个组合基本上是一遍过，并且很遵循 Skills 规则，不会把多个步骤直接合并成一个 Goal。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910114404.png)

需要我喊【继续】才会继续下一个章节去制作，指令遵循的意愿是最强烈的。

但国模就容易直接一个 Goal 干到底，搞得很担心返工。😄

我相信随着时间的推移，国模+国产Agent肯定会好起来，毕竟模型之间的差距不会随时间的推移继续拉大，我们始终在追赶，并且差距在逐渐缩小。

这个信心我还是有的。

那为了继续找到我心仪的组合。

我又搞了新的 case，比如说今天 Apple Duo 发布了，官网做的相当漂亮。

这些 case 都会开源到GitHub上，作为一个记录。

>https://github.com/itwanger/agent-llm-case

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910121514.png)

## iPhone Duo 官网复刻

所以我就想，不如直接让DeepSeek V4.1 来复刻一下吧。

先看苹果官网的。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910115345.png)

再看复刻的。

【录屏】

能看得出来，还是有一些瑕疵的，尤其是一开头的hello hello，既然遮挡了一部分duo 的画面。

我觉得主要的原因是deepseek-v4.1-flash-expires-on-0910不是多模态，希望正式版能够把DeepSeek-V4-Flash-Vision-Exp直接融入进去，做一个原生多模态。

做这些有视觉效果的就会好很多。

但总结上我觉得9分是有的。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910120055.png)

有一点我需要说明下，DeepSeek V4.1 Flash 似乎反思能力很强。

在交付完第一次的产物后，还进行了一次自我迭代，是在我没有给任何指令的情况下。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910120208.png)

提示词我也一并贴出来。

```text
你是一名擅长高保真网页复刻的前端工程师。

请实际编写代码，把 
https://www.apple.com.cn/iphone-duo/
 复刻成一个能在本地运行、浏览、交互的完整网页。不要只给方案，也不要只做首屏。

先看再写。 环境能联网的话，先打开参考页，从上到下记录每个区域的顺序、尺寸、底色、排版和图片构图，桌面和手机两种宽度都要看；检查导航、配色切换、产品姿态、折叠滑块、轮播、弹层、FAQ 这些交互；从 HTML 的 picture/srcset、CSS 背景和 video/source 里找出真正用到的图片和视频。打不开就直说，不要声称浏览过。

技术。 目录里已有项目就沿用它的技术栈，空目录用 React + TypeScript + Vite。样式方案随意。动效优先用 CSS、IntersectionObserver、requestAnimationFrame，复杂滚动再考虑 GSAP。页面按组件拆分，产品参数、轮播内容、FAQ、资源地址独立管理。不要用 iframe 嵌原站，不要把整页截图当实现，不要直接加载原站的运行脚本。

视觉。 纯白和浅灰底、深灰正文、蓝色按钮，实际取值以原站为准；系统字体。建立统一的字号、间距、圆角、内容宽度变量，桌面主标题 72–96px、章节标题 48–64px 起调，移动端用 clamp() 缩放。保留中文标题的自然断行。不要加原站没有的霓虹、渐变或装饰图案。别把所有内容都排成同一种三列卡片。

素材。 优先用参考页公开的真实产品图和视频，逐一验证能否加载、内容对不对得上区域，保存到 public/assets 并记录来源。完整产品展示用 contain，场景照片按原构图用 cover；不拉伸、不裁掉铰链和机身边框。视频必须有 poster，自动播放要 muted + playsInline，并处理播放失败。找不到原动画就用真实静态素材做清晰降级并说明。图片加载失败时布局不能塌，不能留破图图标或永久加载状态。

整页都要做。 顺序是：全局导航 + 滚动后浮出的产品导航 → 首屏 → 重点概览 → 可折叠设计（配色切换）→ 产品细看（多姿态 + 折叠滑块）→ 屏幕 → 多姿态使用 → 摄像头 → 性能与续航（机型比较）→ 共有功能 → 配件 → 购买权益 → 机型比较 → 环境与价值观 → FAQ → 页脚。不要后半段空壳。

交互要真能用。 配色切换、产品姿态切换、可拖动的折叠滑块（鼠标 / 触摸 / 键盘）、轮播前后翻页与触摸横滑、摄像头功能切换、性能机型选择器、FAQ 单项与全部展开收起、弹层（Escape 关闭 + 焦点约束 + 关闭后焦点回到触发元素）。价格和购买入口用原站核实过的地址，或打开标注清楚的本地演示弹层。不要用 href="#" 或 alert() 糊弄。

收尾。 至少检查 1440×900、1024×768、390×844：手机端要重新组织布局而不是整体缩小，标题正文按钮不重叠不截断，无横向溢出；轮播和滑块在触摸下能正常操作；图标有可访问名称，固定导航不遮锚点标题；支持 prefers-reduced-motion。首屏关键图优先加载，其余懒加载，不要一次拉完所有大视频。最后启动本地服务做浏览器检查，跑一次生产构建，并对照参考页截图修正明显差异。

交付。 给出运行命令、本地预览地址，以及已实现和已降级处理的内容。没有访问、没有测试、没有实现的部分如实说明，不要把计划写成结果。
```

再来个鹈鹕骑自行车。

```
在新目录 deepseek/ds41-bicycle-riding-pelican 中，用单个 HTML 和 SVG 做“自行车骑鹈鹕”的循环动画。

自行车是骑乘者，鹈鹕是坐骑。将自行车适度拟人化：车架跨坐在鹈鹕背上，车把像双手一样扶住鹈鹕颈部两侧，前后车轮像骑手的双腿一样垂在身体两侧。保留完整、可辨认的车架、车座、车把和两个车轮，让人一眼看出是一辆自行车在骑鹈鹕。

鹈鹕有明显的长喙、喉囊、翅膀和蹼足，用双脚交替奔跑，翅膀轻摆保持平衡。自行车随着步伐自然起伏，保持骑乘姿态和接触关系，不能悬空或穿过鹈鹕身体。

画面干净、有幽默感，采用侧面略带透视的构图，背景移动表现前进。提供速度滑块和暂停按钮，调速后所有动作仍协调。

不要画成鹈鹕骑自行车，也不要只把自行车当作货物绑在鹈鹕背上。不要使用外部图片，直接写代码并实际打开验证，交付完整 HTML 和运行方式。
```

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910121634.png)

感觉也非常有意思，自行车的轮子也在转，似乎是翅膀在带动。

【录屏】

这个case我之所以喜欢，就是因为鹈鹕和自行车的关系，有点人和AI的关系。

到底是AI在给人提效，还是人在给AI打工。

我目前已经有点幻觉了。

看似AI提效了，实际上，人每天忙的要死。

任务是做不完的，很多需求也都是伪需求。

甚至为了测case，想出来了很多伪case，就这样大家还在不亦乐乎。

包括我在内了。😄

## Blender MCP 渲染 Duo

这几天，Blender 建模也非常火。

![](https://cdn.paicoding.com/stutymore/Blender-20260910112406.png)

上面是我用Codex控制电脑搞的一个林克建模，说实话，还挺惊艳的。

但一开始的也很抽象。

![](https://cdn.paicoding.com/stutymore/sucai-20260910095707.png)

所以我也想试试 DeepSeek 看看能不能搞一个平多 duo 的渲染图。

先装Blender MCP。

>这是 https://github.com/ahujasid/blender-mcp Blender的MCP，你安装一下，并测试一把

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910122048.png)

让搞一个iPhone duo 的渲染图吧。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910122347.png)

出来的效果是这样的，整体没什么大问题，但我发现相机的位置好像不太对。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910143613.png)

但整体能力，我觉得比上一代确实加强了很多。

## ending

我看官方说取消了DeepSeek-V4-Flash-Vision-Exp，用 DeepSeek V4.1 Flash 取代了，但我发送图片的时候，DeepSeek Harness 说当前模型不支持图片，请切换支持图片的模型。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910143233.png)

我希望只是 DeepSeek Harness 的一个bug，别搞啊。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910143850.png)

版本号我确认了一下，也是最新的。

![](https://cdn.paicoding.com/stutymore/DeepSeek-duo-20260910143932.png)

模型设置也没什么问题。

在线等解决方案吧。

D老师，您辛苦了，教师节快乐😄
