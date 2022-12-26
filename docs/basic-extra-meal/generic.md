---
title: 深入理解Java中的泛型
shortTitle: 深入理解Java中的泛型
category:
  - Java核心
tag:
  - Java重要知识点
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，深入理解Java中的泛型
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,泛型
---

“二哥，为什么要设计泛型啊？”三妹开门见山地问。

“三妹啊，听哥慢慢给你讲啊。”我说。

Java 在 1.5 时增加了泛型机制，据说专家们为此花费了 5 年左右的时间（听起来很不容易）。有了泛型之后，尤其是对集合类的使用，就变得更规范了。

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

“二哥，那怎么才能设计一个泛型呢？”

“三妹啊，你一个小白只要会用泛型就行了，还想设计泛型啊？！不过，既然你想了解，那么哥义不容辞。”



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

“哦，明白了。”三妹若有所思的点点头，“二哥，听说虚拟机没有泛型？”

“三妹，你功课做得可以啊。哥可以肯定地回答你，虚拟机是没有泛型的。”

“怎么确定虚拟机有没有泛型呢？”三妹问。

“只要我们把泛型类的字节码进行反编译就看到了！”用反编译工具将 class 文件反编译后，我说，“三妹，你看。”

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

“哦，明白了。二哥，听说泛型还有通配符？”

“三妹啊，哥突然觉得你很适合作一枚可爱的程序媛啊！你这预习的功课做得可真到家啊，连通配符都知道！”

通配符使用英文的问号（?）来表示。在我们创建一个泛型对象时，可以使用关键字 `extends` 限定子类，也可以使用关键字 `super` 限定父类。

我们来看下面这段代码。

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

    public E get(int index) {
        return (E) elementData[index];
    }
    
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
    
    public boolean contains(Object o) {
        return indexOf(o) >= 0;
    }
    
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

    public int size() {
        return size;
    }
    
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

“三妹，关于泛型，这里还有一篇很不错的文章，你等会去看一下。”我说。

>[https://www.pdai.tech/md/java/basic/java-basic-x-generic.html](https://www.pdai.tech/md/java/basic/java-basic-x-generic.html)

“对泛型机制讲的也很透彻，你结合二哥给你讲的这些，再深入的学习一下。”

“好的，二哥。”

----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
