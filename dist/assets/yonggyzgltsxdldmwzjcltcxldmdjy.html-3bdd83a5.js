import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as r,c as t,a as e,d as i,b as a,e as s}from"./app-1c5b5ce3.js";const c={},o={href:"https://mp.weixin.qq.com/s/CljCSezUgoBXb-T9wbIGww",target:"_blank",rel:"noopener noreferrer"},v=e("strong",null,"1100 多名",-1),u={href:"https://mp.weixin.qq.com/s/hXXBTPPkFj2VMg_GXqn4EA",target:"_blank",rel:"noopener noreferrer"},m=s(`<p>毕业五年多，一共待过3家公司，碰到各种各样的同事，见识过各种各样的代码，有优雅的，赏心悦目的，也有垃圾的，屎山一样的。因此，写这篇文章，来记录一下一个优秀的后端开发程序员，应该有哪些好的开发习惯。</p><h2 id="_1-注释尽可能全面-写有意义的注释" tabindex="-1"><a class="header-anchor" href="#_1-注释尽可能全面-写有意义的注释" aria-hidden="true">#</a> 1.注释尽可能全面,写有意义的注释</h2><p>接口方法、类、复杂的业务逻辑，都应该添加有意义的注释</p><ul><li>对于接口方法的注释，应该包含详细的入参和结果说明，有异常抛出的情况也要详细叙述</li><li>类的注释应该包含类的功能说明、作者和修改者。</li><li>如果是业务逻辑很复杂的代码，真的非常有必要写清楚注释。</li></ul><p>清楚的注释，更有利于后面的维护。</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/PoF8jo1PmpwzUcJibAJ2ibvG9KRfycQHj2xQuEehJqaQ04XeXQE3U2jiceLlRMhyWiczr7AfAJoTHFzUtbFT4dTrXQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_2-项目拆分合理的目录结构" tabindex="-1"><a class="header-anchor" href="#_2-项目拆分合理的目录结构" aria-hidden="true">#</a> 2.项目拆分合理的目录结构</h2><p>记得读大学那会，刚学做各种各样的管理系统，都是用<code>MVC</code>模式，也就是<code>controller、service、mapper、entity</code>。如果未来业务扩展，你没有拆分业务结构的话，很可能就会发现，一个<code>service</code>包下，有上百个服务。。。</p><p>正确的做法，如果服务过多，应该根据不同的业务进行划分，比如订单、登陆、积分等等</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/PoF8jo1PmpwzUcJibAJ2ibvG9KRfycQHj2maPuWGb0oyYkuAUXcCOZsqINjIibtk3c250VBTVP2bDibkk0UWLaLvdA/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>当然，你也可以根据不同的业务划分模块，比如建一个<code>moudles</code>包，然后按订单、登陆等业务划分，每个业务都有自己的<code>controller、service、mapper、entity</code>。</p><p>我们拆分的目的，就是<strong>让项目结构更清晰，可读性更强，更容易维护</strong>而已。</p><h2 id="_3-不在循环里远程调用、或者数据库操作-优先考虑批量进行。" tabindex="-1"><a class="header-anchor" href="#_3-不在循环里远程调用、或者数据库操作-优先考虑批量进行。" aria-hidden="true">#</a> 3. 不在循环里远程调用、或者数据库操作，优先考虑批量进行。</h2><p>远程操作或者数据库操作都是<strong>比较耗网络、IO资源</strong>的，所以尽量不在循环里远程调用、不在循环里操作数据库，能<strong>批量一次性查回来尽量不要循环多次去查</strong>。（但是呢，如果是操作数据库，也不要一次性查太多数据哈，可以分批500一次酱紫）。</p><p>正例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>remoteBatchQuery(param);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>反例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for(int i=0;i&lt;n;i++){
  remoteSingleQuery(param)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/PoF8jo1PmpwzUcJibAJ2ibvG9KRfycQHj27BO7ibP20KCp8uFLneGYLfUnwUa4WHlOedpSahVEV18klFyHBBShHlQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="_4-封装方法形参" tabindex="-1"><a class="header-anchor" href="#_4-封装方法形参" aria-hidden="true">#</a> 4. 封装方法形参</h2><p>如果你的方法参数过多，要封装一个对象出来。反例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void getUserInfo（String name,String age,String sex,String mobile,String idNo){
  // do something ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果参数很多，做新老接口兼容处理也比较麻烦。建议写个对象出来，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void getUserInfo（UserInfoParamDTO userInfoParamDTO){
  // do something ...
}

class UserInfoParamDTO{
  private String name;
  private String age; 
  private String sex;
  private String mobile;
  private String idNo;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-封装通用模板" tabindex="-1"><a class="header-anchor" href="#_5-封装通用模板" aria-hidden="true">#</a> 5. 封装通用模板</h2><p>一个优秀的后端开发，应该具备<strong>封装通用模板</strong>的编码能力。</p><p>我们来看一个业务需求：假设我们有这么一个业务场景：内部系统不同商户，调用我们系统接口，去跟外部第三方系统交互（http方式）。走类似这么一个流程，如下：</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/PoF8jo1PmpwzUcJibAJ2ibvG9KRfycQHj23ECiagicec6ASWicalZYD8ox6AzLaLvgPm8FicmjWq1f2WzUWmb3szXgRw/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>一个请求都会经历这几个流程：</p><ul><li>查询商户信息</li><li>对请求报文加签</li><li>发送http请求出去</li><li>对返回的报文验签</li></ul><p>通过HTTP发请求出去时，有的商户可能是<strong>走代理</strong>的，有的是走直连。假设当前有A，B商户接入，不少伙伴可能这么实现，伪代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 商户A处理句柄
CompanyAHandler implements RequestHandler {
   Resp hander(req){
   //查询商户信息
   queryMerchantInfo();
   //加签
   signature();
   //http请求（A商户假设走的是代理）
   httpRequestbyProxy()
   //验签
   verify();
   }
}
// 商户B处理句柄
CompanyBHandler implements RequestHandler {
   Resp hander(Rreq){
   //查询商户信息
   queryMerchantInfo();
   //加签
   signature();
   // http请求（B商户不走代理，直连）
   httpRequestbyDirect();
   // 验签
   verify(); 
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设新加一个C商户接入，你需要再实现一套这样的代码。显然，这样代码就重复了。这时候我们可以<strong>封装一个通用模板</strong>！我们就可以定义一个抽象类，包含请求流程的几个方法，伪代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>abstract class AbstractMerchantService  { 

     //模板方法流程
     Resp handlerTempPlate(req){
           //查询商户信息
           queryMerchantInfo();
           //加签
           signature();
           //http 请求
           httpRequest();
           // 验签
           verifySinature();
     }
      // Http是否走代理（提供给子类实现）
      abstract boolean isRequestByProxy();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后所有商户接入，都做这个流程。如果这个通用模板是你抽取的，别的小伙伴接到开发任务，都是接入你的模板，是不是会有点自豪呀，哈哈~</p><p><strong>封装通用模板</strong>，就是抽个模板模式嘛？其实不仅仅是，而是自己对<strong>需求、代码的思考与总结</strong>，一种<strong>编程思想的升华</strong>。</p><h2 id="_6-封装复杂的逻辑判断条件" tabindex="-1"><a class="header-anchor" href="#_6-封装复杂的逻辑判断条件" aria-hidden="true">#</a> 6. 封装复杂的逻辑判断条件</h2><p>我们来看下这段代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void test(UserStatus userStatus){
    if (userStatus != UserStatus.BANNED &amp;&amp; userStatus != UserStatus.DELETED &amp;&amp; userStatus != UserStatus.FROZEN) {
        //doSomeThing
        return
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码有什么问题呢？是的，<strong>逻辑判断条件太复杂啦，我们可以封装一下它</strong>。如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void test(UserStatus userStatus){
    if (isUserActive(userStatus)) {
        //doSomeThing
    }
}

private boolean isUserActive(UserStatus userStatus) {
    return userStatus != UserStatus.BANNED &amp;&amp; userStatus != UserStatus.DELETED &amp;&amp; userStatus != UserStatus.FROZEN;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_7-保持优化性能的嗅觉" tabindex="-1"><a class="header-anchor" href="#_7-保持优化性能的嗅觉" aria-hidden="true">#</a> 7. 保持优化性能的嗅觉</h2><p>优秀的后端开发，应该保持优化性能的嗅觉。比如<code>避免创建比必要的对象、异步处理、使用缓冲流，减少IO操作</code>等等。</p><p>比如，我们设计一个<code>APP</code>首页的接口，它需要<code>查用户信息、需要查banner信息、需要查弹窗信息</code>等等。假设耗时如下：</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/PoF8jo1PmpwzUcJibAJ2ibvG9KRfycQHj29EIA1ScuN7qgQqTbVdqZR6YpDQrTXHnbNVsibmShp0SqfGSFZadLXRA/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>查用户信息<code>200</code>ms，查banner信息<code>100</code>ms、查弹窗信息<code>50</code>ms，那一共就耗时<code>350</code>ms了。如果还查其他信息，那耗时就更大了。如何优化它呢？可以并行发起，耗时可以降为<code>200</code>ms。如下：</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/PoF8jo1PmpwzUcJibAJ2ibvG9KRfycQHj2AibYhWBc4nV60xuicPQmMfIuvejZq798Z7Ckgvj1VDhkicRa4FR1Xibia9w/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,47),b={href:"https://mp.weixin.qq.com/s?__biz=Mzg3NzU5NTIwNg==&mid=2247499504&idx=1&sn=bb62226e6cffeb1859efb0100c796050&chksm=cf2221d9f855a8cf23f75cb51c1a407578fb0f279e96ddae74b5b8c84f2f5dc71762425b17cb&token=1305910004&lang=zh_CN&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},p=s(`<h2 id="_8-可变参数的配置化处理" tabindex="-1"><a class="header-anchor" href="#_8-可变参数的配置化处理" aria-hidden="true">#</a> 8. 可变参数的配置化处理</h2><p>日常开发中，我们经常会遇到一些可变参数，比如<code>用户多少天没登录注销</code>、<code>运营活动，不同节日红包皮肤切换、订单多久没付款就删除</code>等等。对于这些可变的参数，不用该直接写死在代码。优秀的后端，要做配置化处理，你可以把这些可变参数，放到数据库一个配置表里面，也可以放到项目的配置文件或者<code>apollo</code>上。</p><p>比如产品经理提了个红包需求，圣诞节的时候，红包皮肤为圣诞节相关的，春节的时候，为春节红包皮肤等。如果在代码写死控制，可有类似以下代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if(duringChristmas){
   img = redPacketChristmasSkin;
}else if(duringSpringFestival){
   img =  redSpringFestivalSkin;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果到了元宵节的时候，运营小姐姐突然又有想法，红包皮肤换成灯笼相关的，这时候，是不是要去修改代码了，重新发布了？</p><blockquote><p>从一开始接口设计时，可以实现一张<strong>红包皮肤的配置表</strong>，将红包皮肤做成配置化呢？更换红包皮肤，只需修改一下表数据就好了。当然，还有一些场景适合一些配置化的参数：一个分页多少数量控制、某个抢红包多久时间过期这些，都可以搞到参数配置化表里面。这也是扩展性思想的一种体现。</p></blockquote><h2 id="_9-会总结并使用工具类。" tabindex="-1"><a class="header-anchor" href="#_9-会总结并使用工具类。" aria-hidden="true">#</a> 9. 会总结并使用工具类。</h2><p>很多小伙伴，判断一个<code>list</code>是否为空，会这么写：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (list == null || list.size() == 0) {
  return null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样写呢，逻辑是没什么问题的。但是更建议用工具类，比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (CollectionUtils.isEmpty(list)) {
   return null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日常开发中，我们既要会用工具类，更要学会自己去总结工具类。比如去文件处理工具类、日期处理工具类等等。这些都是优秀后端开发的一些好习惯。</p><h2 id="_10-控制方法函数复杂度" tabindex="-1"><a class="header-anchor" href="#_10-控制方法函数复杂度" aria-hidden="true">#</a> 10. 控制方法函数复杂度</h2><p>你的方法不要<strong>写得太复杂，逻辑不要混乱，也不要太长</strong>。一个函数不能超过80行。写代码不仅仅是能跑就行，而是为了以后更好的维护。</p><p>反例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Test {
    private String name;
    private Vector&lt;Order&gt; orders = new Vector&lt;Order&gt;();

    public void printOwing() {
        //print banner
        System.out.println(&quot;****************&quot;);
        System.out.println(&quot;*****customer Owes *****&quot;);
        System.out.println(&quot;****************&quot;);

        //calculate totalAmount
        Enumeration env = orders.elements();
        double totalAmount = 0.0;
        while (env.hasMoreElements()) {
            Order order = (Order) env.nextElement();
            totalAmount += order.getAmout();
        }

        //print details
        System.out.println(&quot;name:&quot; + name);
        System.out.println(&quot;amount:&quot; + totalAmount);
        ......
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实可以使用<code>Extract Method</code>，抽取功能单一的代码段，组成命名清晰的小函数，去解决长函数问题，正例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Test {
    private String name;
    private Vector&lt;Order&gt; orders = new Vector&lt;Order&gt;();

    public void printOwing() {

        //print banner
        printBanner();
        //calculate totalAmount
        double totalAmount = getTotalAmount();
        //print details
        printDetail(totalAmount);
    }

    void printBanner(){
        System.out.println(&quot;****************&quot;);
        System.out.println(&quot;*****customer Owes *****&quot;);
        System.out.println(&quot;****************&quot;);
    }

    double getTotalAmount(){
        Enumeration env = orders.elements();
        double totalAmount = 0.0;
        while (env.hasMoreElements()) {
            Order order = (Order) env.nextElement();
            totalAmount += order.getAmout();
        }
        return totalAmount;
    }

    void printDetail(double totalAmount){
        System.out.println(&quot;name:&quot; + name);
        System.out.println(&quot;amount:&quot; + totalAmount);
    }   
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_11-在finally块中对资源进行释放" tabindex="-1"><a class="header-anchor" href="#_11-在finally块中对资源进行释放" aria-hidden="true">#</a> 11. 在finally块中对资源进行释放</h2><p>应该大家都有过这样的经历，<code>windows</code>系统桌面如果打开太多文件或者系统软件，就会觉得电脑很卡。当然，我们<code>linux</code>服务器也一样，平时操作文件，或者数据库连接，<code>IO</code>资源流如果没关闭，那么这个<code>IO</code>资源就会被它占着，这样别人就没有办法用了，这就造成资源浪费。</p><p>我们操作完文件资源，需要在在finally块中对资源进行释放。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FileInputStream fdIn = null;
try {
    fdIn = new FileInputStream(new File(&quot;/公众号_捡田螺的小男孩.txt&quot;));
} catch (FileNotFoundException e) {
    log.error(e);
} catch (IOException e) {
    log.error(e);
}finally {
    try {
        if (fdIn != null) {
            fdIn.close();
        }
    } catch (IOException e) {
        log.error(e);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12-把日志打印好" tabindex="-1"><a class="header-anchor" href="#_12-把日志打印好" aria-hidden="true">#</a> 12.把日志打印好</h2><p>日常开发中，一定需要把日志打印好。比如：你实现转账业务，转个几百万，然后转失败了，接着客户投诉，然后你还没有打印到日志，想想那种水深火热的困境下，你却毫无办法。。。</p><p>一般情况，方法入参、出参需要打印日志，异常的时候，也要打印日志等等，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void transfer(TransferDTO transferDTO){
    log.info(&quot;invoke tranfer begin&quot;);
    //打印入参
    log.info(&quot;invoke tranfer,paramters:{}&quot;,transferDTO);
    try {
      res=  transferService.transfer(transferDTO);
    }catch(Exception e){
     log.error(&quot;transfer fail,account：{}&quot;,
     transferDTO.getAccount（）)
     log.error(&quot;transfer fail,exception:{}&quot;,e);
    }
    log.info(&quot;invoke tranfer end&quot;);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26),g={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247504853&idx=1&sn=ffaa47daf4ee3908e438629b6a245740&chksm=903bd7b8a74c5eaedbf11af43101b8a2acc14b17a0dc6f79b99043cf9ae936c0da849ff1f896&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},h=s(`<h2 id="_13-考虑异常-处理好异常" tabindex="-1"><a class="header-anchor" href="#_13-考虑异常-处理好异常" aria-hidden="true">#</a> 13. 考虑异常，处理好异常</h2><p>优秀的后端开发，应当考虑到异常，并做好异常处理。田螺哥给大家提了10个异常处理的建议：</p><ul><li>尽量不要使用<code>e.printStackTrace()</code>,而是使用<code>log</code>打印。因为<code>e.printStackTrace()</code>语句可能会导致内存占满。</li><li><code>catch</code>住异常时，建议打印出具体的<code>exception</code>，利于更好定位问题</li><li>不要用一个<code>Exception</code>捕捉所有可能的异常</li><li>记得使用<code>finally</code>关闭流资源或者直接使用<code>try-with-resource</code>。</li><li>捕获异常与抛出异常必须是完全匹配，或者捕获异常是抛异常的父类</li><li>捕获到的异常，不能忽略它，至少打点日志吧</li><li>注意异常对你的代码层次结构的侵染</li><li>自定义封装异常，不要丢弃原始异常的信息<code>Throwable cause</code></li><li>运行时异常<code>RuntimeException</code> ，不应该通过<code>catch</code>的方式来处理，而是先预检查，比如：<code>NullPointerException</code>处理</li><li>注意异常匹配的顺序，优先捕获具体的异常</li></ul><h2 id="_14-考虑系统、接口的兼容性" tabindex="-1"><a class="header-anchor" href="#_14-考虑系统、接口的兼容性" aria-hidden="true">#</a> 14. 考虑系统、接口的兼容性</h2><p>优秀的后端开发，会考虑系统、接口的兼容性。</p><p>如果修改了对外旧接口，但是却不做兼容。这个问题可能比较严重，甚至会直接导致系统发版失败的。新手程序员很容易犯这个错误哦~</p><figure><img src="https://mmbiz.qpic.cn/mmbiz_png/PoF8jo1PmpwzUcJibAJ2ibvG9KRfycQHj212GNGFr7cIWibsD1ZHOayGXjstlJJ25B9ibmSd3bmm0ypXa9R0b0T3BQ/640?wx_fmt=png&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>因此，如果你的需求是在原来接口上修改，尤其这个接口是对外提供服务的话，一定要考虑接口兼容。举个例子吧，比如<code>dubbo</code>接口，原本是只接收<code>A，B</code>参数，现在你加了一个参数<code>C</code>，就可以考虑这样处理：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//老接口
void oldService(A,B){
  //兼容新接口，传个null代替C
  newService(A,B,null);
}

//新接口，暂时不能删掉老接口，需要做兼容。
void newService(A,B,C){
  ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_15-采取措施避免运行时错误" tabindex="-1"><a class="header-anchor" href="#_15-采取措施避免运行时错误" aria-hidden="true">#</a> 15. 采取措施避免运行时错误</h2><p>优秀的后端开发，应该在编写代码阶段，就采取措施，<strong>避免运行时错误</strong>，如数组边界溢出，被零整除，空指针等运行时错误。类似代码比较常见:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String name = list.get(1).getName(); //list可能越界，因为不一定有2个元素哈
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所以，应该采取措施，预防一下数组边界溢出，正例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if(CollectionsUtil.isNotEmpty(list)&amp;&amp; list.size()&gt;1){
  String name = list.get(1).getName(); 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p>没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟🤔。</p>`,16),f={href:"https://mp.weixin.qq.com/s/q-o4SBZQ3SH62T0c52aBUw",target:"_blank",rel:"noopener noreferrer"},x={href:"https://mp.weixin.qq.com/s/4Zcd16hMazydelrN6CUXBA",target:"_blank",rel:"noopener noreferrer"},_={href:"https://mp.weixin.qq.com/s/LKkvcSdhMyXAGgtqEak0Zw",target:"_blank",rel:"noopener noreferrer"},q={href:"https://mp.weixin.qq.com/s/mrSxrQYaWiUE82tBUu3XIw",target:"_blank",rel:"noopener noreferrer"},w={href:"https://mp.weixin.qq.com/s/eyCEQKclRkTnsJze01Bilg",target:"_blank",rel:"noopener noreferrer"},y={href:"https://mp.weixin.qq.com/s/Dv_kcwUT-KTZ6LAwn3o_Jg",target:"_blank",rel:"noopener noreferrer"},S={href:"https://mp.weixin.qq.com/s/yYWD0VPZ_NoGPOmhoa-OlQ",target:"_blank",rel:"noopener noreferrer"},z={href:"https://mp.weixin.qq.com/s/OHXpEOKcLaKW8h0TS4Xqjg",target:"_blank",rel:"noopener noreferrer"},A={href:"https://mp.weixin.qq.com/s/6YuyA1Ja5RfDEQatfsQpjA",target:"_blank",rel:"noopener noreferrer"},k={href:"https://mp.weixin.qq.com/s/EW95wdK4SM0CiBEJqUP7Mg",target:"_blank",rel:"noopener noreferrer"},E={href:"https://mp.weixin.qq.com/s/PmVwFKsXkGeJjmNPiu5hrQ",target:"_blank",rel:"noopener noreferrer"},T=e("figure",null,[e("img",{src:"https://files.mdnice.com/user/3903/b7e50cf4-6fca-4511-9bfd-aa1ed9eb587b.png",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1);function U(P,O){const n=d("ExternalLinkIcon");return r(),t("div",null,[e("blockquote",null,[e("p",null,[e("a",o,[i("二哥的编程星球"),a(n)]),i("已经有 "),v,i(" 球友加入了，如果你也需要一个良好的学习氛围，"),e("a",u,[i("戳链接"),a(n)]),i("加入我们吧！这是一个编程学习指南+ Java项目实战+LeetCode 刷题的私密圈子，你可以阅读星球专栏、向二哥提问、帮你制定学习计划、和球友一起打卡成长，冲冲冲。")])]),m,e("p",null,[i("之前我写过一篇后端思维的文章，手把手教大家如何抽并行调用框架，大家可以看下："),e("a",b,[i("后端思维篇：手把手教你写一个并行调用模板"),a(n)])]),p,e("p",null,[i("之前写过一篇打印日志的15个建议，大家可以看看哈：   "),e("a",g,[i("别再乱打日志了，这份 Java 日志规范，应有尽有，建议收藏！！"),a(n)])]),h,e("ul",null,[e("li",null,[i("✌️："),e("a",f,[i("工作四年，被动醒悟"),a(n)])]),e("li",null,[i("✌️："),e("a",x,[i("来网易四个月，真的不一样"),a(n)])]),e("li",null,[i("✌️："),e("a",_,[i("秋招 13 家 offer，手到擒来"),a(n)])]),e("li",null,[i("✌️："),e("a",q,[i("考研失败，真的不甘心"),a(n)])]),e("li",null,[i("✌️："),e("a",w,[i("想春招找个实习，我该如何准备？"),a(n)])]),e("li",null,[i("✌️："),e("a",y,[i("逼签！冲字节还是苟同花顺？"),a(n)])]),e("li",null,[i("✌️："),e("a",S,[i("简历上写了这俩项目，超级加分！"),a(n)])]),e("li",null,[i("✌️："),e("a",z,[i("双非很菜，拿到这俩offer挺不容易"),a(n)])]),e("li",null,[i("✌️："),e("a",A,[i("今年嵌入式软件这块真挺香"),a(n)])]),e("li",null,[i("✌️："),e("a",k,[i("入职 15 天，就想跑路了？"),a(n)])]),e("li",null,[i("✌️："),e("a",E,[i("比亚迪，救了我秋招的命"),a(n)])])]),T])}const j=l(c,[["render",U],["__file","yonggyzgltsxdldmwzjcltcxldmdjy.html.vue"]]);export{j as default};
