# CoT 第三章：精简桌面中的思考与回答（2026-11-12已认可）

用户认可“精简模拟DeepSeek Harness桌面版”后授权进入第四章。此方案适合需要让观众辨认软件关键组件、生成状态和折叠层次的知识讲解，不要求新题材照搬DSH。

产品定位：DSH是Agent工作环境，本章只聚焦其思考/回答呈现。按2026-11-12用户全局纠正，模拟标题栏仅保留鲸鱼与DSH，不附加“对话”；后续按任务展示工具、记忆、压缩与成果交付等能力。

核心方案：保留可辨认的应用标题栏、提问、思考区、回答区与简化输入栏；省去细小侧栏和工具。必要对象名称、状态、实际内容和协议字段保留，删除口播已经说明的长段解释。思考和答案用不同颜色及短标题区分，内容逐字生成，新增区块到来时现有对象先让位。三层折叠依次点击，思考容器长高、独立回答向下移动。

本期参数：1920×1080；外窗x24/y94/1866×834；标题52px，正文50–54px，次级46–48px，680字重。以上是本项目认可比例，新项目仍按实际主体调整。对话示意文案不冒充新增实测；原插画完整保留，由相机取景，不拆件重画。

认可源码快照：[桌面组件](cot-ch3-approved/Chapter3Harness.tsx)、[章节与音轨](cot-ch3-approved/Chapter3.tsx)、[原图组件](cot-ch3-approved/Chapter3Mechanism.tsx)、[真实配音时点](cot-ch3-approved/ch3-phrase-timing.json)。原图组件快照仅保留认可版本调用的ArticleLayers，不收录未使用的旧方案。依赖项目的PixelWorld、Chapter2Design、PixelSymbols、DeepSeekIdentity与FlagCourse；复用时以当前项目共享组件为准。

当前源码已按用户纠正去掉标题栏“对话”；下面认可视频保留原审批时画面，本次小改未重渲染。

认可视频：`docs/src/ai/script/what-is-cot/preview/ch3-harness/chapter3-desktop.mp4`；认可清单：该项目`preview/approved-ch3/manifest.json`。交互重排需看连续过程，局部文字修改不重复全章审片。
