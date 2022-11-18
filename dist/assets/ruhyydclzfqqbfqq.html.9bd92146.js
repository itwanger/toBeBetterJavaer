import{_ as d}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,a as e,d as i,b as r,e as l,r as t}from"./app.99eb8281.js";const u={},v=l(`<p>对于一些用户请求，在某些情况下是可能重复发送的，如果是查询类操作并无大碍，但其中有些是涉及写入操作的，一旦重复了，可能会导致很严重的后果，例如交易的接口如果重复请求可能会重复下单。</p><p>重复的场景有可能是：</p><ol><li>黑客拦截了请求，重放</li><li>前端/客户端因为某些原因请求重复发送了，或者用户在很短的时间内重复点击了</li><li>网关重发</li><li>….</li></ol><p>本文讨论的是如何在服务端优雅地统一处理这种情况，如何禁止用户重复点击等客户端操作不在本文的讨论范畴。</p><h2 id="利用唯一请求编号去重" tabindex="-1"><a class="header-anchor" href="#利用唯一请求编号去重" aria-hidden="true">#</a> 利用唯一请求编号去重</h2><p>可能会想到的是，只要请求有唯一的请求编号，那么就能借用Redis做这个去重——只要这个唯一请求编号在redis存在，证明处理过，那么就认为是重复的</p><p>代码大概如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String KEY = &quot;REQ12343456788&quot;;//请求唯一编号
long expireTime =  1000;// 1000毫秒过期，1000ms内的重复请求会认为重复
long expireAt = System.currentTimeMillis() + expireTime;
String val = &quot;expireAt@&quot; + expireAt;

//redis key还存在的话要就认为请求是重复的
Boolean firstSet = stringRedisTemplate.execute((RedisCallback&lt;Boolean&gt;) connection -&gt; connection.set(KEY.getBytes(), val.getBytes(), Expiration.milliseconds(expireTime), RedisStringCommands.SetOption.SET_IF_ABSENT));

final boolean isConsiderDup;
if (firstSet != null &amp;&amp; firstSet) {// 第一次访问
 isConsiderDup = false;
} else {// redis值已存在，认为是重复了
 isConsiderDup = true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="业务参数去重" tabindex="-1"><a class="header-anchor" href="#业务参数去重" aria-hidden="true">#</a> 业务参数去重</h2><p>上面的方案能解决具备唯一请求编号的场景，例如每次写请求之前都是服务端返回一个唯一编号给客户端，客户端带着这个请求号做请求，服务端即可完成去重拦截。</p><p>但是，很多的场景下，请求并不会带这样的唯一编号！那么我们能否针对请求的参数作为一个请求的标识呢？</p><p>先考虑简单的场景，假设请求参数只有一个字段reqParam，我们可以利用以下标识去判断这个请求是否重复。用户ID:接口名:请求参数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String KEY = &quot;dedup:U=&quot;+userId + &quot;M=&quot; + method + &quot;P=&quot; + reqParam;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>那么当同一个用户访问同一个接口，带着同样的reqParam过来，我们就能定位到他是重复的了。</p><p>但是问题是，我们的接口通常不是这么简单，以目前的主流，我们的参数通常是一个JSON。那么针对这种场景，我们怎么去重呢？</p><h3 id="计算请求参数的摘要作为参数标识" tabindex="-1"><a class="header-anchor" href="#计算请求参数的摘要作为参数标识" aria-hidden="true">#</a> 计算请求参数的摘要作为参数标识</h3><p>假设我们把请求参数（JSON）按KEY做升序排序，排序后拼成一个字符串，作为KEY值呢？但这可能非常的长，所以我们可以考虑对这个字符串求一个MD5作为参数的摘要，以这个摘要去取代reqParam的位置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String KEY = &quot;dedup:U=&quot;+userId + &quot;M=&quot; + method + &quot;P=&quot; + reqParamMD5;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样，请求的唯一标识就打上了！</p><p>注：MD5理论上可能会重复，但是去重通常是短时间窗口内的去重（例如一秒），一个短时间内同一个用户同样的接口能拼出不同的参数导致一样的MD5几乎是不可能的。</p><h3 id="继续优化-考虑剔除部分时间因子" tabindex="-1"><a class="header-anchor" href="#继续优化-考虑剔除部分时间因子" aria-hidden="true">#</a> 继续优化，考虑剔除部分时间因子</h3><p>上面的问题其实已经是一个很不错的解决方案了，但是实际投入使用的时候可能发现有些问题：某些请求用户短时间内重复的点击了（例如1000毫秒发送了三次请求），但绕过了上面的去重判断（不同的KEY值）。</p><p>原因是这些请求参数的字段里面，是带时间字段的，这个字段标记用户请求的时间，服务端可以借此丢弃掉一些老的请求（例如5秒前）。如下面的例子，请求的其他参数是一样的，除了请求时间相差了一秒：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//两个请求一样，但是请求时间差一秒
String req = &quot;{\\n&quot; +
  &quot;\\&quot;requestTime\\&quot; :\\&quot;20190101120001\\&quot;,\\n&quot; +
  &quot;\\&quot;requestValue\\&quot; :\\&quot;1000\\&quot;,\\n&quot; +
  &quot;\\&quot;requestKey\\&quot; :\\&quot;key\\&quot;\\n&quot; +
&quot;}&quot;;

String req2 = &quot;{\\n&quot; +
  &quot;\\&quot;requestTime\\&quot; :\\&quot;20190101120002\\&quot;,\\n&quot; +
  &quot;\\&quot;requestValue\\&quot; :\\&quot;1000\\&quot;,\\n&quot; +
  &quot;\\&quot;requestKey\\&quot; :\\&quot;key\\&quot;\\n&quot; +
&quot;}&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种请求，我们也很可能需要挡住后面的重复请求。所以求业务参数摘要之前，需要剔除这类时间字段。还有类似的字段可能是GPS的经纬度字段（重复请求间可能有极小的差别）。</p><h2 id="请求去重工具类-java实现" tabindex="-1"><a class="header-anchor" href="#请求去重工具类-java实现" aria-hidden="true">#</a> 请求去重工具类，Java实现</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ReqDedupHelper {

    /**

     *

     * @param reqJSON 请求的参数，这里通常是JSON

     * @param excludeKeys 请求参数里面要去除哪些字段再求摘要

     * @return 去除参数的MD5摘要

     */
    public String dedupParamMD5(final String reqJSON, String... excludeKeys) {
        String decreptParam = reqJSON;

        TreeMap paramTreeMap = JSON.parseObject(decreptParam, TreeMap.class);
        if (excludeKeys!=null) {
            List&lt;String&gt; dedupExcludeKeys = Arrays.asList(excludeKeys);
            if (!dedupExcludeKeys.isEmpty()) {
                for (String dedupExcludeKey : dedupExcludeKeys) {
                    paramTreeMap.remove(dedupExcludeKey);
                }
            }
        }

        String paramTreeMapJSON = JSON.toJSONString(paramTreeMap);
        String md5deDupParam = jdkMD5(paramTreeMapJSON);
        log.debug(&quot;md5deDupParam = {}, excludeKeys = {} {}&quot;, md5deDupParam, Arrays.deepToString(excludeKeys), paramTreeMapJSON);
        return md5deDupParam;
    }

    private static String jdkMD5(String src) {
        String res = null;
        try {
            MessageDigest messageDigest = MessageDigest.getInstance(&quot;MD5&quot;);
            byte[] mdBytes = messageDigest.digest(src.getBytes());
            res = DatatypeConverter.printHexBinary(mdBytes);
        } catch (Exception e) {
            log.error(&quot;&quot;,e);
        }
        return res;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一些测试日志：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static void main(String[] args) {
    //两个请求一样，但是请求时间差一秒
    String req = &quot;{\\n&quot; +
            &quot;\\&quot;requestTime\\&quot; :\\&quot;20190101120001\\&quot;,\\n&quot; +
            &quot;\\&quot;requestValue\\&quot; :\\&quot;1000\\&quot;,\\n&quot; +
            &quot;\\&quot;requestKey\\&quot; :\\&quot;key\\&quot;\\n&quot; +
            &quot;}&quot;;

    String req2 = &quot;{\\n&quot; +
            &quot;\\&quot;requestTime\\&quot; :\\&quot;20190101120002\\&quot;,\\n&quot; +
            &quot;\\&quot;requestValue\\&quot; :\\&quot;1000\\&quot;,\\n&quot; +
            &quot;\\&quot;requestKey\\&quot; :\\&quot;key\\&quot;\\n&quot; +
            &quot;}&quot;;

    //全参数比对，所以两个参数MD5不同
    String dedupMD5 = new ReqDedupHelper().dedupParamMD5(req);
    String dedupMD52 = new ReqDedupHelper().dedupParamMD5(req2);
    System.out.println(&quot;req1MD5 = &quot;+ dedupMD5+&quot; , req2MD5=&quot;+dedupMD52);

    //去除时间参数比对，MD5相同
    String dedupMD53 = new ReqDedupHelper().dedupParamMD5(req,&quot;requestTime&quot;);
    String dedupMD54 = new ReqDedupHelper().dedupParamMD5(req2,&quot;requestTime&quot;);
    System.out.println(&quot;req1MD5 = &quot;+ dedupMD53+&quot; , req2MD5=&quot;+dedupMD54);

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日志输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>req1MD5 = 9E054D36439EBDD0604C5E65EB5C8267 , req2MD5=A2D20BAC78551C4CA09BEF97FE468A3F
req1MD5 = C2A36FED15128E9E878583CAAAFEFDE9 , req2MD5=C2A36FED15128E9E878583CAAAFEFDE9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>日志说明：</p><ul><li>一开始两个参数由于requestTime是不同的，所以求去重参数摘要的时候可以发现两个值是不一样的</li><li>第二次调用的时候，去除了requestTime再求摘要（第二个参数中传入了”requestTime”），则发现两个摘要是一样的，符合预期。</li></ul><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>至此，我们可以得到完整的去重解决方案，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String userId= &quot;12345678&quot;;//用户
String method = &quot;pay&quot;;//接口名
String dedupMD5 = new ReqDedupHelper().dedupParamMD5(req,&quot;requestTime&quot;);//计算请求参数摘要，其中剔除里面请求时间的干扰
String KEY = &quot;dedup:U=&quot; + userId + &quot;M=&quot; + method + &quot;P=&quot; + dedupMD5;

long expireTime =  1000;// 1000毫秒过期，1000ms内的重复请求会认为重复
long expireAt = System.currentTimeMillis() + expireTime;
String val = &quot;expireAt@&quot; + expireAt;

// NOTE:直接SETNX不支持带过期时间，所以设置+过期不是原子操作，极端情况下可能设置了就不过期了，后面相同请求可能会误以为需要去重，所以这里使用底层API，保证SETNX+过期时间是原子操作
Boolean firstSet = stringRedisTemplate.execute((RedisCallback&lt;Boolean&gt;) connection -&gt; connection.set(KEY.getBytes(), val.getBytes(), Expiration.milliseconds(expireTime),
        RedisStringCommands.SetOption.SET_IF_ABSENT));

final boolean isConsiderDup;
if (firstSet != null &amp;&amp; firstSet) {
    isConsiderDup = false;
} else {
    isConsiderDup = true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>好了，今天就到这儿吧，我是飘渺，咱们下期见~~</p><h2 id="最后说一句-别白嫖-求关注" tabindex="-1"><a class="header-anchor" href="#最后说一句-别白嫖-求关注" aria-hidden="true">#</a> 最后说一句（别白嫖，求关注）</h2><p>新开了一个纯技术交流群（一群已满），群里氛围还不错，无广告，无套路，单纯的吹牛逼，侃人生，想进的可以通过下方二维码加我微信，备注进群！</p><p><img src="https://mmbiz.qpic.cn/mmbiz_jpg/PxMzT0Oibf4iaaq1LHN5nmBoW0HpH70QAzKz7kqcXajmMbhLkK7rc6CRLcKhybrXOkejBIMwTr56xxbGiameeNPEg/640?wx_fmt=jpeg" alt="" loading="lazy"></p><p>求点赞、在看、分享三连</p><p><img src="https://mmbiz.qpic.cn/mmbiz_png/PoF8jo1PmpwnEoGbnjibl4txzyz5QMz2YvGiaUDVlxTPCLQv8BlTIibqTsjvRVSAibuUrAicpbFBy6hYKia3KcfIL9UA/640?wx_fmt=png" alt="" loading="lazy"></p>`,42),c={href:"https://mp.weixin.qq.com/s?__biz=MzAwMTk4NjM1MA==&mid=2247504735&idx=1&sn=95d066b8f06562454e51ebb0ac1fb29c&chksm=9ad3c91eada44008ea4ed577b0fa99f575b161dd68374f3ca662c1e0ab335f3f432a7ce1259f#rd",target:"_blank",rel:"noopener noreferrer"};function o(m,q){const n=t("ExternalLinkIcon");return s(),a("div",null,[v,e("blockquote",null,[e("p",null,[i("参考链接："),e("a",c,[i("https://mp.weixin.qq.com/s?__biz=MzAwMTk4NjM1MA==&mid=2247504735&idx=1&sn=95d066b8f06562454e51ebb0ac1fb29c&chksm=9ad3c91eada44008ea4ed577b0fa99f575b161dd68374f3ca662c1e0ab335f3f432a7ce1259f#rd"),r(n)]),i("，出处：JAVA日知录，整理：沉默王二")])])])}const g=d(u,[["render",o],["__file","ruhyydclzfqqbfqq.html.vue"]]);export{g as default};
