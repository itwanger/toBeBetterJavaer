---
title: Java atomic包中的原子操作类总结
shortTitle: 原子操作类总结
description: Java atomic包中的原子操作类总结
category:
  - Java核心
tag:
  - Java并发编程
head:
  - - meta
    - name: keywords
      content: Java,并发编程,多线程,Thread,atomic,原子类
---

## 原子操作类介绍

在并发编程中很容易出现并发安全的问题，有一个很简单的例子就是多线程更新变量i=1,比如多个线程执行i++操作，就有可能获取不到正确的值，而这个问题，最常用的方法是通过Synchronized进行控制来达到线程安全的目的。

但是由于synchronized是采用的是悲观锁策略，并不是特别高效的一种解决方案。实际上，在J.U.C下的atomic包提供了一系列的操作简单，性能高效，并能保证线程安全的类去更新基本类型变量，数组元素，引用类型以及更新对象中的字段类型。atomic包下的这些类都是采用的是乐观锁策略去原子更新数据，在java中则是使用CAS操作具体实现。

## 预备知识--CAS操作

能够弄懂atomic包下这些原子操作类的实现原理，就要先明白什么是CAS操作。

> 什么是CAS?

使用锁时，线程获取锁是一种悲观锁策略，即假设每一次执行临界区代码都会产生冲突，所以当前线程获取到锁的时候同时也会阻塞其他线程获取该锁。而CAS操作（又称为无锁操作）是一种乐观锁策略，它假设所有线程访问共享资源的时候不会出现冲突，既然不会出现冲突自然而然就不会阻塞其他线程的操作。因此，线程就不会出现阻塞停顿的状态。那么，如果出现冲突了怎么办？无锁操作是使用CAS(compare and swap)又叫做比较交换来鉴别线程是否出现冲突，出现冲突就重试当前操作直到没有冲突为止。

> CAS的操作过程

CAS比较交换的过程可以通俗的理解为CAS(V,O,N)，包含三个值分别为：V 内存地址存放的实际值；O 预期的值（旧值）；N 更新的新值。当V和O相同时，也就是说旧值和内存中实际的值相同表明该值没有被其他线程更改过，即该旧值O就是目前来说最新的值了，自然而然可以将新值N赋值给V。反之，V和O不相同，表明该值已经被其他线程改过了则该旧值O不是最新版本的值了，所以不能将新值N赋给V，返回V即可。当多个线程使用CAS操作一个变量是，只有一个线程会成功，并成功更新，其余会失败。失败的线程会重新尝试，当然也可以选择挂起线程

CAS的实现需要硬件指令集的支撑，在JDK1.5后虚拟机才可以使用处理器提供的CMPXCHG指令实现。

**Synchronized VS CAS**

元老级的Synchronized(未优化前)最主要的问题是：在存在线程竞争的情况下会出现线程阻塞和唤醒锁带来的性能问题，因为这是一种互斥同步（阻塞同步）。而CAS并不是武断的间线程挂起，当CAS操作失败后会进行一定的尝试，而非进行耗时的挂起唤醒的操作，因此也叫做非阻塞同步。这是两者主要的区别。


> CAS的问题

1. ABA问题
因为CAS会检查旧值有没有变化，这里存在这样一个有意思的问题。比如一个旧值A变为了成B，然后再变成A，刚好在做CAS时检查发现旧值并没有变化依然为A，但是实际上的确发生了变化。解决方案可以沿袭数据库中常用的乐观锁方式，添加一个版本号可以解决。原来的变化路径A->B->A就变成了1A->2B->3C。

2. 自旋时间过长

使用CAS时非阻塞同步，也就是说不会将线程挂起，会自旋（无非就是一个死循环）进行下一次尝试，如果这里自旋时间过长对性能是很大的消耗。如果JVM能支持处理器提供的pause指令，那么在效率上会有一定的提升。


## 原子更新基本类型

atomic包提高原子更新基本类型的工具类，主要有这些：

1. AtomicBoolean：以原子更新的方式更新boolean；
2. AtomicInteger：以原子更新的方式更新Integer;
3. AtomicLong：以原子更新的方式更新Long；

这几个类的用法基本一致，这里以AtomicInteger为例总结常用的方法

1. addAndGet(int delta) ：以原子方式将输入的数值与实例中原本的值相加，并返回最后的结果；
2. incrementAndGet() ：以原子的方式将实例中的原值进行加1操作，并返回最终相加后的结果；
3. getAndSet(int newValue)：将实例中的值更新为新值，并返回旧值；
4. getAndIncrement()：以原子的方式将实例中的原值加1，返回的是自增前的旧值；

还有一些方法，可以查看API，不再赘述。为了能够弄懂AtomicInteger的实现原理，以getAndIncrement方法为例，来看下源码：

```java
public final int getAndIncrement() {
    return unsafe.getAndAddInt(this, valueOffset, 1);
}
```
	

可以看出，该方法实际上是调用了unsafe实例的getAndAddInt方法，unsafe实例的获取时通过UnSafe类的静态方法getUnsafe获取：

```java
private static final Unsafe unsafe = Unsafe.getUnsafe();
```

Unsafe类在sun.misc包下，Unsafer类提供了一些底层操作，atomic包下的原子操作类的也主要是通过Unsafe类提供的compareAndSwapInt，compareAndSwapLong等一系列提供CAS操作的方法来进行实现。下面用一个简单的例子来说明AtomicInteger的用法：

```java
public class AtomicDemo {
    private static AtomicInteger atomicInteger = new AtomicInteger(1);

    public static void main(String[] args) {
        System.out.println(atomicInteger.getAndIncrement());
        System.out.println(atomicInteger.get());
    }
}

输出结果：
1
2
```
例子很简单，就是新建了一个atomicInteger对象，而atomicInteger的构造方法也就是传入一个基本类型数据即可，对其进行了封装。对基本变量的操作比如自增，自减，相加，更新等操作，atomicInteger也提供了相应的方法进行这些操作。但是，因为atomicInteger借助了UnSafe提供的CAS操作能够保证数据更新的时候是线程安全的，并且由于CAS是采用乐观锁策略，因此，这种数据更新的方法也具有高效性。

AtomicLong的实现原理和AtomicInteger一致，只不过一个针对的是long变量，一个针对的是int变量。而boolean变量的更新类AtomicBoolean类是怎样实现更新的呢?核心方法是`compareAndSet`t方法，其源码如下：

```java
public final boolean compareAndSet(boolean expect, boolean update) {
    int e = expect ? 1 : 0;
    int u = update ? 1 : 0;
    return unsafe.compareAndSwapInt(this, valueOffset, e, u);
}
```

可以看出，compareAndSet方法的实际上也是先转换成0,1的整型变量，然后是通过针对int型变量的原子更新方法compareAndSwapInt来实现的。可以看出atomic包中只提供了对boolean,int ,long这三种基本类型的原子更新的方法，参考对boolean更新的方式，原子更新char,doule,float也可以采用类似的思路进行实现。

## 原子更新数组类型

atomic包下提供能原子更新数组中元素的类有：

1. AtomicIntegerArray：原子更新整型数组中的元素；
2. AtomicLongArray：原子更新长整型数组中的元素；
3. AtomicReferenceArray：原子更新引用类型数组中的元素

这几个类的用法一致，就以AtomicIntegerArray来总结下常用的方法：

1.  addAndGet(int i, int delta)：以原子更新的方式将数组中索引为i的元素与输入值相加；
2.  getAndIncrement(int i)：以原子更新的方式将数组中索引为i的元素自增加1；
3.  compareAndSet(int i, int expect, int update)：将数组中索引为i的位置的元素进行更新

可以看出，AtomicIntegerArray与AtomicInteger的方法基本一致，只不过在AtomicIntegerArray的方法中会多一个指定数组索引位i。下面举一个简单的例子：

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
输出结果：
7
2
```
通过getAndAdd方法将位置为1的元素加5，从结果可以看出索引为1的元素变成了7，该方法返回的也是相加之前的数为2。

## 原子更新引用类型 

如果需要原子更新引用类型变量的话，为了保证线程安全，atomic也提供了相关的类：

1. AtomicReference：原子更新引用类型；
2. AtomicReferenceFieldUpdater：原子更新引用类型里的字段；
3. AtomicMarkableReference：原子更新带有标记位的引用类型；

这几个类的使用方法也是基本一样的，以AtomicReference为例，来说明这些类的基本用法。下面是一个demo

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

输出结果：
User{userName='a', age=1}
User{userName='b', age=2}
```
首先将对象User1用AtomicReference进行封装，然后调用getAndSet方法，从结果可以看出，该方法会原子更新引用的user对象，变为`User{userName='b', age=2}`，返回的是原来的user对象User`{userName='a', age=1}`。

## 原子更新字段类型

如果需要更新对象的某个字段，并在多线程的情况下，能够保证线程安全，atomic同样也提供了相应的原子操作类：

1. AtomicIntegeFieldUpdater：原子更新整型字段类；
2. AtomicLongFieldUpdater：原子更新长整型字段类；
3. AtomicStampedReference：原子更新引用类型，这种更新方式会带有版本号。而为什么在更新的时候会带有版本号，是为了解决CAS的ABA问题；

要想使用原子更新字段需要两步操作：

1. 原子更新字段类都是抽象类，只能通过静态方法`newUpdater`来创建一个更新器，并且需要设置想要更新的类和属性；
2. 更新类的属性必须使用`public volatile`进行修饰；

这几个类提供的方法基本一致，以AtomicIntegerFieldUpdater为例来看看具体的使用：

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

输出结果：
1
6
```

从示例中可以看出，创建`AtomicIntegerFieldUpdater`是通过它提供的静态方法进行创建，`getAndAdd`方法会将指定的字段加上输入的值，并且返回相加之前的值。user对象中age字段原值为1，加5之后，可以看出user对象中的age字段的值已经变成了6。

---

>编辑：沉默王二，内容大部分来源以下三个开源仓库：
>- [深入浅出 Java 多线程](http://concurrent.redspider.group/)
>- [并发编程知识总结](https://github.com/CL0610/Java-concurrency)
>- [Java八股文](https://github.com/CoderLeixiaoshuai/java-eight-part)


----

GitHub 上标星 7600+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 7600+ 的 Java 教程](https://tobebetterjavaer.com/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

