# Gemini 4 Carbon 可直接引用 Case 清单（2026-11-11）

- 调研时间：2026-11-11 约 09:40–09:45（Asia/Taipei，UTC+8）。浏览/赞/收藏都是这个窗口的快照，之后还会变。
- 用途：给 Jaco 写稿用。Jaco 明确说要用「他人 Case + 自己在 Antigravity 自测 1 个」。本稿只做只读调研，没有对外发布，也没有替他在 Antigravity 里跑。
- 选题台账：R-20261111-0920-01 已记成已采用。对应官帖 https://x.com/Google/status/2120186185423159331 （2026-11-11 00:05:52 台北）。
- 数字来源：X 工具 `get_posts_by_ids` / `search_posts_all` 当场读到的 `public_metrics`；官方参数只采用 Google 博客、DeepMind 模型卡、Google AI 开发者文档/定价页、Antigravity 文档、Cursor 官方页、GitHub Copilot changelog。
- 读法：每条都分「作者原话」和「我的说明/推断」。没在原帖或官方页里核对到的，不写成事实。

## 先说清楚的几件事

1. **正式开放时间已经核对。** @Google 主帖创建时间是 `2026-11-10T16:05:52.000Z`，换算成台北时间（UTC+8）是 **2026-11-11 00:05:52**，和线索里「北京时间 11-11 00:05」一致。这之前的社区测试，以及作者自己写「early access / I had early access from Google」的，都要标成早期体验，不能写成公开发布后的普通用户实测。
2. **大约两周前只给网安团队用，是另一场发布。** 2026-10-28 的官方博客 *Introducing Gemini 4 Carbon* 是通过 Fairwind Program 把 Carbon 交给网络安全团队。2026-11-11 00:05 这场是面向开发者、企业、科学家和消费者的正式开放。旧台账 R-20261029-0925-01 记的是前一场，不要和这次混成一次发布。
3. **Antigravity 里用 Carbon，和能不能打 `/swarm`，不是同一件事。** 官方模型表写得很清楚：Gemini 4 Carbon 在 Antigravity 里只给 **Google AI Ultra** 和 **Enterprise**，Free / Plus / Pro 都是 ❌。`/swarm` 文档写的是 **Google AI Pro 和 Ultra** 都能用这个斜杠命令。不要写成「Pro 用户也能在 Antigravity 里用 Carbon」，也不要写成「只有 Ultra 才能用 /swarm」。
4. **网安跑分不要直接当成公开发布版的成绩。** 模型卡写明，网络安全相关基准反映的是通过 Fairwind Program 访问时的表现。SEC-bench Pro 88.2% 这类数字，写稿时要带上这个前提。
5. **你点名的「105 个 Bug，Fable 58 分 $139.65 vs Carbon 57.3 分 $31.32」原帖不是 @JamesDa55049936。** 原测试是 @PawelHuryn。James 那条只是中文转述，浏览只有几百，写稿请引 Pawel 原帖。
6. **CursorBench 60.4% 和 API 输入 $2、输出 $10 / 百万 token（11-30 截止），已经能在官方页核对，不再放进「不要写成事实的」。** 线索里把这两项当转述，是早间雷达时还没打开官方页；现在都已核实。

## 可直接引用的 Case（按写稿价值排序，12 条）

价值排序的依据：是不是 Google / DeepMind / Sundar / Demis / Antigravity 自己发的或官号点名引用的、测试条件是否写清（提示词、档位、耗时、对比对象、数字）、以及是不是公开发布之后的测试。热度高但信息少的，往后放。

### 1. @demishassabis｜把 Theme Park 二进制一次逆向，并加上 DeepMind 游乐设施、移植到网页（官方第一方）

| 项 | 内容 |
|---|---|
| 作者 | @demishassabis（Demis Hassabis） |
| 原帖 | https://x.com/demishassabis/status/2120210297948696997 |
| 发布时间 | 2026-11-11 01:41:41（台北时间），官宣之后约 1 小时 36 分 |
| 官方挑选 | 作者本人就是 DeepMind CEO，第一方 Case |
| 提示词 | 帖内未给 |
| 对比 | 作者引用了自己 2025-11-18 用 Gemini 3 做 Theme Park 的旧帖 https://x.com/demishassabis/status/1990818894177513831 ，作为「一年后」的对照，不是并排四模型测评 |
| 热度快照 | 约 10.43 万浏览、2065 赞、242 收藏 |

- **作者原话：** Gemini 4 Carbon 把 Theme Park 的二进制逆向出来，还加上了一个 DeepMind 游乐设施，并移植到网页上，「in one shot」。
- **我的说明：** 这是官方人物亲自发的、最好直接引用的第一方 Case，适合讲「长程编码 / 逆向 + 能玩的成品」。提示词、用的是 Antigravity 还是别的表面、花了多久、token 花了多少，帖内都没写。「in one shot」是作者原话，不要扩写成「完全没有人工修改」或「任何人一句提示词都能复现」。旧帖是 Gemini 3 时代的 Theme Park，不是和 Fable / Opus 的同题对比。

### 2. @sundarpichai / @Google｜Pelican Quest：/swarm 在 Blender 和 Three.js 之间打迭代，做出可玩的 Mountain View 校园 3D 游戏（官方第一方，有可玩链接）

| 项 | 内容 |
|---|---|
| 作者 | @sundarpichai（Sundar Pichai）；同主题另有 @Google 线程 |
| 原帖 | https://x.com/sundarpichai/status/2120198811297694192 |
| Google 后续帖 | https://x.com/Google/status/2120260356413051147 ；续帖 https://x.com/Google/status/2120260358036213834 |
| 可玩地址 | https://aistudio.google.com/apps/bundled/pelican-campus-quest （Google 续帖给出的 AI Studio 链接） |
| 发布时间 | Sundar 2026-11-11 00:56:02（台北时间）；Google 主帖 05:00:36 |
| 官方挑选 | 第一方 |
| 提示词 | 帖内未给 |
| 热度快照 | Sundar 条约 20.29 万浏览、3326 赞、379 收藏；Google 主帖约 5.68 万浏览、200 赞、24 收藏 |

- **作者原话（Sundar）：** Carbon 做了一个鹈鹕演示，「so you don't have to」。这是对长程编码和 Google Antigravity 新功能 `/swarm` 的有趣测试。Builder 和 critic 子代理在 Blender 和 Three.js 之间跑迭代循环，检查自己的渲染，做出一个鹈鹕骑车环绕 Mountain View 园区的可玩 3D 游戏。
- **作者原话（Google）：** 用 Gemini 4 Carbon 和 Antigravity 里的 `/swarm` 做成开放世界 3D 浏览器游戏 Pelican Quest。续帖写：子代理在 Blender 里建模和绑定 3D 资产，然后 Carbon 用 Three.js 写出 60 FPS 的游戏，带自定义 WebGL2 shader、程序音频，以及一段 Lyria 原声。
- **我的说明：** 这是讲 `/swarm` 最好的官方例子，而且有可玩链接，写稿时建议同时放 Sundar 原帖和可玩地址。官方没有写总耗时、轮数、花了多少额度。Antigravity 博客和 `/swarm` 文档都警告：并行多智能体比普通对话吃额度快得多，所以这个官方大作不适合当成 Jaco 第一次自测的模板。60 FPS 是官方自己报的运行目标，不是第三方复测。

### 3. @sundarpichai｜用 Carbon 和 AlphaProof Code 形式化验证 Signal 协议：超过 600 万行 Lean 证明（官方第一方）

| 项 | 内容 |
|---|---|
| 作者 | @sundarpichai（Sundar Pichai） |
| 原帖 | https://x.com/sundarpichai/status/2120207062655549933 |
| 发布时间 | 2026-11-11 01:28:49（台北时间） |
| 官方挑选 | 第一方 |
| 提示词 | 帖内未给（这是研究项目，不是一句提示词的前端演示） |
| 热度快照 | 约 15.79 万浏览、2416 赞、328 收藏 |

- **作者原话：** 团队用 Gemini 4 Carbon 挑战一个重大安全问题：从数学上证明 Signal 协议底层的代码。DeepMind 研究者用 AlphaProof Code 引导智能体，把验证做到编译后的设备代码。结果：Carbon 生成了超过 600 万行由机器检查的 Lean 证明；多年专家人工验证被压缩到「只需数周」；大约 1% 的代码库需要人工审阅，其余由 Lean 自动检查。他们会把结果开源给安全社区。
- **我的说明：** 数字全是官方自报，适合讲「科学 / 安全 / 长程推理」，不要写成「普通用户在 Antigravity 里也能几小时做完」。人工介入的方式和开源仓库地址，这条帖里没有展开，写稿不要补造。这和 Fairwind 网安基准是两条线，不要把 600 万行 Lean 和 SEC-bench 88.2% 写成同一场测试。

### 4. @Google｜根据 2026 年针织力学论文，在 Antigravity 里做出跟踪 110 根纤维的交互 3D 可视化（官方第一方）

| 项 | 内容 |
|---|---|
| 作者 | @Google |
| 原帖 | https://x.com/Google/status/2120279087314837642 |
| 发布时间 | 2026-11-11 06:15:01（台北时间） |
| 官方挑选 | 第一方；Antigravity 博客也写了纺织可视化这个官方演示 |
| 提示词 | 帖内未给 |
| 热度快照 | 约 7.03 万浏览、293 赞、46 收藏 |

- **作者原话：** 复杂材料研究如果能跟底层数学互动，会更好懂。Gemini 4 Carbon 根据一篇 2026 年针织纺织力学研究，在 Antigravity 里做了交互 3D 可视化，跟踪张力下的 110 根独立纤维。
- **我的说明：** 官方点名了「110 根纤维」和「在 Antigravity 里完成」，画面适合做科学可视化例子。论文标题、提示词、是否用了 `/swarm`、耗时，帖内都没写。不要扩写成「读一篇论文就能自动发 Nature」。

### 5. @PawelHuryn｜两个仓库、105 个植入 Bug：Fable 5.2 最高 58 分 / $139.65，Carbon high 57.3 分 / $31.32（发布后第三方测评，原帖不是中文转述）

| 项 | 内容 |
|---|---|
| 作者 | @PawelHuryn（Pawel Huryn） |
| 原帖 | https://x.com/PawelHuryn/status/2120283296550547618 |
| 发布时间 | 2026-11-11 06:31:45（台北时间），官宣之后 |
| 官方挑选 | 本次未看到 Google 官号引用这条 |
| 提示词 | 帖内未给具体修复提示词。可知的设定是：2 个仓库，105 个植入（replanted）Bug |
| 对比 | 作者给出的分数和费用：Fable 5.2 max 58 / $139.65；Carbon high 57.3 / $31.32；Sonnet 5.5 max 51.3 / $154.03；GPT-6 Astra max 45 / $33.03；GPT-6.1 Sol max 44.3 / $5.88；Argon high 40.7 / $7.16 |
| 热度快照 | 约 4.22 万浏览、628 赞、117 收藏 |

- **作者原话：** 在两个仓库、105 个植入 Bug 的测试里给出上面这组分数和美元成本。线程里还提到下一档 effort「很快会公布」（drops soon）。
- **我的说明：** 这是「便宜但分数几乎贴着 Fable」这句话最干净的来源。写稿请引用这条，不要引用 https://x.com/JamesDa55049936/status/2120295438012297465 ——那是中文转述，热度约 544 浏览，数字也来自 Pawel。这是作者自己的评测，不是 Google 或 Cursor 官方榜。仓库、判分规则、是否公开复现脚本，主帖正文没有全部展开，不要写成「业界标准榜」。Carbon 用的是 high，Fable / Sonnet / Astra 用的是 max，档位名称并不对等，引用时把档位原样写上。

### 6. @thebuggeddev｜只给一张参考图，做出可交互的 19 世纪巴黎光学实验室，92 个铜与玻璃部件（Google 官号引用）

| 项 | 内容 |
|---|---|
| 作者 | @thebuggeddev（The Bugged Dev） |
| 原帖 | https://x.com/thebuggeddev/status/2120201759305998343 |
| 发布时间 | 2026-11-11 01:07:45（台北时间），官宣之后约 1 小时 |
| 官方挑选 | Google 官号引用：https://x.com/Google/status/2120324721816539520 （2026-11-11 09:16:22 台北），配文大意：从一张参考图出发，用 Carbon 做出 19 世纪巴黎光学实验室，有 92 件可实际测试和调节的黄铜与玻璃仪器 |
| 提示词 | 帖内未给。作者只说「using nothing but a reference image」，没有设计参考 |
| 热度快照 | 原帖约 1.20 万浏览、186 赞、66 收藏 |

- **作者原话：** Carbon 只靠一张参考图，做出了交互式的 19 世纪风格巴黎物理实验室 Analyse Spectrale（Mod. M1-2-15）。有 92 个机加工黄铜、铜和硼硅酸盐零件，现场 Beer-Lambert Rankine 涡旋，轴向爆炸视图，以及一套档案风 Bento UI，带 60 FPS 的 SVG 瓦特指示器和原理图板。作者认为材质非常真实，整套 UI 是模型自己想出来的，他没有提供设计参考。
- **我的说明：** 这是 Google 当天点名的社区 Case 里，画面和具体数字写得最清楚的一条，适合做「一张参考图 + 可交互 3D」的例子。提示词原文、用的表面（Antigravity 还是 API）、耗时、是否一次成功，帖内未给。60 FPS 和 92 个零件都是作者自报，我没有打开成品逐件清点。发布时间在官宣后，作者没有写 early access。

### 7. @kimmonismus｜早期体验：13 个编码 brief；其中 TIDEFORGE 一次提示做出 1,048,576 个 WebGPU 粒子（Google 官号引用）

| 项 | 内容 |
|---|---|
| 作者 | @kimmonismus（Chubby） |
| 线程首帖 | https://x.com/kimmonismus/status/2120186125591646250 |
| 官号引用的这条 | https://x.com/kimmonismus/status/2120186202271945137 （线程 2/） |
| 发布时间 | 首帖 2026-11-11 00:05:38（台北时间），比 Google 官宣主帖早约 14 秒；2/ 帖 00:05:56 |
| 官方挑选 | Google 官号引用 2/ 这条：https://x.com/Google/status/2120324710307131464 （2026-11-11 09:16:19 台北） |
| 提示词 | 帖内未给全文。可知任务名是 TIDEFORGE，要求「a million particles」 |
| 热度快照 | 线程首帖约 4.25 万浏览、632 赞、112 收藏；被引用的 2/ 约 7673 浏览、69 赞、5 收藏 |

- **作者原话（首帖）：** 「I had early access to Google's new Gemini 4 Carbon in Antigravity。」给了 13 个编码 brief，覆盖 3D、网站和 App。第一个例子 ORRERY：一个控件驱动齿轮和折叠花瓣，反向也能动；一次 follow-up 改进了构图。
- **作者原话（2/ TIDEFORGE）：** 要求一百万个粒子。实际跑起来是 1,048,576 个，运动由 WebGPU compute 计算；切换 flow mode 改的是同一场正在运行的模拟。网站代码全部来自 Carbon，「No follow-up prompts for this one。」
- **我的说明：** 必须标早期体验，而且是在 Antigravity 里做的。1,048,576 正好等于官方 1,048,576 token 上下文这个数字，这是作者报的粒子数，不要擅自写成「故意做成上下文窗口的纪念数字」——作者没这么说。13 个 brief 的其余条目、提示词原文，本次没有把长线程逐条打开。ORRERY 有一次 follow-up，TIDEFORGE 作者说没有追加提示。

### 8. @GlitterPixely｜用 CUDA 和 C++ 从零做 52,000 株野花和草叶，并在 C++ 里合成与阵风同步的风声（Google 官号引用）

| 项 | 内容 |
|---|---|
| 作者 | @GlitterPixely（Glitter Gal） |
| 原帖 | https://x.com/GlitterPixely/status/2120264316092022895 |
| 发布时间 | 2026-11-11 05:16:20（台北时间），官宣之后 |
| 官方挑选 | Google 官号引用：https://x.com/Google/status/2120324708826550328 （2026-11-11 09:16:18 台北），配文「We're so impressed with the creative things builders are bringing to life with Gemini 4 Carbon」 |
| 提示词 | 帖内未给 |
| 热度快照 | 原帖约 8361 浏览、77 赞、12 收藏 |

- **作者原话：** 「Touching grass with Gemini 4 Carbon」。用 CUDA 和 C++ 从零做了这片草地，没有游戏引擎，也没有 3D 库。52k 片草叶和野花；后来还在 C++ 里合成了风声，让音频跟着同一阵风走。
- **我的说明：** Google 当天社区精选线程的头条就是这条，适合讲「不是只会做网页 3D」。提示词、耗时、用的哪一个产品表面、是不是一次出稿，帖内未给。52k 是作者自报。发布时间在官宣后，作者没有写 early access。

### 9. @QQTeng｜同一道火箭场景提示词，Carbon High 花了 35 分钟；作者认为已经摸到 Opus 5.5（发布后中文对比）

| 项 | 内容 |
|---|---|
| 作者 | @QQTeng |
| 原帖 | https://x.com/QQTeng/status/2120272759465156771 |
| 发布时间 | 2026-11-11 05:49:53（台北时间），官宣之后 |
| 官方挑选 | 本次未看到官号引用 |
| 提示词 | 帖内未给原文，只说「同样的火箭场景提示词」 |
| 对比 | Fable 5.2、Opus 5.5、GPT-6 Astra；Carbon 用的是 High |
| 热度快照 | 约 4116 浏览、7 赞、1 收藏 |

- **作者原话：** Gemini 4 Carbon 效果实测出来了。同样的火箭场景提示词，对比 Fable 5.2、Opus 5.5 和 GPT-6 Astra。Gemini 4 Carbon High 最终花了 35 分钟完成生成。已经摸到 Opus 5.5 的水平了。Token 消耗和成本低得多。
- **我的说明：** 这是中文社区里写清了档位和耗时的对比，35 分钟是作者自报的生成耗时，适合作为 Jaco 自测时的时间参照（仍然只是这一次任务的数字）。提示词全文、各模型的费用、打分表、是否同一运行环境，帖内都没有。这是作者观感，不是盲测。「已经摸到 Opus 5.5」不要写成客观排名。另外，@Bhavani_00007 在更早的 01:19 发过一句几乎同构的英文表述（同一火箭场景、Carbon High 35 分钟、接近 Opus 5.5）：https://x.com/Bhavani_00007/status/2120204803771183140 （约 1.34 万浏览）。两边是不是同一条测试、是不是同一段视频，本次没有打开媒体逐帧核对，不要当成两个独立复现。写稿用 QQTeng 即可，必要时注明还有一条高度相似的更早英文帖。

### 10. @gmi_cloud｜同一句提示词做交互 3D 超跑：作者称 Carbon 比 Fable 5.2 便宜 3 倍、快 13 分钟，且仿真和镜头控制更好（发布后，公司账号）

| 项 | 内容 |
|---|---|
| 作者 | @gmi_cloud |
| 原帖 | https://x.com/gmi_cloud/status/2120306000876159185 |
| 发布时间 | 2026-11-11 08:01:58（台北时间），官宣之后 |
| 官方挑选 | 本次未看到官号引用 |
| 提示词 | 帖内未给 |
| 对比 | 和 Fable 5.2 做同一道「one prompt」交互 3D 超跑 |
| 热度快照 | 约 491 浏览、11 赞 |

- **作者原话：** Gemini 4 Carbon 在成本、速度和品质上胜过 Fable 5.2。两个模型前端视觉都强。同一句提示词做交互 3D 超跑体验。Gemini 4 Carbon 便宜 3 倍，快 13 分钟，并且在真实世界仿真、结构工程、镜头运动控制和产品插画上更好。
- **我的说明：** 这是和「推荐 Jaco 自测」最像的社区任务类型，但热度很低，而且是公司账号，写稿要标明来源，不要写成大规模测评。作者没有给出 Carbon 或 Fable 各自的绝对耗时，也没有给出美元数字，所以「3x cheaper」「13 min faster」只能按作者原话引用，不能反推出 Fable 用了多少分钟、花了多少钱。提示词全文帖内未给。

### 11. @AlicanKiraz0｜OpenCode + High Effort，规划后开发，裁判是 GPT-6 Astra Pro：Carbon 76 分 / $1.26，不是第一（发布后，反面意味也很重要）

| 项 | 内容 |
|---|---|
| 作者 | @AlicanKiraz0 |
| 原帖 | https://x.com/AlicanKiraz0/status/2120258900544860495 |
| 发布时间 | 2026-11-11 04:54:49（台北时间），官宣之后 |
| 官方挑选 | 本次未看到官号引用 |
| 提示词 | 帖内未给题目原文。可知工作流是 OpenCode，High Effort，Planning → Development，裁判模型 GPT-6 Astra Pro |
| 对比 | 作者给出的原始分数和费用：Fable 93 / $25.80；Sol 91 / $1.68；DeepSeek v4.1-1017 80 / $0.692；Carbon 76 / $1.26 |
| 热度快照 | 约 4236 浏览、43 赞 |

- **作者原话：** 在上述设定下给出这组分数和成本。按原表，Carbon 不是质量第一，也不是最便宜。
- **我的说明：** 这是发布后、条件写得比较清楚的第三方对比，而且结论并不吹 Carbon，正好用来平衡「全面领先」的写法。裁判是 GPT-6 Astra Pro，题目和评分细则主帖没有完整展开，不要写成公开标准榜。Fable 分数最高但明显更贵；Sol 分数接近 Fable、费用只有 $1.68。写「Carbon 又便宜又强」时，至少应该并列这条。

### 12. @giyu_codes｜早期体验：用已有公共数据应用做架构参考，做成 14 个带 3D 视觉的可托管工具（Google 官号引用）

| 项 | 内容 |
|---|---|
| 作者 | @giyu_codes |
| 原帖 | https://x.com/giyu_codes/status/2120201582319190381 |
| 发布时间 | 2026-11-11 01:07:03（台北时间），发在官宣之后，但作者写明是早期体验 |
| 官方挑选 | Google 官号引用：https://x.com/Google/status/2120324719086088676 （2026-11-11 09:16:21 台北），配文大意：从杂乱公共记录里找服务不足的行业，和 Carbon 一起做成 14 个带实时 3D 视觉的交互工具 |
| 提示词 | 作者写「Prompts used to build are given below」，并提醒「可能有误导，因为它用了我已有的 4 个应用做参考」。本次没有把这条长线程的每条回复都打开核对提示词全文 |
| 热度快照 | 约 7618 浏览、75 赞、40 收藏 |

- **作者原话：** 「I got early access from Google to test Gemini 4 Carbon and it surpassed all expectations。」用已有的公共数据应用做架构指导，让 Carbon 寻找有公开数据、价值高但服务不足的行业，搭建完整垂直平台。目标是测试它在杂乱多源数据对齐和 3D WebGL 物理上的上限。每个应用都成功做成了可托管应用。
- **我的说明：** 必须标早期体验。作者自己提醒：提示词看起来完整，但模型看过他已有的 4 个应用，不能当成「从零一句提示词做了 14 个产品」。14 这个数字是作者自报。Google 引用时只概括了结果，没有复述 early access 这句，写稿不要省略。

## 官方博客里还有、但没有单独挤进 12 条的第一方演示

这些来自官方 GA 博客和 Antigravity 博客，不一定每条都有独立高热度 X 帖。写「官方还做过什么」可以用，不要冒充社区实测：

| 演示 | 官方怎么写 | 出处 | 我的说明 |
|---|---|---|---|
| 埃菲尔铁塔 1887–1889 施工展 | 用历史照片和工程图，单条提示词 + `/swarm`，做成交互 Three.js 3D 展览 | Antigravity 博客；社区 @choblin29 在 00:18 转述了几乎相同的官方句子：https://x.com/choblin29/status/2120189430782734608 | 转述帖不是第一方。提示词官方页也没给出全文 |
| Platform 37 办公楼 | 从 7 份 PDF、206 张图纸做成约 90.6 万三角形的 Three.js 场景，过夜跑了 10 轮 | Antigravity 博客 | 官方自己的大规模任务，不适合当第一次自测 |
| Merchandise Store | 两条提示词重做商店，并用 Nano Banana 2.1 配图 | 官方 GA / Antigravity 博客 | 规模比 Platform 37 小，但完整提示词本次没有在官方页找到 |
| 约 1780 年 Stein-Schule 古钢琴 | 根据 CAD / X 光，在 Koerner Hall 做成可弹的古钢琴 | 官方博客 | 第一方，提示词未给 |
| Atlantis 电影感片段 | 用 Gemini Omni 视频能力 | 官方博客 | 这是视频能力演示，不要写成 Antigravity 编码 Case |
| 鸣管（songbird vocal organ）3D | @GoogleAI 官帖说，把鸟类研究做成可交互 3D 模拟，实时合成 6 个物种的叫声 | https://x.com/GoogleAI/status/2120187753329791341 | 官方宣传视频，不是社区复现 |
| MKA 基准 | DeepMind 说和 Artificial Analysis 做了 Multimodal Knowledge Agent 基准，Carbon 排第 2，平均每任务成本比第一名低 6 倍 | https://x.com/GoogleDeepMind/status/2120219377601560854 | 官方自报，本次没有打开第三方榜单逐项复核 |

## 反面声音

### A. @IndependentEco｜「Fable 5.2 destroys Gemini 4 Carbon in this test」（发布后，方法几乎没写）

- 原帖：https://x.com/IndependentEco/status/2120280287246741778
- 时间：2026-11-11 06:19:48（台北时间）
- 热度快照：约 1047 浏览、21 赞
- **作者原话：** 标题就是 Fable 5.2 在这次测试里碾压 Gemini 4 Carbon，并配了视频。
- **我的说明：** 正文没有写提示词、任务、打分规则、耗时或费用。没有把视频逐帧看完之前，不能转述「到底差在哪」，更不能把标题写成已经核实的结论。可以当作「发布当天已经有人公开唱反调」，但不要当测评结果引用。

### B. @AlicanKiraz0｜见上面第 11 条

Carbon 在该作者的 OpenCode 测试里排在 Fable、Sol、DeepSeek v4.1-1017 后面。这是条件写得最清楚的一条「不是第一」的发布后对比。

### C. @_adishj｜在 @motion_so 的视频剪辑任务里，Carbon 更贵、更慢

- 原帖：https://x.com/_adishj/status/2120289565877653568
- 相关产品帖：https://x.com/motion_so/status/2120285901435847047 （同一段创始人路演素材，同一提示词，左 Fable 5.2、右 Carbon，让读者选要发哪一条）
- 时间：_adishj 2026-11-11 06:56（台北时间）；motion_so 06:42
- 热度快照：_adishj 约 392 浏览；motion_so 约 2292 浏览
- **作者原话（_adishj）：** Fable 5.2：$60.87，1 小时 30 分；Gemini 4 Carbon：$67.53，2 小时 44 分。并写「everyone says Carbon is cheaper. not on this one。」
- **我的说明：** 这是对「Carbon 一定更便宜更快」的直接反例，但热度低，而且是单一视频剪辑任务，不能据此否定 Pawel 或 gmi_cloud 的数字。motion_so 是产品账号，写稿要标明。谁的成品更好，作者把它留给观众，我没有替他们评判。

**补充，不计入上面主反面（多为官宣前，或信息不够硬）：**

- @ridark_eth https://x.com/ridark_eth/status/2120170486353047588 （2026-11-10 23:03 台北，早于官宣约 1 小时）。同一道「恐龙障碍跑」提示词：Fable 5.2 9.6/10，45 分 12 秒；Opus 5.5 8.6/10，1 小时 12 分 30 秒；Carbon 8.3/10，1 小时 20 分 15 秒；GPT-6 Astra 7.6/10，1 小时 35 分 40 秒。必须标早期/官宣前。作者有「I know I say it every time」这类口头禅，不宜当成严谨评测机构。
- @runable_hq https://x.com/runable_hq/status/2120112986472014219 （2026-11-10 19:15 台北，早于官宣约 4 小时 50 分）。同一道 90 年代街机格斗提示词：Fable $22 / 9 分钟，Carbon $9 / 10 分钟，Opus 5.5 $34 / 21 分钟，GPT-6 Astra $50 / 16 分钟。必须标早期，且是产品账号（「Try all 4 on Runable」）。
- @leo114119 https://x.com/leo114119/status/2120090680177434973 （2026-11-10 17:46 台北，官宣前）写「Opus 5.5 <<< Carbon <<< Fable 5.2」，没有测试细节。

## Google 官号还引用了、但没进前 12 的帖

| 作者 | 链接 | 台北时间 | 热度快照 | 一句话 | 提示词 |
|---|---|---|---|---|---|
| @AI_Andrew | 原帖 https://x.com/AI_Andrew/status/2120243379388760176 ；官号引用 https://x.com/Google/status/2120324716238086357 | 2026-11-11 03:53:08 | 原帖约 525 浏览、8 赞 | 彩色玻璃 Jenga，可点击发声，也可砸碎。可玩地址 https://vitrail.andrewvoirol.com | 帖内未给 |

这条画面很好，也是 Google 点过名的，但原帖几乎没有写方法和耗时，所以没挤掉前面那些数字更清楚的对比。备选自测的玩法参考了它的任务类型，提示词是我另写的，不是作者原文。

## 官方参数、价格、可用渠道

核对时间同样是 2026-11-11 上午。找不到的会写「官方页面没找到」。

| 说法 | 官方原文要点 | 出处 | 写稿时要注意 |
|---|---|---|---|
| 正式开放时间 | @Google 主帖 `created_at` 为 2026-11-10T16:05:52.000Z，台北时间 **2026-11-11 00:05:52**。配套线程说明 Ultra 用户可在 Gemini App、Search 的 AI Mode、Antigravity、Google AI Studio 使用；开发者和企业可通过 AI Studio / Android Studio 的 Gemini API，以及 Gemini for business 使用 | https://x.com/Google/status/2120186185423159331 ；续帖 https://x.com/Google/status/2120186190905090406 ；GA 博客 https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/ | 热度快照（约 09:40）：主帖约 139.8 万浏览、8347 赞、1058 收藏。不要写成 11-10 白天对普通用户已经全面开放 |
| 两周前的 Fairwind 发布 | 2026-10-28 博客 *Introducing Gemini 4 Carbon*：当时通过 Fairwind Program 提供给网络安全团队 | https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/ | 和 11-11 正式开放是两场。那一阶段的帖子都是早期体验 |
| 模型定位 | Carbon 是目前最强的前沿模型，面向最难、长程的 agent 工作流（复杂知识工作、软件工程与 Web 开发、网络安全、科学推理）。**Gemini 4 Argon 仍然是大多数软件工程和知识工作的首选**，Carbon 用于把模型推到极限的任务 | GA 博客；@GoogleAI https://x.com/GoogleAI/status/2120187753329791341 | 不要写成「Argon 已经被 Carbon 全面替代」 |
| 上下文和输出 | 统一上下文窗口 **1,048,576** token（输入 + thinking + 输出）。默认同步最大输出 **65,536**；长解码（long decode）可以用到窗口剩余部分，理论上到约 1M。只支持隐式上下文缓存（implicit context caching） | 模型卡 https://deepmind.google/models/model-cards/gemini-4-carbon/ ；模型页 https://aistudio.google.com/docs/models/gemini-4-carbon | 1M 是「整个窗口」，不是「输入 1M 之外还能再输出 1M」 |
| 思维档位 | 模型卡写可配置 thinking levels。Antigravity 文档明确是 `Low` / `Medium` / `High`，用来在快速修改和更深的多步推理之间取舍。Cursor 官方 CursorBench 页把 Carbon 按 High / Medium / Low effort 上榜 | 模型卡；https://antigravity.google/docs/models/ ；https://cursor.com/cursorbench | 开发者模型页确认 Thinking Supported。本次没有在 Carbon 专用 API 页上抓到一张和 Argon 文档完全对等的「默认 Medium」表，不要擅自把 Argon 的默认档位写成 Carbon 的官方默认 |
| 计费和思考 token | 思考 token 按输出计费。不在免费 API 档。Introductory 价与 Argon 相同：每百万 token **输入 $2、输出 $10，至 2026-11-30**；**2026-12-01 起输入 $4、输出 $20**。缓存读写 introductory $0.10，之后 $0.20。Batch / Flex 半价；Priority 约 1.8 倍 | https://aistudio.google.com/docs/pricing ；GA / 开发者博客 | 定价页脚注写 introductory 价适用于面向公开访问的 Carbon。不要把 $2/$10 写成长期官价 |
| Cloud / Vertex | 全球端点与上面同一档 introductory / 正式价。非全球区域略高，官方例是大约 $2.2 / $11（introductory） | https://cloud.google.com/model-garden/pricing | 写「API 两美元」时最好标明是全球端、百万输入 token、introductory 期 |
| Gemini App / AI Mode / AI Studio 消费端 | 官方一致口径：**Google AI Ultra 订阅用户** 可在 Gemini App、Search 的 AI Mode、AI Studio 使用 Carbon | GA 博客；@Google 续帖；@GoogleAI；@GoogleDeepMind | **官方公开页没有写 Pro 用户能在 Gemini App 或 AI Mode 里用 Carbon。** 不要写成「付费用户都能用」 |
| Antigravity 能否用 Carbon | 能。官方模型表：Carbon 仅 **Google AI Ultra ✅、Enterprise ✅**；Free、Plus、Pro 均为 ❌。@antigravity 官帖：今天在桌面 App、CLI 和 IDE 扩展里向 Ultra 订阅者和 Gemini for business 开放，「We are working on expanding access to more paid users soon.」 | https://antigravity.google/docs/models/ ；https://antigravity.google/blog/gemini-4-carbon-in-google-antigravity/ ；https://x.com/antigravity/status/2120188336056733746 | Jaco 若要在 Antigravity 里亲自跑 Carbon，需要 Ultra（或企业）。只有 Pro 的话，官方表不允许选 Carbon |
| `/swarm` 是什么、要什么账号 | 预览斜杠命令，在 Antigravity 桌面 App 和 CLI 里可用。一个提示词变成协调器 + 在隔离 worktree 里并行的 worker + 验证者，在共享看板里协作；空闲成员不消耗 token。文档写明：**Google AI Pro 和 Google AI Ultra** 都可用 `/swarm` 命令 | https://antigravity.google/docs/swarm ；https://x.com/antigravity/status/2120279327589773639 （2026-11-11 06:15:59 台北，约 6.31 万浏览、1440 赞、522 收藏） | 命令可用 ≠ 该成员能选 Carbon。Pro 用户可以开 `/swarm`，但按模型表不能把角色设成 Carbon |
| `/swarm` 吃不吃额度 | **吃，而且比普通对话快得多。** 官方文档：每个 worker 都是独立 agent，swarm 消耗额度比单次对话快得多。官方博客也写：即便空闲等待是零 token、模型可以动态热替换，并行多智能体仍比标准聊天耗额度快得多。某个成员碰到额度上限会暂停，额度刷新后**不会自动重启** | https://antigravity.google/docs/swarm ；Antigravity 博客 | 不要写成「/swarm 不占额度」。也不要写成「官方公布了 /swarm 一次具体扣多少」——没有这个数字 |
| Antigravity 额度怎么刷新 | 计划页：Ultra 额度最高，每 5 小时刷新，且有最高的每周额度；Pro 额度高，每 5 小时刷新，直到碰到每周上限；其他计划按周。Pro / Ultra 可以用 AI credits 支付超出部分。页面**没有**写出「每 5 小时具体多少次 / 多少 token」 | https://antigravity.google/docs/plans | 不要编造具体条数。自测前后只能以 Jaco 自己设置页上看到的剩余百分比为准 |
| 科学家免费档 | 科学家和研究者可以申请，有机会通过 Antigravity 获得 6 个月免费的最高档 | GA 博客；@GoogleAI 官帖 | 这是申请制，不是默认人人有 |
| 付费 Gemini API | 付费开发者可在 Google AI Studio 和 Android Studio 用 Gemini API 调用 `gemini-4-carbon`。不在免费 API 档 | 模型页；定价页；@GoogleAIStudio https://x.com/GoogleAIStudio/status/2120187576489222302 | 「付费 API」≠ Gemini App 的 Ultra 订阅，是两条产品线 |
| Cursor | Cursor 官方已加入 Carbon。Cursor 官帖和 CursorBench 4.0 页：Carbon **High 60.4%，每任务 $9.22，目前榜上第一** | https://x.com/cursor_ai/status/2120193584670580857 （2026-11-11 00:35:16 台北，约 36.00 万浏览、3969 赞、317 收藏）；https://cursor.com/cursorbench | 60.4% 已核实，可以写。这是 Cursor 自己的榜和费用，不是 Google 模型卡上的同一张表 |
| GitHub Copilot | 官方 changelog（2026-11-10）：Gemini 4 Carbon 进入 GitHub Copilot，面向 **Pro+、Max、Business、Enterprise**，逐步放开；管理员可通过 model policy 控制 | https://github.blog/changelog/2026-11-10-gemini-4-carbon-in-github-copilot/ | 官方没有把普通 Copilot Pro 写进去。不要写成「所有 Copilot 用户都能用」 |
| 官方基准（模型卡 / 博客） | 模型卡举例：AA Index v5.0 **59**；AutomationBench **53.9%**；Terminal-Bench 4.0 **65.2%**；SEC-bench Pro **88.2%**；ExploitGym **54.8%**；CWE-bench **71.0%**；GraphWalks **96.2%**。GA 博客还称在 CursorBench 4.0、Perplexity WANDR、Zapier AutomationBench 上为第一，且每任务成本不到次优外部模型的一半 | 模型卡；GA 博客 | 网安三项（SEC-bench / ExploitGym / CWE-bench）要注明 Fairwind。CursorBench 第一已有 Cursor 官方页独立印证；WANDR 和 AutomationBench「成本低一倍以上」本次没有找到第三方原榜逐项复核，写的时候标「官方自称」 |
| 知识截止 | 模型卡写 knowledge cutoff 为 **2026 年 3 月** | 模型卡 | 可写 |

**官方页面没找到的：**

- 没有找到官方写出的 Antigravity「每 5 小时具体请求数 / token 数」，也没有 `/swarm` 的固定扣点表。
- 没有找到官方说 Gemini App 或 Antigravity 的 **Pro** 用户可以使用 Carbon。
- 没有找到 Carbon 专用 API 页上、与 Argon 完全对等的「默认 thinking level = Medium」表。
- 没有找到官方对 Fable 5.2 / Opus 5.5 / GPT-6 Astra 的官方对打评测表（Pawel、Alican、QQTeng 都是第三方）。
- 没有找到 Pelican Quest、纺织可视化、超跑这类官方或社区 Case 的完整提示词原文。

## 推荐 Jaco 在 Antigravity 里亲自跑的 1 个 Case

**先确认账号：** 按官方模型表，Antigravity 里选 Gemini 4 Carbon 需要 **Google AI Ultra**（或企业）。如果当前是 Pro，官方不允许选 Carbon；Pro 虽然能用 `/swarm` 命令，但不能把模型设成 Carbon。跑之前在模型选择器里确认看到的是 `Gemini 4 Carbon`，思维档位选 `High`，并先截一张额度（Weekly / Five Hour Remaining）。

这次不建议一上来就复刻官方 Pelican Quest 或 Platform 37：官方自己说 `/swarm` 吃额度比普通对话快得多，Platform 37 还是过夜 10 轮，一次不一定能跑完，也不一定剩得下额度。

### 首选：单智能体 Carbon High，做一页可交互的 3D 超跑展示（不要开 `/swarm`）

**为什么选这条：**

- 和社区第 10 条 @gmi_cloud 的任务类型最接近（同一句提示词、交互 3D 超跑、能对照「速度 / 画面 / 镜头」），也接近第 9 条火箭场景这种「前端 3D、能录屏」的传播形态。
- 画面好截、好放进口播：绕车、换色、开门、爆炸视图，任何一段都能定格。
- 只开单智能体、单次对话，官方没有把这种路径写成「会成倍吃额度」。社区可参照的耗时是 @QQTeng 的 Carbon High 火箭场景 **35 分钟**（估计同一量级是 25–40 分钟；gmi_cloud 只说比 Fable 快 13 分钟，没有给出 Carbon 的绝对耗时，所以不能反推）。
- 社区原帖都没有给出完整提示词，所以下面这条是我写的，不是 @gmi_cloud 原文。不要在稿子里写成「我用了他们的原提示词」。

**预计耗时（估计）：** 25–40 分钟。依据是 @QQTeng 自报 Carbon High 火箭场景 35 分钟；若第一次没能直接在预览里玩起来，再加 1–2 轮修补，可能到 45 分钟左右。这是估计，不是保证。

**操作：** 打开 Antigravity 桌面 App，新建空项目，模型选 Gemini 4 Carbon，思维档位 High，**不要**输入 `/swarm`，把下面整段粘贴成第一条消息，等它给出可预览的第一版，再决定要不要补。

**可直接复制的完整提示词（我写的，不是社区原文）：**

```
You are working in a new empty project. Use Gemini 4 Carbon at High thinking. Do this as a single agent in this conversation — do not start a /swarm.

Build a complete, playable, single-page interactive 3D product experience in the browser (HTML + JavaScript, Three.js or equivalent, no backend, no login).

Subject: a futuristic mid-engine supercar on a dark, polished showroom floor at night. The car must look physically coherent: correct wheel alignment, believable body proportions, reflections on paint and floor, working headlights and taillights, and a cabin you can see into.

Requirements:
1. One self-contained web app I can open in the preview/browser and immediately interact with.
2. Camera: orbit, pan, zoom; a "hero orbit" auto-rotate that I can pause; an interior cabin camera; a low "product film" camera that slowly dollies around the car.
3. Lighting: studio key + rim, plus a day/night toggle. Night mode should show a city-skyline HDRI-like backdrop and working lights on the car.
4. Materials: clearcoat metallic paint, carbon-fiber accents, glass, rubber tires with readable tread, brushed metal rims. Add a paint color picker with at least 5 colors.
5. Interaction: click or hover hotspots for the engine, cabin, wheels, and rear wing, each opening a short callout with a plausible engineering note. A "doors open/close" animation. An "explode / assemble" toggle that separates major assemblies (body, chassis, powertrain, wheels) then puts them back.
6. Performance: target a smooth 60 FPS on a modern laptop at 1920×1080 with shadows and reflections still on. If you need to lower quality, do it with a Quality toggle, not by default.
7. UI: a clean minimal overlay (title, color, camera presets, day/night, explode, quality). No lorem ipsum. No placeholder "TODO".
8. Deliver: the running preview, a short README of what you built and known limitations, and do not ask me follow-up questions before producing a first playable version.

Success looks like: I can open it, orbit the car, change color, open the doors, explode the assemblies, and take a screenshot that would hold up next to a product-illustration video.
```

### 备选：小规模 `/swarm`，做可玩的彩色玻璃 Jenga（只有额度仍宽裕、并且想专门体验 /swarm 时再跑）

**为什么作为备选，不作为首选：**

- 当天最大的产品新闻之一就是 `/swarm`，备选能让稿子里有一句「我自己点过这个命令」。任务类型靠近 Google 官号引用过的 @AI_Andrew 彩色玻璃 Jenga，画面同样有传播力。
- 但官方明确警告 swarm 吃额度很快；成员碰到上限会暂停且不会在刷新后自动重启。所以这是备选：首选跑完、五小时额度和每周额度看起来都还够，再考虑。
- 官方 Platform 37（过夜 10 轮）和 Pelican（Blender + 多子代理）都太大。下面把规模限制成「1 个协调器 + 最多 2 个 builder + 1 个 verifier，不用 Blender」。
- 社区没有这条任务的完整提示词，下面也是我写的，只是玩法参考了 @AI_Andrew 被官号引用的主题，不是他的原文。

**预计耗时（估计）：** 30–60 分钟。官方和社区都没有给出「这种小规模 /swarm」的实测耗时，这个区间是按前端 3D 任务的社区量级估的，比首选更不确定。如果 20 分钟里额度已经掉得很快，就停，不要再加成员、不要加范围。

**可直接复制的完整提示词（我写的，不是社区原文）：**

```
/swarm

Goal: in this empty project, build a small but complete playable browser toy: a short stained-glass Jenga-like tower on a wooden table, in a single-page WebGPU or Three.js app, no backend.

Team and constraints:
- Keep the swarm small: one coordinator, at most two builder workers, and one verifier. Do not add more members. Do not use Blender. Do not generate a large asset pipeline.
- Coordinator plans the file layout and acceptance checks, then stops adding scope.
- Builders implement the page, physics, materials, and audio.
- Verifier opens or statically reviews the app and files a short list of bugs; builders fix the top issues once, then stop.

Product requirements:
1. A tower of 54 (or fewer if needed for performance) rectangular blocks that look like stained glass: colored, slightly translucent, catching a warm window light.
2. I can click a block to "tap" it; it should ring with a short glass tone whose pitch depends on the block color or size.
3. I can pull a block out; the tower should wobble and can collapse. When blocks hit the table or each other they can crack or shatter into a few shards (need not be a full fracture sim).
4. A sandbox / smash button that knocks the tower over.
5. Target smooth interaction on a modern laptop. Include a quality toggle.
6. Ship a playable preview and a short README. Do not expand into a second game or a marketing site.

Stop when the verifier has signed off on a playable first version, or after one fix pass, whichever comes first.
```

### 自测时要记录的数字

- 开始和结束的台北时间，从而得到墙上时钟耗时
- 模型名、思维档位（首选应为 Gemini 4 Carbon / High）
- 有没有使用 `/swarm`；如果用了，看板上实际出现了几个成员、各自是什么模型
- 轮数（第一条提示词之后又补了几轮）
- 是不是一次就把可玩预览跑起来（一次成功 / 否，以及失败卡在哪）
- 跑前、跑后的 Weekly Limit Remaining 和 Five Hour Limit Remaining（设置页或模型选择器附近的百分比）；如果界面能看到 token 或 AI credits，一并记下
- 预览里是否真的能交互；自己感觉的流畅度（不要只看模型自报 60 FPS）
- 若和社区对照：开门、换色、爆炸视图、镜头预设有没有做齐；有没有明显的结构错误（轮子悬空、车身比例崩、点了没反应）

### 建议截的图（按顺序）

1. 模型选择器：能读出 Gemini 4 Carbon 和 High
2. 跑之前的额度（Weekly / Five Hour）
3. 粘贴进去的完整提示词（或对话顶部的第一条用户消息）
4. 生成过程中的中间态（工具调用、写文件、预览编译）
5. 如果是备选：`/swarm` 看板，能数出成员和角色
6. 成品预览全景（超跑或 Jenga）
7. 2–3 个关键交互定格：换色后的车、开门或爆炸视图、夜间灯光；或者敲击玻璃块、倒塌/破碎
8. 跑之后的额度，最好和第 2 张能并排对比
9. 若界面可见：token / credits / 报错原句
10. 必要时再截 README 或文件树，证明这是这一次跑出来的项目

## 没核实、写稿时不要写成事实的地方

1. @JamesDa55049936 的中文数字不要当一手来源；原测试是 @PawelHuryn。Pawel 的仓库、判分脚本是否公开可复现，主帖没有全部展开。
2. @QQTeng 的 35 分钟、@gmi_cloud 的「便宜 3 倍、快 13 分钟」，都是作者自报；后一条没有绝对耗时和美元原值，不能反推 Fable 用了多久、花了多少钱。QQTeng 和 @Bhavani_00007 的表述高度相似，不能自动当成两次独立复现。
3. @IndependentEco 只在标题里写 Fable 碾压 Carbon，方法和提示词正文没有，视频未逐帧核实，不能当测评结论。
4. 网安基准（包括 SEC-bench Pro 88.2%）是 Fairwind 访问条件下的模型卡数字，不能直接写成「现在普通 Ultra / API 用户测出来也是这个分」。
5. GA 博客说在 Perplexity WANDR 和 Zapier AutomationBench 上第一、且每任务成本不到次优外部模型的一半——这是官方自称，本次没有打开这些榜的原始页逐项复核。CursorBench 60.4% 不在此列，已经有 Cursor 官方页和官帖。
6. Antigravity 每 5 小时 / 每周的具体额度数字，官方计划页没写。`/swarm` 也没有官方「一次扣多少」的表。
7. 官方没有写 Pro 用户可以在 Gemini App、AI Mode 或 Antigravity 里使用 Carbon。社区若有「我 Pro 也能选」的说法，本次没有核到官方依据，不要写进稿。
8. 社区 3D Case（超跑、火箭、光学实验室、草地、粒子、14 个工具）几乎都没有在主帖给出完整提示词；giyu_codes 说提示词在下面，本次没有逐条打开长线程核对，不能编造或「还原」他们的提示词。
9. Demis 的「in one shot」、官方 Pelican 的 60 FPS、各作者自报的零件数 / 粒子数 / 14 个应用，都没有在本稿里做独立复现。
10. 官宣前的对比（@ridark_eth、@runable_hq、@leo114119 以及更早的泄露/提前调用帖，例如有人说 Vertex 上提前能调通）只能标早期或未正式开放，不能当成发布后的普遍体验。
11. @_adishj 的 $67.53 / 2 小时 44 分只是这一条视频剪辑任务，不能写成「Carbon 其实更贵」。
12. Logan 的回复（「team is still cooking」「won’t break the bank」「Carbon and Argon are expensive」）是个人表态，不是定价页，不要当成官方价格解释。

## 建议的引用角度（推断，不是官方说法）

比较稳的写法是：

- 先把正式开放时间、Ultra 才能在 Antigravity / Gemini App / AI Mode 用 Carbon、`/swarm` 在 Pro 和 Ultra 都能开但更吃额度、introductory 价 $2/$10 用到 11-30、12-01 起 $4/$20 讲清楚，并注明网安跑分来自 Fairwind。
- 正面第一方优先用第 1–4 条：Demis 的 Theme Park 一次逆向移植、Sundar 的 Pelican Quest（带可玩链接）、Signal 的 600 万行 Lean、110 根纤维可视化。
- 第三方数字优先用第 5 条 Pawel（分数接近 Fable、费用低得多）和第 11 条 Alican（Carbon 不是第一）。不要只用吹的、不写反面。
- 中文读者好懂的画面，用第 9 条 QQTeng（记住提示词没公开）和第 6、7、8 条这些被 Google 点名的 3D Case。
- Jaco 自己跑首选那条 3D 超跑，稿子里明确：提示词是为这篇自测写的，不是 gmi_cloud 原文；把耗时、轮数、是否一次成功、额度前后变化和截图放进去，就可以和社区说法对照，而不用复述官方那些过夜大项目。
