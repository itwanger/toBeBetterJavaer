import{_ as d}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as l,a as e,d as i,b as n,e as c,r}from"./app.99eb8281.js";const o={},v=c(`<h2 id="package" tabindex="-1"><a class="header-anchor" href="#package" aria-hidden="true">#</a> package</h2><p>在前面的代码中，我们把类和接口命名为<code>Person</code>、<code>Student</code>、<code>Hello</code>等简单名字。</p><p>在团队开发中，如果小明写了一个<code>Person</code>类，小红也写了一个<code>Person</code>类，现在，小白既想用小明的<code>Person</code>，也想用小红的<code>Person</code>，怎么办？</p><p>如果小军写了一个<code>Arrays</code>类，恰好 JDK 也自带了一个<code>Arrays</code>类，如何解决类名冲突？</p><p>在 Java 中，我们使用<code>package</code>来解决名字冲突。</p><p>Java 定义了一种名字空间，称之为包：<code>package</code>。一个类总是属于某个包，类名（比如<code>Person</code>）只是一个简写，真正的完整类名是<code>包名.类名</code>。</p><p>例如：</p><p>小明的<code>Person</code>类存放在包<code>ming</code>下面，因此，完整类名是<code>ming.Person</code>；</p><p>小红的<code>Person</code>类存放在包<code>hong</code>下面，因此，完整类名是<code>hong.Person</code>；</p><p>小军的<code>Arrays</code>类存放在包<code>mr.jun</code>下面，因此，完整类名是<code>mr.jun.Arrays</code>；</p><p>JDK 的<code>Arrays</code>类存放在包<code>java.util</code>下面，因此，完整类名是<code>java.util.Arrays</code>。</p><p>在定义<code>class</code>的时候，我们需要在第一行声明这个<code>class</code>属于哪个包。</p><p>小明的<code>Person.java</code>文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package ming; // 申明包名ming

public class Person {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>小军的<code>Arrays.java</code>文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package mr.jun; // 申明包名mr.jun

public class Arrays {
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Java 虚拟机执行的时候，JVM 只看完整类名，因此，只要包名不同，类就不同。</p><p>包可以是多层结构，用<code>.</code>隔开。例如：<code>java.util</code>。</p><blockquote><p>要特别注意：包没有父子关系。java.util和java.util.zip是不同的包，两者没有任何继承关系。</p></blockquote><p>没有定义包名的<code>class</code>，它使用的是默认包，非常容易引起名字冲突，因此，不推荐不写包名的做法。</p><p>我们还需要按照包结构把上面的 Java 文件组织起来。假设以<code>package_sample</code>作为根目录，<code>src</code>作为源码目录，那么所有文件结构就是：</p><div class="language-ascii line-numbers-mode" data-ext="ascii"><pre class="language-ascii"><code>package_sample
└─ src
    ├─ hong
    │  └─ Person.java
    │  ming
    │  └─ Person.java
    └─ mr
       └─ jun
          └─ Arrays.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即所有 Java 文件对应的目录层次要和包的层次一致。</p><p>编译后的<code>.class</code>文件也需要按照包结构存放。如果使用 IDE，把编译后的<code>.class</code>文件放到<code>bin</code>目录下，那么，编译的文件结构就是：</p><div class="language-ascii line-numbers-mode" data-ext="ascii"><pre class="language-ascii"><code>package_sample
└─ bin
   ├─ hong
   │  └─ Person.class
   │  ming
   │  └─ Person.class
   └─ mr
      └─ jun
         └─ Arrays.class
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译的命令相对比较复杂，我们需要在<code>src</code>目录下执行<code>javac</code>命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>javac -d ../bin ming/Person.java hong/Person.java mr/jun/Arrays.java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 IDE 中，会自动根据包结构编译所有 Java 源码，所以不必担心使用命令行编译的复杂命令。</p><h2 id="包作用域" tabindex="-1"><a class="header-anchor" href="#包作用域" aria-hidden="true">#</a> 包作用域</h2><p>位于同一个包的类，可以访问包作用域的字段和方法。</p><p>不用<code>public</code>、<code>protected</code>、<code>private</code>修饰的字段和方法就是包作用域。例如，<code>Person</code>类定义在<code>hello</code>包下面：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package hello;

public class Person {
    // 包作用域:
    void hello() {
        System.out.println(&quot;Hello!&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Main</code>类也定义在<code>hello</code>包下面，就可以直接访问 Person 类：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package hello;

public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        p.hello(); // 可以调用，因为Main和Person在同一个包
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="import" tabindex="-1"><a class="header-anchor" href="#import" aria-hidden="true">#</a> import</h2><p>在一个<code>class</code>中，我们总会引用其他的<code>class</code>。例如，小明的<code>ming.Person</code>类，如果要引用小军的<code>mr.jun.Arrays</code>类，他有三种写法：</p><p>第一种，直接写出完整类名，例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Person.java
package ming;

public class Person {
    public void run() {
        mr.jun.Arrays arrays = new mr.jun.Arrays();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很显然，每次写完整类名比较痛苦。</p><p>因此，第二种写法是用<code>import</code>语句，导入小军的<code>Arrays</code>，然后写简单类名：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Person.java
package ming;

// 导入完整类名:
import mr.jun.Arrays;

public class Person {
    public void run() {
        Arrays arrays = new Arrays();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在写<code>import</code>的时候，可以使用<code>*</code>，表示把这个包下面的所有<code>class</code>都导入进来（但不包括子包的<code>class</code>）：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Person.java
package ming;

// 导入mr.jun包的所有class:
import mr.jun.*;

public class Person {
    public void run() {
        Arrays arrays = new Arrays();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们一般不推荐这种写法，因为在导入了多个包后，很难看出<code>Arrays</code>类属于哪个包。</p><p>还有一种<code>import static</code>的语法，它可以导入一个类的静态字段和静态方法：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package main;

// 导入System类的所有静态字段和静态方法:
import static java.lang.System.*;

public class Main {
    public static void main(String[] args) {
        // 相当于调用System.out.println(…)
        out.println(&quot;Hello, world!&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>import static</code>很少使用。</p><p>Java 编译器最终编译出的<code>.class</code>文件只使用 <em>完整类名</em>，因此，在代码中，当编译器遇到一个<code>class</code>名称时：</p><ul><li>如果是完整类名，就直接根据完整类名查找这个<code>class</code>；</li><li>如果是简单类名，按下面的顺序依次查找： <ul><li>查找当前<code>package</code>是否存在这个<code>class</code>；</li><li>查找<code>import</code>的包是否包含这个<code>class</code>；</li><li>查找<code>java.lang</code>包是否包含这个<code>class</code>。</li></ul></li></ul><p>如果按照上面的规则还无法确定类名，则编译报错。</p><p>我们来看一个例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// Main.java
package test;

import java.text.Format;

public class Main {
    public static void main(String[] args) {
        java.util.List list; // ok，使用完整类名 -&gt; java.util.List
        Format format = null; // ok，使用import的类 -&gt; java.text.Format
        String s = &quot;hi&quot;; // ok，使用java.lang包的String -&gt; java.lang.String
        System.out.println(s); // ok，使用java.lang包的System -&gt; java.lang.System
        MessageFormat mf = null; // 编译错误：无法找到MessageFormat: MessageFormat cannot be resolved to a type
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，编写 class 的时候，编译器会自动帮我们做两个 import 动作：</p><ul><li>默认自动<code>import</code>当前<code>package</code>的其他<code>class</code>；</li><li>默认自动<code>import java.lang.*</code>。</li></ul><blockquote><p>注意：自动导入的是java.lang包，但类似java.lang.reflect这些包仍需要手动导入。</p></blockquote><p>如果有两个<code>class</code>名称相同，例如，<code>mr.jun.Arrays</code>和<code>java.util.Arrays</code>，那么只能<code>import</code>其中一个，另一个必须写完整类名。</p><h2 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践" aria-hidden="true">#</a> 最佳实践</h2><p>为了避免名字冲突，我们需要确定唯一的包名。推荐的做法是使用倒置的域名来确保唯一性。例如：</p><ul><li>org.apache</li><li>org.apache.commons.log</li><li>com.tobebetterjavaer.sample</li></ul><p>子包就可以根据功能自行命名。</p><p>要注意不要和<code>java.lang</code>包的类重名，即自己的类不要使用这些名字：</p><ul><li>String</li><li>System</li><li>Runtime</li><li>...</li></ul><p>要注意也不要和 JDK 常用类重名：</p><ul><li>java.util.List</li><li>java.text.Format</li><li>java.math.BigInteger</li><li>...</li></ul><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><p>Java 内建的<code>package</code>机制是为了避免<code>class</code>命名冲突；</p><p>JDK 的核心类使用<code>java.lang</code>包，编译器会自动导入；</p><p>JDK 的其它常用类定义在<code>java.util.*</code>，<code>java.math.*</code>，<code>java.text.*</code>，……；</p><p>包名推荐使用倒置的域名，例如<code>org.apache</code>。</p><hr>`,70),t={href:"https://www.liaoxuefeng.com/wiki/1252599548343744/1260467032946976",target:"_blank",rel:"noopener noreferrer"},u=e("hr",null,null,-1),m=e("strong",null,"数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关",-1),p={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,[i("关注二哥的原创公众号 "),e("strong",null,"沉默王二"),i("，回复"),e("strong",null,"111"),i(" 即可免费领取。")],-1),g=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1);function h(x,j){const a=r("ExternalLinkIcon");return s(),l("div",null,[v,e("blockquote",null,[e("p",null,[i("参考链接："),e("a",t,[i("https://www.liaoxuefeng.com/wiki/1252599548343744/1260467032946976"),n(a)]),i("，整理：沉默王二")])]),u,e("p",null,[i("最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 "),m,i(" 等等等等……详情戳："),e("a",p,[i("可以说是2022年全网最全的学习和找工作的PDF资源了"),n(a)])]),b,g])}const _=d(o,[["render",h],["__file","package.html.vue"]]);export{_ as default};
