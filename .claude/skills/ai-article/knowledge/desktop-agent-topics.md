# 桌面 Agent 口播选题素材（豆包工作 / WorkBuddy）

调研日期：2026-09-02。供 video-script Skill 选题时复用，所有数字以下方出处为准，写稿前再核一遍一手来源。

## 关键事实与出处

### 豆包工作
- 2026-08-25 正式发布，独立品牌与客户端，slogan「工作新习惯，先让豆包干」，下载 doubao.com/work，飞书账号登录可继承企业上下文。新华网 https://www.news.cn/tech/20260825/1c13b806a0a946a9981e95f0c238e98c/c.html
- 2026-09-02 上新：多 Agents 并行、Mac「操作电脑」不需要 API 直接理解本地界面。IT之家 https://www.ithome.com/0/997/506.htm
- 2026-08-17：手机远程操控电脑、Windows 虚拟桌面。站长之家 https://www.chinaz.com/2026/0817/1771548.shtml
- 定价：标准 68 元/月、加强 200 元/月、高级 500 元/月，token 与生图生视频混合计费；额度按 5 小时/周滚动重置。虎嗅 https://www.huxiu.com/article/4875072.html ，爱范儿 https://news.qq.com/rain/a/20260825A051FF00
- 只用自家模型（Seedream 5.0 Lite / Seedance 2.0），IM 只认飞书；200 多个技能和连接器来自扣子团队；「/」唤起技能，可直接安装 GitHub 上的 Skill。
- 光子星球实测 https://news.qq.com/rain/a/20260825A0C68200 ：云盘 116 篇文章零错误；「指哪改哪」元素级编辑（细到 HTML 标签）同类无对标；虚拟桌面是应用内独立浏览器，与 Manus 云端虚拟机不同；锁屏后手机派任务照跑；工作伙伴 13 种 Agent 组队但串行不并行。
- 组织时间线：7-30 飞书产品团队并入豆包；8-24 TRAE、扣子并入豆包体系。田丰说 https://news.qq.com/rain/a/20260830A04DX400

### WorkBuddy
- 时间线：2026-01-19 内部测试 2000 人；02-06 内测；03-09 正式上线；06-05 企业版；三个月迭代 43 版。虎嗅横评同上
- 2026-09-02 开放平台 open.workbuddy.cn 上线，首批 100 余家生态伙伴，面向智能硬件/行业应用/开发者。
- 定价 99 元/月标准版含 2000 积分，限时加赠 2000；加量包 50 元/1000 积分；5 秒视频约 60 积分。
- 唯一可外接自定义模型（OpenAI/Anthropic）、唯一给费用预估、IM 接入最全（微信/企微/飞书/钉钉远程发指令）、支持定时任务、云端持续运行、权限三档（全权/审批/只读）、文件夹级授权、高危操作拦截、兼容 OpenClaw 插件生态。腾讯云竞争分析 https://developer.cloud.tencent.com/article/2714818 ，对比 Cowork https://github.com/symbosong/cca-f/blob/master/WorkBuddy%E4%B8%8EClaude_Cowork%E6%B7%B1%E5%BA%A6%E5%AF%B9%E6%AF%94%E5%88%86%E6%9E%90.md
- 短板：需手动装 Node.js/Git/.NET；遇 GUI 任务倾向写代码，虎嗅测比另两家多花近 20 分钟；钛媒体测 curl 被 403 后改抓 RSS；报告汇率算错。钛媒体 https://www.tmtpost.com/8074357.html
- 底座沿用 CodeBuddy 内核；马化腾财报会称「中国使用最广的效率智能体服务」；钛媒体称 7 月 DAU 突破 1300 万（与本号 8-27 文章「月活 1000 万+」口径不一致，写稿前核财报原文）。
- 易观：2026 年 6 月 17 款桌面办公智能体月总访问量 6000 万次，WorkBuddy 2097 万次排第一。

### 注意
- 虎嗅（07-14）、钛媒体（07-22）横评对象是「豆包专业版」办公任务模式，不是 8-25 的「豆包工作」，引用要注明前身版本。
- Claude Cowork 相关线索只看到标题未读正文：Cowork 7 月安全漏洞报道 https://thehackernews.com/2026/07/claude-cowork-flaw-could-let-ai-agent.html ；8-18 Cowork 移动端全量 https://9to5mac.com/2026/08/18/ ；Cowork 内置浏览器 https://claude.com/blog/cowork-built-in-browser 。用前必须读原文。

## 历史打开率信号（title-data.md）
- OpenClaw 相关 4.6% 到 5.7%，面试对话体 3% 到 5%，「国产 Cowork 实测」只有 1% 到 2.3%。口播选题偏「争议 + 门道 + 算账」，少做纯功能演示。
