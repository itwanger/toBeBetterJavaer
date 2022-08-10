---
title: 【面试题】你知道Object中有哪些方法及其作用吗？
shortTitle: 【面试题】你知道Object中有哪些方法及其作用吗？
description: 面试时的高频问点（建议收藏慢啃） ...
category:
  - 微信公众号
head:
---

来源丨9龙

juejin.im/post/5d0655d8e51d455a2f22025e

![](https://mmbiz.qpic.cn/mmbiz_jpg/xq9PqibkVAzpWtFaUKXgb28E4GPavCmrJSrPwoFdOljbLUxocC2J0gWMA5FFXegWrBeDYyazM8XUSLiagrYmZQjA/640?wx_fmt=jpeg)

* * *

**概   览**

**Object是java所有类的基类，是整个类继承结构的顶端，也是最抽象的一个类**。大家天天都在使用 `toString()、equals()、hashCode()、wait()、notify()、getClass()`等方法，或许都没有意识到是 `Object`的方法，也没有去看 `Object`还有哪些方法以及思考为什么这些方法要放到 `Object`中。本篇就每个方法具体功能、重写规则以及自己的一些理解。

* * *

**Object类所有方法详解**

`Object`中含有： `registerNatives()、getClass()、hashCode()、equals()、clone()、toString()、notify()、notifyAll()、wait(long)、wait(long,int)、wait()、finalize()` 共**十二个方法**。这个顺序是按照 `Object`类中定义方法的顺序列举的，下面我也会按照这个顺序依次进行讲解。

*   **registerNatives()**

 

  1.  public class Object {
  2.   private static native void registerNatives();
  3.   static {
  4.   registerNatives();
  5.   }
  6.  }
 

**从名字上理解，这个方法是注册 `native`方法**（本地方法，由 `JVM`实现，底层是 `C/C++`实现的）**向谁注册呢？当然是向 `JVM`**，当有程序调用到 `native`方法时， `JVM`才好去找到这些底层的方法进行调用。

`Object`中的 `native`方法，并使用 `registerNatives()`向 `JVM`进行注册。（这属于 `JNI`的范畴，有兴趣的可自行查阅。）

![](https://mmbiz.qpic.cn/mmbiz_png/xq9PqibkVAzp1opdyycWF8FqUsnz1pdR07HZn67GzuK8MwwAyF5VBXbmOKfqRfQX1TtiaryNQCSpFgWVdvjibpewA/640?wx_fmt=png)

> 为什么要使用静态方法，还要放到静态块中呢？

我们知道了在类初始化的时候，会依次从父类到本类的类变量及类初始化块中的类变量及方法按照定义顺序放到 `< clinit>`方法中，这样可以保证父类的类变量及方法的初始化一定先于子类。所以当子类调用相应 `native`方法，比如计算 `hashCode`时，一定可以保证能够调用到 `JVM`的 `native`方法。

*   **getClass()**

 

  1.  public final native Class getClass();
 

这是一个 `public`的方法，我们可以直接通过对象调用。

类加载的第一阶段类的加载就是将 `.class`文件加载到内存，并生成一个 `java.lang.Class`对象的过程。 `getClass()`方法就是获取这个对象，这是当前类的对象在运行时类的所有信息的集合。这个方法是反射三种方式之一。

*   **hashCode()**

 

  1.  public native int hashCode(); 
 

这是一个 `public`的方法，所以子类可以重写它。这个方法返回当前对象的 `hashCode`值，这个值是一个整数范围内的 `（-2^31~2^31-1）`数字。

对于 `hashCode`有以下几点约束:

1.  在 Java应用程序执行期间，在对同一对象多次调用 `hashCode` 方法时，必须一致地返回相同的整数，前提是将对象进行 `equals` 比较时所用的信息没有被修改；
2.  如果两个对象 `x.equals(y)` 方法返回 `true`，则 `x`、 `y`这两个对象的 `hashCode`必须相等。
3.  如果两个对象 `x.equals(y)` 方法返回 `false`，则 `x`、 `y`这两个对象的 `hashCode`可以相等也可以不等。但是，为不相等的对象生成不同整数结果可以提高哈希表的性能。
4.  默认的 `hashCode`是将内存地址转换为的 `hash`值，重写过后就是自定义的计算方式；也可以通过 `System.identityHashCode(Object)`来返回原本的 `hashCode`。

 

  1.  public class HashCodeTest {    
  2.   private int age;    
  3.   private String name;    
  4.  
  5.   @Override    
  6.   public int hashCode() {        
  7.   Object[] a = Stream.of(age, name).toArray();        
  8.   int result = 1;        
  9.   for (Object element : a) {            
  10.   result = 31 * result + (element == null ? 0 : element.hashCode());        
  11.   }        
  12.   return result;    
  13.   }
  14.  }
 

推荐使用 `Objects.hash(Object…values)`方法。相信看源码的时候，都看到计算 `hashCode`都使用了 `31`作为基础乘数，为什么使用 `31`呢？我比较赞同与理解 `result *31=(result<<5)-result`。 `JVM`底层可以自动做优化为位运算，效率很高；还有因为 `31`计算的 `hashCode`冲突较少，利于 `hash`桶位的分布。

*   **equals()**

 

  1.  public boolean equals(Object obj);
 

用于比较当前对象与目标对象是否相等，默认是比较引用是否指向同一对象。为 `public`方法，子类可重写。

 

  1.  public class Object{
  2.   public boolean equals(Object obj) {
  3.   return (this == obj);
  4.   }
  5.  }
 

> 为什么需要重写 `equals`方法？

**因为如果不重写equals方法，当将自定义对象放到 `map`或者 `set`中时**；如果这时两个对象的 `hashCode`相同，就会调用 `equals`方法进行比较，这个时候会调用 `Object`中默认的 `equals`方法，而默认的 `equals`方法只是比较了两个对象的引用是否指向了同一个对象，显然大多数时候都不会指向，这样就会将重复对象存入 `map`或者 `set`中。这就**破坏了 `map`与 `set`不能存储重复对象的特性，会造成内存溢出**。

**重写 `equals`方法的几条约定：**

1.  **自反性**：即 `x.equals(x)`返回 `true`， `x`不为 `null`；
2.  **对称性**：即 `x.equals(y)`与 `y.equals(x）`的结果相同， `x`与 `y`不为 `null`；
3.  **传递性**：即 `x.equals(y)`结果为 `true`, `y.equals(z)`结果为 `true`，则 `x.equals(z)`结果也必须为 `true`；
4.  **一致性**：即 `x.equals(y)`返回 `true`或 `false`，在未更改 `equals`方法使用的参数条件下，多次调用返回的结果也必须一致。 `x`与 `y`不为 `null`。
5.  如果 `x`不为 `null`, `x.equals(null)`返回 `false`。

*   **clone()**

 

  1.  protected native Object clone() throws CloneNotSupportedException;
 

此方法返回当前对象的一个副本。

这是一个 `protected`方法，提供给子类重写。但需要实现 `Cloneable`接口，这是一个标记接口，如果没有实现，当调用 `object.clone()`方法，会抛出 `CloneNotSupportedException`。

 

  1.  public class CloneTest implements Cloneable {    
  2.   private int age;    
  3.   private String name;    
  4.   //省略get、set、构造函数等    
  5.  
  6.   @Override    
  7.   protected CloneTest clone() throws CloneNotSupportedException {        
  8.   return (CloneTest) super.clone();    
  9.   }    
  10.  
  11.   public static void main(String[] args) throws CloneNotSupportedException {        
  12.   CloneTest cloneTest = new CloneTest(23, "XX");        
  13.   CloneTest clone = cloneTest.clone();        
  14.   System.out.println(clone == cloneTest);        
  15.   System.out.println(cloneTest.getAge()==clone.getAge());        
  16.   System.out.println(cloneTest.getName()==clone.getName());    
  17.   }
  18.  }
  19.  //输出结果
  20.  //false
  21.  //true
  22.  //true
 

从输出我们看见， `clone`的对象是一个新的对象；但原对象与 `clone`对象的 `String`类型的 `name`却是同一个引用，这表明， `super.clone`方法对成员变量如果是引用类型，进行是浅拷贝。

> 那如果我们要进行深拷贝怎么办呢？
> 
> **答案是**：如果成员变量是引用类型，想实现深拷贝，则成员变量也要实现 `Cloneable`接口，重写 `clone`方法。

*   **toString()**

 

  1.  public String toString()；
 

这是一个 `public`方法，子类可重写，建议所有子类都重写 `toString`方法，默认的 `toString`方法，只是将当前类的全限定性类名 `+@+`十六进制的 `hashCode`值。

**我们思考一下为什么需要toString方法？**

可以这么理解：返回当前对象的字符串表示，可以将其打印方便查看对象的信息，方便记录日志信息提供调试。我们可以选择需要表示的重要信息重写到 `toString`方法中。

*   **wait()/ wait(long)/ wait(long,int)**

这三个方法是用来线程间通信用的，作用是阻塞当前线程，等待其他线程调用 `notify()/notifyAll()`方法将其唤醒。这些方法都是 `publicfinal`的，不可被重写。

**注意：**

1.  此方法只能在当前线程获取到对象的锁监视器之后才能调用，否则会抛出 `IllegalMonitorStateException`异常。
2.  调用 `wait`方法，线程会将锁监视器进行释放；而 `Thread.sleep，Thread.yield()`并不会释放锁。
3.  `wait`方法会一直阻塞，直到其他线程调用当前对象的 `notify()/notifyAll()`方法将其唤醒；而 `wait(long)`是等待给定超时时间内（单位毫秒），如果还没有调用 `notify()/nofiyAll()`会自动唤醒； `wait(long,int)`如果第二个参数大于 `0`并且小于 `999999`，则第一个参数 `+1`作为超时时间；

*   **notify()/notifyAll()**

前面说了，如果当前线程获得了当前对象锁，调用 `wait`方法，将锁释放并阻塞；这时另一个线程获取到了此对象锁，并调用此对象的 `notify()/notifyAll()`方法将之前的线程唤醒。这些方法都是 `publicfinal`的，不可被重写。

1.  `publicfinalnativevoidnotify();` 随机唤醒之前在当前对象上调用 `wait`方法的一个线程
2.  `publicfinalnativevoidnotifyAll()`; 唤醒所有之前在当前对象上调用 `wait`方法的线程

**注意**：调用 `notify()`后，阻塞线程被唤醒，可以参与锁的竞争，但可能调用 `notify()`方法的线程还要继续做其他事，锁并未释放，所以我们看到的结果是，无论 `notify()`是在方法一开始调用，还是最后调用，阻塞线程都要等待当前线程结束才能开始。

> 为什么 `wait()/notify()`方法要放到 `Object`中呢？ 因为每个对象都可以成为锁监视器对象，所以放到 `Object`中，可以直接使用。

*   **finalize()**

 

  1.  protected void finalize() throws Throwable ;
 

此方法是在垃圾回收之前，JVM会调用此方法来清理资源。此方法可能会将对象重新置为可达状态，导致JVM无法进行垃圾回收。

我们知道java相对于C++很大的优势是程序员不用手动管理内存，内存由jvm管理；如果我们的引用对象在堆中没有引用指向他们时，当内存不足时，JVM会自动将这些对象进行回收释放内存，这就是我们常说的垃圾回收。但垃圾回收没有讲述的这么简单。

**`finalize()`方法具有如下4个特点：**

1.  永远不要主动调用某个对象的 `finalize()`方法，该方法由垃圾回收机制自己调用；
2.  `finalize()`何时被调用，是否被调用具有不确定性；
3.  当 `JVM`执行可恢复对象的 `finalize()`可能会将此对象重新变为可达状态；
4.  当 `JVM`执行 `finalize()`方法时出现异常，垃圾回收机制不会报告异常，程序继续执行。

* * *

**总   结**

本篇举例讲解了 `Objec`中的所有方法的作用、意义及使用，从 `java`最基础的类出发，感受 `java`设计之美吧。我是不会高诉大家，**这好像面试也会问的【摊手】**。



**后   记**

> 若有错误或者不当之处，可在本公众号内反馈，一起学习交流！

**更多热文在此：**

  ●  [Spring Boot 系列实战文章合集（源码已开源）](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247484006&idx=1&sn=15cf2b8a17bd6f49952f65bdc718724b&chksm=fdded4a2caa95db4b3099fa75635a7d99655e22963f9dc65446cd703a66cbc9b2a22b87b7ece&scene=21#wechat_redirect)

  ●  [程序员写简历时必须注意的技术词汇拼写](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247484027&idx=1&sn=1f005a4c2ec45631865429ff9ccfbe44&chksm=fdded4bfcaa95da942be42b38c7733bdf5ce322136231ca2014dc6b92c117a2fe5bea35bb6bb&scene=21#wechat_redirect)

  ●  [基于Spring Security OAuth2](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247484161&idx=1&sn=6378dbce60394dc71877dd890b52309d&chksm=fdded5c5caa95cd39f81a39863dd56cb4f4787bd69b9795b050552de70b255d4187808ed5e16&scene=21#wechat_redirect)的SSO单点登录+JWT权限控制实战

  ●  [从一份配置清单详解Nginx服务器配置](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247483807&idx=1&sn=e3a164701c2f6e0f3cf91bd25d595479&chksm=fdded75bcaa95e4d857e5f4e040f37b7c3d8f3b301856493419498b6e54d8a43addfc25e7505&scene=21#wechat_redirect)

  ●  [如何在Windows下像Mac一样优雅的开发](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247484183&idx=1&sn=6f2d948b0a20aba18b04371f9a0de17d&chksm=fdded5d3caa95cc5de641eb44b617073d7f46ad1e768ba00ea72e97f6584486273e3a84c4f62&scene=21#wechat_redirect)

  ●  [Docker容器可视化监控中心搭建](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247483763&idx=1&sn=6ceb9e73540b5016dadfb212636b3855&chksm=fdded7b7caa95ea1165b507397c39267d3bf7522c83cc8ed10eae4ee4a13db831eb58a3dc167&scene=21#wechat_redirect)

  ●  [利用ELK搭建Docker容器化应用日志中心](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247483768&idx=1&sn=df06fd3fc033ef8120a14677db388d9a&chksm=fdded7bccaa95eaaac9ff046c1c7fad0d3489ec7af546d829175af6106340e053f570e8c927c&scene=21#wechat_redirect)

  ●  [RPC框架实践之：Google gRPC](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247483780&idx=1&sn=e04264df80209244f8e263ef0931d134&chksm=fdded740caa95e56190918108985795439a277a88e054c119b3cb63a92a8e0899943d9f3e02b&scene=21#wechat_redirect)

  ●  [一文详解 Linux系统常用监控工具](http://mp.weixin.qq.com/s?__biz=MzU4ODI1MjA3NQ==&mid=2247483877&idx=1&sn=113867c83c0cecf5781a9e1a7f91bdd1&chksm=fdded721caa95e37f757660e7f14775ac55e4a72f9c24b119af7ef83ca7587ceb53f22298c99&scene=21#wechat_redirect)

* * *

更多 **务实、能看懂、可复现的** 技术文章尽在公众号 **CodeSheep**，欢迎扫码订阅，第一时间获取更新 ⬇️⬇️⬇️

![](https://mmbiz.qpic.cn/mmbiz_gif/xq9PqibkVAzr3Ax6dwjysCZ8Zsom5kkKicbdS1tYartkx9YyCm5qtynaUicLDXjYcZaQbXVIFjBETA7RJJEYvkiciaA/640?)

>转载链接：[https://mp.weixin.qq.com/s/eJy74CbzthHMgRPOA_4wEA](https://mp.weixin.qq.com/s/eJy74CbzthHMgRPOA_4wEA)，出处：CodeSheep，整理：沉默王二
