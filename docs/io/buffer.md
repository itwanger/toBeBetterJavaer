---
title: Java缓冲流（Buffered）：读写速度有了质的飞升
shortTitle: Java缓冲流Buffered
category:
  - Java核心
tag:
  - Java IO
description: Java程序员进阶之路，小白的零基础Java教程，Java缓冲流（Buffered）：读写速度有了质的飞升
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,IO,缓冲流,Buffered,BufferedInputStream,BufferedOutputStream,BufferedReader,BufferedWriter
---

## 1.1 简要概述

首先我们来认识认识缓冲流,也叫高效流，是对4个`FileXxx` 流的“增强流”。

**缓冲流的基本原理**：

> 1、使用底层流对象从具体设备上获取数据，并将数据存储到缓冲区的数组内。
> 
> 2、通过缓冲区的read()方法从缓冲区获取具体的字符数据，这样就提高了效率。
> 
> 3、用read方法读取字符数据，并存储到另外一个容器中，直到读取到了换行符时，再将另一个容器临时存储的数据转成字符串返回，也就是readLine()的功能。

在创建缓冲流对象时，会创建一个内置的默认大小的缓冲区数组，通过缓冲区读写，减少系统IO次数，从而提高读写效率。

缓冲书写格式为`BufferedXxx`，按照数据类型分为 2类：

*   **字节缓冲流**：`BufferedInputStream`，`BufferedOutputStream`
*   **字符缓冲流**：`BufferedReader`，`BufferedWriter`

## 1.2 字节缓冲流

### 构造方法

*   `public BufferedInputStream(InputStream in)` ：创建一个新的缓冲输入流，注意参数类型为**InputStream**。
*   `public BufferedOutputStream(OutputStream out)`： 创建一个新的缓冲输出流，注意参数类型为**OutputStream**。

构造举例代码如下：

```java
//构造方式一： 创建字节缓冲输入流【但是开发中一般常用下面的格式申明】
FileInputStream fps = new FileInputStream(b.txt);
BufferedInputStream bis = new BufferedInputStream(fps)

//构造方式一： 创建字节缓冲输入流
BufferedInputStream bis = new BufferedInputStream(new FileInputStream("b.txt"));

///构造方式二： 创建字节缓冲输出流
BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("b.txt"));
```
 

### 感受缓冲流的高效

缓冲流读写方法与基本的流是一致的，我们通过复制370多MB的大文件，测试它的效率。

1.  基本流，代码如下：

```java
public class BufferedDemo {
    public static void main(String[] args) throws FileNotFoundException {
        // 记录开始时间
      	long start = System.currentTimeMillis();
		// 创建流对象
        try (
        	FileInputStream fis = new FileInputStream("py.exe");//exe文件够大
        	FileOutputStream fos = new FileOutputStream("copyPy.exe")
        ){
        	// 读写数据
            int b;
            while ((b = fis.read()) != -1) {
                fos.write(b);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
		// 记录结束时间
        long end = System.currentTimeMillis();
        System.out.println("普通流复制时间:"+(end - start)+" 毫秒");
    }
}
不好意思十分钟过去了还在玩命复制中...
```
 

2.  缓冲流，代码如下：

```java
public class BufferedDemo {
    public static void main(String[] args) throws FileNotFoundException {
        // 记录开始时间
      	long start = System.currentTimeMillis();
		// 创建流对象
        try (
         BufferedInputStream bis = new BufferedInputStream(new FileInputStream("py.exe"));
	     BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("copyPy.exe"));
        ){
        // 读写数据
            int b;
            while ((b = bis.read()) != -1) {
                bos.write(b);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
		// 记录结束时间
        long end = System.currentTimeMillis();
        System.out.println("缓冲流复制时间:"+(end - start)+" 毫秒");
    }
}

缓冲流复制时间:8016 毫秒
```
 

有的童鞋就要说了，我要更快的速度！最近看速度与激情7有点上头，能不能再快些？答案是当然可以。

想要更快，可以使用数组的方式，代码如下：

```java
public class BufferedDemo {
    public static void main(String[] args) throws FileNotFoundException {
      	// 记录开始时间
        long start = System.currentTimeMillis();
		// 创建流对象
        try (
		 BufferedInputStream bis = new BufferedInputStream(new FileInputStream("py.exe"));
		 BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("copyPy.exe"));
        ){
          	// 读写数据
            int len;
            byte[] bytes = new byte[8*1024];
            while ((len = bis.read(bytes)) != -1) {
                bos.write(bytes, 0 , len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
		// 记录结束时间
        long end = System.currentTimeMillis();
        System.out.println("缓冲流使用数组复制时间:"+(end - start)+" 毫秒");
    }
}
缓冲流使用数组复制时间:521 毫秒
```
 
### 为什么字节缓冲流会这么快呢？

这恐怕也是大家看到这所想到的问题：“为什么字节缓冲流会这么快呢？”

这就必须得说道说道了。

传统的 Java IO 是阻塞模式的，它的工作状态就是“读/写，等待，读/写，等待。。。。。。”

字节缓冲流解决的就是这个问题：一次多读点多写点，减少读写的频率，用空间换时间。

我们来看 BufferedInputStream 的 read 方法：

```java
public synchronized int read() throws IOException {
    if (pos >= count) {
        fill();
        if (pos >= count)
            return -1;
    }
    return getBufIfOpen()[pos++] & 0xff;
}
```

这段代码主要有两部分：

- fill()：该方法会将缓冲 buf 填满
- `getBufIfOpen()[pos++] & 0xff`：如果 buf 还没有读完，就从 buf 中获取一个字节，否则再次填充 buf

>0xff 是十六进制，相当于二进制的 11111111，&运算符的意思是：如果两个操作数的对应位为 1，则输出 1，否则为 0；由于 0xff 有 8 个 1，单个 byte 转成 int 其实就是将 byte 和 int 类型的 255 进行(&)与运算即可，也就是

```java
byte b = 25;
int a = b & 0XFF; // 或者 b & 255;
```

[对 byte & 0xFF 的理解](http://ckjava.com/2018/05/03/java-byte-0XFF/)

再来看 FileInputStream 的 read 方法：

```java
public int read() throws IOException {
    return read0();
}

private native int read0() throws IOException;
```

一个 native 方法（该方法的实现由非Java语言实现，比如C语言），它本质上是阻塞的，读取一个字节，然后阻塞，等待下一次调用。

画幅图比较一下。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/buffer-fcae80c2-04a5-4a1b-ab49-89a5ddabd38e.png)

再来看 BufferedOutputStream 的 read 方法：

```java
public synchronized void write(byte b[], int off, int len) throws IOException {
    if (len >= buf.length) {
        /* If the request length exceeds the size of the output buffer,
           flush the output buffer and then write the data directly.
           In this way buffered streams will cascade harmlessly. */
        flushBuffer();
        out.write(b, off, len);
        return;
    }
    if (len > buf.length - count) {
        flushBuffer();
    }
    System.arraycopy(b, off, buf, count, len);
    count += len;
}
```

只有当 buf 写满了，才会 flush，将数据刷到磁盘，默认一次刷 8192 个字节。

```java
public BufferedOutputStream(OutputStream out) {
    this(out, 8192);
}
```

如果 buf 没有写满，会继续写 buf。

FileOutputStream 的 write 方法也是一个 native 方法，同样会阻塞。

```java
private native void write(int b, boolean append) throws IOException;

public void write(int b) throws IOException {
    write(b, append);
}
```

当 BufferedOutputStream 和 BufferedInputStream 配合起来后，就减少了相当大量的读写次数，尤其是 `byte[] bytes = new byte[8*1024]`，就相当于缓冲区的空间有 8 个 1024 字节了，那读写效率就会大大提高。

## 1.3 字符缓冲流

### 构造方法

相同的，来看看其构造，其格式以及原理和字节缓冲流是一样一样的！

*   `public BufferedReader(Reader in)` ：创建一个新的缓冲输入流，注意参数类型为**Reader**。
*   `public BufferedWriter(Writer out)`： 创建一个新的缓冲输出流，注意参数类型为**Writer**。

构造举例，代码如下：

```java
// 创建字符缓冲输入流
BufferedReader br = new BufferedReader(new FileReader("b.txt"));
// 创建字符缓冲输出流
BufferedWriter bw = new BufferedWriter(new FileWriter("b.txt"));
```
 

### 字符缓冲流特有方法

字符缓冲流的基本方法与普通字符流调用方式一致，这里不再阐述，我们来看字符缓冲流具备的**特有**方法。

*   BufferedReader：`public String readLine()`: **读一行数据**。 读取到最后返回null
*   BufferedWriter：`public void newLine()`: **换行**,由系统属性定义符号。

`readLine`方法演示代码如下：

```java
public class BufferedReaderDemo {
    public static void main(String[] args) throws IOException {
      	 // 创建流对象
        BufferedReader br = new BufferedReader(new FileReader("a.txt"));
		// 定义字符串,保存读取的一行文字
        String line  = null;
      	// 循环读取,读取到最后返回null
        while ((line = br.readLine())!=null) {
            System.out.print(line);
            System.out.println("------");
        }
		// 释放资源
        br.close();
    }
}
```
 

`newLine`方法演示代码如下：

```java
public class BufferedWriterDemo throws IOException {
  public static void main(String[] args) throws IOException  {
    	// 创建流对象
  	BufferedWriter bw = new BufferedWriter(new FileWriter("b.txt"));
    	// 写出数据
      bw.write("哥");
    	// 写出换行
      bw.newLine();
      bw.write("敢");
      bw.newLine();
      bw.write("摸屎");
      bw.newLine();
      bw.write("你敢吗？");
      bw.newLine();
  	// 释放资源
      bw.close();
  }
}
输出效果:
哥
敢
摸屎
你敢吗？
```
 

## 1.4 字符缓冲流练习

字符缓冲流练习啥捏？先放松一下吧各位，先欣赏欣赏我写的这篇诗

> 6.你说你的程序叫简单，我说我的代码叫诗篇
> 
> 1.一想到你我就哦豁豁豁豁豁豁豁豁豁豁....哦nima个头啊，完全不理人家受得了受不了
> 
> 8.Just 简单你和我 ，Just 简单程序员
> 
> 3.约了地点却忘了见面 ，懂得寂寞才明白浩瀚
> 
> 5.沉默是最大的发言权
> 
> 2.总是喜欢坐在电脑前， 总是喜欢工作到很晚
> 
> 7.向左走 又向右走，我们转了好多的弯
> 
> 4.你从来就不问我，你还是不是那个程序员

欣赏完了咩？没错，咱们就练习如何使用缓冲流的技术把上面的诗篇归顺序，都编过号了，就是前面的1到8的编号。

分析：首先用字符输入缓冲流创建个源，里面放没有排过序的文字，之后用字符输出缓冲流创建个目标接收，排序的过程就要自己写方法了哦，可以从每条诗词的共同点“.”符号下手！

### 代码实现

```java
public class BufferedTest {
    public static void main(String[] args) throws IOException {
        // 创建map集合,保存文本数据,键为序号,值为文字
        HashMap<String, String> lineMap = new HashMap<>();

        // 创建流对象  源
        BufferedReader br = new BufferedReader(new FileReader("a.txt"));
        //目标
        BufferedWriter bw = new BufferedWriter(new FileWriter("b.txt"));

        // 读取数据
        String line  = null;
        while ((line = br.readLine())!=null) {
            // 解析文本
            String[] split = line.split("\\.");
            // 保存到集合
            lineMap.put(split[0],split[1]);
        }
        // 释放资源
        br.close();

        // 遍历map集合
        for (int i = 1; i <= lineMap.size(); i++) {
            String key = String.valueOf(i);
            // 获取map中文本
            String value = lineMap.get(key);
          	// 写出拼接文本
            bw.write(key+"."+value);
          	// 写出换行
            bw.newLine();
        }
		// 释放资源
        bw.close();
    }
}
```
 

运行效果

```
1.一想到你我就哦豁豁豁豁豁豁豁豁豁豁…哦nima个头啊，完全不理人家受得了受不了
2.总是喜欢坐在电脑前， 总是喜欢工作到很晚
3.约了地点却忘了见面 ，懂得寂寞才明白浩瀚
4.你从来就不问我，你还是不是那个程序员
5.沉默是最大的发言权
6.你说你的程序叫简单，我说我的代码叫诗篇
7.向左走 又向右走，我们转了好多的弯
8.Just 简单你和我 ，Just 简单程序员
```

不过，由于字符流本身就用到了缓冲区，所以字符缓冲流就不像字节缓冲流那样，性能会有质的提升。

>参考链接：[https://www.cnblogs.com/yichunguo/p/11775270.html](https://www.cnblogs.com/yichunguo/p/11775270.html)，整理：沉默王二


---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)