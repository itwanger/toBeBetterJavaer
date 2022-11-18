import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as l,e as a}from"./app.99eb8281.js";const e={},s=a(`<p><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHMGBBGMicblbAiaMia4Z9QH8Nrq8FaJQBlOBcKyaTibK0cJEnxHjtLW8snPk1mhOW9wvNibAhgeA9nYJA/640?wx_fmt=png" alt="" loading="lazy"></p><blockquote><p>主要讲解 final 的内存语义和使用方式。</p></blockquote><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>看这篇文章前，建议先看完《Java 并发编程系列 1-基础知识》，因为相关知识有很强的依赖，这篇文章也是 Java 内存模型 JMM 相关文章的最后一篇。</p><h2 id="final-禁止指令重排分析" tabindex="-1"><a class="header-anchor" href="#final-禁止指令重排分析" aria-hidden="true">#</a> final 禁止指令重排分析</h2><blockquote><p>该部分内容基本摘抄自《深入理解 Java 内存模型》，仅加入自己的总结，更详细讲解可以直接参考此书。</p></blockquote><p>对 final 域的读和写更像是普通的变量访问，编译器和处理器要遵守两个重排序规则：</p><ul><li>在构造函数内对一个 final 域的写入，与随后把这个被构造对象的引用赋值给一个引用变量，这两个操作之间不能重排序。</li><li>初次读一个包含 final 域的对象的引用，与随后初次读这个 final 域，这两个操作之间不能重排序。</li></ul><p>下面，我们通过一些示例性的代码来分别说明这两个规则：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class FinalExample {
    int i;                            //普通变量
    final int j;                      //final变量
    static FinalExample obj;
    public void FinalExample () {     //构造函数
        i = 1;                        //写普通域
        j = 2;                        //写final域
    }
    public static void writer () {    //写线程A执行
        obj = new FinalExample ();
    }
    public static void reader () {       //读线程B执行
        FinalExample object = obj;       //读对象引用
        int a = object.i;                //读普通域
        int b = object.j;                //读final域
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>这里假设一个线程 A 执行 writer ()方法，随后另一个线程 B 执行 reader ()方法，注意两者的调用先后关系！</p></blockquote><p>下面我们通过这两个线程的交互来说明这两个规则。</p><h3 id="写-final-域的重排序规则" tabindex="-1"><a class="header-anchor" href="#写-final-域的重排序规则" aria-hidden="true">#</a> 写 final 域的重排序规则</h3><p>写 final 域的重排序规则禁止把 final 域的写重排序到构造函数之外。这个规则的实现包含下面 2 个方面：</p><ul><li>JMM 禁止编译器把 final 域的写重排序到构造函数之外。</li><li>编译器会在 final 域的写之后，构造函数 return 之前，插入一个 StoreStore 屏障。这个屏障禁止处理器把 final 域的写重排序到构造函数之外。</li></ul><p>现在让我们分析 writer ()方法。writer ()方法只包含一行代码：finalExample = new FinalExample ()。这行代码包含两个步骤：</p><ul><li>构造一个 FinalExample 类型的对象；</li><li>把这个对象的引用赋值给引用变量 obj。</li></ul><p>假设线程 B 读对象引用与读对象的成员域之间没有重排序（马上会说明为什么需要这个假设），下图是一种可能的执行时序：<img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHMGBBGMicblbAiaMia4Z9QH8NA7rrJ7BxXLgce9quicCK04xHiaXiarrNicJZeNrs8SUSx5geJOjL2AicLlQ/640?wx_fmt=png" alt="" loading="lazy"></p><p>在上图中，写普通域的操作被编译器重排序到了构造函数之外，读线程 B 错误的读取了普通变量 i 初始化之前的值。而写 final 域的操作，被写 final 域的重排序规则“限定”在了构造函数之内，读线程 B 正确的读取了 final 变量初始化之后的值。</p><p>写 final 域的重排序规则可以确保：在对象引用为任意线程可见之前，对象的 final 域已经被正确初始化过了，而普通域不具有这个保障。以上图为例，在读线程 B“看到”对象引用 obj 时，很可能 obj 对象还没有构造完成（对普通域 i 的写操作被重排序到构造函数外，此时初始值 2 还没有写入普通域 i）。</p><blockquote><p>总结一下：也就是对象初始化 final 变量和普通变量，然后将初始化的对象引用赋值给其它变量前，final 变量可以保证已经被初始化，但是普通变量不能保证，可能会导致读取的普通变量是一个空值，或者说是未初始化的值，导致异常。</p></blockquote><h3 id="读-final-域的重排序规则" tabindex="-1"><a class="header-anchor" href="#读-final-域的重排序规则" aria-hidden="true">#</a> 读 final 域的重排序规则</h3><p>读 final 域的重排序规则如下：</p><ul><li>在一个线程中，初次读对象引用与初次读该对象包含的 final 域，JMM 禁止处理器重排序这两个操作（注意，这个规则仅仅针对处理器）。编译器会在读 final 域操作的前面插入一个 LoadLoad 屏障。</li></ul><p>reader()方法包含三个操作：</p><ol><li>初次读引用变量 obj;</li><li>初次读引用变量 obj 指向对象的普通域 j。</li><li>初次读引用变量 obj 指向对象的 final 域 i。</li></ol><p>现在我们假设写线程 A 没有发生任何重排序，同时程序在不遵守间接依赖的处理器上执行，下面是一种可能的执行时序：</p><p><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHMGBBGMicblbAiaMia4Z9QH8NGiaFeH1KcsgYgzPc0Mnoiaacq36v1LnOChA39Q4Xwx0C7dllib9B9tnPw/640?wx_fmt=png" alt="" loading="lazy"></p><p>在上图中，读对象的普通域的操作被处理器重排序到读对象引用之前。读普通域时，该域还没有被写线程 A 写入，这是一个错误的读取操作。而读 final 域的重排序规则会把读对象 final 域的操作“限定”在读对象引用之后，此时该 final 域已经被 A 线程初始化过了，这是一个正确的读取操作。</p><blockquote><p>总结一下：在读一个对象的 final 变量之前，一定会先读包含这个 final 域的对象的引用，所以不用担心读到对象的 final 变量，会因为重排除导致读到的是一个未初始化的值，但是对象的普通变量就不能这样保证。</p></blockquote><blockquote><p>对读和写 finlal 域，整体总结一下：写 final 域的重排序规则会要求译编器在 final 域的写之后，构造函数 return 之前，插入一个 StoreStore 障屏。读 final 域的重排序规则要求编译器在读 final 域的操作前面插入一个 LoadLoad 屏障。</p></blockquote><h3 id="如果-final-域是引用类型" tabindex="-1"><a class="header-anchor" href="#如果-final-域是引用类型" aria-hidden="true">#</a> 如果 final 域是引用类型</h3><p>上面我们看到的 final 域是基础数据类型，下面让我们看看如果 final 域是引用类型，将会有什么效果？请看下列示例代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class FinalReferenceExample {
  final int[] intArray;                     //final是引用类型
  static FinalReferenceExample obj;
  public FinalReferenceExample () {        //构造函数
      intArray = new int[1];              //1
      intArray[0] = 1;                   //2
  }
  public static void writerOne () {          //写线程A执行
      obj = new FinalReferenceExample ();  //3
  }
  public static void writerTwo () {          //写线程B执行
      obj.intArray[0] = 2;                 //4
  }
  public static void reader () {              //读线程C执行
      if (obj != null) {                    //5
          int temp1 = obj.intArray[0];       //6
      }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHMGBBGMicblbAiaMia4Z9QH8NcbzIvMPupvuNyJdvTQWORkDwicgbmkGpXS0PiaA53lwMfgiaGNib8TAcmQ/640?wx_fmt=png" alt="" loading="lazy"></p><p>在上图中，1 是对 final 域的写入，2 是对这个 final 域引用的对象的成员域的写入，3 是把被构造的对象的引用赋值给某个引用变量。这里除了前面提到的 1 不能和 3 重排序外，2 和 3 也不能重排序。</p><p>JMM 可以确保读线程 C 至少能看到写线程 A 在构造函数中对 final 引用对象的成员域的写入。即 C 至少能看到数组下标 0 的值为 1。而写线程 B 对数组元素的写入，读线程 C 可能看的到，也可能看不到。JMM 不保证线程 B 的写入对读线程 C 可见，因为写线程 B 和读线程 C 之间存在数据竞争，此时的执行结果不可预知。</p><p>如果想要确保读线程 C 看到写线程 B 对数组元素的写入，写线程 B 和读线程 C 之间需要使用同步原语（lock 或 volatile）来确保内存可见性。</p><blockquote><p>总结一下：如果 final 域为引用类型，这个其实和非引用类型禁止重排序的规则基本一样。上面的示例，writerTwo()和 reader()同时对一个数据进行操作，存在竞争关系，也很好理解，我换一个非引用类型，也一样存在并发，解决方案就是加锁。</p></blockquote><h3 id="为什么-final-引用不能从构造函数内-逸出" tabindex="-1"><a class="header-anchor" href="#为什么-final-引用不能从构造函数内-逸出" aria-hidden="true">#</a> 为什么 final 引用不能从构造函数内“逸出”</h3><p>前面我们提到过，写 final 域的重排序规则可以确保：在引用变量为任意线程可见之前，该引用变量指向的对象的 final 域已经在构造函数中被正确初始化过了。其实要得到这个效果，还需要一个保证：</p><blockquote><p>在构造函数内部，不能让这个被构造对象的引用为其他线程可见，也就是对象引用不能在构造函数中“逸出”。</p></blockquote><p>为了说明问题，让我们来看下面示例代码：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class FinalReferenceEscapeExample {
  final int i;
  static FinalReferenceEscapeExample obj;
  public FinalReferenceEscapeExample () {
      i = 1;                              //1写final域
      obj = this;                          //2 this引用在此“逸出”
  }
  public static void writer() {
      new FinalReferenceEscapeExample ();
  }
  public static void reader {
      if (obj != null) {                     //3
          int temp = obj.i;                 //4
      }
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设一个线程 A 执行 writer()方法，另一个线程 B 执行 reader()方法。这里的操作 2 使得对象还未完成构造前就为线程 B 可见。即使这里的操作 2 是构造函数的最后一步，且即使在程序中操作 2 排在操作 1 后面，执行 read()方法的线程仍然可能无法看到 final 域被初始化后的值，因为这里的操作 1 和操作 2 之间可能被重排序。实际的执行时序可能如下图所示：</p><p><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHMGBBGMicblbAiaMia4Z9QH8Nfic39kFhiaxoZqVUOFCHejjxmWVqFhBVvzmsSgV5BtCMVVKmH0n2ic8nQ/640?wx_fmt=png" alt="" loading="lazy"></p><p>从上图我们可以看出：在构造函数返回前，被构造对象的引用不能为其他线程可见，因为此时的 final 域可能还没有被初始化。在构造函数返回后，任意线程都将保证能看到 final 域正确初始化之后的值。</p><blockquote><p>上面都是八股文，也很少会遇到上述使用场景，个人也仅作兴趣了解，避免踩坑，下面总结一下 final 的常用用法。</p></blockquote><h2 id="final-关键字有几种用法" tabindex="-1"><a class="header-anchor" href="#final-关键字有几种用法" aria-hidden="true">#</a> final 关键字有几种用法</h2><h3 id="修饰普通变量" tabindex="-1"><a class="header-anchor" href="#修饰普通变量" aria-hidden="true">#</a> 修饰普通变量</h3><p>注意点：</p><ul><li>用 final 关键字修饰的变量，只能进行一次赋值操作，并且在生存期内不可以改变它的值。final 修饰的变量可以先声明，后赋值。</li></ul><h3 id="修饰成员变量" tabindex="-1"><a class="header-anchor" href="#修饰成员变量" aria-hidden="true">#</a> 修饰成员变量</h3><p>注意点：</p><ul><li>必须初始化值。</li><li>被 final 修饰的成员变量赋值，有两种方式：1、直接赋值 2、全部在构造方法中赋初值。</li><li>如果修饰的成员变量是基本类型，则表示这个变量的值不能改变。</li><li>如果修饰的成员变量是一个引用类型，则是说这个引用的地址的值不能修改，但是这个引用所指向的对象里面的内容还是可以改变的。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Test {
    final int age = 18;
    final String name;
    final String[] hobby;
    public Test() {
        this.name = &quot;lvmenglou&quot;;        // 正确使用
        //this.age = 20;                // 错误使用
        this.hobby = new String[4];     // 正确使用
        this.hobby[0] = &quot;movie&quot;;        // 正确使用
        this.hobby[1] = &quot;sing song&quot;;    // 正确使用
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修饰方法" tabindex="-1"><a class="header-anchor" href="#修饰方法" aria-hidden="true">#</a> 修饰方法</h3><p>注意点：</p><ul><li>被 final 修饰的方法不能被重写。</li><li>一个类的 private 方法会隐式的被指定为 final 方法。</li><li>如果父类中有 final 修饰的方法，那么子类不能去重写。</li></ul><p><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHMGBBGMicblbAiaMia4Z9QH8NtTiaZV28IRGJuXpMUNJQeBZka5ls80Licdl364nhl1ibU1DITHTHLBQWQ/640?wx_fmt=png" alt="" loading="lazy"></p><h3 id="修饰类" tabindex="-1"><a class="header-anchor" href="#修饰类" aria-hidden="true">#</a> 修饰类</h3><p>注意点：</p><ul><li>用 final 去修饰一个类的时候，表示这个类不能被继承；</li><li>final 类中的成员方法都会被隐式的指定为 final 方法；</li><li>被 final 修饰的类，final 类中的成员变量可以根据自己的实际需要设计为 final。</li></ul><blockquote><p>在自己设计一个类的时候，要想好这个类将来是否会被继承，如果可以被继承，则该类不能使用 final 修饰，在这里呢，一般来说工具类我们往往都会设计成为一个 final 类。在 JDK 中，被设计为 final 类的有 String、System 等。</p></blockquote><p><img src="https://mmbiz.qpic.cn/mmbiz_png/sXFqMxQoVLHMGBBGMicblbAiaMia4Z9QH8NVAJRLLOM61t7R8FLTn65PtohOpHo39Wt0EbcnekGd5A6pMblmI9ebQ/640?wx_fmt=png" alt="" loading="lazy"></p><h2 id="final-和-static" tabindex="-1"><a class="header-anchor" href="#final-和-static" aria-hidden="true">#</a> final 和 static</h2><p>很多时候会容易把 static 和 final 关键字混淆，static 作用于成员变量用来表示只保存一份副本，而 final 的作用是用来保证变量不可变。看下面这个例子：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>class MyClass {
    public final double i = Math.random();
    public static double j = Math.random();
}
public class Test2 {
    public static void main(String[] args)  {
        MyClass myClass1 = new MyClass();
        MyClass myClass2 = new MyClass();
        System.out.println(myClass1.i);
        System.out.println(myClass1.j);
        System.out.println(myClass2.i);
        System.out.println(myClass2.j);
    }
}
// 输出：
// 0.6885279073145978
// 0.7678464493258529
// 0.5645174724833194
// 0.7678464493258529
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行这段代码就会发现，每次打印的两个 j 值都是一样的，而 i 的值却是不同的。从这里就可以知道 final 和 static 变量的区别了。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本章详细讲解了 final 的内存语义和使用方式，内存语义主要是涉及到并发编程相关的知识，仅供了解即可。其实我们最终还是需要注重 final 的使用方式，分别从变量、方法、类，对齐进行讲解，这块知识很简单，主要是做个记录，最后是 final 和 static，也是网上看到的示例，也只做个简单的记录。</p><p>这些内容，其实是根据《深入理解 Java 内存模型》，然后结合网上的资料，做了相关整理和总结，其实都属于 Java 内存模型方面的内容，通过这 4 篇文章，大家对 Java 内存模型应该会有整体的了解，后面才真正讲解并发编程相关的知识。</p><p>参考资料：《深入理解 Java 内存模型》 《Java 并发编程实战》</p>`,73),d=[s];function c(r,t){return n(),l("div",null,d)}const u=i(e,[["render",c],["__file","javabfbcjlfinal.html.vue"]]);export{u as default};
