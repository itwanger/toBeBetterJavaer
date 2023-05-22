---
title: Java File：IO 流的起点与终点
shortTitle: 文件流
category:
  - Java核心
tag:
  - Java IO
description: 本文详细介绍了 Java File 类，阐述了其在 IO 流操作中的关键角色，作为输入输出操作的起点与终点。同时，文章还提供了 Java File 类的实际应用示例和常用方法。阅读本文，将帮助您更深入地了解 Java File 类及其在 Java 编程中的重要性，提高文件操作效率。
head:
  - - meta
    - name: keywords
      content: Java,Java IO,文件流, file,java文件,java目录,java文件增删改查,java file
---

# 7.2 文件流

在 IO 操作中，文件的操作相对来说是比较复杂的，但也是使用频率最高的部分，我们几乎所有的项目中几乎都躺着一个叫做 FileUtil 或者 FileUtils 的工具类。

`java.io.File` 类是专门对文件进行操作的类，注意只能对文件本身进行操作，不能对文件内容进行操作，想要操作内容，必须借助输入输出流。

`File` 类是文件和目录的抽象表示，主要用于文件和目录的创建、查找和删除等操作。

怎么理解上面两句话？其实很简单！

第一句是说 File 跟流无关，File 类不能对文件进行读和写，也就是输入和输出！

第二句是说 File 可以表示`D:\\文件目录1`与`D:\\文件目录1\\文件.txt`，前者是文件夹（Directory，或者叫目录）后者是文件(file)，File 类就是用来操作它俩的。

### File 构造方法

在 Java 中，一切皆是对象，File 类也不例外，不论是哪个对象都应该从该对象的构造说起，所以我们来分析分析`File`类的构造方法。

比较常用的构造方法有三个：

1、 `File(String pathname)` ：通过给定的**路径**来创建新的 File 实例。

2、 `File(String parent, String child)` ：从**父路径（字符串）和子路径**创建新的 File 实例。

3、 `File(File parent, String child)` ：从**父路径（File）和子路径名字符串**创建新的 File 实例。

看文字描述不够生动、不够形象、不得劲？没事，通过举例马上就生动形象了，代码如下：

```java
// 文件路径名
String path = "/Users/username/123.txt";
File file1 = new File(path);
// 文件路径名
String path2 = "/Users/username/1/2.txt";
File file2 = new File(path2); -------------相当于/Users/username/1/2.txt
// 通过父路径和子路径字符串
String parent = "/Users/username/aaa";
String child = "bbb.txt";
File file3 = new File(parent, child); --------相当于/Users/username/aaa/bbb.txt
// 通过父级File对象和子路径字符串
File parentDir = new File("/Users/username/aaa");
String child = "bbb.txt";
File file4 = new File(parentDir, child); --------相当于/Users/username/aaa/bbb.txt
```

注意，macOS 路径使用正斜杠（`/`）作为路径分隔符，而 Windows 路径使用反斜杠（`\`）作为路径分隔符。所以在遇到路径分隔符的时候，不要直接去写`/`或者`\`。

Java 中提供了一个跨平台的方法来获取路径分隔符，即使用 `File.separator`，这个属性会根据操作系统自动返回正确的路径分隔符。

File 类的注意点：

1.  一个 File 对象代表硬盘中实际存在的一个文件或者目录。
2.  File 类的构造方法不会检验这个文件或目录是否真实存在，因此无论该路径下是否存在文件或者目录，都不影响 File 对象的创建。

### File 常用方法

File 的常用方法主要分为获取功能、获取绝对路径和相对路径、判断功能、创建删除功能的方法。

#### **1）获取功能的方法**

1、`getAbsolutePath()` ：返回此 File 的绝对路径。

2、`getPath()` ：结果和 getAbsolutePath 一致。

3、`getName()` ：返回文件名或目录名。

4、`length()` ：返回文件长度，以字节为单位。

测试代码如下【注意测试以你自己的电脑文件夹为准】：

```java
File f = new File("/Users/username/aaa/bbb.java");
System.out.println("文件绝对路径:"+f.getAbsolutePath());
System.out.println("文件构造路径:"+f.getPath());
System.out.println("文件名称:"+f.getName());
System.out.println("文件长度:"+f.length()+"字节");

File f2 = new File("/Users/username/aaa");
System.out.println("目录绝对路径:"+f2.getAbsolutePath());
System.out.println("目录构造路径:"+f2.getPath());
System.out.println("目录名称:"+f2.getName());
System.out.println("目录长度:"+f2.length());
```

注意：`length()` 表示文件的长度，`File` 对象表示目录的时候，返回值并无意义。

#### **2）绝对路径和相对路径**

绝对路径是从文件系统的根目录开始的完整路径，它描述了一个文件或目录在文件系统中的确切位置。在 Windows 系统中，绝对路径通常以盘符（如 C:）开始，例如 "`C:\Program Files\Java\jdk1.8.0_291\bin\java.exe`"。在 macOS 和 Linux 系统中，绝对路径通常以斜杠（`/`）开始，例如 "`/usr/local/bin/python3`"。

相对路径是相对于当前工作目录的路径，它描述了一个文件或目录与当前工作目录之间的位置关系。在 Java 中，相对路径通常是相对于当前 Java 程序所在的目录，例如 "`config/config.properties`"。如果当前工作目录是 "`/Users/username/project`"，那么相对路径 "`config/config.properties`" 就表示 "`/Users/username/project/config/config.properties`"。

注意：

- 在 Windows 操作系统中，文件系统默认是不区分大小写的，即在文件系统中，文件名和路径的大小写可以混合使用。例如，"`C:\Users\username\Documents\example.txt`" 和 "`C:\Users\Username\Documents\Example.txt`" 表示的是同一个文件。但是，Windows 操作系统提供了一个区分大小写的选项，可以在格式化磁盘时选择启用，这样文件系统就会区分大小写。
- 在 macOS 和 Linux 等 Unix 系统中，文件系统默认是区分大小写的。例如，在 macOS 系统中，"`/Users/username/Documents/example.txt`" 和 "`/Users/username/Documents/Example.txt`" 表示的是两个不同的文件。

```java
// 绝对路径示例
File absoluteFile = new File("/Users/username/example/test.txt");
System.out.println("绝对路径：" + absoluteFile.getAbsolutePath());

// 相对路径示例
File relativeFile = new File("example/test.txt");
System.out.println("相对路径：" + relativeFile.getPath());
```

#### **3）判断功能的方法**

1、 `exists()` ：判断文件或目录是否存在。

2、 `isDirectory()` ：判断是否为目录。

3、`isFile()` ：判断是否为文件。

方法演示，代码如下：

```java
File file = new File("/Users/username/example");

// 判断文件或目录是否存在
if (file.exists()) {
    System.out.println("文件或目录存在");
} else {
    System.out.println("文件或目录不存在");
}

// 判断是否是目录
if (file.isDirectory()) {
    System.out.println("是目录");
} else {
    System.out.println("不是目录");
}

// 判断是否是文件
if (file.isFile()) {
    System.out.println("是文件");
} else {
    System.out.println("不是文件");
}
```

#### **4）创建、删除功能的方法**

- `createNewFile()` ：文件不存在，创建一个新的空文件并返回`true`，文件存在，不创建文件并返回`false`。
- `delete()` ：删除文件或目录。如果是目录，只有目录为空才能删除。
- `mkdir()` ：只能创建一级目录，如果父目录不存在，则创建失败。返回 true 表示创建成功，返回 false 表示创建失败。
- `mkdirs()` ：可以创建多级目录，如果父目录不存在，则会一并创建。返回 true 表示创建成功，返回 false 表示创建失败或目录已经存在。

**开发中一般用**`mkdirs()`;

方法测试，代码如下：

```java
// 创建文件
File file = new File("/Users/username/example/test.txt");
if (file.createNewFile()) {
    System.out.println("创建文件成功：" + file.getAbsolutePath());
} else {
    System.out.println("创建文件失败：" + file.getAbsolutePath());
}

// 删除文件
if (file.delete()) {
    System.out.println("删除文件成功：" + file.getAbsolutePath());
} else {
    System.out.println("删除文件失败：" + file.getAbsolutePath());
}

// 创建多级目录
File directory = new File("/Users/username/example/subdir1/subdir2");
if (directory.mkdirs()) {
    System.out.println("创建目录成功：" + directory.getAbsolutePath());
} else {
    System.out.println("创建目录失败：" + directory.getAbsolutePath());
}
```

#### 5）目录的遍历

- `String[] list()` ：返回一个 String 数组，表示该 File 目录中的所有子文件或目录。
- `File[] listFiles()` ：返回一个 File 数组，表示该 File 目录中的所有的子文件或目录。

```java
File directory = new File("/Users/itwanger/Documents/Github/paicoding");

// 列出目录下的文件名
String[] files = directory.list();
System.out.println("目录下的文件名：");
for (String file : files) {
    System.out.println(file);
}

// 列出目录下的文件和子目录
File[] filesAndDirs = directory.listFiles();
System.out.println("目录下的文件和子目录：");
for (File fileOrDir : filesAndDirs) {
    if (fileOrDir.isFile()) {
        System.out.println("文件：" + fileOrDir.getName());
    } else if (fileOrDir.isDirectory()) {
        System.out.println("目录：" + fileOrDir.getName());
    }
}
```

**listFiles**在获取指定目录下的文件或者子目录时必须满足下面两个条件：

- 1. **指定的目录必须存在**
- 2. **指定的必须是目录。否则容易引发 NullPointerException 异常**

#### 6）递归遍历

不说啥了，直接上代码：

```java
public static void main(String[] args) {
    File directory = new File("/Users/itwanger/Documents/Github/paicoding");

    // 递归遍历目录下的文件和子目录
    traverseDirectory(directory);
}

public static void traverseDirectory(File directory) {
    // 列出目录下的所有文件和子目录
    File[] filesAndDirs = directory.listFiles();

    // 遍历每个文件和子目录
    for (File fileOrDir : filesAndDirs) {
        if (fileOrDir.isFile()) {
            // 如果是文件，输出文件名
            System.out.println("文件：" + fileOrDir.getName());
        } else if (fileOrDir.isDirectory()) {
            // 如果是目录，递归遍历子目录
            System.out.println("目录：" + fileOrDir.getName());
            traverseDirectory(fileOrDir);
        }
    }
}
```

### RandomAccessFile

RandomAccessFile 是 Java 中一个非常特殊的类，它既可以用来读取文件，也可以用来写入文件。与其他 IO 类（如 FileInputStream 和 FileOutputStream）不同，RandomAccessFile 允许您跳转到文件的任何位置，从那里开始读取或写入。这使得它特别适用于需要在文件中随机访问数据的场景，如数据库系统。

下面是一个使用 RandomAccessFile 的示例，包括写入和读取文件：

```java
import java.io.IOException;
import java.io.RandomAccessFile;

public class RandomAccessFileDemo {

    public static void main(String[] args) {
        String filePath = "logs/javabetter/itwanger.txt";

        try {
            // 使用 RandomAccessFile 写入文件
            writeToFile(filePath, "Hello, 沉默王二!");

            // 使用 RandomAccessFile 读取文件
            String content = readFromFile(filePath);
            System.out.println("文件内容: " + content);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void writeToFile(String filePath, String content) throws IOException {
        try (RandomAccessFile randomAccessFile = new RandomAccessFile(filePath, "rw")) {
            // 将文件指针移动到文件末尾（在此处追加内容）
            randomAccessFile.seek(randomAccessFile.length());

            // 写入内容
            randomAccessFile.writeUTF(content);
        }
    }

    private static String readFromFile(String filePath) throws IOException {
        StringBuilder content = new StringBuilder();

        try (RandomAccessFile randomAccessFile = new RandomAccessFile(filePath, "r")) {
            // 将文件指针移动到文件开始处（从头开始读取）
            randomAccessFile.seek(0);

            content.append(randomAccessFile.readUTF());
        }

        return content.toString();
    }
}
```

为了避免中文乱码问题，我们使用 RandomAccessFile 的 writeUTF 和 readUTF 方法，它们将使用 UTF-8 编码处理字符串。大家可以运行一下这段代码，体验一下。

![](https://cdn.tobebetterjavaer.com/stutymore/file-path-20230331193604.png)

接下来，会详细介绍一下 RandomAccessFile 的构造方法和常用的方法。

#### 构造方法

RandomAccessFile 主要有两个构造方法：

- `RandomAccessFile(File file, String mode)`：使用给定的文件对象和访问模式创建一个新的 RandomAccessFile 实例。
- `RandomAccessFile(String name, String mode)`：使用给定的文件名和访问模式创建一个新的 RandomAccessFile 实例。

访问模式 mode 的值可以是：

- "r"：以只读模式打开文件。调用结果对象的任何 write 方法都将导致 IOException。
- "rw"：以读写模式打开文件。如果文件不存在，它将被创建。
- "rws"：以读写模式打开文件，并要求对内容或元数据的每个更新都被立即写入到底层存储设备。这种模式是同步的，可以确保在系统崩溃时不会丢失数据。
- "rwd"：与“rws”类似，以读写模式打开文件，但仅要求对文件内容的更新被立即写入。元数据可能会被延迟写入。

#### 主要方法

- `long getFilePointer()`：返回文件指针的当前位置。
- `long length()`：返回此文件的长度。
- `int read()`：从该文件中读取一个字节数据。
- `int read(byte[] b)`：从该文件中读取字节数据并将其存储到指定的字节数组中。
- `int read(byte[] b, int off, int len)`：从该文件中读取字节数据并将其存储到指定的字节数组中，从偏移量 off 开始，最多读取 len 个字节。
- `String readLine()`：从该文件中读取一行文本。
- `readUTF()`：从文件读取 UTF-8 编码的字符串。此方法首先读取两个字节的长度信息，然后根据这个长度读取字符串的 UTF-8 字节。最后，这些字节被转换为 Java 字符串。这意味着当你使用 readUTF 方法读取字符串时，需要确保文件中的字符串是使用 writeUTF 方法写入的，这样它们之间的长度信息和编码方式才能保持一致。
- `void seek(long pos)`：将文件指针设置到文件中的 pos 位置。
- `void write(byte[] b)`：将指定的字节数组的所有字节写入该文件。
- `void write(byte[] b, int off, int len)`：将指定字节数组的部分字节写入该文件，从偏移量 off 开始，写入 len 个字节。
- `void write(int b)`：将指定的字节写入该文件。
- `writeUTF(String str)`：将一个字符串以 UTF-8 编码写入文件。此方法首先写入两个字节的长度信息，表示字符串的 UTF-8 字节长度，然后写入 UTF-8 字节本身。因此，当你使用 writeUTF 写入字符串时，实际写入的字节数会比字符串的 UTF-8 字节长度多两个字节。这两个字节用于在读取字符串时确定正确的字符串长度。

再来看一个示例，结合前面的讲解，就会彻底掌握 RandomAccessFile。

```java
File file = new File("logs/javabetter/itwanger.txt");

try (RandomAccessFile raf = new RandomAccessFile(file, "rw")) {
    // 写入文件
    raf.writeUTF("Hello, 沉默王二!");

    // 将文件指针移动到文件开头
    raf.seek(0);

    // 读取文件内容
    String content = raf.readUTF();
    System.out.println("内容: " + content);

} catch (IOException e) {
    e.printStackTrace();
}
```

在这个示例中，我们首先创建了一个名为 itwanger.txt 的文件对象。然后我们使用 RandomAccessFile 以读写模式打开这个文件。

接下来，我们使用 writeUTF 方法将字符串"Hello, 沉默王二!"写入文件。然后，我们使用 seek 方法将文件指针移动到文件开头，并使用 readUTF 方法读取文件内容。输出应该是"Hello, 沉默王二!"。

最后，我们使用[try-with-resources](https://tobebetterjavaer.com/exception/try-with-resources.html)语句确保 RandomAccessFile 在操作完成后被正确关闭。

### Apache FileUtils 类

FileUtils 类是 Apache Commons IO 库中的一个类，提供了一些更为方便的方法来操作文件或目录。

#### **1）复制文件或目录：**

```java
File srcFile = new File("path/to/src/file");
File destFile = new File("path/to/dest/file");
// 复制文件
FileUtils.copyFile(srcFile, destFile);
// 复制目录
FileUtils.copyDirectory(srcFile, destFile);
```

#### **2）删除文件或目录：**

```java
File file = new File("path/to/file");
// 删除文件或目录
FileUtils.delete(file);
```

需要注意的是，如果要删除一个非空目录，需要先删除目录中的所有文件和子目录。

#### **3）移动文件或目录：**

```java
File srcFile = new File("path/to/src/file");
File destFile = new File("path/to/dest/file");
// 移动文件或目录
FileUtils.moveFile(srcFile, destFile);
```

#### **4）查询文件或目录的信息：**

```java
File file = new File("path/to/file");
// 获取文件或目录的修改时间
Date modifyTime = FileUtils.lastModified(file);
// 获取文件或目录的大小
long size = FileUtils.sizeOf(file);
// 获取文件或目录的扩展名
String extension = FileUtils.getExtension(file.getName());
```

### Hutool FileUtil 类

FileUtil 类是 [Hutool](https://hutool.cn) 工具包中的文件操作工具类，提供了一系列简单易用的文件操作方法，可以帮助 Java 开发者快速完成文件相关的操作任务。

FileUtil 类包含以下几类操作工具：

- 文件操作：包括文件目录的新建、删除、复制、移动、改名等
- 文件判断：判断文件或目录是否非空，是否为目录，是否为文件等等。
- 绝对路径：针对 ClassPath 中的文件转换为绝对路径文件。
- 文件名：主文件名，扩展名的获取
- 读操作：包括 getReader、readXXX 操作
- 写操作：包括 getWriter、writeXXX 操作

下面是 FileUtil 类中一些常用的方法：

1、copyFile：复制文件。该方法可以将指定的源文件复制到指定的目标文件中。

```java
File dest = FileUtil.file("FileUtilDemo2.java");
FileUtil.copyFile(file, dest);
```

2、move：移动文件或目录。该方法可以将指定的源文件或目录移动到指定的目标文件或目录中。

```java
FileUtil.move(file, dest, true);
```

3、del：删除文件或目录。该方法可以删除指定的文件或目录，如果指定的文件或目录不存在，则会抛出异常。

```java
FileUtil.del(file);
```

4、rename：重命名文件或目录。该方法可以将指定的文件或目录重命名为指定的新名称。

```java
FileUtil.rename(file, "FileUtilDemo3.java", true);
```

5、readLines：从文件中读取每一行数据。

```java
FileUtil.readLines(file, "UTF-8").forEach(System.out::println);
```

更多方法，可以去看一下 hutool 的源码，里面有非常多实用的方法，多看看，绝对能提升不少编程水平。

---

最近整理了一份牛逼的学习资料，包括但不限于 Java 基础部分（JVM、Java 集合框架、多线程），还囊括了 **数据库、计算机网络、算法与数据结构、设计模式、框架类 Spring、Netty、微服务（Dubbo，消息队列） 网关** 等等等等……详情戳：[可以说是 2022 年全网最全的学习和找工作的 PDF 资源了](https://tobebetterjavaer.com/pdf/programmer-111.html)

微信搜 **沉默王二** 或扫描下方二维码关注二哥的原创公众号沉默王二，回复 **222** 即可免费领取。

![](https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/gongzhonghao.png)
