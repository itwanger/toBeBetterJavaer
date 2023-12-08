---
title: Java 泛型深入解析：理解泛型原理与实际应用方法
shortTitle: Java泛型，深入解析
category:
  - Java核心
tag:
  - Java重要知识点
description: 本文详细讲解了 Java 泛型的概念、原理及应用技巧，为您展示了如何通过泛型提高代码的可重用性、类型安全和可读性。学习本文将帮助您更好地掌握 Java 泛型编程，提高编程效率与质量。
head:
  - - meta
    - name: keywords
      content: java,泛型,java 泛型,java generic
---

# 6.6 Java泛型，深入解析

“二哥，为什么要设计泛型啊？”三妹开门见山地问。

“三妹啊，听哥慢慢给你讲啊。”我说。

Java 在 1.5 时增加了泛型机制，据说专家们为此花费了 5 年左右的时间（听起来是相当不容易）。有了泛型之后，尤其是对集合类的使用，就变得更规范了。

看下面这段简单的代码。

```java
ArrayList<String> list = new ArrayList<String>();
list.add("沉默王二");
String str = list.get(0);
```

“三妹，你能想象到在没有泛型之前该怎么办吗？”

“嗯，想不到，还是二哥你说吧。”

嗯，我们可以使用 Object 数组来设计 `Arraylist` 类。

```java
class Arraylist {
    private Object[] objs;
    private int i = 0;
    public void add(Object obj) {
        objs[i++] = obj;
    }
    
    public Object get(int i) {
        return objs[i];
    }
}
```

然后，我们向 `Arraylist` 中存取数据。

```java
Arraylist list = new Arraylist();
list.add("沉默王二");
list.add(new Date());
String str = (String)list.get(0);
```

“三妹，你有没有发现这两个问题？”

- Arraylist 可以存放任何类型的数据（既可以存字符串，也可以混入日期），因为所有类都继承自 Object 类。
- 从 Arraylist 取出数据的时候需要强制类型转换，因为编译器并不能确定你取的是字符串还是日期。

“嗯嗯，是的呢。”三妹说。

对比一下，你就能明显地感受到泛型的优秀之处：使用**类型参数**解决了元素的不确定性——参数类型为 String 的集合中是不允许存放其他类型元素的，取出数据的时候也不需要强制类型转换了。

### 动手设计一个泛型

“二哥，那怎么才能设计一个泛型呢？”

“三妹啊，你一个小白只要会用泛型就行了，还想设计泛型啊？！不过，既然你想了解，哥义不容辞。”

首先，我们来按照泛型的标准重新设计一下 `Arraylist` 类。

```java
class Arraylist<E> {
    private Object[] elementData;
    private int size = 0;

    public Arraylist(int initialCapacity) {
        this.elementData = new Object[initialCapacity];
    }
    
    public boolean add(E e) {
        elementData[size++] = e;
        return true;
    }
    
    E elementData(int index) {
        return (E) elementData[index];
    }
}
```

一个泛型类就是具有一个或多个类型变量的类。Arraylist 类引入的类型变量为 E（Element，元素的首字母），使用尖括号 `<>` 括起来，放在类名的后面。

然后，我们可以用具体的类型（比如字符串）替换类型变量来实例化泛型类。

```java
Arraylist<String> list = new Arraylist<String>();
list.add("沉默王三");
String str = list.get(0);
```

Date 类型也可以的。

```java
Arraylist<Date> list = new Arraylist<Date>();
list.add(new Date());
Date date = list.get(0);
```

其次，我们还可以在一个非泛型的类（或者泛型类）中定义泛型方法。

```java
class Arraylist<E> {
    public <T> T[] toArray(T[] a) {
        return (T[]) Arrays.copyOf(elementData, size, a.getClass());
    }
}
```

不过，说实话，泛型方法的定义看起来略显晦涩。来一副图吧（注意：方法返回类型和方法参数类型至少需要一个）。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/generic/generic-01.png)

现在，我们来调用一下泛型方法。

```java
Arraylist<String> list = new Arraylist<>(4);
list.add("沉");
list.add("默");
list.add("王");
list.add("二");

String [] strs = new String [4];
strs = list.toArray(strs);

for (String str : strs) {
    System.out.println(str);
}
```

### 泛型限定符

然后，我们再来说说泛型变量的限定符 `extends`。

在解释这个限定符之前，我们假设有三个类，它们之间的定义是这样的。

```java
class Wanglaoer {
    public String toString() {
        return "王老二";
    }
}

class Wanger extends Wanglaoer{
    public String toString() {
        return "王二";
    }
}

class Wangxiaoer extends Wanger{
    public String toString() {
        return "王小二";
    }
}
```

我们使用限定符 `extends` 来重新设计一下 `Arraylist` 类。

```java
class Arraylist<E extends Wanger> {
}
```

当我们向 `Arraylist` 中添加 `Wanglaoer` 元素的时候，编译器会提示错误：`Arraylist` 只允许添加 `Wanger` 及其子类 `Wangxiaoer` 对象，不允许添加其父类 `Wanglaoer`。

```java
Arraylist<Wanger> list = new Arraylist<>(3);
list.add(new Wanger());
list.add(new Wanglaoer());
// The method add(Wanger) in the type Arraylist<Wanger> is not applicable for the arguments 
// (Wanglaoer)
list.add(new Wangxiaoer());
```

也就是说，限定符 `extends` 可以缩小泛型的类型范围。

### 类型擦除

“哦，明白了。”三妹若有所思的点点头，“二哥，听说虚拟机没有泛型？”

“三妹，你功课做得可以啊。哥可以肯定地回答你，虚拟机是没有泛型的。”

“怎么确定虚拟机有没有泛型呢？”三妹问。

“只要我们把泛型类的字节码进行反编译就看到了！”用反编译工具（我写这篇文章的时候用的是 jad，你也可以用其他的工具）将 class 文件反编译后，我说，“三妹，你看。”

```java
// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Arraylist.java

package com.cmower.java_demo.fanxing;

import java.util.Arrays;

class Arraylist
{

    public Arraylist(int initialCapacity)
    {
        size = 0;
        elementData = new Object[initialCapacity];
    }

    public boolean add(Object e)
    {
        elementData[size++] = e;
        return true;
    }

    Object elementData(int index)
    {
        return elementData[index];
    }

    private Object elementData[];
    private int size;
}
```

类型变量 `<E>` 消失了，取而代之的是 Object ！

“既然如此，那如果泛型类使用了限定符 `extends`，结果会怎么样呢？”三妹这个问题问的很巧妙。

来看这段代码。

```java
class Arraylist2<E extends Wanger> {
    private Object[] elementData;
    private int size = 0;

    public Arraylist2(int initialCapacity) {
        this.elementData = new Object[initialCapacity];
    }

    public boolean add(E e) {
        elementData[size++] = e;
        return true;
    }

    E elementData(int index) {
        return (E) elementData[index];
    }
}
```

反编译后的结果如下。

```java
// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Arraylist2.java

package com.cmower.java_demo.fanxing;


// Referenced classes of package com.cmower.java_demo.fanxing:
//            Wanger

class Arraylist2
{

    public Arraylist2(int initialCapacity)
    {
        size = 0;
        elementData = new Object[initialCapacity];
    }

    public boolean add(Wanger e)
    {
        elementData[size++] = e;
        return true;
    }

    Wanger elementData(int index)
    {
        return (Wanger)elementData[index];
    }

    private Object elementData[];
    private int size;
}
```

“你看，类型变量 `<E extends Wanger>` 不见了，E 被替换成了 `Wanger`”，我说，“通过以上两个例子说明，Java 虚拟机会将泛型的类型变量擦除，并替换为限定类型（没有限定的话，就用 `Object`）”

“二哥，类型擦除会有什么问题吗？”三妹又问了一个很有水平的问题。

“三妹啊，你还别说，类型擦除真的会有一些问题。”我说，“来看一下这段代码。”

```java
public class Cmower {
    
    public static void method(Arraylist<String> list) {
        System.out.println("Arraylist<String> list");
    }

    public static void method(Arraylist<Date> list) {
        System.out.println("Arraylist<Date> list");
    }

}
```

在浅层的意识上，我们会想当然地认为 `Arraylist<String> list` 和 `Arraylist<Date> list` 是两种不同的类型，因为 String 和 Date 是不同的类。

但由于类型擦除的原因，以上代码是不会通过编译的——编译器会提示一个错误（这正是类型擦除引发的那些“问题”）：

```
>Erasure of method method(Arraylist<String>) is the same as another method in type 
 Cmower
>
>Erasure of method method(Arraylist<Date>) is the same as another method in type 
 Cmower
```


大致的意思就是，这两个方法的参数类型在擦除后是相同的。

也就是说，`method(Arraylist<String> list)` 和 `method(Arraylist<Date> list)` 是同一种参数类型的方法，不能同时存在。类型变量 `String` 和 `Date` 在擦除后会自动消失，method 方法的实际参数是 `Arraylist list`。

有句俗话叫做：“百闻不如一见”，但即使见到了也未必为真——泛型的擦除问题就可以很好地佐证这个观点。

### 泛型通配符

“哦，明白了。二哥，听说泛型还有通配符？”

“三妹啊，哥突然觉得你很适合作一枚可爱的程序媛啊！你这预习的功课做得可真到家啊，连通配符都知道！”

通配符使用英文的问号`（?）`来表示。在我们创建一个泛型对象时，可以使用关键字 `extends` 限定子类，也可以使用关键字 `super` 限定父类。

我们来看下面这段代码。

```java
// 定义一个泛型类 Arraylist<E>，E 表示元素类型
class Arraylist<E> {
    // 私有成员变量，存储元素数组和元素数量
    private Object[] elementData;
    private int size = 0;

    // 构造函数，传入初始容量 initialCapacity，创建一个指定容量的 Object 数组
    public Arraylist(int initialCapacity) {
        this.elementData = new Object[initialCapacity];
    }

    // 添加元素到数组末尾，返回添加成功与否
    public boolean add(E e) {
        elementData[size++] = e;
        return true;
    }

    // 获取指定下标的元素
    public E get(int index) {
        return (E) elementData[index];
    }

    // 查找指定元素第一次出现的下标，如果找不到则返回 -1
    public int indexOf(Object o) {
        if (o == null) {
            for (int i = 0; i < size; i++)
                if (elementData[i]==null)
                    return i;
        } else {
            for (int i = 0; i < size; i++)
                if (o.equals(elementData[i]))
                    return i;
        }
        return -1;
    }

    // 判断指定元素是否在数组中出现
    public boolean contains(Object o) {
        return indexOf(o) >= 0;
    }

    // 将数组中的元素转化成字符串输出
    public String toString() {
        StringBuilder sb = new StringBuilder();
        
        for (Object o : elementData) {
            if (o != null) {
                E e = (E)o;
                sb.append(e.toString());
                sb.append(',').append(' ');
            }
        }
        return sb.toString();
    }

    // 返回数组中元素的数量
    public int size() {
        return size;
    }

    // 修改指定下标的元素，返回修改前的元素
    public E set(int index, E element) {
        E oldValue = (E) elementData[index];
        elementData[index] = element;
        return oldValue;
    }
}
```

1）新增 `indexOf(Object o)` 方法，判断元素在 `Arraylist` 中的位置。注意参数为 `Object` 而不是泛型 `E`。

2）新增 `contains(Object o)` 方法，判断元素是否在 `Arraylist` 中。注意参数为 `Object` 而不是泛型 `E`。

3）新增 `toString()` 方法，方便对 `Arraylist` 进行打印。

4）新增 `set(int index, E element)` 方法，方便对 `Arraylist` 元素的更改。

因为泛型擦除的原因，`Arraylist<Wanger> list = new Arraylist<Wangxiaoer>();` 这样的语句是无法通过编译的，尽管 Wangxiaoer 是 Wanger 的子类。但如果我们确实需要这种 “向上转型” 的关系，该怎么办呢？这时候就需要通配符来发挥作用了。

利用 `<? extends Wanger>` 形式的通配符，可以实现泛型的向上转型，来看例子。

```java
Arraylist<? extends Wanger> list2 = new Arraylist<>(4);
list2.add(null);
// list2.add(new Wanger());
// list2.add(new Wangxiaoer());

Wanger w2 = list2.get(0);
// Wangxiaoer w3 = list2.get(1);
```

list2 的类型是 `Arraylist<? extends Wanger>`，翻译一下就是，list2 是一个 `Arraylist`，其类型是 `Wanger` 及其子类。

注意，“关键”来了！list2 并不允许通过 `add(E e)` 方法向其添加 `Wanger` 或者 `Wangxiaoer` 的对象，唯一例外的是 `null`。

“那就奇了怪了，既然不让存放元素，那要 `Arraylist<? extends Wanger>` 这样的 list2 有什么用呢？”三妹好奇地问。

虽然不能通过 `add(E e)` 方法往 list2 中添加元素，但可以给它赋值。

```java
Arraylist<Wanger> list = new Arraylist<>(4);

Wanger wanger = new Wanger();
list.add(wanger);

Wangxiaoer wangxiaoer = new Wangxiaoer();
list.add(wangxiaoer);

Arraylist<? extends Wanger> list2 = list;

Wanger w2 = list2.get(1);
System.out.println(w2);

System.out.println(list2.indexOf(wanger));
System.out.println(list2.contains(new Wangxiaoer()));
```

`Arraylist<? extends Wanger> list2 = list;` 语句把 list 的值赋予了 list2，此时 `list2 == list`。由于 list2 不允许往其添加其他元素，所以此时它是安全的——我们可以从容地对 list2 进行 `get()`、`indexOf()` 和 `contains()`。想一想，如果可以向 list2 添加元素的话，这 3 个方法反而变得不太安全，它们的值可能就会变。

利用 `<? super Wanger>` 形式的通配符，可以向 Arraylist 中存入父类是 `Wanger` 的元素，来看例子。

```java
Arraylist<? super Wanger> list3 = new Arraylist<>(4);
list3.add(new Wanger());
list3.add(new Wangxiaoer());

// Wanger w3 = list3.get(0);
```

需要注意的是，无法从 `Arraylist<? super Wanger>` 这样类型的 list3 中取出数据。

### 小结

好了，三妹，关于泛型，我们再来做一个简单的总结。

在 Java 中，泛型是一种强类型约束机制，可以在编译期间检查类型安全性，并且可以提高代码的复用性和可读性。

#### 1）类型参数化

泛型的本质是参数化类型，也就是说，在定义类、接口或方法时，可以使用一个或多个类型参数来表示参数化类型。

例如这样可以定义一个泛型类。

```java
public class Box<T> {
    private T value;

    public Box(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }
}
```

在这个例子中，`<T>` 表示类型参数，可以在类中任何需要使用类型的地方使用 T 代替具体的类型。通过使用泛型，我们可以创建一个可以存储任何类型对象的盒子。

```java
Box<Integer> intBox = new Box<>(123);
Box<String> strBox = new Box<>("Hello, world!");
```

泛型在实际开发中的应用非常广泛，例如集合框架中的 List、Set、Map 等容器类，以及并发框架中的 Future、Callable 等工具类都使用了泛型。

#### 2）类型擦除

在 Java 的泛型机制中，有两个重要的概念：类型擦除和通配符。

泛型在编译时会将泛型类型擦除，将泛型类型替换成 Object 类型。这是为了向后兼容，避免对原有的 Java 代码造成影响。

例如，对于下面的代码：

```java
List<Integer> intList = new ArrayList<>();
intList.add(123);
int value = intList.get(0);
```

在编译时，Java 编译器会将泛型类型 `List<Integer>` 替换成 `List<Object>`，将 get 方法的返回值类型 Integer 替换成 Object，生成的字节码与下面的代码等价：

```java
List intList = new ArrayList();
intList.add(Integer.valueOf(123));
int value = (Integer) intList.get(0);
```

Java 泛型只在编译时起作用，运行时并不会保留泛型类型信息。

#### 3）通配符

通配符用于表示某种未知的类型，例如 `List<?>` 表示一个可以存储任何类型对象的 List，但是不能对其中的元素进行添加操作。通配符可以用来解决类型不确定的情况，例如在方法参数或返回值中使用。

使用通配符可以使方法更加通用，同时保证类型安全。

例如，定义一个泛型方法：

```java
public static void printList(List<?> list) {
    for (Object obj : list) {
        System.out.print(obj + " ");
    }
    System.out.println();
}
```

这个方法可以接受任意类型的 List，例如 `List<Integer>`、`List<String>` 等等。

##### 上限通配符

泛型还提供了上限通配符 `<? extends T>`，表示通配符只能接受 T 或 T 的子类。使用上限通配符可以提高程序的类型安全性。

例如，定义一个方法，只接受 Number 及其子类的 List：

```java
public static void printNumberList(List<? extends Number> list) {
    for (Number num : list) {
        System.out.print(num + " ");
    }
    System.out.println();
}
```

这个方法可以接受 `List<Integer>`、`List<Double>` 等等。

##### 下限通配符

下限通配符（Lower Bounded Wildcards）用 super 关键字来声明，其语法形式为 `<? super T>`，其中 T 表示类型参数。它表示的是该类型参数必须是某个指定类的超类（包括该类本身）。

当我们需要往一个泛型集合中添加元素时，如果使用的是上限通配符，集合中的元素类型可能会被限制，从而无法添加某些类型的元素。但是，如果我们使用下限通配符，可以将指定类型的子类型添加到集合中，保证了元素的完整性。

举个例子，假设有一个类 Animal，以及两个子类 Dog 和 Cat。现在我们有一个 `List<? super Dog>` 集合，它的类型参数必须是 Dog 或其父类类型。我们可以向该集合中添加 Dog 类型的元素，也可以添加它的子类。但是，不能向其中添加 Cat 类型的元素，因为 Cat 不是 Dog 的子类。

下面是一个使用下限通配符的示例：

```java
List<? super Dog> animals = new ArrayList<>();

// 可以添加 Dog 类型的元素和其子类型元素
animals.add(new Dog());
animals.add(new Bulldog());

// 不能添加 Cat 类型的元素
animals.add(new Cat()); // 编译报错
```

需要注意的是，虽然使用下限通配符可以添加某些子类型元素，但是在读取元素时，我们只能确保其是 Object 类型的，无法确保其是指定类型或其父类型。因此，在读取元素时需要进行类型转换，如下所示：

```java
List<? super Dog> animals = new ArrayList<>();
animals.add(new Dog());

// 读取元素时需要进行类型转换
Object animal = animals.get(0);
Dog dog = (Dog) animal;
```

总的来说，Java 的泛型机制是一种非常强大的类型约束机制，可以在编译时检查类型安全性，并提高代码的复用性和可读性。但是，在使用泛型时也需要注意类型擦除和通配符等问题，以确保代码的正确性。

----

GitHub 上标星 10000+ 的开源知识库《[二哥的 Java 进阶之路](https://github.com/itwanger/toBeBetterJavaer)》第一版 PDF 终于来了！包括Java基础语法、数组&字符串、OOP、集合框架、Java IO、异常处理、Java 新特性、网络编程、NIO、并发编程、JVM等等，共计 32 万余字，500+张手绘图，可以说是通俗易懂、风趣幽默……详情戳：[太赞了，GitHub 上标星 10000+ 的 Java 教程](https://javabetter.cn/overview/)


微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
