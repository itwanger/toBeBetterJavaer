---
title: 大白话说清楚Java反射：入门、使用、原理
shortTitle: Java反射：入门、使用、原理
category:
  - Java核心
tag:
  - Java重要知识点
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，大白话说清楚Java反射：入门、使用、原理
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,反射
---

“二哥，什么是反射呀？”三妹开门见山地问。

“要想知道什么是反射，就需要先来了解什么是‘正射’。”我笑着对三妹说，“一般情况下，我们在使用某个类之前已经确定它到底是个什么类了，拿到手就直接可以使用 `new` 关键字来调用构造方法进行初始化，之后使用这个类的对象来进行操作。”

```java
Writer writer = new Writer();
writer.setName("沉默王二");
```

像上面这个例子，就可以理解为“正射”。而反射就意味着一开始我们不知道要初始化的类到底是什么，也就没法直接使用 `new` 关键字创建对象了。

我们只知道这个类的一些基本信息，就好像我们看电影的时候，为了抓住一个犯罪嫌疑人，警察就会问一些目击证人，根据这些证人提供的信息，找专家把犯罪嫌疑人的样貌给画出来——这个过程，就可以称之为**反射**。

```java
Class clazz = Class.forName("com.itwanger.s39.Writer");
Method method = clazz.getMethod("setName", String.class);
Constructor constructor = clazz.getConstructor();
Object object = constructor.newInstance();
method.invoke(object,"沉默王二");
```

像上面这个例子，就可以理解为“反射”。

“反射的写法比正射复杂得多啊！”三妹感慨地说。

“是的，反射的成本是要比正射的高得多。”我说，“反射的缺点主要有两个。”

- **破坏封装**：由于反射允许访问私有字段和私有方法，所以可能会破坏封装而导致安全问题。
- **性能开销**：由于反射涉及到动态解析，因此无法执行 Java 虚拟机优化，再加上反射的写法的确要复杂得多，所以性能要比“正射”差很多，在一些性能敏感的程序中应该避免使用反射。

“那反射有哪些好处呢？”三妹问。

反射的主要应用场景有：

- **开发通用框架**：像 Spring，为了保持通用性，通过配置文件来加载不同的对象，调用不同的方法。
- **动态代理**：在面向切面编程中，需要拦截特定的方法，就会选择动态代理的方式，而动态代理的底层技术就是反射。
- **注解**：注解本身只是起到一个标记符的作用，它需要利用发射机制，根据标记符去执行特定的行为。

“好了，来看一下完整的例子吧。”我对三妹说。

Writer 类，有两个字段，然后还有对应的 getter/setter。

```java
public class Writer {
    private int age;
    private String name;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

测试类：

```java
public class ReflectionDemo1 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        Writer writer = new Writer();
        writer.setName("沉默王二");
        System.out.println(writer.getName());

        Class clazz = Class.forName("com.itwanger.s39.Writer");
        Constructor constructor = clazz.getConstructor();
        Object object = constructor.newInstance();

        Method setNameMethod = clazz.getMethod("setName", String.class);
        setNameMethod.invoke(object, "沉默王二");
        Method getNameMethod = clazz.getMethod("getName");
        System.out.println(getNameMethod.invoke(object));
    }
}
```

来看一下输出结果：

```
沉默王二
沉默王二
```

只不过，反射的过程略显曲折了一些。

第一步，获取反射类的 Class 对象：

```java
Class clazz = Class.forName("com.itwanger.s39.Writer");
```

第二步，通过  Class 对象获取构造方法 Constructor 对象：

```java
Constructor constructor = clazz.getConstructor();
```

第三步，通过 Constructor 对象初始化反射类对象：

```java
Object object = constructor.newInstance();
```

第四步，获取要调用的方法的 Method 对象：

```java
Method setNameMethod = clazz.getMethod("setName", String.class);
Method getNameMethod = clazz.getMethod("getName");
```

第五步，通过 `invoke()` 方法执行：

```java
setNameMethod.invoke(object, "沉默王二");
getNameMethod.invoke(object)
```

“三妹，你看，经过这五个步骤，基本上就掌握了反射的使用方法。”我说。

“好像反射也没什么复杂的啊！”三妹说。

我先对三妹点点头，然后说：“是的，掌握反射的基本使用方法确实不难，但要理解整个反射机制还是需要花一点时间去了解一下 Java 虚拟机的类加载机制的。”

要想使用反射，首先需要获得反射类的 Class 对象，每一个类，不管它最终生成了多少个对象，这些对象只会对应一个 Class 对象，这个 Class 对象是由 Java 虚拟机生成的，由它来获悉整个类的结构信息。

也就是说，`java.lang.Class` 是所有反射 API 的入口。

而方法的反射调用，最终是由 Method 对象的 `invoke()` 方法完成的，来看一下源码（JDK 8 环境下）。

```java
@CallerSensitive
public Object invoke(Object obj, Object... args)
        throws IllegalAccessException, IllegalArgumentException,
        InvocationTargetException
{
    if (!override) {
        if (!Reflection.quickCheckMemberAccess(clazz, modifiers)) {
            Class<?> caller = Reflection.getCallerClass();
            checkAccess(caller, clazz, obj, modifiers);
        }
    }
    MethodAccessor ma = methodAccessor;             // read volatile
    if (ma == null) {
        ma = acquireMethodAccessor();
    }
    return ma.invoke(obj, args);
}
```

两个嵌套的 if 语句是用来进行权限检查的。

`invoke()` 方法实际上是委派给 MethodAccessor 接口来完成的。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/fanshe/fanshe-01.png)

MethodAccessor 接口有三个实现类，其中的 MethodAccessorImpl 是一个抽象类，另外两个具体的实现类继承了这个抽象类。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/fanshe/fanshe-02.png)

- NativeMethodAccessorImpl：通过本地方法来实现反射调用；
- DelegatingMethodAccessorImpl：通过委派模式来实现反射调用；

通过 debug 的方式进入 `invoke()` 方法后，可以看到第一次反射调用会生成一个委派实现 DelegatingMethodAccessorImpl，它在生成的时候会传递一个本地实现 NativeMethodAccessorImpl。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/fanshe/fanshe-03.png)

也就是说，`invoke()` 方法在执行的时候，会先调用 DelegatingMethodAccessorImpl，然后调用 NativeMethodAccessorImpl，最后再调用实际的方法。

“为什么不直接调用本地实现呢？”三妹问。

“之所以采用委派实现，是为了能够在本地实现和动态实现之间切换。动态实现是另外一种反射调用机制，它是通过生成字节码的形式来实现的。如果反射调用的次数比较多，动态实现的效率就会更高，因为本地实现需要经过 Java 到 C/C++ 再到 Java 之间的切换过程，而动态实现不需要；但如果反射调用的次数比较少，反而本地实现更快一些。”我说。

“那临界点是多少呢？”三妹问。

“默认是 15 次。”我说，“可以通过 `-Dsun.reflect.inflationThreshold` 参数类调整。”

来看下面这个例子。

```java
Method setAgeMethod = clazz.getMethod("setAge", int.class);
for (int i = 0;i < 20; i++) {
    setAgeMethod.invoke(object, 18);
}
```

在 `invoke()` 方法处加断点进入 debug 模式，当 i = 15 的时候，也就是第 16 次执行的时候，会进入到 if 条件分支中，改变 DelegatingMethodAccessorImpl 的委派模式 delegate 为 `(MethodAccessorImpl)(new MethodAccessorGenerator()).generateMethod()`，而之前的委派模式 delegate 为 NativeMethodAccessorImpl。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/fanshe/fanshe-04.png)

“这下明白了吧？三妹。”我说，“接下来，我们再来熟悉一下反射当中常用的 API。”

**1）获取反射类的 Class 对象**

`Class.forName()`，参数为反射类的完全限定名。

```java
Class c1 = Class.forName("com.itwanger.s39.ReflectionDemo3");
System.out.println(c1.getCanonicalName());

Class c2 = Class.forName("[D");
System.out.println(c2.getCanonicalName());

Class c3 = Class.forName("[[Ljava.lang.String;");
System.out.println(c3.getCanonicalName());
```

来看一下输出结果：

```
com.itwanger.s39.ReflectionDemo3
double[]
java.lang.String[][]
```

类名 + `.class`，只适合在编译前就知道操作的 Class。。

```java
Class c1 = ReflectionDemo3.class;
System.out.println(c1.getCanonicalName());

Class c2 = String.class;
System.out.println(c2.getCanonicalName());

Class c3 = int[][][].class;
System.out.println(c3.getCanonicalName());
```

来看一下输出结果：

```java
com.itwanger.s39.ReflectionDemo3
java.lang.String
int[][][]
```

**2）创建反射类的对象**

通过反射来创建对象的方式有两种：

- 用 Class 对象的 `newInstance()` 方法。
- 用 Constructor 对象的 `newInstance()` 方法。

```java
Class c1 = Writer.class;
Writer writer = (Writer) c1.newInstance();

Class c2 = Class.forName("com.itwanger.s39.Writer");
Constructor constructor = c2.getConstructor();
Object object = constructor.newInstance();
```

**3）获取构造方法**

Class 对象提供了以下方法来获取构造方法 Constructor 对象：

- `getConstructor()`：返回反射类的特定 public 构造方法，可以传递参数，参数为构造方法参数对应 Class 对象；缺省的时候返回默认构造方法。
- `getDeclaredConstructor()`：返回反射类的特定构造方法，不限定于 public 的。
- `getConstructors()`：返回类的所有 public 构造方法。
- `getDeclaredConstructors()`：返回类的所有构造方法，不限定于 public 的。

```java
Class c2 = Class.forName("com.itwanger.s39.Writer");
Constructor constructor = c2.getConstructor();

Constructor[] constructors1 = String.class.getDeclaredConstructors();
for (Constructor c : constructors1) {
    System.out.println(c);
}
```

**4）获取字段**

大体上和获取构造方法类似，把关键字 Constructor 换成 Field 即可。

```java
Method setNameMethod = clazz.getMethod("setName", String.class);
Method getNameMethod = clazz.getMethod("getName");
```

**5）获取方法**

大体上和获取构造方法类似，把关键字 Constructor 换成 Method 即可。

```java
Method[] methods1 = System.class.getDeclaredMethods();
Method[] methods2 = System.class.getMethods();
```

“注意，三妹，如果你想反射访问私有字段和（构造）方法的话，需要使用 `Constructor/Field/Method.setAccessible(true)` 来绕开 Java 语言的访问限制。”我说。

“好的，二哥。还有资料可以参考吗？”三妹问。

“有的，有两篇文章写得非常不错，你在学习反射的时候可以作为参考。”我说。

第一篇：深入理解 Java 反射和动态代理

>链接：[https://dunwu.github.io/javacore/basics/java-reflection.html](https://dunwu.github.io/javacore/basics/java-reflection.html)

第二篇：大白话说Java反射：入门、使用、原理：

>链接：[https://www.cnblogs.com/chanshuyi/p/head_first_of_reflection.html](https://www.cnblogs.com/chanshuyi/p/head_first_of_reflection.html)


----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)

