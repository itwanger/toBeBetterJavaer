import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";import{r as l,o as r,c as d,a as e,b as i,d as n,e as a}from"./app.610296d2.js";const u={},o={href:"https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw",target:"_blank",rel:"noopener noreferrer"},c=n("\u4E8C\u54E5\u7F16\u7A0B\u77E5\u8BC6\u661F\u7403"),v=n(" \uFF08\u6233\u94FE\u63A5\u52A0\u5165\uFF09\u6B63\u5F0F\u4E0A\u7EBF\u4E86\uFF0C\u6765\u548C "),b=e("strong",null,"370 \u591A\u540D",-1),m=n(" \u5C0F\u4F19\u4F34\u4E00\u8D77\u6253\u602A\u5347\u7EA7\u5427\uFF01\u8FD9\u662F\u4E00\u4E2A Java \u5B66\u4E60\u6307\u5357 + \u7F16\u7A0B\u5B9E\u6218\u7684\u79C1\u5BC6\u5708\u5B50\uFF0C\u4F60\u53EF\u4EE5\u5411\u4E8C\u54E5\u63D0\u95EE\u3001\u5E2E\u4F60\u5236\u5B9A\u5B66\u4E60\u8BA1\u5212\u3001\u8DDF\u7740\u4E8C\u54E5\u4E00\u8D77\u505A\u5B9E\u6218\u9879\u76EE\uFF0C\u51B2\u51B2\u51B2\u3002"),h=e("br",null,null,-1),p=e("br",null,null,-1),g=n(" Java\u7A0B\u5E8F\u5458\u8FDB\u9636\u4E4B\u8DEF\u7F51\u5740\uFF1A"),f={href:"https://tobebetterjavaer.com",target:"_blank",rel:"noopener noreferrer"},q=n("https://tobebetterjavaer.com"),y=a(`<blockquote><p>\u6587\u7AE0\u6765\u6E90\uFF1Ahttps://sourl.cn/dRpJ6b</p></blockquote><p>\u5927\u5BB6\u597D\uFF0C\u6211\u662F\u4E8C\u54E5\uFF0C\u5F00\u53D1\u4E2D\u7ECF\u5E38\u6709\u4E9B\u5C0F\u7EC6\u8282\u5BB9\u6613\u5FFD\u7565\uFF0C\u8FD9\u4E9B\u5C0F\u7EC6\u8282\u5F80\u5F80\u5BB9\u6613\u5BFC\u81F4\u4EE3\u7801\u7F3A\u9677\uFF0C\u4ECA\u5929\u5206\u4EAB\u4E00\u6CE2\u5DE5\u5177\u7C7B\u7684\u5C0F\u7EC6\u8282</p><p>\u4E5F\u8BB8\u4F60\u4E24\u4E2A\u90FD\u4E0D\u77E5\u9053,\u4E5F\u8BB8\u4F60\u9664\u4E86<code>isEmpty</code>/<code>isNotEmpty</code>/<code>isNotBlank</code>/<code>isBlank</code>\u5916,\u5E76\u4E0D\u77E5\u9053\u8FD8\u6709<code>isAnyEmpty</code>/<code>isNoneEmpty</code>/<code>isAnyBlank</code>/<code>isNoneBlank</code>\u7684\u5B58\u5728, come on ,\u8BA9\u6211\u4EEC\u4E00\u8D77\u6765\u63A2\u7D22<code>org.apache.commons.lang3.StringUtils;</code>\u8FD9\u4E2A\u5DE5\u5177\u7C7B\u3002</p><h2 id="isempty-\u7CFB\u5217" tabindex="-1"><a class="header-anchor" href="#isempty-\u7CFB\u5217" aria-hidden="true">#</a> isEmpty \u7CFB\u5217</h2><h3 id="stringutils-isempty" tabindex="-1"><a class="header-anchor" href="#stringutils-isempty" aria-hidden="true">#</a> StringUtils.isEmpty()</h3><p>\u662F\u5426\u4E3A\u7A7A. \u53EF\u4EE5\u770B\u5230 &quot; &quot; \u7A7A\u683C\u662F\u4F1A\u7ED5\u8FC7\u8FD9\u79CD\u7A7A\u5224\u65AD,\u56E0\u4E3A\u662F\u4E00\u4E2A\u7A7A\u683C,\u5E76\u4E0D\u662F\u4E25\u683C\u7684\u7A7A\u503C,\u4F1A\u5BFC\u81F4 <code>isEmpty(&quot; &quot;)=false</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>StringUtils.isEmpty(null) = true
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isnotempty" tabindex="-1"><a class="header-anchor" href="#stringutils-isnotempty" aria-hidden="true">#</a> StringUtils.isNotEmpty()</h3><p>\u76F8\u5F53\u4E8E\u4E0D\u4E3A\u7A7A , <code>= !isEmpty()</code>\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public static boolean isNotEmpty(final CharSequence cs) {
        return !isEmpty(cs);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isanyempty" tabindex="-1"><a class="header-anchor" href="#stringutils-isanyempty" aria-hidden="true">#</a> StringUtils.isAnyEmpty()</h3><p>\u662F\u5426\u6709\u4E00\u4E2A\u4E3A\u7A7A,\u53EA\u6709\u4E00\u4E2A\u4E3A\u7A7A,\u5C31\u4E3A true\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>StringUtils.isAnyEmpty(null) = true
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isnoneempty" tabindex="-1"><a class="header-anchor" href="#stringutils-isnoneempty" aria-hidden="true">#</a> StringUtils.isNoneEmpty()</h3><p>\u76F8\u5F53\u4E8E<code>!isAnyEmpty(css)</code> , \u5FC5\u987B\u6240\u6709\u7684\u503C\u90FD\u4E0D\u4E3A\u7A7A\u624D\u8FD4\u56DE true</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/**
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="isbank-\u7CFB\u5217" tabindex="-1"><a class="header-anchor" href="#isbank-\u7CFB\u5217" aria-hidden="true">#</a> isBank \u7CFB\u5217</h2><h3 id="stringutils-isblank" tabindex="-1"><a class="header-anchor" href="#stringutils-isblank" aria-hidden="true">#</a> StringUtils.isBlank()</h3><p>\u662F\u5426\u4E3A\u771F\u7A7A\u503C(\u7A7A\u683C\u6216\u8005\u7A7A\u503C)</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>StringUtils.isBlank(null) = true
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isnotblank" tabindex="-1"><a class="header-anchor" href="#stringutils-isnotblank" aria-hidden="true">#</a> StringUtils.isNotBlank()</h3><p>\u662F\u5426\u771F\u7684\u4E0D\u4E3A\u7A7A,\u4E0D\u662F\u7A7A\u683C\u6216\u8005\u7A7A\u503C ,\u76F8\u5F53\u4E8E<code>!isBlank();</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>public static boolean isNotBlank(final CharSequence cs) {
        return !isBlank(cs);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isanyblank" tabindex="-1"><a class="header-anchor" href="#stringutils-isanyblank" aria-hidden="true">#</a> StringUtils.isAnyBlank()</h3><p>\u662F\u5426\u5305\u542B\u4EFB\u4F55\u771F\u7A7A\u503C(\u5305\u542B\u7A7A\u683C\u6216\u7A7A\u503C)</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>StringUtils.isAnyBlank(null) = true
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils-isnoneblank" tabindex="-1"><a class="header-anchor" href="#stringutils-isnoneblank" aria-hidden="true">#</a> StringUtils.isNoneBlank()</h3><p>\u662F\u5426\u5168\u90E8\u90FD\u4E0D\u5305\u542B\u7A7A\u503C\u6216\u7A7A\u683C</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>StringUtils.isNoneBlank(null) = false
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="stringutils-\u7684\u5176\u4ED6\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#stringutils-\u7684\u5176\u4ED6\u65B9\u6CD5" aria-hidden="true">#</a> StringUtils \u7684\u5176\u4ED6\u65B9\u6CD5</h2><p>\u53EF\u4EE5\u53C2\u8003\u5B98\u65B9\u7684\u6587\u6863,\u91CC\u9762\u6709\u8BE6\u7EC6\u7684\u63CF\u8FF0,\u6709\u4E9B\u65B9\u6CD5\u8FD8\u662F\u5F88\u597D\u7528\u7684\u3002</p><blockquote><p>https://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/StringUtils.html</p></blockquote><table><thead><tr><th>\u65B9\u6CD5\u540D</th><th>\u82F1\u6587\u89E3\u91CA</th><th>\u4E2D\u6587\u89E3\u91CA</th></tr></thead><tbody><tr><td>IsEmpty/IsBlank</td><td>checks if a String contains text</td><td>\u68C0\u67E5\u5B57\u7B26\u4E32\u662F\u5426\u5305\u542B\u6587\u672C</td></tr><tr><td>Trim/Strip</td><td>removes leading and trailing whitespace</td><td>\u5220\u9664\u524D\u5BFC\u548C\u5C3E\u968F\u7A7A\u683C</td></tr><tr><td>Equals/Compare</td><td>compares two strings null-safe</td><td>\u6BD4\u8F83\u4E24\u4E2A\u5B57\u7B26\u4E32\u662F\u5426\u4E3A null \u5B89\u5168\u7684</td></tr><tr><td>startsWith</td><td>check if a String starts with a prefix null-safe</td><td>\u68C0\u67E5\u5B57\u7B26\u4E32\u662F\u5426\u4EE5\u524D\u7F00 null \u5B89\u5168\u5F00\u5934</td></tr><tr><td>endsWith</td><td>check if a String ends with a suffix null-safe</td><td>\u68C0\u67E5\u5B57\u7B26\u4E32\u662F\u5426\u4EE5\u540E\u7F00 null \u5B89\u5168\u7ED3\u5C3E</td></tr><tr><td>IndexOf/LastIndexOf/Contains</td><td>null-safe index-of checks</td><td>\u5305\u542B\u7A7A\u5B89\u5168\u7D22\u5F15\u68C0\u67E5</td></tr><tr><td>IndexOfAny/LastIndexOfAny/IndexOfAnyBut/LastIndexOfAnyBut</td><td>index-of any of a set of Strings</td><td>\u4EFB\u610F\u4E00\u7EC4\u5B57\u7B26\u4E32\u7684\u7D22\u5F15</td></tr><tr><td>ContainsOnly/ContainsNone/ContainsAny</td><td>does String contains only/none/any of these characters</td><td>\u5B57\u7B26\u4E32\u662F\u5426\u4EC5\u5305\u542B/\u65E0/\u8FD9\u4E9B\u5B57\u7B26\u4E2D\u7684\u4EFB\u4F55\u4E00\u4E2A</td></tr><tr><td>Substring/Left/Right/Mid</td><td>null-safe substring extractions</td><td>\u5B57\u7B26\u4E32\u5B89\u5168\u63D0\u53D6</td></tr><tr><td>SubstringBefore/SubstringAfter/SubstringBetween</td><td>substring extraction relative to other strings -\u76F8\u5BF9\u5176\u4ED6\u5B57\u7B26\u4E32\u7684\u5B57\u7B26\u4E32\u63D0\u53D6</td><td></td></tr><tr><td>Split/Join</td><td>splits a String into an array of substrings and vice versa</td><td>\u5C06\u5B57\u7B26\u4E32\u62C6\u5206\u4E3A\u5B50\u5B57\u7B26\u4E32\u6570\u7EC4\uFF0C\u53CD\u4E4B\u4EA6\u7136</td></tr><tr><td>Remove/Delete</td><td>removes part of a String -\u5220\u9664\u5B57\u7B26\u4E32\u7684\u4E00\u90E8\u5206</td><td></td></tr><tr><td>Replace/Overlay</td><td>Searches a String and replaces one String with another</td><td>\u641C\u7D22\u5B57\u7B26\u4E32\uFF0C\u7136\u540E\u7528\u53E6\u4E00\u4E2A\u5B57\u7B26\u4E32\u66FF\u6362</td></tr><tr><td>Chomp/Chop</td><td>removes the last part of a String</td><td>\u5220\u9664\u5B57\u7B26\u4E32\u7684\u6700\u540E\u4E00\u90E8\u5206</td></tr><tr><td>AppendIfMissing</td><td>appends a suffix to the end of the String if not present</td><td>\u5982\u679C\u4E0D\u5B58\u5728\u540E\u7F00\uFF0C\u5219\u5728\u5B57\u7B26\u4E32\u7684\u672B\u5C3E\u9644\u52A0\u4E00\u4E2A\u540E\u7F00</td></tr><tr><td>PrependIfMissing</td><td>prepends a prefix to the start of the String if not present</td><td>\u5982\u679C\u4E0D\u5B58\u5728\u524D\u7F00\uFF0C\u5219\u5728\u5B57\u7B26\u4E32\u7684\u5F00\u5934\u6DFB\u52A0\u524D\u7F00</td></tr><tr><td>LeftPad/RightPad/Center/Repeat</td><td>pads a String</td><td>\u586B\u5145\u5B57\u7B26\u4E32</td></tr><tr><td>UpperCase/LowerCase/SwapCase/Capitalize/Uncapitalize</td><td>changes the case of a String</td><td>\u66F4\u6539\u5B57\u7B26\u4E32\u7684\u5927\u5C0F\u5199</td></tr><tr><td>CountMatches</td><td>counts the number of occurrences of one String in another</td><td>\u8BA1\u7B97\u4E00\u4E2A\u5B57\u7B26\u4E32\u5728\u53E6\u4E00\u4E2A\u5B57\u7B26\u4E32\u4E2D\u51FA\u73B0\u7684\u6B21\u6570</td></tr><tr><td>IsAlpha/IsNumeric/IsWhitespace/IsAsciiPrintable</td><td>checks the characters in a String</td><td>\u68C0\u67E5\u5B57\u7B26\u4E32\u4E2D\u7684\u5B57\u7B26</td></tr><tr><td>DefaultString</td><td>protects against a null input String</td><td>\u9632\u6B62\u8F93\u5165\u5B57\u7B26\u4E32\u4E3A\u7A7A</td></tr><tr><td>Rotate</td><td>rotate (circular shift) a String</td><td>\u65CB\u8F6C\uFF08\u5FAA\u73AF\u79FB\u4F4D\uFF09\u5B57\u7B26\u4E32</td></tr><tr><td>Reverse/ReverseDelimited</td><td>reverses a String -\u53CD\u8F6C\u5B57\u7B26\u4E32</td><td></td></tr><tr><td>Abbreviate</td><td>abbreviates a string using ellipsis or another given String</td><td>\u4F7F\u7528\u7701\u7565\u53F7\u6216\u53E6\u4E00\u4E2A\u7ED9\u5B9A\u7684 String \u7F29\u5199\u4E00\u4E2A\u5B57\u7B26\u4E32</td></tr><tr><td>Difference</td><td>compares Strings and reports on their differences</td><td>\u6BD4\u8F83\u5B57\u7B26\u4E32\u5E76\u62A5\u544A\u5176\u5DEE\u5F02</td></tr><tr><td>LevenshteinDistance</td><td>the number of changes needed to change one String into another</td><td>\u5C06\u4E00\u4E2A String \u8F6C\u6362\u4E3A\u53E6\u4E00\u4E2A String \u6240\u9700\u7684\u66F4\u6539\u6B21\u6570</td></tr></tbody></table><h2 id="\u7A0B\u5E8F\u6C6A\u8D44\u6599\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u7A0B\u5E8F\u6C6A\u8D44\u6599\u94FE\u63A5" aria-hidden="true">#</a> \u7A0B\u5E8F\u6C6A\u8D44\u6599\u94FE\u63A5</h2>`,34),S=n("\u8F6C\u8F7D\u94FE\u63A5\uFF1A"),k={href:"https://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247504624&idx=1&sn=c47e5413aa4914c7301970e0d217bc88&chksm=903bd69da74c5f8b4d4dc6683b4e34b2750278df3dcb9d13b129e80bad9a435b3d98e4ad3fe6#rd",target:"_blank",rel:"noopener noreferrer"},x=n("https://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247504624&idx=1&sn=c47e5413aa4914c7301970e0d217bc88&chksm=903bd69da74c5f8b4d4dc6683b4e34b2750278df3dcb9d13b129e80bad9a435b3d98e4ad3fe6#rd"),U=n("\uFF0C\u51FA\u5904\uFF1A\u6211\u662F\u7A0B\u5E8F\u6C6A\uFF0C\u6574\u7406\uFF1A\u6C89\u9ED8\u738B\u4E8C");function C(_,B){const t=l("ExternalLinkIcon");return r(),d("div",null,[e("blockquote",null,[e("p",null,[e("a",o,[c,i(t)]),v,b,m,h,p,g,e("a",f,[q,i(t)])])]),y,e("blockquote",null,[e("p",null,[S,e("a",k,[x,i(t)]),U])])])}var A=s(u,[["render",C],["__file","isemptyhisblankdyfobzsybdrdfsl.html.vue"]]);export{A as default};
