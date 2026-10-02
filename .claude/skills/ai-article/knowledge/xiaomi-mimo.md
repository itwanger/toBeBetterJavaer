# 小米 MiMo 调研缓存

调研日期：2026-09-30。来源均为一手或主流媒体，引用前以原链接为准。

## 罗福莉晋升

- 唯一信源：《晚点 LatePost》2026-09-28 X 帖 https://x.com/latepostnews/status/2104559846469362149 。小米 9-22 对内发布晋升名单，31 岁罗福莉升 22 级，另有若干业务负责人晋升；“22 级已是最高级别”出自匿名接近小米人士。IT之家转载 https://www.ithome.com/1/008/056.htm ；TechNode https://technode.com/2026/09/29/xiaomi-promotes-mimo-team-lead-luo-fuli-to-its-top-job-level/
- 小米官方、雷军未公开表态；同批名单未公开
- 职级体系唯一出处：界面转述《财经》2019-02-17 https://www.jiemian.com/article/2870595.html ，13~22 级，22 级对应副总裁
- 2026-07 小爱架构调整：基础模型归 MiMo 团队，云端工程化栾剑，端侧归各业务 OS 团队（晚点）

## 罗福莉简历

- 1995 年生，四川宜宾；北师大本科（调剂电子转计算机）；北大计算语言学研究所硕士；ACL 2019 8 篇、2 篇一作（澎湃/量子位 https://www.thepaper.cn/newsDetail_forward_13290186 ）
- 2020 阿里达摩院，VECO（ACL 2021）、AliceMind；2022 幻方量化→DeepSeek，参与 DeepSeek-V2
- 千万年薪：仅第一财经 2024-12-20 援引知情人士“或在千万元级别”，未证实
- 2025-02 已离开 DeepSeek；2025-11-12 朋友圈官宣加入 MiMo（IT之家 https://www.ithome.com/0/896/855.htm ）；2025-12-17 人车家合作伙伴大会首次以 MiMo 负责人身份演讲（36氪）

## 模型时间线（HF 仓库创建时间）

1. MiMo-7B：2025-04-29/30，MIT，7B 稠密，25T tokens，MTP；RL 版 AIME24 68.2、AIME25 55.4；0530 版 AIME24 80.1。arXiv 2505.07608
2. MiMo-VL-7B：2025-05-30（2508 版 08-07）。arXiv 2506.03569
3. MiMo-Audio-7B：2025-09-18，预训练音频超 1 亿小时；MiMo-Embodied-7B 2025-11-19
4. MiMo-V2-Flash：2025-12-16，MIT，309B/15B，48 层=39 SWA+9 全局，窗口 128，attention sink bias，3 层 MTP，27T tokens，256K；SWE-Bench Verified 73.4、AIME25 94.1。技术报告 arXiv 2601.02780：§4.1 MOPD 多教师在线策略蒸馏；Table 8 Code Agent 90K+30K、Search 150K、General 50K；K8s 同时超 10,000 pod，环境搭建成功率 70%，8 种语言
5. MiMo-V2-Pro / Omni / TTS：2026-03-19，仅 API；Pro >1T/42B；发布前匿名上 OpenRouter（Pro=Hunter Alpha，Omni=Healer Alpha）
6. MiMo-V2.5 / V2.5-Pro：04-23 公测，04-28 开源 MIT；V2.5 310B/15B 全模态；V2.5-Pro 1.02T/42B，70 层=60 SWA+10 全局；1M 上下文；SWE-bench Pro 57.2；AA 发布时 54 分与 Kimi K2.6 并列开源第一（v4.3.2 口径下为 26，不可跨版本比）
7. MiMo-X-Pro-Preview / X-Flash-Preview：2026-09-08 随 Desktop 邀测，参数未公开，和 V2.6 对应关系未公开
8. MiMo-V2.6-Pro / Flash / Distill-Qwen-9B：2026-09-22 MIT；结构同上代；1M；RL 不到 6 天，成本 Flash $854,044、Pro $2,620,670，合计 $3,474,715；各 753k 样本；AA v4.3.2 Pro 46 分开源权重第一；模型卡 DeepSWE v1.1 Pro 71.9 / Flash 67.9，Terminal Bench 2.1 Pro 89.9 / Flash 87.6（新闻稿另有 RL 前后 Flash 48.8→65.7、Pro 58.4→72.6）；09-27 发 Pro-MOPD / Flash-MOPD 缓解工具调用重复。官方 https://mimo.mi.com/docs/zh-CN/news/latest/v2-6 ；报告 https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL/blob/main/MiMo_V2_6_technical_report.pdf
9. MiMo-V3：只公开 HySparse2，发布时间未知

## V2.6 RL

- 罗福莉 X 原帖 2026-09-17 凌晨（北京）https://x.com/_LuoFuli/status/2100296686719610932 ：~2B tokens/step，1568 prompts × 16 rollouts，fully async，multi-task agentic RL（一次训练混合多个 harness），test-case and rubric-based rewards；直播 https://mimo.xiaomi.com/rl/
- 技术报告实际每步 2.7~3.7B token
- “每小时约 3 万美元”是媒体按面板算的；“40000+ 沙箱”原帖和报告都没有，面板活跃环境 Pro 23,848、Flash 37,786（腾讯新闻 9-17）
- 报告 §4.3 Groupwise Agentic Grading：二元测试用例无法区分通过解法的质量，GRS 离线对比 rollout 生成 rubric，GAR 在线对通过轨迹排序重分配 advantage；通用任务用原子二元 rubric。§5 “You Only RL Once”，冻结 MoE router；§5.6 MOPD2 合并能力
- 9-22 长文 “The Hard Road to Scaling Up RL” https://x.com/_LuoFuli/status/2102162926802968749 ：MixRL 训可验证中等难度任务；难验证/超长/游戏/3D 单独训再 MOPD 合并；开源 7K 环境和蒸馏版 Qwen；称难度超过她参与过的 DeepSeek R1

## HySparse2

- arXiv 2609.26368，2026-09-22，LLM-Core Xiaomi，共同一作 Jianyu Wei、Yizhao Gao，罗福莉通讯
- 80B-A3B MoE，1M、FP8：KV cache 2.69GB / HySparse 6.72GB / Hybrid SWA 12.09GB；Prefill FLOPs 比 HySparse 低 2.92 倍、比 Hybrid SWA 低 5.02 倍；约 100B token 轻量后训练后 MRCR-v2 / RULER-v2 均值比 HySparse 高 11.30 / 19.81，比 Hybrid SWA 高 6.44 / 18.65；256k RULER-v2 58.45 vs 32.61 vs 35.74
- 上一代 HySparse arXiv 2602.03560（2026-02-03）：80B MoE，49 层仅 5 层全注意力，KV cache 减少近 10 倍
- 罗福莉 X 2026-09-23 https://x.com/_LuoFuli/status/2102766365190901957 ：MiMo-V3 换新架构，核心 HySparse2；动机是 agent 场景“短 action 换回长 observation”；KV Bridging 参考 YOCO

## MiMo Code

- https://github.com/XiaomiMiMo/MiMo-Code ，MIT，2026-06-10 创建，OpenCode fork；2026-09-30 star 13,565 / fork 1,413
- 13 个 tag，v0.1.1（06-11）到 0.1.15（09-22）；0.1.15：同步工具调用串行门禁（只读/检索类并行）、工具调用洪水检测、会话恢复退避重试+子智能体恢复、Read 读图像音频视频
- 首发博客 https://mimo.xiaomi.com/blog/mimo-code-long-horizon ：checkpoint 在预算约 20%/45%/70% 触发；四层记忆；Max Mode N=5，SWE-Bench Pro +10~20%，token 4~5 倍；Goal 死循环 <0.5%；Dynamic Workflow 内置 compose/deep-research/fact-check/research-experiment；dream 每 7 天、distill 每 30 天
- 跑分（VentureBeat 转录图片）MiMo Code+V2.5-Pro vs Claude Code+Sonnet 4.6：SWE-bench Verified 82 vs 79，Pro 62 vs 55，Terminal-Bench 2 73 vs 69；双盲 576 名开发者、474 私有仓库、1,213 组，>200 步胜率超 65%

## MiMo Desktop

- 2026-09-08 邀测 https://mimo.mi.com/docs/zh-CN/news/latest/mimo-desktop ：输入可含未解压压缩包；交付文档/表格/幻灯片/网页/图片/音频/视频/3D/App/工程项目；Smart 多 Agent 协作，MCP 控制 Figma；自主控制浏览器，读屏和键鼠仅海外版；缓存命中同会话最高 99%、跨会话 95%
- 2026-09-22 正式版+会员+V2.6-Pro-UltraSpeed（最高 20 倍速）；邀测 1 周后结束
- 平台 Windows x64、macOS Apple 芯片；不支持韩国、英国、欧盟
- 会员 59/179/599/1199 元每月，高阶和尊享可用 UltraSpeed
- 以 MiMo Code 为核心引擎（MiMo Code README）
