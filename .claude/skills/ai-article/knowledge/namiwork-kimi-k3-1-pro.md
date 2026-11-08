# 纳米Work + Kimi K3.1 Pro 调研缓存

- 调研日期：2026-11-04
- 仓库路径：`/Users/itwanger/Documents/GitHub/agent-llm-case`、`/Users/itwanger/Documents/GitHub/toBeBetterJavaer/docs/src/ai/script/one-minute/archimedes-principle/namiwork/memphis`、`/Users/itwanger/.namiwork`
- Commit：`agent-llm-case` 本地工作区（2026-11-04 实测版本）

## 1. 纳米Work 与 Kimi K3.1 Pro 核心定位

- 下载地址：`https://work.n.cn/`，支持 Windows 与 macOS，提供亮白与暗黑两套主题。
- 模型与成本优势：内置 `moonshotai/kimi-k3.1-pro`（Kimi K3.1 Pro），在纳米Work 中使用可享七折优惠。K3.1 Pro 在后训练阶段引入了 Large-scale Joint RL（大规模联合强化学习），重构了强化学习训练框架、长上下文推理、沙箱基础设施和采样调度机制，支持在数百个下游领域联合训练。
- 内置 Harness 与官方 Skill 生态：
  - 底层采用 `nami-harness` 运行时，通过 `.namiwork-projections.json` 将官方 Skill 同步投射到 `claude` 与 `codex` 双引擎目录。
  - 视频与多模态相关核心插件/Skill：`pvideo-canvas-image`（图片画布，底层调用 Seedream 5.0 Pro `doubao-seedream-5-0-pro`）、`nami-mcp-jimeng`（纳米即梦 AI 视频生成，对接 Seedance 2.0 / 2.5 / 1.5 Pro）、`nami-mcp-minimax-video`（海螺 H3 视频生成）、`namiwork-editable-video`（超级视频编辑器）。

## 2. 实测 Case 1：Vibe 知识大赏之阿基米德原理

- 工程路径：`/Users/itwanger/Documents/GitHub/toBeBetterJavaer/docs/src/ai/script/one-minute/archimedes-principle/namiwork/memphis/`
- 制作流程：
  1. 确认加载本地一分钟视频 Skill（`ergo-remotion-video`）。
  2. 输入提示词 `今天我们的主题是阿基米德原理，先出稿吧` 生成口播稿，针对“同体积水团等效替换金属块”的物理表述进行人工润色校对，定稿保存为 `spoken.txt`。
  3. 调用火山 TTS 合成配音（`build/voiceover.wav`，时长约 92 秒）。
  4. 规划 `OUTLINE.md` 分镜，全片拆分为 4 章（每章约 25~30 秒）：第 1 章讲入水示数变小与 `F浮 = G排` 公式；第 2 章用 2 升金属块全浸（浮力 20 牛顿）与半浸（浮力 10 牛顿）做数值计算；第 3 章演示上下表面水压差与假想水团等效替换；第 4 章总结适用范围并对比漂浮、悬浮、下沉三种状态。
  5. 采用孟菲斯（Memphis）视觉风格生成各章画面（米白背景、靛色粗描边、高饱和粉彩块面与错位阴影，弹簧测力计指针与浸入体积动态联动），在本地端口预览并导出成片。

## 3. 实测 Case 2：三个年代时尚行走换衣视频

- 工程路径：`/Users/itwanger/Documents/GitHub/agent-llm-case/nami-fashion-three-eras`
- 协同链路：Kimi K3.1 Pro 负责任务拆解与脚本调度，先调用图片画布生成统一人物参考图与 1900、1950、2025 三张 9:16 关键帧，再通过内置的 Seedance 2.0 与 Seedance 2.5 模型分别生成 15 秒一镜到底的街头行走换衣视频，最后叠加白色年份字幕并导出 1080×1920 MP4 成片。
- 对比结论：Seedance 2.0 与 Seedance 2.5 成片质感都很接近实拍电影，其中 Seedance 2.0 在迈步换衣的动作衔接上更平顺，Seedance 2.5 在画面细节与光影质感上也有亮眼表现。

## 4. 实测 Case 3：纸上物理（GCSE 电学互动 3D 书）

- 工程路径：`/Users/itwanger/Documents/GitHub/agent-llm-case/nami-physics-pop-up-book`（纳米Work 首版）与 `nami-physics-pop-up-book-codex`（Codex 接手版）
- 实现亮点：基于 Vite + Three.js 纯代码程序化构建三维木纹书桌、带厚度与书脊的奶油色立体书。左页展示课程说明、公式与可掀开的答案翻盖；右页构建黑色细线排线风格的英式三孔插座与剖开插头（内部可见棕色火线、蓝色零线、黄绿地线与串联保险丝）。支持鼠标拖拽旋转视角、点击插拔插头闭合电路点亮桌面的绿色银行家台灯，并展示了交流电往复运动与翻页切换到《功率与电费》课程的完整交互。

## 5. 实测 Case 4：城市剖面（街道之下《Beneath the Street》）

- 工程路径：`/Users/itwanger/Documents/GitHub/agent-llm-case/namiwork/street-layers`
- 实现亮点：不使用外部框架或图片素材，纯靠 HTML、CSS、原生 JavaScript 和动态内联 SVG 实现米白纸张与深墨色手绘线稿质感的等距城市剖面网页。完整呈现从地面到地下的五层切片：`01 街道层（0—1.5 m）`、`02 市政管线（1—3 m）`、`03 砖砌排水道（4—9 m）`、`04 地铁隧道（12—28 m）`、`05 自然地层（30 m+）`。支持一键平滑展开/合拢五层切片、点击左侧目录或画布标签高亮单层、点击街面 5 个动态热点查看观察卡片、暂停/恢复地面行人与地下地铁动画，以及展开右上角的实时状态机面板。

## 6. 甲方传播 Brief 必提要点（飞书文档 `T1F4dcXolob4iHx9kvpcauLunNh`）

- **产品名称与主推功能**：纳米Work（主推“超级视频编辑器”）。
- **品牌定位必提句**：360 出品的安全可靠 AI 办公平台，目前已上线 Windows、Mac、手机端（`work.n.cn`）。
- **核心表达主线**：告别抽卡，全流程可编辑。用语言驱动代码组织画面，输入一个主题、一份资料或商品链接，AI 自动完成调研、编写脚本、生成画面、配音、字幕与后期包装；生成后文字、数字和动画元素仍可通过文字定点修改，支持导出剪映工程文件及混入自有拍摄素材。
- **成本与效率数据**：将传统数万元预算、数天至数周周期的宣传片或 MG 科普动画，降至约 20—30 分钟出片（30 秒短片）、模型成本约 10—50 元，推动视频制作进入“两位数/双位数时代”，花小钱做大片。
- **Kimi K3.1 Pro 必带话术**：在 3D、金融研究、编程代码上表现出色，支持 100 万上下文，纳米Work 已接入支持、不用排队，且持续给到全网最低的七折优惠。
- **必带话题**：`#纳米Work #安全可靠AI办公平台 #超级视频编辑器`
