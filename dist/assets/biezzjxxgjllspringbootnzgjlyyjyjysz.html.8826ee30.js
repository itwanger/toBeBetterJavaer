import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c as t,a as e,d as l,b as n,e as s,r}from"./app.99eb8281.js";const c={},v=e("p",null,"作者：CadeCode",-1),o={href:"http://juejin.cn/post/7043403364020781064",target:"_blank",rel:"noopener noreferrer"},u=s(`<h2 id="断言" tabindex="-1"><a class="header-anchor" href="#断言" aria-hidden="true">#</a> 断言</h2><ol><li>断言是一个逻辑判断，用于检查不应该发生的情况</li><li>Assert 关键字在 JDK1.4 中引入，可通过 JVM 参数<code>-enableassertions</code>开启</li><li>SpringBoot 中提供了 Assert 断言工具类，通常用于数据合法性检查</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 要求参数 object 必须为非空（Not Null），否则抛出异常，不予放行
// 参数
message
参数用于定制异常信息。
void notNull(Object object, String message)
// 要求参数必须空（Null），否则抛出异常，不予『放行』。
// 和 notNull() 方法断言规则相反
void isNull(Object object, String message)
// 要求参数必须为真（True），否则抛出异常，不予『放行』。
void isTrue(boolean expression, String message)
// 要求参数（List/Set）必须非空（Not Empty），否则抛出异常，不予放行
void notEmpty(Collection collection, String message)
// 要求参数（String）必须有长度（即，Not Empty），否则抛出异常，不予放行
void hasLength(String text, String message)
// 要求参数（String）必须有内容（即，Not Blank），否则抛出异常，不予放行
void hasText(String text, String message)
// 要求参数是指定类型的实例，否则抛出异常，不予放行
void isInstanceOf(Class type, Object obj, String message)
// 要求参数 \`subType\` 必须是参数 superType 的子类或实现类，否则抛出异常，不予放行
void isAssignable(Class superType, Class subType, String message)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="对象、数组、集合" tabindex="-1"><a class="header-anchor" href="#对象、数组、集合" aria-hidden="true">#</a> 对象、数组、集合</h2><h3 id="objectutils" tabindex="-1"><a class="header-anchor" href="#objectutils" aria-hidden="true">#</a> ObjectUtils</h3><ol><li>获取对象的基本信息</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 获取对象的类名。参数为
null
时，返回字符串：&quot;null&quot; 
String nullSafeClassName(Object obj)
// 参数为 null 时，返回 0
int nullSafeHashCode(Object object)
// 参数为
null
时，返回字符串：&quot;null&quot;
String nullSafeToString(boolean[] array)
// 获取对象
HashCode（十六进制形式字符串）。参数为
null
时，返回 0 
String getIdentityHexString(Object obj)
// 获取对象的类名和
HashCode。 参数为
null
时，返回字符串：&quot;&quot; 
String identityToString(Object obj)
// 相当于
toString()方法，但参数为
null
时，返回字符串：&quot;&quot;
String getDisplayString(Object obj)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>判断工具</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 判断数组是否为空
boolean isEmpty(Object[] array)
// 判断参数对象是否是数组
boolean isArray(Object obj)
// 判断数组中是否包含指定元素
boolean containsElement(Object[] array, Object element)
// 相等，或同为 null时，返回 true
boolean nullSafeEquals(Object o1, Object o2)
/*
判断参数对象是否为空，判断标准为：
    Optional: Optional.empty()
       Array: length == 0
CharSequence: length == 0
  Collection: Collection.isEmpty()
         Map: Map.isEmpty()
 */
boolean isEmpty(Object obj)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>其他工具方法</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 向参数数组的末尾追加新元素，并返回一个新数组
&lt;A, O extends A&gt; A[] addObjectToArray(A[] array, O obj)
// 原生基础类型数组 --&gt; 包装类数组
Object[] toObjectArray(Object source)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="stringutils" tabindex="-1"><a class="header-anchor" href="#stringutils" aria-hidden="true">#</a> StringUtils</h3><ol><li>字符串判断工具</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 判断字符串是否为
null，或 &quot;&quot;。注意，包含空白符的字符串为非空
boolean isEmpty(Object str)
// 判断字符串是否是以指定内容结束。忽略大小写
boolean endsWithIgnoreCase(String str, String suffix)
// 判断字符串是否已指定内容开头。忽略大小写
boolean startsWithIgnoreCase(String str, String prefix) 
// 是否包含空白符
boolean containsWhitespace(String str)
// 判断字符串非空且长度不为 0，即，Not Empty
boolean hasLength(CharSequence str)
// 判断字符串是否包含实际内容，即非仅包含空白符，也就是 Not Blank
boolean hasText(CharSequence str)
// 判断字符串指定索引处是否包含一个子串。
boolean substringMatch(CharSequence str, int index, CharSequence substring)
// 计算一个字符串中指定子串的出现次数
int countOccurrencesOf(String str, String sub)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>字符串操作工具</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 查找并替换指定子串
String replace(String inString, String oldPattern, String newPattern)
// 去除尾部的特定字符
String trimTrailingCharacter(String str, char trailingCharacter) 
// 去除头部的特定字符
String trimLeadingCharacter(String str, char leadingCharacter)
// 去除头部的空白符
String trimLeadingWhitespace(String str)
// 去除头部的空白符
String trimTrailingWhitespace(String str)
// 去除头部和尾部的空白符
String trimWhitespace(String str)
// 删除开头、结尾和中间的空白符
String trimAllWhitespace(String str)
// 删除指定子串
String delete(String inString, String pattern)
// 删除指定字符（可以是多个）
String deleteAny(String inString, String charsToDelete)
// 对数组的每一项执行 trim() 方法
String[] trimArrayElements(String[] array)
// 将 URL 字符串进行解码
String uriDecode(String source, Charset charset)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>路径相关工具方法</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 解析路径字符串，优化其中的 “..” 
String cleanPath(String path)
// 解析路径字符串，解析出文件名部分
String getFilename(String path)
// 解析路径字符串，解析出文件后缀名
String getFilenameExtension(String path)
// 比较两个两个字符串，判断是否是同一个路径。会自动处理路径中的 “..” 
boolean pathEquals(String path1, String path2)
// 删除文件路径名中的后缀部分
String stripFilenameExtension(String path) 
// 以 “. 作为分隔符，获取其最后一部分
String unqualify(String qualifiedName)
// 以指定字符作为分隔符，获取其最后一部分
String unqualify(String qualifiedName, char separator)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="collectionutils" tabindex="-1"><a class="header-anchor" href="#collectionutils" aria-hidden="true">#</a> CollectionUtils</h3><ol><li>集合判断工具. 我是程序汪</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 判断 List/Set 是否为空
boolean isEmpty(Collection&lt;?&gt; collection)
// 判断 Map 是否为空
boolean isEmpty(Map&lt;?,?&gt; map)
// 判断 List/Set 中是否包含某个对象
boolean containsInstance(Collection&lt;?&gt; collection, Object element)
// 以迭代器的方式，判断 List/Set 中是否包含某个对象
boolean contains(Iterator&lt;?&gt; iterator, Object element)
// 判断 List/Set 是否包含某些对象中的任意一个
boolean containsAny(Collection&lt;?&gt; source, Collection&lt;?&gt; candidates)
// 判断
List/Set
中的每个元素是否唯一。即
List/Set
中不存在重复元素
boolean hasUniqueObject(Collection&lt;?&gt; collection)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),b={start:"2"},m={href:"http://mp.weixin.qq.com/s?__biz=Mzg2ODU0NTA2Mw==&mid=2247488419&idx=2&sn=0b80c7f9f73fca89b91e257a269cfada&chksm=ceabf4ebf9dc7dfdaa605a9bb92d31c9fc0a10a7a94351234181a89ba5800672c6e7da2ebfbe&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},g=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 将 Array 中的元素都添加到 List/Set 中
&lt;E&gt; void mergeArrayIntoCollection(Object array, Collection&lt;E&gt; collection)  
// 将 Properties 中的键值对都添加到 Map 中
&lt;K,V&gt; void mergePropertiesIntoMap(Properties props, Map&lt;K,V&gt; map)
// 返回 List 中最后一个元素
&lt;T&gt; T lastElement(List&lt;T&gt; list)  
// 返回 Set 中最后一个元素
&lt;T&gt; T lastElement(Set&lt;T&gt; set) 
// 返回参数 candidates 中第一个存在于参数 source 中的元素
&lt;E&gt; E findFirstMatch(Collection&lt;?&gt; source, Collection&lt;E&gt; candidates)
// 返回
List/Set
中指定类型的元素。
&lt;T&gt; T findValueOfType(Collection&lt;?&gt; collection, Class&lt;T&gt; type)
// 返回
List/Set
中指定类型的元素。如果第一种类型未找到，则查找第二种类型，以此类推
Object findValueOfType(Collection&lt;?&gt; collection, Class&lt;?&gt;[] types)
// 返回 List/Set 中元素的类型
Class&lt;?&gt; findCommonElementType(Collection&lt;?&gt; collection)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="文件、资源、io-流" tabindex="-1"><a class="header-anchor" href="#文件、资源、io-流" aria-hidden="true">#</a> 文件、资源、IO 流</h2><h3 id="filecopyutils" tabindex="-1"><a class="header-anchor" href="#filecopyutils" aria-hidden="true">#</a> FileCopyUtils</h3><ol><li>输入</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 从文件中读入到字节数组中
byte[] copyToByteArray(File in)
// 从输入流中读入到字节数组中
byte[] copyToByteArray(InputStream in)
// 从输入流中读入到字符串中
String copyToString(Reader in)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>输出</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 从字节数组到文件
void copy(byte[] in, File out)
// 从文件到文件
int copy(File in, File out)
// 从字节数组到输出流
void copy(byte[] in, OutputStream out) 
// 从输入流到输出流
int copy(InputStream in, OutputStream out) 
// 从输入流到输出流
int copy(Reader in, Writer out)
// 从字符串到输出流
void copy(String in, Writer out)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="resourceutils" tabindex="-1"><a class="header-anchor" href="#resourceutils" aria-hidden="true">#</a> ResourceUtils</h3><ol><li>从资源路径获取文件</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 判断字符串是否是一个合法的
URL
字符串。
static boolean isUrl(String resourceLocation)
// 获取 URL
static URL getURL(String resourceLocation) 
// 获取文件（在 JAR 包内无法正常使用，需要是一个独立的文件）
static File getFile(String resourceLocation)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>Resource</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 文件系统资源 D:\\...
FileSystemResource
// URL 资源，如 file://... http://...
UrlResource
// 类路径下的资源，classpth:...
ClassPathResource
// Web 容器上下文中的资源（jar 包、war 包）
ServletContextResource
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 判断资源是否存在
boolean exists()
// 从资源中获得 File 对象
File getFile()
// 从资源中获得 URI 对象
URI getURI()
// 从资源中获得 URI 对象
URL getURL()
// 获得资源的 InputStream
InputStream getInputStream()
// 获得资源的描述信息
String getDescription()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="streamutils" tabindex="-1"><a class="header-anchor" href="#streamutils" aria-hidden="true">#</a> StreamUtils</h3><ol><li>输入</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void copy(byte[] in, OutputStream out)
int copy(InputStream in, OutputStream out)
void copy(String in, Charset charset, OutputStream out)
long copyRange(InputStream in, OutputStream out, long start, long end)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>输出</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>byte[] copyToByteArray(InputStream in)
String copyToString(InputStream in, Charset charset)
// 舍弃输入流中的内容
int drain(InputStream in)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="反射、aop" tabindex="-1"><a class="header-anchor" href="#反射、aop" aria-hidden="true">#</a> 反射、AOP</h2><h3 id="reflectionutils" tabindex="-1"><a class="header-anchor" href="#reflectionutils" aria-hidden="true">#</a> ReflectionUtils</h3><ol><li>获取方法</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 在类中查找指定方法
Method findMethod(Class&lt;?&gt; clazz, String name) 
// 同上，额外提供方法参数类型作查找条件
Method findMethod(Class&lt;?&gt; clazz, String name, Class&lt;?&gt;... paramTypes) 
// 获得类中所有方法，包括继承而来的
Method[] getAllDeclaredMethods(Class&lt;?&gt; leafClass) 
// 在类中查找指定构造方法
Constructor&lt;T&gt; accessibleConstructor(Class&lt;T&gt; clazz, Class&lt;?&gt;... parameterTypes) 
// 是否是 equals() 方法
boolean isEqualsMethod(Method method) 
// 是否是 hashCode() 方法 
boolean isHashCodeMethod(Method method) 
// 是否是 toString() 方法
boolean isToStringMethod(Method method) 
// 是否是从 Object 类继承而来的方法
boolean isObjectMethod(Method method) 
// 检查一个方法是否声明抛出指定异常
boolean declaresException(Method method, Class&lt;?&gt; exceptionType)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>执行方法</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 执行方法
Object invokeMethod(Method method, Object target)  
// 同上，提供方法参数
Object invokeMethod(Method method, Object target, Object... args) 
// 取消
Java
权限检查。以便后续执行该私有方法
void makeAccessible(Method method) 
// 取消
Java
权限检查。以便后续执行私有构造方法
void makeAccessible(Constructor&lt;?&gt; ctor)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>获取字段</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 在类中查找指定属性
Field findField(Class&lt;?&gt; clazz, String name) 
// 同上，多提供了属性的类型
Field findField(Class&lt;?&gt; clazz, String name, Class&lt;?&gt; type) 
// 是否为一个 &quot;public static final&quot; 属性
boolean isPublicStaticFinal(Field field)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>设置字段</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 获取 target 对象的 field 属性值
Object getField(Field field, Object target) 
// 设置 target 对象的 field 属性值，值为 value
void setField(Field field, Object target, Object value) 
// 同类对象属性对等赋值
void shallowCopyFieldState(Object src, Object dest)
// 取消
Java
的权限控制检查。以便后续读写该私有属性
void makeAccessible(Field field) 
// 对类的每个属性执行 callback
void doWithFields(Class&lt;?&gt; clazz, ReflectionUtils.FieldCallback fc) 
// 同上，多了个属性过滤功能。
void doWithFields(Class&lt;?&gt; clazz, ReflectionUtils.FieldCallback fc, 
                  ReflectionUtils.FieldFilter ff) 
// 同上，但不包括继承而来的属性
void doWithLocalFields(Class&lt;?&gt; clazz, ReflectionUtils.FieldCallback fc)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="aoputils" tabindex="-1"><a class="header-anchor" href="#aoputils" aria-hidden="true">#</a> AopUtils</h3><ol><li>判断代理类型</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 判断是不是 Spring 代理对象
boolean isAopProxy()
// 判断是不是 jdk 动态代理对象
isJdkDynamicProxy()
// 判断是不是 CGLIB 代理对象
boolean isCglibProxy()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>获取被代理对象的 class</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 获取被代理的目标 class
Class&lt;?&gt; getTargetClass()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="aopcontext" tabindex="-1"><a class="header-anchor" href="#aopcontext" aria-hidden="true">#</a> AopContext</h3><ol><li>获取当前对象的代理对象</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Object currentProxy()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><h2 id="程序汪资料链接" tabindex="-1"><a class="header-anchor" href="#程序汪资料链接" aria-hidden="true">#</a> 程序汪资料链接</h2>`,38),h={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247501524&idx=1&sn=2cb28e7b64ab77c55bcc1a172b82a2ad&chksm=903bc2b9a74c4baf5737cd430560ee3c5a357bb37864257a05a72e3cccf41db5bd221ccc63d8&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},p={href:"http://mp.weixin.qq.com/s?__biz=Mzg2ODU0NTA2Mw==&mid=2247488419&idx=2&sn=0b80c7f9f73fca89b91e257a269cfada&chksm=ceabf4ebf9dc7dfdaa605a9bb92d31c9fc0a10a7a94351234181a89ba5800672c6e7da2ebfbe&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},x=e("strong",null,"Java项目分享  最新整理全集，找项目不累啦 07版",-1),f={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247494170&idx=1&sn=5181a5277946be31478b1b9425c93f63&chksm=903bee77a74c67614b2772248e8b5e912d323bfe42a0e576dd157a4752f5fed88d6b439ec52f&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},S=e("strong",null,"堪称神级的Spring Boot手册，从基础入门到实战进阶",-1),y={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247492941&idx=1&sn=2ff31fec735d7c5d6f3483c346d5ca69&chksm=903be120a74c68361fd9afad178e7338315041a2cd4459f2165a8faa20e995a3477af3eda2bb&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},_=e("strong",null,"卧槽！字节跳动《算法中文手册》火了，完整版 PDF 开放下载！",-1),j={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247496297&idx=2&sn=d253dda2160821262d9f6fc1a9a637d0&chksm=903bf604a74c7f126ab936e374a1f22b9b7cb26a7964b6cc837c3f73af516139064e522a1294&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},C=e("strong",null,"卧槽！阿里大佬总结的《图解Java》火了，完整版PDF开放下载！",-1),O={href:"http://mp.weixin.qq.com/s?__biz=MzA4NzQ0Njc4Ng==&mid=2247490715&idx=2&sn=7f2c5de11bebaecfbaf1ce4b945a4d6f&chksm=903818f6a74f91e0fde557b75bd44adfd5d378612f682aa3eef6766927aebb9e5afc72c91a9e&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},z=e("strong",null,"字节跳动总结的设计模式 PDF 火了，完整版开放下载！",-1),q=e("p",null,"欢迎添加程序汪个人微信 itwang009  进粉丝群或围观朋友圈",-1);function T(M,F){const i=r("ExternalLinkIcon");return d(),t("div",null,[e("blockquote",null,[v,e("p",null,[l("来源："),e("a",o,[l("juejin.cn/post/7043403364020781064"),n(i)])])]),u,e("ol",b,[e("li",null,[l("集合操作工具。  "),e("a",m,[l("Java项目分享  最新整理全集"),n(i)])])]),g,e("p",null,[e("a",h,[l("程序汪接的7个私活都在这里，经验整理"),n(i)])]),e("p",null,[e("a",p,[x,n(i)])]),e("p",null,[e("a",f,[S,n(i)])]),e("p",null,[e("a",y,[_,n(i)])]),e("p",null,[e("a",j,[C,n(i)])]),e("p",null,[e("a",O,[z,n(i)])]),q])}const k=a(c,[["render",T],["__file","biezzjxxgjllspringbootnzgjlyyjyjysz.html.vue"]]);export{k as default};
