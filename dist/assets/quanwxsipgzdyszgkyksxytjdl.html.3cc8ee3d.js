import{_ as r}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as d,a as e,d as n,b as s,e as t,r as a}from"./app.99eb8281.js";const o={},c=t(`<p>细心的小伙伴可能会发现，最近蘑菇新上线了 <strong>IP</strong> 属地的功能，小伙伴在发表动态、发表评论以及聊天的时候，都会显示自己的 <strong>IP</strong> 属地信息</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-60ba9e45-080c-4dca-922e-cccfd3071587.jpg" alt="" loading="lazy"></p><p>动态显示IP属地</p><p>在蘑菇群聊中，也可以展示 IP 属地，下面是小伙伴们在交流群中显示的</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-7fefb9a6-d55d-4764-8197-bd007395d6db.jpg" alt="" loading="lazy"></p><p>下面，我就来讲讲，<strong>Java</strong> 中是如何获取 <strong>IP</strong> 属地的，主要分为以下几步</p><ul><li>通过 HttpServletRequest 对象，获取用户的 <strong>IP</strong> 地址</li><li>通过 IP 地址，获取对应的省份、城市</li></ul><p>首先需要写一个 <strong>IP</strong> 获取的工具类，因为每一次用户的 <strong>Request</strong> 请求，都会携带上请求的 <strong>IP</strong> 地址放到请求头中。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class IpUtil {
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
                // 根据网卡取本机配置的IP
                try {
                    InetAddress inet = InetAddress.getLocalHost();
                    ipAddress = inet.getHostAddress();
                } catch (UnknownHostException e) {
                    log.error(&quot;根据网卡获取本机配置的IP异常&quot;, e);
                }

            }
        }

        // 对于通过多个代理的情况，第一个IP为客户端真实IP，多个IP按照&#39;,&#39;分割
        if (ipAddress != null &amp;&amp; ipAddress.indexOf(&quot;,&quot;) &gt; 0) {
            ipAddress = ipAddress.split(&quot;,&quot;)[0];
        }

        return ipAddress;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有三个名词，分别是</p><ul><li><strong>X-Forwarded-For</strong>：<strong>一个 HTTP</strong> 扩展头部，主要是为了让 <strong>Web</strong> 服务器获取访问用户的真实 <strong>IP</strong> 地址。每个 <strong>IP</strong> 地址，每个值通过逗号+空格分开，最左边是最原始客户端的 <strong>IP</strong> 地址，中间如果有多层代理，每⼀层代理会将连接它的客户端 <strong>IP</strong> 追加在 <strong>X-Forwarded-For</strong> 右边。</li><li><strong>X-Real-IP</strong>：一般只记录真实发出请求的客户端IP</li><li><strong>Proxy-Client-IP</strong>：这个一般是经过 <strong>Apache http</strong> 服务器的请求才会有，用 <strong>Apache http</strong> 做代理时一般会加上 <strong>Proxy-Client-IP</strong> 请求头</li><li><strong>WL-Proxy-Client-IP</strong>：也是通过 Apache http 服务器，在 <strong>weblogic</strong> 插件加上的头。</li></ul><p>在我们获取到用户的 <strong>IP</strong> 地址后，那么就可以获取对应的 <strong>ip</strong> 信息了</p><p>蘑菇最开始使用的是淘宝 <strong>IP</strong> 库</p>`,13),u={href:"https://ip.taobao.com/",target:"_blank",rel:"noopener noreferrer"},v=t(`<p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-d1796439-3c8b-4fb5-bf21-ff0057a21d92.jpg" alt="" loading="lazy"></p><p>接入方式也比较简单，就是通过封装一个 <strong>http</strong> 请求，传入用户的 <strong>ip</strong> 作为参数，就可以返回 <strong>ip</strong> 对应的国家，省，城市 信息</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-f4108a0c-8cf3-400d-a108-f126faded625.jpg" alt="" loading="lazy"></p><p>原来的请求方式如下</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 获取IP地址来源
 *
 * @param content        请求的参数 格式为：name=xxx&amp;pwd=xxx
 * @param encodingString 服务器端请求编码。如GBK,UTF-8等
 * @return
 * @throws UnsupportedEncodingException
 */
public static String getAddresses(String content, String encodingString) {
    String ip = content.substring(3);
    if (!Util.isIpAddress(ip)) {
        log.info(&quot;IP地址为空&quot;);
        return null;
    }
    // 淘宝IP宕机，目前使用Ip2region：https://github.com/lionsoul2014/ip2region
    String cityInfo = getCityInfo(ip);
    log.info(&quot;返回的IP信息：{}&quot;, cityInfo);

    // TODO 淘宝接口目前已经宕机，因此暂时注释下面代码
    try {
        // 这里调用pconline的接口
        String urlStr = &quot;http://ip.taobao.com/service/getIpInfo.php&quot;;
        // 从http://whois.pconline.com.cn取得IP所在的省市区信息
        String returnStr = getResult(urlStr, content, encodingString);
        if (returnStr != null) {
            // 处理返回的省市区信息
            log.info(&quot;调用IP解析接口返回的内容:&quot; + returnStr);
            String[] temp = returnStr.split(&quot;,&quot;);
            //无效IP，局域网测试
            if (temp.length &lt; 3) {
                return &quot;0&quot;;
            }
            // 国家
            String country = &quot;&quot;;
            // 区域
            String area = &quot;&quot;;
            // 省
            String region = &quot;&quot;;
            // 市
            String city = &quot;&quot;;
            // 县
            String county = &quot;&quot;;
            // 运营商
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

            log.info(&quot;获取IP地址对应的地址&quot; + country + &quot;=&quot; + area + &quot;=&quot; + region + &quot;=&quot; + city + &quot;=&quot; + county + &quot;=&quot; + isp);
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是，之前接入淘宝 <strong>IP</strong> 库的时候，也经常会遇到服务不可用的情况，并且由于限制了 <strong>QPS</strong> 为 <strong>1</strong>，所以如果访问量大的话，就没办法获取了。</p><p>而到现在的话倒好了，这个接口也不对外提供服务了，直接下线了，不让调用了。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-698d6eaa-3ca1-4a76-9ba3-7cfd6624b675.jpg" alt="" loading="lazy"></p><p>后面，陌溪在 <strong>Github</strong> 冲浪的时候，发现了 <strong>Ip2region</strong> 项目。</p><p>一个准确率 <strong>99.9%</strong> 的离线 <strong>IP</strong> 地址定位库，<strong>0.0x</strong> 毫秒级查询，<strong>ip2region.db</strong> 数据库只有数 <strong>MB</strong>，提供了 java,php,c,python,nodejs,golang,c# 等查询绑定和<strong>Binary</strong>，<strong>B树</strong>，内存三种查询算法。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-45292cab-6e8b-465a-8ab4-4ad9e99d32f0.jpg" alt="" loading="lazy"></p><p>数据聚合了一些知名 <strong>ip</strong> 到地名查询提供商的数据，这些是他们官方的的准确率，经测试着实比经典的纯真 <strong>IP</strong> 定位准确一些。<strong>ip2region</strong> 的数据聚合自以下服务商的开放 <strong>API</strong> 或者数据。</p>`,12),g={href:"http://ip.taobao.com/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://geoip.com/",target:"_blank",rel:"noopener noreferrer"},p={href:"http://www.cz88.net/",target:"_blank",rel:"noopener noreferrer"},m=t(`<blockquote><p><strong>备注</strong>：如果上述开放API或者数据都不给开放数据时ip2region将停止数据的更新服务。</p></blockquote><p>每条 <strong>ip</strong> 数据段都固定了格式：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>_城市Id|国家|区域|省份|城市|ISP_
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只有中国的数据精确到了城市，其他国家有部分数据只能定位到国家，后前的选项全部是 <strong>0</strong>，已经包含了全部你能查到的大大小小的国家</p><p>生成的数据库文件 <strong>ip2region.db</strong> 只有几 <strong>MB</strong>，最小的版本只有 <strong>1.5MB</strong>，随着数据的详细度增加数据库的大小也慢慢增大，目前还没超过 <strong>8MB</strong>。</p><h2 id="内置的三种查询算法" tabindex="-1"><a class="header-anchor" href="#内置的三种查询算法" aria-hidden="true">#</a> 内置的三种查询算法</h2><p>全部的查询客户端单次查询都在 <strong>0.x</strong> 毫秒级别，内置了三种查询算法</p><ul><li><strong>memory</strong> 算法：整个数据库全部载入内存，单次查询都在0.1x毫秒内，C语言的客户端单次查询在0.00x毫秒级别。</li><li><strong>binary</strong> 算法：基于二分查找，基于ip2region.db文件，不需要载入内存，单次查询在0.x毫秒级别。</li><li><strong>b-tree</strong> 算法：基于btree算法，基于ip2region.db文件，不需要载入内存，单词查询在0.x毫秒级别，比binary算法更快。</li></ul><h2 id="ip2region安装" tabindex="-1"><a class="header-anchor" href="#ip2region安装" aria-hidden="true">#</a> ip2region安装</h2><p>下面，就让我们给项目引入 <strong>ip2region</strong>，进行 <strong>ip</strong> 信息转换吧</p><p>首先引入 <strong>maven</strong> 依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.lionsoul&lt;/groupId&gt;
    &lt;artifactId&gt;ip2region&lt;/artifactId&gt;
    &lt;version&gt;1.7.2&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后编写一个工具类 <strong>IpUtils</strong> ，首先需要加载 <strong>ip2region.db</strong> 文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static {
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在加载的时候，需要下载仓库中的 <strong>ip2region.db</strong> 文件，然后放到 <strong>resource</strong> 目录下</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-0e8d29e4-8374-461b-b5cb-2f7be9891b8f.jpg" alt="" loading="lazy"></p><p>然后，通过内置的三种算法，分别转换用户 <strong>ip</strong> 地址</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public static String getCityInfo(String ip) {

        if (StringUtils.isEmpty(dbPath)) {
            log.error(&quot;Error: Invalid ip2region.db file&quot;);
            return null;
        }
        if(config == null || searcher == null){
            log.error(&quot;Error: DbSearcher or DbConfig is null&quot;);
            return null;
        }

        //查询算法
        //B-tree, B树搜索（更快）
        int algorithm = DbSearcher.BTREE_ALGORITHM;

        //Binary,使用二分搜索
        //DbSearcher.BINARY_ALGORITHM

        //Memory,加载内存（最快）
        //DbSearcher.MEMORY_ALGORITYM
        try {
            // 使用静态代码块，减少文件读取操作
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面，我们编写 <strong>main</strong> 函数进行测试，发现可以正常的解析出 <strong>ip</strong> 信息</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-c7dabe2e-93e5-4c18-bf42-dcb44d6a2bb3.jpg" alt="" loading="lazy"></p><p>由于 ip 属地在国内的话，只会展示省份，而国外的话，只会展示国家。所以我们还需要对这个方法进行一下封装，得到获取 IP 属地的信息。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 获取IP属地
 * @param ip
 * @return
 */
public static String getIpPossession(String ip) {
    String cityInfo = getCityInfo(ip);
    if (!StringUtils.isEmpty(cityInfo)) {
        cityInfo = cityInfo.replace(&quot;|&quot;, &quot; &quot;);
        String[] cityList = cityInfo.split(&quot; &quot;);
        if (cityList.length &gt; 0) {
            // 国内的显示到具体的省
            if (&quot;中国&quot;.equals(cityList[0])) {
                if (cityList.length &gt; 1) {
                    return cityList[1];
                }
            }
            // 国外显示到国家
            return cityList[0];
        }
    }
    return &quot;未知&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面，我们在找一个 国外的 <strong>IP</strong> 测试一下效果。可以看到已经能够正常的显示 <strong>IP</strong> 属地信息了~</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-677306bd-bac7-4d43-99d2-324f7f01b265.jpg" alt="" loading="lazy"></p><p>到这里如果获取用户的 IP 属地已经完成啦，如果想要了解关于更多 <strong>ip2region</strong> 的功能，欢迎访问其 <strong>Github</strong> 地址进行学习。</p><h2 id="项目地址" tabindex="-1"><a class="header-anchor" href="#项目地址" aria-hidden="true">#</a> 项目地址</h2>`,26),h={href:"https://github.com/lionsoul2014/ip2region",target:"_blank",rel:"noopener noreferrer"},q=e("hr",null,null,-1),f=e("p",null,[e("strong",null,"微信8.0将好友放开到了一万，小伙伴可以加我大号了，先到先得，再满就真没了")],-1),x=e("p",null,[e("strong",null,[n("扫描下方二维码即可加我微信啦，"),e("code",null,"2022，抱团取暖，一起牛逼。")])],-1),y=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-7dd82667-7566-4c78-9aff-da27d172b7ab.jpg",alt:"",loading:"lazy"})],-1),_=e("h2",{id:"推荐阅读",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#推荐阅读","aria-hidden":"true"},"#"),n(" 推荐阅读")],-1),I={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247501082&idx=1&sn=c2ad0e4ba438dab00f89660d942707d3&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},w={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247501074&idx=1&sn=629db39555b3d344f928b87abecbba69&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},S={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500998&idx=1&sn=58d1222ef56fa3bef2abeb832c3a3c32&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},k={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500820&idx=1&sn=9895bd4c39b90d45eb2a10efedb236ac&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},z={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500584&idx=1&sn=14ab8fa74ed8391a5cb91449f699123a&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},P={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247500482&idx=1&sn=713a30c88cea125f4768e6a0df939600&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},j={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247499376&idx=1&sn=3ed28795cdd35fbaa3506e74a56703b0&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},A={href:"https://mp.weixin.qq.com/s?__biz=MzU1Nzg4NjgyMw==&mid=2247486684&idx=1&sn=807fd808adac8019eb2095ba088efe54&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},M=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanwxsipgzdyszgkyksxytjdl-ca4d4747-df0a-434e-9512-4fba2dcb272a.jpg",alt:"",loading:"lazy"})],-1),B={href:"https://mp.weixin.qq.com/s/tQ-4ClnfCucUREF-_ynQ2g",target:"_blank",rel:"noopener noreferrer"};function E(C,D){const i=a("ExternalLinkIcon");return l(),d("div",null,[c,e("blockquote",null,[e("p",null,[n("地址："),e("a",u,[n("https://ip.taobao.com/"),s(i)])])]),v,e("ul",null,[e("li",null,[n("80%, 淘宝IP地址库, "),e("a",g,[n("http://ip.taobao.com/"),s(i)])]),e("li",null,[n("≈10%, GeoIP, "),e("a",b,[n("https://geoip.com/"),s(i)])]),e("li",null,[n("≈2%, 纯真IP库, "),e("a",p,[n("http://www.cz88.net/"),s(i)])])]),m,e("p",null,[e("a",h,[n("https://github.com/lionsoul2014/ip2region"),s(i)])]),q,f,x,y,_,e("ul",null,[e("li",null,[e("a",I,[n("新来个技术总监，把DDD落地的那叫一个高级，服气！"),s(i)])]),e("li",null,[e("a",w,[n("还在用命令行看日志？快用Kibana吧，可视化日志分析YYDS！"),s(i)])]),e("li",null,[e("a",S,[n("Grafana 9 正式发布，更易用，更酷炫了！"),s(i)])]),e("li",null,[e("a",k,[n("Mall电商实战项目全面升级！支持最新版SpringBoot，干掉循环依赖..."),s(i)])]),e("li",null,[e("a",z,[n("阿里出品！SpringBoot应用自动化部署神器，IDEA版Jenkins？"),s(i)])]),e("li",null,[e("a",P,[n("再见命令行！一键部署应用到远程服务器，IDEA官方Docker插件真香！"),s(i)])]),e("li",null,[e("a",j,[n("重磅更新！Mall实战教程全面升级，瞬间高大上了！"),s(i)])]),e("li",null,[e("a",A,[n("40K+Star！Mall电商实战项目开源回忆录！"),s(i)])])]),M,e("blockquote",null,[e("p",null,[n("转载链接："),e("a",B,[n("https://mp.weixin.qq.com/s/tQ-4ClnfCucUREF-_ynQ2g"),s(i)]),n("，出处：macrozheng，整理：沉默王二")])])])}const U=r(o,[["render",E],["__file","quanwxsipgzdyszgkyksxytjdl.html.vue"]]);export{U as default};
