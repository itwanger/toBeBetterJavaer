import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as a,c,a as e,d as i,b as d,e as r}from"./app-1c5b5ce3.js";const t={},o=e("p",null,"当面对复杂问题时，我们常常无从下手，难以找到明确的方向。此时，我通常使用 WWH 方法：What——搞清问题所在；Why——分析问题根本原因、How——如何解决问题。",-1),v=e("p",null,[i("所以就"),e("strong",null,[i("这个系列叫做 "),e("strong",null,"WWH"),i(" ，我会把平时遇到的技术问题和思考整理到这里。")])],-1),b=e("p",null,[i("今天，我们来看看系列的第二篇文章："),e("strong",null,"What - 什么是依赖注入💉？")],-1),p=e("p",null,[e("strong",null,"关注我的公众号“dingtingli-pub”，并回复「依赖注入」，还会给大家提供一份简单的依赖注入框架源码"),i("，供大家学习。")],-1),m=e("p",null,"这个系列之前的文章：",-1),u={href:"http://mp.weixin.qq.com/s?__biz=MzI5NjA1MDQ4NA==&mid=2454608234&idx=1&sn=5b2b7c62d18f01ce5dfa7607bc86a12b&chksm=fbf0b331cc873a275a5f3d42081549feb668e9d1beea7ce78125c0a547728a9cb262ff266194&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},g=r(`<hr><p>当我们编写 Web 后端代码的时候，会用到这样的代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class A {
    private IB _b;

    public A(IB b){
        _b = b;
    }

    public void MethodA(){
        _b.MethodB();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你跟我第一次的感觉相同，可能也会存在这样的困惑：</p><p>在 <code>Class A</code> 中没有任何地方 new <code>Class B</code> 的实例，但是运行的时候，<code>MethodA</code> 中的变量 <code>_b</code> 已经是 <code>Class B</code> 的一个实例了，为什么会这样？</p><p>今天我们就带着疑问，<strong>了解一下依赖注入的来龙去脉</strong>。</p><p>文章从依赖注入的历史出发，分为三个部分：</p><ol><li><strong>依赖倒置原则</strong></li><li><strong>控制反转</strong></li><li><strong>依赖注入</strong></li></ol><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFRq9AZn4we7r4K5pYgEh3OTue7jH6oX8P9hmzF7k2FamNr4mibpWMz4g/640?wx_fmt=jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>依赖注入发展历史</p><h2 id="_1-依赖倒置原则" tabindex="-1"><a class="header-anchor" href="#_1-依赖倒置原则" aria-hidden="true">#</a> 1.依赖倒置原则</h2><p>依赖倒置原则（DIP Dependency Inversion Principle）</p><p>在没有依赖注入的情况下，如果 <code>Class A</code> 调用了 <code>Class B</code> 的方法，这就意味着 <code>Class A</code> 依赖于 <code>Class B</code>。换句话说，在编译时 <code>Class A</code> 将取决于 <code>Class B</code>。</p><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFatncx75Tqrb3grIzOI32pqAS0DmBM39NGcACWEqQlcPe5PKb7Iprkg/640?wx_fmt=jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>直接依赖的编译情况</p><p>代码可以这么编写：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class A {
    private B b；

    public A(){
        b = new B();
    }

    public void MethodA(){
        b.MethodB();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 90 年代的时候，代码差不多都是这么写的。这样的代码有什么问题吗？</p><p>为了准确地回答这个问题，让我们回到 1995 年。“Bob 大叔”（Robert C. Martin）当年提出了——<strong>依赖倒置原则</strong>。</p><p>这个原则有以下两个定义：</p><ol><li><strong>高层模块不应该依赖于低层模块，二者都应该依赖于抽象。</strong></li><li><strong>抽象不应该依赖于细节，细节应该依赖于抽象。</strong></li></ol><p>上面的代码很明显不符合这个原则。那么<strong>怎样才算能符合这个原则？</strong></p><h3 id="依赖倒置原则示例" tabindex="-1"><a class="header-anchor" href="#依赖倒置原则示例" aria-hidden="true">#</a> 依赖倒置原则示例</h3><p>我们来看看 “Bob 大叔” 在他的著作《敏捷软件开发，原则、模式与实践 C# 版》中的一个示例，来深入理解这个原则的具体含义。</p><p>假设有一个控制电水壶（Kettle）温度调节器的软件，该软件可以从一个 I/O 通道中读取当前的温度，并通过向另一个 I/O 通道发送指令来操作电水壶打开或者关闭。</p><p>调节器软件将电水壶的温度控制在一个范围（最低温度 和 最高温度之间）。当温度低于最低温度（minTemp）时，就发送指令打开（Turn On）电水壶。当温度高于最高温度（maxTemp）时，就发送指令关闭（Turn Off）电水壶。</p><p>根据上述需求，代码可以这样写：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//读取温度的 I/O 通道
const byte TERMOMETER = 0x86; 
//操作电水壶开关的 I/O 通道
const byte KETTLE = 0x87; 
// 开电水壶的指令
const byte TURNON = 1; 
//关电水壶的指令
const byte TURNOFF = 0; 

//温度调节器函数
void Regulate(double minTemp, double maxTemp)
{
    for(;;)
    {
        //当温度高于最低温度时，就等待 1 秒中，继续循环。
        while(in(TERMOMETER) &gt; minTemp)
            wait(1);
        //否则就发送指令打开电水壶。
        out(KETTLE,TURNON);

        //当温度低于最高温度时，就等待 1 秒中，继续循环。
        while(in(TERMOMETER) &lt; maxTemp)
            wait(1);
        //否则就发送指令关闭电水壶。
        out(KETTLE,TURNOFF);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个函数的高层意图非常清晰，但是实现的代码中包括了许多底层的细节，<code>in</code> 和 <code>out</code> 函数都是系统底层函数。</p><p>如果其他类型的加热器（Heater）也有同样的调节温度需求，这段代码会因为包括了电水壶的<strong>底层细节无法被重用</strong>。</p><p>如何修改这段代码让它可以重用？这时候就可以使用依赖倒置原则。</p><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFT3PicFGPqj65icdDjHt4xkobVPHoibY4fXI6m8ydStha1U6nVc19FD9KQ/640?wx_fmt=jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>使用依赖倒置的调节器函数</p><p>在图中，可以看到 Regulate 调节器函数接受了两个接口参数：IThermometer 接口可以读取（Read）温度；IHeater 接口可以打开（TurnOn）或者关闭（TurnOff）加热器。</p><p>接口的定义和 Regulate 调节器函数都属于高层模块，函数只需要知道着这两个接口，跟具体加热器的实现细节无关。</p><p>所有的加热器只需实现这两个接口就可以，这些接口的实现属于底层模块。</p><p>这就是依赖关系倒置，高层的 Regulate 调节器函数，不再依赖任何加热器的底层细节，函数本身有了很好的可用性。</p><p>最终 Regulate 调节器函数可以写成下面这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void Regulate(IThermometer t, IHeater h,

        double minTemp, double maxTemp)
{
    for(;;)
    {
        while(t.Read() &gt; minTemp)
            wait(1);
        h.TurnOn();

        while(t.Read() &gt; maxTemp)
            wait(1);
        h.TurnOff();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用依赖倒置原则优化代码" tabindex="-1"><a class="header-anchor" href="#使用依赖倒置原则优化代码" aria-hidden="true">#</a> 使用依赖倒置原则优化代码</h3><p>依赖倒置原则，不仅解释了为什么之前代码的写法不好，而且提出了解决方案。</p><p>让我们再次回到之前的例子中：</p><p>代码 1 <strong>直接依赖</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class A {
    private B b；

    public A(){
        b = new B();
    }

    public void MethodA(){
        b.MethodB();
    }
}

class B {
    public void MethodB(){
        //code of method.
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之前已经提到，在这段代码中 <code>Class A</code> 依赖于 <code>Class B</code>。如果 <code>Class A</code> 是高层模块，如何让 <code>Class A</code> 不依赖于 <code>Class B</code>？</p><p>根据依赖倒置原则，我们可以让 <code>Class A</code> 依赖于 <code>Class B</code> 的抽象 <code>IB</code>。</p><p>代码 2 <strong>依赖倒置</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class A {
    public void MethodA(IB b){
        b.MethodB();
    }
}

interface IB {
    void MethodB();
}

class B : IB {
    public void MethodB(){
        //code of method.
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFWveAvkv5xc8ZACdw4bxjHicS4aZ0ouUicicIREcSugOOPAjKvvNu7Q4gA/640?wx_fmt=jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>依赖倒置的编译情况</p><p>此时，<code>Class A</code> 和 <code>Class B</code> 的<strong>依赖关系反转</strong>了。</p><p><code>Class A</code> 和接口 <code>IB</code> 属于高层模块，<code>Class B</code> 作为接口 <code>IB</code> 的实现属于底层模块。</p><p>但是想要调用 <code>Class A</code> 中的 <code>MethodA</code>，应用程序仍然需要先 new 一个 <code>Class B</code> 的实例。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Test {
    static void Main(){
        A a = new A();
        B b = new B();

        a.MethodA(b);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样的调用关系，在编译时 <code>Class A</code> 依赖于抽象 <code>IB</code>；在运行时，实例 <code>a</code> 仍然直接调用了实例 <code>b</code>，所以应用程序需要事先准备好 <code>Class B</code> 的实例 <code>b</code>。</p><p>这跟我们说的依赖注入有什么关系？让我们带着这个疑问，先进入下一个概念——控制反转 (IoC Inversion of Control)。</p><h2 id="_2-控制反转" tabindex="-1"><a class="header-anchor" href="#_2-控制反转" aria-hidden="true">#</a> 2. 控制反转</h2><p>控制反转 (IoC Inversion of Control)</p><h3 id="直接依赖和依赖倒置运行时的情况" tabindex="-1"><a class="header-anchor" href="#直接依赖和依赖倒置运行时的情况" aria-hidden="true">#</a> 直接依赖和依赖倒置运行时的情况</h3><p>我们回过头来，再看看之前的两段代码。</p><p>代码 1 <strong>直接依赖</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class A {
    private B b；

    public A(){
        b = new B();
    }

    public void MethodA(){
        b.MethodB();
    }
}

class B {
    public void MethodB(){
        //code of method.
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一段代码使用了直接依赖的方式，<code>Class A</code> 依赖于 <code>Class B</code>。<strong>编译时依赖关系顺着运行时执行的方向流动，二者方向是一致的。</strong></p><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFvhERr63pNY5iaQR0PbbmicPZiceiaPIBMRQWmv0uEqGNRc6IvgTACicnXuA/640?wx_fmt=jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>直接依赖编译和运行时的情况</p><p>代码 2 <strong>依赖倒置</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class A {
    public void MethodA(IB b){
        b.MethodB();
    }
}

interface IB {
    void MethodB();
}

class B : IB {
    public void MethodB(){
        //code of method.
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二段代码使用了依赖倒置原则，使得<strong>代码在编译阶段的依赖关系发生了反转</strong>。<code>Class A</code> 在编译时可以调用 <code>Class B</code> 的抽象 <code>IB</code> 上的方法。而在运行时，<code>Class A</code> 的实例仍然直接调用 <code>Class B</code> 的实例。</p><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFojQ0CU7fgItEWa68bfOq1ZAKAzmsuiau6eGGCnbcoUrBswqJwZhFVkA/640?wx_fmt=jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>依赖倒置编译和运行时的情况</p><p><strong>在代码的运行阶段，这两段代码的执行流程是一致的。</strong></p><p>因为，<strong>在传统的面向对象程序中，执行的代码（主函数）需要先实例化对象、再调用方法，这样代码才能继续执行。</strong></p><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFib0zZYicVddjIvxfxSUH6ESHI1LaSL17AUGlzTq0SaevFjKMwWUdT5icA/640?wx_fmt=jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>直接依赖 VS 依赖倒置</p><h3 id="控制反转介绍" tabindex="-1"><a class="header-anchor" href="#控制反转介绍" aria-hidden="true">#</a> 控制反转介绍</h3><p>我们回过头来，看看文章最开始使用的代码示例。</p><p>代码 3 <strong>控制反转</strong>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class A {
    private IB _b;

    public A(IB b){
        _b = b;
    }

    public void MethodA(){
        _b.MethodB();
    }
}

interface IB {
    void MethodB();
}

class B : IB {
    public void MethodB(){
        //code of method.
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码 3 控制反转和代码 2 依赖倒置的结构很类似，所以，很明显代码 3 <strong>控制反转也是符合依赖倒置原则的</strong>。</p><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFKwC4rkmA1HvfGKbb0m39putAh7vrIVrpoc3GP8ricTmkOMMO2jiaOMhQ/640?wx_fmt=jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>依赖倒置 VS 控制反转</p><p>但这两段代码的使用还是不一样，在使用代码 3 控制反转的项目中，开发人员不需要编写任何实例化 Class B 的代码。</p><p>为什么会这样？这时就必须引入控制反转 （IoC Inversion of Control）概念了。</p><h3 id="控制反转的概念" tabindex="-1"><a class="header-anchor" href="#控制反转的概念" aria-hidden="true">#</a> 控制反转的概念</h3><p><strong>控制反转的主要思想是：有一个独立的框架，它可以获得接口 <code>IB</code> 合适的实现类 <code>Class B</code>，并主动创建这个类的实例，再赋值给 <code>Class A</code> 类的一个字段 <code>_b</code>。</strong></p><p>如下图所示：</p><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFU4XCAicxiabMrgnOIjd7ApgibiblYtbIlUdu1kA22YSBdwiaS0otjFagMPQ/640?wx_fmt=jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>控制反转的运行时的情况</p><p>此时，<strong>程序执行的控制流程（先实例化对象、再调用方法），就从应用程序本身转移到了 IoC 框架中</strong>。也就是说，程序的主要控制者发生了反转，从应用程序变成了 IoC 框架。</p><p>从上面的介绍可以看出，框架的一个重要特征是：<strong>用户为框架定义的方法，经常会从框架本身，而不是从用户的应用程序代码中调用。</strong></p><p><strong>这种控制权的倒置有时被称为好莱坞原则：&quot;不要调用我们，我们会调用你（Don&#39;t call me; I&#39;ll call you.）&quot;。</strong></p><p>在协调和安排应用活动的顺序方面，框架往往扮演着主程序的角色。这种控制的倒置使得框架有能力作为可扩展的骨架。</p><h3 id="控制反转的示例" tabindex="-1"><a class="header-anchor" href="#控制反转的示例" aria-hidden="true">#</a> 控制反转的示例</h3><p>带着上面的理论，我们再来看看 代码 3 控制反转中的代码片段：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class A {
    private IB _b;

    public A(IB b){
        _b = b;
    }

    public void MethodA(){
        _b.MethodB();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码中，为框架定义的方法——构造函数 <code>public A(IB b)</code> ，会被框架调用而不是应用程序本身调用。</p><p>这就是为什么我们在项目中看不到任何调用这个构造函数的原因。</p><p>控制反转框架在运行时调用了 <code>Class A</code> 的构造函数，发现参数需要 <code>IB</code> 接口，就找到了接口 <code>IB</code> 合适的实现类 <code>Class B</code>，然后创建了<code>Class B</code> 的实例，最后赋值给构造函数的参数。在这里，<strong>程序执行的控制流程完全发生了转变，从应用程序转移到了控制反转框架中。</strong></p><p>控制反转的发展也经历了很长时间的迭代：</p><p>从 1983 年，Richard E. Sweet 提出好莱坞原则开始；到 1998 年，随着 Java Apache 服务器框架的提出，Stefano Mazzocchi 将控制反转作为框架的主要驱动设计原则之一，普及了这个概念；最后，在 2003 年，Spring、PicoContainer 等框架纷纷实现了控制反转。最终才有了文章最开始展示的那种类型的代码。</p><h2 id="_3-依赖注入" tabindex="-1"><a class="header-anchor" href="#_3-依赖注入" aria-hidden="true">#</a> 3. 依赖注入</h2><p>依赖注入（DI Dependency Injection）</p><p>说了半天，我们还没有提及文章标题中的名词——依赖注入。</p><p>2004 年，Martin Fowler 在他的文章《控制反转容器&amp;依赖注入模式》首次提出了依赖注入这个名词。</p><p>文章中指出，<strong>控制反转这个词太宽泛，并不能很好地解释这个框架的具体实现。作者和 IoC 爱好者们商讨出了一个新的名称：依赖注入（DI Dependency Injection）。</strong></p><p>这个名词很形象地解释了控制反转在运行时发生了什么。比如我们之前的代码 3 中，在运行时，构造函数 <code>public A(IB b)</code> 需要接口 <code>IB</code> 的一个实例，此时框架就像是给函数打针一样，注入了 <code>Class B</code> 的实例。</p><p>下面这幅漫画生动地展现了用户的使用感受。</p><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFLfGiaByw8GXDMpzacC1UsbqjrQzZb18tT4PjKhJU5uyiaM6Dpf1KO03Q/640?wx_fmt=jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>依赖注入漫画</p><p><strong>打个比方，包饺子的时候我们不需要确定具体是什么馅，只管包就行了，在吃饺子的时候，我说想吃韭菜鸡蛋馅的饺子，这时候就有人用针管给我的饺子注入韭菜鸡蛋馅。</strong></p><h2 id="_4-历史演变过程" tabindex="-1"><a class="header-anchor" href="#_4-历史演变过程" aria-hidden="true">#</a> 4. 历史演变过程</h2><p>从上面的描述中我们可以看到，依赖倒置原则是一个软件设计原则，而使用了控制反转的代码都符合这一原则。</p><p><strong>控制反转框架，将程序执行的控制流程从应用程序转移到了框架中。最终使用的感觉就是，开发者在代码中所依赖的对象，会在运行的时候直接注入到相应的方法中去，所以就有了一个新名词——依赖注入。</strong></p><p>整个技术的演变历程如下：</p><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHL1UhkNWAibOlJqInibw9KJicFRq9AZn4we7r4K5pYgEh3OTue7jH6oX8P9hmzF7k2FamNr4mibpWMz4g/640?wx_fmt=jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>依赖注入发展历史</p><p>我们现在明白了依赖倒置设计原则和控制反转框架的功能，你不觉得控制反转框架很神奇，它到底是如何实现这些功能的呢？</p><p><strong>关注我的公众号“dingtingli-pub”，并回复「依赖注入」，提供一份源代码，大家可以详细地了解这些神奇的功能是如何实现的。</strong></p><p>**</p><figure><img src="https://mmbiz.qpic.cn/sz_mmbiz_jpg/FePLEP26kHKMviaiawjFUXE71lZkHR5xf1GdHb3cedw6O5onricJIMawslyoaJicOeMyyJlAjOyFiadXIzFyx0sQHlA/640?wx_fmt=jpeg&amp;wxfrom=5&amp;wx_lazy=1&amp;wx_co=1" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>**</p><hr><p>所有笔记的初稿也已经发布在 github 上，大家可以直接访问：</p>`,123),h={href:"https://github.com/dingtingli/",target:"_blank",rel:"noopener noreferrer"},f=e("p",null,[e("strong",null,"喜欢本篇文章，记得动动小手点个****在看↓↓")],-1),x={href:"https://mp.weixin.qq.com/s/9l-yTmin_nLffnMCvZwbmg",target:"_blank",rel:"noopener noreferrer"};function _(B,A){const n=l("ExternalLinkIcon");return a(),c("div",null,[o,v,b,p,m,e("ol",null,[e("li",null,[e("a",u,[i("Why - 为什么说 JavaScript 更像一门编译型语言"),d(n)])])]),g,e("p",null,[e("a",h,[i("https://github.com/dingtingli/"),d(n)])]),f,e("blockquote",null,[e("p",null,[i("参考链接："),e("a",x,[i("https://mp.weixin.qq.com/s/9l-yTmin_nLffnMCvZwbmg"),d(n)]),i("，出处：dingtingli，整理：沉默王二")])])])}const w=s(t,[["render",_],["__file","whatsysylzr.html.vue"]]);export{w as default};
