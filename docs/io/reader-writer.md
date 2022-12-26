---
title: Java字符流Reader和Writer的故事
shortTitle: 字符流Reader和Writer
category:
  - Java核心
tag:
  - Java IO
description: Java程序员进阶之路，小白的零基础Java教程，Java字符流Reader和Writer的故事
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,Java IO,Reader,Writer,字符流
---

字符流Reader和Writer的故事要从它们的类关系图开始，啥都不说了，直接看图

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/reader-writer-472cf80a-c6d1-4952-b672-15cd54d06eaf.png)

## 字符流

字符流本质是基于字节流读取/写入的，只不过加了编码和解码。如果用字节流直接读取/写入数据会有乱码问题，见下例：

```java
package IO;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

public class CharaterStream {
    public static void main(String[] args) throws Exception {
        //FileInputStream为操作文件的字符输入流
        FileInputStream inputStream = new FileInputStream("a.txt");//内容为“沉默王二是傻 X”

        int len;
        while ((len=inputStream.read())!=-1){
           System.out.print((char)len);
        }

    }
}
运行结果：   æ²é»çäºæ¯å» X
```
 
具体现状分析：

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/reader-writer-0b68ef81-26d0-4a4e-9c1b-61928ce8646c.png)


> 字节流读取中文字符时，可能不会显示完整的字符，那是因为一个中文字符占用多个字节。

那字节流就没办法了吗？不，字节流依旧有办法，只是麻烦了点，代码如下：

```java
public class CharaterStream {
    public static void main(String[] args) throws Exception {

        FileInputStream inputStream = new FileInputStream("abc.txt");
        byte[] bytes = new byte[1024];
        int len;
        while ((len=inputStream.read(bytes))!=-1){
            System.out.print(new String(bytes,0,len));
        }
    }
}
运行结果： 哥敢摸屎
```
 

这是为啥呢？

因为我们拿 String 类进行了解码，查看`new String()`的源码，`String`构造方法有解码功能，并且默认编码是`utf-8`，代码如下：

```java
public String(byte bytes[], int offset, int length) {
    checkBounds(bytes, offset, length);
    this.value = StringCoding.decode(bytes, offset, length);
}

static char[] decode(byte[] ba, int off, int len) {
    String csn = Charset.defaultCharset().name();
    try {
        // use charset name decode() variant which provides caching.
        return decode(csn, ba, off, len);
    } catch (UnsupportedEncodingException x) {
        warnUnsupportedCharset(csn);
    }
    try {
        return decode("ISO-8859-1", ba, off, len);
    } catch (UnsupportedEncodingException x) {
        // If this code is hit during VM initialization, MessageUtils is
        // the only way we will be able to get any kind of error message.
        MessageUtils.err("ISO-8859-1 charset not available: "
                         + x.toString());
        // If we can not find ISO-8859-1 (a required encoding) then things
        // are seriously wrong with the installation.
        System.exit(1);
        return null;
    }
}
public static Charset defaultCharset() {
    if (defaultCharset == null) {
        synchronized (Charset.class) {
            String csn = AccessController.doPrivileged(
                new GetPropertyAction("file.encoding"));
            Charset cs = lookup(csn);
            if (cs != null)
                defaultCharset = cs;
            else
                defaultCharset = forName("UTF-8");
        }
    }
    return defaultCharset;
}
```
 

尽管字节流也有办法解决乱码问题，但还是比较麻烦，于是 Java 就有了字符流，以`字符为单位`读写数据，字符流`专门用于处理文本`文件。

如果处理纯文本的数据请优先考虑字符流，其他情况就用字节流（图片、视频、等等`只文本`例外）。

> 从另一角度来说：**字符流 = 字节流 + 编码表**

## 1、字符输入流（Reader）

`java.io.Reader`抽象类是**字符输入流**类的**超类**（父类），可以读取字符信息到内存中。它定义了字符输入流的一些共性方法：

> 1、`public void close()` ：关闭此流并释放与此流相关的系统资源。
> 
> 2、 `public int read()`： 从输入流读取一个字符。
> 
> 3、 `public int read(char[] cbuf)`： 从输入流中读取一些字符，并将它们存储到字符数组 `cbuf`中

### FileReader类

`java.io.FileReader` 类用来读取字符文件。构造时使用系统默认的字符编码和默认字节缓冲区。

#### 构造方法

> 1、`FileReader(File file)`： 创建一个新的 FileReader ，参数为**File对象**。
> 
> 2、 `FileReader(String fileName)`： 创建一个新的 FileReader，参数为文件名。

构造方法的使用就算不写应该都很熟悉了吧，代码如下：

```java
public class FileReaderConstructor throws IOException{
    public static void main(String[] args) {
   	 	// 使用File对象创建流对象
        File file = new File("a.txt");
        FileReader fr = new FileReader(file);
      
        // 使用文件名称创建流对象
        FileReader fr = new FileReader("b.txt");
    }
}
```
 

#### FileReader读取字符数据

1.  **读取字符**：`read`方法，每次可以读取一个字符的数据，返回读取的字符（转为 int 类型），读取到文件末尾，返回`-1`，循环读取，代码使用演示：

```java
public class FRRead {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileReader fr = new FileReader("abc.txt");
        // 定义变量，保存数据
        int b;
        // 循环读取
        while ((b = fr.read())!=-1) {
            System.out.println((char)b);
        }
        // 关闭资源
        fr.close();
    }
}
```
 

至于读取的写法类似字节流的写法，只是读取单位不同罢了。

## 2、字符输出流（Writer）

`java.io.Writer` 抽象类是**字符输出流**类的**超类**（父类），将指定的字符信息写入到目的地，定义了字符输出流的一些共性方法：

> 1、`void write(int c)` 写入单个字符。
> 
> 2、`void write(char[] cbuf)` 写入字符数组。
> 
> 3、 `abstract void write(char[] cbuf, int off, int len)` 写入字符数组的一部分,off为开始索引,len为字符个数。
> 
> 4、 `void write(String str)` 写入字符串。
> 
> 5、`void write(String str, int off, int len)` 写入字符串的某一部分,off为字符串的开始索引,len为字符个数。
> 
> 6、`void flush()` 刷新该流的缓冲。
> 
> 7、`void close()` 关闭此流，但要先刷新它。

### FileWriter类

`java.io.FileWriter` 类用来将字符写入到文件的类。构造时使用系统默认的字符编码和默认字节缓冲区。

#### 构造方法

1、 `FileWriter(File file)`： 创建一个新的 FileWriter，参数为要读取的File对象。

2、`FileWriter(String fileName)`： 创建一个新的 FileWriter，参数为要读取的文件的名称。

依旧是熟悉的构造举例，代码如下：

```java
public class FileWriterConstructor {
    public static void main(String[] args) throws IOException {
   	 	// 第一种：使用File对象创建流对象
        File file = new File("a.txt");
        FileWriter fw = new FileWriter(file);
      
        // 第二种：使用文件名称创建流对象
        FileWriter fw = new FileWriter("b.txt");
    }
}
```
 

#### FileWriter写入数据

**写入字符**：`write(int b)` 方法，每次可以写出一个字符数据，代码使用演示：

```java
public class FWWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileWriter fw = new FileWriter("fw.txt");     
      	// 写出数据
      	fw.write(97); // 写出第1个字符
      	fw.write('b'); // 写出第2个字符
      	fw.write('C'); // 写出第3个字符
      	
        //关闭资源时,与FileOutputStream不同。 如果不关闭,数据只是保存到缓冲区，并未保存到文件。
        // fw.close();
    }
}
输出结果：
abC
```
 

> 【注意】**关闭资源时,与FileOutputStream不同。 如果不关闭,数据只是保存到缓冲区，并未保存到文件。**

#### 关闭close和刷新flush

因为内置缓冲区的原因，如果不关闭输出流，无法把字符写入到文件中。但是关闭了流对象，就无法继续写数据了。如果我们既想写入数据，又想继续使用流，就需要`flush` 方法了。

`flush` ：刷新缓冲区，流对象可以继续使用。

`close` ：先刷新缓冲区，然后通知系统释放资源。流对象不可以再被使用了。

flush还是比较有趣的，小伙伴们不自己运行一下还真不好体会，来段代码体会体会：

```java
public class FlushDemo {
    public static void main(String[] args) throws Exception {
        //源   也就是输入流【读取流】 读取a.txt文件
        FileReader fr=new FileReader("abc.txt");  //必须要存在a.txt文件，否则报FileNotFoundException异常
        //目的地  也就是输出流
        FileWriter fw=new FileWriter("b.txt");  //系统会自动创建b.txt，因为它是输出流！
        int len;
        while((len=fr.read())!=-1){
           fw.write(len);
        }
   注意这里是没有使用close关闭流，开发中不能这样做，但是为了更好的体会flush的作用
    }
}
```
 
运行效果是怎么样的呢？答案是b.txt文件中依旧是空的，并没有任何东西，为啥呢？

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/reader-writer-3b4fd024-856f-45ee-8183-1a1ee808e5ce.png)

【注意】**关闭资源时,FileWriter与FileOutputStream不同，如果不关闭,数据只是保存到缓冲区，并未保存到文件。**

这个时候反应过来了吧？可见实践的重要性，**编程就是这样，不去敲，永远学不会**！！！所以一定要去敲，多敲啊！！！

所以，我们在以上的代码中再添加下面三句代码，就完美了，b.txt文件就能复制到源文件的数据了！

 
```java
fr.close();
fw.flush();
fw.close();
```
 

> `flush()`这个方法是清空缓存的意思，用于清空缓冲区的数据流，进行流的操作时，数据先被读到内存中，然后再把数据写到文件中。

那么当你数据读完时，如果这时调用`close()`方法关闭了读写流，就可能造成数据丢失，为什么呢？

因为，读入数据完成时不代表写入数据完成，一部分数据可能会留在缓存区中，这个时候`flush()`方法就格外重要了。

好了，接下来close。使用代码如下：

```java
public class FWWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象
        FileWriter fw = new FileWriter("fw.txt");
        // 写出数据，通过flush
        fw.write('刷'); // 写出第1个字符
        fw.flush();
        fw.write('新'); // 继续写出第2个字符，写出成功
        fw.flush();
      
      	// 写出数据，然后close
        fw.write('关'); // 写出第1个字符
        fw.close();
        fw.write('闭'); // 继续写出第2个字符,【报错】java.io.IOException: Stream closed
        fw.close();
    }
}
```
 

> 即便是flush方法写出了数据，操作的最后还是要调用close方法，释放系统资源。

#### FileWriter的续写和换行

**续写和换行**：操作类似于[FileOutputStream操作](https://tobebetterjavaer.com/io/stream.html)，直接上代码：

```java
public class FWWrite {
    public static void main(String[] args) throws IOException {
        // 使用文件名称创建流对象，可以续写数据
        FileWriter fw = new FileWriter("fw.txt",true);     
      	// 写出字符串
        fw.write("沉默王二");
      	// 写出换行
      	fw.write("\r\n");
      	// 写出字符串
  		fw.write("是傻 X");
      	// 关闭资源
        fw.close();
    }
}
输出结果:
沉默王二
是傻 X
```
 

#### FileReader和FileWriter类完成文本文件复制

直接上代码：

```java
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class CopyFile {
    public static void main(String[] args) throws IOException {
        //创建输入流对象
        FileReader fr=new FileReader("F:\\新建文件夹\\aa.txt");//文件不存在会抛出java.io.FileNotFoundException
        //创建输出流对象
        FileWriter fw=new FileWriter("C:\\copyaa.txt");
        /*创建输出流做的工作：
         *      1、调用系统资源创建了一个文件
         *      2、创建输出流对象
         *      3、把输出流对象指向文件        
         * */
        //文本文件复制，一次读一个字符
        copyMethod1(fr, fw);
        //文本文件复制，一次读一个字符数组
        copyMethod2(fr, fw);
        
        fr.close();
        fw.close();
    }

    public static void copyMethod1(FileReader fr, FileWriter fw) throws IOException {
        int ch;
        while((ch=fr.read())!=-1) {//读数据
            fw.write(ch);//写数据
        }
        fw.flush();
    }

    public static void copyMethod2(FileReader fr, FileWriter fw) throws IOException {
        char chs[]=new char[1024];
        int len=0;
        while((len=fr.read(chs))!=-1) {//读数据
            fw.write(chs,0,len);//写数据
        }
        fw.flush();
    }
}
```
 

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/reader-writer-0f158401-ee7b-4384-a566-be10bd264fbd.png)

> 最后再次强调：
> 
> 字符流，只能操作文本文件，不能操作图片，视频等非文本文件。当我们单纯读或者写文本文件时 使用字符流 其他情况使用字节流

## IO异常的处理

我们在学习的过程中可能习惯把异常抛出，而实际开发中并不能这样处理，建议使用`try...catch...finally` 代码块，处理异常部分，格式代码如下：

```java
public class HandleException1 {
    public static void main(String[] args) {
      	// 声明变量
        FileWriter fw = null;
        try {
            //创建流对象
            fw = new FileWriter("fw.txt");
            // 写出数据
            fw.write("哥敢摸si"); //哥敢摸si
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fw != null) {
                    fw.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```
 

好了，到这里，字符流Reader和Writer的故事的到这里了！


>参考链接：[https://www.cnblogs.com/yichunguo/p/11775270.html](https://www.cnblogs.com/yichunguo/p/11775270.html)，整理：沉默王二


---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)