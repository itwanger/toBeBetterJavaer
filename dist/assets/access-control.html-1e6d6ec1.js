import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as l,a as n,d as s,b as e,e as o}from"./app-72970f25.js";const i={},u=n("h1",{id:"_5-8-java访问权限修饰符",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_5-8-java访问权限修饰符","aria-hidden":"true"},"#"),s(" 5.8 Java访问权限修饰符")],-1),d={href:"https://javabetter.cn/oo/object-class.html",target:"_blank",rel:"noopener noreferrer"},r=o(`<p>“好的。”三妹应声回答。</p><p>考虑两个场景：</p><p>场景 1：工程师 A 编写了一个类 ClassA，但是工程师 A 并不希望 ClassA 被其他类都访问到，该如何处理呢？</p><p>场景 2：工程师 A 编写了一个类 ClassA，其中有两个方法 fun1、fun2，工程师只想让 fun1 对外可见，也就是说，如果别的工程师来调用 ClassA，只可以调用方法 fun1，该怎么处理呢？</p><p>此时，访问权限控制便可以起到作用了。</p><p>在 Java 中，提供了四种访问权限控制：</p><ul><li>默认访问权限（包访问权限）</li><li>public</li><li>private</li><li>protected</li></ul><p>类只可以用默认访问权限和 public 修饰。比如说：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Wanger</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Wanger</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但变量和方法则都可以修饰。</p><h3 id="_1-修饰类" tabindex="-1"><a class="header-anchor" href="#_1-修饰类" aria-hidden="true">#</a> 1. 修饰类</h3><ul><li>默认访问权限（包访问权限）：用来修饰类的话，表示该类只对同一个包中的其他类可见。</li><li>public：用来修饰类的话，表示该类对其他所有的类都可见。</li></ul><p>例 1：</p><p>Main.java:</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tobetterjavaer<span class="token punctuation">.</span>test1</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span>\\<span class="token punctuation">[</span>\\<span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

		<span class="token class-name">People</span> people <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token string">&quot;Tom&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>people<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>People.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tobetterjavaer<span class="token punctuation">.</span>test1</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">People</span> <span class="token punctuation">{</span><span class="token comment">//默认访问权限（包访问权限）</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从代码可以看出，修饰 People 类采用的是默认访问权限，而由于 People 类和 Main 类在同一个包中，因此 People 类对于 Main 类是可见的。</p><p>例子 2：</p><p>People.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tobetterjavaer<span class="token punctuation">.</span>test2</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">People</span> <span class="token punctuation">{</span><span class="token comment">//默认访问权限（包访问权限）</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时 People 类和 Main 类不在同一个包中，会发生什么情况呢？</p><p>下面是 Main 类中的提示的错误：</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/bokeyuan-jianxijavazhongdifangwenquanxiankongzhi-154ae82f-72a5-45fc-ad3c-e1eb575d8572.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>提示 Peolple 类在 Main 类中不可见。从这里就可以看出，如果用默认访问权限去修饰一个类，该类只对同一个包中的其他类可见，对于不同包中的类是不可见的。</p><p>正如上图的快速修正提示所示，将 People 类的默认访问权限更改为 public 的话，People 类对于 Main 类便可见了。</p><h3 id="_2-修饰方法和变量" tabindex="-1"><a class="header-anchor" href="#_2-修饰方法和变量" aria-hidden="true">#</a> 2. 修饰方法和变量</h3><ul><li>默认访问权限（包访问权限）：如果一个类的方法或变量被包访问权限修饰，也就意味着只能在同一个包中的其他类中显示地调用该类的方法或者变量，在不同包中的类中不能显式地调用该类的方法或变量。</li><li>private：如果一个类的方法或者变量被 private 修饰，那么这个类的方法或者变量只能在该类本身中被访问，在类外以及其他类中都不能显式的进行访问。</li><li>protected：如果一个类的方法或者变量被 protected 修饰，对于同一个包的类，这个类的方法或变量是可以被访问的。对于不同包的类，只有继承于该类的类才可以访问到该类的方法或者变量。</li><li>public：被 public 修饰的方法或者变量，在任何地方都是可见的。</li></ul><p>例 3：</p><p>Main.java 没有变化</p><p>People.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tobebetterjavaer<span class="token punctuation">.</span>test1</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">People</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    <span class="token comment">//默认访问权限（包访问权限）</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>   <span class="token comment">//默认访问权限（包访问权限）</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时在 Main 类是可以显示调用方法 getName 和 setName 的。</p><p>但是如果 People 类和 Main 类不在同一个包中：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tobebetterjavaer<span class="token punctuation">.</span>test2</span><span class="token punctuation">;</span>    <span class="token comment">//与Main类处于不同包中</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">People</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>    <span class="token comment">//默认访问权限（包访问权限）</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>   <span class="token comment">//默认访问权限（包访问权限）</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时在 Main 类中会提示错误：</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/bokeyuan-jianxijavazhongdifangwenquanxiankongzhi-b3e9dc56-53e8-42f1-b8ee-35115edfe7e7.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>由此可以看出，如果用默认访问权限来修饰类的方法或者变量，则只能在同一个包的其他类中进行访问。</p><p>例 4:</p><p>People.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tobebetterjavaer<span class="token punctuation">.</span>test1</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">People</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时是可以在 Main 中显示调用方法 getName 和 setName 的。</p><p>如果 People 类和 Main 类处于不同包中：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tobebetterjavaer<span class="token punctuation">.</span>test2</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">People</span> <span class="token punctuation">{</span>

	<span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

	<span class="token keyword">public</span> <span class="token class-name">People</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>则会在 Main 中报错：</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/bokeyuan-jianxijavazhongdifangwenquanxiankongzhi-b1d4b7ed-fc87-47d4-bdd9-3f6a8ea96100.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果在 com.cxh.test1 中定一个类 Man 继承 People，则可以在类 Man 中显示调用方法 getName 和 setName：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>tobebetterjavaer<span class="token punctuation">.</span>test1</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>tobebetterjavaer<span class="token punctuation">.</span>test2<span class="token punctuation">.</span></span><span class="token class-name">People</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Man</span> <span class="token keyword">extends</span> <span class="token class-name">People</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">Man</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>补充一些关于 Java 包和类文件的知识：</p><p>1）Java 中的包主要是为了防止类文件命名冲突以及方便进行代码组织和管理；</p><p>2）对于一个 Java 源代码文件，如果存在 public 类的话，只能有一个 public 类，且此时源代码文件的名称必须和 public 类的名称完全相同。</p><p>另外，如果还存在其他类，这些类在包外是不可见的。如果源代码文件没有 public 类，则源代码文件的名称可以随意命名。</p><p>“三妹，理解了吧？”我问三妹。</p><p>“是的，很简单，换句话说，不想让别人看的就 private，想让人看的就 public，想同一个班级/部门看的就默认，想让下一级看的就 protected，对吧？哥”三妹很自信地回答。</p><p>“不错不错，总结得有那味了。”</p>`,57),k={href:"https://www.cnblogs.com/dolphin0520/p/3734915.html",target:"_blank",rel:"noopener noreferrer"},v=n("hr",null,null,-1),m={href:"https://github.com/itwanger/toBeBetterJavaer",target:"_blank",rel:"noopener noreferrer"},b={href:"https://javabetter.cn/overview/",target:"_blank",rel:"noopener noreferrer"},g=n("p",null,[s("微信搜 "),n("strong",null,"沉默王二"),s(" 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 "),n("strong",null,"222"),s(" 即可免费领取。")],-1),w=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1);function y(h,j){const a=t("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[s("“我们先来讨论一下为什么需要访问权限控制。其实之前我们在讲"),n("a",d,[s("类和对象"),e(a)]),s("的时候有提到，今天我们来详细地聊一聊，三妹。”我开门见山地说，“三妹，你打开思维导图，记得做笔记哦。”")]),r,n("blockquote",null,[n("p",null,[s("原文链接："),n("a",k,[s("https://www.cnblogs.com/dolphin0520/p/3734915.html"),e(a)]),s(" 作者: Matrix海子，编辑：沉默王二")])]),v,n("p",null,[s("GitHub 上标星 10000+ 的开源知识库《"),n("a",m,[s("二哥的 Java 进阶之路"),e(a)]),s("》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳："),n("a",b,[s("太赞了，GitHub 上标星 10000+ 的 Java 教程"),e(a)])]),g,w])}const x=p(i,[["render",y],["__file","access-control.html.vue"]]);export{x as default};
