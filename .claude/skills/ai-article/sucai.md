标题：

飞书文档：https://wvixbzgc0u7.feishu.cn/docx/PzxFdP3NIo7WZsxsmTxc2N64nJf

Case 路径：/Users/itwanger/Documents/GitHub/agent-llm-case

大家好，我是二哥呀。

国模在今年的发展有目共睹，大家可以先看下面这两个录屏，猜一猜，分别是用哪两个模型实现的。

【录屏1】

【录屏2】

如果我告诉你答案，一个是 DeepSeek V4 Pro，另外一个是阶跃星辰的 Step 5 Preview，是不是还挺意外的？

国模已经达到这个水平了吗？

是的，我可以给你肯定的答案。

在最新的 AA 榜单上，Step 5 Preview 也取得了相当不错的成绩。

![](https://cdn.paicoding.com/stutymore/sucai-20260919210606.png)



## 01、在Kimi Code中添加模型

为了公平测试 DeepSeek V4 Pro 和 Step 5 Preview，这次我们选择第三方的 Kimi Code 作为模型的 Harness 载体。

配置方法很简单，在 Kimi Code 中点设置，找到【供应商】。

![](https://cdn.paicoding.com/stutymore/sucai-20260918223328.png)

对于 Step 5 Preview 模型，供应商选择 StepFun，然后填写 API Key，再然后保存就行了。

对于 DeepSeek V4 Pro 模型，供应商选择 DeepSeek，然后填写 API Key，再然后保存就行了。

回到提示词输入页，选择刚刚配置的新模型，输入 `这是一条连接测试，请只回复 OK，不要调用任何工具`，如果收到 OK，就证明已经配置成功了。

![](https://cdn.paicoding.com/stutymore/sucai-20260918223941.png)

## 02、Coding场景

![](https://cdn.paicoding.com/stutymore/sucai-20260919211048.png)

![](https://cdn.paicoding.com/stutymore/sucai-20260919211142.png)

## 03、work场景

## 04、前端场景

## ending

