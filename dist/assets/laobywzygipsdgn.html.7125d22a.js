import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";import{r,o as a,c as l,a as e,b as t,e as n,d as i}from"./app.545bdd96.js";const c={},v=n(`<p>\u5927\u5BB6\u597D\uFF0C\u6211\u662F\u4E8C\u54E5\u5440~</p><p>\u7EC6\u5FC3\u7684\u670B\u53CB\u5E94\u8BE5\u4F1A\u53D1\u73B0\uFF0C\u7EE7\u65B0\u6D6A\u5FAE\u535A\u4E4B\u540E\uFF0C\u5934\u6761\u3001\u817E\u8BAF\u3001\u6296\u97F3\u3001\u77E5\u4E4E\u3001\u5FEB\u624B\u3001\u5C0F\u7EA2\u4E66\u7B49\u5404\u5927\u5E73\u53F0\u9646\u9646\u7EED\u7EED\u90FD\u4E0A\u7EBF\u4E86\u201C<strong>\u7F51\u7EDC\u7528\u6237 IP \u5730\u5740\u663E\u793A\u529F\u80FD</strong>\u201D\uFF0C\u5883\u5916\u7528\u6237\u663E\u793A\u7684\u662F\u56FD\u5BB6\uFF0C\u56FD\u5185\u7684\u7528\u6237\u663E\u793A\u7684\u7701\u4EFD\uFF0C\u800C\u4E14\u6B64\u9879\u663E\u793A\u65E0\u6CD5\u5173\u95ED\uFF0C\u5F52\u5C5E\u5730\u5F3A\u5236\u663E\u793A\u3002</p><p>\u4F5C\u4E3A\u6280\u672F\u4EBA\uFF0C\u90A3\uFF01\u8FD9\u4E2A\u529F\u80FD\u8981\u600E\u4E48\u5B9E\u73B0\u5462\uFF1F</p><h2 id="httpservletrequest-\u83B7\u53D6-ip" tabindex="-1"><a class="header-anchor" href="#httpservletrequest-\u83B7\u53D6-ip" aria-hidden="true">#</a> HttpServletRequest \u83B7\u53D6 IP</h2><p>\u4E0B\u9762\uFF0C\u6211\u5C31\u6765\u8BB2\u8BB2\uFF0CJava \u4E2D\u662F\u5982\u4F55\u83B7\u53D6 IP \u5C5E\u5730\u7684\uFF0C\u4E3B\u8981\u5206\u4E3A\u4EE5\u4E0B\u51E0\u6B65\uFF1A</p><ul><li>\u901A\u8FC7 HttpServletRequest \u5BF9\u8C61\uFF0C\u83B7\u53D6\u7528\u6237\u7684 <strong>\u300CIP\u300D</strong> \u5730\u5740</li><li>\u901A\u8FC7 IP \u5730\u5740\uFF0C\u83B7\u53D6\u5BF9\u5E94\u7684\u7701\u4EFD\u3001\u57CE\u5E02</li></ul><p>\u9996\u5148\u9700\u8981\u5199\u4E00\u4E2A IP \u83B7\u53D6\u7684\u5DE5\u5177\u7C7B\uFF0C\u56E0\u4E3A\u6BCF\u4E00\u6B21\u7528\u6237\u7684 Request \u8BF7\u6C42\uFF0C\u90FD\u4F1A\u643A\u5E26\u4E0A\u8BF7\u6C42\u7684 IP \u5730\u5740\u653E\u5230\u8BF7\u6C42\u5934\u4E2D</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.UnknownHostException;
 
/**
 * \u5E38\u7528\u83B7\u53D6\u5BA2\u6237\u7AEF\u4FE1\u606F\u7684\u5DE5\u5177
 */
public class NetworkUtil {
 
    /**
     * \u83B7\u53D6ip\u5730\u5740
     */
    public static String getIpAddress(HttpServletRequest request) {
        String ip = request.getHeader(&quot;x-forwarded-for&quot;);
        if (ip == null || ip.length() == 0 || &quot;unknown&quot;.equalsIgnoreCase(ip)) {
            ip = request.getHeader(&quot;Proxy-Client-IP&quot;);
        }
        if (ip == null || ip.length() == 0 || &quot;unknown&quot;.equalsIgnoreCase(ip)) {
            ip = request.getHeader(&quot;WL-Proxy-Client-IP&quot;);
        }
        if (ip == null || ip.length() == 0 || &quot;unknown&quot;.equalsIgnoreCase(ip)) {
            ip = request.getHeader(&quot;HTTP_CLIENT_IP&quot;);
        }
        if (ip == null || ip.length() == 0 || &quot;unknown&quot;.equalsIgnoreCase(ip)) {
            ip = request.getHeader(&quot;HTTP_X_FORWARDED_FOR&quot;);
        }
        if (ip == null || ip.length() == 0 || &quot;unknown&quot;.equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        // \u672C\u673A\u8BBF\u95EE
        if (&quot;localhost&quot;.equalsIgnoreCase(ip) || &quot;127.0.0.1&quot;.equalsIgnoreCase(ip) || &quot;0:0:0:0:0:0:0:1&quot;.equalsIgnoreCase(ip)){
            // \u6839\u636E\u7F51\u5361\u53D6\u672C\u673A\u914D\u7F6E\u7684IP
            InetAddress inet;
            try {
                inet = InetAddress.getLocalHost();
                ip = inet.getHostAddress();
            } catch (UnknownHostException e) {
                e.printStackTrace();
            }
        }
        // \u5BF9\u4E8E\u901A\u8FC7\u591A\u4E2A\u4EE3\u7406\u7684\u60C5\u51B5\uFF0C\u7B2C\u4E00\u4E2AIP\u4E3A\u5BA2\u6237\u7AEF\u771F\u5B9EIP,\u591A\u4E2AIP\u6309\u7167&#39;,&#39;\u5206\u5272
        if (null != ip &amp;&amp; ip.length() &gt; 15) {
            if (ip.indexOf(&quot;,&quot;) &gt; 15) {
                ip = ip.substring(0, ip.indexOf(&quot;,&quot;));
            }
        }
        return ip;
    }
 
    /**

     * \u83B7\u53D6mac\u5730\u5740

     */
    public static String getMacAddress() throws Exception {
        // \u53D6mac\u5730\u5740
        byte[] macAddressBytes = NetworkInterface.getByInetAddress(InetAddress.getLocalHost()).getHardwareAddress();
        // \u4E0B\u9762\u4EE3\u7801\u662F\u628Amac\u5730\u5740\u62FC\u88C5\u6210String
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i &lt; macAddressBytes.length; i++) {
            if (i != 0) {
                sb.append(&quot;-&quot;);
            }
            // mac[i] &amp; 0xFF \u662F\u4E3A\u4E86\u628Abyte\u8F6C\u5316\u4E3A\u6B63\u6574\u6570
            String s = Integer.toHexString(macAddressBytes[i] &amp; 0xFF);
            sb.append(s.length() == 1 ? 0 + s : s);
        }
        return sb.toString().trim().toUpperCase();
    }
 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u901A\u8FC7\u6B64\u65B9\u6CD5\uFF0C\u4ECE\u8BF7\u6C42 Header \u4E2D\u83B7\u53D6\u5230\u7528\u6237\u7684 IP \u5730\u5740\u3002</p><p>\u4E4B\u524D\u6211\u5728\u505A\u7684\u9879\u76EE\u4E2D\uFF0C\u4E5F\u6709\u83B7\u53D6 IP \u5730\u5740\u5F52\u5C5E\u5730\u7701\u4EFD\u3001\u57CE\u5E02\u7684\u9700\u6C42\uFF0C\u7528\u7684\u662F\uFF1A\u6DD8\u5B9D IP \u5E93\u3002</p>`,10),o=i("\u5730\u5740\uFF1A"),u={href:"https://ip.taobao.com/",target:"_blank",rel:"noopener noreferrer"},b=i("https://ip.taobao.com/"),p=i("\u3002"),m=n('<p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-laobywzygipsdgn-23cd1007-7470-41f2-aaec-4091c0165597.jpg" alt=""></p><p>\u4E0D\u8FC7\uFF0Ctaobao \u7684 ip \u5E93\u4E0B\u7EBF\u4E86\u518D\u89C1 ip.taobao\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-laobywzygipsdgn-618629ba-d9f2-40f0-860d-86ffe2dfe049.jpg" alt="ip \u5F52\u5C5E\u5730"></p><p>\u539F\u6765\u7684\u8BF7\u6C42\u6E90\u7801\u5982\u4E0B\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-laobywzygipsdgn-30e1c72b-0a55-4371-8ab7-02de0a97ae52.jpg" alt=""></p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-laobywzygipsdgn-505194e1-f98c-4d81-9013-e96e0fff631f.jpg" alt=""></p><p>\u53EF\u4EE5\u770B\u5230\u65E5\u5FD7 log \u6587\u4EF6\u4E2D\uFF0C\u5927\u91CF\u7684 the request over max qps for user \u95EE\u9898\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-laobywzygipsdgn-b1205779-d638-41d2-9791-fc916c4c1492.jpg" alt="\u7559\u4E0B\u4E86\u96BE\u8FC7\u7684\u6CEA\u6C34"></p><h2 id="ip2region" tabindex="-1"><a class="header-anchor" href="#ip2region" aria-hidden="true">#</a> Ip2region</h2><p>\u4E0B\u9762\uFF0C\u7ED9\u5927\u5BB6\u4ECB\u7ECD\u4E0B\u4E4B\u524D\u5728 Github \u51B2\u6D6A\u65F6\u53D1\u73B0\u7684\u4E00\u4E2A\u65B0\u7684\u5F00\u6E90\u5E93\uFF1A</p>',10),g=e("strong",null,"Ip2region \u5F00\u6E90\u9879\u76EE",-1),h=i("\uFF0Cgithub \u5730\u5740\uFF1A"),x={href:"https://github.com/lionsoul2014/ip2region",target:"_blank",rel:"noopener noreferrer"},f=i("https://github.com/lionsoul2014/ip2region"),q=n(`<blockquote><p>\u76EE\u524D\u6700\u65B0\u5DF2\u66F4\u65B0\u5230\u4E86 v2.0 \u7248\u672C\uFF0Cip2region v2.0 \u662F\u4E00\u4E2A\u79BB\u7EBF IP \u5730\u5740\u5B9A\u4F4D\u5E93\u548C IP \u5B9A\u4F4D\u6570\u636E\u7BA1\u7406\u6846\u67B6\uFF0C10 \u5FAE\u79D2\u7EA7\u522B\u7684\u67E5\u8BE2\u6548\u7387\uFF0C\u51C6\u63D0\u4F9B\u4E86\u4F17\u591A\u4E3B\u6D41\u7F16\u7A0B\u8BED\u8A00\u7684 xdb \u6570\u636E\u751F\u6210\u548C\u67E5\u8BE2\u5BA2\u6237\u7AEF\u5B9E\u73B0\u3002</p></blockquote><h2 id="_99-9-\u51C6\u786E\u7387" tabindex="-1"><a class="header-anchor" href="#_99-9-\u51C6\u786E\u7387" aria-hidden="true">#</a> 99.9%\u51C6\u786E\u7387\uFF1A</h2><blockquote><p>\u6570\u636E\u805A\u5408\u4E86\u4E00\u4E9B\u77E5\u540D ip \u5230\u5730\u540D\u67E5\u8BE2\u63D0\u4F9B\u5546\u7684\u6570\u636E\uFF0C\u8FD9\u4E9B\u662F\u4ED6\u4EEC\u5B98\u65B9\u7684\u7684\u51C6\u786E\u7387\uFF0C\u7ECF\u6D4B\u8BD5\u7740\u5B9E\u6BD4\u7ECF\u5178\u7684\u7EAF\u771F IP \u5B9A\u4F4D\u51C6\u786E\u4E00\u4E9B\u3002ip2region \u7684\u6570\u636E\u805A\u5408\u81EA\u4EE5\u4E0B\u670D\u52A1\u5546\u7684\u5F00\u653E API \u6216\u8005\u6570\u636E(\u5347\u7EA7\u7A0B\u5E8F\u6BCF\u79D2\u8BF7\u6C42\u6B21\u6570 2 \u5230 4 \u6B21): 01, &gt;80%, \u6DD8\u5B9D IP \u5730\u5740\u5E93, <code>http://ip.taobao.com/%5C</code>02, \u224810%, GeoIP, <code>https://geoip.com/%5C</code>03, \u22482%, \u7EAF\u771F IP \u5E93, <code>http://www.cz88.net/%5C</code></p></blockquote><p>\u5907\u6CE8\uFF1A\u5982\u679C\u4E0A\u8FF0\u5F00\u653E API \u6216\u8005\u6570\u636E\u90FD\u4E0D\u7ED9\u5F00\u653E\u6570\u636E\u65F6 ip2region \u5C06\u505C\u6B62\u6570\u636E\u7684\u66F4\u65B0\u670D\u52A1\u3002</p><h2 id="\u591A\u67E5\u8BE2\u5BA2\u6237\u7AEF\u7684\u652F\u6301" tabindex="-1"><a class="header-anchor" href="#\u591A\u67E5\u8BE2\u5BA2\u6237\u7AEF\u7684\u652F\u6301" aria-hidden="true">#</a> \u591A\u67E5\u8BE2\u5BA2\u6237\u7AEF\u7684\u652F\u6301</h2><p>\u5DF2\u7ECF\u96C6\u6210\u7684\u5BA2\u6237\u7AEF\u6709\uFF1Ajava\u3001C#\u3001php\u3001c\u3001python\u3001nodejs\u3001php \u6269\u5C55(php5 \u548C php7)\u3001golang\u3001rust\u3001lua\u3001lua_c, nginx\u3002</p><table><thead><tr><th>binding</th><th>\u63CF\u8FF0</th><th>\u5F00\u53D1\u72B6\u6001</th><th>binary \u67E5\u8BE2\u8017\u65F6</th><th>b-tree \u67E5\u8BE2\u8017\u65F6</th><th>memory \u67E5\u8BE2\u8017\u65F6</th></tr></thead><tbody><tr><td>c</td><td>ANSC c binding</td><td>\u5DF2\u5B8C\u6210</td><td>0.0x \u6BEB\u79D2</td><td>0.0x \u6BEB\u79D2</td><td>0.00x \u6BEB\u79D2</td></tr><tr><td>c#</td><td>c# binding</td><td>\u5DF2\u5B8C\u6210</td><td>0.x \u6BEB\u79D2</td><td>0.x \u6BEB\u79D2</td><td>0.1x \u6BEB\u79D2</td></tr><tr><td>golang</td><td>golang binding</td><td>\u5DF2\u5B8C\u6210</td><td>0.x \u6BEB\u79D2</td><td>0.x \u6BEB\u79D2</td><td>0.1x \u6BEB\u79D2</td></tr><tr><td>java</td><td>java binding</td><td>\u5DF2\u5B8C\u6210</td><td>0.x \u6BEB\u79D2</td><td>0.x \u6BEB\u79D2</td><td>0.1x \u6BEB\u79D2</td></tr><tr><td>lua</td><td>lua \u5B9E\u73B0\u7684 binding</td><td>\u5DF2\u5B8C\u6210</td><td>0.x \u6BEB\u79D2</td><td>0.x \u6BEB\u79D2</td><td>0.x \u6BEB\u79D2</td></tr><tr><td>lua_c</td><td>lua \u7684 c \u6269\u5C55</td><td>\u5DF2\u5B8C\u6210</td><td>0.0x \u6BEB\u79D2</td><td>0.0x \u6BEB\u79D2</td><td>0.00x \u6BEB\u79D2</td></tr><tr><td>nginx</td><td>nginx \u7684 c \u6269\u5C55</td><td>\u5DF2\u5B8C\u6210</td><td>0.0x \u6BEB\u79D2</td><td>0.0x \u6BEB\u79D2</td><td>0.00x \u6BEB\u79D2</td></tr><tr><td>nodejs</td><td>nodejs</td><td>\u5DF2\u5B8C\u6210</td><td>0.x \u6BEB\u79D2</td><td>0.x \u6BEB\u79D2</td><td>0.1x \u6BEB\u79D2</td></tr><tr><td>php</td><td>php \u5B9E\u73B0\u7684 binding</td><td>\u5DF2\u5B8C\u6210</td><td>0.x \u6BEB\u79D2</td><td>0.1x \u6BEB\u79D2</td><td>0.1x \u6BEB\u79D2</td></tr><tr><td>php5_ext</td><td>php5 \u7684 c \u6269\u5C55</td><td>\u5DF2\u5B8C\u6210</td><td>0.0x \u6BEB\u79D2</td><td>0.0x \u6BEB\u79D2</td><td>0.00x \u6BEB\u79D2</td></tr><tr><td>php7_ext</td><td>php7 \u7684 c \u6269\u5C55</td><td>\u5DF2\u5B8C\u6210</td><td>0.0 \u6BEB\u79D2</td><td>0.0x \u6BEB\u79D2</td><td>0.00x \u6BEB\u79D2</td></tr><tr><td>python</td><td>python bindng</td><td>\u5DF2\u5B8C\u6210</td><td>0.x \u6BEB\u79D2</td><td>0.x \u6BEB\u79D2</td><td>0.x \u6BEB\u79D2</td></tr><tr><td>rust</td><td>rust binding</td><td>\u5DF2\u5B8C\u6210</td><td>0.x \u6BEB\u79D2</td><td>0.x \u6BEB\u79D2</td><td>0.x \u6BEB\u79D2</td></tr></tbody></table><h2 id="ip2region-v2-0-\u7279\u6027" tabindex="-1"><a class="header-anchor" href="#ip2region-v2-0-\u7279\u6027" aria-hidden="true">#</a> Ip2region V2.0 \u7279\u6027</h2><p><strong>\u300C1\u3001\u6807\u51C6\u5316\u7684\u6570\u636E\u683C\u5F0F\u300D</strong></p><p>\u6BCF\u4E2A ip \u6570\u636E\u6BB5\u7684 region \u4FE1\u606F\u90FD\u56FA\u5B9A\u4E86\u683C\u5F0F\uFF1A\u56FD\u5BB6|\u533A\u57DF|\u7701\u4EFD|\u57CE\u5E02|ISP\uFF0C\u53EA\u6709\u4E2D\u56FD\u7684\u6570\u636E\u7EDD\u5927\u90E8\u5206\u7CBE\u786E\u5230\u4E86\u57CE\u5E02\uFF0C\u5176\u4ED6\u56FD\u5BB6\u90E8\u5206\u6570\u636E\u53EA\u80FD\u5B9A\u4F4D\u5230\u56FD\u5BB6\uFF0C\u540E\u524D\u7684\u9009\u9879\u5168\u90E8\u662F 0\u3002</p><p><strong>\u300C2\u3001\u6570\u636E\u53BB\u91CD\u548C\u538B\u7F29\u300D</strong></p><p>xdb \u683C\u5F0F\u751F\u6210\u7A0B\u5E8F\u4F1A\u81EA\u52A8\u53BB\u91CD\u548C\u538B\u7F29\u90E8\u5206\u6570\u636E\uFF0C\u9ED8\u8BA4\u7684\u5168\u90E8 IP \u6570\u636E\uFF0C\u751F\u6210\u7684 ip2region.xdb \u6570\u636E\u5E93\u662F 11MiB\uFF0C\u968F\u7740\u6570\u636E\u7684\u8BE6\u7EC6\u5EA6\u589E\u52A0\u6570\u636E\u5E93\u7684\u5927\u5C0F\u4E5F\u6162\u6162\u589E\u5927\u3002</p><p><strong>\u300C3\u3001\u6781\u901F\u67E5\u8BE2\u54CD\u5E94\u300D</strong></p><p>\u5373\u4F7F\u662F\u5B8C\u5168\u57FA\u4E8E xdb \u6587\u4EF6\u7684\u67E5\u8BE2\uFF0C\u5355\u6B21\u67E5\u8BE2\u54CD\u5E94\u65F6\u95F4\u5728\u5341\u5FAE\u79D2\u7EA7\u522B\uFF0C\u53EF\u901A\u8FC7\u5982\u4E0B\u4E24\u79CD\u65B9\u5F0F\u5F00\u542F\u5185\u5B58\u52A0\u901F\u67E5\u8BE2\uFF1A</p><ol><li>vIndex \u7D22\u5F15\u7F13\u5B58 \uFF1A\u4F7F\u7528\u56FA\u5B9A\u7684 512KiB \u7684\u5185\u5B58\u7A7A\u95F4\u7F13\u5B58 vector index \u6570\u636E\uFF0C\u51CF\u5C11\u4E00\u6B21 IO \u78C1\u76D8\u64CD\u4F5C\uFF0C\u4FDD\u6301\u5E73\u5747\u67E5\u8BE2\u6548\u7387\u7A33\u5B9A\u5728 10-20 \u5FAE\u79D2\u4E4B\u95F4\u3002</li><li>xdb \u6574\u4E2A\u6587\u4EF6\u7F13\u5B58\uFF1A\u5C06\u6574\u4E2A xdb \u6587\u4EF6\u5168\u90E8\u52A0\u8F7D\u5230\u5185\u5B58\uFF0C\u5185\u5B58\u5360\u7528\u7B49\u540C\u4E8E xdb \u6587\u4EF6\u5927\u5C0F\uFF0C\u65E0\u78C1\u76D8 IO \u64CD\u4F5C\uFF0C\u4FDD\u6301\u5FAE\u79D2\u7EA7\u522B\u7684\u67E5\u8BE2\u6548\u7387\u3002</li></ol><p><strong>\u300C4\u3001\u6781\u901F\u67E5\u8BE2\u54CD\u5E94\u300D</strong></p><p>v2.0 \u683C\u5F0F\u7684 xdb \u652F\u6301\u4EBF\u7EA7\u522B\u7684 IP \u6570\u636E\u6BB5\u884C\u6570\uFF0Cregion \u4FE1\u606F\u4E5F\u53EF\u4EE5\u5B8C\u5168\u81EA\u5B9A\u4E49\uFF0C\u4F8B\u5982\uFF1A\u4F60\u53EF\u4EE5\u5728 region \u4E2D\u8FFD\u52A0\u7279\u5B9A\u4E1A\u52A1\u9700\u6C42\u7684\u6570\u636E\uFF0C\u4F8B\u5982\uFF1AGPS \u4FE1\u606F/\u56FD\u9645\u7EDF\u4E00\u5730\u57DF\u4FE1\u606F\u7F16\u7801/\u90AE\u7F16\u7B49\u3002\u4E5F\u5C31\u662F\u4F60\u5B8C\u5168\u53EF\u4EE5\u4F7F\u7528 ip2region \u6765\u7BA1\u7406\u4F60\u81EA\u5DF1\u7684 IP \u5B9A\u4F4D\u6570\u636E\u3002</p><h2 id="ip2region-xdb-java-\u67E5\u8BE2\u5BA2\u6237\u7AEF\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#ip2region-xdb-java-\u67E5\u8BE2\u5BA2\u6237\u7AEF\u5B9E\u73B0" aria-hidden="true">#</a> ip2region xdb java \u67E5\u8BE2\u5BA2\u6237\u7AEF\u5B9E\u73B0</h2><ul><li><strong>\u300C\u4F7F\u7528\u65B9\u5F0F\u300D</strong></li></ul><p>\u5F15\u5165 maven \u4ED3\u5E93\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.lionsoul&lt;/groupId&gt;
    &lt;artifactId&gt;ip2region&lt;/artifactId&gt;
    &lt;version&gt;2.6.4&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>\u300C\u5B8C\u5168\u57FA\u4E8E\u6587\u4EF6\u7684\u67E5\u8BE2\u300D</strong></li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import org.lionsoul.ip2region.xdb.Searcher;
import java.io.*;
import java.util.concurrent.TimeUnit;

public class SearcherTest {
    public static void main(String[] args) {
        // 1\u3001\u521B\u5EFA searcher \u5BF9\u8C61
        String dbPath = &quot;ip2region.xdb file path&quot;;
        Searcher searcher = null;
        try {
            searcher = Searcher.newWithFileOnly(dbPath);
        } catch (IOException e) {
            System.out.printf(&quot;failed to create searcher with \`%s\`: %s\\n&quot;, dbPath, e);
            return;
        }

        // 2\u3001\u67E5\u8BE2
        try {
            String ip = &quot;1.2.3.4&quot;;
            long sTime = System.nanoTime();
            String region = searcher.search(ip);
            long cost = TimeUnit.NANOSECONDS.toMicros((long) (System.nanoTime() - sTime));
            System.out.printf(&quot;{region: %s, ioCount: %d, took: %d \u03BCs}\\n&quot;, region, searcher.getIOCount(), cost);
        } catch (Exception e) {
            System.out.printf(&quot;failed to search(%s): %s\\n&quot;, ip, e);
        }

        // 3\u3001\u5907\u6CE8\uFF1A\u5E76\u53D1\u4F7F\u7528\uFF0C\u6BCF\u4E2A\u7EBF\u7A0B\u9700\u8981\u521B\u5EFA\u4E00\u4E2A\u72EC\u7ACB\u7684 searcher \u5BF9\u8C61\u5355\u72EC\u4F7F\u7528\u3002
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>\u300C\u7F13\u5B58 VectorIndex \u7D22\u5F15\u300D</strong></li></ul><p>\u6211\u4EEC\u53EF\u4EE5\u63D0\u524D\u4ECE xdb \u6587\u4EF6\u4E2D\u52A0\u8F7D\u51FA\u6765 VectorIndex \u6570\u636E\uFF0C\u7136\u540E\u5168\u5C40\u7F13\u5B58\uFF0C\u6BCF\u6B21\u521B\u5EFA Searcher \u5BF9\u8C61\u7684\u65F6\u5019\u4F7F\u7528\u5168\u5C40\u7684 VectorIndex \u7F13\u5B58\u53EF\u4EE5\u51CF\u5C11\u4E00\u6B21\u56FA\u5B9A\u7684 IO \u64CD\u4F5C\uFF0C\u4ECE\u800C\u52A0\u901F\u67E5\u8BE2\uFF0C\u51CF\u5C11 IO \u538B\u529B\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import org.lionsoul.ip2region.xdb.Searcher;
import java.io.*;
import java.util.concurrent.TimeUnit;

public class SearcherTest {
    public static void main(String[] args) {
        String dbPath = &quot;ip2region.xdb file path&quot;;

        // 1\u3001\u4ECE dbPath \u4E2D\u9884\u5148\u52A0\u8F7D VectorIndex \u7F13\u5B58\uFF0C\u5E76\u4E14\u628A\u8FD9\u4E2A\u5F97\u5230\u7684\u6570\u636E\u4F5C\u4E3A\u5168\u5C40\u53D8\u91CF\uFF0C\u540E\u7EED\u53CD\u590D\u4F7F\u7528\u3002
        byte[] vIndex;
        try {
            vIndex = Searcher.loadVectorIndexFromFile(dbPath);
        } catch (Exception e) {
            System.out.printf(&quot;failed to load vector index from \`%s\`: %s\\n&quot;, dbPath, e);
            return;
        }

        // 2\u3001\u4F7F\u7528\u5168\u5C40\u7684 vIndex \u521B\u5EFA\u5E26 VectorIndex \u7F13\u5B58\u7684\u67E5\u8BE2\u5BF9\u8C61\u3002
        Searcher searcher;
        try {
            searcher = Searcher.newWithVectorIndex(dbPath, vIndex);
        } catch (Exception e) {
            System.out.printf(&quot;failed to create vectorIndex cached searcher with \`%s\`: %s\\n&quot;, dbPath, e);
            return;
        }

        // 3\u3001\u67E5\u8BE2
        try {
            String ip = &quot;1.2.3.4&quot;;
            long sTime = System.nanoTime();
            String region = searcher.search(ip);
            long cost = TimeUnit.NANOSECONDS.toMicros((long) (System.nanoTime() - sTime));
            System.out.printf(&quot;{region: %s, ioCount: %d, took: %d \u03BCs}\\n&quot;, region, searcher.getIOCount(), cost);
        } catch (Exception e) {
            System.out.printf(&quot;failed to search(%s): %s\\n&quot;, ip, e);
        }

        // \u5907\u6CE8\uFF1A\u6BCF\u4E2A\u7EBF\u7A0B\u9700\u8981\u5355\u72EC\u521B\u5EFA\u4E00\u4E2A\u72EC\u7ACB\u7684 Searcher \u5BF9\u8C61\uFF0C\u4F46\u662F\u90FD\u5171\u4EAB\u5168\u5C40\u7684\u5236\u5EA6 vIndex \u7F13\u5B58\u3002
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>\u300C\u7F13\u5B58\u6574\u4E2A xdb \u6570\u636E\u300D</strong></li></ul><p>\u6211\u4EEC\u4E5F\u53EF\u4EE5\u9884\u5148\u52A0\u8F7D\u6574\u4E2A ip2region.xdb \u7684\u6570\u636E\u5230\u5185\u5B58\uFF0C\u7136\u540E\u57FA\u4E8E\u8FD9\u4E2A\u6570\u636E\u521B\u5EFA\u67E5\u8BE2\u5BF9\u8C61\u6765\u5B9E\u73B0\u5B8C\u5168\u57FA\u4E8E\u6587\u4EF6\u7684\u67E5\u8BE2\uFF0C\u7C7B\u4F3C\u4E4B\u524D\u7684 memory search\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>import org.lionsoul.ip2region.xdb.Searcher;
import java.io.*;
import java.util.concurrent.TimeUnit;

public class SearcherTest {
    public static void main(String[] args) {
        String dbPath = &quot;ip2region.xdb file path&quot;;

        // 1\u3001\u4ECE dbPath \u52A0\u8F7D\u6574\u4E2A xdb \u5230\u5185\u5B58\u3002
        byte[] cBuff;
        try {
            cBuff = Searcher.loadContentFromFile(dbPath);
        } catch (Exception e) {
            System.out.printf(&quot;failed to load content from \`%s\`: %s\\n&quot;, dbPath, e);
            return;
        }

        // 2\u3001\u4F7F\u7528\u4E0A\u8FF0\u7684 cBuff \u521B\u5EFA\u4E00\u4E2A\u5B8C\u5168\u57FA\u4E8E\u5185\u5B58\u7684\u67E5\u8BE2\u5BF9\u8C61\u3002
        Searcher searcher;
        try {
            searcher = Searcher.newWithBuffer(cBuff);
        } catch (Exception e) {
            System.out.printf(&quot;failed to create content cached searcher: %s\\n&quot;, e);
            return;
        }

        // 3\u3001\u67E5\u8BE2
        try {
            String ip = &quot;1.2.3.4&quot;;
            long sTime = System.nanoTime();
            String region = searcher.search(ip);
            long cost = TimeUnit.NANOSECONDS.toMicros((long) (System.nanoTime() - sTime));
            System.out.printf(&quot;{region: %s, ioCount: %d, took: %d \u03BCs}\\n&quot;, region, searcher.getIOCount(), cost);
        } catch (Exception e) {
            System.out.printf(&quot;failed to search(%s): %s\\n&quot;, ip, e);
        }

        // \u5907\u6CE8\uFF1A\u5E76\u53D1\u4F7F\u7528\uFF0C\u7528\u6574\u4E2A xdb \u6570\u636E\u7F13\u5B58\u521B\u5EFA\u7684\u67E5\u8BE2\u5BF9\u8C61\u53EF\u4EE5\u5B89\u5168\u7684\u7528\u4E8E\u5E76\u53D1\uFF0C\u4E5F\u5C31\u662F\u4F60\u53EF\u4EE5\u628A\u8FD9\u4E2A searcher \u5BF9\u8C61\u505A\u6210\u5168\u5C40\u5BF9\u8C61\u53BB\u8DE8\u7EBF\u7A0B\u8BBF\u95EE\u3002
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="idea-\u4E2D\u505A\u4E2A\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#idea-\u4E2D\u505A\u4E2A\u6D4B\u8BD5" aria-hidden="true">#</a> IDEA \u4E2D\u505A\u4E2A\u6D4B\u8BD5</h2><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-laobywzygipsdgn-5d234914-d404-44cf-85bb-8e7fa8ae498b.jpg" alt=""></p><p>ip \u5C5E\u5730\u56FD\u5185\u7684\u8BDD\uFF0C\u4F1A\u5C55\u793A\u7701\u4EFD\uFF0C\u56FD\u5916\u7684\u8BDD\uFF0C\u53EA\u4F1A\u5C55\u793A\u56FD\u5BB6\u3002\u53EF\u4EE5\u901A\u8FC7\u5982\u4E0B\u56FE\u8FD9\u4E2A\u65B9\u6CD5\u8FDB\u884C\u8FDB\u4E00\u6B65\u5C01\u88C5\uFF0C\u5F97\u5230\u83B7\u53D6 IP \u5C5E\u5730\u7684\u4FE1\u606F\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-laobywzygipsdgn-a6e0fc04-60f1-4629-9a69-3186d644cda0.jpg" alt=""></p><blockquote><p>\u4E0B\u9762\u662F\u5B98\u7F51\u7ED9\u51FA\u7684\u547D\u4EE4\u8FD0\u884C jar \u65B9\u5F0F\u7ED9\u51FA\u7684\u6D4B\u8BD5 demo\uFF0C\u53EF\u4EE5\u7406\u89E3\u4E0B</p></blockquote><h2 id="\u7F16\u8BD1\u6D4B\u8BD5\u7A0B\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u7F16\u8BD1\u6D4B\u8BD5\u7A0B\u5E8F" aria-hidden="true">#</a> \u7F16\u8BD1\u6D4B\u8BD5\u7A0B\u5E8F</h2><p>\u901A\u8FC7 maven \u6765\u7F16\u8BD1\u6D4B\u8BD5\u7A0B\u5E8F\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code># cd \u5230 java binding \u7684\u6839\u76EE\u5F55
cd binding/java/
mvn compile package
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u4F1A\u5728\u5F53\u524D\u76EE\u5F55\u7684 target \u76EE\u5F55\u4E0B\u5F97\u5230\u4E00\u4E2A <code>ip2region-{version}.jar</code> \u7684\u6253\u5305\u6587\u4EF6\u3002</p><h2 id="\u67E5\u8BE2\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#\u67E5\u8BE2\u6D4B\u8BD5" aria-hidden="true">#</a> \u67E5\u8BE2\u6D4B\u8BD5</h2><p>\u53EF\u4EE5\u901A\u8FC7 <code>java -jar ip2region-{version}.jar search</code> \u547D\u4EE4\u6765\u6D4B\u8BD5\u67E5\u8BE2\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u279C  java git:(v2.0_xdb) \u2717 java -jar target/ip2region-2.6.0.jar search
java -jar ip2region-{version}.jar search [command options]
options:
 --db string              ip2region binary xdb file path
 --cache-policy string    cache policy: file/vectorIndex/content
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F8B\u5982\uFF1A\u4F7F\u7528\u9ED8\u8BA4\u7684 data/ip2region.xdb \u6587\u4EF6\u8FDB\u884C\u67E5\u8BE2\u6D4B\u8BD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u279C  java git:(v2.0_xdb) \u2717 java -jar target/ip2region-2.6.0.jar search --db=../../data/ip2region.xdb
ip2region xdb searcher test program, cachePolicy: vectorIndex
type &#39;quit&#39; to exit
ip2region&gt;&gt; 1.2.3.4
{region: \u7F8E\u56FD|0|\u534E\u76DB\u987F|0|\u8C37\u6B4C, ioCount: 7, took: 82 \u03BCs}
ip2region&gt;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u5165 ip \u5373\u53EF\u8FDB\u884C\u67E5\u8BE2\u6D4B\u8BD5\uFF0C\u4E5F\u53EF\u4EE5\u5206\u522B\u8BBE\u7F6E cache-policy \u4E3A file/vectorIndex/content \u6765\u6D4B\u8BD5\u4E09\u79CD\u4E0D\u540C\u7F13\u5B58\u5B9E\u73B0\u7684\u67E5\u8BE2\u6548\u679C\u3002</p><h2 id="bench-\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#bench-\u6D4B\u8BD5" aria-hidden="true">#</a> bench \u6D4B\u8BD5</h2><p>\u53EF\u4EE5\u901A\u8FC7 <code>java -jar ip2region-{version}.jar bench</code> \u547D\u4EE4\u6765\u8FDB\u884C bench \u6D4B\u8BD5\uFF0C\u4E00\u65B9\u9762\u786E\u4FDD xdb \u6587\u4EF6\u6CA1\u6709\u9519\u8BEF\uFF0C\u4E00\u65B9\u9762\u53EF\u4EE5\u8BC4\u4F30\u67E5\u8BE2\u6027\u80FD\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u279C  java git:(v2.0_xdb) \u2717 java -jar target/ip2region-2.6.0.jar bench
java -jar ip2region-{version}.jar bench [command options]
options:
 --db string              ip2region binary xdb file path
 --src string             source ip text file path
 --cache-policy string    cache policy: file/vectorIndex/content
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F8B\u5982\uFF1A\u901A\u8FC7\u9ED8\u8BA4\u7684 data/ip2region.xdb \u548C data/ip.merge.txt \u6587\u4EF6\u8FDB\u884C bench \u6D4B\u8BD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u279C  java git:(v2.0_xdb) \u2717 java -jar target/ip2region-2.6.0.jar bench --db=../../data/ip2region.xdb --src=../../data/ip.merge.txt
Bench finished, {cachePolicy: vectorIndex, total: 3417955, took: 8s, cost: 2 \u03BCs/op}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u901A\u8FC7\u5206\u522B\u8BBE\u7F6E cache-policy \u4E3A file/vectorIndex/content \u6765\u6D4B\u8BD5\u4E09\u79CD\u4E0D\u540C\u7F13\u5B58\u5B9E\u73B0\u7684\u6548\u679C\u3002@Note: \u6CE8\u610F bench \u4F7F\u7528\u7684 src \u6587\u4EF6\u8981\u662F\u751F\u6210\u5BF9\u5E94 xdb \u6587\u4EF6\u76F8\u540C\u7684\u6E90\u6587\u4EF6\u3002</p><blockquote><p>\u5230\u8FD9\u91CC\u83B7\u53D6\u7528\u6237 IP \u5C5E\u5730\u5DF2\u7ECF\u5B8C\u6210\u5566\uFF0C\u8FD9\u7BC7\u6587\u7AE0\u4ECB\u7ECD\u7684 v2.0 \u7248\u672C\uFF0C\u6709\u5174\u8DA3\u7684\u5C0F\u4F19\u4F34\u53EF\u4EE5\u767B\u5F55\u4E0A\u95E8\u7684 github \u5730\u5740\u4E86\u89E3\u4E0B v1.0 \u7248\u672C</p></blockquote>`,51);function I(y,j){const d=r("ExternalLinkIcon");return a(),l("div",null,[v,e("p",null,[o,e("a",u,[b,t(d)]),p]),m,e("p",null,[g,h,e("a",x,[f,t(d)])]),q])}var P=s(c,[["render",I],["__file","laobywzygipsdgn.html.vue"]]);export{P as default};
