---
title: 34 道 Java 精选面试题👍
shortTitle: 34 道 Java 精选面试题👍
category:
  - 求职面试
tag:
  - 面试题&八股文
description: 二哥的Java进阶之路，小白的零基础Java教程，34 道 Java 精选面试题👍
head:
  - - meta
    - name: keywords
      content: Java,java,面试题,八股文
---

# Java：34道精选高频面试题必看:+1:

## 1.介绍一下 java 吧

java 是一门**开源的跨平台的面向对象的**计算机语言.

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-01.png)

跨平台是因为 java 的 class 文件是运行在虚拟机上的,其实跨平台的,而**虚拟机是不同平台有不同版本**,所以说 java 是跨平台的.

面向对象有几个特点:

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-02.png)

- 1.**封装**
  - 两层含义：一层含义是把对象的属性和行为看成一个密不可分的整体，将这两者'封装'在一个不可分割的**独立单元**(即对象)中
  - 另一层含义指'信息隐藏，把不需要让外界知道的信息隐藏起来，有些对象的属性及行为允许外界用户知道或使用，但不允许更改，而另一些属性或行为，则不允许外界知晓，或只允许使用对象的功能，而尽可能**隐藏对象的功能实现细节**。

**优点**:

> 1.良好的封装能够**减少耦合**，符合程序设计追求'高内聚，低耦合'。<br>
> 2.**类内部的结构可以自由修改**。<br>
> 3.可以对成员变量进行更**精确的控制**。<br>
> 4.**隐藏信息**实现细节。<br>


- 2.**继承**
  - 继承就是子类继承父类的特征和行为，使得子类对象（实例）具有父类的实例域和方法，或子类从父类继承方法，使得子类具有父类相同的行为。

**优点**:

>  1.提高类代码的**复用性**<br>
>  2.提高了代码的**维护性**<br>

- 3.**多态**
  - 多态是同一个行为具有多个不同表现形式或形态的能力。Java语言中含有方法重载与对象多态两种形式的多态：
    - 1.**方法重载**：在一个类中，允许多个方法使用同一个名字，但方法的参数不同，完成的功能也不同。
    - 2.**对象多态**：子类对象可以与父类对象进行转换，而且根据其使用的子类不同完成的功能也不同（重写父类的方法）。

 **优点**

>   1. **消除类型之间的耦合关系**<br>
>   2. **可替换性**<br>
>   3. **可扩充性**<br>
>   4. **接口性**<br>
>   5. **灵活性**<br>
>   6. **简化性**<br>

## 2.java 有哪些数据类型？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-03.png)

java 主要有两种数据类型

 - 1.**基本数据类型**
   - 基本数据有**八个**,
     - byte,short,int,long属于数值型中的整数型
     - float,double属于数值型中的浮点型
     - char属于字符型
     - boolean属于布尔型
 - 2.**引用数据类型**
   - 引用数据类型有**三个**,分别是类,接口和数组

## 3.接口和抽象类有什么区别？

- 1.接口是抽象类的变体，**接口中所有的方法都是抽象的**。而抽象类是声明方法的存在而不去实现它的类。
- 2.接口可以多继承，抽象类不行。
- 3.接口定义方法，不能实现，默认是 **public abstract**，而抽象类可以实现部分方法。
- 4.接口中基本数据类型为 **public static final** 并且需要给出初始值，而抽类象不是的。

## 4.重载和重写什么区别？

重写：

- 1.参数列表必须**完全与被重写的方法**相同，否则不能称其为重写而是重载.
- 2.**返回的类型必须一直与被重写的方法的返回类型相同**，否则不能称其为重写而是重载。
- 3.访问**修饰符的限制一定要大于被重写方法的访问修饰符**
- 4.重写方法一定**不能抛出新的检查异常或者比被重写方法申明更加宽泛的检查型异常**。

重载：

- 1.必须具有**不同的参数列表**；
- 2.可以有不同的返回类型，只要参数列表不同就可以了；
- 3.可以有**不同的访问修饰符**；
- 4.可以抛出**不同的异常**；

## 5.常见的异常有哪些？

- NullPointerException 空指针异常
- ArrayIndexOutOfBoundsException 索引越界异常
- InputFormatException 输入类型不匹配
- SQLException SQL异常
- IllegalArgumentException 非法参数
- NumberFormatException 类型转换异常
  等等....

## 6.异常要怎么解决？

Java标准库内建了一些通用的异常，这些类以Throwable为顶层父类。

Throwable又派生出**Error类和Exception类**。

错误：Error类以及他的子类的实例，代表了JVM本身的错误。错误不能被程序员通过代码处理，Error很少出现。因此，程序员应该关注Exception为父类的分支下的各种异常类。

异常：Exception以及他的子类，代表程序运行时发送的各种不期望发生的事件。可以被Java异常处理机制使用，是异常处理的核心。

处理方法:

- 1.**try()catch(){}**

```
try{
// 程序代码
}catch(ExceptionName e1){
//Catch 块
}
```

- 2.**throw** 
  - throw 关键字作用是抛出一个异常，抛出的时候是抛出的是一个异常类的实例化对象，在异常处理中，try 语句要捕获的是一个异常对象，那么此异常对象也可以自己抛出
- 3.**throws** 
  - 定义一个方法的时候可以使用 throws 关键字声明。使用 throws 关键字声明的方法表示此方法不处理异常，而交给方法调用处进行处理。

## 7.arrayList 和 linkedList 的区别？


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-04.png)

- 1.ArrayList 是实现了基于**数组**的，存储空间是连续的。LinkedList 基于**链表**的，存储空间是不连续的。（LinkedList 是双向链表）

- 2.对于**随机访问** get 和 set ，ArrayList 觉得优于 LinkedList，因为 LinkedList 要移动指针。 

- 3.对于**新增和删除**操作 add 和 remove ，LinedList 比较占优势，因为 ArrayList 要移动数据。

- 4.同样的数据量 LinkedList 所占用空间可能会更小，因为 ArrayList 需要**预留空间**便于后续数据增加，而 LinkedList 增加数据只需要**增加一个节点** 

## 8.hashMap 1.7 和 hashMap 1.8 的区别？

只记录**重点**

| 不同点          |          hashMap 1.7           |                    hashMap 1.8 |
| :-------------- | :----------------------------: | -----------------------------: |
| 数据结构        |           数组+链表            |               数组+链表+红黑树 |
| 插入数据的方式  |             头插法             |                         尾插法 |
| hash 值计算方式 | 9次扰动处理(4次位运算+5次异或) | 2次扰动处理(1次位运算+1次异或) |
| 扩容策略        |           插入前扩容           |                     插入后扩容 |

## 9.hashMap 线程不安全体现在哪里？

在 **hashMap1.7 中扩容**的时候，因为采用的是头插法，所以会可能会有循环链表产生，导致数据有问题，在 1.8 版本已修复，改为了尾插法

在任意版本的 hashMap 中，如果在**插入数据时多个线程命中了同一个槽**，可能会有数据覆盖的情况发生，导致线程不安全。

## 10.那么 hashMap 线程不安全怎么解决？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-05.png)

- 一.给 hashMap **直接加锁**,来保证线程安全
- 二.使用 **hashTable**,比方法一效率高,其实就是在其方法上加了 synchronized 锁
- 三.使用 **concurrentHashMap** , 不管是其 1.7 还是 1.8 版本,本质都是**减小了锁的粒度,减少线程竞争**来保证高效.

## 11.concurrentHashMap 1.7 和 1.8 有什么区别

只记录**重点**

| 不同点   |    concurrentHashMap 1.7     |              concurrentHashMap 1.8 |
| :------- | :--------------------------: | ---------------------------------: |
| 锁粒度   |         基于segment          |                      基于entry节点 |
| 锁       |        reentrantLock         |                       synchronized |
| 底层结构 | Segment + HashEntry + Unsafe | Synchronized + CAS + Node + Unsafe |

## 12.介绍一下 hashset 吧

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-06.png)

上图是 set 家族整体的结构，

set 继承于 Collection 接口，是一个**不允许出现重复元素，并且无序的集合**.

HashSet 是**基于 HashMap 实现**的，底层**采用 HashMap 来保存元素**

元素的哈希值是通过元素的 hashcode 方法 来获取的, HashSet 首先判断两个元素的哈希值，如果哈希值一样，接着会比较 equals 方法 如果 equls 结果为 true ，HashSet 就视为同一个元素。如果 equals 为 false 就不是同一个元素。

## 13.什么是泛型？

泛型:**把类型明确的工作推迟到创建对象或调用方法的时候才去明确的特殊的类型**

## 14.泛型擦除是什么？

因为泛型其实只是在编译器中实现的而虚拟机并不认识泛型类项，所以要在虚拟机中将泛型类型进行擦除。也就是说，**在编译阶段使用泛型，运行阶段取消泛型，即擦除**。 擦除是将泛型类型以其父类代替，如String 变成了Object等。其实在使用的时候还是进行带强制类型的转化，只不过这是比较安全的转换，因为在编译阶段已经确保了数据的一致性。

## 15.说说进程和线程的区别？

**进程是系统资源分配和调度的基本单位**，它能并发执行较高系统资源的利用率.

**线程**是**比进程更小**的能独立运行的基本单位,创建、销毁、切换成本要小于进程,可以减少程序并发执行时的时间和空间开销，使得操作系统具有更好的并发性。

## 16.volatile 有什么作用？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-07.png)

- **1.保证内存可见性**
  - 可见性是指线程之间的可见性，一个线程修改的状态对另一个线程是可见的。也就是一个线程修改的结果，另一个线程马上就能看到。
- **2.禁止指令重排序**
  - cpu 是和缓存做交互的，但是由于 cpu 运行效率太高，所以会不等待当前命令返回结果从而继续执行下一个命令，就会有乱序执行的情况发生

## 17.什么是包装类？为什么需要包装类？

**Java 中有 8 个基本类型，分别对应的 8 个包装类**

- byte -- Byte
- boolean -- Boolean
- short -- Short
- char -- Character
- int -- Integer
- long -- Long
- float -- Float
- double -- Double

**为什么需要包装类**:

- 基本数据类型方便、简单、高效，但泛型不支持、集合元素不支持
- 不符合面向对象思维
- 包装类提供很多方法，方便使用，如 Integer 类 toHexString(int i)、parseInt(String s) 方法等等

## 18.Integer a = 1000，Integer b = 1000，a==b 的结果是什么？那如果 a，b 都为1，结果又是什么？

Integer a = 1000，Integer b = 1000，a==b 结果为**false**

Integer a = 1，Integer b = 1，a==b 结果为**true**

这道题主要考察 Integer 包装类缓存的范围,**在-128~127之间会缓存起来**,比较的是直接缓存的数据,在此之外比较的是对象

## 19.JMM 是什么？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-08.png)

JMM 就是 **Java内存模型**(java memory model)。因为在不同的硬件生产商和不同的操作系统下，内存的访问有一定的差异，所以会造成相同的代码运行在不同的系统上会出现各种问题。所以java内存模型(JMM)**屏蔽掉各种硬件和操作系统的内存访问差异，以实现让java程序在各种平台下都能达到一致的并发效果**。

Java内存模型规定所有的变量都存储在主内存中，包括实例变量，静态变量，但是不包括局部变量和方法参数。每个线程都有自己的工作内存，线程的工作内存保存了该线程用到的变量和主内存的副本拷贝，线程对变量的操作都在工作内存中进行。**线程不能直接读写主内存中的变量**。

每个线程的工作内存都是独立的，**线程操作数据只能在工作内存中进行，然后刷回到主存**。这是 Java 内存模型定义的线程基本工作方式。


## 20.创建对象有哪些方式

有**五种创建对象的方式**

- 1、new关键字

```
Person p1 = new Person();
```

- 2.Class.newInstance

```
Person p1 = Person.class.newInstance();
```

- 3.Constructor.newInstance

```
Constructor<Person> constructor = Person.class.getConstructor();
Person p1 = constructor.newInstance();
```

- 4.clone

```
Person p1 = new Person();
Person p2 = p1.clone();
```

- 5.反序列化

```
Person p1 = new Person();
byte[] bytes = SerializationUtils.serialize(p1);
Person p2 = (Person)SerializationUtils.deserialize(bytes);
```

## 21.讲讲单例模式懒汉式吧

直接贴代码

```
// 懒汉式
public class Singleton {
// 延迟加载保证多线程安全
    Private volatile static Singleton singleton;
    private Singleton(){}
    public static Singleton getInstance(){
        if(singleton == null){
            synchronized(Singleton.class){
                if(singleton == null){
                    singleton = new Singleton();
                }
            }
        }
        return singleton;
    }
}
```

- 使用 volatile 是**防止指令重排序，保证对象可见**，防止读到半初始化状态的对象
- 第一层if(singleton == null) 是为了防止有多个线程同时创建
- synchronized 是加锁防止多个线程同时进入该方法创建对象
- 第二层if(singleton == null) 是防止有多个线程同时等待锁，一个执行完了后面一个又继续执行的情况

[关于双检锁可以参考](https://blog.csdn.net/fly910905/article/details/79286680)

## 22.volatile 有什么作用

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-09.png)

- 1.**保证内存可见性**
  - 当一个被volatile关键字修饰的变量被一个线程修改的时候，其他线程可以立刻得到修改之后的结果。当一个线程向被volatile关键字修饰的变量**写入数据**的时候，虚拟机会**强制它被值刷新到主内存中**。当一个线程**读取**被volatile关键字修饰的值的时候，虚拟机会**强制要求它从主内存中读取**。
- 2.**禁止指令重排序**
  - 指令重排序是编译器和处理器为了高效对程序进行优化的手段，cpu  是与内存交互的，而 cpu 的效率想比内存高很多，所以 cpu 会在不影响最终结果的情况下，不等待返回结果直接进行后续的指令操作，而 volatile 就是给相应代码加了**内存屏障**，在屏障内的代码禁止指令重排序。

## 23.怎么保证线程安全？

- 1.synchronized关键字
  - 可以用于代码块，方法（静态方法，同步锁是当前字节码对象；实例方法，同步锁是实例对象）
- 2.lock锁机制

```
Lock lock = new ReentrantLock();
lock. lock();
try {
    System. out. println("获得锁");
} catch (Exception e) {
   
} finally {
    System. out. println("释放锁");
    lock. unlock();
}
```

## 24.synchronized 锁升级的过程

在 Java1.6 之前的版本中，synchronized 属于重量级锁，效率低下，**锁是** cpu 一个**总量级的资源**，每次获取锁都要和 cpu 申请，非常消耗性能。

在 **jdk1.6 之后** Java 官方对从 JVM 层面对 synchronized 较大优化，所以现在的 synchronized 锁效率也优化得很不错了，Jdk1.6 之后，为了减少获得锁和释放锁所带来的性能消耗，引入了偏向锁和轻量级锁，**增加了锁升级的过程**，由无锁->偏向锁->自旋锁->重量级锁
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-10.png)

增加锁升级的过程主要是**减少用户态到核心态的切换，提高锁的效率，从 jvm 层面优化锁**

## 25.cas 是什么？

cas 叫做 CompareAndSwap，**比较并交换**，很多地方使用到了它，比如锁升级中自旋锁就有用到，主要是**通过处理器的指令来保证操作的原子性**，它主要包含三个变量：

- **1.变量内存地址**
- **2.旧的预期值 A**
- **3.准备设置的新值 B**

当一个线程需要修改一个共享变量的值，完成这个操作需要先取出共享变量的值，赋给 A，基于 A 进行计算，得到新值 B，在用预期原值 A 和内存中的共享变量值进行比较，**如果相同就认为其他线程没有进行修改**，而将新值写入内存

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-11.png)

**CAS的缺点**

- **CPU开销比较大**：在并发量比较高的情况下，如果许多线程反复尝试更新某一个变量，却又一直更新不成功，又因为自旋的时候会一直占用CPU，如果CAS一直更新不成功就会一直占用，造成CPU的浪费。

- **ABA 问题**：比如线程 A 去修改 1 这个值，修改成功了，但是中间 线程 B 也修改了这个值，但是修改后的结果还是 1，所以不影响 A 的操作，这就会有问题。可以用**版本号**来解决这个问题。

- **只能保证一个共享变量的原子性**

## 26.聊聊 ReentrantLock 吧

ReentrantLock 意为**可重入锁**，说起 ReentrantLock 就不得不说 AQS ，因为其底层就是**使用 AQS 去实现**的。

ReentrantLock有两种模式，一种是公平锁，一种是非公平锁。

- 公平模式下等待线程入队列后会严格按照队列顺序去执行
- 非公平模式下等待线程入队列后有可能会出现插队情况

**公平锁**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-12.png)

- 第一步：**获取状态的 state 的值**
  - 如果 state=0 即代表锁没有被其它线程占用，执行第二步。
  - 如果 state!=0 则代表锁正在被其它线程占用，执行第三步。
- 第二步：**判断队列中是否有线程在排队等待**
  - 如果不存在则直接将锁的所有者设置成当前线程，且更新状态 state 。
  - 如果存在就入队。
- 第三步：**判断锁的所有者是不是当前线程**
  -   如果是则更新状态 state 的值。
  -   如果不是，线程进入队列排队等待。

**非公平锁**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-13.png)

-  获取状态的 state 的值
   - 如果 state=0 即代表锁没有被其它线程占用，则设置当前锁的持有者为当前线程，该操作用 CAS 完成。
   - 如果不为0或者设置失败，代表锁被占用进行下一步。
-  此时**获取 state 的值**
   - 如果是，则给state+1，获取锁
   - 如果不是，则进入队列等待
   - 如果是0，代表刚好线程释放了锁，此时将锁的持有者设为自己
   - 如果不是0，则查看线程持有者是不是自己

## 27.多线程的创建方式有哪些？

- 1、**继承Thread类**，重写run()方法

```
public class Demo extends Thread{
    //重写父类Thread的run()
    public void run() {
    }
    public static void main(String[] args) {
        Demo d1 = new Demo();
        Demo d2 = new Demo();
        d1.start();
        d2.start();
    }
}
```

- 2.**实现Runnable接口**，重写run()

```
public class Demo2 implements Runnable{

    //重写Runnable接口的run()
    public void run() {
    }
    
    public static void main(String[] args) {
        Thread t1 = new Thread(new Demo2());
        Thread t2 = new Thread(new Demo2());
        t1.start();
        t2.start();
    }

}
```

- 3.**实现 Callable 接口**

```
public class Demo implements Callable<String>{

    public String call() throws Exception {
        System.out.println("正在执行新建线程任务");
        Thread.sleep(2000);
        return "结果";
    }

    public static void main(String[] args) throws InterruptedException, ExecutionException {
        Demo d = new Demo();
        FutureTask<String> task = new FutureTask<>(d);
        Thread t = new Thread(task);
        t.start();
        //获取任务执行后返回的结果
        String result = task.get();
    }
    
}
```

- 4.**使用线程池创建**

```
public class Demo {
    public static void main(String[] args) {
        Executor threadPool = Executors.newFixedThreadPool(5);
        for(int i = 0 ;i < 10 ; i++) {
            threadPool.execute(new Runnable() {
                public void run() {
                    //todo
                }
            });
        }
        
    }
}
```

## 28.线程池有哪些参数？

- **1.corePoolSize**：**核心线程数**，线程池中始终存活的线程数。
- **2.maximumPoolSize**: **最大线程数**，线程池中允许的最大线程数。
- **3.keepAliveTime**: **存活时间**，线程没有任务执行时最多保持多久时间会终止。

- **4.unit**: **单位**，参数keepAliveTime的时间单位，7种可选。
- **5.workQueue**: 一个**阻塞队列**，用来存储等待执行的任务，均为线程安全，7种可选。
- **6.threadFactory**: **线程工厂**，主要用来创建线程，默及正常优先级、非守护线程。

- **7.handler**：**拒绝策略**，拒绝处理任务时的策略，4种可选，默认为AbortPolicy。

## 29.线程池的执行流程？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-14.png)

- 判断线程池中的线程数**是否大于设置的核心线程数**
  - 如果**小于**，就**创建**一个核心线程来执行任务
  - 如果**大于**，就会**判断缓冲队列是否满了**
    - 如果**没有满**，则**放入队列**，等待线程空闲时执行任务
    - 如果队列已经**满了**，则判断**是否达到了线程池设置的最大线程数**
      - 如果**没有达到**，就**创建新线程**来执行任务
      - 如果已经**达到了**最大线程数，则**执行指定的拒绝策略**

## 30.线程池的拒绝策略有哪些？

- **AbortPolicy**：直接丢弃任务，抛出异常，这是默认策略
- **CallerRunsPolicy**：只用调用者所在的线程来处理任务
- **DiscardOldestPolicy**：丢弃等待队列中最旧的任务，并执行当前任务
- **DiscardPolicy**：直接丢弃任务，也不抛出异常

## 31.介绍一下四种引用类型?

- **强引用 StrongReference**

```
Object obj = new Object(); 
//只要obj还指向Object对象，Object对象就不会被回收
```

垃圾回收器不会回收被引用的对象，哪怕内存不足时，JVM 也会直接抛出 OutOfMemoryError，除非赋值为 null。

- **软引用 SoftReference**

软引用是用来描述一些非必需但仍有用的对象。在内存足够的时候，软引用对象不会被回收，只有在内存不足时，系统则会回收软引用对象，如果回收了软引用对象之后仍然没有足够的内存，才会抛出内存溢出异常。

- **弱引用 WeakReference**

弱引用的引用强度比软引用要更弱一些，无论内存是否足够，只要 JVM 开始进行垃圾回收，那些被弱引用关联的对象都会被回收。

- **虚引用 PhantomReference**

虚引用是最弱的一种引用关系，如果一个对象仅持有虚引用，那么它就和没有任何引用一样，它随时可能会被回收，在 JDK1.2 之后，用 PhantomReference 类来表示，通过查看这个类的源码，发现它只有一个构造函数和一个 get() 方法，而且它的 get() 方法仅仅是返回一个null，也就是说将永远无法通过虚引用来获取对象，虚引用必须要和 ReferenceQueue 引用队列一起使用，NIO 的堆外内存就是靠其管理。

## 32.深拷贝、浅拷贝是什么？

- 浅拷贝并不是真的拷贝，只是**复制指向某个对象的指针**，而不复制对象本身，新旧对象还是共享同一块内存。
- 深拷贝会另外**创造一个一模一样的对象**，新对象跟原对象不共享内存，修改新对象不会改到原对象。

## 33.聊聊 ThreadLocal 吧

- ThreadLocal其实就是**线程本地变量**，他会在每个线程都创建一个副本，那么在线程之间访问内部副本变量就行了，做到了线程之间互相隔离。
![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-15.png)
- ThreadLocal 有一个**静态内部类 ThreadLocalMap**，ThreadLocalMap 又包含了一个 Entry 数组，**Entry 本身是一个弱引用**，他的 key 是指向 ThreadLocal 的弱引用，**弱引用的目的是为了防止内存泄露**,如果是强引用那么除非线程结束,否则无法终止,可能会有内存泄漏的风险。
- 但是这样还是会存在内存泄露的问题，假如 key 和 ThreadLocal 对象被回收之后，entry 中就存在 key 为 null ，但是 value 有值的 entry 对象，但是永远没办法被访问到，同样除非线程结束运行。**解决方法就是调用 remove 方法删除 entry 对象**。

## 34.一个对象的内存布局是怎么样的?

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/baguwen/basic-34-16.png)

- **1.对象头**:
  对象头又分为 **MarkWord** 和 **Class Pointer** 两部分。
   - **MarkWord**:包含一系列的标记位，比如轻量级锁的标记位，偏向锁标记位,gc记录信息等等。
   - **ClassPointer**:用来指向对象对应的 Class 对象（其对应的元数据对象）的内存地址。在 32 位系统占 4 字节，在 64 位系统中占 8 字节。
- **2.Length**:只在数组对象中存在，用来记录数组的长度，占用 4 字节
- **3.Instance data**:
  对象实际数据，对象实际数据包括了对象的所有成员变量，其大小由各个成员变量的大小决定。(这里不包括静态成员变量，因为其是在方法区维护的)
- **4.Padding**:Java 对象占用空间是 8 字节对齐的，即所有 Java 对象占用 bytes 数必须是 8 的倍数,是因为当我们从磁盘中取一个数据时，不会说我想取一个字节就是一个字节，都是按照一块儿一块儿来取的，这一块大小是 8 个字节，所以为了完整，padding 的作用就是补充字节，**保证对象是 8 字节的整数倍**。

---

>作者：moon聊技术，转载链接：[https://mp.weixin.qq.com/s/aTWtqPyMQ-6P_c8iuMVrkg](https://mp.weixin.qq.com/s/aTWtqPyMQ-6P_c8iuMVrkg)

---------

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
