import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as d,a as e,d as n,b as a,e as t,r as v}from"./app.99eb8281.js";const r={},c=t(`<p>我们先来讨论一下为什么需要访问权限控制。考虑两个场景：</p><p>场景 1：工程师 A 编写了一个类 ClassA，但是工程师 A 并不希望 ClassA 被其他类都访问到，该如何处理呢？</p><p>场景 2：工程师 A 编写了一个类 ClassA，其中有两个方法 fun1、fun2，工程师只想让 fun1 对外可见，也就是说，如果别的工程师来调用 ClassA，只可以调用方法 fun1，该怎么处理呢？</p><p>此时，访问权限控制便可以起到作用了。</p><p>在 Java 中，提供了四种访问权限控制：</p><ul><li>默认访问权限（包访问权限）</li><li>public</li><li>private</li><li>protected</li></ul><p>类只可以用默认访问权限和 public 修饰。比如说：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Wanger{}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Wanger{}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但变量和方法则都可以修饰。</p><h2 id="_1-修饰类" tabindex="-1"><a class="header-anchor" href="#_1-修饰类" aria-hidden="true">#</a> 1. 修饰类</h2><ul><li>默认访问权限（包访问权限）：用来修饰类的话，表示该类只对同一个包中的其他类可见。</li><li>public：用来修饰类的话，表示该类对其他所有的类都可见。</li></ul><p>例 1：</p><p>Main.java:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.tobetterjavaer.test1;

public class Main {
	public static void main(String\\[\\] args) {

		People people = new People(&quot;Tom&quot;);
		System.out.println(people.getName());
	}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>People.java</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.tobetterjavaer.test1;

class People {//默认访问权限（包访问权限）

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从代码可以看出，修饰 People 类采用的是默认访问权限，而由于 People 类和 Main 类在同一个包中，因此 People 类对于 Main 类是可见的。</p><p>例子 2：</p><p>People.java</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.tobetterjavaer.test2;

class People {//默认访问权限（包访问权限）

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时 People 类和 Main 类不在同一个包中，会发生什么情况呢？</p><p>下面是 Main 类中的提示的错误：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/bokeyuan-jianxijavazhongdifangwenquanxiankongzhi-154ae82f-72a5-45fc-ad3c-e1eb575d8572.png" alt="" loading="lazy"></p><p>提示 Peolple 类在 Main 类中不可见。从这里就可以看出，如果用默认访问权限去修饰一个类，该类只对同一个包中的其他类可见，对于不同包中的类是不可见的。</p><p>正如上图的快速修正提示所示，将 People 类的默认访问权限更改为 public 的话，People 类对于 Main 类便可见了。</p><h2 id="_2-修饰类的方法和变量" tabindex="-1"><a class="header-anchor" href="#_2-修饰类的方法和变量" aria-hidden="true">#</a> 2. 修饰类的方法和变量</h2><ul><li>默认访问权限（包访问权限）：如果一个类的方法或变量被包访问权限修饰，也就意味着只能在同一个包中的其他类中显示地调用该类的方法或者变量，在不同包中的类中不能显式地调用该类的方法或变量。</li><li>private：如果一个类的方法或者变量被 private 修饰，那么这个类的方法或者变量只能在该类本身中被访问，在类外以及其他类中都不能显式的进行访问。</li><li>protected：如果一个类的方法或者变量被 protected 修饰，对于同一个包的类，这个类的方法或变量是可以被访问的。对于不同包的类，只有继承于该类的类才可以访问到该类的方法或者变量。</li><li>public：被 public 修饰的方法或者变量，在任何地方都是可见的。</li></ul><p>例 3：</p><p>Main.java 没有变化</p><p>People.java</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.tobebetterjavaer.test1;

public class People {

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	String getName() {    //默认访问权限（包访问权限）
		return name;
	}

	void setName(String name) {   //默认访问权限（包访问权限）
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时在 Main 类是可以显示调用方法 getName 和 setName 的。</p><p>但是如果 People 类和 Main 类不在同一个包中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.tobebetterjavaer.test2;    //与Main类处于不同包中

public class People {

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	String getName() {    //默认访问权限（包访问权限）
		return name;
	}

	void setName(String name) {   //默认访问权限（包访问权限）
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时在 Main 类中会提示错误：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/bokeyuan-jianxijavazhongdifangwenquanxiankongzhi-b3e9dc56-53e8-42f1-b8ee-35115edfe7e7.png" alt="" loading="lazy"></p><p>由此可以看出，如果用默认访问权限来修饰类的方法或者变量，则只能在同一个包的其他类中进行访问。</p><p>例 4:</p><p>People.java</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.tobebetterjavaer.test1;

public class People {

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	protected String getName() {
		return name;
	}

	protected void setName(String name) {
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时是可以在 Main 中显示调用方法 getName 和 setName 的。</p><p>如果 People 类和 Main 类处于不同包中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.tobebetterjavaer.test2;

public class People {

	private String name = null;

	public People(String name) {
		this.name = name;
	}

	protected String getName() {
		return name;
	}

	protected void setName(String name) {
		this.name = name;
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>则会在 Main 中报错：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/bokeyuan-jianxijavazhongdifangwenquanxiankongzhi-b1d4b7ed-fc87-47d4-bdd9-3f6a8ea96100.png" alt="" loading="lazy"></p><p>如果在 com.cxh.test1 中定一个类 Man 继承 People，则可以在类 Man 中显示调用方法 getName 和 setName：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>package com.tobebetterjavaer.test1;

import com.tobebetterjavaer.test2.People;

public class Man extends People {

    public Man(String name){
        super(name);
    }

    public String toString() {
        return getName();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>补充一些关于 Java 包和类文件的知识：</p><p>1）Java 中的包主要是为了防止类文件命名冲突以及方便进行代码组织和管理；</p><p>2）对于一个 Java 源代码文件，如果存在 public 类的话，只能有一个 public 类，且此时源代码文件的名称必须和 public 类的名称完全相同。</p><p>另外，如果还存在其他类，这些类在包外是不可见的。如果源代码文件没有 public 类，则源代码文件的名称可以随意命名。</p>`,53),m={href:"https://www.cnblogs.com/dolphin0520/p/3734915.html",target:"_blank",rel:"noopener noreferrer"},u=e("hr",null,null,-1),b=e("strong",null,"数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关",-1),p={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},o=e("p",null,[n("关注二哥的原创公众号 "),e("strong",null,"沉默王二"),n("，回复"),e("strong",null,"111"),n(" 即可免费领取。")],-1),g=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1);function h(x,_){const i=v("ExternalLinkIcon");return s(),d("div",null,[c,e("blockquote",null,[e("p",null,[n("原文链接："),e("a",m,[n("https://www.cnblogs.com/dolphin0520/p/3734915.html"),a(i)]),n(" 作者: Matrix海子，编辑：沉默王二")])]),u,e("p",null,[n("最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 "),b,n(" 等等等等……详情戳："),e("a",p,[n("可以说是2022年全网最全的学习和找工作的PDF资源了"),a(i)])]),o,g])}const j=l(r,[["render",h],["__file","access-control.html.vue"]]);export{j as default};
