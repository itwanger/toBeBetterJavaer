import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as r,a as e,d as n,b as d,e as a,r as t}from"./app.99eb8281.js";const c={},v=a(`<p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-fbfe254a-2e14-4214-aad6-56a53b143cf7.jpg" alt="" loading="lazy"></p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>都说程序员的三大浪漫是：操作系统、编译原理、图形学；最后的图形学确实是特定的专业领域，我们几乎接触不到，所以对我来说换成网络更合适一些，最后再加上一个数据库。</p><p>这四项技术如果都能掌握的话那岂不是在 IT 行业横着走了，加上这几年互联网行业越来越不景气，越底层的技术就越不可能被替代；所以为了给自己的 30+ 危机留点出路，从今年上半年开始我就逐渐开始从头学习编译原理。</p><p>功夫不负有心人，经过近一个月的挑灯夜战，每晚都在老婆的催促下才休息，克服了中途好几次想放弃的冲动，终于现在完成了 GScript 一个预览版。</p><blockquote><p>预览版的意思是语法结构与整体设计基本完成，后续更新也不太会改动这部分内容、但还缺少一些易用功能。</p></blockquote><h2 id="特性" tabindex="-1"><a class="header-anchor" href="#特性" aria-hidden="true">#</a> 特性</h2><p>首先来看看保留环节， GScript 是如何编写 <code>hello world</code> 的。</p><p>hello_world.gs:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>println(&quot;hello world&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>❯ gscript hello_world.gs
hello world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>废话说完了接下来重点聊聊 <code>GScript</code> 所支持的特性了。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-8a0c03dc-551e-4aad-92da-855f7d7246a9.jpg" alt="" loading="lazy"></p><p>后文会重点说明每一个特性。</p><h2 id="例子" tabindex="-1"><a class="header-anchor" href="#例子" aria-hidden="true">#</a> 例子</h2><p>除了刚才提到的 hello world，再来看一个也是示例代码经常演示的<code>打印斐波那契数列</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>void fib(){
    int a = 0;
    int b = 1;
    int fibonacci(){
        int c = a;
        a = b;
        b = a+c;
        return c;
    }
    return fibonacci;
}
func int() f = fib();
for (int i = 0; i &lt; 5; i++){
    println(f());
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0
1
1
2
3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),o={href:"https://go.dev/play/p/NeGuDahW2yP",target:"_blank",rel:"noopener noreferrer"},b=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// fib returns a function that returns
// successive Fibonacci numbers.
func fib() func() int {
 a, b := 0, 1
 return func() int {
  a, b = b, a+b
  return a
 }
}
func main() {
 f := fib()
 // Function calls are evaluated left-to-right.
 fmt.Println(f(), f(), f(), f(), f())
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>都是通过闭包变量实现的，同时也展示了 <code>GScript</code> 对闭包、函数的使用，后文详细介绍闭包的用法。</p><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h2><p><code>GScript</code> 的语法与常见的 <code>Java/Go</code> 类似，所以上手非常简单。</p><h3 id="基本类型" tabindex="-1"><a class="header-anchor" href="#基本类型" aria-hidden="true">#</a> 基本类型</h3><p>先来看看基本类型，目前支持 <code>int/string/float/bool</code> 四种基本类型以及 <code>nil</code> 特殊类型。</p><p>变量声明语法和 <code>Java</code> 类似：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int a=10;
string b,c;
float e = 10.1;
bool f = false;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>个人觉得将类型放在前面，代码阅读起来会更清晰一些，当然这也是个人喜好。</p><h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 声明并初始化
int[] a={1,2,3};
println(a);

// 声明一个空数组并指定大小
int[] table = [4]{};

println();
// 向数组 append 数据
a = append(a,4);
println(a);
for(int i=0;i&lt;len(a);i++){
 println(a[i]);
}

// 通过下标获取数组数据
int b=a[2];
println(b);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实严格来讲这并不算是数组，因为它的底层是用 <code>Go</code> 切片实现的，所以可以动态扩容。</p><p>以这段代码为例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int[] a=[2]{};
println(&quot;数组大小:&quot;+len(a));
a = append(a,1);
println(&quot;数组大小:&quot;+len(a));
println(a);
a[0]=100;
println(a);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>数组大小:2
数组大小:3
[&lt;nil&gt; &lt;nil&gt; 1]
[100 &lt;nil&gt; 1]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="class" tabindex="-1"><a class="header-anchor" href="#class" aria-hidden="true">#</a> Class</h3><p>类的支持非常重要，是实现面向对象的基础，目前还未完全实现面向对象，只实现了数据与函数的封装。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class ListNode{
    int value;
    ListNode next;
    ListNode(int v, ListNode n){
        value =v;
        next = n;
    }
}

// 调用构造函数时不需要使用 new 关键字。
ListNode l1 = ListNode(1, nil);

// 使用 . 调用对象属性或函数。
println(l1.value);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>缺省情况下 <code>class</code> 具有无参构造函数：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class Person{
 int age=10;
 string name=&quot;abc&quot;;
 int getAge(){
  return 100+age;
 }
}

// 无参构造函数
Person xx= Person();
println(xx.age);
assertEqual(xx.age, 10);
println(xx.getAge());
assertEqual(xx.getAge(), 110);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>得益于 <code>class</code> 的实现，结合刚才的数组也可以定义出自定义类型的数组：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 大小为 16 的 Person 数组
Person[] personList = [16]{};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3><p>函数其实分为两类：</p><ul><li>普通的全局函数。</li><li>类的函数。</li></ul><p>本质上没有任何区别，只是所属范围不同而已。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 判断链表是否有环
bool hasCycle(ListNode head){
    if (head == nil){
        return false;
    }
    if (head.next == nil){
        return false;
    }

    ListNode fast = head.next;
    ListNode slow = head;
    bool ret = false;
    for (fast.next != nil){
        if (fast.next == nil){
            return false;
        }
        if (fast.next.next == nil){
            return false;
        }
        if (slow.next == nil){
            return false;
        }
        if (fast == slow){
            ret = true;
            return true;
        }

        fast = fast.next.next;
        slow = slow.next;
    }
    return ret;
}

ListNode l1 = ListNode(1, nil);
bool b1 =hasCycle(l1);
println(b1);
assertEqual(b1, false);

ListNode l4 = ListNode(4, nil);
ListNode l3 = ListNode(3, l4);
ListNode l2 = ListNode(2, l3);
bool b2 = hasCycle(l2);
println(b2);
assertEqual(b2, false);

l4.next = l2;
bool b3 = hasCycle(l2);
println(b3);
assertEqual(b3, true);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里演示了链表是否有环的一个函数，只要有其他语言的使用基础，相信阅读起来没有任何问题。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>add(int a){}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>当函数没有返回值时，可以声明为 void 或直接忽略返回类型。</p></blockquote><h3 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包" aria-hidden="true">#</a> 闭包</h3><p>闭包我认为是非常有意思的一个特性，可以实现很灵活的设计，也是函数式编程的基础。</p><p>所以在 <code>GScript</code> 中函数是作为一等公民存在；因此 <code>GScript</code> 也支持函数类型的变量。</p><p>函数变量声明语法如下：<code>func typeTypeOrVoid &#39;(&#39; typeList? &#39;)&#39;</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 外部变量，全局共享。
int varExternal =10;
func int(int) f1(){
 // 闭包变量对每个闭包单独可见
 int varInner = 20;
 int innerFun(int a){
  println(a);
  int c=100;
  varExternal++;
  varInner++;
  return varInner;
 }
 // 返回函数
 return innerFun;
}

// f2 作为一个函数类型，接收的是一个返回值和参数都是 int 的函数。
func int(int) f2 = f1();
for(int i=0;i&lt;2;i++){
 println(&quot;varInner=&quot; + f2(i) + &quot;, varExternal=&quot; + varExternal);
}
println(&quot;=======&quot;);
func int(int) f3 = f1();
for(int i=0;i&lt;2;i++){
 println(&quot;varInner=&quot; + f3(i) + &quot;, varExternal=&quot; + varExternal);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最终输出如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>0
varInner=21, varExternal=11
1
varInner=22, varExternal=12
=======
0
varInner=21, varExternal=13
1
varInner=22, varExternal=14
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>func int(int) f2 = f1();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以这段代码为例：f2 是一个返回值，入参都为 int 的函数类型；所以后续可以直接当做函数调用 <code>f2(i)</code>.</p><p>例子中将闭包分别赋值给 f2 和 f3 变量，这两个变量中的闭包数据也是互相隔离、互不影响的，所有基于这个特性甚至还是实现面向对象。</p><blockquote><p>关于闭包的实现，后续会单独更新一篇。</p></blockquote>`,42),u={href:"https://github.com/crossoverJie/gscript/tree/main/example",target:"_blank",rel:"noopener noreferrer"},m=e("h2",{id:"标准库",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#标准库","aria-hidden":"true"},"#"),n(" 标准库")],-1),p={href:"https://github.com/crossoverJie/gscript/tree/main/internal",target:"_blank",rel:"noopener noreferrer"},h=a(`<p>目前实现的标准库并不多，这完全是一个体力活；基于现有的语法和基础数据类型，几乎可以实现大部分的数据结构了，所以感兴趣的朋友也欢迎来贡献标准库代码；比如 <code>Stack</code>、<code>Set</code> 之类的数据结构。</p><h3 id="mapstring" tabindex="-1"><a class="header-anchor" href="#mapstring" aria-hidden="true">#</a> MapString</h3><p>以这个 <code>MapString</code> 为例：键值对都为 <code>string</code> 的 <code>HashMap</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int count =100;
MapString m1 = MapString();
for (int i=0;i&lt;count;i++){
 string key = i+&quot;&quot;;
 string value = key;
 m1.put(key,value);
}
println(m1.getSize());
assertEqual(m1.getSize(),count);

for (int i=0;i&lt;count;i++){
 string key = i+&quot;&quot;;
 string value = m1.get(key);
 println(&quot;key=&quot;+key+ &quot;:&quot;+ value);
 assertEqual(key,value);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用起来和 <code>Java</code> 的 <code>HashMap</code> 类似，当然他的实现源码也是参考的 jdk1.7 的 <code>HashMap</code>。</p><blockquote><p>由于目前并有一个类似于 Java 的 <code>object</code> 或者是 go 中的 <code>interface{}</code>, 所以如果需要存放 int，那还得实现一个 MapInt，不过这个通用类型很快会实现。</p></blockquote><h3 id="内置函数" tabindex="-1"><a class="header-anchor" href="#内置函数" aria-hidden="true">#</a> 内置函数</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>int[] a={1,2,3};
// len 返回数组大小
println(len(a));

// 向数组追加数据
a = append(a,4);
println(a);
// output: [1,2,3,4]

// 断言函数，不相等时会抛出运行时异常，并中断程序。
assertEqual(len(a),4);

// 返回 hashcode
int hashcode = hash(key);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也内置了一些基本函数，当然也这不是由 <code>GScript</code> 源码实现的，而是编译器实现的，所以新增起来要稍微麻烦一些；后续会逐步完善，比如和 IO 相关的内置函数。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>现阶段的 <code>GScript</code> 还有许多功能没有完善，比如 JSON、网络库、更完善的语法检查、编译报错信息等；现在拿来刷刷 <code>LeetCode</code> 还是没有问题的。</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-47b5eaba-3fb8-41e7-96ff-e5ef97ffd988.jpg" alt="" loading="lazy"></p><p>从这 65 个 todo 就能看出还有很长的路要走，我对它的终极目标就是可以编写一个网站那就算是一个成熟的语言了。</p><p>目前还有一个问题是没有集成开发环境，现在的开发体验和白板上写代码相差无异，所以后续有时间的话尝试写一个 VS Code 的插件，至少能有语法高亮与提示。</p><p>最后对 <code>GScript</code> 或者是编译原理感兴趣的小伙伴可以加我微信一起交流。</p>`,15),g={href:"https://github.com/crossoverJie/gscript",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/crossoverJie/gscript/releases/tag/v0.0.6",target:"_blank",rel:"noopener noreferrer"},x=e("p",null,"[",-1),y=e("p",null,"一门语言的作用域和函数调用是如何实现的",-1),_=e("p",null,"2022-08-17",-1),z=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-b1de8beb-c4f2-4f54-960d-41854bb44c6d.jpg",alt:"",loading:"lazy"})],-1),q={href:"http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485729&idx=1&sn=1407afe2120670e906dfc5dd2c3cf678&chksm=e81907e1df6e8ef7c6e1898240955e1bcb80026241748ca93ae3fb1aafb47775b486c48cdd41&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},k=e("p",null,"[",-1),j=e("p",null,"用 Antlr 重构脚本解释器",-1),w=e("p",null,"2022-08-08",-1),M=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-36d526ef-c152-4a52-9407-b543fb39b722.jpg",alt:"",loading:"lazy"})],-1),N={href:"http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485689&idx=1&sn=456adecd87d8fe7d904193ff50f893ae&chksm=e8190639df6e8f2f6dfb285cc96b2ac9cbca59d11b148145110981b7a95249f42f454fac5e32&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},I=e("p",null,"[",-1),L=e("p",null,"用位运算为你的程序加速",-1),S=e("p",null,"2022-08-01",-1),E=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-49021143-1edd-4f28-bfe1-53a8f75416cb.jpg",alt:"",loading:"lazy"})],-1),G={href:"http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485661&idx=1&sn=70fbd621ae6165ad9049b8667c37bcac&chksm=e819061ddf6e8f0bfb2eb3ca40c404eea64870fd36d1d9814cec8000ba63b3f92332368894c5&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},J=e("p",null,"[",-1),O=e("p",null,"几百行代码实现一个 JSON 解析器",-1),D=e("p",null,"2022-06-28",-1),V=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-65f541be-ae36-44dc-8d1f-7b0c3c349049.jpg",alt:"",loading:"lazy"})],-1),A={href:"http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485550&idx=1&sn=496e57f44f194f70d80e8617f0992809&chksm=e81906aedf6e8fb83dc71f66a736c491080b1ce2e0f30dbb699b21f872d684058427d6b02f7e&scene=21#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},C=a('<p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-4ca1dcd6-56b7-4b36-ac99-3568a9632671.jpg" alt="" loading="lazy"></p><p><strong>点分享</strong></p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-6c493bc3-f0e7-431c-8d43-e1ef56d4bcc3.jpg" alt="" loading="lazy"></p><p><strong>点收藏</strong></p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-b2a3d350-b516-4f76-bbfc-7edb369d29d1.jpg" alt="" loading="lazy"></p><p><strong>点点赞</strong></p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-zhongysxlymzyzjdbcyy-24674baf-8222-4fb7-9c43-c5d25daf9a39.jpg" alt="" loading="lazy"></p><p><strong>点在看</strong></p>',8),P={href:"https://mp.weixin.qq.com/s/ylMKn9dIVv5FMnpvVi1AnA",target:"_blank",rel:"noopener noreferrer"};function Q(F,B){const i=t("ExternalLinkIcon");return l(),r("div",null,[v,e("p",null,[n("整体写法与 Go 官方推荐的类似："),e("a",o,[n("https://go.dev/play/p/NeGuDahW2yP"),d(i)])]),b,e("p",null,[n("更多样例请参考："),e("a",u,[n("https://github.com/crossoverJie/gscript/tree/main/example"),d(i)])]),m,e("p",null,[n("标准库源码："),e("a",p,[n("https://github.com/crossoverJie/gscript/tree/main/internal"),d(i)])]),h,e("p",null,[n("项目源码："),e("a",g,[n("https://github.com/crossoverJie/gscript"),d(i)])]),e("p",null,[n("下载地址："),e("a",f,[n("https://github.com/crossoverJie/gscript/releases/tag/v0.0.6"),d(i)])]),x,y,_,z,e("p",null,[n("]("),e("a",q,[n("http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485729&idx=1&sn=1407afe2120670e906dfc5dd2c3cf678&chksm=e81907e1df6e8ef7c6e1898240955e1bcb80026241748ca93ae3fb1aafb47775b486c48cdd41&scene=21#wechat_redirect"),d(i)]),n(")")]),k,j,w,M,e("p",null,[n("]("),e("a",N,[n("http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485689&idx=1&sn=456adecd87d8fe7d904193ff50f893ae&chksm=e8190639df6e8f2f6dfb285cc96b2ac9cbca59d11b148145110981b7a95249f42f454fac5e32&scene=21#wechat_redirect"),d(i)]),n(")")]),I,L,S,E,e("p",null,[n("]("),e("a",G,[n("http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485661&idx=1&sn=70fbd621ae6165ad9049b8667c37bcac&chksm=e819061ddf6e8f0bfb2eb3ca40c404eea64870fd36d1d9814cec8000ba63b3f92332368894c5&scene=21#wechat_redirect"),d(i)]),n(")")]),J,O,D,V,e("p",null,[n("]("),e("a",A,[n("http://mp.weixin.qq.com/s?__biz=MzIyMzgyODkxMQ==&mid=2247485550&idx=1&sn=496e57f44f194f70d80e8617f0992809&chksm=e81906aedf6e8fb83dc71f66a736c491080b1ce2e0f30dbb699b21f872d684058427d6b02f7e&scene=21#wechat_redirect"),d(i)]),n(")")]),C,e("blockquote",null,[e("p",null,[n("参考链接："),e("a",P,[n("https://mp.weixin.qq.com/s/ylMKn9dIVv5FMnpvVi1AnA"),d(i)]),n("，出处：crossoverJie，整理：沉默王二")])])])}const K=s(c,[["render",Q],["__file","zhongysxlymzyzjdbcyy.html.vue"]]);export{K as default};
