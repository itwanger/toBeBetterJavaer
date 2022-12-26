---
title: Java WeakHashMap详解（附源码分析）
shortTitle: 详解WeakHashMap
category:
  - Java核心
tag:
  - 集合框架（容器）
description: Java程序员进阶之路，小白的零基础Java教程，Java WeakHashMap详解（附源码分析）
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,WeakHashMap
---


在Java中，我们一般都会使用到Map，比如[HashMap](https://tobebetterjavaer.com/collection/hashmap.html)这样的具体实现。更高级一点，我们可能会使用WeakHashMap。

WeakHashMap其实和HashMap大多数行为是一样的，只是WeakHashMap不会阻止GC回收key对象（不是value），那么WeakHashMap是怎么做到的呢，这就是我们研究的主要问题。

在开始WeakHashMap之前，我们先要对弱引用有一定的了解。

在Java中，有四种引用类型

*   强引用(Strong Reference)，我们正常编码时默认的引用类型，强应用之所以为强，是因为如果一个对象到GC Roots强引用可到达，就可以阻止GC回收该对象
*   软引用（Soft Reference）阻止GC回收的能力相对弱一些，如果是软引用可以到达，那么这个对象会停留在内存更时间上长一些。当内存不足时垃圾回收器才会回收这些软引用可到达的对象
*   弱引用（WeakReference）无法阻止GC回收，如果一个对象时弱引用可到达，那么在下一个GC回收执行时，该对象就会被回收掉。
*   虚引用（Phantom Reference）十分脆弱，它的唯一作用就是当其指向的对象被回收之后，自己被加入到引用队列，用作记录该引用指向的对象已被销毁

这其中还有一个概念叫做引用队列(Reference Queue)

*   一般情况下，一个对象标记为垃圾（并不代表回收了）后，会加入到引用队列。
*   对于虚引用来说，它指向的对象会只有被回收后才会加入引用队列，所以可以用作记录该引用指向的对象是否回收。

## WeakHashMap如何不阻止对象回收呢


```java
private static final class Entry<K, V> extends WeakReference<K> implements
  Map.Entry<K, V> {
  int hash;
  boolean isNull;
  V value;
  Entry<K, V> next;
  interface Type<R, K, V> {
  R get(Map.Entry<K, V> entry);
  }
  Entry(K key, V object, ReferenceQueue<K> queue) {
  super(key, queue);
  isNull = key == null;
  hash = isNull ? 0 : key.hashCode();
  value = object;
  }
```
 


如源码所示，

*   WeakHashMap的Entry继承了WeakReference。
*   其中Key作为了WeakReference指向的对象
*   因此WeakHashMap利用了WeakReference的机制来实现不阻止GC回收Key

## 如何删除被回收的key数据呢

在Javadoc中关于WeakHashMap有这样的描述，当key不再引用时，其对应的key/value也会被移除。

那么是如何移除的呢，这里我们通常有两种假设策略

*   当对象被回收的时候，进行通知
*   WeakHashMap轮询处理时效的Entry

而WeakHashMap采用的是轮询的形式，在其put/get/size等方法调用的时候都会预先调用一个poll的方法，来检查并删除失效的Entry

```java
void poll() {
  Entry<K, V> toRemove;
  while ((toRemove = (Entry<K, V>) referenceQueue.poll()) != null) {
  removeEntry(toRemove);
  Log.d(LOGTAG, "removeEntry=" + toRemove.value);
  }
 }
```
 

为什么没有使用看似更好的通知呢，我想是因为在Java中没有一个可靠的通知回调，比如大家常说的finalize方法，其实也不是标准的，不同的JVM可以实现不同，甚至是不调用这个方法。

当然除了单纯的看源码，进行合理的验证是检验分析正确的一个重要方法。

这里首先，我们定义一个MyObject类，处理一下finalize方法（在我的测试机上可以正常调用，仅仅做为辅助验证手段）

```java
class MyObject(val id: String) : Any() {
  protected fun finalize() {
  Log.i("MainActivity", "Object($id) finalize method is called")
  }
 }
```
 


然后是调用者的代码，如下

```java
private val weakHashMap = WeakHashMap<Any, Int>()
 var count : Int = 0
 override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(savedInstanceState)
  setContentView(R.layout.activity_main)
  setSupportActionBar(toolbar)
  dumpWeakInfo()
  fab.setOnClickListener { view ->
  //System.gc()// this seldom works use Android studio force gc stop
  weakHashMap.put(MyObject(count.toString()), count)
  count ++
  dumpWeakInfo()
  Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
  .setAction("Action", null).show()
  }
 }
  fun dumpWeakInfo() {
  Log.i("MainActivity", "dumpWeakInfo weakInfo.size=${weakHashMap.size}")
 }
```
 


我们按照如下操作

*   点击fab控件，每次对WeakhashMap对象增加一个Entry，并打印WeakHashMap的size 执行3此
*   在没有强制触发GC时，WeakHashMap对象size一直会增加
*   手动出发Force GC，我们会看到MyObject有finalize方法被调用
*   再次点击fab空间，然后输出的WeakHashMap size急剧减少。
*   同样我们收到在WeakHashMap增加的日志也会输出


```java
I/MainActivity(10202): dumpWeakInfo weakInfo.size=1
 I/MainActivity(10202): dumpWeakInfo weakInfo.size=2
 I/MainActivity(10202): dumpWeakInfo weakInfo.size=3
 I/MainActivity(10202): Object(2) finalize method is called
 I/MainActivity(10202): Object(1) finalize method is called
 I/MainActivity(10202): Object(0) finalize method is called
 I/WeakHashMap(10202): removeEntry=2
 I/WeakHashMap(10202): removeEntry=0
 I/WeakHashMap(10202): removeEntry=1
 I/MainActivity(10202): dumpWeakInfo weakInfo.size=1
```
 

注意：System.gc()并不一定可以工作,建议使用Android Studio的Force GC

完整的测试代码可以访问这里 [https://github.com/androidyue/WeakHashMapSample](https://github.com/androidyue/WeakHashMapSample)


----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)