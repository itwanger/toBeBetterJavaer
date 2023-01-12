---
title: Java转换流，解决字符与字节之间编码、解码的乱码问题
shortTitle: Java转换流(编码解码与乱码)
category:
  - Java核心
tag:
  - Java IO
description: Java程序员进阶之路，小白的零基础Java教程，Java转换流，解决字符与字节之间编码、解码的乱码问题
head:
  - - meta
    - name: keywords
      content: Java,Java SE,Java基础,Java教程,Java程序员进阶之路,Java入门,教程,Java IO,转换流,InputStreamReader,OutputStreamWriter,乱码,编码,解码
---

何谓转换流？为何由来？让我们暂时带着这两个问题来了解了解字符编码和字符集！

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/char-byte-86699b2c-4f24-492a-ba68-62c3be0f86bc.png)

## 字符编码与解码

众所周知，计算机中储存的信息都是用二进制数表示的，而我们在屏幕上看到的数字、英文、标点符号、汉字等字符是二进制数转换之后的结果。

按照某种规则，将字符存储到计算机中，称为**编码** 。反之，将存储在计算机中的二进制数按照某种规则解析显示出来，称为**解码** 。比如说，按照`A`规则存储，同样按照`A`规则解析，那么就能显示正确的文本符号。反之，按照`A`规则存储，再按照`B`规则解析，就会导致乱码现象。

简单一点的说就是：

> 编码:字符(能看懂的)-->字节(看不懂的)
> 
> 解码:字节(看不懂的)-->字符(能看懂的)

代码解释则是

```java
String(byte[] bytes, String charsetName):通过指定的字符集解码字节数组
byte[] getBytes(String charsetName):使用指定的字符集合把字符串编码为字节数组

编码:把看得懂的变成看不懂的
String -- byte[]

解码:把看不懂的变成看得懂的
byte[] -- String
```
 

*   **字符编码** `Character Encoding`: 就是一套自然语言的字符与二进制数之间的对应规则。

而**编码表**则是生活中文字和计算机中二进制的对应规则

## 字符集

*   **字符集** `Charset`：也叫**编码表**。是一个系统支持的所有字符的集合，包括各国家文字、标点符号、图形符号、数字等。

计算机要准确的存储和识别各种字符集符号，需要进行字符编码，一套字符集必然至少有一套字符编码。常见的字符集有`ASCII`字符集、`GBK`字符集、`Unicode`字符集等。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/char-byte-eafc0ac8-ce5b-4183-9a7e-9498e23b2d4e.png)

可见，当指定了**编码**，它所对应的**字符集**自然就指定了，所以**编码**才是我们最终要关心的。

*   **ASCII字符集** ：
*   ASCII（American Standard Code for Information Interchange，美国信息交换标准代码）是基于拉丁字母的一套电脑编码系统，用于显示现代英语，主要包括控制字符（回车键、退格、换行键等）和可显示字符（英文大小写字符、阿拉伯数字和西文符号）。
*   基本的ASCII字符集，使用7位（bits）表示一个字符，共128字符。ASCII的扩展字符集使用8位（bits）表示一个字符，共256字符，方便支持欧洲常用字符。
*   **ISO-8859-1字符集**：
*   拉丁码表，别名Latin-1，用于显示欧洲使用的语言，包括荷兰、丹麦、德语、意大利语、西班牙语等。
*   ISO-8859-1使用单字节编码，兼容ASCII编码。
*   **GBxxx字符集**：
*   GB就是国标的意思，是为了显示中文而设计的一套字符集。
*   **GB2312**：简体中文码表。一个小于127的字符的意义与原来相同。但两个大于127的字符连在一起时，就表示一个汉字，这样大约可以组合了包含7000多个简体汉字，此外数学符号、罗马希腊的字母、日文的假名们都编进去了，连在ASCII里本来就有的数字、标点、字母都统统重新编了两个字节长的编码，这就是常说的"全角"字符，而原来在127号以下的那些就叫"半角"字符。
*   **GBK**：最常用的中文码表。是在GB2312标准基础上的扩展规范，使用了双字节编码方案，共收录了21003个汉字，完全兼容GB2312标准，同时支持繁体汉字以及日韩汉字等。
*   **GB18030**：最新的中文码表。收录汉字70244个，采用多字节编码，每个字可以由1个、2个或4个字节组成。支持中国国内少数民族的文字，同时支持繁体汉字以及日韩汉字等。
*   **Unicode字符集** ：
*   Unicode编码系统为表达任意语言的任意字符而设计，是业界的一种标准，也称为统一码、标准万国码。
*   它最多使用4个字节的数字来表达每个字母、符号，或者文字。有三种编码方案，UTF-8、UTF-16和UTF-32。最为常用的UTF-8编码。
*   UTF-8编码，可以用来表示Unicode标准中任何字符，它是电子邮件、网页及其他存储或传送文字的应用中，优先采用的编码。互联网工程工作小组（IETF）要求所有互联网协议都必须支持UTF-8编码。所以，我们开发Web应用，也要使用UTF-8编码。它使用一至四个字节为每个字符编码，编码规则：
1.  128个US-ASCII字符，只需一个字节编码。
2.  拉丁文等字符，需要二个字节编码。
3.  大部分常用字（含中文），使用三个字节编码。
4.  其他极少使用的Unicode辅助字符，使用四字节编码。

## 编码问题导致乱码

在java开发工具IDEA中，使用`FileReader` 读取项目中的文本文件。由于IDEA的设置，都是默认的`UTF-8`编码，所以没有任何问题。但是，当读取Windows系统中创建的文本文件时，由于Windows系统默认的是GBK编码，就会出现乱码。

```java
public class ReaderDemo {
    public static void main(String[] args) throws IOException {
        FileReader fileReader = new FileReader("C:\\a.txt");
        int read;
        while ((read = fileReader.read()) != -1) {
            System.out.print((char)read);
        }
        fileReader.close();
    }
}
输出结果：���
```
 

那么如何读取GBK编码的文件呢？ 这个时候就得讲讲转换流了！

> 从另一角度来讲：**字符流=字节流+编码表**

## InputStreamReader类--(字节流到字符流的桥梁)

转换流`java.io.InputStreamReader`，是`Reader`的子类，从字面意思可以看出它是从字节流到字符流的桥梁。它读取字节，并使用指定的字符集将其解码为字符。它的字符集可以由名称指定，也可以接受平台的默认字符集。

### 构造方法

> `InputStreamReader(InputStream in)`: 创建一个使用默认字符集的字符流。
> 
> `InputStreamReader(InputStream in, String charsetName)`: 创建一个指定字符集的字符流。

构造代码如下：

```java
InputStreamReader isr = new InputStreamReader(new FileInputStream("in.txt"));
InputStreamReader isr2 = new InputStreamReader(new FileInputStream("in.txt") , "GBK");
```
 

### 使用转换流解决编码问题

```java
public class ReaderDemo2 {
    public static void main(String[] args) throws IOException {
      	// 定义文件路径,文件为gbk编码
        String FileName = "C:\\A.txt";
      	// 创建流对象,默认UTF8编码
        InputStreamReader isr = new InputStreamReader(new FileInputStream(FileName));
      	// 创建流对象,指定GBK编码
        InputStreamReader isr2 = new InputStreamReader(new FileInputStream(FileName) , "GBK");
		// 定义变量,保存字符
        int read;
      	// 使用默认编码字符流读取,乱码
        while ((read = isr.read()) != -1) {
            System.out.print((char)read); // �����ʺ      
        }
        isr.close();
      
      	// 使用指定编码字符流读取,正常解析
        while ((read = isr2.read()) != -1) {
            System.out.print((char)read); // 沉默王二
        }
        isr2.close();
    }
}
```
 

## 2.4 OutputStreamWriter类--(字符流到字节流的桥梁)

转换流`java.io.OutputStreamWriter` ，是Writer的子类，字面看容易混淆会误以为是转为字符流，其实不然，OutputStreamWriter为从字符流到字节流的桥梁。使用指定的字符集将字符编码为字节。它的字符集可以由名称指定，也可以接受平台的默认字符集。

### 构造方法

> `OutputStreamWriter(OutputStream in)`: 创建一个使用默认字符集的字符流。
> 
> `OutputStreamWriter(OutputStream in, String charsetName)`: 创建一个指定字符集的字符流。

构造举例，代码如下：

```java
OutputStreamWriter isr = new OutputStreamWriter(new FileOutputStream("a.txt"));
OutputStreamWriter isr2 = new OutputStreamWriter(new FileOutputStream("b.txt") , "GBK");
```
 

### 指定编码构造代码

```java
public class OutputDemo {
    public static void main(String[] args) throws IOException {
      	// 定义文件路径
        String FileName = "C:\\s.txt";
      	// 创建流对象,默认UTF8编码
        OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream(FileName));
        // 写出数据
      	osw.write("沉默"); // 保存为6个字节
        osw.close();
      	
		// 定义文件路径
		String FileName2 = "D:\\A.txt";
     	// 创建流对象,指定GBK编码
        OutputStreamWriter osw2 = new OutputStreamWriter(new FileOutputStream(FileName2),"GBK");
        // 写出数据
      	osw2.write("王二");// 保存为4个字节
        osw2.close();
    }
}
```
 

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/io/char-byte-61d3a7e6-365e-41d3-8c4a-bc9e680c70a6.png)



为了达到**最高效率**，可以考虑在 `BufferedReader` 内包装 `InputStreamReader`

```java
BufferedReader in = new BufferedReader(new InputStreamReader(System.in))；
```


>参考链接：[https://www.cnblogs.com/yichunguo/p/11775270.html](https://www.cnblogs.com/yichunguo/p/11775270.html)，整理：沉默王二


---------

最近整理了一份牛逼的学习资料，包括但不限于Java基础部分（JVM、Java集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是2022年全网最全的学习和找工作的PDF资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **111** 即可免费领取。


![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)