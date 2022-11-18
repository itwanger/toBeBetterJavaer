import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as o,a as n,d as s,b as e,e as t,r as c}from"./app.99eb8281.js";const p={},r=n("p",null,"在知乎上看到 R 大的这篇回答，着实感觉需要分享给在座的各位 javaer 们，真心透彻。",-1),d={href:"https://www.zhihu.com/question/52311366/answer/130090347",target:"_blank",rel:"noopener noreferrer"},u=t(`<hr><p>首先是先问是不是再问为什么系列。</p><p>在JDK8u的jdk项目下做个很粗略的搜索：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mymbp:/Users/me/workspace/jdk8u/jdk/src
$ egrep -nr &quot;for \\\\(\\\\s?;\\\\s?;&quot; . | wc -l
     369
mymbp:/Users/me/workspace/jdk8u/jdk/src
$ egrep -nr &quot;while \\\\(true&quot; . | wc -l
     323
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并没有差多少。</p><p>其次，for (;😉 在Java中的来源。个人看法是喜欢用这种写法的人，追根溯源是受到C语言里的写法的影响。这些人不一定是自己以前写C习惯了这样写，而可能是间接受以前写C的老师、前辈的影响而习惯这样写的。</p><p>在C语言里，如果不include某些头文件或者自己声明的话，是没有内建的_Bool / bool类型，也没有TRUE / FALSE / true / false这些_Bool / bool类型值的字面量的。</p><p>所以，假定没有include那些头文件或者自己define出上述字面量，一个不把循环条件写在while (...)括号里的while语句，最常见的是这样：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>while (1) {
    /* ... */
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>…但不是所有人都喜欢看到那个魔数“1”的。</p><p>而用for (;;)来表达不写循环条件（也就是循环体内不用break或goto就会是无限循环）则非常直观——这就是for语句本身的功能，而且不需要写任何魔数。所以这个写法就流传下来了。</p><p>顺带一提，在Java里我是倾向于写while (true)的，不过我也不介意别人在他们自己的项目里写for (;😉。</p><p>=====================================</p><p>至于Java里while (true)与for (;;)哪个“效率更高”。这种规范没有规定的问题，答案都是“看实现”，毕竟实现只要保证语义符合规范就行了，而效率并不在规范管得着的范畴内。</p><p>以Oracle/Sun JDK8u / OpenJDK8u的实现来看，首先看javac对下面俩语句的编译结果：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> i<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

<span class="token comment">/*
  public void foo();
    Code:
      stack=1, locals=2, args_size=1
         0: iconst_0
         1: istore_1
         2: iinc          1, 1
         5: goto          2
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> i<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>\`\`\`

<span class="token comment">/*
  public void bar();
    Code:
      stack=1, locals=2, args_size=1
         0: iconst_0
         1: istore_1
         2: iinc          1, 1
         5: goto          2
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>连javac这种几乎什么优化都不做（只做了Java语言规范规定一定要做的常量折叠，和非常少量别的优化）的编译器，对上面俩版本的代码都生成了一样的字节码。后面到解释执行、JIT编译之类的就不用说了，输入都一样，输出也不会不同。</p><hr><p>分享的最后，二哥简单说几句。</p><p>可能在我们普通人眼中，这种问题完全没有求真的必要性，但 R大认真去研究了，并且得出了非常令人信服的答案。</p><p>所以，牛逼之人必有三连之处啊。</p><p>以后就可以放心大胆在代码里写 <code>for(;;) while(true)</code> 这样的死循环了。</p><hr>`,25),v=n("strong",null,"数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关",-1),m={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,[s("关注二哥的原创公众号 "),n("strong",null,"沉默王二"),s("，回复"),n("strong",null,"111"),s(" 即可免费领取。")],-1),k=n("p",null,[n("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1);function h(g,_){const a=c("ExternalLinkIcon");return l(),o("div",null,[r,n("blockquote",null,[n("p",null,[n("a",d,[s("https://www.zhihu.com/question/52311366/answer/130090347"),e(a)])])]),u,n("p",null,[s("最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 "),v,s(" 等等等等……详情戳："),n("a",m,[s("可以说是2022年全网最全的学习和找工作的PDF资源了"),e(a)])]),b,k])}const x=i(p,[["render",h],["__file","jdk-while-for-wuxian-xunhuan.html.vue"]]);export{x as default};
