import{_ as d}from"./plugin-vue_export-helper.21dcd24c.js";import{r as t,o as a,c as r,a as e,b as o,e as s,d as n}from"./app.85cbe1c4.js";const l={},c=s(`<p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/csdn-zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl-69c3cc92-4d31-467b-a15d-33e43fd4bade.png" alt=""></p><p>\u4F5C\u8005\uFF1A\u6C89\u9ED8\u738B\u4E8C<br> Java \u7A0B\u5E8F\u5458\u8FDB\u9636\u4E4B\u8DEF\uFF1Ahttps://tobebetterjavaer.com</p><p>\u5927\u5BB6\u597D\uFF0C\u6211\u662F\u4E8C\u54E5\u5440\uFF01</p><p>\u672C\u7BC7\u4E3B\u8981\u8981\u4ECB\u7ECD\u7684\u5C31\u662F<code>controller</code>\u5C42\u7684\u5904\u7406\uFF0C\u4E00\u4E2A\u5B8C\u6574\u7684\u540E\u7AEF\u8BF7\u6C42\u75314\u90E8\u5206\u7EC4\u6210\uFF1A1. <code>\u63A5\u53E3\u5730\u5740</code>(\u4E5F\u5C31\u662FURL\u5730\u5740)\u30012. <code>\u8BF7\u6C42\u65B9\u5F0F</code>(\u4E00\u822C\u5C31\u662Fget\u3001set\uFF0C\u5F53\u7136\u8FD8\u6709put\u3001delete)\u30013. <code>\u8BF7\u6C42\u6570\u636E</code>(request\uFF0C\u6709head\u8DDFbody)\u30014. <code>\u54CD\u5E94\u6570\u636E</code>(response)</p><blockquote><p>\u6587\u7AE0\u94FE\u63A5\uFF1Ahttps://blog.csdn.net/chaitoudaren/article/details/105610962 \u4F5C\u8005\uFF1Abugpool \u6574\u7406\uFF1A\u6C89\u9ED8\u738B\u4E8C</p></blockquote><p>\u672C\u7BC7\u5C06\u89E3\u51B3\u4EE5\u4E0B3\u4E2A\u95EE\u9898\uFF1A</p><ol><li>\u5F53\u63A5\u6536\u5230\u8BF7\u6C42\u65F6\uFF0C\u5982\u4F55\u4F18\u96C5\u7684\u6821\u9A8C\u53C2\u6570</li><li>\u8FD4\u56DE\u54CD\u5E94\u6570\u636E\u8BE5\u5982\u4F55\u7EDF\u4E00\u7684\u8FDB\u884C\u5904\u7406</li><li>\u63A5\u6536\u5230\u8BF7\u6C42\uFF0C\u5904\u7406\u4E1A\u52A1\u903B\u8F91\u65F6\u629B\u51FA\u4E86\u5F02\u5E38\u53C8\u8BE5\u5982\u4F55\u5904\u7406</li></ol><h2 id="\u4E00\u3001controller\u5C42\u53C2\u6570\u63A5\u6536-\u592A\u57FA\u7840\u4E86-\u53EF\u4EE5\u8DF3\u8FC7" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001controller\u5C42\u53C2\u6570\u63A5\u6536-\u592A\u57FA\u7840\u4E86-\u53EF\u4EE5\u8DF3\u8FC7" aria-hidden="true">#</a> \u4E00\u3001Controller\u5C42\u53C2\u6570\u63A5\u6536\uFF08\u592A\u57FA\u7840\u4E86\uFF0C\u53EF\u4EE5\u8DF3\u8FC7\uFF09</h2><p>\u5E38\u89C1\u7684\u8BF7\u6C42\u5C31\u5206\u4E3A<code>get</code>\u8DDF<code>post</code>2\u79CD</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RestController
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>@RestController</code>\uFF1A\u4E4B\u524D\u89E3\u91CA\u8FC7\uFF0C<code>@RestController</code> = <code>@Controller</code> + <code>ResponseBody</code>\u3002\u52A0\u4E0A\u8FD9\u4E2A\u6CE8\u89E3\uFF0Cspringboot\u5C31\u4F1A\u5427\u8FD9\u4E2A\u7C7B\u5F53\u6210<code>controller</code>\u8FDB\u884C\u5904\u7406\uFF0C\u7136\u540E\u628A\u6240\u6709\u8FD4\u56DE\u7684\u53C2\u6570\u653E\u5230<code>ResponseBody</code>\u4E2D</li><li><code>@RequestMapping</code>\uFF1A\u8BF7\u6C42\u7684\u524D\u7F00\uFF0C\u4E5F\u5C31\u662F\u6240\u6709\u8BE5<code>Controller</code>\u4E0B\u7684\u8BF7\u6C42\u90FD\u9700\u8981\u52A0\u4E0A<code>/product/product-info</code>\u7684\u524D\u7F00</li><li><code>@GetMapping(&quot;/findById&quot;)</code>\uFF1A\u6807\u5FD7\u8FD9\u662F\u4E00\u4E2A<code>get</code>\u8BF7\u6C42\uFF0C\u5E76\u4E14\u9700\u8981\u901A\u8FC7<code>/findById</code>\u5730\u5740\u624D\u53EF\u4EE5\u8BBF\u95EE\u5230</li><li><code>@PostMapping(&quot;/page&quot;)</code>\uFF1A\u540C\u7406\uFF0C\u8868\u793A\u662F\u4E2A<code>post</code>\u8BF7\u6C42</li><li><code>\u53C2\u6570</code>\uFF1A\u81F3\u4E8E\u53C2\u6570\u90E8\u5206\uFF0C\u53EA\u9700\u8981\u5199\u4E0A<code>ProductInfoQueryVo</code>\uFF0C\u524D\u7AEF\u8FC7\u6765\u7684<code>json</code>\u8BF7\u6C42\u4FBF\u4F1A\u901A\u8FC7\u6620\u5C04\u8D4B\u503C\u5230\u5BF9\u5E94\u7684\u5BF9\u8C61\u4E2D\uFF0C\u4F8B\u5982\u8BF7\u6C42\u8FD9\u4E48\u5199\uFF0C<code>productId</code>\u5C31\u4F1A\u81EA\u52A8\u88AB\u6620\u5C04\u5230<code>vo</code>\u5BF9\u5E94\u7684\u5C5E\u6027\u5F53\u4E2D</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>size : 1
current : 1

productId : 1
productName : \u6CE1\u811A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4E8C\u3001\u7EDF\u4E00\u72B6\u6001\u7801" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001\u7EDF\u4E00\u72B6\u6001\u7801" aria-hidden="true">#</a> \u4E8C\u3001\u7EDF\u4E00\u72B6\u6001\u7801</h2><h3 id="_1-\u8FD4\u56DE\u683C\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-\u8FD4\u56DE\u683C\u5F0F" aria-hidden="true">#</a> 1. \u8FD4\u56DE\u683C\u5F0F</h3><p>\u4E3A\u4E86\u8DDF<code>\u524D\u7AEF\u59B9\u59B9</code>\u6253\u597D\u5173\u7CFB\uFF0C\u6211\u4EEC\u901A\u5E38\u9700\u8981\u5BF9\u540E\u7AEF\u8FD4\u56DE\u7684\u6570\u636E\u8FDB\u884C\u5305\u88C5\u4E00\u4E0B\uFF0C\u589E\u52A0\u4E00\u4E0B<code>\u72B6\u6001\u7801</code>\uFF0C<code>\u72B6\u6001\u4FE1\u606F</code>\uFF0C\u8FD9\u6837\u524D\u7AEF\u59B9\u59B9\u63A5\u6536\u5230\u6570\u636E\u5C31\u53EF\u4EE5\u6839\u636E\u4E0D\u540C\u7684<code>\u72B6\u6001\u7801</code>\uFF0C\u5224\u65AD<code>\u54CD\u5E94\u6570\u636E\u72B6\u6001</code>\uFF0C\u662F\u5426\u6210\u529F\u662F\u5426\u5F02\u5E38\u8FDB\u884C\u4E0D\u540C\u7684\u663E\u793A\u3002\u5F53\u7136\u8FD9\u8BA9\u4F60\u62E5\u6709\u4E86\u66F4\u591A\u8DDF\u524D\u7AEF\u59B9\u59B9\u7684\u4EA4\u6D41\u673A\u4F1A\uFF0C\u5047\u8BBE\u6211\u4EEC\u7EA6\u5B9A\u4E86<code>1000</code>\u5C31\u662F\u6210\u529F\u7684\u610F\u601D</p><p>\u5982\u679C\u4F60\u4E0D\u5C01\u88C5\uFF0C\u90A3\u4E48\u8FD4\u56DE\u7684\u6570\u636E\u662F\u8FD9\u6837\u5B50\u7684</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
  &quot;productId&quot;: 1,
  &quot;productName&quot;: &quot;\u6CE1\u811A&quot;,
  &quot;productPrice&quot;: 100.00,
  &quot;productDescription&quot;: &quot;\u4E2D\u836F\u6CE1\u811A\u52A0\u6309\u6469&quot;,
  &quot;productStatus&quot;: 0,
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7ECF\u8FC7\u5C01\u88C5\u4EE5\u540E\u65F6\u8FD9\u6837\u5B50\u7684</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
  &quot;code&quot;: 1000,
  &quot;msg&quot;: &quot;\u8BF7\u6C42\u6210\u529F&quot;,
  &quot;data&quot;: {
    &quot;productId&quot;: 1,
    &quot;productName&quot;: &quot;\u6CE1\u811A&quot;,
    &quot;productPrice&quot;: 100.00,
    &quot;productDescription&quot;: &quot;\u4E2D\u836F\u6CE1\u811A\u52A0\u6309\u6469&quot;,
    &quot;productStatus&quot;: 0,
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-\u5C01\u88C5resultvo" tabindex="-1"><a class="header-anchor" href="#_2-\u5C01\u88C5resultvo" aria-hidden="true">#</a> 2. \u5C01\u88C5ResultVo</h3><p>\u8FD9\u4E9B\u72B6\u6001\u7801\u80AF\u5B9A\u90FD\u662F\u8981\u9884\u5148\u7F16\u597D\u7684\uFF0C\u600E\u4E48\u7F16\u5462\uFF1F\u5199\u4E2A\u5E38\u91CF<code>1000</code>\uFF1F\u8FD8\u662F\u76F4\u63A5\u5199\u6B7B<code>1000</code>\uFF1F\u8981\u8FD9\u4E48\u5199\u5C31\u771F\u7684\u4E66\u767D\u8BFB\u7684\u4E86\uFF0C\u5199<code>\u72B6\u6001\u7801</code>\u5F53\u7136\u662F\u7528\u679A\u4E3E\u62C9</p><ol><li>\u9996\u5148\u5148\u5B9A\u4E49\u4E00\u4E2A<code>\u72B6\u6001\u7801</code>\u7684\u63A5\u53E3\uFF0C\u6240\u6709<code>\u72B6\u6001\u7801</code>\u90FD\u9700\u8981\u5B9E\u73B0\u5B83\uFF0C\u6709\u4E86\u6807\u51C6\u624D\u597D\u505A\u4E8B</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public interface StatusCode {
    public int getCode();
    public String getMsg();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u7136\u540E\u53BB\u627E\u524D\u7AEF\u59B9\u59B9\uFF0C\u8DDF\u4ED6\u7EA6\u5B9A\u597D\u72B6\u6001\u7801\uFF08\u8FD9\u53EF\u80FD\u662F\u4F60\u4EEC\u552F\u4E00\u7684\u7EA6\u5B9A\u4E86\uFF09\u679A\u4E3E\u7C7B\u561B\uFF0C\u5F53\u7136\u4E0D\u80FD\u6709<code>setter</code>\u65B9\u6CD5\u4E86\uFF0C\u56E0\u6B64\u6211\u4EEC\u4E0D\u80FD\u5728\u7528<code>@Data</code>\u6CE8\u89E3\u4E86\uFF0C\u6211\u4EEC\u8981\u7528<code>@Getter</code></li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Getter
public enum ResultCode implements StatusCode{
    SUCCESS(1000, &quot;\u8BF7\u6C42\u6210\u529F&quot;),
    FAILED(1001, &quot;\u8BF7\u6C42\u5931\u8D25&quot;),
    VALIDATE_ERROR(1002, &quot;\u53C2\u6570\u6821\u9A8C\u5931\u8D25&quot;),
    RESPONSE_PACK_ERROR(1003, &quot;response\u8FD4\u56DE\u5305\u88C5\u5931\u8D25&quot;);

    private int code;
    private String msg;

    ResultCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>\u5199\u597D\u679A\u4E3E\u7C7B\uFF0C\u5C31\u5F00\u59CB\u5199<code>ResultVo</code>\u5305\u88C5\u7C7B\u4E86\uFF0C\u6211\u4EEC\u9884\u8BBE\u4E86\u51E0\u79CD\u9ED8\u8BA4\u7684\u65B9\u6CD5\uFF0C\u6BD4\u5982\u6210\u529F\u7684\u8BDD\u5C31\u9ED8\u8BA4\u4F20\u5165<code>object</code>\u5C31\u53EF\u4EE5\u4E86\uFF0C\u6211\u4EEC\u81EA\u52A8\u5305\u88C5\u6210<code>success</code></li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Data
public class ResultVo {
    // \u72B6\u6001\u7801
    private int code;

    // \u72B6\u6001\u4FE1\u606F
    private String msg;

    // \u8FD4\u56DE\u5BF9\u8C61
    private Object data;

    // \u624B\u52A8\u8BBE\u7F6E\u8FD4\u56DEvo
    public ResultVo(int code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    // \u9ED8\u8BA4\u8FD4\u56DE\u6210\u529F\u72B6\u6001\u7801\uFF0C\u6570\u636E\u5BF9\u8C61
    public ResultVo(Object data) {
        this.code = ResultCode.SUCCESS.getCode();
        this.msg = ResultCode.SUCCESS.getMsg();
        this.data = data;
    }

    // \u8FD4\u56DE\u6307\u5B9A\u72B6\u6001\u7801\uFF0C\u6570\u636E\u5BF9\u8C61
    public ResultVo(StatusCode statusCode, Object data) {
        this.code = statusCode.getCode();
        this.msg = statusCode.getMsg();
        this.data = data;
    }

    // \u53EA\u8FD4\u56DE\u72B6\u6001\u7801
    public ResultVo(StatusCode statusCode) {
        this.code = statusCode.getCode();
        this.msg = statusCode.getMsg();
        this.data = null;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>\u4F7F\u7528\uFF0C\u73B0\u5728\u7684\u8FD4\u56DE\u80AF\u5B9A\u5C31\u4E0D\u662F<code>return data;</code>\u8FD9\u4E48\u7B80\u5355\u4E86\uFF0C\u800C\u662F\u9700\u8981<code>new ResultVo(data);</code></li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@PostMapping(&quot;/findByVo&quot;)
    public ResultVo findByVo(@Validated ProductInfoVo vo) {
        ProductInfo productInfo = new ProductInfo();
        BeanUtils.copyProperties(vo, productInfo);
        return new ResultVo(productInfoService.getOne(new QueryWrapper(productInfo)));
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6700\u540E\u8FD4\u56DE\u5C31\u4F1A\u662F\u4E0A\u9762\u5E26\u4E86\u72B6\u6001\u7801\u7684\u6570\u636E\u4E86</p><h2 id="\u4E09\u3001\u7EDF\u4E00\u6821\u9A8C" tabindex="-1"><a class="header-anchor" href="#\u4E09\u3001\u7EDF\u4E00\u6821\u9A8C" aria-hidden="true">#</a> \u4E09\u3001\u7EDF\u4E00\u6821\u9A8C</h2><h3 id="_1-\u539F\u59CB\u505A\u6CD5" tabindex="-1"><a class="header-anchor" href="#_1-\u539F\u59CB\u505A\u6CD5" aria-hidden="true">#</a> 1. \u539F\u59CB\u505A\u6CD5</h3><p>\u5047\u8BBE\u6709\u4E00\u4E2A\u6DFB\u52A0<code>ProductInfo</code>\u7684\u63A5\u53E3\uFF0C\u5728\u6CA1\u6709\u7EDF\u4E00\u6821\u9A8C\u65F6\uFF0C\u6211\u4EEC\u9700\u8981\u8FD9\u4E48\u505A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Data
public class ProductInfoVo {
    // \u5546\u54C1\u540D\u79F0
    private String productName;
    // \u5546\u54C1\u4EF7\u683C
    private BigDecimal productPrice;
    // \u4E0A\u67B6\u72B6\u6001
    private Integer productStatus;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@PostMapping(&quot;/findByVo&quot;)
    public ProductInfo findByVo(ProductInfoVo vo) {
        if (StringUtils.isNotBlank(vo.getProductName())) {
            throw new APIException(&quot;\u5546\u54C1\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A&quot;);
        }
        if (null != vo.getProductPrice() &amp;&amp; vo.getProductPrice().compareTo(new BigDecimal(0)) &lt; 0) {
            throw new APIException(&quot;\u5546\u54C1\u4EF7\u683C\u4E0D\u80FD\u4E3A\u8D1F\u6570&quot;);
        }
        ...
        
        ProductInfo productInfo = new ProductInfo();
        BeanUtils.copyProperties(vo, productInfo);
        return new ResultVo(productInfoService.getOne(new QueryWrapper(productInfo)));
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9if\u5199\u7684\u4EBA\u90FD\u50BB\u4E86\uFF0C\u80FD\u5FCD\u5417\uFF1F\u80AF\u5B9A\u4E0D\u80FD\u5FCD\u554A</p><h3 id="_2-validated\u53C2\u6570\u6821\u9A8C" tabindex="-1"><a class="header-anchor" href="#_2-validated\u53C2\u6570\u6821\u9A8C" aria-hidden="true">#</a> 2. @Validated\u53C2\u6570\u6821\u9A8C</h3><p>\u597D\u5728\u6709<code>@Validated</code>\uFF0C\u53C8\u662F\u4E00\u4E2A\u6821\u9A8C\u53C2\u6570\u5FC5\u5907\u826F\u836F\u4E86\u3002\u6709\u4E86<code>@Validated</code>\u6211\u4EEC\u53EA\u9700\u8981\u518D<code>vo</code>\u4E0A\u9762\u52A0\u4E00\u70B9\u5C0F\u5C0F\u7684\u6CE8\u89E3\uFF0C\u4FBF\u53EF\u4EE5\u5B8C\u6210\u6821\u9A8C\u529F\u80FD</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Data
public class ProductInfoVo {
    @NotNull(message = &quot;\u5546\u54C1\u540D\u79F0\u4E0D\u5141\u8BB8\u4E3A\u7A7A&quot;)
    private String productName;

    @Min(value = 0, message = &quot;\u5546\u54C1\u4EF7\u683C\u4E0D\u5141\u8BB8\u4E3A\u8D1F\u6570&quot;)
    private BigDecimal productPrice;

    private Integer productStatus;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@PostMapping(&quot;/findByVo&quot;)
    public ProductInfo findByVo(@Validated ProductInfoVo vo) {
        ProductInfo productInfo = new ProductInfo();
        BeanUtils.copyProperties(vo, productInfo);
        return new ResultVo(productInfoService.getOne(new QueryWrapper(productInfo)));
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD0\u884C\u770B\u770B\uFF0C\u5982\u679C\u53C2\u6570\u4E0D\u5BF9\u4F1A\u53D1\u751F\u4EC0\u4E48\uFF1F</p><p>\u6211\u4EEC\u6545\u610F\u4F20\u4E00\u4E2A\u4EF7\u683C\u4E3A<code>-1</code>\u7684\u53C2\u6570\u8FC7\u53BB</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>productName : \u6CE1\u811A
productPrice : -1
productStatus : 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
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
      &quot;defaultMessage&quot;: &quot;\u5546\u54C1\u4EF7\u683C\u4E0D\u5141\u8BB8\u4E3A\u8D1F\u6570&quot;,
      &quot;objectName&quot;: &quot;productInfoVo&quot;,
      &quot;field&quot;: &quot;productPrice&quot;,
      &quot;rejectedValue&quot;: -1,
      &quot;bindingFailure&quot;: false,
      &quot;code&quot;: &quot;Min&quot;
    }
  ],
  &quot;message&quot;: &quot;Validation failed for object\\u003d\\u0027productInfoVo\\u0027. Error count: 1&quot;,
  &quot;trace&quot;: &quot;org.springframework.validation.BindException: org.springframework.validation.BeanPropertyBindingResult: 1 errors\\nField error in object \\u0027productInfoVo\\u0027 on field \\u0027productPrice\\u0027: rejected value [-1]; codes [Min.productInfoVo.productPrice,Min.productPrice,Min.java.math.BigDecimal,Min]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [productInfoVo.productPrice,productPrice]; arguments []; default message [productPrice],0]; default message [\u5546\u54C1\u4EF7\u683C\u4E0D\u5141\u8BB8\u4E3A\u8D1F\u6570]\\n\\tat org.springframework.web.method.annotation.ModelAttributeMethodProcessor.resolveArgument(ModelAttributeMethodProcessor.java:164)\\n\\tat org.springframework.web.method.support.HandlerMethodArgumentResolverComposite.resolveArgument(HandlerMethodArgumentResolverComposite.java:121)\\n\\tat org.springframework.web.method.support.InvocableHandlerMethod.getMethodArgumentValues(InvocableHandlerMethod.java:167)\\n\\tat org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:134)\\n\\tat org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:105)\\n\\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:879)\\n\\tat org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:793)\\n\\tat org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)\\n\\tat org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1040)\\n\\tat org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:943)\\n\\tat org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1006)\\n\\tat org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:909)\\n\\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:660)\\n\\tat org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:883)\\n\\tat javax.servlet.http.HttpServlet.service(HttpServlet.java:741)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:53)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat com.alibaba.druid.support.http.WebStatFilter.doFilter(WebStatFilter.java:124)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)\\n\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)\\n\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)\\n\\tat org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:119)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)\\n\\tat org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)\\n\\tat org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:202)\\n\\tat org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96)\\n\\tat org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:541)\\n\\tat org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:139)\\n\\tat org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:92)\\n\\tat org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74)\\n\\tat org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:343)\\n\\tat org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:373)\\n\\tat org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:65)\\n\\tat org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:868)\\n\\tat org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1594)\\n\\tat org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)\\n\\tat java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)\\n\\tat java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)\\n\\tat org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)\\n\\tat java.base/java.lang.Thread.run(Thread.java:830)\\n&quot;,
  &quot;path&quot;: &quot;/leilema/product/product-info/findByVo&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5927\u529F\u544A\u6210\u4E86\u5417\uFF1F\u867D\u7136\u6210\u529F\u6821\u9A8C\u4E86\u53C2\u6570\uFF0C\u4E5F\u8FD4\u56DE\u4E86\u5F02\u5E38\uFF0C\u5E76\u4E14\u5E26\u4E0A<code>&quot;\u5546\u54C1\u4EF7\u683C\u4E0D\u5141\u8BB8\u4E3A\u8D1F\u6570&quot;</code>\u7684\u4FE1\u606F\u3002\u4F46\u662F\u4F60\u8981\u662F\u8FD9\u6837\u8FD4\u56DE\u7ED9\u524D\u7AEF\uFF0C\u524D\u7AEF\u59B9\u59B9\u5C31\u63D0\u5200\u8FC7\u6765\u4E86\uFF0C\u5F53\u5E74\u7EA6\u5B9A\u597D\u7684<code>\u72B6\u6001\u7801</code>\uFF0C\u4F60\u4E2A<code>\u8D1F\u5FC3\u4EBA</code>\u8BF4\u5FD8\u5C31\u5FD8\uFF1F\u7528\u6237<code>\u4F53\u9A8C\u5C0F\u4E8E\u7B49\u4E8E0</code>\u554A\uFF01\u6240\u4EE5\u6211\u4EEC\u8981\u8FDB\u884C\u4F18\u5316\u4E00\u4E0B\uFF0C\u6BCF\u6B21\u51FA\u73B0\u5F02\u5E38\u7684\u65F6\u5019\uFF0C\u81EA\u52A8\u628A<code>\u72B6\u6001\u7801</code>\u5199\u597D\uFF0C\u4E0D\u8D1F\u59B9\u59B9\u4E4B\u7EA6\uFF01</p><h3 id="_3-\u4F18\u5316\u5F02\u5E38\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#_3-\u4F18\u5316\u5F02\u5E38\u5904\u7406" aria-hidden="true">#</a> 3. \u4F18\u5316\u5F02\u5E38\u5904\u7406</h3><p>\u9996\u5148\u6211\u4EEC\u5148\u770B\u770B\u6821\u9A8C\u53C2\u6570\u629B\u51FA\u4E86\u4EC0\u4E48\u5F02\u5E38</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Resolved [org.springframework.validation.BindException: org.springframework.validation.BeanPropertyBindingResult: 1 errors
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6211\u4EEC\u770B\u5230\u4EE3\u7801\u629B\u51FA\u4E86<code>org.springframework.validation.BindException</code>\u7684\u7ED1\u5B9A\u5F02\u5E38\uFF0C\u56E0\u6B64\u6211\u4EEC\u7684\u601D\u8DEF\u5C31\u662F<code>AOP</code>\u62E6\u622A\u6240\u6709<code>controller</code>\uFF0C\u7136\u540E\u5F02\u5E38\u7684\u65F6\u5019\u7EDF\u4E00\u62E6\u622A\u8D77\u6765\uFF0C\u8FDB\u884C\u5C01\u88C5\uFF01\u5B8C\u7F8E\uFF01</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/csdn-zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl-48412c36-e140-4a00-9eb4-b90d2accb8a5.png" alt=""></p><p>\u73A9\u4F60\u4E2A\u5934\u554A\u5B8C\u7F8E\uFF0C\u8FD9\u4E48\u5446\u74DC\u7684\u64CD\u4F5C<code>springboot</code>\u4E0D\u77E5\u9053\u5417\uFF1F<code>spring mvc</code>\u5F53\u7136\u77E5\u9053\u62C9\uFF0C\u6240\u4EE5\u7ED9\u6211\u4EEC\u63D0\u4F9B\u4E86\u4E00\u4E2A<code>@RestControllerAdvice</code>\u6765\u589E\u5F3A\u6240\u6709<code>@RestController</code>\uFF0C\u7136\u540E\u4F7F\u7528<code>@ExceptionHandler</code>\u6CE8\u89E3\uFF0C\u5C31\u53EF\u4EE5\u62E6\u622A\u5230\u5BF9\u5E94\u7684\u5F02\u5E38\u3002</p><p>\u8FD9\u91CC\u6211\u4EEC\u5C31\u62E6\u622A<code>BindException.class</code>\u5C31\u597D\u4E86\u3002\u6700\u540E\u5728\u8FD4\u56DE\u4E4B\u524D\uFF0C\u6211\u4EEC\u5BF9\u5F02\u5E38\u4FE1\u606F\u8FDB\u884C\u5305\u88C5\u4E00\u4E0B\uFF0C\u5305\u88C5\u6210<code>ResultVo</code>\uFF0C\u5F53\u7136\u8981\u8DDF\u4E0A<code>ResultCode.VALIDATE_ERROR</code>\u7684\u5F02\u5E38\u72B6\u6001\u7801\u3002\u8FD9\u6837\u524D\u7AEF\u59B9\u59B9\u770B\u5230<code>VALIDATE_ERROR</code>\u7684\u72B6\u6001\u7801\uFF0C\u5C31\u4F1A\u8C03\u7528\u6570\u636E\u6821\u9A8C\u5F02\u5E38\u7684\u5F39\u7A97\u63D0\u793A\u7528\u6237\u54EA\u91CC\u6CA1\u586B\u597D</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RestControllerAdvice
public class ControllerExceptionAdvice {

    @ExceptionHandler({BindException.class})
    public ResultVo MethodArgumentNotValidExceptionHandler(BindException e) {
        // \u4ECE\u5F02\u5E38\u5BF9\u8C61\u4E2D\u62FF\u5230ObjectError\u5BF9\u8C61
        ObjectError objectError = e.getBindingResult().getAllErrors().get(0);
        return new ResultVo(ResultCode.VALIDATE_ERROR, objectError.getDefaultMessage());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6765\u5EB7\u5EB7\u6548\u679C\uFF0C\u5B8C\u7F8E\u3002<code>1002</code>\u4E0E\u524D\u7AEF\u59B9\u59B9\u7EA6\u5B9A\u597D\u7684\u72B6\u6001\u7801</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
  &quot;code&quot;: 1002,
  &quot;msg&quot;: &quot;\u53C2\u6570\u6821\u9A8C\u5931\u8D25&quot;,
  &quot;data&quot;: &quot;\u5546\u54C1\u4EF7\u683C\u4E0D\u5141\u8BB8\u4E3A\u8D1F\u6570&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u56DB\u3001\u7EDF\u4E00\u54CD\u5E94" tabindex="-1"><a class="header-anchor" href="#\u56DB\u3001\u7EDF\u4E00\u54CD\u5E94" aria-hidden="true">#</a> \u56DB\u3001\u7EDF\u4E00\u54CD\u5E94</h2><h3 id="_1-\u7EDF\u4E00\u5305\u88C5\u54CD\u5E94" tabindex="-1"><a class="header-anchor" href="#_1-\u7EDF\u4E00\u5305\u88C5\u54CD\u5E94" aria-hidden="true">#</a> 1. \u7EDF\u4E00\u5305\u88C5\u54CD\u5E94</h3><p>\u518D\u56DE\u5934\u770B\u4E00\u4E0B<code>controller</code>\u5C42\u7684\u8FD4\u56DE</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>return new ResultVo(productInfoService.getOne(new QueryWrapper(productInfo)));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5F00\u53D1\u5C0F\u54E5\u80AF\u5B9A\u4E0D\u4E50\u610F\u4E86\uFF0C\u8C01\u6709\u7A7A\u5929\u5929\u5199<code>new ResultVo(data)</code>\u554A\uFF0C\u6211\u5C31\u60F3\u8FD4\u56DE\u4E00\u4E2A\u5B9E\u4F53\uFF01\u600E\u4E48\u5B9E\u73B0\u6211\u4E0D\u7BA1\uFF01\u597D\u628A\uFF0C\u90A3\u5C31\u662F<code>AOP</code>\u62E6\u622A\u6240\u6709<code>Controller</code>\uFF0C\u518D<code>@After</code>\u7684\u65F6\u5019\u7EDF\u4E00\u5E2E\u4F60\u5C01\u88C5\u4E00\u4E0B\u54AF</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/csdn-zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl-48412c36-e140-4a00-9eb4-b90d2accb8a5.png" alt=""></p><p>\u6015\u662F\u4E0A\u4E00\u6B21\u8138\u6253\u7684\u4E0D\u591F\u75BC\uFF0Cspringboot\u80FD\u4E0D\u77E5\u9053\u8FD9\u4E48\u4E2A\u64CD\u4F5C\u5417\uFF1F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RestControllerAdvice(basePackages = {&quot;com.bugpool.leilema&quot;})
public class ControllerResponseAdvice implements ResponseBodyAdvice&lt;Object&gt; {
    @Override
    public boolean supports(MethodParameter methodParameter, Class&lt;? extends HttpMessageConverter&lt;?&gt;&gt; aClass) {
        // response\u662FResultVo\u7C7B\u578B\uFF0C\u6216\u8005\u6CE8\u91CA\u4E86NotControllerResponseAdvice\u90FD\u4E0D\u8FDB\u884C\u5305\u88C5
        return !methodParameter.getParameterType().isAssignableFrom(ResultVo.class);
    }

    @Override
    public Object beforeBodyWrite(Object data, MethodParameter returnType, MediaType mediaType, Class&lt;? extends HttpMessageConverter&lt;?&gt;&gt; aClass, ServerHttpRequest request, ServerHttpResponse response) {
        // String\u7C7B\u578B\u4E0D\u80FD\u76F4\u63A5\u5305\u88C5
        if (returnType.getGenericParameterType().equals(String.class)) {
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                // \u5C06\u6570\u636E\u5305\u88C5\u5728ResultVo\u91CC\u540E\u8F6C\u6362\u4E3Ajson\u4E32\u8FDB\u884C\u8FD4\u56DE
                return objectMapper.writeValueAsString(new ResultVo(data));
            } catch (JsonProcessingException e) {
                throw new APIException(ResultCode.RESPONSE_PACK_ERROR, e.getMessage());
            }
        }
        // \u5426\u5219\u76F4\u63A5\u5305\u88C5\u6210ResultVo\u8FD4\u56DE
        return new ResultVo(data);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>@RestControllerAdvice(basePackages = {&quot;com.bugpool.leilema&quot;})</code>\u81EA\u52A8\u626B\u63CF\u4E86\u6240\u6709\u6307\u5B9A\u5305\u4E0B\u7684<code>controller</code>\uFF0C\u5728<code>Response</code>\u65F6\u8FDB\u884C\u7EDF\u4E00\u5904\u7406</li><li>\u91CD\u5199<code>supports</code>\u65B9\u6CD5\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u5F53\u8FD4\u56DE\u7C7B\u578B\u5DF2\u7ECF\u662F<code>ResultVo</code>\u4E86\uFF0C\u90A3\u5C31\u4E0D\u9700\u8981\u5C01\u88C5\u4E86\uFF0C\u5F53\u4E0D\u7B49\u4E0E<code>ResultVo</code>\u65F6\u624D\u8FDB\u884C\u8C03\u7528<code>beforeBodyWrite</code>\u65B9\u6CD5\uFF0C\u8DDF\u8FC7\u6EE4\u5668\u7684\u6548\u679C\u662F\u4E00\u6837\u7684</li><li>\u6700\u540E\u91CD\u5199\u6211\u4EEC\u7684\u5C01\u88C5\u65B9\u6CD5<code>beforeBodyWrite</code>\uFF0C\u6CE8\u610F\u9664\u4E86<code>String</code>\u7684\u8FD4\u56DE\u503C\u6709\u70B9\u7279\u6B8A\uFF0C\u65E0\u6CD5\u76F4\u63A5\u5C01\u88C5\u6210json\uFF0C\u6211\u4EEC\u9700\u8981\u8FDB\u884C\u7279\u6B8A\u5904\u7406\uFF0C\u5176\u4ED6\u7684\u76F4\u63A5<code>new ResultVo(data);</code>\u5C31ok\u4E86</li></ol><p>\u6253\u5B8C\u6536\u5DE5\uFF0C\u5EB7\u5EB7\u6548\u679C</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@PostMapping(&quot;/findByVo&quot;)
    public ProductInfo findByVo(@Validated ProductInfoVo vo) {
        ProductInfo productInfo = new ProductInfo();
        BeanUtils.copyProperties(vo, productInfo);
        return productInfoService.getOne(new QueryWrapper(productInfo));
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u65F6\u5C31\u7B97\u6211\u4EEC\u8FD4\u56DE\u7684\u662F<code>po</code>\uFF0C\u63A5\u6536\u5230\u7684\u8FD4\u56DE\u5C31\u662F\u6807\u51C6\u683C\u5F0F\u4E86\uFF0C\u5F00\u53D1\u5C0F\u54E5\u9732\u51FA\u4E86\u6B23\u6170\u7684\u7B11\u5BB9</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
  &quot;code&quot;: 1000,
  &quot;msg&quot;: &quot;\u8BF7\u6C42\u6210\u529F&quot;,
  &quot;data&quot;: {
    &quot;productId&quot;: 1,
    &quot;productName&quot;: &quot;\u6CE1\u811A&quot;,
    &quot;productPrice&quot;: 100.00,
    &quot;productDescription&quot;: &quot;\u4E2D\u836F\u6CE1\u811A\u52A0\u6309\u6469&quot;,
    &quot;productStatus&quot;: 0,
    ...
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-not\u7EDF\u4E00\u54CD\u5E94" tabindex="-1"><a class="header-anchor" href="#_2-not\u7EDF\u4E00\u54CD\u5E94" aria-hidden="true">#</a> 2. NOT\u7EDF\u4E00\u54CD\u5E94</h3><h4 id="\u4E0D\u5F00\u542F\u7EDF\u4E00\u54CD\u5E94\u539F\u56E0" tabindex="-1"><a class="header-anchor" href="#\u4E0D\u5F00\u542F\u7EDF\u4E00\u54CD\u5E94\u539F\u56E0" aria-hidden="true">#</a> \u4E0D\u5F00\u542F\u7EDF\u4E00\u54CD\u5E94\u539F\u56E0</h4><p>\u5F00\u53D1\u5C0F\u54E5\u662F\u5F00\u5FC3\u4E86\uFF0C\u53EF\u662F\u5176\u4ED6\u7CFB\u7EDF\u5C31\u4E0D\u5F00\u5FC3\u4E86\u3002\u4E3E\u4E2A\u4F8B\u5B50\uFF1A\u6211\u4EEC\u9879\u76EE\u4E2D\u96C6\u6210\u4E86\u4E00\u4E2A<code>\u5065\u5EB7\u68C0\u6D4B</code>\u7684\u529F\u80FD\uFF0C\u4E5F\u5C31\u662F\u8FD9\u8D27</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RestController
public class HealthController {
    @GetMapping(&quot;/health&quot;)
    public String health() {
        return &quot;success&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u516C\u53F8\u90E8\u7F72\u4E86\u4E00\u5957\u6821\u9A8C\u6240\u6709\u7CFB\u7EDF\u5B58\u6D3B\u72B6\u6001\u7684\u5DE5\u5177\uFF0C\u8FD9\u5DE5\u5177\u5C31\u5B9A\u65F6\u53D1\u9001<code>get</code>\u8BF7\u6C42\u7ED9\u6211\u4EEC\u7CFB\u7EDF</p><blockquote><p>\u201C\u5144\u5F1F\uFF0C\u4F60\u6B7B\u4E86\u5417\uFF1F\u201D</p><p>\u201C\u6211\u6CA1\u6B7B\uFF0C\u6EDA\u201D</p><p>\u201C\u5144\u5F1F\uFF0C\u4F60\u6B7B\u4E86\u5417\uFF1F\u201D</p><p>\u201C\u6211\u6CA1\u6B7B\uFF0C\u6EDA\u201D</p></blockquote><p>\u662F\u7684\uFF0Cweb\u9879\u76EE\u7684\u672C\u8D28\u5C31\u662F\u590D\u8BFB\u673A\u3002\u4E00\u65E6\u53D1\u9001\u7684\u8BF7\u6C42<code>\u6CA1\u54CD\u5E94</code>\uFF0C\u5C31\u4F1A\u7ED9\u8D1F\u8D23\u4EBA\u53D1\u4FE1\u606F\uFF08\u4F01\u4E1A\u5FAE\u4FE1\u6216\u8005\u77ED\u4FE1\u4E4B\u7C7B\u7684\uFF09\uFF0C\u4F60\u7684<code>\u7CFB\u7EDF\u6B7B\u5566</code>\uFF01\u8D76\u7D27\u56DE\u6765<code>\u6392\u67E5bug</code>\u5427\uFF01\u8BA9\u5927\u5BB6\u611F\u53D7\u4E00\u4E0B\u3002\u6BCF\u6B21\u770B\u5230\u6211\u90FD<code>\u5C04\u5C04\u53D1\u6296</code>\uFF0C\u65E9\u4E0A6\u70B9\uFF01\u6211tm\uFF01\uFF01\uFF01\uFF01\uFF01</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/csdn-zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl-9abb673b-9a5a-4a63-b103-089e5460da12.png" alt="\u76D1\u63A7"></p><p>\u597D\u5427\uFF0C\u6CA1\u529E\u6CD5\uFF0C\u4EBA\u5BB6\u662F\u8001\u5927\uFF0C\u4EBA\u5BB6\u8981\u7684\u8FD4\u56DE\u4E0D\u662F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
  &quot;code&quot;: 1000,
  &quot;msg&quot;: &quot;\u8BF7\u6C42\u6210\u529F&quot;,
  &quot;data&quot;: &quot;success&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EBA\u5BB6\u8981\u7684\u8FD4\u56DE\u53EA\u8981\u4E00\u4E2A<code>success</code>\uFF0C\u4EBA\u5BB6\u5B9A\u7684\u6807\u51C6\u4E0D\u53EF\u80FD\u56E0\u4E3A\u4F60\u4E00\u4E2A\u7CFB\u7EDF\u6539\u3002\u4FD7\u8BDD\u8BF4\u7684\u597D\uFF0C\u5982\u679C\u4F60\u6539\u53D8\u4E0D\u4E86\u73AF\u5883\uFF0C\u90A3\u4F60\u5C31\u53EA\u80FD\u6211****</p><h4 id="\u65B0\u589E\u4E0D\u8FDB\u884C\u5C01\u88C5\u6CE8\u89E3" tabindex="-1"><a class="header-anchor" href="#\u65B0\u589E\u4E0D\u8FDB\u884C\u5C01\u88C5\u6CE8\u89E3" aria-hidden="true">#</a> \u65B0\u589E\u4E0D\u8FDB\u884C\u5C01\u88C5\u6CE8\u89E3</h4><p>\u56E0\u4E3A\u767E\u5206\u4E4B99\u7684\u8BF7\u6C42\u8FD8\u662F\u9700\u8981\u5305\u88C5\u7684\uFF0C\u53EA\u6709\u4E2A\u522B\u4E0D\u9700\u8981\uFF0C\u5199\u5728\u5305\u88C5\u7684\u8FC7\u6EE4\u5668\u5427\uFF1F\u53C8\u4E0D\u662F\u5F88\u597D\u7EF4\u62A4\uFF0C\u90A3\u5C31\u52A0\u4E2A\u6CE8\u89E3\u597D\u4E86\u3002\u6240\u6709\u4E0D\u9700\u8981\u5305\u88C5\u7684\u5C31\u52A0\u4E0A\u8FD9\u4E2A\u6CE8\u89E3\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface NotControllerResponseAdvice {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u5728\u6211\u4EEC\u7684\u589E\u5F3A\u8FC7\u6EE4\u65B9\u6CD5\u4E0A\u8FC7\u6EE4\u5305\u542B\u8FD9\u4E2A\u6CE8\u89E3\u7684\u65B9\u6CD5</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RestControllerAdvice(basePackages = {&quot;com.bugpool.leilema&quot;})
public class ControllerResponseAdvice implements ResponseBodyAdvice&lt;Object&gt; {
    @Override
    public boolean supports(MethodParameter methodParameter, Class&lt;? extends HttpMessageConverter&lt;?&gt;&gt; aClass) {
        // response\u662FResultVo\u7C7B\u578B\uFF0C\u6216\u8005\u6CE8\u91CA\u4E86NotControllerResponseAdvice\u90FD\u4E0D\u8FDB\u884C\u5305\u88C5
        return !(methodParameter.getParameterType().isAssignableFrom(ResultVo.class)
                || methodParameter.hasMethodAnnotation(NotControllerResponseAdvice.class));
    }
    ...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6700\u540E\u5C31\u5728\u4E0D\u9700\u8981\u5305\u88C5\u7684\u65B9\u6CD5\u4E0A\u52A0\u4E0A\u6CE8\u89E3</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RestController
public class HealthController {

    @GetMapping(&quot;/health&quot;)
    @NotControllerResponseAdvice
    public String health() {
        return &quot;success&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u65F6\u5019\u5C31\u4E0D\u4F1A\u81EA\u52A8\u5C01\u88C5\u4E86\uFF0C\u800C\u5176\u4ED6\u6CA1\u52A0\u6CE8\u89E3\u7684\u5219\u4F9D\u65E7\u81EA\u52A8\u5305\u88C5</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/csdn-zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl-67f4a389-dfe5-4275-aab3-3ae149603e6a.png" alt="noResponseAdvice"></p><h2 id="\u4E94\u3001\u7EDF\u4E00\u5F02\u5E38" tabindex="-1"><a class="header-anchor" href="#\u4E94\u3001\u7EDF\u4E00\u5F02\u5E38" aria-hidden="true">#</a> \u4E94\u3001\u7EDF\u4E00\u5F02\u5E38</h2><p>\u6BCF\u4E2A\u7CFB\u7EDF\u90FD\u4F1A\u6709\u81EA\u5DF1\u7684<code>\u4E1A\u52A1\u5F02\u5E38</code>\uFF0C\u6BD4\u5982<code>\u5E93\u5B58\u4E0D\u80FD\u5C0F\u4E8E0</code>\u5B50\u7C7B\u7684\uFF0C\u8FD9\u79CD\u5F02\u5E38\u5E76\u975E\u7A0B\u5E8F\u5F02\u5E38\uFF0C\u800C\u662F\u4E1A\u52A1\u64CD\u4F5C\u5F15\u53D1\u7684\u5F02\u5E38\uFF0C\u6211\u4EEC\u4E5F\u9700\u8981\u8FDB\u884C\u89C4\u8303\u7684\u7F16\u6392\u4E1A\u52A1<code>\u5F02\u5E38\u72B6\u6001\u7801</code>\uFF0C\u5E76\u4E14\u5199\u4E00\u4E2A\u4E13\u95E8\u5904\u7406\u7684<code>\u5F02\u5E38\u7C7B</code>\uFF0C\u6700\u540E\u901A\u8FC7\u521A\u521A\u5B66\u4E60\u8FC7\u7684<code>\u5F02\u5E38\u62E6\u622A</code>\u7EDF\u4E00\u8FDB\u884C\u5904\u7406\uFF0C\u4EE5\u53CA\u6253<code>\u65E5\u5FD7</code></p><ol><li>\u5F02\u5E38\u72B6\u6001\u7801\u679A\u4E3E\uFF0C\u65E2\u7136\u662F\u72B6\u6001\u7801\uFF0C\u90A3\u5C31\u80AF\u5B9A\u8981\u5B9E\u73B0\u6211\u4EEC\u7684\u6807\u51C6\u63A5\u53E3<code>StatusCode</code></li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Getter
public enum  AppCode implements StatusCode {

    APP_ERROR(2000, &quot;\u4E1A\u52A1\u5F02\u5E38&quot;),
    PRICE_ERROR(2001, &quot;\u4EF7\u683C\u5F02\u5E38&quot;);

    private int code;
    private String msg;

    AppCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u5F02\u5E38\u7C7B\uFF0C\u8FD9\u91CC\u9700\u8981\u5F3A\u8C03\u4E00\u4E0B\uFF0C<code>code</code>\u4EE3\u8868<code>AppCode</code>\u7684\u5F02\u5E38\u72B6\u6001\u7801\uFF0C\u4E5F\u5C31\u662F2000\uFF1B<code>msg</code>\u4EE3\u8868<code>\u4E1A\u52A1\u5F02\u5E38</code>\uFF0C\u8FD9\u53EA\u662F\u4E00\u4E2A\u5927\u7C7B\uFF0C\u4E00\u822C\u524D\u7AEF\u4F1A\u653E\u5230\u5F39\u7A97<code>title</code>\u4E0A\uFF1B\u6700\u540E<code>super(message);</code>\u8FD9\u624D\u662F\u629B\u51FA\u7684\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u5728\u524D\u7AEF\u663E\u793A\u5728<code>\u5F39\u7A97\u4F53</code>\u4E2D\uFF0C\u5728<code>ResultVo</code>\u5219\u4FDD\u5B58\u5728<code>data</code>\u4E2D</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Getter
public class APIException extends RuntimeException {
    private int code;
    private String msg;

    // \u624B\u52A8\u8BBE\u7F6E\u5F02\u5E38
    public APIException(StatusCode statusCode, String message) {
        // message\u7528\u4E8E\u7528\u6237\u8BBE\u7F6E\u629B\u51FA\u9519\u8BEF\u8BE6\u60C5\uFF0C\u4F8B\u5982\uFF1A\u5F53\u524D\u4EF7\u683C-5\uFF0C\u5C0F\u4E8E0
        super(message);
        // \u72B6\u6001\u7801
        this.code = statusCode.getCode();
        // \u72B6\u6001\u7801\u914D\u5957\u7684msg
        this.msg = statusCode.getMsg();
    }

    // \u9ED8\u8BA4\u5F02\u5E38\u4F7F\u7528APP_ERROR\u72B6\u6001\u7801
    public APIException(String message) {
        super(message);
        this.code = AppCode.APP_ERROR.getCode();
        this.msg = AppCode.APP_ERROR.getMsg();
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>\u6700\u540E\u8FDB\u884C\u7EDF\u4E00\u5F02\u5E38\u7684\u62E6\u622A\uFF0C\u8FD9\u6837\u65E0\u8BBA\u5728<code>service</code>\u5C42\u8FD8\u662F<code>controller</code>\u5C42\uFF0C\u5F00\u53D1\u4EBA\u5458\u53EA\u7BA1\u629B\u51FA<code>API\u5F02\u5E38</code>\uFF0C\u4E0D\u9700\u8981\u5173\u7CFB\u600E\u4E48\u8FD4\u56DE\u7ED9\u524D\u7AEF\uFF0C\u66F4\u4E0D\u9700\u8981\u5173\u5FC3<code>\u65E5\u5FD7</code>\u7684\u6253\u5370</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RestControllerAdvice
public class ControllerExceptionAdvice {

    @ExceptionHandler({BindException.class})
    public ResultVo MethodArgumentNotValidExceptionHandler(BindException e) {
        // \u4ECE\u5F02\u5E38\u5BF9\u8C61\u4E2D\u62FF\u5230ObjectError\u5BF9\u8C61
        ObjectError objectError = e.getBindingResult().getAllErrors().get(0);
        return new ResultVo(ResultCode.VALIDATE_ERROR, objectError.getDefaultMessage());
    }

    @ExceptionHandler(APIException.class)
    public ResultVo APIExceptionHandler(APIException e) {
        // log.error(e.getMessage(), e); \u7531\u4E8E\u8FD8\u6CA1\u96C6\u6210\u65E5\u5FD7\u6846\u67B6\uFF0C\u6682\u4E14\u653E\u7740\uFF0C\u5199\u4E0ATODO
        return new ResultVo(e.getCode(), e.getMsg(), e.getMessage());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>\u6700\u540E\u4F7F\u7528\uFF0C\u6211\u4EEC\u7684\u4EE3\u7801\u53EA\u9700\u8981\u8FD9\u4E48\u5199</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if (null == orderMaster) {
            throw new APIException(AppCode.ORDER_NOT_EXIST, &quot;\u8BA2\u5355\u53F7\u4E0D\u5B58\u5728\uFF1A&quot; + orderId);
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
  &quot;code&quot;: 2003,
  &quot;msg&quot;: &quot;\u8BA2\u5355\u4E0D\u5B58\u5728&quot;,
  &quot;data&quot;: &quot;\u8BA2\u5355\u53F7\u4E0D\u5B58\u5728\uFF1A1998&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C31\u4F1A\u81EA\u52A8\u629B\u51FA<code>AppCode.ORDER_NOT_EXIST</code>\u72B6\u6001\u7801\u7684\u54CD\u5E94\uFF0C\u5E76\u4E14\u5E26\u4E0A\u5F02\u5E38\u8BE6\u7EC6\u4FE1\u606F<code>\u8BA2\u5355\u53F7\u4E0D\u5B58\u5728\uFF1Axxxx</code>\u3002\u540E\u7AEF\u5C0F\u54E5\u5F00\u53D1\u6709\u6548\u7387\uFF0C\u524D\u7AEF\u59B9\u59B9\u83B7\u53D6\u5230<code>2003</code>\u72B6\u6001\u7801\uFF0C\u8C03\u7528\u5BF9\u5E94\u8B66\u544A\u5F39\u7A97\uFF0C<code>title</code>\u5199\u4E0A<code>\u8BA2\u5355\u4E0D\u5B58\u5728</code>\uFF0C<code>body</code>\u8BE6\u7EC6\u4FE1\u606F\u8BB0\u8F7D<code>&quot;\u8BA2\u5355\u53F7\u4E0D\u5B58\u5728\uFF1A1998&quot;</code>\u3002\u540C\u65F6<code>\u65E5\u5FD7</code>\u8FD8\u81EA\u52A8\u6253\u4E0A\u53BB\u4E86\uFF01</p><hr>`,101),u=n("\u6700\u8FD1\u6574\u7406\u4E86\u4E00\u4EFD\u725B\u903C\u7684\u5B66\u4E60\u8D44\u6599\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8EJava\u57FA\u7840\u90E8\u5206\uFF08JVM\u3001Java\u96C6\u5408\u6846\u67B6\u3001\u591A\u7EBF\u7A0B\uFF09\uFF0C\u8FD8\u56CA\u62EC\u4E86 "),v=e("strong",null,"\u6570\u636E\u5E93\u3001\u8BA1\u7B97\u673A\u7F51\u7EDC\u3001\u7B97\u6CD5\u4E0E\u6570\u636E\u7ED3\u6784\u3001\u8BBE\u8BA1\u6A21\u5F0F\u3001\u6846\u67B6\u7C7BSpring\u3001Netty\u3001\u5FAE\u670D\u52A1\uFF08Dubbo\uFF0C\u6D88\u606F\u961F\u5217\uFF09 \u7F51\u5173",-1),p=n(" \u7B49\u7B49\u7B49\u7B49\u2026\u2026\u8BE6\u60C5\u6233\uFF1A"),b={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},m=n("\u53EF\u4EE5\u8BF4\u662F2022\u5E74\u5168\u7F51\u6700\u5168\u7684\u5B66\u4E60\u548C\u627E\u5DE5\u4F5C\u7684PDF\u8D44\u6E90\u4E86"),g=e("p",null,[n("\u5173\u6CE8\u4E8C\u54E5\u7684\u539F\u521B\u516C\u4F17\u53F7 "),e("strong",null,"\u6C89\u9ED8\u738B\u4E8C"),n("\uFF0C\u56DE\u590D"),e("strong",null,"111"),n(" \u5373\u53EF\u514D\u8D39\u9886\u53D6\u3002")],-1),h=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:""})],-1);function q(x,f){const i=t("ExternalLinkIcon");return a(),r("div",null,[c,e("p",null,[u,v,p,e("a",b,[m,o(i)])]),g,h])}var C=d(l,[["render",q],["__file","zhenggjspringbootrhclcsxytyyctyxybugpooldbkcsdnbkzgjspringbootrhcl.html.vue"]]);export{C as default};
