# 第四章上下文洞察镜头库

《DeepSeek Harness 四个插件》第四章分层版已认可。下面两个组件随像素素材安装脚本进入新项目的 `remotion/src/`。本期操作截图和帧号可在[第四章实际用法](../../../../docs/src/ai/script/deepseek-harness-four-plugins/remotion/src/Chapter4.tsx)中对照。

| 分类 | 适用镜头 | 代码与认可画面 |
| --- | --- | --- |
| 镜头调度 · 入口清单随口播定位 | 功能分散在侧栏、会话标签和输入框。固定工作台，清单点亮当前项，同时从原位置放大对应控件。 | [NarratedRouteList](../assets/NarratedRouteList.tsx) · [四个入口连续成帧](approved-harness-ch4/narrated-routes.webp) |
| 数据版式 · 原始记录与占比同屏 | 讲某次请求或某条记录里的一项占比。原始行、分子、分母、单位和统计范围同屏，横条与百分比一起显现。 | [EvidenceSharePanel](../assets/EvidenceSharePanel.tsx) · [原始读数与算式](approved-harness-ch4/evidence-share.webp) |

## 工作台里连续指认几个入口

用 [WorkspaceOverview](../assets/WorkspaceOverview.tsx) 显示完整工作台，在相同源坐标内放置清单和 [NativeDetailLens](../assets/NativeDetailLens.tsx)。传入有序的 `routes`，每项用 `place` 写位置、`name` 写读给观众的名字。初次显示用 `active=-1`，随后用同一帧号驱动清单的索引和控件放大。清单的 `left`、`top` 可随新界面挪动。

本期在 F468、F522、F585、F682 依次点亮跨会话总览、Context、Fleet 和 /context。最后一个入口的取景矩形为 [451, 440, 804, 186]，涵盖候选项、已输入命令、发送按钮。换素材时重新量整个控件，按 390 px 宽复查清单与输入框之间的空隙。

## 让观众看清占比的分母

在 1440 × 650 的工作台源坐标里放 `EvidenceSharePanel`，将原始记录行截图作为子元素传入。用 `record` 标明记录，`basis` 写统计范围。原始数值传给 `part` 和 `total`，仅在显示时使用 `formatValue` 缩短数字。百分比和横条都从原始数值计算，`progress` 控制它们出现的进度。

本期取「第 1 轮 · 第 1 步」的工具定义行。213 项工具共 117,788 tokens，这一步的估算输入是 127,778 tokens。画面显示 117.8k ÷ 127.8k 和四舍五入的 92%。用量总览里的 3.7M 属于整段会话，换案例时同样要先核对分母的范围。[本期原始数值](../../../../docs/src/ai/script/deepseek-harness-four-plugins/assets/references/ch4-case.json)
