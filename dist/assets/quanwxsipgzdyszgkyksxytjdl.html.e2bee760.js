import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{r,o as d,c as l,a as e,b as s,e as a,d as n}from"./app.610296d2.js";const o={},c=a(`<p>\u7EC6\u5FC3\u7684\u5C0F\u4F19\u4F34\u53EF\u80FD\u4F1A\u53D1\u73B0\uFF0C\u6700\u8FD1\u8611\u83C7\u65B0\u4E0A\u7EBF\u4E86 <strong>IP</strong> \u5C5E\u5730\u7684\u529F\u80FD\uFF0C\u5C0F\u4F19\u4F34\u5728\u53D1\u8868\u52A8\u6001\u3001\u53D1\u8868\u8BC4\u8BBA\u4EE5\u53CA\u804A\u5929\u7684\u65F6\u5019\uFF0C\u90FD\u4F1A\u663E\u793A\u81EA\u5DF1\u7684 <strong>IP</strong> \u5C5E\u5730\u4FE1\u606F</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-60ba9e45-080c-4dca-922e-cccfd3071587.jpg" alt=""></p><p>\u52A8\u6001\u663E\u793AIP\u5C5E\u5730</p><p>\u5728\u8611\u83C7\u7FA4\u804A\u4E2D\uFF0C\u4E5F\u53EF\u4EE5\u5C55\u793A IP \u5C5E\u5730\uFF0C\u4E0B\u9762\u662F\u5C0F\u4F19\u4F34\u4EEC\u5728\u4EA4\u6D41\u7FA4\u4E2D\u663E\u793A\u7684</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-7fefb9a6-d55d-4764-8197-bd007395d6db.jpg" alt=""></p><p>\u4E0B\u9762\uFF0C\u6211\u5C31\u6765\u8BB2\u8BB2\uFF0C<strong>Java</strong> \u4E2D\u662F\u5982\u4F55\u83B7\u53D6 <strong>IP</strong> \u5C5E\u5730\u7684\uFF0C\u4E3B\u8981\u5206\u4E3A\u4EE5\u4E0B\u51E0\u6B65</p><ul><li>\u901A\u8FC7 HttpServletRequest \u5BF9\u8C61\uFF0C\u83B7\u53D6\u7528\u6237\u7684 <strong>IP</strong> \u5730\u5740</li><li>\u901A\u8FC7 IP \u5730\u5740\uFF0C\u83B7\u53D6\u5BF9\u5E94\u7684\u7701\u4EFD\u3001\u57CE\u5E02</li></ul><p>\u9996\u5148\u9700\u8981\u5199\u4E00\u4E2A <strong>IP</strong> \u83B7\u53D6\u7684\u5DE5\u5177\u7C7B\uFF0C\u56E0\u4E3A\u6BCF\u4E00\u6B21\u7528\u6237\u7684 <strong>Request</strong> \u8BF7\u6C42\uFF0C\u90FD\u4F1A\u643A\u5E26\u4E0A\u8BF7\u6C42\u7684 <strong>IP</strong> \u5730\u5740\u653E\u5230\u8BF7\u6C42\u5934\u4E2D\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class IpUtil {
    public static String getIpAddr(ServerHttpRequest request) {
        HttpHeaders headers = request.getHeaders();
        String ipAddress = headers.getFirst(&quot;X-Forwarded-For&quot;);
        if (ipAddress == null || ipAddress.length() == 0 || &quot;unknown&quot;.equalsIgnoreCase(ipAddress)) {
            ipAddress = headers.getFirst(&quot;Proxy-Client-IP&quot;);
        }
        if (ipAddress == null || ipAddress.length() == 0 || &quot;unknown&quot;.equalsIgnoreCase(ipAddress)) {
            ipAddress = headers.getFirst(&quot;WL-Proxy-Client-IP&quot;);
        }
        if (ipAddress == null || ipAddress.length() == 0 || &quot;unknown&quot;.equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddress().getAddress().getHostAddress();
            if (ipAddress.equals(&quot;127.0.0.1&quot;) || ipAddress.equals(&quot;0:0:0:0:0:0:0:1&quot;)) {
                // \u6839\u636E\u7F51\u5361\u53D6\u672C\u673A\u914D\u7F6E\u7684IP
                try {
                    InetAddress inet = InetAddress.getLocalHost();
                    ipAddress = inet.getHostAddress();
                } catch (UnknownHostException e) {
                    log.error(&quot;\u6839\u636E\u7F51\u5361\u83B7\u53D6\u672C\u673A\u914D\u7F6E\u7684IP\u5F02\u5E38&quot;, e);
                }

            }
        }

        // \u5BF9\u4E8E\u901A\u8FC7\u591A\u4E2A\u4EE3\u7406\u7684\u60C5\u51B5\uFF0C\u7B2C\u4E00\u4E2AIP\u4E3A\u5BA2\u6237\u7AEF\u771F\u5B9EIP\uFF0C\u591A\u4E2AIP\u6309\u7167&#39;,&#39;\u5206\u5272
        if (ipAddress != null &amp;&amp; ipAddress.indexOf(&quot;,&quot;) &gt; 0) {
            ipAddress = ipAddress.split(&quot;,&quot;)[0];
        }

        return ipAddress;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u6709\u4E09\u4E2A\u540D\u8BCD\uFF0C\u5206\u522B\u662F</p><ul><li><strong>X-Forwarded-For</strong>\uFF1A<strong>\u4E00\u4E2A HTTP</strong> \u6269\u5C55\u5934\u90E8\uFF0C\u4E3B\u8981\u662F\u4E3A\u4E86\u8BA9 <strong>Web</strong> \u670D\u52A1\u5668\u83B7\u53D6\u8BBF\u95EE\u7528\u6237\u7684\u771F\u5B9E <strong>IP</strong> \u5730\u5740\u3002\u6BCF\u4E2A <strong>IP</strong> \u5730\u5740\uFF0C\u6BCF\u4E2A\u503C\u901A\u8FC7\u9017\u53F7+\u7A7A\u683C\u5206\u5F00\uFF0C\u6700\u5DE6\u8FB9\u662F\u6700\u539F\u59CB\u5BA2\u6237\u7AEF\u7684 <strong>IP</strong> \u5730\u5740\uFF0C\u4E2D\u95F4\u5982\u679C\u6709\u591A\u5C42\u4EE3\u7406\uFF0C\u6BCF\u2F00\u5C42\u4EE3\u7406\u4F1A\u5C06\u8FDE\u63A5\u5B83\u7684\u5BA2\u6237\u7AEF <strong>IP</strong> \u8FFD\u52A0\u5728 <strong>X-Forwarded-For</strong> \u53F3\u8FB9\u3002</li><li><strong>X-Real-IP</strong>\uFF1A\u4E00\u822C\u53EA\u8BB0\u5F55\u771F\u5B9E\u53D1\u51FA\u8BF7\u6C42\u7684\u5BA2\u6237\u7AEFIP</li><li><strong>Proxy-Client-IP</strong>\uFF1A\u8FD9\u4E2A\u4E00\u822C\u662F\u7ECF\u8FC7 <strong>Apache http</strong> \u670D\u52A1\u5668\u7684\u8BF7\u6C42\u624D\u4F1A\u6709\uFF0C\u7528 <strong>Apache http</strong> \u505A\u4EE3\u7406\u65F6\u4E00\u822C\u4F1A\u52A0\u4E0A <strong>Proxy-Client-IP</strong> \u8BF7\u6C42\u5934</li><li><strong>WL-Proxy-Client-IP</strong>\uFF1A\u4E5F\u662F\u901A\u8FC7 Apache http \u670D\u52A1\u5668\uFF0C\u5728 <strong>weblogic</strong> \u63D2\u4EF6\u52A0\u4E0A\u7684\u5934\u3002</li></ul><p>\u5728\u6211\u4EEC\u83B7\u53D6\u5230\u7528\u6237\u7684 <strong>IP</strong> \u5730\u5740\u540E\uFF0C\u90A3\u4E48\u5C31\u53EF\u4EE5\u83B7\u53D6\u5BF9\u5E94\u7684 <strong>ip</strong> \u4FE1\u606F\u4E86</p><p>\u8611\u83C7\u6700\u5F00\u59CB\u4F7F\u7528\u7684\u662F\u6DD8\u5B9D <strong>IP</strong> \u5E93</p><blockquote><p>\u5730\u5740\uFF1Ahttps://ip.taobao.com/</p></blockquote><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-d1796439-3c8b-4fb5-bf21-ff0057a21d92.jpg" alt=""></p><p>\u63A5\u5165\u65B9\u5F0F\u4E5F\u6BD4\u8F83\u7B80\u5355\uFF0C\u5C31\u662F\u901A\u8FC7\u5C01\u88C5\u4E00\u4E2A <strong>http</strong> \u8BF7\u6C42\uFF0C\u4F20\u5165\u7528\u6237\u7684 <strong>ip</strong> \u4F5C\u4E3A\u53C2\u6570\uFF0C\u5C31\u53EF\u4EE5\u8FD4\u56DE <strong>ip</strong> \u5BF9\u5E94\u7684\u56FD\u5BB6\uFF0C\u7701\uFF0C\u57CE\u5E02 \u4FE1\u606F</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-f4108a0c-8cf3-400d-a108-f126faded625.jpg" alt=""></p><p>\u539F\u6765\u7684\u8BF7\u6C42\u65B9\u5F0F\u5982\u4E0B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**
 * \u83B7\u53D6IP\u5730\u5740\u6765\u6E90
 *
 * @param content        \u8BF7\u6C42\u7684\u53C2\u6570 \u683C\u5F0F\u4E3A\uFF1Aname=xxx&amp;pwd=xxx
 * @param encodingString \u670D\u52A1\u5668\u7AEF\u8BF7\u6C42\u7F16\u7801\u3002\u5982GBK,UTF-8\u7B49
 * @return
 * @throws UnsupportedEncodingException
 */
public static String getAddresses(String content, String encodingString) {
    String ip = content.substring(3);
    if (!Util.isIpAddress(ip)) {
        log.info(&quot;IP\u5730\u5740\u4E3A\u7A7A&quot;);
        return null;
    }
    // \u6DD8\u5B9DIP\u5B95\u673A\uFF0C\u76EE\u524D\u4F7F\u7528Ip2region\uFF1Ahttps://github.com/lionsoul2014/ip2region
    String cityInfo = getCityInfo(ip);
    log.info(&quot;\u8FD4\u56DE\u7684IP\u4FE1\u606F\uFF1A{}&quot;, cityInfo);

    // TODO \u6DD8\u5B9D\u63A5\u53E3\u76EE\u524D\u5DF2\u7ECF\u5B95\u673A\uFF0C\u56E0\u6B64\u6682\u65F6\u6CE8\u91CA\u4E0B\u9762\u4EE3\u7801
    try {
        // \u8FD9\u91CC\u8C03\u7528pconline\u7684\u63A5\u53E3
        String urlStr = &quot;http://ip.taobao.com/service/getIpInfo.php&quot;;
        // \u4ECEhttp://whois.pconline.com.cn\u53D6\u5F97IP\u6240\u5728\u7684\u7701\u5E02\u533A\u4FE1\u606F
        String returnStr = getResult(urlStr, content, encodingString);
        if (returnStr != null) {
            // \u5904\u7406\u8FD4\u56DE\u7684\u7701\u5E02\u533A\u4FE1\u606F
            log.info(&quot;\u8C03\u7528IP\u89E3\u6790\u63A5\u53E3\u8FD4\u56DE\u7684\u5185\u5BB9:&quot; + returnStr);
            String[] temp = returnStr.split(&quot;,&quot;);
            //\u65E0\u6548IP\uFF0C\u5C40\u57DF\u7F51\u6D4B\u8BD5
            if (temp.length &lt; 3) {
                return &quot;0&quot;;
            }
            // \u56FD\u5BB6
            String country = &quot;&quot;;
            // \u533A\u57DF
            String area = &quot;&quot;;
            // \u7701
            String region = &quot;&quot;;
            // \u5E02
            String city = &quot;&quot;;
            // \u53BF
            String county = &quot;&quot;;
            // \u8FD0\u8425\u5546
            String isp = &quot;&quot;;
            Map&lt;String, Object&gt; map = JsonUtils.jsonToMap(returnStr);

            if (map.get(&quot;code&quot;) != null) {
                Map&lt;String, String&gt; data = (Map&lt;String, String&gt;) map.get(&quot;data&quot;);
                country = data.get(&quot;country&quot;);
                area = data.get(&quot;area&quot;);
                region = data.get(&quot;region&quot;);
                city = data.get(&quot;city&quot;);
                county = data.get(&quot;area&quot;);
                isp = data.get(&quot;isp&quot;);
            }

            log.info(&quot;\u83B7\u53D6IP\u5730\u5740\u5BF9\u5E94\u7684\u5730\u5740&quot; + country + &quot;=&quot; + area + &quot;=&quot; + region + &quot;=&quot; + city + &quot;=&quot; + county + &quot;=&quot; + isp);
            StringBuffer result = new StringBuffer();
            result.append(country);
            result.append(&quot;|&quot;);
            result.append(region);
            result.append(&quot;|&quot;);
            result.append(city);
            result.append(&quot;|&quot;);
            result.append(isp);
            return result.toString();
        }
    } catch (Exception e) {
        log.error(e.getMessage());
        return null;
    }
    return null;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F46\u662F\uFF0C\u4E4B\u524D\u63A5\u5165\u6DD8\u5B9D <strong>IP</strong> \u5E93\u7684\u65F6\u5019\uFF0C\u4E5F\u7ECF\u5E38\u4F1A\u9047\u5230\u670D\u52A1\u4E0D\u53EF\u7528\u7684\u60C5\u51B5\uFF0C\u5E76\u4E14\u7531\u4E8E\u9650\u5236\u4E86 <strong>QPS</strong> \u4E3A <strong>1</strong>\uFF0C\u6240\u4EE5\u5982\u679C\u8BBF\u95EE\u91CF\u5927\u7684\u8BDD\uFF0C\u5C31\u6CA1\u529E\u6CD5\u83B7\u53D6\u4E86\u3002</p><p>\u800C\u5230\u73B0\u5728\u7684\u8BDD\u5012\u597D\u4E86\uFF0C\u8FD9\u4E2A\u63A5\u53E3\u4E5F\u4E0D\u5BF9\u5916\u63D0\u4F9B\u670D\u52A1\u4E86\uFF0C\u76F4\u63A5\u4E0B\u7EBF\u4E86\uFF0C\u4E0D\u8BA9\u8C03\u7528\u4E86\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-698d6eaa-3ca1-4a76-9ba3-7cfd6624b675.jpg" alt=""></p><p>\u540E\u9762\uFF0C\u964C\u6EAA\u5728 <strong>Github</strong> \u51B2\u6D6A\u7684\u65F6\u5019\uFF0C\u53D1\u73B0\u4E86 <strong>Ip2region</strong> \u9879\u76EE\u3002</p><p>\u4E00\u4E2A\u51C6\u786E\u7387 <strong>99.9%</strong> \u7684\u79BB\u7EBF <strong>IP</strong> \u5730\u5740\u5B9A\u4F4D\u5E93\uFF0C<strong>0.0x</strong> \u6BEB\u79D2\u7EA7\u67E5\u8BE2\uFF0C<strong>ip2region.db</strong> \u6570\u636E\u5E93\u53EA\u6709\u6570 <strong>MB</strong>\uFF0C\u63D0\u4F9B\u4E86 java,php,c,python,nodejs,golang,c# \u7B49\u67E5\u8BE2\u7ED1\u5B9A\u548C<strong>Binary</strong>\uFF0C<strong>B\u6811</strong>\uFF0C\u5185\u5B58\u4E09\u79CD\u67E5\u8BE2\u7B97\u6CD5\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-45292cab-6e8b-465a-8ab4-4ad9e99d32f0.jpg" alt=""></p><p>\u6570\u636E\u805A\u5408\u4E86\u4E00\u4E9B\u77E5\u540D <strong>ip</strong> \u5230\u5730\u540D\u67E5\u8BE2\u63D0\u4F9B\u5546\u7684\u6570\u636E\uFF0C\u8FD9\u4E9B\u662F\u4ED6\u4EEC\u5B98\u65B9\u7684\u7684\u51C6\u786E\u7387\uFF0C\u7ECF\u6D4B\u8BD5\u7740\u5B9E\u6BD4\u7ECF\u5178\u7684\u7EAF\u771F <strong>IP</strong> \u5B9A\u4F4D\u51C6\u786E\u4E00\u4E9B\u3002<strong>ip2region</strong> \u7684\u6570\u636E\u805A\u5408\u81EA\u4EE5\u4E0B\u670D\u52A1\u5546\u7684\u5F00\u653E <strong>API</strong> \u6216\u8005\u6570\u636E\u3002</p><ul><li>80%, \u6DD8\u5B9DIP\u5730\u5740\u5E93, http://ip.taobao.com/</li><li>\u224810%, GeoIP, https://geoip.com/</li><li>\u22482%, \u7EAF\u771FIP\u5E93, http://www.cz88.net/</li></ul><blockquote><p><strong>\u5907\u6CE8</strong>\uFF1A\u5982\u679C\u4E0A\u8FF0\u5F00\u653EAPI\u6216\u8005\u6570\u636E\u90FD\u4E0D\u7ED9\u5F00\u653E\u6570\u636E\u65F6ip2region\u5C06\u505C\u6B62\u6570\u636E\u7684\u66F4\u65B0\u670D\u52A1\u3002</p></blockquote><p>\u6BCF\u6761 <strong>ip</strong> \u6570\u636E\u6BB5\u90FD\u56FA\u5B9A\u4E86\u683C\u5F0F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>_\u57CE\u5E02Id|\u56FD\u5BB6|\u533A\u57DF|\u7701\u4EFD|\u57CE\u5E02|ISP_
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u53EA\u6709\u4E2D\u56FD\u7684\u6570\u636E\u7CBE\u786E\u5230\u4E86\u57CE\u5E02\uFF0C\u5176\u4ED6\u56FD\u5BB6\u6709\u90E8\u5206\u6570\u636E\u53EA\u80FD\u5B9A\u4F4D\u5230\u56FD\u5BB6\uFF0C\u540E\u524D\u7684\u9009\u9879\u5168\u90E8\u662F <strong>0</strong>\uFF0C\u5DF2\u7ECF\u5305\u542B\u4E86\u5168\u90E8\u4F60\u80FD\u67E5\u5230\u7684\u5927\u5927\u5C0F\u5C0F\u7684\u56FD\u5BB6</p><p>\u751F\u6210\u7684\u6570\u636E\u5E93\u6587\u4EF6 <strong>ip2region.db</strong> \u53EA\u6709\u51E0 <strong>MB</strong>\uFF0C\u6700\u5C0F\u7684\u7248\u672C\u53EA\u6709 <strong>1.5MB</strong>\uFF0C\u968F\u7740\u6570\u636E\u7684\u8BE6\u7EC6\u5EA6\u589E\u52A0\u6570\u636E\u5E93\u7684\u5927\u5C0F\u4E5F\u6162\u6162\u589E\u5927\uFF0C\u76EE\u524D\u8FD8\u6CA1\u8D85\u8FC7 <strong>8MB</strong>\u3002</p><h2 id="\u5185\u7F6E\u7684\u4E09\u79CD\u67E5\u8BE2\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u5185\u7F6E\u7684\u4E09\u79CD\u67E5\u8BE2\u7B97\u6CD5" aria-hidden="true">#</a> \u5185\u7F6E\u7684\u4E09\u79CD\u67E5\u8BE2\u7B97\u6CD5</h2><p>\u5168\u90E8\u7684\u67E5\u8BE2\u5BA2\u6237\u7AEF\u5355\u6B21\u67E5\u8BE2\u90FD\u5728 <strong>0.x</strong> \u6BEB\u79D2\u7EA7\u522B\uFF0C\u5185\u7F6E\u4E86\u4E09\u79CD\u67E5\u8BE2\u7B97\u6CD5</p><ul><li><strong>memory</strong> \u7B97\u6CD5\uFF1A\u6574\u4E2A\u6570\u636E\u5E93\u5168\u90E8\u8F7D\u5165\u5185\u5B58\uFF0C\u5355\u6B21\u67E5\u8BE2\u90FD\u57280.1x\u6BEB\u79D2\u5185\uFF0CC\u8BED\u8A00\u7684\u5BA2\u6237\u7AEF\u5355\u6B21\u67E5\u8BE2\u57280.00x\u6BEB\u79D2\u7EA7\u522B\u3002</li><li><strong>binary</strong> \u7B97\u6CD5\uFF1A\u57FA\u4E8E\u4E8C\u5206\u67E5\u627E\uFF0C\u57FA\u4E8Eip2region.db\u6587\u4EF6\uFF0C\u4E0D\u9700\u8981\u8F7D\u5165\u5185\u5B58\uFF0C\u5355\u6B21\u67E5\u8BE2\u57280.x\u6BEB\u79D2\u7EA7\u522B\u3002</li><li><strong>b-tree</strong> \u7B97\u6CD5\uFF1A\u57FA\u4E8Ebtree\u7B97\u6CD5\uFF0C\u57FA\u4E8Eip2region.db\u6587\u4EF6\uFF0C\u4E0D\u9700\u8981\u8F7D\u5165\u5185\u5B58\uFF0C\u5355\u8BCD\u67E5\u8BE2\u57280.x\u6BEB\u79D2\u7EA7\u522B\uFF0C\u6BD4binary\u7B97\u6CD5\u66F4\u5FEB\u3002</li></ul><h2 id="ip2region\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#ip2region\u5B89\u88C5" aria-hidden="true">#</a> ip2region\u5B89\u88C5</h2><p>\u4E0B\u9762\uFF0C\u5C31\u8BA9\u6211\u4EEC\u7ED9\u9879\u76EE\u5F15\u5165 <strong>ip2region</strong>\uFF0C\u8FDB\u884C <strong>ip</strong> \u4FE1\u606F\u8F6C\u6362\u5427</p><p>\u9996\u5148\u5F15\u5165 <strong>maven</strong> \u4F9D\u8D56</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.lionsoul&lt;/groupId&gt;
    &lt;artifactId&gt;ip2region&lt;/artifactId&gt;
    &lt;version&gt;1.7.2&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u7F16\u5199\u4E00\u4E2A\u5DE5\u5177\u7C7B <strong>IpUtils</strong> \uFF0C\u9996\u5148\u9700\u8981\u52A0\u8F7D <strong>ip2region.db</strong> \u6587\u4EF6</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>static {
    dbPath = createFtlFileByFtlArray() + &quot;ip2region.db&quot;;
    try {
        config = new DbConfig();
    } catch (DbMakerConfigException e) {
        e.printStackTrace();
    }
    try {
        searcher = new DbSearcher(config, dbPath);
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u52A0\u8F7D\u7684\u65F6\u5019\uFF0C\u9700\u8981\u4E0B\u8F7D\u4ED3\u5E93\u4E2D\u7684 <strong>ip2region.db</strong> \u6587\u4EF6\uFF0C\u7136\u540E\u653E\u5230 <strong>resource</strong> \u76EE\u5F55\u4E0B</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-0e8d29e4-8374-461b-b5cb-2f7be9891b8f.jpg" alt=""></p><p>\u7136\u540E\uFF0C\u901A\u8FC7\u5185\u7F6E\u7684\u4E09\u79CD\u7B97\u6CD5\uFF0C\u5206\u522B\u8F6C\u6362\u7528\u6237 <strong>ip</strong> \u5730\u5740</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>    public static String getCityInfo(String ip) {

        if (StringUtils.isEmpty(dbPath)) {
            log.error(&quot;Error: Invalid ip2region.db file&quot;);
            return null;
        }
        if(config == null || searcher == null){
            log.error(&quot;Error: DbSearcher or DbConfig is null&quot;);
            return null;
        }

        //\u67E5\u8BE2\u7B97\u6CD5
        //B-tree, B\u6811\u641C\u7D22\uFF08\u66F4\u5FEB\uFF09
        int algorithm = DbSearcher.BTREE_ALGORITHM;

        //Binary,\u4F7F\u7528\u4E8C\u5206\u641C\u7D22
        //DbSearcher.BINARY_ALGORITHM

        //Memory,\u52A0\u8F7D\u5185\u5B58\uFF08\u6700\u5FEB\uFF09
        //DbSearcher.MEMORY_ALGORITYM
        try {
            // \u4F7F\u7528\u9759\u6001\u4EE3\u7801\u5757\uFF0C\u51CF\u5C11\u6587\u4EF6\u8BFB\u53D6\u64CD\u4F5C
//            DbConfig config = new DbConfig();
//            DbSearcher searcher = new DbSearcher(config, dbPath);

            //define the method
            Method method = null;
            switch (algorithm) {
                case DbSearcher.BTREE_ALGORITHM:
                    method = searcher.getClass().getMethod(&quot;btreeSearch&quot;, String.class);
                    break;
                case DbSearcher.BINARY_ALGORITHM:
                    method = searcher.getClass().getMethod(&quot;binarySearch&quot;, String.class);
                    break;
                case DbSearcher.MEMORY_ALGORITYM:
                    method = searcher.getClass().getMethod(&quot;memorySearch&quot;, String.class);
                    break;
                default:
            }

            DataBlock dataBlock = null;
            if (Util.isIpAddress(ip) == false) {
                System.out.println(&quot;Error: Invalid ip address&quot;);
            }

            dataBlock = (DataBlock) method.invoke(searcher, ip);
            String ipInfo = dataBlock.getRegion();
            if (!StringUtils.isEmpty(ipInfo)) {
                ipInfo = ipInfo.replace(&quot;|0&quot;, &quot;&quot;);
                ipInfo = ipInfo.replace(&quot;0|&quot;, &quot;&quot;);
            }
            return ipInfo;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0B\u9762\uFF0C\u6211\u4EEC\u7F16\u5199 <strong>main</strong> \u51FD\u6570\u8FDB\u884C\u6D4B\u8BD5\uFF0C\u53D1\u73B0\u53EF\u4EE5\u6B63\u5E38\u7684\u89E3\u6790\u51FA <strong>ip</strong> \u4FE1\u606F</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-c7dabe2e-93e5-4c18-bf42-dcb44d6a2bb3.jpg" alt=""></p><p>\u7531\u4E8E ip \u5C5E\u5730\u5728\u56FD\u5185\u7684\u8BDD\uFF0C\u53EA\u4F1A\u5C55\u793A\u7701\u4EFD\uFF0C\u800C\u56FD\u5916\u7684\u8BDD\uFF0C\u53EA\u4F1A\u5C55\u793A\u56FD\u5BB6\u3002\u6240\u4EE5\u6211\u4EEC\u8FD8\u9700\u8981\u5BF9\u8FD9\u4E2A\u65B9\u6CD5\u8FDB\u884C\u4E00\u4E0B\u5C01\u88C5\uFF0C\u5F97\u5230\u83B7\u53D6 IP \u5C5E\u5730\u7684\u4FE1\u606F\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**
 * \u83B7\u53D6IP\u5C5E\u5730
 * @param ip
 * @return
 */
public static String getIpPossession(String ip) {
    String cityInfo = getCityInfo(ip);
    if (!StringUtils.isEmpty(cityInfo)) {
        cityInfo = cityInfo.replace(&quot;|&quot;, &quot; &quot;);
        String[] cityList = cityInfo.split(&quot; &quot;);
        if (cityList.length &gt; 0) {
            // \u56FD\u5185\u7684\u663E\u793A\u5230\u5177\u4F53\u7684\u7701
            if (&quot;\u4E2D\u56FD&quot;.equals(cityList[0])) {
                if (cityList.length &gt; 1) {
                    return cityList[1];
                }
            }
            // \u56FD\u5916\u663E\u793A\u5230\u56FD\u5BB6
            return cityList[0];
        }
    }
    return &quot;\u672A\u77E5&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0B\u9762\uFF0C\u6211\u4EEC\u5728\u627E\u4E00\u4E2A \u56FD\u5916\u7684 <strong>IP</strong> \u6D4B\u8BD5\u4E00\u4E0B\u6548\u679C\u3002\u53EF\u4EE5\u770B\u5230\u5DF2\u7ECF\u80FD\u591F\u6B63\u5E38\u7684\u663E\u793A <strong>IP</strong> \u5C5E\u5730\u4FE1\u606F\u4E86~</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-677306bd-bac7-4d43-99d2-324f7f01b265.jpg" alt=""></p><p>\u5230\u8FD9\u91CC\u5982\u679C\u83B7\u53D6\u7528\u6237\u7684 IP \u5C5E\u5730\u5DF2\u7ECF\u5B8C\u6210\u5566\uFF0C\u5982\u679C\u60F3\u8981\u4E86\u89E3\u5173\u4E8E\u66F4\u591A <strong>ip2region</strong> \u7684\u529F\u80FD\uFF0C\u6B22\u8FCE\u8BBF\u95EE\u5176 <strong>Github</strong> \u5730\u5740\u8FDB\u884C\u5B66\u4E60\u3002</p><h2 id="\u9879\u76EE\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u5730\u5740" aria-hidden="true">#</a> \u9879\u76EE\u5730\u5740</h2><p>https://github.com/lionsoul2014/ip2region</p><hr><p><strong>\u5FAE\u4FE18.0\u5C06\u597D\u53CB\u653E\u5F00\u5230\u4E86\u4E00\u4E07\uFF0C\u5C0F\u4F19\u4F34\u53EF\u4EE5\u52A0\u6211\u5927\u53F7\u4E86\uFF0C\u5148\u5230\u5148\u5F97\uFF0C\u518D\u6EE1\u5C31\u771F\u6CA1\u4E86</strong></p><p><strong>\u626B\u63CF\u4E0B\u65B9\u4E8C\u7EF4\u7801\u5373\u53EF\u52A0\u6211\u5FAE\u4FE1\u5566\uFF0C<code>2022\uFF0C\u62B1\u56E2\u53D6\u6696\uFF0C\u4E00\u8D77\u725B\u903C\u3002</code></strong></p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-7dd82667-7566-4c78-9aff-da27d172b7ab.jpg" alt=""></p><h2 id="\u63A8\u8350\u9605\u8BFB" tabindex="-1"><a class="header-anchor" href="#\u63A8\u8350\u9605\u8BFB" aria-hidden="true">#</a> \u63A8\u8350\u9605\u8BFB</h2>`,59),u={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247501082&idx=1&sn=c2ad0e4ba438dab00f89660d942707d3&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},v=n("\u65B0\u6765\u4E2A\u6280\u672F\u603B\u76D1\uFF0C\u628ADDD\u843D\u5730\u7684\u90A3\u53EB\u4E00\u4E2A\u9AD8\u7EA7\uFF0C\u670D\u6C14\uFF01"),g={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247501074&idx=1&sn=629db39555b3d344f928b87abecbba69&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},b=n("\u8FD8\u5728\u7528\u547D\u4EE4\u884C\u770B\u65E5\u5FD7\uFF1F\u5FEB\u7528Kibana\u5427\uFF0C\u53EF\u89C6\u5316\u65E5\u5FD7\u5206\u6790YYDS\uFF01"),p={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500998&idx=1&sn=58d1222ef56fa3bef2abeb832c3a3c32&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},m=n("Grafana 9 \u6B63\u5F0F\u53D1\u5E03\uFF0C\u66F4\u6613\u7528\uFF0C\u66F4\u9177\u70AB\u4E86\uFF01"),h={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500820&idx=1&sn=9895bd4c39b90d45eb2a10efedb236ac&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},q=n("Mall\u7535\u5546\u5B9E\u6218\u9879\u76EE\u5168\u9762\u5347\u7EA7\uFF01\u652F\u6301\u6700\u65B0\u7248SpringBoot\uFF0C\u5E72\u6389\u5FAA\u73AF\u4F9D\u8D56..."),f={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500584&idx=1&sn=14ab8fa74ed8391a5cb91449f699123a&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},x=n("\u963F\u91CC\u51FA\u54C1\uFF01SpringBoot\u5E94\u7528\u81EA\u52A8\u5316\u90E8\u7F72\u795E\u5668\uFF0CIDEA\u7248Jenkins\uFF1F"),y={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500482&idx=1&sn=713a30c88cea125f4768e6a0df939600&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},_=n("\u518D\u89C1\u547D\u4EE4\u884C\uFF01\u4E00\u952E\u90E8\u7F72\u5E94\u7528\u5230\u8FDC\u7A0B\u670D\u52A1\u5668\uFF0CIDEA\u5B98\u65B9Docker\u63D2\u4EF6\u771F\u9999\uFF01"),I={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499376&idx=1&sn=3ed28795cdd35fbaa3506e74a56703b0&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},S=n("\u91CD\u78C5\u66F4\u65B0\uFF01Mall\u5B9E\u6218\u6559\u7A0B\u5168\u9762\u5347\u7EA7\uFF0C\u77AC\u95F4\u9AD8\u5927\u4E0A\u4E86\uFF01"),w={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486684&idx=1&sn=807fd808adac8019eb2095ba088efe54&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},k=n("40K+Star\uFF01Mall\u7535\u5546\u5B9E\u6218\u9879\u76EE\u5F00\u6E90\u56DE\u5FC6\u5F55\uFF01"),P=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-ca4d4747-df0a-434e-9512-4fba2dcb272a.jpg",alt:""})],-1),j=n("\u8F6C\u8F7D\u94FE\u63A5\uFF1A"),z={href:"https://mp.weixin.qq.com/s/tQ-4ClnfCucUREF-_ynQ2g",target:"_blank",rel:"noopener noreferrer"},A=n("https://mp.weixin.qq.com/s/tQ-4ClnfCucUREF-_ynQ2g"),M=n("\uFF0C\u51FA\u5904\uFF1Amacrozheng\uFF0C\u6574\u7406\uFF1A\u6C89\u9ED8\u738B\u4E8C");function B(E,C){const i=r("ExternalLinkIcon");return d(),l("div",null,[c,e("ul",null,[e("li",null,[e("a",u,[v,s(i)])]),e("li",null,[e("a",g,[b,s(i)])]),e("li",null,[e("a",p,[m,s(i)])]),e("li",null,[e("a",h,[q,s(i)])]),e("li",null,[e("a",f,[x,s(i)])]),e("li",null,[e("a",y,[_,s(i)])]),e("li",null,[e("a",I,[S,s(i)])]),e("li",null,[e("a",w,[k,s(i)])])]),P,e("blockquote",null,[e("p",null,[j,e("a",z,[A,s(i)]),M])])])}var R=t(o,[["render",B],["__file","quanwxsipgzdyszgkyksxytjdl.html.vue"]]);export{R as default};
