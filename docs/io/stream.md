---
title: 文件的世界，一切皆字节流（Stream）
shortTitle: 文件的世界，一切皆字节流
category:
  - Java核心
tag:
  - Java IO
description: Java程序员进阶之路，小白的零基础Java教程，文件的世界，一切皆字节流 OutputStream、InputStream
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,IO,OutputStream,InputStream,字节流
---

我们必须得明确一点，一切文件数据(文本、图片、视频等)都是以二进制的形式存储的，传输时也如此。所以，字节流可以传输任意文件数据。在操作流的时候，我们要时刻明确，无论使用什么样的流对象，底层传输的始终是二进制数据。

## 字节输出流（OutputStream）

`java.io.OutputStream` 抽象类是**字节输出流**类的**超类**（父类），它将指定的字节信息写入到目的地，定义了字节输出流的一些共性方法：

> 1、 `public void close()` ：关闭此输出流并释放与此流相关联的系统资源。
> 
> 2、 `public void flush()` ：刷新此输出流并强制缓冲区的字节被写入到目的地。
> 
> 3、 `public void write(byte[] b)`：将 b.length个字节从指定的字节数组写入此输出流。
> 
> 4、 `public void write(byte[] b, int off, int len)` ：从指定的字节数组写入 len字节到此输出流，从偏移量 off开始。 **也就是说从off个字节数开始一直到len个字节结束**

> **以上4个方法是字节输出流都具有的方法，由父类OutputStream提供定义，子类共享以上方法**

### FileOutputStream类

`OutputStream`有很多子类，我们从最简单的一个子类FileOutputStream开始。看名字就知道是文件输出流，用于将数据写入到文件。

#### FileOutputStream构造方法

不管学啥子，只要是对象，就从构造方法开始！

> 1、 `public FileOutputStream(File file)`：根据文件创建文件输出流对象。
> 
> 2、 `public FileOutputStream(String name)`： 根据文件名创建文件输出流对象。

**推荐第二种构造方法**【开发常用】：

```java
FileOutputStream foutputStream = new FileOutputStream("abc.txt");
```
 

就以上面这行代码来讲，类似这样创建字节输出流对象一共做了**三件事情**：

1、调用系统功能去创建文件【只有输出流对象才会自动创建】

2、创建outputStream对象

3、把foutputStream对象指向这个文件

> 注意：
> 
> 创建输出流对象的时候，系统会自动去对应位置创建文件，即使文件不存在也不会报FileNotFoundException异常。

当你创建一个流对象时，必须直接或者间接传入一个文件路径。比如现在我们创建一个`FileOutputStream`流对象，在该路径下，如果没有这个文件，会创建该文件。如果有这个文件，会清空这个文件的数据。有兴趣的童鞋可以测试一下，具体代码如下：

```java
public class FileOutputStreamConstructor throws IOException {
    public static void main(String[] args) {
      // 使用File对象创建流对象
        File file = new File("G:\\自动创建的文件夹\\a.txt");
        FileOutputStream fos = new FileOutputStream(file);
      
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("G:\\b.txt");
    }
}
```
 

#### FileOutputStream写入字节数据

使用FileOutputStream写入字节数据主要通过`Write`方法，而`write`方法分如下三种

```javascript
public void write(int b)
public void write(byte[] b)
public void write(byte[] b,int off,int len)  //从`off`索引开始，`len`个字节
```
 

1.  **写入字节**：`write(int b)` 方法，每次可以写入一个字节数据，代码如下：

```java
public class IoWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt");     
        // 写出数据
        fos.write(97); // 第1个字节
        fos.write(98); // 第2个字节
        fos.write(99); // 第3个字节
        // 关闭资源
        fos.close();
    }
}
输出结果：
abc
```

字符 a 的 [ASCII 值](https://tobebetterjavaer.com/basic-extra-meal/java-unicode.html)为 97，字符 b 的ASCII 值为 98，字符 b 的ASCII 值为 99。也就是说，以上代码可以写成：

```java
public class IoWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt");     
        // 写出数据
        fos.write('a'); // 第1个字节
        fos.write('b'); // 第2个字节
        fos.write('c'); // 第3个字节
        // 关闭资源
        fos.close();
    }
}
```


> 1.  虽然参数为int类型，占四个字节，但是这里只会保留一个字节的信息写入（通常来说，一个英文字符是一个字节，一个中文字符是两个字节）。
> 2.  流操作完毕后，必须释放系统资源，调用close方法，千万记得。

2.  **写入字节数组**：`write(byte[] b)`，代码使用演示：

```java
public class FOSWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt");     
        // 字符串转换为字节数组
        byte[] b = "麻麻我想吃烤山药".getBytes();
        // 写入字节数组数据
        fos.write(b);
        // 关闭资源
        fos.close();
    }
}
输出结果：
麻麻我想吃烤山药
```
 

3.  **写入指定长度字节数组**：`write(byte[] b, int off, int len)` ,从`off`索引开始，写入`len`个字节，代码如下：

```java
public class FOSWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt");     
        // 字符串转换为字节数组
        byte[] b = "abcde".getBytes();
        // 从索引2开始，2个字节。索引2是c，两个字节，也就是cd。
        fos.write(b,2,2);
        // 关闭资源
        fos.close();
    }
}
输出结果：
cd
```
 

#### FileOutputStream实现数据追加、换行

经过以上的代码测试，每次程序运行，都会创建新的输出流对象，于是目标文件中的数据也会被清空。如何保留目标文件中数据，还能继续**追加新数据**呢？以及实现**换行**呢？

其实很简单。

我们先来学习`FileOutputStream`的另外两个构造方法，如下：

1、`public FileOutputStream(File file, boolean append)`

2、`public FileOutputStream(String name, boolean append)`

这两个构造方法，第二个参数中都需要传入一个boolean类型的值，`true` 表示追加数据，`false` 表示不追加也就是清空原有数据。这样创建的输出流对象，就可以指定是否要追加内容了。

实现数据追加代码如下：

```java
public class FOSWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt",true);     
        // 字符串转换为字节数组
        byte[] b = "abcde".getBytes();
    // 写出从索引2开始，2个字节。索引2是c，两个字节，也就是cd。
        fos.write(b);
        // 关闭资源
        fos.close();
    }
}
文件操作前：cd
文件操作后：cdabcde
```
 

Windows系统里，换行符号是`\r\n` ,具体代码如下：

```java
public class FOSWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt");  
        // 定义字节数组
        byte[] words = {97,98,99,100,101};
        // 遍历数组
        for (int i = 0; i < words.length; i++) {
            // 写出一个字节
            fos.write(words[i]);
            // 写出一个换行, 换行符号转成数组写出
            fos.write("\r\n".getBytes());
        }
        // 关闭资源
        fos.close();
    }
}

输出结果：
a
b
c
d
e
```
 
回车符（CR）和换行符（LF）是文本文件用于标记换行的控制字符（control characters）或字节码（bytecode）。

- CR = Carriage Return，回车符号（\r，十六进制 ascii 码为0x0D，十进制 ascii 码为 13），用于将鼠标移动到行首，并不前进至下一行。
- LF = Line Feed，换行符号（ \n, 十六进制 ascii 码为 0x0A，十进制 ascii 码为 10）。

紧邻的 CR 和 LF（组成 CRLF，\r\n，或十六进制 0x0D0A）将鼠标移动到下一行行首。（Windows 操作系统默认的文本换行符为 CRLF；Linux 以及 macOS 系统默认使用 LF，早期的 mac os 系统使用 CR 换行。）

## 字节输入流（InputStream）

`java.io.InputStream` 抽象类是**字节输入流**类的**超类**（父类），可以读取字节信息到内存中。它定义了字节输入流的一些共性方法：

> 1、`public void close()` ：关闭此输入流并释放与此流相关的系统资源。
> 
> 2、`public abstract int read()`： 从输入流读取数据的下一个字节。
> 
> 3、`public int read(byte[] b)`： 该方法返回的int值代表的是读取了多少个字节，读到几个返回几个，读取不到返回-1

#### FileInputStream类

`java.io.FileInputStream` 类是文件输入流，从文件中读取字节。

#### FileInputStream的构造方法

> 1、 `FileInputStream(File file)`： 通过打开与实际文件的连接来创建一个 FileInputStream，该文件由文件系统中的 File 对象 file 命名。
> 
> 2、 `FileInputStream(String name)`： 通过打开与实际文件的连接来创建一个 FileInputStream，该文件由文件系统中的路径名name命名。

同样的，推荐使用第二种构造方法：

 
```java
FileInputStream inputStream = new FileInputStream("a.txt");
```
 

当你创建一个流对象时，必须传入一个文件路径。该路径下，如果没有该文件,会抛出`FileNotFoundException` 。

举例，代码如下：

```java
public class FileInputStreamConstructor throws IOException{
    public static void main(String[] args) {
      // 使用File对象创建流对象
        File file = new File("a.txt");
        FileInputStream fos = new FileInputStream(file);
      
        // 使用文件名称创建流对象
        FileInputStream fos = new FileInputStream("b.txt");
    }
}
```
 

#### FileInputStream读取字节数据

1.  **读取字节**：`read`方法，每次可以读取一个字节的数据，会转为int类型返回，如果读取到文件末尾，则返回`-1`，代码测试如下【read.txt文件中内容为abcde】：

```java
public class FISRead {
    public static void main(String[] args) throws IOException{
        // 使用文件名称创建流对象
        FileInputStream fis = new FileInputStream("read.txt");//read.txt文件中内容为abcde
        // 读取数据，返回一个字节
        int read = fis.read();
        System.out.println((char) read);
        read = fis.read();
        System.out.println((char) read);
        read = fis.read();
        System.out.println((char) read);
        read = fis.read();
        System.out.println((char) read);
        read = fis.read();
        System.out.println((char) read);
        // 读取到末尾,返回-1
        read = fis.read();
        System.out.println( read);
    // 关闭资源
        fis.close();
    }
}
输出结果：
a
b
c
d
e
-1
```
 

循环改进读取方式，代码使用演示：

```java
public class FISRead {
    public static void main(String[] args) throws IOException{
        // 使用文件名称创建流对象
        FileInputStream fis = new FileInputStream("read.txt");
        // 定义变量，保存数据
        int b；
        // 循环读取
        while ((b = fis.read())!=-1) {
            System.out.println((char)b);
        }
        // 关闭资源
        fis.close();
    }
}
输出结果：
a
b
c
d
e
```
 

2.  **使用字节数组读取**：`read(byte[] b)`，每次读取数组b的长度个字节到数组中，返回读取到的有效字节个数，读取到末尾时，返回`-1` ，代码使用演示：

```java
public class FISRead {
    public static void main(String[] args) throws IOException{
        // 使用文件名称创建流对象.
        FileInputStream fis = new FileInputStream("read.txt"); // read.txt文件中内容为abcde
        // 定义变量，作为有效个数
        int len；
        // 定义字节数组，作为装字节数据的容器   
        byte[] b = new byte[2];
        // 循环读取
        while ((len = fis.read(b))!=-1) {
            // 每次读取后,把数组变成字符串打印
            System.out.println(new String(b));
        }
    // 关闭资源
        fis.close();
    }
}

输出结果：
ab
cd
ed
```
 
嗯？

`read.txt`文件中的内容为`abcde`，结果输出了 `abcded`？

这是由于最后一次读取时，只读取一个字节`e`，而数组中上次读取的数据没有被完全**替换**【注意是替换，看下图】

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/stream-746bf44a-744e-4c47-bc07-af5d845f1852.png)



所以要通过`len`，获取有效的字节。代码如下：

```java
public class FISRead {
    public static void main(String[] args) throws IOException{
        // 使用文件名称创建流对象.
        FileInputStream fis = new FileInputStream("read.txt"); // 文件中为abcde
        // 定义变量，作为有效个数
        int len；
        // 定义字节数组，作为装字节数据的容器   
        byte[] b = new byte[2];
        // 循环读取
        while ((len= fis.read(b))!=-1) {
            // 每次读取后,把数组的有效字节部分，变成字符串打印
            System.out.println(new String(b，0，len));//  len 每次读取的有效字节个数
        }
    // 关闭资源
        fis.close();
    }
}

输出结果：
ab
cd
e
```
 

在开发中一般强烈推荐使用数组读取文件，代码如下：

```java
package io;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class input2 {
    public static void main(String args[]){
        FileInputStream inputStream = null;
        try {
            inputStream = new FileInputStream("a.txt");
            int len = 0 ;
            byte[] bys = new byte[1024];
            while ((len = inputStream.read(bys)) != -1) {
                System.out.println(new String(bys,0,len));
            }
        
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            try {
                inputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
}
```
 

#### 字节流FileInputstream复制图片

**复制图片原理**

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/stream-55e22f8c-8b3f-408d-a12e-e26c0ddbaee6.png)

**代码实现**

复制图片文件，代码如下：

```java
public class Copy {
    public static void main(String[] args) throws IOException {
        // 1.创建流对象
        // 1.1 指定数据源
        FileInputStream fis = new FileInputStream("D:\\test.jpg");
        // 1.2 指定目的地
        FileOutputStream fos = new FileOutputStream("test_copy.jpg");

        // 2.读写数据
        // 2.1 定义数组
        byte[] b = new byte[1024];
        // 2.2 定义长度
        int len;
        // 2.3 循环读取
        while ((len = fis.read(b))!=-1) {
            // 2.4 写出数据
            fos.write(b, 0 , len);
        }

        // 3.关闭资源
        fos.close();
        fis.close();
    }
}
```
 

**注**：**复制文本、图片、mp3、视频等的方式一样**。

到这里，字节流OutputStream与InputStream就讲清楚了。

>参考链接：[https://www.cnblogs.com/yichunguo/p/11775270.html](https://www.cnblogs.com/yichunguo/p/11775270.html)，整理：沉默王二


---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)