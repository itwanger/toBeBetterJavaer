import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c as t,a as e,d as i,b as l,e as a,r as v}from"./app.99eb8281.js";const r={},c=a(`<h1 id="java并发编程volatile关键字解析" tabindex="-1"><a class="header-anchor" href="#java并发编程volatile关键字解析" aria-hidden="true">#</a> Java并发编程volatile关键字解析</h1><p>“三妹啊，这节我们来学习 Java 并发编程中的 volatile 关键字，以及容易遇到的坑。”看着三妹好学的样子，我倍感欣慰。</p><p>“好呀，哥。”三妹愉快的答应了。</p><h2 id="volatile-变量的特性" tabindex="-1"><a class="header-anchor" href="#volatile-变量的特性" aria-hidden="true">#</a> volatile 变量的特性</h2><p>volatile 可以保证可见性，但不保证原子性：</p><ul><li>当写一个 volatile 变量时，JMM 会把该线程本地内存中的变量强制刷新到主内存中去；</li><li>这个写操作会导致其他线程中的 volatile 变量缓存无效。</li></ul><h2 id="volatile-禁止指令重排规则" tabindex="-1"><a class="header-anchor" href="#volatile-禁止指令重排规则" aria-hidden="true">#</a> volatile 禁止指令重排规则</h2><p>我们回顾一下，重排序需要遵守一定规则：</p><ul><li>重排序操作不会对存在数据依赖关系的操作进行重排序。比如：a=1;b=a; 这个指令序列，由于第二个操作依赖于第一个操作，所以在编译时和处理器运行时这两个操作不会被重排序。</li><li>重排序是为了优化性能，但是不管怎么重排序，单线程下程序的执行结果不能被改变。比如：a=1;b=2;c=a+b 这三个操作，第一步（a=1)和第二步(b=2)由于不存在数据依赖关系， 所以可能会发生重排序，但是 c=a+b 这个操作是不会被重排序的，因为需要保证最终的结果一定是 c=a+b=3。</li></ul><p>使用 volatile 关键字修饰共享变量可以禁止这种重排序。若用 volatile 修饰共享变量，在编译时，会在指令序列中插入内存屏障来禁止特定类型的处理器重排序，volatile 禁止指令重排序也有一些规则：</p><ul><li>当程序执行到 volatile 变量的读操作或者写操作时，在其前面的操作的更改肯定全部已经进行，且结果已经对后面的操作可见；在其后面的操作肯定还没有进行；</li><li>在进行指令优化时，不能将对 volatile 变量访问的语句放在其后面执行，也不能把 volatile 变量后面的语句放到其前面执行。</li></ul><p>“二哥，能不能通俗地讲讲啊？”</p><p>“也就是说，执行到 volatile 变量时，其前面的所有语句都执行完，后面所有语句都未执行。且前面语句的结果对 volatile 变量及其后面语句可见。”我瞅了了三妹一眼说。</p><h2 id="volatile-禁止指令重排分析" tabindex="-1"><a class="header-anchor" href="#volatile-禁止指令重排分析" aria-hidden="true">#</a> volatile 禁止指令重排分析</h2><p>先看下面未使用 volatile 的代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class ReorderExample {
  int a = 0;
  boolean flag = false;
  public void writer() {
      a = 1;                   //1
      flag = true;             //2
  }
  Public void reader() {
      if (flag) {                //3
          int i =  a * a;        //4
          System.out.println(i);
      }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),u={href:"https://mp.weixin.qq.com/s/s983WflPH7jF0-_SpGRfBg",target:"_blank",rel:"noopener noreferrer"},o=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class ReorderExample {
  int a = 0;
  boolean volatile flag = false;
  public void writer() {
      a = 1;                   //1
      flag = true;             //2
  }
  Public void reader() {
      if (flag) {                //3
          int i =  a * a;        //4
          System.out.println(i);
      }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候，volatile 禁止指令重排序也有一些规则，这个过程建立的 happens before 关系可以分为两类：</p><ol><li>根据程序次序规则，1 happens before 2; 3 happens before 4。</li><li>根据 volatile 规则，2 happens before 3。</li><li>根据 happens before 的传递性规则，1 happens before 4。</li></ol><p>上述 happens before 关系的图形化表现形式如下：</p><p><img src="http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/thread/volatile-f4de7989-672e-43d6-906b-feffe4fb0a9c.jpg" alt="" loading="lazy"></p><p>在上图中，每一个箭头链接的两个节点，代表了一个 happens before 关系:</p><ul><li>黑色箭头表示程序顺序规则；</li><li>橙色箭头表示 volatile 规则；</li><li>蓝色箭头表示组合这些规则后提供的 happens before 保证。</li></ul><p>这里 A 线程写一个 volatile 变量后，B 线程读同一个 volatile 变量。A 线程在写 volatile 变量之前所有可见的共享变量，在 B 线程读同一个 volatile 变量后，将立即变得对 B 线程可见。</p><h2 id="volatile-不适用场景" tabindex="-1"><a class="header-anchor" href="#volatile-不适用场景" aria-hidden="true">#</a> volatile 不适用场景</h2><h3 id="volatile-不适合复合操作" tabindex="-1"><a class="header-anchor" href="#volatile-不适合复合操作" aria-hidden="true">#</a> volatile 不适合复合操作</h3><p>下面是变量自加的示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class volatileTest {
    public volatile int inc = 0;
    public void increase() {
        inc++;
    }
    public static void main(String[] args) {
        final volatileTest test = new volatileTest();
        for(int i=0;i&lt;10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j&lt;1000;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()&gt;1)  //保证前面的线程都执行完
            Thread.yield();
        System.out.println(&quot;inc output:&quot; + test.inc);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试输出：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>inc output:8182
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>“为什么呀？二哥？”三妹疑惑地问。</p><p>“因为 inc++不是一个原子性操作，由读取、加、赋值 3 步组成，所以结果并不能达到 10000。”我耐心地回答。</p><p>“哦，你这样说我就理解了。”三妹点点头。</p><h3 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h3><p>采用 synchronized：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class volatileTest1 {
    public int inc = 0;
    public synchronized void increase() {
        inc++;
    }
    public static void main(String[] args) {
        final volatileTest1 test = new volatileTest1();
        for(int i=0;i&lt;10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j&lt;1000;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()&gt;1)  //保证前面的线程都执行完
            Thread.yield();
        System.out.println(&quot;add synchronized, inc output:&quot; + test.inc);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>采用 Lock：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class volatileTest2 {
    public int inc = 0;
    Lock lock = new ReentrantLock();
    public void increase() {
        lock.lock();
        inc++;
        lock.unlock();
    }
    public static void main(String[] args) {
        final volatileTest2 test = new volatileTest2();
        for(int i=0;i&lt;10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j&lt;1000;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()&gt;1)  //保证前面的线程都执行完
            Thread.yield();
        System.out.println(&quot;add lock, inc output:&quot; + test.inc);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>采用 AtomicInteger：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class volatileTest3 {
    public AtomicInteger inc = new AtomicInteger();
    public void increase() {
        inc.getAndIncrement();
    }
    public static void main(String[] args) {
        final volatileTest3 test = new volatileTest3();
        for(int i=0;i&lt;10;i++){
            new Thread(){
                public void run() {
                    for(int j=0;j&lt;100;j++)
                        test.increase();
                };
            }.start();
        }
        while(Thread.activeCount()&gt;1)  //保证前面的线程都执行完
            Thread.yield();
        System.out.println(&quot;add AtomicInteger, inc output:&quot; + test.inc);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>三者输出都是 1000，如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>add synchronized, inc output:1000
add lock, inc output:1000
add AtomicInteger, inc output:1000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单例模式的双重锁要加volatile" tabindex="-1"><a class="header-anchor" href="#单例模式的双重锁要加volatile" aria-hidden="true">#</a> 单例模式的双重锁要加volatile</h2><p>先看一下单例代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class penguin {
    private static volatile penguin m_penguin = null;
    // 避免通过new初始化对象
    private void penguin() {}
    public void beating() {
        System.out.println(&quot;打豆豆&quot;);
    };
    public static penguin getInstance() {      //1
        if (null == m_penguin) {               //2
            synchronized(penguin.class) {      //3
                if (null == m_penguin) {       //4
                    m_penguin = new penguin(); //5
                }
            }
        }
        return m_penguin;                      //6
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在并发情况下，如果没有 volatile 关键字，在第 5 行会出现问题。instance = new TestInstance();可以分解为 3 行伪代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>a. memory = allocate() //分配内存
b. ctorInstanc(memory) //初始化对象
c. instance = memory   //设置instance指向刚分配的地址
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码在编译运行时，可能会出现重排序从 a-b-c 排序为 a-c-b。在多线程的情况下会出现以下问题。</p><p>当线程 A 在执行第 5 行代码时，B 线程进来执行到第 2 行代码。假设此时 A 执行的过程中发生了指令重排序，即先执行了 a 和 c，没有执行 b。那么由于 A 线程执行了 c 导致 instance 指向了一段地址，所以 B 线程判断 instance 不为 null，会直接跳到第 6 行并返回一个未初始化的对象。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>“好了，三妹，我们来总结一下。”我舒了一口气说。</p><p>volatile 可以保证线程可见性且提供了一定的有序性，但是无法保证原子性。在 JVM 底层 volatile 是采用“内存屏障”来实现的。</p><p>观察加入 volatile 关键字和没有加入 volatile 关键字时所生成的汇编代码发现，加入 volatile 关键字时，会多出一个 lock 前缀指令，lock 前缀指令实际上相当于一个内存屏障（也称内存栅栏），内存屏障会提供 3 个功能：</p><ul><li>它确保指令重排序时不会把其后面的指令排到内存屏障之前的位置，也不会把前面的指令排到内存屏障的后面；即在执行到内存屏障这句指令时，在它前面的操作已经全部完成；</li><li>它会强制将对缓存的修改操作立即写入主存；</li><li>如果是写操作，它会导致其他 CPU 中对应的缓存行无效。</li></ul><p>最后，我们学习了 volatile 不适用的场景，以及解决的方法，并解释了单例模式为何需要使用 volatile。</p><hr>`,40),b=e("strong",null,"数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关",-1),m={href:"https://tobebetterjavaer.com/pdf/programmer-111.html",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,[i("关注二哥的原创公众号 "),e("strong",null,"沉默王二"),i("，回复"),e("strong",null,"111"),i(" 即可免费领取。")],-1),h=e("p",null,[e("img",{src:"http://cdn.tobebetterjavaer.com/tobebetterjavaer/images/xingbiaogongzhonghao.png",alt:"",loading:"lazy"})],-1);function g(f,x){const n=v("ExternalLinkIcon");return d(),t("div",null,[c,e("p",null,[i("因为重排序影响，所以最终的输出可能是 0，具体分析请参考"),e("a",u,[i("上一篇"),l(n)]),i("，如果引入 volatile，我们再看一下代码：")]),o,e("p",null,[i("最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 "),b,i(" 等等等等……详情戳："),e("a",m,[i("可以说是2022年全网最全的学习和找工作的PDF资源了"),l(n)])]),p,h])}const y=s(r,[["render",g],["__file","volatile.html.vue"]]);export{y as default};
