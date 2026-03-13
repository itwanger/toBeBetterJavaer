大家好，我是二哥呀。

最近AI圈是

>养虾地址：https://agent.xfyun.cn/astron-claw

![](https://cdn.paicoding.com/stutymore/sucai-20260312221247.png)

点击【立即部署】，只需要1-2分钟就可以拥有你自己的虾，干净又卫生，哦不，安全又智能。

![](https://cdn.paicoding.com/stutymore/sucai-20260312221514.png)

无需编写代码，无需额外设备。省去复杂的安装流程，节省高额的部署成本。即开即用，彻底告别环境依赖。

并且 AstronClaw 是隔离运行在 Sandbox 中，可以放心安全地使用，不用担心数据问题。

模型可选讯飞的Spark-X2、GLM-5、MiniMax 2.5和Kimi 2.5等顶级国内模型。

![](https://cdn.paicoding.com/stutymore/sucai-20260312221633.png)


auto模式下，AstronClaw可根据任务需求自由切换模型，无需繁琐配置，无需管理 API Key。

基础版首购仅需16.8元/月，不足一杯咖啡的价格，

官方还有一个限时福利：即日起至3月20日10:00，订阅任一AstronClaw套餐。可享受【对话不扣积分】，无限畅聊！

![](https://cdn.paicoding.com/stutymore/sucai-20260312230049.png)

16.8元就可以上岗你的「电子龙虾」，这波体验拉满了。


点击 Skills 小图标，这里已经可以看到 131 个成熟的技能包。

![](https://cdn.paicoding.com/stutymore/sucai-20260312222110.png)

包括我们接下来会测试的智能简历生成、OCR、播客生成器、一句话复刻等已安装的Skills。

如果你想安装第三方的Skills，往下翻。

只需要鼠标轻轻一点就可以安装成功，几乎可以说秒安装。

![](https://cdn.paicoding.com/stutymore/sucai-20260312222441.png)

内置已经连接ClawHub生态，能轻松调用10000+ Skills。当然，你也可以上传自己的 Skill，让AstronClaw更懂你。



渠道依然是御三家，飞书、钉钉和企业微信。

![](https://cdn.paicoding.com/stutymore/sucai-20260312222648.png)

这里我们就以飞书为例。

点击配置说明中的紫字【飞书开放平台】，新建一个AstronClaw助手应用。

![](https://cdn.paicoding.com/stutymore/sucai-20260312222831.png)

添加机器人能力。

![](https://cdn.paicoding.com/stutymore/sucai-20260312223004.png)

进入权限管理，将以下配置批量导入，这是科大讯飞官方给我们提供的推荐配置，直接无脑复制就可以了。

```
{
  "scopes": {
    "tenant": [
      "aily:file:read",
      "aily:file:write",
      "application:application.app_message_stats.overview:readonly",
      "application:application:self_manage",
      "application:bot.menu:write",
      "cardkit:card:write",
      "contact:user.employee_id:readonly",
      "corehr:file:download",
      "docs:document.content:read",
      "event:ip_list",
      "im:chat",
      "im:chat.access_event.bot_p2p_chat:read",
      "im:chat.members:bot_access",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.group_msg",
      "im:message.p2p_msg:readonly",
      "im:message:readonly",
      "im:message:send_as_bot",
      "im:resource",
      "sheets:spreadsheet",
      "wiki:wiki:readonly"
    ],
    "user": ["aily:file:read", "aily:file:write", "im:chat.access_event.bot_p2p_chat:read"]
  }
}
```

![](https://cdn.paicoding.com/stutymore/sucai-20260312223228.png)

接下来，回到 AstronClaw 的消息渠道配置，把飞书【凭证与基础信息】中的APP ID 和APP secret 复制粘贴到输入框里。

![](https://cdn.paicoding.com/stutymore/sucai-20260312223356.png)

点击【保存配置】。

![](https://cdn.paicoding.com/stutymore/sucai-20260312223653.png)

回到飞书的【事件与回调】，把长连接打开。

![](https://cdn.paicoding.com/stutymore/sucai-20260312223749.png)

把 AstronClaw 推荐的 `im.message.receive_v1` 接收消息事件添加上。

![](https://cdn.paicoding.com/stutymore/sucai-20260312223953.png)

提醒大家把回调配置的长连接也打开，顺带把【卡片回调交互】添加上。

![](https://cdn.paicoding.com/stutymore/sucai-20260312224113.png)

这样飞书的交互体验会更加友好一点。

然后就可以点击版本管理与发布，准备通过AstronClaw和飞书交互起来吧。

![](https://cdn.paicoding.com/stutymore/sucai-20260312224239.png)

进入飞书，找到我们的AstronClaw助手，随便发送一条消息。

![](https://cdn.paicoding.com/stutymore/sucai-20260312225155.png)

收到回复的话，就证明我们的飞书渠道打通了，可以开始愉快地养虾了。

给我们的虾起个名字，就叫AstronClaw助手，他是平行世界里我们的AI助手。

![](https://cdn.paicoding.com/stutymore/sucai-20260312225254.png)

