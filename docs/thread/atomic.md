---
title: Java atomic包中的原子操作类（AtomicInteger）总结
shortTitle: 原子操作类Atomic
description: Java 中的 java.util.concurrent.atomic 包提供了一系列类，这些类支持原子操作（即线程安全而无需同步）在单个变量上，这大大减少了并发编程的复杂性。
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,atomic,原子类,AtomicInteger,AtomicIntegerArray,LongAdder,AtomicReference
---

# 第二十七节：原子操作类 Atomic

我们前面讲过 [CAS](https://javabetter.cn/thread/cas.html)，相信大家都还有印象，Java 中的原子操作类，如 AtomicInteger 和 AtomicLong，底层就是利用 CAS 来确保变量更新的原子性的。

像递增运算 count++ 就不是一个原子操作，在多线程环境下并不能得到正确的结果，因为 count++ 操作实际上分为三个步骤：

1. 读取 count 变量的值；
2. 将 count 变量的值加 1；
3. 将 count 变量的值写入到内存中；

假定线程 A 正在修改 count 变量，为了保证线程 B 在使用 count 的时候是线程 A 修改过后的状态，可以用 synchronized 关键字同步一手。

```java
private long count = 0;
public synchronized void write() {
    System.out.println("我寻了半生的春天，你一笑便是了。");
    count++;
}
```

但多个线程之间访问 `write()` 方法是互斥的，线程 B 访问的时候必须要等待线程 A 访问结束，有没有更好的办法呢？

AtomicInteger 是 JDK 提供的一个原子操作的 Integer 类，它提供的加减操作是线程安全的。于是我们可以这样：

```java
private AtomicInteger count = new AtomicInteger(0);
public void write() {
    System.out.println("我寻了半生的春天，你一笑便是了。");
    count.incrementAndGet();
}
```

你看，这下是不是就舒服多了，不用加锁，也能保证线程安全。OK，接下来，我们来看看原子操作类都有哪些？

## 原子操作的基本数据类型

基本类型的原子操作主要有这些：

1. AtomicBoolean：以原子更新的方式更新 boolean；
2. AtomicInteger：以原子更新的方式更新 Integer;
3. AtomicLong：以原子更新的方式更新 Long；

这几个类的用法基本一致，这里以 AtomicInteger 为例。

1. `addAndGet(int delta)` ：增加给定的 delta，并获取新值。
2. `incrementAndGet()`：增加 1，并获取新值。
3. `getAndSet(int newValue)`：获取当前值，并将新值设置为 newValue。
4. `getAndIncrement()`：获取当前值，并增加 1。

还有一些方法，可以直接查看 API，都很好理解。

![](https://cdn.tobebetterjavaer.com/stutymore/atomic-20230824144636.png)

为了能够弄懂 AtomicInteger 的实现原理，以 getAndIncrement 方法为例，来看下源码：

```java
public final int getAndIncrement() {
    // 使用Unsafe类中的getAndAddInt方法原子地增加AtomicInteger的当前值
    // 第一个参数this是AtomicInteger的当前实例
    // 第二个参数valueOffset是一个偏移量，它指示在AtomicInteger对象中的哪个位置可以找到实际的int值
    // 第三个参数1表示要加到当前值上的值（即增加的值）
    // 此方法返回的是增加前的原始值
    return unsafe.getAndAddInt(this, valueOffset, 1);
}
```

可以看出，该方法实际上是调用了 unsafe 对象的 getAndAddInt 方法，unsafe 对象是通过通过 UnSafe 类的静态方法 getUnsafe 获取的：

```java
private static final Unsafe unsafe = Unsafe.getUnsafe();
```

Unsafe 类我们在讲 [CAS](https://javabetter.cn/thread/cas.html) 的时候也讲过，包括 AtomicInteger 类，相信大家还有印象。

Unsafe 类是 Java 中的一个特殊类，用于执行低级、不安全的操作。getAndIncrement 方法就是利用了 Unsafe 类提供的 CAS（Compare-And-Swap）操作来实现原子的 increment 操作。CAS 是一种常用的无锁技术，允许在多线程环境中原子地更新值。

好，下面用一个简单的例子来说明 AtomicInteger 的用法：

```java
public class AtomicDemo {
    private static AtomicInteger atomicInteger = new AtomicInteger(1);

    public static void main(String[] args) {
        System.out.println(atomicInteger.getAndIncrement());
        System.out.println(atomicInteger.get());
    }
}
```

输出结果：

```
1
2
```

AtomicLong 和 AtomicInteger 的实现原理基本一致，只不过一个针对的是 long 型，一个针对的是 int 型。

AtomicBoolean 类是怎样实现更新的呢？核心方法是`compareAndSet` 方法，其源码如下：

```java
public final boolean compareAndSet(boolean expect, boolean update) {
    // 将expect布尔值转化为整数，true为1，false为0
    int e = expect ? 1 : 0;
    
    // 将update布尔值转化为整数，true为1，false为0
    int u = update ? 1 : 0;
    
    // 使用Unsafe类中的compareAndSwapInt方法尝试原子地更新AtomicBoolean的当前值
    // 第一个参数this是AtomicBoolean的当前实例
    // 第二个参数valueOffset是一个偏移量，它指示在AtomicBoolean对象中的哪个位置可以找到实际的int值
    // 第三个参数e是我们期望的当前值（转换为整数后的值）
    // 第四个参数u是我们想要更新的值（转换为整数后的值）
    // 如果当前值与期望值e相等，它会被原子地设置为u，并返回true；否则返回false。
    return unsafe.compareAndSwapInt(this, valueOffset, e, u);
}
```

该方法尝试将当前值从expect设置为update，但这种设置只会在当前值确实为expect时成功。方法返回true表示更新成功，否则返回false。

## 原子操作的数组类型

如果需要原子更新数组里的某个元素，atomic 也提供了相应的类：

1. AtomicIntegerArray：这个类提供了一些原子更新 int 整数数组的方法。
2. AtomicLongArray：这个类提供了一些原子更新 long 型证书数组的方法。
3. AtomicReferenceArray：这个类提供了一些原子更新引用类型数组的方法。

这几个类的用法一致，就以 AtomicIntegerArray 来总结下常用的方法：

1. ` addAndGet(int i, int delta)`：以原子更新的方式将数组中索引为 i 的元素与输入值相加；
2.  `getAndIncrement(int i)`：以原子更新的方式将数组中索引为 i 的元素自增加 1；
3.  `compareAndSet(int i, int expect, int update)`：将数组中索引为 i 的位置的元素进行更新

可以看出，AtomicIntegerArray 与 AtomicInteger 的方法基本一致，只不过在 AtomicIntegerArray 的方法中会多一个数组索引 i。下面举一个简单的例子：

```java
public class AtomicDemo {
    //    private static AtomicInteger atomicInteger = new AtomicInteger(1);
    private static int[] value = new int[]{1, 2, 3};
    private static AtomicIntegerArray integerArray = new AtomicIntegerArray(value);

    public static void main(String[] args) {
        //对数组中索引为1的位置的元素加5
        int result = integerArray.getAndAdd(1, 5);
        System.out.println(integerArray.get(1));
        System.out.println(result);
    }
}
```

输出结果：

```
7
2
```

通过 getAndAdd 方法将位置为 1 的元素加 5，从结果可以看出索引为 1 的元素变成了 7，该方法返回的也是相加之前的数为 2。

## 原子操作的引用类型

如果需要原子更新引用类型的话，atomic 也提供了相关的类：

1. AtomicReference：原子更新引用类型；
2. AtomicReferenceFieldUpdater：原子更新引用类型里的字段；
3. AtomicMarkableReference：原子更新带有标记位的引用类型；

这几个类的使用方法也是基本一样，以 AtomicReference 为例，来说明这些类的基本用法。下面是一个 demo：

```java
public class AtomicDemo {

    private static AtomicReference<User> reference = new AtomicReference<>();

    public static void main(String[] args) {
        User user1 = new User("a", 1);
        reference.set(user1);
        User user2 = new User("b",2);
        User user = reference.getAndSet(user2);
        System.out.println(user);
        System.out.println(reference.get());
    }

    static class User {
        private String userName;
        private int age;

        public User(String userName, int age) {
            this.userName = userName;
            this.age = age;
        }

        @Override
        public String toString() {
            return "User{" +
                    "userName='" + userName + '\'' +
                    ", age=" + age +
                    '}';
        }
    }
}
```

输出结果：

```
User{userName='a', age=1}
User{userName='b', age=2}
```

首先将对象 User1 用 AtomicReference 进行封装，然后调用 getAndSet 方法进行赋值，从结果可以看出，该方法会原子更新 user 对象，变为 `User{userName='b', age=2}`。

## 原子更新字段类型

如果需要更新对象的某个字段，atomic 同样也提供了相应的原子操作类：

1. AtomicIntegeFieldUpdater：原子更新整型字段类；
2. AtomicLongFieldUpdater：原子更新长整型字段类；
3. AtomicStampedReference：原子更新引用类型，这种更新方式会带有版本号，是为了解决 [CAS 的 ABA 问题](https://javabetter.cn/thread/cas.html#aba%E9%97%AE%E9%A2%98)，ABA 问题我们前面也讲过。

使用原子更新字段需要两步：

1. 通过静态方法`newUpdater`创建一个更新器，并且设置想要更新的类和字段；
2. 字段必须使用`public volatile`进行修饰；

以 AtomicIntegerFieldUpdater 为例来看看具体的使用：

```java
public class AtomicDemo {

    private static AtomicIntegerFieldUpdater updater = AtomicIntegerFieldUpdater.newUpdater(User.class,"age");
    public static void main(String[] args) {
        User user = new User("a", 1);
        int oldValue = updater.getAndAdd(user, 5);
        System.out.println(oldValue);
        System.out.println(updater.get(user));
    }

    static class User {
        private String userName;
        public volatile int age;

        public User(String userName, int age) {
            this.userName = userName;
            this.age = age;
        }

        @Override
        public String toString() {
            return "User{" +
                    "userName='" + userName + '\'' +
                    ", age=" + age +
                    '}';
        }
    }
}
```

输出结果：

```
1
6
```

从示例中可以看出，创建`AtomicIntegerFieldUpdater`是通过它提供的静态方法进行创建的，`getAndAdd`方法会将指定的字段加上输入的值，并返回相加之前的值。user 对象中 age 字段原值为 1，加 5 之后变成了 6。

## 小结

Java 中的 java.util.concurrent.atomic 包提供了一系列类，这些类支持原子操作（即线程安全而无需同步）在单个变量上，这大大减少了并发编程的复杂性。

原子操作类主要有这些：

1. 原子操作的基本数据类型：AtomicBoolean、AtomicInteger、AtomicLong；
2. 原子操作的数组类型：AtomicIntegerArray、AtomicLongArray、AtomicReferenceArray；
3. 原子操作的引用类型：AtomicReference、AtomicReferenceFieldUpdater、AtomicMarkableReference；



>编辑：沉默王二，编辑前的内容主要来自于CL0610的 GitHub 仓库[https://github.com/CL0610/Java-concurrency](https://github.com/CL0610/Java-concurrency/blob/master/24.Java中atomic包中的原子操作类总结/Java中atomic包中的原子操作类总结.md)。推荐阅读：[码农参上的Unsafe类详解](https://mp.weixin.qq.com/s/K5JrXsKVWoJ5JF3P95_P3w)

---

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第二份 PDF 《[并发编程小册](https://javabetter.cn/thread/)》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，二哥的并发编程进阶之路.pdf](https://javabetter.cn/thread/)

[加入二哥的编程星球](https://javabetter.cn/thread/)，在星球的第二个置顶帖「[知识图谱](https://javabetter.cn/thread/)」里就可以获取 PDF 版本。

![](https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png)
