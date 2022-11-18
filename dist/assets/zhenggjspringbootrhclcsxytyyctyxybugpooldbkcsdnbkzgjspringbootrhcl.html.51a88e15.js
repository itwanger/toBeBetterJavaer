import{_ as d}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as r,a as e,d as n,b as t,e as o,r as l}from"./app.99eb8281.js";const s={},c=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/csdn-zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl-69c3cc92-4d31-467b-a15d-33e43fd4bade.png",alt:"",loading:"lazy"})],-1),u=e("br",null,null,-1),v={href:"https://tobebetterjavaer.com",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,"大家好，我是二哥呀！",-1),b=e("p",null,[n("本篇主要要介绍的就是"),e("code",null,"controller"),n("层的处理，一个完整的后端请求由4部分组成：1. "),e("code",null,"接口地址"),n("(也就是URL地址)、2. "),e("code",null,"请求方式"),n("(一般就是get、set，当然还有put、delete)、3. "),e("code",null,"请求数据"),n("(request，有head跟body)、4. "),e("code",null,"响应数据"),n("(response)")],-1),m={href:"https://blog.csdn.net/chaitoudaren/article/details/105610962",target:"_blank",rel:"noopener noreferrer"},g=o(`<p>本篇将解决以下3个问题：</p><ol><li>当接收到请求时，如何优雅的校验参数</li><li>返回响应数据该如何统一的进行处理</li><li>接收到请求，处理业务逻辑时抛出了异常又该如何处理</li></ol><h2 id="一、controller层参数接收-太基础了-可以跳过" tabindex="-1"><a class="header-anchor" href="#一、controller层参数接收-太基础了-可以跳过" aria-hidden="true">#</a> 一、Controller层参数接收（太基础了，可以跳过）</h2><p>常见的请求就分为<code>get</code>跟<code>post</code>2种</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestController
@RequestMapping(&quot;/product/product-info&quot;)
public class ProductInfoController {

    @Autowired
    ProductInfoService productInfoService;

    @GetMapping(&quot;/findById&quot;)
    public ProductInfoQueryVo findById(Integer id) {
        ...
    }

    @PostMapping(&quot;/page&quot;)
    public IPage findPage(Page page, ProductInfoQueryVo vo) {
        ...
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>@RestController</code>：之前解释过，<code>@RestController</code> = <code>@Controller</code> + <code>ResponseBody</code>。加上这个注解，springboot就会吧这个类当成<code>controller</code>进行处理，然后把所有返回的参数放到<code>ResponseBody</code>中</li><li><code>@RequestMapping</code>：请求的前缀，也就是所有该<code>Controller</code>下的请求都需要加上<code>/product/product-info</code>的前缀</li><li><code>@GetMapping(&quot;/findById&quot;)</code>：标志这是一个<code>get</code>请求，并且需要通过<code>/findById</code>地址才可以访问到</li><li><code>@PostMapping(&quot;/page&quot;)</code>：同理，表示是个<code>post</code>请求</li><li><code>参数</code>：至于参数部分，只需要写上<code>ProductInfoQueryVo</code>，前端过来的<code>json</code>请求便会通过映射赋值到对应的对象中，例如请求这么写，<code>productId</code>就会自动被映射到<code>vo</code>对应的属性当中</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>size : 1
current : 1

productId : 1
productName : 泡脚
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、统一状态码" tabindex="-1"><a class="header-anchor" href="#二、统一状态码" aria-hidden="true">#</a> 二、统一状态码</h2><h3 id="_1-返回格式" tabindex="-1"><a class="header-anchor" href="#_1-返回格式" aria-hidden="true">#</a> 1. 返回格式</h3><p>为了跟<code>前端妹妹</code>打好关系，我们通常需要对后端返回的数据进行包装一下，增加一下<code>状态码</code>，<code>状态信息</code>，这样前端妹妹接收到数据就可以根据不同的<code>状态码</code>，判断<code>响应数据状态</code>，是否成功是否异常进行不同的显示。当然这让你拥有了更多跟前端妹妹的交流机会，假设我们约定了<code>1000</code>就是成功的意思</p><p>如果你不封装，那么返回的数据是这样子的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;productId&quot;: 1,
  &quot;productName&quot;: &quot;泡脚&quot;,
  &quot;productPrice&quot;: 100.00,
  &quot;productDescription&quot;: &quot;中药泡脚加按摩&quot;,
  &quot;productStatus&quot;: 0,
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过封装以后时这样子的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;code&quot;: 1000,
  &quot;msg&quot;: &quot;请求成功&quot;,
  &quot;data&quot;: {
    &quot;productId&quot;: 1,
    &quot;productName&quot;: &quot;泡脚&quot;,
    &quot;productPrice&quot;: 100.00,
    &quot;productDescription&quot;: &quot;中药泡脚加按摩&quot;,
    &quot;productStatus&quot;: 0,
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-封装resultvo" tabindex="-1"><a class="header-anchor" href="#_2-封装resultvo" aria-hidden="true">#</a> 2. 封装ResultVo</h3><p>这些状态码肯定都是要预先编好的，怎么编呢？写个常量<code>1000</code>？还是直接写死<code>1000</code>？要这么写就真的书白读的了，写<code>状态码</code>当然是用枚举拉</p><ol><li>首先先定义一个<code>状态码</code>的接口，所有<code>状态码</code>都需要实现它，有了标准才好做事</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface StatusCode {
    public int getCode();
    public String getMsg();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>然后去找前端妹妹，跟他约定好状态码（这可能是你们唯一的约定了）枚举类嘛，当然不能有<code>setter</code>方法了，因此我们不能在用<code>@Data</code>注解了，我们要用<code>@Getter</code></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Getter
public enum ResultCode implements StatusCode{
    SUCCESS(1000, &quot;请求成功&quot;),
    FAILED(1001, &quot;请求失败&quot;),
    VALIDATE_ERROR(1002, &quot;参数校验失败&quot;),
    RESPONSE_PACK_ERROR(1003, &quot;response返回包装失败&quot;);

    private int code;
    private String msg;

    ResultCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>写好枚举类，就开始写<code>ResultVo</code>包装类了，我们预设了几种默认的方法，比如成功的话就默认传入<code>object</code>就可以了，我们自动包装成<code>success</code></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
public class ResultVo {
    // 状态码
    private int code;

    // 状态信息
    private String msg;

    // 返回对象
    private Object data;

    // 手动设置返回vo
    public ResultVo(int code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    // 默认返回成功状态码，数据对象
    public ResultVo(Object data) {
        this.code = ResultCode.SUCCESS.getCode();
        this.msg = ResultCode.SUCCESS.getMsg();
        this.data = data;
    }

    // 返回指定状态码，数据对象
    public ResultVo(StatusCode statusCode, Object data) {
        this.code = statusCode.getCode();
        this.msg = statusCode.getMsg();
        this.data = data;
    }

    // 只返回状态码
    public ResultVo(StatusCode statusCode) {
        this.code = statusCode.getCode();
        this.msg = statusCode.getMsg();
        this.data = null;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>使用，现在的返回肯定就不是<code>return data;</code>这么简单了，而是需要<code>new ResultVo(data);</code></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@PostMapping(&quot;/findByVo&quot;)
    public ResultVo findByVo(@Validated ProductInfoVo vo) {
        ProductInfo productInfo = new ProductInfo();
        BeanUtils.copyProperties(vo, productInfo);
        return new ResultVo(productInfoService.getOne(new QueryWrapper(productInfo)));
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后返回就会是上面带了状态码的数据了</p><h2 id="三、统一校验" tabindex="-1"><a class="header-anchor" href="#三、统一校验" aria-hidden="true">#</a> 三、统一校验</h2><h3 id="_1-原始做法" tabindex="-1"><a class="header-anchor" href="#_1-原始做法" aria-hidden="true">#</a> 1. 原始做法</h3><p>假设有一个添加<code>ProductInfo</code>的接口，在没有统一校验时，我们需要这么做</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
public class ProductInfoVo {
    // 商品名称
    private String productName;
    // 商品价格
    private BigDecimal productPrice;
    // 上架状态
    private Integer productStatus;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@PostMapping(&quot;/findByVo&quot;)
    public ProductInfo findByVo(ProductInfoVo vo) {
        if (StringUtils.isNotBlank(vo.getProductName())) {
            throw new APIException(&quot;商品名称不能为空&quot;);
        }
        if (null != vo.getProductPrice() &amp;&amp; vo.getProductPrice().compareTo(new BigDecimal(0)) &lt; 0) {
            throw new APIException(&quot;商品价格不能为负数&quot;);
        }
        ...
        
        ProductInfo productInfo = new ProductInfo();
        BeanUtils.copyProperties(vo, productInfo);
        return new ResultVo(productInfoService.getOne(new QueryWrapper(productInfo)));
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这if写的人都傻了，能忍吗？肯定不能忍啊</p><h3 id="_2-validated参数校验" tabindex="-1"><a class="header-anchor" href="#_2-validated参数校验" aria-hidden="true">#</a> 2. @Validated参数校验</h3><p>好在有<code>@Validated</code>，又是一个校验参数必备良药了。有了<code>@Validated</code>我们只需要再<code>vo</code>上面加一点小小的注解，便可以完成校验功能</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
public class ProductInfoVo {
    @NotNull(message = &quot;商品名称不允许为空&quot;)
    private String productName;

    @Min(value = 0, message = &quot;商品价格不允许为负数&quot;)
    private BigDecimal productPrice;

    private Integer productStatus;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@PostMapping(&quot;/findByVo&quot;)
    public ProductInfo findByVo(@Validated ProductInfoVo vo) {
        ProductInfo productInfo = new ProductInfo();
        BeanUtils.copyProperties(vo, productInfo);
        return new ResultVo(productInfoService.getOne(new QueryWrapper(productInfo)));
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行看看，如果参数不对会发生什么？</p><p>我们故意传一个价格为<code>-1</code>的参数过去</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>productName : 泡脚
productPrice : -1
productStatus : 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;timestamp&quot;: &quot;2020-04-19T03:06:37.268+0000&quot;,
  &quot;status&quot;: 400,
  &quot;error&quot;: &quot;Bad Request&quot;,
  &quot;errors&quot;: [
    {
      &quot;codes&quot;: [
        &quot;Min.productInfoVo.productPrice&quot;,
        &quot;Min.productPrice&quot;,
        &quot;Min.java.math.BigDecimal&quot;,
        &quot;Min&quot;
      ],
      &quot;arguments&quot;: [
        {
          &quot;codes&quot;: [
            &quot;productInfoVo.productPrice&quot;,
            &quot;productPrice&quot;
          ],
          &quot;defaultMessage&quot;: &quot;productPrice&quot;,
          &quot;code&quot;: &quot;productPrice&quot;
        },
        0
      ],
      &quot;defaultMessage&quot;: &quot;商品价格不允许为负数&quot;,
      &quot;objectName&quot;: &quot;productInfoVo&quot;,
      &quot;field&quot;: &quot;productPrice&quot;,
      &quot;rejectedValue&quot;: -1,
      &quot;bindingFailure&quot;: false,
      &quot;code&quot;: &quot;Min&quot;
    }
  ],
  &quot;message&quot;: &quot;Validation failed for object\\u003d\\u0027productInfoVo\\u0027. Error count: 1&quot;,
  &quot;trace&quot;: &quot;org.springframework.validation.BindException: org.springframework.validation.BeanPropertyBindingResult: 1 errors\\nField error in object \\u0027productInfoVo\\u0027 on field \\u0027productPrice\\u0027: rejected value [-1]; codes [Min.productInfoVo.productPrice,Min.productPrice,Min.java.math.BigDecimal,Min]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [productInfoVo.productPrice,productPrice]; arguments []; default message [productPrice],0]; default message [商品价格不允许为负数]\\n\\tat org.springframework.web.method.annotation.ModelAttributeMethodProcessor.resolveArgument(ModelAttributeMethodProcessor.java:164)\\n\\tat org.springframework.web.method.support.HandlerMethodArgumentResolverComposite.resolveArgument(HandlerMethodArgumentResolverComposite.java:121)\\n\\tat org.springframework.web.method.support.InvocableHandlerMethod.getMethodArgumentValues(InvocableHandlerMethod.java:167)\\n\\tat org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:134)\\n\\tat org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:105)\\n\\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:879)\\n\\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:793)\\n\\tat org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)\\n\\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1040)\\n\\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:943)\\n\\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1006)\\n\\tat org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:909)\\n\\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:660)\\n\\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:883)\\n\\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:741)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:53)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat com.alibaba.druid.support.http.WebStatFilter.doFilter(WebStatFilter.java:124)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)\\n\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)\\n\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)\\n\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:202)\\n\\tat org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96)\\n\\tat org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:541)\\n\\tat org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:139)\\n\\tat org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:92)\\n\\tat org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74)\\n\\tat org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:343)\\n\\tat org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:373)\\n\\tat org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:65)\\n\\tat org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:868)\\n\\tat org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1594)\\n\\tat org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)\\n\\tat java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)\\n\\tat java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)\\n\\tat org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)\\n\\tat java.base/java.lang.Thread.run(Thread.java:830)\\n&quot;,
  &quot;path&quot;: &quot;/leilema/product/product-info/findByVo&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大功告成了吗？虽然成功校验了参数，也返回了异常，并且带上<code>&quot;商品价格不允许为负数&quot;</code>的信息。但是你要是这样返回给前端，前端妹妹就提刀过来了，当年约定好的<code>状态码</code>，你个<code>负心人</code>说忘就忘？用户<code>体验小于等于0</code>啊！所以我们要进行优化一下，每次出现异常的时候，自动把<code>状态码</code>写好，不负妹妹之约！</p><h3 id="_3-优化异常处理" tabindex="-1"><a class="header-anchor" href="#_3-优化异常处理" aria-hidden="true">#</a> 3. 优化异常处理</h3><p>首先我们先看看校验参数抛出了什么异常</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Resolved [org.springframework.validation.BindException: org.springframework.validation.BeanPropertyBindingResult: 1 errors
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们看到代码抛出了<code>org.springframework.validation.BindException</code>的绑定异常，因此我们的思路就是<code>AOP</code>拦截所有<code>controller</code>，然后异常的时候统一拦截起来，进行封装！完美！</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/csdn-zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl-48412c36-e140-4a00-9eb4-b90d2accb8a5.png" alt="" loading="lazy"></p><p>玩你个头啊完美，这么呆瓜的操作<code>springboot</code>不知道吗？<code>spring mvc</code>当然知道拉，所以给我们提供了一个<code>@RestControllerAdvice</code>来增强所有<code>@RestController</code>，然后使用<code>@ExceptionHandler</code>注解，就可以拦截到对应的异常。</p><p>这里我们就拦截<code>BindException.class</code>就好了。最后在返回之前，我们对异常信息进行包装一下，包装成<code>ResultVo</code>，当然要跟上<code>ResultCode.VALIDATE_ERROR</code>的异常状态码。这样前端妹妹看到<code>VALIDATE_ERROR</code>的状态码，就会调用数据校验异常的弹窗提示用户哪里没填好</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestControllerAdvice
public class ControllerExceptionAdvice {

    @ExceptionHandler({BindException.class})
    public ResultVo MethodArgumentNotValidExceptionHandler(BindException e) {
        // 从异常对象中拿到ObjectError对象
        ObjectError objectError = e.getBindingResult().getAllErrors().get(0);
        return new ResultVo(ResultCode.VALIDATE_ERROR, objectError.getDefaultMessage());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>来康康效果，完美。<code>1002</code>与前端妹妹约定好的状态码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;code&quot;: 1002,
  &quot;msg&quot;: &quot;参数校验失败&quot;,
  &quot;data&quot;: &quot;商品价格不允许为负数&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、统一响应" tabindex="-1"><a class="header-anchor" href="#四、统一响应" aria-hidden="true">#</a> 四、统一响应</h2><h3 id="_1-统一包装响应" tabindex="-1"><a class="header-anchor" href="#_1-统一包装响应" aria-hidden="true">#</a> 1. 统一包装响应</h3><p>再回头看一下<code>controller</code>层的返回</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>return new ResultVo(productInfoService.getOne(new QueryWrapper(productInfo)));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>开发小哥肯定不乐意了，谁有空天天写<code>new ResultVo(data)</code>啊，我就想返回一个实体！怎么实现我不管！好把，那就是<code>AOP</code>拦截所有<code>Controller</code>，再<code>@After</code>的时候统一帮你封装一下咯</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/csdn-zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl-48412c36-e140-4a00-9eb4-b90d2accb8a5.png" alt="" loading="lazy"></p><p>怕是上一次脸打的不够疼，springboot能不知道这么个操作吗？</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestControllerAdvice(basePackages = {&quot;com.bugpool.leilema&quot;})
public class ControllerResponseAdvice implements ResponseBodyAdvice&lt;Object&gt; {
    @Override
    public boolean supports(MethodParameter methodParameter, Class&lt;? extends HttpMessageConverter&lt;?&gt;&gt; aClass) {
        // response是ResultVo类型，或者注释了NotControllerResponseAdvice都不进行包装
        return !methodParameter.getParameterType().isAssignableFrom(ResultVo.class);
    }

    @Override
    public Object beforeBodyWrite(Object data, MethodParameter returnType, MediaType mediaType, Class&lt;? extends HttpMessageConverter&lt;?&gt;&gt; aClass, ServerHttpRequest request, ServerHttpResponse response) {
        // String类型不能直接包装
        if (returnType.getGenericParameterType().equals(String.class)) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                // 将数据包装在ResultVo里后转换为json串进行返回
                return objectMapper.writeValueAsString(new ResultVo(data));
            } catch (JsonProcessingException e) {
                throw new APIException(ResultCode.RESPONSE_PACK_ERROR, e.getMessage());
            }
        }
        // 否则直接包装成ResultVo返回
        return new ResultVo(data);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>@RestControllerAdvice(basePackages = {&quot;com.bugpool.leilema&quot;})</code>自动扫描了所有指定包下的<code>controller</code>，在<code>Response</code>时进行统一处理</li><li>重写<code>supports</code>方法，也就是说，当返回类型已经是<code>ResultVo</code>了，那就不需要封装了，当不等与<code>ResultVo</code>时才进行调用<code>beforeBodyWrite</code>方法，跟过滤器的效果是一样的</li><li>最后重写我们的封装方法<code>beforeBodyWrite</code>，注意除了<code>String</code>的返回值有点特殊，无法直接封装成json，我们需要进行特殊处理，其他的直接<code>new ResultVo(data);</code>就ok了</li></ol><p>打完收工，康康效果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@PostMapping(&quot;/findByVo&quot;)
    public ProductInfo findByVo(@Validated ProductInfoVo vo) {
        ProductInfo productInfo = new ProductInfo();
        BeanUtils.copyProperties(vo, productInfo);
        return productInfoService.getOne(new QueryWrapper(productInfo));
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时就算我们返回的是<code>po</code>，接收到的返回就是标准格式了，开发小哥露出了欣慰的笑容</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;code&quot;: 1000,
  &quot;msg&quot;: &quot;请求成功&quot;,
  &quot;data&quot;: {
    &quot;productId&quot;: 1,
    &quot;productName&quot;: &quot;泡脚&quot;,
    &quot;productPrice&quot;: 100.00,
    &quot;productDescription&quot;: &quot;中药泡脚加按摩&quot;,
    &quot;productStatus&quot;: 0,
    ...
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-not统一响应" tabindex="-1"><a class="header-anchor" href="#_2-not统一响应" aria-hidden="true">#</a> 2. NOT统一响应</h3><h4 id="不开启统一响应原因" tabindex="-1"><a class="header-anchor" href="#不开启统一响应原因" aria-hidden="true">#</a> 不开启统一响应原因</h4><p>开发小哥是开心了，可是其他系统就不开心了。举个例子：我们项目中集成了一个<code>健康检测</code>的功能，也就是这货</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestController
public class HealthController {
    @GetMapping(&quot;/health&quot;)
    public String health() {
        return &quot;success&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>公司部署了一套校验所有系统存活状态的工具，这工具就定时发送<code>get</code>请求给我们系统</p><blockquote><p>“兄弟，你死了吗？”</p><p>“我没死，滚”</p><p>“兄弟，你死了吗？”</p><p>“我没死，滚”</p></blockquote><p>是的，web项目的本质就是复读机。一旦发送的请求<code>没响应</code>，就会给负责人发信息（企业微信或者短信之类的），你的<code>系统死啦</code>！赶紧回来<code>排查bug</code>吧！让大家感受一下。每次看到我都<code>射射发抖</code>，早上6点！我tm！！！！！</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/csdn-zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl-9abb673b-9a5a-4a63-b103-089e5460da12.png" alt="监控" loading="lazy"></p><p>好吧，没办法，人家是老大，人家要的返回不是</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;code&quot;: 1000,
  &quot;msg&quot;: &quot;请求成功&quot;,
  &quot;data&quot;: &quot;success&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>人家要的返回只要一个<code>success</code>，人家定的标准不可能因为你一个系统改。俗话说的好，如果你改变不了环境，那你就只能我****</p><h4 id="新增不进行封装注解" tabindex="-1"><a class="header-anchor" href="#新增不进行封装注解" aria-hidden="true">#</a> 新增不进行封装注解</h4><p>因为百分之99的请求还是需要包装的，只有个别不需要，写在包装的过滤器吧？又不是很好维护，那就加个注解好了。所有不需要包装的就加上这个注解。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface NotControllerResponseAdvice {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在我们的增强过滤方法上过滤包含这个注解的方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestControllerAdvice(basePackages = {&quot;com.bugpool.leilema&quot;})
public class ControllerResponseAdvice implements ResponseBodyAdvice&lt;Object&gt; {
    @Override
    public boolean supports(MethodParameter methodParameter, Class&lt;? extends HttpMessageConverter&lt;?&gt;&gt; aClass) {
        // response是ResultVo类型，或者注释了NotControllerResponseAdvice都不进行包装
        return !(methodParameter.getParameterType().isAssignableFrom(ResultVo.class)
                || methodParameter.hasMethodAnnotation(NotControllerResponseAdvice.class));
    }
    ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后就在不需要包装的方法上加上注解</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestController
public class HealthController {

    @GetMapping(&quot;/health&quot;)
    @NotControllerResponseAdvice
    public String health() {
        return &quot;success&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候就不会自动封装了，而其他没加注解的则依旧自动包装</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/csdn-zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl-67f4a389-dfe5-4275-aab3-3ae149603e6a.png" alt="noResponseAdvice" loading="lazy"></p><h2 id="五、统一异常" tabindex="-1"><a class="header-anchor" href="#五、统一异常" aria-hidden="true">#</a> 五、统一异常</h2><p>每个系统都会有自己的<code>业务异常</code>，比如<code>库存不能小于0</code>子类的，这种异常并非程序异常，而是业务操作引发的异常，我们也需要进行规范的编排业务<code>异常状态码</code>，并且写一个专门处理的<code>异常类</code>，最后通过刚刚学习过的<code>异常拦截</code>统一进行处理，以及打<code>日志</code></p><ol><li>异常状态码枚举，既然是状态码，那就肯定要实现我们的标准接口<code>StatusCode</code></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Getter
public enum  AppCode implements StatusCode {

    APP_ERROR(2000, &quot;业务异常&quot;),
    PRICE_ERROR(2001, &quot;价格异常&quot;);

    private int code;
    private String msg;

    AppCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>异常类，这里需要强调一下，<code>code</code>代表<code>AppCode</code>的异常状态码，也就是2000；<code>msg</code>代表<code>业务异常</code>，这只是一个大类，一般前端会放到弹窗<code>title</code>上；最后<code>super(message);</code>这才是抛出的详细信息，在前端显示在<code>弹窗体</code>中，在<code>ResultVo</code>则保存在<code>data</code>中</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Getter
public class APIException extends RuntimeException {
    private int code;
    private String msg;

    // 手动设置异常
    public APIException(StatusCode statusCode, String message) {
        // message用于用户设置抛出错误详情，例如：当前价格-5，小于0
        super(message);
        // 状态码
        this.code = statusCode.getCode();
        // 状态码配套的msg
        this.msg = statusCode.getMsg();
    }

    // 默认异常使用APP_ERROR状态码
    public APIException(String message) {
        super(message);
        this.code = AppCode.APP_ERROR.getCode();
        this.msg = AppCode.APP_ERROR.getMsg();
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>最后进行统一异常的拦截，这样无论在<code>service</code>层还是<code>controller</code>层，开发人员只管抛出<code>API异常</code>，不需要关系怎么返回给前端，更不需要关心<code>日志</code>的打印</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestControllerAdvice
public class ControllerExceptionAdvice {

    @ExceptionHandler({BindException.class})
    public ResultVo MethodArgumentNotValidExceptionHandler(BindException e) {
        // 从异常对象中拿到ObjectError对象
        ObjectError objectError = e.getBindingResult().getAllErrors().get(0);
        return new ResultVo(ResultCode.VALIDATE_ERROR, objectError.getDefaultMessage());
    }

    @ExceptionHandler(APIException.class)
    public ResultVo APIExceptionHandler(APIException e) {
        // log.error(e.getMessage(), e); 由于还没集成日志框架，暂且放着，写上TODO
        return new ResultVo(e.getCode(), e.getMsg(), e.getMessage());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>最后使用，我们的代码只需要这么写</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (null == orderMaster) {
            throw new APIException(AppCode.ORDER_NOT_EXIST, &quot;订单号不存在：&quot; + orderId);
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;code&quot;: 2003,
  &quot;msg&quot;: &quot;订单不存在&quot;,
  &quot;data&quot;: &quot;订单号不存在：1998&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>就会自动抛出<code>AppCode.ORDER_NOT_EXIST</code>状态码的响应，并且带上异常详细信息<code>订单号不存在：xxxx</code>。后端小哥开发有效率，前端妹妹获取到<code>2003</code>状态码，调用对应警告弹窗，<code>title</code>写上<code>订单不存在</code>，<code>body</code>详细信息记载<code>&quot;订单号不存在：1998&quot;</code>。同时<code>日志</code>还自动打上去了！</p><hr>`,96),h=e("strong",null,"数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关",-1),q={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},x=e("p",null,[n("关注二哥的原创公众号 "),e("strong",null,"沉默王二"),n("，回复"),e("strong",null,"111"),n(" 即可免费领取。")],-1),f=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1);function R(P,C){const i=l("ExternalLinkIcon");return a(),r("div",null,[c,e("p",null,[n("作者：沉默王二"),u,n(" Java 程序员进阶之路："),e("a",v,[n("https://tobebetterjavaer.com"),t(i)])]),p,b,e("blockquote",null,[e("p",null,[n("文章链接："),e("a",m,[n("https://blog.csdn.net/chaitoudaren/article/details/105610962"),t(i)]),n(" 作者：bugpool 整理：沉默王二")])]),g,e("p",null,[n("最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 "),h,n(" 等等等等……详情戳："),e("a",q,[n("可以说是2022年全网最全的学习和找工作的PDF资源了"),t(i)])]),x,f])}const I=d(s,[["render",R],["__file","zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl.html.vue"]]);export{I as default};
