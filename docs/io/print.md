---
title: Java打印流：PrintStream & PrintWriter
shortTitle: Java打印流PrintStream
category:
  - Java核心
tag:
  - Java IO
description: Java程序员进阶之路，小白的零基础Java教程，Java打印流：PrintStream & PrintWriter
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,Java IO,打印流,PrintStream,PrintWriter
---

## 何谓打印流

平时我们在控制台打印输出，是调用`print`方法和`println`方法完成的，各位用了这么久的输出语句肯定没想过这两个方法都来自于`java.io.PrintStream`类吧，哈哈。该类能够方便地打印各种数据类型的值，是一种便捷的输出方式。

**打印流分类**：

> 字节打印流PrintStream，字符打印流PrintWriter

**打印流特点**：

> A:只操作目的地,不操作数据源
> 
> B:可以操作任意类型的数据
> 
> C:如果启用了自动刷新，在调用println()方法的时候，能够换行并刷新
> 
> D:可以直接操作文件

这个时候有同学就要问了，哪些流可以直接操作文件呢?答案很简单，**如果该流的构造方法能够同时接收File和String类型的参数，一般都是可以直接操作文件的**！

PrintStream是OutputStream的子类，PrintWriter是Writer的子类，两者处于对等的位置上，所以它们的API是非常相似的。二者区别无非一个是字节打印流，一个是字符打印流。

## 字节输出打印流PrintStream复制文本文件

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintStream;

public class PrintStreamDemo {
    public static void main(String[] args) throws IOException {
        BufferedReader br=new BufferedReader(new FileReader("copy.txt"));
        PrintStream ps=new PrintStream("printcopy.txt");
        String line;
        while((line=br.readLine())!=null) {
            ps.println(line);
        }
        br.close();
        ps.close();
    }
}
```
 

## 字符输出打印流PrintWriter复制文本文件

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
/**
 * 使用打印流复制文本文件
 */
public class PrintWriterDemo {
    public static void main(String[] args) throws IOException {
        BufferedReader br=new BufferedReader(new FileReader("aa.txt"));
        PrintWriter pw=new PrintWriter("printcopyaa.txt");
        String line;
        while((line=br.readLine())!=null) {
            pw.println(line);
        }
        br.close();
        pw.close();
    }
}
```

>参考链接：[https://www.cnblogs.com/yichunguo/p/11775270.html](https://www.cnblogs.com/yichunguo/p/11775270.html)，整理：沉默王二


---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)