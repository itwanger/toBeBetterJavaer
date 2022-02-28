当程序更新一个变量时，如果多线程同时更新这个变量，可能得到期望之外的值，比如变量i=1，A线程更新i+1，B线程也更新i+1，经过两个线程操作之后可能i不等于3，而是等于2。因为A和B线程在更新变量i的时候拿到的i都是1，这就是线程不安全的更新操作，一般我们会使用synchronized来解决这个问题，synchronized会保证多线程不会同时更新变量i。

其实除此之外，还有更轻量级的选择，Java从JDK 1.5开始提供了java.util.concurrent.atomic包，这个包中的原子操作类提供了一种用法简单、性能高效、线程安全地更新一个变量的方式。

因为变量的类型有很多种，所以在Atomic包里一共提供了13个类，属于4种类型的原子更新方式，分别是原子更新基本类型、原子更新数组、原子更新引用和原子更新属性（字段）。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/thread/sanfene/atomic-1.png)


Atomic包里的类基本都是使用Unsafe实现的包装类。

使用原子的方式更新基本类型，Atomic包提供了以下3个类：

*   AtomicBoolean：原子更新布尔类型。

*   AtomicInteger：原子更新整型。

*   AtomicLong：原子更新长整型。

通过原子的方式更新数组里的某个元素，Atomic包提供了以下4个类：

*   AtomicIntegerArray：原子更新整型数组里的元素。

*   AtomicLongArray：原子更新长整型数组里的元素。

*   AtomicReferenceArray：原子更新引用类型数组里的元素。

*   AtomicIntegerArray类主要是提供原子的方式更新数组里的整型

原子更新基本类型的AtomicInteger，只能更新一个变量，如果要原子更新多个变量，就需要使用这个原子更新引用类型提供的类。Atomic包提供了以下3个类：

*   AtomicReference：原子更新引用类型。

*   AtomicReferenceFieldUpdater：原子更新引用类型里的字段。

*   AtomicMarkableReference：原子更新带有标记位的引用类型。可以原子更新一个布尔类型的标记位和引用类型。构造方法是AtomicMarkableReference（V initialRef，boolean initialMark）。

如果需原子地更新某个类里的某个字段时，就需要使用原子更新字段类，Atomic包提供了以下3个类进行原子字段更新：

*   AtomicIntegerFieldUpdater：原子更新整型的字段的更新器。
*   AtomicLongFieldUpdater：原子更新长整型字段的更新器。
*   AtomicStampedReference：原子更新带有版本号的引用类型。该类将整数值与引用关联起来，可用于原子的更新数据和数据的版本号，可以解决使用CAS进行原子更新时可能出现的 ABA问题。
