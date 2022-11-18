import{_ as d}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as s,a as i,d as e,b as r,e as l,r as t}from"./app.99eb8281.js";const c={},o={href:"https://mp.weixin.qq.com/s?__biz=MzkwODE5ODM0Ng==&mid=2247491980&idx=1&sn=22c357da998773d57115d71c3f5708c3&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},v=l(`<blockquote><p>关注公众号「<strong>三分恶</strong>」，回复「<strong>666</strong>」，领取七百多页独家原创的面试手册！</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-ruhfzcfxd-2e3b7041-d317-4e79-9241-3dc098828a02.jpg" alt="" loading="lazy"></p><p>面渣逆袭手册</p></blockquote><h1 id="用户下单流程" tabindex="-1"><a class="header-anchor" href="#用户下单流程" aria-hidden="true">#</a> 用户下单流程</h1><p>我们从用户浏览商品开始，看看用户下单的简要过程：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-ruhfzcfxd-85e704f6-c73f-4881-8d30-ac80057f7bc3.jpg" alt="" loading="lazy"></p><p>用户下单简要过程</p><ul><li>浏览商品：用户查看商品详情</li><li>加购/结算：用户可以选择直接购买商品，也可以先加入购物车，用户购买的这一步就是结算</li><li>确认下单：结算完成，就进入了下单页面，<code>提交订单</code>，这一步就会生成一个订单，然后进入付款页面</li></ul><p>我们可以看到，下单是发生在结算之后，下单之后，会生成唯一的订单号，接下来，客户端需要用这个订单号去完成支付。</p><p>那接下来先看看，为什么发生重复下单？</p><h1 id="为什么会重复下单" tabindex="-1"><a class="header-anchor" href="#为什么会重复下单" aria-hidden="true">#</a> 为什么会重复下单</h1><p>为什么会重复下单，对于订单服务而言，就是接到了多个下单的请求，原因可能有很多，最常见的是这两种：</p><ul><li>用户重复提交</li><li>网络原因导致的超时重试</li></ul><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-ruhfzcfxd-99b57ecc-6aa5-4100-ba56-63565c2dc037.jpg" alt="" loading="lazy"></p><p>重复下单原因</p><h1 id="如何防止重复下单" tabindex="-1"><a class="header-anchor" href="#如何防止重复下单" aria-hidden="true">#</a> 如何防止重复下单</h1><p>防止用户提交，最常规的做法，就是客户端点击下单之后，在收到服务端响应之前，按钮置灰。</p><p>当然，防止重复下单，肯定不能只依靠客户端，可能会因为一些网络的抖动，导致仍然有重复的请求到达服务端，所以还是要在服务端做防重/幂等的处理。</p><p>PS：这里额外插入一点我对防重和幂等的理解：防重指的是防止重复提交，幂等指的是多次请求如一次，简单说，就是防重可以给对重复请求抛异常，幂等是对重复的请求响应第一次的结果，在我们讨论的这个场景里，幂等就是响应唯一的订单号。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-ruhfzcfxd-5a6a4a1d-66df-4fe7-80e9-fc6e2bd27bfd.jpg" alt="" loading="lazy"></p><p>防重和幂等</p><p>防重第一步，需要识别请求是否重复，这一步，需要客户端配合实现。</p><p>为什么呢？大家想一下，下单的时候，服务端怎么去判断这个下单请求是否唯一呢？金额？商品？优惠券？……万一用户就是喜欢，又下了一个一模一样的单呢？</p><p>所以，需要客户端在请求下单接口的时候，需要生成一个唯一的请求号：<code>requestId</code>，服务端拿这个请求号，判断是否重复请求。</p><p>那么，接下来，压力就给到服务端了，看看服务端怎么实现防重/幂等吧！</p><h2 id="利用数据库实现幂等" tabindex="-1"><a class="header-anchor" href="#利用数据库实现幂等" aria-hidden="true">#</a> 利用数据库实现幂等</h2><p>可以在订单表<code>t_order</code>里添加一个字段：<code>requestId</code>，添加唯一索引：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-ruhfzcfxd-0f6232ba-4e09-4ef8-a56a-076de147575f.jpg" alt="" loading="lazy"></p><p>唯一请求字段</p><p>这样一来，如果是重复的请求，在落库的时候就会报错，为了保证幂等性，我们可以catch住这个异常，根据requestId获取订单号，然后向客户端响应订单号。</p><p>大概的代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>PlaceOrderResVO placeOrder(PlaceOrderReqVO reqVO) {
  try {
    //下单业务逻辑
    ……
    //生成订单号
    String oid=generateOid();
    ……
    //订单落库
    Order order = orderMapper.saveOrder(orderDO); 
    //响应订单
    resVO.setOid(order.getOid());
    return resVO;
  } catch(UniqueKeyViolationException e) {
    // 发生了重复异常
    // 根据请求号获取订单
    Order order = getOrderByRequestId(reqVO.getRequestId());
    resVO.setOid(order.getOid());
    return resVO;
  } catch (Exception e) {
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，这里不太好的地方是，拿异常来做业务判断。</p><h2 id="利用redis防重" tabindex="-1"><a class="header-anchor" href="#利用redis防重" aria-hidden="true">#</a> 利用Redis防重</h2><p>另外一个办法，就是下单请求的时候要加锁了，通常我们的服务都是集群部署，所以一般都是用Redis实现分布式锁。</p><p>大概的逻辑：</p><ul><li>就是以<code>requestId</code>为维度，进行加锁，如果获取锁失败，就抛一个自定义的重复下单异常。</li><li>如果获取到锁，先check一下，是否已经下单，为了提高性能，下单完成后，也把下单的结果放在Redis缓存里。</li></ul><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-ruhfzcfxd-0083bd11-12c2-4894-bb81-d0cd4cd82148.jpg" alt="" loading="lazy"></p><p>redis防重逻辑</p><p>大概的代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public PlaceOrderResVO placeOrder(PlaceOrderReqVO reqVO) {
        //加锁
        RLock orderLock = redissonClient.getLock(RedisConstant.PLACE_ORDER_LOCK_KEY + reqVO.getRequestId());
        //获取锁失败，抛出重复下单异常
        if(orderLock.isExistes){
          throw new OrderRepeatException();
        }
        // 加锁
        orderLock.lock();
        try {
            //检查是否已经下单
            RBucket&lt;PlaceOrderResVO&gt; orderCache = redissonClient.getBucket(RedisConstant.PLACE_ORDER_LOCK_KEY+reqVO.getRequestId());
            if(orderCache.isExistes){
                return orderCache.get();
            }
            //下单业务逻辑
            ……
            //落库
            //订单落库
            Order order = orderMapper.saveOrder(orderDO); 
            ……
            //缓存结果
            orderCache.put(resVO);
            return resVO;
        } 
        } catch (Exception e) {
            //……
        } finally {
            orderLock.unlock();
        }
        return resVO;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里再说明一下：</p><ul><li>为什么获取不到锁的时候要抛异常呢？</li></ul><p>因为下单里面其实还有一些其它的业务流程，比如锁库存、清优惠券……而此时，获取到锁的请求的下单流程还没有结束，下单的结果还获取不到，没法完成响应，也就没办法做幂等。</p><p>客户端，也可以根据响应的状态码，进行特殊处理，比如这个异常先不提示，但是允许用户再次点击下单按钮，来提升用户的体验。</p><hr><p>好了，这一篇简单的小文章就这样结束了。</p><p>最近工作实在太忙了，基本上每天都是九点多、十点多下班，写新的文章，还有《面渣逆袭手册》的维护，都会努力抽时间去做，谢谢大家的理解和支持！</p><hr><p><strong>参考：</strong></p>`,48),p={href:"https://blog.csdn.net/yangguosb/article/details/106095858",target:"_blank",rel:"noopener noreferrer"},u={href:"https://cloud.tencent.com/developer/article/1121727",target:"_blank",rel:"noopener noreferrer"},b=i("p",null,"- END -",-1),m={href:"https://mp.weixin.qq.com/s/Dc_4taB6Boojdw_0mngroQ",target:"_blank",rel:"noopener noreferrer"};function h(g,f){const n=t("ExternalLinkIcon");return a(),s("div",null,[i("p",null,[e("大家好，我是老三，上一篇我们聊了 "),i("a",o,[e("如何防止订单重复支付"),r(n)]),e(" 这篇和大家聊聊如何防止重复下单，文章很短，大概只需要几分钟阅读。")]),v,i("p",null,[e("[1]. 重复下单："),i("a",p,[e("https://blog.csdn.net/yangguosb/article/details/106095858"),r(n)]),e(")")]),i("p",null,[e("[2]. 用幂等防止重复订单："),i("a",u,[e("https://cloud.tencent.com/developer/article/1121727"),r(n)])]),b,i("blockquote",null,[i("p",null,[e("转载链接："),i("a",m,[e("https://mp.weixin.qq.com/s/Dc_4taB6Boojdw_0mngroQ"),r(n)]),e("，出处：三分恶，整理：沉默王二")])])])}const x=d(c,[["render",h],["__file","ruhfzcfxd.html.vue"]]);export{x as default};
