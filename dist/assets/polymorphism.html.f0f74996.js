import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as p,c as e,a as n,d as s,b as c,e as o,r as i}from"./app.99eb8281.js";const l={},u=o(`<p><strong>多态就是指程序中定义的引用变量所指向的具体类型和通过该引用变量发出的方法调用在编译时并不确定，而是在程序运行期间才确定。</strong></p><p><strong>即一个引用变量倒底会指向哪个类的实例对象，该引用变量发出的方法调用到底是哪个类中实现的方法，必须在由程序运行期间才能决定。</strong></p><p><strong>因为在程序运行时才确定具体的类，这样，不用修改源程序代码，就可以让引用变量绑定到各种不同的类实现上，从而导致该引用调用的具体方法随之改变，即不修改程序代码就可以改变程序运行时所绑定的具体代码，让程序可以选择多个运行状态，这就是多态性。</strong></p><p>再具体的分析一下。</p><h2 id="_01、多态是什么" tabindex="-1"><a class="header-anchor" href="#_01、多态是什么" aria-hidden="true">#</a> 01、多态是什么</h2><p>在我刻板的印象里，西游记里的那段孙悟空和二郎神的精彩对战就能很好的解释“多态”这个词：一个孙悟空，能七十二变；一个二郎神，也能七十二变；他们都可以变成不同的形态，但只需要悄悄地喊一声“变”。</p><p>Java的多态是什么呢？其实就是一种能力——同一个行为具有不同的表现形式；换句话说就是，执行一段代码，Java 在运行时能根据对象的不同产生不同的结果。和孙悟空和二郎神都只需要喊一声“变”，然后就变了，并且每次变得还不一样；一个道理。</p><p>多态的前提条件有三个：</p><ul><li>子类继承父类</li><li>子类覆盖父类的方法</li><li>父类引用指向子类对象</li></ul><p>多态的一个简单应用，来看程序清单1-1：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//子类继承父类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Wangxiaoer</span> <span class="token keyword">extends</span> <span class="token class-name">Wanger</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 子类覆盖父类方法</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;记住仇恨，表明我们要奋发图强的心智&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 父类引用指向子类对象</span>
        <span class="token class-name">Wanger</span><span class="token punctuation">[</span><span class="token punctuation">]</span> wangers <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token class-name">Wanger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Wangxiaoer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Wanger</span> wanger <span class="token operator">:</span> wangers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 对象是王二的时候输出：勿忘国耻</span>
            <span class="token comment">// 对象是王小二的时候输出：记住仇恨，表明我们要奋发图强的心智</span>
            wanger<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Wanger</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;勿忘国耻&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_02、多态与后期绑定" tabindex="-1"><a class="header-anchor" href="#_02、多态与后期绑定" aria-hidden="true">#</a> 02、多态与后期绑定</h2><p>现在，我们来思考一个问题：程序清单1-1在执行 <code>wanger.write()</code> 时，由于编译器只有一个 Wanger 引用，它怎么知道究竟该调用父类 Wanger 的 <code>write()</code> 方法，还是子类 Wangxiaoer 的 <code>write()</code> 方法呢？</p><p>答案是在运行时根据对象的类型进行后期绑定，编译器在编译阶段并不知道对象的类型，但是Java的方法调用机制能找到正确的方法体，然后执行出正确的结果。</p><p>多态机制提供的一个重要的好处程序具有良好的扩展性。来看程序清单2-1：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//子类继承父类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Wangxiaoer</span> <span class="token keyword">extends</span> <span class="token class-name">Wanger</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 子类覆盖父类方法</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;记住仇恨，表明我们要奋发图强的心智&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">eat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;我不喜欢读书，我就喜欢吃&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 父类引用指向子类对象</span>
        <span class="token class-name">Wanger</span><span class="token punctuation">[</span><span class="token punctuation">]</span> wangers <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token keyword">new</span> <span class="token class-name">Wanger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Wangxiaoer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Wanger</span> wanger <span class="token operator">:</span> wangers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 对象是王二的时候输出：勿忘国耻</span>
            <span class="token comment">// 对象是王小二的时候输出：记住仇恨，表明我们要奋发图强的心智</span>
            wanger<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Wanger</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;勿忘国耻&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;每周读一本好书&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在程序清单 2-1 中，我们在 Wanger 类中增加了 read() 方法，在 Wangxiaoer 类中增加了eat()方法，但这丝毫不会影响到 write() 方法的调用。write() 方法忽略了周围代码发生的变化，依然正常运行。这让我想起了金庸《倚天屠龙记》里九阳真经的口诀：“他强由他强，清风拂山岗；他横由他横，明月照大江。”</p><p>多态的这个优秀的特性，让我们在修改代码的时候不必过于紧张，因为多态是一项让程序员“将改变的与未改变的分离开来”的重要特性。</p><h2 id="_03、多态与构造器" tabindex="-1"><a class="header-anchor" href="#_03、多态与构造器" aria-hidden="true">#</a> 03、多态与构造器</h2><p>在构造器中调用多态方法，会产生一个奇妙的结果，我们来看程序清单3-1：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Wangxiaosan</span> <span class="token keyword">extends</span> <span class="token class-name">Wangsan</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Wangxiaosan</span><span class="token punctuation">(</span><span class="token keyword">int</span> age<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;王小三的年龄：&quot;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 子类覆盖父类方法</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;我小三上幼儿园的年龄是：&quot;</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">Wangxiaosan</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//      上幼儿园之前</span>
<span class="token comment">//      我小三上幼儿园的年龄是：0</span>
<span class="token comment">//      上幼儿园之后</span>
<span class="token comment">//      王小三的年龄：4</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Wangsan</span> <span class="token punctuation">{</span>
    <span class="token class-name">Wangsan</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;上幼儿园之前&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;上幼儿园之后&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;老子上幼儿园的年龄是3岁半&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出结果上看，是不是有点诧异？明明在创建 Wangxiaosan 对象的时候，年龄传递的是 4，但输出结果既不是“老子上幼儿园的年龄是 3 岁半”，也不是“我小三上幼儿园的年龄是：4”。</p><p>为什么？</p><p>因为在创建子类对象时，会先去调用父类的构造器，而父类构造器中又调用了被子类覆盖的多态方法，由于父类并不清楚子类对象中的属性值是什么，于是把int类型的属性暂时初始化为 0，然后再调用子类的构造器（子类构造器知道王小二的年龄是 4）。</p><h2 id="_04、多态与向下转型" tabindex="-1"><a class="header-anchor" href="#_04、多态与向下转型" aria-hidden="true">#</a> 04、多态与向下转型</h2><p>向下转型是指将父类引用强转为子类类型；这是不安全的，因为有的时候，父类引用指向的是父类对象，向下转型就会抛出 ClassCastException，表示类型转换失败；但如果父类引用指向的是子类对象，那么向下转型就是成功的。</p><p>来看程序清单4-1：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Wangxiaosi extends Wangsi {
    public void write() {
        System.out.println(&quot;记住仇恨，表明我们要奋发图强的心智&quot;);
    }

    public void eat() {
        System.out.println(&quot;我不喜欢读书，我就喜欢吃&quot;);
    }

    public static void main(String[] args) {
        Wangsi[] wangsis = { new Wangsi(), new Wangxiaosi() };

        // wangsis[1]能够向下转型
        ((Wangxiaosi) wangsis[1]).write();
        // wangsis[0]不能向下转型
        ((Wangxiaosi)wangsis[0]).write();
    }
}

class Wangsi {
    public void write() {
        System.out.println(&quot;勿忘国耻&quot;);
    }

    public void read() {
        System.out.println(&quot;每周读一本好书&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,29),d=n("strong",null,"数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关",-1),k={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},r=n("p",null,[s("关注二哥的原创公众号 "),n("strong",null,"沉默王二"),s("，回复"),n("strong",null,"111"),s(" 即可免费领取。")],-1),v=n("p",null,[n("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1);function m(b,g){const a=i("ExternalLinkIcon");return p(),e("div",null,[u,n("p",null,[s("最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 "),d,s(" 等等等等……详情戳："),n("a",k,[s("可以说是2022年全网最全的学习和找工作的PDF资源了"),c(a)])]),r,v])}const h=t(l,[["render",m],["__file","polymorphism.html.vue"]]);export{h as default};
