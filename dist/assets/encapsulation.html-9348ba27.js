import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as c,c as o,a as n,d as s,b as e,e as i}from"./app-72970f25.js";const l={},u=i(`<h1 id="_5-13-java封装" tabindex="-1"><a class="header-anchor" href="#_5-13-java封装" aria-hidden="true">#</a> 5.13 Java封装</h1><p>“三妹，准备好了没，我们这节来讲 Java 封装，算是 Java 的三大特征之一，理清楚了，对以后的编程有较大的帮助。”我对三妹说。</p><p>“好的，哥，准备好了。”三妹一边听我说，一边迅速地打开了 XMind，看来一边学习一边总结思维导图这个高效的学习方式三妹已经牢记在心了。</p><p>封装从字面上来理解就是包装的意思，专业点就是信息隐藏，<strong>是指利用抽象将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体</strong>。</p><p>数据被保护在类的内部，尽可能地隐藏内部的实现细节，只保留一些对外接口使之与外部发生联系。</p><p>其他对象只能通过已经授权的操作来与这个封装的对象进行交互。也就是说用户是无需知道对象内部的细节（当然也无从知道），但可以通过该对象对外的提供的接口来访问该对象。</p><p>使用封装有 4 大好处：</p><ul><li>1、良好的封装能够减少耦合。</li><li>2、类内部的结构可以自由修改。</li><li>3、可以对成员进行更精确的控制。</li><li>4、隐藏信息，实现细节。</li></ul><p>首先我们先来看两个类。</p><p>Husband.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Husband</span> <span class="token punctuation">{</span>
    
    <span class="token comment">/*
     * 对属性的封装
     * 一个人的姓名、性别、年龄、妻子都是这个人的私有属性
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> sex <span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age <span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Wife</span> wife<span class="token punctuation">;</span>
    
    <span class="token comment">/*
     * setter()、getter()是该对象对外开发的接口
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getSex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setSex</span><span class="token punctuation">(</span><span class="token class-name">String</span> sex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setWife</span><span class="token punctuation">(</span><span class="token class-name">Wife</span> wife<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>wife <span class="token operator">=</span> wife<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Wife.java</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Wife</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> sex<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Husband</span> husband<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getSex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> sex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setSex</span><span class="token punctuation">(</span><span class="token class-name">String</span> sex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sex <span class="token operator">=</span> sex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setHusband</span><span class="token punctuation">(</span><span class="token class-name">Husband</span> husband<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>husband <span class="token operator">=</span> husband<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Husband</span> <span class="token function">getHusband</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> husband<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看得出， Husband 类里面的 wife 属性是没有 <code>getter()</code>的，同时 Wife 类的 age 属性也是没有 <code>getter()</code>方法的。至于理由我想三妹你是懂的。</p><p>没有哪个女人愿意别人知道她的年龄。</p><p>所以封装把一个对象的属性私有化，同时提供一些可以被外界访问的属性的方法，如果不想被外界方法，我们大可不必提供方法给外界访问。</p><p>但是如果一个类没有提供给外界任何可以访问的方法，那么这个类也没有什么意义了。</p><p>比如我们将一个房子看做是一个对象，里面有漂亮的装饰，如沙发、电视剧、空调、茶桌等等都是该房子的私有属性，但是如果我们没有那些墙遮挡，是不是别人就会一览无余呢？没有一点儿隐私！</p><p>因为存在那个遮挡的墙，我们既能够有自己的隐私而且我们可以随意的更改里面的摆设而不会影响到外面的人。</p><p>但是如果没有门窗，一个包裹的严严实实的黑盒子，又有什么存在的意义呢？所以通过门窗别人也能够看到里面的风景。所以说门窗就是房子对象留给外界访问的接口。</p><p>通过这个我们还不能真正体会封装的好处。现在我们从程序的角度来分析封装带来的好处。如果我们不使用封装，那么该对象就没有 <code>setter()</code>和 <code>getter()</code>，那么 Husband 类应该这样写：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Husband</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> name <span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> sex <span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> age <span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Wife</span> wife<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们应该这样来使用它：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Husband</span> husband <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Husband</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
husband<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
husband<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">;</span>
husband<span class="token punctuation">.</span>sex <span class="token operator">=</span> <span class="token string">&quot;男&quot;</span><span class="token punctuation">;</span>    <span class="token comment">//貌似有点儿多余</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是哪天如果我们需要修改 Husband，例如将 age 修改为 String 类型的呢？你只有一处使用了这个类还好，如果你有几十个甚至上百个这样地方，你是不是要改到崩溃。如果使用了封装，我们完全可以不需要做任何修改，只需要稍微改变下 Husband 类的 <code>setAge()</code>方法即可。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Husband</span> <span class="token punctuation">{</span>
    
    <span class="token comment">/*
     * 对属性的封装
     * 一个人的姓名、性别、年龄、妻子都是这个人的私有属性
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> sex <span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> age <span class="token punctuation">;</span>    <span class="token comment">/* 改成 String类型的*/</span>
    <span class="token keyword">private</span> <span class="token class-name">Wife</span> wife<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//转换即可</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/** 省略其他属性的setter、getter **/</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他的地方依然这样引用( <code>husband.setAge(22)</code> )保持不变。</p><p>到了这里我们确实可以看出，<strong>封装确实可以使我们更容易地修改类的内部实现，而无需修改使用了该类的代码</strong>。</p><p>我们再看这个好处：<strong>封装可以对成员变量进行更精确的控制</strong>。</p><p>还是那个 Husband，一般来说我们在引用这个对象的时候是不容易出错的，但是有时你迷糊了，写成了这样：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Husband</span> husband <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Husband</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
husband<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">300</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也许你是因为粗心写成了这样，你发现了还好，如果没有发现那就麻烦大了，谁见过 300 岁的老妖怪啊！</p><p>但是使用封装我们就可以避免这个问题，我们对 age 的访问入口做一些控制(setter)如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Husband</span> <span class="token punctuation">{</span>
    
    <span class="token comment">/*
     * 对属性的封装
     * 一个人的姓名、性别、年龄、妻子都是这个人的私有属性
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> sex <span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age <span class="token punctuation">;</span>    <span class="token comment">/* 改成 String类型的*/</span>
    <span class="token keyword">private</span> <span class="token class-name">Wife</span> wife<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setAge</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>age <span class="token operator">&gt;</span> <span class="token number">120</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;ERROR：error age input....&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">//提示錯誤信息</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/** 省略其他属性的setter、getter **/</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面都是对 setter 方法的控制，其实通过封装我们也能够对对象的出口做出很好的控制。例如性别在数据库中一般都是以 1、0 的方式来存储的，但是在前台我们又不能展示 1、0，这里我们只需要在 <code>getter()</code>方法里面做一些转换即可。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getSexName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">&quot;0&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>sex<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        sexName <span class="token operator">=</span> <span class="token string">&quot;女&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>sex<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        sexName <span class="token operator">=</span> <span class="token string">&quot;男&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> sexName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用的时候我们只需要使用 sexName 即可实现正确的性别显示。同理也可以用于针对不同的状态做出不同的操作。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCzHTML</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>zt<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        czHTML <span class="token operator">=</span> <span class="token string">&quot;&lt;a href=&#39;javascript:void(0)&#39; onclick=&#39;qy(&quot;</span><span class="token operator">+</span>id<span class="token operator">+</span><span class="token string">&quot;)&#39;&gt;启用&lt;/a&gt;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span><span class="token punctuation">{</span>
        czHTML <span class="token operator">=</span> <span class="token string">&quot;&lt;a href=&#39;javascript:void(0)&#39; onclick=&#39;jy(&quot;</span><span class="token operator">+</span>id<span class="token operator">+</span><span class="token string">&quot;)&#39;&gt;禁用&lt;/a&gt;&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> czHTML<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>“好了，关于封装我们就暂时就聊这么多吧。”我喝了一口普洱茶后，对三妹说。</p><p>“好的，哥，我懂了。”</p>`,40),d={href:"https://www.cnblogs.com/chenssy/p/3351835.html",target:"_blank",rel:"noopener noreferrer"},r=n("hr",null,null,-1),k={href:"https://github.com/itwanger/toBeBetterJavaer",target:"_blank",rel:"noopener noreferrer"},v={href:"https://javabetter.cn/overview/",target:"_blank",rel:"noopener noreferrer"},m=n("p",null,[s("微信搜 "),n("strong",null,"沉默王二"),s(" 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 "),n("strong",null,"222"),s(" 即可免费领取。")],-1),b=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1);function g(w,y){const a=t("ExternalLinkIcon");return c(),o("div",null,[u,n("blockquote",null,[n("p",null,[s("参考链接："),n("a",d,[s("https://www.cnblogs.com/chenssy/p/3351835.html"),e(a)]),s("，整理：沉默王二")])]),r,n("p",null,[s("GitHub 上标星 10000+ 的开源知识库《"),n("a",k,[s("二哥的 Java 进阶之路"),e(a)]),s("》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳："),n("a",v,[s("太赞了，GitHub 上标星 10000+ 的 Java 教程"),e(a)])]),m,b])}const x=p(l,[["render",g],["__file","encapsulation.html.vue"]]);export{x as default};
