# DSH Go 第二章：本机、模型与远程协作

2026-11-13 用户认可整体视觉，并授权补转场/音效与沉淀。这里保留认可构图和本轮声音补充，声音补充不冒充用户逐项试听结论。[源码与画面清单](../assets/dsh-go-approved/ch2/manifest.json)。

## 按需要挑组件

| 需要表达 | 取用入口 | 复用重点 |
| --- | --- | --- |
| App 启动、权限受阻、依赖 | [Chapter2](../assets/dsh-go-approved/ch2/source/Chapter2.tsx) 的 Launch / Engine | 全画幅设备先执行操作，再显示限制；品牌只放一处。口播到 Node.js/Linux 时，在原位置放大完整图标与名称并圈出，不依靠小日志。去掉与内容无关的星期、时钟。 |
| 组件依次进入运行环境 | 同文件 Install | 第一个对象用足画面，后续对象到来才缩小重排；最后才装入环境。 |
| 系统调用与路径映射 | 同文件 Compatible | 保持 App 身份，沿打开同一个文件的操作看到映射后的目录与表格；不用硬件芯片代替用户态软件机制。 |
| 手机与云端模型收发 | [RuntimeNetwork](../assets/dsh-go-approved/ch2/source/RuntimeNetwork.tsx) 的 LocalAndModel | 客户端与模型为独立、视觉等重的主体；当前 App 先占画面，模型出现时连续让位。短名与像素形象成组，发送/返回各有路线，包抵达后再变接收状态。 |
| 手机、通道、电脑三方关系 | 同文件 REMOTE / ConnectionStage / RemoteHarness | 竖屏手机、清晰通道和桌面共同分配画布；电脑内部重排以便阅读，而非把完整1240宽UI一味缩小。直连失败才引入中继机架，加密包经过服务器。 |
| 长记录压成摘要后接续 | [RuntimeSummary](../assets/dsh-go-approved/ch2/source/RuntimeSummary.tsx) | 电脑原始记录先放大；从工具参数/长输出提取具体事实，摘要出现时原记录让位；原件保留，只传副本到手机，结果落地后再更新同步状态。 |
| 实心字与像素形象共存 | [Typography](../assets/dsh-go-approved/ch2/source/Typography.ts) | UI/正文用无衬线实心字体，像素化仅用于图形素材。排查过小等宽字、整体缩放和继承行距；用真实内容检查结果卡、输入框及底部状态不相压。 |

[依赖聚焦](../assets/dsh-go-approved/ch2/previews/deps-115.png) · [手机/模型等重](../assets/dsh-go-approved/ch2/previews/model-peer-1548.png) · [中继三方布局](../assets/dsh-go-approved/ch2/previews/relay-1965.png) · [摘要提取结果](../assets/dsh-go-approved/ch2/previews/summary-ready-2175.png) · [同步手机](../assets/dsh-go-approved/ch2/previews/summary-phone-2255.png)

## 转场和声音按动作使用

- 工作区切到文件、文件切到设置：[PixelPageWipe](../assets/dsh-go-approved/ch2/source/PixelPageWipe.tsx) 仅遮主体区，16帧短扫，切点配 soft_whoosh。进入独立场景/跑道仍用 WorldWipe；HUD 与字幕保持。
- 原位聚焦依赖、引入模型、放大历史记录：focus_air；点击启动、开关、连接加密：soft_click；组件进入：soft_pop。
- 请求发出：data_pluck；结果抵达：soft_pop。不要对每个循环传输包重复发声。
- 受阻：短 error；回退成功、环境装好、摘要生成及接收：success_pair。提示音表达状态差异，不把失败配成庆祝。
- 摘要三个事实进入：低音量 soft_click；摘要跨端传递：soft_whoosh；抵达再给一次 success_pair。

本期共35个第二章声音事件，常规峰值约 −28 至 −32 dBFS，三条摘要微反馈为 −35 dBFS；混音峰值约 −1.28 dBFS。数值是本片旁白下的参考，不是所有视频的固定增益。事件维护 [pixel-actions.json](../assets/dsh-go-approved/ch2/references/pixel-actions.json)，由共享 pixel_events.py 生成声音表，mix_effects.py 混音；不改旁白样本，不另建重复时间轴。新增动作或重配后重新定位与混音。

## 如何接到下一期

源码快照用于选镜和接线参考，并非独立安装包。PixelPageWipe 只依赖 React 和公共 PixelWorld 色板，可直接复制；Typography 可直接复制。其它文件依赖本期 timing、混音记录、共享 PixelWorld/FlagCourse，以及 GoTask、设备与品牌组件。根据新稿移植所需函数，接到新项目的实配锚点，不能复制本期 frame、花销数据和 DSH 特有行为。PixelWorld、人物和旗杆从原公共包安装；像素鲸鱼继续引用 CoT 包，不重复生图。

设备UI是依据来源的编辑重建，不是真机实测。中继路由、PRoot、重连后精简历史的事实只适用于已核实的 DSH Go 版本，换产品须重新查证。字体名称为本机可用字体栈，跨机器应保证字体可用。认可画面的尺寸是案例比例，不强制新项目三方同宽，也不让未来通道提前占位。
