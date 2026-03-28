GLM-5.1

爆肝 2 天，用 GLM-5.1 开发了一个简历 Agent，已开源！

长程任务能力是检验模型智能的下个标准。METR 研究显示，在编程等领域，AI 能以 50% 成功率完成的任务复杂度（以人类专家耗时衡量）正呈指数级增长，近期加速至每 4–6 个月翻倍。
GLM-5.1是当前面向长程任务的开源第一模型。模型在长时间跨度、长链路依赖、多工具协同、持续执行、目标保持等关键能力显著提升，向着像资深工程师一样交付完整工作的目标，又迈出了一步。

- 更强的长程规划与目标保持：GLM-5.1 更擅长把复杂目标拆解为可执行步骤，并在长链路执行中持续围绕最终交付推进，减少中途跑偏、遗忘约束或陷入局部最优。
- 更稳的多工具协同与持续执行：模型能在检索、代码、网页、API 等多个环节之间更稳定地衔接，支持更长时间跨度的连续执行，把任务从“会做一步”推进到“能做完整链路”。
- 更好的状态延续与上下文整合：面对长时间跨度、多轮反馈和大量上下文信息，GLM-5.1 能更稳定地记住已经完成的内容、当前所处阶段和接下来的关键动作，并持续整合新信息，保持执行链路的一致性。

先确保你的Claude Code已经正确切换到了GLM-5.1模型。

![](https://cdn.paicoding.com/stutymore/sucai-20260328111306.png)

我们直接上测试，先调用Chrome Devtools 打开我们的浏览器，然后通读一下语雀上我沉淀的需求文档。

![](https://cdn.paicoding.com/stutymore/sucai-20260328111157.png)

这文档的内容可不少。

>提示词：我现在要重构一下这个项目，我们要启用plan模式，首先我有一份语雀文档，你先用Chrome打开通读一下：https://www.yuque.com/itwanger/maipem/cc15r3paz9onkz3c?singleDoc# 《简历派支付功能设计方案》 密码


Claude Code要使用Chrome Devtools MCP 打开浏览器，我们直接把这个 MCP 工具加载到配置了，省得每次都要问我们权限。

![](https://cdn.paicoding.com/stutymore/sucai-20260328111408.png)

需要输入密码，可以直接告诉在CC中告诉他，也可以直接在浏览器里输入。

![](https://cdn.paicoding.com/stutymore/sucai-20260328111516.png)

会自动翻页，然后读取完整内容。

![](https://cdn.paicoding.com/stutymore/sucai-20260328111654.png)

库表设计也能拿得到。

![](https://cdn.paicoding.com/stutymore/sucai-20260328111722.png)

觉得一份文档不够，还可以让他用 web-access 这个Skills 开启多个Agent读。

![](https://cdn.paicoding.com/stutymore/sucai-20260328112324.png)

功能梳理文档、AI优化简历、简历修改、通知功能，直接开启 6 个子 Agent去干活。

![](https://cdn.paicoding.com/stutymore/sucai-20260328112601.png)

多个标签页同时进行，互不干扰，这时候考验的就是你的电脑配置给不给力了。😄

![](https://cdn.paicoding.com/stutymore/sucai-20260328112714.png)

这种长上下文的能力，确实无可挑剔。已经搞定了功能梳理，然后等另外5个文档的子 Agent返回结果。

![](https://cdn.paicoding.com/stutymore/sucai-20260328112815.png)

在 Claude Code 中还可以通过上下箭头查看其余 Agent的干活情况。

![](https://cdn.paicoding.com/stutymore/sucai-20260328112939.png)

点击 enter 还可以进去看子 Agent的详情。

![](https://cdn.paicoding.com/stutymore/sucai-20260328113002.png)

是不是感觉很爽？

![](https://cdn.paicoding.com/stutymore/sucai-20260328113119.png)

如果任务结束了，还会帮我们自动关闭标签页。

![](https://cdn.paicoding.com/stutymore/sucai-20260328113152.png)

好家伙，9 个文档全部都读完了，告诉我们他看到的结果。

![](https://cdn.paicoding.com/stutymore/sucai-20260328114430.png)

- 全局思维导图：登录→首页→简历生成（模板+模块化编辑+AI优化+排版）→我的简历（查看/新建/导出）→简历优化（付费，管理员后台处理）→通知
- 四大模块：简历模板（默认+模板中心）、我的简历（模块化编辑+AI优化+导出PDF）、简历优化、基础功能
- 邮箱注册+验证码、JWT(access_token+refresh_token)、Redis缓存、管理员初始化
- Kafka消息队列、同步持久化+异步分发、高/低优先级Topic、DLQ死信队列、站内+邮件通知
- 通用支付模块、支付宝H5/PC、4个接口（创建/查询/回调/日志）、pay_order+pay_log表
- 模块化JSON存储、resume主表+resume_module模块表、8个接口（CRUD+AI优化）、前端渲染PDF
- Deepseek模型、STAR法则Prompt、用户触发→后端处理→对比展示→用户决策、输入校验+超时控制
- 用户发起修改任务→专家后台处理→自动保存草稿→完成通知、10个接口、4张表

太全面了呀。我滴乖乖。

![](https://cdn.paicoding.com/stutymore/sucai-20260328114813.png)

咨询完我们的需求后，直接开始 plan 模式干活。

选好前后端的技术栈。

![](https://cdn.paicoding.com/stutymore/sucai-20260328114920.png)

准备设计详细的实施方案了。


![](https://cdn.paicoding.com/stutymore/sucai-20260328115131.png)

可以ctrl+o看一下详细的设计过程。

![](https://cdn.paicoding.com/stutymore/sucai-20260328115850.png)

后端的目录结果。

![](https://cdn.paicoding.com/stutymore/sucai-20260328115935.png)

需要引入的依赖。

![](https://cdn.paicoding.com/stutymore/sucai-20260328115957.png)

配置信息

![](https://cdn.paicoding.com/stutymore/sucai-20260328120027.png)

表设计。

![](https://cdn.paicoding.com/stutymore/sucai-20260328120044.png)

接口设计。

![](https://cdn.paicoding.com/stutymore/sucai-20260328120105.png)

安全和前端。

![](https://cdn.paicoding.com/stutymore/sucai-20260328120200.png)

流程图。

![](https://cdn.paicoding.com/stutymore/sucai-20260328120237.png)

一共12个步骤，考虑的非常全面了。

![](https://cdn.paicoding.com/stutymore/sucai-20260328120343.png)

准备干活。

![](https://cdn.paicoding.com/stutymore/sucai-20260328120424.png)

已经运行21分钟了，没有出任何错，说明GLM-5.1的长程任务能力确实很强，能持续稳定地执行这么长时间的复杂任务。

![](https://cdn.paicoding.com/stutymore/sucai-20260328120526.png)

第一步是搭建后端的项目骨架。

![](https://cdn.paicoding.com/stutymore/sucai-20260328120804.png)

第二步是数据库表 + 实体类 + Mapper。

![](https://cdn.paicoding.com/stutymore/sucai-20260328120834.png)

第三步是 JWT + 认证接口。

![](https://cdn.paicoding.com/stutymore/sucai-20260328121007.png)

第四步是 CRUD 接口的实现。

![](https://cdn.paicoding.com/stutymore/sucai-20260328121150.png)

到此算是一个段落，后端已创建 30+ 个 Java 文件。剩下后端 AI 接口 + 整个前端重构。

![](https://cdn.paicoding.com/stutymore/sucai-20260328121226.png)

问我们要不要确认后端代码再继续干活，那必须是不要，继续干啊，GLM-5.1 你这个牛马，不要停啊。

接下来是步骤 6：前端重构 — 安装依赖、路由、认证页面、API 客户端。

![](https://cdn.paicoding.com/stutymore/sucai-20260328121523.png)

接下来是，前端页面和组件。

![](https://cdn.paicoding.com/stutymore/sucai-20260328121945.png)

全部搞定了。

![](https://cdn.paicoding.com/stutymore/sucai-20260328123301.png)

整体代码编写完了，我们问问接下来需要我们干什么。

![](https://cdn.paicoding.com/stutymore/sucai-20260328123643.png)

什么还要我们自己建表，那不能够，有AI我是啥都不想干呢。

>提示词：mysql和Redis我已经启动了，你直接搞定。但是我希望直接启动main 方法的时候把建表执行了，这样我就不用自己去执行了，是不是。后端的配置能不能放到 .env 文件中，如果我配置到application.yml 我提交的时候还要防止误提交。

![](https://cdn.paicoding.com/stutymore/sucai-20260328123751.png)

有任何错误，也会自己调整。

![](https://cdn.paicoding.com/stutymore/sucai-20260328124216.png)

前后端的编译都通过了。

![](https://cdn.paicoding.com/stutymore/sucai-20260328124858.png)


好，我们先创建一个数据库 pai_resume。

![](https://cdn.paicoding.com/stutymore/sucai-20260328135855.png)

启动后端。

![](https://cdn.paicoding.com/stutymore/sucai-20260328135932.png)

启动过程中，有任何错误，都会自己调整。比如说数据库链接这里应该是 UTF-8 而不是 utf8mb4。

![](https://cdn.paicoding.com/stutymore/sucai-20260328140159.png)

可能有些小伙伴说，AI本身就不应该犯这个错误。

但我只想说，这个要求苛刻了，不仅 GLM-5.1 会犯错，GPT-5.4也会犯错。之前我让 GPT-5.4 修改PaiFlow项目的数据库链接问题，结果直接把我的UTF-8 改成了 utf8mb4。

![](https://cdn.paicoding.com/stutymore/sucai-20260328140719.png)

我们人在进步，AI也在进步。

GLM-5.1 目前的表现在我看来，其实已经有赶上闭源模型的趋势。

写错了不要紧，能主动修正自己的错误才是最重要的。

OK，后端已经成功启动了。

![](https://cdn.paicoding.com/stutymore/sucai-20260328141144.png)

我们再开一个终端，启动前端，试试。

![](https://cdn.paicoding.com/stutymore/sucai-20260328141301.png)

这样如果前端有错误，CC可以帮我们直接修正。

![](https://cdn.paicoding.com/stutymore/sucai-20260328141339.png)

OK，前端也起来了。

![](https://cdn.paicoding.com/stutymore/sucai-20260328141422.png)


![](https://cdn.paicoding.com/stutymore/sucai-20260328142026.png)

直接开始了。

![](https://cdn.paicoding.com/stutymore/sucai-20260328142157.png)

全程自己搞定，非常丝滑。

![](https://cdn.paicoding.com/stutymore/sucai-20260328142509.png)

给我们报告。

![](https://cdn.paicoding.com/stutymore/sucai-20260328142643.png)
