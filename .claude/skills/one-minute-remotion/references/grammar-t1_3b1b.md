# t1_3b1b · 3Blue1Brown 式数学／概念可视化

> 一句话语法：**黑底上只放「正在讲的那一个东西」，用平滑形变（Transform）把上一个概念直接变成下一个，颜色＝概念的名字，全片几乎不切。**
>
> 示范片：`scripts/engine/demos/t1_3b1b/`（渲染 `render.py --film demos/t1_3b1b`）（8s，3 镜头）· 总览 `assets/动画语法/t1_3b1b_总览.jpg` · 代码 `scripts/engine/demos/t1_3b1b/`

## 起手必查

1. **每个镜头写出「谁变成谁」。** 上一个对象和下一个对象各是什么（方格 → 圆、一条曲线 → 另一条、像素 → 神经元）。写不出变形对象的那一句，不用 t1，换 y5 或 y3。
2. **第一帧就是对象。** 坐标系、方格、曲线先出来，标题和公式后到；不要第 0 秒先 Write 一行标题。
3. **数屏上的字。** 同一时刻屏上要点不超过 2 条；第三条出来前，前面的要么变成图、要么收走。要点一条条 Write 成列表，就是黑底的 PPT。
4. **颜色表先写好。** 每个概念一个颜色，公式里的符号和画面里的对象同色；全片语义色不超过 4 种。
5. **wait 时静止。** 不加匀速慢推、呼吸、漂浮；镜头只在要看下一个对象时动，动完就停（见 ③「相机」）。

## ① 适用场景

- **用**：讲一个机制「怎么一步步变成另一个东西」——神经网络前向传播、注意力、矩阵变换、梯度下降、概率分布、算法流程。口播是「我们把这张图压平成一列」「每个像素乘上一个权重」这种**动作型句子**时最合适：每句话对应一次 Transform。
- **用**：观众需要「看见数学」——公式里的符号与画面里的物体一一对应（公式的 W 是蓝色，连线也是蓝色）。
- **别用**：产品发布、情绪/品牌片（黑底白线太冷、太慢）；数据真实走势（那是 t3 的活）；口播是观点、故事、金句时（没有可以「变形」的对象，硬上只剩装饰）。8 秒以内的快剪也不合适——3b1b 的原生节奏是一个动画 1–3 秒＋停 1 秒（见⑤），压到 8 秒 3 个镜头已经是上限。

## ② 画面构成

| 项 | 取值 | 依据 |
|---|---|---|
| 背景 | **纯黑 #000000** | Grant 自己的 `custom_config.yml`。网上流传的「深海军蓝 #0E1525」是营销博客的说法，不是原作 |
| 饱和度 | 色值照 manim 常量，再整体 **×1.5 饱和**（`DG.saturate`） | Grant 导出时 ffmpeg `saturation=1.5`；照原值用会发灰 |
| 主色（原值→×1.5 后） | BLUE_C `#58C4DD` · RED_C `#FC6255` · YELLOW `#FFFF00`（3b1b 版是纯黄，不是 CE 的奶黄 `#F7D96F`）· TEAL_C `#5CD0B3` · GREEN_C `#83C167` · GREY_A–E `#DDD/#BBB/#888/#444/#222` | 3b1b/manim `default_config.yml` |
| 颜色编码 | 一个颜色只代表一个概念，全片不换：本片 **黄＝激活/信号，蓝＝正权重，红＝负权重**，公式里的 `a` 是黄、`W`/`w` 是蓝 | 3b1b nn 第二集 part2.py：正权重 BLUE、负权重 RED |
| 线宽 | 默认描边 4（1080p 约 4px）；坐标/网络连线 2；网格主线 2、细分线 1 且不透明度 0.25 | manimlib `coordinate_systems.py` |
| 单位 | 画面高 = 8 个 manim 单位 → **1 单位 = 135px**（`DG.U`） | manim 默认 frame_height=8 |
| 神经元 | 白描边 2px；**填充不透明度 = 激活值**；半径 0.15 单位（≈20px），同层间距 0.25 单位；每层最多画 16 个，其余用 ⋮＋大括号 | `_2017/nn/part1.py` |
| 连线 | 从圆周到圆周；线宽 `3·(|w|/max)³`（本片 `0.6+3.2·|w|³` px），正蓝负红 | part2.py |
| 字体 | 公式 **Computer Modern**（CMU Serif，本工程 `CMU-rm/CMU-it`）；中文配思源宋体（与 CM 同为衬线、笔画对比接近） | custom_config：Text 字体 "CMU Serif" |
| 构图 | 一屏一个主体，居中或左右对称；标题/公式固定在上方 1/8（y≈110–150），不随相机动 | — |
| 形状语言 | 圆、方格、直线、大括号、箭头；**几乎不用发光**——「发光感」来自纯黑底上的高饱和细线，不是 bloom | 原作观察；需要强调时用 Indicate 染黄，不加光晕 |

## ③ 运动轨迹

- **缓动**：默认 `smooth = 6t⁵−15t⁴+10t³`（3b1b 版，两端速度和加速度都为 0；CE 版是 sigmoid，`MO.smoothCE`）。**几乎所有动画都用它**；linear 只给 Write、匀速旋转、ShowPassingFlash 的推进。`there_and_back` 给 Indicate，`rush_into/rush_from` 给「冲进/冲出」。
- **默认时长**：Animation run_time=1s，wait=1s。2023–24 年源码统计：显式 run_time 最常见 2s（481 次）＞3s（333）＞1s（187）＞4s（145）。
- **LaggedStart**：默认 lag_ratio 0.05；源码里最常用 0.1。实现：`MO.lagged(i, n, p, r)`（第 i 个占 `[i·r, i·r+1]`，总长 `1+(n−1)r`）。本片 100 个像素→神经元用 0.01（1.1s 走完），160 条连线用 0.006。
- **Write**：linear；<15 个子物件 1s，否则 2s；子物件间 lag = `min(4/(n+1), 0.2)`；每个字「先描轮廓、后填色」（`DG.math`/`DG.write`：lineDash 推进描边 → 后 60% 填色淡入、描边淡出）。
- **Transform**：两个形状重采样成同样点数、**起点对齐**（都从左上方向起、顺时针），逐点直线插值（path_arc=0）＋颜色插值。`DG.rectPts/circlePts/morph`。本片：方格→圆（像素→神经元），权重格→飞向一个神经元（加权求和）。
- **入场/出场**：FadeIn/FadeOut 带 shift（本片 24–40px，「从下往上」或「往上淡走」）；新层神经元从右侧 24px 淡入；被替换的东西缩成点并入「⋮」。
- **信号**：ShowPassingFlash（time_width 2）——把连线复制一份染黄、线宽 ×1.5，可见段 `[max(0,u−2), min(1,u)]`，u 从 0 到 3（`DG.flash`），按输入行 lag 0.04 错开。
- **相机**：MovingCameraScene 的 frame 动画，镜头动作是事件：停住 → 推到下一个要看的对象 → 停住。推法默认用 3b1b 原生的 smooth 一次推到（约 1s，`CAM.track` 的 push／to）；只在结论落地那一下用快推（0.28 秒推近 18–32%，重音，一段里一两次）；3D 场景环绕 0.5–3°/s（3b1b 默认 1°/s）只在讲空间关系时用。本片镜头 2 推向输出层（1→1.08）是事件推；镜头 1 绕网格 1→1.025 的匀速慢推是「每镜都慢推」的旧做法，新片不照抄。
- **wait 里静止**：原作在 wait 里通常是**静止的**——这是 3b1b 与发布会片最大的不同。不加匀速慢推、呼吸、漂浮来凑运动；动感来自下一次 Transform。

## ④ 转场（常用 4 种）

1. **Transform 接续（不切）**：上一镜末帧＝下一镜首帧，靠形变把旧对象变成新对象。本片镜头 1→2：100 个像素方格变成一列输入神经元，镜头 2 首帧与镜头 1 末帧逐像素相同。这是 3b1b 的头号转场，占绝大多数。
2. **镜头穿越（zoom through）**：相机绕一个物体指数推近（`zoom = Z^e`，感知速度恒定），物体圆周变成开口，里面是新画面。`TRANSITIONS.zoomThrough`，参数 `live:true`（旧镜头自己在 lt>时长时继续推相机，矢量重画不糊）、`r0`（物体半径）、`zoom ≥ 1100/r0`（否则开口盖不满屏、最后一帧跳）、`focus`（新画面主体先待在开口正中，e>0.55 才归位）。本片镜头 2→3：先把激活 0.95 的那个隐藏神经元描边染黄（「我们来看这一个」），再推进它 48 倍，0.75s。
3. **FadeOut(shift=UP) ＋ FadeIn(shift=UP)**：换话题时全部往上淡走、新内容从下淡入（`TRANSITIONS.fadeShift`）。
4. **ReplacementTransform 标题/公式**：旧公式的符号移动到新公式里同名符号的位置（TransformMatchingTex，3b1b 版默认 2s）；对不上的符号淡出淡入。

## ⑤ 节奏与文字

- **镜头时长**：原作是连续场景，单个动画 1–3s、后面 wait 1s；一个「镜头」（一个概念）常 8–20s。本片 8 秒 3 个镜头（2.6/2.8/2.6s）是**压缩版**，真用在口播里应拉长 2–3 倍。
- **与口播对位**：Grant 的流程是**先排动画、后录口播**（"I start by laying out all of the animations… then once I record the voiceover, the actual editing is like a day"）。所以对位规则是「一句话＝一个动画」：句子说出动作动词时动画开始，句末落定后 wait 约 1s 给观众看。
- **文字**：标题/提问在动作之前 Write 出来（先问后演）；公式与画面同时出现、同色；数值（0.95）跟着填充计数，不先于画面出现。中文一屏不超过一行标题＋一行注释。
- **FAQ 原则**："Every movement on the screen should be deliberate, with an identifiable purpose"——没有讲解目的的动作要删。

## ⑥ 代码实现要点

> 收进 skill 后（2026-10-04 v0.4）：本卡「新写」里的通用函数已统一进 `scripts/engine/lib/`（名字已换成统一后的 MO / CAM / DG / TY / CH / UI / CL / TOON），示范片自己的代码在 `scripts/engine/demos/t1_3b1b/`。库速查和「怎么为一段口播选语法」见 `references/09-视频动画语法.md`。

- 复用 skill：`engine.js`（时间轴、转场框架、`renderSolo`）、`render.py`、`PAINT.hex/cached`、`U.clamp/lerp/hash`。
- 改了引擎副本两处：段落可写 `dur`（秒）；转场可 `punch:0` 关掉拍点镜头冲击（讲解片不要那一下）。
- 新写、现已统一进库 `lib/diagram.js`（`window.DG`；`lerpPts` 改名 `morph`，相机归 `CAM`）：色板＋`saturate(×1.5)`、`camera/toScreen`、`rectPts/circlePts/lerpPts/shape`（Transform）、`neuron/edgeEnds/edge`、`flash`（ShowPassingFlash）、`indicate`、`circumscribe`、`layout/math/write`（公式排版＋Write）、`brace`。
- 新写 `lib/motion.js`（`window.MO`，三种风格共用）：`smooth/smoothCE/thereAndBack/rushInto/rushFrom/doubleSmooth`、`lagged`（`count/fmt/tabular` 收进库后在 `TY`）。
- 新写转场（已进 `transitions.js`）：`zoomThrough`、`fadeShift`。
- 关键参数：神经元 r=17/22/32px；镜头 3 讲的是**隐藏层**神经元（它的 100 个权重才能画成 10×10 图；输出神经元连的是隐藏层，不是像素——审片抓到的逻辑错）；连线 alpha 0.7–0.85；信号黄线 3–4.5px；Write 字号 58（标题）/64（公式）。
- 字体：`scripts/font_subset.py` 按片中用字子集化思源宋（全量 25MB → 300KB）；CMU 从 jsDelivr `bitmaks/cm-web-fonts@master/font/Serif/` 取 woff（注意是 `font/` 不是 `fonts/`）。

## ⑦ 代表作品与一手参考

- 代表作：3Blue1Brown《But what is a neural network?》（2017）、《Essence of linear algebra》、2024《Transformers》系列。
- https://github.com/3b1b/videos/blob/master/custom_config.yml （背景 #000、CMU Serif、saturation 1.5）
- https://github.com/3b1b/manim/blob/master/manimlib/default_config.yml （色值）
- https://github.com/3b1b/manim/blob/master/manimlib/utils/rate_functions.py （smooth 等）
- https://github.com/3b1b/manim/blob/master/manimlib/animation/creation.py （Write/ShowCreation 参数）
- https://github.com/3b1b/videos/blob/master/_2017/nn/part1.py 、part2.py （神经元与权重画法）
- https://github.com/ManimCommunity/manim/blob/main/manim/utils/rate_functions.py （CE 版对照）
- https://www.3blue1brown.com/faq （"Avoid pointless animations"）
- https://www.dwarkesh.com/p/grant-sanderson （先排动画后录口播）

## ⑧ 最容易做错的 3 件事

1. **把「发光」当成 3b1b 的标志去加 bloom、加深蓝渐变底。** 原作是纯黑底＋高饱和细线＋×1.5 饱和，几乎没有光晕。加了光晕就成了「科技感 PPT」。
2. **全用 linear 或普通 ease，动画又快又多。** 默认必须是 smooth（五次多项式），一个动画 1–3s 后停 1s；每个动作要对应口播里的一个动词。
3. **颜色编码中途变卦／颜色太多。** 一个颜色＝一个概念，公式里的符号和画面里的物体同色；超过 3–4 种语义色观众就记不住。

## qa 数字（skill `scripts/qa.py`，2026-10-04，审片前）

| 镜头 | 运动% | 静止帧对% | 跳变 | 均/峰 ms | 确定性 |
|---|---|---|---|---|---|
| t1_s1 | 1.83 | 17.7 | 0 | 1.5/2.4 | ✓ |
| t1_s2 | 7.1 | 0.0 | 0 | 2.2/3.1 | ✓ |
| t1_s3 | 3.26 | 0.0 | 0 | 1.0/2.2 | ✓ |

## 修订（独立审片 → 改一轮，2026-10-04）

审片 agent 只看成片，t1 提了 2 条 🔴、2 条 🟡：

| 审片意见 | 改法 |
|---|---|
| 🔴 逻辑错：镜头 3 把输出神经元「猫」的权重画成 10×10 像素模板，但输出层连的是隐藏层 | 改成推进**激活 0.95 的隐藏层神经元**（3b1b 原片讲隐藏层就是这样把权重画成图），结论「像猫脸 0.95」与镜头 2 里它的亮度一致；公式 a⁽¹⁾ 本来就指隐藏层，不用改 |
| 🔴 结论没有停留，0.92 在最后 0.1s 才数到；图例提前淡出 | 镜头 3 时间轴整体前移：1.65–2.0s 数到 0.95，Indicate 到 2.3s，**停 0.6s**；图例留到片尾 |
| 🟡 推镜前停留太短、新标题出来时挂着粗连线残影 | 推镜前先描黄目标神经元 0.3s；开口外旧画面改为 p 0.45–0.8 退完；新标题 0.75s 才开始写 |
| 🟡 8 秒塞 5 个概念 | 保持 8 秒（任务要求），卡片⑤写明真用时拉长 2–3 倍 |

另：镜头 1 落定后的神经元改用真圆画（原来是 48 边形），镜头 1 末帧与镜头 2 首帧**逐像素相同**（实测差值 0）。

修订后 qa：

| 镜头 | 运动% | 静止帧对% | 跳变 | 均/峰 ms | 确定性 |
|---|---|---|---|---|---|
| t1_s1 | 1.9 | 15.8 | 0 | 1.6/2.7 | ✓ |
| t1_s2 | 8.41 | 4.2 | 0 | 2.1/2.8 | ✓ |
| t1_s3 | 2.66 | 15.1 | 8 | 0.9/2.0 | ✓ |

t1_s3 的 8 个「跳变」在 lt 1.06–1.23s（像素图整体滑到权重图上）和 1.51–1.54s（100 格收拢）——看过逐帧，是有意的大位移，不是穿帮；15% 静止帧对来自结尾 0.6s 的停留（3b1b 的 wait，有意为之）。
