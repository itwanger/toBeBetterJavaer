import{_ as d}from"./plugin-vue_export-helper.21dcd24c.js";import{r as s,o as r,c as t,a as e,b as l,e as a,d as i}from"./app.0d3123da.js";const u={},v=a(`<p>\u5BF9\u4E8E\u4E00\u4E9B\u7528\u6237\u8BF7\u6C42\uFF0C\u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\u662F\u53EF\u80FD\u91CD\u590D\u53D1\u9001\u7684\uFF0C\u5982\u679C\u662F\u67E5\u8BE2\u7C7B\u64CD\u4F5C\u5E76\u65E0\u5927\u788D\uFF0C\u4F46\u5176\u4E2D\u6709\u4E9B\u662F\u6D89\u53CA\u5199\u5165\u64CD\u4F5C\u7684\uFF0C\u4E00\u65E6\u91CD\u590D\u4E86\uFF0C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u5F88\u4E25\u91CD\u7684\u540E\u679C\uFF0C\u4F8B\u5982\u4EA4\u6613\u7684\u63A5\u53E3\u5982\u679C\u91CD\u590D\u8BF7\u6C42\u53EF\u80FD\u4F1A\u91CD\u590D\u4E0B\u5355\u3002</p><p>\u91CD\u590D\u7684\u573A\u666F\u6709\u53EF\u80FD\u662F\uFF1A</p><ol><li>\u9ED1\u5BA2\u62E6\u622A\u4E86\u8BF7\u6C42\uFF0C\u91CD\u653E</li><li>\u524D\u7AEF/\u5BA2\u6237\u7AEF\u56E0\u4E3A\u67D0\u4E9B\u539F\u56E0\u8BF7\u6C42\u91CD\u590D\u53D1\u9001\u4E86\uFF0C\u6216\u8005\u7528\u6237\u5728\u5F88\u77ED\u7684\u65F6\u95F4\u5185\u91CD\u590D\u70B9\u51FB\u4E86</li><li>\u7F51\u5173\u91CD\u53D1</li><li>\u2026.</li></ol><p>\u672C\u6587\u8BA8\u8BBA\u7684\u662F\u5982\u4F55\u5728\u670D\u52A1\u7AEF\u4F18\u96C5\u5730\u7EDF\u4E00\u5904\u7406\u8FD9\u79CD\u60C5\u51B5\uFF0C\u5982\u4F55\u7981\u6B62\u7528\u6237\u91CD\u590D\u70B9\u51FB\u7B49\u5BA2\u6237\u7AEF\u64CD\u4F5C\u4E0D\u5728\u672C\u6587\u7684\u8BA8\u8BBA\u8303\u7574\u3002</p><h2 id="\u5229\u7528\u552F\u4E00\u8BF7\u6C42\u7F16\u53F7\u53BB\u91CD" tabindex="-1"><a class="header-anchor" href="#\u5229\u7528\u552F\u4E00\u8BF7\u6C42\u7F16\u53F7\u53BB\u91CD" aria-hidden="true">#</a> \u5229\u7528\u552F\u4E00\u8BF7\u6C42\u7F16\u53F7\u53BB\u91CD</h2><p>\u53EF\u80FD\u4F1A\u60F3\u5230\u7684\u662F\uFF0C\u53EA\u8981\u8BF7\u6C42\u6709\u552F\u4E00\u7684\u8BF7\u6C42\u7F16\u53F7\uFF0C\u90A3\u4E48\u5C31\u80FD\u501F\u7528Redis\u505A\u8FD9\u4E2A\u53BB\u91CD\u2014\u2014\u53EA\u8981\u8FD9\u4E2A\u552F\u4E00\u8BF7\u6C42\u7F16\u53F7\u5728redis\u5B58\u5728\uFF0C\u8BC1\u660E\u5904\u7406\u8FC7\uFF0C\u90A3\u4E48\u5C31\u8BA4\u4E3A\u662F\u91CD\u590D\u7684</p><p>\u4EE3\u7801\u5927\u6982\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String KEY = &quot;REQ12343456788&quot;;//\u8BF7\u6C42\u552F\u4E00\u7F16\u53F7
long expireTime =  1000;// 1000\u6BEB\u79D2\u8FC7\u671F\uFF0C1000ms\u5185\u7684\u91CD\u590D\u8BF7\u6C42\u4F1A\u8BA4\u4E3A\u91CD\u590D
long expireAt = System.currentTimeMillis() + expireTime;
String val = &quot;expireAt@&quot; + expireAt;

//redis key\u8FD8\u5B58\u5728\u7684\u8BDD\u8981\u5C31\u8BA4\u4E3A\u8BF7\u6C42\u662F\u91CD\u590D\u7684
Boolean firstSet = stringRedisTemplate.execute((RedisCallback&lt;Boolean&gt;) connection -&gt; connection.set(KEY.getBytes(), val.getBytes(), Expiration.milliseconds(expireTime), RedisStringCommands.SetOption.SET_IF_ABSENT));

final boolean isConsiderDup;
if (firstSet != null &amp;&amp; firstSet) {// \u7B2C\u4E00\u6B21\u8BBF\u95EE
 isConsiderDup = false;
} else {// redis\u503C\u5DF2\u5B58\u5728\uFF0C\u8BA4\u4E3A\u662F\u91CD\u590D\u4E86
 isConsiderDup = true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4E1A\u52A1\u53C2\u6570\u53BB\u91CD" tabindex="-1"><a class="header-anchor" href="#\u4E1A\u52A1\u53C2\u6570\u53BB\u91CD" aria-hidden="true">#</a> \u4E1A\u52A1\u53C2\u6570\u53BB\u91CD</h2><p>\u4E0A\u9762\u7684\u65B9\u6848\u80FD\u89E3\u51B3\u5177\u5907\u552F\u4E00\u8BF7\u6C42\u7F16\u53F7\u7684\u573A\u666F\uFF0C\u4F8B\u5982\u6BCF\u6B21\u5199\u8BF7\u6C42\u4E4B\u524D\u90FD\u662F\u670D\u52A1\u7AEF\u8FD4\u56DE\u4E00\u4E2A\u552F\u4E00\u7F16\u53F7\u7ED9\u5BA2\u6237\u7AEF\uFF0C\u5BA2\u6237\u7AEF\u5E26\u7740\u8FD9\u4E2A\u8BF7\u6C42\u53F7\u505A\u8BF7\u6C42\uFF0C\u670D\u52A1\u7AEF\u5373\u53EF\u5B8C\u6210\u53BB\u91CD\u62E6\u622A\u3002</p><p>\u4F46\u662F\uFF0C\u5F88\u591A\u7684\u573A\u666F\u4E0B\uFF0C\u8BF7\u6C42\u5E76\u4E0D\u4F1A\u5E26\u8FD9\u6837\u7684\u552F\u4E00\u7F16\u53F7\uFF01\u90A3\u4E48\u6211\u4EEC\u80FD\u5426\u9488\u5BF9\u8BF7\u6C42\u7684\u53C2\u6570\u4F5C\u4E3A\u4E00\u4E2A\u8BF7\u6C42\u7684\u6807\u8BC6\u5462\uFF1F</p><p>\u5148\u8003\u8651\u7B80\u5355\u7684\u573A\u666F\uFF0C\u5047\u8BBE\u8BF7\u6C42\u53C2\u6570\u53EA\u6709\u4E00\u4E2A\u5B57\u6BB5reqParam\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5229\u7528\u4EE5\u4E0B\u6807\u8BC6\u53BB\u5224\u65AD\u8FD9\u4E2A\u8BF7\u6C42\u662F\u5426\u91CD\u590D\u3002\u7528\u6237ID:\u63A5\u53E3\u540D:\u8BF7\u6C42\u53C2\u6570</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String KEY = &quot;dedup:U=&quot;+userId + &quot;M=&quot; + method + &quot;P=&quot; + reqParam;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u90A3\u4E48\u5F53\u540C\u4E00\u4E2A\u7528\u6237\u8BBF\u95EE\u540C\u4E00\u4E2A\u63A5\u53E3\uFF0C\u5E26\u7740\u540C\u6837\u7684reqParam\u8FC7\u6765\uFF0C\u6211\u4EEC\u5C31\u80FD\u5B9A\u4F4D\u5230\u4ED6\u662F\u91CD\u590D\u7684\u4E86\u3002</p><p>\u4F46\u662F\u95EE\u9898\u662F\uFF0C\u6211\u4EEC\u7684\u63A5\u53E3\u901A\u5E38\u4E0D\u662F\u8FD9\u4E48\u7B80\u5355\uFF0C\u4EE5\u76EE\u524D\u7684\u4E3B\u6D41\uFF0C\u6211\u4EEC\u7684\u53C2\u6570\u901A\u5E38\u662F\u4E00\u4E2AJSON\u3002\u90A3\u4E48\u9488\u5BF9\u8FD9\u79CD\u573A\u666F\uFF0C\u6211\u4EEC\u600E\u4E48\u53BB\u91CD\u5462\uFF1F</p><h3 id="\u8BA1\u7B97\u8BF7\u6C42\u53C2\u6570\u7684\u6458\u8981\u4F5C\u4E3A\u53C2\u6570\u6807\u8BC6" tabindex="-1"><a class="header-anchor" href="#\u8BA1\u7B97\u8BF7\u6C42\u53C2\u6570\u7684\u6458\u8981\u4F5C\u4E3A\u53C2\u6570\u6807\u8BC6" aria-hidden="true">#</a> \u8BA1\u7B97\u8BF7\u6C42\u53C2\u6570\u7684\u6458\u8981\u4F5C\u4E3A\u53C2\u6570\u6807\u8BC6</h3><p>\u5047\u8BBE\u6211\u4EEC\u628A\u8BF7\u6C42\u53C2\u6570\uFF08JSON\uFF09\u6309KEY\u505A\u5347\u5E8F\u6392\u5E8F\uFF0C\u6392\u5E8F\u540E\u62FC\u6210\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF0C\u4F5C\u4E3AKEY\u503C\u5462\uFF1F\u4F46\u8FD9\u53EF\u80FD\u975E\u5E38\u7684\u957F\uFF0C\u6240\u4EE5\u6211\u4EEC\u53EF\u4EE5\u8003\u8651\u5BF9\u8FD9\u4E2A\u5B57\u7B26\u4E32\u6C42\u4E00\u4E2AMD5\u4F5C\u4E3A\u53C2\u6570\u7684\u6458\u8981\uFF0C\u4EE5\u8FD9\u4E2A\u6458\u8981\u53BB\u53D6\u4EE3reqParam\u7684\u4F4D\u7F6E\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String KEY = &quot;dedup:U=&quot;+userId + &quot;M=&quot; + method + &quot;P=&quot; + reqParamMD5;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD9\u6837\uFF0C\u8BF7\u6C42\u7684\u552F\u4E00\u6807\u8BC6\u5C31\u6253\u4E0A\u4E86\uFF01</p><p>\u6CE8\uFF1AMD5\u7406\u8BBA\u4E0A\u53EF\u80FD\u4F1A\u91CD\u590D\uFF0C\u4F46\u662F\u53BB\u91CD\u901A\u5E38\u662F\u77ED\u65F6\u95F4\u7A97\u53E3\u5185\u7684\u53BB\u91CD\uFF08\u4F8B\u5982\u4E00\u79D2\uFF09\uFF0C\u4E00\u4E2A\u77ED\u65F6\u95F4\u5185\u540C\u4E00\u4E2A\u7528\u6237\u540C\u6837\u7684\u63A5\u53E3\u80FD\u62FC\u51FA\u4E0D\u540C\u7684\u53C2\u6570\u5BFC\u81F4\u4E00\u6837\u7684MD5\u51E0\u4E4E\u662F\u4E0D\u53EF\u80FD\u7684\u3002</p><h3 id="\u7EE7\u7EED\u4F18\u5316-\u8003\u8651\u5254\u9664\u90E8\u5206\u65F6\u95F4\u56E0\u5B50" tabindex="-1"><a class="header-anchor" href="#\u7EE7\u7EED\u4F18\u5316-\u8003\u8651\u5254\u9664\u90E8\u5206\u65F6\u95F4\u56E0\u5B50" aria-hidden="true">#</a> \u7EE7\u7EED\u4F18\u5316\uFF0C\u8003\u8651\u5254\u9664\u90E8\u5206\u65F6\u95F4\u56E0\u5B50</h3><p>\u4E0A\u9762\u7684\u95EE\u9898\u5176\u5B9E\u5DF2\u7ECF\u662F\u4E00\u4E2A\u5F88\u4E0D\u9519\u7684\u89E3\u51B3\u65B9\u6848\u4E86\uFF0C\u4F46\u662F\u5B9E\u9645\u6295\u5165\u4F7F\u7528\u7684\u65F6\u5019\u53EF\u80FD\u53D1\u73B0\u6709\u4E9B\u95EE\u9898\uFF1A\u67D0\u4E9B\u8BF7\u6C42\u7528\u6237\u77ED\u65F6\u95F4\u5185\u91CD\u590D\u7684\u70B9\u51FB\u4E86\uFF08\u4F8B\u59821000\u6BEB\u79D2\u53D1\u9001\u4E86\u4E09\u6B21\u8BF7\u6C42\uFF09\uFF0C\u4F46\u7ED5\u8FC7\u4E86\u4E0A\u9762\u7684\u53BB\u91CD\u5224\u65AD\uFF08\u4E0D\u540C\u7684KEY\u503C\uFF09\u3002</p><p>\u539F\u56E0\u662F\u8FD9\u4E9B\u8BF7\u6C42\u53C2\u6570\u7684\u5B57\u6BB5\u91CC\u9762\uFF0C\u662F\u5E26\u65F6\u95F4\u5B57\u6BB5\u7684\uFF0C\u8FD9\u4E2A\u5B57\u6BB5\u6807\u8BB0\u7528\u6237\u8BF7\u6C42\u7684\u65F6\u95F4\uFF0C\u670D\u52A1\u7AEF\u53EF\u4EE5\u501F\u6B64\u4E22\u5F03\u6389\u4E00\u4E9B\u8001\u7684\u8BF7\u6C42\uFF08\u4F8B\u59825\u79D2\u524D\uFF09\u3002\u5982\u4E0B\u9762\u7684\u4F8B\u5B50\uFF0C\u8BF7\u6C42\u7684\u5176\u4ED6\u53C2\u6570\u662F\u4E00\u6837\u7684\uFF0C\u9664\u4E86\u8BF7\u6C42\u65F6\u95F4\u76F8\u5DEE\u4E86\u4E00\u79D2\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>//\u4E24\u4E2A\u8BF7\u6C42\u4E00\u6837\uFF0C\u4F46\u662F\u8BF7\u6C42\u65F6\u95F4\u5DEE\u4E00\u79D2
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u79CD\u8BF7\u6C42\uFF0C\u6211\u4EEC\u4E5F\u5F88\u53EF\u80FD\u9700\u8981\u6321\u4F4F\u540E\u9762\u7684\u91CD\u590D\u8BF7\u6C42\u3002\u6240\u4EE5\u6C42\u4E1A\u52A1\u53C2\u6570\u6458\u8981\u4E4B\u524D\uFF0C\u9700\u8981\u5254\u9664\u8FD9\u7C7B\u65F6\u95F4\u5B57\u6BB5\u3002\u8FD8\u6709\u7C7B\u4F3C\u7684\u5B57\u6BB5\u53EF\u80FD\u662FGPS\u7684\u7ECF\u7EAC\u5EA6\u5B57\u6BB5\uFF08\u91CD\u590D\u8BF7\u6C42\u95F4\u53EF\u80FD\u6709\u6781\u5C0F\u7684\u5DEE\u522B\uFF09\u3002</p><h2 id="\u8BF7\u6C42\u53BB\u91CD\u5DE5\u5177\u7C7B-java\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u8BF7\u6C42\u53BB\u91CD\u5DE5\u5177\u7C7B-java\u5B9E\u73B0" aria-hidden="true">#</a> \u8BF7\u6C42\u53BB\u91CD\u5DE5\u5177\u7C7B\uFF0CJava\u5B9E\u73B0</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class ReqDedupHelper {

    /**

     *

     * @param reqJSON \u8BF7\u6C42\u7684\u53C2\u6570\uFF0C\u8FD9\u91CC\u901A\u5E38\u662FJSON

     * @param excludeKeys \u8BF7\u6C42\u53C2\u6570\u91CC\u9762\u8981\u53BB\u9664\u54EA\u4E9B\u5B57\u6BB5\u518D\u6C42\u6458\u8981

     * @return \u53BB\u9664\u53C2\u6570\u7684MD5\u6458\u8981

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0B\u9762\u662F\u4E00\u4E9B\u6D4B\u8BD5\u65E5\u5FD7\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public static void main(String[] args) {
    //\u4E24\u4E2A\u8BF7\u6C42\u4E00\u6837\uFF0C\u4F46\u662F\u8BF7\u6C42\u65F6\u95F4\u5DEE\u4E00\u79D2
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

    //\u5168\u53C2\u6570\u6BD4\u5BF9\uFF0C\u6240\u4EE5\u4E24\u4E2A\u53C2\u6570MD5\u4E0D\u540C
    String dedupMD5 = new ReqDedupHelper().dedupParamMD5(req);
    String dedupMD52 = new ReqDedupHelper().dedupParamMD5(req2);
    System.out.println(&quot;req1MD5 = &quot;+ dedupMD5+&quot; , req2MD5=&quot;+dedupMD52);

    //\u53BB\u9664\u65F6\u95F4\u53C2\u6570\u6BD4\u5BF9\uFF0CMD5\u76F8\u540C
    String dedupMD53 = new ReqDedupHelper().dedupParamMD5(req,&quot;requestTime&quot;);
    String dedupMD54 = new ReqDedupHelper().dedupParamMD5(req2,&quot;requestTime&quot;);
    System.out.println(&quot;req1MD5 = &quot;+ dedupMD53+&quot; , req2MD5=&quot;+dedupMD54);

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u65E5\u5FD7\u8F93\u51FA\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>req1MD5 = 9E054D36439EBDD0604C5E65EB5C8267 , req2MD5=A2D20BAC78551C4CA09BEF97FE468A3F
req1MD5 = C2A36FED15128E9E878583CAAAFEFDE9 , req2MD5=C2A36FED15128E9E878583CAAAFEFDE9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u65E5\u5FD7\u8BF4\u660E\uFF1A</p><ul><li>\u4E00\u5F00\u59CB\u4E24\u4E2A\u53C2\u6570\u7531\u4E8ErequestTime\u662F\u4E0D\u540C\u7684\uFF0C\u6240\u4EE5\u6C42\u53BB\u91CD\u53C2\u6570\u6458\u8981\u7684\u65F6\u5019\u53EF\u4EE5\u53D1\u73B0\u4E24\u4E2A\u503C\u662F\u4E0D\u4E00\u6837\u7684</li><li>\u7B2C\u4E8C\u6B21\u8C03\u7528\u7684\u65F6\u5019\uFF0C\u53BB\u9664\u4E86requestTime\u518D\u6C42\u6458\u8981\uFF08\u7B2C\u4E8C\u4E2A\u53C2\u6570\u4E2D\u4F20\u5165\u4E86\u201DrequestTime\u201D\uFF09\uFF0C\u5219\u53D1\u73B0\u4E24\u4E2A\u6458\u8981\u662F\u4E00\u6837\u7684\uFF0C\u7B26\u5408\u9884\u671F\u3002</li></ul><h2 id="\u603B\u7ED3" tabindex="-1"><a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a> \u603B\u7ED3</h2><p>\u81F3\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5F97\u5230\u5B8C\u6574\u7684\u53BB\u91CD\u89E3\u51B3\u65B9\u6848\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String userId= &quot;12345678&quot;;//\u7528\u6237
String method = &quot;pay&quot;;//\u63A5\u53E3\u540D
String dedupMD5 = new ReqDedupHelper().dedupParamMD5(req,&quot;requestTime&quot;);//\u8BA1\u7B97\u8BF7\u6C42\u53C2\u6570\u6458\u8981\uFF0C\u5176\u4E2D\u5254\u9664\u91CC\u9762\u8BF7\u6C42\u65F6\u95F4\u7684\u5E72\u6270
String KEY = &quot;dedup:U=&quot; + userId + &quot;M=&quot; + method + &quot;P=&quot; + dedupMD5;

long expireTime =  1000;// 1000\u6BEB\u79D2\u8FC7\u671F\uFF0C1000ms\u5185\u7684\u91CD\u590D\u8BF7\u6C42\u4F1A\u8BA4\u4E3A\u91CD\u590D
long expireAt = System.currentTimeMillis() + expireTime;
String val = &quot;expireAt@&quot; + expireAt;

// NOTE:\u76F4\u63A5SETNX\u4E0D\u652F\u6301\u5E26\u8FC7\u671F\u65F6\u95F4\uFF0C\u6240\u4EE5\u8BBE\u7F6E+\u8FC7\u671F\u4E0D\u662F\u539F\u5B50\u64CD\u4F5C\uFF0C\u6781\u7AEF\u60C5\u51B5\u4E0B\u53EF\u80FD\u8BBE\u7F6E\u4E86\u5C31\u4E0D\u8FC7\u671F\u4E86\uFF0C\u540E\u9762\u76F8\u540C\u8BF7\u6C42\u53EF\u80FD\u4F1A\u8BEF\u4EE5\u4E3A\u9700\u8981\u53BB\u91CD\uFF0C\u6240\u4EE5\u8FD9\u91CC\u4F7F\u7528\u5E95\u5C42API\uFF0C\u4FDD\u8BC1SETNX+\u8FC7\u671F\u65F6\u95F4\u662F\u539F\u5B50\u64CD\u4F5C
Boolean firstSet = stringRedisTemplate.execute((RedisCallback&lt;Boolean&gt;) connection -&gt; connection.set(KEY.getBytes(), val.getBytes(), Expiration.milliseconds(expireTime),
        RedisStringCommands.SetOption.SET_IF_ABSENT));

final boolean isConsiderDup;
if (firstSet != null &amp;&amp; firstSet) {
    isConsiderDup = false;
} else {
    isConsiderDup = true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u597D\u4E86\uFF0C\u4ECA\u5929\u5C31\u5230\u8FD9\u513F\u5427\uFF0C\u6211\u662F\u98D8\u6E3A\uFF0C\u54B1\u4EEC\u4E0B\u671F\u89C1~~</p><h2 id="\u6700\u540E\u8BF4\u4E00\u53E5-\u522B\u767D\u5AD6-\u6C42\u5173\u6CE8" tabindex="-1"><a class="header-anchor" href="#\u6700\u540E\u8BF4\u4E00\u53E5-\u522B\u767D\u5AD6-\u6C42\u5173\u6CE8" aria-hidden="true">#</a> \u6700\u540E\u8BF4\u4E00\u53E5\uFF08\u522B\u767D\u5AD6\uFF0C\u6C42\u5173\u6CE8\uFF09</h2><p>\u65B0\u5F00\u4E86\u4E00\u4E2A\u7EAF\u6280\u672F\u4EA4\u6D41\u7FA4\uFF08\u4E00\u7FA4\u5DF2\u6EE1\uFF09\uFF0C\u7FA4\u91CC\u6C1B\u56F4\u8FD8\u4E0D\u9519\uFF0C\u65E0\u5E7F\u544A\uFF0C\u65E0\u5957\u8DEF\uFF0C\u5355\u7EAF\u7684\u5439\u725B\u903C\uFF0C\u4F83\u4EBA\u751F\uFF0C\u60F3\u8FDB\u7684\u53EF\u4EE5\u901A\u8FC7\u4E0B\u65B9\u4E8C\u7EF4\u7801\u52A0\u6211\u5FAE\u4FE1\uFF0C\u5907\u6CE8\u8FDB\u7FA4\uFF01</p><p><img src="https://mmbiz.qpic.cn/mmbiz_jpg/PxMzT0Oibf4iaaq1LHN5nmBoW0HpH70QAzKz7kqcXajmMbhLkK7rc6CRLcKhybrXOkejBIMwTr56xxbGiameeNPEg/640?wx_fmt=jpeg" alt=""></p><p>\u6C42\u70B9\u8D5E\u3001\u5728\u770B\u3001\u5206\u4EAB\u4E09\u8FDE</p><p><img src="https://mmbiz.qpic.cn/mmbiz_png/PoF8jo1PmpwnEoGbnjibl4txzyz5QMz2YvGiaUDVlxTPCLQv8BlTIibqTsjvRVSAibuUrAicpbFBy6hYKia3KcfIL9UA/640?wx_fmt=png" alt=""></p>`,42),c=i("\u53C2\u8003\u94FE\u63A5\uFF1A"),o={href:"https://mp.weixin.qq.com/s?__biz=MzAwMTk4NjM1MA==&mid=2247504735&idx=1&sn=95d066b8f06562454e51ebb0ac1fb29c&chksm=9ad3c91eada44008ea4ed577b0fa99f575b161dd68374f3ca662c1e0ab335f3f432a7ce1259f#rd",target:"_blank",rel:"noopener noreferrer"},m=i("https://mp.weixin.qq.com/s?__biz=MzAwMTk4NjM1MA==&mid=2247504735&idx=1&sn=95d066b8f06562454e51ebb0ac1fb29c&chksm=9ad3c91eada44008ea4ed577b0fa99f575b161dd68374f3ca662c1e0ab335f3f432a7ce1259f#rd"),q=i("\uFF0C\u51FA\u5904\uFF1AJAVA\u65E5\u77E5\u5F55\uFF0C\u6574\u7406\uFF1A\u6C89\u9ED8\u738B\u4E8C");function p(b,g){const n=s("ExternalLinkIcon");return r(),t("div",null,[v,e("blockquote",null,[e("p",null,[c,e("a",o,[m,l(n)]),q])])])}var S=d(u,[["render",p],["__file","ruhyydclzfqqbfqq.html.vue"]]);export{S as default};
