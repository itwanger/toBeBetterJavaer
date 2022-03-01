## String

### 31.String 是 Java 基本数据类型吗？可以被继承吗？

> String 是 Java 基本数据类型吗？

不是。Java 中的基本数据类型只有 8 个：byte、short、int、long、float、double、char、boolean；除了基本类型（primitive type），剩下的都是引用类型（reference type）。

String 是一个比较特殊的引用数据类型。

> String 类可以继承吗？

不行。String 类使用 final 修饰，是所谓的不可变类，无法被继承。

### 32.String 和 StringBuilder、StringBuffer 的区别？

- String：String 的值被创建后不能修改，任何对 String 的修改都会引发新的 String 对象的生成。
- StringBuffer：跟 String 类似，但是值可以被修改，使用 synchronized 来保证线程安全。
- StringBuilder：StringBuffer 的非线程安全版本，性能上更高一些。

### 33.String str1 = new String("abc")和 String str2 = "abc" 和 区别？

两个语句都会去字符串常量池中检查是否已经存在 “abc”，如果有则直接使用，如果没有则会在常量池中创建 “abc” 对象。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/useful-class-1.png)

但是不同的是，String str1 = new String("abc") 还会通过 new String() 在堆里创建一个 "abc" 字符串对象实例。所以后者可以理解为被前者包含。

> String s = new String("abc")创建了几个对象？

很明显，一个或两个。如果字符串常量池已经有“abc”，则是一个；否则，两个。

当字符创常量池没有 “abc”，此时会创建如下两个对象：

- 一个是字符串字面量 "abc" 所对应的、字符串常量池中的实例
- 另一个是通过 new String() 创建并初始化的，内容与"abc"相同的实例，在堆中。

### 34.String 不是不可变类吗？字符串拼接是如何实现的？

String 的确是不可变的，“**+**”的拼接操作，其实是会生成新的对象。

例如：

```java
String a = "hello ";
String b = "world!";
String ab = a + b;
```

在**jdk1.8 之前**，a 和 b 初始化时位于字符串常量池，ab 拼接后的对象位于堆中。经过拼接新生成了 String 对象。如果拼接多次，那么会生成多个中间对象。

内存如下：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/useful-class-2.png)

在**Java8 时**JDK 对“+”号拼接进行了优化，上面所写的拼接方式会被优化为基于 StringBuilder 的 append 方法进行处理。Java 会在编译期对“+”号进行处理。

下面是通过 javap -verbose 命令反编译字节码的结果，很显然可以看到 StringBuilder 的创建和 append 方法的调用。

```java
stack=2, locals=4, args_size=1
     0: ldc           #2                  // String hello
     2: astore_1
     3: ldc           #3                  // String world!
     5: astore_2
     6: new           #4                  // class java/lang/StringBuilder
     9: dup
    10: invokespecial #5                  // Method java/lang/StringBuilder."<init>":()V
    13: aload_1
    14: invokevirtual #6                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
    17: aload_2
    18: invokevirtual #6                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
    21: invokevirtual #7                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
    24: astore_3
    25: return

```

也就是说其实上面的代码其实相当于：

```java
String a = "hello ";
String b = "world!";
StringBuilder sb = new StringBuilder();
sb.append(a);
sb.append(b);
String ab = sb.toString();
```

此时，如果再笼统的回答：通过加号拼接字符串会创建多个 String 对象，因此性能比 StringBuilder 差，就是错误的了。因为本质上加号拼接的效果最终经过编译器处理之后和 StringBuilder 是一致的。

当然，循环里拼接还是建议用 StringBuilder，为什么，因为循环一次就会创建一个新的 StringBuilder 对象，大家可以自行实验。

### 35.intern 方法有什么作用？

JDK 源码里已经对这个方法进行了说明：

```java
     * <p>
     * When the intern method is invoked, if the pool already contains a
     * string equal to this {@code String} object as determined by
     * the {@link #equals(Object)} method, then the string from the pool is
     * returned. Otherwise, this {@code String} object is added to the
     * pool and a reference to this {@code String} object is returned.
     * <p>
```

意思也很好懂：

- 如果当前字符串内容存在于字符串常量池（即 equals()方法为 true，也就是内容一样），直接返回字符串常量池中的字符串
- 否则，将此 String 对象添加到池中，并返回 String 对象的引用

## Integer

### 36.Integer a= 127，Integer b = 127；Integer c= 128，Integer d = 128；，相等吗?

答案是 a 和 b 相等，c 和 d 不相等。

- 对于基本数据类型==比较的值
- 对于引用数据类型==比较的是地址

Integer a= 127 这种赋值，是用到了 Integer 自动装箱的机制。自动装箱的时候会去缓存池里取 Integer 对象，没有取到才会创建新的对象。

如果整型字面量的值在-128 到 127 之间，那么自动装箱时不会 new 新的 Integer 对象，而是直接引用缓存池中的 Integer 对象，超过范围 a1==b1 的结果是 false

```java
    public static void main(String[] args) {
        Integer a = 127;
        Integer b = 127;
        Integer b1 = new Integer(127);
        System.out.println(a == b); //true
        System.out.println(b==b1);  //false

        Integer c = 128;
        Integer d = 128;
        System.out.println(c == d);  //false
    }
```

> 什么是 Integer 缓存？

因为根据实践发现大部分的数据操作都集中在值比较小的范围，因此 Integer 搞了个缓存池，默认范围是 -128 到 127，可以根据通过设置`JVM-XX:AutoBoxCacheMax=`来修改缓存的最大值，最小值改不了。

实现的原理是 int 在自动装箱的时候会调用 Integer.valueOf，进而用到了 IntegerCache。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/useful-class-3.png)

很简单，就是判断下值是否在缓存范围之内，如果是的话去 IntegerCache 中取，不是的话就创建一个新的 Integer 对象。

IntegerCache 是一个静态内部类， 在静态块中会初始化好缓存值。

```java
 private static class IntegerCache {
     ……
     static {
            //创建Integer对象存储
            for(int k = 0; k < cache.length; k++)
                cache[k] = new Integer(j++);
         ……
     }
 }
```

### 37.String 怎么转成 Integer 的？原理？

PS:这道题印象中在一些面经中出场过几次。

String 转成 Integer，主要有两个方法：

- Integer.parseInt(String s)
- Integer.valueOf(String s)

不管哪一种，最终还是会调用 Integer 类内中的`parseInt(String s, int radix)`方法。

抛去一些边界之类的看看核心代码：

```java
public static int parseInt(String s, int radix)
                throws NumberFormatException
    {

        int result = 0;
        //是否是负数
        boolean negative = false;
        //char字符数组下标和长度
        int i = 0, len = s.length();
        ……
        int digit;
        //判断字符长度是否大于0，否则抛出异常
        if (len > 0) {
            ……
            while (i < len) {
                // Accumulating negatively avoids surprises near MAX_VALUE
                //返回指定基数中字符表示的数值。（此处是十进制数值）
                digit = Character.digit(s.charAt(i++),radix);
                //进制位乘以数值
                result *= radix;
                result -= digit;
            }
        }
        //根据上面得到的是否负数，返回相应的值
        return negative ? result : -result;
    }

```

去掉枝枝蔓蔓（当然这些枝枝蔓蔓可以去看看，源码 cover 了很多情况），其实剩下的就是一个简单的字符串遍历计算，不过计算方式有点反常规，是用负的值累减。

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/useful-class-4.png)

## Object

### 38.Object 类的常见方法?

Object 类是一个特殊的类，是所有类的父类，也就是说所有类都可以调用它的方法。它主要提供了以下 11 个方法，大概可以分为六类：

![](https://cdn.jsdelivr.net/gh/itwanger/toBeBetterJavaer/images/overview/sanfene/useful-class-5.png)

**对象比较**：

- public native int hashCode() ：native 方法，用于返回对象的哈希码，主要使用在哈希表中，比如 JDK 中的 HashMap。
- public boolean equals(Object obj)：用于比较 2 个对象的内存地址是否相等，String 类对该方法进行了重写用户比较字符串的值是否相等。

**对象拷贝**：

- protected native Object clone() throws CloneNotSupportedException：naitive 方法，用于创建并返回当前对象的一份拷贝。一般情况下，对于任何对象 x，表达式 x.clone() != x 为 true，x.clone().getClass() == x.getClass() 为 true。Object 本身没有实现 Cloneable 接口，所以不重写 clone 方法并且进行调用的话会发生 CloneNotSupportedException 异常。

**对象转字符串：**

- public String toString()：返回类的名字@实例的哈希码的 16 进制的字符串。建议 Object 所有的子类都重写这个方法。

**多线程调度：**

- public final native void notify()：native 方法，并且不能重写。唤醒一个在此对象监视器上等待的线程(监视器相当于就是锁的概念)。如果有多个线程在等待只会任意唤醒一个。
- public final native void notifyAll()：native 方法，并且不能重写。跟 notify 一样，唯一的区别就是会唤醒在此对象监视器上等待的所有线程，而不是一个线程。
- public final native void wait(long timeout) throws InterruptedException：native 方法，并且不能重写。暂停线程的执行。注意：sleep 方法没有释放锁，而 wait 方法释放了锁 。timeout 是等待时间。
- public final void wait(long timeout, int nanos) throws InterruptedException：多了 nanos 参数，这个参数表示额外时间（以毫微秒为单位，范围是 0-999999）。 所以超时的时间还需要加上 nanos 毫秒。
- public final void wait() throws InterruptedException：跟之前的 2 个 wait 方法一样，只不过该方法一直等待，没有超时时间这个概念

**反射：**

- public final native Class<?> getClass()：native 方法，用于返回当前运行时对象的 Class 对象，使用了 final 关键字修饰，故不允许子类重写。

**垃圾回收：**

- protected void finalize() throws Throwable ：通知垃圾收集器回收对象。
