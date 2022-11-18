import{_ as r}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as a,a as e,d as n,b as i,e as s,r as d}from"./app.99eb8281.js";const u={},o={href:"https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw",target:"_blank",rel:"noopener noreferrer"},c=e("strong",null,"370 多名",-1),v=e("br",null,null,-1),b=e("br",null,null,-1),m={href:"https://tobebetterjavaer.com",target:"_blank",rel:"noopener noreferrer"},h={href:"https://sourl.cn/dRpJ6b",target:"_blank",rel:"noopener noreferrer"},p=s(`<p>大家好，我是二哥，开发中经常有些小细节容易忽略，这些小细节往往容易导致代码缺陷，今天分享一波工具类的小细节</p><p>也许你两个都不知道,也许你除了<code>isEmpty</code>/<code>isNotEmpty</code>/<code>isNotBlank</code>/<code>isBlank</code>外,并不知道还有<code>isAnyEmpty</code>/<code>isNoneEmpty</code>/<code>isAnyBlank</code>/<code>isNoneBlank</code>的存在, come on ,让我们一起来探索<code>org.apache.commons.lang3.StringUtils;</code>这个工具类。</p><h2 id="isempty-系列" tabindex="-1"><a class="header-anchor" href="#isempty-系列" aria-hidden="true">#</a> isEmpty 系列</h2><h3 id="stringutils-isempty" tabindex="-1"><a class="header-anchor" href="#stringutils-isempty" aria-hidden="true">#</a> StringUtils.isEmpty()</h3><p>是否为空. 可以看到 &quot; &quot; 空格是会绕过这种空判断,因为是一个空格,并不是严格的空值,会导致 <code>isEmpty(&quot; &quot;)=false</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>StringUtils.isEmpty(null) = true
StringUtils.isEmpty(&quot;&quot;) = true
StringUtils.isEmpty(&quot; &quot;) = false
StringUtils.isEmpty(&quot;bob&quot;) = false
StringUtils.isEmpty(&quot; bob &quot;) = false
/**
 *
 * &lt;p&gt;NOTE: This method changed in Lang version 2.0.
 * It no longer trims the CharSequence.
 * That functionality is available in isBlank().&lt;/p&gt;
 *
 * @param cs  the CharSequence to check, may be null
 * @return {@code true} if the CharSequence is empty or null
 * @since 3.0 Changed signature from isEmpty(String) to isEmpty(CharSequence)
 */
public static boolean isEmpty(final CharSequence cs) {
    return cs == null || cs.length() == 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isnotempty" tabindex="-1"><a class="header-anchor" href="#stringutils-isnotempty" aria-hidden="true">#</a> StringUtils.isNotEmpty()</h3><p>相当于不为空 , <code>= !isEmpty()</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static boolean isNotEmpty(final CharSequence cs) {
        return !isEmpty(cs);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isanyempty" tabindex="-1"><a class="header-anchor" href="#stringutils-isanyempty" aria-hidden="true">#</a> StringUtils.isAnyEmpty()</h3><p>是否有一个为空,只有一个为空,就为 true。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>StringUtils.isAnyEmpty(null) = true
StringUtils.isAnyEmpty(null, &quot;foo&quot;) = true
StringUtils.isAnyEmpty(&quot;&quot;, &quot;bar&quot;) = true
StringUtils.isAnyEmpty(&quot;bob&quot;, &quot;&quot;) = true
StringUtils.isAnyEmpty(&quot; bob &quot;, null) = true
StringUtils.isAnyEmpty(&quot; &quot;, &quot;bar&quot;) = false
StringUtils.isAnyEmpty(&quot;foo&quot;, &quot;bar&quot;) = false
/**
 * @param css  the CharSequences to check, may be null or empty
 * @return {@code true} if any of the CharSequences are empty or null
 * @since 3.2
 */
public static boolean isAnyEmpty(final CharSequence... css) {
  if (ArrayUtils.isEmpty(css)) {
    return true;
  }
  for (final CharSequence cs : css){
    if (isEmpty(cs)) {
      return true;
    }
  }
  return false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isnoneempty" tabindex="-1"><a class="header-anchor" href="#stringutils-isnoneempty" aria-hidden="true">#</a> StringUtils.isNoneEmpty()</h3><p>相当于<code>!isAnyEmpty(css)</code> , 必须所有的值都不为空才返回 true</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * &lt;p&gt;Checks if none of the CharSequences are empty (&quot;&quot;) or null.&lt;/p&gt;
 *
 * &lt;pre&gt;
 * StringUtils.isNoneEmpty(null)             = false
 * StringUtils.isNoneEmpty(null, &quot;foo&quot;)      = false
 * StringUtils.isNoneEmpty(&quot;&quot;, &quot;bar&quot;)        = false
 * StringUtils.isNoneEmpty(&quot;bob&quot;, &quot;&quot;)        = false
 * StringUtils.isNoneEmpty(&quot;  bob  &quot;, null)  = false
 * StringUtils.isNoneEmpty(&quot; &quot;, &quot;bar&quot;)       = true
 * StringUtils.isNoneEmpty(&quot;foo&quot;, &quot;bar&quot;)     = true
 * &lt;/pre&gt;
 *
 * @param css  the CharSequences to check, may be null or empty
 * @return {@code true} if none of the CharSequences are empty or null
 * @since 3.2
 */
public static boolean isNoneEmpty(final CharSequence... css) {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="isbank-系列" tabindex="-1"><a class="header-anchor" href="#isbank-系列" aria-hidden="true">#</a> isBank 系列</h2><h3 id="stringutils-isblank" tabindex="-1"><a class="header-anchor" href="#stringutils-isblank" aria-hidden="true">#</a> StringUtils.isBlank()</h3><p>是否为真空值(空格或者空值)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>StringUtils.isBlank(null) = true
StringUtils.isBlank(&quot;&quot;) = true
StringUtils.isBlank(&quot; &quot;) = true
StringUtils.isBlank(&quot;bob&quot;) = false
StringUtils.isBlank(&quot; bob &quot;) = false
/**
 * &lt;p&gt;Checks if a CharSequence is whitespace, empty (&quot;&quot;) or null.&lt;/p&gt;
 * @param cs  the CharSequence to check, may be null
 * @return {@code true} if the CharSequence is null, empty or whitespace
 * @since 2.0
 * @since 3.0 Changed signature from isBlank(String) to isBlank(CharSequence)
 */
public static boolean isBlank(final CharSequence cs) {
    int strLen;
    if (cs == null || (strLen = cs.length()) == 0) {
        return true;
    }
    for (int i = 0; i &lt; strLen; i++) {
        if (Character.isWhitespace(cs.charAt(i)) == false) {
            return false;
        }
    }
    return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isnotblank" tabindex="-1"><a class="header-anchor" href="#stringutils-isnotblank" aria-hidden="true">#</a> StringUtils.isNotBlank()</h3><p>是否真的不为空,不是空格或者空值 ,相当于<code>!isBlank();</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static boolean isNotBlank(final CharSequence cs) {
        return !isBlank(cs);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isanyblank" tabindex="-1"><a class="header-anchor" href="#stringutils-isanyblank" aria-hidden="true">#</a> StringUtils.isAnyBlank()</h3><p>是否包含任何真空值(包含空格或空值)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>StringUtils.isAnyBlank(null) = true
StringUtils.isAnyBlank(null, &quot;foo&quot;) = true
StringUtils.isAnyBlank(null, null) = true
StringUtils.isAnyBlank(&quot;&quot;, &quot;bar&quot;) = true
StringUtils.isAnyBlank(&quot;bob&quot;, &quot;&quot;) = true
StringUtils.isAnyBlank(&quot; bob &quot;, null) = true
StringUtils.isAnyBlank(&quot; &quot;, &quot;bar&quot;) = true
StringUtils.isAnyBlank(&quot;foo&quot;, &quot;bar&quot;) = false
 /**
 * &lt;p&gt;Checks if any one of the CharSequences are blank (&quot;&quot;) or null and not whitespace only..&lt;/p&gt;
 * @param css  the CharSequences to check, may be null or empty
 * @return {@code true} if any of the CharSequences are blank or null or whitespace only
 * @since 3.2
 */
public static boolean isAnyBlank(final CharSequence... css) {
  if (ArrayUtils.isEmpty(css)) {
    return true;
  }
  for (final CharSequence cs : css){
    if (isBlank(cs)) {
      return true;
    }
  }
  return false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isnoneblank" tabindex="-1"><a class="header-anchor" href="#stringutils-isnoneblank" aria-hidden="true">#</a> StringUtils.isNoneBlank()</h3><p>是否全部都不包含空值或空格</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>StringUtils.isNoneBlank(null) = false
StringUtils.isNoneBlank(null, &quot;foo&quot;) = false
StringUtils.isNoneBlank(null, null) = false
StringUtils.isNoneBlank(&quot;&quot;, &quot;bar&quot;) = false
StringUtils.isNoneBlank(&quot;bob&quot;, &quot;&quot;) = false
StringUtils.isNoneBlank(&quot; bob &quot;, null) = false
StringUtils.isNoneBlank(&quot; &quot;, &quot;bar&quot;) = false
StringUtils.isNoneBlank(&quot;foo&quot;, &quot;bar&quot;) = true
/**
 * &lt;p&gt;Checks if none of the CharSequences are blank (&quot;&quot;) or null and whitespace only..&lt;/p&gt;
 * @param css  the CharSequences to check, may be null or empty
 * @return {@code true} if none of the CharSequences are blank or null or whitespace only
 * @since 3.2
 */
public static boolean isNoneBlank(final CharSequence... css) {
  return !isAnyBlank(css);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="stringutils-的其他方法" tabindex="-1"><a class="header-anchor" href="#stringutils-的其他方法" aria-hidden="true">#</a> StringUtils 的其他方法</h2><p>可以参考官方的文档,里面有详细的描述,有些方法还是很好用的。</p>`,30),g={href:"https://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/StringUtils.html",target:"_blank",rel:"noopener noreferrer"},f=s('<table><thead><tr><th>方法名</th><th>英文解释</th><th>中文解释</th></tr></thead><tbody><tr><td>IsEmpty/IsBlank</td><td>checks if a String contains text</td><td>检查字符串是否包含文本</td></tr><tr><td>Trim/Strip</td><td>removes leading and trailing whitespace</td><td>删除前导和尾随空格</td></tr><tr><td>Equals/Compare</td><td>compares two strings null-safe</td><td>比较两个字符串是否为 null 安全的</td></tr><tr><td>startsWith</td><td>check if a String starts with a prefix null-safe</td><td>检查字符串是否以前缀 null 安全开头</td></tr><tr><td>endsWith</td><td>check if a String ends with a suffix null-safe</td><td>检查字符串是否以后缀 null 安全结尾</td></tr><tr><td>IndexOf/LastIndexOf/Contains</td><td>null-safe index-of checks</td><td>包含空安全索引检查</td></tr><tr><td>IndexOfAny/LastIndexOfAny/IndexOfAnyBut/LastIndexOfAnyBut</td><td>index-of any of a set of Strings</td><td>任意一组字符串的索引</td></tr><tr><td>ContainsOnly/ContainsNone/ContainsAny</td><td>does String contains only/none/any of these characters</td><td>字符串是否仅包含/无/这些字符中的任何一个</td></tr><tr><td>Substring/Left/Right/Mid</td><td>null-safe substring extractions</td><td>字符串安全提取</td></tr><tr><td>SubstringBefore/SubstringAfter/SubstringBetween</td><td>substring extraction relative to other strings -相对其他字符串的字符串提取</td><td></td></tr><tr><td>Split/Join</td><td>splits a String into an array of substrings and vice versa</td><td>将字符串拆分为子字符串数组，反之亦然</td></tr><tr><td>Remove/Delete</td><td>removes part of a String -删除字符串的一部分</td><td></td></tr><tr><td>Replace/Overlay</td><td>Searches a String and replaces one String with another</td><td>搜索字符串，然后用另一个字符串替换</td></tr><tr><td>Chomp/Chop</td><td>removes the last part of a String</td><td>删除字符串的最后一部分</td></tr><tr><td>AppendIfMissing</td><td>appends a suffix to the end of the String if not present</td><td>如果不存在后缀，则在字符串的末尾附加一个后缀</td></tr><tr><td>PrependIfMissing</td><td>prepends a prefix to the start of the String if not present</td><td>如果不存在前缀，则在字符串的开头添加前缀</td></tr><tr><td>LeftPad/RightPad/Center/Repeat</td><td>pads a String</td><td>填充字符串</td></tr><tr><td>UpperCase/LowerCase/SwapCase/Capitalize/Uncapitalize</td><td>changes the case of a String</td><td>更改字符串的大小写</td></tr><tr><td>CountMatches</td><td>counts the number of occurrences of one String in another</td><td>计算一个字符串在另一个字符串中出现的次数</td></tr><tr><td>IsAlpha/IsNumeric/IsWhitespace/IsAsciiPrintable</td><td>checks the characters in a String</td><td>检查字符串中的字符</td></tr><tr><td>DefaultString</td><td>protects against a null input String</td><td>防止输入字符串为空</td></tr><tr><td>Rotate</td><td>rotate (circular shift) a String</td><td>旋转（循环移位）字符串</td></tr><tr><td>Reverse/ReverseDelimited</td><td>reverses a String -反转字符串</td><td></td></tr><tr><td>Abbreviate</td><td>abbreviates a string using ellipsis or another given String</td><td>使用省略号或另一个给定的 String 缩写一个字符串</td></tr><tr><td>Difference</td><td>compares Strings and reports on their differences</td><td>比较字符串并报告其差异</td></tr><tr><td>LevenshteinDistance</td><td>the number of changes needed to change one String into another</td><td>将一个 String 转换为另一个 String 所需的更改次数</td></tr></tbody></table><h2 id="程序汪资料链接" tabindex="-1"><a class="header-anchor" href="#程序汪资料链接" aria-hidden="true">#</a> 程序汪资料链接</h2>',2),q={href:"https://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247504624&idx=1&sn=c47e5413aa4914c7301970e0d217bc88&chksm=903bd69da74c5f8b4d4dc6683b4e34b2750278df3dcb9d13b129e80bad9a435b3d98e4ad3fe6#rd",target:"_blank",rel:"noopener noreferrer"};function y(S,k){const t=d("ExternalLinkIcon");return l(),a("div",null,[e("blockquote",null,[e("p",null,[e("a",o,[n("二哥编程知识星球"),i(t)]),n(" （戳链接加入）正式上线了，来和 "),c,n(" 小伙伴一起打怪升级吧！这是一个 Java 学习指南 + 编程实战的私密圈子，你可以向二哥提问、帮你制定学习计划、跟着二哥一起做实战项目，冲冲冲。"),v,b,n(" Java程序员进阶之路网址："),e("a",m,[n("https://tobebetterjavaer.com"),i(t)])])]),e("blockquote",null,[e("p",null,[n("文章来源："),e("a",h,[n("https://sourl.cn/dRpJ6b"),i(t)])])]),p,e("blockquote",null,[e("p",null,[e("a",g,[n("https://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/StringUtils.html"),i(t)])])]),f,e("blockquote",null,[e("p",null,[n("转载链接："),e("a",q,[n("https://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247504624&idx=1&sn=c47e5413aa4914c7301970e0d217bc88&chksm=903bd69da74c5f8b4d4dc6683b4e34b2750278df3dcb9d13b129e80bad9a435b3d98e4ad3fe6#rd"),i(t)]),n("，出处：我是程序汪，整理：沉默王二")])])])}const C=r(u,[["render",y],["__file","isemptyhisblankdyfobzsybdrdfsl.html.vue"]]);export{C as default};
