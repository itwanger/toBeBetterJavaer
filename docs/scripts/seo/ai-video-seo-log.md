# /ai/video/ SEO/GEO 追踪日志

每次复盘追加一节，最新的放最后。指标口径保持不变，才能前后对比。

## 2026-09-30 基线

整改前的状态（当天已部署：总页标题改为“AI Agent 面试题 363 道（Agent八股+视频讲解）｜王二讲Agent”，65 条完整答案链接改成本站优先，llms.txt 题数自动计数，GitHub README 加“王二讲Agent”一节；用户已在 GSC 重交 sitemap 并请求编入索引）。

| 指标 | 数值 |
| --- | --- |
| 站上 /ai/video/ 页面数（sitemap） | 67 |
| 其中 canonical 指向 paicoding | 14 |
| Google `site:javabetter.cn/ai/video` 结果数 | 11 |
| Google 总页摘要里的题数 | 347（旧快照） |
| “Agent八股” javabetter 排名 | 前 30 无 |
| “王二讲Agent” javabetter 排名 | 第 1 页有 sidebar/itwanger AI 知识体系页；/ai/video/ 无，paicoding 双发页占位 |
| `site:my.feishu.cn 王二讲Agent` | 0 |
| GSC /ai/video/ 未编入索引原因 | 待填 |

## 2026-10-14 复盘

定时任务自动采集。Google 用内置浏览器（hl=zh-CN，未登录，结果可能和 GSC 的平均排名有出入），GSC 用 Claude in Chrome 读取 sc-domain:javabetter.cn。

| 指标 | 数值 | 较上次 |
| --- | --- | --- |
| 站上 /ai/video/ 页面数（sitemap） | 82 | +15 |
| 其中 canonical 指向 paicoding | 14 | 持平 |
| Google `site:javabetter.cn/ai/video` 结果数 | 30（翻到底，含“显示省略的结果”也是 30；首页估算“约 105 条”） | +19 |
| 其中 canonical 指向 paicoding 却仍被收录 | 5（what-is-agent、agent-core-components、plan-and-execute、what-is-react、agent-chatbot-difference） | 新增口径 |
| Google 总页摘要里的题数 | 365（旧快照） | +18 |
| 线上总页 `<title>` 题数 | 368 | 新增口径 |
| 线上 og:title / JSON-LD headline 题数 | 367 | 新增口径，和 title 不一致 |
| readme.md 里 `^### ` 数量 | 368 | +5 |
| llms.txt 里的题数 | 368 | 新增口径 |
| 本地文章缺 agentInterview.ts meta 的 slug | 2（rag-hybrid-search、rea-deepseek-harness-tutorial，两篇也不在 readme 里） | 新增口径 |
| “Agent八股” javabetter 排名 | 前 30 无；paicoding 前 30 无；无 AI 概览（GSC 平均排名 7.9） | 浏览器口径持平，GSC 已有曝光 |
| “AI Agent 面试题” javabetter 排名 | 前 30 无；paicoding 前 30 无；无 AI 概览 | 新增口径 |
| “Agent 面试题” javabetter 排名 | 前 30 无；paicoding 前 30 无；无 AI 概览（GSC 查询“agent面试题”平均排名 7.9） | 新增口径 |
| “王二讲Agent” javabetter 排名 | 第 2（/ai/video/ 总页），第 3 是 sidebar AI 知识体系页；paicoding 第 1（how-agent-works） | /ai/video/ 从无到第 2 |
| 长尾“Harness 五要素” | 首页无（harness-five-elements 已收录） | 新增口径 |
| 长尾“Loop Engineering 是什么” | 首页无，有 AI 概览，引用知乎、數位時代、菜鸟教程，无 javabetter/paicoding；what-is-loop-engineering 未进 site: 结果 | 新增口径 |
| 长尾“KV Cache 为什么不缓存 Q” | 首页无；what-is-kv-cache 未进 site: 结果 | 新增口径 |
| `site:my.feishu.cn 王二讲Agent` | 0 | 持平 |
| GSC 近 28 天（9-14 至 10-11）URL 含 /ai/video/ | 点击 194，曝光 4400，点击率 4.4%，平均排名 7.3；有曝光的网页 66 个，查询词 146 个 | 首次读取 |
| GSC 前 10 查询词（按点击） | jev 开源 10/145、开源jev 7/50、jev 开源版 7/28、jev开源 6/58、开源 jev 6/20、agent八股 4/64（排名 7.9）、agent面试题 3/62（排名 7.9）、jev开源版本 3/13、开源版jev 3/9、jev 复现 3/9 | 首次读取 |
| GSC 前 5 网页（按点击） | open-source-jev-replicas 136/1469、总页 40/1321（排名 8.2）、what-is-cordis 5/206、what-is-jev 4/329、glm-flash-linear-sparse-attention 1/105 | 首次读取 |
| GSC /ai/video/ 未编入索引原因 | 已发现-尚未编入索引 2（is-plan-mode-dead、workflow-vs-agent-flight-booking，验证“已通过”）；已抓取-尚未编入索引 1（cpu-gpu-npu-difference）；备用网页 5（paicoding canonical，预期内）；404、重复网页、Google 另选规范均为 0 | 首次填写 |
| GitHub README “王二讲Agent”一节 | 有（标题写 368 道） | 持平 |

本轮已落地（10-14，待部署）：总页题数改为从 readme.md 的 `### ` 自动计数，title、og:title、JSON-LD 统一；补 rag-hybrid-search、rea-deepseek-harness-tutorial 的 meta、分组和 readme 条目，题数变为 369；每篇题目页末尾自动生成“相关面试题”区块（同组相邻题加手动映射，is-plan-mode-dead、workflow-vs-agent-flight-booking、cpu-gpu-npu-difference、what-is-loop-engineering、what-is-kv-cache 都有了正文内链）；Loop Engineering 摘要改为和正文一致的定义；ai-agent-top300、ai-agent-top50 两个旧地址加静态跳转页指向 /ai/video/。下次复盘重点看这 5 个页面是否编入索引。

其他发现：llms.txt 里出现 `sidebar/itwanger/ai/agent-mianshi-zijie-compiler copy.html`，源自 docs/src/sidebar/itwanger/ai/ 下的 `agent-mianshi-zijie-compiler copy.md` 副本文件；GSC 404 里有 sidebar/itwanger/ai/ai-agent-top300.html 和 ai-agent-top50.html 两个旧地址。
