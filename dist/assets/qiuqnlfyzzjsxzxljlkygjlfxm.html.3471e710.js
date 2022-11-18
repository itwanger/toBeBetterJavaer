import{_ as d}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as l,a as e,d as i,b as t,e as a,r}from"./app.99eb8281.js";const c={},o=a(`<p>最近公司来了几个实习生，二哥负责带一个。这位小师弟说实话，基本功很扎实，做事也非常靠谱，深得二哥真传。</p><p>不过最近 Review 他代码的时候，二哥发现小师弟有些代码的逻辑繁琐，有些代码完全可以用一些开源工具类实现，会更优雅一些。</p><p>不过这也是正常的，二哥刚入行的时候写的代码也是这样，这几年慢慢接触了一些开源工具类，逐渐积累，现在写代码一般会直接用工具类替换自己实现的这些繁琐的逻辑。</p><p>今天就算是抛砖引玉，给球友们分享几个常用的工具类，希望能帮助到刚入行的球友。其他<strong>编程老司机</strong>如果还有其他好用的工具类，也欢迎分享出来。</p><p>今天主要分享的事字符串相关、日期相关、IO 相关、集合/数组相关和计时相关的工具类，后续持续更新。</p><h2 id="一、字符串相关工具类" tabindex="-1"><a class="header-anchor" href="#一、字符串相关工具类" aria-hidden="true">#</a> 一、字符串相关工具类</h2><p>Java 中的 String 应该是日常用的最多一个类吧，平常我们很多代码需要围绕 String 做一些处理。</p><p>JDK 提供的 String API 虽然比较多，但是功能比较基础，通常我们需要结合 String 多写个方法才能完成一个业务功能。</p><p>下面介绍一下 Apache 提供的一个工具类 StringUtils.</p><p>Maven Pom 信息如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.apache.commons&lt;/groupId&gt;
    &lt;artifactId&gt;commons-lang3&lt;/artifactId&gt;
    &lt;version&gt;3.10&lt;/version&gt;
&lt;/dependency&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>commons-lang 有两个版本，一个是 commons-lang3 ，一个是 commons-lang。commons-lang 是老版本，已经很久没有维护了。commons-lang3 是一直在维护的版本，推荐直接使用这个版本。</p></blockquote><h3 id="判断字符串是否为空" tabindex="-1"><a class="header-anchor" href="#判断字符串是否为空" aria-hidden="true">#</a> 判断字符串是否为空</h3><p>判断字符串是否为空，估计大家都这么写过吧：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (null == str || str.isEmpty()) {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这段代码非常简单，但是说实话，很容易犯过空指针的异常。</p><p>使用 StringUtils，上面代码可以替换成下面这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (StringUtils.isEmpty(str)) {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>StringUtils 内部还有一个方法 <code>isBlank</code>，也是用来判断字符串是否为空，两个方法比较相近，容易搞混，主要区别如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 如果字符串都是空格的话，
StringUtils.isBlank(&quot; &quot;)       = true;
StringUtils.isEmpty(&quot; &quot;)       = false；   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断字符串是否为空，使用频率非常高，这里大家可以使用 IDEA Prefix 的功能，输入直接生成判空语句。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qiuqnlfyzzjsxzxljlkygjlfxm-c4ae886a-15bf-463e-9601-27a9d9b1bd33.jpg" alt="" loading="lazy"></p><h3 id="字符串固定长度" tabindex="-1"><a class="header-anchor" href="#字符串固定长度" aria-hidden="true">#</a> 字符串固定长度</h3><p>这个通常用于字符串需要固定长度的场景，比如需要固定长度字符串作为流水号，若流水号长度不足，左边补 0 。</p><p>可以使用 <code>String#format</code> 方法，不过比较麻烦，这里可以使用：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 字符串固定长度 8位，若不足，往左补 0
StringUtils.leftPad(&quot;test&quot;, 8, &quot;0&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>另外还有一个 <code>StringUtils#rightPad</code>，这个方法与上面方法正好相反。</p><h3 id="字符串关键字替换" tabindex="-1"><a class="header-anchor" href="#字符串关键字替换" aria-hidden="true">#</a> 字符串关键字替换</h3><p><code>StringUtils</code> 提供了一系列的方法，可以替换某些关键字：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 默认替换所有关键字
StringUtils.replace(&quot;aba&quot;, &quot;a&quot;, &quot;z&quot;)   = &quot;zbz&quot;;
// 替换关键字，仅替换一次
StringUtils.replaceOnce(&quot;aba&quot;, &quot;a&quot;, &quot;z&quot;)   = &quot;zba&quot;;
// 使用正则表达式替换
StringUtils.replacePattern(&quot;ABCabc123&quot;, &quot;[^A-Z0-9]+&quot;, &quot;&quot;)   = &quot;ABC123&quot;；
....   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串拼接" tabindex="-1"><a class="header-anchor" href="#字符串拼接" aria-hidden="true">#</a> 字符串拼接</h3><p>字符串拼接是个常见的需求，简单点可以使用 <code>StringBuilder</code> 循环遍历拼接：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String[] array = new String[]{&quot;test&quot;, &quot;1234&quot;, &quot;5678&quot;};
StringBuilder stringBuilder = new StringBuilder();

for (String s : array) {
    stringBuilder.append(s).append(&quot;;&quot;);
}
// 防止最终拼接字符串为空 
if (stringBuilder.length() &gt; 0) {
    stringBuilder.deleteCharAt(stringBuilder.length() - 1);
}
System.out.println(stringBuilder.toString());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过这样的太不太优雅，也很容易抛出 <code>StringIndexOutOfBoundsException</code>。</p><p>这里我们可以直接使用以下方法拼接字符串：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>StringUtils.join([&quot;a&quot;, &quot;b&quot;, &quot;c&quot;], &quot;,&quot;)    = &quot;a,b,c&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>StringUtils</code> 只能传入数组拼接字符串（），不过我比较喜欢集合拼接，所以再推荐下 Guava 的 <code>Joiner</code>。</p><p>实例代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>String[] array = new String[]{&quot;test&quot;, &quot;1234&quot;, &quot;5678&quot;};
List&lt;String&gt; list=new ArrayList&lt;&gt;();
list.add(&quot;test&quot;);
list.add(&quot;1234&quot;);
list.add(&quot;5678&quot;);
StringUtils.join(array, &quot;,&quot;);

// 逗号分隔符，跳过 null
Joiner joiner=Joiner.on(&quot;,&quot;).skipNulls();
joiner.join(array);
joiner.join(list);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于字符串拼接内部的工作原理，可以参考《Java 程序员进阶之路》上的帖子：</p>`,40),u={href:"https://tobebetterjavaer.com/string/join.html",target:"_blank",rel:"noopener noreferrer"},v=a(`<h3 id="字符串拆分" tabindex="-1"><a class="header-anchor" href="#字符串拆分" aria-hidden="true">#</a> 字符串拆分</h3><p>有字符串拼接，就会有拆分字符串的需求，同样的 <code>StringUtils</code> 也有拆分字符串的方法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>StringUtils.split(&quot;a..b.c&quot;, &#39;.&#39;)   = [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;]
StringUtils.splitByWholeSeparatorPreserveAllTokens(&quot;a..b.c&quot;, &quot;.&quot;)= [&quot;a&quot;,&quot;&quot;, &quot;b&quot;, &quot;c&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>ps：注意以上两个方法区别。</p></blockquote><p><code>StringUtils</code> 拆分之后得到的是一个数组，我们也可以使用 Guava 中的方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Splitter splitter = Splitter.on(&quot;,&quot;);
// 返回是一个 List 集合，结果：[ab, , b, c]
splitter.splitToList(&quot;ab,,b,c&quot;);
// 忽略空字符串，输出结果 [ab, b, c]
splitter.omitEmptyStrings().splitToList(&quot;ab,,b,c&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>StringUtils</code> 内部还有其他常用的方法，小伙伴可以自行查看其 API。</p><p>关于字符串拆分内部的工作原理，可以参考《Java 程序员进阶之路》上的帖子：</p>`,8),m={href:"https://tobebetterjavaer.com/string/split.html",target:"_blank",rel:"noopener noreferrer"},b=a(`<h2 id="二、日期相关工具类" tabindex="-1"><a class="header-anchor" href="#二、日期相关工具类" aria-hidden="true">#</a> 二、日期相关工具类</h2><h3 id="dateutils-dateformatutils" tabindex="-1"><a class="header-anchor" href="#dateutils-dateformatutils" aria-hidden="true">#</a> DateUtils/DateFormatUtils</h3><p>JDK8 之前，Java 只提供一个 <code>Date</code> 类，平常我们需要将 <code>Date</code> 按照一定格式转化成字符串，我们需要使用 <code>SimpleDateFormat</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SimpleDateFormat simpleDateFormat=new SimpleDateFormat(&quot;yyyy-MM-dd HH:mm:ss&quot;);
// Date 转 字符串
simpleDateFormat.format(new Date());
// 字符串 转 Date
simpleDateFormat.parse(&quot;2020-05-07 22:00:00&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码虽然简单，但是这里需要注意 <code>SimpleDateFormat</code>，不是线程安全的，多线程环境一定要注意使用安全。</p><p>这里二哥推荐  <strong>commons-lang3</strong> 下的时间工具类<code>DateUtils/DateFormatUtils</code> 解决 Date 与字符串转化问题。</p><p>使用方法非常简单：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Date 转化为字符串
DateFormatUtils.format(new Date(),&quot;yyyy-MM-dd HH:mm:ss&quot;);
// 字符串 转 Date
DateUtils.parseDate(&quot;2022-11-02 22:00:00&quot;,&quot;yyyy-MM-dd HH:mm:ss&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了格式转化之外，<code>DateUtils</code> 还提供时间计算的相关功能。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Date now = new Date();
// Date 加 1 天
Date addDays = DateUtils.addDays(now, 1);
// Date 加 33 分钟
Date addMinutes = DateUtils.addMinutes(now, 33);
// Date 减去 233 秒
Date addSeconds = DateUtils.addSeconds(now, -233);
// 判断是否 Wie 同一天
boolean sameDay = DateUtils.isSameDay(addDays, addMinutes);
// 过滤时分秒,若 now 为 2022-11-02 22:13:00 调用 truncate 方法以后
// 返回时间为 2022-11-02 00:00:00
Date truncate = DateUtils.truncate(now, Calendar.DATE);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jdk8-时间类" tabindex="-1"><a class="header-anchor" href="#jdk8-时间类" aria-hidden="true">#</a> JDK8 时间类</h3><p>JDK8 之后，Java 将日期与时间分为 <code>LocalDate</code>，<code>LocalTime</code>，功能定义更加清晰，当然其也提供一个 <code>LocalDateTime</code>，包含日期与时间。这些类相对于 Date 类优点在于，这些类与 <code>String</code> 类一样都是不变类型，不但线程安全，而且不能修改。</p><blockquote><p>ps：仔细对比 MySQL 时间日期类型 <code>DATE</code>，<code>TIME</code>，<code>DATETIME</code>，有没有感觉差不多？</p></blockquote><p>现在 MyBatis 等 ORM 框架已经支持 <code>LocalDate</code> 与 JDBC 时间类型转化，所以大家可以直接将时间字段实际类型定义为 JDK8 时间类型，然后再进行相关转化。</p><p>如果依然使用的是 Date 类型，需要相关转化，稍微复杂一点。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Date now = new Date();
// Date-----&gt; LocalDateTime 这里指定使用当前系统默认时区
LocalDateTime localDateTime = now.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
// LocalDateTime------&gt; Date 这里指定使用当前系统默认时区
Date date = Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来我们使用 <code>LocalDateTime</code> 进行字符串格式化。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 按照 yyyy-MM-dd HH:mm:ss 转化时间
LocalDateTime dateTime = LocalDateTime.parse(&quot;2022-11-02 22:34:00&quot;, DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;));
// 将 LocalDateTime 格式化字符串
String format = DateTimeFormatter.ofPattern(&quot;yyyy-MM-dd HH:mm:ss&quot;).format(dateTime);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外我们使用 <code>LocalDateTime</code> 获取当前时间年份，月份特别简单：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>LocalDateTime now = LocalDateTime.now();
// 年
int year = now.getYear();
// 月
int month = now.getMonthValue();
// 日
int day = now.getDayOfMonth();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后我们还可以使用 <code>LocalDateTime</code> 进行日期加减，获取下一天的时间：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>LocalDateTime now = LocalDateTime.now();
// 当前时间加一天
LocalDateTime plusDays = now.plusDays(1l);
// 当前时间减一个小时
LocalDateTime minusHours = now.minusHours(1l);
// 还有很多其他方法
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总之 JDK8 提供的时间类非常好用，还没用过的球友，可以尝试下。</p><h2 id="三、集合-数组相关" tabindex="-1"><a class="header-anchor" href="#三、集合-数组相关" aria-hidden="true">#</a> 三、集合/数组相关</h2><p>集合与数组也经常使用，也需要对其进行判空：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>if (null == list || list.isEmpty()) {

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>ps: 数组、Map、集合类似</p></blockquote><p>上面的代码和字符串判空一样写起来都非常简单，但是都比较容易抛出空指针异常。这里我们可以使用 <strong>commons-collections</strong> 提供工具类。</p><p>pom 信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.apache.commons&lt;/groupId&gt;
    &lt;artifactId&gt;commons-collections4&lt;/artifactId&gt;
    &lt;version&gt;4.4&lt;/vesion&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用 <code>CollectionUtils/MapUtils</code>进行判空判断。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// List/Set 集合判空
if(CollectionUtils.isEmpty(list)){

}
// Map 等集合进行判空
if (MapUtils.isEmpty(map)) {
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至于数组判空判断需要使用 <code>commons-lang</code> 下的 <code>ArrayUtils</code>进行判断:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 数组判空
if (ArrayUtils.isEmpty(array)) {
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外还有一些列的对于集合增强方法，比如快速将数组加入到现有集合中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>List&lt;String&gt; listA = new ArrayList&lt;&gt;();
listA.add(&quot;1&quot;);
listA.add(&quot;2&quot;);
listA.add(&quot;3&quot;);
String[] arrays = new String[]{&quot;a&quot;, &quot;b&quot;, &quot;c&quot;};
CollectionUtils.addAll(listA, arrays);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、i-o-相关" tabindex="-1"><a class="header-anchor" href="#四、i-o-相关" aria-hidden="true">#</a> 四、I/O 相关</h2><p>JDK 提供了一系列的类用于读写文件，不过二哥觉得那些类有些晦涩难懂，实现一个小功能可能要写好多代码，而且还不一定能写对。</p><p>这里推荐一下 Apache 提供的 <code>commons-io</code> 库，增强 I/O 操作，简化操作难度。pom 信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;commons-io&lt;/groupId&gt;
    &lt;artifactId&gt;commons-io&lt;/artifactId&gt;
    &lt;version&gt;2.6&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fileutils-文件操作工具类" tabindex="-1"><a class="header-anchor" href="#fileutils-文件操作工具类" aria-hidden="true">#</a> FileUtils-文件操作工具类</h3><p>文件操作工具类提供一系列方法，可以让我们快速读写文件。</p><p>快速实现文件/文件夹拷贝操作，<code>FileUtils.copyDirectory/FileUtils.copyFile</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 拷贝文件
File fileA = new File(&quot;E:\\\\test\\\\test.txt&quot;);
File fileB = new File(&quot;E:\\\\test1\\\\test.txt&quot;);
FileUtils.copyFile(fileA,fileB);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>FileUtils.listFiles</code> 获取指定文件夹上所有文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 按照指定文件后缀如java,txt等去查找指定文件夹的文件
File directory = new File(&quot;E:\\\\test&quot;);
FileUtils.listFiles(directory, new String[]{&quot;txt&quot;}, false);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>FileUtils.readLines</code> 读取该文件所有行。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 读取指定文件所有行 不需要使用 while 循环读取流了
List&lt;String&gt; lines = FileUtils.readLines(fileA)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>有读就存在写，可以使用 <code>FileUtils.writeLines</code>，直接将集合中数据，一行行写入文本。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 可以一行行写入文本
List&lt;String&gt; lines = new ArrayList&lt;&gt;();
.....
FileUtils.writeLines(lines)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ioutils-i-o-操作相关工具类" tabindex="-1"><a class="header-anchor" href="#ioutils-i-o-操作相关工具类" aria-hidden="true">#</a> IOUtils-I/O 操作相关工具类</h3><p><code>FileUtils</code> 主要针对相关文件操作，<code>IOUtils</code> 更加针对底层 I/O，可以快速读取 <code>InputStream</code>。实际上 <code>FileUtils</code> 底层操作依赖就是 <code>IOUtils</code>。</p><p>来看支付场景下，我们使用 JDK 原生方法是如何获取 HTTP 异步通知的:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>byte[] b = null;
ByteArrayOutputStream baos = null;
String respMsg = null;
try {
    byte[] buffer = new byte[1024];
    baos = new ByteArrayOutputStream();
   // 获取输入流
    InputStream in = request.getInputStream();
    for (int len = 0; (len = in.read(buffer)) &gt; 0; ) {
        baos.write(buffer, 0, len);
    }
    b = baos.toByteArray();
    baos.close();
   // 字节数组转化成字符串
    String reqMessage = new String(b, &quot;utf-8&quot;);
} catch (IOException e) {
  
} finally {
    if (baos != null) {
        try {
            baos.close();
        } catch (IOException e) {
           
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码看起来还是挺复杂的。不过我们可以使用 <code>IOUtils</code>，一个方法就可以简单搞定：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 将输入流信息全部输出到字节数组中
byte[] b = IOUtils.toByteArray(request.getInputStream());
// 将输入流信息转化为字符串
String resMsg = IOUtils.toString(request.getInputStream());
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>ps: InputStream 不能被重复读取</p></blockquote><h2 id="五、计时" tabindex="-1"><a class="header-anchor" href="#五、计时" aria-hidden="true">#</a> 五、计时</h2><p>编程中有时需要统计代码的的执行耗时，代码非常简单，结束时间与开始时间相减即可。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>long start = System.currentTimeMillis();   //获取开始时间

//其他代码
//...
long end = System.currentTimeMillis(); //获取结束时间

System.out.println(&quot;程序运行时间： &quot; + (end - start) + &quot;ms&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然代码很简单，但是非常不灵活，默认情况我们只能获取 ms 单位，如果需要转换为秒/分钟，就需要另外再计算。</p><p>这里介绍一下 Guava 的 <code>Stopwatch</code> 计时工具类，借助他统计程序执行时间，使用方式非常灵活。</p><blockquote><p>commons-lang3 与 Spring-core 也有这个工具类，使用方式大同小异，大家根据情况选择。</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 创建之后立刻计时，若想主动开始计时
Stopwatch stopwatch = Stopwatch.createStarted();
// 创建计时器，但是需要主动调用 start 方法开始计时
// Stopwatch stopwatch = Stopwatch.createUnstarted();
// stopWatch.start();
// 模拟其他代码耗时
TimeUnit.SECONDS.sleep(2l);

// 当前已经消耗的时间
System.out.println(stopwatch.elapsed(TimeUnit.SECONDS));;

TimeUnit.SECONDS.sleep(2l);

// 停止计时 未开始的计时器调用 stop 将会抛错 IllegalStateException
stopwatch.stop();
// 再次统计总耗时
System.out.println(stopwatch.elapsed(TimeUnit.SECONDS));;
// 重新开始，将会在原来时间基础计算，若想重新从 0开始计算，需要调用 stopwatch.reset()
stopwatch.start();
TimeUnit.SECONDS.sleep(2l);
System.out.println(stopwatch.elapsed(TimeUnit.SECONDS));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果为：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>2
4
6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>今天就权当抛砖引玉，介绍了字符串、日期、数组/集合、I/O、计时等工具类，简化日常业务代码。后续会持续补充，大家在日常开发中也要注意积累自己的工具类，方便后面用到的时候可以不用重复造轮子。</p><p>当然了，<strong>对于工具类，最好不要只停留在会用的层面上，还是要去看它的内部实现，那里面才是编程的精华，很能提升我们的代码能力</strong>。</p>`,69),p={href:"https://mp.weixin.qq.com/s?__biz=MzkzODE3OTI0Ng==&mid=2247490962&idx=1&sn=10856b0360f777bdf6c1e9c2adf3cdef&source=41#wechat_redirect",target:"_blank",rel:"noopener noreferrer"};function g(h,x){const n=r("ExternalLinkIcon");return s(),l("div",null,[o,e("blockquote",null,[e("p",null,[e("a",u,[i("https://tobebetterjavaer.com/string/join.html"),t(n)])])]),v,e("blockquote",null,[e("p",null,[e("a",m,[i("https://tobebetterjavaer.com/string/split.html"),t(n)])])]),b,e("blockquote",null,[e("p",null,[i("参考链接："),e("a",p,[i("https://mp.weixin.qq.com/s?__biz=MzkzODE3OTI0Ng==&mid=2247490962&idx=1&sn=10856b0360f777bdf6c1e9c2adf3cdef&source=41#wechat_redirect"),t(n)]),i("，出处：Java 极客技术，整理：沉默王二")])])])}const D=d(c,[["render",g],["__file","qiuqnlfyzzjsxzxljlkygjlfxm.html.vue"]]);export{D as default};
