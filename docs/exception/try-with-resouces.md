---
title: 深入理解 Java 中的 try-with-resouces 语法糖
shortTitle: try-with-resouces
category:
  - Java核心
tag:
  - 异常处理
description: Java程序员进阶之路，小白的零基础Java教程，从入门到进阶，深入理解 Java 中的 try-with-resouces 语法糖
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,java,try-with-resouces
---

“二哥，终于等到你讲 try-with-resouces 了！”三妹夸张的表情让我有些吃惊。

“三妹，不要激动呀！开讲之前，我们还是要来回顾一下 try–catch-finally，好做个铺垫。”我说，“来看看这段代码吧。”

```java
public class TrycatchfinallyDecoder {
    public static void main(String[] args) {
        BufferedReader br = null;
        try {
            String path = TrycatchfinallyDecoder.class.getResource("/牛逼.txt").getFile();
            String decodePath = URLDecoder.decode(path,"utf-8");
            br = new BufferedReader(new FileReader(decodePath));

            String str = null;
            while ((str =br.readLine()) != null) {
                System.out.println(str);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
```

“我简单来解释下。”等三妹看完这段代码后，我继续说，“在 try 块中读取文件中的内容，并一行一行地打印到控制台。如果文件找不到或者出现 IO 读写错误，就在 catch 中捕获并打印错误的堆栈信息。最后，在 finally 中关闭缓冲字符读取器对象 BufferedReader，有效杜绝了资源未被关闭的情况下造成的严重性能后果。”

“在 Java 7 之前，try–catch-finally 的确是确保资源会被及时关闭的最佳方法，无论程序是否会抛出异常。”

三妹点了点头，表示同意。

“不过，这段代码还是有些臃肿，尤其是 finally 中的代码。”我说，“况且，try–catch-finally 至始至终存在一个严重的隐患：try 中的 `br.readLine()` 有可能会抛出 `IOException`，finally 中的 `br.close()` 也有可能会抛出 `IOException`。假如两处都不幸地抛出了 IOException，那程序的调试任务就变得复杂了起来，到底是哪一处出了错误，就需要花一番功夫，这是我们不愿意看到的结果。”

“我来给你演示下，三妹。”

“首先，我们来定义这样一个类 MyfinallyReadLineThrow，它有两个方法，分别是 `readLine()` 和 `close()`，方法体都是主动抛出异常。”

```java
class MyfinallyReadLineThrow {
    public void close() throws Exception {
        throw new Exception("close");
    }

    public void readLine() throws Exception {
        throw new Exception("readLine");
    }
}
```

“然后在 `main()` 方法中使用 try-catch-finally 的方式调用 MyfinallyReadLineThrow 的 `readLine()` 和 `close()` 方法。”

```java
public class TryfinallyCustomReadLineThrow {
    public static void main(String[] args) throws Exception {
        MyfinallyReadLineThrow myThrow = null;
        try {
            myThrow = new MyfinallyReadLineThrow();
            myThrow.readLine();
        } finally {
            myThrow.close();
        }
    }
}
```

运行上述代码后，错误堆栈如下所示：

```
Exception in thread "main" java.lang.Exception: close
	at com.cmower.dzone.trycatchfinally.MyfinallyOutThrow.close(TryfinallyCustomOutThrow.java:17)
	at com.cmower.dzone.trycatchfinally.TryfinallyCustomOutThrow.main(TryfinallyCustomOutThrow.java:10)
```

“看出来问题了吗，三妹？”

“啊？`readLine()` 方法的异常信息竟然被 `close()` 方法的堆栈信息吃了！”

“不错啊，三妹，火眼金睛，的确，这会让我们误以为要调查的目标是 `close()` 方法而不是 `readLine()` 方法——尽管它也是应该怀疑的对象。”

“但有了 try-with-resources 后，这些问题就迎刃而解了。前提条件只有一个，就是需要释放的资源（比如 BufferedReader）实现了 AutoCloseable 接口。”

```java
try (BufferedReader br = new BufferedReader(new FileReader(decodePath));) {
    String str = null;
    while ((str =br.readLine()) != null) {
        System.out.println(str);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

“你瞧，三妹，finally 块消失了，取而代之的是把要释放的资源写在 try 后的 `()` 中。如果有多个资源（BufferedReader 和 PrintWriter）需要释放的话，可以直接在 `()` 中添加。”

```java
try (BufferedReader br = new BufferedReader(new FileReader(decodePath));
     PrintWriter writer = new PrintWriter(new File(writePath))) {
    String str = null;
    while ((str =br.readLine()) != null) {
        writer.print(str);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

“如果想释放自定义资源的话，只要让它实现 AutoCloseable 接口，并提供 `close()` 方法即可。”

```java
public class TrywithresourcesCustom {
    public static void main(String[] args) {
        try (MyResource resource = new MyResource();) {
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class MyResource implements AutoCloseable {
    @Override
    public void close() throws Exception {
        System.out.println("关闭自定义资源");
    }
}
```

来看一下代码运行后的输出结果：

```
关闭自定义资源
```

“好神奇呀！”三妹欣喜若狂，“在 `try ()` 中只是 new 了一个 MyResource 的对象，其他什么也没干，`close()` 方法就执行了！”

“想知道为什么吗？三妹。”

“当然想啊。”

“来看看反编译后的字节码吧。”

```java
class MyResource implements AutoCloseable {
    MyResource() {
    }

    public void close() throws Exception {
        System.out.println("关闭自定义资源");
    }
}

public class TrywithresourcesCustom {
    public TrywithresourcesCustom() {
    }

    public static void main(String[] args) {
        try {
            MyResource resource = new MyResource();
            resource.close();
        } catch (Exception var2) {
            var2.printStackTrace();
        }

    }
}
```

“啊，原来如此。编译器主动为 try-with-resources 进行了变身，在 try 中调用了 `close()` 方法。”

“是这样的。接下来，我们在 `MyResourceOut` 类中再添加一个 `out()` 方法。”

```java
class MyResourceOut implements AutoCloseable {
    @Override
    public void close() throws Exception {
        System.out.println("关闭自定义资源");
    }

    public void out() throws Exception{
        System.out.println("沉默王二，一枚有趣的程序员");
    }
}
```

“这次，我们在 try 中调用一下 `out()` 方法。”

```java
public class TrywithresourcesCustomOut {
    public static void main(String[] args) {
        try (MyResourceOut resource = new MyResourceOut();) {
            resource.out();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

“再来看一下反编译的字节码。”

```
public class TrywithresourcesCustomOut {
    public TrywithresourcesCustomOut() {
    }

    public static void main(String[] args) {
        try {
            MyResourceOut resource = new MyResourceOut();

            try {
                resource.out();
            } catch (Throwable var5) {
                try {
                    resource.close();
                } catch (Throwable var4) {
                    var5.addSuppressed(var4);
                }

                throw var5;
            }

            resource.close();
        } catch (Exception var6) {
            var6.printStackTrace();
        }

    }
}
```

“这次，`catch` 块主动调用了 `resource.close()`，并且有一段很关键的代码 ` var5.addSuppressed(var4)`。”

“这是为了什么呢？”三妹问。

“当一个异常被抛出的时候，可能有其他异常因为该异常而被抑制住，从而无法正常抛出。这时可以通过 `addSuppressed()` 方法把这些被抑制的方法记录下来，然后被抑制的异常就会出现在抛出的异常的堆栈信息中，可以通过 `getSuppressed()` 方法来获取这些异常。这样做的好处是不会丢失任何异常，方便我们进行调试。”我说。

“有没有想到之前的那个例子——在 try-catch-finally 中，`readLine()` 方法的异常信息竟然被 `close()` 方法的堆栈信息吃了。现在有了 try-with-resources，再来看看和 `readLine()` 方法一致的 `out()` 方法会不会被 `close()` 吃掉吧。”

```java
class MyResourceOutThrow implements AutoCloseable {
    @Override
    public void close() throws Exception {
        throw  new Exception("close()");
    }

    public void out() throws Exception{
        throw new Exception("out()");
    }
}
```

“调用这 2 个方法。”

```java
public class TrywithresourcesCustomOutThrow {
    public static void main(String[] args) {
        try (MyResourceOutThrow resource = new MyResourceOutThrow();) {
            resource.out();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

“程序输出的结果如下所示。”

```
java.lang.Exception: out()
	at com.cmower.dzone.trycatchfinally.MyResourceOutThrow.out(TrywithresourcesCustomOutThrow.java:20)
	at com.cmower.dzone.trycatchfinally.TrywithresourcesCustomOutThrow.main(TrywithresourcesCustomOutThrow.java:6)
	Suppressed: java.lang.Exception: close()
		at com.cmower.dzone.trycatchfinally.MyResourceOutThrow.close(TrywithresourcesCustomOutThrow.java:16)
		at com.cmower.dzone.trycatchfinally.TrywithresourcesCustomOutThrow.main(TrywithresourcesCustomOutThrow.java:5)
```

“瞧，这次不会了，`out()` 的异常堆栈信息打印出来了，并且 `close()` 方法的堆栈信息上加了一个关键字 `Suppressed`，一目了然。”

“三妹，怎么样？是不是感觉 try-with-resouces 好用多了！我来简单总结下哈，在处理必须关闭的资源时，始终有限考虑使用 try-with-resources，而不是 try–catch-finally。前者产生的代码更加简洁、清晰，产生的异常信息也更靠谱。”

“靠谱！”三妹说。


----

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)


