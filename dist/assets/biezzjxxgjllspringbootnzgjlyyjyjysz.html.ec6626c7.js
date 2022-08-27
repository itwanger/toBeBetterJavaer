import{_ as d}from"./plugin-vue_export-helper.21dcd24c.js";import{r as a,o as t,c as r,a as e,b as n,e as s,d as l}from"./app.fa8624aa.js";const c={},v=s(`<blockquote><p>\u4F5C\u8005\uFF1ACadeCode</p><p>\u6765\u6E90\uFF1Ajuejin.cn/post/7043403364020781064</p></blockquote><h2 id="\u65AD\u8A00" tabindex="-1"><a class="header-anchor" href="#\u65AD\u8A00" aria-hidden="true">#</a> \u65AD\u8A00</h2><ol><li>\u65AD\u8A00\u662F\u4E00\u4E2A\u903B\u8F91\u5224\u65AD\uFF0C\u7528\u4E8E\u68C0\u67E5\u4E0D\u5E94\u8BE5\u53D1\u751F\u7684\u60C5\u51B5</li><li>Assert \u5173\u952E\u5B57\u5728 JDK1.4 \u4E2D\u5F15\u5165\uFF0C\u53EF\u901A\u8FC7 JVM \u53C2\u6570<code>-enableassertions</code>\u5F00\u542F</li><li>SpringBoot \u4E2D\u63D0\u4F9B\u4E86 Assert \u65AD\u8A00\u5DE5\u5177\u7C7B\uFF0C\u901A\u5E38\u7528\u4E8E\u6570\u636E\u5408\u6CD5\u6027\u68C0\u67E5</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u8981\u6C42\u53C2\u6570 object \u5FC5\u987B\u4E3A\u975E\u7A7A\uFF08Not Null\uFF09\uFF0C\u5426\u5219\u629B\u51FA\u5F02\u5E38\uFF0C\u4E0D\u4E88\u653E\u884C
// \u53C2\u6570
message
\u53C2\u6570\u7528\u4E8E\u5B9A\u5236\u5F02\u5E38\u4FE1\u606F\u3002
void notNull(Object object, String message)
// \u8981\u6C42\u53C2\u6570\u5FC5\u987B\u7A7A\uFF08Null\uFF09\uFF0C\u5426\u5219\u629B\u51FA\u5F02\u5E38\uFF0C\u4E0D\u4E88\u300E\u653E\u884C\u300F\u3002
// \u548C notNull() \u65B9\u6CD5\u65AD\u8A00\u89C4\u5219\u76F8\u53CD
void isNull(Object object, String message)
// \u8981\u6C42\u53C2\u6570\u5FC5\u987B\u4E3A\u771F\uFF08True\uFF09\uFF0C\u5426\u5219\u629B\u51FA\u5F02\u5E38\uFF0C\u4E0D\u4E88\u300E\u653E\u884C\u300F\u3002
void isTrue(boolean expression, String message)
// \u8981\u6C42\u53C2\u6570\uFF08List/Set\uFF09\u5FC5\u987B\u975E\u7A7A\uFF08Not Empty\uFF09\uFF0C\u5426\u5219\u629B\u51FA\u5F02\u5E38\uFF0C\u4E0D\u4E88\u653E\u884C
void notEmpty(Collection collection, String message)
// \u8981\u6C42\u53C2\u6570\uFF08String\uFF09\u5FC5\u987B\u6709\u957F\u5EA6\uFF08\u5373\uFF0CNot Empty\uFF09\uFF0C\u5426\u5219\u629B\u51FA\u5F02\u5E38\uFF0C\u4E0D\u4E88\u653E\u884C
void hasLength(String text, String message)
// \u8981\u6C42\u53C2\u6570\uFF08String\uFF09\u5FC5\u987B\u6709\u5185\u5BB9\uFF08\u5373\uFF0CNot Blank\uFF09\uFF0C\u5426\u5219\u629B\u51FA\u5F02\u5E38\uFF0C\u4E0D\u4E88\u653E\u884C
void hasText(String text, String message)
// \u8981\u6C42\u53C2\u6570\u662F\u6307\u5B9A\u7C7B\u578B\u7684\u5B9E\u4F8B\uFF0C\u5426\u5219\u629B\u51FA\u5F02\u5E38\uFF0C\u4E0D\u4E88\u653E\u884C
void isInstanceOf(Class type, Object obj, String message)
// \u8981\u6C42\u53C2\u6570 \`subType\` \u5FC5\u987B\u662F\u53C2\u6570 superType \u7684\u5B50\u7C7B\u6216\u5B9E\u73B0\u7C7B\uFF0C\u5426\u5219\u629B\u51FA\u5F02\u5E38\uFF0C\u4E0D\u4E88\u653E\u884C
void isAssignable(Class superType, Class subType, String message)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5BF9\u8C61\u3001\u6570\u7EC4\u3001\u96C6\u5408" tabindex="-1"><a class="header-anchor" href="#\u5BF9\u8C61\u3001\u6570\u7EC4\u3001\u96C6\u5408" aria-hidden="true">#</a> \u5BF9\u8C61\u3001\u6570\u7EC4\u3001\u96C6\u5408</h2><h3 id="objectutils" tabindex="-1"><a class="header-anchor" href="#objectutils" aria-hidden="true">#</a> ObjectUtils</h3><ol><li>\u83B7\u53D6\u5BF9\u8C61\u7684\u57FA\u672C\u4FE1\u606F</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u83B7\u53D6\u5BF9\u8C61\u7684\u7C7B\u540D\u3002\u53C2\u6570\u4E3A
null
\u65F6\uFF0C\u8FD4\u56DE\u5B57\u7B26\u4E32\uFF1A&quot;null&quot; 
String nullSafeClassName(Object obj)
// \u53C2\u6570\u4E3A null \u65F6\uFF0C\u8FD4\u56DE 0
int nullSafeHashCode(Object object)
// \u53C2\u6570\u4E3A
null
\u65F6\uFF0C\u8FD4\u56DE\u5B57\u7B26\u4E32\uFF1A&quot;null&quot;
String nullSafeToString(boolean[] array)
// \u83B7\u53D6\u5BF9\u8C61
HashCode\uFF08\u5341\u516D\u8FDB\u5236\u5F62\u5F0F\u5B57\u7B26\u4E32\uFF09\u3002\u53C2\u6570\u4E3A
null
\u65F6\uFF0C\u8FD4\u56DE 0 
String getIdentityHexString(Object obj)
// \u83B7\u53D6\u5BF9\u8C61\u7684\u7C7B\u540D\u548C
HashCode\u3002 \u53C2\u6570\u4E3A
null
\u65F6\uFF0C\u8FD4\u56DE\u5B57\u7B26\u4E32\uFF1A&quot;&quot; 
String identityToString(Object obj)
// \u76F8\u5F53\u4E8E
toString()\u65B9\u6CD5\uFF0C\u4F46\u53C2\u6570\u4E3A
null
\u65F6\uFF0C\u8FD4\u56DE\u5B57\u7B26\u4E32\uFF1A&quot;&quot;
String getDisplayString(Object obj)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u5224\u65AD\u5DE5\u5177</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5224\u65AD\u6570\u7EC4\u662F\u5426\u4E3A\u7A7A
boolean isEmpty(Object[] array)
// \u5224\u65AD\u53C2\u6570\u5BF9\u8C61\u662F\u5426\u662F\u6570\u7EC4
boolean isArray(Object obj)
// \u5224\u65AD\u6570\u7EC4\u4E2D\u662F\u5426\u5305\u542B\u6307\u5B9A\u5143\u7D20
boolean containsElement(Object[] array, Object element)
// \u76F8\u7B49\uFF0C\u6216\u540C\u4E3A null\u65F6\uFF0C\u8FD4\u56DE true
boolean nullSafeEquals(Object o1, Object o2)
/*
\u5224\u65AD\u53C2\u6570\u5BF9\u8C61\u662F\u5426\u4E3A\u7A7A\uFF0C\u5224\u65AD\u6807\u51C6\u4E3A\uFF1A
    Optional: Optional.empty()
       Array: length == 0
CharSequence: length == 0
  Collection: Collection.isEmpty()
         Map: Map.isEmpty()
 */
boolean isEmpty(Object obj)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>\u5176\u4ED6\u5DE5\u5177\u65B9\u6CD5</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5411\u53C2\u6570\u6570\u7EC4\u7684\u672B\u5C3E\u8FFD\u52A0\u65B0\u5143\u7D20\uFF0C\u5E76\u8FD4\u56DE\u4E00\u4E2A\u65B0\u6570\u7EC4
&lt;A, O extends A&gt; A[] addObjectToArray(A[] array, O obj)
// \u539F\u751F\u57FA\u7840\u7C7B\u578B\u6570\u7EC4 --&gt; \u5305\u88C5\u7C7B\u6570\u7EC4
Object[] toObjectArray(Object source)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils" tabindex="-1"><a class="header-anchor" href="#stringutils" aria-hidden="true">#</a> StringUtils</h3><ol><li>\u5B57\u7B26\u4E32\u5224\u65AD\u5DE5\u5177</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5224\u65AD\u5B57\u7B26\u4E32\u662F\u5426\u4E3A
null\uFF0C\u6216 &quot;&quot;\u3002\u6CE8\u610F\uFF0C\u5305\u542B\u7A7A\u767D\u7B26\u7684\u5B57\u7B26\u4E32\u4E3A\u975E\u7A7A
boolean isEmpty(Object str)
// \u5224\u65AD\u5B57\u7B26\u4E32\u662F\u5426\u662F\u4EE5\u6307\u5B9A\u5185\u5BB9\u7ED3\u675F\u3002\u5FFD\u7565\u5927\u5C0F\u5199
boolean endsWithIgnoreCase(String str, String suffix)
// \u5224\u65AD\u5B57\u7B26\u4E32\u662F\u5426\u5DF2\u6307\u5B9A\u5185\u5BB9\u5F00\u5934\u3002\u5FFD\u7565\u5927\u5C0F\u5199
boolean startsWithIgnoreCase(String str, String prefix) 
// \u662F\u5426\u5305\u542B\u7A7A\u767D\u7B26
boolean containsWhitespace(String str)
// \u5224\u65AD\u5B57\u7B26\u4E32\u975E\u7A7A\u4E14\u957F\u5EA6\u4E0D\u4E3A 0\uFF0C\u5373\uFF0CNot Empty
boolean hasLength(CharSequence str)
// \u5224\u65AD\u5B57\u7B26\u4E32\u662F\u5426\u5305\u542B\u5B9E\u9645\u5185\u5BB9\uFF0C\u5373\u975E\u4EC5\u5305\u542B\u7A7A\u767D\u7B26\uFF0C\u4E5F\u5C31\u662F Not Blank
boolean hasText(CharSequence str)
// \u5224\u65AD\u5B57\u7B26\u4E32\u6307\u5B9A\u7D22\u5F15\u5904\u662F\u5426\u5305\u542B\u4E00\u4E2A\u5B50\u4E32\u3002
boolean substringMatch(CharSequence str, int index, CharSequence substring)
// \u8BA1\u7B97\u4E00\u4E2A\u5B57\u7B26\u4E32\u4E2D\u6307\u5B9A\u5B50\u4E32\u7684\u51FA\u73B0\u6B21\u6570
int countOccurrencesOf(String str, String sub)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u5B57\u7B26\u4E32\u64CD\u4F5C\u5DE5\u5177</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u67E5\u627E\u5E76\u66FF\u6362\u6307\u5B9A\u5B50\u4E32
String replace(String inString, String oldPattern, String newPattern)
// \u53BB\u9664\u5C3E\u90E8\u7684\u7279\u5B9A\u5B57\u7B26
String trimTrailingCharacter(String str, char trailingCharacter) 
// \u53BB\u9664\u5934\u90E8\u7684\u7279\u5B9A\u5B57\u7B26
String trimLeadingCharacter(String str, char leadingCharacter)
// \u53BB\u9664\u5934\u90E8\u7684\u7A7A\u767D\u7B26
String trimLeadingWhitespace(String str)
// \u53BB\u9664\u5934\u90E8\u7684\u7A7A\u767D\u7B26
String trimTrailingWhitespace(String str)
// \u53BB\u9664\u5934\u90E8\u548C\u5C3E\u90E8\u7684\u7A7A\u767D\u7B26
String trimWhitespace(String str)
// \u5220\u9664\u5F00\u5934\u3001\u7ED3\u5C3E\u548C\u4E2D\u95F4\u7684\u7A7A\u767D\u7B26
String trimAllWhitespace(String str)
// \u5220\u9664\u6307\u5B9A\u5B50\u4E32
String delete(String inString, String pattern)
// \u5220\u9664\u6307\u5B9A\u5B57\u7B26\uFF08\u53EF\u4EE5\u662F\u591A\u4E2A\uFF09
String deleteAny(String inString, String charsToDelete)
// \u5BF9\u6570\u7EC4\u7684\u6BCF\u4E00\u9879\u6267\u884C trim() \u65B9\u6CD5
String[] trimArrayElements(String[] array)
// \u5C06 URL \u5B57\u7B26\u4E32\u8FDB\u884C\u89E3\u7801
String uriDecode(String source, Charset charset)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>\u8DEF\u5F84\u76F8\u5173\u5DE5\u5177\u65B9\u6CD5</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u89E3\u6790\u8DEF\u5F84\u5B57\u7B26\u4E32\uFF0C\u4F18\u5316\u5176\u4E2D\u7684 \u201C..\u201D 
String cleanPath(String path)
// \u89E3\u6790\u8DEF\u5F84\u5B57\u7B26\u4E32\uFF0C\u89E3\u6790\u51FA\u6587\u4EF6\u540D\u90E8\u5206
String getFilename(String path)
// \u89E3\u6790\u8DEF\u5F84\u5B57\u7B26\u4E32\uFF0C\u89E3\u6790\u51FA\u6587\u4EF6\u540E\u7F00\u540D
String getFilenameExtension(String path)
// \u6BD4\u8F83\u4E24\u4E2A\u4E24\u4E2A\u5B57\u7B26\u4E32\uFF0C\u5224\u65AD\u662F\u5426\u662F\u540C\u4E00\u4E2A\u8DEF\u5F84\u3002\u4F1A\u81EA\u52A8\u5904\u7406\u8DEF\u5F84\u4E2D\u7684 \u201C..\u201D 
boolean pathEquals(String path1, String path2)
// \u5220\u9664\u6587\u4EF6\u8DEF\u5F84\u540D\u4E2D\u7684\u540E\u7F00\u90E8\u5206
String stripFilenameExtension(String path) 
// \u4EE5 \u201C. \u4F5C\u4E3A\u5206\u9694\u7B26\uFF0C\u83B7\u53D6\u5176\u6700\u540E\u4E00\u90E8\u5206
String unqualify(String qualifiedName)
// \u4EE5\u6307\u5B9A\u5B57\u7B26\u4F5C\u4E3A\u5206\u9694\u7B26\uFF0C\u83B7\u53D6\u5176\u6700\u540E\u4E00\u90E8\u5206
String unqualify(String qualifiedName, char separator)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="collectionutils" tabindex="-1"><a class="header-anchor" href="#collectionutils" aria-hidden="true">#</a> CollectionUtils</h3><ol><li>\u96C6\u5408\u5224\u65AD\u5DE5\u5177. \u6211\u662F\u7A0B\u5E8F\u6C6A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5224\u65AD List/Set \u662F\u5426\u4E3A\u7A7A
boolean isEmpty(Collection&lt;?&gt; collection)
// \u5224\u65AD Map \u662F\u5426\u4E3A\u7A7A
boolean isEmpty(Map&lt;?,?&gt; map)
// \u5224\u65AD List/Set \u4E2D\u662F\u5426\u5305\u542B\u67D0\u4E2A\u5BF9\u8C61
boolean containsInstance(Collection&lt;?&gt; collection, Object element)
// \u4EE5\u8FED\u4EE3\u5668\u7684\u65B9\u5F0F\uFF0C\u5224\u65AD List/Set \u4E2D\u662F\u5426\u5305\u542B\u67D0\u4E2A\u5BF9\u8C61
boolean contains(Iterator&lt;?&gt; iterator, Object element)
// \u5224\u65AD List/Set \u662F\u5426\u5305\u542B\u67D0\u4E9B\u5BF9\u8C61\u4E2D\u7684\u4EFB\u610F\u4E00\u4E2A
boolean containsAny(Collection&lt;?&gt; source, Collection&lt;?&gt; candidates)
// \u5224\u65AD
List/Set
\u4E2D\u7684\u6BCF\u4E2A\u5143\u7D20\u662F\u5426\u552F\u4E00\u3002\u5373
List/Set
\u4E2D\u4E0D\u5B58\u5728\u91CD\u590D\u5143\u7D20
boolean hasUniqueObject(Collection&lt;?&gt; collection)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),o={start:"2"},u=l("\u96C6\u5408\u64CD\u4F5C\u5DE5\u5177\u3002\xA0\xA0"),b={href:"http://mp.weixin.qq.com/s?__biz=Mzg2ODU0NTA2Mw==&mid=2247488419&idx=2&sn=0b80c7f9f73fca89b91e257a269cfada&chksm=ceabf4ebf9dc7dfdaa605a9bb92d31c9fc0a10a7a94351234181a89ba5800672c6e7da2ebfbe&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},m=l("Java\u9879\u76EE\u5206\u4EAB \xA0\u6700\u65B0\u6574\u7406\u5168\u96C6"),g=s(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5C06 Array \u4E2D\u7684\u5143\u7D20\u90FD\u6DFB\u52A0\u5230 List/Set \u4E2D
&lt;E&gt; void mergeArrayIntoCollection(Object array, Collection&lt;E&gt; collection)  
// \u5C06 Properties \u4E2D\u7684\u952E\u503C\u5BF9\u90FD\u6DFB\u52A0\u5230 Map \u4E2D
&lt;K,V&gt; void mergePropertiesIntoMap(Properties props, Map&lt;K,V&gt; map)
// \u8FD4\u56DE List \u4E2D\u6700\u540E\u4E00\u4E2A\u5143\u7D20
&lt;T&gt; T lastElement(List&lt;T&gt; list)  
// \u8FD4\u56DE Set \u4E2D\u6700\u540E\u4E00\u4E2A\u5143\u7D20
&lt;T&gt; T lastElement(Set&lt;T&gt; set) 
// \u8FD4\u56DE\u53C2\u6570 candidates \u4E2D\u7B2C\u4E00\u4E2A\u5B58\u5728\u4E8E\u53C2\u6570 source \u4E2D\u7684\u5143\u7D20
&lt;E&gt; E findFirstMatch(Collection&lt;?&gt; source, Collection&lt;E&gt; candidates)
// \u8FD4\u56DE
List/Set
\u4E2D\u6307\u5B9A\u7C7B\u578B\u7684\u5143\u7D20\u3002
&lt;T&gt; T findValueOfType(Collection&lt;?&gt; collection, Class&lt;T&gt; type)
// \u8FD4\u56DE
List/Set
\u4E2D\u6307\u5B9A\u7C7B\u578B\u7684\u5143\u7D20\u3002\u5982\u679C\u7B2C\u4E00\u79CD\u7C7B\u578B\u672A\u627E\u5230\uFF0C\u5219\u67E5\u627E\u7B2C\u4E8C\u79CD\u7C7B\u578B\uFF0C\u4EE5\u6B64\u7C7B\u63A8
Object findValueOfType(Collection&lt;?&gt; collection, Class&lt;?&gt;[] types)
// \u8FD4\u56DE List/Set \u4E2D\u5143\u7D20\u7684\u7C7B\u578B
Class&lt;?&gt; findCommonElementType(Collection&lt;?&gt; collection)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6587\u4EF6\u3001\u8D44\u6E90\u3001io-\u6D41" tabindex="-1"><a class="header-anchor" href="#\u6587\u4EF6\u3001\u8D44\u6E90\u3001io-\u6D41" aria-hidden="true">#</a> \u6587\u4EF6\u3001\u8D44\u6E90\u3001IO \u6D41</h2><h3 id="filecopyutils" tabindex="-1"><a class="header-anchor" href="#filecopyutils" aria-hidden="true">#</a> FileCopyUtils</h3><ol><li>\u8F93\u5165</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u4ECE\u6587\u4EF6\u4E2D\u8BFB\u5165\u5230\u5B57\u8282\u6570\u7EC4\u4E2D
byte[] copyToByteArray(File in)
// \u4ECE\u8F93\u5165\u6D41\u4E2D\u8BFB\u5165\u5230\u5B57\u8282\u6570\u7EC4\u4E2D
byte[] copyToByteArray(InputStream in)
// \u4ECE\u8F93\u5165\u6D41\u4E2D\u8BFB\u5165\u5230\u5B57\u7B26\u4E32\u4E2D
String copyToString(Reader in)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u8F93\u51FA</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u4ECE\u5B57\u8282\u6570\u7EC4\u5230\u6587\u4EF6
void copy(byte[] in, File out)
// \u4ECE\u6587\u4EF6\u5230\u6587\u4EF6
int copy(File in, File out)
// \u4ECE\u5B57\u8282\u6570\u7EC4\u5230\u8F93\u51FA\u6D41
void copy(byte[] in, OutputStream out) 
// \u4ECE\u8F93\u5165\u6D41\u5230\u8F93\u51FA\u6D41
int copy(InputStream in, OutputStream out) 
// \u4ECE\u8F93\u5165\u6D41\u5230\u8F93\u51FA\u6D41
int copy(Reader in, Writer out)
// \u4ECE\u5B57\u7B26\u4E32\u5230\u8F93\u51FA\u6D41
void copy(String in, Writer out)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="resourceutils" tabindex="-1"><a class="header-anchor" href="#resourceutils" aria-hidden="true">#</a> ResourceUtils</h3><ol><li>\u4ECE\u8D44\u6E90\u8DEF\u5F84\u83B7\u53D6\u6587\u4EF6</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5224\u65AD\u5B57\u7B26\u4E32\u662F\u5426\u662F\u4E00\u4E2A\u5408\u6CD5\u7684
URL
\u5B57\u7B26\u4E32\u3002
static boolean isUrl(String resourceLocation)
// \u83B7\u53D6 URL
static URL getURL(String resourceLocation) 
// \u83B7\u53D6\u6587\u4EF6\uFF08\u5728 JAR \u5305\u5185\u65E0\u6CD5\u6B63\u5E38\u4F7F\u7528\uFF0C\u9700\u8981\u662F\u4E00\u4E2A\u72EC\u7ACB\u7684\u6587\u4EF6\uFF09
static File getFile(String resourceLocation)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>Resource</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u6587\u4EF6\u7CFB\u7EDF\u8D44\u6E90 D:\\...
FileSystemResource
// URL \u8D44\u6E90\uFF0C\u5982 file://... http://...
UrlResource
// \u7C7B\u8DEF\u5F84\u4E0B\u7684\u8D44\u6E90\uFF0Cclasspth:...
ClassPathResource
// Web \u5BB9\u5668\u4E0A\u4E0B\u6587\u4E2D\u7684\u8D44\u6E90\uFF08jar \u5305\u3001war \u5305\uFF09
ServletContextResource
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5224\u65AD\u8D44\u6E90\u662F\u5426\u5B58\u5728
boolean exists()
// \u4ECE\u8D44\u6E90\u4E2D\u83B7\u5F97 File \u5BF9\u8C61
File getFile()
// \u4ECE\u8D44\u6E90\u4E2D\u83B7\u5F97 URI \u5BF9\u8C61
URI getURI()
// \u4ECE\u8D44\u6E90\u4E2D\u83B7\u5F97 URI \u5BF9\u8C61
URL getURL()
// \u83B7\u5F97\u8D44\u6E90\u7684 InputStream
InputStream getInputStream()
// \u83B7\u5F97\u8D44\u6E90\u7684\u63CF\u8FF0\u4FE1\u606F
String getDescription()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="streamutils" tabindex="-1"><a class="header-anchor" href="#streamutils" aria-hidden="true">#</a> StreamUtils</h3><ol><li>\u8F93\u5165</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>void copy(byte[] in, OutputStream out)
int copy(InputStream in, OutputStream out)
void copy(String in, Charset charset, OutputStream out)
long copyRange(InputStream in, OutputStream out, long start, long end)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u8F93\u51FA</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>byte[] copyToByteArray(InputStream in)
String copyToString(InputStream in, Charset charset)
// \u820D\u5F03\u8F93\u5165\u6D41\u4E2D\u7684\u5185\u5BB9
int drain(InputStream in)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53CD\u5C04\u3001aop" tabindex="-1"><a class="header-anchor" href="#\u53CD\u5C04\u3001aop" aria-hidden="true">#</a> \u53CD\u5C04\u3001AOP</h2><h3 id="reflectionutils" tabindex="-1"><a class="header-anchor" href="#reflectionutils" aria-hidden="true">#</a> ReflectionUtils</h3><ol><li>\u83B7\u53D6\u65B9\u6CD5</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5728\u7C7B\u4E2D\u67E5\u627E\u6307\u5B9A\u65B9\u6CD5
Method findMethod(Class&lt;?&gt; clazz, String name) 
// \u540C\u4E0A\uFF0C\u989D\u5916\u63D0\u4F9B\u65B9\u6CD5\u53C2\u6570\u7C7B\u578B\u4F5C\u67E5\u627E\u6761\u4EF6
Method findMethod(Class&lt;?&gt; clazz, String name, Class&lt;?&gt;... paramTypes) 
// \u83B7\u5F97\u7C7B\u4E2D\u6240\u6709\u65B9\u6CD5\uFF0C\u5305\u62EC\u7EE7\u627F\u800C\u6765\u7684
Method[] getAllDeclaredMethods(Class&lt;?&gt; leafClass) 
// \u5728\u7C7B\u4E2D\u67E5\u627E\u6307\u5B9A\u6784\u9020\u65B9\u6CD5
Constructor&lt;T&gt; accessibleConstructor(Class&lt;T&gt; clazz, Class&lt;?&gt;... parameterTypes) 
// \u662F\u5426\u662F equals() \u65B9\u6CD5
boolean isEqualsMethod(Method method) 
// \u662F\u5426\u662F hashCode() \u65B9\u6CD5 
boolean isHashCodeMethod(Method method) 
// \u662F\u5426\u662F toString() \u65B9\u6CD5
boolean isToStringMethod(Method method) 
// \u662F\u5426\u662F\u4ECE Object \u7C7B\u7EE7\u627F\u800C\u6765\u7684\u65B9\u6CD5
boolean isObjectMethod(Method method) 
// \u68C0\u67E5\u4E00\u4E2A\u65B9\u6CD5\u662F\u5426\u58F0\u660E\u629B\u51FA\u6307\u5B9A\u5F02\u5E38
boolean declaresException(Method method, Class&lt;?&gt; exceptionType)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u6267\u884C\u65B9\u6CD5</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u6267\u884C\u65B9\u6CD5
Object invokeMethod(Method method, Object target)  
// \u540C\u4E0A\uFF0C\u63D0\u4F9B\u65B9\u6CD5\u53C2\u6570
Object invokeMethod(Method method, Object target, Object... args) 
// \u53D6\u6D88
Java
\u6743\u9650\u68C0\u67E5\u3002\u4EE5\u4FBF\u540E\u7EED\u6267\u884C\u8BE5\u79C1\u6709\u65B9\u6CD5
void makeAccessible(Method method) 
// \u53D6\u6D88
Java
\u6743\u9650\u68C0\u67E5\u3002\u4EE5\u4FBF\u540E\u7EED\u6267\u884C\u79C1\u6709\u6784\u9020\u65B9\u6CD5
void makeAccessible(Constructor&lt;?&gt; ctor)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>\u83B7\u53D6\u5B57\u6BB5</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5728\u7C7B\u4E2D\u67E5\u627E\u6307\u5B9A\u5C5E\u6027
Field findField(Class&lt;?&gt; clazz, String name) 
// \u540C\u4E0A\uFF0C\u591A\u63D0\u4F9B\u4E86\u5C5E\u6027\u7684\u7C7B\u578B
Field findField(Class&lt;?&gt; clazz, String name, Class&lt;?&gt; type) 
// \u662F\u5426\u4E3A\u4E00\u4E2A &quot;public static final&quot; \u5C5E\u6027
boolean isPublicStaticFinal(Field field)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>\u8BBE\u7F6E\u5B57\u6BB5</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u83B7\u53D6 target \u5BF9\u8C61\u7684 field \u5C5E\u6027\u503C
Object getField(Field field, Object target) 
// \u8BBE\u7F6E target \u5BF9\u8C61\u7684 field \u5C5E\u6027\u503C\uFF0C\u503C\u4E3A value
void setField(Field field, Object target, Object value) 
// \u540C\u7C7B\u5BF9\u8C61\u5C5E\u6027\u5BF9\u7B49\u8D4B\u503C
void shallowCopyFieldState(Object src, Object dest)
// \u53D6\u6D88
Java
\u7684\u6743\u9650\u63A7\u5236\u68C0\u67E5\u3002\u4EE5\u4FBF\u540E\u7EED\u8BFB\u5199\u8BE5\u79C1\u6709\u5C5E\u6027
void makeAccessible(Field field) 
// \u5BF9\u7C7B\u7684\u6BCF\u4E2A\u5C5E\u6027\u6267\u884C callback
void doWithFields(Class&lt;?&gt; clazz, ReflectionUtils.FieldCallback fc) 
// \u540C\u4E0A\uFF0C\u591A\u4E86\u4E2A\u5C5E\u6027\u8FC7\u6EE4\u529F\u80FD\u3002
void doWithFields(Class&lt;?&gt; clazz, ReflectionUtils.FieldCallback fc, 
                  ReflectionUtils.FieldFilter ff) 
// \u540C\u4E0A\uFF0C\u4F46\u4E0D\u5305\u62EC\u7EE7\u627F\u800C\u6765\u7684\u5C5E\u6027
void doWithLocalFields(Class&lt;?&gt; clazz, ReflectionUtils.FieldCallback fc)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="aoputils" tabindex="-1"><a class="header-anchor" href="#aoputils" aria-hidden="true">#</a> AopUtils</h3><ol><li>\u5224\u65AD\u4EE3\u7406\u7C7B\u578B</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u5224\u65AD\u662F\u4E0D\u662F Spring \u4EE3\u7406\u5BF9\u8C61
boolean isAopProxy()
// \u5224\u65AD\u662F\u4E0D\u662F jdk \u52A8\u6001\u4EE3\u7406\u5BF9\u8C61
isJdkDynamicProxy()
// \u5224\u65AD\u662F\u4E0D\u662F CGLIB \u4EE3\u7406\u5BF9\u8C61
boolean isCglibProxy()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u83B7\u53D6\u88AB\u4EE3\u7406\u5BF9\u8C61\u7684 class</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// \u83B7\u53D6\u88AB\u4EE3\u7406\u7684\u76EE\u6807 class
Class&lt;?&gt; getTargetClass()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="aopcontext" tabindex="-1"><a class="header-anchor" href="#aopcontext" aria-hidden="true">#</a> AopContext</h3><ol><li>\u83B7\u53D6\u5F53\u524D\u5BF9\u8C61\u7684\u4EE3\u7406\u5BF9\u8C61</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Object currentProxy()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><h2 id="\u7A0B\u5E8F\u6C6A\u8D44\u6599\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u7A0B\u5E8F\u6C6A\u8D44\u6599\u94FE\u63A5" aria-hidden="true">#</a> \u7A0B\u5E8F\u6C6A\u8D44\u6599\u94FE\u63A5</h2>`,38),h={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247501524&idx=1&sn=2cb28e7b64ab77c55bcc1a172b82a2ad&chksm=903bc2b9a74c4baf5737cd430560ee3c5a357bb37864257a05a72e3cccf41db5bd221ccc63d8&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},p=l("\u7A0B\u5E8F\u6C6A\u63A5\u76847\u4E2A\u79C1\u6D3B\u90FD\u5728\u8FD9\u91CC\uFF0C\u7ECF\u9A8C\u6574\u7406"),x={href:"http://mp.weixin.qq.com/s?__biz=Mzg2ODU0NTA2Mw==&mid=2247488419&idx=2&sn=0b80c7f9f73fca89b91e257a269cfada&chksm=ceabf4ebf9dc7dfdaa605a9bb92d31c9fc0a10a7a94351234181a89ba5800672c6e7da2ebfbe&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},S=e("strong",null,"Java\u9879\u76EE\u5206\u4EAB \xA0\u6700\u65B0\u6574\u7406\u5168\u96C6\uFF0C\u627E\u9879\u76EE\u4E0D\u7D2F\u5566 07\u7248",-1),f={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247494170&idx=1&sn=5181a5277946be31478b1b9425c93f63&chksm=903bee77a74c67614b2772248e8b5e912d323bfe42a0e576dd157a4752f5fed88d6b439ec52f&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},y=e("strong",null,"\u582A\u79F0\u795E\u7EA7\u7684Spring Boot\u624B\u518C\uFF0C\u4ECE\u57FA\u7840\u5165\u95E8\u5230\u5B9E\u6218\u8FDB\u9636",-1),_={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247492941&idx=1&sn=2ff31fec735d7c5d6f3483c346d5ca69&chksm=903be120a74c68361fd9afad178e7338315041a2cd4459f2165a8faa20e995a3477af3eda2bb&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},C=e("strong",null,"\u5367\u69FD\uFF01\u5B57\u8282\u8DF3\u52A8\u300A\u7B97\u6CD5\u4E2D\u6587\u624B\u518C\u300B\u706B\u4E86\uFF0C\u5B8C\u6574\u7248 PDF \u5F00\u653E\u4E0B\u8F7D\uFF01",-1),j={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247496297&idx=2&sn=d253dda2160821262d9f6fc1a9a637d0&chksm=903bf604a74c7f126ab936e374a1f22b9b7cb26a7964b6cc837c3f73af516139064e522a1294&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},O=e("strong",null,"\u5367\u69FD\uFF01\u963F\u91CC\u5927\u4F6C\u603B\u7ED3\u7684\u300A\u56FE\u89E3Java\u300B\u706B\u4E86\uFF0C\u5B8C\u6574\u7248PDF\u5F00\u653E\u4E0B\u8F7D\uFF01",-1),z={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247490715&idx=2&sn=7f2c5de11bebaecfbaf1ce4b945a4d6f&chksm=903818f6a74f91e0fde557b75bd44adfd5d378612f682aa3eef6766927aebb9e5afc72c91a9e&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},q=e("strong",null,"\u5B57\u8282\u8DF3\u52A8\u603B\u7ED3\u7684\u8BBE\u8BA1\u6A21\u5F0F PDF \u706B\u4E86\uFF0C\u5B8C\u6574\u7248\u5F00\u653E\u4E0B\u8F7D\uFF01",-1),T=e("p",null,"\u6B22\u8FCE\u6DFB\u52A0\u7A0B\u5E8F\u6C6A\u4E2A\u4EBA\u5FAE\u4FE1 itwang009\xA0 \u8FDB\u7C89\u4E1D\u7FA4\u6216\u56F4\u89C2\u670B\u53CB\u5708",-1);function M(F,A){const i=a("ExternalLinkIcon");return t(),r("div",null,[v,e("ol",o,[e("li",null,[u,e("a",b,[m,n(i)])])]),g,e("p",null,[e("a",h,[p,n(i)])]),e("p",null,[e("a",x,[S,n(i)])]),e("p",null,[e("a",f,[y,n(i)])]),e("p",null,[e("a",_,[C,n(i)])]),e("p",null,[e("a",j,[O,n(i)])]),e("p",null,[e("a",z,[q,n(i)])]),T])}var L=d(c,[["render",M],["__file","biezzjxxgjllspringbootnzgjlyyjyjysz.html.vue"]]);export{L as default};
