import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as d,a as n,d as e,b as l,e as s,r}from"./app.99eb8281.js";const c={},u=s('<h2 id="好好的支付-怎么就掉单了" tabindex="-1"><a class="header-anchor" href="#好好的支付-怎么就掉单了" aria-hidden="true">#</a> 好好的支付，怎么就掉单了？</h2><p>听说过下单、买单、脱单……掉单是什么东西？</p><p>所谓的掉单，就是用户下单支付，在钱包里完成了支付，结果回到电商APP一看，订单还是未支付……</p><p>毫无疑问，用户肯定会炸，结果不是投诉，就是差评。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qianfldshswzfyhzlllrhfzzfdd-e067090b-f47c-4c55-84c1-a00d74c4cdc6.jpg" alt="用户感觉受到了欺诈" loading="lazy"></p><p>那么掉单是怎么来的呢？</p><p>我们先来看看订单支付的完整流程：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qianfldshswzfyhzlllrhfzzfdd-15fe2cfb-1a43-4bb4-989a-7a037db47ceb.jpg" alt="钱包支付的完整流程" loading="lazy"></p><ol><li>用户从电商应用点击支付，客户端向服务端发起支付请求</li><li>支付服务会向第三方的支付渠道发起支付，支付渠道会响应对应的url</li><li>以APP为例，客户端通常是会拉起对应的钱包，用户跳到对应的钱包</li><li>用户在钱包里完成支付</li><li>用户完成支付后，跳转回对应的电商APP</li><li>客户端轮询订单服务，获取订单状态</li><li>支付渠道回调支付服务，通知支付结果</li><li>支付服务通知订单服务，更新订单状态</li></ol><p>对于支付订单而言，大概可以分为这么几个状态：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qianfldshswzfyhzlllrhfzzfdd-588abc59-6457-4b9e-bead-40ba7c67249a.jpg" alt="支付状态" loading="lazy"></p><ul><li>未支付：用户在点击支付之后，支付服务请求支付渠道之前，处于未支付状态</li><li>支付中：用户发起支付后，到跳转到支付钱包，再到完成支付，支付服务获取到最终支付结果之间，属于支付中状态，这个状态下，可以说是一个迷雾状态，电商系统对于用户的支付是不确定</li><li>支付成功/失败/取消/关闭：电商系统最终确定了用户在第三方钱包的支付最终结果</li></ul><p>看起来没什么问题啊，怎么就掉单了？简单说，就是支付的状态没有同步到，或者没有及时同步到。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qianfldshswzfyhzlllrhfzzfdd-7efd0938-22a0-4062-9258-a36c61bf3a30.jpg" alt="掉单发生" loading="lazy"></p><ol><li>支付渠道的支付回调</li></ol><p>发生了一些异常，导致支付服务没有收到支付渠道的回调通知</p><ol start="2"><li>支付服务通知订单服务</li></ol><p>服务内部出现异常，导致支付状态没有同步到订单服务</p><ol start="3"><li>客户端获取订单状态</li></ol><p>客户端通常是轮询获取状态，可能会在轮询时间内没有获取到订单状态，结果用户看到未支付</p><p>其中1可以称之为外部掉单，2和3可以称之为内部掉单。</p><p>接下来我们看看，怎么预防掉单问题。</p><h2 id="怎么防止内部掉单" tabindex="-1"><a class="header-anchor" href="#怎么防止内部掉单" aria-hidden="true">#</a> 怎么防止内部掉单</h2><p>我们先从系统内部的掉单说起，当然在系统内部，稳定性更容易保证，发生掉单的概率还是比较小的。</p><h3 id="服务端防止掉单" tabindex="-1"><a class="header-anchor" href="#服务端防止掉单" aria-hidden="true">#</a> 服务端防止掉单</h3><p>支付服务和订单服务之间防止掉单，关键就在于尽可能保证支付通知订单支付结果成功，我们一般通过这两种方式。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qianfldshswzfyhzlllrhfzzfdd-c2408e08-6ae9-4268-9878-59e94f5cb760.jpg" alt="服务端防止掉单" loading="lazy"></p><ol><li>同步调用重试机制</li></ol><p>支付服务调用订单服务的时候，要进行失败重试，防止网络抖动情况下的调用失败。</p><ol start="2"><li>异步消息可靠性投递</li></ol><p>同步不稳妥，那就再加一个异步。支付服务投递一个支付成功消息，订单服务消费支付成功消息，整个过程要尽可能保证可靠性，例如订单服务要在完成订单状态更新后再确认完成消息消费。</p><p>同步+异步两手策略，基本上可以防范服务端的内部掉单。</p><p>至于引入分布式事务（事务消息、Seata）来保证状态一致，我觉得也没有必要。</p><h3 id="客户端如何防止掉单" tabindex="-1"><a class="header-anchor" href="#客户端如何防止掉单" aria-hidden="true">#</a> 客户端如何防止掉单</h3><p>用户支付完成后，跳回电商系统，客户端会轮询一下订单的状态，通常两三秒内，就会得到订单完成支付的结果，这个过程出现问题的概率相比是非常低的。</p><p>但是也不排除，很小概率下，客户端轮询一段时间，还没得到结果，那么只能结束轮询，给用户展示未支付。</p><p>这种情况，通常问题也是出在服务端，没有及时更新订单的状态，最主要的还是要处理服务端的掉单，保证服务端能及时同步支付订单的状态。</p><p>但是一旦服务端的订单状态变更了，也要尽可能同步到客户端，不能让用户一直看到未支付。</p><p>客户端和服务端之间，同步状态，无非就是推和拉：</p><ol><li>客户端轮询</li></ol><p>客户端判断用户未支付之后，通常会进行订单倒计时。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qianfldshswzfyhzlllrhfzzfdd-9d55b97f-fcf8-4f25-b24d-e73bc7f721cd.jpg" alt="倒计时" loading="lazy"></p><p>这里再提一下？大家觉得这种倒计时是怎么实现的呢？纯客户端组组件倒计时吗？</p><p>——肯定不行，通常是客户端组件倒计时，定期向服务端请求，检查倒计时时间。同样的，这种情况下，客户端也可以检查支付状态。</p><ol start="2"><li>服务端推送</li></ol>',45),v={href:"https://mp.weixin.qq.com/s/FAA0xksVNiVuPGY8-kaONg",target:"_blank",rel:"noopener noreferrer"},m=s(`<h2 id="怎么防止外部掉单" tabindex="-1"><a class="header-anchor" href="#怎么防止外部掉单" aria-hidden="true">#</a> 怎么防止外部掉单</h2><p>相比较内部掉单，外部掉单发生的概率就大很多，毕竟和外部渠道的对接，不可控的因素更多。</p><p>要防止外部掉单，核心就是四个字：“<code>主动查询</code>”，如果只是等待第三方的回调通知，风险还是比较大的，支付服务要主动向第三方查询支付状态，即使有什么异常，也能及时感知到。</p><p>主动查询，主要就是两种形式：</p><h3 id="定时任务查询" tabindex="-1"><a class="header-anchor" href="#定时任务查询" aria-hidden="true">#</a> 定时任务查询</h3><p>毫无疑问，最简单的肯定就是定时任务了，支付服务，定时查询一段时间内<code>支付中</code>的支付订单，向第三方渠道查询支付结果，查询到终态之后，就去更新支付订单状态、通知订单服务：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qianfldshswzfyhzlllrhfzzfdd-1f52b170-7471-42a8-9bb6-f5f70fb470f8.jpg" alt="定时查询支付状态" loading="lazy"></p><p>实现也很简单，用xxl-job之类的定时任务框架，定时扫表，向第三方查询就行了，大概代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    @XxlJob(&quot;syncPaymentResult&quot;)
    public ReturnT&lt;String&gt; syncPaymentResult(int hour) {
        //……
        //查询一段之间支付中的流水
        List&lt;PayDO&gt; pendingList = payMapper.getPending(now.minusHours(hour));
        for (PayDO payDO : pendingList) {
            //……
            // 主动去第三方查
            PaymentStatusResult paymentStatusResult = paymentService.getPaymentStatus(paymentId);
            // 第三方支付中
            if (PaymentStatusEnum.PENDING.equals(paymentStatusResult.getPayStatus())) {
                continue;
            }
            //支付完成，获取到终态
            //……
            // 1.更新流水
            payMapper.updatePayDO(payDO);
            // 2.通知订单服务
            orderService.notifyOrder(notifyLocalRequestVO);
        }
        return ReturnT.SUCCESS;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定时任务的最大好处肯定是简单了，但是它也有一些问题：</p><ol><li>查询的结果不实时</li></ol><p>定时任务频率的设置永远是个不好确定的事情，间隔短对数据库压力大，间隔长了不实时，很容易出现，上面提到的用户回到APP，结果轮询不到支付成功状态的情况。</p><p>实际上，用户跳转钱包之后，通常会很快完成支付，如果短时间内没有完成支付，那么一般也不会再付了。所以其实，发起支付开始，从第三方查询支付结果的频率应该是递减的。</p><ol start="2"><li>对数据库有压力</li></ol><p>定时任务扫表，对数据库肯定是会有压力的，扫表的时候，经常会看到数据库的监控出现一个小突刺，如果数据量大的话，可能影响更大。</p><p>可以单独创建一个支付中流水表，定时任务扫描这张表，获取到支付最终态之后，就删除掉对应的记录。</p><h3 id="延时消息查询" tabindex="-1"><a class="header-anchor" href="#延时消息查询" aria-hidden="true">#</a> 延时消息查询</h3><p>定时任务存在一些问题，那么有没有什么其它办法呢？答案是延时消息。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qianfldshswzfyhzlllrhfzzfdd-2e6168c0-7793-413b-b405-4eb4193971c4.jpg" alt="延时消息查询支付状态" loading="lazy"></p><ul><li>在发起支付之后，发送一个延时消息，前面讲到，用户跳转到钱包，通常很快会支付，所以我们希望查询支付状态这个步骤，符合这个规律，所以希望在10s、30s、1min、1min30s、2min、5min、7min……这种频率去查询支付订单的状态，这里我们可以用一个队列结构实现，队列里存放下一次查询的时间间隔。</li></ul><p>大概代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//……
//控制查询频率的队列，时间单位为s
Deque&lt;Integer&gt; queue = new LinkedList&lt;&gt;();
queue.offer(10);
queue.offer(30);
queue.offer(60);
//……
//支付订单号
PaymentConsultDTO paymentConsultDTO = new PaymentConsultDTO();
paymentConsultDTO.setPaymentId(paymentId);
paymentConsultDTO.setIntervalQueue(queue);
//发送延时消息
Message message = new Message();
message.setTopic(&quot;PAYMENT&quot;);
message.setKey(paymentId);
message.setTag(&quot;CONSULT&quot;);
message.setBody(toJSONString(paymentConsultDTO).getBytes(StandardCharsets.UTF_8));
try {
    //第一个延时消息，延时10s
    long delayTime = System.currentTimeMillis() + 10 * 1000;
    // 设置消息需要被投递的时间。
    message.setStartDeliverTime(delayTime);
    SendResult sendResult = producer.send(message);
    //……
} catch (Throwable th) {
    log.error(&quot;[sendMessage] error:&quot;, th);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>PS：这里用的是RocketMQ云服务器版，支持任意级别的延时消息，开源版的RocketMQ只支持固定级别的延时消息，不得不感慨充钱才能变强。有实力的开发团队，可以在开源基础上，进行二次开发。</p></blockquote><ul><li>在消费到延时消息之后，向第三方查询支付订单的状态，如果还在支付中，就继续发送下一个延时消息，延时间隔从队列结构中取。如果获取到最终态，就去更新支付订单状态、通知订单服务。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
@Slf4j
public class ConsultListener implements MessageListener {
    //消费者注册，监听器注册
    //……
  
    @Override
    public Action consume(Message message, ConsumeContext context) {
        // UTF-8解析
        String body = new String(message.getBody(), StandardCharsets.UTF_8);
        PaymentConsultDTO paymentConsultDTO= JsonUtil.parseObject(body, new TypeReference&lt;PaymentConsultDTO&gt;() {
        });
        if (paymentConsultDTO == null) {
            return Action.ReconsumeLater;
        }
        //获取支付流水
        PayDO payDO=payMapper.selectById(paymentConsultDTO.getPaymentId());
        //……
        //查询支付状态
        PaymentStatusResult paymentStatusResult=payService.getPaymentStatus(paymentStatusContext);
        //还在支付中，继续投递一个延时消息
        if (PaymentStatusEnum.PENDING.equals(paymentStatusResult.getPayStatus())){
            //发送延时消息
            Message msg = new Message();
            message.setTopic(&quot;PAYMENT&quot;);
            message.setKey(paymentConsultDTO.getPaymentId());
            message.setTag(&quot;CONSULT&quot;);
           //下一个延时消息的频率
            Long delaySeconds=paymentConsultDTO.getIntervalQueue().poll();        message.setBody(toJSONString(paymentConsultDTO).getBytes(StandardCharsets.UTF_8));
            try {
                Long delayTime = System.currentTimeMillis() + delaySeconds * 1000;
                // 设置消息需要被投递的时间。
                message.setStartDeliverTime(delayTime);
                SendResult sendResult = producer.send(message);
                //……
            } catch (Throwable th) {
                log.error(&quot;[sendMessage] error:&quot;, th);
            }
            return Action.CommitMessage;
        }
        //获取到最终态
        //更新支付订单状态
        //…… 
        //通知订单服务
        //……
        return Action.CommitMessage;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>延时消息的方案相对于定时轮询方案来讲：</p><p>不过大家也看到，我这里的实现是利用的是充钱版的RocketMQ，所以看起来不太复杂，但是如果用开源方案，那就没那么简单。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qianfldshswzfyhzlllrhfzzfdd-d7f82bb3-536a-4c0d-8679-62939978c344.jpg" alt="充钱就能解决" loading="lazy"></p><ul><li>时效性更好</li><li>无需扫表，对数据库压力较小</li></ul><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>这篇文章介绍了一个让用户炸毛，让客服恼火，让开发挠头的问题——掉单，包括为什么会掉单，怎么防止掉单。</p><p>其中内部掉单，发生的概率相对较少，掉单最主要的原因还是所谓的外部掉单。</p><p>外部掉单解决的关键点是<code>主动查询</code>，有两种常用的方案：<code>定时任务查询</code>和<code>延时消息查询</code>，前者简单一些，后者功能上更加出色。</p>`,33),o={href:"https://mp.weixin.qq.com/s/zMRXR-kVqvN5rqQxsV2HSA",target:"_blank",rel:"noopener noreferrer"};function p(b,h){const i=r("ExternalLinkIcon");return t(),d("div",null,[u,n("p",null,[e("说真的，服务端推送，看上去是一种很美好的方案，Web端可以使用Websocket，APP端可以用自定义Push，大家可以看看"),n("a",v,[e("7种实现web实时消息推送的方案"),l(i)]),e("。但实际上，推送的成功率经常不那么理想。")]),m,n("blockquote",null,[n("p",null,[e("参考链接："),n("a",o,[e("https://mp.weixin.qq.com/s/zMRXR-kVqvN5rqQxsV2HSA"),l(i)]),e("，出处：三分恶，整理：沉默王二")])])])}const y=a(c,[["render",p],["__file","qianfldshswzfyhzlllrhfzzfdd.html.vue"]]);export{y as default};
