import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{r as a,o as r,c as t,a as e,b as d,d as i,e as s}from"./app.0d3123da.js";const c={},v={href:"https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw",target:"_blank",rel:"noopener noreferrer"},u=i("\u4E8C\u54E5\u7684\u7F16\u7A0B\u661F\u7403"),o=i("\u5DF2\u7ECF\u6709 "),m=e("strong",null,"560 \u591A\u540D",-1),p=i(" \u5C0F\u4F19\u4F34\u52A0\u5165\u4E86\uFF0C\u5982\u679C\u4F60\u4E5F\u9700\u8981\u4E00\u4E2A\u826F\u597D\u7684\u5B66\u4E60\u6C1B\u56F4\uFF0C"),b={href:"https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw",target:"_blank",rel:"noopener noreferrer"},g=i("\u6233\u94FE\u63A5"),h=i("\u52A0\u5165\u6211\u4EEC\u5427\uFF01\u8FD9\u662F\u4E00\u4E2A Java \u5B66\u4E60\u6307\u5357 + \u7F16\u7A0B\u5B9E\u6218\u7684\u79C1\u5BC6\u5708\u5B50\uFF0C\u4F60\u53EF\u4EE5\u5411\u4E8C\u54E5\u63D0\u95EE\u3001\u5E2E\u4F60\u5236\u5B9A\u5B66\u4E60\u8BA1\u5212\u3001\u8DDF\u7740\u4E8C\u54E5\u4E00\u8D77\u505A\u9879\u76EE\u3001\u5237\u529B\u6263\uFF0C\u51B2\u51B2\u51B2\u3002"),x=s(`<h2 id="\u524D\u8A00" tabindex="-1"><a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a> \u524D\u8A00</h2><p>\u6211\u4E4B\u524D\u5199\u8FC7\u4E24\u7BC7\u5173\u4E8E\u4F18\u5316\u76F8\u5173\u6587\u7AE0\uFF0C\u53D1\u8868\u4E4B\u540E\uFF0C\u5728\u5168\u7F51\u53D7\u5230\u5E7F\u5927\u7F51\u53CB\u7684\u597D\u8BC4\u3002\u9605\u8BFB\u91CF\u548C\u70B9\u8D5E\u7387\u90FD\u5F88\u9AD8\uFF0C\u8BF4\u660E\u4E86\u8FD9\u7C7B\u6587\u7AE0\u7684\u4EF7\u503C\u3002</p><p>\u4ECA\u5929\u63A5\u7740\u4F18\u5316\u8FD9\u4E2A\u8BDD\u9898\uFF0C\u6211\u4EEC\u4E00\u8D77\u804A\u804AJava\u4E2D\u4EE3\u7801\u4F18\u5316\u768430\u4E2A\u5C0F\u6280\u5DE7\uFF0C\u5E0C\u671B\u4F1A\u5BF9\u4F60\u6709\u6240\u5E2E\u52A9\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-nixgnxmdkddjavadmyhjq-52b1af62-86fe-4c7a-b716-e5e5968c733c.jpg" alt=""></p><h2 id="_1-\u7528string-format\u62FC\u63A5\u5B57\u7B26\u4E32" tabindex="-1"><a class="header-anchor" href="#_1-\u7528string-format\u62FC\u63A5\u5B57\u7B26\u4E32" aria-hidden="true">#</a> 1.\u7528String.format\u62FC\u63A5\u5B57\u7B26\u4E32</h2><p>\u4E0D\u77E5\u9053\u4F60\u6709\u6CA1\u6709\u62FC\u63A5\u8FC7\u5B57\u7B26\u4E32\uFF0C\u7279\u522B\u662F\u90A3\u79CD\u6709\u591A\u4E2A\u53C2\u6570\uFF0C\u5B57\u7B26\u4E32\u6BD4\u8F83\u957F\u7684\u60C5\u51B5\u3002</p><p>\u6BD4\u5982\u73B0\u5728\u6709\u4E2A\u9700\u6C42\uFF1A\u8981\u7528get\u8BF7\u6C42\u8C03\u7528\u7B2C\u4E09\u65B9\u63A5\u53E3\uFF0Curl\u540E\u9700\u8981\u62FC\u63A5\u591A\u4E2A\u53C2\u6570\u3002</p><p>\u4EE5\u524D\u6211\u4EEC\u7684\u8BF7\u6C42\u5730\u5740\u662F\u8FD9\u6837\u62FC\u63A5\u7684\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String url = &quot;http://susan.sc.cn?userName=&quot;+userName+&quot;&amp;age=&quot;+age+&quot;&amp;address=&quot;+address+&quot;&amp;sex=&quot;+sex+&quot;&amp;roledId=&quot;+roleId;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5B57\u7B26\u4E32\u4F7F\u7528<code>+</code>\u53F7\u62FC\u63A5\uFF0C\u975E\u5E38\u5BB9\u6613\u51FA\u9519\u3002</p><p>\u540E\u9762\u4F18\u5316\u4E86\u4E00\u4E0B\uFF0C\u6539\u4E3A\u4F7F\u7528<code>StringBuilder</code>\u62FC\u63A5\u5B57\u7B26\u4E32\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>StringBuilder urlBuilder = new StringBuilder(&quot;http://susan.sc.cn?&quot;);
urlBuilder.append(&quot;userName=&quot;)
.append(userName)
.append(&quot;&amp;age=&quot;)
.append(age)
.append(&quot;&amp;address=&quot;)
.append(address)
.append(&quot;&amp;sex=&quot;)
.append(sex)
.append(&quot;&amp;roledId=&quot;)
.append(roledId);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EE3\u7801\u4F18\u5316\u4E4B\u540E\uFF0C\u7A0D\u5FAE\u76F4\u89C2\u70B9\u3002</p><p>\u4F46\u8FD8\u662F\u770B\u8D77\u6765\u6BD4\u8F83\u522B\u626D\u3002</p><p>\u8FD9\u65F6\u53EF\u4EE5\u4F7F\u7528<code>String.format</code>\u65B9\u6CD5\u4F18\u5316\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String requestUrl = &quot;http://susan.sc.cn?userName=%s&amp;age=%s&amp;address=%s&amp;sex=%s&amp;roledId=%s&quot;;
String url = String.format(requestUrl,userName,age,address,sex,roledId);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4EE3\u7801\u7684\u53EF\u8BFB\u6027\uFF0C\u4E00\u4E0B\u5B50\u63D0\u5347\u4E86\u5F88\u591A\u3002</p><p>\u6211\u4EEC\u5E73\u5E38\u53EF\u4EE5\u4F7F\u7528<code>String.format</code>\u65B9\u6CD5\u62FC\u63A5url\u8BF7\u6C42\u53C2\u6570\uFF0C\u65E5\u5FD7\u6253\u5370\u7B49\u5B57\u7B26\u4E32\u3002</p><blockquote><p>\u4F46\u4E0D\u5EFA\u8BAE\u5728for\u5FAA\u73AF\u4E2D\u7528\u5B83\u62FC\u63A5\u5B57\u7B26\u4E32\uFF0C\u56E0\u4E3A\u5B83\u7684\u6267\u884C\u6548\u7387\uFF0C\u6BD4\u4F7F\u7528+\u53F7\u62FC\u63A5\u5B57\u7B26\u4E32\uFF0C\u6216\u8005\u4F7F\u7528StringBuilder\u62FC\u63A5\u5B57\u7B26\u4E32\u90FD\u8981\u6162\u4E00\u4E9B\u3002</p></blockquote><h2 id="_2-\u521B\u5EFA\u53EF\u7F13\u51B2\u7684io\u6D41" tabindex="-1"><a class="header-anchor" href="#_2-\u521B\u5EFA\u53EF\u7F13\u51B2\u7684io\u6D41" aria-hidden="true">#</a> 2.\u521B\u5EFA\u53EF\u7F13\u51B2\u7684IO\u6D41</h2><p><code>IO\u6D41</code>\u60F3\u5FC5\u5927\u5BB6\u90FD\u4F7F\u7528\u5F97\u6BD4\u8F83\u591A\uFF0C\u6211\u4EEC\u7ECF\u5E38\u9700\u8981\u628A\u6570\u636E<code>\u5199\u5165</code>\u67D0\u4E2A\u6587\u4EF6\uFF0C\u6216\u8005\u4ECE\u67D0\u4E2A\u6587\u4EF6\u4E2D<code>\u8BFB\u53D6</code>\u6570\u636E\u5230<code>\u5185\u5B58</code>\u4E2D\uFF0C\u751A\u81F3\u8FD8\u6709\u53EF\u80FD\u628A\u6587\u4EF6a\uFF0C\u4ECE\u76EE\u5F55b\uFF0C<code>\u590D\u5236</code>\u5230\u76EE\u5F55c\u4E0B\u7B49\u3002</p><p>JDK\u7ED9\u6211\u4EEC\u63D0\u4F9B\u4E86\u975E\u5E38\u4E30\u5BCC\u7684API\uFF0C\u53EF\u4EE5\u53BB\u64CD\u4F5CIO\u6D41\u3002</p><p>\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class IoTest1 {
    public static void main(String[] args) {
        FileInputStream fis = null;
        FileOutputStream fos = null;
        try {
            File srcFile = new File(&quot;/Users/dv_susan/Documents/workspace/jump/src/main/java/com/sue/jump/service/test1/1.txt&quot;);
            File destFile = new File(&quot;/Users/dv_susan/Documents/workspace/jump/src/main/java/com/sue/jump/service/test1/2.txt&quot;);
            fis = new FileInputStream(srcFile);
            fos = new FileOutputStream(destFile);
            int len;
            while ((len = fis.read()) != -1) {
                fos.write(len);
            }
            fos.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (fis != null) {
                    fis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u4F8B\u5B50\u4E3B\u8981\u7684\u529F\u80FD\uFF0C\u662F\u5C061.txt\u6587\u4EF6\u4E2D\u7684\u5185\u5BB9\u590D\u5236\u52302.txt\u6587\u4EF6\u4E2D\u3002\u8FD9\u4F8B\u5B50\u4F7F\u7528\u666E\u901A\u7684IO\u6D41\u4ECE\u529F\u80FD\u7684\u89D2\u5EA6\u6765\u8BF4\uFF0C\u4E5F\u80FD\u6EE1\u8DB3\u9700\u6C42\uFF0C\u4F46\u6027\u80FD\u5374\u4E0D\u592A\u597D\u3002</p><p>\u56E0\u4E3A\u8FD9\u4E2A\u4F8B\u5B50\u4E2D\uFF0C\u4ECE1.txt\u6587\u4EF6\u4E2D\u8BFB\u4E00\u4E2A\u5B57\u8282\u7684\u6570\u636E\uFF0C\u5C31\u4F1A\u9A6C\u4E0A\u5199\u51652.txt\u6587\u4EF6\u4E2D\uFF0C\u9700\u8981\u975E\u5E38\u9891\u7E41\u7684\u8BFB\u5199\u6587\u4EF6\u3002</p><p>\u4F18\u5316\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class IoTest {
    public static void main(String[] args) {
        BufferedInputStream bis = null;
        BufferedOutputStream bos = null;
        FileInputStream fis = null;
        FileOutputStream fos = null;
        try {
            File srcFile = new File(&quot;/Users/dv_susan/Documents/workspace/jump/src/main/java/com/sue/jump/service/test1/1.txt&quot;);
            File destFile = new File(&quot;/Users/dv_susan/Documents/workspace/jump/src/main/java/com/sue/jump/service/test1/2.txt&quot;);
            fis = new FileInputStream(srcFile);
            fos = new FileOutputStream(destFile);
            bis = new BufferedInputStream(fis);
            bos = new BufferedOutputStream(fos);
            byte[] buffer = new byte[1024];
            int len;
            while ((len = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, len);
            }
            bos.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bos != null) {
                    bos.close();
                }
                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (bis != null) {
                    bis.close();
                }
                if (fis != null) {
                    fis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u4F8B\u5B50\u4F7F\u7528<code>BufferedInputStream</code>\u548C<code>BufferedOutputStream</code>\u521B\u5EFA\u4E86<code>\u53EF\u7F13\u51B2</code>\u7684\u8F93\u5165\u8F93\u51FA\u6D41\u3002</p><p>\u6700\u5173\u952E\u7684\u5730\u65B9\u662F\u5B9A\u4E49\u4E86\u4E00\u4E2Abuffer\u5B57\u8282\u6570\u7EC4\uFF0C\u628A\u4ECE1.txt\u6587\u4EF6\u4E2D\u8BFB\u53D6\u7684\u6570\u636E\u4E34\u65F6\u4FDD\u5B58\u8D77\u6765\uFF0C\u540E\u9762\u518D\u628A\u8BE5buffer\u5B57\u8282\u6570\u7EC4\u7684\u6570\u636E\uFF0C\u4E00\u6B21\u6027\u6279\u91CF\u5199\u5165\u52302.txt\u4E2D\u3002</p><p>\u8FD9\u6837\u505A\u7684\u597D\u5904\u662F\uFF0C\u51CF\u5C11\u4E86\u8BFB\u5199\u6587\u4EF6\u7684\u6B21\u6570\uFF0C\u800C\u6211\u4EEC\u90FD\u77E5\u9053\u8BFB\u5199\u6587\u4EF6\u662F\u975E\u5E38\u8017\u65F6\u7684\u64CD\u4F5C\u3002\u4E5F\u5C31\u662F\u8BF4\u4F7F\u7528\u53EF\u7F13\u5B58\u7684\u8F93\u5165\u8F93\u51FA\u6D41\uFF0C\u53EF\u4EE5\u63D0\u5347IO\u7684\u6027\u80FD\uFF0C\u7279\u522B\u662F\u9047\u5230\u6587\u4EF6\u975E\u5E38\u5927\u65F6\uFF0C\u6548\u7387\u4F1A\u5F97\u5230\u663E\u8457\u63D0\u5347\u3002</p><h2 id="_3-\u51CF\u5C11\u5FAA\u73AF\u6B21\u6570" tabindex="-1"><a class="header-anchor" href="#_3-\u51CF\u5C11\u5FAA\u73AF\u6B21\u6570" aria-hidden="true">#</a> 3.\u51CF\u5C11\u5FAA\u73AF\u6B21\u6570</h2><p>\u5728\u6211\u4EEC\u65E5\u5E38\u5F00\u53D1\u4E2D\uFF0C\u5FAA\u73AF\u904D\u5386\u96C6\u5408\u662F\u5FC5\u4E0D\u53EF\u5C11\u7684\u64CD\u4F5C\u3002</p><p>\u4F46\u5982\u679C\u5FAA\u73AF\u5C42\u7EA7\u6BD4\u8F83\u6DF1\uFF0C\u5FAA\u73AF\u4E2D\u5957\u5FAA\u73AF\uFF0C\u53EF\u80FD\u4F1A\u5F71\u54CD\u4EE3\u7801\u7684\u6267\u884C\u6548\u7387\u3002</p><p><code>\u53CD\u4F8B</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>for(User user: userList) {
   for(Role role: roleList) {
      if(user.getRoleId().equals(role.getId())) {
         user.setRoleName(role.getName());
      }
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u4F8B\u5B50\u4E2D\u6709\u4E24\u5C42\u5FAA\u73AF\uFF0C\u5982\u679CuserList\u548CroleList\u6570\u636E\u6BD4\u8F83\u591A\u7684\u8BDD\uFF0C\u9700\u8981\u5FAA\u73AF\u904D\u5386\u5F88\u591A\u6B21\uFF0C\u624D\u80FD\u83B7\u53D6\u6211\u4EEC\u6240\u9700\u8981\u7684\u6570\u636E\uFF0C\u975E\u5E38\u6D88\u8017cpu\u8D44\u6E90\u3002</p><p><code>\u6B63\u4F8B</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Map&lt;Long, List&lt;Role&gt;&gt; roleMap = roleList.stream().collect(Collectors.groupingBy(Role::getId));
for (User user : userList) {
    List&lt;Role&gt; roles = roleMap.get(user.getRoleId());
    if(CollectionUtils.isNotEmpty(roles)) {
        user.setRoleName(roles.get(0).getName());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u51CF\u5C11\u5FAA\u73AF\u6B21\u6570\uFF0C\u6700\u7B80\u5355\u7684\u529E\u6CD5\u662F\uFF0C\u628A\u7B2C\u4E8C\u5C42\u5FAA\u73AF\u7684\u96C6\u5408\u53D8\u6210<code>map</code>\uFF0C\u8FD9\u6837\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7<code>key</code>\uFF0C\u83B7\u53D6\u60F3\u8981\u7684<code>value</code>\u6570\u636E\u3002</p><p>\u867D\u8BF4map\u7684key\u5B58\u5728<code>hash\u51B2\u7A81</code>\u7684\u60C5\u51B5\uFF0C\u4F46\u904D\u5386\u5B58\u653E\u6570\u636E\u7684<code>\u94FE\u8868</code>\u6216\u8005<code>\u7EA2\u9ED1\u6811</code>\u7684<code>\u65F6\u95F4\u590D\u6742\u5EA6</code>\uFF0C\u6BD4\u904D\u5386\u6574\u4E2Alist\u96C6\u5408\u8981\u5C0F\u5F88\u591A\u3002</p><h2 id="_4-\u7528\u5B8C\u8D44\u6E90\u8BB0\u5F97\u53CA\u65F6\u5173\u95ED" tabindex="-1"><a class="header-anchor" href="#_4-\u7528\u5B8C\u8D44\u6E90\u8BB0\u5F97\u53CA\u65F6\u5173\u95ED" aria-hidden="true">#</a> 4.\u7528\u5B8C\u8D44\u6E90\u8BB0\u5F97\u53CA\u65F6\u5173\u95ED</h2><p>\u5728\u6211\u4EEC\u65E5\u5E38\u5F00\u53D1\u4E2D\uFF0C\u53EF\u80FD\u7ECF\u5E38\u8BBF\u95EE<code>\u8D44\u6E90</code>\uFF0C\u6BD4\u5982\uFF1A\u83B7\u53D6\u6570\u636E\u5E93\u8FDE\u63A5\uFF0C\u8BFB\u53D6\u6587\u4EF6\u7B49\u3002</p><p>\u6211\u4EEC\u4EE5\u83B7\u53D6\u6570\u636E\u5E93\u8FDE\u63A5\u4E3A\u4F8B\u3002</p><p><code>\u53CD\u4F8B</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>//1. \u52A0\u8F7D\u9A71\u52A8\u7C7B
Class.forName(&quot;com.mysql.jdbc.Driver&quot;);
//2. \u521B\u5EFA\u8FDE\u63A5
Connection connection = DriverManager.getConnection(&quot;jdbc:mysql//localhost:3306/db?allowMultiQueries=true&amp;useUnicode=true&amp;characterEncoding=UTF-8&quot;,&quot;root&quot;,&quot;123456&quot;);
//3.\u7F16\u5199sql
String sql =&quot;select * from user&quot;;
//4.\u521B\u5EFAPreparedStatement
PreparedStatement pstmt = conn.prepareStatement(sql);
//5.\u83B7\u53D6\u67E5\u8BE2\u7ED3\u679C
ResultSet rs = pstmt.execteQuery();
while(rs.next()){
   int id = rs.getInt(&quot;id&quot;);
   String name = rs.getString(&quot;name&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u9762\u8FD9\u6BB5\u4EE3\u7801\u53EF\u4EE5\u6B63\u5E38\u8FD0\u884C\uFF0C\u4F46\u5374\u72AF\u4E86\u4E00\u4E2A\u5F88\u5927\u7684\u9519\u8BEF\uFF0C\u5373\uFF1AResultSet\u3001PreparedStatement\u548CConnection\u5BF9\u8C61\u7684\u8D44\u6E90\uFF0C\u4F7F\u7528\u5B8C\u4E4B\u540E\uFF0C\u6CA1\u6709\u5173\u95ED\u3002</p><p>\u6211\u4EEC\u90FD\u77E5\u9053\uFF0C\u6570\u636E\u5E93\u8FDE\u63A5\u662F\u975E\u5E38\u5B9D\u8D35\u7684\u8D44\u6E90\u3002\u6211\u4EEC\u4E0D\u53EF\u80FD\u4E00\u76F4\u521B\u5EFA\u8FDE\u63A5\uFF0C\u5E76\u4E14\u7528\u5B8C\u4E4B\u540E\uFF0C\u4E5F\u4E0D\u56DE\u6536\uFF0C\u767D\u767D\u6D6A\u8D39\u6570\u636E\u5E93\u8D44\u6E90\u3002</p><p><code>\u6B63\u4F8B</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>//1. \u52A0\u8F7D\u9A71\u52A8\u7C7B
Class.forName(&quot;com.mysql.jdbc.Driver&quot;);

Connection connection = null;
PreparedStatement pstmt = null;
ResultSet rs = null;
try {
    //2. \u521B\u5EFA\u8FDE\u63A5
    connection = DriverManager.getConnection(&quot;jdbc:mysql//localhost:3306/db?allowMultiQueries=true&amp;useUnicode=true&amp;characterEncoding=UTF-8&quot;,&quot;root&quot;,&quot;123456&quot;);
    //3.\u7F16\u5199sql
    String sql =&quot;select * from user&quot;;
    //4.\u521B\u5EFAPreparedStatement
    pstmt = conn.prepareStatement(sql);
    //5.\u83B7\u53D6\u67E5\u8BE2\u7ED3\u679C
    rs = pstmt.execteQuery();
    while(rs.next()){
       int id = rs.getInt(&quot;id&quot;);
       String name = rs.getString(&quot;name&quot;);
    }
} catch(Exception e) {
  log.error(e.getMessage(),e);
} finally {
   if(rs != null) {
      rs.close();
   }
   
   if(pstmt != null) {
      pstmt.close();
   }
   
   if(connection != null) {
      connection.close();
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u4F8B\u5B50\u4E2D\uFF0C\u65E0\u8BBA\u662FResultSet\uFF0C\u6216\u8005PreparedStatement\uFF0C\u8FD8\u662FConnection\u5BF9\u8C61\uFF0C\u4F7F\u7528\u5B8C\u4E4B\u540E\uFF0C\u90FD\u4F1A\u8C03\u7528<code>close</code>\u65B9\u6CD5\u5173\u95ED\u8D44\u6E90\u3002</p><blockquote><p>\u5728\u8FD9\u91CC\u6E29\u99A8\u63D0\u9192\u4E00\u53E5\uFF1AResultSet\uFF0C\u6216\u8005PreparedStatement\uFF0C\u8FD8\u662FConnection\u5BF9\u8C61\uFF0C\u8FD9\u4E09\u8005\u5173\u95ED\u8D44\u6E90\u7684\u987A\u5E8F\u4E0D\u80FD\u53CD\u4E86\uFF0C\u4E0D\u7136\u53EF\u80FD\u4F1A\u51FA\u73B0\u5F02\u5E38\u3002</p></blockquote><h2 id="_5-\u4F7F\u7528\u6C60\u6280\u672F" tabindex="-1"><a class="header-anchor" href="#_5-\u4F7F\u7528\u6C60\u6280\u672F" aria-hidden="true">#</a> 5.\u4F7F\u7528\u6C60\u6280\u672F</h2><p>\u6211\u4EEC\u90FD\u77E5\u9053\uFF0C\u4ECE\u6570\u636E\u5E93\u67E5\u6570\u636E\uFF0C\u9996\u5148\u8981\u8FDE\u63A5\u6570\u636E\u5E93\uFF0C\u83B7\u53D6<code>Connection</code>\u8D44\u6E90\u3002</p><p>\u60F3\u8BA9\u7A0B\u5E8F\u591A\u7EBF\u7A0B\u6267\u884C\uFF0C\u9700\u8981\u4F7F\u7528<code>Thread</code>\u7C7B\u521B\u5EFA\u7EBF\u7A0B\uFF0C\u7EBF\u7A0B\u4E5F\u662F\u4E00\u79CD\u8D44\u6E90\u3002</p><p>\u901A\u5E38\u4E00\u6B21\u6570\u636E\u5E93\u64CD\u4F5C\u7684\u8FC7\u7A0B\u662F\u8FD9\u6837\u7684\uFF1A</p><ol><li>\u521B\u5EFA\u8FDE\u63A5</li><li>\u8FDB\u884C\u6570\u636E\u5E93\u64CD\u4F5C</li><li>\u5173\u95ED\u8FDE\u63A5</li></ol><p>\u800C\u521B\u5EFA\u8FDE\u63A5\u548C\u5173\u95ED\u8FDE\u63A5\uFF0C\u662F\u975E\u5E38\u8017\u65F6\u7684\u64CD\u4F5C\uFF0C\u521B\u5EFA\u8FDE\u63A5\u9700\u8981\u540C\u65F6\u4F1A\u521B\u5EFA\u4E00\u4E9B\u8D44\u6E90\uFF0C\u5173\u95ED\u8FDE\u63A5\u65F6\uFF0C\u9700\u8981\u56DE\u6536\u90A3\u4E9B\u8D44\u6E90\u3002</p><p>\u5982\u679C\u7528\u6237\u7684\u6BCF\u4E00\u6B21\u6570\u636E\u5E93\u8BF7\u6C42\uFF0C\u7A0B\u5E8F\u90FD\u90FD\u9700\u8981\u53BB\u521B\u5EFA\u8FDE\u63A5\u548C\u5173\u95ED\u8FDE\u63A5\u7684\u8BDD\uFF0C\u53EF\u80FD\u4F1A\u6D6A\u8D39\u5927\u91CF\u7684\u65F6\u95F4\u3002</p><p>\u6B64\u5916\uFF0C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u6570\u636E\u5E93\u8FDE\u63A5\u8FC7\u591A\u3002</p><p>\u6211\u4EEC\u90FD\u77E5\u9053\u6570\u636E\u5E93\u7684<code>\u6700\u5927\u8FDE\u63A5\u6570</code>\u662F\u6709\u9650\u7684\uFF0C\u4EE5mysql\u4E3A\u4F8B\uFF0C\u6700\u5927\u8FDE\u63A5\u6570\u662F\uFF1A<code>100</code>\uFF0C\u4E0D\u8FC7\u53EF\u4EE5\u901A\u8FC7\u53C2\u6570\u8C03\u6574\u8FD9\u4E2A\u6570\u91CF\u3002</p><p>\u5982\u679C\u7528\u6237\u8BF7\u6C42\u7684\u8FDE\u63A5\u6570\u8D85\u8FC7\u6700\u5927\u8FDE\u63A5\u6570\uFF0C\u5C31\u4F1A\u62A5\uFF1A<code>too many connections</code>\u5F02\u5E38\u3002\u5982\u679C\u6709\u65B0\u7684\u8BF7\u6C42\u8FC7\u6765\uFF0C\u4F1A\u53D1\u73B0\u6570\u636E\u5E93\u53D8\u5F97\u4E0D\u53EF\u7528\u3002</p><p>\u8FD9\u65F6\u53EF\u4EE5\u901A\u8FC7\u547D\u4EE4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>show variables like max_connections
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u67E5\u770B\u6700\u5927\u8FDE\u63A5\u6570\u3002</p><p>\u7136\u540E\u901A\u8FC7\u547D\u4EE4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>set GLOBAL max_connections=1000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u624B\u52A8\u4FEE\u6539\u6700\u5927\u8FDE\u63A5\u6570\u3002</p><p>\u8FD9\u79CD\u505A\u6CD5\u53EA\u80FD\u6682\u65F6\u7F13\u89E3\u95EE\u9898\uFF0C\u4E0D\u662F\u4E00\u4E2A\u597D\u7684\u65B9\u6848\uFF0C\u65E0\u6CD5\u4ECE\u6839\u672C\u4E0A\u89E3\u51B3\u95EE\u9898\u3002</p><p>\u6700\u5927\u7684\u95EE\u9898\u662F\uFF1A\u6570\u636E\u5E93\u8FDE\u63A5\u6570\u53EF\u4EE5\u65E0\u9650\u589E\u957F\uFF0C\u4E0D\u53D7\u63A7\u5236\u3002</p><p>\u8FD9\u65F6\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528<code>\u6570\u636E\u5E93\u8FDE\u63A5\u6C60</code>\u3002</p><p>\u76EE\u524DJava\u5F00\u6E90\u7684\u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u6709\uFF1A</p><ul><li>DBCP\uFF1A\u662F\u4E00\u4E2A\u4F9D\u8D56Jakarta commons-pool\u5BF9\u8C61\u6C60\u673A\u5236\u7684\u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u3002</li><li>C3P0\uFF1A\u662F\u4E00\u4E2A\u5F00\u653E\u6E90\u4EE3\u7801\u7684JDBC\u8FDE\u63A5\u6C60\uFF0C\u5B83\u5728lib\u76EE\u5F55\u4E2D\u4E0EHibernate\u4E00\u8D77\u53D1\u5E03\uFF0C\u5305\u62EC\u4E86\u5B9E\u73B0jdbc3\u548Cjdbc2\u6269\u5C55\u89C4\u8303\u8BF4\u660E\u7684Connection \u548CStatement \u6C60\u7684DataSources \u5BF9\u8C61\u3002</li><li>Druid\uFF1A\u963F\u91CC\u7684Druid\uFF0C\u4E0D\u4EC5\u662F\u4E00\u4E2A\u6570\u636E\u5E93\u8FDE\u63A5\u6C60\uFF0C\u8FD8\u5305\u542B\u4E00\u4E2AProxyDriver\u3001\u4E00\u7CFB\u5217\u5185\u7F6E\u7684JDBC\u7EC4\u4EF6\u5E93\u3001\u4E00\u4E2ASQL Parser\u3002</li><li>Proxool\uFF1A\u662F\u4E00\u4E2AJava SQL Driver\u9A71\u52A8\u7A0B\u5E8F\uFF0C\u5B83\u63D0\u4F9B\u4E86\u5BF9\u9009\u62E9\u7684\u5176\u5B83\u7C7B\u578B\u7684\u9A71\u52A8\u7A0B\u5E8F\u7684\u8FDE\u63A5\u6C60\u5C01\u88C5\uFF0C\u53EF\u4EE5\u975E\u5E38\u7B80\u5355\u7684\u79FB\u690D\u5230\u5DF2\u6709\u4EE3\u7801\u4E2D\u3002</li></ul><p>\u76EE\u524D\u7528\u7684\u6700\u591A\u7684\u6570\u636E\u5E93\u8FDE\u63A5\u6C60\u662F:<code>Druid</code>\u3002</p><h2 id="_6-\u53CD\u5C04\u65F6\u52A0\u7F13\u5B58" tabindex="-1"><a class="header-anchor" href="#_6-\u53CD\u5C04\u65F6\u52A0\u7F13\u5B58" aria-hidden="true">#</a> 6.\u53CD\u5C04\u65F6\u52A0\u7F13\u5B58</h2><p>\u6211\u4EEC\u90FD\u77E5\u9053\u901A\u8FC7<code>\u53CD\u5C04</code>\u521B\u5EFA\u5BF9\u8C61\u5B9E\u4F8B\uFF0C\u6BD4\u4F7F\u7528<code>new</code>\u5173\u952E\u5B57\u8981\u6162\u5F88\u591A\u3002</p><p>\u7531\u6B64\uFF0C\u4E0D\u592A\u5EFA\u8BAE\u5728\u7528\u6237\u8BF7\u6C42\u8FC7\u6765\u65F6\uFF0C\u6BCF\u6B21\u90FD\u901A\u8FC7\u53CD\u5C04<code>\u5B9E\u65F6</code>\u521B\u5EFA\u5B9E\u4F8B\u3002</p><p>\u6709\u65F6\u5019\uFF0C\u4E3A\u4E86\u4EE3\u7801\u7684\u7075\u6D3B\u6027\uFF0C\u53C8\u4E0D\u5F97\u4E0D\u7528\u53CD\u5C04\u521B\u5EFA\u5B9E\u4F8B\uFF0C\u8FD9\u65F6\u8BE5\u600E\u4E48\u529E\u5462\uFF1F</p><p>\u7B54\uFF1A\u52A0<code>\u7F13\u5B58</code>\u3002</p><p>\u5176\u5B9Espring\u4E2D\u5C31\u4F7F\u7528\u4E86\u5927\u91CF\u7684\u53CD\u5C04\uFF0C\u6211\u4EEC\u4EE5\u652F\u4ED8\u65B9\u6CD5\u4E3A\u4F8B\u3002</p><p>\u6839\u636E\u524D\u7AEF\u4F20\u5165\u4E0D\u540C\u7684\u652F\u4ED8code\uFF0C\u52A8\u6001\u627E\u5230\u5BF9\u5E94\u7684\u652F\u4ED8\u65B9\u6CD5\uFF0C\u53D1\u8D77\u652F\u4ED8\u3002</p><p>\u6211\u4EEC\u5148\u5B9A\u4E49\u4E00\u4E2A\u6CE8\u89E3\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Retention(RetentionPolicy.RUNTIME)  
@Target(ElementType.TYPE)  
public @interface PayCode {  
     String value();    
     String name();  
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u6240\u6709\u7684\u652F\u4ED8\u7C7B\u4E0A\u90FD\u52A0\u4E0A\u8BE5\u6CE8\u89E3</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@PayCode(value = &quot;alia&quot;, name = &quot;\u652F\u4ED8\u5B9D\u652F\u4ED8&quot;)  
@Service
public class AliaPay implements IPay {  

     @Override
     public void pay() {  
         System.out.println(&quot;===\u53D1\u8D77\u652F\u4ED8\u5B9D\u652F\u4ED8===&quot;);  
     }  
}  

@PayCode(value = &quot;weixin&quot;, name = &quot;\u5FAE\u4FE1\u652F\u4ED8&quot;)  
@Service
public class WeixinPay implements IPay {  
 
     @Override
     public void pay() {  
         System.out.println(&quot;===\u53D1\u8D77\u5FAE\u4FE1\u652F\u4ED8===&quot;);  
     }  
} 
 
@PayCode(value = &quot;jingdong&quot;, name = &quot;\u4EAC\u4E1C\u652F\u4ED8&quot;)  
@Service
public class JingDongPay implements IPay {  
     @Override
     public void pay() {  
        System.out.println(&quot;===\u53D1\u8D77\u4EAC\u4E1C\u652F\u4ED8===&quot;);  
     }  
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u589E\u52A0\u6700\u5173\u952E\u7684\u7C7B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Service
public class PayService2 implements ApplicationListener&lt;ContextRefreshedEvent&gt; {  
     private static Map&lt;String, IPay&gt; payMap = null;  
     
     @Override
     public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {  
         ApplicationContext applicationContext = contextRefreshedEvent.getApplicationContext();  
         Map&lt;String, Object&gt; beansWithAnnotation = applicationContext.getBeansWithAnnotation(PayCode.class);  
        
         if (beansWithAnnotation != null) {  
             payMap = new HashMap&lt;&gt;();  
             beansWithAnnotation.forEach((key, value) -&gt;{  
                 String bizType = value.getClass().getAnnotation(PayCode.class).value();  
                 payMap.put(bizType, (IPay) value);  
             });  
         }  
     }  
    
     public void pay(String code) {  
        payMap.get(code).pay();  
     }  
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PayService2\u7C7B\u5B9E\u73B0\u4E86<code>ApplicationListener</code>\u63A5\u53E3\uFF0C\u8FD9\u6837\u5728<code>onApplicationEvent\u65B9\u6CD5</code>\u4E2D\uFF0C\u5C31\u53EF\u4EE5\u62FF\u5230<code>ApplicationContext</code>\u7684\u5B9E\u4F8B\u3002\u8FD9\u4E00\u6B65\uFF0C\u5176\u5B9E\u662F\u5728spring\u5BB9\u5668\u542F\u52A8\u7684\u65F6\u5019\uFF0Cspring\u901A\u8FC7\u53CD\u5C04\u6211\u4EEC\u5904\u7406\u597D\u4E86\u3002</p><p>\u6211\u4EEC\u518D\u83B7\u53D6\u6253\u4E86PayCode\u6CE8\u89E3\u7684\u7C7B\uFF0C\u653E\u5230\u4E00\u4E2A<code>map</code>\u4E2D\uFF0Cmap\u4E2D\u7684<code>key</code>\u5C31\u662FPayCode\u6CE8\u89E3\u4E2D\u5B9A\u4E49\u7684value\uFF0C\u8DDFcode\u53C2\u6570\u4E00\u81F4\uFF0Cvalue\u662F\u652F\u4ED8\u7C7B\u7684\u5B9E\u4F8B\u3002</p><p>\u8FD9\u6837\uFF0C\u6BCF\u6B21\u5C31\u53EF\u4EE5\u6BCF\u6B21\u76F4\u63A5\u901A\u8FC7code\u83B7\u53D6\u652F\u4ED8\u7C7B\u5B9E\u4F8B\uFF0C\u800C\u4E0D\u7528if...else\u5224\u65AD\u4E86\u3002\u5982\u679C\u8981\u52A0\u65B0\u7684\u652F\u4ED8\u65B9\u6CD5\uFF0C\u53EA\u9700\u5728\u652F\u4ED8\u7C7B\u4E0A\u9762\u6253\u4E0APayCode\u6CE8\u89E3\u5B9A\u4E49\u4E00\u4E2A\u65B0\u7684code\u5373\u53EF\u3002</p><p>\u6CE8\u610F\uFF1A\u8FD9\u79CD\u65B9\u5F0F\u7684code\u53EF\u4EE5\u6CA1\u6709\u4E1A\u52A1\u542B\u4E49\uFF0C\u53EF\u4EE5\u662F\u7EAF\u6570\u5B57\uFF0C\u53EA\u8981\u4E0D\u91CD\u590D\u5C31\u884C\u3002</p><h2 id="_7-\u591A\u7EBF\u7A0B\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#_7-\u591A\u7EBF\u7A0B\u5904\u7406" aria-hidden="true">#</a> 7.\u591A\u7EBF\u7A0B\u5904\u7406</h2><p>\u5F88\u591A\u65F6\u5019\uFF0C\u6211\u4EEC\u9700\u8981\u5728\u67D0\u4E2A\u63A5\u53E3\u4E2D\uFF0C\u8C03\u7528\u5176\u4ED6\u670D\u52A1\u7684\u63A5\u53E3\u3002</p><p>\u6BD4\u5982\u6709\u8FD9\u6837\u7684\u4E1A\u52A1\u573A\u666F\uFF1A</p><p>\u5728\u7528\u6237\u4FE1\u606F\u67E5\u8BE2\u63A5\u53E3\u4E2D\u9700\u8981\u8FD4\u56DE\uFF1A\u7528\u6237\u540D\u79F0\u3001\u6027\u522B\u3001\u7B49\u7EA7\u3001\u5934\u50CF\u3001\u79EF\u5206\u3001\u6210\u957F\u503C\u7B49\u4FE1\u606F\u3002</p><p>\u800C\u7528\u6237\u540D\u79F0\u3001\u6027\u522B\u3001\u7B49\u7EA7\u3001\u5934\u50CF\u5728\u7528\u6237\u670D\u52A1\u4E2D\uFF0C\u79EF\u5206\u5728\u79EF\u5206\u670D\u52A1\u4E2D\uFF0C\u6210\u957F\u503C\u5728\u6210\u957F\u503C\u670D\u52A1\u4E2D\u3002\u4E3A\u4E86\u6C47\u603B\u8FD9\u4E9B\u6570\u636E\u7EDF\u4E00\u8FD4\u56DE\uFF0C\u9700\u8981\u53E6\u5916\u63D0\u4F9B\u4E00\u4E2A\u5BF9\u5916\u63A5\u53E3\u670D\u52A1\u3002</p><p>\u4E8E\u662F\uFF0C\u7528\u6237\u4FE1\u606F\u67E5\u8BE2\u63A5\u53E3\u9700\u8981\u8C03\u7528\u7528\u6237\u67E5\u8BE2\u63A5\u53E3\u3001\u79EF\u5206\u67E5\u8BE2\u63A5\u53E3 \u548C \u6210\u957F\u503C\u67E5\u8BE2\u63A5\u53E3\uFF0C\u7136\u540E\u6C47\u603B\u6570\u636E\u7EDF\u4E00\u8FD4\u56DE\u3002</p><p>\u8C03\u7528\u8FC7\u7A0B\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-nixgnxmdkddjavadmyhjq-f7bf653b-152d-486d-9272-a4d8e38a62e4.jpg" alt=""></p><p>\u8C03\u7528\u8FDC\u7A0B\u63A5\u53E3\u603B\u8017\u65F6 530ms = 200ms + 150ms + 180ms</p><p>\u663E\u7136\u8FD9\u79CD\u4E32\u884C\u8C03\u7528\u8FDC\u7A0B\u63A5\u53E3\u6027\u80FD\u662F\u975E\u5E38\u4E0D\u597D\u7684\uFF0C\u8C03\u7528\u8FDC\u7A0B\u63A5\u53E3\u603B\u7684\u8017\u65F6\u4E3A\u6240\u6709\u7684\u8FDC\u7A0B\u63A5\u53E3\u8017\u65F6\u4E4B\u548C\u3002</p><p>\u90A3\u4E48\u5982\u4F55\u4F18\u5316\u8FDC\u7A0B\u63A5\u53E3\u6027\u80FD\u5462\uFF1F</p><p>\u4E0A\u9762\u8BF4\u5230\uFF0C\u65E2\u7136\u4E32\u884C\u8C03\u7528\u591A\u4E2A\u8FDC\u7A0B\u63A5\u53E3\u6027\u80FD\u5F88\u5DEE\uFF0C\u4E3A\u4EC0\u4E48\u4E0D\u6539\u6210\u5E76\u884C\u5462\uFF1F</p><p>\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-nixgnxmdkddjavadmyhjq-f1e49121-c895-4e95-8ad1-6c4e8b27154f.jpg" alt=""></p><p>\u8C03\u7528\u8FDC\u7A0B\u63A5\u53E3\u603B\u8017\u65F6 200ms = 200ms\uFF08\u5373\u8017\u65F6\u6700\u957F\u7684\u90A3\u6B21\u8FDC\u7A0B\u63A5\u53E3\u8C03\u7528\uFF09</p><p>\u5728java8\u4E4B\u524D\u53EF\u4EE5\u901A\u8FC7\u5B9E\u73B0<code>Callable</code>\u63A5\u53E3\uFF0C\u83B7\u53D6\u7EBF\u7A0B\u8FD4\u56DE\u7ED3\u679C\u3002</p><p>java8\u4EE5\u540E\u901A\u8FC7<code>CompleteFuture</code>\u7C7B\u5B9E\u73B0\u8BE5\u529F\u80FD\u3002\u6211\u4EEC\u8FD9\u91CC\u4EE5CompleteFuture\u4E3A\u4F8B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public UserInfo getUserInfo(Long id) throws InterruptedException, ExecutionException {
    final UserInfo userInfo = new UserInfo();
    CompletableFuture userFuture = CompletableFuture.supplyAsync(() -&gt; {
        getRemoteUserAndFill(id, userInfo);
        return Boolean.TRUE;
    }, executor);

    CompletableFuture bonusFuture = CompletableFuture.supplyAsync(() -&gt; {
        getRemoteBonusAndFill(id, userInfo);
        return Boolean.TRUE;
    }, executor);

    CompletableFuture growthFuture = CompletableFuture.supplyAsync(() -&gt; {
        getRemoteGrowthAndFill(id, userInfo);
        return Boolean.TRUE;
    }, executor);
    CompletableFuture.allOf(userFuture, bonusFuture, growthFuture).join();

    userFuture.get();
    bonusFuture.get();
    growthFuture.get();

    return userInfo;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u6E29\u99A8\u63D0\u9192\u4E00\u4E0B\uFF0C\u8FD9\u4E24\u79CD\u65B9\u5F0F\u522B\u5FD8\u4E86\u4F7F\u7528\u7EBF\u7A0B\u6C60\u3002\u793A\u4F8B\u4E2D\u6211\u7528\u5230\u4E86executor\uFF0C\u8868\u793A\u81EA\u5B9A\u4E49\u7684\u7EBF\u7A0B\u6C60\uFF0C\u4E3A\u4E86\u9632\u6B62\u9AD8\u5E76\u53D1\u573A\u666F\u4E0B\uFF0C\u51FA\u73B0\u7EBF\u7A0B\u8FC7\u591A\u7684\u95EE\u9898\u3002</p></blockquote><h2 id="_8-\u61D2\u52A0\u8F7D" tabindex="-1"><a class="header-anchor" href="#_8-\u61D2\u52A0\u8F7D" aria-hidden="true">#</a> 8.\u61D2\u52A0\u8F7D</h2><p>\u6709\u65F6\u5019\uFF0C\u521B\u5EFA\u5BF9\u8C61\u662F\u4E00\u4E2A\u975E\u5E38\u8017\u65F6\u7684\u64CD\u4F5C\uFF0C\u7279\u522B\u662F\u5728\u8BE5\u5BF9\u8C61\u7684\u521B\u5EFA\u8FC7\u7A0B\u4E2D\uFF0C\u8FD8\u9700\u8981\u521B\u5EFA\u5F88\u591A\u5176\u4ED6\u7684\u5BF9\u8C61\u65F6\u3002</p><p>\u6211\u4EEC\u4EE5\u5355\u4F8B\u6A21\u5F0F\u4E3A\u4F8B\u3002</p><p>\u5728\u4ECB\u7ECD\u5355\u4F8B\u6A21\u5F0F\u7684\u65F6\u5019\uFF0C\u5FC5\u987B\u8981\u5148\u4ECB\u7ECD\u5B83\u7684\u4E24\u79CD\u975E\u5E38\u8457\u540D\u7684\u5B9E\u73B0\u65B9\u5F0F\uFF1A<code>\u997F\u6C49\u6A21\u5F0F</code> \u548C <code>\u61D2\u6C49\u6A21\u5F0F</code>\u3002</p><h3 id="_8-1-\u997F\u6C49\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_8-1-\u997F\u6C49\u6A21\u5F0F" aria-hidden="true">#</a> 8.1 \u997F\u6C49\u6A21\u5F0F</h3><p>\u5B9E\u4F8B\u5728\u521D\u59CB\u5316\u7684\u65F6\u5019\u5C31\u5DF2\u7ECF\u5EFA\u597D\u4E86\uFF0C\u4E0D\u7BA1\u4F60\u6709\u6CA1\u6709\u7528\u5230\uFF0C\u5148\u5EFA\u597D\u4E86\u518D\u8BF4\u3002\u5177\u4F53\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class SimpleSingleton {
    //\u6301\u6709\u81EA\u5DF1\u7C7B\u7684\u5F15\u7528
    private static final SimpleSingleton INSTANCE = new SimpleSingleton();

    //\u79C1\u6709\u7684\u6784\u9020\u65B9\u6CD5
    private SimpleSingleton() {
    }
    //\u5BF9\u5916\u63D0\u4F9B\u83B7\u53D6\u5B9E\u4F8B\u7684\u9759\u6001\u65B9\u6CD5
    public static SimpleSingleton getInstance() {
        return INSTANCE;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528\u997F\u6C49\u6A21\u5F0F\u7684\u597D\u5904\u662F\uFF1A<code>\u6CA1\u6709\u7EBF\u7A0B\u5B89\u5168\u7684\u95EE\u9898</code>\uFF0C\u4F46\u5E26\u6765\u7684\u574F\u5904\u4E5F\u5F88\u660E\u663E\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>private static final SimpleSingleton INSTANCE = new SimpleSingleton();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4E00\u5F00\u59CB\u5C31\u5B9E\u4F8B\u5316\u5BF9\u8C61\u4E86\uFF0C\u5982\u679C\u5B9E\u4F8B\u5316\u8FC7\u7A0B\u975E\u5E38\u8017\u65F6\uFF0C\u5E76\u4E14\u6700\u540E\u8FD9\u4E2A\u5BF9\u8C61\u6CA1\u6709\u88AB\u4F7F\u7528\uFF0C\u4E0D\u662F\u767D\u767D\u9020\u6210\u8D44\u6E90\u6D6A\u8D39\u5417\uFF1F</p><p>\u8FD8\u771F\u662F\u554A\u3002</p><p>\u8FD9\u4E2A\u65F6\u5019\u4F60\u4E5F\u8BB8\u4F1A\u60F3\u5230\uFF0C\u4E0D\u7528\u63D0\u524D\u5B9E\u4F8B\u5316\u5BF9\u8C61\uFF0C\u5728\u771F\u6B63\u4F7F\u7528\u7684\u65F6\u5019\u518D\u5B9E\u4F8B\u5316\u4E0D\u5C31\u53EF\u4EE5\u4E86\uFF1F</p><p>\u8FD9\u5C31\u662F\u6211\u63A5\u4E0B\u6765\u8981\u4ECB\u7ECD\u7684\uFF1A<code>\u61D2\u6C49\u6A21\u5F0F</code>\u3002</p><h3 id="_8-2-\u61D2\u6C49\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#_8-2-\u61D2\u6C49\u6A21\u5F0F" aria-hidden="true">#</a> 8.2 \u61D2\u6C49\u6A21\u5F0F</h3><p>\u987E\u540D\u601D\u4E49\u5C31\u662F\u5B9E\u4F8B\u5728\u7528\u5230\u7684\u65F6\u5019\u624D\u53BB\u521B\u5EFA\uFF0C\u201C\u6BD4\u8F83\u61D2\u201D\uFF0C\u7528\u7684\u65F6\u5019\u624D\u53BB\u68C0\u67E5\u6709\u6CA1\u6709\u5B9E\u4F8B\uFF0C\u5982\u679C\u6709\u5219\u8FD4\u56DE\uFF0C\u6CA1\u6709\u5219\u65B0\u5EFA\u3002\u5177\u4F53\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class SimpleSingleton2 {

    private static SimpleSingleton2 INSTANCE;

    private SimpleSingleton2() {
    }

    public static SimpleSingleton2 getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new SimpleSingleton2();
        }
        return INSTANCE;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u793A\u4F8B\u4E2D\u7684INSTANCE\u5BF9\u8C61\u4E00\u5F00\u59CB\u662F\u7A7A\u7684\uFF0C\u5728\u8C03\u7528getInstance\u65B9\u6CD5\u624D\u4F1A\u771F\u6B63\u5B9E\u4F8B\u5316\u3002</p><p>\u61D2\u6C49\u6A21\u5F0F\u76F8\u5BF9\u4E8E\u997F\u6C49\u6A21\u5F0F\uFF0C\u6CA1\u6709\u63D0\u524D\u5B9E\u4F8B\u5316\u5BF9\u8C61\uFF0C\u5728\u771F\u6B63\u4F7F\u7528\u7684\u65F6\u5019\u518D\u5B9E\u4F8B\u5316\uFF0C\u5728\u5B9E\u4F8B\u5316\u5BF9\u8C61\u7684\u9636\u6BB5\u6548\u7387\u66F4\u9AD8\u4E00\u4E9B\u3002</p><p>\u9664\u4E86\u5355\u4F8B\u6A21\u5F0F\u4E4B\u5916\uFF0C\u61D2\u52A0\u8F7D\u7684\u601D\u60F3\uFF0C\u4F7F\u7528\u6BD4\u8F83\u591A\u7684\u53EF\u80FD\u662F\uFF1A</p><ol><li>spring\u7684@Lazy\u6CE8\u89E3\u3002\u5728spring\u5BB9\u5668\u542F\u52A8\u7684\u65F6\u5019\uFF0C\u4E0D\u4F1A\u8C03\u7528\u5176getBean\u65B9\u6CD5\u521D\u59CB\u5316\u5B9E\u4F8B\u3002</li><li>mybatis\u7684\u61D2\u52A0\u8F7D\u3002\u5728mybatis\u505A\u7EA7\u8054\u67E5\u8BE2\u7684\u65F6\u5019\uFF0C\u6BD4\u5982\u67E5\u7528\u6237\u7684\u540C\u65F6\u9700\u8981\u67E5\u89D2\u8272\u4FE1\u606F\u3002\u5982\u679C\u7528\u4E86\u61D2\u52A0\u8F7D\uFF0C\u5148\u53EA\u67E5\u7528\u6237\u4FE1\u606F\uFF0C\u771F\u6B63\u4F7F\u7528\u5230\u89D2\u8272\u4E86\uFF0C\u624D\u53D6\u67E5\u89D2\u8272\u4FE1\u606F\u3002</li></ol><h2 id="_9-\u521D\u59CB\u5316\u96C6\u5408\u65F6\u6307\u5B9A\u5927\u5C0F" tabindex="-1"><a class="header-anchor" href="#_9-\u521D\u59CB\u5316\u96C6\u5408\u65F6\u6307\u5B9A\u5927\u5C0F" aria-hidden="true">#</a> 9.\u521D\u59CB\u5316\u96C6\u5408\u65F6\u6307\u5B9A\u5927\u5C0F</h2><p>\u6211\u4EEC\u5728\u5B9E\u9645\u9879\u76EE\u5F00\u53D1\u4E2D\uFF0C\u9700\u8981\u7ECF\u5E38\u4F7F\u7528\u96C6\u5408\uFF0C\u6BD4\u5982\uFF1AArrayList\u3001HashMap\u7B49\u3002</p><p>\u4F46\u6709\u4E2A\u95EE\u9898\uFF1A\u4F60\u5728\u521D\u59CB\u5316\u96C6\u5408\u65F6\u6307\u5B9A\u4E86\u5927\u5C0F\u7684\u5417\uFF1F</p><p><code>\u53CD\u4F8B</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class Test2 {

    public static void main(String[] args) {
        List&lt;Integer&gt; list = new ArrayList&lt;&gt;();
        long time1 = System.currentTimeMillis();
        for (int i = 0; i &lt; 100000; i++) {
            list.add(i);
        }
        System.out.println(System.currentTimeMillis() - time1);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6267\u884C\u65F6\u95F4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>12
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5982\u679C\u5728\u521D\u59CB\u5316\u96C6\u5408\u65F6\u6307\u5B9A\u4E86\u5927\u5C0F\u3002</p><p><code>\u6B63\u4F8B</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class Test2 {

    public static void main(String[] args) {
        List&lt;Integer&gt; list2 = new ArrayList&lt;&gt;(100000);
        long time2 = System.currentTimeMillis();
        for (int i = 0; i &lt; 100000; i++) {
            list2.add(i);
        }
        System.out.println(System.currentTimeMillis() - time2);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6267\u884C\u65F6\u95F4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6211\u4EEC\u60CA\u5947\u7684\u53D1\u73B0\uFF0C\u5728\u521B\u5EFA\u96C6\u5408\u65F6\u6307\u5B9A\u4E86\u5927\u5C0F\uFF0C\u6BD4\u6CA1\u6709\u6307\u5B9A\u5927\u5C0F\uFF0C\u6DFB\u52A010\u4E07\u4E2A\u5143\u7D20\u7684\u6548\u7387\u63D0\u5347\u4E86\u4E00\u500D\u3002</p><p>\u5982\u679C\u4F60\u770B\u8FC7<code>ArrayList</code>\u6E90\u7801\uFF0C\u4F60\u5C31\u4F1A\u53D1\u73B0\u5B83\u7684\u9ED8\u8BA4\u5927\u5C0F\u662F<code>10</code>\uFF0C\u5982\u679C\u6DFB\u52A0\u5143\u7D20\u8D85\u8FC7\u4E86\u4E00\u5B9A\u7684\u9600\u503C\uFF0C\u4F1A\u6309<code>1.5</code>\u500D\u7684\u5927\u5C0F\u6269\u5BB9\u3002</p><p>\u4F60\u60F3\u60F3\uFF0C\u5982\u679C\u88C510\u4E07\u6761\u6570\u636E\uFF0C\u9700\u8981\u6269\u5BB9\u591A\u5C11\u6B21\u5440\uFF1F\u800C\u6BCF\u6B21\u6269\u5BB9\u90FD\u9700\u8981\u4E0D\u505C\u7684\u590D\u5236\u5143\u7D20\uFF0C\u4ECE\u8001\u96C6\u5408\u590D\u5236\u5230\u65B0\u96C6\u5408\u4E2D\uFF0C\u9700\u8981\u6D6A\u8D39\u591A\u5C11\u65F6\u95F4\u5440\u3002</p><h2 id="_10-\u4E0D\u8981\u6EE1\u5C4Ftry-catch\u5F02\u5E38" tabindex="-1"><a class="header-anchor" href="#_10-\u4E0D\u8981\u6EE1\u5C4Ftry-catch\u5F02\u5E38" aria-hidden="true">#</a> 10.\u4E0D\u8981\u6EE1\u5C4Ftry...catch\u5F02\u5E38</h2><p>\u4EE5\u524D\u6211\u4EEC\u5728\u5F00\u53D1\u63A5\u53E3\u65F6\uFF0C\u5982\u679C\u51FA\u73B0<code>\u5F02\u5E38</code>\uFF0C\u4E3A\u4E86\u7ED9\u7528\u6237\u4E00\u4E2A\u66F4\u53CB\u597D\u7684\u63D0\u793A\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RequestMapping(&quot;/test&quot;)
@RestController
public class TestController {

    @GetMapping(&quot;/add&quot;)
    public String add() {
        int a = 10 / 0;
        return &quot;\u6210\u529F&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u4E0D\u505A\u4EFB\u4F55\u5904\u7406\uFF0C\u5F53\u6211\u4EEC\u8BF7\u6C42add\u63A5\u53E3\u65F6\uFF0C\u6267\u884C\u7ED3\u679C\u76F4\u63A5\u62A5\u9519\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-nixgnxmdkddjavadmyhjq-478149b7-8982-4b55-accd-2c78c6521dea.jpg" alt=""></p><p>what\uFF1F\u7528\u6237\u80FD\u76F4\u63A5\u770B\u5230\u9519\u8BEF\u4FE1\u606F\uFF1F</p><p>\u8FD9\u79CD\u4EA4\u4E92\u65B9\u5F0F\u7ED9\u7528\u6237\u7684\u4F53\u9A8C\u975E\u5E38\u5DEE\uFF0C\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0C\u6211\u4EEC\u901A\u5E38\u4F1A\u5728\u63A5\u53E3\u4E2D\u6355\u83B7\u5F02\u5E38\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@GetMapping(&quot;/add&quot;)
public String add() {
    String result = &quot;\u6210\u529F&quot;;
    try {
        int a = 10 / 0;
    } catch (Exception e) {
        result = &quot;\u6570\u636E\u5F02\u5E38&quot;;
    }
    return result;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63A5\u53E3\u6539\u9020\u540E\uFF0C\u51FA\u73B0\u5F02\u5E38\u65F6\u4F1A\u63D0\u793A\uFF1A\u201C\u6570\u636E\u5F02\u5E38\u201D\uFF0C\u5BF9\u7528\u6237\u6765\u8BF4\u66F4\u53CB\u597D\u3002</p><p>\u770B\u8D77\u6765\u633A\u4E0D\u9519\u7684\uFF0C\u4F46\u662F\u6709\u95EE\u9898\u3002\u3002\u3002</p><p>\u5982\u679C\u53EA\u662F\u4E00\u4E2A\u63A5\u53E3\u8FD8\u597D\uFF0C\u4F46\u662F\u5982\u679C\u9879\u76EE\u4E2D\u6709\u6210\u767E\u4E0A\u5343\u4E2A\u63A5\u53E3\uFF0C\u90FD\u8981\u52A0\u4E0A\u5F02\u5E38\u6355\u83B7\u4EE3\u7801\u5417\uFF1F</p><p>\u7B54\u6848\u662F\u5426\u5B9A\u7684\uFF0C\u8FD9\u65F6\u5168\u5C40\u5F02\u5E38\u5904\u7406\u5C31\u6D3E\u4E0A\u7528\u573A\u4E86\uFF1A<code>RestControllerAdvice</code>\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)

    public String handleException(Exception e) {
        if (e instanceof ArithmeticException) {
            return &quot;\u6570\u636E\u5F02\u5E38&quot;;
        }
        if (e instanceof Exception) {
            return &quot;\u670D\u52A1\u5668\u5185\u90E8\u5F02\u5E38&quot;;
        }
        retur nnull;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EA\u9700\u5728<code>handleException</code>\u65B9\u6CD5\u4E2D\u5904\u7406\u5F02\u5E38\u60C5\u51B5\uFF0C\u4E1A\u52A1\u63A5\u53E3\u4E2D\u53EF\u4EE5\u653E\u5FC3\u4F7F\u7528\uFF0C\u4E0D\u518D\u9700\u8981\u6355\u83B7\u5F02\u5E38\uFF08\u6709\u4EBA\u7EDF\u4E00\u5904\u7406\u4E86\uFF09\u3002\u771F\u662F\u723D\u6B6A\u6B6A\u3002</p><h2 id="_11-\u4F4D\u8FD0\u7B97\u6548\u7387\u66F4\u9AD8" tabindex="-1"><a class="header-anchor" href="#_11-\u4F4D\u8FD0\u7B97\u6548\u7387\u66F4\u9AD8" aria-hidden="true">#</a> 11.\u4F4D\u8FD0\u7B97\u6548\u7387\u66F4\u9AD8</h2><p>\u5982\u679C\u4F60\u8BFB\u8FC7JDK\u7684\u6E90\u7801\uFF0C\u6BD4\u5982\uFF1A<code>ThreadLocal</code>\u3001<code>HashMap</code>\u7B49\u7C7B\uFF0C\u4F60\u5C31\u4F1A\u53D1\u73B0\uFF0C\u5B83\u4EEC\u7684\u5E95\u5C42\u90FD\u7528\u4E86<code>\u4F4D\u8FD0\u7B97</code>\u3002</p><p>\u4E3A\u4EC0\u4E48\u5F00\u53D1JDK\u7684\u5927\u795E\u4EEC\uFF0C\u90FD\u559C\u6B22\u7528\u4F4D\u8FD0\u7B97\uFF1F</p><p>\u7B54\uFF1A\u56E0\u4E3A\u4F4D\u8FD0\u7B97\u7684\u6548\u7387\u66F4\u9AD8\u3002</p><p>\u5728ThreadLocal\u7684get\u3001set\u3001remove\u65B9\u6CD5\u4E2D\u90FD\u6709\u8FD9\u6837\u4E00\u884C\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>int i = key.threadLocalHashCode &amp; (len-1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u901A\u8FC7key\u7684hashCode\u503C\uFF0C<code>\u4E0E</code>\u6570\u7EC4\u7684\u957F\u5EA6\u51CF1\u3002\u5176\u4E2Dkey\u5C31\u662FThreadLocal\u5BF9\u8C61\uFF0C<code>\u4E0E</code>\u6570\u7EC4\u7684\u957F\u5EA6\u51CF1\uFF0C\u76F8\u5F53\u4E8E\u9664\u4EE5\u6570\u7EC4\u7684\u957F\u5EA6\u51CF1\uFF0C\u7136\u540E<code>\u53D6\u6A21</code>\u3002</p><p>\u8FD9\u662F\u4E00\u79CDhash\u7B97\u6CD5\u3002</p><p>\u63A5\u4E0B\u6765\u7ED9\u5927\u5BB6\u4E3E\u4E2A\u4F8B\u5B50\uFF1A\u5047\u8BBElen=16\uFF0Ckey.threadLocalHashCode=31\uFF0C</p><p>\u4E8E\u662F\uFF1Aint i = 31 &amp; 15 = 15</p><p>\u76F8\u5F53\u4E8E\uFF1Aint i = 31 % 16 = 15</p><p>\u8BA1\u7B97\u7684\u7ED3\u679C\u662F\u4E00\u6837\u7684\uFF0C\u4F46\u662F\u4F7F\u7528<code>\u4E0E\u8FD0\u7B97</code>\u6548\u7387\u8DDF\u9AD8\u4E00\u4E9B\u3002</p><p>\u4E3A\u4EC0\u4E48\u4E0E\u8FD0\u7B97\u6548\u7387\u66F4\u9AD8\uFF1F</p><p>\u7B54\uFF1A\u56E0\u4E3AThreadLocal\u7684\u521D\u59CB\u5927\u5C0F\u662F<code>16</code>\uFF0C\u6BCF\u6B21\u90FD\u662F\u6309<code>2</code>\u500D\u6269\u5BB9\uFF0C\u6570\u7EC4\u7684\u5927\u5C0F\u5176\u5B9E\u4E00\u76F4\u90FD\u662F2\u7684n\u6B21\u65B9\u3002</p><p>\u8FD9\u79CD\u6570\u636E\u6709\u4E2A\u89C4\u5F8B\u5C31\u662F\u9AD8\u4F4D\u662F0\uFF0C\u4F4E\u4F4D\u90FD\u662F1\u3002\u5728\u505A\u4E0E\u8FD0\u7B97\u65F6\uFF0C\u53EF\u4EE5\u4E0D\u7528\u8003\u8651\u9AD8\u4F4D\uFF0C\u56E0\u4E3A\u4E0E\u8FD0\u7B97\u7684\u7ED3\u679C\u5FC5\u5B9A\u662F0\u3002\u53EA\u9700\u8003\u8651\u4F4E\u4F4D\u7684\u4E0E\u8FD0\u7B97\uFF0C\u6240\u4EE5\u6548\u7387\u66F4\u9AD8\u3002</p><h2 id="_12-\u5DE7\u7528\u7B2C\u4E09\u65B9\u5DE5\u5177\u7C7B" tabindex="-1"><a class="header-anchor" href="#_12-\u5DE7\u7528\u7B2C\u4E09\u65B9\u5DE5\u5177\u7C7B" aria-hidden="true">#</a> 12.\u5DE7\u7528\u7B2C\u4E09\u65B9\u5DE5\u5177\u7C7B</h2><p>\u5728Java\u7684\u5E9E\u5927\u4F53\u7CFB\u4E2D\uFF0C\u5176\u5B9E\u6709\u5F88\u591A\u4E0D\u9519\u7684\u5C0F\u5DE5\u5177\uFF0C\u4E5F\u5C31\u662F\u6211\u4EEC\u5E73\u5E38\u8BF4\u7684\uFF1A<code>\u8F6E\u5B50</code>\u3002</p><p>\u5982\u679C\u5728\u6211\u4EEC\u7684\u65E5\u5E38\u5DE5\u4F5C\u5F53\u4E2D\uFF0C\u80FD\u591F\u5C06\u8FD9\u4E9B\u8F6E\u5B50\u7528\u6237\uFF0C\u518D\u914D\u5408\u4E00\u4E0Bidea\u7684\u5FEB\u6377\u952E\uFF0C\u53EF\u4EE5\u6781\u5927\u5F97\u63D0\u5347\u6211\u4EEC\u7684\u5F00\u53D1\u6548\u7387\u3002</p><p>\u5982\u679C\u4F60\u5F15\u5165<code>com.google.guava</code>\u7684pom\u6587\u4EF6\uFF0C\u4F1A\u83B7\u5F97\u5F88\u591A\u597D\u7528\u7684\u5C0F\u5DE5\u5177\u3002\u8FD9\u91CC\u63A8\u8350\u4E00\u6B3E<code>com.google.common.collect</code>\u5305\u4E0B\u7684\u96C6\u5408\u5DE5\u5177\uFF1A<code>Lists</code>\u3002</p><p>\u5B83\u662F\u5728\u592A\u597D\u7528\u4E86\uFF0C\u8BA9\u6211\u7231\u4E0D\u91CA\u624B\u3002</p><p>\u5982\u679C\u4F60\u60F3\u5C06\u4E00\u4E2A<code>\u5927\u96C6\u5408</code>\u5206\u6210\u82E5\u5E72\u4E2A<code>\u5C0F\u96C6\u5408</code>\u3002</p><p>\u4E4B\u524D\u6211\u4EEC\u662F\u8FD9\u6837\u505A\u7684\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>List&lt;Integer&gt; list = Lists.newArrayList(1, 2, 3, 4, 5);

List&lt;List&lt;Integer&gt;&gt; partitionList = Lists.newArrayList();
int size = 0;
List&lt;Integer&gt; dataList = Lists.newArrayList();
for(Integer data : list) {
   if(size &gt;= 2) {
      dataList = Lists.newArrayList();
      size = 0;
   } 
   size++;
   dataList.add(data);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C06list\u6309size=2\u5206\u6210\u591A\u4E2A\u5C0F\u96C6\u5408\uFF0C\u4E0A\u9762\u7684\u4EE3\u7801\u770B\u8D77\u6765\u6BD4\u8F83\u9EBB\u70E6\u3002</p><p>\u5982\u679C\u4F7F\u7528<code>Lists</code>\u7684<code>partition</code>\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u8FD9\u6837\u5199\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>List&lt;Integer&gt; list = Lists.newArrayList(1, 2, 3, 4, 5);
List&lt;List&lt;Integer&gt;&gt; partitionList = Lists.partition(list, 2);
System.out.println(partitionList);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6267\u884C\u7ED3\u679C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[[1, 2], [3, 4], [5]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u4F8B\u5B50\u4E2D\uFF0Clist\u67095\u6761\u6570\u636E\uFF0C\u6211\u5C06list\u96C6\u5408\u6309\u5927\u5C0F\u4E3A2\uFF0C\u5206\u6210\u4E863\u9875\uFF0C\u5373\u53D8\u62103\u4E2A\u5C0F\u96C6\u5408\u3002</p><p>\u8FD9\u4E2A\u662F\u6211\u6700\u559C\u6B22\u7684\u65B9\u6CD5\u4E4B\u4E00\uFF0C\u7ECF\u5E38\u5728\u9879\u76EE\u4E2D\u4F7F\u7528\u3002</p><p>\u6BD4\u5982\u6709\u4E2A\u9700\u6C42\uFF1A\u73B0\u5728\u67095000\u4E2Aid\uFF0C\u9700\u8981\u8C03\u7528\u6279\u91CF\u7528\u6237\u67E5\u8BE2\u63A5\u53E3\uFF0C\u67E5\u51FA\u7528\u6237\u6570\u636E\u3002\u4F46\u5982\u679C\u4F60\u76F4\u63A5\u67E55000\u4E2A\u7528\u6237\uFF0C\u5355\u6B21\u63A5\u53E3\u54CD\u5E94\u65F6\u95F4\u53EF\u80FD\u4F1A\u975E\u5E38\u6162\u3002\u5982\u679C\u6539\u6210\u5206\u9875\u5904\u7406\uFF0C\u6BCF\u6B21\u53EA\u67E5500\u4E2A\u7528\u6237\uFF0C\u5F02\u6B65\u8C03\u752810\u6B21\u63A5\u53E3\uFF0C\u5C31\u4E0D\u4F1A\u6709\u5355\u6B21\u63A5\u53E3\u54CD\u5E94\u6162\u7684\u95EE\u9898\u3002</p>`,190),q=i("\u5982\u679C\u4F60\u4E86\u89E3\u66F4\u591A\u975E\u5E38\u6709\u7528\u7684\u7B2C\u4E09\u65B9\u5DE5\u5177\u7C7B\u7684\u8BDD\uFF0C\u53EF\u4EE5\u770B\u770B\u6211\u7684\u53E6\u4E00\u7BC7\u6587\u7AE0\u300A"),f={href:"https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&mid=2247495296&idx=1&sn=6ff4affb2d00dce011c08d8eb5448d7a&chksm=c0e83668f79fbf7ead1410a998f4d4406badd65f943ca1b6833a7b1d663d5d5d0808e4c462e4&token=1690710950&lang=zh_CN&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},S=i("\u5410\u8840\u63A8\u835017\u4E2A\u63D0\u5347\u5F00\u53D1\u6548\u7387\u7684\u201C\u8F6E\u5B50\u201D"),y=i("\u300B\u3002"),_=s(`<h2 id="_13-\u7528\u540C\u6B65\u4EE3\u7801\u5757\u4EE3\u66FF\u540C\u6B65\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#_13-\u7528\u540C\u6B65\u4EE3\u7801\u5757\u4EE3\u66FF\u540C\u6B65\u65B9\u6CD5" aria-hidden="true">#</a> 13.\u7528\u540C\u6B65\u4EE3\u7801\u5757\u4EE3\u66FF\u540C\u6B65\u65B9\u6CD5</h2><p>\u5728\u67D0\u4E9B\u4E1A\u52A1\u573A\u666F\u4E2D\uFF0C\u4E3A\u4E86\u9632\u6B62\u591A\u4E2A\u7EBF\u7A0B\u5E76\u53D1\u4FEE\u6539\u67D0\u4E2A\u5171\u4EAB\u6570\u636E\uFF0C\u9020\u6210\u6570\u636E\u5F02\u5E38\u3002</p><p>\u4E3A\u4E86\u89E3\u51B3\u5E76\u53D1\u573A\u666F\u4E0B\uFF0C\u591A\u4E2A\u7EBF\u7A0B\u540C\u65F6\u4FEE\u6539\u6570\u636E\uFF0C\u9020\u6210\u6570\u636E\u4E0D\u4E00\u81F4\u7684\u60C5\u51B5\u3002\u901A\u5E38\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u4F1A\uFF1A<code>\u52A0\u9501</code>\u3002</p><p>\u4F46\u5982\u679C\u9501\u52A0\u5F97\u4E0D\u597D\uFF0C\u5BFC\u81F4<code>\u9501\u7684\u7C92\u5EA6\u592A\u7C97</code>\uFF0C\u4E5F\u4F1A\u975E\u5E38\u5F71\u54CD\u63A5\u53E3\u6027\u80FD\u3002</p><p>\u5728java\u4E2D\u63D0\u4F9B\u4E86<code>synchronized</code>\u5173\u952E\u5B57\u7ED9\u6211\u4EEC\u7684\u4EE3\u7801\u52A0\u9501\u3002</p><p>\u901A\u5E38\u6709\u4E24\u79CD\u5199\u6CD5\uFF1A<code>\u5728\u65B9\u6CD5\u4E0A\u52A0\u9501</code> \u548C <code>\u5728\u4EE3\u7801\u5757\u4E0A\u52A0\u9501</code>\u3002</p><p>\u5148\u770B\u770B\u5982\u4F55\u5728\u65B9\u6CD5\u4E0A\u52A0\u9501\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public synchronized doSave(String fileUrl) {
    mkdir();
    uploadFile(fileUrl);
    sendMessage(fileUrl);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u52A0\u9501\u7684\u76EE\u7684\u662F\u4E3A\u4E86\u9632\u6B62\u5E76\u53D1\u7684\u60C5\u51B5\u4E0B\uFF0C\u521B\u5EFA\u4E86\u76F8\u540C\u7684\u76EE\u5F55\uFF0C\u7B2C\u4E8C\u6B21\u4F1A\u521B\u5EFA\u5931\u8D25\uFF0C\u5F71\u54CD\u4E1A\u52A1\u529F\u80FD\u3002</p><p>\u4F46\u8FD9\u79CD\u76F4\u63A5\u5728\u65B9\u6CD5\u4E0A\u52A0\u9501\uFF0C\u9501\u7684\u7C92\u5EA6\u6709\u70B9\u7C97\u3002\u56E0\u4E3AdoSave\u65B9\u6CD5\u4E2D\u7684\u4E0A\u4F20\u6587\u4EF6\u548C\u53D1\u6D88\u606F\u65B9\u6CD5\uFF0C\u662F\u4E0D\u9700\u8981\u52A0\u9501\u7684\u3002\u53EA\u6709\u521B\u5EFA\u76EE\u5F55\u65B9\u6CD5\uFF0C\u624D\u9700\u8981\u52A0\u9501\u3002</p><p>\u6211\u4EEC\u90FD\u77E5\u9053\u6587\u4EF6\u4E0A\u4F20\u64CD\u4F5C\u662F\u975E\u5E38\u8017\u65F6\u7684\uFF0C\u5982\u679C\u5C06\u6574\u4E2A\u65B9\u6CD5\u52A0\u9501\uFF0C\u90A3\u4E48\u9700\u8981\u7B49\u5230\u6574\u4E2A\u65B9\u6CD5\u6267\u884C\u5B8C\u4E4B\u540E\u624D\u80FD\u91CA\u653E\u9501\u3002\u663E\u7136\uFF0C\u8FD9\u4F1A\u5BFC\u81F4\u8BE5\u65B9\u6CD5\u7684\u6027\u80FD\u5F88\u5DEE\uFF0C\u53D8\u5F97\u5F97\u4E0D\u507F\u5931\u3002</p><p>\u8FD9\u65F6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u6539\u6210\u5728\u4EE3\u7801\u5757\u4E0A\u52A0\u9501\u4E86\uFF0C\u5177\u4F53\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public void doSave(String path,String fileUrl) {
    synchronized(this) {
      if(!exists(path)) {
          mkdir(path);
       }
    }
    uploadFile(fileUrl);
    sendMessage(fileUrl);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u6837\u6539\u9020\u4E4B\u540E\uFF0C\u9501\u7684\u7C92\u5EA6\u4E00\u4E0B\u5B50\u53D8\u5C0F\u4E86\uFF0C\u53EA\u6709\u5E76\u53D1\u521B\u5EFA\u76EE\u5F55\u529F\u80FD\u624D\u52A0\u4E86\u9501\u3002\u800C\u521B\u5EFA\u76EE\u5F55\u662F\u4E00\u4E2A\u975E\u5E38\u5FEB\u7684\u64CD\u4F5C\uFF0C\u5373\u4F7F\u52A0\u9501\u5BF9\u63A5\u53E3\u7684\u6027\u80FD\u5F71\u54CD\u4E5F\u4E0D\u5927\u3002</p><p>\u6700\u91CD\u8981\u7684\u662F\uFF0C\u5176\u4ED6\u7684\u4E0A\u4F20\u6587\u4EF6\u548C\u53D1\u9001\u6D88\u606F\u529F\u80FD\uFF0C\u4EFB\u7136\u53EF\u4EE5\u5E76\u53D1\u6267\u884C\u3002</p><h2 id="_14-\u4E0D\u7528\u7684\u6570\u636E\u53CA\u65F6\u6E05\u7406" tabindex="-1"><a class="header-anchor" href="#_14-\u4E0D\u7528\u7684\u6570\u636E\u53CA\u65F6\u6E05\u7406" aria-hidden="true">#</a> 14.\u4E0D\u7528\u7684\u6570\u636E\u53CA\u65F6\u6E05\u7406</h2><p>\u5728Java\u4E2D\u4FDD\u8BC1\u7EBF\u7A0B\u5B89\u5168\u7684\u6280\u672F\u6709\u5F88\u591A\uFF0C\u53EF\u4EE5\u4F7F\u7528<code>synchroized</code>\u3001<code>Lock</code>\u7B49\u5173\u952E\u5B57\u7ED9\u4EE3\u7801\u5757<code>\u52A0\u9501</code>\u3002</p><p>\u4F46\u662F\u5B83\u4EEC\u6709\u4E2A\u5171\u540C\u7684\u7279\u70B9\uFF0C\u5C31\u662F\u52A0\u9501\u4F1A\u5BF9\u4EE3\u7801\u7684\u6027\u80FD\u6709\u4E00\u5B9A\u7684\u635F\u8017\u3002</p><p>\u5176\u5B9E\uFF0C\u5728jdk\u4E2D\u8FD8\u63D0\u4F9B\u4E86\u53E6\u5916\u4E00\u79CD\u601D\u60F3\u5373\uFF1A<code>\u7528\u7A7A\u95F4\u6362\u65F6\u95F4</code>\u3002</p><p>\u6CA1\u9519\uFF0C\u4F7F\u7528<code>ThreadLocal</code>\u7C7B\u5C31\u662F\u5BF9\u8FD9\u79CD\u601D\u60F3\u7684\u4E00\u79CD\u5177\u4F53\u4F53\u73B0\u3002</p><p>ThreadLocal\u4E3A\u6BCF\u4E2A\u4F7F\u7528\u53D8\u91CF\u7684\u7EBF\u7A0B\u63D0\u4F9B\u4E86\u4E00\u4E2A\u72EC\u7ACB\u7684\u53D8\u91CF\u526F\u672C\uFF0C\u8FD9\u6837\u6BCF\u4E00\u4E2A\u7EBF\u7A0B\u90FD\u80FD\u72EC\u7ACB\u5730\u6539\u53D8\u81EA\u5DF1\u7684\u526F\u672C\uFF0C\u800C\u4E0D\u4F1A\u5F71\u54CD\u5176\u5B83\u7EBF\u7A0B\u6240\u5BF9\u5E94\u7684\u526F\u672C\u3002</p><p>ThreadLocal\u7684\u7528\u6CD5\u5927\u81F4\u662F\u8FD9\u6837\u7684\uFF1A</p><ol><li>\u5148\u521B\u5EFA\u4E00\u4E2ACurrentUser\u7C7B\uFF0C\u5176\u4E2D\u5305\u542B\u4E86ThreadLocal\u7684\u903B\u8F91\u3002</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class CurrentUser {
    private static final ThreadLocal&lt;UserInfo&gt; THREA_LOCAL = new ThreadLocal();
    
    public static void set(UserInfo userInfo) {
        THREA_LOCAL.set(userInfo);
    }
    
    public static UserInfo get() {
       THREA_LOCAL.get();
    }
    
    public static void remove() {
       THREA_LOCAL.remove();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u5728\u4E1A\u52A1\u4EE3\u7801\u4E2D\u8C03\u7528CurrentUser\u7C7B\u3002</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public void doSamething(UserDto userDto) {
   UserInfo userInfo = convert(userDto);
   CurrentUser.set(userInfo);
   ...

   //\u4E1A\u52A1\u4EE3\u7801
   UserInfo userInfo = CurrentUser.get();
   ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u4E1A\u52A1\u4EE3\u7801\u7684\u7B2C\u4E00\u884C\uFF0C\u5C06userInfo\u5BF9\u8C61\u8BBE\u7F6E\u5230CurrentUser\uFF0C\u8FD9\u6837\u5728\u4E1A\u52A1\u4EE3\u7801\u4E2D\uFF0C\u5C31\u80FD\u901A\u8FC7CurrentUser.get()\u83B7\u53D6\u5230\u521A\u521A\u8BBE\u7F6E\u7684userInfo\u5BF9\u8C61\u3002\u7279\u522B\u662F\u5BF9\u4E1A\u52A1\u4EE3\u7801\u8C03\u7528\u5C42\u7EA7\u6BD4\u8F83\u6DF1\u7684\u60C5\u51B5\uFF0C\u8FD9\u79CD\u7528\u6CD5\u975E\u5E38\u6709\u7528\uFF0C\u53EF\u4EE5\u51CF\u5C11\u5F88\u591A\u4E0D\u5FC5\u8981\u4F20\u53C2\u3002</p><p>\u4F46\u5728\u9AD8\u5E76\u53D1\u7684\u573A\u666F\u4E0B\uFF0C\u8FD9\u6BB5\u4EE3\u7801\u6709\u95EE\u9898\uFF0C\u53EA\u5F80ThreadLocal\u5B58\u6570\u636E\uFF0C\u6570\u636E\u7528\u5B8C\u4E4B\u540E\u5E76\u6CA1\u6709\u53CA\u65F6\u6E05\u7406\u3002</p><p>ThreadLocal\u5373\u4F7F\u4F7F\u7528\u4E86<code>WeakReference</code>\uFF08\u5F31\u5F15\u7528\uFF09\u4E5F\u53EF\u80FD\u4F1A\u5B58\u5728<code>\u5185\u5B58\u6CC4\u9732</code>\u95EE\u9898\uFF0C\u56E0\u4E3A entry\u5BF9\u8C61\u4E2D\u53EA\u628Akey(\u5373threadLocal\u5BF9\u8C61)\u8BBE\u7F6E\u6210\u4E86\u5F31\u5F15\u7528\uFF0C\u4F46\u662Fvalue\u503C\u6CA1\u6709\u3002</p><p>\u90A3\u4E48\uFF0C\u5982\u4F55\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u5462\uFF1F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public void doSamething(UserDto userDto) {
   UserInfo userInfo = convert(userDto);
   
   try{
     CurrentUser.set(userInfo);
     ...
     
     //\u4E1A\u52A1\u4EE3\u7801
     UserInfo userInfo = CurrentUser.get();
     ...
   } finally {
      CurrentUser.remove();
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9700\u8981\u5728<code>finally</code>\u4EE3\u7801\u5757\u4E2D\uFF0C\u8C03\u7528<code>remove</code>\u65B9\u6CD5\u6E05\u7406\u6CA1\u7528\u7684\u6570\u636E\u3002</p><h2 id="_15-\u7528equals\u65B9\u6CD5\u6BD4\u8F83\u662F\u5426\u76F8\u7B49" tabindex="-1"><a class="header-anchor" href="#_15-\u7528equals\u65B9\u6CD5\u6BD4\u8F83\u662F\u5426\u76F8\u7B49" aria-hidden="true">#</a> 15.\u7528equals\u65B9\u6CD5\u6BD4\u8F83\u662F\u5426\u76F8\u7B49</h2><p>\u4E0D\u77E5\u9053\u4F60\u5728\u9879\u76EE\u4E2D\u6709\u6CA1\u6709\u89C1\u8FC7\uFF0C\u6709\u4E9B\u540C\u4E8B\u5BF9<code>Integer</code>\u7C7B\u578B\u7684\u4E24\u4E2A\u53C2\u6570\u4F7F\u7528<code>==</code>\u53F7\u6BD4\u8F83\u662F\u5426\u76F8\u7B49\uFF1F</p><p>\u53CD\u6B63\u6211\u89C1\u8FC7\u7684\uFF0C\u90A3\u4E48\u8FD9\u79CD\u7528\u6CD5\u5BF9\u5417\uFF1F</p><p>\u6211\u7684\u56DE\u7B54\u662F\u770B\u5177\u4F53\u573A\u666F\uFF0C\u4E0D\u80FD\u8BF4\u4E00\u5B9A\u5BF9\uFF0C\u6216\u4E0D\u5BF9\u3002</p><p>\u6709\u4E9B\u72B6\u6001\u5B57\u6BB5\uFF0C\u6BD4\u5982\uFF1AorderStatus\u6709\uFF1A-1(\u672A\u4E0B\u5355)\uFF0C0\uFF08\u5DF2\u4E0B\u5355\uFF09\uFF0C1\uFF08\u5DF2\u652F\u4ED8\uFF09\uFF0C2\uFF08\u5DF2\u5B8C\u6210\uFF09\uFF0C3\uFF08\u53D6\u6D88\uFF09\uFF0C5\u79CD\u72B6\u6001\u3002</p><p>\u8FD9\u65F6\u5982\u679C\u7528==\u5224\u65AD\u662F\u5426\u76F8\u7B49\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Integer orderStatus1 = new Integer(1);
Integer orderStatus2 = new Integer(1);
System.out.println(orderStatus1 == orderStatus2);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE\u7ED3\u679C\u4F1A\u662Ftrue\u5417\uFF1F</p><p>\u7B54\u6848\uFF1A\u662Ffalse\u3002</p><p>\u6709\u4E9B\u540C\u5B66\u53EF\u80FD\u4F1A\u53CD\u9A73\uFF0CInteger\u4E2D\u4E0D\u662F\u6709\u8303\u56F4\u662F\uFF1A<code>-128-127</code>\u7684\u7F13\u5B58\u5417\uFF1F</p><p>\u4E3A\u4EC0\u4E48\u662Ffalse\uFF1F</p><p>\u5148\u770B\u770BInteger\u7684\u6784\u9020\u65B9\u6CD5\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-nixgnxmdkddjavadmyhjq-8128d857-c699-4592-b8af-eec334a0fdcc.jpg" alt=""></p><p>\u5B83\u5176\u5B9E\u5E76\u6CA1\u6709\u7528\u5230<code>\u7F13\u5B58</code>\u3002</p><p>\u90A3\u4E48\u7F13\u5B58\u662F\u5728\u54EA\u91CC\u7528\u7684\uFF1F</p><p>\u7B54\u6848\u5728<code>valueOf</code>\u65B9\u6CD5\u4E2D\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-nixgnxmdkddjavadmyhjq-b332dd5f-e7c1-4c07-8a2b-c5651d4375b0.jpg" alt=""></p><p>\u5982\u679C\u4E0A\u9762\u7684\u5224\u65AD\u6539\u6210\u8FD9\u6837\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String orderStatus1 = new String(&quot;1&quot;);
String orderStatus2 = new String(&quot;1&quot;);
System.out.println(Integer.valueOf(orderStatus1) == Integer.valueOf(orderStatus2));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE\u7ED3\u679C\u4F1A\u662Ftrue\u5417\uFF1F</p><p>\u7B54\u6848\uFF1A\u8FD8\u771F\u662Ftrue\u3002</p><p>\u6211\u4EEC\u8981\u517B\u6210\u826F\u597D\u7F16\u7801\u4E60\u60EF\uFF0C\u5C3D\u91CF\u5C11\u7528==\u5224\u65AD\u4E24\u4E2AInteger\u7C7B\u578B\u6570\u636E\u662F\u5426\u76F8\u7B49\uFF0C\u53EA\u6709\u5728\u4E0A\u8FF0\u975E\u5E38\u7279\u6B8A\u7684\u573A\u666F\u4E0B\u624D\u76F8\u7B49\u3002</p><p>\u800C\u5E94\u8BE5\u6539\u6210\u4F7F\u7528<code>equals</code>\u65B9\u6CD5\u5224\u65AD\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Integer orderStatus1 = new Integer(1);
Integer orderStatus2 = new Integer(1);
System.out.println(orderStatus1.equals(orderStatus2));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD0\u884C\u7ED3\u679C\u4E3Atrue\u3002</p><h2 id="_16-\u907F\u514D\u521B\u5EFA\u5927\u96C6\u5408" tabindex="-1"><a class="header-anchor" href="#_16-\u907F\u514D\u521B\u5EFA\u5927\u96C6\u5408" aria-hidden="true">#</a> 16.\u907F\u514D\u521B\u5EFA\u5927\u96C6\u5408</h2><p>\u5F88\u591A\u65F6\u5019\uFF0C\u6211\u4EEC\u5728\u65E5\u5E38\u5F00\u53D1\u4E2D\uFF0C\u9700\u8981\u521B\u5EFA\u96C6\u5408\u3002\u6BD4\u5982\uFF1A\u4E3A\u4E86\u6027\u80FD\u8003\u8651\uFF0C\u4ECE\u6570\u636E\u5E93\u67E5\u8BE2\u67D0\u5F20\u8868\u7684\u6240\u6709\u6570\u636E\uFF0C\u4E00\u6B21\u6027\u52A0\u8F7D\u5230\u5185\u5B58\u7684\u67D0\u4E2A\u96C6\u5408\u4E2D\uFF0C\u7136\u540E\u505A\u4E1A\u52A1\u903B\u8F91\u5904\u7406\u3002</p><p>\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>List&lt;User&gt; userList = userMapper.getAllUser();
for(User user:userList) {
   doSamething();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4ECE\u6570\u636E\u5E93\u4E00\u6B21\u6027\u67E5\u8BE2\u51FA\u6240\u6709\u7528\u6237\uFF0C\u7136\u540E\u5728\u5FAA\u73AF\u4E2D\uFF0C\u5BF9\u6BCF\u4E2A\u7528\u6237\u8FDB\u884C\u4E1A\u52A1\u903B\u8F91\u5904\u7406\u3002</p><p>\u5982\u679C<code>\u7528\u6237\u8868</code>\u7684\u6570\u636E\u91CF\u975E\u5E38\u591A\u65F6\uFF0C\u8FD9\u6837userList\u96C6\u5408\u4F1A\u5F88\u5927\uFF0C\u53EF\u80FD\u76F4\u63A5\u5BFC\u81F4\u5185\u5B58\u4E0D\u8DB3\uFF0C\u800C\u4F7F\u6574\u4E2A\u5E94\u7528\u6302\u6389\u3002</p><p>\u9488\u5BF9\u8FD9\u79CD\u60C5\u51B5\uFF0C\u5FC5\u987B\u505A<code>\u5206\u9875\u5904\u7406</code>\u3002</p><p>\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>private static final int PAGE_SIZE = 500;

int currentPage = 1;
RequestPage page = new RequestPage();
page.setPageNo(currentPage);
page.setPageSize(PAGE_SIZE);

Page&lt;User&gt; pageUser = userMapper.search(page);

while(pageUser.getPageCount() &gt;= currentPage) {
    for(User user:pageUser.getData()) {
       doSamething();
    }
   page.setPageNo(++currentPage);
   pageUser = userMapper.search(page);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u901A\u8FC7\u4E0A\u9762\u7684\u5206\u9875\u6539\u9020\u4E4B\u540E\uFF0C\u6BCF\u6B21\u4ECE\u6570\u636E\u5E93\u4E2D\u53EA\u67E5\u8BE2<code>500</code>\u6761\u8BB0\u5F55\uFF0C\u4FDD\u5B58\u5230userList\u96C6\u5408\u4E2D\uFF0C\u8FD9\u6837userList\u4E0D\u4F1A\u5360\u7528\u592A\u591A\u7684\u5185\u5B58\u3002</p><blockquote><p>\u8FD9\u91CC\u7279\u522B\u8BF4\u660E\u4E00\u4E0B\uFF0C\u5982\u679C\u4F60\u67E5\u8BE2\u7684\u8868\u4E2D\u7684\u6570\u636E\u91CF\u672C\u6765\u5C31\u5F88\u5C11\uFF0C\u4E00\u6B21\u6027\u4FDD\u5B58\u5230\u5185\u5B58\u4E2D\uFF0C\u4E5F\u4E0D\u4F1A\u5360\u7528\u592A\u591A\u5185\u5B58\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E5F\u53EF\u4EE5\u4E0D\u505A\u5206\u9875\u5904\u7406\u3002</p></blockquote><p>\u6B64\u5916\uFF0C\u8FD8\u6709\u4E2D\u7279\u6B8A\u7684\u60C5\u51B5\uFF0C\u5373\u8868\u4E2D\u7684\u8BB0\u5F55\u6570\u5E76\u7B97\u4E0D\u591A\uFF0C\u4F46\u6BCF\u4E00\u6761\u8BB0\u5F55\uFF0C\u90FD\u6709\u5F88\u591A\u5B57\u6BB5\uFF0C\u5355\u6761\u8BB0\u5F55\u5C31\u5360\u7528\u5F88\u591A\u5185\u5B58\u7A7A\u95F4\uFF0C\u8FD9\u65F6\u4E5F\u9700\u8981\u505A\u5206\u9875\u5904\u7406\uFF0C\u4E0D\u7136\u4E5F\u4F1A\u6709\u95EE\u9898\u3002</p><p>\u6574\u4F53\u7684\u539F\u5219\u662F\u8981\u5C3D\u91CF\u907F\u514D\u521B\u5EFA\u5927\u96C6\u5408\uFF0C\u5BFC\u81F4\u5185\u5B58\u4E0D\u8DB3\u7684\u95EE\u9898\uFF0C\u4F46\u662F\u5177\u4F53\u591A\u5927\u624D\u7B97\u5927\u96C6\u5408\u3002\u76EE\u524D\u6CA1\u6709\u4E00\u4E2A\u552F\u4E00\u7684\u8861\u91CF\u6807\u51C6\uFF0C\u9700\u8981\u7ED3\u5408\u5B9E\u9645\u7684\u4E1A\u52A1\u573A\u666F\u8FDB\u884C\u5355\u72EC\u5206\u6790\u3002</p><h2 id="_17-\u72B6\u6001\u7528\u679A\u4E3E" tabindex="-1"><a class="header-anchor" href="#_17-\u72B6\u6001\u7528\u679A\u4E3E" aria-hidden="true">#</a> 17.\u72B6\u6001\u7528\u679A\u4E3E</h2><p>\u5728\u6211\u4EEC\u5EFA\u7684\u8868\u4E2D\uFF0C\u6709\u5F88\u591A\u72B6\u6001\u5B57\u6BB5\uFF0C\u6BD4\u5982\uFF1A\u8BA2\u5355\u72B6\u6001\u3001\u7981\u7528\u72B6\u6001\u3001\u5220\u9664\u72B6\u6001\u7B49\u3002</p><p>\u6BCF\u79CD\u72B6\u6001\u90FD\u6709\u591A\u4E2A\u503C\uFF0C\u4EE3\u8868\u4E0D\u540C\u7684\u542B\u4E49\u3002</p><p>\u6BD4\u5982\u8BA2\u5355\u72B6\u6001\u6709\uFF1A</p><ul><li>1\uFF1A\u8868\u793A\u4E0B\u5355</li><li>2\uFF1A\u8868\u793A\u652F\u4ED8</li><li>3\uFF1A\u8868\u793A\u5B8C\u6210</li><li>4\uFF1A\u8868\u793A\u64A4\u9500</li></ul><p>\u5982\u679C\u6CA1\u6709\u4F7F\u7528\u679A\u4E3E\uFF0C\u4E00\u822C\u662F\u8FD9\u6837\u505A\u7684\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public static final int ORDER_STATUS_CREATE = 1;
public static final int ORDER_STATUS_PAY = 2;
public static final int ORDER_STATUS_DONE = 3;
public static final int ORDER_STATUS_CANCEL = 4;
public static final String ORDER_STATUS_CREATE_MESSAGE = &quot;\u4E0B\u5355&quot;;
public static final String ORDER_STATUS_PAY = &quot;\u4E0B\u5355&quot;;
public static final String ORDER_STATUS_DONE = &quot;\u4E0B\u5355&quot;;
public static final String ORDER_STATUS_CANCEL = &quot;\u4E0B\u5355&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9700\u8981\u5B9A\u4E49\u5F88\u591A\u9759\u6001\u5E38\u91CF\uFF0C\u5305\u542B\u4E0D\u540C\u7684\u72B6\u6001\u548C\u72B6\u6001\u7684\u63CF\u8FF0\u3002</p><p>\u4F7F\u7528<code>\u679A\u4E3E</code>\u5B9A\u4E49\u4E4B\u540E\uFF0C\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public enum OrderStatusEnum {  
     CREATE(1, &quot;\u4E0B\u5355&quot;),  
     PAY(2, &quot;\u652F\u4ED8&quot;),  
     DONE(3, &quot;\u5B8C\u6210&quot;),  
     CANCEL(4, &quot;\u64A4\u9500&quot;);  

     private int code;  
     private String message;  

     OrderStatusEnum(int code, String message) {  
         this.code = code;  
         this.message = message;  
     }  
   
     public int getCode() {  
        return this.code;  
     }  

     public String getMessage() {  
        return this.message;  
     }  
  
     public static OrderStatusEnum getOrderStatusEnum(int code) {  
        return Arrays.stream(OrderStatusEnum.values()).filter(x -&gt; x.code == code).findFirst().orElse(null);  
     }  
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528\u679A\u4E3E\u6539\u9020\u4E4B\u540E\uFF0C\u804C\u8D23\u66F4\u5355\u4E00\u4E86\u3002</p><p>\u800C\u4E14\u4F7F\u7528\u679A\u4E3E\u7684\u597D\u5904\u662F\uFF1A</p><ol><li>\u4EE3\u7801\u7684\u53EF\u8BFB\u6027\u53D8\u5F3A\u4E86\uFF0C\u4E0D\u540C\u7684\u72B6\u6001\uFF0C\u6709\u4E0D\u540C\u7684\u679A\u4E3E\u8FDB\u884C\u7EDF\u4E00\u7BA1\u7406\u548C\u7EF4\u62A4\u3002</li><li>\u679A\u4E3E\u662F\u5929\u7136\u5355\u4F8B\u7684\uFF0C\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528==\u53F7\u8FDB\u884C\u6BD4\u8F83\u3002</li><li>code\u548Cmessage\u53EF\u4EE5\u6210\u5BF9\u51FA\u73B0\uFF0C\u6BD4\u8F83\u5BB9\u6613\u76F8\u5173\u8F6C\u6362\u3002</li><li>\u679A\u4E3E\u53EF\u4EE5\u6D88\u9664if...else\u8FC7\u591A\u95EE\u9898\u3002</li></ol><h2 id="_18-\u628A\u56FA\u5B9A\u503C\u5B9A\u4E49\u6210\u9759\u6001\u5E38\u91CF" tabindex="-1"><a class="header-anchor" href="#_18-\u628A\u56FA\u5B9A\u503C\u5B9A\u4E49\u6210\u9759\u6001\u5E38\u91CF" aria-hidden="true">#</a> 18.\u628A\u56FA\u5B9A\u503C\u5B9A\u4E49\u6210\u9759\u6001\u5E38\u91CF</h2><p>\u4E0D\u77E5\u9053\u4F60\u5728\u5B9E\u9645\u7684\u9879\u76EE\u5F00\u53D1\u4E2D\uFF0C\u6709\u6CA1\u6709\u4F7F\u7528\u8FC7\u56FA\u5B9A\u503C\uFF1F</p><p>\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if(user.getId() &lt; 1000L) {
   doSamething();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6216\u8005\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if(Objects.isNull(user)) {
   throw new BusinessException(&quot;\u8BE5\u7528\u6237\u4E0D\u5B58\u5728&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u4E2D<code>1000L</code>\u548C<code>\u8BE5\u7528\u6237\u4E0D\u5B58\u5728</code>\u662F\u56FA\u5B9A\u503C\uFF0C\u6BCF\u6B21\u90FD\u662F\u4E00\u6837\u7684\u3002</p><p>\u65E2\u7136\u662F\u56FA\u5B9A\u503C\uFF0C\u6211\u4EEC\u4E3A\u4EC0\u4E48\u4E0D\u628A\u5B83\u4EEC\u5B9A\u4E49\u6210\u9759\u6001\u5E38\u91CF\u5462\uFF1F</p><p>\u8FD9\u6837\u8BED\u4E49\u4E0A\u66F4\u76F4\u89C2\uFF0C\u65B9\u4FBF\u7EDF\u4E00\u7BA1\u7406\u548C\u7EF4\u62A4\uFF0C\u66F4\u65B9\u4FBF\u4EE3\u7801\u590D\u7528\u3002</p><p>\u4EE3\u7801\u4F18\u5316\u4E3A\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>private static final int DEFAULT_USER_ID = 1000L;
...
if(user.getId() &lt; DEFAULT_USER_ID) {
   doSamething();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6216\u8005\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>private static final String NOT_FOUND_MESSAGE = &quot;\u8BE5\u7528\u6237\u4E0D\u5B58\u5728&quot;;
...
if(Objects.isNull(user)) {
   throw new BusinessException(NOT_FOUND_MESSAGE);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528<code>static final</code>\u5173\u952E\u5B57\u4FEE\u9970\u9759\u6001\u5E38\u91CF\uFF0C<code>static</code>\u8868\u793A<code>\u9759\u6001</code>\u7684\u610F\u601D\uFF0C\u5373\u7C7B\u53D8\u91CF\uFF0C\u800C<code>final</code>\u8868\u793A<code>\u4E0D\u5141\u8BB8\u4FEE\u6539</code>\u3002</p><p>\u4E24\u4E2A\u5173\u952E\u5B57\u52A0\u5728\u4E00\u8D77\uFF0C\u544A\u8BC9Java\u865A\u62DF\u673A\u8FD9\u79CD\u53D8\u91CF\uFF0C\u5728\u5185\u5B58\u4E2D\u53EA\u6709\u4E00\u4EFD\uFF0C\u5728\u5168\u5C40\u4E0A\u662F\u552F\u4E00\u7684\uFF0C\u4E0D\u80FD\u4FEE\u6539\uFF0C\u4E5F\u5C31\u662F<code>\u9759\u6001\u5E38\u91CF</code>\u3002</p><h2 id="_19-\u907F\u514D\u5927\u4E8B\u52A1" tabindex="-1"><a class="header-anchor" href="#_19-\u907F\u514D\u5927\u4E8B\u52A1" aria-hidden="true">#</a> 19.\u907F\u514D\u5927\u4E8B\u52A1</h2><p>\u5F88\u591A\u5C0F\u4F19\u4F34\u5728\u4F7F\u7528spring\u6846\u67B6\u5F00\u53D1\u9879\u76EE\u65F6\uFF0C\u4E3A\u4E86\u65B9\u4FBF\uFF0C\u559C\u6B22\u4F7F\u7528<code>@Transactional</code>\u6CE8\u89E3\u63D0\u4F9B\u4E8B\u52A1\u529F\u80FD\u3002</p><p>\u6CA1\u9519\uFF0C\u4F7F\u7528@Transactional\u6CE8\u89E3\u8FD9\u79CD\u58F0\u660E\u5F0F\u4E8B\u52A1\u7684\u65B9\u5F0F\u63D0\u4F9B\u4E8B\u52A1\u529F\u80FD\uFF0C\u786E\u5B9E\u80FD\u5C11\u5199\u5F88\u591A\u4EE3\u7801\uFF0C\u63D0\u5347\u5F00\u53D1\u6548\u7387\u3002</p><p>\u4F46\u4E5F\u5BB9\u6613\u9020\u6210\u5927\u4E8B\u52A1\uFF0C\u5F15\u53D1\u5176\u4ED6\u7684\u95EE\u9898\u3002</p><p>\u4E0B\u9762\u7528\u4E00\u5F20\u56FE\u770B\u770B\u5927\u4E8B\u52A1\u5F15\u53D1\u7684\u95EE\u9898\u3002</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-nixgnxmdkddjavadmyhjq-a0fb0e10-963b-4df4-8c92-4f1cad4ed210.jpg" alt=""></p><p>\u4ECE\u56FE\u4E2D\u80FD\u591F\u770B\u51FA\uFF0C\u5927\u4E8B\u52A1\u95EE\u9898\u53EF\u80FD\u4F1A\u9020\u6210\u63A5\u53E3\u8D85\u65F6\uFF0C\u5BF9\u63A5\u53E3\u7684\u6027\u80FD\u6709\u76F4\u63A5\u7684\u5F71\u54CD\u3002</p><p>\u6211\u4EEC\u8BE5\u5982\u4F55\u4F18\u5316\u5927\u4E8B\u52A1\u5462\uFF1F</p><ol><li>\u5C11\u7528@Transactional\u6CE8\u89E3</li><li>\u5C06\u67E5\u8BE2(select)\u65B9\u6CD5\u653E\u5230\u4E8B\u52A1\u5916</li><li>\u4E8B\u52A1\u4E2D\u907F\u514D\u8FDC\u7A0B\u8C03\u7528</li><li>\u4E8B\u52A1\u4E2D\u907F\u514D\u4E00\u6B21\u6027\u5904\u7406\u592A\u591A\u6570\u636E</li><li>\u6709\u4E9B\u529F\u80FD\u53EF\u4EE5\u975E\u4E8B\u52A1\u6267\u884C</li><li>\u6709\u4E9B\u529F\u80FD\u53EF\u4EE5\u5F02\u6B65\u5904\u7406</li></ol>`,107),L=i("\u5173\u4E8E\u5927\u4E8B\u52A1\u95EE\u9898\u6211\u7684\u53E6\u4E00\u7BC7\u6587\u7AE0\u300A"),I={href:"https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&mid=2247490259&idx=1&sn=1dd11c5f49103ca303a61fc82ce406e0&chksm=c0ebc23bf79c4b2db58b28ef752560bd91a1932ceb6713c9b19b821db0f29e1c58275d334076&token=2041133408&lang=zh_CN&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},E=i("\u8BA9\u4EBA\u5934\u75DB\u7684\u5927\u4E8B\u52A1\u95EE\u9898\u5230\u5E95\u8981\u5982\u4F55\u89E3\u51B3\uFF1F"),w=i("\u300B\uFF0C\u5B83\u91CC\u9762\u505A\u4E86\u975E\u5E38\u8BE6\u7EC6\u7684\u4ECB\u7ECD\uFF0C\u5982\u679C\u5927\u5BB6\u611F\u5174\u8DA3\u53EF\u4EE5\u770B\u770B\u3002"),A=s(`<h2 id="_20-\u6D88\u9664\u8FC7\u957F\u7684if-else" tabindex="-1"><a class="header-anchor" href="#_20-\u6D88\u9664\u8FC7\u957F\u7684if-else" aria-hidden="true">#</a> 20.\u6D88\u9664\u8FC7\u957F\u7684if...else</h2><p>\u6211\u4EEC\u5728\u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0Cif...else\u7684\u5224\u65AD\u6761\u4EF6\u662F\u5FC5\u4E0D\u53EF\u5C11\u7684\u3002\u4E0D\u540C\u7684\u5224\u65AD\u6761\u4EF6\uFF0C\u8D70\u7684\u4EE3\u7801\u903B\u8F91\u901A\u5E38\u4F1A\u4E0D\u4E00\u6837\u3002</p><p>\u5E9F\u8BDD\u4E0D\u591A\u8BF4\uFF0C\u5148\u770B\u770B\u4E0B\u9762\u7684\u4EE3\u7801\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public interface IPay {  
    void pay();  
}  

@Service
public class AliaPay implements IPay {  
     @Override
     public void pay() {  
        System.out.println(&quot;===\u53D1\u8D77\u652F\u4ED8\u5B9D\u652F\u4ED8===&quot;);  
     }  
}  

@Service
public class WeixinPay implements IPay {  
     @Override
     public void pay() {  
         System.out.println(&quot;===\u53D1\u8D77\u5FAE\u4FE1\u652F\u4ED8===&quot;);  
     }  
}  
  
@Service
public class JingDongPay implements IPay {  
     @Override
     public void pay() {  
        System.out.println(&quot;===\u53D1\u8D77\u4EAC\u4E1C\u652F\u4ED8===&quot;); 
     }  
}  

@Service
public class PayService {  
     @Autowired
     private AliaPay aliaPay;  
     @Autowired
     private WeixinPay weixinPay;  
     @Autowired
     private JingDongPay jingDongPay;  
   
     public void toPay(String code) {  
         if (&quot;alia&quot;.equals(code)) {  
             aliaPay.pay();  
         } elseif (&quot;weixin&quot;.equals(code)) {  
              weixinPay.pay();  
         } elseif (&quot;jingdong&quot;.equals(code)) {  
              jingDongPay.pay();  
         } else {  
              System.out.println(&quot;\u627E\u4E0D\u5230\u652F\u4ED8\u65B9\u5F0F&quot;);  
         }  
     }  
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PayService\u7C7B\u7684toPay\u65B9\u6CD5\u4E3B\u8981\u662F\u4E3A\u4E86\u53D1\u8D77\u652F\u4ED8\uFF0C\u6839\u636E\u4E0D\u540C\u7684code\uFF0C\u51B3\u5B9A\u8C03\u7528\u7528\u4E0D\u540C\u7684\u652F\u4ED8\u7C7B\uFF08\u6BD4\u5982\uFF1AaliaPay\uFF09\u7684pay\u65B9\u6CD5\u8FDB\u884C\u652F\u4ED8\u3002</p><p>\u8FD9\u6BB5\u4EE3\u7801\u6709\u4EC0\u4E48\u95EE\u9898\u5462\uFF1F\u4E5F\u8BB8\u6709\u4E9B\u4EBA\u5C31\u662F\u8FD9\u4E48\u5E72\u7684\u3002</p><p>\u8BD5\u60F3\u4E00\u4E0B\uFF0C\u5982\u679C\u652F\u4ED8\u65B9\u5F0F\u8D8A\u6765\u8D8A\u591A\uFF0C\u6BD4\u5982\uFF1A\u53C8\u52A0\u4E86\u767E\u5EA6\u652F\u4ED8\u3001\u7F8E\u56E2\u652F\u4ED8\u3001\u94F6\u8054\u652F\u4ED8\u7B49\u7B49\uFF0C\u5C31\u9700\u8981\u6539toPay\u65B9\u6CD5\u7684\u4EE3\u7801\uFF0C\u589E\u52A0\u65B0\u7684else...if\u5224\u65AD\uFF0C\u5224\u65AD\u591A\u4E86\u5C31\u4F1A\u5BFC\u81F4\u903B\u8F91\u8D8A\u6765\u8D8A\u591A\uFF1F</p><p>\u5F88\u660E\u663E\uFF0C\u8FD9\u91CC\u8FDD\u6CD5\u4E86\u8BBE\u8BA1\u6A21\u5F0F\u516D\u5927\u539F\u5219\u7684\uFF1A\u5F00\u95ED\u539F\u5219 \u548C \u5355\u4E00\u804C\u8D23\u539F\u5219\u3002</p><blockquote><p>\u5F00\u95ED\u539F\u5219\uFF1A\u5BF9\u6269\u5C55\u5F00\u653E\uFF0C\u5BF9\u4FEE\u6539\u5173\u95ED\u3002\u5C31\u662F\u8BF4\u589E\u52A0\u65B0\u529F\u80FD\u8981\u5C3D\u91CF\u5C11\u6539\u52A8\u5DF2\u6709\u4EE3\u7801\u3002</p></blockquote><blockquote><p>\u5355\u4E00\u804C\u8D23\u539F\u5219\uFF1A\u987E\u540D\u601D\u4E49\uFF0C\u8981\u6C42\u903B\u8F91\u5C3D\u91CF\u5355\u4E00\uFF0C\u4E0D\u8981\u592A\u590D\u6742\uFF0C\u4FBF\u4E8E\u590D\u7528\u3002</p></blockquote><p>\u90A3\u4E48\uFF0C\u5982\u4F55\u4F18\u5316if...else\u5224\u65AD\u5462\uFF1F</p><p>\u7B54\uFF1A\u4F7F\u7528 <code>\u7B56\u7565\u6A21\u5F0F</code>+<code>\u5DE5\u5382\u6A21\u5F0F</code>\u3002</p><p>\u7B56\u7565\u6A21\u5F0F\u5B9A\u4E49\u4E86\u4E00\u7EC4\u7B97\u6CD5\uFF0C\u628A\u5B83\u4EEC\u4E00\u4E2A\u4E2A\u5C01\u88C5\u8D77\u6765, \u5E76\u4E14\u4F7F\u5B83\u4EEC\u53EF\u76F8\u4E92\u66FF\u6362\u3002\u5DE5\u5382\u6A21\u5F0F\u7528\u4E8E\u5C01\u88C5\u548C\u7BA1\u7406\u5BF9\u8C61\u7684\u521B\u5EFA\uFF0C\u662F\u4E00\u79CD\u521B\u5EFA\u578B\u6A21\u5F0F\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public interface IPay {
    void pay();
}

@Service
public class AliaPay implements IPay {

    @PostConstruct
    public void init() {
        PayStrategyFactory.register(&quot;aliaPay&quot;, this);
    }

    @Override
    public void pay() {
        System.out.println(&quot;===\u53D1\u8D77\u652F\u4ED8\u5B9D\u652F\u4ED8===&quot;);
    }
}

@Service
public class WeixinPay implements IPay {

    @PostConstruct
    public void init() {
        PayStrategyFactory.register(&quot;weixinPay&quot;, this);
    }

    @Override
    public void pay() {
        System.out.println(&quot;===\u53D1\u8D77\u5FAE\u4FE1\u652F\u4ED8===&quot;);
    }
}

@Service
public class JingDongPay implements IPay {

    @PostConstruct
    public void init() {
        PayStrategyFactory.register(&quot;jingDongPay&quot;, this);
    }

    @Override
    public void pay() {
        System.out.println(&quot;===\u53D1\u8D77\u4EAC\u4E1C\u652F\u4ED8===&quot;);
    }
}

public class PayStrategyFactory {

    private static Map&lt;String, IPay&gt; PAY_REGISTERS = new HashMap&lt;&gt;();

    public static void register(String code, IPay iPay) {
        if (null != code &amp;&amp; !&quot;&quot;.equals(code)) {
            PAY_REGISTERS.put(code, iPay);
        }
    }

    public static IPay get(String code) {
        return PAY_REGISTERS.get(code);
    }
}

@Service
public class PayService3 {

    public void toPay(String code) {
        PayStrategyFactory.get(code).pay();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u6BB5\u4EE3\u7801\u7684\u5173\u952E\u662FPayStrategyFactory\u7C7B\uFF0C\u5B83\u662F\u4E00\u4E2A\u7B56\u7565\u5DE5\u5382\uFF0C\u91CC\u9762\u5B9A\u4E49\u4E86\u4E00\u4E2A\u5168\u5C40\u7684map\uFF0C\u5728\u6240\u6709IPay\u7684\u5B9E\u73B0\u7C7B\u4E2D\u6CE8\u518C\u5F53\u524D\u5B9E\u4F8B\u5230map\u4E2D\uFF0C\u7136\u540E\u5728\u8C03\u7528\u7684\u5730\u65B9\u901A\u8FC7PayStrategyFactory\u7C7B\u6839\u636Ecode\u4ECEmap\u83B7\u53D6\u652F\u4ED8\u7C7B\u5B9E\u4F8B\u5373\u53EF\u3002</p><p>\u5982\u679C\u52A0\u4E86\u4E00\u4E2A\u65B0\u7684\u652F\u4ED8\u65B9\u5F0F\uFF0C\u53EA\u9700\u65B0\u52A0\u4E00\u4E2A\u7C7B\u5B9E\u73B0IPay\u63A5\u53E3\uFF0C\u5B9A\u4E49init\u65B9\u6CD5\uFF0C\u5E76\u4E14\u91CD\u5199pay\u65B9\u6CD5\u5373\u53EF\uFF0C\u5176\u4ED6\u4EE3\u7801\u57FA\u672C\u4E0A\u53EF\u4EE5\u4E0D\u7528\u52A8\u3002</p>`,16),P=i("\u5F53\u7136\uFF0C\u6D88\u9664\u53C8\u81ED\u53C8\u957F\u7684if...else\u5224\u65AD\uFF0C\u8FD8\u6709\u5F88\u591A\u65B9\u6CD5\uFF0C\u6BD4\u5982\uFF1A\u4F7F\u7528\u6CE8\u89E3\u3001\u52A8\u6001\u62FC\u63A5\u7C7B\u540D\u79F0\u3001\u6A21\u677F\u65B9\u6CD5\u3001\u679A\u4E3E\u7B49\u7B49\u3002\u7531\u4E8E\u7BC7\u5E45\u6709\u9650\uFF0C\u5728\u8FD9\u91CC\u6211\u5C31\u4E0D\u8FC7\u591A\u4ECB\u7ECD\u4E86\uFF0C\u66F4\u8BE6\u7EC6\u7684\u5185\u5BB9\u53EF\u4EE5\u770B\u770B\u6211\u7684\u53E6\u4E00\u7BC7\u6587\u7AE0\u300A"),C={href:"https://mp.weixin.qq.com/s?__biz=MzkwNjMwMTgzMQ==&mid=2247490272&idx=1&sn=c5db63c7b52e7518b7a42e48c70927fc&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},T=i("\u6D88\u9664if...else\u662F9\u6761\u9526\u56CA\u5999\u8BA1"),D=i("\u300B"),j=s(`<h2 id="_21-\u9632\u6B62\u6B7B\u5FAA\u73AF" tabindex="-1"><a class="header-anchor" href="#_21-\u9632\u6B62\u6B7B\u5FAA\u73AF" aria-hidden="true">#</a> 21.\u9632\u6B62\u6B7B\u5FAA\u73AF</h2><p>\u6709\u4E9B\u5C0F\u4F19\u4F34\u770B\u5230\u8FD9\u4E2A\u6807\u9898\uFF0C\u53EF\u80FD\u4F1A\u611F\u5230\u6709\u70B9\u610F\u5916\uFF0C\u4EE3\u7801\u4E2D\u4E0D\u662F\u5E94\u8BE5\u907F\u514D\u6B7B\u5FAA\u73AF\u5417\uFF1F\u4E3A\u5565\u8FD8\u662F\u4F1A\u4EA7\u751F\u6B7B\u5FAA\u73AF\uFF1F</p><p>\u6B8A\u4E0D\u77E5\u6709\u4E9B\u6B7B\u5FAA\u73AF\u662F\u6211\u4EEC\u81EA\u5DF1\u5199\u7684\uFF0C\u4F8B\u5982\u4E0B\u9762\u8FD9\u6BB5\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>while(true) {
    if(condition) {
        break;
    }
    System.out.println(&quot;do samething&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u4F7F\u7528\u4E86while(true)\u7684\u5FAA\u73AF\u8C03\u7528\uFF0C\u8FD9\u79CD\u5199\u6CD5\u5728<code>CAS\u81EA\u65CB\u9501</code>\u4E2D\u4F7F\u7528\u6BD4\u8F83\u591A\u3002</p><p>\u5F53\u6EE1\u8DB3condition\u7B49\u4E8Etrue\u7684\u65F6\u5019\uFF0C\u5219\u81EA\u52A8\u9000\u51FA\u8BE5\u5FAA\u73AF\u3002</p><p>\u5982\u679Ccondition\u6761\u4EF6\u975E\u5E38\u590D\u6742\uFF0C\u4E00\u65E6\u51FA\u73B0\u5224\u65AD\u4E0D\u6B63\u786E\uFF0C\u6216\u8005\u5C11\u5199\u4E86\u4E00\u4E9B\u903B\u8F91\u5224\u65AD\uFF0C\u5C31\u53EF\u80FD\u5728\u67D0\u4E9B\u573A\u666F\u4E0B\u51FA\u73B0\u6B7B\u5FAA\u73AF\u7684\u95EE\u9898\u3002</p><p>\u51FA\u73B0\u6B7B\u5FAA\u73AF\uFF0C\u5927\u6982\u7387\u662F\u5F00\u53D1\u4EBA\u5458\u4EBA\u4E3A\u7684bug\u5BFC\u81F4\u7684\uFF0C\u4E0D\u8FC7\u8FD9\u79CD\u60C5\u51B5\u5F88\u5BB9\u6613\u88AB\u6D4B\u51FA\u6765\u3002</p><blockquote><p>\u8FD8\u6709\u4E00\u79CD\u9690\u85CF\u7684\u6BD4\u8F83\u6DF1\u7684\u6B7B\u5FAA\u73AF\uFF0C\u662F\u7531\u4E8E\u4EE3\u7801\u5199\u7684\u4E0D\u592A\u4E25\u8C28\u5BFC\u81F4\u7684\u3002\u5982\u679C\u7528\u6B63\u5E38\u6570\u636E\uFF0C\u53EF\u80FD\u6D4B\u4E0D\u51FA\u95EE\u9898\uFF0C\u4F46\u4E00\u65E6\u51FA\u73B0\u5F02\u5E38\u6570\u636E\uFF0C\u5C31\u4F1A\u7ACB\u5373\u51FA\u73B0\u6B7B\u5FAA\u73AF\u3002</p></blockquote><p>\u5176\u5B9E\uFF0C\u8FD8\u6709\u53E6\u4E00\u79CD\u6B7B\u5FAA\u73AF\uFF1A<code>\u65E0\u9650\u9012\u5F52</code>\u3002</p><p>\u5982\u679C\u60F3\u8981\u6253\u5370\u67D0\u4E2A\u5206\u7C7B\u7684\u6240\u6709\u7236\u5206\u7C7B\uFF0C\u53EF\u4EE5\u7528\u7C7B\u4F3C\u8FD9\u6837\u7684\u9012\u5F52\u65B9\u6CD5\u5B9E\u73B0\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public void printCategory(Category category) {
  if(category == null 
      || category.getParentId() == null) {
     return;
  } 
  System.out.println(&quot;\u7236\u5206\u7C7B\u540D\u79F0\uFF1A&quot;+ category.getName());
  Category parent = categoryMapper.getCategoryById(category.getParentId());
  printCategory(parent);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B63\u5E38\u60C5\u51B5\u4E0B\uFF0C\u8FD9\u6BB5\u4EE3\u7801\u662F\u6CA1\u6709\u95EE\u9898\u7684\u3002</p><p>\u4F46\u5982\u679C\u67D0\u6B21\u6709\u4EBA\u8BEF\u64CD\u4F5C\uFF0C\u628A\u67D0\u4E2A\u5206\u7C7B\u7684parentId\u6307\u5411\u4E86\u5B83\u81EA\u5DF1\uFF0C\u8FD9\u6837\u5C31\u4F1A\u51FA\u73B0\u65E0\u9650\u9012\u5F52\u7684\u60C5\u51B5\u3002\u5BFC\u81F4\u63A5\u53E3\u4E00\u76F4\u4E0D\u80FD\u8FD4\u56DE\u6570\u636E\uFF0C\u6700\u7EC8\u4F1A\u53D1\u751F\u5806\u6808\u6EA2\u51FA\u3002</p><blockquote><p>\u5EFA\u8BAE\u5199\u9012\u5F52\u65B9\u6CD5\u65F6\uFF0C\u8BBE\u5B9A\u4E00\u4E2A\u9012\u5F52\u7684\u6DF1\u5EA6\uFF0C\u6BD4\u5982\uFF1A\u5206\u7C7B\u6700\u5927\u7B49\u7EA7\u67094\u7EA7\uFF0C\u5219\u6DF1\u5EA6\u53EF\u4EE5\u8BBE\u7F6E\u4E3A4\u3002\u7136\u540E\u5728\u9012\u5F52\u65B9\u6CD5\u4E2D\u505A\u5224\u65AD\uFF0C\u5982\u679C\u6DF1\u5EA6\u5927\u4E8E4\u65F6\uFF0C\u5219\u81EA\u52A8\u8FD4\u56DE\uFF0C\u8FD9\u6837\u5C31\u80FD\u907F\u514D\u65E0\u9650\u5FAA\u73AF\u7684\u60C5\u51B5\u3002</p></blockquote><h2 id="_22-\u6CE8\u610Fbigdecimal\u7684\u5751" tabindex="-1"><a class="header-anchor" href="#_22-\u6CE8\u610Fbigdecimal\u7684\u5751" aria-hidden="true">#</a> 22.\u6CE8\u610FBigDecimal\u7684\u5751</h2><p>\u901A\u5E38\u6211\u4EEC\u4F1A\u628A\u4E00\u4E9B\u5C0F\u6570\u7C7B\u578B\u7684\u5B57\u6BB5\uFF08\u6BD4\u5982\uFF1A\u91D1\u989D\uFF09\uFF0C\u5B9A\u4E49\u6210<code>BigDecimal</code>\uFF0C\u800C\u4E0D\u662F<code>Double</code>\uFF0C\u907F\u514D\u4E22\u5931\u7CBE\u5EA6\u95EE\u9898\u3002</p><p>\u4F7F\u7528Double\u65F6\u53EF\u80FD\u4F1A\u6709\u8FD9\u79CD\u573A\u666F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>double amount1 = 0.02;
double amount2 = 0.03;
System.out.println(amount2 - amount1);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B63\u5E38\u60C5\u51B5\u4E0B\u9884\u8BA1amount2 - amount1\u5E94\u8BE5\u7B49\u4E8E0.01</p><p>\u4F46\u662F\u6267\u884C\u7ED3\u679C\uFF0C\u5374\u4E3A\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>0.009999999999999998
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5B9E\u9645\u7ED3\u679C\u5C0F\u4E8E\u9884\u8BA1\u7ED3\u679C\u3002</p><p>Double\u7C7B\u578B\u7684\u4E24\u4E2A\u53C2\u6570\u76F8\u51CF\u4F1A\u8F6C\u6362\u6210\u4E8C\u8FDB\u5236\uFF0C\u56E0\u4E3ADouble\u6709\u6548\u4F4D\u6570\u4E3A16\u4F4D\u8FD9\u5C31\u4F1A\u51FA\u73B0\u5B58\u50A8\u5C0F\u6570\u4F4D\u6570\u4E0D\u591F\u7684\u60C5\u51B5\uFF0C\u8FD9\u79CD\u60C5\u51B5\u4E0B\u5C31\u4F1A\u51FA\u73B0\u8BEF\u5DEE\u3002</p><p>\u5E38\u8BC6\u544A\u8BC9\u6211\u4EEC\u4F7F\u7528<code>BigDecimal</code>\u80FD\u907F\u514D\u4E22\u5931\u7CBE\u5EA6\u3002</p><p>\u4F46\u662F\u4F7F\u7528BigDecimal\u80FD\u907F\u514D\u4E22\u5931\u7CBE\u5EA6\u5417\uFF1F</p><p>\u7B54\u6848\u662F\u5426\u5B9A\u7684\u3002</p><p>\u4E3A\u4EC0\u4E48\uFF1F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>BigDecimal amount1 = new BigDecimal(0.02);
BigDecimal amount2 = new BigDecimal(0.03);
System.out.println(amount2.subtract(amount1));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u4F8B\u5B50\u4E2D\u5B9A\u4E49\u4E86\u4E24\u4E2ABigDecimal\u7C7B\u578B\u53C2\u6570\uFF0C\u4F7F\u7528\u6784\u9020\u51FD\u6570\u521D\u59CB\u5316\u6570\u636E\uFF0C\u7136\u540E\u6253\u5370\u4E24\u4E2A\u53C2\u6570\u76F8\u51CF\u540E\u7684\u503C\u3002</p><p>\u7ED3\u679C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>0.0099999999999999984734433411404097569175064563751220703125
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4E0D\u79D1\u5B66\u5440\uFF0C\u4E3A\u5565\u8FD8\u662F\u4E22\u5931\u7CBE\u5EA6\u4E86\uFF1F</p><p><code>Jdk</code>\u4E2D<code>BigDecimal</code>\u7684<code>\u6784\u9020\u65B9\u6CD5</code>\u4E0A\u6709\u8FD9\u6837\u4E00\u6BB5\u63CF\u8FF0\uFF1A</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-nixgnxmdkddjavadmyhjq-228e98bb-8e62-497f-953e-e831fee0d9e7.jpg" alt=""></p><p>\u5927\u81F4\u7684\u610F\u601D\u662F\u6B64\u6784\u9020\u51FD\u6570\u7684\u7ED3\u679C\u53EF\u80FD\u4E0D\u53EF\u9884\u6D4B\uFF0C\u53EF\u80FD\u4F1A\u51FA\u73B0\u521B\u5EFA\u65F6\u4E3A0.1\uFF0C\u4F46\u5B9E\u9645\u662F0.1000000000000000055511151231257827021181583404541015625\u7684\u60C5\u51B5\u3002</p><p>\u7531\u6B64\u53EF\u89C1\uFF0C\u4F7F\u7528BigDecimal\u6784\u9020\u51FD\u6570\u521D\u59CB\u5316\u5BF9\u8C61\uFF0C\u4E5F\u4F1A\u4E22\u5931\u7CBE\u5EA6\u3002</p><p>\u90A3\u4E48\uFF0C\u5982\u4F55\u624D\u80FD\u4E0D\u4E22\u5931\u7CBE\u5EA6\u5462\uFF1F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>BigDecimal amount1 = new BigDecimal(Double.toString(0.02));
BigDecimal amount2 = new BigDecimal(Double.toString(0.03));
System.out.println(amount2.subtract(amount1));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528<code>Double.toString</code>\u65B9\u6CD5\uFF0C\u5BF9double\u7C7B\u578B\u7684\u5C0F\u6570\u8FDB\u884C\u8F6C\u6362\uFF0C\u8FD9\u6837\u80FD\u4FDD\u8BC1\u7CBE\u5EA6\u4E0D\u4E22\u5931\u3002</p><p>\u5176\u5B9E\uFF0C\u8FD8\u6709\u66F4\u597D\u7684\u529E\u6CD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>BigDecimal amount1 = BigDecimal.valueOf(0.02);
BigDecimal amount2 = BigDecimal.valueOf(0.03);
System.out.println(amount2.subtract(amount1));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528<code>BigDecimal.valueOf</code>\u65B9\u6CD5\u521D\u59CB\u5316BigDecimal\u7C7B\u578B\u53C2\u6570\uFF0C\u4E5F\u80FD\u4FDD\u8BC1\u7CBE\u5EA6\u4E0D\u4E22\u5931\u3002\u5728\u65B0\u7248\u7684\u963F\u91CC\u5DF4\u5DF4\u5F00\u53D1\u624B\u518C\u4E2D\uFF0C\u4E5F\u63A8\u8350\u4F7F\u7528\u8FD9\u79CD\u65B9\u5F0F\u521B\u5EFABigDecimal\u53C2\u6570\u3002</p><h2 id="_23-\u5C3D\u53EF\u80FD\u590D\u7528\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#_23-\u5C3D\u53EF\u80FD\u590D\u7528\u4EE3\u7801" aria-hidden="true">#</a> 23.\u5C3D\u53EF\u80FD\u590D\u7528\u4EE3\u7801</h2><p><code>ctrl + c</code> \u548C <code>ctrl + v</code>\u53EF\u80FD\u662F\u7A0B\u5E8F\u5458\u4F7F\u7528\u6700\u591A\u7684\u5FEB\u6377\u952E\u4E86\u3002</p><p>\u6CA1\u9519\uFF0C\u6211\u4EEC\u662F\u5927\u81EA\u7136\u7684\u642C\u8FD0\u5DE5\u3002\u54C8\u54C8\u54C8\u3002</p><p>\u5728\u9879\u76EE\u521D\u671F\uFF0C\u6211\u4EEC\u4F7F\u7528\u8FD9\u79CD\u5DE5\u4F5C\u6A21\u5F0F\uFF0C\u786E\u5B9E\u53EF\u4EE5\u63D0\u9AD8\u4E00\u4E9B\u5DE5\u4F5C\u6548\u7387\uFF0C\u53EF\u4EE5\u5C11\u5199\uFF08\u5B9E\u9645\u4E0A\u662F\u5C11\u6572\uFF09\u5F88\u591A\u4EE3\u7801\u3002</p><p>\u4F46\u5B83\u5E26\u6765\u7684\u95EE\u9898\u662F\uFF1A\u4F1A\u51FA\u73B0\u5927\u91CF\u7684\u4EE3\u7801\u91CD\u590D\u3002\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Service
@Slf4j
public class TestService1 {

    public void test1()  {
        addLog(&quot;test1&quot;);
    }

    private void addLog(String info) {
        if (log.isInfoEnabled()) {
            log.info(&quot;info:{}&quot;, info);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Service
@Slf4j
public class TestService2 {

    public void test2()  {
        addLog(&quot;test2&quot;);
    }

    private void addLog(String info) {
        if (log.isInfoEnabled()) {
            log.info(&quot;info:{}&quot;, info);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Service
@Slf4j
public class TestService3 {

    public void test3()  {
        addLog(&quot;test3&quot;);
    }

    private void addLog(String info) {
        if (log.isInfoEnabled()) {
            log.info(&quot;info:{}&quot;, info);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728TestService1\u3001TestService2\u3001TestService3\u7C7B\u4E2D\uFF0C\u90FD\u6709\u4E00\u4E2AaddLog\u65B9\u6CD5\u7528\u4E8E\u6DFB\u52A0\u65E5\u5FD7\u3002</p><p>\u672C\u6765\u8BE5\u529F\u80FD\u7528\u5F97\u597D\u597D\u7684\uFF0C\u76F4\u5230\u6709\u4E00\u5929\uFF0C\u7EBF\u4E0A\u51FA\u73B0\u4E86\u4E00\u4E2A\u4E8B\u6545\uFF1A\u670D\u52A1\u5668\u78C1\u76D8\u6EE1\u4E86\u3002</p><p>\u539F\u56E0\u662F\u6253\u5370\u7684\u65E5\u5FD7\u592A\u591A\uFF0C\u8BB0\u4E86\u5F88\u591A\u6CA1\u5FC5\u8981\u7684\u65E5\u5FD7\uFF0C\u6BD4\u5982\uFF1A\u67E5\u8BE2\u63A5\u53E3\u7684\u6240\u6709\u8FD4\u56DE\u503C\uFF0C\u5927\u5BF9\u8C61\u7684\u5177\u4F53\u6253\u5370\u7B49\u3002</p><p>\u6CA1\u529E\u6CD5\uFF0C\u53EA\u80FD\u5C06addLog\u65B9\u6CD5\u6539\u6210\u53EA\u8BB0\u5F55<code>debug</code>\u65E5\u5FD7\u3002</p><p>\u4E8E\u662F\u4E4E\uFF0C\u4F60\u9700\u8981\u5168\u6587\u641C\u7D22\uFF0CaddLog\u65B9\u6CD5\u53BB\u4FEE\u6539\uFF0C\u6539\u6210\u5982\u4E0B\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>private void addLog(String info) {
    if (log.isDebugEnabled()) {
        log.debug(&quot;debug:{}&quot;, info);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u662F\u6709\u4E09\u4E2A\u7C7B\u4E2D\u9700\u8981\u4FEE\u6539\u8FD9\u6BB5\u4EE3\u7801\uFF0C\u4F46\u5982\u679C\u5B9E\u9645\u5DE5\u4F5C\u4E2D\u6709\u4E09\u5341\u4E2A\u3001\u4E09\u767E\u4E2A\u7C7B\u9700\u8981\u4FEE\u6539\uFF0C\u4F1A\u8BA9\u4F60\u975E\u5E38\u75DB\u82E6\u3002\u6539\u9519\u4E86\uFF0C\u6216\u8005\u6539\u6F0F\u4E86\uFF0C\u90FD\u4F1A\u57CB\u4E0B\u9690\u60A3\uFF0C\u628A\u81EA\u5DF1\u5751\u4E86\u3002</p><p>\u4E3A\u4F55\u4E0D\u628A\u8FD9\u79CD\u529F\u80FD\u7684\u4EE3\u7801\u63D0\u53D6\u51FA\u6765\uFF0C\u653E\u5230\u67D0\u4E2A\u5DE5\u5177\u7C7B\u4E2D\u5462\uFF1F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Slf4j
public class LogUtil {

    private LogUtil() {
        throw new RuntimeException(&quot;\u521D\u59CB\u5316\u5931\u8D25&quot;);
    }

    public static void addLog(String info) {
        if (log.isDebugEnabled()) {
            log.debug(&quot;debug:{}&quot;, info);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\uFF0C\u5728\u5176\u4ED6\u7684\u5730\u65B9\uFF0C\u53EA\u9700\u8981\u8C03\u7528\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Service
@Slf4j
public class TestService1 {

    public void test1()  {
        LogUtil.addLog(&quot;test1&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u54EA\u5929addLog\u7684\u903B\u8F91\u53C8\u8981\u6539\u4E86\uFF0C\u53EA\u9700\u8981\u4FEE\u6539LogUtil\u7C7B\u7684addLog\u65B9\u6CD5\u5373\u53EF\u3002\u4F60\u53EF\u4EE5\u81EA\u4FE1\u6EE1\u6EE1\u7684\u4FEE\u6539\uFF0C\u4E0D\u9700\u8981\u518D\u5C0F\u5FC3\u7FFC\u7FFC\u4E86\u3002</p><p>\u6211\u4EEC\u5199\u7684\u4EE3\u7801\uFF0C\u7EDD\u5927\u591A\u6570\u662F\u53EF\u7EF4\u62A4\u6027\u7684\u4EE3\u7801\uFF0C\u800C\u975E\u4E00\u6B21\u6027\u7684\u3002\u6240\u4EE5\uFF0C\u5EFA\u8BAE\u5728\u5199\u4EE3\u7801\u7684\u8FC7\u7A0B\u4E2D\uFF0C\u5982\u679C\u51FA\u73B0\u91CD\u590D\u7684\u4EE3\u7801\uFF0C\u5C3D\u91CF\u63D0\u53D6\u6210\u516C\u5171\u65B9\u6CD5\u3002\u5343\u4E07\u522B\u56E0\u4E3A\u9879\u76EE\u521D\u671F\u4E00\u65F6\u7684\u723D\u5FEB\uFF0C\u800C\u7ED9\u9879\u76EE\u57CB\u4E0B\u9690\u60A3\uFF0C\u540E\u9762\u7684\u7EF4\u62A4\u6210\u672C\u53EF\u80FD\u4F1A\u975E\u5E38\u9AD8\u3002</p><h2 id="_24-foreach\u5FAA\u73AF\u4E2D\u4E0Dremove\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#_24-foreach\u5FAA\u73AF\u4E2D\u4E0Dremove\u5143\u7D20" aria-hidden="true">#</a> 24.foreach\u5FAA\u73AF\u4E2D\u4E0Dremove\u5143\u7D20</h2><p>\u6211\u4EEC\u77E5\u9053\u5728Java\u4E2D\uFF0C\u5FAA\u73AF\u6709\u5F88\u591A\u79CD\u5199\u6CD5\uFF0C\u6BD4\u5982\uFF1Awhile\u3001for\u3001foreach\u7B49\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class Test2 {
    public static void main(String[] args) {
        List&lt;String&gt; list = Lists.newArrayList(&quot;a&quot;,&quot;b&quot;,&quot;c&quot;);
        for (String temp : list) {
            if (&quot;c&quot;.equals(temp)) {
                list.remove(temp);
            }
        }
        System.out.println(list);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6267\u884C\u7ED3\u679C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Exception in thread &quot;main&quot; java.util.ConcurrentModificationException
 at java.util.ArrayList$Itr.checkForComodification(ArrayList.java:901)
 at java.util.ArrayList$Itr.next(ArrayList.java:851)
 at com.sue.jump.service.test1.Test2.main(Test2.java:24)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u79CD\u5728<code>foreach</code>\u5FAA\u73AF\u4E2D\u8C03\u7528<code>remove</code>\u65B9\u6CD5\u5220\u9664\u5143\u7D20\uFF0C\u53EF\u80FD\u4F1A\u62A5<code>ConcurrentModificationException</code>\u5F02\u5E38\u3002</p><p>\u5982\u679C\u60F3\u5728\u904D\u5386\u96C6\u5408\u65F6\uFF0C\u5220\u9664\u5176\u4E2D\u7684\u5143\u7D20\uFF0C\u53EF\u4EE5\u7528for\u5FAA\u73AF\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public class Test2 {

    public static void main(String[] args) {
        List&lt;String&gt; list = Lists.newArrayList(&quot;a&quot;,&quot;b&quot;,&quot;c&quot;);
        for (int i = 0; i &lt; list.size(); i++) {
            String temp = list.get(i);
            if (&quot;c&quot;.equals(temp)) {
                list.remove(temp);
            }
        }
        System.out.println(list);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6267\u884C\u7ED3\u679C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[a, b]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_25-\u907F\u514D\u968F\u610F\u6253\u5370\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#_25-\u907F\u514D\u968F\u610F\u6253\u5370\u65E5\u5FD7" aria-hidden="true">#</a> 25.\u907F\u514D\u968F\u610F\u6253\u5370\u65E5\u5FD7</h2><p>\u5728\u6211\u4EEC\u5199\u4EE3\u7801\u7684\u65F6\u5019\uFF0C\u6253\u5370\u65E5\u5FD7\u662F\u5FC5\u4E0D\u53EF\u5C11\u7684\u5DE5\u4F5C\u4E4B\u4E00\u3002</p><p>\u56E0\u4E3A\u65E5\u5FD7\u53EF\u4EE5\u5E2E\u6211\u4EEC\u5FEB\u901F\u5B9A\u4F4D\u95EE\u9898\uFF0C\u5224\u65AD\u4EE3\u7801\u5F53\u65F6\u771F\u6B63\u7684\u6267\u884C\u903B\u8F91\u3002</p><p>\u4F46\u6253\u5370\u65E5\u5FD7\u7684\u65F6\u5019\u4E5F\u9700\u8981\u6CE8\u610F\uFF0C\u4E0D\u662F\u8BF4\u4EFB\u4F55\u65F6\u5019\u90FD\u8981\u6253\u5370\u65E5\u5FD7\uFF0C\u6BD4\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@PostMapping(&quot;/query&quot;)
public List&lt;User&gt; query(@RequestBody List&lt;Long&gt; ids) {
    log.info(&quot;request params:{}&quot;, ids);
    List&lt;User&gt; userList = userService.query(ids);
    log.info(&quot;response:{}&quot;, userList);
    return userList;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5BF9\u4E8E\u6709\u4E9B\u67E5\u8BE2\u63A5\u53E3\uFF0C\u5728\u65E5\u5FD7\u4E2D\u6253\u5370\u51FA\u4E86\u8BF7\u6C42\u53C2\u6570\u548C\u63A5\u53E3\u8FD4\u56DE\u503C\u3002</p><p>\u548B\u4E00\u770B\u6CA1\u5565\u95EE\u9898\u3002</p><p>\u4F46\u5982\u679Cids\u4E2D\u4F20\u5165\u503C\u975E\u5E38\u591A\uFF0C\u6BD4\u5982\u67091000\u4E2A\u3002\u800C\u8BE5\u63A5\u53E3\u88AB\u8C03\u7528\u7684\u9891\u6B21\u53C8\u5F88\u9AD8\uFF0C\u4E00\u4E0B\u5B50\u5C31\u4F1A\u6253\u5370\u5927\u91CF\u7684\u65E5\u5FD7\uFF0C\u7528\u4E0D\u4E86\u591A\u4E45\u5C31\u53EF\u80FD\u628A<code>\u78C1\u76D8\u7A7A\u95F4</code>\u6253\u6EE1\u3002</p><p>\u5982\u679C\u771F\u7684\u60F3\u6253\u5370\u8FD9\u4E9B\u65E5\u5FD7\u8BE5\u600E\u4E48\u529E\uFF1F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@PostMapping(&quot;/query&quot;)
public List&lt;User&gt; query(@RequestBody List&lt;Long&gt; ids) {
    if (log.isDebugEnabled()) {
        log.debug(&quot;request params:{}&quot;, ids);
    }

    List&lt;User&gt; userList = userService.query(ids);

    if (log.isDebugEnabled()) {
        log.debug(&quot;response:{}&quot;, userList);
    }
    return userList;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528<code>isDebugEnabled</code>\u5224\u65AD\u4E00\u4E0B\uFF0C\u5982\u679C\u5F53\u524D\u7684\u65E5\u5FD7\u7EA7\u522B\u662F<code>debug</code>\u624D\u6253\u5370\u65E5\u5FD7\u3002\u751F\u4EA7\u73AF\u5883\u9ED8\u8BA4\u65E5\u5FD7\u7EA7\u522B\u662F<code>info</code>\uFF0C\u5728\u6709\u4E9B\u7D27\u6025\u60C5\u51B5\u4E0B\uFF0C\u628A\u67D0\u4E2A\u63A5\u53E3\u6216\u8005\u65B9\u6CD5\u7684\u65E5\u5FD7\u7EA7\u522B\u6539\u6210debug\uFF0C\u6253\u5370\u5B8C\u6211\u4EEC\u9700\u8981\u7684\u65E5\u5FD7\u540E\uFF0C\u53C8\u8C03\u6574\u56DE\u53BB\u3002</p><p>\u65B9\u4FBF\u6211\u4EEC\u5B9A\u4F4D\u95EE\u9898\uFF0C\u53C8\u4E0D\u4F1A\u4EA7\u751F\u5927\u91CF\u7684\u5783\u573E\u65E5\u5FD7\uFF0C\u4E00\u4E3E\u4E24\u5F97\u3002</p><h2 id="_26-\u6BD4\u8F83\u65F6\u628A\u5E38\u91CF\u5199\u524D\u9762" tabindex="-1"><a class="header-anchor" href="#_26-\u6BD4\u8F83\u65F6\u628A\u5E38\u91CF\u5199\u524D\u9762" aria-hidden="true">#</a> 26.\u6BD4\u8F83\u65F6\u628A\u5E38\u91CF\u5199\u524D\u9762</h2><p>\u5728\u6BD4\u8F83\u4E24\u4E2A\u53C2\u6570\u503C\u662F\u5426\u76F8\u7B49\u65F6\uFF0C\u901A\u5E38\u6211\u4EEC\u4F1A\u4F7F\u7528<code>==</code>\u53F7\uFF0C\u6216\u8005<code>equals</code>\u65B9\u6CD5\u3002</p><p>\u6211\u5728\u7B2C15\u7AE0\u8282\u4E2D\u8BF4\u8FC7\uFF0C\u4F7F\u7528<code>==</code>\u53F7\u6BD4\u8F83\u4E24\u4E2A\u503C\u662F\u5426\u76F8\u7B49\u65F6\uFF0C\u53EF\u80FD\u4F1A\u5B58\u5728\u95EE\u9898\uFF0C\u5EFA\u8BAE\u4F7F\u7528<code>equals</code>\u65B9\u6CD5\u505A\u6BD4\u8F83\u3002</p><p><code>\u53CD\u4F8B</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if(user.getName().equals(&quot;\u82CF\u4E09&quot;)) {
   System.out.println(&quot;\u627E\u5230\uFF1A&quot;+user.getName());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u4E0A\u9762\u8FD9\u6BB5\u4EE3\u7801\u4E2D\uFF0C\u5982\u679Cuser\u5BF9\u8C61\uFF0C\u6216\u8005user.getName()\u65B9\u6CD5\u8FD4\u56DE\u503C\u4E3A<code>null</code>\uFF0C\u5219\u90FD\u62A5<code>NullPointerException</code>\u5F02\u5E38\u3002</p><p>\u90A3\u4E48\uFF0C\u5982\u4F55\u907F\u514D\u7A7A\u6307\u9488\u5F02\u5E38\u5462\uFF1F</p><p><code>\u6B63\u4F8B</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>private static final String FOUND_NAME = &quot;\u82CF\u4E09&quot;;
...

if(null == user) {
  return;
}
if(FOUND_NAME.equals(user.getName())) {
   System.out.println(&quot;\u627E\u5230\uFF1A&quot;+user.getName());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u4F7F\u7528<code>equals</code>\u505A\u6BD4\u8F83\u65F6\uFF0C\u5C3D\u91CF\u5C06<code>\u5E38\u91CF</code>\u5199\u5728\u524D\u9762\uFF0C\u5373equals\u65B9\u6CD5\u7684\u5DE6\u8FB9\u3002</p><p>\u8FD9\u6837\u5373\u4F7Fuser.getName()\u8FD4\u56DE\u7684\u6570\u636E\u4E3Anull\uFF0Cequals\u65B9\u6CD5\u4F1A\u76F4\u63A5\u8FD4\u56DEfalse\uFF0C\u800C\u4E0D\u518D\u662F\u62A5\u7A7A\u6307\u9488\u5F02\u5E38\u3002</p><h2 id="_27-\u540D\u79F0\u8981\u89C1\u540D\u77E5\u610F" tabindex="-1"><a class="header-anchor" href="#_27-\u540D\u79F0\u8981\u89C1\u540D\u77E5\u610F" aria-hidden="true">#</a> 27.\u540D\u79F0\u8981\u89C1\u540D\u77E5\u610F</h2><p>java\u4E2D\u6CA1\u6709\u5F3A\u5236\u89C4\u5B9A\u53C2\u6570\u3001\u65B9\u6CD5\u3001\u7C7B\u6216\u8005\u5305\u540D\u8BE5\u600E\u4E48\u8D77\u540D\u3002\u4F46\u5982\u679C\u6211\u4EEC\u6CA1\u6709\u517B\u6210\u826F\u597D\u7684\u8D77\u540D\u4E60\u60EF\uFF0C\u968F\u610F\u8D77\u540D\u7684\u8BDD\uFF0C\u53EF\u80FD\u4F1A\u51FA\u73B0\u5F88\u591A\u5947\u602A\u7684\u4EE3\u7801\u3002</p><h3 id="_27-1-\u6709\u610F\u4E49\u7684\u53C2\u6570\u540D" tabindex="-1"><a class="header-anchor" href="#_27-1-\u6709\u610F\u4E49\u7684\u53C2\u6570\u540D" aria-hidden="true">#</a> 27.1 \u6709\u610F\u4E49\u7684\u53C2\u6570\u540D</h3><p>\u6709\u65F6\u5019\uFF0C\u6211\u4EEC\u5199\u4EE3\u7801\u65F6\u4E3A\u4E86\u7701\u4E8B\uFF08\u53EF\u4EE5\u5C11\u6572\u51E0\u4E2A\u5B57\u6BCD\uFF09\uFF0C\u53C2\u6570\u540D\u8D77\u5F97\u8D8A\u7B80\u5355\u8D8A\u597D\u3002\u5047\u5982\u540C\u4E8BA\u5199\u7684\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>int a = 1;
int b = 2;
String c = &quot;abc&quot;;
boolean b = false;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E00\u6BB5\u65F6\u95F4\u4E4B\u540E\uFF0C\u540C\u4E8BA\u79BB\u804C\u4E86\uFF0C\u540C\u4E8BB\u63A5\u624B\u4E86\u8FD9\u6BB5\u4EE3\u7801\u3002</p><p>\u4ED6\u6B64\u65F6\u4E00\u8138\u61F5\u903C\uFF0Ca\u662F\u4EC0\u4E48\u610F\u601D\uFF0Cb\u53C8\u662F\u4EC0\u4E48\u610F\u601D\uFF0C\u8FD8\u6709c...\u7136\u540E\u5FC3\u91CC\u4E00\u4E07\u4E2A\u8349\u6CE5\u9A6C\u3002</p><p>\u7ED9\u53C2\u6570\u8D77\u4E00\u4E2A\u6709\u610F\u4E49\u7684\u540D\u5B57\uFF0C\u662F\u975E\u5E38\u91CD\u8981\u7684\u4E8B\u60C5\uFF0C\u907F\u514D\u7ED9\u81EA\u5DF1\u6216\u8005\u522B\u4EBA\u57CB\u5751\u3002</p><p>\u6B63\u89E3\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>int supplierCount = 1;
int purchaserCount = 2;
String userName = &quot;abc&quot;;
boolean hasSuccess = false;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_27-2-\u89C1\u540D\u77E5\u610F" tabindex="-1"><a class="header-anchor" href="#_27-2-\u89C1\u540D\u77E5\u610F" aria-hidden="true">#</a> 27.2 \u89C1\u540D\u77E5\u610F</h3><p>\u5149\u8D77\u6709\u610F\u4E49\u7684\u53C2\u6570\u540D\u8FD8\u4E0D\u591F\uFF0C\u6211\u4EEC\u4E0D\u80FD\u5C31\u8FD9\u70B9\u8FFD\u6C42\u3002\u6211\u4EEC\u8D77\u7684\u53C2\u6570\u540D\u79F0\u6700\u597D\u80FD\u591F<code>\u89C1\u540D\u77E5\u610F</code>\uFF0C\u4E0D\u7136\u5C31\u4F1A\u51FA\u73B0\u8FD9\u6837\u7684\u60C5\u51B5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String yongHuMing = &quot;\u82CF\u4E09&quot;;
String \u7528\u6237Name = &quot;\u82CF\u4E09&quot;;
String su3 = &quot;\u82CF\u4E09&quot;;
String suThree = &quot;\u82CF\u4E09&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u51E0\u79CD\u53C2\u6570\u540D\u770B\u8D77\u6765\u662F\u4E0D\u662F\u6709\u70B9\u602A\u602A\u7684\uFF1F</p><p>\u4E3A\u5565\u4E0D\u5B9A\u4E49\u6210\u56FD\u9645\u4E0A\u901A\u7528\u7684\uFF08\u5730\u7403\u4EBA\u90FD\u80FD\u770B\u61C2\uFF09\u82F1\u6587\u5355\u8BCD\u5462\uFF1F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String userName = &quot;\u82CF\u4E09&quot;;
String susan = &quot;\u82CF\u4E09&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u9762\u7684\u8FD9\u4E24\u4E2A\u53C2\u6570\u540D\uFF0C\u57FA\u672C\u4E0A\u5927\u5BB6\u90FD\u80FD\u770B\u61C2\uFF0C\u51CF\u5C11\u4E86\u597D\u591A\u6C9F\u901A\u6210\u672C\u3002</p><p>\u6240\u4EE5\u5EFA\u8BAE\u5728\u5B9A\u4E49\u4E0D\u7BA1\u662F\u53C2\u6570\u540D\u3001\u65B9\u6CD5\u540D\u3001\u7C7B\u540D\u65F6\uFF0C\u4F18\u5148\u4F7F\u7528\u56FD\u9645\u4E0A\u901A\u7528\u7684\u82F1\u6587\u5355\u8BCD\uFF0C\u66F4\u7B80\u5355\u76F4\u89C2\uFF0C\u51CF\u5C11\u6C9F\u901A\u6210\u672C\u3002\u5C11\u7528\u6C49\u5B50\u3001\u62FC\u97F3\uFF0C\u6216\u8005\u6570\u5B57\u5B9A\u4E49\u540D\u79F0\u3002</p><h3 id="_27-3-\u53C2\u6570\u540D\u98CE\u683C\u4E00\u81F4" tabindex="-1"><a class="header-anchor" href="#_27-3-\u53C2\u6570\u540D\u98CE\u683C\u4E00\u81F4" aria-hidden="true">#</a> 27.3 \u53C2\u6570\u540D\u98CE\u683C\u4E00\u81F4</h3><p>\u53C2\u6570\u540D\u5176\u5B9E\u6709\u591A\u79CD\u98CE\u683C\uFF0C\u5217\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>//\u5B57\u6BCD\u5168\u5C0F\u5199
int suppliercount = 1;

//\u5B57\u6BCD\u5168\u5927\u5199
int SUPPLIERCOUNT = 1;

//\u5C0F\u5199\u5B57\u6BCD + \u4E0B\u5212\u7EBF
int supplier_count = 1;

//\u5927\u5199\u5B57\u6BCD + \u4E0B\u5212\u7EBF
int SUPPLIER_COUNT = 1;

//\u9A7C\u5CF0\u6807\u8BC6
int supplierCount = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u67D0\u4E2A\u7C7B\u4E2D\u5B9A\u4E49\u4E86\u591A\u79CD\u98CE\u683C\u7684\u53C2\u6570\u540D\u79F0\uFF0C\u770B\u8D77\u6765\u662F\u4E0D\u662F\u6709\u70B9\u6742\u4E71\u65E0\u7AE0\uFF1F</p><p>\u6240\u4EE5\u5EFA\u8BAE\u7C7B\u7684\u6210\u5458\u53D8\u91CF\u3001\u5C40\u90E8\u53D8\u91CF\u548C\u65B9\u6CD5\u53C2\u6570\u4F7F\u7528supplierCount\uFF0C\u8FD9\u79CD<code>\u9A7C\u5CF0\u98CE\u683C</code>\uFF0C\u5373\uFF1A\u7B2C\u4E00\u4E2A\u5B57\u6BCD\u5C0F\u5199\uFF0C\u540E\u9762\u7684\u6BCF\u4E2A\u5355\u8BCD\u9996\u5B57\u6BCD\u5927\u5199\u3002\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>int supplierCount = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6B64\u5916\uFF0C\u4E3A\u4E86\u597D\u505A\u533A\u5206\uFF0C\u9759\u6001\u5E38\u91CF\u5EFA\u8BAE\u4F7F\u7528SUPPLIER_COUNT\uFF0C\u5373\uFF1A<code>\u5927\u5199\u5B57\u6BCD</code> <code>+</code> <code>\u4E0B\u5212\u7EBF</code>\u5206\u9694\u7684\u53C2\u6570\u540D\u3002\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>private static final int SUPPLIER_COUNT = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_28-simpledateformat\u7EBF\u7A0B\u4E0D\u5B89\u5168" tabindex="-1"><a class="header-anchor" href="#_28-simpledateformat\u7EBF\u7A0B\u4E0D\u5B89\u5168" aria-hidden="true">#</a> 28.SimpleDateFormat\u7EBF\u7A0B\u4E0D\u5B89\u5168</h2><p>\u5728java8\u4E4B\u524D\uFF0C\u6211\u4EEC\u5BF9\u65F6\u95F4\u7684\u683C\u5F0F\u5316\u5904\u7406\uFF0C\u4E00\u822C\u90FD\u662F\u7528\u7684<code>SimpleDateFormat</code>\u7C7B\u5B9E\u73B0\u7684\u3002\u4F8B\u5982\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Service
public class SimpleDateFormatService {

    public Date time(String time) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat(&quot;yyyy-MM-dd HH:mm:ss&quot;);
        return dateFormat.parse(time);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u4F60\u771F\u7684\u8FD9\u6837\u5199\uFF0C\u662F\u6CA1\u95EE\u9898\u7684\u3002</p><p>\u5C31\u6015\u54EA\u5929\u62BD\u98CE\uFF0C\u4F60\u89C9\u5F97dateFormat\u662F\u4E00\u6BB5\u56FA\u5B9A\u7684\u4EE3\u7801\uFF0C\u5E94\u8BE5\u8981\u628A\u5B83\u62BD\u53D6\u6210\u5E38\u91CF\u3002</p><p>\u4E8E\u662F\u628A\u4EE3\u7801\u6539\u6210\u4E0B\u9762\u7684\u8FD9\u6837\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Service
public class SimpleDateFormatService {

   private static SimpleDateFormat dateFormat = new SimpleDateFormat(&quot;yyyy-MM-dd HH:mm:ss&quot;);

    public Date time(String time) throws ParseException {
        return dateFormat.parse(time);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dateFormat\u5BF9\u8C61\u88AB\u5B9A\u4E49\u6210\u4E86\u9759\u6001\u5E38\u91CF\uFF0C\u8FD9\u6837\u5C31\u80FD\u88AB\u6240\u6709\u5BF9\u8C61\u5171\u7528\u3002</p><p>\u5982\u679C\u53EA\u6709\u4E00\u4E2A\u7EBF\u7A0B\u8C03\u7528time\u65B9\u6CD5\uFF0C\u4E5F\u4E0D\u4F1A\u51FA\u73B0\u95EE\u9898\u3002</p><p>\u4F46Serivce\u7C7B\u7684\u65B9\u6CD5\uFF0C\u5F80\u5F80\u662F\u88ABController\u7C7B\u8C03\u7528\u7684\uFF0C\u800CController\u7C7B\u7684\u63A5\u53E3\u65B9\u6CD5\uFF0C\u5219\u4F1A\u88AB<code>tomcat</code>\u7684<code>\u7EBF\u7A0B\u6C60</code>\u8C03\u7528\u3002\u6362\u53E5\u8BDD\u8BF4\uFF0C\u53EF\u80FD\u4F1A\u51FA\u73B0\u591A\u4E2A\u7EBF\u7A0B\u8C03\u7528\u540C\u4E00\u4E2AController\u7C7B\u7684\u540C\u4E00\u4E2A\u65B9\u6CD5\uFF0C\u4E5F\u5C31\u662F\u4F1A\u51FA\u73B0\u591A\u4E2A\u7EBF\u7A0B\u4F1A\u540C\u65F6\u8C03\u7528time\u65B9\u6CD5\u3002</p><p>\u800Ctime\u65B9\u6CD5\u4F1A\u8C03\u7528<code>SimpleDateFormat</code>\u7C7B\u7684<code>parse</code>\u65B9\u6CD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@Override
public Date parse(String text, ParsePosition pos) {
    ...
    Date parsedDate;
    try {
        parsedDate = calb.establish(calendar).getTime();
        ...
    } catch (IllegalArgumentException e) {
        pos.errorIndex = start;
        pos.index = oldStart;
        return null;
    }
   return parsedDate;
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BE5\u65B9\u6CD5\u4F1A\u8C03\u7528<code>establish</code>\u65B9\u6CD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Calendar establish(Calendar cal) {
    ...
    //1.\u6E05\u7A7A\u6570\u636E
    cal.clear();
    //2.\u8BBE\u7F6E\u65F6\u95F4
    cal.set(...);
    //3.\u8FD4\u56DE
    return cal;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u4E2D\u7684\u6B65\u9AA41\u30012\u30013\u662F\u975E\u539F\u5B50\u64CD\u4F5C\u3002</p><p>\u4F46\u5982\u679Ccal\u5BF9\u8C61\u662F\u5C40\u90E8\u53D8\u91CF\u8FD8\u597D\uFF0C\u574F\u5C31\u574F\u5728parse\u65B9\u6CD5\u8C03\u7528establish\u65B9\u6CD5\u65F6\uFF0C\u4F20\u5165\u7684calendar\u662F<code>SimpleDateFormat</code>\u7C7B\u7684\u7236\u7C7B<code>DateFormat</code>\u7684\u6210\u5458\u53D8\u91CF\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public abstract class DateFormat extends Forma {
    ....
    protected Calendar calendar;
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u6837\u5C31\u53EF\u80FD\u4F1A\u51FA\u73B0\u591A\u4E2A\u7EBF\u7A0B\uFF0C\u540C\u65F6\u4FEE\u6539\u540C\u4E00\u4E2A\u5BF9\u8C61\u5373\uFF1AdateFormat\uFF0C\u5B83\u7684\u540C\u4E00\u4E2A\u6210\u5458\u53D8\u91CF\u5373\uFF1ACalendar\u503C\u7684\u60C5\u51B5\u3002</p><p>\u8FD9\u6837\u53EF\u80FD\u4F1A\u51FA\u73B0\uFF0C\u67D0\u4E2A\u7EBF\u7A0B\u8BBE\u7F6E\u597D\u4E86\u65F6\u95F4\uFF0C\u53C8\u88AB\u5176\u4ED6\u7684\u7EBF\u7A0B\u4FEE\u6539\u4E86\uFF0C\u4ECE\u800C\u51FA\u73B0\u65F6\u95F4\u9519\u8BEF\u7684\u60C5\u51B5\u3002</p><p>\u90A3\u4E48\uFF0C\u5982\u4F55\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u5462\uFF1F</p><ol><li>SimpleDateFormat\u7C7B\u7684\u5BF9\u8C61\u4E0D\u8981\u5B9A\u4E49\u6210\u9759\u6001\u7684\uFF0C\u53EF\u4EE5\u6539\u6210\u65B9\u6CD5\u7684\u5C40\u90E8\u53D8\u91CF\u3002</li><li>\u4F7F\u7528ThreadLocal\u4FDD\u5B58SimpleDateFormat\u7C7B\u7684\u6570\u636E\u3002</li><li>\u4F7F\u7528java8\u7684DateTimeFormatter\u7C7B\u3002</li></ol><h2 id="_29-\u5C11\u7528executors\u521B\u5EFA\u7EBF\u7A0B\u6C60" tabindex="-1"><a class="header-anchor" href="#_29-\u5C11\u7528executors\u521B\u5EFA\u7EBF\u7A0B\u6C60" aria-hidden="true">#</a> 29.\u5C11\u7528Executors\u521B\u5EFA\u7EBF\u7A0B\u6C60</h2><p>\u6211\u4EEC\u90FD\u77E5\u9053<code>JDK5</code>\u4E4B\u540E\uFF0C\u63D0\u4F9B\u4E86<code>ThreadPoolExecutor</code>\u7C7B\uFF0C\u7528\u5B83\u53EF\u4EE5<code>\u81EA\u5B9A\u4E49\u7EBF\u7A0B\u6C60</code>\u3002</p><p>\u7EBF\u7A0B\u6C60\u7684\u597D\u5904\u6709\u5F88\u591A\uFF0C\u4E0B\u9762\u4E3B\u8981\u8BF4\u8BF4\u8FD93\u4E2A\u65B9\u9762\u3002</p><ol><li><code>\u964D\u4F4E\u8D44\u6E90\u6D88\u8017</code>\uFF1A\u907F\u514D\u4E86\u9891\u7E41\u7684\u521B\u5EFA\u7EBF\u7A0B\u548C\u9500\u6BC1\u7EBF\u7A0B\uFF0C\u53EF\u4EE5\u76F4\u63A5\u590D\u7528\u5DF2\u6709\u7EBF\u7A0B\u3002\u800C\u6211\u4EEC\u90FD\u77E5\u9053\uFF0C\u521B\u5EFA\u7EBF\u7A0B\u662F\u975E\u5E38\u8017\u65F6\u7684\u64CD\u4F5C\u3002</li><li><code>\u63D0\u4F9B\u901F\u5EA6</code>\uFF1A\u4EFB\u52A1\u8FC7\u6765\u4E4B\u540E\uFF0C\u56E0\u4E3A\u7EBF\u7A0B\u5DF2\u5B58\u5728\uFF0C\u53EF\u4EE5\u62FF\u6765\u76F4\u63A5\u4F7F\u7528\u3002</li><li><code>\u63D0\u9AD8\u7EBF\u7A0B\u7684\u53EF\u7BA1\u7406\u6027</code>\uFF1A\u7EBF\u7A0B\u662F\u975E\u5E38\u5B9D\u8D35\u7684\u8D44\u6E90\uFF0C\u5982\u679C\u521B\u5EFA\u8FC7\u591A\u7684\u7EBF\u7A0B\uFF0C\u4E0D\u4EC5\u4F1A\u6D88\u8017\u7CFB\u7EDF\u8D44\u6E90\uFF0C\u751A\u81F3\u4F1A\u5F71\u54CD\u7CFB\u7EDF\u7684\u7A33\u5B9A\u3002\u4F7F\u7528\u7EBF\u7A0B\u6C60\uFF0C\u53EF\u4EE5\u975E\u5E38\u65B9\u4FBF\u7684\u521B\u5EFA\u3001\u7BA1\u7406\u548C\u76D1\u63A7\u7EBF\u7A0B\u3002</li></ol><p>\u5F53\u7136JDK\u4E3A\u4E86\u6211\u4EEC\u4F7F\u7528\u66F4\u4FBF\u6377\uFF0C\u4E13\u95E8\u63D0\u4F9B\u4E86\uFF1A<code>Executors</code>\u7C7B\uFF0C\u7ED9\u6211\u4EEC\u5FEB\u901F\u521B\u5EFA<code>\u7EBF\u7A0B\u6C60</code>\u3002</p><p>\u8BE5\u7C7B\u4E2D\u5305\u542B\u4E86\u5F88\u591A<code>\u9759\u6001\u65B9\u6CD5</code>\uFF1A</p><ul><li><code>newCachedThreadPool</code>\uFF1A\u521B\u5EFA\u4E00\u4E2A\u53EF\u7F13\u51B2\u7684\u7EBF\u7A0B\uFF0C\u5982\u679C\u7EBF\u7A0B\u6C60\u5927\u5C0F\u8D85\u8FC7\u5904\u7406\u9700\u8981\uFF0C\u53EF\u7075\u6D3B\u56DE\u6536\u7A7A\u95F2\u7EBF\u7A0B\uFF0C\u82E5\u65E0\u53EF\u56DE\u6536\uFF0C\u5219\u65B0\u5EFA\u7EBF\u7A0B\u3002</li><li><code>newFixedThreadPool</code>\uFF1A\u521B\u5EFA\u4E00\u4E2A\u56FA\u5B9A\u5927\u5C0F\u7684\u7EBF\u7A0B\u6C60\uFF0C\u5982\u679C\u4EFB\u52A1\u6570\u91CF\u8D85\u8FC7\u7EBF\u7A0B\u6C60\u5927\u5C0F\uFF0C\u5219\u5C06\u591A\u4F59\u7684\u4EFB\u52A1\u653E\u5230\u961F\u5217\u4E2D\u3002</li><li><code>newScheduledThreadPool</code>\uFF1A\u521B\u5EFA\u4E00\u4E2A\u56FA\u5B9A\u5927\u5C0F\uFF0C\u5E76\u4E14\u80FD\u6267\u884C\u5B9A\u65F6\u5468\u671F\u4EFB\u52A1\u7684\u7EBF\u7A0B\u6C60\u3002</li><li><code>newSingleThreadExecutor</code>\uFF1A\u521B\u5EFA\u53EA\u6709\u4E00\u4E2A\u7EBF\u7A0B\u7684\u7EBF\u7A0B\u6C60\uFF0C\u4FDD\u8BC1\u6240\u6709\u7684\u4EFB\u52A1\u5B89\u88C5\u987A\u5E8F\u6267\u884C\u3002</li></ul><p>\u5728\u9AD8\u5E76\u53D1\u7684\u573A\u666F\u4E0B\uFF0C\u5982\u679C\u5927\u5BB6\u4F7F\u7528\u8FD9\u4E9B\u9759\u6001\u65B9\u6CD5\u521B\u5EFA\u7EBF\u7A0B\u6C60\uFF0C\u4F1A\u6709\u4E00\u4E9B\u95EE\u9898\u3002</p><p>\u90A3\u4E48\uFF0C\u6211\u4EEC\u4E00\u8D77\u770B\u770B\u6709\u54EA\u4E9B\u95EE\u9898\uFF1F</p><ul><li><code>newFixedThreadPool</code>\uFF1A\u5141\u8BB8\u8BF7\u6C42\u7684\u961F\u5217\u957F\u5EA6\u662FInteger.MAX_VALUE\uFF0C\u53EF\u80FD\u4F1A\u5806\u79EF\u5927\u91CF\u7684\u8BF7\u6C42\uFF0C\u4ECE\u800C\u5BFC\u81F4OOM\u3002</li><li><code>newSingleThreadExecutor</code>\uFF1A\u5141\u8BB8\u8BF7\u6C42\u7684\u961F\u5217\u957F\u5EA6\u662FInteger.MAX_VALUE\uFF0C\u53EF\u80FD\u4F1A\u5806\u79EF\u5927\u91CF\u7684\u8BF7\u6C42\uFF0C\u4ECE\u800C\u5BFC\u81F4OOM\u3002</li><li><code>newCachedThreadPool</code>\uFF1A\u5141\u8BB8\u521B\u5EFA\u7684\u7EBF\u7A0B\u6570\u662FInteger.MAX_VALUE\uFF0C\u53EF\u80FD\u4F1A\u521B\u5EFA\u5927\u91CF\u7684\u7EBF\u7A0B\uFF0C\u4ECE\u800C\u5BFC\u81F4OOM\u3002</li></ul><p>\u90A3\u6211\u4EEC\u8BE5\u600E\u529E\u5462\uFF1F</p><p>\u4F18\u5148\u63A8\u8350\u4F7F\u7528<code>ThreadPoolExecutor</code>\u7C7B\uFF0C\u6211\u4EEC\u81EA\u5B9A\u4E49\u7EBF\u7A0B\u6C60\u3002</p><p>\u5177\u4F53\u4EE3\u7801\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ExecutorService threadPool = new ThreadPoolExecutor(
    8, //corePoolSize\u7EBF\u7A0B\u6C60\u4E2D\u6838\u5FC3\u7EBF\u7A0B\u6570
    10, //maximumPoolSize \u7EBF\u7A0B\u6C60\u4E2D\u6700\u5927\u7EBF\u7A0B\u6570
    60, //\u7EBF\u7A0B\u6C60\u4E2D\u7EBF\u7A0B\u7684\u6700\u5927\u7A7A\u95F2\u65F6\u95F4\uFF0C\u8D85\u8FC7\u8FD9\u4E2A\u65F6\u95F4\u7A7A\u95F2\u7EBF\u7A0B\u5C06\u88AB\u56DE\u6536
    TimeUnit.SECONDS,//\u65F6\u95F4\u5355\u4F4D
    new ArrayBlockingQueue(500), //\u961F\u5217
    new ThreadPoolExecutor.CallerRunsPolicy()); //\u62D2\u7EDD\u7B56\u7565
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u987A\u4FBF\u8BF4\u4E00\u4E0B\uFF0C\u5982\u679C\u662F\u4E00\u4E9B\u4F4E\u5E76\u53D1\u573A\u666F\uFF0C\u4F7F\u7528<code>Executors</code>\u7C7B\u521B\u5EFA\u7EBF\u7A0B\u6C60\u4E5F\u672A\u5C1D\u4E0D\u53EF\uFF0C\u4E5F\u4E0D\u80FD\u5B8C\u5168\u4E00\u68CD\u5B50\u6253\u6B7B\u3002\u5728\u8FD9\u4E9B\u4F4E\u5E76\u53D1\u573A\u666F\u4E0B\uFF0C\u5F88\u96BE\u51FA\u73B0<code>OOM</code>\u95EE\u9898\uFF0C\u6240\u4EE5\u6211\u4EEC\u9700\u8981\u6839\u636E\u5B9E\u9645\u4E1A\u52A1\u573A\u666F\u9009\u62E9\u3002</p><h2 id="_30-arrays-aslist\u8F6C\u6362\u7684\u96C6\u5408\u522B\u4FEE\u6539" tabindex="-1"><a class="header-anchor" href="#_30-arrays-aslist\u8F6C\u6362\u7684\u96C6\u5408\u522B\u4FEE\u6539" aria-hidden="true">#</a> 30.Arrays.asList\u8F6C\u6362\u7684\u96C6\u5408\u522B\u4FEE\u6539</h2><p>\u5728\u6211\u4EEC\u65E5\u5E38\u5DE5\u4F5C\u4E2D\uFF0C\u7ECF\u5E38\u9700\u8981\u628A<code>\u6570\u7EC4</code>\u8F6C\u6362\u6210<code>List</code>\u96C6\u5408\u3002</p><p>\u56E0\u4E3A\u6570\u7EC4\u7684\u957F\u5EA6\u662F\u56FA\u5B9A\u7684\uFF0C\u4E0D\u592A\u597D\u6269\u5BB9\uFF0C\u800CList\u7684\u957F\u5EA6\u662F\u53EF\u53D8\u7684\uFF0C\u5B83\u7684\u957F\u5EA6\u4F1A\u6839\u636E\u5143\u7D20\u7684\u6570\u91CF\u52A8\u6001\u6269\u5BB9\u3002</p><p>\u5728JDK\u7684<code>Arrays</code>\u7C7B\u4E2D\u63D0\u4F9B\u4E86<code>asList</code>\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u628A<code>\u6570\u7EC4</code>\u8F6C\u6362\u6210<code>List</code>\u3002</p><p><code>\u6B63\u4F8B</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String [] array = new String [] {&quot;a&quot;,&quot;b&quot;,&quot;c&quot;};
List&lt;String&gt; list = Arrays.asList(array);
for (String str : list) {
    System.out.println(str);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u8FD9\u4E2A\u4F8B\u5B50\u4E2D\uFF0C\u4F7F\u7528Arrays.asList\u65B9\u6CD5\u5C06array\u6570\u7EC4\uFF0C\u76F4\u63A5\u8F6C\u6362\u6210\u4E86list\u3002\u7136\u540E\u5728for\u5FAA\u73AF\u4E2D\u904D\u5386list\uFF0C\u6253\u5370\u51FA\u5B83\u91CC\u9762\u7684\u5143\u7D20\u3002</p><p>\u5982\u679C\u8F6C\u6362\u540E\u7684list\uFF0C\u53EA\u662F\u4F7F\u7528\uFF0C\u6CA1\u65B0\u589E\u6216\u4FEE\u6539\u5143\u7D20\uFF0C\u4E0D\u4F1A\u6709\u95EE\u9898\u3002</p><p><code>\u53CD\u4F8B</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>String[] array = new String[]{&quot;a&quot;, &quot;b&quot;, &quot;c&quot;};
List&lt;String&gt; list = Arrays.asList(array);
list.add(&quot;d&quot;);
for (String str : list) {
    System.out.println(str);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6267\u884C\u7ED3\u679C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Exception in thread &quot;main&quot; java.lang.UnsupportedOperationException
at java.util.AbstractList.add(AbstractList.java:148)
at java.util.AbstractList.add(AbstractList.java:108)
at com.sue.jump.service.test1.Test2.main(Test2.java:24)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F1A\u76F4\u63A5\u62A5<code>UnsupportedOperationException</code>\u5F02\u5E38\u3002</p><p>\u4E3A\u4EC0\u4E48\u5462\uFF1F</p><p>\u7B54\uFF1A\u4F7F\u7528<code>Arrays.asList</code>\u65B9\u6CD5\u8F6C\u6362\u540E\u7684<code>ArrayList</code>\uFF0C\u662F<code>Arrays</code>\u7C7B\u7684\u5185\u90E8\u7C7B\uFF0C\u5E76\u975E<code>java.util</code>\u5305\u4E0B\u6211\u4EEC\u5E38\u7528\u7684<code>ArrayList</code>\u3002</p><p>Arrays\u7C7B\u7684\u5185\u90E8ArrayList\u7C7B\uFF0C\u5B83\u6CA1\u6709\u5B9E\u73B0\u7236\u7C7B\u7684add\u548Cremove\u65B9\u6CD5,\u7528\u7684\u662F\u7236\u7C7BAbstractList\u7684\u9ED8\u8BA4\u5B9E\u73B0\u3002</p><p>\u6211\u4EEC\u770B\u770B<code>AbstractList</code>\u662F\u5982\u4F55\u5B9E\u73B0\u7684\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public void add(int index, E element) {
   throw new UnsupportedOperationException();
}

public E remove(int index) {
   throw new UnsupportedOperationException();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BE5\u7C7B\u7684<code>add</code>\u548C<code>remove</code>\u65B9\u6CD5\u76F4\u63A5\u629B\u5F02\u5E38\u4E86\uFF0C\u56E0\u6B64\u8C03\u7528Arrays\u7C7B\u7684\u5185\u90E8ArrayList\u7C7B\u7684add\u548Cremove\u65B9\u6CD5\uFF0C\u540C\u6837\u4F1A\u629B\u5F02\u5E38\u3002</p><p>\u8BF4\u5B9E\u8BDD\uFF0CJava\u4EE3\u7801\u4F18\u5316\u662F\u4E00\u4E2A\u6BD4\u8F83\u5927\u7684\u8BDD\u9898\uFF0C\u5B83\u91CC\u9762\u53EF\u4EE5\u4F18\u5316\u7684\u70B9\u975E\u5E38\u591A\uFF0C\u6211\u6CA1\u529E\u6CD5\u4E00\u4E00\u5217\u4E3E\u5B8C\u3002\u5728\u8FD9\u91CC\u53EA\u80FD\u629B\u7816\u5F15\u7389\uFF0C\u4ECB\u7ECD\u4E00\u4E0B\u6BD4\u8F83\u5E38\u89C1\u7684\u77E5\u8BC6\u70B9\uFF0C\u66F4\u5168\u9762\u7684\u5185\u5BB9\uFF0C\u9700\u8981\u5C0F\u4F19\u4F34\u4EEC\u81EA\u5DF1\u53BB\u601D\u8003\u548C\u63A2\u7D22\u3002</p><p>\u8FD9\u7BC7\u6587\u7AE0\u5199\u4E86\u5F88\u4E45\uFF0C\u82B1\u4E86\u5F88\u591A\u65F6\u95F4\u548C\u5FC3\u601D\uFF0C\u5982\u679C\u4F60\u770B\u4E86\u6587\u7AE0\u6709\u4E9B\u6536\u83B7\uFF0C\u8BB0\u5F97\u7ED9\u6211\u70B9\u8D5E\u9F13\u52B1\u4E00\u4E0B\u5594\u3002</p><hr><p>\u6CA1\u6709\u4EC0\u4E48\u4F7F\u6211\u505C\u7559\u2014\u2014\u9664\u4E86\u76EE\u7684\uFF0C\u7EB5\u7136\u5CB8\u65C1\u6709\u73AB\u7470\u3001\u6709\u7EFF\u836B\u3001\u6709\u5B81\u9759\u7684\u6E2F\u6E7E\uFF0C\u6211\u662F\u4E0D\u7CFB\u4E4B\u821F\u3002</p><p><strong>\u63A8\u8350\u9605\u8BFB</strong>\uFF1A</p>`,183),U={href:"https://mp.weixin.qq.com/s/2IUe50xBhuEWKDzARVd51A",target:"_blank",rel:"noopener noreferrer"},F=i("\u65B0\u4E00\u4EE3\u5F00\u6E90\u514D\u8D39\u7684\u7EC8\u7AEF\u5DE5\u5177\uFF0C\u592A\u9177\u4E86"),k={href:"https://mp.weixin.qq.com/s/3lqp4x1B5LI1hNjWAi6v1g",target:"_blank",rel:"noopener noreferrer"},O=i("\u6700\u5927\u6210\u5C31\uFF0C\u62FF\u5230\u4E00\u7B49\u5956\u5B66\u91D1"),R={href:"https://mp.weixin.qq.com/s/ZeA-mEyMkEeSHRtd8Pob9A",target:"_blank",rel:"noopener noreferrer"},N=i("\u94F6\u884C\u5F00\u53D1\u592A\u5B89\u9038\uFF0C\u594B\u53D1\u56FE\u5F3A\u8981\u8DF3\u69FD"),M={href:"https://mp.weixin.qq.com/s/fNMhpER0tp5RO5TGcgALMQ",target:"_blank",rel:"noopener noreferrer"},B=i("\u8FD9\u4E2A\u5927\u4E13\u751F\uFF0C\u5F3A\u7684\u79BB\u8C31\uFF01"),z={href:"https://mp.weixin.qq.com/s/IEEkWiI9iN4MEhoHvrTgcg",target:"_blank",rel:"noopener noreferrer"},J=i("\u4E00\u6012\u4E4B\u4E0B\uFF0C\u9000\u4F0D\u8F6C\u7801"),H={href:"https://mp.weixin.qq.com/s/KxUMq2YmlIBMbAeRwUm8JA",target:"_blank",rel:"noopener noreferrer"},G=i("\u6CA1\u5FC5\u8981\u4E3A\u5B9E\u4E60\u78B0\u7684\u5934\u7834\u8840\u6D41"),Q={href:"https://mp.weixin.qq.com/s/PxgZkuA_SnAgG7xfwlKLgw",target:"_blank",rel:"noopener noreferrer"},K=i("\u7F51\u7AD9\u6323\u4E86 200 \u7F8E\u5200\u540E\u7684\u611F\u89E6"),W={href:"https://mp.weixin.qq.com/s/R13FkPipfEMKjqNaCL3UoA",target:"_blank",rel:"noopener noreferrer"},V=i("\u5728 IDEA \u91CC\u4E0B\u4E94\u5B50\u68CB\u4E0D\u8FC7\u5206\u5427\uFF1F"),Y=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-quanxxtjgzysjyyds-33afdc45-d78b-46e0-91c2-1107161496e9.jpg",alt:""})],-1),Z=i("\u8F6C\u8F7D\u94FE\u63A5\uFF1A"),X={href:"https://mp.weixin.qq.com/s/tw4lD0XA67yJKAwIWVicIQ",target:"_blank",rel:"noopener noreferrer"},$=i("https://mp.weixin.qq.com/s/tw4lD0XA67yJKAwIWVicIQ"),ee=i("\uFF0C\u51FA\u5904\uFF1Amacrozheng\uFF0C\u6574\u7406\uFF1A\u6C89\u9ED8\u738B\u4E8C");function ie(ne,de){const n=a("ExternalLinkIcon");return r(),t("div",null,[e("blockquote",null,[e("p",null,[e("a",v,[u,d(n)]),o,m,p,e("a",b,[g,d(n)]),h])]),x,e("p",null,[q,e("a",f,[S,d(n)]),y]),_,e("p",null,[L,e("a",I,[E,d(n)]),w]),A,e("p",null,[P,e("a",C,[T,d(n)]),D]),j,e("ul",null,[e("li",null,[e("a",U,[F,d(n)])]),e("li",null,[e("a",k,[O,d(n)])]),e("li",null,[e("a",R,[N,d(n)])]),e("li",null,[e("a",M,[B,d(n)])]),e("li",null,[e("a",z,[J,d(n)])]),e("li",null,[e("a",H,[G,d(n)])]),e("li",null,[e("a",Q,[K,d(n)])]),e("li",null,[e("a",W,[V,d(n)])])]),Y,e("blockquote",null,[e("p",null,[Z,e("a",X,[$,d(n)]),ee])])])}var ae=l(c,[["render",ie],["__file","nixgnxmdkddjavadmyhjq.html.vue"]]);export{ae as default};
